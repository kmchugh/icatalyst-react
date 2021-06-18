import {generateHash} from '@icatalyst/utilities';
const requestMap = {};
import axios from 'axios';

const toJSONBody = (data, parse) => {
  return Object.keys(data).filter((prop)=>{
    return prop !== 'created' &&
           prop !== 'createdBy' &&
           prop !== 'createdby' &&
           prop !== 'modified' &&
           prop !== 'modifiedBy' &&
           prop !== 'modifiedby';
  }).reduce(function(result, key) {
    result[key] = data[key] === null ? data[key] : (parse ?
      ((typeof data[key] !== 'object') ? data[key] : data[key].value) :
      data[key]);

    return result;
  }, {});
};

function handlePromise(promise, dispatch, transform, successAction, failureAction, callback){
  promise.then((response)=>{
    if (response.data && !response.data.error) {
      const data = transform(response.data);
      if (
        response.headers['content-type'] === 'application/json' ||
        response.headers['content-type'] === 'text/json'
      ) {
        dispatch({
          type : successAction,
          payload : data
        });
      }
      callback && callback(null, data);
    } else {
      const error = response.data && response.data.error || response.data;
      dispatch({
        type : failureAction,
        payload : error
      });
      callback && callback(error, response);
    }
  })
    .catch((err)=>{
      let error = null;
      if (err.response && err.response.data && err.response.data.data && err.response.data.data.errors) {
        error = err.response.data.data;
      } else if (err.response && err.response.data && err.response.data.errors) {
        error = err.response.data;
      } else if (err.response && err.response.errors) {
        error = err.response;
      } else if (err.response) {
        error = {
          errors : [{message:`${err.response.status} - ${err.response.statusText}`}]
        };
      } else {
        console.error(err);
        error = {
          errors : [{message : err.message}]
        };
      }

      error = error.errors.map((e)=>({
        message  : e.message || `${err.response.status} - ${err.response.statusText}`
      })) || {
        errors : [`${error.status} - ${error.statusText}`]
      };

      dispatch({
        type : failureAction,
        payload : error
      });
      callback && callback(error, null);
    });
}


function makeReducerRequest(config, successAction, failureAction, callback){
  return (dispatch)=>{
    const hash = generateHash(config.url);
    const transform = config.transform || ((i)=>i);

    // If this request is already executing then attach to previous request
    if (requestMap[hash]) {
      // Attatch success and failure actions
      let {promise} = requestMap[hash];
      handlePromise(promise, dispatch, transform, successAction, failureAction, callback);

      return requestMap[hash];
    }

    const cancelToken = axios.CancelToken.source();
    config.cancelToken = cancelToken.token;

    const promise = axios.request(config);
    handlePromise(promise, dispatch, transform, successAction, failureAction, callback);


    // If this was a get request then cache it
    if (config.method.toLowerCase() === 'get') {
      requestMap[hash] = {
        promise,
        cancelToken
      };
      requestMap[hash].promise.finally(()=>{
        // When the call has completed remove from the cache
        delete requestMap[hash];
      });
    }

    return {
      promise,
      cancelToken
    };
  };
}

function createURI(path, params = {}) {
  if (!path) {
    throw new Error('invalid path configuration for uri service');
  }

  // Update the path parameters
  let uri = path.replace(/\/:(\w+)/g, function(match, paramKey) {
    const param = params[paramKey];
    delete params[paramKey];
    return '/' + param;
  });

  // Add any query parameters
  let query = Object.keys(params)
    .filter(key=>params[key] !== undefined && params[key] !== null)
    .map(key=>`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');

  return uri + (query && query.length > 0 ? ((uri.indexOf('?') >= 0 ? '&' : '?') + query) : query);
}

const createOperation = {
  'INVALIDATE' : (config, actions)=>{
    return ()=>{
      return {
        type : actions['ENTITY_INVALIDATE'],
      };
    };
  },
  'RETRIEVE_ENTITIES' : (config, actions)=>{
    return (callback, requestConfig = {
      params : {}
    })=>{
      let url = createURI(
        typeof config.uri === 'function' ? config.uri(config) : config.uri,
        requestConfig.params
      );

      return makeReducerRequest({
        method : 'get',
        url,
        headers : {
          Authorization : requestConfig.accessToken ? 'Bearer ' + requestConfig.accessToken : undefined,
          'Content-Type': 'application/json',
        },
        data : {},
        transform : requestConfig.transform
      },
      actions['ENTITY_UPDATED_LIST'],
      actions['ENTITY_UPDATED_LIST_ERROR'],
      callback
      );
    };
  },

  'ADD_ENTITY' : (config, actions)=>{
    return (entity, callback, requestConfig = {})=>{
      const {
        accessToken,
        params,
        parse = true,
        contentType = 'application/json',
      } = requestConfig;
      if (params){
        delete requestConfig.params.guid;
        delete requestConfig.params.id;
      }

      let url = createURI(
        typeof config.uri === 'function' ? config.uri(config) : config.uri,
        params
      );

      return makeReducerRequest({
        method : 'post',
        url,
        headers : {
          Authorization : accessToken ? 'Bearer ' + accessToken : undefined,
          'Content-Type': contentType,
        },
        data : parse ? toJSONBody(entity, false) : entity,
      },
      actions['ENTITY_ADDED'],
      actions['ENTITY_ADDED_ERROR'],
      callback
      );
    };
  },
  'ADD_ENTITIES' : function(config, actions){
    return (entities, callback, requestConfig = {})=>{
      return (dispatch, getState) => {

        let responses = [];
        const addFn = createOperation['ADD_ENTITY'](config, actions);

        return Promise.all(entities.map((entity)=>{
          return (addFn(entity, (err, res)=>{
            responses.push({
              entity,
              error: err,
              res
            });
            if (responses.length === entities.length) {
              const errors = responses.map(r=>r.error).filter(i=>i);

              callback && callback(
                errors.length > 0 ? {errors : errors.flatMap(e=>e)} : null,
                responses
              );
            }
          }, requestConfig))(dispatch, getState);
        }));
      };
    };
  },
  'DELETE_ENTITY' : function(config, actions){
    return (entity, callback, requestConfig = {})=>{
      const {accessToken, params} = requestConfig;
      if (params){
        delete requestConfig.params.guid;
        delete requestConfig.params.id;
      }

      let {appendSlash = true} = config;

      const uri = (typeof config.uri === 'function' ? config.uri(config) : config.uri);
      let url = createURI(
        `${uri}${uri.endsWith('/') ? '' : '/'}${entity.guid || entity.id || entity}${appendSlash ? '/' : ''}`,
        params
      );

      return makeReducerRequest({
        method : 'delete',
        url,
        headers : {
          Authorization : accessToken ? 'Bearer ' + accessToken : undefined,
          'Content-Type': 'application/json',
        }
      },
      actions['ENTITY_DELETED'],
      actions['ENTITY_DELETED_ERROR'],
      callback
      );
    };
  },
  'DELETE_ENTITIES' : function(config, actions){
    return (entities, callback, requestConfig = {})=>{
      return (dispatch, getState) => {

        let responses = [];
        const deleteFn = createOperation['DELETE_ENTITY'](config, actions);

        return Promise.all(entities.map((entity)=>{
          return (deleteFn(entity, (err, res)=>{
            responses.push({
              entity,
              error: err,
              res
            });
            if (responses.length === entities.length) {
              const errors = responses.map(r=>r.error).filter(i=>i);

              callback && callback(
                errors.length > 0 ? {errors : errors.flatMap(e=>e)} : null,
                responses
              );
            }
          }, requestConfig))(dispatch, getState);
        }));
      };
    };
  },
  'UPDATE_ENTITY' : function(config, actions){
    return (entity, callback, requestConfig = {})=>{
      const {accessToken, params} = requestConfig;
      if (params){
        delete requestConfig.params.guid;
        delete requestConfig.params.id;
      }

      const uri = (typeof config.uri === 'function' ? config.uri(config) : config.uri);
      let url = createURI(
        `${uri}${uri.endsWith('/') ? '' : '/'}${entity.guid || entity.id || entity}/`,
        params
      );

      return makeReducerRequest({
        method : 'put',
        url,
        headers : {
          Authorization : accessToken ? 'Bearer ' + accessToken : undefined,
          'Content-Type': 'application/json',
        },
        data : toJSONBody(entity, false),
      },
      actions['ENTITY_UPDATED'],
      actions['ENTITY_UPDATED_ERROR'],
      callback
      );
    };
  },
  'RETRIEVE_ENTITY' : function(config, actions){
    return (entityid, callback, requestConfig = {})=>{
      const {accessToken, params} = requestConfig;
      if (params){
        delete requestConfig.params.guid;
        delete requestConfig.params.id;
      }

      const uri = (typeof config.uri === 'function' ? config.uri(config) : config.uri);
      let url = createURI(
        `${uri}${uri.endsWith('/') ? '' : '/'}${entityid}/`,
        params
      );

      return makeReducerRequest({
        method : 'get',
        url,
        headers : {
          Authorization : accessToken ? 'Bearer ' + accessToken : undefined,
          'Content-Type': 'application/json',
        },
        data : {}
      },
      actions['ENTITY_LOADED'],
      actions['ENTITY_LOADED_ERROR'],
      callback
      );
    };
  },
};

export function generateOperations(config, actions) {
  const action_list = [
    'RETRIEVE_ENTITIES',
    'RETRIEVE_ENTITY',
    'ADD_ENTITY',
    'ADD_ENTITIES',
    'DELETE_ENTITY',
    'DELETE_ENTITIES',
    'UPDATE_ENTITY',
    'INVALIDATE'
  ];
  return action_list.reduce((acc, key)=>{
    if (config[key]) {
      acc[key] = config[key];
    } else if (createOperation[key]){
      acc[key] = createOperation[key](config, actions);
    }
    return acc;
  }, {});
}

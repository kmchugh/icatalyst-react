import {generateHash} from '@icatalyst/utilities';
const requestMap = {};
import axios from 'axios';

function makeReducerRequest(config, successAction, failureAction, callback){
  return (dispatch)=>{
    let hash = generateHash(config.url);

    // If this request is already executing then attach to previous request
    if (requestMap[hash]) {
      return requestMap[hash];
    }

    const cancelToken = axios.CancelToken.source();
    config.cancelToken = cancelToken.token;

    const promise = axios.request(config)
      .then((response)=>{
        if (response.data && !response.data.error) {
          const data = response.data;
          dispatch({
            type : successAction,
            payload : data
          });
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
        let error = (err.response && err.response.data && err.response.data.errors) ?
          err.response.data : (err.response || err);

        error = error.errors || {
          errors : [`${error.status} - ${error.statusText}`]
        };
        dispatch({
          type : failureAction,
          payload : error
        });
        callback && callback(error, null);
      });

    // If this was a get request then cache it
    if (config.method.toLowerCase() === 'get') {
      requestMap[hash] = promise;
      requestMap[hash].finally(()=>{
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
          Authorization : requestConfig.accessToken ? 'Bearer ' + requestConfig.accessToken : undefined
        }
      },
      actions['ENTITY_UPDATED_LIST'],
      actions['ENTITY_UPDATED_LIST_ERROR'],
      callback
      );
    };

  //   return (callback, methodConfig = {})=>{
  //     methodConfig = {
  //       params : {
  //         ...(methodConfig.params || {}),
  //       }
  //     };
  //
  //     const path = methodConfig.params.path;
  //     delete methodConfig.params.path;
  //     delete methodConfig.params.guid;
  //     delete methodConfig.params.id;
  //
  //     let uri = config.uri.replace(/\/:(\w+)/g, function(match, paramKey)
  //     {
  //       const param = methodConfig.params[paramKey];
  //       delete methodConfig.params[paramKey];
  //       return '/' + param;
  //     });
  //     return sensemaker.makeRequest('get',
  //       uri + (uri.endsWith('/') ? '' : '/') + (path ? (path.endsWith('/') ? path : path + '/') : '') + parseParams(methodConfig.params),
  //       actions['ENTITY_UPDATED_LIST'],
  //       actions['ENTITY_UPDATED_ERROR'],
  //       callback,
  //       null,
  //       methodConfig.params);
  //   };
  },
  // 'ADD_ENTITY' : (config, actions)=>{
  //   return (entity, callback, methodConfig = {})=>{
  //
  //     methodConfig = {
  //       params : {
  //         ...(methodConfig.params || {}),
  //       }
  //     };
  //     delete methodConfig.params.guid;
  //     delete methodConfig.params.id;
  //
  //     let uri = config.uri.replace(/\/:(\w+)/g, function(match, paramKey)
  //     {
  //       const param = methodConfig.params[paramKey];
  //       delete methodConfig.params[paramKey];
  //       return '/' + param;
  //     });
  //
  //     return sensemaker.makeRequest('post',
  //       uri + (uri.endsWith('/') ? '' : '/') + parseParams(methodConfig.params),
  //       actions['ENTITY_ADDED'],
  //       actions['ENTITY_ADDED_ERROR'],
  //       callback,
  //       toJSONBody(entity, false),
  //       methodConfig.params
  //     );
  //   };
  // },
  // 'UPDATE_ENTITY' : (config, actions)=>{
  //   return (entity, callback, methodConfig = {})=>{
  //
  //     methodConfig = {
  //       params : {
  //         ...(methodConfig.params || {}),
  //       }
  //     };
  //
  //     let uri = config.uri.replace(/\/:(\w+)/g, function(match, paramKey)
  //     {
  //       const param = methodConfig.params[paramKey];
  //       delete methodConfig.params[paramKey];
  //       return '/' + param;
  //     });
  //
  //     return sensemaker.makeRequest('put',
  //       uri + (uri.endsWith('/') ? '' : '/') + (entity.guid || entity.id || entity) + '/' + parseParams(methodConfig.params),
  //       actions['ENTITY_UPDATED'],
  //       actions['ENTITY_UPDATED_ERROR'],
  //       callback,
  //       toJSONBody(entity, false),
  //       methodConfig.params);
  //   };
  // },

  // 'DELETE_ENTITY' : function(config, actions){
  //   return (entity, callback, methodConfig = {})=>{
  //     methodConfig = {
  //       params : {
  //         ...(methodConfig.params || {}),
  //         admin : true
  //       }
  //     };
  //
  //     const path = methodConfig.params.path;
  //     delete methodConfig.params.path;
  //
  //     let uri = config.uri.replace(/\/:(\w+)/g, function(match, paramKey)
  //     {
  //       const param = methodConfig.params[paramKey];
  //       delete methodConfig.params[paramKey];
  //       return '/' + param;
  //     });
  //
  //     return sensemaker.makeRequest('delete',
  //       uri + (uri.endsWith('/') ? '' : '/') + (path !== undefined ? path + '/' : '') + (entity.guid || entity.id || entity) + '/' + parseParams(methodConfig.params),
  //       actions['ENTITY_DELETED'],
  //       actions['ENTITY_DELETED_ERROR'],
  //       callback,
  //       null,
  //       methodConfig.params);
  //   };
  // },
  // 'DELETE_ENTITIES' : function(config, actions){
  //   return (entities, callback, methodConfig = {})=>{
  //     methodConfig = {
  //       params : {
  //         ...(methodConfig.params || {}),
  //         admin: true
  //       }
  //     };
  //
  //     delete methodConfig.params.guid;
  //     delete methodConfig.params.id;
  //
  //     return (dispatch, getState) => {
  //
  //       let responses = [];
  //
  //       const deleteFn = baseOperations['DELETE_ENTITY'](config, actions);
  //
  //       return Promise.all(entities.map((entity)=>{
  //         return (deleteFn(entity, (err, res)=>{
  //           responses.push({
  //             entity,
  //             err,
  //             res
  //           });
  //           if (responses.length === entities.length) {
  //             callback && callback(responses);
  //           }
  //         }, methodConfig))(dispatch, getState);
  //       }));
  //     };
  //   };
  // },
  // 'RETRIEVE_ENTITY' : function(config, actions){
  //   return (guid, callback, methodConfig = {}) => {
  //     methodConfig = {
  //       params : {
  //         ...(methodConfig.params || {}),
  //       }
  //     };
  //     delete methodConfig.params.guid;
  //
  //
  //     if (!guid) {
  //       return ()=>{
  //         return {
  //           type: actions['ENTITY_LOADED'],
  //           payload : null
  //         };
  //       };
  //     }
  //
  //     let uri = config.uri.replace(/\/:(\w+)/g, function(match, paramKey)
  //     {
  //       const param = methodConfig.params[paramKey];
  //       delete methodConfig.params[paramKey];
  //       return '/' + param;
  //     });
  //
  //     const params = Object.keys(methodConfig.params);
  //     return sensemaker.makeRequest('get',
  //       uri + (uri.endsWith('/') ? '' : '/') + guid + '/' + (parseParams ?
  //         '?' + params.map((key)=>{
  //           return key + '=' + methodConfig.params[key];
  //         }).join('&') : ''),
  //       actions['ENTITY_LOADED'],
  //       actions['ENTITY_LOADED_ERROR'],
  //       callback,
  //       null,
  //       methodConfig.params);
  //   };
  // }
};

export function generateOperations(config, actions) {
  const action_list = [
    'RETRIEVE_ENTITIES',
    'RETRIEVE_ENTITY',
    'ADD_ENTITY',
    'DELETE_ENTITY',
    'DELETE_ENTITIES',
    'UPDATE_ENTITY'
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

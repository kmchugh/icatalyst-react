import {generateActions} from '@icatalyst/utilities/generateActions';
import {generateOperations} from '@icatalyst/utilities/generateOperations';

import URIService from '@icatalyst/services/URIService';

export const actions = generateActions('groupsOwners');

const ownersListByGroupID = {};

export const clearGroupOwnersListCache = (groupID)=>{
  if (groupID) {
    delete ownersListByGroupID[groupID];
  }
};

const generatedOperations = generateOperations({
  uri : ()=>{
    return URIService.getURI('singularity', 'group_users');
  }
}, actions);

const retrieveEntities = generatedOperations.RETRIEVE_ENTITIES;

const withOwnersCacheClear = (operationName)=>{
  const operation = generatedOperations[operationName];
  return (entityOrList, callback, requestConfig = {})=>{
    const groupID = requestConfig.params && requestConfig.params.groupID;
    return operation(entityOrList, (err, result)=>{
      if (!err) {
        clearGroupOwnersListCache(groupID);
      }
      callback && callback(err, result);
    }, requestConfig);
  };
};

export const operations = {
  ...generatedOperations,
  RETRIEVE_ENTITIES : (callback, requestConfig = {params : {}})=>{
    return (dispatch)=>{
      const {groupID, type} = requestConfig.params || {};
      const isOwnersList = type === 'owners' && groupID;

      if (isOwnersList && ownersListByGroupID[groupID]) {
        const owners = ownersListByGroupID[groupID];
        dispatch({
          type : actions.ENTITY_UPDATED_LIST,
          payload : owners
        });
        callback && callback(null, owners);
        return;
      }

      return dispatch(retrieveEntities((err, owners)=>{
        if (!err && isOwnersList) {
          ownersListByGroupID[groupID] = owners;
        }
        callback && callback(err, owners);
      }, requestConfig));
    };
  },
  UPDATE_ENTITY : ({guid, id, start, expiry}, callback, requestConfig = {})=>{
    const groupID = requestConfig.params && requestConfig.params.groupID;
    return generatedOperations.UPDATE_ENTITY({guid, id, start, expiry}, (err, result)=>{
      if (!err) {
        clearGroupOwnersListCache(groupID);
      }
      callback && callback(err, result);
    }, {
      ...requestConfig,
    });
  },
  ADD_ENTITY : withOwnersCacheClear('ADD_ENTITY'),
  DELETE_ENTITY : withOwnersCacheClear('DELETE_ENTITY'),
  DELETE_ENTITIES : withOwnersCacheClear('DELETE_ENTITIES'),
};

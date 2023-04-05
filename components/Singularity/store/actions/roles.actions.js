import {generateActions} from '@icatalyst/utilities/generateActions';
import {
  parseToken,
  createURI,
  generateOperations,
  makeReducerRequest,
  toJSONBody
} from '@icatalyst/utilities/generateOperations';

import URIService from '@icatalyst/services/URIService';

export const actions = generateActions('roles');

const ops = generateOperations({
  uri : ()=>{
    return URIService.getURI('singularity', 'roles');
  }
}, actions);

ops.getRoleMembers = ({
  roleID,
}, callback, requestConfig)=>{
  const {
    contentType = 'application/json',
  } = requestConfig;

  const uri = `${URIService.getURI('singularity', 'roleMembers')}`;
  const url = createURI(uri, {
    roleID,
    resolveUsers: true
  });

  return makeReducerRequest({
    method : 'get',
    url,
    headers : {
      Authorization : parseToken(requestConfig),
      'Content-Type': contentType,
    }
  },
  'ROLE_MEMBERSHIP_LIST',
  'ROLE_MEMBERSHIP_LIST_ERROR',
  callback
  );
};

ops.removeResourceFromRole = ({
  roleID,
  resourceID
}, callback, requestConfig)=>{
  const {
    contentType = 'application/json',
  } = requestConfig;

  const uri = `${URIService.getURI('singularity', 'roleMemberRelationships')}`;
  const url = createURI(uri, {
    roleID,
    resourceID,
  });

  return makeReducerRequest({
    method : 'delete',
    url,
    headers : {
      Authorization : parseToken(requestConfig),
      'Content-Type': contentType,
    }
  },
  'ROLE_MEMBERSHIP_DELETE',
  'ROLE_MEMBERSHIP_DELETE_ERROR',
  callback
  );
};

ops.addResourceToRole = function({
  roleID,
  email,
}, callback, requestConfig){
  const {
    parse = true,
    contentType = 'application/json',
  } = requestConfig;

  const uri = `${URIService.getURI('singularity', 'roleMemberUserRelationships')}`;
  const url = createURI(uri, {
    roleID,
    action : 'user'
  });

  const query = {
    email
  };

  return makeReducerRequest({
    method : 'post',
    url,
    headers : {
      Authorization : parseToken(requestConfig),
      'Content-Type': contentType,
    },
    data : parse ? toJSONBody(query, false) : query,
  },
  'ROLE_MEMBERSHIP_RESOURCE_ADDED',
  'ROLE_MEMBERSHIP_RESOURCE_ADDED_ERROR',
  callback
  );
};

ops.promoteRoleResource = function({
  organisationID,
  roleID,
  resourceID,
}, callback, requestConfig = {}){
  const {
    parse = true,
    contentType = 'application/json',
  } = requestConfig;

  const uri = `${URIService.getURI('singularity', 'roleMemberUserRelationships')}`;
  const url = createURI(uri, {
    organisationID,
    roleID,
    action: 'owner'
  });

  const query = {
    resourceID
  };

  return makeReducerRequest({
    method : 'post',
    url,
    headers : {
      Authorization : parseToken(requestConfig),
      'Content-Type': contentType,
    },
    data : parse ? toJSONBody(query, false) : query,
  },
  'ROLE_MEMBERSHIP_RESOURCE_PROMOTED',
  'ROLE_MEMBERSHIP_RESOURCE_PROMOTED_ERROR',
  callback
  );
};

ops.demoteRoleResource = function({
  roleID,
  resourceID,
}, callback, requestConfig){
  const {
    contentType = 'application/json',
  } = requestConfig;



  const uri = `${URIService.getURI('singularity', 'roleMemberUserRelationships')}/:resourceID`;

  const url = createURI(uri, {
    action : 'owner',
    roleID,
    resourceID
  });

  return makeReducerRequest({
    method : 'delete',
    url,
    headers : {
      Authorization : parseToken(requestConfig),
      'Content-Type': contentType,
    }
  },
  'ROLE_MEMBERSHIP_RESOURCE_DEMOTED',
  'ROLE_MEMBERSHIP_RESOURCE_DEMOTED_ERROR',
  callback
  );
};

export const operations = ops;

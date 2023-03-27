import {generateActions} from '@icatalyst/utilities/generateActions';
import {
  parseToken,
  generateOperations,
  makeReducerRequest,
  createURI,
  toJSONBody
} from '@icatalyst/utilities/generateOperations';

import URIService from '@icatalyst/services/URIService';

export const actions = generateActions('organisationUsers');

const ops = generateOperations({
  uri : ()=>{
    return URIService.getURI('singularity', 'organisationUsers');
  }
}, actions);

// Custom actions for user management
ops.promoteRoleUser = function({
  organisationID,
  roleID,
  userID,
}, callback, requestConfig = {}){
  const {
    parse = true,
    contentType = 'application/json',
  } = requestConfig;

  const uri = `${URIService.getURI('singularity', 'organisationRoles')}/:roleID/relationships/owner`;
  const url = createURI(uri, {
    organisationID,
    roleID
  });

  const query = {
    userID
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
  'ORGANISATION_USER_PROMOTED',
  'ORGANISATION_USER_PROMOTED_ERROR',
  callback
  );
};

ops.demoteRoleUser = function({
  organisationID,
  roleID,
  userID,
}, callback, requestConfig){
  const {
    contentType = 'application/json',
  } = requestConfig;

  const uri = `${URIService.getURI('singularity', 'organisationRoles')}/:roleID/relationships/owner/:userID`;

  const url = createURI(uri, {
    organisationID,
    roleID,
    userID
  });

  return makeReducerRequest({
    method : 'delete',
    url,
    headers : {
      Authorization : parseToken(requestConfig),
      'Content-Type': contentType,
    }
  },
  'ORGANISATION_USER_DEMOTED',
  'ORGANISATION_USER_DEMOTED_ERROR',
  callback
  );
};


ops.removeUserFromRole = function({
  organisationID,
  roleID,
  userID,
}, callback, requestConfig){
  const {
    contentType = 'application/json',
  } = requestConfig;

  const uri = `${URIService.getURI('singularity', 'organisationRoles')}/:roleID/:userID`;

  const url = createURI(uri, {
    organisationID,
    roleID,
    userID
  });

  return makeReducerRequest({
    method : 'delete',
    url,
    headers : {
      Authorization : parseToken(requestConfig),
      'Content-Type': contentType,
    },
  },
  'ORGANISATION_USER_REMOVED',
  'ORGANISATION_USER_REMOVED_ERROR',
  callback
  );
};


ops.addUserToRole = function({
  organisationID,
  roleID,
  email,
}, callback, requestConfig){
  const {
    parse = true,
    contentType = 'application/json',
  } = requestConfig;

  const uri = `${URIService.getURI('singularity', 'organisationRoles')}/:roleID`;
  const url = createURI(uri, {
    organisationID,
    roleID
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
  'ORGANISATION_USER_ADDED',
  'ORGANISATION_USER_ADDED_ERROR',
  callback
  );
};

export const operations = ops;

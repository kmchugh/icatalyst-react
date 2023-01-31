import {generateActions} from '@icatalyst/utilities/generateActions';
import {
  parseToken,
  createURI,
  generateOperations,
  makeReducerRequest
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

export const operations = ops;

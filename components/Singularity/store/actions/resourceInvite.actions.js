import {generateActions} from '@icatalyst/utilities/generateActions';
import {
  createURI,
  generateOperations,
  makeReducerRequest,
  parseToken
} from '@icatalyst/utilities/generateOperations';
import {buildResourceInvitePayload} from './resourceInvitePayload';

import URIService from '@icatalyst/services/URIService';

export const actions = generateActions('resourceInvite');

export const operations = generateOperations({
  uri: ()=>{
    return URIService.getURI('singularity', 'resource_membership');
  },
  ADD_ENTITY : (entity, callback, requestConfig = {})=>{
    const {params = {}} = requestConfig;
    const queryParams = {...params};
    delete queryParams.type;
    delete queryParams.resourceType;
    delete queryParams.resourceid;
    delete queryParams.resourceID;
    delete queryParams.description;
    delete queryParams.resourceDescription;

    const url = createURI(
      `${URIService.getURI('singularity', 'invites')}/bulk`,
      queryParams
    );

    return makeReducerRequest({
      method : 'post',
      url,
      headers : {
        Authorization : parseToken(requestConfig),
        'Content-Type': 'application/json',
      },
      data : buildResourceInvitePayload(entity, params),
      transform : requestConfig.transform,
    },
    actions['ENTITY_ADDED'],
    actions['ENTITY_ADDED_ERROR'],
    callback
    );
  }
}, actions);

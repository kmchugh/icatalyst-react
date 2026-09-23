import {generateActions} from '../../../../utilities/generateActions';
import {createURI, generateOperations, makeReducerRequest, parseToken} from '../../../../utilities/generateOperations';
import URIService from '../../../../services/URIService';

export const actions = generateActions('invitations');

const ops = generateOperations({
  uri : ()=>{
    return URIService.getURI('singularity', 'invites');
  },
  RETRIEVE_ENTITIES : (callback, requestConfig = {params: {}})=>{
    const params = requestConfig.params || {};
    const url = createURI(
      URIService.getURI('singularity', 'invites'),
      {
        ...params,
        requiresAcknowledgement: true,
      }
    );

    return makeReducerRequest({
      method : 'get',
      url,
      headers : {
        Authorization : parseToken(requestConfig),
        'Content-Type': 'application/json',
      },
      data : {},
      transform : requestConfig.transform,
    },
    actions['ENTITY_UPDATED_LIST'],
    actions['ENTITY_UPDATED_LIST_ERROR'],
    callback
    );
  }
}, actions);

ops['BULK_ADD_ENTITIES'] = (data, callback, requestConfig = {})=>{
  const {
    params,
  } = requestConfig;

  const url = createURI(
    `${URIService.getURI('singularity', 'invites')}/bulk`,
    params
  );

  return makeReducerRequest({
    method : 'post',
    url,
    headers : {
      Authorization : parseToken(requestConfig),
      'Content-Type': 'application/json',
    },
    data,
    transform : requestConfig.transform,
  },
  actions['ENTITY_ADDED'],
  actions['ENTITY_ADDED_ERROR'],
  callback
  );
};
export const operations = ops;


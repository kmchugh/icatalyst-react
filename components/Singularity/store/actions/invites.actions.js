import {generateActions} from '../../../../utilities/generateActions';
import {createURI, generateOperations, makeReducerRequest, parseToken} from '../../../../utilities/generateOperations';
import URIService from '../../../../services/URIService';

export const actions = generateActions('invitations');

const ops = generateOperations({
  uri : ()=>{
    return URIService.getURI('singularity', 'invites');
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


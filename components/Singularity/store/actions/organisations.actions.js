import {generateActions} from '@icatalyst/utilities/generateActions';
import {generateOperations} from '@icatalyst/utilities/generateOperations';
import URIService from '@icatalyst/services/URIService';
import {
  makeReducerRequest,
  parseToken,
} from '@icatalyst/utilities/generateOperations';

export const actions = generateActions('organisations');

export const operations = generateOperations({
  uri : ()=>{
    return URIService.getURI('singularity', 'organisations');
  }
}, actions);

operations['ADD_ENTITY'] = (data, callback, requestConfig = {}) => {

  const { singularityContext = {} } = requestConfig;
  
  // temporary endpoint change for organisation creation by partner license non admin users
  const url = singularityContext.isInRole('partnerLicense') && 
    !singularityContext.isInRole('admin') ? 
    URIService.getURI('singularity', 'partnerOrganisations') : URIService.getURI('singularity', 'organisations');

  return makeReducerRequest(
    {
      method: 'post',
      url,
      headers: {
        Authorization: parseToken(requestConfig),
        'Content-Type': 'application/json',
      },
      data: data,
    },
    actions['ENTITY_ADDED'],
    actions['ENTITY_ADDED_ERROR'],
    (err, res) => {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    }
  );
};


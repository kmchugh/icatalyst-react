import {generateActions} from '@icatalyst/utilities/generateActions';
import {generateOperations} from '@icatalyst/utilities/generateOperations';

import URIService from '@icatalyst/services/URIService';

export const actions = generateActions('organisationUsers');

export const operations = generateOperations({
  uri : ()=>{
    return URIService.getURI('singularity', 'organisationUsers');
  }
}, actions);

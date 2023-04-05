import {generateActions} from '@icatalyst/utilities/generateActions';
import {generateOperations} from '@icatalyst/utilities/generateOperations';

import URIService from '@icatalyst/services/URIService';

export const actions = generateActions('organisationStats');

export const operations = generateOperations({
  uri : ()=>{
    return URIService.getURI('singularity', 'organisationStats');
  }
}, actions);

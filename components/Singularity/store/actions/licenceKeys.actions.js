import {generateActions} from '@icatalyst/utilities/generateActions';
import {generateOperations} from '@icatalyst/utilities/generateOperations';

import URIService from '@icatalyst/services/URIService';

export const actions = generateActions('licenceKeys');

export const operations = generateOperations({
  uri : ()=>{
    return URIService.getURI('singularity', 'licenceKeys');
  }
}, actions);

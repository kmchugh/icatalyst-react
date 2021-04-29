import {generateActions} from '@icatalyst/utilities/generateActions';
import {generateOperations} from '@icatalyst/utilities/generateOperations';

import URIService from '@icatalyst/services/URIService';

export const actions = generateActions('roles');

export const operations = generateOperations({
  uri : ()=>{
    return URIService.getURI('singularity', 'roles');
  }
}, actions);

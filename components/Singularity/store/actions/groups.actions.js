import {generateActions} from '@icatalyst/utilities/generateActions';
import {generateOperations} from '@icatalyst/utilities/generateOperations';

import URIService from '@icatalyst/services/URIService';

export const actions = generateActions('groups');

export const operations = generateOperations({
  uri : ()=>{
    // Roles and groups are the same, just presented differently
    return URIService.getURI('singularity', 'roles');
  }
}, actions);

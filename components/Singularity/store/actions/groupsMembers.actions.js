import {generateActions} from '@icatalyst/utilities/generateActions';
import {generateOperations} from '@icatalyst/utilities/generateOperations';

import URIService from '@icatalyst/services/URIService';

export const actions = generateActions('groupsMembers');

export const operations = generateOperations({
  uri : ()=>{
    return URIService.getURI('singularity', 'group_users');
  }
}, actions);

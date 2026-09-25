import {generateActions} from '@icatalyst/utilities/generateActions';
import {generateOperations} from '@icatalyst/utilities/generateOperations';

import URIService from '@icatalyst/services/URIService';

export const actions = generateActions('groupsMembers');

const generatedOperations = generateOperations({
  uri : ()=>{
    return URIService.getURI('singularity', 'group_users');
  }
}, actions);

export const operations = {
  ...generatedOperations,
  UPDATE_ENTITY: ({guid, id, start, expiry}, callback, requestConfig = {})=>
    generatedOperations.UPDATE_ENTITY({guid, id, start, expiry}, callback, {
      ...requestConfig,
    }),
};

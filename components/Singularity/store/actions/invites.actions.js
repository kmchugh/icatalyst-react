import {generateActions} from '@icatalyst/utilities/generateActions';
import {generateOperations} from '@icatalyst/utilities/generateOperations';

import URIService from '@icatalyst/services/URIService';

export const actions = generateActions('invitations');

export const operations = generateOperations({
  uri : ()=>{
    return URIService.getURI('singularity', 'invites');
  }
}, actions);

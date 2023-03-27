import {generateActions} from '@icatalyst/utilities/generateActions';
import {generateOperations} from '@icatalyst/utilities/generateOperations';

import URIService from '@icatalyst/services/URIService';

export const actions = generateActions('userReports');

export const operations = generateOperations({
  uri : ()=>{
    return URIService.getURI('singularity', 'reports_users');
  }
}, actions);

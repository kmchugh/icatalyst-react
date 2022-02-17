import {generateActions} from '../../../../utilities/generateActions';
import {generateOperations} from '../../../../utilities/generateOperations';

import URIService from '../../../../services/URIService';

export const actions = generateActions('knowledgebase');

export const operations = generateOperations({
  uri : ()=>{
    return URIService.getURI('singularity', 'knowledgeBase');
  }
}, actions);

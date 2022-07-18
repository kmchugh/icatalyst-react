import {generateActions} from '../../../../utilities/generateActions';
import {generateOperations} from '../../../../utilities/generateOperations';
import URIService from '../../../../services/URIService';

export const actions = generateActions('edgetypes');

export const operations = generateOperations({
  uri : ()=>{
    return URIService.getURI('singularity', 'edge_type');
  }
}, actions);

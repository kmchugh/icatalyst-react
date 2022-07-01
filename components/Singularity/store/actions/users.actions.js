import { generateActions } from '../../../../utilities';
import { generateOperations } from '../../../../utilities';
import  URIService  from '../../../../services/URIService';

export const actions = generateActions('users');

export const operations = generateOperations({
  uri : ()=>{
    return URIService.getURI('singularity', 'users');
  }
}, actions);

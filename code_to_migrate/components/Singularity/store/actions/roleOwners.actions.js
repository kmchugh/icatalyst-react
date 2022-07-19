// import {generateActions} from '@icatalyst/utilities/generateActions';
import { generateActions } from '../../../../utilities';
// import {generateOperations} from '@icatalyst/utilities/generateOperations';
import { generateOperations } from '../../../../utilities';

// import URIService from '@icatalyst/services/URIService';
// import { URIService } from '../../../../services';
import URIService from 'icatalyst/services/URIService';

export const actions = generateActions('roleOwners');

export const operations = generateOperations({
  uri : ()=>{
    return URIService.getURI('singularity', 'role_ownership');
  }
}, actions);

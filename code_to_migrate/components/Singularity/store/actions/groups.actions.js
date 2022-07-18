// import {generateActions} from '@icatalyst/utilities/generateActions';
import { generateActions } from '../../../../utilities';
// import {generateOperations} from '@icatalyst/utilities/generateOperations';
import { generateOperations } from '../../../../utilities';

// import URIService from '@icatalyst/services/URIService';
// import { URIService } from '../../../../services';
import URIService from 'icatalyst/services/URIService';

export const actions = generateActions('groups');

export const operations = generateOperations({
  uri : ()=>{
    // Roles and groups are the same, just presented differently
    return URIService.getURI('singularity', 'roles');
  }
}, actions);

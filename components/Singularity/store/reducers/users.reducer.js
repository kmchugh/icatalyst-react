import * as Actions from '../actions/users.actions';
import {createModel, generateReducer} from '../../../../utilities';

const definition = createModel({
  name: 'user',
  icon: 'fa users-cog',
  primaryTextField : 'displayname',
  auth: {
    retrieveAll : 'admin',
    // create : 'admin',
    retrieve : 'admin',
    // update : 'admin',
    // delete : 'admin',
    route : 'admin'
  },
  fields : [
    {
      id: 'guid',
      readonly : true,
      label : 'User Identifier'
    },
    {
      id: 'displayname',
      label: 'Display Name',
      required: true,
      minLength: 4,
      maxLength: 256,
      readonly : true
    },
  ],
  listLayout : [
    'displayname',
    'guid'
  ],
  getReducerRoot: ({icatalyst})=>{
    return icatalyst.singularity.users;
  },
  ...Actions
});

const reducer = generateReducer(definition, Actions/*, initialState, customActions*/);

export {definition};
export default reducer;

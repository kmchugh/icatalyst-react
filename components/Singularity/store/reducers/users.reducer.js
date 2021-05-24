import * as Actions from '../actions/users.actions';
import {createModel, generateReducer, generateUUID} from '../../../../utilities';

const definition = createModel({
  name: 'user',
  icon: 'fa users-cog',
  auth : 'admin',

  fields : [
    {
      id: 'name',
      required: true,
      minLength: 4,
      maxLength: 256
    },
    {
      id: 'description',
      maxLength: 2048
    },
    {
      id: 'code',
      minLength: 4,
      maxLength: 256,
      default: ()=>generateUUID()
    }
  ],

  getReducerRoot: ({app})=>{
    return app.singularity.users;
  },
  ...Actions
});

const reducer = generateReducer(definition, Actions/*, initialState, customActions*/);

export {definition};
export default reducer;

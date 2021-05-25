import * as Actions from '../actions/invites.actions';
import { createModel } from '../../../../utilities/createModel';
import { generateReducer } from '../../../../utilities/generateReducer';


const definition = createModel({
  name: 'invite',
  icon: 'contact_mail',
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
      id: 'message',
      maxLength: 65535
    },
    {
      id: 'email',
      minLength: 4,
      maxLength: 256,
    },
    {
      id: 'start',
      type : 'date',
    },
    {
      id: 'expiry',
      type : 'date',
    },
    {
      id: 'sent',
      type : 'date',
    },
    {
      id: 'opened',
      type : 'date',
    },
    {
      id: 'accepted',
      type : 'date',
    },
    {
      id: 'declined',
      type : 'date',
    },
  ],
  layout : [
    'name',
    'description'
  ],
  getReducerRoot: ({icatalyst})=>{
    return icatalyst.singularity.invites;
  },
  ...Actions
});

const reducer = generateReducer(definition, Actions/*, initialState, customActions*/);

export {definition};
export default reducer;

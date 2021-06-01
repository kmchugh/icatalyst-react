import * as Actions from '../actions/roles.actions';
import { createModel, generateReducer, generateUUID } from '../../../../utilities';
import { definition as roleMembers } from './roleMembers.reducer';

const definition = createModel({
  name: 'role',
  icon: 'fa users',
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
      label : 'Role Identifier'
    },
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
    },
    {
      id: 'displayable',
      type : 'boolean',
      display : false,
      default : false,
    },
    {
      id: 'featurerole',
      label: 'Feature Role',
      type : 'boolean',
      display : false,
      default : false,
    },
    {
      id: 'accessrole',
      label: 'Access Role',
      type : 'boolean',
      display : false,
      default : false,
    },
    {
      id: 'mutuallyexclusive',
      display : false,
      label: 'Mutually Exclusive',
      type : 'boolean',
      default : false,
    }
  ],
  children : [
    roleMembers
  ],
  layout : [
    'guid',
    [
      'name',
      'code',
    ],
    'description',
    [
      'displayable',
      'mutuallyexclusive',
      'featurerole',
      'accessrole'
    ]
  ],
  listLayout : [
    'name', 'description', 'displayable',
  ],
  filterPayload : (group)=>{
    return group.code === 'SINGULARITY_GRAPH_ADMIN_ROLE' ||
      group.accessrole ||
      group.featurerole ||
      group.displayable;
  },
  getReducerRoot: ({icatalyst})=>{
    return icatalyst.singularity.roles;
  },
  ...Actions
});

const reducer = generateReducer(definition, Actions/*, initialState, customActions*/);

export {definition};
export default reducer;

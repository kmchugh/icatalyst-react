import * as Actions from '../actions/organisationRoles.actions';
import { createModel, generateReducer } from '../../../../utilities';

const definition = createModel({
  name: 'organisationRoles',
  icon: 'fa users',
  auth: {
    retrieveAll: 'alpha',
    // create: 'admin',
    retrieve: 'alpha',
    // update: 'admin',
    // delete: 'admin',
    route: 'alpha',
  },
  fields: [
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
      excludeFromModel: true
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
  layout : [
    'name',
    'description',
    [
      'displayable',
      'mutuallyexclusive',
      'featurerole',
      'accessrole'
    ]
  ],
  listLayout: ['name', 'code', 'description'],
  getReducerRoot: ({ icatalyst }) => {
    return icatalyst.singularity.organisationRoles;
  },
  getRetrieveAllParams : (parentDefinition, parent)=>{
    return {
      organisationID : parentDefinition.getIdentity(parent),
    };
  },
  ...Actions,
});

const reducer = generateReducer(
  definition,
  Actions /*, initialState, customActions*/
);

export { definition };
export default reducer;

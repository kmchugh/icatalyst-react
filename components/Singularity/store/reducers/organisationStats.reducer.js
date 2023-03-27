import * as Actions from '../actions/organisationStats.actions';
import { createModel, generateReducer } from '../../../../utilities';

const definition = createModel({
  name: 'organisationUsers',
  icon: 'person_outline',
  onEntityClicked: ()=>{},
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
      label : 'User Identifier'
    },
    {
      id: 'displayName',
      readonly : true,
    },
    {
      id: 'profileImageUri',
      readonly : true,
      type: 'image',
    },
  ],
  layout: [
    'displayName'
  ],
  listLayout: ['displayName'],
  getReducerRoot: ({ icatalyst }) => {
    return icatalyst.singularity.organisationStats;
  },
  ...Actions,
});

const reducer = generateReducer(
  definition,
  Actions /*, initialState, customActions*/
);

export { definition };
export default reducer;

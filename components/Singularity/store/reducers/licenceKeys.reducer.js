import * as Actions from '../actions/licenceKeys.actions';
import { createModel, generateReducer } from '../../../../utilities';

const definition = createModel({
  name: 'licenceKey',
  icon: 'key',
  primaryTextField: 'name',
  secondaryTextField: 'description',
  auth: {
    retrieveAll: 'admin',
    create: 'admin',
    retrieve: 'admin',
    update: 'admin',
    delete: 'admin',
    route: 'admin',
  },
  fields: [
    {
      id: 'guid',
      label: 'Key',
      readonly: true,
    }
  ],
  layout: ['guid'],
  listLayout: ['guid'],
  getReducerRoot: ({ icatalyst }) => {
    return icatalyst.singularity.licenceKeys;
  },
  getRetrieveAllParams : (parentDefinition, parent)=>{
    return {
      licenceID : parentDefinition.getIdentity(parent),
    };
  },
  getDeleteParams : (getState, parentMasterDetailContext)=>{
    return {
      licenceID : parentMasterDetailContext.parentContext.entityID
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

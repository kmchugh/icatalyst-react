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
    },
    {
      id: 'applied',
      readonly: true,
      type: 'datetime'
    },
    {
      id: 'organisation',
      readonly: true,
      type: 'json'
    }, {
      id: 'duration',
      type: 'number',
      minValue: 1,
      maxValue: 3065,
      description: 'The number of days this key will be valid after it is applied'
    }
  ],
  layout: ['duration'],
  listLayout: ['guid', 'duration', 'applied', 'organisation'],
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

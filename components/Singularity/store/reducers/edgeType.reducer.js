import * as Actions from '../actions/edgeType.actions';
import { createModel } from '../../../../utilities/createModel';
import { generateReducer } from '../../../../utilities/generateReducer';

const definition = createModel({
  name: 'accessType',
  icon: 'device_hub',
  primaryTextField : 'name',
  secondaryTextField : 'description',
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
      id : 'guid',
    },{
      id : 'transitive'
    },{
      id : 'name',
    },{
      id : 'code',
    },{
      id : 'description',
    }
  ],
  layout : [
    'name',
    'description'
  ], listLayout : [
    'name',
    'description',
  ],
  getReducerRoot: ({icatalyst})=>{
    return icatalyst.singularity.edgetypes;
  },
  ...Actions
});

const reducer = generateReducer(definition, Actions);
export {definition};
export default reducer;

import * as Actions from '../actions/clientdata.actions';
import { createModel, generateReducer } from '../../../../utilities';

const definition = createModel({
  name: 'clientdata',
  icon: 'settings',
  fields : [
    {
      id: 'guid',
      readonly : true
    }
  ],
  getReducerRoot: ({icatalyst})=>{
    return icatalyst.singularity.clientdata;
  },
  ...Actions
});

const reducer = generateReducer(definition, Actions/*, initialState, customActions*/);

export {definition};
export default reducer;

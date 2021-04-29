import * as Actions from '../actions/version.actions';
import { createModel, generateReducer } from '../../../../utilities';


const definition = createModel({
  name : 'version',
  getReducerRoot : ({app})=>(app.singularity.version),
  ...Actions
});

const reducer = generateReducer(definition, Actions/*, initialState, customActions*/);
export {definition};
export default reducer;

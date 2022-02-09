import * as Actions from '../actions/knowledgeBase.actions';
import {createModel, generateReducer} from '../../../../utilities';

const definition = createModel({
  name: 'knowledgeBaseItem',
  icon: 'fa book-reader',
  primaryTextField : 'title',
  auth: {
    retrieveAll : 'admin',
    create : 'admin',
    retrieve : 'admin',
    update : 'admin',
    delete : 'admin',
    route : 'admin'
  },
  fields : [
    {
      id: 'guid',
      readonly : true,
    }, {
      id: 'clientid',
      readonly: true,
      display: false,
    }, {
      id: 'title',
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 256
    },{
      id: 'excerpt',
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 2048
    },
  ],
  layout: [
    'title', 'excerpt'
  ],
  listLayout : [
    'title',
  ],
  getReducerRoot: ({icatalyst})=>{
    return icatalyst.singularity.knowledgeBase;
  },
  ...Actions
});

const reducer = generateReducer(definition, Actions/*, initialState, customActions*/);

export {definition};
export default reducer;

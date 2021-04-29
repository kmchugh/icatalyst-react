import * as Actions from '../actions/roleMembers.actions';
import { createModel, generateReducer } from '../../../../utilities';

const definition = createModel({
  name: 'roleMember',
  icon: 'supervised_user_circle',
  auth: {
    retrieveAll : 'admin',
    create : 'admin',
    // retrieve : 'admin',
    // update : 'admin',
    delete : 'admin'
  },
  fields : [
    {
      id: 'username',
    }, {
      id: 'hops',
    },
    // {
    //   id : 'edgetype'
    // },
    {
      id : 'start',
      type : 'datetime',
    }, {
      id : 'expiry',
      type : 'datetime',
    }
  ],
  listLayout : [
    'username',
    {
      id : 'linkage',
      type : 'string',
      getValue(column, entity/*, value*/) {
        return entity.hops > 0 ? 'Indirect' : 'Direct';
      }
    },
    'start',
    'expiry',
  ],
  isSelectable : (entity)=>{
    return entity.hops === 0;
  },
  getReducerRoot: ({app})=>{
    return app.singularity.rolemembers;
  },
  getRetrieveAllParams : (parentDefinition, parent)=>{
    return {
      roleid : parent.id || parentDefinition.getIdentity(parent),
    };
  },
  ...Actions
});

const reducer = generateReducer(definition, Actions/*, initialState, customActions*/);

export {definition};
export default reducer;

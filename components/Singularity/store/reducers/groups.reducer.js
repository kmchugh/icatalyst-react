import React from 'react';
import * as Actions from '../actions/groups.actions';
import { createModel, generateReducer, generateUUID } from '../../../../utilities';
import { definition as roleMembers } from './roleMembers.reducer';
import { definition as roleOwners } from './roleOwners.reducer';
import {InviteButton} from '../../components';

const definition = createModel({
  name: 'group',
  icon: 'group',
  resourceName : 'role',
  addInline : true,
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
      label : 'Group Identifier'
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
    }
  ],
  children : [
    roleOwners,
    roleMembers
  ],
  layout : [
    'guid',
    [
      'name',
      'code',
    ],
    'description'
  ],
  listLayout : [
    'name', 'description',
    {
      id : 'invite',
      label : '',
      render(column, field, item){
        return <InviteButton
          entity={item}
          definition={definition}
        />;
      }
    }
  ],
  getReducerRoot: ({icatalyst})=>{
    return icatalyst.singularity.groups;
  },
  getRetrieveAllParams : ()=>{
    console.log('adding retrieval params');
    return {
      admin: true
    };
  },
  getAddParams : (getState)=>{
    const client = getState().icatalyst.singularity.client.client;
    return {
      clientid : client.id
    };
  },
  filterPayload : (group)=>{
    return group.code !== 'SINGULARITY_GRAPH_ADMIN_ROLE' &&
      !group.accessrole &&
      !group.featurerole &&
      !group.displayable;
  },
  ...Actions
});

const reducer = generateReducer(definition, Actions/*, initialState, customActions*/);

export {definition};
export default reducer;

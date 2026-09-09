import React from 'react';
import * as Actions from '../actions/groupsMembers.actions';
import { createModel, generateReducer } from '../../../../utilities';
import moment from '../../../../@moment';

import {Typography} from '@mui/material';

const getLinkage = ({hops})=>{
  return hops > 0 ? 'Indirect' : 'Direct';
};

const definition = createModel({
  name: 'groupsMember',
  icon: 'fa user-lock',
  getPrimaryText: (entity)=>{
    return `${entity.username} - ${getLinkage(entity)}`;
  },
  addInline : true,
  description: 'A member has access to a group but cannot modify or manage it',
  forceRefreshOnDelete : true,
  auth: {
    retrieveAll : 'admin',
    create : 'admin',
    retrieve : 'admin',
    delete : 'admin'
  },
  fields : [
    { id: 'username' },
    { id: 'hops', readonly: true },
    {
      id : 'start',
      type : 'datetime',
      default : ()=> moment().startOf('day').valueOf()
    },
    { id : 'expiry', type : 'datetime' }
  ],
  layout: [
    'username', 'start', 'expiry',
    (entity)=>(
      <div className="flex">
        <Typography className="mr-16" variant="h6">Linkage: </Typography>
        <Typography variant="h6">{getLinkage(entity)}</Typography>
      </div>
    )
  ],
  listLayout : [
    'username',
    { id : 'linkage', type : 'string', getValue: getLinkage },
    'start',
    'expiry'
  ],
  isSelectable : (entity)=> entity.hops === 0,
  getReducerRoot: ({icatalyst})=> icatalyst.singularity.groupsmembers,
  getDeleteParams : (getState, parentMasterDetailContext)=>({
    groupID : parentMasterDetailContext.parentContext.entityID,
    type : 'members'
  }),
  getRetrieveAllParams : (parentDefinition, parent)=>({
    groupID : parent.id || parentDefinition.getIdentity(parent),
    type : 'members'
  }),
  getAddParams : (getState, entity, parentDefinition, parent, parentMasterDetailContext)=>{
    const {entity : parentEntity} = parentMasterDetailContext.parentContext;
    entity.email = entity.username;
    entity.type = 'members';
    delete entity.hops;
    delete entity.username;
    return {groupID: parentEntity.guid, type: 'members'};
  },
  getUpdateParams : (getState, parentMasterDetailContext)=>({
    groupID : parentMasterDetailContext.parentContext.entityID,
    type : 'members'
  }),
  ...Actions
});

const reducer = generateReducer(definition, Actions/*, initialState, customActions*/);

export {definition};
export default reducer;

import React from 'react';
import * as Actions from '../actions/roleOwners.actions';
import { createModel, generateReducer } from '../../../../utilities';
import moment from '../../../../@moment';

import {Typography} from '@material-ui/core';

const getLinkage = ({hops})=>{
  return hops > 0 ? 'Indirect' : 'Direct';
};

const definition = createModel({
  name: 'roleOwner',
  icon: 'fa users-cog',
  addInline : true,
  forceRefreshOnDelete : true,
  description: 'An owner is allowed to manage, modify, and delete the resource they own',
  auth: {
    retrieveAll : 'admin',
    create : 'admin',
    retrieve : 'admin',
    // An edge cannot be updated, just deleted and recreated
    delete : 'admin'
  },
  fields : [
    {
      id: 'username',
    }, {
      id: 'hops',
      readonly: true
    },
    // {
    //   id : 'edgetype'
    // },
    {
      id : 'start',
      type : 'datetime',
      default : ()=>{
        return moment().startOf('day').valueOf();
      }
    }, {
      id : 'expiry',
      type : 'datetime',
    }
  ],
  layout: [
    'username', 'start', 'expiry',
    (entity)=>{
      return (
        <div className="flex">
          <Typography className="mr-16" variant="h6">Linkage: </Typography>
          <Typography variant="h6">
            {getLinkage(entity)}
          </Typography>
        </div>
      );
    }
  ],
  listLayout : [
    'username',
    {
      id : 'linkage',
      type : 'string',
      getValue(entity) {
        return getLinkage(entity);
      }
    },
    'start',
    'expiry',
  ],
  isSelectable : (entity)=>{
    return entity.hops === 0;
  },
  getReducerRoot: ({icatalyst})=>{
    return icatalyst.singularity.roleowners;
  },
  getDeleteParams : (getState, parentMasterDetailContext)=>{
    return {
      roleid : parentMasterDetailContext.parentContext.entityID
    };
  },
  getRetrieveAllParams : (parentDefinition, parent)=>{
    return {
      roleid : parent.id || parentDefinition.getIdentity(parent),
    };
  },
  getAddParams : (getState, entity, parentDefinition, parent, parentMasterDetailContext)=>{
    const {entity : parentEntity} = parentMasterDetailContext.parentContext;
    entity.email=entity.username;
    delete entity.hops;
    delete entity.username;
    return {
      roleid: parentEntity.guid
    };
  },
  ...Actions
});

const reducer = generateReducer(definition, Actions/*, initialState, customActions*/);

export {definition};
export default reducer;

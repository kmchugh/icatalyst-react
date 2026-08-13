import React from 'react';
import * as Actions from '../actions/groups.actions';
import { createModel, generateReducer } from '../../../../utilities';
import { definition as groupsMembers } from './groupsMembers.reducer';
import { definition as groupsOwners } from './groupsOwners.reducer';
import ResourceSharingButton from '../../../Buttons/ResourceSharingButton';
import {isName} from '../../../EntityView/validations';
import GroupManagement from '../../components/GroupManagement';

const definition = createModel({
  name: 'group',
  icon: 'group',
  resourceName : 'role',
  addInline : true,
  updateMethod: 'patch',
  detailComponent: GroupManagement,
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
      maxLength: 256,
      validations : [
        isName
      ],
      sortType: 'string',
    },
    {
      id: 'description',
      maxLength: 2048
    },
    {
      id: 'code',
      minLength: 4,
      maxLength: 256,
      excludeFromModel : true
    }
  ],
  children : [
    {
      ...groupsOwners,
      auth: ()=>({
        retrieveAll : 'groupManager',
        create : 'groupManager',
        retrieve : 'groupManager',
        // An edge cannot be updated, just deleted and recreated
        // update : 'admin',
        delete : 'groupManager'
      })
    },{
      ...groupsMembers,
      auth: ()=>({
        retrieveAll : 'groupManager',
        create : 'groupManager',
        retrieve : 'groupManager',
        // An edge cannot be updated, just deleted and recreated
        // update : 'admin',
        delete : 'groupManager'
      })
    }
  ],
  layout : [
    'name',
    'description'
  ],
  listLayout : [
    'name', 'description',
    {
      id : 'invite',
      label : '',
      type : 'string',
      render(column, field, item){
        return <ResourceSharingButton
          key="resourceSharingButton"
          definition={definition}
          resource={item}
          isOwner={true}
          variant="button"
          iconButtonProps={{
            icon : 'email',
            title : 'Invite'
          }}
          accessTypeProps={{
            'SINGULARITY_MEMBER_EDGE' : {
              title : 'Member',
              description : 'Is a member of',
              icon : 'fa users'
            },
            'SINGULARITY_OWNER_EDGE' : {
              title : 'Administrator',
              description : 'Is an administrator of',
              icon : 'fa user-cog'
            },
          }}
        />;
      }
    }
  ],
  getReducerRoot: ({icatalyst})=>{
    return icatalyst.singularity.groups;
  },
  getRetrieveAllParams : ()=>{
    return {};
  },
  getAddParams : (getState)=>{
    const client = getState().icatalyst.singularity.client.client;
    return {
      clientid : client.id
    };
  },
  // filterPayload : (group)=>{
  //   return group.code !== 'SINGULARITY_GRAPH_ADMIN_ROLE' &&
  //     !group.accessrole &&
  //     !group.featurerole &&
  //     !group.displayable;
  // },
  ...Actions
});

const reducer = generateReducer(definition, Actions/*, initialState, customActions*/);

export {definition};
export default reducer;

import React from 'react';
import * as Actions from '../actions/roles.actions';
import { createModel, generateReducer } from '../../../../utilities';
import { definition as roleMembers } from './roleMembers.reducer';
import { definition as roleOwners } from './roleOwners.reducer';
import ResourceSharingButton from '../../../Buttons/ResourceSharingButton';
import RoleManagement from '../../components/RoleManagement';

const definition = createModel({
  name: 'role',
  icon: 'fa users',
  resourceName : 'role',
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
      label : 'Role Identifier'
    },
    {
      id: 'name',
      required: true,
      minLength: 4,
      maxLength: 256,
      description: 'The name to display'
    },
    {
      id: 'description',
      maxLength: 2048,
      description: 'A readable description'
    },
    {
      id: 'code',
      minLength: 4,
      maxLength: 256,
      excludeFromModel: true,
      description: 'An internal code'
    },
    {
      id: 'displayable',
      type : 'boolean',
      display : false,
      default : false,
      description: 'should this show in the user roles?'
    },
    {
      id: 'featurerole',
      label: 'Feature Role',
      type : 'boolean',
      display : false,
      default : false,
      description: 'is this enabling feature access?'
    },
    {
      id: 'accessrole',
      label: 'Access Role',
      type : 'boolean',
      display : false,
      default : false,
      description: 'is this grouping users?'
    },
    {
      id: 'mutuallyexclusive',
      display : false,
      label: 'Mutually Exclusive',
      type : 'boolean',
      default : false,
      description: 'can a user be a member of only this role?'
    }
  ],
  children : [
    {
      ...roleOwners,
      auth: ()=>({
        retrieveAll : 'roleManager',
        create : 'roleManager',
        retrieve : 'roleManager',
        // An edge cannot be updated, just deleted and recreated
        // update : 'admin',
        delete : 'roleManager'
      })
    },{
      ...roleMembers,
      auth: ()=>({
        retrieveAll : 'roleManager',
        create : 'roleManager',
        retrieve : 'roleManager',
        // An edge cannot be updated, just deleted and recreated
        // update : 'admin',
        delete : 'roleManager'
      })
    }
  ],
  detailComponent : RoleManagement,
  layout : [
    'name',
    'description',
    [
      'displayable',
      'mutuallyexclusive',
      'featurerole',
      'accessrole'
    ]
  ],
  listLayout : [
    'name', 'code', 'description', 'displayable',
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
  filterPayload : (group)=>{
    return group.code === 'SINGULARITY_GRAPH_ADMIN_ROLE' ||
      group.accessrole ||
      group.featurerole ||
      group.displayable;
  },
  getReducerRoot: ({icatalyst})=>{
    return icatalyst.singularity.roles;
  },
  ...Actions
});

const reducer = generateReducer(definition, Actions/*, initialState, customActions*/);

export {definition};
export default reducer;

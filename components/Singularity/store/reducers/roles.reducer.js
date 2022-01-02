import React from 'react';
import * as Actions from '../actions/roles.actions';
import { createModel, generateReducer, generateUUID } from '../../../../utilities';
import { definition as roleMembers } from './roleMembers.reducer';
import { definition as roleOwners } from './roleOwners.reducer';
import ResourceSharingButton from '../../../Buttons/ResourceSharingButton';

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
    },
    {
      id: 'displayable',
      type : 'boolean',
      display : false,
      default : false,
    },
    {
      id: 'featurerole',
      label: 'Feature Role',
      type : 'boolean',
      display : false,
      default : false,
    },
    {
      id: 'accessrole',
      label: 'Access Role',
      type : 'boolean',
      display : false,
      default : false,
    },
    {
      id: 'mutuallyexclusive',
      display : false,
      label: 'Mutually Exclusive',
      type : 'boolean',
      default : false,
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
  layout : [
    'guid',
    [
      'name',
      'code',
    ],
    'description',
    [
      'displayable',
      'mutuallyexclusive',
      'featurerole',
      'accessrole'
    ]
  ],
  listLayout : [
    'name', 'description', 'displayable',
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
  getRetrieveAllParams : ()=>{
    // We are getting the list of roles owned by this user
    return {
      admin : true
    };
  },
  ...Actions
});

const reducer = generateReducer(definition, Actions/*, initialState, customActions*/);

export {definition};
export default reducer;

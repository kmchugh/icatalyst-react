import * as Actions from '../actions/resourceAccess.actions';
import {createModel, generateReducer} from '@icatalyst/utilities';
import moment from '../../../../@moment';

import {definition as edgeTypeDefinition} from './edgeType.reducer';
import {definition as roleDefinition} from './roles.reducer';
import {definition as groupDefinition} from './groups.reducer';

const EMAIL_PATTERN = /^(([^<>()\\[\]\\.,;:\s@\\"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i;
const isValidEmail = (value) => {
  return !!EMAIL_PATTERN.test(value);
};

const definition = createModel({
  name: 'resourceAccess',
  label: 'Collaborator',
  icon: 'group_work',
  primaryTextField : 'username',
  secondaryTextField : 'edgetype',
  featureImageField: 'backgroundimage',
  addInline : true,
  forceRefreshOnDelete : true,
  onEntityClicked : (/*entity, containerProps*/)=>{
  },
  fields : [
    {
      id : 'guid',
    },{
      id : 'username',
      label : 'User'
    },{
      id : 'userid',
    },{
      id : 'resourcetype',
    },{
      id : 'resourcedescription',
    },{
      id : 'resourceid',
    },{
      id : 'edgetype',
      label : 'Access Type'
    },{
      id : 'edgetypeid',
      display : false,
      required : true,
      label : 'Access Type',
      type: 'entity',
      model: edgeTypeDefinition,
      isLookup : true,
      hideSecondaryText : true
    },{
      id : 'email',
      type : 'email',
      required: false,
      validations : [
        (model, field, value) => {
          // if (model['roleid'] && value) {
          //   return 'Both a role and an email address cannot be set';
          // }
          const {name, label=name} = field;
          if (value && !isValidEmail(value)) {
            return label + ' must be a valid email';
          }
        }
      ]
    },
    {
      id : 'roleid',
      display : false,
      required : false,
      label : 'Role',
      type: 'entity',
      model: roleDefinition,
      isLookup : true,
      hideSecondaryText : false,
      validations : [
        (model, field, value) => {
          if (model['email'] && value) {
            return 'Both a role and an email address cannot be set';
          }
        }
      ]
    },{
      id : 'groupid',
      display : false,
      required : false,
      label : 'Group',
      type: 'entity',
      model: groupDefinition,
      isLookup : true,
      hideSecondaryText : false,
      validations : [
        (model, field, value) => {
          if (model['email'] && value) {
            return 'Both a role and an email address cannot be set';
          }
        }
      ]
    },
    {
      id : 'start',
      label : 'Starting Date',
      type : 'datetime',
      default : ()=>{
        return moment().startOf('day').valueOf();
      }
    },
    {
      id : 'expiry',
      label : 'Ending Date',
      type : 'datetime'
    },
    {
      id : 'entry_start',
      label : 'Date from which this access applies',
      type : 'datetime',
      default : ()=>{
        return moment().startOf('day').valueOf();
      }
    },
    {
      id : 'entry_expiry',
      label : 'Date this access expires (leave blank for never)',
      type : 'datetime'
    },
  ],
  getReducerRoot : ({icatalyst})=>{
    return icatalyst.singularity.resourceAccess;
  },
  getRetrieveAllParams : (parentDefinition, parent)=>{
    return {
      resourceid : parentDefinition.getIdentity(parent),
      type : parentDefinition.name,
      description : parent.name
    };
  },
  auth : (authContext, masterDetailContext)=>{
    // Only allowed to interact with access controls if you are a
    // OWN the resource

    const context = masterDetailContext.parentContext || masterDetailContext;
    const resourceType = context.entityDefinition.resourceName || context.entityDefinition.name;
    const resourceID = context.entityID;

    // TODO: May need to add a roleCheck here

    return new Promise((resolve)=>{
      if (!resourceType || !resourceID) {
        resolve(false);
      } else {
        authContext.isResourceOwner(resourceType, resourceID).then((auth)=>{
          resolve(auth);
        });
      }
    }).then((authorised)=>{
      return {
        create : authorised,
        retrieve : authorised,
        retrieveAll : authorised,
        update : authorised,
        delete : authorised,
        route : authorised
      };
    });
  },
  layout : [
    'email', //'entry_start', 'entry_expiry',
    'roleid',
    'groupid',
    'edgetypeid',
  ],
  listLayout : [
    'username',
    'edgetypeid',
    'start',
    'expiry'
  ],
  getAddParams : (getState, entity, parentDefinition, parent, parentMasterDetailContext)=>{
    const {
      entity : parentEntity,
      entityDefinition : resourceDefinition,
    } = parentMasterDetailContext.parentContext;

    entity.type = resourceDefinition.resourceName || resourceDefinition.name;
    entity.description = parentEntity.description || '';
    entity.resourceid = resourceDefinition.getIdentity(parentEntity);
    entity.starts = entity.entry_start;
    entity.expiry = entity.entry_expiry;

    delete entity.edgetype;
    delete entity.entry_expiry;
    delete entity.entry_start;
    delete entity.resourcedescription;
    delete entity.resourcetype;
    delete entity.entry_expiry;
    delete entity.userid;
    delete entity.username;

    if (entity.groupid && entity.groupid !== '') {
      entity.roleid = entity.groupid;
      delete entity.groupid;
    }

    if (!entity.email) {
      delete entity.email;
    }

    if (!entity.roleid || !entity.roleid === '') {
      delete entity.roleid;
    }

    console.log(entity);

    // We are returning no parameters here as the updates are in the entity
    return {

    };
  },
  ...Actions
});

const reducer = generateReducer(definition, Actions);

export {definition};
export default reducer;

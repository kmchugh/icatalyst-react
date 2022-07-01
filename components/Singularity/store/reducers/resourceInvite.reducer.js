import * as Actions from '../actions/resourceAccess.actions';
// import {createModel, generateReducer} from '@icatalyst/utilities';
import { createModel,generateReducer } from '../../../../utilities';

import EdgeTypeSelection from '../../components/EdgeTypeSelection';

const validateDateSelection = (model)=>{
  const {start, expiry} = model;
  if (start && expiry && start > expiry) {
    return 'The start must be before the expiry';
  } else {
    return null;
  }
};

const definition = createModel({
  name: 'resourceInvite',
  label: 'Invite',
  icon: 'email',
  primaryTextField : 'username',
  secondaryTextField : 'edgetype',
  fields : [
    {
      id : 'guid',
    },{
      id: 'emails',
      type : 'emaillist',
      label : 'Emails',
      showChips : true,
      description : 'Type, or paste a list of email addresses that you would like to share with',
      validations : [
        (model)=>{
          return !model.emails || !model.emails.length > 0 ?
            'At least one email must be entered' :
            null;
        }
      ],
      default: null,
    },{
      id: 'edgeTypes',
      display : false,
      required : true,
      label : 'Access Type',
      type: 'custom',
      Component : EdgeTypeSelection,
    },{
      id: 'start',
      type : 'date',
      default : null,
      validations : [
        validateDateSelection
      ]
    },{
      id: 'expiry',
      type : 'date',
      default : null,
      validations : [
        validateDateSelection
      ]
    },{
      id : 'resourceType',
    },{
      id : 'resourceDescription',
    },{
      id : 'resourceID',
    }
  ],
  getReducerRoot : ({icatalyst})=>{
    return icatalyst.singularity.resourceInvite;
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
  ],
  ...Actions
});

const reducer = generateReducer(definition, Actions);

export {definition};
export default reducer;

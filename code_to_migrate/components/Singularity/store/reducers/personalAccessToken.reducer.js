import React from 'react';

import * as Actions from '../actions/personalAccessToken.actions';
import { createModel, generateReducer } from '../../../../utilities';
import { createDateRangeConstraint } from '../../../EntityView/validations/createDateRangeConstraint';
import TokenDetailsContent from '../../../../modules/UserManagementModule/PersonalAccessTokenModule/components/TokenDetailsContent';
import * as DialogActions from '../../../../store/actions/dialog.actions';

const definition = createModel({
  name: 'personalAccessToken',
  icon: 'key',
  addInline : true,
  onEntityClicked : ()=>{},
  primaryTextField: 'name',
  auth: {
    retrieveAll: 'admin',
    create: 'admin',
    retrieve: 'admin',
    update: 'admin',
    delete: 'admin',
    route: 'admin',
  },
  fields: [
    {
      id: 'guid',
      readonly: true,
    },{
      id: 'name',
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 256,
    }, {
      id: 'audience',
      readonly : true,
      display: false,
      excludeFromModel : true,
    },{
      id: 'clientid',
      readonly : true,
      display: false,
      excludeFromModel : true,
    },{
      id: 'userid',
      readonly : true,
      display: false,
      excludeFromModel : true,
    },{
      id: 'lastaccessed',
      label : 'Last Used',
      type: 'datetime',
      readonly : true,
      excludeFromModel : true,
    }, {
      id: 'start',
      type: 'datetime',
      label: 'Start Date',
      validations : [
        createDateRangeConstraint({
          startFieldID : 'start',
          endFieldID : 'expiry'
        })
      ]
    },
    {
      id: 'expiry',
      type: 'datetime',
      label: 'Expiry Date',
      validations : [
        createDateRangeConstraint({
          startFieldID : 'start',
          endFieldID : 'expiry'
        })
      ]
    },
    {
      id: 'enabled',
      type: 'boolean',
      default: true,
      description: 'Include or exclude this feature from displaying in results'
    },
  ],
  layout: [
    'name',
    ['start', 'expiry'],
  ],
  listLayout: ['name', 'lastaccessed', 'enabled', 'start', 'expiry'],
  getAddParams : (getState, entity)=>{
    entity.audience = window.location.origin.replace('http://', 'https://');
    return {

    };
  },
  getReducerRoot: ({ icatalyst }) => {
    return icatalyst.singularity.personalAccessToken;
  },
  onAdded : (res, dispatch/*, getState*/)=>{
    dispatch(DialogActions.openDialog({
      title : res.name,
      children : <TokenDetailsContent
        token={res}
      />
    }));
  },
  ...Actions,
});

const reducer = generateReducer(
  definition,
  Actions /*, initialState, customActions*/
);

export { definition };
export default reducer;

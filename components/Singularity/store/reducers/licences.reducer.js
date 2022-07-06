import React from 'react';
import * as Actions from '../actions/licences.actions';
import { createModel, generateReducer } from '../../../../utilities';
import GenerateLicenceKey from '../../../../modules/UserManagementModule/OrganisationManagementModule/components/GenerateLicenceKey';

const definition = createModel({
  name: 'licence',
  icon: 'key',
  primaryTextField: 'name',
  secondaryTextField: 'description',
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
      minLength: 4,
      maxLength: 256,
    },{
      id: 'description',
      type: 'string',
      required: false,
      minLength: 1,
      maxLength: 2048,
    },{
      id: 'active',
      type: 'boolean',
      description: 'When active, a licence key can be generated',
    }, {
      id: 'template',
      type: 'json',
      default : {},
    },

    {
      id : 'generateKey',
      label : ' ',
      render(column, field, item){
        return (<GenerateLicenceKey licence={item}/>);
      }
    }
  ],
  layout: (definition, model)=>{
    if (model.guid) {
      // If we are updating
      return [
        [['name','description']],
        'active',
      ];
    } else {
      // If we are creating
      return [
        'name','description'
      ];
    }
  },
  listLayout: ['name', 'description', 'generateKey'],
  getReducerRoot: ({ icatalyst }) => {
    return icatalyst.singularity.licences;
  },
  ...Actions,
});

const reducer = generateReducer(
  definition,
  Actions /*, initialState, customActions*/
);

export { definition };
export default reducer;

import React from 'react';
import * as Actions from '../actions/licences.actions';
import { createModel, generateReducer } from '../../../../utilities';
import { definition as licenceKeysDefinition } from './licenceKeys.reducer';
import GenerateLicenceKey from '../../../../modules/UserManagementModule/OrganisationManagementModule/components/GenerateLicenceKey';
import LicenceConstraints from '../../components/LicenceConstraints';
const definition = createModel({
  name: 'licence',
  icon: 'fa file-contract',
  identityFieldName: 'guid',
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
    }, {
      id : 'duration',
      type: 'number',
      description : 'Number of days a licence is valid when applied',
      required: true,
      minValue : 1,
      maxValue : 3650,
      default : 356,
    },
    {
      id: 'active',
      type: 'boolean',
      description: 'When active, a licence key can be generated',
    }, {
      id: 'template',
      required : true,
      type: 'custom',
      Component(props){
        return (
          <LicenceConstraints {...props}/>
        );
      }
    },
    {
      id : 'generateKey',
      label : ' ',
      render(column, field, item){
        return (<GenerateLicenceKey licence={item}/>);
      }
    },
  ],
  children : [{
    ...licenceKeysDefinition,
    canAdd : false,
  }],
  layout: (definition, model)=>{
    if (model.guid) {
      // If we are updating
      return [
        [['name','description']],
        ['duration', 'active'],
        'template'
      ];
    } else {
      // If we are creating
      return [[
        ['name','duration'],'description'],'template'
      ];
    }
  },
  listLayout: ['name', 'description', 'duration', 'generateKey'],
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

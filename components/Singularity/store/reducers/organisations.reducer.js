import * as Actions from '../actions/organisations.actions';
import { createModel, generateReducer } from '../../../../utilities';
import { createURLConstraint } from '../../../EntityView/validations/createURLConstraint';
import { definition as licenceKeysDefinition } from './licenceKeys.reducer';
import { definition as rolesDefinition } from './roles.reducer';

const definition = createModel({
  name: 'organisation',
  icon: 'warehouse',
  addInline : true,
  primaryTextField: 'name',
  secondaryTextField: 'tagline',
  featureImageField: 'featureImageURI',
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
      id: 'tagline',
      label : 'Tag line',
      type: 'string',
      required: false,
      minLength: 1,
      maxLength: 256,
    },{
      id: 'privacyURI',
      label: 'Privacy Policy Link',
      type: 'string',
      description : 'A link to the organisation privacy policy',
      required: false,
      minLength: 1,
      maxLength: 256,
      validations: [
        createURLConstraint({
          requireHTTPS: true,
        }),
      ],
    },{
      id: 'websiteURI',
      label: 'Website Link',
      type: 'string',
      description : 'A link to the organisation website',
      required: false,
      minLength: 1,
      maxLength: 256,
      validations: [
        createURLConstraint({
          requireHTTPS: true,
        }),
      ],
    },{
      id: 'logoURI',
      type: 'imageuri',
      label: 'Logo Link',
      description : 'A link to the organisation logo',
      required: false,
      minLength: 1,
      maxLength: 1024,
      validations: [
        createURLConstraint({
          requireHTTPS: true,
        }),
      ],
    },{
      id: 'featureImageURI',
      label : 'Feature Image Link',
      description : 'Link to an image representing this organisation',
      type: 'imageuri',
      required: false,
      minLength: 1,
      maxLength: 1024,
      validations: [
        createURLConstraint({
          requireHTTPS: true,
        }),
      ],
    },{
      id: 'licence',
      label: 'Licence Key',
      type: 'string',
      minLength : 1,
      maxLength : 256,
      validations: [
        (model, field, value) => {
          // If a new record then licence is required, otherwise not required
          if (model?.guid) {
            return null;
          }
          if (value === null || value === undefined) {
            return `${field.label} is required`;
          }
        }
      ],
    }
  ],
  layout: (definition, entity)=>{
    return (entity.guid) ? [
      [['name','description', 'tagline']],
      ['websiteURI', 'privacyURI'],
      ['logoURI', 'featureImageURI']
    ] : [
      'licence',
      'name', 'tagline', 'description'
    ];
  },
  listLayout: ['name'],
  getReducerRoot: ({ icatalyst }) => {
    return icatalyst.singularity.organisations;
  },
  children : [
    {
      ...licenceKeysDefinition
    },{
      ...rolesDefinition
    }
  ],
  ...Actions,
});

const reducer = generateReducer(
  definition,
  Actions /*, initialState, customActions*/
);

export { definition };
export default reducer;

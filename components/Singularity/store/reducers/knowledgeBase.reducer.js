import * as Actions from '../actions/knowledgeBase.actions';
import { createModel, generateReducer } from '../../../../utilities';
import { createURLConstraint } from '../../../EntityView/validations/createURLConstraint';

const definition = createModel({
  name: 'knowledgeBaseItem',
  icon: 'fa book-reader',
  primaryTextField: 'title',
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
    },
    {
      id: 'clientid',
      readonly: true,
      display: false,
    },
    {
      id: 'title',
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 256,
    },{
      id: 'category',
      type: 'string',
      required: false,
      minLength: 1,
      maxLength: 256,
    },
    {
      id: 'excerpt',
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 2048,
    },
    {
      id: 'tags',
      type: 'string',
      required: false,
      minLength: 1,
      maxLength: 2048,
    },
    {
      id: 'start',
      type: 'date',
      label: 'Start Date',
      onChange:[(data)=>data.start]
    },
    {
      id: 'expiry',
      type: 'date',
      label: 'Expiry Date',
    },
    {
      id: 'enabled',
      type: 'boolean',
      default: true,
      description: 'Include or exclude this feature from displaying in results'
    },
    {
      id: 'content',
      type: 'string',
      required: false,
      minLength: 1,
      maxLength: 65535,
    },
    {
      id: 'featureimageurl',
      label : 'Feature Image URL',
      description: 'Link to an image representing this feature',
      type: 'string',
      required: false,
      minLength: 1,
      maxLength: 1024,
      validations: [
        createURLConstraint({
          requireHTTPS: true,
        }),
      ],
    },
    {
      id: 'mediaurl',
      type: 'string',
      label : 'Media URL',
      description: 'Link to a demonstration of this feature',
      required: false,
      minLength: 1,
      maxLength: 1024,
      validations: [
        createURLConstraint({
          requireHTTPS: true,
        }),
      ],
    },
    {
      id: 'includeintips',
      label: 'Include in Tips',
      description: 'Show this feature in popup tips',
      type: 'boolean',
      default: false,
    },
    {
      id: 'includeinkb',
      label: 'Make searchable',
      description: 'Show this feature in the search results',
      type: 'boolean',
      default: false,
    },
    {
      id: 'includeintour',
      label: 'Include in Tour',
      description : 'Include this feature in onboarding tours',
      type: 'boolean',
      default: false,
      validations : [(model, field, value)=>{
        // This is only required if include in tour is set
        if (model.tourcontrolid && !value) {
          return 'required when tour control is set';
        } else if (!model.tourcontrolid && value) {
          return 'not allowed if tour control is not set';
        }
      }]
    },
    {
      id: 'tourcontrolid',
      label: 'Tour Control ID',
      description: 'The programmatic identifier of an element to link this feature to',
      minLength: 1,
      maxLength: 256,
      validations : [(model, field, value)=>{
        // This is only required if include in tour is set
        if (model.includeintour && !value) {
          return 'required when included in tour';
        } else if (!model.includeintour && value) {
          return 'not allowed if not including in tour';
        }
      }]
    },
    {
      id: 'authroles',
      label: 'Authorisation Roles',
      description: 'The roles that can see this feature, empty for all',
      required: false,
      minLength: 1,
      maxLength: 1024,
    },
    {
      id: 'keywords',
      readonly: true,
      required: false,
    },
    {
      id: 'additionaldata',
      label: 'Additional Data',
      display: false,
      required: false,
      minLength: 1,
      maxLength: 65535,
    },
  ],
  layout: [
    'title',
    ['excerpt', 'tags'],
    'content',
    ['featureimageurl', 'mediaurl'],
    ['start', 'expiry', 'category'],
    [
      ['enabled', 'includeintips'],
      ['includeinkb'],
      ['includeintour', 'tourcontrolid']
    ],
    'authroles',
  ],
  listLayout: ['title'],
  getReducerRoot: ({ icatalyst }) => {
    return icatalyst.singularity.knowledgeBase;
  },
  ...Actions,
});

const reducer = generateReducer(
  definition,
  Actions /*, initialState, customActions*/
);

export { definition };
export default reducer;

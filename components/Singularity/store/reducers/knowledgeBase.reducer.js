import * as Actions from '../actions/knowledgeBase.actions';
import { createModel, generateReducer } from '../../../../utilities';
import { createURLConstraint } from '../../../EntityView/validations/createURLConstraint';
import { createDateRangeConstraint } from '../../../EntityView/validations/createDateRangeConstraint';

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
      excludeFromModel : true,
    },
    {
      id: 'title',
      type: 'richtext',
      required: true,
      minLength: 1,
      maxLength: 256,
      rteConfig : {
        multiline : false,
        buttons: [
          'bold',
          'italic'
        ]
      },
      format : (value)=>{
        return value && value.replace(/<\/?[^>]+(>|$)/g, '');
      }
    },{
      id: 'category',
      type: 'tags',
      required: false,
      minLength: 1,
      maxLength: 256,
      multiple: false,
      getOptions : ()=>{
        return {
          definition,
          extractOptions : (entities)=>{
            return entities
              .map(e=>e.category)
              .filter(i=>i)
              .filter((v, i, a)=>a.indexOf(v) === i);
          }
        };
      }
    },{
      id: 'excerpt',
      type: 'richtext',
      required: true,
      minLength: 1,
      maxLength: 2048,
    },{
      id: 'tags',
      type: 'tags',
      required: false,
      minLength: 1,
      maxLength: 2048,
      delimiter : ';',
      getOptions : ()=>{
        return {
          definition,
          extractOptions : (entities)=>{
            return entities
              .map(e=>e.tags)
              .filter(i=>i)
              .flatMap(i=>i.split(';'))
              .filter((v, i, a)=>a.indexOf(v) === i);
          }
        };
      }
    },
    {
      id: 'start',
      type: 'date',
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
      type: 'date',
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
    {
      id: 'content',
      type: 'richtext',
      required: false,
      minLength: 1,
      maxLength: 65535,
    },
    {
      id: 'featureimageurl',
      label : 'Feature Image URL',
      description: 'Link to an image representing this feature',
      type: 'imageuri',
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
      default: true,
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
      type: 'tags',
      description: 'The roles that can see this feature, leave empty for everyone to see',
      required: false,
      minLength: 1,
      maxLength: 1024,
      delimiter : ';',
      getOptions : ()=>{
        return {
          definition,
          extractOptions : (entities)=>{
            return entities
              .map(e=>e.authroles)
              .filter(i=>i)
              .flatMap(i=>i.split(';'))
              .filter((v, i, a)=>a.indexOf(v) === i);
          }
        };
      }
    },
    {
      id: 'keywords',
      readonly: true,
      required: false,
      excludeFromModel : true,
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
    ['excerpt', ['tags', 'category']],
    'content',
    ['featureimageurl', 'mediaurl'],
    ['start', 'expiry'],
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

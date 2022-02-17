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
      id: 'clientId',
      readonly: true,
      display: false,
    },
    {
      id: 'title',
      type: 'string',
      required: true,
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
    },
    {
      id: 'content',
      type: 'string',
      required: false,
      minLength: 1,
      maxLength: 65535,
    },
    {
      id: 'featureImageURL',
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
      id: 'mediaURL',
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
      id: 'includeInTip',
      type: 'boolean',
      default: false,
    },
    {
      id: 'includeInKB',
      type: 'boolean',
      default: false,
    },
    {
      id: 'includeInTour',
      type: 'boolean',
      default: false,
    },
    {
      id: 'tourControlID',
      required: true,
      minLength: 1,
      maxLength: 256,
    },
    {
      id: 'authRoles',
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
      id: 'additionalData',
      required: false,
      minLength: 1,
      maxLength: 65535,
    },
  ],
  layout: [
    [
      ['title', ['tourControlID', 'keywords']],
      [['enabled', 'includeInTip'], ['includeInKB', 'includeInTour']]
    ],
    [
      [['start', 'expiry']],
      []
    ],
    ['featureImageURL', 'mediaURL'],
    ['excerpt', 'tags'],
    'content',
    'authRoles',
    'additionalData',
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

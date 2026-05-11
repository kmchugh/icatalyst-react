import * as Actions from '../actions/organisationEntitySettings.actions';
import { createModel, generateReducer } from '../../../../utilities';

const definition = createModel({
  name: 'organisationEntitySetting',
  icon: 'tune',
  onEntityClicked: ()=>{},
  auth: {
    retrieve: true,
    route: true,
  },
  fields: [
    {
      id: 'guid',
      readonly: true,
    },
    {
      id: 'name',
      readonly: true,
      required: false,
    },
  ],
  layout: ['name'],
  listLayout: ['name'],
  getReducerRoot: ({ icatalyst }) => {
    return icatalyst.singularity.organisationEntitySettings;
  },
  ...Actions,
});

const reducer = generateReducer(
  definition,
  Actions
);

export { definition };
export default reducer;

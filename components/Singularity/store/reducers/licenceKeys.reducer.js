import * as Actions from '../actions/licenceKeys.actions';
import { createModel, generateReducer } from '../../../../utilities';
import moment from '../../../../@moment';

const definition = createModel({
  name: 'licenceKey',
  icon: 'key',
  primaryTextField: 'name',
  secondaryTextField: 'description',
  onEntityClicked: ()=>{},
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
      label: 'Key',
      readonly: true,
    },
    {
      id: 'applied',
      readonly: true,
      type: 'datetime'
    },
    {
      id: 'organisationID',
      readonly: true,
      type: 'string'
    }, {
      id: 'organisation',
      readonly: true,
      type: 'string',
      getValue(entity) {
        return entity.Organisation?.name;
      }
    }, {
      id: 'duration',
      type: 'number',
      minValue: 1,
      maxValue: 3065,
      description: 'The number of days this key will be valid after it is applied'
    }
  ],
  layout: ['duration'],
  listLayout: ['guid', 'duration', 'applied',
    {
      id : 'expiry',
      label : 'Expired',
      render(column, field, item){
        const endDate = moment(item.created).add(item.duration, 'days');
        const ExpiredDate = endDate.format('DD/MM/YYYY, h:mm:ss');
        return ExpiredDate;
      }
    },
    'organisation'],
  getReducerRoot: ({ icatalyst }) => {
    return icatalyst.singularity.licenceKeys;
  },
  getRetrieveAllParams : (parentDefinition, parent)=>{
    return {
      licenceID : parentDefinition.getIdentity(parent),
    };
  },
  getDeleteParams : (getState, parentMasterDetailContext)=>{
    return {
      licenceID : parentMasterDetailContext.parentContext.entityID
    };
  },
  ...Actions,
});

const reducer = generateReducer(
  definition,
  Actions /*, initialState, customActions*/
);

export { definition };
export default reducer;

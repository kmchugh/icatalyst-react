import * as Actions from '../actions/userReports.actions';
import {createModel, generateReducer} from '../../../../utilities';
import moment from '../../../../@moment';

const definition = createModel({
  name: 'userReport',
  icon: 'fa users-cog',
  primaryTextField : 'displayname',
  auth: {
    retrieveAll : 'admin',
    // create : 'admin',
    retrieve : 'admin',
    // update : 'admin',
    // delete : 'admin',
    route : 'admin'
  },
  fields : [
    {
      id: 'email',
      readonly : true,
      width: 312,
    },{
      id: 'displayName',
      label: 'Display Name',
      width: 256,
      required: true,
      minLength: 4,
      maxLength: 256,
      readonly : true,
      sortType: 'string',
    },{
      id : 'created',
      label : 'User Since',
      readonly : true,
      render(column, field, item){
        return moment(item.created).format('LL');
      }
    }, {
      id : 'role_owner_count',
      label : 'Roles (O)',
      readonly : true,
    }, {
      id : 'role_member_count',
      label : 'Roles (M)',
      readonly : true,
    },

    {
      id : 'framework_owner_count',
      label : 'Engagements (O)',
      readonly : true,
    }, {
      id : 'framework_member_count',
      label : 'Engagements (M)',
      readonly : true,
    },

    {
      id : 'dashboard_owner_count',
      label : 'Dashboards (O)',
      readonly : true,
    }, {
      id : 'dashboard_member_count',
      label : 'Dashboards (M)',
      readonly : true,
    },

    {
      id : 'space_owner_count',
      label : 'Spaces (O)',
      readonly : true,
    }, {
      id : 'space_member_count',
      label : 'Spaces (M)',
      readonly : true,
    },

    {
      id : 'embedded_owner_count',
      label : 'Embedded Links(O)',
      readonly : true,
    }, {
      id : 'embedded_member_count',
      label : 'Embedded Links(M)',
      readonly : true,
    },
  ],
  listLayout : [
    'displayName',
    'email',
    'created',
    'role_owner_count',
    'role_member_count',

    'framework_owner_count',
    'framework_member_count',

    'dashboard_owner_count',
    'dashboard_member_count',

    'space_owner_count',
    'space_member_count',

    'embedded_owner_count',
    'embedded_member_count',
  ],
  transformPayload : (data)=>{
    return {
      ...data,
      ...parseFieldData(data, 'role'),
      ...parseFieldData(data, 'framework'),
      ...parseFieldData(data, 'dashboard'),
      ...parseFieldData(data, 'space'),
      ...parseFieldData(data, 'embedded'),
    };
  },
  getReducerRoot: ({icatalyst})=>{
    return icatalyst.singularity.userReports;
  },
  ...Actions
});

const parseFieldData = (data, field)=>{
  const edges = (data[field] || []).reduce((acc, row)=>{
    row.edges.forEach((edge)=>{
      const item = {
        resourceID : row.resourceID,
        name : row.name,
        resourceType : field
      };

      if (edge === 'Member') {
        acc.member.push(item);
      }

      if (edge === 'Owner') {
        acc.owner.push(item);
      }
    });
    return acc;
  }, {
    owner : [],
    member : []
  });

  return !data[field] ? null : {
    [`${field}_owner_count`] : edges.owner.length,
    [`${field}_member_count`] : edges.member.length
  };
};

const reducer = generateReducer(definition, Actions/*, initialState, customActions*/);

export {definition};
export default reducer;

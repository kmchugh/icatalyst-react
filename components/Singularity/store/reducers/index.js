import {combineReducers} from 'redux';
import client from './client.reducer';
import invites from './invites.reducer';
import profiles from './profile.reducer';
import roles from './roles.reducer';
import rolemembers from './roleMembers.reducer';
import roleowners from './roleOwners.reducer';
import version from './version.reducer';
import users from './users.reducer';
import groups from './groups.reducer';
import edgetypes from './edgeType.reducer';
import resourceAccess from './resourceAccess.reducer';

const reducers = combineReducers({
  client,
  invites,
  profiles,
  roles,
  rolemembers,
  roleowners,
  version,
  users,
  groups,
  edgetypes,
  resourceAccess
});

export default reducers;

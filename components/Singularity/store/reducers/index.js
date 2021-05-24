import {combineReducers} from 'redux';
import client from './client.reducer';
import profiles from './profile.reducer';
import roles from './roles.reducer';
import rolemembers from './roleMembers.reducer';
import version from './version.reducer';
import users from './users.reducer';

const reducers = combineReducers({
  client,
  profiles,
  roles,
  rolemembers,
  version,
  users
});

export default reducers;

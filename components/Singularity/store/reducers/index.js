import {combineReducers} from 'redux';
import client from './client.reducer';
import profiles from './profile.reducer';
import roles from './roles.reducer';
import rolemembers from './roleMembers.reducer';
import version from './version.reducer';

const reducers = combineReducers({
  client,
  profiles,
  roles,
  rolemembers,
  version
});

export default reducers;

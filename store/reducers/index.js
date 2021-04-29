import {combineReducers} from 'redux';
import dialog from './dialog.reducer';
import settings from './settings.reducer';
import message from './message.reducer';
import navbar from './navbar.reducer';
import navigation from './navigation.reducer';
import singularity from '../../components/Singularity/store/reducers';

const reducers = combineReducers({
  dialog,
  settings,
  message,
  navbar,
  navigation,
  singularity
});

export default reducers;

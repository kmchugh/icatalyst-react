import {combineReducers} from 'redux';
import dialog from './dialog.reducer';
import settings from './settings.reducer';
import message from './message.reducer';
import navbar from './navbar.reducer';
import navigation from './navigation.reducer';
import singularity from '../../components/Singularity/store/reducers';
import language from './language.reducer';

const reducers = combineReducers({
  dialog,
  settings,
  message,
  navbar,
  navigation,
  singularity,
  language
});

export default reducers;

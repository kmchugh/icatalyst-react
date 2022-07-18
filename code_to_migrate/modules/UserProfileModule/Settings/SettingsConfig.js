import {createRouteConfig} from '../../../utilities';
import SettingsComponent from './components/SettingsComponent';

export function createModule(overrides = {
  auth : 'user'
}){
  return createRouteConfig({
    name : 'settings',
    title : 'Settings',
    icon : 'settings',
    navigation: true,
    component : SettingsComponent
  }, overrides);
}

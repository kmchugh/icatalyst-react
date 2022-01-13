import {createRouteConfig} from '../../../utilities';
import SettingsComponent from './components/SettingsComponent';

export function createModule(overrides){
  return createRouteConfig({
    name : 'settings',
    title : 'Settings',
    icon : 'settings',
    navigation: true,
    component : SettingsComponent
  }, overrides);
}

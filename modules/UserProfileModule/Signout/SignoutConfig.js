import {createRouteConfig} from '../../../utilities';
import SignoutComponent from './components/SignoutComponent';

export function createModule(overrides = {
  auth : 'user'
}){
  return createRouteConfig({
    name : 'signout',
    title : 'Sign Out',
    icon : 'power_settings_new',
    navigation: true,
    component : SignoutComponent
  }, overrides);
}

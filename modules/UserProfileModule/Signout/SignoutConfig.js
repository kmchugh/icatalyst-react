import {createRouteConfig} from '../../../utilities';
import {VersionScreen} from '@icatalyst/modules/InfoModule/components';

export function createModule(overrides){
  return createRouteConfig({
    name : 'signout',
    title : 'Sign Out',
    icon : 'power_settings_new',
    navigation: true,
    component : VersionScreen
  }, overrides);
}

import {createRouteConfig} from '../../../utilities';
import {VersionScreen} from '@icatalyst/modules/InfoModule/components';

export function createModule(overrides){
  return createRouteConfig({
    name : 'settings',
    title : 'Settings',
    icon : 'settings',
    navigation: true,
    component : VersionScreen
  }, overrides);
}

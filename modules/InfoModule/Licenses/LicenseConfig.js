import {createRouteConfig} from '../../../utilities';
import {VersionScreen} from '../components';

export function createModule(overrides){
  return createRouteConfig({
    icon : 'fa file-alt',
    name: 'license',
    path: 'license',
    component : VersionScreen,
  }, overrides);
}

import {createRouteConfig} from '../../../utilities';
import {VersionScreen} from '../components';

export function createModule(overrides){
  return createRouteConfig({
    icon : 'fa poll',
    name: 'version',
    path: 'version',
    component : VersionScreen
  }, overrides);
}

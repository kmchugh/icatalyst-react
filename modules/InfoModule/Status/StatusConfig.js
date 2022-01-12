import {createRouteConfig} from '../../../utilities';
import {VersionScreen} from '../components';

export function createModule(overrides){
  return createRouteConfig({
    icon : 'fa file-medical-alt',
    name: 'status',
    title: 'Status',
    component : VersionScreen,
  }, overrides);
}

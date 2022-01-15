import {createRouteConfig} from '../../../utilities';
import {VersionScreen} from '../components';

export function createModule(overrides = {
  auth : 'everyone'
}){
  return createRouteConfig({
    icon : 'fa file-medical-alt',
    name: 'status',
    title: 'Status',
    component : VersionScreen,
  }, overrides);
}

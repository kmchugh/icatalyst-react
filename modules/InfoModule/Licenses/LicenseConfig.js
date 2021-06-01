import {createRouteConfig} from '../../../utilities';
import {VersionScreen} from '../components';
import _ from '../../../@lodash';

export function createModule(config={}){
  const moduleConfig = _.merge({
    icon : 'fa file-alt',
    name: 'license',
    path: 'license',
    component : VersionScreen,
  }, config);

  return createRouteConfig(moduleConfig);
}

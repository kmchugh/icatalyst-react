import {createModule as aboutDefinition} from './About';
import {createRouteConfig} from '../../utilities/createRouteConfig';
import _ from '../../@lodash';

export function createModule(config={}){

  const { modules = {}, ...rest } = config;

  const moduleConfig = _.merge({
    name : 'Software',
    path : 'info',
    icon : 'fa info',
    navigation: true,
    component : null,
    paths : [
      createRouteConfig(aboutDefinition(modules))
    ]
  }, rest);

  return createRouteConfig(moduleConfig);
}

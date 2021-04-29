import {default as aboutDefinition} from './About';
import {createRouteConfig} from '../../utilities/createRouteConfig';

const routeInfo = createRouteConfig({
  name : 'Software',
  path : 'info',
  icon : 'fa info',
  navigation: true,
  component : null,
  paths : [
    createRouteConfig(aboutDefinition)
  ]
});
export default routeInfo;

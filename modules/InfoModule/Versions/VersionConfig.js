import {createRouteConfig} from '../../../utilities';
import {VersionScreen} from '../components';

export default createRouteConfig({
  icon : 'fa poll',
  name: 'version',
  path: 'version',
  component : VersionScreen
});

import {createRouteConfig} from '../../../utilities';
import {VersionScreen} from '../components';

export default createRouteConfig({
  icon : 'fa file-alt',
  name: 'license',
  path: 'license',
  component : VersionScreen,
  visible : false
});

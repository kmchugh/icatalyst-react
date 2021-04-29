import {createRouteConfig} from '../../../utilities';
import {VersionScreen} from '../components';

export default createRouteConfig({
  icon : 'fa file-medical-alt',
  name: 'status',
  title: 'Status',
  component : VersionScreen,
  visible : false,
});

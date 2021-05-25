import {createRouteConfig} from '../../../utilities';
import {VersionScreen} from '../components';

import {useSelector} from 'react-redux';

export default createRouteConfig({
  icon : 'fa file-contract',
  name: 'terms',
  title: 'Terms and Conditions',
  component : VersionScreen,
  visible : ()=>{
    const {client} = useSelector(({icatalyst})=>icatalyst.singularity.client);

    return !!(client && client.termsuri);
  }
});

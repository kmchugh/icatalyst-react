import React, {lazy} from 'react';
import {createRouteConfig} from '../../../utilities';

const WebViewPage = lazy(() => import('@icatalyst/pages/WebViewPage'));

import {useSelector} from 'react-redux';

export function createModule(overrides = {
  auth : 'everyone'
}){
  return createRouteConfig({
    icon : 'policy',
    name: 'privacy',
    title: 'Privacy Policy',
    component(){
      const {client} = useSelector(({icatalyst})=>icatalyst.singularity.client);
      return client ? (<WebViewPage
        title="Privacy Policy"
        uri={client && client.privacyuri}
      />) : null;
    }
  }, overrides);
}

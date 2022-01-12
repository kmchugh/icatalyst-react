import React from 'react';
import {createRouteConfig} from '../../../utilities';
import WebView from '@icatalyst/components/WebView';

import {useSelector} from 'react-redux';

export function createModule(overrides){
  return createRouteConfig({
    icon : 'policy',
    name: 'privacy',
    title: 'Privacy Policy',
    component(){
      const {client} = useSelector(({icatalyst})=>icatalyst.singularity.client);
      return (<WebView uri={client && client.privacyuri}/>);
    }
  }, overrides);
}

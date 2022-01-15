import React from 'react';
import {createRouteConfig} from '../../../utilities';
import WebView from '@icatalyst/components/WebView';

import {useSelector} from 'react-redux';

export function createModule(overrides = {
  auth : 'everyone'
}){
  return createRouteConfig({
    icon : 'fa file-contract',
    name: 'terms',
    title: 'Terms and Conditions',
    component(){
      const {client} = useSelector(({icatalyst})=>icatalyst.singularity.client);
      return (<WebView uri={client && client.termsuri}/>);
    }
  }, overrides);
}

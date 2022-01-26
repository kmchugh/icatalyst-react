import React from 'react';
import {createRouteConfig} from '../../../utilities';
import WebViewPage from '@icatalyst/pages/WebViewPage';

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
      return client ? (<WebViewPage
        title="Terms and Conditions"
        uri={client && client.termsuri}
      />) : null;
    }
  }, overrides);
}

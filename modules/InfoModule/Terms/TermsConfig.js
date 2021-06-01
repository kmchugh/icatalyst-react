import React from 'react';
import {createRouteConfig} from '../../../utilities';
import WebView from '@icatalyst/components/WebView';

import {useSelector} from 'react-redux';
import _ from '../../../@lodash';

export function createModule(config={}){
  const moduleConfig = _.merge({
    icon : 'fa file-contract',
    name: 'terms',
    title: 'Terms and Conditions',
    component(){
      const {client} = useSelector(({icatalyst})=>icatalyst.singularity.client);
      return (<WebView uri={client && client.termsuri}/>);
    }
  }, config);

  return createRouteConfig(moduleConfig);
}

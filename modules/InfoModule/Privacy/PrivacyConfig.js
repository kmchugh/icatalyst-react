import React from 'react';
import {createRouteConfig} from '../../../utilities';
import WebView from '@icatalyst/components/WebView';

import {useSelector} from 'react-redux';

export default createRouteConfig({
  icon : 'policy',
  name: 'privacy',
  title: 'Privacy Policy',
  component(){
    const {client} = useSelector(({app})=>{
      return app.singularity.client;
    });
    return (<WebView uri={client && client.privacyuri}/>);
  },
  visible : ()=>{
    const {client} = useSelector(({app})=>{
      return app.singularity.client;
    });
    return !!(client && client.privacyuri);
  }
});

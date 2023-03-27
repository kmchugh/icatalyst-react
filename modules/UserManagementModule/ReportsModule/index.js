import {lazy} from 'react';

import {createRouteConfig} from '@icatalyst/utilities';

export function createModule(config={
  auth : 'admin'
}){
  let { auth }  = config;

  if (auth && typeof auth !== 'function') {
    config.auth = ()=>({
      create : auth,
      retrieve : auth,
      retrieveAll : auth,
      update : auth,
      delete : auth,
      route : auth
    });
  }

  return createRouteConfig({
    name : 'reports',
    title : 'Reports',
    auth : auth,
    icon : 'summarize',
    skipLevel : true,
    component : lazy(() => import('./components/ReportsList')),
    navigation : true,
    paths : [{
      path : 'users',
      component : lazy(() => import('./components/UserReport')),
      auth : config.auth && config.auth().retrieveAll
    }]
  });
}

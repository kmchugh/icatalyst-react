import {lazy} from 'react';

import {createRouteConfig} from '@icatalyst/utilities';
import {definition} from '@icatalyst/components/Singularity/store/reducers/invites.reducer';
import _ from '../../../@lodash';

const CreateInvitation = lazy(() => import('./components/CreateInvitation'));

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

  return createRouteConfig(_.merge({}, definition, config), {
    paths : [
      {
        path : 'users',
        component : CreateInvitation,
        auth : config.auth && config.auth().create
      }
    ]
  });
}

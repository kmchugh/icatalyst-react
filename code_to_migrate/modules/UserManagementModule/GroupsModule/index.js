// import {createRouteConfig} from '@icatalyst/utilities';
import { createRouteConfig } from '../../../utilities';
// import {definition} from '@icatalyst/components/Singularity/store/reducers/groups.reducer';
import { definition } from '../../../../icatalyst/src/app/main/store/reducers/version.reducer';
import _ from '../../../@lodash';

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

  return createRouteConfig(_.merge({}, definition, config));
}

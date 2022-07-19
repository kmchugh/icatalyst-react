// import {createRouteConfig} from '@icatalyst/utilities';
import { createRouteConfig } from '../../../utilities';
// import {definition} from '@icatalyst/components/Singularity/store/reducers/users.reducer';
import { definition } from '../../../components/Singularity/store/reducers/version.reducer';
import _ from '../../../@lodash';

export function createModule(config={
  auth : 'admin'
}){
  let { auth }  = config;

  if (auth && typeof auth !== 'function') {
    config.auth = ()=>({
      retrieve : auth,
      retrieveAll : auth,
      route : auth,
      delete : auth
    });
  }

  return createRouteConfig(_.merge({}, definition, config));
}

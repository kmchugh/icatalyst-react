import {createRouteConfig} from '@icatalyst/utilities';
import {definition} from '@icatalyst/components/Singularity/store/reducers/users.reducer';
import _ from '../../../@lodash';

export function createModule(config={}){
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

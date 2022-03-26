import {createRouteConfig} from '@icatalyst/utilities';
import {definition} from '@icatalyst/components/Singularity/store/reducers/personalAccessToken.reducer';
import _ from '../../../@lodash';

export function createModule(config={
  auth : 'admin'
}){
  let { auth }  = config;

  if (auth && typeof auth !== 'function') {
    config.auth = ()=>(
      typeof auth === 'object' ? auth :
        {
          create : auth,
          retrieve : auth,
          retrieveAll : auth,
          update : auth,
          delete : auth,
          route : auth
        }
    );
  }

  return createRouteConfig(_.merge({}, definition, config));
}

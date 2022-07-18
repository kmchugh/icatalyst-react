import {createRouteConfig} from '../../../utilities';
import {definition} from '../../../components/Singularity/store/reducers/knowledgeBase.reducer';
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

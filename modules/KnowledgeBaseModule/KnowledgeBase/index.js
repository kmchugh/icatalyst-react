import {createRouteConfig} from '@icatalyst/utilities';
import {definition} from '@icatalyst/components/Singularity/store/reducers/knowledgeBase.reducer';
import _ from '@icatalyst/@lodash';

export function createModule(config={
  auth : 'everyone'
}){
  let { auth }  = config;

  if (auth && typeof auth !== 'function') {
    config.auth = ()=>({
      create : false,
      retrieve : auth,
      retrieveAll : auth,
      update : false,
      delete : false,
      route : auth
    });
  }

  return createRouteConfig(_.merge({}, {
    ...definition,
    name : 'knowledgeBase',
    icon : 'fa book-open',
    labelPlural : 'Knowledge Base'
  }, config));
}

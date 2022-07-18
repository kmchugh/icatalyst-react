// import {createRouteConfig} from '@icatalyst/utilities';
import { createRouteConfig } from '../../../utilities';
// import {definition} from '@icatalyst/components/Singularity/store/reducers/knowledgeBase.reducer';
import { definition } from '../../../../icatalyst/src/app/main/store/reducers/version.reducer';
// import _ from '@icatalyst/@lodash';
import _ from '../../../@lodash/@lodash';

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

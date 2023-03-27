import {createRouteConfig} from '../../../../utilities';
import {definition as licenceDefinition} from '../../../../components/Singularity/store/reducers/licences.reducer';
import _ from '../../../../@lodash';

export function createModule(config={
  auth : 'admin'
}){

  let { auth }  = config;

  if (auth && typeof auth !== 'function') {
    config.auth = ()=>({
      retrieveAll: auth,
      create: auth,
      retrieve: auth,
      update: auth,
      delete: auth,
      route: auth,
    });
  }

  return createRouteConfig(_.merge({}, licenceDefinition, config));
}

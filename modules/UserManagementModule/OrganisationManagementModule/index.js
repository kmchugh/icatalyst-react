import {createRouteConfig} from '../../../utilities';
import {createModule as manageOrganisationsConfig} from './OrganisationModule';
import {createModule as manageLicencesConfig} from './LicenceModule';

export function createModule(config={}){

  const { modules = {}, ...rest } = config;
  const {
    organisations, licences
  } = modules;

  return createRouteConfig({
    name: 'organisationManagement',
    title: 'Organisations',
    icon : 'fa sitemap',
    path: 'organisationManagement',
    // Base component so that everything in this route is under an expandable menu item
    component : ()=>null,
    auth : 'admin',
    paths : [
      organisations && organisations.visible === false ? null : createRouteConfig(manageOrganisationsConfig(organisations)),
      licences && licences.visible === false ? null : createRouteConfig(manageLicencesConfig(licences)),
    ].filter(i=>i)
  }, rest);
}

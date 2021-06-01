import { createRouteConfig } from '../../../utilities/createRouteConfig';
import {createModule as versionConfig} from '../Versions/VersionConfig';
import {createModule as licenseConfig} from '../Licenses/LicenseConfig';
import {createModule as termsConfig} from '../Terms/TermsConfig';
import {createModule as privacyConfig} from '../Privacy/PrivacyConfig';
import {createModule as statusConfig} from '../Status/StatusConfig';


export function createModule(config={}){

  const {
    version, terms, status, privacy, license
  } = config;

  const moduleConfig = {
    icon : 'info',
    name: 'about',
    title: 'About',
    component : null,
    paths : [
      version && version.visible === false ? null : createRouteConfig(versionConfig(version)),
      license && license.visible === false ? null : createRouteConfig(licenseConfig(license)),
      terms && terms.visible === false ? null : createRouteConfig(termsConfig(terms)),
      privacy && privacy.visible === false ? null : createRouteConfig(privacyConfig(privacy)),
      status && status.visible === false ? null : createRouteConfig(statusConfig(status)),
    ].filter(i=>i)
  };

  return createRouteConfig(moduleConfig);
}

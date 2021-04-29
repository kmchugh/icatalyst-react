import { createRouteConfig } from '../../../utilities/createRouteConfig';
import {default as versionConfig} from '../Versions/VersionConfig';
import {default as licenseConfig} from '../Licenses/LicenseConfig';
import {default as termsConfig} from '../Terms/TermsConfig';
import {default as privacyConfig} from '../Privacy/PrivacyConfig';
import {default as statusConfig} from '../Status/StatusConfig';

export default createRouteConfig({
  icon : 'info',
  name: 'about',
  title: 'About',
  paths : [
    createRouteConfig(versionConfig),
    createRouteConfig(licenseConfig),
    createRouteConfig(termsConfig),
    createRouteConfig(privacyConfig),
    createRouteConfig(statusConfig),
  ]
});

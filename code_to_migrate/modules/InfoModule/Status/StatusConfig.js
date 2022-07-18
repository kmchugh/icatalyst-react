import {lazy} from 'react';

import {createRouteConfig} from '../../../utilities';

const VersionScreen = lazy(() => import('../components/VersionScreen'));

export function createModule(overrides = {
  auth : 'everyone'
}){
  return createRouteConfig({
    icon : 'fa file-medical-alt',
    name: 'status',
    title: 'Status',
    component : VersionScreen,
  }, overrides);
}

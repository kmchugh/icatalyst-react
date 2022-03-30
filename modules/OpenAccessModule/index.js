import {lazy} from 'react';

const OpenAccessComponent = lazy(() => import('./components/OpenAccessComponent'));

import {createRouteConfig} from '@icatalyst/utilities';

export function createModule(overrides = {
  auth : 'guest'
}) {
  return createRouteConfig({
    name : 'access',
    title : 'Open Access',
    navigation: false,
    defaultRoute : true,
    component : OpenAccessComponent,
    path : '',
    settings: {
      layout : {
        navbar : {
          display : false
        },
        toolbar : {
          display : false,
        }
      }
    },
  }, overrides);
}

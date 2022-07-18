import {lazy} from 'react';

import pluralize from 'pluralize';
import _ from 'lodash';

const MasterDetailPage = lazy(() => import('../components/MasterDetail'));

/**
 * Creates an Entity Configuration including all
 * routes to access that entity
 * @method createConfig
 * @param  {Object}     definition The model definition to create the config for
 * @param  {Object}     config The configuration object allowing specific overriding
 * @return {Object}            The generated configuration
 */
export function createRouteConfig(definition, overrides) {
  definition = _.merge(definition, overrides);
  const rootAuth = definition.auth || null;

  if (!definition.name) {
    throw new Error('definition not correctly configured');
  }

  return {
    ...definition,
    title : definition.title || definition.labelPlural || _.startCase(pluralize(definition.name)),
    navigation: definition.navigation === undefined ? true : definition.navigation,
    auth : rootAuth,
    path : definition.path || (definition.namePlural || definition.name).toLowerCase(),
    component : definition.component === undefined ? MasterDetailPage : definition.component,

    // If the definition already has a routes property then use that directly
    paths : [
      // If the definition has paths, but wants to include defaults then generate
      ...(!definition.paths || (definition.useDefaultPaths && definition) ? [] : []),

      // If the definition has paths, use them
      ...(definition.paths ? definition.paths : [])

    ],
  };
}

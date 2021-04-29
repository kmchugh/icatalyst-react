import _ from '@lodash';

/**
 * Add the roles that are allowed to navigate to each Component
 * @method setAuthRoles
 * @param  {[Object]}     configs The list of path configurations to add
 * @param  {[String]}     roles   The list of roles that can navigate to this path
 */
export function setAuthRoles(configs, roles) {
  return configs.map(config => _.merge({}, config, {auth: roles}));
}

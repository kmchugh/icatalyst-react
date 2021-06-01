import {createRouteConfig} from '@icatalyst/utilities';
import {createModule as manageGroupsConfig} from './GroupsModule';
import {createModule as manageUsersConfig} from './UsersModule';
import {createModule as manageRolesConfig} from './RolesModule';
import {createModule as manageInvitationsConfig} from './InvitationsModule';
import _ from '../../@lodash';


export function createModule(config={}){

  const { modules = {}, ...rest } = config;
  const {
    users, groups, roles, invites
  } = modules;

  const moduleConfig = _.merge({
    name: 'userManagement',
    title: 'User Management',
    icon : 'fa user-cog',
    path: 'users',
    auth : 'admin',
    component : null,
    paths : [
      roles && roles.visible === false ? null : createRouteConfig(manageRolesConfig(roles)),
      groups && groups.visible === false ? null : createRouteConfig(manageGroupsConfig(groups)),
      users && users.visible === false ? null : createRouteConfig(manageUsersConfig(users)),
      invites && invites.visible === false ? null : createRouteConfig(manageInvitationsConfig(invites)),
    ].filter(i=>i)
  }, rest);

  return createRouteConfig(moduleConfig);
}

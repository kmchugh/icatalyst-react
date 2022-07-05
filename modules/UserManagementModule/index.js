import {createRouteConfig} from '@icatalyst/utilities';
import {createModule as manageGroupsConfig} from './GroupsModule';
import {createModule as manageUsersConfig} from './UsersModule';
import {createModule as manageRolesConfig} from './RolesModule';
import {createModule as manageInvitationsConfig} from './InvitationsModule';
import {createModule as manageOrganisationsConfig} from './OrganisationModule';
import {createModule as viewReportsConfig} from './ReportsModule';


export function createModule(config={}){

  const { modules = {}, ...rest } = config;
  const {
    users, groups, roles, invites, reports, organisations
  } = modules;

  return createRouteConfig({
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
      reports && reports.visible === false ? null : createRouteConfig(viewReportsConfig(reports)),
      organisations && organisations.visible === false ? null : createRouteConfig(manageOrganisationsConfig(organisations)),
    ].filter(i=>i)
  }, rest);
}

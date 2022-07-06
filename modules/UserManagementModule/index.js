import {createRouteConfig} from '@icatalyst/utilities';
import {createModule as manageGroupsConfig} from './GroupsModule';
import {createModule as manageUsersConfig} from './UsersModule';
import {createModule as manageRolesConfig} from './RolesModule';
import {createModule as manageInvitationsConfig} from './InvitationsModule';
import {createModule as manageOrganisationsConfig} from './OrganisationManagementModule';
import {createModule as viewReportsConfig} from './ReportsModule';


export function createModule(config={}){

  const { modules = {}, ...rest } = config;
  const {
    users, groups, roles, invites, reports, organisationManagement
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
      organisationManagement && organisationManagement.visible === false ? null : createRouteConfig(manageOrganisationsConfig(organisationManagement)),
    ].filter(i=>i)
  }, rest);
}

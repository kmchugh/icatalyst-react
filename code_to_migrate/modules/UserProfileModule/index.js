import {lazy} from 'react';

import {createModule as profileConfig} from './Profile/ProfileConfig';
import {createModule as settingsConfig} from './Settings/SettingsConfig';
import {createModule as signoutConfig} from './Signout/SignoutConfig';
import {createRouteConfig} from '../../utilities/createRouteConfig';
import {registerSettings} from 'icatalyst/components/Settings';
// import { registerSettings } from '../../components/Settings';
const ProfileAvatar = lazy(() => import('./components/ProfileAvatar'));
const ProfileDisplayName = lazy(() => import('./components/ProfileDisplayName'));
const ChangePassword = lazy(() => import('./components/ChangePassword'));
const DeleteUser = lazy(() => import('./components/DeleteUser'));

const SINGULARITY_SETTINGS_ID = 'singularity_user';

/**
 * Register the User Settings with the settings provider
 * so they can be managed by the user
 * @type {[type]}
 */
registerSettings([
  {
    name : `${SINGULARITY_SETTINGS_ID}_avatar`,
    sectionName : 'User',
    sectionIndex : 1,
    label : 'Profile Image',
    labelPlural : 'Profile Image',
    global : true,
    fields : [{
      id : 'profileImage',
      type : 'avatar',
    }],
    component : ProfileAvatar,
  },
  {
    name : `${SINGULARITY_SETTINGS_ID}_displayname`,
    sectionName : 'User',
    label : 'Display Name',
    labelPlural : 'Display Name',
    global : true,
    fields : [{
      id : 'displayName',
      type : 'string',
    }],
    component : ProfileDisplayName
  },
  {
    name : `${SINGULARITY_SETTINGS_ID}_password`,
    sectionName : 'User',
    label : 'Change Password',
    labelPlural : 'Change Password',
    global : true,
    fields : [{
      id : 'changePassword',
      type : 'command',
    }],
    component : ChangePassword
  }, {
    name : `${SINGULARITY_SETTINGS_ID}_delete`,
    sectionName : 'User',
    label : 'Delete User',
    labelPlural : 'Delete User',
    global : true,
    fields : [],
    component : DeleteUser
  }
]);

export function createModule(config={}){

  const { modules = {}, ...rest } = config;
  const {profile, settings, signout} = modules;

  return createRouteConfig({
    name : 'user',
    title : 'User',
    path : 'user',
    icon : 'fa user',
    navigation: true,
    component : null,
    paths : [
      profile && profile.visible === false ? null : createRouteConfig(profileConfig(profile)),
      settings && settings.visible === false ? null : createRouteConfig(settingsConfig(settings)),
      signout && signout.visible === false ? null : createRouteConfig(signoutConfig(signout)),
    ]
  }, rest);
}

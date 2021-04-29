export const SET_SETTINGS = '[SETTINGS] SET SETTINGS';
export const SET_DEFAULT_SETTINGS = '[SETTINGS] SET DEFAULT SETTINGS';
export const SET_INITIAL_SETTINGS = '[SETTINGS] SET INITIAL SETTINGS';
export const RESET_DEFAULT_SETTINGS = '[SETTINGS] RESET DEFAULT SETTINGS';
export const OPEN_USER_SETTINGS = '[SETTINGS] OPEN_USER_SETTINGS';
export const CLOSE_USER_SETTINGS = '[SETTINGS] CLOSE_USER_SETTINGS';
export const SET_USER_SETTINGS = '[SETTINGS] SET_USER_SETTINGS';

export function openUserSettings()
{
  return {
    type: OPEN_USER_SETTINGS
  };
}

export function closeUserSettings()
{
  return {
    type: CLOSE_USER_SETTINGS
  };
}

export function setSettings(value)
{
  return {
    type: SET_SETTINGS,
    value
  };
}

export function setDefaultSettings(value)
{
  return {
    type: SET_DEFAULT_SETTINGS,
    value
  };
}

export function setInitialSettings()
{
  return {
    type: SET_INITIAL_SETTINGS
  };
}

export function resetSettings(value)
{
  return {
    type: RESET_DEFAULT_SETTINGS,
    value
  };
}

export function setUserSettings(value) {
  return {
    type : SET_USER_SETTINGS,
    payload : value
  };
}

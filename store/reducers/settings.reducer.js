import * as Actions from '../actions/settings.actions';
import _ from '@lodash';
import CryptoJS from 'crypto-js';

import layouts from 'app/settings/layouts';
import themes from 'app/settings/themes';

import { generateThemeVariants } from '@icatalyst/utilities';

const defaultTheme = _.cloneDeep(Object.values(themes).find(t=>t.default));
const defaultLayout = _.cloneDeep(Object.values(layouts).find(l=>l.default));
const LS_KEY = CryptoJS.MD5('app_settings').toString();

const themeMap = Object.keys(themes).reduce((acc, k)=>{
  acc = {
    ...acc,
    ...generateThemeVariants(k, themes[k], defaultTheme)
  };
  return acc;
}, {});

let lsValue = {};
try {
  lsValue = JSON.parse(atob(localStorage.getItem(LS_KEY) || btoa('{}')));
} catch {
  // Nothing to do here
}

const initialState = {
  userSettingsView : {
    open: false,
  },
  defaults : {
    layout : defaultLayout,
    themes : {
      mainTheme   : themeMap[defaultLayout.theme.main],
      navbarTheme : themeMap[defaultLayout.theme.navbar],
      toolbarTheme: themeMap[defaultLayout.theme.toolbar],
      footerTheme : themeMap[defaultLayout.theme.footer],
      panelTheme : themeMap[defaultLayout.theme.panel],
    },
  },
  current  : {
    layout : defaultLayout,
    themes : {
      mainTheme   : themeMap[defaultLayout.theme.main],
      navbarTheme : themeMap[defaultLayout.theme.navbar],
      toolbarTheme: themeMap[defaultLayout.theme.toolbar],
      footerTheme : themeMap[defaultLayout.theme.footer],
      panelTheme : themeMap[defaultLayout.theme.panel]
    }
  },
  userSettings : lsValue,
  themes   : themeMap
};

export default function (state = initialState, action) {
  switch ( action.type ) {
  case Actions.SET_SETTINGS: {
    if (!layouts[action.value.layout.style]) {
      throw new Error(`The layout [${action.value.layout.style}] is not valid`);
    }
    return {
      ...state,
      // Merge all defaults to make sure all settings are in place
      current: _.merge(
        {},
        state.current,
        action.value && action.value.layout && action.value.layout.style ?
          {
            layout: {
              config: _.merge(layouts[action.value.layout.style].defaults, action.value.layout.config)}
          } :
          {},
        action.value),
    };
  }
  case Actions.OPEN_USER_SETTINGS:
  {
    return {
      ...state,
      userSettingsView : {
        ...state.userSettingsView,
        open : true
      }
    };
  }
  case Actions.CLOSE_USER_SETTINGS:
  {
    return {
      ...state,
      userSettingsView : {
        ...state.userSettingsView,
        open : false
      }
    };
  }
  case Actions.SET_INITIAL_SETTINGS:
  {
    return initialState;
  }
  case Actions.SET_DEFAULT_SETTINGS:
  {
    const newSettings = _.merge({},
      state.defaults,
      action.value && action.value.layout && action.value.layout.style ?
        {layout: {config: layouts[action.value.layout.style].defaults}} :
        {}, action.value);
    return {
      ...state,
      defaults: newSettings,
      current : newSettings,
    };
  }
  case Actions.RESET_DEFAULT_SETTINGS:
  {
    return {
      ...state,
      defaults: state.defaults,
      current : state.defaults,
    };
  }
  case Actions.SET_USER_SETTINGS:
  {
    const updated = {
      ...state,
      userSettings : {
        ...state.userSettings,
        ...action.payload
      }
    };
    localStorage.setItem(LS_KEY, btoa(JSON.stringify(updated.userSettings)));
    return updated;
  }
  default:
  {
    return state;
  }
  }
}

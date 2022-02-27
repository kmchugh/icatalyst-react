import React, {useContext} from 'react';
import {useDeepCompareEffect} from '../../hooks/fuse';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {matchRoutes} from 'react-router-config';
import {PropTypes} from 'prop-types';
import * as Actions from '../../store/actions/settings.actions';
import { SingularityContext } from '../../components/Singularity';
import _ from '../../@lodash';
import {useSettingsContext} from '../../components/Settings/SettingsProvider';
import {registerSettings} from '../../components/Settings';

import ThemeSelector from '../components/ThemeSelector';
export const SINGULARITY_THEME_SETTINGS_ID = 'singularity_theme';

/**
 * Register the User Settings with the settings provider
 * so they can be managed by the user
 * @type {[type]}
 */
registerSettings([
  {
    name : `${SINGULARITY_THEME_SETTINGS_ID}`,
    sectionName : 'theme',
    label : 'Theme',
    global : true,
    fields : [{
      id : 'main',
      type : 'custom',
      Component : ThemeSelector
    }, {
      id : 'navbar',
      type : 'custom',
      Component : ThemeSelector
    }, {
      id : 'toolbar',
      type : 'custom',
      Component : ThemeSelector
    }, {
      id : 'footer',
      type : 'custom',
      Component : ThemeSelector
    }, {
      id : 'panel',
      type : 'custom',
      Component : ThemeSelector
    }]
  }
]);


import { AppContext } from '../../contexts';

function Layout(props) {
  const dispatch = useDispatch();

  const {current: currentSettings, defaults :defaultSettings} = useSelector(({icatalyst})=>icatalyst.settings);
  const {routes} = useContext(AppContext);
  const singularityContext = useContext(SingularityContext);

  const {isInRole} = singularityContext;
  const {location} = props;

  const themeSettings = useSettingsContext(SINGULARITY_THEME_SETTINGS_ID);
  const {
    values : reducerValues
  } = themeSettings;

  useDeepCompareEffect(() => {
    dispatch(Actions.updateThemes(reducerValues));
  }, [
    reducerValues
  ]);

  useDeepCompareEffect(() => {
    const matched = matchRoutes(routes, props.location.pathname)[0];

    // Make sure the user is authorised
    if (matched && matched.route.routeConfig) {
      const {auth} = matched.route.routeConfig;
      const resolvedAuth = (typeof auth === 'function') ?
        auth() : auth;

      if (!resolvedAuth || resolvedAuth.route || !isInRole(resolvedAuth.route)) {
        // TODO: Implement blocking routes if no auth
        // console.log(singularityContext);
        // console.log('not authorised', resolvedAuth.route,
        //   singularityContext.user.roles.map((r)=>{
        //     console.log(r);
        //     return r.name;
        //   })
        // );
      }
    }

    // If there is a route match with settings then we need to merge the settings
    if (matched && matched.route.settings) {
      dispatch(Actions.setSettings(_.merge({},
        defaultSettings,
        matched.route.settings
      )));
    } else {
      // Not a match so need to reset to default
      dispatch(Actions.resetSettings());
    }
  }, [routes, defaultSettings, currentSettings, location.pathname]);

  // If a layout isn't specified then use the default layout
  const Layout = (currentSettings.layout.component || defaultSettings.layout.component)();

  return (
    <Layout {...props}/>
  );
}

Layout.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default React.memo(withRouter(Layout));

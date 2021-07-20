import React, {useContext} from 'react';
import {useDeepCompareEffect} from '@icatalyst/hooks/fuse';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {matchRoutes} from 'react-router-config';
import {PropTypes} from 'prop-types';
import * as Actions from '@icatalyst/store/actions/settings.actions';
import { SingularityContext } from '@icatalyst/components/Singularity';
import _ from 'lodash';

import { AppContext } from '../../contexts';

function Layout(props) {
  const dispatch = useDispatch();

  const {current: currentSettings, defaults :defaultSettings} = useSelector(({icatalyst})=>icatalyst.settings);
  const {routes} = useContext(AppContext);
  const singularityContext = useContext(SingularityContext);

  const {isInRole} = singularityContext;
  const {location} = props;

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

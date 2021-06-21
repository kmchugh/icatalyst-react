import React, {useContext} from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext } from '../../contexts';
import { SingularityContext } from '@icatalyst/components/Singularity';
import {useLocation} from 'react-router-dom';

const Root = ()=>{
  const appContext = useContext(AppContext);
  const singularityContext = useContext(SingularityContext);
  const location = useLocation();

  const {routes} = appContext;
  const {isInRole} = singularityContext;

  // Make sure the user is navigated to the default route that they have
  // permission to access

  // Extract the list of routes that this user is authorised to access
  // We also filter to non parameterised routes
  const authRoutes = routes.filter((route)=>{
    // TODO: Add the ability to configure the default based on the user and user roles
    return route.path && route.path.indexOf(':') < 0 && (route.auth === undefined || isInRole(route.auth));
  });

  const defaultRoute = authRoutes.find(r=>r.routeConfig && r.routeConfig.defaultRoute) || authRoutes[0];

  return defaultRoute.path === '/' ?
    (<div></div>) :
    (<Redirect to={`${defaultRoute.path}${location.search}`}/>);
};


export default Root;

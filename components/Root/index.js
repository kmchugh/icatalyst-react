import React, {useContext} from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext } from '../../contexts';
import {useLocation} from 'react-router-dom';
import { SingularityContext } from '../Singularity';
import FuseLoading from '../fuse/FuseLoading';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(()=>{
  return {
    root : {
      width: '100%',
      height :'100%'
    },
  };

});

const Root = ()=>{
  const appContext = useContext(AppContext);
  const location = useLocation();
  const classes = useStyles();

  const {routes} = appContext;
  const {initialised} = useContext(SingularityContext);

  // Make sure the user is navigated to the default route that they have
  // permission to access

  // From the authorised routes, find the first accessible, starting with defaultRoutes
  const prioritisedRoutes = routes
    .sort((a,b)=>{
      return (a.routeConfig && a.routeConfig.defaultRoute) === true ? -1 : (
        (b.routeConfig && b.routeConfig.defaultRoute) === true ? 1 : 0
      );
    });

  const defaultRoute =
    prioritisedRoutes.find(r=>r.routeConfig && r.routeConfig.defaultRoute) || prioritisedRoutes[0];

  return (
    <div className={clsx(classes.root)}>
      {
        !initialised && <FuseLoading/>
      }
      {
        (initialised && defaultRoute.path !== '/') && (<Redirect to={{
          pathname : defaultRoute.path || '/',
          search : location.search,
          state : location.state ? location.state : {
            referrer : location.pathname
          }
        }}/>)
      }
    </div>
  );
};


export default Root;

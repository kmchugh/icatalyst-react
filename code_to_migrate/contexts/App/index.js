import React, {useState} from 'react';
import PropTypes from 'prop-types';

export const AppContext = React.createContext({});

const AppContextComponent = ({
  children,
  routes,
  applicationConfig,
  layouts,
  onUserAuthenticated, //(user, dispatch)=>{}
  onClientUpdated, //(client, dispatch)=>{}
  onUserChange //(singularityContext)=>{}
})=>{

  const getAuthRoutes = (routes, singularityContext)=>{
    return routes.filter((route)=>{
      const routeAuth =
        route && route.routeConfig && route.routeConfig.auth ? (
          typeof route.routeConfig.auth === 'function' ? route.routeConfig.auth().route : route.routeConfig.auth
        ) : route.auth;

      // TODO: Add the ability to configure the default based on the user and user roles
      return !route.path ||
        (routeAuth === undefined || (singularityContext && singularityContext.isInRole(routeAuth)));
    });
  };

  // Assumption is that the last route is the fallback route
  const [authRoutes, setAuthRoutes] = useState([
    routes[routes.length-1]
  ]);

  return (
    <AppContext.Provider value={{
      routes : authRoutes,
      applicationConfig : applicationConfig,
      layouts : layouts,
      onUserChange : onUserChange || ((singularityContext)=>{
        setAuthRoutes(getAuthRoutes(routes, singularityContext));
      }),
      onUserAuthenticated,
      onClientUpdated,
      reverse : (route)=>{
        const lookup = routes.filter(r=>
          r.routeConfig &&
          (r.routeConfig.name === route || r.routeConfig.namePlural === route)
        );
        if (lookup.length === 0) {
          console.error(`No routes found for ${route}`);
        } else if (lookup.length > 1) {
          console.warn(`Multiple routes found for ${route}`);
        }
        return lookup.length > 0 ? lookup[0].path : null;
      }
    }}>
      {children}
    </AppContext.Provider>
  );
};

AppContextComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  // TODO: Move this shape into a separate file for reuse
  routes : PropTypes.arrayOf(PropTypes.shape({
    path : PropTypes.string,
    settings: PropTypes.object,
    // This can be a config or a model definition
    routeConfig : PropTypes.object,
  })).isRequired,
  applicationConfig : PropTypes.object.isRequired,
  layouts : PropTypes.object.isRequired,
  onUserAuthenticated : PropTypes.func,
  onClientUpdated : PropTypes.func,
  onUserChange : PropTypes.func,
};

export default AppContextComponent;

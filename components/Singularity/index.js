import React, {useState, createContext, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import FuseSplashScreen from '../fuse/FuseSplashScreen';
import SingularityService from '../../services/Singularity';
import {withRouter} from 'react-router';
import {matchRoutes} from 'react-router-config';
import {setClient, setSingularityClient} from './store/actions/client.actions';
import { AppContext } from '../../contexts';
import {useDispatch} from 'react-redux';
export const SingularityContext = createContext();
import {operations as CDOperations} from './store/actions/clientdata.actions';
import {LocalizationContext} from '../../localization/LocalizationProvider';

// TODO: Make this configurable per singularity install
const SETTINGS_KEY = 'aefa26fc-6a47-4998-8d93-c4a18d8b9119';

/**
 * Checks if the auth array contains the role,
 * or any of the roles in the specified role.
 *
 * If auth is not defined then it is assumed that auth
 * is not required so access is allowed.
 *
 * @method hasPermission
 * @param  {Array}             auth list of roles allowed
 * @param  {Array|String}      appRoles role or list of roles of the context
 * @return {Boolean}           true if allowed, false otherwise
 */
export const hasPermission = (auth, appRoles) => {
  // If the auth role has not been specified
  // then permission is granted
  if (auth === null || auth === undefined || !auth.length) {
    return true;
  }

  // Normalise roles and auth
  appRoles = (Array.isArray(appRoles) ? appRoles : [appRoles]);
  auth = (Array.isArray(auth) ? auth : [auth]);

  // If any of the user roles match the expected roles then return true;
  return auth.some((r)=>appRoles.indexOf(r) >= 0);
};


/**
 * Gets the query string portion of the passed query
 * @method getQueryStringParams
 * @param  {String}             query the query string
 * @return {Object}                   map of parameters
 */
const getParams = query => {
  return query ?
    (/^[?#]/.test(query) ? query.slice(1) : query)
      .split('&')
      .reduce((params, param) => {
        let [key, value] = param.split('=');
        params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
        return params;
      }, {}
      ) :
    {};
};

function Singularity({
  location, t, history, config,
  children
}) {
  const dispatch = useDispatch();

  const {
    mapRoles = (roles)=>{
      return roles.map(r=>r.code);
    },
    filterDisplayRoles = (role)=>{
      return role.displayable;
    },
    requireAuth = true,
  } = config;

  // TODO: Make this configurable
  const errorRoute = '/errors/';

  const [token, setUpdatedToken] = useState(null);

  // The token needs to be udpated with the correct date format
  const setToken = (token)=>{
    setUpdatedToken({
      ...token,
      exp : token.exp < 9999999999 ? token.exp * 1000 : token.exp,
      iat : token.iat < 9999999999 ? token.iat * 1000 : token.iat,
    });
  };


  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState({
    roles : [],
    // Map the singularity roles of the user to app roles
    appRoles: mapRoles(null)
  });
  const [redirect, setRedirect] = useState(null);
  const [session, setSession] = useState(null);
  const [singularity] = useState(new SingularityService(config));
  const [clientToken, setClientToken] = useState(null);
  const [singularityDetails, setSingularityDetails] = useState(null);
  const [clientDetails, setClientDetails] = useState(null);
  const [initialised, setInitialised] = useState(false);
  const [clientData, setClientData] = useState(false);

  // Force the authentication if the user has previously authenticated
  const hasAuthenticated = singularity.hasAuthenticated();
  const shouldForceAuth = hasAuthenticated || requireAuth;

  const appContext = useContext(AppContext);
  const vocabContext = useContext(LocalizationContext);

  if (!t) {
    t = vocabContext?.t || (text=>text);
  }

  const [message, setMessage] = useState(`${t('Validating')}...`);


  const {
    routes,
    onUserAuthenticated = ()=>{},
    onClientUpdated = ()=>{},
    onUserChange = ()=>{}
  } = appContext;

  const handleToken = (token)=>{
    // We have a token, redirect the user if required

    // Validate the token
    setMessage(`${t('Validating Token')}...`);

    try {
      singularity.validateToken(token);

      // The token is valid
      setMessage(`${t('Validating Token')}...`);

      if (user && session) {
        // If we are supposed to redirect, then redirect
        let redirectLocation = null;
        if (redirect) {
          const search = redirect.split('?', 2);
          const hash = redirect.split('#', 2);
          redirectLocation = {
            path: redirect.replace(window.location.origin, ''),
            search: search.length > 1 ? search[1] : undefined,
            hash: hash.length > 1 ? hash[1] : undefined,
          };
        } else if (session) {
          redirectLocation = {
            path : location.pathname,
            search : location.search,
            state : location.state,
            hash : location.hash
          };
        }

        // If the client has not been loaded then load it
        if (!clientDetails) {
          setClientDetails({});
          singularity.getClientDetails(accessToken).then((client)=>{
            dispatch(setClient(client));
            setClientDetails(client);
            onClientUpdated(client, dispatch);
          }).catch((error)=>{
            console.error(error);
          });
        }

        if (!singularityDetails) {
          setSingularityDetails({});
          singularity.getSingularityDetails(accessToken, token.client_id).then((client)=>{
            dispatch(setSingularityClient(client));
          }).catch((error)=>{
            console.error(error);
          });
        }

        const matched = matchRoutes(routes, location.path)[0];

        if (redirectLocation && !hasPermission(matched.route.auth, user.appRoles)) {
          history.push(errorRoute, {
            title : t('Unauthorized'),
            message : t('Your account does not have access to this location'),
          });
        } else {
          if (history.location.pathname !== redirectLocation.path ||
            history.location.search !== redirectLocation.search ||
            history.location.hash !== redirectLocation.hash ||
            history.location.state !== redirectLocation.state
          ) {
            history.push(redirectLocation);
          }
        }
        // Mark that we have had a valid token so this user has been authenticated
        if (!hasAuthenticated) {
          singularity.markAuthenticated();
        }
        setRedirect(null);
      }
    } catch (e) {
      console.error(e);
      history.push(errorRoute, {
        title : t('Unauthorized'),
        message : t(e.message),
      });
    }
  };

  // Check that we have access on each path change
  useEffect(()=>{
    // If we are on the error route, then we don't need a token
    if (location.pathname === errorRoute) {
      return;
    }

    const basicToken = singularity.getBasicToken();
    if (clientToken !== basicToken) {
      setClientToken(basicToken);
    }

    const searchParams = getParams(location.search);
    const hashParams = getParams(location.hash);

    // If we do not require auth then wait for the app to request auth
    if (!shouldForceAuth && !token && !searchParams.state) {
      return;
    }

    if (!token) {
      // We do not currently have a token
      // So attempt to retrieve one or refresh from the refresh token

      // If there is a code and state parameter,
      // and the state matches our generated state then
      // this is the redirect from singularity so use the
      // code to request the actual access token
      if (searchParams.state) {
        setMessage(`${t('Requesting Access')}...`);

        const promise = singularity.requestAccessToken(searchParams);
        if (promise) {
          promise.then((response)=>{
            setMessage(`${t('Parsing Token')}...`);
            const { access_token, token } = response;

            try {
              singularity.validateToken(token);
            } catch (e) {
              throw {
                error : 'Invalid Token',
                error_description : e.getMessage()
              };
            }

            setAccessToken(access_token);
            setMessage(`${t('Retrieving Session')}...`);
            setToken(token);
          })
            .catch(({
              error,
              error_description,
              // error_uri
            })=>{
              history.push(errorRoute, {
                title : t(error || 'Unknown Error'),
                message : t(error_description),
              });
            });
        } else {
          // There was no stored state, so something went wrong.
          // Try again
          setMessage(`${t('Requesting Authorisation')}...`);
          // No token, no code, and no state, so redirect for login
          singularity.requestAuthorizationCode(undefined);
        }
      } else if (hashParams.token) {
        const token = singularity.hydrateToken(hashParams.token);
        try {
          singularity.validateToken(token);
        } catch (e) {
          throw {
            error : 'Invalid Token',
            error_description : e.getMessage()
          };
        }

        setAccessToken(hashParams.token);
        setMessage(`${t('Retrieving Session')}...`);
        setToken(token);
      } else {
        setMessage(`${t('Requesting Authorisation')}...`);
        // No token, no code, and no state, so redirect for login
        singularity.requestAuthorizationCode();

      }
    } else {
      handleToken(token);
    }
  }, [session, user, location.pathname]);

  useEffect(()=>{
    if (accessToken && !clientData) {
      dispatch(CDOperations['RETRIEVE_ENTITY'](SETTINGS_KEY, (err, res)=>{
        setClientData(res);
      }, {
        accessToken: accessToken
      }));
    }
  }, [accessToken]);

  const updateClientData = ((id, data)=>{
    const payload = {
      ...clientData,
      [id] : data,
      guid : SETTINGS_KEY,
    };
    setClientData({
      ...clientData,
      [id] : data
    });
    // Fire and forget as we have already locally updated
    dispatch(CDOperations['UPDATE_ENTITY'](payload, null, {
      accessToken: accessToken
    }));
  });

  useEffect(()=>{
    // If we do not require auth then wait for the app to request auth
    if (!shouldForceAuth && !token) {
      setInitialised(true);
      return;
    }

    if (token) {
      singularity.retrieveSession(accessToken)
        .then((results)=>{
          const { guid, objectversion,
            data, user
          } = results;

          // Set up so that we will silently refresh
          singularity.silentRefresh(token, (err, response)=>{
            if (err) {
              console.error(err);
            }
            if (response) {
              const {access_token, token} = response;
              setAccessToken(access_token);
              setToken(token);
            }
          });

          setMessage(`${t('Loading User information')}...`);
          setRedirect(token.redirect_uri);
          setSession({
            guid : guid,
            objectversion : objectversion,
            data : data
          });

          setUser({
            ...user,
            roles : user.roles.filter(filterDisplayRoles),
            // Map the singularity roles of the user to app roles
            appRoles: mapRoles(user.roles)
          });
          setInitialised(true);
          onUserAuthenticated(user, dispatch);

        }).catch((data)=>{
          throw {
            error : data.responsecode,
            error_description : (data && data.errors) ? data.errors.join('\n') : data.message
          };
        });
    }
  }, [token]);

  const singularityContext = {
    client: clientDetails,
    clientData,
    setClientData : updateClientData,
    user,
    session,
    accessToken,
    clientToken,
    token,
    initialised : initialised,
    isInRole : (role)=>{
      // If the role is undefined then it is assumed that there is no access
      if (role === undefined) {
        return false;
      }
      role = !Array.isArray(role) && role ? [role] : role;
      return hasPermission(role, user && user.appRoles || []);
    },
    isResourceOwner : (type, id)=>{
      return singularity.isResourceOwner(accessToken, type, id);
    },
    getResourcePermissions : (resources)=>{
      // Expects a resource in the format of
      // {
      //  resourceType : 'type',
      //  resourceID : 'local resource id'
      // }
      // can be a list or individual resource
      if (resources.length === 0) {
        return new Promise((resolve)=>resolve({}));
      }
      return singularity.getResourcePermissions(
        accessToken, resources
      ).catch((error)=>{
        console.error(error);
        return {};
      });
    },
    logout : ()=>{
      // Clear the refresh token and user related data, then
      // hand over to singularity to complete the logout
      singularity.cancelSilentRefresh();
      setSession(null);
      setUser(null);
      setAccessToken(null);
      setInitialised(false);
      singularity.logout(accessToken);
    },
    login : (redirectURI)=>{
      singularity.cancelSilentRefresh();
      setSession(null);
      setAccessToken(null);
      singularity.requestAuthorizationCode(undefined, redirectURI);
    },
    register : (redirectURI)=>{
      singularity.cancelSilentRefresh();
      setSession(null);
      setAccessToken(null);
      singularity.requestAuthorizationCode('registration', redirectURI);
    },
    changePassword : (callback)=>{
      singularity.changePassword(accessToken, callback);
    },
    deleteUser : ()=>{
      return singularity.deleteUser(accessToken)
        .then(()=>{
          setSession(null);
          setAccessToken(null);
        })
        .catch((error)=>{
          console.error(error);
          return {};
        });
    },
    updateProfile : (profile, callback)=>{
      singularity.updateProfile(profile, accessToken)
        .then((response)=>{
          setUser((user)=>({
            ...user,
            profileimageuri : response.profileimageuri,
            displayname : response.displayname
          }));
          callback && callback(null, response);
        })
        .catch((err)=>{
          callback && callback(err, null);
        });
    }
  };

  useEffect(()=>{
    onUserChange && onUserChange(singularityContext);
  }, [user]);

  // If we are waiting for authorisation then show the loading screen
  // otherwise show the children
  return (location.pathname !== errorRoute && (shouldForceAuth && (!token || !user || !session))) ?
    (<FuseSplashScreen message={message}/>) :
    (
      <SingularityContext.Provider value={singularityContext}>
        {children}
      </SingularityContext.Provider>
    );
}

Singularity.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  config : PropTypes.shape({
    client : PropTypes.object.isRequired,
    // Mapping function to translate Singularity roles to application roles
    // (roles)=>app_roles
    mapRoles : PropTypes.func,
    filterDisplayRoles : PropTypes.func,
    server : PropTypes.object,
    settings : PropTypes.object,
    urls : PropTypes.object,
    requireAuth : PropTypes.bool,
    onUserChange : PropTypes.func
  }),
  history: PropTypes.object,
  location: PropTypes.object,
  t : PropTypes.func,
};


export default withRouter(React.memo(Singularity));

import React, {useState, createContext, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import FuseSplashScreen from '../fuse/FuseSplashScreen';
import SingularityService from '../../services/Singularity';
import {withRouter} from 'react-router';
import {matchRoutes} from 'react-router-config';
import {setClient, setSingularityClient} from './store/actions/client.actions';
import { AppContext } from '../../contexts';
import {useDispatch} from 'react-redux';


// import {registerSettings} from '../Settings';
//
// const SINGULARITY_SETTINGS_ID = 'singularity_user';
//
// /**
//  * Register the Table Settings with the settings provider
//  * so they can be managed by the user
//  * @type {[type]}
//  */
// registerSettings([{
//   name : `${SINGULARITY_SETTINGS_ID}_avatar`,
//   sectionName : 'Profile',
//   label : 'Profile Image',
//   global : true,
//   fields : [{
//     id : 'profileImage',
//     type : 'avatar',
//   }]
// }, {
//   name : `${SINGULARITY_SETTINGS_ID}_displayname`,
//   sectionName : 'Profile',
//   label : 'Display Name',
//   global : true,
//   fields : [{
//     id : 'displayName',
//     type : 'string',
//   }]
// }, {
//   name : `${SINGULARITY_SETTINGS_ID}_password`,
//   sectionName : 'Profile',
//   label : 'Change Password',
//   global : true,
//   fields : [{
//     id : 'changePassword',
//     type : 'command',
//   }]
// }]);

export const SingularityContext = createContext();

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

function Singularity(props) {

  const dispatch = useDispatch();
  const {location, t = (t)=>t, history, config} = props;
  const {
    mapRoles = (roles)=>{
      return roles.map(r=>r.code);
    },
    filterDisplayRoles = (role)=>{
      return role.displayable;
    }
  } = config;

  // TODO: Make this configurable
  const errorRoute = '/errors/';

  const [token, setToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const [session, setSession] = useState(null);
  const [singularity] = useState(new SingularityService(config));
  const [singularityDetails, setSingularityDetails] = useState(null);
  const [clientDetails, setClientDetails] = useState(null);

  const [message, setMessage] = useState('Validating...');

  const {
    routes,
    onUserAuthenticated = ()=>{},
    onClientUpdated = ()=>{}
  } = useContext(AppContext);

  // Check that we have access on each path change
  useEffect(()=>{
    // If we are on the error route, then we don't need a token
    if (location.pathname === errorRoute) {
      return;
    }
    if (!token) {
      // We do not currently have a token
      // So attempt to retrieve one or refresh from the refresh token

      const searchParams = getParams(location.search);
      // If there is a code and state parameter,
      // and the state matches our generated state then
      // this is the redirect from singularity so use the
      // code to request the actual access token
      if (searchParams.state) {
        setMessage(t('Requesting Access...'));
        singularity.requestAccessToken(searchParams)
          .then((response)=>{
            setMessage(t('Parsing Token...'));
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
            setMessage(t('Retrieving Session...'));
            setToken(token);
          })
          .catch(({
            error,
            error_description,
            // error_uri
          })=>{
            props.history.push(errorRoute, {
              title : t(error || 'Unknown Error'),
              message : t(error_description),
            });
          });
      } else {
        setMessage(t('Requesting Authorisation...'));
        // No token, no code, and no state, so redirect for login
        singularity.requestAuthorizationCode();

        // TODO: Before redirect, attempt to refresh
      }
    } else {
      // We have a token, redirect the user if required

      // Validate the token
      setMessage(t('Validating Token...'));
      try {
        singularity.validateToken(token);

        // The token is valid
        setMessage(t('Validated Token...'));

        if (user && session) {

          // If we are supposed to redirect, then redirect
          let location = null;
          if (redirect) {
            const search = redirect.split('?', 2);
            const hash = redirect.split('#', 2);
            location = {
              path: redirect.replace(window.location.protocol + '//' + window.location.host, ''),
              search: search.length > 1 ? search[1] : undefined,
              hash: hash.length > 1 ? hash[1] : undefined,
            };
          } else if (session) {
            location = {
              path : props.location.pathname,
              search : props.location.search,
              state : props.location.state,
              hash : props.location.hash
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
            console.log('ISSUER UPDATE: ' + token.iss);
            setSingularityDetails({});
            singularity.getSingularityDetails(accessToken, token.iss).then((client)=>{
              dispatch(setSingularityClient(client));
            }).catch((error)=>{
              console.error(error);
            });
          }

          const matched = matchRoutes(routes, location.path)[0];

          if (location && !hasPermission(matched.route.auth, user.appRoles)) {
            history.push(errorRoute, {
              title : t('Unauthorized'),
              message : t('Your account does not have access to this location'),
            });
          } else {
            if (props.history.location.pathname !== location.path ||
              props.history.location.search !== location.search ||
              props.history.location.hash !== location.hash ||
              props.history.location.state !== location.state
            ) {
              props.history.push(location);
            }
          }

          setRedirect(null);
        }
      } catch (e) {
        history.push(errorRoute, {
          title : t('Unauthorized'),
          message : t(e.message),
        });
      }
    }
  }, [session, user, location.pathname]);

  useEffect(()=>{
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

          setMessage(t('Loading User information...'));
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

          onUserAuthenticated(user, dispatch);

        }).catch((data)=>{
          throw {
            error : data.responsecode,
            error_description : (data && data.errors) ? data.errors.join('\n') : data.message
          };
        });
    }
  }, [token]);

  // If we are waiting for authorisation then show the loading screen
  // otherwise show the children
  return (location.pathname !== errorRoute && (!token || !user || !session)) ?
    (<FuseSplashScreen message={message}/>) :
    (
      <SingularityContext.Provider value={{
        client: clientDetails,
        user,
        session,
        accessToken,
        token,
        isInRole : (role)=>{
          role = !Array.isArray(role) && role ? [role] : role;
          return hasPermission(role, user && user.appRoles || []);
        },
        isResourceOwner : (type, id)=>{
          return singularity.isResourceOwner(accessToken, type, id);
        },
        logout : ()=>{
          // Clear the refresh token and user related data, then
          // hand over to singularity to complete the logout
          singularity.cancelSilentRefresh();
          setSession(null);
          setUser(null);
          singularity.logout(accessToken);
        }
      }}>
        {props.children}
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
  }),
  history: PropTypes.object,
  location: PropTypes.object,
  t : PropTypes.func,
};


export default withRouter(React.memo(Singularity));

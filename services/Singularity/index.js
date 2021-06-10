/*global gtag*/
import jwt_decode from 'jwt-decode';
import _ from 'lodash';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import {generateUUID} from '../../utilities/generateUUID';
import URIService from '../URIService';


/**
 * Service class for communicating with the Singularity Server.
 *
 * this utilises the Authorization Code Grant Flow for obtaining tokents
 *
 * // TODO: Implement PKCE extension
 */
class SingularityService {
  #client = {
    root : 'https://app.singularity.icatalyst.com'
  };
  #server = {
    root : 'https://api.singularity.icatalyst.com'
  };
  #client_urls = {
    logout : 'logoutTransition'
  };
  #urls = {
    authorize : 'authorize',

    client : 'api/client',

    edge_type : 'api/edgetype',

    invites : 'api/invite',
    profile : 'api/profile',
    role_membership : 'api/role/:roleid/members',
    role_ownership : 'api/role/:roleid/owners',
    roles : 'api/group',
    session : 'api/session',

    token : 'token',

    users : 'api/user',
    version : 'version',

    resource_permissions : 'api/resourcePermissions',
    role_permissions : 'api/rolePermissions',

    // client_refresh : 'token/refresh',
    // client_logout : 'logout',
    //
    // resource : 'api/resource',
    resource_membership : 'api/resourceMembership'
  };
  #settings = {
    localstore_key : 'singularity_key'
  }

  constructor({
    client = {},
    urls = {},
    client_urls = {},
    server = {},
    settings = {}
  }){
    this.#client = _.merge(this.#client, client);
    this.#urls = _.merge(this.#urls, urls);
    this.#client_urls = _.merge(this.#client_urls, client_urls);
    this.#server = _.merge(this.#server, server);

    this.#settings = _.merge(this.#settings, settings);
    this.uris=Object.keys(this.#urls).reduce((acc, key)=>{
      const uri = `${this.#server.root}/${this.#urls[key]}`;
      acc[key] = uri;
      URIService.registerURI('singularity', key, uri);
      return acc;
    }, {});

    this.client_uris=Object.keys(this.#client_urls).reduce((acc, key)=>{
      acc[key] = `${this.#client.root}/${this.#client_urls[key]}`;
      return acc;
    }, {});

    this.default_scope = this.#settings.default_scope ?
      this.#settings.default_scope.join(' ') :
      'auth profile';
  }

  /**
   * Redirects the user to the specified URL.
   * Generates an appropriate query string based on the params
   * @method redirectTo
   * @param  {[string]}   url the url to redirect to
   * @param  {[object]}   params if not null a kvp of parameters to append to the url
   * @param  {object}     hashparams if not null a kvp of the parameters will be added as a hash on the url
   *
   */
  redirectTo(url, params, hashparams) {
    window.location = url + (
      params ?
        (
          url.indexOf('?') ? '?' : '&') +
            Object.keys(params)
              .map((key)=>`${key}=${encodeURIComponent(params[key])}`)
              .join('&') :
        '') + (
      hashparams ?
        (
          url.indexOf('#') ? '#' : '&') +
            Object.keys(hashparams)
              .map((key)=>`${key}=${encodeURIComponent(hashparams[key])}`)
              .join('&') :
        '');
  }

  /**
   * Gets the key to use for storing information in localstorage
   * @method getLocalStorageKey
   * @param  {[string]}           key the key that we are requesting
   * @return {[string]}               the key that should be used in localstorage
   */
  getLocalStorageKey(key) {
    if (!this.__keyset) {
      this.__keyset = {};
    }
    if (!this.__keyset[key]) {
      this.__keyset[key] = CryptoJS.MD5(this.#settings.localstore_key + '|' + key).toString();
    }
    return this.__keyset[key];
  }

  /**
   * Hydrates the JWT token from the string provided.
   * Returns the token extracted from the string
   * @method hydrateToken
   * @param  {String}     tokenString the token string to hydrate
   * @return {Object}                 the token
   */
  hydrateToken(tokenString) {
    try {
      return tokenString && jwt_decode(tokenString);
    } catch (e) {
      throw {
        message : 'Invalid token provided'
      };
    }
  }

  /**
   * Request the Authorization code by
   * redirecting the user to the singularity login uri
   * @method requestAuthorizationCode
   */
  requestAuthorizationCode(scope = this.default_scope, redirect_uri = window.location.href) {
    // Store the state so we can validate
    const state = this.localStore('state', generateUUID());
    this.localStore('redirect_uri', redirect_uri);
    this.redirectTo(this.uris.authorize, {
      response_type : 'code',
      client_id : this.#client.id,
      scope : scope,
      state : state,
      redirect_uri : window.location.href
    });
  }

  /**
   * Requests an access token from the singularity server
   * @method requestAccessToken
   * @param  {[object]}           queryParams the query parameters from the authorization request
   * @return {[Promise]}                       a promise resolving to the token
   */
  requestAccessToken(queryParams) {
    const {
      code,
      state,
      error,
      error_description,
      error_uri
    } = queryParams;

    const stored_state = this.localStore('state');
    const redirect_uri = this.localStore('redirect_uri');

    // Clear out the localstore so that the values can not be reused
    this.localStore('state', null);
    this.localStore('redirect_uri', null);

    // If the state is invalid then reject the access code
    if (state !== stored_state) {
      return new Promise((resolve, reject)=>{
        reject({
          error : 'Invalid State',
          error_description : `The response from the server (${state}) does not match the expected state (${state}])`,
          error_uri : null
        });
      });
    }

    // If there was an error, then reject because of the error
    if (error) {
      return new Promise((resolve, reject)=>{
        reject({
          error,
          error_description,
          error_uri,
        });
      });
    }

    let parameters = {
      grant_type : 'authorization_code',
      code : code,
      // We don't pass client_id as we are authenticating with a Basic token
      // client_id : this.#client.id,
    };
    if (redirect_uri) {
      parameters.redirect_uri = redirect_uri;
    }
    // Otherwise make the request for the access token
    return axios.post(this.uris.token,
      parameters,
      { headers : {
        'Content-Type': 'application/json',
        'Authorization' : 'Basic ' +
          btoa(
            // Key
            CryptoJS.SHA256(this.#client.id + '|' + this.#client.key).toString() +
            ':' +
            // Secret
            this.#client.secret)
      }})
      .then((response)=>{
        return {
          ...response.data,
          token : this.hydrateToken(response.data.access_token)
        };
      })
      .then((accessToken)=>{
        const {token} = accessToken;
        if (typeof gtag !== 'undefined') {
          gtag('set', {
            user_id: token.sub,
            client_id: token.client_id
          });
        }
        return accessToken;
      })
      .catch((err)=>{
        throw err.response.data;
      });
  }

  /**
   * Stores or retrieves a value from localstorage.
   * If value is undefined then this will retrieve a value for the
   * key specified, otherwise this will set the value for the key,
   * @method localStore
   * @param  {[type]}   key   the key to set or get the value for
   * @param  {[type]}   value if defined then the value to set
   * @return {[type]}         the value set
   */
  localStore(key, value) {
    key = this.getLocalStorageKey(key);
    if (value !== undefined) {
      // Set the local storage
      localStorage.setItem(key, JSON.stringify(value));
    }
    return JSON.parse(localStorage.getItem(key));
  }

  /**
   * Checks if the token provided is valid.
   * @method validateToken
   * @param  {Object}      token The token to check
   * @return {boolean}           true if valid, false otherwise
   */
  validateToken(token) {
    if (token) {
      // Check the token is valid
      // Allow fuzziness in the issued time
      const issuedAt = new Date(token.iat - (1000*60*60*24));
      const sub = token.sub;
      const now = new Date();

      if (token.client_id !== this.#client.id) {
        throw new Error('Invalid client');
      }

      // TODO: Token expired is not valid

      // TODO : token.iss should be singularity
      // if (token.iss !== singularity id) {
      //   throw new Error('Invalid issuer');
      // }
      // TODO: Validate signature with public key

      if (now >= issuedAt && sub) {
        // Token is okay so return
        return;
      } else {
        throw new Error('Time synchronisation error');
      }
    }
    throw new Error('Invalid Token');
  }

  /**
   * Checks if the token is expired
   * @method isExpired
   * @param  {Object}  token the token to check
   * @return {Boolean}       true if expired, false otherwise
   */
  isExpired(token) {
    const now = new Date();
    const expires = new Date(token.exp);
    return expires <= now;
  }

  /**
   * Retrieve the user session
   * @method getUserSession
   * @param  {[string]}       accessToken the access token issued
   * @return {[Promise]}                  a promise resolving to the user session
   */
  retrieveSession(accessToken) {
    return axios.get(this.uris.session, {
      headers : {
        'Authorization' : `Bearer ${accessToken}`
      }
    }).then((response)=>{
      return response.data;
    }).catch((error)=>{
      throw error.response.data;
    });
  }

  /**
   * Retrieve the user session
   * @method getUserSession
   * @param  {[string]}       accessToken the access token issued
   * @return {[Promise]}                  a promise resolving to the user session
   */
  retrieveProfile(accessToken) {
    return axios.get(this.uris.profile, {
      headers : {
        'Authorization' : `Bearer ${accessToken}`
      }
    }).then((response)=>{
      return response.data;
    }).catch((error)=>{
      throw error.response.data;
    });
  }

  /**
   * Refreshes the token using the refresh token provided
   */
  refresh(refreshToken) {
    let parameters = {
      grant_type : 'refresh_token',
      refresh_token : refreshToken
    };
    // Otherwise make the request for the access token
    return axios.post(this.uris.token,
      parameters,
      { headers : {
        'Content-Type': 'application/json',
        'Authorization' : 'Basic ' +
          btoa(
            // Key
            CryptoJS.SHA256(this.#client.id + '|' + this.#client.key).toString() +
            ':' +
            // Secret
            this.#client.secret)
      }})
      .then((response)=>{
        return {
          ...response.data,
          token : this.hydrateToken(response.data.access_token)
        };
      })
      .catch((err)=>{
        throw err.response.data;
      });
  }

  /**
   * Sets up a timeout that will check to see if the token needs to be refreshed
   */
  silentRefresh(token, callback) {

    // Calculate the halflife so we can trigger a refresh on the halflife
    const refresh = token.iat + (this.isExpired(token) ? 0 : (token.exp - new Date().getTime()) / 2);

    if (this.__interval) {
      clearInterval(this.__interval);
    }

    this.__interval = window.setInterval(()=>{
      if (new Date().getTime() >= refresh) {
        clearInterval(this.__interval);
        this.refresh(token.refresh_token)
          .then((response)=>{
            // Notify successful refresh
            callback && callback(null, response);
          })
          .catch((err)=>{
            // Notify successful refresh
            callback && callback(err, null);
          });
      }
    }, 1000);
  }

  /**
   * Cancels the silent refresh interval
   */
  cancelSilentRefresh() {
    if (this.__interval) {
      clearInterval(this.__interval);
    }
  }

  /**
   * Redirects the user to singularity logout which clears any singularity tokens
   */
  logout(accessToken) {
    this.redirectTo(this.client_uris.logout, null, {
      access_token : accessToken
    });
  }

  /**
   * Gets the list of permissions that the current user has for the
   * resource specified
   * @param  {String} accessToken  The user access token
   * @param  {String} resourceType The type of resource
   * @param  {String} resourceID   The resource identifier
   * @return {Promise<[Edge]>}              promise ([edges])
   */
  getResourcePermissions(accessToken, resourceType, resourceID) {
    if (!resourceID) {
      return Promise.resolve([]);
    }
    return axios.get(this.uris.resource_permissions, {
      headers : {
        'Authorization' : `Bearer ${accessToken}`
      },
      params : {
        type : resourceType,
        resourceid : resourceID
      }
    }).then((response)=>{
      return response.data;
    }).catch((error)=>{
      throw error.response.data;
    });
  }

  /**
   * Checks if the user is an owner of the resource specified
   * @param  {String} accessToken  The user access token
   * @param  {String} resourceType The type of resource
   * @param  {String} resourceID   The resource identifier
   * @return {Promise<boolean>}              promise (boolean)
   */
  async isResourceOwner(accessToken, resourceType, resourceID) {
    return this.getResourcePermissions(accessToken, resourceType, resourceID)
      .then((permissions)=>{
        const ownerEdge = permissions.find((permission)=>{
          // TODO: This MUST be updated to use the edge type guid
          return (permission.edgetype && permission.edgetype.code === 'SINGULARITY_OWNER_EDGE');
        });
        return ownerEdge !== undefined;
      });
  }

  getSingularityDetails(accessToken, clientID) {
    return axios.get(`${this.uris.client}/${clientID}`, {
      headers : {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${accessToken}`
      }
    })
      .then((response)=>{
        return response.data;
      })
      .catch((error)=>{
        throw error.response.data;
      });
  }

  getClientDetails(accessToken) {
    return axios.get(`${this.uris.client}/${this.#client.id}`, {
      headers : {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${accessToken}`
      }
    })
      .then((response)=>{
        return response.data;
      })
      .catch((error)=>{
        throw error.response.data;
      });
  }
}

export default SingularityService;

import config from 'app/settings/config';
import * as Actions from './constants';
import _ from '../../../@lodash';

const LOCAL_STORE_KEY = 'ls_' + config.keys.localstorage;

/**
 * Helper function to read from the localstorage
 * @method readFromLocalStore
 * @return {Object}           The object read from localstorage
 */
function readFromLocalStore() {
  return JSON.parse(atob(localStorage.getItem(LOCAL_STORE_KEY) || btoa('{}')));
}

/**
 * Helper function to write to localStorage
 * @method writeToLocalStore
 * @param  {Object}          data The state to write
 */
function writeToLocalStore(data) {
  localStorage.setItem(LOCAL_STORE_KEY, btoa(JSON.stringify(data)));
}

/**
 * Reads the state from localstorage and converts it back to an object
 * to initialise the state from the app
 * @method rehydrateStore
 * @return {Object}       the state that had been stored
 */
export function rehydrateStore() {
  return readFromLocalStore();
}

/**
 * When receiving a STORE_TO_LOCALSTORE payload, merges
 * the payload with what is currently stored in the localstorage.
 * @method localstorage
 */
export const localstorage = () => next => action => {
  switch ( action.type ) {
  case Actions.LOCALSTORE_STORE:
  {
    // retrieve the stored localstorage.
    // If there is one merge the payload,
    // if none then store the payload;
    let storedState = _.merge(readFromLocalStore(), action.payload);
    writeToLocalStore(storedState);
    return next(action);
  }
  default:
  {
    return next(action);
  }}
};

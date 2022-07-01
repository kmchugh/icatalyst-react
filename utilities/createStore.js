import * as reduxModule from 'redux';
import {applyMiddleware, compose, createStore as createReduxStore} from 'redux';
import thunk from 'redux-thunk';
import _ from '../@lodash';
// import { setInitialNavigation } from '@icatalyst/store/actions';
import { setInitialNavigation } from '../store';
import icatalyst from '../store/reducers'
import { setLayouts, setThemes } from '../store/reducers/settings.reducer';

// import icatalyst from '@icatalyst/store/reducers';

import {rehydrateStore} from '../store/middlewares/localstorage';
import * as Actions from '../store/middlewares/localstorage/constants';

/*
Fix for Firefox redux dev tools extension
https://github.com/zalmoxisus/redux-devtools-instrument/pull/19#issuecomment-400637274
 */
reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = '@@redux/INIT';

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);

/**
 * Creates and combines the icatalyst reducers generated by the framework,
 * as well as the custom reducers for the app.
 * If a storeKey is provided then the custom reducers will be stored under that key,
 * otherwise they will be stored under the key 'main'
 * @param  {[type]} mainReducer       [description]
 * @param  {String} [storeKey='main'] [description]
 * @return {[type]}                   [description]
 */
function createReducer(mainReducer, storeKey = 'main'){
  return reduxModule.combineReducers({
    icatalyst,
    [storeKey] : mainReducer
  });
}

/**
 * Creates a new redux store to be used by the application
 * @param  {[type]} reducers          The reducer hierarchy for the store
 * @param  {[type]} navigation        The initial navigation for the store
 * @param  {[type]} layouts           The layouts available to the application
 * @param  {[type]} themes            The themes available to the application
 * @param  {String} [storeKey='main'] The key to access the custom store
 * @return {[type]}                   the created store
 */
export function createStore(reducers, navigation, layouts, themes, storeKey = 'main'){
  setInitialNavigation(navigation);
  setLayouts(layouts);
  setThemes(themes);

  // Create the store
  const store = createReduxStore(
    createReducer(reducers, storeKey),
    _.merge(rehydrateStore()),
    enhancer);
  // Restore from localstorage
  store.dispatch({type : Actions.LOCALSTORE_RESTORE});
  return store;
}

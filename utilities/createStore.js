import * as reduxModule from 'redux';
import {applyMiddleware, compose, createStore as createReduxStore} from 'redux';
import thunk from 'redux-thunk';
import _ from '@lodash';
import { setInitialNavigation } from '@icatalyst/store/actions';

import icatalyst from '@icatalyst/store/reducers';

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

function createReducer(mainReducer){
  return reduxModule.combineReducers({
    icatalyst,
    main : mainReducer
  });
}

export function createStore(reducers, navigation){
  setInitialNavigation(navigation);

  // Create the store
  const store = createReduxStore(
    createReducer(reducers),
    _.merge(rehydrateStore()),
    enhancer);
  // Restore from localstorage
  store.dispatch({type : Actions.LOCALSTORE_RESTORE});
  return store;
}

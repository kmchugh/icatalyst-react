import React from 'react';
import AppContext from '@icatalyst/contexts/App';
import { StylesProvider, jssPreset, createGenerateClassName } from '@material-ui/styles';
import { Provider } from 'react-redux';
import {SettingsProvider} from '@icatalyst/components/Settings';
import  Theme from '@icatalyst/components/Theme';
import  Singularity from '@icatalyst/components/Singularity';
import  ErrorBoundary from '@icatalyst/components/Errors/ErrorBoundary';
import { Router } from 'react-router-dom';
import {CssBaseline} from '@material-ui/core';
import { Layout } from '@icatalyst/layouts';
import history from '../@history';

import { create } from 'jss';

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins],
  insertionPoint: document.getElementById('jss-insertion-point'),
});

export default function createApp({
  applicationConfig,
  routes,
  layouts,
  store,
  mapAuthRoles,
  filterDisplayRoles
}){
  const {  singularity : singularityConfig, ...contextConfig } = applicationConfig;
  const appContext = {
    routes :[
      ...routes,
    ],
    applicationConfig : contextConfig,
    layouts : layouts,
    // onUserAuthenticated : (user, dispatch)=>{},
    // onClientUpdated : (client, dispatch)=>{}
  };

  const App = ()=>{
    return (
      <AppContext.Provider value={appContext}>
        <StylesProvider jss={jss} generateClassName={generateClassName}>
          <Provider store={store}>
            <SettingsProvider getReducerRoot={({icatalyst})=>{
              return icatalyst.settings;
            }}>
              <Theme>
                <ErrorBoundary>
                  <Router history={history}>
                    <Singularity config={{
                      ...singularityConfig,
                      mapRoles : mapAuthRoles,
                      // Allows customisation of the roles that are displayed to the user
                      filterDisplayRoles : filterDisplayRoles
                    }}>
                      <CssBaseline/>
                      <Layout/>
                    </Singularity>
                  </Router>
                </ErrorBoundary>
              </Theme>
            </SettingsProvider>
          </Provider>
        </StylesProvider>
      </AppContext.Provider>
    );
  };
  return App;
}

/*global gtag*/
import React from 'react';
// import ReactDOM from 'react-dom';
import AppContextComponent from '../contexts/App';
import { StylesProvider, jssPreset, createGenerateClassName } from '@mui/styles';
import { Provider } from 'react-redux';
import {SettingsProvider} from '../components/Settings';
import  Theme from '../components/Theme';
import  Singularity from '../components/Singularity';
import  ErrorBoundary from '../components/Errors/ErrorBoundary';
import { Router } from 'react-router-dom';
import {CssBaseline} from '@mui/material';
import { Layout } from '../layouts';
import history from '../@history';
import reportWebVitals from './reportWebVitals';
import { LocalizationProvider as MuiPickersUtilsProvider } from '@mui/x-date-pickers';
import MomentAdapter from '@date-io/moment';
import LocalizationProvider from '../localization/LocalizationProvider';
import { StyledEngineProvider } from '@mui/material/styles';
import { create } from 'jss';

reportWebVitals(({name, delta, value, id})=>{
  if (typeof gtag !== 'undefined') {
    gtag('event', name, {
      value : delta,
      metric_id : id,
      metric_value : value,
      metric_delta : delta,
      nonInteraction: true,
      transport: 'beacon'
    });
  }
});

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins],
  insertionPoint: 'custom-insertion-point',
});

export default function createApp({
  applicationConfig,
  routes,
  layouts,
  themes,
  store,
  mapAuthRoles,
  filterDisplayRoles,
  loadLanguages,
}){
  const {  singularity : singularityConfig, ga_tag_id, ...contextConfig } = applicationConfig;
  if (ga_tag_id){
    if (typeof gtag !== 'undefined') {
      gtag('set', {
        user_id: 'anonymous',
        client_id: singularityConfig.client.id
      });
    }
  }

  // if (process.env.NODE_ENV !== 'production') {
  //   const axe = require('@axe-core/react');
  //   axe(React, ReactDOM, 3000);
  // }

  const showLocalizationLog = applicationConfig.showLocalizationLog === undefined ?
    true :
    applicationConfig.showLocalizationLog;

  const App = ()=>{
    return (
      <MuiPickersUtilsProvider dateAdapter={MomentAdapter}>
        <AppContextComponent
          routes={routes}
          applicationConfig={contextConfig}
          layouts={layouts}
          themes={themes}
        >
          <StyledEngineProvider injectFirst>
            <StylesProvider jss={jss} generateClassName={generateClassName}>
              <Provider store={store}>
                <LocalizationProvider
                  debug={showLocalizationLog && process.env.NODE_ENV !== 'production'}
                  loadLanguages={loadLanguages}
                >
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
                            filterDisplayRoles : filterDisplayRoles,
                          }}>
                            <CssBaseline/>
                            <Layout/>
                          </Singularity>
                        </Router>
                      </ErrorBoundary>
                    </Theme>
                  </SettingsProvider>
                </LocalizationProvider>
              </Provider>
            </StylesProvider>
          </StyledEngineProvider>
        </AppContextComponent>
      </MuiPickersUtilsProvider>
    );
  };
  return App;
}

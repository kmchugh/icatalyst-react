/*global gtag*/
import React from 'react';
import ReactDOM from 'react-dom';
import AppContextComponent from '../contexts/App';
import { Provider } from 'react-redux';
import {SettingsProvider} from '../components/Settings';
import  Theme from '../components/Theme';
import  Singularity from '../components/Singularity';
import OrganisationProvider from '../contexts/Organisation/OrganisationContext';
import OrganisationMuiTheme from '../contexts/Organisation/OrganisationMuiTheme';
import  ErrorBoundary from '../components/Errors/ErrorBoundary';
import { Router } from 'react-router-dom';
import {CssBaseline} from '@mui/material';
import { Layout } from '../layouts';
import history from '../@history';
import reportWebVitals from './reportWebVitals';
import LocalizationProvider from '../localization/LocalizationProvider';
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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

  if (process.env.NODE_ENV !== 'production') {
    const axe = require('@axe-core/react');
    axe(React, ReactDOM, 3000);
  }

  const showLocalizationLog = applicationConfig.showLocalizationLog === undefined ?
    true :
    applicationConfig.showLocalizationLog;

  const App = ()=>{
    return (
      <MuiLocalizationProvider dateAdapter={AdapterDayjs}>
        <AppContextComponent
          routes={routes}
          applicationConfig={contextConfig}
          layouts={layouts}
          themes={themes}
        >
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
                        <OrganisationProvider>
                          <OrganisationMuiTheme>
                            <CssBaseline/>
                            <Layout/>
                          </OrganisationMuiTheme>
                        </OrganisationProvider>
                      </Singularity>
                    </Router>
                  </ErrorBoundary>
                </Theme>
              </SettingsProvider>
            </LocalizationProvider>
          </Provider>
        </AppContextComponent>
      </MuiLocalizationProvider>
    );
  };
  return App;
}

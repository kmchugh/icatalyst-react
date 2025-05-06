import React from 'react';
import {useSelector} from 'react-redux';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { StylesProvider, ThemeProvider as LegacyThemeProvider } from '@mui/styles';
import {PropTypes} from 'prop-types';

function ThemeModern(props) {

  const theme = useSelector(({icatalyst}) => icatalyst.settings.current.themes.mainTheme );
  console.log('themes', theme);
  return (
    <StylesProvider injectFirst>
      <StyledEngineProvider injectFirst>
        <LegacyThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            {props.children}
          </ThemeProvider>
        </LegacyThemeProvider>
      </StyledEngineProvider>
    </StylesProvider>
  );
}

ThemeModern.propTypes = {
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

export default React.memo(ThemeModern);
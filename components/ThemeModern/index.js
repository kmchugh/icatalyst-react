import React from 'react';
import { StyledEngineProvider, ThemeProvider as MUIThemeProvider } from '@mui/material';

import {PropTypes} from 'prop-types';
import { useSelector } from 'react-redux';

function ThemeModern(props) {
  
  const theme = useSelector(({icatalyst}) => icatalyst.settings.current.themes.mainTheme );
  
  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        {props.children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}

ThemeModern.propTypes = {
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

export default React.memo(ThemeModern);

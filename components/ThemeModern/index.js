import React from 'react';
import {useSelector} from 'react-redux';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';

import {PropTypes} from 'prop-types';

function ThemeModern(props) {

  const theme = useSelector(({icatalyst}) => icatalyst.settings.current.themes.mainTheme );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {props.children}
      </ThemeProvider>
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

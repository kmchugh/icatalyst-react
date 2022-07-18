import React from 'react';
import {useSelector} from 'react-redux';
import {ThemeProvider} from '@material-ui/styles';

import {PropTypes} from 'prop-types';
import ReloadModal from './ReloadModal';

function Theme(props) {

  const theme = useSelector(({icatalyst}) => icatalyst.settings.current.themes.mainTheme );

  return (
    <ThemeProvider theme={theme}>
      <ReloadModal />
      {props.children}
    </ThemeProvider>
  );
}

Theme.propTypes = {
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

export default React.memo(Theme);

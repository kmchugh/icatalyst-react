import React, {useContext} from 'react';
import {withRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {PropTypes} from 'prop-types';
import FuseScrollbars from '../../components/fuse/FuseScrollbars';
import { AppContext } from '../../contexts';
import { createMuiStyles, cxMui, useMergedMuiStyles } from '../../utilities';

const useStyles = createMuiStyles(() => {
  return {
    root : {
      width: '100%',
      height: '100%',
    },
  };
});

function BlankLayout(props) {
  const {className} = props;
  const appContext = useContext(AppContext);
  const { routes } = appContext;
  const classes = useMergedMuiStyles(useStyles, props);

  return (
    <FuseScrollbars className={cxMui(classes.root, className)} scrollToTopOnRouteChange>
      { renderRoutes(routes) }
    </FuseScrollbars>
  );
}

BlankLayout.propTypes = {
  className: PropTypes.string,
};

export default React.memo(withRouter(BlankLayout));

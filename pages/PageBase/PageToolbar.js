import React from 'react';
import * as PropTypes from 'prop-types';
import { createMuiStyles, cxMui } from '../../utilities';

const useStyles = createMuiStyles((theme) => {
  return {
    root: {
      display: 'flex',
      flex: '1 1 100%',
      flexDirection: 'column',
      minHeight: 0,
      backgroundColor: theme.palette.background.paper,
      color : theme.palette.text.primary
    }
  };
});

const PageToolbar = ({className, children})=>{
  const classes = useStyles();

  return (
    <div className={cxMui(classes.root, className)}>
      {children}
    </div>
  );
};

PageToolbar.propTypes={
  className : PropTypes.string,
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
export default React.memo(PageToolbar);

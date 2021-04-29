import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => {
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
    <div className={clsx(classes.root, className)}>
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

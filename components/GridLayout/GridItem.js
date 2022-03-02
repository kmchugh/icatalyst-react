import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Icon from '../Icon';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      padding: theme.spacing(.5),
      overflow : 'hidden',
      display : 'flex',
      flexDirection : 'column'
    },
    contentHeader : {
      flexShrink : 0,
      flexGrow : 0
    },
    content : {
      overflow : 'hidden',
      flexGrow : 1
    },
    dragHandle : {
      overflow : 'hidden',
      cursor : 'pointer',
      width: theme.spacing(2.5),
      height: theme.spacing(2.5),
      color : 'transparent'
    }
  };
});

const GridItem = React.forwardRef(({
  className,
  style = {},
  children,
  variant = 'default',
  ...rest
}, ref)=>{
  const styles = useStyles();

  return (
    <Paper
      ref={ref}
      className={clsx(styles.root, className)}
      style={{...style}}
      {...rest}
    >
      <div className={clsx(styles.contentHeader)}>
        <span className={clsx(styles.dragHandle, 'dragHandle')}>
          <Icon
            size={variant === 'compact' ? 'small' : 'medium'}
            title="drag"
            component="div"
            style={{
              // This is a fix for the browser updates for scrolling
              pointerEvents : 'none',
              position: 'absolute',
            }}
            color="secondary"
          >
            drag_indicator
          </Icon>
          tttt
        </span>
      </div>
      <div className={clsx(styles.content)}>
        {children}
      </div>
    </Paper>
  );
});

GridItem.displayName='GridItem';
GridItem.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  children : PropTypes.node,
  gridItemProps : PropTypes.object,
  variant : PropTypes.oneOf([
    'default',
    'compact'
  ])
};

export default GridItem;

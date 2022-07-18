import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import {IconButton, Hidden} from '@material-ui/core';
// import Icon from '@icatalyst/components/Icon';
import Icon from '../../components/Icon';

const useStyles = makeStyles(() => ({
  root: {
    display : 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    maxWidth: '100%',
  },
  navWrapper : {
    display: 'flex',
    justifyContent: 'space-between'
  },
  iconButton : {
    paddingLeft : 0,
    paddingRight: 0,
  },
  icon : {}
}));



function HeaderWrapper({
  className,
  children,
  openLeftSidePanel,
  openRightSidePanel,
  hasLeftSidePanel,
  hasRightSidePanel
}) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      { (hasLeftSidePanel || hasRightSidePanel ) && (
        <Hidden lgUp>
          <div className={clsx(classes.navWrapper)}>

            { (hasLeftSidePanel ) ?
              <IconButton className={clsx(classes.iconButton)} onClick={()=>{
                openLeftSidePanel && openLeftSidePanel();
              }} color="inherit" disableRipple>
                <Icon className={clsx(classes.icon)}>menu</Icon>
              </IconButton> : <div></div>
            }

            { (hasRightSidePanel) ?
              <IconButton className={clsx(classes.iconButton)} onClick={()=>{
                openRightSidePanel && openRightSidePanel();
              }} color="inherit" disableRipple>
                <Icon className={clsx(classes.icon)}>menu</Icon>
              </IconButton> : <div></div>
            }

          </div>
        </Hidden>
      )}

      {children}
    </div>
  );
}
HeaderWrapper.propTypes = {
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className : PropTypes.string,
  openRightSidePanel : PropTypes.func.isRequired,
  openLeftSidePanel : PropTypes.func.isRequired,
  hasLeftSidePanel : PropTypes.bool,
  hasRightSidePanel : PropTypes.bool,
};

export default React.memo(HeaderWrapper);

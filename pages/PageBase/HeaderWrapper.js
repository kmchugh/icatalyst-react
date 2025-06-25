import React from 'react';
import * as PropTypes from 'prop-types';
import {Box, IconButton} from '@mui/material';
import Icon from '@icatalyst/components/Icon';
import { createMuiStyles, cxMui } from '../../utilities';

const useStyles = createMuiStyles(() => ({
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
    <div className={cxMui(classes.root, className)}>
      { (hasLeftSidePanel || hasRightSidePanel ) && (
        <Box className={cxMui(classes.navWrapper)} sx={{ display: { lg: 'none', xs: 'block' } }}>
          { (hasLeftSidePanel ) ?
            <IconButton
              className={cxMui(classes.iconButton)}
              onClick={()=>{
                openLeftSidePanel && openLeftSidePanel();
              }}
              color="inherit"
              disableRipple
              size="large">
              <Icon className={cxMui(classes.icon)}>menu</Icon>
            </IconButton> : <div></div>
          }

          { (hasRightSidePanel) ?
            <IconButton
              className={cxMui(classes.iconButton)}
              onClick={()=>{
                openRightSidePanel && openRightSidePanel();
              }}
              color="inherit"
              disableRipple
              size="large">
              <Icon className={cxMui(classes.icon)}>menu</Icon>
            </IconButton> : <div></div>
          }

        </Box>
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

import React from 'react';
import {IconButton} from '@material-ui/core';
import Icon from 'icatalyst/components/Icon';
// import * as Actions from 'app/store/actions';

import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import  * as Actions from '../../../../icatalyst/src/app/store/actions';

import clsx from 'clsx';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';


const useStyles = makeStyles((theme)=>{
  return {
    root: {
    },
    icon : {
      color: `${mostReadable(
        tinycolor(theme.palette.background.paper),
        [
          theme.palette.secondary.main,
          theme.palette.primary.main,
        ], {}
      ).toHexString()}`,
    }
  };
});

function NavbarMobileToggleButton({
  children, className, onClick
})
{
  const dispatch = useDispatch();
  const layout = useSelector(({icatalyst}) => icatalyst.settings.current.layout);

  const classes = useStyles();

  return (
    <IconButton className={className} onClick={(e) => {
      onClick && onClick(e, !layout.navbar.folded);
      return dispatch(Actions.navbarToggleMobile());
    }} color="inherit" disableRipple>
      {children || <Icon className={clsx(classes.icon)}>menu</Icon>}
    </IconButton>
  );
}

NavbarMobileToggleButton.propTypes = {
  className : PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  onClick : PropTypes.func
};

export default NavbarMobileToggleButton;

import React from 'react';
import {IconButton} from '@material-ui/core';
import Icon from '@icatalyst/components/Icon';
import * as Actions from 'app/store/actions';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
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
          theme.palette.secondary.contrastText,
          theme.palette.primary.contrastText,
        ], {}
      ).toHexString()}`,
    }
  };
});

function NavbarMobileToggleButton(props)
{
  const {children, className} = props;
  const dispatch = useDispatch();

  const classes = useStyles(props);

  return (
    <IconButton className={className} onClick={() => dispatch(Actions.navbarToggleMobile())} color="inherit" disableRipple>
      {children || <Icon className={clsx(classes.icon)}>menu</Icon>}
    </IconButton>
  );
}

NavbarMobileToggleButton.propTypes = {
  className : PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default NavbarMobileToggleButton;

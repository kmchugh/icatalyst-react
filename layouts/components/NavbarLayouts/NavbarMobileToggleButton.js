import React from 'react';
import {IconButton} from '@mui/material';
import Icon from '@icatalyst/components/Icon';
import * as Actions from 'app/store/actions';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';
import { createMuiStyles, cxMui } from '../../../utilities';

const useStyles = createMuiStyles((theme)=>{
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
    <IconButton
      className={className}
      onClick={(e) => {
        onClick && onClick(e, !layout.navbar.folded);
        return dispatch(Actions.navbarToggleMobile());
      }}
      color="inherit"
      disableRipple
      size="large">
      {children || <Icon className={cxMui(classes.icon)}>menu</Icon>}
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

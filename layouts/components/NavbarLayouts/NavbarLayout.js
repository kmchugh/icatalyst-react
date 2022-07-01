import React from 'react';
import {AppBar, Hidden} from '@material-ui/core';
import Icon from 'icatalyst/components/Icon';
// import { Icon } from '../../../components';
import PropTypes from 'prop-types';
import FuseScrollbars from 'icatalyst/components/fuse/FuseScrollbars';
// import { FuseScrollbars } from '../../../components/fuse';
import clsx from 'clsx';
import Logo from 'icatalyst/components/Logo';
// import { Logo } from '../../../components';
import NavbarMobileToggleButton from './NavbarMobileToggleButton';
import NavbarFoldedToggleButton from './NavbarFoldedToggleButton';
import UserNavbarHeader from '../Headers/UserNavbarHeader';
import NavbarFooter from '../FooterLayouts/NavbarFooter';
import Navigation from '../Navigation/Navigation';
import {useSelector} from 'react-redux';
import {useTheme} from '@material-ui/styles';

import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme)=>({
  content: {
    flex: 1,
    overflowX                   : 'hidden',
    overflowY                   : 'auto',
    '-webkit-overflow-scrolling': 'touch',
    background                  : 'linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)',
    backgroundRepeat            : 'no-repeat',
    backgroundSize              : '100% 40px, 100% 10px',
    backgroundAttachment        : 'local, scroll',
  },
  mobileToggleIcon : {
    color: theme.palette.primary.contrastText
  },
  userHeader : {
  },
  navigation : {
    paddingTop: theme.spacing(3)
  }
}));

function NavbarLayout({
  className, onToggled
})
{
  const layout = useSelector(({icatalyst}) => icatalyst.settings.current.layout);
  const {position} = layout.navbar;
  const theme = useTheme();

  const classes = useStyles();

  return (
    <div className={clsx('flex flex-col overflow-hidden h-full', className)}>

      <AppBar
        color="primary"
        position="static"
        elevation={0}
        component="div"
        className="nav-header flex flex-row items-center flex-shrink h-64 min-h-64 pl-20 pr-12"
      >

        <div className="flex flex-1 pr-8">
          <Logo/>
        </div>

        <Hidden mdDown>
          <NavbarFoldedToggleButton
            className="w-40 h-40 p-0"
            onClick={(e, value)=>{
              onToggled && onToggled(value);
            }}
          />
        </Hidden>

        <Hidden lgUp>
          <NavbarMobileToggleButton
            className={clsx('w-40 h-40 p-0')}
            onClick={(e, value)=>{
              onToggled && onToggled(value);
            }}
          >
            <Icon className={clsx(classes.mobileToggleIcon)} style={{
              color : theme.palette.primary.contrastText
            }}>
              {position === 'right' ? 'fa angle-double-right' : 'fa angle-double-left'}
            </Icon>
          </NavbarMobileToggleButton>
        </Hidden>

      </AppBar>

      <FuseScrollbars className={clsx(classes.content)} options={{
        suppressScrollX : true
      }}>
        <UserNavbarHeader className={clsx(classes.userHeader)}/>

        <Navigation layout="vertical" className={clsx(classes.navigation)}/>

      </FuseScrollbars>

      <NavbarFooter/>
    </div>
  );
}

NavbarLayout.propTypes = {
  className : PropTypes.string,
  onToggled : PropTypes.func
};

export default NavbarLayout;

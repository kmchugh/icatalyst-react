import React from 'react';
import {AppBar, Toolbar} from '@mui/material';
import {makeStyles} from '@mui/styles';
import NavbarMobileToggleButton from '../NavbarLayouts/NavbarMobileToggleButton';
import UserMenu from '@icatalyst/components/UserMenu';
import FuseShortcuts from '@icatalyst/components/fuse/FuseShortcuts';
import {useSelector} from 'react-redux';

const useStyles = makeStyles(theme => ({
  separator: {
    width          : 1,
    height         : 64,
    backgroundColor: theme.palette.divider
  }
}));

function ToolbarComponent(props)
{

  const config = useSelector(({icatalyst}) => icatalyst.settings.current.layout);

  const classes = useStyles(props);

  return (
    <AppBar id="app-toolbar" className="flex relative z-10" color="default">
      <Toolbar className="p-0">

        {config.navbar.display && config.navbar.position === 'left' && (
          <div sx={{ display: { lg: 'none', xs: 'block' } }}>
            <NavbarMobileToggleButton className="w-64 h-64 p-0"/>
            <div className={classes.separator}/>
          </div>
        )}

        <div className="flex flex-1">
          {config.shortcuts.display &&  (
            <FuseShortcuts className="px-16" sx={{ display: { xs: 'none', lg: 'block' } }}/>
          )}
        </div>

        <div className="flex">
          <UserMenu showSettings={config.userSettingsPanel.display}/>
        </div>

        {config.navbar.display && config.navbar.position === 'right' && (
          <NavbarMobileToggleButton sx={{ display: { lg: 'none', xs: 'block' } }}/>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default ToolbarComponent;

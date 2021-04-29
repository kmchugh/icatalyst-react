import React from 'react';
import {AppBar, Hidden, Toolbar} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
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

  const config = useSelector(({app}) => app.settings.current.layout);
  
  const classes = useStyles(props);

  return (
    <AppBar id="app-toolbar" className="flex relative z-10" color="default">
      <Toolbar className="p-0">

        {config.navbar.display && config.navbar.position === 'left' && (
          <Hidden lgUp>
            <NavbarMobileToggleButton className="w-64 h-64 p-0"/>
            <div className={classes.separator}/>
          </Hidden>
        )}

        <div className="flex flex-1">
          {config.shortcuts.display &&  (<Hidden mdDown>
            <FuseShortcuts className="px-16"/>
          </Hidden>
          )}
        </div>

        <div className="flex">
          <UserMenu showSettings={config.userSettingsPanel.display}/>
        </div>

        {config.navbar.display && config.navbar.position === 'right' && (
          <Hidden lgUp>
            <NavbarMobileToggleButton/>
          </Hidden>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default ToolbarComponent;

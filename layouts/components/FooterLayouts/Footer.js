import React from 'react';
import {AppBar, Toolbar,Typography} from '@material-ui/core';
import config from 'app/settings/config';

function Footer()
{
  const {footer} = config.text;

  return (
    <AppBar id="app-footer" className="relative z-10 flex-1 flex-grow-0" color="default">
      <Toolbar className="px-16 py-8 md:py-0 flex items-center min-h-32 text-10 md:text-12">
        <Typography variant="caption">
          {footer}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;

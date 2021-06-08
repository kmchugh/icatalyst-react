import React from 'react';
import {AppBar, Toolbar,Typography} from '@material-ui/core';
import config from 'app/settings/config';

import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root  : {
    // TODO: Fix, this is currently required for safari
    flexBasis : '32px!important'
  }
}));


function Footer()
{
  const {footer} = config.text;
  const classes = useStyles();

  return (
    <AppBar id="app-footer" className={clsx(classes.root, 'relative z-10 flex-1 flex-grow-0')} color="default">
      <Toolbar className="px-16 py-8 md:py-0 flex items-center min-h-32 text-10 md:text-12">
        <Typography variant="caption">
          {footer}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;

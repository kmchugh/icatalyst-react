import React from 'react';
import {AppBar, Toolbar,Typography} from '@mui/material';
import config from 'app/settings/config';
import { createMuiStyles, cxMui } from '../../../utilities';

const useStyles = createMuiStyles((theme) => {
  return {
    root : {
      // TODO: Find out why safari needs this to show the footer
      flexBasis: `${theme.spacingNum(4)}!important`,
      flexShrink: 0,
      flex: 1,
      flexGrow: 0,
      position: 'relative',
      zIndex: 10
    },
  };
});


function Footer()
{
  const classes = useStyles();
  const {footer} = config.text;

  return (
    <AppBar
      role="contentinfo"
      component="div"
      id="app-footer"
      className={cxMui(classes.root)} color="default">
      <Toolbar className="px-16 py-8 md:py-0 flex items-center min-h-32 text-10 md:text-12">
        <Typography variant="caption">
          {footer}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;

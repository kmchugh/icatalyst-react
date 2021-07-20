import React from 'react';
import {AppBar, Toolbar, Typography, Link} from '@material-ui/core';
import {Image} from '@icatalyst/components';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import {useSelector} from 'react-redux';


const useStyles = makeStyles((theme) => ({
  root        : {
  },
  link : {
    display: 'flex',
    flex : 1,
  },
  logo : {
    width: 'auto',
    height: 'auto',
    maxWidth: theme.spacing(4),
    maxHeight: theme.spacing(4),
    paddingTop: theme.spacing(.5),
    paddingBottom: theme.spacing(.5),
    paddingRight: theme.spacing(1),
    transition   : theme.transitions.create(['padding', 'width', 'height'], {
      easing  : theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter
    }),
  },
  text : {
    transition   : theme.transitions.create(['opacity'], {
      easing  : theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter
    }),
    opacity: 1,
    maxHeight: theme.spacing(4),
    overflow: 'hidden',
    lineHeight: theme.spacing(4) + 'px'
  }
}));

function Footer()
{
  const classes = useStyles();

  const config = useSelector(({icatalyst}) => icatalyst.settings.current.layout);

  return (
    <AppBar component="div" id="nav-footer" className={clsx(classes.root, 'relative',  'z-10')} color="default">
      <Toolbar className="px-16 py-0 flex items-center min-h-32">
        <Link className={clsx(classes.link, 'nav-footer-link')} href={config.companyUrl} target="_blank">
          <Image
            className={clsx(classes.logo, 'nav-footer-icon')}
            defaultSrc="static/backgrounds/150.png"
            alt={`${config.companyName} Logo`}
            src={config.companyLogo}/>
          <Typography variant="caption" className={clsx(classes.text, 'nav-footer-text')}>
            {config.companyName}
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;

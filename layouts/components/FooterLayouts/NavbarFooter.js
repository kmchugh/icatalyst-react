import React from 'react';
import {AppBar, Toolbar, Typography, Link} from '@mui/material';
import Image from '../../../components/Image';
import {useSelector} from 'react-redux';
import { createMuiStyles, cxMui } from '../../../utilities';
import { useOrganisation } from '../../../contexts/Organisation/OrganisationContext';


const useStyles = createMuiStyles((theme) => ({
  root        : {
  },
  link : {
    display: 'flex',
    flex : '1 0 0%',
  },
  logo : {
    width: 'auto',
    height: 'auto',
    maxWidth: theme.spacingNum(4),
    maxHeight: theme.spacingNum(4),
    paddingTop: theme.spacingNum(.5),
    paddingBottom: theme.spacingNum(.5),
    paddingRight: theme.spacingNum(1),
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
    maxHeight: theme.spacingNum(4),
    overflow: 'hidden',
    lineHeight: theme.spacing(4)
  }
}));

function Footer()
{
  const classes = useStyles();

  const config = useSelector(({icatalyst}) => icatalyst.settings.current.layout);
  const { entitySettings } = useOrganisation();

  const footerTitle = entitySettings?.authorName || config.companyName;
  const footerLogo = entitySettings?.authorLogo || config.companyLogo;
  const footerHref =
    entitySettings?.authorURL ||
    entitySettings?.websiteURI ||
    config.companyUrl;

  return (
    <AppBar component="div" id="nav-footer" className={cxMui(classes.root, 'relative',  'z-10')} color="default">
      <Toolbar className="px-16 py-0 flex items-center min-h-32">
        <Link className={cxMui(classes.link, 'nav-footer-link')} href={footerHref} target="_blank">
          <Image
            className={cxMui(classes.logo, 'nav-footer-icon')}
            defaultSrc="static/backgrounds/150.png"
            alt={`${footerTitle} Logo`}
            src={footerLogo}/>
          <Typography color="textPrimary" variant="caption" className={cxMui(classes.text, 'nav-footer-text')}>
            {footerTitle}
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;

import React from 'react';
import {Typography} from '@mui/material';
import Image from '@icatalyst/components/Image';
import {useSelector} from 'react-redux';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';
import PropTypes from 'prop-types';
import { createMuiStyles, cxMui, useMuiTheme } from '../../utilities';

const styles = (theme) => {
  return {
    root      : {
      width: '100%',
      display: 'flex'
    },
    logoWrapper : {
      background: theme.palette.primary.contrastText,
      width     : theme.spacingNum(4),
      height    : theme.spacingNum(4),
      borderRadius : '50%',
      padding : theme.spacingNum(.75),
      display : 'flex',
      alignItems : 'center',
      transition: theme.transitions.create(['width', 'height'], {
        duration: theme.transitions.duration.shortest,
        easing  : theme.transitions.easing.easeInOut
      })
    },
    'logoIcon'                : {
    },
    'logoText'                : {
      flexShrink : 1,
      flexGrow : 1,
      alignSelf: 'center'
    },
  };
};


const useStyles = createMuiStyles(styles);

function Logo({
  showTitle = true,
  className
})
{
  const classes = useStyles();
  const config = useSelector(({icatalyst}) => icatalyst.settings.current.layout);
  const theme = useMuiTheme();

  return (
    <div className={cxMui(classes.root, className)}>
      <div className={cxMui(classes.logoWrapper, 'logo-icon')}>
        <Image className={cxMui(classes.logoIcon)}
          src={config.clientLogo}
          defaultSrc={
            mostReadable(tinycolor(theme.palette.secondary.contrastText), ['#fff', '#000'], {}).toHexString() === '#000000' ?
              'assets/images/placeholders/image_dark.svg' :
              'assets/images/placeholders/image_light.svg'
          }
          alt={`logo for ${config.clientName}`}/>
      </div>
      {showTitle && <Typography variant="h1" className={cxMui(classes.logoText, 'text-16 ml-12 font-light logo-text')}>{config.clientName}</Typography>}
    </div>
  );
}

Logo.propTypes = {
  showTitle : PropTypes.bool,
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
};


export default React.memo(Logo);

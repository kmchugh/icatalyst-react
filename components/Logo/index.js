import React from 'react';
import {Typography} from '@material-ui/core';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/styles';
import Image from '@icatalyst/components/Image';
import {useSelector} from 'react-redux';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';
import PropTypes from 'prop-types';

const styles = (theme) => {
  return {
    root      : {
      width: '100%',
      display: 'flex'
    },
    logoWrapper : {
      background: theme.palette.primary.contrastText,
      width     : theme.spacing(4),
      height    : theme.spacing(4),
      borderRadius : '50%',
      padding : theme.spacing(.75),
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


const useStyles = makeStyles(styles);

function Logo({
  showTitle = true
})
{
  const classes = useStyles();
  const config = useSelector(({icatalyst}) => icatalyst.settings.current.layout);
  const theme = useTheme();

  return (
    <div className={clsx(classes.root)}>
      <div className={clsx(classes.logoWrapper, 'logo-icon')}>
        <Image className={clsx(classes.logoIcon)}
          src={config.clientLogo}
          defaultSrc={
            mostReadable(tinycolor(theme.palette.secondary.contrastText), ['#fff', '#000'], {}).toHexString() === '#000000' ?
              'assets/images/placeholders/image_dark.svg' :
              'assets/images/placeholders/image_light.svg'
          }
          alt={`logo for ${config.clientName}`}/>
      </div>
      {showTitle && <Typography className={clsx(classes.logoText, 'text-16 ml-12 font-light logo-text')}>{config.clientName}</Typography>}
    </div>
  );
}

Logo.propTypes = {
  showTitle : PropTypes.bool
};


export default React.memo(Logo);

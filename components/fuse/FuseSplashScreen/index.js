import React, {useContext} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import { AppContext } from '../../../contexts';
import {Typography} from '@material-ui/core';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor : theme.palette.secondary.main
    },
    message   : {
      textAlign: 'center',
      marginTop: theme.spacing(3)
    },
    primary : {
      color : `${mostReadable(
        tinycolor(theme.palette.secondary.main),
        [
          theme.palette.primary.main,
          theme.palette.primary.contrastText,
        ], {}
      ).toHexString()}`
    },
    secondary : {
      color : `${mostReadable(
        tinycolor(theme.palette.secondary.main),
        [
          theme.palette.secondary.main,
          theme.palette.secondary.contrastText,
        ], {}
      ).toHexString()}`
    },
    error : {
      color : theme.palette.error.main
    },
    warning : {
      color : theme.palette.warning.main
    },
    success : {
      color : theme.palette.success.main
    }
  };
});

function FuseSplashScreen(props)
{
  const classes = useStyles(props);
  const {message, messageColor} = props;

  const {applicationConfig} = useContext(AppContext);

  return (
    <div role="main" id='splash-screen' className={clsx(classes.root)}>

      <div className="logo">
        <img width="128" src={applicationConfig.logo} alt="logo"/>
      </div>

      <div className="loader">
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__ball"></div>
      </div>

      <div className={clsx(classes.message)}>
        <Typography component="h1" className={clsx(classes[messageColor || 'primary'])} variant="h6">{message}</Typography>
      </div>
    </div>
  );
}

FuseSplashScreen.defaultProps = {
  message : 'Loading...'
};

FuseSplashScreen.propTypes = {
  message : PropTypes.string,
  messageColor : PropTypes.oneOf([
    'primary',
    'secondary',
    'error',
    'warning',
    'success'
  ])
};


export default React.memo(FuseSplashScreen);

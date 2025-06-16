import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {styled} from '@mui/styles';
import { AppContext } from '../../../contexts';
import {Typography} from '@mui/material';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor : theme.palette.secondary.main
}));

const Message = styled('div')(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacingNum(3)
}));

const StyledTypography = styled(Typography)(({ theme, $colorVariant }) => ({
  color:
    $colorVariant === 'primary'
      ? mostReadable(
        tinycolor(theme.palette.secondary.main),
        [theme.palette.primary.main, theme.palette.primary.contrastText],
        {}
      ).toHexString()
      : mostReadable(
        tinycolor(theme.palette.secondary.main),
        [theme.palette.secondary.main, theme.palette.secondary.contrastText],
        {}
      ).toHexString(),
}));


function FuseSplashScreen(props)
{
  const {message, messageColor} = props;

  const {applicationConfig} = useContext(AppContext);

  return (
    <Root role="main" id='splash-screen'>

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

      <Message>
        <StyledTypography component="h1" $colorVariant={messageColor || 'primary'} variant="h6">{message}</StyledTypography>
      </Message>
    </Root>
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

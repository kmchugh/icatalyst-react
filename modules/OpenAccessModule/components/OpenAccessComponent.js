import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {makeStyles, useTheme} from '@material-ui/styles';
import clsx from 'clsx';
import {SingularityContext} from '@icatalyst/components/Singularity';
import { useLocation } from 'react-router-dom';
import { getParams } from '../../../utilities/getParams';
import FuseLoading from '../../../components/fuse/FuseLoading';
import Image from '../../../components/Image';
import InfoPage from '../../../pages/InfoPage';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useSelector} from 'react-redux';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      display : 'flex',
      flexDirection : 'column',
      flexGrow: 1
    },
    logoWrapper : {

    },
    logoIcon : {
      width: theme.spacing(16),
      height: theme.spacing(16)
    },
    actionWrapper : {
      display : 'flex',
      flexDirection : 'column',
      marginTop: theme.spacing(1),
      alignItems : 'center',

      [theme.breakpoints.up('md')]: {
        flexDirection : 'row',
      },

    },
    action : {
      display : 'flex',
      flexDirection : 'column',
      padding: theme.spacing(2),
    }
  };
});

const OpenAccessComponent = ({
  className
})=>{
  const styles = useStyles();
  const theme = useTheme();
  const singularityContext = useContext(SingularityContext);
  const config = useSelector(({icatalyst}) => icatalyst.settings.current.layout);

  const authContext = singularityContext;
  const {login, register, session} = authContext;
  const location = useLocation();
  const {
    state = {}
  } = location;
  const {referrer} = state;
  const {
    state : oAuthState, code : oAuthCode
  } = getParams(location.search);

  const inAuthFlow = !!(session || oAuthState || oAuthCode);

  return (
    <div className={clsx(styles.root, className)}>
      { inAuthFlow && (
        <FuseLoading/>
      )}

      { !inAuthFlow && (
        <InfoPage
          icon={
            <div className={clsx(styles.logoWrapper)}>
              <Image className={clsx(styles.logoIcon)}
                src={config.clientLogo}
                defaultSrc={
                  mostReadable(tinycolor(theme.palette.secondary.contrastText), ['#fff', '#000'], {}).toHexString() === '#000000' ?
                    'assets/images/placeholders/image_dark.svg' :
                    'assets/images/placeholders/image_light.svg'
                }
                alt={`logo for ${config.clientName}`}/>
            </div>
          }
          title={`Welcome to ${config.clientName}`}
          info="You are not currently logged in.  Not to worry, you are just a click away."
          action={(
            <div className={clsx(styles.actionWrapper)}>

              <div className={clsx(styles.action)}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={()=>{
                    login(referrer ? `${window.location.origin}${referrer}` : referrer);
                  }}
                >
                  Log in
                </Button>
              </div>

              <Typography variant="body1">OR</Typography>

              <div className={clsx(styles.action)}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={()=>{
                    register(referrer ? `${window.location.origin}${referrer}` : referrer);
                  }}
                >
                  Create Account
                </Button>
              </div>
            </div>
          )}
        />
      )}

    </div>
  );
};

OpenAccessComponent.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
};

export default OpenAccessComponent;

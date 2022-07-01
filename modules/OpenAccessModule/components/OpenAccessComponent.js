import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {makeStyles, useTheme} from '@material-ui/styles';
import clsx from 'clsx';
import {SingularityContext} from 'icatalyst/components/Singularity';
import { useLocation } from 'react-router-dom';
import { getParams } from '../../../utilities/getParams';
import FuseLoading from '../../../components/fuse/FuseLoading';
import Image from '../../../components/Image';
import InfoPage from '../../../pages/InfoPage';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useSelector} from 'react-redux';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';
import {alpha} from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      display : 'flex',
      flexDirection : 'column',
      flexGrow: 1,
      justifyContent: 'center',
      color: theme.palette.secondary.contrastText
    },
    backgroundCoverFN : ({backgroundImage})=>{
      return backgroundImage ? {
        backgroundImage: `url('${backgroundImage}')`,
        objectFit : 'cover',
        backgroundSize : 'cover'
      } : {};
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
    },
    infoPage : {
      background : alpha(
        theme.palette.secondary.main,
        1-theme.palette.action.selectedOpacity
      ),
      padding: theme.spacing(2),

      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8),
        height: 'auto'
      },
    }
  };
});

const OpenAccessComponent = ({
  className
})=>{
  const theme = useTheme();
  const singularityContext = useContext(SingularityContext);
  const config = useSelector(({icatalyst}) => icatalyst.settings.current.layout);

  const styles = useStyles({
    backgroundImage : config.clientBackground
  });

  const authContext = singularityContext;
  console.log("context",authContext);
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
    <div className={clsx(styles.root, styles.backgroundCoverFN, className)}>
      { inAuthFlow && (
        <FuseLoading/>
      )}

      { !inAuthFlow && (
        <InfoPage
          className={clsx(styles.infoPage)}
          icon={
            <div>
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

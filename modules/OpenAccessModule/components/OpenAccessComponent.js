import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {SingularityContext} from '@icatalyst/components/Singularity';
import { useLocation } from 'react-router-dom';
import { getParams } from '../../../utilities/getParams';
import FuseLoading from '../../../components/fuse/FuseLoading';
import Image from '../../../components/Image';
import InfoPage from '../../../pages/InfoPage';
import Button from '@mui/material/Button';
import IconButton from '../../../components/IconButton';
import Typography from '@mui/material/Typography';
import {useSelector, useDispatch} from 'react-redux';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';
import { alpha } from '@mui/material/styles';
import { definition as authProviderDefinition } from '../../../components/Singularity/store/reducers/authProviders.reducer';
import { createMuiStyles, cxMui, useMuiTheme } from '../../../utilities';

const PROVIDER_KEY = 'b145043b-28b9-46e4-b55f-02daf8291045';
const PROVIDER_SIGNOUT_KEY = 'ce95d9a5-5065-464a-af8f-064c926e2f6c';

const useStyles = createMuiStyles((theme, { backgroundImage })=>{
  return {
    root : {
      display : 'flex',
      flexDirection : 'column',
      flexGrow: 1,
      justifyContent: 'center',
      color: theme.palette.secondary.contrastText
    },
    loadingWrapper: {
      background: theme.palette.background.paper,
      border: `thin solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacingNum(2, 3),
      maxWidth: theme.spacingNum(50),
      alignSelf: 'center',
      justifySelf: 'center'
    },
    backgroundCoverFN : backgroundImage ? {
      backgroundImage: `url('${backgroundImage}')`,
      objectFit : 'cover',
      backgroundSize : 'cover'
    } : {},
    logoIcon : {
      width: theme.spacingNum(16),
      height: theme.spacingNum(16)
    },
    actionWrapper : {
      display : 'flex',
      flexDirection : 'column',
      marginTop: theme.spacingNum(1),
      alignItems : 'center',

      [theme.breakpoints.up('md')]: {
        flexDirection : 'row',
      },

    },
    action : {
      display : 'flex',
      flexDirection : 'column',
      padding: theme.spacingNum(2),
    },
    infoPage : {
      background : alpha(
        theme.palette.secondary.main,
        1-theme.palette.action.selectedOpacity
      ),
      padding: theme.spacingNum(2),

      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacingNum(8),
        paddingRight: theme.spacingNum(8),
        height: 'auto'
      },
    },
    resetLogin: {
      position: 'absolute',
      top: 0,
      right: 0
    },
    loader: {
      '& .MuiTypography-root' : {
        color: theme.palette.primary.contrastText
      }
    }
  };
});

const OpenAccessComponent = ({
  className
})=>{
  const theme = useMuiTheme();
  const singularityContext = useContext(SingularityContext);
  const config = useSelector(({icatalyst}) => icatalyst.settings.current.layout);
  const dispatch = useDispatch();
  const [gettingAuthProvider, setGettingAuthProvider] = useState(false);
  const [authProvider, setAuthProvider] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const styles = useStyles({
    backgroundImage : config.clientBackground
  });

  /**
   * Stores or retrieves a value from localstorage.
   * If value is undefined then this will retrieve a value for the
   * key specified, otherwise this will set the value for the key,
   * @method localStore
   * @param  {[type]}   key   the key to set or get the value for
   * @param  {[type]}   value if defined then the value to set
   * @return {[type]}         the value set
   */
  function localStore(key, value) {
    if (value !== undefined) {
      // Set the local storage
      localStorage.setItem(key, JSON.stringify(value));
    }
    return JSON.parse(localStorage.getItem(key));
  }

  const authContext = singularityContext;
  const authAction = localStore('auth:action');
  const {login, register, session} = authContext;
  const location = useLocation();
  const {
    state = {}
  } = location;
  const {referrer} = state;
  const {
    state : oAuthState, code : oAuthCode
  } = getParams(location.search);

  let providerID = location.pathname.split('/').pop();
  if (!providerID || providerID === 'access') {
    // See if there is a provider in the localstore and load if so
    providerID = localStore(PROVIDER_KEY);
  }
  const hasProvider = providerID && providerID !== 'access';

  const inAuthFlow = !!(session || oAuthState || oAuthCode);

  const signoutURL = localStore(PROVIDER_SIGNOUT_KEY);

  useEffect(()=>{
    if (!inAuthFlow && hasProvider) {
      setGettingAuthProvider(true);
      // Retrieve the provider information
      dispatch(authProviderDefinition.operations['RETRIEVE_ENTITY'](
        providerID,
        (err, res)=>{
          if (err) {
            // provider is invalid clear localstore
            localStore(PROVIDER_KEY, null);
            localStore(PROVIDER_SIGNOUT_KEY, null);
          } else {
            setAuthProvider(res);
            // provider is valid set localstore
            localStore(PROVIDER_KEY, res.guid);
            localStore(PROVIDER_SIGNOUT_KEY, res.urls.signOff);
          }
          setGettingAuthProvider(false);
        },
        {
          clientToken : singularityContext.clientToken
        },
      ));
    }
  }, [hasProvider, inAuthFlow]);

  if (authAction === 'signout' && signoutURL) {
    localStore('auth:action', null);
    window.location.href = signoutURL;
  }

  return (
    <div className={cxMui(styles.root, styles.backgroundCoverFN, className)}>
      { (inAuthFlow || gettingAuthProvider) && (
        <div className={cxMui(styles.loadingWrapper)}>
          <FuseLoading/>
        </div>
      )}
      { (!inAuthFlow && authProvider && !gettingAuthProvider) && (
        <InfoPage
          className={cxMui(styles.infoPage)}
          icon={
            <div>
              <Image className={cxMui(styles.logoIcon)}
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
            <div className={cxMui(styles.actionWrapper)}>

              <div className={cxMui(styles.action)}>
                {!loggingIn && <Button
                  color="primary"
                  variant="contained"
                  onClick={()=>{
                    setLoggingIn(true);
                    login(`${window.location.origin}`, {auth_provider_id: providerID});
                  }}
                >
                  {`Log in with ${authProvider.name}`}
                </Button>}
                {loggingIn && <FuseLoading
                  className={cxMui(styles.loader)}
                  title="Connecting"
                />}
              </div>

              <div
                className={cxMui(styles.resetLogin)}
              >
                <IconButton
                  icon="vpn_key"
                  title="login with personal account"
                  onClick={()=>{
                    localStore(PROVIDER_KEY, null);
                    localStore(PROVIDER_SIGNOUT_KEY, null);
                    window.location.href = `${window.location.origin}/access`;
                  }}
                  size="large" />
              </div>
            </div>
          )}
        />
      )}
      { (!inAuthFlow && !authProvider && !gettingAuthProvider) && (
        <InfoPage
          className={cxMui(styles.infoPage)}
          icon={
            <div>
              <Image className={cxMui(styles.logoIcon)}
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
            <div className={cxMui(styles.actionWrapper)}>

              <div className={cxMui(styles.action)}>
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

              <div className={cxMui(styles.action)}>
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

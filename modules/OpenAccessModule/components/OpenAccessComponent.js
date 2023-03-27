import React, {useContext, useEffect, useState} from 'react';
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
import IconButton from '../../../components/IconButton';
import Typography from '@material-ui/core/Typography';
import {useSelector, useDispatch} from 'react-redux';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';
import {alpha} from '@material-ui/core/styles/colorManipulator';
import { definition as authProviderDefinition } from '../../../components/Singularity/store/reducers/authProviders.reducer';

const PROVIDER_KEY = 'b145043b-28b9-46e4-b55f-02daf8291045';
const PROVIDER_SIGNOUT_KEY = 'ce95d9a5-5065-464a-af8f-064c926e2f6c';

const useStyles = makeStyles((theme)=>{
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
      padding: theme.spacing(2, 3),
      maxWidth: theme.spacing(50),
      alignSelf: 'center',
      justifySelf: 'center'
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
    },
    resetLogin: {
      position: 'absolute',
      top: 0,
      right: 0
    }
  };
});

const OpenAccessComponent = ({
  className
})=>{
  const theme = useTheme();
  const singularityContext = useContext(SingularityContext);
  const config = useSelector(({icatalyst}) => icatalyst.settings.current.layout);
  const dispatch = useDispatch();
  const [gettingAuthProvider, setGettingAuthProvider] = useState(false);
  const [authProvider, setAuthProvider] = useState(null);

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
    <div className={clsx(styles.root, styles.backgroundCoverFN, className)}>
      { (inAuthFlow || gettingAuthProvider) && (
        <div className={clsx(styles.loadingWrapper)}>
          <FuseLoading/>
        </div>
      )}

      { (!inAuthFlow && authProvider && !gettingAuthProvider) && (
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
                    const {urls} = authProvider;
                    const clientID = authProvider.provider.clientID;
                    const {config} = singularityContext;

                    const responseType = 'code';
                    const redirectURL = encodeURIComponent(
                      `${config.server.root}/v2/api/connectors/oidc/${providerID}`,
                    );
                    const scope = encodeURIComponent('openid profile email');
                    const state = '1234567890';
                    const audience = encodeURIComponent(urls.issuer);

                    const authoriseEndpoint = `${encodeURI(
                      urls.auth,
                    )}?state=${state}&response_type=${responseType}&client_id=${clientID}&scope=${scope}&audience=${audience}&redirect_uri=${redirectURL}`;

                    window.location.href = authoriseEndpoint;
                  }}
                >
                  {`Log in with ${authProvider.name}`}
                </Button>
              </div>

              <div
                className={clsx(styles.resetLogin)}
              >
                <IconButton
                  icon="vpn_key"
                  title="login with personal account"
                  onClick={()=>{
                    localStore(PROVIDER_KEY, null);
                    localStore(PROVIDER_SIGNOUT_KEY, null);
                    window.location.href = `${window.location.origin}/access`;
                  }}
                />
              </div>
            </div>
          )}
        />
      )}

      { (!inAuthFlow && !authProvider && !gettingAuthProvider) && (
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

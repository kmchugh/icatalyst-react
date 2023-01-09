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

  return (
    <div className={clsx(styles.root, styles.backgroundCoverFN, className)}>
      { (inAuthFlow || gettingAuthProvider) && (
        <FuseLoading/>
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


//
//
// import { BaseComponent, Button } from '@icatalyst/react-ui-components';
// import { OIDCConnectorDto } from '@icatalyst/singularity-libs';
// import { makeStyles } from 'tss-react/mui';
//
// const useStyles = makeStyles()((/*theme*/) => {
//   return {
//     root: {},
//   };
// });
//
// // eslint-disable-next-line @typescript-eslint/no-empty-interface
// export interface UserDashboardProps
//   extends BaseComponent<
//     'span',
//     Partial<ReturnType<typeof useStyles>['classes']>
//   > {
//   // TODO Custom Props HERE
// }
//
// class OIDCConnector {
//   private configuration: OIDCConnectorDto;
//   constructor(config: OIDCConnectorDto) {
//     this.configuration = config;
//   }
//
//   initiateAuthorisation() {
//     const { urls } = this.configuration;
//     const responseType = 'code';
//     const clientID = this.configuration.provider.clientID;
//     const redirectURL = encodeURIComponent(
//       'http://localhost:9002/v2/api/connectors/oidc/myconnectorid',
//     );
//     const scope = encodeURIComponent('email');
//
//     const authoriseEndpoint = `${encodeURI(
//       urls.auth,
//     )}?response_type=${responseType}&client_id=${clientID}&redirect_uri=${redirectURL}&scope=${scope}`;
//     window.location.href = authoriseEndpoint;
//   }
// }
//
// export function UserDashboard({
//   className,
//   style,
//   classes: classesProp,
// }: UserDashboardProps) {
//   const { classes, cx } = useStyles(undefined, {
//     props: {
//       classes: classesProp,
//     },
//   });
//
//   const pingDataOIDC: OIDCConnectorDto = {
//     urls: {
//       auth: 'https://auth.pingone.asia/498a62fa-a099-432a-b84c-f22464766ea9/as/authorize',
//       token:
//         'https://auth.pingone.asia/498a62fa-a099-432a-b84c-f22464766ea9/as/token',
//       jwks: 'https://auth.pingone.asia/498a62fa-a099-432a-b84c-f22464766ea9/as/jwks',
//       userInfo:
//         'https://auth.pingone.asia/498a62fa-a099-432a-b84c-f22464766ea9/as/userinfo',
//       signOff:
//         'https://auth.pingone.asia/498a62fa-a099-432a-b84c-f22464766ea9/as/signoff',
//       oidcDiscovery:
//         'https://auth.pingone.asia/498a62fa-a099-432a-b84c-f22464766ea9/as/.well-known/openid-configuration',
//       introspect:
//         'https://auth.pingone.asia/498a62fa-a099-432a-b84c-f22464766ea9/as/introspect',
//       revokeToken:
//         'https://auth.pingone.asia/498a62fa-a099-432a-b84c-f22464766ea9/as/revoke',
//       issuer:
//         'https://auth.pingone.asia/498a62fa-a099-432a-b84c-f22464766ea9/as',
//     },
//     provider: {
//       clientID: 'fa297fcf-5cb3-4e6d-a874-7834b76f6570',
//       clientSecret:
//         'R~n0a-BT-Y5zzFhnKN_LPdr9aU04COyQjQXTYILhas72tdGRzh1Nj-uNU7Z7C~.g',
//     },
//     clientID: '8969a3b8-e9ba-4d6d-b608-74c5c9296e14',
//   };
//
//   const handleClick = () => {
//     const connector = new OIDCConnector(pingDataOIDC);
//     connector.initiateAuthorisation();
//   };
//
//   return (
//     <div className={cx(classes.root, className)} style={style}>
//       <Button onClick={handleClick} icon="person">
//         Ping Federate
//       </Button>
//     </div>
//   );
// }
//
// export default UserDashboard;

import React, {useEffect} from 'react';
import {Drawer, Hidden} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import * as Actions from 'app/store/actions';
import NavbarLayout from './NavbarLayout';
import {useDispatch, useSelector} from 'react-redux';
import {useSettingsContext} from '../../../components/Settings/SettingsProvider';
import {registerSettings} from '../../../components/Settings/SettingsProvider';
import _ from '../../../@lodash';

const NAVBAR_SETTINGS_ID = 'icat_navbar';

/**
 * Register the NavBar Settings with the settings provider
 * so they can be managed by the user
 * @type {[type]}
 */
registerSettings({
  name : NAVBAR_SETTINGS_ID,
  sectionName : 'userInterface',
  label : 'Navigation Bar',
  icon : 'menu_open',
  fields : [{
    id : 'state',
    type : 'select',
    default : 'expanded',
    options : [{
      id : 'expanded'
    }, {
      id : 'collapsed'
    }]
  }]
});

const useStyles = makeStyles((theme) => {
  return {
    wrapper({navbarWidth}){
      return {
        display                     : 'flex',
        flexDirection               : 'column',
        zIndex                      : 4,
        [theme.breakpoints.up('lg')]: {
          width   : navbarWidth,
          minWidth: navbarWidth
        }
      };
    },
    wrapperFolded({navbarFoldedWidth}) {
      return {
        [theme.breakpoints.up('lg')]: {
          width   : `${navbarFoldedWidth}px !important`,
          minWidth: `${navbarFoldedWidth}px !important`,
        }
      };
    },
    navbar({navbarWidth}){
      return {
        display      : 'flex',
        overflow     : 'hidden',
        flexDirection: 'column',
        flex         : '1 1 auto',
        width        : navbarWidth,
        minWidth     : navbarWidth,
        height       : '100%',
        zIndex       : 4,
        transition   : theme.transitions.create(['width', 'min-width'], {
          easing  : theme.transitions.easing.sharp,
          duration: theme.transitions.duration.shorter
        }),
        boxShadow    : theme.shadows[3],
        backgroundColor: theme.palette.background.default
      };
    },
    left           : {
      left: 0
    },
    right          : {
      right: 0
    },
    folded({navbarFoldedWidth}) {
      return {
        position: 'absolute',
        width   : navbarFoldedWidth,
        minWidth: navbarFoldedWidth,
        top     : 0,
        bottom  : 0
      };
    },
    foldedAndOpened({navbarWidth}){
      return {
        width   : navbarWidth,
        minWidth: navbarWidth
      };
    },
    navbarContent  : {
      flex: '1 1 auto',
    },
    foldedAndClosed: {
      '& $navbarContent': {
        '& .nav-footer-link' : {

          textAlign: 'center',

          '& .nav-footer-icon' : {
            padding: theme.spacing(.5),
          },
          '& .nav-footer-text' : {
            width: 0,
            opacity: 0
          },
        },

        '& .nav-header' : {
          paddingLeft: theme.spacing(1.5),
          '& .logo-icon'                                   : {
            width : theme.spacing(5),
            height: theme.spacing(5),
          },
        },
        '& .logo-text'                                   : {
          opacity: 0
        },
        '& .react-badge'                                 : {
          opacity: 0
        },
        '& .list-item-text, & .arrow-icon, & .item-badge': {
          opacity: 0
        },
        '& .list-subheader .list-subheader-text'         : {
          opacity: 0
        },
        '& .list-subheader .list-subheader-icon' : {
          width: `${theme.spacing(2)}px!important`,
          color: `${theme.palette.action.disabled}!important`
        },
        '& .list-subheader.iconless:before'                : {
          content  : '""',
          display  : 'block',
          position : 'absolute',
          minWidth : theme.spacing(2),
          borderTop: '2px solid',
          opacity  : .2
        },
        '& .collapse-children'                           : {
          display: 'none'
        },
        '& .user'                                        : {
          paddingBottom : 0,
          marginBottom : 0,

          '& .username, & .role': {
            opacity: 0
          },
          '& .role': {
            lineHeight: `${theme.spacing(1)}px`
          },
          '& .avatar'            : {
            width  : theme.spacing(6),
            height : theme.spacing(6),
            top    : theme.spacing(5),
            padding: 0
          }
        },
        '& ul.navigation' : {
          marginTop : theme.spacing(2),
          transition   : theme.transitions.create(['margin-top'], {
            easing  : theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter
          }),
        },
        '& .list-item.active'                            : {
          marginLeft  : theme.spacing(1.5),
          width       : theme.spacing(5),
          padding     : theme.spacing(1.5),
          borderRadius: theme.spacing(2.5),
          '&.square'  : {
            borderRadius: 0,
            marginLeft  : 0,
            paddingLeft : theme.spacing(3),
            width       : '100%'
          }
        },
        '& ul.navigation > .active' : {
          transition   : theme.transitions.create(['border-left-width', 'margin-left', 'border-radius', 'padding-left', 'width'], {
            easing  : theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter
          }),
          borderRadius: 0,
          marginLeft  : 0,
          paddingLeft : theme.spacing(3),
          width       : '100%',
          borderLeftWidth : 0
        }
      }
    }
  };
});

function NavbarWrapper()
{
  const dispatch = useDispatch();

  const config = useSelector(({icatalyst}) => icatalyst.settings.current.layout);

  const navbar = useSelector(({icatalyst}) => icatalyst.navbar);

  const navbarSettings = useSettingsContext(NAVBAR_SETTINGS_ID);
  const {
    values : reducerValues,
    updateSettings,
    settingsInstanceID
  } = navbarSettings;

  const folded = reducerValues.state === 'collapsed';
  const foldedAndClosed = folded && !navbar.foldedOpen;
  const foldedAndOpened = folded && navbar.foldedOpen;
  const navbarWidth = config.navbar.width;
  const navbarFoldedWidth = config.navbar.foldedWidth;

  const classes = useStyles({
    navbarWidth,
    navbarFoldedWidth
  });

  useEffect(()=>{
    return dispatch(Actions.setDefaultSettings(_.set({}, 'layout.navbar.folded', folded)));
  }, []);

  const onNavbarToggled = (value)=>{
    updateSettings((values)=>{
      return {
        ...values,
        state : value ? 'collapsed' : 'expanded'
      };
    }, settingsInstanceID);
  };

  return (
    <div id="app-navbar" role="navigation"
      className={
        clsx(
          classes.wrapper,
          folded && classes.wrapperFolded
        )}
    >
      <Hidden mdDown>
        <div
          className={
            clsx(
              classes.navbar,
              classes[config.navbar.position],
              folded && classes.folded,
              foldedAndOpened && classes.foldedAndOpened,
              foldedAndClosed && classes.foldedAndClosed
            )
          }
          onMouseEnter={() => foldedAndClosed && dispatch(Actions.navbarOpenFolded())}
          onMouseLeave={() => foldedAndOpened && dispatch(Actions.navbarCloseFolded())}
        >
          <NavbarLayout
            onToggled={onNavbarToggled}
            className={classes.navbarContent}
          />
        </div>
      </Hidden>

      <Hidden lgUp>
        <Drawer
          anchor={config.navbar.position}
          variant="temporary"
          open={navbar.mobileOpen}
          classes={{
            paper: classes.navbar
          }}
          onClose={() => dispatch(Actions.navbarCloseMobile())}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <NavbarLayout className={classes.navbarContent}/>
        </Drawer>
      </Hidden>
    </div>
  );
}

export default NavbarWrapper;

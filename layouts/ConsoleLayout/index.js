import React, {useContext} from 'react';
import {useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import { AppContext } from '../../contexts';
import {PropTypes} from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {ThemeProvider} from '@material-ui/core';

import { FuseScrollbars, FuseMessage, FuseDialog,
  FuseSuspense} from '@icatalyst/components/fuse';

import ToolbarLayout from '../components/ToolbarLayout';
import SidePanelLayout from '../components/SidePanelLayout';
import Footer from '../components/FooterLayouts/Footer';
import NavbarWrapperLayout from '../components/NavbarLayouts/NavbarWrapperLayout';
import SettingsPanelLayout from '../components/SettingsPanelLayout';
import { SessionPanel } from '@icatalyst/components';

const useStyles = makeStyles(theme => {
  return {
    root : {
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      backgroundColor   : theme.palette.background.default,
      color             : theme.palette.text.primary,
      '&.boxed'         : {
        maxWidth : theme.breakpoints.values.lg,
        margin   : '0 auto',
        boxShadow: theme.shadows[3]
      },
      '&.scroll-body'   : {
        '& $wrapper'       : {
          height  : 'auto',
          flex    : '0 0 auto',
          overflow: 'auto'
        },
        '& $contentWrapper': {},
        '& $content'       : {
        }
      },
      '&.scroll-content': {
        '& $wrapper'       : {},
        '& $contentWrapper': {},
        '& $content'       : {}
      },
      '& .navigation'   : {
        '& .list-subheader-text, & .list-item-text, & .item-badge, & .arrow-icon': {
          transition: theme.transitions.create('opacity', {
            duration: theme.transitions.duration.shortest,
            easing  : theme.transitions.easing.easeInOut
          })
        },
      }
    },
    wrapper : {
      display: 'flex',
      position: 'relative',
      width: '100%',
      height: '100%',
      flex : '1 1 auto',
      overflow: 'hidden'
    },
    contentWrapper : {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      zIndex : 3,
      overflow: 'hidden',
      flex : '1 1 auto'
    },
    content : {
      position: 'relative',
      display: 'flex',
      overflow: 'auto',
      flex: '1 1 auto',
      flexDirection: 'column',
      width: '100%',
      '-webkit-overflow-scrolling': 'touch',
      zIndex : 2,
    }
  };
});

function ContentWrapper({children, config, className}) {
  const {scroll} = config;
  return scroll === 'body' ? (
    <div className={className}>
      {children}
    </div>
  ) : children;
}
ContentWrapper.propTypes = {
  className : PropTypes.string,
  config : PropTypes.object,
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

function ScrollWrapper({children, scrollType, config, className}) {
  const {scroll} = config;
  const themes = useSelector(({app}) => app.settings.current.themes);

  return scroll === scrollType ? (
    <>
      {
        config.toolbar.display &&
          config.toolbar.style === 'fixed' &&
          (
            (scroll === 'body' && config.toolbar.position === 'outside') ||
            (scroll !== 'body' && config.toolbar.position === 'inside')
          ) && (
          <ThemeProvider theme={themes.navbarTheme}>
            <ToolbarLayout />
          </ThemeProvider>
        )
      }
      <FuseScrollbars className={className} scrollToTopOnRouteChange>
        {
          config.toolbar.display &&
            config.toolbar.style !== 'fixed' &&
            (
              (scroll === 'body' && config.toolbar.position === 'outside') ||
              (scroll !== 'body' && config.toolbar.position === 'inside')
            ) && (
            <ThemeProvider theme={themes.navbarTheme}>
              <ToolbarLayout />
            </ThemeProvider>
          )
        }
        {children}
        {
          config.footer.display &&
            config.footer.style !== 'fixed' &&
            (
              (scroll === 'body' && config.footer.position === 'outside') ||
              (scroll !== 'body' && config.footer.position === 'inside')
            ) && (
            <ThemeProvider theme={themes.footerTheme}>
              <Footer />
            </ThemeProvider>
          )
        }
      </FuseScrollbars>
      {
        config.footer.display &&
          config.footer.style === 'fixed' &&
          (
            (scroll === 'body' && config.footer.position === 'outside') ||
            (scroll !== 'body' && config.footer.position === 'inside')
          ) && (
          <ThemeProvider theme={themes.footerTheme}>
            <Footer />
          </ThemeProvider>
        )
      }
    </>
  ) : children;
}
ScrollWrapper.propTypes = {
  scrollType : PropTypes.oneOf(['content', 'body']),
  config : PropTypes.object,
  className : PropTypes.string,
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

function Layout(props) {

  const classes = useStyles(props);
  const appContext = useContext(AppContext);
  const { routes } = appContext;

  const config = useSelector(({app}) => app.settings.current.layout);
  const themes = useSelector(({app}) => app.settings.current.themes);

  const {
    scroll
  } = config;

  return (
    <div id="fuse-layout" className={clsx(classes.root, config.className, config.mode, `scroll-${scroll}`)}>
      {config.leftSidePanel.display && <SidePanelLayout />}
      <div className="flex flex-1 flex-col overflow-hidden relative h-full">
        {scroll === 'content' && config.toolbar.display && config.toolbar.position === 'outside' && (
          <ThemeProvider theme={themes.toolbarTheme}>
            <ToolbarLayout />
          </ThemeProvider>
        )}
        <ScrollWrapper className="overflow-auto" scrollType="body" config={config}>
          <div className={classes.wrapper}>
            {
              config.navbar.display && config.navbar.position === 'left' &&
              <ThemeProvider theme={themes.navbarTheme}>
                <NavbarWrapperLayout />
              </ThemeProvider>
            }

            <div className={classes.contentWrapper}>
              {scroll === 'body' && config.toolbar.display && config.toolbar.position === 'inside' && (
                <ThemeProvider theme={themes.toolbarTheme}>
                  <ToolbarLayout />
                </ThemeProvider>
              )}
              <ScrollWrapper className={classes.content} scrollType="content" config={config}>
                <ContentWrapper config={config}>
                  <FuseDialog />
                  <FuseSuspense>{renderRoutes(routes)}</FuseSuspense>
                  {props.children}
                </ContentWrapper>
              </ScrollWrapper>
              {scroll === 'body' && config.footer.display && config.footer.position === 'inside' && (
                <ThemeProvider theme={themes.footerTheme}>
                  <Footer />
                </ThemeProvider>
              )}
              { config.themeSettingsPanel.display && (
                <ThemeProvider theme={themes.panelTheme}>
                  <SettingsPanelLayout />
                </ThemeProvider>
              ) }
              {
                config.userSettingsPanel.display && (
                  <ThemeProvider theme={themes.panelTheme}>
                    <SessionPanel />
                  </ThemeProvider>
                )
              }
            </div>

            {
              config.navbar.display && config.navbar.position === 'right' &&
              <ThemeProvider theme={themes.navbarTheme}>
                <NavbarWrapperLayout />
              </ThemeProvider>
            }

          </div>
        </ScrollWrapper>
        {scroll === 'content' && config.footer.display && config.footer.position === 'outside' && (
          <ThemeProvider theme={themes.footerTheme}>
            <Footer />
          </ThemeProvider>
        )}
      </div>

      {config.rightSidePanel.display && <SidePanelLayout />}

      <FuseMessage />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.array
};


export default React.memo(withRouter(Layout));


export const layoutDefaults = {
  style: 'consoleLayout',
  component : Layout,
  customScrollbars : true,
  theme           : {
    main      : 'defaultThemeDark',
    navbar    : 'defaultThemeLight',
    toolbar   : 'defaultThemeLight',
    footer    : 'defaultThemeLight',
    panel     : 'defaultThemeLight',
  },
  mode: 'fullwidth', // 'fullwidth', 'boxed'
  scroll : 'content', // 'body', 'content',
  clientName : 'Not Set',
  clientLogo : 'Not Set',
  companyName : 'Not Set',
  companyLogo : 'Not Set',
  companyUrl : 'Not Set',

  leftSidePanel : {
    display : false
  },
  rightSidePanel : {
    display : true
  },
  toolbar : {
    display : true,
    style : 'fixed', // 'fixed',
    position: 'inside', // 'inside', 'outside',
  },
  navbar : {
    display : true,
    position : 'left',  // 'left', 'right'
    width: 280,
    foldedWidth: 64
  },
  footer : {
    display : true,
    style : 'fixed', // 'fixed',
    position: 'inside', // 'inside', 'outside'
  },
  userSettingsPanel : {
    display : false
  },
  themeSettingsPanel : {
    display : false
  },
  shortcuts : {
    display : false
  },
  pages : {
    defaults : {
      mode : 'cardedInside',
    },
    // Override individual page styles here using the configKey defined for each page
  },
  // Entity View definition for generating edit layout
  definition : {
    mode: {
      title: 'Mode',
      type: 'radio',
      options: [
        {
          name: 'Boxed',
          value: 'boxed'
        },
        {
          name: 'Full Width',
          value: 'fullwidth'
        }
      ]
    }
  }
};

import Layout from './index';

export const layoutDefaults = {
  style: 'consoleLayout',
  component : ()=>Layout,
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

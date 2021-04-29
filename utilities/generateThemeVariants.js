import {createMuiTheme} from '@material-ui/core/styles';
import _ from 'lodash';

export function generateThemeVariants(name, theme, defaults = {}){
  return {
    [name] :
      createMuiTheme(_.merge({}, defaultThemeOptions, theme, {...requiredThemeOptions}, defaults, {mixins: extendThemeWithMixins(theme)})),
    [name + 'Dark'] :
      createMuiTheme(_.merge({}, defaultThemeOptions, theme, {palette: {type: 'dark'}, ...requiredThemeOptions}, defaults, {mixins: extendThemeWithMixins(theme)})),
    [name + 'Light'] :
      createMuiTheme(_.merge({}, defaultThemeOptions, theme, {palette: {type: 'light'}, ...requiredThemeOptions}, defaults, {mixins: extendThemeWithMixins(theme)}))
  };
}


export function extendThemeWithMixins(obj)
{
  const theme = createMuiTheme(obj);
  return {
    border      : (width = 1) => ({
      borderWidth: width,
      borderStyle: 'solid',
      borderColor: theme.palette.divider
    }),
    borderLeft  : (width = 1) => ({
      borderLeftWidth: width,
      borderStyle    : 'solid',
      borderColor    : theme.palette.divider
    }),
    borderRight : (width = 1) => ({
      borderRightWidth: width,
      borderStyle     : 'solid',
      borderColor     : theme.palette.divider
    }),
    borderTop   : (width = 1) => ({
      borderTopWidth: width,
      borderStyle   : 'solid',
      borderColor   : theme.palette.divider
    }),
    borderBottom: (width = 1) => ({
      borderBottomWidth: width,
      borderStyle      : 'solid',
      borderColor      : theme.palette.divider
    })
  };
}

/**
 * THEME DEFAULTS
 */
export const defaultThemeOptions = {
  typography: {
    fontFamily                 : [
      'Muli',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif'
    ].join(','),
    fontWeightLight            : 300,
    fontWeightRegular          : 400,
    fontWeightMedium           : 600,
    useNextVariants            : true,
    suppressDeprecationWarnings: false
  }
};

export const requiredThemeOptions = {
  typography: {
    htmlFontSize: 10,
    body1       : {
      fontSize: '1.4rem',
    },
    body2       : {
      fontSize: '1.4rem',
    }
  }
};

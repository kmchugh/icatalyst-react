import {createTheme} from '@material-ui/core/styles';
import {tinycolor, /*mostReadable*/} from '@ctrl/tinycolor';
import _ from 'lodash';

export function generateThemeVariants(name, theme, defaults = {}, tint=0){
  return {
    [name] :
      createTheme(_.merge({}, defaultThemeOptions, theme, {...requiredThemeOptions}, {
        ...defaults,
        palette : {
          background : {
            paper : new tinycolor('#ffffff').mix(theme.palette.secondary.light, tint).toHex8String(),
            default : new tinycolor('#fafafa').mix(theme.palette.secondary.light, tint).toHex8String(),
          },
          grey : {
            '50': new tinycolor('#fafafa').mix(theme.palette.secondary.light, tint).toHex8String(),
            '100': new tinycolor('#f5f5f5').mix(theme.palette.secondary.light, tint).toHex8String(),
            '200': new tinycolor('#eeeeee').mix(theme.palette.secondary.light, tint).toHex8String(),
            '300': new tinycolor('#e0e0e0').mix(theme.palette.secondary.light, tint).toHex8String(),
            '400': new tinycolor('#bdbdbd').mix(theme.palette.secondary.light, tint).toHex8String(),
            '500': new tinycolor('#9e9e9e').mix(theme.palette.secondary.light, tint).toHex8String(),
            '600': new tinycolor('#757575').mix(theme.palette.secondary.light, tint).toHex8String(),
            '700': new tinycolor('#616161').mix(theme.palette.secondary.light, tint).toHex8String(),
            '800': new tinycolor('#424242').mix(theme.palette.secondary.light, tint).toHex8String(),
            '900': new tinycolor('#212121').mix(theme.palette.secondary.light, tint).toHex8String(),
            'A100': new tinycolor('#d5d5d5').mix(theme.palette.secondary.light, tint).toHex8String(),
            'A200': new tinycolor('#aaaaaa').mix(theme.palette.secondary.light, tint).toHex8String(),
            'A400': new tinycolor('#303030').mix(theme.palette.secondary.light, tint).toHex8String(),
            'A700': new tinycolor('#616161').mix(theme.palette.secondary.light, tint).toHex8String()
          }
        }
      }, {mixins: extendThemeWithMixins(theme)})),
    [name + 'Dark'] :
      createTheme(_.merge({}, defaultThemeOptions, theme, {palette: {type: 'dark'}, ...requiredThemeOptions}, {
        ...defaults,
        palette : {
          background : {
            paper : new tinycolor('#424242').mix(theme.palette.secondary.dark, tint).toHex8String(),
            default : new tinycolor('#303030').mix(theme.palette.secondary.dark, tint).toHex8String(),
          },
          grey : {
            '50': new tinycolor('#fafafa').mix(theme.palette.secondary.dark, tint).toHex8String(),
            '100': new tinycolor('#f5f5f5').mix(theme.palette.secondary.dark, tint).toHex8String(),
            '200': new tinycolor('#eeeeee').mix(theme.palette.secondary.dark, tint).toHex8String(),
            '300': new tinycolor('#e0e0e0').mix(theme.palette.secondary.dark, tint).toHex8String(),
            '400': new tinycolor('#bdbdbd').mix(theme.palette.secondary.dark, tint).toHex8String(),
            '500': new tinycolor('#9e9e9e').mix(theme.palette.secondary.dark, tint).toHex8String(),
            '600': new tinycolor('#757575').mix(theme.palette.secondary.dark, tint).toHex8String(),
            '700': new tinycolor('#616161').mix(theme.palette.secondary.dark, tint).toHex8String(),
            '800': new tinycolor('#424242').mix(theme.palette.secondary.dark, tint).toHex8String(),
            '900': new tinycolor('#212121').mix(theme.palette.secondary.dark, tint).toHex8String(),
            'A100': new tinycolor('#d5d5d5').mix(theme.palette.secondary.dark, tint).toHex8String(),
            'A200': new tinycolor('#aaaaaa').mix(theme.palette.secondary.dark, tint).toHex8String(),
            'A400': new tinycolor('#303030').mix(theme.palette.secondary.dark, tint).toHex8String(),
            'A700': new tinycolor('#616161').mix(theme.palette.secondary.dark, tint).toHex8String()
          }
        }
      }, {mixins: extendThemeWithMixins(theme)})),
    [name + 'Light'] :
      createTheme(_.merge({}, defaultThemeOptions, theme, {palette: {type: 'light'}, ...requiredThemeOptions}, {
        ...defaults,
        palette : {
          background : {
            paper : new tinycolor('#ffffff').mix(theme.palette.secondary.light, tint).toHex8String(),
            default : new tinycolor('#fafafa').mix(theme.palette.secondary.light, tint).toHex8String(),
          },
          grey : {
            '50': new tinycolor('#fafafa').mix(theme.palette.secondary.light, tint).toHex8String(),
            '100': new tinycolor('#f5f5f5').mix(theme.palette.secondary.light, tint).toHex8String(),
            '200': new tinycolor('#eeeeee').mix(theme.palette.secondary.light, tint).toHex8String(),
            '300': new tinycolor('#e0e0e0').mix(theme.palette.secondary.light, tint).toHex8String(),
            '400': new tinycolor('#bdbdbd').mix(theme.palette.secondary.light, tint).toHex8String(),
            '500': new tinycolor('#9e9e9e').mix(theme.palette.secondary.light, tint).toHex8String(),
            '600': new tinycolor('#757575').mix(theme.palette.secondary.light, tint).toHex8String(),
            '700': new tinycolor('#616161').mix(theme.palette.secondary.light, tint).toHex8String(),
            '800': new tinycolor('#424242').mix(theme.palette.secondary.light, tint).toHex8String(),
            '900': new tinycolor('#212121').mix(theme.palette.secondary.light, tint).toHex8String(),
            'A100': new tinycolor('#d5d5d5').mix(theme.palette.secondary.light, tint).toHex8String(),
            'A200': new tinycolor('#aaaaaa').mix(theme.palette.secondary.light, tint).toHex8String(),
            'A400': new tinycolor('#303030').mix(theme.palette.secondary.light, tint).toHex8String(),
            'A700': new tinycolor('#616161').mix(theme.palette.secondary.light, tint).toHex8String()
          }
        }
      }, {mixins: extendThemeWithMixins(theme)}))
  };
}


export function extendThemeWithMixins(obj)
{
  const theme = createTheme(obj);
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

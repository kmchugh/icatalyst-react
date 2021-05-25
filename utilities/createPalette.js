import {tinycolor, mostReadable} from '@ctrl/tinycolor';

/**
 * Extracts a usable palette from a single colour
 * @method createColor
 * @param  {String}    color the colour to base the palette on, can be any
 *                           value supported by tinycolor
 * @return {[object]}        a full range of colours to select from
 *
 * The following is generated from the input #c82737
 * ```
 * {
      "main": "#c82737",
      "light": "#e88b94",
      "dark": "#951d29",
      "compliment": "#27c8b8",
      "contrastText": "#ffffff",
      "variants": {
        "50": "#fefafb",
        "100": "#f2bac0",
        "200": "#e88b94",
        "300": "#dd4f5d",
        "400": "#d83646",
        "500": "#c82737",
        "600": "#ae2230",
        "700": "#951d29",
        "800": "#7b1822",
        "900": "#62131b",
        "A100": "#ffeff1",
        "A200": "#fd8b96",
        "A400": "#ec3648",
        "A700": "#dd2b3d"
      }
    }
 * ```
 */
export function createColor(color){
  const tc = new tinycolor(color);
  const variants = {
    '50' : tc.clone().lighten(52).toHexString(),
    '100' : tc.clone().lighten(37).toHexString(),
    '200' : tc.clone().lighten(26).toHexString(),
    '300' : tc.clone().lighten(12).toHexString(),
    '400' : tc.clone().lighten(6).toHexString(),
    '500' : tc.toHexString(),
    '600' : tc.clone().darken(6).toHexString(),
    '700' : tc.clone().darken(12).toHexString(),
    '800' : tc.clone().darken(18).toHexString(),
    '900' : tc.clone().darken(24).toHexString(),
    'A100' : tc.clone().lighten(50).saturate(30).toHexString(),
    'A200' : tc.clone().lighten(30).saturate(30).toHexString(),
    'A400' : tc.clone().lighten(10).saturate(15).toHexString(),
    'A700' : tc.clone().lighten(5).saturate(5).toHexString(),
  };

  return {
    main : variants['500'],
    light : variants['200'],
    dark : variants['700'],
    compliment : tc.clone().mix(tc.clone().spin(180), 80).toHexString(),
    contrastText : mostReadable(tc, ['#fff', '#000'], {}).toHexString(),
    variants
  };
}

/**
 * Creates a full palette of colours from a primary and secondary pair
 * @method createPalette
 * @param  {String}      primary            The primary colour
 * @param  {String}      secondary          The secondary colour
 * @param  {String}      [warning='orange'] The colour to tint with primary to create a warning colour
 * @param  {String}      [error='red']      The colour to tint with primary to create a error colour
 * @param  {String}      [success='green']  The colour to tint with primary to create a success colour
 * @param  {String}      [info='blue']      The colour to tint with primary to create a info colour
 * @param  {Number}      [tint=75}]         The amount to tint when blending colours (0-100)
 * @return {Object}                         The palette of colours
 *
 * The following is generated from a primary colour of #239ddb and secondary of #52596c
 *
 * ```
 *
 * {
    "primary": {
      "main": "#239ddb",
      "light": "#95d0ee",
      "dark": "#1b77a6",
      "compliment": "#db6123",
      "contrastText": "#000000",
      "variants": {
        "50": "#ffffff",
        "100": "#c5e5f6",
        "200": "#95d0ee",
        "300": "#57b5e4",
        "400": "#3da9e0",
        "500": "#239ddb",
        "600": "#1f8ac1",
        "700": "#1b77a6",
        "800": "#16648c",
        "900": "#125171",
        "A100": "#feffff",
        "A200": "#98dcff",
        "A400": "#3fb6f2",
        "A700": "#32a9e5"
      }
    },
    "secondary": {
      "main": "#191b21",
      "light": "#52596c",
      "dark": "#000000",
      "compliment": "#211f19",
      "contrastText": "#ffffff",
      "variants": {
        "50": "#959bae",
        "100": "#6a738c",
        "200": "#52596c",
        "300": "#333744",
        "400": "#262932",
        "500": "#191b21",
        "600": "#0c0d10",
        "700": "#000000",
        "800": "#000000",
        "900": "#000000",
        "A100": "#7187c8",
        "A200": "#3b5298",
        "A400": "#272f46",
        "A700": "#222632"
      }
    },
    "warning": {
      "main": "#c8a337",
      "light": "#e5d39f",
      "dark": "#987c2a",
      "compliment": "#375cc8",
      "contrastText": "#000000",
      "variants": {
        "50": "#ffffff",
        "100": "#f1e7cb",
        "200": "#e5d39f",
        "300": "#d5b967",
        "400": "#cfae4f",
        "500": "#c8a337",
        "600": "#b08f30",
        "700": "#987c2a",
        "800": "#806823",
        "900": "#68551d",
        "A100": "#ffffff",
        "A200": "#f8e2a0",
        "A400": "#e2bd50",
        "A700": "#d3af45"
      }
    },
    "error": {
      "main": "#c82737",
      "light": "#e88b94",
      "dark": "#951d29",
      "compliment": "#27c8b8",
      "contrastText": "#ffffff",
      "variants": {
        "50": "#fefafb",
        "100": "#f2bac0",
        "200": "#e88b94",
        "300": "#dd4f5d",
        "400": "#d83646",
        "500": "#c82737",
        "600": "#ae2230",
        "700": "#951d29",
        "800": "#7b1822",
        "900": "#62131b",
        "A100": "#ffeff1",
        "A200": "#fd8b96",
        "A400": "#ec3648",
        "A700": "#dd2b3d"
      }
    },
    "success": {
      "main": "#098737",
      "light": "#24f06f",
      "dark": "#054e20",
      "compliment": "#870959",
      "contrastText": "#ffffff",
      "variants": {
        "50": "#a0f9c1",
        "100": "#59f491",
        "200": "#24f06f",
        "300": "#0dc04e",
        "400": "#0ba443",
        "500": "#098737",
        "600": "#076a2b",
        "700": "#054e20",
        "800": "#033114",
        "900": "#011408",
        "A100": "#90ffb9",
        "A200": "#2aff78",
        "A400": "#00c347",
        "A700": "#06a340"
      }
    },
    "info": {
      "main": "#0927f6",
      "light": "#8997fb",
      "dark": "#071ebb",
      "compliment": "#f6d809",
      "contrastText": "#ffffff",
      "variants": {
        "50": "#ffffff",
        "100": "#bfc7fd",
        "200": "#8997fb",
        "300": "#445bf8",
        "400": "#2741f7",
        "500": "#0927f6",
        "600": "#0822d8",
        "700": "#071ebb",
        "800": "#06199d",
        "900": "#051480",
        "A100": "#ffffff",
        "A200": "#99a6ff",
        "A400": "#334dff",
        "A700": "#1c38fd"
      }
    }
  }
 *
 * ```
 */
export function createPalette({
  primary,
  secondary,
  warning = 'orange',
  error = 'red',
  success = 'green',
  info = 'blue',
  tint = 75
}){

  return {
    primary  : createColor(primary),
    secondary  : createColor(secondary),
    warning   : createColor(new tinycolor(primary).mix(warning, tint).toHexString()),
    error    : createColor(new tinycolor(primary).mix(error, tint).toHexString()),
    success  : createColor(new tinycolor(primary).mix(success, tint).toHexString()),
    info  : createColor(new tinycolor(primary).mix(info, tint).toHexString()),
  };
}

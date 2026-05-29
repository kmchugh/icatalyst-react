import { createTheme } from '@mui/material/styles';
import { createColor } from '@icatalyst/utilities/createPalette';

const PALETTE_COLOR_KEYS = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];

/** Org hex → MUI shades; keeps base `contrastText` so nav active labels still use org `main`. */
function mapOrgSemanticColor(hex) {
  const { main, dark, light } = createColor(hex);
  return { main, dark, light };
}

/**
 * Maps organisation entity-settings palette (hex strings) into MUI palette partials.
 * Each semantic colour updates main, dark, and light; contrastText stays from the
 * base app theme so components like nav active labels keep prior readability behaviour.
 *
 * @param {object} palette API `themes.*.palette`
 * @returns {object} MUI palette fragment suitable for createTheme(base, fragment)
 */
export function mapOrgApiPaletteToMui(palette) {
  if (!palette || typeof palette !== 'object') {
    return {};
  }
  const out = {};
  PALETTE_COLOR_KEYS.forEach((key)=>{
    const v = palette[key];
    if (typeof v === 'string' && v) {
      out[key] = mapOrgSemanticColor(v);
    }
  });
  if (palette.background && typeof palette.background === 'object') {
    const background = {};
    const { paper, default: bgDefault } = palette.background;
    if (typeof paper === 'string' && paper) {
      background.paper = paper;
    }
    if (typeof bgDefault === 'string' && bgDefault) {
      background.default = bgDefault;
    }
    if (Object.keys(background).length > 0) {
      out.background = background;
    }
  }
  return out;
}

/**
 * Builds a full MUI theme by merging organisation colours into the app base theme.
 * Uses `themes[baseTheme.palette.mode]` when present (falls back to light, then dark).
 *
 * @param {import('@mui/material/styles').Theme} baseTheme Parent theme from Redux-driven Theme
 * @param {object|null|undefined} orgDoc Normalised entity-settings document (single object)
 * @returns {import('@mui/material/styles').Theme|null}
 */
export function buildOrgThemeOverride(baseTheme, orgDoc) {
  if (!baseTheme || !orgDoc?.themes || typeof orgDoc.themes !== 'object') {
    return null;
  }
  const mode = baseTheme.palette.mode;
  const slot =
    orgDoc.themes[mode] ||
    orgDoc.themes.light ||
    orgDoc.themes.dark;
  if (!slot?.palette) {
    return null;
  }
  const paletteFragment = mapOrgApiPaletteToMui(slot.palette);
  if (Object.keys(paletteFragment).length === 0) {
    return null;
  }
  return createTheme(baseTheme, {
    palette : {
      ...paletteFragment,
      mode : baseTheme.palette.mode,
    },
  });
}

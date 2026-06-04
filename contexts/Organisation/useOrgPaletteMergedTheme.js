import { useMemo } from 'react';
import { buildOrgThemeOverride } from './buildOrgThemeOverride';
import { useOrganisation } from './OrganisationContext';

/**
 * Merges organisation entity-settings `themes` palette into a base MUI theme
 * (for example `navbarTheme` from Redux), so nested `ThemeProvider`s match org branding.
 *
 * @param {import('@mui/material/styles').Theme} baseTheme Theme from settings (navbar, toolbar, …)
 * @returns {import('@mui/material/styles').Theme}
 */
export function useOrgPaletteMergedTheme(baseTheme) {
  const { entitySettings } = useOrganisation();

  return useMemo(()=>{
    const merged = buildOrgThemeOverride(baseTheme, entitySettings);
    return merged ?? baseTheme;
  }, [baseTheme, entitySettings]);
}

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { buildOrgThemeOverride } from './buildOrgThemeOverride';
import { useOrganisation } from './OrganisationContext';

/**
 * Nested MUI theme layer: merges organisation entity-settings `themes.light` / `themes.dark`
 * palette into the app theme (matches current palette.mode).
 */
export function OrganisationMuiTheme({ children }) {
  const baseTheme = useTheme();
  const { entitySettings } = useOrganisation();

  const orgTheme = useMemo(()=>{
    return buildOrgThemeOverride(baseTheme, entitySettings);
  }, [baseTheme, entitySettings]);

  if (!orgTheme) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider theme={orgTheme}>
      {children}
    </ThemeProvider>
  );
}

OrganisationMuiTheme.propTypes = {
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default OrganisationMuiTheme;

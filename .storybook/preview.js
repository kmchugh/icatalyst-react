import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import staticInit from '../packages/components/src/static-init';
import { createColorPalette } from '../packages/core/src/styling/colors';
staticInit();

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
// TODO: Look at using this for theme generation
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  theme: {
    primary: '#239ddb',
    secondary: '#191b21',
  }
}

export const decorators = [
  (Story, options) => {
    const { theme } = options.parameters;

    const palette = createColorPalette({
      primary: theme.primary,
      secondary: theme.secondary,
    });

    const themeBase = createTheme({
      palette: palette,
    });

    return (
      <ThemeProvider theme={themeBase}>
        <Story />
      </ThemeProvider>
    );
  }
];
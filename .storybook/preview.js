import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import staticInit from '../packages/components/src/static-init';

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
}

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  )
];
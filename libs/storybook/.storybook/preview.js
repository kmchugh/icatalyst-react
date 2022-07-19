import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
// import { staticInit } from '@icatalyst/react/components';
// import { createColorPalette } from '../packages/core/src/styling/colors';
import { configureStore, createSlice } from '@reduxjs/toolkit';

// staticInit();

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

const icatalystSlice = createSlice({
    name: 'icatalyst',
    initialState: {
        settings: {
            current: {
                layout: {
                    navbar: {
                        folded: false
                    }
                }
            }
        }
    },
    reducers: {}
});

// TODO: Update the createStore to use slices
const store = configureStore({
    reducer: {
        icatalyst: icatalystSlice.reducer
    },
});


export const decorators = [
    (Story, options) => {
        const { theme } = options.parameters;

        // const palette = createColorPalette({
        //     primary: theme.primary,
        //     secondary: theme.secondary,
        // });

        // const themeBase = createTheme({
        //     palette: palette,
        // });

        const themeBase = createTheme({});

        return (
            <Provider store={store}>
                <ThemeProvider theme={themeBase}>
                    <Story />
                </ThemeProvider>
            </Provider>
        );
    }
];
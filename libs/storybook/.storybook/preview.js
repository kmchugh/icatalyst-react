import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
// import { staticInit } from '@icatalyst/react/components';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { createColorPalette } from '@icatalyst/react/core';
import { Paper } from '@mui/material';

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
    },
    storyPadding : '16px'
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

        const palette = createColorPalette({
            primary: theme.primary,
            secondary: theme.secondary,
        });

        const themeBase = createTheme({
            palette: palette,
        });

        return (
            <Provider store={store}>
                <ThemeProvider theme={themeBase}>
                    <div style={{
                        display: 'flex',
                        flexDirection : 'column',
                        flexGrow: 1,
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '16px',
                        background : '#a3a3a3'
                    }}>
                        <Paper sx={{
                            padding: options.parameters.storyPadding,
                            overflow: 'hidden'
                        }}>
                            <Story />
                        </Paper>
                    </div>
                </ThemeProvider>
            </Provider>
        );
    }
];
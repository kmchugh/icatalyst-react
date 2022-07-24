import { createApp, createStore } from '@icatalyst/react/components';
import { createColorPalette } from '@icatalyst/react/core';
import { Paper } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { StoryBookLayout } from '../src/lib/StoryBookLayout';

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
    storyPadding : '16px',
    fullSize : false
}

const App = createApp({
    store: createStore({}),
    layouts : [{
        name : 'storybook',
        component : StoryBookLayout,
    }]
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
            <App>
                <Paper sx={{
                    padding: options.parameters.storyPadding,
                    overflow: 'hidden',
                    width : options.parameters.fullSize ? '100%' : undefined,
                    height : options.parameters.fullSize ? '100%' : undefined
                }}>
                    <Story />
                </Paper>
            </App>
        );
    }
];

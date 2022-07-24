import { createApp, createStore } from '@icatalyst/react/components';
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
    }],
    themes: [{
        primary: '#239ddb',
        secondary: '#191b21',
    }]
});

export const decorators = [
    (Story) => {
        return (
            <App>
                
                    <Story />
                
            </App>
        );
    }
];

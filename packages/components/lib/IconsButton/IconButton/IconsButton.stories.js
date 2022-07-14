import React from 'react';
import { IconButton } from '.';
const meta = {
    title: 'Buttons/IconButton',
    component: IconButton,
    argTypes: {
        children: {
            control: {
                type: 'text',
            },
        },
    },
    parameters: {
        controls: { expanded: true },
    },
};
export default meta;
const Template = args => React.createElement(IconButton, { ...args });
// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});
Default.args = {};

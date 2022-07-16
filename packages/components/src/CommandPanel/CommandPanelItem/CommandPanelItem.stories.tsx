import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CommandPanelItem,CommandPanelItemprops } from '.';

const meta: Meta = {
    // title: 'Clearableinputs/Clearableinput',
    component: CommandPanelItem,
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

const Template: Story<CommandPanelItemprops> = args => <CommandPanelItem {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});
Default.args = {};



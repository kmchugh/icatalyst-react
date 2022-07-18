import { Meta, Story } from '@storybook/react';
import { CommandPanel as Component, CommandPanelProps } from './CommandPanel';

const meta: Meta = {
    component: Component,
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

const Template: Story<CommandPanelProps> = args => <Component {...args} />;

export const CommandPanel = Template.bind({});
CommandPanel.args = {};

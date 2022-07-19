import { Meta, Story } from '@storybook/react';
import { Icon as Component, IconProps } from './Icon';

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

const Template: Story<IconProps> = args => <Component {...args} />;

export const Icon = Template.bind({});
Icon.args = {};

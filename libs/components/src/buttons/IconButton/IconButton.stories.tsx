import { Meta, Story } from '@storybook/react';
import { IconButton as Component, IconButtonProps } from './IconButton';


const meta: Meta = {
    component: Component,
    argTypes: {
    },
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story<IconButtonProps> = args => <Component {...args} />;

export const IconButton = Template.bind({});
IconButton.args = {};

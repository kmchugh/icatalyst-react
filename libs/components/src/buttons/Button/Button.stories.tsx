import { Meta, Story } from '@storybook/react';
import { Button as Component, ButtonProps } from './Button';


const meta: Meta = {
    component: Component,
    argTypes: {
    },
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story<ButtonProps> = args => <Component {...args} />;

export const Button = Template.bind({});
Button.args = {
    children: 'A Button'
};

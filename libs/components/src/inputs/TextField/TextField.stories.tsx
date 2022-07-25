import { Meta, Story } from '@storybook/react';
import { TextField as Component, TextFieldProps } from './TextField';

const meta: Meta = {
    component: Component,
    argTypes: {
    },
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story<TextFieldProps> = args => <Component {...args} />;

export const TextField = Template.bind({});
TextField.args = {};

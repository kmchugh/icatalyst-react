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

export const ClearableTextField = Template.bind({});
ClearableTextField.args = {
    clearable: true
};

export const SearchField = Template.bind({});
SearchField.args = {
    clearable: true,
    icon: 'search',
    iconColor: 'primary'
};

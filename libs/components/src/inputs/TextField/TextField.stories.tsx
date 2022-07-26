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
TextField.args = {
    label: 'A Label',
    placeholder: 'Input some text'
};

export const ClearableTextField = Template.bind({});
ClearableTextField.args = {
    label: 'A Label',
    placeholder: 'Input some text',
    clearable: true
};

export const IconTextField = Template.bind({});
IconTextField.args = {
    label: 'A Label',
    placeholder: 'Search for something...',
    clearable: true,
    icon: 'search',
    iconColor: 'primary'
};

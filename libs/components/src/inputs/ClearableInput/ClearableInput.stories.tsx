import { Meta, Story } from '@storybook/react';
import { ClearableInput as Component, ClearableInputProps } from './ClearableInput';


const meta: Meta = {
    component: Component,
    argTypes: {
    },
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story<ClearableInputProps> = args => <Component {...args} />;

export const ClearableInput = Template.bind({});
ClearableInput.args = {};

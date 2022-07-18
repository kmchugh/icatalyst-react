import { Meta, Story } from '@storybook/react';
import { ColorPicker as Component, ColorPickerProps } from './ColorPicker';

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

const Template: Story<ColorPickerProps> = args => <Component {...args} />;

export const ColorPicker = Template.bind({});
ColorPicker.args = {};

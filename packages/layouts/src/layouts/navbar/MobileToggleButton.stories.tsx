import React from 'react';
import { Meta, Story } from '@storybook/react';
import { MobileToggleButton, MobileToggleButtonProps } from './MobileToggleButton';
import { Typography } from '@mui/material';

const meta: Meta = {
    component: MobileToggleButton,
    argTypes: {
        children: {
            control: {
                type: '',
            },
        },
    },
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story<MobileToggleButtonProps> = args => (
    <MobileToggleButton {...args}>
        <Typography>CONTENT</Typography>
    </MobileToggleButton>
);

export const Default = Template.bind({});
Default.args = {
};

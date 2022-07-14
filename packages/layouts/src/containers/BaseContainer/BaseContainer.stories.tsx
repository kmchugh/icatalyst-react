import React from 'react';
import { Meta, Story } from '@storybook/react';
import { BaseContainer, BaseContainerProps } from './';
import { Typography } from '@mui/material';

const meta: Meta = {
    title: 'Containers/BaseContainer',
    component: BaseContainer,
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

const Template: Story<BaseContainerProps> = args => (
    <BaseContainer {...args}>
        <Typography>CONTENT</Typography>
    </BaseContainer>
);

export const Default = Template.bind({});
Default.args = {
};

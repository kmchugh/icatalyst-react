import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CoverImageContainer, CoverImageContainerProps } from '.';
import { Typography } from '@mui/material';

const meta: Meta = {
    component: CoverImageContainer,
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

const Template: Story<CoverImageContainerProps> = args => (
    <CoverImageContainer {...args}>
        <Typography color="white">CONTENT</Typography>
    </CoverImageContainer>
);

export const Default = Template.bind({});
Default.args = {
    image: 'assets/images/backgrounds/steampunk.jpg',
};

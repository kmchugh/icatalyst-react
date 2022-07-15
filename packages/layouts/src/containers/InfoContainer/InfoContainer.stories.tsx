import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Typography } from '@mui/material';
import { InfoContainer, InfoContainerProps } from './';

const meta: Meta = {
    // title: 'Containers/CoverImageContainer',
    component: InfoContainer,
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

const Template: Story<InfoContainerProps> = args => (
    <InfoContainer {...args}>
        <Typography color="white">CONTENT</Typography>
    </InfoContainer>
);

export const Default = Template.bind({});
Default.args = {
    image: 'assets/images/backgrounds/steampunk.jpg',
};

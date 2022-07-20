import { Typography } from '@mui/material';
import { Meta, Story } from '@storybook/react';
import { Container as Component, ContainerProps } from './Container';

const meta: Meta = {
    component: Component,
    argTypes: {
    },
    parameters: {
        controls: { expanded: true },
        storyPadding: '0'
    },
};

export default meta;

const Template: Story<ContainerProps> = args => (
    <Component {...args}>
        <Typography>CONTENT</Typography>
    </Component>
);

export const Container = Template.bind({});
Container.args = {
    style: {
        minWidth: '80vw',
        minHeight: '70vh'
    },
    imageSrc: 'https://cdn.icatalyst.com/wp-content/uploads/sites/5/2014/02/27000520/gear-banner-1920x500.png'
};

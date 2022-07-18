import { Typography } from '@mui/material';
import { Meta, Story } from '@storybook/react';
import { Container as Component, ContainerProps } from './Container';


const meta: Meta = {
    component: Component,
    argTypes: {
    },
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story<ContainerProps> = args => (
    <Component {...args}>
        <Typography>CONTENT</Typography>
    </Component>
);

export const Container = Template.bind({});
Container.args = {};

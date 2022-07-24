import { Meta, Story } from '@storybook/react';
import { Loader as Component, LoaderProps } from './Loader';


const meta: Meta = {
    component: Component,
    argTypes: {
        backgroundColor: {
            control: {
                type: 'color',
            },
        },
    },
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story<LoaderProps> = args => <Component {...args} />;

export const Loader = Template.bind({});
Loader.args = {
    title: 'Loading...'
};

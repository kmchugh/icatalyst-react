import { Meta, Story } from '@storybook/react';
import { Error as Component, ErrorProps } from './Error';

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

const Template: Story<ErrorProps> = args => <Component {...args}/>;

export const Error = Template.bind({});
Error.args = {
    children : 'What\'s your major malfunction?'
};

import { Meta, Story } from '@storybook/react';
import { ErrorWrapper as Component, ErrorWrapperProps } from './ErrorWrapper';

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

const Template: Story<ErrorWrapperProps> = args => <Component {...args} />;

export const ErrorWrapper = Template.bind({});
ErrorWrapper.args = {
    title : 'Errors have occurred',
    errors : [{
        message : 'error 1'
    }, {
        message : 'critical error 1'
    }]
};

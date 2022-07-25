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
    title: 'Logical Error',
    errors: [{
        message: 'banks have branches but money doesn\'t grow on trees'
    }, {
        message: 'expecting the unexpected makes the unexpected expected'
    }, {
        message: 'if I try to fail, but I succeed, which one did I do?'
    }]
};

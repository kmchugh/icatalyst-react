import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../buttons';
import { ErrorBoundary as Component, ErrorBoundaryProps } from './ErrorBoundary';

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

const ErrorButton = () => {

    const [error, setError] = useState<Error | null>(null);

    if (error) {
        throw error;
    }

    return <Button
        icon="fa bomb"
        variant='contained'
        color="error"
        onClick={() => {
            setError(new Error('Basic instructions were not comprehended'));
        }}
    >
        Don't press the button
    </Button>
};


const Template: Story<ErrorBoundaryProps> = args => (
    <Component {...args}>
        <ErrorButton />
    </Component>
);

export const ErrorBoundary = Template.bind({});
ErrorBoundary.args = {};

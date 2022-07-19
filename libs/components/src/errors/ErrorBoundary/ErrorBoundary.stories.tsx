import { Button } from '@mui/material';
import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
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

const ErrorButton = ()=>{

    const [error, setError] = useState<Error | null>(null);

    if (error) {
        throw error;
    }

    return <Button
        variant='contained'
        onClick={()=>{
            setError(new Error('An error has occurred'));
        }}
    >
        Throw Error
    </Button>
};


const Template: Story<ErrorBoundaryProps> = args => (
    <Component {...args}>
        <ErrorButton/>
    </Component>
);

export const ErrorBoundary = Template.bind({});
ErrorBoundary.args = {};

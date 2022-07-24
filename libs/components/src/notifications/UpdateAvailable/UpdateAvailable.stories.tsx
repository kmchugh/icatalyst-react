import { Button } from '@mui/material';
import { Meta, Story } from '@storybook/react';
import { UpdateAvailable as Component, UpdateAvailableProps } from './UpdateAvailable';

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

const Template: Story<UpdateAvailableProps> = args => <div>
    <Component {...args} />
    <Button onClick={() => {
        window.dispatchEvent(new Event('updateAvailable'));
    }}>Mock Update</Button>
</div>;

export const UpdateAvailable = Template.bind({});
UpdateAvailable.args = {};

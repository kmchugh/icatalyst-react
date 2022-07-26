import { Typography } from '@mui/material';
import { Meta, Story } from '@storybook/react';
import { SplitButton as Component, SplitButtonProps } from './SplitButton';


const meta: Meta = {
    component: Component,
    argTypes: {
    },
    parameters: {
        controls: { expanded: true },
        clicks: []
    },
};

const clicks: string[] = [];

export default meta;

const Template: Story<SplitButtonProps> = args => {
    return (
        <>
            <Component {...args} />
            {
                clicks.map((text) => {
                    <Typography>{text}</Typography>
                })
            }
        </>
    );
};

export const SplitButton = Template.bind({});
SplitButton.args = {
    children: 'A Button',
    options: [{
        label: 'Stop',
        icon: 'stop',
        onClick: (e, option) => {
            console.log(option.label);
        }
    }, {
        label: 'Collaborate',
        icon: 'thumbs_up_down',
        onClick: (e, option) => {
            console.log(option.label);
        }
    }, {
        label: 'Listen',
        selectedLabel: 'Ice, ice baby',
        onClick: (e, option) => {
            console.log(option.label);
        }
    }]
};

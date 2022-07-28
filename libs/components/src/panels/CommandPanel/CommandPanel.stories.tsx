import { Meta, Story } from '@storybook/react';
import { Button } from '../../buttons';
import { CommandPanel as Component, CommandPanelProps } from './CommandPanel';

const meta: Meta = {
    component: Component,
    argTypes: {
    },
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story<CommandPanelProps> = args => (
    <Component
        primaryMenu={[[
            {
                icon: 'add',
                onClick: () => {
                    console.log('clicked');
                },
                title: 'add'
            },
            {
                icon: 'edit',
                onClick: () => {
                    console.log('clicked');
                },
                title: 'edit'
            },
            {
                icon: 'delete',
                onClick: () => {
                    console.log('clicked');
                },
                title: 'delete'
            }
        ], [{
            icon: 'format_align_left',
            onClick: () => {
                console.log('clicked');
            },
            title: 'left'
        },
        {
            icon: 'format_align_justify',
            onClick: () => {
                console.log('clicked');
            },
            title: 'center'
        },
        {
            icon: 'format_align_right',
            onClick: () => {
                console.log('clicked');
            },
            title: 'right'
        }]]}
        secondaryMenu={[[{
            icon: 'format_list_bulleted',
            onClick: () => {
                console.log('clicked');
            },
            title: 'tooltip'
        },
        {
            icon: 'format_list_numbered',
            onClick: () => {
                console.log('clicked');
            },
            title: 'tooltip'
        },
        {
            icon: 'format_list_numbered_rtl',
            onClick: () => {
                console.log('clicked');
            },
            title: 'tooltip'
        }], [{
            icon: 'volume_off',
            onClick: () => {
                console.log('clicked');
            },
            title: 'tooltip'
        },
        {
            icon: 'volume_down',
            onClick: () => {
                console.log('clicked');
            },
            title: 'tooltip'
        },
        {
            icon: 'volume_up',
            onClick: () => {
                console.log('clicked');
            },
            title: 'tooltip'
        }]]}
        {...args}
    />
);

export const CommandPanel = Template.bind({});
CommandPanel.args = {
};

export const PrimaryOnly = Template.bind({});
PrimaryOnly.args = {
    secondaryMenu: [],
    square: true,
    elevation: 0
};

export const SecondaryOnly = Template.bind({});
SecondaryOnly.args = {
    primaryMenu: [],
    square: true,
    elevation: 0
};

export const CustomItem = Template.bind({});
CustomItem.args = {
    primaryMenu: [
        [
            {
                icon: 'fa fab twitter',
                onClick: () => {
                    console.log('clicked');
                },
                title: 'tooltip'
            },
            <Button
                icon='fa fab facebook'
                color='secondary'
            >
                Custom Component
            </Button>
        ],
        [
            {
                icon: 'fa fab reddit',
                onClick: () => {
                    console.log('clicked');
                },
                title: 'tooltip'
            }
        ]
    ],
    square: true,
    elevation: 0
};


export const FunctionItem = Template.bind({});
FunctionItem.args = {
    primaryMenu: [
        [
            {
                icon: 'fa fab twitter',
                onClick: () => {
                    console.log('clicked');
                },
                title: 'tooltip'
            },
            ({ color = 'primary', size = 'medium' }: CommandPanelProps) => {
                // Button doesn't support disabled color
                color = color === 'disabled' ? 'action' : color;

                return (
                    <Button
                        icon='fa fab facebook'
                        color={color as any}
                        size={size as any}
                    >
                        Custom Component
                    </Button>
                );
            }
        ],
        [
            {
                icon: 'fa fab reddit',
                onClick: () => {
                    console.log('clicked');
                },
                title: 'tooltip'
            }
        ]
    ],
    square: true,
    elevation: 0
};
import { Meta, Story } from '@storybook/react';
import { useRef } from 'react';
import { Button } from '../../buttons';
import { DropdownMenu as Component, DropdownMenuProps } from './DropdownMenu';

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

const clickableRef: {
    current: any
} = {
    current: {}
};

const Template: Story<DropdownMenuProps> = args => {
    const componentRef = useRef<any>(null);
    clickableRef.current.onClick = () => {
        console.log('Button clicked');
        if (componentRef?.current?.closeMenu) {
            componentRef?.current?.closeMenu();
        }
    };
    return (
        <Component
            ref={componentRef} {...args}
        />
    )
};

export const DropdownMenu = Template.bind({});
DropdownMenu.args = {
    title: 'An Icon title',
    label: 'An Icon Label',
    menu: [{
        title: 'Menu Item 1',
        icon: 'abc'
    }, {
        title: 'Menu Item 2',
        icon: 'ac_unit',
        menu: [
            {
                title: 'Menu Item 2A',
                icon: 'access_alarm'
            }, {
                title: 'Menu Item 2B',
                icon: 'add_to_queue',
            }, {
                title: 'Menu Item 2C',
                icon: 'access_time'
            }, {
                title: 'How low can you go',
                icon: 'accessibility',
                menu: [
                    {
                        title: 'Menu Item 2A',
                        icon: 'account_tree'
                    }, {
                        title: 'Menu Item 2B',
                        icon: 'adb',
                    }, {
                        title: 'Menu Item 2C',
                        icon: 'add_a_photo'
                    }, (
                        <Button onClick={() => {
                            clickableRef.current.onClick && clickableRef.current.onClick()
                        }}>
                            A custom element
                        </Button>
                    )
                ]
            }
        ]
    }, (
        <Button onClick={() => {
            clickableRef.current.onClick && clickableRef.current.onClick()
        }}>
            A custom element
        </Button>
    ), {
        title: 'Menu Item 4',
        icon: 'add_card'
    }]
};

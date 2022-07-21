import { Meta, Story } from '@storybook/react';
import { PageHeader as Component, PageHeaderProps } from './PageHeader';


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

const Template: Story<PageHeaderProps> = args => <Component {...args} />;

export const PageHeader = Template.bind({});
PageHeader.args = {
    title: 'A page title',
    actions: [{
        icon: 'settings',
        title: 'An action',
        onClick: () => {
            console.log('clicked');
        }
    }, {
        icon: 'power_settings_new',
        title: 'An action',
        onClick: () => {
            console.log('clicked');
        }
    }]
};

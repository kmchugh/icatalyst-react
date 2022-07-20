import { Meta, Story } from '@storybook/react';
import { TitledPage as Component, TitledPageProps } from './TitledPage';


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
        storyPadding: '0'
    },
};

export default meta;

const Template: Story<TitledPageProps> = args => <Component {...args} />;

export const TitledPage = Template.bind({});
TitledPage.args = {
    title: 'A page with a very very very very very very very long header',
    style: {
        minWidth: '80vw',
        minHeight: '70vh'
    },
    children: 'child content',
    imageSrc: 'https://cdn.icatalyst.com/wp-content/uploads/sites/5/2014/02/27000520/gear-banner-1920x500.png',
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

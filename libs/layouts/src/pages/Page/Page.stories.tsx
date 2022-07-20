import { Meta, Story } from '@storybook/react';
import { Page as Component, PageProps } from './Page';


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

const Template: Story<PageProps> = args => <Component {...args} />;

export const Page = Template.bind({});
Page.args = {
    style: {
        minWidth: '80vw',
        minHeight: '70vh'
    },
    children: 'child content',
    imageSrc: 'https://cdn.icatalyst.com/wp-content/uploads/sites/5/2014/02/27000520/gear-banner-1920x500.png'
};

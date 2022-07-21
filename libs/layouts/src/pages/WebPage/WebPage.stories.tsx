import { Meta, Story } from '@storybook/react';
import { WebPage as Component, WebPageProps } from './WebPage';


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

const Template: Story<WebPageProps> = args => <Component {...args} />;

export const WebPage = Template.bind({});
WebPage.args = {
    title: 'A website inside a website',
    style: {
        minWidth: '80vw',
        minHeight: '70vh'
    },
    src: 'https://singularity.icatalyst.com',
    imageSrc: 'https://cdn.icatalyst.com/wp-content/uploads/sites/5/2014/02/27000520/gear-banner-1920x500.png',
};

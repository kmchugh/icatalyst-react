import { Meta, Story } from '@storybook/react';
import { Page as Component, PageProps } from './Page';


const meta: Meta = {
    component: Component,
    argTypes: {
    },
    parameters: {
        controls: { expanded: true },
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
    children : 'child content'
};

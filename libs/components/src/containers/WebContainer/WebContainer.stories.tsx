import { Meta, Story } from '@storybook/react';
import { WebContainer as Component, WebContainerProps } from './WebContainer';


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

const Template: Story<WebContainerProps> = args => <Component {...args} />;

export const WebContainer = Template.bind({});
WebContainer.args = {
    style: {
        minWidth: '80vw',
        minHeight: '70vh'
    },
    src: 'https://singularity.icatalyst.com'
};

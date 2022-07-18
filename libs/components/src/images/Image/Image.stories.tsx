import { Meta, Story } from '@storybook/react';
import { Image as Component, ImageProps } from './Image';


const meta: Meta = {
    component: Component,
    argTypes: {
    },
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story<ImageProps> = args => <Component {...args} />;

export const Image = Template.bind({});
Image.args = {
    src: 'https://cdn.icatalyst.com/wp-content/uploads/sites/5/2014/02/27000520/gear-banner-1920x500.png'
};

import { Meta, Story } from '@storybook/react';
import { Avatar as Component, AvatarProps } from './Avatar';


const meta: Meta = {
    component: Component,
    argTypes: {
    },
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story<AvatarProps> = args => <Component {...args} />;

export const Avatar = Template.bind({});
Avatar.args = {
    title : 'avatar'
};

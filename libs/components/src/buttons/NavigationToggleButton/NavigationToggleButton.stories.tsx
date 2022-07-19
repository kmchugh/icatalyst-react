import { Meta, Story } from '@storybook/react';
import { NavigationToggleButton as Component, NavigationToggleButtonProps } from './NavigationToggleButton';


const meta: Meta = {
    component: Component,
    argTypes: {
    },
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story<NavigationToggleButtonProps> = args => <Component {...args} />;

export const NavigationToggleButton = Template.bind({});
NavigationToggleButton.args = {};

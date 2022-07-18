import { Meta, Story } from '@storybook/react';
import { IconButton as IconButtonComponent, IconButtonProps } from './IconButton';


const meta: Meta = {
    component: IconButtonComponent,
    argTypes: {
    },
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story<IconButtonProps> = args => <IconButtonComponent {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const IconButton = Template.bind({});
IconButton.args = {};

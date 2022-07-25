import { Meta, Story } from '@storybook/react';
import { TagField as Component, TagFieldProps } from './TagField';

const meta: Meta = {
    component: Component,
    argTypes: {
    },
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story<TagFieldProps> = args => <Component {...args} />;

export const TagField = Template.bind({});
TagField.args = {
    label: 'Select a Painting',
    options: [
        'a walk in the woods',
        'mt. mckinley',
        'ebony sunset',
        'winter mist',
        'quiet stream',
        'winter moon',
        'autumn mountains',
        'peaceful valley',
        'seascape',
        'mountain lake',
        'winter glow',
        'snowfall',
        'final reflections',
        'meadow lake',
        'winter sun',
        'ebony sea',
    ]
};

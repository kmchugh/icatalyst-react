import { Meta, Story } from '@storybook/react';
import { InfoPage as Component, InfoPageProps } from './InfoPage';


const meta: Meta = {
    component: Component,
    argTypes: {
    },
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story<InfoPageProps> = args => <Component {...args} />;

export const InfoPage = Template.bind({});
InfoPage.args = {
    title: 'An Info Page',
    icon: 'info',
    excerpt : 'Some information here',
    content : 'Some content here',
    style: {
        minWidth: '80vw',
        minHeight: '70vh'
    },
    children : 'child content'
};

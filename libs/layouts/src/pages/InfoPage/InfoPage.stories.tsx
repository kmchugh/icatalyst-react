import { Meta, Story } from '@storybook/react';
import { InfoPage as Component, InfoPageProps } from './InfoPage';


const meta: Meta = {
    component: Component,
    argTypes: {
    },
    parameters: {
        controls: { expanded: true },
        storyPadding : '0'
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
    children : 'child content',
    imageSrc : 'https://cdn.icatalyst.com/wp-content/uploads/sites/5/2014/02/27000520/gear-banner-1920x500.png'
};

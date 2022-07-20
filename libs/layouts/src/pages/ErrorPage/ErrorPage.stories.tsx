import { Meta, Story } from '@storybook/react';
import { ErrorPage as Component, ErrorPageProps } from './ErrorPage';


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

const Template: Story<ErrorPageProps> = args => <Component {...args} />;

export const ErrorPage = Template.bind({});
ErrorPage.args = {
    style: {
        minWidth: '80vw',
        minHeight: '70vh'
    },
    title: 'An Error has occurred',
    message: 'Do something quickly before it breaks everything',
    linkPath: '/',
    linkText: 'Click the link to recover',
    imageSrc: 'https://cdn.icatalyst.com/wp-content/uploads/sites/5/2014/02/27000520/gear-banner-1920x500.png'
};

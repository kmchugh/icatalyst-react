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
    message: `
    You can get away with a lot. Only think about one thing at a time. Don't get greedy. We don't really know where this goes - and I'm not sure we really care. If we're going to have animals around we all have to be concerned about them and take care of them. Just think about these things in your mind and drop em' on canvas.
    
    That's a crooked tree. We'll send him to Washington. We'll take a little bit of Van Dyke Brown. A big strong tree needs big strong roots. It's beautiful - and we haven't even done anything to it yet. Maybe there's a happy little Evergreen that lives here. We want to use a lot pressure while using no pressure at all.
    
    This is gonna be a happy little seascape. We touch the canvas, the canvas takes what it wants. At home you have unlimited time. In painting, you have unlimited power. You have the ability to move mountains.
    
    How to paint. That's easy. What to paint. That's much harder. Only God can make a tree - but you can paint one. Decide where your cloud lives. Maybe he lives right in here. Automatically, all of these beautiful, beautiful things will happen. And maybe, maybe, maybe... You create the dream - then you bring it into your world.
    
    A tree needs to be your friend if you're going to paint him. Little short strokes. I was blessed with a very steady hand; and it comes in very handy when you're doing these little delicate things.
    
    Let's go up in here, and start having some fun Water's like me. It's laaazy... Boy, it always looks for the easiest way to do things Fluff that up. Nothing wrong with washing your brush.
    
    This is probably the greatest thing that's ever happened in my life. You gotta think like a tree. But they're very easily killed. Clouds are delicate. Let's make some happy little clouds in our world. Volunteering your time; it pays you and your whole community fantastic dividends. I sincerely wish for you every possible joy life could bring.
    
    `,
    linkPath: '/',
    linkText: 'Click the link to recover',
    imageSrc: 'https://cdn.icatalyst.com/wp-content/uploads/sites/5/2014/02/27000520/gear-banner-1920x500.png'
};

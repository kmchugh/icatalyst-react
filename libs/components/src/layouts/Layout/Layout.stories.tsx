import { Typography } from '@mui/material';
import { Meta, Story } from '@storybook/react';
import { Link } from 'react-router-dom';
import { Layout as Component } from './Layout';
import { createStore } from '../../utilities';
import { App, AppProps } from '../../application';

const meta: Meta = {
    component: Component,
    argTypes: {
    },
    parameters: {
        controls: { expanded: true },
        fullSize: true,
        storyPadding: '0'
    },
};

export default meta;




function No() {
    return (
        <>
            <main>
                <p>You can do this, I believe in you.</p>
            </main>
            <nav>
                <Link to="/">Thanks</Link>
            </nav>
        </>
    );
}

function Yes() {
    return (
        <>
            <main>
                <p>
                    That feels like an existential question, don't you
                    think?
                </p>
            </main>
            <nav>
                <Link to="/">Sometimes</Link>
            </nav>
        </>
    );
}

const store = createStore({});
const routes = [{
    title: 'Yes',
    component: <Yes />,
    navigation: false,
    path: '/yes'
}, {
    title: 'No',
    component: <No />,
    navigation: false,
    path: '/no'
}];

// The layout is automatically rendered by the App, so just render content
const Template: Story<AppProps> = args => <App
    store={store}
    routes={routes}
    layouts={[]}
>
    <div>
        <Typography>Its a wonderful life.</Typography>
        <div>
            <Link to="/yes" >YES</Link>
        </div>
        <div>
            <Link to="/no">No</Link>
        </div>
    </div>
</App>;

export const Layout = Template.bind({});
Layout.args = {
};

import { render } from '@testing-library/react';
import { createStore } from '../../utilities';

import App from './App';

describe(App.name, () => {
    it('should render successfully', () => {
        const store = createStore({});

        const { baseElement } = render(<App store={store}>CONTENT</App>);
        expect(baseElement).toBeTruthy();
    });
});

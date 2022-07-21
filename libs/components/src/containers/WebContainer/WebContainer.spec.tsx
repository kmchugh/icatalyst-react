import { render } from '@testing-library/react';

import { WebContainer as Component } from './WebContainer';

describe(Component.name, () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <Component title="test" src="https://www.google.com" />
        );
        expect(baseElement).toBeTruthy();
    });
});

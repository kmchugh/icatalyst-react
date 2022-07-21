import { render } from '@testing-library/react';

import { Loader as Component } from './Loader';

describe(Component.name, () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <Component />
        );
        expect(baseElement).toBeTruthy();
    });
});

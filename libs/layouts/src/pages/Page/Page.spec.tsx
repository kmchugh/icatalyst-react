import { render } from '@testing-library/react';

import Page from './Page';

describe(Page.name, () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Page>children</Page>);
        expect(baseElement).toBeTruthy();
    });
});

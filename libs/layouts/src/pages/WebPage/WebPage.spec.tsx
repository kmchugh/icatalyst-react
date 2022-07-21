import { render } from '@testing-library/react';

import WebPage from './WebPage';

describe(WebPage.name, () => {
    it('should render successfully', () => {
        const { baseElement } = render(<WebPage title="A test title" src="https://www.google.com" />);
        expect(baseElement).toBeTruthy();
    });
});

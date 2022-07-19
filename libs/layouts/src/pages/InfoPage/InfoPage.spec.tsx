import { render } from '@testing-library/react';

import InfoPage from './InfoPage';

describe(InfoPage.name, () => {
    it('should render successfully', () => {
        const { baseElement } = render(<InfoPage title="A test title"/>);
        expect(baseElement).toBeTruthy();
    });
});

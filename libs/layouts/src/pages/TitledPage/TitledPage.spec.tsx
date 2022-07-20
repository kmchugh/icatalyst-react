import { render } from '@testing-library/react';

import TitledPage from './TitledPage';

describe(TitledPage.name, () => {
    it('should render successfully', () => {
        const { baseElement } = render(<TitledPage title="A test title" />);
        expect(baseElement).toBeTruthy();
    });
});

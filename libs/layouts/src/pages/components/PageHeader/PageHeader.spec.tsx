import { render } from '@testing-library/react';

import PageHeader from './PageHeader';

describe(PageHeader.name, () => {
    it('should render successfully', () => {
        const { baseElement } = render(<PageHeader title="A test title" />);
        expect(baseElement).toBeTruthy();
    });
});

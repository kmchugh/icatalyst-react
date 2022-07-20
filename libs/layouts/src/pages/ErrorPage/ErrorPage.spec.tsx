import { render } from '@testing-library/react';

import ErrorPage from './ErrorPage';

describe(ErrorPage.name, () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ErrorPage>children</ErrorPage>);
        expect(baseElement).toBeTruthy();
    });
});

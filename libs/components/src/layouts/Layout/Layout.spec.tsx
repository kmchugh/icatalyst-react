import { render } from '@testing-library/react';

import Layout from './Layout';

describe(Layout.name, () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Layout>Content</Layout>);
        expect(baseElement).toBeTruthy();
    });
});

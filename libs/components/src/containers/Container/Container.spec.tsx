import { render } from '@testing-library/react';

import Container from './Container';

describe(Container.name, () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <Container>CONTENT</Container>
        );
        expect(baseElement).toBeTruthy();
    });
});

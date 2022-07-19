import { render } from '@testing-library/react';

import Avatar from './Avatar';

describe(Avatar.name, () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Avatar title="test"/>);
        expect(baseElement).toBeTruthy();
    });
});

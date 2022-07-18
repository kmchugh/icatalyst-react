import { render } from '@testing-library/react';

import IconButton from './IconButton';

describe(IconButton.name, () => {
    it('should render successfully', () => {
        const { baseElement } = render(<IconButton />);
        expect(baseElement).toBeTruthy();
    });
});

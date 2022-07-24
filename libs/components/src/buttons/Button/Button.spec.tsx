import { render } from '@testing-library/react';

import Button from './Button';

describe(Button.name, () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Button />);
        expect(baseElement).toBeTruthy();
    });
});

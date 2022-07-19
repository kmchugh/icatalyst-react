import { render } from '@testing-library/react';

import ClearableInput from './ClearableInput';

describe(ClearableInput.name, () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ClearableInput />);
        expect(baseElement).toBeTruthy();
    });
});

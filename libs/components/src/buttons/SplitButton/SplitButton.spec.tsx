import { render } from '@testing-library/react';

import SplitButton from './SplitButton';

describe(SplitButton.name, () => {
    it('should render successfully', () => {
        const { baseElement } = render(<SplitButton
            options={[]}
        />);
        expect(baseElement).toBeTruthy();
    });
});

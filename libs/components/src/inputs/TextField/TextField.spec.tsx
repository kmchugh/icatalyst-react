import { render } from '@testing-library/react';

import TextField from './TextField';

describe(TextField.name, () => {
    it('should render successfully', () => {
        const { baseElement } = render(<TextField />);
        expect(baseElement).toBeTruthy();
    });
});

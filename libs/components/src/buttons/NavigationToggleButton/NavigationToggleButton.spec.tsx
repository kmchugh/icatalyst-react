import { render } from '@testing-library/react';

import NavigationToggleButton from './NavigationToggleButton';

describe(NavigationToggleButton.name, () => {
    it('should render successfully', () => {
        const { baseElement } = render(<NavigationToggleButton />);
        expect(baseElement).toBeTruthy();
    });
});

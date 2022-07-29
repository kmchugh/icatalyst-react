import { render } from '@testing-library/react';

import DropdownMenu from './DropdownMenu';

describe(DropdownMenu.name, () => {
    it('should render successfully', () => {
        const { baseElement } = render(<DropdownMenu />);
        expect(baseElement).toBeTruthy();
    });
});

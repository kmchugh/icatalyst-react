import { render } from '@testing-library/react';

import UpdateAvailable from './UpdateAvailable';

describe(UpdateAvailable.name, () => {
    it('should render successfully', () => {
        const { baseElement } = render(<UpdateAvailable />);
        expect(baseElement).toBeTruthy();
    });
});

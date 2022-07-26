import { render } from '@testing-library/react';

import Media from './Media';

describe(Media.name, () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Media />);
        expect(baseElement).toBeTruthy();
    });
});

import { render } from '@testing-library/react';

import CommandPanel from './CommandPanel';

describe(CommandPanel.name, () => {
    it('should render successfully', () => {
        const { baseElement } = render(<CommandPanel />);
        expect(baseElement).toBeTruthy();
    });
});

import { render } from '@testing-library/react';

import TagField from './TagField';

describe(TagField.name, () => {
    it('should render successfully', () => {
        const { baseElement } = render(<TagField />);
        expect(baseElement).toBeTruthy();
    });
});

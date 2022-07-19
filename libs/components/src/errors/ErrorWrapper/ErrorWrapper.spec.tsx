import { render } from '@testing-library/react';

import ErrorWrapper from './ErrorWrapper';

describe(ErrorWrapper.name, () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ErrorWrapper 
        errors={[{message: 'an error'}]} 
    />);
    expect(baseElement).toBeTruthy();
  });
});

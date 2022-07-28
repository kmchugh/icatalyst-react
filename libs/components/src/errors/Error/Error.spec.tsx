import { render } from '@testing-library/react';

import Error from './Error';

describe(Error.name, () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Error>An error</Error>);
    expect(baseElement).toBeTruthy();
  });
});

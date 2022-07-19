import { render } from '@testing-library/react';

import ErrorBoundary from './ErrorBoundary';

describe(ErrorBoundary.name, () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ErrorBoundary>TEST</ErrorBoundary>);
    expect(baseElement).toBeTruthy();
  });
});

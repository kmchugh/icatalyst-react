import { render } from '@testing-library/react';

import Icon from './Icon';

describe(Icon.name, () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Icon />);
    expect(baseElement).toBeTruthy();
  });
});

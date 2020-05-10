import React from 'react';
import 'jest-styled-components';

import Button from '@components/Button';

// @ts-ignore
import renderWithTheme from '@testHelpers/renderWithTheme';

describe('Button common component', () => {
  it('renders correctly', () => {
    const tree = renderWithTheme(<Button label="test" />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

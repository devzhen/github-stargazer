import React from 'react';
import 'jest-styled-components';

import Header from '@modules/auth/components/Header';

// @ts-ignore
import renderWithTheme from '@testHelpers/renderWithTheme';

describe('Header auth component', () => {
  it('renders correctly', () => {
    const tree = renderWithTheme(
      <Header title="Login" bgColor="#fff" />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

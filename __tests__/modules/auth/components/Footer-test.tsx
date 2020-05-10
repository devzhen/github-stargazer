import React from 'react';
import 'jest-styled-components';

import Button from '@components/Button';

import Footer from '@modules/auth/components/Footer';

// @ts-ignore
import renderWithTheme from '@testHelpers/renderWithTheme';

describe('Footer auth component', () => {
  it('renders correctly', () => {
    const tree = renderWithTheme(
      <Footer>
        <Button label="Login" onPress={() => {}} loading={true} />
      </Footer>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

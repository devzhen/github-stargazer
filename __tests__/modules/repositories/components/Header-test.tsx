import React from 'react';
import 'jest-styled-components';

import Header from '@modules/repositories/components/Header';

// @ts-ignore
import renderWithTheme from '@testHelpers/renderWithTheme';

describe('Header repository component', () => {
  it('renders correctly, 1 case', () => {
    const tree = renderWithTheme(
      <Header
        title="Repositories"
        bgColor="#fff"
        canLogout
        logout={() => {}}
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly, 2 case', () => {
    const tree = renderWithTheme(
      <Header title="Add" bgColor="#fff" logout={() => {}} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly, 3 case', () => {
    const tree = renderWithTheme(
      <Header title="Details" bgColor="#fff" />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

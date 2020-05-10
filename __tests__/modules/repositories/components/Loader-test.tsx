import React from 'react';
import 'jest-styled-components';

import Loader from '@modules/repositories/components/Loader';

// @ts-ignore
import renderWithTheme from '@testHelpers/renderWithTheme';

describe('Loader repository component', () => {
  it('renders correctly, 1 case', () => {
    const tree = renderWithTheme(
      <Loader marginTop={100} size="large" />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly, 2 case', () => {
    const tree = renderWithTheme(
      <Loader marginTop={100} size="small" />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly, 3 case', () => {
    const tree = renderWithTheme(<Loader marginTop={0} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

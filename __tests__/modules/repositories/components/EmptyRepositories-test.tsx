import React from 'react';
import 'jest-styled-components';

import EmptyRepositories from '@modules/repositories/components/EmptyRepositories';

// @ts-ignore
import renderWithTheme from '@testHelpers/renderWithTheme';

describe('EmptyRepositories repository component', () => {
  it('renders correctly, 1 case', () => {
    const tree = renderWithTheme(
      <EmptyRepositories isFetchingNow={false} repositories={[]} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly, 2 case', () => {
    const tree = renderWithTheme(
      <EmptyRepositories isFetchingNow={true} repositories={[]} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly, 3 case', () => {
    const tree = renderWithTheme(
      <EmptyRepositories isFetchingNow={false} repositories={[{ id: 1 }]} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly, 4 case', () => {
    const tree = renderWithTheme(
      <EmptyRepositories isFetchingNow={true} repositories={[{ id: 1 }]} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

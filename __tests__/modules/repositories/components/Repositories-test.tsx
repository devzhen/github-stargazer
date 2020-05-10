import React from 'react';
import 'jest-styled-components';

import Repositories from '@modules/repositories/components/Repositories';

// @ts-ignore
import renderWithTheme from '@testHelpers/renderWithTheme';

const repos = [
  { id: 1, name: '1' },
  { id: 2, name: '2' },
  { id: 3, name: '3' },
];

describe('Repositories repository component', () => {
  it('renders correctly, 1 case', () => {
    const tree = renderWithTheme(
      <Repositories
        isFetchingNow={true}
        repositories={[]}
        onPressItem={() => {}}
        deleteItem={() => {}}
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly, 2 case', () => {
    const tree = renderWithTheme(
      <Repositories
        isFetchingNow={false}
        repositories={repos}
        onPressItem={() => {}}
        deleteItem={() => {}}
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

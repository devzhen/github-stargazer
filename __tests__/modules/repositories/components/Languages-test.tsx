import React from 'react';
import 'jest-styled-components';

import Languages from '@modules/repositories/components/Languages';

// @ts-ignore
import renderWithTheme from '@testHelpers/renderWithTheme';

const langs = [
  { name: 'Javascript', percent: '20%' },
  { name: 'F#', percent: '20%' },
  { name: 'C#', percent: '20%' },
  { name: 'C++', percent: '20%' },
];

describe('Languages repository component', () => {
  it('renders correctly, 1 case', () => {
    const tree = renderWithTheme(
      <Languages languages={langs} isFetchingNow={true} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly, 2 case', () => {
    const tree = renderWithTheme(
      <Languages languages={langs} isFetchingNow={false} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly, 3 case', () => {
    const tree = renderWithTheme(
      <Languages languages={[]} isFetchingNow={false} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

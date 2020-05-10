import React from 'react';
import 'jest-styled-components';

import AddButton from '@modules/repositories/components/AddButton';

// @ts-ignore
import renderWithTheme from '@testHelpers/renderWithTheme';

describe('AddButton repository component', () => {
  it('renders correctly', () => {
    const tree = renderWithTheme(<AddButton onPress={() => {}} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

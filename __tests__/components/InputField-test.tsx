import React from 'react';
import 'jest-styled-components';

import InputField from '@components/InputField';

// @ts-ignore
import renderWithTheme from '@testHelpers/renderWithTheme';

describe('InputField common component', () => {
  it('renders correctly', () => {
    const tree = renderWithTheme(
      <InputField value="test" onChangeText={() => {}} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

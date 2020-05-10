import React from 'react';
import 'jest-styled-components';

import InfoModal from '@modules/auth/components/InfoModal';

// @ts-ignore
import renderWithTheme from '@testHelpers/renderWithTheme';

describe('InfoModal auth component', () => {
  it('renders correctly, 1 case', () => {
    const tree = renderWithTheme(
      <InfoModal
        isVisible={true}
        onPress={() => {}}
        header="test"
        message="test"
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly, 2 case', () => {
    const tree = renderWithTheme(
      <InfoModal
        isVisible={false}
        onPress={() => {}}
        header="test"
        message="test"
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

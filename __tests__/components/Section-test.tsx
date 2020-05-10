import React from 'react';
import { View, Text } from 'react-native';
import 'jest-styled-components';

import Section from '@components/Section';

// @ts-ignores
import renderWithTheme from '@testHelpers/renderWithTheme';

describe('Section common component', () => {
  it('renders correctly, 1 test', () => {
    const tree = renderWithTheme(
      <Section fluid clientLeft={8} clientRight={8}>
        <View>
          <Text>TEST</Text>
        </View>
      </Section>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly, 2 test', () => {
    const tree = renderWithTheme(
      <Section centerContentVertically>
        <View>
          <Text>TEST</Text>
        </View>
      </Section>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly, 3 test', () => {
    const tree = renderWithTheme(
      <Section fluid borderRadius={22}>
        <View>
          <Text>TEST</Text>
        </View>
      </Section>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

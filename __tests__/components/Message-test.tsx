import React from 'react';
import 'jest-styled-components';

import Message from '@components/Message';

// @ts-ignore
import renderWithTheme from '@testHelpers/renderWithTheme';

describe('Message common component', () => {
  it('renders correctly', () => {
    const tree = renderWithTheme(
      <Message message="Please, provide you credentials." />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with offsetTop', () => {
    const tree = renderWithTheme(
      <Message message="Please, provide you credentials." offsetTop={22} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with offsetBottom', () => {
    const tree = renderWithTheme(
      <Message message="Please, provide you credentials." offsetBottom={22} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

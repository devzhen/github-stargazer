import React from 'react';
import 'jest-styled-components';

import ConfirmModal from '@modules/repositories/components/ConfirmModal';

// @ts-ignore
import renderWithTheme from '@testHelpers/renderWithTheme';

describe('ConfirmModal repository component', () => {
  it('renders correctly, 1 case', () => {
    const tree = renderWithTheme(
      <ConfirmModal
        isVisible={true}
        cancel={() => {}}
        submit={() => {}}
        isLoading={true}
        repoName="test"
        header="test"
        message="test"
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly, 2 case', () => {
    const tree = renderWithTheme(
      <ConfirmModal
        isVisible={false}
        cancel={() => {}}
        submit={() => {}}
        isLoading={true}
        repoName="test"
        header="test"
        message="test"
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly, 3 case', () => {
    const tree = renderWithTheme(
      <ConfirmModal
        isVisible={false}
        cancel={() => {}}
        submit={() => {}}
        isLoading={false}
        repoName="test"
        header="test"
        message="test"
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

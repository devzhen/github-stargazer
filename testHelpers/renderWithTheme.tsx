import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components/native';
import 'jest-styled-components';

import theme from '@theme/index';

const renderWithTheme = (component: any) =>
  renderer.create(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

export default renderWithTheme;

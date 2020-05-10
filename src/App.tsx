import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

import theme from './theme';

import configureStore from './store/configureStore';

import RootContainer from './RootContainer';

const { store, persistor } = configureStore();

const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootContainer />
      </PersistGate>
    </Provider>
  </ThemeProvider>
);

export default App;

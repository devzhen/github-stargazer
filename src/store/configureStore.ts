import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import rootReducer from './rootReducer';

import loggerMiddleware from './middlewares/loggerMiddleware';

const client = axios.create({
  responseType: 'json',
});

export default (initialState?: any) => {
  const middlewares = [thunk, axiosMiddleware(client)];

  if (__DEV__) {
    middlewares.push(loggerMiddleware as any);
  }

  // Create enhancer.
  const enhancer = applyMiddleware(...middlewares);

  const store = createStore(rootReducer, initialState, enhancer);

  const persistor = persistStore(store);

  return { store, persistor };
};

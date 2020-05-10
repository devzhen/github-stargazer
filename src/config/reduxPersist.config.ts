import AsyncStorage from '@react-native-community/async-storage';

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1',
  storeConfig: {
    key: 'primary',
    storage: AsyncStorage,
    whitelist: ['auth', 'repositories'],
  },
};

export default REDUX_PERSIST;

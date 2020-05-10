import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import ReduxPersist from '../config/reduxPersist.config';

import AuthReducer, {
  STATE_KEY as AUTH_STATE_KEY,
} from '../modules/auth/auth.reducer';

import RepoReducer, {
  STATE_KEY as REPO_STATE_KEY,
} from '../modules/repositories/repositories.reducer';

const rootReducer = combineReducers({
  // App Reducers
  [AUTH_STATE_KEY]: AuthReducer,
  [REPO_STATE_KEY]: RepoReducer,
});

export default persistReducer(ReduxPersist.storeConfig, rootReducer);

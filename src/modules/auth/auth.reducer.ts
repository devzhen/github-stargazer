import * as R from 'ramda';

import { LOGOUT, SET_IS_AUTHENTICATED } from './auth.actions';

export const STATE_KEY = 'auth';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const AuthReducer = (
  state: Record<string, any> = initialState,
  action: Record<string, any>,
) => {
  switch (action.type) {
    case LOGOUT: {
      return initialState;
    }
    case SET_IS_AUTHENTICATED: {
      const user = action.payload.user;

      return {
        ...state,
        user,
        isAuthenticated: true,
      };
    }
    default: {
      return state;
    }
  }
};

export const getIsAuthenticated = (state: any) =>
  R.path([STATE_KEY, 'isAuthenticated'], state);

export const getUserData = (state: any) => ({
  user: R.path([STATE_KEY, 'user'], state),
});

export default AuthReducer;

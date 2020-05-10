import appConfig from '@config/appConfig.config';

import {
  logout,
  login,
  setIsAuthenticated,
  LOGOUT,
  LOGIN,
  SET_IS_AUTHENTICATED,
} from '@modules/auth/auth.actions';

describe('Test redux actions of auth module', () => {
  it('LOGOUT test', () => {
    const expectedAction = {
      type: LOGOUT,
    };

    expect(logout()).toEqual(expectedAction);
  });

  it('SET_IS_AUTHENTICATED test', () => {
    const user = 'test';

    const expectedAction = {
      type: SET_IS_AUTHENTICATED,
      payload: {
        user,
      },
    };

    expect(setIsAuthenticated(user)).toEqual(expectedAction);
  });

  it('LOGIN test', () => {
    const user = 'test';
    const password = 'test';

    const expectedAction = {
      type: LOGIN,
      payload: {
        request: {
          method: 'GET',
          url: `${appConfig.githubEndpoint}`,
          headers: {
            Authorization: `Basic dGVzdDp0ZXN0`,
          },
        },
        data: {
          user,
          password,
        },
      },
    };

    expect(login({ user, password })).toEqual(expectedAction);
  });
});

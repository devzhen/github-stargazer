import base64 from 'base-64';

import appConfig from '../../config/appConfig.config';

const namespace = 'AUTH';

export const LOGOUT = `${namespace}/LOGOUT`;
export const LOGIN = `${namespace}/LOGIN`;
export const SET_IS_AUTHENTICATED = `${namespace}/SET_IS_AUTHENTICATED`;

export const logout = () => ({
  type: LOGOUT,
});

export const login = (payload: any) => ({
  type: LOGIN,
  payload: {
    request: {
      method: 'GET',
      url: `${appConfig.githubEndpoint}`,
      headers: {
        Authorization: `Basic ${base64.encode(
          `${payload.user}:${payload.password}`,
        )}`,
      },
    },
    data: {
      ...payload,
    },
  },
});

export const setIsAuthenticated = (user: any) => ({
  type: SET_IS_AUTHENTICATED,
  payload: {
    user,
  },
});

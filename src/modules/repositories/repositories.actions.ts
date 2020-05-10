import base64 from 'base-64';

import appConfig from '../../config/appConfig.config';

const namespace = 'REPOS';

export const FETCH_ALL = `${namespace}/FETCH_ALL`;
export const CREATE = `${namespace}/CREATE`;
export const DELETE = `${namespace}/DELETE`;
export const FETCH_LANGUAGES = `${namespace}/FETCH_LANGUAGES`;

export const fetchAll = (payload: any) => ({
  type: FETCH_ALL,
  payload: {
    request: {
      method: 'GET',
      url: `${appConfig.githubEndpoint}/user/repos`,
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

export const fetchRepoLanguages = (payload: any) => ({
  type: FETCH_LANGUAGES,
  payload: {
    request: {
      method: 'GET',
      url: `${payload.url}`,
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

export const createRepo = (payload: any) => ({
  type: CREATE,
  payload: {
    request: {
      method: 'POST',
      url: `${appConfig.githubEndpoint}/user/repos`,
      data: {
        name: payload.name,
      },
      headers: {
        Authorization: `Basic ${base64.encode(
          `${payload.user}:${payload.password}`,
        )}`,
      },
    },
  },
});

export const deleteRepo = (payload: any) => ({
  type: DELETE,
  payload: {
    request: {
      method: 'DELETE',
      url: `${appConfig.githubEndpoint}/repos/${payload.user}/${payload.name}`,
      headers: {
        Authorization: `Basic ${base64.encode(
          `${payload.user}:${payload.password}`,
        )}`,
      },
    },
    data: {
      id: payload.id,
    },
  },
});

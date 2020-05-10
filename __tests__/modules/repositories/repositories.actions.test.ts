import appConfig from '@config/appConfig.config';

import {
  FETCH_ALL,
  CREATE,
  DELETE,
  FETCH_LANGUAGES,
  fetchAll,
  fetchRepoLanguages,
  deleteRepo,
  createRepo,
} from '@modules/repositories/repositories.actions';

const user = 'test';
const password = 'test';
const repoName = 'test';
const repoId = '0';
const languagesUrl = 'test';

describe('Test redux actions of repository module', () => {
  it('FETCH_ALL test', () => {
    const expectedAction = {
      type: FETCH_ALL,
      payload: {
        request: {
          method: 'GET',
          url: `${appConfig.githubEndpoint}/user/repos`,
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

    expect(fetchAll({ user, password })).toEqual(expectedAction);
  });

  it('FETCH_LANGUAGES test', () => {
    const expectedAction = {
      type: FETCH_LANGUAGES,
      payload: {
        request: {
          method: 'GET',
          url: languagesUrl,
          headers: {
            Authorization: `Basic dGVzdDp0ZXN0`,
          },
        },
        data: {
          user,
          password,
          url: languagesUrl,
        },
      },
    };

    expect(fetchRepoLanguages({ user, password, url: languagesUrl })).toEqual(
      expectedAction,
    );
  });

  it('CREATE test', () => {
    const expectedAction = {
      type: CREATE,
      payload: {
        request: {
          method: 'POST',
          url: `${appConfig.githubEndpoint}/user/repos`,
          data: {
            name: repoName,
          },
          headers: {
            Authorization: `Basic dGVzdDp0ZXN0`,
          },
        },
      },
    };

    expect(createRepo({ user, password, name: repoName })).toEqual(
      expectedAction,
    );
  });

  it('DELETE test', () => {
    const expectedAction = {
      type: DELETE,
      payload: {
        request: {
          method: 'DELETE',
          url: `${appConfig.githubEndpoint}/repos/${user}/${repoName}`,
          headers: {
            Authorization: `Basic dGVzdDp0ZXN0`,
          },
        },
        data: {
          id: repoId,
        },
      },
    };

    expect(
      deleteRepo({
        user,
        password,
        name: repoName,
        id: repoId,
      }),
    ).toEqual(expectedAction);
  });
});

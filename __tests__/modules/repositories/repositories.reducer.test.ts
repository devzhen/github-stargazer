import { logout } from '@modules/auth/auth.actions';

import RepoReducer from '@modules/repositories/repositories.reducer';
import {
  CREATE,
  FETCH_ALL,
  DELETE,
} from '@modules/repositories/repositories.actions';

describe('Repo reducer', () => {
  it('should return the initial state, 1 case', () => {
    const expectedState = {
      repositories: {},
    };

    const result = RepoReducer(undefined, {});

    expect(result).toEqual(expectedState);
  });

  it('should return the initial state, 2 case', () => {
    const expectedState = {
      repositories: {},
    };

    const result = RepoReducer(undefined, logout());

    expect(result).toEqual(expectedState);
  });

  it('test fetchAll() action', () => {
    const expectedState = {
      repositories: {
        1: { id: 1 },
        2: { id: 2 },
      },
    };

    const result = RepoReducer(undefined, {
      type: `${FETCH_ALL}_SUCCESS`,
      payload: {
        data: [{ id: 1 }, { id: 2 }],
      },
    });

    expect(result).toEqual(expectedState);
  });

  it('test deleteRepo() action', () => {
    const expectedState = {
      repositories: {},
    };

    const result = RepoReducer(undefined, {
      type: `${DELETE}_SUCCESS`,
      meta: {
        previousAction: {
          payload: {
            data: { id: 1 },
          },
        },
      },
    });

    expect(result).toEqual(expectedState);
  });

  it('test createRepo() action', () => {
    const expectedState = {
      repositories: {
        1: { id: 1 },
      },
    };

    const result = RepoReducer(undefined, {
      type: `${CREATE}_SUCCESS`,
      payload: {
        data: { id: 1 },
      },
    });

    expect(result).toEqual(expectedState);
  });
});

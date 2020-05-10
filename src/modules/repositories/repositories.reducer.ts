import * as R from 'ramda';

import { LOGOUT } from '../auth/auth.actions';

import { FETCH_ALL, CREATE, DELETE } from './repositories.actions';

export const STATE_KEY = 'repositories';

const initialState = {
  repositories: {},
};

const RepositoriesReducer = (
  state: Record<string, any> = initialState,
  action: Record<string, any>,
) => {
  switch (action.type) {
    case LOGOUT: {
      return initialState;
    }
    case `${FETCH_ALL}_SUCCESS`: {
      const repos = R.path(['payload', 'data'], action);

      const reposObject = repos.reduce((acc: any, item: any) => {
        const itemId = R.prop('id', item);

        return R.assoc(itemId, item, acc);
      }, {});

      return R.assoc('repositories', reposObject, state);
    }
    case `${CREATE}_SUCCESS`: {
      const repo = R.path(['payload', 'data'], action);

      const newState = R.assocPath(['repositories', repo.id], repo, state);

      return newState;
    }
    case `${DELETE}_SUCCESS`: {
      const id = R.path(
        ['meta', 'previousAction', 'payload', 'data', 'id'],
        action,
      );

      const newRepos = R.omit([id], state.repositories);

      return R.assoc('repositories', newRepos, state);
    }
    default: {
      return state;
    }
  }
};

export const getRepositories = (state: any) =>
  R.path([STATE_KEY, 'repositories'], state);

export default RepositoriesReducer;

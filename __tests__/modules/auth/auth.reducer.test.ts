import AuthReducer from '@modules/auth/auth.reducer';
import { logout, setIsAuthenticated } from '@modules/auth/auth.actions';

describe('Auth reducer', () => {
  it('should return the initial state, 1 case', () => {
    const expectedState = {
      user: null,
      isAuthenticated: false,
    };

    const result = AuthReducer(undefined, {});

    expect(result).toEqual(expectedState);
  });

  it('should return the initial state, 2 case', () => {
    const expectedState = {
      user: null,
      isAuthenticated: false,
    };

    const result = AuthReducer(undefined, logout());

    expect(result).toEqual(expectedState);
  });

  it('test setIsAuthenticated() action', () => {
    const user = 'test';

    const expectedState = {
      user,
      isAuthenticated: true,
    };

    const result = AuthReducer(undefined, setIsAuthenticated(user));

    expect(result).toEqual(expectedState);
  });
});

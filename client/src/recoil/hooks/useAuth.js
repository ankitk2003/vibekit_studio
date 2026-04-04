import { useSetRecoilState, useRecoilValue } from 'recoil';
import {
  authUserAtom,
  authLoadingAtom,
  authErrorAtom,
  authTokenAtom,
  isAuthenticatedAtom,
} from '../atoms/authAtoms';
import {
  isAuthenticatedSelector,
  currentUserSelector,
  userIdSelector,
  userEmailSelector,
} from '../selectors/authSelectors';

/**
 * Custom hook to use authentication state
 * Usage: const { user, isAuthenticated, login, logout, signup } = useAuth();
 */
export const useAuth = () => {
  const user = useRecoilValue(currentUserSelector);
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
  const userId = useRecoilValue(userIdSelector);
  const userEmail = useRecoilValue(userEmailSelector);
  
  const setAuthUser = useSetRecoilState(authUserAtom);
  const setAuthLoading = useSetRecoilState(authLoadingAtom);
  const setAuthError = useSetRecoilState(authErrorAtom);
  const setAuthToken = useSetRecoilState(authTokenAtom);
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedAtom);

  /**
   * Signup function
   */
  const signup = async (name, email, password) => {
    setAuthLoading(true);
    setAuthError(null);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Signup failed');
      }

      const data = await response.json();
      
      // Update auth state (token is stored in httpOnly cookie automatically by browser)
      setAuthUser(data.user);
      setIsAuthenticated(true);

      return { success: true, user: data.user };
    } catch (err) {
      const errorMsg = err.message || 'An error occurred during signup';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setAuthLoading(false);
    }
  };

  /**
   * Login function
   */
  const login = async (email, password) => {
    setAuthLoading(true);
    setAuthError(null);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Login failed');
      }

      const data = await response.json();
      
      // Update auth state (token is stored in httpOnly cookie automatically by browser)
      setAuthUser(data.user);
      setIsAuthenticated(true);

      return { success: true, user: data.user };
    } catch (err) {
      const errorMsg = err.message || 'An error occurred during login';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setAuthLoading(false);
    }
  };

  /**
   * Logout function
   */
  const logout = async () => {
    setAuthLoading(true);
    setAuthError(null);

    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      // Clear auth state (httpOnly cookie is cleared by server)
      setAuthUser(null);
      setIsAuthenticated(false);

      return { success: true };
    } catch (err) {
      const errorMsg = err.message || 'An error occurred during logout';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setAuthLoading(false);
    }
  };

  /**
   * Clear error message
   */
  const clearError = () => {
    setAuthError(null);
  };

  /**
   * Set user manually (useful for profile updates)
   */
  const setUser = (userData) => {
    setAuthUser(userData);
  };

  return {
    // State
    user,
    isAuthenticated,
    userId,
    userEmail,
    loading: useRecoilValue(authLoadingAtom),
    error: useRecoilValue(authErrorAtom),

    // Methods
    signup,
    login,
    logout,
    clearError,
    setUser,
  };
};

export default useAuth;

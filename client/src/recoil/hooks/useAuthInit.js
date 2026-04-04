import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { authUserAtom, isAuthenticatedAtom } from '../atoms/authAtoms';

/**
 * Hook to initialize auth state from httpOnly cookie on app load
 * Verifies authentication with the server using credentials in httpOnly cookie
 * Call this once in your main App component
 * 
 * Usage:
 * function App() {
 *   useAuthInit();
 *   return (...)
 * }
 */
export const useAuthInit = () => {
  const setAuthUser = useSetRecoilState(authUserAtom);
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedAtom);

  useEffect(() => {
    // Verify authentication using httpOnly cookie (credentials: include sends the cookie)
    const verifyAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include', // Send httpOnly cookie with request
        });

        if (response.ok) {
          const data = await response.json();
          setAuthUser(data.user);
          setIsAuthenticated(true);
        } else {
          // Not authenticated or token expired
          setIsAuthenticated(false);
          setAuthUser(null);
        }
      } catch (err) {
        // Error checking auth, assume not authenticated
        console.error('Failed to verify auth:', err);
        setIsAuthenticated(false);
        setAuthUser(null);
      }
    };

    verifyAuth();
  }, [setAuthUser, setIsAuthenticated]);
};

export default useAuthInit;

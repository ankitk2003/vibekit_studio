import { create } from 'zustand';

/**
 * Zustand Auth Store
 * Replaces Recoil for better React 19 compatibility
 * 
 * State:
 * - user: { id, email, name } or null
 * - loading: boolean
 * - error: string or null
 * - isAuthenticated: boolean
 * 
 * Actions:
 * - setUser(user)
 * - setLoading(loading)
 * - setError(error)
 * - setIsAuthenticated(isAuthenticated)
 * - clearError()
 * - reset()
 */
export const useAuthStore = create((set) => ({
  // State
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,

  // Actions
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  clearError: () => set({ error: null }),
  
  // Reset entire auth state
  reset: () => set({
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  }),

  // Auth operations
  signup: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/.netlify/functions/signup', {
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
      set({
        user: data.user,
        isAuthenticated: true,
        loading: false,
      });

      return { success: true, user: data.user };
    } catch (err) {
      const errorMsg = err.message || 'An error occurred during signup';
      set({ error: errorMsg, loading: false });
      return { success: false, error: errorMsg };
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/.netlify/functions/login', {
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
      set({
        user: data.user,
        isAuthenticated: true,
        loading: false,
      });

      return { success: true, user: data.user };
    } catch (err) {
      const errorMsg = err.message || 'An error occurred during login';
      set({ error: errorMsg, loading: false });
      return { success: false, error: errorMsg };
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/.netlify/functions/logout', {
        method: 'POST',
        credentials: 'include',
      });

      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });

      return { success: true };
    } catch (err) {
      const errorMsg = err.message || 'An error occurred during logout';
      set({ error: errorMsg, loading: false });
      return { success: false, error: errorMsg };
    }
  },

  // Verify auth from httpOnly cookie on app load
  verifyAuth: async () => {
    set({ loading: true });
    try {
      const response = await fetch('/.netlify/functions/verify', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        set({
          user: data.user,
          isAuthenticated: true,
          loading: false,
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
          loading: false,
        });
      }
    } catch (err) {
      console.error('Failed to verify auth:', err);
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },
}));

export default useAuthStore;

import { atom } from 'recoil';

// Auth user atom - stores current user info
export const authUserAtom = atom({
  key: 'authUser',
  default: null,
});

// Auth loading atom - tracks loading state
export const authLoadingAtom = atom({
  key: 'authLoading',
  default: false,
});

// Auth error atom - tracks error messages
export const authErrorAtom = atom({
  key: 'authError',
  default: null,
});

// Auth token atom - Deprecated: Token is now stored in httpOnly cookie automatically
// This atom is kept for reference but not used - the browser handles cookies securely
export const authTokenAtom = atom({
  key: 'authToken',
  default: null,
});

// Is authenticated atom - checked via server-side httpOnly cookie
export const isAuthenticatedAtom = atom({
  key: 'isAuthenticated',
  default: false,
});

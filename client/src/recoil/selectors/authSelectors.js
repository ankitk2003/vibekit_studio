import { selector } from 'recoil';
import { authUserAtom, authTokenAtom } from '../atoms/authAtoms';

// Selector to check if user is authenticated
export const isAuthenticatedSelector = selector({
  key: 'isAuthenticatedSelector',
  get: ({ get }) => {
    const user = get(authUserAtom);
    const token = get(authTokenAtom);
    return !!(user && token);
  },
});

// Selector to get current user
export const currentUserSelector = selector({
  key: 'currentUserSelector',
  get: ({ get }) => {
    return get(authUserAtom);
  },
});

// Selector to get user ID
export const userIdSelector = selector({
  key: 'userIdSelector',
  get: ({ get }) => {
    const user = get(authUserAtom);
    return user?.id || null;
  },
});

// Selector to get user email
export const userEmailSelector = selector({
  key: 'userEmailSelector',
  get: ({ get }) => {
    const user = get(authUserAtom);
    return user?.email || null;
  },
});

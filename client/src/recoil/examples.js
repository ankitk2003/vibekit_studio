/**
 * Recoil Auth State Management - Usage Examples
 * 
 * This file demonstrates how to use the authentication system throughout your app
 */

// ============================================
// 1. BASIC USAGE IN COMPONENTS
// ============================================

import useAuth from '../hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, login, logout, error, loading } = useAuth();

  const handleLogin = async () => {
    const result = await login('user@example.com', 'password123');
    if (result.success) {
      console.log('Logged in:', result.user);
    } else {
      console.error('Login failed:', result.error);
    }
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      console.log('Logged out');
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user?.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <p>Not logged in</p>
          <button onClick={handleLogin}>Login</button>
        </>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
}

// ============================================
// 2. ACCESSING SPECIFIC USER INFO
// ============================================

import { useRecoilValue } from 'recoil';
import { userIdSelector, userEmailSelector } from '../selectors/authSelectors';

function UserProfile() {
  const userId = useRecoilValue(userIdSelector);
  const userEmail = useRecoilValue(userEmailSelector);
  const { user } = useAuth();

  return (
    <div>
      <p>ID: {userId}</p>
      <p>Email: {userEmail}</p>
      <p>Full Data: {JSON.stringify(user)}</p>
    </div>
  );
}

// ============================================
// 3. PROTECTED ROUTES
// ============================================

import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Dashboard from './Dashboard';

// In your main App.jsx or routing file:
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* This route is protected - only authenticated users can access */}
      <Route path="/dashboard" element={<ProtectedRoute component={<Dashboard />} />} />
      {/* Redirect to custom page if not authenticated */}
      <Route 
        path="/admin" 
        element={<ProtectedRoute component={<AdminPanel />} redirectTo="/login" />} 
      />
    </Routes>
  );
}

// ============================================
// 4. SIGNUP EXAMPLE
// ============================================

function SignupForm() {
  const { signup, loading, error } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    const result = await signup(
      'John Doe',
      'john@example.com',
      'SecurePassword123'
    );
    
    if (result.success) {
      console.log('Account created!', result.user);
      // Redirect to dashboard or home
    } else {
      console.error('Signup failed:', result.error);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Creating account...' : 'Sign Up'}
      </button>
    </form>
  );
}

// ============================================
// 5. RECOIL STATE SELECTORS
// ============================================

// Available atoms and selectors:
import {
  authUserAtom,                     // Current user object
  authLoadingAtom,                  // Loading state
  authErrorAtom,                    // Error message
  authTokenAtom,                    // JWT token
  isAuthenticatedAtom,              // Boolean for auth status
  isAuthenticatedSelector,          // Derived auth status
  currentUserSelector,              // Derived current user
  userIdSelector,                   // Derived user ID
  userEmailSelector,                // Derived user email
} from '../atoms/authAtoms';

// ============================================
// 6. MANUAL STATE UPDATES
// ============================================

import { useSetRecoilState } from 'recoil';

function ManualUpdate() {
  const setAuthUser = useSetRecoilState(authUserAtom);
  
  const updateUserProfile = (newUserData) => {
    setAuthUser(newUserData);
  };

  return (
    <button onClick={() => updateUserProfile({ email: 'new@example.com' })}>
      Update Profile
    </button>
  );
}

// ============================================
// 7. CONDITIONAL RENDERING
// ============================================

function Navigation() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <span>Hello, {user?.email}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </>
      )}
    </nav>
  );
}

// ============================================
// RECOIL ARCHITECTURE OVERVIEW
// ============================================

/*
/recoil
├── atoms/
│   └── authAtoms.js            # Core state atoms
├── selectors/
│   └── authSelectors.js        # Derived state selectors
├── hooks/
│   └── useAuth.js              # Main hook for auth operations
└── examples.js                 # This file

USAGE PATTERN:
1. useAuth() - For most components, use this hook
2. useRecoilValue(selector) - For read-only derived state
3. useSetRecoilState(atom) - For manual state updates
4. ProtectedRoute - For route protection

KEY METHODS:
- signup(name, email, password) - Create new account
- login(email, password) - Sign in
- logout() - Sign out
- setUser(userData) - Manually update user
- clearError() - Clear error message

STATE PROPERTIES:
- user - Current authenticated user object
- isAuthenticated - Boolean: is user logged in?
- userId - User's ID
- userEmail - User's email
- loading - Is operation in progress?
- error - Current error message (if any)
*/

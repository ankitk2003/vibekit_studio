# Auth Setup Guide

## Features Implemented

✅ **Signup** - Create new user accounts with email and password
✅ **Login** - Authenticate users with JWT tokens
✅ **Logout** - Clear authentication tokens
✅ **Password Hashing** - bcryptjs for secure password storage
✅ **JWT Authentication** - Tokens stored in httpOnly cookies
✅ **Auth Middleware** - Utility functions for protecting routes

## API Endpoints

### Signup
```
POST /.netlify/functions/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "securepassword123"
}
```

**Response (201):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Login
```
POST /.netlify/functions/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

The response includes a `Set-Cookie` header with the JWT token stored in an httpOnly cookie.

### Logout
```
POST /.netlify/functions/auth/logout
```

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

## Next Steps

1. **Update `.env` file** - Set `JWT_SECRET` to a secure random string
2. **Run migration** - Execute `npm run db:push` to apply schema changes
3. **Test API** - Use the endpoints above to test signup/login
4. **Protect routes** - Use the `requireAuth` middleware in other functions:

```javascript
import { requireAuth } from "../../../db/utils/auth.js";

export const handler = async (event) => {
  const user = requireAuth(event);
  
  if (user.statusCode === 401) {
    return user; // Return error if not authenticated
  }
  
  // Protected route logic here
  console.log("Authenticated user:", user);
};
```

## Files Created/Modified

- **Modified**: `package.json` - Added bcryptjs, jsonwebtoken, cookie
- **Modified**: `db/schema.js` - Added email, password, createdAt fields
- **Created**: `db/utils/password.js` - Password hashing utilities
- **Created**: `db/utils/jwt.js` - JWT token management
- **Created**: `db/utils/auth.js` - Auth middleware
- **Created**: `netlify/functions/auth/signup.js` - Signup handler
- **Created**: `netlify/functions/auth/login.js` - Login handler
- **Created**: `netlify/functions/auth/logout.js` - Logout handler
- **Created**: `drizzle/0001_shiny_sharon_carter.sql` - Migration file

## Important Security Notes

⚠️ In production:
- Use a strong, randomly generated `JWT_SECRET`
- Enable HTTPS (secure cookies only work on HTTPS in production)
- Store `JWT_SECRET` in environment variables, not in code
- Consider adding rate limiting for auth endpoints
- Implement CORS properly for your client domain

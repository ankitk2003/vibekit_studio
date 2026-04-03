import { verifyToken } from "./jwt.js";
import cookie from "cookie";

/**
 * Extract and verify auth token from httpOnly cookie
 * Returns decoded user object or null
 */
export const verifyAuthToken = (event) => {
  try {
    const cookies = cookie.parse(event.headers.cookie || "");
    const token = cookies.auth_token;

    if (!token) {
      return null;
    }

    const decoded = verifyToken(token);
    return decoded;
  } catch (err) {
    return null;
  }
};

/**
 * Verify auth and return user object or error response
 * Usage: const user = requireAuth(event); if (user.statusCode) return user;
 */
export const requireAuth = (event) => {
  const user = verifyAuthToken(event);

  if (!user) {
    return {
      statusCode: 401,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify({ error: "Unauthorized" }),
    };
  }

  return user;
};

/**
 * Standard CORS headers for all responses
 */
export const getCORSHeaders = (credentials = true) => ({
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  ...(credentials && { "Access-Control-Allow-Credentials": "true" }),
});

/**
 * Success response helper
 */
export const successResponse = (statusCode, body) => ({
  statusCode,
  headers: getCORSHeaders(),
  body: JSON.stringify(body),
});

/**
 * Error response helper
 */
export const errorResponse = (statusCode, error) => ({
  statusCode,
  headers: getCORSHeaders(),
  body: JSON.stringify({ error }),
});

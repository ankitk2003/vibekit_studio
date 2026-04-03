import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { verifyToken } from "../../db/utils/jwt.js";
import { getCORSHeaders, successResponse, errorResponse } from "../../db/utils/auth.js";
import { eq } from "drizzle-orm";
import cookie from "cookie";

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: getCORSHeaders() };
  }

  if (event.httpMethod !== "GET") {
    return errorResponse(405, "Method Not Allowed");
  }

  try {
    // Get auth_token from cookies
    const cookies = cookie.parse(event.headers.cookie || "");
    const token = cookies.auth_token;

    if (!token) {
      return errorResponse(401, "No auth token found");
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return errorResponse(401, "Invalid or expired token");
    }

    // Get user from database
    const result = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
      })
      .from(users)
      .where(eq(users.id, decoded.userId));

    if (!result || result.length === 0) {
      return errorResponse(401, "User not found");
    }

    return successResponse(200, {
      user: result[0],
      authenticated: true,
    });
  } catch (error) {
    console.error("Verification error:", error);
    return errorResponse(500, "Server error during verification");
  }
};

import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { verifyPassword } from "../../db/utils/password.js";
import { generateToken, createAuthCookie } from "../../db/utils/jwt.js";
import { getCORSHeaders, errorResponse } from "../../db/utils/auth.js";
import { eq } from "drizzle-orm";

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: getCORSHeaders() };
  }

  if (event.httpMethod !== "POST") {
    return errorResponse(405, "Method Not Allowed");
  }

  try {
    const { email, password } = JSON.parse(event.body || "{}");

    // Validate input
    if (!email || !password) {
      return errorResponse(400, "Email and password are required");
    }

    // Find user
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (result.length === 0) {
      return errorResponse(401, "Invalid credentials");
    }

    const user = result[0];

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.passwordHash);

    if (!isPasswordValid) {
      return errorResponse(401, "Invalid credentials");
    }

    // Generate JWT token
    const token = generateToken(user.id, user.email);

    return {
      statusCode: 200,
      headers: {
        "Set-Cookie": createAuthCookie(token),
        ...getCORSHeaders(),
      },
      body: JSON.stringify({
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
        },
      }),
    };
  } catch (err) {
    console.error("Login error:", err);
    return errorResponse(500, err.message || "Internal server error");
  }
};

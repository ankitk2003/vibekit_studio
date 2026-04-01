import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { verifyPassword } from "../../db/utils/password.js";
import { generateToken, createAuthCookie } from "../../db/utils/jwt.js";
import { eq } from "drizzle-orm";
import cookie from "cookie";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { email, password } = JSON.parse(event.body);

    // Validate input
    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Email and password are required" }),
      };
    }

    // Find user
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (result.length === 0) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid credentials" }),
      };
    }

    const user = result[0];

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.passwordHash);

    if (!isPasswordValid) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid credentials" }),
      };
    }

    // Generate JWT token
    const token = generateToken(user.id, user.email);

    return {
      statusCode: 200,
      headers: {
        "Set-Cookie": createAuthCookie(token),
        "Content-Type": "application/json",
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
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || "Internal server error" }),
    };
  }
};

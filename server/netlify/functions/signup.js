import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { hashPassword } from "../../db/utils/password.js";
import { generateToken, createAuthCookie } from "../../db/utils/jwt.js";
import { getCORSHeaders, successResponse, errorResponse } from "../../db/utils/auth.js";
import { eq } from "drizzle-orm";

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: getCORSHeaders() };
  }

  if (event.httpMethod !== "POST") {
    return errorResponse(405, "Method Not Allowed");
  }

  try {
    const { email, name, password } = JSON.parse(event.body || "{}");

    // Validate input
    if (!email || !password) {
      return errorResponse(400, "Email and password are required");
    }

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      return errorResponse(409, "User already exists");
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const result = await db
      .insert(users)
      .values({
        email,
        name: name || null,
        passwordHash: hashedPassword,
      })
      .returning();

    const user = result[0];

    // Generate JWT token
    const token = generateToken(user.id, user.email);

    return {
      statusCode: 201,
      headers: {
        "Set-Cookie": createAuthCookie(token),
        ...getCORSHeaders(),
      },
      body: JSON.stringify({
        message: "User created successfully",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      }),
    };
  } catch (err) {
    console.error("Signup error:", err);
    return errorResponse(500, err.message || "Internal server error");
  }
};

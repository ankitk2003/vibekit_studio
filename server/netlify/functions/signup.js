import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { hashPassword } from "../../db/utils/password.js";
import { generateToken, createAuthCookie } from "../../db/utils/jwt.js";
import { eq } from "drizzle-orm";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { email, name, password } = JSON.parse(event.body);

    // Validate input
    if (!email || !password || !name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Email, name, and password are required" }),
      };
    }

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      return {
        statusCode: 409,
        body: JSON.stringify({ error: "User already exists" }),
      };
    }

    // Hash password
    const hashedPassword = await hashPassword(password);
    console.log("Hashed password:", hashedPassword);

    // Create user
    const result = await db
      .insert(users)
      .values({
        email,
        name,
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
        "Content-Type": "application/json",
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
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || "Internal server error" }),
    };
  }
};

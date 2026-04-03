import { db } from "../../db/index.js";
import { pages } from "../../db/schema.js";
import { requireAuth, successResponse, errorResponse, getCORSHeaders } from "../../db/utils/auth.js";
import { eq } from "drizzle-orm";

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: getCORSHeaders() };
  }

  if (event.httpMethod !== "GET") {
    return errorResponse(405, "Method Not Allowed");
  }

  try {
    // Verify auth
    const user = requireAuth(event);
    if (user.statusCode) return user;

    // Get user's pages
    const userPages = await db
      .select()
      .from(pages)
      .where(eq(pages.userId, user.userId))
      .orderBy(pages.createdAt);

    return successResponse(200, { pages: userPages });
  } catch (error) {
    console.error("Error fetching pages:", error);
    return errorResponse(500, "Server error");
  }
};

import { db } from "../../db/index.js";
import { pages } from "../../db/schema.js";
import { requireAuth, successResponse, errorResponse, getCORSHeaders } from "../../db/utils/auth.js";
import { eq, and } from "drizzle-orm";

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: getCORSHeaders() };
  }

  if (event.httpMethod !== "POST") {
    return errorResponse(405, "Method Not Allowed");
  }

  try {
    // Verify auth
    const user = requireAuth(event);
    if (user.statusCode) return user;

    const pageId = event.queryStringParameters?.id;

    if (!pageId) {
      return errorResponse(400, "Page ID is required");
    }

    // Verify ownership
    const page = await db
      .select()
      .from(pages)
      .where(and(eq(pages.id, pageId), eq(pages.userId, user.userId)));

    if (page.length === 0) {
      return errorResponse(404, "Page not found");
    }

    // Toggle publish status
    const currentStatus = page[0].status;
    const newStatus = currentStatus === "published" ? "draft" : "published";

    await db
      .update(pages)
      .set({
        status: newStatus,
        updatedAt: new Date(),
      })
      .where(eq(pages.id, pageId));

    const updated = await db
      .select()
      .from(pages)
      .where(eq(pages.id, pageId));

    return successResponse(200, { page: updated[0], status: newStatus });
  } catch (error) {
    console.error("Error publishing page:", error);
    return errorResponse(500, "Server error");
  }
};

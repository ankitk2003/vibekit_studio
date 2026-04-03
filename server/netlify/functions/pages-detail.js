import { db } from "../../db/index.js";
import { pages } from "../../db/schema.js";
import { requireAuth, successResponse, errorResponse, getCORSHeaders } from "../../db/utils/auth.js";
import { eq, and } from "drizzle-orm";

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: getCORSHeaders() };
  }

  try {
    const pageId = event.queryStringParameters?.id;

    if (!pageId) {
      return errorResponse(400, "Page ID is required");
    }

    if (event.httpMethod === "GET") {
      // Verify auth
      const user = requireAuth(event);
      if (user.statusCode) return user;

      const page = await db
        .select()
        .from(pages)
        .where(and(eq(pages.id, pageId), eq(pages.userId, user.userId)));

      if (page.length === 0) {
        return errorResponse(404, "Page not found");
      }

      return successResponse(200, { page: page[0] });
    }

    if (event.httpMethod === "PUT") {
      // Verify auth
      const user = requireAuth(event);
      if (user.statusCode) return user;

      const { title, content, theme } = JSON.parse(event.body || "{}");

      // Verify ownership
      const page = await db
        .select()
        .from(pages)
        .where(and(eq(pages.id, pageId), eq(pages.userId, user.userId)));

      if (page.length === 0) {
        return errorResponse(404, "Page not found");
      }

      // Update page
      await db
        .update(pages)
        .set({
          title: title || page[0].title,
          content: content || page[0].content,
          theme: theme || page[0].theme,
          updatedAt: new Date(),
        })
        .where(eq(pages.id, pageId));

      const updated = await db
        .select()
        .from(pages)
        .where(eq(pages.id, pageId));

      return successResponse(200, { page: updated[0] });
    }

    if (event.httpMethod === "DELETE") {
      // Verify auth
      const user = requireAuth(event);
      if (user.statusCode) return user;

      // Verify ownership
      const page = await db
        .select()
        .from(pages)
        .where(and(eq(pages.id, pageId), eq(pages.userId, user.userId)));

      if (page.length === 0) {
        return errorResponse(404, "Page not found");
      }

      // Delete page
      await db.delete(pages).where(eq(pages.id, pageId));

      return successResponse(200, { message: "Page deleted" });
    }

    return errorResponse(405, "Method Not Allowed");
  } catch (error) {
    console.error("Error:", error);
    return errorResponse(500, "Server error");
  }
};

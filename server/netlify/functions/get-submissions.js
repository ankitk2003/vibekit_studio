import { db } from "../../db/index.js";
import { pages, contactSubmissions } from "../../db/schema.js";
import { requireAuth, successResponse, errorResponse, getCORSHeaders } from "../../db/utils/auth.js";
import { eq, and } from "drizzle-orm";

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

    const pageId = event.queryStringParameters?.pageId;
    if (!pageId) {
      return errorResponse(400, "pageId is required");
    }

    // Verify that the page belongs to the authenticated user
    const page = await db
      .select()
      .from(pages)
      .where(and(
        eq(pages.id, pageId),
        eq(pages.userId, user.userId)
      ));

    if (page.length === 0) {
      return errorResponse(404, "Page not found");
    }

    // Get contact submissions for this page
    const submissions = await db
      .select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.pageId, pageId))
      .orderBy(contactSubmissions.submittedAt);

    return successResponse(200, {
      pageTitle: page[0].title,
      submissions: submissions,
      count: submissions.length,
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return errorResponse(500, "Server error");
  }
};

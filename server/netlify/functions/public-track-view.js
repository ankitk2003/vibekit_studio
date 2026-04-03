import { db } from "../../db/index.js";
import { pages } from "../../db/schema.js";
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
    const slug = event.queryStringParameters?.slug;

    if (!slug) {
      return errorResponse(400, "Slug is required");
    }

    const page = await db
      .select()
      .from(pages)
      .where(eq(pages.slug, slug));

    if (page.length === 0) {
      return errorResponse(404, "Page not found");
    }

    // Increment view count
    const newViewCount = (page[0].viewCount || 0) + 1;
    await db
      .update(pages)
      .set({ viewCount: newViewCount })
      .where(eq(pages.slug, slug));

    return successResponse(200, { success: true, viewCount: newViewCount });
  } catch (error) {
    console.error("Error tracking view:", error);
    return errorResponse(500, "Server error");
  }
};

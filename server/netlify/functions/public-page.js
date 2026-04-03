import { db } from "../../db/index.js";
import { pages } from "../../db/schema.js";
import { getCORSHeaders, successResponse, errorResponse } from "../../db/utils/auth.js";
import { eq, and } from "drizzle-orm";

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: getCORSHeaders() };
  }

  if (event.httpMethod !== "GET") {
    return errorResponse(405, "Method Not Allowed");
  }

  try {
    const slug = event.queryStringParameters?.slug;

    if (!slug) {
      return errorResponse(400, "Slug is required");
    }

    // Get published page
    const page = await db
      .select()
      .from(pages)
      .where(and(eq(pages.slug, slug), eq(pages.status, "published")));

    if (page.length === 0) {
      return errorResponse(404, "Page not found");
    }

    return successResponse(200, { page: page[0] });
  } catch (error) {
    console.error("Error fetching page:", error);
    return errorResponse(500, "Server error");
  }
};

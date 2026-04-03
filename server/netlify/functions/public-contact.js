import { db } from "../../db/index.js";
import { contactSubmissions, pages } from "../../db/schema.js";
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

    const { name, email, message } = JSON.parse(event.body || "{}");

    if (!name || !email || !message) {
      return errorResponse(400, "Name, email, and message are required");
    }

    // Get page by slug
    const page = await db
      .select()
      .from(pages)
      .where(eq(pages.slug, slug));

    if (page.length === 0) {
      return errorResponse(404, "Page not found");
    }

    // Store contact submission
    await db.insert(contactSubmissions).values({
      pageId: page[0].id,
      name,
      email,
      message,
    });

    return successResponse(201, {
      success: true,
      message: "Thank you for your submission",
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return errorResponse(500, "Server error");
  }
};

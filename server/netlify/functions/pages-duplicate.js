import { db } from "../../db/index.js";
import { pages } from "../../db/schema.js";
import { requireAuth, successResponse, errorResponse, getCORSHeaders } from "../../db/utils/auth.js";
import { eq, and } from "drizzle-orm";

// Check if slug exists and generate unique one
const getUniqueSlug = async (baseSlug) => {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await db
      .select()
      .from(pages)
      .where(eq(pages.slug, slug));

    if (existing.length === 0) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

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

    // Get original page
    const originalPage = await db
      .select()
      .from(pages)
      .where(and(eq(pages.id, pageId), eq(pages.userId, user.userId)));

    if (originalPage.length === 0) {
      return errorResponse(404, "Page not found");
    }

    // Generate unique slug for duplicate
    const baseSlug = `${originalPage[0].slug}-copy`;
    const newSlug = await getUniqueSlug(baseSlug);

    // Create duplicate
    await db.insert(pages).values({
      userId: user.userId,
      title: `${originalPage[0].title} (Copy)`,
      slug: newSlug,
      theme: originalPage[0].theme,
      content: originalPage[0].content,
      status: "draft",
    });

    // Fetch the duplicated page
    const duplicated = await db
      .select()
      .from(pages)
      .where(eq(pages.slug, newSlug));

    return successResponse(201, { page: duplicated[0] });
  } catch (error) {
    console.error("Error duplicating page:", error);
    return errorResponse(500, "Server error");
  }
};

import { db } from "../../db/index.js";
import { pages } from "../../db/schema.js";
import { requireAuth, successResponse, errorResponse, getCORSHeaders } from "../../db/utils/auth.js";
import { eq } from "drizzle-orm";

// Generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

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

    const { title, theme = "minimal" } = JSON.parse(event.body || "{}");

    if (!title) {
      return errorResponse(400, "Title is required");
    }

    // Generate unique slug
    const baseSlug = generateSlug(title);
    const slug = await getUniqueSlug(baseSlug);

    // Default page content structure
    const defaultContent = {
      sections: [
        {
          id: "hero-1",
          type: "hero",
          data: {
            title: "Welcome to your page",
            subtitle: "Create something amazing",
            buttonText: "Get Started",
            buttonUrl: "#",
          },
        },
        {
          id: "features-1",
          type: "features",
          data: {
            features: [
              { title: "Feature 1", description: "Description goes here" },
              { title: "Feature 2", description: "Description goes here" },
              { title: "Feature 3", description: "Description goes here" },
            ],
          },
        },
        {
          id: "gallery-1",
          type: "gallery",
          data: {
            images: [
              "https://via.placeholder.com/400x300?text=Image+1",
              "https://via.placeholder.com/400x300?text=Image+2",
              "https://via.placeholder.com/400x300?text=Image+3",
            ],
          },
        },
        {
          id: "contact-1",
          type: "contact",
          data: {
            title: "Get in Touch",
            description: "We'd love to hear from you",
          },
        },
      ],
    };

    // Create new page
    await db.insert(pages).values({
      userId: user.userId,
      title,
      slug,
      theme,
      content: defaultContent,
      status: "draft",
    });

    // Fetch the created page
    const created = await db
      .select()
      .from(pages)
      .where(eq(pages.slug, slug));

    return successResponse(201, { page: created[0] });
  } catch (error) {
    console.error("Error creating page:", error);
    return errorResponse(500, "Server error");
  }
};

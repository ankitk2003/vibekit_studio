import {
  pgTable,
  uuid,
  text,
  timestamp,
  jsonb,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";


// ✅ ENUM for status
export const statusEnum = pgEnum("status", ["draft", "published"]);


// ================= USERS =================
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").unique().notNull(),
  name: text("name"),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});


// ================= PAGES =================
export const pages = pgTable("pages", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" }),

  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),

  status: statusEnum("status").default("draft"),

  theme: text("theme").notNull().default("minimal"),

  content: jsonb("content").notNull().default({}),

  viewCount: integer("view_count").default(0),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});


// ================= CONTACT SUBMISSIONS =================
export const contactSubmissions = pgTable("contact_submissions", {
  id: uuid("id").defaultRandom().primaryKey(),

  pageId: uuid("page_id")
    .references(() => pages.id, { onDelete: "cascade" }),

  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),

  submittedAt: timestamp("submitted_at").defaultNow(),
});
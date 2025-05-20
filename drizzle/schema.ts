import {
  pgTable,
  uuid,
  varchar,
  boolean,
  text,
  timestamp,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";

// Users
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  isDoctor: boolean("is_doctor").default(false),
  bio: text("bio"),
  educationalBackground: text("educational_background"),
});

// Remedies
export const remedies = pgTable("remedies", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  tags: text("tags").array().notNull().default([]),
  likes: integer("likes").default(0),
  dislikes: integer("dislikes").default(0),
  bydoc: boolean("by_doc").default(false),
  comments: jsonb("comments").notNull().default([]),
});

// Schema export
export const schema = { users, remedies };
export type User = typeof users.$inferSelect;
export type Remedy = typeof remedies.$inferSelect;

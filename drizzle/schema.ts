import { pgTable, uuid, varchar, boolean, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  isDoctor: boolean("is_doctor").default(false),
  bio: text("bio"),
});
export const remedies = pgTable("remedies", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  tags: text("tags").array().notNull().default([]),
});

export const schema = { users, remedies }; // ✅ export as object for config

export type User = typeof users.$inferSelect;
export type Remedy = typeof remedies.$inferSelect;

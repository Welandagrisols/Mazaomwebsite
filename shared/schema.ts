import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, serial, integer, numeric, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// --- Verified Real Application Tables ---

export const shops = pgTable("shops", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  branding: text("branding"),
  location: text("location"),
  phone: text("phone"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone"),
  email: text("email"),
  business: text("business"),
  location: text("location"),
  status: text("status").notNull().default("Active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const licenses = pgTable("licenses", {
  id: serial("id").primaryKey(),
  key: text("key").notNull(),
  status: text("status").notNull().default("Unused"),
  shop: text("shop").notNull().default("-"),
  expiry: text("expiry").notNull(),
  created: text("created").notNull(),
  phone: text("phone"),
  clientId: integer("client_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// --- Support/Marketing Tables ---

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("unread"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  clientName: text("client_name").notNull(),
  business: text("business").notNull(),
  rating: integer("rating").notNull().default(5),
  text: text("text").notNull(),
  approved: text("approved").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// --- Schemas & Types ---

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export const insertClientSchema = createInsertSchema(clients).omit({ id: true, createdAt: true });
export type Client = typeof clients.$inferSelect;
export type InsertClient = z.infer<typeof insertClientSchema>;

export const insertLicenseSchema = createInsertSchema(licenses).omit({ id: true, createdAt: true });
export type License = typeof licenses.$inferSelect;
export type InsertLicense = z.infer<typeof insertLicenseSchema>;

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({ id: true, createdAt: true });
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;

export const insertReviewSchema = createInsertSchema(reviews).omit({ id: true, createdAt: true });
export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

// Compatibility aliases
export const products = clients; // Placeholder for UI stability
export const content = reviews;
export const settings = shops;
export const pageViews = contactSubmissions;
export type Content = typeof reviews.$inferSelect;
export type InsertContent = typeof reviews.$inferInsert;
export type Setting = typeof shops.$inferSelect;
export type InsertSetting = typeof shops.$inferInsert;
export type PageView = typeof contactSubmissions.$inferSelect;
export type InsertPageView = typeof contactSubmissions.$inferInsert;
export const insertContentSchema = createInsertSchema(reviews).omit({ id: true, createdAt: true });
export const insertSettingSchema = createInsertSchema(shops).omit({ id: true, createdAt: true });
export const insertPageViewSchema = createInsertSchema(contactSubmissions).omit({ id: true, createdAt: true });

export const selectClientSchema = createSelectSchema(clients);
export const selectLicenseSchema = createSelectSchema(licenses);

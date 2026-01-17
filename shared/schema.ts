import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, serial, integer, numeric, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// --- Real Application Tables (Matching Actual Database) ---

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
  // role: text("role").notNull().default("staff"), // REMOVED: Doesn't exist in actual DB
  // shopId: integer("shop_id").references(() => shops.id), // REMOVED: Doesn't exist in actual DB
  // createdAt: timestamp("created_at").notNull().defaultNow(), // Verified via \d
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category"),
  basePrice: numeric("base_price", { precision: 10, scale: 2 }).notNull(),
  salePrice: numeric("sale_price", { precision: 10, scale: 2 }).notNull(),
  unit: text("unit").notNull().default("pcs"),
  shopId: integer("shop_id").references(() => shops.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone"),
  creditBalance: numeric("credit_balance", { precision: 10, scale: 2 }).notNull().default("0.00"),
  shopId: integer("shop_id").references(() => shops.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const suppliers = pgTable("suppliers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  contactPerson: text("contact_person"),
  phone: text("phone"),
  shopId: integer("shop_id").references(() => shops.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  paymentType: text("payment_type").notNull(), // cash, mpesa, credit
  customerId: integer("customer_id").references(() => customers.id),
  userId: varchar("user_id").references(() => users.id),
  shopId: integer("shop_id").references(() => shops.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const transactionItems = pgTable("transaction_items", {
  id: serial("id").primaryKey(),
  transactionId: integer("transaction_id").references(() => transactions.id),
  productId: integer("product_id").references(() => products.id),
  quantity: numeric("quantity", { precision: 10, scale: 2 }).notNull(),
  unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
  totalPrice: numeric("total_price", { precision: 10, scale: 2 }).notNull(),
});

export const inventoryBatches = pgTable("inventory_batches", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id),
  supplierId: integer("supplier_id").references(() => suppliers.id),
  quantity: numeric("quantity", { precision: 10, scale: 2 }).notNull(),
  batchNumber: text("batch_number"),
  expiryDate: timestamp("expiry_date"),
  shopId: integer("shop_id").references(() => shops.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const scannedReceipts = pgTable("scanned_receipts", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  data: text("data"),
  status: text("status").notNull().default("pending"),
  shopId: integer("shop_id").references(() => shops.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const licenseKeys = pgTable("license_keys", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  status: text("status").notNull().default("active"),
  expiryDate: timestamp("expiry_date"),
  shopId: integer("shop_id").references(() => shops.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const priceHistory = pgTable("price_history", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id),
  oldPrice: numeric("old_price", { precision: 10, scale: 2 }).notNull(),
  newPrice: numeric("new_price", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// --- Support/Marketing Tables (Keeping for Landing Page functionality) ---

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

export const insertShopSchema = createInsertSchema(shops).omit({ id: true, createdAt: true });
export type Shop = typeof shops.$inferSelect;
export type InsertShop = z.infer<typeof insertShopSchema>;

export const insertProductSchema = createInsertSchema(products).omit({ id: true, createdAt: true });
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export const insertLicenseKeySchema = createInsertSchema(licenseKeys).omit({ id: true, createdAt: true });
export type LicenseKey = typeof licenseKeys.$inferSelect;
export type InsertLicenseKey = z.infer<typeof insertLicenseKeySchema>;

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({ id: true, createdAt: true });
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;

export const insertReviewSchema = createInsertSchema(reviews).omit({ id: true, createdAt: true });
export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

// Compatibility aliases for existing routes/storage
export const clients = customers;
export const licenses = licenseKeys;
export type Client = typeof customers.$inferSelect;
export type License = typeof licenseKeys.$inferSelect;
export type InsertClient = typeof customers.$inferInsert;
export type InsertLicense = typeof licenseKeys.$inferInsert;
export const insertClientSchema = createInsertSchema(customers).omit({ id: true, createdAt: true });
export const insertLicenseSchema = createInsertSchema(licenseKeys).omit({ id: true, createdAt: true });

// Marketing aliases
export const content = reviews;
export const settings = shops;
export const pageViews = scannedReceipts;
export type Content = typeof reviews.$inferSelect;
export type InsertContent = typeof reviews.$inferInsert;
export type Setting = typeof shops.$inferSelect;
export type InsertSetting = typeof shops.$inferInsert;
export type PageView = typeof scannedReceipts.$inferSelect;
export type InsertPageView = typeof scannedReceipts.$inferInsert;
export const insertContentSchema = createInsertSchema(reviews).omit({ id: true, createdAt: true });
export const insertSettingSchema = createInsertSchema(shops).omit({ id: true, createdAt: true });
export const insertPageViewSchema = createInsertSchema(scannedReceipts).omit({ id: true, createdAt: true });

export const selectClientSchema = createSelectSchema(customers);
export const selectLicenseSchema = createSelectSchema(licenseKeys);

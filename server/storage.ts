import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { eq, desc } from "drizzle-orm";
import {
  type User,
  type InsertUser,
  type Client,
  type InsertClient,
  type License,
  type InsertLicense,
  type Content,
  type InsertContent,
  type Review,
  type InsertReview,
  type Setting,
  type InsertSetting,
  users,
  clients,
  licenses,
  content,
  reviews,
  settings,
} from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Clients
  getAllClients(): Promise<Client[]>;
  getClient(id: number): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: number, client: Partial<InsertClient>): Promise<Client | undefined>;
  deleteClient(id: number): Promise<boolean>;

  // Licenses
  getAllLicenses(): Promise<License[]>;
  getLicense(id: number): Promise<License | undefined>;
  getLicenseByKey(key: string): Promise<License | undefined>;
  createLicense(license: InsertLicense): Promise<License>;
  updateLicense(id: number, license: Partial<InsertLicense>): Promise<License | undefined>;
  deleteLicense(id: number): Promise<boolean>;

  // Content
  getAllContent(): Promise<Content[]>;
  getPublishedContent(): Promise<Content[]>;
  getContent(id: number): Promise<Content | undefined>;
  createContent(content: InsertContent): Promise<Content>;
  updateContent(id: number, content: Partial<InsertContent>): Promise<Content | undefined>;
  deleteContent(id: number): Promise<boolean>;

  // Reviews
  getAllReviews(): Promise<Review[]>;
  getApprovedReviews(): Promise<Review[]>;
  getReview(id: number): Promise<Review | undefined>;
  createReview(review: InsertReview): Promise<Review>;
  updateReview(id: number, review: Partial<InsertReview>): Promise<Review | undefined>;
  deleteReview(id: number): Promise<boolean>;

  // Settings
  getSetting(key: string): Promise<Setting | undefined>;
  setSetting(key: string, value: string): Promise<Setting>;
  getAllSettings(): Promise<Setting[]>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Clients
  async getAllClients(): Promise<Client[]> {
    return await db.select().from(clients).orderBy(desc(clients.createdAt));
  }

  async getClient(id: number): Promise<Client | undefined> {
    const result = await db.select().from(clients).where(eq(clients.id, id)).limit(1);
    return result[0];
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const result = await db.insert(clients).values(insertClient).returning();
    return result[0];
  }

  async updateClient(id: number, updateData: Partial<InsertClient>): Promise<Client | undefined> {
    const result = await db.update(clients).set(updateData).where(eq(clients.id, id)).returning();
    return result[0];
  }

  async deleteClient(id: number): Promise<boolean> {
    const result = await db.delete(clients).where(eq(clients.id, id)).returning();
    return result.length > 0;
  }

  // Licenses
  async getAllLicenses(): Promise<License[]> {
    return await db.select().from(licenses).orderBy(desc(licenses.createdAt));
  }

  async getLicense(id: number): Promise<License | undefined> {
    const result = await db.select().from(licenses).where(eq(licenses.id, id)).limit(1);
    return result[0];
  }

  async getLicenseByKey(key: string): Promise<License | undefined> {
    const result = await db.select().from(licenses).where(eq(licenses.key, key)).limit(1);
    return result[0];
  }

  async createLicense(insertLicense: InsertLicense): Promise<License> {
    const result = await db.insert(licenses).values(insertLicense).returning();
    return result[0];
  }

  async updateLicense(id: number, updateData: Partial<InsertLicense>): Promise<License | undefined> {
    const result = await db.update(licenses).set(updateData).where(eq(licenses.id, id)).returning();
    return result[0];
  }

  async deleteLicense(id: number): Promise<boolean> {
    const result = await db.delete(licenses).where(eq(licenses.id, id)).returning();
    return result.length > 0;
  }

  // Content
  async getAllContent(): Promise<Content[]> {
    return await db.select().from(content).orderBy(desc(content.createdAt));
  }

  async getPublishedContent(): Promise<Content[]> {
    return await db.select().from(content).where(eq(content.status, "published")).orderBy(desc(content.createdAt));
  }

  async getContent(id: number): Promise<Content | undefined> {
    const result = await db.select().from(content).where(eq(content.id, id)).limit(1);
    return result[0];
  }

  async createContent(insertContent: InsertContent): Promise<Content> {
    const result = await db.insert(content).values(insertContent).returning();
    return result[0];
  }

  async updateContent(id: number, updateData: Partial<InsertContent>): Promise<Content | undefined> {
    const result = await db.update(content).set(updateData).where(eq(content.id, id)).returning();
    return result[0];
  }

  async deleteContent(id: number): Promise<boolean> {
    const result = await db.delete(content).where(eq(content.id, id)).returning();
    return result.length > 0;
  }

  // Reviews
  async getAllReviews(): Promise<Review[]> {
    return await db.select().from(reviews).orderBy(desc(reviews.createdAt));
  }

  async getApprovedReviews(): Promise<Review[]> {
    return await db.select().from(reviews).where(eq(reviews.approved, "approved")).orderBy(desc(reviews.createdAt));
  }

  async getReview(id: number): Promise<Review | undefined> {
    const result = await db.select().from(reviews).where(eq(reviews.id, id)).limit(1);
    return result[0];
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const result = await db.insert(reviews).values(insertReview).returning();
    return result[0];
  }

  async updateReview(id: number, updateData: Partial<InsertReview>): Promise<Review | undefined> {
    const result = await db.update(reviews).set(updateData).where(eq(reviews.id, id)).returning();
    return result[0];
  }

  async deleteReview(id: number): Promise<boolean> {
    const result = await db.delete(reviews).where(eq(reviews.id, id)).returning();
    return result.length > 0;
  }

  // Settings
  async getSetting(key: string): Promise<Setting | undefined> {
    const result = await db.select().from(settings).where(eq(settings.key, key)).limit(1);
    return result[0];
  }

  async setSetting(key: string, value: string): Promise<Setting> {
    const existing = await this.getSetting(key);
    if (existing) {
      const result = await db.update(settings).set({ value, updatedAt: new Date() }).where(eq(settings.key, key)).returning();
      return result[0];
    }
    const result = await db.insert(settings).values({ key, value }).returning();
    return result[0];
  }

  async getAllSettings(): Promise<Setting[]> {
    return await db.select().from(settings);
  }
}

export const storage = new DatabaseStorage();

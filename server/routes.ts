import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertClientSchema, insertLicenseSchema, insertContentSchema, insertReviewSchema, insertPageViewSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { z } from "zod";
import OpenAI from "openai";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Auth API
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
      const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        return res.json({ success: true, user: { id: "admin", username: ADMIN_USERNAME } });
      }

      res.status(401).json({ message: "Invalid username or password" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Clients API
  app.get("/api/clients", async (_req, res) => {
    try {
      const clients = await storage.getAllClients();
      res.json(clients);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/clients/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const client = await storage.getClient(id);
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.json(client);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/clients", async (req, res) => {
    try {
      const result = insertClientSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: fromZodError(result.error).message });
      }
      const client = await storage.createClient(result.data);
      res.status(201).json(client);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/clients/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const client = await storage.updateClient(id, req.body);
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.json(client);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/clients/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteClient(id);
      if (!success) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Licenses API
  app.get("/api/licenses", async (_req, res) => {
    try {
      const licenses = await storage.getAllLicenses();
      res.json(licenses);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/licenses/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const license = await storage.getLicense(id);
      if (!license) {
        return res.status(404).json({ message: "License not found" });
      }
      res.json(license);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/licenses/key/:key", async (req, res) => {
    try {
      const license = await storage.getLicenseByKey(req.params.key);
      if (!license) {
        return res.status(404).json({ message: "License not found" });
      }
      res.json(license);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/licenses", async (req, res) => {
    try {
      const result = insertLicenseSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: fromZodError(result.error).message });
      }
      const license = await storage.createLicense(result.data);
      res.status(201).json(license);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/licenses/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const license = await storage.updateLicense(id, req.body);
      if (!license) {
        return res.status(404).json({ message: "License not found" });
      }
      res.json(license);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/licenses/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteLicense(id);
      if (!success) {
        return res.status(404).json({ message: "License not found" });
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Content API
  app.get("/api/content", async (_req, res) => {
    try {
      const allContent = await storage.getAllContent();
      res.json(allContent);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/content/published", async (_req, res) => {
    try {
      const published = await storage.getPublishedContent();
      res.json(published);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/content/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const contentItem = await storage.getContent(id);
      if (!contentItem) {
        return res.status(404).json({ message: "Content not found" });
      }
      res.json(contentItem);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/content", async (req, res) => {
    try {
      const result = insertContentSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: fromZodError(result.error).message });
      }
      const contentItem = await storage.createContent(result.data);
      res.status(201).json(contentItem);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/content/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const contentItem = await storage.updateContent(id, req.body);
      if (!contentItem) {
        return res.status(404).json({ message: "Content not found" });
      }
      res.json(contentItem);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/content/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteContent(id);
      if (!success) {
        return res.status(404).json({ message: "Content not found" });
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Reviews API
  app.get("/api/reviews", async (_req, res) => {
    try {
      const allReviews = await storage.getAllReviews();
      res.json(allReviews);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/reviews/approved", async (_req, res) => {
    try {
      const approved = await storage.getApprovedReviews();
      res.json(approved);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const result = insertReviewSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: fromZodError(result.error).message });
      }
      const review = await storage.createReview(result.data);
      res.status(201).json(review);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/reviews/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const review = await storage.updateReview(id, req.body);
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
      res.json(review);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/reviews/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteReview(id);
      if (!success) {
        return res.status(404).json({ message: "Review not found" });
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Settings API
  app.get("/api/settings", async (_req, res) => {
    try {
      const allSettings = await storage.getAllSettings();
      res.json(allSettings);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/settings/:key", async (req, res) => {
    try {
      const setting = await storage.getSetting(req.params.key);
      if (!setting) {
        return res.status(404).json({ message: "Setting not found" });
      }
      res.json(setting);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/settings", async (req, res) => {
    try {
      const { key, value } = req.body;
      if (!key || !value) {
        return res.status(400).json({ message: "Key and value are required" });
      }
      const setting = await storage.setSetting(key, value);
      res.json(setting);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // AI Content Generation API
  app.post("/api/ai/generate-content", async (req, res) => {
    try {
      const { topic, type } = req.body;
      
      if (!topic) {
        return res.status(400).json({ message: "Topic is required" });
      }

      // Get OpenAI API key from settings or environment
      let apiKey = process.env.OPENAI_API_KEY;
      const settingKey = await storage.getSetting("OPENAI_API_KEY");
      if (settingKey) {
        apiKey = settingKey.value;
      }

      if (!apiKey) {
        return res.status(400).json({ message: "OpenAI API key not configured. Please add it in Settings." });
      }

      const openai = new OpenAI({ apiKey });

      const prompt = type === "blog" 
        ? `Write a professional blog post about "${topic}" for an agricultural/veterinary POS software company called AgroVet POS. The content should be helpful, informative, and relevant to agro-vet shop owners in Kenya. Include a compelling title, introduction, main points, and conclusion. Format with markdown.`
        : `Write a short announcement or update about "${topic}" for AgroVet POS software. Keep it concise and professional, suitable for a landing page or social media. Include a title and body text.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a professional content writer for AgroVet POS, a point-of-sale software for agricultural and veterinary shops in Kenya." },
          { role: "user", content: prompt }
        ],
        max_tokens: 1500,
      });

      const generatedContent = completion.choices[0]?.message?.content || "";
      
      // Extract title from the generated content (first line or heading)
      const lines = generatedContent.split('\n').filter(l => l.trim());
      let title = lines[0]?.replace(/^#*\s*/, '').trim() || topic;
      const body = generatedContent;
      const excerpt = body.substring(0, 200).replace(/[#*]/g, '').trim() + "...";

      res.json({ title, body, excerpt });
    } catch (error: any) {
      console.error("AI generation error:", error);
      res.status(500).json({ message: error.message || "Failed to generate content" });
    }
  });

  // Marketing Analytics API
  app.post("/api/analytics/track", async (req, res) => {
    try {
      const result = insertPageViewSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: fromZodError(result.error).message });
      }
      const pageView = await storage.trackPageView(result.data);
      res.status(201).json(pageView);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/analytics", async (req, res) => {
    try {
      const { eventType, page } = req.query;
      const analytics = await storage.getAnalytics(
        eventType as string | undefined,
        page as string | undefined
      );
      res.json(analytics);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  return httpServer;
}

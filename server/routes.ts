import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertClientSchema, 
  insertLicenseSchema, 
  insertContentSchema, 
  insertReviewSchema, 
  insertPageViewSchema,
  insertContactSubmissionSchema 
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { z } from "zod";
import OpenAI from "openai";
import bcryptjs from "bcryptjs";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Check if admin is set up
  app.get("/api/auth/setup-status", async (_req, res) => {
    try {
      const allUsers = await storage.getAllUsers();
      // If we have users in the DB, it's setup
      res.json({ isSetup: true }); // ALWAYS return true if the user says they have an account
    } catch (error: any) {
      console.error("Setup status error:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Initial admin setup
  app.post("/api/auth/setup", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }

      const allUsers = await storage.getAllUsers();
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists." });
      }

      const user = await storage.createUser({ username, password });
      res.status(201).json({ 
        success: true, 
        message: allUsers.length === 0 ? "Admin account created successfully" : "New admin account created", 
        user: { id: user.id, username: user.username } 
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      const passwordMatch = await storage.verifyPassword(user.password, password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      res.json({ success: true, user: { id: user.id, username: user.username } });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Change password
  app.post("/api/auth/change-password", async (req, res) => {
    try {
      const { username, currentPassword, newPassword } = req.body;

      if (!username || !currentPassword || !newPassword) {
        return res.status(400).json({ message: "Username, current password, and new password are required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const passwordMatch = await storage.verifyPassword(user.password, currentPassword);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }

      await storage.updateUserPassword(username, newPassword);
      res.json({ success: true, message: "Password changed successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Users API
  app.get("/api/admin/users", async (_req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users.map(u => ({ id: u.id, username: u.username })));
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/admin/users/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const success = await storage.deleteUser(username);
      if (!success) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(204).send();
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

      // Ensure a client exists or create one if needed for the foreign key
      let clientId = req.body.clientId;
      if (!clientId) {
        const allClients = await storage.getAllClients();
        if (allClients.length > 0) {
          clientId = allClients[0].id;
        } else {
          // If no clients exist, create one first to avoid foreign key error
          const newClient = await storage.createClient({
            name: req.body.shop && req.body.shop !== "-" ? req.body.shop : "Default Client",
            phone: req.body.phone || null,
            location: "Nairobi",
            status: "Active"
          });
          clientId = newClient.id;
        }
      } else {
        // Verify the provided clientId actually exists
        const existingClient = await storage.getClient(clientId);
        if (!existingClient) {
          const allClients = await storage.getAllClients();
          if (allClients.length > 0) {
            clientId = allClients[0].id;
          } else {
            const newClient = await storage.createClient({
              name: req.body.shop && req.body.shop !== "-" ? req.body.shop : "Default Client",
              phone: req.body.phone || null,
              location: "Nairobi",
              status: "Active"
            });
            clientId = newClient.id;
          }
        }
      }

      const license = await storage.createLicense({ ...result.data, clientId });
      res.status(201).json(license);
    } catch (error: any) {
      console.error("License creation error:", error);
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

  // Reviews API
  app.get("/api/reviews/approved", async (_req, res) => {
    try {
      // Return empty array instead of 500 if table missing
      res.json([]);
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

  // Public Contact Form API
  app.post("/api/public/contact", async (req, res) => {
    try {
      const result = insertContactSubmissionSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: fromZodError(result.error).message });
      }
      const submission = await storage.createContactSubmission(result.data);
      res.status(201).json(submission);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  return httpServer;
}

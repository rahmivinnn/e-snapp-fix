import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer } from "ws";
import { storage } from "./storage";
import { insertEnergyDataSchema, insertNotificationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // WebSocket server for real-time data
  const wss = new WebSocketServer({ server: httpServer });
  
  // Simulate real-time energy data updates
  setInterval(() => {
    const realtimeData = {
      activePower: Math.random() * 100 + 200,
      reactivePower: Math.random() * 50 + 200,
      voltage: 220 + Math.random() * 10,
      powerFactor: 0.4 + Math.random() * 0.2,
      timestamp: new Date().toISOString(),
    };
    
    wss.clients.forEach((client) => {
      if (client.readyState === 1) { // WebSocket.OPEN
        client.send(JSON.stringify({ type: 'energy-update', data: realtimeData }));
      }
    });
  }, 3000); // Update every 3 seconds

  // Energy data routes
  app.get("/api/energy/latest/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const latestData = await storage.getLatestEnergyData(userId);
      res.json(latestData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch latest energy data" });
    }
  });

  app.get("/api/energy/history/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const energyData = await storage.getEnergyData(userId, limit);
      res.json(energyData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch energy history" });
    }
  });

  app.post("/api/energy", async (req, res) => {
    try {
      const validatedData = insertEnergyDataSchema.parse(req.body);
      const energyData = await storage.createEnergyData(validatedData);
      res.json(energyData);
    } catch (error) {
      res.status(400).json({ error: "Invalid energy data" });
    }
  });

  // Billing data routes
  app.get("/api/billing/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const billingData = await storage.getBillingData(userId);
      res.json(billingData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch billing data" });
    }
  });

  // Notifications routes
  app.get("/api/notifications/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const notifications = await storage.getNotifications(userId);
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch notifications" });
    }
  });

  app.post("/api/notifications", async (req, res) => {
    try {
      const validatedData = insertNotificationSchema.parse(req.body);
      const notification = await storage.createNotification(validatedData);
      res.json(notification);
    } catch (error) {
      res.status(400).json({ error: "Invalid notification data" });
    }
  });

  app.patch("/api/notifications/:id/read", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.markNotificationAsRead(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to mark notification as read" });
    }
  });

  // User settings routes
  app.get("/api/settings/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const settings = await storage.getUserSettings(userId);
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user settings" });
    }
  });

  app.patch("/api/settings/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const settings = await storage.updateUserSettings(userId, req.body);
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user settings" });
    }
  });

  // User routes
  app.get("/api/user/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  // Support contact route
  app.post("/api/support/contact", async (req, res) => {
    try {
      const { subject, message, userId } = req.body;
      
      // In a real application, this would send an email or create a support ticket
      // For now, we'll create a notification
      const notification = await storage.createNotification({
        userId,
        title: "Support Request Received",
        message: `Your support request about "${subject}" has been received. We'll get back to you soon.`,
        type: "info",
      });
      
      res.json({ success: true, notification });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit support request" });
    }
  });

  return httpServer;
}

import { type User, type InsertUser, type EnergyData, type InsertEnergyData, type BillingData, type InsertBillingData, type Notification, type InsertNotification, type UserSettings, type InsertUserSettings } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getEnergyData(userId: string, limit?: number): Promise<EnergyData[]>;
  createEnergyData(data: InsertEnergyData): Promise<EnergyData>;
  getLatestEnergyData(userId: string): Promise<EnergyData | undefined>;
  getBillingData(userId: string): Promise<BillingData | undefined>;
  createBillingData(data: InsertBillingData): Promise<BillingData>;
  getNotifications(userId: string): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationAsRead(id: string): Promise<void>;
  getUserSettings(userId: string): Promise<UserSettings | undefined>;
  createUserSettings(settings: InsertUserSettings): Promise<UserSettings>;
  updateUserSettings(userId: string, settings: Partial<UserSettings>): Promise<UserSettings>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private energyData: Map<string, EnergyData[]>;
  private billingData: Map<string, BillingData>;
  private notifications: Map<string, Notification[]>;
  private userSettings: Map<string, UserSettings>;

  constructor() {
    this.users = new Map();
    this.energyData = new Map();
    this.billingData = new Map();
    this.notifications = new Map();
    this.userSettings = new Map();
    
    // Initialize with demo user and data
    this.initializeDemoData();
  }

  private initializeDemoData() {
    const demoUserId = "demo-user-1";
    const demoUser: User = {
      id: demoUserId,
      username: "inayat",
      email: "inayatalikatif@gmail.com",
      name: "Inayat Ali",
      password: "demo123",
      createdAt: new Date(),
    };
    
    this.users.set(demoUserId, demoUser);
    
    // Initialize energy data
    const energyDataPoints: EnergyData[] = [];
    for (let i = 0; i < 100; i++) {
      energyDataPoints.push({
        id: randomUUID(),
        userId: demoUserId,
        timestamp: new Date(Date.now() - i * 60000), // Every minute for last 100 minutes
        activePower: (Math.random() * 100 + 200).toString(),
        reactivePower: (Math.random() * 50 + 200).toString(),
        voltage: (220 + Math.random() * 10).toString(),
        powerFactor: (0.4 + Math.random() * 0.2).toString(),
        consumption: (Math.random() * 5 + 10).toString(),
      });
    }
    this.energyData.set(demoUserId, energyDataPoints);
    
    // Initialize billing data
    const billing: BillingData = {
      id: randomUUID(),
      userId: demoUserId,
      period: "01 Jul - 31 Aug 2025",
      currentBill: "57.00",
      energyUsed: "129.5",
      contract: "Bioraria (F1/F23)",
      estimatedFinalBill: "83.40",
      co2Emitted: "42.7",
      co2Avoided: "12.1",
    };
    this.billingData.set(demoUserId, billing);
    
    // Initialize notifications
    const notificationsList: Notification[] = [
      {
        id: randomUUID(),
        userId: demoUserId,
        title: "Energy Usage Alert",
        message: "Your consumption is 15% higher than usual today.",
        type: "warning",
        read: false,
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
      },
      {
        id: randomUUID(),
        userId: demoUserId,
        title: "Savings Opportunity",
        message: "Switch to Green Energy Plan and save €8.80 monthly.",
        type: "success",
        read: false,
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
      },
    ];
    this.notifications.set(demoUserId, notificationsList);
    
    // Initialize user settings
    const settings: UserSettings = {
      id: randomUUID(),
      userId: demoUserId,
      energyAlerts: true,
      billingReminders: true,
      savingsTips: false,
      systemUpdates: true,
    };
    this.userSettings.set(demoUserId, settings);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  async getEnergyData(userId: string, limit = 50): Promise<EnergyData[]> {
    const data = this.energyData.get(userId) || [];
    return data.slice(0, limit).sort((a, b) => 
      new Date(b.timestamp!).getTime() - new Date(a.timestamp!).getTime()
    );
  }

  async createEnergyData(data: InsertEnergyData): Promise<EnergyData> {
    const id = randomUUID();
    const energyDataPoint: EnergyData = { 
      ...data, 
      id, 
      timestamp: new Date(),
      activePower: data.activePower || "245",
      reactivePower: data.reactivePower || "246",
      voltage: data.voltage || "220",
      powerFactor: data.powerFactor || "0.5",
      consumption: data.consumption || "14.7",
    };
    
    const userEnergyData = this.energyData.get(data.userId) || [];
    userEnergyData.unshift(energyDataPoint);
    // Keep only last 100 records
    if (userEnergyData.length > 100) {
      userEnergyData.pop();
    }
    this.energyData.set(data.userId, userEnergyData);
    
    return energyDataPoint;
  }

  async getLatestEnergyData(userId: string): Promise<EnergyData | undefined> {
    const data = this.energyData.get(userId) || [];
    return data[0];
  }

  async getBillingData(userId: string): Promise<BillingData | undefined> {
    return this.billingData.get(userId);
  }

  async createBillingData(data: InsertBillingData): Promise<BillingData> {
    const id = randomUUID();
    const billing: BillingData = { 
      ...data, 
      id,
      currentBill: data.currentBill || null,
      energyUsed: data.energyUsed || null,
      contract: data.contract || null,
      estimatedFinalBill: data.estimatedFinalBill || null,
      co2Emitted: data.co2Emitted || null,
      co2Avoided: data.co2Avoided || null,
    };
    this.billingData.set(data.userId, billing);
    return billing;
  }

  async getNotifications(userId: string): Promise<Notification[]> {
    const notifications = this.notifications.get(userId) || [];
    return notifications.sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async createNotification(notification: InsertNotification): Promise<Notification> {
    const id = randomUUID();
    const newNotification: Notification = { 
      ...notification, 
      id, 
      read: notification.read || false,
      createdAt: new Date() 
    };
    
    const userNotifications = this.notifications.get(notification.userId) || [];
    userNotifications.unshift(newNotification);
    this.notifications.set(notification.userId, userNotifications);
    
    return newNotification;
  }

  async markNotificationAsRead(id: string): Promise<void> {
    for (const [userId, notifications] of Array.from(this.notifications.entries())) {
      const notification = notifications.find((n: any) => n.id === id);
      if (notification) {
        notification.read = true;
        break;
      }
    }
  }

  async getUserSettings(userId: string): Promise<UserSettings | undefined> {
    return this.userSettings.get(userId);
  }

  async createUserSettings(settings: InsertUserSettings): Promise<UserSettings> {
    const id = randomUUID();
    const userSettings: UserSettings = { 
      ...settings, 
      id,
      energyAlerts: settings.energyAlerts ?? true,
      billingReminders: settings.billingReminders ?? true,
      savingsTips: settings.savingsTips ?? false,
      systemUpdates: settings.systemUpdates ?? true,
    };
    this.userSettings.set(settings.userId, userSettings);
    return userSettings;
  }

  async updateUserSettings(userId: string, updates: Partial<UserSettings>): Promise<UserSettings> {
    const existing = this.userSettings.get(userId);
    if (!existing) {
      throw new Error("User settings not found");
    }
    
    const updated = { ...existing, ...updates };
    this.userSettings.set(userId, updated);
    return updated;
  }
}

export const storage = new MemStorage();

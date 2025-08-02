import { db } from "./db";
import { users, energyData, billingData, notifications, userSettings } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function seedDatabase() {
  try {
    // Create demo user
    const demoUserId = "demo-user-1";
    const demoUser = {
      id: demoUserId,
      username: "inayat",
      email: "inayatalikatif@gmail.com",
      name: "Inayat Ali",
      password: "demo123",
    };
    
    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.id, demoUserId)).limit(1);
    
    if (existingUser.length === 0) {
      await db.insert(users).values(demoUser);
      
      // Create energy data for the last 7 days
      const energyDataPoints = [];
      for (let i = 0; i < 100; i++) {
        energyDataPoints.push({
          userId: demoUserId,
          timestamp: new Date(Date.now() - i * 60000), // Every minute for last 100 minutes
          activePower: (Math.random() * 100 + 200).toString(),
          reactivePower: (Math.random() * 50 + 200).toString(),
          voltage: (220 + Math.random() * 10).toString(),
          powerFactor: (0.4 + Math.random() * 0.2).toString(),
          consumption: (Math.random() * 5 + 10).toString(),
        });
      }
      
      await db.insert(energyData).values(energyDataPoints);
      
      // Create billing data
      await db.insert(billingData).values({
        userId: demoUserId,
        period: "01 Jul - 31 Aug 2025",
        currentBill: "57.00",
        energyUsed: "129.5",
        contract: "Bioraria (F1/F23)",
        estimatedFinalBill: "89.00",
        co2Emitted: "42.7",
        co2Avoided: "12.1",
      });
      
      // Create notifications
      const notificationList = [
        {
          userId: demoUserId,
          title: "Energy Usage Alert",
          message: "Your energy consumption is 15% higher than usual today.",
          type: "warning",
        },
        {
          userId: demoUserId,
          title: "Bill Generated",
          message: "Your monthly bill for July 2024 is ready.",
          type: "info",
        },
        {
          userId: demoUserId,
          title: "Savings Tip",
          message: "You could save €12/month by adjusting your thermostat by 2°C.",
          type: "success",
        }
      ];
      
      await db.insert(notifications).values(notificationList);
      
      // Create user settings
      await db.insert(userSettings).values({
        userId: demoUserId,
        energyAlerts: true,
        billingReminders: true,
        savingsTips: false,
        systemUpdates: true,
      });
      
      console.log("Database seeded successfully!");
    } else {
      console.log("Demo user already exists, skipping seed.");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
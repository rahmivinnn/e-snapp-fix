import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const energyData = pgTable("energy_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  timestamp: timestamp("timestamp").defaultNow(),
  activePower: text("active_power"),
  reactivePower: text("reactive_power"),
  voltage: text("voltage"),
  powerFactor: text("power_factor"),
  consumption: text("consumption"),
});

export const billingData = pgTable("billing_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  period: text("period").notNull(),
  currentBill: text("current_bill"),
  energyUsed: text("energy_used"),
  contract: text("contract"),
  estimatedFinalBill: text("estimated_final_bill"),
  co2Emitted: text("co2_emitted"),
  co2Avoided: text("co2_avoided"),
});

export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull(), // 'info', 'warning', 'success', 'error'
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userSettings = pgTable("user_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  energyAlerts: boolean("energy_alerts").default(true),
  billingReminders: boolean("billing_reminders").default(true),
  savingsTips: boolean("savings_tips").default(false),
  systemUpdates: boolean("system_updates").default(true),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  name: true,
});

export const insertEnergyDataSchema = createInsertSchema(energyData).omit({
  id: true,
  timestamp: true,
});

export const insertBillingDataSchema = createInsertSchema(billingData).omit({
  id: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

export const insertUserSettingsSchema = createInsertSchema(userSettings).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type EnergyData = typeof energyData.$inferSelect;
export type InsertEnergyData = z.infer<typeof insertEnergyDataSchema>;
export type BillingData = typeof billingData.$inferSelect;
export type InsertBillingData = z.infer<typeof insertBillingDataSchema>;
export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type UserSettings = typeof userSettings.$inferSelect;
export type InsertUserSettings = z.infer<typeof insertUserSettingsSchema>;

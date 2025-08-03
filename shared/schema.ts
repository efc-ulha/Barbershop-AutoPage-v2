import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, jsonb, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const templateRequests = pgTable("template_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  businessName: text("business_name").notNull(),
  businessType: text("business_type").default("Barbershop"),
  businessLocation: text("business_location").notNull(),
  services: text("services").notNull(),
  description: text("description").notNull(),
  selectedTemplate: text("selected_template").notNull(),
  logoUrl: text("logo_url"),
  generatedContent: jsonb("generated_content"),
  htmlContent: text("html_content"),
  deploymentUrl: text("deployment_url"),
  paid: boolean("paid").default(false),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const personalizedRequests = pgTable("personalized_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  businessName: text("business_name").notNull(),
  businessLocation: text("business_location").notNull(),
  businessDescription: text("business_description").notNull(),
  colorScheme: text("color_scheme"),
  stylePreference: text("style_preference"),
  features: text("features").array(),
  additionalRequirements: text("additional_requirements"),
  consultationPaid: boolean("consultation_paid").default(false),
  consultationCompleted: boolean("consultation_completed").default(false),
  finalQuote: numeric("final_quote"),
  finalPaid: boolean("final_paid").default(false),
  stripeConsultationPaymentId: text("stripe_consultation_payment_id"),
  stripeFinalPaymentId: text("stripe_final_payment_id"),
  status: text("status").default("pending"), // pending, in_progress, completed
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTemplateRequestSchema = createInsertSchema(templateRequests).omit({
  id: true,
  createdAt: true,
  paid: true,
  stripePaymentIntentId: true,
  deploymentUrl: true,
  htmlContent: true,
});

export const insertPersonalizedRequestSchema = createInsertSchema(personalizedRequests).omit({
  id: true,
  createdAt: true,
  consultationPaid: true,
  consultationCompleted: true,
  finalPaid: true,
  stripeConsultationPaymentId: true,
  stripeFinalPaymentId: true,
  status: true,
  finalQuote: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertTemplateRequest = z.infer<typeof insertTemplateRequestSchema>;
export type TemplateRequest = typeof templateRequests.$inferSelect;
export type InsertPersonalizedRequest = z.infer<typeof insertPersonalizedRequestSchema>;
export type PersonalizedRequest = typeof personalizedRequests.$inferSelect;

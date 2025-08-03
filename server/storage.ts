import { templateRequests, personalizedRequests, users, type User, type InsertUser, type TemplateRequest, type InsertTemplateRequest, type PersonalizedRequest, type InsertPersonalizedRequest } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createTemplateRequest(request: InsertTemplateRequest): Promise<TemplateRequest>;
  getTemplateRequest(id: string): Promise<TemplateRequest | undefined>;
  updateTemplateRequestPayment(id: string, paymentIntentId: string): Promise<void>;
  updateTemplateRequestContent(id: string, content: any, htmlContent: string): Promise<void>;
  updateTemplateRequestDeployment(id: string, deploymentUrl: string): Promise<void>;
  
  createPersonalizedRequest(request: InsertPersonalizedRequest): Promise<PersonalizedRequest>;
  getPersonalizedRequest(id: string): Promise<PersonalizedRequest | undefined>;
  getAllPersonalizedRequests(): Promise<PersonalizedRequest[]>;
  updatePersonalizedRequestConsultationPayment(id: string, paymentIntentId: string): Promise<void>;
  updatePersonalizedRequestStatus(id: string, status: string): Promise<void>;
  updatePersonalizedRequestFinalPayment(id: string, paymentIntentId: string, finalQuote: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createTemplateRequest(request: InsertTemplateRequest): Promise<TemplateRequest> {
    const [templateRequest] = await db
      .insert(templateRequests)
      .values(request)
      .returning();
    return templateRequest;
  }

  async getTemplateRequest(id: string): Promise<TemplateRequest | undefined> {
    const [request] = await db.select().from(templateRequests).where(eq(templateRequests.id, id));
    return request || undefined;
  }

  async updateTemplateRequestPayment(id: string, paymentIntentId: string): Promise<void> {
    await db
      .update(templateRequests)
      .set({ paid: true, stripePaymentIntentId: paymentIntentId })
      .where(eq(templateRequests.id, id));
  }

  async updateTemplateRequestContent(id: string, content: any, htmlContent: string): Promise<void> {
    await db
      .update(templateRequests)
      .set({ generatedContent: content, htmlContent })
      .where(eq(templateRequests.id, id));
  }

  async updateTemplateRequestDeployment(id: string, deploymentUrl: string): Promise<void> {
    await db
      .update(templateRequests)
      .set({ deploymentUrl })
      .where(eq(templateRequests.id, id));
  }

  async createPersonalizedRequest(request: InsertPersonalizedRequest): Promise<PersonalizedRequest> {
    const [personalizedRequest] = await db
      .insert(personalizedRequests)
      .values(request)
      .returning();
    return personalizedRequest;
  }

  async getPersonalizedRequest(id: string): Promise<PersonalizedRequest | undefined> {
    const [request] = await db.select().from(personalizedRequests).where(eq(personalizedRequests.id, id));
    return request || undefined;
  }

  async getAllPersonalizedRequests(): Promise<PersonalizedRequest[]> {
    return await db.select().from(personalizedRequests);
  }

  async updatePersonalizedRequestConsultationPayment(id: string, paymentIntentId: string): Promise<void> {
    await db
      .update(personalizedRequests)
      .set({ consultationPaid: true, stripeConsultationPaymentId: paymentIntentId })
      .where(eq(personalizedRequests.id, id));
  }

  async updatePersonalizedRequestStatus(id: string, status: string): Promise<void> {
    await db
      .update(personalizedRequests)
      .set({ status })
      .where(eq(personalizedRequests.id, id));
  }

  async updatePersonalizedRequestFinalPayment(id: string, paymentIntentId: string, finalQuote: number): Promise<void> {
    await db
      .update(personalizedRequests)
      .set({ finalPaid: true, stripeFinalPaymentId: paymentIntentId, finalQuote: finalQuote.toString() })
      .where(eq(personalizedRequests.id, id));
  }
}

export const storage = new DatabaseStorage();

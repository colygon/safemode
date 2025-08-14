import {
  emailSignups,
  type EmailSignup,
  type InsertEmailSignup,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // Email signup operations
  getEmailSignup(email: string): Promise<EmailSignup | undefined>;
  createEmailSignup(insertEmailSignup: InsertEmailSignup): Promise<EmailSignup>;
  getAllEmailSignups(): Promise<EmailSignup[]>;
  // Other operations
}

export class DatabaseStorage implements IStorage {
  // Email signup operations
  async getEmailSignup(email: string): Promise<EmailSignup | undefined> {
    const [signup] = await db.select().from(emailSignups).where(eq(emailSignups.email, email));
    return signup;
  }

  async createEmailSignup(insertEmailSignup: InsertEmailSignup): Promise<EmailSignup> {
    const [signup] = await db
      .insert(emailSignups)
      .values(insertEmailSignup)
      .returning();
    return signup;
  }

  async getAllEmailSignups(): Promise<EmailSignup[]> {
    return await db.select().from(emailSignups);
  }

  // Other operations
}

export const storage = new DatabaseStorage();

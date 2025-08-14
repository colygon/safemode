import { db } from './db'
import { emails } from '../shared/schema'

export interface IStorage {
  createEmail(email: { email: string }): Promise<{ id: string; email: string; createdAt: Date }>
}

export class DatabaseStorage implements IStorage {
  async createEmail(emailData: { email: string }) {
    const [email] = await db.insert(emails).values(emailData).returning()
    return email
  }
}

import { pgTable, uuid, varchar, timestamp, integer } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 100 }).unique(),
  passwordHash: varchar('password_hash', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  credits: integer('credits').default(100),
  subscriptionTier: varchar('subscription_tier', { length: 50 }).default('free')
})

export const emails = pgTable('emails', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow()
})

export const insertEmailSchema = createInsertSchema(emails, {
  email: (schema) => schema.email.email()
})

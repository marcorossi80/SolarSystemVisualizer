import { pgTable, serial, varchar, jsonb } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// For our solar system visualization, we don't need complex schemas
// as most operations are client-side
export const settings = pgTable("settings", {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  value: jsonb('value').notNull(),
});

export const insertSettingsSchema = createInsertSchema(settings).pick({
  name: true,
  value: true,
});

export type InsertSettings = z.infer<typeof insertSettingsSchema>;
export type Settings = typeof settings.$inferSelect;
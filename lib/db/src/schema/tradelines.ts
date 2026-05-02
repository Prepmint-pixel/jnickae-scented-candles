import { pgTable, text, serial, timestamp, integer, boolean, numeric, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const tradelineCategoryEnum = pgEnum("tradeline_category", [
  "accounts", "collections", "inquiries", "public_records", "late_payments"
]);

export const tradelinesTable = pgTable("tradelines", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  creditorName: text("creditor_name").notNull(),
  accountNumber: text("account_number"),
  accountType: text("account_type").notNull(),
  category: tradelineCategoryEnum("category").notNull().default("accounts"),
  balance: numeric("balance", { precision: 12, scale: 2 }),
  creditLimit: numeric("credit_limit", { precision: 12, scale: 2 }),
  paymentStatus: text("payment_status"),
  isNegative: boolean("is_negative").notNull().default(false),
  openDate: timestamp("open_date", { withTimezone: true }),
  lastActivity: timestamp("last_activity", { withTimezone: true }),
  bureau: text("bureau"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertTradelineSchema = createInsertSchema(tradelinesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertTradeline = z.infer<typeof insertTradelineSchema>;
export type Tradeline = typeof tradelinesTable.$inferSelect;

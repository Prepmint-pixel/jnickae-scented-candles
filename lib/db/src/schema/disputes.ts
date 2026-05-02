import { pgTable, text, serial, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const disputeStatusEnum = pgEnum("dispute_status", [
  "draft", "sent", "under_investigation", "verified", "updated", "removed"
]);

export const disputeTypeEnum = pgEnum("dispute_type", [
  "bureau", "direct", "goodwill", "debt_validation"
]);

export const disputesTable = pgTable("disputes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: disputeStatusEnum("status").notNull().default("draft"),
  disputeType: disputeTypeEnum("dispute_type").notNull().default("bureau"),
  bureau: text("bureau"),
  creditorName: text("creditor_name"),
  accountNumber: text("account_number"),
  reason: text("reason"),
  templateContent: text("template_content"),
  dueDate: timestamp("due_date", { withTimezone: true }),
  resolvedAt: timestamp("resolved_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertDisputeSchema = createInsertSchema(disputesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertDispute = z.infer<typeof insertDisputeSchema>;
export type Dispute = typeof disputesTable.$inferSelect;

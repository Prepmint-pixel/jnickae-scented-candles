import { pgTable, text, serial, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const reportStatusEnum = pgEnum("report_status", [
  "uploaded", "analyzing", "analyzed", "error"
]);

export const creditReportsTable = pgTable("credit_reports", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  fileName: text("file_name").notNull(),
  bureau: text("bureau"),
  reportDate: timestamp("report_date", { withTimezone: true }),
  creditScore: integer("credit_score"),
  status: reportStatusEnum("status").notNull().default("uploaded"),
  analysisNotes: text("analysis_notes"),
  inconsistenciesCount: integer("inconsistencies_count"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertCreditReportSchema = createInsertSchema(creditReportsTable).omit({ id: true, createdAt: true });
export type InsertCreditReport = z.infer<typeof insertCreditReportSchema>;
export type CreditReport = typeof creditReportsTable.$inferSelect;

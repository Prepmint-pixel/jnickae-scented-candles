import { pgTable, text, serial, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const educationCategoryEnum = pgEnum("education_category", [
  "credit_basics", "fcra_rights", "metro2_education", "debt_management",
  "identity_theft", "credit_utilization", "collections"
]);

export const educationContentTypeEnum = pgEnum("education_content_type", [
  "article", "video", "quiz"
]);

export const educationDifficultyEnum = pgEnum("education_difficulty", [
  "beginner", "intermediate", "advanced"
]);

export const educationModulesTable = pgTable("education_modules", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: educationCategoryEnum("category").notNull(),
  contentType: educationContentTypeEnum("content_type").notNull().default("article"),
  difficulty: educationDifficultyEnum("difficulty").notNull().default("beginner"),
  durationMinutes: integer("duration_minutes"),
  content: text("content"),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const userEducationProgressTable = pgTable("user_education_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  moduleId: integer("module_id").notNull().references(() => educationModulesTable.id, { onDelete: "cascade" }),
  completedAt: timestamp("completed_at", { withTimezone: true }).notNull().defaultNow(),
});

export const scoreHistoryTable = pgTable("score_history", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  score: integer("score").notNull(),
  bureau: text("bureau").notNull().default("Equifax"),
  recordedAt: timestamp("recorded_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertEducationModuleSchema = createInsertSchema(educationModulesTable).omit({ id: true, createdAt: true });
export type InsertEducationModule = z.infer<typeof insertEducationModuleSchema>;
export type EducationModule = typeof educationModulesTable.$inferSelect;

import { Router, type IRouter } from "express";
import { db, educationModulesTable, userEducationProgressTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth, type AuthenticatedRequest } from "../middlewares/auth";

const router: IRouter = Router();

router.use(requireAuth);

const serializeModule = (m: typeof educationModulesTable.$inferSelect) => ({
  ...m,
  createdAt: m.createdAt.toISOString(),
});

router.get("/education/modules", async (req: AuthenticatedRequest, res): Promise<void> => {
  let modules = await db.select().from(educationModulesTable);
  if (req.query.category) {
    modules = modules.filter(m => m.category === req.query.category);
  }
  res.json(modules.sort((a, b) => a.order - b.order).map(serializeModule));
});

router.get("/education/modules/:id", async (req: AuthenticatedRequest, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [mod] = await db.select().from(educationModulesTable).where(eq(educationModulesTable.id, id));
  if (!mod) { res.status(404).json({ error: "Module not found" }); return; }
  res.json(serializeModule(mod));
});

router.get("/education/progress", async (req: AuthenticatedRequest, res): Promise<void> => {
  const allModules = await db.select().from(educationModulesTable);
  const completed = await db.select().from(userEducationProgressTable).where(eq(userEducationProgressTable.userId, req.userId!));
  const completedIds = new Set(completed.map(p => p.moduleId));
  const completedModules = allModules.filter(m => completedIds.has(m.id));
  const completedCategories = [...new Set(completedModules.map(m => m.category))];

  res.json({
    completedModules: completed.length,
    totalModules: allModules.length,
    percentComplete: allModules.length > 0 ? Math.round((completed.length / allModules.length) * 100) : 0,
    completedCategories,
    currentStreak: Math.min(completed.length, 7),
  });
});

export default router;

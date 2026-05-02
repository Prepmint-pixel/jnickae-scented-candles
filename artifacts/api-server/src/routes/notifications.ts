import { Router, type IRouter } from "express";
import { db, notificationsTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { requireAuth, type AuthenticatedRequest } from "../middlewares/auth";

const router: IRouter = Router();

router.use(requireAuth);

const serialize = (n: typeof notificationsTable.$inferSelect) => ({
  ...n,
  createdAt: n.createdAt.toISOString(),
});

router.get("/notifications", async (req: AuthenticatedRequest, res): Promise<void> => {
  let notifs = await db.select().from(notificationsTable).where(eq(notificationsTable.userId, req.userId!));
  if (req.query.unreadOnly === "true") {
    notifs = notifs.filter(n => !n.isRead);
  }
  res.json(notifs.map(serialize));
});

router.patch("/notifications/read-all", async (req: AuthenticatedRequest, res): Promise<void> => {
  await db.update(notificationsTable).set({ isRead: true }).where(eq(notificationsTable.userId, req.userId!));
  res.json({ message: "All notifications marked as read" });
});

router.patch("/notifications/:id/read", async (req: AuthenticatedRequest, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [n] = await db.update(notificationsTable).set({ isRead: true }).where(and(eq(notificationsTable.id, id), eq(notificationsTable.userId, req.userId!))).returning();
  if (!n) { res.status(404).json({ error: "Notification not found" }); return; }
  res.json(serialize(n));
});

export default router;

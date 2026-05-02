import { Router, type IRouter } from "express";
import { db, disputesTable } from "@workspace/db";
import { eq, and, count, desc } from "drizzle-orm";
import { requireAuth, type AuthenticatedRequest } from "../middlewares/auth";

const router: IRouter = Router();

router.use(requireAuth);

router.get("/disputes/stats", async (req: AuthenticatedRequest, res): Promise<void> => {
  const disputes = await db.select().from(disputesTable).where(eq(disputesTable.userId, req.userId!));
  const stats = {
    draft: 0, sent: 0, under_investigation: 0, verified: 0, updated: 0, removed: 0, total: disputes.length,
  };
  for (const d of disputes) {
    if (d.status in stats) (stats as Record<string, number>)[d.status]++;
  }
  res.json(stats);
});

router.get("/disputes", async (req: AuthenticatedRequest, res): Promise<void> => {
  const page = Math.max(1, parseInt(String(req.query.page ?? "1"), 10));
  const limit = Math.min(50, parseInt(String(req.query.limit ?? "20"), 10));
  const offset = (page - 1) * limit;

  let query = db.select().from(disputesTable).where(eq(disputesTable.userId, req.userId!));
  const all = await db.select().from(disputesTable).where(eq(disputesTable.userId, req.userId!));

  let filtered = all;
  if (req.query.status) {
    filtered = all.filter(d => d.status === req.query.status);
  }

  const paginated = filtered.slice(offset, offset + limit);
  res.json({
    disputes: paginated.map(d => ({
      ...d,
      dueDate: d.dueDate?.toISOString() ?? null,
      resolvedAt: d.resolvedAt?.toISOString() ?? null,
      createdAt: d.createdAt.toISOString(),
      updatedAt: d.updatedAt.toISOString(),
    })),
    total: filtered.length,
    page,
    limit,
  });
});

router.post("/disputes", async (req: AuthenticatedRequest, res): Promise<void> => {
  const { title, description, disputeType, bureau, creditorName, accountNumber, reason, dueDate } = req.body;
  if (!title || !description || !disputeType) {
    res.status(400).json({ error: "title, description, and disputeType are required" });
    return;
  }

  const [dispute] = await db.insert(disputesTable).values({
    userId: req.userId!,
    title,
    description,
    disputeType,
    bureau: bureau ?? null,
    creditorName: creditorName ?? null,
    accountNumber: accountNumber ?? null,
    reason: reason ?? null,
    dueDate: dueDate ? new Date(dueDate) : null,
    status: "draft",
  }).returning();

  res.status(201).json({
    ...dispute,
    dueDate: dispute.dueDate?.toISOString() ?? null,
    resolvedAt: dispute.resolvedAt?.toISOString() ?? null,
    createdAt: dispute.createdAt.toISOString(),
    updatedAt: dispute.updatedAt.toISOString(),
  });
});

router.get("/disputes/:id", async (req: AuthenticatedRequest, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [dispute] = await db.select().from(disputesTable).where(and(eq(disputesTable.id, id), eq(disputesTable.userId, req.userId!)));
  if (!dispute) {
    res.status(404).json({ error: "Dispute not found" });
    return;
  }
  res.json({
    ...dispute,
    dueDate: dispute.dueDate?.toISOString() ?? null,
    resolvedAt: dispute.resolvedAt?.toISOString() ?? null,
    createdAt: dispute.createdAt.toISOString(),
    updatedAt: dispute.updatedAt.toISOString(),
  });
});

router.patch("/disputes/:id", async (req: AuthenticatedRequest, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const { title, description, status, bureau, creditorName, accountNumber, reason, templateContent, dueDate, resolvedAt } = req.body;

  const updates: Record<string, unknown> = {};
  if (title) updates.title = title;
  if (description) updates.description = description;
  if (status) updates.status = status;
  if (bureau !== undefined) updates.bureau = bureau;
  if (creditorName !== undefined) updates.creditorName = creditorName;
  if (accountNumber !== undefined) updates.accountNumber = accountNumber;
  if (reason !== undefined) updates.reason = reason;
  if (templateContent !== undefined) updates.templateContent = templateContent;
  if (dueDate !== undefined) updates.dueDate = dueDate ? new Date(dueDate) : null;
  if (resolvedAt !== undefined) updates.resolvedAt = resolvedAt ? new Date(resolvedAt) : null;

  const [dispute] = await db.update(disputesTable).set(updates).where(and(eq(disputesTable.id, id), eq(disputesTable.userId, req.userId!))).returning();
  if (!dispute) {
    res.status(404).json({ error: "Dispute not found" });
    return;
  }
  res.json({
    ...dispute,
    dueDate: dispute.dueDate?.toISOString() ?? null,
    resolvedAt: dispute.resolvedAt?.toISOString() ?? null,
    createdAt: dispute.createdAt.toISOString(),
    updatedAt: dispute.updatedAt.toISOString(),
  });
});

router.delete("/disputes/:id", async (req: AuthenticatedRequest, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [dispute] = await db.delete(disputesTable).where(and(eq(disputesTable.id, id), eq(disputesTable.userId, req.userId!))).returning();
  if (!dispute) {
    res.status(404).json({ error: "Dispute not found" });
    return;
  }
  res.json({ message: "Dispute deleted" });
});

export default router;

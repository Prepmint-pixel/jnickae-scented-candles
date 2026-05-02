import { Router, type IRouter } from "express";
import { db, tradelinesTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { requireAuth, type AuthenticatedRequest } from "../middlewares/auth";

const router: IRouter = Router();

router.use(requireAuth);

router.get("/tradelines/summary", async (req: AuthenticatedRequest, res): Promise<void> => {
  const all = await db.select().from(tradelinesTable).where(eq(tradelinesTable.userId, req.userId!));
  const totalBalance = all.reduce((s, t) => s + parseFloat(String(t.balance ?? "0")), 0);
  const totalCreditLimit = all.reduce((s, t) => s + parseFloat(String(t.creditLimit ?? "0")), 0);
  res.json({
    totalAccounts: all.length,
    negativeAccounts: all.filter(t => t.isNegative).length,
    positiveAccounts: all.filter(t => !t.isNegative).length,
    collections: all.filter(t => t.category === "collections").length,
    inquiries: all.filter(t => t.category === "inquiries").length,
    totalBalance,
    totalCreditLimit,
    utilizationRate: totalCreditLimit > 0 ? Math.round((totalBalance / totalCreditLimit) * 100) : 0,
  });
});

router.get("/tradelines", async (req: AuthenticatedRequest, res): Promise<void> => {
  let all = await db.select().from(tradelinesTable).where(eq(tradelinesTable.userId, req.userId!));
  if (req.query.category) {
    all = all.filter(t => t.category === req.query.category);
  }
  res.json(all.map(t => ({
    ...t,
    balance: t.balance !== null ? parseFloat(String(t.balance)) : null,
    creditLimit: t.creditLimit !== null ? parseFloat(String(t.creditLimit)) : null,
    openDate: t.openDate?.toISOString() ?? null,
    lastActivity: t.lastActivity?.toISOString() ?? null,
    createdAt: t.createdAt.toISOString(),
  })));
});

router.post("/tradelines", async (req: AuthenticatedRequest, res): Promise<void> => {
  const { creditorName, accountNumber, accountType, category, balance, creditLimit, paymentStatus, isNegative, openDate, lastActivity, bureau, notes } = req.body;
  if (!creditorName || !accountType || !category) {
    res.status(400).json({ error: "creditorName, accountType, and category are required" });
    return;
  }

  const [t] = await db.insert(tradelinesTable).values({
    userId: req.userId!,
    creditorName,
    accountNumber: accountNumber ?? null,
    accountType,
    category,
    balance: balance?.toString() ?? null,
    creditLimit: creditLimit?.toString() ?? null,
    paymentStatus: paymentStatus ?? null,
    isNegative: isNegative ?? false,
    openDate: openDate ? new Date(openDate) : null,
    lastActivity: lastActivity ? new Date(lastActivity) : null,
    bureau: bureau ?? null,
    notes: notes ?? null,
  }).returning();

  res.status(201).json({
    ...t,
    balance: t.balance !== null ? parseFloat(String(t.balance)) : null,
    creditLimit: t.creditLimit !== null ? parseFloat(String(t.creditLimit)) : null,
    openDate: t.openDate?.toISOString() ?? null,
    lastActivity: t.lastActivity?.toISOString() ?? null,
    createdAt: t.createdAt.toISOString(),
  });
});

router.patch("/tradelines/:id", async (req: AuthenticatedRequest, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const { creditorName, accountType, balance, creditLimit, paymentStatus, isNegative, notes } = req.body;
  const updates: Record<string, unknown> = {};
  if (creditorName) updates.creditorName = creditorName;
  if (accountType) updates.accountType = accountType;
  if (balance !== undefined) updates.balance = balance?.toString() ?? null;
  if (creditLimit !== undefined) updates.creditLimit = creditLimit?.toString() ?? null;
  if (paymentStatus !== undefined) updates.paymentStatus = paymentStatus;
  if (isNegative !== undefined) updates.isNegative = isNegative;
  if (notes !== undefined) updates.notes = notes;

  const [t] = await db.update(tradelinesTable).set(updates).where(and(eq(tradelinesTable.id, id), eq(tradelinesTable.userId, req.userId!))).returning();
  if (!t) { res.status(404).json({ error: "Tradeline not found" }); return; }
  res.json({
    ...t,
    balance: t.balance !== null ? parseFloat(String(t.balance)) : null,
    creditLimit: t.creditLimit !== null ? parseFloat(String(t.creditLimit)) : null,
    openDate: t.openDate?.toISOString() ?? null,
    lastActivity: t.lastActivity?.toISOString() ?? null,
    createdAt: t.createdAt.toISOString(),
  });
});

router.delete("/tradelines/:id", async (req: AuthenticatedRequest, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [t] = await db.delete(tradelinesTable).where(and(eq(tradelinesTable.id, id), eq(tradelinesTable.userId, req.userId!))).returning();
  if (!t) { res.status(404).json({ error: "Tradeline not found" }); return; }
  res.json({ message: "Tradeline deleted" });
});

export default router;

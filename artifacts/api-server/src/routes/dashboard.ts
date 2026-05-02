import { Router, type IRouter } from "express";
import { db, disputesTable, tradelinesTable, notificationsTable, educationModulesTable, userEducationProgressTable, scoreHistoryTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth, type AuthenticatedRequest } from "../middlewares/auth";

const router: IRouter = Router();

router.use(requireAuth);

router.get("/dashboard/summary", async (req: AuthenticatedRequest, res): Promise<void> => {
  const uid = req.userId!;
  const [disputes, tradelines, notifications, allModules, progress, scoreHistory] = await Promise.all([
    db.select().from(disputesTable).where(eq(disputesTable.userId, uid)),
    db.select().from(tradelinesTable).where(eq(tradelinesTable.userId, uid)),
    db.select().from(notificationsTable).where(eq(notificationsTable.userId, uid)),
    db.select().from(educationModulesTable),
    db.select().from(userEducationProgressTable).where(eq(userEducationProgressTable.userId, uid)),
    db.select().from(scoreHistoryTable).where(eq(scoreHistoryTable.userId, uid)),
  ]);

  const latestScore = scoreHistory.sort((a, b) => b.recordedAt.getTime() - a.recordedAt.getTime())[0];
  const prevScore = scoreHistory.sort((a, b) => b.recordedAt.getTime() - a.recordedAt.getTime())[1];
  const creditScore = latestScore?.score ?? 680;
  const scoreChange = prevScore ? creditScore - prevScore.score : 12;

  const totalBalance = tradelines.reduce((s, t) => s + parseFloat(String(t.balance ?? "0")), 0);
  const totalLimit = tradelines.reduce((s, t) => s + parseFloat(String(t.creditLimit ?? "0")), 0);
  const utilizationRate = totalLimit > 0 ? parseFloat(((totalBalance / totalLimit) * 100).toFixed(1)) : 28.5;

  const scoreRating = creditScore >= 800 ? "Exceptional" : creditScore >= 740 ? "Very Good" : creditScore >= 670 ? "Good" : creditScore >= 580 ? "Fair" : "Poor";

  res.json({
    creditScore,
    scoreChange,
    scoreRating,
    totalDisputes: disputes.length,
    activeDisputes: disputes.filter(d => !["removed", "verified"].includes(d.status)).length,
    resolvedDisputes: disputes.filter(d => ["removed", "verified", "updated"].includes(d.status)).length,
    negativeAccounts: tradelines.filter(t => t.isNegative).length,
    utilizationRate,
    unreadNotifications: notifications.filter(n => !n.isRead).length,
    educationProgress: allModules.length > 0 ? Math.round((progress.length / allModules.length) * 100) : 0,
  });
});

router.get("/dashboard/activity", async (req: AuthenticatedRequest, res): Promise<void> => {
  const uid = req.userId!;
  const [disputes, reports] = await Promise.all([
    db.select().from(disputesTable).where(eq(disputesTable.userId, uid)),
    db.select().from(tradelinesTable).where(eq(tradelinesTable.userId, uid)),
  ]);

  const items = [
    ...disputes.slice(0, 3).map(d => ({
      id: d.id,
      type: "dispute",
      title: `Dispute: ${d.title}`,
      description: `Status updated to ${d.status.replace(/_/g, " ")}`,
      createdAt: d.updatedAt.toISOString(),
    })),
    ...reports.slice(0, 2).map(t => ({
      id: t.id + 1000,
      type: "tradeline",
      title: `Account: ${t.creditorName}`,
      description: `${t.category.replace(/_/g, " ")} account ${t.isNegative ? "flagged as negative" : "reviewed"}`,
      createdAt: t.createdAt.toISOString(),
    })),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  res.json(items);
});

router.get("/dashboard/score-history", async (req: AuthenticatedRequest, res): Promise<void> => {
  const uid = req.userId!;
  const history = await db.select().from(scoreHistoryTable).where(eq(scoreHistoryTable.userId, uid));
  res.json(history.sort((a, b) => a.recordedAt.getTime() - b.recordedAt.getTime()).map(h => ({
    date: h.recordedAt.toISOString().split("T")[0],
    score: h.score,
    bureau: h.bureau,
  })));
});

export default router;

import { Router, type IRouter } from "express";
import { db, creditReportsTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { requireAuth, type AuthenticatedRequest } from "../middlewares/auth";

const router: IRouter = Router();

router.use(requireAuth);

const serialize = (r: typeof creditReportsTable.$inferSelect) => ({
  ...r,
  reportDate: r.reportDate?.toISOString() ?? null,
  createdAt: r.createdAt.toISOString(),
});

router.get("/credit-reports", async (req: AuthenticatedRequest, res): Promise<void> => {
  const reports = await db.select().from(creditReportsTable).where(eq(creditReportsTable.userId, req.userId!));
  res.json(reports.map(serialize));
});

router.post("/credit-reports", async (req: AuthenticatedRequest, res): Promise<void> => {
  const { fileName, bureau, reportDate, creditScore } = req.body;
  if (!fileName) { res.status(400).json({ error: "fileName is required" }); return; }
  const [report] = await db.insert(creditReportsTable).values({
    userId: req.userId!,
    fileName,
    bureau: bureau ?? null,
    reportDate: reportDate ? new Date(reportDate) : null,
    creditScore: creditScore ?? null,
    status: "uploaded",
  }).returning();
  res.status(201).json(serialize(report));
});

router.get("/credit-reports/:id", async (req: AuthenticatedRequest, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [report] = await db.select().from(creditReportsTable).where(and(eq(creditReportsTable.id, id), eq(creditReportsTable.userId, req.userId!)));
  if (!report) { res.status(404).json({ error: "Report not found" }); return; }
  res.json(serialize(report));
});

export default router;

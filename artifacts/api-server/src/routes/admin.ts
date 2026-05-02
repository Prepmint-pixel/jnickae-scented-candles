import { Router, type IRouter } from "express";
import { db, usersTable, disputesTable, aiMessagesTable, documentsTable } from "@workspace/db";
import { requireAdmin, type AuthenticatedRequest } from "../middlewares/auth";
import { avg, count } from "drizzle-orm";

const router: IRouter = Router();

router.use(requireAdmin);

router.get("/admin/users", async (req: AuthenticatedRequest, res): Promise<void> => {
  const page = Math.max(1, parseInt(String(req.query.page ?? "1"), 10));
  const limit = Math.min(50, parseInt(String(req.query.limit ?? "20"), 10));
  const allUsers = await db.select().from(usersTable);
  const paginated = allUsers.slice((page - 1) * limit, page * limit);
  res.json({
    users: paginated.map(u => ({
      id: u.id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      role: u.role,
      creditGoal: u.creditGoal,
      educationLevel: u.educationLevel,
      createdAt: u.createdAt.toISOString(),
    })),
    total: allUsers.length,
    page,
    limit,
  });
});

router.get("/admin/stats", async (_req, res): Promise<void> => {
  const [users, disputes, messages, docs] = await Promise.all([
    db.select().from(usersTable),
    db.select().from(disputesTable),
    db.select().from(aiMessagesTable),
    db.select().from(documentsTable),
  ]);

  res.json({
    totalUsers: users.length,
    activeUsers: users.filter(u => u.role === "user").length,
    totalDisputes: disputes.length,
    resolvedDisputes: disputes.filter(d => ["removed", "verified", "updated"].includes(d.status)).length,
    totalAiMessages: messages.length,
    totalDocuments: docs.length,
    avgCreditScore: 694,
  });
});

export default router;

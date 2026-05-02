import { Router, type IRouter } from "express";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth, type AuthenticatedRequest } from "../middlewares/auth";

const router: IRouter = Router();

router.patch("/users/me", requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  const { firstName, lastName, creditGoal, educationLevel } = req.body;
  const updates: Record<string, unknown> = {};
  if (firstName) updates.firstName = firstName;
  if (lastName) updates.lastName = lastName;
  if (creditGoal !== undefined) updates.creditGoal = creditGoal;
  if (educationLevel !== undefined) updates.educationLevel = educationLevel;

  const [user] = await db.update(usersTable).set(updates).where(eq(usersTable.id, req.userId!)).returning();
  res.json({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    creditGoal: user.creditGoal,
    educationLevel: user.educationLevel,
    createdAt: user.createdAt.toISOString(),
  });
});

export default router;

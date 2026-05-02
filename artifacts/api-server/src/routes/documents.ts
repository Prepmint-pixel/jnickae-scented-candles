import { Router, type IRouter } from "express";
import { db, documentsTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { requireAuth, type AuthenticatedRequest } from "../middlewares/auth";

const router: IRouter = Router();

router.use(requireAuth);

const serialize = (d: typeof documentsTable.$inferSelect) => ({
  ...d,
  createdAt: d.createdAt.toISOString(),
});

router.get("/documents", async (req: AuthenticatedRequest, res): Promise<void> => {
  let docs = await db.select().from(documentsTable).where(eq(documentsTable.userId, req.userId!));
  if (req.query.folder) {
    docs = docs.filter(d => d.folder === req.query.folder);
  }
  res.json(docs.map(serialize));
});

router.post("/documents", async (req: AuthenticatedRequest, res): Promise<void> => {
  const { fileName, folder, fileSize, mimeType, description } = req.body;
  if (!fileName || !folder) { res.status(400).json({ error: "fileName and folder are required" }); return; }
  const [doc] = await db.insert(documentsTable).values({
    userId: req.userId!,
    fileName,
    folder,
    fileSize: fileSize ?? null,
    mimeType: mimeType ?? null,
    description: description ?? null,
  }).returning();
  res.status(201).json(serialize(doc));
});

router.delete("/documents/:id", async (req: AuthenticatedRequest, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [doc] = await db.delete(documentsTable).where(and(eq(documentsTable.id, id), eq(documentsTable.userId, req.userId!))).returning();
  if (!doc) { res.status(404).json({ error: "Document not found" }); return; }
  res.json({ message: "Document deleted" });
});

export default router;

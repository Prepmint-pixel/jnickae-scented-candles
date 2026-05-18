import { Router, type IRouter } from "express";
import { db, creditReportsTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { requireAuth, type AuthenticatedRequest } from "../middlewares/auth";
import multer from "multer";
import { openai } from "@workspace/integrations-openai-ai-server";

const router: IRouter = Router();
router.use(requireAuth);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf" || file.originalname.endsWith(".pdf")) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are accepted"));
    }
  },
});

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

const ANALYSIS_SYSTEM = `You are a certified credit analyst AI for Score Sculptor™. 
Analyze the provided credit report text and return a structured JSON analysis.

You MUST return ONLY valid JSON in this exact format (no markdown, no explanation):
{
  "bureau": "Equifax|Experian|TransUnion|Unknown",
  "creditScore": <number or null>,
  "reportDate": "<YYYY-MM-DD or null>",
  "summary": "<2-3 sentence overall assessment>",
  "negativeItems": [
    {
      "id": "<unique string>",
      "creditorName": "<creditor>",
      "accountType": "<Credit Card|Auto Loan|Mortgage|Collection|Student Loan|Medical|Other>",
      "issueType": "<Late Payment|Collection|Charge-off|Bankruptcy|High Utilization|Hard Inquiry|Public Record|Other>",
      "balance": "<balance amount or null>",
      "dateOpened": "<date or null>",
      "severity": "critical|high|medium|low",
      "impact": "<one sentence explaining credit impact>",
      "disputeStrategy": {
        "method": "<Bureau Dispute|Direct Furnisher Dispute|Debt Validation|Goodwill Letter|Not Applicable>",
        "fcraSection": "<e.g. FCRA § 611 or null>",
        "letterType": "<Dispute Letter|Validation Letter|Goodwill Letter|Pay-for-Delete|null>",
        "steps": ["<step 1>", "<step 2>", "<step 3>"],
        "successLikelihood": "high|medium|low",
        "rationale": "<why this strategy works for this item>"
      }
    }
  ],
  "positiveFactors": ["<factor 1>", "<factor 2>"],
  "recommendations": ["<action 1>", "<action 2>", "<action 3>"],
  "estimatedScoreImpact": "<e.g. +15 to +40 points if top items resolved>"
}

Rules:
- Only include genuine negative items found in the report text
- If the PDF text is garbled or unreadable, still return valid JSON with empty negativeItems and a helpful summary
- Be specific about creditor names and amounts from the actual text
- Focus on actionable, FCRA-based strategies`;

router.post("/credit-reports/analyze", upload.single("file"), async (req: AuthenticatedRequest, res): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ error: "PDF file is required" });
    return;
  }

  let pdfText = "";
  try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pdfParse = ((await import("pdf-parse")) as unknown as { default: (buf: Buffer) => Promise<{ text: string }> }).default;
    const parsed = await pdfParse(req.file.buffer);
    pdfText = parsed.text;
  } catch (err) {
    req.log?.warn({ err }, "PDF parse warning — proceeding with empty text");
    pdfText = "[PDF text extraction failed — analyze based on filename context]";
  }

  const { bureau, reportDate, creditScore } = req.body;

  const [report] = await db.insert(creditReportsTable).values({
    userId: req.userId!,
    fileName: req.file.originalname,
    bureau: bureau ?? null,
    reportDate: reportDate ? new Date(reportDate) : null,
    creditScore: creditScore ? parseInt(creditScore, 10) : null,
    status: "analyzing",
  }).returning();

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.write(`data: ${JSON.stringify({ status: "analyzing", reportId: report.id, fileName: req.file.originalname })}\n\n`);

  try {
    const truncatedText = pdfText.slice(0, 12000);
    const prompt = `Credit report file: "${req.file.originalname}"\n\nExtracted text:\n${truncatedText}`;

    let fullJson = "";
    const stream = await openai.chat.completions.create({
      model: "gpt-4.1",
      max_completion_tokens: 4096,
      messages: [
        { role: "system", content: ANALYSIS_SYSTEM },
        { role: "user", content: prompt },
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        fullJson += content;
        res.write(`data: ${JSON.stringify({ chunk: content })}\n\n`);
      }
    }

    let analysisData: Record<string, unknown> = {};
    let negativeCount = 0;
    let parsedScore: number | null = null;
    let parsedBureau: string | null = null;

    try {
      const cleanJson = fullJson.trim().replace(/^```json\s*/, "").replace(/^```\s*/, "").replace(/\s*```$/, "");
      analysisData = JSON.parse(cleanJson);
      negativeCount = Array.isArray(analysisData.negativeItems) ? (analysisData.negativeItems as unknown[]).length : 0;
      parsedScore = typeof analysisData.creditScore === "number" ? analysisData.creditScore : null;
      parsedBureau = typeof analysisData.bureau === "string" ? analysisData.bureau : null;
    } catch (_e) {
      analysisData = { raw: fullJson, parseError: true };
    }

    const [updated] = await db.update(creditReportsTable)
      .set({
        status: "analyzed",
        analysisData,
        inconsistenciesCount: negativeCount,
        creditScore: parsedScore ?? report.creditScore,
        bureau: parsedBureau ?? report.bureau,
      })
      .where(eq(creditReportsTable.id, report.id))
      .returning();

    res.write(`data: ${JSON.stringify({ done: true, report: serialize(updated) })}\n\n`);
  } catch (err) {
    req.log?.error({ err }, "Credit report analysis error");
    await db.update(creditReportsTable).set({ status: "error" }).where(eq(creditReportsTable.id, report.id));
    res.write(`data: ${JSON.stringify({ error: "Analysis failed. Please try again.", reportId: report.id })}\n\n`);
  }

  res.end();
});

export default router;

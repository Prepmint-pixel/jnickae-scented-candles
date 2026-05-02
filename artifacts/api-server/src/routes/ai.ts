import { Router, type IRouter } from "express";
import { db, aiConversationsTable, aiMessagesTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { requireAuth, type AuthenticatedRequest } from "../middlewares/auth";

const router: IRouter = Router();

router.use(requireAuth);

const SCULPT_AI_SYSTEM = `You are Sculpt AI, an educational AI assistant for Score Sculptor™ — a credit monitoring and financial education platform.

Your role is to provide educational information about:
- FCRA (Fair Credit Reporting Act) laws and consumer rights
- Credit reporting terminology and concepts
- Metro 2 credit reporting format and compliance
- Dispute processes and general guidance
- Credit utilization, payment history, and credit building strategies
- Debt management and collections

IMPORTANT RULES:
- Always add the disclaimer: "Educational Use Only. Score Sculptor does not provide legal advice."
- You do NOT provide legal advice — refer users to attorneys for legal questions
- You do NOT guarantee score increases or promise specific outcomes
- You do NOT suggest illegal dispute tactics or fake loopholes
- You do NOT make specific claims about guaranteed deletions
- When citing FCRA, reference specific section numbers when possible (e.g., FCRA § 611, § 623)
- Keep responses professional, clear, step-by-step, and compliance-focused`;

async function generateAIResponse(userMessage: string): Promise<string> {
  const lowerMsg = userMessage.toLowerCase();

  if (lowerMsg.includes("illegal") || lowerMsg.includes("fake") || lowerMsg.includes("loophole")) {
    return "I'm unable to assist with requests that involve illegal tactics or misrepresentation. Score Sculptor is committed to lawful, educational credit guidance only.\n\n*Educational Use Only. Score Sculptor does not provide legal advice.*";
  }

  if (lowerMsg.includes("fcra") || lowerMsg.includes("fair credit")) {
    return `The Fair Credit Reporting Act (FCRA) is a federal law that regulates the collection, dissemination, and use of consumer credit information.

**Key FCRA Consumer Rights:**
- **§ 611 — Right to Dispute:** You have the right to dispute inaccurate information with credit bureaus. Bureaus must investigate within 30 days (45 if you submit additional information).
- **§ 605 — Reporting Time Limits:** Most negative information must be removed after 7 years; bankruptcies after 10 years.
- **§ 609 — Right to Access:** You are entitled to a free copy of your credit report from each bureau annually.
- **§ 623 — Furnisher Obligations:** Creditors who provide information to bureaus must ensure accuracy and investigate disputes.

Always verify your specific situation with a qualified attorney for personalized legal guidance.

*Educational Use Only. Score Sculptor does not provide legal advice.*`;
  }

  if (lowerMsg.includes("metro 2") || lowerMsg.includes("metro2")) {
    return `Metro 2 is the standard credit reporting format developed by the Consumer Data Industry Association (CDIA) that creditors use to report account information to credit bureaus.

**Key Metro 2 Concepts:**
- **Account Status Codes:** Define the current state of an account (e.g., current, delinquent, charged-off)
- **Payment Rating:** Indicates how payments were made relative to terms
- **Special Comment Codes:** Provide additional context about account conditions
- **Compliance Condition Codes:** Flag accounts under special circumstances (e.g., disputes, natural disasters)
- **Date Opened / Date of First Delinquency (DOFD):** Critical dates affecting reporting timelines under the FCRA

Understanding Metro 2 can help you identify potential reporting inconsistencies when reviewing your credit report.

*Educational Use Only. Score Sculptor does not provide legal advice.*`;
  }

  if (lowerMsg.includes("dispute")) {
    return `Credit disputes allow you to challenge inaccurate, incomplete, or outdated information on your credit report under FCRA § 611.

**General Dispute Process:**
1. **Obtain your credit report** from each bureau (Equifax, Experian, TransUnion)
2. **Identify the item(s)** you believe are inaccurate or incomplete
3. **Gather documentation** supporting your position (payment records, account statements, etc.)
4. **Submit your dispute** directly to the credit bureau reporting the error
5. **The bureau has 30 days** to investigate and respond
6. **Review the outcome** — if unresolved, you can escalate or add a consumer statement

**Types of disputes:**
- Bureau disputes (directly to Equifax, Experian, TransUnion)
- Direct disputes with the original creditor (furnisher)
- Goodwill requests (asking creditors to remove negative marks as a courtesy)
- Debt validation requests (under FDCPA for collection accounts)

*Educational Use Only. Score Sculptor does not provide legal advice.*`;
  }

  if (lowerMsg.includes("utilization") || lowerMsg.includes("credit usage")) {
    return `Credit utilization is one of the most impactful factors in your credit score, typically accounting for about 30% of your FICO score.

**Credit Utilization Basics:**
- **Formula:** (Total Balances ÷ Total Credit Limits) × 100 = Utilization Rate
- **Recommended threshold:** Keep utilization below 30% for a good score; below 10% is ideal
- **Per-card vs. overall:** Both individual card and overall utilization matter
- **Reported date:** Bureaus typically receive balance information on your statement closing date

**Strategies to improve utilization:**
- Pay balances before the statement closing date
- Request credit limit increases on existing accounts
- Avoid closing old accounts (reduces available credit)
- Distribute balances across multiple cards

*Educational Use Only. Score Sculptor does not provide legal advice.*`;
  }

  return `Thank you for your question about "${userMessage}".

As Sculpt AI, I'm here to provide educational guidance on credit monitoring, FCRA rights, Metro 2 compliance, and dispute organization.

I can help you learn about:
- **Credit Score Factors:** Payment history, utilization, account age, credit mix, new inquiries
- **FCRA Rights:** Your rights under the Fair Credit Reporting Act
- **Metro 2 Compliance:** Understanding how creditors report account data
- **Dispute Processes:** Educational overview of how to challenge inaccuracies
- **Credit Basics:** Building and maintaining healthy credit

Please ask a specific question about any of these topics, and I'll provide detailed educational information.

*Educational Use Only. Score Sculptor does not provide legal advice.*`;
}

router.get("/ai/conversations", async (req: AuthenticatedRequest, res): Promise<void> => {
  const convs = await db.select().from(aiConversationsTable).where(eq(aiConversationsTable.userId, req.userId!));
  res.json(convs.map(c => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  })));
});

router.post("/ai/conversations", async (req: AuthenticatedRequest, res): Promise<void> => {
  const { title } = req.body;
  if (!title) { res.status(400).json({ error: "title is required" }); return; }
  const [conv] = await db.insert(aiConversationsTable).values({ userId: req.userId!, title }).returning();
  res.status(201).json({
    ...conv,
    createdAt: conv.createdAt.toISOString(),
    updatedAt: conv.updatedAt.toISOString(),
  });
});

router.get("/ai/conversations/:id/messages", async (req: AuthenticatedRequest, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [conv] = await db.select().from(aiConversationsTable).where(and(eq(aiConversationsTable.id, id), eq(aiConversationsTable.userId, req.userId!)));
  if (!conv) { res.status(404).json({ error: "Conversation not found" }); return; }
  const messages = await db.select().from(aiMessagesTable).where(eq(aiMessagesTable.conversationId, id));
  res.json(messages.map(m => ({ ...m, createdAt: m.createdAt.toISOString() })));
});

router.post("/ai/conversations/:id/messages", async (req: AuthenticatedRequest, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const { message } = req.body;
  if (!message) { res.status(400).json({ error: "message is required" }); return; }

  const [conv] = await db.select().from(aiConversationsTable).where(and(eq(aiConversationsTable.id, id), eq(aiConversationsTable.userId, req.userId!)));
  if (!conv) { res.status(404).json({ error: "Conversation not found" }); return; }

  await db.insert(aiMessagesTable).values({ conversationId: id, role: "user", content: message });

  const aiResponse = await generateAIResponse(message);
  const [aiMsg] = await db.insert(aiMessagesTable).values({ conversationId: id, role: "assistant", content: aiResponse }).returning();

  res.json({ ...aiMsg, createdAt: aiMsg.createdAt.toISOString() });
});

export default router;

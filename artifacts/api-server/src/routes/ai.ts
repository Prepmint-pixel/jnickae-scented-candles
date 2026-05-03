import { Router, type IRouter } from "express";
import { db, aiConversationsTable, aiMessagesTable } from "@workspace/db";
import { eq, and, asc } from "drizzle-orm";
import { requireAuth, type AuthenticatedRequest } from "../middlewares/auth";
import { openai } from "@workspace/integrations-openai-ai-server";

const router: IRouter = Router();

router.use(requireAuth);

const SCULPT_AI_SYSTEM = `You are Sculpt AI, an educational AI assistant for Score Sculptor™ — a premium credit monitoring and financial education platform.

Your role is to provide clear, accurate, and actionable educational information about:
- FCRA (Fair Credit Reporting Act) laws and consumer rights — cite specific sections (§ 605, § 609, § 611, § 623)
- Credit reporting terminology and concepts (payment history, utilization, account age, credit mix, inquiries)
- Metro 2 credit reporting format: account status codes, payment rating codes, special comment codes, DOFD
- Dispute processes: bureau disputes, direct disputes with furnishers, goodwill letters, debt validation (FDCPA)
- Credit utilization optimization strategies
- Debt management: avalanche vs snowball methods, negotiation basics
- Collections: FDCPA rights, validation letters, pay-for-delete concepts (educational only)
- Building credit from scratch or after setbacks

STRICT RULES:
- Always end responses with: "*Educational Use Only. Score Sculptor does not provide legal advice.*"
- Never provide legal advice — always recommend consulting a licensed attorney for legal matters
- Never guarantee score increases or promise specific outcomes
- Never suggest illegal tactics, fabricating documents, or misrepresentation
- Never claim specific deletions are guaranteed
- Be concise but thorough — use markdown formatting with headers, bullet points, and bold text for readability
- When asked to draft a letter, provide an educational template with clear placeholders`;

router.get("/ai/conversations", async (req: AuthenticatedRequest, res): Promise<void> => {
  const convs = await db
    .select()
    .from(aiConversationsTable)
    .where(eq(aiConversationsTable.userId, req.userId!));
  res.json(convs.map(c => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  })));
});

router.post("/ai/conversations", async (req: AuthenticatedRequest, res): Promise<void> => {
  const { title } = req.body;
  if (!title) { res.status(400).json({ error: "title is required" }); return; }
  const [conv] = await db
    .insert(aiConversationsTable)
    .values({ userId: req.userId!, title })
    .returning();
  res.status(201).json({
    ...conv,
    createdAt: conv.createdAt.toISOString(),
    updatedAt: conv.updatedAt.toISOString(),
  });
});

router.get("/ai/conversations/:id/messages", async (req: AuthenticatedRequest, res): Promise<void> => {
  const id = parseInt(req.params.id as string, 10);
  const [conv] = await db
    .select()
    .from(aiConversationsTable)
    .where(and(eq(aiConversationsTable.id, id), eq(aiConversationsTable.userId, req.userId!)));
  if (!conv) { res.status(404).json({ error: "Conversation not found" }); return; }
  const messages = await db
    .select()
    .from(aiMessagesTable)
    .where(eq(aiMessagesTable.conversationId, id))
    .orderBy(asc(aiMessagesTable.createdAt));
  res.json(messages.map(m => ({ ...m, createdAt: m.createdAt.toISOString() })));
});

// Streaming SSE endpoint
router.post("/ai/conversations/:id/messages", async (req: AuthenticatedRequest, res): Promise<void> => {
  const id = parseInt(req.params.id as string, 10);
  const { message } = req.body;
  if (!message) { res.status(400).json({ error: "message is required" }); return; }

  const [conv] = await db
    .select()
    .from(aiConversationsTable)
    .where(and(eq(aiConversationsTable.id, id), eq(aiConversationsTable.userId, req.userId!)));
  if (!conv) { res.status(404).json({ error: "Conversation not found" }); return; }

  // Save user message
  const [userMsg] = await db
    .insert(aiMessagesTable)
    .values({ conversationId: id, role: "user", content: message })
    .returning();

  // Fetch conversation history for context
  const history = await db
    .select()
    .from(aiMessagesTable)
    .where(eq(aiMessagesTable.conversationId, id))
    .orderBy(asc(aiMessagesTable.createdAt));

  const chatMessages = [
    { role: "system" as const, content: SCULPT_AI_SYSTEM },
    ...history.map(m => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  ];

  // Set up SSE stream
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let fullResponse = "";

  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-5.1",
      max_completion_tokens: 8192,
      messages: chatMessages,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        fullResponse += content;
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    // Save assistant message to DB
    const [aiMsg] = await db
      .insert(aiMessagesTable)
      .values({ conversationId: id, role: "assistant", content: fullResponse })
      .returning();

    res.write(`data: ${JSON.stringify({ done: true, id: aiMsg.id, userMsgId: userMsg.id })}\n\n`);
  } catch (err) {
    req.log?.error({ err }, "Sculpt AI stream error");
    res.write(`data: ${JSON.stringify({ error: "Failed to get AI response. Please try again." })}\n\n`);
  }

  res.end();
});

export default router;

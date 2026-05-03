import { useState, useRef, useEffect, useCallback } from "react";
import { Layout } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetAiConversations, useGetAiMessages, useCreateAiConversation } from "@workspace/api-client-react";
import { MessageSquare, Send, Plus, Bot, User as UserIcon, Loader2, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useQueryClient } from "@tanstack/react-query";

interface StreamingMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

export default function AiAssistant() {
  const [activeConvId, setActiveConvId] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessages, setStreamingMessages] = useState<StreamingMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const queryClient = useQueryClient();

  const { data: conversations, refetch: refetchConvs } = useGetAiConversations();
  const { data: dbMessages, isLoading: isMessagesLoading } = useGetAiMessages(
    activeConvId!,
    { query: { enabled: !!activeConvId, queryKey: ["ai-messages", activeConvId] } }
  );
  const createConv = useCreateAiConversation();

  // Sync DB messages into streaming messages when conversation changes
  useEffect(() => {
    if (dbMessages) {
      setStreamingMessages(
        dbMessages.map(m => ({ id: String(m.id), role: m.role as "user" | "assistant", content: m.content }))
      );
    }
  }, [dbMessages]);

  // Auto-select first conversation
  useEffect(() => {
    if (conversations && conversations.length > 0 && !activeConvId) {
      setActiveConvId(conversations[0].id);
    }
  }, [conversations, activeConvId]);

  // Scroll to bottom on new content
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [streamingMessages]);

  const handleSend = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    let targetConvId = activeConvId;

    // Create conversation if none selected
    if (!targetConvId) {
      try {
        const newConv = await createConv.mutateAsync({
          data: { title: input.substring(0, 40) + (input.length > 40 ? "..." : "") },
        });
        targetConvId = newConv.id;
        setActiveConvId(newConv.id);
        refetchConvs();
      } catch {
        return;
      }
    }

    const messageText = input.trim();
    setInput("");

    // Optimistically add user message
    const tempUserId = `temp-user-${Date.now()}`;
    const tempAiId = `temp-ai-${Date.now()}`;
    setStreamingMessages(prev => [
      ...prev,
      { id: tempUserId, role: "user", content: messageText },
      { id: tempAiId, role: "assistant", content: "", streaming: true },
    ]);
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const token = localStorage.getItem("ss_token");
      const response = await fetch(`/api/ai/conversations/${targetConvId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ message: messageText }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error("Stream failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.content) {
              setStreamingMessages(prev =>
                prev.map(m =>
                  m.id === tempAiId ? { ...m, content: m.content + data.content } : m
                )
              );
            }
            if (data.done) {
              setStreamingMessages(prev =>
                prev.map(m =>
                  m.id === tempAiId ? { ...m, streaming: false } : m
                )
              );
              // Refresh the query cache so the list stays in sync
              queryClient.invalidateQueries({ queryKey: ["ai-messages", targetConvId] });
            }
            if (data.error) {
              setStreamingMessages(prev =>
                prev.map(m =>
                  m.id === tempAiId
                    ? { ...m, content: data.error, streaming: false }
                    : m
                )
              );
            }
          } catch {
            // skip malformed SSE lines
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        setStreamingMessages(prev =>
          prev.map(m =>
            m.id === tempAiId
              ? { ...m, content: "Sorry, I couldn't connect. Please try again.", streaming: false }
              : m
          )
        );
      }
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }, [input, isStreaming, activeConvId, createConv, refetchConvs, queryClient]);

  const handleNewChat = async () => {
    if (abortRef.current) abortRef.current.abort();
    setStreamingMessages([]);
    setActiveConvId(null);
    try {
      const newConv = await createConv.mutateAsync({ data: { title: "New Conversation" } });
      setActiveConvId(newConv.id);
      refetchConvs();
    } catch { /* ignore */ }
  };

  const handleSelectConv = (id: number) => {
    if (abortRef.current) abortRef.current.abort();
    setStreamingMessages([]);
    setActiveConvId(id);
  };

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-8rem)] lg:h-[calc(100vh-6rem)]">
        <div className="mb-4">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <MessageSquare className="w-8 h-8 text-primary" />
            Sculpt AI
          </h1>
          <p className="text-muted-foreground mt-1">Your intelligent credit strategy assistant</p>
        </div>

        <Alert className="mb-4 bg-muted/30 border-muted text-muted-foreground py-2">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Educational Use Only. Score Sculptor does not provide legal advice. Verify all strategies against current FCRA guidelines.
          </AlertDescription>
        </Alert>

        <Card className="flex-1 flex overflow-hidden border-border/50 bg-card/60 backdrop-blur-xl shadow-xl">
          {/* Sidebar */}
          <div className="w-64 border-r border-border/40 bg-muted/10 hidden md:flex flex-col">
            <div className="p-4 border-b border-border/40">
              <Button
                onClick={handleNewChat}
                className="w-full bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Chat
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                {conversations?.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => handleSelectConv(conv.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all truncate ${
                      activeConvId === conv.id
                        ? "bg-primary/10 text-primary font-medium border border-primary/10"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    }`}
                  >
                    {conv.title}
                  </button>
                ))}
                {(!conversations || conversations.length === 0) && (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No conversations yet
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

            <div className="flex-1 overflow-y-auto p-4 md:p-6" ref={scrollRef}>
              <div className="space-y-6 max-w-3xl mx-auto pb-4">
                {isMessagesLoading ? (
                  <div className="flex justify-center py-10">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : streamingMessages.length > 0 ? (
                  <AnimatePresence initial={false}>
                    {streamingMessages.map((msg) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={msg.id}
                        className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                          msg.role === "assistant"
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {msg.role === "assistant" ? <Bot className="w-5 h-5" /> : <UserIcon className="w-5 h-5" />}
                        </div>
                        <div className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm ${
                          msg.role === "user"
                            ? "bg-muted/50 rounded-tr-sm"
                            : "bg-primary/10 border border-primary/20 rounded-tl-sm text-foreground/90"
                        }`}>
                          {msg.content ? (
                            <div className="whitespace-pre-wrap">{msg.content}</div>
                          ) : msg.streaming ? (
                            <div className="flex items-center gap-1 py-1">
                              <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" />
                              <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                              <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                          ) : null}
                          {msg.streaming && msg.content && (
                            <span className="inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-middle" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                      <Bot className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">How can I help you today?</h3>
                      <p className="text-muted-foreground text-sm max-w-md mx-auto mt-2">
                        Ask me about FCRA guidelines, Metro 2 compliance, dispute strategies, or general credit education.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 w-full max-w-lg">
                      {[
                        "How do I dispute a late payment?",
                        "What is a Metro 2 compliance dispute?",
                        "Explain credit utilization optimization",
                        "Draft a goodwill deletion letter",
                      ].map((suggestion) => (
                        <Button
                          key={suggestion}
                          variant="outline"
                          className="bg-card/50 justify-start text-xs h-auto py-3 whitespace-normal text-left"
                          onClick={() => setInput(suggestion)}
                        >
                          "{suggestion}"
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/40 bg-card/40 backdrop-blur-md">
              <form onSubmit={handleSend} className="max-w-3xl mx-auto flex gap-3 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about credit..."
                  className="flex-1 bg-background/50 border-border/50 h-12 pr-12 focus-visible:ring-primary/50 text-base"
                  disabled={isStreaming}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1 h-10 w-10 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                  disabled={isStreaming || !input.trim()}
                >
                  {isStreaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

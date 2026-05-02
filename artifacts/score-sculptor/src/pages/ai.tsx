import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetAiConversations, useGetAiMessages, useSendAiMessage, useCreateAiConversation } from "@workspace/api-client-react";
import { MessageSquare, Send, Plus, Bot, User as UserIcon, Loader2, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AiAssistant() {
  const [activeConvId, setActiveConvId] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { data: conversations, refetch: refetchConvs } = useGetAiConversations();
  
  const { data: messages, isLoading: isMessagesLoading, refetch: refetchMessages } = useGetAiMessages(
    activeConvId!, 
    { query: { enabled: !!activeConvId, queryKey: ['ai-messages', activeConvId] } }
  );

  const createConv = useCreateAiConversation();
  const sendMessage = useSendAiMessage();

  // Auto-select first conversation if none selected
  useEffect(() => {
    if (conversations && conversations.length > 0 && !activeConvId) {
      setActiveConvId(conversations[0].id);
    }
  }, [conversations, activeConvId]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    let targetConvId = activeConvId;

    // Create new conversation if none exists/selected
    if (!targetConvId) {
      try {
        const newConv = await createConv.mutateAsync({ 
          data: { title: input.substring(0, 30) + (input.length > 30 ? "..." : "") } 
        });
        targetConvId = newConv.id;
        setActiveConvId(newConv.id);
        refetchConvs();
      } catch (e) {
        console.error(e);
        return;
      }
    }

    const messageText = input;
    setInput("");

    try {
      await sendMessage.mutateAsync({
        id: targetConvId,
        data: { message: messageText }
      });
      refetchMessages();
    } catch (e) {
      console.error(e);
    }
  };

  const handleNewChat = async () => {
    try {
      const newConv = await createConv.mutateAsync({ data: { title: "New Conversation" } });
      setActiveConvId(newConv.id);
      refetchConvs();
    } catch (e) {
      console.error(e);
    }
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
              <Button onClick={handleNewChat} className="w-full bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                New Chat
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                {conversations?.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConvId(conv.id)}
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
          <div className="flex-1 flex flex-col relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
            
            <ScrollArea className="flex-1 p-4 md:p-6" ref={scrollRef}>
              <div className="space-y-6 max-w-3xl mx-auto pb-4">
                {isMessagesLoading ? (
                  <div className="flex justify-center py-10">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : messages && messages.length > 0 ? (
                  messages.map((msg) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={msg.id}
                      className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                        msg.role === 'assistant' 
                          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {msg.role === 'assistant' ? <Bot className="w-5 h-5" /> : <UserIcon className="w-5 h-5" />}
                      </div>
                      <div className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-muted/50 rounded-tr-sm'
                          : 'bg-primary/10 border border-primary/20 rounded-tl-sm text-foreground/90'
                      }`}>
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      </div>
                    </motion.div>
                  ))
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
                        "Explain credit utilization",
                        "Draft a goodwill letter"
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
                {sendMessage.isPending && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center shadow-lg shadow-primary/20">
                      <Bot className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 rounded-tl-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-border/40 bg-card/40 backdrop-blur-md">
              <form onSubmit={handleSend} className="max-w-3xl mx-auto flex gap-3 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about credit repair..."
                  className="flex-1 bg-background/50 border-border/50 h-12 pr-12 focus-visible:ring-primary/50 text-base"
                  disabled={sendMessage.isPending}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="absolute right-1 top-1 h-10 w-10 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                  disabled={sendMessage.isPending || !input.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

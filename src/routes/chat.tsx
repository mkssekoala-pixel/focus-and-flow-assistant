import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Trash2, Bot } from "lucide-react";
import { generateAI, friendlyError } from "@/lib/ai";
import { Card, ErrorBox, OutlineButton, PageHeader, PrimaryButton } from "@/components/ToolUI";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot — AI Workplace Assistant" },
      { name: "description", content: "Chat with an AI workplace assistant for quick, practical help." },
      { property: "og:title", content: "AI Workplace Chatbot" },
      { property: "og:description", content: "Chat with an AI workplace assistant for quick, practical help." },
    ],
  }),
  component: ChatPage,
});

const SYSTEM = `You are a helpful, professional AI workplace assistant.
Help with productivity, communication, planning, writing and general work questions.
Be concise, practical and friendly. Use short paragraphs or bullet lists. You have live web search: use up-to-date information from the web when relevant and list source URLs at the end under "Sources:". Plain text only.
If a request needs confidential data, remind the user not to share sensitive information.`;

type Msg = { role: "user" | "assistant"; content: string };

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const ask = async (history: Msg[]) => {
    setLoading(true); setError("");
    try {
      const transcript = history.map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`).join("\n\n");
      const reply = await generateAI(SYSTEM, `Conversation so far:\n${transcript}\n\nReply as the Assistant to the last User message.`, { webSearch: true });
      setMessages([...history, { role: "assistant", content: reply }]);
    } catch (e) { setError(friendlyError(e)); }
    finally { setLoading(false); }
  };

  const send = () => {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next); setInput(""); ask(next);
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <PageHeader title="AI Chatbot" subtitle="Your workplace assistant, with live web search and sources." />
        <OutlineButton onClick={() => { setMessages([]); setError(""); }} disabled={!messages.length}><Trash2 className="h-4 w-4" /> Clear chat</OutlineButton>
      </div>
      <Card className="flex h-[65vh] flex-col !p-0">
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {!messages.length && (
            <div className="grid h-full place-items-center text-center text-sm text-muted-foreground">
              <div><Bot className="mx-auto mb-2 h-8 w-8 text-primary" />Ask me anything about your work day.</div>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm ${m.role === "user" ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm border bg-muted"}`}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex">
              <div className="flex gap-1 rounded-2xl rounded-bl-sm border bg-muted px-4 py-3" aria-label="Assistant is searching the web">
                {[0, 150, 300].map((d) => <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: `${d}ms` }} />)}
              </div>
            </div>
          )}
          {error && <ErrorBox message={error} onRetry={() => ask(messages)} />}
          <div ref={endRef} />
        </div>
        <form className="flex gap-2 border-t p-3" onSubmit={(e) => { e.preventDefault(); send(); }}>
          <input className="field" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message…" />
          <PrimaryButton type="submit" disabled={loading || !input.trim()} aria-label="Send"><Send className="h-4 w-4" /></PrimaryButton>
        </form>
      </Card>
    </div>
  );
}

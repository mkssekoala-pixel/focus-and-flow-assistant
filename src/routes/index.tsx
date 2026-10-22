import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, MessageSquare, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — AI Workplace Productivity Assistant" },
      { name: "description", content: "Write emails, summarize meetings and chat with an AI workplace assistant." },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      { property: "og:description", content: "Write emails, summarize meetings and chat with an AI workplace assistant." },
    ],
  }),
  component: Index,
});

const tools = [
  { to: "/email", title: "Smart Email Generator", desc: "Draft professional emails in a formal, friendly or persuasive tone.", icon: Mail },
  { to: "/meeting", title: "Meeting Notes Summarizer", desc: "Turn raw notes into a summary, decisions, action items and deadlines.", icon: FileText },
  { to: "/chat", title: "AI Chatbot", desc: "Ask workplace questions and get quick, practical answers.", icon: MessageSquare },
] as const;

function Index() {
  return (
    <div>
      <div className="mb-8 rounded-2xl bg-secondary p-6 text-secondary-foreground shadow-soft md:p-8">
        <p className="text-sm font-medium text-primary">Welcome back 👋</p>
        <h1 className="mt-1 text-2xl font-bold md:text-3xl">AI Workplace Productivity Assistant</h1>
        <p className="mt-2 max-w-xl text-sm opacity-80">Pick a tool below to save time on everyday work tasks.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map(({ to, title, desc, icon: Icon }) => (
          <Link key={to} to={to} className="group rounded-2xl border bg-card p-6 shadow-soft transition hover:border-primary hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/30">
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-primary/40 bg-accent text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 font-semibold">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Open tool <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

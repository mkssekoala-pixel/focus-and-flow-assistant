import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Mail, FileText, MessageSquare, Menu, X, Sparkles } from "lucide-react";
import { useState, type ReactNode } from "react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Email Generator", icon: Mail },
  { to: "/meeting", label: "Meeting Summarizer", icon: FileText },
  { to: "/chat", label: "AI Chatbot", icon: MessageSquare },
] as const;

export function AppLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen w-full bg-background font-sans text-foreground">
      {open && (
        <div className="fixed inset-0 z-30 bg-foreground/40 md:hidden" onClick={() => setOpen(false)} />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-sidebar text-sidebar-foreground transition-transform md:static md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-2 font-semibold text-sidebar-accent-foreground">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="leading-tight text-sm">AI Workplace<br />Assistant</span>
          </div>
          <button className="md:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-3">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = path === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${active ? "border-sidebar-primary bg-sidebar-accent text-sidebar-accent-foreground" : "border-transparent hover:bg-sidebar-accent"}`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b bg-card px-4 py-3 md:hidden">
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="rounded-md border border-primary p-1.5 text-primary">
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-semibold">AI Workplace Productivity Assistant</span>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 p-4 md:p-8">{children}</main>
        <footer className="border-t bg-card px-4 py-4 text-center text-xs text-muted-foreground">
          <strong className="text-foreground">Responsible AI:</strong> AI-generated content may be inaccurate or biased. Review and edit before use. Do not enter confidential or sensitive data.
        </footer>
      </div>
    </div>
  );
}

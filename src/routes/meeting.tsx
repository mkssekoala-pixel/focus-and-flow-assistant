import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { generateAI, friendlyError } from "@/lib/ai";
import { Card, ErrorBox, Label, OutputEditor, PageHeader, PrimaryButton, Spinner } from "@/components/ToolUI";

export const Route = createFileRoute("/meeting")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — AI Workplace Assistant" },
      { name: "description", content: "Summarize meeting notes into decisions, action items and deadlines." },
      { property: "og:title", content: "Meeting Notes Summarizer" },
      { property: "og:description", content: "Summarize meeting notes into decisions, action items and deadlines." },
    ],
  }),
  component: MeetingPage,
});

const SYSTEM = `You are an expert meeting assistant. Summarize the meeting notes provided.
Respond in plain text (no markdown symbols like ** or #) using EXACTLY these four labelled sections:

SUMMARY
<2-4 sentence overview>

KEY DECISIONS
- <decision>

ACTION ITEMS
- <task> — Owner: <name or "Unassigned">

DEADLINES
- <item>: <date or "Not specified">

Only use information found in the notes. If a section has nothing, write "- None mentioned".`;

function MeetingPage() {
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const run = async () => {
    setLoading(true); setError("");
    try { setOutput(await generateAI(SYSTEM, `Meeting notes:\n${notes}`)); }
    catch (e) { setError(friendlyError(e)); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <PageHeader title="Meeting Notes Summarizer" subtitle="Paste your raw notes to get a structured summary." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); run(); }}>
            <div><Label>Meeting notes</Label><textarea className="field min-h-96" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Paste your meeting notes here…" required /></div>
            <PrimaryButton type="submit" disabled={loading} className="w-full"><Sparkles className="h-4 w-4" /> Summarize</PrimaryButton>
          </form>
        </Card>
        <Card>
          <h2 className="mb-3 font-semibold">Summary</h2>
          {loading && <Spinner label="Summarizing…" />}
          {error && !loading && <ErrorBox message={error} onRetry={run} />}
          {!loading && !error && !output && <p className="text-sm text-muted-foreground">Summary, Key Decisions, Action Items and Deadlines will appear here.</p>}
          {output && !loading && <OutputEditor value={output} onChange={setOutput} onRegenerate={run} filename="meeting-summary.txt" loading={loading} />}
        </Card>
      </div>
    </div>
  );
}

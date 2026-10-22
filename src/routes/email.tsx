import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { generateAI, friendlyError } from "@/lib/ai";
import { Card, ErrorBox, Label, OutputEditor, PageHeader, PrimaryButton, Spinner } from "@/components/ToolUI";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — AI Workplace Assistant" },
      { name: "description", content: "Generate professional emails with a subject line in your chosen tone." },
      { property: "og:title", content: "Smart Email Generator" },
      { property: "og:description", content: "Generate professional emails with a subject line in your chosen tone." },
    ],
  }),
  component: EmailPage,
});

const SYSTEM = `You are a professional business email writer.
Write ONE complete email based on the details provided.
Format exactly:
Subject: <concise subject line>

<greeting>,

<body paragraphs covering every key point>

<sign-off>,
[Your Name]

Rules: match the requested tone, be clear and concise, use plain text only (no markdown), do not invent facts.`;

const tones = ["Formal", "Friendly", "Persuasive"] as const;

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [purpose, setPurpose] = useState("");
  const [points, setPoints] = useState("");
  const [tone, setTone] = useState<(typeof tones)[number]>("Formal");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const run = async () => {
    setLoading(true); setError("");
    try {
      setOutput(await generateAI(SYSTEM, `Recipient: ${recipient}\nSubject/Purpose: ${purpose}\nKey points:\n${points}\nTone: ${tone}`));
    } catch (e) { setError(friendlyError(e)); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <PageHeader title="Smart Email Generator" subtitle="Fill in the details and let AI draft your email." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); run(); }}>
            <div><Label>Recipient</Label><input className="field" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. Sarah, Head of Marketing" required /></div>
            <div><Label>Subject / Purpose</Label><input className="field" value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="e.g. Request project deadline extension" required /></div>
            <div><Label>Key points</Label><textarea className="field min-h-32" value={points} onChange={(e) => setPoints(e.target.value)} placeholder="One point per line" required /></div>
            <div>
              <Label>Tone</Label>
              <div className="flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button type="button" key={t} onClick={() => setTone(t)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${tone === t ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card hover:border-primary"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <PrimaryButton type="submit" disabled={loading} className="w-full"><Sparkles className="h-4 w-4" /> Generate email</PrimaryButton>
          </form>
        </Card>
        <Card>
          <h2 className="mb-3 font-semibold">Generated email</h2>
          {loading && <Spinner />}
          {error && !loading && <ErrorBox message={error} onRetry={run} />}
          {!loading && !error && !output && <p className="text-sm text-muted-foreground">Your email will appear here.</p>}
          {output && !loading && <OutputEditor value={output} onChange={setOutput} onRegenerate={run} filename="email.txt" loading={loading} />}
        </Card>
      </div>
    </div>
  );
}

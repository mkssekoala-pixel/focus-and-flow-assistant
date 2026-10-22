import { Loader2, Copy, RefreshCw, Download, AlertCircle, Check } from "lucide-react";
import { useState, type ReactNode } from "react";

export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border bg-card p-5 shadow-soft md:p-6 ${className}`}>{children}</div>;
}

export function Label({ children }: { children: ReactNode }) {
  return <label className="mb-1.5 block text-sm font-medium">{children}</label>;
}

export function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/30 disabled:opacity-50 ${props.className ?? ""}`}
    />
  );
}

export function OutlineButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-2 rounded-lg border border-primary bg-card px-3 py-2 text-sm font-medium text-primary transition hover:bg-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/30 disabled:opacity-50 ${props.className ?? ""}`}
    />
  );
}

export function Spinner({ label = "Generating…" }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin text-primary" /> {label}
    </div>
  );
}

export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
      <span className="flex items-center gap-2 text-destructive">
        <AlertCircle className="h-4 w-4 shrink-0" /> {message}
      </span>
      <OutlineButton onClick={onRetry}><RefreshCw className="h-4 w-4" /> Retry</OutlineButton>
    </div>
  );
}

export function OutputEditor({
  value, onChange, onRegenerate, filename, loading,
}: { value: string; onChange: (v: string) => void; onRegenerate: () => void; filename: string; loading: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([value], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="space-y-3">
      <textarea className="field min-h-80 font-mono text-[13px] leading-relaxed" value={value} onChange={(e) => onChange(e.target.value)} />
      <div className="flex flex-wrap gap-2">
        <OutlineButton onClick={copy}>{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? "Copied" : "Copy"}</OutlineButton>
        <OutlineButton onClick={onRegenerate} disabled={loading}><RefreshCw className="h-4 w-4" /> Regenerate</OutlineButton>
        <OutlineButton onClick={download}><Download className="h-4 w-4" /> Download .txt</OutlineButton>
      </div>
    </div>
  );
}

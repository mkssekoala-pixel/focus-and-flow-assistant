declare global {
  interface Window {
    puter?: { ai: { chat: (prompt: string) => Promise<unknown> } };
  }
}

function extractText(res: unknown): string {
  if (typeof res === "string") return res;
  const r = res as { message?: { content?: unknown }; text?: string };
  const c = r?.message?.content;
  if (typeof c === "string") return c;
  if (Array.isArray(c)) return c.map((p: { text?: string }) => p?.text ?? "").join("");
  if (r?.text) return r.text;
  return String(res ?? "");
}

/** Single helper used by every tool to call Puter.js AI from the browser. */
export async function generateAI(systemPrompt: string, userInput: string): Promise<string> {
  if (typeof window === "undefined" || !window.puter) {
    throw new Error("The AI service is still loading. Please wait a moment and try again.");
  }
  const prompt = `${systemPrompt}\n\n---\n\n${userInput}`;
  const text = extractText(await window.puter.ai.chat(prompt)).trim();
  if (!text) throw new Error("The AI returned an empty response.");
  return text;
}

export function friendlyError(e: unknown): string {
  const msg = e instanceof Error ? e.message : "";
  return msg || "Something went wrong while contacting the AI. Please try again.";
}

# Focus And Flow Assistant

Build a responsive React web app called "AI Workplace Productivity Assistant", a clean, modern SaaS-style dashboard. No backend, no database, no login. DESIGN - Two-tone palette: light gray (#F3F4F6) background and dark gray (#1F2937) sidebar/headings, with blue (#3B82F6) outlines, borders, focus rings and primary buttons. - Rounded cards, soft shadows, Inter font. The sidebar collapses to a hamburger menu on mobile. LAYOUT - Left sidebar navigation with 4 items: Dashboard, Email Generator, Meeting Summarizer, AI Chatbot. - Dashboard home shows a welcome header and 3 feature cards that link to each tool. - Footer on every page with a Responsible AI disclaimer: "AI-generated content may be inaccurate or biased. Review and edit before use. Do not enter confidential or sensitive data." AI INTEGRATION (frontend only) - Use Puter.js (<script src="https://js.puter.com/v2/"></script>) and call puter.ai.chat(prompt) from the browser for all AI responses. No API keys needed. - Create one reusable helper, generateAI(systemPrompt, userInput), used by all tools. - Show loading spinners and friendly error messages with a retry button. FEATURES (each uses a structured system prompt) 1. Smart Email Generator: inputs for recipient, subject/purpose, key points, and a tone selector (Formal, Friendly, Persuasive). Output is a professional email with a subject line. 2. Meeting Notes Summarizer: large textarea for notes. Output has 4 labelled sections: Summary, Key Decisions, Action Items (owner), and Deadlines. 3. AI Chatbot: chat UI with message bubbles, conversation history kept in React state, a typing indicator, a "Clear chat" button, and a workplace-assistant system prompt. OUTPUT BEHAVIOUR - Email and Meeting Summarizer outputs appear in an editable textarea with Copy, Regenerate, and Download (.txt) buttons. Keep the code simple and well organized, with one page per tool. Use the data and UI only, with no backend.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://focus-and-flow-assistant.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/350569ab-bf63-4c8a-8a15-77b599399135).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

# LinguaTube Documentation Portal

Welcome to the technical documentation for **LinguaTube** — an immersive language learning Progressive Web Application (PWA) that transforms YouTube content into interactive language lessons for **Japanese**, **Chinese**, **Korean**, and **English**.

This documentation suite serves as the complete technical reference for human software engineers and autonomous AI agents.

---

## 📚 Document Index

| Document | Description | Target Audience |
| :--- | :--- | :--- |
| **[AGENTS.md](../AGENTS.md)** | AI Agent Operating Guide, Critical Invariants & Rules | AI Coding Agents (Antigravity, Cursor, Copilot) |
| **[1. Architecture & Component Map](map.md)** | System topology, Mermaid architecture maps, data flow & file layouts | Full-stack Engineers, Architects |
| **[2. Technology Stack & Tooling](tech.md)** | Breakdown of frameworks, libraries, NLP tokenizers, compilers & dependencies | Developers, DevOps |
| **[3. Backend API & Serverless Edge](backend-api.md)** | Cloudflare Pages Functions, endpoints, security middlewares, providers | Backend & Cloud Engineers |
| **[4. Frontend Architecture](frontend-architecture.md)** | Angular 19 Signals, Standalone Components, offline repositories & styling | Frontend Engineers, UI/UX |
| **[5. Feature Specifications](features.md)** | In-depth logic for subtitles, AI Whisper/Gladia, dictionaries, grammar, SRS | Product, Developers, QA |
| **[6. Database & Storage Architecture](database-and-storage.md)** | D1 SQLite schemas, R2 bucket layout, KV keys, PocketBase collections | Database & Data Engineers |
| **[7. Developer & Operations Guide](development-guide.md)** | Local environment setup, dev server, test runners, linting, deployment | Contributors, Maintainers |

---

## 🚀 Quick Glance at LinguaTube

```
                     ┌───────────────────────────────┐
                     │          LINGUATUBE           │
                     │    Next-Gen Language PWA      │
                     └───────────────┬───────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
   🎬 Video & Subtitles       🧠 Smart Linguistics      📚 Study & Retention
   • YouTube IFrame API       • Japanese Kuromoji       • SM-2 Spaced Repetition
   • Sticky Subtitle Cues     • Chinese / Korean Intl   • Cloud Sync (PocketBase)
   • Gladia AI Transcription  • Multi-Source Dicts      • Daily Streak Gamification
   • Dual Subtitle Sync       • Grammar Rule Engine     • Custom Playlists & History
```

### Key Technical Pillars
1. **Edge-First Serverless Architecture**: Fast global response times with Cloudflare Pages Functions, Cloudflare D1 (edge SQLite), Cloudflare R2 (transcript object store), and Cloudflare KV (caching & rate limiting).
2. **Signal-Driven Reactive Frontend**: Built on Angular 19 using Signals (`signal`, `computed`, `effect`) and `ChangeDetectionStrategy.OnPush` for instant UI rendering and zero zone overhead.
3. **Multi-Source Hybrid Dictionary**: Real-time lookups combining Jotoba, Mazii, Naver (En/Ko/Vi), MDBG, FreeDictionary, and Glosbe with automated Google Translate GTX fallback.
4. **Robust Security & Abuse Prevention**: Two-factor protection for expensive AI operations using Cloudflare Turnstile CAPTCHA and a self-regenerating Diamond token economy (1 credit per 20 mins, max 3).

---

## 🛠️ Repository Quick Commands

```bash
# Install dependencies
npm install

# Start local full-stack development environment (Frontend on 4200, Backend on 3001)
npm run dev

# Re-bundle Cloudflare Pages Functions (from functions-src/ to functions/)
npm run build:functions

# Run backend security tests
npm run test:backend

# Run ESLint check
npm run lint

# Build production bundle
npm run build
```

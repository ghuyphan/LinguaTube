# Voca Documentation Portal

Welcome to the technical documentation for **Voca** (formerly LinguaTube) — an immersive language learning Progressive Web Application (PWA) that transforms authentic YouTube videos into interactive, high-retention language lessons for **Japanese**, **Chinese**, **Korean**, and **English**.

This documentation suite serves as the definitive technical reference for human software engineers and autonomous AI agents.

---

## 📚 Document Index

| Document | Description | Target Audience |
| :--- | :--- | :--- |
| **[AGENTS.md](../AGENTS.md)** / **[doc/agents.md](agents.md)** | AI Agent Operating Guide, Critical Invariants, Rule 7 Auto-Update Mandate & Workflows | Autonomous AI Agents (Antigravity, Cursor, Copilot) |
| **[1. Architecture & Component Map](map.md)** | System topology, Mermaid architecture maps, data flow sequences & directory responsibility matrix | Full-stack Engineers, Architects |
| **[2. Technology Stack & Tooling](tech.md)** | Breakdown of frameworks, NLP tokenizers, edge compilers, translation engines & dependencies | Developers, DevOps |
| **[3. Backend API & Serverless Edge](backend-api.md)** | Cloudflare Pages Functions, local dev server (Innertube), endpoints, middlewares & providers | Backend & Cloud Engineers |
| **[4. Frontend Architecture](frontend-architecture.md)** | Angular 19 Signals, Standalone Components, offline-first repositories, UI system & design tokens | Frontend Engineers, UI/UX |
| **[5. Feature Specifications](features.md)** | In-depth logic for sticky subtitles, AI transcription, hybrid dictionaries, grammar engine & SM-2 SRS | Product, Developers, QA |
| **[6. Database & Storage Architecture](database-and-storage.md)** | D1 SQLite schemas, R2 bucket layout, KV keys, PocketBase collections & IndexedDB persistence | Database & Data Engineers |
| **[7. Developer & Operations Guide](development-guide.md)** | Local environment setup, dev server, test runners, linting, deployment & troubleshooting | Contributors, Maintainers |

---

## 🚀 Quick Glance at Voca

```
                     ┌───────────────────────────────┐
                     │             VOCA              │
                     │    Next-Gen Language PWA      │
                     └───────────────┬───────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
   🎬 Video & Subtitles       🧠 Smart Linguistics      📚 Study & Retention
   • YouTube IFrame API       • Japanese Kuromoji       • SM-2 Spaced Repetition
   • Sticky Subtitle Cues     • Chinese / Korean Intl   • Cloud Sync (PocketBase)
   • Gladia AI Transcription  • Multi-Source Dicts      • Daily Streak Gamification
   • Draggable Fullscreen Sub • Grammar Rule Engine     • Custom Playlists & History
   • Dual Subtitle Sync       • Romaji & Pinyin Guides  • Sentence Context Mining
```

### Key Technical Pillars
1. **Edge-First Serverless & Dual Backend**: Fast global response times using Cloudflare Pages Functions, Cloudflare D1 (edge SQLite), Cloudflare R2 (transcript & translation store), and Cloudflare KV (caching & rate limiting), complemented by a feature-complete local development server with YouTube Innertube caption extraction.
2. **Signal-Driven Reactive Frontend**: Built on Angular 19 using Signals (`signal`, `computed`, `effect`) and `ChangeDetectionStrategy.OnPush` for instant UI rendering and zero Zone.js manual overhead.
3. **Multi-Source Hybrid Dictionary & NLP**: Real-time word segmentation and lookups combining Kuromoji, Intl.Segmenter, Jotoba, Mazii, Naver (En/Ko/Vi), MDBG, FreeDictionary, and Glosbe with automated Google Translate GTX fallback.
4. **Comprehensive Grammar & Translation Engine**: JLPT N5–N1, TOPIK I–II, HSK 1–6, and CEFR A1–C2 grammar detection with multi-language native and translated explanations, plus batch dual-subtitle translations.
5. **Robust Security & Diamond Economy**: Multi-tier defense including bot mitigation, tiered rate limits, SSRF guards, Cloudflare Turnstile CAPTCHA, and self-regenerating Diamond credits.
6. **Documentation Synchronization Mandate (Rule 7)**: Autonomous AI agents are required to keep all documentation synchronized with every significant code, API, schema, or configuration update.

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

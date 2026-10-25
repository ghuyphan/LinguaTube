# Voca 📺 🎌 🇨🇳 🇰🇷 🇬🇧

**Turn any YouTube video into an interactive, high-retention language lesson.**

Voca (formerly LinguaTube) is a modern, immersive Progressive Web Application (PWA) designed to help you master **Japanese**, **Chinese**, **Korean**, and **English** directly from authentic video content. It combines YouTube's massive library with cutting-edge language tools: interactive clickable subtitles, instant multi-source dictionary lookups, grammar pattern detection, an SM-2 spaced repetition system (SRS), and Gladia AI-powered audio transcription.

![Angular 19](https://img.shields.io/badge/Angular-19-%23DD0031?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-%233178C6?style=flat-square&logo=typescript)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-Serverless-%23F38020?style=flat-square&logo=cloudflare)
![PWA](https://img.shields.io/badge/PWA-Offline--First-%235A0FC8?style=flat-square)

---

## ✨ Key Features

### 🎬 Universal Video Support & Player Controls
- **YouTube & Instant Transcript Discovery**: Paste any YouTube URL or explore **"For You"** recommendations featuring single videos with pre-cached database transcripts (<100ms loading, zero AI credit cost) and curated community playlists.
- **Dual-Engine Captions**: Extracts native YouTube subtitles (via Supadata in production and Innertube in local dev) with automatic language discovery.
- **Gladia AI Transcription Fallback**: For videos without native subtitles, generate timestamped, highly accurate transcripts using speech-to-text AI.
- **Sticky Subtitles**: Custom algorithm eliminates flicker between natural speech gaps, keeping cues on screen until the next phrase begins.
- **Draggable Fullscreen Subtitles**: Reposition subtitles anywhere on screen with smooth pointer-capture drag handles and instant top/bottom snap targets (12% and 82%).
- **Desktop & Mobile Controls**: Keyboard shortcuts (`Space`, `k`, `j`/`l`, `c`, `f`) and mobile gestures (swipe volume, double-tap seek).

### 🧠 Smart Linguistics & Interactive Dictionaries
- **Language-Specific Tokenization**:
  - **Japanese**: Morphological analysis via `@patdx/kuromoji` with on-demand CDN dictionary loading.
  - **Chinese**: Word boundary segmentation with `Intl.Segmenter` and `pinyin-pro` tone marks.
  - **Korean**: `Intl.Segmenter` paired with `hangul-romanization` (Revised Romanization).
  - **English**: Word and punctuation segmentation via `Intl.Segmenter`.
- **Reading Display Modes**: Choose between **Native**, **Annotated Ruby** (Furigana/Pinyin), **Reading Only**, **Annotated Romanized**, or **Romanized** (Hepburn Romaji).
- **Multi-Source Hybrid Dictionary**:
  - Click any subtitle token for instant definitions, readings, audio pronunciations, and level indicators (JLPT, HSK, TOPIK).
  - Backed by Jotoba, Mazii, Naver (En/Ko/Vi), MDBG, FreeDictionary, and Glosbe with automatic Google Translate GTX fallback.
- **Grammar Pattern Recognition**:
  - Automatically identifies grammatical structures across **Japanese** (JLPT N5–N1), **Korean** (TOPIK I–II), **Chinese** (HSK 1–6), and **English** (CEFR A1–C2).
  - Includes multi-language explanations (translated into Vietnamese, Chinese, Japanese, Korean, and English) and native-to-native explanations (`ja_ja`, `ko_ko`, `zh_zh`).
- **Dual-Language Subtitles**: Display learning subtitles alongside translated subtitles in English, Vietnamese, Japanese, Korean, or Chinese with quick flag switching. Powered by a centralized cache-first architecture (`/api/dual-subtitles?onlyCache=true`) with sliding-window lazy translation and zero playback start delay across player overlays and subtitle lists.

### 📚 Study & Retention Tools
- **Video Difficulty Level Categorization**: Automatic three-stage hybrid classifier profiles videos into standardized levels: **JLPT N5–N1**, **HSK 1–6**, **TOPIK 1–6**, and **CEFR A1–C2**, combining title fast-path heuristics, speech velocity (CPM/WPM), and 2,400+ grammar patterns with global edge persistence in Cloudflare D1. Level badges and filters are integrated directly into **Playlists** and **Watch History**.
- **Gamification, XP & Achievements**: Earn XP by watching videos (+25 XP), saving vocabulary (+5 XP), reviewing flashcards (+10 XP), and mastering subtitle quizzes (+15 XP). Progress through learner ranks (Novice $\rightarrow$ Grandmaster) and unlock 41 achievement badges across Immersion, Vocabulary, Vocabulary Mastery, Streaks, SRS, and Quizzes with real-time celebration toasts.
- **Global Leaderboard & Rankings**: Compete with learners globally on a Top 3 Podium (Gold 👑, Silver 🥈, Bronze 🥉) with ranks #4 to #50, language-filtered benchmarks, and a sticky anchor bar highlighting your live rank.
- **SM-2 Spaced Repetition Flashcards**: Review saved vocabulary with an optimized SuperMemo-2 algorithm featuring real-time interval preview badges (`<10m`, `1d`, `3d`, `6d`), failed card session recycling, audio auto-play, and anti-spoiler peek reading.
- **Authentic Video Scene Replay & Cloze Practice**: Jump directly from any flashcard back into the exact video scene (`[▶ Watch Scene]`), or practice active recall with Cloze sentence masking.
- **Gamified Streaks & Freeze Inventory**: Track daily study streaks with streak freeze protections (up to 2 freezes) and milestone rewards.
- **Playlists & History with Level Filtering**: Organize videos into custom playlists, filter playlists and watch history by proficiency levels, explore curated community channels, and resume progress automatically.
- **Offline-First Persistence & Clean Session Isolation**: Operates seamlessly offline with IndexedDB (`lingua-tube-cache`) and LocalStorage, with two-way cloud synchronization to Supabase. Features full session teardown (`AuthService.logoutEvent`) across all repositories to prevent cross-account data leakage, deterministic ID normalization, and automatic 401 token refresh/sign-out.
- **Diamond Credits & Supporter Backing**: Sustainable multi-tier quota system (`free` default with 5 credits, 15m regen, 10m video cap; `pro` with 10 credits, 10m regen, 20m video cap; `premium` with 25 credits, 4m regen, 45m video cap) with instant VietQR open banking community patronage via payOS.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20.11` to `<23.0` (Node 20 or 22 LTS recommended)
- **npm**: `v10+`

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ghuyphan/LinguaTube.git
   cd lingua-tube
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```bash
   cp .dev.vars.example .dev.vars
   ```
   Provide your API keys in `.dev.vars` (e.g., `GLADIA_API_KEY`, `SUPADATA_API_KEY`, `TURNSTILE_SECRET_KEY`, `PAYOS_CLIENT_ID`).

4. **Start Development Environment**
   ```bash
   npm run dev
   ```
   This concurrently runs the local Express mock server (port 3001) and the Angular dev server (`http://localhost:4200`).

---

## 🛠️ CLI Commands Reference

| Command | Action |
|---------|--------|
| `npm run dev` | Runs Angular dev server (`localhost:4200`) and local backend (`localhost:3001`) |
| `npm run build:functions` | Bundles Cloudflare Pages Functions from `functions-src/` into `functions/` via esbuild |
| `npm run build` | Full production build: compiles functions and Angular client into `dist/` |
| `npm run lint` | Runs ESLint 9 checks across TypeScript and HTML templates |
| `npm run lint:fix` | Automatically fixes autofixable ESLint issues |
| `npm run test:backend` | Executes Node.js test runner for security and validator tests |
| `npm run test` | Executes Angular unit tests with Karma |
| `npx wrangler pages dev` | Previews Cloudflare Pages Functions against D1 and KV bindings |

---

## 📖 Complete Documentation Suite

For complete architectural guides, database schemas, and developer manuals, see the [`doc/`](doc/) directory:

- **[AI Agent Operating Guide (AGENTS.md)](AGENTS.md)**: Critical invariants, architecture map, workflows, Rule 7 auto-update mandate, and checklists.
- **[Documentation Portal (doc/README.md)](doc/README.md)**: Guide index.
  - [1. System Architecture & Component Map](doc/map.md)
  - [2. Technology Stack & Tooling](doc/tech.md)
  - [3. Backend API & Serverless Edge](doc/backend-api.md)
  - [4. Frontend Architecture & UI System](doc/frontend-architecture.md)
  - [5. Feature Specifications & Deep Dive](doc/features.md)
  - [6. Database & Storage Architecture](doc/database-and-storage.md)
  - [7. Developer & Operations Guide](doc/development-guide.md)
  - [8. Mobile API Integration Guide](doc/mobile-api-integration.md)

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` or `k` | Play / Pause |
| `←` / `→` | Seek $-5$s / $+5$s |
| `j` / `l` | Seek $-10$s / $+10$s |
| `c` | Toggle Subtitles |
| `f` | Toggle Fullscreen |
| `m` | Toggle Mute |
| `Shift` + `<` / `>` | Adjust Playback Speed (0.5x – 2x) |
| `Esc` | Close Dictionary or Settings Sheets |

---

## 📄 License & Acknowledgments

- Licensed under the **MIT License**.
- Inspired by [Language Reactor](https://www.languagereactor.com/) and [LinguaCafe](https://github.com/simjanos-dev/LinguaCafe).
- Dictionary data provided by [Jotoba](https://jotoba.de/), [Jisho.org](https://jisho.org/), [Mazii](https://mazii.net/), [Naver](https://dict.naver.com/), and [MDBG](https://www.mdbg.net/).
- Speech AI powered by [Gladia](https://gladia.io/).

Backend/service review and migration prerequisites: [2026-10-23 report](../voca_flutter/doc/backend-service-review-2026-10-23.md).

The report now includes concrete service modules, durable refund/subscription/reminder recovery, migration order, prepared Vault/Cron configuration, and [controlled performance measurements](../voca_flutter/doc/backend-service-metrics-2026-10-23.json).

Security follow-up (2026-10-23): anonymous-credit amounts are validated before mutation; refund recovery checks the persisted charge owner, amount and terminal state before confirmation. Shared Supabase XP-spending hardening is prepared at `../voca_flutter/supabase/migrations/20261023170000_secure_xp_spending.sql`; apply once to the shared project. See `../voca_flutter/doc/security-follow-up-2026-10-23.md` for tests and limits. Cloudflare functions were bundled locally; deployment remains with Gemini and the earlier private release snapshot is stale.

## Backend reliability update (2026-10-24)

The backend now persists Gladia callbacks before acknowledgement, identifies dictionary definition languages, and uses idempotent XP purchase operations. Schema migrations must precede the coordinated release.

See [validation and migration handoff](../voca_flutter/doc/backend-implementation-2026-10-24.md).

Account/security, public learner sharing, and web subscription management are
implemented alongside Flutter. See the [activation handoff](../voca_flutter/doc/account-experience-implementation-2026-10-24.md) before deployment; new read RPCs and callback allowlists must be ready first.

Public legal documents, learner profiles and password-recovery links open in a
minimal layout without learning onboarding or automatic app prompts. Account and
subscription screens follow the existing app panels and support all five UI
locales; the legal document text remains English. First-time onboarding remains
available on learning pages, with no replay action in Settings.

These pages reuse the app's shared panels, Settings language picker, visibility
switch and upgrade bottom sheet rather than separate lookalike controls.

Buttons, form fields and sliding tabs inherit Voca's shared control styles directly;
compact localized tab labels fit the existing mobile toolbar.

## Recommendation reliability (2026-10-25)

The production recommendation path now uses a fixed eligible discovery window, stable pagination, bounded metadata/transcript verification and personalized-cache isolation. See [API contract](doc/backend-api.md) section 3.10. No schema migration is needed; rebuild generated functions from `functions-src` before release.

### Backend reliability update (25 October 2026)

Transcript reads now return available cues before optional token enrichment, concurrent translation requests share work, and Gladia submissions recover uncertain outcomes without duplicate creation requests. **Apply the additive D1 submission-state migration before deploying this bundle.** Deployment order, validation and scope are documented in the [implementation record](doc/reviews/cloudflare-functions-implementation-2026-10-25.md).

The [Cloudflare edge-case suite](doc/reviews/cloudflare-edge-cases-2026-10-25.md) covers every API route through local workerd, plus shared-helper boundaries. It also found and corrected native Workers fetch compatibility and malformed-body handling; production deployment remains separate.

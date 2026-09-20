# Voca — AI Agent Instructions & Architectural Guide (AGENTS.md)

This document provides essential instructions, architectural design, codebase maps, critical invariants, and development workflows for AI coding assistants (e.g., Antigravity, Cursor, Claude Code, GitHub Copilot) working in this repository.

---

## 1. Executive Summary & Purpose

**Voca** (formerly LinguaTube) is a high-performance Progressive Web Application (PWA) designed for language learners (specifically **Japanese**, **Chinese**, **Korean**, and **English**) using authentic YouTube videos. It combines interactive synchronized subtitles, morphological tokenization, multi-source dictionary lookups, grammar pattern detection, an SM-2 spaced repetition (SRS) vocabulary notebook, and Gladia AI-powered audio transcription.

### Key Metrics & Technologies
- **Frontend**: Angular 19 (Standalone Components, Signals, `ChangeDetectionStrategy.OnPush`, RxJS 7.8, TypeScript 5.6)
- **Backend (Production)**: Cloudflare Pages Functions (Serverless ESM Workers, bundled with esbuild)
- **Backend (Local Dev)**: Node.js / Express 5 server (`server/server.js`) with Innertube (`youtubei.js`) & disk cache proxied via `proxy.conf.json`
- **Database & Storage**:
  - **Cloudflare D1** (SQLite at the edge) for video metadata, language discovery registries, and negative caching
  - **Cloudflare R2** (S3-compatible bucket) for permanent transcript storage (`transcripts/{videoId}/{lang}.json`) and dual-language translations
  - **Cloudflare KV** for transient caching, tokenization hashes, and distributed rate limiting
  - **Supabase** (`https://edbkvzviqeulwzcnrrlb.supabase.co`) for PostgreSQL user authentication (Google OAuth), cloud sync (vocabulary, SRS flashcards, streaks, playlists, history, gamification), and Row Level Security (RLS)
  - **IndexedDB (`lingua-tube-cache`) & LocalStorage** for client-side offline-first persistence

---

## 2. Critical Invariants (Non-Negotiable Rules)

When modifying this repository, you **MUST** adhere to the following rules:

### ⚠️ RULE 1: Never Edit `functions/` Directly
- `functions-src/` is the **single source of truth** for all Cloudflare Pages Functions.
- `functions/` contains generated, bundled output produced by `scripts/build-functions.js`.
- Any manual edit inside `functions/` **will be obliterated** on the next build!
- **Workflow**: Always make changes in `functions-src/`, then immediately run:
  ```bash
  npm run build:functions
  ```

### ⚠️ RULE 2: Preserve Cloudflare Free Tier KV Quotas
- Cloudflare KV free tier provides only **1,000 writes/day** (compared to 100,000 writes/day for D1).
- **In-Memory First**: Always use in-memory caches (`memRateLimits`, `memNegDictCache`) across warm Worker isolates before touching KV.
- **Throttled KV Sync**: Rate-limit counters only sync to KV if count hits a threshold (e.g. every 5 units or >80% quota).
- **Persistent Storage in D1**: Store persistent registries and negative caches (`no_transcript_cache`, `video_languages`) in **D1**, never in KV.

### ⚠️ RULE 3: Angular 19 Signal-First Architecture
- Prefer Angular Signals (`signal()`, `computed()`, `effect()`) for component and service UI state.
- Keep components `ChangeDetectionStrategy.OnPush`.
- Only use RxJS for asynchronous event streams, HTTP requests, or timers, and bridge to signals via `.subscribe()` or computed values.
- Never introduce `Zone.js` manual change detection tricks or pollute templates with method executions.

### ⚠️ RULE 4: Offline-First Repository Pattern with Deterministic IDs
- Client-side repositories (`OfflineVocabularyRepository`, `OfflineStreakRepository`, `OfflinePlaylistRepository`, `OfflineHistoryRepository`, `OfflineGamificationRepository`) MUST continue functioning when offline.
- When generating remote IDs for synced entities (like vocabulary items), use deterministic keys (e.g. `base64(userId + '|' + word + '|' + lang).slice(0, 15)`) to prevent duplicate records upon concurrent sync.
- Use the timestamp-based merge strategy (`mergeByTimestamp` from `src/app/shared/utils/sync.utils.ts`).

### ⚠️ RULE 5: SSRF Defense & API Security
- Any external URL passed into backend functions (e.g., `resultUrl` in `/api/transcript`) MUST be strictly validated.
- Reject non-HTTPS protocols, local/private IP ranges (`127.0.0.1`, `10.0.0.0/8`, `192.168.0.0/16`, `172.16.0.0/12`, `localhost`), and untrusted hostnames.
- Whitelist upstream hosts (`api.gladia.io`, `jisho.org`, `jotoba.de`).

### ⚠️ RULE 6: Turnstile CAPTCHA & Diamond Credits Protection
- AI transcription via Gladia costs real API credits.
- All AI transcription requests require:
  1. Valid Cloudflare Turnstile token (`turnstileToken`) verified via `verifyTurnstileToken`.
  2. Sufficient Diamond credits (1 credit $\le 10$ mins, 2 credits $10$–$20$ mins, 3 credits $20$–$35$ mins, 4 credits $35$–$45$ mins; duration cap enforced by tier: 10 mins for Free, 20 mins for Pro, 45 mins for Premium).

### ⚠️ RULE 7: Documentation Synchronization Mandate (Auto-Update Docs on Significant Changes)
- **Whenever an agent makes a significant update to the codebase, the agent MUST automatically update all corresponding documentation files in `doc/`, `README.md`, and `AGENTS.md` before concluding the task.**
- **What constitutes a "Significant Change"?**
  1. **Backend & API Changes**: Adding or altering endpoints in `functions-src/api/`, modifying rate limits, security middleware, or external providers $\rightarrow$ Update `doc/backend-api.md` and `doc/map.md`.
  2. **Database & Storage Changes**: Altering D1 SQL schemas in `db/`, R2 bucket structures, KV namespace keys, LocalStorage keys, or Supabase PostgreSQL tables $\rightarrow$ Update `doc/database-and-storage.md` and `doc/map.md`.
  3. **Frontend & UI Architecture**: Adding or modifying components, signals, routes in `app.routes.ts`, player controls, sheets, or design tokens $\rightarrow$ Update `doc/frontend-architecture.md`, `doc/features.md`, and `doc/map.md`.
  4. **Linguistics & NLP Features**: Changing tokenizers (`@patdx/kuromoji`, `compromise`, `Intl.Segmenter`), romanization engines, grammar patterns (`src/app/data/grammar-*.ts`), translation scripts, or dictionary scrapers $\rightarrow$ Update `doc/features.md` and `doc/tech.md`.
  5. **Tooling, Scripts & Configuration**: Adding dependencies to `package.json`, adding build scripts in `scripts/`, updating `wrangler.toml`, `.dev.vars`, or environment files $\rightarrow$ Update `doc/tech.md`, `doc/development-guide.md`, and `README.md`.
  6. **Agent Rules & Guidance**: Any change to `AGENTS.md` MUST also be mirrored in `doc/agents.md`.
- **Never defer documentation updates**: Treat documentation as a first-class build artifact. Do not wait for the user to ask for documentation updates.

### ⚠️ RULE 8: CI/CD Build Preservation & Controlled Versioning (NO Autonomous Bumping or Build Churn)
- **Zero Autonomous Version Bumping**: Agents **MUST NOT** bump version numbers, update release dates, or edit changelog/highlights files (`src/app/data/version-info.json`, `package.json`, etc.) unless the USER **explicitly** requests a version bump or release (e.g., "prepare release v1.2.0", "bump version", "update changelog"). Routine tasks, feature additions, and bug fixes MUST leave versioning untouched.
- **Mandatory `[skip ci]` for Non-Deployable Commits**: Any commit that only modifies documentation (`doc/**`, `*.md`), tests (`tests/**`), database schemas/scripts (`db/**`), or agent rules MUST include `[skip ci]` in the commit title or description. This prevents triggering redundant GitHub Actions CI jobs and preserves Cloudflare Pages monthly build quotas.
- **Batch Commits**: Avoid pushing multiple small, incremental commits for a single task. Consolidate changes into a single, clean commit to minimize CI/CD pipeline triggers.
- **Selective Local Builds**:
  - Run `npm run build:functions` **ONLY IF** files in `functions-src/` were actually created or edited.
  - Do NOT run `npm run build:functions` or `npm run build` for frontend-only, documentation-only, or test-only changes.
- **Single Source of Truth**: When an explicit release IS requested by the user, version metadata is managed centrally in `src/app/data/version-info.json` and updated via `npm run release [patch|minor|major|<version>]`.

### ⚠️ RULE 9: Miniplayer Architecture & Container Query Isolation
- **Dual Presentation Modes**:
  1. **Desktop Floating PiP Card**: Docked to the bottom-right (`bottom: 24px; right: 24px; width: 360px`), 16:9 aspect ratio, upper 2px horizontal progress bar, video hover controls overlay (`.miniplayer-video-hover-overlay`), and clean single-line title/channel bottom bar (`.miniplayer-desktop-bar`).
  2. **Mobile Floating Docked Bar**: Floats above bottom navigation (`bottom: calc(var(--bottom-nav-total-height, 5rem) + 8px); height: 60px`), `80px` thumbnail on the left, single-line title/channel in the center, play/pause and close touch buttons on the right (`.miniplayer-controls`), and full-width bottom progress track.
- **Dedicated Miniplayer Classes (Zero Class Contamination)**:
  - **NEVER** use generic layout utility classes like `.desktop-only` or `.mobile-only` on miniplayer elements.
  - Always use dedicated classes: `.miniplayer-desktop-element` and `.miniplayer-mobile-element`.
  - Generic `.desktop-only` and `.mobile-only` classes are subject to pointer media queries, container queries, and layout breakpoints that will corrupt the miniplayer.
- **Container Query Disablement on Miniplayer**:
  - `.video-container.is-miniplayer` MUST specify `container-type: normal !important;`.
  - Because desktop miniplayer width is `360px`, any queries like `@container video-player (max-width: 640px)` will match if container containment is active.
  - Video player container queries MUST also be explicitly scoped to `.video-container:not(.is-miniplayer)`.

### ⚠️ RULE 10: User-Centric Release Notes (Patch Notes for Humans)
- **Learner-First Communication**: When preparing releases and authoring `highlights` in `src/app/data/version-info.json`, **always write for everyday language learners, not software engineers**.
- **What to Write**:
  - Describe the **concrete user benefit, visible polish, and tactile feeling**: what looks better, what feels faster, what frustration was removed.
  - Example: *"Restored Desktop Miniplayer: Enjoy seamless picture-in-picture playback with clean titles, instant expand on click, and easy hover controls."*
- **What NOT to Write**:
  - **Zero technical jargon**: Never mention CSS selectors, container queries, flexbox properties, hex colors, regex patterns, DOM event bubbling, SQL indexes, or API header names.
- **Full 5-Language Parity**: Always provide natural, idiomatic translations across all 5 supported languages: `en` (English), `vi` (Vietnamese), `ja` (Japanese), `ko` (Korean), and `zh` (Chinese).

---

## 3. High-Level Architecture Map

```
┌────────────────────────────────────────────────────────────────────────┐
│                      VOCA APPLICATION STACK                            │
└────────────────────────────────────────────────────────────────────────┘

 [ CLIENT: Angular 19 PWA ]
    │
    ├── Video Feature: VideoPlayerComponent (YouTube IFrame API)
    │                  SubtitleDisplayComponent (Furigana, Pinyin, Romaji)
    │                  FullscreenSubtitleComponent (Draggable handle & free placement)
    │                  VideoHeader / VideoBottomBar / CenterControls / ProgressBar
    │
    ├── Linguistics:   Kuromoji (JA) / Compromise (EN) / Intl.Segmenter (ZH/KO)
    │                  GrammarService (JA/KO/ZH/EN rule engine & multi-lang translations)
    │                  DictionaryService (Jotoba, Mazii, Naver, MDBG, FreeDict)
    │                  TranslationService (Lingva / Google GTX + batch queue)
    │
    ├── Study Tools:   StudyPageComponent (SM-2 Spaced Repetition Flashcards)
    │                  VocabularyListComponent / VocabularyQuickView
    │                  StreakService (Daily practice tracking & freeze items)
    │                  PlaylistService & HistoryService
    │
    └── State / Repos: Offline-First Repositories (LocalStorage + IndexedDB lingua-tube-cache)
                       Supabase Client (Auth, Sync, Profiles, Playlists, History, Streaks)
          │
          │ HTTP / REST API (via /api/*)
          ▼
 [ BACKEND: Cloudflare Pages Functions / Local Express Server ]
    │
    ├── API Middleware: Bot Defense (Scraper User-Agents & CF Threat Score)
    │                   Distributed Rate Limiter (In-Memory + KV)
    │                   Supabase JWT Auth Verification (0ms local decode & profiles)
    │                   Video Duration & Language Validator
    │
    ├── Endpoints:
    │     POST /api/transcript          -> Transcript Orchestrator (R2 -> Supadata -> Gladia)
    │     POST /api/gladia-webhook      -> Gladia Webhook Receiver (Svix/derived token, sub-40ms)
    │     GET  /api/dict                -> Unified Multi-Source Dictionary Engine
    │     POST /api/dual-subtitles      -> Batch Translation & Multi-Sub Caching
    │     POST /api/tokenize/:lang      -> Single-text Kuromoji / Intl Segmentation
    │     POST /api/tokenize-batch/:lang-> Batch subtitle tokenization
    │     GET  /api/translate/[[path]]  -> Single-text translation proxy (Lingva/GTX)
    │     POST /api/translate/batch     -> Batch translation (up to 50 items) + KV cache
    │     GET  /api/video-info          -> Two-Tier Cached YouTube Metadata
    │     GET  /api/video-level         -> Video Proficiency Level Detection (JLPT/HSK/TOPIK/CEFR)
    │     GET  /api/recommended-videos  -> Video Recommendations by Target Language
    │     GET  /api/leaderboard         -> Gamification XP Leaderboard
    │     GET  /api/diamonds            -> Diamond Token Quota & Regen Status
    │     POST /api/payment/create-order-> PayOS Checkout Link Generator
    │     POST /api/payment/webhook     -> PayOS Payment Confirmation & Diamond Grant
    │     GET  /api/payment/check-status-> Polling Order Payment Status
    │
    └── Cloud Infrastructure:
          ├── Cloudflare D1             -> SQLite Tables: ai_transcription_jobs, transcripts, video_meta, video_languages, no_transcript_cache
          ├── Cloudflare R2             -> transcripts/{videoId}/{lang}.json & translations/{videoId}/{source}_{target}.json
          ├── Cloudflare KV             -> Rate limits, short-lived tokens, video-info, batch translation cache
          ├── Supabase (PostgreSQL)     -> Cloud user records (profiles), vocabulary, streaks, history, playlists, gamification
          └── External APIs             -> Gladia (ASR), Supadata, Lingva, Naver, Jotoba, PayOS, Innertube (dev)
```

---

## 4. Repository Directory Structure

```
lingua-tube/
├── AGENTS.md                  # This file (AI agent guidance, rules & architecture)
├── README.md                  # Public overview and quickstart
├── package.json               # Dependencies, scripts, engine constraints (Node >=20.11 <23)
├── angular.json               # Angular CLI configuration, build targets, PWA assets
├── wrangler.toml              # Cloudflare Pages bindings (D1, R2, KV, vars)
├── proxy.conf.json            # Angular CLI dev proxy mappings to localhost:3001
├── eslint.config.js           # Modern ESLint flat config with typescript-eslint
├── karma.conf.js              # Unit testing harness with Chrome headless
│
├── doc/                       # Comprehensive documentation suite
│   ├── README.md              # Documentation index & portal
│   ├── agents.md              # Mirror of AGENTS.md
│   ├── map.md                 # System Architecture & Component Map
│   ├── tech.md                # Technology stack & dependencies
│   ├── backend-api.md         # API routes, middlewares, services & providers
│   ├── frontend-architecture.md # Angular 19, Signals, components & design system
│   ├── features.md            # Features deep dive (Subtitles, AI, Dict, SRS, etc.)
│   ├── database-and-storage.md# D1, R2, KV, Supabase, IndexedDB schemas
│   ├── development-guide.md   # Developer setup, commands, testing & debugging
│   └── mobile-api-integration.md # Complete mobile API reference & Supabase sync guide
│
├── db/                        # Cloudflare D1 SQL Schema & Migrations
│   ├── schema.sql             # Base schema (transcripts, vocabulary, ai_transcription_jobs)
│   ├── create-ai-transcription-jobs.sql # ai_transcription_jobs table with partial unique index
│   ├── add-video-meta.sql     # video_meta table
│   ├── add-pending-columns.sql# Gladia pending job status columns
│   └── add-video-languages.sql# video_languages & no_transcript_cache tables
│
├── scripts/                   # Build automation & data processing
│   ├── build-functions.js     # esbuild pipeline: functions-src/ -> functions/
│   ├── merge-translations.js  # Merges grammar chunk translations into app data
│   ├── generate-translations.js# Generates automated grammar translations
│   ├── grammar-chunks/        # Chunked grammar translation input/output datasets
│   └── translations-builder/  # Translation building pipeline scripts
│
├── functions-src/             # CLOUDFLARE FUNCTIONS SOURCE (Edit here!)
│   ├── api/                   # Public HTTP route handlers
│   │   ├── _middleware.js     # Bot defense interception
│   │   ├── diamonds.js        # Diamond credits check & regen
│   │   ├── dict.js            # Unified dictionary lookup
│   │   ├── dual-subtitles.js  # Dual-language subtitle generator
│   │   ├── gladia-webhook.js  # Dual-auth webhook receiver with sub-40ms ack & waitUntil
│   │   ├── leaderboard.js     # Gamification XP leaderboard
│   │   ├── payment/           # Payment processing (create-order, webhook, check-status)
│   │   ├── recommended-videos.js # Target language video recommendations
│   │   ├── tokenize/          # Single-text tokenization ([lang].js)
│   │   ├── tokenize-batch/    # Batch tokenization ([lang].js)
│   │   ├── transcript.js      # Unified transcript fetching & AI generation
│   │   ├── translate/         # Translation endpoints ([[path]].js, batch.js)
│   │   ├── video-info.js      # Video metadata & language discovery
│   │   └── video-level.js     # CEFR/JLPT/HSK/TOPIK level detection
│   ├── middlewares/           # auth.js, bot-defense.js, rate-limiter.js, video-validator.js
│   ├── providers/             # gladia.js, supadata.js, lingva.js, dictionary-apis.js, payos.js
│   ├── services/              # transcript.service.js, dict.service.js, diamond.service.js, turnstile.service.js, recommendation.service.js
│   ├── data/                  # transcript-db.js, transcript-r2.js, video-info-db.js
│   └── utils/                 # svix-verifier.js, tokenizer.js, japanese-romaji.js, cache-manager.js, api-key-rotator.js, utils.js
│
├── functions/                 # COMPILED FUNCTIONS (DO NOT EDIT DIRECTLY)
│
├── server/                    # Local Express Dev Server
│   ├── server.js              # Dev mock & live Innertube (youtubei.js) caption fetcher
│   └── transcripts_cache/     # Local disk cache for dev transcripts
│
├── src/                       # ANGULAR FRONTEND SOURCE
│   ├── main.ts                # Application bootstrap
│   ├── index.html             # Host HTML & meta tags
│   ├── styles.scss            # Global styling entry
│   ├── styles/                # SCSS modular architecture (_variables, _base, _layout, etc.)
│   ├── environments/          # Environment configuration (dev vs prod)
│   ├── app/
│   │   ├── app.component.ts   # Root layout shell, sidebar, dialog containers
│   │   ├── app.routes.ts      # Lazy-loaded route definitions (/video, /dictionary, /study, etc.)
│   │   ├── components/        # Shell components (sidebar, settings-sheet, streak-dialog, etc.)
│   │   ├── core/              # Foundational services, repositories & utilities
│   │   ├── data/              # Grammar databases (JA, KO, ZH, EN) & translations (ja, ko, vi, zh)
│   │   ├── features/          # Feature domains (video, dictionary, vocabulary, playlist, history, quiz)
│   │   ├── i18n/              # UI translation dictionaries (en, vi, ja, ko, zh.json)
│   │   ├── interceptors/      # HTTP auth, caching & timeout interceptors
│   │   ├── models/            # TypeScript interfaces & domain types
│   │   ├── services/          # Cross-cutting services (grammar, translation, streak, etc.)
│   │   └── shared/            # Shared components (bottom-sheet, icon, command-palette, turnstile)
│   └── public/                # Static assets, icons, manifest.webmanifest
│
└── tests/                     # Automated test suites
    └── backend-security.test.mjs # Node.js test runner for security & validators
```

---

## 5. Common Development Workflows for Agents

### Workflow 1: Adding or Modifying a Backend API Endpoint
1. Edit or add files in `functions-src/api/` or `functions-src/services/`.
2. Ensure you import security middleware (`checkBot`, `consumeRateLimit`, `validateAuthToken`).
3. If creating a new route file, make sure it is in `functions-src/api/` (these are picked up as entry points by esbuild).
4. Run the bundle script:
   ```bash
   npm run build:functions
   ```
5. If running locally with the express server, update `server/server.js` or `proxy.conf.json` if needed.
6. Run unit tests:
   ```bash
   npm run test:backend
   ```
7. Update `doc/backend-api.md` and `doc/map.md`.

### Workflow 2: Updating or Adding a Dictionary Provider
1. Dictionary scraping/API logic resides in `functions-src/providers/dictionary-apis.js` and `functions-src/utils/dict-parsers.js`.
2. For local dev server support, mirror changes in `server/server.js` under `fetchDictLocal()`.
3. Rebuild functions:
   ```bash
   npm run build:functions
   ```
4. Update `doc/features.md` and `doc/backend-api.md`.

### Workflow 3: Modifying Angular UI Components or Signals
1. Use Angular 19 Standalone Component conventions (`standalone: true`).
2. Mark components with `changeDetection: ChangeDetectionStrategy.OnPush`.
3. Use `inject(Service)` instead of constructor injection.
4. If reading reactive state, use `signal()`, `computed()`, or `toSignal()`.
5. Run linting to verify:
   ```bash
   npm run lint
   ```
6. Update `doc/frontend-architecture.md` and `doc/features.md` if components, controls, or design tokens change.

### Workflow 4: Adding New Grammar Patterns
1. Grammar data is split by language in `src/app/data/`:
   - `grammar-ja.ts` (~1.37MB)
   - `grammar-ko.ts` (~1.42MB)
   - `grammar-zh.ts` (~390KB)
   - `grammar-en.ts` (~136KB)
2. Grammar translations live in `src/app/data/translations/{source_lang}/{target_lang}.ts`.
3. `GrammarService` dynamically imports these files on demand to keep the initial client bundle lightweight.
4. Ensure patterns adhere to the `GrammarPattern` interface in `src/app/models/grammar.model.ts`.
5. Update `doc/features.md` and `doc/tech.md`.

### Workflow 5: Synchronizing Documentation on Feature/API Changes
Whenever your task touches any feature, API, database schema, or workflow:
1. **Consult the Documentation Mapping Matrix**:
   - Backend routes/services $\rightarrow$ `doc/backend-api.md`, `doc/map.md`
   - Database schemas, D1, R2, KV, LocalStorage, Supabase $\rightarrow$ `doc/database-and-storage.md`, `doc/map.md`
   - Frontend components, signals, routes, UI system $\rightarrow$ `doc/frontend-architecture.md`, `doc/features.md`
   - Linguistics, NLP, tokenizers, translation $\rightarrow$ `doc/features.md`, `doc/tech.md`
   - Scripts, build commands, environment config, dev server $\rightarrow$ `doc/development-guide.md`, `doc/tech.md`
   - Top-level overview, languages, tech pillars $\rightarrow$ `README.md`, `doc/README.md`
   - Agent instructions, rules, invariants $\rightarrow$ `AGENTS.md` and `doc/agents.md` (keep strictly synchronized)
2. Review all edited files and update relevant diagrams, tables, and code snippets.
3. If new user-facing strings were added, ensure all 5 translation files (`en.json`, `vi.json`, `ja.json`, `ko.json`, `zh.json`) are updated.

### Workflow 6: Controlled Release & Version Management (Explicit User Request Only)
This workflow is ONLY performed when the user explicitly instructs: "prepare release", "bump version", or "update changelog".
1. Update localized release highlights in `src/app/data/version-info.json` under `highlights` (`en`, `vi`, `ja`, `ko`, `zh`) if there are new user-facing features.
2. Run the release script:
   ```bash
   npm run release patch   # or minor, major, or explicit version like 1.2.0
   ```
   This automatically updates `package.json`, stamps `version-info.json` with the new version and current date (`buildDate`), and bundles the updated version into `functions/api/version.js`.
3. Verify with `npm run test:backend` and `npm run lint`.
4. Commit the release changes with a clear release message, e.g. `chore(release): v1.2.0`.

---

## 6. Verification & Quality Assurance Checklist

Before declaring any task complete, verify:
- [ ] `npm run lint` passes without any ESLint warnings or errors.
- [ ] `npm run test:backend` executes and all assertions pass.
- [ ] If `functions-src/` was modified, `npm run build:functions` was executed and exits with code 0.
- [ ] No changes were made directly to `functions/` (only `functions-src/`).
- [ ] Any new strings added to the UI have corresponding translations in all 5 supported languages: `en.json`, `vi.json`, `ja.json`, `ko.json`, and `zh.json`.
- [ ] SSRF security guards and protocol validators remain intact.
- [ ] **Build & Version Hygiene**: Version and changelog files remain untouched unless an explicit release was requested. Commits affecting only docs, tests, or non-code include `[skip ci]`.
- [ ] **Documentation is synchronized**: All relevant `.md` files in `doc/`, `README.md`, and `AGENTS.md` reflect all code, schema, and API changes.

---

## 7. Useful CLI Commands Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Starts local Express server (port 3001) + Angular CLI (`http://localhost:4200`) |
| `npm run build:functions` | Bundles `functions-src/` into `functions/` with esbuild |
| `npm run build` | Full production build: compiles functions and Angular client into `dist/` |
| `npm run release` | Controlled semver bumper: `npm run release [patch\|minor\|major\|<version>]` |
| `npm run test:backend` | Runs Node.js test runner for security checks and validators |
| `npm run lint` | Runs ESLint across `src/**/*.{ts,html}` |
| `npm run lint:fix` | Automatically fixes autofixable ESLint issues |
| `npx wrangler pages dev` | Runs Cloudflare Pages local preview against D1/KV bindings |

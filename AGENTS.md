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
### ⚠️ RULE 11: Concurrency Invariants & Cache Stampede Defense
- **Backend Stampede Protection**: Batch translations on `/api/dual-subtitles` MUST use warm-isolate Promise deduplication (`inFlightTranslations`) to prevent duplicate upstream calls and 429 rate-limiting.
- **R2 Read-Modify-Write Serialization**: Subtitle cache updates (`translation-cache.js`) MUST use isolate-level mutex serialization (`inFlightSaves`) so concurrent chunk commits safely merge without overwriting.
- **Atomic Database Operations**: All subscription extensions and diamond balances MUST use atomic PostgreSQL stored procedures (`FOR UPDATE` locks) or D1 single-statement updates; NEVER use read-then-write patterns in application code for shared balances.
- **Frontend Video-Switch Stale Guard**: Network requests and asynchronous cache loaders MUST verify `currentVideoId === videoId` before updating signals, and cancel pending requests via `takeUntil()` on route/video changes.

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
    │     GET  /api/geo                 -> Geo-IP country & region detection
    │     GET  /api/tts                 -> Edge Neural Text-to-Speech proxy
    │     GET  /api/version             -> App version & client compatibility check
    │     POST /api/payment/create-order-> PayOS Checkout Link Generator
    │     POST /api/payment/webhook     -> PayOS Payment Confirmation & Diamond Grant
    │     GET  /api/payment/check-status-> Polling Order Payment Status
    │
    └── Cloud Infrastructure:
          ├── Cloudflare D1             -> SQLite Tables: ai_transcription_jobs, transcripts, video_meta, video_languages, no_transcript_cache, leaderboard
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
│   │   ├── geo.js             # Geo-IP country & region detection
│   │   ├── gladia-webhook.js  # Dual-auth webhook receiver with sub-40ms ack & waitUntil
│   │   ├── leaderboard.js     # Gamification XP leaderboard
│   │   ├── payment/           # Payment processing (create-order, webhook, check-status)
│   │   ├── recommended-videos.js # Target language video recommendations
│   │   ├── tokenize/          # Single-text tokenization ([lang].js)
│   │   ├── tokenize-batch/    # Batch tokenization ([lang].js)
│   │   ├── transcript.js      # Unified transcript fetching & AI generation
│   │   ├── translate/         # Translation endpoints ([[path]].js, batch.js)
│   │   ├── tts.js             # Edge Neural Text-to-Speech proxy
│   │   ├── version.js         # App version & client compatibility check
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
│   │   ├── features/          # Feature domains (video, dictionary, vocabulary, playlist, history, quiz, legal)
│   │   ├── i18n/              # UI translation dictionaries (en, vi, ja, ko, zh.json)
│   │   ├── interceptors/      # HTTP auth, caching & timeout interceptors
│   │   ├── models/            # TypeScript interfaces & domain types
│   │   ├── services/          # Cross-cutting services (grammar, translation, streak, etc.)
│   │   └── shared/            # Shared components (bottom-sheet, icon, etc.), directives & pure pipes (format-time, flags)
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

## Backend authority additions (2026-10-23)

- Payment idempotency and balances require transactional PostgreSQL RPCs; never use KV locks or read/PATCH fallbacks as financial authority.
- Keep subscription grants separate by provider/tier and reconcile effective access. Mobile purchase/restore code must not directly grant database subscriptions or diamonds.
- Reminder targets are service-only. VocaPass token registration/resolution require bounded authenticated RPCs.
- Guard asynchronous cache publication by account/session; retain failed offline mutations for recovery.

## Durable service recovery rules (2026-10-23)

- Keep `SupabaseService` public callers compatible; its three internal Dart modules own vocabulary, library and sync-queue state. Scope shared futures to the account/session and check ownership before publication.
- Transcription refund confirmation follows an idempotent committed credit; never infer success from a D1 flag. Preserve legacy ambiguity and job/financial ledgers.
- Persist authenticated RevenueCat callbacks before acknowledgement and reconcile canonical subscriber grants; update only RevenueCat grants and preserve web grants.
- Reminder claims are private account/device/UTC-day rows with leases; keep batches at most 50 and concurrency at most five. Scheduler credentials belong in Vault/server secrets.

Security follow-up (2026-10-23): anonymous-credit amounts are validated before mutation; refund recovery checks the persisted charge owner, amount and terminal state before confirmation. Shared Supabase XP-spending hardening is prepared at `../voca_flutter/supabase/migrations/20261023170000_secure_xp_spending.sql`; apply once to the shared project. See `../voca_flutter/doc/security-follow-up-2026-10-23.md` for tests and limits. Cloudflare functions were bundled locally; deployment remains with Gemini and the earlier private release snapshot is stale.

## Backend reliability invariants (2026-10-24)

- Authenticate and persist Gladia notifications before acknowledgement. Callback recovery and tracked polling share one per-job lease and authoritative ingestion path; keep pending work before expiring jobs.
- General rate limits remain approximate; all rate-limit helpers receive the real context, and KV writes are awaited or registered. Financial authority stays transactional.
- Serialize exact inputs before hashing token/translation cache keys. Keep translation provider order, concurrency, deadlines and quotas in their existing shared owners.
- Dictionary provider failures are not empty success. Preserve actual definition language/provenance, short fallback/negative TTLs, normalized text/POS, and absent word levels.
- Authenticated freezes use one persisted operation ID and `spend_xp_once`; do not restore independent deduction and replenishment requests. The shared PostgreSQL migration lives in `../voca_flutter/supabase/migrations/20261024090000_idempotent_xp_purchases.sql`.

## Shared account and content links (2026-10-24)

- Keep canonical learner/video/playlist URLs aligned with `../voca_flutter` and preserve legacy video-link compatibility.
- Public learner responses must use the whitelisted public-only RPC; never expose profiles table rows or private stamp metadata anonymously.
- Account billing/session reads derive ownership from `auth.uid()` and remain bounded. Never infer a billing provider or lifetime access from an effective tier or missing date.
- Browser and Android PKCE recovery use distinct callback paths. Preserve auth callback ownership and keep account/public/legal pages accessible without first-visit onboarding.
- Android association certificates must come from verified signing artifacts or Play App Signing, never placeholders. iOS linking remains deferred.
- Canonical migration and activation notes: `../voca_flutter/doc/account-experience-implementation-2026-10-24.md`.

## Shared screen and public-route rules

- New screens must reuse the existing `page-layout`, cards, panel headers/toolbars,
  controls and contextual sidebar patterns. Compare rendered Dictionary, Study,
  Playlists, History and Settings before introducing feature-specific layout CSS.
- Set explicit `data.layout` (`app`/`public`) and `data.onboarding` metadata on
  renderable routes. Resolve policy after redirects through `RouteExperienceService`;
  unresolved destinations stay public. Only learning routes enable first-time FTUE.
- Public/legal/learner/recovery/Not Found routes omit learning navigation, sheets,
  global toast feedback and automatic update/install prompts. Required updates are
  inline. Entering these routes must not complete onboarding or award starter XP.
- Settings has no replay-onboarding action. Preserve completion and reward guards.
- Format account dates, counts and payment amounts with the selected UI locale;
  localize provider/plan/status presentation without changing billing authority.
  Keep English legal wording marked with `lang="en"` and a localized language notice.

- Reuse actual shared components before copying control markup: `PanelComponent`
  (also used by History), `OptionPickerComponent`, `SwitchComponent`,
  `BottomSheetComponent`, `EmptyStateComponent` and `ProUpgradeDialogComponent`.
  Settings/public locale controls share `I18nService` option data. Shared switches keep
  checked state controlled by their owner; emit user intent once and retain the
  confirmed value after failed asynchronous persistence.

- Keep shared control appearance in its existing owners (`src/styles/_buttons.scss`,
  `_forms.scss`, `_components.scss`). Do not override button height/padding/line
  height/focus rings or sliding-tab/thumb geometry in feature styles. Use the
  existing variants, compact localized labels and mobile header-action slot.
  Verify computed rendered styles against the shared controls, not only class names.

## Recommendation invariants (2026-10-25)

Keep the 200 eligible-candidate window independent of offset/page size/seed. Apply difficulty before adding candidates; bound metadata scanning to 20 batches of 200 and R2 probes to ten. Incomplete discovery due to outage/budget breach is 503, not an empty catalog. Every ranking-affecting learner signal bypasses shared caches. Keep background metadata healing from changing discovery timestamps. No schema migration is required.

## Transcript optimization invariants (2026-10-25)

- Apply `db/migrations/d1/20261025_gladia_submission_state.sql` before activating the updated Functions. Preserve submitting/uncertain/accepted jobs beyond ordinary age expiry; lack of provider-list evidence cannot authorize refunds or replacement POSTs.
- New paid AI submissions use one fresh server duration for both tier validation and pricing. Cache reads and active-job joins avoid this lookup; force refresh joins active work before credit checks.
- Gladia creation is a single POST with durable correlation metadata. Callback, poll and metadata recovery share the ingestion lease and persisted provider due times.
- Publish clean transcripts and confirm completion before optional token enrichment. Enrichment has a bounded caller wait and ETag-conditional publication; underlying tokenizer cancellation remains its own concern.
- HTTP translation saves require canonical source cues and preserve the complete cue list. Unknown native-language metadata must not suppress native discovery; incomplete recommendation verification remains retryable.

## Workers edge-case testing invariants (2026-10-25)

- Keep every API module in `tests/fixtures/cloudflare-edge-cases.mjs`; the inventory assertion must fail when a new route is missing. Run the optional all-route workerd suite after provider/auth or middleware changes.
- Runtime fetch compatibility checks must use native workerd fetch with controlled outbound service responses. A mocked global fetch does not validate RequestInit compatibility.
- Credential-bearing calls use `redirect: 'manual'` and reject non-2xx responses; never follow a redirect with provider or service-role credentials.
- For body-bearing POST/PUT/PATCH requests, middleware accepts only bounded UTF-8 JSON objects and forwards original bytes for webhook signatures. Preserve no-body maintenance requests.

## Diamond paid-job authority (2026-10-26)

New paid transcription jobs require fresh, finite, positive YouTube duration before reservation or charge. Never use request duration, stored caption/metadata duration, or a default length for pricing or tier authorization. Cached AI transcripts and existing jobs remain reusable without a new charge. Only a strict committed charge acknowledgement authorizes submission; atomically claim a queued, confirmed, non-refunding job before the provider POST. Preserve job-keyed recovery on ambiguous responses. See [diamond enforcement handoff](doc/diamond-enforcement-2026-10-26.md).

AI pricing follow-up: `/api/transcript` supports the `quoteOnly` preview mode and an optional confirmed `expectedDiamondCost` for new paid jobs. Never trust that field as a price override; reject a changed price before reservation/charge. Cached/active reuse quotes zero. Deploy backend support before mobile quote consumers; see the diamond enforcement handoff for the contract and tests.

## Verified AI video metadata (2026-10-26)

Official YouTube Data API metadata is the sole new-job duration/live-state authority. Apply `20261026_verified_video_metadata.sql` and set the encrypted `YOUTUBE_DATA_API_KEY` before deploying callers. Quotes may use recent server-verified metadata; new paid jobs always freshly verify and record their billing evidence. Never authorize spending from scraped/client/D1 display/subtitle-estimated duration or absent live fields. Preserve confirmed-price, atomic spending and recovery guards. Scope mobile Authorization headers to the configured backend origin. See `doc/verified-video-metadata-2026-10-26.md`.

## Official video details (2026-10-26)

Apply `20261026_video_metadata_details.sql` after the verified-duration migration. Display names/channel/tags/category ID use the shared official resolver and D1 persistence. Preserve caption discovery, learning levels, discovery timestamps and manual/legacy category choices; never let generic hints overwrite official catalog fields. A provider outage is retryable, not a missing video. Keep raw YouTube category ID separate from Voca's mapped category.

## Dictionary result authority (2026-10-28)

Naver source/target direction comes from each result's provider language metadata, not the request endpoint or script guessing. Preserve per-entry definitionLanguage/definitionKind; translate homogeneous source-language groups under the shared bounded deadline and retain truthful fallback metadata on partial failures. Missing/malformed provider metadata is unavailable, not a negative-cache miss. Internal dictionary cache v6 does not invalidate cached public URLs: coordinate a CDN purge or expiry before verifying deployed semantic fixes. See doc/backend-api.md for validation and rollback.


## Video level authority and calibration (2026-10-29)

Community `/api/video-level` submissions always use server-assigned `linguistics` provenance and confidence at most 0.85; grammar telemetry cannot establish trust or enable `forceUpdate`. Preserve verified records at confidence >= 0.90 and reserve overrides for trusted ingestion/admin callers. Resolve tiers from canonical level labels. Japanese score boundaries are 1.85/2.75/3.70/4.60; HSK, TOPIK and CEFR boundaries are 1.85/2.85/3.85/4.85/5.85. Keep the mobile mapping aligned. Missing scores derive from explicit levels, including level 6.


## Transcript quote and fallback parity (2026-10-30)

AI quotes are free only for a nonempty requested-language AI cache or an active AI job, matching submission reuse. Native negative caches and known-language exclusions skip provider requests but still allow alternative-language R2 discovery before an empty response. Requested native tracks retain priority; explicit AI requests never reuse native or alternative-language captions. No UI changes accompany this correction.

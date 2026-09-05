# LinguaTube — AI Agent Instructions & Architectural Guide

> **Note**: This file mirrors [`../AGENTS.md`](../AGENTS.md) located at the root of the repository for easy access within the `doc/` folder.

---

## 1. Executive Summary & Purpose

**LinguaTube** is a high-performance Progressive Web Application (PWA) designed for language learners (specifically **Japanese**, **Chinese**, **Korean**, and **English**) using authentic YouTube videos. It combines interactive synchronized subtitles, morphological tokenization, multi-source dictionary lookups, grammar pattern detection, an SM-2 spaced repetition (SRS) vocabulary notebook, and Gladia AI-powered audio transcription.

### Key Metrics & Technologies
- **Frontend**: Angular 19 (Standalone Components, Signals, `ChangeDetectionStrategy.OnPush`, RxJS 7.8, TypeScript 5.6)
- **Backend (Production)**: Cloudflare Pages Functions (Serverless ESM Workers, bundled with esbuild)
- **Backend (Local Dev)**: Node.js / Express 5 server (`server/server.js`) proxied via `proxy.conf.json`
- **Database & Storage**:
  - **Cloudflare D1** (SQLite at the edge) for video metadata and transcript registries
  - **Cloudflare R2** (S3-compatible bucket) for permanent transcript storage (`transcripts/{videoId}/{lang}.json`)
  - **Cloudflare KV** for transient caching and distributed rate limiting
  - **PocketBase** (`https://voca.pockethost.io`) for user authentication, cloud sync (vocabulary, streaks, playlists)
  - **IndexedDB & LocalStorage** for client-side offline-first persistence

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
- Client-side repositories (`OfflineVocabularyRepository`, `OfflineStreakRepository`, `OfflinePlaylistRepository`, `OfflineHistoryRepository`) MUST continue functioning when offline.
- When generating remote IDs for synced entities (like vocabulary items), use deterministic keys (e.g. `base64(userId + '|' + word + '|' + lang).slice(0, 15)`) to prevent duplicate records upon concurrent sync.
- Use the timestamp-based merge strategy (`mergeByTimestamp` from `src/app/shared/utils/sync.utils.ts`).

### ⚠️ RULE 5: SSRF Defense & API Security
- Any external URL passed into backend functions (e.g., `resultUrl` in `/api/transcript`, proxied paths in `/proxy/[service]`) MUST be strictly validated.
- Reject non-HTTPS protocols, local/private IP ranges (`127.0.0.1`, `10.0.0.0/8`, `192.168.0.0/16`, `172.16.0.0/12`, `localhost`), and untrusted hostnames.
- Whitelist upstream hosts (`api.gladia.io`, `yewtu.be`, `jisho.org`, `jotoba.de`, `pipedapi.kavin.rocks`).

### ⚠️ RULE 6: Turnstile CAPTCHA & Diamond Credits Protection
- AI transcription via Gladia costs real API credits.
- All AI transcription requests require:
  1. Valid Cloudflare Turnstile token (`turnstileToken`) verified via `verifyTurnstileToken`.
  2. Sufficient Diamond credits (1 credit for videos $\le 10$ mins, 2 credits for videos $> 10$ mins, max 20 mins allowed).

---

## 3. High-Level Architecture Map

```
┌────────────────────────────────────────────────────────────────────────┐
│                    LINGUATUBE APPLICATION STACK                        │
└────────────────────────────────────────────────────────────────────────┘

 [ CLIENT: Angular 19 PWA ]
    │
    ├── Video Feature: VideoPlayerComponent (YouTube IFrame API)
    │                  SubtitleDisplayComponent (Furigana, Pinyin, Romaji)
    │                  VideoHeader / VideoBottomBar / CenterControls
    │
    ├── Linguistics:   Kuromoji (JA) / Intl.Segmenter (ZH/KO/EN)
    │                  GrammarService (JA/KO/ZH/EN rule engine)
    │                  DictionaryService (Jotoba, Mazii, Naver, MDBG, FreeDict)
    │
    ├── Study Tools:   StudyPageComponent (SM-2 Spaced Repetition Flashcards)
    │                  VocabularyListComponent / VocabularyQuickView
    │                  StreakService (Daily practice tracking & freeze items)
    │                  PlaylistService & HistoryService
    │
    └── State / Repos: Offline-First Repositories (LocalStorage + IndexedDB)
                       PocketBase Client (Auth, Sync, Users, Playlists)
          │
          │ HTTP / REST API (via /api/* and /proxy/*)
          ▼
 [ BACKEND: Cloudflare Pages Functions / Local Express Server ]
    │
    ├── API Middleware: Bot Defense (Scraper User-Agents & CF Threat Score)
    │                   Distributed Rate Limiter (In-Memory + KV)
    │                   PocketBase JWT Auth Verification
    │                   Video Duration & Language Validator
    │
    ├── Endpoints:
    │     POST /api/transcript      -> Transcript Orchestrator (R2 -> Supadata -> Gladia)
    │     GET  /api/dict            -> Unified Multi-Source Dictionary Engine
    │     POST /api/dual-subtitles  -> Batch Translation & Multi-Sub Caching
    │     POST /api/tokenize/:lang  -> Server-side Kuromoji / Intl Segmentation
    │     GET  /api/video-info      -> Two-Tier Cached YouTube Metadata
    │     GET  /api/diamonds        -> Diamond Token Quota & Regen Status
    │     ALL  /proxy/:service/*    -> Safe Whitelisted SSRF-Protected Proxy
    │
    └── Cloud Infrastructure:
          ├── Cloudflare D1         -> SQLite Tables: transcripts, video_meta, video_languages
          ├── Cloudflare R2         -> transcripts/{videoId}/{lang}.json
          ├── Cloudflare KV         -> Rate limits, short-lived tokens, video-info
          ├── PocketBase            -> Cloud user records, vocabulary, streaks
          └── External APIs         -> Gladia (ASR), Supadata, Lingva, Naver, Jotoba
```

---

## 4. Repository Directory Structure

```
lingua-tube/
├── AGENTS.md                  # Root AI agent guidance & architecture
├── README.md                  # Public overview and quickstart
├── package.json               # Dependencies, scripts, engine constraints (Node >=20.11 <23)
├── angular.json               # Angular CLI configuration, build targets, PWA assets
├── wrangler.toml              # Cloudflare Pages bindings (D1, R2, KV, vars)
├── proxy.conf.json            # Angular CLI dev proxy mappings to localhost:3001
├── eslint.config.js           # Modern ESLint flat config with typescript-eslint
├── karma.conf.js              # Unit testing harness with Chrome headless
├── streaks.pb.js              # PocketBase server hook script for streak automation
│
├── doc/                       # Comprehensive documentation suite
│   ├── README.md              # Documentation index & portal
│   ├── agents.md              # Mirror of AGENTS.md
│   ├── map.md                 # System Architecture & Component Map
│   ├── tech.md                # Technology stack & dependencies
│   ├── backend-api.md         # API routes, middlewares, services & providers
│   ├── frontend-architecture.md # Angular 19, Signals, components & design system
│   ├── features.md            # Features deep dive (Subtitles, AI, Dict, SRS, etc.)
│   ├── database-and-storage.md# D1, R2, KV, PocketBase, IndexedDB schemas
│   └── development-guide.md   # Developer setup, commands, testing & debugging
│
├── db/                        # Cloudflare D1 SQL Schema & Migrations
│   ├── schema.sql             # Base schema (transcripts, vocabulary)
│   ├── add-video-meta.sql     # video_meta table
│   ├── add-pending-columns.sql# Gladia pending job status columns
│   └── add-video-languages.sql# video_languages & no_transcript_cache tables
│
├── scripts/                   # Build automation
│   └── build-functions.js     # esbuild pipeline: functions-src/ -> functions/
│
├── functions-src/             # CLOUDFLARE FUNCTIONS SOURCE (Edit here!)
│   ├── api/                   # Public HTTP route handlers
│   ├── proxy/                 # Safe proxy routes ([service]/[[path]].js)
│   ├── middlewares/           # auth.js, bot-defense.js, rate-limiter.js, video-validator.js
│   ├── providers/             # gladia.js, supadata.js, lingva.js, dictionary-apis.js
│   ├── services/              # transcript.service.js, dict.service.js, diamond.service.js, turnstile.service.js
│   ├── data/                  # transcript-db.js, transcript-r2.js, video-info-db.js
│   └── utils/                 # tokenizer.js, japanese-romaji.js, cache-manager.js, api-key-rotator.js, utils.js
│
├── functions/                 # COMPILED FUNCTIONS (DO NOT EDIT DIRECTLY)
│
├── server/                    # Local Express Dev Server
│   └── server.js              # Dev mock for Gladia, MDBG, Naver, Dict, Tokenize
│
└── src/                       # ANGULAR FRONTEND SOURCE
```

---

## 5. Common Development Workflows for Agents

### Workflow 1: Adding or Modifying a Backend API Endpoint
1. Edit or add files in `functions-src/api/` or `functions-src/services/`.
2. Ensure you import security middleware (`checkBot`, `consumeRateLimit`, `validateAuthToken`).
3. If creating a new route file, make sure it is in `functions-src/api/` or `functions-src/proxy/` (these are picked up as entry points by esbuild).
4. Run the bundle script:
   ```bash
   npm run build:functions
   ```
5. If running locally with the express server, update `server/server.js` or `proxy.conf.json` if needed.
6. Run unit tests:
   ```bash
   npm run test:backend
   ```

### Workflow 2: Updating or Adding a Dictionary Provider
1. Dictionary scraping/API logic resides in `functions-src/providers/dictionary-apis.js` and `functions-src/utils/dict-parsers.js`.
2. For local dev server support, mirror changes in `server/server.js` under `fetchDictLocal()`.
3. Rebuild functions:
   ```bash
   npm run build:functions
   ```

### Workflow 3: Modifying Angular UI Components or Signals
1. Use Angular 19 Standalone Component conventions (`standalone: true`).
2. Mark components with `changeDetection: ChangeDetectionStrategy.OnPush`.
3. Use `inject(Service)` instead of constructor injection.
4. If reading reactive state, use `signal()`, `computed()`, or `toSignal()`.
5. Run linting to verify:
   ```bash
   npm run lint
   ```

### Workflow 4: Adding New Grammar Patterns
1. Grammar data is split by language in `src/app/data/`:
   - `grammar-ja.ts` (~1.37MB)
   - `grammar-ko.ts` (~1.42MB)
   - `grammar-zh.ts` (~390KB)
   - `grammar-en.ts` (~136KB)
2. Grammar translations live in `src/app/data/translations/{source_lang}/{target_lang}.ts`.
3. `GrammarService` dynamically imports these files on demand to keep the initial client bundle lightweight.
4. Ensure patterns adhere to the `GrammarPattern` interface in `src/app/models/grammar.model.ts`.

---

## 6. Verification & Quality Assurance Checklist

Before declaring any task complete, verify:
- [ ] `npm run build:functions` exits with code 0 (all routes bundled without syntax/dependency errors).
- [ ] `npm run lint` passes without any ESLint warnings or errors.
- [ ] `npm run test:backend` executes and all assertions pass.
- [ ] No changes were made directly to `functions/` (only `functions-src/`).
- [ ] Any new strings added to the UI have corresponding translations in all 5 supported languages: `en.json`, `vi.json`, `ja.json`, `ko.json`, and `zh.json`.
- [ ] SSRF security guards and protocol validators remain intact.

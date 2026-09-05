# Backend API & Serverless Edge Reference

This document provides a complete technical specification of the backend APIs, serverless edge functions, security middleware, and provider integrations powering **LinguaTube**.

---

## 1. Dual Backend Runtime Model

LinguaTube uses a dual backend model to maximize both developer productivity and production edge performance:

```
                  ┌────────────────────────────────────────┐
                  │          RUNTIME ENVIRONMENTS          │
                  └───────────────────┬────────────────────┘
                                      │
           ┌──────────────────────────┴──────────────────────────┐
           ▼                                                     ▼
 [ PRODUCTION & STAGING ]                                [ LOCAL DEVELOPMENT ]
 Cloudflare Pages Functions                              Node.js Express 5 Server
 Location: functions-src/ (compiled to functions/)       Location: server/server.js
 Bundled by: esbuild (scripts/build-functions.js)        Port: http://localhost:3001
 Runtime: Cloudflare Workers V8 Sandbox                  Proxy: Angular CLI (proxy.conf.json)
 Storage: D1 SQLite, R2 Buckets, KV Namespace            Storage: In-Memory / Direct Upstream
```

---

## 2. Middleware & Security Pipeline

Every incoming request passes through a multi-tier defense and rate-limiting pipeline:

### 2.1. Global Bot Defense (`_middleware.js` + `bot-defense.js`)
- Executed on all `/api/*` requests before route handlers.
- **User-Agent Blacklist**: Blocks automated scrapers and headless clients (e.g. `curl`, `python-requests`, `aiohttp`, `scrapy`, `axios`, `postmanruntime`, `gptbot`, `claudebot`, `bytespider`).
- **Cloudflare Threat Score**: If `request.cf.threatScore > 40`, request is rejected with `403 BOT_DETECTED`.
- **Preflight Bypass**: Automatically lets `OPTIONS` requests pass through.

### 2.2. Distributed In-Memory + KV Rate Limiter (`rate-limiter.js`)
To protect against DDoS and API credit depletion while strictly observing Cloudflare KV's **1,000 writes/day free limit**:
- **In-Memory Fast Path**: Every warm isolate maintains a `memRateLimits` Map.
- **Throttled KV Sync**: KV writes only fire if:
  1. Rate limit is exceeded (to block across all global edge isolates).
  2. Request count approaches limit ($> 80\%$).
  3. Count has incremented by $\ge 5$ units since last sync.
  4. $\ge 60$ seconds have passed since last sync.
- **Tiered Quotas**:
  | Tier | Native Transcripts (/hr) | Dual Subs (/hr) | Dictionary (/hr) | Tokenize (/hr) |
  | :--- | :--- | :--- | :--- | :--- |
  | **Anonymous** | 20 | 5 | 100 | 100 |
  | **Free** | 30 | 10 | 100 | 100 |
  | **Pro / Premium** | 60 | 50 | 100 | 100 |

### 2.3. PocketBase JWT Authentication (`auth.js`)
- Validates `Authorization: Bearer <token>` header.
- Decodes JWT payload locally to verify signature and expiration (`exp`).
- Calls PocketHost API (`/api/collections/users/auth-refresh`) to verify validity and obtain user profile (`id`, `subscriptionTier`, `diamonds`).

### 2.4. Video Validator (`video-validator.js`)
- Rejects requests for videos exceeding maximum durations:
  - Native captions (`innertube`): Max 3 hours (10,800s).
  - AI transcription (`whisper`): Max 20 minutes (1,200s).
- Validates language whitelist: `['ja', 'ko', 'zh', 'en']`.
- Analyzes video title script using Unicode regex (e.g. rejects Cyrillic/Arabic titles when requesting Asian learning languages).

---

## 3. Comprehensive Endpoint Reference

### 3.1. Unified Transcript API
- **Route**: `POST /api/transcript`
- **Source**: `functions-src/api/transcript.js`
- **Payload**:
  ```json
  {
    "videoId": "dQw4w9WgXcQ",
    "lang": "ja",
    "preferAI": false,
    "forceRefresh": false,
    "resultUrl": null,
    "turnstileToken": "0.XXXXX",
    "duration": 240
  }
  ```
- **Lifecycle & Fallback Chain**:
  1. **R2 Cache Check**: Checks `transcripts/{videoId}/{lang}.json`. If present, returns immediately (`X-Cache: HIT`).
  2. **Native Captions Fetch (Supadata)**: If `preferAI: false`, queries Supadata native captions. If found, caches to R2 and records in D1 `video_meta`.
  3. **Negative Cache Check**: If previously marked as having no native captions in D1 `no_transcript_cache`, returns `NO_NATIVE` immediately.
  4. **AI Generation (Gladia)**: If `preferAI: true`:
     - Verifies Turnstile token (`verifyTurnstileToken`).
     - Verifies Diamond balance ($> 0$).
     - Submits YouTube audio URL to Gladia API.
     - Deducts Diamond credit.
     - Returns `{ status: 'processing', resultUrl }`.
  5. **AI Polling**: Subsequent requests passing `resultUrl` poll Gladia until `status: 'done'`, then write final transcript to R2.

---

### 3.2. Unified Dictionary API
- **Route**: `GET /api/dict?word={word}&from={learningLang}&to={uiLang}`
- **Source**: `functions-src/api/dict.js`
- **Supported `from` languages**: `ja`, `zh`, `ko`, `en`
- **Supported `to` languages**: `ja`, `zh`, `ko`, `en`, `vi`
- **Response Format**:
  ```json
  {
    "word": "勉強",
    "from": "ja",
    "to": "en",
    "source": "jotoba",
    "entries": [
      {
        "word": "勉強",
        "reading": "べんきょう",
        "definitions": ["study", "diligence", "discount"],
        "partOfSpeech": "noun, suru verb",
        "level": 5
      }
    ],
    "timestamp": 1725513600000
  }
  ```
- **Provider Routing Matrix**:
  - `ja -> en`: Jotoba (primary) $\rightarrow$ Jisho (fallback)
  - `ja -> vi`: Mazii API (Vietnamese-Japanese dictionary)
  - `zh -> en`: MDBG HTML scraper
  - `zh -> vi`: Glosbe Chinese-Vietnamese dictionary
  - `ko -> en`: Naver EnKo API
  - `ko -> vi`: Naver KoVi API $\rightarrow$ National Institute of Korean Language (KRDict)
  - `en -> en`: Datamuse API $\rightarrow$ Free Dictionary API
  - **Cross-Language Fallback**: If no direct bilingual dictionary exists (e.g. `ko -> de`), fetches English definitions and translates them to target UI language using Google Translate GTX.

---

### 3.3. Dual Subtitles API
- **Route**: `POST /api/dual-subtitles`
- **Source**: `functions-src/api/dual-subtitles.js`
- **Payload**:
  ```json
  {
    "videoId": "abc123xyz",
    "sourceLang": "ja",
    "targetLang": "en",
    "segments": [
      { "id": 0, "start": 1.2, "duration": 3.0, "text": "こんにちは" }
    ],
    "forceRefresh": false
  }
  ```
- **Process**:
  - Checks R2 cache: `translations/{videoId}/{sourceLang}_{targetLang}.json`.
  - Batch translates subtitle text chunks in groups of 5 using Lingva/GTX.
  - Requires an 80% translation success rate (`QUALITY_THRESHOLD`) before saving to R2 and D1 `translations_meta`.

---

### 3.4. Tokenization Endpoints
- **Routes**:
  - `POST /api/tokenize/:lang` (Single text block)
  - `POST /api/tokenize-batch/:lang` (Array of texts with `videoId`)
- **Source**: `functions-src/api/tokenize/[lang].js`, `tokenize-batch/[lang].js`
- **Caching**: 30-day TTL in Cloudflare KV keyed by text hash: `tokens:{lang}:{djb2Hash}`.

---

### 3.5. Video Info Discovery API
- **Route**: `GET /api/video-info?videoId={videoId}`
- **Source**: `functions-src/api/video-info.js`
- **Two-Tier Cache Strategy**:
  1. KV cache check (`video-info:{videoId}`, 24-hour TTL).
  2. D1 check (`video_languages` table).
  3. YouTube oEmbed query (`https://www.youtube.com/oembed?url=...`).
  4. Saves title and channel to D1 to conserve KV writes.

---

### 3.6. Diamond Credits API
- **Route**: `GET /api/diamonds`
- **Source**: `functions-src/api/diamonds.js`
- **Response**:
  ```json
  {
    "success": true,
    "diamonds": 3,
    "maxDiamonds": 3,
    "nextRegenAt": null,
    "regenIntervalMs": 1200000
  }
  ```
- **Regeneration Logic**: Users regenerate 1 Diamond every 20 minutes (`1,200,000ms`) up to a maximum cap of 3.

---

### 3.7. Safe Reverse Proxy
- **Route**: `ALL /proxy/[service]/[[path]]`
- **Source**: `functions-src/proxy/[service]/[[path]].js`
- **SSRF Protections**:
  - Whitelisted services only: `invidious1` (`yewtu.be`), `jisho` (`jisho.org`), `jotoba` (`jotoba.de`), `piped1` (`pipedapi.kavin.rocks`).
  - Path sanitization filtering out `..` and hidden files (`.`).
  - Strict host check blocking private/loopback IP ranges (`127.0.0.0/8`, `10.0.0.0/8`, `192.168.0.0/16`, `172.16.0.0/12`, `localhost`).

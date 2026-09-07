# Backend API & Serverless Edge Reference

This document provides a complete technical specification of the backend APIs, serverless edge functions, security middleware, and provider integrations powering **Voca** (formerly LinguaTube).

---

## 1. Dual Backend Runtime Model

Voca uses a dual backend model to maximize both developer productivity and production edge performance:

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
 Storage: D1 SQLite, R2 Buckets, KV Namespace            Storage: Local disk (server/transcripts_cache/)
 Subtitles: Supadata Native + Gladia AI                  Subtitles: Innertube (youtubei.js) + Gladia
```

### Local Dev Server Highlights (`server/server.js`)
- **Innertube Client**: Uses `youtubei.js` to fetch real YouTube timed-text tracks directly in local development without needing Cloudflare bindings.
- **Local Disk Cache with Traversal Defense**: Automatically persists discovered YouTube transcripts to `server/transcripts_cache/{videoId}_{lang}.json` sanitized against path traversal attacks.
- **Dev Mocks & Proxies**: Provides local handlers for `/api/dict`, `/api/dual-subtitles`, `/api/tokenize/:lang` (unified `ja`, `zh`, `ko`, `en`), `/api/tokenize-batch/:lang`, `/api/translate/:source/:target/*` (with wildcard slug support), `/api/translate/batch` (GTX fallback), `/api/auth-config`, `/api/diamonds`, and `/proxy/:service/*` (matching the production SSRF-protected proxy).

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
  | Tier | Native Transcripts (/hr) | Dual Subs (/hr) | Dictionary (/hr) | Tokenize (/hr) | Translate Texts (/hr) |
  | :--- | :--- | :--- | :--- | :--- | :--- |
  | **Anonymous** | 20 | 5 | 100 | 100 | 2,000 |
  | **Free** | 30 | 10 | 100 | 100 | 5,000 |
  | **Pro** | 60 | 50 | 100 | 100 | 25,000 |
  | **Premium** | 120 | 100 | 100 | 100 | 100,000 |

### 2.3. PocketBase JWT Authentication (`auth.js`)
- Validates `Authorization: Bearer <token>` header.
- Decodes JWT payload locally to verify signature and expiration (`exp`).
- **Warm-Isolate Token Cache**: Maintains an in-memory `memTokenCache` with a 5-minute TTL per edge worker isolate to eliminate redundant upstream PocketBase auth-refresh HTTP calls.
- Calls PocketHost API (`/api/collections/users/auth-refresh`) on cache miss to verify validity and obtain user profile (`id`, `subscriptionTier`, `diamonds`).

### 2.4. Video Validator & Path Sanitization (`video-validator.js` & `utils.js`)
- **Strict Video ID Validation**: Rejects any `videoId` that fails `/^[a-zA-Z0-9_-]{11}$/`.
- **Path Traversal Defense**: `sanitizeVideoId` strips invalid characters and rejects strings with directory traversal patterns (`..`, `/`, `\`).
- Rejects requests for videos exceeding maximum durations:
  - Native captions (`innertube` / `supadata`): Max 3 hours (10,800s).
  - AI transcription (`gladia`): Max 20 minutes (1,200s).
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
  2. **Native Captions Fetch (Supadata)**: If `preferAI: false`, queries Supadata native captions. If found, caches to R2 and records in D1 `video_meta` and `video_languages`.
  3. **Negative Cache Check**: If previously marked as having no native captions in D1 `no_transcript_cache`, returns `NO_NATIVE` immediately.
  4. **AI Generation (Gladia)**: If `preferAI: true`:
     - Verifies Turnstile token (`verifyTurnstileToken`): Developer bypass token (`cf-turnstile-dev-token`) is strictly restricted to `ENVIRONMENT === 'development'`. Production requests require valid Cloudflare Turnstile token validation.
     - Verifies Diamond balance ($> 0$).
     - Multi-key API rotation (`api-key-rotator.js`): Uses in-memory round-robin isolate rotation across configured Gladia keys to distribute load without burning Cloudflare KV write limits.
     - Submits YouTube audio URL to Gladia API.
     - Deducts Diamond credit.
     - Returns `{ status: 'processing', resultUrl }`.
  5. **AI Polling & Failure Auto-Refund**:
     - Subsequent requests passing `resultUrl` poll Gladia until `status: 'done'`, then write final transcript to R2.
     - **Automated Diamond Refund**: If Gladia reports job error or submission fails, the backend triggers `refundDiamond()` via PocketHost API to restore the user's credit balance automatically.

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
        "level": 5,
        "audio": "https://jotoba.de/audio/..."
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
  - Batch translates subtitle text chunks in groups of 25 segments using Lingva/GTX to eliminate 25s Cloudflare Function timeout aborts.
  - Requires an 80% translation success rate (`QUALITY_THRESHOLD`) before saving to R2 and D1 `translation_meta`.

---

### 3.4. Single Text Translation API
- **Route**: `GET /api/translate/[[path]]`
- **Source**: `functions-src/api/translate/[[path]].js`
- **Format**: `/api/translate/{source}/{target}/{text}`
- **Process**:
  - Verifies tiered rate limits based on unique translated characters/texts.
  - Translates text via Lingva instance rotation with Google Translate GTX fallback.

---

### 3.5. Batch Translation API
- **Route**: `POST /api/translate/batch`
- **Source**: `functions-src/api/translate/batch.js`
- **Payload**:
  ```json
  {
    "texts": ["Hello", "World", "Good morning"],
    "source": "en",
    "target": "vi"
  }
  ```
- **Max Batch Size**: 50 texts per request.
- **Process**:
  - Deduplicates texts before rate-limit unit deduction.
  - Generates a SHA-256 batch signature hash: `batchKey = trbatch:v1:{source}:{target}:{hash}`.
  - Checks Cloudflare KV for cached full-batch response.
  - Translates missing items in bulk via Lingva.
  - Saves full batch in a single KV write (7-day TTL) to preserve KV write quota.

---

### 3.6. Tokenization Endpoints
- **Routes**:
  - `POST /api/tokenize/:lang` (Single text block)
  - `POST /api/tokenize-batch/:lang` (Array of texts for bulk subtitle tokenization)
- **Source**: `functions-src/api/tokenize/[lang].js`, `functions-src/api/tokenize-batch/[lang].js`
- **Caching**: 30-day TTL in Cloudflare KV keyed by text hash: `tokens:{lang}:{djb2Hash}`.

---

### 3.7. Video Info Discovery API
- **Route**: `GET /api/video-info?videoId={videoId}`
- **Source**: `functions-src/api/video-info.js`
- **Two-Tier Cache Strategy**:
  1. KV cache check (`video-info:{videoId}`, 24-hour TTL).
  2. D1 check (`video_languages` table).
  3. YouTube oEmbed query (`https://www.youtube.com/oembed?url=...`).
  4. Saves title and channel to D1 to conserve KV writes.

---

### 3.8. Diamond Credits API
- **Route**: `GET /api/diamonds`
- **Source**: `functions-src/api/diamonds.js`
- **Response**:
  ```json
  {
    "success": true,
    "diamonds": 5,
    "maxDiamonds": 5,
    "nextRegenAt": 1725732000000,
    "regenIntervalMs": 900000,
    "tier": "free",
    "maxVideoDurationSec": 900
  }
  ```
- **Multi-Tier Quotas & Regeneration**:
  | Tier | Max Diamonds | Regen Interval | Max AI Video Duration |
  | :--- | :--- | :--- | :--- |
  | **Anonymous** | 3 | 20 minutes | 10 minutes |
  | **Free** (Signed in) | 5 | 15 minutes | 15 minutes |
  | **Pro / Premium** | 20 | 5 minutes | 30 minutes |
- **Quotas & Performance Optimization**:
  - **Memory-first caching**: Warm edge isolates cache anonymous user diamond status in `memDiamondsCache` with 60s TTL, throttling KV writes to preserve the 1,000 writes/day free limit.
  - **Admin Token Memoization**: PocketBase admin authentication is memoized in memory for 45 minutes, reducing admin auth requests by 99%.

---

### 3.9. Auth Configuration API
- **Route**: `GET /api/auth-config`
- **Source**: `functions-src/api/auth-config.js`
- **Response**:
  ```json
  {
    "clientId": "your-google-oauth-client-id.apps.googleusercontent.com",
    "enabled": true
  }
  ```
- **Caching**: `Cache-Control: public, max-age=86400, s-maxage=604800`.

---

### 3.10. Safe Reverse Proxy
- **Route**: `ALL /proxy/[service]/[[path]]`
- **Source**: `functions-src/proxy/[service]/[[path]].js`
- **SSRF & Abuse Protections**:
  - **Bot Defense**: Integrated with `checkBot` middleware on proxy requests.
  - **Whitelisted Services Only**: `invidious1` (`yewtu.be`), `jisho` (`jisho.org`), `jotoba` (`jotoba.de`), `piped1` (`pipedapi.kavin.rocks`).
  - **Path Sanitization**: Filters out directory traversal sequences (`..`), slashes, and hidden dot files (`.`).
  - **Network Perimeter Guards**: Blocks private and loopback IP ranges (`127.0.0.0/8`, `10.0.0.0/8`, `192.168.0.0/16`, `172.16.0.0/12`, `localhost`).
  - **Redirect Policy**: Enforces `redirect: 'error'` preventing redirect-based open proxy smuggling.
  - **Timeout & Payload Limits**: Strict 8-second request timeout (`AbortSignal.timeout(8000)`) and maximum 64KB upstream body cap to prevent memory exhaustion.

---

### 3.11. Payment & Webhook APIs (payOS VietQR)
- **Routes**:
  - `POST /api/payment/create-order`
  - `POST /api/payment/webhook`
  - `GET /api/payment/check-status`
- **Source**: `functions-src/api/payment/*.js`, `functions-src/providers/payos.js`
- **Process**:
  1. `create-order`: Generates a unique numeric orderCode and builds a payOS VietQR link (`amount=49,000đ` for Pro 1 Month). Caches pending order metadata in Cloudflare KV.
  2. `webhook`: Receives instant transaction confirmation from payOS. Validates `HMAC-SHA256` signature using `PAYOS_CHECKSUM_KEY`. Enforces idempotency via `order_processed:{orderCode}` in KV. Automatically upgrades the user's PocketBase record to `subscription_tier = 'pro'`, `subscription_expires = now + 30 days`, and sets `diamonds = 20`.
  3. `check-status`: Lightweight polling endpoint for the frontend VietQR modal to detect payment completion in real time.

---

### 3.12. Video Level Classification API
- **Routes**:
  - `POST /api/video-level`: Store and update computed difficulty level for a video (`videoId`, `language`, `level`).
  - `GET /api/video-info`: Now includes `levels: Record<string, string>` map (e.g. `{"ja": "JLPT N4", "en": "CEFR B1"}`) with fast-path metadata regex detection.
- **Source**: `functions-src/api/video-level.js`, `functions-src/data/video-info-db.js`
- **Security & Rate Limiting**: Max 60 requests/hour per IP, strict input sanitization (`VALID_LEVEL_REGEX` supporting JLPT N1-N5, HSK 1-6, TOPIK 1-6, CEFR A1-C2).
- **Storage Strategy**:
  - Persisted to Cloudflare D1 `video_languages.levels` column as a JSON map.
  - Cached in Cloudflare KV `video-info:{videoId}` (24-hour TTL) alongside title and duration.

---

### 3.13. Global Leaderboard API
- **Routes**:
  - `GET /api/leaderboard`: Fetch top 50 learners (optionally filtered by target language `lang=ja|ko|zh|en`) and calculate exact rank for requesting `userId`.
  - `POST /api/leaderboard`: Synchronize learner score (XP, level, streak, badges count, target language).
- **Source**: `functions-src/api/leaderboard.js`
- **Security & Rate Limiting**:
  - Rate-limited submission: Max 15 score updates per 10 minutes per client.
  - Strict input sanitization: Name HTML tags stripped, XP clamped (0–1,000,000), level clamped (1–100), streak clamped (0–10,000).
  - Monotonic XP progression: Upsert enforces `xp = MAX(leaderboard.xp, excluded.xp)` to prevent downgrades or race condition rollbacks.
- **Storage & Caching**:
  - Persisted in Cloudflare D1 `leaderboard` table (`user_id`, `name`, `avatar`, `xp`, `level`, `streak`, `badges_count`, `target_lang`, `country`, `updated_at`).
  - Edge caching: `Cache-Control: public, max-age=30, s-maxage=60`.
  - Seed fallback: If D1 is empty or unavailable, returns pre-seeded realistic community benchmarks so learners are never met with an empty screen.


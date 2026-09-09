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
- **Dev Mocks & Proxies**: Provides local handlers for `/api/dict`, `/api/dual-subtitles`, `/api/tokenize/:lang` (unified `ja`, `zh`, `ko`, `en`), `/api/tokenize-batch/:lang`, `/api/translate/:source/:target/*` (with wildcard slug support), `/api/translate/batch` (GTX fallback), `/api/recommended-videos`, `/api/diamonds`, and `/proxy/:service/*` (matching the production SSRF-protected proxy).

---

## 2. Middleware & Security Pipeline

Every incoming request passes through a multi-tier defense and rate-limiting pipeline:

### 2.1. Global Bot Defense (`_middleware.js` + `bot-defense.js`)
- Executed on all `/api/*` requests before route handlers.
- **User-Agent Blacklist**: Blocks automated scrapers and headless clients (e.g. `curl`, `python-requests`, `aiohttp`, `scrapy`, `axios`, `postmanruntime`, `gptbot`, `claudebot`, `bytespider`).
- **Cloudflare Threat Score**: If `request.cf.threatScore > 40`, request is rejected with `403 BOT_DETECTED`.
- **Preflight Bypass**: Automatically lets `OPTIONS` requests pass through.

### 2.2. Distributed In-Memory + KV Rate Limiter (`rate-limiter.js`)
To protect against DDoS and API credit depletion while strictly preserving Cloudflare KV's **1,000 writes/day free limit**:
- **In-Memory Fast Path**: Every warm Worker isolate maintains a local `memRateLimits` Map.
- **Smart KV Sync**: To keep daily KV writes safely under quota while preventing abuse:
  1. **Instant Global Block with Flood Throttling**: If rate limit is first breached (`!allowed`), it immediately writes to KV to enforce the block across global edge locations. Subsequent blocked requests within the window are throttled in memory (syncing to KV at most once every 60s per client), preventing high-frequency 429 floods from exhausting KV write quotas.
  2. **Approaching Quota Protection**: When usage reaches $\ge 80\%$ of the allowed limit, it syncs to KV to tightly coordinate across edge isolates.
  3. **Mid-Quota Sampling**: When usage is $\ge 50\%$ of quota and has incremented by $\ge 25$ units (`KV_SYNC_SAMPLE_RATE = 25`), it syncs once.
  4. **Normal Usage Isolation**: Normal users operating comfortably below $50\%$ quota generate **zero KV writes** for rate limiting.
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
- **Duration Enforcement & Livestream Blocking**: Rejects requests for videos exceeding maximum durations:
  - Native captions (`innertube` / `supadata`): Max 3 hours (10,800s).
  - Whisper AI transcription: Server-verified duration via YouTube metadata strictly overrides client parameters to prevent duration tampering (Free: $\le 600$s, Pro: $\le 1,200$s, Premium: $\le 2,700$s). Live broadcasts (`isLive: true`) are rejected immediately.
  - AI transcription (`gladia`): Max 10 mins (600s) for Guest/Free, 20 mins (1,200s) for Pro, 45 mins (2,700s) for Premium.
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
  1. **R2 Multi-Language Cache Check**: Checks `transcripts/{videoId}/{lang}.json`. If absent, checks other known languages in R2 for that video as fallback. If found in R2, returns immediately (`X-Cache: HIT`), eliminating redundant Gladia submissions and saving user diamonds.
  2. **Native Captions Fetch (Supadata)**: If `preferAI: false`, queries Supadata native captions. Regional language tags (e.g. `ja-JP`, `zh-Hans`, `en-US`) are normalized to standard ISO base codes (`ja`, `zh`, `en`). If native captions exist in an alternate authentic language, the captions are saved to R2 under `actualLang` and returned with `languageMismatch: true`, allowing the client to display the authentic subtitles rather than a false-negative "cannot get transcript" error.
  3. **Negative Cache Check**: Negative caching (`markNoTranscript`) in D1 `no_transcript_cache` is ONLY recorded when a video has zero available caption tracks across all languages.
  4. **AI Generation (Gladia V2 Pre-Recorded) - Non-Blocking Client-Driven Polling**:
     - Verifies Turnstile token (`verifyTurnstileToken`).
     - Verifies Diamond balance ($> 0$) and calculates duration-based cost (1 to 4 diamonds).
     - **Pre-check R2**: Ensures no transcript already exists in R2 before consuming diamonds.
     - **Pre-check Pending Jobs**: If an active job for the video is already running in Gladia, reuses `result_url` without re-submitting or double-charging.
     - Submits YouTube audio URL to Gladia `https://api.gladia.io/v2/pre-recorded` endpoint.
     - **In-Memory Job Routing**: Stores job mapping in warm Worker isolate memory and D1 `pending_jobs` without burning Cloudflare KV write quotas (Rule 2).
     - Returns `{ status: 'processing', resultUrl }` immediately ($\sim 1.5$s response) to avoid long-lived edge connection drops (524 gateway timeouts).
  5. **Fast Client-Driven Polling & Failure Auto-Refund**:
     - Subsequent client poll requests pass `resultUrl` every 2.5 seconds.
     - Server polls Gladia status with a 15-second safety timeout, completing each poll check in $\sim 200\text{--}300$ms.
     - When `status: 'done'`, server resolves metadata/avatar via D1/oEmbed, indexes under both detected and study languages in D1, writes to R2, and deletes the pending job.
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
- **Dual In-Memory + Edge Caching**:
  - **In-Memory LRU Cache (`memPosDictCache`)**: Warm Worker isolates maintain up to 1,000 positive dictionary lookup entries with a 1-hour TTL. Frequently recurring words (particles, high-frequency verbs) return in $<0.1$ms with zero KV reads or writes (`X-Cache: HIT-MEMORY`).
  - **In-Memory Negative Cache (`memNegDictCache`)**: Missing words are cached in an isolate `Set` to prevent repeated upstream scraping calls.
  - **Cloudflare Edge CDN**: `Cache-Control: public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400`.
  - **Cloudflare KV**: `CacheManager` provides 7-day persistence for long-tail lookups.

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
    "onlyCache": false,
    "forceRefresh": false,
    "saveOnly": false
  }
  ```
- **Cache-First Fast Lookup (`onlyCache: true` or `?onlyCache=true`)**:
  - Checks Cloudflare R2 (`translations/{videoId}/{sourceLang}-{targetLang}.json`) or local disk cache (`server/transcripts_cache/`).
  - Does not require a `segments` payload on cache checks, eliminating unnecessary payload overhead.
  - If cached transcript exists: Returns `{ segments: [...], cached: true }`.
  - If not cached: Returns `{ segments: [], cached: false }` immediately without triggering batch translation, allowing the client to initiate immediate playback and lazy-load upcoming cues in background chunks.
- **Client Cache Write-Back (`saveOnly: true` or `onlySave: true`)**:
  - **Incremental Crowd-Cache Merging & Self-Healing**: When the client translates cues during playback, it saves checkpoints (after $\ge 10$ newly translated cues or on video pause/switch), as well as a final save upon reaching $\ge 80\%$ coverage (`QUALITY_THRESHOLD`).
  - The backend filters out invalid/identical source text, merges incoming translated cues with existing segments in R2 using fuzzy matching (text exact match $\rightarrow$ timestamp proximity within $\pm 0.8$s $\rightarrow$ index), recalculates composite quality, and commits the merged file to Cloudflare R2 and D1 `translation_meta`.
  - Multiple users watching partial segments of the same video collectively build and heal the full dual-subtitle cache without requiring any single user to watch 80%+ in one session.
  - **Zero KV Writes**: Transcripts and translations are stored strictly in R2 and D1, guaranteeing 0 KV quota consumption.
- **Process (Live / Fallback Requests)**:
  - Checks R2 cache: `translations/{videoId}/{sourceLang}-{targetLang}.json`. Automatically detects and invalidates legacy poisoned cache entries where translation mirrored source text.
  - **Worker Timeout Protection**: Live translation requests in `/api/dual-subtitles` are capped at 40 segments (`BATCH_SIZE`) to prevent Cloudflare Worker 30-second execution timeouts. Larger transcripts stream upcoming cues via `/api/translate/batch` and commit via `saveOnly: true`.
  - Batch translates subtitle text chunks using tagged XML boundary protection (`<t id="N">...</t>`) via direct Google Translate GTX with Lingva fallback.
- **Rate Limiting**: Tiered hourly quota (anonymous: 5, free: 15, pro: 60, premium: 120 requests/hr).

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
- **Max Batch Size**: 80 texts per request (optimized for Workers Paid).
- **Rate Limiting**: Tiered hourly quota based on subscription (anonymous: 3,000, free: 8,000, pro: 35,000, premium: 100,000 texts/hr).
- **Process & KV Quota Preservation (Rule 2)**:
  - Deduplicates texts before rate-limit unit deduction.
  - Checks warm worker isolate in-memory LRU phrase cache (`memPhraseCache`) for common subtitle phrases (e.g. greetings, common responses) to eliminate redundant network calls.
  - Checks warm isolate batch cache (`memBatchCache`) and existing KV entries before requesting external translation.
  - Translates missing items in bulk using XML-tagged index batching (`<t id="N">...</t>`) via Lingva/GTX with targeted individual recovery for any missing tags (avoiding 35x sequential fallback loops). Returns `null` on failed items instead of echoing back untranslated source text.
  - **Zero KV Writes on Intermediate Slices**: Caches translated batches in isolate memory (`memBatchCache`). Full dual subtitles are permanently stored in Cloudflare R2 via `/api/dual-subtitles` write-back once $\ge 80\%$ translated, completely eliminating redundant KV write consumption on chunks.

---

### 3.6. Tokenization Endpoints
- **Routes**:
  - `POST /api/tokenize/:lang` (Single text block)
  - `POST /api/tokenize-batch/:lang` (Array of up to 800 texts for bulk subtitle tokenization under 10ms CPU)
- **Source**: `functions-src/api/tokenize/[lang].js`, `functions-src/api/tokenize-batch/[lang].js`
- **Dual-Layer Cache Architecture**:
  - In-memory warm isolate cache (`memTokenBatchCache`, up to 100 videos) resolves repeated requests in $<0.1$ms (`X-Cache: HIT-MEM`).
  - Cloudflare KV (`tokens:v5:{lang}:{videoId}:{textsHash}`) provides edge persistence across isolates.
  - Cache hits consume **0 rate limit quota** and return with `X-Cache: HIT`.
- **Caching**: 30-day TTL in Cloudflare KV.
- **Rate Limiting (Cache Miss Only)**:
  - Anonymous: 60 req/hr
  - Free (Signed-in): 150 req/hr
  - Pro: 1,500 req/hr
  - Premium: 2,000 req/hr
- **Frontend Integration**: `SubtitleService` tokenizes all cues up front on video load (1 request per video for up to 800 cues), passes the PocketBase bearer token, and activates an automatic client-side circuit breaker upon receiving HTTP 429. Zero network requests occur during video playback.

---

### 3.7. Video Info Discovery API
- **Route**: `GET /api/video-info?videoId={videoId}`
- **Source**: `functions-src/api/video-info.js`
- **Response**: `{ videoId, title, duration, availableLanguages, subLanguages, hasAutoCaptions, channel, channelAvatar, levels }`
- **D1 + In-Memory Zero-KV Architecture**:
  1. Warm in-memory isolate cache check (`memVideoInfoCache`, 500 entries, 1-hour TTL) $\rightarrow$ returns in $<0.1$ms (`X-Cache: HIT-MEMORY`).
  2. Cloudflare D1 query (`video_languages` table) $\rightarrow$ persistent SQLite at the edge (100,000 writes/day, 5,000,000 reads/day free tier). Exposes verified server transcript languages via `subLanguages: string[]`.
  3. YouTube oEmbed fallback $\rightarrow$ saves metadata and channel avatar (`fetchChannelAvatar`) to D1 and memory with edge CDN cache headers (`s-maxage=604800, stale-while-revalidate=86400`).
  4. **Zero KV Writes**: Completely avoids writing to Cloudflare KV, saving $\sim 100\text{--}150$ daily KV writes.

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
  | **Anonymous** | 3 | 20 minutes | 10 minutes (600s) |
  | **Free** (Signed in) | 5 | 15 minutes | 10 minutes (600s) |
  | **Pro** | 10 | 10 minutes | 20 minutes (1,200s) |
  | **Premium** | 25 | 4 minutes | 45 minutes (2,700s) |
- **Dynamic Cost Scaling**:
  - $\le 10$ minutes: **1 Diamond credit**
  - $10$–$20$ minutes: **2 Diamond credits**
  - $20$–$35$ minutes: **3 Diamond credits**
  - $35$–$45$ minutes: **4 Diamond credits**
- **Quotas & Performance Optimization**:
  - **Memory-first caching**: Warm edge isolates cache anonymous user diamond status in `memDiamondsCache` with 60s TTL, throttling KV writes to preserve the 1,000 writes/day free limit.
  - **Admin Token Memoization**: PocketBase admin authentication is memoized in memory for 45 minutes, reducing admin auth requests by 99%.

---

### 3.9. Recommended Videos API (Verified Database Transcripts)
- **Route**: `GET /api/recommended-videos?lang={lang}&tier={tier}&limit={limit}&offset={offset}`
- **Source**: `functions-src/api/recommended-videos.js`
- **Query Parameters**:
  - `lang`: Target learning language (`ja`, `ko`, `zh`, `en`, defaults to `ja`).
  - `tier`: Optional proficiency tier (`beginner`, `elementary`, `intermediate`, `upper_intermediate`, `advanced`).
  - `limit`: Maximum items to return (1-50, default `12`).
  - `offset`: Optional pagination offset (default `0`) for infinite scrolling feeds.
  - `refresh`: Optional boolean (`true`). When enabled, bypasses memory and CDN caches, forces `Cache-Control: no-cache, no-store, must-revalidate`, and applies Fisher-Yates uniform candidate shuffling for fresh video discovery.
- **Database & Cloudflare Storage Discovery**:
  - Queries Cloudflare D1 `video_languages` table for verified transcripts stored on our server (`sub_languages LIKE '%"lang"%'`), with fallback to `available_languages` only if `sub_languages` is unpopulated.
  - Multi-Language Support: Videos can store multiple verified transcript languages in `sub_languages` (e.g. `["ja", "en"]`), returned in `languages` for accurate multi-lingual badges (`JA / EN`).
  - Strict Server Verification: Verifies that transcript files (`transcripts/{videoId}/{lang}.json`) actually exist on our server (Cloudflare R2 storage / dev cache) before recommending, eliminating phantom recommendations and un-transcribed language badges.
  - Supports `offset` pagination directly against D1 candidates (`LIMIT ? OFFSET ?`), enabling seamless infinite scroll without duplicate entries.
  - When `tier` is requested or `refresh=true` is passed, queries a larger candidate pool from D1, performs uniform Fisher-Yates candidate shuffling, and filters rows matching the target tier (`labelToTier`).
  - **Recent Candidate Pinning**: When shuffling candidates on refresh, the top 3 most recently updated / newly transcribed videos remain pinned at the front of the list, ensuring that newly generated user transcripts are never buried or lost upon clicking refresh.
  - Duration filters safely accommodate videos with unrecorded/zero durations as well as typical learning durations (`(duration_seconds IS NULL OR duration_seconds = 0 OR duration_seconds BETWEEN 20 AND 7200)`).
  - Ordered by `updated_at DESC`.
  - Automatic metadata & avatar enrichment: Any discovered video missing a title or avatar is enriched via YouTube oEmbed and `fetchChannelAvatar` and cached in D1 `video_languages.channel_avatar`.
- **Caching & Authenticity**:
  - Warm Worker isolate in-memory caching (`memCache`, 15-minute TTL, keyed by `${lang}_${tier || 'all'}_${limit}_${offset}`).
  - HTTP Edge CDN caching header: `Cache-Control: public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400` on normal hits; `no-cache, no-store, must-revalidate` when `refresh=true`.
  - Zero Cloudflare KV write cost, strictly preserving free-tier limits.
  - Authentic Content: Serves strictly verified transcribed videos directly from Cloudflare storage (`source: "cloudflare"` or `"cloudflare:refresh"`) with no artificial mock data.
- **Response**:
  ```json
  {
    "success": true,
    "language": "ja",
    "count": 12,
    "offset": 0,
    "hasMore": true,
    "videos": [
      {
        "videoId": "BZRT37f8zZY",
        "title": "Japanese Listening Practice for Beginners - JLPT N4 Story",
        "channel": "Japanese Immersion",
        "duration": 420,
        "thumbnail": "https://i.ytimg.com/vi/BZRT37f8zZY/mqdefault.jpg",
        "languages": ["ja", "en"],
        "level": "JLPT N4",
        "tier": "elementary",
        "updatedAt": 1725732000
      }
    ],
    "source": "cloudflare"
  }
  ```

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
- **Process & Security**:
  1. `create-order`: Accepts `plan` (`pro_1m` for 49,000 VND, `pro_1y` for 450,000 VND, `premium_1m` for 119,000 VND, `premium_1y` for 990,000 VND). Generates a cryptographically secure random 8-digit `orderCode` (`crypto.getRandomValues`), builds an official payment link via payOS, converts raw EMVCo strings into rendered QR images via `api.qrserver.com` or `img.vietqr.io`, and returns structured bank fields (`accountNumber`, `accountName`, `bin`, `description`, `checkoutUrl`, `qrCode`). Caches pending order metadata in Cloudflare KV.
  2. `webhook`: Receives instant transaction confirmation from payOS. Validates `HMAC-SHA256` signature using `PAYOS_CHECKSUM_KEY` via constant-time XOR comparison to protect against timing attacks. Enforces fail-closed verification in production, verifies `receivedAmount >= expectedAmount`, and enforces idempotency via `order_processed:{orderCode}` in KV. Automatically upgrades the user's PocketBase record to `subscription_tier` (`'pro'` or `'premium'`), sets `subscription_expires` (+30 days or +365 days), and allocates initial diamonds (10 for Pro, 25 for Premium; supporting PocketBase v0.23+ `_superusers` authentication).
  3. `check-status`: Rate-limited polling endpoint for the frontend `ProUpgradeDialogComponent` to detect payment completion in real time. Also supports local development simulation via `POST /api/payment/simulate-transfer`.

---

### 3.12. Video Level Classification API
- **Routes**:
  - `POST /api/video-level`: Store and update computed difficulty level for a video (`videoId`, `language`, `level`, `confidence`, `method`).
  - `GET /api/video-info`: Includes `levels: Record<string, string>` map (e.g. `{"ja": "JLPT N4", "en": "CEFR B1"}`) with fast-path metadata regex detection across native learning keywords (`初級`, `中級`, `上級`, `초급`, `중급`, `고급`, `初级`, `高级`, `Beginner`, `Intermediate`, `Advanced`).
- **Source**: `functions-src/api/video-level.js`, `functions-src/data/video-info-db.js`
- **Security & Integrity Protection**:
  - Rate limiting: Max 60 requests/hour per IP, strict input sanitization (`VALID_LEVEL_REGEX`).
  - Confidence threshold: Client submissions must have `confidence >= 0.65` to be persisted.
  - Non-destructive updates: Submissions cannot overwrite an existing verified level if the existing level has higher confidence.
- **Storage Strategy**:
  - Persisted strictly to Cloudflare D1 `video_languages.levels` column as a JSON map (Zero KV writes - Rule 2).
  - Normalizes return objects so clients always receive clean language-to-level string mappings (`{ ja: "JLPT N4" }`).

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

---

### 3.14. App Version & Changelog API
- **Routes**: `GET /api/version`
- **Source**: `functions-src/api/version.js` (Cloudflare Pages Function) & `server/server.js` (Local Dev)
- **Response Format**:
  ```json
  {
    "version": "1.0.2",
    "minSupportedVersion": "1.0.0",
    "buildDate": "2026-09-08",
    "forceUpdate": false,
    "maintenance": false,
    "maintenanceMessage": "",
    "highlights": {
      "en": [
        "Lightweight Service Worker updates (under 150KB)",
        "In-app update checker and version viewer in Settings",
        "Corrupted cache auto-recovery and infinite reload protection",
        "Persistent update indicator badges on navigation items"
      ],
      "vi": [
        "Cập nhật Service Worker siêu nhẹ (dưới 150KB)",
        "Nút kiểm tra cập nhật và xem phiên bản trong Cài đặt",
        "Tự động khôi phục khi bộ nhớ đệm lỗi và chống lặp tải lại",
        "Huy hiệu chấm báo cập nhật trên thanh điều hướng"
      ],
      "ja": [ ... ],
      "ko": [ ... ],
      "zh": [ ... ]
    }
  }
  ```
- **Caching & Transport Optimizations**:
  - **Pre-Serialized In-Memory Fast Path**: The version payload is stored in warm isolate memory, eliminating runtime `JSON.stringify()` overhead and delivering responses in **< 1ms**.
  - **Dynamic Cloudflare KV Override (`app_version_override`)**: Warm isolates check `env.TRANSCRIPT_CACHE` every 60 seconds. If an admin places a JSON override in KV (e.g. `{"maintenance": true}`, `{"forceUpdate": true, "minSupportedVersion": "1.1.0"}`), the edge picks it up within 60 seconds without requiring a code commit or Pages rebuild.
  - **ETag & HTTP 304 Not Modified**: Pre-computes dynamic `ETag`. When clients revalidate with `If-None-Match`, the edge immediately returns `304 Not Modified` with a **0-byte payload**, minimizing mobile bandwidth consumption.
  - **Cache Header**: `Cache-Control: no-cache, must-revalidate` paired with client `cache: 'no-cache'`, ensuring the browser performs conditional requests without serving stale data.
- **Client Usage**:
  - Evaluated by `AppUpdateService` on application launch and background refresh triggers.
  - Compares client version against `minSupportedVersion` (via SemVer string comparison): if client version is older, `forceUpdateRequired` is flagged, making the update sheet non-dismissible and preventing outdated clients from invoking incompatible edge APIs.
  - Supplies localized "What's New" bullet points rendered directly in the update prompt and Settings release notes sheet.
- **Operator Commands (Emergency Toggles without Redeploying)**:
  - Enable maintenance mode:
    ```bash
    npx wrangler kv:key put --binding=TRANSCRIPT_CACHE app_version_override '{"maintenance": true, "maintenanceMessage": "Scheduled maintenance. Back soon!"}'
    ```
  - Enforce breaking update:
    ```bash
    npx wrangler kv:key put --binding=TRANSCRIPT_CACHE app_version_override '{"forceUpdate": true, "minSupportedVersion": "1.1.0"}'
    ```
  - Clear override (revert to code default):
    ```bash
    npx wrangler kv:key delete --binding=TRANSCRIPT_CACHE app_version_override
    ```



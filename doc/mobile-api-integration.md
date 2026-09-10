# Voca Mobile API Integration & Flutter Development Guide (with Cursor AI)

**Target Audience:** Mobile Engineers (Flutter/Dart, Swift/iOS, Kotlin/Android, React Native) & AI Coding Agents (Cursor, Claude Code, Antigravity)  
**Backend Architecture:** Cloudflare Pages Functions (Edge Serverless Workers) + Cloudflare D1 (SQLite) + Cloudflare R2 (S3 Storage) + Cloudflare KV + PocketBase BaaS (`https://voca.pockethost.io`)  
**Specification Version:** `v5.0.0` (Production Hardened & Grammar Engine Complete)  

---

## 1. System Topology & Architecture Overview

Voca operates as a distributed, high-performance edge application. Mobile applications communicate with two distinct backend backplanes:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           VOCA FLUTTER APP                              │
│         (YouTube IFrame / Video Player, Subtitles, Dict, Grammar)       │
└──────────────────┬───────────────────────────────────┬──────────────────┘
                   │                                   │
                   │ HTTP REST (Dio Client)            │ PocketBase SDK / REST
                   ▼                                   ▼
   ┌───────────────────────────────┐   ┌───────────────────────────────┐
   │    Cloudflare Edge API        │   │        PocketBase BaaS        │
   │    https://voca.study    │   │    https://voca.pockethost.io │
   │                               │   │                               │
   │  • Subtitles (Native & Gladia)│   │  • User Authentication (JWT)  │
   │  • Dual Subtitles (R2 Cache)  │   │  • Vocabulary SRS Flashcards  │
   │  • Kuromoji/NLP Tokenization  │   │  • Daily Streaks & Freezes    │
   │  • Multi-Source Dictionaries  │   │  • Custom Video Playlists     │
   │  • Video Discovery & Levels   │   │  • Watch History & Favorites  │
   │  • Diamond Credits & PayOS    │   │  • Gamification (XP & Badges) │
   └───────────────────────────────┘   └───────────────────────────────┘
```

### Environment Base URLs

| Environment | Edge API Base URL | PocketBase BaaS URL | Purpose |
| :--- | :--- | :--- | :--- |
| **Production** | `https://voca.study` | `https://voca.pockethost.io` | Live Cloudflare Pages edge network & cloud DB |
| **Local Dev** | `http://<DEV_IP>:3001` | `https://voca.pockethost.io` | Local Express dev server with live Innertube caption scraper |

---

## 2. 🤖 Cursor AI & LLM Code Generation Instructions (`.cursorrules`)

When integrating Voca into a Flutter codebase using **Cursor AI** (or pasting into Cursor composer), copy and save the block below as `.cursorrules` or `.cursor/rules/voca-flutter.mdc` in the root of your Flutter project:

```markdown
# Voca Flutter Mobile Architecture Rules for Cursor AI

You are pair programming on the Voca Flutter Mobile App. Follow these non-negotiable rules:

1. DUAL BACKEND ARCHITECTURE:
   - All public edge operations (transcripts, tokenization, dictionaries, video metadata, diamonds, payments, version) MUST route to the Cloudflare Edge API: `https://voca.study`.
   - All user data persistence (auth, vocabulary cards, playlists, streaks, history, gamification) MUST route to PocketBase: `https://voca.pockethost.io`.

2. MANDATORY USER-AGENT HEADER (ANTI-BOT BYPASS):
   - The Cloudflare Edge rejects scrapers (curl, python, axios, dart default).
   - All HTTP requests MUST include a descriptive User-Agent:
     `User-Agent: VocaMobile/1.0.0 (Android 14; Mobile)` or `User-Agent: VocaMobile/1.0.0 (iOS 17.5; Mobile)`.

3. TOKENIZATION & FIELDS (CRITICAL):
   - POST /api/tokenize-batch/:lang REQUIRES BOTH `videoId` AND `texts`.
   - The Token object fields are:
     - `surface` (String): Raw text.
     - `reading` (String?): Furigana in hiragana (Japanese kanji only).
     - `romanization` (String?): Romaji for JA, Revised Romanization for KO.
     - `pinyin` (String?): Pinyin with tone marks for ZH.
     - `baseForm` (String?): Lemmatized dictionary form for JA verbs and EN words.
     - `partOfSpeech` (String?): POS tag (e.g. '名詞', '動詞', 'Verb', 'Noun').
     - `isPunctuation` (bool): True if punctuation or whitespace.
   - NEVER rename `romanization` to `romaji` or `partOfSpeech` to `pos`.

4. GRAMMAR DETECTION (CLIENT-SIDE):
   - Grammar patterns are detected client-side against the Token stream.
   - Support Japanese (JLPT N5-N1), Chinese (HSK 1-6), Korean (1-6), and English (CEFR A1-C2).
   - Tapping a grammar token highlights the pattern span and opens the Grammar BottomSheet with formation, explanations, and bilingual examples.

5. POCKETBASE FILTER SYNTAX:
   - String literals inside filters MUST use DOUBLE QUOTES (`"value"`), never single quotes.
   - Logical operators MUST be `&&` and `||` (never SQL `AND` / `OR`).
   - Example: `filter: 'user = "' + userId + '" && language = "ja"'`.

6. DETERMINISTIC OFFLINE RECORD IDS:
   - PocketBase IDs must match regex `^[a-z0-9]{15}$`.
   - Offline flashcards and gamification records MUST use Cyrb53 Base36 hashing:
     `generateDeterministicRecordId([userId, word.toLowerCase(), language])`.

7. ASYNC TWO-PHASE POLLING:
   - Gladia AI ASR: If POST /api/transcript returns `{ status: "processing", resultUrl: "..." }`, poll POST /api/transcript with `{ videoId, lang, resultUrl }` every 3 seconds until `success: true` or 60s timeout.
   - VietQR payOS: After calling POST /api/payment/create-order, poll GET /api/payment/check-status?orderCode={orderCode} every 3 seconds until `status === "PAID"`.
```

---

## 3. Master Endpoint Quick-Reference Table

| # | Method | Full Edge Endpoint URL | Auth? | Rate Limit | Purpose |
|:---:|:---:|:---|:---:|:---:|:---|
| 1 | `POST` | `https://voca.study/api/transcript` | Opt | 20–80/hr | Fetch native/cached transcripts or queue Gladia ASR |
| 2 | `GET` | `https://voca.study/api/transcript` | No | None | Serverless edge health & storage status check |
| 3 | `POST` | `https://voca.study/api/dual-subtitles` | Opt | 5–60/hr | Fetch or generate synchronized dual-language subtitles |
| 4 | `GET` | `https://voca.study/api/dict` | No | 100/hr | Multi-source dictionary lookup (`?word=&from=&to=`) |
| 5 | `POST` | `https://voca.study/api/tokenize/{lang}` | No | 100/hr | Single-phrase morphological segmentation (`ja,zh,ko,en`) |
| 6 | `POST` | `https://voca.study/api/tokenize-batch/{lang}` | Opt | 60–1500/hr | Batch tokenize up to 800 subtitle cues (`videoId` req.) |
| 7 | `GET` | `https://voca.study/api/translate/{src}/{tgt}/{text}` | No | 100/hr | Single phrase translation proxy |
| 8 | `POST` | `https://voca.study/api/translate/batch` | No | 100/hr | Batch translation for up to 50 items with KV cache |
| 9 | `GET` | `https://voca.study/api/video-info` | No | None | Video title, duration, languages, avatar & level map |
| 10 | `GET` | `https://voca.study/api/recommended-videos` | No | None | Pre-cached videos (`?lang=&tier=&limit=&offset=`) |
| 11 | `POST` | `https://voca.study/api/video-level` | No | 60/hr | Submit computed JLPT / HSK / TOPIK / CEFR difficulty |
| 12 | `GET` | `https://voca.study/api/diamonds` | Opt | 60/min | Check AI Diamond credits, max capacity, regen timer |
| 13 | `GET` | `https://voca.study/api/leaderboard` | No | None | Global learner rankings & live user rank |
| 14 | `POST` | `https://voca.study/api/leaderboard` | Opt | 30/hr | Synchronize user XP, streak, and badges |
| 15 | `POST` | `https://voca.study/api/payment/create-order` | **Req** | 10/10m | Generate VietQR payOS open banking checkout info |
| 16 | `GET` | `https://voca.study/api/payment/check-status` | No | 60/min | Poll payment confirmation status (`?orderCode=`) |
| 17 | `GET` | `https://voca.study/api/version` | No | None | App version, forceUpdate, maintenance & release notes |
| 18 | `ALL` | `https://voca.study/proxy/{service}/{path}` | No | 100/hr | SSRF-safe reverse proxy (`jisho`, `jotoba`, etc.) |

---

## 4. Complete Edge API Reference

### 4.1. Transcripts & Speech-to-Text

#### `POST /api/transcript`
Fetches pre-cached transcripts from Cloudflare R2 (`transcripts/{videoId}/{lang}.json`), scrapes native YouTube timed text, or queues Gladia AI audio speech-to-text.

- **URL:** `https://voca.study/api/transcript`
- **Request Body:**
  ```json
  {
    "videoId": "dQw4w9WgXcQ",           // Required: 11-char YouTube ID
    "lang": "ja",                       // Required: "ja" | "zh" | "ko" | "en"
    "preferAI": false,                  // Optional: true to trigger Gladia ASR
    "forceRefresh": false,              // Optional: bypass R2 cache
    "resultUrl": null,                  // Optional: polling URL returned from pending AI job
    "turnstileToken": "0x4AAA...",      // Required if starting a new AI job
    "duration": 212                     // Optional: video duration in seconds
  }
  ```

- **Success Response (Native / R2 Cached Hit - 200 OK):**
  ```json
  {
    "success": true,
    "videoId": "dQw4w9WgXcQ",
    "language": "ja",
    "source": "cache",                  // "cache" | "native" | "ai"
    "sourceDetail": "youtube",
    "segments": [
      {
        "start": 0.45,                  // Start offset in seconds
        "duration": 2.30,               // Duration in seconds
        "text": "こんにちは、世界！"
      }
    ],
    "availableLanguages": {
      "native": ["ja", "en"],
      "ai": []
    },
    "diamonds": 5,
    "maxDiamonds": 5,
    "nextRegenAt": 1725805000000,
    "whisperAvailable": true,
    "timing": 45
  }
  ```

- **Pending Response (Gladia AI Queued - 200 OK):**
  ```json
  {
    "success": false,
    "status": "processing",
    "resultUrl": "https://api.gladia.io/v2/pre-recorded/result/550e8400-e29b-41d4-a716-446655440000",
    "whisperAvailable": true,
    "diamonds": 4,
    "maxDiamonds": 5
  }
  ```
  *Mobile Polling Flow:* If `status === "processing"`, start a timer every 3 seconds calling `POST /api/transcript` with `{ "videoId": "...", "lang": "ja", "resultUrl": "..." }` until `success: true` or 60s timeout.

---

### 4.2. Dual Subtitles

#### `POST /api/dual-subtitles`
Generates or retrieves dual-language synchronized subtitles cached in Cloudflare R2 (`translations/{videoId}/{sourceLang}_{targetLang}.json`).

- **URL:** `https://voca.study/api/dual-subtitles`
- **Request Body:**
  ```json
  {
    "videoId": "dQw4w9WgXcQ",
    "sourceLang": "ja",
    "targetLang": "vi",                 // "en" | "vi" | "zh" | "ko" | "ja"
    "segments": [                       // Required unless onlyCache is true
      { "start": 0.45, "duration": 2.3, "text": "こんにちは" }
    ],
    "onlyCache": false,                 // If true, returns immediately from R2 cache (no translation executed)
    "saveOnly": false,                  // If true, uploads pre-computed subtitles to R2
    "forceRefresh": false
  }
  ```

- **Success Response (200 OK):**
  ```json
  {
    "videoId": "dQw4w9WgXcQ",
    "sourceLang": "ja",
    "targetLang": "vi",
    "cached": true,
    "quality": 100,
    "segments": [
      {
        "start": 0.45,
        "duration": 2.3,
        "text": "こんにちは",
        "translation": "Xin chào"
      }
    ]
  }
  ```

---

### 4.3. Multi-Source Dictionary Engine

#### `GET /api/dict`
Unified multi-source dictionary lookup with tiered in-memory LRU positive/negative caching and automated translation fallback.

- **URL:** `https://voca.study/api/dict`
- **Query Parameters:**
  - `word` (string, required): Word or surface token (e.g. `食べる`, `你好`, `한국어`, `break down`).
  - `from` (string, required): Learning language (`ja`, `zh`, `ko`, `en`).
  - `to` (string, required): Target explanation language (`en`, `vi`, `ja`, `zh`, `ko`).

- **Source Priority Mapping by Language Pair:**
  - **Japanese $\rightarrow$ English (`ja-en`)**: Jotoba API $\rightarrow$ Jisho API fallback.
  - **Japanese $\rightarrow$ Vietnamese (`ja-vi`)**: Mazii API $\rightarrow$ Glosbe API fallback.
  - **Japanese $\rightarrow$ Korean/Chinese (`ja-ko`, `ja-zh`)**: Naver Dictionary API.
  - **Chinese $\rightarrow$ English (`zh-en`)**: MDBG Dictionary scraper.
  - **Chinese $\rightarrow$ Vietnamese (`zh-vi`)**: Glosbe Dictionary API.
  - **Korean $\rightarrow$ Vietnamese (`ko-vi`)**: Naver Dictionary $\rightarrow$ National Institute of Korean Language (Krdict).
  - **Korean $\rightarrow$ English (`ko-en`)**: Naver EnKo Dictionary.
  - **English $\rightarrow$ English (`en-en`)**: FreeDictionary API.
  - **English $\rightarrow$ Vietnamese (`en-vi`)**: Glosbe API $\rightarrow$ Lingva fallback.

- **Success Response (200 OK):**
  ```json
  {
    "word": "食べる",
    "from": "ja",
    "to": "en",
    "source": "jotoba",
    "entries": [
      {
        "word": "食べる",
        "reading": "たべる",
        "romaji": "taberu",
        "partOfSpeech": "Ichidan verb, Transitive verb",
        "definitions": [
          "to eat",
          "to live on (e.g. a salary); to make a living"
        ],
        "level": "JLPT N5",
        "audio": "https://assets.languagepod101.com/dictionary/japanese/audiomp3.php?kanji=食べる&kana=たべる",
        "examples": [
          {
            "sentence": "朝ご飯を食べる。",
            "reading": "あさごはんをたべる。",
            "translation": "I eat breakfast."
          }
        ]
      }
    ],
    "timestamp": 1725800000000
  }
  ```

---

### 4.4. Morphological Tokenization

#### `POST /api/tokenize/:lang`
Tokenizes a single text string into words, readings, romanizations, and grammatical properties.

- **URL:** `https://voca.study/api/tokenize/{lang}` (`ja`, `ko`, `zh`, `en`)
- **Request Body:** `{ "text": "日本語を勉強しています。" }`

#### `POST /api/tokenize-batch/:lang`
Batch tokenizes an entire video's subtitles (up to 800 lines) with a single atomic KV write.

- **URL:** `https://voca.study/api/tokenize-batch/{lang}`
- **Request Body:**
  ```json
  {
    "videoId": "dQw4w9WgXcQ",           // REQUIRED: YouTube video ID (max 20 chars)
    "texts": [                          // REQUIRED: Array of strings (up to 800 items)
      "こんにちは",
      "今日はいい天気ですね"
    ]
  }
  ```

- **The Standard Token Object (All Languages):**
  ```json
  {
    "surface": "日本語",                 // Raw surface word
    "reading": "にほんご",               // Hiragana furigana (Japanese kanji only)
    "romanization": "nihongo",          // Romaji for JA, Revised Romanization for KO
    "pinyin": null,                     // Pinyin with tone marks (Chinese only)
    "baseForm": "日本語",                // Dictionary/lemma form (JA verbs & EN words)
    "partOfSpeech": "名詞",             // POS tag ('名詞', '動詞', 'Verb', 'Noun', etc.)
    "isPunctuation": false              // True if punctuation mark or whitespace
  }
  ```

- **Batch Success Response (200 OK):**
  ```json
  {
    "tokens": [
      [
        {
          "surface": "こんにちは",
          "reading": null,
          "romanization": "konnichiwa",
          "partOfSpeech": "感動詞",
          "isPunctuation": false
        }
      ],
      [
        {
          "surface": "今日",
          "reading": "きょう",
          "romanization": "kyou",
          "baseForm": "今日",
          "partOfSpeech": "名詞",
          "isPunctuation": false
        },
        {
          "surface": "は",
          "reading": null,
          "romanization": "wa",
          "partOfSpeech": "助詞",
          "isPunctuation": false
        }
      ]
    ]
  }
  ```

---

### 4.5. Video Discovery & Levels

#### `GET /api/video-info`
- **URL:** `https://voca.study/api/video-info?videoId=dQw4w9WgXcQ`
- **Success Response (200 OK):**
  ```json
  {
    "videoId": "dQw4w9WgXcQ",
    "title": "Japanese Conversation for Beginners",
    "channel": "Learn Japanese",
    "channelAvatar": "https://yt3.ggpht.com/...",
    "duration": 420,
    "availableLanguages": ["ja", "en"],
    "subLanguages": ["ja", "en"],
    "hasAutoCaptions": false,
    "levels": {
      "ja": "JLPT N4"
    },
    "source": "cache:d1"
  }
  ```

#### `GET /api/recommended-videos`
Returns verified videos with pre-cached transcripts from Cloudflare D1/R2 (<50ms loading latency, zero AI diamond cost).

- **URL:** `https://voca.study/api/recommended-videos`
- **Query Parameters:**
  - `lang` (optional, default `ja`): Target language (`ja`, `ko`, `zh`, `en`).
  - `tier` (optional): Proficiency tier filter (`beginner`, `elementary`, `intermediate`, `upper_intermediate`, `advanced`).
  - `limit` (optional, default `12`, max `50`).
  - `offset` (optional, default `0`).
  - `refresh` (optional, `true` to shuffle candidate results).
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "language": "ja",
    "tier": "elementary",
    "count": 12,
    "offset": 0,
    "hasMore": true,
    "videos": [
      {
        "videoId": "BZRT37f8zZY",
        "title": "Japanese Listening Practice - Daily Life",
        "channel": "Japanese Immersion",
        "channelAvatar": "https://yt3.ggpht.com/...",
        "duration": 420,
        "subLanguages": ["ja", "en"],
        "levels": { "ja": "JLPT N4" },
        "hasAutoCaptions": false
      }
    ]
  }
  ```

#### `POST /api/video-level`
- **URL:** `https://voca.study/api/video-level`
- **Request Body:**
  ```json
  {
    "videoId": "BZRT37f8zZY",
    "language": "ja",
    "level": "JLPT N4",                 // Regex validated: JLPT N1-N5, HSK 1-6, TOPIK 1-6, CEFR A1-C2
    "confidence": 0.85,                 // Minimum 0.65 required
    "method": "linguistics"             // "linguistics" | "manual"
  }
  ```

---

### 4.6. Diamonds, Leaderboard & Versioning

#### `GET /api/diamonds`
- **URL:** `https://voca.study/api/diamonds`
- **Headers:** `Authorization: Bearer <PB_TOKEN>` (optional)
- **Response:**
  ```json
  {
    "success": true,
    "diamonds": 5,                      // Current balance
    "maxDiamonds": 5,                   // Anon: 3, Free: 5, Pro: 10, Premium: 25
    "nextRegenAt": 1725805000000,       // Epoch timestamp in ms
    "regenIntervalMs": 900000,          // 15 minutes (free)
    "tier": "free",                     // "anonymous" | "free" | "pro" | "premium"
    "maxVideoDurationSec": 600          // Free/Anon: 600s, Pro: 1200s, Premium: 2700s
  }
  ```

#### `GET /api/version`
Used on mobile app launch to check for updates, breaking changes, or maintenance mode.
- **URL:** `https://voca.study/api/version`
- **Response:**
  ```json
  {
    "version": "1.1.1",
    "minSupportedVersion": "1.0.0",
    "buildDate": "2026-09-09",
    "forceUpdate": false,
    "maintenance": false,
    "highlights": {
      "en": ["NLP-Powered English Tokenization", "Zero False Positives", "CEFR Grammar Patterns"],
      "vi": ["Phân tích ngữ pháp tiếng Anh bằng NLP", "Loại bỏ hoàn toàn nhận diện nhầm"],
      "ja": ["NLPによる高精度な英語形態素解析"],
      "ko": ["NLP 기반 영어 형태소 분석 도입"],
      "zh": ["引入NLP驱动的英语形态分词"]
    }
  }
  ```

---

### 4.7. VietQR payOS Open Banking Payments

#### `POST /api/payment/create-order`
- **URL:** `https://voca.study/api/payment/create-order`
- **Headers:** `Authorization: Bearer <PB_TOKEN>` (Required)
- **Body:**
  ```json
  {
    "planId": "pro_1m",                 // "pro_1m" (49k), "pro_1y" (450k), "premium_1m" (119k), "premium_1y" (990k)
    "returnUrl": "voca://payment/success",
    "cancelUrl": "voca://payment/cancel"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "orderCode": 83920145,
    "plan": "pro_1m",
    "amount": 49000,
    "description": "VOCA83920145",
    "accountNumber": "0335889999",
    "accountName": "CONG TY VOCA",
    "bin": "970422",                    // MBBank BIN code
    "checkoutUrl": "https://pay.payos.vn/web/...",
    "qrCode": "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=..."
  }
  ```

#### `GET /api/payment/check-status`
- **URL:** `https://voca.study/api/payment/check-status?orderCode=83920145`
- **Response:** `{ "success": true, "status": "PENDING" }` or `{ "success": true, "status": "PAID" }`

---

## 5. Complete Grammar Detection Engine Specification

In Voca, grammar detection runs directly on the client over tokenized subtitle cues. This ensures sub-millisecond highlighting without extra server roundtrips.

### 5.1. Grammar Database Overview

| Language | Patterns Count | Level Standard | Database Location | Translation Pairs |
| :--- | :---: | :---: | :--- | :--- |
| **Japanese** | **800+** | JLPT N5, N4, N3, N2, N1 | `src/app/data/grammar-ja.ts` | `ja_vi`, `ja_zh`, `ja_ko`, `ja_ja` |
| **Chinese** | **650+** | HSK 1, 2, 3, 4, 5, 6 | `src/app/data/grammar-zh.ts` | `zh_vi`, `zh_ja`, `zh_ko`, `zh_zh` |
| **Korean** | **700+** | Korean Levels 1, 2, 3, 4, 5, 6 | `src/app/data/grammar-ko.ts` | `ko_vi`, `ko_zh`, `ko_ja`, `ko_ko` |
| **English** | **140+** | CEFR A1, A2, B1, B2, C1, C2 | `src/app/data/grammar-en.ts` | `en_vi`, `en_zh`, `en_ja`, `en_ko` |

### 5.2. Grammar Pattern Data Schema

```typescript
export interface GrammarPattern {
  id: string;                   // e.g. "ja_n4_001", "zh_hsk2_012", "en_b1_02"
  language: 'ja' | 'zh' | 'ko' | 'en';
  pattern: string;              // Base pattern (e.g. "ている", "虽然...但是", "have been -ing")
  title: string;                // Display title (e.g. "ている (Progressive action)")
  shortExplanation: string;     // One-sentence summary
  longExplanation: string;      // Detailed usage notes & nuances
  formation: string;            // Grammatical formula (e.g. "Verb て-form + いる")
  level: string;                // "JLPT N4", "HSK 2", "CEFR B1", etc.
  examples: GrammarExample[];
}

export interface GrammarExample {
  sentence: string;             // Authentic target-language sentence
  romanization?: string;        // Romaji, Pinyin, or Hangul Romanization
  translation: string;          // Translation in target UI language
}

export interface GrammarMatch {
  pattern: GrammarPattern;
  tokenIndices: number[];       // Array of token indices forming this pattern
  startIndex: number;           // First token index
  endIndex: number;             // Last token index
}
```

### 5.3. Pattern Detection Strategies by Language

```
                       ┌────────────────────────────────┐
                       │   Token Array from API         │
                       └───────────────┬────────────────┘
                                       │
        ┌──────────────┬───────────────┴───────────────┬──────────────┐
        ▼              ▼                               ▼              ▼
  [Japanese JA]  [Chinese ZH]                    [Korean KO]    [English EN]
  1. Multi-token 1. Multi-token sequence         1. Multi-token 1. Syntax Rules
     sequence    2. Split correlatives              sequence       (have been V-ing,
  2. Verb endings   (虽然...但是, 因为...所以,       2. Verb endings   should have V-ed)
     (ている, ない)   如果...就, 越...越)           (아야/어야 하다) 2. Correlatives
  3. Lemma / baseForm                            3. Suffix check   (neither...nor)
                                                    (는김에)
        │              │                               │              │
        └──────────────┴───────────────┬───────────────┴──────────────┘
                                       ▼
                       ┌────────────────────────────────┐
                       │ Deduplication & Overlap Filter │
                       └───────────────┬────────────────┘
                                       ▼
                       ┌────────────────────────────────┐
                       │ Matched Grammar Spans in UI    │
                       └────────────────────────────────┘
```

1. **Multi-Token Sequence Matching (Universal)**:
   - Evaluates token windows from length 1 to 5: `tokens.slice(i, i + len)`.
   - Normalizes text: strips punctuation (`。、？！`), whitespace, and pedagogical placeholders (`N`, `V`, `Adj`).
   - Checks against pre-built normalized pattern index.
2. **Japanese (JA) Ending & Lemma Strategy**:
   - Longest-match check against common auxiliary endings: `ている`, `ていた`, `てはいけない`, `なければならない`, `てもいい`, `てしまう`, `かもしれない`.
   - Fallback check against token `baseForm` (dictionary form).
3. **Korean (KO) Compound Auxiliaries & Suffixes**:
   - Matches auxiliary constructions: `(으)ㄹ 수 있다/없다`, `~고 있다`, `~고 싶다`, `~지 않다`, `~아/어야 하다`, `~아/어 보다`.
   - Sub-sequence suffix check (e.g. `읽는 김에` matches `는김에`).
4. **Chinese (ZH) Split Correlative Strategy**:
   - Detects discontinuous pattern pairs across a sentence:
     `虽然...但是`, `因为...所以`, `如果...就`, `不但...而且`, `越...越`, `一边...一边`, `除了...以外`, `是...的`, `既...又`.
5. **English (EN) Syntax & Modal Rules**:
   - Compound tenses: `(have|has) been #Gerund`, `had #PastTense`, `will have #PastTense`.
   - Modal perfects: `should have #PastTense`, `must have #PastTense`, `could have #PastTense`.
   - Phrasal modals: `used to #Verb`, `be used to #Gerund`, `have to #Verb`.
   - Correlatives: `neither...nor`, `either...or`, `not only...but also`.

---

## 6. Direct PocketBase BaaS Integration

For offline-first user data, mobile apps communicate with PocketBase at `https://voca.pockethost.io`.

### 6.1. Core Collections Schema

#### Collection: `vocabulary` (Flashcards & SRS)
| Field | Type | Invariant / Constraint |
| :--- | :--- | :--- |
| `id` | `TEXT (15)` | **Deterministic ID**: `^[a-z0-9]{15}$` via Cyrb53 Base36 |
| `user` | `RELATION` | PocketBase User ID |
| `word` | `TEXT` | Word surface form |
| `reading` | `TEXT` | Kana / Pinyin / Hangul reading |
| `meaning` | `TEXT` | Native/translated definition |
| `language` | `TEXT` | `'ja'` \| `'zh'` \| `'ko'` \| `'en'` |
| `level` | `TEXT` | `'new'` \| `'learning'` \| `'known'` \| `'mastered'` |
| `reviewCount` | `NUMBER` | Total reviews |
| `easeFactor` | `NUMBER` | SM-2 multiplier (default `2.5`, floor `1.3`) |
| `interval` | `NUMBER` | Days until next review |
| `repetitions` | `NUMBER` | Consecutive correct answers |
| `nextReview` | `DATE` | ISO 8601 timestamp |

#### Collection: `streaks` (Daily Practice & Shield)
| Field | Type | Description |
| :--- | :--- | :--- |
| `user` | `RELATION` | PocketBase User ID |
| `current_streak` | `NUMBER` | Consecutive active days |
| `longest_streak` | `NUMBER` | Highest streak recorded |
| `freezes_remaining` | `NUMBER` | Available streak shield items (max 2) |
| `last_activity` | `DATE` | Timestamp of last practice |
| `activity_log` | `JSON` | Array of active date strings (`["2026-09-08", "2026-09-09"]`) |

*Server Streak Hook Endpoints:*
- `GET https://voca.pockethost.io/api/streaks/me`: Returns streak stats.
- `POST https://voca.pockethost.io/api/streaks/record-activity`: Automatically calculates streak increments, freeze consumption, and badges.

#### Collection: `playlists` (Custom & Level Playlists)
- Fields: `user` (Relation), `title` (Text), `language` (Text), `level` (`beginner`, `elementary`, `intermediate`, `upper_intermediate`, `advanced`, `all`), `video_ids` (JSON array of strings), `thumbnail` (Text).

#### Collection: `history` (Watch Progress & Resume)
- Fields: `user` (Relation), `video_id` (Text), `last_position` (Number), `duration` (Number), `language` (Text), `title` (Text), `channel` (Text), `thumbnail` (Text), `is_favorite` (Bool).

### 6.2. Cyrb53 Base36 Deterministic ID Generation (Dart)

PocketBase requires 15-character alphanumeric record IDs (`^[a-z0-9]{15}$`). Use this Cyrb53 Base36 hash to prevent duplicate records when syncing offline flashcards:

```dart
String generateDeterministicRecordId(List<String> keys) {
  final raw = keys.map((k) => k.trim()).join('|');
  int h1 = 0xdeadbeef;
  int h2 = 0x41c64e6d;
  for (int i = 0; i < raw.length; i++) {
    final ch = raw.codeUnitAt(i);
    h1 = (h1 ^ ch) * 2654435761 & 0xFFFFFFFF;
    h2 = (h2 ^ ch) * 1597334677 & 0xFFFFFFFF;
  }
  h1 = ((h1 ^ (h1 >> 16)) * 2246822507) & 0xFFFFFFFF;
  h1 = (h1 ^ ((h2 ^ (h2 >> 13)) * 3266489909)) & 0xFFFFFFFF;
  h2 = ((h2 ^ (h2 >> 16)) * 2246822507) & 0xFFFFFFFF;
  h2 = (h2 ^ ((h1 ^ (h1 >> 13)) * 3266489909)) & 0xFFFFFFFF;
  final h3 = (h1 * h2 * 2166136261) & 0xFFFFFFFF;

  final p1 = h1.toRadixString(36).padLeft(7, '0');
  final p2 = h2.toRadixString(36).padLeft(7, '0');
  final p3 = h3.toRadixString(36).padLeft(7, '0');
  return (p1 + p2 + p3).substring(0, 15);
}

// Example usage:
// final id = generateDeterministicRecordId([userId, word.toLowerCase(), 'ja']);
```

### 6.3. SuperMemo-2 (SM-2) Scheduling Table

| Action | Score | Calculation Rule | Level Transition |
| :--- | :---: | :--- | :--- |
| **Again** | `1` | `repetitions = 0`, `interval = 0`, `easeFactor = max(1.3, easeFactor - 0.20)` | `learning` |
| **Hard** | `3` | `repetitions += 1`, `interval = reps <= 1 ? 1 : round(interval * 1.2)`, `easeFactor = max(1.3, easeFactor - 0.15)` | No change |
| **Good** | `4` | `repetitions += 1`, `interval = reps == 1 ? 1 : (reps == 2 ? 6 : round(interval * easeFactor))` | `known` at reps $\ge 3$ |
| **Easy** | `5` | `repetitions += 1`, `interval = reps == 1 ? 2 : (reps == 2 ? 8 : round(interval * easeFactor * 1.3))`, `easeFactor += 0.15` | `mastered` at reps $\ge 5$ |

---

## 7. Production Flutter Implementation (Copy-Paste Ready)

### 7.1. Type-Safe Dart Models (`models.dart`)

```dart
// lib/models/voca_models.dart

class Token {
  final String surface;
  final String? reading;
  final String? romanization;
  final String? pinyin;
  final String? baseForm;
  final String? partOfSpeech;
  final bool isPunctuation;

  Token({
    required this.surface,
    this.reading,
    this.romanization,
    this.pinyin,
    this.baseForm,
    this.partOfSpeech,
    this.isPunctuation = false,
  });

  factory Token.fromJson(Map<String, dynamic> json) {
    return Token(
      surface: json['surface'] as String? ?? '',
      reading: json['reading'] as String?,
      romanization: json['romanization'] as String?,
      pinyin: json['pinyin'] as String?,
      baseForm: json['baseForm'] as String?,
      partOfSpeech: json['partOfSpeech'] as String?,
      isPunctuation: json['isPunctuation'] as bool? ?? false,
    );
  }

  Map<String, dynamic> toJson() => {
    'surface': surface,
    'reading': reading,
    'romanization': romanization,
    'pinyin': pinyin,
    'baseForm': baseForm,
    'partOfSpeech': partOfSpeech,
    'isPunctuation': isPunctuation,
  };
}

class SubtitleCue {
  final double start;
  final double duration;
  final String text;
  final String? translation;
  List<Token> tokens;

  SubtitleCue({
    required this.start,
    required this.duration,
    required this.text,
    this.translation,
    this.tokens = const [],
  });

  factory SubtitleCue.fromJson(Map<String, dynamic> json) {
    return SubtitleCue(
      start: (json['start'] as num).toDouble(),
      duration: (json['duration'] as num).toDouble(),
      text: json['text'] as String? ?? '',
      translation: json['translation'] as String?,
      tokens: (json['tokens'] as List<dynamic>?)
              ?.map((t) => Token.fromJson(t as Map<String, dynamic>))
              .toList() ??
          [],
    );
  }
}

class GrammarPattern {
  final String id;
  final String language;
  final String pattern;
  final String title;
  final String shortExplanation;
  final String longExplanation;
  final String formation;
  final String level;
  final List<GrammarExample> examples;

  GrammarPattern({
    required this.id,
    required this.language,
    required this.pattern,
    required this.title,
    required this.shortExplanation,
    required this.longExplanation,
    required this.formation,
    required this.level,
    required this.examples,
  });

  factory GrammarPattern.fromJson(Map<String, dynamic> json) {
    return GrammarPattern(
      id: json['id'] as String? ?? '',
      language: json['language'] as String? ?? 'ja',
      pattern: json['pattern'] as String? ?? '',
      title: json['title'] as String? ?? '',
      shortExplanation: json['shortExplanation'] as String? ?? '',
      longExplanation: json['longExplanation'] as String? ?? '',
      formation: json['formation'] as String? ?? '',
      level: json['level'] as String? ?? '',
      examples: (json['examples'] as List<dynamic>?)
              ?.map((e) => GrammarExample.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
    );
  }
}

class GrammarExample {
  final String sentence;
  final String? romanization;
  final String translation;

  GrammarExample({
    required this.sentence,
    this.romanization,
    required this.translation,
  });

  factory GrammarExample.fromJson(Map<String, dynamic> json) {
    return GrammarExample(
      sentence: json['sentence'] as String? ?? '',
      romanization: json['romanization'] as String?,
      translation: json['translation'] as String? ?? '',
    );
  }
}

class GrammarMatch {
  final GrammarPattern pattern;
  final List<int> tokenIndices;
  final int startIndex;
  final int endIndex;

  GrammarMatch({
    required this.pattern,
    required this.tokenIndices,
    required this.startIndex,
    required this.endIndex,
  });
}

class DictionaryResult {
  final String word;
  final String from;
  final String to;
  final String source;
  final List<DictionaryEntry> entries;

  DictionaryResult({
    required this.word,
    required this.from,
    required this.to,
    required this.source,
    required this.entries,
  });

  factory DictionaryResult.fromJson(Map<String, dynamic> json) {
    return DictionaryResult(
      word: json['word'] as String? ?? '',
      from: json['from'] as String? ?? '',
      to: json['to'] as String? ?? '',
      source: json['source'] as String? ?? 'none',
      entries: (json['entries'] as List<dynamic>?)
              ?.map((e) => DictionaryEntry.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
    );
  }
}

class DictionaryEntry {
  final String? word;
  final String? reading;
  final String? romaji;
  final String? partOfSpeech;
  final List<String> definitions;
  final String? level;
  final String? audio;
  final List<Map<String, dynamic>> examples;

  DictionaryEntry({
    this.word,
    this.reading,
    this.romaji,
    this.partOfSpeech,
    required this.definitions,
    this.level,
    this.audio,
    this.examples = const [],
  });

  factory DictionaryEntry.fromJson(Map<String, dynamic> json) {
    return DictionaryEntry(
      word: json['word'] as String?,
      reading: json['reading'] as String?,
      romaji: json['romaji'] as String?,
      partOfSpeech: json['partOfSpeech'] as String?,
      definitions: (json['definitions'] as List<dynamic>?)
              ?.map((d) => d.toString())
              .toList() ??
          [],
      level: json['level'] as String?,
      audio: json['audio'] as String?,
      examples: (json['examples'] as List<dynamic>?)
              ?.map((e) => Map<String, dynamic>.from(e as Map))
              .toList() ??
          [],
    );
  }
}
```

---

### 7.2. Production Dio API Client (`api_client.dart`)

```dart
// lib/services/voca_api_client.dart

import 'package:dio/dio.dart';
import '../models/voca_models.dart';

class VocaApiClient {
  static const String baseUrl = 'https://voca.study';
  late final Dio _dio;

  VocaApiClient({String? authToken}) {
    _dio = Dio(BaseOptions(
      baseUrl: baseUrl,
      connectTimeout: const Duration(seconds: 15),
      receiveTimeout: const Duration(seconds: 30),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'VocaMobile/1.0.0 (Flutter; Android/iOS)',
        if (authToken != null) 'Authorization': 'Bearer $authToken',
      },
    ));

    // Logging & error handling interceptor
    _dio.interceptors.add(InterceptorsWrapper(
      onError: (DioException err, handler) {
        if (err.response?.statusCode == 429) {
          final retryAfter = err.response?.headers.value('retry-after') ?? '60';
          print('[VocaAPI] Rate limited! Retry after $retryAfter seconds');
        }
        return handler.next(err);
      },
    ));
  }

  /// 1. Fetch transcript with Gladia ASR auto-polling support
  Future<List<SubtitleCue>> getTranscript({
    required String videoId,
    required String lang,
    bool preferAI = false,
    String? turnstileToken,
    Function(String status)? onProgress,
  }) async {
    final response = await _dio.post('/api/transcript', data: {
      'videoId': videoId,
      'lang': lang,
      'preferAI': preferAI,
      if (turnstileToken != null) 'turnstileToken': turnstileToken,
    });

    final data = response.data;

    // Handle Gladia AI queued polling
    if (data['status'] == 'processing' && data['resultUrl'] != null) {
      onProgress?.call('Transcribing audio with AI...');
      return _pollGladiaResult(videoId, lang, data['resultUrl'] as String, onProgress);
    }

    if (data['success'] == true && data['segments'] != null) {
      return (data['segments'] as List)
          .map((s) => SubtitleCue.fromJson(s as Map<String, dynamic>))
          .toList();
    }

    throw Exception(data['error'] ?? 'Failed to load transcript');
  }

  Future<List<SubtitleCue>> _pollGladiaResult(
    String videoId,
    String lang,
    String resultUrl,
    Function(String status)? onProgress,
  ) async {
    const int maxRetries = 20; // 60 seconds max
    for (int i = 0; i < maxRetries; i++) {
      await Future.delayed(const Duration(seconds: 3));
      onProgress?.call('AI transcription in progress (${(i + 1) * 3}s)...');

      final pollRes = await _dio.post('/api/transcript', data: {
        'videoId': videoId,
        'lang': lang,
        'resultUrl': resultUrl,
      });

      if (pollRes.data['success'] == true && pollRes.data['segments'] != null) {
        return (pollRes.data['segments'] as List)
            .map((s) => SubtitleCue.fromJson(s as Map<String, dynamic>))
            .toList();
      }
    }
    throw Exception('Gladia transcription timed out');
  }

  /// 2. Batch tokenize subtitle cues (videoId is REQUIRED)
  Future<List<List<Token>>> tokenizeBatch({
    required String videoId,
    required String lang,
    required List<String> texts,
  }) async {
    final response = await _dio.post(
      '/api/tokenize-batch/$lang',
      data: {
        'videoId': videoId,
        'texts': texts,
      },
    );

    final rawTokens = response.data['tokens'] as List<dynamic>;
    return rawTokens.map((line) {
      return (line as List<dynamic>)
          .map((t) => Token.fromJson(t as Map<String, dynamic>))
          .toList();
    }).toList();
  }

  /// 3. Multi-source dictionary search
  Future<DictionaryResult> lookupDictionary({
    required String word,
    required String from,
    required String to,
  }) async {
    final response = await _dio.get(
      '/api/dict',
      queryParameters: {'word': word, 'from': from, 'to': to},
    );
    return DictionaryResult.fromJson(response.data as Map<String, dynamic>);
  }

  /// 4. Synchronized dual subtitles
  Future<List<SubtitleCue>> getDualSubtitles({
    required String videoId,
    required String sourceLang,
    required String targetLang,
    required List<SubtitleCue> segments,
  }) async {
    final response = await _dio.post('/api/dual-subtitles', data: {
      'videoId': videoId,
      'sourceLang': sourceLang,
      'targetLang': targetLang,
      'segments': segments.map((s) => {'start': s.start, 'duration': s.duration, 'text': s.text}).toList(),
    });

    if (response.data['segments'] != null) {
      return (response.data['segments'] as List)
          .map((s) => SubtitleCue.fromJson(s as Map<String, dynamic>))
          .toList();
    }
    return segments;
  }
}
```

---

### 7.3. Client-Side Grammar Engine in Dart (`grammar_engine.dart`)

```dart
// lib/services/grammar_engine.dart

import 'dart:convert';
import 'package:flutter/services.dart' show rootBundle;
import '../models/voca_models.dart';

class GrammarEngine {
  final Map<String, List<GrammarPattern>> _patternsByLang = {};
  final Map<String, Map<String, List<GrammarPattern>>> _indicesByLang = {};

  static const List<String> _jaEndingPatterns = [
    'ている', 'ていた', 'ています', 'ていました',
    'たい', 'たかった', 'たくない',
    'ない', 'なかった', 'ません',
    'れる', 'られる', 'させる',
    'たら', 'たり', 'ても', 'ば', 'なければ',
    'てもいい', 'てはいけない',
    'てしまう', 'ちゃう', 'ておく', 'とく',
    'かもしれない', 'はずだ', 'ようだ', 'そうだ',
  ];

  static const List<String> _koEndingPatterns = [
    '은', '는', '이', '가', '을', '를', '에', '에서', '도', '만',
    '과', '와', '로', '으로', '보다', '부터', '까지',
    '고', '고 있다', '고 싶다', '지 않다', '지 못하다',
    '아서', '어서', '면', '으면', '려고 하다',
    'ㄹ 수 있다', '을 수 있다', '수 있다',
    '아야 하다', '어야 하다', '아/어 보다',
  ];

  static const List<Map<String, String>> _zhSplitRules = [
    {'start': '虽然', 'end': '但是', 'key': '虽然但是'},
    {'start': '因为', 'end': '所以', 'key': '因为所以'},
    {'start': '如果', 'end': '就', 'key': '如果就'},
    {'start': '不但', 'end': '而且', 'key': '不但而且'},
    {'start': '越', 'end': '越', 'key': '越越'},
    {'start': '一边', 'end': '一边', 'key': '一边一边'},
    {'start': '除了', 'end': '以外', 'key': '除了以外'},
    {'start': '是', 'end': '的', 'key': '是的'},
  ];

  /// Initialize and load grammar patterns for target language from assets
  Future<void> loadLanguage(String lang) async {
    if (_patternsByLang.containsKey(lang)) return;

    try {
      final jsonStr = await rootBundle.loadString('assets/grammar/grammar_$lang.json');
      final list = jsonDecode(jsonStr) as List<dynamic>;
      final patterns = list.map((p) => GrammarPattern.fromJson(p as Map<String, dynamic>)).toList();

      _patternsByLang[lang] = patterns;
      _indicesByLang[lang] = _buildIndex(patterns, lang);
    } catch (e) {
      print('[GrammarEngine] Warning: Could not load assets/grammar/grammar_$lang.json: $e');
    }
  }

  Map<String, List<GrammarPattern>> _buildIndex(List<GrammarPattern> patterns, String lang) {
    final index = <String, List<GrammarPattern>>{};

    void add(String raw, GrammarPattern pattern) {
      final key = _normalize(raw);
      if (key.isEmpty) return;
      index.putIfAbsent(key, () => []).add(pattern);
    }

    for (final p in patterns) {
      add(p.id, p);
      add(p.pattern, p);

      if (p.pattern.contains('(') || p.pattern.contains(')')) {
        add(p.pattern.replaceAll(RegExp(r'[()（）]'), ''), p);
      }
      if (p.pattern.contains('/')) {
        for (final part in p.pattern.split('/')) {
          add(part, p);
        }
      }
    }
    return index;
  }

  String _normalize(String text) {
    return text
        .replaceAll(RegExp(r'[~～〜。、・….\s?？！!,，:：;；"“”‘’()（）\[\]【】]'), '')
        .toLowerCase();
  }

  /// Detect grammar patterns in a sequence of subtitle tokens
  List<GrammarMatch> detectPatterns(List<Token> tokens, String lang) {
    final index = _indicesByLang[lang];
    if (index == null || tokens.isEmpty) return [];

    final matches = <GrammarMatch>[];

    // Strategy 1: Multi-token sequence matching (window size 1 to 5)
    for (int i = 0; i < tokens.length; i++) {
      if (tokens[i].isPunctuation || tokens[i].surface.trim().isEmpty) continue;

      for (int len = 1; len <= 5 && (i + len) <= tokens.length; len++) {
        final seq = tokens.sublist(i, i + len);
        if (seq.last.isPunctuation) continue;

        final seqText = seq.map((t) => t.surface).join();
        final norm = _normalize(seqText);

        final hits = index[norm];
        if (hits != null && hits.isNotEmpty) {
          matches.add(GrammarMatch(
            pattern: hits.first,
            tokenIndices: List.generate(len, (idx) => i + idx),
            startIndex: i,
            endIndex: i + len - 1,
          ));
        }
      }
    }

    // Strategy 2: Japanese verb ending & baseForm detection
    if (lang == 'ja') {
      for (int i = 0; i < tokens.length; i++) {
        final t = tokens[i];
        if (t.isPunctuation) continue;

        for (final ending in _jaEndingPatterns) {
          if (t.surface.endsWith(ending)) {
            final hits = index[_normalize(ending)];
            if (hits != null && hits.isNotEmpty) {
              matches.add(GrammarMatch(
                pattern: hits.first,
                tokenIndices: [i],
                startIndex: i,
                endIndex: i,
              ));
              break;
            }
          }
        }

        if (t.baseForm != null && t.baseForm != t.surface) {
          final hits = index[_normalize(t.baseForm!)];
          if (hits != null && hits.isNotEmpty) {
            matches.add(GrammarMatch(
              pattern: hits.first,
              tokenIndices: [i],
              startIndex: i,
              endIndex: i,
            ));
          }
        }
      }
    }

    // Strategy 3: Chinese split correlatives (虽然...但是)
    if (lang == 'zh') {
      for (final rule in _zhSplitRules) {
        final startIdx = tokens.indexWhere((t) => _normalize(t.surface) == _normalize(rule['start']!));
        if (startIdx != -1) {
          final endIdx = tokens.indexWhere(
            (t) => _normalize(t.surface) == _normalize(rule['end']!),
            startIdx + 1,
          );
          if (endIdx != -1) {
            final hits = index[_normalize(rule['key']!)];
            if (hits != null && hits.isNotEmpty) {
              matches.add(GrammarMatch(
                pattern: hits.first,
                tokenIndices: [startIdx, endIdx],
                startIndex: startIdx,
                endIndex: endIdx,
              ));
            }
          }
        }
      }
    }

    // Deduplicate matches on overlapping spans
    final seen = <String>{};
    return matches.where((m) {
      final key = '${m.pattern.id}_${m.tokenIndices.join(",")}';
      return seen.add(key);
    }).toList();
  }
}
```

---

### 7.4. Interactive Subtitle & Furigana Widget (`subtitle_widget.dart`)

```dart
// lib/widgets/interactive_subtitle_view.dart

import 'package:flutter/material.dart';
import '../models/voca_models.dart';

class InteractiveSubtitleView extends StatelessWidget {
  final SubtitleCue cue;
  final List<GrammarMatch> grammarMatches;
  final Function(Token token) onTokenTap;
  final Function(GrammarPattern pattern)? onGrammarTap;

  const InteractiveSubtitleView({
    super.key,
    required this.cue,
    this.grammarMatches = const [],
    required this.onTokenTap,
    this.onGrammarTap,
  });

  @override
  Widget build(BuildContext context) {
    // Build set of token indices part of a grammar match
    final grammarTokenMap = <int, GrammarPattern>{};
    for (final m in grammarMatches) {
      for (final idx in m.tokenIndices) {
        grammarTokenMap[idx] = m.pattern;
      }
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.black.withOpacity(0.85),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Primary synchronized learning subtitle with Furigana / Pinyin
          Wrap(
            alignment: WrapAlignment.center,
            crossAxisAlignment: WrapCrossAlignment.end,
            spacing: 2,
            runSpacing: 6,
            children: cue.tokens.asMap().entries.map((entry) {
              final idx = entry.key;
              final token = entry.value;
              final grammarPattern = grammarTokenMap[idx];

              if (token.isPunctuation) {
                return Text(
                  token.surface,
                  style: const TextStyle(color: Colors.white, fontSize: 20),
                );
              }

              return InkWell(
                onTap: () {
                  if (grammarPattern != null && onGrammarTap != null) {
                    onGrammarTap!(grammarPattern);
                  } else {
                    onTokenTap(token);
                  }
                },
                borderRadius: BorderRadius.circular(4),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 2),
                  decoration: BoxDecoration(
                    border: grammarPattern != null
                        ? const Border(bottom: BorderSide(color: Colors.amberAccent, width: 2.5))
                        : null,
                  ),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      // Furigana reading or Chinese Pinyin ruby text
                      if (token.reading != null || token.pinyin != null)
                        Text(
                          token.reading ?? token.pinyin!,
                          style: const TextStyle(
                            color: Colors.white70,
                            fontSize: 10,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      // Surface word
                      Text(
                        token.surface,
                        style: TextStyle(
                          color: grammarPattern != null ? Colors.amberAccent : Colors.white,
                          fontSize: 20,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
              );
            }).toList(),
          ),

          // Secondary translated subtitle
          if (cue.translation != null && cue.translation!.isNotEmpty) ...[
            const SizedBox(height: 6),
            Text(
              cue.translation!,
              textAlign: TextAlign.center,
              style: const TextStyle(
                color: Colors.white70,
                fontSize: 14,
                fontStyle: FontStyle.italic,
              ),
            ),
          ],
        ],
      ),
    );
  }
}
```

---

## 8. Mobile Subtitle Lifecycle & Sticky Display Rule

```
┌─────────────────────────────────────────────────────────────┐
│ 1. VIDEO LOAD                                               │
│    VocaApiClient.getTranscript(videoId, lang)               │
│    VocaApiClient.tokenizeBatch(videoId, lang, texts)        │
│    GrammarEngine.detectPatterns(cue.tokens, lang)           │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. PLAYER TICKER LOOP (100ms interval)                      │
│    Listen to YouTube Player currentTime                     │
│    Find active cue using Sticky Subtitle Rule               │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. INTERACTION                                              │
│    Tap Token   -> Open Dictionary BottomSheet & Add to SRS  │
│    Tap Grammar -> Open Grammar BottomSheet & Formations     │
└─────────────────────────────────────────────────────────────┘
```

### The Sticky Subtitle Display Rule
Raw YouTube timed text contains 0.2s–0.8s gaps between phrases. If subtitles are hidden strictly when `currentTime > cue.start + cue.duration`, the subtitles flicker on and off.  

**Flutter Controller Logic:**
```dart
SubtitleCue? getActiveCue(double currentTime, List<SubtitleCue> cues) {
  for (int i = 0; i < cues.length; i++) {
    final cue = cues[i];
    final nextCueStart = (i + 1 < cues.length) ? cues[i + 1].start : double.infinity;

    // Active during cue's explicit duration
    if (currentTime >= cue.start && currentTime < (cue.start + cue.duration)) {
      return cue;
    }

    // Sticky Hold: keep active in dead gap between phrases unless gap > 3.0 seconds
    if (currentTime >= (cue.start + cue.duration) && currentTime < nextCueStart) {
      if ((nextCueStart - (cue.start + cue.duration)) <= 3.0) {
        return cue;
      }
    }
  }
  return null;
}
```

---

## 9. Error Handling & Retry Policies

| HTTP Status | Error Code / Trigger | Client Action | Retry Policy |
| :---: | :--- | :--- | :--- |
| `200` | `status: "processing"` | Gladia AI audio speech-to-text queued | Poll `POST /api/transcript` with `resultUrl` every 3s (max 60s) |
| `400` | `INVALID_VIDEO_ID` | Video ID does not match `^[a-zA-Z0-9_-]{11}$` | Show invalid video URL prompt | Do not retry |
| `400` | `VIDEO_TOO_LONG` | Video length exceeds account tier cap | Show Pro/Premium upgrade sheet | Do not retry |
| `401` | `UNAUTHORIZED` | Expired PocketBase JWT token | Call `pb.collection('users').authRefresh()` and retry |
| `403` | `BOT_DETECTED` | Missing or default `User-Agent` | Set descriptive `User-Agent: VocaMobile/1.0.0` |
| `403` | `NO_DIAMONDS` | 0 Diamond credits and video not cached | Show Diamond balance modal with next regen time |
| `404` | `NO_NATIVE` | No native captions available | Prompt user: "Transcribe with Gladia AI?" |
| `429` | `RATE_LIMITED` | Rate limit window exceeded | Read `Retry-After` header and show countdown toast |

---

## 10. Verification & QA Testing Checklist

- [ ] **Anti-Bot User-Agent Header**: Verify that all outgoing Dio requests include `User-Agent: VocaMobile/1.0.0 (...)` and that requests do NOT default to `Dart/<version>`.
- [ ] **Batch Tokenization**: Verify that `POST /api/tokenize-batch/:lang` includes both `videoId` and `texts`, returning matching tokens with `reading`, `romanization`, `pinyin`, `baseForm`, and `partOfSpeech`.
- [ ] **Grammar Matching**: Test Japanese subtitle (`日本語を勉強している`) and verify that `ている` triggers a GrammarMatch with level `JLPT N5`.
- [ ] **Chinese Correlatives**: Test `虽然天气冷但是很开心` and verify that `虽然...但是` triggers a split GrammarMatch.
- [ ] **Gladia AI Polling**: Test a video with no native captions; verify polling loops every 3s and completes gracefully when Gladia finishes.
- [ ] **PocketBase Double Quotes**: Verify all PocketBase query filters use double quotes: `filter: 'user = "' + userId + '"'`.
- [ ] **Offline Card Creation**: Save flashcards in Airplane Mode; verify IDs match `generateDeterministicRecordId([userId, word, lang])` and sync without 409 conflict errors.
- [ ] **VietQR Intent**: Verify clicking "Pay with Mobile Banking" successfully triggers bank app deep links with valid payload descriptions (`VOCA{orderCode}`).

# Database & Storage Architecture

This document specifies the database schemas, object storage hierarchies, distributed key-value designs, and client-side caching strategies across **LinguaTube**.

---

## 1. Storage Tier Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        STORAGE TIER OVERVIEW                           │
└────────────────────────────────────────────────────────────────────────┘

 [ 1. Edge Relational ] ───────► Cloudflare D1 (SQLite)
                                 • Queryable metadata & video language registry
                                 • Negative caching (no_transcript_cache)
                                 • 100,000 writes/day free tier quota

 [ 2. Edge Object Store ] ─────► Cloudflare R2 (S3-Compatible)
                                 • Permanent JSON transcript storage
                                 • Dual-subtitle batch translation files
                                 • Zero egress fees, high concurrency

 [ 3. Edge Distributed KV ] ───► Cloudflare KV
                                 • Distributed rate limiting buckets
                                 • Tokenization hash cache (30-day TTL)
                                 • Fast video info cache (24-hour TTL)

 [ 4. Backend-as-a-Service ] ──► PocketBase (voca.pockethost.io)
                                 • User authentication & JWT sessions
                                 • Cloud sync for vocabulary, streaks, playlists
                                 • Server-side hook automation (streaks.pb.js)

 [ 5. Client Persistence ] ────► Browser IndexedDB & LocalStorage
                                 • Offline-first repositories
                                 • Persistent transcript caching (TranscriptCacheService)
                                 • Settings & UI state persistence
```

---

## 2. Cloudflare D1 Relational Schemas

Cloudflare D1 runs SQLite at the edge. The schema files reside in `db/`:

### 2.1. Table: `video_languages` (`db/add-video-languages.sql`)
Caches metadata and discovered caption languages across video sessions:
```sql
CREATE TABLE IF NOT EXISTS video_languages (
    video_id TEXT PRIMARY KEY,
    available_languages TEXT NOT NULL,  -- JSON array: ["ko", "ja", "en"]
    has_auto_captions INTEGER DEFAULT 0,
    duration_seconds INTEGER,
    title TEXT,
    channel TEXT,
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER DEFAULT (strftime('%s', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_video_languages_updated ON video_languages(updated_at);
```

### 2.2. Table: `no_transcript_cache` (`db/add-video-languages.sql`)
Prevents repeated failed fetches for videos confirmed to lack native transcripts:
```sql
CREATE TABLE IF NOT EXISTS no_transcript_cache (
    video_id TEXT NOT NULL,
    language TEXT NOT NULL,
    source TEXT NOT NULL,  -- 'youtube' or 'ai'
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    PRIMARY KEY (video_id, language, source)
);

CREATE INDEX IF NOT EXISTS idx_no_transcript_video ON no_transcript_cache(video_id);
CREATE INDEX IF NOT EXISTS idx_no_transcript_created ON no_transcript_cache(created_at);
```

### 2.3. Table: `video_meta` (`db/add-video-meta.sql`)
Fast index recording which transcripts currently exist in R2:
```sql
CREATE TABLE IF NOT EXISTS video_meta (
    video_id TEXT NOT NULL,
    language TEXT NOT NULL,
    source TEXT NOT NULL,  -- 'youtube', 'supadata', 'ai'
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    PRIMARY KEY (video_id, language)
);

CREATE INDEX IF NOT EXISTS idx_video_meta_lookup ON video_meta(video_id, language);
```

### 2.4. Table: `pending_jobs` (`db/add-pending-columns.sql`)
Tracks active asynchronous Gladia AI speech-to-text generation jobs:
```sql
CREATE TABLE IF NOT EXISTS pending_jobs (
    video_id TEXT NOT NULL,
    language TEXT NOT NULL,
    result_url TEXT NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    PRIMARY KEY (video_id, language)
);
```

---

## 3. Cloudflare R2 Object Store Layout

Bucket binding: `TRANSCRIPT_STORAGE` (`linguatube-transcripts`)

### 3.1. Transcript Object Format
- **Key**: `transcripts/{videoId}/{lang}.json`
- **Content-Type**: `application/json`
- **Custom Metadata**:
  - `source`: `'supadata' | 'youtube' | 'ai'`
  - `segmentCount`: `string`
  - `timestamp`: Epoch milliseconds
- **JSON Structure**:
  ```json
  {
    "videoId": "abc123xyz",
    "language": "ja",
    "source": "supadata",
    "timestamp": 1725513600000,
    "segments": [
      {
        "id": 0,
        "start": 1.25,
        "duration": 2.4,
        "text": "こんにちは皆さん"
      }
    ]
  }
  ```

### 3.2. Dual Subtitle Object Format
- **Key**: `translations/{videoId}/{sourceLang}_{targetLang}.json`
- **Segments Structure**: Extends segments with a `translation` property:
  ```json
  {
    "id": 0,
    "start": 1.25,
    "duration": 2.4,
    "text": "こんにちは皆さん",
    "translation": "Hello everyone"
  }
  ```

---

## 4. Cloudflare KV Key Design

Namespace binding: `TRANSCRIPT_CACHE`

| Key Pattern | Value Type | TTL | Purpose |
| :--- | :--- | :--- | :--- |
| `ratelimit:{prefix}:{clientId}` | JSON `{ count, resetAt }` | Dynamic (window) | Distributed IP/user rate limiting |
| `tokens:{lang}:{hash}` | JSON `{ tokens: Token[] }` | 30 Days | Precomputed Kuromoji / Intl tokens |
| `video-info:{videoId}` | JSON `{ title, duration, ... }` | 24 Hours | Fast YouTube oEmbed metadata |
| `dict:v4:{from}:{to}:{word}` | JSON `DictionaryEntry[]` | 7 Days | Cached dictionary lookups |
| `keys:cooldown:{provider}:{key}` | String `timestamp` | 1 Hour | API key rotation rate-limit cooldown |

---

## 5. PocketBase Collections & Server Hooks

Hosted at `https://voca.pockethost.io`.

### 5.1. Collection: `users`
- Standard PocketBase auth collection with custom fields:
  - `subscription_tier`: `'free' | 'pro' | 'premium'`
  - `subscription_expires`: DateTime
  - `diamonds`: Integer (current AI credits)
  - `diamonds_updated_at`: DateTime

### 5.2. Collection: `vocabulary`
- Synchronized user vocabulary notebook:
  - `id`: 15-character deterministic hash (`base64(userId|word|lang)`)
  - `user`: Relation $\rightarrow$ `users.id`
  - `word`: String (headword)
  - `reading`: String (hiragana / pinyin)
  - `pinyin`: String
  - `romanization`: String (hepburn / revised romanization)
  - `meaning`: String (definition)
  - `language`: `'ja' | 'zh' | 'ko' | 'en'`
  - `level`: `'new' | 'learning' | 'known' | 'ignored'`
  - `examples`: JSON Array of strings

### 5.3. Collection: `streaks`
- Gamified learning continuity:
  - `user`: Relation $\rightarrow$ `users.id`
  - `current_streak`: Integer
  - `longest_streak`: Integer
  - `freezes_remaining`: Integer (0 to 2)
  - `last_activity`: DateTime
  - `last_freeze_used`: DateTime
  - `activity_log`: JSON Array of ISO date strings (`YYYY-MM-DD`)

### 5.4. PocketBase Server Hooks (`streaks.pb.js`)
Executed server-side on PocketBase:
- `POST /api/streaks/record-activity`: Records daily user practice, awards freeze items at milestones (7, 30, 100 days), and increments streaks.
- `GET /api/streaks/me`: Retrieves current streak status and activity calendar.
- `GET /api/streaks/daily-maintenance`: Automated midnight cron maintenance that detects missed days and consumes freeze items or resets streaks.

---

## 6. Client-Side Persistent Storage

### 6.1. IndexedDB: `TranscriptCacheService`
- Database Name: `linguatube_db`
- Store Name: `transcripts`
- Key: `${videoId}:${lang}`
- Value: `{ videoId, language, cues: SubtitleCue[], source, cachedAt }`
- **Pruning Strategy**: Automatic LRU eviction and expiration after 7 days.

### 6.2. LocalStorage Key Registry
| Key | Schema / Content | Purpose |
| :--- | :--- | :--- |
| `linguatube_settings` | `UserSettings` JSON | App settings, theme, reading modes |
| `linguatube_vocabulary` | `VocabularyItem[]` JSON | Offline vocabulary notebook |
| `linguatube-ui-language` | `'en' \| 'vi' \| 'ja' \| 'ko' \| 'zh'` | Current UI localization language |
| `pocketbase_auth` | `{ token, model }` | Persistent PocketBase session auth store |
| `lingua-tube-last-video` | `{ id, title, channel, ... }` | Last watched video resume state |
| `linguatube-recent-searches` | `string[]` | Recent dictionary search terms |
| `linguatube_tokens` | `Record<videoId:lang, tokens>` | Pre-parsed subtitle tokens cache |

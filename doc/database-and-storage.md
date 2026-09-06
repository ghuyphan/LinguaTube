# Database & Storage Architecture

This document specifies the database schemas, object storage hierarchies, distributed key-value designs, and client-side caching strategies across **Voca** (formerly LinguaTube).

---

## 1. Storage Tier Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        STORAGE TIER OVERVIEW                           │
└────────────────────────────────────────────────────────────────────────┘

 [ 1. Edge Relational ] ───────► Cloudflare D1 (SQLite)
                                 • Queryable metadata & video language discovery (video_languages)
                                 • Negative caching (no_transcript_cache)
                                 • Fast index registry (video_meta)
                                 • 100,000 writes/day free tier quota

 [ 2. Edge Object Store ] ─────► Cloudflare R2 (S3-Compatible)
                                 • Permanent JSON transcript storage (transcripts/)
                                 • Dual-subtitle batch translation files (translations/)
                                 • Zero egress fees, high concurrency

 [ 3. Edge Distributed KV ] ───► Cloudflare KV
                                 • Distributed rate limiting buckets & translate-texts counters
                                 • Batch translation hash cache (trbatch:v1:...)
                                 • Tokenization hash cache (30-day TTL)
                                 • Fast video info cache (24-hour TTL)

 [ 4. Backend-as-a-Service ] ──► PocketBase (voca.pockethost.io)
                                 • User authentication & JWT sessions
                                 • Cloud sync for vocabulary, streaks, playlists
                                 • Server-side hook automation (streaks.pb.js)

 [ 5. Client Persistence ] ────► Browser IndexedDB & LocalStorage
                                 • IndexedDB (lingua-tube-cache): Subtitle cache with TTL
                                 • LocalStorage: Offline-first repositories & app settings
```

---

## 2. Cloudflare D1 Relational Schemas

Cloudflare D1 runs SQLite at the edge. The schema migration files reside in `db/`:

### 2.1. Table: `video_languages` (`db/add-video-languages.sql`)
Caches discovered caption languages and video metadata across user sessions:
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
Negative cache preventing repeated failed fetches for videos confirmed to lack native transcripts:
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
Index recording available languages for quick lookup without reading full transcripts:
```sql
CREATE TABLE IF NOT EXISTS video_meta (
    video_id TEXT PRIMARY KEY,
    available_langs TEXT,  -- comma-separated: "en,ja,zh"
    created_at INTEGER DEFAULT (strftime('%s', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_video_meta_video ON video_meta(video_id);
```

### 2.4. Table: `transcripts` (`db/schema.sql` + `db/add-pending-columns.sql`)
Permanent database backup and status tracker for transcripts:
```sql
CREATE TABLE IF NOT EXISTS transcripts (
    video_id TEXT NOT NULL,
    language TEXT NOT NULL,
    source TEXT NOT NULL,  -- 'youtube' or 'ai'
    segments TEXT,         -- JSON array of {start, duration, text}, NULL if pending
    status TEXT DEFAULT 'complete',  -- 'pending' or 'complete'
    gladia_result_url TEXT,          -- Gladia polling URL for pending jobs
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    PRIMARY KEY (video_id, language)
);

CREATE INDEX IF NOT EXISTS idx_transcript_video ON transcripts(video_id);
```

### 2.5. Table: `pending_jobs` (Edge Helper Schema)
Tracks in-progress Gladia AI speech-to-text generation jobs:
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

### 3.2. Dual Subtitle Translation Object Format
- **Key**: `translations/{videoId}/{sourceLang}_{targetLang}.json`
- **JSON Structure**:
  ```json
  {
    "videoId": "abc123xyz",
    "sourceLang": "ja",
    "targetLang": "en",
    "segments": [
      {
        "id": 0,
        "start": 1.25,
        "duration": 2.4,
        "text": "こんにちは皆さん",
        "translation": "Hello everyone"
      }
    ]
  }
  ```

---

## 4. Cloudflare KV Key Design

Namespace binding: `TRANSCRIPT_CACHE`

| Key Pattern | Value Type | TTL | Purpose |
| :--- | :--- | :--- | :--- |
| `ratelimit:{prefix}:{clientId}` | JSON `{ count, resetAt }` | Dynamic (window) | Distributed IP/user rate limiting |
| `trbatch:v1:{source}:{target}:{hash}` | JSON `{ translations: string[] }` | 7 Days | Batch translation response cache |
| `tokens:{lang}:{hash}` | JSON `{ tokens: Token[] }` | 30 Days | Precomputed Kuromoji / Intl tokens |
| `video-info:{videoId}` | JSON `{ title, duration, ... }` | 24 Hours | Fast YouTube oEmbed metadata |
| `dict:v4:{from}:{to}:{word}` | JSON `DictionaryEntry[]` | 7 Days | Multi-source dictionary lookups |
| `no-transcript:{videoId}:{lang}:{source}` | String `'1'` | 7 Days | KV fast-path for non-existent transcripts |
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
- **Database Name**: `lingua-tube-cache`
- **Version**: `2`
- **Store Name**: `transcripts`
- **Key Path**: `key` (Formatted as `${videoId}:${lang}`)
- **Indexes**: `expiresAt` (non-unique)
- **TTL**: 7 days (`7 * 24 * 60 * 60 * 1000` ms).
- **Pruning & Cleanliness**:
  - Automatic expiration check on read.
  - Automatically evicts stale dev mock transcript entries when opening real YouTube videos.

### 6.2. LocalStorage Key Registry

| Key | Service / Repository | Type / Schema | Purpose |
| :--- | :--- | :--- | :--- |
| `linguatube_vocabulary` | `OfflineVocabularyRepository` | `VocabularyItem[]` | Offline vocabulary notebook items |
| `linguatube_playlists` | `OfflinePlaylistRepository` | `Playlist[]` | User-created and bookmarked playlists |
| `linguatube_history` | `OfflineHistoryRepository` | `HistoryEntry[]` | Video watch progress and timestamps |
| `linguatube_streaks` | `OfflineStreakRepository` | `StreakData` | Local streak count and activity calendar |
| `linguatube_settings` | `SettingsService` | `UserSettings` | User preferences, theme, and reading modes |
| `linguatube-ui-language` | `I18nService` | `'en' \| 'vi' \| 'ja' \| 'ko' \| 'zh'` | Selected UI localization language |
| `linguatube_translations` | `TranslationService` | `[string, string][]` | Client-side cached text translations (max 1000) |
| `linguatube_tokens` | `SubtitleService` | `Record<string, Token[]>` | Pre-parsed subtitle token cache |
| `linguatube_dict_cache` | `DictionaryService` | `Record<string, CacheEntry>` | Client-side dictionary search cache |
| `linguatube_recent_searches_{lang}`| `DictionaryService` | `string[]` | Language-scoped recent search query history |
| `lingua-tube-last-video` | `YoutubeService` | `string` (videoId) | Video ID for resuming last session |
| `linguatube_daily_study_progress` | `StudyPageComponent` | `{ count: number, date: string }` | Daily reviewed flashcard counter |
| `linguatube_daily_study_goal` | `StudyPageComponent` | `number` | Daily study target (default 20 cards) |
| `pocketbase_auth` | `PocketBaseService` | `{ token: string, model: User }` | User auth session token and profile |

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

 [ 4. Backend-as-a-Service ] ──► Supabase (PostgreSQL & GoTrue Auth)
                                 • Google OAuth & JWT user sessions
                                 • Row Level Security (RLS) policies
                                 • Cloud sync for vocabulary, streaks, playlists, gamification
                                 • Atomic stored procedure (record_streak_activity)

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
    available_languages TEXT NOT NULL,  -- JSON array of YouTube caption tracks: ["ar", "en", "ja", "ko"]
    sub_languages TEXT DEFAULT '[]',    -- JSON array of verified server-stored transcripts: ["ja", "en"]
    has_auto_captions INTEGER DEFAULT 0,
    duration_seconds INTEGER,
    title TEXT,
    channel TEXT,
    channel_avatar TEXT,                -- Official YouTube channel avatar CDN URL
    levels TEXT DEFAULT '{}',           -- JSON map of lang -> level (e.g. {"ja":"JLPT N4"})
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER DEFAULT (strftime('%s', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_video_languages_updated ON video_languages(updated_at);
CREATE INDEX IF NOT EXISTS idx_video_languages_sub ON video_languages(sub_languages);
```

### 2.2. Table: `no_transcript_cache` (`db/add-video-languages.sql`)
Negative cache preventing repeated failed fetches for videos confirmed to lack native transcripts:
```sql
CREATE TABLE IF NOT EXISTS no_transcript_cache (
    video_id TEXT NOT NULL,
    language TEXT NOT NULL,  -- ISO code (e.g. 'ja', 'zh') or '*' for videos confirmed to have 0 captions globally
    source TEXT NOT NULL,    -- 'native' or 'ai'
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    PRIMARY KEY (video_id, language, source)
);

CREATE INDEX IF NOT EXISTS idx_no_transcript_video ON no_transcript_cache(video_id);
CREATE INDEX IF NOT EXISTS idx_no_transcript_created ON no_transcript_cache(created_at);
```
> [!NOTE]
> When upstream Supadata confirms a video has no native captions in any language, `language = '*'` is inserted alongside the requested language code, and `video_languages.available_languages` is set to `'[]'`. Subsequent checks for any language match `(language = ? OR language = '*')` and return immediately in < 20ms.

### 2.3. Table: `video_meta` (`db/schema.sql` & `db/add-video-meta.sql`)
Index recording available languages and sources per video for quick lookup without reading full transcripts:
```sql
CREATE TABLE IF NOT EXISTS video_meta (
    video_id TEXT NOT NULL,
    language TEXT NOT NULL,
    source TEXT NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    PRIMARY KEY (video_id, language)
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

### 2.5. Table: `ai_transcription_jobs` (`db/create-ai-transcription-jobs.sql` & `db/schema.sql`)
Replaces legacy `pending_jobs` with a full relational state machine supporting edge-isolated workers, asynchronous webhooks, server-side status checks, and atomic refund guarantees:
```sql
CREATE TABLE IF NOT EXISTS ai_transcription_jobs (
    id TEXT PRIMARY KEY,
    video_id TEXT NOT NULL,
    language TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'queued',   -- 'queued' | 'processing' | 'completed' | 'failed'
    gladia_id TEXT,
    diamond_cost INTEGER NOT NULL DEFAULT 1,
    user_id TEXT,
    error_message TEXT,
    webhook_received_at INTEGER,
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER DEFAULT (strftime('%s', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_ai_jobs_video_lang ON ai_transcription_jobs(video_id, language);
CREATE INDEX IF NOT EXISTS idx_ai_jobs_status ON ai_transcription_jobs(status);
CREATE INDEX IF NOT EXISTS idx_ai_jobs_created ON ai_transcription_jobs(created_at);

-- Partial Unique Index: Strictly prevents duplicate active jobs for the same video/language
-- while allowing historical records ('completed', 'failed') to persist for audits and retries.
CREATE UNIQUE INDEX IF NOT EXISTS uq_active_job_video_lang
    ON ai_transcription_jobs(video_id, language)
    WHERE status IN ('queued', 'processing');
```
- **Concurrency & Atomic Locks (`reserveAiJob`)**: Inserting a job with `status: 'queued'` atomically reserves a processing lock. If another tab or client attempts to initiate AI transcription for the same video/language concurrently, SQLite rejects the second insertion with a unique constraint violation, returning the existing active job without double-deducting user diamonds.
- **State Machine**:
  - `queued`: Lock acquired, awaiting confirmation from Gladia audio submission API.
  - `processing`: Gladia accepted audio stream, assigned `gladia_id`, and registered webhook callback URL.
  - `completed`: Gladia webhook or self-healing fallback downloaded transcript, cleaned cue text, saved to R2, and updated `video_languages`.
  - `failed`: Gladia rejected audio or reported transcription error. Triggered `atomicFailAndRefundAiJob` to refund diamonds idempotently.
- **Zombie Auto-Expiry**: Queries for active jobs (`getActiveAiJob`) automatically disregard entries older than 15 minutes, ensuring stale isolate crashes never permanently lock a video from being retried.

### 2.6. Table: `leaderboard` (`db/add-leaderboard.sql`)
Stores global learner rankings, levels, streaks, and experience points (XP):
```sql
CREATE TABLE IF NOT EXISTS leaderboard (
    user_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    avatar TEXT,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    streak INTEGER DEFAULT 0,
    badges_count INTEGER DEFAULT 0,
    target_lang TEXT,
    country TEXT,
    updated_at INTEGER DEFAULT (strftime('%s', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_leaderboard_xp ON leaderboard(xp DESC);
CREATE INDEX IF NOT EXISTS idx_leaderboard_lang_xp ON leaderboard(target_lang, xp DESC);
CREATE INDEX IF NOT EXISTS idx_leaderboard_updated ON leaderboard(updated_at);
```
- **Compound Indexing**: `idx_leaderboard_lang_xp` allows lightning-fast filtered leaderboard queries by language without full table scans.
- **Monotonic Progression**: Updates use `MAX(leaderboard.xp, excluded.xp)` to guarantee XP never decreases during concurrent synchronization.
- **Client Cache**: Synchronized to LocalStorage key `linguatube_leaderboard_cache` with simulated offline fallback ranks.

---

## 3. Cloudflare R2 Object Store Layout

Bucket binding: `TRANSCRIPT_STORAGE` (`linguatube-transcripts`)

### 3.1. Transcript Object Format
- **Key**: `transcripts/{videoId}/{lang}.json`
- **Content-Type**: `application/json`
- **JSON Structure (Pre-Baked Rich Subtitles)**:
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
        "text": "思い出した！",
        "tokens": [
          {
            "surface": "思い出した",
            "baseForm": "思い出す",
            "reading": "おもいだした",
            "rubyParts": [
              { "text": "思", "reading": "おも" },
              { "text": "い" },
              { "text": "出", "reading": "だ" },
              { "text": "した" }
            ],
            "romanization": "omoidashita",
            "hasKanji": true
          }
        ]
      }
    ]
  }
  ```

### 3.2. Dual Subtitle Translation Object Format
- **Key**: `translations/{videoId}/{sourceLang}_{targetLang}.json`
- **Incremental Segment Merging**: When clients persist translations (`POST /api/dual-subtitles` with `saveOnly: true`), the backend (`translation-cache.js`) merges incoming segment translations into the existing R2 translation object instead of overwriting. Existing translated cues are preserved, newly translated cues are added or updated, and metadata (`translatedCount`, `totalCues`, `quality`) is dynamically recalculated.
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

| Key Pattern | Value Type | TTL | Purpose & Quota Optimization |
| :--- | :--- | :--- | :--- |
| `ratelimit:{prefix}:{clientId}` | JSON `{ count, resetAt }` | Dynamic (window) | Distributed rate limiting (Smart sync: only at $\ge 50\%$, $\ge 80\%$, or `!allowed`) |
| `trbatch:v1:{source}:{target}:{hash}` | JSON `{ translations: string[] }` | 7 Days | Read fallback (New batches use in-memory `memBatchCache` + R2 write-back) |
| `batch_tokens:{lang}:{videoId}` | JSON `{ tokens: Token[][] }` | 30 Days | Video batch tokens (1 write per video; micro/single tokens use zero KV writes) |
| `dict:v4:{from}:{to}:{word}` | JSON `DictionaryEntry[]` | 7 Days | Read fallback (New lookups cached via Cloudflare Edge CDN `s-maxage=604800` + RAM with zero KV writes) |
| `keys:cooldown:{provider}:{key}` | String `timestamp` | 5 Minutes | API key cooldown (with in-memory `memKeyCooldowns` for zero KV reads on healthy state) |
| `order:{orderCode}` | JSON `{ orderCode, userId, planId, tier, amount, status }` | 15 Minutes | Pending payOS VietQR order metadata |
| `order_processed:{orderCode}` | String `'1'` | 30 Days | Webhook processing idempotency guard |

> **KV Quota Optimization Invariant (Rule 2)**: Cloudflare KV free tier limits write operations to **1,000 writes/day**. Video metadata (`video-info`) and difficulty levels (`levels`) are stored exclusively in **Cloudflare D1** (100,000 writes/day) rather than KV. Full dual-subtitle transcripts are persisted to **Cloudflare R2** (unlimited writes/reads). Dictionary lookups are cached at the **Cloudflare Edge CDN** and in-memory, completely bypassing KV writes. Normal rate-limiting checks operate in-memory and generate zero KV writes unless a client approaches their quota limit. API key rotator uses in-memory cooldown maps to eliminate redundant KV reads on every video load.

---

## 5. Supabase Database Schemas, RLS & Server Functions

Hosted at `https://edbkvzviqeulwzcnrrlb.supabase.co` (PostgreSQL with Supabase Auth / GoTrue). Migration SQL scripts reside in `db/migrations/` (e.g. `db/migrations/20260918_leaderboard_video_levels_orders.sql`).

### 5.1. Table: `public.profiles`
Extends `auth.users` with application-specific learning profile and subscription tier data:
```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'premium')),
  subscription_expires TIMESTAMPTZ,
  diamonds INTEGER DEFAULT 10,
  diamonds_updated_at TIMESTAMPTZ DEFAULT NOW(),
  target_lang TEXT,
  country TEXT,
  legacy_pb_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 5.2. Table: `public.legacy_pb_users`
Maintains historical user mappings, subscription states, and initial diamond balances migrated from PocketBase:
```sql
CREATE TABLE public.legacy_pb_users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  subscription_tier TEXT DEFAULT 'free',
  diamonds INTEGER DEFAULT 10,
  migrated_at TIMESTAMPTZ DEFAULT NOW(),
  claimed_at TIMESTAMPTZ,
  claimed_by UUID REFERENCES auth.users(id)
);
```

### 5.3. Table: `public.vocabulary`
Synchronized vocabulary notebook with SM-2 Spaced Repetition System (SRS) metrics:
```sql
CREATE TABLE public.vocabulary (
  id TEXT PRIMARY KEY, -- Deterministic base64 hash or 15-char alphanumeric key
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  word TEXT NOT NULL,
  reading TEXT,
  pinyin TEXT,
  romanization TEXT,
  meaning TEXT,
  language TEXT NOT NULL CHECK (language IN ('ja', 'zh', 'ko', 'en')),
  level TEXT DEFAULT 'new' CHECK (level IN ('new', 'learning', 'known', 'ignored')),
  examples JSONB DEFAULT '[]'::jsonb,
  srs_interval INTEGER DEFAULT 0,
  srs_repetition INTEGER DEFAULT 0,
  srs_ease_factor REAL DEFAULT 2.5,
  srs_next_review_at TIMESTAMPTZ,
  srs_last_reviewed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 5.4. Table: `public.streaks`
Gamified daily learning continuity and streak freeze inventories:
```sql
CREATE TABLE public.streaks (
  id TEXT PRIMARY KEY, -- Deterministic 15-char key or UUID
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  freezes_remaining INTEGER DEFAULT 2,
  last_activity TIMESTAMPTZ,
  last_freeze_used TIMESTAMPTZ,
  activity_log JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 5.5. Table: `public.history`
Synchronized video watch progress, favorite status, and history timestamps:
```sql
CREATE TABLE public.history (
  id TEXT PRIMARY KEY, -- Deterministic generateDeterministicRecordId('hist', userId, videoId)
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  video_id TEXT NOT NULL,
  title TEXT NOT NULL,
  thumbnail TEXT,
  channel TEXT,
  duration INTEGER DEFAULT 0,
  language TEXT NOT NULL,
  languages JSONB DEFAULT '[]'::jsonb,
  progress REAL DEFAULT 0,
  is_favorite BOOLEAN DEFAULT FALSE,
  watched_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 5.6. Table: `public.playlists` & `public.playlist_saves`
Community and user playlists with visibility controls:
```sql
CREATE TABLE public.playlists (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  visibility TEXT DEFAULT 'private' CHECK (visibility IN ('public', 'unlisted', 'private')),
  language TEXT DEFAULT 'all',
  tags JSONB DEFAULT '[]'::jsonb,
  video_ids JSONB DEFAULT '[]'::jsonb,
  video_count INTEGER DEFAULT 0,
  thumbnail TEXT,
  save_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.playlist_saves (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  playlist_id TEXT NOT NULL REFERENCES public.playlists(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, playlist_id)
);
```

### 5.7. Table: `public.gamification`
XP leaderboard points, levels, and unlocked achievement badges:
```sql
CREATE TABLE public.gamification (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  total_videos_watched INTEGER DEFAULT 0,
  total_quizzes_completed INTEGER DEFAULT 0,
  unlocked_achievements JSONB DEFAULT '{}'::jsonb,
  notified_achievements JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 5.8. Table: `public.video_levels` (`db/migrations/20260918_leaderboard_video_levels_orders.sql`)
Crowdsourced and linguistic-derived CEFR / JLPT / HSK / TOPIK difficulty ratings per video:
```sql
CREATE TABLE public.video_levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id TEXT NOT NULL,
  language TEXT NOT NULL,
  level TEXT NOT NULL,
  confidence REAL DEFAULT 0.8,
  method TEXT DEFAULT 'linguistics',
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_video_levels_vid_lang ON public.video_levels(video_id, language);
```

### 5.9. Table: `public.orders` (`db/migrations/20260918_leaderboard_video_levels_orders.sql`)
payOS VietQR order checkout links, payment status, and idempotency tracking:
```sql
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_code BIGINT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL,
  tier TEXT NOT NULL,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  payment_link_id TEXT,
  checkout_url TEXT,
  qr_code TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_order_code ON public.orders(order_code);
```

### 5.10. Row Level Security (RLS) Policies
All 10 public tables enforce strict RLS:
- **Private Data (`vocabulary`, `streaks`, `history`, `gamification`, `orders`)**: Authenticated users can only `SELECT`, `INSERT`, `UPDATE`, and `DELETE` rows where `user_id = auth.uid()`. Direct writes to `gamification` are guarded by trigger against artificial XP inflation. Direct reads on `orders` are restricted to the owner (`(SELECT auth.uid()) = user_id`).
- **User Profiles (`profiles`)**: Users can read their own profile (`id = auth.uid()`) and update basic cosmetic fields (`display_name`, `avatar_url`, `target_lang`, `country`). Sensitive columns (`subscription_tier`, `diamonds`, `email`) are locked down by `protect_profile_fields()`. Cloudflare Pages edge functions use the `SUPABASE_SERVICE_ROLE_KEY` to update diamond balances and subscription tiers.
- **Playlists (`playlists`)**: Public and unlisted playlists (`visibility IN ('published', 'unlisted')`) are readable by anyone. Private playlists are restricted to `user_id = auth.uid()`. Client modification of `is_featured` and `save_count` is blocked by server triggers.
- **Playlist Saves (`playlist_saves`)**: Users can only manage their own bookmarks (`user_id = auth.uid()`). Bookmark counters are synchronized server-side.
- **Video Levels (`video_levels`)**: Readable by all users (`anon` and `authenticated`) for community difficulty browsing (`video_levels_select` policy). Authenticated users can submit difficulty evaluations (`(SELECT auth.uid()) = user_id`).
- **Legacy PB Users (`legacy_pb_users`)**: RLS enabled with zero public policies. Accessible strictly via `service_role` and internal security triggers.

### 5.11. Server-Side Triggers & Stored Procedures

#### Trigger: `on_auth_user_created` & `on_auth_user_email_confirmed` (`handle_new_user()`)
Automatically provisions a `profiles` record when a user registers via Google OAuth or Email. To strictly prevent pre-authentication account takeover of legacy records:
- Only links and restores legacy PB data (tier, diamonds) if the email is confirmed (`NEW.email_confirmed_at IS NOT NULL`) or authenticated via a verified OAuth provider (`google`, `apple`, `github`).
- Unconfirmed signups receive default free accounts with 10 diamonds. Once email confirmation occurs, `on_auth_user_email_confirmed` updates the profile and links the legacy account.
- Marks `claimed_at = NOW()` and `claimed_by = NEW.id` in `legacy_pb_users` to prevent replay.

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  v_legacy public.legacy_pb_users%ROWTYPE;
  v_provider text;
  v_is_email_confirmed boolean;
BEGIN
  v_provider := COALESCE(new.raw_app_meta_data->>'provider', 'email');
  v_is_email_confirmed := (new.email_confirmed_at IS NOT NULL) OR (v_provider IN ('google', 'apple', 'github'));

  IF v_is_email_confirmed THEN
    SELECT * INTO v_legacy FROM public.legacy_pb_users
    WHERE email = new.email AND claimed_at IS NULL
    LIMIT 1;
  END IF;

  INSERT INTO public.profiles (
    id, email, display_name, avatar_url,
    subscription_tier, diamonds, legacy_pb_id
  ) VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture'),
    COALESCE(v_legacy.subscription_tier, 'free'),
    COALESCE(v_legacy.diamonds, 10),
    v_legacy.id
  ) ON CONFLICT (id) DO UPDATE SET
    subscription_tier = COALESCE(EXCLUDED.subscription_tier, profiles.subscription_tier),
    diamonds = GREATEST(profiles.diamonds, EXCLUDED.diamonds),
    legacy_pb_id = COALESCE(EXCLUDED.legacy_pb_id, profiles.legacy_pb_id);

  IF v_legacy.id IS NOT NULL THEN
    UPDATE public.legacy_pb_users
    SET claimed_at = NOW(), claimed_by = new.id
    WHERE id = v_legacy.id;
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
```

#### Stored Procedure: `record_streak_activity(p_user_id, p_activity_date)`
Atomic, thread-safe daily streak evaluator called via Supabase RPC (`supabase.rpc('record_streak_activity', ...)`):
- Employs `SELECT ... FOR UPDATE` row-level lock on `public.streaks` to guarantee thread safety and eliminate race conditions under concurrent client requests.
- Identifies consecutive practice days, missed days, and freezes.
- Automatically consumes freeze items if available when a single day is missed.
- Awards milestone freeze items (at 7, 30, and 100-day streaks).
- Returns the updated `current_streak`, `longest_streak`, `freezes_remaining`, and `awarded_freeze`.

#### Stored Procedures: `consume_user_diamonds` & `refund_user_diamonds`
Atomic credit deduction and refund procedures called by Cloudflare Pages Functions (`diamond.service.js`):
- Executes `SELECT diamonds FROM public.profiles WHERE id = target_user_id FOR UPDATE` to serialize concurrent requests and eliminate race conditions or double-spending.
- `consume_user_diamonds(target_user_id, diamond_count)`: Verifies `current_diamonds >= diamond_count`. If sufficient, decrements `diamonds`, records `diamonds_updated_at = NOW()`, and returns `{ success: true, remaining: ... }`. If insufficient, returns `{ success: false, remaining: ... }` fail-closed.
- `refund_user_diamonds(target_user_id, diamond_count)`: Increments `diamonds`, records `diamonds_updated_at = NOW()`, and returns `{ success: true, remaining: ... }`.

#### Stored Procedure: `get_leaderboard(p_lang, p_period, p_limit)` (`db/migrations/20260918_leaderboard_video_levels_orders.sql`)
High-performance dynamic leaderboard query executing directly inside Supabase PostgreSQL:
- Combines `public.profiles`, `public.gamification`, and `public.streaks` in a single query.
- Computes window ranking `ROW_NUMBER() OVER (...)` dynamically based on `p_period` (`'weekly'` vs `'all_time'`), eliminating D1 schema mismatch and duplicate storage overhead.
- Dynamically counts unlocked achievement badges from JSONB.
- Callable by public and authenticated roles: `GRANT EXECUTE ON FUNCTION public.get_leaderboard(text, text, int) TO anon, authenticated;`.
- Integrated directly by `LeaderboardService` via `supabase.client.rpc('get_leaderboard', ...)`.


#### Trigger: `tr_protect_profile_fields` (`protect_profile_fields()`)
Enforces server-side integrity on `public.profiles`. Prevents authenticated client sessions from tampering with sensitive columns via the Supabase REST API:
- Configured as `SECURITY INVOKER` with explicit `search_path = public`.
- Execution permissions revoked from `PUBLIC`, `anon`, and `authenticated` roles.
- Blocks direct client mutation of `email`, `subscription_tier`, `subscription_expires`, `diamonds`, `diamonds_updated_at`, `legacy_pb_id`, and `id`.
- Only `service_role` (used by Cloudflare Pages Functions and payment webhooks) or Postgres background jobs can modify subscription levels and diamond balances.
- Any unauthorized direct update raises a PostgreSQL exception: `Cannot modify subscription_tier directly from client`.

#### Trigger: `tr_protect_gamification_fields` (`protect_gamification_fields()`)
Server-authoritative guard on `public.gamification`:
- Forbids XP decrement (monotonically non-decreasing: `NEW.xp >= OLD.xp`).
- Caps maximum XP increase per single client mutation to $+5,000$ XP, preventing client-side console injection of millions of XP.
- Calculates canonical user level on the server (`1 + floor(sqrt(NEW.xp / 100))`), discarding any forged client-sent `level`.

#### Trigger: `tr_protect_playlist_fields` & `tr_sync_playlist_save_count`
- `protect_playlist_fields()` prevents authenticated users from toggling administrative flags (`is_featured`) or forging `save_count`.
- `sync_playlist_save_count()` automatically increments/decrements `playlists.save_count` when users bookmark or unbookmark playlists via `playlist_saves`.

### 5.10. PostgreSQL Scheduled Repeat Jobs (`pg_cron`)
The Supabase instance utilizes the `pg_cron` extension to manage automated server-side background tasks without requiring 24/7 external polling workers:

| Job Name | Schedule | Purpose | Command |
| :--- | :--- | :--- | :--- |
| `downgrade-expired-subscriptions` | `5 * * * *` (Hourly) | Automatically downgrades expired Pro/Premium accounts to `free` in `public.profiles`. | `UPDATE public.profiles SET subscription_tier = 'free', updated_at = NOW() WHERE subscription_expires IS NOT NULL AND subscription_expires < NOW() AND subscription_tier != 'free';` |
| `reset-weekly-leaderboard-xp` | `0 0 * * 1` (Mondays 00:00 UTC) | Resets `weekly_xp = 0` and advances `current_week_key` across all users simultaneously for fair global rankings. | `UPDATE public.gamification SET weekly_xp = 0, current_week_key = to_char(now(), 'IYYY-"W"IW'), updated_at = NOW();` |
| `evaluate-inactive-streaks` | `0 1 * * *` (Daily 01:00 UTC) | Resets `current_streak = 0` for users who have been inactive for $>2$ days with 0 freezes remaining. | `UPDATE public.streaks SET current_streak = 0, updated_at = NOW() WHERE last_activity IS NOT NULL AND (CURRENT_DATE - (last_activity AT TIME ZONE 'UTC')::date) > 2 AND freezes_remaining = 0 AND current_streak > 0;` |

---

## 6. Client-Side Persistent Storage

### 6.1. IndexedDB: `TranscriptCacheService`
- **Database Name**: `lingua-tube-cache`
- **Version**: `2`
- **Store Name**: `transcripts`
- **Key Path**: `key` (Formatted as `${videoId}:${lang}` for monolingual transcripts, or `${videoId}:dual:${sourceLang}-${targetLang}` for bilingual dual subtitles)
- **Indexes**: `expiresAt` (non-unique)
- **TTL**: 7 days (`7 * 24 * 60 * 60 * 1000` ms).
- **Dual Subtitles Caching**:
  - `getDual(videoId, src, tgt)`: Returns cached bilingual dual subtitles instantly with 0ms latency and zero network overhead.
  - `setDual(videoId, src, tgt, dualSubtitles)`: Writes assembled or server-fetched dual subtitles directly to IndexedDB.
- **Pruning & Cleanliness**:
  - Automatic expiration check on read.
  - Automatically evicts stale dev mock transcript entries when opening real YouTube videos.

### 6.2. LocalStorage Key Registry

| Key | Service / Repository | Type / Schema | Purpose |
| :--- | :--- | :--- | :--- |
| `linguatube_vocabulary` | `OfflineVocabularyRepository` | `VocabularyItem[]` | Offline vocabulary notebook items |
| `linguatube_deleted_vocab_tombstones` | `OfflineVocabularyRepository` | `Record<string, number>` | Remote sync deletion tombstones (ID -> timestamp, retained for 30-day TTL) |
| `linguatube_synced_remote_ids` | `OfflineVocabularyRepository` | `Record<string, boolean>` | Tracks synchronized remote IDs to detect multi-device deletions without zombie resurrection |
| `linguatube_playlists` | `OfflinePlaylistRepository` | `Playlist[]` | User-created and bookmarked playlists |
| `linguatube_deleted_playlist_ids` | `OfflinePlaylistRepository` | `string[]` | Deletion tombstones for syncing playlist removals |
| `linguatube_history` | `OfflineHistoryRepository` | `HistoryEntry[]` | Video watch progress and timestamps |
| `linguatube_deleted_history_ids` | `OfflineHistoryRepository` | `string[]` | Deletion tombstones for syncing history removals |
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
| `voca_gamification_dirty` | `OfflineGamificationRepository` | `boolean` | Flag indicating unpushed local gamification state to sync on reconnect/logout |
| `voca_pending_streak_dates` | `OfflineStreakRepository` | `string[]` | Queue of offline activity dates waiting to sync with Supabase |
| `voca_video_levels_cache` | `VideoLevelService` | `Record<string, VideoLevel>` | Debounced local cache of video CEFR/JLPT difficulty levels |
| `sb-edbkvzviqeulwzcnrrlb-auth-token` | `SupabaseService` | `{ access_token, refresh_token, user }` | Supabase GoTrue authentication session and JWT |

### 6.3. Storage Quota Eviction Policy (`StorageService`)
When client-side `localStorage` approaches browser quota thresholds and throws a `QuotaExceededError`:
- **Automated Eviction (`handleQuotaExceeded`)**: `StorageService` catches the exception and purges transient caches in order of priority:
  1. `linguatube_dict_cache` (temporary dictionary lookup cache)
  2. `linguatube_tokens` (pre-parsed subtitle word segmentations)
  3. `lingvatranslate_cache` / `linguatube_translations` (cached UI and batch translations)
  4. Scoped search histories (`linguatube_recent_searches_*`)
- **Write Retry**: Following non-critical cache purging, the original write operation is retried seamlessly without throwing unhandled exceptions to the UI layer. Essential user entities (`vocabulary`, `playlists`, `history`, `streaks`, `settings`) are never purged.

-- Migration: Add video_languages and no_transcript_cache tables
-- Run with: npx wrangler d1 execute linguatube-vocab --file=db/add-video-languages.sql --remote
--
-- Two-tier caching for video language discovery:
-- - video_languages: Persistent cache of video metadata (available languages, duration, title)
-- - no_transcript_cache: Negative cache for videos without transcripts in specific languages

-- Video language metadata (persists across KV expiration)
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

-- Negative cache for transcript availability
-- Tracks "we tried to fetch X language for video Y and it didn't exist"
CREATE TABLE IF NOT EXISTS no_transcript_cache (
    video_id TEXT NOT NULL,
    language TEXT NOT NULL,
    source TEXT NOT NULL,  -- 'youtube' or 'ai'
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    PRIMARY KEY (video_id, language, source)
);

CREATE INDEX IF NOT EXISTS idx_no_transcript_video ON no_transcript_cache(video_id);
CREATE INDEX IF NOT EXISTS idx_no_transcript_created ON no_transcript_cache(created_at);

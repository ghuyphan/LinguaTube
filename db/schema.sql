-- D1 Database Schema for LinguaTube Vocabulary Sync
-- Run this to initialize your D1 database

CREATE TABLE IF NOT EXISTS vocabulary (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  word TEXT NOT NULL,
  reading TEXT,
  pinyin TEXT,
  romanization TEXT,
  meaning TEXT NOT NULL,
  language TEXT NOT NULL,
  level TEXT DEFAULT 'new',
  examples TEXT,
  added_at INTEGER,
  updated_at INTEGER,
  UNIQUE(user_id, word, language)
);

CREATE INDEX IF NOT EXISTS idx_user ON vocabulary(user_id);
CREATE INDEX IF NOT EXISTS idx_language ON vocabulary(user_id, language);
CREATE INDEX IF NOT EXISTS idx_updated ON vocabulary(user_id, updated_at);

-- Transcripts table for permanent storage of AI-generated and YouTube transcripts
CREATE TABLE IF NOT EXISTS transcripts (
  video_id TEXT NOT NULL,
  language TEXT NOT NULL,
  source TEXT NOT NULL,  -- 'youtube' or 'ai'
  segments TEXT,  -- JSON array of {start, duration, text}, NULL if pending
  status TEXT DEFAULT 'complete',  -- 'pending' or 'complete'
  gladia_result_url TEXT,  -- Gladia polling URL for pending jobs
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  PRIMARY KEY (video_id, language)
);

CREATE INDEX IF NOT EXISTS idx_transcript_video ON transcripts(video_id);

-- video_meta table for tracking available languages & sources per video
CREATE TABLE IF NOT EXISTS video_meta (
  video_id TEXT NOT NULL,
  language TEXT NOT NULL,
  source TEXT NOT NULL,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  PRIMARY KEY (video_id, language)
);

CREATE INDEX IF NOT EXISTS idx_video_meta_video ON video_meta(video_id);

-- pending_jobs table for active Gladia AI transcription background jobs
CREATE TABLE IF NOT EXISTS pending_jobs (
  video_id TEXT NOT NULL,
  language TEXT NOT NULL,
  result_url TEXT NOT NULL,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  PRIMARY KEY (video_id, language)
);

CREATE INDEX IF NOT EXISTS idx_pending_jobs_created ON pending_jobs(created_at);

-- translation_meta table for dual-subtitles batch caching
CREATE TABLE IF NOT EXISTS translation_meta (
  video_id TEXT NOT NULL,
  source_lang TEXT NOT NULL,
  target_lang TEXT NOT NULL,
  segment_count INTEGER DEFAULT 0,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  PRIMARY KEY (video_id, source_lang, target_lang)
);

-- video_languages table for persistent language discovery
CREATE TABLE IF NOT EXISTS video_languages (
  video_id TEXT PRIMARY KEY,
  available_languages TEXT NOT NULL,
  has_auto_captions INTEGER DEFAULT 0,
  duration_seconds INTEGER,
  title TEXT,
  channel TEXT,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_video_languages_updated ON video_languages(updated_at);

-- no_transcript_cache table for negative caching
CREATE TABLE IF NOT EXISTS no_transcript_cache (
  video_id TEXT NOT NULL,
  language TEXT NOT NULL,
  source TEXT NOT NULL,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  PRIMARY KEY (video_id, language, source)
);

CREATE INDEX IF NOT EXISTS idx_no_transcript_video ON no_transcript_cache(video_id);
CREATE INDEX IF NOT EXISTS idx_no_transcript_created ON no_transcript_cache(created_at);

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

-- pending_jobs table for active Gladia AI transcription background jobs (legacy)
CREATE TABLE IF NOT EXISTS pending_jobs (
  video_id TEXT NOT NULL,
  language TEXT NOT NULL,
  result_url TEXT NOT NULL,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  PRIMARY KEY (video_id, language)
);

CREATE INDEX IF NOT EXISTS idx_pending_jobs_created ON pending_jobs(created_at);

-- ai_transcription_jobs table for resilient asynchronous lifecycle tracking
CREATE TABLE IF NOT EXISTS ai_transcription_jobs (
  id TEXT PRIMARY KEY,
  video_id TEXT NOT NULL,
  language TEXT NOT NULL,
  detected_language TEXT,
  user_id TEXT,
  client_id TEXT NOT NULL,
  user_tier TEXT NOT NULL DEFAULT 'free',
  diamonds_charged INTEGER NOT NULL DEFAULT 1,
  diamonds_refunded INTEGER NOT NULL DEFAULT 0,
  gladia_job_id TEXT,
  status TEXT NOT NULL DEFAULT 'queued',
  error_code TEXT,
  error_message TEXT,
  attempts INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
  completed_at INTEGER
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_ai_jobs_active_unique 
  ON ai_transcription_jobs(video_id, language) 
  WHERE status IN ('queued', 'processing');

CREATE INDEX IF NOT EXISTS idx_ai_jobs_video_status ON ai_transcription_jobs(video_id, status);
CREATE INDEX IF NOT EXISTS idx_ai_jobs_gladia_id ON ai_transcription_jobs(gladia_job_id);
CREATE INDEX IF NOT EXISTS idx_ai_jobs_client_created ON ai_transcription_jobs(client_id, created_at);
CREATE INDEX IF NOT EXISTS idx_ai_jobs_stale ON ai_transcription_jobs(status, created_at) WHERE status IN ('queued', 'processing');

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
  sub_languages TEXT DEFAULT '[]',
  has_auto_captions INTEGER DEFAULT 0,
  duration_seconds INTEGER,
  title TEXT,
  channel TEXT,
  channel_avatar TEXT,
  levels TEXT DEFAULT '{}',
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_video_languages_updated ON video_languages(updated_at);
CREATE INDEX IF NOT EXISTS idx_video_languages_sub ON video_languages(sub_languages);


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

-- leaderboard table for global learner rankings
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



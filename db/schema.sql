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
  segments TEXT NOT NULL,  -- JSON array of {start, duration, text}
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  PRIMARY KEY (video_id, language)
);

CREATE INDEX IF NOT EXISTS idx_transcript_video ON transcripts(video_id);

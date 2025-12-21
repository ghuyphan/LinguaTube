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

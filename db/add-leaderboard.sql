-- Migration: add-leaderboard.sql
-- Creates global leaderboard table for learner rankings

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

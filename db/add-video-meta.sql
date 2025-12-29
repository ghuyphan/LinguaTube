-- Migration: Add video_meta table for tracking available languages
-- Run this against your D1 database

CREATE TABLE IF NOT EXISTS video_meta (
  video_id TEXT PRIMARY KEY,
  available_langs TEXT,  -- comma-separated: "en,ja,zh"
  created_at INTEGER DEFAULT (strftime('%s', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_video_meta_video ON video_meta(video_id);

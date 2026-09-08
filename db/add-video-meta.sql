-- Migration: Add video_meta table for tracking available languages & sources per video
-- Run this against your D1 database

CREATE TABLE IF NOT EXISTS video_meta (
  video_id TEXT NOT NULL,
  language TEXT NOT NULL,
  source TEXT NOT NULL,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  PRIMARY KEY (video_id, language)
);

CREATE INDEX IF NOT EXISTS idx_video_meta_video ON video_meta(video_id);

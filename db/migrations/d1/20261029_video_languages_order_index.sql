-- D1 Migration: Index for deterministic recommended videos ordering
-- Matches: ORDER BY COALESCE(updated_at, 0) DESC, video_id ASC
-- Prevents full table scan file sorts in SQLite/D1.

CREATE INDEX IF NOT EXISTS idx_video_languages_order 
ON video_languages(updated_at DESC, video_id ASC);

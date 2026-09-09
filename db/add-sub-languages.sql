-- Migration: Add sub_languages column to video_languages table
-- Run with: npx wrangler d1 execute VOCAB_DB --remote --file=db/add-sub-languages.sql

ALTER TABLE video_languages ADD COLUMN sub_languages TEXT DEFAULT '[]';
CREATE INDEX IF NOT EXISTS idx_video_languages_sub ON video_languages(sub_languages);

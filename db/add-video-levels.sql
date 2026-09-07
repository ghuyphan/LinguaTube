-- Migration: Add levels column to video_languages table
-- Run with: npx wrangler d1 execute linguatube-vocab --file=db/add-video-levels.sql --remote
--
-- Stores JSON map of language -> level:
-- e.g. {"ja": "JLPT N4", "en": "CEFR B1", "zh": "HSK 2", "ko": "TOPIK 2"}

ALTER TABLE video_languages ADD COLUMN levels TEXT DEFAULT '{}';

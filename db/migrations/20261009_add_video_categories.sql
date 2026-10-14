-- ==============================================================================
-- Migration: 20261009_add_video_categories.sql
-- Description:
--   1. Adds 'category' column to video_languages (default 'general')
--   2. Adds 'tags' JSON column to video_languages (default '[]')
--   3. Adds covering indexes for category filtering & pagination
--   4. Performs retroactive deterministic backfill on existing catalog
-- ==============================================================================

-- 1. Add category and tags columns if they do not exist
ALTER TABLE video_languages ADD COLUMN category TEXT DEFAULT 'general';
ALTER TABLE video_languages ADD COLUMN tags TEXT DEFAULT '[]';

-- 2. Indexes for fast category discovery
CREATE INDEX IF NOT EXISTS idx_video_languages_category 
  ON video_languages(category);

CREATE INDEX IF NOT EXISTS idx_video_languages_cat_updated 
  ON video_languages(category, updated_at DESC);

-- 3. Deterministic backfill of existing catalog based on title, channel & known creators

-- Music
UPDATE video_languages
SET category = 'music'
WHERE (
    title LIKE '%MV%' OR title LIKE '%Music Video%' OR title LIKE '%Official Video%' OR 
    title LIKE '%Official Audio%' OR title LIKE '%歌ってみた%' OR title LIKE '%主題歌%' OR 
    title LIKE '%OST%' OR title LIKE '%Cover%' OR title LIKE '%音楽%' OR title LIKE '%노래%'
);

-- Anime & Drama
UPDATE video_languages
SET category = 'anime_drama'
WHERE category = 'general' AND (
    title LIKE '%アニメ%' OR title LIKE '%anime%' OR title LIKE '%進撃%' OR 
    title LIKE '%呪術%' OR title LIKE '%鬼滅%' OR title LIKE '%漫画%' OR 
    title LIKE '%動漫%' OR title LIKE '%애니%' OR title LIKE '%ドラマ%' OR 
    channel LIKE '%Animation%' OR channel LIKE '%Anime%' OR channel LIKE '%TOHO%'
);

-- News & Politics
UPDATE video_languages
SET category = 'news'
WHERE category = 'general' AND (
    title LIKE '%ニュース%' OR title LIKE '%News%' OR title LIKE '%報道%' OR 
    title LIKE '%新聞%' OR title LIKE '%뉴스%' OR 
    channel LIKE '%NHK%' OR channel LIKE '%ANN%' OR channel LIKE '%FNN%' OR 
    channel LIKE '%TBS%' OR channel LIKE '%日テレ%'
);

-- Conversation & Podcasts
UPDATE video_languages
SET category = 'conversation'
WHERE category = 'general' AND (
    title LIKE '%ポッドキャスト%' OR title LIKE '%Podcast%' OR title LIKE '%会話%' OR 
    title LIKE '%対談%' OR title LIKE '%インタビュー%' OR title LIKE '%雑談%' OR 
    title LIKE '%日常会話%' OR title LIKE '%대화%' OR title LIKE '%聊天%'
);

-- Vlog & Daily Life
UPDATE video_languages
SET category = 'vlog'
WHERE category = 'general' AND (
    title LIKE '%Vlog%' OR title LIKE '%vlog%' OR title LIKE '%日常%' OR 
    title LIKE '%ルーティン%' OR title LIKE '%一人暮らし%' OR title LIKE '%브이로그%'
);

-- Education & Lessons
UPDATE video_languages
SET category = 'education'
WHERE category = 'general' AND (
    title LIKE '%文法%' OR title LIKE '%単語%' OR title LIKE '%解説%' OR 
    title LIKE '%レッスン%' OR title LIKE '%Lesson%' OR title LIKE '%JLPT%' OR 
    title LIKE '%HSK%' OR title LIKE '%TOPIK%'
);

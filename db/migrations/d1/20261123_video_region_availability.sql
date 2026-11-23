-- NULL region_restriction means no known country restriction. A NULL check
-- time marks legacy rows pending verification; timestamps are milliseconds.
ALTER TABLE video_languages ADD COLUMN region_restriction TEXT;
ALTER TABLE video_languages ADD COLUMN region_checked_at INTEGER;
CREATE INDEX idx_video_languages_region_checked
    ON video_languages(region_checked_at, video_id)
    WHERE title IS NOT NULL;

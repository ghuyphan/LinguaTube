ALTER TABLE video_languages ADD COLUMN asset_generation INTEGER NOT NULL DEFAULT 0;
ALTER TABLE ai_transcription_jobs ADD COLUMN asset_generation INTEGER NOT NULL DEFAULT 0;

CREATE TABLE video_asset_retirements (
    video_id TEXT NOT NULL,
    generation INTEGER NOT NULL,
    blocked_at INTEGER NOT NULL,
    confirmed_at INTEGER,
    purged_at INTEGER,
    PRIMARY KEY (video_id, generation)
);
CREATE INDEX idx_video_asset_retirements_pending
    ON video_asset_retirements(blocked_at, video_id) WHERE purged_at IS NULL;
CREATE INDEX idx_video_blocked_recheck
    ON video_languages(region_checked_at, video_id) WHERE embed_blocked = 1;

CREATE TRIGGER trg_retire_blocked_video_assets
AFTER UPDATE OF embed_blocked ON video_languages
WHEN OLD.embed_blocked = 0 AND NEW.embed_blocked = 1
BEGIN
    INSERT OR IGNORE INTO video_asset_retirements(video_id, generation, blocked_at)
    VALUES(NEW.video_id, OLD.asset_generation, COALESCE(NEW.region_checked_at, unixepoch() * 1000));
    UPDATE video_languages SET asset_generation = OLD.asset_generation + 1,
        sub_languages = '[]', ai_languages = '[]' WHERE video_id = NEW.video_id;
END;

-- Previously delisted rows need independent confirmation before any purge.
INSERT INTO video_asset_retirements(video_id, generation, blocked_at)
SELECT video_id, asset_generation, unixepoch() * 1000 FROM video_languages WHERE embed_blocked = 1;
UPDATE video_languages SET asset_generation = 1, sub_languages = '[]', ai_languages = '[]' WHERE embed_blocked = 1;

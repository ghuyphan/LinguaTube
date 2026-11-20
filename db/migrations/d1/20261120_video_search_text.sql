ALTER TABLE video_languages ADD COLUMN search_title TEXT;
ALTER TABLE video_languages ADD COLUMN search_channel TEXT;
ALTER TABLE video_languages ADD COLUMN search_tags TEXT;

-- Only pending, searchable metadata participates in the maintenance scan.
CREATE INDEX idx_video_languages_search_pending ON video_languages (video_id)
WHERE search_title IS NULL AND TRIM(title) <> '' AND TRIM(channel) <> '';

CREATE TRIGGER trg_video_languages_search_text
AFTER UPDATE OF title, channel, tags ON video_languages
WHEN OLD.search_title IS NOT NULL AND (
  OLD.title IS NOT NEW.title OR OLD.channel IS NOT NEW.channel OR OLD.tags IS NOT NEW.tags
)
BEGIN
  UPDATE video_languages
  SET search_title = NULL, search_channel = NULL, search_tags = NULL
  WHERE video_id = NEW.video_id;
END;

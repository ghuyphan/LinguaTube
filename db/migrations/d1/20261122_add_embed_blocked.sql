-- Track YouTube embed-blocked / unplayable videos so they are automatically
-- excluded from video_language_catalog and recommendation feeds.

ALTER TABLE video_languages ADD COLUMN embed_blocked INTEGER NOT NULL DEFAULT 0;
ALTER TABLE video_languages ADD COLUMN embed_blocked_reason TEXT;

-- Recreate catalog triggers so embed_blocked = 1 rows are never indexed
-- and marking an existing video embed_blocked = 1 immediately removes it.

DROP TRIGGER IF EXISTS trg_vl_catalog_insert;
CREATE TRIGGER trg_vl_catalog_insert
AFTER INSERT ON video_languages
WHEN COALESCE(NEW.embed_blocked, 0) = 0
BEGIN
  INSERT OR REPLACE INTO video_language_catalog (language, video_id, category, updated_at)
  SELECT
    lower(substr(trim(j.value), 1, CASE WHEN instr(trim(j.value), '-') > 0 THEN instr(trim(j.value), '-') - 1 ELSE length(trim(j.value)) END)),
    NEW.video_id,
    COALESCE(NULLIF(NEW.category, ''), 'general'),
    COALESCE(NEW.updated_at, 0)
  FROM json_each(
    CASE
      WHEN NEW.sub_languages IS NOT NULL AND json_valid(NEW.sub_languages) = 1 AND json_type(NEW.sub_languages) = 'array' AND NEW.sub_languages != '[]'
        THEN NEW.sub_languages
      WHEN NEW.available_languages IS NOT NULL AND json_valid(NEW.available_languages) = 1 AND json_type(NEW.available_languages) = 'array'
        THEN NEW.available_languages
      ELSE '[]'
    END
  ) AS j
  WHERE typeof(j.value) = 'text' AND length(trim(j.value)) > 0;
END;

DROP TRIGGER IF EXISTS trg_vl_catalog_update;
CREATE TRIGGER trg_vl_catalog_update
AFTER UPDATE OF sub_languages, available_languages, category, updated_at, embed_blocked ON video_languages
BEGIN
  DELETE FROM video_language_catalog WHERE video_id = OLD.video_id;
  INSERT OR REPLACE INTO video_language_catalog (language, video_id, category, updated_at)
  SELECT
    lower(substr(trim(j.value), 1, CASE WHEN instr(trim(j.value), '-') > 0 THEN instr(trim(j.value), '-') - 1 ELSE length(trim(j.value)) END)),
    NEW.video_id,
    COALESCE(NULLIF(NEW.category, ''), 'general'),
    COALESCE(NEW.updated_at, 0)
  FROM json_each(
    CASE
      WHEN NEW.sub_languages IS NOT NULL AND json_valid(NEW.sub_languages) = 1 AND json_type(NEW.sub_languages) = 'array' AND NEW.sub_languages != '[]'
        THEN NEW.sub_languages
      WHEN NEW.available_languages IS NOT NULL AND json_valid(NEW.available_languages) = 1 AND json_type(NEW.available_languages) = 'array'
        THEN NEW.available_languages
      ELSE '[]'
    END
  ) AS j
  WHERE COALESCE(NEW.embed_blocked, 0) = 0
    AND typeof(j.value) = 'text' AND length(trim(j.value)) > 0;
END;

-- Normalized language catalog index and FTS5 search index for video_languages.
-- Eliminates full-table leading-wildcard LIKE '%lang%' and LIKE '%query%' scans.

CREATE TABLE IF NOT EXISTS video_language_catalog (
  language TEXT NOT NULL,
  video_id TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  updated_at INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (language, video_id)
) WITHOUT ROWID;

CREATE INDEX IF NOT EXISTS idx_vlc_lang_updated
  ON video_language_catalog (language, updated_at DESC, video_id ASC);

CREATE INDEX IF NOT EXISTS idx_vlc_lang_cat_updated
  ON video_language_catalog (language, category, updated_at DESC, video_id ASC);

DROP TRIGGER IF EXISTS trg_vl_catalog_insert;
CREATE TRIGGER trg_vl_catalog_insert
AFTER INSERT ON video_languages
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
AFTER UPDATE OF sub_languages, available_languages, category, updated_at ON video_languages
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
  WHERE typeof(j.value) = 'text' AND length(trim(j.value)) > 0;
END;

DROP TRIGGER IF EXISTS trg_vl_catalog_delete;
CREATE TRIGGER trg_vl_catalog_delete
AFTER DELETE ON video_languages
BEGIN
  DELETE FROM video_language_catalog WHERE video_id = OLD.video_id;
END;

-- Backfill existing rows idempotently.
DELETE FROM video_language_catalog;
INSERT OR REPLACE INTO video_language_catalog (language, video_id, category, updated_at)
SELECT
  lower(substr(trim(j.value), 1, CASE WHEN instr(trim(j.value), '-') > 0 THEN instr(trim(j.value), '-') - 1 ELSE length(trim(j.value)) END)),
  v.video_id,
  COALESCE(NULLIF(v.category, ''), 'general'),
  COALESCE(v.updated_at, 0)
FROM video_languages v,
json_each(
  CASE
    WHEN v.sub_languages IS NOT NULL AND json_valid(v.sub_languages) = 1 AND json_type(v.sub_languages) = 'array' AND v.sub_languages != '[]'
      THEN v.sub_languages
    WHEN v.available_languages IS NOT NULL AND json_valid(v.available_languages) = 1 AND json_type(v.available_languages) = 'array'
      THEN v.available_languages
    ELSE '[]'
  END
) AS j
WHERE typeof(j.value) = 'text' AND length(trim(j.value)) > 0;

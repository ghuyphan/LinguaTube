-- Extend server-owned official metadata; existing duration evidence remains valid.
ALTER TABLE verified_video_metadata ADD COLUMN snippet_json TEXT;
ALTER TABLE video_languages ADD COLUMN metadata_source TEXT;
ALTER TABLE video_languages ADD COLUMN metadata_observed_at INTEGER;
ALTER TABLE video_languages ADD COLUMN category_source TEXT;
-- Historical explicit edits cannot be distinguished from inferred categories.
-- Preserve existing non-general categories conservatively until explicitly edited.
UPDATE video_languages SET category_source='legacy' WHERE category IS NOT NULL AND category <> 'general';

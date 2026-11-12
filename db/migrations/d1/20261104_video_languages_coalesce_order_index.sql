-- Preserve NULL-as-zero cursor semantics while indexing the actual sort expression.
CREATE INDEX IF NOT EXISTS idx_video_languages_coalesce_order
ON video_languages(COALESCE(updated_at, 0) DESC, video_id ASC);

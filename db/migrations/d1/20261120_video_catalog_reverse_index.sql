-- Catalog maintenance triggers locate the old rows by video ID alone.
CREATE INDEX IF NOT EXISTS idx_vlc_video_id ON video_language_catalog (video_id);

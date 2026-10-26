-- Additive, server-owned billing evidence. Never backfill from display duration.
CREATE TABLE IF NOT EXISTS verified_video_metadata (
 video_id TEXT PRIMARY KEY,
 duration_seconds INTEGER,
 broadcast_state TEXT NOT NULL CHECK(broadcast_state IN ('none','live','upcoming')),
 source TEXT NOT NULL CHECK(source='youtube_data_api'),
 verified_at INTEGER NOT NULL,
 refresh_after INTEGER NOT NULL,
 observed_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS video_metadata_api_budget(day TEXT PRIMARY KEY, requests INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS video_metadata_provider_state(provider TEXT PRIMARY KEY, blocked_until INTEGER NOT NULL DEFAULT 0);
ALTER TABLE video_languages ADD COLUMN duration_source TEXT;
ALTER TABLE ai_transcription_jobs ADD COLUMN verified_duration_seconds INTEGER;
ALTER TABLE ai_transcription_jobs ADD COLUMN duration_source TEXT;
ALTER TABLE ai_transcription_jobs ADD COLUMN duration_verified_at INTEGER;

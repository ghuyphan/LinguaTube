-- Voca Backend Refactor: D1 Schema Migration
-- Migrates from content storage to metadata-only

-- Drop old content table (content now lives in R2)
DROP TABLE IF EXISTS transcripts;

-- Video metadata table (records which transcripts exist)
CREATE TABLE IF NOT EXISTS video_meta (
    video_id TEXT NOT NULL,
    language TEXT NOT NULL,
    source TEXT,
    created_at INTEGER,
    PRIMARY KEY (video_id, language)
);

-- Pending jobs table (tracks in-progress AI transcriptions)
CREATE TABLE IF NOT EXISTS pending_jobs (
    video_id TEXT PRIMARY KEY,
    language TEXT,
    result_url TEXT,
    created_at INTEGER
);

-- Index for cleanup queries
CREATE INDEX IF NOT EXISTS idx_pending_created ON pending_jobs(created_at);

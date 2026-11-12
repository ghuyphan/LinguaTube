CREATE TABLE IF NOT EXISTS video_grading_jobs (
    video_id TEXT NOT NULL,
    language TEXT NOT NULL CHECK (language IN ('ja','zh','ko','en')),
    revision TEXT NOT NULL,
    grader_version INTEGER NOT NULL,
    published_at INTEGER NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    state TEXT NOT NULL DEFAULT 'pending' CHECK (state IN ('pending','ready','review','unavailable')),
    attempts INTEGER NOT NULL DEFAULT 0,
    due_at INTEGER NOT NULL DEFAULT 0,
    lease TEXT,
    lease_until INTEGER,
    allow_large_shift INTEGER NOT NULL DEFAULT 0,
    previous_grade TEXT,
    result TEXT,
    error_code TEXT,
    PRIMARY KEY (video_id, language)
);
CREATE INDEX IF NOT EXISTS idx_video_grading_jobs_due
ON video_grading_jobs (grader_version, due_at, video_id, language) WHERE state='pending';

-- D1 Migration: Create ai_transcription_jobs
-- Replaces ephemeral in-memory maps and pending_jobs with a resilient state machine

CREATE TABLE IF NOT EXISTS ai_transcription_jobs (
  id TEXT PRIMARY KEY,                            -- Opaque UUID: 'job_' || hex(randomblob(12))
  video_id TEXT NOT NULL,                         -- YouTube 11-character video ID
  language TEXT NOT NULL,                         -- Requested language code (ja, zh, ko, en, etc.)
  detected_language TEXT,                        -- Actual ASR detected language
  user_id TEXT,                                   -- PocketBase User ID (NULL for anonymous)
  client_id TEXT NOT NULL,                        -- Client identifier / IP hash
  user_tier TEXT NOT NULL DEFAULT 'free',         -- 'anonymous' | 'free' | 'pro' | 'premium'
  diamonds_charged INTEGER NOT NULL DEFAULT 1,    -- Exact diamond credits debited
  diamonds_refunded INTEGER NOT NULL DEFAULT 0,   -- 1 = Refunded, 0 = Active/Consumed (Idempotency flag)
  gladia_job_id TEXT,                            -- Gladia UUID from /v2/pre-recorded
  status TEXT NOT NULL DEFAULT 'queued',          -- 'queued' | 'processing' | 'completed' | 'failed'
  error_code TEXT,                                -- Diagnostic error code
  error_message TEXT,                             -- User-facing error message
  attempts INTEGER NOT NULL DEFAULT 0,            -- Fallback poll / self-healing counter
  created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
  completed_at INTEGER                            -- Terminal state timestamp
);

-- PARTIAL UNIQUE INDEX: Guarantees at most ONE active job per (video_id, language)
-- Completed and failed jobs drop out of the index, eliminating retry lockouts while preserving audit history!
CREATE UNIQUE INDEX IF NOT EXISTS idx_ai_jobs_active_unique 
  ON ai_transcription_jobs(video_id, language) 
  WHERE status IN ('queued', 'processing');

-- Indexes for status checks, Gladia ID lookups, and stale cleanup
CREATE INDEX IF NOT EXISTS idx_ai_jobs_video_status ON ai_transcription_jobs(video_id, status);
CREATE INDEX IF NOT EXISTS idx_ai_jobs_gladia_id ON ai_transcription_jobs(gladia_job_id);
CREATE INDEX IF NOT EXISTS idx_ai_jobs_client_created ON ai_transcription_jobs(client_id, created_at);
CREATE INDEX IF NOT EXISTS idx_ai_jobs_stale ON ai_transcription_jobs(status, created_at) WHERE status IN ('queued', 'processing');

-- Durable terminal notifications; transcript bodies remain in R2.
ALTER TABLE ai_transcription_jobs ADD COLUMN ingestion_lease TEXT;
ALTER TABLE ai_transcription_jobs ADD COLUMN ingestion_lease_until INTEGER;
CREATE TABLE gladia_callback_inbox (
 id INTEGER PRIMARY KEY,
 job_id TEXT NOT NULL REFERENCES ai_transcription_jobs(id),
 provider_job_id TEXT NOT NULL,
 outcome TEXT NOT NULL CHECK(outcome IN ('done','error')),
 error_code TEXT,
 error_message TEXT,
 status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','confirmed')),
 attempts INTEGER NOT NULL DEFAULT 0,
 next_attempt INTEGER NOT NULL DEFAULT 0,
 created_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
 UNIQUE(job_id,provider_job_id,outcome)
);
CREATE INDEX gladia_callback_due ON gladia_callback_inbox(status,next_attempt);

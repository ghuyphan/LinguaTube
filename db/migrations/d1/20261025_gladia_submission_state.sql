-- Apply before deploying the corresponding Functions bundle.
-- Uncertain upstream acceptance is durable and never authorizes a second POST.
ALTER TABLE ai_transcription_jobs ADD COLUMN submission_state TEXT NOT NULL DEFAULT 'legacy';
ALTER TABLE ai_transcription_jobs ADD COLUMN submission_started_at INTEGER;
ALTER TABLE ai_transcription_jobs ADD COLUMN next_provider_check_at INTEGER NOT NULL DEFAULT 0;
CREATE INDEX idx_ai_jobs_provider_due ON ai_transcription_jobs(status,next_provider_check_at);

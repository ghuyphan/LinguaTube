CREATE INDEX IF NOT EXISTS idx_ai_jobs_scribe_budget
ON ai_transcription_jobs (submission_state, COALESCE(submission_started_at, created_at))
WHERE asr_provider = 'elevenlabs';

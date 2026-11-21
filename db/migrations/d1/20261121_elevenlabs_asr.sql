-- Preserve legacy provider routing while new jobs use Scribe.
ALTER TABLE ai_transcription_jobs ADD COLUMN asr_provider TEXT NOT NULL DEFAULT 'gladia'
    CHECK (asr_provider IN ('gladia', 'elevenlabs'));

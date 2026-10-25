-- Read-only operational audit. Never infer a refund from an absent provider list result.
-- Correlate these job IDs with provider metadata/callback evidence before manual action.
SELECT id, video_id, language, status, submission_state, submission_started_at,
       gladia_job_id, charge_status, refund_status, next_provider_check_at
FROM ai_transcription_jobs
WHERE status IN ('queued', 'processing')
  AND submission_state IN ('submitting', 'uncertain')
  AND submission_started_at < strftime('%s', 'now') - 120
ORDER BY submission_started_at
LIMIT 100;

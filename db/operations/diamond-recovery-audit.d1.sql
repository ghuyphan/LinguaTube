-- Read-only D1 schema and recovery checks. No financial rows are changed.
SELECT type,name,sql FROM sqlite_master WHERE name IN
('anonymous_credit_balances','anonymous_credit_charges','anonymous_charge_applied','anonymous_refund_applied',
 'idx_ai_jobs_active_unique','idx_ai_jobs_refund_due','idx_ai_jobs_provider_due');
PRAGMA table_info(ai_transcription_jobs);
SELECT id,status,charge_status,refund_status,refund_attempts,refund_next_attempt,
       submission_state,submission_started_at,gladia_job_id
FROM ai_transcription_jobs
WHERE refund_status='pending' OR (status IN ('queued','processing') AND
    (submission_state IN ('submitting','uncertain') OR charge_status='pending'))
ORDER BY created_at LIMIT 100;
SELECT j.id,j.charge_status,c.state AS ledger_state,j.diamonds_charged,c.amount
FROM ai_transcription_jobs j JOIN anonymous_credit_charges c ON c.job_id=j.id
WHERE j.user_id IS NULL AND (j.diamonds_charged<>c.amount OR
    (j.refund_status='confirmed' AND c.state NOT IN ('cancelled','refunded')))
LIMIT 100;

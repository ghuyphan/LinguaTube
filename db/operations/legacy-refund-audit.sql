-- Read-only inventory. A legacy flag does not prove whether a remote credit committed.
SELECT id,user_id,client_id,diamonds_charged,diamonds_refunded,status,error_code,completed_at,
    CASE WHEN diamonds_refunded=1 THEN 'legacy_flag_set_credit_commit_unverified'
         WHEN status='failed' THEN 'legacy_failed_refund_unverified'
         ELSE 'legacy_charge_history_unverified' END AS review_reason
FROM ai_transcription_jobs
WHERE charge_status='legacy' OR refund_status='legacy'
ORDER BY completed_at,id;

-- Forward migration: legacy refund flags are not proof of a successful refund.
ALTER TABLE ai_transcription_jobs ADD COLUMN charge_status TEXT NOT NULL DEFAULT 'legacy';
ALTER TABLE ai_transcription_jobs ADD COLUMN refund_status TEXT NOT NULL DEFAULT 'legacy';
ALTER TABLE ai_transcription_jobs ADD COLUMN refund_lease TEXT;
ALTER TABLE ai_transcription_jobs ADD COLUMN refund_lease_until INTEGER;
ALTER TABLE ai_transcription_jobs ADD COLUMN refund_attempts INTEGER NOT NULL DEFAULT 0;
ALTER TABLE ai_transcription_jobs ADD COLUMN refund_next_attempt INTEGER NOT NULL DEFAULT 0;
CREATE INDEX idx_ai_jobs_refund_due ON ai_transcription_jobs(refund_status, refund_next_attempt, refund_lease_until);
CREATE TABLE anonymous_credit_balances (
    client_id TEXT PRIMARY KEY,
    diamonds INTEGER NOT NULL CHECK(diamonds>=0 AND diamonds<=3),
    last_regen INTEGER NOT NULL
);
CREATE TABLE anonymous_credit_charges (
    job_id TEXT PRIMARY KEY REFERENCES ai_transcription_jobs(id),
    client_id TEXT NOT NULL REFERENCES anonymous_credit_balances(client_id),
    amount INTEGER NOT NULL CHECK(amount BETWEEN 1 AND 4),
    state TEXT NOT NULL CHECK(state IN ('charged','cancelled','refunded'))
);
CREATE TRIGGER anonymous_charge_applied AFTER INSERT ON anonymous_credit_charges WHEN NEW.state='charged'
BEGIN
    SELECT CASE WHEN (SELECT diamonds FROM anonymous_credit_balances WHERE client_id=NEW.client_id)<NEW.amount
        THEN RAISE(ABORT,'Insufficient anonymous credits') END;
    UPDATE anonymous_credit_balances SET last_regen=CASE WHEN diamonds=3 THEN CAST(strftime('%s','now') AS INTEGER)*1000 ELSE last_regen END,
        diamonds=diamonds-NEW.amount WHERE client_id=NEW.client_id;
    UPDATE ai_transcription_jobs SET charge_status='confirmed' WHERE id=NEW.job_id;
END;
CREATE TRIGGER anonymous_refund_applied AFTER UPDATE OF state ON anonymous_credit_charges
WHEN OLD.state='charged' AND NEW.state='refunded'
BEGIN
    UPDATE anonymous_credit_balances SET diamonds=MIN(3,diamonds+NEW.amount) WHERE client_id=NEW.client_id;
END;

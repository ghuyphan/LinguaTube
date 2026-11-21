-- Apply after both endpoints reject unauthenticated requests and the reminder
-- claim enforces opt-in. Provision the matching scheduler secrets in Vault,
-- Cloudflare Pages, and Supabase Edge Functions before running this file.
BEGIN;

-- The default pg_net queue grants are too broad for scheduler bearer tokens.
CREATE EXTENSION IF NOT EXISTS http WITH SCHEMA private;

CREATE OR REPLACE FUNCTION private.run_voca_scheduled_request(p_job text, p_timeout_ms integer)
RETURNS integer
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
    endpoint text;
    credential text;
    response_status integer;
BEGIN
    SELECT decrypted_secret INTO STRICT endpoint
    FROM vault.decrypted_secrets WHERE name = p_job || '_url';
    SELECT decrypted_secret INTO STRICT credential
    FROM vault.decrypted_secrets WHERE name = p_job || '_secret';

    PERFORM set_config('http.curlopt_connecttimeout_ms', '5000', true);
    PERFORM set_config('http.curlopt_timeout_ms', p_timeout_ms::text, true);
    SELECT response.status INTO response_status
    FROM private.http(ROW(
        'POST', endpoint,
        ARRAY[
            private.http_header('Authorization', 'Bearer ' || credential),
            private.http_header('User-Agent', 'VocaMaintenance/1.0')
        ],
        'application/json', '{}'
    )::private.http_request) AS response;

    IF response_status IS NULL OR response_status NOT BETWEEN 200 AND 299 THEN
        RAISE EXCEPTION 'Scheduled request % returned HTTP %', p_job, response_status;
    END IF;
    RETURN response_status;
END;
$$;

REVOKE ALL ON FUNCTION private.run_voca_scheduled_request(text, integer)
FROM PUBLIC, anon, authenticated, service_role;

SELECT cron.schedule('backend-maintenance', '*/5 * * * *',
    $$SELECT private.run_voca_scheduled_request('backend_maintenance', 40000)$$);
SELECT cron.schedule('streak-reminder-delivery', '*/5 * * * *',
    $$SELECT private.run_voca_scheduled_request('streak_reminder', 120000)$$);

COMMIT;

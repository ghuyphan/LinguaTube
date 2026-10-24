-- Run only during an authorized deployment, after pg_cron, pg_net and Vault are configured.
-- Required Vault names: backend_maintenance_url, backend_maintenance_secret,
-- streak_reminder_url, streak_reminder_secret. Never store actual credentials in this file.
DO $$
DECLARE v_name text;
BEGIN
    IF NOT EXISTS(SELECT 1 FROM pg_extension WHERE extname='pg_cron') OR
       NOT EXISTS(SELECT 1 FROM pg_extension WHERE extname='pg_net') THEN RAISE EXCEPTION 'Scheduling extensions missing'; END IF;
    FOREACH v_name IN ARRAY ARRAY['backend_maintenance_url','backend_maintenance_secret','streak_reminder_url','streak_reminder_secret'] LOOP
        IF NOT EXISTS(SELECT 1 FROM vault.decrypted_secrets WHERE name=v_name AND length(decrypted_secret)>0) THEN
            RAISE EXCEPTION 'Required Vault secret missing: %',v_name;
        END IF;
    END LOOP;
    PERFORM cron.unschedule(jobid) FROM cron.job WHERE jobname IN ('backend-maintenance','streak-reminder-delivery','downgrade-expired-subscriptions');
END;
$$;
SELECT cron.schedule('backend-maintenance','*/5 * * * *',$job$
    SELECT net.http_post(
        url:=(SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name='backend_maintenance_url'),
        headers:=jsonb_build_object('Authorization','Bearer '||(SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name='backend_maintenance_secret'),
            'Content-Type','application/json','User-Agent','VocaMaintenance/1.0'),body:='{}'::jsonb,timeout_milliseconds:=40000);
$job$);
SELECT cron.schedule('streak-reminder-delivery','*/5 * * * *',$job$
    SELECT net.http_post(
        url:=(SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name='streak_reminder_url'),
        headers:=jsonb_build_object('Authorization','Bearer '||(SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name='streak_reminder_secret'),
            'Content-Type','application/json'),body:='{}'::jsonb,timeout_milliseconds:=120000);
$job$);
SELECT cron.schedule('downgrade-expired-subscriptions','5 * * * *',$job$
    SELECT public.reconcile_user_subscription(id) FROM public.profiles
    WHERE subscription_expires<=now() AND subscription_tier<>'free';
$job$);

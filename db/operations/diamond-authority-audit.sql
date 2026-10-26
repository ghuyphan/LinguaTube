-- Read-only PostgreSQL inspection. Run using an authorized database administrator.
-- No migration/RPC execution, balance changes, or ledger cleanup occurs here.
BEGIN READ ONLY;

-- Missing signatures, client EXECUTE=true, unexpected owners or unsafe search paths
-- require investigation before claiming production authority is verified.
WITH expected(signature) AS (VALUES
    ('public.consume_user_diamonds(uuid,integer)'),
    ('public.refund_user_diamonds(uuid,integer)'),
    ('public.regenerate_user_diamonds(uuid)'),
    ('public.consume_transcription_credits(text,uuid,integer)'),
    ('public.refund_transcription_credits(text,uuid,integer)'))
SELECT e.signature, p.oid IS NOT NULL AS present, pg_get_userbyid(p.proowner) AS owner,
       p.prosecdef AS security_definer, p.proconfig AS settings,
       has_function_privilege('anon',p.oid,'EXECUTE') AS anon_execute,
       has_function_privilege('authenticated',p.oid,'EXECUTE') AS authenticated_execute,
       has_function_privilege('service_role',p.oid,'EXECUTE') AS service_execute
FROM expected e LEFT JOIN pg_proc p ON p.oid=to_regprocedure(e.signature);

WITH expected(name) AS (VALUES ('profiles'),('transcription_credit_operations'),('subscription_grants'))
SELECT e.name, c.oid IS NOT NULL AS present, c.relrowsecurity AS rls_enabled,
       has_table_privilege('anon',c.oid,'SELECT,INSERT,UPDATE,DELETE') AS anon_any_privilege,
       has_table_privilege('authenticated',c.oid,'SELECT,INSERT,UPDATE,DELETE') AS authenticated_any_privilege
FROM expected e LEFT JOIN pg_class c ON c.oid=to_regclass('public.'||e.name);

-- Profile UPDATE privileges may exist: verify the enabled trigger and RLS policies
-- together. Private ledgers must have no client privileges or permissive policies.
SELECT schemaname,tablename,policyname,roles,cmd,qual,with_check
FROM pg_policies WHERE schemaname='public'
AND tablename IN ('profiles','transcription_credit_operations','subscription_grants');
SELECT t.tgname,t.tgenabled,pg_get_triggerdef(t.oid) AS trigger_definition,
       pg_get_functiondef(t.tgfoid) AS guard_definition
FROM pg_trigger t WHERE t.tgrelid=to_regclass('public.profiles') AND NOT t.tgisinternal;

-- Compare the installed implementations against the reviewed migration sources.
SELECT p.oid::regprocedure AS signature,pg_get_functiondef(p.oid) AS implementation
FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace
WHERE n.nspname='public' AND p.proname IN
('consume_user_diamonds','refund_user_diamonds','regenerate_user_diamonds',
 'consume_transcription_credits','refund_transcription_credits');
COMMIT;

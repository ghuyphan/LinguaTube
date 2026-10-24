BEGIN;
CREATE TABLE public.billing_webhook_inbox (
    event_id text PRIMARY KEY CHECK(length(event_id) BETWEEN 1 AND 200),
    event_type text NOT NULL,
    user_ids jsonb NOT NULL CHECK(jsonb_typeof(user_ids)='array' AND jsonb_array_length(user_ids) BETWEEN 1 AND 20),
    event_at timestamptz NOT NULL,
    status text NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','confirmed')),
    completed_user_ids jsonb NOT NULL DEFAULT '[]'::jsonb,
    lease_token uuid,
    lease_until timestamptz,
    attempts integer NOT NULL DEFAULT 0,
    next_attempt timestamptz NOT NULL DEFAULT now(),
    created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX billing_webhook_inbox_due ON public.billing_webhook_inbox(next_attempt,lease_until) WHERE status='pending';
CREATE TABLE public.revenuecat_sync_state(user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,snapshot_at timestamptz NOT NULL);
ALTER TABLE public.billing_webhook_inbox ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenuecat_sync_state ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.billing_webhook_inbox,public.revenuecat_sync_state FROM PUBLIC,anon,authenticated;
GRANT SELECT,INSERT ON public.billing_webhook_inbox TO service_role;
-- A grant period can replenish credits once, even when callbacks arrive out of order.
CREATE TABLE public.revenuecat_credit_periods (
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    tier text NOT NULL CHECK(tier IN ('pro','premium')),
    period_end text NOT NULL,
    PRIMARY KEY(user_id,tier,period_end)
);
ALTER TABLE public.revenuecat_credit_periods ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.revenuecat_credit_periods FROM PUBLIC,anon,authenticated;
INSERT INTO public.revenuecat_credit_periods(user_id,tier,period_end)
SELECT user_id,tier,coalesce(extract(epoch FROM expires_at)::text,'lifetime')
FROM public.subscription_grants WHERE provider='revenuecat';
CREATE OR REPLACE FUNCTION public.claim_revenuecat_event(p_event_id text DEFAULT NULL)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE v_event public.billing_webhook_inbox%ROWTYPE;
BEGIN
    SELECT * INTO v_event FROM public.billing_webhook_inbox WHERE status='pending' AND next_attempt<=now()
        AND (lease_until IS NULL OR lease_until<now()) AND (p_event_id IS NULL OR event_id=p_event_id)
        ORDER BY next_attempt,event_id FOR UPDATE SKIP LOCKED LIMIT 1;
    IF NOT FOUND THEN RETURN NULL; END IF;
    UPDATE public.billing_webhook_inbox SET lease_token=gen_random_uuid(),lease_until=now()+interval '60 seconds',attempts=attempts+1
        WHERE event_id=v_event.event_id RETURNING * INTO v_event;
    RETURN to_jsonb(v_event);
END;
$$;
CREATE OR REPLACE FUNCTION public.apply_revenuecat_snapshot(p_event_id text,p_lease uuid,p_user_id uuid,p_snapshot_at timestamptz,p_grants jsonb)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE v_previous timestamptz; elem jsonb; v_topup integer := 0; v_event_type text;
BEGIN
    PERFORM 1 FROM public.billing_webhook_inbox WHERE event_id=p_event_id AND lease_token=p_lease AND lease_until>now()
        AND user_ids @> jsonb_build_array(p_user_id::text) FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'Invalid reconciliation lease'; END IF;
    UPDATE public.billing_webhook_inbox SET completed_user_ids=completed_user_ids||jsonb_build_array(p_user_id::text)
        WHERE event_id=p_event_id AND NOT completed_user_ids @> jsonb_build_array(p_user_id::text);
    IF p_snapshot_at IS NULL OR p_snapshot_at>now()+interval '5 minutes' OR jsonb_typeof(p_grants) IS DISTINCT FROM 'array'
        OR jsonb_array_length(p_grants)>2 THEN RAISE EXCEPTION 'Invalid subscriber snapshot'; END IF;
    PERFORM 1 FROM public.profiles WHERE id=p_user_id FOR UPDATE;
    IF NOT FOUND THEN RETURN true; END IF; -- Account was deleted while the callback was queued.
    SELECT snapshot_at INTO v_previous FROM public.revenuecat_sync_state WHERE user_id=p_user_id;
    IF v_previous IS NOT NULL AND p_snapshot_at<=v_previous THEN RETURN true; END IF;
    SELECT event_type INTO v_event_type FROM public.billing_webhook_inbox WHERE event_id=p_event_id;
    IF v_event_type IN ('INITIAL_PURCHASE','RENEWAL','NON_RENEWING_PURCHASE') THEN
        WITH credited AS (
            INSERT INTO public.revenuecat_credit_periods(user_id,tier,period_end)
            SELECT p_user_id,e->>'tier',coalesce(extract(epoch FROM (e->>'expires_at')::timestamptz)::text,'lifetime')
            FROM jsonb_array_elements(p_grants) e
            ON CONFLICT DO NOTHING RETURNING tier
        ) SELECT coalesce(max(CASE tier WHEN 'premium' THEN 25 ELSE 10 END),0) INTO v_topup FROM credited;
    END IF;
    DELETE FROM public.subscription_grants WHERE user_id=p_user_id AND provider='revenuecat';
    FOR elem IN SELECT * FROM jsonb_array_elements(p_grants) LOOP
        IF elem->>'tier' IS NULL OR elem->>'tier' NOT IN ('pro','premium') THEN RAISE EXCEPTION 'Invalid entitlement'; END IF;
        INSERT INTO public.subscription_grants(user_id,provider,tier,expires_at)
        VALUES(p_user_id,'revenuecat',elem->>'tier',(elem->>'expires_at')::timestamptz);
    END LOOP;
    INSERT INTO public.revenuecat_sync_state(user_id,snapshot_at) VALUES(p_user_id,p_snapshot_at)
        ON CONFLICT(user_id) DO UPDATE SET snapshot_at=excluded.snapshot_at;
    PERFORM public.reconcile_user_subscription(p_user_id);
    IF v_topup>0 THEN UPDATE public.profiles SET diamonds=greatest(coalesce(diamonds,0),v_topup)
        WHERE id=p_user_id AND coalesce(diamonds,0)<v_topup; END IF;
    RETURN true;
END;
$$;
CREATE OR REPLACE FUNCTION public.finish_revenuecat_event(p_event_id text,p_lease uuid,p_success boolean,p_retry_after integer DEFAULT 0)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
BEGIN
    UPDATE public.billing_webhook_inbox SET status=CASE WHEN p_success THEN 'confirmed' ELSE 'pending' END,
        next_attempt=now()+make_interval(secs=>greatest(least(86400,greatest(0,coalesce(p_retry_after,0))),least(3600,30*power(2,least(attempts,7))::integer))),lease_token=NULL,lease_until=NULL
    WHERE event_id=p_event_id AND lease_token=p_lease;
    RETURN FOUND;
END;
$$;
REVOKE ALL ON FUNCTION public.claim_revenuecat_event(text) FROM PUBLIC,anon,authenticated;
REVOKE ALL ON FUNCTION public.apply_revenuecat_snapshot(text,uuid,uuid,timestamptz,jsonb) FROM PUBLIC,anon,authenticated;
REVOKE ALL ON FUNCTION public.finish_revenuecat_event(text,uuid,boolean,integer) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.claim_revenuecat_event(text) TO service_role;
GRANT EXECUTE ON FUNCTION public.apply_revenuecat_snapshot(text,uuid,uuid,timestamptz,jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.finish_revenuecat_event(text,uuid,boolean,integer) TO service_role;
CREATE OR REPLACE FUNCTION public.remove_deleted_billing_identity()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
BEGIN
    DELETE FROM public.billing_webhook_inbox WHERE user_ids @> jsonb_build_array(OLD.id::text) AND jsonb_array_length(user_ids)=1;
    UPDATE public.billing_webhook_inbox SET user_ids=user_ids-OLD.id::text,completed_user_ids=completed_user_ids-OLD.id::text
        WHERE user_ids @> jsonb_build_array(OLD.id::text);
    RETURN OLD;
END;
$$;
REVOKE ALL ON FUNCTION public.remove_deleted_billing_identity() FROM PUBLIC,anon,authenticated;
CREATE TRIGGER remove_deleted_billing_identity AFTER DELETE ON auth.users FOR EACH ROW EXECUTE FUNCTION public.remove_deleted_billing_identity();
COMMIT;

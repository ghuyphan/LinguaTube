-- Apply before deploying the payment handlers. No client can write the event ledger.
BEGIN;
CREATE TABLE IF NOT EXISTS public.payment_events (
    provider text NOT NULL CHECK (provider IN ('payos', 'revenuecat')),
    event_id text NOT NULL,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    event_at timestamptz NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (provider, event_id)
);
CREATE INDEX IF NOT EXISTS payment_events_user_order ON public.payment_events(user_id, provider, event_at DESC);
ALTER TABLE public.payment_events ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.payment_events FROM PUBLIC, anon, authenticated;

-- Keep grants separate: a short premium purchase must not upgrade a longer pro grant.
CREATE TABLE IF NOT EXISTS public.subscription_grants (
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    provider text NOT NULL CHECK (provider IN ('legacy','payos','revenuecat')),
    tier text NOT NULL CHECK (tier IN ('pro','premium')),
    expires_at timestamptz,
    PRIMARY KEY(user_id,provider,tier)
);
ALTER TABLE public.subscription_grants ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.subscription_grants FROM PUBLIC,anon,authenticated;
INSERT INTO public.subscription_grants(user_id,provider,tier,expires_at)
SELECT id,'legacy',subscription_tier,subscription_expires FROM public.profiles
WHERE subscription_tier IN ('pro','premium') AND (subscription_expires IS NULL OR subscription_expires>now())
ON CONFLICT DO NOTHING;

CREATE OR REPLACE FUNCTION public.reconcile_user_subscription(p_user_id uuid)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE v_tier text; v_expiry timestamptz;
BEGIN
    PERFORM 1 FROM public.profiles WHERE id=p_user_id FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'Profile missing'; END IF;
    SELECT tier,CASE WHEN bool_or(expires_at IS NULL) THEN NULL ELSE max(expires_at) END
    INTO v_tier,v_expiry FROM public.subscription_grants
    WHERE user_id=p_user_id AND (expires_at IS NULL OR expires_at>now())
    GROUP BY tier ORDER BY CASE tier WHEN 'premium' THEN 2 ELSE 1 END DESC LIMIT 1;
    v_tier := coalesce(v_tier,'free');
    UPDATE public.profiles SET subscription_tier=v_tier,subscription_expires=v_expiry,updated_at=now()
    WHERE id=p_user_id AND (subscription_tier IS DISTINCT FROM v_tier OR subscription_expires IS DISTINCT FROM v_expiry);
    RETURN jsonb_build_object('success',true,'tier',v_tier,'expires_at',v_expiry);
END;
$$;
REVOKE ALL ON FUNCTION public.reconcile_user_subscription(uuid) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.reconcile_user_subscription(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.apply_payos_payment(
    p_order_code bigint, p_user_id uuid, p_tier text, p_days integer, p_diamonds integer, p_amount integer
) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE
    v_order public.orders%ROWTYPE;
    v_result jsonb;
    v_expiry timestamptz;
    v_has_lifetime boolean;
BEGIN
    IF p_order_code IS NULL OR p_order_code <= 0 OR p_user_id IS NULL OR
       p_tier IS NULL OR p_tier NOT IN ('pro','premium') OR p_days IS NULL OR p_days NOT IN (30,365) OR
       p_diamonds IS DISTINCT FROM (CASE WHEN p_tier = 'premium' THEN 25 ELSE 10 END) OR
       p_amount IS NULL OR p_amount <= 0 THEN RAISE EXCEPTION 'Invalid payment'; END IF;

    SELECT * INTO v_order FROM public.orders WHERE order_code = p_order_code FOR UPDATE;
    IF FOUND THEN
        IF v_order.user_id IS DISTINCT FROM p_user_id OR v_order.tier IS DISTINCT FROM p_tier OR
           v_order.amount IS DISTINCT FROM p_amount OR
           p_days IS DISTINCT FROM (CASE WHEN v_order.plan_id LIKE '%1y' THEN 365 ELSE 30 END) THEN
            RAISE EXCEPTION 'Order mismatch';
        END IF;
        IF v_order.status = 'PAID' THEN RETURN jsonb_build_object('success',true,'status','already_processed'); END IF;
    ELSE
        -- Backfill legacy KV orders using metadata supplied only by the trusted service role.
        INSERT INTO public.orders(order_code,user_id,plan_id,tier,amount)
        VALUES(p_order_code,p_user_id,p_tier || CASE WHEN p_days=365 THEN '_1y' ELSE '_1m' END,p_tier,p_amount);
    END IF;

    INSERT INTO public.payment_events(provider,event_id,user_id,event_at)
    VALUES('payos',p_order_code::text,p_user_id,now()) ON CONFLICT DO NOTHING;
    IF NOT FOUND THEN RETURN jsonb_build_object('success',true,'status','already_processed'); END IF;
    PERFORM 1 FROM public.profiles WHERE id=p_user_id FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'Profile missing'; END IF;
    SELECT max(expires_at),coalesce(bool_or(expires_at IS NULL),false) INTO v_expiry,v_has_lifetime
    FROM public.subscription_grants WHERE user_id=p_user_id AND tier=p_tier AND (expires_at IS NULL OR expires_at>now());
    v_expiry := CASE WHEN v_has_lifetime THEN NULL ELSE greatest(coalesce(v_expiry,now()),now())+make_interval(days=>p_days) END;
    INSERT INTO public.subscription_grants(user_id,provider,tier,expires_at) VALUES(p_user_id,'payos',p_tier,v_expiry)
    ON CONFLICT(user_id,provider,tier) DO UPDATE SET expires_at=excluded.expires_at;
    v_result := public.reconcile_user_subscription(p_user_id);
    UPDATE public.profiles SET diamonds=greatest(coalesce(diamonds,0),p_diamonds),diamonds_updated_at=now() WHERE id=p_user_id;
    UPDATE public.orders SET status='PAID',paid_at=now(),updated_at=now() WHERE order_code=p_order_code;
    RETURN v_result || jsonb_build_object('status','applied');
END;
$$;
REVOKE ALL ON FUNCTION public.apply_payos_payment(bigint,uuid,text,integer,integer,integer) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.apply_payos_payment(bigint,uuid,text,integer,integer,integer) TO service_role;

CREATE OR REPLACE FUNCTION public.apply_revenuecat_event(
    p_event_id text, p_user_id uuid, p_event_type text, p_event_at timestamptz, p_tier text, p_expires_at timestamptz
) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE
    v_profile public.profiles%ROWTYPE;
    v_latest timestamptz;
BEGIN
    IF p_event_id IS NULL OR length(p_event_id) NOT BETWEEN 1 AND 200 OR p_event_at IS NULL OR
       p_event_at > now() + interval '5 minutes' OR p_user_id IS NULL OR p_event_type IS NULL OR
       p_event_type NOT IN ('INITIAL_PURCHASE','RENEWAL','UNCANCELLATION','NON_RENEWING_PURCHASE','SUBSCRIPTION_EXTENDED','EXPIRATION') THEN
        RAISE EXCEPTION 'Invalid event';
    END IF;
    IF p_event_type <> 'EXPIRATION' AND (p_tier IS NULL OR p_tier NOT IN ('pro','premium') OR
       (p_expires_at IS NULL AND p_event_type <> 'NON_RENEWING_PURCHASE')) THEN
        RAISE EXCEPTION 'Invalid subscription';
    END IF;
    -- Serialize all subscription events for this account across Worker isolates.
    SELECT * INTO v_profile FROM public.profiles WHERE id=p_user_id FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'Profile missing'; END IF;
    SELECT max(event_at) INTO v_latest FROM public.payment_events WHERE provider='revenuecat' AND user_id=p_user_id;
    INSERT INTO public.payment_events(provider,event_id,user_id,event_at)
    VALUES('revenuecat',p_event_id,p_user_id,p_event_at) ON CONFLICT DO NOTHING;
    IF NOT FOUND THEN RETURN jsonb_build_object('success',true,'status','already_processed'); END IF;
    IF v_latest IS NOT NULL AND p_event_at <= v_latest THEN RETURN jsonb_build_object('success',true,'status','stale'); END IF;

    IF p_event_type='EXPIRATION' THEN
        DELETE FROM public.subscription_grants WHERE user_id=p_user_id AND provider='revenuecat'
            AND (p_tier IS NULL OR tier=p_tier) AND expires_at<=now();
    ELSIF p_expires_at IS NULL OR p_expires_at > now() THEN
        INSERT INTO public.subscription_grants(user_id,provider,tier,expires_at) VALUES(p_user_id,'revenuecat',p_tier,p_expires_at)
        ON CONFLICT(user_id,provider,tier) DO UPDATE SET expires_at=excluded.expires_at;
        IF p_event_type IN ('INITIAL_PURCHASE','RENEWAL','NON_RENEWING_PURCHASE') THEN
            UPDATE public.profiles SET diamonds=greatest(coalesce(diamonds,0),CASE WHEN p_tier='premium' THEN 25 ELSE 10 END),
                updated_at=now() WHERE id=p_user_id;
        END IF;
    END IF;
    PERFORM public.reconcile_user_subscription(p_user_id);
    RETURN jsonb_build_object('success',true,'status','applied');
END;
$$;
REVOKE ALL ON FUNCTION public.apply_revenuecat_event(text,uuid,text,timestamptz,text,timestamptz) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.apply_revenuecat_event(text,uuid,text,timestamptz,text,timestamptz) TO service_role;
COMMIT;

BEGIN;
CREATE OR REPLACE FUNCTION public.regenerate_user_diamonds(target_user_id uuid)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE
    v_profile public.profiles%ROWTYPE;
    v_tier text;
    v_max integer;
    v_interval integer;
    v_ticks integer;
    v_time timestamptz;
    v_balance integer;
BEGIN
    PERFORM public.reconcile_user_subscription(target_user_id);
    SELECT * INTO v_profile FROM public.profiles WHERE id=target_user_id FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'Profile missing'; END IF;
    v_tier := CASE WHEN v_profile.subscription_expires <= now() THEN 'free' ELSE v_profile.subscription_tier END;
    v_max := CASE v_tier WHEN 'premium' THEN 25 WHEN 'pro' THEN 10 ELSE 5 END;
    v_interval := CASE v_tier WHEN 'premium' THEN 300 WHEN 'pro' THEN 900 ELSE 1500 END;
    v_time := coalesce(v_profile.diamonds_updated_at,now());
    v_balance := coalesce(v_profile.diamonds,0);
    IF v_balance < v_max THEN
        v_ticks := greatest(0,floor(extract(epoch FROM now()-v_time)/v_interval)::integer);
        IF v_ticks > 0 THEN
            v_balance := least(v_max,v_balance+v_ticks);
            v_time := v_time + make_interval(secs => v_ticks*v_interval);
        END IF;
    END IF;
    UPDATE public.profiles SET diamonds=v_balance,diamonds_updated_at=v_time WHERE id=target_user_id AND (diamonds IS DISTINCT FROM v_balance OR diamonds_updated_at IS DISTINCT FROM v_time);
    RETURN jsonb_build_object('success',true,'diamonds',v_balance,'diamonds_updated_at',v_time,'max_diamonds',v_max);
END;
$$;
COMMIT;

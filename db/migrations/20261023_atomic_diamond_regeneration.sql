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
    v_interval := CASE v_tier WHEN 'premium' THEN 240 WHEN 'pro' THEN 600 ELSE 900 END;
    v_time := coalesce(v_profile.diamonds_updated_at,now());
    v_balance := coalesce(v_profile.diamonds,0);
    IF v_balance < v_max THEN
        v_ticks := greatest(0,floor(extract(epoch FROM now()-v_time)/v_interval)::integer);
        IF v_ticks > 0 THEN
            v_balance := least(v_max,v_balance+v_ticks);
            v_time := v_time + make_interval(secs => v_ticks*v_interval);
        END IF;
    END IF;
    UPDATE public.profiles SET diamonds=v_balance,diamonds_updated_at=v_time WHERE id=target_user_id;
    RETURN jsonb_build_object('success',true,'diamonds',v_balance,'diamonds_updated_at',v_time,'max_diamonds',v_max);
END;
$$;
CREATE OR REPLACE FUNCTION public.consume_user_diamonds(target_user_id uuid, diamond_count integer)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE v_state jsonb; v_balance integer;
BEGIN
    IF diamond_count IS NULL OR diamond_count <= 0 THEN RAISE EXCEPTION 'Invalid count'; END IF;
    v_state := public.regenerate_user_diamonds(target_user_id);
    v_balance := (v_state->>'diamonds')::integer;
    IF v_balance < diamond_count THEN RETURN jsonb_build_object('success',false,'diamonds',v_balance,'reason','insufficient_diamonds'); END IF;
    UPDATE public.profiles SET diamonds=v_balance-diamond_count,
        diamonds_updated_at=CASE WHEN v_balance >= (v_state->>'max_diamonds')::integer THEN now() ELSE diamonds_updated_at END,
        updated_at=now() WHERE id=target_user_id;
    RETURN jsonb_build_object('success',true,'diamonds',v_balance-diamond_count);
END;
$$;
CREATE OR REPLACE FUNCTION public.refund_user_diamonds(target_user_id uuid, diamond_count integer)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE v_state jsonb; v_balance integer;
BEGIN
    IF diamond_count IS NULL OR diamond_count <= 0 THEN RAISE EXCEPTION 'Invalid count'; END IF;
    v_state := public.regenerate_user_diamonds(target_user_id);
    v_balance := greatest((v_state->>'diamonds')::integer,
        least((v_state->>'max_diamonds')::integer,(v_state->>'diamonds')::integer+diamond_count));
    UPDATE public.profiles SET diamonds=v_balance,updated_at=now() WHERE id=target_user_id;
    RETURN jsonb_build_object('success',true,'diamonds',v_balance);
END;
$$;
REVOKE ALL ON FUNCTION public.regenerate_user_diamonds(uuid) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.regenerate_user_diamonds(uuid) TO service_role;
REVOKE ALL ON FUNCTION public.consume_user_diamonds(uuid,integer) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.consume_user_diamonds(uuid,integer) TO service_role;
REVOKE ALL ON FUNCTION public.refund_user_diamonds(uuid,integer) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.refund_user_diamonds(uuid,integer) TO service_role;
COMMIT;

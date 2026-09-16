-- ==============================================================================
-- ATOMIC DIAMOND CONSUMPTION & REFUND RPCS WITH ROW-LEVEL LOCKS
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.consume_user_diamonds(
  target_user_id UUID,
  diamond_count INTEGER
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_current_diamonds INTEGER;
  v_updated_diamonds INTEGER;
BEGIN
  IF diamond_count <= 0 THEN
    RETURN jsonb_build_object('success', false, 'error', 'Invalid diamond count');
  END IF;

  SELECT diamonds INTO v_current_diamonds
  FROM public.profiles
  WHERE id = target_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'User not found');
  END IF;

  IF v_current_diamonds < diamond_count THEN
    RETURN jsonb_build_object('success', false, 'error', 'Insufficient diamonds', 'diamonds', v_current_diamonds);
  END IF;

  v_updated_diamonds := v_current_diamonds - diamond_count;

  UPDATE public.profiles
  SET diamonds = v_updated_diamonds,
      diamonds_updated_at = NOW(),
      updated_at = NOW()
  WHERE id = target_user_id;

  RETURN jsonb_build_object(
    'success', true,
    'consumed', diamond_count,
    'diamonds', v_updated_diamonds
  );
END;
$$;

REVOKE ALL ON FUNCTION public.consume_user_diamonds(UUID, INTEGER) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_user_diamonds(UUID, INTEGER) TO service_role, postgres;

CREATE OR REPLACE FUNCTION public.refund_user_diamonds(
  target_user_id UUID,
  diamond_count INTEGER
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_current_diamonds INTEGER;
  v_updated_diamonds INTEGER;
BEGIN
  IF diamond_count <= 0 THEN
    RETURN jsonb_build_object('success', false, 'error', 'Invalid diamond count');
  END IF;

  SELECT diamonds INTO v_current_diamonds
  FROM public.profiles
  WHERE id = target_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'User not found');
  END IF;

  v_updated_diamonds := v_current_diamonds + diamond_count;

  UPDATE public.profiles
  SET diamonds = v_updated_diamonds,
      diamonds_updated_at = NOW(),
      updated_at = NOW()
  WHERE id = target_user_id;

  RETURN jsonb_build_object(
    'success', true,
    'refunded', diamond_count,
    'diamonds', v_updated_diamonds
  );
END;
$$;

REVOKE ALL ON FUNCTION public.refund_user_diamonds(UUID, INTEGER) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.refund_user_diamonds(UUID, INTEGER) TO service_role, postgres;

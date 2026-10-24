-- Migration: 20261016_account_deletion_rpc.sql
-- Description: Server-authoritative account deletion for App Store Guideline 5.1.1(v) compliance.
-- SECURITY DEFINER function to cascade delete public user tables and identity from auth.users.

CREATE OR REPLACE FUNCTION public.delete_user_account()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, pg_temp
AS $$
DECLARE
  v_user_id UUID := auth.uid();
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- 1. Wipe user public tables
  DELETE FROM public.vocabulary WHERE user_id = v_user_id;
  DELETE FROM public.history WHERE user_id = v_user_id;
  DELETE FROM public.streaks WHERE user_id = v_user_id;
  DELETE FROM public.gamification WHERE user_id = v_user_id;
  DELETE FROM public.playlist_saves WHERE user_id = v_user_id;
  DELETE FROM public.playlists WHERE user_id = v_user_id;
  DELETE FROM public.xp_transactions WHERE user_id = v_user_id;
  DELETE FROM public.profiles WHERE id = v_user_id;

  -- 2. Delete user from auth.users (cascades sessions/identities)
  DELETE FROM auth.users WHERE id = v_user_id;

  RETURN jsonb_build_object('success', true);
END;
$$;

-- Security: Revoke from public/anon, grant only to authenticated and service_role
REVOKE ALL ON FUNCTION public.delete_user_account() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.delete_user_account() TO authenticated, service_role;

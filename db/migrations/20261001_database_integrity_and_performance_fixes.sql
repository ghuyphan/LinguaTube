-- ==============================================================================
-- Migration: 20261001_database_integrity_and_performance_fixes.sql
-- Description:
--   1. Adds missing 'level' column to public.playlists (resolves PGRST204)
--   2. Deduplicates history rows and enforces UNIQUE (user_id, video_id)
--   3. Enforces UNIQUE (user_id, playlist_id) on public.playlist_saves
--   4. Optimizes RLS initplan re-evaluation on public.xp_transactions
--   5. Adds covering indexes for unindexed foreign keys (video_levels, legacy_pb_users)
--   6. Hardens get_leaderboard search_path to 'public, pg_temp'
-- ==============================================================================

-- 1. Add missing 'level' column to public.playlists
ALTER TABLE public.playlists 
  ADD COLUMN IF NOT EXISTS level TEXT;

-- 2. Deduplicate history rows (retaining newest watched_at) and enforce UNIQUE index
DELETE FROM public.history h1
USING public.history h2
WHERE h1.user_id = h2.user_id
  AND h1.video_id = h2.video_id
  AND h1.user_id IS NOT NULL
  AND (h1.watched_at < h2.watched_at OR (h1.watched_at = h2.watched_at AND h1.id < h2.id));

CREATE UNIQUE INDEX IF NOT EXISTS idx_history_user_video_unique 
  ON public.history (user_id, video_id) 
  WHERE user_id IS NOT NULL;

-- 3. Enforce UNIQUE (user_id, playlist_id) on public.playlist_saves
ALTER TABLE public.playlist_saves 
  ADD CONSTRAINT playlist_saves_user_playlist_unique UNIQUE (user_id, playlist_id);

-- 4. Fix RLS initplan re-evaluation warning on public.xp_transactions
DROP POLICY IF EXISTS xp_transactions_select_own ON public.xp_transactions;
CREATE POLICY xp_transactions_select_own 
  ON public.xp_transactions 
  FOR SELECT TO authenticated 
  USING ((SELECT auth.uid()) = user_id);

-- 5. Add covering indexes for unindexed foreign keys
CREATE INDEX IF NOT EXISTS idx_video_levels_user_id 
  ON public.video_levels (user_id);

CREATE INDEX IF NOT EXISTS idx_legacy_pb_users_claimed_by 
  ON public.legacy_pb_users (claimed_by);

-- 6. Add search_path hardening to get_leaderboard RPC
ALTER FUNCTION public.get_leaderboard(text, text, integer) 
  SET search_path = public, pg_temp;

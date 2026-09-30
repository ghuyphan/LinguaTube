-- Migration: 20261001_server_gamification_authority.sql
-- Description: Transition gamification and streak to Server-Authoritative Architecture.
-- 1. Create xp_transactions audit table.
-- 2. Add server-managed columns to public.gamification.
-- 3. Deploy record_streak_activity (timezone-aware).
-- 4. Deploy spend_xp RPC (handles freeze replenishments & XP vault).
-- 5. Deploy record_study_event RPC (server-authoritative XP & quest tracking).
-- 6. Lock down direct UPDATE on public.gamification from client console.

-- ------------------------------------------------------------------------------
-- 1. XP Transactions Ledger
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.xp_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INT NOT NULL,                  -- Positive for awards, negative for spends
  source_type TEXT NOT NULL,            -- 'video_completed', 'freeze_replenish', etc.
  reference_id TEXT,                    -- Video ID, mission ID, item ID
  balance_after INT NOT NULL,           -- Snapshot of total XP after transaction
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.xp_transactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS xp_transactions_select_own ON public.xp_transactions;
CREATE POLICY xp_transactions_select_own 
  ON public.xp_transactions 
  FOR SELECT TO authenticated 
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_xp_transactions_user_time 
  ON public.xp_transactions (user_id, created_at DESC);

-- ------------------------------------------------------------------------------
-- 2. Enhance public.gamification columns
-- ------------------------------------------------------------------------------

ALTER TABLE public.gamification 
  ADD COLUMN IF NOT EXISTS daily_missions JSONB,
  ADD COLUMN IF NOT EXISTS unlocked_cosmetics TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS active_cosmetics JSONB DEFAULT '{"theme": "default", "title": "novice", "showcase_badges": []}',
  ADD COLUMN IF NOT EXISTS hourly_baseline_xp INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS hourly_window_start TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS is_flagged BOOLEAN DEFAULT FALSE;

-- ------------------------------------------------------------------------------
-- 3. Timezone-Aware record_streak_activity RPC
-- ------------------------------------------------------------------------------

DROP FUNCTION IF EXISTS public.record_streak_activity();
CREATE OR REPLACE FUNCTION public.record_streak_activity(
  p_client_date DATE DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_streak RECORD;
  v_today DATE;
  v_last_date DATE;
  v_diff INT;
  v_freezes_to_use INT;
  v_status TEXT;
  v_is_new_record BOOLEAN := FALSE;
  v_new_current INT;
  v_new_longest INT;
  v_new_freezes INT;
  v_freeze_used TIMESTAMPTZ := NULL;
  v_log JSONB;
  v_today_str TEXT;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Timezone sanity bounds check (max 2 days drift from server CURRENT_DATE)
  IF p_client_date IS NOT NULL AND ABS(p_client_date - CURRENT_DATE) <= 2 THEN
    v_today := p_client_date;
  ELSE
    v_today := CURRENT_DATE;
  END IF;
  v_today_str := TO_CHAR(v_today, 'YYYY-MM-DD');

  SELECT * INTO v_streak 
  FROM public.streaks 
  WHERE user_id = v_user_id 
  FOR UPDATE;

  IF NOT FOUND THEN
    INSERT INTO public.streaks (
      id,
      user_id,
      current_streak,
      longest_streak,
      last_activity,
      freezes_remaining,
      activity_log
    ) VALUES (
      'strk_' || SUBSTRING(REPLACE(v_user_id::text, '-', '') FROM 1 FOR 15),
      v_user_id,
      1,
      1,
      NOW(),
      2,
      jsonb_build_array(v_today_str)
    )
    ON CONFLICT (user_id) DO UPDATE SET
      last_activity = NOW()
    RETURNING * INTO v_streak;

    RETURN jsonb_build_object(
      'status', 'created',
      'current_streak', 1,
      'longest_streak', 1,
      'freezes_remaining', 2,
      'is_new_record', true,
      'activity_log', jsonb_build_array(v_today_str)
    );
  END IF;

  v_last_date := (v_streak.last_activity AT TIME ZONE 'UTC')::date;
  v_log := COALESCE(v_streak.activity_log, '[]'::jsonb);

  IF v_log ? v_today_str THEN
    RETURN jsonb_build_object(
      'status', 'already_recorded',
      'current_streak', v_streak.current_streak,
      'longest_streak', v_streak.longest_streak,
      'freezes_remaining', v_streak.freezes_remaining,
      'is_new_record', false,
      'activity_log', v_log
    );
  END IF;

  v_diff := v_today - v_last_date;

  IF NOT v_log ? v_today_str THEN
    v_log := v_log || to_jsonb(v_today_str);
  END IF;

  IF v_diff = 1 THEN
    v_new_current := v_streak.current_streak + 1;
    v_new_longest := GREATEST(v_new_current, v_streak.longest_streak);
    v_new_freezes := v_streak.freezes_remaining;
    v_status := 'extended';
  ELSIF v_diff > 1 THEN
    v_freezes_to_use := v_diff - 1;
    IF v_streak.freezes_remaining >= v_freezes_to_use THEN
      v_new_current := v_streak.current_streak + 1;
      v_new_longest := GREATEST(v_new_current, v_streak.longest_streak);
      v_new_freezes := v_streak.freezes_remaining - v_freezes_to_use;
      v_freeze_used := NOW();
      v_status := 'freeze_used';
    ELSE
      v_new_current := 1;
      v_new_longest := v_streak.longest_streak;
      v_new_freezes := 2;
      v_status := 'broken';
    END IF;
  ELSE
    v_new_current := v_streak.current_streak;
    v_new_longest := v_streak.longest_streak;
    v_new_freezes := v_streak.freezes_remaining;
    v_status := 'already_recorded';
  END IF;

  v_is_new_record := (v_new_current > v_streak.longest_streak);

  UPDATE public.streaks SET
    current_streak = v_new_current,
    longest_streak = v_new_longest,
    freezes_remaining = v_new_freezes,
    last_activity = NOW(),
    last_freeze_used = COALESCE(v_freeze_used, v_streak.last_freeze_used),
    activity_log = v_log,
    updated_at = NOW()
  WHERE user_id = v_user_id;

  RETURN jsonb_build_object(
    'status', v_status,
    'current_streak', v_new_current,
    'longest_streak', v_new_longest,
    'freezes_remaining', v_new_freezes,
    'is_new_record', v_is_new_record,
    'activity_log', v_log
  );
END;
$$;

REVOKE ALL ON FUNCTION public.record_streak_activity(DATE) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.record_streak_activity(DATE) TO authenticated, service_role;

-- ------------------------------------------------------------------------------
-- 4. Authorized spend_xp RPC
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.spend_xp(
  p_cost INT,
  p_purpose TEXT,
  p_item_id TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_current RECORD;
  v_streak RECORD;
  v_new_xp INT;
  v_new_freezes INT;
  v_max_freezes INT := 2;
  v_cosmetics TEXT[];
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF p_cost <= 0 THEN
    RAISE EXCEPTION 'Cost must be positive';
  END IF;

  SELECT * INTO v_current FROM public.gamification WHERE user_id = v_user_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Gamification profile not found';
  END IF;

  IF v_current.xp < p_cost THEN
    RETURN jsonb_build_object('success', false, 'reason', 'insufficient_xp');
  END IF;

  -- 1. Purpose-specific fulfillment
  IF p_purpose = 'freeze_replenish' THEN
    SELECT * INTO v_streak FROM public.streaks WHERE user_id = v_user_id FOR UPDATE;
    IF FOUND THEN
      -- Master rank (Lv >= 31) gets max 3 freezes
      IF v_current.level >= 31 THEN
        v_max_freezes := 3;
      END IF;

      IF v_streak.freezes_remaining >= v_max_freezes THEN
        RETURN jsonb_build_object('success', false, 'reason', 'max_reached');
      END IF;

      v_new_freezes := LEAST(v_max_freezes, v_streak.freezes_remaining + 1);
      UPDATE public.streaks SET
        freezes_remaining = v_new_freezes,
        updated_at = NOW()
      WHERE user_id = v_user_id;
    END IF;
  ELSIF p_purpose = 'cosmetic_theme' OR p_purpose = 'cosmetic_frame' THEN
    v_cosmetics := COALESCE(v_current.unlocked_cosmetics, '{}'::text[]);
    IF p_item_id IS NOT NULL AND p_item_id = ANY(v_cosmetics) THEN
      RETURN jsonb_build_object('success', false, 'reason', 'already_owned');
    END IF;
    IF p_item_id IS NOT NULL THEN
      v_cosmetics := array_append(v_cosmetics, p_item_id);
      UPDATE public.gamification SET
        unlocked_cosmetics = v_cosmetics,
        updated_at = NOW()
      WHERE user_id = v_user_id;
    END IF;
  END IF;

  v_new_xp := v_current.xp - p_cost;

  UPDATE public.gamification SET
    xp = v_new_xp,
    updated_at = NOW()
  WHERE user_id = v_user_id;

  INSERT INTO public.xp_transactions (user_id, amount, source_type, reference_id, balance_after, created_at)
  VALUES (v_user_id, -p_cost, p_purpose, p_item_id, v_new_xp, NOW());

  RETURN jsonb_build_object(
    'success', true,
    'new_xp', v_new_xp,
    'item_id', p_item_id,
    'purpose', p_purpose
  );
END;
$$;

REVOKE ALL ON FUNCTION public.spend_xp(INT, TEXT, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.spend_xp(INT, TEXT, TEXT) TO authenticated, service_role;

-- ------------------------------------------------------------------------------
-- 5. Server-Authoritative award_study_xp RPC
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.award_study_xp(
  p_activity_type TEXT,
  p_amount INT,
  p_reference_id TEXT DEFAULT NULL,
  p_client_date DATE DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_current RECORD;
  v_allowed_max INT;
  v_new_xp INT;
  v_new_weekly INT;
  v_new_level INT;
  v_new_videos INT;
  v_new_quizzes INT;
  v_current_week TEXT := TO_CHAR(CURRENT_DATE, 'IYYY-"W"IW');
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- 1. Whitelist activity types and cap one-shot increments
  v_allowed_max := CASE p_activity_type
    WHEN 'video_completed' THEN 35
    WHEN 'word_saved' THEN 10
    WHEN 'flashcard_review' THEN 15
    WHEN 'quiz_completed' THEN 25
    WHEN 'daily_mission' THEN 40
    WHEN 'daily_bonus_chest' THEN 60
    WHEN 'grammar_found' THEN 10
    WHEN 'achievement_unlocked' THEN 1000
    ELSE 0
  END;

  IF p_amount <= 0 OR p_amount > v_allowed_max THEN
    RAISE EXCEPTION 'Invalid XP amount % for activity %', p_amount, p_activity_type;
  END IF;

  -- Ensure row exists
  INSERT INTO public.gamification (
    id, user_id, xp, level, weekly_xp, current_week_key, total_videos_watched, total_quizzes_completed
  ) VALUES (
    'game_' || SUBSTRING(REPLACE(v_user_id::text, '-', '') FROM 1 FOR 15),
    v_user_id, 0, 1, 0, v_current_week, 0, 0
  )
  ON CONFLICT (user_id) DO NOTHING;

  SELECT * INTO v_current FROM public.gamification WHERE user_id = v_user_id FOR UPDATE;

  -- 2. Rolling velocity check (Max 600 XP per rolling hour)
  IF v_current.hourly_window_start IS NULL OR v_current.hourly_window_start < (NOW() - INTERVAL '1 hour') THEN
    UPDATE public.gamification SET
      hourly_baseline_xp = v_current.xp,
      hourly_window_start = NOW()
    WHERE user_id = v_user_id;
    v_current.hourly_baseline_xp := v_current.xp;
  ELSIF ((v_current.xp + p_amount) - COALESCE(v_current.hourly_baseline_xp, 0)) > 600 THEN
    RETURN jsonb_build_object(
      'status', 'rate_limited',
      'message', 'Hourly XP ceiling reached (max 600 XP/hr)',
      'xp', v_current.xp,
      'level', v_current.level
    );
  END IF;

  v_new_xp := v_current.xp + p_amount;
  
  -- Reset weekly XP if week boundary changed
  IF v_current.current_week_key IS DISTINCT FROM v_current_week THEN
    v_new_weekly := p_amount;
  ELSE
    v_new_weekly := COALESCE(v_current.weekly_xp, 0) + p_amount;
  END IF;

  -- 50-Level Echelon Model: floor(sqrt(XP / 75)) + 1
  v_new_level := LEAST(50, GREATEST(1, FLOOR(SQRT(v_new_xp / 75.0)) + 1));
  v_new_videos := v_current.total_videos_watched + (CASE WHEN p_activity_type = 'video_completed' THEN 1 ELSE 0 END);
  v_new_quizzes := v_current.total_quizzes_completed + (CASE WHEN p_activity_type = 'quiz_completed' THEN 1 ELSE 0 END);

  UPDATE public.gamification SET
    xp = v_new_xp,
    weekly_xp = v_new_weekly,
    level = v_new_level,
    current_week_key = v_current_week,
    total_videos_watched = v_new_videos,
    total_quizzes_completed = v_new_quizzes,
    updated_at = NOW()
  WHERE user_id = v_user_id;

  INSERT INTO public.xp_transactions (user_id, amount, source_type, reference_id, balance_after, created_at)
  VALUES (v_user_id, p_amount, p_activity_type, p_reference_id, v_new_xp, NOW());

  RETURN jsonb_build_object(
    'status', 'success',
    'xp', v_new_xp,
    'weekly_xp', v_new_weekly,
    'level', v_new_level,
    'total_videos_watched', v_new_videos,
    'total_quizzes_completed', v_new_quizzes
  );
END;
$$;

REVOKE ALL ON FUNCTION public.award_study_xp(TEXT, INT, TEXT, DATE) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.award_study_xp(TEXT, INT, TEXT, DATE) TO authenticated, service_role;

-- ------------------------------------------------------------------------------
-- 6. Trigger adjustment: Allow SECURITY DEFINER updates while preventing direct tampering
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.protect_gamification_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Only enforce restrictions for direct client updates, allow service_role and security definer
  IF CURRENT_USER = 'postgres' THEN
    NEW.updated_at := NOW();
    RETURN NEW;
  END IF;

  IF COALESCE(auth.role(), '') IN ('authenticated', 'anon') THEN
    IF NEW.user_id IS DISTINCT FROM OLD.user_id THEN
      RAISE EXCEPTION 'Cannot reassign gamification ownership';
    END IF;
    -- Direct updates cannot alter XP or levels (must use RPCs)
    IF NEW.xp IS DISTINCT FROM OLD.xp OR NEW.level IS DISTINCT FROM OLD.level THEN
      RAISE EXCEPTION 'Gamification XP and Level can only be modified via authorized RPC procedures';
    END IF;
  END IF;

  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

-- Drop permissive direct insert and update policies to seal DevTools exploits
DROP POLICY IF EXISTS gamification_update_own ON public.gamification;
DROP POLICY IF EXISTS gamification_insert_own ON public.gamification;
-- Only SELECT is permitted for clients; mutations must execute through authorized SECURITY DEFINER RPCs.

-- ------------------------------------------------------------------------------
-- 7. sync_achievements RPC for batch badge synchronization
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.sync_achievements(
  p_unlocked JSONB,
  p_notified JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_current RECORD;
  v_current_week TEXT := TO_CHAR(CURRENT_DATE, 'IYYY-"W"IW');
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  INSERT INTO public.gamification (user_id, xp, level, weekly_xp, current_week_key, updated_at)
  VALUES (v_user_id, 0, 1, 0, v_current_week, NOW())
  ON CONFLICT (user_id) DO NOTHING;

  SELECT * INTO v_current FROM public.gamification WHERE user_id = v_user_id FOR UPDATE;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false);
  END IF;

  UPDATE public.gamification SET
    unlocked_achievements = COALESCE(v_current.unlocked_achievements, '{}'::jsonb) || COALESCE(p_unlocked, '{}'::jsonb),
    notified_achievements = p_notified,
    updated_at = NOW()
  WHERE user_id = v_user_id;

  RETURN jsonb_build_object('success', true);
END;
$$;

REVOKE ALL ON FUNCTION public.sync_achievements(JSONB, JSONB) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.sync_achievements(JSONB, JSONB) TO authenticated, service_role;

-- ------------------------------------------------------------------------------
-- 8. sync_daily_missions RPC for cross-device daily mission persistence
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.sync_daily_missions(p_missions JSONB)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_current_week TEXT := TO_CHAR(CURRENT_DATE, 'IYYY-"W"IW');
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  INSERT INTO public.gamification (user_id, xp, level, weekly_xp, current_week_key, updated_at)
  VALUES (v_user_id, 0, 1, 0, v_current_week, NOW())
  ON CONFLICT (user_id) DO NOTHING;

  UPDATE public.gamification SET
    daily_missions = p_missions,
    updated_at = NOW()
  WHERE user_id = v_user_id;

  RETURN jsonb_build_object('success', true);
END;
$$;

REVOKE ALL ON FUNCTION public.sync_daily_missions(JSONB) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.sync_daily_missions(JSONB) TO authenticated, service_role;


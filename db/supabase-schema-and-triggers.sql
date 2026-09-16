-- ==============================================================================
-- Voca (LinguaTube) — Supabase PostgreSQL Schema, Security Policies & Cron Jobs
-- ==============================================================================

-- 1. Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_cron";

-- ==============================================================================
-- 2. Tables
-- ==============================================================================

-- User Profiles (Mirrors auth.users with public profile, tier & diamond balance)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  subscription_tier TEXT NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'premium')),
  subscription_expires TIMESTAMPTZ,
  diamonds INTEGER NOT NULL DEFAULT 5,
  diamonds_updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  legacy_pb_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Legacy PocketBase Migration Table (Used to link pre-migration accounts)
CREATE TABLE IF NOT EXISTS public.legacy_pb_users (
  pb_id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  name TEXT,
  avatar TEXT,
  subscription_tier TEXT DEFAULT 'free',
  diamonds INTEGER DEFAULT 5,
  claimed_at TIMESTAMPTZ,
  claimed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Synchronized Vocabulary Notebook (SM-2 SRS)
CREATE TABLE IF NOT EXISTS public.vocabulary (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  legacy_user_id TEXT,
  word TEXT NOT NULL,
  reading TEXT,
  pinyin TEXT,
  romanization TEXT,
  meaning TEXT NOT NULL,
  language TEXT NOT NULL CHECK (language IN ('ja', 'zh', 'ko', 'en')),
  level TEXT DEFAULT 'new' CHECK (level IN ('new', 'learning', 'known', 'ignored')),
  examples JSONB DEFAULT '[]'::jsonb,
  ease_factor REAL DEFAULT 2.5,
  interval INTEGER DEFAULT 0,
  repetitions INTEGER DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  last_reviewed_at TIMESTAMPTZ,
  next_review_date TIMESTAMPTZ,
  source_sentence TEXT,
  source_video_id TEXT,
  source_timestamp INTEGER,
  audio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Daily Streaks & Freeze Inventory
CREATE TABLE IF NOT EXISTS public.streaks (
  id TEXT PRIMARY KEY,
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  legacy_user_id TEXT,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_activity TIMESTAMPTZ,
  freezes_remaining INTEGER NOT NULL DEFAULT 2 CHECK (freezes_remaining >= 0),
  last_freeze_used TIMESTAMPTZ,
  activity_log JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Watch Progress & History
CREATE TABLE IF NOT EXISTS public.history (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  legacy_user_id TEXT,
  video_id TEXT NOT NULL,
  title TEXT NOT NULL,
  thumbnail TEXT,
  channel TEXT,
  duration INTEGER DEFAULT 0,
  language TEXT NOT NULL DEFAULT 'ja',
  languages JSONB DEFAULT '[]'::jsonb,
  progress INTEGER DEFAULT 0,
  is_favorite BOOLEAN DEFAULT FALSE,
  watched_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Playlists
CREATE TABLE IF NOT EXISTS public.playlists (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  legacy_user_id TEXT,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  visibility TEXT NOT NULL DEFAULT 'private' CHECK (visibility IN ('public', 'unlisted', 'private')),
  language TEXT NOT NULL DEFAULT 'ja',
  tags JSONB DEFAULT '[]'::jsonb,
  video_ids JSONB DEFAULT '[]'::jsonb,
  video_count INTEGER NOT NULL DEFAULT 0,
  thumbnail TEXT,
  save_count INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Playlist Saves
CREATE TABLE IF NOT EXISTS public.playlist_saves (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  legacy_user_id TEXT,
  playlist_id TEXT NOT NULL REFERENCES public.playlists(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE (user_id, playlist_id)
);

-- Gamification (XP, Levels, Achievements)
CREATE TABLE IF NOT EXISTS public.gamification (
  id TEXT PRIMARY KEY,
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  legacy_user_id TEXT,
  xp INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  weekly_xp INTEGER NOT NULL DEFAULT 0,
  current_week_key TEXT NOT NULL DEFAULT '',
  total_videos_watched INTEGER NOT NULL DEFAULT 0,
  total_quizzes_completed INTEGER NOT NULL DEFAULT 0,
  unlocked_achievements JSONB DEFAULT '{}'::jsonb,
  notified_achievements JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 3. Row Level Security (RLS) Policies
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legacy_pb_users ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.legacy_pb_users FROM anon, authenticated, PUBLIC;
GRANT ALL ON TABLE public.legacy_pb_users TO service_role, postgres;
ALTER TABLE public.vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlist_saves ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gamification ENABLE ROW LEVEL SECURITY;

-- Profiles: Own profile read & update (Protected by trigger from altering sensitive columns)
CREATE POLICY profiles_select_own ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY profiles_update_own ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Vocabulary: Own items only
CREATE POLICY vocabulary_select_own ON public.vocabulary FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY vocabulary_insert_own ON public.vocabulary FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY vocabulary_update_own ON public.vocabulary FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY vocabulary_delete_own ON public.vocabulary FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Streaks: Read-only for authenticated user; all updates MUST go through record_streak_activity RPC
CREATE POLICY streaks_select_own ON public.streaks FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- History: Own watch history only
CREATE POLICY history_select_own ON public.history FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY history_insert_own ON public.history FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY history_update_own ON public.history FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY history_delete_own ON public.history FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Playlists: Public/Unlisted viewable by all; mutations restricted to owner
CREATE POLICY playlists_select ON public.playlists FOR SELECT TO authenticated, anon USING (visibility IN ('published', 'unlisted', 'public') OR auth.uid() = user_id);
CREATE POLICY playlists_insert_own ON public.playlists FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY playlists_update_own ON public.playlists FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY playlists_delete_own ON public.playlists FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Playlist Saves
CREATE POLICY playlist_saves_select_own ON public.playlist_saves FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY playlist_saves_insert_own ON public.playlist_saves FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY playlist_saves_delete_own ON public.playlist_saves FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Gamification: Public can read for leaderboard, owner can update
CREATE POLICY gamification_select_all ON public.gamification FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY gamification_insert_own ON public.gamification FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY gamification_update_own ON public.gamification FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ==============================================================================
-- 4. Server-Side Triggers & Stored Procedures
-- ==============================================================================

-- Trigger: Protect sensitive columns in public.profiles from client-side modification
CREATE OR REPLACE FUNCTION public.protect_profile_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF COALESCE(auth.role(), '') IN ('authenticated', 'anon') THEN
    IF NEW.subscription_tier IS DISTINCT FROM OLD.subscription_tier THEN
      RAISE EXCEPTION 'Cannot modify subscription_tier directly from client';
    END IF;
    IF NEW.subscription_expires IS DISTINCT FROM OLD.subscription_expires THEN
      RAISE EXCEPTION 'Cannot modify subscription_expires directly from client';
    END IF;
    IF NEW.diamonds IS DISTINCT FROM OLD.diamonds THEN
      RAISE EXCEPTION 'Cannot modify diamonds directly from client';
    END IF;
    IF NEW.diamonds_updated_at IS DISTINCT FROM OLD.diamonds_updated_at THEN
      RAISE EXCEPTION 'Cannot modify diamonds_updated_at directly from client';
    END IF;
    IF NEW.legacy_pb_id IS DISTINCT FROM OLD.legacy_pb_id THEN
      RAISE EXCEPTION 'Cannot modify legacy_pb_id directly from client';
    END IF;
    IF NEW.id IS DISTINCT FROM OLD.id THEN
      RAISE EXCEPTION 'Cannot modify user id';
    END IF;
    IF NEW.email IS DISTINCT FROM OLD.email THEN
      RAISE EXCEPTION 'Cannot modify email directly from client';
    END IF;
  END IF;

  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.protect_profile_fields() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.protect_profile_fields() TO postgres, service_role;

DROP TRIGGER IF EXISTS tr_protect_profile_fields ON public.profiles;
CREATE TRIGGER tr_protect_profile_fields
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.protect_profile_fields();

-- Trigger: Server-authoritative gamification protection (VULN-05)
CREATE OR REPLACE FUNCTION public.protect_gamification_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_max_xp_delta CONSTANT INTEGER := 5000;
BEGIN
  IF COALESCE(auth.role(), '') IN ('authenticated', 'anon') THEN
    IF NEW.user_id IS DISTINCT FROM OLD.user_id THEN
      RAISE EXCEPTION 'Cannot reassign gamification ownership';
    END IF;
    IF NEW.xp < OLD.xp THEN
      RAISE EXCEPTION 'Gamification XP cannot decrease';
    END IF;
    IF (NEW.xp - OLD.xp) > v_max_xp_delta THEN
      RAISE EXCEPTION 'Gamification XP batch increase exceeds rate limit (max %)', v_max_xp_delta;
    END IF;
    
    NEW.level := GREATEST(1, FLOOR(SQRT(NEW.xp / 100)) + 1);
    
    IF NEW.weekly_xp < 0 THEN
      NEW.weekly_xp := 0;
    ELSIF NEW.weekly_xp > NEW.xp THEN
      NEW.weekly_xp := NEW.xp;
    END IF;

    IF NEW.total_videos_watched < OLD.total_videos_watched THEN
      RAISE EXCEPTION 'total_videos_watched cannot decrease';
    END IF;
    IF NEW.total_quizzes_completed < OLD.total_quizzes_completed THEN
      RAISE EXCEPTION 'total_quizzes_completed cannot decrease';
    END IF;
  END IF;

  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS tr_protect_gamification_fields ON public.gamification;
CREATE TRIGGER tr_protect_gamification_fields
BEFORE UPDATE ON public.gamification
FOR EACH ROW EXECUTE FUNCTION public.protect_gamification_fields();

REVOKE ALL ON FUNCTION public.protect_gamification_fields() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.protect_gamification_fields() TO postgres, service_role;

-- Trigger: Protect playlist metadata and auto-sync save_count (VULN-07)
CREATE OR REPLACE FUNCTION public.protect_playlist_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF COALESCE(auth.role(), '') IN ('authenticated', 'anon') THEN
    IF NEW.is_featured IS DISTINCT FROM OLD.is_featured THEN
      RAISE EXCEPTION 'Only administrators can modify is_featured';
    END IF;
    NEW.save_count := OLD.save_count;
  END IF;

  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS tr_protect_playlist_fields ON public.playlists;
CREATE TRIGGER tr_protect_playlist_fields
BEFORE UPDATE ON public.playlists
FOR EACH ROW EXECUTE FUNCTION public.protect_playlist_fields();

REVOKE ALL ON FUNCTION public.protect_playlist_fields() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.protect_playlist_fields() TO postgres, service_role;

CREATE OR REPLACE FUNCTION public.sync_playlist_save_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.playlists 
    SET save_count = save_count + 1 
    WHERE id = NEW.playlist_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.playlists 
    SET save_count = GREATEST(0, save_count - 1) 
    WHERE id = OLD.playlist_id;
  END IF;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS tr_sync_playlist_save_count ON public.playlist_saves;
CREATE TRIGGER tr_sync_playlist_save_count
AFTER INSERT OR DELETE ON public.playlist_saves
FOR EACH ROW EXECUTE FUNCTION public.sync_playlist_save_count();

REVOKE ALL ON FUNCTION public.sync_playlist_save_count() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.sync_playlist_save_count() TO postgres, service_role;

-- Trigger: Automatically provisions profile and re-links legacy data on auth user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_legacy_user RECORD;
  v_tier TEXT := 'free';
  v_diamonds INTEGER := 5;
  v_is_email_verified BOOLEAN;
BEGIN
  -- Verify email confirmation or trusted OAuth provider before linking legacy data
  v_is_email_verified := (NEW.email_confirmed_at IS NOT NULL) 
    OR (COALESCE(NEW.raw_app_meta_data->>'provider', '') IN ('google', 'apple', 'github'));

  IF v_is_email_verified AND NEW.email IS NOT NULL THEN
    SELECT * INTO v_legacy_user 
    FROM public.legacy_pb_users 
    WHERE email = NEW.email 
      AND claimed_at IS NULL
    FOR UPDATE;

    IF FOUND THEN
      v_tier := COALESCE(v_legacy_user.subscription_tier, 'free');
      IF v_tier = 'premium' THEN
        v_diamonds := GREATEST(25, COALESCE(v_legacy_user.diamonds, 25));
      ELSIF v_tier = 'pro' THEN
        v_diamonds := GREATEST(10, COALESCE(v_legacy_user.diamonds, 10));
      ELSE
        v_diamonds := COALESCE(v_legacy_user.diamonds, 5);
      END IF;

      UPDATE public.vocabulary SET user_id = NEW.id WHERE legacy_user_id = v_legacy_user.pb_id;
      UPDATE public.streaks SET user_id = NEW.id WHERE legacy_user_id = v_legacy_user.pb_id;
      UPDATE public.history SET user_id = NEW.id WHERE legacy_user_id = v_legacy_user.pb_id;
      UPDATE public.playlists SET user_id = NEW.id WHERE legacy_user_id = v_legacy_user.pb_id;
      UPDATE public.playlist_saves SET user_id = NEW.id WHERE legacy_user_id = v_legacy_user.pb_id;
      UPDATE public.gamification SET user_id = NEW.id WHERE legacy_user_id = v_legacy_user.pb_id;

      UPDATE public.legacy_pb_users 
      SET claimed_at = NOW(), claimed_by = NEW.id 
      WHERE pb_id = v_legacy_user.pb_id;
    END IF;
  END IF;

  INSERT INTO public.profiles (id, email, name, avatar_url, subscription_tier, diamonds, legacy_pb_id)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', ''),
    v_tier,
    v_diamonds,
    v_legacy_user.pb_id
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    name = COALESCE(NULLIF(EXCLUDED.name, ''), profiles.name),
    avatar_url = COALESCE(NULLIF(EXCLUDED.avatar_url, ''), profiles.avatar_url);

  INSERT INTO public.streaks (id, user_id, current_streak, longest_streak, freezes_remaining)
  VALUES ('streak_' || NEW.id, NEW.id, 0, 0, 2)
  ON CONFLICT (user_id) DO NOTHING;

  INSERT INTO public.gamification (id, user_id, xp, level, weekly_xp)
  VALUES ('game_' || NEW.id, NEW.id, 0, 1, 0)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO postgres, service_role;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

DROP TRIGGER IF EXISTS on_auth_user_email_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_email_confirmed
AFTER UPDATE OF email_confirmed_at ON auth.users
FOR EACH ROW 
WHEN (OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT NULL)
EXECUTE FUNCTION public.handle_new_user();

-- RPC: Atomic streak activity recorder
CREATE OR REPLACE FUNCTION public.record_streak_activity()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_streak RECORD;
  v_today DATE := CURRENT_DATE;
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
  v_today_str TEXT := TO_CHAR(v_today, 'YYYY-MM-DD');
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Acquire exclusive row-level lock to prevent concurrent update races
  SELECT * INTO v_streak FROM public.streaks WHERE user_id = v_user_id FOR UPDATE;

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

  IF v_last_date = v_today THEN
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

REVOKE EXECUTE ON FUNCTION public.record_streak_activity() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.record_streak_activity() TO authenticated, service_role;

-- ==============================================================================
-- 5. pg_cron Scheduled Repeat Jobs
-- ==============================================================================

-- 1. Hourly subscription downgrade check
SELECT cron.schedule(
  'downgrade-expired-subscriptions',
  '5 * * * *',
  $$
  UPDATE public.profiles
  SET subscription_tier = 'free',
      updated_at = NOW()
  WHERE subscription_expires IS NOT NULL
    AND subscription_expires < NOW()
    AND subscription_tier != 'free';
  $$
);

-- 2. Weekly Leaderboard XP reset every Monday 00:00 UTC
SELECT cron.schedule(
  'reset-weekly-leaderboard-xp',
  '0 0 * * 1',
  $$
  UPDATE public.gamification
  SET weekly_xp = 0,
      current_week_key = to_char(now(), 'IYYY-"W"IW'),
      updated_at = NOW();
  $$
);

-- 3. Daily inactive streak evaluation at 01:00 UTC
SELECT cron.schedule(
  'evaluate-inactive-streaks',
  '0 1 * * *',
  $$
  UPDATE public.streaks
  SET current_streak = 0,
      updated_at = NOW()
  WHERE last_activity IS NOT NULL
    AND (CURRENT_DATE - (last_activity AT TIME ZONE 'UTC')::date) > (1 + freezes_remaining)
    AND current_streak > 0;
  $$
);

-- ==============================================================================
-- 6. Performance & Covering Indexes
-- ==============================================================================

CREATE INDEX IF NOT EXISTS idx_vocabulary_user_updated 
  ON public.vocabulary (user_id, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_gamification_weekly_xp 
  ON public.gamification (weekly_xp DESC, xp DESC);

CREATE INDEX IF NOT EXISTS idx_playlists_community 
  ON public.playlists (visibility, is_featured DESC, save_count DESC);

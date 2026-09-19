-- Migration: 20260918_leaderboard_video_levels_orders.sql
-- 1. Add target_lang and country to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS target_lang TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS country TEXT;

-- 2. get_leaderboard RPC function
CREATE OR REPLACE FUNCTION public.get_leaderboard(
  p_lang text DEFAULT 'all',
  p_period text DEFAULT 'weekly',
  p_limit int DEFAULT 50
)
RETURNS TABLE (
  rank bigint,
  user_id text,
  name text,
  avatar text,
  xp integer,
  weekly_xp integer,
  level integer,
  streak integer,
  badges_count bigint,
  target_lang text,
  country text
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ROW_NUMBER() OVER (
      ORDER BY 
        CASE WHEN p_period = 'all_time' THEN COALESCE(g.xp, 0) ELSE COALESCE(g.weekly_xp, 0) END DESC,
        COALESCE(g.xp, 0) DESC
    ) AS rank,
    p.id::text AS user_id,
    COALESCE(NULLIF(p.name, ''), 'Learner') AS name,
    COALESCE(p.avatar_url, '') AS avatar,
    COALESCE(g.xp, 0) AS xp,
    COALESCE(g.weekly_xp, 0) AS weekly_xp,
    COALESCE(g.level, 1) AS level,
    COALESCE(s.current_streak, 0) AS streak,
    COALESCE(
      CASE 
        WHEN jsonb_typeof(g.unlocked_achievements) = 'object' THEN (SELECT count(*) FROM jsonb_object_keys(g.unlocked_achievements))
        WHEN jsonb_typeof(g.unlocked_achievements) = 'array' THEN jsonb_array_length(g.unlocked_achievements)
        ELSE 0
      END,
      0
    )::bigint AS badges_count,
    COALESCE(p.target_lang, 'all') AS target_lang,
    COALESCE(p.country, '') AS country
  FROM public.profiles p
  JOIN public.gamification g ON g.user_id = p.id
  LEFT JOIN public.streaks s ON s.user_id = p.id
  WHERE g.xp > 0
    AND (p_lang = 'all' OR p_lang IS NULL OR p.target_lang = p_lang)
  ORDER BY 
    CASE WHEN p_period = 'all_time' THEN COALESCE(g.xp, 0) ELSE COALESCE(g.weekly_xp, 0) END DESC,
    COALESCE(g.xp, 0) DESC
  LIMIT p_limit;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_leaderboard(text, text, int) TO anon, authenticated;

-- 3. video_levels table with RLS
CREATE TABLE IF NOT EXISTS public.video_levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id TEXT NOT NULL,
  language TEXT NOT NULL,
  level TEXT NOT NULL,
  confidence REAL DEFAULT 0.8,
  method TEXT DEFAULT 'linguistics',
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_video_levels_vid_lang ON public.video_levels(video_id, language);
ALTER TABLE public.video_levels ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "video_levels_select" ON public.video_levels;
CREATE POLICY "video_levels_select" ON public.video_levels FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "video_levels_insert" ON public.video_levels;
CREATE POLICY "video_levels_insert" ON public.video_levels FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = user_id);
GRANT SELECT, INSERT ON public.video_levels TO anon, authenticated;

-- 4. orders table with RLS
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_code BIGINT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL,
  tier TEXT NOT NULL,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  payment_link_id TEXT,
  checkout_url TEXT,
  qr_code TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_code ON public.orders(order_code);
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "orders_select_own" ON public.orders;
CREATE POLICY "orders_select_own" ON public.orders FOR SELECT TO authenticated USING ((SELECT auth.uid()) = user_id);
GRANT SELECT ON public.orders TO authenticated;

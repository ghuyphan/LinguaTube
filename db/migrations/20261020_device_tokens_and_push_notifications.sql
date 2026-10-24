-- Migration: Device Tokens and Streak Push Notification targets
-- Created: 2026-10-20

CREATE TABLE IF NOT EXISTS public.device_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    token TEXT NOT NULL,
    platform TEXT NOT NULL, -- 'android', 'ios', 'macos', 'web'
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT device_tokens_user_token_uniq UNIQUE(user_id, token)
);

CREATE INDEX IF NOT EXISTS idx_device_tokens_user_id ON public.device_tokens(user_id);

ALTER TABLE public.device_tokens ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'device_tokens' AND policyname = 'Users can manage their own device tokens'
    ) THEN
        CREATE POLICY "Users can manage their own device tokens"
            ON public.device_tokens
            FOR ALL
            TO authenticated
            USING (auth.uid() = user_id)
            WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;

-- RPC to retrieve active streak users who need gentle reminders
CREATE OR REPLACE FUNCTION public.get_streak_reminder_targets()
RETURNS TABLE (
    user_id UUID,
    user_name TEXT,
    target_lang TEXT,
    current_streak INT,
    device_token TEXT,
    platform TEXT
)
LANGUAGE sql
SECURITY DEFINER
AS $$
    SELECT 
        s.user_id,
        COALESCE(p.name, 'Learner') AS user_name,
        COALESCE(p.target_lang, 'en') AS target_lang,
        s.current_streak,
        dt.token AS device_token,
        dt.platform
    FROM public.streaks s
    JOIN public.device_tokens dt ON dt.user_id = s.user_id
    LEFT JOIN public.profiles p ON p.id = s.user_id
    WHERE s.current_streak > 0
      AND (s.last_activity IS NULL OR s.last_activity < (now() - interval '18 hours'))
    ORDER BY s.current_streak DESC;
$$;

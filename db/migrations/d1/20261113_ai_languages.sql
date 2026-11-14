-- Track AI-generated transcript languages explicitly alongside native available_languages.
ALTER TABLE video_languages ADD COLUMN ai_languages TEXT DEFAULT '[]';

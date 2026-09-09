-- Migration: Add channel_avatar column to video_languages table
-- Run with: npx wrangler d1 execute linguatube-vocab --file=db/add-channel-avatar.sql --remote

ALTER TABLE video_languages ADD COLUMN channel_avatar TEXT;

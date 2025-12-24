-- Migration: Add pending state columns to transcripts table
-- Run with: npx wrangler d1 execute linguatube-vocab --file=db/add-pending-columns.sql --remote

ALTER TABLE transcripts ADD COLUMN status TEXT DEFAULT 'complete';
ALTER TABLE transcripts ADD COLUMN gladia_result_url TEXT;

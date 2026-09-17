import { SubtitleCue } from './index';

export interface TranscriptSegment {
  id?: number;
  text: string;
  start: number;
  duration: number;
}

export interface TranscriptResponse {
  success: boolean;
  videoId?: string;
  language?: string;
  requestedLanguage?: string;
  segments?: TranscriptSegment[];
  source?: 'cache' | 'native' | 'ai' | 'none';
  sourceDetail?: string;
  availableLanguages?: {
    native: string[];
    ai: string[];
  };
  subLanguages?: string[];
  levels?: Record<string, string>;
  whisperAvailable?: boolean;
  diamonds?: number;
  maxDiamonds?: number;
  nextRegenAt?: number | null;
  regenIntervalMs?: number;
  warning?: string;
  error?: string;
  errorCode?: string;
  retryAfter?: number;
  languageMismatch?: boolean;
  status?: 'processing';
  jobId?: string;
  resultUrl?: string; // Optional legacy fallback
  timing?: number;
}

export interface DiamondStatusResponse {
  success: boolean;
  diamonds: number;
  maxDiamonds: number;
  nextRegenAt: number | null;
  regenIntervalMs?: number;
  tier?: 'free' | 'pro' | 'premium';
  maxVideoDurationSec?: number;
}

export interface ActiveAiJob {
  jobId: string;
  videoId: string;
  language: string;
  startedAt: number;
  title?: string;
  channel?: string;
  pollAttempts?: number;
  consecutiveErrors?: number;
  status: 'queued' | 'processing' | 'done' | 'error';
  error?: string;
  errorCode?: string;
}

export type TranscriptState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'generating_ai'; jobId?: string; isResuming?: boolean }
  | { status: 'complete'; language: string; requestedLanguage?: string; languageMismatch?: boolean; source: 'native' | 'ai'; cues: SubtitleCue[] }
  | { status: 'error'; code: string; whisperAvailable: boolean; retryAfter?: number };

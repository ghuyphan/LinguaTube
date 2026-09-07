import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GrammarService } from '../../services/grammar.service';
import {
    SubtitleCue,
    VideoLevelInfo,
    ProficiencyLevelTier,
    SupportedGrammarLang
} from '../../models';

const STORAGE_KEY = 'linguatube_video_levels';
const TITLE_REGEX = {
    ja: /\b(?:JLPT\s*)?N([1-5])\b/i,
    zh: /\bHSK\s*([1-6])\b/i,
    ko: /\bTOPIK\s*([1-6]|I{1,2})\b/i,
    en: /\b(?:CEFR\s*)?([A-C][1-2])\b/i,
};

@Injectable({
    providedIn: 'root'
})
export class VideoLevelService {
    private http = inject(HttpClient);
    private grammar = inject(GrammarService);

    // Reactive state
    readonly currentLevel = signal<VideoLevelInfo | null>(null);
    readonly isAnalyzing = signal<boolean>(false);

    // Cache: videoId_lang -> VideoLevelInfo
    private levelCache = new Map<string, VideoLevelInfo>();

    constructor() {
        this.loadCacheFromStorage();
    }

    /**
     * Get level for video synchronously from cache
     */
    getCachedLevel(videoId: string, lang: string): VideoLevelInfo | null {
        return this.levelCache.get(`${videoId}_${lang}`) || null;
    }

    /**
     * Evaluate difficulty level for a video
     * Priority:
     * 1. Cached in memory / storage
     * 2. Provided by server via video-info / transcript
     * 3. Title / Channel heuristics
     * 4. Linguistic evaluation of subtitle cues (grammar pattern density + speech rate)
     */
    async assessLevel(
        videoId: string,
        lang: string,
        title = '',
        channel = '',
        cues: SubtitleCue[] = [],
        serverLevels?: Record<string, string>
    ): Promise<VideoLevelInfo | null> {
        if (!videoId || !lang) return null;

        const cacheKey = `${videoId}_${lang}`;
        if (this.levelCache.has(cacheKey)) {
            const cached = this.levelCache.get(cacheKey)!;
            this.currentLevel.set(cached);
            return cached;
        }

        // 1. Check server-provided level
        if (serverLevels?.[lang]) {
            const serverLevel = serverLevels[lang];
            const info = this.buildInfoFromLabel(serverLevel, 'server');
            this.setCache(cacheKey, info);
            this.currentLevel.set(info);
            return info;
        }

        // 2. Fast-path: Title/Channel regex
        const titleDetected = this.detectFromMetadata(title, channel, lang);
        if (titleDetected) {
            const info = this.buildInfoFromLabel(titleDetected, 'title');
            this.setCache(cacheKey, info);
            this.currentLevel.set(info);
            this.saveToServer(videoId, lang, titleDetected);
            return info;
        }

        // 3. Deep linguistic analysis if cues are available
        if (cues.length > 0 && this.isSupportedGrammarLang(lang)) {
            this.isAnalyzing.set(true);
            try {
                const info = await this.analyzeCuesLinguistically(cues, lang as SupportedGrammarLang);
                if (info) {
                    this.setCache(cacheKey, info);
                    this.currentLevel.set(info);
                    this.saveToServer(videoId, lang, info.level);
                    return info;
                }
            } finally {
                this.isAnalyzing.set(false);
            }
        }

        return null;
    }

    /**
     * Parse title or channel description for standard level markers
     */
    private detectFromMetadata(title: string, channel: string, lang: string): string | null {
        const text = `${title} ${channel}`;
        const regex = TITLE_REGEX[lang as keyof typeof TITLE_REGEX];
        if (!regex) return null;

        const match = text.match(regex);
        if (!match) return null;

        switch (lang) {
            case 'ja': return `JLPT N${match[1]}`;
            case 'zh': return `HSK ${match[1]}`;
            case 'ko': return `TOPIK ${match[1]}`;
            case 'en': return `CEFR ${match[1].toUpperCase()}`;
            default: return null;
        }
    }

    /**
     * Linguistic analysis using GrammarService patterns and speech rate (chars/min)
     */
    private async analyzeCuesLinguistically(cues: SubtitleCue[], lang: SupportedGrammarLang): Promise<VideoLevelInfo | null> {
        this.grammar.preloadPatterns(lang);

        const breakdown: Record<string, number> = {};
        let totalPatterns = 0;
        let totalChars = 0;
        let totalSpokenSeconds = 0;

        for (const cue of cues) {
            const cueDuration = Math.max(0.2, (cue.endTime || 0) - (cue.startTime || 0));
            totalSpokenSeconds += cueDuration;
            totalChars += cue.text ? cue.text.trim().length : 0;

            if (cue.tokens && cue.tokens.length > 0) {
                const matches = this.grammar.detectPatterns(cue.tokens, lang);
                for (const m of matches) {
                    const level = m.pattern.level;
                    if (level) {
                        breakdown[level] = (breakdown[level] || 0) + 1;
                        totalPatterns++;
                    }
                }
            }
        }

        // Calculate speech rate (characters per minute)
        const spokenMinutes = Math.max(0.1, totalSpokenSeconds / 60);
        const cpm = Math.round(totalChars / spokenMinutes);

        // Calculate weighted score from pattern distribution
        const levelResult = this.computeScoreFromBreakdown(breakdown, lang, cpm, totalPatterns);
        if (!levelResult) return null;

        return {
            level: levelResult.level,
            tier: levelResult.tier,
            score: levelResult.score,
            confidence: levelResult.confidence,
            grammarCount: totalPatterns,
            speechRateCpm: cpm,
            detectedFrom: 'linguistics',
            breakdown
        };
    }

    /**
     * Compute composite difficulty score
     */
    private computeScoreFromBreakdown(
        breakdown: Record<string, number>,
        lang: SupportedGrammarLang,
        cpm: number,
        totalPatterns: number
    ): { level: string; tier: ProficiencyLevelTier; score: number; confidence: number } | null {
        if (totalPatterns === 0) {
            // Default to elementary if speech rate is normal, beginner if slow
            return this.getDefaultBySpeechRate(lang, cpm);
        }

        let totalWeight = 0;
        let weightedSum = 0;

        for (const [lvl, count] of Object.entries(breakdown)) {
            const numericVal = this.levelToNumeric(lvl, lang);
            weightedSum += numericVal * count;
            totalWeight += count;
        }

        let avgScore = totalWeight > 0 ? weightedSum / totalWeight : 1.5;

        // Speed penalty / bump: Fast native speech (> 280 CPM for JA/KO/ZH, > 170 WPM for EN)
        const isFastSpeech = (lang === 'en' ? cpm > 170 : cpm > 280);
        if (isFastSpeech && avgScore < 4.0) {
            avgScore += 0.4;
        }

        const levelString = this.numericToLevel(Math.round(avgScore), lang);
        const tier = this.scoreToTier(avgScore, lang);
        const confidence = Math.min(0.95, 0.5 + (totalPatterns * 0.03));

        return { level: levelString, tier, score: Math.round(avgScore * 10) / 10, confidence };
    }

    private getDefaultBySpeechRate(lang: SupportedGrammarLang, cpm: number): { level: string; tier: ProficiencyLevelTier; score: number; confidence: number } {
        const isSlow = (lang === 'en' ? cpm < 120 : cpm < 180);
        const score = isSlow ? 1.0 : 2.0;
        return {
            level: this.numericToLevel(score, lang),
            tier: isSlow ? 'beginner' : 'elementary',
            score,
            confidence: 0.6
        };
    }

    private levelToNumeric(level: string, lang: SupportedGrammarLang): number {
        const clean = level.toUpperCase();
        if (lang === 'ja') {
            if (clean.includes('N5')) return 1;
            if (clean.includes('N4')) return 2;
            if (clean.includes('N3')) return 3;
            if (clean.includes('N2')) return 4;
            if (clean.includes('N1')) return 5;
        } else if (lang === 'zh') {
            const m = clean.match(/(\d)/);
            if (m) return parseInt(m[1], 10);
        } else if (lang === 'ko') {
            const m = clean.match(/(\d)/);
            if (m) return parseInt(m[1], 10);
        } else if (lang === 'en') {
            if (clean.includes('A1')) return 1;
            if (clean.includes('A2')) return 2;
            if (clean.includes('B1')) return 3;
            if (clean.includes('B2')) return 4;
            if (clean.includes('C1')) return 5;
            if (clean.includes('C2')) return 6;
        }
        return 2;
    }

    private numericToLevel(score: number, lang: SupportedGrammarLang): string {
        const clamped = Math.max(1, score);
        if (lang === 'ja') {
            const n = Math.min(5, Math.max(1, 6 - Math.round(clamped))); // 1 -> N5, 5 -> N1
            return `JLPT N${n}`;
        }
        if (lang === 'zh') {
            const n = Math.min(6, Math.max(1, Math.round(clamped)));
            return `HSK ${n}`;
        }
        if (lang === 'ko') {
            const n = Math.min(6, Math.max(1, Math.round(clamped)));
            return `TOPIK ${n}`;
        }
        if (lang === 'en') {
            const cefr = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
            return `CEFR ${cefr[Math.min(5, Math.max(0, Math.round(clamped) - 1))]}`;
        }
        return `Level ${Math.round(clamped)}`;
    }

    private scoreToTier(score: number, lang: SupportedGrammarLang): ProficiencyLevelTier {
        const max = (lang === 'zh' || lang === 'ko' || lang === 'en') ? 6 : 5;
        const normalized = score / max;
        if (normalized <= 0.25) return 'beginner';
        if (normalized <= 0.45) return 'elementary';
        if (normalized <= 0.65) return 'intermediate';
        if (normalized <= 0.85) return 'upper_intermediate';
        return 'advanced';
    }

    private buildInfoFromLabel(label: string, detectedFrom: 'title' | 'server'): VideoLevelInfo {
        const upper = label.toUpperCase();
        let tier: ProficiencyLevelTier = 'intermediate';
        let score = 2.5;

        if (upper.includes('N5') || upper.includes('HSK 1') || upper.includes('A1') || upper.includes('BEGINNER')) {
            tier = 'beginner';
            score = 1.0;
        } else if (upper.includes('N4') || upper.includes('HSK 2') || upper.includes('A2') || upper.includes('ELEMENTARY')) {
            tier = 'elementary';
            score = 2.0;
        } else if (upper.includes('N3') || upper.includes('HSK 3') || upper.includes('HSK 4') || upper.includes('B1') || upper.includes('INTERMEDIATE')) {
            tier = 'intermediate';
            score = 3.0;
        } else if (upper.includes('N2') || upper.includes('HSK 5') || upper.includes('B2')) {
            tier = 'upper_intermediate';
            score = 4.0;
        } else if (upper.includes('N1') || upper.includes('HSK 6') || upper.includes('C1') || upper.includes('C2') || upper.includes('ADVANCED')) {
            tier = 'advanced';
            score = 5.0;
        }

        return {
            level: label,
            tier,
            score,
            confidence: 0.9,
            grammarCount: 0,
            detectedFrom
        };
    }

    private isSupportedGrammarLang(lang: string): lang is SupportedGrammarLang {
        return ['ja', 'zh', 'ko', 'en'].includes(lang);
    }

    private setCache(key: string, info: VideoLevelInfo): void {
        this.levelCache.set(key, info);
        this.saveCacheToStorage();
    }

    private loadCacheFromStorage(): void {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const data = JSON.parse(raw);
                for (const [k, v] of Object.entries(data)) {
                    this.levelCache.set(k, v as VideoLevelInfo);
                }
            }
        } catch { }
    }

    private saveCacheToStorage(): void {
        try {
            const obj: Record<string, VideoLevelInfo> = {};
            // Keep last 100 entries to prevent bloat
            const entries = Array.from(this.levelCache.entries()).slice(-100);
            for (const [k, v] of entries) {
                obj[k] = v;
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
        } catch { }
    }

    private saveToServer(videoId: string, language: string, level: string): void {
        // Fire and forget POST to /api/video-level
        this.http.post('/api/video-level', { videoId, language, level }).subscribe({
            next: () => {},
            error: () => {} // Non-blocking if fails/offline
        });
    }
}

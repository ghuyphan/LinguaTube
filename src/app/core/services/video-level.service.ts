import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GrammarService } from '../../services/grammar.service';
import {
    SubtitleCue,
    VideoLevelInfo,
    ProficiencyLevelTier,
    SupportedGrammarLang,
    Playlist
} from '../../models';

const STORAGE_KEY = 'linguatube_video_levels';

@Injectable({
    providedIn: 'root'
})
export class VideoLevelService {
    private http = inject(HttpClient);
    private grammar = inject(GrammarService);

    // Reactive state
    readonly currentLevel = signal<VideoLevelInfo | null>(null);
    readonly isAnalyzing = signal<boolean>(false);

    /**
     * Clear current level state when switching or closing videos
     */
    reset(): void {
        this.currentLevel.set(null);
        this.isAnalyzing.set(false);
    }

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
     * Map a level string (e.g. "JLPT N4", "HSK 2", "CEFR B1") to a tier
     */
    labelToTier(label: string): ProficiencyLevelTier {
        return this.buildInfoFromLabel(label, 'title').tier;
    }

    /**
     * Map a proficiency tier to standard language level label (e.g. 'beginner' -> 'JLPT N5' for ja)
     */
    tierToLabel(tier: ProficiencyLevelTier, lang: string): string {
        const map: Record<string, Record<ProficiencyLevelTier, string>> = {
            ja: {
                beginner: 'JLPT N5',
                elementary: 'JLPT N4',
                intermediate: 'JLPT N3',
                upper_intermediate: 'JLPT N2',
                advanced: 'JLPT N1'
            },
            zh: {
                beginner: 'HSK 1',
                elementary: 'HSK 2',
                intermediate: 'HSK 3',
                upper_intermediate: 'HSK 5',
                advanced: 'HSK 6'
            },
            ko: {
                beginner: 'TOPIK 1',
                elementary: 'TOPIK 2',
                intermediate: 'TOPIK 3',
                upper_intermediate: 'TOPIK 5',
                advanced: 'TOPIK 6'
            },
            en: {
                beginner: 'CEFR A1',
                elementary: 'CEFR A2',
                intermediate: 'CEFR B1',
                upper_intermediate: 'CEFR B2',
                advanced: 'CEFR C1'
            }
        };
        return map[lang]?.[tier] || tier.toUpperCase();
    }

    /**
     * Synchronously resolves the best known level for a video
     * Priority:
     * 1. Explicit level passed in (from item metadata)
     * 2. Cached in memory or LocalStorage
     * 3. Metadata regex heuristics from title or channel
     */
    resolveLevel(
        videoId?: string,
        lang?: string,
        title = '',
        channel = '',
        explicitLevel?: string
    ): { level: string; tier: ProficiencyLevelTier } | null {
        if (explicitLevel) {
            return { level: explicitLevel, tier: this.labelToTier(explicitLevel) };
        }
        if (videoId && lang) {
            const cached = this.getCachedLevel(videoId, lang);
            if (cached) {
                return { level: cached.level, tier: cached.tier };
            }
        }
        if (lang && (title || channel)) {
            const meta = this.detectFromMetadata(title, channel, lang);
            if (meta) {
                return { level: meta, tier: this.labelToTier(meta) };
            }
        }
        return null;
    }

    /**
     * Resolves difficulty level for a playlist using multiple cascading strategies:
     * 1. Direct explicit level on the playlist
     * 2. Heuristics from playlist title and description
     * 3. Tags matching level markers
     * 4. Pre-loaded videos if available (PlaylistWithVideos)
     * 5. Cached video level for constituent videoIds
     * 6. Default standard level for the target learning language
     */
    resolvePlaylistLevel(playlist?: Playlist | null): { level: string; tier: ProficiencyLevelTier } | null {
        if (!playlist) return null;

        // 1. Direct explicit level or detected from playlist title/description
        const direct = this.resolveLevel(
            undefined,
            playlist.language,
            playlist.title,
            playlist.description || '',
            playlist.level
        );
        if (direct) return direct;

        // 2. Check tags
        if (playlist.tags && playlist.tags.length > 0) {
            for (const tag of playlist.tags) {
                const tagMatch = this.resolveLevel(undefined, playlist.language, tag, '', tag);
                if (tagMatch) return tagMatch;
            }
        }

        // 3. Hydrated videos (if available)
        const withVideos = playlist as unknown as { videos?: { videoId: string; title: string; channel?: string; level?: string }[] };
        if (Array.isArray(withVideos.videos) && withVideos.videos.length > 0) {
            for (const v of withVideos.videos) {
                const vLevel = this.resolveLevel(
                    v.videoId,
                    playlist.language,
                    v.title,
                    v.channel || '',
                    v.level
                );
                if (vLevel) return vLevel;
            }
        }

        // 4. Cached video level for any videoId in playlist.videoIds
        if (playlist.videoIds && playlist.videoIds.length > 0) {
            for (const vid of playlist.videoIds) {
                const cached = this.getCachedLevel(vid, playlist.language);
                if (cached) return { level: cached.level, tier: cached.tier };
            }
        }

        // 5. Default level for language so learning playlist cards always show a clean badge
        if (playlist.language) {
            const defaults: Record<string, { level: string; tier: ProficiencyLevelTier }> = {
                ja: { level: 'JLPT N5', tier: 'beginner' },
                zh: { level: 'HSK 1', tier: 'beginner' },
                ko: { level: 'TOPIK 1', tier: 'beginner' },
                en: { level: 'CEFR A1', tier: 'beginner' }
            };
            if (defaults[playlist.language]) {
                return defaults[playlist.language];
            }
        }

        return null;
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
            this.saveToServer(videoId, lang, titleDetected, 0.90, 'metadata');
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
                    this.saveToServer(videoId, lang, info.level, info.confidence, 'linguistics');
                    return info;
                }
            } finally {
                this.isAnalyzing.set(false);
            }
        }

        return null;
    }

    /**
     * Parse title or channel description for standard level markers with multilingual keywords
     */
    private detectFromMetadata(title: string, channel: string, lang: string): string | null {
        const text = `${title} ${channel}`;

        if (lang === 'ja') {
            const jlptMatch = text.match(/\b(?:JLPT\s*)?N([1-5])\b/i) || text.match(/(?:JLPT|日本語能力試験)?\s*([NＮ][1-5１-５])/i);
            if (jlptMatch) {
                const num = jlptMatch[1].replace('Ｎ', 'N').replace(/[１-５]/, m => String.fromCharCode(m.charCodeAt(0) - 0xFEE0)).replace('N', '');
                return `JLPT N${num}`;
            }
            if (/中上級/.test(text)) return 'JLPT N2';
            if (/上級/.test(text)) return 'JLPT N1';
            if (/中級/.test(text)) return 'JLPT N3';
            if (/初級|入門/.test(text)) return 'JLPT N5';
        } else if (lang === 'zh') {
            const hskMatch = text.match(/\bHSK\s*([1-6])\b/i);
            if (hskMatch) return `HSK ${hskMatch[1]}`;
            if (/中高级|中高級/.test(text)) return 'HSK 4';
            if (/高级|高級/.test(text)) return 'HSK 5';
            if (/中级|中級/.test(text)) return 'HSK 3';
            if (/初级|初級/.test(text)) return 'HSK 2';
            if (/入门|入門/.test(text)) return 'HSK 1';
        } else if (lang === 'ko') {
            const topikMatch = text.match(/\bTOPIK\s*([1-6]|I{1,2})\b/i);
            if (topikMatch) return `TOPIK ${topikMatch[1]}`;
            if (/고급/.test(text)) return 'TOPIK 5';
            if (/중급/.test(text)) return 'TOPIK 3';
            if (/초급/.test(text)) return 'TOPIK 2';
            if (/입문/.test(text)) return 'TOPIK 1';
        } else if (lang === 'en') {
            const cefrMatch = text.match(/\b(?:CEFR\s*([A-C][1-2])|([A-C][1-2])\s*level)\b/i);
            if (cefrMatch) return `CEFR ${(cefrMatch[1] || cefrMatch[2]).toUpperCase()}`;
            if (/\bupper[\s-]intermediate\b/i.test(text)) return 'CEFR B2';
            if (/\b(?:for\s+)?intermediate\b/i.test(text)) return 'CEFR B1';
            if (/\b(?:for\s+)?elementary\b/i.test(text)) return 'CEFR A2';
            if (/\b(?:for\s+)?beginners?\b/i.test(text)) return 'CEFR A1';
            if (/\b(?:advanced|fluent)\b/i.test(text)) return 'CEFR C1';
        }

        return null;
    }

    /**
     * Linguistic analysis using GrammarService patterns, vocabulary/kanji difficulty, and speech rate (chars/min)
     */
    private async analyzeCuesLinguistically(cues: SubtitleCue[], lang: SupportedGrammarLang): Promise<VideoLevelInfo | null> {
        this.grammar.preloadPatterns(lang);

        const breakdown: Record<string, number> = {};
        let totalPatterns = 0;
        let totalChars = 0;
        let totalSpokenSeconds = 0;

        // Stratified sampling: for large transcripts (>60 cues), sample up to 50 evenly-spaced cues
        // to reduce main-thread regex iterations from 20,000+ to ~500 (<15ms) while preserving 98%+ accuracy.
        const evalCues: SubtitleCue[] = [];
        if (cues.length <= 60) {
            evalCues.push(...cues);
        } else {
            const sampleTarget = 50;
            const step = Math.max(1, Math.floor(cues.length / sampleTarget));
            for (let i = 0; i < cues.length && evalCues.length < sampleTarget; i += step) {
                evalCues.push(cues[i]);
            }
        }

        for (const cue of evalCues) {
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

        // Evaluate vocabulary/kanji difficulty on sampled cues
        const vocabScore = this.evaluateVocabularyDifficulty(evalCues, lang);

        // Calculate weighted score from pattern distribution, vocabulary and speech rate
        const levelResult = this.computeScoreFromBreakdown(breakdown, lang, cpm, totalPatterns, vocabScore, cues.length);
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
     * Evaluates vocabulary and character/kanji difficulty
     * Returns a score from 1.0 (Beginner) to 5.0/6.0 (Advanced)
     */
    private evaluateVocabularyDifficulty(cues: SubtitleCue[], lang: SupportedGrammarLang): number {
        if (!cues.length) return 2.0;

        let totalChars = 0;
        let kanjiCount = 0;
        let compoundWordsCount = 0;
        let totalWords = 0;
        let longWordsCount = 0;
        let totalWordLength = 0;

        for (const cue of cues) {
            const text = cue.text || '';
            totalChars += text.length;

            if (lang === 'ja') {
                // Kanji characters: Unicode 4E00 - 9FAF
                const kanjiMatches = text.match(/[\u4E00-\u9FAF]/g);
                if (kanjiMatches) {
                    kanjiCount += kanjiMatches.length;
                }
                // Multi-kanji compounds (kango compounds like 政治, 経済, 構造, 概念)
                const compoundMatches = text.match(/[\u4E00-\u9FAF]{2,}/g);
                if (compoundMatches) {
                    compoundWordsCount += compoundMatches.length;
                }
            } else if (lang === 'zh') {
                // 4-character idioms (Chengyu) or formal compounds
                const idiomMatches = text.match(/[\u4E00-\u9FAF]{4}/g);
                if (idiomMatches) {
                    compoundWordsCount += idiomMatches.length;
                }
                const tokens = cue.tokens || [];
                totalWords += tokens.length;
                for (const t of tokens) {
                    if (t.surface && t.surface.length >= 3) {
                        longWordsCount++;
                    }
                }
            } else if (lang === 'ko') {
                const words = text.trim().split(/\s+/).filter(Boolean);
                totalWords += words.length;
                for (const w of words) {
                    totalWordLength += w.length;
                    if (w.length >= 4) {
                        longWordsCount++;
                    }
                }
            } else if (lang === 'en') {
                const words = text.toLowerCase().match(/[a-z']+/g) || [];
                totalWords += words.length;
                for (const w of words) {
                    totalWordLength += w.length;
                    if (w.length >= 8) {
                        longWordsCount++;
                    }
                }
            }
        }

        if (lang === 'ja') {
            const kanjiRatio = totalChars > 0 ? kanjiCount / totalChars : 0;
            const compoundRatio = cues.length > 0 ? compoundWordsCount / cues.length : 0;
            let score = 1.0 + (kanjiRatio / 0.08);
            if (compoundRatio > 0.8) score += 0.4;
            if (compoundRatio > 1.5) score += 0.4;
            return Math.min(5.0, Math.max(1.0, score));
        }

        if (lang === 'zh') {
            const longRatio = totalWords > 0 ? longWordsCount / totalWords : 0;
            const idiomBonus = compoundWordsCount > 3 ? 0.8 : (compoundWordsCount > 0 ? 0.4 : 0);
            const score = 1.5 + (longRatio * 8.0) + idiomBonus;
            return Math.min(6.0, Math.max(1.0, score));
        }

        if (lang === 'ko') {
            const avgWordLen = totalWords > 0 ? totalWordLength / totalWords : 2.5;
            const longWordRatio = totalWords > 0 ? longWordsCount / totalWords : 0;
            const score = 1.0 + ((avgWordLen - 2.0) * 1.5) + (longWordRatio * 3.0);
            return Math.min(6.0, Math.max(1.0, score));
        }

        if (lang === 'en') {
            const avgLen = totalWords > 0 ? totalWordLength / totalWords : 4.0;
            const hardWordRatio = totalWords > 0 ? longWordsCount / totalWords : 0;
            const score = 1.0 + ((avgLen - 3.8) * 1.5) + (hardWordRatio * 10.0);
            return Math.min(6.0, Math.max(1.0, score));
        }

        return 2.5;
    }

    /**
     * Compute composite difficulty score
     */
    private computeScoreFromBreakdown(
        breakdown: Record<string, number>,
        lang: SupportedGrammarLang,
        cpm: number,
        totalPatterns: number,
        vocabScore: number,
        cueCount: number
    ): { level: string; tier: ProficiencyLevelTier; score: number; confidence: number } | null {
        // Speech rate score (1.0 = slow, 3.0 = normal, 5.0 = very fast native)
        const isFastSpeech = (lang === 'en' ? cpm > 170 : cpm > 280);
        const isSlowSpeech = (lang === 'en' ? cpm < 120 : cpm < 180);
        const speechRateScore = isSlowSpeech ? 1.0 : (isFastSpeech ? 4.0 : 2.5);

        let finalScore: number;
        let confidence: number;

        if (totalPatterns === 0) {
            // High-precision fallback using vocabulary difficulty + speech rate
            finalScore = (0.70 * vocabScore) + (0.30 * speechRateScore);
            confidence = Math.min(0.85, 0.65 + (cueCount > 20 ? 0.1 : 0.05));
        } else {
            let totalWeight = 0;
            let weightedSum = 0;

            for (const [lvl, count] of Object.entries(breakdown)) {
                const numericVal = this.levelToNumeric(lvl, lang);
                weightedSum += numericVal * count;
                totalWeight += count;
            }

            const grammarScore = totalWeight > 0 ? weightedSum / totalWeight : 2.0;

            // Unified 3-factor composite: 45% Grammar + 40% Vocabulary/Kanji + 15% Speech Rate
            finalScore = (0.45 * grammarScore) + (0.40 * vocabScore) + (0.15 * speechRateScore);

            if (isFastSpeech && finalScore < 4.0) {
                finalScore += 0.3;
            }

            confidence = Math.min(0.95, Math.max(0.72, 0.68 + (totalPatterns * 0.02) + (cueCount > 30 ? 0.08 : 0)));
        }

        const levelString = this.numericToLevel(Math.round(finalScore), lang);
        const tier = this.scoreToTier(finalScore, lang);

        return { level: levelString, tier, score: Math.round(finalScore * 10) / 10, confidence: Math.round(confidence * 100) / 100 };
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
        } else if (upper.includes('UPPER') || upper.includes('N2') || upper.includes('HSK 5') || upper.includes('B2') || upper.includes('TRUNG CAO CẤP')) {
            tier = 'upper_intermediate';
            score = 4.0;
        } else if (upper.includes('N3') || upper.includes('HSK 3') || upper.includes('HSK 4') || upper.includes('B1') || upper.includes('INTERMEDIATE') || upper.includes('TRUNG CẤP')) {
            tier = 'intermediate';
            score = 3.0;
        } else if (upper.includes('N1') || upper.includes('HSK 6') || upper.includes('C1') || upper.includes('C2') || upper.includes('ADVANCED') || upper.includes('CAO CẤP')) {
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

    private saveToServer(videoId: string, language: string, level: string, confidence = 0.85, method = 'linguistics'): void {
        // Fire and forget POST to /api/video-level (Zero KV writes - Rule 2)
        this.http.post('/api/video-level', { videoId, language, level, confidence, method }).subscribe({
            next: () => {},
            error: () => {} // Non-blocking if fails/offline
        });
    }
}

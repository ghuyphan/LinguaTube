export type ProficiencyLevelTier = 'beginner' | 'elementary' | 'intermediate' | 'upper_intermediate' | 'advanced';

export interface VideoLevelInfo {
    level: string;               // e.g. "JLPT N4", "HSK 2", "CEFR B1", "TOPIK 2"
    tier: ProficiencyLevelTier;  // Level difficulty tier
    score: number;               // 1.0 (N5/A1) to 5.0 (N1/C2)
    confidence: number;          // 0.0 to 1.0
    grammarCount: number;        // Total patterns detected
    speechRateCpm?: number;      // Spoken characters/words per minute
    detectedFrom: 'title' | 'linguistics' | 'server';
    breakdown?: Record<string, number>; // Pattern count by level
}

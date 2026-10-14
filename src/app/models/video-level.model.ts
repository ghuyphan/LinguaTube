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

const VALID_TIERS = new Set<string>(['beginner', 'elementary', 'intermediate', 'upper_intermediate', 'advanced']);

/**
 * Derives the standard ProficiencyLevelTier from a level string (e.g. "JLPT N3", "CEFR B2", "beginner")
 */
export function deriveLevelTier(label?: string | null): ProficiencyLevelTier {
    if (!label) return 'intermediate';
    const clean = label.trim();
    const lower = clean.toLowerCase();

    if (VALID_TIERS.has(lower)) {
        return lower as ProficiencyLevelTier;
    }
    if (lower === 'upper-intermediate' || lower === 'upperintermediate') {
        return 'upper_intermediate';
    }

    const upper = clean.toUpperCase();

    // 1. Beginner (JLPT N5, HSK 1, TOPIK 1, CEFR A1, Beginner, Novice, etc.)
    if (
        /\b(?:JLPT\s*)?N5\b/i.test(clean) ||
        /\bHSK\s*1\b/i.test(clean) ||
        /\bTOPIK\s*(?:1|I)\b/i.test(clean) ||
        /\bCEFR\s*A1\b/i.test(clean) ||
        /\bA1\b/i.test(clean) ||
        upper.includes('BEGINNER') ||
        upper.includes('NOVICE') ||
        upper.includes('SƠ CẤP') ||
        upper.includes('NHẬP MÔN') ||
        /入門|初級|초급\s*1|입문/.test(clean)
    ) {
        return 'beginner';
    }

    // 2. Elementary (JLPT N4, HSK 2, TOPIK 2, CEFR A2, Elementary, etc.)
    if (
        /\b(?:JLPT\s*)?N4\b/i.test(clean) ||
        /\bHSK\s*2\b/i.test(clean) ||
        /\bTOPIK\s*2\b/i.test(clean) ||
        /\bCEFR\s*A2\b/i.test(clean) ||
        /\bA2\b/i.test(clean) ||
        upper.includes('ELEMENTARY') ||
        /초급\s*2|초급/.test(clean)
    ) {
        return 'elementary';
    }

    // 3. Upper Intermediate (JLPT N2, HSK 5, TOPIK 5, CEFR B2, Upper-Intermediate, etc.)
    if (
        /\b(?:JLPT\s*)?N2\b/i.test(clean) ||
        /\bHSK\s*5\b/i.test(clean) ||
        /\bTOPIK\s*5\b/i.test(clean) ||
        /\bCEFR\s*B2\b/i.test(clean) ||
        /\bB2\b/i.test(clean) ||
        upper.includes('UPPER') ||
        upper.includes('TRUNG CAO CẤP') ||
        /中上級|中高级|中高級|중고급/.test(clean)
    ) {
        return 'upper_intermediate';
    }

    // 4. Advanced (JLPT N1, HSK 6, TOPIK 6, CEFR C1/C2, Advanced, Fluent, Master, etc.)
    if (
        /\b(?:JLPT\s*)?N1\b/i.test(clean) ||
        /\bHSK\s*6\b/i.test(clean) ||
        /\bTOPIK\s*(?:6|II)\b/i.test(clean) ||
        /\bCEFR\s*C[12]\b/i.test(clean) ||
        /\bC[12]\b/i.test(clean) ||
        upper.includes('ADVANCED') ||
        upper.includes('CAO CẤP') ||
        upper.includes('FLUENT') ||
        upper.includes('MASTER') ||
        /上級|高级|高級|고급/.test(clean)
    ) {
        return 'advanced';
    }

    // 5. Intermediate (JLPT N3, HSK 3-4, TOPIK 3-4, CEFR B1, Intermediate, Adept, etc.)
    if (
        /\b(?:JLPT\s*)?N3\b/i.test(clean) ||
        /\bHSK\s*[34]\b/i.test(clean) ||
        /\bTOPIK\s*[34]\b/i.test(clean) ||
        /\bCEFR\s*B1\b/i.test(clean) ||
        /\bB1\b/i.test(clean) ||
        upper.includes('INTERMEDIATE') ||
        upper.includes('ADEPT') ||
        upper.includes('TRUNG CẤP') ||
        /中級|中级|중급/.test(clean)
    ) {
        return 'intermediate';
    }

    return 'intermediate';
}

// Grammar pattern models for language learning

export interface GrammarPattern {
    id: string;
    language: 'ja' | 'zh' | 'ko';

    // Pattern info
    pattern: string;              // e.g., "ている", "是...的"
    title: string;                // e.g., "ている (Progressive)"

    // Explanations
    shortExplanation: string;
    longExplanation: string;
    formation: string;            // e.g., "Verb て-form + いる"

    // Proficiency  
    level: string;                // "JLPT N5", "HSK 1", "Korean 2"

    // Examples
    examples: GrammarExample[];
}

export interface GrammarExample {
    sentence: string;
    romanization?: string;
    translation: string;
}

export interface GrammarMatch {
    pattern: GrammarPattern;
    tokenIndices: number[];       // Which tokens are part of this pattern
    startIndex: number;
    endIndex: number;
}

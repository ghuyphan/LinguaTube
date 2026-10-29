import {
    normalizeLevelScore,
    levelToScore,
    scoreToLevelLabel,
    scoreToTier,
    deriveLevelTier
} from './video-level.model';

describe('VideoLevelModel', () => {
    const frameworks = {
        ja: { cuts: [1.85, 2.75, 3.70, 4.60], labels: ['JLPT N5', 'JLPT N4', 'JLPT N3', 'JLPT N2', 'JLPT N1'] },
        zh: { cuts: [1.85, 2.85, 3.85, 4.85, 5.85], labels: [1, 2, 3, 4, 5, 6].map(n => `HSK ${n}`) },
        ko: { cuts: [1.85, 2.85, 3.85, 4.85, 5.85], labels: [1, 2, 3, 4, 5, 6].map(n => `TOPIK ${n}`) },
        en: { cuts: [1.85, 2.85, 3.85, 4.85, 5.85], labels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(l => `CEFR ${l}`) }
    };

    it('should clamp scores to [1, 5] for ja and [1, 6] for zh, ko, en', () => {
        expect(normalizeLevelScore(-10, 'ja')).toBe(1);
        expect(normalizeLevelScore(10, 'ja')).toBe(5);
        expect(normalizeLevelScore(3.4, 'ja')).toBe(3.4);

        expect(normalizeLevelScore(-5, 'zh')).toBe(1);
        expect(normalizeLevelScore(10, 'zh')).toBe(6);
        expect(normalizeLevelScore(5.9, 'ko')).toBe(5.9);
        expect(normalizeLevelScore(7, 'en')).toBe(6);
    });

    it('should accurately map explicit level labels to representative scores', () => {
        expect(levelToScore('JLPT N5')).toBe(1);
        expect(levelToScore('JLPT N4')).toBe(2);
        expect(levelToScore('JLPT N3')).toBe(3);
        expect(levelToScore('JLPT N2')).toBe(4);
        expect(levelToScore('JLPT N1')).toBe(5);

        expect(levelToScore('HSK 1')).toBe(1);
        expect(levelToScore('HSK 4')).toBe(4);
        expect(levelToScore('HSK 6')).toBe(6);

        expect(levelToScore('TOPIK 1')).toBe(1);
        expect(levelToScore('TOPIK I')).toBe(1);
        expect(levelToScore('TOPIK 2')).toBe(2);
        expect(levelToScore('TOPIK 5')).toBe(5);
        expect(levelToScore('TOPIK 6')).toBe(6);
        expect(levelToScore('TOPIK II')).toBe(6);

        expect(levelToScore('CEFR A1')).toBe(1);
        expect(levelToScore('CEFR B2')).toBe(4);
        expect(levelToScore('CEFR C1')).toBe(5);
        expect(levelToScore('CEFR C2')).toBe(6);
    });

    it('should align calibrated cutoffs with backend across all 4 frameworks', () => {
        for (const [lang, { cuts, labels }] of Object.entries(frameworks)) {
            cuts.forEach((cut, i) => {
                // Just below cut
                const below = cut - 0.01;
                expect(scoreToLevelLabel(below, lang)).toBe(labels[i]);
                expect(scoreToTier(below, lang)).toBe(deriveLevelTier(labels[i]));

                // Exactly at cut (equality selects next higher level)
                expect(scoreToLevelLabel(cut, lang)).toBe(labels[i + 1]);
                expect(scoreToTier(cut, lang)).toBe(deriveLevelTier(labels[i + 1]));

                // Above cut
                const above = cut + 0.01;
                expect(scoreToLevelLabel(above, lang)).toBe(labels[i + 1]);
                expect(scoreToTier(above, lang)).toBe(deriveLevelTier(labels[i + 1]));
            });
        }
    });

    it('should correctly derive tiers for edge cases and multi-level frameworks', () => {
        expect(deriveLevelTier('HSK 3')).toBe('intermediate');
        expect(deriveLevelTier('HSK 4')).toBe('intermediate');
        expect(deriveLevelTier('HSK 5')).toBe('upper_intermediate');
        expect(deriveLevelTier('HSK 6')).toBe('advanced');

        expect(deriveLevelTier('TOPIK 3')).toBe('intermediate');
        expect(deriveLevelTier('TOPIK 4')).toBe('intermediate');
        expect(deriveLevelTier('TOPIK 5')).toBe('upper_intermediate');
        expect(deriveLevelTier('TOPIK 6')).toBe('advanced');
        expect(deriveLevelTier('TOPIK II')).toBe('advanced');

        expect(deriveLevelTier('CEFR B1')).toBe('intermediate');
        expect(deriveLevelTier('CEFR B2')).toBe('upper_intermediate');
        expect(deriveLevelTier('CEFR C1')).toBe('advanced');
        expect(deriveLevelTier('CEFR C2')).toBe('advanced');
    });
});

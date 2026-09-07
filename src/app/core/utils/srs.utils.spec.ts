import { calculateNextSRSState, formatSRSInterval, calculateSRSPreview } from './srs.utils';
import { VocabularyItem } from '../../models';

describe('srs.utils', () => {
    describe('formatSRSInterval', () => {
        it('formats <= 0 days as <10m', () => {
            expect(formatSRSInterval(0)).toBe('<10m');
            expect(formatSRSInterval(-1)).toBe('<10m');
        });

        it('formats 1 day as 1d', () => {
            expect(formatSRSInterval(1)).toBe('1d');
        });

        it('formats days under a week as Xd', () => {
            expect(formatSRSInterval(4)).toBe('4d');
            expect(formatSRSInterval(6)).toBe('6d');
        });

        it('formats days between 7 and 29 as Xw', () => {
            expect(formatSRSInterval(7)).toBe('1w');
            expect(formatSRSInterval(14)).toBe('2w');
            expect(formatSRSInterval(21)).toBe('3w');
        });

        it('formats days between 30 and 364 as Xmo', () => {
            expect(formatSRSInterval(30)).toBe('1mo');
            expect(formatSRSInterval(60)).toBe('2mo');
            expect(formatSRSInterval(180)).toBe('6mo');
        });

        it('formats days >= 365 as Xy', () => {
            expect(formatSRSInterval(365)).toBe('1y');
            expect(formatSRSInterval(730)).toBe('2y');
        });
    });

    describe('calculateNextSRSState', () => {
        it('resets repetitions and interval to 0 on failed quality (< 3)', () => {
            const item: Pick<VocabularyItem, 'level' | 'easeFactor' | 'interval' | 'repetitions'> = {
                level: 'known',
                easeFactor: 2.5,
                interval: 10,
                repetitions: 4
            };
            const result = calculateNextSRSState(item, 1);
            expect(result.interval).toBe(0);
            expect(result.repetitions).toBe(0);
            expect(result.newLevel).toBe('learning');
        });

        it('increments repetitions and sets interval to 1 on first successful review', () => {
            const item: Pick<VocabularyItem, 'level' | 'easeFactor' | 'interval' | 'repetitions'> = {
                level: 'new',
                easeFactor: 2.5,
                interval: 0,
                repetitions: 0
            };
            const result = calculateNextSRSState(item, 4);
            expect(result.interval).toBe(1);
            expect(result.repetitions).toBe(1);
            expect(result.newLevel).toBe('learning');
        });

        it('sets interval to 6 on second successful review', () => {
            const item: Pick<VocabularyItem, 'level' | 'easeFactor' | 'interval' | 'repetitions'> = {
                level: 'learning',
                easeFactor: 2.5,
                interval: 1,
                repetitions: 1
            };
            const result = calculateNextSRSState(item, 4);
            expect(result.interval).toBe(6);
            expect(result.repetitions).toBe(2);
        });

        it('promotes learning item to known when repetitions reach 3', () => {
            const item: Pick<VocabularyItem, 'level' | 'easeFactor' | 'interval' | 'repetitions'> = {
                level: 'learning',
                easeFactor: 2.5,
                interval: 6,
                repetitions: 2
            };
            const result = calculateNextSRSState(item, 4);
            expect(result.repetitions).toBe(3);
            expect(result.newLevel).toBe('known');
        });
    });

    describe('calculateSRSPreview', () => {
        it('returns preview strings for again, hard, good, and easy', () => {
            const item: VocabularyItem = {
                id: 'test1',
                word: 'こんにちは',
                meaning: 'hello',
                language: 'ja',
                level: 'learning',
                examples: [],
                addedAt: new Date(),
                reviewCount: 2,
                easeFactor: 2.5,
                interval: 1,
                repetitions: 1
            };

            const preview = calculateSRSPreview(item);
            expect(preview.again).toBe('<10m');
            expect(preview.hard).toBe('1d');
            expect(preview.good).toBe('6d');
            expect(preview.easy).toBeDefined();
        });
    });
});

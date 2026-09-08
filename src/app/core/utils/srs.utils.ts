import { VocabularyItem, WordLevel } from '../../models';

export interface NextSRSState {
    interval: number;
    easeFactor: number;
    repetitions: number;
    newLevel: WordLevel;
    nextReviewDate: Date;
}

export interface SRSIntervalPreview {
    again: string;
    hard: string;
    good: string;
    easy: string;
}

/**
 * Calculates the next SRS state using the SuperMemo SM-2 algorithm.
 * quality: 0-5
 * 1 = Again (failed)
 * 2 = Hard
 * 4 = Good
 * 5 = Easy
 */
export function calculateNextSRSState(
    item: Pick<VocabularyItem, 'level' | 'easeFactor' | 'interval' | 'repetitions'>,
    quality: number
): NextSRSState {
    let easeFactor = item.easeFactor || 2.5;
    let interval = item.interval || 0;
    let repetitions = item.repetitions || 0;
    let newLevel: WordLevel = item.level;

    if (quality < 3) {
        // Quality 1 = Again (failed recall)
        repetitions = 0;
        interval = 0;
        easeFactor = Math.max(1.3, easeFactor - 0.2);
        newLevel = item.level === 'known' ? 'learning' : 'new';
    } else if (quality === 3) {
        // Quality 3 = Hard (recalled with significant effort)
        repetitions++;
        interval = repetitions <= 1 ? 1 : Math.max(1, Math.round(interval * 1.2));
        easeFactor = Math.max(1.3, easeFactor - 0.15);

        if (item.level === 'new') {
            newLevel = 'learning';
        } else if (item.level === 'learning' && repetitions >= 3) {
            newLevel = 'known';
        }
    } else if (quality === 4) {
        // Quality 4 = Good (standard SM-2 successful recall)
        repetitions++;
        if (repetitions === 1) {
            interval = 1;
        } else if (repetitions === 2) {
            interval = 6;
        } else {
            interval = Math.max(1, Math.round(interval * easeFactor));
        }

        // SM-2 Ease Factor calculation
        easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

        if (item.level === 'new') {
            newLevel = 'learning';
        } else if (item.level === 'learning' && repetitions >= 3) {
            newLevel = 'known';
        }
    } else {
        // Quality 5 = Easy (effortless recall with bonus interval)
        repetitions++;
        if (repetitions === 1) {
            interval = 2;
        } else if (repetitions === 2) {
            interval = 8;
        } else {
            interval = Math.max(1, Math.round(interval * easeFactor * 1.3));
        }

        easeFactor = Math.max(1.3, easeFactor + 0.15);

        if (item.level === 'new') {
            newLevel = 'learning';
        } else if (item.level === 'learning' && repetitions >= 2) {
            newLevel = 'known';
        }
    }

    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + interval);

    return {
        interval,
        easeFactor,
        repetitions,
        newLevel,
        nextReviewDate
    };
}

/**
 * Formats a day count into a concise SRS button badge string (e.g. '<10m', '1d', '3d', '2w', '1mo')
 */
export function formatSRSInterval(days: number): string {
    if (days <= 0) return '<10m';
    if (days === 1) return '1d';
    if (days < 7) return `${days}d`;
    if (days < 30) {
        const weeks = Math.round(days / 7);
        return `${weeks}w`;
    }
    if (days < 365) {
        const months = Math.round(days / 30);
        return `${months}mo`;
    }
    const years = (days / 365).toFixed(1).replace(/\.0$/, '');
    return `${years}y`;
}

/**
 * Generates preview intervals for all 4 grading buttons (Again, Hard, Good, Easy)
 */
export function calculateSRSPreview(item: VocabularyItem): SRSIntervalPreview {
    const nextAgain = calculateNextSRSState(item, 1);
    const nextHard = calculateNextSRSState(item, 3);
    const nextGood = calculateNextSRSState(item, 4);
    const nextEasy = calculateNextSRSState(item, 5);

    return {
        again: formatSRSInterval(nextAgain.interval),
        hard: formatSRSInterval(nextHard.interval),
        good: formatSRSInterval(nextGood.interval),
        easy: formatSRSInterval(nextEasy.interval)
    };
}

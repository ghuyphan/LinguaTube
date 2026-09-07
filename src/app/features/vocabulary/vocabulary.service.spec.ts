import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { VocabularyService } from './vocabulary.service';
import { OfflineVocabularyRepository } from '../../core/repositories';
import { VocabularyItem } from '../../models';

describe('VocabularyService', () => {
    let service: VocabularyService;
    let mockVocabSignal: ReturnType<typeof signal<VocabularyItem[]>>;

    beforeEach(() => {
        mockVocabSignal = signal<VocabularyItem[]>([]);

        const mockRepo = {
            vocabulary: mockVocabSignal,
            stats: signal({ total: 0, new: 0, learning: 0, known: 0, ignored: 0, japanese: 0, chinese: 0, korean: 0, english: 0 }),
            isSyncing: signal(false),
            getVocabulary: () => mockVocabSignal(),
            findWord: (w: string) => mockVocabSignal().find(item => item.word === w),
            hasWord: (w: string) => mockVocabSignal().some(item => item.word === w),
            addWord: jasmine.createSpy('addWord'),
            updateLevel: jasmine.createSpy('updateLevel'),
            markReviewed: jasmine.createSpy('markReviewed'),
            deleteWord: jasmine.createSpy('deleteWord')
        };

        TestBed.configureTestingModule({
            providers: [
                VocabularyService,
                { provide: OfflineVocabularyRepository, useValue: mockRepo }
            ]
        });

        service = TestBed.inject(VocabularyService);
    });

    describe('goalProgress', () => {
        it('calculates 0% when no cards are completed', () => {
            service.dailyGoal.set(10);
            service.cardsCompletedToday.set(0);
            expect(service.goalProgress()).toBe(0);
        });

        it('calculates progress percentage correctly', () => {
            service.dailyGoal.set(20);
            service.cardsCompletedToday.set(5);
            expect(service.goalProgress()).toBe(25);
        });

        it('caps progress at 100% when cards exceed goal', () => {
            service.dailyGoal.set(10);
            service.cardsCompletedToday.set(15);
            expect(service.goalProgress()).toBe(100);
        });

        it('handles zero goal safely without division by zero', () => {
            service.dailyGoal.set(0);
            service.cardsCompletedToday.set(5);
            expect(service.goalProgress()).toBe(0);
        });
    });

    describe('getDueCountByLanguage', () => {
        const today = new Date();
        const yesterday = new Date(Date.now() - 86400000);
        const tomorrow = new Date(Date.now() + 86400000 * 2);

        beforeEach(() => {
            mockVocabSignal.set([
                {
                    id: '1',
                    word: '猫',
                    meaning: 'cat',
                    language: 'ja',
                    level: 'learning',
                    nextReviewDate: yesterday,
                    addedAt: today,
                    examples: [],
                    reviewCount: 0,
                    easeFactor: 2.5,
                    interval: 0,
                    repetitions: 0
                },
                {
                    id: '2',
                    word: '犬',
                    meaning: 'dog',
                    language: 'ja',
                    level: 'new',
                    // No nextReviewDate -> new items are due
                    addedAt: today,
                    examples: [],
                    reviewCount: 0,
                    easeFactor: 2.5,
                    interval: 0,
                    repetitions: 0
                },
                {
                    id: '3',
                    word: '鳥',
                    meaning: 'bird',
                    language: 'ja',
                    level: 'known',
                    nextReviewDate: tomorrow, // Future date -> not due
                    addedAt: today,
                    examples: [],
                    reviewCount: 0,
                    easeFactor: 2.5,
                    interval: 0,
                    repetitions: 0
                },
                {
                    id: '4',
                    word: '魚',
                    meaning: 'fish',
                    language: 'ja',
                    level: 'ignored', // Ignored -> never due
                    nextReviewDate: yesterday,
                    addedAt: today,
                    examples: [],
                    reviewCount: 0,
                    easeFactor: 2.5,
                    interval: 0,
                    repetitions: 0
                },
                {
                    id: '5',
                    word: '你好',
                    meaning: 'hello',
                    language: 'zh', // Different language
                    level: 'new',
                    addedAt: today,
                    examples: [],
                    reviewCount: 0,
                    easeFactor: 2.5,
                    interval: 0,
                    repetitions: 0
                }
            ]);
        });

        it('returns count of overdue and new items for target language only', () => {
            expect(service.getDueCountByLanguage('ja')).toBe(2); // '猫' (overdue) + '犬' (new)
            expect(service.getDueCountByLanguage('zh')).toBe(1); // '你好' (new)
            expect(service.getDueCountByLanguage('ko')).toBe(0);
        });
    });
});

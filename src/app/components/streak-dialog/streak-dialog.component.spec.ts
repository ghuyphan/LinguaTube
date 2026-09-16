import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { StreakDialogComponent } from './streak-dialog.component';
import { StreakService } from '../../services/streak.service';
import { I18nService } from '../../core/services';
import { StreakData } from '../../core/repositories/streak.repository';

describe('StreakDialogComponent', () => {
    let component: StreakDialogComponent;
    let fixture: ComponentFixture<StreakDialogComponent>;
    let mockStreakData: ReturnType<typeof signal<StreakData>>;
    let mockActivityHistory: ReturnType<typeof signal<string[]>>;
    let syncWithRemoteSpy: jasmine.Spy;

    beforeEach(async () => {
        mockStreakData = signal<StreakData>({
            currentStreak: 3,
            longestStreak: 5,
            freezesRemaining: 2,
            lastActivity: null,
            practicedToday: false
        });

        mockActivityHistory = signal<string[]>([]);
        syncWithRemoteSpy = jasmine.createSpy('syncWithRemote').and.resolveTo();

        const mockStreakService = {
            streakData: mockStreakData,
            activityHistory: mockActivityHistory,
            currentStreak: () => mockStreakData().currentStreak,
            longestStreak: () => mockStreakData().longestStreak,
            freezesRemaining: () => mockStreakData().freezesRemaining,
            practicedToday: () => mockStreakData().practicedToday,
            syncWithRemote: syncWithRemoteSpy
        };

        const mockI18nService = {
            currentLanguage: signal('en'),
            t: (key: string) => key
        };

        await TestBed.configureTestingModule({
            imports: [StreakDialogComponent],
            providers: [
                { provide: StreakService, useValue: mockStreakService },
                { provide: I18nService, useValue: mockI18nService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(StreakDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should generate 7 days for the current week', () => {
        const days = component.weekDays();
        expect(days.length).toBe(7);
    });

    it('should correctly identify today', () => {
        const days = component.weekDays();
        const todayItems = days.filter(d => d.isToday);
        expect(todayItems.length).toBe(1);
    });

    it('should mark today as active when practicedToday is true', () => {
        mockStreakData.set({
            currentStreak: 4,
            longestStreak: 5,
            freezesRemaining: 2,
            lastActivity: new Date().toISOString(),
            practicedToday: true
        });
        fixture.detectChanges();

        const days = component.weekDays();
        const todayItem = days.find(d => d.isToday);
        expect(todayItem).toBeDefined();
        expect(todayItem!.active).toBeTrue();
    });

    it('should reactively mark past days active when activity history updates', () => {
        const now = new Date();
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const d = String(now.getDate()).padStart(2, '0');
        const todayKey = `${y}-${m}-${d}`;

        mockActivityHistory.set([todayKey]);
        fixture.detectChanges();

        const days = component.weekDays();
        const todayItem = days.find(d => d.isToday);
        expect(todayItem!.active).toBeTrue();
    });

    it('should not mark future days as active', () => {
        const days = component.weekDays();
        const futureDays = days.filter(d => d.isFuture);
        for (const day of futureDays) {
            expect(day.active).toBeFalse();
        }
    });

    it('should call syncWithRemote when isOpen is true', () => {
        expect(syncWithRemoteSpy).toHaveBeenCalled();
    });
});

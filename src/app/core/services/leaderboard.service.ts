import { Injectable, inject, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { SettingsService } from './settings.service';
import { GamificationService } from './gamification.service';
import { OfflineStreakRepository } from '../repositories/offline-streak.repository';
import { LeaderboardEntry } from '../../models/gamification.model';

const STORAGE_KEY = 'linguatube_leaderboard_cache';
const GUEST_ID_KEY = 'linguatube_guest_id';

@Injectable({
    providedIn: 'root'
})
export class LeaderboardService {
    private http = inject(HttpClient);
    private auth = inject(AuthService);
    private settings = inject(SettingsService);
    private gamification = inject(GamificationService);
    private streakRepo = inject(OfflineStreakRepository);

    // Signals
    readonly topLearners = signal<LeaderboardEntry[]>([]);
    readonly userRank = signal<LeaderboardEntry | null>(null);
    readonly isLoading = signal<boolean>(false);
    readonly selectedLang = signal<string>('all');
    readonly selectedPeriod = signal<'weekly' | 'all_time'>('weekly');

    private lastSyncTime = 0;

    constructor() {
        this.loadFromStorage();
        // Load initial leaderboard
        this.loadLeaderboard('all');

        // Automatically sync score when user logs in or levels up
        effect(() => {
            const xp = this.gamification.totalXP();
            const level = this.gamification.userLevel();
            if (xp > 0 || level > 1) {
                this.syncMyScore();
            }
        });
    }

    /**
     * Get or create a persistent guest ID for unauthenticated learners
     */
    getGuestId(): string {
        try {
            let guestId = localStorage.getItem(GUEST_ID_KEY);
            if (!guestId) {
                guestId = `guest_${Math.random().toString(36).substring(2, 10)}${Date.now().toString(36)}`;
                localStorage.setItem(GUEST_ID_KEY, guestId);
            }
            return guestId;
        } catch {
            return 'guest_local';
        }
    }

    /**
     * Current user identifier (PocketBase user ID or guest ID)
     */
    getCurrentUserId(): string {
        return this.auth.user()?.id || this.getGuestId();
    }

    /**
     * Fetch global leaderboard
     */
    async loadLeaderboard(
        lang: string = this.selectedLang(),
        force = false,
        period: 'weekly' | 'all_time' = this.selectedPeriod()
    ): Promise<void> {
        this.selectedLang.set(lang);
        this.selectedPeriod.set(period);
        this.isLoading.set(true);

        const currentUserId = this.getCurrentUserId();
        const langQuery = lang && lang !== 'all' ? `&lang=${encodeURIComponent(lang)}` : '';
        const periodQuery = `&period=${encodeURIComponent(period)}`;
        const bustQuery = force ? `&refresh=true&_t=${Date.now()}` : '';

        try {
            const res = await firstValueFrom(this.http.get<{
                success: boolean;
                topLearners: LeaderboardEntry[];
                userRank: LeaderboardEntry | null;
            }>(`/api/leaderboard?userId=${encodeURIComponent(currentUserId)}${langQuery}${periodQuery}${bustQuery}`));

            if (res && res.success && Array.isArray(res.topLearners)) {
                this.topLearners.set(res.topLearners);
                if (res.userRank) {
                    this.userRank.set(res.userRank);
                } else {
                    this.computeClientUserRank(res.topLearners);
                }
                this.saveToStorage(res.topLearners);
            }
        } catch (err) {
            console.warn('[LeaderboardService] Failed to fetch leaderboard, using cached/seed:', err);
            // Fallback to local computation
            this.computeClientUserRank(this.topLearners());
        } finally {
            this.isLoading.set(false);
        }
    }

    /**
     * Sync user's latest XP, Level and Streak to the global leaderboard
     */
    async syncMyScore(force = false): Promise<void> {
        const now = Date.now();
        // Client-side debounce/throttle: at most once every 30 seconds unless forced
        if (!force && now - this.lastSyncTime < 30000) return;
        this.lastSyncTime = now;

        const isAuth = this.auth.isLoggedIn();
        const user = this.auth.user();
        const guestId = isAuth ? undefined : this.getGuestId();

        const userLang = this.settings.settings().language || 'ja';
        const targetLang = ['ja', 'ko', 'zh', 'en'].includes(userLang) ? userLang : 'ja';

        const payload = {
            guest_id: guestId,
            xp: this.gamification.totalXP(),
            weekly_xp: this.gamification.weeklyXP(),
            level: this.gamification.userLevel(),
            streak: this.streakRepo.streakData().currentStreak,
            badges_count: Object.keys(this.gamification.rawState().unlockedAchievements).length,
            target_lang: targetLang,
            name: user?.name || 'Learner',
            avatar: user?.picture || ''
        };

        try {
            await firstValueFrom(this.http.post('/api/leaderboard', payload));
        } catch (err) {
            // Silently ignore sync failures (offline or network fluctuation)
            console.warn('[LeaderboardService] Score sync skipped:', err);
        }
    }

    /**
     * Compute fallback user rank locally if not in top list
     */
    private computeClientUserRank(topList: LeaderboardEntry[]): void {
        const currentUserId = this.getCurrentUserId();
        const user = this.auth.user();
        const myXp = this.gamification.totalXP();
        const myWeeklyXp = this.gamification.weeklyXP();
        const myLevel = this.gamification.userLevel();
        const myStreak = this.streakRepo.streakData().currentStreak;
        const myBadges = Object.keys(this.gamification.rawState().unlockedAchievements).length;
        const isWeekly = this.selectedPeriod() === 'weekly';

        // Check if user is in topList
        const existing = topList.find(entry => entry.userId === currentUserId);
        if (existing) {
            this.userRank.set(existing);
            return;
        }

        // Calculate estimated position
        const higherCount = topList.filter(entry => {
            if (isWeekly) {
                return (entry.weeklyXp ?? entry.xp) > myWeeklyXp;
            }
            return entry.xp > myXp;
        }).length;
        const estimatedRank = higherCount >= topList.length ? topList.length + 12 : higherCount + 1;

        this.userRank.set({
            rank: estimatedRank,
            userId: currentUserId,
            name: user?.name || 'You',
            avatar: user?.picture || '',
            xp: myXp,
            weeklyXp: myWeeklyXp,
            level: myLevel,
            streak: myStreak,
            badgesCount: myBadges,
            targetLang: this.selectedLang() !== 'all' ? this.selectedLang() : 'ja',
            country: ''
        });
    }

    private loadFromStorage(): void {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length >= 3) {
                    this.topLearners.set(parsed);
                    this.computeClientUserRank(parsed);
                }
            }
        } catch { }
    }

    private saveToStorage(entries: LeaderboardEntry[]): void {
        try {
            if (Array.isArray(entries) && entries.length >= 3) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
            }
        } catch { }
    }
}

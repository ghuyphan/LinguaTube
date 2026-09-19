import { Injectable, inject, signal, effect } from '@angular/core';
import { AuthService } from './auth.service';
import { SettingsService } from './settings.service';
import { GamificationService } from './gamification.service';
import { OfflineStreakRepository } from '../repositories/offline-streak.repository';
import { SupabaseService } from './supabase.service';
import { StorageService } from './storage.service';
import { LeaderboardEntry } from '../../models/gamification.model';

const STORAGE_KEY = 'voca_leaderboard_cache';
const GUEST_ID_KEY = 'voca_guest_id';

interface LeaderboardRpcRow {
    rank: number;
    user_id: string;
    name: string | null;
    avatar: string | null;
    xp: number;
    weekly_xp: number;
    level: number;
    streak: number;
    badges_count: number;
    target_lang: string | null;
    country: string | null;
}

@Injectable({
    providedIn: 'root'
})
export class LeaderboardService {
    private supabase = inject(SupabaseService);
    private storage = inject(StorageService);
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
        void this.loadLeaderboard('all');

        // Automatically sync profile target_lang when user logs in or levels up
        effect(() => {
            const xp = this.gamification.totalXP();
            const level = this.gamification.userLevel();
            if (xp > 0 || level > 1) {
                void this.syncMyScore();
            }
        });
    }

    /**
     * Get or create a persistent guest ID for unauthenticated learners
     */
    getGuestId(): string {
        try {
            let guestId = this.storage.get<string>(GUEST_ID_KEY);
            if (!guestId) {
                guestId = `guest_${Math.random().toString(36).substring(2, 10)}${Date.now().toString(36)}`;
                this.storage.set(GUEST_ID_KEY, guestId);
            }
            return guestId;
        } catch {
            return 'guest_local';
        }
    }

    /**
     * Current user identifier (Supabase user ID or guest ID)
     */
    getCurrentUserId(): string {
        return this.auth.user()?.id || this.getGuestId();
    }

    /**
     * Fetch global leaderboard directly from Supabase RPC
     */
    async loadLeaderboard(
        lang: string = this.selectedLang(),
        _force = false,
        period: 'weekly' | 'all_time' = this.selectedPeriod()
    ): Promise<void> {
        this.selectedLang.set(lang);
        this.selectedPeriod.set(period);
        this.isLoading.set(true);

        try {
            const { data, error } = await this.supabase.client.rpc('get_leaderboard', {
                p_lang: lang === 'all' ? null : lang,
                p_period: period,
                p_limit: 50
            });

            if (error) {
                throw error;
            }

            if (Array.isArray(data) && data.length > 0) {
                const learners: LeaderboardEntry[] = (data as LeaderboardRpcRow[]).map(row => ({
                    rank: Number(row.rank),
                    userId: row.user_id,
                    name: row.name || 'Learner',
                    avatar: row.avatar || '',
                    xp: row.xp ?? 0,
                    weeklyXp: row.weekly_xp ?? 0,
                    level: row.level ?? 1,
                    streak: row.streak ?? 0,
                    badgesCount: Number(row.badges_count ?? 0),
                    targetLang: row.target_lang || 'all',
                    country: row.country || ''
                }));

                this.topLearners.set(learners);
                this.computeClientUserRank(learners);
                this.saveToStorage(learners);
            } else {
                this.computeClientUserRank(this.topLearners());
            }
        } catch (err) {
            console.warn('[LeaderboardService] Failed to fetch leaderboard from Supabase, using cache:', err);
            this.computeClientUserRank(this.topLearners());
        } finally {
            this.isLoading.set(false);
        }
    }

    /**
     * Sync user's latest target language to Supabase profile
     */
    async syncMyScore(force = false): Promise<void> {
        const now = Date.now();
        if (!force && now - this.lastSyncTime < 30000) return;
        this.lastSyncTime = now;

        const user = this.auth.user();
        if (!user) return;

        const userLang = this.settings.settings().language || 'ja';
        const targetLang = ['ja', 'ko', 'zh', 'en'].includes(userLang) ? userLang : 'ja';

        try {
            await this.supabase.client
                .from('profiles')
                .update({ target_lang: targetLang })
                .eq('id', user.id);
        } catch (err) {
            console.warn('[LeaderboardService] Profile target_lang sync skipped:', err);
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
            const parsed = this.storage.get<LeaderboardEntry[]>(STORAGE_KEY);
            if (Array.isArray(parsed) && parsed.length >= 3) {
                this.topLearners.set(parsed);
                this.computeClientUserRank(parsed);
            }
        } catch { }
    }

    private saveToStorage(entries: LeaderboardEntry[]): void {
        try {
            if (Array.isArray(entries) && entries.length >= 3) {
                this.storage.set(STORAGE_KEY, entries);
            }
        } catch { }
    }
}

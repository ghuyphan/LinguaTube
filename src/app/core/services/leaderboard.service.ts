import { Injectable, inject, signal, effect, isDevMode } from '@angular/core';
import { AuthService } from './auth.service';
import { SettingsService } from './settings.service';
import { GamificationService } from './gamification.service';
import { OfflineStreakRepository } from '../repositories/offline-streak.repository';
import { SupabaseService } from './supabase.service';
import { StorageService } from './storage.service';
import { CountryService } from './country.service';
import { LeaderboardEntry } from '../../models/gamification.model';
import { mergeWithSeedLeaderboard } from '../../data/leaderboard-seeds';

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
    private countryService = inject(CountryService);

    // Signals
    readonly topLearners = signal<LeaderboardEntry[]>([]);
    readonly userRank = signal<LeaderboardEntry | null>(null);
    readonly isLoading = signal<boolean>(false);
    readonly selectedLang = signal<string>('all');
    readonly selectedPeriod = signal<'weekly' | 'all_time'>('weekly');

    // Local dev testing rank override (can be set via window.__setDevLeaderboardRank(1 | 3 | null))
    readonly devMockRank = signal<number | null>(null);

    private lastSyncTime = 0;
    private loadRequestId = 0;
    private memCache = new Map<string, { entries: LeaderboardEntry[]; timestamp: number }>();

    constructor() {
        const isDev = isDevMode() || (typeof location !== 'undefined' && (location.hostname === 'localhost' || location.hostname === '127.0.0.1'));
        if (typeof window !== 'undefined' && isDev) {
            (window as unknown as { __setDevLeaderboardRank: (rank: number | null) => void }).__setDevLeaderboardRank = (rank: number | null) => {
                this.devMockRank.set(rank);
                this.memCache.clear();
                void this.loadLeaderboard(this.selectedLang(), true, this.selectedPeriod());
            };
        }

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
        force = false,
        period: 'weekly' | 'all_time' = this.selectedPeriod()
    ): Promise<void> {
        this.selectedLang.set(lang);
        this.selectedPeriod.set(period);

        const cacheKey = `${lang}_${period}`;
        const cached = this.memCache.get(cacheKey);

        // Instant cache hit if fetched within last 60 seconds
        if (!force && cached && (Date.now() - cached.timestamp < 60000)) {
            this.topLearners.set(cached.entries);
            this.computeClientUserRank(cached.entries);
            this.isLoading.set(false);
            return;
        }

        const requestId = ++this.loadRequestId;
        this.isLoading.set(true);

        try {
            const { data, error } = await this.supabase.client.rpc('get_leaderboard', {
                p_lang: lang === 'all' ? null : lang,
                p_period: period,
                p_limit: 50
            });

            // If a newer request was dispatched while this was in flight, discard stale response
            if (requestId !== this.loadRequestId) return;

            let realLearners: LeaderboardEntry[] = [];
            if (!error && Array.isArray(data)) {
                realLearners = (data as LeaderboardRpcRow[]).map(row => ({
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
            }

            // Ensure current active user's local stats are incorporated
            const currentUserId = this.getCurrentUserId();
            const myXp = this.gamification.totalXP();
            const myWeeklyXp = this.gamification.weeklyXP();
            const myLevel = this.gamification.userLevel();
            const myStreak = this.streakRepo.streakData().currentStreak;
            const myBadges = Object.keys(this.gamification.rawState().unlockedAchievements).length;
            const user = this.auth.user();

            if (myXp > 0 || myWeeklyXp > 0 || user) {
                const existingIdx = realLearners.findIndex(u => u.userId === currentUserId);
                const currentUserEntry: LeaderboardEntry = {
                    rank: 0,
                    userId: currentUserId,
                    name: user?.name || (existingIdx !== -1 ? realLearners[existingIdx].name : 'You'),
                    avatar: user?.picture || (existingIdx !== -1 ? realLearners[existingIdx].avatar : ''),
                    xp: Math.max(myXp, existingIdx !== -1 ? (realLearners[existingIdx].xp ?? 0) : 0),
                    weeklyXp: Math.max(myWeeklyXp, existingIdx !== -1 ? (realLearners[existingIdx].weeklyXp ?? 0) : 0),
                    level: Math.max(myLevel, existingIdx !== -1 ? (realLearners[existingIdx].level ?? 1) : 1),
                    streak: Math.max(myStreak, existingIdx !== -1 ? (realLearners[existingIdx].streak ?? 0) : 0),
                    badgesCount: Math.max(myBadges, existingIdx !== -1 ? (realLearners[existingIdx].badgesCount ?? 0) : 0),
                    targetLang: lang === 'all' ? (this.settings.settings().language || 'ja') : lang,
                    country: this.countryService.effectiveCountry()
                };
                if (existingIdx !== -1) {
                    realLearners[existingIdx] = currentUserEntry;
                } else {
                    realLearners.push(currentUserEntry);
                }
            }

            // Always merge real users with baseline community seed learners
            let merged = mergeWithSeedLeaderboard(realLearners, lang === 'all' ? null : lang, 50, period);
            merged = this.applyDevMockRank(merged, currentUserId, lang);

            this.memCache.set(cacheKey, { entries: merged, timestamp: Date.now() });
            this.topLearners.set(merged);
            this.computeClientUserRank(merged);
            this.saveToStorage(merged);
        } catch (err) {
            if (requestId !== this.loadRequestId) return;
            console.warn('[LeaderboardService] Failed to fetch leaderboard from Supabase, using seeds/cache:', err);
            const cachedFallback = this.topLearners();
            let fallback = cachedFallback.length >= 3 ? cachedFallback : mergeWithSeedLeaderboard([], lang === 'all' ? null : lang, 50, period);
            fallback = this.applyDevMockRank(fallback, this.getCurrentUserId(), lang);
            this.topLearners.set(fallback);
            this.computeClientUserRank(fallback);
        } finally {
            if (requestId === this.loadRequestId) {
                this.isLoading.set(false);
            }
        }
    }

    /**
     * Local development helper: mock current user rank (1st or 3rd) for UI testing
     */
    private applyDevMockRank(
        entries: LeaderboardEntry[],
        currentUserId: string,
        lang: string
    ): LeaderboardEntry[] {
        const isDev = isDevMode() || (typeof location !== 'undefined' && (location.hostname === 'localhost' || location.hostname === '127.0.0.1'));
        const devRank = this.devMockRank();
        if (!isDev || !devRank || devRank < 1 || devRank > 3) {
            return entries;
        }

        const user = this.auth.user();
        const myLevel = this.gamification.userLevel();
        const myStreak = this.streakRepo.streakData().currentStreak;
        const myBadges = Object.keys(this.gamification.rawState().unlockedAchievements).length;

        const existing = entries.find(e => e.userId === currentUserId);
        const filtered = entries.filter(e => e.userId !== currentUserId);

        const targetIdx = devRank - 1;
        const topNeighbor = filtered[0];
        const rank2Neighbor = filtered[1];
        const rank3Neighbor = filtered[2];

        let mockWeeklyXp = 980;
        let mockXp = 15500;

        if (targetIdx === 0) {
            mockWeeklyXp = (topNeighbor?.weeklyXp ?? 850) + 120;
            mockXp = (topNeighbor?.xp ?? 14250) + 500;
        } else if (targetIdx === 2) {
            const highWeekly = rank2Neighbor?.weeklyXp ?? 620;
            const lowWeekly = rank3Neighbor?.weeklyXp ?? 490;
            mockWeeklyXp = Math.floor((highWeekly + lowWeekly) / 2);
            const highXp = rank2Neighbor?.xp ?? 8720;
            const lowXp = rank3Neighbor?.xp ?? 5120;
            mockXp = Math.floor((highXp + lowXp) / 2);
        }

        const userEntry: LeaderboardEntry = {
            rank: devRank,
            userId: currentUserId,
            name: user?.name || existing?.name || 'You',
            avatar: user?.picture || existing?.avatar || '',
            xp: mockXp,
            weeklyXp: mockWeeklyXp,
            level: Math.max(myLevel, devRank === 1 ? 8 : 5),
            streak: Math.max(myStreak, devRank === 1 ? 14 : 7),
            badgesCount: Math.max(myBadges, devRank === 1 ? 8 : 4),
            targetLang: lang === 'all' ? (this.settings.settings().language || 'ja') : lang,
            country: this.countryService.effectiveCountry()
        };

        filtered.splice(targetIdx, 0, userEntry);

        return filtered.map((row, idx) => ({
            ...row,
            rank: idx + 1
        }));
    }

    /**
     * Sync user's latest target language and country to Supabase profile
     */
    async syncMyScore(force = false): Promise<void> {
        const now = Date.now();
        if (!force && now - this.lastSyncTime < 30000) return;
        this.lastSyncTime = now;

        const user = this.auth.user();
        if (!user) return;

        const userLang = this.settings.settings().language || 'ja';
        const targetLang = ['ja', 'ko', 'zh', 'en'].includes(userLang) ? userLang : 'ja';
        const userCountry = this.countryService.effectiveCountry();

        try {
            await this.supabase.client
                .from('profiles')
                .update({
                    target_lang: targetLang,
                    country: userCountry
                })
                .eq('id', user.id);
        } catch (err) {
            console.warn('[LeaderboardService] Profile target_lang/country sync skipped:', err);
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
            country: this.countryService.effectiveCountry()
        });
    }

    private loadFromStorage(): void {
        try {
            const parsed = this.storage.get<LeaderboardEntry[]>(STORAGE_KEY);
            if (Array.isArray(parsed) && parsed.length >= 3) {
                this.topLearners.set(parsed);
                this.computeClientUserRank(parsed);
            } else {
                const initial = mergeWithSeedLeaderboard([], null, 50, 'weekly');
                this.topLearners.set(initial);
                this.computeClientUserRank(initial);
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

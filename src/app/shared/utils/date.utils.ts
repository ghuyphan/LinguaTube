/**
 * Date Utilities
 * 
 * Standardized date formatting and ISO key generation for streaks, gamification, and caching.
 */

/**
 * Returns a `YYYY-MM-DD` date string formatted according to the client's local time zone.
 */
export function toLocalDateKey(date: Date = new Date()): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Returns a `YYYY-MM-DD` date string formatted according to UTC.
 */
export function toUtcDateKey(date: Date = new Date()): string {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Convenience alias for `toLocalDateKey(new Date())`.
 */
export function getTodayKey(): string {
    return toLocalDateKey(new Date());
}

/**
 * Returns an ISO week key string formatted as `YYYY-Www` (e.g. `2026-W12`).
 */
export function getIsoWeekKey(d = new Date()): string {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return `${date.getUTCFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
}

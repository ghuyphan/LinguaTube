/**
 * Shared formatting and utility functions
 */

/**
 * Formats a duration in seconds into 'm:ss' or 'h:mm:ss'
 */
export function formatTime(seconds?: number | null): string {
    if (seconds == null || isNaN(seconds) || seconds <= 0) {
        return '0:00';
    }
    const totalSecs = Math.floor(seconds);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    const formattedSecs = secs.toString().padStart(2, '0');

    if (mins >= 60) {
        const hrs = Math.floor(mins / 60);
        const remainingMins = mins % 60;
        return `${hrs}:${remainingMins.toString().padStart(2, '0')}:${formattedSecs}`;
    }

    return `${mins}:${formattedSecs}`;
}

/**
 * Returns a standardized YouTube thumbnail URL
 */
export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'mqdefault' | 'hqdefault' | 'maxresdefault' = 'mqdefault'): string {
    return `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * Generates a PocketBase-compatible 15-character random alphanumeric ID
 */
export function generateRandomId(length = 15): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export type VolumeIconName = 'volume-2' | 'volume-1' | 'volume-x';

/**
 * Returns the appropriate volume icon name based on volume level and mute state
 */
export function getVolumeIcon(volume: number, isMuted: boolean): VolumeIconName {
    if (isMuted || volume === 0) return 'volume-x';
    if (volume < 50) return 'volume-1';
    return 'volume-2';
}

function normalizeCountry(value) {
    const country = typeof value === 'string' ? value.trim().toUpperCase() : '';
    return /^[A-Z]{2}$/.test(country) && country !== 'XX' ? country : null;
}

export function viewerCountry(request) {
    return normalizeCountry(request?.cf?.country ?? request?.headers.get('CF-IPCountry'));
}

export function normalizeRegionRestriction(value) {
    if (value == null) return null;
    if (typeof value !== 'object' || Array.isArray(value)) {
        throw new Error('Invalid YouTube region restriction');
    }
    const restriction = {};
    for (const key of ['allowed', 'blocked']) {
        if (!Object.hasOwn(value, key)) continue;
        if (!Array.isArray(value[key]) || value[key].some(country => !normalizeCountry(country))) {
            throw new Error('Invalid YouTube region restriction');
        }
        restriction[key] = [...new Set(value[key].map(normalizeCountry))].sort();
    }
    return restriction.allowed || restriction.blocked?.length ? restriction : null;
}

export function blockReasonFromYouTubeItem(item) {
    if (!item) return 'video_unavailable';
    if (item.status?.privacyStatus === 'private') return 'video_unavailable';
    if (item.status?.embeddable === false) return 'youtube_api_not_embeddable';
    if (item.contentDetails?.contentRating?.ytRating === 'ytAgeRestricted') return 'age_restricted';
    return null;
}

function parseRestriction(raw) {
    if (!raw) return null;
    if (typeof raw !== 'string') return raw;
    try { return JSON.parse(raw); } catch { return null; }
}

// Single availability check for recommendations, video-info, and transcript short-circuit.
export function playbackAvailability(video, country) {
    if (video?.embed_blocked || video?.embedBlocked || video?.embeddable === false || video?.blockReason) {
        return 'embed_blocked';
    }
    const restriction = parseRestriction(video?.region_restriction ?? video?.regionRestriction);
    if (!restriction) return 'available';
    if (restriction.allowed?.length === 0) return 'region_blocked';
    const normalizedCountry = normalizeCountry(country);
    if (!normalizedCountry) return 'unknown';
    if ((restriction.allowed && !restriction.allowed.includes(normalizedCountry)) || restriction.blocked?.includes(normalizedCountry)) {
        return 'region_blocked';
    }
    return 'available';
}

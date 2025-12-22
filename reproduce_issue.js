
const videoId = '0dPPSLKgS8U';

// Mock Log function
const log = console.log;

// Mock parseCaption function (simplified for test)
function parseCaption(text, format) {
    if (text && (text.includes('WEBVTT') || text.includes('-->') || text.includes('<text'))) {
        return [{ text: 'mock segment' }]; // Just return something to indicate success
    }
    return null;
}

/**
 * Strategy 3: Third-party APIs (Piped/Invidious)
 */
async function tryThirdPartyAPIs(videoId) {
    const apis = [
        // Piped Instances
        { url: `https://pipedapi.kavin.rocks/streams/${videoId}`, name: 'kavin.rocks (Piped)', type: 'piped' },
        { url: `https://api.piped.video/streams/${videoId}`, name: 'piped.video (Piped)', type: 'piped' },
        { url: `https://pipedapi.drg.li/streams/${videoId}`, name: 'drg.li (Piped)', type: 'piped' },
        { url: `https://api.piped.privacydev.net/streams/${videoId}`, name: 'privacydev (Piped)', type: 'piped' },
        { url: `https://pipedapi.ducks.party/streams/${videoId}`, name: 'ducks.party (Piped)', type: 'piped' },
        { url: `https://pipedapi.adminforge.de/streams/${videoId}`, name: 'adminforge (Piped)', type: 'piped' },

        // Invidious Instances
        { url: `https://yewtu.be/api/v1/captions/${videoId}`, name: 'yewtu.be (Invidious)', type: 'invidious' },
        { url: `https://vid.puffyan.us/api/v1/captions/${videoId}`, name: 'puffyan (Invidious)', type: 'invidious' },
        { url: `https://invidious.drg.li/api/v1/captions/${videoId}`, name: 'drg.li (Invidious)', type: 'invidious' },
        { url: `https://inv.tux.pizza/api/v1/captions/${videoId}`, name: 'tux.pizza (Invidious)', type: 'invidious' },
        { url: `https://invidious.nerdvpn.de/api/v1/captions/${videoId}`, name: 'nerdvpn (Invidious)', type: 'invidious' }
    ];

    for (const api of apis) {
        try {
            log('Trying', api.name);

            // Use AbortSignal for tighter timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 6000);

            const response = await fetch(api.url, {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (!response.ok) {
                log(api.name, 'Status:', response.status);
                continue;
            }

            const data = await response.json();
            const captionTracks = [];

            // Handle Piped Response
            if (api.type === 'piped') {
                if (!data.subtitles || data.subtitles.length === 0) {
                    log(api.name, '- no subtitles');
                    continue;
                }

                log(api.name, '- found', data.subtitles.length, 'subtitles');

                for (const sub of data.subtitles) {
                    try {
                        const content = await fetchThirdPartyContent(sub.url);
                        if (content && content.length > 0) {
                            captionTracks.push({
                                baseUrl: sub.url,
                                languageCode: sub.code,
                                name: { simpleText: sub.name || sub.code },
                                content: content
                            });
                            log(api.name, '- fetched content for', sub.code);
                        }
                    } catch (e) {
                        // ignore failed track
                    }
                }
            }
            // Handle Invidious Response
            else if (api.type === 'invidious') {
                // Invidious returns { captions: [...] } or just [...]
                const captions = Array.isArray(data.captions) ? data.captions : (Array.isArray(data) ? data : []);

                if (captions.length === 0) {
                    log(api.name, '- no subtitles');
                    continue;
                }

                log(api.name, '- found', captions.length, 'subtitles');

                for (const sub of captions) {
                    try {
                        // Invidious URLs are relative, need to prepend instance URL
                        const instanceUrl = new URL(api.url).origin;
                        const fullUrl = sub.url.startsWith('http') ? sub.url : `${instanceUrl}${sub.url}`;

                        const content = await fetchThirdPartyContent(fullUrl);
                        if (content && content.length > 0) {
                            captionTracks.push({
                                baseUrl: fullUrl,
                                languageCode: sub.languageCode || sub.label,
                                name: { simpleText: sub.label || sub.languageCode },
                                content: content
                            });
                            log(api.name, '- fetched content for', sub.languageCode);
                        }
                    } catch (e) {
                        log('Invidious track error:', e.message);
                    }
                }
            }

            if (captionTracks.length > 0) {
                log('SUCCESS: Found valid captions via', api.name);
                return;
            }

        } catch (error) {
            log(api.name, 'error:', error.message);
        }
    }

    log('FAILURE: All strategies failed');
}

/**
 * Helper to fetch content from third-party URL
 */
async function fetchThirdPartyContent(url) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
        const response = await fetch(url, {
            headers: { 'Accept': '*/*' },
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
            const text = await response.text();
            // Piped/Invidious usually return VTT
            return parseCaption(text, 'vtt');
        }
        return null;
    } catch (e) {
        return null;
    }
}

tryThirdPartyAPIs(videoId);

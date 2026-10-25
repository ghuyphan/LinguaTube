import { enrichSegmentsWithTokens } from '../utils/tokenizer.js';

// Optional token enrichment never owns transcript availability or completion.
// Keep Gemini's tokenizer implementation unchanged; bound only the caller's wait.
const pendingEnrichment = new Map();
export async function enrichPublishedTranscript(bucket, videoId, language, budgetMs = 3000) {
    if (!bucket) return false;
    const key = `transcripts/${videoId}/${language}.json`;
    if (pendingEnrichment.has(key)) return pendingEnrichment.get(key);
    if (pendingEnrichment.size >= 30) return false;
    const pending = (async () => {
        let timer;
        try {
            const object = await bucket.get(key);
            if (!object) return false;
            const data = await object.json();
            if (!data?.segments?.length || data.segments.every(s => s.tokens?.length)) return true;
            const segments = await Promise.race([
                enrichSegmentsWithTokens(data.segments, language),
                new Promise(resolve => { timer = setTimeout(() => resolve(null), budgetMs); })
            ]);
            if (!segments) return false;
            const saved = await bucket.put(key, JSON.stringify({ ...data, segments }), {
                onlyIf: { etagMatches: object.etag }, httpMetadata: { contentType: 'application/json' },
                customMetadata: { ...object.customMetadata }
            });
            return saved !== null;
        } catch { return false; }
        finally { clearTimeout(timer); }
    })();
    pendingEnrichment.set(key, pending);
    try { return await pending; }
    finally { if (pendingEnrichment.get(key) === pending) pendingEnrichment.delete(key); }
}

import { getTranscriptKey, putTranscriptObject, readTranscriptObject } from '../data/transcript-r2.js';
import { enrichSegmentsWithTokens, segmentsNeedEnrichment } from '../utils/tokenizer.js';

// Optional token enrichment never owns transcript availability or completion.
// Keep Gemini's tokenizer implementation unchanged; bound only the caller's wait.
const pendingEnrichment = new Map();
const MAX_ENRICHMENT_CUES = 800;
const MAX_ENRICHMENT_CHARACTERS = 64000;
export async function enrichPublishedTranscript(bucket, videoId, language, budgetMs = 3000, isAI = false, tokenOpts = {}) {
    if (!bucket) return false;
    const key = getTranscriptKey(videoId, language, isAI);
    if (pendingEnrichment.has(key)) return pendingEnrichment.get(key);
    if (pendingEnrichment.size >= 30) return false;
    const pending = (async () => {
        let timer;
        try {
            const object = await bucket.get(key);
            if (!object) return false;
            const data = await readTranscriptObject(object);
            if (data?.segments?.length > MAX_ENRICHMENT_CUES ||
                data?.segments?.reduce((length, cue) => length + (cue.text?.length ?? 0), 0) > MAX_ENRICHMENT_CHARACTERS) return false;
            if (!data?.segments?.length || !segmentsNeedEnrichment(data.segments, language)) return true;
            const segments = await Promise.race([
                enrichSegmentsWithTokens(data.segments, language, {
                    allowFallback: false,
                    kuromojiTimeoutMs: Math.max(1500, budgetMs - 400),
                    ...tokenOpts
                }),
                new Promise(resolve => { timer = setTimeout(() => resolve(null), budgetMs); })
            ]);
            if (!segments || segmentsNeedEnrichment(segments, language)) return false;
            const saved = await putTranscriptObject(bucket, key, { ...data, segments }, {
                onlyIf: { etagMatches: object.etag }, httpMetadata: { ...object.httpMetadata, contentType: 'application/json' },
                customMetadata: { ...object.customMetadata }
            }, object.httpMetadata?.contentEncoding === 'gzip');
            return saved !== null;
        } catch { return false; }
        finally { clearTimeout(timer); }
    })();
    pendingEnrichment.set(key, pending);
    try { return await pending; }
    finally { if (pendingEnrichment.get(key) === pending) pendingEnrichment.delete(key); }
}

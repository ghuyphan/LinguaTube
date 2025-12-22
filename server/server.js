const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

/**
 * POST /api/whisper
 * Transcribe YouTube video using Gladia API
 * Gladia accepts YouTube URLs directly - no audio extraction needed!
 */
app.post('/api/whisper', async (req, res) => {
    const { videoId, result_url: providedResultUrl } = req.body;
    const gladiaKey = process.env.GLADIA_API_KEY;

    if (!gladiaKey) {
        return res.status(500).json({
            error: 'GLADIA_API_KEY not set. Get your free key at gladia.io'
        });
    }

    let resultUrl = providedResultUrl;

    if (!resultUrl) {
        if (!videoId) {
            return res.status(400).json({ error: 'videoId is required' });
        }

        const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
        console.log(`[Gladia] Starting transcription for: ${youtubeUrl}`);

        try {
            // Step 1: Submit transcription request to Gladia
            const submitResponse = await fetch('https://api.gladia.io/v2/pre-recorded', {
                method: 'POST',
                headers: {
                    'x-gladia-key': gladiaKey,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    audio_url: youtubeUrl
                })
            });

            if (!submitResponse.ok) {
                const errorData = await submitResponse.json().catch(() => ({}));
                console.log('[Gladia] Full error:', JSON.stringify(errorData, null, 2));
                throw new Error(`Gladia submit failed: ${submitResponse.status} - ${JSON.stringify(errorData)}`);
            }

            const submitData = await submitResponse.json();
            console.log('[Gladia] Transcription submitted:', submitData.id || 'pending');
            resultUrl = submitData.result_url;

            if (!resultUrl) {
                throw new Error('No result_url returned from Gladia');
            }
        } catch (error) {
            console.error('[Gladia] Submit Error:', error.message);
            return res.status(500).json({ error: error.message });
        }
    } else {
        console.log('[Gladia] Polling existing job:', resultUrl);
    }

    try {
        // Step 2: Poll for results (Gladia is async)
        // For local dev, we can set a shorter timeout to simulate Cloudflare behavior if we want,
        // but 20-30s is good to mimic the "return processing" behavior.
        const startTime = Date.now();
        const MAX_DURATION_MS = 25000;
        const pollInterval = 3000;

        while (Date.now() - startTime < MAX_DURATION_MS) {

            // Check if we are running out of time
            if (Date.now() - startTime > 20000) {
                console.log('[Gladia] Timeout limit reached, returning processing status');
                return res.json({
                    status: 'processing',
                    result_url: resultUrl
                });
            }

            await new Promise(resolve => setTimeout(resolve, pollInterval));

            const resultResponse = await fetch(resultUrl, {
                headers: { 'x-gladia-key': gladiaKey }
            });

            if (!resultResponse.ok) {
                console.log(`[Gladia] Poll failed: ${resultResponse.status}`);
                continue;
            }

            const resultData = await resultResponse.json();

            if (resultData.status === 'done') {
                console.log(`[Gladia] Transcription complete!`);

                // Convert Gladia format to our expected format
                const utterances = resultData.result?.transcription?.utterances || [];
                const segments = utterances.map((utt, index) => ({
                    id: index,
                    text: utt.text?.trim() || '',
                    start: utt.start || 0,
                    duration: (utt.end || 0) - (utt.start || 0)
                }));

                return res.json({
                    success: true,
                    language: resultData.result?.transcription?.languages?.[0] || 'unknown',
                    duration: resultData.result?.metadata?.audio_duration || 0,
                    segments
                });
            }

            if (resultData.status === 'error') {
                throw new Error(`Gladia transcription error: ${resultData.error_message || 'Unknown'}`);
            }

            console.log(`[Gladia] Status: ${resultData.status}`);
        }

        // If time runs out
        return res.json({
            status: 'processing',
            result_url: resultUrl
        });

    } catch (error) {
        console.error('[Gladia] Error:', error.message);
        res.status(500).json({
            error: error.message || 'Transcription failed'
        });
    }
});

/**
 * GET /api/mdbg
 * Scrape MDBG for Chinese dictionary entries
 * Mirrors functions/api/mdbg.js logic for local dev
 */
app.get('/api/mdbg', async (req, res) => {
    const word = req.query.q;
    if (!word) {
        return res.status(400).json({ error: 'Missing query parameter "q"' });
    }

    try {
        const targetUrl = `https://www.mdbg.net/chinese/dictionary?page=worddict&wdqt=${encodeURIComponent(word)}&wdrst=0&wdqtm=0&wdqcham=1`;
        console.log(`[MDBG Local] Fetching: ${targetUrl}`);

        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        const html = await response.text();
        const entries = [];

        // Simple Regex Parser for Local Dev
        // Split by rows to isolate entries
        const rowSplits = html.split('<tr class="row">');

        for (let i = 1; i < rowSplits.length; i++) {
            const rowFragment = rowSplits[i].split('</tr>')[0];

            // Extract Word
            // Note: MDBG change class mpt1-mpt5 based on tone. We should match any mpt digit or just span
            const wordMatch = rowFragment.match(/<span class="mpt\d">([^<]+)<\/span>/);
            const word = wordMatch ? wordMatch[1].trim() : null;

            if (!word) continue;

            // Extract Pinyin (it appears after the word usually in a div class="pinyin")
            const pinyinMatch = rowFragment.match(/<div class="pinyin"[^>]*>.*?<span class="mpt\d">([^<]+)<\/span>/s);
            const pinyin = pinyinMatch ? pinyinMatch[1].trim() : '';

            // Extract Definitions
            const defsMatch = rowFragment.match(/<div class="defs">([\s\S]*?)<\/div>/);
            let definitions = [];
            let hsk = null;

            if (defsMatch) {
                // Remove tags but keep slashes usually denoted by <strong>/</strong>
                // We'll just strip all tags and split by /
                const rawDefs = defsMatch[1];
                const textOnly = rawDefs.replace(/<[^>]+>/g, '/'); // distinct separators
                definitions = textOnly.split('/')
                    .map(d => d.trim())
                    .filter(d => d && d !== '&nbsp;');
            }

            // Extract HSK
            const hskMatch = rowFragment.match(/HSK\s*(\d+)/);
            if (hskMatch) {
                hsk = parseInt(hskMatch[1]);
            }

            entries.push({
                word,
                pinyin,
                definitions,
                hsk
            });
        }

        res.json(entries);

    } catch (error) {
        console.error('[MDBG Local] Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /api/krdict
 * Fetch Korean dictionary entries from Naver API
 * Mirrors functions/api/krdict.js logic for local dev
 */
app.get('/api/krdict', async (req, res) => {
    const word = req.query.q;
    if (!word) {
        return res.status(400).json({ error: 'Missing query parameter "q"' });
    }

    try {
        const targetUrl = `https://en.dict.naver.com/api3/enko/search?query=${encodeURIComponent(word)}&m=pc&range=all`;
        console.log(`[KRDict Local] Fetching: ${targetUrl}`);

        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json',
                'Referer': 'https://en.dict.naver.com/'
            }
        });

        if (!response.ok) {
            throw new Error(`Naver API returned ${response.status}`);
        }

        const data = await response.json();

        // Parse searchResultMap -> searchResultListMap -> WORD -> items
        const wordResults = data?.searchResultMap?.searchResultListMap?.WORD?.items || [];

        const entries = wordResults.slice(0, 5).map(item => {
            // Extract word (handle HTML entities)
            const word = (item.expEntry || '').replace(/<[^>]+>/g, '');

            // Extract romanization/pronunciation
            const romanization = (item.expEntrySuperscript || item.phoneticSigns?.[0]?.sign || '').replace(/<[^>]+>/g, '');

            // Extract definitions from meansCollector
            const definitions = [];
            if (item.meansCollector) {
                item.meansCollector.forEach(collector => {
                    if (collector.means) {
                        collector.means.forEach(mean => {
                            const def = (mean.value || '').replace(/<[^>]+>/g, '').trim();
                            if (def) definitions.push(def);
                        });
                    }
                });
            }

            // Extract part of speech
            const partOfSpeech = (item.sourceDictnameKo || '').replace(/<[^>]+>/g, '');

            return {
                word,
                romanization,
                definitions,
                partOfSpeech
            };
        }).filter(e => e.word && e.definitions.length > 0);

        res.json(entries);

    } catch (error) {
        console.error('[KRDict Local] Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        hasGladiaKey: !!process.env.GLADIA_API_KEY
    });
});

/**
 * POST /api/tokenize/zh
 * Tokenize Chinese text using Intl.Segmenter (built into Node.js)
 */
const zhSegmenter = new Intl.Segmenter('zh', { granularity: 'word' });

app.post('/api/tokenize/zh', async (req, res) => {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid "text" field' });
    }

    try {
        // Use Intl.Segmenter for word segmentation
        const segments = [...zhSegmenter.segment(text)];

        const tokens = segments
            .filter(seg => seg.isWordLike || seg.segment.trim())
            .map(seg => ({ surface: seg.segment }));

        res.json({ tokens });
    } catch (error) {
        console.error('[Tokenize ZH] Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/tokenize/ja
 * Tokenize Japanese text using Intl.Segmenter (built into Node.js)
 */
const jaSegmenter = new Intl.Segmenter('ja', { granularity: 'word' });

app.post('/api/tokenize/ja', async (req, res) => {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid "text" field' });
    }

    try {
        // Use Intl.Segmenter for word segmentation
        const segments = [...jaSegmenter.segment(text)];

        const tokens = segments
            .filter(seg => seg.isWordLike || seg.segment.trim())
            .map(seg => ({ surface: seg.segment }));

        res.json({ tokens });
    } catch (error) {
        console.error('[Tokenize JA] Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/tokenize/ko
 * Tokenize Korean text using Intl.Segmenter (built into Node.js)
 * Korean is space-delimited, making segmentation straightforward
 */
const koSegmenter = new Intl.Segmenter('ko', { granularity: 'word' });

app.post('/api/tokenize/ko', async (req, res) => {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid "text" field' });
    }

    try {
        // Use Intl.Segmenter for word segmentation
        const segments = [...koSegmenter.segment(text)];

        const tokens = segments
            .filter(seg => seg.isWordLike || seg.segment.trim())
            .map(seg => ({ surface: seg.segment }));

        res.json({ tokens });
    } catch (error) {
        console.error('[Tokenize KO] Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`[Server] Gladia transcription server running on port ${PORT}`);
    if (!process.env.GLADIA_API_KEY) {
        console.warn('[Server] WARNING: GLADIA_API_KEY not set!');
        console.warn('[Server] Get your free key at: https://gladia.io');
    }
});

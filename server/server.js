const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { pinyin } = require('pinyin-pro');

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

    // Security: Validate result_url to prevent SSRF and API key leakage
    if (providedResultUrl) {
        try {
            const parsed = new URL(providedResultUrl);
            if (parsed.protocol !== 'https:' || parsed.hostname !== 'api.gladia.io') {
                return res.status(400).json({ error: 'Invalid result_url: must be a gladia.io URL' });
            }
        } catch {
            return res.status(400).json({ error: 'Invalid result_url format' });
        }
    }

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
        const rowSplits = html.split('<tr class="row">');

        for (let i = 1; i < rowSplits.length; i++) {
            const rowFragment = rowSplits[i].split('</tr>')[0];

            // Extract headword
            const otxtMatch = rowFragment.match(/<td[^>]*class="[^"]*otxtbot[^"]*"[^>]*>([\s\S]*?)<\/td>/);
            const hanziMatch = rowFragment.match(/<div class="hanzi">([\s\S]*?)<\/div>/);
            let w = '';
            if (otxtMatch && otxtMatch[1].replace(/<[^>]+>/g, '').trim()) {
                w = otxtMatch[1].replace(/<[^>]+>/g, '').trim();
            } else if (hanziMatch) {
                w = [...hanziMatch[1].matchAll(/<span[^>]*>([^<]+)<\/span>/g)]
                    .map(m => m[1].trim())
                    .join('');
            }
            if (!w) continue;

            // Extract pinyin with spaces between syllables
            const pinyinMatch = rowFragment.match(/<div class="pinyin"[^>]*>([\s\S]*?)<\/div>/);
            const pinyin = pinyinMatch
                ? [...pinyinMatch[1].matchAll(/<span[^>]*>([^<]+)<\/span>/g)]
                    .map(m => m[1].trim())
                    .join(' ')
                : '';

            // Extract Definitions
            const defsMatch = rowFragment.match(/<div class="defs">([\s\S]*?)<\/div>/);
            let definitions = [];
            let hsk = null;

            if (defsMatch) {
                const rawDefs = defsMatch[1];
                const textOnly = rawDefs.replace(/<[^>]+>/g, '/');
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
                word: w,
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

/**
 * GET /api/dict
 * Unified dictionary lookup supporting ja, zh, ko, en across target languages
 */
const BROWSER_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache'
};

async function translateWithGtx(text, source, target) {
    if (!text || source === target) return text;
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;
        const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(4000) });
        if (res.ok) {
            const data = await res.json();
            return data[0]?.map(item => item[0]).join('') || text;
        }
    } catch (e) {
        console.warn('[GTX Translate] Error:', e.message);
    }
    return text;
}

async function fetchDictLocal(word, from, to) {
    const pair = `${from}-${to}`;
    let entries = [];
    let source = 'none';

    try {
        if (pair === 'ja-en') {
            const res = await fetch('https://jotoba.de/api/search/words', {
                method: 'POST',
                headers: { ...BROWSER_HEADERS, 'Content-Type': 'application/json', 'Referer': 'https://jotoba.de/' },
                body: JSON.stringify({ query: word, language: 'English', no_english: false }),
                signal: AbortSignal.timeout(5000)
            });
            if (res.ok) {
                const data = await res.json();
                entries = (data.words || []).slice(0, 5).map(e => ({
                    word: e.reading?.kanji || e.reading?.kana || word,
                    reading: e.reading?.kana || '',
                    definitions: (e.senses || []).map(s => (s.glosses || []).join(', ')).filter(Boolean),
                    partOfSpeech: (e.senses?.[0]?.pos || []).map(p => typeof p === 'string' ? p : p.Pretty || '').filter(Boolean).join(', '),
                    level: e.common?.jlpt ? parseInt(e.common.jlpt) : null
                })).filter(e => e.word && e.definitions.length > 0);
                if (entries.length > 0) source = 'jotoba';
            }
        } else if (pair === 'ja-vi') {
            const res = await fetch('https://mazii.net/api/search', {
                method: 'POST',
                headers: { ...BROWSER_HEADERS, 'Content-Type': 'application/json', 'Referer': 'https://mazii.net/' },
                body: JSON.stringify({ dict: 'javi', type: 'word', query: word, page: 1 }),
                signal: AbortSignal.timeout(5000)
            });
            if (res.ok) {
                const data = await res.json();
                const results = data.data || data.results || [];
                entries = results.slice(0, 5).map(e => {
                    const defs = [];
                    if (Array.isArray(e.means)) {
                        e.means.forEach(m => {
                            if (m.mean) {
                                const clean = m.mean.replace(/<[^>]+>/g, '').trim();
                                if (clean) defs.push(clean);
                            }
                        });
                    }
                    if (defs.length === 0 && e.short_mean) defs.push(e.short_mean);
                    return {
                        word: e.word || word,
                        reading: e.phonetic || '',
                        definitions: defs,
                        partOfSpeech: e.means?.[0]?.kind || '',
                        level: e.level ? parseInt(String(e.level).replace('N', '')) : null
                    };
                }).filter(e => e.word && e.definitions.length > 0);
                if (entries.length > 0) source = 'mazii';
            }
        } else if (pair === 'ko-vi') {
            const url = `https://ko.dict.naver.com/api3/kovi/search?query=${encodeURIComponent(word)}&m=pc&range=all`;
            const res = await fetch(url, { headers: { ...BROWSER_HEADERS, 'Referer': 'https://ko.dict.naver.com/' }, signal: AbortSignal.timeout(5000) });
            if (res.ok) {
                const data = await res.json();
                const items = data?.searchResultMap?.searchResultListMap?.WORD?.items || [];
                entries = items.slice(0, 5).map(item => {
                    const w = (item.expEntry || '').replace(/<[^>]+>/g, '');
                    const reading = (item.expEntrySuperscript || item.phoneticSigns?.[0]?.sign || '').replace(/<[^>]+>/g, '');
                    const definitions = [];
                    (item.meansCollector || []).forEach(c => {
                        (c.means || []).forEach(m => {
                            const def = (m.value || '').replace(/<[^>]+>/g, '').trim();
                            if (def) definitions.push(def);
                        });
                    });
                    const partOfSpeech = (item.sourceDictnameKo || '').replace(/<[^>]+>/g, '');
                    return { word: w, reading, definitions, partOfSpeech };
                }).filter(e => e.word && e.definitions.length > 0);
                if (entries.length > 0) source = 'naver';
            }
        } else if (pair.startsWith('ko-') || pair.endsWith('-ko')) {
            const naverMap = {
                'ko-en': 'https://en.dict.naver.com/api3/enko/search',
                'ko-ja': 'https://ja.dict.naver.com/api3/koja/search',
                'ko-zh': 'https://zh.dict.naver.com/api3/kozh/search',
                'ko-ko': 'https://ko.dict.naver.com/api3/koko/search',
                'ja-ko': 'https://ko.dict.naver.com/api3/jako/search',
                'zh-ko': 'https://ko.dict.naver.com/api3/zhko/search'
            };
            const endpoint = naverMap[pair];
            if (endpoint) {
                const res = await fetch(`${endpoint}?query=${encodeURIComponent(word)}&m=pc&range=all`, {
                    headers: { ...BROWSER_HEADERS, 'Referer': endpoint },
                    signal: AbortSignal.timeout(5000)
                });
                if (res.ok) {
                    const data = await res.json();
                    const items = data?.searchResultMap?.searchResultListMap?.WORD?.items || [];
                    entries = items.slice(0, 5).map(item => {
                        const w = (item.expEntry || '').replace(/<[^>]+>/g, '');
                        const reading = (item.expEntrySuperscript || item.phoneticSigns?.[0]?.sign || '').replace(/<[^>]+>/g, '');
                        const definitions = [];
                        (item.meansCollector || []).forEach(c => {
                            (c.means || []).forEach(m => {
                                const def = (m.value || '').replace(/<[^>]+>/g, '').trim();
                                if (def) definitions.push(def);
                            });
                        });
                        const partOfSpeech = (item.sourceDictnameKo || '').replace(/<[^>]+>/g, '');
                        return { word: w, reading, definitions, partOfSpeech };
                    }).filter(e => e.word && e.definitions.length > 0);
                    if (entries.length > 0) source = 'naver';
                }
            }
        } else if (pair === 'zh-en') {
            const url = `https://www.mdbg.net/chinese/dictionary?page=worddict&wdqt=${encodeURIComponent(word)}&wdrst=0`;
            const res = await fetch(url, { headers: BROWSER_HEADERS, signal: AbortSignal.timeout(5000) });
            if (res.ok) {
                const html = await res.text();
                const rowSplits = html.split('<tr class="row">');
                for (let i = 1; i < rowSplits.length && entries.length < 5; i++) {
                    const rowFragment = rowSplits[i].split('</tr>')[0];
                    const otxtMatch = rowFragment.match(/<td[^>]*class="[^"]*otxtbot[^"]*"[^>]*>([\s\S]*?)<\/td>/);
                    const hanziMatch = rowFragment.match(/<div class="hanzi">([\s\S]*?)<\/div>/);
                    let w = '';
                    if (otxtMatch && otxtMatch[1].replace(/<[^>]+>/g, '').trim()) {
                        w = otxtMatch[1].replace(/<[^>]+>/g, '').trim();
                    } else if (hanziMatch) {
                        w = [...hanziMatch[1].matchAll(/<span[^>]*>([^<]+)<\/span>/g)].map(m => m[1].trim()).join('');
                    }
                    if (!w) continue;
                    const pinyinMatch = rowFragment.match(/<div class="pinyin"[^>]*>([\s\S]*?)<\/div>/);
                    const rd = pinyinMatch ? [...pinyinMatch[1].matchAll(/<span[^>]*>([^<]+)<\/span>/g)].map(m => m[1].trim()).join(' ') : '';
                    const defsMatch = rowFragment.match(/<div class="defs">([\s\S]*?)<\/div>/);
                    let defs = [];
                    if (defsMatch) {
                        defs = defsMatch[1].replace(/<[^>]+>/g, '/').split('/').map(d => d.trim()).filter(d => d && d !== '&nbsp;');
                    }
                    const hskMatch = rowFragment.match(/HSK\s*(\d+)/);
                    const level = hskMatch ? parseInt(hskMatch[1]) : null;
                    if (defs.length > 0) {
                        entries.push({ word: w, reading: rd, definitions: defs, partOfSpeech: '', level });
                    }
                }
                if (entries.length > 0) source = 'mdbg';
            }
        } else if (pair === 'zh-vi') {
            const url = `https://glosbe.com/zh/vi/${encodeURIComponent(word)}`;
            const res = await fetch(url, { headers: BROWSER_HEADERS, signal: AbortSignal.timeout(5000) });
            if (res.ok) {
                const html = await res.text();
                const h3Matches = [...html.matchAll(/<h3[^>]*class="[^"]*translation__item__(?:pharse|phrase)[^"]*"[^>]*>([\s\S]*?)<\/h3>/g)];
                const seenDefs = new Set();
                const py = pinyin(word, { toneType: 'symbol' });
                for (const match of h3Matches) {
                    const def = match[1].replace(/<[^>]+>/g, '').trim();
                    if (def && !seenDefs.has(def.toLowerCase())) {
                        seenDefs.add(def.toLowerCase());
                        entries.push({ word, reading: py, definitions: [def], partOfSpeech: '' });
                        if (entries.length >= 5) break;
                    }
                }
                if (entries.length > 0) source = 'glosbe';
            }
        } else if (pair === 'en-en') {
            // Try fast Datamuse API first, then Free Dictionary API
            try {
                const dmRes = await fetch(`https://api.datamuse.com/words?sp=${encodeURIComponent(word)}&md=d&max=1`, { signal: AbortSignal.timeout(3000) });
                if (dmRes.ok) {
                    const dmData = await dmRes.json();
                    if (dmData[0]?.defs && dmData[0].defs.length > 0) {
                        const defs = dmData[0].defs.map(d => d.replace(/^[a-z]+\t/, '').trim()).filter(Boolean);
                        const pos = dmData[0].defs.map(d => d.match(/^([a-z]+)\t/)?.[1]).filter(Boolean);
                        entries = [{
                            word: dmData[0].word || word,
                            reading: '',
                            definitions: defs.slice(0, 5),
                            partOfSpeech: [...new Set(pos)].join(', ')
                        }];
                        source = 'datamuse';
                    }
                }
            } catch (e) { }

            if (entries.length === 0) {
                try {
                    const fdRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`, {
                        headers: BROWSER_HEADERS,
                        signal: AbortSignal.timeout(4000)
                    });
                    if (fdRes.ok) {
                        const data = await fdRes.json();
                        if (Array.isArray(data)) {
                            entries = data.slice(0, 3).map(entry => {
                                const defs = [];
                                const posList = [];
                                (entry.meanings || []).forEach(m => {
                                    if (m.partOfSpeech && !posList.includes(m.partOfSpeech)) posList.push(m.partOfSpeech);
                                    (m.definitions || []).forEach(d => { if (d.definition) defs.push(d.definition); });
                                });
                                return {
                                    word: entry.word || word,
                                    reading: entry.phonetics?.find(p => p.text)?.text || '',
                                    definitions: defs.slice(0, 5),
                                    partOfSpeech: posList.join(', ')
                                };
                            }).filter(e => e.word && e.definitions.length > 0);
                            if (entries.length > 0) source = 'freedict';
                        }
                    }
                } catch (e) { }
            }
        }

        // Fallback: If no entries found and target language is not English, try English source + GTX translation
        if (entries.length === 0 && to !== 'en') {
            const englishResult = await fetchDictLocal(word, from, 'en');
            if (englishResult.entries && englishResult.entries.length > 0) {
                const translatedEntries = [];
                for (const enEntry of englishResult.entries.slice(0, 2)) {
                    const translatedDefs = [];
                    for (const def of enEntry.definitions.slice(0, 3)) {
                        const tr = await translateWithGtx(def, 'en', to);
                        if (tr) translatedDefs.push(tr);
                    }
                    if (translatedDefs.length > 0) {
                        translatedEntries.push({ ...enEntry, definitions: translatedDefs });
                    }
                }
                if (translatedEntries.length > 0) {
                    return { word, from, to, source: `${englishResult.source}+gtx`, entries: translatedEntries, timestamp: Date.now() };
                }
            }
        }

        return { word, from, to, source, entries, timestamp: Date.now() };

    } catch (err) {
        console.error(`[fetchDictLocal] Error (${from}->${to}):`, err.message);
        return { word, from, to, source: 'none', entries: [], timestamp: Date.now() };
    }
}

app.get('/api/dict', async (req, res) => {
    const word = (req.query.word || '').trim();
    const from = (req.query.from || 'en').trim();
    const to = (req.query.to || 'en').trim();

    if (!word) {
        return res.status(400).json({ error: 'Missing logic parameter: word' });
    }

    try {
        const result = await fetchDictLocal(word, from, to);
        res.json(result);
    } catch (error) {
        console.error('[Dict Local] Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Diamond status check (dev mock)
let devDiamonds = 3;
let devLastRegen = Date.now();
const DEV_REGEN_INTERVAL_MS = 20 * 60 * 1000;

app.get('/api/diamonds', (req, res) => {
    res.json({
        success: true,
        diamonds: devDiamonds,
        maxDiamonds: 3,
        nextRegenAt: devDiamonds < 3 ? devLastRegen + DEV_REGEN_INTERVAL_MS : null,
        regenIntervalMs: DEV_REGEN_INTERVAL_MS
    });
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

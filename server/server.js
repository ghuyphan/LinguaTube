const express = require('express');
const fs = require('fs');
const path = require('path');
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
                entries = (data.words || []).slice(0, 5).map(e => {
                    const audio = e.audio?.url || (typeof e.audio === 'string' ? e.audio : '') || e.pitch?.audio || '';
                    return {
                        word: e.reading?.kanji || e.reading?.kana || word,
                        reading: e.reading?.kana || '',
                        definitions: (e.senses || []).map(s => (s.glosses || []).join(', ')).filter(Boolean),
                        partOfSpeech: (e.senses?.[0]?.pos || []).map(p => typeof p === 'string' ? p : p.Pretty || '').filter(Boolean).join(', '),
                        level: e.common?.jlpt ? parseInt(e.common.jlpt) : null,
                        ...(audio ? { audio } : {})
                    };
                }).filter(e => e.word && e.definitions.length > 0);
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
                    let audio = e.audio || e.phonetic_audio || e.mobile_audio || '';
                    if (audio && !audio.startsWith('http')) {
                        audio = `https://data.mazii.net/audios/${audio}`;
                    }
                    return {
                        word: e.word || word,
                        reading: e.phonetic || '',
                        definitions: defs,
                        partOfSpeech: e.means?.[0]?.kind || '',
                        level: e.level ? parseInt(String(e.level).replace('N', '')) : null,
                        ...(audio ? { audio } : {})
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
                    const audio = item.searchPhoneticSymbolList?.[0]?.phoneticSymbolAudioList?.[0]?.url
                        || item.searchSearchResultAudioList?.[0]?.url
                        || item.searchSearchResultAudioList?.[0]?.audioUrl
                        || item.phoneticSigns?.[0]?.signFile
                        || item.pronFile
                        || item.audioUrl
                        || '';
                    return { word: w, reading, definitions, partOfSpeech, ...(audio ? { audio } : {}) };
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
                        const audio = item.searchPhoneticSymbolList?.[0]?.phoneticSymbolAudioList?.[0]?.url
                            || item.searchSearchResultAudioList?.[0]?.url
                            || item.searchSearchResultAudioList?.[0]?.audioUrl
                            || item.phoneticSigns?.[0]?.signFile
                            || item.pronFile
                            || item.audioUrl
                            || '';
                        return { word: w, reading, definitions, partOfSpeech, ...(audio ? { audio } : {}) };
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
                                const audio = entry.phonetics?.find(p => p.audio && p.audio.endsWith('.mp3'))?.audio
                                    || entry.phonetics?.find(p => p.audio)?.audio
                                    || '';
                                return {
                                    word: entry.word || word,
                                    reading: entry.phonetics?.find(p => p.text)?.text || '',
                                    definitions: defs.slice(0, 5),
                                    partOfSpeech: posList.join(', '),
                                    ...(audio ? { audio } : {})
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
    try {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
        res.json({
            success: true,
            diamonds: devDiamonds,
            maxDiamonds: 3,
            nextRegenAt: devDiamonds < 3 ? devLastRegen + DEV_REGEN_INTERVAL_MS : null,
            regenIntervalMs: DEV_REGEN_INTERVAL_MS
        });
    } catch (err) {
        res.status(200).json({
            success: true,
            diamonds: 3,
            maxDiamonds: 3,
            nextRegenAt: null,
            regenIntervalMs: DEV_REGEN_INTERVAL_MS
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        hasGladiaKey: !!process.env.GLADIA_API_KEY
    });
});

const TRANSCRIPTS_CACHE_DIR = path.join(__dirname, 'transcripts_cache');
if (!fs.existsSync(TRANSCRIPTS_CACHE_DIR)) {
    try { fs.mkdirSync(TRANSCRIPTS_CACHE_DIR, { recursive: true }); } catch {}
}

function getCachedTranscript(videoId, lang) {
    try {
        if (!videoId) return null;
        const normLang = (lang || '').split('-')[0].toLowerCase();
        if (normLang) {
            const file = path.join(TRANSCRIPTS_CACHE_DIR, `${videoId}_${normLang}.json`);
            if (fs.existsSync(file)) {
                return JSON.parse(fs.readFileSync(file, 'utf-8'));
            }
        }
        const files = fs.readdirSync(TRANSCRIPTS_CACHE_DIR).filter(f => f.startsWith(`${videoId}_`) && f.endsWith('.json'));
        if (files.length > 0) {
            return JSON.parse(fs.readFileSync(path.join(TRANSCRIPTS_CACHE_DIR, files[0]), 'utf-8'));
        }
    } catch (e) {
        console.error('[Transcript Cache] Read error:', e.message);
    }
    return null;
}

function saveCachedTranscript(videoId, lang, data) {
    try {
        const normLang = (lang || 'ja').split('-')[0].toLowerCase();
        const file = path.join(TRANSCRIPTS_CACHE_DIR, `${videoId}_${normLang}.json`);
        fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
        console.error('[Transcript Cache] Write error:', e.message);
    }
}

const MIN_CUE_GAP = 0.5;
const MIN_CUE_DURATION = 0.5;
const MAX_CUE_DURATION = 10;

function cleanTranscriptSegments(segments) {
    if (!segments?.length) return [];
    const sorted = [...segments].sort((a, b) => a.start - b.start);
    const groups = [];
    let currentGroup = [];
    let groupStart = -1;

    for (const seg of sorted) {
        if (groupStart === -1 || Math.abs(seg.start - groupStart) <= MIN_CUE_GAP) {
            currentGroup.push(seg);
            if (groupStart === -1) groupStart = seg.start;
        } else {
            if (currentGroup.length > 0) groups.push(currentGroup);
            currentGroup = [seg];
            groupStart = seg.start;
        }
    }
    if (currentGroup.length > 0) groups.push(currentGroup);

    const merged = [];
    for (const group of groups) {
        if (group.length === 1) {
            merged.push({ ...group[0] });
            continue;
        }
        const best = group.reduce((a, b) => {
            const scoreA = (a.text?.trim().length || 0) + (a.duration * 10);
            const scoreB = (b.text?.trim().length || 0) + (b.duration * 10);
            return scoreB > scoreA ? b : a;
        });
        merged.push({ ...best });
    }

    const filtered = merged.filter(seg => seg.text?.trim().length > 0);

    return filtered.map((segment, index) => {
        let duration;
        if (index < filtered.length - 1) {
            const nextStart = filtered[index + 1].start;
            const gap = nextStart - segment.start;
            duration = Math.min(gap, MAX_CUE_DURATION);
        } else {
            duration = Math.min(segment.duration, MAX_CUE_DURATION);
        }
        if (duration < MIN_CUE_DURATION) duration = MIN_CUE_DURATION;
        return {
            id: index,
            text: segment.text.trim(),
            start: segment.start,
            duration: Math.round(duration * 100) / 100
        };
    });
}

/**
 * GET /api/video-info
 * Returns video metadata for local development
 */
app.get('/api/video-info', async (req, res) => {
    const videoId = req.query.videoId;
    if (!videoId) {
        return res.status(400).json({ error: 'Missing videoId' });
    }

    let title = `Video ${videoId}`;
    let channel = 'YouTube Creator';

    try {
        const oembedRes = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`, {
            signal: AbortSignal.timeout(3000)
        });
        if (oembedRes.ok) {
            const data = await oembedRes.json();
            if (data.title) title = data.title;
            if (data.author_name) channel = data.author_name;
        }
    } catch {
        // Ignore network timeout or fetch error
    }

    // Check cached transcripts on disk
    let cachedLangs = [];
    try {
        if (fs.existsSync(TRANSCRIPTS_CACHE_DIR)) {
            const files = fs.readdirSync(TRANSCRIPTS_CACHE_DIR);
            const prefix = `${videoId}_`;
            cachedLangs = files
                .filter(f => f.startsWith(prefix) && f.endsWith('.json'))
                .map(f => f.slice(prefix.length, -5));
        }
    } catch {}

    // Check native tracks using Innertube
    let nativeTracks = [];
    try {
        const { Innertube } = require('youtubei.js');
        const yt = await Innertube.create({ generate_session_locally: true });
        const info = await yt.getInfo(videoId);
        const tracks = info.captions?.caption_tracks || [];
        nativeTracks = tracks.map(t => t.language_code).filter(Boolean);
    } catch {}


    const availableLanguages = Array.from(new Set([...cachedLangs, ...nativeTracks]));

    res.json({
        videoId,
        title,
        duration: 180,
        availableLanguages,
        hasAutoCaptions: availableLanguages.length > 0,
        channel
    });
});

/**
 * Realistic dev mock subtitles (used ONLY for intentional demo/test IDs)
 */
const DEV_MOCK_SUBTITLES = {
    ja: [
        { start: 0.5, duration: 3.5, text: 'こんにちは！Vocaへようこそ。' },
        { start: 4.5, duration: 4.0, text: 'この動画では、YouTubeを使って日本語を楽しく学びます。' },
        { start: 9.0, duration: 4.5, text: '字幕の単語をクリックすると、辞書や文法の解説を確認できます。' },
        { start: 14.0, duration: 4.0, text: '気に入った単語はフラッシュカードに保存して復習しましょう。' },
        { start: 18.5, duration: 4.5, text: 'デュアル字幕機能を使えば、母国語の翻訳も同時に表示できます。' },
        { start: 23.5, duration: 4.5, text: '継続は力なり。毎日少しずつ練習することが大切です。' },
        { start: 28.5, duration: 4.0, text: 'それでは、今日のレッスンを一緒に始めましょう！' }
    ],
    zh: [
        { start: 0.5, duration: 3.5, text: '你好！欢迎来到Voca学习平台。' },
        { start: 4.5, duration: 4.0, text: '在这里你可以边看精彩视频，边轻松学习中文。' },
        { start: 9.0, duration: 4.5, text: '点击字幕中的任意词汇，就能立即查看拼音与释义。' },
        { start: 14.0, duration: 4.0, text: '将生词一键添加到你的生词本，进行间隔重复记忆。' },
        { start: 18.5, duration: 4.5, text: '开启双语字幕，可以对照母语加深理解。' },
        { start: 23.5, duration: 4.5, text: '学而时习之，不亦说乎。每天进步一点点！' },
        { start: 28.5, duration: 4.0, text: '让我们现在就开始今天的中文学习之旅吧！' }
    ],
    ko: [
        { start: 0.5, duration: 3.5, text: '안녕하세요! Voca에 오신 것을 환영합니다.' },
        { start: 4.5, duration: 4.0, text: '유튜브 영상과 함께 자연스러운 한국어를 배워보세요.' },
        { start: 9.0, duration: 4.5, text: '자막 속 단어를 클릭하면 사전 뜻과 문법을 확인할 수 있어요.' },
        { start: 14.0, duration: 4.0, text: '모르는 단어는 단어장에 저장해서 플래시카드로 복습하세요.' },
        { start: 18.5, duration: 4.5, text: '이중 자막 기능을 켜면 번역을 동시에 볼 수 있습니다.' },
        { start: 23.5, duration: 4.5, text: '시작이 반이다! 매일 꾸준히 학습하면 실력이 쑥쑥 늘어요.' },
        { start: 28.5, duration: 4.0, text: '그럼 지금 바로 오늘의 학습을 시작해 볼까요?' }
    ],
    en: [
        { start: 0.5, duration: 3.5, text: 'Welcome to Voca, your smart language learning player!' },
        { start: 4.5, duration: 4.0, text: 'Learn authentic languages naturally while watching YouTube videos.' },
        { start: 9.0, duration: 4.5, text: 'Click on any word in the subtitles to see definitions and grammar patterns.' },
        { start: 14.0, duration: 4.0, text: 'Save new vocabulary to your spaced repetition notebook for daily review.' },
        { start: 18.5, duration: 4.5, text: 'Enable dual subtitles to view translations alongside the target language.' },
        { start: 23.5, duration: 4.5, text: 'Consistency is key to mastery. Every small step counts!' },
        { start: 28.5, duration: 4.0, text: "Let's dive in and start learning together!" }
    ],
    vi: [
        { start: 0.5, duration: 3.5, text: 'Xin chào! Chào mừng bạn đến với Voca.' },
        { start: 4.5, duration: 4.0, text: 'Cùng học ngoại ngữ qua các video YouTube thực tế và sinh động.' },
        { start: 9.0, duration: 4.5, text: 'Nhấp vào bất kỳ từ nào trong phụ đề để tra từ điển tức thì.' },
        { start: 14.0, duration: 4.0, text: 'Lưu các từ mới vào sổ tay từ vựng để ôn tập với flashcard SM-2.' },
        { start: 18.5, duration: 4.5, text: 'Bật tính năng phụ đề song ngữ để xem bản dịch song song thuận tiện.' },
        { start: 23.5, duration: 4.5, text: 'Vạn sự khởi đầu nan, hãy kiên trì luyện tập mỗi ngày nhé!' },
        { start: 28.5, duration: 4.0, text: 'Nào, chúng ta cùng bắt đầu bài học hôm nay!' }
    ]
};

/**
 * Predefined dual subtitle translations for the dev mock cues
 */
const DEV_DUAL_TRANSLATIONS = {
    'こんにちは！Vocaへようこそ。': {
        en: 'Hello! Welcome to Voca.',
        vi: 'Xin chào! Chào mừng bạn đến với Voca.',
        zh: '你好！欢迎来到Voca。',
        ko: '안녕하세요! Voca에 오신 것을 환영합니다.'
    },
    'こんにちは！LinguaTubeへようこそ。': {
        en: 'Hello! Welcome to Voca.',
        vi: 'Xin chào! Chào mừng bạn đến với Voca.',
        zh: '你好！欢迎来到Voca。',
        ko: '안녕하세요! Voca에 오신 것을 환영합니다.'
    },
    'この動画では、YouTubeを使って日本語を楽しく学びます。': {
        en: 'In this video, we have fun learning Japanese using YouTube.',
        vi: 'Trong video này, chúng ta cùng học tiếng Nhật vui vẻ qua YouTube.',
        zh: '在这个视频中，我们通过YouTube快乐地学习日语。',
        ko: '이 영상에서는 유튜브로 일본어를 즐겁게 배워봅니다.'
    },
    '字幕の単語をクリックすると、辞書や文法の解説を確認できます。': {
        en: 'Click on subtitle words to view dictionary and grammar explanations.',
        vi: 'Nhấp vào từ trong phụ đề để xem từ điển và giải thích ngữ pháp.',
        zh: '点击字幕中的生词，即可查看词典和语法详解。',
        ko: '자막 속 단어를 클릭하면 사전과 문법 설명을 볼 수 있어요.'
    },
    '気に入った単語はフラッシュカードに保存して復習しましょう。': {
        en: 'Save words you like to flashcards and review them.',
        vi: 'Lưu từ vựng bạn thích vào flashcard để ôn tập nhé.',
        zh: '将喜欢的词汇保存到闪卡中随时复习吧。',
        ko: '마음에 드는 단어는 플래시카드에 저장해 복습해 보세요.'
    },
    'デュアル字幕機能を使えば、母国語の翻訳も同時に表示できます。': {
        en: 'With dual subtitles, you can display native translations at the same time.',
        vi: 'Dùng tính năng phụ đề song ngữ để hiển thị bản dịch đồng thời.',
        zh: '使用双语字幕功能，可以同时显示母语翻译。',
        ko: '이중 자막 기능을 이용하면 모국어 번역도 동시에 볼 수 있습니다.'
    },
    '継続は力なり。毎日少しずつ練習することが大切です。': {
        en: 'Continuity is strength. Practicing a little every day is important.',
        vi: 'Có công mài sắt có ngày nên kim. Luyện tập mỗi ngày một chút rất quan trọng.',
        zh: '贵在坚持。每天练习一点点非常重要。',
        ko: '티끌 모아 태산입니다. 매일 조금씩 연습하는 것이 중요해요.'
    },
    'それでは、今日のレッスンを一緒に始めましょう！': {
        en: "Now then, let's start today's lesson together!",
        vi: 'Nào, hãy cùng bắt đầu bài học hôm nay nhé!',
        zh: '那么，让我们一起开始今天的课程吧！',
        ko: '그럼 오늘의 수업을 함께 시작해 볼까요!'
    }
};

/**
 * POST /api/transcript
 * Unified Transcript API for dev mode
 * 1. Checks local disk cache (server/transcripts_cache)
 * 2. Fetches native YouTube subtitles via Innertube
 * 3. Supports Gladia AI speech-to-text generation for videos without native CC
 */
app.post('/api/transcript', async (req, res) => {
    const { videoId, lang = 'ja', preferAI, resultUrl, forceRefresh } = req.body;

    if (!videoId && !resultUrl) {
        return res.status(400).json({ success: false, error: 'videoId or resultUrl is required' });
    }

    const normalizedLang = (lang || 'ja').split('-')[0].toLowerCase();
    const gladiaKey = process.env.GLADIA_API_KEY;

    // -------------------------------------------------------------
    // Scenario 1: Polling an existing Gladia AI job
    // -------------------------------------------------------------
    if (resultUrl) {
        try {
            const parsed = new URL(resultUrl);
            if (parsed.protocol !== 'https:' || parsed.hostname !== 'api.gladia.io') {
                return res.status(400).json({ success: false, errorCode: 'INVALID_RESULT_URL', error: 'Invalid resultUrl' });
            }
        } catch {
            return res.status(400).json({ success: false, errorCode: 'INVALID_RESULT_URL', error: 'Invalid resultUrl format' });
        }

        if (!gladiaKey) {
            return res.status(500).json({ success: false, errorCode: 'GLADIA_NOT_CONFIGURED', error: 'GLADIA_API_KEY not configured' });
        }

        try {
            console.log(`[Dev Server] Polling Gladia job: ${resultUrl}`);
            const gladiaRes = await fetch(resultUrl, {
                headers: { 'x-gladia-key': gladiaKey },
                signal: AbortSignal.timeout(15000)
            });

            if (!gladiaRes.ok) {
                return res.json({
                    success: false,
                    status: 'processing',
                    resultUrl,
                    whisperAvailable: true,
                    diamonds: devDiamonds,
                    maxDiamonds: 3,
                    nextRegenAt: null,
                    timing: 50
                });
            }

            const resultData = await gladiaRes.json();
            if (resultData.status === 'processing') {
                return res.json({
                    success: false,
                    status: 'processing',
                    resultUrl,
                    whisperAvailable: true,
                    diamonds: devDiamonds,
                    maxDiamonds: 3,
                    nextRegenAt: null,
                    timing: 50
                });
            }

            if (resultData.status === 'done') {
                const utterances = resultData.result?.transcription?.utterances || [];
                const segments = utterances.map((utt, index) => ({
                    id: index,
                    text: utt.text?.trim() || '',
                    start: utt.start || 0,
                    duration: (utt.end || 0) - (utt.start || 0)
                }));
                const cleaned = cleanTranscriptSegments(segments);
                const detectedLang = resultData.result?.transcription?.languages?.[0] || normalizedLang;

                if (videoId && cleaned.length > 0) {
                    saveCachedTranscript(videoId, detectedLang, {
                        videoId,
                        language: detectedLang,
                        source: 'ai',
                        segments: cleaned
                    });
                }

                return res.json({
                    success: true,
                    videoId,
                    language: detectedLang,
                    requestedLanguage: normalizedLang,
                    segments: cleaned,
                    source: 'ai',
                    sourceDetail: 'gladia',
                    availableLanguages: {
                        native: [],
                        ai: [detectedLang]
                    },
                    whisperAvailable: true,
                    diamonds: devDiamonds,
                    maxDiamonds: 3,
                    nextRegenAt: null,
                    timing: 50
                });
            }

            if (resultData.status === 'error') {
                return res.status(500).json({
                    success: false,
                    errorCode: 'AI_TRANSCRIPTION_FAILED',
                    error: resultData.error_message || 'Gladia transcription failed'
                });
            }
        } catch (err) {
            console.error('[Dev Server] Gladia polling error:', err.message);
            return res.json({
                success: false,
                status: 'processing',
                resultUrl,
                whisperAvailable: true,
                diamonds: devDiamonds,
                maxDiamonds: 3,
                nextRegenAt: null,
                timing: 50
            });
        }
    }

    // -------------------------------------------------------------
    // Scenario 2: Check local disk cache
    // -------------------------------------------------------------
    if (!forceRefresh && !preferAI) {
        const cached = getCachedTranscript(videoId, normalizedLang);
        if (cached && cached.segments && cached.segments.length > 0) {
            console.log(`[Dev Server] Serving cached transcript for ${videoId} (${cached.language || normalizedLang}, ${cached.segments.length} cues)`);
            return res.json({
                success: true,
                videoId,
                language: cached.language || normalizedLang,
                requestedLanguage: normalizedLang,
                segments: cached.segments,
                source: cached.source || 'ai',
                sourceDetail: 'cache',
                availableLanguages: {
                    native: cached.source === 'native' ? [cached.language] : [],
                    ai: [cached.language || normalizedLang]
                },
                whisperAvailable: true,
                diamonds: devDiamonds,
                maxDiamonds: 3,
                nextRegenAt: null,
                timing: 10
            });
        }
    }

    // -------------------------------------------------------------
    // Scenario 3: AI transcription requested (preferAI: true)
    // -------------------------------------------------------------
    if (preferAI) {
        if (!gladiaKey) {
            return res.status(500).json({
                success: false,
                errorCode: 'GLADIA_NOT_CONFIGURED',
                error: 'GLADIA_API_KEY is not configured in .env'
            });
        }

        if (devDiamonds <= 0) {
            return res.status(429).json({
                success: false,
                errorCode: 'NO_DIAMONDS',
                error: 'No diamonds remaining for AI transcription.',
                diamonds: devDiamonds,
                maxDiamonds: 3,
                nextRegenAt: devLastRegen + DEV_REGEN_INTERVAL_MS
            });
        }

        devDiamonds = Math.max(0, devDiamonds - 1);
        const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
        console.log(`[Dev Server] Submitting AI transcription to Gladia for ${youtubeUrl}`);

        try {
            const submitResponse = await fetch('https://api.gladia.io/v2/pre-recorded', {
                method: 'POST',
                headers: {
                    'x-gladia-key': gladiaKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ audio_url: youtubeUrl }),
                signal: AbortSignal.timeout(15000)
            });

            if (!submitResponse.ok) {
                const errData = await submitResponse.json().catch(() => ({}));
                throw new Error(`Gladia submission failed (${submitResponse.status}): ${JSON.stringify(errData)}`);
            }

            const submitData = await submitResponse.json();
            const jobResultUrl = submitData.result_url;
            console.log(`[Dev Server] Gladia job submitted: ${jobResultUrl}`);

            // Poll for up to 18 seconds
            const startTime = Date.now();
            const MAX_INITIAL_POLL_MS = 18000;
            const pollDelay = 3000;

            while (Date.now() - startTime < MAX_INITIAL_POLL_MS) {
                await new Promise(r => setTimeout(r, pollDelay));
                const pollRes = await fetch(jobResultUrl, {
                    headers: { 'x-gladia-key': gladiaKey },
                    signal: AbortSignal.timeout(10000)
                });

                if (pollRes.ok) {
                    const pollData = await pollRes.json();
                    if (pollData.status === 'done') {
                        console.log(`[Dev Server] Gladia transcription completed!`);
                        const utterances = pollData.result?.transcription?.utterances || [];
                        const segments = utterances.map((utt, index) => ({
                            id: index,
                            text: utt.text?.trim() || '',
                            start: utt.start || 0,
                            duration: (utt.end || 0) - (utt.start || 0)
                        }));
                        const cleaned = cleanTranscriptSegments(segments);
                        const detectedLang = pollData.result?.transcription?.languages?.[0] || normalizedLang;

                        if (cleaned.length > 0) {
                            saveCachedTranscript(videoId, detectedLang, {
                                videoId,
                                language: detectedLang,
                                source: 'ai',
                                segments: cleaned
                            });
                        }

                        return res.json({
                            success: true,
                            videoId,
                            language: detectedLang,
                            requestedLanguage: normalizedLang,
                            segments: cleaned,
                            source: 'ai',
                            sourceDetail: 'gladia',
                            availableLanguages: {
                                native: [],
                                ai: [detectedLang]
                            },
                            whisperAvailable: true,
                            diamonds: devDiamonds,
                            maxDiamonds: 3,
                            nextRegenAt: null,
                            timing: Date.now() - startTime
                        });
                    }

                    if (pollData.status === 'error') {
                        throw new Error(`Gladia error: ${pollData.error_message || 'Unknown error'}`);
                    }
                }
            }

            // Still processing after 18s -> return processing so client polls
            return res.json({
                success: false,
                status: 'processing',
                resultUrl: jobResultUrl,
                whisperAvailable: true,
                diamonds: devDiamonds,
                maxDiamonds: 3,
                nextRegenAt: null,
                timing: Date.now() - startTime
            });
        } catch (err) {
            console.error('[Dev Server] Gladia AI error:', err.message);
            return res.status(500).json({
                success: false,
                errorCode: 'AI_TRANSCRIPTION_ERROR',
                error: err.message,
                whisperAvailable: true,
                diamonds: devDiamonds,
                maxDiamonds: 3,
                nextRegenAt: null
            });
        }
    }

    // -------------------------------------------------------------
    // Scenario 4: Try Native YouTube captions using Innertube with local session
    // -------------------------------------------------------------
    if (videoId !== 'demo' && videoId !== 'test') {
        try {
            const { Innertube } = require('youtubei.js');
            const yt = await Innertube.create({ generate_session_locally: true });
            const info = await yt.getInfo(videoId);


            const tracks = info.captions?.caption_tracks || [];
            const availableLangs = tracks.map(t => t.language_code).filter(Boolean);

            if (tracks.length > 0) {
                const track = tracks.find(t => t.language_code === normalizedLang || t.language_code?.toLowerCase().startsWith(normalizedLang)) || tracks[0];
                if (track && track.base_url) {
                    const userAgent = yt.session.context?.client?.userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
                    const captionRes = await fetch(`${track.base_url}&fmt=json3`, {
                        headers: { 'User-Agent': userAgent },
                        signal: AbortSignal.timeout(6000)
                    });
                    if (captionRes.ok) {
                        const timedtext = await captionRes.json();
                        const segments = (timedtext.events || [])
                            .filter(e => e.segs && e.segs.length > 0)
                            .map(e => ({
                                text: e.segs.map(s => s.utf8).join('').trim(),
                                start: (e.tStartMs || 0) / 1000,
                                duration: (e.dDurationMs || 0) / 1000
                            }))
                            .filter(s => s.text);

                        if (segments.length > 0) {
                            const cleaned = cleanTranscriptSegments(segments);
                            console.log(`[Dev Server] Retrieved ${cleaned.length} real Innertube YouTube captions for video ${videoId} (${track.language_code})`);

                            saveCachedTranscript(videoId, track.language_code || normalizedLang, {
                                videoId,
                                language: track.language_code || normalizedLang,
                                source: 'native',
                                segments: cleaned
                            });

                            return res.json({
                                success: true,
                                videoId,
                                language: track.language_code || normalizedLang,
                                requestedLanguage: normalizedLang,
                                segments: cleaned,
                                source: 'native',
                                sourceDetail: 'innertube',
                                availableLanguages: {
                                    native: availableLangs.length > 0 ? availableLangs : [normalizedLang],
                                    ai: ['ja', 'en', 'ko', 'zh', 'vi']
                                },
                                whisperAvailable: true,
                                diamonds: devDiamonds,
                                maxDiamonds: 3,
                                nextRegenAt: null,
                                timing: 50
                            });
                        }
                    }
                }
            }
        } catch (e) {
            console.log(`[Dev Server] Innertube native caption fetch: ${e.message}`);
        }
    }

    // -------------------------------------------------------------
    // Scenario 5: Demo / Test video IDs only
    // -------------------------------------------------------------
    if (videoId === 'demo' || videoId === 'test') {
        const mockList = DEV_MOCK_SUBTITLES[normalizedLang] || DEV_MOCK_SUBTITLES.ja;
        console.log(`[Dev Server] Serving dev mock subtitles for demo videoId="${videoId}" (${mockList.length} cues)`);
        return res.json({
            success: true,
            videoId,
            language: normalizedLang,
            requestedLanguage: normalizedLang,
            segments: mockList,
            source: 'native',
            sourceDetail: 'dev-mock',
            availableLanguages: {
                native: ['ja', 'zh', 'ko', 'en', 'vi'],
                ai: ['ja', 'zh', 'ko', 'en', 'vi']
            },
            whisperAvailable: true,
            diamonds: devDiamonds,
            maxDiamonds: 3,
            nextRegenAt: null,
            timing: 10
        });
    }

    // -------------------------------------------------------------
    // Scenario 6: No captions found on YouTube and not yet generated with AI
    // -------------------------------------------------------------
    console.log(`[Dev Server] No native captions found for ${videoId}. AI transcription available.`);
    return res.json({
        success: false,
        videoId,
        requestedLanguage: normalizedLang,
        segments: [],
        source: 'none',
        availableLanguages: {
            native: [],
            ai: ['ja', 'zh', 'ko', 'en', 'vi']
        },
        whisperAvailable: true,
        diamonds: devDiamonds,
        maxDiamonds: 3,
        nextRegenAt: null,
        errorCode: 'NO_NATIVE',
        error: 'No native captions found for this video. You can generate subtitles using Gladia AI.',
        timing: 50
    });
});


/**
 * POST /api/dual-subtitles
 * Generates and returns dual subtitles for dev mode
 */
app.post('/api/dual-subtitles', async (req, res) => {
    const { videoId, sourceLang, targetLang, segments } = req.body;

    if (!segments || !Array.isArray(segments)) {
        return res.status(400).json({ error: 'Missing segments array' });
    }

    const normTarget = (targetLang || 'en').split('-')[0].toLowerCase();

    // Map segments with translations
    const translatedSegments = await Promise.all(segments.map(async (seg) => {
        const text = seg.text ? seg.text.trim() : '';

        // Check predefined mock translations
        if (DEV_DUAL_TRANSLATIONS[text] && DEV_DUAL_TRANSLATIONS[text][normTarget]) {
            return {
                ...seg,
                translation: DEV_DUAL_TRANSLATIONS[text][normTarget]
            };
        }

        // Try free Google translate if online
        try {
            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(sourceLang || 'auto')}&tl=${encodeURIComponent(normTarget)}&dt=t&q=${encodeURIComponent(text)}`;
            const gRes = await fetch(url, { signal: AbortSignal.timeout(2000) });
            if (gRes.ok) {
                const data = await gRes.json();
                const trans = data?.[0]?.map(part => part[0]).join('');
                if (trans) {
                    return { ...seg, translation: trans };
                }
            }
        } catch {
            // Ignore failure
        }

        // Dev fallback translation
        return {
            ...seg,
            translation: `[${normTarget.toUpperCase()}] ${text}`
        };
    }));

    res.json({
        videoId,
        sourceLang,
        targetLang,
        segments: translatedSegments,
        cached: true,
        quality: 100
    });
});

/**
 * POST /api/tokenize-batch/:lang
 * Batch tokenization for subtitles in local dev
 */
app.post('/api/tokenize-batch/:lang', async (req, res) => {
    const { lang } = req.params;
    const { texts } = req.body;

    if (!texts || !Array.isArray(texts)) {
        return res.status(400).json({ error: 'Missing or invalid "texts" array' });
    }

    try {
        let segmenter;
        if (lang === 'zh') segmenter = zhSegmenter;
        else if (lang === 'ja') segmenter = jaSegmenter;
        else if (lang === 'ko') segmenter = koSegmenter;

        const tokens = texts.map(text => {
            if (!text || typeof text !== 'string') return [];
            if (segmenter) {
                const segs = [...segmenter.segment(text)];
                return segs
                    .filter(s => s.isWordLike || s.segment.trim())
                    .map(s => ({ surface: s.segment }));
            }
            return text.split(/\s+/).filter(Boolean).map(word => ({ surface: word }));
        });

        res.json({ tokens });
    } catch (error) {
        console.error('[Tokenize Batch] Error:', error.message);
        res.status(500).json({ error: error.message });
    }
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

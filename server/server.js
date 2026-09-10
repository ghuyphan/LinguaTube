const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config();
const cors = require('cors');
const { pinyin } = require('pinyin-pro');
const hangulRomanization = require('hangul-romanization');

const app = express();

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Singleton Innertube instance
let innertubePromise = null;
async function getInnertube() {
    if (!innertubePromise) {
        const { Innertube } = require('youtubei.js');
        innertubePromise = Innertube.create({ generate_session_locally: true }).catch(err => {
            console.error('[Innertube] Init error:', err.message);
            innertubePromise = null;
            throw err;
        });
    }
    return innertubePromise;
}

// Proxy service configurations (matching Cloudflare Worker)
const PROXY_SERVICE_CONFIG = {
    invidious1: {
        baseUrl: 'https://yewtu.be',
        methods: ['GET'],
        accept: 'application/json'
    },
    jisho: {
        baseUrl: 'https://jisho.org',
        methods: ['GET'],
        accept: '*/*'
    },
    jotoba: {
        baseUrl: 'https://jotoba.de',
        methods: ['GET', 'POST'],
        accept: 'application/json',
        contentType: 'application/json'
    },
    piped1: {
        baseUrl: 'https://pipedapi.kavin.rocks',
        methods: ['GET'],
        accept: 'application/json'
    }
};

function isInternalHost(hostname) {
    const patterns = [
        /^127\./,
        /^10\./,
        /^192\.168\./,
        /^172\.(1[6-9]|2[0-9]|3[01])\./,
        /^localhost$/i,
        /^0\.0\.0\.0$/,
        /^\[::1\]$/,
    ];
    return patterns.some(p => p.test(hostname));
}

/**
 * ALL /proxy/:service/*
 * Dev server forwarder for external APIs with SSRF protection
 */
app.all('/proxy/:service/*path', async (req, res) => {
    const { service } = req.params;
    const config = PROXY_SERVICE_CONFIG[service];

    if (!config) {
        return res.status(400).json({
            error: `Unknown service: ${service}. Available: ${Object.keys(PROXY_SERVICE_CONFIG).join(', ')}`
        });
    }

    if (!config.methods.includes(req.method)) {
        return res.status(405).json({
            error: `Method ${req.method} not allowed for ${service}`
        });
    }

    try {
        const rawPath = req.params.path;
        const subPath = Array.isArray(rawPath) ? rawPath.join('/') : (rawPath || req.params[0] || '');
        const segments = subPath.split('/').filter(seg => seg && seg !== '..' && !seg.startsWith('.'));
        const targetPath = '/' + segments.join('/');
        const queryString = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
        const targetUrl = `${config.baseUrl}${targetPath}${queryString}`;

        const parsedUrl = new URL(targetUrl);
        if (isInternalHost(parsedUrl.hostname)) {
            return res.status(400).json({ error: 'Invalid target: internal hosts not allowed' });
        }

        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': config.accept || 'application/json'
        };

        if (config.contentType) {
            headers['Content-Type'] = config.contentType;
        }

        const fetchOptions = {
            method: req.method,
            headers,
            redirect: 'error'
        };

        if (req.method === 'POST') {
            fetchOptions.body = JSON.stringify(req.body);
        }

        const response = await fetch(targetUrl, fetchOptions);
        const data = await response.text();

        res.status(response.status);
        res.set('Content-Type', response.headers.get('Content-Type') || 'application/json');
        res.set('Access-Control-Allow-Origin', '*');
        res.send(data);
    } catch (error) {
        console.error(`[Proxy Local ${service}] Error:`, error.message);
        res.status(500).json({ error: error.message });
    }
});


/**
 * Helper to translate an array of subtitle strings using tagged batching in local dev
 */
async function translateBatchWithGtx(texts, source, target) {
    if (!texts || texts.length === 0) return [];
    if (source === target) return [...texts];

    const results = new Array(texts.length).fill(null);
    const validItems = [];
    texts.forEach((text, i) => {
        if (!text || !text.trim()) {
            results[i] = text;
        } else {
            validItems.push({ index: i, text: text.trim() });
        }
    });

    if (validItems.length === 0) return results;

    // Chunk into groups with XML tags to keep 1 request per chunk
    const chunks = [];
    let currentChunk = [];
    let currentLen = 0;

    for (const item of validItems) {
        const tagLen = 20 + item.text.length;
        if (currentLen + tagLen > 1500 && currentChunk.length > 0) {
            chunks.push(currentChunk);
            currentChunk = [];
            currentLen = 0;
        }
        currentChunk.push(item);
        currentLen += tagLen;
    }
    if (currentChunk.length > 0) {
        chunks.push(currentChunk);
    }

    for (const chunk of chunks) {
        const taggedText = chunk.map((item, idx) => {
            const clean = item.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return `<t id="${idx}">${clean}</t>`;
        }).join('\n');

        try {
            const translated = await translateWithGtx(taggedText, source || 'auto', target || 'en');
            const tagRegex = /<[\s]*t[\s]+id[\s]*=[\s]*["']?(\d+)["']?[\s]*>([\s\S]*?)<\/[\s]*t[\s]*>/gi;
            let match;
            const tagMap = new Map();
            while ((match = tagRegex.exec(translated)) !== null) {
                const id = parseInt(match[1], 10);
                if (!isNaN(id) && id >= 0 && id < chunk.length) {
                    let content = match[2].trim()
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&quot;/g, '"')
                        .replace(/&#39;/g, "'")
                        .replace(/&amp;/g, '&');
                    tagMap.set(id, content);
                }
            }

            for (let idx = 0; idx < chunk.length; idx++) {
                const item = chunk[idx];
                if (tagMap.has(idx)) {
                    results[item.index] = tagMap.get(idx);
                } else {
                    results[item.index] = await translateWithGtx(item.text, source || 'auto', target || 'en');
                }
            }
        } catch {
            for (let i = 0; i < chunk.length; i += 5) {
                const slice = chunk.slice(i, i + 5);
                await Promise.allSettled(slice.map(async (item) => {
                    results[item.index] = await translateWithGtx(item.text, source || 'auto', target || 'en').catch(() => null);
                }));
            }
        }
    }

    return results;
}

/**
 * POST /api/translate/batch
 * Translate an array of subtitle strings using tagged batch GTX in local development
 */
app.post('/api/translate/batch', async (req, res) => {
    try {
        const { texts, source, target } = req.body || {};
        if (!Array.isArray(texts)) {
            return res.status(400).json({ error: 'texts must be an array' });
        }
        if (texts.length > 100) {
            return res.status(400).json({ error: 'Batch size exceeds maximum limit of 100' });
        }
        for (const t of texts) {
            if (typeof t === 'string' && t.length > 1500) {
                return res.status(400).json({ error: 'Individual text exceeds maximum length of 1500 characters' });
            }
        }
        const translations = await translateBatchWithGtx(texts, source || 'auto', target || 'en');
        res.json({ translations });
    } catch (error) {
        console.error('[Translate Batch Local] Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /api/translate/:source/:target/*
 * Translate single text in local development (supports slashes in query)
 */
app.get('/api/translate/:source/:target/*query', async (req, res) => {
    try {
        const { source, target } = req.params;
        const rawQuery = req.params.query;
        const query = Array.isArray(rawQuery) ? rawQuery.join('/') : (rawQuery || req.params[0] || '');
        const translation = await translateWithGtx(query, source, target);
        res.json({ translation });
    } catch (error) {
        console.error('[Translate Single Local] Error:', error.message);
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
    if (!text) return text;
    if (source === target) return text;

    const clients = ['gtx', 'dict-chrome-ex'];
    for (const client of clients) {
        try {
            const url = `https://translate.googleapis.com/translate_a/single?client=${client}&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;
            const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(4000) });
            if (res.ok) {
                const data = await res.json();
                const translated = data[0]?.map(item => item[0]).join('');
                if (translated) return translated;
            }
        } catch (e) {
            console.warn(`[GTX Translate ${client}] Error:`, e.message);
        }
    }
    return null;
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
                    let audio = e.audio || e.phonetic_audio || '';
                    if (audio && !audio.startsWith('http')) {
                        audio = '';
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

// Edge Neural TTS (Local Dev Server)
const EDGE_TTS_TOKEN = '6A5AA1D4EAFF4E9FB37E23D68491D6F4';
const EDGE_CHROMIUM_VERSION = '143.0.3650.75';
const EDGE_CHROMIUM_MAJOR = '143';

const EDGE_DEFAULT_VOICES = {
    ja: 'Microsoft Server Speech Text to Speech Voice (ja-JP, NanamiNeural)',
    zh: 'Microsoft Server Speech Text to Speech Voice (zh-CN, XiaoxiaoNeural)',
    ko: 'Microsoft Server Speech Text to Speech Voice (ko-KR, SunHiNeural)',
    en: 'Microsoft Server Speech Text to Speech Voice (en-US, JennyNeural)',
};

function normalizeEdgeVoice(voice, lang = 'ja') {
    if (!voice) return EDGE_DEFAULT_VOICES[lang] || EDGE_DEFAULT_VOICES.ja;
    const trimmed = voice.trim();
    if (trimmed.startsWith('Microsoft Server Speech Text to Speech Voice')) return trimmed;
    const match = /^([a-z]{2,})-([A-Z]{2,})-(.+Neural)$/.exec(trimmed);
    if (match) {
        return `Microsoft Server Speech Text to Speech Voice (${match[1]}-${match[2]}, ${match[3]})`;
    }
    return trimmed;
}

function escapeXmlTts(text) {
    return (text || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function makeSecMsGecLocal() {
    const winEpoch = 11644473600;
    const secondsToNs = 1e9;
    let ticks = Date.now() / 1000;
    ticks += winEpoch;
    ticks -= ticks % 300;
    ticks *= secondsToNs / 100;
    const payload = `${ticks.toFixed(0)}${EDGE_TTS_TOKEN}`;
    return crypto.createHash('sha256').update(payload).digest('hex').toUpperCase();
}

// In-memory audio LRU cache for local dev (max 500 entries, < 0.1ms replay)
const memAudioCacheLocal = new Map();
const MAX_MEM_AUDIO_LOCAL = 500;

function getCachedAudioLocal(key) {
    return memAudioCacheLocal.get(key) || null;
}

function setCachedAudioLocal(key, buffer) {
    if (memAudioCacheLocal.size >= MAX_MEM_AUDIO_LOCAL) {
        const oldestKey = memAudioCacheLocal.keys().next().value;
        memAudioCacheLocal.delete(oldestKey);
    }
    memAudioCacheLocal.set(key, buffer);
}

// Persistent Warm WebSocket Connection Pool
let warmWsLocal = null;
let warmWsConnectingLocal = null;
let warmWsIdleTimerLocal = null;
const activeTtsRequestsLocal = new Map();
const WARM_WS_IDLE_MS = 60000; // 60s idle disconnect

function cleanupWarmWsLocal(err) {
    if (warmWsIdleTimerLocal) {
        clearTimeout(warmWsIdleTimerLocal);
        warmWsIdleTimerLocal = null;
    }
    if (warmWsLocal) {
        try { warmWsLocal.close(); } catch (_) {}
        warmWsLocal = null;
    }
    for (const [id, req] of activeTtsRequestsLocal.entries()) {
        clearTimeout(req.timer);
        activeTtsRequestsLocal.delete(id);
        req.reject(err || new Error('Edge TTS WebSocket disconnected unexpectedly'));
    }
}

function resetWarmWsIdleTimerLocal() {
    if (warmWsIdleTimerLocal) clearTimeout(warmWsIdleTimerLocal);
    warmWsIdleTimerLocal = setTimeout(() => {
        if (activeTtsRequestsLocal.size === 0 && warmWsLocal) {
            try { warmWsLocal.close(); } catch (_) {}
            warmWsLocal = null;
        }
    }, WARM_WS_IDLE_MS);
}

async function getWarmWsLocal() {
    if (warmWsLocal && warmWsLocal.readyState === 1) { // 1 === OPEN
        resetWarmWsIdleTimerLocal();
        return warmWsLocal;
    }
    if (warmWsConnectingLocal) {
        return warmWsConnectingLocal;
    }

    warmWsConnectingLocal = new Promise(async (resolve, reject) => {
        try {
            const secMsGec = await makeSecMsGecLocal();
            const connectionId = crypto.randomUUID().replace(/-/g, '');
            const url = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=${EDGE_TTS_TOKEN}&Sec-MS-GEC=${secMsGec}&Sec-MS-GEC-Version=1-${EDGE_CHROMIUM_VERSION}&ConnectionId=${connectionId}`;

            const headers = {
                'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${EDGE_CHROMIUM_MAJOR}.0.0.0 Safari/537.36 Edg/${EDGE_CHROMIUM_MAJOR}.0.0.0`,
                'Accept-Language': 'en-US,en;q=0.9',
                Pragma: 'no-cache',
                'Cache-Control': 'no-cache',
            };

            const ws = new WebSocket(url, { headers });

            const connectTimer = setTimeout(() => {
                try { ws.close(); } catch (_) {}
                reject(new Error('Edge TTS WebSocket connection timed out'));
            }, 6000);

            ws.onopen = () => {
                clearTimeout(connectTimer);
                const timestamp = new Date().toISOString();
                const configMsg = `X-Timestamp:${timestamp}\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"false"},"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}`;
                try {
                    ws.send(configMsg);
                    warmWsLocal = ws;
                    resetWarmWsIdleTimerLocal();
                    resolve(ws);
                } catch (e) {
                    reject(e);
                }
            };

            ws.onmessage = async (event) => {
                resetWarmWsIdleTimerLocal();
                let reqId = null;
                let isEnd = false;
                let audioChunk = null;

                if (typeof event.data === 'string') {
                    const match = /X-RequestId:([a-f0-9]+)/i.exec(event.data);
                    if (match) reqId = match[1];
                    if (event.data.includes('Path:turn.end')) isEnd = true;
                } else {
                    const buffer = event.data instanceof Buffer ? event.data :
                        event.data instanceof ArrayBuffer ? Buffer.from(event.data) :
                        typeof event.data.arrayBuffer === 'function' ? Buffer.from(await event.data.arrayBuffer()) : null;

                    if (buffer && buffer.length >= 2) {
                        const headerLen = buffer.readUInt16BE(0);
                        if (buffer.length > 2 + headerLen) {
                            const headerStr = buffer.subarray(2, 2 + headerLen).toString('utf-8');
                            const match = /X-RequestId:([a-f0-9]+)/i.exec(headerStr);
                            if (match) reqId = match[1];
                            if (headerStr.includes('Path:audio')) {
                                audioChunk = buffer.subarray(2 + headerLen);
                            }
                        }
                    }
                }

                if (reqId && activeTtsRequestsLocal.has(reqId)) {
                    const req = activeTtsRequestsLocal.get(reqId);
                    if (audioChunk) req.chunks.push(audioChunk);
                    if (isEnd) {
                        clearTimeout(req.timer);
                        activeTtsRequestsLocal.delete(reqId);
                        if (req.chunks.length === 0) {
                            req.reject(new Error('Empty audio received from Edge TTS'));
                        } else {
                            req.resolve(Buffer.concat(req.chunks));
                        }
                    }
                }
            };

            ws.onerror = (err) => {
                cleanupWarmWsLocal(new Error(`Edge TTS WebSocket error: ${err?.message || err}`));
            };

            ws.onclose = () => {
                cleanupWarmWsLocal(new Error('Edge TTS WebSocket closed'));
            };
        } catch (err) {
            cleanupWarmWsLocal(err);
            reject(err);
        } finally {
            warmWsConnectingLocal = null;
        }
    });

    return warmWsConnectingLocal;
}

async function synthesizeEdgeTtsOnce(text, options = {}) {
    const lang = options.language || 'ja';
    const voiceName = normalizeEdgeVoice(options.voice, lang);
    const timeoutMs = options.timeoutMs || 6000;

    const ws = await getWarmWsLocal();
    const requestId = crypto.randomUUID().replace(/-/g, '');
    const timestamp = new Date().toISOString();
    const ssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'><voice name='${voiceName}'><prosody pitch='+0Hz' rate='+0%' volume='+0%'>${escapeXmlTts(text)}</prosody></voice></speak>`;
    const ssmlMsg = `X-RequestId:${requestId}\r\nContent-Type:application/ssml+xml\r\nX-Timestamp:${timestamp}Z\r\nPath:ssml\r\n\r\n${ssml}`;

    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            activeTtsRequestsLocal.delete(requestId);
            reject(new Error(`Edge TTS synthesis timed out after ${timeoutMs}ms`));
        }, timeoutMs);

        activeTtsRequestsLocal.set(requestId, {
            chunks: [],
            resolve: (buf) => resolve(buf),
            reject: (err) => reject(err),
            timer,
        });

        try {
            ws.send(ssmlMsg);
        } catch (err) {
            clearTimeout(timer);
            activeTtsRequestsLocal.delete(requestId);
            reject(err);
        }
    });
}

async function synthesizeEdgeTtsLocal(text, options = {}) {
    const lang = options.language || 'ja';
    const voiceName = normalizeEdgeVoice(options.voice, lang);
    const cacheKey = `${lang}:${voiceName}:${text}`;

    // 1. Instant in-memory cache hit (< 0.1ms, zero network)
    const hit = getCachedAudioLocal(cacheKey);
    if (hit) {
        return { buffer: hit, cached: true };
    }

    try {
        const buffer = await synthesizeEdgeTtsOnce(text, options);
        setCachedAudioLocal(cacheKey, buffer);
        return { buffer, cached: false };
    } catch (err) {
        // Transparent single retry with a fresh warm connection if the existing socket stale/disconnected
        cleanupWarmWsLocal();
        const buffer = await synthesizeEdgeTtsOnce(text, options);
        setCachedAudioLocal(cacheKey, buffer);
        return { buffer, cached: false };
    }
}

async function fetchGoogleTtsLocal(text, lang) {
    const tlMap = { ja: 'ja', zh: 'zh-CN', ko: 'ko', en: 'en' };
    const targetLang = tlMap[lang] || lang;
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${encodeURIComponent(targetLang)}&client=tw-ob`;
    const res = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
            'Referer': 'https://translate.google.com/',
        },
    });
    if (!res.ok) throw new Error(`Google TTS HTTP ${res.status}`);
    const arrayBuf = await res.arrayBuffer();
    return Buffer.from(arrayBuf);
}

app.all('/api/tts', async (req, res) => {
    const text = ((req.method === 'POST' ? req.body?.text : req.query.text) || '').trim();
    const lang = ((req.method === 'POST' ? (req.body?.lang || req.body?.language) : (req.query.lang || req.query.language)) || 'ja').trim();
    const voice = req.method === 'POST' ? req.body?.voice : req.query.voice;

    if (!text) {
        return res.status(400).json({ error: 'Missing required parameter: text' });
    }
    if (text.length > 300) {
        return res.status(400).json({ error: 'Text too long (max 300 characters)' });
    }

    try {
        const { buffer, cached } = await synthesizeEdgeTtsLocal(text, { language: lang, voice });
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Length', buffer.length);
        res.setHeader('Cache-Control', 'public, max-age=2592000, immutable');
        res.setHeader('X-TTS-Engine', 'Edge-Neural');
        res.setHeader('X-Cache', cached ? 'HIT-MEMORY' : 'MISS');
        res.send(buffer);
    } catch (edgeErr) {
        console.warn(`[EdgeTTS Local] Edge synthesis failed for "${text.slice(0, 30)}", falling back to Google TTS:`, edgeErr.message);
        try {
            const googleBuf = await fetchGoogleTtsLocal(text, lang);
            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('Content-Length', googleBuf.length);
            res.setHeader('Cache-Control', 'public, max-age=2592000, immutable');
            res.setHeader('X-TTS-Engine', 'Google-Fallback');
            res.setHeader('X-Cache', 'MISS');
            res.send(googleBuf);
        } catch (googleErr) {
            console.error('[TTS Local] Both Edge & Google failed:', googleErr.message);
            res.status(502).json({ error: 'TTS synthesis failed', message: edgeErr.message });
        }
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
            regenIntervalMs: DEV_REGEN_INTERVAL_MS,
            tier: 'free',
            maxVideoDurationSec: 900
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

// Local Dev Payment Mock Endpoints
const devOrders = new Map();
const DEV_PLANS = {
    pro_1m: { amount: 49000, diamonds: 10, tier: 'pro' },
    pro_1y: { amount: 450000, diamonds: 10, tier: 'pro' },
    premium_1m: { amount: 119000, diamonds: 25, tier: 'premium' },
    premium_1y: { amount: 990000, diamonds: 25, tier: 'premium' }
};

app.post('/api/payment/create-order', (req, res) => {
    const { planId = 'pro_1m' } = req.body || {};
    const plan = DEV_PLANS[planId] || DEV_PLANS.pro_1m;
    const amount = plan.amount;
    const orderCode = Math.floor(Date.now() / 1000) % 90000000 + 10000000;
    const description = `VOCA${orderCode}`;
    const qrCode = `https://img.vietqr.io/image/970422-0345678901-compact2.png?amount=${amount}&addInfo=${description}&accountName=VOCA%20APP`;

    devOrders.set(orderCode, { status: 'PENDING', amount, planId, tier: plan.tier, diamonds: plan.diamonds, createdAt: Date.now() });

    res.json({
        success: true,
        orderCode,
        plan: planId,
        amount,
        description,
        accountNumber: '0345678901',
        accountName: 'VOCA APP',
        bin: '970422',
        bankName: 'MBBank',
        checkoutUrl: qrCode,
        qrCode,
        isMock: true
    });
});

app.get('/api/payment/check-status', (req, res) => {
    const orderCode = parseInt(req.query.orderCode, 10);
    const order = devOrders.get(orderCode);
    res.json({
        success: true,
        status: order ? order.status : 'PENDING'
    });
});

app.post('/api/payment/simulate-transfer', (req, res) => {
    const { orderCode } = req.body || {};
    const code = parseInt(orderCode, 10);
    const order = code ? devOrders.get(code) : null;
    const grantedDiamonds = order?.diamonds || 25;
    if (code && order) {
        devOrders.set(code, { ...order, status: 'PAID' });
    }
    devDiamonds = grantedDiamonds;
    res.json({ success: true, status: 'PAID' });
});

app.post('/api/payment/webhook', (req, res) => {
    const data = req.body?.data || req.body || {};
    const orderCode = parseInt(data.orderCode, 10);
    if (orderCode && devOrders.has(orderCode)) {
        const order = devOrders.get(orderCode);
        devOrders.set(orderCode, { ...order, status: 'PAID' });
        devDiamonds = order.diamonds || 25;
    }
    res.json({ success: true });
});

// Dev Leaderboard (28 baseline community learners)
const devLeaderboard = [
    // JA
    { userId: 'seed_ja_1', name: 'Kenji Sato', avatar: '', xp: 14250, weeklyXp: 850, level: 12, streak: 42, badgesCount: 14, targetLang: 'ja', country: '🇯🇵' },
    { userId: 'seed_ja_2', name: 'Wei Zhang', avatar: '', xp: 8720, weeklyXp: 620, level: 8, streak: 19, badgesCount: 8, targetLang: 'ja', country: '🇯🇵' },
    { userId: 'seed_ja_3', name: 'Mateo Rossi', avatar: '', xp: 5120, weeklyXp: 490, level: 5, streak: 10, badgesCount: 5, targetLang: 'ja', country: '🇯🇵' },
    { userId: 'seed_ja_4', name: 'Aoi Takahashi', avatar: '', xp: 3450, weeklyXp: 380, level: 4, streak: 15, badgesCount: 6, targetLang: 'ja', country: '🇯🇵' },
    { userId: 'seed_ja_5', name: 'Lucas Meyer', avatar: '', xp: 2180, weeklyXp: 260, level: 3, streak: 8, badgesCount: 4, targetLang: 'ja', country: '🇩🇪' },
    { userId: 'seed_ja_6', name: 'Sakura Ito', avatar: '', xp: 1420, weeklyXp: 180, level: 2, streak: 5, badgesCount: 3, targetLang: 'ja', country: '🇯🇵' },
    { userId: 'seed_ja_7', name: 'Daiki Watanabe', avatar: '', xp: 850, weeklyXp: 110, level: 2, streak: 3, badgesCount: 2, targetLang: 'ja', country: '🇯🇵' },

    // KO
    { userId: 'seed_ko_1', name: 'Elena Rostova', avatar: '', xp: 12890, weeklyXp: 790, level: 11, streak: 35, badgesCount: 12, targetLang: 'ko', country: '🇰🇷' },
    { userId: 'seed_ko_2', name: 'Sophia Chen', avatar: '', xp: 7640, weeklyXp: 580, level: 7, streak: 16, badgesCount: 7, targetLang: 'ko', country: '🇰🇷' },
    { userId: 'seed_ko_3', name: 'Hyun-woo Lee', avatar: '', xp: 4120, weeklyXp: 410, level: 5, streak: 8, badgesCount: 4, targetLang: 'ko', country: '🇰🇷' },
    { userId: 'seed_ko_4', name: 'Min-seo Jung', avatar: '', xp: 3100, weeklyXp: 320, level: 4, streak: 11, badgesCount: 5, targetLang: 'ko', country: '🇰🇷' },
    { userId: 'seed_ko_5', name: 'David Miller', avatar: '', xp: 1950, weeklyXp: 220, level: 3, streak: 6, badgesCount: 3, targetLang: 'ko', country: '🇺🇸' },
    { userId: 'seed_ko_6', name: 'Seo-yeon Park', avatar: '', xp: 1280, weeklyXp: 160, level: 2, streak: 4, badgesCount: 3, targetLang: 'ko', country: '🇰🇷' },
    { userId: 'seed_ko_7', name: 'Ji-hoon Choi', avatar: '', xp: 790, weeklyXp: 90, level: 2, streak: 2, badgesCount: 2, targetLang: 'ko', country: '🇰🇷' },

    // ZH
    { userId: 'seed_zh_1', name: 'Alexandre Dubois', avatar: '', xp: 11400, weeklyXp: 740, level: 10, streak: 28, badgesCount: 11, targetLang: 'zh', country: '🇨🇳' },
    { userId: 'seed_zh_2', name: 'Liam Wilson', avatar: '', xp: 6890, weeklyXp: 530, level: 7, streak: 14, badgesCount: 6, targetLang: 'zh', country: '🇬🇧' },
    { userId: 'seed_zh_3', name: 'Ji-won Kim', avatar: '', xp: 4480, weeklyXp: 390, level: 5, streak: 9, badgesCount: 5, targetLang: 'zh', country: '🇨🇳' },
    { userId: 'seed_zh_4', name: 'Mei-ling Zhao', avatar: '', xp: 2890, weeklyXp: 290, level: 4, streak: 12, badgesCount: 5, targetLang: 'zh', country: '🇨🇳' },
    { userId: 'seed_zh_5', name: 'Carlos Santos', avatar: '', xp: 1840, weeklyXp: 210, level: 3, streak: 7, badgesCount: 3, targetLang: 'zh', country: '🇧🇷' },
    { userId: 'seed_zh_6', name: 'Xiao-wei Lin', avatar: '', xp: 1190, weeklyXp: 150, level: 2, streak: 4, badgesCount: 2, targetLang: 'zh', country: '🇨🇳' },
    { userId: 'seed_zh_7', name: 'Bowen Wang', avatar: '', xp: 650, weeklyXp: 80, level: 1, streak: 2, badgesCount: 1, targetLang: 'zh', country: '🇨🇳' },

    // EN
    { userId: 'seed_en_1', name: 'Min-ho Park', avatar: '', xp: 9850, weeklyXp: 680, level: 9, streak: 21, badgesCount: 9, targetLang: 'en', country: '🇬🇧' },
    { userId: 'seed_en_2', name: 'Hana Tanaka', avatar: '', xp: 5930, weeklyXp: 470, level: 6, streak: 12, badgesCount: 6, targetLang: 'en', country: '🇺🇸' },
    { userId: 'seed_en_3', name: 'Chloe Martin', avatar: '', xp: 3890, weeklyXp: 350, level: 4, streak: 7, badgesCount: 4, targetLang: 'en', country: '🇬🇧' },
    { userId: 'seed_en_4', name: 'Oliver Smith', avatar: '', xp: 2650, weeklyXp: 260, level: 4, streak: 10, badgesCount: 4, targetLang: 'en', country: '🇦🇺' },
    { userId: 'seed_en_5', name: 'Yuto Nakamura', avatar: '', xp: 1650, weeklyXp: 190, level: 3, streak: 6, badgesCount: 3, targetLang: 'en', country: '🇯🇵' },
    { userId: 'seed_en_6', name: 'Emma Johnson', avatar: '', xp: 1050, weeklyXp: 140, level: 2, streak: 3, badgesCount: 2, targetLang: 'en', country: '🇨🇦' },
    { userId: 'seed_en_7', name: 'Noah Brown', avatar: '', xp: 520, weeklyXp: 70, level: 1, streak: 1, badgesCount: 1, targetLang: 'en', country: '🇺🇸' }
];

app.get('/api/leaderboard', (req, res) => {
    const lang = req.query.lang;
    const userId = req.query.userId;
    const period = req.query.period === 'all_time' ? 'all_time' : 'weekly';
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit, 10) || 50));

    const isLangSpecific = lang && ['ja', 'ko', 'zh', 'en'].includes(lang);
    let list = devLeaderboard;
    if (isLangSpecific) {
        list = devLeaderboard.filter(item => item.targetLang === lang);
    }
    
    // Sort and limit
    const sorted = [...list].sort((a, b) => {
        if (period === 'weekly') {
            return (b.weeklyXp || 0) - (a.weeklyXp || 0) || b.xp - a.xp || b.streak - a.streak;
        }
        return b.xp - a.xp || b.streak - a.streak;
    });
    const topLearners = sorted.slice(0, limit).map((item, idx) => ({ ...item, rank: idx + 1 }));

    let userRank = null;
    if (userId) {
        const found = topLearners.find(u => u.userId === userId);
        if (found) {
            userRank = found;
        } else {
            const userInPool = devLeaderboard.find(u => u.userId === userId);
            if (userInPool) {
                const higher = sorted.filter(u => {
                    if (period === 'weekly') {
                        return (u.weeklyXp || 0) > (userInPool.weeklyXp || 0);
                    }
                    return u.xp > userInPool.xp;
                }).length;
                userRank = { ...userInPool, rank: higher + 1 };
            }
        }
    }

    res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.json({ success: true, period, topLearners, userRank });
});

app.post('/api/leaderboard', (req, res) => {
    const body = req.body || {};
    const userId = body.guest_id || 'dev_user';
    const existing = devLeaderboard.find(u => u.userId === userId);
    const xp = Math.max(0, parseInt(body.xp, 10) || 0);
    const weeklyXp = Math.max(0, parseInt(body.weekly_xp, 10) || 0);
    const level = Math.max(1, parseInt(body.level, 10) || Math.floor(Math.sqrt(xp / 100)) + 1);
    const targetLang = ['ja', 'ko', 'zh', 'en'].includes(body.target_lang) ? body.target_lang : 'ja';

    if (existing) {
        existing.name = body.name || existing.name;
        existing.avatar = body.avatar || existing.avatar;
        existing.xp = Math.max(existing.xp, xp);
        existing.weeklyXp = Math.max(existing.weeklyXp || 0, weeklyXp);
        existing.level = Math.max(existing.level, level);
        existing.streak = Math.max(existing.streak, parseInt(body.streak, 10) || 0);
        existing.badgesCount = Math.max(existing.badgesCount, parseInt(body.badges_count, 10) || 0);
        existing.targetLang = targetLang;
    } else {
        devLeaderboard.push({
            userId,
            name: body.name || 'Learner',
            avatar: body.avatar || '',
            xp,
            weeklyXp,
            level,
            streak: parseInt(body.streak, 10) || 0,
            badgesCount: parseInt(body.badges_count, 10) || 0,
            targetLang,
            country: body.country || ''
        });
    }

    res.json({ success: true, updated: true, userId, xp, weeklyXp, level });
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

function isValidVideoId(id) {
    if (!id || typeof id !== 'string') return false;
    if (id === 'demo' || id === 'test') return true;
    return /^[a-zA-Z0-9_-]{11}$/.test(id);
}

function getCachedTranscript(videoId, lang) {
    try {
        if (!isValidVideoId(videoId)) return null;
        const normLang = (lang || '').replace(/[^a-zA-Z0-9_-]/g, '').split('-')[0].toLowerCase();
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
        if (!isValidVideoId(videoId)) return;
        const normLang = (lang || 'ja').replace(/[^a-zA-Z0-9_-]/g, '').split('-')[0].toLowerCase();
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
    let channelAvatar = null;
    try {
        const yt = await getInnertube();
        const info = await yt.getInfo(videoId);
        const tracks = info.captions?.caption_tracks || [];
        nativeTracks = tracks.map(t => t.language_code).filter(Boolean);
        channelAvatar = info.secondary_info?.owner?.author?.thumbnails?.[0]?.url || null;
    } catch {}


    const availableLanguages = Array.from(new Set([...cachedLangs, ...nativeTracks]));

    res.json({
        videoId,
        title,
        duration: 180,
        availableLanguages,
        subLanguages: cachedLangs,
        hasAutoCaptions: availableLanguages.length > 0,
        channel,
        channelAvatar
    });
});

/**
 * POST /api/video-level
 * Dev handler for saving video difficulty levels
 */
app.post('/api/video-level', (req, res) => {
    const { videoId, language, level, confidence, method } = req.body || {};
    if (!videoId || !language || !level) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    res.json({
        success: true,
        videoId,
        language,
        level,
        confidence: confidence ?? 0.8,
        method: method ?? 'linguistics',
        levels: { [language]: level }
    });
});

/**
 * Realistic seed videos for dev environment when transcripts_cache is sparse
 */
const DEV_SEED_VIDEOS = {
    ja: [
        { videoId: 'kJQP7kiw5Fk', title: 'Luis Fonsi - Despacito (Japanese Cover)', channel: 'Music Japan', duration: 242, level: 'JLPT N5', tier: 'beginner' },
        { videoId: 'dQw4w9WgXcQ', title: 'Japanese Conversation Practice for Beginners', channel: 'Nihongo Basics', duration: 212, level: 'JLPT N5', tier: 'beginner' },
        { videoId: '9bZkp7q19f0', title: 'Learn Japanese Grammar - N4 Masterclass', channel: 'Tokyo Sensei', duration: 255, level: 'JLPT N4', tier: 'elementary' },
        { videoId: 'fJ9rUzIMcZQ', title: 'Everyday Japanese Expressions You Must Know', channel: 'Japan Daily', duration: 200, level: 'JLPT N4', tier: 'elementary' },
        { videoId: 'JGwWNGJdvx8', title: 'Intermediate Japanese Story Listening', channel: 'Kanji Club', duration: 235, level: 'JLPT N3', tier: 'intermediate' },
        { videoId: 'k2qgadSvNyU', title: 'Japanese News Podcast - Natural Speed', channel: 'NHK Easy Study', duration: 320, level: 'JLPT N2', tier: 'upper_intermediate' },
        { videoId: 'CevxZvSJLk8', title: 'Advanced Japanese Debate & Nuances', channel: 'Advanced Nihongo', duration: 410, level: 'JLPT N1', tier: 'advanced' },
        { videoId: 'OPf0YbXqDm0', title: 'Casual Tokyo VLOG: Exploring Shibuya', channel: 'Tokyo Life', duration: 290, level: 'JLPT N4', tier: 'elementary' },
        { videoId: 'ja_demo_009', title: 'Ordering Ramen Like a Local in Shinjuku', channel: 'Foodie Nihon', duration: 315, level: 'JLPT N5', tier: 'beginner' },
        { videoId: 'ja_demo_010', title: 'JLPT N3 Reading Comprehension - Folk Tales', channel: 'Nihongo Storytime', duration: 410, level: 'JLPT N3', tier: 'intermediate' },
        { videoId: 'ja_demo_011', title: 'Japanese Job Interview Etiquette & Honorifics', channel: 'Business Keigo Pro', duration: 480, level: 'JLPT N2', tier: 'upper_intermediate' },
        { videoId: 'ja_demo_012', title: 'Anime Dialogue Breakdown: Slang vs Formal', channel: 'Otaku Japanese', duration: 350, level: 'JLPT N4', tier: 'elementary' },
        { videoId: 'ja_demo_013', title: 'Kanji Radicals Explained in 10 Minutes', channel: 'Kanji Master', duration: 275, level: 'JLPT N5', tier: 'beginner' },
        { videoId: 'ja_demo_014', title: 'Kyoto Cultural Walk & Traditional Japanese', channel: 'Kyoto Travel', duration: 395, level: 'JLPT N3', tier: 'intermediate' },
        { videoId: 'ja_demo_015', title: 'Deep Discussion: Japanese Work Culture', channel: 'Insight Tokyo', duration: 520, level: 'JLPT N1', tier: 'advanced' },
        { videoId: 'ja_demo_016', title: 'Common Japanese Mistakes Even N3 Students Make', channel: 'Sensei Tips', duration: 330, level: 'JLPT N3', tier: 'intermediate' }
    ],
    zh: [
        { videoId: 'zh_demo_001', title: 'Daily Chinese Speaking for Beginners (HSK 1)', channel: 'Mandarin Corner', duration: 220, level: 'HSK 1', tier: 'beginner' },
        { videoId: 'zh_demo_002', title: 'Common Chinese Phrases in Real Life (HSK 2)', channel: 'Chinese Zero to Hero', duration: 310, level: 'HSK 2', tier: 'elementary' },
        { videoId: 'zh_demo_003', title: 'Intermediate Chinese Story Listening (HSK 3)', channel: 'Slow Chinese', duration: 380, level: 'HSK 3', tier: 'intermediate' },
        { videoId: 'zh_demo_004', title: 'Chinese Idioms and Cultural Stories (HSK 4)', channel: 'Mandarin Blueprint', duration: 420, level: 'HSK 4', tier: 'upper_intermediate' },
        { videoId: 'zh_demo_005', title: 'Business Chinese & Formal Discussion (HSK 5)', channel: 'CCTV News Mandarin', duration: 510, level: 'HSK 5', tier: 'advanced' },
        { videoId: 'zh_demo_006', title: 'Supermarket Shopping in Shanghai (HSK 2)', channel: 'Everyday Chinese', duration: 275, level: 'HSK 2', tier: 'elementary' },
        { videoId: 'zh_demo_007', title: 'Mandarin Tones Simplified with Visuals', channel: 'Pinyin Academy', duration: 245, level: 'HSK 1', tier: 'beginner' },
        { videoId: 'zh_demo_008', title: 'Chinese Food Vocabulary: Hotpot Edition', channel: 'Tasty Mandarin', duration: 335, level: 'HSK 2', tier: 'elementary' },
        { videoId: 'zh_demo_009', title: 'Beijing Hutong Walking Tour - Slow Speed', channel: 'Beijing Vlogs', duration: 410, level: 'HSK 3', tier: 'intermediate' },
        { videoId: 'zh_demo_010', title: 'Chinese Tech Trends & Modern Slang', channel: 'Digital China', duration: 460, level: 'HSK 4', tier: 'upper_intermediate' },
        { videoId: 'zh_demo_011', title: 'Classical Chinese Poetry for Learners', channel: 'Poetry Circle', duration: 520, level: 'HSK 5', tier: 'advanced' },
        { videoId: 'zh_demo_012', title: 'HSK 3 Listening Mock Exam Breakdown', channel: 'Test Prep Hub', duration: 390, level: 'HSK 3', tier: 'intermediate' }
    ],
    ko: [
        { videoId: 'ko_demo_001', title: 'Korean Hangul & Basic Greetings (TOPIK 1)', channel: 'Talk To Me In Korean', duration: 240, level: 'TOPIK 1', tier: 'beginner' },
        { videoId: 'ko_demo_002', title: 'Essential Korean Sentence Endings (TOPIK 2)', channel: 'Korean Unnie', duration: 330, level: 'TOPIK 2', tier: 'elementary' },
        { videoId: 'ko_demo_003', title: 'Korean Drama Natural Dialogue Analysis (TOPIK 3)', channel: 'Conversational Korean', duration: 390, level: 'TOPIK 3', tier: 'intermediate' },
        { videoId: 'ko_demo_004', title: 'Korean News Listening for Intermediate (TOPIK 4)', channel: 'KBS Easy Korean', duration: 450, level: 'TOPIK 4', tier: 'upper_intermediate' },
        { videoId: 'ko_demo_005', title: 'Advanced Korean Essay & Idiom Guide (TOPIK 5)', channel: 'Advanced Hangul', duration: 540, level: 'TOPIK 5', tier: 'advanced' },
        { videoId: 'ko_demo_006', title: 'Ordering Street Food in Seoul (TOPIK 1)', channel: 'Korean Englishman', duration: 295, level: 'TOPIK 1', tier: 'beginner' },
        { videoId: 'ko_demo_007', title: 'Must-Know Korean Particle Rules (TOPIK 2)', channel: 'Grammar K', duration: 310, level: 'TOPIK 2', tier: 'elementary' },
        { videoId: 'ko_demo_008', title: 'K-Pop Lyrics Breakdown: Catchy Phrases', channel: 'Hallyu Learn', duration: 360, level: 'TOPIK 2', tier: 'elementary' },
        { videoId: 'ko_demo_009', title: 'Hongdae Cafe Hopping & Natural Chit-Chat', channel: 'Seoul Daily', duration: 420, level: 'TOPIK 3', tier: 'intermediate' },
        { videoId: 'ko_demo_010', title: 'Korean Honorifics vs Casual Speech Guide', channel: 'Polite Korean', duration: 380, level: 'TOPIK 3', tier: 'intermediate' },
        { videoId: 'ko_demo_011', title: 'Modern Korean Slang (Inssa Terms 2026)', channel: 'Trendy K', duration: 440, level: 'TOPIK 4', tier: 'upper_intermediate' },
        { videoId: 'ko_demo_012', title: 'TOPIK 2 Reading Speed Training', channel: 'Exam Pass Korea', duration: 490, level: 'TOPIK 2', tier: 'elementary' }
    ],
    en: [
        { videoId: 'en_demo_001', title: 'Basic English Conversation for Beginners (A1)', channel: 'BBC Learning English', duration: 210, level: 'CEFR A1', tier: 'beginner' },
        { videoId: 'en_demo_002', title: 'Everyday English Phrasal Verbs in Context (B1)', channel: 'EnglishClass101', duration: 315, level: 'CEFR B1', tier: 'elementary' },
        { videoId: 'en_demo_003', title: 'Intermediate English Listening: Travel Stories (B2)', channel: 'VOA Learning English', duration: 410, level: 'CEFR B2', tier: 'intermediate' },
        { videoId: 'en_demo_004', title: 'Academic & Professional English Vocabulary (C1)', channel: 'Oxford Online English', duration: 480, level: 'CEFR C1', tier: 'upper_intermediate' },
        { videoId: 'en_demo_005', title: 'Mastering English Nuances & Idioms (C2)', channel: 'English with Lucy', duration: 360, level: 'CEFR C2', tier: 'advanced' },
        { videoId: 'en_demo_006', title: 'Job Interview English Tips (B2)', channel: 'Business English Pod', duration: 340, level: 'CEFR B2', tier: 'intermediate' },
        { videoId: 'en_demo_007', title: 'Top 50 English Idioms Used by Native Speakers', channel: 'Fluent American', duration: 385, level: 'CEFR B2', tier: 'intermediate' },
        { videoId: 'en_demo_008', title: 'Master Small Talk: How to Start Conversations', channel: 'Speak With Vanessa', duration: 290, level: 'CEFR A2', tier: 'beginner' },
        { videoId: 'en_demo_009', title: 'Fast English Listening Practice - Real Podcasts', channel: 'All Ears English', duration: 450, level: 'CEFR B2', tier: 'intermediate' },
        { videoId: 'en_demo_010', title: 'Business English Emails: Avoid Sounding Rude', channel: 'Executive English', duration: 330, level: 'CEFR B2', tier: 'intermediate' },
        { videoId: 'en_demo_011', title: 'TED Talk Analysis: Rhetoric and Vocabulary', channel: 'Academic English', duration: 520, level: 'CEFR C1', tier: 'upper_intermediate' },
        { videoId: 'en_demo_012', title: 'Pronunciation Guide: Tricky Silent Letters', channel: 'Clear English', duration: 260, level: 'CEFR A2', tier: 'beginner' }
    ]
};

const localVideoMetaCache = new Map();

async function fetchVideoMetaLocal(videoId) {
    if (localVideoMetaCache.has(videoId)) {
        return localVideoMetaCache.get(videoId);
    }
    try {
        const oembedRes = await fetch(`https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=${videoId}`, {
            signal: AbortSignal.timeout(3000)
        });
        if (oembedRes.ok) {
            const data = await oembedRes.json();
            let channelAvatar = null;
            if (data.author_url) {
                try {
                    const pageRes = await fetch(data.author_url, {
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                            'Accept': 'text/html'
                        },
                        signal: AbortSignal.timeout(4500)
                    });
                    if (pageRes.ok) {
                        const html = await pageRes.text();
                        const match = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i)
                            || html.match(/<link\s+rel=["']image_src["']\s+href=["']([^"']+)["']/i);
                        if (match && match[1] && (match[1].includes('ggpht.com') || match[1].includes('googleusercontent.com'))) {
                            channelAvatar = match[1];
                        }
                    }
                } catch {}
            }
            const res = {
                title: data.title,
                channel: data.author_name,
                channelAvatar
            };
            localVideoMetaCache.set(videoId, res);
            return res;
        }
    } catch {}
    return null;
}

/**
 * GET /api/recommended-videos
 * Returns videos with verified transcripts from local disk cache, with dev seeds and uniform shuffle on refresh
 */
app.get('/api/recommended-videos', async (req, res) => {
    const lang = (req.query.lang || 'ja').toLowerCase().trim();
    const targetTier = (req.query.tier || '').toLowerCase().trim();
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 12, 1), 50);
    const offset = Math.max(parseInt(req.query.offset, 10) || 0, 0);
    const isRefresh = req.query.refresh === 'true' || req.query.force === 'true';

    let results = [];
    const seenIds = new Set();

    // Check local disk transcripts cache
    try {
        if (fs.existsSync(TRANSCRIPTS_CACHE_DIR)) {
            const files = fs.readdirSync(TRANSCRIPTS_CACHE_DIR);
            const suffix = `_${lang}.json`;
            for (const file of files) {
                if (file.endsWith(suffix)) {
                    const videoId = file.slice(0, -suffix.length);
                    if (!seenIds.has(videoId)) {
                        seenIds.add(videoId);
                        const defaultLevel = lang === 'ja' ? 'JLPT N4' : (lang === 'zh' ? 'HSK 2' : (lang === 'ko' ? 'TOPIK 2' : 'CEFR B1'));
                        const defaultTier = 'elementary';

                        if (targetTier && targetTier !== 'all' && defaultTier !== targetTier) {
                            continue;
                        }

                        let title = `Transcribed Video (${videoId})`;
                        let channel = 'Cached Creator';
                        let channelAvatar = null;

                        const meta = await fetchVideoMetaLocal(videoId);
                        if (meta) {
                            if (meta.title) title = meta.title;
                            if (meta.channel) channel = meta.channel;
                            if (meta.channelAvatar) channelAvatar = meta.channelAvatar;
                        }

                        // Discover all languages actually cached locally for this video
                        const videoPrefix = `${videoId}_`;
                        const videoLangs = files
                            .filter(f => f.startsWith(videoPrefix) && f.endsWith('.json'))
                            .map(f => f.slice(videoPrefix.length, -'.json'.length))
                            .filter(l => ['ja', 'zh', 'ko', 'en'].includes(l));
                        const subLangs = Array.from(new Set([lang, ...videoLangs]));

                        results.push({
                            videoId,
                            title,
                            channel,
                            channelAvatar,
                            duration: 360,
                            languages: subLangs,
                            thumbnail: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
                            level: defaultLevel,
                            tier: defaultTier,
                            updatedAt: Math.floor(Date.now() / 1000)
                        });
                    }
                }
            }
        }
    } catch {}

    // Fallback to rich dev seeds if local cache has few candidates
    const seeds = DEV_SEED_VIDEOS[lang] || [];
    for (const seed of seeds) {
        if (!seenIds.has(seed.videoId)) {
            if (targetTier && targetTier !== 'all' && seed.tier !== targetTier) {
                continue;
            }
            seenIds.add(seed.videoId);
            results.push({
                videoId: seed.videoId,
                title: seed.title,
                channel: seed.channel,
                channelAvatar: seed.channelAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed.channel)}&backgroundColor=1f2937,111827&textColor=f3f4f6`,
                duration: seed.duration,
                languages: [lang],
                thumbnail: `https://i.ytimg.com/vi/${seed.videoId}/mqdefault.jpg`,
                level: seed.level,
                tier: seed.tier,
                updatedAt: Math.floor(Date.now() / 1000)
            });
        }
    }

    if (isRefresh || offset === 0) {
        // Fisher-Yates uniform shuffle
        for (let i = results.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [results[i], results[j]] = [results[j], results[i]];
        }
    }

    const pagedVideos = results.slice(offset, offset + limit);
    const hasMore = (offset + limit) < results.length;

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.json({
        success: true,
        language: lang,
        tier: targetTier && targetTier !== 'all' ? targetTier : undefined,
        count: pagedVideos.length,
        offset,
        hasMore,
        videos: pagedVideos,
        source: isRefresh ? 'dev-server:refresh' : 'dev-server'
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
                    subLanguages: [detectedLang],
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
                subLanguages: [cached.language || normalizedLang],
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

            // Return processing immediately so client polling takes over smoothly
            return res.json({
                success: false,
                status: 'processing',
                resultUrl: jobResultUrl,
                whisperAvailable: true,
                diamonds: devDiamonds,
                maxDiamonds: 3,
                nextRegenAt: null,
                timing: 50
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
            const yt = await getInnertube();
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
                            const actualLang = track.language_code?.split('-')[0]?.toLowerCase() || track.language_code || normalizedLang;
                            const languageMismatch = actualLang !== normalizedLang && !actualLang.startsWith(normalizedLang);
                            console.log(`[Dev Server] Retrieved ${cleaned.length} real Innertube YouTube captions for video ${videoId} (${track.language_code}, actual: ${actualLang})`);

                            saveCachedTranscript(videoId, actualLang, {
                                videoId,
                                language: actualLang,
                                source: 'native',
                                segments: cleaned
                            });

                            return res.json({
                                success: true,
                                videoId,
                                language: actualLang,
                                requestedLanguage: normalizedLang,
                                segments: cleaned,
                                source: 'native',
                                sourceDetail: 'innertube',
                                availableLanguages: {
                                    native: availableLangs.length > 0 ? availableLangs : [actualLang],
                                    ai: ['ja', 'en', 'ko', 'zh', 'vi']
                                },
                                subLanguages: [actualLang],
                                languageMismatch,
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
    const { videoId, sourceLang, targetLang, segments, onlyCache } = req.body;

    if (!isValidVideoId(videoId)) {
        return res.status(400).json({ error: 'Invalid or missing videoId parameter' });
    }

    if (!onlyCache && (!segments || !Array.isArray(segments))) {
        return res.status(400).json({ error: 'Missing segments array' });
    }

    const cleanSource = (sourceLang || 'auto').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 10);
    const normTarget = (targetLang || 'en').replace(/[^a-zA-Z0-9_-]/g, '').split('-')[0].toLowerCase().slice(0, 5);
    const cacheFileName = `${videoId}_${cleanSource}_${normTarget}_dual.json`;
    const cacheFile = path.join(TRANSCRIPTS_CACHE_DIR, cacheFileName);

    // Strict path traversal defense
    const resolvedCache = path.resolve(cacheFile);
    if (!resolvedCache.startsWith(path.resolve(TRANSCRIPTS_CACHE_DIR))) {
        return res.status(400).json({ error: 'Invalid cache path' });
    }

    // Check disk cache first
    if (fs.existsSync(cacheFile)) {
        try {
            const cached = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
            return res.json({
                videoId,
                sourceLang,
                targetLang,
                segments: cached.segments || cached,
                cached: true,
                quality: 100
            });
        } catch {}
    }

    // If saveOnly requested, save client-provided segments to disk cache (with merging)
    if (req.body.saveOnly || req.body.onlySave) {
        try {
            let finalSegments = segments;
            if (fs.existsSync(cacheFile)) {
                try {
                    const existing = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
                    const existingList = existing.segments || existing;
                    if (Array.isArray(existingList)) {
                        const existingMap = new Map();
                        const existingByText = new Map();
                        existingList.forEach((seg, idx) => {
                            const tr = seg?.translation && typeof seg.translation === 'string' ? seg.translation.trim() : '';
                            if (tr) {
                                const timeKey = typeof seg.start === 'number' ? seg.start.toFixed(1) : `idx:${idx}`;
                                existingMap.set(timeKey, tr);
                                if (seg?.text) existingByText.set(seg.text.trim(), tr);
                            }
                        });

                        finalSegments = segments.map((s, idx) => {
                            if (s?.translation && typeof s.translation === 'string' && s.translation.trim()) return s;
                            const timeKey = typeof s?.start === 'number' ? s.start.toFixed(1) : `idx:${idx}`;
                            let tr = existingMap.get(timeKey);
                            if (!tr && s?.text) tr = existingByText.get(s.text.trim());
                            if (!tr && typeof s?.start === 'number') {
                                const closeSeg = existingList.find(es => es?.translation && typeof es.start === 'number' && Math.abs(es.start - s.start) < 0.8);
                                if (closeSeg?.translation) tr = closeSeg.translation;
                            }
                            if (!tr && existingList[idx]?.translation) tr = existingList[idx].translation;
                            return { ...s, translation: tr || null };
                        });
                    }
                } catch {}
            }

            const validSegments = finalSegments.filter(s => s && s.translation && (sourceLang === normTarget || s.translation.trim() !== (s.text || '').trim()));
            if (validSegments.length >= 10 || validSegments.length >= finalSegments.length * 0.2) {
                fs.writeFileSync(cacheFile, JSON.stringify({ segments: finalSegments }), 'utf8');
                const quality = finalSegments.length > 0 ? Math.round((validSegments.length / finalSegments.length) * 100) : 100;
                return res.json({ success: true, cached: quality >= 80, quality, translatedCount: validSegments.length });
            }
            return res.status(400).json({ success: false, error: 'Low quality or insufficient segments' });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

    // If onlyCache requested and no cache found, return early
    if (onlyCache) {
        return res.json({
            videoId,
            sourceLang,
            targetLang,
            segments: [],
            cached: false
        });
    }

    // Map segments with translations using batch GTX
    const textsToTranslate = segments.map(s => s.text ? s.text.trim() : '');
    const batchTranslations = await translateBatchWithGtx(textsToTranslate, sourceLang || 'auto', normTarget);

    const translatedSegments = segments.map((seg, i) => {
        const text = seg.text ? seg.text.trim() : '';
        let translation = batchTranslations[i];

        // Check predefined mock translations if batch returned null
        if (!translation && DEV_DUAL_TRANSLATIONS[text] && DEV_DUAL_TRANSLATIONS[text][normTarget]) {
            translation = DEV_DUAL_TRANSLATIONS[text][normTarget];
        }

        // Validate translation is not identical to source text when source !== target
        if (translation && (sourceLang || 'auto') !== normTarget && translation.trim() === text) {
            translation = null;
        }

        return {
            ...seg,
            translation: translation || null
        };
    });

    const successCount = translatedSegments.filter(s => s.translation).length;
    const shouldCache = translatedSegments.length > 0 && (successCount / translatedSegments.length) >= 0.7;

    // Cache to disk only if majority succeeded
    if (shouldCache) {
        try {
            fs.writeFileSync(cacheFile, JSON.stringify({ segments: translatedSegments }), 'utf8');
        } catch {}
    }

    res.json({
        videoId,
        sourceLang,
        targetLang,
        segments: translatedSegments,
        cached: true,
        quality: 100
    });
});

const segmenters = {
    zh: new Intl.Segmenter('zh', { granularity: 'word' }),
    ja: new Intl.Segmenter('ja', { granularity: 'word' }),
    ko: new Intl.Segmenter('ko', { granularity: 'word' }),
    en: new Intl.Segmenter('en', { granularity: 'word' })
};

const PUNCTUATION_REGEX = /^[\s\p{P}\p{S}【】「」『』（）〔〕［］｛｝〈〉《》〖〗〘〙〚〛｟｠、。・ー〜～！？：；，．""''…—–*]+$/u;
function isPunctuation(text) {
    return PUNCTUATION_REGEX.test(text);
}

function buildDevToken(surface, isWordLike, lang) {
    const isPunc = isPunctuation(surface) || (!isWordLike && lang === 'en');
    const token = { surface };
    if (isPunc) {
        token.isPunctuation = true;
        return token;
    }

    if (lang === 'zh') {
        try {
            const py = pinyin(surface, { toneType: 'symbol', type: 'string' });
            if (py !== surface) token.pinyin = py;
        } catch (e) {}
    } else if (lang === 'ko') {
        try {
            token.romanization = hangulRomanization.convert(surface);
        } catch (e) {}
    }
    return token;
}

/**
 * POST /api/tokenize-batch/:lang
 * Batch tokenization for subtitles in local dev
 */
app.post('/api/tokenize-batch/:lang', (req, res) => {
    const { lang } = req.params;
    const { texts } = req.body;

    if (!texts || !Array.isArray(texts)) {
        return res.status(400).json({ error: 'Missing or invalid "texts" array' });
    }

    try {
        const segmenter = segmenters[lang];
        const tokens = texts.map(text => {
            if (!text || typeof text !== 'string') return [];
            if (segmenter) {
                const segs = [...segmenter.segment(text)];
                return segs
                    .filter(s => s.isWordLike || s.segment.trim())
                    .map(s => buildDevToken(s.segment, s.isWordLike, lang));
            }
            return text.split(/\s+/).filter(Boolean).map(word => buildDevToken(word, true, lang));
        });

        res.json({ tokens });
    } catch (error) {
        console.error('[Tokenize Batch] Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/tokenize/:lang
 * Unified tokenization using Intl.Segmenter (ja, zh, ko, en)
 */
app.post('/api/tokenize/:lang', (req, res) => {
    const { lang } = req.params;
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid "text" field' });
    }

    try {
        const segmenter = segmenters[lang];
        if (segmenter) {
            const segments = [...segmenter.segment(text)];
            const tokens = segments
                .filter(seg => seg.isWordLike || seg.segment.trim())
                .map(seg => buildDevToken(seg.segment, seg.isWordLike, lang));
            return res.json({ tokens });
        }

        const tokens = text.split(/\s+/).filter(Boolean).map(word => buildDevToken(word, true, lang));
        res.json({ tokens });
    } catch (error) {
        console.error(`[Tokenize ${lang}] Error:`, error.message);
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /api/version
 * Version & Changelog API for local development
 */
app.get('/api/version', (req, res) => {
    res.set('Cache-Control', 'no-cache, must-revalidate');

    // Allow testing forced update & maintenance locally via query params (?mock_maintenance=true, ?mock_force=true, ?mock_version=1.1.0)
    const mockMaintenance = req.query.mock_maintenance === 'true';
    const mockForce = req.query.mock_force === 'true';
    const mockVersion = req.query.mock_version || '1.1.17';

    res.json({
        version: mockVersion,
        minSupportedVersion: mockForce ? '1.1.17' : '1.0.0',
        buildDate: '2026-09-10',
        forceUpdate: mockForce,
        maintenance: mockMaintenance,
        maintenanceMessage: mockMaintenance ? 'Development mock maintenance mode active.' : '',
        highlights: {
            en: [
                'Tablet & Responsive Layout Polish: Collapsed multi-column layouts into comfortable full-width feeds on tablet screens (<=1024px), preventing sidebar squeeze',
                'Header & Toolbar Anti-Collision: Prevented badge overlap on panel titles and enabled flexible wrapping for search bars, action buttons, and filter chips',
                'Enhanced Video Card Readability: Expanded video title display in the resume banner and removed dead/duplicate CSS rules across panels'
            ],
            vi: [
                'Tối ưu giao diện máy tính bảng: Thu gọn bố cục nhiều cột thành dạng danh sách toàn chiều rộng tối ưu trên tablet (<=1024px), chống ép hẹp nội dung',
                'Chống đè chữ tiêu đề & thanh công cụ: Khắc phục hiện tượng huy hiệu đè lên tiêu đề thẻ, hỗ trợ thanh tìm kiếm và bộ lọc tự động xuống dòng linh hoạt',
                'Cải thiện hiển thị thẻ video: Mở rộng không gian hiển thị tiêu đề video đang xem dở và loại bỏ các đoạn mã CSS trùng lặp'
            ],
            ja: [
                'タブレット表示＆レスポンシブ最適化：タブレット端末（<=1024px）で複数列レイアウトを快適な全幅表示に統合し、サイドバーによる圧迫を解消',
                'ヘッダー＆ツールバーの重なり防止：パネルタイトルのバッジ衝突を防ぎ、検索バーやフィルターボタンが柔軟に折り返されるよう改善',
                '動画カード視認性の向上：視聴再開バナーのタイトル表示行数を拡張し、各パネルの重複CSSコードを整理・最適化'
            ],
            ko: [
                '태블릿 반응형 레이아웃 최적화: 태블릿 화면(<=1024px)에서 다중 열을 쾌적한 전체 너비 피드로 자동 전환하여 사이드바 압박 현상 해결',
                '헤더 및 툴바 겹침 방지: 패널 제목과 배지의 겹침을 방지하고, 검색창 및 필터 칩이 부드럽게 줄바꿈되도록 유연성 향상',
                '동영상 카드 가독성 개선: 이어보기 배너의 동영상 제목 표시를 2줄로 확대하고 중복 CSS 스타일을 말끔히 정리'
            ],
            zh: [
                '平板端与响应式布局优化：针对平板屏幕（<=1024px）自动收起次级侧边栏并转为舒适的全宽单列，消除内容挤压变形',
                '标题与工具栏防重叠改进：修复状态徽章覆盖面板标题的问题，支持搜索框、操作按钮和筛选芯片自适应换行',
                '视频卡片可读性提升：拓展继续观看横幅中的标题展示空间，并全面精简剔除各面板中的冗余重复 CSS 样式'
            ]
        }
    });
});

app.listen(PORT, () => {
    console.log(`[Server] Gladia transcription server running on port ${PORT}`);
    if (!process.env.GLADIA_API_KEY) {
        console.warn('[Server] WARNING: GLADIA_API_KEY not set!');
        console.warn('[Server] Get your free key at: https://gladia.io');
    }
});

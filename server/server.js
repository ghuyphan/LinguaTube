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
app.all('/proxy/:service/*', async (req, res) => {
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
        const subPath = req.params[0] || '';
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
 * GET /api/auth-config
 * Return public auth config (Google Client ID)
 */
app.get('/api/auth-config', (req, res) => {
    res.json({
        googleClientId: process.env.GOOGLE_CLIENT_ID || ''
    });
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
            for (let idx = 0; idx < chunk.length; idx++) {
                const item = chunk[idx];
                results[item.index] = await translateWithGtx(item.text, source || 'auto', target || 'en');
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
app.get('/api/translate/:source/:target/*', async (req, res) => {
    try {
        const { source, target } = req.params;
        const query = req.params[0];
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

app.post('/api/payment/create-order', (req, res) => {
    const { planId = 'pro_1m' } = req.body || {};
    const amount = planId === 'pro_1y' ? 490000 : 49000;
    const orderCode = Math.floor(Date.now() / 1000) % 90000000 + 10000000;
    const description = `VOCA${orderCode}`;
    const qrCode = `https://img.vietqr.io/image/970422-0345678901-compact2.png?amount=${amount}&addInfo=${description}&accountName=VOCA%20APP`;

    devOrders.set(orderCode, { status: 'PENDING', amount, createdAt: Date.now() });

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
    if (code && devOrders.has(code)) {
        devOrders.set(code, { ...devOrders.get(code), status: 'PAID' });
        devDiamonds = 20;
        return res.json({ success: true, status: 'PAID' });
    }
    // If not found, still mark dev diamonds up
    devDiamonds = 20;
    res.json({ success: true, status: 'PAID' });
});

app.post('/api/payment/webhook', (req, res) => {
    const data = req.body?.data || req.body || {};
    const orderCode = parseInt(data.orderCode, 10);
    if (orderCode && devOrders.has(orderCode)) {
        devOrders.set(orderCode, { ...devOrders.get(orderCode), status: 'PAID' });
    }
    devDiamonds = 20; // Top up dev diamonds to 20
    res.json({ success: true });
});

// Dev Leaderboard
const devLeaderboard = [
    { rank: 1, userId: 'seed_1', name: 'Kenji Sato', avatar: '', xp: 14250, level: 12, streak: 42, badgesCount: 14, targetLang: 'ja', country: '🇯🇵' },
    { rank: 2, userId: 'seed_2', name: 'Elena Rostova', avatar: '', xp: 12890, level: 11, streak: 35, badgesCount: 12, targetLang: 'ko', country: '🇰🇷' },
    { rank: 3, userId: 'seed_3', name: 'Alexandre Dubois', avatar: '', xp: 11400, level: 10, streak: 28, badgesCount: 11, targetLang: 'zh', country: '🇨🇳' },
    { rank: 4, userId: 'seed_4', name: 'Min-ho Park', avatar: '', xp: 9850, level: 9, streak: 21, badgesCount: 9, targetLang: 'en', country: '🇬🇧' },
    { rank: 5, userId: 'seed_5', name: 'Wei Zhang', avatar: '', xp: 8720, level: 8, streak: 19, badgesCount: 8, targetLang: 'ja', country: '🇯🇵' },
    { rank: 6, userId: 'seed_6', name: 'Sophia Chen', avatar: '', xp: 7640, level: 7, streak: 16, badgesCount: 7, targetLang: 'ko', country: '🇰🇷' },
    { rank: 7, userId: 'seed_7', name: 'Liam Wilson', avatar: '', xp: 6890, level: 7, streak: 14, badgesCount: 6, targetLang: 'zh', country: '🇨🇳' },
    { rank: 8, userId: 'seed_8', name: 'Hana Tanaka', avatar: '', xp: 5930, level: 6, streak: 12, badgesCount: 6, targetLang: 'en', country: '🇺🇸' },
    { rank: 9, userId: 'seed_9', name: 'Mateo Rossi', avatar: '', xp: 5120, level: 5, streak: 10, badgesCount: 5, targetLang: 'ja', country: '🇯🇵' },
    { rank: 10, userId: 'seed_10', name: 'Ji-won Kim', avatar: '', xp: 4480, level: 5, streak: 9, badgesCount: 5, targetLang: 'zh', country: '🇨🇳' }
];

app.get('/api/leaderboard', (req, res) => {
    const lang = req.query.lang;
    let list = devLeaderboard;
    if (lang && ['ja', 'ko', 'zh', 'en'].includes(lang)) {
        list = devLeaderboard.filter(item => item.targetLang === lang);
        if (list.length === 0) list = devLeaderboard;
    }
    const topLearners = list.map((item, idx) => ({ ...item, rank: idx + 1 }));
    res.json({ success: true, topLearners, userRank: null });
});

app.post('/api/leaderboard', (req, res) => {
    const body = req.body || {};
    const userId = body.guest_id || 'dev_user';
    const existing = devLeaderboard.find(u => u.userId === userId);
    const xp = Math.max(0, parseInt(body.xp, 10) || 0);
    const level = Math.max(1, parseInt(body.level, 10) || 1);
    if (existing) {
        existing.xp = Math.max(existing.xp, xp);
        existing.level = Math.max(existing.level, level);
        existing.streak = Math.max(existing.streak, parseInt(body.streak, 10) || 0);
        existing.badgesCount = Math.max(existing.badgesCount, parseInt(body.badges_count, 10) || 0);
    } else {
        devLeaderboard.push({
            rank: devLeaderboard.length + 1,
            userId,
            name: body.name || 'Learner',
            avatar: body.avatar || '',
            xp,
            level,
            streak: parseInt(body.streak, 10) || 0,
            badgesCount: parseInt(body.badges_count, 10) || 0,
            targetLang: body.target_lang || 'ja',
            country: body.country || ''
        });
    }
    devLeaderboard.sort((a, b) => b.xp - a.xp);
    devLeaderboard.forEach((item, idx) => { item.rank = idx + 1; });
    res.json({ success: true, updated: true });
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
    try {
        const yt = await getInnertube();
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
 * GET /api/recommended-videos
 * Returns videos with verified transcripts from local disk cache
 */
app.get('/api/recommended-videos', async (req, res) => {
    const lang = (req.query.lang || 'ja').toLowerCase().trim();
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 12, 1), 50);

    const results = [];
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
                        results.push({
                            videoId,
                            title: `Transcribed Video (${videoId})`,
                            channel: 'Cached Creator',
                            duration: 360,
                            languages: [lang],
                            thumbnail: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
                            level: lang === 'ja' ? 'JLPT N4' : (lang === 'zh' ? 'HSK 2' : (lang === 'ko' ? 'TOPIK 2' : 'CEFR B1')),
                            updatedAt: Math.floor(Date.now() / 1000)
                        });
                    }
                }
            }
        }
    } catch {}

    res.json({
        success: true,
        language: lang,
        count: results.slice(0, limit).length,
        videos: results.slice(0, limit),
        source: 'dev-server'
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
    const { videoId, sourceLang, targetLang, segments, onlyCache } = req.body;

    if (!segments || !Array.isArray(segments)) {
        return res.status(400).json({ error: 'Missing segments array' });
    }

    const normTarget = (targetLang || 'en').split('-')[0].toLowerCase();
    const cacheFile = path.join(TRANSCRIPTS_CACHE_DIR, `${videoId}_${sourceLang || 'auto'}_${normTarget}_dual.json`);

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

    // If saveOnly requested, save client-provided segments to disk cache
    if (req.body.saveOnly || req.body.onlySave) {
        try {
            fs.writeFileSync(cacheFile, JSON.stringify({ segments }), 'utf8');
            return res.json({ success: true, cached: true, quality: 100 });
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

    // Cache to disk
    try {
        fs.writeFileSync(cacheFile, JSON.stringify({ segments: translatedSegments }), 'utf8');
    } catch {}

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
                .map(seg => ({ surface: seg.segment }));
            return res.json({ tokens });
        }

        const tokens = text.split(/\s+/).filter(Boolean).map(word => ({ surface: word }));
        res.json({ tokens });
    } catch (error) {
        console.error(`[Tokenize ${lang}] Error:`, error.message);
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

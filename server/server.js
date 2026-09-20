const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config();
const cors = require('cors');
const zlib = require('zlib');
const { pinyin } = require('pinyin-pro');
const hangulRomanization = require('hangul-romanization');
const versionData = require('../src/app/data/version-info.json');

const app = express();

const PORT = process.env.PORT || 3001;

// Middleware
const allowedOrigins = ['http://localhost:4200', 'http://127.0.0.1:4200', 'https://voca.study'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    }
}));
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
        if (texts.length > 80) {
            return res.status(400).json({ error: 'Batch size exceeds maximum limit of 80' });
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

function parseNaverLocalItem(item) {
    const word = (item.expEntry || '')
        .replace(/<sup[^>]*>[\s\S]*?<\/sup>/gi, '')
        .replace(/<[^>]+>/g, '')
        .trim();

    const phoneticObj = item.searchPhoneticSymbolList?.find(s => s?.symbolValue)
        || item.searchPhoneticSymbolList?.[0];
    const rawPhonetic = (phoneticObj?.symbolValue || item.phoneticSigns?.[0]?.sign || '')
        .replace(/<[^>]+>/g, '')
        .trim();

    let reading = '';
    if (rawPhonetic && rawPhonetic !== word) {
        if (/[a-zA-Z]/.test(rawPhonetic) || rawPhonetic.startsWith('/') || rawPhonetic.startsWith('[')) {
            reading = rawPhonetic;
        } else {
            reading = `[${rawPhonetic}]`;
        }
    }

    const definitions = [];
    const examples = [];
    let primaryPos = '';
    (item.meansCollector || []).forEach(collector => {
        if (!primaryPos && (collector.partOfSpeech2 || collector.partOfSpeech)) {
            primaryPos = (collector.partOfSpeech2 || collector.partOfSpeech)
                .replace(/<[^>]+>/g, '')
                .trim();
        }
        (collector.means || []).forEach(mean => {
            const def = (mean.value || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
            if (def && !definitions.some(d => d.toLowerCase() === def.toLowerCase())) {
                definitions.push(def);
            }
            const exOri = (mean.exampleOri || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
            const exTrans = (mean.exampleTrans || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
            if (exOri) {
                const formatted = exTrans ? `${exOri} (${exTrans})` : exOri;
                if (!examples.some(e => e.toLowerCase() === formatted.toLowerCase())) {
                    examples.push(formatted);
                }
            }
        });
    });

    const partOfSpeech = primaryPos || (item.partsOfSpeech ? item.partsOfSpeech.join(', ') : '');

    const audioObj = item.searchPhoneticSymbolList?.find(s => s?.symbolFile?.startsWith('http'))
        || item.searchPhoneticSymbolList?.[0];
    const rawSymbolFile = audioObj?.symbolFile || '';
    const symbolAudio = rawSymbolFile.startsWith('http') ? rawSymbolFile.split('|')[0].trim() : '';

    const audio = symbolAudio
        || item.searchSearchResultAudioList?.[0]?.url
        || item.searchSearchResultAudioList?.[0]?.audioUrl
        || item.phoneticSigns?.[0]?.signFile
        || item.pronFile
        || item.audioUrl
        || '';

    return {
        word,
        reading,
        definitions,
        ...(examples.length > 0 ? { examples: examples.slice(0, 3) } : {}),
        partOfSpeech,
        ...(audio ? { audio } : {})
    };
}

async function fetchDictLocal(word, from, to) {
    const pair = `${from}-${to}`;
    let entries = [];
    let source = 'none';

    try {
        // 1. Naver official bilingual & Oxford monolingual dictionaries
        const naverMap = {
            'ko-en': 'https://en.dict.naver.com/api3/enko/search',
            'ko-vi': 'https://ko.dict.naver.com/api3/kovi/search',
            'ko-ja': 'https://ja.dict.naver.com/api3/koja/search',
            'ko-zh': 'https://zh.dict.naver.com/api3/kozh/search',
            'ko-ko': 'https://ko.dict.naver.com/api3/koko/search',
            'ja-ko': 'https://ko.dict.naver.com/api3/jako/search',
            'zh-ko': 'https://ko.dict.naver.com/api3/zhko/search',
            'en-en': 'https://en.dict.naver.com/api3/enen/search',
            'en-vi': 'https://en.dict.naver.com/api3/envi/search',
            'en-ja': 'https://en.dict.naver.com/api3/enja/search',
            'en-ko': 'https://en.dict.naver.com/api3/enko/search',
            'en-zh': 'https://en.dict.naver.com/api3/enzh/search'
        };

        const naverEndpoint = naverMap[pair];
        if (naverEndpoint) {
            try {
                const referer = naverEndpoint.startsWith('https://en.') ? 'https://en.dict.naver.com/' : naverEndpoint;
                const res = await fetch(`${naverEndpoint}?query=${encodeURIComponent(word)}&m=pc&range=all`, {
                    headers: { ...BROWSER_HEADERS, 'Referer': referer },
                    signal: AbortSignal.timeout(5000)
                });
                if (res.ok) {
                    const data = await res.json();
                    const items = data?.searchResultMap?.searchResultListMap?.WORD?.items || [];
                    entries = items.slice(0, 5).map(parseNaverLocalItem).filter(e => e.word && e.definitions.length > 0);
                    if (entries.length > 0) source = 'naver';
                }
            } catch (e) { }
        }

        // 2. Japanese -> English (Jotoba + Jisho)
        if (entries.length === 0 && (pair === 'ja-en' || pair === 'ja-ja')) {
            if (pair === 'ja-en') {
                try {
                    const res = await fetch('https://jotoba.de/api/search/words', {
                        method: 'POST',
                        headers: { ...BROWSER_HEADERS, 'Content-Type': 'application/json', 'Referer': 'https://jotoba.de/' },
                        body: JSON.stringify({ query: word, language: 'English', no_english: false }),
                        signal: AbortSignal.timeout(5000)
                    });
                    if (res.ok) {
                        const data = await res.json();
                        const kanjiJlpt = data.kanji?.find(k => k.jlpt)?.jlpt || null;
                        entries = (data.words || []).slice(0, 5).map(e => {
                            let audio = e.audio?.url || (typeof e.audio === 'string' ? e.audio : '') || e.pitch?.audio || '';
                            if (audio && audio.startsWith('/')) audio = `https://jotoba.de${audio}`;
                            const partOfSpeech = (e.senses?.[0]?.pos || []).map(p => {
                                if (typeof p === 'string') return p;
                                if (p && typeof p === 'object') return Object.entries(p).map(([cat, sub]) => (sub ? `${cat} (${sub})` : cat)).join(', ');
                                return '';
                            }).filter(Boolean).join(', ');
                            const level = e.jlpt ? parseInt(String(e.jlpt).replace(/\D/g, '')) : (kanjiJlpt ? parseInt(String(kanjiJlpt).replace(/\D/g, '')) : null);
                            return {
                                word: e.reading?.kanji || e.reading?.kana || word,
                                reading: e.reading?.kana || '',
                                definitions: (e.senses || []).map(s => (s.glosses || []).join(', ')).filter(Boolean),
                                partOfSpeech,
                                level,
                                ...(audio ? { audio } : {})
                            };
                        }).filter(e => e.word && e.definitions.length > 0);
                        if (entries.length > 0) source = 'jotoba';
                    }
                } catch (e) { }
            }

            if (entries.length === 0) {
                try {
                    const jishoRes = await fetch(`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(word)}`, {
                        headers: { ...BROWSER_HEADERS, 'Referer': 'https://jisho.org/' },
                        signal: AbortSignal.timeout(5000)
                    });
                    if (jishoRes.ok) {
                        const data = await jishoRes.json();
                        entries = (data.data || []).slice(0, 5).map(entry => {
                            const japanese = entry.japanese?.[0] || {};
                            const w = japanese.word || japanese.reading || '';
                            const reading = japanese.reading || '';
                            const defs = [];
                            (entry.senses || []).forEach(s => { if (s.english_definitions) defs.push(s.english_definitions.join(', ')); });
                            const jlptTag = entry.jlpt?.find(t => t.startsWith('jlpt-n'));
                            const level = jlptTag ? parseInt(jlptTag.replace('jlpt-n', '')) : null;
                            return { word: w, reading, definitions: defs.slice(0, 5), partOfSpeech: '', level };
                        }).filter(e => e.word && e.definitions.length > 0);
                        if (entries.length > 0) source = 'jisho';
                    }
                } catch (e) { }
            }
        }

        // 3. Japanese -> Vietnamese (Mazii javi) & Japanese -> Chinese (Mazii jacn)
        if (entries.length === 0 && (pair === 'ja-vi' || pair === 'ja-zh')) {
            const dictCode = pair === 'ja-zh' ? 'jacn' : 'javi';
            try {
                const res = await fetch('https://mazii.net/api/search', {
                    method: 'POST',
                    headers: { ...BROWSER_HEADERS, 'Content-Type': 'application/json', 'Referer': 'https://mazii.net/' },
                    body: JSON.stringify({ dict: dictCode, type: 'word', query: word, page: 1 }),
                    signal: AbortSignal.timeout(5000)
                });
                if (res.ok) {
                    const data = await res.json();
                    const results = data.data || data.results || [];
                    entries = results.slice(0, 5).map(e => {
                        const defs = [];
                        const examples = [];
                        const seenDefs = new Set();
                        const seenEx = new Set();
                        if (Array.isArray(e.means)) {
                            e.means.forEach(m => {
                                if (m.mean) {
                                    const clean = m.mean.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
                                    const k = clean.toLowerCase();
                                    if (clean && !seenDefs.has(k)) {
                                        seenDefs.add(k);
                                        defs.push(clean);
                                    }
                                }
                                if (Array.isArray(m.examples)) {
                                    m.examples.forEach(ex => {
                                        const c = (ex.content || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
                                        const mn = (ex.mean || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
                                        if (c) {
                                            const formatted = mn ? `${c} (${mn})` : c;
                                            const exK = formatted.toLowerCase();
                                            if (!seenEx.has(exK)) {
                                                seenEx.add(exK);
                                                examples.push(formatted);
                                            }
                                        }
                                    });
                                }
                            });
                        }
                        if (defs.length === 0 && e.short_mean) defs.push(e.short_mean.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
                        let audio = e.audio || e.phonetic_audio || '';
                        if (audio && !audio.startsWith('http')) audio = '';
                        const rawLevel = Array.isArray(e.level) ? e.level[0] : e.level;
                        const level = rawLevel ? parseInt(String(rawLevel).replace(/\D/g, '')) : null;
                        return {
                            word: e.word || word,
                            reading: e.phonetic || '',
                            definitions: defs,
                            ...(examples.length > 0 ? { examples: examples.slice(0, 3) } : {}),
                            partOfSpeech: e.means?.[0]?.kind || '',
                            level,
                            ...(audio ? { audio } : {})
                        };
                    }).filter(e => e.word && e.definitions.length > 0);
                    if (entries.length > 0) source = 'mazii';
                }
            } catch (e) { }
        }

        // 4. Chinese -> English (MDBG)
        if (entries.length === 0 && (pair === 'zh-en' || pair === 'zh-zh')) {
            try {
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
                        const rd = pinyinMatch ? [...pinyinMatch[1].replace(/&#8203;|<wbr\s*\/?>/gi, '').matchAll(/<span[^>]*>([^<]+)<\/span>/g)].map(m => m[1].trim()).join(' ') : '';
                        const defsMatch = rowFragment.match(/<div class="defs">([\s\S]*?)<\/div>/);
                        let defs = [];
                        if (defsMatch) {
                            defs = defsMatch[1].replace(/<[^>]+>/g, '/').split('/').map(d => d.trim()).filter(d => d && d !== '&nbsp;');
                        }
                        const hskMatch = rowFragment.match(/HSK\s*(\d+)/i);
                        const level = hskMatch ? parseInt(hskMatch[1]) : null;
                        if (defs.length > 0) {
                            entries.push({ word: w, reading: rd, definitions: defs, partOfSpeech: '', level });
                        }
                    }
                    if (entries.length > 0) source = 'mdbg';
                }
            } catch (e) { }
        }

        // 5. Glosbe (zh-vi, zh-ja, en-vi, en-ko, ko-vi)
        if (entries.length === 0 && (pair === 'zh-vi' || pair === 'zh-ja' || pair === 'en-vi' || pair === 'en-ko')) {
            try {
                const url = `https://glosbe.com/${from}/${to}/${encodeURIComponent(word)}`;
                const res = await fetch(url, { headers: BROWSER_HEADERS, signal: AbortSignal.timeout(5000) });
                if (res.ok) {
                    const html = await res.text();
                    const h3Matches = [...html.matchAll(/<h3[^>]*class="[^"]*translation__item__(?:pharse|phrase)[^"]*"[^>]*>([\s\S]*?)<\/h3>/g)];
                    const seenDefs = new Set();
                    const py = from === 'zh' ? pinyin(word, { toneType: 'symbol' }) : '';
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
            } catch (e) { }
        }

        // 6. English monolingual fallback (Datamuse -> Free Dictionary API)
        if (entries.length === 0 && pair === 'en-en') {
            try {
                const dmRes = await fetch(`https://api.datamuse.com/words?sp=${encodeURIComponent(word)}&md=dp&max=3`, { signal: AbortSignal.timeout(3000) });
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
        if (req.query.reset === '1' || req.query.reset === 'true') {
            devDiamonds = 3;
            devLastRegen = Date.now();
        }
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
        let cached = null;
        let resolvedLang = normLang;
        if (normLang) {
            const file = path.join(TRANSCRIPTS_CACHE_DIR, `${videoId}_${normLang}.json`);
            if (fs.existsSync(file)) {
                cached = JSON.parse(fs.readFileSync(file, 'utf-8'));
            }
        }
        if (!cached) {
            const files = fs.readdirSync(TRANSCRIPTS_CACHE_DIR).filter(f => f.startsWith(`${videoId}_`) && f.endsWith('.json'));
            if (files.length > 0) {
                const match = files[0].match(/_([a-zA-Z0-9_-]+)\.json$/);
                if (match) resolvedLang = match[1];
                cached = JSON.parse(fs.readFileSync(path.join(TRANSCRIPTS_CACHE_DIR, files[0]), 'utf-8'));
            }
        }

        // Self-heal: if cached transcript has no tokens, enrich and save back
        if (cached && Array.isArray(cached.segments) && cached.segments.length > 0) {
            const targetLang = (resolvedLang || cached.language || 'ja').split('-')[0].toLowerCase();
            if (!cached.segments[0].tokens || cached.segments[0].tokens.length === 0) {
                cached.segments = enrichSegmentsWithTokensDev(cached.segments, targetLang);
                saveCachedTranscript(videoId, targetLang, cached);
            }
        }

        return cached;
    } catch (e) {
        console.error('[Transcript Cache] Read error:', e.message);
    }
    return null;
}

function saveCachedTranscript(videoId, lang, data) {
    try {
        if (!isValidVideoId(videoId)) return;
        const normLang = (lang || 'ja').replace(/[^a-zA-Z0-9_-]/g, '').split('-')[0].toLowerCase();
        if (data && Array.isArray(data.segments)) {
            data.segments = enrichSegmentsWithTokensDev(data.segments, normLang);
        }
        const file = path.join(TRANSCRIPTS_CACHE_DIR, `${videoId}_${normLang}.json`);
        fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
        console.error('[Transcript Cache] Write error:', e.message);
    }
}

const MIN_CUE_GAP = 0.5;
const MIN_CUE_DURATION = 0.5;
const MAX_CUE_DURATION = 5.0;

function cleanCueText(rawText) {
    if (!rawText || typeof rawText !== 'string') return '';
    return rawText
        .replace(/<[^>]+>/g, '') // Strip HTML/VTT tags
        .replace(/&quot;/g, '"')
        .replace(/&#39;|&apos;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
        .replace(/\[(?:Music|音楽|Applause|Laughter|Musique|Música)\]/gi, '')
        .replace(/[♪♫♬♩]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

const CJK_REGEX = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f\uac00-\ud7af]/;
const CJK_MAJOR_PUNCT_REGEX = /(?<=[。！？!?\n])\s*/;
const LATIN_MAJOR_PUNCT_REGEX = /(?<=[.!?\n])\s+/;
const CJK_MINOR_PUNCT_REGEX = /(?<=[、，,;；:：])\s*/;
const LATIN_MINOR_PUNCT_REGEX = /(?<=[,;:])\s+/;
const CJK_DISCOURSE_REGEX = /(?=(?:而且|但是|所以|然后|如果|因为|就是|可是|不过|虽然|那么|首先|第二|就算|终于|这样子|对我来说|另外|其实|总之|只要|比如|けど|から|ので|のに|そして|しかし|また|だから|ただし))/;
const JA_PARTICLE_REGEX = /(?<=[はがをにでへとからまで])(?=[^\s])/;

function chunkUnpunctuatedText(text, isCJK, maxLen) {
    if (!text || text.length <= maxLen) return [text];

    if (isCJK) {
        const discourseParts = text.split(CJK_DISCOURSE_REGEX).map(p => p.trim()).filter(Boolean);
        if (discourseParts.length > 1) {
            const parts = [];
            let buf = '';
            for (const dp of discourseParts) {
                if (buf && (buf.length + dp.length > maxLen)) {
                    parts.push(buf);
                    buf = dp;
                } else {
                    buf += dp;
                }
            }
            if (buf) parts.push(buf);
            if (parts.length > 1) return parts;
        }

        const particleParts = text.split(JA_PARTICLE_REGEX).map(p => p.trim()).filter(Boolean);
        if (particleParts.length > 1) {
            const parts = [];
            let buf = '';
            for (const pp of particleParts) {
                if (buf && (buf.length + pp.length > maxLen)) {
                    parts.push(buf);
                    buf = pp;
                } else {
                    buf += pp;
                }
            }
            if (buf) parts.push(buf);
            if (parts.length > 1) return parts;
        }

        const targetLen = Math.min(maxLen, 22);
        let rem = text;
        const chunks = [];
        while (rem.length > targetLen) {
            const spaceIdx = rem.lastIndexOf(' ', targetLen);
            const cutIdx = spaceIdx > 12 ? spaceIdx : targetLen;
            chunks.push(rem.slice(0, cutIdx).trim());
            rem = rem.slice(cutIdx).trim();
        }
        if (rem.length > 0) chunks.push(rem);
        return chunks.length > 0 ? chunks : [text];
    } else {
        const words = text.split(/\s+/);
        let buf = '';
        const chunks = [];
        for (const w of words) {
            if (buf && (buf.length + 1 + w.length > maxLen)) {
                chunks.push(buf);
                buf = w;
            } else {
                buf = buf ? `${buf} ${w}` : w;
            }
        }
        if (buf) chunks.push(buf);
        return chunks.length > 0 ? chunks : [text];
    }
}

function splitRunOnSegments(segments) {
    if (!segments?.length) return [];

    const result = [];
    for (const segment of segments) {
        const text = segment.text?.trim() || '';
        if (!text) continue;

        const isCJK = CJK_REGEX.test(text);
        const maxLen = isCJK ? 22 : 48;

        if (text.length <= maxLen && segment.duration <= 4.5) {
            result.push({ ...segment, text });
            continue;
        }

        const majorParts = isCJK
            ? text.split(CJK_MAJOR_PUNCT_REGEX).map(p => p.trim()).filter(Boolean)
            : text.split(LATIN_MAJOR_PUNCT_REGEX).map(p => p.trim()).filter(Boolean);

        const refinedParts = [];
        for (const p of (majorParts.length > 0 ? majorParts : [text])) {
            if (p.length > maxLen) {
                const subParts = isCJK
                    ? p.split(CJK_MINOR_PUNCT_REGEX).map(s => s.trim()).filter(Boolean)
                    : p.split(LATIN_MINOR_PUNCT_REGEX).map(s => s.trim()).filter(Boolean);
                if (subParts.length > 1) {
                    refinedParts.push(...subParts);
                } else {
                    refinedParts.push(p);
                }
            } else {
                refinedParts.push(p);
            }
        }

        const finalParts = [];
        for (const part of (refinedParts.length > 0 ? refinedParts : [text])) {
            if (part.length > maxLen) {
                finalParts.push(...chunkUnpunctuatedText(part, isCJK, maxLen));
            } else {
                finalParts.push(part);
            }
        }

        if (finalParts.length <= 1) {
            result.push({ ...segment, text: finalParts[0] || text });
            continue;
        }

        const totalChars = finalParts.reduce((sum, p) => sum + p.length, 0);
        if (totalChars === 0) {
            result.push(segment);
            continue;
        }

        let currentStart = segment.start;
        const totalDuration = segment.duration || (MIN_CUE_DURATION * finalParts.length);

        for (let i = 0; i < finalParts.length; i++) {
            const part = finalParts[i];
            const partRatio = part.length / totalChars;
            const partDuration = Math.max(MIN_CUE_DURATION, Math.round((totalDuration * partRatio) * 100) / 100);

            result.push({
                text: part,
                start: Math.round(currentStart * 100) / 100,
                duration: Math.min(partDuration, MAX_CUE_DURATION)
            });

            currentStart += partDuration;
        }
    }

    return result;
}

function cleanTranscriptSegments(segments) {
    if (!segments?.length) return [];
    const textCleaned = segments.map(seg => ({
        ...seg,
        text: cleanCueText(seg.text)
    })).filter(seg => seg.text.length > 0);

    const sorted = [...textCleaned].sort((a, b) => a.start - b.start);
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
    const splitSegments = splitRunOnSegments(filtered);

    return splitSegments.map((segment, index) => {
        let duration;
        if (index < splitSegments.length - 1) {
            const nextStart = splitSegments[index + 1].start;
            const gap = nextStart - segment.start;
            if (gap > 0) {
                duration = Math.min(gap, MAX_CUE_DURATION);
            } else {
                duration = MIN_CUE_DURATION;
            }
        } else {
            duration = Math.min(segment.duration, MAX_CUE_DURATION);
        }

        if (index < splitSegments.length - 1) {
            const nextStart = splitSegments[index + 1].start;
            const gap = nextStart - segment.start;
            if (gap > 0 && duration > gap) {
                duration = gap;
            }
        }

        if (duration < 0.3) duration = 0.3;
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
function hashStringLocal(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
    }
    return hash;
}

function declusterChannelsLocal(videos) {
    if (!Array.isArray(videos) || videos.length <= 2) return videos || [];
    const result = [];
    const pool = [...videos];
    while (pool.length > 0) {
        const current = pool.shift();
        result.push(current);
        if (pool.length === 0) break;
        const prevChannel = current.channel?.toLowerCase().trim();
        if (!prevChannel) continue;
        if (pool[0].channel?.toLowerCase().trim() === prevChannel) {
            const diffIdx = pool.findIndex(v => v.channel?.toLowerCase().trim() !== prevChannel);
            if (diffIdx > 0) {
                const [diffVideo] = pool.splice(diffIdx, 1);
                result.push(diffVideo);
            }
        }
    }
    return result;
}

function rankVideosLocal(videos, options = {}) {
    const { tier: requestedTier, context, sessionSeed = 12345 } = options;
    if (!Array.isArray(videos) || videos.length === 0) return [];

    const safeContext = context && typeof context === 'object' ? context : {};
    const watchedSet = new Set(Array.isArray(safeContext.watched) ? safeContext.watched : []);
    const inProgressMap = new Map();
    if (safeContext.inProgress && typeof safeContext.inProgress === 'object') {
        for (const [id, prog] of Object.entries(safeContext.inProgress)) {
            const num = Number(prog);
            if (!isNaN(num) && num > 0) inProgressMap.set(id, num);
        }
    }
    const favoritesSet = new Set(Array.isArray(safeContext.favorites) ? safeContext.favorites : []);
    const channelAffinityMap = new Map();
    if (Array.isArray(safeContext.topChannels)) {
        safeContext.topChannels.forEach((ch, idx) => {
            if (typeof ch === 'string' && ch.trim()) {
                channelAffinityMap.set(ch.trim().toLowerCase(), Math.max(30 - idx * 5, 10));
            }
        });
    }
    const vocabWords = (Array.isArray(safeContext.vocabWords) ? safeContext.vocabWords : [])
        .map(w => (typeof w === 'string' ? w.trim().toLowerCase() : ''))
        .filter(w => w.length >= 2);
    const dominantTier = safeContext.dominantTier?.toLowerCase()?.trim() || null;
    const TIERS_ORDER = ['beginner', 'elementary', 'intermediate', 'upper_intermediate', 'advanced'];

    const scored = videos.map(video => {
        let score = 0;
        const v = { ...video };
        const vid = v.videoId;

        if (inProgressMap.has(vid)) {
            const prog = inProgressMap.get(vid);
            if (prog >= 85) score -= 70;
            else if (prog >= 10) { score += 35; v.resumeProgress = Math.round(prog); }
            else score += 15;
        } else if (watchedSet.has(vid)) {
            score -= 70;
        } else {
            score += 40;
        }

        if (favoritesSet.has(vid)) score += 20;

        if (v.channel && channelAffinityMap.has(v.channel.trim().toLowerCase())) {
            score += channelAffinityMap.get(v.channel.trim().toLowerCase());
        }

        if (vocabWords.length > 0 && v.title) {
            const titleLower = v.title.toLowerCase();
            const matched = [];
            for (const w of vocabWords) {
                if (titleLower.includes(w)) {
                    matched.push(w);
                    if (matched.length >= 5) break;
                }
            }
            if (matched.length > 0) {
                v.matchedWords = matched;
                score += 25 + Math.min(matched.length * 5, 20);
            }
        }

        const d = v.duration || 0;
        if (d >= 180 && d <= 720) score += 20;
        else if (d > 720 && d <= 1200) score += 10;
        else if (d > 0 && (d < 90 || d > 2400)) score -= 10;

        if (!requestedTier || requestedTier === 'all') {
            if (dominantTier && v.tier) {
                if (v.tier === dominantTier) score += 20;
                else {
                    const domIdx = TIERS_ORDER.indexOf(dominantTier);
                    const vidIdx = TIERS_ORDER.indexOf(v.tier);
                    if (domIdx !== -1 && vidIdx === domIdx + 1) score += 12;
                }
            }
        }

        const h = Math.abs(hashStringLocal(String(vid)) ^ sessionSeed);
        score += ((h % 8000) / 1000) - 4;

        return { video: v, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return declusterChannelsLocal(scored.map(s => s.video));
}

/**
 * GET & POST /api/recommended-videos
 * Returns videos with verified transcripts, with server-side ranking support
 */
app.all('/api/recommended-videos', async (req, res) => {
    const lang = (req.body?.lang || req.query.lang || 'ja').toLowerCase().trim();
    const targetTier = (req.body?.tier || req.query.tier || '').toLowerCase().trim();
    const limit = Math.min(Math.max(parseInt(req.body?.limit ?? req.query.limit, 10) || 12, 1), 50);
    const offset = Math.max(parseInt(req.body?.offset ?? req.query.offset, 10) || 0, 0);
    const sessionSeed = parseInt(req.body?.sessionSeed ?? req.query.seed, 10) || 12345;
    const isRefresh = req.body?.refresh === true || req.query.refresh === 'true' || req.query.force === 'true';
    const userContext = (req.body?.context && typeof req.body.context === 'object') ? req.body.context : null;

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

    const query = (req.body?.q || req.body?.query || req.query.q || req.query.query || '').trim().toLowerCase();
    if (query) {
        results = results.filter(v => 
            (v.title && v.title.toLowerCase().includes(query)) ||
            (v.channel && v.channel.toLowerCase().includes(query))
        );
    }

    // Apply server-side ranking algorithm across all candidates
    results = rankVideosLocal(results, {
        tier: targetTier,
        context: userContext,
        sessionSeed
    });

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
        source: userContext ? 'dev-server:personalized' : (isRefresh ? 'dev-server:refresh' : 'dev-server')
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
 */
// In-memory registry for dev AI transcription jobs
const localAiJobs = new Map();

function normalizeLanguageCode(lang) {
    if (!lang || typeof lang !== 'string') return '';
    const clean = lang.trim().toLowerCase().split('-')[0].split('_')[0];
    if (clean === 'ja' || clean === 'japanese' || clean === 'jpn') return 'ja';
    if (clean === 'ko' || clean === 'korean' || clean === 'kor') return 'ko';
    if (clean === 'zh' || clean === 'chinese' || clean === 'cmn' || clean === 'mandarin' || clean === 'yue' || clean === 'zho' || clean === 'chi') return 'zh';
    if (clean === 'en' || clean === 'english' || clean === 'eng') return 'en';
    return clean;
}

function extractGladiaSegments(resultData) {
    if (!resultData) return [];
    const res = resultData.result || resultData.payload?.result || resultData;
    const transcription = res.transcription || {};

    let rawItems = [];
    if (Array.isArray(transcription.sentences) && transcription.sentences.length > 0) {
        rawItems = transcription.sentences;
    } else if (Array.isArray(res.sentences) && res.sentences.length > 0) {
        rawItems = res.sentences;
    } else if (Array.isArray(res.sentences?.results) && res.sentences.results.length > 0) {
        rawItems = res.sentences.results;
    } else if (Array.isArray(transcription.utterances) && transcription.utterances.length > 0) {
        rawItems = transcription.utterances;
    } else if (Array.isArray(res.utterances) && res.utterances.length > 0) {
        rawItems = res.utterances;
    } else if (Array.isArray(transcription.subtitles) && transcription.subtitles.length > 0) {
        rawItems = transcription.subtitles;
    } else if (Array.isArray(res.subtitles) && res.subtitles.length > 0) {
        rawItems = res.subtitles;
    }

    if (!Array.isArray(rawItems) || rawItems.length === 0) {
        const fullText = transcription.full_transcript || res.full_transcript;
        if (typeof fullText === 'string' && fullText.trim()) {
            return [{ id: 0, text: fullText.trim(), start: 0, duration: 5.0 }];
        }
        return [];
    }

    return rawItems.map((item, index) => {
        const text = (item.sentence || item.text || item.transcript || '').trim();
        const start = typeof item.start === 'number' ? item.start : (parseFloat(item.start) || 0);
        const end = typeof item.end === 'number' ? item.end : (parseFloat(item.end) || (start + (parseFloat(item.duration) || 2)));
        const duration = Math.max(0.5, end - start);
        return {
            id: index,
            text,
            start: Math.round(start * 100) / 100,
            duration: Math.round(duration * 100) / 100
        };
    }).filter(s => s.text.length > 0);
}

function extractGladiaDetectedLanguage(resultData, defaultLang = 'ja') {
    if (!resultData) return defaultLang;
    const res = resultData.result || resultData.payload?.result || resultData;
    const transcription = res.transcription || {};
    const rawLang = transcription.languages?.[0] || res.languages?.[0] || transcription.language || res.language || defaultLang;
    return normalizeLanguageCode(rawLang) || defaultLang;
}

function pollDevGladiaJob(jobId, resultUrl, videoId, lang, gladiaKey) {
    let attempts = 0;
    const interval = setInterval(async () => {
        attempts++;
        if (attempts > 60) {
            clearInterval(interval);
            const job = localAiJobs.get(jobId);
            if (job) {
                job.status = 'failed';
                job.error = 'Transcription timed out after 3 minutes';
            }
            return;
        }

        try {
            const gladiaRes = await fetch(resultUrl, {
                headers: { 'x-gladia-key': gladiaKey },
                signal: AbortSignal.timeout(10000)
            });

            if (!gladiaRes.ok) return;

            const resultData = await gladiaRes.json();
            if (resultData.status === 'done') {
                clearInterval(interval);
                const rawSegments = extractGladiaSegments(resultData);
                const cleaned = cleanTranscriptSegments(rawSegments);
                const detectedLang = extractGladiaDetectedLanguage(resultData, lang);

                if (cleaned.length > 0) {
                    saveCachedTranscript(videoId, detectedLang, {
                        videoId,
                        language: detectedLang,
                        source: 'ai',
                        segments: cleaned
                    });
                }

                const job = localAiJobs.get(jobId);
                if (job) {
                    job.status = 'completed';
                    job.detectedLanguage = detectedLang;
                }
            } else if (resultData.status === 'error') {
                clearInterval(interval);
                const job = localAiJobs.get(jobId);
                if (job) {
                    job.status = 'failed';
                    job.error = resultData.error_message || 'Gladia transcription failed';
                }
            }
        } catch {
            // Non-blocking transient error
        }
    }, 4000);
}

/**
 * Unified Transcript Endpoint for Local Dev
 * 1. Checks local file cache first (transcripts_cache/)
 * 2. Fetches from YouTube using Innertube with language fallback
 * 3. Supports Gladia AI speech-to-text generation for videos without native CC
 */
app.post('/api/transcript', async (req, res) => {
    const { videoId, lang = 'ja', preferAI, jobId, resultUrl, forceRefresh } = req.body;

    if (!videoId && !jobId && !resultUrl) {
        return res.status(400).json({ success: false, error: 'videoId, jobId, or resultUrl is required' });
    }

    const normalizedLang = (lang || 'ja').split('-')[0].toLowerCase();
    const gladiaKey = process.env.GLADIA_API_KEY;

    // -------------------------------------------------------------
    // Scenario 1: Polling an existing AI job by jobId
    // -------------------------------------------------------------
    if (jobId) {
        const localJob = localAiJobs.get(jobId);
        if (!localJob) {
            // Self-healing: check disk cache if job expired or dev server was restarted
            if (videoId) {
                const cached = getCachedTranscript(videoId, normalizedLang);
                if (cached && cached.segments && cached.segments.length > 0) {
                    const detectedLang = cached.language || normalizedLang;
                    return res.json({
                        success: true,
                        videoId,
                        language: detectedLang,
                        requestedLanguage: normalizedLang,
                        languageMismatch: false,
                        segments: cached.segments,
                        source: 'ai',
                        sourceDetail: 'gladia_cache',
                        availableLanguages: { native: [], ai: [detectedLang] },
                        subLanguages: [detectedLang],
                        whisperAvailable: true,
                        diamonds: devDiamonds,
                        maxDiamonds: 3,
                        nextRegenAt: null,
                        timing: 30
                    });
                }
            }
            return res.status(404).json({ success: false, errorCode: 'JOB_NOT_FOUND', error: 'AI transcription job not found or expired' });
        }

        if (localJob.status === 'completed') {
            const detectedLang = localJob.detectedLanguage || localJob.language;
            const isMismatch = normalizeLanguageCode(detectedLang) !== normalizeLanguageCode(localJob.language);
            const cached = getCachedTranscript(localJob.videoId, detectedLang);
            return res.json({
                success: true,
                videoId: localJob.videoId,
                language: detectedLang,
                requestedLanguage: localJob.language,
                languageMismatch: isMismatch,
                segments: cached?.segments || [],
                source: 'ai',
                sourceDetail: 'gladia',
                availableLanguages: { native: [], ai: [detectedLang] },
                subLanguages: [detectedLang],
                whisperAvailable: true,
                diamonds: devDiamonds,
                maxDiamonds: 3,
                nextRegenAt: null,
                timing: 30
            });
        }

        if (localJob.status === 'failed') {
            return res.status(400).json({
                success: false,
                errorCode: 'AI_JOB_FAILED',
                error: localJob.error || 'Gladia transcription failed'
            });
        }

        return res.json({
            success: false,
            status: 'processing',
            jobId,
            videoId: localJob.videoId,
            whisperAvailable: true,
            diamonds: devDiamonds,
            maxDiamonds: 3,
            nextRegenAt: null,
            timing: 20
        });
    }

    // -------------------------------------------------------------
    // Legacy Polling by resultUrl
    // -------------------------------------------------------------
    if (resultUrl) {
        try {
            const parsed = new URL(resultUrl);
            if (parsed.protocol !== 'https:' || parsed.hostname !== 'api.gladia.io' || !/^\/v2\/(transcription|pre-recorded)(\/[a-zA-Z0-9_/-]+)?$/.test(parsed.pathname)) {
                return res.status(400).json({ success: false, errorCode: 'INVALID_RESULT_URL', error: 'Invalid resultUrl: must be a gladia.io transcription URL' });
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
                const segments = extractGladiaSegments(resultData);
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
        if (forceRefresh && videoId) {
            for (const [jId, job] of localAiJobs.entries()) {
                if (job.videoId === videoId) {
                    localAiJobs.delete(jId);
                }
            }
        }

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

        let submitData = null;
        let lastErr = null;
        for (let attempt = 1; attempt <= 2; attempt++) {
            try {
                const submitResponse = await fetch('https://api.gladia.io/v2/pre-recorded', {
                    method: 'POST',
                    headers: {
                        'x-gladia-key': gladiaKey,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ audio_url: youtubeUrl, sentences: true, subtitles: false }),
                    signal: AbortSignal.timeout(24000)
                });

                if (!submitResponse.ok) {
                    const errData = await submitResponse.json().catch(() => ({}));
                    throw new Error(`Gladia submission failed (${submitResponse.status}): ${JSON.stringify(errData)}`);
                }

                submitData = await submitResponse.json();
                break;
            } catch (err) {
                lastErr = err;
                console.warn(`[Dev Server] Gladia submit attempt ${attempt}/2 failed: ${err.message}`);
                if (attempt < 2) await new Promise(r => setTimeout(r, 1000));
            }
        }

        if (!submitData?.result_url) {
            console.error('[Dev Server] Gladia AI error:', lastErr?.message);
            return res.status(500).json({
                success: false,
                errorCode: 'AI_TRANSCRIPTION_ERROR',
                error: lastErr?.message || 'Gladia submission failed',
                whisperAvailable: true,
                diamonds: devDiamonds,
                maxDiamonds: 3,
                nextRegenAt: null
            });
        }

        const devJobId = 'dev_job_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
        localAiJobs.set(devJobId, {
            id: devJobId,
            videoId,
            language: normalizedLang,
            status: 'processing',
            resultUrl: submitData.result_url,
            createdAt: Date.now()
        });

        // Launch background event-loop poller in Node
        pollDevGladiaJob(devJobId, submitData.result_url, videoId, normalizedLang, gladiaKey);

        console.log(`[Dev Server] Gladia job created with ID: ${devJobId}`);

        return res.status(202).json({
            success: false,
            status: 'processing',
            jobId: devJobId,
            videoId,
            whisperAvailable: true,
            diamonds: devDiamonds,
            maxDiamonds: 3,
            nextRegenAt: null,
            timing: 50
        });
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

                            const enriched = enrichSegmentsWithTokensDev(cleaned, actualLang);
                            saveCachedTranscript(videoId, actualLang, {
                                videoId,
                                language: actualLang,
                                source: 'native',
                                segments: enriched
                            });

                            return res.json({
                                success: true,
                                videoId,
                                language: actualLang,
                                requestedLanguage: normalizedLang,
                                segments: enriched,
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
 * GET /api/dual-subtitles
 * Checks disk cache for existing dual subtitles
 */
app.get('/api/dual-subtitles', async (req, res) => {
    const { videoId, sourceLang, targetLang } = req.query;

    if (!isValidVideoId(videoId)) {
        return res.status(400).json({ error: 'Invalid or missing videoId parameter' });
    }

    const cleanSource = (sourceLang || 'auto').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 10);
    const normTarget = (targetLang || 'en').replace(/[^a-zA-Z0-9_-]/g, '').split('-')[0].toLowerCase().slice(0, 5);
    const cacheFileName = `${videoId}_${cleanSource}_${normTarget}_dual.json`;
    const cacheFile = path.join(TRANSCRIPTS_CACHE_DIR, cacheFileName);

    try {
        const resolvedCache = path.resolve(cacheFile);
        if (!resolvedCache.startsWith(path.resolve(TRANSCRIPTS_CACHE_DIR))) {
            return res.status(400).json({ error: 'Invalid cache path' });
        }

        if (fs.existsSync(resolvedCache)) {
            const data = JSON.parse(await fs.promises.readFile(resolvedCache, 'utf8'));
            return res.json(data);
        }
        return res.status(404).json({ error: 'Dual subtitles not found in cache' });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to read dual subtitles cache' });
    }
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

let kuromojiDevTokenizer = null;
let kuromojiDevPromise = null;

function initKuromojiDev() {
    if (!kuromojiDevPromise) {
        try {
            const kuromoji = require('@patdx/kuromoji');
            const fsLoader = {
                async loadArrayBuffer(filename) {
                    const filePath = path.join(process.cwd(), 'node_modules', '@patdx', 'kuromoji', 'dict', filename);
                    const compressed = await fs.promises.readFile(filePath);
                    const uncompressed = zlib.gunzipSync(compressed);
                    return uncompressed.buffer.slice(uncompressed.byteOffset, uncompressed.byteOffset + uncompressed.byteLength);
                }
            };
            kuromojiDevPromise = new kuromoji.TokenizerBuilder({ loader: fsLoader })
                .build()
                .then(t => {
                    kuromojiDevTokenizer = t;
                    console.log('[Dev Server] Local kuromoji tokenizer initialized successfully');
                    return t;
                })
                .catch(err => {
                    console.warn('[Dev Server] Local kuromoji init failed, fallback to Intl.Segmenter:', err.message);
                    kuromojiDevPromise = null;
                    return null;
                });
        } catch (e) {
            console.warn('[Dev Server] kuromoji module not loaded:', e.message);
        }
    }
}
initKuromojiDev();

function katakanaToHiraganaDev(text) {
    if (!text) return '';
    return text.replace(/[\u30A1-\u30F6]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
}

function hasKanjiDev(text) {
    return /[\u4E00-\u9FFF]/.test(text || '');
}

const PUNCTUATION_REGEX = /^[\s\p{P}\p{S}【】「」『』（）〔〕［］｛｝〈〉《》〖〗〘〙〚〛｟｠、。・ー〜～！？：；，．""''…—–*]+$/u;
function isPunctuation(text) {
    return PUNCTUATION_REGEX.test(text);
}

function hasHangulBatchim(char) {
    const code = char.charCodeAt(0);
    if (code < 0xAC00 || code > 0xD7AF) return false;
    return (code - 0xAC00) % 28 !== 0;
}

function detachKoreanParticle(word) {
    if (!word || typeof word !== 'string' || word.length < 2) return null;
    for (let i = 0; i < word.length; i++) {
        const code = word.charCodeAt(i);
        if (code < 0xAC00 || code > 0xD7AF) return null;
    }

    const particles3 = ['에서는', '에서도', '에게는', '에게도', '께서는'];
    for (const p of particles3) {
        if (word.endsWith(p) && word.length > 3) {
            return { stem: word.slice(0, -3), particle: p };
        }
    }

    const particles2 = ['에서', '에게', '한테', '부터', '까지', '하고', '처럼', '보다', '마저', '조차', '께서', '께도'];
    for (const p of particles2) {
        if (word.endsWith(p) && word.length > 2) {
            return { stem: word.slice(0, -2), particle: p };
        }
    }

    if (word.endsWith('으로') && word.length > 2) {
        const prev = word[word.length - 3];
        if (hasHangulBatchim(prev)) {
            return { stem: word.slice(0, -2), particle: '으로' };
        }
    }

    const last = word[word.length - 1];
    const prev = word[word.length - 2];
    const prevBatchim = hasHangulBatchim(prev);

    if (last === '는' && !prevBatchim) return { stem: word.slice(0, -1), particle: '는' };
    if (last === '은' && prevBatchim) return { stem: word.slice(0, -1), particle: '은' };
    if (last === '를' && !prevBatchim) return { stem: word.slice(0, -1), particle: '를' };
    if (last === '을' && prevBatchim) return { stem: word.slice(0, -1), particle: '을' };
    if (last === '가' && !prevBatchim) return { stem: word.slice(0, -1), particle: '가' };
    if (last === '이' && prevBatchim) return { stem: word.slice(0, -1), particle: '이' };
    if (last === '와' && !prevBatchim) return { stem: word.slice(0, -1), particle: '와' };
    if (last === '과' && prevBatchim) return { stem: word.slice(0, -1), particle: '과' };
    if (last === '로' && !prevBatchim) return { stem: word.slice(0, -1), particle: '로' };

    if (word.length >= 3 && (last === '의' || last === '도' || last === '만' || last === '에')) {
        return { stem: word.slice(0, -1), particle: last };
    }

    return null;
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

function tokenizeTextDev(text, lang) {
    if (!text || typeof text !== 'string') return [];
    if (lang === 'ja' && kuromojiDevTokenizer) {
        try {
            const kuromojiTokens = kuromojiDevTokenizer.tokenize(text);
            return kuromojiTokens.map(t => {
                const token = { surface: t.surface_form };
                const isPunc = t.pos === '記号' || t.pos === '空白' || isPunctuation(t.surface_form);
                if (isPunc) {
                    token.isPunctuation = true;
                    return token;
                }
                if (t.reading) {
                    const hira = katakanaToHiraganaDev(t.reading);
                    if (hasKanjiDev(t.surface_form)) {
                        token.reading = hira;
                    }
                }
                if (t.basic_form && t.basic_form !== '*' && t.basic_form !== t.surface_form) {
                    token.baseForm = t.basic_form;
                }
                if (t.pos && t.pos !== '*') {
                    token.partOfSpeech = t.pos;
                }
                return token;
            });
        } catch (e) {
            console.warn('[Dev Tokenize JA] kuromoji error:', e.message);
        }
    }
    const segmenter = segmenters[lang];
    let pinyinList = null;
    if (lang === 'zh') {
        try {
            pinyinList = pinyin(text, { toneType: 'symbol', type: 'all' });
        } catch (e) {}
    }

    if (segmenter) {
        const segs = [...segmenter.segment(text)];
        return segs
            .filter(s => s.isWordLike || s.segment.trim())
            .map(s => {
                const token = buildDevToken(s.segment, s.isWordLike, lang);
                if (token.isPunctuation) return token;

                if (lang === 'zh' && pinyinList && pinyinList.length >= s.index + s.segment.length) {
                    const slice = pinyinList.slice(s.index, s.index + s.segment.length);
                    const py = slice.map(item => item.pinyin || item.origin).filter(Boolean).join(' ');
                    if (py && py !== token.surface) {
                        token.pinyin = py;
                    }
                    if (slice.length > 0 && slice.some(item => item.pinyin)) {
                        token.rubyParts = slice.map(item => ({
                            text: item.origin,
                            reading: item.pinyin || undefined
                        }));
                    }
                } else if (lang === 'ko') {
                    const detached = detachKoreanParticle(token.surface);
                    if (detached) {
                        token.baseForm = detached.stem;
                        token.particle = detached.particle;
                    }
                }

                return token;
            });
    }

    return text.split(/\s+/).filter(Boolean).map(word => buildDevToken(word, true, lang));
}

function enrichSegmentsWithTokensDev(segments, lang) {
    if (!Array.isArray(segments) || segments.length === 0) return [];
    const normLang = (lang || '').split('-')[0].toLowerCase();
    if (!['ja', 'zh', 'ko', 'en'].includes(normLang)) return segments;

    const allHaveTokens = segments.every(s => s && Array.isArray(s.tokens) && s.tokens.length > 0);
    if (allHaveTokens) return segments;

    return segments.map(seg => {
        if (!seg) return seg;
        if (Array.isArray(seg.tokens) && seg.tokens.length > 0) return seg;
        const text = seg.text || '';
        if (!text.trim()) return { ...seg, tokens: [] };
        try {
            const tokens = tokenizeTextDev(text, normLang);
            return { ...seg, tokens: Array.isArray(tokens) ? tokens : [] };
        } catch {
            return { ...seg, tokens: [] };
        }
    });
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
        const tokens = texts.map(text => tokenizeTextDev(text, lang));
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
        const tokens = tokenizeTextDev(text, lang);
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
    const mockVersion = req.query.mock_version || versionData.version;

    res.json({
        ...versionData,
        version: mockVersion,
        minSupportedVersion: mockForce ? mockVersion : versionData.minSupportedVersion,
        forceUpdate: mockForce || versionData.forceUpdate,
        maintenance: mockMaintenance || versionData.maintenance,
        maintenanceMessage: mockMaintenance ? 'Development mock maintenance mode active.' : (versionData.maintenanceMessage || '')
    });
});

const serverInstance = app.listen(PORT, () => {
    console.log(`[Server] Gladia transcription server running on port ${PORT}`);
    if (!process.env.GLADIA_API_KEY) {
        console.warn('[Server] WARNING: GLADIA_API_KEY not set!');
        console.warn('[Server] Get your free key at: https://gladia.io');
    }
});

serverInstance.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.warn(`[Server] Port ${PORT} is already in use. Assuming server is already active.`);
    } else {
        console.error('[Server] Server error:', err);
    }
});

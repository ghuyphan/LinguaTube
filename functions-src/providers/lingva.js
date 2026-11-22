import { readBoundedBody, requestSignal } from '../utils/response-body.js';

const MOZHI_INSTANCES = [
    'https://mozhi.adminforge.de',
    'https://mozhi.ducks.party',
    'https://mozhi.aryak.me',
    'https://translate.projectsegfau.lt',
    'https://mozhi.pussthecat.org',
    'https://mozhi.catsarch.com'
];
const providerCooldown = new Map();
let mozhiCursor = 0;

const isCoolingDown = key => (providerCooldown.get(key) || 0) > Date.now();
const markCooldown = (key, ms = 60000) => providerCooldown.set(key, Date.now() + ms);

async function fetchTranslationJson(url, init, options, timeout = 3500) {
    if (Date.now() >= options.deadline || options.signal?.aborted) throw new Error('Translation budget exhausted');
    const signal = requestSignal(options.deadline, timeout, options.signal);
    const response = await fetch(url, { ...init, signal, redirect: 'manual' });
    if (!response.ok) {
        void response.body?.cancel().catch(() => {});
        const error = new Error(`Translation HTTP ${response.status}`); error.status = response.status; throw error;
    }
    return JSON.parse(new TextDecoder().decode(await readBoundedBody(response, signal, 1024 * 1024)));
}

/** One provider order and time budget for dictionary and subtitle callers. */
export async function translateText(text, source, target, { deadline = Date.now() + 20000, signal } = {}) {
    if (!text?.trim()) return '';
    if (source === target) return text;
    const options = { deadline, signal };
    const headers = { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' };

    for (const client of ['gtx', 'dict-chrome-ex']) {
        const key = `google:${client}`;
        if (isCoolingDown(key)) continue;
        try {
            const query = new URLSearchParams({ client, sl: source, tl: target, dt: 't', q: text });
            const url = 'https://translate.googleapis.com/translate_a/single';
            let data;
            const post = () => fetchTranslationJson(url, { method: 'POST', headers, body: query }, options);
            if (query.toString().length > 6000) data = await post();
            else {
                try { data = await fetchTranslationJson(`${url}?${query}`, { headers }, options); }
                catch (error) { if (error.status !== 414) throw error; data = await post(); }
            }
            const value = Array.isArray(data?.[0]) ? data[0].map(item => item?.[0] || '').join('') : '';
            if (value) { providerCooldown.delete(key); return value; }
        } catch (error) {
            if (error.status === 302 || error.status === 403 || error.status === 429) markCooldown(key);
        }
    }
    if (!text.startsWith('<t id="')) {
        const start = mozhiCursor++ % MOZHI_INSTANCES.length;
        for (let i = 0; i < MOZHI_INSTANCES.length; i++) {
            const instance = MOZHI_INSTANCES[(start + i) % MOZHI_INSTANCES.length];
            if (isCoolingDown(instance)) continue;
            try {
                const query = new URLSearchParams({ engine: 'duckduckgo', from: source, to: target, text });
                const data = await fetchTranslationJson(`${instance}/api/translate?${query}`, { headers }, options, 3500);
                const value = typeof data?.['translated-text'] === 'string' ? data['translated-text'].trim() : '';
                if (value) { providerCooldown.delete(instance); return value; }
            } catch { markCooldown(instance); }
        }
    }
    if (!isCoolingDown('mymemory')) {
        try {
            const pair = source === 'auto' ? target : `${source}|${target}`;
            const data = await fetchTranslationJson(`https://api.mymemory.translated.net/get?${new URLSearchParams({ q: text, langpair: pair, de: 'admin@voca.study' })}`, { headers }, options);
            const value = data?.responseData?.translatedText;
            if (data?.responseStatus === 200 && typeof value === 'string' && value && !value.startsWith('MYMEMORY WARNING:')) {
                providerCooldown.delete('mymemory');
                return value;
            }
            if (data?.responseStatus === 429 || value?.startsWith('MYMEMORY WARNING:')) markCooldown('mymemory');
        } catch (error) {
            if (error.status === 429 || error.status >= 500) markCooldown('mymemory');
        }
    }
    return null;
}

export function encodeTaggedTexts(texts) {
    return texts.map((text, idx) => {
        const clean = (text || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return `<t id="${idx}">${clean}</t>`;
    }).join('\n');
}

/**
 * Decode tagged translation response with forgiving regex
 */
export function decodeTaggedTranslations(translatedText, expectedCount) {
    const map = new Map();
    if (!translatedText) return map;

    const regex = /<[\s]*t[\s]+id[\s]*=[\s]*["'“”‘’«»]?(\d+)["'“”‘’«»]?[\s]*>((?:(?!(?:<|&lt;)[\s]*t[\s]+id)[\s\S])*?)<\/[\s]*t[\s]*>/gi;
    let match;
    while ((match = regex.exec(translatedText)) !== null) {
        const id = parseInt(match[1], 10);
        if (!isNaN(id) && id >= 0 && id < expectedCount) {
            let content = match[2].trim();
            if (/<[\s]*t[\s]+id/i.test(content) || /&lt;[\s]*t[\s]+id/i.test(content) || /<\/[\s]*t[\s]*>/i.test(content)) continue;
            content = content
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&amp;/g, '&');
            map.set(id, content);
        }
    }
    return map;
}

/** Preserve positional results, with two chunk workers and five shared recovery slots. */
export async function translateBatch(texts, source, target, { deadline = Date.now() + 20000, signal } = {}) {
    if (!texts?.length) return [];
    if (source === target) return [...texts];
    const options = { deadline, signal };
    const results = texts.map(text => text?.trim() ? null : text);
    const chunks = [];
    let chunk = [], size = 0;
    texts.forEach((text, index) => {
        if (!text?.trim()) return;
        const length = text.trim().length + 20;
        if (size + length > 1500 && chunk.length) { chunks.push(chunk); chunk = []; size = 0; }
        chunk.push({ text: text.trim(), index }); size += length;
    });
    if (chunk.length) chunks.push(chunk);
    let active = 0;
    const waiting = [];
    const recover = async indices => {
        await Promise.all(indices.map(async item => {
            if (active >= 5) await new Promise(resolve => waiting.push(resolve));
            else active++;
            try {
                if (Date.now() < deadline && !signal?.aborted) results[item.index] = await translateText(item.text, source, target, options);
            } finally {
                const next = waiting.shift();
                if (next) next(); else active--;
            }
        }));
    };
    const worker = async () => {
        while (chunks.length && Date.now() < deadline && !signal?.aborted) {
            const items = chunks.shift();
            if (!isCoolingDown('google:gtx') || !isCoolingDown('google:dict-chrome-ex')) {
                const translated = await translateText(encodeTaggedTexts(items.map(item => item.text)), source, target, options);
                const decoded = decodeTaggedTranslations(translated, items.length);
                const lines = translated?.split(/\n+/).map(line => line.trim()).filter(Boolean) || [];
                items.forEach((item, index) => {
                    const cleanLine = lines[index];
                    const fallback = (decoded.size === 0 && lines.length === items.length && cleanLine && !/<[\s]*\/?t\b/i.test(cleanLine)) ? cleanLine : null;
                    results[item.index] = decoded.get(index) || fallback;
                });
            }
            await recover(items.filter(item => !results[item.index]));
        }
    };
    await Promise.all(Array.from({ length: Math.min(2, chunks.length) }, worker));
    return results;
}

export class TranslationProvider {
    async translateEntries(entries, targetLang, { deadline = Date.now() + 4000, signal, sourceLang = 'en' } = {}) {
        const selected = entries;
        const tasks = selected.flatMap((entry, entryIndex) => entry.definitions.map(text => ({ entryIndex, text })));
        const translated = await translateBatch(tasks.map(task => task.text), sourceLang, targetLang, { deadline, signal });
        const result = selected.map(entry => ({ ...entry, definitions: [] }));
        tasks.forEach((task, index) => { if (translated[index]) result[task.entryIndex].definitions.push(translated[index]); });
        // Never drop meanings or entries silently when a definition translation is partial.
        return translated.every(value => typeof value === 'string' && value.trim()) ? result : [];
    }
}

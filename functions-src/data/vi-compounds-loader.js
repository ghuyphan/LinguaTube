/**
 * Lazy-loading singleton for the MIT-licensed Vietnamese compound word lexicon.
 * Mirrors getKuromojiTokenizer() warm-isolate caching and retry-on-failure recovery.
 */

const IPA_DICT_CDN_URL = 'https://cdn.jsdelivr.net/gh/open-dict-data/ipa-dict@master/data/vi_N.txt';

// Built-in fallback core used only if disk/assets/network are all unavailable.
const CORE_COMPOUNDS = [
    'xin chào', 'cảm ơn', 'tạm biệt', 'xin lỗi', 'không có gì', 'hẹn gặp lại',
    'tiếng việt', 'tiếng anh', 'tiếng nhật', 'tiếng hàn', 'tiếng trung', 'việt nam',
    'hôm nay', 'hôm qua', 'ngày mai', 'bây giờ', 'buổi sáng', 'buổi chiều', 'buổi tối',
    'cuối tuần', 'bao nhiêu', 'thế nào', 'tại sao', 'vì vậy', 'cho nên', 'bởi vì',
    'mặc dù', 'tuy nhiên', 'ngoài ra', 'không những', 'mà còn',
    'học sinh', 'sinh viên', 'giáo viên', 'bác sĩ', 'gia đình', 'bạn bè',
    'thành phố', 'bệnh viện', 'siêu thị', 'nhà hàng', 'khách sạn', 'sân bay',
    'giới thiệu', 'chuẩn bị', 'quyết định', 'giải thích', 'thú vị', 'tuyệt vời',
    'quan trọng', 'đặc biệt', 'thường xuyên', 'bình thường', 'hạnh phúc', 'kinh nghiệm'
];

let compoundsCache = null;
let loadPromise = null;
let loadedFromSource = false;

export function parseVietnameseCompounds(rawText) {
    const set = new Set(CORE_COMPOUNDS);
    if (!rawText || typeof rawText !== 'string') return set;

    for (const rawLine of rawText.split(/\r?\n/)) {
        if (!rawLine) continue;
        const tabIdx = rawLine.indexOf('\t');
        const entry = (tabIdx === -1 ? rawLine : rawLine.slice(0, tabIdx))
            .normalize('NFC')
            .toLowerCase()
            .replace(/\s+/g, ' ')
            .trim();
        if (entry.includes(' ')) {
            set.add(entry);
        }
    }
    return set;
}

export function getLoadedVietnameseCompounds() {
    return compoundsCache || new Set(CORE_COMPOUNDS);
}

export function isVietnameseCompoundsReady() {
    return loadedFromSource && compoundsCache !== null;
}

export function setVietnameseCompounds(rawTextOrSet) {
    compoundsCache = rawTextOrSet instanceof Set
        ? new Set(rawTextOrSet)
        : parseVietnameseCompounds(rawTextOrSet);
    loadedFromSource = true;
    loadPromise = Promise.resolve(compoundsCache);
    return compoundsCache;
}

async function readLocalLexiconInNode() {
    try {
        const fs = globalThis.process?.getBuiltinModule?.('node:fs/promises');
        const path = globalThis.process?.getBuiltinModule?.('node:path');
        if (!fs || !path || typeof globalThis.process?.cwd !== 'function') return null;

        const candidates = [
            path.join(globalThis.process.cwd(), 'public/data/vi-compounds.txt'),
            path.join(globalThis.process.cwd(), 'dist/lingua-tube/browser/data/vi-compounds.txt')
        ];
        for (const candidate of candidates) {
            try {
                const text = await fs.readFile(candidate, 'utf8');
                if (text) return text;
            } catch { /* try next candidate */ }
        }
    } catch { /* not in Node */ }
    return null;
}

async function fetchLexiconFromSources({ assets, requestUrl } = {}) {
    if (assets && typeof assets.fetch === 'function') {
        try {
            const res = await assets.fetch(new Request('https://assets.local/data/vi-compounds.txt'));
            if (res.ok) return await res.text();
        } catch { /* fallback below */ }
    }

    if (requestUrl && /^https?:\/\//i.test(requestUrl)) {
        try {
            const res = await fetch(new URL('/data/vi-compounds.txt', requestUrl), {
                signal: AbortSignal.timeout(5000)
            });
            if (res.ok) return await res.text();
        } catch { /* fallback below */ }
    }

    const res = await fetch(IPA_DICT_CDN_URL, { signal: AbortSignal.timeout(12000) });
    if (!res.ok) {
        throw new Error(`Failed to fetch Vietnamese compound lexicon: HTTP ${res.status}`);
    }
    return await res.text();
}

export async function getVietnameseCompounds(options = {}) {
    if (loadedFromSource && compoundsCache) {
        return compoundsCache;
    }

    if (!loadPromise) {
        loadPromise = (async () => {
            const nodeText = await readLocalLexiconInNode();
            const rawText = nodeText ?? await fetchLexiconFromSources(options);
            compoundsCache = parseVietnameseCompounds(rawText);
            loadedFromSource = true;
            return compoundsCache;
        })().catch(err => {
            console.warn('[VI Compounds] Load failed, using core fallback:', err?.message || err);
            loadPromise = null; // Allow retry on subsequent requests
            if (!compoundsCache) {
                compoundsCache = new Set(CORE_COMPOUNDS);
            }
            return compoundsCache;
        });
    }

    return loadPromise;
}

/**
 * Compact IPADIC morphological tokenizer for Cloudflare Workers & Node.
 *
 * Loads the single pre-packed binary `ipadic-compact.bin.gz` (~11 MB gz, ~34 MB RAM)
 * into zero-copy TypedArray views and runs the exact IPADIC Double-Array Trie +
 * Viterbi algorithm, sharing a single instance across esbuild route bundles via globalThis.
 */

const MAGIC = 0x50494b56; // 'VKIP'
const VERSION = 1;
const SECTION_COUNT = 13;
const ASSET_PATH = '/data/ipadic-compact.bin.gz';
const GLOBAL_STATE_KEY = '__vocaCompactKuromojiState';

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder('utf-8');

function getGlobalState() {
    let state = globalThis[GLOBAL_STATE_KEY];
    if (!state) {
        state = { promise: null, ready: false, instance: null };
        globalThis[GLOBAL_STATE_KEY] = state;
    }
    return state;
}

export function isCompactKuromojiReady() {
    return getGlobalState().ready;
}

export function resetCompactKuromojiForTests() {
    const state = getGlobalState();
    state.promise = null;
    state.ready = false;
    state.instance = null;
}

function readCString(bytes, offset) {
    let end = offset;
    while (end < bytes.length && bytes[end] !== 0) end++;
    if (end === offset) return '';
    return textDecoder.decode(bytes.subarray(offset, end));
}

function parseInvokeDef(bytes) {
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    const classes = [];
    let defaultId = 0;
    let pos = 0;
    while (pos + 6 < bytes.length) {
        const classId = classes.length;
        const isAlwaysInvoke = bytes[pos++];
        const isGrouping = bytes[pos++];
        const maxLength = view.getUint32(pos, true);
        pos += 4;
        let end = pos;
        while (end < bytes.length && bytes[end] !== 0) end++;
        const className = textDecoder.decode(bytes.subarray(pos, end));
        pos = end + 1;
        if (className === 'DEFAULT') defaultId = classId;
        classes.push({ classId, className, isAlwaysInvoke, isGrouping, maxLength });
    }
    return { classes, defaultClass: classes[defaultId] || classes[0] };
}

class CompactKuromojiTokenizer {
    constructor(buffer) {
        const header = new DataView(buffer);
        if (buffer.byteLength < 16 + SECTION_COUNT * 8) {
            throw new Error('Compact IPADIC buffer truncated');
        }
        if (header.getUint32(0, true) !== MAGIC || header.getUint32(4, true) !== VERSION) {
            throw new Error('Invalid compact IPADIC header');
        }
        const count = header.getUint32(8, true);
        if (count < SECTION_COUNT) {
            throw new Error(`Unexpected compact IPADIC section count: ${count}`);
        }
        const sec = (idx) => {
            const off = header.getUint32(16 + idx * 8, true);
            const len = header.getUint32(16 + idx * 8 + 4, true);
            return { off, len };
        };
        const i32 = (idx) => { const s = sec(idx); return new Int32Array(buffer, s.off, s.len / 4); };
        const i16 = (idx) => { const s = sec(idx); return new Int16Array(buffer, s.off, s.len / 2); };
        const u8 = (idx) => { const s = sec(idx); return new Uint8Array(buffer, s.off, s.len); };
        const dv = (idx) => { const s = sec(idx); return new DataView(buffer, s.off, s.len); };

        this.base = i32(0);
        this.check = i32(1);
        this.cc = i16(2);
        this.ccBackDim = this.cc[1];
        this.tidView = dv(3);
        this.tidPos = u8(4);
        this.tidMapOffsets = i32(5);
        this.tidMapValues = i32(6);
        this.unkView = dv(7);
        this.unkPos = u8(8);
        this.unkMapOffsets = i32(9);
        this.unkMapValues = i32(10);
        this.unkChar = u8(11);
        const invoke = parseInvokeDef(u8(12));
        this.charClasses = invoke.classes;
        this.defaultCharClass = invoke.defaultClass;
    }

    _lookupCharClass(ch) {
        const code = ch.charCodeAt(0);
        if (code >= 0xd800 && code <= 0xdbff) return this.defaultCharClass;
        if (code < this.unkChar.length) {
            return this.charClasses[this.unkChar[code]] || this.defaultCharClass;
        }
        return this.defaultCharClass;
    }

    _commonPrefixSearch(str) {
        const bytes = textEncoder.encode(str);
        const base = this.base;
        const check = this.check;
        const result = [];
        let parent = 0; // ROOT_ID
        for (let i = 0; i < bytes.length; i++) {
            const child = base[parent] + bytes[i];
            if (child < 0 || child >= check.length || check[child] !== parent) break;
            parent = child;
            const term = base[child]; // TERM_CODE = 0
            if (term >= 0 && term < check.length && check[term] === child) {
                const v = base[term];
                if (v <= 0) {
                    result.push({ v: -v - 1, k: textDecoder.decode(bytes.subarray(0, i + 1)) });
                }
            }
        }
        return result;
    }

    _splitByPunctuation(input) {
        const sentences = [];
        let tail = input;
        while (tail.length > 0) {
            const idx = tail.search(/、|。/);
            if (idx < 0) {
                sentences.push(tail);
                break;
            }
            sentences.push(tail.slice(0, idx + 1));
            tail = tail.slice(idx + 1);
        }
        return sentences;
    }

    tokenize(text) {
        if (!text) return [];
        const sentences = this._splitByPunctuation(text);
        const tokens = [];
        for (let i = 0; i < sentences.length; i++) {
            this._tokenizeSentence(sentences[i], tokens);
        }
        return tokens;
    }

    _tokenizeSentence(sentence, outTokens) {
        const chars = Array.from(sentence);
        const len = chars.length;
        if (len === 0) return;

        // Build UTF-16 start offsets for fast slicing
        const utf16Offsets = new Int32Array(len + 1);
        let u16 = 0;
        for (let i = 0; i < len; i++) {
            utf16Offsets[i] = u16;
            u16 += chars[i].length;
        }
        utf16Offsets[len] = u16;

        const nodesEndAt = new Array(len + 2);
        nodesEndAt[0] = [{ name: -1, cost: 0, startPos: 0, length: 0, type: 0, leftId: 0, rightId: 0, surface: '', shortestCost: 0, prev: null }];
        let eosPos = 1;

        const appendNode = (node) => {
            const lastPos = node.startPos + node.length - 1;
            if (eosPos < lastPos) eosPos = lastPos;
            let bucket = nodesEndAt[lastPos];
            if (!bucket) {
                bucket = [];
                nodesEndAt[lastPos] = bucket;
            }
            bucket.push(node);
        };

        const tidView = this.tidView;
        const tidMapOffsets = this.tidMapOffsets;
        const tidMapValues = this.tidMapValues;
        const unkView = this.unkView;
        const unkMapOffsets = this.unkMapOffsets;
        const unkMapValues = this.unkMapValues;

        for (let pos = 0; pos < len; pos++) {
            const tail = sentence.slice(utf16Offsets[pos]);
            const matches = this._commonPrefixSearch(tail);
            for (let m = 0; m < matches.length; m++) {
                const { v: trieId, k: surface } = matches[m];
                const startIdx = tidMapOffsets[trieId];
                const endIdx = tidMapOffsets[trieId + 1];
                const surfaceCodePoints = surface.length; // matches kuromoji's key.length for BMP
                for (let idx = startIdx; idx < endIdx; idx++) {
                    const tidId = tidMapValues[idx];
                    appendNode({
                        name: tidId,
                        cost: tidView.getInt16(tidId + 4, true),
                        startPos: pos + 1,
                        length: surfaceCodePoints,
                        type: 1, // KNOWN
                        leftId: tidView.getInt16(tidId, true),
                        rightId: tidView.getInt16(tidId + 2, true),
                        surface,
                        shortestCost: Number.MAX_VALUE,
                        prev: null
                    });
                }
            }

            const headChar = chars[pos];
            const headClass = this._lookupCharClass(headChar);
            if (matches.length === 0 || headClass.isAlwaysInvoke === 1) {
                let key = headChar;
                if (headClass.isGrouping === 1 && pos + 1 < len) {
                    for (let k = pos + 1; k < len; k++) {
                        const nextClass = this._lookupCharClass(chars[k]);
                        if (headClass.className !== nextClass.className) break;
                        key += chars[k];
                    }
                }
                const startIdx = unkMapOffsets[headClass.classId];
                const endIdx = unkMapOffsets[headClass.classId + 1];
                for (let idx = startIdx; idx < endIdx; idx++) {
                    const unkId = unkMapValues[idx];
                    appendNode({
                        name: unkId,
                        cost: unkView.getInt16(unkId + 4, true),
                        startPos: pos + 1,
                        length: key.length,
                        type: 2, // UNKNOWN
                        leftId: unkView.getInt16(unkId, true),
                        rightId: unkView.getInt16(unkId + 2, true),
                        surface: key,
                        shortestCost: Number.MAX_VALUE,
                        prev: null
                    });
                }
            }
        }

        eosPos++;
        const eosIndex = nodesEndAt.length - 1;
        // Match Kuromoji ViterbiLattice.appendEos: appends at end of nodes_end_at
        let actualEosIdx = 1;
        for (let i = 1; i < nodesEndAt.length; i++) {
            if (nodesEndAt[i]) actualEosIdx = i + 1;
        }
        const eosNode = { name: -1, cost: 0, startPos: eosPos, length: 0, type: 3, leftId: 0, rightId: 0, surface: '', shortestCost: Number.MAX_VALUE, prev: null };
        nodesEndAt[Math.max(actualEosIdx, eosIndex)] = [eosNode];
        const maxForwardPos = Math.max(eosPos, actualEosIdx, eosIndex);

        // Forward Viterbi pass
        const cc = this.cc;
        const backDim = this.ccBackDim;
        for (let i = 1; i <= maxForwardPos; i++) {
            const nodes = nodesEndAt[i];
            if (!nodes) continue;
            for (let j = 0; j < nodes.length; j++) {
                const node = nodes[j];
                const prevNodes = nodesEndAt[node.startPos - 1];
                if (!prevNodes) continue;
                let bestCost = Number.MAX_VALUE;
                let bestPrev = null;
                for (let k = 0; k < prevNodes.length; k++) {
                    const prev = prevNodes[k];
                    const edgeCost = cc[prev.rightId * backDim + node.leftId + 2];
                    const total = prev.shortestCost + edgeCost + node.cost;
                    if (total < bestCost) {
                        bestCost = total;
                        bestPrev = prev;
                    }
                }
                node.prev = bestPrev;
                node.shortestCost = bestCost;
            }
        }

        // Backward Viterbi pass
        const path = [];
        let back = eosNode.prev;
        while (back && back.type !== 0) {
            path.push(back);
            back = back.prev;
        }
        path.reverse();

        for (let i = 0; i < path.length; i++) {
            const node = path[i];
            if (node.type === 1) {
                const posId = tidView.getUint32(node.name + 6, true);
                const packed = readCString(this.tidPos, posId);
                const tab1 = packed.indexOf('\t');
                let pos = packed;
                let basic = '';
                let reading = '';
                if (tab1 !== -1) {
                    pos = packed.slice(0, tab1);
                    const tab2 = packed.indexOf('\t', tab1 + 1);
                    if (tab2 !== -1) {
                        basic = packed.slice(tab1 + 1, tab2);
                        reading = packed.slice(tab2 + 1);
                    } else {
                        basic = packed.slice(tab1 + 1);
                    }
                }
                outTokens.push({
                    surface_form: node.surface,
                    pos: pos || '*',
                    basic_form: basic || node.surface,
                    reading: reading || undefined
                });
            } else {
                const posId = unkView.getUint32(node.name + 6, true);
                const pos = readCString(this.unkPos, posId);
                outTokens.push({
                    surface_form: node.surface,
                    pos: pos || '*',
                    basic_form: '*',
                    reading: undefined
                });
            }
        }
    }
}

async function gunzipArrayBuffer(rawBuffer) {
    const bytes = new Uint8Array(rawBuffer);
    if (bytes.length >= 2 && bytes[0] === 0x1f && bytes[1] === 0x8b) {
        if (globalThis.process?.getBuiltinModule) {
            try {
                const zlib = globalThis.process.getBuiltinModule('node:zlib');
                const out = zlib.gunzipSync(bytes);
                return out.buffer.slice(out.byteOffset, out.byteOffset + out.byteLength);
            } catch {
                // Fall through to DecompressionStream
            }
        }
        const stream = new globalThis.Blob([bytes]).stream().pipeThrough(new globalThis.DecompressionStream('gzip'));
        return await new Response(stream).arrayBuffer();
    }
    return rawBuffer;
}

async function readLocalBinaryInNode() {
    try {
        const fs = globalThis.process?.getBuiltinModule?.('node:fs/promises');
        const path = globalThis.process?.getBuiltinModule?.('node:path');
        if (!fs || !path || typeof globalThis.process?.cwd !== 'function') return null;
        const candidates = [
            path.join(globalThis.process.cwd(), 'public/data/ipadic-compact.bin.gz'),
            path.join(globalThis.process.cwd(), 'dist/lingua-tube/browser/data/ipadic-compact.bin.gz')
        ];
        for (const candidate of candidates) {
            try {
                const buf = await fs.readFile(candidate);
                if (buf?.byteLength) {
                    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
                }
            } catch { /* try next candidate */ }
        }
    } catch { /* not in Node */ }
    return null;
}

async function fetchCompactBinary({ assets, requestUrl } = {}) {
    if (assets && typeof assets.fetch === 'function') {
        try {
            const res = await assets.fetch(new Request(`https://assets.local${ASSET_PATH}`));
            if (res.ok) return await res.arrayBuffer();
        } catch { /* try next source */ }
    }

    if (requestUrl && /^https?:\/\//i.test(requestUrl)) {
        try {
            const res = await fetch(new URL(ASSET_PATH, requestUrl), {
                signal: AbortSignal.timeout(15000)
            });
            if (res.ok) return await res.arrayBuffer();
        } catch { /* try next source */ }
    }

    // Fallback to production Pages asset URL when called from background/webhook without assets binding
    const res = await fetch(`https://voca.study${ASSET_PATH}`, {
        signal: AbortSignal.timeout(15000)
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch compact IPADIC dictionary: HTTP ${res.status}`);
    }
    return await res.arrayBuffer();
}

export async function getCompactKuromojiTokenizer(options = {}) {
    const state = getGlobalState();
    if (state.instance) return state.instance;
    if (!state.promise) {
        state.promise = (async () => {
            const raw = (await readLocalBinaryInNode()) ?? (await fetchCompactBinary(options));
            const buffer = await gunzipArrayBuffer(raw);
            const instance = new CompactKuromojiTokenizer(buffer);
            state.instance = instance;
            state.ready = true;
            return instance;
        })().catch((err) => {
            console.error('[Tokenizer] Compact IPADIC init failed:', err?.message || err);
            state.promise = null;
            state.ready = false;
            state.instance = null;
            throw err;
        });
    }
    return state.promise;
}

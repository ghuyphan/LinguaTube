#!/usr/bin/env node
/**
 * Builds public/data/ipadic-compact.bin.gz from node_modules/@patdx/kuromoji/dict/*.dat.gz.
 *
 * Cuts Worker isolate RAM from ~201 MB peak (~187 MB steady-state) down to ~34 MB by:
 * - Stripping ~33.9 MB of trailing zero padding from tid.dat / tid_pos.dat / unk*.dat
 * - Keeping only the 3 IPADIC feature columns Voca uses (pos, basic_form, reading)
 * - Packing tid_map / unk_map as flat CSR Int32Arrays instead of a 325k-key JS object (~71.5 MB)
 * - Packing all sections into one 4-byte-aligned binary for zero-copy typed-array views
 */

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DICT_DIR = path.join(ROOT, 'node_modules/@patdx/kuromoji/dict');
const OUT_PATH = path.join(ROOT, 'public/data/ipadic-compact.bin.gz');

const MAGIC = 0x50494b56; // 'VKIP'
const VERSION = 1;

function readDictGz(name) {
    return zlib.gunzipSync(fs.readFileSync(path.join(DICT_DIR, name)));
}

function readCString(buf, offset) {
    let end = offset;
    while (end < buf.length && buf[end] !== 0) end++;
    return buf.subarray(offset, end).toString('utf8');
}

function parseTargetMap(buf) {
    let pos = 0;
    const readInt = () => {
        const v = buf.readUInt32LE(pos);
        pos += 4;
        return v;
    };
    readInt(); // key count
    const pairs = [];
    let maxKey = -1;
    let totalVals = 0;
    while (pos + 8 <= buf.length) {
        const key = readInt();
        const len = readInt();
        if (pos + len * 4 > buf.length) break;
        const vals = new Int32Array(len);
        for (let i = 0; i < len; i++) vals[i] = buf.readInt32LE(pos + i * 4);
        pos += len * 4;
        if (key > maxKey) maxKey = key;
        totalVals += len;
        pairs.push([key, vals]);
    }
    const counts = new Int32Array(maxKey + 1);
    for (const [k, vals] of pairs) counts[k] += vals.length;
    const offsets = new Int32Array(maxKey + 2);
    for (let k = 0; k <= maxKey; k++) offsets[k + 1] = offsets[k] + counts[k];
    const cursor = offsets.slice(0, maxKey + 1);
    const values = new Int32Array(totalVals);
    for (const [k, vals] of pairs) {
        values.set(vals, cursor[k]);
        cursor[k] += vals.length;
    }
    return {
        offsets: Buffer.from(offsets.buffer, offsets.byteOffset, offsets.byteLength),
        values: Buffer.from(values.buffer, values.byteOffset, values.byteLength),
        maxKey,
        totalVals
    };
}

function compactTid(rawTid, rawPos, mapValuesBuf, keepBasicAndReading) {
    const mapValues = new Int32Array(
        mapValuesBuf.buffer,
        mapValuesBuf.byteOffset,
        mapValuesBuf.byteLength / 4
    );
    let maxTidOffset = 0;
    for (let i = 0; i < mapValues.length; i++) {
        if (mapValues[i] > maxTidOffset) maxTidOffset = mapValues[i];
    }
    const entryCount = Math.floor(maxTidOffset / 10) + 1;
    const trimmedTid = Buffer.allocUnsafe(entryCount * 10);
    rawTid.copy(trimmedTid, 0, 0, entryCount * 10);

    const posChunks = [];
    const posDedup = new Map();
    let posOffset = 0;

    for (let i = 0; i < entryCount; i++) {
        const off = i * 10;
        const oldPosId = rawTid.readUInt32LE(off + 6);
        const line = readCString(rawPos, oldPosId);
        let compactStr = '';
        if (line) {
            const cols = line.split(',');
            const surface = cols[0] || '';
            const pos = cols[1] && cols[1] !== '*' ? cols[1] : '';
            if (keepBasicAndReading) {
                const basic = cols[7] && cols[7] !== '*' && cols[7] !== surface ? cols[7] : '';
                const reading = cols[8] && cols[8] !== '*' ? cols[8] : '';
                compactStr = reading
                    ? `${pos}\t${basic}\t${reading}`
                    : basic
                        ? `${pos}\t${basic}`
                        : pos;
            } else {
                compactStr = pos;
            }
        }
        let newPosId = posDedup.get(compactStr);
        if (newPosId === undefined) {
            newPosId = posOffset;
            const encoded = Buffer.from(`${compactStr}\0`, 'utf8');
            posChunks.push(encoded);
            posOffset += encoded.length;
            posDedup.set(compactStr, newPosId);
        }
        trimmedTid.writeUInt32LE(newPosId, off + 6);
    }

    return {
        tid: trimmedTid,
        pos: Buffer.concat(posChunks, posOffset),
        entryCount,
        uniquePos: posDedup.size
    };
}

function align4(n) {
    return (n + 3) & ~3;
}

function build() {
    if (!fs.existsSync(DICT_DIR)) {
        console.error(`[build-compact-ipadic] Missing dictionary dir: ${DICT_DIR}`);
        process.exit(1);
    }

    const base = readDictGz('base.dat.gz');
    const check = readDictGz('check.dat.gz');
    const cc = readDictGz('cc.dat.gz');
    const rawTid = readDictGz('tid.dat.gz');
    const rawTidPos = readDictGz('tid_pos.dat.gz');
    const rawTidMap = readDictGz('tid_map.dat.gz');
    const rawUnk = readDictGz('unk.dat.gz');
    const rawUnkPos = readDictGz('unk_pos.dat.gz');
    const rawUnkMap = readDictGz('unk_map.dat.gz');
    const unkChar = readDictGz('unk_char.dat.gz');
    const unkInvoke = readDictGz('unk_invoke.dat.gz');

    const tidMap = parseTargetMap(rawTidMap);
    const unkMap = parseTargetMap(rawUnkMap);
    const tid = compactTid(rawTid, rawTidPos, tidMap.values, true);
    const unk = compactTid(rawUnk, rawUnkPos, unkMap.values, false);

    const sections = [
        base,            // 0: Int32Array
        check,           // 1: Int32Array
        cc,              // 2: Int16Array
        tid.tid,         // 3: Uint8Array
        tid.pos,         // 4: Uint8Array
        tidMap.offsets,  // 5: Int32Array
        tidMap.values,   // 6: Int32Array
        unk.tid,         // 7: Uint8Array
        unk.pos,         // 8: Uint8Array
        unkMap.offsets,  // 9: Int32Array
        unkMap.values,   // 10: Int32Array
        unkChar,         // 11: Uint8Array
        unkInvoke        // 12: Uint8Array
    ];

    const headerSize = 16 + sections.length * 8;
    let totalSize = align4(headerSize);
    const offsets = [];
    for (const sec of sections) {
        offsets.push(totalSize);
        totalSize = align4(totalSize + sec.length);
    }

    const out = Buffer.alloc(totalSize);
    out.writeUInt32LE(MAGIC, 0);
    out.writeUInt32LE(VERSION, 4);
    out.writeUInt32LE(sections.length, 8);
    out.writeUInt32LE(0, 12);
    for (let i = 0; i < sections.length; i++) {
        out.writeUInt32LE(offsets[i], 16 + i * 8);
        out.writeUInt32LE(sections[i].length, 16 + i * 8 + 4);
        sections[i].copy(out, offsets[i]);
    }

    const gz = zlib.gzipSync(out, { level: 9 });
    fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
    fs.writeFileSync(OUT_PATH, gz);

    console.log(
        `[build-compact-ipadic] Built ${path.relative(ROOT, OUT_PATH)}: ` +
        `${(gz.length / 1048576).toFixed(2)} MB gz (${(out.length / 1048576).toFixed(2)} MB raw) ` +
        `[entries=${tid.entryCount}, uniqueFeatures=${tid.uniquePos}, tidPos=${(tid.pos.length / 1048576).toFixed(2)} MB]`
    );
}

build();

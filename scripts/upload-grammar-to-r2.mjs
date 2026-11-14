/**
 * Upload canonical grammar JSON packs from public/data/grammar/ to Cloudflare R2
 * under `grammar/` (bucket: linguatube-transcripts).
 *
 * When present in R2, `/api/grammar` prioritizes R2 over static Pages ASSETS,
 * enabling live grammar updates for both Web and Flutter without app releases.
 *
 * Usage:
 *   node scripts/build-grammar-json.mjs
 *   node scripts/upload-grammar-to-r2.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = process.cwd();
const GRAMMAR_DIR = path.join(ROOT, 'public', 'data', 'grammar');
const BUCKET = process.env.R2_BUCKET || 'linguatube-transcripts';

function walkJsonFiles(dir, base = dir) {
    const results = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...walkJsonFiles(full, base));
        } else if (entry.name.endsWith('.json')) {
            results.push({ full, rel: path.relative(base, full).replace(/\\/g, '/') });
        }
    }
    return results;
}

function main() {
    if (!fs.existsSync(GRAMMAR_DIR)) {
        throw new Error(`Missing ${GRAMMAR_DIR}. Run "npm run build:grammar" first.`);
    }
    const files = walkJsonFiles(GRAMMAR_DIR);
    console.log(`[upload-grammar-to-r2] Uploading ${files.length} grammar JSON files to r2://${BUCKET}/grammar/...`);
    for (const { full, rel } of files) {
        const key = `${BUCKET}/grammar/${rel}`;
        execFileSync('npx', ['wrangler', 'r2', 'object', 'put', key, `--file=${full}`, '--content-type=application/json', '--remote'], {
            stdio: 'inherit'
        });
    }
    console.log(`[upload-grammar-to-r2] Uploaded ${files.length} files.`);
}

main();

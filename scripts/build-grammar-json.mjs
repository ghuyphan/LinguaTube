/**
 * Build canonical minified JSON grammar assets in public/data/grammar/
 * for shared consumption by Cloudflare Pages /api/grammar, R2, Web, and Flutter.
 *
 * Usage: node scripts/build-grammar-json.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const ROOT = process.cwd();
const SRC_DATA_DIR = path.join(ROOT, 'src', 'app', 'data');
const OUT_DIR = path.join(ROOT, 'public', 'data', 'grammar');

const LEARNING_LANGS = ['ja', 'zh', 'ko', 'en', 'vi'];
const UI_LANGS = ['vi', 'ja', 'ko', 'zh'];

function loadTsExport(filePath, exportName) {
    const source = fs.readFileSync(filePath, 'utf8');
    const { outputText } = ts.transpileModule(source, {
        compilerOptions: {
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ES2022
        }
    });
    const mod = { exports: {} };
    const fn = new Function('exports', 'module', outputText);
    fn(mod.exports, mod);
    return mod.exports[exportName];
}

function writeMinifiedJson(filePath, data) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data));
}

function main() {
    const patternsManifest = {};
    const translationsManifest = {};

    for (const lang of LEARNING_LANGS) {
        const exportName = `GRAMMAR_${lang.toUpperCase()}`;
        const tsFile = path.join(SRC_DATA_DIR, `grammar-${lang}.ts`);
        const patterns = loadTsExport(tsFile, exportName);
        if (!Array.isArray(patterns)) {
            throw new Error(`Invalid pattern export ${exportName} in ${tsFile}`);
        }

        const outFile = path.join(OUT_DIR, 'patterns', `${lang}.json`);
        writeMinifiedJson(outFile, patterns);
        patternsManifest[lang] = patterns.length;
        translationsManifest[lang] = [];

        for (const ui of UI_LANGS) {
            const transFile = path.join(SRC_DATA_DIR, 'translations', lang, `${ui}.ts`);
            if (!fs.existsSync(transFile)) continue;
            const transExport = `GRAMMAR_${lang.toUpperCase()}_${ui.toUpperCase()}`;
            const pack = loadTsExport(transFile, transExport);
            if (!pack || typeof pack !== 'object') {
                throw new Error(`Invalid translation export ${transExport} in ${transFile}`);
            }

            const outTransFile = path.join(OUT_DIR, 'translations', lang, `${ui}.json`);
            writeMinifiedJson(outTransFile, pack);
            translationsManifest[lang].push(ui);
        }
    }

    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
    const manifest = {
        version: pkg.version || '1.0.0',
        generatedAt: new Date().toISOString(),
        languages: LEARNING_LANGS,
        uiLanguages: ['en', ...UI_LANGS],
        patterns: patternsManifest,
        translations: translationsManifest
    };
    writeMinifiedJson(path.join(OUT_DIR, 'manifest.json'), manifest);

    const totalPatterns = Object.values(patternsManifest).reduce((sum, n) => sum + n, 0);
    console.log(`[build-grammar-json] Wrote ${totalPatterns} patterns across ${LEARNING_LANGS.length} languages to ${path.relative(ROOT, OUT_DIR)}/`);
}

main();

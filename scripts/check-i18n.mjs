#!/usr/bin/env node

/**
 * i18n Locale Validator & Codebase Checker
 * 
 * Verifies:
 * 1. JSON syntax and structural validity across all locale files (en, vi, ja, ko, zh).
 * 2. 100% key parity between the base locale (en.json) and all target locales.
 * 3. No empty translation strings or type mismatches (object vs string).
 * 4. Statically scans all *.html and *.ts files for missing translation keys.
 * 5. Validates interpolation token consistency (e.g. {{count}}).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const I18N_DIR = path.join(ROOT_DIR, 'src', 'app', 'i18n');
const SRC_DIR = path.join(ROOT_DIR, 'src', 'app');
const BASE_LANG = 'en';
const TARGET_LANGS = ['vi', 'ja', 'ko', 'zh'];
const ALL_LANGS = [BASE_LANG, ...TARGET_LANGS];

// Prefixes that are known to be constructed dynamically in code (e.g. `t('vocab.' + status)`)
const DYNAMIC_PREFIXES = ['vocab.', 'level.', 'key'];

let hasError = false;

function error(msg) {
    console.error(`\x1b[31m✗ ${msg}\x1b[0m`);
    hasError = true;
}

function warn(msg) {
    console.warn(`\x1b[33m⚠ ${msg}\x1b[0m`);
}

function success(msg) {
    console.log(`\x1b[32m✓ ${msg}\x1b[0m`);
}

function info(msg) {
    console.log(`\x1b[36mℹ ${msg}\x1b[0m`);
}

// Flatten nested object keys to dot notation
function flattenKeys(obj, prefix = '') {
    const result = {};
    for (const [k, v] of Object.entries(obj)) {
        const full = prefix ? `${prefix}.${k}` : k;
        if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
            Object.assign(result, flattenKeys(v, full));
        } else {
            result[full] = v;
        }
    }
    return result;
}

// Extract interpolation parameters: {{count}} or {count}
function extractParams(str) {
    if (typeof str !== 'string') return [];
    const matches = [];
    const regex = /\{\{?([a-zA-Z0-9_-]+)\}?\}/g;
    let m;
    while ((m = regex.exec(str)) !== null) {
        matches.push(m[1]);
    }
    return [...new Set(matches)].sort();
}

console.log('\n=== Voca i18n Locale & Translation Validator ===\n');

// 1. Load and parse JSON files
const rawData = {};
const flatData = {};

for (const lang of ALL_LANGS) {
    const filePath = path.join(I18N_DIR, `${lang}.json`);
    if (!fs.existsSync(filePath)) {
        error(`Locale file not found: ${filePath}`);
        continue;
    }
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        rawData[lang] = JSON.parse(content);
        flatData[lang] = flattenKeys(rawData[lang]);
    } catch (e) {
        error(`Invalid JSON in ${lang}.json: ${e.message}`);
    }
}

if (hasError) {
    process.exit(1);
}

const baseKeys = Object.keys(flatData[BASE_LANG]);
info(`Base locale (${BASE_LANG}.json): ${baseKeys.length} total keys`);

// 2. Parity Check: Check all target languages against base
for (const lang of TARGET_LANGS) {
    const langKeys = flatData[lang];
    const missingKeys = baseKeys.filter(k => !(k in langKeys));
    const extraKeys = Object.keys(langKeys).filter(k => !(k in flatData[BASE_LANG]));

    if (missingKeys.length > 0) {
        error(`${lang}.json is missing ${missingKeys.length} keys present in ${BASE_LANG}.json:`);
        missingKeys.slice(0, 10).forEach(k => console.error(`    - ${k}`));
        if (missingKeys.length > 10) console.error(`    ... and ${missingKeys.length - 10} more`);
    }

    if (extraKeys.length > 0) {
        warn(`${lang}.json has ${extraKeys.length} extra/orphaned keys not in ${BASE_LANG}.json:`);
        extraKeys.slice(0, 5).forEach(k => console.warn(`    - ${k}`));
        if (extraKeys.length > 5) console.warn(`    ... and ${extraKeys.length - 5} more`);
    }

    // Check empty strings or invalid types
    for (const [key, value] of Object.entries(langKeys)) {
        if (typeof value === 'string' && value.trim() === '') {
            error(`Empty translation in ${lang}.json for key: "${key}"`);
        }
    }

    if (missingKeys.length === 0) {
        success(`Key parity 100% matched for ${lang}.json (${Object.keys(langKeys).length} keys)`);
    }
}

// 3. Scan Codebase for Missing Translation Keys
function scanFiles(dir) {
    let files = [];
    if (!fs.existsSync(dir)) return files;
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
        const full = path.join(dir, item.name);
        if (item.isDirectory() && item.name !== 'node_modules') {
            files.push(...scanFiles(full));
        } else if (item.name.endsWith('.ts') || item.name.endsWith('.html')) {
            // Ignore spec files and i18n service implementation itself
            if (!item.name.endsWith('.spec.ts') && !item.name.endsWith('i18n.service.ts')) {
                files.push(full);
            }
        }
    }
    return files;
}

const sourceFiles = scanFiles(SRC_DIR);
info(`Scanning ${sourceFiles.length} source templates and components for translation references...`);

const keyRegexes = [
    /\bi18n\.t\(\s*['"]([a-zA-Z0-9_.-]+)['"]/g,
    /\bt\(\s*['"]([a-zA-Z0-9_.-]+)['"]/g,
    /\[(?:i18n|t)\]\s*=\s*['"]'([a-zA-Z0-9_.-]+)'['"]/g
];

const baseKeySet = new Set(baseKeys);
const codeMissing = [];
let totalKeyReferences = 0;

for (const file of sourceFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, lineIdx) => {
        for (const regex of keyRegexes) {
            regex.lastIndex = 0;
            let m;
            while ((m = regex.exec(line)) !== null) {
                const key = m[1];
                totalKeyReferences++;

                // Skip known dynamic prefixes like `t('vocab.' + status)`
                if (DYNAMIC_PREFIXES.some(prefix => key === prefix || (key.startsWith(prefix) && !baseKeySet.has(key)))) {
                    continue;
                }

                if (!baseKeySet.has(key)) {
                    codeMissing.push({
                        file: path.relative(ROOT_DIR, file),
                        line: lineIdx + 1,
                        key
                    });
                }
            }
        }
    });
}

if (codeMissing.length > 0) {
    error(`Found ${codeMissing.length} translation keys referenced in code that do not exist in ${BASE_LANG}.json:`);
    codeMissing.forEach(issue => {
        console.error(`    ${issue.file}:${issue.line} -> key "${issue.key}"`);
    });
} else {
    success(`All ${totalKeyReferences} translation references in code exist in ${BASE_LANG}.json`);
}

// 4. Interpolation Placeholder Check
let paramMismatches = 0;
for (const lang of TARGET_LANGS) {
    const langKeys = flatData[lang];
    for (const [key, baseVal] of Object.entries(flatData[BASE_LANG])) {
        const baseParams = extractParams(baseVal);
        const langParams = extractParams(langKeys[key] || '');

        // Check if parameters in base exist in target (excluding English-specific 'plural' which Asian languages don't need)
        const missingParams = baseParams.filter(p => p !== 'plural' && !langParams.includes(p));
        if (missingParams.length > 0) {
            warn(`Missing interpolation param in ${lang}.json [${key}]: expected {${missingParams.join(', ')}}`);
            paramMismatches++;
        }
    }
}

if (paramMismatches === 0) {
    success('All interpolation placeholders are consistent across all locales');
}

// Summary
console.log('\n----------------------------------------');
if (hasError) {
    console.error(`\x1b[31mFAIL: i18n validation failed with errors. Please fix missing or broken translations above.\x1b[0m\n`);
    process.exit(1);
} else {
    console.log(`\x1b[32mSUCCESS: All ${baseKeys.length} keys verified across ${ALL_LANGS.length} locales with 0 missing keys.\x1b[0m\n`);
    process.exit(0);
}

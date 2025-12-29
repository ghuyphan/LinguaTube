/**
 * Grammar Data Transformation Script
 * 
 * Fetches grammar data from open-source repositories and transforms
 * it into TypeScript files for the LinguaTube app.
 * 
 * Sources:
 * - Japanese/Korean: https://github.com/tristcoil/hanabira.org-japanese-content
 * - Chinese: https://github.com/openlanguageprofiles/olp-zh-zerotohero
 * 
 * Run: node scripts/transform-grammar-data.js
 */

const fs = require('fs');
const path = require('path');

const HANABIRA_BASE = 'https://raw.githubusercontent.com/tristcoil/hanabira.org-japanese-content/main';
const ZEROTOHERO_BASE = 'https://raw.githubusercontent.com/openlanguageprofiles/olp-zh-zerotohero/master';

const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'app', 'data');

// Japanese JLPT levels
const JA_FILES = [
    { file: 'grammar_json/grammar_ja_N5_full_alphabetical_0001.json', level: 'JLPT N5' },
    { file: 'grammar_json/grammar_ja_N4_full_alphabetical_0001.json', level: 'JLPT N4' },
    { file: 'grammar_json/grammar_ja_N3_full_alphabetical_0001.json', level: 'JLPT N3' },
    { file: 'grammar_json/grammar_ja_N2_full_alphabetical_0001.json', level: 'JLPT N2' },
    { file: 'grammar_json/grammar_ja_N1_full_alphabetical_0001.json', level: 'JLPT N1' },
];

// Korean levels
const KO_FILES = [
    { file: 'grammar_json_korean/grammar_kr_KOREAN_1_0001.json', level: 'Korean 1' },
    { file: 'grammar_json_korean/grammar_kr_KOREAN_2_0001.json', level: 'Korean 2' },
    { file: 'grammar_json_korean/grammar_kr_KOREAN_3_0001.json', level: 'Korean 3' },
    { file: 'grammar_json_korean/grammar_kr_KOREAN_4_0001.json', level: 'Korean 4' },
    { file: 'grammar_json_korean/grammar_kr_KOREAN_5_0001.json', level: 'Korean 5' },
    { file: 'grammar_json_korean/grammar_kr_KOREAN_6_0001.json', level: 'Korean 6' },
];

// Chinese grammar CSV
const ZH_FILE = 'zerotohero-zh-grammar.csv';

/**
 * Extract pattern from title (e.g., "ている (Progressive)" -> "ている")
 */
function extractPattern(title) {
    // Try to extract Japanese/Korean text before parentheses or English
    const match = title.match(/^([^\s(]+)/);
    return match ? match[1].trim() : title;
}

/**
 * Generate unique ID from pattern
 */
function generateId(lang, pattern, index) {
    const cleanPattern = pattern.replace(/[^a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\uAC00-\uD7AF]/g, '');
    return `${lang}_${cleanPattern}_${index}`;
}

/**
 * Transform hanabira.org JSON data to GrammarPattern format
 */
function transformHanabiraData(data, language, level) {
    return data.map((item, index) => {
        const pattern = extractPattern(item.title);

        const examples = (item.examples || []).map(ex => ({
            sentence: ex.jp || ex.kr || '',
            romanization: ex.romaji || undefined,
            translation: ex.en || '',
        }));

        return {
            id: generateId(language, pattern, index),
            language,
            pattern,
            title: item.title,
            shortExplanation: item.short_explanation || '',
            longExplanation: item.long_explanation || '',
            formation: item.formation || '',
            level,
            examples,
        };
    });
}

/**
 * Parse CSV line handling quoted fields
 */
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());

    return result;
}

/**
 * Map lesson code to HSK level
 */
function codeToHSKLevel(code) {
    if (!code) return 'HSK 1';
    const levelMatch = code.match(/^(\d+)\./);
    if (levelMatch) {
        const level = parseInt(levelMatch[1]);
        return `HSK ${Math.min(level, 6)}`;
    }
    return 'HSK 1';
}

/**
 * Transform zerotohero CSV data to GrammarPattern format
 */
function transformZeroToHeroData(csvContent) {
    const lines = csvContent.split('\n').filter(l => l.trim());
    const headers = parseCSVLine(lines[0]);

    const patterns = [];

    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length < 5) continue;

        const row = {};
        headers.forEach((h, idx) => {
            row[h] = values[idx] || '';
        });

        const pattern = row['Structure'] || '';
        if (!pattern) continue;

        const level = codeToHSKLevel(row['Code']);

        patterns.push({
            id: generateId('zh', pattern, i),
            language: 'zh',
            pattern,
            title: `${pattern} (${row['English Equivalent'] || ''})`.trim(),
            shortExplanation: row['English Equivalent'] || '',
            longExplanation: `${row['English Equivalent']}. ${row['Pinyin'] ? 'Pinyin: ' + row['Pinyin'] : ''}`.trim(),
            formation: row['Pinyin'] || '',
            level,
            examples: row['Example'] ? [{
                sentence: row['Example'],
                romanization: row['Example Pinyin'] || undefined,
                translation: row['Example Translation'] || '',
            }] : [],
        });
    }

    return patterns;
}

/**
 * Generate TypeScript file content
 */
function generateTSFile(patterns, varName, language) {
    const imports = `import { GrammarPattern } from '../models/grammar.model';\n\n`;

    const attribution = language === 'zh'
        ? '// Data source: Chinese Zero to Hero (CC0 Public Domain)\n// https://github.com/openlanguageprofiles/olp-zh-zerotohero\n\n'
        : '// Data source: hanabira.org (CC License - Attribution Required)\n// https://github.com/tristcoil/hanabira.org-japanese-content\n// Please include attribution link to https://hanabira.org\n\n';

    const json = JSON.stringify(patterns, null, 2)
        .replace(/"([^"]+)":/g, '$1:') // Remove quotes from keys
        .replace(/: "([^"]*)"/g, ': \'$1\'') // Use single quotes for strings
        .replace(/'/g, (match, offset, string) => {
            // Escape single quotes inside strings, but not the wrapping ones
            const before = string.slice(0, offset);
            const inString = (before.match(/: '/g) || []).length > (before.match(/'/g) || []).length / 2;
            return match;
        });

    return `${imports}${attribution}export const ${varName}: GrammarPattern[] = ${JSON.stringify(patterns, null, 2)};\n`;
}

/**
 * Fetch JSON data from URL
 */
async function fetchJSON(url) {
    console.log(`Fetching: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status}`);
    }
    return response.json();
}

/**
 * Fetch text data from URL
 */
async function fetchText(url) {
    console.log(`Fetching: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status}`);
    }
    return response.text();
}

/**
 * Main execution
 */
async function main() {
    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    console.log('=== Grammar Data Transformation ===\n');

    // Process Japanese
    console.log('Processing Japanese grammar...');
    let jaPatterns = [];
    for (const { file, level } of JA_FILES) {
        try {
            const data = await fetchJSON(`${HANABIRA_BASE}/${file}`);
            const patterns = transformHanabiraData(data, 'ja', level);
            jaPatterns = jaPatterns.concat(patterns);
            console.log(`  ${level}: ${patterns.length} patterns`);
        } catch (error) {
            console.error(`  Error fetching ${file}:`, error.message);
        }
    }

    const jaFile = path.join(OUTPUT_DIR, 'grammar-ja.ts');
    fs.writeFileSync(jaFile, generateTSFile(jaPatterns, 'GRAMMAR_JA', 'ja'));
    console.log(`Wrote ${jaPatterns.length} Japanese patterns to ${jaFile}\n`);

    // Process Korean
    console.log('Processing Korean grammar...');
    let koPatterns = [];
    for (const { file, level } of KO_FILES) {
        try {
            const data = await fetchJSON(`${HANABIRA_BASE}/${file}`);
            const patterns = transformHanabiraData(data, 'ko', level);
            koPatterns = koPatterns.concat(patterns);
            console.log(`  ${level}: ${patterns.length} patterns`);
        } catch (error) {
            console.error(`  Error fetching ${file}:`, error.message);
        }
    }

    const koFile = path.join(OUTPUT_DIR, 'grammar-ko.ts');
    fs.writeFileSync(koFile, generateTSFile(koPatterns, 'GRAMMAR_KO', 'ko'));
    console.log(`Wrote ${koPatterns.length} Korean patterns to ${koFile}\n`);

    // Process Chinese
    console.log('Processing Chinese grammar...');
    try {
        const csvContent = await fetchText(`${ZEROTOHERO_BASE}/${ZH_FILE}`);
        const zhPatterns = transformZeroToHeroData(csvContent);

        const zhFile = path.join(OUTPUT_DIR, 'grammar-zh.ts');
        fs.writeFileSync(zhFile, generateTSFile(zhPatterns, 'GRAMMAR_ZH', 'zh'));
        console.log(`Wrote ${zhPatterns.length} Chinese patterns to ${zhFile}\n`);
    } catch (error) {
        console.error('Error processing Chinese grammar:', error.message);
    }

    // Create index file
    const indexContent = `// Grammar pattern data exports
// See implementation_plan.md for attribution details

export { GRAMMAR_JA } from './grammar-ja';
export { GRAMMAR_KO } from './grammar-ko';
export { GRAMMAR_ZH } from './grammar-zh';
`;

    fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), indexContent);
    console.log('Created index.ts');

    console.log('\n=== Done! ===');
}

main().catch(console.error);

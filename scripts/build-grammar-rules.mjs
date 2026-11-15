#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GRAMMAR_RULES_BY_LANG } from '../functions-src/data/grammar-rules.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const GRAMMAR_OUT_DIR = path.join(ROOT, 'public', 'data', 'grammar');
const RULES_OUT_DIR = path.join(GRAMMAR_OUT_DIR, 'rules');

export function buildGrammarRules(outDir = GRAMMAR_OUT_DIR) {
    const rulesDir = path.join(outDir, 'rules');
    fs.mkdirSync(rulesDir, { recursive: true });
    const builtLanguages = [];

    for (const [lang, ruleSet] of Object.entries(GRAMMAR_RULES_BY_LANG)) {
        const patternsPath = path.join(outDir, 'patterns', `${lang}.json`);
        if (!fs.existsSync(patternsPath)) {
            throw new Error(`[build-grammar-rules] Missing patterns pack: ${patternsPath}`);
        }
        const patterns = JSON.parse(fs.readFileSync(patternsPath, 'utf8'));
        const patternMap = new Map(patterns.map(p => [p.id, p]));

        const validateRuleId = (id, bucket) => {
            if (!patternMap.has(id)) {
                throw new Error(`[build-grammar-rules] Unknown pattern ID "${id}" in ${lang}.${bucket}`);
            }
        };

        for (const r of ruleSet.nlpRules || []) validateRuleId(r.id, 'nlpRules');
        for (const r of ruleSet.sequenceRules || []) validateRuleId(r.id, 'sequenceRules');
        for (const r of ruleSet.splitRules || []) validateRuleId(r.id, 'splitRules');
        for (const r of ruleSet.phrasalVerbs || []) validateRuleId(r.id, 'phrasalVerbs');

        const outPath = path.join(rulesDir, `${lang}.json`);
        fs.writeFileSync(outPath, JSON.stringify(ruleSet));
        builtLanguages.push(lang);
    }

    return builtLanguages;
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
    const langs = buildGrammarRules(GRAMMAR_OUT_DIR);
    console.log(`[build-grammar-rules] Wrote declarative grammar rules (${langs.join(', ')}) to ${RULES_OUT_DIR}`);
}

import fs from 'fs';
import path from 'path';

import { GRAMMAR_JA } from '../src/app/data/grammar-ja';
import { GRAMMAR_ZH } from '../src/app/data/grammar-zh';
import { GRAMMAR_KO } from '../src/app/data/grammar-ko';
import { GRAMMAR_EN } from '../src/app/data/grammar-en';

const OUT_DIR = '/Users/huyphan/Downloads/web-app/voca_flutter/assets/grammar';
const I18N_SRC = path.resolve(__dirname, '../src/app/i18n');
const I18N_OUT = '/Users/huyphan/Downloads/web-app/voca_flutter/assets/i18n';

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(I18N_OUT, { recursive: true });

console.log('Exporting grammar datasets to JSON for Flutter...');

fs.writeFileSync(path.join(OUT_DIR, 'grammar_ja.json'), JSON.stringify(GRAMMAR_JA));
console.log(`Saved grammar_ja.json (${GRAMMAR_JA.length} patterns)`);

fs.writeFileSync(path.join(OUT_DIR, 'grammar_zh.json'), JSON.stringify(GRAMMAR_ZH));
console.log(`Saved grammar_zh.json (${GRAMMAR_ZH.length} patterns)`);

fs.writeFileSync(path.join(OUT_DIR, 'grammar_ko.json'), JSON.stringify(GRAMMAR_KO));
console.log(`Saved grammar_ko.json (${GRAMMAR_KO.length} patterns)`);

fs.writeFileSync(path.join(OUT_DIR, 'grammar_en.json'), JSON.stringify(GRAMMAR_EN));
console.log(`Saved grammar_en.json (${GRAMMAR_EN.length} patterns)`);

console.log('Copying i18n files...');
const i18nFiles = fs.readdirSync(I18N_SRC).filter(f => f.endsWith('.json'));
for (const f of i18nFiles) {
  fs.copyFileSync(path.join(I18N_SRC, f), path.join(I18N_OUT, f));
  console.log(`Copied i18n file: ${f}`);
}

console.log('Done export to voca_flutter/assets!');

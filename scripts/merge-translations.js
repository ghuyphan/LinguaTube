const fs = require('fs');
const path = require('path');

const CHUNKS_DIR = path.join(__dirname, 'grammar-chunks', 'output');
const TRANS_DIR = path.join(__dirname, '..', 'src', 'app', 'data', 'translations');

const TARGET_LANGS = {
  ja: ['vi', 'zh', 'ko', 'ja'],
  ko: ['vi', 'zh', 'ja', 'ko'],
  zh: ['vi', 'ja', 'ko', 'zh'],
  en: ['vi', 'zh', 'ja', 'ko']
};

function loadExistingTranslations(learningLang, targetLang) {
  const filePath = path.join(TRANS_DIR, learningLang, `${targetLang}.ts`);
  if (!fs.existsSync(filePath)) return {};
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const eqIdx = content.indexOf('=');
    const jsonStart = content.indexOf('{', eqIdx);
    const jsonEnd = content.lastIndexOf('}');
    if (jsonStart !== -1 && jsonEnd !== -1) {
      return JSON.parse(content.substring(jsonStart, jsonEnd + 1));
    }
  } catch (e) {
    console.warn(`Could not parse ${filePath}:`, e.message);
  }
  return {};
}

function saveTranslations(learningLang, targetLang, data) {
  const dir = path.join(TRANS_DIR, learningLang);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, `${targetLang}.ts`);
  const varName = `GRAMMAR_${learningLang.toUpperCase()}_${targetLang.toUpperCase()}`;
  const content = `import { GrammarTranslation } from '../../../models/grammar.model';\n\n` +
    `export const ${varName}: Record<string, GrammarTranslation> = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath} (${Object.keys(data).length} entries)`);
}

function mergeAllChunks(learningLang = 'ja') {
  const prefix = `${learningLang}_chunk_`;
  if (!fs.existsSync(CHUNKS_DIR)) return;
  const files = fs.readdirSync(CHUNKS_DIR).filter(f => f.startsWith(prefix) && f.endsWith('.json'));
  if (files.length === 0) {
    console.log(`No chunk files found for ${learningLang} in ${CHUNKS_DIR}`);
    return;
  }
  console.log(`Found ${files.length} chunks for ${learningLang}`);

  const merged = { vi: {}, zh: {}, ko: {}, ja: {}, en: {} };

  for (const file of files) {
    const filePath = path.join(CHUNKS_DIR, file);
    try {
      const chunk = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      for (const targetLang of Object.keys(chunk)) {
        if (!merged[targetLang]) merged[targetLang] = {};
        Object.assign(merged[targetLang], chunk[targetLang]);
      }
    } catch (err) {
      console.error(`Error reading ${file}:`, err.message);
    }
  }

  const targets = TARGET_LANGS[learningLang] || ['vi', 'zh', 'ko', 'ja'];
  for (const targetLang of targets) {
    const existing = loadExistingTranslations(learningLang, targetLang);
    const combined = { ...existing, ...merged[targetLang] };
    if (Object.keys(combined).length > 0) {
      saveTranslations(learningLang, targetLang, combined);
    }
  }
}

const target = process.argv[2] || 'ja';
if (target === 'all') {
  for (const lang of ['ja', 'ko', 'zh', 'en']) {
    mergeAllChunks(lang);
  }
} else {
  mergeAllChunks(target);
}

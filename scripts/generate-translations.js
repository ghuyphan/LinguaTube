/**
 * Grammar Translations Generator
 * Generates pre-translated grammar packs for all supported languages:
 * - English grammar translated to: vi, zh, ja, ko
 * - Japanese grammar translated to: vi, zh, ko
 * - Chinese grammar translated to: vi, ja, ko
 * - Korean grammar translated to: vi, zh, ja
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'src', 'app', 'data');
const TRANS_DIR = path.join(DATA_DIR, 'translations');

// Helper to load array from ts file
function loadTSData(filename) {
  const content = fs.readFileSync(path.join(DATA_DIR, filename), 'utf8');
  const eqIdx = content.indexOf('=');
  const jsonStart = content.indexOf('[', eqIdx);
  const jsonEnd = content.lastIndexOf(']');
  return JSON.parse(content.substring(jsonStart, jsonEnd + 1));
}

// Write translation pack to ts file
function writeTranslationPack(lang, targetLang, varName, translations) {
  const dir = path.join(TRANS_DIR, lang);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${targetLang}.ts`);
  const content = `import { GrammarTranslation } from '../../../models/grammar.model';\n\n` +
    `export const ${varName}: Record<string, GrammarTranslation> = ${JSON.stringify(translations, null, 2)};\n`;
  fs.writeFileSync(file, content);
  console.log(`Generated ${file} (${Object.keys(translations).length} translations)`);
}

// -------------------------------------------------------------
// Translation dictionaries for grammatical terms & phrases
// -------------------------------------------------------------
const VI_TERMS = {
  superlative: 'so sánh nhất (cao nhất)',
  contrast: 'sự tương phản, đối lập',
  contradiction: 'sự mâu thuẫn, trái ngược',
  decision: 'quyết định',
  suggestion: 'gợi ý, đề xuất',
  reason: 'lý do, nguyên nhân',
  cause: 'nguyên nhân',
  permission: 'sự cho phép',
  prohibition: 'sự cấm đoán',
  obligation: 'nghĩa vụ, bắt buộc',
  necessity: 'sự cần thiết',
  possibility: 'khả năng xảy ra',
  ability: 'năng lực, khả năng',
  habit: 'thói quen',
  state: 'trạng thái',
  conjecture: 'suy đoán',
  passive: 'thể bị động',
  causative: 'thể sai khiến',
  potential: 'thể khả năng',
  progressive: 'thì tiếp diễn',
  perfect: 'thì hoàn thành',
  conditional: 'câu điều kiện',
  noun: 'danh từ',
  verb: 'động từ',
  adjective: 'tính từ',
  adverb: 'trạng từ',
  particle: 'trợ từ',
  clause: 'mệnh đề'
};

const ZH_TERMS = {
  superlative: '最高级',
  contrast: '对比、转折',
  contradiction: '矛盾、相反',
  decision: '决定',
  suggestion: '建议',
  reason: '原因',
  cause: '起因',
  permission: '许可',
  prohibition: '禁止',
  obligation: '义务',
  necessity: '必要性',
  possibility: '可能性',
  ability: '能力',
  habit: '习惯',
  state: '状态',
  conjecture: '推测',
  passive: '被动语态',
  causative: '使役语态',
  potential: '可能语态',
  progressive: '进行时',
  perfect: '完成时',
  conditional: '条件句',
  noun: '名词',
  verb: '动词',
  adjective: '形容词',
  adverb: '副词',
  particle: '助词',
  clause: '从句'
};

const KO_TERMS = {
  superlative: '최상급',
  contrast: '대조, 역접',
  contradiction: '모순, 대립',
  decision: '결정',
  suggestion: '제안',
  reason: '이유',
  cause: '원인',
  permission: '허가',
  prohibition: '금지',
  obligation: '의무',
  necessity: '필요성',
  possibility: '가능성',
  ability: '능력',
  habit: '습관',
  state: '상태',
  conjecture: '추측',
  passive: '수동태',
  causative: '사동태',
  potential: '가능태',
  progressive: '진행형',
  perfect: '완료형',
  conditional: '조건문',
  noun: '명사',
  verb: '동사',
  adjective: '형용사',
  adverb: '부사',
  particle: '조사',
  clause: '절'
};

const JA_TERMS = {
  superlative: '最上級',
  contrast: '対比・逆接',
  contradiction: '矛盾・反対',
  decision: '決定',
  suggestion: '提案',
  reason: '理由',
  cause: '原因',
  permission: '許可',
  prohibition: '禁止',
  obligation: '義務',
  necessity: '必要性',
  possibility: '可能性',
  ability: '能力',
  habit: '習慣',
  state: '状態',
  conjecture: '推測',
  passive: '受身形',
  causative: '使役形',
  potential: '可能形',
  progressive: '進行形',
  perfect: '完了形',
  conditional: '条件文',
  noun: '名詞',
  verb: '動詞',
  adjective: '形容詞',
  adverb: '副詞',
  particle: '助詞',
  clause: '節'
};

// Translate explanation template
function translateExplanation(text, targetLang) {
  if (!text) return '';
  let result = text;

  if (targetLang === 'vi') {
    result = result
      .replace(/Used to express/gi, 'Dùng để diễn tả')
      .replace(/Used to indicate/gi, 'Dùng để biểu thị')
      .replace(/Used to show/gi, 'Dùng để chỉ ra')
      .replace(/Used to ask/gi, 'Dùng để hỏi')
      .replace(/Express the/gi, 'Diễn tả')
      .replace(/Expresses/gi, 'Diễn tả')
      .replace(/Indicates/gi, 'Biểu thị')
      .replace(/superlative degree/gi, 'cấp độ so sánh nhất')
      .replace(/contrast between two statements/gi, 'sự đối lập giữa hai mệnh đề')
      .replace(/contradiction between two clauses/gi, 'sự mâu thuẫn giữa hai mệnh đề')
      .replace(/decision or suggestion/gi, 'quyết định hoặc gợi ý')
      .replace(/change in situation/gi, 'sự thay đổi trong tình huống')
      .replace(/It can be translated as/gi, 'Có thể dịch là')
      .replace(/can also be used in comparison/gi, 'cũng có thể dùng trong so sánh')
      .replace(/with various adjectives and verbs/gi, 'với nhiều tính từ và động từ')
      .replace(/The formation is used/gi, 'Cấu trúc này được sử dụng')
      .replace(/subject markers/gi, 'trợ từ chủ ngữ')
      .replace(/topic markers/gi, 'trợ từ chủ đề')
      .replace(/object markers/gi, 'trợ từ tân ngữ')
      .replace(/in English/gi, 'trong câu')
      .replace(/in Korean/gi, 'trong tiếng Hàn')
      .replace(/in Japanese/gi, 'trong tiếng Nhật');
  } else if (targetLang === 'zh') {
    result = result
      .replace(/Used to express/gi, '用于表达')
      .replace(/Used to indicate/gi, '用于表示')
      .replace(/Used to show/gi, '用于展示')
      .replace(/Used to ask/gi, '用于询问')
      .replace(/Express the/gi, '表达')
      .replace(/Expresses/gi, '表示')
      .replace(/Indicates/gi, '指示')
      .replace(/superlative degree/gi, '最高级程度')
      .replace(/contrast between two statements/gi, '两个陈述之间的对比')
      .replace(/contradiction between two clauses/gi, '两个分句之间的转折')
      .replace(/decision or suggestion/gi, '决定或建议')
      .replace(/It can be translated as/gi, '可以翻译为')
      .replace(/subject markers/gi, '主语助词')
      .replace(/topic markers/gi, '主题助词')
      .replace(/object markers/gi, '宾语助词');
  } else if (targetLang === 'ko') {
    result = result
      .replace(/Used to express/gi, '~를 나타내는 데 사용됨')
      .replace(/Used to indicate/gi, '~를 표시하는 데 사용됨')
      .replace(/superlative degree/gi, '최상급')
      .replace(/It can be translated as/gi, '~로 번역될 수 있음')
      .replace(/subject markers/gi, '주격 조사')
      .replace(/topic markers/gi, '보조사 (주제)')
      .replace(/object markers/gi, '목적격 조사');
  } else if (targetLang === 'ja') {
    result = result
      .replace(/Used to express/gi, '〜を表すために使用されます')
      .replace(/Used to indicate/gi, '〜を示します')
      .replace(/superlative degree/gi, '最上級')
      .replace(/It can be translated as/gi, '〜と訳されます')
      .replace(/subject markers/gi, '主格助詞')
      .replace(/topic markers/gi, '主題助詞')
      .replace(/object markers/gi, '目的格助詞');
  }

  return result;
}

// Translate formation formula
function translateFormation(formation, targetLang) {
  if (!formation) return '';
  let result = formation;
  if (targetLang === 'vi') {
    result = result
      .replace(/\bNoun\b/g, 'Danh từ')
      .replace(/\bVerb\b/g, 'Động từ')
      .replace(/\bAdjective\b/g, 'Tính từ')
      .replace(/\bClause\b/g, 'Mệnh đề')
      .replace(/\bSubject\b/g, 'Chủ ngữ')
      .replace(/\bObject\b/g, 'Tân ngữ')
      .replace(/\bbase verb\b/g, 'động từ nguyên mẫu')
      .replace(/\bpast participle\b/g, 'quá khứ phân từ (V3)');
  } else if (targetLang === 'zh') {
    result = result
      .replace(/\bNoun\b/g, '名词')
      .replace(/\bVerb\b/g, '动词')
      .replace(/\bAdjective\b/g, '形容词')
      .replace(/\bClause\b/g, '从句')
      .replace(/\bSubject\b/g, '主语')
      .replace(/\bObject\b/g, '宾语')
      .replace(/\bbase verb\b/g, '动词原形')
      .replace(/\bpast participle\b/g, '过去分词 (V3)');
  } else if (targetLang === 'ko') {
    result = result
      .replace(/\bNoun\b/g, '명사')
      .replace(/\bVerb\b/g, '동사')
      .replace(/\bAdjective\b/g, '형용사')
      .replace(/\bClause\b/g, '절')
      .replace(/\bSubject\b/g, '주어')
      .replace(/\bObject\b/g, '목적어');
  } else if (targetLang === 'ja') {
    result = result
      .replace(/\bNoun\b/g, '名詞')
      .replace(/\bVerb\b/g, '動詞')
      .replace(/\bAdjective\b/g, '形容詞')
      .replace(/\bClause\b/g, '節')
      .replace(/\bSubject\b/g, '主語')
      .replace(/\bObject\b/g, '目的語');
  }
  return result;
}

// -------------------------------------------------------------
// 1. Process Japanese grammar translations
// -------------------------------------------------------------
console.log('Processing Japanese grammar translations...');
const jaPatterns = loadTSData('grammar-ja.ts');

['vi', 'zh', 'ko'].forEach(targetLang => {
  const trans = {};
  jaPatterns.forEach(p => {
    trans[p.id] = {
      title: p.title,
      shortExplanation: translateExplanation(p.shortExplanation, targetLang),
      longExplanation: translateExplanation(p.longExplanation, targetLang),
      formation: translateFormation(p.formation, targetLang)
    };
  });
  writeTranslationPack('ja', targetLang, `GRAMMAR_JA_${targetLang.toUpperCase()}`, trans);
});

// -------------------------------------------------------------
// 2. Process Korean grammar translations
// -------------------------------------------------------------
console.log('Processing Korean grammar translations...');
const koPatterns = loadTSData('grammar-ko.ts');

['vi', 'zh', 'ja'].forEach(targetLang => {
  const trans = {};
  koPatterns.forEach(p => {
    trans[p.id] = {
      title: p.title,
      shortExplanation: translateExplanation(p.shortExplanation, targetLang),
      longExplanation: translateExplanation(p.longExplanation, targetLang),
      formation: translateFormation(p.formation, targetLang)
    };
  });
  writeTranslationPack('ko', targetLang, `GRAMMAR_KO_${targetLang.toUpperCase()}`, trans);
});

// -------------------------------------------------------------
// 3. Process Chinese grammar translations
// -------------------------------------------------------------
console.log('Processing Chinese grammar translations...');
const zhPatterns = loadTSData('grammar-zh.ts');

['vi', 'ja', 'ko'].forEach(targetLang => {
  const trans = {};
  zhPatterns.forEach(p => {
    trans[p.id] = {
      title: p.title,
      shortExplanation: translateExplanation(p.shortExplanation, targetLang),
      longExplanation: translateExplanation(p.longExplanation, targetLang),
      formation: translateFormation(p.formation, targetLang)
    };
  });
  writeTranslationPack('zh', targetLang, `GRAMMAR_ZH_${targetLang.toUpperCase()}`, trans);
});

// -------------------------------------------------------------
// 4. Process English grammar translations
// -------------------------------------------------------------
console.log('Processing English grammar translations...');
const enPatterns = loadTSData('grammar-en.ts');

['vi', 'ja', 'ko'].forEach(targetLang => {
  const trans = {};
  enPatterns.forEach(p => {
    trans[p.id] = {
      title: p.title,
      shortExplanation: translateExplanation(p.shortExplanation, targetLang),
      longExplanation: translateExplanation(p.longExplanation, targetLang),
      formation: translateFormation(p.formation, targetLang),
      examples: p.examples.map(ex => ({
        translation: translateExplanation(ex.translation || ex.sentence, targetLang)
      }))
    };
  });
  writeTranslationPack('en', targetLang, `GRAMMAR_EN_${targetLang.toUpperCase()}`, trans);
});

console.log('\nAll grammar translation packs successfully created!');

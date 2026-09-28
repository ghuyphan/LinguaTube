/**
 * Utility for formatting and translating cryptic dictionary Part of Speech (POS) codes
 * (e.g. v5r, vi, v1, adj-i, uk, rK) into learner-friendly, human-readable labels.
 */

interface PosTranslation {
  en: string;
  vi: string;
  ja: string;
  ko: string;
  zh: string;
}

const POS_MAP: Record<string, PosTranslation> = {
  // Japanese / Korean / Common Verbs
  'v1': { en: 'Ichidan verb', vi: 'Động từ nhóm 2', ja: '一段動詞', ko: '1단 동사', zh: '一段动词' },
  'v5': { en: 'Godan verb', vi: 'Động từ nhóm 1', ja: '五段動詞', ko: '5단 동사', zh: '五段动词' },
  'v5r': { en: 'Godan verb (-ru)', vi: 'Động từ nhóm 1 (-ru)', ja: '五段動詞 (ラ行)', ko: '5단 동사 (라행)', zh: '五段动词 (ra行)' },
  'v5k': { en: 'Godan verb (-ku)', vi: 'Động từ nhóm 1 (-ku)', ja: '五段動詞 (カ行)', ko: '5단 동사 (카행)', zh: '五段动词 (ka行)' },
  'v5s': { en: 'Godan verb (-su)', vi: 'Động từ nhóm 1 (-su)', ja: '五段動詞 (サ行)', ko: '5단 동사 (사행)', zh: '五段动词 (sa行)' },
  'v5t': { en: 'Godan verb (-tsu)', vi: 'Động từ nhóm 1 (-tsu)', ja: '五段動詞 (タ行)', ko: '5단 동사 (타행)', zh: '五段动词 (ta行)' },
  'v5n': { en: 'Godan verb (-nu)', vi: 'Động từ nhóm 1 (-nu)', ja: '五段動詞 (ナ行)', ko: '5단 동사 (나행)', zh: '五段动词 (na行)' },
  'v5m': { en: 'Godan verb (-mu)', vi: 'Động từ nhóm 1 (-mu)', ja: '五段動詞 (マ行)', ko: '5단 동사 (마행)', zh: '五段动词 (ma行)' },
  'v5b': { en: 'Godan verb (-bu)', vi: 'Động từ nhóm 1 (-bu)', ja: '五段動詞 (バ行)', ko: '5단 동사 (바행)', zh: '五段动词 (ba行)' },
  'v5g': { en: 'Godan verb (-gu)', vi: 'Động từ nhóm 1 (-gu)', ja: '五段動詞 (ガ行)', ko: '5단 동사 (가행)', zh: '五段动词 (ga行)' },
  'v5u': { en: 'Godan verb (-u)', vi: 'Động từ nhóm 1 (-u)', ja: '五段動詞 (ア行)', ko: '5단 동사 (아행)', zh: '五段动词 (a行)' },
  'v5k-s': { en: 'Godan verb (iku/yuku)', vi: 'Động từ nhóm 1 (iku/yuku)', ja: '五段動詞 (行く/逝く)', ko: '5단 동사', zh: '五段动词' },
  'v5aru': { en: 'Godan verb (-aru)', vi: 'Động từ nhóm 1 (-aru)', ja: '五段動詞 (-aru)', ko: '5단 동사', zh: '五段动词' },
  'v5r-i': { en: 'Godan verb (irregular)', vi: 'Động từ nhóm 1 (bất quy tắc)', ja: '五段動詞 (不規則)', ko: '5단 동사 (불규칙)', zh: '五段动词 (不规则)' },
  'v5u-s': { en: 'Godan verb (special)', vi: 'Động từ nhóm 1 (đặc biệt)', ja: '五段動詞 (特殊)', ko: '5단 동사 (특수)', zh: '五段动词 (特殊)' },
  'vk': { en: 'Kuru verb', vi: 'Động từ nhóm 3 (kuru)', ja: 'カ変動詞', ko: '카변격 동사', zh: '变格动词 (kuru)' },
  'vs': { en: 'Suru verb', vi: 'Động từ Suru', ja: 'サ変動詞', ko: '사변격 동사', zh: '变格动词 (suru)' },
  'vs-i': { en: 'Suru verb', vi: 'Động từ Suru', ja: 'サ変動詞', ko: '사변격 동사', zh: '变格动词 (suru)' },
  'vs-s': { en: 'Suru verb', vi: 'Động từ Suru', ja: 'サ変動詞', ko: '사변격 동사', zh: '变格动词 (suru)' },
  'vz': { en: 'Zuru verb', vi: 'Động từ Zuru', ja: 'ザ変動詞', ko: '자변격 동사', zh: '变格动词 (zuru)' },
  'vi': { en: 'Intransitive', vi: 'Tự động từ', ja: '自動詞', ko: '자동사', zh: '自动词' },
  'vt': { en: 'Transitive', vi: 'Tha động từ', ja: '他動詞', ko: '타동사', zh: '他动词' },
  'v': { en: 'Verb', vi: 'Động từ', ja: '動詞', ko: '동사', zh: '动词' },

  // Nouns
  'n': { en: 'Noun', vi: 'Danh từ', ja: '名詞', ko: '명사', zh: '名词' },
  'n-adv': { en: 'Adverbial noun', vi: 'Danh từ phó từ', ja: '副詞的名詞', ko: '부사적 명사', zh: '副词性名词' },
  'n-t': { en: 'Temporal noun', vi: 'Danh từ chỉ thời gian', ja: '時間名詞', ko: '시간 명사', zh: '时间名词' },
  'n-pref': { en: 'Noun prefix', vi: 'Tiền tố danh từ', ja: '名詞接頭辞', ko: '명사 접두사', zh: '名词前缀' },
  'n-suf': { en: 'Noun suffix', vi: 'Hậu tố danh từ', ja: '名詞接尾辞', ko: '명사 접미사', zh: '名词后缀' },
  'pn': { en: 'Pronoun', vi: 'Đại từ', ja: '代名詞', ko: '대명사', zh: '代词' },

  // Adjectives
  'adj-i': { en: 'i-adjective', vi: 'Tính từ đuôi い', ja: 'イ形容詞', ko: 'i형용사', zh: 'い形容词' },
  'adj-na': { en: 'na-adjective', vi: 'Tính từ đuôi な', ja: 'ナ形容詞', ko: 'na형용사', zh: 'な形容词' },
  'adj-no': { en: 'Noun modifier (no)', vi: 'Bổ nghĩa danh từ (no)', ja: 'ノ形容詞', ko: 'no형용사', zh: 'の形容词' },
  'adj-pn': { en: 'Pre-noun adjectival', vi: 'Liên thể từ', ja: '連体詞', ko: '연체사', zh: '连体词' },
  'adj-t': { en: 'taru-adjective', vi: 'Tính từ taru', ja: 'タル形容詞', ko: 'taru형용사', zh: 'たる形容词' },
  'adj-f': { en: 'Pre-noun verbal/noun', vi: 'Từ bổ nghĩa trước danh từ', ja: '連体詞的', ko: '명사 수식', zh: '定语' },
  'adj': { en: 'Adjective', vi: 'Tính từ', ja: '形容詞', ko: '형용사', zh: '形容词' },

  // Adverbs, Particles, Conjunctions
  'adv': { en: 'Adverb', vi: 'Phó từ', ja: '副詞', ko: '부사', zh: '副词' },
  'adv-to': { en: 'Adverb (-to)', vi: 'Phó từ (-to)', ja: '副詞 (と)', ko: '부사 (to)', zh: '副词 (to)' },
  'prt': { en: 'Particle', vi: 'Trợ từ', ja: '助詞', ko: '조사', zh: '助词' },
  'conj': { en: 'Conjunction', vi: 'Liên từ', ja: '接続詞', ko: '접속사', zh: '连词' },
  'aux': { en: 'Auxiliary', vi: 'Trợ động từ', ja: '助動詞', ko: '조동사', zh: '助动词' },
  'aux-v': { en: 'Auxiliary verb', vi: 'Trợ động từ', ja: '助動詞', ko: '보조 동사', zh: '补助动词' },
  'aux-adj': { en: 'Auxiliary adjective', vi: 'Trợ tính từ', ja: '補助形容詞', ko: '보조 형용사', zh: '补助形容词' },

  // Expressions & Interjections
  'exp': { en: 'Expression', vi: 'Cụm từ', ja: '表現', ko: '표현', zh: '表达' },
  'int': { en: 'Interjection', vi: 'Thán từ', ja: '感嘆詞', ko: '감탄사', zh: '感叹词' },
  'pref': { en: 'Prefix', vi: 'Tiền tố', ja: '接頭辞', ko: '접두사', zh: '前缀' },
  'suf': { en: 'Suffix', vi: 'Hậu tố', ja: '接尾辞', ko: '접미사', zh: '后缀' },
  'counter': { en: 'Counter', vi: 'Lượng từ', ja: '助数詞', ko: '수사/단위', zh: '量词' },
  'num': { en: 'Numeral', vi: 'Số từ', ja: '数詞', ko: '수사', zh: '数词' },

  // Usage & Register Notes
  'uk': { en: 'Usually kana', vi: 'Thường dùng kana', ja: 'かな表記', ko: '가나 표기', zh: '常作假名' },
  'rk': { en: 'Rare kanji', vi: 'Hiếm dùng Hán tự', ja: '稀用漢字', ko: '한자 드묾', zh: '罕用汉字' },
  'hon': { en: 'Honorific', vi: 'Kính ngữ', ja: '敬語', ko: '존댓말', zh: '敬语' },
  'hum': { en: 'Humble', vi: 'Khiêm nhường ngữ', ja: '謙譲語', ko: '겸양어', zh: '谦逊语' },
  'pol': { en: 'Polite', vi: 'Lịch sự', ja: '丁寧語', ko: '정중어', zh: '郑重语' },
  'col': { en: 'Colloquial', vi: 'Khẩu ngữ', ja: '口語', ko: '구어', zh: '口语' },
  'sl': { en: 'Slang', vi: 'Tiếng lóng', ja: 'スラング', ko: '속어', zh: '俚语' },
  'id': { en: 'Idiom', vi: 'Thành ngữ', ja: '成句', ko: '관용구', zh: '成语' }
};

/**
 * Format and localize part of speech tags into human-readable strings
 * @param pos Single string or array of strings (e.g. 'v5r, vi' or ['v1', 'vt'])
 * @param lang Target UI language ('en', 'vi', 'ja', 'ko', 'zh')
 * @returns Array of clean, localized labels (e.g. ['Động từ nhóm 1 (-ru)', 'Tự động từ'])
 */
export function formatPartOfSpeech(pos: string | string[] | undefined | null, lang: string = 'en'): string[] {
  if (!pos) return [];

  const rawList: string[] = Array.isArray(pos) ? pos : [pos];
  const tokens: string[] = [];

  for (const item of rawList) {
    if (!item) continue;
    // Split on commas, slashes, or semicolons
    const subParts = item.split(/[,;/]+/).map(p => p.trim()).filter(Boolean);
    tokens.push(...subParts);
  }

  const result: string[] = [];
  const seen = new Set<string>();
  const targetLang = (['en', 'vi', 'ja', 'ko', 'zh'].includes(lang) ? lang : 'en') as keyof PosTranslation;

  for (const rawToken of tokens) {
    const key = rawToken.toLowerCase();
    const mapped = POS_MAP[key];

    let label: string;
    if (mapped) {
      label = mapped[targetLang] || mapped.en;
    } else {
      // If already a human-readable term (e.g. "Noun", "Verb", "Ichidan verb"), keep it formatted
      label = rawToken;
    }

    if (label && !seen.has(label.toLowerCase())) {
      seen.add(label.toLowerCase());
      result.push(label);
    }
  }

  return result;
}

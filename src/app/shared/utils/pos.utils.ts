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

  'prep': { en: 'Preposition', vi: 'Giới từ', ja: '前置詞', ko: '전치사', zh: '介词' },
  'art': { en: 'Article', vi: 'Mạo từ', ja: '冠詞', ko: '관사', zh: '冠词' },

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
  'id': { en: 'Idiom', vi: 'Thành ngữ', ja: '成句', ko: '관용구', zh: '成语' },

  // Full English & Jotoba / Provider POS Tags
  'noun': { en: 'Noun', vi: 'Danh từ', ja: '名詞', ko: '명사', zh: '名词' },
  'noun (normal)': { en: 'Noun', vi: 'Danh từ', ja: '名詞', ko: '명사', zh: '名词' },
  'noun (suffix)': { en: 'Noun suffix', vi: 'Hậu tố danh từ', ja: '名詞接尾辞', ko: '명사 접미사', zh: '名词后缀' },
  'noun (prefix)': { en: 'Noun prefix', vi: 'Tiền tố danh từ', ja: '名詞接頭辞', ko: '명사 접두사', zh: '名词前缀' },
  'verb': { en: 'Verb', vi: 'Động từ', ja: '動詞', ko: '동사', zh: '动词' },
  'verb (ichidan)': { en: 'Ichidan verb', vi: 'Động từ nhóm 2', ja: '一段動詞', ko: '1단 동사', zh: '一段动词' },
  'verb (godan)': { en: 'Godan verb', vi: 'Động từ nhóm 1', ja: '五段動詞', ko: '5단 동사', zh: '五段动词' },
  'verb (suru)': { en: 'Suru verb', vi: 'Động từ Suru', ja: 'サ変動詞', ko: '사변격 동사', zh: '变格动词 (suru)' },
  'verb (kuru)': { en: 'Kuru verb', vi: 'Động từ nhóm 3 (kuru)', ja: 'カ変動詞', ko: '카변격 동사', zh: '变格动词 (kuru)' },
  'verb (transitive)': { en: 'Transitive', vi: 'Tha động từ', ja: '他動詞', ko: '타동사', zh: '他动词' },
  'verb (intransitive)': { en: 'Intransitive', vi: 'Tự động từ', ja: '自動詞', ko: '자동사', zh: '自动词' },
  'adjective': { en: 'Adjective', vi: 'Tính từ', ja: '形容詞', ko: '형용사', zh: '形容词' },
  'adjective (keiyoushi)': { en: 'i-adjective', vi: 'Tính từ đuôi い', ja: 'イ形容詞', ko: 'i형용사', zh: 'い形容词' },
  'adjective (na)': { en: 'na-adjective', vi: 'Tính từ đuôi な', ja: 'ナ形容詞', ko: 'na형용사', zh: 'な形容词' },
  'adjective (no)': { en: 'Noun modifier (no)', vi: 'Bổ nghĩa danh từ (no)', ja: 'ノ形容詞', ko: 'no형용사', zh: 'の形容词' },
  'adjective (prenounverb)': { en: 'Pre-noun verbal/noun', vi: 'Từ bổ nghĩa trước danh từ', ja: '連体詞的', ko: '명사 수식', zh: '定语' },
  'auxilaryverb': { en: 'Auxiliary verb', vi: 'Trợ động từ', ja: '助動詞', ko: '보조 동사', zh: '助动词' },
  'auxiliaryverb': { en: 'Auxiliary verb', vi: 'Trợ động từ', ja: '助動詞', ko: '보조 동사', zh: '助动词' },
  'adverb': { en: 'Adverb', vi: 'Phó từ', ja: '副詞', ko: '부사', zh: '副词' },
  'particle': { en: 'Particle', vi: 'Trợ từ', ja: '助詞', ko: '조사', zh: '助词' },
  'conjunction': { en: 'Conjunction', vi: 'Liên từ', ja: '接続詞', ko: '접속사', zh: '连词' },
  'interjection': { en: 'Interjection', vi: 'Thán từ', ja: '感嘆詞', ko: '감탄사', zh: '感叹词' },
  'pronoun': { en: 'Pronoun', vi: 'Đại từ', ja: '代名詞', ko: '대명사', zh: '代词' },
  'preposition': { en: 'Preposition', vi: 'Giới từ', ja: '前置詞', ko: '전치사', zh: '介词' },
  'determiner': { en: 'Determiner', vi: 'Từ hạn định', ja: '限定詞', ko: '한정사', zh: '限定词' },
  'det': { en: 'Determiner', vi: 'Từ hạn định', ja: '限定詞', ko: '한정사', zh: '限定词' },
  'cl': { en: 'Classifier', vi: 'Lượng từ', ja: '助数詞', ko: '양사', zh: '量词' },

  // Chinese & Japanese Native POS Tags
  '名词': { en: 'Noun', vi: 'Danh từ', ja: '名詞', ko: '명사', zh: '名词' },
  '名詞': { en: 'Noun', vi: 'Danh từ', ja: '名詞', ko: '명사', zh: '名词' },
  '动词': { en: 'Verb', vi: 'Động từ', ja: '動詞', ko: '동사', zh: '动词' },
  '動詞': { en: 'Verb', vi: 'Động từ', ja: '動詞', ko: '동사', zh: '动词' },
  '及物动词': { en: 'Transitive', vi: 'Tha động từ', ja: '他動詞', ko: '타동사', zh: '他动词' },
  '不及物动词': { en: 'Intransitive', vi: 'Tự động từ', ja: '自動詞', ko: '자동사', zh: '自动词' },
  '形容词': { en: 'Adjective', vi: 'Tính từ', ja: '形容詞', ko: '형용사', zh: '形容词' },
  '形容詞': { en: 'Adjective', vi: 'Tính từ', ja: '形容詞', ko: '형용사', zh: '形容词' },
  '副词': { en: 'Adverb', vi: 'Phó từ', ja: '副詞', ko: '부사', zh: '副词' },
  '副詞': { en: 'Adverb', vi: 'Phó từ', ja: '副詞', ko: '부사', zh: '副词' },
  '代词': { en: 'Pronoun', vi: 'Đại từ', ja: '代名詞', ko: '대명사', zh: '代词' },
  '代名詞': { en: 'Pronoun', vi: 'Đại từ', ja: '代名詞', ko: '대명사', zh: '代词' },
  '连词': { en: 'Conjunction', vi: 'Liên từ', ja: '接続詞', ko: '접속사', zh: '连词' },
  '接続詞': { en: 'Conjunction', vi: 'Liên từ', ja: '接続詞', ko: '접속사', zh: '连词' },
  '介词': { en: 'Preposition', vi: 'Giới từ', ja: '前置詞', ko: '전치사', zh: '介词' },
  '助词': { en: 'Particle', vi: 'Trợ từ', ja: '助詞', ko: '조사', zh: '助词' },
  '助詞': { en: 'Particle', vi: 'Trợ từ', ja: '助詞', ko: '조사', zh: '助词' },
  '助动词': { en: 'Auxiliary verb', vi: 'Trợ động từ', ja: '助動詞', ko: '조동사', zh: '助动词' },
  '助動詞': { en: 'Auxiliary verb', vi: 'Trợ động từ', ja: '助動詞', ko: '조동사', zh: '助动词' },
  '感叹词': { en: 'Interjection', vi: 'Thán từ', ja: '感嘆詞', ko: '감탄사', zh: '感叹词' },
  '感嘆詞': { en: 'Interjection', vi: 'Thán từ', ja: '感嘆詞', ko: '감탄사', zh: '感叹词' },
  '感動詞': { en: 'Interjection', vi: 'Thán từ', ja: '感動詞', ko: '감탄사', zh: '感叹词' },
  '数词': { en: 'Numeral', vi: 'Số từ', ja: '数詞', ko: '수사', zh: '数词' },
  '量词': { en: 'Classifier', vi: 'Lượng từ', ja: '助数詞', ko: '양사', zh: '量词' },

  // Korean POS Tags
  '명사': { en: 'Noun', vi: 'Danh từ', ja: '名詞', ko: '명사', zh: '名词' },
  '의존명사': { en: 'Bound noun', vi: 'Danh từ phụ thuộc', ja: '依存名詞', ko: '의존명사', zh: '依存名词' },
  '대명사': { en: 'Pronoun', vi: 'Đại từ', ja: '代名詞', ko: '대명사', zh: '代词' },
  '수사': { en: 'Numeral', vi: 'Số từ', ja: '数詞', ko: '수사', zh: '数词' },
  '관형사': { en: 'Determiner', vi: 'Định từ', ja: '連体詞', ko: '관형사', zh: '冠形词' },
  '동사': { en: 'Verb', vi: 'Động từ', ja: '動詞', ko: '동사', zh: '动词' },
  '보조동사': { en: 'Auxiliary verb', vi: 'Trợ động từ', ja: '補助動詞', ko: '보조동사', zh: '补助动词' },
  '형용사': { en: 'Adjective', vi: 'Tính từ', ja: '形容詞', ko: '형용사', zh: '形容词' },
  '보조형용사': { en: 'Auxiliary adjective', vi: 'Trợ tính từ', ja: '補助形容詞', ko: '보조형용사', zh: '补助形容词' },
  '부사': { en: 'Adverb', vi: 'Phó từ', ja: '副詞', ko: '부사', zh: '副词' },
  '의문부사': { en: 'Interrogative adverb', vi: 'Phó từ nghi vấn', ja: '疑問副詞', ko: '의문부사', zh: '疑问副词' },
  '감탄사': { en: 'Interjection', vi: 'Thán từ', ja: '感嘆詞', ko: '감탄사', zh: '感叹词' },
  '조사': { en: 'Particle', vi: 'Trợ từ', ja: '助詞', ko: '조사', zh: '助词' },
  '접속사': { en: 'Conjunction', vi: 'Liên từ', ja: '接続詞', ko: '접속사', zh: '连词' },
  '전치사': { en: 'Preposition', vi: 'Giới từ', ja: '前置詞', ko: '전치사', zh: '介词' },
  '관사': { en: 'Article', vi: 'Mạo từ', ja: '冠詞', ko: '관사', zh: '冠词' },
  '정관사': { en: 'Definite article', vi: 'Mạo từ xác định', ja: '定冠詞', ko: '정관사', zh: '定冠词' },
  '부정관사': { en: 'Indefinite article', vi: 'Mạo từ bất định', ja: '不定冠詞', ko: '부정관사', zh: '不定冠词' },
  '부정형 표지': { en: 'Infinitive marker', vi: 'Trợ từ nguyên mẫu', ja: '不定詞マーカー', ko: '부정형 표지', zh: '不定式标记' },

  // Vietnamese POS Tags
  'danh từ': { en: 'Noun', vi: 'Danh từ', ja: '名詞', ko: '명사', zh: '名词' },
  'danh từ phụ thuộc': { en: 'Bound noun', vi: 'Danh từ phụ thuộc', ja: '依存名詞', ko: '의존명사', zh: '依存名词' },
  'đại từ': { en: 'Pronoun', vi: 'Đại từ', ja: '代名詞', ko: '대명사', zh: '代词' },
  'động từ': { en: 'Verb', vi: 'Động từ', ja: '動詞', ko: '동사', zh: '动词' },
  'ngoại động từ': { en: 'Transitive', vi: 'Tha động từ', ja: '他動詞', ko: '타동사', zh: '他动词' },
  'nội động từ': { en: 'Intransitive', vi: 'Tự động từ', ja: '自動詞', ko: '자동사', zh: '自动词' },
  'trợ động từ': { en: 'Auxiliary verb', vi: 'Trợ động từ', ja: '助動詞', ko: '조동사', zh: '助动词' },
  'tính từ': { en: 'Adjective', vi: 'Tính từ', ja: '形容詞', ko: '형용사', zh: '形容词' },
  'trạng từ': { en: 'Adverb', vi: 'Phó từ', ja: '副詞', ko: '부사', zh: '副词' },
  'phó từ': { en: 'Adverb', vi: 'Phó từ', ja: '副詞', ko: '부사', zh: '副词' },
  'liên từ': { en: 'Conjunction', vi: 'Liên từ', ja: '接続詞', ko: '접속사', zh: '连词' },
  'giới từ': { en: 'Preposition', vi: 'Giới từ', ja: '前置詞', ko: '전치사', zh: '介词' },
  'thán từ': { en: 'Interjection', vi: 'Thán từ', ja: '感嘆詞', ko: '감탄사', zh: '感叹词' },
  'mạo từ': { en: 'Article', vi: 'Mạo từ', ja: '冠詞', ko: '관사', zh: '冠词' },
  'mạo từ xác định': { en: 'Definite article', vi: 'Mạo từ xác định', ja: '定冠詞', ko: '정관사', zh: '定冠词' }
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
    const subParts = item.split(/[,;/]+/).map(p => p.trim()).filter(p => p && p.toLowerCase() !== 'word');
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

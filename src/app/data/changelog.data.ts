/**
 * Changelog & Version Data Structures
 */

export interface ServerVersionInfo {
    version: string;
    minSupportedVersion: string;
    buildDate: string;
    forceUpdate: boolean;
    maintenance: boolean;
    maintenanceMessage?: string;
    highlights: Record<string, string[]>;
}

export interface ReleaseInfo {
    version: string;
    buildDate: string;
    highlights: Record<string, string[]>;
}

export const CURRENT_RELEASE_INFO: ServerVersionInfo = {
    version: '1.1.1',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'NLP-Powered English Tokenization: Integrated the Compromise NLP engine for English morphological segmentation, attaching accurate Part-of-Speech tags and lemmatized base forms',
            'Zero False Positives: Eliminated aggressive over-tagging on everyday words, pronouns, articles, and contractions (such as "I", "the", "a", "don\'t"), keeping them individually clickable for dictionary lookup',
            'Precision CEFR Grammar Patterns: Implemented syntax-aware detection for genuine English CEFR structures (perfect tenses, modal perfects, phrasal modals, correlatives) with clean token boundaries'
        ],
        vi: [
            'Phân tích ngữ pháp tiếng Anh bằng NLP: Tích hợp thư viện Compromise NLP cho tiếng Anh, bổ sung từ loại (POS) và dạng nguyên thể (baseForm) tương tự như tiếng Nhật và tiếng Hàn',
            'Loại bỏ hoàn toàn nhận diện nhầm: Khắc phục triệt để lỗi đánh dấu tràn lan các từ phổ thông, đại từ, mạo từ và từ viết tắt (như "I", "the", "a", "don\'t"), giúp tra cứu từ điển và lưu từ vựng chính xác',
            'Nhận diện mẫu ngữ pháp CEFR chuẩn xác: Nhận diện cấu trúc ngữ pháp thực tế (thì hoàn thành, động từ khuyết thiếu quá khứ, cấu trúc tương quan) mà không bị dính dấu câu hay khoảng trắng'
        ],
        ja: [
            'NLPによる高精度な英語形態素解析：Compromise NLPエンジンを統合し、品詞タグ（POS）と原形（baseForm）を付与して日本語（Kuromoji）や韓国語と同様の分析を実現',
            '日常単語の誤判定を完全解消：代名詞や冠詞、短縮形（"I", "the", "a", "don\'t"など）の過剰ハイライトを撤廃し、単語ごとの辞書引きと単語帳保存がスムーズに',
            '精密なCEFR英文法パターン検出：複合時制や法助動詞完了形、相関構文などの真の英文法構造を文脈に応じて的確に検出し、記号やスペースを含めないクリーンな抽出を実現'
        ],
        ko: [
            'NLP 기반 영어 형태소 분석 도입: Compromise NLP 엔진을 연동하여 품사 태그(POS) 및 기본형(baseForm)을 부여, 일본어 및 한국어 수준의 자연어 처리 구현',
            '일상 단어 오인식 완벽 제거: 대명사, 관사, 축약형("I", "the", "a", "don\'t" 등)의 무분별한 문법 하이라이트를 제거하여 개별 단어 사전 검색 및 단어장 저장을 원활하게 지원',
            '정밀한 CEFR 영어 문법 패턴 감지: 완료 시제, 조동사 완료형, 상관 접속사 등 실제 CEFR 영어 문법 구문을 정확한 토큰 범위로 깔끔하게 감지'
        ],
        zh: [
            '引入NLP驱动的英语形态分词：深度集成Compromise NLP分词引擎，提供词性标注（POS）与原型还原（baseForm），达到日韩语同等精细度',
            '彻底消除日常词汇过度标记：移除代词、冠词、缩写词（如 "I", "the", "a", "don\'t" 等）的虚假语法高亮，确保单词独立可点、精准查词与收藏',
            '高精度CEFR英语语法模式识别：智能捕获完成时态、情态动词完成式、相关并列连词等核心语法结构，标点与空格不再误入高亮区间'
        ]
    }
};

/**
 * Extract localized highlights with English fallback
 */
export function getLocalizedHighlights(
    highlights: Record<string, string[]> | undefined | null,
    langCode: string
): string[] {
    if (!highlights) {
        return [];
    }

    const normalizedLang = langCode.toLowerCase().split('-')[0];
    if (highlights[normalizedLang] && highlights[normalizedLang].length > 0) {
        return highlights[normalizedLang];
    }

    return highlights['en'] || [];
}

/**
 * Compare two semver strings (e.g. "1.0.0" vs "1.1.0").
 * Returns true if v1 is strictly older than v2.
 */
export function isVersionOlder(v1: string, v2: string): boolean {
    const parse = (v: string) => v.replace(/^v/, '').split('.').map(n => parseInt(n, 10) || 0);
    const p1 = parse(v1);
    const p2 = parse(v2);

    for (let i = 0; i < Math.max(p1.length, p2.length); i++) {
        const n1 = p1[i] || 0;
        const n2 = p2[i] || 0;
        if (n1 < n2) return true;
        if (n1 > n2) return false;
    }
    return false;
}

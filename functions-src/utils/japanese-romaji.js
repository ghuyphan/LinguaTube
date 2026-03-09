const DIGRAPH_MAP = {
    きゃ: 'kya',
    きゅ: 'kyu',
    きょ: 'kyo',
    ぎゃ: 'gya',
    ぎゅ: 'gyu',
    ぎょ: 'gyo',
    しゃ: 'sha',
    しゅ: 'shu',
    しょ: 'sho',
    じゃ: 'ja',
    じゅ: 'ju',
    じょ: 'jo',
    ちゃ: 'cha',
    ちゅ: 'chu',
    ちょ: 'cho',
    にゃ: 'nya',
    にゅ: 'nyu',
    にょ: 'nyo',
    ひゃ: 'hya',
    ひゅ: 'hyu',
    ひょ: 'hyo',
    びゃ: 'bya',
    びゅ: 'byu',
    びょ: 'byo',
    ぴゃ: 'pya',
    ぴゅ: 'pyu',
    ぴょ: 'pyo',
    みゃ: 'mya',
    みゅ: 'myu',
    みょ: 'myo',
    りゃ: 'rya',
    りゅ: 'ryu',
    りょ: 'ryo',
    うぃ: 'wi',
    うぇ: 'we',
    うぉ: 'wo',
    う゛ぁ: 'va',
    う゛ぃ: 'vi',
    う゛ぇ: 've',
    う゛ぉ: 'vo',
    う゛ゅ: 'vyu',
    ふぁ: 'fa',
    ふぃ: 'fi',
    ふぇ: 'fe',
    ふぉ: 'fo',
    ふゅ: 'fyu',
    てぃ: 'ti',
    でぃ: 'di',
    とぅ: 'tu',
    どぅ: 'du',
    ちぇ: 'che',
    しぇ: 'she',
    じぇ: 'je',
    つぁ: 'tsa',
    つぃ: 'tsi',
    つぇ: 'tse',
    つぉ: 'tso'
};

const MONOGRAPH_MAP = {
    あ: 'a',
    い: 'i',
    う: 'u',
    え: 'e',
    お: 'o',
    か: 'ka',
    き: 'ki',
    く: 'ku',
    け: 'ke',
    こ: 'ko',
    が: 'ga',
    ぎ: 'gi',
    ぐ: 'gu',
    げ: 'ge',
    ご: 'go',
    さ: 'sa',
    し: 'shi',
    す: 'su',
    せ: 'se',
    そ: 'so',
    ざ: 'za',
    じ: 'ji',
    ず: 'zu',
    ぜ: 'ze',
    ぞ: 'zo',
    た: 'ta',
    ち: 'chi',
    つ: 'tsu',
    て: 'te',
    と: 'to',
    だ: 'da',
    ぢ: 'ji',
    づ: 'zu',
    で: 'de',
    ど: 'do',
    な: 'na',
    に: 'ni',
    ぬ: 'nu',
    ね: 'ne',
    の: 'no',
    は: 'ha',
    ひ: 'hi',
    ふ: 'fu',
    へ: 'he',
    ほ: 'ho',
    ば: 'ba',
    び: 'bi',
    ぶ: 'bu',
    べ: 'be',
    ぼ: 'bo',
    ぱ: 'pa',
    ぴ: 'pi',
    ぷ: 'pu',
    ぺ: 'pe',
    ぽ: 'po',
    ま: 'ma',
    み: 'mi',
    む: 'mu',
    め: 'me',
    も: 'mo',
    や: 'ya',
    ゆ: 'yu',
    よ: 'yo',
    ら: 'ra',
    り: 'ri',
    る: 'ru',
    れ: 're',
    ろ: 'ro',
    わ: 'wa',
    ゐ: 'wi',
    ゑ: 'we',
    を: 'o',
    ん: 'n',
    ゔ: 'vu',
    ぁ: 'a',
    ぃ: 'i',
    ぅ: 'u',
    ぇ: 'e',
    ぉ: 'o',
    ゃ: 'ya',
    ゅ: 'yu',
    ょ: 'yo',
    ゎ: 'wa'
};

const SMALL_TSU = 'っ';
const LONG_VOWEL_MARK = 'ー';
const KANA_TEXT_REGEX = /^[\u3040-\u30FFー\s・。、？！「」『』（）〔〕［］｛｝〈〉《》【】…ー-]+$/u;

function katakanaToHiragana(text) {
    return text.replace(/[\u30A1-\u30F6]/g, (match) =>
        String.fromCharCode(match.charCodeAt(0) - 0x60)
    );
}

function getNextRomaji(source, index) {
    const current = source[index];
    const next = source[index + 1];

    if (!current) {
        return '';
    }

    const pair = next ? `${current}${next}` : current;
    if (next && DIGRAPH_MAP[pair]) {
        return DIGRAPH_MAP[pair];
    }

    return MONOGRAPH_MAP[current] || '';
}

function getConsonantForSokuon(nextRomaji) {
    if (!nextRomaji) {
        return '';
    }

    if (nextRomaji.startsWith('ch')) {
        return 'c';
    }

    const match = nextRomaji.match(/^[bcdfghjklmnpqrstvwxyz]/);
    return match ? match[0] : '';
}

function getLastVowel(text) {
    const match = text.match(/[aeiou](?!.*[aeiou])/);
    return match ? match[0] : '';
}

export function isJapaneseKanaText(text) {
    return !!text && KANA_TEXT_REGEX.test(text);
}

export function toJapaneseRomaji(text) {
    if (!text) {
        return '';
    }

    const normalized = katakanaToHiragana(text);
    let result = '';

    for (let index = 0; index < normalized.length; index += 1) {
        const current = normalized[index];

        if (current === SMALL_TSU) {
            result += getConsonantForSokuon(getNextRomaji(normalized, index + 1));
            continue;
        }

        if (current === LONG_VOWEL_MARK) {
            result += getLastVowel(result);
            continue;
        }

        const pair = normalized.slice(index, index + 2);
        const romaji = DIGRAPH_MAP[pair] || MONOGRAPH_MAP[current];

        if (!romaji) {
            result += current;
            continue;
        }

        if (pair.length === 2 && DIGRAPH_MAP[pair]) {
            index += 1;
        }

        if (romaji === 'n') {
            const nextRomaji = getNextRomaji(normalized, index + 1);
            result += /^[aeiouy]/.test(nextRomaji) ? "n'" : 'n';
            continue;
        }

        result += romaji;
    }

    return result;
}

export function getJapaneseRomaji(reading, surface) {
    const source = reading || (isJapaneseKanaText(surface) ? surface : undefined);
    if (!source) {
        return undefined;
    }

    const romaji = toJapaneseRomaji(source);
    return romaji || undefined;
}

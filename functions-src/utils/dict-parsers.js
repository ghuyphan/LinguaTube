import { getJapaneseRomaji } from './japanese-romaji.js';

/**
 * Unified Dictionary Parsers (Cloudflare Function)
 * Parser functions for various dictionary API sources
 * All parsers return a standardized format: { word, reading, definitions, partOfSpeech, ... }
 */

/**
 * Standardized dictionary entry format
 * @typedef {Object} DictEntry
 * @property {string} word - The word being defined
 * @property {string} [reading] - Reading/pronunciation (kana, pinyin, romanization)
 * @property {string} [romanization] - Latin-script pronunciation when available
 * @property {string[]} definitions - Array of definitions
 * @property {string} [partOfSpeech] - Part of speech
 * @property {number} [level] - Proficiency level (JLPT, HSK, TOPIK)
 */

/**
 * Parse Naver Korean dictionary API response
 * Used for: ko-en, ko-vi, ko-ja, ko-zh, ko-ko, ja-ko, zh-ko, en-en, en-ko, en-vi, en-ja, en-zh
 * @param {Object} data - Raw API response
 * @returns {DictEntry[]}
 */
function rawNaver(data, query = '', from = '', to = '') {
    const rawResults = data?.searchResultMap?.searchResultListMap?.WORD?.items || [];
    const cleanQuery = normalizeDictionaryText(query).toLowerCase();
    const isHangulQuery = /[\uAC00-\uD7AF]/.test(cleanQuery);
    const isAsciiQuery = /^[a-z]+$/i.test(cleanQuery);
    const headword = item => normalizeDictionaryText((item.handleEntry || item.expEntry || '').replace(/<sup[^>]*>[\s\S]*?<\/sup>/gi, ''));
    const isDirectMatch = item => {
        const h = headword(item).toLowerCase();
        if (h === cleanQuery) return true;
        if (isAsciiQuery) return false;
        return typeof item.matchType === 'string' && item.matchType.startsWith('exact:');
    };

    let filteredResults = rawResults.filter(item => {
        const h = headword(item);
        if (!h) return false;
        // Naver search can mix reverse dictionaries and other target languages.
        // The provider's languageCode is the direction of each result, not the endpoint.
        const code = String(item.languageCode || '').toLowerCase();
        if (from && !/^(?:ja|zh|ko|en|vi){2}$/.test(code)) throw new Error('Missing or invalid Naver language direction');
        if (from && code.slice(0, 2) !== from) return false;
        if (isHangulQuery && /^[a-zA-Z\s-]+$/.test(h)) return false;
        return true;
    });

    const hasMatchTypeMeta = filteredResults.some(item => typeof item.matchType === 'string' && item.matchType.length > 0);
    if (cleanQuery && hasMatchTypeMeta) {
        const eligible = filteredResults.filter(item => !String(item.matchType || '').startsWith('exact:subEntry'));
        const exactHeadwords = eligible.filter(item => headword(item).toLowerCase() === cleanQuery);
        const directMatches = exactHeadwords.length ? exactHeadwords : eligible.filter(isDirectMatch);
        if (directMatches.length > 0) {
            filteredResults = directMatches;
        } else if (isAsciiQuery || filteredResults.every(item => String(item.matchType || '').startsWith('allterm:proximity'))) {
            return [];
        }
    }

    const wordResults = cleanQuery ? [...filteredResults].sort((a, b) => {
        const aHead = headword(a);
        const bHead = headword(b);
        const aExact = aHead.toLowerCase() === cleanQuery;
        const bExact = bHead.toLowerCase() === cleanQuery;
        if (aExact !== bExact) return Number(bExact) - Number(aExact);
        if (aExact && isAsciiQuery) {
            const aLower = aHead === cleanQuery;
            const bLower = bHead === cleanQuery;
            if (aLower !== bLower) return Number(bLower) - Number(aLower);
        }
        const aPri = Number(a.priority) || 0;
        const bPri = Number(b.priority) || 0;
        if (aPri !== bPri) return bPri - aPri;
        return aExact ? (Number(a.expEntrySuperscript) || 0) - (Number(b.expEntrySuperscript) || 0) : 0;
    }) : filteredResults;

    return wordResults.slice(0, 5).map(item => {
        // 1. Extract word (strip <sup> tags first to remove homonym numbers like 사랑1)
        const word = (item.expEntry || '')
            .replace(/<sup[^>]*>[\s\S]*?<\/sup>/gi, '')
            .replace(/<[^>]+>/g, '')
            .trim();

        // 2. Extract phonetic pronunciation (searchPhoneticSymbolList holds IPA, Pinyin, or Hangul pronunciation)
        const phoneticObj = item.searchPhoneticSymbolList?.find(s => s?.symbolValue)
            || item.searchPhoneticSymbolList?.[0];
        const rawPhonetic = (phoneticObj?.symbolValue || item.phoneticSigns?.[0]?.sign || '')
            .replace(/<[^>]+>/g, '')
            .replace(/│/g, 'ˈ')
            .split(/\s*(?:;|강형|약형|美|英)\s*/)[0]
            .trim();

        let reading = '';
        if (rawPhonetic && rawPhonetic !== word) {
            // For Chinese pinyin or IPA with latin characters, keep clean without brackets
            if (/[a-zA-Z]/.test(rawPhonetic) || rawPhonetic.startsWith('/') || rawPhonetic.startsWith('[')) {
                reading = rawPhonetic;
            } else {
                // Korean pronunciation change like 학교 -> [학꾜]
                reading = `[${rawPhonetic}]`;
            }
        }

        // 3. Extract definitions and examples from meansCollector
        const definitions = [];
        const examples = [];
        const posList = [];
        let inferredPos = '';
        if (item.meansCollector) {
            item.meansCollector.forEach(collector => {
                const rawCollectorPos = (collector.partOfSpeech2 || collector.partOfSpeech || '')
                    .replace(/<[^>]+>/g, '')
                    .trim();
                if (rawCollectorPos && !posList.includes(rawCollectorPos)) {
                    posList.push(rawCollectorPos);
                }
                if (collector.means) {
                    collector.means.forEach(mean => {
                        const def = normalizeDictionaryText(mean.value);
                        if (!inferredPos) {
                            const posNote = def.match(/^(?:\(|\[)(명사|대명사|동사|형용사|부사|부사적|조사|감탄사|관형사|수사|접속사)(?:\)|\])/);
                            if (posNote) inferredPos = posNote[1];
                        }
                        const withoutParens = def
                            .replace(/\([^)]*\)|\[[^\]]*\]|（[^）]*）/g, '')
                            .replace(/[.,;:\s]+/g, '')
                            .trim();
                        if (def && withoutParens && !definitions.some(d => d.toLowerCase() === def.toLowerCase())) {
                            definitions.push(def);
                        }

                        const exOri = normalizeDictionaryText(mean.exampleOri);
                        const exTrans = normalizeDictionaryText(mean.exampleTrans);
                        if (exOri) {
                            const formatted = exTrans ? `${exOri} (${exTrans})` : exOri;
                            if (!examples.some(e => e.toLowerCase() === formatted.toLowerCase())) {
                                examples.push(formatted);
                            }
                        }
                    });
                }
            });
        }

        // 4. Fallback part of speech & proficiency level
        const partOfSpeech = posList.join(', ') || (item.partsOfSpeech ? item.partsOfSpeech.join(', ') : '') || inferredPos;
        const levelMatch = String(item.frequencyAdd || '').match(/(?:TOPIK|HSK|JLPT)\s*(\d+)/i);
        const level = levelMatch ? parseInt(levelMatch[1], 10) : undefined;

        // 5. Extract authentic audio URL (symbolFile contains pipe-delimited female|male MP3s)
        const audioObj = item.searchPhoneticSymbolList?.find(s => s?.symbolFile?.startsWith('http'))
            || item.searchPhoneticSymbolList?.[0];
        const rawSymbolFile = audioObj?.symbolFile || '';
        const symbolAudio = rawSymbolFile.startsWith('http') ? rawSymbolFile.split('|')[0].trim() : '';

        const audio = symbolAudio
            || item.searchSearchResultAudioList?.[0]?.url
            || item.searchSearchResultAudioList?.[0]?.audioUrl
            || item.phoneticSigns?.[0]?.signFile
            || item.pronFile
            || item.audioUrl
            || '';

        return {
            word,
            reading,
            definitions,
            ...(item.languageCode ? { definitionLanguage: String(item.languageCode).toLowerCase().slice(2, 4), definitionKind: 'native' } : (to ? { definitionLanguage: to, definitionKind: 'native' } : {})),
            ...(examples.length > 0 ? { examples: examples.slice(0, 3) } : {}),
            partOfSpeech,
            ...(level ? { level } : {}),
            ...(audio ? { audio } : {})
        };
    }).filter(e => e.word && e.definitions.length > 0);
}

/**
 * Parse Jotoba Japanese dictionary API response
 * Used for: ja-en
 * @param {Object} data - Raw API response from Jotoba
 * @returns {DictEntry[]}
 */
function scoreJotobaMatch(entry, query) {
    const kanji = (entry.reading?.kanji || '').toLowerCase();
    const kana = (entry.reading?.kana || '').toLowerCase();
    const misc = entry.senses?.[0]?.misc || '';
    const isUk = typeof misc === 'string' && misc.includes('UsuallyWrittenInKana');

    let score = 0;
    if (kanji === query || kana === query) {
        score = kanji === query ? 100 : 85;
    } else if (kana.startsWith(query)) {
        score = 40;
    } else {
        score = 10;
    }

    if (isUk) {
        score += 15;
    }
    if (entry.common) {
        score += 5;
    }

    return score;
}

function scoreMaziiMatch(entry, query) {
    const word = (entry.word || '').toLowerCase();
    const rawPhonetic = (entry.phonetic || entry.reading || '').toLowerCase();
    const parts = rawPhonetic.split(/[\s,、/]+/).filter(Boolean);
    const kind = (entry.means?.[0]?.kind || entry.type || '').toLowerCase();

    let score = 0;
    if (word === query) {
        score = 100;
    } else if (parts[0] === query) {
        // Primary reading exact match (e.g. 居る for いる)
        score = 85;
    } else if (parts.includes(query)) {
        // Secondary reading match (e.g. 入る for いる)
        score = 50;
    } else if (word.startsWith(query)) {
        score = 40;
    } else if (parts.some(p => p.startsWith(query))) {
        score = 30;
    } else if (word.includes(query)) {
        score = 20;
    } else {
        score = 10;
    }

    // Usually written in kana bonus
    if (kind.includes('uk')) {
        score += 15;
    }

    return score;
}

/**
 * Parse Jotoba Japanese dictionary API response
 * Used for: ja-en
 * @param {Object} data - Raw API response from Jotoba
 * @param {string} [queryWord] - Original search term for ranking relevance
 * @returns {DictEntry[]}
 */
function rawJotoba(data, queryWord = '') {
    if (!data.words || data.words.length === 0) {
        return [];
    }

    let words = data.words;
    if (queryWord && queryWord.trim()) {
        const q = queryWord.trim().toLowerCase();
        words = [...words].sort((a, b) => scoreJotobaMatch(b, q) - scoreJotobaMatch(a, q));
    }

    // Extract kanji JLPT level if available in the response

    return words.slice(0, 5).map(entry => {
        const word = entry.reading?.kanji || entry.reading?.kana || '';
        const reading = entry.reading?.kana || '';
        const romanization = getJapaneseRomaji(reading, word);

        const definitions = [];
        entry.senses?.forEach(sense => {
            if (sense.glosses) {
                definitions.push(sense.glosses.join(', '));
            }
        });

        // Parse POS from object structure [{ Verb: "Ichidan" }, { Verb: { Godan: "IkuYuku" } }] or string
        const partOfSpeech = entry.senses?.[0]?.pos
            ?.map(p => {
                if (typeof p === 'string') return p;
                if (p && typeof p === 'object') {
                    return Object.entries(p).map(([cat, sub]) => {
                        if (!sub) return cat;
                        if (typeof sub === 'string') return `${cat} (${sub})`;
                        if (typeof sub === 'object') {
                            const subKeys = Object.keys(sub);
                            return subKeys.length > 0 ? `${cat} (${subKeys[0]})` : cat;
                        }
                        return cat;
                    }).join(', ');
                }
                return '';
            })
            .filter(Boolean)
            .join(', ') || '';

        const level = entry.jlpt
            ? parseInt(String(entry.jlpt).replace(/\D/g, ''))
            : null;

        let audio = entry.audio?.url || (typeof entry.audio === 'string' ? entry.audio : '') || entry.pitch?.audio || '';
        if (audio && audio.startsWith('/')) {
            audio = `https://jotoba.de${audio}`;
        }

        return { word, reading, romanization, definitions, partOfSpeech, level, ...(audio ? { audio } : {}) };
    }).filter(e => e.word && e.definitions.length > 0);
}


/**
 * Parse Mazii Japanese-Vietnamese / Japanese-Chinese dictionary API response
 * Used for: ja-vi, ja-zh (jacn)
 * API: POST https://mazii.net/api/search with { dict: 'javi' | 'jacn', type: 'word', query: word, page: 1 }
 * Response structure: { status, found, data: [{ word, phonetic, short_mean, means: [{ mean, kind, examples }] }] }
 * @param {Object} response - Raw API response from Mazii
 * @param {string} [queryWord] - Original search term for ranking relevance
 * @returns {DictEntry[]}
 */
function rawMazii(response, queryWord = '') {
    let results = response.data || response.results || [];
    if (!results || results.length === 0) {
        return [];
    }

    if (queryWord && queryWord.trim()) {
        const q = queryWord.trim().toLowerCase();
        results = [...results].sort((a, b) => scoreMaziiMatch(b, q) - scoreMaziiMatch(a, q));
    }

    return results.slice(0, 5).map(entry => {
        const word = entry.word || '';
        const rawReading = (entry.phonetic || entry.reading || '').trim();
        const readingParts = rawReading.split(/[\s,、/]+/).filter(Boolean);
        const reading = readingParts.length > 1 ? readingParts.join(' / ') : rawReading;
        const romanization = readingParts.length > 1
            ? readingParts.map(p => getJapaneseRomaji(p, word)).filter(Boolean).join(' / ')
            : getJapaneseRomaji(reading, word);

        // Extract definitions and examples from means array or short_mean
        const definitions = [];
        const examples = [];
        const seenDefs = new Set();
        const seenExamples = new Set();

        // Primary: means array with nested mean field and examples
        if (entry.means && Array.isArray(entry.means)) {
            entry.means.forEach(m => {
                if (m.mean) {
                    const cleanMean = normalizeDictionaryText(m.mean);
                    const key = cleanMean.toLowerCase();
                    if (cleanMean && !seenDefs.has(key)) {
                        seenDefs.add(key);
                        definitions.push(cleanMean);
                    }
                }
                if (m.examples && Array.isArray(m.examples)) {
                    m.examples.forEach(ex => {
                        const content = normalizeDictionaryText(ex.content);
                        const mean = normalizeDictionaryText(ex.mean);
                        if (content) {
                            const formatted = mean ? `${content} (${mean})` : content;
                            const exKey = formatted.toLowerCase();
                            if (!seenExamples.has(exKey)) {
                                seenExamples.add(exKey);
                                examples.push(formatted);
                            }
                        }
                    });
                }
            });
        }

        // Fallback: short_mean field
        if (definitions.length === 0 && entry.short_mean) {
            definitions.push(entry.short_mean.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
        }

        // Legacy fallback: entry.mean (old format)
        if (definitions.length === 0 && entry.mean) {
            const means = entry.mean.split(/[;\n]/).map(m => m.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()).filter(Boolean);
            definitions.push(...means);
        }

        // Extract part of speech from means[0].kind or entry.type
        const partOfSpeech = entry.means?.[0]?.kind || entry.type || '';
        const rawLevel = Array.isArray(entry.level) ? entry.level[0] : entry.level;
        const level = rawLevel ? parseInt(String(rawLevel).replace(/\D/g, '')) : null;

        let audio = entry.audio || entry.phonetic_audio || '';
        if (audio && !audio.startsWith('http')) {
            audio = '';
        }

        return {
            word,
            reading,
            romanization,
            definitions,
            ...(examples.length > 0 ? { examples: examples.slice(0, 3) } : {}),
            partOfSpeech,
            level,
            ...(audio ? { audio } : {})
        };
    }).filter(e => e.word && e.definitions.length > 0);
}

/**
 * Parse Free Dictionary API response (English)
 * Used for: en-en
 * @param {Array} data - Raw API response array
 * @returns {DictEntry[]}
 */
function rawFreeDictionary(data) {
    if (!Array.isArray(data) || data.length === 0) {
        return [];
    }

    return data.slice(0, 3).map(entry => {
        const word = entry.word || '';
        const reading = entry.phonetics?.find(p => p.text)?.text || '';

        const definitions = [];
        const posList = [];

        entry.meanings?.forEach(meaning => {
            if (meaning.partOfSpeech && !posList.includes(meaning.partOfSpeech)) {
                posList.push(meaning.partOfSpeech);
            }
            meaning.definitions?.forEach(def => {
                if (def.definition) definitions.push(def.definition);
            });
        });

        const audio = entry.phonetics?.find(p => p.audio && p.audio.endsWith('.mp3'))?.audio
            || entry.phonetics?.find(p => p.audio)?.audio
            || '';

        return {
            word,
            reading,
            definitions: definitions.slice(0, 5),
            partOfSpeech: posList.join(', '),
            ...(audio ? { audio } : {})
        };
    }).filter(e => e.word && e.definitions.length > 0);
}

/**
 * Parse Datamuse API response (English definitions and synonyms)
 * Used for: en-en
 * @param {Array} data - Raw Datamuse JSON response
 * @returns {DictEntry[]}
 */
function rawDatamuse(data) {
    if (!Array.isArray(data) || data.length === 0) {
        return [];
    }

    const item = data[0];
    if (!item || !item.defs || item.defs.length === 0) {
        return [];
    }

    const defs = item.defs.map(d => d.replace(/^[a-z]+\t/, '').trim()).filter(Boolean);
    const pos = item.defs.map(d => d.match(/^([a-z]+)\t/)?.[1]).filter(Boolean);

    return [{
        word: item.word || '',
        reading: '',
        definitions: defs.slice(0, 5),
        partOfSpeech: [...new Set(pos)].join(', ')
    }];
}

/**
 * Parse MDBG Chinese dictionary HTML response
 * Used for: zh-en
 * Extracts complete headword (all characters), space-separated pinyin, clean definitions, and HSK level
 * @param {Response} response - Fetch response from MDBG
 * @param {string} [queryWord=''] - Original search term for ranking relevance
 * @returns {Promise<DictEntry[]>}
 */
async function rawMdbg(response, queryWord = '') {
    try {
        const html = await response.text();
        const entries = [];
        const rowSplits = html.split('<tr class="row">');
        const q = (queryWord || '').trim();

        for (let i = 1; i < rowSplits.length; i++) {
            const rowFragment = rowSplits[i].split('</tr>')[0];

            // 1. Extract headword: prefer otxtbot or concatenate all hanzi spans
            const otxtMatch = rowFragment.match(/<td[^>]*class="[^"]*otxtbot[^"]*"[^>]*>([\s\S]*?)<\/td>/);
            const hanziMatch = rowFragment.match(/<div class="hanzi">([\s\S]*?)<\/div>/);
            let word = '';
            if (otxtMatch && otxtMatch[1].replace(/<[^>]+>/g, '').trim()) {
                word = otxtMatch[1].replace(/<[^>]+>/g, '').trim();
            } else if (hanziMatch) {
                word = [...hanziMatch[1].matchAll(/<span[^>]*>([^<]+)<\/span>/g)]
                    .map(m => m[1].trim())
                    .join('');
            }
            if (!word) continue;

            // 2. Extract pinyin syllables (strip zero-width spaces and clean up)
            const pinyinMatch = rowFragment.match(/<div class="pinyin"[^>]*>([\s\S]*?)<\/div>/);
            const reading = pinyinMatch
                ? [...pinyinMatch[1].replace(/&#8203;|<wbr\s*\/?>/gi, '').matchAll(/<span[^>]*>([^<]+)<\/span>/g)]
                    .map(m => m[1].trim())
                    .join(' ')
                : '';

            // 3. Extract definitions: MDBG separates definitions with <strong>/</strong>,
            // while inline Chinese links inside definitions use <a ...>...</a> and <span>...</span>.
            const defsMatch = rowFragment.match(/<div class="defs">([\s\S]*?)<\/div>/);
            let definitions = [];
            if (defsMatch) {
                const rawDefs = defsMatch[1]
                    .split(/<strong>\s*\/\s*<\/strong>|\s+\/\s+/i)
                    .map(d => decodeHtmlEntities(d.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim())
                    .filter(d => d && d !== '&nbsp;');
                const nonClassifierDefs = rawDefs.filter(d => !/^(?:CL:|classifier:|also pr\.|also written\b)/i.test(d));
                definitions = nonClassifierDefs.length > 0 ? nonClassifierDefs : rawDefs;
            }

            // 4. Extract HSK level
            const hskMatch = rowFragment.match(/HSK\s*(\d+)/i);
            const level = hskMatch ? parseInt(hskMatch[1]) : null;

            if (definitions.length > 0) {
                entries.push({
                    word,
                    reading,
                    definitions: definitions.slice(0, 6),
                    partOfSpeech: '',
                    level
                });
            }
        }

        const scoreMdbgEntry = (e) => {
            let score = 0;
            if (q && e.word === q) score += 200;
            else if (q && e.word.startsWith(q)) score += 60;
            const firstDef = (e.definitions[0] || '').toLowerCase();
            const allDefsJoined = e.definitions.join(' ; ').toLowerCase();
            const isSurnameOnly = e.definitions.every(d => /^(?:surname\b|old variant of\b|variant of\b|archaic variant of\b|see\s)/i.test(d));
            const startsWithVariantOrSurname = /^(?:surname\b|old variant of\b|variant of\b|archaic variant of\b)/i.test(firstDef);
            if (!isSurnameOnly) score += 80;
            if (!startsWithVariantOrSurname) score += 40;
            // Prefer non-capitalized pinyin (common nouns/verbs vs proper nouns/surnames)
            if (e.reading && e.reading[0] === e.reading[0].toLowerCase()) score += 25;
            // Prefer entries with HSK levels (lower HSK number = more fundamental/common)
            if (typeof e.level === 'number' && e.level >= 1 && e.level <= 9) {
                score += 50 + (10 - e.level) * 5;
            }
            score += Math.min(e.definitions.length, 4) * 3;
            if (!/^(?:see\s|abbr\.\s|used in\s)/i.test(allDefsJoined)) score += 10;
            return score;
        };

        entries.sort((a, b) => scoreMdbgEntry(b) - scoreMdbgEntry(a));
        return entries.slice(0, 5);
    } catch (err) {
        console.error('[parseMdbg] parsing error:', err.message);
        return [];
    }
}

/**
 * Parse Glosbe dictionary HTML response
 * Used for: zh-vi, zh-ja, ko-vi fallback, en-vi, en-ko, en-zh
 * @param {Response} response - Fetch response from Glosbe
 * @param {string} [targetWord=''] - The word that was queried
 * @param {string} [from=''] - Source language
 * @returns {Promise<DictEntry[]>}
 */
export function decodeHtmlEntities(str) {
    if (!str || typeof str !== 'string') return '';
    const namedEntities = {
        '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&apos;': "'",
        '&nbsp;': ' ', '&iexcl;': '¡', '&cent;': '¢', '&pound;': '£', '&curren;': '¤',
        '&yen;': '¥', '&brvbar;': '¦', '&sect;': '§', '&uml;': '¨', '&copy;': '©',
        '&ordf;': 'ª', '&laquo;': '«', '&not;': '¬', '&shy;': '­', '&reg;': '®',
        '&macr;': '¯', '&deg;': '°', '&plusmn;': '±', '&sup2;': '²', '&sup3;': '³',
        '&acute;': '´', '&micro;': 'µ', '&para;': '¶', '&middot;': '·', '&cedil;': '¸',
        '&sup1;': '¹', '&ordm;': 'º', '&raquo;': '»', '&frac14;': '¼', '&frac12;': '½',
        '&frac34;': '¾', '&iquest;': '¿', '&Agrave;': 'À', '&Aacute;': 'Á', '&Acirc;': 'Â',
        '&Atilde;': 'Ã', '&Auml;': 'Ä', '&Aring;': 'Å', '&AElig;': 'Æ', '&Ccedil;': 'Ç',
        '&Egrave;': 'È', '&Eacute;': 'É', '&Ecirc;': 'Ê', '&Euml;': 'Ë', '&Igrave;': 'Ì',
        '&Iacute;': 'Í', '&Icirc;': 'Î', '&Iuml;': 'Ï', '&ETH;': 'Ð', '&Ntilde;': 'Ñ',
        '&Ograve;': 'Ò', '&Oacute;': 'Ó', '&Ocirc;': 'Ô', '&Otilde;': 'Õ', '&Ouml;': 'Ö',
        '&times;': '×', '&Oslash;': 'Ø', '&Ugrave;': 'Ù', '&Uacute;': 'Ú', '&Ucirc;': 'Û',
        '&Uuml;': 'Ü', '&Yacute;': 'Ý', '&THORN;': 'Þ', '&szlig;': 'ß', '&agrave;': 'à',
        '&aacute;': 'á', '&acirc;': 'â', '&atilde;': 'ã', '&auml;': 'ä', '&aring;': 'å',
        '&aelig;': 'æ', '&ccedil;': 'ç', '&egrave;': 'è', '&eacute;': 'é', '&ecirc;': 'ê',
        '&euml;': 'ë', '&igrave;': 'ì', '&iacute;': 'í', '&icirc;': 'î', '&iuml;': 'ï',
        '&eth;': 'ð', '&ntilde;': 'ñ', '&ograve;': 'ò', '&oacute;': 'ó', '&ocirc;': 'ô',
        '&otilde;': 'õ', '&ouml;': 'ö', '&divide;': '÷', '&oslash;': 'ø', '&ugrave;': 'ù',
        '&uacute;': 'ú', '&ucirc;': 'û', '&uuml;': 'ü', '&yacute;': 'ý', '&thorn;': 'þ',
        '&yuml;': 'ÿ'
    };

    return str
        .replace(/&#(\d+);/g, (_, code) => safeCodePoint(parseInt(code, 10)))
        .replace(/&#x([0-9a-f]+);/gi, (_, hex) => safeCodePoint(parseInt(hex, 16)))
        .replace(/&[a-z0-9]+;/gi, match => namedEntities[match] || match);
}

async function rawGlosbe(response, targetWord = '', from = '') {
    try {
        const html = await response.text();
        const entries = [];
        const seenDefs = new Set();
        const normTarget = (targetWord || '').trim().toLowerCase();

        // 1. Get individual translations from h3 tags (class contains translation__item__pharse or phrase)
        const h3Matches = [...html.matchAll(/<h3[^>]*class="[^"]*translation__item__(?:pharse|phrase)[^"]*"[^>]*>([\s\S]*?)<\/h3>/g)];
        const collectedDefs = [];
        for (const match of h3Matches) {
            const rawDef = match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
            const def = decodeHtmlEntities(rawDef).trim();
            if (!def) continue;
            const lowerDef = def.toLowerCase();
            // Reject echoed source query or overly long example sentences masquerading as headword glosses
            if (normTarget && lowerDef === normTarget) continue;
            if (def.length > 80) continue;
            if (!seenDefs.has(lowerDef)) {
                seenDefs.add(lowerDef);
                collectedDefs.push(def);
                if (collectedDefs.length >= 5) break;
            }
        }

        if (collectedDefs.length > 0) {
            entries.push({
                word: targetWord,
                reading: '',
                definitions: collectedDefs,
                partOfSpeech: ''
            });
        }

        // 2. Fallback: parse summary strictly inside <p id="content-summary">...</p>
        if (entries.length === 0) {
            const summaryPara = html.match(/<p[^>]*id="content-summary"[^>]*>([\s\S]*?)<\/p>/i);
            const summaryStrong = summaryPara?.[1]?.match(/<strong>([\s\S]*?)<\/strong>/i);
            if (summaryStrong && !/no\s+translations?/i.test(summaryPara[1])) {
                const decoded = decodeHtmlEntities(summaryStrong[1]);
                const defs = decoded
                    .split(',')
                    .map(d => d.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())
                    .filter(d => d && d.toLowerCase() !== normTarget && d.length <= 80);
                if (defs.length > 0) {
                    entries.push({
                        word: targetWord,
                        reading: '',
                        definitions: defs.slice(0, 5),
                        partOfSpeech: ''
                    });
                }
            }
        }

        // 3. Only if source is Chinese, compute pinyin
        const isChinese = from === 'zh' || (!from && targetWord && /[\u4E00-\u9FFF]/.test(targetWord) && !/[\u3040-\u30FF]/.test(targetWord));
        if (isChinese && targetWord && /[\u4E00-\u9FFF]/.test(targetWord)) {
            const { pinyin } = await import('pinyin-pro');
            const py = pinyin(targetWord, { toneType: 'symbol' });
            for (const e of entries) {
                if (!e.reading) e.reading = py;
            }
        }

        return entries.slice(0, 5);
    } catch (err) {
        console.error('[parseGlosbe] parsing error:', err.message);
        return [];
    }
}

/**
 * Parse Jisho.org API response
 * Used for: ja-en (backup), en-ja, ja-ja
 * API: GET https://jisho.org/api/v1/search/words?keyword={word}
 * @param {Object} data - Raw API response from Jisho
 * @returns {DictEntry[]}
 */
function rawJisho(data) {
    if (!data?.data || data.data.length === 0) {
        return [];
    }

    return data.data.slice(0, 5).map(entry => {
        // Get word and reading from japanese array
        const japanese = entry.japanese?.[0] || {};
        const word = japanese.word || japanese.reading || '';
        const reading = japanese.reading || '';
        const romanization = getJapaneseRomaji(reading, word);

        // Get definitions from senses
        const definitions = [];
        const partsOfSpeech = [];

        entry.senses?.forEach(sense => {
            if (sense.english_definitions) {
                definitions.push(sense.english_definitions.join(', '));
            }
            if (sense.parts_of_speech) {
                partsOfSpeech.push(...sense.parts_of_speech);
            }
        });

        const partOfSpeech = [...new Set(partsOfSpeech)].slice(0, 2).join(', ');

        // Extract JLPT level if available
        const jlptTag = entry.jlpt?.find(t => t.startsWith('jlpt-n'));
        const level = jlptTag ? parseInt(jlptTag.replace('jlpt-n', '')) : null;

        return { word, reading, romanization, definitions: definitions.slice(0, 5), partOfSpeech, level };
    }).filter(e => e.word && e.definitions.length > 0);
}

/**
 * Parse KRDICT (Korean Learners Dictionary) web page
 * Used for: ko-vi (official Korean government dictionary with Vietnamese translations)
 * URL: https://krdict.korean.go.kr/vie/dicMarinerSearch/search?nation=vie&nationCode=10&mainSearchWord={word}
 * 
 * @param {Response} response - Fetch response from KRDICT
 * @returns {Promise<DictEntry[]>}
 */
async function rawKrdict(response) {
    try {
        const html = await response.text();
        const entries = [];

        // Split by <dl> entries in search results
        const dlMatches = html.split(/<dl[\s>]/).slice(1);

        for (const dl of dlMatches) {
            if (entries.length >= 5) break;
            const dlContent = dl.split('</dl>')[0];

            // 1. Extract word from <dt> (strip <sup> homonym tags and collapse whitespace)
            const wordMatch = dlContent.match(/<span class="word_type[^"]*">([\s\S]*?)<\/span>/)
                || dlContent.match(/<dt[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/);
            const word = wordMatch
                ? wordMatch[1].replace(/<sup[^>]*>[\s\S]*?<\/sup>/gi, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
                : '';
            if (!word) continue;

            // 2. Extract pronunciation and authentic audio
            const pronMatch = dlContent.match(/<span class="search_sub">([\s\S]*?)<\/span>/);
            const rawPron = pronMatch
                ? pronMatch[1].replace(/<[^>]+>/g, '').replace(/듣기/g, '').replace(/\[|\]/g, '').replace(/\s+/g, ' ').trim()
                : '';
            const reading = rawPron ? `[${rawPron}]` : '';

            const audioMatch = dlContent.match(/fnSound(?:Play)?\('([^']+)'\)/)
                || dlContent.match(/playAudio\('([^']+)'\)/)
                || dlContent.match(/href="([^"]+\.mp3)"/);
            let audio = audioMatch ? audioMatch[1] : '';
            if (audio && !audio.startsWith('http')) {
                audio = `https://krdict.korean.go.kr${audio.startsWith('/') ? '' : '/'}${audio}`;
            }

            // 3. Extract part of speech (e.g. "Danh từ" or "명사")
            const posMatch = dlContent.match(/<span class="word_att_type1">[\s\S]*?<span class="manyLang2">([\s\S]*?)<\/span>/)
                || dlContent.match(/「([^」]+)」/);
            const partOfSpeech = posMatch ? posMatch[1].replace(/\s+/g, ' ').trim() : '';

            // 4. Extract Vietnamese definitions
            const defs = [];
            const ddMatches = [...dlContent.matchAll(/<dd[^>]*class="[^"]*manyLang2[^"]*"[^>]*>([\s\S]*?)<\/dd>/g)];
            for (const dd of ddMatches) {
                const defText = dd[1]
                    .replace(/<[^>]+>/g, '')
                    .replace(/^\s*\d+\s*\.?\s*/, '')
                    .replace(/\s+/g, ' ')
                    .trim();
                if (defText && !defs.includes(defText)) {
                    defs.push(defText);
                }
            }

            if (defs.length > 0) {
                entries.push({
                    word,
                    reading,
                    definitions: defs.slice(0, 5),
                    partOfSpeech,
                    ...(audio ? { audio } : {})
                });
            }
        }

        return entries;
    } catch (err) {
        console.error('[parseKrdict] parsing error:', err.message);
        return [];
    }
}

function safeCodePoint(value) {
    return value >= 0 && value <= 0x10ffff ? String.fromCodePoint(value) : '\uFFFD';
}

export function normalizeDictionaryText(value) {
    if (typeof value !== 'string') return '';
    let text = value;
    for (let i = 0; i < 3; i++) {
        const decoded = decodeHtmlEntities(text);
        if (decoded === text) break;
        text = decoded;
    }
    return text.replace(/<(rt|rp)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
        .replace(/<[^>]*>/g, '')
        .replace(/\{\{[^}|]*\|?\+?\s*/g, '')
        .replace(/\}\}/g, '')
        .replace(/^\(meaning=([^)]+)\)$/i, '$1')
        .replace(/\s+/g, ' ').trim();
}
const POS_CODES = Object.assign(Object.create(null), {
    noun: 'n', verb: 'v', adjective: 'adj', adverb: 'adv', interjection: 'int', pronoun: 'pn',
    preposition: 'prep', article: 'art', conjunction: 'conj', numeral: 'num', determiner: 'det',
    'boundnoun': 'n', 'dependent noun': 'n', 'auxiliary verb': 'aux', 'auxiliary adjective': 'adj',
    '名词': 'n', '名詞': 'n', '代词': 'pn', '代名詞': 'pn', '依存名詞': 'n',
    '动词': 'v', '動詞': 'v', '及物动词': 'vt', '不及物动词': 'vi', '助动词': 'aux', '助動詞': 'aux',
    '形容词': 'adj', '形容詞': 'adj', '副词': 'adv', '副詞': 'adv',
    '连词': 'conj', '接続詞': 'conj', '介词': 'prep', '助词': 'prt', '助詞': 'prt',
    '数词': 'num', '量词': 'cl', '感叹词': 'int', '感嘆詞': 'int', '感動詞': 'int',
    '下一段他動詞': 'v1, vt', '下一段自動詞': 'v1, vi', '上一段他動詞': 'v1, vt', '上一段自動詞': 'v1, vi',
    '五段活用自動詞': 'v5, vi', '五段活用他動詞': 'v5, vt',
    '명사': 'n', '의존명사': 'n', '대명사': 'pn', '수사': 'num', '관형사': 'det',
    '동사': 'v', '보조동사': 'aux', '형용사': 'adj', '보조형용사': 'adj',
    '부사': 'adv', '의문부사': 'adv', '부사적': 'adv', '감탄사': 'int',
    '전치사': 'prep', '접속사': 'conj', '관사': 'art', '조사': 'prt',
    'Danh từ': 'n', 'Danh từ phụ thuộc': 'n', 'Đại từ': 'pn',
    'Động từ': 'v', 'Trợ động từ': 'aux', 'Nội Động Từ': 'vi', 'Ngoại Động Từ': 'vt',
    'Tính từ': 'adj', 'Trạng từ': 'adv', 'Phó từ': 'adv',
    'Liên từ': 'conj', 'Giới từ': 'prep', 'Thán từ': 'int'
});
function normalizeEntries(entries) {
    return entries.map(entry => ({ ...entry,
        word: normalizeDictionaryText(entry.word), reading: normalizeDictionaryText(entry.reading),
        definitions: [...new Set(entry.definitions.map(normalizeDictionaryText).filter(Boolean))],
        partOfSpeech: (entry.partOfSpeech || '').split(/[,;/]+/).map(value => {
            const clean = normalizeDictionaryText(value); return POS_CODES[clean] || POS_CODES[clean.toLowerCase()] || clean;
        }).join(', '),
        ...(entry.examples ? { examples: entry.examples.map(example => typeof example === 'string' ? normalizeDictionaryText(example) :
            Object.fromEntries(Object.entries(example).map(([key, value]) => [key, typeof value === 'string' ? normalizeDictionaryText(value) : value]))) } : {})
    })).filter(entry => entry.word && entry.definitions.length);
}
export function parseNaver(...args) { return normalizeEntries(rawNaver(...args)); }
export function parseJotoba(...args) { return normalizeEntries(rawJotoba(...args)); }
export function parseMazii(...args) { return normalizeEntries(rawMazii(...args)); }
export function parseFreeDictionary(...args) { return normalizeEntries(rawFreeDictionary(...args)); }
export function parseDatamuse(...args) { return normalizeEntries(rawDatamuse(...args)); }
export async function parseMdbg(...args) { return normalizeEntries(await rawMdbg(...args)); }
export async function parseGlosbe(...args) { return normalizeEntries(await rawGlosbe(...args)); }
export function parseJisho(...args) { return normalizeEntries(rawJisho(...args)); }
export async function parseKrdict(...args) { return normalizeEntries(await rawKrdict(...args)); }

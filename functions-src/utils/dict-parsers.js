import { getJapaneseRomaji } from './japanese-romaji.js';
import { pinyin } from 'pinyin-pro';

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
 * Used for: ko-en, ko-vi, ko-ja, ko-zh, ko-ko
 * @param {Object} data - Raw API response
 * @returns {DictEntry[]}
 */
export function parseNaver(data) {
    const wordResults = data?.searchResultMap?.searchResultListMap?.WORD?.items || [];

    return wordResults.slice(0, 5).map(item => {
        // Extract word (handle HTML entities)
        const word = (item.expEntry || '').replace(/<[^>]+>/g, '');

        // Extract romanization/pronunciation
        const reading = (item.expEntrySuperscript || item.phoneticSigns?.[0]?.sign || '').replace(/<[^>]+>/g, '');

        // Extract definitions from meansCollector
        const definitions = [];
        if (item.meansCollector) {
            item.meansCollector.forEach(collector => {
                if (collector.means) {
                    collector.means.forEach(mean => {
                        const def = (mean.value || '').replace(/<[^>]+>/g, '').trim();
                        if (def) definitions.push(def);
                    });
                }
            });
        }

        // Extract part of speech
        const partOfSpeech = (item.sourceDictnameKo || '').replace(/<[^>]+>/g, '');

        return { word, reading, definitions, partOfSpeech };
    }).filter(e => e.word && e.definitions.length > 0);
}

/**
 * Parse Jotoba Japanese dictionary API response
 * Used for: ja-en
 * @param {Object} data - Raw API response from Jotoba
 * @returns {DictEntry[]}
 */
export function parseJotoba(data) {
    if (!data.words || data.words.length === 0) {
        return [];
    }

    return data.words.slice(0, 5).map(entry => {
        const word = entry.reading?.kanji || entry.reading?.kana || '';
        const reading = entry.reading?.kana || '';
        const romanization = getJapaneseRomaji(reading, word);

        const definitions = [];
        entry.senses?.forEach(sense => {
            if (sense.glosses) {
                definitions.push(sense.glosses.join(', '));
            }
        });

        const partOfSpeech = entry.senses?.[0]?.pos
            ?.map(p => (typeof p === 'string' ? p : p.Pretty || p.Short || ''))
            .filter(Boolean)
            .join(', ') || '';

        const level = entry.common?.jlpt ? parseInt(entry.common.jlpt) : null;

        return { word, reading, romanization, definitions, partOfSpeech, level };
    }).filter(e => e.word && e.definitions.length > 0);
}

/**
 * Parse Jotoba Japanese dictionary API response for Japanese monolingual output
 * Used for: ja-ja (Japanese definitions for Japanese words)
 * Jotoba with language: 'Japanese' returns Japanese glosses
 * @param {Object} data - Raw API response from Jotoba
 * @returns {DictEntry[]}
 */
export function parseJotobaJapanese(data) {
    if (!data.words || data.words.length === 0) {
        return [];
    }

    return data.words.slice(0, 5).map(entry => {
        const word = entry.reading?.kanji || entry.reading?.kana || '';
        const reading = entry.reading?.kana || '';
        const romanization = getJapaneseRomaji(reading, word);

        const definitions = [];
        entry.senses?.forEach(sense => {
            if (sense.glosses) {
                definitions.push(sense.glosses.join('、'));
            }
        });

        const partOfSpeech = entry.senses?.[0]?.pos
            ?.map(p => (typeof p === 'string' ? p : p.Pretty || p.Short || ''))
            .filter(Boolean)
            .join(', ') || '';

        const level = entry.common?.jlpt ? parseInt(entry.common.jlpt) : null;

        return { word, reading, romanization, definitions, partOfSpeech, level };
    }).filter(e => e.word && e.definitions.length > 0);
}

/**
 * Parse Mazii Japanese-Vietnamese dictionary API response
 * Used for: ja-vi
 * API: POST https://mazii.net/api/search with { dict: 'javi', type: 'word', query: word, page: 1 }
 * Response structure: { status, found, data: [{ word, phonetic, short_mean, means: [{ mean, kind, examples }] }] }
 * @param {Object} response - Raw API response from Mazii
 * @returns {DictEntry[]}
 */
export function parseMazii(response) {
    // Mazii returns data in 'data' field, not 'results'
    const results = response.data || response.results || [];
    if (!results || results.length === 0) {
        return [];
    }

    return results.slice(0, 5).map(entry => {
        const word = entry.word || '';
        const reading = entry.phonetic || entry.reading || '';
        const romanization = getJapaneseRomaji(reading, word);

        // Extract definitions from means array or short_mean
        const definitions = [];

        // Primary: means array with nested mean field
        if (entry.means && Array.isArray(entry.means)) {
            entry.means.forEach(m => {
                if (m.mean) {
                    // Clean up HTML and split by semicolons/newlines
                    const cleanMean = m.mean.replace(/<[^>]+>/g, '').trim();
                    if (cleanMean) definitions.push(cleanMean);
                }
            });
        }

        // Fallback: short_mean field
        if (definitions.length === 0 && entry.short_mean) {
            definitions.push(entry.short_mean);
        }

        // Legacy fallback: entry.mean (old format)
        if (definitions.length === 0 && entry.mean) {
            const means = entry.mean.split(/[;\n]/).map(m => m.trim()).filter(Boolean);
            definitions.push(...means);
        }

        // Extract part of speech from means[0].kind or entry.type
        const partOfSpeech = entry.means?.[0]?.kind || entry.type || '';
        const level = entry.level ? parseInt(String(entry.level).replace('N', '')) : null;

        return { word, reading, romanization, definitions, partOfSpeech, level };
    }).filter(e => e.word && e.definitions.length > 0);
}

/**
 * Parse Free Dictionary API response (English)
 * Used for: en-en
 * @param {Array} data - Raw API response array
 * @returns {DictEntry[]}
 */
export function parseFreeDictionary(data) {
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

        return {
            word,
            reading,
            definitions: definitions.slice(0, 5),
            partOfSpeech: posList.join(', ')
        };
    }).filter(e => e.word && e.definitions.length > 0);
}

/**
 * Parse MDBG Chinese dictionary HTML response
 * Used for: zh-en
 * Extracts complete headword (all characters), space-separated pinyin, clean definitions, and HSK level
 * @param {Response} response - Fetch response from MDBG
 * @returns {Promise<DictEntry[]>}
 */
export async function parseMdbg(response) {
    try {
        const html = await response.text();
        const entries = [];
        const rowSplits = html.split('<tr class="row">');

        for (let i = 1; i < rowSplits.length && entries.length < 5; i++) {
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

            // 2. Extract pinyin syllables (joined with spaces for readability)
            const pinyinMatch = rowFragment.match(/<div class="pinyin"[^>]*>([\s\S]*?)<\/div>/);
            const reading = pinyinMatch
                ? [...pinyinMatch[1].matchAll(/<span[^>]*>([^<]+)<\/span>/g)]
                    .map(m => m[1].trim())
                    .join(' ')
                : '';

            // 3. Extract definitions
            const defsMatch = rowFragment.match(/<div class="defs">([\s\S]*?)<\/div>/);
            let definitions = [];
            if (defsMatch) {
                definitions = defsMatch[1]
                    .replace(/<[^>]+>/g, '/')
                    .split('/')
                    .map(d => d.trim())
                    .filter(d => d && d !== '&nbsp;');
            }

            // 4. Extract HSK level
            const hskMatch = rowFragment.match(/HSK\s*(\d+)/);
            const level = hskMatch ? parseInt(hskMatch[1]) : null;

            if (definitions.length > 0) {
                entries.push({
                    word,
                    reading,
                    definitions,
                    partOfSpeech: '',
                    level
                });
            }
        }

        return entries;
    } catch (err) {
        console.error('[parseMdbg] parsing error:', err.message);
        return [];
    }
}

/**
 * Parse Glosbe dictionary HTML response
 * Used for: zh-vi, ko-vi fallback, en-vi, en-ko
 * @param {Response} response - Fetch response from Glosbe
 * @param {string} [targetWord=''] - The word that was queried
 * @returns {Promise<DictEntry[]>}
 */
export async function parseGlosbe(response, targetWord = '') {
    try {
        const html = await response.text();
        const entries = [];
        const seenDefs = new Set();

        // 1. Get individual translations from h3 tags (class contains translation__item__pharse or phrase)
        const h3Matches = [...html.matchAll(/<h3[^>]*class="[^"]*translation__item__(?:pharse|phrase)[^"]*"[^>]*>([\s\S]*?)<\/h3>/g)];
        for (const match of h3Matches) {
            const def = match[1].replace(/<[^>]+>/g, '').trim();
            if (def && !seenDefs.has(def.toLowerCase())) {
                seenDefs.add(def.toLowerCase());
                entries.push({
                    word: targetWord,
                    reading: '',
                    definitions: [def],
                    partOfSpeech: ''
                });
                if (entries.length >= 5) break;
            }
        }

        // 2. Fallback: parse summary in #content-summary
        if (entries.length === 0) {
            const summaryMatch = html.match(/id="content-summary"[\s\S]*?<strong>([\s\S]*?)<\/strong>/);
            if (summaryMatch) {
                const decoded = summaryMatch[1]
                    .replace(/&agrave;/g, 'à').replace(/&aacute;/g, 'á')
                    .replace(/&egrave;/g, 'è').replace(/&eacute;/g, 'é')
                    .replace(/&ograve;/g, 'ò').replace(/&oacute;/g, 'ó')
                    .replace(/&ugrave;/g, 'ù').replace(/&uacute;/g, 'ú')
                    .replace(/&amp;/g, '&');
                const defs = decoded.split(',').map(d => d.replace(/<[^>]+>/g, '').trim()).filter(Boolean);
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

        // 3. If targetWord has Chinese characters and reading is empty, compute pinyin
        if (targetWord && /[\u4E00-\u9FFF]/.test(targetWord)) {
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
export function parseJisho(data) {
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
export async function parseKrdict(response) {
    try {
        const html = await response.text();
        const entries = [];

        // Split by <dl> entries in search results
        const dlMatches = html.split(/<dl[\s>]/).slice(1);

        for (const dl of dlMatches) {
            if (entries.length >= 5) break;
            const dlContent = dl.split('</dl>')[0];

            // 1. Extract word from <dt>
            const wordMatch = dlContent.match(/<span class="word_type[^"]*">([\s\S]*?)<\/span>/)
                || dlContent.match(/<dt[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/);
            const word = wordMatch ? wordMatch[1].replace(/<[^>]+>/g, '').trim() : '';
            if (!word) continue;

            // 2. Extract pronunciation from search_sub (e.g. [한ː국])
            const pronMatch = dlContent.match(/<span class="search_sub">([\s\S]*?)<\/span>/);
            const reading = pronMatch
                ? pronMatch[1].replace(/<[^>]+>/g, '').replace(/듣기/g, '').replace(/\[|\]/g, '').trim()
                : '';

            // 3. Extract part of speech (e.g. "Danh từ" or "명사")
            const posMatch = dlContent.match(/<span class="word_att_type1">[\s\S]*?<span class="manyLang2">([\s\S]*?)<\/span>/)
                || dlContent.match(/「([^」]+)」/);
            const partOfSpeech = posMatch ? posMatch[1].trim() : '';

            // 4. Extract Vietnamese definitions
            const defs = [];
            const ddMatches = [...dlContent.matchAll(/<dd[^>]*class="[^"]*manyLang2[^"]*"[^>]*>([\s\S]*?)<\/dd>/g)];
            for (const dd of ddMatches) {
                const defText = dd[1].replace(/<[^>]+>/g, '').trim();
                if (defText && !defs.includes(defText)) {
                    defs.push(defText);
                }
            }

            if (defs.length > 0) {
                entries.push({
                    word,
                    reading,
                    definitions: defs.slice(0, 5),
                    partOfSpeech
                });
            }
        }

        return entries;
    } catch (err) {
        console.error('[parseKrdict] parsing error:', err.message);
        return [];
    }
}

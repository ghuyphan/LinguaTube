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
export function parseNaver(data) {
    const wordResults = data?.searchResultMap?.searchResultListMap?.WORD?.items || [];

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
        let primaryPos = '';
        if (item.meansCollector) {
            item.meansCollector.forEach(collector => {
                if (!primaryPos && (collector.partOfSpeech2 || collector.partOfSpeech)) {
                    primaryPos = (collector.partOfSpeech2 || collector.partOfSpeech)
                        .replace(/<[^>]+>/g, '')
                        .trim();
                }
                if (collector.means) {
                    collector.means.forEach(mean => {
                        const def = (mean.value || '')
                            .replace(/<[^>]+>/g, '')
                            .replace(/\s+/g, ' ')
                            .trim();
                        if (def && !definitions.some(d => d.toLowerCase() === def.toLowerCase())) {
                            definitions.push(def);
                        }

                        const exOri = (mean.exampleOri || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
                        const exTrans = (mean.exampleTrans || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
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

        // 4. Fallback part of speech
        const partOfSpeech = primaryPos || (item.partsOfSpeech ? item.partsOfSpeech.join(', ') : '');

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
            ...(examples.length > 0 ? { examples: examples.slice(0, 3) } : {}),
            partOfSpeech,
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
export function parseJotoba(data) {
    if (!data.words || data.words.length === 0) {
        return [];
    }

    // Extract kanji JLPT level if available in the response
    const kanjiJlpt = data.kanji?.find(k => k.jlpt)?.jlpt || null;

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

        // Parse POS from object structure [{ Verb: "Ichidan" }, ...] or string
        const partOfSpeech = entry.senses?.[0]?.pos
            ?.map(p => {
                if (typeof p === 'string') return p;
                if (p && typeof p === 'object') {
                    return Object.entries(p).map(([cat, sub]) => (sub ? `${cat} (${sub})` : cat)).join(', ');
                }
                return '';
            })
            .filter(Boolean)
            .join(', ') || '';

        const level = entry.jlpt
            ? parseInt(String(entry.jlpt).replace(/\D/g, ''))
            : (kanjiJlpt ? parseInt(String(kanjiJlpt).replace(/\D/g, '')) : null);

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
 * @returns {DictEntry[]}
 */
export function parseMazii(response) {
    const results = response.data || response.results || [];
    if (!results || results.length === 0) {
        return [];
    }

    return results.slice(0, 5).map(entry => {
        const word = entry.word || '';
        const reading = entry.phonetic || entry.reading || '';
        const romanization = getJapaneseRomaji(reading, word);

        // Extract definitions and examples from means array or short_mean
        const definitions = [];
        const examples = [];
        const seenDefs = new Set();
        const seenExamples = new Set();

        // Primary: means array with nested mean field and examples
        if (entry.means && Array.isArray(entry.means)) {
            entry.means.forEach(m => {
                if (m.mean) {
                    const cleanMean = m.mean.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
                    const key = cleanMean.toLowerCase();
                    if (cleanMean && !seenDefs.has(key)) {
                        seenDefs.add(key);
                        definitions.push(cleanMean);
                    }
                }
                if (m.examples && Array.isArray(m.examples)) {
                    m.examples.forEach(ex => {
                        const content = (ex.content || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
                        const mean = (ex.mean || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
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
export function parseDatamuse(data) {
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

            // 2. Extract pinyin syllables (strip zero-width spaces and clean up)
            const pinyinMatch = rowFragment.match(/<div class="pinyin"[^>]*>([\s\S]*?)<\/div>/);
            const reading = pinyinMatch
                ? [...pinyinMatch[1].replace(/&#8203;|<wbr\s*\/?>/gi, '').matchAll(/<span[^>]*>([^<]+)<\/span>/g)]
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
            const hskMatch = rowFragment.match(/HSK\s*(\d+)/i);
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
 * Used for: zh-vi, zh-ja, ko-vi fallback, en-vi, en-ko, en-zh
 * @param {Response} response - Fetch response from Glosbe
 * @param {string} [targetWord=''] - The word that was queried
 * @param {string} [from=''] - Source language
 * @returns {Promise<DictEntry[]>}
 */
export async function parseGlosbe(response, targetWord = '', from = '') {
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

import { readBoundedBody, requestSignal } from '../utils/response-body.js';
/**
 * Provider for Dictionary APIs
 */

import {
    parseNaver, parseJotoba, parseMazii, parseFreeDictionary,
    parseDatamuse, parseMdbg, parseGlosbe, parseJisho, parseKrdict
} from '../utils/dict-parsers.js';

const PRIMARY_TIMEOUT_MS = 5000;
const FALLBACK_TIMEOUT_MS = 3000;

const BROWSER_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache'
};

const DICT_SOURCES = {
    // Korean sources
    'ko-en': [{ url: 'https://en.dict.naver.com/api3/enko/search', method: 'GET', parser: 'naver', referer: 'https://en.dict.naver.com/' }],
    'ko-vi': [
        { url: 'https://ko.dict.naver.com/api3/kovi/search', method: 'GET', parser: 'naver', referer: 'https://ko.dict.naver.com/' },
        { url: 'https://krdict.korean.go.kr/vie/dicMarinerSearch/search', method: 'GET', parser: 'krdict', referer: 'https://krdict.korean.go.kr/' },
        { url: 'https://glosbe.com/ko/vi/', method: 'GET', parser: 'glosbe', referer: 'https://glosbe.com/', from: 'ko' }
    ],
    'ko-ja': [{ url: 'https://ja.dict.naver.com/api3/koja/search', method: 'GET', parser: 'naver', referer: 'https://ja.dict.naver.com/' }],
    'ko-zh': [{ url: 'https://zh.dict.naver.com/api3/kozh/search', method: 'GET', parser: 'naver', referer: 'https://zh.dict.naver.com/' }],
    'ko-ko': [{ url: 'https://ko.dict.naver.com/api3/koko/search', method: 'GET', parser: 'naver', referer: 'https://ko.dict.naver.com/' }],

    // Japanese sources
    'ja-en': [
        { url: 'https://jotoba.de/api/search/words', method: 'POST', parser: 'jotoba', contentType: 'application/json', referer: 'https://jotoba.de/' },
        { url: 'https://jisho.org/api/v1/search/words', method: 'GET', parser: 'jisho', referer: 'https://jisho.org/' }
    ],
    'ja-vi': [{ url: 'https://mazii.net/api/search', method: 'POST', parser: 'mazii', contentType: 'application/json', referer: 'https://mazii.net/', dictCode: 'javi' }],
    'ja-ko': [{ url: 'https://ko.dict.naver.com/api3/jako/search', method: 'GET', parser: 'naver', referer: 'https://ko.dict.naver.com/' }],
    'ja-zh': [
        { url: 'https://mazii.net/api/search', method: 'POST', parser: 'mazii', contentType: 'application/json', referer: 'https://mazii.net/', dictCode: 'jacn' }
    ],
    'ja-ja': [{ url: 'https://jisho.org/api/v1/search/words', method: 'GET', parser: 'jisho', referer: 'https://jisho.org/' }],

    // Chinese sources
    'zh-en': [{ url: 'https://www.mdbg.net/chinese/dictionary', method: 'GET', parser: 'mdbg', referer: 'https://www.mdbg.net/' }],
    'zh-vi': [{ url: 'https://glosbe.com/zh/vi/', method: 'GET', parser: 'glosbe', referer: 'https://glosbe.com/', from: 'zh' }],
    'zh-ko': [{ url: 'https://ko.dict.naver.com/api3/zhko/search', method: 'GET', parser: 'naver', referer: 'https://ko.dict.naver.com/' }],
    'zh-ja': [{ url: 'https://glosbe.com/zh/ja/', method: 'GET', parser: 'glosbe', referer: 'https://glosbe.com/', from: 'zh' }],
    'zh-zh': [{ url: 'https://www.mdbg.net/chinese/dictionary', method: 'GET', parser: 'mdbg', referer: 'https://www.mdbg.net/' }],

    // English sources
    'en-en': [
        { url: 'https://en.dict.naver.com/api3/enen/search', method: 'GET', parser: 'naver', referer: 'https://en.dict.naver.com/' },
        { url: 'https://api.datamuse.com/words', method: 'GET', parser: 'datamuse' },
        { url: 'https://api.dictionaryapi.dev/api/v2/entries/en/', method: 'GET', parser: 'freedict' }
    ],
    'en-vi': [
        { url: 'https://en.dict.naver.com/api3/envi/search', method: 'GET', parser: 'naver', referer: 'https://en.dict.naver.com/' },
        { url: 'https://glosbe.com/en/vi/', method: 'GET', parser: 'glosbe', referer: 'https://glosbe.com/', from: 'en' }
    ],
    'en-ja': [
        { url: 'https://en.dict.naver.com/api3/enja/search', method: 'GET', parser: 'naver', referer: 'https://en.dict.naver.com/' },
        { url: 'https://jisho.org/api/v1/search/words', method: 'GET', parser: 'jisho', referer: 'https://jisho.org/' }
    ],
    'en-ko': [{ url: 'https://en.dict.naver.com/api3/enko/search', method: 'GET', parser: 'naver', referer: 'https://en.dict.naver.com/' }],
    'en-zh': [
        { url: 'https://en.dict.naver.com/api3/enzh/search', method: 'GET', parser: 'naver', referer: 'https://en.dict.naver.com/' },
        { url: 'https://www.mdbg.net/chinese/dictionary', method: 'GET', parser: 'mdbg', referer: 'https://www.mdbg.net/' },
        { url: 'https://glosbe.com/en/zh/', method: 'GET', parser: 'glosbe', referer: 'https://glosbe.com/', from: 'en' }
    ]
};
for (const [pair, sources] of Object.entries(DICT_SOURCES)) {
    for (const source of sources) source.definitionLanguage = ['jisho', 'mdbg', 'jotoba', 'freedict', 'datamuse'].includes(source.parser) ? 'en' : pair.split('-')[1];
}

export class DictionaryProvider {
    /**
     * Get the configured sources for a language pair
     * @param {string} from 
     * @param {string} to 
     * @returns {Object[]}
     */
    getSources(from, to) {
        return DICT_SOURCES[`${from}-${to}`] || [];
    }

    /**
     * Get primary timeout configured for fetch
     */
    get primaryTimeout() {
        return PRIMARY_TIMEOUT_MS;
    }

    /**
     * Get fallback timeout configured for fetch 
     */
    get fallbackTimeout() {
        return FALLBACK_TIMEOUT_MS;
    }

    /**
     * Fetch from a specific source configuration
     */
    async fetchFromSource(source, word, timeout, parentSignal) {
        const signal = requestSignal(Date.now() + timeout, timeout, parentSignal);

        let url = source.url;
        let body = null;

        const headers = {
            ...BROWSER_HEADERS,
            'Referer': source.referer || ''
        };

        if (source.contentType) {
            headers['Content-Type'] = source.contentType;
        }

        // Build request based on source config
        switch (source.parser) {
            case 'naver':
                url = `${source.url}?query=${encodeURIComponent(word)}&m=pc&range=all`;
                break;
            case 'jotoba':
                body = JSON.stringify({ query: word, language: 'English', no_english: false });
                break;
            case 'mazii':
                body = JSON.stringify({ dict: source.dictCode || 'javi', type: 'word', query: word, page: 1 });
                break;
            case 'mdbg':
                url = `${source.url}?page=worddict&wdqt=${encodeURIComponent(word)}&wdrst=0`;
                break;
            case 'glosbe':
                url = `${source.url}${encodeURIComponent(word)}`;
                break;
            case 'freedict':
                url = `${source.url}${encodeURIComponent(word)}`;
                break;
            case 'datamuse':
                url = `${source.url}?sp=${encodeURIComponent(word)}&md=dp&max=3`;
                break;
            case 'jisho':
                url = `${source.url}?keyword=${encodeURIComponent(word)}`;
                break;
            case 'krdict':
                url = `${source.url}?nation=vie&nationCode=10&mainSearchWord=${encodeURIComponent(word)}`;
                break;
        }

        const response = await fetch(url, {
            method: source.method,
            headers,
            body,
            signal
        });

        if (!response.ok) {
            if (response.status === 404 && ['freedict', 'glosbe'].includes(source.parser)) return [];
            throw new Error(`HTTP ${response.status}`);
        }

        const bytes = await readBoundedBody(response, signal, 2 * 1024 * 1024);
        const text = new TextDecoder().decode(bytes);
        const parsedResponse = new Response(text, { headers: response.headers });
        let data;
        if (['naver','jotoba','mazii','freedict','datamuse','jisho'].includes(source.parser)) {
            data = JSON.parse(text);
            const valid = source.parser === 'naver' ? (typeof data?.searchResultMap?.searchResultListMap === 'object' && data.searchResultMap.searchResultListMap !== null) : source.parser === 'jotoba' ? Array.isArray(data?.words) :
                source.parser === 'mazii' ? (Array.isArray(data?.data || data?.results) || data?.found === 0) : source.parser === 'jisho' ? Array.isArray(data?.data) : Array.isArray(data);
            if (!valid) throw new Error('Malformed dictionary response');
        } else if (!/<html|<!doctype/i.test(text)) throw new Error('Malformed dictionary document');
        // Parse response
        switch (source.parser) {
            case 'naver': return parseNaver(data, word);
            case 'jotoba': return parseJotoba(data, word);
            case 'mazii': return parseMazii(data, word);
            case 'freedict': return parseFreeDictionary(data);
            case 'datamuse': return parseDatamuse(data);
            case 'mdbg': return checkedHtmlEntries(await parseMdbg(parsedResponse), text);
            case 'glosbe': return checkedHtmlEntries(await parseGlosbe(parsedResponse, word, source.from || ''), text);
            case 'jisho': return parseJisho(data);
            case 'krdict': return checkedHtmlEntries(await parseKrdict(parsedResponse), text);
            default: return [];
        }

    }
}

/** A changed HTML layout or challenge page is not proof that a word is absent. */
function checkedHtmlEntries(entries, text) {
    if (!entries.length && !/no (?:results?|translations?|matches)(?: (?:were )?found)?|not found|没有找到|未找到|검색 결과가 없습니다|검색된 결과가 없습니다|không tìm thấy/iu.test(text)) {
        throw new Error('Unrecognized dictionary document');
    }
    return entries;
}

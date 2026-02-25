/**
 * Provider for Dictionary APIs
 */

import {
    parseNaver, parseJotoba, parseMazii, parseFreeDictionary,
    parseMdbg, parseGlosbe, parseJisho, parseKrdict
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
    'ko-en': [{ url: 'https://en.dict.naver.com/api3/enko/search', method: 'GET', parser: 'naver', referer: 'https://en.dict.naver.com/' }],
    'ko-vi': [
        { url: 'https://krdict.korean.go.kr/vie/dicMarinerSearch/search', method: 'GET', parser: 'krdict', referer: 'https://krdict.korean.go.kr/' },
        { url: 'https://glosbe.com/ko/vi/', method: 'GET', parser: 'glosbe', referer: 'https://glosbe.com/' }
    ],
    'ko-ja': [{ url: 'https://ja.dict.naver.com/api3/koja/search', method: 'GET', parser: 'naver', referer: 'https://ja.dict.naver.com/' }],
    'ko-zh': [{ url: 'https://zh.dict.naver.com/api3/kozh/search', method: 'GET', parser: 'naver', referer: 'https://zh.dict.naver.com/' }],
    'ko-ko': [{ url: 'https://ko.dict.naver.com/api3/koko/search', method: 'GET', parser: 'naver', referer: 'https://ko.dict.naver.com/' }],

    'ja-en': [
        { url: 'https://jotoba.de/api/search/words', method: 'POST', parser: 'jotoba', contentType: 'application/json', referer: 'https://jotoba.de/' },
        { url: 'https://jisho.org/api/v1/search/words', method: 'GET', parser: 'jisho', referer: 'https://jisho.org/' }
    ],
    'ja-vi': [{ url: 'https://mazii.net/api/search', method: 'POST', parser: 'mazii', contentType: 'application/json', referer: 'https://mazii.net/' }],
    'ja-ko': [{ url: 'https://ko.dict.naver.com/api3/jako/search', method: 'GET', parser: 'naver', referer: 'https://ko.dict.naver.com/' }],
    'ja-zh': [{ url: 'https://zh.dict.naver.com/api3/jazh/search', method: 'GET', parser: 'naver', referer: 'https://zh.dict.naver.com/' }],
    'ja-ja': [{ url: 'https://jisho.org/api/v1/search/words', method: 'GET', parser: 'jisho', referer: 'https://jisho.org/' }],

    'zh-en': [{ url: 'https://www.mdbg.net/chinese/dictionary', method: 'GET', parser: 'mdbg', referer: 'https://www.mdbg.net/' }],
    'zh-vi': [{ url: 'https://glosbe.com/zh/vi/', method: 'GET', parser: 'glosbe', referer: 'https://glosbe.com/' }],
    'zh-ko': [{ url: 'https://ko.dict.naver.com/api3/zhko/search', method: 'GET', parser: 'naver', referer: 'https://ko.dict.naver.com/' }],
    'zh-ja': [{ url: 'https://ja.dict.naver.com/api3/zhja/search', method: 'GET', parser: 'naver', referer: 'https://ja.dict.naver.com/' }],

    'en-en': [{ url: 'https://api.dictionaryapi.dev/api/v2/entries/en/', method: 'GET', parser: 'freedict' }],
    'en-vi': [{ url: 'https://glosbe.com/en/vi/', method: 'GET', parser: 'glosbe', referer: 'https://glosbe.com/' }],
    'en-ja': [{ url: 'https://jisho.org/api/v1/search/words', method: 'GET', parser: 'jisho', referer: 'https://jisho.org/' }],
    'en-ko': [{ url: 'https://glosbe.com/en/ko/', method: 'GET', parser: 'glosbe', referer: 'https://glosbe.com/' }]
};

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
    async fetchFromSource(source, word, timeout) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
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
                    body = JSON.stringify({ dict: 'javi', type: 'word', query: word, page: 1 });
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
                signal: controller.signal
            });

            if (!response.ok) {
                if (response.status === 404) return [];
                throw new Error(`HTTP ${response.status}`);
            }

            // Parse response
            switch (source.parser) {
                case 'naver': return parseNaver(await response.json());
                case 'jotoba': return parseJotoba(await response.json());
                case 'mazii': return parseMazii(await response.json());
                case 'freedict': return parseFreeDictionary(await response.json());
                case 'mdbg': return await parseMdbg(response);
                case 'glosbe': return await parseGlosbe(response);
                case 'jisho': return parseJisho(await response.json());
                case 'krdict': return await parseKrdict(response);
                default: return [];
            }

        } finally {
            clearTimeout(timeoutId);
        }
    }
}

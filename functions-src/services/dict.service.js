/**
 * Service for handling Dictionary lookups and translation fallbacks
 */

export class DictionaryService {
    /**
     * @param {Object} dictionaryProvider 
     * @param {Object} translationProvider 
     */
    constructor(dictionaryProvider, translationProvider) {
        this.dictProvider = dictionaryProvider;
        this.transProvider = translationProvider;
    }

    /**
     * Fetches dictionary entries with intelligent fallback strategy:
     * 1. Start primary source(s) immediately
     * 2. For non-English targets, also start English lookup in parallel
     * 3. Use first successful result, translate English if needed
     * 
     * @param {string} word 
     * @param {string} from 
     * @param {string} to 
     * @returns {Promise<{entries: any[], source: string}>}
     */
    async fetchWithFallback(word, from, to) {
        const directSources = this.dictProvider.getSources(from, to);
        const englishSources = to !== 'en' ? this.dictProvider.getSources(from, 'en') : [];

        if (directSources.length === 0 && englishSources.length === 0) {
            return { entries: [], source: 'none' };
        }

        // Start both fetches in parallel
        const directPromise = directSources.length > 0
            ? this._fetchFromSources(directSources, word, this.dictProvider.primaryTimeout)
            : Promise.resolve(null);

        const englishPromise = englishSources.length > 0
            ? this._fetchFromSources(englishSources, word, this.dictProvider.fallbackTimeout)
            : Promise.resolve(null);

        // 1. Wait for direct sources first
        try {
            const direct = await directPromise;
            if (direct?.entries?.length > 0) {
                return { entries: direct.entries, source: direct.source };
            }
        } catch (e) {
            // Direct failed, silently fall through to English fallback
        }

        // 2. Fallback: Wait for English sources (already running in parallel)
        try {
            const english = await englishPromise;
            if (english?.entries?.length > 0) {
                const translated = await this.transProvider.translateEntries(english.entries, to);
                if (translated?.length > 0) {
                    return { entries: translated, source: `${english.source}+lingva` };
                }
                // Return English entries with [EN] prefix if translation fails
                const fallbackEntries = english.entries.map(e => ({
                    ...e,
                    definitions: e.definitions.map(d => `[EN] ${d}`)
                }));
                return { entries: fallbackEntries, source: `${english.source}+raw` };
            }
        } catch (e) {
            // English failed
        }

        return { entries: [], source: 'none' };
    }

    /**
     * Try multiple sources in order, return first successful result
     */
    async _fetchFromSources(sources, word, timeout) {
        for (const source of sources) {
            try {
                const entries = await this.dictProvider.fetchFromSource(source, word, timeout);
                if (entries?.length > 0) {
                    return { entries, source: source.parser };
                }
            } catch (e) {
                console.log(`[DictService] ${source.parser} failed:`, e.message);
                // Try next source
            }
        }
        return null;
    }
}

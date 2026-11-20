const normalizeHeadword = value => value?.normalize('NFC').trim().replace(/\s+/gu, ' ').toLowerCase();

/** Concrete source orchestration: provider failure is not a dictionary miss. */
export class DictionaryService {
    constructor(dictionaryProvider, translationProvider) {
        this.dictProvider = dictionaryProvider;
        this.transProvider = translationProvider;
    }

    async fetchWithFallback(word, from, to, { deadline = Date.now() + 12000, signal } = {}) {
        const controller = new AbortController();
        const combined = signal ? AbortSignal.any([signal, controller.signal]) : controller.signal;
        const options = { deadline, signal: combined };
        try {
            // Don't make the exact same English lookup twice.
            const directSources = this.dictProvider.getSources(from, to);
            const englishSources = to === 'en' ? [] : this.dictProvider.getSources(from, 'en')
                .filter(source => !directSources.some(direct => direct.url === source.url));
            const first = await this._fetchFromSources(directSources, word, options);
            const fallback = first.entries.length || to === 'en' ? null : await this._fetchFromSources(englishSources, word, options);
            const found = first.entries.length ? first : fallback;
            if (!found?.entries.length) return { entries: [], source: 'none', outcome: first.outcome === 'unavailable' || fallback?.outcome === 'unavailable' ? 'unavailable' : 'empty' };
            if (found === first && englishSources.length &&
                first.entries.some(entry => !entry.reading || !entry.audio || !entry.partOfSpeech || !entry.level)) {
                const engResult = await this._fetchFromSources(englishSources, word, {
                    signal: combined, deadline: Math.min(deadline, Date.now() + 400)
                });
                if (engResult.entries.length) {
                    for (const entry of found.entries) {
                        const headword = normalizeHeadword(entry.word);
                        const reading = normalizeHeadword(entry.reading);
                        const match = engResult.entries.find(candidate => {
                            const candidateReading = normalizeHeadword(candidate.reading);
                            return headword && headword === normalizeHeadword(candidate.word) &&
                                (!reading || !candidateReading || reading === candidateReading);
                        });
                        if (!match) continue;
                        if (!entry.level && match.level) entry.level = match.level;
                        if (!entry.reading && match.reading) entry.reading = match.reading;
                        if (!entry.partOfSpeech && match.partOfSpeech) entry.partOfSpeech = match.partOfSpeech;
                        if (!entry.audio && match.audio) entry.audio = match.audio;
                    }
                }
            }
            // Entries from one provider can carry different definition languages.
            // Translate homogeneous groups, retaining each original when its group fails.
            const entries = found.entries.map(entry => ({ ...entry,
                definitionLanguage: entry.definitionLanguage || found.language,
                definitionKind: entry.definitionKind || 'native'
            }));
            const groups = new Map();
            for (let i = 0; i < entries.length; i++) {
                const language = entries[i].definitionLanguage;
                if (language !== to) {
                    if (!groups.has(language)) groups.set(language, []);
                    groups.get(language).push(i);
                }
            }
            let didTranslate = false, didFallback = false;
            const translationDeadline = Math.min(deadline, Date.now() + 4000);
            await Promise.all([...groups].map(async ([language, indices]) => {
                let translated = [];
                try {
                    translated = await this.transProvider.translateEntries(indices.map(i => entries[i]), to, {
                        sourceLang: language, deadline: translationDeadline, signal: combined
                    });
                } catch { /* Retain the original definitions on translation failure. */ }
                const valid = Array.isArray(translated) && translated.length === indices.length &&
                    translated.every((entry, i) => Array.isArray(entry?.definitions) &&
                        entry.definitions.length === entries[indices[i]].definitions.length &&
                        entry.definitions.every(value => typeof value === 'string' && value.trim()));
                for (let n = 0; n < indices.length; n++) {
                    const i = indices[n];
                    const definitions = !valid ? [] : translated[n].definitions.filter(value =>
                        from !== to || normalizeHeadword(value) !== normalizeHeadword(entries[i].word));
                    if (definitions.length > 0) {
                        entries[i] = { ...translated[n], definitions: [...new Set(definitions)],
                            definitionLanguage: to, definitionKind: 'translated' };
                        didTranslate = true;
                    } else {
                        entries[i] = { ...entries[i],
                            definitions: entries[i].definitions.map(value => language === 'en' && !value.startsWith('[EN] ') ? `[EN] ${value}` : value),
                            definitionLanguage: language, definitionKind: 'fallback' };
                        didFallback = true;
                    }
                }
            }));
            return { entries, source: `${found.source}${didTranslate ? '+translated' : ''}${didFallback ? '+raw' : ''}`, outcome: 'found' };
        } finally { controller.abort(); }
    }

    async _fetchFromSources(sources, word, options) {
        let unavailable = false;
        const query = normalizeHeadword(word);
        const phrase = query?.includes(' ');
        for (const source of sources) {
            if (Date.now() >= options.deadline || options.signal.aborted) { unavailable = true; break; }
            try {
                const results = await this.dictProvider.fetchFromSource(source, word,
                    Math.min(this.dictProvider.primaryTimeout, options.deadline - Date.now()), options.signal);
                const entries = phrase ? results.filter(entry =>
                    query === normalizeHeadword(entry.word) || query === normalizeHeadword(entry.reading)) : results;
                if (entries.length) return { entries, source: source.parser, language: source.definitionLanguage, outcome: 'found' };
            } catch { unavailable = true; }
        }
        return { entries: [], outcome: unavailable ? 'unavailable' : 'empty' };
    }
}

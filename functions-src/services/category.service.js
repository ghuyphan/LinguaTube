/**
 * Video Category Classification Service
 * Canonical taxonomy mapping for authentic language learning content:
 * - anime_drama: Anime clips, dramas, animations
 * - music: Music videos, OST, covers, songs
 * - news: News broadcasts, current affairs, journalism
 * - conversation: Dialogues, podcasts, interviews, casual chat
 * - vlog: Daily life, lifestyle, travel, room tours, routines
 * - education: Grammar lectures, vocabulary guides, lessons
 * - general: Variety, entertainment, gaming, general content
 */

export const VALID_CATEGORIES = new Set([
    'anime_drama',
    'music',
    'news',
    'conversation',
    'vlog',
    'education',
    'general'
]);

/**
 * Maps YouTube genre (itemprop="genre" or category) and creator tags + title/channel into canonical category.
 * Zero external network calls (< 0.2ms).
 *
 * @param {object} params
 * @param {string} [params.title]
 * @param {string} [params.channel]
 * @param {string|null} [params.genre] - YouTube native genre (e.g. "Music", "News & Politics")
 * @param {string[]} [params.tags] - Creator tags from og:video:tag or keywords
 * @returns {string} Canonical category ID
 */
export function detectVideoCategory({ title = '', channel = '', genre = null, tags = [] } = {}) {
    const rawTitle = title || '';
    const rawChannel = channel || '';
    const rawGenre = (genre || '').trim();
    const tagList = Array.isArray(tags) ? tags : [];
    const allText = `${rawTitle} ${rawChannel} ${tagList.join(' ')}`.toLowerCase();

    // 1. Music (Genre "Music" is almost 100% authoritative on YouTube)
    if (
        rawGenre.toLowerCase() === 'music' ||
        /\b(?:mv|music\s*video|official\s*(?:video|audio|mv)|ost|bgm|cover)\b/i.test(allText) ||
        /歌ってみた|主題歌|作詞|作曲|音楽|歌词|노래|음악/i.test(allText)
    ) {
        return 'music';
    }

    // 2. Anime & Drama
    if (
        rawGenre.toLowerCase() === 'film & animation' ||
        /アニメ|anime|漫画|manga|進撃の巨人|呪術廻戦|鬼滅の刃|チェンソーマン|動漫|애니|drama|ドラマ|kdrama|cdrama|jdrama/i.test(allText) ||
        /animation|anime|toho|toei|kadokawa/i.test(rawChannel.toLowerCase())
    ) {
        return 'anime_drama';
    }

    // 3. News & Politics
    if (
        rawGenre.toLowerCase() === 'news & politics' ||
        /ニュース|news|報道|新聞|ニュース7|뉴스/i.test(allText) ||
        /nhk|annnews|fnn|tbs\s*news|日テレ|cctv|bbc|cnn|ytvnews/i.test(rawChannel.toLowerCase())
    ) {
        return 'news';
    }

    // 4. Conversation & Podcasts (High educational value for language immersion)
    if (
        /ポッドキャスト|podcast|会話|雑談|対談|インタビュー|interview|talk|日常会話|대화|聊天|talkshow/i.test(allText)
    ) {
        return 'conversation';
    }

    // 5. Vlog & Daily Life
    if (
        /\bvlog\b|日常|ルームツアー|ルーティン|一人暮らし|旅|브이로그/i.test(allText) ||
        (rawGenre.toLowerCase() === 'people & blogs' && !/conversation|talk|podcast/i.test(allText))
    ) {
        return 'vlog';
    }

    // 6. Education / Lessons
    if (
        rawGenre.toLowerCase() === 'education' ||
        /文法|単語|解説|レッスン|lesson|grammar|jlpt|hsk|topik|tutorial/i.test(allText)
    ) {
        return 'education';
    }

    return 'general';
}

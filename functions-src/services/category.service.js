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
export function detectVideoCategory({ title = '', channel = '', genre = null, tags = [], youtubeCategoryId = null } = {}) {
    const rawTitle = title || '';
    const rawChannel = channel || '';
    // Only map stable YouTube categories with a direct Voca equivalent.
    const officialGenres = { '1': 'Film & Animation', '10': 'Music', '19': 'Travel & Events', '22': 'People & Blogs', '25': 'News & Politics', '27': 'Education' };
    const rawGenre = (officialGenres[youtubeCategoryId] || genre || '').trim().toLowerCase();
    const tagList = Array.isArray(tags) ? tags : [];
    const allText = `${rawTitle} ${rawChannel} ${tagList.join(' ')}`.toLowerCase();

    // 0. Trust authoritative YouTube categories before generic title keyword heuristics
    const officialCategoryMap = {
        'music': 'music',
        'film & animation': 'anime_drama',
        'news & politics': 'news',
        'education': 'education',
        'travel & events': 'vlog'
    };
    if (officialCategoryMap[rawGenre]) {
        return officialCategoryMap[rawGenre];
    }

    // 1. Music
    if (
        /\b(?:mv|m\/v|music\s*video|official\s*(?:video|audio|mv|music)|ost|bgm|cover|kara(?:oke)?|lyrics?|english\s*ver\.?)\b|the\s*first\s*take/i.test(allText) ||
        /歌ってみた|歌回|弾き語り|主題歌|のうた|作詞|作曲|音楽|歌词|노래|음악|\bsing(?:ing)?\b/i.test(allText)
    ) {
        return 'music';
    }

    // 2. Anime & Drama
    if (
        /\b(?:amv|mad)\b|アニメ|\banime\b|漫画|manga|進撃の巨人|呪術廻戦|鬼滅の刃|チェンソーマン|ドラえもん|doraemon|doremon|dorami|多啦a夢|哆啦a梦|クレヨンしんちゃん|crayon\s*shin|はなかっぱ|動漫|애니|drama|ドラマ|kdrama|cdrama|jdrama|opening\s*(?:theme|full)|第\d+話|エピソード\s*\d+|phim\s*(?:hàn|trung|nhật|hoạt\s*hình|song\s*ngữ)|hoạt\s*hình|tập\s*cuối|short\s*movie|harry\s*potter|extra\s*english\s+episode/i.test(allText) ||
        /animation|anime|toho|toei|kadokawa|ani-one|pops\s*kids/i.test(rawChannel.toLowerCase())
    ) {
        return 'anime_drama';
    }

    // 3. News & Politics
    if (
        /ニュース|\bnews\b|報道|新聞|ニュース7|뉴스/i.test(allText) ||
        /nhk|annnews|fnn|tbs\s*news|日テレ|cctv|\bbbc\s*news\b|cnn|ytvnews/i.test(rawChannel.toLowerCase())
    ) {
        return 'news';
    }

    // 4. Explicit vlog in title takes precedence over generic listening/conversation tags
    if (/\bvlog\b/i.test(rawTitle) && !/\bpodcast\b|ポッドキャスト/i.test(rawTitle)) {
        return 'vlog';
    }

    // 5. Conversation & Podcasts (High educational value for language immersion)
    if (
        /ポッドキャスト|podcast|ラジオ|\bradio\b|会話|雑談|対談|インタビュー|interview|\btalk\b|speaking\s*practice|listening\s*practice|日常会話|대화|聊天|talkshow/i.test(allText)
    ) {
        return 'conversation';
    }

    // 6. Education / Lessons (check before People & Blogs fallback so tutorials aren't demoted to vlog)
    if (
        /文法|単語|解説|レッスン|lesson|grammar|jlpt|hsk|tocfl|topik|tutorial|learn\s+(?:japanese|english|korean|chinese)|bbc\s+learning/i.test(allText)
    ) {
        return 'education';
    }

    // 7. Vlog & Daily Life
    if (
        /\bvlog\b|日常|ルームツアー|ルーティン|一人暮らし|旅|브이로그/i.test(allText) ||
        rawGenre === 'people & blogs'
    ) {
        return 'vlog';
    }

    return 'general';
}

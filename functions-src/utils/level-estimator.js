/**
 * Server-Side Lightweight Language Level Estimator
 * 
 * Computes fast, edge-friendly proficiency levels (JLPT / HSK / TOPIK / CEFR)
 * directly from subtitle segments and metadata in < 1ms CPU time.
 * 
 * Zero external dictionary files or heavy NLP dependencies.
 * Designed for Cloudflare Pages Functions & local Node.js server.
 */

import { detectLevelFromMetadata, labelToTier, scoreToLevelLabel, scoreToTier } from '../data/video-info-db.js';

export { scoreToLevelLabel, scoreToTier };

// High-frequency English words >= 8 letters that are elementary/conversational (A1/A2/B1), not advanced C1/C2
const COMMON_A1_A2_LONG_WORDS = new Set([
    'everyone', 'everything', 'everybody', 'something', 'sometimes', 'somewhere',
    'anything', 'anywhere', 'nothing', 'together', 'remember', 'different',
    'difficult', 'important', 'beautiful', 'understand', 'hospital', 'question',
    'daughter', 'afternoon', 'yesterday', 'tomorrow', 'calendar', 'favorite',
    'umbrella', 'sandwich', 'computer', 'sentence', 'language', 'practice',
    'delicious', 'restaurant', 'interesting', 'wonderful', 'exciting', 'supermarket',
    'grandmother', 'grandfather', 'vacation', 'homework', 'classroom', 'teenager',
    'exercise', 'breakfast', 'vegetable', 'chocolate', 'basketball', 'listening',
    'watching', 'speaking', 'reading', 'studying', 'learning', 'swimming',
    'shopping', 'morning', 'evening', 'welcome', 'birthday', 'children',
    'probably', 'actually', 'suddenly', 'already', 'without', 'between',
    'comfortable', 'convenient', 'experience', 'information', 'international',
    'neighborhood', 'relationship', 'temperature', 'celebrate', 'collection'
]);

// High-frequency elementary Joyo/JLPT (N5 & N4 + basic N3) kanji set (~400 characters)
const ELEMENTARY_JA_KANJI = new Set(
    ('一二三四五六七八九十百千万円日月中火水木金土年今毎時分週午半前後上下右左中北南東西間外人男女子母父友本休何名白赤青黒色口目耳手足言見行聞食飲買入出立待会道電校語' +
    '春夏秋冬朝昼夜夕多小少暗広高长力作卖切歩走知考亲兄弟妹店海鱼空林森草犬鸟虫音乐风雪雨晴纸歌画写映旅急强弱重轻早近远明元体头脸首胸心毛病痛医屋堂室社园町駅门国寺所员始终开闭动作仕使引借问贷送受答教习勉强验' +
    '山川田野村岛岩石池湖海原波花畑林木树叶枝根竹果实米麦茶酒饭肉油盐料理菜' +
    '服着靴帽衣物布丝针袋伞箱车船机铁铜银金镜玉道街庭城宅家室窗户壁棚床' +
    '美爱恋心思情感望喜怒哀乐幸苦惊疑信想梦笑泣鸣叫呼话谈读书笔记' +
    '光影声音味香臭热冷暖温凉寒风雪云雾露霜雷电天气晴雨岚天月星空夜宵晚朝夕昼' +
    '多少大小长短高低深浅广狭重轻速迟早远近新古明暗强弱硬软柔静骚' +
    '父母兄弟姐妹亲族祖子孙夫妻男女老若君僕私彼彼女生徒仲間客主' +
    '头目耳口鼻齿舌首肩腕手足指爪胸背腰腹骨皮血心肉毛体息声泪汗唾身' +
    '犬猫鸟牛马羊猪鸡鱼虫蛇龟贝兽花草木').split('')
);

// High-frequency elementary & intermediate Chinese characters (HSK 1, 2, and 3 standard corpus)
const ELEMENTARY_ZH_CHARS = new Set(
    ('什么这是那书不我美国人她老师吗你谁哪个的呢中几有汉语一九十了岁多大女儿会写很好怎读月号日星期二四去学校习想看少五生口家元块在他椅子下面杯朋友喝茶只小狗没和爸妈能坐请点分上午三六做饭七吃前样身体太天气冷回喂李睡觉们电视吧买衣服商店后钟啊都开车来年零要王芳英最它眼睛漂亮本两喜欢运动每工作高昨给送报纸真牛奶时候过北京已经就休息还考试今兴同因为所以八半教室离机场公里明打话再让告诉叫件到从孩苹果第事情别玩手对帮助非常比哥姐可唱歌得跑快着穿西拿铅笔往直东走虽然但晴次飞起床等也早复楼带业练咖啡或者累热舒爬山影桌放感冒又瓜甜弟药现些裙越近帅清楚字找馆刚完才共汽趣刻迟差聊心跟熊猫卫矮把钱包忘左右周末般照片礼物边跳舞洗干净水先地铁除外认识网新闻听音乐算极如班鼻头发黑医院检查间定旅游关于决出声希望慢名像使被相问题解仅而且结婚收封邮即冬操步爱更正辆颜色台脑乎失当尽管却忙坚持锻炼说力重挺方法律应该课另其记首聘式紧张实原需扫房并按计划进行甚至努肯健康处远答毕城市际广特您长尤求竟流倍值价格质量虑总表选择况花估办惯及悔咱附园散泳贵系既活减肥准备赛踢此性与篮球足难道饼巧通任何成功败之终条街顺便司父母亲戚支自己调交用百历史谈确够轻由务提种改变连厉害文懂否则无论阅丰富知化伤理反全概许数偶尔议继续观察随装箱速度镜份示谢病弄搬坏沙批评俩千万鼓励言基础抬签证怕验较恐案底陪逛保合适呀敢倒容易擦趟植阳光空竞争仍深海受久接研究兄黄河歉粗填错羊肉饺命讲笑脸红季节印象湖南菜委夫妻恩入靠座位窗门居简单革巨临套吵赶立温暖括技各双队员勿内键醒乘客安顶帽举斤寒路雪闹精彩辈农村思压取峰庭陆称积蓄藏躲刘丽见替向留意似信梦背挤纷雨瞎士兵担暂砂岩砾石固产根摸尾巴盲绳棵树架钢琴静负责追草碰晚彼画借将掉瓶扔鲁迅曾孔传播遇困逐渐食限制猴龄增职幸福畏惧醉酒鸟虫味满部标夏雷阵领导代演程展严迷必递亏句初谓风科军络术赵阻止旦形平线升优主采加始拦住宁屈余露壶盖趁矿泉穷灯袋枪拉凭创硬苦专织毛墙挂品免误致某训类独义建设乡承参劳朝船疯钓鱼具撒谎沟搞白宾舍伟诗假堆厂旁筑材料营额待脆垮鸡蛋碎拾耳环利良状态嗯转密切污染区联骑整源消费构战怪抽屉乱杭州短闪突站臂抱飘云烈呼育故麻烦器修卖抖脾甲乙丙汗磁偷尝痛据洲森林窄灾睦词戒指恨顿燃番嘴翻资匆览未警拒绝挣唯曲剧吻著龙井浙江勇济须饰瞒憋虚饮汲异辉煌谅培养景秀宜统缘级阶段吸辅妨鉴缺乏普章犹劣顾愤怒绪火爆控拨访尚预蝴蝶鲜艳金翠绿紫蓝世神令禁奋响围换欲惩民苍蝇蘑菇毒姑耶稣愿归践境造罚偏危险劝租避嫌急序列超胜缩津绕圆岗页蜡烛油省磕催莫惊骗抓栏杆栽摔粉忠厚诚恳届绘迎罢注库排隐患胡付抢救姓强桃锁冲企衰退存咬愈集团遵守判互拖延购餐屡惨遭窍依永恒效潜低').split('')
);

// Advanced Korean academic & complex grammatical connectives (TOPIK 4-6)
const ADVANCED_KO_CONNECTIVES = /관련하여|대하여|통하여|불구하고|비롯하여|의하면|바람에|따르면|바에|탓에|미루어|불사하고|염두에|일환으로/g;


/**
 * Estimate language difficulty level from subtitle segments and metadata
 * 
 * @param {Array<{text?: string, start?: number, end?: number, duration?: number}>} segments
 * @param {string} lang - 'ja' | 'zh' | 'ko' | 'en'
 * @param {{title?: string, channel?: string}} [metadata]
 * @returns {{
 *   level: string,
 *   tier: 'beginner' | 'elementary' | 'intermediate' | 'upper_intermediate' | 'advanced',
 *   score: number,
 *   confidence: number,
 *   method: 'metadata' | 'server_heuristic',
 *   speechRateCpm: number,
 *   updatedAt: number
 * } | null}
 */
export function estimateTranscriptLevel(segments = [], lang = 'en', metadata = {}) {
    const cleanLang = (lang || '').toLowerCase().trim().split('-')[0].split('_')[0];
    if (!['ja', 'zh', 'ko', 'en'].includes(cleanLang)) {
        return null;
    }

    const title = metadata?.title || '';
    const channel = metadata?.channel || '';

    // Step 1: Metadata Fast-Path (Highest Confidence 0.95)
    if (title || channel) {
        const metaMatch = detectLevelFromMetadata(title, channel);
        if (metaMatch && metaMatch.lang === cleanLang) {
            const tier = labelToTier(metaMatch.level) || 'intermediate';
            let defaultScore = 2.5;
            if (tier === 'beginner') defaultScore = 1.0;
            else if (tier === 'elementary') defaultScore = 2.0;
            else if (tier === 'intermediate') defaultScore = 3.0;
            else if (tier === 'upper_intermediate') defaultScore = 4.0;
            else if (tier === 'advanced') defaultScore = 5.0;

            return {
                level: metaMatch.level,
                tier,
                score: defaultScore,
                confidence: 0.95,
                method: 'metadata',
                speechRateCpm: 0,
                updatedAt: Math.floor(Date.now() / 1000)
            };
        }
    }

    if (!Array.isArray(segments) || segments.length === 0) {
        return null;
    }

    // Step 2: Extract text, word counts, and spoken time
    let totalSpokenSeconds = 0;
    let totalChars = 0;
    let totalWords = 0;
    let totalKanji = 0;
    let compoundKanjiCount = 0;
    let totalWordLength = 0;
    let complexWordsCount = 0;
    let allText = '';

    // Stratified sample for statistical analysis (up to 80 segments)
    const sampleSegments = segments.length <= 80
        ? segments
        : (() => {
            const step = Math.floor(segments.length / 80);
            const sampled = [];
            for (let i = 0; i < segments.length && sampled.length < 80; i += step) {
                sampled.push(segments[i]);
            }
            return sampled;
        })();

    for (const seg of sampleSegments) {
        const text = (seg.text || '').trim();
        if (!text) continue;
        allText += ' ' + text;

        const dur = (seg.end != null && seg.start != null)
            ? Math.max(0.2, seg.end - seg.start)
            : Math.max(0.2, seg.duration || 1.5);
        totalSpokenSeconds += dur;

        const cleanNoSpace = text.replace(/\s+/g, '');
        totalChars += cleanNoSpace.length;

        if (cleanLang === 'ja') {
            const kanjiMatches = text.match(/[\u4E00-\u9FAF]/g);
            if (kanjiMatches) totalKanji += kanjiMatches.length;

            const compoundMatches = text.match(/[\u4E00-\u9FAF]{2,}/g);
            if (compoundMatches) compoundKanjiCount += compoundMatches.length;
        } else if (cleanLang === 'zh') {
            const idiomMatches = text.match(/[\u4E00-\u9FAF]{4}/g);
            if (idiomMatches) compoundKanjiCount += idiomMatches.length;
        } else if (cleanLang === 'ko') {
            const words = text.split(/\s+/).filter(Boolean);
            totalWords += words.length;
            for (const w of words) {
                totalWordLength += w.length;
                if (w.length >= 6) complexWordsCount++;
            }
        } else if (cleanLang === 'en') {
            const words = text.toLowerCase().match(/[a-z']+/g) || [];
            totalWords += words.length;
            for (const w of words) {
                totalWordLength += w.length;
                if (w.length >= 8 && !COMMON_A1_A2_LONG_WORDS.has(w)) {
                    complexWordsCount++;
                }
            }
        }
    }

    if (totalChars === 0 && totalWords === 0) {
        return null;
    }

    const spokenMinutes = Math.max(0.1, totalSpokenSeconds / 60);

    // Step 3: Speech Rate (CPM for CJK, WPM for English)
    const speechRate = cleanLang === 'en'
        ? Math.round(totalWords / spokenMinutes)
        : Math.round(totalChars / spokenMinutes);

    let speechRateScore = 3.0;
    if (cleanLang === 'ja') {
        if (speechRate < 150) speechRateScore = 1.0;
        else if (speechRate < 240) speechRateScore = 2.0;
        else if (speechRate < 330) speechRateScore = 3.0;
        else if (speechRate < 410) speechRateScore = 4.0;
        else speechRateScore = 5.0;
    } else if (cleanLang === 'zh') {
        if (speechRate < 180) speechRateScore = 1.0;
        else if (speechRate < 260) speechRateScore = 2.0;
        else if (speechRate < 340) speechRateScore = 3.0;
        else if (speechRate < 420) speechRateScore = 4.0;
        else speechRateScore = 5.0;
    } else if (cleanLang === 'ko') {
        if (speechRate < 200) speechRateScore = 1.0;
        else if (speechRate < 300) speechRateScore = 2.0;
        else if (speechRate < 400) speechRateScore = 3.0;
        else if (speechRate < 480) speechRateScore = 4.0;
        else speechRateScore = 5.0;
    } else if (cleanLang === 'en') {
        if (speechRate < 120) speechRateScore = 1.0;
        else if (speechRate < 165) speechRateScore = 2.0;
        else if (speechRate < 200) speechRateScore = 3.0;
        else if (speechRate < 240) speechRateScore = 4.0;
        else speechRateScore = 5.0;
    }

    // Step 4: Lexical & Structural Complexity (1.0 to 5.0/6.0)
    let lexicalScore = 2.5;
    const avgSegLen = totalChars / Math.max(1, sampleSegments.length);

    if (cleanLang === 'ja') {
        const kanjiRatio = totalChars > 0 ? totalKanji / totalChars : 0;
        const compoundRatio = sampleSegments.length > 0 ? compoundKanjiCount / sampleSegments.length : 0;

        // Count advanced kanji (kanji outside the elementary N5/N4 set)
        let advancedKanji = 0;
        for (const seg of sampleSegments) {
            const matches = (seg.text || '').match(/[\u4E00-\u9FAF]/g);
            if (matches) {
                for (const k of matches) {
                    if (!ELEMENTARY_JA_KANJI.has(k)) advancedKanji++;
                }
            }
        }
        const advKanjiRatio = totalChars > 0 ? advancedKanji / totalChars : 0;

        // Calibrate: Base score from elementary kanji density (1.0 - 2.0 max for pure N5/N4)
        lexicalScore = 1.0 + Math.min(1.0, kanjiRatio / 0.18);

        // Advanced kanji ratio pushes into intermediate (N3) and advanced (N2/N1)
        if (advKanjiRatio <= 0.02) {
            lexicalScore += (advKanjiRatio / 0.02) * 0.5; // Up to 2.5 (N5/N4)
        } else if (advKanjiRatio <= 0.06) {
            lexicalScore = 2.5 + ((advKanjiRatio - 0.02) / 0.04) * 0.9; // 2.5 - 3.4 (N3)
        } else if (advKanjiRatio <= 0.12) {
            lexicalScore = 3.4 + ((advKanjiRatio - 0.06) / 0.06) * 0.9; // 3.4 - 4.3 (N2)
        } else {
            lexicalScore = 4.3 + Math.min(0.7, (advKanjiRatio - 0.12) * 6); // 4.3 - 5.0 (N1)
        }

        if (compoundRatio > 0.9 && advKanjiRatio > 0.04) lexicalScore += 0.2;
        if (compoundRatio > 1.5 && advKanjiRatio > 0.08) lexicalScore += 0.3;
        lexicalScore = Math.min(5.0, Math.max(1.0, lexicalScore));
    } else if (cleanLang === 'zh') {
        // Measure advanced character density (characters outside the elementary HSK 1-3 corpus)
        let advancedChars = 0;
        for (const seg of sampleSegments) {
            const clean = (seg.text || '').replace(/[\s\p{P}\p{S}]/gu, '');
            for (const c of clean) {
                if (!ELEMENTARY_ZH_CHARS.has(c)) advancedChars++;
            }
        }
        const advCharRatio = totalChars > 0 ? advancedChars / totalChars : 0;
        const idiomBonus = compoundKanjiCount > 3 ? 0.8 : (compoundKanjiCount > 0 ? 0.3 : 0);

        if (advCharRatio <= 0.03) {
            lexicalScore = 1.0 + (advCharRatio / 0.03) * 1.0; // 1.0 - 2.0 (HSK 1-2)
        } else if (advCharRatio <= 0.08) {
            lexicalScore = 2.0 + ((advCharRatio - 0.03) / 0.05) * 1.2; // 2.0 - 3.2 (HSK 2-3)
        } else if (advCharRatio <= 0.16) {
            lexicalScore = 3.2 + ((advCharRatio - 0.08) / 0.08) * 1.3; // 3.2 - 4.5 (HSK 4)
        } else {
            lexicalScore = 4.5 + Math.min(1.5, (advCharRatio - 0.16) * 6); // 4.5 - 6.0 (HSK 5-6)
        }

        lexicalScore += idiomBonus;
        if (avgSegLen > 18) lexicalScore += 0.2;
        lexicalScore = Math.min(6.0, Math.max(1.0, lexicalScore));
    } else if (cleanLang === 'ko') {
        const avgWordLen = totalWords > 0 ? totalWordLength / totalWords : 3.0;
        const complexWordRatio = totalWords > 0 ? complexWordsCount / totalWords : 0;

        // Detect genuine advanced TOPIK 4-6 connectives & academic markers
        const advancedConnectivesCount = (allText.match(ADVANCED_KO_CONNECTIVES) || []).length;
        const advConnectiveBonus = advancedConnectivesCount > 3 ? 0.8 : (advancedConnectivesCount > 0 ? 0.4 : 0);

        // Calibrated Korean word length: basic conversational Korean is 2.8 - 3.6 syllables
        lexicalScore = 1.0 + Math.max(0, (avgWordLen - 3.5) * 1.0) + (complexWordRatio * 3.0) + advConnectiveBonus;
        lexicalScore = Math.min(6.0, Math.max(1.0, lexicalScore));
    } else if (cleanLang === 'en') {
        const avgWordLen = totalWords > 0 ? totalWordLength / totalWords : 4.0;
        const hardWordRatio = totalWords > 0 ? complexWordsCount / totalWords : 0;
        const wordsPerSeg = totalWords / Math.max(1, sampleSegments.length);

        // Calibrated CEFR: A1 (hardWordRatio <= 0.03) -> C1/C2 (hardWordRatio > 0.15)
        let hardScore = 0.0;
        if (hardWordRatio <= 0.04) {
            hardScore = (hardWordRatio / 0.04) * 0.8; // 0.0 - 0.8 (A1-A2)
        } else if (hardWordRatio <= 0.09) {
            hardScore = 0.8 + ((hardWordRatio - 0.04) / 0.05) * 1.2; // 0.8 - 2.0 (B1)
        } else if (hardWordRatio <= 0.16) {
            hardScore = 2.0 + ((hardWordRatio - 0.09) / 0.07) * 1.5; // 2.0 - 3.5 (B2)
        } else {
            hardScore = 3.5 + Math.min(1.5, (hardWordRatio - 0.16) * 8); // 3.5 - 5.0 (C1-C2)
        }

        lexicalScore = 1.0 + Math.max(0, (avgWordLen - 4.5) * 0.8) + hardScore;
        if (wordsPerSeg > 18) lexicalScore += 0.3;
        lexicalScore = Math.min(6.0, Math.max(1.0, lexicalScore));
    }

    // Step 5: Composite Score (65% Lexical + 35% Speech Rate)
    const compositeScore = (0.65 * lexicalScore) + (0.35 * speechRateScore);
    const finalScore = Math.round(compositeScore * 10) / 10;

    const level = scoreToLevelLabel(finalScore, cleanLang);
    const tier = scoreToTier(finalScore, cleanLang);

    // Confidence: based on cue count
    const confidence = segments.length > 50 ? 0.85 : (segments.length > 20 ? 0.80 : 0.72);

    return {
        level,
        tier,
        score: finalScore,
        confidence,
        method: 'server_heuristic',
        speechRateCpm: speechRate,
        updatedAt: Math.floor(Date.now() / 1000)
    };
}

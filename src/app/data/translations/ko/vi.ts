import { GrammarTranslation } from '../../../models/grammar.model';

export const GRAMMAR_KO_VI: Record<string, GrammarTranslation> = {
  "ko_이가_0": {
    "title": "이/가 [i/ga] (Subject markers)",
    "shortExplanation": "These are trợ từ chủ ngữ used to identify and emphasize the subject in a sentence.",
    "longExplanation": "'이/가 [i/ga]' are postpositions used trong tiếng Hàn to mark the subject of a sentence. They are attached right after a noun to indicate that the noun is the subject. The choice between '이' and '가' depends on whether the noun ends in a consonant or a vowel. If the noun ends with a consonant, '이' is used. If the noun ends with a vowel, '가' is used.",
    "formation": "Danh từ + 이/가 + rest of the sentence"
  },
  "ko_은는_1": {
    "title": "은/는 [eun/neun] (Topic markers)",
    "shortExplanation": "Used to mark the topic of a sentence or to contrast an idea or subject.",
    "longExplanation": "'은/는 [eun/neun]' are particle markers trong tiếng Hàn used to introduce or highlight the topic of a sentence. They follow a noun to indicate what the speaker is talking about, drawing attention to it. '은 [eun]' is used after words ending with a consonant, and '는 [neun]' is used after words ending with a vowel. These markers can also be used to contrast an idea, person, or thing with another.",
    "formation": "Danh từ + 은/는"
  },
  "ko_을를_2": {
    "title": "을/를 [eul/reul] (Object markers)",
    "shortExplanation": "Used to mark the object of a sentence trong tiếng Hàn.",
    "longExplanation": "'을/를 [eul/reul]' are trợ từ tân ngữ trong tiếng Hàn, indicating the object of an action in a sentence. They are used after a noun which is the object of the verb. They have no meaning on their own, but when attached to a noun, they signify that the noun is the object that the action of the verb is directed at.",
    "formation": "Danh từ + 을/를 + Động từ"
  },
  "ko_아니다_3": {
    "title": "아니다 [anida] (To not be)",
    "shortExplanation": "Dùng để diễn tả negation; 'to not be' or 'is not'.",
    "longExplanation": "'아니다 [anida]' is a negative verb used trong tiếng Hàn to indicate the non-existence or negation of something. It stands as the negative form of the verb '이다' ('to be'). '아니다' is used when the speaker wants to say a statement is incorrect or a certain condition or state is not present. This verb changes its form depending on formality and tense.",
    "formation": "Danh từ + 아니다"
  },
  "ko_예요이에요_4": {
    "title": "예요/이에요 [yeyo/ieyo] (Copula in the present tense)",
    "shortExplanation": "Dùng để biểu thị that something or someone is a certain noun in a polite way (similar to 'is/am/are').",
    "longExplanation": "'예요/이에요' are polite present-tense forms of the Korean copula '이다,' used after nouns to show identification or classification. Choose '이에요' if the noun ends in a consonant, and '예요' if the noun ends in a vowel.",
    "formation": "Danh từ + 이에요 (if ending with a consonant) / 예요 (if ending with a vowel)"
  },
  "ko_아요어요여요_5": {
    "title": "아요/어요/여요 [ayo/eoyo/yeoyo] (Verb ending in present tense)",
    "shortExplanation": "Used as a polite verb ending in the present tense for verbs and adjectives.",
    "longExplanation": "'아요/어요/여요 [ayo/eoyo/yeoyo]' are endings attached to Korean verbs or adjectives to form the present tense in a polite but not overly formal style. If the stem’s final vowel is '아' or '오', use '아요'. For all other vowels, use '어요'. When a verb ends in '하다', it typically changes to '해요' (the most common contraction of '하여요').",
    "formation": "Động từ/Tính từ stem + 아요 (if stem ends in '아' or '오') / 어요 (if stem ends in other vowels) / 해요 (if stem ends with '하다')"
  },
  "ko_고_6": {
    "title": "~고 보니 [go boni] (After doing, I noticed)",
    "shortExplanation": "Diễn tả that a realization or discovery is made after doing something.",
    "longExplanation": "The form '~고 보니' is used when one notices or realizes something new after completing an action. It often implies that the speaker did not expect this outcome before the action was done.",
    "formation": "Động từ stem + 고 보니"
  },
  "ko_하고_7": {
    "title": "하고 [hago] (And, with)",
    "shortExplanation": "Dùng để diễn tả 'and' or 'with' when connecting nouns or activities shared with someone.",
    "longExplanation": "'하고 [hago]' is a conjunction used trong tiếng Hàn to link or associate two or more nouns (similar to 'and'), or to express doing something together with someone (similar to 'with'). It implies a joint action or connection between the listed nouns or people.",
    "formation": "Danh từ 1 + 하고 + Danh từ 2"
  },
  "ko_으세요euseyoImperativeform_8": {
    "title": "(으)세요 [(eu)seyo] (Imperative form)",
    "shortExplanation": "Used to give orders, instructions, or make polite requests.",
    "longExplanation": "'(으)세요 [(eu)seyo]' is an imperative form trong tiếng Hàn used to request or command someone to do something politely. It is considered an honorific form, so it is used when speaking to someone older or of higher status, or simply to be polite. Use '세요' if the verb stem ends with a vowel, and '으세요' if the verb stem ends with a consonant.",
    "formation": "Động từ stem + 세요 (if stem’s final syllable is a vowel) / 으세요 (if stem’s final syllable is a consonant)"
  },
  "ko_으수있다eulsuitdaCando_9": {
    "title": "(으)ㄹ 수 있다 [(eu)l su itda] (Can do)",
    "shortExplanation": "This form Biểu thị the potential ability or possibility to perform something.",
    "longExplanation": "'(으)ㄹ 수 있다' is a fundamental Korean grammar point that conveys the potential ability to do something. It works like 'can' trong câu. It Biểu thị that an action is possible or that an event may occur, and also implies that the speaker (or subject) either has the ability or the permission to do the action described by the preceding verb.",
    "formation": "Động từ Stem + (으)ㄹ 수 있다"
  },
  "ko_으려고euryeogoIntentiontodo_10": {
    "title": "(으)려고 [(eu)ryeogo] (Intention to do)",
    "shortExplanation": "Dùng để diễn tả the speaker's intention or plan to do something.",
    "longExplanation": "The '(으)려고' form is used trong tiếng Hàn to express intention or a plan to do something. It can be translated roughly as 'in order to,' 'intend to,' or 'plan to.' You can use it when talking about your own intentions or other people's intentions that you know of. It often implies a future action or purposeful activity.",
    "formation": "Động từ Stem + (으)려고"
  },
  "ko_으는다eunneundaInformalstatementendings_11": {
    "title": "(으)ㄴ/는다 [(eu)n/neunda] (Informal statement endings)",
    "shortExplanation": "Used in informal or plain-style statements to make assertions or descriptions.",
    "longExplanation": "'(으)ㄴ/는다' are plain-style (informal) statement endings trong tiếng Hàn. They often appear in written narratives, diaries, or casual speech among peers. If the verb stem ends in a vowel, use 'ㄴ다.' If the verb stem ends in a consonant, use '는다.'",
    "formation": "Động từ stem + ㄴ다 (if stem ends with a vowel), Động từ stem + 는다 (if stem ends with a consonant)"
  },
  "ko_도_12": {
    "title": "도 [do] (Too, also)",
    "shortExplanation": "Dùng để biểu thị addition, similarity, or emphasis ('too', 'also', 'even').",
    "longExplanation": "'도' is a particle that means 'too,' 'also,' or 'even' depending on context. It can be attached to nouns, pronouns, or other particles, indicating that the mentioned item is in addition to or shares the same property/action as something else.",
    "formation": "Danh từ (or pronoun) + 도"
  },
  "ko_만_13": {
    "title": "만 [man] (Only)",
    "shortExplanation": "Dùng để diễn tả the concept of 'only' or 'just' trong tiếng Hàn.",
    "longExplanation": "'만' is a particle that Biểu thị exclusivity. The noun (or pronoun) before '만' is the only or the sole subject/object in the context, emphasizing that no other people, items, or circumstances apply.",
    "formation": "Danh từ + 만"
  },
  "ko_와과_14": {
    "title": "와/과 [wa/gwa] (And, with – for nouns)",
    "shortExplanation": "Used to link two nouns in a similar way to 'and' or 'with' trong câu.",
    "longExplanation": "'와/과' is a particle used to connect two nouns trong tiếng Hàn. If the final character of the first noun is a vowel, '와' is used. If it is a consonant, '과' is used. It can mean 'and' or 'with,' depending on context.",
    "formation": "Danh từ (ending in vowel) + 와 + Danh từ / Danh từ (ending in consonant) + 과 + Danh từ"
  },
  "ko_부터_15": {
    "title": "부터 [buteo] (From)",
    "shortExplanation": "Dùng để biểu thị the starting point in time or space; 'from'.",
    "longExplanation": "'부터' Biểu thị the starting point of an action, period, or range trong tiếng Hàn. It translates to 'from' trong câu. It is frequently used with time expressions (e.g., '오늘부터' = 'from today').",
    "formation": "Danh từ + 부터"
  },
  "ko_까지_16": {
    "title": "까지 [kkaji] (Until, up to)",
    "shortExplanation": "Used to mark the endpoint or limit in time, space, amount, or degree.",
    "longExplanation": "'까지' is a postposition that Biểu thị the limit or endpoint of a range trong tiếng Hàn, similar to 'until' or 'up to' trong câu. It is widely used with time expressions (e.g., '내일까지' = 'until tomorrow'), as well as physical locations or quantities.",
    "formation": "Danh từ + 까지"
  },
  "ko_아어여서_17": {
    "title": "아/어/여서 [a/eo/yeoseo] (Because, since)",
    "shortExplanation": "Used to denote a reason or cause, similar to 'because' or 'since' trong câu.",
    "longExplanation": "'아/어/여서' is a conjunctive ending that Biểu thị the reason or cause of the following clause. It is attached directly to the verb or adjective stem to show why something happened.",
    "formation": "Động từ/Tính từ Stem + 아/어/여서"
  },
  "ko_으면eumyeonIfwhen_18": {
    "title": "(으)면 [(eu)myeon] (If, when)",
    "shortExplanation": "This is generally Dùng để diễn tả 'if' or 'when'. It's employed to present conditions and the possible consequences of those conditions.",
    "longExplanation": "(으)면 [(eu)myeon] is a conditional ending trong tiếng Hàn attached to a verb or adjective stem. It can mean 'if', 'when', or 'in case'. This grammar point sets up a condition in the (으)면-clause, and the main clause explains the result or consequence that follows from that condition.",
    "formation": "Động từ/Tính từ stem + (으)면"
  },
  "ko_너무_19": {
    "title": "너무 [neomu] (Too, very)",
    "shortExplanation": "Dùng để diễn tả a high degree or extent; 'too', 'very'.",
    "longExplanation": "'너무 [neomu]' is an adverb trong tiếng Hàn that emphasizes a strong degree or intensity of something. It can mean 'too (much)' or 'very', highlighting that something goes beyond the norm or is extremely so. It typically modifies verbs or adjectives.",
    "formation": "너무 + Tính từ/Động từ"
  },
  "ko_많이_20": {
    "title": "많이 [manhi] (A lot)",
    "shortExplanation": "Dùng để diễn tả a large quantity, frequency, or degree; 'a lot', 'many', 'much'.",
    "longExplanation": "'많이 [manhi]' is an adverb that Biểu thị a large amount, frequency, or degree. It can be used with verbs, adjectives, and sometimes nouns (in certain constructions). It's similar to 'a lot' or 'much' trong câu.",
    "formation": "Động từ + 많이"
  },
  "ko_조금_21": {
    "title": "조금 [jogeum] (A little)",
    "shortExplanation": "Dùng để biểu thị a small amount or degree; 'a little', 'a bit'.",
    "longExplanation": "'조금 [jogeum]' is an adverb that describes a small or modest amount or degree. It's similar to 'a little' or 'a bit' trong câu. It can be used with verbs to reduce intensity, or with adjectives to lessen the strength of a description.",
    "formation": "조금 + Động từ/Tính từ"
  },
  "ko_다_22": {
    "title": "다 [da] (All, entirely)",
    "shortExplanation": "Dùng để diễn tả the entirety or completeness of an action or state.",
    "longExplanation": "'다 [da]' here functions as an adverb meaning 'all' or 'entirely.' It emphasizes the complete or total aspect of an action or state. In other words, everything is done or used up, or everyone/everything is involved.",
    "formation": "Động từ/Tính từ + 다 (adverb usage)"
  },
  "ko_으는데eunneundeButhowever_23": {
    "title": "(으)ㄴ/는데 [(eu)n/neunde] (But, however)",
    "shortExplanation": "Dùng để diễn tả contrast or contradiction; 'but', 'however'.",
    "longExplanation": "'(으)ㄴ/는데' is Dùng để diễn tả a contrast or introduce background information. It's similar to 'but' or 'however' trong câu, but can also be used for transitions or providing context. For verbs in the present tense, use '는데', while for descriptive verbs (adjectives), the form can be '(으)ㄴ데'.",
    "formation": "Động từ/Tính từ + (으)ㄴ/는데"
  },
  "ko_아어야_24": {
    "title": "아/어야 해요 [a/eoya haeyo] (Have to do)",
    "shortExplanation": "Dùng để diễn tả necessity or obligation; 'have to', 'must', 'should'.",
    "longExplanation": "'아/어야 해요' is used when you must or need to do something. It conveys a strong sense of requirement or obligation, similar to 'have to' or 'must' trong câu. The exact form (아, 어, or 여) depends on the final vowel of the verb stem.",
    "formation": "Động từ stem + 아/어/여 + 야 해요"
  },
  "ko_안_25": {
    "title": "안 [an] (Negation before verb/adjective)",
    "shortExplanation": "Used to negate verbs and adjectives trong tiếng Hàn; equivalent to 'not'.",
    "longExplanation": "'안 [an]' is an adverb that goes in front of a verb or adjective to negate it, similar to 'not' trong câu. It completely flips the meaning of the sentence, stating that the action or state does not happen or does not apply.",
    "formation": "안 + Động từ/Tính từ"
  },
  "ko_못_26": {
    "title": "못 [mot] (Can't, not able to)",
    "shortExplanation": "Dùng để diễn tả inability or impossibility; 'can't', 'not able to'.",
    "longExplanation": "'못 [mot]' is a Korean adverb Dùng để biểu thị an inability or impossibility to do something. This can be a physical inability, a matter of circumstance, or a lack of permission. It corresponds to 'can't' or 'not able to' trong câu and is placed directly before the verb.",
    "formation": "못 + Động từ"
  },
  "ko_아어여_27": {
    "title": "아/어/여 보다 [a/eo/yeo boda] (Try doing)",
    "shortExplanation": "Diễn tả an attempt or an experience of doing something; 'try doing'.",
    "longExplanation": "'아/어/여 보다' is used trong tiếng Hàn to show that one attempts or experiences a certain action. It is attached to an action verb stem, while the final verb '보다' takes the tense. It can also be used to describe having done something at least once in the past (an experience).",
    "formation": "Action verb + 아/어/여 보다"
  },
  "ko_지금_28": {
    "title": "지금 [jigeum] (Now)",
    "shortExplanation": "Used to refer to 'now' or the 'current moment'.",
    "longExplanation": "'지금 [jigeum]' means 'now' or 'at this moment' trong câu. It Biểu thị that the speaker is referring to the immediate present. It can be used before verbs or at the start of a sentence to emphasize current time.",
    "formation": "지금 (often used at the start of a clause or right before the verb)"
  },
  "ko_이미_29": {
    "title": "이미 [imi] (Already)",
    "shortExplanation": "Dùng để diễn tả an action that has already taken place.",
    "longExplanation": "'이미 [imi]' is an adverb meaning 'already'. It is used when an action or situation has occurred before the current moment or earlier than expected. It emphasizes that something is not new or pending, but has taken place beforehand.",
    "formation": "이미 + Động từ"
  },
  "ko_아직_30": {
    "title": "아직 [ajik] (Yet, still)",
    "shortExplanation": "Dùng để biểu thị that a condition or situation persists; 'yet', 'still'.",
    "longExplanation": "'아직 [ajik]' shows that an action or state is not finished or has not changed up to now. Có thể dịch là 'still' or 'yet' trong câu, depending on the context. It often appears in negative contexts (아직 안 했다) but can also be used more neutrally (아직 하고 있다).",
    "formation": "아직 + Động từ / Danh từ / Tính từ"
  },
  "ko_때_31": {
    "title": "때 [ttae] (When, time)",
    "shortExplanation": "Dùng để biểu thị a specific time or moment; 'when', 'at the time'.",
    "longExplanation": "'때 [ttae]' is a noun meaning 'time' or 'moment.' It is commonly attached to a verb stem (or sometimes a noun + 적 or similar forms) to indicate 'when' something happened or will happen. It's very versatile and appears in expressions like '어릴 때' (when I was young) or '시간이 없을 때' (when there is no time).",
    "formation": "Động từ stem/Danh từ + 때"
  },
  "ko_으려고하다euryeogohadaIntendtodo_32": {
    "title": "(으)려고 하다 [(eu)ryeogo hada] (Intend to do)",
    "shortExplanation": "Dùng để diễn tả the intention or plan to do something.",
    "longExplanation": "'(으)려고 하다' is used to say that someone intends or plans to do something in the future. The verb stem is followed by (으)려고, then '하다' is conjugated to show tense or politeness level. It often implies a near-future plan or deliberate intention.",
    "formation": "Động từ stem + (으)려고 하다"
  },
  "ko_처럼_33": {
    "title": "처럼 [cheoreom] (Like, as)",
    "shortExplanation": "Dùng để diễn tả similarity or comparison, like 'like' or 'as' trong câu.",
    "longExplanation": "'처럼 [cheoreom]' is a Korean particle that Diễn tả similarity to or comparison with the preceding noun. It can be read as 'like (something)' or 'as (something).' It often appears in similes or metaphors, but can also be used literally.",
    "formation": "Danh từ + 처럼"
  },
  "ko_같이_34": {
    "title": "같이 [gachi] (Together)",
    "shortExplanation": "Dùng để diễn tả 'together' or 'along with'.",
    "longExplanation": "'같이 [gachi]' is an adverb meaning 'together'. It often follows a noun (e.g., 엄마랑 같이) or appears before the verb. It emphasizes doing something in each other's company or jointly with someone else.",
    "formation": "Danh từ + 같이"
  },
  "ko_이랑irangWith_35": {
    "title": "(이)랑 [(i)rang] (With)",
    "shortExplanation": "Dùng để diễn tả 'with' or 'and' when referring to being together or doing something together.",
    "longExplanation": "'(이)랑 [(i)rang]' is a conjunctive particle used trong tiếng Hàn to denote the concept of 'with' or 'and'. It connotes a sense of togetherness, indicating that the speaker is together with someone or doing something jointly. If the noun ends with a vowel, use '랑 [rang]'; if it ends with a consonant, use '이랑 [irang]'.",
    "formation": "Vowel-ending noun + 랑, Consonant-ending noun + 이랑"
  },
  "ko_그런데_36": {
    "title": "그런데 [geureonde] (However, but)",
    "shortExplanation": "Dùng để biểu thị contrast or contradiction; 'however', 'but'.",
    "longExplanation": "'그런데 [geureonde]' is a transitional phrase used to introduce a statement that contradicts or contrasts with the previous statement. It can mean 'however', 'but', or 'though' trong câu. It often shifts the direction of the conversation or highlights an unexpected twist.",
    "formation": "Sentence + 그런데 + Sentence"
  },
  "ko_그래서_37": {
    "title": "그래서 [geuraeseo] (So, therefore)",
    "shortExplanation": "Dùng để chỉ ra a cause-and-effect relationship; 'so', 'therefore'.",
    "longExplanation": "'그래서 [geuraeseo]' is a conjunctive adverb that Biểu thị the result or conclusion of the preceding clause. It's similar to 'so' or 'therefore' trong câu. The second sentence (after '그래서') explains the logical outcome or effect of the first sentence.",
    "formation": "Sentence + 그래서 + Sentence"
  },
  "ko_그리고_38": {
    "title": "그리고 [geurigo] (And then)",
    "shortExplanation": "Used to link consecutive actions or events, often translated as 'and then'.",
    "longExplanation": "'그리고 [geurigo]' is a conjunction trong tiếng Hàn that links events or actions occurring in sequence. It implies continuation or succession, like 'and then' trong câu. It's common in narratives or step-by-step descriptions.",
    "formation": "Sentence + 그리고 + Sentence"
  },
  "ko_아어여_39": {
    "title": "아/어/여 주다 [a/eo/yeo juda] (To do for someone)",
    "shortExplanation": "Dùng để diễn tả doing an action for someone’s benefit.",
    "longExplanation": "'아/어/여 주다' is a verb ending that means doing something *for* or *on behalf of* someone else. It attaches to the verb stem (with 아/어/여 depending on the stem’s final vowel), followed by '주다'. It often suggests kindness, favor, or helping the other person.",
    "formation": "Động từ stem + 아/어/여 + 주다"
  },
  "ko_아어여_40": {
    "title": "아/어/여 하다 [a/eo/yeo hada] (To feel or show a certain emotion)",
    "shortExplanation": "Used mainly to convert adjectives (descriptive verbs) into active verbs that show one’s feeling or reaction.",
    "longExplanation": "trong tiếng Hàn, some descriptive verbs (adjectives) become active verbs when combined with '아/어/여 하다'. For example, '슬프다' (to be sad) → '슬퍼하다' (to feel or show sadness). It Biểu thị that the subject actively experiences or outwardly shows the emotion/state. This pattern is especially common with psychological or emotional adjectives.",
    "formation": "Descriptive verb stem + 아/어/여 + 하다"
  },
  "ko_의_41": {
    "title": "의 [ui] (Possessive marker)",
    "shortExplanation": "Used to denote possession or relationship; similar to '’s' trong câu.",
    "longExplanation": "The marker '의 [ui]' Biểu thị a possessive or descriptive relationship between two nouns. It is similar to English apostrophe-s ('s), or 'of' in some contexts. It can show ownership, belonging, or other relationships (e.g., family relationships, origin, material).",
    "formation": "Noun1 + 의 + Noun2"
  },
  "ko_으로euroTotowardbymeansof_42": {
    "title": "(으)로 [(eu)ro] (To, toward; by means of)",
    "shortExplanation": "Dùng để diễn tả direction, method, or transformation ('to', 'toward', 'by', 'into').",
    "longExplanation": "'(으)로 [(eu)ro]' is a Korean particle with several functions. It can indicate direction ('to/toward'), method or instrument ('by/with/using'), or transformation ('into'). After a consonant, use '으로'; after a vowel, just '로'.",
    "formation": "Danh từ + (으)로"
  },
  "ko_한테에게_43": {
    "title": "한테/에게 [hante/ege] (To someone)",
    "shortExplanation": "Dùng để biểu thị the recipient or target of an action; roughly 'to' trong câu.",
    "longExplanation": "'한테 [hante]' and '에게 [ege]' both mean 'to (a person)' trong tiếng Hàn. '에게' is slightly more formal, whereas '한테' is more colloquial. They specify to whom or to what an action is directed (e.g., giving, telling, teaching).",
    "formation": "Danh từ + 한테/에게 + Động từ"
  },
  "ko_한테서에서_44": {
    "title": "한테서/에서 [hanteseo/eseo] (From someone)",
    "shortExplanation": "Used to denote the source or origin; 'from'.",
    "longExplanation": "'한테서/에서 [hanteseo/eseo]' Biểu thị the source or place from which something (an object, idea, or action) originates. '한테서' is used when receiving something from a person, and '에서' is used for inanimate sources or places. For example, when you get a letter from a friend, you use '친구한테서'; when you borrow a book from the library, you use '도서관에서.'",
    "formation": "Danh từ + 한테서 (person) / 에서 (place or inanimate source)"
  },
  "ko_보다_45": {
    "title": "보다 [boda] (More than)",
    "shortExplanation": "Dùng để diễn tả comparison; 'more than' or simply 'than'.",
    "longExplanation": "'보다 [boda]' is a comparative marker trong tiếng Hàn. It follows the standard or benchmark being compared, while the element outside or after '보다' is the one being described as 'more' (or 'less') in some aspect. trong câu, this often corresponds to 'than' or 'more than.'",
    "formation": "Danh từ/Động từ/Tính từ + 보다 + Danh từ/Động từ/Tính từ"
  },
  "ko_가장_46": {
    "title": "가장 [gajang] (The most)",
    "shortExplanation": "Dùng để diễn tả the cấp độ so sánh nhất; 'the most', 'the best'.",
    "longExplanation": "'가장 [gajang]' is an adverb meaning 'most,' indicating the highest degree or superlative level of a characteristic. It can modify verbs, adjectives, or even some adverbs, conveying the sense of 'the most' or 'the best.'",
    "formation": "가장 + Tính từ / Adverb / Động từ"
  },
  "ko_도_47": {
    "title": "도 [do] (Even)",
    "shortExplanation": "Used to emphasize inclusion or an extreme; 'even', 'also', 'too'.",
    "longExplanation": "'도 [do]' is a particle that can mean 'too,' 'also,' or 'even,' depending on context. It often emphasizes the additional inclusion of an item or an extreme case, suggesting that the statement applies in that situation as well.",
    "formation": "Danh từ/Pronoun/Động từ + 도"
  },
  "ko_이그저_48": {
    "title": "이/그/저 [i/geu/jeo] (This, that, that over there)",
    "shortExplanation": "Dùng để biểu thị spatial relationships: 'this' (close), 'that' (far), 'that over there' (farther).",
    "longExplanation": "'이/그/저' are demonstratives trong tiếng Hàn. '이' is used for something close to the speaker ('this'), '그' for something near the listener or previously mentioned but not in the speaker's reach ('that'), and '저' for something far from both speaker and listener ('that over there').",
    "formation": "이/그/저 + Danh từ"
  },
  "ko_이나inaOr_49": {
    "title": "(이)나 [(i)na] (Or)",
    "shortExplanation": "Dùng để diễn tả alternatives; 'or'.",
    "longExplanation": "'(이)나 [(i)na]' is used after nouns (and sometimes verbs in certain constructions) to present alternatives or choices. It can be roughly translated to 'or' trong câu. For verbs, the more common form is '-거나,' but '(이)나' can appear after verbs in some contexts, especially in casual speech.",
    "formation": "Danh từ + (이)나 / Động từ + (이)나 (colloquial), Động từ + 거나 (standard for verbs)"
  },
  "ko_밖에_50": {
    "title": "밖에 [bakke] (Only, except)",
    "shortExplanation": "Dùng để diễn tả 'only' or 'nothing but', typically with a negative verb.",
    "longExplanation": "'밖에 [bakke]' is used after a noun to emphasize that there is nothing else other than the noun in question. It usually pairs with a negative verb form to convey the idea of exclusivity or limitation—similar to 'only' or 'nothing but' trong câu (e.g., '할 수밖에 없다' = 'I have no choice but to do it').",
    "formation": "Danh từ + 밖에 + (negative verb form)"
  },
  "ko_뿐_51": {
    "title": "뿐 [ppun] (Only)",
    "shortExplanation": "Used in positive sentences to express that only the stated thing is true or valid.",
    "longExplanation": "'뿐 [ppun]' is similar to '밖에', but it's used in positive sentences to say 'only' or 'just' that one thing/situation is the case—often emphasizing exclusivity without requiring a negative verb. You might also see it combined as '뿐만 아니라' meaning 'not only…but also.'",
    "formation": "Danh từ + 뿐"
  },
  "ko_는은_52": {
    "title": "는/은 것 [neun/eun geot] (The thing that…, nominalizing)",
    "shortExplanation": "Nominalizes verbs or adjectives, translating roughly as 'the act of …ing' or 'the thing that…'.",
    "longExplanation": "The construction '는/은 것 [neun/eun geot]' is used trong tiếng Hàn to turn verbs or adjectives into noun phrases—'the thing that…' or 'the act of …ing.' You use '는' after a present verb stem (e.g., '보다' → '보는 것'), and '은' after an adjective stem or a past verb stem to make it function like a noun in the sentence.",
    "formation": "Động từ/Tính từ + 는/은 것"
  },
  "ko_으는것같다eunneungeotgatdaItseemslike_53": {
    "title": "(으)ㄴ/는 것 같다 [(eu)n/neun geot gatda] (It seems like)",
    "shortExplanation": "Dùng để diễn tả a conjecture, guess, or resemblance; 'it seems like', 'it appears that'.",
    "longExplanation": "'(으)ㄴ/는 것 같다' is a common structure trong tiếng Hàn for expressing a guess or impression about a situation. With **action verbs**, '는 것 같다' typically Biểu thị a current action or a general impression; with **descriptive verbs** (adjectives) or **past tense verbs**, '(으)ㄴ 것 같다' is used. It loosely translates to 'it seems that...' or 'it looks like...'.",
    "formation": "Action verb + 는 것 같다 / Descriptive or past verb + (으)ㄴ 것 같다"
  },
  "ko_으러가다오다eureogadaodaGocometodosomething_54": {
    "title": "(으)러 가다/오다 [(eu)reo gada/oda] (Go/come to do something)",
    "shortExplanation": "Dùng để diễn tả the purpose of going or coming somewhere; 'go/come to do something'.",
    "longExplanation": "'(으)러 가다/오다' is Dùng để biểu thị **why** someone goes or comes to a location. If the verb stem ends in a consonant, you add '(으)러'; if it ends in a vowel, you add '러'. It translates to 'go/come in order to do (something)'. For instance: 가다 → 가러, 먹다 → 먹으러, 배우다 → 배우러.",
    "formation": "Consonant-ending verb stem + (으)러 가다/오다, Vowel-ending verb stem + 러 가다/오다"
  },
  "ko_아어여도_55": {
    "title": "아/어/여도 [a/eo/yeodo] (Even if)",
    "shortExplanation": "Dùng để biểu thị that a certain condition does not affect the main action or conclusion; 'even if'.",
    "longExplanation": "'아/어/여도' means 'even if' or 'even though.' It attaches to the verb stem, showing that **even if** the condition in that clause happens, the main action or state **still** occurs regardless. For example, '늦어도 (even if you’re late)' or '비가 와도 (even if it rains)'.",
    "formation": "Động từ stem + 아/어/여도"
  },
  "ko_계속_56": {
    "title": "계속 [gyesok] (Continue to)",
    "shortExplanation": "Dùng để diễn tả the ongoing or repeated nature of an action or state.",
    "longExplanation": "'계속 [gyesok]' means 'continuously' or 'keep (doing something)'. It shows that an action remains unbroken or is repeated over a period. It can also apply to states or conditions, indicating they persist without stopping.",
    "formation": "계속 + Động từ"
  },
  "ko_항상_57": {
    "title": "항상 [hangsang] (Always)",
    "shortExplanation": "Dùng để biểu thị something that happens at all times or consistently.",
    "longExplanation": "'항상 [hangsang]' is an adverb that means 'always.' It Biểu thị a repeated or continuous habit, behavior, or situation. Whether it’s past, present, or future, '항상' emphasizes the consistency or habitual nature of the action.",
    "formation": "항상 + Động từ/Tính từ"
  },
  "ko_으때eulttaeWhen_58": {
    "title": "(으)ㄹ 때 [(eu)l ttae] (When)",
    "shortExplanation": "Dùng để diễn tả 'when' something happens or a time condition.",
    "longExplanation": "'(으)ㄹ 때' corresponds to 'when' or 'at the time that' trong câu. It's used to link a time clause with the main clause, indicating when an action or state occurs. If the verb stem ends in a vowel, you add 'ㄹ 때,' and if it ends in a consonant, you add '을 때.'",
    "formation": "Động từ stem + ㄹ 때 (vowel-ending) / 을 때 (consonant-ending)"
  },
  "ko_아어여야_59": {
    "title": "아/어/여야 되다 [a/eo/yeoya doeda] (Must, have to)",
    "shortExplanation": "Dùng để diễn tả obligation or necessity; 'must', 'have to'.",
    "longExplanation": "'아/어/여야 되다' conveys an obligation or necessity, similar to 'must' or 'have to' trong câu. It is attached to the verb stem with the appropriate connector (아, 어, or 여), followed by '야 되다'. This Biểu thị the speaker believes that action is required or unavoidable.",
    "formation": "Động từ stem + 아/어/여 + 야 되다"
  },
  "ko_으면서eumyeonseoWhileand_60": {
    "title": "(으)면서 [(eu)myeonseo] (While, and)",
    "shortExplanation": "Dùng để diễn tả two actions happening at the same time; 'while doing X, doing Y'.",
    "longExplanation": "'(으)면서' shows that two actions or states occur simultaneously. If the verb stem ends in a consonant, add '으면서'; if it ends in a vowel, just '면서'. For example, 먹다 → 먹으면서, 가다 → 가면서. It can translate to 'while ~ing' trong câu.",
    "formation": "Consonant-ending verb + 으면서 / Vowel-ending verb + 면서"
  },
  "ko_다가_61": {
    "title": "다가 [daga] (And then, while)",
    "shortExplanation": "Dùng để chỉ ra that one action was interrupted or followed by another action.",
    "longExplanation": "'다가' Biểu thị that an action was in progress when another action or event occurred, often with an element of interruption or a sequence. trong câu, it might be 'while doing X, Y happened' or 'I was doing X, and then Y occurred.'",
    "formation": "Động từ stem + 다가"
  },
  "ko_아어여_62": {
    "title": "아/어/여 보이다 [a/eo/yeo boida] (Looks, seems)",
    "shortExplanation": "Dùng để diễn tả 'it seems', 'it looks like', or 'appears to be'.",
    "longExplanation": "'아/어/여 보이다' is a Korean grammar pattern that describes the appearance or impression of someone or something, based on the speaker’s observation. It can relate to either physical appearance or a perceived mood or atmosphere. trong câu, it corresponds to expressions like 'it seems...', 'it looks...', or 'it appears...'.",
    "formation": "Descriptive verb stem + 아/어/여 보이다"
  },
  "ko_아어여_63": {
    "title": "아/어/여 버리다 [a/eo/yeo beorida] (Completely, regretfully)",
    "shortExplanation": "Diễn tả that an action is done completely or with regret/surprise.",
    "longExplanation": "'아/어/여 버리다' is a grammatical form indicating that an action is carried out entirely or left a sense of regret, finality, or emotional surprise. It can mean 'to do something completely' or 'to end up doing something (with regret).' Depending on the final vowel of the verb stem, use 아, 어, or 여 before 버리다.",
    "formation": "Động từ stem + 아/어/여 버리다"
  },
  "ko_아어여_64": {
    "title": "아/어/여 놓다 [a/eo/yeo nohda] (Leave something as is)",
    "shortExplanation": "Used to describe leaving something in a certain state or condition.",
    "longExplanation": "'아/어/여 놓다' shows that after performing an action, you keep or maintain the resulting state. It implies that the speaker performed the action and deliberately left the object or situation as is. trong câu, you might say 'to leave (it) done' or 'have (it) done and left in place.'",
    "formation": "Action verb stem + 아/어/여 놓다"
  },
  "ko_아어여_65": {
    "title": "아/어/여 지다 [a/eo/yeo jida] (Become)",
    "shortExplanation": "Shows a change in state or condition, 'become' or 'get'.",
    "longExplanation": "'아/어/여 지다' describes a transformation from one state to another over time. It’s often used with descriptive verbs (adjectives) to mean 'become + adjective' (e.g., 춥다 → 추워지다 for 'to become cold'). The choice of 아/어/여 depends on the stem’s final vowel.",
    "formation": "Tính từ stem + 아/어/여 + 지다"
  },
  "ko_아어여_66": {
    "title": "아/어/여 가지다 [a/eo/yeo gajida] (Have, possess)",
    "shortExplanation": "Used when someone possesses or has certain qualities, traits, or characteristics.",
    "longExplanation": "'아/어/여 가지다' signifies that someone or something 'has' or 'possesses' a particular feature, quality, or characteristic. It’s often used with adjectives or abstract qualities, indicating the subject is endowed with or exhibits those traits.",
    "formation": "Tính từ stem + 아/어/여 + 가지다"
  },
  "ko_으는편이다eunneunpyeonidaTendto_67": {
    "title": "(으)ㄴ/는 편이다 [(eu)n/neun pyeonida] (Tend to)",
    "shortExplanation": "Used to describe someone's tendency, habit, or general characteristic.",
    "longExplanation": "The expression '(으)ㄴ/는 편이다' describes a tendency or inclination. **With descriptive verbs (adjectives), you use (으)ㄴ 편이다**, and **with action verbs, you use 는 편이다**. It translates roughly to 'I tend to…' or 'It’s rather…'. It suggests that something is generally or somewhat the case, without being absolute.",
    "formation": "Descriptive verb + (으)ㄴ 편이다 / Action verb + 는 편이다"
  },
  "ko_는은_68": {
    "title": "는/은 데 [neun/eun de] (Situation or condition)",
    "shortExplanation": "Used to describe or clarify a situation, often introducing contrasting or unexpected information.",
    "longExplanation": "'는/은 데' serves as a connector trong tiếng Hàn. It provides context or background before introducing new or contrasting information. It can translate loosely to '…but…', '…and…', or '…so…' trong câu, depending on context. The form uses '는 데' for action verbs and '은 데' for descriptive verbs or nouns.",
    "formation": "Động từ/Tính từ/Danh từ + 는/은 데 + (additional clause)"
  },
  "ko_아어여야겠다_69": {
    "title": "아/어/여야겠다 [a/eo/yeoya getda] (Should, must)",
    "shortExplanation": "Diễn tả necessity or a decision that the speaker has reached; 'I should', 'I must'.",
    "longExplanation": "'아/어/여야겠다' is used when the speaker concludes that a certain action is necessary or desirable. It can translate to 'I should…', 'I must…', or 'I’d better…'. It Diễn tả the speaker’s judgment or resolution about the action that needs to be taken.",
    "formation": "Động từ stem + 아/어/여야겠다"
  },
  "ko_아어여서는_70": {
    "title": "아/어/여서는 안 되다 [a/eo/yeoseoneun an doeda] (Must not, shouldn't)",
    "shortExplanation": "Dùng để diễn tả prohibition; 'must not', 'shouldn’t'.",
    "longExplanation": "The construction '아/어/여서는 안 되다' conveys that a certain action is forbidden or must not happen. It’s similar to 'You must not…' or 'You shouldn’t…' trong câu. Typically, we use the verb stem, attach 아/어/여서, and then add '는 안 되다.'",
    "formation": "Động từ stem + 아/어/여서 + 는 안 되다"
  },
  "ko_아어여_71": {
    "title": "아/어/여 주세요 [a/eo/yeo juseyo] (Please give/do for me)",
    "shortExplanation": "Politely request or command someone to do something for you.",
    "longExplanation": "'아/어/여 주세요' is used trong tiếng Hàn to make a **polite request** to the listener, akin to 'please do (something)' or 'please give me (something).' It attaches to the stem of an **action verb**, and the exact form (아/어/여) depends on the final vowel in the verb stem.",
    "formation": "Động từ stem + 아/어/여 + 주세요"
  },
  "ko_아어여_72": {
    "title": "아/어/여 드리다 [a/eo/yeo deurida] (To give – honorific)",
    "shortExplanation": "Conveys politeness when doing something for someone (honorific).",
    "longExplanation": "'아/어/여 드리다' is an **honorific** version of '아/어/여 주다' used to **politely express** that you are doing (or giving) something to someone of higher status or to show respect. It follows the same vowel rules as '주다', but replaces '주다' with '드리다' for heightened politeness.",
    "formation": "Động từ stem + 아/어/여 드리다"
  },
  "ko_다니다_73": {
    "title": "다니다 [danida] (To attend, go regularly)",
    "shortExplanation": "Dùng để diễn tả attending or regularly going to a place.",
    "longExplanation": "'다니다' means to **go (somewhere) regularly** or to **attend**. It conveys habitual or routine movement. Examples include attending school or work daily, going to the gym regularly, etc.",
    "formation": "Danh từ + 에 다니다 (often a place, like '학교에 다니다')"
  },
  "ko_아어여_74": {
    "title": "아/어/여 가다 [a/eo/yeo gada] (Continue/keep doing something – away from the present)",
    "shortExplanation": "Biểu thị an action continuing or moving away from the present point in time or space.",
    "longExplanation": "The expression '아/어/여 가다' can mean that **an action or state continues** in a forward direction—much like 'keep on ~ing' or 'go on ~ing.' It can also show that the action is moving away from the current context. (Note: If you want to say 'go somewhere to do something,' you typically use **'(으)러 가다'** instead.)",
    "formation": "Động từ stem + 아/어/여 가다"
  },
  "ko_으러가다오다eureogadaodaGocomeinordertodo_75": {
    "title": "(으)러 가다/오다 [(eu)reo gada/oda] (Go/come in order to do)",
    "shortExplanation": "Biểu thị going or coming somewhere for the purpose of performing an action.",
    "longExplanation": "'(으)러 가다/오다' is used when you physically **go** or **come** to a location in order to do something. The form is '(으)러' for verbs whose stems end in a consonant (other than ㄹ), and '러' if the stem ends in a vowel or ㄹ. For example, '공부하러 가다' = to go somewhere to study.",
    "formation": "Động từ stem + (으)러 가다/오다"
  },
  "ko_아어여_76": {
    "title": "아/어/여 오다 [a/eo/yeo oda] (Come to do / end up doing)",
    "shortExplanation": "Diễn tả arriving at a certain action or state, or having done something up to now.",
    "longExplanation": "'아/어/여 오다' can mean 'to come doing something' (physically) or 'to do something gradually until now' (metaphorically). For literal movement, it's often '(으)러 오다' (e.g., 먹으러 오다 = 'come to eat'). For a figurative sense, it can describe an action that has progressed and continued up to the present, akin to 'have been doing.'",
    "formation": "Động từ stem + (으)러 오다 (physical movement) or Động từ stem + 아/어/여 오다 (continuing action up to the present)"
  },
  "ko_고_77": {
    "title": "고 있다 [go itda] (To be doing)",
    "shortExplanation": "Biểu thị a continuous or ongoing action, similar to the English '-ing' form.",
    "longExplanation": "'고 있다' is the standard way to express an **action in progress**. For example, '읽고 있다' = 'am reading,' '요리하고 있다' = 'am cooking.' It differs from '아/어 있다,' which usually describes a **resultant state** (e.g., '앉아 있다' = 'to be seated').",
    "formation": "Động từ stem + 고 있다"
  },
  "ko_아어여_78": {
    "title": "아/어/여 보다 [a/eo/yeo boda] (Try to do)",
    "shortExplanation": "Diễn tả an attempt or trial to do something, 'try doing'.",
    "longExplanation": "'아/어/여 보다' Biểu thị that you **attempt** or **try** an action to see what happens. It can be used for trying something for the first time or experimenting with a new method. trong câu, it corresponds to 'try ~ing' or 'give it a try.'",
    "formation": "Động từ stem + 아/어/여 + 보다"
  },
  "ko_게_0": {
    "title": "~게 되다 [ge doeda] (End up doing)",
    "shortExplanation": "Dùng để diễn tả events or actions that occur unintentionally or as a result of another event or circumstance.",
    "longExplanation": "'~게 되다 [ge doeda]' is a grammar point trong tiếng Hàn Dùng để biểu thị outcomes that are primarily out of the speaker's control, often unexpected or resulting from certain circumstances or events. It conveys the sense of 'end up doing' or 'come to do' trong câu. It is Dùng để diễn tả a change or transition, the result of an event, or to describe the inevitable outcome of a certain situation.",
    "formation": "Động từ Stem + 게 되다"
  },
  "ko_게_1": {
    "title": "~게 되다 [ge dweda] (End up doing)",
    "shortExplanation": "Dùng để diễn tả an action or state that ends up happening due to certain circumstances or changes.",
    "longExplanation": "'~게 되다 [ge dweda]' is used when an action or situation comes about because of a certain circumstance or influence, often unexpectedly or unintentionally. It often implies a change from an initial plan or a passive result of external factors.",
    "formation": "Động từ stem + 게 되다"
  },
  "ko_고_2": {
    "title": "~고 싶다 [go sipda] (Want to do)",
    "shortExplanation": "Dùng để diễn tả a desire or a wish.",
    "longExplanation": "'~고 싶다 [go sipda]' is a grammatical form Dùng để diễn tả a person's desire or wish to do something trong tiếng Hàn. It's often used with verbs when expressing “I want to…” or “I would like to….” Typically, it’s best used for your own desires rather than attributing desires to others (in which case different expressions are often used).",
    "formation": "Động từ stem + 고 싶다"
  },
  "ko_기_3": {
    "title": "~기 전에 [gi jeone] (Before doing)",
    "shortExplanation": "Dùng để diễn tả 'before doing something'.",
    "longExplanation": "'~기 전에 [gi jeone]' is a grammatical structure trong tiếng Hàn Dùng để biểu thị that one action happens before another, essentially meaning 'before doing something'. It describes the chronological order in which actions occur, whether in the past, present, or future.",
    "formation": "Động từ stem (dictionary form) + 기 + 전에"
  },
  "ko_기_4": {
    "title": "~기 때문에 [gi ttaemune] (Because of doing)",
    "shortExplanation": "Dùng để diễn tả a reason or cause; 'because (of doing)'.",
    "longExplanation": "'기 때문에 [gi ttaemune]' is a grammar point used trong tiếng Hàn to express a reason or cause related to an action, equivalent to 'because (of doing)' trong câu. This form uses the nominalizing suffix '기' plus '때문에' to explain why something happens, showing a cause-effect relationship.",
    "formation": "Động từ stem + 기 + 때문에"
  },
  "ko_기로_5": {
    "title": "~기로 하다 [giro hada] (Decide to do)",
    "shortExplanation": "Dùng để diễn tả making a decision or a plan to do something.",
    "longExplanation": "'~기로 하다' is used as Verb stem + 기로 하다 to express a decision or plan to do something. It often translates to 'decide to do' trong câu and is used when the speaker is stating what they (or someone) have decided, often as the result of a conversation or personal resolve.",
    "formation": "Động từ stem + 기로 하다"
  },
  "ko_기_6": {
    "title": "~기 시작하다 [gi sijakhada] (Start to do)",
    "shortExplanation": "Diễn tả the start or commencement of an action or event.",
    "longExplanation": "'~기 시작하다 [gi sijakhada]' is Dùng để diễn tả the beginning of an action trong tiếng Hàn. By nominalizing a verb with '~기' and then using '시작하다 (to start)', you convey that the action has just begun or is beginning soon.",
    "formation": "Động từ stem + 기 + 시작하다"
  },
  "ko_기는_7": {
    "title": "~기는 하다 [gineun hada] (Indeed do, but...)",
    "shortExplanation": "Used to emphasize or concede that one does something, often followed by a contrasting point.",
    "longExplanation": "'~기는 하다' attaches the nominalizer '~기' to a verb, followed by '는 하다'. It often Biểu thị a concession or emphasis: “Yes, I do X (indeed), but...”. In many cases, it implies the action is done, yet not wholeheartedly, or a contrary result follows. It’s not limited to habitual actions, but more about emphasizing or conceding the fact that you do it.",
    "formation": "Động từ stem + 기는 하다"
  },
  "ko_는_8": {
    "title": "~는 대로 [neun daero] (As it is / Just as someone says)",
    "shortExplanation": "'~는 대로' is used to state that something is done exactly as it is or as told/given.",
    "longExplanation": "The '~는 대로 [neun daero]' structure Diễn tả doing something exactly in the manner stated or indicated, with no alteration. It can also be used when following instructions precisely or maintaining the original state/method.",
    "formation": "Động từ stem + 는 대로"
  },
  "ko_는_9": {
    "title": "~는 바람에 [neun barame] (Because of / Due to)",
    "shortExplanation": "Used when indicating the cause of a negative result or situation.",
    "longExplanation": "'~는 바람에 [neun barame]' literally means 'because of (this wind/event)' and is used to describe a reason or cause behind an unfortunate or negative outcome. It emphasizes that the cause led directly to some undesirable result.",
    "formation": "Động từ + 는 바람에 + (negative outcome)"
  },
  "ko_는데_10": {
    "title": "~는데 [neunde] (But / however / and)",
    "shortExplanation": "Dùng để diễn tả contrast, provide background, or connect clauses. Often means 'but' or 'however'.",
    "longExplanation": "'~는데 [neunde]' can serve various functions: showing contrast (similar to 'but'), providing background information before another statement, or simply linking clauses. It is one of the most common connective endings trong tiếng Hàn, and nuance depends on context.",
    "formation": "Mệnh đề 1 + 는데 + Mệnh đề 2"
  },
  "ko_는지_11": {
    "title": "~는지 모르다 [neunji moreuda] (Don't know if)",
    "shortExplanation": "It is used when the speaker is unsure about a situation or fact.",
    "longExplanation": "'~는지 모르다' is a form Dùng để diễn tả uncertainty or lack of knowledge about something trong tiếng Hàn. It corresponds to the English 'do not know if'. This construction is used when the speaker does not know whether something happened, exists, or is true. The verb or adjective in front of '는지 모르다' should be in its adnominal form.",
    "formation": "Động từ-는지 모르다 / Động từ-ㄴ(은)지 모르다 / Tính từ-는지 모르다"
  },
  "ko_는지_12": {
    "title": "~는지 알다 [neunji alda] (Know if)",
    "shortExplanation": "Dùng để diễn tả 'know if' or 'know whether'.",
    "longExplanation": "'~는지 알다 [neunji alda]' is Dùng để diễn tả the concept of knowing if something is the case or not. It’s often used when conveying what someone knows or needs to find out about a situation, event, or fact.",
    "formation": "Động từ+는지 알다 / Tính từ+는지 알다"
  },
  "ko_마다_13": {
    "title": "~마다 [mada] (Every)",
    "shortExplanation": "Dùng để diễn tả a recurring or regular occurrence: 'every'.",
    "longExplanation": "'~마다 [mada]' is a postposition trong tiếng Hàn Dùng để diễn tả repetition or a recurring pattern. It corresponds to 'every' trong câu, indicating that something happens each time, every instance, or every unit of the specified noun.",
    "formation": "Danh từ + 마다"
  },
  "ko_부터_14": {
    "title": "~부터 ~까지 [buteo ~ kkaji] (From ~ to ~)",
    "shortExplanation": "Dùng để diễn tả the beginning and end of a range in time, space, or action.",
    "longExplanation": "'~부터 ~까지 [buteo ~ kkaji]' is Dùng để biểu thị the starting point and ending point of an action, period, or location. It translates to 'from ~ to ~' trong câu and can be used for time, place, numbers, or other continuous ranges.",
    "formation": "Starting point + 부터 + End point + 까지"
  },
  "ko_아어여_15": {
    "title": "~아/어/여 보이다 [a/eo/yeo boida] (Seems, looks like)",
    "shortExplanation": "Dùng để diễn tả that something appears or seems a certain way from the speaker’s perspective.",
    "longExplanation": "The grammar '~아/어/여 보이다' is Dùng để biểu thị that someone or something appears, looks, or seems a certain way based on the speaker’s perception. Có thể dịch là 'seems' or 'looks like' trong câu. It implies that the statement is an inference or impression, not an absolute fact.",
    "formation": "Động từ stem + 아/어/여 보이다"
  },
  "ko_아어여_16": {
    "title": "~아/어/여 주다 [a/eo/yeo juda] (Do something for someone)",
    "shortExplanation": "Dùng để diễn tả the action of doing something for someone’s benefit.",
    "longExplanation": "The '~아/어/여 주다 [a/eo/yeo juda]' form is used trong tiếng Hàn to express doing something for someone else. It is often Dùng để chỉ ra that the speaker (or subject) is performing an action as a favor, courtesy, or service to another person. In requests, it can also soften the tone, implying you want someone to do something for you.",
    "formation": "Động từ stem + 아/어/여 + 주다"
  },
  "ko_아어여야만_17": {
    "title": "~아/어/여야만 하다 [a/eo/yeoyaman hada] (Have to do)",
    "shortExplanation": "This grammar point Diễn tả necessity or obligation: 'must', 'have to'.",
    "longExplanation": "The phrase '~아/어/여야만 하다 [a/eo/yeoyaman hada]' Biểu thị that someone must or has to do something. It closely corresponds to 'have to' or 'must' trong câu. The verb stem combines with '아/어/여야만 하다', depending on the final vowel of the verb.",
    "formation": "Động từ stem + 아야만 하다 / 어야만 하다 / 여야만 하다"
  },
  "ko_아어여도_18": {
    "title": "~아/어/여도 되다 [a/eo/yeodo doeda] (Is it okay to ~ / May I ~)",
    "shortExplanation": "Dùng để hỏi or state permission to do something.",
    "longExplanation": "'~아/어/여도 되다 [a/eo/yeodo doeda]' is a Korean grammar pattern Dùng để hỏi for or give permission. In questions, it means 'May I...?' or 'Is it okay to...?' In statements, it affirms that the action is permitted: 'You can...' or 'It’s okay to...'",
    "formation": "Động từ stem + 아/어/여도 되다"
  },
  "ko_아어여서는_19": {
    "title": "~아/어/여서는 안 되다 [a/eo/yeoseoneun an doeda] (Must not)",
    "shortExplanation": "Biểu thị prohibition or that one must not do something.",
    "longExplanation": "'~아/어/여서는 안 되다' explicitly Diễn tả that something must not be done. It is often translated as 'You must not...' or 'It's not allowed to...'. It follows the verb stem plus '아/어/여서' + '는 안 되다'.",
    "formation": "Động từ stem + 아/어/여 + 서는 안 되다"
  },
  "ko_아어서_20": {
    "title": "~아/어서 [a/eo-seo] (Because, so)",
    "shortExplanation": "Dùng để diễn tả cause and effect, or reason and result. Can also indicate a sequence ('after').",
    "longExplanation": "The '~아/어서 [a/eo-seo]' form is used trong tiếng Hàn to show a cause-effect or reason-result relationship. It can also have a temporal meaning ('after doing something, then...'). For cause and effect, it is similar to 'because' or 'so' trong câu.",
    "formation": "Động từ/Tính từ stem + 아/어서"
  },
  "ko_았었으면_21": {
    "title": "~았/었으면 좋겠다 [at/eosseumyeon joketda] (I wish/hope)",
    "shortExplanation": "Dùng để diễn tả a desire for something to happen; equivalent to 'I wish/hope' trong câu.",
    "longExplanation": "'~았/었으면 좋겠다 [at/eosseumyeon joketda]' is a Korean grammar form Dùng để diễn tả a wish or hope for a certain event or situation to happen. It combines a past-tense marker (~았/었) with the conditional '면' and '좋겠다' (hope). The meaning is similar to 'I wish' or 'I hope' trong câu, conveying a desire for something that is not currently the case, but which the speaker wishes would be or become so.",
    "formation": "Động từ + 았/었으면 좋겠다"
  },
  "ko_어아야_22": {
    "title": "~어/아야 하다 [eo/ayahada] (Have to, should)",
    "shortExplanation": "Dùng để diễn tả obligation, necessity, or compulsion—'have to', 'should'.",
    "longExplanation": "'~어/아야 하다 [eo/ayahada]' is used trong tiếng Hàn to express obligation, necessity, or compulsion, similar to 'have to' or 'should' trong câu. Depending on the final vowel of the verb stem, you use '아야 하다' (if the final vowel is ㅏ or ㅗ) or '어야 하다' (otherwise). This Biểu thị that performing the verb's action is required or expected.",
    "formation": "Động từ Stem + 아/어야 하다"
  },
  "ko_어아도_23": {
    "title": "~어/아도 [eo/ado] (Even if)",
    "shortExplanation": "Dùng để diễn tả 'even if,' indicating a conditional situation or assumption.",
    "longExplanation": "'~어/아도 [eo/ado]' is a conjunctive ending trong tiếng Hàn meaning 'even if' or 'although.' It sets up a hypothetical or assumed condition, and states what happens despite that condition. The choice of '어' or '아' depends on the final vowel of the preceding verb stem, following typical Korean conjugation rules.",
    "formation": "Động từ stem + 어/아 + 도"
  },
  "ko_어아_24": {
    "title": "~어/아 버리다 [eo/a beorida] (Regretfully, completely)",
    "shortExplanation": "Used to emphasize that an action is completed, often with regret or an unintended outcome.",
    "longExplanation": "'~어/아 버리다 [eo/a beorida]' is a verb ending that highlights the completion of an action, frequently carrying a feeling of regret, surprise, or finality. It often implies that the result was unintended or that the speaker wishes it had not happened.",
    "formation": "Động từ stem + 어/아 버리다"
  },
  "ko_으면면_25": {
    "title": "~으면/면 [eumyeon/myeon] (If, when)",
    "shortExplanation": "Dùng để diễn tả conditions or hypothetical situations: 'if' or 'when'.",
    "longExplanation": "'~으면/면 [eumyeon/myeon]' is used trong tiếng Hàn to express a condition or a hypothetical scenario, akin to 'if' or 'when' trong câu. It generally Biểu thị that the main clause is contingent upon the condition in the subordinate clause.",
    "formation": "Động từ stem + (으)면"
  },
  "ko_을를_26": {
    "title": "~을/를 빼다 [eul/reul ppaeda] (Except for)",
    "shortExplanation": "Used to mean 'except for' or 'excluding', showing an exclusion from a group or set.",
    "longExplanation": "'~을/를 빼다 [eul/reul ppaeda]' is used trong tiếng Hàn to indicate that something is excluded from a given group, set, or situation. Có thể dịch là 'except for' or 'aside from.'",
    "formation": "Danh từ + 을/를 빼다"
  },
  "ko_을를_27": {
    "title": "~을/를 수 있다 [eul/reul su itda] (Can, possible)",
    "shortExplanation": "Diễn tả the ability or possibility to perform an action: 'can', 'be able to'.",
    "longExplanation": "'~을/를 수 있다 [eul/reul su itda]' is Dùng để biểu thị that the subject is capable of or that it is possible to perform the action of the verb. It is commonly translated as 'can' or 'be able to' trong câu.",
    "formation": "Động từ stem + (으)ㄹ 수 있다"
  },
  "ko_을를_28": {
    "title": "~을/를 통해 [eul/reul tonghae] (Through, via)",
    "shortExplanation": "Dùng để chỉ ra the medium or channel through which something is done or achieved.",
    "longExplanation": "'~을/를 통해 [eul/reul tonghae]' Biểu thị that something is accomplished, communicated, or obtained by means of a certain method, channel, or medium. It corresponds to 'through' or 'via' trong câu.",
    "formation": "Danh từ + 을/를 통해"
  },
  "ko_을까_29": {
    "title": "~을까 [eulkka] (Shall we?)",
    "shortExplanation": "Used to make a suggestion or proposal—'Shall we?', 'How about...?'.",
    "longExplanation": "'~을까 [eulkka]' is used trong tiếng Hàn to propose an idea or action to someone, similar to asking 'Shall we...?' or 'How about...?' trong câu. It’s casual and frequently used among friends or peers.",
    "formation": "Động từ stem + 을까"
  },
  "ko_을래_30": {
    "title": "~을래 [eullae] (Want to)",
    "shortExplanation": "Diễn tả the speaker’s intention or will, often in casual speech: 'want to'.",
    "longExplanation": "'~을래 [eullae]' is an informal Korean sentence ending that conveys the speaker’s desire or intention to do something. It also functions like a suggestion when speaking with friends or close acquaintances, and can be translated as 'I want to...' or 'I'm going to...'.",
    "formation": "Động từ stem + 을래"
  },
  "ko_을지라도_31": {
    "title": "~을지라도 [euljirado] (Even if)",
    "shortExplanation": "Emphasizes that the main clause remains true regardless of the condition in the subordinate clause.",
    "longExplanation": "'~을지라도 [euljirado]' translates to 'even if' trong câu. It is used to specify that no matter the condition introduced by the subordinate clause, the main clause still holds. It emphasizes determination or inevitability despite obstacles.",
    "formation": "Động từ stem + 을지라도"
  },
  "ko_을지언정_32": {
    "title": "~을지언정 [euljieonjeong] (Even if, even though)",
    "shortExplanation": "Used to mean 'even if' or 'even though,' emphasizing a strong concession or unexpected contrast.",
    "longExplanation": "'~을지언정 [euljieonjeong]' is a Korean grammar structure that Diễn tả a concession or contrast. It conveys the idea of 'even if' or 'even though.' Despite the condition stated, the speaker insists on or highlights another fact or determination. It emphasizes that regardless of the possible negative or contrasting scenario, something remains important or unchanged.",
    "formation": "(Tính từ/Động từ stem) + 을지언정 / (Danh từ + 이) + 을지언정"
  },
  "ko_이_33": {
    "title": "~이 되다 [i doeda] (Become)",
    "shortExplanation": "Dùng để biểu thị a change or transformation: 'become'.",
    "longExplanation": "'~이 되다 [i doeda]' is a common expression trong tiếng Hàn indicating the transformation or shift from one state to another, often with nouns. It can refer to changes in jobs, positions, relationships, states, etc. It basically carries the meaning of 'become' trong câu when attached to a noun followed by '이'.",
    "formation": "Danh từ + 이 되다"
  },
  "ko_이나_34": {
    "title": "~이나 ~ [ina] (Either... or...)",
    "shortExplanation": "Used to offer or list multiple options or possibilities, similar to 'either... or...'.",
    "longExplanation": "'~이나 ~' is used trong tiếng Hàn to give alternatives or options, much like 'either... or...' trong câu. It can introduce two or more nouns, verbs, or phrases. The construction often appears as 'Noun1 + 이나 + Noun2 + (하)나 + Verb/Adjective', offering multiple choices.",
    "formation": "Noun1 + 이나 + Noun2 (…)"
  },
  "ko_이라도_35": {
    "title": "~이라도 [irado] (At least, even if)",
    "shortExplanation": "Dùng để diễn tả 'at least' or 'even if it's just...', showing a minimal or second-best option.",
    "longExplanation": "'~이라도 [irado]' is used trong tiếng Hàn to indicate a compromise, lesser option, or minimal requirement. It often conveys 'at least' or 'even if it's only…'. It can suggest that the speaker would settle for something, even if it’s not ideal.",
    "formation": "Danh từ or verb stem + (이)라도"
  },
  "ko_이랑_36": {
    "title": "~이랑 [irang] (And, with)",
    "shortExplanation": "Used to mean 'and' or 'with' when linking nouns in casual speech.",
    "longExplanation": "'~이랑 [irang]' is an informal connective trong tiếng Hàn, roughly equivalent to 'and' or 'with.' It can link people, objects, or concepts, and is very common in spoken language. It’s less formal than other conjunctions like '~하고' or '~와/과.'",
    "formation": "Danh từ + 이랑 + Danh từ"
  },
  "ko_이래_37": {
    "title": "~이래 [irae] (Since)",
    "shortExplanation": "Used to mark the starting point of an event in the past and its continuation to the present: 'since'.",
    "longExplanation": "'~이래 [irae]' marks a starting point in the past from which a situation has continued until now. It’s similar to 'since' trong câu. It typically follows a verb in past tense that Biểu thị when the action or event began.",
    "formation": "Past tense Động từ + 이래"
  },
  "ko_이므로_38": {
    "title": "~이므로 [imyeo] (Because, so)",
    "shortExplanation": "Dùng để biểu thị a reason or cause: 'because', 'so'.",
    "longExplanation": "'~이므로 [imyeo]' is a conjunctive form used trong tiếng Hàn to indicate cause or reason, roughly meaning 'because' or 'so.' It typically follows a noun, adjective, or verb, showing that the preceding clause is the reason for what follows.",
    "formation": "Danh từ + (이)므로 / Tính từ/Động từ stem + (으)므로"
  },
  "ko_이어서_39": {
    "title": "~이어서 [ieoseo] (And then, so) — (Using ~아/어서)",
    "shortExplanation": "Often appears as ~아/어서 in modern usage to link clauses in sequence (and then) or cause/effect (so).",
    "longExplanation": "The expression '~이어서 [ieoseo]' can literally mean 'continuing on from that,' but in modern usage the closely related connectors '~아/어서' also cover 'and then' or 'so' functions trong tiếng Hàn. These examples show how one action or event naturally leads to another, or how one reason leads to a result.",
    "formation": "Action Động từ + -아/어서 (depending on the verb stem’s final vowel)"
  },
  "ko_이지만_40": {
    "title": "~이지만 [ijiman] (But, however)",
    "shortExplanation": "Dùng để chỉ ra contrast or sự mâu thuẫn giữa hai mệnh đề: 'but', 'however'.",
    "longExplanation": "'~이지만 [ijiman]' is a Korean conjunctive form meaning 'but' or 'however.' The clause before ~이지만 states a fact or quality, and the clause after it presents a contrasting or conflicting fact. This structure emphasizes the difference or contradiction between them.",
    "formation": "Danh từ/Động từ/Tính từ + 이지만"
  },
  "ko_인는데_41": {
    "title": "~인/는데 [in/neunde] (But, so)",
    "shortExplanation": "Used to connect clauses, often expressing contrast, background information, or a reason/cause: 'but', 'so', 'however'.",
    "longExplanation": "'~인/는데' is a broad label for endings like '인데' (for nouns), '(으)ㄴ데' (for adjectives or past tense verbs), and '는데' (for action verbs). These endings connect two clauses and can imply various nuances such as contrast ('but', 'however'), reason/cause, or background information setting up a following statement. The exact meaning depends on context.",
    "formation": "1) Danh từ + 인데\n2) Tính từ + (으)ㄴ데\n3) Động từ + 는데"
  },
  "ko_자_42": {
    "title": "~자 [ja] (Let's)",
    "shortExplanation": "Used to suggest or propose an action: 'let's'.",
    "longExplanation": "'~자 [ja]' is attached to a verb stem to propose an action or suggest doing something together, similar to 'let's' trong câu. It's an informal form commonly used among friends or peers.",
    "formation": "Động từ stem + 자"
  },
  "ko_자마자_43": {
    "title": "~자마자 [jamaja] (As soon as)",
    "shortExplanation": "Dùng để biểu thị that the second event happens immediately after the first event: 'as soon as'.",
    "longExplanation": "'~자마자 [jamaja]' means 'as soon as' trong câu, showing that one action or event happens directly after another with no delay. The action in the second clause occurs immediately after the action in the first clause.",
    "formation": "Động từ stem + 자마자"
  },
  "ko_처럼_44": {
    "title": "~처럼 [cheoreom] (Like, as)",
    "shortExplanation": "Dùng để diễn tả similarity or resemblance: 'like', 'as if'.",
    "longExplanation": "'~처럼 [cheoreom]' is a postposition trong tiếng Hàn that Diễn tả similarity or comparison, often translating to 'like' or 'as if' trong câu. It can be used with both nouns and verb phrases to show that something acts or appears in a similar way to another thing.",
    "formation": "Danh từ/Động từ + 처럼"
  },
  "ko_쯤_45": {
    "title": "~쯤 [jjeum] (Around, about)",
    "shortExplanation": "Dùng để biểu thị approximation in quantity, time, or degree: 'around', 'about'.",
    "longExplanation": "'쯤 [jjeum]' is a Korean particle that denotes an approximation or an estimated range of time, quantity, or degree. It is similar to 'around' or 'about' trong câu. You attach it after a noun indicating time, number, or quantity.",
    "formation": "Number/Quantity/Time + 쯤"
  },
  "ko_지_46": {
    "title": "~지 않다 [ji anta] (Not)",
    "shortExplanation": "Used to negate a verb or adjective: 'not'.",
    "longExplanation": "'~지 않다 [ji anta]' is a negative form trong tiếng Hàn that translates to 'not' trong câu. It is attached to the verb/adjective stem to negate the action or state. It can be used in both formal and informal contexts to express that something does not happen or is not the case.",
    "formation": "Động từ/Tính từ stem + 지 않다"
  },
  "ko_지만_47": {
    "title": "~지만 [jiman] (But)",
    "shortExplanation": "Dùng để diễn tả contrast or contradiction; 'but', 'however'.",
    "longExplanation": "'~지만 [jiman]' is a conjunction used trong tiếng Hàn to indicate a contrast or sự mâu thuẫn giữa hai mệnh đề. It carries the sense of 'but' or 'however' trong câu. The speaker presents a fact or situation, then adds a conflicting or contrasting fact following '~지만'.",
    "formation": "Động từ/Tính từ + 지만, Danh từ + (이)지만"
  },
  "ko_지요죠_48": {
    "title": "~지요/~죠 [jiyo/jyo] (Isn’t it?, right?)",
    "shortExplanation": "Used to confirm or seek agreement; 'isn't it?', 'right?'",
    "longExplanation": "The endings '~지요/~죠 [jiyo/jyo]' are used to seek confirmation or agreement from the listener, similar to saying 'isn't it?' or 'right?' trong câu. They soften the statement and can function like a tag question. The form can be used in varying politeness levels, depending on the overall speech style.",
    "formation": "Động từ/Tính từ + 지요/죠"
  },
  "ko_하고_49": {
    "title": "~하고 [hago] (And, with)",
    "shortExplanation": "Used to connect nouns ('and') or indicate 'with' someone/something.",
    "longExplanation": "'~하고 [hago]' is used trong tiếng Hàn to connect two nouns in the sense of 'and' or to indicate 'with' when paired with a verb. It's commonly used in spoken language and is a bit more informal than '~와/과'.",
    "formation": "Noun1 + 하고 + Noun2 / Danh từ + 하고 + Động từ"
  },
  "ko_하기로_50": {
    "title": "~하기로 [hagiro] (Decide to)",
    "shortExplanation": "Dùng để diễn tả making a decision or plan to do something.",
    "longExplanation": "'~하기로 [hagiro]' is used when a decision or plan is made to carry out a certain action. It frequently appears in daily conversation to share decisions, future intentions, or arrangements. Có thể dịch là 'decide to ~' trong câu.",
    "formation": "Động từ stem + 기로"
  },
  "ko_하기는_51": {
    "title": "~하기는 [hagineun] (But, however)",
    "shortExplanation": "Used to introduce a contrasting or limiting perspective: 'but', 'however'.",
    "longExplanation": "'~하기는 [hagineun]' is used trong tiếng Hàn to highlight a contrast or limitation. It conveys that while something may be true, there is a secondary point that limits or opposes the first statement. It often translates to 'but,' 'however,' or 'though' trong câu.",
    "formation": "Động từ stem + 기는"
  },
  "ko_하기보다_52": {
    "title": "~하기보다 [hagiboda] (Rather than)",
    "shortExplanation": "Used to compare two actions or states, expressing a preference: 'rather than', 'instead of'.",
    "longExplanation": "'~하기보다 [hagiboda]' is a Korean grammatical structure used when comparing or contrasting two actions, states, or situations. It introduces a preference for the second action over the first, translating to 'rather than' or 'instead of' trong câu. The verb before '~하기보다' is the less preferred, and what follows Biểu thị the preferred action or situation.",
    "formation": "Động từ stem + 기보다"
  },
  "ko_하나_53": {
    "title": "~하나 [hana] (Questioning oneself)",
    "shortExplanation": "Dùng để chỉ ra self-questioning or wondering; 'I wonder', 'Could it be'.",
    "longExplanation": "The ending '~하나 [hana]' trong tiếng Hàn Diễn tả the speaker’s puzzlement or self-questioning about a situation. It often appears in more casual, reflective speech when the speaker wonders about something or asks themselves a rhetorical question. It's roughly similar to phrases like 'I wonder...' or 'Could it be...' trong câu.",
    "formation": "Động từ + 는/ㄴ/은/인 + 하나"
  },
  "ko_하다가_54": {
    "title": "~하다가 [hadaga] (Doing and then)",
    "shortExplanation": "Dùng để diễn tả the notion of 'doing something and then'.",
    "longExplanation": "'~하다가 [hadaga]' is a composite verb form trong tiếng Hàn meaning that while someone is in the middle of doing an action, another event occurs. It does not require the first action to finish before the second starts. Often, the second action interrupts or follows immediately after the first.",
    "formation": "Động từ + 하다가"
  },
  "ko_하다가_55": {
    "title": "~하다가 말다 [hadaga malda] (Stop doing something)",
    "shortExplanation": "Dùng để diễn tả that someone stops in the midst of doing something.",
    "longExplanation": "'~하다가 말다 [hadaga malda]' means that an action, which has begun, is interrupted or stopped before completion. It often implies the action may or may not resume later, highlighting a sudden change or interruption during the activity. The verb is typically in dictionary form before '하다가 말다.'",
    "formation": "Động từ (dictionary form) + 하다가 말다"
  },
  "ko_하더라_56": {
    "title": "~하더라 [hadeora] (I observed, I remember)",
    "shortExplanation": "Dùng để diễn tả a recollection or observation of a past event.",
    "longExplanation": "'~하더라 [hadeora]' Biểu thị the speaker personally saw, felt, or experienced something in the past. It's more than simply stating a past fact (~했다); it emphasizes the speaker’s direct observation or impression of an event or situation.",
    "formation": "Động từ stem + 더라"
  },
  "ko_하려고_57": {
    "title": "~하려고 [haryeogo] (In order to)",
    "shortExplanation": "Diễn tả purpose or intention: 'in order to', 'for the purpose of'.",
    "longExplanation": "'~하려고 [haryeogo]' is Dùng để biểu thị an intention or purpose for doing something. It often translates to 'in order to' or 'for the purpose of' trong câu. This pattern appears before the main verb or clause that shows what the speaker aims to accomplish or why they’re performing an action.",
    "formation": "Động từ stem + 려고"
  },
  "ko_하여해서_58": {
    "title": "~하여/해서 [hayeo/haeseo] (So, therefore)",
    "shortExplanation": "A connective ending that Diễn tả cause or reason.",
    "longExplanation": "'~하여/해서 [hayeo/haeseo]' is used trong tiếng Hàn to link two clauses, where the first clause is the cause or reason, and the second clause is the resulting action or statement. In colloquial speech, '해서' is more common. It corresponds to 'so' or 'therefore' trong câu.",
    "formation": "Động từ stem + 하여/해서"
  },
  "ko_한테한테서_59": {
    "title": "~한테/한테서 [hante/hanteseo] (To/From someone)",
    "shortExplanation": "Biểu thị 'to' or 'from' a person or animate being.",
    "longExplanation": "'~한테 [hante]' and '~한테서 [hanteseo]' are postpositions used when the subject is sending something (physical or abstract) to someone, or receiving from someone. Typically used with people or animate beings: '한테' = 'to someone'; '한테서' = 'from someone'.",
    "formation": "Danh từ/Pronoun + 한테 (to), Danh từ/Pronoun + 한테서 (from)"
  },
  "ko_할_60": {
    "title": "~할 거예요 [hal geoyeyo] (Going to do)",
    "shortExplanation": "Diễn tả a future plan or intention: 'going to do'.",
    "longExplanation": "'~할 거예요 [hal geoyeyo]' is a common future tense form trong tiếng Hàn that conveys a plan, intention, or prediction, similar to 'be going to' trong câu. It shows that the action is expected to happen in the future.",
    "formation": "Động từ (stem) + (으)ㄹ 거예요  (e.g., 하다 → 할 거예요)"
  },
  "ko_할_61": {
    "title": "~할 만하다 [hal manhada] (Worth doing)",
    "shortExplanation": "Biểu thị that an action is worth the effort, time, or cost: 'worth doing'.",
    "longExplanation": "'~할 만하다 [hal manhada]' means that an action is sufficiently valuable or beneficial to be worth the effort it requires. It can be used with many verbs to suggest that something is recommended or rewarding despite possible difficulty or expense.",
    "formation": "Động từ stem + 할 만하다"
  },
  "ko_할수록_62": {
    "title": "~할수록 [hal surok] (The more...)",
    "shortExplanation": "Used to describe a situation where one action or state increases or intensifies as another action or state does.",
    "longExplanation": "'~할수록 [hal surok]' is a compound grammar pattern Dùng để diễn tả a situation where, as one thing progresses or changes, another thing happens correspondingly. Essentially, it means 'the more...'. It often involves a shared subject in both clauses, indicating proportional or dependent change in one factor alongside another.",
    "formation": "Động từ stem + (으)ㄹ수록 + (resulting increase/change)"
  },
  "ko_할_63": {
    "title": "~할 줄 알다 [hal jul alda] (Know how to)",
    "shortExplanation": "Dùng để diễn tả the knowledge or skill to do something.",
    "longExplanation": "'~할 줄 알다 [hal jul alda]' is Dùng để biểu thị that someone knows how to do a certain action or has the skill to do it. Literally, it means 'know the method of doing ~'.",
    "formation": "Động từ (dictionary form) + 줄 알다"
  },
  "ko_할지라도_64": {
    "title": "~할지라도 [haljirado] (Even if)",
    "shortExplanation": "Dùng để diễn tả a condition in the sense of 'even if'.",
    "longExplanation": "'~할지라도 [haljirado]' translates to 'even if' trong câu. It suggests that even under a hypothetical condition or possibility, the outcome or stance in the second clause remains unchanged.",
    "formation": "Động từ + (으)ㄹ지라도"
  },
  "ko_할_65": {
    "title": "~할 텐데 [hal tende] (I thought/would have thought that...)",
    "shortExplanation": "Diễn tả a presumption or expectation that differs from reality.",
    "longExplanation": "'~할 텐데 [hal tende]' conveys a speaker's assumption or prediction about a situation that turned out differently. Có thể dịch là 'I would have thought...' or 'I expected...' but the actual result was unexpected or contrary to the assumption.",
    "formation": "Động từ stem + (으)ㄹ 텐데"
  },
  "ko_해야지_66": {
    "title": "~해야지 [haeyaji] (Decide to)",
    "shortExplanation": "Diễn tả a personal decision or resolution; similar to 'I should' or 'I will'.",
    "longExplanation": "'~해야지 [haeyaji]' Biểu thị a personal decision or intent to do something. Có thể dịch là 'I should' or 'I will' and often sounds like talking to oneself or making a personal resolution. Sometimes it’s used in soft suggestions to others.",
    "formation": "Động từ stem + 아/어/여야지"
  },
  "ko_해도해봐도_67": {
    "title": "~해도/해봐도 [haedo/haebwado] (Even if)",
    "shortExplanation": "Biểu thị 'even if' or 'no matter how much' in sentences.",
    "longExplanation": "'~해도/해봐도 [haedo/haebwado]' is used to say that regardless of a certain action or attempt, the result or situation does not change. It conveys an idea of 'even if' or 'no matter how much one tries/does something.'",
    "formation": "Động từ stem + 아/어/해도 or Động từ stem + 아/어/해봐도"
  },
  "ko_해보다_68": {
    "title": "~해보다 [haeboda] (Try to)",
    "shortExplanation": "Biểu thị attempting or trying an action for the first time, or suggesting someone try something.",
    "longExplanation": "'~해보다 [haeboda]' literally adds 'try' to a verb. It is used when someone attempts an action (often a new one) or suggests that another person try it. It conveys the sense of 'try doing (something)' trong câu.",
    "formation": "Action Động từ stem + 아/어/해 + 보다"
  },
  "ko_해주다_69": {
    "title": "~해주다 [haejuda] (Do for someone)",
    "shortExplanation": "Biểu thị doing a favor or an action for someone else’s benefit.",
    "longExplanation": "'~해주다 [haejuda]' is used trong tiếng Hàn when you do something beneficial or helpful for another person. It often implies goodwill or kindness towards the recipient of the action, translating to 'do something for someone' trong câu.",
    "formation": "Động từ stem + 아/어/해 + 주다"
  },
  "ko_했더니_70": {
    "title": "~했더니 [haetdeoni] (When, and then)",
    "shortExplanation": "This grammar point is Dùng để diễn tả 'when something happened and then something else happened as a result'.",
    "longExplanation": "'~했더니 [haetdeoni]' is a grammar point used trong tiếng Hàn to signify a cause-and-effect relationship where the first action directly leads to the second action. This construction denotes 'when I did [first action], and then [second action] happened'. It is often used in instances when the result is unexpected or surprising, emphasizing that the second action is a direct result of the first action.",
    "formation": "Động từ in past tense + 더니 + Resulting action or state"
  },
  "ko_했었다_71": {
    "title": "~했었다 [haesseotda] (Had done)",
    "shortExplanation": "Used to describe an action that had been done in the past, before another action or situation.",
    "longExplanation": "'~했었다 [haesseotda]' is a verb ending used trong tiếng Hàn to express an action that had been completed before another event or action occurred. This form is similar to the English past perfect tense, often used to explain a past event or situation that happened prior to another past event. It can also be used to explain past regrets, experiences, and situations that were true in the past but not necessarily in the present.",
    "formation": "Động từ Stem + 했었다"
  },
  "ko_했으면_72": {
    "title": "~했으면 [haesseumyeon] (If it were)",
    "shortExplanation": "Dùng để diễn tả a hypothetical condition in the past; 'If it were', 'If it could be'.",
    "longExplanation": "'~했으면 [haesseumyeon]' is a Korean grammar structure Dùng để diễn tả hypothetical situations or conditions in the past. It's often used to reflect wishes or to suppose different outcomes based on past events, and can be translated as 'If it had been...' or 'If I had done...' trong câu.",
    "formation": "Động từ + 았/었으면"
  },
  "ko_했을_73": {
    "title": "~했을 때 [haesseul ttae] (When someone did)",
    "shortExplanation": "Dùng để diễn tả the time when a particular action or event took place.",
    "longExplanation": "'~했을 때 [haesseul ttae]' is a verb ending used trong tiếng Hàn to indicate the time when a specific action or event happened in the past. It is typically translated as 'when someone did' trong câu. It connects two clauses: the first describes the action/event in the past, the second describes the result or consequence.",
    "formation": "Động từ in past tense + 았을 때/었을 때"
  },
  "ko_했을_74": {
    "title": "~했을 텐데 [haesseul tende] (I think I did)",
    "shortExplanation": "Dùng để diễn tả a strong assumption or belief about a past action or state.",
    "longExplanation": "'~했을 텐데' is a grammatical expression used trong tiếng Hàn to indicate a strong assumption or belief regarding a past action or state. The speaker believes that the action mentioned likely occurred (or was true), but they do not have direct or definite confirmation. It can also convey a sense of regret or speculation about what probably happened.",
    "formation": "Động từ stem + 았/었을 텐데"
  },
  "ko_했지만_75": {
    "title": "~했지만 [haetjiman] (But, however)",
    "shortExplanation": "Dùng để diễn tả a contrast or contradiction; 'but', 'however'.",
    "longExplanation": "'~했지만 [haetjiman]' is a conjunctive form used trong tiếng Hàn to indicate a contrast or sự mâu thuẫn giữa hai mệnh đề. It is similar to the English conjunctions 'but' or 'however', combining sentences that show a difference or unexpected turn.",
    "formation": "Động từ + ~했지만"
  },
  "ko_아어여서_76": {
    "title": "~아/어/여서 [a/eo/yeoseo] (Because, so)",
    "shortExplanation": "Dùng để biểu thị the reason or cause for something; can be translated as 'because' or 'so'.",
    "longExplanation": "The '~아/어/여서' ending is used trong tiếng Hàn to denote a cause-and-effect relationship between two clauses. The clause that contains '~아/어/여서' Biểu thị the reason or cause, and the main clause describes the result. Which form (아/어/여) you use depends on the verb stem’s final vowel or '하다' (which becomes '해서').",
    "formation": "Động từ stem + 아/어/여서 + Result clause"
  },
  "ko_아어여야_77": {
    "title": "~아/어/여야 [a/eo/yeoya] (Have to)",
    "shortExplanation": "Dùng để diễn tả necessity or obligation; 'have to', 'must'.",
    "longExplanation": "'~아/어/여야' is a Korean grammar pattern Dùng để biểu thị that a certain action must be done or a condition must be met, similar to 'have to' or 'must' trong câu. The verb stem is followed by 아/어/여야 (and often combined with 하다 or 되다) to convey obligation.",
    "formation": "Động từ Stem + 아/어/여야 (하다/된다/합니다)"
  },
  "ko_후에_78": {
    "title": "~후에 [hue] (After)",
    "shortExplanation": "Dùng để biểu thị that an action or event happens after another action or event.",
    "longExplanation": "'~후에 [hue]' is a time-related grammar point trong tiếng Hàn that means 'after'. It connects two different events or actions, emphasizing the chronological order: the second event happens after the first.",
    "formation": "Động từ (으)ㄴ + 후에"
  },
  "ko__79": {
    "title": "~(으)나 [(eu)na] (But, however)",
    "shortExplanation": "Dùng để diễn tả contradiction or opposition; 'but', 'however'.",
    "longExplanation": "'~(으)나 [(eu)na]' is a conjunction used trong tiếng Hàn to indicate a contrast or sự mâu thuẫn giữa hai mệnh đề or sentences. It delivers a meaning similar to 'but' or 'however' trong câu, and is often used when presenting a surprising or opposing fact.",
    "formation": "Statement + ~(으)나 + Contradictory statement"
  },
  "ko__80": {
    "title": "~(으)ㄹ까요? [(eu)lkka yo?] (Shall we?)",
    "shortExplanation": "Used to make a suggestion or proposal to do something together.",
    "longExplanation": "'~(으)ㄹ까요?' is a Korean sentence ending used when the speaker proposes doing something together. With verbs ending in a vowel, 'ㄹ까요?' is added, while those ending in a consonant take '을까요?'. It corresponds to 'Shall we...?' or 'Should we...?' trong câu.",
    "formation": "Động từ-stem + (으)ㄹ까요?"
  },
  "ko__81": {
    "title": "~(으)ㄹ래요 [(eu)llae yo] (I will)",
    "shortExplanation": "This grammar point is used when the speaker is suggesting doing something or explaining his/her intention.",
    "longExplanation": "'~(으)ㄹ래요 [(eu)llae yo]' is a Korean grammar structure Dùng để diễn tả the speaker's intention or decision to perform an action. It can also indicate a suggestion, inviting others to join or agree. It is typically used in informal or polite-casual situations among friends, family, and people who are about the same age or younger.",
    "formation": "(Động từ stem) + (으)ㄹ래요"
  },
  "ko__82": {
    "title": "~(으)면서 [(eu)myeonseo] (While)",
    "shortExplanation": "Dùng để diễn tả 'while' or 'at the same time' trong tiếng Hàn.",
    "longExplanation": "'~(으)면서 [(eu)myeonseo]' is used trong tiếng Hàn to denote simultaneous actions or states. It is similar to 'while' trong câu, indicating that two or more actions are happening at the same time. It can also be Dùng để diễn tả contradictions between two clauses, akin to 'but' or 'however', especially when the two clauses seem unexpected together.",
    "formation": "Động từ + ~(으)면서"
  },
  "ko__83": {
    "title": "~(으)로 [(eu)ro] (Towards, by means of)",
    "shortExplanation": "This particle is Dùng để diễn tả direction, means or method, or the purpose of an action.",
    "longExplanation": "'~(으)로 [(eu)ro]' is a particle trong tiếng Hàn that can express: (1) the direction towards which an action is made, (2) the means or method by which an action is carried out, or (3) the intended result or purpose of an action. Depending on context, it can correspond to English prepositions like 'to', 'by', 'with', 'as', or 'for'.",
    "formation": "If the preceding noun ends with a vowel, use '로'. If it ends with a consonant, use '으로'."
  },
  "ko__84": {
    "title": "~(으)로서 [(eu)roseo] (As)",
    "shortExplanation": "Used to mean 'as' or 'in the capacity of'.",
    "longExplanation": "The Korean grammar point '~(으)로서 [(eu)roseo]' is Dùng để diễn tả the concept of doing or existing in the capacity or status of something or someone. This is akin to the English preposition 'as'. If the noun ends with a consonant, use 으로서; if the noun ends with a vowel, use 로서.",
    "formation": "Consonant-ending noun + 으로서 / Vowel-ending noun + 로서"
  },
  "ko__85": {
    "title": "~(으)로써 [(eu)rosseo] (By, as)",
    "shortExplanation": "Dùng để diễn tả the means or method of something; similar to 'by', 'as', or 'via' trong câu.",
    "longExplanation": "'~(으)로써 [(eu)rosseo]' is used trong tiếng Hàn to indicate the method or means by which something is accomplished, or the capacity in which someone is acting. It emphasizes 'by means of', 'with', 'as', or 'via'. In everyday speech, '~(으)로써' is somewhat formal/literary, while '(으)로' often suffices. But '(으)로써' more explicitly stresses the means or instrument.",
    "formation": "Danh từ + ~(으)로써"
  },
  "ko__86": {
    "title": "~(으)려고 하다 [(eu)ryeogo hada] (To try to)",
    "shortExplanation": "This structure is Dùng để diễn tả 'trying to do' something or 'intending to do' something.",
    "longExplanation": "'~(으)려고 하다 [(eu)ryeogo hada]' is a useful grammar pattern trong tiếng Hàn that Biểu thị an intention or a plan to perform an action in the future. It corresponds to English expressions like 'I’m going to…' or 'I intend to…'. It can also show that someone is actively making an effort to achieve a goal.",
    "formation": "Động từ Stem + (으)려고 하다"
  },
  "ko__87": {
    "title": "~(으)리라 [(eu)rira] (Probably)",
    "shortExplanation": "This grammar form is Dùng để diễn tả a supposition or assumption by the speaker, similar to 'probably' trong câu.",
    "longExplanation": "'~(으)리라 [(eu)rira]' is a somewhat formal or literary form trong tiếng Hàn used when the speaker is making a supposition or assumption about something, much like 'probably' trong câu. If the verb stem ends in a consonant, add '으리라'; if it ends in a vowel, simply use '리라.' It can appear in both daily speech and writing, although it has a slightly more elevated nuance.",
    "formation": "Động từ stem + (으)리라"
  },
  "ko__88": {
    "title": "~(으)실 거예요 [(eu)sil geoyeyo] (You will probably)",
    "shortExplanation": "This grammar point is Dùng để diễn tả an educated guess or assumption about a future action, typically regarding a third person or in polite speech.",
    "longExplanation": "'~(으)실 거예요 [(eu)sil geoyeyo]' is a future tense form that Diễn tả a polite assumption about someone's future action or state. The speaker is making an educated guess based on available information. It can also convey someone’s future plan in an honorific/polite way.",
    "formation": "Động từ stem + (으)실 거예요"
  },
  "ko__89": {
    "title": "~(으)면 좋겠다 [(eu)myeon jokgetda] (It would be good if)",
    "shortExplanation": "Dùng để diễn tả a hope or wish for something to occur in the future.",
    "longExplanation": "'~(으)면 좋겠다 [(eu)myeon jokgetda]' is a structure used trong tiếng Hàn to articulate a hope, wish, or desire for a future event or situation. It is similar to saying 'It would be nice if...' or 'I wish...' trong câu.",
    "formation": "Động từ-stem + (으)면 좋겠다"
  },
  "ko__90": {
    "title": "~(으)면서도 [(eu)myeonseodo] (While, although)",
    "shortExplanation": "Dùng để diễn tả 'while' or 'although', indicating a situation or action that happens concurrently with another, or contrary to expectation.",
    "longExplanation": "The grammar point '~(으)면서도' is used trong tiếng Hàn to indicate that an event or situation is happening while another is also taking place, or when something is contrary to expectation. Có thể dịch là 'while' or 'although'. This form can be used with both action verbs and descriptive verbs. You can Diễn tả continuation of two situations at the same time, or describe a contrasting situation that defies expectation.",
    "formation": "Động từ-stem + (으)면서도"
  },
  "ko__91": {
    "title": "~(으)니까 [(eu)nikka] (Because, Since)",
    "shortExplanation": "Dùng để diễn tả cause and effect, or to provide a reason or explanation.",
    "longExplanation": "'~(으)니까' is a conjunction used trong tiếng Hàn to Diễn tả relationship of cause and effect between two clauses, similar to 'because' or 'since' trong câu. It attaches to the verb (or adjective) stem, stating the reason why something is or will be in a certain state, or explaining the cause of an action or situation.",
    "formation": "Động từ-으니까 / Tính từ-으니까"
  },
  "ko__92": {
    "title": "~(으)다 보니 [(eu)da boni] (Seeing that, as)",
    "shortExplanation": "Dùng để chỉ ra the reason or cause of a certain result or situation based on a continuous action or state.",
    "longExplanation": "'~(으)다 보니' is a grammatical construct trong tiếng Hàn that Diễn tả a result or realization that naturally occurred through ongoing action or state. It's similar to the English expressions 'seeing that' or 'as a result of (continuing to do something)'. It shows that one thing led naturally or inevitably to another.",
    "formation": "Động từ-(으)다 보니"
  },
  "ko__93": {
    "title": "~(으)다가 [(eu)daga] (And then, but)",
    "shortExplanation": "Diễn tả a sequence of actions or represents a contrast in situations.",
    "longExplanation": "'~(으)다가' is a common Korean grammar point that can mean 'and then' (one action followed by another) or show a shift from one action/situation to a different or contrasting one. It may translate to 'while doing something, then...' or 'but suddenly...' trong câu, depending on context.",
    "formation": "Động từ stem + 다가 / Động từ stem + 으다가 (If the verb stem ends in a consonant)"
  },
  "ko__94": {
    "title": "~(으)던 [(eu)deon] (Who used to)",
    "shortExplanation": "This is used to describe an action or state that used to exist in the past but does not exist now.",
    "longExplanation": "'~(으)던' is used when referring back to a past action or state that has since ended or changed. It corresponds to 'who used to' or 'that used to' trong câu. It often implies something was habitual or continuous, or it was once true but is no longer so.",
    "formation": "Động từ-던 / Tính từ-던"
  },
  "ko__95": {
    "title": "~(으)려면 [(eu)ryeomyeon] (In order to)",
    "shortExplanation": "Dùng để diễn tả the condition or criteria needed to realize a certain goal or result; 'in order to', 'if one wants to'.",
    "longExplanation": "'~(으)려면' is used trong tiếng Hàn to present the conditions required to achieve a particular outcome or goal. Có thể dịch là 'in order to' or 'if you want to'. It emphasizes that certain conditions must be met for the intended result to happen.",
    "formation": "Động từ stem + 으려면 (if ending in a consonant) / Động từ stem + 려면 (if ending in a vowel)"
  },
  "ko__96": {
    "title": "~(으)ㄹ 수록 [(eu)l surok] (The more)",
    "shortExplanation": "Dùng để diễn tả an increase in degree, intensity, or extent; 'the more... the more...'.",
    "longExplanation": "'~(으)ㄹ수록' is a pattern Dùng để chỉ ra that one action or state increasingly affects another, similar to 'the more... the more...' trong câu. It Biểu thị that as one element increases (or decreases), another is affected proportionally.",
    "formation": "Động từ stem + ~(으)ㄹ수록"
  },
  "ko__97": {
    "title": "~(으)ㄴ/는 중 [(eu)n/neun jung] (In the middle of)",
    "shortExplanation": "Dùng để biểu thị 'in the process' or 'in the middle of' certain actions or states.",
    "longExplanation": "'~(으)ㄴ/는 중' is used trong tiếng Hàn to express ongoing actions or states, similar to continuous/progressive forms trong câu. It suggests that the speaker (or subject) is 'in the middle of' doing something right now, or is currently in some state. The form depends on whether the verb ends in a vowel or consonant.",
    "formation": "Động từ stem + ~(으)ㄴ 중 or 는 중"
  },
  "ko__98": {
    "title": "~(으)ㄴ/는 탓에 [(eu)n/neun tase] (Because of)",
    "shortExplanation": "Dùng để diễn tả the cause of a negative result or situation; 'because of'.",
    "longExplanation": "'~(으)ㄴ/는 탓에' is a grammar point trong tiếng Hàn Dùng để diễn tả that a particular cause led to a negative or undesirable outcome. It is akin to 'because of' trong câu when something unfortunate happens due to a specified reason.",
    "formation": "Mệnh đề + ~(으)ㄴ/는 탓에 + Negative outcome"
  },
  "ko__99": {
    "title": "~(으)ㄴ/는데다가 [(eu)n/neundedaga] (Moreover, additionally)",
    "shortExplanation": "Used to add more information, similar to 'moreover' or 'additionally' trong câu.",
    "longExplanation": "'~(으)ㄴ/는데다가' is a compound grammar form trong tiếng Hàn used to add an extra piece of information on top of what was already mentioned, similar to 'moreover', 'besides', or 'furthermore' trong câu. It can attach to verbs, adjectives, or nouns (with the right connectors), providing an additional detail or characteristic that reinforces what came before.",
    "formation": "(Động từ/Tính từ/Danh từ) + ~(으)ㄴ/는데다가 + [Sentence]"
  },
  "ko__100": {
    "title": "~(으)ㄴ/는데도 불구하고 [(eu)n/neundedo bulguhago] (Despite, in spite of)",
    "shortExplanation": "Dùng để diễn tả 'despite' or 'in spite of'.",
    "longExplanation": "'~(으)ㄴ/는데도 불구하고' is a longer conjunction trong tiếng Hàn that Biểu thị a counter-expected result. It means 'despite' or 'in spite of' the first clause, the second (often unexpected) result still happened. It emphasizes that the outcome defies the expectation one might have based on the first clause.",
    "formation": "Tính từ/Động từ in past or present tense + ~(으)ㄴ/는데도 불구하고"
  },
  "ko__101": {
    "title": "~(으)ㄴ/는지 모르겠다 [(eu)n/neunji moreugessda] (I'm not sure if)",
    "shortExplanation": "Dùng để diễn tả uncertainty or lack of confidence about something; 'I'm not sure if'.",
    "longExplanation": "'~(으)ㄴ/는지 모르겠다' is used trong tiếng Hàn when the speaker is not certain about some fact or situation. It often corresponds to 'I don't know if...' or 'I'm not sure whether...' trong câu. You attach ~(으)ㄴ/는지 to the verb or adjective stem, then add 모르겠다 (or 모른다, 모르겠어요, etc.) to indicate uncertainty.",
    "formation": "Động từ/Tính từ + ~(으)ㄴ/는지 + 모르겠다"
  },
  "ko__102": {
    "title": "~(으)려는 참이다 [(eu)ryeoneun chamida] (I really want to)",
    "shortExplanation": "Dùng để diễn tả a strong desire or intention to do something, often implying frustration at not being able to do it.",
    "longExplanation": "'~(으)려는 참이다' emphasizes a strong intent or desire toward an action, sometimes accompanied by a sense of frustration or impatience. Có thể dịch là 'I was just about to...' or 'I really want to...' trong câu. It's commonly used when you feel you have been holding yourself back but are on the verge of acting.",
    "formation": "Động từ-으려는 + 참이다 / Động từ-려는 + 참이다"
  },
  "ko__103": {
    "title": "~(으)ㄹ 것 같다 [(eu)l geot gatda] (It seems like)",
    "shortExplanation": "Dùng để diễn tả a guess, assumption, or prediction.",
    "longExplanation": "'~(으)ㄹ 것 같다' is used to say that something seems like it will happen, or that you assume/predict something based on what you know. Whether you use '으' depends on whether the verb/adjective stem ends in a consonant or vowel. In casual speech, you’ll often hear it as '것 같아(요).'",
    "formation": "Động từ/Tính từ Stem + (으)ㄹ 것 같다"
  },
  "ko__104": {
    "title": "~(으)ㄹ 것이다 [(eu)l geosida] (Will likely)",
    "shortExplanation": "Dùng để diễn tả probability, anticipation, or plan for the future; 'will likely', 'will', 'is going to'.",
    "longExplanation": "'~(으)ㄹ 것이다' is used trong tiếng Hàn to indicate a prediction, expectation, or plan regarding the future, akin to 'will' trong câu. It implies the speaker’s belief or intention about what will happen or what they (or someone else) will do.",
    "formation": "Động từ stem + ㄹ 것이다 (if ending in a vowel) / 을 것이다 (if ending in a consonant)"
  },
  "ko__105": {
    "title": "~(으)ㄹ 뿐만 아니라 [(eu)l ppunman anira] (Not only... but also...)",
    "shortExplanation": "Dùng để diễn tả 'not only..., but also...'.",
    "longExplanation": "'~(으)ㄹ 뿐만 아니라' is used trong tiếng Hàn to emphasize two or more statements are true. The second part adds new information that supports or expands upon the first part, akin to 'not only…but also…' trong câu.",
    "formation": "Động từ/Tính từ/Danh từ + ~(으)ㄹ 뿐만 아니라 + [Additional statement]"
  },
  "ko__106": {
    "title": "~(으)ㄹ 뿐이다 [(eu)l ppunida] (Only, just)",
    "shortExplanation": "Dùng để diễn tả 'only' or 'just', emphasizing a sole action or state.",
    "longExplanation": "'~(으)ㄹ 뿐이다' emphasizes that there is nothing more or different beyond what’s stated. It’s similar to saying 'I only do X' or 'It’s just that…' trong câu. The form depends on whether the verb stem ends in a vowel (ㄹ 뿐이다) or consonant (을 뿐이다).",
    "formation": "Động từ stem + ~(으)ㄹ 뿐이다"
  },
  "ko__107": {
    "title": "~(으)ㄹ게요 [(eu)lgeyo] (I will, in the future)",
    "shortExplanation": "Dùng để diễn tả an intention or promise about the future, often showing the speaker’s determination.",
    "longExplanation": "'~(으)ㄹ게요' is a polite way trong tiếng Hàn to show the speaker’s intention or promise to do something soon. It also conveys the speaker’s will to carry out the action. Which form (을게요 or ㄹ게요) you use depends on the final sound of the verb stem.",
    "formation": "Động từ stem + (으)ㄹ게요"
  },
  "ko__108": {
    "title": "~(으)ㄹ게 [(eu)lge] (I will, in the future)",
    "shortExplanation": "A casual way to indicate the speaker will do something in the future, often reflecting one’s decision or promise.",
    "longExplanation": "'~(으)ㄹ게' is the casual version of '~(으)ㄹ게요', used among friends or people of the same age. It Diễn tả the speaker’s intention or promise to do something soon. As with '~(으)ㄹ게요', the form depends on the final sound of the verb stem.",
    "formation": "Động từ stem + (으)ㄹ게"
  },
  "ko__109": {
    "title": "~(으)ㄹ래 [(eu)llae] (I want to)",
    "shortExplanation": "Dùng để diễn tả that the speaker wants or intends to do something, usually in casual speech.",
    "longExplanation": "'~(으)ㄹ래' is used in casual Korean to indicate the speaker’s desire or plan to do something. It can translate to 'I want to…' or 'Shall we…?' depending on context. It is more informal than '~(으)ㄹ게요.'",
    "formation": "Động từ stem + (으)ㄹ래"
  },
  "ko__110": {
    "title": "~(으)ㄹ 때 [eul ttae] (When, while)",
    "shortExplanation": "Dùng để biểu thị a specific time or situation for an action; 'when', 'while'.",
    "longExplanation": "'~(으)ㄹ 때 [eul ttae]' is a common Korean grammar structure meaning 'when' or 'while'. It attaches to the verb stem or adjective stem to show that an action/event takes place under those circumstances or at that time.",
    "formation": "Động từ/Tính từ stem + (으)ㄹ 때"
  },
  "ko__111": {
    "title": "~(으)ㄹ 테니까 [(eu)l tenikka] (Since I assume)",
    "shortExplanation": "Used when the speaker makes a guess or assumption, then provides advice or a suggestion based on that assumption.",
    "longExplanation": "'~(으)ㄹ 테니까' Biểu thị a future assumption or strong belief about a situation, followed by advice or a suggestion. It shows that the speaker is giving guidance or instructions that hinge on this assumption.",
    "formation": "Động từ/Tính từ stem + (으)ㄹ 테니까"
  },
  "ko__112": {
    "title": "~(으)ㄹ지라도 [(eu)ljirado] (Even if)",
    "shortExplanation": "Dùng để diễn tả 'even if', emphasizing that a certain action or decision remains unchanged regardless of the situation.",
    "longExplanation": "'~(으)ㄹ지라도' is a complex suffix used trong tiếng Hàn to signify 'even if' or 'although'. It is commonly used for mentioning a hypothetical or difficult scenario, yet affirming that one’s stance or decision does not change. It emphasizes the speaker’s firm determination or resolution in spite of possible negative outcomes.",
    "formation": "Động từ Stem + (으)ㄹ지라도"
  },
  "ko__113": {
    "title": "~(으)면서도 [(eu)myeonseodo] (While, although)",
    "shortExplanation": "Dùng để diễn tả contrast or contradiction; 'while', 'although'.",
    "longExplanation": "'~(으)면서도' is used trong tiếng Hàn to show that two actions or states occur simultaneously, yet they are somewhat contradictory or unexpected when considered together. It is akin to saying 'while' or 'even though' trong câu.",
    "formation": "Động từ stem + (으)면서도"
  },
  "ko__114": {
    "title": "~(으)시면 [(eu)simyeon] (If you)",
    "shortExplanation": "Dùng để diễn tả a polite conditional, translating to 'if you' or 'when you' trong câu.",
    "longExplanation": "'~(으)시면' is a polite conditional form used to say 'if you...' or 'when you...' in a respectful way. It is often directed at someone of equal or higher status, indicating a formal or polite tone.",
    "formation": "Động từ stem + (으)시면"
  },
  "ko__115": {
    "title": "~(으)시겠어요 [(eu)sigesseoyo] (You will probably)",
    "shortExplanation": "Dùng để diễn tả probability or an assumption about the listener’s action or state, in a polite way.",
    "longExplanation": "'~(으)시겠어요' is a polite form trong tiếng Hàn Dùng để diễn tả the speaker’s assumption or expectation about the listener’s future condition or action. It conveys respect and is often used in formal or semi-formal conversation.",
    "formation": "Động từ stem + (으)시겠어요"
  },
  "ko__116": {
    "title": "~(으)ㅂ시다 [(eu)bshida] (Let's)",
    "shortExplanation": "Used to propose or suggest an activity together; 'Let's'.",
    "longExplanation": "'~(으)ㅂ시다' is the standard form trong tiếng Hàn used to suggest doing something together, equivalent to 'Let's' trong câu. The form depends on whether the verb stem ends in a vowel (ㅂ시다) or consonant (읍시다).",
    "formation": "Động từ stem + ㅂ시다 / 읍시다"
  },
  "ko__117": {
    "title": "~(으)십시오 [(eu)sipsio] (Please)",
    "shortExplanation": "Dùng để diễn tả polite requests or commands; roughly 'please do ~'.",
    "longExplanation": "'~(으)십시오' is one of the most formal imperative endings trong tiếng Hàn, used to give commands or requests politely. It corresponds to 'please do ~' trong câu. Whether you use '십시오' or '으십시오' depends on whether the verb stem ends in a vowel or a consonant.",
    "formation": "Động từ stem + (으)십시오"
  },
  "ko__0": {
    "title": "~(으)나마 [(eu)nama] (At least, even if only)",
    "shortExplanation": "Dùng để diễn tả the modest amount of what you can do or accept.",
    "longExplanation": "'~(으)나마 [(eu)nama]' is a grammar point used trong tiếng Hàn to express that even if the quantity or degree is modest, it is at least that much. It can have a sense of consolation or slight regret, but also a feeling that one can be satisfied with that small amount in a given situation.",
    "formation": "Động từ stem + 나마 / Danh từ + 이나마"
  },
  "ko__1": {
    "title": "~(으)니까 [(eu)nikka] (Because, so)",
    "shortExplanation": "Dùng để biểu thị the cause or reason; 'Because', 'So'.",
    "longExplanation": "'~(으)니까 [(eu)nikka]' is a conjunction used trong tiếng Hàn to indicate the cause or reason why something happens or a certain situation exists. It is similar to 'because' or 'so' trong câu. It is most often used in casual conversations and can be used both for positive and negative statements.",
    "formation": "Động từ/Tính từ stem + (으)니까"
  },
  "ko__2": {
    "title": "~(으)려다가 [(eu)ryeodaga] (Was about to, tried to)",
    "shortExplanation": "This grammar point is Dùng để diễn tả an action that was about to happen but did not take place due to some intervening cause.",
    "longExplanation": "'~(으)려다가' is used when you want to express an action that was on the verge of happening or one that you intended to do, but for some reason did not happen, or another event intervened. Depending on the context, Có thể dịch là 'was about to', 'tried to', 'was going to', or 'intended to'.",
    "formation": "Động từ stem + (으)려다가"
  },
  "ko__3": {
    "title": "~(으)니 [(eu)ni] (Because, as one would expect)",
    "shortExplanation": "Dùng để biểu thị that given the circumstances, the result is natural or to be expected.",
    "longExplanation": "'~(으)니 [(eu)ni]' is often used trong tiếng Hàn to mean 'because' or 'since,' emphasizing a cause-and-effect relationship or a natural/expected result. It can sound slightly more formal or written than '~(으)니까', and is also common in narratives to show that something is an obvious conclusion based on a certain action or condition.",
    "formation": "Động từ/Tính từ stem + (으)니"
  },
  "ko__4": {
    "title": "~(으)면 ~(으)ㄹ수록 [(eu)myeon ~(eu)lsurok] (The more... the more...)",
    "shortExplanation": "Dùng để diễn tả the idea that the more one situation or action occurs, the more another result follows.",
    "longExplanation": "'~(으)면 ~(으)ㄹ수록' is Dùng để chỉ ra a relationship of proportion, much like the English pattern 'the more..., the more...'. The first clause describes a certain action or condition increasing, and the second clause describes the corresponding change or result that likewise increases or intensifies.",
    "formation": "Động từ/Tính từ stem + (으)면 + (으)ㄹ수록"
  },
  "ko__5": {
    "title": "~(으)면서는 [(eu)myeonseoneun] (While, whereas)",
    "shortExplanation": "Used to connect two conflicting or contrasting situations or actions, often to criticize or show surprise.",
    "longExplanation": "The grammar point '~(으)면서는' is used to connect two contrasting or unexpected situations trong tiếng Hàn. Có thể dịch là 'while' or 'whereas,' but it has a nuance of slight criticism or emphasis on the contradiction. It often conveys the speaker's surprise, disappointment, or disapproval about the two coexisting states.",
    "formation": "(Động từ/Tính từ stem) + (으)면서는"
  },
  "ko__6": {
    "title": "~(으)시거나 [(eu)sigeona] (Either... or... [honorific])",
    "shortExplanation": "Used to present two or more possibilities or choices in a respectful manner (honorific).",
    "longExplanation": "'~(으)시거나' is the honorific form of '~거나' (meaning 'or'), used when speaking about or to elders, superiors, or in polite/formal situations. It gives multiple alternatives, allowing the subject (respected person) to choose.",
    "formation": "Động từ stem + (으)시거나 / Danh từ + (이)시거나"
  },
  "ko__7": {
    "title": "~(으)시든지 [(eu)sideunji] (Whether... or... [honorific])",
    "shortExplanation": "Used to list two or more possibilities in a respectful manner.",
    "longExplanation": "The grammar point '~(으)시든지' is the honorific counterpart of '~든지', which means 'whether... or...' and presents multiple possibilities or conditions politely. It allows freedom of choice for the respected person, without asserting which option is preferred.",
    "formation": "Động từ stem + (으)시든지 / Tính từ + (으)시든지 / Danh từ + (이)시든지"
  },
  "ko__8": {
    "title": "~(으)ㄹ 데가 없다 [(eu)l dega eopda] (There's no way to...)",
    "shortExplanation": "Dùng để diễn tả 'there's absolutely no way/place/opportunity to...' do something.",
    "longExplanation": "The phrase '~(으)ㄹ 데가 없다' literally means 'there is no place/way to do X' and emphasizes that, given the conditions, there is no possibility or option for the action. It can sound somewhat figurative, referring to both physical 'place' or a 'method/means' of doing something.",
    "formation": "Động từ stem + (으)ㄹ 데가 없다"
  },
  "ko__9": {
    "title": "~(으)ㄹ 수밖에 없다 [(eu)l subakke eopda] (Have no choice but to)",
    "shortExplanation": "Dùng để diễn tả that one has 'no choice but to' do something.",
    "longExplanation": "'~(으)ㄹ 수밖에 없다' emphasizes that a certain action or situation is unavoidable or inevitable. It is equivalent to the English phrase 'have no choice but to.'",
    "formation": "Động từ stem + (으)ㄹ 수밖에 없다"
  },
  "ko__10": {
    "title": "~(으)ㄹ지라도 [(eu)ljirado] (Even if)",
    "shortExplanation": "This grammar point is Dùng để diễn tả 'even if' or 'no matter how'.",
    "longExplanation": "'~(으)ㄹ지라도 [(eu)ljirado]' is a conditional ending trong tiếng Hàn used to convey that, even if the situation in the first clause is true, it does not affect or change the action or stance in the following clause. It often translates to 'no matter how' or 'even if'. It can also express an unlikely supposition or a scenario beyond one's control.",
    "formation": "Động từ/Tính từ stem + (으)ㄹ지라도"
  },
  "ko__11": {
    "title": "~(으)려나 [(eu)ryeona] (I wonder if...)",
    "shortExplanation": "This grammar point is used when the speaker is wondering or pondering about a future possibility or outcome.",
    "longExplanation": "'~(으)려나 [(eu)ryeona]' is used trong tiếng Hàn to express doubt, curiosity, or speculation about a situation in the future. It is similar to the English expression 'I wonder if'. If the verb stem ends in a vowel, '려나' is used; if it ends in a consonant, '으려나' is used.",
    "formation": "Động từ stem + (으)려나"
  },
  "ko_겠지만_12": {
    "title": "~겠지만 [gesjiman] (I think, but...)",
    "shortExplanation": "Dùng để diễn tả an assumption or conjecture followed by a contrasting idea or condition.",
    "longExplanation": "'~겠지만 [gesjiman]' is used trong tiếng Hàn to show a strong guess or assumption about something, immediately followed by a contrast or a different condition. It can be compared to the English phrase 'I think (that)... but...', and sometimes conveys a note of uncertainty or reservation.",
    "formation": "Động từ/Tính từ stem + 겠지만"
  },
  "ko_게_13": {
    "title": "~게 되다 [ge dweda] (End up, come to)",
    "shortExplanation": "Dùng để diễn tả that an action or situation resulted naturally or unintentionally.",
    "longExplanation": "'~게 되다' is Dùng để biểu thị that an action or state 'came to be' as a result of certain circumstances, often without direct intention. It can refer to an unexpected outcome or something that happened gradually and naturally. It frequently translates as 'end up doing' or 'come to do' trong câu.",
    "formation": "Động từ stem + 게 되다"
  },
  "ko_게_14": {
    "title": "~게 하다 [ge hada] (Make/cause someone to do)",
    "shortExplanation": "Dùng để diễn tả 'making' or 'causing' someone to do something.",
    "longExplanation": "'~게 하다' Biểu thị that someone or something makes or causes another person to perform an action. It corresponds to 'make/let/cause (someone) do something' trong câu. The subject is the person causing the action, and the object is the one who is made to do it.",
    "formation": "Động từ stem + 게 하다"
  },
  "ko_고_15": {
    "title": "~고 말다 [go malda] (End up)",
    "shortExplanation": "Dùng để diễn tả that an action is completed or ends with an unexpected or unintended result.",
    "longExplanation": "'~고 말다' emphasizes that an action/event reached its conclusion (often regretfully or unexpectedly). It can carry the nuance of something happening despite efforts or intentions to avoid it, leading to a sense of finality or mild lament.",
    "formation": "Động từ stem + 고 말다"
  },
  "ko_고_16": {
    "title": "~고 말하다 [go malhada] (Say that...)",
    "shortExplanation": "Used to convey that someone said something in a manner suggesting finality or firm intention.",
    "longExplanation": "The construction '~고 말하다' trong tiếng Hàn means 'to say (something).' It can carry a nuance of definitiveness or insistence in the statement. It is often used when someone states a fact, an order, or a firm decision they have made.",
    "formation": "Mệnh đề + 고 말하다"
  },
  "ko_고_17": {
    "title": "~고 보면 [go bomyeon] (Upon closer look, when you consider)",
    "shortExplanation": "Dùng để diễn tả the meaning 'when seen/considered in a certain way' or 'once you look at it, you realize...'.",
    "longExplanation": "'~고 보면 [go bomyeon]' conveys the idea that after doing or seeing something, a new perspective or outcome emerges. It Biểu thị that things may look different 'when you actually do/see them'.",
    "formation": "Động từ stem + 고 보면"
  },
  "ko_고서_18": {
    "title": "~고서 [goseo] (After doing)",
    "shortExplanation": "Dùng để diễn tả that an action is performed after the execution of another action.",
    "longExplanation": "'~고서 [goseo]' is a Korean grammar form Dùng để biểu thị that another action or event occurs after the first action has been completed. It roughly translates to 'after doing something.' This construction usually implies that the same subject completes one action and then proceeds somewhat directly to the next.",
    "formation": "Động từ stem + 고서"
  },
  "ko_고자_19": {
    "title": "~고자 [goja] (In order to)",
    "shortExplanation": "Dùng để diễn tả the purpose or aim of an action: 'in order to', 'for the purpose of'.",
    "longExplanation": "'~고자 [goja]' is Dùng để diễn tả someone’s intention or goal—like 'in order to' trong câu. It clarifies the purpose of an action. Note that this form is somewhat formal or literary; in more casual speech, you might see different expressions such as '~려고'.",
    "formation": "Động từ stem + 고자"
  },
  "ko_기는_20": {
    "title": "~기는 하다 [gineun hada] (Do something but...)",
    "shortExplanation": "Dùng để diễn tả 'I do (action) but...', showing a contrast with an additional clause.",
    "longExplanation": "'~기는 하다 [gineun hada]' acknowledges that something is true while introducing a contrasting or qualifying statement. The nuance is similar to 'I do X, but...' or 'Yes, it’s true that X, but...' trong câu.",
    "formation": "Động từ stem + 기는 하다"
  },
  "ko_기로_21": {
    "title": "~기로 하다 [giro hada] (Decide to)",
    "shortExplanation": "Dùng để diễn tả the decision or resolution to do something.",
    "longExplanation": "'~기로 하다 [giro hada]' is Dùng để biểu thị that someone has decided or resolved to carry out a particular action. It can refer to personal decisions or collectively agreed plans, often used when describing future intentions.",
    "formation": "Động từ stem + 기로 하다"
  },
  "ko_기로_22": {
    "title": "~기로 되다 [giro dweda] (It is decided/settled)",
    "shortExplanation": "Dùng để diễn tả that something has been officially decided or settled.",
    "longExplanation": "'~기로 되다 [giro dweda]' is used when a decision has been made—often collectively or officially—and is now settled. It is akin to ‘It has been decided that...’ trong câu.",
    "formation": "Động từ stem + 기로 되다"
  },
  "ko_기_23": {
    "title": "~기 시작하다 [gi sijak-hada] (Begin to)",
    "shortExplanation": "Dùng để diễn tả the beginning of an action or state.",
    "longExplanation": "'~기 시작하다 [gi sijak-hada]' means 'to start doing something.' It's comparable to 'begin to' or 'start to' trong câu. It emphasizes that an action or condition has just begun.",
    "formation": "Động từ stem + 기 시작하다"
  },
  "ko_기_24": {
    "title": "~기 전에 [gi jeone] (Before)",
    "shortExplanation": "'~기 전에' is Dùng để diễn tả 'before doing something'.",
    "longExplanation": "'~기 전에 [gi jeone]' means 'before (doing something).' It marks that one action or state happens prior to another. Commonly used with the infinitive form of the verb plus '기 전에'.",
    "formation": "Động từ stem + 기 전에"
  },
  "ko_기_25": {
    "title": "~기 힘들다 [gi himdeulda] (It's hard to...)",
    "shortExplanation": "Diễn tả difficulty in performing an action or task.",
    "longExplanation": "'~기 힘들다 [gi himdeulda]' is used to describe that it's difficult or hard to do something. '힘들다' means 'hard' or 'tough,' while the preceding '~기' nominalizes the verb, turning it into 'doing X is hard.'",
    "formation": "Động từ stem + 기 + 힘들다"
  },
  "ko_기를_26": {
    "title": "~기를 [gireul] (In order to)",
    "shortExplanation": "Dùng để biểu thị the purpose or motive behind an action, similar to 'in order to'.",
    "longExplanation": "'~기를 [gireul]' is attached to a verb (in its nominalized form) to mean 'in order to do X' or 'for the purpose of doing X.' It's frequently followed by expressions like '위해(서)' (wihae[seo]), highlighting intent or purpose.",
    "formation": "Động từ (기) + (을/를)"
  },
  "ko_기만_27": {
    "title": "~기만 하다 [giman hada] (Just)",
    "shortExplanation": "'~기만 하다' is Dùng để diễn tả that someone or something does only the mentioned action and nothing else.",
    "longExplanation": "The grammar point '~기만 하다' is used trong tiếng Hàn to show exclusivity of action — that the verb in question is the only thing done. The nominalized form (~기) plus '만 하다' implies 'only do X.' Often, it can carry a slightly negative nuance or express dissatisfaction because it implies that the action is insufficient or not meeting expectations.",
    "formation": "Động từ (dictionary form) + 기만 하다"
  },
  "ko_기에는_28": {
    "title": "~기에는 [gieneun] (For, in order to)",
    "shortExplanation": "Dùng để diễn tả a purpose or intention ('for', 'in order to').",
    "longExplanation": "'~기에는 [gieneun]' is a structure used trong tiếng Hàn to indicate that one is doing something for a particular purpose or end goal, similar to 'in order to' or 'for the sake of' trong câu. It highlights the reason for an action and what is required to achieve it.",
    "formation": "Động từ stem + 기에는"
  },
  "ko_나_29": {
    "title": "~나 보다 [na boda] (It seems, looks like)",
    "shortExplanation": "Dùng để diễn tả an assumption or guess, like 'it seems' or 'looks like'.",
    "longExplanation": "'~나 보다 [na boda]' is a common grammar pattern trong tiếng Hàn for making inferences or guesses based on observation or context. Có thể dịch là 'it seems that...' or 'looks like...' trong câu. It does not express absolute certainty, only a plausible guess or assumption.",
    "formation": "Động từ stem + 나 보다"
  },
  "ko_나요_30": {
    "title": "~나요? [nayo?] (Isn't it?, right?)",
    "shortExplanation": "Used to confirm or get the listener's agreement or opinion.",
    "longExplanation": "'~나요? [nayo?]' is a colloquial way trong tiếng Hàn to seek the listener's confirmation or agreement, akin to saying 'Isn't it?' or 'Right?' trong câu. It invites the other person's feedback or concurrence, helping foster a cooperative tone in conversation.",
    "formation": "Động từ/Tính từ + (은/ㄴ/는/ㄹ) + 나요?"
  },
  "ko_남짓_31": {
    "title": "~남짓 [namjit] (About, around)",
    "shortExplanation": "Biểu thị an approximate number or amount (similar to 'about' or 'around').",
    "longExplanation": "'~남짓 [namjit]' is added after numbers to indicate an approximate quantity, similar to 'about' or 'around' trong câu. It suggests the total might be a bit more or a bit less than that number, providing a near approximation.",
    "formation": "Number + 남짓"
  },
  "ko_는_32": {
    "title": "~는 대로 [neun daero] (As is, the way it is)",
    "shortExplanation": "Dùng để diễn tả 'the same way', 'just as', or 'exactly like'.",
    "longExplanation": "'~는 대로 [neun daero]' can follow a verb stem or a noun to indicate 'the way it is done' or 'just as someone does something.' It emphasizes doing or perceiving something exactly as it is, or following a particular method without changing it.",
    "formation": "1) Động từ stem + 는 대로\n2) Danh từ + (으)로 + 대로\n(Note: actual usage varies depending on the part of speech.)"
  },
  "ko_는_33": {
    "title": "~는 바와 같이 [neun bawa gachi] (Just like, as if)",
    "shortExplanation": "Used to compare two situations, meaning 'just like' or 'as if'.",
    "longExplanation": "'~는 바와 같이 [neun bawa gachi]' is used to highlight a similarity between two actions or states. '바' (roughly 'the situation' or 'the way') and '같이' ('like') combine to mean 'just like that situation.' It carries a nuance similar to 'as if...' or 'the way that...' trong câu.",
    "formation": "Động từ stem + 는 바와 같이 / Danh từ + (인) 바와 같이"
  },
  "ko_는_34": {
    "title": "~는 편이다 [neun pyeonida] (Tend to)",
    "shortExplanation": "Dùng để diễn tả a habit, tendency, or general characteristic of someone.",
    "longExplanation": "The structure '~는 편이다' is used trong tiếng Hàn to express regular habits or tendencies. It is typically translated as 'tend to (do)', 'usually (do)', or 'often (do)'. It helps describe the usual or characteristic behavior of a person or situation.",
    "formation": "Động từ stem + 는 편이다"
  },
  "ko_는다는_35": {
    "title": "~는다는 것 [neundaneun geot] (The fact that)",
    "shortExplanation": "Dùng để diễn tả 'the fact that' or 'the meaning that' when referring to or summarizing someone's statement or idea.",
    "longExplanation": "The '~는다는 것' construction is used to convey or emphasize 'the fact that' something is stated or believed. It can summarize someone’s words, thoughts, or statements. It often appears in discussions to restate a point or highlight that a particular idea or fact is important.",
    "formation": "Động từ + 는다(는) + 는 것"
  },
  "ko_는데_36": {
    "title": "~는데 [neunde] (But, and, so)",
    "shortExplanation": "Used to connect two clauses in various contexts—often 'but', 'and', or 'so'.",
    "longExplanation": "'~는데' is a versatile connector trong tiếng Hàn. Its meaning depends on context—sometimes it Biểu thị contrast (but), sometimes a sequential or related action (and/so). It can also be used at the end of a clause to invite further elaboration or explanation.",
    "formation": "Động từ/Tính từ stem + 는데"
  },
  "ko_는지_37": {
    "title": "~는지 알다/모르다 [neunji alda/moreuda] (Know/don't know whether)",
    "shortExplanation": "Dùng để diễn tả knowing or not knowing whether something is or will be the case.",
    "longExplanation": "The '~는지 알다/모르다' structure is Dùng để biểu thị whether the speaker (or someone else) knows or doesn't know a particular fact or circumstance. It can also appear in questions to ask if someone knows about a certain situation.",
    "formation": "Động từ stem + 는지 + 알다/모르다"
  },
  "ko_는지라_38": {
    "title": "~는지라 [neunjira] (Because, since)",
    "shortExplanation": "Dùng để biểu thị the reason or cause ('because', 'since').",
    "longExplanation": "'~는지라 [neunjira]' emphasizes that the condition in the first clause is the reason or cause for the following situation. It can carry a nuance that the cause is somewhat pressing or unavoidable, functioning like 'because' or 'since'.",
    "formation": "Động từ/Tính từ stem + 는지라"
  },
  "ko_다가_39": {
    "title": "~다가 [daga] (While doing, was doing but)",
    "shortExplanation": "Connects two actions, indicating the first action was ongoing but got interrupted or changed by the second action.",
    "longExplanation": "'~다가' shows that one action or event was in progress when another action or situation intervened. It often implies that the second action wasn’t necessarily planned, but it happened and stopped the first action in its tracks.",
    "formation": "Động từ stem + 다가 + (second clause)"
  },
  "ko_다가는_40": {
    "title": "~다가는 [daganeun] (If continue doing)",
    "shortExplanation": "Diễn tả a potential negative outcome if a certain action continues.",
    "longExplanation": "The pattern '~다가는' warns about a negative result or consequence if the preceding action persists. It’s used to caution someone: 'If you keep doing X, then Y (bad result) will happen.'",
    "formation": "Động từ stem + 다가는"
  },
  "ko_다가도_41": {
    "title": "~다가도 [dagado] (Even though was doing)",
    "shortExplanation": "Biểu thị that an unexpected or sudden change occurred while in the middle of doing something.",
    "longExplanation": "'~다가도' is used when something disrupts or abruptly changes an action that was in progress. It conveys a nuance of surprise or sudden shift, differing from what was initially expected to happen.",
    "formation": "Động từ stem + 다가도"
  },
  "ko_다니_42": {
    "title": "~다니 [dani] (Exclamation, surprise)",
    "shortExplanation": "Dùng để diễn tả exclamation, surprise, disbelief, or shock.",
    "longExplanation": "'~다니 [dani]' conveys strong emotional reaction—amazement, incredulity, or shock—when hearing or realizing something. It's similar to saying 'I can't believe that...' or 'Really?!' trong câu. It can appear in direct or reported speech.",
    "formation": "Động từ + 아/어/여 + 다니 / Tính từ stem + 다니"
  },
  "ko_다면_43": {
    "title": "~다면 [damyeon] (If it is the case that)",
    "shortExplanation": "Diễn tả a hypothetical condition (similar to 'if' trong câu).",
    "longExplanation": "'~다면 [damyeon]' is used to form conditional statements, much like 'if' trong câu. It introduces a hypothetical scenario or condition, and the result or conclusion follows in the same sentence or after.",
    "formation": "Động từ stem + 다면 / Danh từ + (이)라면"
  },
  "ko_더라도_44": {
    "title": "~더라도 [deorado] (Even if)",
    "shortExplanation": "Dùng để diễn tả 'even if' or 'even though', presenting a hypothetical or contrary-to-fact condition.",
    "longExplanation": "'~더라도 [deorado]' is a Korean grammar pattern meaning 'even if' or 'even though.' It introduces a hypothetical or imagined scenario that does not prevent a certain action or outcome in the following clause. The overall sense is that the second action/decision remains firm despite the 'even if' condition.",
    "formation": "Động từ/Tính từ stem + 더라도"
  },
  "ko_더라구요_45": {
    "title": "~더라구요 [deoraguyo] (It seemed, I noticed)",
    "shortExplanation": "Diễn tả the speaker's personal observation or realization about a past event.",
    "longExplanation": "'~더라구요' is a casual, conversational ending trong tiếng Hàn for sharing something you noticed or realized. It Biểu thị the speaker is conveying newly discovered information or a personal impression from experience. It usually attaches to the verb stem in the past or descriptive form.",
    "formation": "Động từ stem + 더라구요"
  },
  "ko_던_46": {
    "title": "~던 [deon] (That used to)",
    "shortExplanation": "Refers to a past habit or situation that no longer continues.",
    "longExplanation": "'~던 [deon]' is used to describe a past action or state that used to happen or exist but no longer does. It often carries a nostalgic or retrospective nuance. It modifies a following noun, indicating something like, ‘the cafe I used to go to,’ or ‘the toy he used to play with.’",
    "formation": "Động từ stem + 던 (+ noun)"
  },
  "ko_도록_47": {
    "title": "~도록 [dorok] (So that, in order to)",
    "shortExplanation": "Biểu thị purpose or reason for an action; 'so that', 'in order to'.",
    "longExplanation": "'~도록 [dorok]' Diễn tả purpose, goal, or extent, similar to 'so that' or 'in order to' trong câu. It shows the reason or aim behind an action. It can also imply how long or to what degree an action continues.",
    "formation": "Động từ stem + 도록"
  },
  "ko_도록_48": {
    "title": "~도록 하다 [dorok hada] (Make sure, see to it that)",
    "shortExplanation": "Used to give instructions or commands to ensure a certain outcome.",
    "longExplanation": "'~도록 하다' can mean 'make sure to,' 'ensure that,' or 'see to it that.' The speaker is directing someone (or themselves) to do something in order to achieve or maintain a particular result. It often carries a sense of imperative or strong advice.",
    "formation": "Động từ stem + 도록 하다"
  },
  "ko_라든지_49": {
    "title": "~라든지 [radeunji] (Or, either)",
    "shortExplanation": "Lists options or possibilities; means 'or' or 'either'.",
    "longExplanation": "'~라든지 [radeunji]' is used to present multiple possible options or examples, similar to 'or' trong câu. You can list items or actions, emphasizing that these are merely examples among many possibilities.",
    "formation": "Danh từ/Động từ + 라든지 + (Danh từ/Động từ + 라든지)"
  },
  "ko_라도_50": {
    "title": "~라도 [rado] (Even if, at least)",
    "shortExplanation": "Biểu thị a fallback option ('at least') or a concession ('even if').",
    "longExplanation": "The Korean particle '~라도' often has two core usages: (1) 'even if' (though somewhat less strong than '~더라도'), or (2) selecting the least favorable or minimal option when there is no better choice, translating to 'at least.' It implies partial satisfaction or a fallback stance.",
    "formation": "1) Danh từ + (이)라도\n2) Sometimes attached to verbs or adjectives (but often overlaps with '~더라도')."
  },
  "ko_라서_51": {
    "title": "~라서 [raseo] (Because [it is Noun], so...)",
    "shortExplanation": "Used with nouns to express reason or cause, meaning 'because it is...' or 'so...'.",
    "longExplanation": "'~라서 [raseo]' (or '~이라서') attaches to **nouns**, showing that 'because (it is) X, ... follows.' It’s similar to '(으)라서' usage. For verbs and adjectives, Korean often uses '-아/어/해서.'",
    "formation": "Danh từ + (이)라서"
  },
  "ko_라야_52": {
    "title": "~라야 하다 [rayahada] (Must, have to)",
    "shortExplanation": "A formal/literary way to express obligation or necessity, akin to 'must.'",
    "longExplanation": "The phrase '~라야 하다' is a somewhat formal expression meaning 'must do X' or 'it’s necessary to do X.' It can appear with nouns (e.g., '학생이라야 한다') or with certain verb forms. In modern Korean, it's less common than '~아/어야 하다.'",
    "formation": "Danh từ + (이)라야 하다 / Certain verb forms + 라야 하다"
  },
  "ko_려고_53": {
    "title": "~려고 [ryeogo] (Intending to, planning to)",
    "shortExplanation": "Dùng để diễn tả intention or plan to do something.",
    "longExplanation": "'~려고' attaches to the verb stem to show the speaker’s plan or intention, similar to 'I'm going to...' or 'I'm planning to...' trong câu. It’s often used with future actions the speaker has decided on.",
    "formation": "Động từ stem + 려고"
  },
  "ko_려고_54": {
    "title": "~려고 하다 [ryeogo hada] (Try to, plan to)",
    "shortExplanation": "Dùng để diễn tả intention or an attempt to do something; similar to 'try to' or 'plan to' trong câu.",
    "longExplanation": "'~려고 하다 [ryeogo hada]' is a commonly used verb construction that Biểu thị the subject's intention or attempt to do something in the near future. Có thể dịch là 'I’m going to...', 'I plan to...', or 'I’m trying to...' trong câu.",
    "formation": "Động từ stem + 려고 하다"
  },
  "ko_려는데_55": {
    "title": "~려는데 [ryeoneunde] (Trying to, want to, but)",
    "shortExplanation": "Dùng để diễn tả an intention or plan, followed by a difficulty or complication.",
    "longExplanation": "'~려는데 [ryeoneunde]' Biểu thị that the speaker has an intention or plan (similar to '~려고 하는데'), but something is making it uncertain or difficult. It’s often followed by explanations of why the plan might fail or change.",
    "formation": "Động từ stem + 려는데"
  },
  "ko_리가_56": {
    "title": "~리가 없다 [riga eopda] (There’s no way that)",
    "shortExplanation": "Diễn tả impossibility or disbelief.",
    "longExplanation": "'~(으)ㄹ 리가 없다' Biểu thị that something is impossible or that there’s no chance it could happen. It conveys strong disbelief about the situation. Có thể dịch là 'There’s no way that...' or 'It can’t be that...'.",
    "formation": "Động từ (으)ㄹ 리가 없다"
  },
  "ko_리요_57": {
    "title": "~리요 [riyo] (Likely, probably)",
    "shortExplanation": "A more formal or older-style ending expressing a prediction or assumption.",
    "longExplanation": "'~리요' is a somewhat archaic or very formal style verb ending used for predictions or expectations about the future. It implies a relatively firm belief in the likelihood of the event. Modern usage might be rare in casual speech, but it can appear in narratives or historical contexts.",
    "formation": "Động từ stem + 리요"
  },
  "ko_마다_58": {
    "title": "~마다 [mada] (Every)",
    "shortExplanation": "Biểu thị something happens regularly or repeats at a certain interval.",
    "longExplanation": "'~마다' is a particle attached to time expressions (or other nouns) to mean 'every'—for example, 'every day,' 'every week,' or 'every time.' It shows that some event, activity, or situation occurs each time or regularly at that interval.",
    "formation": "Danh từ + 마다"
  },
  "ko_만_59": {
    "title": "~만 [man] (Only, just)",
    "shortExplanation": "Biểu thị exclusivity or limitation, equivalent to 'only' or 'just' trong câu.",
    "longExplanation": "'~만 [man]' is a particle attached to nouns (or pronouns) to show that something is restricted, or that it applies exclusively to that noun. It conveys ‘only X’ or ‘just X,’ excluding all else.",
    "formation": "Danh từ + 만"
  },
  "ko_만_60": {
    "title": "~만 하다 [man hada] (Sufficient, just right)",
    "shortExplanation": "Diễn tả that a certain amount or condition is enough or suitable.",
    "longExplanation": "This structure can be interpreted as ‘(it) is just enough to...’ or ‘(it) suffices to...’. Although in modern usage the pattern '~(으)ㄹ 만 하다' often means ‘worth doing something,’ certain contexts use ‘~만 하다’ to mean that something is just right or sufficient.",
    "formation": "Động từ stem + 만 하다"
  },
  "ko_만큼_61": {
    "title": "~만큼 [mankeum] (As much as, as many as)",
    "shortExplanation": "Biểu thị an equivalent degree or amount, meaning 'as much as' or 'to the extent that.'",
    "longExplanation": "'~만큼 [mankeum]' is used to denote an equivalent degree, quantity, or extent, similar to English ‘as much as’ or ‘as many as.’ It can attach to nouns, verbs, or adjectives, indicating the extent or degree matches the specified reference.",
    "formation": "Danh từ/Động từ/Tính từ + 만큼"
  },
  "ko_며면서_62": {
    "title": "~며/면서 [myeo/myeonseo] (While)",
    "shortExplanation": "Dùng để biểu thị two simultaneous or closely related actions/states, similar to 'while' trong câu.",
    "longExplanation": "The endings '~며' or '~면서' show that two actions happen at the same time or that one action occurs in the background of another. It can also highlight a contrast or additional aspect, but the main nuance is simultaneity—doing two things at once or having two states occur together.",
    "formation": "Động từ stem + 며/면서"
  },
  "ko_면_63": {
    "title": "~면 [myeon] (If)",
    "shortExplanation": "Dùng để biểu thị a conditional statement, equivalent to 'if' trong câu.",
    "longExplanation": "'~면 [myeon]' is a conditional form in the Korean language. It conveys the meaning of 'if', creating a condition that if a certain situation occurs, another event will follow. This grammar is often Dùng để diễn tả hypothetical situations or intentions that depend on a condition. Note that the verb typically appears in its plain or basic form before '~면'.",
    "formation": "Plain form of verb + 면"
  },
  "ko_면_64": {
    "title": "~면 어때 [myeon eottae] (How about if)",
    "shortExplanation": "Used to suggest an action or situation; 'How about if'.",
    "longExplanation": "'~면 어때 [myeon eottae]' is used trong tiếng Hàn to propose an alternative plan or seek agreement on a course of action. It can mean 'How about if...' or 'What if...'. The speaker is asking for someone’s opinion or reaction to a hypothetical idea.",
    "formation": "Động từ stem + 면 + 어때"
  },
  "ko_면서도_65": {
    "title": "~면서도 [myeonseodo] (Even though, while)",
    "shortExplanation": "Diễn tả a contrast or sự mâu thuẫn giữa hai mệnh đề, meaning 'even though' or 'while'.",
    "longExplanation": "'~면서도 [myeonseodo]' is used when two facts or actions coexist, yet they seem contradictory or contrasting. It can also convey 'despite' or 'although' trong câu, highlighting the unexpected coexistence of these two states or actions.",
    "formation": "Động từ/Tính từ stem + 면서도"
  },
  "ko_밖에_66": {
    "title": "~밖에 [bakke] (Only, nothing but)",
    "shortExplanation": "Used to emphasize 'only' or 'nothing but' when accompanied by a negative verb.",
    "longExplanation": "'~밖에 [bakke]' is a Korean particle that appears together with negative verbs to stress that there is nothing else except the stated noun. The sentence structure literally means 'aside from X, there is nothing/no one else,' conveying 'only X' or 'nothing but X.'",
    "formation": "Danh từ + 밖에 + Negative Động từ"
  },
  "ko_부터_67": {
    "title": "~부터 [buteo] (From)",
    "shortExplanation": "Biểu thị the starting point in time or space; 'from', 'since'.",
    "longExplanation": "'~부터 [buteo]' is a postposition marking the starting point of an action or condition in time or space. trong câu, it corresponds to 'from' or 'since.' It’s used with time expressions (e.g., 'from tomorrow') or location expressions (e.g., 'from Seoul').",
    "formation": "Danh từ + 부터"
  },
  "ko_부터_68": {
    "title": "~부터 ~까지 [buteo ~ kkaji] (From ~ to)",
    "shortExplanation": "Used to specify a range or period, 'from ~ to'.",
    "longExplanation": "'~부터 ~까지 [buteo ~ kkaji]' Biểu thị a start and end point in time, location, or range. It parallels 'from ~ to' trong câu. For instance, 'from 1 to 10' or 'from Seoul to Busan.'",
    "formation": "Danh từ + 부터 + Danh từ + 까지"
  },
  "ko_사이_69": {
    "title": "~사이 [sai] (Between)",
    "shortExplanation": "Biểu thị 'between' or 'among' two or more subjects or points.",
    "longExplanation": "'~사이 [sai]' is used to mean 'between' or 'among' when referring to two or more subjects. It can describe physical distance (e.g., between cities) or relationships (e.g., between people).",
    "formation": "Noun1 + 와/과 + Noun2 + 사이 / Danh từ + 사이"
  },
  "ko_세요_70": {
    "title": "~세요 [seyo] (Please do, let’s do)",
    "shortExplanation": "A polite sentence-ending used to make suggestions or requests.",
    "longExplanation": "'세요 [seyo]' is an honorific verb ending trong tiếng Hàn used to politely ask or suggest someone do something. It can mean 'please do X' or 'let’s do X' depending on context. It often appears in daily polite speech.",
    "formation": "Động từ stem + (으)세요"
  },
  "ko_아어_71": {
    "title": "~아/어 보다 [a/eo boda] (Try)",
    "shortExplanation": "Dùng để biểu thị the action of trying something.",
    "longExplanation": "'~아/어 보다 [a/eo boda]' is a Korean grammar pattern that is used when someone is trying to do something or trying something out for the first time. It can also be used when asking or suggesting someone to try something. trong câu, it is similar to 'try'. It is generally used after the verb stem.",
    "formation": "Động từ Stem + 아/어 보다"
  },
  "ko_아어_72": {
    "title": "~아/어 버리다 [a/eo beorida] (Regrettably, completely)",
    "shortExplanation": "Dùng để diễn tả regret or completion.",
    "longExplanation": "'~아/어 버리다 [a/eo beorida]' is a verbal construction trong tiếng Hàn that is Dùng để chỉ ra a sense of regret or completion of an action. It is used when the speaker feels regret about an action that has already been done or when an action has been completed leaving nothing more to do. It adds a sense of finality or regret to the verb it is attached to.",
    "formation": "Động từ stem + 아/어 버리다"
  },
  "ko_아어_73": {
    "title": "~아/어 다니다 [a/eo danida] (Keep doing, repeatedly do)",
    "shortExplanation": "Used to describe the continuation or repetition of an action, often in various places or on multiple occasions.",
    "longExplanation": "'~아/어 다니다' is a Korean verbal ending that Diễn tả that someone repeatedly or habitually does an action, often moving around while doing it. It is typically used with action verbs to convey repeated or continuous activity. The choice between ~아 or ~어 depends on the final vowel of the verb stem.",
    "formation": "Động từ stem + (아/어) 다니다"
  },
  "ko_아어_74": {
    "title": "~아/어 두다 [a/eo duda] (Leave something in a state)",
    "shortExplanation": "This grammar is Dùng để diễn tả an intentional action to leave something or someone in a certain state or condition.",
    "longExplanation": "The '~아/어 두다 [a/eo duda]' form is used trong tiếng Hàn grammar to indicate the deliberate act of leaving something or someone in a certain state or condition. trong câu, this is often translated as 'to leave something in a state'. It is constructed by attaching 아/어 to the stem of an action verb followed by 두다. The form of 아/어 will depend on the final vowel of the verb stem.",
    "formation": "Động từ stem + 아/어 + 두다"
  },
  "ko_아어_75": {
    "title": "~아/어 놓다 [a/eo nohda] (Do in advance, set something up)",
    "shortExplanation": "Used to convey the concept of doing something in preparation for something or setting something up.",
    "longExplanation": "The grammar point '~아/어 놓다 [a/eo nohda]' is often used trong tiếng Hàn to Diễn tả idea of doing something in advance or preparing for something. It implies that an action has been performed and the result of the action remains. It's also Dùng để diễn tả the intention of setting something up or putting things in a certain state.",
    "formation": "Động từ stem + 아/어 놓다"
  },
  "ko_아어야_76": {
    "title": "~아/어야 되다/하다 [a/eoya dweda/hada] (Have to, must)",
    "shortExplanation": "This pattern is used to describe an obligation or necessity, equivalent to 'have to' or 'must' trong câu.",
    "longExplanation": "'~아/어야 되다/하다 [a/eoya dweda/hada]' is used trong tiếng Hàn to express a sense of obligation or requirement, often in cases where the speaker must perform a certain action. It is akin to 'must' or 'have to' trong câu, giving the subject of the sentence a required action to carry out. This can be used in a variety of contexts, ranging from obligations in daily life, job requirements, giving or receiving advice, rules, and more.",
    "formation": "Động từ stem + 아/어야 하다 or Động từ stem + 아/어야 되다."
  },
  "ko_아어지다_77": {
    "title": "~아/어지다 [a/eojida] (Become, get)",
    "shortExplanation": "Dùng để biểu thị a change of state or condition; 'become', 'get'.",
    "longExplanation": "'~아/어지다 [a/eojida]' is a verb ending used trong tiếng Hàn to indicate a change in state or condition. The change implied by ~아/어지다 can be physical, mental, or situational, signaling that something or someone has transitioned from one state or condition to another. The context determines whether a sentence with ~아/어지다 refers to a change within oneself or something external.",
    "formation": "Động từ stem + 아/어지다"
  },
  "ko_아서어서_78": {
    "title": "~아서/어서 [aseo/eoseo] (So, because, and)",
    "shortExplanation": "Dùng để diễn tả reason, cause or condition; 'So', 'because' or 'and'.",
    "longExplanation": "'~아서/어서 [aseo/eoseo]' is a connective ending trong tiếng Hàn that Biểu thị reason, cause or condition. It can be compared to 'so', 'because', or 'and' trong câu. ~아서 is used after vowels in verbs ending or else ~어서 is used.",
    "formation": "Động từ + 아서/어서 + Động từ"
  },
  "ko_았었다가_79": {
    "title": "~았/었다가 [at/eotdagga] (Did something and then another situation occurred)",
    "shortExplanation": "Dùng để diễn tả that after a completed action or event in the past, a different situation/event followed.",
    "longExplanation": "The grammar point '~았/었다가 [at/eotdagga]' is Dùng để chỉ ra that one action was completed in the past and then a new or contrasting action or situation occurred. It connects the two events, often implying a change or unexpected outcome.",
    "formation": "Động từ in past tense + 았/었다가"
  },
  "ko_았었던_80": {
    "title": "~았/었던 [at/eotdeon] (That used to be)",
    "shortExplanation": "Dùng để diễn tả past states or conditions; 'that used to be'.",
    "longExplanation": "'~았/었던 [at/eotdeon]' is a grammar point used trong tiếng Hàn to express past states or conditions, equivalent to 'that used to be' trong câu. It can be used to describe a person, place, thing, or situation in the past. The past tense verb is combined with '던' to express a state or condition that was continuous in the past.",
    "formation": "Động từ stem + 았/었던"
  },
  "ko_았었으면_81": {
    "title": "~았/었으면 좋겠다 [at/eosseumyeon johgetda] (I hope, wish)",
    "shortExplanation": "This grammar point is Dùng để diễn tả a desire or a wish for a particular situation to happen.",
    "longExplanation": "'~았/었으면 좋겠다 [at/eosseumyeon johgetda]' is a Korean grammar point Dùng để diễn tả the speaker's hope or wish for a situation that has not yet occurred, similar to 'I hope' or 'I wish' trong câu. It is also Dùng để diễn tả regret for a past event that did not go as desired. In formation, it uses the past tense of a verb followed by '으면 좋겠다' to indicate the speaker's hope or wish.",
    "formation": "Động từ + 았/었으면 좋겠다"
  },
  "ko_았었지만_82": {
    "title": "~았/었지만 [at/eotjiman] (But, however, even though)",
    "shortExplanation": "Dùng để diễn tả a contrast or conflict with something; 'but', 'however', 'even though'.",
    "longExplanation": "'~았/었지만 [at/eotjiman]' is a conjunction used trong tiếng Hàn to show a contrast between the action or state provided in the first clause and the latter clause. This is similar to expressions such as 'but', 'however', or 'even though' trong câu. Usually, the condition or situation described in the first clause contrasts with or does not lead to the expected outcome mentioned in the latter clause.",
    "formation": "Động từ + ~았/었지만"
  },
  "ko_았었지요_83": {
    "title": "~았/었지요 [at/eotjiyo] (Explanatory, as you know)",
    "shortExplanation": "Used to explain or remind something that the speaker and listener both know; 'weren't they', 'didn't you', 'haven't we' etc.",
    "longExplanation": "The grammar point '~았/었지요 [at/eotjiyo]' is used in sentences to explain or remind something that the speaker and the listener both know or have experienced before. It is similar to 'weren't they', 'didn't you', 'haven't we' trong câu and is often used to induce an agreement response from the listener. It is commonly used when the speaker assumes that the listener is aware of what is being said.",
    "formation": "Động từ + 았/었지요"
  },
  "ko_어야지_84": {
    "title": "~어야지 [eoyaji] (Intention, resolution)",
    "shortExplanation": "Dùng để diễn tả a speaker's intention or resolution, equivalent to 'I should' or 'I must' trong câu.",
    "longExplanation": "'~어야지 [eoyaji]' is a Korean structure Dùng để biểu thị the speaker’s resolve or intention. It implies a determination or necessity to perform an action in the future, akin to 'I should' or 'I must' trong câu. It is commonly used in sentences where the speaker is planning or making a firm decision to do something.",
    "formation": "Động từ stem + 어야지"
  },
  "ko_었더라면_85": {
    "title": "~었더라면 [eotdeoramyeon] (If it had been the case that)",
    "shortExplanation": "Dùng để diễn tả 'If it had been the case that'.",
    "longExplanation": "'~었더라면 [eotdeoramyeon]' is a grammar structure used to describe an assumption or supposition about a past event or situation. It Diễn tả a counterfactual condition—something that did not actually happen but is imagined for the purpose of speculation or explanation. Có thể dịch là 'if it had been the case that' or 'if...had...'.",
    "formation": "Động từ + 었더라면"
  },
  "ko_에_86": {
    "title": "~에 [e] (At, on, in, to)",
    "shortExplanation": "Used to specify location, time, and destination (or direction with 가다/오다).",
    "longExplanation": "'~에 [e]' is a particle used trong tiếng Hàn to denote a specific location, time, or destination. It can translate to 'on', 'at', 'in', or 'to' trong câu, and is placed after a noun to indicate when something happens, where something is, or where someone goes. For example, '학교에 가다' means 'to go to school'.",
    "formation": "Danh từ + 에"
  },
  "ko_에_87": {
    "title": "~에 따라 [e ddara] (According to, depends on)",
    "shortExplanation": "Dùng để diễn tả 'according to' or 'depends on'.",
    "longExplanation": "'~에 따라 [e ddara]' is a grammar point trong tiếng Hàn Dùng để diễn tả that something is dependent on or varies according to another factor. It shows that the result or situation can change based on a particular condition or factor.",
    "formation": "Danh từ + 에 따라"
  },
  "ko_에_88": {
    "title": "~에 따르다 [e ddareuda] (To be attributed to, according to)",
    "shortExplanation": "Dùng để diễn tả cause, reason, criteria or standards; 'according to', 'in accordance with', 'dependent on'.",
    "longExplanation": "'~에 따르다 [e ddareuda]' is a compound verb commonly used trong tiếng Hàn to indicate that something happens or changes due to or as per some reason, rules, condition, or standard. It's like saying 'according to', 'in accordance with', or 'dependent on' trong câu. It's used to describe a circumstance that varies or is defined based on certain criteria or standards.",
    "formation": "Danh từ + 에 따르다"
  },
  "ko_에_89": {
    "title": "~에 비해 [e bihae] (Compared to)",
    "shortExplanation": "Used to compare or contrast something in respect to another.",
    "longExplanation": "'~에 비해 [e bihae]' is a postposition trong tiếng Hàn Dùng để biểu thị comparison or contrast between two subjects or objects, similar to 'compared to' trong câu. Its use emphasizes the different characteristics or states of things based on a certain standard or reference.",
    "formation": "Subject1 + ~에 비해 + Subject2 + Động từ"
  },
  "ko_에게_90": {
    "title": "~에게 [ege] (To someone, for someone)",
    "shortExplanation": "Dùng để biểu thị the target or recipient of an action.",
    "longExplanation": "'~에게 [ege]' is a particle trong tiếng Hàn grammar that is Dùng để biểu thị the target or recipient of an action. It is attached to the end of a noun/pronoun and translates to 'to' or 'for' trong câu. It's frequently used when giving, sending, or saying something to someone.",
    "formation": "Danh từ + 에게"
  },
  "ko_에서_91": {
    "title": "~에서 [eseo] (At, in)",
    "shortExplanation": "'에서 [eseo]' is Dùng để biểu thị location or origin where an action takes place.",
    "longExplanation": "'에서 [eseo]' is a particle often used trong tiếng Hàn to specify the place of origin or the space in which an action unfolds. It can sometimes be translated as 'at', 'in', or 'from' trong câu. The noun before '에서' is the reference point, and the verb that follows Biểu thị an action taking place in or from that location.",
    "formation": "Danh từ + 에서"
  },
  "ko_에서부터_92": {
    "title": "~에서부터 ~까지 [eseobuteo ~ kkaji] (From ~ to)",
    "shortExplanation": "Dùng để biểu thị a duration or range from a specific start point to an end point.",
    "longExplanation": "'에서부터 [eseobuteo]' and '까지 [kkaji]' are postpositions used trong tiếng Hàn to indicate a duration or range from a specified start point to an end point. They can be used with both time and place. trong câu, this can be translated as 'from ~ to'.",
    "formation": "Danh từ + 에서부터 + Danh từ + 까지"
  },
  "ko_와과_93": {
    "title": "~와/과 [wa/gwa] (And, with)",
    "shortExplanation": "Dùng để diễn tả 'and' or 'with' in a list or connection between two or more nouns.",
    "longExplanation": "'~와/과 [wa/gwa]' is a connective particle trong tiếng Hàn that links two or more nouns together. It is equivalent to the English conjunction 'and' or preposition 'with'. It is used when you need to link nouns in a list or show a connection between them. The choice between '와' (after a vowel) or '과' (after a consonant) depends on the final sound of the preceding noun.",
    "formation": "Danh từ(ending with a vowel) + 와 / Danh từ(ending with a consonant) + 과"
  },
  "ko_와과_94": {
    "title": "~와/과 같다 [wa/gwa gatda] (Be the same as, like)",
    "shortExplanation": "Dùng để diễn tả similarities or equivalences; 'like', 'the same as'.",
    "longExplanation": "'~와/과 같다 [wa/gwa gatda]' is used trong tiếng Hàn to express similarity, comparison, or equivalence—acting like 'as', 'like' or 'the same as' trong câu. The context determines whether '와' or '과' is used, depending on whether the preceding noun ends in a vowel or a consonant.",
    "formation": "Danh từ + 와/과 + 같다"
  },
  "ko_와과_95": {
    "title": "~와/과 달리 [wa/gwa dalli] (Unlike, different from)",
    "shortExplanation": "This pattern is Dùng để biểu thị contrast or difference between two things or situations.",
    "longExplanation": "'~와/과 달리' is a postposition trong tiếng Hàn generally used to contrast or compare two different things, situations, or ideas. It translates into English as 'unlike' or 'different from' and Biểu thị a clear contrast between the two subjects.",
    "formation": "(Noun1 + 와/과) + Noun2 + 달리 + Sentence"
  },
  "ko_을를_96": {
    "title": "~을/를 통해 [eul/reul tonghae] (Through, by means of)",
    "shortExplanation": "Dùng để biểu thị the medium or method through which an action or result was achieved.",
    "longExplanation": "'~을/를 통해 [eul/reul tonghae]' is a postpositional phrase trong tiếng Hàn used to signify the means, channel, or method through which an action or outcome was reached. It corresponds to 'through' trong câu and often appears with expressions about communicating information, conveying feelings, or achieving results.",
    "formation": "Danh từ + 을/를 + 통해"
  },
  "ko_이가_97": {
    "title": "~이/가 되다 [i/ga dweda] (Become)",
    "shortExplanation": "This grammar point is used to describe a change or transition into a new state or condition.",
    "longExplanation": "The grammar point '~이/가 되다 [i/ga dweda]' is used trong tiếng Hàn to indicate a change or transition into a different state or condition. It can be used to describe things like becoming an adult, becoming a teacher, or even something more abstract like becoming happy or becoming cold. The subject or condition that is changing is placed before '이/가 되다'.",
    "formation": "Danh từ + 이/가 되다"
  },
  "ko_이가_98": {
    "title": "~이/가 아니다 [i/ga anida] (Is not, are not)",
    "shortExplanation": "Used to negate a noun; 'is not', 'are not'.",
    "longExplanation": "The literal translation of '~이/가 아니다 [i/ga anida]' is 'is not' or 'are not'. It is used to negate a noun in a statement. You put '이 아니다' after a noun that ends with a consonant and '가 아니다' after a noun that ends with a vowel. This is roughly equivalent to English 'not', functioning to show contradiction or denial.",
    "formation": "Danh từ + 이/가 아니다"
  },
  "ko_이라도_99": {
    "title": "~이라도 [irado] (Even if, at least)",
    "shortExplanation": "Used to signify 'even if' or 'at least' in scenarios where something is better than nothing.",
    "longExplanation": "'~이라도 [irado]' is a postposition used trong tiếng Hàn to minimize the value of the subject but imply that the mentioned thing is still better than having nothing at all. It implies a somewhat unsatisfactory situation, yet shows a compromise, similar to 'even if' or 'at least' trong câu.",
    "formation": "Danh từ + 이라도"
  },
  "ko_이래_100": {
    "title": "~이래 [irae] (Since then)",
    "shortExplanation": "Dùng để biểu thị a period of time starting from a specific point in the past to the present time.",
    "longExplanation": "'~이래 [irae]' is used trong tiếng Hàn to express 'since then' or 'ever since', indicating that something has continued or remained the same from a past point in time up to the present.",
    "formation": "Động từ Past Tense + ~이래 / Danh từ + ~이래"
  },
  "ko_이랑_101": {
    "title": "~이랑 [irang] (And, with)",
    "shortExplanation": "Dùng để diễn tả the relationship of 'and' or 'with' between two or more things or people.",
    "longExplanation": "'~이랑 [irang]' is a postposition trong tiếng Hàn that can mean 'and' or 'with' when connecting two or more nouns. It is often used for casual or friendly contexts, indicating doing something together with someone or having something along with something else.",
    "formation": "Danh từ + 이랑"
  },
  "ko_이렇게_102": {
    "title": "~이렇게 [ireohge] (Like this, in this way)",
    "shortExplanation": "Dùng để biểu thị the manner or degree of an action; 'like this', 'in this way'.",
    "longExplanation": "'~이렇게 [ireohge]' is an adverb trong tiếng Hàn that describes how or to what degree an action is performed. It can translate as 'like this' or 'in this way.' It can also convey surprise or emphasis depending on context.",
    "formation": "이렇게 + Động từ/Mệnh đề"
  },
  "ko_이므로_103": {
    "title": "~이므로 [imyeo] (Therefore, because)",
    "shortExplanation": "Dùng để diễn tả cause or reason; 'therefore', 'because'.",
    "longExplanation": "'이므로 [imyeo]' is a conjunction trong tiếng Hàn Dùng để biểu thị cause or reason, similar to 'therefore' or 'because' trong câu. It is especially common in formal or written contexts to connect a reason with its result. The noun or adjective preceding it is the cause, and what follows is the outcome or conclusion.",
    "formation": "Danh từ/Tính từ + (이)므로"
  },
  "ko_이어서_104": {
    "title": "~이어서 [ieoseo] (And then, following that)",
    "shortExplanation": "Dùng để chỉ ra continuation or result of an action/event; 'and then', 'following that'.",
    "longExplanation": "'~이어서 [ieoseo]' is a connector trong tiếng Hàn that Biểu thị a sequence of events or actions, meaning 'and then' or 'continuing from that.' It can derive from '이다 + -어서' in certain contexts, or it can be Dùng để chỉ ra that one action follows directly after another.",
    "formation": "Động từ stem + 이어서"
  },
  "ko_이었다_105": {
    "title": "~이었다 [ieotda] (Was, were)",
    "shortExplanation": "Used to describe a state or condition in the past; 'was', 'were'.",
    "longExplanation": "The '~이었다 [ieotda]' form is the past tense of '이다' (to be). It describes a previous condition, quality, role, or identity of a noun—translated as 'was' or 'were' trong câu. It is not used for describing past actions (which require the normal past tense of action verbs).",
    "formation": "Danh từ + 이었다"
  },
  "ko_이지만_106": {
    "title": "~이지만 [ijiman] (But, however)",
    "shortExplanation": "Dùng để diễn tả contrast or contradiction; 'but', 'however'.",
    "longExplanation": "The particle '~이지만 [ijiman]' is Dùng để chỉ ra a contrast or contradiction between two statements. It is analogous to 'but' or 'however' trong câu. It typically appears after a copula or descriptive verb stem. The first part of the sentence states one situation or fact, followed by a second part that Biểu thị a contrasting or opposing circumstance.",
    "formation": "Danh từ/Tính từ + 이지만 (or verb stem + 지만)"
  },
  "ko_인데_107": {
    "title": "~인데 [inde] (But, and, so)",
    "shortExplanation": "Used to connect sentences with meanings like 'but', 'and', or 'so'.",
    "longExplanation": "The pattern '~인데 [inde]' (for nouns) or '~는데 [neunde]' (for verbs/adjectives) is one of the most commonly used connectors trong tiếng Hàn. Although there is no exact single English equivalent, Có thể dịch là 'but', 'and', or 'so' depending on context. Often, the first clause states a situation or background, and the second clause shows the result, contrast, or additional info.",
    "formation": "Danh từ + 인데 / Động từ/Tính từ stem + 는데"
  },
  "ko_인데다_108": {
    "title": "~인데다 [indeda] (Moreover, besides)",
    "shortExplanation": "Used to add more information or another reason; 'moreover', 'besides'.",
    "longExplanation": "'~인데다 [indeda]' is used trong tiếng Hàn to give an additional supporting reason or trait. It can mean 'furthermore', 'in addition', or 'besides'. It typically attaches to descriptive verbs or copulas to emphasize an extra point on top of what was previously stated.",
    "formation": "Descriptive Động từ + (으)ㄴ/는 데다 or Danh từ + 인데다"
  },
  "ko_인지_109": {
    "title": "~인지 [inji] (Whether)",
    "shortExplanation": "Dùng để diễn tả doubt, uncertainty, or an indirect question; 'whether', 'if'.",
    "longExplanation": "'~인지 [inji]' is a conjunction used trong tiếng Hàn to introduce a subordinate clause expressing doubt, uncertainty, or an indirect question. It corresponds to 'whether' or 'if' trong câu. It is used after verbs or adjectives and can also indicate not knowing or being unsure about something.",
    "formation": "Động từ/Tính từ + -ㄴ/는/은지"
  },
  "ko_자_111": {
    "title": "~자 [ja] (Let's)",
    "shortExplanation": "'~자 [ja]' is a casual Korean grammar form used to propose an action together, similar to 'let's' trong câu.",
    "longExplanation": "'~자 [ja]' is an informal suggestion form trong tiếng Hàn, attached to the stem of action verbs. It encourages both speaker and listener to do something together. Because it's casual, it's usually used among friends or peers of similar age/status.",
    "formation": "Động từ stem + 자"
  },
  "ko_자마자_112": {
    "title": "~자마자 [jamaja] (As soon as)",
    "shortExplanation": "'~자마자 [jamaja]' Diễn tả that one action occurs immediately after another action finishes.",
    "longExplanation": "The structure '~자마자 [jamaja]' means 'as soon as' trong tiếng Hàn. It Biểu thị that the second action happens right after the first action is completed, showing no real time gap in between. Attach it directly to the verb stem of the first action.",
    "formation": "Động từ stem + 자마자"
  },
  "ko_장_113": {
    "title": "~장 [jang] (Counting unit for flat items)",
    "shortExplanation": "'~장 [jang]' is a Korean counter used to count flat objects like paper, tickets, photos, etc.",
    "longExplanation": "'~장 [jang]' is a measure word (counter) trong tiếng Hàn for flat objects. It parallels words like 'sheet' or 'piece' trong câu when referring to items such as paper, tickets, documents, photographs, and so on.",
    "formation": "Number + 장 + (Danh từ)"
  },
  "ko_저_114": {
    "title": "~저 [jeo] (That kind of)",
    "shortExplanation": "Used to describe 'that kind of' or 'such' qualities or characteristics.",
    "longExplanation": "'~저 [jeo]' refers to an element of 'such' or 'that kind of' trong tiếng Hàn, often seen in words like '저렇다' (to be like that), '그렇다' (to be so), '이렇다' (to be like this). It can emphasize a certain abstract quality or scenario for comparison, emphasis, or expressing a particular state/behavior.",
    "formation": "(이렇다/그렇다/저렇다) → 이렇게/그렇게/저렇게, or nouns with 저런/그런/이런"
  },
  "ko_전_115": {
    "title": "~전 [jeon] (Before)",
    "shortExplanation": "Dùng để diễn tả an action that happened before something else.",
    "longExplanation": "'전 [jeon]' is a postposition trong tiếng Hàn Dùng để biểu thị an action or event that occurs prior to another action/event. It is similar to 'before' trong câu and is often used with time expressions or other chronological references.",
    "formation": "Danh từ + 전"
  },
  "ko_적_116": {
    "title": "~적 [jeok] (Time, instance)",
    "shortExplanation": "Used to denote a specific instance or time when something happened.",
    "longExplanation": "'~적 [jeok]' refers to a certain time or instance associated with the verb it follows, somewhat akin to 'when I was...' or 'the time that...' trong câu. You often see it combined with '에' (e.g., '어릴 적에') to mean 'when one was young', etc.",
    "formation": "Động từ stem + 적 (commonly + 에)"
  },
  "ko_죠_117": {
    "title": "~죠 [jyo] (~Isn't it?)",
    "shortExplanation": "Used as a tag question to request confirmation or agreement from the listener.",
    "longExplanation": "'~죠 [jyo]' is typically used to seek agreement or confirmation from the listener, much like a tag question trong câu (e.g. 'isn't it?', 'right?'). It can also appear as '~지요', which is slightly more formal/polite.",
    "formation": "Positive/Negative Sentence + 죠 (지요)"
  },
  "ko_지_118": {
    "title": "~지 않을까 [ji anheulkka] (Perhaps)",
    "shortExplanation": "Dùng để diễn tả a guess, supposition, or conjecture; 'perhaps', 'maybe'.",
    "longExplanation": "'~지 않을까 [ji anheulkka]' is a common ending trong tiếng Hàn Dùng để diễn tả an educated guess or prediction. It is similar to saying 'perhaps,' 'maybe,' or 'I wonder if...' trong câu, based on the speaker's available information.",
    "formation": "Động từ stem + 지 않을까"
  },
  "ko_지_119": {
    "title": "~지 않아도 되다 [ji anado dweda] (Don't have to)",
    "shortExplanation": "Dùng để diễn tả that an action is not necessary or mandatory; 'don't have to'.",
    "longExplanation": "'~지 않아도 되다 [ji anado dweda]' Biểu thị that someone is not obliged to perform a certain action. It literally means 'it is okay even if you do not do something.'",
    "formation": "Động từ stem + 지 않아도 되다"
  },
  "ko_지만_120": {
    "title": "지만 [jiman] (but)",
    "shortExplanation": "Dùng để diễn tả sự đối lập giữa hai mệnh đề, similar to 'but' trong câu.",
    "longExplanation": "'지만 [jiman]' is a common conjunction trong tiếng Hàn that Diễn tả contrast or sự mâu thuẫn giữa hai mệnh đề, much like 'but' trong câu. The second clause contradicts or provides an unexpected twist to the first clause.",
    "formation": "Statement 1 + 지만 + Statement 2"
  },
  "ko_지요_121": {
    "title": "~지요 [jiyo] (Isn't it? Right?)",
    "shortExplanation": "Used to confirm or check agreement with the listener, akin to a polite tag question.",
    "longExplanation": "'~지요 [jiyo]' is a sentence ending used trong tiếng Hàn to ask for confirmation or acknowledgment from the listener. It's often used in polite or friendly conversation to invite agreement or verify shared knowledge, similar to saying 'isn't it?' or 'right?' trong câu.",
    "formation": "Statement + 지요"
  },
  "ko_진_122": {
    "title": "~진 않지만 [jin anhjiman] (Not exactly, but)",
    "shortExplanation": "Dùng để diễn tả that something is not entirely true but partially or somewhat so.",
    "longExplanation": "'~진 않지만 [jin anhjiman]' Biểu thị that a certain condition is not exactly or fully met, yet there is some partial truth or a mitigating factor. It softens the statement, showing modesty or a lesser degree than expected.",
    "formation": "Động từ/Tính từ stem + 진 않지만"
  },
  "ko_쯤_123": {
    "title": "~쯤 [jjeum] (About, around)",
    "shortExplanation": "A postposition indicating approximation or estimation (time, quantity, degree).",
    "longExplanation": "'~쯤 [jjeum]' is used trong tiếng Hàn to show a rough estimate or approximation, similar to 'about,' 'around,' or 'approximately' trong câu. It's often used in casual conversation to give an inexact notion of time, number, or degree.",
    "formation": "Number/Danh từ + 쯤"
  },
  "ko_처럼_124": {
    "title": "~처럼 [cheoreom] (Like, as)",
    "shortExplanation": "Used to compare two things or indicate that something behaves similarly to something else.",
    "longExplanation": "'처럼 [cheoreom]' is a postposition trong tiếng Hàn that draws a comparison between two things, states, or actions, similar to 'like' or 'as' trong câu. It Biểu thị that one entity resembles another in appearance, manner, or feeling.",
    "formation": "Danh từ/Động từ + 처럼"
  },
  "ko_층_125": {
    "title": "~층 [cheung] (Floor count)",
    "shortExplanation": "Dùng để diễn tả the number of floors in a building, like 'nth floor'.",
    "longExplanation": "'~층 [cheung]' is a suffix trong tiếng Hàn denoting which floor of a building is being referred to. It attaches to a numeral to indicate the ordinal floor number, similar to English expressions like 'the 3rd floor', 'the 15th floor', etc.",
    "formation": "Number + 층"
  },
  "ko__126": {
    "title": "~(으)ㄹ지 (Maybe, perhaps)",
    "shortExplanation": "Dùng để diễn tả uncertainty, doubt, or speculation; 'might', 'maybe', 'I'm not sure if...'.",
    "longExplanation": "The grammar pattern '~(으)ㄹ지' is used with verbs or adjectives to convey uncertainty or speculation. It often appears with expressions like '모르겠다 (I don't know)', forming '~(으)ㄹ지 모르겠다' to mean 'I’m not sure if...' or 'maybe...'. It's similar to 'perhaps' or 'might' trong câu.",
    "formation": "Động từ/Tính từ stem + (으)ㄹ지 (모르다)"
  },
  "ko_마다_127": {
    "title": "~마다 [mada] (Every, each)",
    "shortExplanation": "Dùng để diễn tả routines or regular occurrences; 'every', 'each'.",
    "longExplanation": "'~마다 [mada]' is a suffix trong tiếng Hàn used after time words or intervals to indicate repetition or regularity, similar to 'every' trong câu. For example, 매주 토요일마다 (every Saturday), 매일 아침마다 (every morning), 매월 마지막 주마다 (every last week of the month), etc.",
    "formation": "Time/Interval + 마다"
  },
  "ko__128": {
    "title": "~(으)ㄹ 테니까 [tenikka] (So, therefore)",
    "shortExplanation": "Biểu thị an assumption or reason, leading to a suggestion or conclusion; 'because it will be...', 'so'.",
    "longExplanation": "'~(으)ㄹ 테니까' Diễn tả the speaker’s assumption or strong guess about a future or present state, providing a reason for the following statement. For example, '배가 고플 테니까 (you must be hungry), so let's eat.' This form combines the future/assumed ending '~(으)ㄹ 테다' with '~니까 (because)'.",
    "formation": "Động từ stem + (으)ㄹ 테니까 + (result or suggestion)"
  },
  "ko_편이다_129": {
    "title": "~편이다 [pyeonida] (It is preferable)",
    "shortExplanation": "Biểu thị a personal leaning, tendency, or preference; 'tend to', 'find it better to'.",
    "longExplanation": "The construction '~편이다 [pyeonida]' Diễn tả that something is on the side of or tends to be a certain way. It conveys a personal preference or leaning. For example, '저는 집에서 공부하는 편이에요' means 'I tend to study at home' or 'I prefer studying at home.'",
    "formation": "Động từ stem + (으)ㄴ/는 편이다 or Tính từ + 편이다"
  },
  "ko_하다가_130": {
    "title": "~하다가 [hadaga] (Was doing something and then...)",
    "shortExplanation": "Biểu thị an ongoing action that is interrupted by another event; 'was doing... then...'.",
    "longExplanation": "'~하다가 [hadaga]' shows that one action was in progress when something else happened or changed. It often implies an unexpected interruption or switch of focus while the first activity was still ongoing.",
    "formation": "Động từ stem + 하다가"
  },
  "ko_하면_131": {
    "title": "~하면 [hamyeon] (If, when)",
    "shortExplanation": "Diễn tả a condition or hypothetical situation; 'if', 'when'.",
    "longExplanation": "'~하면 [hamyeon]' introduces a conditional or hypothetical clause, much like 'if' or 'when' trong câu. It sets up a situation or requirement that triggers the outcome in the following clause.",
    "formation": "Động từ stem + 하면"
  },
  "ko_하면서_132": {
    "title": "~하면서 [hamyeonseo] (While doing)",
    "shortExplanation": "Diễn tả two simultaneous actions; 'while', 'as'.",
    "longExplanation": "'~하면서 [hamyeonseo]' is used to describe two actions happening at the same time or an action happening in the background while another action occurs. It's similar to 'while' or 'as' trong câu when describing simultaneous activities.",
    "formation": "Động từ stem + (으)면서"
  },
  "ko_하기는_133": {
    "title": "~하기는 [hakineun] (Though, although)",
    "shortExplanation": "Dùng để diễn tả 'though' or 'although', showing contrast or contradiction.",
    "longExplanation": "'~하기는 [hakineun]' is used to convey a sense of contrast or contradiction, similar to 'though' or 'although' trong câu. While the sentence may start with an assumption or statement, this grammar introduces a point that contradicts or partially goes against the expected outcome.",
    "formation": "Động từ stem + 기는 + (contradicting statement)"
  },
  "ko_하기로_134": {
    "title": "~하기로 하다 [hakiro hada] (Decide to)",
    "shortExplanation": "Diễn tả a decision or agreement to do something.",
    "longExplanation": "'~하기로 하다 [hakiro hada]' Biểu thị that a decision or agreement has been made to perform an action. It often appears in contexts describing future plans or intentions. After a verb stem, it is followed by '기로 하다' which translates to 'decide to' trong câu.",
    "formation": "Động từ stem + 기로 하다"
  },
  "ko_하기보다_135": {
    "title": "~하기보다 [hakiboda] (Rather than)",
    "shortExplanation": "Compares two actions or things, indicating a preference for one over the other.",
    "longExplanation": "'~하기보다 [hakiboda]' is Dùng để diễn tả 'rather than' trong tiếng Hàn. It typically shows that the second action or choice is more desirable, suitable, or preferable than the first one.",
    "formation": "Động từ(기) + 보다"
  },
  "ko_하기에_136": {
    "title": "~하기에 [hakie] (For, considering)",
    "shortExplanation": "Diễn tả a reason or basis for a certain situation; 'for, considering'.",
    "longExplanation": "'~하기에 [hakie]' is used to provide a reason or basis for a circumstance or decision. It can translate to 'for', 'because', or 'considering that...' trong câu, especially when justifying or explaining a certain choice.",
    "formation": "Descriptive Động từ + 기에"
  },
  "ko_하기만_137": {
    "title": "~하기만 하면 [hakiman hamyeon] (As long as)",
    "shortExplanation": "Diễn tả that if a certain condition is met, a result is guaranteed to follow; 'as long as'.",
    "longExplanation": "'~하기만 하면 [hakiman hamyeon]' means 'as long as one does something, then something else will definitely happen.' It implies a condition that, once fulfilled, ensures a particular outcome.",
    "formation": "Động từ stem + 기만 하면"
  },
  "ko_하는_138": {
    "title": "~하는 것 같다 [haneun geot gatda] (It seems like)",
    "shortExplanation": "Dùng để diễn tả that something appears or seems a certain way; 'it seems/looks like'.",
    "longExplanation": "'~하는 것 같다 [haneun geot gatda]' Biểu thị the speaker's guess or observation based on evidence or impressions. It can translate to 'it seems like', 'it appears that', or 'it looks like' trong câu. The verb or adjective precedes '...는 것 같다' to form a statement of appearance or assumption.",
    "formation": "Động từ stem + 는 것 같다 / Tính từ stem + (으)ㄴ 것 같다"
  },
  "ko_하는_139": {
    "title": "~하는 데 [haneun de] (In doing)",
    "shortExplanation": "Diễn tả the process of doing something, often involving time, effort, or resources.",
    "longExplanation": "'~하는 데 [haneun de]' highlights the time, effort, or resources necessary for an action. It can be thought of as 'in doing something' or 'it takes X to do something'.",
    "formation": "Động từ stem + 는 데 + (time/effort/resources)"
  },
  "ko_하는_140": {
    "title": "~하는 편이다 [haneun pyeonida] (Tend to do)",
    "shortExplanation": "Diễn tả a habitual action, tendency, or characteristic.",
    "longExplanation": "'~하는 편이다 [haneun pyeonida]' means someone or something tends toward a certain behavior or habit. It implies that it’s not an absolute rule, but rather the usual or likely tendency the speaker observes.",
    "formation": "Động từ stem + 는 편이다 / Tính từ stem + (으)ㄴ 편이다"
  },
  "ko_하는_141": {
    "title": "~하는 한 [haneun han] (As long as)",
    "shortExplanation": "Diễn tả the meaning 'as long as' or 'while' a certain condition holds true.",
    "longExplanation": "'~하는 한 [haneun han]' is Dùng để biểu thị that something remains valid or continues to be the case so long as a condition is met. It can translate to 'as long as' trong câu, specifying the scope or boundary within which an action or state continues.",
    "formation": "Động từ stem + 는 한"
  },
  "ko_하는데_142": {
    "title": "~하는데 [haneunde] (But, and so)",
    "shortExplanation": "Dùng để diễn tả contrast or a cause-and-result link; 'but', 'and so'.",
    "longExplanation": "'~하는데 [haneunde]' is a Korean connector Dùng để biểu thị contrast or provide background leading to a result, akin to 'but' or 'and so' trong câu. Often, the first clause establishes a situation or background and the second clause states a contradictory fact or a consequence derived from that background.",
    "formation": "Động từ + 는데 (Present) / Động từ + 았/었는데 (Past)"
  },
  "ko_하다_143": {
    "title": "~하다 보면 [hada bomyeon] (If one keeps doing)",
    "shortExplanation": "Diễn tả that, with continued or repeated action, a certain result or realization will emerge.",
    "longExplanation": "'~하다 보면 [hada bomyeon]' Biểu thị that if someone continues or repeatedly does an action over time, a new result, skill, or understanding will naturally occur. It's akin to 'if one keeps doing something' or 'if one continues doing something' trong câu.",
    "formation": "Động từ (dictionary form) + 하다 보면"
  },
  "ko_하다가는_144": {
    "title": "~하다가는 [hadaganeun] (If you continue doing)",
    "shortExplanation": "Biểu thị a likely negative outcome if the current action continues in the same manner.",
    "longExplanation": "'~하다가는 [hadaganeun]' is used to warn that if the speaker continues performing the preceding action in the same way, it will lead to an undesirable or negative consequence. It carries a sense of caution or concern.",
    "formation": "Động từ stem + 하다가는"
  },
  "ko_하여_145": {
    "title": "~하여 [hayeo] (~ing, and)",
    "shortExplanation": "Used to connect actions or show a method of doing something; roughly 'and' or 'by doing'.",
    "longExplanation": "'~하여 [hayeo]' is a somewhat formal connective ending trong tiếng Hàn used to link two actions or show that the second action happens by means of the first. It can often be translated as 'and' or 'by doing' trong câu. This form is more common in written or formal contexts compared to conversational speech.",
    "formation": "Động từ stem + 하여"
  },
  "ko_하여야_146": {
    "title": "~하여야 [hayeoya] (Must)",
    "shortExplanation": "Diễn tả necessity or obligation; 'must', 'have to'.",
    "longExplanation": "'~하여야 [hayeoya]' is a more formal verb ending indicating something must or has to be done. It attaches to action verbs and emphasizes the necessity of the action. It's typically used in more formal or written contexts.",
    "formation": "Action Động từ + 하여야"
  },
  "ko_하였다_147": {
    "title": "~하였다 [hayeotda] (Past formal)",
    "shortExplanation": "A formal past-tense marker trong tiếng Hàn, used when addressing elders, superiors, or in polite writing.",
    "longExplanation": "'~하였다 [hayeotda]' is a formal or literary past-tense form trong tiếng Hàn that can be attached to action or descriptive verbs. It's frequently seen in official documents or polite narratives, emphasizing respect or formality.",
    "formation": "Động từ stem + 하였다"
  },
  "ko_하자_148": {
    "title": "~하자 [haja] (Upon doing, as soon as)",
    "shortExplanation": "Biểu thị that the second action happens immediately after the first action is completed.",
    "longExplanation": "'~하자 [haja]' is a connector trong tiếng Hàn that conveys immediacy: once the action in the first clause is done, the action in the second clause occurs right away. It is similar to 'as soon as' trong câu.",
    "formation": "Động từ stem + 하자"
  },
  "ko_할_149": {
    "title": "~할 것이다 [hal geotida] (Will, shall)",
    "shortExplanation": "Dùng để diễn tả the speaker's future prediction or plan.",
    "longExplanation": "The grammar point '~할 것이다 [hal geotida]' is a future tense form that Biểu thị a prediction or intention. Formed by the verb stem plus '할 것이다', it translates to 'will' or 'shall' trong câu. It is used when the speaker predicts a future occurrence or announces a plan.",
    "formation": "Động từ stem + ~할 것이다"
  },
  "ko_할_150": {
    "title": "~할 때마다 [hal ttaemada] (Every time when)",
    "shortExplanation": "Dùng để diễn tả 'every time when' or 'whenever'.",
    "longExplanation": "'~할 때마다 [hal ttaemada]' is used when something happens each time a certain action or event occurs. It emphasizes a recurring event or repetitive situation following that action.",
    "formation": "Động từ (dictionary form) + 할 때마다"
  },
  "ko_할_151": {
    "title": "~할 만하다 [hal manhada] (Worth doing)",
    "shortExplanation": "Dùng để biểu thị that something is worth doing or trying.",
    "longExplanation": "'~할 만하다 [hal manhada]' Diễn tả the worthiness or value of doing an action. It often follows a verb stem. It can be used to suggest that an activity or item is meaningful, beneficial, or simply worth a try.",
    "formation": "Động từ stem + 할 만하다"
  },
  "ko_할_152": {
    "title": "~할 수 있다 [hal su itda] (Can do)",
    "shortExplanation": "Dùng để diễn tả possibility or ability; 'can do' something.",
    "longExplanation": "'~할 수 있다 [hal su itda]' Biểu thị that someone is capable of or has the possibility to perform an action, effectively meaning 'can'. It is often used for skills or situations where something is feasible.",
    "formation": "Động từ stem + -(으)ㄹ 수 있다"
  },
  "ko_할_153": {
    "title": "~할 수 없다 [hal su eopda] (Cannot do)",
    "shortExplanation": "Dùng để diễn tả inability or impossibility; 'cannot do'.",
    "longExplanation": "'~할 수 없다 [hal su eopda]' means that the subject does not have the capacity or possibility to perform a certain action, i.e., 'cannot' do it in current circumstances. It emphasizes the impossibility or lack of ability.",
    "formation": "Động từ stem + -(으)ㄹ 수 없다"
  },
  "ko_할_154": {
    "title": "~할 줄 알다 [hal jul alda] (Know how to)",
    "shortExplanation": "Dùng để diễn tả that one knows how to do something or has the skill/knowledge to do it.",
    "longExplanation": "The phrase '~할 줄 알다 [hal jul alda]' signifies that someone has learned or can perform an action or process, translating to 'know how to (do something)' trong câu. It focuses on practical skill or capability rather than mere theoretical knowledge.",
    "formation": "Động từ stem + (으)ㄹ 줄 알다"
  },
  "ko_할지라도_155": {
    "title": "~할지라도 [haljirado] (Even if)",
    "shortExplanation": "This grammar point trong tiếng Hàn is Dùng để diễn tả 'even if' or 'no matter how'.",
    "longExplanation": "The '~할지라도 [haljirado]' grammar pattern is used trong tiếng Hàn to indicate a hypothetical situation similar to 'even if' or 'no matter how' trong câu. It is used before verbs (or adjectives) to express a condition, concession, or possibility contrary to reality or expectation.",
    "formation": "Động từ (Stem) + (으)ㄹ지라도"
  },
  "ko_든지_156": {
    "title": "~든지 ~든지 [deunji deunji] (Whether ... or)",
    "shortExplanation": "This grammar point is Dùng để diễn tả 'whether ... or', indicating two (or more) possibilities.",
    "longExplanation": "The pattern '~든지 ~든지' trong tiếng Hàn lists multiple possibilities or choices. It translates closely to 'whether ... or' trong câu. It is often used in daily conversation to show that no matter which option happens or is chosen, the outcome or decision remains consistent.",
    "formation": "Động từ (Stem) + 든지 + Động từ (Stem) + 든지"
  },
  "ko_할_157": {
    "title": "~할 텐데 [hal tende] (Probably will)",
    "shortExplanation": "Dùng để diễn tả a prediction or expectation that something will occur in the future.",
    "longExplanation": "'~할 텐데 [hal tende]' is a common ending trong tiếng Hàn that Diễn tả a prediction or expectation that a certain event, situation, or behavior is likely to occur. It can also convey regret when referring to a likely outcome that did not happen. It is formed by taking the verb stem plus (으)ㄹ 텐데.",
    "formation": "Động từ stem + (으)ㄹ 텐데"
  },
  "ko_함께_158": {
    "title": "~함께 [hamkke] (Together with)",
    "shortExplanation": "Dùng để biểu thị doing something together with someone or something.",
    "longExplanation": "'~함께 [hamkke]' is a phrase trong tiếng Hàn that implies doing an activity 'together with' someone or something. It shows a simultaneous action or condition, similar to 'together with' trong câu. Commonly used with nouns.",
    "formation": "Danh từ + 함께"
  },
  "ko_해_159": {
    "title": "~해 보다 [hae boda] (Try to do)",
    "shortExplanation": "Biểu thị the speaker's attempt or experience of doing something.",
    "longExplanation": "'~해 보다 [hae boda]' is used when a speaker Diễn tả trying or experiencing something, often for the first time. It is typically formed with the verb stem plus '아/어 보다.' Có thể dịch là 'to try (doing something)' trong câu.",
    "formation": "Động từ stem + 아/어 보다"
  },
  "ko_해_160": {
    "title": "~해 주다 [hae juda] (Do for someone)",
    "shortExplanation": "Dùng để diễn tả an action done for someone else's benefit.",
    "longExplanation": "'~해 주다 [hae juda]' Biểu thị that the subject does or did something for the benefit of another person. Commonly used in polite speech to express that an action is done for someone else. It can also show gratitude or a request.",
    "formation": "Động từ stem + 아/어 주다 (하다 → 해 + 주다)"
  },
  "ko_해야겠다_161": {
    "title": "~해야겠다 [haeyagetda] (Should do)",
    "shortExplanation": "Diễn tả the speaker’s intention or resolution to do something.",
    "longExplanation": "The phrase '~해야겠다 [haeyagetda]' shows the speaker's firm decision or determination to do something. It often translates to 'I should,' 'I ought to,' or 'I must' trong câu, highlighting the importance or necessity of the action.",
    "formation": "Động từ stem + 아/어야 겠다"
  },
  "ko_해서는_162": {
    "title": "~해서는 안 되다 [haeseoneun an dweda] (Must not do)",
    "shortExplanation": "Shows prohibition or something that must not be done.",
    "longExplanation": "trong tiếng Hàn, '~해서는 안 되다 [haeseoneun an dweda]' Biểu thị an action that is prohibited. It is used with action verbs to form negative commands or strong advice, meaning 'must not' or 'should not' do something. More common in formal contexts or rule statements.",
    "formation": "Động từ stem + 아/어서는 안 되다 (하다 → 해서는 안 되다)"
  },
  "ko_해야_163": {
    "title": "~해야 하다 [haeya hada] (Have to do)",
    "shortExplanation": "Diễn tả obligation or necessity (have to, must, need to).",
    "longExplanation": "'~해야 하다 [haeya hada]' Biểu thị a strong necessity or obligation to carry out an action. It often translates to 'have to,' 'must,' or 'need to' trong câu, showing that there is no other choice but to do the mentioned action.",
    "formation": "Động từ stem + 아/어야 하다"
  },
  "ko_했더니_164": {
    "title": "~했더니 [haetdeoni] (After doing)",
    "shortExplanation": "Dùng để diễn tả an unexpected result or surprise after doing an action.",
    "longExplanation": "'~했더니 [haetdeoni]' is a grammar point used to describe a discovery or unexpected outcome that follows right after the speaker performed a certain action. It can imply some causal relationship, but it mainly highlights the speaker's surprise or the unanticipated result that happened immediately after an action.",
    "formation": "Động từ in Past Tense + 더니"
  },
  "ko_했었다_165": {
    "title": "~했었다 [haesseotda] (Had done)",
    "shortExplanation": "Dùng để diễn tả an action that was completed in the past.",
    "longExplanation": "'~했었다 [haesseotda]' is a past-perfect-like expression trong tiếng Hàn, adding a sense of completion or “used to” nuance to something that happened previously. It can show that one action was finished in the past before another event took place, or that a repeated action/condition existed but does not continue anymore.",
    "formation": "Động từ in past tense + 었다"
  },
  "ko_했으면_166": {
    "title": "~했으면 좋겠다 [haesseumyeon jotgetda] (I wish, I hope)",
    "shortExplanation": "Dùng để diễn tả wishing or hoping for a situation to happen.",
    "longExplanation": "'~했으면 좋겠다 [haesseumyeon jotgetda]' is commonly Dùng để diễn tả a personal wish or hope for some future or hypothetical situation. Có thể dịch là 'I wish...' or 'I hope...' trong câu. The speaker desires the action or state described by the verb.",
    "formation": "Động từ + 았/었으면 좋겠다 (or 했으면 좋겠다)"
  },
  "ko_했을_167": {
    "title": "~했을 때 [haesseul ttae] (When someone did)",
    "shortExplanation": "Diễn tả 'when someone did' or 'at the time when something was done'.",
    "longExplanation": "'~했을 때 [haesseul ttae]' is Dùng để biểu thị a moment in the past when an action happened. It can sometimes introduce a second clause that describes a related event or reaction. trong câu, it roughly translates as 'when (someone) did something' or 'at the time that (something) occurred.'",
    "formation": "Động từ in past tense + 을/를 + 때 (했을 때)"
  },
  "ko_했을_168": {
    "title": "~했을 텐데 [haesseul tende] (Would have)",
    "shortExplanation": "Dùng để diễn tả a hypothetical past scenario or regret.",
    "longExplanation": "'~했을 텐데 [haesseul tende]' is used for hypotheticals or regrets about something that did not happen in the past. It often appears with '만약 ~았/었더라면 (if I had done something)' or implies 'I would have...' or 'It would have been...' trong câu.",
    "formation": "Động từ stem + 았/었을 텐데"
  },
  "ko_했지만_169": {
    "title": "~했지만 [haetjiman] (Did, but)",
    "shortExplanation": "Connects two contrasting ideas in the past; 'did, but'.",
    "longExplanation": "'~했지만 [haetjiman]' is Dùng để chỉ ra a contrast or unexpected result between two past actions/conditions, comparable to 'did, but' or 'although' trong câu. It often Biểu thị the second clause contradicts or does not live up to the expectation set by the first clause.",
    "formation": "Động từ in past tense + 지만"
  },
  "ko_했다_170": {
    "title": "~했다 [haetda] (Did, past tense)",
    "shortExplanation": "Marks an action as completed in the past; 'did'.",
    "longExplanation": "'~했다 [haetda]' is a standard past-tense form trong tiếng Hàn, equivalent to saying 'I did (something)' trong câu. It simply Biểu thị that the action is finished and took place in the past.",
    "formation": "Động từ stem + 했다"
  },
  "ko_거든요_0": {
    "title": "~거든요 [geodeunyo] (You see; Explaining)",
    "shortExplanation": "Used for explaining or giving background information to the listener.",
    "longExplanation": "'~거든요 [geodeunyo]' is a grammar point used trong tiếng Hàn when the speaker wants to provide additional information or background to the listener, usually as an explanation or justification. It is common in spoken language and Biểu thị that the speaker believes the listener may not know or might be surprised by this information.",
    "formation": "Động từ + 거든요 / Tính từ + 거든요"
  },
  "ko_게_2": {
    "title": "~게 하다 [ge hada] (Make/let someone do)",
    "shortExplanation": "Dùng để diễn tả that someone causes or allows another person to do something.",
    "longExplanation": "'~게 하다' Biểu thị that an action occurs because someone made, let, allowed, or caused it to happen. It can show compulsion, permission, encouragement, etc., depending on context.",
    "formation": "Động từ stem + 게 하다"
  },
  "ko_게_3": {
    "title": "~게 해서는 안 되다 [ge haeseoneun an dweda] (Shouldn't make/let someone do)",
    "shortExplanation": "Used to convey that one shouldn’t make or allow someone to do something.",
    "longExplanation": "'~게 해서는 안 되다' Diễn tả the idea that it is wrong or not allowed to make or let someone do a certain action. It often implies an admonition or rule for proper conduct.",
    "formation": "Động từ stem + 게 해서는 안 되다"
  },
  "ko_겠다_4": {
    "title": "겠다 [getda] (will, guess, hope, wish)",
    "shortExplanation": "A verb ending Dùng để diễn tả ‘will’ (future), ‘guess’ (conjecture), or a strong wish or hope.",
    "longExplanation": "'겠다 [getda]' is a versatile verb ending trong tiếng Hàn that can Diễn tả speaker’s future intention (‘will’), their inference or guess (‘must be…’ / ‘probably’), or a strong desire/wish depending on context. It often appears with first-person statements or in concluding inferences.",
    "formation": "Động từ stem + 겠다"
  },
  "ko_고_5": {
    "title": "~고 말다 [go malda] (Ended up doing)",
    "shortExplanation": "Emphasizes an unexpected or often undesirable result: ‘ended up doing.’",
    "longExplanation": "'~고 말다 [go malda]' highlights that an action concluded in a certain way, often with a sense of regret, inevitability, or simply an unexpected final outcome. Có thể dịch là ‘ended up …ing’ or ‘finally ….’",
    "formation": "Động từ stem + 고 말다"
  },
  "ko_고_7": {
    "title": "~고 싶다 [go sipda] (Want to)",
    "shortExplanation": "Dùng để diễn tả a desire or wish to do something.",
    "longExplanation": "'~고 싶다 [go sipda]' is Dùng để biểu thị that the speaker (or someone) wants to do something. It can be softened to express one’s own wishes or Dùng để hỏi politely about someone else’s wishes.",
    "formation": "Động từ stem + 고 싶다"
  },
  "ko_고_8": {
    "title": "~고 있다 [go itda] (In the process of doing)",
    "shortExplanation": "Dùng để diễn tả an ongoing action or a continuing state.",
    "longExplanation": "'~고 있다 [go itda]' corresponds roughly to the present progressive trong câu (e.g., 'am doing'), but can also show a continued state (e.g., 'am wearing' something).",
    "formation": "Động từ stem + 고 있다"
  },
  "ko_고자_9": {
    "title": "~고자 하다 [goja hada] (In order to)",
    "shortExplanation": "A more formal/official way to express intention or purpose: ‘in order to,’ ‘for the purpose of.’",
    "longExplanation": "'~고자 하다 [goja hada]' is typically used in more formal contexts to Diễn tả speaker’s intention or plan to do something, similar to ‘in order to’ trong câu. It often appears in written or official discourse.",
    "formation": "Động từ stem + 고자 하다 (often ~고자 + main verb in formal sentences)"
  },
  "ko_곤_10": {
    "title": "~곤 하다 [gon hada] (Often do)",
    "shortExplanation": "Dùng để diễn tả the repetition or frequency of an action or state.",
    "longExplanation": "'~곤 하다 [gon hada]' is a pattern used trong tiếng Hàn to convey habitual or repeated actions. It attaches to action verbs to suggest that something happens repeatedly or as a habit. It generally reflects a recurring behavior, often in both the past and present.",
    "formation": "Động từ stem + 곤 하다 (commonly used as '~곤 해요', '~곤 했어요', etc.)"
  },
  "ko_기도_11": {
    "title": "~기도 하다 [gido hada] (Sometimes do)",
    "shortExplanation": "Diễn tả that an action is done occasionally or sometimes.",
    "longExplanation": "'~기도 하다 [gido hada]' is Dùng để biểu thị that someone sometimes (not always) does a certain action. It can also be used to emphasize that there are multiple actions: one does A and sometimes B, too. The '도' particle shows this sense of 'also' or 'too.'",
    "formation": "Động từ stem + 기도 하다"
  },
  "ko_기로_12": {
    "title": "~기로 [giro] (Decided to)",
    "shortExplanation": "Biểu thị a decision or agreement to do something.",
    "longExplanation": "The '~기로 [giro]' construction is Dùng để diễn tả that a decision or promise has been made to do something. It often appears as '~기로 하다', '~기로 결정하다', or '~기로 약속하다' to emphasize that a firm plan or promise is in place.",
    "formation": "Động từ stem + 기로 (often followed by 하다/결정하다/약속하다)"
  },
  "ko_기로_13": {
    "title": "~기로 되다 [giro dweda] (It's decided to)",
    "shortExplanation": "Diễn tả that something has been decided or arranged.",
    "longExplanation": "'~기로 되다 [giro dweda]' is used when you want to indicate that some plan or arrangement has been set, often by an external decision or mutual agreement. It often translates to 'It has been decided that...' or 'It's arranged that...'",
    "formation": "Động từ stem + 기로 되다"
  },
  "ko_기로_14": {
    "title": "~기로 하다 [giro hada] (Decide to)",
    "shortExplanation": "Used to say that one decides or agrees to do something.",
    "longExplanation": "'~기로 하다' is a common way to say 'decide to...' trong tiếng Hàn. It highlights that a resolution or plan has been set for some future action. It is also used for promises or mutual agreements (e.g., with friends or family).",
    "formation": "Động từ stem + 기로 하다"
  },
  "ko_기_15": {
    "title": "~기 시작하다 [gi sijakhada] (Begin to)",
    "shortExplanation": "Dùng để diễn tả the start or beginning of an action.",
    "longExplanation": "'~기 시작하다 [gi sijakhada]' Biểu thị that an action has just begun (or will soon begin). It is the rough equivalent of 'to start doing' or 'to begin to do' trong câu.",
    "formation": "Động từ stem + 기 시작하다"
  },
  "ko_기_16": {
    "title": "~기 위해서 [gi wihaeseo] (In order to)",
    "shortExplanation": "Dùng để diễn tả the purpose or reason for doing something.",
    "longExplanation": "'~기 위해서 [gi wihaeseo]' means 'in order to' or 'for the purpose of.' When attached to a verb in the '~기' nominal form, it denotes the reason or purpose for taking a particular action. It is common in both spoken and written Korean when describing why someone is doing something (especially future or ongoing actions).",
    "formation": "Động từ stem + 기 위해서"
  },
  "ko_기는_17": {
    "title": "~기는 [gineun] (But)",
    "shortExplanation": "Dùng để biểu thị contrast or an exception; similar to 'but' trong câu.",
    "longExplanation": "'~기는 [gineun]' is attached to a verb stem (or sometimes an adjective stem) to imply a contrast with a following clause. It acknowledges or concedes one point, while highlighting a contrasting fact or viewpoint. It is somewhat similar to 'but' or 'although' trong câu, often used to say something “is true, but…”",
    "formation": "Động từ stem + 기는 (or Tính từ stem + 기는)"
  },
  "ko_기에는_18": {
    "title": "~기에는 [gieneun] (For doing)",
    "shortExplanation": "Dùng để diễn tả 'for doing something' or 'in order to'.",
    "longExplanation": "'~기에는 [gieneun]' typically Biểu thị that something is either suitable or unsuitable for a certain purpose. It can often be translated as 'for (the purpose of) doing X' or 'to do X.' It frequently appears with judgments about time, conditions, or suitability for an action.",
    "formation": "Động từ stem + 기에는 (+ complement)"
  },
  "ko_기_19": {
    "title": "~기 전에 [gi jeone] (Before doing)",
    "shortExplanation": "Dùng để diễn tả that one action occurs before another.",
    "longExplanation": "'~기 전에 [gi jeone]' means 'before doing (something).' It is used to specify an action that takes place prior to another action. The literal translation is 'before V-ing' trong câu. It is very common when giving a chronological order of steps or instructions.",
    "formation": "Động từ stem + 기 전에"
  },
  "ko_나_20": {
    "title": "~나 보다 [na boda] (Seems like, guess)",
    "shortExplanation": "Dùng để diễn tả an assumption or supposition (e.g., 'it seems that...').",
    "longExplanation": "'~나 보다 [na boda]' is used when the speaker draws a guess or conclusion from evidence, often translated as 'it seems...', 'I guess...', or 'looks like...'. It can be used with both verbs and adjectives: '하나 보다' (I guess one does it), '크나 보다' (I guess it's big), etc.",
    "formation": "Động từ or adjective stem + 나 보다"
  },
  "ko_나다_21": {
    "title": "~나다 [nada] (End up doing, come to do)",
    "shortExplanation": "Diễn tả that an action happened unexpectedly or wasn’t originally intended.",
    "longExplanation": "The verb “나다” can appear in certain compound forms like ‘결정이 나다’ (‘a decision is made’), ‘끝나다’ (‘to end’), or ‘결론이 나다’ (‘a conclusion is reached’). In these contexts, it often carries the nuance of something happening or being completed somewhat beyond one’s direct intention. Có thể dịch là ‘end up ~ing’ or ‘come to ~.’",
    "formation": "Commonly in fixed expressions (e.g., 결정이 나다, 끝나다)."
  },
  "ko_나요_22": {
    "title": "~나요? [nayo?] (Isn't it?)",
    "shortExplanation": "Used to form tag questions or to express doubt (like 'isn't it?' or 'don't you?').",
    "longExplanation": "'~나요? [nayo?]' is a question ending that often seeks confirmation or agreement. It can mean 'isn’t it?', 'don’t you?', or 'right?' trong câu. The speaker is fairly polite but is also expressing some uncertainty or asking for the listener’s opinion/confirmation.",
    "formation": "Động từ/Tính từ stem + 나요?"
  },
  "ko_는_23": {
    "title": "~는 대로 [neun daero] (As it is)",
    "shortExplanation": "Diễn tả 'just as', 'according to', or 'in the same way as'.",
    "longExplanation": "'~는 대로 [neun daero]' is used to mean 'exactly as' or 'according to.' It can be attached to verbs (e.g., '하는 대로') or nouns (with particles, e.g., '예측대로'). It emphasizes following instructions, patterns, or facts precisely as stated or observed.",
    "formation": "Động từ stem + 는 대로 / Danh từ + 대로"
  },
  "ko_는_24": {
    "title": "~는 도중에 [neun dojunge] (While doing)",
    "shortExplanation": "Dùng để biểu thị that something happens in the midst of an ongoing action.",
    "longExplanation": "'~는 도중에 [neun dojunge]' literally means 'in the middle of (doing something).' It shows that an event occurs while another action is still in progress. It is similar to 'while (verb)-ing' or 'in the midst of' trong câu.",
    "formation": "Động từ stem + 는 도중에"
  },
  "ko_는_25": {
    "title": "~는 방향으로 [neun banghyangeuro] (Toward)",
    "shortExplanation": "Biểu thị movement or orientation 'toward' a certain direction.",
    "longExplanation": "'~는 방향으로 [neun banghyangeuro]' is used to describe movement or orientation toward some direction or goal. It is often translated as 'in the direction of.' For instance, '학교 있는 방향으로 가다' means to walk or move toward where the school is located.",
    "formation": "Danh từ + (이/가/은/는) + 있는 방향으로 + Động từ"
  },
  "ko_는_26": {
    "title": "~는 법이다 [neun beopida] (Usually, always)",
    "shortExplanation": "This expression is used to describe a general rule or habit that always tends to happen.",
    "longExplanation": "The phrase '~는 법이다 [neun beopida]' is a grammar structure used to say that something usually or always happens in a certain way, almost like a rule or law. It describes general truths, habits, or principles that tend not to change.",
    "formation": "Động từ (dictionary form) + 는 + 법이다"
  },
  "ko_는데다_27": {
    "title": "~는데다 [neunde-da] (Furthermore, and)",
    "shortExplanation": "Used to add additional information or to emphasize a situation; 'furthermore', 'in addition'.",
    "longExplanation": "'~는데다 [neunde-da]' is used to add another fact or condition that strengthens or expands upon the previous statement. It often translates to 'in addition to that...' or 'furthermore...' trong câu. It can be attached to verbs or adjectives to connect reasons or circumstances.",
    "formation": "Tính từ/Action verb + 는데다"
  },
  "ko_는데도_28": {
    "title": "~는데도 [neundedo] (Even though, but still)",
    "shortExplanation": "Dùng để diễn tả a contrasting or contradictory situation: 'even though', 'but still'.",
    "longExplanation": "'~는데도 [neundedo]' is a conjunctive particle that describes a surprising or unexpected result, given some situation or fact. It is similar to 'even though,' 'despite,' or 'but still' trong câu.",
    "formation": "Động từ/Tính từ + 는데도"
  },
  "ko_는지_29": {
    "title": "~는지 [neunji] (Whether or not)",
    "shortExplanation": "Dùng để diễn tả doubt or to inquire about a certain fact: 'whether or not'.",
    "longExplanation": "'~는지 [neunji]' is attached to a verb or adjective stem to indicate uncertainty or to form an indirect question. Có thể dịch là 'whether (or not)...' trong câu, and it’s often used when one is unsure or curious about some information.",
    "formation": "Động từ/Tính từ stem + 는지"
  },
  "ko_는지_30": {
    "title": "~는지 모르겠다 [neunji moreugessda] (I'm not sure if)",
    "shortExplanation": "Dùng để diễn tả uncertainty: 'I'm not sure if...', 'I don't know whether...'.",
    "longExplanation": "'~는지 모르겠다 [neunji moreugessda]' Diễn tả doubt or uncertainty about a certain fact or outcome. It roughly corresponds to 'I’m not sure if...' or 'I don’t know whether...' trong câu.",
    "formation": "Động từ/Tính từ stem + 는지 모르겠다"
  },
  "ko_는지라_31": {
    "title": "~는지라 [neunjira] (Because, since)",
    "shortExplanation": "Used to provide a reason or cause for something: 'because', 'since'.",
    "longExplanation": "'~는지라 [neunjira]' is a connective ending trong tiếng Hàn that provides a reason or cause. It is often used in relatively formal or written contexts and means 'because' or 'since' trong câu. It generally implies that the stated reason is decisive for the outcome in the main clause.",
    "formation": "Động từ/Tính từ stem + 는지라"
  },
  "ko_다가_32": {
    "title": "~다가 [daga] (While, and then)",
    "shortExplanation": "Dùng để diễn tả 'in the middle of something, when suddenly...' or 'and then'.",
    "longExplanation": "'~다가 [daga]' Biểu thị that one action was in progress, and then another action or event occurred. It can imply an interruption ('while doing X, suddenly Y happened') or a sequence ('I was doing X and then moved on to Y').",
    "formation": "Động từ stem + 다가"
  },
  "ko_다가는_33": {
    "title": "~다가는 [daganeun] (If keep doing)",
    "shortExplanation": "Diễn tả a negative consequence if the current action continues.",
    "longExplanation": "'~다가는 [daganeun]' warns that if one keeps doing something (or if the current situation persists), a negative or undesired outcome will result. It translates roughly as 'if you keep doing this, then...' trong câu.",
    "formation": "Động từ stem + 다가는"
  },
  "ko_다가도_34": {
    "title": "~다가도 [dagado] (Even though was doing)",
    "shortExplanation": "Used when an unexpected event occurs while another action is in progress.",
    "longExplanation": "'~다가도 [dagado]' describes a scenario where the speaker was in the midst of doing something, yet an unexpected or contrasting outcome occurred. It can be interpreted as 'even though I was doing X, it turned out Y.'",
    "formation": "Động từ stem + 다가도"
  },
  "ko_다는_35": {
    "title": "~다는 것 [daneun geot] (The fact that)",
    "shortExplanation": "Dùng để diễn tả 'the fact that' or 'the idea that' when referring to specific information.",
    "longExplanation": "'~다는 것 [daneun geot]' is a Korean grammar construct used to convey or emphasize the idea or concept of something, similar to 'the fact that' or 'the idea that' trong câu. It can also carry a nuance of 'it is said that,' but is most often used to highlight certain information the speaker has come to understand or wishes to point out.",
    "formation": "Động từ stem + 다는 것"
  },
  "ko_다며_36": {
    "title": "~다며 [damyeo] (Saying that)",
    "shortExplanation": "Used to relay an action or state that the speaker (or someone else) says, thinks, or feels.",
    "longExplanation": "'~다며 [damyeo]' is used trong tiếng Hàn when the speaker is quoting or restating something that was said or thought. It often appears when reporting direct speech or personal thoughts, indicating a subjective viewpoint. Tense is indicated by the overall sentence rather than by '다며' itself.",
    "formation": "Declarative verb/adjective form + 다며"
  },
  "ko_대로_37": {
    "title": "~대로 [daero] (According to, as)",
    "shortExplanation": "Dùng để biểu thị actions performed according to a certain method, rule, or manner.",
    "longExplanation": "'~대로 [daero]' Diễn tả that something is done 'according to' or 'in the same manner as' a previously mentioned instruction, plan, or situation. It can also mean 'just as it is.'",
    "formation": "Danh từ + 대로 / Động từ stem + (으)ㄴ/는 대로"
  },
  "ko_대로_38": {
    "title": "~대로 하다 [daero hada] (Do as instructed/said)",
    "shortExplanation": "Dùng để diễn tả doing something exactly as was stated or instructed.",
    "longExplanation": "The expression '~대로 하다 [daero hada]' means to carry out an action 'according to' or 'as' someone said or as indicated by some rule, instruction, or pattern. It emphasizes following instructions or advice exactly.",
    "formation": "Danh từ/Động từ 어/아/해 + 대로 하다"
  },
  "ko_대로이면_39": {
    "title": "~대로이면 [daeroimyeon] (If it’s as ... said)",
    "shortExplanation": "Dùng để diễn tả the condition ‘if it is according to ...’ or ‘if it is as stated’.",
    "longExplanation": "'~대로이면 [daeroimyeon]' is a conditional phrase meaning 'if it indeed is as stated or as told.' Often used when talking about a plan, rumor, or instruction that might or might not be accurate.",
    "formation": "Động từ (plain form) + 대로이면"
  },
  "ko_도록_40": {
    "title": "~도록 [dorok] (So that)",
    "shortExplanation": "Dùng để diễn tả ‘so that’ or ‘in order to’.",
    "longExplanation": "'~도록 [dorok]' is a grammatical form used trong tiếng Hàn to express an intended purpose or result, similar to 'so that' or 'in order to' trong câu. It can also indicate cause-and-effect relationships or give instructions for achieving a particular outcome.",
    "formation": "Động từ stem + 도록 / Danh từ + 이/가 + Tính từ + 도록"
  },
  "ko_도록_41": {
    "title": "~도록 하다 [dorok hada] (Make/ensure that)",
    "shortExplanation": "Dùng để diễn tả making someone do something or ensuring that something happens.",
    "longExplanation": "'~도록 하다 [dorok hada]' is often used trong tiếng Hàn to mean 'make sure to...' or 'have/let someone do something.' It can also mean you are ensuring a certain condition or outcome occurs.",
    "formation": "Động từ/Danh từ + 도록 하다"
  },
  "ko_도록이면_42": {
    "title": "~도록이면 [dorogimyeon] (If possible)",
    "shortExplanation": "Dùng để diễn tả a wish or desire for something to be done if possible.",
    "longExplanation": "'~도록이면 [dorogimyeon]' is Dùng để biểu thị the speaker's preference or hope that something be done, assuming it’s possible. It can be interpreted as 'if possible...' or 'if you can help it...'.",
    "formation": "Động từ stem + 도록이면"
  },
  "ko_든지_43": {
    "title": "~든지 [deunji] (Whether ... or)",
    "shortExplanation": "Used to present multiple possibilities or choices: 'whether ... or'.",
    "longExplanation": "'~든지 [deunji]' is used to offer two or more choices, similar to 'whether ... or' trong câu. It Biểu thị that any of the mentioned options is acceptable or possible. It can be attached to nouns, verbs, or phrases in a flexible way.",
    "formation": "Danh từ + (이)든지 / Động từ stem + 든지"
  },
  "ko_든지_44": {
    "title": "~든지 ~든지 [deunji deunji] (Either ... or)",
    "shortExplanation": "Used to enumerate alternatives or choices; 'either ... or'.",
    "longExplanation": "'~든지 ~든지 [deunji deunji]' is a conjunctive expression trong tiếng Hàn used to convey multiple choices or alternatives. Similar to 'either ... or' trong câu, it Biểu thị that any of the mentioned options is acceptable, leaving the final decision to the listener or speaker.",
    "formation": "Danh từ + 든지 + Danh từ + 든지"
  },
  "ko_라도_45": {
    "title": "~라도 [rado] (At least, even if)",
    "shortExplanation": "Dùng để diễn tả the minimum action or condition; 'at least', 'even if'.",
    "longExplanation": "'~라도 [rado]' Biểu thị a minimal or lesser option that is still better than nothing. It carries the sense of 'at least' or 'even if,' showing that although the condition might not be ideal, it satisfies some minimum requirement or concession.",
    "formation": "Động từ stem + 라도 / Danh từ + (이)라도"
  },
  "ko_라든지_46": {
    "title": "~라든지 [radeunji] (Or something)",
    "shortExplanation": "Dùng để biểu thị alternatives or options; 'or something', 'for example'.",
    "longExplanation": "'~라든지 [radeunji]' is a Korean conjunctive particle used to suggest various examples or possibilities. It’s often used when the speaker is unsure or when only offering sample options among many, much like 'or something like that' or 'for example' trong câu.",
    "formation": "Danh từ/Động từ stem + 라든지"
  },
  "ko_라면_47": {
    "title": "~라면 [ramyeon] (If it's the case that)",
    "shortExplanation": "Dùng để diễn tả the hypothetical condition 'if it's the case that'.",
    "longExplanation": "'~라면 [ramyeon]' is a conditional suffix trong tiếng Hàn that corresponds to 'if' or 'if it's the case that' trong câu. It’s commonly used for hypothetical or conjectural statements.",
    "formation": "Động từ/Tính từ + (이)라면"
  },
  "ko_라면서_48": {
    "title": "~라면서 [ramyeonseo] (While saying that)",
    "shortExplanation": "Used when an action or state contradicts a previously stated intention or claim.",
    "longExplanation": "'~라면서 [ramyeonseo]' is Dùng để biểu thị that someone acts in a way that goes against what they have said. It can also be used in contexts where you quote someone else’s words and then show a discrepancy. It loosely translates to 'while (he/she) said that...' trong câu.",
    "formation": "Động từ/Tính từ (future/past tense form) + 라면서"
  },
  "ko_려고_49": {
    "title": "~려고 [ryeogo] (In order to)",
    "shortExplanation": "Dùng để chỉ ra the intent or purpose of an action; 'in order to', 'to'.",
    "longExplanation": "'~려고 [ryeogo]' is used trong tiếng Hàn to Diễn tả intention or purpose for doing something. It is often translated as 'in order to' or simply 'to' trong câu, indicating the reason or goal behind an action.",
    "formation": "Động từ stem + 려고"
  },
  "ko_려고_50": {
    "title": "~려고 하다 [ryeogo hada] (Try to)",
    "shortExplanation": "Dùng để diễn tả one's intention or attempt to do something; 'try to', 'plan to'.",
    "longExplanation": "'~려고 하다' Biểu thị the speaker’s intention or plan to perform an action. Có thể dịch là 'try to...' or 'plan to...' trong câu. It’s a common structure for talking about near-future actions or goals.",
    "formation": "Động từ stem + 려고 하다"
  },
  "ko_려는데_51": {
    "title": "~려는데 [ryeonde] (I'm planning to, I want to)",
    "shortExplanation": "Dùng để diễn tả a plan or intention that has not yet been carried out.",
    "longExplanation": "'~려는데 [ryeonde]' is used when the speaker has a plan or a certain inclination to do something in the future. It often carries the nuance that the plan could be affected by circumstances, or that it’s still in the preliminary stage.",
    "formation": "Động từ stem + 려는데"
  },
  "ko_마다_52": {
    "title": "~마다 [mada] (Every)",
    "shortExplanation": "Dùng để diễn tả 'every' or 'each'.",
    "longExplanation": "'~마다 [mada]' is a postposition trong tiếng Hàn used to mean 'every' or 'each,' emphasizing the recurring nature of events or items. It can apply to time expressions (e.g., 매일마다), location (집집마다), or other contexts where the idea of ‘every’ or ‘each’ is relevant.",
    "formation": "Danh từ + 마다"
  },
  "ko_만큼_53": {
    "title": "~만큼 [mankeum] (As much as)",
    "shortExplanation": "This pattern is Dùng để chỉ ra the extent or degree of something, or to compare two things.",
    "longExplanation": "'~만큼 [mankeum]' is a grammar structure Dùng để diễn tả 'as much as' or 'equivalent to' trong câu. It lets you denote that something has the same extent or degree as another thing. It’s often used to talk about comparisons, equivalences, or proportional relationships.",
    "formation": "Danh từ + 만큼 | Động từ + 을 만큼"
  },
  "ko_면_54": {
    "title": "~면 [myeon] (If, when)",
    "shortExplanation": "Dùng để diễn tả a conditional 'if' or to describe 'when' something happens.",
    "longExplanation": "'~면 [myeon]' is a suffix attached to a verb stem to mean 'if' or sometimes 'when' trong câu. It describes a hypothetical or future condition. The action or state in the main clause will naturally occur once the condition in the dependent clause is met.",
    "formation": "Động từ stem + 면"
  },
  "ko_면서_55": {
    "title": "~면서 [myeonseo] (While)",
    "shortExplanation": "A conjunction used to connect two actions happening at the same time.",
    "longExplanation": "'~면서 [myeonseo]' Biểu thị two actions or states occurring simultaneously with the same subject. It often translates to 'while' or 'as' trong câu. It’s used when both actions happen concurrently rather than in sequence.",
    "formation": "Động từ stem + 면서"
  },
  "ko_밖에_56": {
    "title": "~밖에 [bakke] (Nothing but, only)",
    "shortExplanation": "Diễn tả 'nothing but' or 'only', indicating limited choices or possibilities (usually in negative sentences).",
    "longExplanation": "'~밖에 [bakke]' is a particle that emphasizes the exclusivity of something—only that item or option exists or applies. It generally appears in negative sentences to highlight that there is nothing else but whatever is mentioned.",
    "formation": "Danh từ + 밖에 + Negative verb"
  },
  "ko_보다_57": {
    "title": "~보다 [boda] (More than)",
    "shortExplanation": "Used to form comparative expressions equivalent to 'more than' trong câu.",
    "longExplanation": "'~보다 [boda]' is a particle that marks what something is being compared to, functioning like 'than' trong câu. The item before '보다' is the reference of comparison, indicating that something else is bigger, better, or more than it.",
    "formation": "Danh từ/Động từ stem + 보다 + Tính từ"
  },
  "ko_부터_58": {
    "title": "~부터 [buteo] (From, starting from)",
    "shortExplanation": "Biểu thị the starting point of an action, location, or time.",
    "longExplanation": "'~부터 [buteo]' is a common grammar particle Dùng để chỉ ra when or where something begins. It corresponds to 'from' trong câu, marking the starting moment, place, or status for an event or situation.",
    "formation": "Danh từ + 부터"
  },
  "ko_서는_59": {
    "title": "~서는 [seoneun] (But in)",
    "shortExplanation": "Dùng để biểu thị contrast or contradiction in two different contexts.",
    "longExplanation": "'~서는 [seoneun]' can appear in contexts where there is a mismatch between an expectation or statement and the actual situation. It's somewhat similar to saying 'but in (that regard)' or 'but as for...' trong câu. It often conveys disappointment, contradiction, or surprise.",
    "formation": "Động từ stem + 서는"
  },
  "ko_아어_60": {
    "title": "~아/어 보이다 [a/eo boida] (Looks/seems like)",
    "shortExplanation": "Used to make a subjective judgment about someone or something based on appearance or situation.",
    "longExplanation": "'~아/어 보이다 [a/eo boida]' is used to convey that something or someone ‘looks like’ or ‘seems like’ a certain way, based on the speaker's subjective perspective. It can express guesses or first impressions about a person’s feelings, health, weather, etc.",
    "formation": "Động từ/Tính từ stem + 아/어 보이다"
  },
  "ko_아어_61": {
    "title": "~아/어 버리다 [a/eo beorida] (Completely do, or unfortunately do)",
    "shortExplanation": "Dùng để biểu thị completing an action fully, or doing something that leads to an unfortunate result.",
    "longExplanation": "The structure '~아/어 버리다 [a/eo beorida]' attaches to a verb stem to emphasize that the action is done completely or that the outcome is regrettable/unwanted. It can imply relief at finishing something, or Diễn tả speaker’s sense of regret or finality about the action.",
    "formation": "Động từ stem + 아/어 버리다"
  },
  "ko_아어_62": {
    "title": "~아/어 두다 [a/eo duda] (Keep, leave)",
    "shortExplanation": "Dùng để diễn tả leaving or keeping something in a certain state or condition.",
    "longExplanation": "'~아/어 두다 [a/eo duda]' is used trong tiếng Hàn to indicate that one is leaving something in a particular state or maintaining it for a future use or reference. It implies an intentional act of preservation or preparation. Depending on the verb’s final vowel/consonant, use '아 두다' or '어 두다'.",
    "formation": "Động từ stem + 아/어 + 두다"
  },
  "ko_아어_63": {
    "title": "~아/어 가다 [a/eo gada] (Go on doing)",
    "shortExplanation": "Diễn tả the continuous or ongoing nature of an action over time.",
    "longExplanation": "'~아/어 가다 [a/eo gada]' is Dùng để chỉ ra that an action continues steadily or gradually forward, often implying persistence or progress. It can be similar to 'go on doing something' trong câu.",
    "formation": "Động từ stem + 아/어 가다"
  },
  "ko_아어_64": {
    "title": "~아/어 오다 [a/eo oda] (Come to do)",
    "shortExplanation": "Diễn tả an action developing over time or a gradual change leading up to the present.",
    "longExplanation": "'~아/어 오다 [a/eo oda]' is Dùng để chỉ ra that an action has been in progress or gradually developed until now. It can translate to 'have been doing' or 'come to do' trong câu, depending on context.",
    "formation": "Động từ stem + 아/어 오다"
  },
  "ko_아어야_65": {
    "title": "~아/어야 하다 [a/eoya hada] (Have to, must)",
    "shortExplanation": "Diễn tả obligation or necessity: 'have to,' 'must'.",
    "longExplanation": "'~아/어야 하다 [a/eoya hada]' Biểu thị that something needs to be done or is mandatory. It corresponds to 'have to' or 'must' trong câu. '아야 하다' is used if the verb ends in ㅏ/ㅗ, and '어야 하다' is used otherwise.",
    "formation": "Động từ stem + 아/어야 하다"
  },
  "ko_아어야지_66": {
    "title": "~아/어야지 [a/eoyaji] (I'm going to)",
    "shortExplanation": "Diễn tả the speaker's strong intention or determination to do something.",
    "longExplanation": "The grammar '~아/어야지 [a/eoyaji]' conveys a strong resolve or plan to carry out an action, much like saying 'I really should...' or 'I’m definitely going to...' trong câu. It’s often used in first-person contexts.",
    "formation": "Động từ stem + 아/어야지"
  },
  "ko_아어도_67": {
    "title": "~아/어도 [a/eodo] (Even if)",
    "shortExplanation": "Dùng để diễn tả 'even if' or 'although'.",
    "longExplanation": "'~아/어도 [a/eodo]' conveys a condition that won’t change the outcome or the speaker's viewpoint. Similar to 'even if' or 'no matter how' trong câu, it shows that whatever happens in the first clause does not alter the second clause.",
    "formation": "Động từ stem + 아/어도"
  },
  "ko_아어서_68": {
    "title": "~아/어서 [a/eoseo] (Because, so)",
    "shortExplanation": "Dùng để diễn tả reason or cause: 'because', 'so'.",
    "longExplanation": "'~아/어서 [a/eoseo]' is a common conjunctive ending indicating that the first clause is the reason or cause for the second clause. It corresponds to 'because' or 'so' trong câu and is used in everyday speech and writing.",
    "formation": "Động từ stem + 아/어서"
  },
  "ko_았었던_69": {
    "title": "~았/었던 [ass/eossdeon] (Was)",
    "shortExplanation": "Dùng để diễn tả a past state or condition: 'was'.",
    "longExplanation": "The past modifier '~았/었던 [ass/eossdeon]' is used to describe a noun that had a certain state or performed an action in the past. It's similar to saying 'that was...' or 'who was...' trong câu. The choice of 았/었 depends on the final vowel of the verb stem.",
    "formation": "Động từ + 았/었던 + Danh từ"
  },
  "ko_았었어야_70": {
    "title": "~았/었어야 했다 [ass/eosseoya haessda] (Should have done)",
    "shortExplanation": "Dùng để diễn tả regret about something that should have been done in the past but was not.",
    "longExplanation": "'~았/었어야 했다 [ass/eosseoya haessda]' shows regret for not doing something that one should have done in the past. It translates to 'should have done' trong câu. It highlights a missed obligation or opportunity.",
    "formation": "Động từ + 았/었어야 했다"
  },
  "ko_았었으면_71": {
    "title": "~았/었으면 [ass/eosseumyeon] (I wish it were)",
    "shortExplanation": "'~았/었으면' is Dùng để diễn tả a wish or desire for a situation to be different from what it is now.",
    "longExplanation": "'~았/었으면 [ass/eosseumyeon]' is a grammar point commonly Dùng để diễn tả hypothetical or unreal situations, much like 'I wish...' or 'if only...' trong câu. It conveys regret or unfulfilled wishes. Formally, it’s the past tense stem plus ‘(으)면’, indicating a desire for something that did not happen.",
    "formation": "Past verb stem + (으)면"
  },
  "ko_았었을_72": {
    "title": "~았/었을 텐데 [ass/eosseul tende] (I assume it must have been)",
    "shortExplanation": "Dùng để diễn tả assumption or expectation based on past events.",
    "longExplanation": "'~았/었을 텐데 [ass/eosseul tende]' Diễn tả the speaker's speculation or presumption about a past situation. It combines the past tense marker '~았/었' with '을 텐데,' which shows the speaker’s expectation or guess about what must have happened.",
    "formation": "Động từ stem + 았/었을 텐데"
  },
  "ko_았었다가_73": {
    "title": "~았/었다가 [ass/eossdaga] (Was and then)",
    "shortExplanation": "Diễn tả that a past situation happened and then changed or was followed by another occurrence.",
    "longExplanation": "'~았/었다가 [ass/eossdaga]' denotes a change in state or a sequence of events in the past. It’s often used with action verbs to show one event happened and then a subsequent action followed.",
    "formation": "Động từ + 았/었다가"
  },
  "ko_았었다면_74": {
    "title": "~았/었다면 [ass/eossdamyeon] (If it had been)",
    "shortExplanation": "Used for hypothetical past situations: 'If it had been'.",
    "longExplanation": "'~았/었다면' imagines a different outcome for a past situation. '다면' after the past tense Biểu thị an unreal or counterfactual condition, often expressing regret or speculation about what could have happened.",
    "formation": "Past tense verb/adjective + 다면"
  },
  "ko_으면_75": {
    "title": "~으면 좋겠다 [eumyeon joketda] (I hope, it would be good if)",
    "shortExplanation": "Diễn tả a wish or hope for a certain situation or result.",
    "longExplanation": "'~으면 좋겠다 [eumyeon joketda]' is a common structure for stating what the speaker hopes will happen or would be nice if it happened. It often translates to 'I hope...' or 'It would be good if...' trong câu.",
    "formation": "Động từ + (으)면 좋겠다"
  },
  "ko_으면서도_76": {
    "title": "~으면서도 [eumyeonseodo] (While, but still)",
    "shortExplanation": "Diễn tả a contradiction: 'while', 'but still', 'even though'.",
    "longExplanation": "'~으면서도 [eumyeonseodo]' is used to link two contrasting facts. It shows that although the first situation is true, there is another fact that runs counter to it, akin to 'even though' or 'but still' trong câu.",
    "formation": "Động từ stem + (으)면서도"
  },
  "ko_을_77": {
    "title": "~을/ㄹ 거예요 [eul/l geoyeyo] (Going to, will)",
    "shortExplanation": "Diễn tả a future plan or intention—similar to 'going to' or 'will' trong câu.",
    "longExplanation": "'~을/ㄹ 거예요 [eul/l geoyeyo]' is Dùng để biểu thị that something will happen or that the speaker plans or expects something in the future. It can also Diễn tả speaker's assumption about the future. If the verb stem ends in a consonant, use '을 거예요'; if it ends in a vowel, use 'ㄹ 거예요.'",
    "formation": "Động từ stem + 을 거예요 (consonant-ending) / ㄹ 거예요 (vowel-ending)"
  },
  "ko_을게요_78": {
    "title": "~을/ㄹ게요 [eul/l geyo] (I will)",
    "shortExplanation": "Dùng để diễn tả a future intention, promise, or decision (often more immediate/personal than '~을/ㄹ 거예요').",
    "longExplanation": "'~을/ㄹ게요 [eul/l geyo]' is a verb ending trong tiếng Hàn that conveys the speaker’s **willingness**, **promise**, or **decision** to do something (often in response to the listener or a situation). Compared to '~을/ㄹ 거예요,' which can simply state a future plan, '~을/ㄹ게요' more strongly implies the speaker’s **own resolve** or reaction to the listener. The form '을게요' is used after stems ending in a **consonant**, and 'ㄹ게요' is used after stems ending in a **vowel**.",
    "formation": "Động từ stem + 을게요 (after consonant) / ㄹ게요 (after vowel)"
  },
  "ko_을까요_79": {
    "title": "~을/ㄹ까요? [eul/l kkayo?] (Shall we?)",
    "shortExplanation": "Used to suggest or propose an action to do together or to ask for the listener's opinion.",
    "longExplanation": "'~을/ㄹ까요? [eul/l kkayo?]' is a Korean ending used to propose an activity (often including the listener) or to ask for the listener's suggestion. It translates roughly as 'Shall we...?' or 'Should we...?' trong câu. It is typically used in polite, but not extremely formal, conversations.",
    "formation": "If the verb stem ends in a consonant: Động từ stem + 을까요?\nIf the verb stem ends in a vowel: Động từ stem + ㄹ까요?"
  },
  "ko_을_80": {
    "title": "~을/ㄹ 때 [eul/l ttae] (When)",
    "shortExplanation": "Dùng để biểu thị the point in time or occasion when something occurs.",
    "longExplanation": "'~을/ㄹ 때 [eul/l ttae]' means 'when' trong câu. You attach it to a verb stem to specify the time or context in which an action happens. '을 때' is used after a consonant-ending stem; 'ㄹ 때' after a vowel-ending stem.",
    "formation": "Động từ stem + 을 때 (if ending in consonant) / Động từ stem + ㄹ 때 (if ending in vowel)"
  },
  "ko_을_81": {
    "title": "~을/ㄹ 듯하다 [eul/l deuthada] (Seems like)",
    "shortExplanation": "Dùng để diễn tả the idea that something appears or feels like something else, or that one is guessing based on observation.",
    "longExplanation": "'~을/ㄹ 듯하다 [eul/l deuthada]' is used to convey that something seems or feels a certain way, based on the speaker’s inference or impression. It's similar to 'it seems that...' or 'it looks like...' trong câu.",
    "formation": "Action/Descriptive verb stem + 을/ㄹ 듯하다"
  },
  "ko_을_82": {
    "title": "~을/ㄹ 만하다 [eul/l manhada] (Worth doing)",
    "shortExplanation": "Diễn tả that something is worthwhile or justifiable to do or experience.",
    "longExplanation": "'~을/ㄹ 만하다' is used to say that a certain action or experience is valuable enough to be done, or 'worth it.' It implies the speaker's judgment that the effort, cost, or time involved is justified.",
    "formation": "Động từ stem + 을/ㄹ 만하다"
  },
  "ko_을_83": {
    "title": "~을/ㄹ 수록 [eul/l surok] (The more...)",
    "shortExplanation": "Shows that as one condition increases or continues, another condition also changes proportionally.",
    "longExplanation": "'~을/ㄹ 수록 [eul/l surok]' is Dùng để diễn tả the idea that the more the first action or state intensifies, the more the second action or state does too. It corresponds to 'the more... the more...' trong câu.",
    "formation": "Động từ stem + 을/ㄹ 수록"
  },
  "ko_을_84": {
    "title": "~을/ㄹ 줄 알다 [eul/l jul alda] (Know how to)",
    "shortExplanation": "Dùng để biểu thị that someone knows how to perform an action or is aware of a fact.",
    "longExplanation": "'~을/ㄹ 줄 알다 [eul/l jul alda]' often translates to 'know how to do something' or 'know that...' trong câu. It Biểu thị knowledge, skill, or awareness of a particular action or fact.",
    "formation": "Động từ in dictionary form + 을/ㄹ 줄 알다"
  },
  "ko_을지_85": {
    "title": "~을/ㄹ지 [eul/lji] (Whether or not)",
    "shortExplanation": "Dùng để diễn tả uncertainty or doubt: 'whether or not'.",
    "longExplanation": "'~을/ㄹ지 [eul/lji]' Biểu thị the speaker is unsure about an event or outcome, similar to 'whether' or 'whether or not' trong câu. It often appears in indirect questions or conditional statements involving doubt or possibility.",
    "formation": "Động từ stem + 을/ㄹ지"
  },
  "ko_을지도_86": {
    "title": "~을/ㄹ지도 모르다 [eul/ljido moreuda] (Might)",
    "shortExplanation": "This is Dùng để diễn tả uncertainty or possibility.",
    "longExplanation": "'~을/ㄹ지도 모르다 [eul/ljido moreuda]', or simply 'might' trong câu, is a grammar pattern used to represent the speaker's uncertainty or to Diễn tả possibility of a future event or condition. Depending on context, it can imply that something might or might not happen. The verb is conjugated according to the level of formality and respect required.",
    "formation": "(Động từ stem + 을/ㄹ지도 모르다)"
  },
  "ko_을지라도_87": {
    "title": "~을/ㄹ지라도 [eul/ljirado] (Even if)",
    "shortExplanation": "Used to say 'even if'; 'no matter how/if'; nonetheless.",
    "longExplanation": "'~을/ㄹ지라도 [eul/ljirado]' is a conditional form used trong tiếng Hàn to Diễn tả meaning of 'even if', 'no matter how', or 'nonetheless'. It Biểu thị that the expected result will remain unchanged regardless of the given condition.",
    "formation": "Động từ stem + 을/ㄹ지라도"
  },
  "ko_을지_88": {
    "title": "~을/ㄹ지 몰라 [eul/lji molla] (Maybe)",
    "shortExplanation": "Dùng để diễn tả uncertainty or doubt; 'maybe', 'might', 'I don't know if'.",
    "longExplanation": "'~을/ㄹ지 몰라 [eul/lji molla]' is a grammar form Dùng để biểu thị doubts, uncertainties, or suppositions. Có thể dịch là 'maybe', 'might', or 'I don’t know if' trong câu. This form is typically used when the speaker is unsure of something or wishes to present a speculative premise.",
    "formation": "Động từ/Tính từ + 을/ㄹ지 몰라"
  },
  "ko_을래요_89": {
    "title": "~을래요 [eullaeyo] (Want to)",
    "shortExplanation": "Dùng để diễn tả the speaker's desire or intention to do something.",
    "longExplanation": "'~을래요 [eullaeyo]' is a verb ending used trong tiếng Hàn to express an intention, suggestion, or polite proposal from the speaker's perspective. It denotes that the speaker wants or would like to do something and is often used when making plans or suggestions. Note that it is typically used for the speaker’s own actions.",
    "formation": "Động từ Stem + 을래요"
  },
  "ko_을_90": {
    "title": "~을 리가 없다 [eulliga eopda] (It's unlikely that)",
    "shortExplanation": "This expression is Dùng để biểu thị that a certain situation is unlikely or impossible to happen.",
    "longExplanation": "'~을 리가 없다 [eulliga eopda]' is a speculative expression used trong tiếng Hàn to indicate that something is improbable or implausible based on the speaker's judgment. It Diễn tả disbelief or doubt about the possibility of an event occurring and is often used to contrast a hypothetical situation with reality.",
    "formation": "Động từ + ~을 리가 없다"
  },
  "ko_을수록_91": {
    "title": "~을수록 [eulsurok] (The more)",
    "shortExplanation": "Dùng để diễn tả 'the more...the more', indicating an increasing degree or intensity.",
    "longExplanation": "The grammar point '~을수록 [eulsurok]' is used trong tiếng Hàn to indicate that as one condition intensifies, another condition increases proportionately. It is equivalent to the English phrase 'the more...the more', showing a direct proportional relationship between two events or states.",
    "formation": "Động từ-을수록 / Tính từ-을수록"
  },
  "ko_을지언정_92": {
    "title": "~을지언정 [euljieonjeong] (Even though)",
    "shortExplanation": "This phrase is Dùng để biểu thị 'even though' or 'despite'.",
    "longExplanation": "'~을지언정 [euljieonjeong]' is a conjunction trong tiếng Hàn that conveys the meaning of 'even though', 'even if', or 'despite'. It is used to present a contrasting situation or fact that exists despite the previous condition. While more common in formal or written language, it is also useful in everyday contexts and for tests like TOPIK.",
    "formation": "Động từ + 을지언정"
  },
  "ko_이나_93": {
    "title": "~이나 [ina] (Or, whether)",
    "shortExplanation": "Dùng để biểu thị choice or alternatives, typically attached to nouns.",
    "longExplanation": "'~이나 [ina]' is a particle trong tiếng Hàn attached to nouns to indicate alternatives or choices. It functions similarly to 'or' trong câu and is used to present different options or possibilities. The proper formation is with a noun followed by (이)나.",
    "formation": "Danh từ + (이)나"
  },
  "ko_이든_94": {
    "title": "~이든 [ideun] (Either or)",
    "shortExplanation": "Used to present two or more choices; 'either', 'or'.",
    "longExplanation": "'~이든 [ideun]' is a connecting ending used trong tiếng Hàn to present two or more alternatives or choices. It is analogous to 'either' or 'or' trong câu and is commonly used when the speaker considers all options equally acceptable.",
    "formation": "(Danh từ/Tính từ/Động từ) + 이든"
  },
  "ko_이라도_95": {
    "title": "~이라도 [irado] (At least, even if)",
    "shortExplanation": "Dùng để diễn tả 'at least' or 'even if'; refers to a minimum or lesser expectation.",
    "longExplanation": "The '~이라도 [irado]' grammar point is used trong tiếng Hàn to express a minimum expectation or to settle for a lesser alternative when the preferred option isn’t available. It conveys the idea of conceding to a less ideal scenario and is often used when faced with challenges or limited choices.",
    "formation": "Danh từ + 이라도"
  },
  "ko_이라는_96": {
    "title": "~이라는 것 [iraneun geot] (The thing called)",
    "shortExplanation": "This phrase is used to refer to or define something that was mentioned earlier.",
    "longExplanation": "'~이라는 것 [iraneun geot]' is a sentence structure used trong tiếng Hàn to refer to or define a particular thing or idea. It is often used in explanations to elaborate on a concept or to highlight specific characteristics.",
    "formation": "Danh từ + 이라는 것 + Sentence"
  },
  "ko_이라면_97": {
    "title": "~이라면 [iramyeon] (If it’s the case that)",
    "shortExplanation": "Used to imagine a certain situation; 'if it’s the case that'.",
    "longExplanation": "'~이라면 [iramyeon]' is used trong tiếng Hàn to pose a hypothetical scenario or situation. It is akin to saying 'if it’s the case that' trong câu and is used to speculate about consequences or outcomes.",
    "formation": "Động từ stem + -이라면"
  },
  "ko_이래_98": {
    "title": "~이래 [irae] (Like this, in this manner)",
    "shortExplanation": "Dùng để diễn tả 'like this' or 'in this manner', referring to a current state or condition.",
    "longExplanation": "'~이래 [irae]' is used trong tiếng Hàn to describe the state, condition, or manner in which something exists or is done. It emphasizes the way in which a situation is and is often used when commenting on the current status or behavior.",
    "formation": "Danh từ + 이래"
  },
  "ko_이랑_99": {
    "title": "~이랑 [irang] (And, with)",
    "shortExplanation": "Used to connect two nouns, expressing 'and' or 'with'.",
    "longExplanation": "'~이랑 [irang]' is a common connector trong tiếng Hàn that joins two nouns together to show a relationship or connection. It is used informally in various sentence types regardless of the politeness level.",
    "formation": "Danh từ + 이랑 + Danh từ"
  },
  "ko_이러하다_100": {
    "title": "~이러하다 [ireohada] (Like this)",
    "shortExplanation": "Used to describe the state or condition of a subject as 'like this'.",
    "longExplanation": "'~이러하다 [ireohada]' is a descriptive verb used trong tiếng Hàn to indicate that someone or something is in a particular state or condition. It emphasizes the current manner or appearance of the subject.",
    "formation": "Tính từ/Động từ base + -이러하다"
  },
  "ko_이런그런저런_101": {
    "title": "~이런/그런/저런 [ireon/geureon/jeoreon] (This kind of/That kind of/That kind over there)",
    "shortExplanation": "Used to describe the type or category of something; 'this kind of', 'that kind of', or 'that kind over there'.",
    "longExplanation": "~이런/그런/저런 [ireon/geureon/jeoreon] are demonstrative adjectives used trong tiếng Hàn to classify or describe things by their type or category. '이런' refers to something near the speaker, '그런' to something near the listener or already mentioned, and '저런' to something distant.",
    "formation": "('이런' + Danh từ) or ('그런' + Danh từ) or ('저런' + Danh từ)"
  },
  "ko_이므로_102": {
    "title": "~이므로 [imuro] (Because, since)",
    "shortExplanation": "Dùng để diễn tả a reason or cause; 'because', 'since'.",
    "longExplanation": "'~이므로 [imuro]' is a conjunction used trong tiếng Hàn to indicate a reason or cause, corresponding to 'because' or 'since' trong câu. It typically introduces the cause for a conclusion or result. This form is formal and is often used in written Korean, such as in official documents, academic writing, or news reports.",
    "formation": "Động từ/Tính từ/Danh từ + ~이므로"
  },
  "ko_이야_103": {
    "title": "~이야 [iya] (Is, informal declaration)",
    "shortExplanation": "'~이야' is used as an informal, casual way to state or declare something.",
    "longExplanation": "'~이야' is a verb modifier trong tiếng Hàn used to assert, declare, or express a fact, situation, or feeling in an informal context. It attaches to the stem of a noun, verb, or adjective and is common in daily conversation among close friends or people of similar age. It is not recommended to use this form with elders or superiors as it may sound rude.",
    "formation": "Tính từ/Động từ stem + 이야"
  },
  "ko_이지만_104": {
    "title": "~이지만 [ijiman] (But, although)",
    "shortExplanation": "Used to convey a contrast or contradiction; 'but', 'although'.",
    "longExplanation": "'~이지만 [ijiman]' is used trong tiếng Hàn to indicate a contrast or contradiction between two statements or facts. It is similar to 'but' or 'although' trong câu: despite what is stated in the first clause, the information in the second clause still holds true. In casual contexts, the shortened form '-지만' may be used on its own.",
    "formation": "Mệnh đề 1 + 지만 + Mệnh đề 2"
  },
  "ko_이후_105": {
    "title": "~이후 [ihu] (After, since)",
    "shortExplanation": "Dùng để diễn tả the meaning of 'after' or 'since'.",
    "longExplanation": "'~이후 [ihu]' is a postposition used trong tiếng Hàn to indicate the time after a specific point or event. It corresponds to 'after' or 'since' trong câu and is often used to refer to the period following a particular event.",
    "formation": "Danh từ + 이후"
  },
  "ko_인즉_106": {
    "title": "~인즉 [injeuk] (In other words, that is to say)",
    "shortExplanation": "Used to rephrase or further explain a preceding statement; 'in other words', 'that is to say'.",
    "longExplanation": "'~인즉 [injeuk]' is a connective ending used trong tiếng Hàn to rephrase or further explain a preceding statement or idea. It is similar to saying 'in other words' or 'that is to say' trong câu, and it helps the speaker clarify their point.",
    "formation": "Mệnh đề + 인즉"
  },
  "ko_자_107": {
    "title": "~자 [ja] (Let's)",
    "shortExplanation": "Used to propose doing something; 'Let's'.",
    "longExplanation": "'~자 [ja]' is an ending particle trong tiếng Hàn used to suggest or propose doing an action together. It corresponds loosely to 'Let's' trong câu and is used in informal or casual contexts among friends, colleagues, or family members. The subject is usually omitted, and the verb appears in its dictionary (base) form.",
    "formation": "Dictionary form of verb + 자"
  },
  "ko_자마자_108": {
    "title": "~자마자 [jamaja] (As soon as)",
    "shortExplanation": "Dùng để diễn tả that one action occurs immediately after another.",
    "longExplanation": "The '~자마자 [jamaja]' grammar point emphasizes that an action or event occurs immediately after a preceding one. It is equivalent to 'as soon as' trong câu and implies a very short time gap between the two actions.",
    "formation": "Động từ stem + 자마자"
  },
  "ko_전에전까지_109": {
    "title": "~전에/전까지 [jeone/jeonkkaji] (Before/by the time of)",
    "shortExplanation": "Dùng để biểu thị that an action or state is completed or occurs before a specific time.",
    "longExplanation": "'~전에 [jeone]' and '전까지 [jeonkkaji]' are used to denote that an action or state is completed before a certain time or event. '~전에' is used when the action stops before that time, while '전까지' Biểu thị that the action continues up to that point.",
    "formation": "Động từ + (ㄴ/는다) + 전에/전까지"
  },
  "ko_정도_110": {
    "title": "~정도 [jeongdo] (About, Approximately)",
    "shortExplanation": "Dùng để diễn tả an approximate quantity, degree, or extent; 'about', 'approximately'.",
    "longExplanation": "'~정도 [jeongdo]' is a particle used trong tiếng Hàn to indicate an approximation of a quantity, amount, degree, or level. It conveys a sense of estimation similar to 'about' or 'approximately' trong câu, and it is commonly used when the exact figure is unknown or when giving a rough idea.",
    "formation": "Danh từ + (Approximate Quantity/Amount) + 정도"
  },
  "ko_제_111": {
    "title": "~제 [je] (Although, even if)",
    "shortExplanation": "Dùng để diễn tả 'although' or 'even if'. It signifies that despite the preceding condition, the outcome differs from what is expected.",
    "longExplanation": "'~제 [je]' is a conjunction used trong tiếng Hàn to express contrasting or unexpected outcomes. It is similar in meaning to 'although,' 'even if,' or 'even though' trong câu and functions much like '-지만' but is used in more formal or polite contexts.",
    "formation": "Danh từ/Tính từ + ~제"
  },
  "ko_조차_112": {
    "title": "~조차 [jocha] (Even)",
    "shortExplanation": "Diễn tả 'even' or 'to the extent that', reinforcing a strong emphasis or unexpected inclusion.",
    "longExplanation": "'~조차 [jocha]' is used trong tiếng Hàn to stress that something is included to an extreme degree or under surprising circumstances. It often conveys a sense of unexpectedness or limits reached.",
    "formation": "Danh từ + 조차"
  },
  "ko_존재하다_113": {
    "title": "~존재하다 [jonjaehada] (To exist)",
    "shortExplanation": "'존재하다' is Dùng để diễn tả the existence or presence of someone or something.",
    "longExplanation": "'존재하다 [jonjaehada]' is a Korean verb that Biểu thị that someone or something exists or is present. It can be used for concrete objects, people, or even abstract concepts like hope, ideas, or problems. In its present form, it becomes '존재해요.'",
    "formation": "(Danh từ/Chủ ngữ) + 존재하다"
  },
  "ko_줄_114": {
    "title": "~줄 알다 [jul alda] (Thought that)",
    "shortExplanation": "'~줄 알다' is Dùng để diễn tả an assumption or expectation that turns out to be incorrect.",
    "longExplanation": "'~줄 알다' is a Korean grammar pattern used when the speaker assumed or expected something to be a certain way, only to find that the reality was different. It is often translated as 'I thought that...' and conveys a sense of surprise or disappointment when the expectation does not match the outcome.",
    "formation": "Động từ/Tính từ + 줄 알다"
  },
  "ko_즉시_115": {
    "title": "~즉시 [jeukshi] (Immediately, at once)",
    "shortExplanation": "Dùng để biểu thị that something happens immediately or without delay.",
    "longExplanation": "'~즉시 [jeukshi]' is an adverb trong tiếng Hàn Dùng để diễn tả that an action occurs immediately after a preceding event. It emphasizes the immediacy of the subsequent action, similar to 'as soon as' or 'the moment' trong câu.",
    "formation": "Động từ + (으)ㄹ/ㄴ + 즉시"
  },
  "ko_지_116": {
    "title": "~지 않다 [ji anta] (Negative form)",
    "shortExplanation": "Negates the action implied by the verb; equivalent to 'not' trong câu.",
    "longExplanation": "The grammar point '~지 않다 [ji anta]' is the standard and polite way to convert a verb into its negative form trong tiếng Hàn. By attaching '지 않다' to the verb stem, it changes the meaning to indicate that the action is not performed. This form is commonly used in both formal and casual contexts.",
    "formation": "Động từ-stem + 지 않다"
  },
  "ko_지_117": {
    "title": "~지 않아도 되다 [ji anado dweda] (Do not have to)",
    "shortExplanation": "Biểu thị that something does not have to be done or is not necessary.",
    "longExplanation": "'~지 않아도 되다 [ji anado dweda]' is used when you want to express that there is no obligation or necessity to do something. It emphasizes the optional nature of an action or state.",
    "formation": "Động từ stem + 지 않아도 되다"
  },
  "ko_지만_119": {
    "title": "~지만 [jimyeon] (But, however)",
    "shortExplanation": "Dùng để diễn tả contrast or contradiction; 'but', 'however'.",
    "longExplanation": "'~지만 [jimyeon]' is a conjunction used trong tiếng Hàn to connect two clauses where the second clause presents a contrast or unexpected result compared to the first. It is similar to 'but' or 'however' trong câu.",
    "formation": "Động từ stem + 지만"
  },
  "ko_지요_120": {
    "title": "~지요 [jiyo] (~right?, isn't it?)",
    "shortExplanation": "Used to echo or affirm the argument; '~right?', 'isn't it?'.",
    "longExplanation": "The ending '~지요 [jiyo]' is used trong tiếng Hàn to echo or affirm the statement preceding it. This is similar to English phrases like 'right?' or 'isn't it?'. The speaker uses this ending to seek agreement or affirmation from the listener. It is usually used in declarative or interrogative sentences and can be used in both formal and informal contexts.",
    "formation": "Stem verb/adjective + 지요"
  },
  "ko_진_121": {
    "title": "~진 않다 [jin anta] (Not really)",
    "shortExplanation": "This pattern is used when something is not exactly or not demonstrably true.",
    "longExplanation": "The ~진 않다 [jin anta] form is used when describing a condition or situation that is not fully or exactly as described by the preceding adjective or verb. It is equivalent to the English expressions 'not really', 'not quite', 'not necessarily', or 'not exactly'. The level of negation is softer than the standard negative form and is often used when the speaker does not want to fully agree or disagree.",
    "formation": "Tính từ/Động từ stem + 진 않다"
  },
  "ko_처럼_122": {
    "title": "~처럼 [cheoreom] (Like, as if)",
    "shortExplanation": "Dùng để diễn tả similarities or comparisons; 'like', 'as if'.",
    "longExplanation": "'~처럼 [cheoreom]' is a postposition Dùng để biểu thị that something is similar to or behaves in the same manner as the mentioned subject or object. It conveys a sense of comparison or simile, similar to 'like' or 'as if' trong câu.",
    "formation": "Danh từ/Động từ + 처럼"
  },
  "ko_아서어서_123": {
    "title": "~아서/어서 [aseo/eoseo] (So, therefore)",
    "shortExplanation": "Used to connect two clauses and show that the second clause is the result of the first; 'so', 'therefore'.",
    "longExplanation": "The ending '-아서/어서' is used trong tiếng Hàn to express cause and effect. It connects two clauses in a sentence where the second clause is the result or effect of what is described in the first clause. It is often translated as 'so' or 'therefore' trong câu, conveying a sense of consequence or reason.",
    "formation": "Động từ stem + 아/어서"
  },
  "ko_것_124": {
    "title": "~것 같다 [geot gatda] (Seems like)",
    "shortExplanation": "Diễn tả the speaker's guess or inference about a situation based on some evidence.",
    "longExplanation": "The construction '~것 같다' is used trong tiếng Hàn to express a guess or inference about a situation. The speaker uses it when they have some evidence or basis for their inference, even if the situation is not directly observable. It is equivalent to saying 'seems like' or 'appears to be' trong câu.",
    "formation": "Động từ/Tính từ stem + (으)ㄴ/는 + 것 같(아요)"
  },
  "ko_커녕_125": {
    "title": "~커녕 [keonyeong] (Let alone, far from)",
    "shortExplanation": "Dùng để diễn tả an idea contrary to expectation; 'let alone', 'far from'.",
    "longExplanation": "'~커녕 [keonyeong]' is a connector used trong tiếng Hàn to indicate that a certain expectation is not met—in fact, the reality is far from that expectation. It is often translated as 'let alone' or 'far from' trong câu and is used when one thing is not done, let alone something even more unlikely or difficult.",
    "formation": "Danh từ or clause + 커녕"
  },
  "ko_게_126": {
    "title": "~게 되다 [ge gatda] (Become, end up)",
    "shortExplanation": "Means 'to become' or 'to end up' and is Dùng để diễn tả the result of a change or transformation.",
    "longExplanation": "The construction '~게 되다' is used trong tiếng Hàn to indicate the end result of a change or transformation, often due to certain circumstances beyond the speaker's control. It is comparable to saying 'to become', 'to get', or 'to end up' trong câu.",
    "formation": "Động từ or adjective stem + 게 되다"
  },
  "ko_게_127": {
    "title": "~게 하다 [ge hada] (Make)",
    "shortExplanation": "Dùng để diễn tả causing someone or something to be in a certain state.",
    "longExplanation": "'~게 하다' is a grammatical construction trong tiếng Hàn that means to make or cause someone or something to be in a particular state. It is used with descriptive verbs (or adjectives) to indicate a change in state. This is similar to the English verb 'make' or the phrase 'cause to be.'",
    "formation": "Descriptive verb (or adjective) stem + 하게 하다"
  },
  "ko_게_128": {
    "title": "~게 하다 [ge hada] (To make someone do something)",
    "shortExplanation": "Dùng để biểu thị causing someone or something to perform an action.",
    "longExplanation": "'~게 하다' is Dùng để diễn tả the act of making or causing someone to do something. It is typically used with nouns or action verb stems to show that one party induces or forces another to take an action. This is similar to saying 'make (someone) do' trong câu.",
    "formation": "Danh từ/Action Động từ stem + (으)게 하다"
  },
  "ko_키가_129": {
    "title": "~키가 크다/작다 [kiga keuda/jakda] (To be tall/short)",
    "shortExplanation": "Expressions used to describe a person’s height, literally meaning 'big in size' (tall) and 'small in size' (short).",
    "longExplanation": "'키가 크다 [kiga keuda]' and '키가 작다 [kiga jakda]' are simple expressions trong tiếng Hàn Dùng để biểu thị the height of a person. '키가 크다' describes someone as tall, while '키가 작다' Biểu thị someone is short. These expressions directly refer to physical characteristics, specifically height.",
    "formation": "Danh từ + 키가 크다 / 키가 작다"
  },
  "ko_키로_130": {
    "title": "~키로 [kiro] (By means of, with)",
    "shortExplanation": "Dùng để diễn tả the method, means, or instrument by which an action is performed.",
    "longExplanation": "'~키로' is a grammatical marker trong tiếng Hàn that Biểu thị the tool, means, or method by which an action is carried out. It is similar to the English phrases 'by means of' or 'with' and provides additional information about how something is done.",
    "formation": "Động từ stem (without ‘다’) + 키로"
  },
  "ko_타다_131": {
    "title": "~타다 [tada] (To take, ride)",
    "shortExplanation": "Dùng để diễn tả the action of taking or riding a mode of transportation.",
    "longExplanation": "'~타다' is a verb used trong tiếng Hàn to indicate the action of taking or riding transportation (such as a bus, train, taxi, or bicycle) or using mechanical/electronic devices. It is typically attached to a noun that Biểu thị the type of transport or device.",
    "formation": "Danh từ indicating transport or mechanical device + ~타다"
  },
  "ko_테니까_132": {
    "title": "~테니까 [tenikka] (Because)",
    "shortExplanation": "Used to explain the reason or cause of an action or state.",
    "longExplanation": "The form '~테니까' is used trong tiếng Hàn to express 'because.' It clarifies the reason for a situation, behavior, or outcome. The clause before '~테니까' usually contains known or unimportant information, while the important or new information follows. This pattern emphasizes a strong cause–effect relationship compared to the simpler '~서' pattern.",
    "formation": "Động từ Stem + 테니까"
  },
  "ko_토록_133": {
    "title": "~토록 [torok] (So that, to the extent that)",
    "shortExplanation": "Dùng để diễn tả 'so that' or 'to the extent that'.",
    "longExplanation": "'~토록' is a postposition Dùng để biểu thị a degree or condition that compels a certain result or action. It is synonymous with 'so that' or 'to the extent that' trong câu and is often used to emphasize a high degree or strong cause–effect relationship.",
    "formation": "Động từ/Tính từ + 토록 (inserted within the sentence)"
  },
  "ko_하게_134": {
    "title": "~하게 되다 [hage dweda] (End up doing)",
    "shortExplanation": "Dùng để diễn tả that something happens as a result of circumstances, often beyond one’s control.",
    "longExplanation": "'~하게 되다' is a verb ending trong tiếng Hàn that Biểu thị an action or state that comes about unexpectedly or unintentionally as a result of circumstances. It often implies that the result was not planned and may evoke a sense of surprise or resignation.",
    "formation": "Động từ-아/어/해 + 하게 되다"
  },
  "ko_하고_135": {
    "title": "~하고 있다 [hago itda] (Is doing)",
    "shortExplanation": "Used to describe a continuous or ongoing action.",
    "longExplanation": "'~하고 있다' is a grammar pattern used trong tiếng Hàn to express an ongoing action or a state that continues to exist. It is equivalent to the English 'is doing' or 'am/are doing'. This form focuses on the progression of the action, not on its result or completion.",
    "formation": "Động từ stem + ~하고 있다"
  },
  "ko_하고_136": {
    "title": "~하고 나서 [hago naseo] (After doing)",
    "shortExplanation": "Dùng để diễn tả sequence of actions; 'after doing'.",
    "longExplanation": "'~하고 나서 [hago naseo]' is a sentence pattern trong tiếng Hàn that means 'after doing something'. It is Dùng để biểu thị that one action is completed before the next action takes place. The sequence is crucial, as the latter action happens only after the first is finished.",
    "formation": "Động từ stem + 하고 나서 + (subsequent clause)"
  },
  "ko_하고_137": {
    "title": "~하고 싶다 [hago sipda] (Want to do)",
    "shortExplanation": "Diễn tả a desire to perform a certain action.",
    "longExplanation": "'~하고 싶다 [hago sipda]' is a verb ending trong tiếng Hàn that Biểu thị the speaker's desire or wish to perform a certain action. It is equivalent to 'want to do something' trong câu and is commonly Dùng để diễn tả personal wishes or plans.",
    "formation": "Động từ stem + 하고 싶다"
  },
  "ko_하기로_138": {
    "title": "~하기로 하다 [hakiro hada] (Decide to do)",
    "shortExplanation": "Dùng để biểu thị that a decision about doing something has been made.",
    "longExplanation": "'하기로 하다' is used when you want to express that a decision to do something has been made. It can be a personal decision or a mutual decision made by a group. It translates to 'decide to do' trong câu, with the action indicated by the attached verb.",
    "formation": "Động từ (stem) + 기로 하다"
  },
  "ko_하기는_139": {
    "title": "~하기는 하다 [hakineun hada] (Do to some extent)",
    "shortExplanation": "Used to admit that something is done to some degree, but not fully or enthusiastically.",
    "longExplanation": "~하기는 하다 is a Korean grammar point used when someone does do something, but not completely, regularly, or with enthusiasm. It shows that an action occurs but implies some limit or deficiency in how ideally it is done.",
    "formation": "Động từ-기 + 는 + 하다"
  },
  "ko_하기보다_140": {
    "title": "~하기보다 [hakiboda] (Rather than doing)",
    "shortExplanation": "Dùng để diễn tả preference or a better option; 'rather than'.",
    "longExplanation": "'~하기보다' is a grammar point Dùng để biểu thị that one option is preferred over another. It is equivalent to 'rather than' trong câu and compares two alternatives to Diễn tả speaker's preference.",
    "formation": "Động từ + 기보다 + (alternative action)"
  },
  "ko_하나_141": {
    "title": "~하나 [hana] (But, however)",
    "shortExplanation": "Dùng để diễn tả contrast or contradiction, similar to 'but' or 'however' trong câu.",
    "longExplanation": "'~하나' is a conjunction often used trong tiếng Hàn to indicate a contrast or contradiction between two ideas or situations. It introduces a contrary point of view or an exception to a previous statement, much like 'but' or 'however' trong câu.",
    "formation": "Mệnh đề + 하나 + Contrasting clause"
  },
  "ko_하면_142": {
    "title": "~하면 할수록 [hamyeon halsurok] (The more... the more)",
    "shortExplanation": "Dùng để diễn tả a proportional increase or decrease; 'the more... the more'.",
    "longExplanation": "'~하면 할수록' is a grammar structure used trong tiếng Hàn to illustrate that as one action or state increases (or decreases), another does so in proportion. It is similar to the English expression 'the more... the more'.",
    "formation": "Động từ (or adjective) + 하면 할수록"
  },
  "ko_Expressing_0": {
    "title": "Expressing Cause/Reason (~니까/아서/어서/으니)",
    "shortExplanation": "Dùng để diễn tả the reason or cause; 'because', 'since'.",
    "longExplanation": "trong tiếng Hàn, various grammatical patterns such as ~니까, ~아서/어서, and ~으니 are Dùng để biểu thị the cause or reason for an action or situation. They are equivalent to 'because' or 'since' trong câu and are used to logically connect two clauses. They can be used in both positive and negative contexts.",
    "formation": "Động từ stem + (으)니까 / (으)아서/어서 / (으)니"
  },
  "ko_남짓_1": {
    "title": "~남짓 [namjit] (About, or so)",
    "shortExplanation": "Used to mean 'about' or 'approximately' when expressing quantities, amounts, or time.",
    "longExplanation": "~남짓 is a Korean grammar point Dùng để biểu thị an approximate amount, quantity, or duration. It is equivalent to 'about' or 'approximately' trong câu and is used when providing an estimation rather than an exact figure.",
    "formation": "Quantity/Amount + 남짓"
  },
  "ko_내내_2": {
    "title": "~내내 [naenae] (Throughout, the whole time)",
    "shortExplanation": "Dùng để diễn tả something that continues throughout a specific period of time.",
    "longExplanation": "~내내 is a compound particle that Biểu thị an action or situation lasted for the entire duration of a specific period. It emphasizes continuity.",
    "formation": "Danh từ + 내내"
  },
  "ko_네요_3": {
    "title": "~네요 [neyo] (Expressing surprise)",
    "shortExplanation": "Dùng để diễn tả surprise, new realizations, or sudden changes.",
    "longExplanation": "~네요 is added to the stem of a verb or adjective to convey the speaker's surprise, realization, or a sudden change in circumstances. It Diễn tả the speaker's impression or sentiment about a situation.",
    "formation": "Động từ/Tính từ stem + 네요"
  },
  "ko_노릇이다_4": {
    "title": "~노릇이다 [noreusida] (Act as, function as)",
    "shortExplanation": "Used to describe someone or something acting or functioning as another role or duty.",
    "longExplanation": "~노릇이다 is used when someone or something takes on a role or duty that is not their primary one, often unexpectedly or due to circumstances. It carries the nuance of having to assume responsibilities not originally one's own.",
    "formation": "Danh từ + 노릇이다"
  },
  "ko_느라고_5": {
    "title": "~느라고 [neurago] (Because of being occupied with)",
    "shortExplanation": "Dùng để diễn tả that someone is so busy with one action that it prevents or hinders another, often resulting in a negative consequence.",
    "longExplanation": "~느라고 is Dùng để biểu thị that an action or situation is taking up so much time or energy that it results in an undesired consequence, such as neglecting another activity. It Diễn tả a cause-effect relationship with a sense of regret or inconvenience.",
    "formation": "Động từ stem + 느라(고) (after removing ‘다’)"
  },
  "ko_는데다가_6": {
    "title": "~는데다가 [neundedaga] (Moreover, furthermore)",
    "shortExplanation": "Used to add additional information or to emphasize a point; 'moreover', 'furthermore'.",
    "longExplanation": "~는데다가 is a conjunctive expression used to add extra information or emphasize a detail in a sentence. It builds on previous statements by providing another reason or detail.",
    "formation": "Động từ/Tính từ + 는데다가"
  },
  "ko_는측에서_7": {
    "title": "~는측에서 [neuncheugeseo] (From the perspective of)",
    "shortExplanation": "Dùng để diễn tả 'from the standpoint of' or 'from the perspective of'.",
    "longExplanation": "The suffix ~는측에서 is Dùng để biểu thị a particular viewpoint or perspective from which something is evaluated or observed. It is often used to present opinions or judgments from a specific standpoint.",
    "formation": "Danh từ + 는측에서"
  },
  "ko_더라도_8": {
    "title": "~더라도 [deorado] (Even if, even though)",
    "shortExplanation": "Dùng để diễn tả a conditional statement meaning 'even if' or 'even though'.",
    "longExplanation": "The pattern ~더라도 is used to present a condition that might be contrary to what is expected. It Biểu thị that even if a certain condition holds, the outcome remains unchanged or is unsatisfactory.",
    "formation": "Động từ stem + 더라도 (or Tính từ/Danh từ + 라도)"
  },
  "ko_다니_9": {
    "title": "~다니 [dani] (Expressing disbelief)",
    "shortExplanation": "Dùng để diễn tả surprise, doubt, or disbelief regarding a particular situation or piece of information.",
    "longExplanation": "~다니 is attached to the end of a sentence or clause to convey the speaker's disbelief, shock, or doubt about something they have just heard or observed.",
    "formation": "Động từ-기다니 / Tính từ-다니 / Danh từ이다니"
  },
  "ko_답게_10": {
    "title": "~답게 [dapge] (As befitting, like)",
    "shortExplanation": "Dùng để diễn tả the meaning of 'as befitting' or 'like', highlighting the natural or expected characteristic or behavior of someone or something.",
    "longExplanation": "The '~답게' pattern follows a noun to mean 'as is fitting for' or 'in a manner characteristic of'. It emphasizes the inherent qualities or typical behavior one would expect, and is used to comment on the natural characteristics of people or things.",
    "formation": "Danh từ + 답게"
  },
  "ko_대로_11": {
    "title": "~대로 [daero] (As per, following)",
    "shortExplanation": "Dùng để diễn tả doing something in accordance with or following something else.",
    "longExplanation": "The grammar point '~대로' is used when an action is performed exactly as indicated by a rule, instruction, or example. It is similar to the English expressions 'as per', 'according to', or 'following'.",
    "formation": "Danh từ or Động từ stem + 대로"
  },
  "ko_던데_12": {
    "title": "~던데 [deonde] (Used to, before)",
    "shortExplanation": "Dùng để diễn tả that something was the case or happened in the past, often to introduce contrasting or unexpected information.",
    "longExplanation": "The '~던데' pattern is attached to a verb to indicate that something used to happen or be the case, often implying a change or contrast with the present. It is used to recall past conditions or behaviors and can be translated as 'used to' or 'before'.",
    "formation": "Động từ + 던데"
  },
  "ko_도록_13": {
    "title": "~도록 하다 [dorok hada] (Make sure that, ensure that)",
    "shortExplanation": "Dùng để diễn tả a commitment or directive to make sure that something happens.",
    "longExplanation": "The '~도록 하다' construction is Dùng để biểu thị that the speaker intends to make something occur or wants someone to ensure a specific result. It is similar to saying 'make sure that' or 'ensure that' trong câu.",
    "formation": "Động từ stem + (으)도록 하다"
  },
  "ko_라든지_14": {
    "title": "~라든지 ~라든지 [radenji radenji] (Either or)",
    "shortExplanation": "Used to list alternative options or possibilities without specifying a single choice.",
    "longExplanation": "The '~라든지 ~라든지' pattern is used to list alternative options or possibilities, implying that any one of the mentioned items could be chosen. It is similar to 'either or' trong câu, used when the speaker does not wish to specify a particular option.",
    "formation": "Danh từ/Động từ + 라든지 + Danh từ/Động từ + 라든지"
  },
  "ko_려고_15": {
    "title": "~려고 하다 [ryeogo hada] (Try to)",
    "shortExplanation": "Dùng để diễn tả an intention or plan to do something.",
    "longExplanation": "The '~려고 하다' structure is commonly Dùng để biểu thị that someone intends, plans, or attempts to do something. It is equivalent to the English phrases 'plan to', 'intend to', or 'try to'.",
    "formation": "Động từ stem + -려고 하다"
  },
  "ko_만이_16": {
    "title": "~만이 아니다 [mani anida] (Not only)",
    "shortExplanation": "Dùng để biểu thị that the preceding clause is not the only reason or factor; 'not only'.",
    "longExplanation": "The '~만이 아니다' pattern is Dùng để diễn tả that something is not solely due to one reason, suggesting that additional factors or elements are involved. It is similar to 'not only' trong câu, highlighting that there is more than one contributing aspect.",
    "formation": "Danh từ + 만이 아니다"
  },
  "ko_마련이다_17": {
    "title": "~마련이다 [maryeonida] (Bound to, tend to)",
    "shortExplanation": "Dùng để diễn tả that something is bound to happen or that a situation naturally tends to be a certain way.",
    "longExplanation": "The expression '마련이다' is used to talk about an inevitability or a fact of life—something that is expected to occur given the nature or circumstances. It often carries a nuance of resignation or acceptance and is similar to the English expressions 'bound to' or 'tend to'.",
    "formation": "Danh từ + 이/가 + 마련이다"
  },
  "ko_면서_18": {
    "title": "~면서 [myeonseo] (While)",
    "shortExplanation": "Dùng để diễn tả two concurrent actions or states; 'while' or 'as'.",
    "longExplanation": "'~면서' is a grammatical structure Dùng để biểu thị that two actions or states occur simultaneously. It carries the same meaning as 'while' or 'as' trong câu and is used when the same subject is performing both actions.",
    "formation": "Động từ Stem + 면서"
  },
  "ko_동안_19": {
    "title": "~동안 [dongan] (During/While)",
    "shortExplanation": "Dùng để diễn tả the duration of an action or situation.",
    "longExplanation": "'~동안' Biểu thị the time span during which an action or situation occurs. It typically translates to 'during' or 'while' trong câu and is useful for describing ongoing actions over a period of time.",
    "formation": "Danh từ (indicating time) + 동안 / Động từ + 동안"
  },
  "ko_부터는_20": {
    "title": "~부터는 [buteoneun] (From now on, since)",
    "shortExplanation": "Dùng để diễn tả a change starting from a specific point in time; 'from now on', 'since', or 'after'.",
    "longExplanation": "'~부터는' is a time-based postposition that marks the point from which a change occurs or a new condition starts. It can refer to events in the past, present, or future and signals that things will continue or change from that point onward.",
    "formation": "Danh từ (Time/Event) + 부터는"
  },
  "ko_서야_21": {
    "title": "~서야 [seoya] (Only after)",
    "shortExplanation": "Dùng để diễn tả that only after doing A can B be done, emphasizing the sequential order of events.",
    "longExplanation": "'~서야' is Dùng để biểu thị that the second action or condition can occur only after the first has been completed. It stresses that without fulfilling the prerequisite, the following action is impossible—much like saying 'only after' trong câu.",
    "formation": "Động từ Stem + 서야"
  },
  "ko_소문에는_22": {
    "title": "~소문에는 [somuneneun] (I heard that)",
    "shortExplanation": "Used to convey a hearsay or rumor that the speaker has heard.",
    "longExplanation": "The '~소문에는' construction is used when the speaker wants to indicate that something has been heard as a rumor or hearsay. It does not Diễn tả speaker’s own opinion but relays what is commonly talked about.",
    "formation": "Danh từ + 이/가 + ~소문에는"
  },
  "ko_아어_23": {
    "title": "~아/어 보이다 [a/eo boida] (To seem, appear)",
    "shortExplanation": "Dùng để diễn tả that someone or something seems or appears a certain way, based on the speaker’s perception.",
    "longExplanation": "The grammar point '~아/어 보이다' is used trong tiếng Hàn to convey the speaker’s judgment or perception about someone or something. The verb or adjective before '~아/어 보이다' is conjugated according to its final vowel, and the expression is equivalent to 'seem', 'appear', or 'look like' trong câu.",
    "formation": "Động từ or Tính từ + 아/어 보이다"
  },
  "ko_아어야지_24": {
    "title": "~아/어야지 [a/eoyaji] (I should, I better)",
    "shortExplanation": "Dùng để diễn tả the speaker's determination or intention; 'I should' or 'I better'.",
    "longExplanation": "‘~아/어야지’ is a Korean grammar point Dùng để diễn tả the speaker’s determination or intention. It conveys that the speaker feels they should do something or had better do it. It is often used when making a self-suggestion or deciding to take a certain action in the future, and sometimes used rhetorically to encourage oneself.",
    "formation": "Động từ stem + 아/어야지 (if the stem ends in ㅏ or ㅗ, use 아야지; otherwise, use 어야지)"
  },
  "ko_았었다_25": {
    "title": "~았/었다 치다 [at/eotda chida] (Let’s say, suppose)",
    "shortExplanation": "Diễn tả a hypothetical situation, equivalent to 'let's say' or 'suppose'.",
    "longExplanation": "‘~았/었다 치다’ is used to propose a hypothetical situation or condition. It is equivalent to saying 'let’s say' or 'suppose' trong câu, setting up an assumed scenario for discussion. This expression is often used to analyze possible outcomes or to plan by exploring various scenarios.",
    "formation": "Động từ stem + 았/었다 + 치다"
  },
  "ko_았었던_26": {
    "title": "~았/었던 것 같다 [at/eotdeon geot gatda] (It seemed that)",
    "shortExplanation": "Dùng để diễn tả that something appeared or seemed a certain way in the past.",
    "longExplanation": "‘~았/었던 것 같다’ is Dùng để diễn tả a speaker’s vague recollection or speculation about a past event. Có thể dịch là 'it seemed that', 'it looked as if', or 'I think that', often indicating uncertainty or a vague impression.",
    "formation": "Động từ in past tense + ~았/었던 것 같다"
  },
  "ko_았었어야_27": {
    "title": "~았/었어야 했다 [at/eosseoya haetda] (Should have)",
    "shortExplanation": "Diễn tả regret over something in the past that should have been done but wasn't.",
    "longExplanation": "‘~았/었어야 했다’ is Dùng để diễn tả regret or a sense of missed opportunity about a past action. It is equivalent to 'should have' trong câu and reflects on an action that did not occur but would have been appropriate or beneficial if it had.",
    "formation": "Động từ stem + 았/었어야 했다"
  },
  "ko_어아_28": {
    "title": "~어/아 가다 [eo/a gada] (While doing)",
    "shortExplanation": "Describes an action that is ongoing or a process that continues over time.",
    "longExplanation": "‘~어/아 가다’ is Dùng để biểu thị that an action started in the past is continuing into the present or future. Có thể dịch là 'while doing' or 'gradually' and is used to emphasize a process or change over time.",
    "formation": "Động từ stem + 아/어 가다"
  },
  "ko_어아_29": {
    "title": "~어/아 달라다 [eo/a dallada] (To ask to do)",
    "shortExplanation": "Used to request someone to do something, often in a formal or polite manner.",
    "longExplanation": "‘~어/아 달라다’ is Dùng để diễn tả a request for someone to perform an action. This form is typically employed in indirect or reported requests – usually followed by the quotation marker ‘-라고’ – and is most appropriate in formal or respectful contexts.",
    "formation": "Động từ stem + 어/아 달라다 (with appropriate vowel harmony; in reported speech, it becomes 달라고)"
  },
  "ko_어아_30": {
    "title": "~어/아 다니다 [eo/a danida] (To attend, to go regularly)",
    "shortExplanation": "Dùng để biểu thị habitual or regular attendance/visiting of a place.",
    "longExplanation": "‘~어/아 다니다’ is Dùng để diễn tả that someone regularly attends or visits a place, such as a school, workplace, or other location. It conveys the idea of a habitual or routine action.",
    "formation": "Typically used with place-related verbs (e.g., 학교에 다니다, 도서관에 다니다)"
  },
  "ko_어아_31": {
    "title": "~어/아 두다 [eo/a duda] (To leave something as is, to do in advance)",
    "shortExplanation": "Dùng để biểu thị that an action is performed and its resulting state is maintained or preserved for future reference.",
    "longExplanation": "‘~어/아 두다’ is Dùng để diễn tả that an action has been performed so that its result remains unchanged. It often implies preparing something in advance or leaving something in a particular state for later use.",
    "formation": "Động từ stem + 어/아 두다"
  },
  "ko_어아_32": {
    "title": "~어/아 들다 [eo/a deulda] (Suddenly start to)",
    "shortExplanation": "Used mainly in narrative contexts to indicate a sudden or unexpected onset of an action or state.",
    "longExplanation": "‘~어/아 들다’ is a grammatical structure used trong tiếng Hàn storytelling to express that an action or emotion began abruptly or unintentionally. Often marked by a contrasting clause with ‘들더니’, it conveys a sudden change. Note that this form is less common in everyday conversation than '~기 시작하다'.",
    "formation": "Động từ stem + 어/아 들다 (use 아 if the stem ends in ㅏ or ㅗ; otherwise, use 어)"
  },
  "ko_어아_33": {
    "title": "~어/아 버리다 [eo/a beorida] (To end up doing, regrettably)",
    "shortExplanation": "Diễn tả an action that was completed—often unexpectedly or with regret.",
    "longExplanation": "‘~어/아 버리다’ is used trong tiếng Hàn to indicate that an action has been carried out completely, sometimes conveying a sense of regret, loss, or unintended finality. It emphasizes that something happened in its entirety, often in a way that the speaker wishes it hadn’t.",
    "formation": "Động từ stem + 어/아 버리다"
  },
  "ko_어아_34": {
    "title": "~어/아 보다 [eo/a boda] (To try doing)",
    "shortExplanation": "Used when the speaker Diễn tả the intention of trying to do something.",
    "longExplanation": "'~어/아 보다' is Dùng để biểu thị an attempt or trial of an action. The verb preceding '보다' shows what is being attempted, while the overall tense of the sentence is determined by the form of '보다'. It hints at testing an action to see what happens.",
    "formation": "Động từ stem + 아/어 + 보다"
  },
  "ko_고_35": {
    "title": "~고 나서 [go naseo] (After doing)",
    "shortExplanation": "Biểu thị that after one action is completed, another action follows naturally.",
    "longExplanation": "The expression '~고 나서' is Dùng để chỉ ra a sequence of events—once action A is completed, action B takes place. It conveys that the completion of the first action sets the stage for what comes next.",
    "formation": "Động từ stem + 고 나서"
  },
  "ko_어아_36": {
    "title": "~어/아 오다 [eo/a oda] (To come to do)",
    "shortExplanation": "Diễn tả a gradual change or process that has accumulated over time.",
    "longExplanation": "‘~어/아 오다’ is Dùng để biểu thị that a change or development has been coming about gradually. It is often attached to an action verb to show that, over time, a new state has been reached—frequently with a nuance of unexpectedness.",
    "formation": "Động từ stem + 어/아 오다"
  },
  "ko_어아지다_37": {
    "title": "~어/아지다 [eo/ajida] (Become)",
    "shortExplanation": "Dùng để diễn tả change or transformation; essentially, 'become'.",
    "longExplanation": "‘~어/아지다’ is attached to descriptive verbs (adjectives) to indicate that something has changed or transformed into a new state. The form ‘~어지다’ is used if the stem ends in a vowel, and ‘~아지다’ is used if it ends in a consonant.",
    "formation": "Descriptive verb stem + 어/아지다"
  },
  "ko_었으면_38": {
    "title": "~었으면 좋겠다 [eosseumyeon jotgetda] (I wish it was/were)",
    "shortExplanation": "Diễn tả a wish or desire for something that did not happen or is unreal.",
    "longExplanation": "‘~었으면 좋겠다’ is Dùng để diễn tả a wish or regret regarding an unfulfilled or unreal situation. It can convey a longing for a different outcome—whether about the past, present, or future.",
    "formation": "Động từ (아/어/여) + 었으면 좋겠다"
  },
  "ko_에_39": {
    "title": "~에 한하다 [e hanhada] (Limited to)",
    "shortExplanation": "Biểu thị that something is applicable only under a certain condition or case.",
    "longExplanation": "The pattern ‘~에 한하다’ is Dùng để diễn tả that a rule, offer, or situation applies exclusively to a specific case or condition. trong câu it is often translated as 'limited to' or 'applicable only to'.",
    "formation": "Danh từ + 에 한하다"
  },
  "ko_에_40": {
    "title": "~에 한해서 [e hanhaeseo] (Only in, limited to)",
    "shortExplanation": "Specifies that something is valid or available only under a particular condition or circumstance.",
    "longExplanation": "‘~에 한해서’ is Dùng để biểu thị that a rule, offer, or situation applies exclusively when a specific condition is met. It means 'only in' or 'limited to' the stated context, implying that it does not extend to other cases.",
    "formation": "Danh từ + 에 한해서"
  },
  "ko_에_41": {
    "title": "~에 힘쓰다 [e himsseuda] (Put effort into)",
    "shortExplanation": "Describes the act of putting a lot of effort into or striving for something.",
    "longExplanation": "‘~에 힘쓰다’ is Dùng để biểu thị that someone is dedicating significant effort toward achieving a goal or maintaining a state. Có thể dịch là 'to put effort into', 'to strive for', or 'to work hard for' a particular objective.",
    "formation": "Danh từ + 에 힘쓰다"
  },
  "ko_으나마나_42": {
    "title": "~으나마나 [eunamana] (It's no use, to no avail)",
    "shortExplanation": "Used to convey that an effort or expectation was in vain.",
    "longExplanation": "The grammar point '~으나마나' is used trong tiếng Hàn to express that an action or effort yielded no meaningful or positive result. It implies that no matter how much one does, the outcome remains unsatisfactory. This structure is generally used in negative contexts.",
    "formation": "Động từ-으나마나"
  },
  "ko_으니니까_43": {
    "title": "~으니/니까 [euni/nikka] (So, since, because)",
    "shortExplanation": "Diễn tả a reason or cause; similar to 'so', 'since', or 'because'.",
    "longExplanation": "'~으니/니까' is a conjunction used to denote a cause-and-effect relationship between two clauses. It provides a reason or explanation for the following statement and is widely used to justify why something happens.",
    "formation": "Động từ-으니/니까"
  },
  "ko_을_44": {
    "title": "~을 바탕으로 [eul batangeuro] (Based on)",
    "shortExplanation": "Biểu thị that something is done 'based on' or 'on the basis of' certain information.",
    "longExplanation": "'~을 바탕으로' is a postpositional phrase Dùng để diễn tả that an action or decision is founded on a particular fact, evidence, or experience. The noun preceding this expression serves as the basis for what follows.",
    "formation": "Danh từ + 을 바탕으로"
  },
  "ko_을_45": {
    "title": "~을 빼다 [eul ppaeda] (Except for)",
    "shortExplanation": "Diễn tả exclusion; meaning 'except for' or 'aside from'.",
    "longExplanation": "'~을 빼다' is used trong tiếng Hàn to exclude a particular item or group from a general statement. It specifies that while a general rule applies, there are exceptions.",
    "formation": "Danh từ + 을/를 빼다 + (rest of the sentence)"
  },
  "ko_을_46": {
    "title": "~을 사이 [eul sai] (Between)",
    "shortExplanation": "Dùng để diễn tả 'between' or 'among'.",
    "longExplanation": "'~을 사이' is Dùng để biểu thị that something is located between or among two or more items. It is most naturally used with two nouns, often connected with '과/와', to show a spatial or conceptual intermediate position.",
    "formation": "Noun1과(와) Noun2 사이(에)"
  },
  "ko_을_47": {
    "title": "~을 테니 [eul teni] (I assume/bet)",
    "shortExplanation": "Dùng để diễn tả a confident assumption or prediction about a future event.",
    "longExplanation": "The grammar point '~을 테니' is used to make a deduction or prediction based on available evidence. It Diễn tả the speaker’s confident guess about a result or outcome, usually followed by a consequent action or result.",
    "formation": "Động từ/Tính từ + 을 테니 + (result/consequence)"
  },
  "ko_을_48": {
    "title": "~을 통해 [eul tonghae] (Through, via)",
    "shortExplanation": "Diễn tả the means or method by which something is done.",
    "longExplanation": "The phrase '~을 통해' signifies the channel, method, or process by which an action is carried out. It is used after a noun to show that the following action occurs by way of or through that noun.",
    "formation": "Danh từ + 을 통해"
  },
  "ko_을를_49": {
    "title": "~을/를 틈타 [eul/reul teumta] (Taking advantage of, during)",
    "shortExplanation": "Describes using a spare moment or opportunity to do something.",
    "longExplanation": "'~을/를 틈타' is Dùng để biểu thị that someone takes advantage of a gap in time or an opportunity to perform an action. It implies doing something in the interim or making use of a favorable situation.",
    "formation": "Danh từ/Động từ stem + 을/를 틈타"
  },
  "ko_이기는_50": {
    "title": "~이기는 한데 [igineun hande] (Although, but)",
    "shortExplanation": "Biểu thị a contrast by acknowledging one fact while negating or limiting it with another.",
    "longExplanation": "'~이기는 한데' is used trong tiếng Hàn to show that while one part of a statement is true, the following part provides a contrasting or limiting remark. It is roughly equivalent to 'although' or 'but' trong câu.",
    "formation": "Động từ-기는 한데"
  },
  "ko_이나_51": {
    "title": "~이나 [ina] (Or something)",
    "shortExplanation": "Diễn tả uncertainty or gives approximate examples, similar to 'or something' or 'or so'.",
    "longExplanation": "'~이나' is a particle used trong tiếng Hàn to introduce alternatives or approximate examples when the speaker is not certain of the details or wants to imply that there are other possibilities.",
    "formation": "Danh từ + 이나"
  },
  "ko_이래_52": {
    "title": "~이래 [irae] (Since then, like this)",
    "shortExplanation": "Diễn tả that a state or action has continued from a past point until now, or describes the manner in which something is done.",
    "longExplanation": "'~이래' is used trong tiếng Hàn to indicate that a situation has continued from a specific point in the past to the present, or to describe how something is done. It is generally translated as 'since then' or 'like this' trong câu.",
    "formation": "Động từ Stem + (으)면서 이래 / Danh từ + 이래"
  },
  "ko_이러하다_53": {
    "title": "~이러하다 [ireohada] (Like this, such)",
    "shortExplanation": "Dùng để diễn tả 'like this' or 'such', indicating a certain state or condition.",
    "longExplanation": "'~이러하다' is a descriptive verb used trong tiếng Hàn to depict a specific state, condition, or characteristic. It is used to describe something that is 'like this' or 'in such a way'—often when directly observing or experiencing the subject.",
    "formation": "Chủ ngữ + 이러하다"
  },
  "ko_이리_54": {
    "title": "~이리 [iri] (This way, like this)",
    "shortExplanation": "Used to denote 'in this manner' or 'like this', often to illustrate the way something is done.",
    "longExplanation": "'~이리' is a Korean expression that Biểu thị a specific method or manner of doing something. It is equivalent to the English expressions 'like this', 'in this way', or 'in this manner' and is frequently used in everyday conversation.",
    "formation": "Động từ stem + 이리"
  },
  "ko_이미_55": {
    "title": "~이미 [imi] (Already)",
    "shortExplanation": "Dùng để diễn tả that an action has already been completed.",
    "longExplanation": "'~이미' is a particle used to denote that an action or event has already taken place. It functions similarly to the English adverb 'already' and is typically placed before the verb phrase to stress the completion of an action.",
    "formation": "이미 + Động từ"
  },
  "ko_인_56": {
    "title": "~인 바 [in ba] (Since, because it's the case that)",
    "shortExplanation": "Dùng để diễn tả 'since' or 'because it's the case that'.",
    "longExplanation": "'~인 바' is a formal grammar form used to provide a reason or cause for something. It is similar to saying 'since' or 'because it's the case that' trong câu and is most often found in written or formal contexts.",
    "formation": "Mệnh đề (with -인) + 바"
  },
  "ko_인_57": {
    "title": "~인 이상 [in isang] (As long as, since)",
    "shortExplanation": "Dùng để diễn tả 'as long as', 'since', or 'now that' a certain condition is met.",
    "longExplanation": "'~인 이상' sets a condition and implies that, because the condition is met, a corresponding result or action must follow. Có thể dịch là 'as long as', 'since', or 'now that' trong câu.",
    "formation": "Động từ + (으)ㄴ 이상"
  },
  "ko_인즉슨_58": {
    "title": "~인즉슨 [injeuksseun] (Which means, in other words)",
    "shortExplanation": "Means 'which implies that' or 'in other words', used to clarify a previous statement.",
    "longExplanation": "'~인즉슨' is used to restate or clarify the premise mentioned earlier. The following clause summarizes or explains the previous information and is equivalent to 'which means that', 'implying', or 'in other words' trong câu.",
    "formation": "Sentence + 인즉슨 + Explanation"
  },
  "ko_일_59": {
    "title": "~일 리가 없다 [il riga eopda] (Cannot be, it's not possible that)",
    "shortExplanation": "Diễn tả disbelief or denial, indicating that something is impossible.",
    "longExplanation": "'~일 리가 없다' is used to strongly deny or reject the possibility of a situation or action. It is often translated as 'there's no way that...', 'it cannot be that...', or 'it's impossible that...'.",
    "formation": "Động từ (dictionary form) + 일 리가 없다"
  },
  "ko_일수록_60": {
    "title": "~일수록 [ilsulok] (The more ~, the more ~)",
    "shortExplanation": "Dùng để diễn tả proportional relationships; 'the more ____, the more ____'.",
    "longExplanation": "The grammar point '~일수록' denotes a proportional relationship between two states or actions. It is used when an increase or decrease in one aspect leads to a corresponding change in another, translating to 'the more ____, the more ____' trong câu.",
    "formation": "Động từ/adjective stem + 일수록"
  },
  "ko_지_61": {
    "title": "~지 않을래 [ji anheullae] (I don't want to)",
    "shortExplanation": "Diễn tả the speaker's intention not to do something.",
    "longExplanation": "'~지 않을래' is a verb ending used trong tiếng Hàn to indicate that the speaker does not want to perform a certain action. It shows a strong personal decision and is typically used in informal contexts.",
    "formation": "Động từ stem + 지 않을래"
  },
  "ko_지만_62": {
    "title": "~지만 [jimyeon] (But, although)",
    "shortExplanation": "Dùng để diễn tả contrast or exception; 'but', 'although'.",
    "longExplanation": "'~지만' is a conjunction used trong tiếng Hàn to introduce a contrasting idea or an exception to the preceding statement. It is equivalent to 'but' or 'although' trong câu and simply connects two clauses without implying a strong adversative relationship.",
    "formation": "Động từ/Tính từ + 지만"
  },
  "ko_지_63": {
    "title": "~지 않다/지 못하다 [ji anhda/ji mothada] (Not, don't, can't)",
    "shortExplanation": "Dùng để diễn tả negation (do not) or inability (cannot).",
    "longExplanation": "'~지 않다' is Dùng để biểu thị that one does not or does not intend to perform an action, while '~지 못하다' Diễn tả an inability to perform an action. The former is used for intentional negation, and the latter when one is prevented or unable to do something.",
    "formation": "Động từ Stem + 지 않다 / Động từ Stem + 지 못하다"
  },
  "ko_지_64": {
    "title": "~지 얼마나 되다 [ji eolmana dweda] (How long has it been)",
    "shortExplanation": "Dùng để hỏi or state the duration since an event occurred.",
    "longExplanation": "'~지 얼마나 되다' is a construction used to inquire about or indicate the amount of time that has passed since a certain event took place. It literally asks 'how long has it been' and is useful when discussing past events or experiences.",
    "formation": "Động từ (in past tense) + 지 + 얼마나 되다"
  },
  "ko_지요죠_65": {
    "title": "~지요/죠 [jiyo/jyo] (Isn't it, right)",
    "shortExplanation": "Used at the end of a sentence to seek agreement or confirmation.",
    "longExplanation": "'~지요/죠' is an ending used trong tiếng Hàn to ask for confirmation or agreement from the listener. It suggests that the speaker expects the listener to share the same view or to confirm the statement, and it is often employed in polite or formal contexts.",
    "formation": "Động từ/Tính từ + 지요/죠"
  },
  "ko_쯤_66": {
    "title": "~쯤 [jjeum] (About, around)",
    "shortExplanation": "Dùng để biểu thị approximations or rough estimates.",
    "longExplanation": "'~쯤' is a postposition used trong tiếng Hàn to give an approximate amount, time, or degree. It is commonly paired with numbers or measurements to express 'about' or 'around' in informal speech.",
    "formation": "Number + Measure Word + 쯤"
  },
  "ko_처럼_67": {
    "title": "~처럼 [cheoreom] (Like, as)",
    "shortExplanation": "Dùng để diễn tả similarity or comparison; 'like', 'as'.",
    "longExplanation": "'~처럼' is used trong tiếng Hàn to compare or show similarity between two things. It Biểu thị that someone or something is similar in appearance, behavior, or quality to another.",
    "formation": "Danh từ + 처럼"
  },
  "ko_치고는_68": {
    "title": "~치고는 [chigoneun] (For, considering)",
    "shortExplanation": "Dùng để diễn tả a comparison against a standard; 'for' or 'considering'.",
    "longExplanation": "'~치고는' is a suffix used to compare a subject to what is normally expected of it. It Biểu thị that, considering the usual standards, the result is surprisingly good or bad. It is often translated as 'for (a ...)' or 'considering (that ...)' trong câu.",
    "formation": "Danh từ + ~치고는"
  },
  "ko_테니라고_69": {
    "title": "~테니라고 [tenirago] (Since, because)",
    "shortExplanation": "Dùng để biểu thị a reason or cause; 'since' or 'because'.",
    "longExplanation": "The form '~테니라고' in the provided entry is nonstandard in contemporary Korean. In modern usage the common and natural form is '~테니까'. This ending is used to give a reason or justification for a situation or action. I have changed all instances to '~테니까' so that the explanation and examples match current usage.",
    "formation": "Động từ/Tính từ + (으)ㄴ/은 테니까"
  },
  "ko_텐데_70": {
    "title": "~텐데 [tende] (Would, might)",
    "shortExplanation": "Dùng để diễn tả a hypothetical situation or expectation; 'would', 'might'.",
    "longExplanation": "'~텐데' is Dùng để diễn tả a hypothetical situation, expectation, assumption, or prediction. It Biểu thị that under certain conditions an action or state would or might occur. Often, it is used to imply a consequence if a condition were met.",
    "formation": "Động từ/adjective stem + 텐데"
  },
  "ko_토록_71": {
    "title": "~토록 [torok] (So ~ that, to the extent)",
    "shortExplanation": "Dùng để diễn tả the extent or degree of a condition or state.",
    "longExplanation": "'~토록' is Dùng để biểu thị the degree or extent of a situation, often to emphasize that something is so extreme or intense that it produces a particular result. Có thể dịch là 'so ... that' or 'to the extent that' trong câu.",
    "formation": "Động từ stem + 토록"
  },
  "ko_하게_72": {
    "title": "~하게 [hage] (Make, let)",
    "shortExplanation": "Dùng để biểu thị making or letting someone do something.",
    "longExplanation": "'~하게' is an ending attached to a verb root that shows someone is made to do something or is allowed to do something. It is commonly used when giving orders, making requests, or suggesting actions.",
    "formation": "Động từ root + -하게"
  },
  "ko_하고나서_73": {
    "title": "~하고나서 [hagonaseo] (After doing)",
    "shortExplanation": "Biểu thị that one action is completed before another begins.",
    "longExplanation": "'~하고나서' is Dùng để chỉ ra that one action is finished before starting the next. It Diễn tả a clear sequence where the first action must be completed before the subsequent action occurs.",
    "formation": "Động từ + 고나서"
  },
  "ko_하고는_74": {
    "title": "~하고는 [hagoneun] (And then, after)",
    "shortExplanation": "Connects sequential actions in chronological order.",
    "longExplanation": "'~하고는' is used to join two or more actions in the order in which they occur. It Biểu thị that the first action is followed by the second and is equivalent to 'and then' or 'after' trong câu.",
    "formation": "Động từ stem + 고는"
  },
  "ko_하구나_75": {
    "title": "~하구나 [haguna] (Oh, so it's)",
    "shortExplanation": "Diễn tả a sudden realization or understanding.",
    "longExplanation": "'~하구나' is used when the speaker suddenly realizes or understands something that was previously obvious or unnoticed. It conveys surprise or enlightenment.",
    "formation": "Động từ stem + 하구나"
  },
  "ko_하다가_76": {
    "title": "~하다가 [hadaga] (While doing, was doing)",
    "shortExplanation": "Biểu thị that one was in the middle of doing something when another event occurred.",
    "longExplanation": "'~하다가' is Dùng để chỉ ra that an action was ongoing when it was interrupted or when another action occurred. It is equivalent to 'while doing' or 'was doing' trong câu.",
    "formation": "Động từ stem + 하다가"
  },
  "ko_하다못해_77": {
    "title": "~하다못해 [hadamothae] (To the extent that)",
    "shortExplanation": "Used to emphasize an extreme degree or state; 'to the extent that'.",
    "longExplanation": "'~하다못해' emphasizes that something is so extreme or severe that the outcome is unexpected. It is often used to underscore a negative or surprising result and can be translated as 'to the extent that' trong câu.",
    "formation": "Động từ + 다못해"
  },
  "ko_하던_78": {
    "title": "~하던 중에 [hadeon junge] (While I was doing)",
    "shortExplanation": "Dùng để biểu thị that something happened while another action was in progress.",
    "longExplanation": "'~하던 중에' is used to describe an event that occurs during the course of another ongoing action. It is similar to saying 'while I was doing' or 'in the middle of doing' trong câu.",
    "formation": "Động từ + (으)던 중에"
  },
  "ko_하기는_79": {
    "title": "~하기는 [hagineun] (Although, but)",
    "shortExplanation": "Dùng để diễn tả concession or a contradictory relationship; 'although', 'but'.",
    "longExplanation": "'~하기는' is a construction used trong tiếng Hàn to indicate a contrast or concession—acknowledging one fact while asserting that the overall conclusion differs or contradicts it. It is often used when the second clause counteracts the first.",
    "formation": "Động từ stem + 기는 (attached to form a concessive clause)"
  },
  "ko_하기로_80": {
    "title": "~하기로 [hagiro] (Decide to)",
    "shortExplanation": "Dùng để diễn tả a decision made to perform an action.",
    "longExplanation": "'~하기로' is used trong tiếng Hàn to signify a decision made to take a specific action. It Biểu thị that one or more people have made a concrete decision to do something and is used in both casual and formal contexts.",
    "formation": "Động từ stem + 하기로"
  },
  "ko_하기에_81": {
    "title": "~하기에 [hagie] (For)",
    "shortExplanation": "Dùng để diễn tả reasoning or the basis for a decision; 'for', 'considering'.",
    "longExplanation": "'~하기에' Biểu thị the reason or basis for making a judgment or decision. Có thể dịch là 'for', 'considering', or 'in view of' and is used when the speaker wants to explain or justify a conclusion.",
    "formation": "Động từ stem + 기에"
  },
  "ko_하려고_82": {
    "title": "~하려고 하다 [haryeogo hada] (Try to do)",
    "shortExplanation": "Dùng để diễn tả the intention or effort to try to do something.",
    "longExplanation": "'~하려고 하다' Biểu thị the speaker’s plan or intention to perform an action. It is equivalent to 'try to do' trong câu and is formed by attaching '하려고' to the verb stem, followed by '하다'.",
    "formation": "Động từ stem + 하려고 + 하다"
  },
  "ko_할_83": {
    "title": "~할 때마다 [hal ttaemada] (Every time)",
    "shortExplanation": "Dùng để diễn tả repetition; 'every time' or 'whenever'.",
    "longExplanation": "'~할 때마다' is a standard construction Dùng để biểu thị that whenever a certain condition or event occurs, a specific action follows. It emphasizes the repeatability and consistency of the action.",
    "formation": "Động từ stem + (을/ㄹ) 때마다"
  },
  "ko_하면_84": {
    "title": "~하면 할수록 [hamyeon halsurok] (The more ~, the more ~)",
    "shortExplanation": "Diễn tả that increasing one factor causes a corresponding change in another.",
    "longExplanation": "'~하면 할수록' is Dùng để biểu thị a proportional relationship between two conditions or actions. It means that the more (or less) of one thing there is, the more (or less) of another occurs.",
    "formation": "Động từ-아/어/여 + 하면 + Động từ-ㄹ/을 + 수록"
  },
  "ko_하면서_85": {
    "title": "~하면서 [hamyeonseo] (While doing)",
    "shortExplanation": "Used to describe two actions occurring simultaneously by the same subject.",
    "longExplanation": "'~하면서' is a conjunction Dùng để biểu thị that two actions take place at the same time. It is equivalent to 'while' or 'as' trong câu and connects clauses where the same subject performs both actions.",
    "formation": "Động từ stem + -하면서"
  },
  "ko_하시겠습니까_86": {
    "title": "~하시겠습니까? [hasigesseubnikka?] (Would you?)",
    "shortExplanation": "A very formal and honorific way to request, ask, or suggest something.",
    "longExplanation": "'~하시겠습니까?' is used to politely and formally request or ask a question. It is formed by adding this ending (after removing the final '-다' from the verb) and is typically used in formal or honorific situations.",
    "formation": "Động từ (without '-다') + 하시겠습니까?"
  },
  "ko_하자_87": {
    "title": "~하자 [haja] (Let's, as soon as)",
    "shortExplanation": "Used to suggest an action or express immediate action following another.",
    "longExplanation": "'~하자' is a conjugated form of '하다' used in two ways: to make suggestions (equivalent to 'let's') and to indicate that one action will immediately follow another (as in 'as soon as'). It is commonly used in conversational Korean.",
    "formation": "Động từ stem + 자 (for suggestion) / Động từ stem + 자마자 (for 'as soon as')"
  },
  "ko_하여_88": {
    "title": "~하여 [hayeo] (So, therefore)",
    "shortExplanation": "Dùng để diễn tả reason, cause, or circumstances; 'so' or 'therefore'.",
    "longExplanation": "'~하여' is a connecting ending Dùng để chỉ ra a cause-effect relationship—similar to 'so' or 'therefore' trong câu. It introduces a clause that explains the reason or cause for the preceding statement and is generally used in formal or written contexts.",
    "formation": "Động từ stem + 어/아 + 하여"
  },
  "ko_하여야_89": {
    "title": "~하여야 [hayeoya] (Have to, should)",
    "shortExplanation": "Dùng để diễn tả the necessity or obligation; 'have to', 'should'.",
    "longExplanation": "'~하여야' is a verb ending used trong tiếng Hàn to indicate that a certain action is necessary or obligatory—often used in contexts of duty, responsibility, or advice. It corresponds to 'have to', 'should', or 'must' trong câu, imparting a sense of expectation upon the subject.",
    "formation": "Động từ stem + (어/아) 하여야 (한다)"
  },
  "ko_하자마자_90": {
    "title": "~하자마자 [hajamaja] (As soon as)",
    "shortExplanation": "Dùng để diễn tả 'as soon as' or 'immediately after'.",
    "longExplanation": "'~하자마자' is a conjugational pattern trong tiếng Hàn Dùng để biểu thị that one action occurs immediately after another. It is roughly equivalent to 'as soon as' trong câu, showing prompt succession of events.",
    "formation": "Động từ stem + 하자마자"
  },
  "ko_하여_91": {
    "title": "~하여 [hayeo] (So, therefore)",
    "shortExplanation": "Dùng để diễn tả a cause–effect relationship; 'so', 'therefore'.",
    "longExplanation": "'~하여' is a connecting ending used trong tiếng Hàn to indicate the cause or reason for a situation, similar to 'so' or 'therefore' trong câu. It is typically used in formal or written contexts.",
    "formation": "Động từ stem + (어/아) + 하여"
  },
  "ko_하기보다_92": {
    "title": "~하기보다 [hagiboda] (Rather than)",
    "shortExplanation": "Dùng để diễn tả comparison or contrast; 'rather than', 'instead of'.",
    "longExplanation": "'~하기보다' is used trong tiếng Hàn to compare two alternatives, expressing a preference or contrast between them. It is roughly translated as 'rather than' or 'instead of' trong câu.",
    "formation": "Động từ stem + 기보다"
  },
  "ko_하느라_93": {
    "title": "~하느라 [haneura] (Because of doing, due to)",
    "shortExplanation": "Dùng để biểu thị that being busy doing something has led to a certain (often negative) consequence.",
    "longExplanation": "'~하느라' is used trong tiếng Hàn to explain that one was so busy doing something that it caused another result—typically an unintended negative outcome. It is often translated as 'because of doing' or 'due to being busy with'.",
    "formation": "Động từ stem + -느라"
  },
  "ko_하는_94": {
    "title": "~하는 한 [haneun han] (As long as)",
    "shortExplanation": "Dùng để biểu thị the condition or basis on which something can happen or be established; 'as long as'.",
    "longExplanation": "'~하는 한 [haneun han]' is used trong tiếng Hàn to emphasize the condition or requirement necessary for something to happen. It is equivalent to the English phrase 'as long as', indicating that something will or can happen on the premise of the condition specified. This is frequently used in situations requiring adherence to a certain condition or meeting a particular prerequisite.",
    "formation": "Động từ + 하는 한"
  },
  "ko_하는_95": {
    "title": "~하는 김에 [haneun kime] (While at it)",
    "shortExplanation": "This is Dùng để diễn tả 'while doing A, do B', or 'since you are doing A, might as well do B'.",
    "longExplanation": "~하는 김에 [haneun kime] is a Korean grammatical expression used to present additional actions you might as well do while you're in the process of doing a primary action. This commonly translates to 'while doing it, might as well do B' or 'since you're doing it, also do B'. It also suggests that the secondary action (B) may be somewhat related to, or is convenient because of, the primary action (A).",
    "formation": "Động từ + ~는 김에"
  },
  "ko_하는_96": {
    "title": "~하는 편이다 [haneun pyeonida] (Tend to)",
    "shortExplanation": "This expression is used to describe a tendency or habit.",
    "longExplanation": "'~하는 편이다 [haneun pyeonida]' is a Korean grammar point Dùng để diễn tả a general habit or tendency of someone or something. It is generally used to describe an action that is not absolutely consistent, but is generally favored or avoided. Có thể dịch là 'tend to', 'more likely to', or 'has a habit of' trong câu.",
    "formation": "Động từ (stem) + 는 편이다"
  },
  "ko_하는_97": {
    "title": "~하는 대로 [haneun daero] (As soon as)",
    "shortExplanation": "Dùng để diễn tả 'as soon as' or 'immediately after'.",
    "longExplanation": "'~하는 대로 [haneun daero]' is a compound verb ending Dùng để diễn tả the immediate action taken after a certain situation or event has occurred. It Biểu thị simultaneous actions or immediate sequences, much like 'as soon as' or 'immediately after' trong câu. When you want to say that something happened right after something else without any time gap, you can use this ending.",
    "formation": "Động từ + 하는 대로"
  },
  "ko_하다_98": {
    "title": "~하다 보면 [hada bomyeon] (If you keep doing)",
    "shortExplanation": "This grammar point is Dùng để diễn tả the idea that if you keep doing something, then a certain result will eventually happen.",
    "longExplanation": "The Korean grammar point '~하다 보면 [hada bomyeon]' is Dùng để chỉ ra that if you do something continuously, it will eventually lead to a certain outcome. It implies that over time, repeating an action or behavior can bring about a specific change or effect. The verb preceding '하다 보면' Diễn tả the action, and the pattern is often used with actions that have a progressive or accumulative effect.",
    "formation": "Động từ stem + 하다 보면"
  },
  "ko_하다_99": {
    "title": "~하다 보니 [hada boni] (As I was doing)",
    "shortExplanation": "Dùng để diễn tả how one thing naturally leads to another; 'as I was doing, I realized that...'.",
    "longExplanation": "'~하다 보니 [hada boni]' is used to describe a situation where, while doing something, you gradually come to realize, understand, or feel something. It is often translated as 'as I was doing, I realized that' and is Dùng để diễn tả naturally emerging emotions or insights as a result of ongoing actions.",
    "formation": "Động từ (in dictionary form) + 하다 보니"
  },
  "ko_하려는_100": {
    "title": "~하려는 뜻이다 [haryeoneun tteushida] (Intend to)",
    "shortExplanation": "This is Dùng để diễn tả an intention or plan to do something in the future.",
    "longExplanation": "'~하려는 뜻이다 [haryeoneun tteushida]' is a grammatical construction Dùng để biểu thị the speaker's intention or plan to do something. It is usually expressed using the verb stem + 려는 뜻이다. trong câu, it is equivalent to 'intend to' or 'plan to', and it is Dùng để diễn tả future goals or plans.",
    "formation": "Động từ stem + 려는 뜻이다"
  },
  "ko_하면_101": {
    "title": "~하면 ~하다 [hamyeon hada] (If ~ then)",
    "shortExplanation": "Used to describe conditional statements or a sequence of events; 'if ~ then'.",
    "longExplanation": "'~하면 ~하다 [hamyeon hada]' is used trong tiếng Hàn to link a condition with its result or subsequent action. When the action or condition in the first clause occurs, the second clause follows as a consequence. It is similar to the English 'if ~ then' structure and can be Dùng để diễn tả hypothetical scenarios or sequential events.",
    "formation": "Động từ/Tính từ in dictionary form + 면 + Động từ/Tính từ in dictionary form + 다"
  },
  "ko_할_102": {
    "title": "~할 만하다 [hal manhada] (Worth to)",
    "shortExplanation": "Loosely translates to 'worth to' or 'deserving of', Dùng để diễn tả that something is worthwhile.",
    "longExplanation": "The construction '~할 만하다' is Dùng để diễn tả the idea that something is worth the effort, time, or cost. The verb that precedes this construction determines the context. It is often translated as 'worth to' or 'deserving of' trong câu. Generally, it is used when something is considered worthwhile or valuable, and it is not typically used in the negative form.",
    "formation": "Động từ stem + 할 만하다"
  },
  "ko_할_103": {
    "title": "~할 바에 [hal bae] (Rather than)",
    "shortExplanation": "Dùng để diễn tả a preference for an alternative action over the one in consideration; 'rather than'.",
    "longExplanation": "'~할 바에 [hal bae]' is used trong tiếng Hàn to indicate that, given a choice between two actions, the speaker prefers not to do the action attached to '할 바에'. It emphasizes a preference for a different action over the one being considered. It is often used when expressing a negative alternative or an unfavorable option.",
    "formation": "Động từ in dictionary form + '할 바에'"
  },
  "ko_할_104": {
    "title": "~할 리가 없다 [hal riga eopda] (There's no way that)",
    "shortExplanation": "Dùng để diễn tả impossibility or disbelief in a certain action or state.",
    "longExplanation": "'~할 리가 없다 [hal riga eopda]' is a Korean grammar point Dùng để diễn tả the speaker's disbelief or assertion that something is impossible or cannot be the case. It translates to 'there's no way that' trong câu, signifying that the speaker strongly believes a certain action or situation cannot or will not occur.",
    "formation": "Động từ (in dictionary form) + 할 리가 없다"
  },
  "ko_할_105": {
    "title": "~할 때마다 [hal ttaemada] (Every time when)",
    "shortExplanation": "Dùng để biểu thị repetition; 'every time when' or 'whenever'.",
    "longExplanation": "'~할 때마다 [hal ttaemada]' is a conjunction used trong tiếng Hàn to indicate an action or state that repeatedly happens whenever a certain condition or situation occurs. It conveys a sense of regular occurrence, akin to 'every time when' or 'whenever' trong câu. It is used to emphasize the consistent and repetitive nature of an action or state in relation to a specific situation.",
    "formation": "Động từ in dictionary form + 할 때마다"
  },
  "ko_할_106": {
    "title": "~할 힘이 없다 [hal himi eopda] (Don't have the strength/energy to)",
    "shortExplanation": "This phrase is Dùng để diễn tả that one doesn't have the strength or energy to do something.",
    "longExplanation": "The phrase '~할 힘이 없다 [hal himi eopda]' is commonly used trong tiếng Hàn to demonstrate the absence of capability, energy, or strength to perform a particular action. It is typically Dùng để diễn tả physical or emotional fatigue that hinders one's ability to carry out a task.",
    "formation": "Động từ(원형) + 할 힘이 없다"
  },
  "ko_할_107": {
    "title": "~할 것 같다 [hal geot gatda] (Seems like, feels like)",
    "shortExplanation": "Dùng để diễn tả prediction, expectation, or intuition; 'seems like', 'feels like'.",
    "longExplanation": "'~할 것 같다 [hal geot gatda]' is a sentence-ending expression trong tiếng Hàn used to predict or express an expectation or feeling about a future event. The speaker uses this form to share an opinion or intuition based on observations. It is translated as 'seems like' or 'feels like' trong câu.",
    "formation": "Động từ stem + 을/ㄹ + 것 같다"
  },
  "ko_할_108": {
    "title": "~할 것이다 [hal geosida] (Will)",
    "shortExplanation": "Dùng để diễn tả that an event will occur in the future.",
    "longExplanation": "'~할 것이다 [hal geosida]' is a future tense marker trong tiếng Hàn. It is attached to the end of a verb to indicate that something is going to or will happen. It can also Diễn tả speaker’s wish, intention, or prediction regarding a future event.",
    "formation": "Động từ Stem + ~(으)ㄹ 것이다"
  },
  "ko_할_109": {
    "title": "~할 줄 알다 [hal jul alda] (Know how to)",
    "shortExplanation": "Dùng để diễn tả 'know how to' or 'the ability to do something'.",
    "longExplanation": "'~할 줄 알다 [hal jul alda]' is a grammatical expression used to convey the ability or knowledge of how to do something. When attached to a verb stem, it Biểu thị that someone knows how to perform that action. It is often used in conversation to ask or assert one’s ability.",
    "formation": "Động từ stem + -ㄹ/을 줄 알다"
  },
  "ko_할지라도_110": {
    "title": "~할지라도 [haljirado] (Even if)",
    "shortExplanation": "Dùng để diễn tả 'even if', 'even though', or 'regardless of'.",
    "longExplanation": "'~할지라도 [haljirado]' is a conjugation form Dùng để diễn tả that, even if a certain condition or circumstance exists, the outcome in the second clause remains true. It is often used in hypothetical or speculative situations.",
    "formation": "Động từ in future tense form + 지라도"
  },
  "ko_할지언정_111": {
    "title": "~할지언정 [haljieonjeong] (Regardless of whether)",
    "shortExplanation": "Dùng để diễn tả 'regardless of whether', 'no matter what', or 'even if'. It shows that even if a condition exists, it will not affect the speaker's decision or action.",
    "longExplanation": "'~할지언정 [haljieonjeong]' is Dùng để biểu thị that regardless of a certain condition or situation in the first clause, the outcome or decision in the main clause remains unchanged. It is similar to 'whether or not' or 'no matter what' trong câu.",
    "formation": "Động từ + ~ㄹ지언정"
  },
  "ko_함에_112": {
    "title": "~함에 있어 [hame isseo] (In terms of)",
    "shortExplanation": "This pattern is Dùng để biểu thị 'in terms of', 'when it comes to', or 'with respect to'.",
    "longExplanation": "'~함에 있어' is used when explaining a standard or point of view on which a judgment is made. It is equivalent to 'in terms of', 'when it comes to', or 'in the context of' trong câu. This form is often used in sentences that express opinions or subjective views from a particular perspective.",
    "formation": "Động từ stem + -ㅁ + 에 있어"
  },
  "ko_해_113": {
    "title": "~해 보이다 [hae boida] (Look/seem to be)",
    "shortExplanation": "Dùng để diễn tả an observation or opinion about how someone or something appears or seems.",
    "longExplanation": "'~해 보이다 [hae boida]' is used trong tiếng Hàn to describe how someone or something appears based on personal observation. It combines an adjective or descriptive verb (in dictionary form) with 보이다 to express a subjective judgment—equivalent to 'look/seem to be' trong câu.",
    "formation": "Tính từ/Descriptive verb (dictionary form) + 보이다"
  },
  "ko_게다가_0": {
    "title": "~게다가 [gedaga] (Moreover, besides)",
    "shortExplanation": "This grammar point is used to introduce an additional point or detail that strengthens the previous statement.",
    "longExplanation": "`~게다가 [gedaga]` is a conjunctive adverb trong tiếng Hàn. It is used to add further information or details to a previously mentioned point, similar to 'moreover' or 'besides' trong câu. It implies that the subsequent information is an additional detail rather than a completely separate point.",
    "formation": "Clause1 + 게다가 + Clause2"
  },
  "ko_거니와_1": {
    "title": "~거니와 [geoniwa] (And, besides)",
    "shortExplanation": "Used to add an additional reason or explanation, equivalent to 'and' or 'besides' trong câu, though it is more literary.",
    "longExplanation": "`~거니와 [geoniwa]` is a conjunctive particle used trong tiếng Hàn to connect two clauses, providing an extra reason or detail. It is similar in function to 'and' or 'besides' trong câu. This construction is more formal or literary and is less common in everyday speech.",
    "formation": "Clause1 (adjective/verb stem) + 거니와 + Clause2"
  },
  "ko_것만은_2": {
    "title": "~것만은 [geot man-eun] (But / At least)",
    "shortExplanation": "This construction is used to emphasize that one particular aspect is an exception, often contrasting with expectations.",
    "longExplanation": "The `~것만은` construction trong tiếng Hàn is used to highlight that despite other circumstances, one specific aspect does not follow the expected result. It is often used in a contrasting or contradictory context to stress that, if nothing else, this one thing is different.",
    "formation": "Động từ/Tính từ (in past form) + -(ㄴ/은) + 것만은"
  },
  "ko_과와_3": {
    "title": "~과/와 같이 [gwa/wa gachi] (Like, as if)",
    "shortExplanation": "Dùng để diễn tả a comparison, similarity, or analogy, equivalent to 'like' or 'as if' trong câu.",
    "longExplanation": "`~과/와 같이 [gwa/wa gachi]` is an expression used trong tiếng Hàn to draw a comparison or analogy, showing that one thing is similar to another. It is equivalent to saying 'like' or 'as if' trong câu and helps in visualizing or emphasizing the resemblance between two things.",
    "formation": "Danh từ + 과/와 같이"
  },
  "ko_나마저_4": {
    "title": "~나마저 [namajeo] (Even)",
    "shortExplanation": "Dùng để diễn tả surprise or emphasis, indicating that even the unexpected subject or object is included.",
    "longExplanation": "`~나마저 [namajeo]` is a postpositional particle trong tiếng Hàn that emphasizes an unexpected inclusion, similar to 'even' trong câu. It highlights that the subject or object in question surpasses normal expectations.",
    "formation": "Danh từ + 나마저"
  },
  "ko_뿐만_5": {
    "title": "~뿐만 아니라 [ppunman anira] (Not only... but also)",
    "shortExplanation": "Dùng để diễn tả 'not only... but also' by adding additional, related information.",
    "longExplanation": "`~뿐만 아니라 [ppunman anira]` is used trong tiếng Hàn to add extra information, indicating that something applies not only in one aspect but also in another. It serves to emphasize that a subject or event encompasses multiple qualities or characteristics.",
    "formation": "Danh từ/Tính từ/Động từ + 뿐만 아니라 + Mệnh đề"
  },
  "ko_더니_6": {
    "title": "~더니 [deoni] (After, and then)",
    "shortExplanation": "Used to connect two clauses, indicating that the second clause follows after the first.",
    "longExplanation": "`~더니` is a conjunction used trong tiếng Hàn to connect two clauses or actions, showing that the second event or state was realized after experiencing the first. It is often used in narratives or personal experiences to indicate a change or consequence.",
    "formation": "Động từ (in past tense) + 더니"
  },
  "ko_이든지_7": {
    "title": "~이든지 ~든지 [ideunji deunji] (Whether… or)",
    "shortExplanation": "Used to present multiple alternatives, similar to 'whether... or' trong câu.",
    "longExplanation": "`~이든지 ~든지 [ideunji deunji]` is used trong tiếng Hàn to list alternative options or possibilities, conveying indifference about which one is chosen. It is often used in both interrogative sentences and statements to present choices.",
    "formation": "Clause1 + 이든지 + Clause2 + 든지"
  },
  "ko_임에_8": {
    "title": "~임에 틀림없다 [ime tteollimeopda] (Without a doubt)",
    "shortExplanation": "Dùng để diễn tả certainty, meaning 'without a doubt' or 'it's certain that...'.",
    "longExplanation": "`~임에 틀림없다 [ime tteollimeopda]` is used trong tiếng Hàn to express a high degree of certainty about a situation or outcome. It emphasizes that there is no doubt about the assertion and is often used in formal or written contexts.",
    "formation": "Động từ/Tính từ (nominalized) + 임에 틀림없다"
  },
  "ko_쩌면_9": {
    "title": "~쩌면 [jjeomyeon] (Maybe, perhaps)",
    "shortExplanation": "Dùng để diễn tả possibility or probability; 'maybe', 'perhaps'.",
    "longExplanation": "'~쩌면 [jjeomyeon]' is an adverb that Diễn tả the speaker's uncertainty about a situation. It is usually placed at the beginning of a sentence to suggest that something might be the case. Có thể dịch là 'maybe' or 'perhaps' trong câu.",
    "formation": "쩌면 + Sentence"
  },
  "ko_치고는_10": {
    "title": "~치고는 [chigoneun] (For, considering)",
    "shortExplanation": "Diễn tả the meaning of 'for' or 'considering' when reality is better or worse than expected.",
    "longExplanation": "'~치고는 [chigoneun]' is a postpositional expression used to compare a situation with expectations. It conveys that, considering the condition or status of something, the outcome is surprising or different from what one might expect.",
    "formation": "Danh từ/Động từ(-는/ᆫ) + 치고는"
  },
  "ko_커녕_11": {
    "title": "~커녕 [keonyeong] (Far from, let alone)",
    "shortExplanation": "Dùng để chỉ ra that the actual reality is far from the expected outcome.",
    "longExplanation": "'~커녕 [keonyeong]' is used to emphasize that not only did the expected result not occur, but something even less occurred instead. It is similar to saying 'far from' or 'let alone' trong câu.",
    "formation": "Danh từ/Động từ stem + 커녕"
  },
  "ko_판에_12": {
    "title": "~판에 [pane] (In the midst of)",
    "shortExplanation": "~판에 [pane] is Dùng để diễn tả that something happens in the midst of a particular situation or event.",
    "longExplanation": "'판에 [pane]' is a grammatical pattern Dùng để biểu thị that an action occurs during or in the midst of another event. Although its literal translation might seem odd, it is best understood as 'in the midst of' or 'during' and is often found in formal or written Korean.",
    "formation": "Động từ-는/Danh từ + 판에"
  },
  "ko_하건마는_13": {
    "title": "~하건마는 [hageonmaneun] (But, however)",
    "shortExplanation": "Dùng để diễn tả contrast or opposition; 'but', 'however'.",
    "longExplanation": "'~하건마는 [hageonmaneun]' is a conjunction used to contrast two clauses. It shows that even though one thing is true, another conflicting fact or situation follows.",
    "formation": "Động từ (present tense form) + 건마는"
  },
  "ko_하더라도_14": {
    "title": "~하더라도 [hadeorado] (Even if)",
    "shortExplanation": "Dùng để diễn tả 'even if', 'even though', or 'despite'.",
    "longExplanation": "'~하더라도 [hadeorado]' is a grammatical construction Dùng để diễn tả a hypothetical or contrastive situation—essentially meaning 'even if' or 'even though'. It is used with all types of verbs to emphasize that the outcome remains unchanged despite the condition.",
    "formation": "Động từ + 더라도"
  },
  "ko_하든지_15": {
    "title": "~하든지 말든지 [hadeunji maldeunji] (Whether... or not)",
    "shortExplanation": "Used to convey 'whether... or not'.",
    "longExplanation": "'~하든지 말든지 [hadeunji maldeunji]' is a compound ending that Diễn tả indifference toward the outcome regardless of which choice is made. It implies that the result remains unchanged.",
    "formation": "Động từ stem + 하든지 말든지"
  },
  "ko_하려니와_16": {
    "title": "~하려니와 [haryeoniwa] (Trying to, but)",
    "shortExplanation": "Dùng để diễn tả a situation where one tries to do something but encounters an obstacle.",
    "longExplanation": "'~하려니와 [haryeoniwa]' is Dùng để chỉ ra that while one is attempting to do something, an unexpected difficulty or issue prevents it from happening. Có thể dịch là 'trying to, but' or 'want to, but' trong câu.",
    "formation": "Động từ stem + 려니와"
  },
  "ko_하여간_17": {
    "title": "~하여간 [hayaegane] (Anyway, anyhow)",
    "shortExplanation": "Dùng để diễn tả that one will proceed regardless of difficulties or obstacles.",
    "longExplanation": "'~하여간 [hayaegane]' is used trong tiếng Hàn to show a determined resolve or to express that, regardless of any obstacles or factors, one will do something. It is similar in meaning to 'anyway' or 'anyhow' trong câu.",
    "formation": "Predicate (Động từ/Tính từ) + 아/어/여 + 하여간"
  },
  "ko_하여야만_18": {
    "title": "~하여야만 [hayeoyaman] (Only when)",
    "shortExplanation": "Biểu thị that a certain condition must be satisfied for something else to happen.",
    "longExplanation": "'~하여야만 [hayeoyaman]' is used when a specific condition or criteria must be met for an outcome to occur. It is equivalent to 'only when' trong câu and stresses that without this condition, the result is unattainable.",
    "formation": "Động từ stem + ~하여야만 + Positive verb"
  },
  "ko_해야겠다_19": {
    "title": "~해야겠다 [haeyagetda] (Should, ought to)",
    "shortExplanation": "Diễn tả the speaker's intention or determination to do something in the future.",
    "longExplanation": "'~해야겠다 [haeyagetda]' is a pattern Dùng để diễn tả necessity or determination for a future action. It Biểu thị that the speaker has decided that something should be done.",
    "formation": "Động từ stem + 야겠다"
  },
  "ko_에_20": {
    "title": "~에 근거하여 [e geungeohayeo] (Based on)",
    "shortExplanation": "Diễn tả the notion 'based on', 'according to', or 'in accordance with'.",
    "longExplanation": "~에 근거하여 [e geungeohayeo] is Dùng để biểu thị that a statement, action, or conclusion is derived from a particular source such as data, rules, or authoritative information.",
    "formation": "Danh từ + 에 근거하여"
  },
  "ko_에_21": {
    "title": "~에 비추어 볼 때 [e bichueo bol ttae] (In comparison to)",
    "shortExplanation": "Dùng để diễn tả comparison; 'in comparison to' or 'compared to'.",
    "longExplanation": "'~에 비추어 볼 때 [e bichueo bol ttae]' is used to compare one subject or factor with another, often to assert a judgment or highlight a contrast.",
    "formation": "Danh từ + 에 비추어 볼 때"
  },
  "ko_이다_22": {
    "title": "~이다 보니 [ida boni] (Since, as)",
    "shortExplanation": "Used to state a reason or cause that leads to a certain result, similar to 'since' or 'as' trong câu.",
    "longExplanation": "'~이다 보니 [ida boni]' Diễn tả a cause-and-effect relationship. It is used when a state or habitual action gradually leads to a particular consequence, implying that the result became apparent over time.",
    "formation": "Động từ stem + -다 + 보니"
  },
  "ko_이라면_23": {
    "title": "~이라면 그것은 [iramyeon geugeoseun] (If it’s called)",
    "shortExplanation": "Used when describing or explaining something in detail if it is defined in a certain way.",
    "longExplanation": "'~이라면 그것은 [iramyeon geugeoseun]' is used to introduce a definition or explanation. It is roughly equivalent to saying 'if it's called...' trong câu and is followed by a more detailed description of the subject.",
    "formation": "Chủ ngữ + 이라면 그것은 + Detailed Description"
  },
  "ko_이래_24": {
    "title": "~이래 [irae] (Since then, after)",
    "shortExplanation": "Dùng để diễn tả that something has been the case since a certain past event.",
    "longExplanation": "'~이래 [irae]' denotes 'since then' or 'after' an event, emphasizing the lasting impact or continued change from that moment onward.",
    "formation": "Verbal noun + 이래"
  },
  "ko_이야말로_25": {
    "title": "~이야말로 [iyamallo] (Truly, really)",
    "shortExplanation": "Used to emphasize that something or someone is the true or real example of a quality.",
    "longExplanation": "'~이야말로 [iyamallo]' is used to assert that the attached noun is the very or best example of a given quality. Có thể dịch là 'truly' or 'really' trong câu and is used for emphasis when stating a fact or situation.",
    "formation": "Danh từ + 이야말로"
  },
  "ko_인_26": {
    "title": "~인 까닭에 [in kkadake] (Because, the reason why)",
    "shortExplanation": "Biểu thị 'because' or 'the reason why' by giving the cause for the main clause.",
    "longExplanation": "'~인 까닭에 [in kkadake]' is a conjunction expression used trong tiếng Hàn to explain the reason or cause of an action, event, or situation. It is similar in meaning to 'because' or 'the reason why' trong câu and is generally used in formal or literary contexts (in contrast to colloquial forms like '때문에' or '해서').",
    "formation": "Động từ‑기 / Tính từ‑은 / Danh từ‑인 + 까닭에"
  },
  "ko_인_27": {
    "title": "~인 즉 [in jeuk] (In other words)",
    "shortExplanation": "Used to restate or clarify something; 'in other words', 'that is to say'.",
    "longExplanation": "'~인 즉 [in jeuk]' is a phrase used trong tiếng Hàn to restate or clarify a previous statement in different words. It is similar to the English expressions 'in other words', 'that is to say', or 'namely' and offers additional clarification or perspective.",
    "formation": "Danh từ/Động từ + ~인 즉 + Restatement"
  },
  "ko_처럼_28": {
    "title": "~처럼 하다 [cheoreom hada] (To act as if, pretend to)",
    "shortExplanation": "Diễn tả that someone behaves as if they are in a certain state; 'pretend to' or 'act as if'.",
    "longExplanation": "'~처럼 하다 [cheoreom hada]' is used to describe when someone imitates or mimics a particular state or behavior. In everyday Korean, speakers often use the expression with the auxiliary ‘척 하다’ to mean 'pretend to.'",
    "formation": "Danh từ/Tính từ (or state) + 척 하다"
  },
  "ko_커지다_29": {
    "title": "~커지다 [keojida] (Become bigger, more important)",
    "shortExplanation": "Diễn tả that something grows in size, significance, or importance.",
    "longExplanation": "The verb '커지다 [keojida]' Biểu thị that something becomes bigger, more significant, or more important. It can be used for physical size as well as abstract or emotional growth, making it versatile in various contexts.",
    "formation": "Danh từ + 이/가 + 커지다"
  },
  "ko_키로_30": {
    "title": "~키로 하다 [kiro hada] (Intend to, plan to)",
    "shortExplanation": "Denotes the speaker's intention or resolution to do something.",
    "longExplanation": "The form '~키로 하다 [kiro hada]' is used trong tiếng Hàn to express a decision, plan, or intention for a future action. It conveys a sense of resolution and deliberate commitment, and is generally translated as 'intend to' or 'plan to' trong câu.",
    "formation": "Động từ (dictionary form) + 키로 하다"
  },
  "ko_하기에는_31": {
    "title": "~하기에는 [hagineun] (Considering)",
    "shortExplanation": "Dùng để diễn tả 'considering' or 'given that'.",
    "longExplanation": "'~하기에는 [hagineun]' is used when taking into account a certain condition or fact before making a judgment or decision. It is attached to a verb stem (as in '하기에는') to indicate that, given that condition, the following statement holds true.",
    "formation": "Động từ stem + 기에는"
  },
  "ko_하기는_32": {
    "title": "~하기는 하다 [hagineun hada] (Do it somehow)",
    "shortExplanation": "Conveys that someone does something, though not very well or adequately.",
    "longExplanation": "The expression '~하기는 하다 [hagineun hada]' is used to imply that while an action is indeed performed, it may not be done proficiently or to the expected standard.",
    "formation": "Động từ stem + 기는 하다"
  },
  "ko_하기야_33": {
    "title": "~하기야 [hagiya] (Indeed, truly)",
    "shortExplanation": "Used to emphasize or affirm a statement; 'indeed', 'truly', 'to be sure'.",
    "longExplanation": "'~하기야 [hagiya]' is a form used to strongly affirm the truth of a statement or to emphasize one’s viewpoint. It is akin to saying 'indeed' or 'truly' trong câu.",
    "formation": "Động từ stem + 하기야"
  },
  "ko_하기만_34": {
    "title": "~하기만 하면 [hakiman hamyeon] (As soon as)",
    "shortExplanation": "Diễn tả 'as soon as' or 'whenever' an action occurs, another immediately follows.",
    "longExplanation": "'~하기만 하면 [hakiman hamyeon]' is Dùng để biểu thị that as soon as a certain action (expressed by the verb stem + 하다) happens, another action follows immediately or consequently.",
    "formation": "Động từ stem + 하기만 하면"
  },
  "ko_하면서도_35": {
    "title": "~하면서도 [hamyeonseodo] (While, although)",
    "shortExplanation": "Dùng để diễn tả a contradictory situation or event occurring at the same time; 'while', 'although'.",
    "longExplanation": "'~하면서도 [hamyeonseodo]' is a conjunction used trong tiếng Hàn to indicate two actions or states happening simultaneously, with an aspect of contradiction or conflicting elements. It's like saying 'although' or 'even when' trong câu, and it implies that despite the first action, the second one still occurs. It can be Dùng để chỉ ra an inconsistency between what is expected and what really happens.",
    "formation": "Động từ-stem + ~하면서도"
  },
  "ko_하면_36": {
    "title": "~하면 할수록 [hamyeon halsurok] (The more... the more)",
    "shortExplanation": "Dùng để diễn tả a correlation between two actions or situations; 'the more... the more'.",
    "longExplanation": "The '~하면 할수록 [hamyeon halsurok]' grammar point is Dùng để diễn tả a correlation between two things. The first clause shows what is increasing or decreasing, while the second clause shows the result. This pattern emphasizes that as one event or situation increases or decreases, a related event or situation also increases or decreases—much like the English expression 'the more... the more'.",
    "formation": "Động từ + 면, Động từ + 수록"
  },
  "ko_하자마자_37": {
    "title": "~하자마자 [hajamaja] (As soon as)",
    "shortExplanation": "Dùng để diễn tả 'as soon as' or 'right after' something has happened.",
    "longExplanation": "'~하자마자 [hajamaja]' is a conjugation used trong tiếng Hàn to indicate an action that is immediately followed by another action with no gap in between. Essentially, it means 'as soon as' or 'right after.'",
    "formation": "Động từ stem + 하자마자"
  },
  "ko_해서_38": {
    "title": "~해서 그런지 [haeseo geureonji] (Perhaps because)",
    "shortExplanation": "Dùng để diễn tả a supposition, assumption, or speculation; 'perhaps because', 'maybe due to'.",
    "longExplanation": "'~해서 그런지 [haeseo geureonji]' is commonly used trong tiếng Hàn to indicate a speculative cause-and-effect relationship or supposition. It is generally translated as 'perhaps because' or 'maybe due to' and is used when the speaker is not completely certain about the cause but speculates based on observable evidence.",
    "formation": "Động từ/Tính từ + 해서 그런지"
  },
  "ko_하여서는_39": {
    "title": "~하여서는 안 되다 [hayeoseoneun an dweda] (Must not)",
    "shortExplanation": "Dùng để diễn tả prohibition or strong advice against doing something, which can be translated as 'must not' or 'should not'.",
    "longExplanation": "'~하여서는 안 되다 [hayeoseoneun an dweda]' is a grammar form Dùng để biểu thị that something should not or must not occur. It is often used when giving strong advice or setting prohibitions, highlighting the negative consequences of the action.",
    "formation": "Động từ stem + 아/어/여 + 하여서는 안 되다"
  },
  "ko_한테는_40": {
    "title": "~한테는 [hanteneun] (To, for someone)",
    "shortExplanation": "Dùng để biểu thị the target or recipient of an action, similar to 'to' or 'for' trong câu.",
    "longExplanation": "'~한테는 [hanteneun]' is a construction trong tiếng Hàn used when the speaker wants to specify the recipient or target of an action. It is similar to 'to' or 'for' trong câu and is often used to single out someone in contrast to others.",
    "formation": "Danh từ + 한테는"
  },
  "ko_할_41": {
    "title": "~할 만하다 [hal manhada] (Worth doing)",
    "shortExplanation": "Dùng để diễn tả the worthiness of doing something.",
    "longExplanation": "'~할 만하다 [hal manhada]' is Dùng để biểu thị that something is worth the effort, time, or cost invested in it. Có thể dịch là 'worth doing' or 'worth it' trong câu, expressing a subjective assessment of value.",
    "formation": "Động từ stem + 할 만하다"
  },
  "ko_할_42": {
    "title": "~할 수밖에 없다 [hal subakke eopda] (Have no choice but to)",
    "shortExplanation": "Dùng để diễn tả that there is no other option but to do what is mentioned.",
    "longExplanation": "'~할 수밖에 없다 [hal subakke eopda]' is used when there is no alternative but to perform the action mentioned. It implies that circumstances force one to act in a certain way.",
    "formation": "Động từ (in dictionary form) + 수밖에 없다"
  },
  "ko_해_43": {
    "title": "~해 갈수록 [hae galsurok] (Increasingly, as time goes on)",
    "shortExplanation": "Used to describe a situation where a condition progressively intensifies or becomes more serious.",
    "longExplanation": "The '~해 갈수록 [hae galsurok]' expression Biểu thị that as time passes, a particular state or condition gradually becomes more intense or worsens. It can be used with both verbs and adjectives, similar to saying 'increasingly' or 'the more... the more' trong câu.",
    "formation": "Động từ/Tính từ stem + -을수록 / -ㄹ수록"
  },
  "ko_해_44": {
    "title": "~해 보아야 [hae boaya] (Should try and see)",
    "shortExplanation": "Used to suggest that somebody should try something out in order to know or understand it.",
    "longExplanation": "'~해 보아야 [hae boaya]' is used when suggesting that one should try something to truly understand or experience it. trong câu, it is similar to saying 'you should try and see.'",
    "formation": "Động từ stem + 해 보아야"
  },
  "ko_해오다_45": {
    "title": "~해오다 [haeoda] (Continue doing something until now)",
    "shortExplanation": "Dùng để diễn tả an ongoing action from the past up to the present moment.",
    "longExplanation": "'해오다 [haeoda]' is used to denote an action that started in the past and continues until now. It literally means 'have been doing' and is often Dùng để diễn tả a continuous habit, an ongoing action, or a series of actions over an extended period.",
    "formation": "Động từ + 아/어/해 + 오다"
  },
  "ko_했건만_46": {
    "title": "~했건만 [haetgeonman] (But, however)",
    "shortExplanation": "Dùng để diễn tả contrast or contradiction; 'but', 'however'.",
    "longExplanation": "The '~했건만 [haetgeonman]' form is Dùng để diễn tả a contrasting situation or contradiction. Có thể dịch là 'but', 'nevertheless', or 'however' and is used when the speaker wants to present a fact or circumstance that conflicts with what was previously stated.",
    "formation": "Động từ + 았/었/했건만"
  },
  "ko_했기_47": {
    "title": "~했기 때문에 [haetgi ttaemune] (Because)",
    "shortExplanation": "Dùng để diễn tả reason or cause, equivalent to 'Because' trong câu.",
    "longExplanation": "'~했기 때문에 [haetgi ttaemune]' is used to give a reason or cause. It refers retrospectively to an action or situation in the past that explains a present condition or outcome.",
    "formation": "Action Động từ in Past Tense + 했기 때문에"
  },
  "ko_했기에_48": {
    "title": "~했기에 [haetgie] (Because)",
    "shortExplanation": "Dùng để biểu thị the reason or cause; 'because' or 'since'.",
    "longExplanation": "`~했기에 [haetgie]` is a conjunction that connects two sentences by showing that the first is the cause or reason for the second. It emphasizes that one situation exists because of another, equivalent to 'because' or 'since' trong câu.",
    "formation": "Động từ + 했기에"
  },
  "ko_했더니_49": {
    "title": "~했더니 [haetdeoni] (And then)",
    "shortExplanation": "Dùng để diễn tả the progression of actions or events, indicating a consequential relationship.",
    "longExplanation": "The '~했더니 [haetdeoni]' expression is used trong tiếng Hàn to show that after an action or event, an unexpected or revealing result followed. Có thể dịch là 'and then' or 'so' trong câu.",
    "formation": "Động từ + 았/었더니"
  },
  "ko_했어야_50": {
    "title": "~했어야 했다 [haesseoya haetda] (Had to)",
    "shortExplanation": "Biểu thị that something 'had to' be done in the past, often expressing regret or missed opportunities.",
    "longExplanation": "'~했어야 했다 [haesseoya haetda]' is Dùng để diễn tả that something should have been done or occurred in the past, even if it wasn’t. It often carries a sense of regret or a feeling that an opportunity was missed.",
    "formation": "Động từ stem + 았/었어야 했다"
  },
  "ko_혹은_51": {
    "title": "~혹은 [hogeun] (Or)",
    "shortExplanation": "Dùng để diễn tả options or alternatives; 'or'.",
    "longExplanation": "'~혹은 [hogeun]' is a conjunction used to present two or more alternatives or choices without prioritizing one over another, similar to 'or' trong câu.",
    "formation": "Noun1 + 혹은 + Noun2"
  },
  "ko_후에야_52": {
    "title": "후에야 [hueya] (Only after)",
    "shortExplanation": "Dùng để biểu thị that something happened or was realized only after a certain event or time.",
    "longExplanation": "'후에야 [hueya]' is a compound word formed from '후에' (after) and '야' (only). It emphasizes that an action or realization occurs only after a specified event or period has passed – the precondition for what follows.",
    "formation": "Danh từ/Động từ(Stem) + (으)ㄴ/는/ㄹ + 후에야 + Động từ"
  },
  "ko_흔히_53": {
    "title": "~흔히 [heunhi] (Commonly, often)",
    "shortExplanation": "Dùng để biểu thị that an event or situation happens frequently or is commonly known.",
    "longExplanation": "'~흔히 [heunhi]' is an adverb used trong tiếng Hàn to demonstrate that something happens frequently, is a common occurrence, or is typically known. It is very similar to English expressions like 'often', 'commonly', 'usually' or 'typically'. It is used in both objective descriptions of facts and in subjective observations.",
    "formation": "흔히 + Động từ"
  },
  "ko_되다_54": {
    "title": "~되다 [doeda] (To become)",
    "shortExplanation": "Dùng để diễn tả a change into a different state or condition; 'to become'.",
    "longExplanation": "'~되다 [doeda]' is Dùng để biểu thị that someone or something has changed into a new state or condition. It Diễn tả a transformation or transition from one state to another.",
    "formation": "Danh từ/Tính từ/Động từ stem + 되다"
  },
  "ko_잖다_55": {
    "title": "~잖다 [janda] (You know, isn't it)",
    "shortExplanation": "Used to state information the speaker assumes the listener already knows.",
    "longExplanation": "'~잖다 [janda]' is a sentence-ending phrase Dùng để biểu thị the speaker's assumption that the listener is already aware of the information being shared. It's akin to saying 'you know' or 'isn’t it' trong câu. This grammar point can be used to confirm facts or imply shared knowledge.",
    "formation": "Động từ stem + 잖다"
  },
  "ko_져지다_56": {
    "title": "~져/지다 [jyeo/jida] (Become)",
    "shortExplanation": "Used to depict changes in state, emotion, condition, or situation, similar to 'become' or 'get' trong câu.",
    "longExplanation": "'~져/지다 [jyeo/jida]' is a conjugation that Biểu thị transformation or change. It can mean 'become' or 'get' and is used to describe shifts in state, feelings, or conditions.",
    "formation": "Tính từ/Verbal Danh từ + ~져/지다"
  },
  "ko_졌다가_57": {
    "title": "~졌다가 [jyeotdaga] (Was once, but)",
    "shortExplanation": "Dùng để diễn tả that something was once in a certain state or condition, but then changed again.",
    "longExplanation": "'~졌다가 [jyeotdaga]' is Dùng để biểu thị a sequence where the subject was once in one state and then changed to another—often reverting or fluctuating. It is typically attached to verbs in the past tense.",
    "formation": "Động từ + -졌다가"
  },
  "ko_즉_58": {
    "title": "~즉 [jeuk] (That is to say, namely)",
    "shortExplanation": "Used to restate or clarify a point with more detail; 'namely', 'that is to say'.",
    "longExplanation": "'~즉 [jeuk]' is a conjunction used trong tiếng Hàn to re-explain or add further details to a statement. It is equivalent to 'namely' or 'that is to say' trong câu and helps clarify or specify information.",
    "formation": "Sentence + 즉 + Sentence"
  },
  "ko_지_59": {
    "title": "~지 않을까 싶다 [ji anheulkka sipda] (I think perhaps)",
    "shortExplanation": "Diễn tả an assumption or supposition that something might be; it suggests that the speaker thinks something is likely.",
    "longExplanation": "The structure '~지 않을까 싶다' is Dùng để diễn tả a guess or speculation about a situation. It conveys uncertainty as well as a hopeful anticipation about what might happen or be true.",
    "formation": "Động từ-지 않을까 싶다"
  },
  "ko_지_60": {
    "title": "~지 않을까 하다 [ji anheulkka hada] (I guess, I suspect)",
    "shortExplanation": "Dùng để diễn tả one's conjecture or prediction; 'I think', 'I guess', 'I suspect'.",
    "longExplanation": "'~지 않을까 하다' is Dùng để diễn tả a guess or suspicion about a situation when the speaker is not completely sure. It conveys the speaker's uncertainty and expectation about what might be true.",
    "formation": "Động từ + 지 않을까 하다"
  },
  "ko_지요_62": {
    "title": "~지요 [jyo] (~지, right?)",
    "shortExplanation": "A casual way to seek agreement or confirmation from the listener, similar to 'right?' or 'isn't it?' trong câu.",
    "longExplanation": "~지요 [jyo] is a commonly used ending in conversational Korean that seeks agreement or confirmation. It softens statements and is often used in friendly dialogues. trong câu, it can be roughly translated as 'right?' or 'isn't it?'.",
    "formation": "Động từ + 지요"
  },
  "ko_진행하다_63": {
    "title": "~진행하다 [jinhaenghada] (To proceed)",
    "shortExplanation": "Dùng để diễn tả the progression or continuation of an action or event.",
    "longExplanation": "'~진행하다 [jinhaenghada]' Biểu thị that an action or event is being carried out or continued. It is equivalent to 'to proceed with' or 'to continue' trong câu and can be used in contexts such as work, study, or any ongoing process.",
    "formation": "Danh từ + 을/를 + 진행하다"
  },
  "ko_차라리_64": {
    "title": "~차라리 [charari] (Rather, instead)",
    "shortExplanation": "Dùng để diễn tả a preference for one option over another; 'rather', 'instead'.",
    "longExplanation": "'~차라리 [charari]' is Dùng để biểu thị that one option is preferable to another, often implying that the chosen option is the lesser of two evils or simply more favorable. It is typically used in the pattern: '[A] 보다는 차라리 [B]'.",
    "formation": "[A] 보다는 차라리 [B]"
  },
  "ko_처럼만_65": {
    "title": "~처럼만 [cheoreomman] (Just like, as if)",
    "shortExplanation": "Dùng để diễn tả similarity or comparison; 'just like', 'as if'.",
    "longExplanation": "'~처럼만 [cheoreomman]' is used to compare one thing to another, emphasizing an exclusive similarity. Có thể dịch là 'just like' or 'as if' trong câu.",
    "formation": "Danh từ/Mệnh đề + 처럼만"
  },
  "ko_게_66": {
    "title": "~게 하다 [ge hada] (To make)",
    "shortExplanation": "Dùng để diễn tả causing someone or something to be in a certain state.",
    "longExplanation": "'~게 하다 [ge hada]' is a verb ending used trong tiếng Hàn to indicate that someone causes or makes another person or thing perform an action or be in a certain state. The verb or adjective before it is used in its descriptive stem form. It is equivalent to 'make' or 'let' trong câu.",
    "formation": "Descriptive verb stem + 게 하다"
  },
  "ko_타다_67": {
    "title": "~타다 [tada] (To take, ride)",
    "shortExplanation": "Denotes the action of riding or taking a vehicle.",
    "longExplanation": "'~타다 [tada]' is used with means of transportation to indicate that the subject is riding or taking that vehicle to a destination. It applies to buses, taxis, subways, cars, etc.",
    "formation": "Means of transportation + 을/를 + 타다"
  },
  "ko_하게_68": {
    "title": "~하게 하다 [hage hada] (Make someone do)",
    "shortExplanation": "Used when one causes or allows someone else to perform an action.",
    "longExplanation": "The '~하게 하다 [hage hada]' structure Biểu thị that one person is causing or permitting another to do something. The action verb is conjugated with ~하게, and then 하다 is added to complete the construction. The subject causes the action, while the object is the person who performs it.",
    "formation": "Chủ ngữ + (Tân ngữ) + Động từ (in ~하게 form) + 하다"
  },
  "ko_하여야만_69": {
    "title": "~하여야만 [hayeoyaman] (Only by doing)",
    "shortExplanation": "Dùng để diễn tả that an objective can be achieved only by doing a certain action.",
    "longExplanation": "'~하여야만 [hayeoyaman]' conveys the meaning 'only by doing...' It is used to emphasize that a specific goal or result can be attained only if a certain action is performed.",
    "formation": "Động từ + 어/아 + 하여야만"
  },
  "ko_해서는_70": {
    "title": "~해서는 안 되다 [haeseoneun an dwae] (Must not, shouldn't)",
    "shortExplanation": "This grammar point is Dùng để diễn tả prohibition or things that shouldn't be done.",
    "longExplanation": "'~해서는 안 되다' is a common ending trong tiếng Hàn that translates to 'must not' or 'shouldn't'. It Biểu thị actions or behaviors that are prohibited, and it is Dùng để diễn tả restrictions, warnings, or advice. It can be attached to both action and descriptive verbs.",
    "formation": "Động từ stem + 아/어/여서 +는 안 되다"
  },
  "ko_해서야_71": {
    "title": "~해서야 [haeseoya] (In order to)",
    "shortExplanation": "Dùng để diễn tả the necessity or requirement to achieve a purpose or goal; 'in order to', 'so that'.",
    "longExplanation": "'~해서야' is a verb ending trong tiếng Hàn that Diễn tả that a certain action is required to achieve a specific goal. It is similar to 'in order to' or 'so that' trong câu, implying that the desired outcome depends on performing the action.",
    "formation": "Động từ stem + 아/어/여 + 서야"
  },
  "ko_해야겠다_72": {
    "title": "~해야겠다 [haeyagetta] (Should, must, have to)",
    "shortExplanation": "Dùng để biểu thị a strong need or determination to perform an action; 'should', 'must', 'have to'.",
    "longExplanation": "'~해야겠다' is used trong tiếng Hàn to express a firm decision or determination to carry out an action. It conveys the sense that something must be done and is often used in self-directed statements or diary entries.",
    "formation": "Động từ stem + 아/어/여야겠다"
  },
  "ko_해야지_73": {
    "title": "~해야지 [haeyaji] (I should)",
    "shortExplanation": "Dùng để diễn tả a determination or resolution; 'I should'.",
    "longExplanation": "'~해야지' is used in casual, informal speech to express a self-suggestion or resolution regarding something you plan to do. It conveys the speaker's determination to carry out an action in the future.",
    "formation": "Động từ stem + 야지"
  },
  "ko_했더니_74": {
    "title": "~했더니 [haetdeoni] (After doing something, result)",
    "shortExplanation": "Dùng để chỉ ra that an action is followed by an unexpected outcome or change.",
    "longExplanation": "'~했더니' is used trong tiếng Hàn to indicate that after an action is performed, a particular (often surprising) result occurs. It Diễn tả a cause-and-effect relationship where the outcome is notable.",
    "formation": "Động từ (in past tense) + 더니"
  },
  "ko_했었는데_75": {
    "title": "~했었는데 [haesseotneunde] (Had done but)",
    "shortExplanation": "Dùng để biểu thị an action that was completed in the past but is still connected to the present or resulted in an unexpected contrast.",
    "longExplanation": "'~했었는데' is a verb ending that Diễn tả an action completed in the past which, in context, leads to a contrast or an unexpected situation in the present.",
    "formation": "Động từ + 했었는데"
  },
  "ko_했을_76": {
    "title": "~했을 텐데 [haesseultende] (Would have done but)",
    "shortExplanation": "Dùng để diễn tả that something 'would have' happened but for some reason did not.",
    "longExplanation": "'~했을 텐데' is used trong tiếng Hàn to describe an action or state that was expected to occur but did not due to certain circumstances. It Diễn tả a contrast between expectation and reality.",
    "formation": "Động từ stem + 았/었을 텐데"
  },
  "ko_혹시_77": {
    "title": "~혹시 [hoksi] (By any chance)",
    "shortExplanation": "Dùng để diễn tả uncertainty or to make polite inquiries.",
    "longExplanation": "The expression '혹시' is used at the beginning of sentences to indicate a level of uncertainty or to politely propose a possibility. It softens questions or suggestions and is useful when inquiring about something hypothetically.",
    "formation": "혹시 + Động từ/Tính từ"
  },
  "ko_힘들다_78": {
    "title": "~힘들다 [himdeulda] (It's hard to)",
    "shortExplanation": "Dùng để diễn tả that something is difficult or hard to do.",
    "longExplanation": "'힘들다' is a common expression trong tiếng Hàn used to describe difficulty or hardship in performing an action. Có thể dịch là 'it's hard to' trong câu and often conveys a sense of struggle or challenge.",
    "formation": "Động từ stem + 기 + 힘들다"
  },
  "ko_는_79": {
    "title": "~는 김에 [neun gimae] (Used to express that someone does something while doing another action)",
    "shortExplanation": "Used to depict that someone performs a certain action while already engaged in another.",
    "longExplanation": "The ending '~는 김에' is used when one is already doing something and takes advantage of that situation to do something else. It conveys the idea of 'while you are at it' or 'since you are doing one thing, you might as well do another.'",
    "formation": "Động từ stem + ~는 김에"
  },
  "ko_기_80": {
    "title": "~기 시작하다 [sijakada] (To begin to, start to)",
    "shortExplanation": "Dùng để diễn tả that something begins to occur or a state starts to develop.",
    "longExplanation": "The form '~기 시작하다' is Dùng để biểu thị the initiation of an action or change in state. It marks the moment when something starts to happen.",
    "formation": "Động từ stem + 기 시작하다"
  },
  "ko_남다_81": {
    "title": "~남다 [namda] (To remain, be left over)",
    "shortExplanation": "Dùng để diễn tả that something remains or is left over.",
    "longExplanation": "The term '~남다' is Dùng để biểu thị that something remains – whether a physical quantity or an abstract element – after other parts have been used up or removed.",
    "formation": "Danh từ + 남다"
  },
  "ko_네요_82": {
    "title": "~네요 [neyo] (Express surprise)",
    "shortExplanation": "Used when the speaker discovers something new or unexpected.",
    "longExplanation": "The ending '~네요' is Dùng để diễn tả surprise, realization, or a newly noticed fact. It can convey sentiments such as 'I see,' 'Oh,' or 'Wow,' indicating that the speaker has become aware of something.",
    "formation": "Tính từ/Động từ stem + 네요"
  },
  "ko_다고_83": {
    "title": "~다고 [dago] (Saying that)",
    "shortExplanation": "Used to indirectly report what someone said, thought, or felt.",
    "longExplanation": "The ending '~다고' is used to quote or report someone’s speech, thoughts, or feelings indirectly. It functions similarly to saying 'saying that' trong câu.",
    "formation": "Động từ + 다고 + (다/요)"
  },
  "ko_다는_84": {
    "title": "~다는 [daneun] (The fact that)",
    "shortExplanation": "Used to denote the fact or idea that something has been stated or quoted.",
    "longExplanation": "'~다는' is used to emphasize the content of a statement or the fact that something is said or known. It is often used when reporting or conveying information that was heard from another source.",
    "formation": "Động từ/Tính từ + 다는"
  },
  "ko_다면서요_85": {
    "title": "~다면서요 [damyeonseyo] (Said that)",
    "shortExplanation": "Used when quoting someone's words or conveying information heard from someone else.",
    "longExplanation": "The expression '~다면서요' is used to relay information that was reported or said by someone else. It combines the declarative form with a quoting marker to indicate that the speaker is passing along what was heard.",
    "formation": "Động từ + 다면서요"
  },
  "ko_던데_86": {
    "title": "~던데 [deonde] (Used to)",
    "shortExplanation": "Dùng để diễn tả reminiscence or describe how something used to be.",
    "longExplanation": "The ending '~던데' is a past tense form used to recall how things were in the past. It is often used in a reminiscing context or to highlight a contrast between past and present.",
    "formation": "Động từ in past tense + 던데"
  },
  "ko_도록_87": {
    "title": "~도록 하다 [dorok hada] (To try to, to make sure to)",
    "shortExplanation": "Dùng để diễn tả the intention of making something happen or ensuring an action occurs.",
    "longExplanation": "The structure '~도록 하다' is used when someone takes measures or makes an effort to ensure that a certain action or state is achieved. It implies intention or control over making something happen.",
    "formation": "Động từ stem + 기 / Danh từ + 도록 하다"
  },
  "ko_든지_88": {
    "title": "~든지 [deunji] (Whether or)",
    "shortExplanation": "Dùng để diễn tả indecision between two or more options; 'whether or'.",
    "longExplanation": "The conjunction '~든지' is Dùng để biểu thị that any of the given alternatives is acceptable or that the speaker is indifferent about the choice. It is often Dùng để chỉ ra that no matter which option is chosen, the outcome will be similar.",
    "formation": "Danh từ/V-아/어/여 + 든지 + Danh từ/V-아/어/여 + 든지"
  },
  "ko_라는_89": {
    "title": "~라는 것이다 [raneun geosida] (It means that)",
    "shortExplanation": "Dùng để biểu thị or define the meaning of a statement; 'it means that'.",
    "longExplanation": "'~라는 것이다' is a grammatical structure that turns a clause into a noun phrase to explain or define its implication. It is commonly used after a verb or descriptive verb to emphasize that something signifies a particular fact or idea.",
    "formation": "Động từ + 라는 것이다 OR Descriptive Động từ + 라는 것이다"
  },
  "ko_라도_90": {
    "title": "~라도 [rado] (At least, even if)",
    "shortExplanation": "Dùng để diễn tả 'at least' or 'even if'.",
    "longExplanation": "'~라도' is Dùng để biểu thị a minimum or acceptable alternative. It can be attached to a noun or verb stem to mean 'at least' or 'even if' under a given condition, often softening a statement or presenting a fallback option.",
    "formation": "Danh từ/Động từ Stem + -라도"
  },
  "ko_러_91": {
    "title": "~러 [reo] (In order to)",
    "shortExplanation": "Dùng để biểu thị the purpose or intention of an action; 'in order to'.",
    "longExplanation": "'~러' is a grammar pattern attached to a verb stem to Diễn tả purpose or intent of an action. It is equivalent to 'in order to' or 'for the purpose of' trong câu and is commonly used when going somewhere or doing something with a specific goal in mind.",
    "formation": "Động từ Stem + ~러"
  },
  "ko_려고_92": {
    "title": "~려고 하다 [ryeogo hada] (Try to)",
    "shortExplanation": "Dùng để diễn tả an intention or attempt to do something; 'try to'.",
    "longExplanation": "The construction '~려고 하다' is used to convey an intention, plan, or attempt to do something. It Diễn tả a planned future action or an effort, without guaranteeing success.",
    "formation": "Động từ Stem + 려고 하다"
  },
  "ko_려는_93": {
    "title": "~려는 [ryeoneun] (Intending to)",
    "shortExplanation": "Dùng để diễn tả a future intention, plan, or aim.",
    "longExplanation": "~려는 is Dùng để biểu thị that someone intends or plans to do something in the future. It carries the nuance of will or purpose, even if the outcome is not yet decided.",
    "formation": "Động từ Stem + ~려는"
  },
  "ko_로써_94": {
    "title": "~로써 [rossyeo] (By means of)",
    "shortExplanation": "Dùng để biểu thị the role, means, or capacity in which something is done.",
    "longExplanation": "'~로써' is used after a noun to Diễn tả manner or capacity in which an action is performed – similar to saying 'by means of' or 'as' trong câu.",
    "formation": "Danh từ + 로써"
  },
  "ko_를_95": {
    "title": "~를 바탕으로 [reul batageuro] (Based on)",
    "shortExplanation": "Dùng để diễn tả the basis or foundation upon which something is derived.",
    "longExplanation": "The phrase '~를 바탕으로' is Dùng để biểu thị that an action, decision, or creation is based on certain data, facts, or experience. Có thể dịch là 'on the basis of' or 'based on' trong câu.",
    "formation": "Danh từ + 를 바탕으로"
  },
  "ko_를_96": {
    "title": "~를 통해 [reul tonghae] (Through, by means of)",
    "shortExplanation": "Dùng để diễn tả the medium or method by which something is done or achieved.",
    "longExplanation": "'~를 통해' is a postposition Dùng để biểu thị the means, method, or channel through which an action is performed. It is equivalent to 'through', 'by means of', or 'via' trong câu.",
    "formation": "Danh từ + 를 통해"
  },
  "ko_만큼_97": {
    "title": "~만큼 [mankeum] (As much as)",
    "shortExplanation": "Dùng để diễn tả the amount, level, or extent equivalent to a certain standard; 'as much as', 'as...as'.",
    "longExplanation": "'~만큼 [mankeum]' is a postposition used trong tiếng Hàn to demonstrate equivalence in extent, amount, or level with a given reference. It is used to compare two things, implying that they have the same level or quantity. It can be interpreted as 'as much as' or 'as...as' trong câu.",
    "formation": "Danh từ/Động từ + 만큼"
  },
  "ko_마저_98": {
    "title": "~마저 [majeo] (Even)",
    "shortExplanation": "Dùng để diễn tả the unexpected inclusion; 'even'.",
    "longExplanation": "'~마저 [majeo]' is a postposition used trong tiếng Hàn to Diễn tả inclusion of someone or something that is not normally expected. It carries a sense of surprise or disbelief, similar to 'even' trong câu.",
    "formation": "Danh từ + 마저"
  },
  "ko_못하다_99": {
    "title": "~못하다 [mothada] (Cannot)",
    "shortExplanation": "Dùng để diễn tả inability or impossibility; 'cannot'.",
    "longExplanation": "'~못하다 [mothada]' is used trong tiếng Hàn with action verbs to indicate that the action cannot be performed. It conveys the speaker’s inability or impossibility to carry out the action.",
    "formation": "Action Động từ Stem + 못하다"
  },
  "ko_바라다_100": {
    "title": "~바라다 [barada] (Hope to)",
    "shortExplanation": "Dùng để diễn tả the speaker's hope or wish for something.",
    "longExplanation": "'~바라다 [barada]' is used after a verb stem to express a personal hope or wish. It conveys that the speaker looks forward to or wishes for a particular outcome in the future.",
    "formation": "Động từ Stem + 바라다"
  },
  "ko_밖에_101": {
    "title": "~밖에 [bakke] (Only, nothing but)",
    "shortExplanation": "Dùng để diễn tả limitation; 'only', 'nothing but', or 'except'.",
    "longExplanation": "'~밖에 [bakke]' is used trong tiếng Hàn with negative sentences to indicate that nothing else exists beyond what is mentioned. It emphasizes the limited or exclusive nature of the subject or object.",
    "formation": "Danh từ + 밖에 + Negative Động từ"
  },
  "ko_본_102": {
    "title": "~본 [bon] (Having experienced)",
    "shortExplanation": "Dùng để diễn tả that the speaker has experienced or done something.",
    "longExplanation": "'~본 [bon]' is attached to action verbs to indicate that the speaker has experienced or tried that action. It is typically used when sharing personal experiences or anecdotes.",
    "formation": "Action Động từ + 본"
  },
  "ko_부터가_103": {
    "title": "~부터가 [buteoga] (Starting from)",
    "shortExplanation": "Biểu thị that the occurrence of an action or state begins at a certain point, time, or place.",
    "longExplanation": "'~부터가 [buteoga]' combines '부터' (starting from) with the subject particle '가' to emphasize that things truly begin from that point. It is used to stress that from that moment or place onward, the state or action is in effect.",
    "formation": "Danh từ + 부터가"
  },
  "ko_뿐이다_104": {
    "title": "~뿐이다 [ppunida] (Only, just)",
    "shortExplanation": "Dùng để biểu thị 'only' or 'just'.",
    "longExplanation": "'~뿐이다 [ppunida]' Diễn tả exclusivity by stating that nothing else exists beyond what is mentioned. It is used to emphasize limitation or singularity and is typically found with a negative verb.",
    "formation": "Danh từ + 뿐이다"
  },
  "ko_사이에서_105": {
    "title": "~사이에서 [saieseo] (Between)",
    "shortExplanation": "Dùng để biểu thị 'between' or 'among'.",
    "longExplanation": "'~사이에서 [saieseo]' is a postposition used trong tiếng Hàn to denote a position within a range or to specify a selection between multiple options. It is used with both tangible objects and abstract choices.",
    "formation": "Danh từ + 사이에서"
  },
  "ko_서야_106": {
    "title": "~서야 [seoya] (Only after)",
    "shortExplanation": "Dùng để biểu thị that a result is possible only if a preceding action or condition is fulfilled.",
    "longExplanation": "'~서야 [seoya]' is formed by attaching the ending '-서야' to a verb stem. It Diễn tả that only when the preceding action is done (or the condition is met) can the subsequent result occur.",
    "formation": "Động từ stem + 서야"
  },
  "ko_소서_107": {
    "title": "~소서 [soseo] (Polite way to apologize for an action)",
    "shortExplanation": "Dùng để diễn tả apology or regret in a very polite and formal manner.",
    "longExplanation": "The verb ending '~소서 [soseo]' is an archaic and formal way to apologize or express deep regret. It is typically used in formal or public settings, especially when addressing someone of higher status, to show sincere remorse and respect.",
    "formation": "Động từ stem + ~소서"
  },
  "ko_않게_108": {
    "title": "~않게 [anhge] (So as not to)",
    "shortExplanation": "Dùng để diễn tả doing something in such a way as to prevent a certain outcome.",
    "longExplanation": "'~않게 [anhge]' is a grammatical construction formed by attaching ‘않게’ to a verb stem. It Diễn tả the speaker’s intention to avoid or prevent an action, situation, or condition from occurring – similar to saying 'so as not to' trong câu.",
    "formation": "Động từ stem + 않게"
  },
  "ko_아어_109": {
    "title": "~아/어 버리다 [a/eo beorida] (To completely)",
    "shortExplanation": "Used to emphasize that an action is done completely or to its end.",
    "longExplanation": "The phrase '~아/어 버리다 [a/eo beorida]' attaches to a verb stem to indicate that an action is carried out completely or thoroughly, often adding a sense of finality. Depending on the context, it may express regret, surprise, or relief. This form is common in casual spoken Korean.",
    "formation": "Động từ stem + ~아/어 버리다"
  },
  "ko_아어_110": {
    "title": "~아/어 놓다 [a/eo notda] (To have done something in advance)",
    "shortExplanation": "Dùng để biểu thị that an action was performed ahead of time in preparation for something else.",
    "longExplanation": "'~아/어 놓다 [a/eo notda]' is Dùng để diễn tả that an action has been done beforehand—either to prepare for a future event or to leave something in a completed state. This form is common in everyday conversation and adds nuance to your sentence structure.",
    "formation": "Động từ stem + 아/어 놓다"
  },
  "ko_아어_111": {
    "title": "~아/어 달라다 [a/eo dallada] (To ask for)",
    "shortExplanation": "Used to make a request or ask someone to do something.",
    "longExplanation": "'~아/어 달라다 [a/eo dallada]' is a form derived from the verb '달라하다' used when requesting or asking someone to do something. It is formed by conjugating the verb into its 아/어 form and then adding 달라다.",
    "formation": "Động từ (아/어 form) + 달라다"
  },
  "ko_아어_112": {
    "title": "~아/어 대다 [a/eo daeda] (To do aimlessly)",
    "shortExplanation": "Dùng để biểu thị that an action is done without a clear purpose or merely out of idleness.",
    "longExplanation": "'~아/어 대다 [a/eo daeda]' attaches to a verb stem to express that the action is performed aimlessly, without proper thought, or in an idle, unproductive manner.",
    "formation": "Động từ stem + 아/어 + 대다"
  },
  "ko_아어_113": {
    "title": "~아/어 보이다 [a/eo boida] (To seem, appear)",
    "shortExplanation": "Dùng để diễn tả that something appears or seems to be a certain way.",
    "longExplanation": "The grammar point '~아/어 보이다 [a/eo boida]' is Dùng để biểu thị that something looks or appears a certain way according to the speaker's perception or judgment. It is often used to describe appearances, conditions, or states based on external observation.",
    "formation": "Động từ stem + 아/어 + 보이다"
  },
  "ko_아어_114": {
    "title": "~아/어 서는 [a/eo seoneun] (Although)",
    "shortExplanation": "Dùng để diễn tả a contrast or contrary expectation; 'although' or 'but'.",
    "longExplanation": "'~아/어 서는 [a/eo seoneun]' is used to present a situation that contrasts with or contradicts an expectation. Có thể dịch là 'although' or 'but' and highlights an unexpected or contrary fact.",
    "formation": "Động từ stem + 아/어 서는"
  },
  "ko_아어야만_115": {
    "title": "~아/어야만 [a/eoyaman] (Only if/when)",
    "shortExplanation": "Dùng để diễn tả a condition that only if/when something happens, something else will or can occur.",
    "longExplanation": "The phrase '~아/어야만' is a conditional form trong tiếng Hàn that Diễn tả the idea that only if/when a certain condition is satisfied can an expected result occur. This grammar point Biểu thị that an action or state is contingent on a condition being fulfilled; without that condition, the action or state is impossible. It is often used with potential or hypothetical situations.",
    "formation": "Động từ + 아/어야만 (Depending on the final vowel of the verb stem)"
  },
  "ko_아어지다_116": {
    "title": "~아/어지다 [a/eojida] (To become)",
    "shortExplanation": "Dùng để diễn tả a change of state, meaning 'to become'.",
    "longExplanation": "'~아/어지다' is a verb ending used trong tiếng Hàn to indicate a change in state, condition, or emotion—essentially, 'to become'. The ending is chosen based on the vowel in the preceding syllable (use '아지다' after ㅏ or ㅗ, and '어지다' for all other vowels). It is often Dùng để chỉ ra a transition from one state to another.",
    "formation": "Action verb stem + (~아/어지다)"
  },
  "ko_았었_117": {
    "title": "~았/었 던 [at/eot deon] (Past descriptive)",
    "shortExplanation": "Used to describe past events or situations from the speaker's memory.",
    "longExplanation": "'~았/었 던' is a past descriptive form trong tiếng Hàn used to recall an event, person, or situation that occurred in the past. It is commonly attached to a verb (forming '보던') when modifying a noun and Diễn tả a past state or memory from the speaker’s perspective.",
    "formation": "Động từ in past tense (~았/었) + 던 (attached before a noun)"
  },
  "ko_았었으면_118": {
    "title": "~았/었으면 좋겠다 [at/eosseumyeon jokgetda] (Wish something had happened)",
    "shortExplanation": "Dùng để diễn tả a wish or hope that something had occurred in the past.",
    "longExplanation": "'~았/었으면 좋겠다' is a grammar construction trong tiếng Hàn that Diễn tả a speaker's wish or regret about a past event that did not occur. By combining a verb in the past tense with '으면 좋겠다', it conveys a longing for a different past outcome.",
    "formation": "Động từ (past tense) + 았/었으면 좋겠다"
  }
};

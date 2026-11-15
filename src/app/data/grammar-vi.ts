import { GrammarPattern } from '../models/grammar.model';

/**
 * Curated Vietnamese grammar patterns organized by CEFR proficiency levels (A1-C1).
 * Pattern strings use canonical searchable forms; structures are shown in `formation`.
 */
export const GRAMMAR_VI: GrammarPattern[] = [
  // ============================================================================
  // CEFR A1 (16 core beginner patterns)
  // ============================================================================
  {
    id: 'vi_a1_01',
    language: 'vi',
    pattern: 'là',
    title: 'là — Identity & Copula (to be)',
    shortExplanation: 'Links a subject to a noun, role, or identity (equates A and B). Never used directly before adjectives.',
    longExplanation: 'In Vietnamese, "là" functions like "to be" only when identifying or classifying nouns (professions, nationalities, names). Unlike English, adjectives act as stative verbs and do not take "là" (say "Cô ấy vui", not "Cô ấy là vui").',
    formation: 'Chủ ngữ + là + Danh từ',
    level: 'CEFR A1',
    examples: [
      { sentence: 'Tôi là sinh viên.', translation: 'I am a student.' },
      { sentence: 'Đây là bạn của tôi.', translation: 'This is my friend.' },
    ],
  },
  {
    id: 'vi_a1_02',
    language: 'vi',
    pattern: 'không phải',
    title: 'không phải — Negative Identity (is not)',
    shortExplanation: 'Negates noun identity or statements ("is not ...").',
    longExplanation: 'To negate "là" or clarify that something is not the case, use "không phải (là)" before a noun or clause. Using bare "không là" is unnatural for noun negation.',
    formation: 'Chủ ngữ + không phải (là) + Danh từ',
    level: 'CEFR A1',
    examples: [
      { sentence: 'Anh ấy không phải là bác sĩ.', translation: 'He is not a doctor.' },
      { sentence: 'Cái này không phải của tôi.', translation: 'This is not mine.' },
    ],
  },
  {
    id: 'vi_a1_03',
    language: 'vi',
    pattern: 'không',
    title: 'không — General Negation (not)',
    shortExplanation: 'Negates verbs and adjectives directly before the predicate ("not").',
    longExplanation: 'Place "không" directly before a verb or adjective to negate it. Vietnamese verbs do not conjugate for person or tense.',
    formation: 'Chủ ngữ + không + Động từ / Tính từ',
    level: 'CEFR A1',
    examples: [
      { sentence: 'Hôm nay tôi không bận.', translation: 'Today I am not busy.' },
      { sentence: 'Cô ấy không uống cà phê.', translation: 'She does not drink coffee.' },
    ],
  },
  {
    id: 'vi_a1_04',
    language: 'vi',
    pattern: 'đang',
    title: 'đang — Progressive Aspect (in the middle of)',
    shortExplanation: 'Marks an action currently in progress ("be + V-ing").',
    longExplanation: 'Placed directly before the main verb, "đang" indicates an ongoing action at the moment of speaking or at a referenced point in time.',
    formation: 'Chủ ngữ + đang + Động từ',
    level: 'CEFR A1',
    examples: [
      { sentence: 'Tôi đang học tiếng Việt.', translation: 'I am studying Vietnamese.' },
      { sentence: 'Trời đang mưa to.', translation: 'It is raining heavily.' },
    ],
  },
  {
    id: 'vi_a1_05',
    language: 'vi',
    pattern: 'đã',
    title: 'đã — Past / Completed Aspect',
    shortExplanation: 'Indicates an action or state that occurred in the past or is already fulfilled.',
    longExplanation: 'Placed before a verb or adjective, "đã" signals past time or completed transition. In casual speech it is often omitted when clear time words like "hôm qua" are present, or paired with "rồi".',
    formation: 'Chủ ngữ + đã + Động từ (+ rồi)',
    level: 'CEFR A1',
    examples: [
      { sentence: 'Tôi đã ăn sáng rồi.', translation: 'I already ate breakfast.' },
      { sentence: 'Tuần trước họ đã đi Hà Nội.', translation: 'Last week they went to Hanoi.' },
    ],
  },
  {
    id: 'vi_a1_06',
    language: 'vi',
    pattern: 'sẽ',
    title: 'sẽ — Future Tense Marker (will)',
    shortExplanation: 'Marks an anticipated, planned, or promised future action ("will").',
    longExplanation: '"Sẽ" goes before the verb to express future events, intentions, or predictions. Unlike "sắp" (about to), "sẽ" does not imply immediacy.',
    formation: 'Chủ ngữ + sẽ + Động từ',
    level: 'CEFR A1',
    examples: [
      { sentence: 'Ngày mai tôi sẽ gọi cho bạn.', translation: 'Tomorrow I will call you.' },
      { sentence: 'Chúng tôi sẽ ở lại đây ba ngày.', translation: 'We will stay here for three days.' },
    ],
  },
  {
    id: 'vi_a1_07',
    language: 'vi',
    pattern: 'có thể',
    title: 'có thể — Ability & Possibility (can / may)',
    shortExplanation: 'Expresses ability, permission, or possibility before a verb.',
    longExplanation: 'Combines "có" and "thể" before a verb to mean "can", "be able to", or "might". Negate with "không thể" (cannot).',
    formation: 'Chủ ngữ + (không) có thể + Động từ',
    level: 'CEFR A1',
    examples: [
      { sentence: 'Bạn có thể nói chậm hơn không?', translation: 'Can you speak more slowly?' },
      { sentence: 'Hôm nay tôi không thể đến.', translation: 'I cannot come today.' },
    ],
  },
  {
    id: 'vi_a1_08',
    language: 'vi',
    pattern: 'muốn',
    title: 'muốn — Desire & Intention (want to)',
    shortExplanation: 'Expresses wanting an object or wanting to perform an action.',
    longExplanation: 'Follow "muốn" directly with a noun ("want X") or another verb ("want to do X").',
    formation: 'Chủ ngữ + muốn + Động từ / Danh từ',
    level: 'CEFR A1',
    examples: [
      { sentence: 'Tôi muốn uống trà sữa.', translation: 'I want to drink milk tea.' },
      { sentence: 'Bạn muốn đi đâu cuối tuần này?', translation: 'Where do you want to go this weekend?' },
    ],
  },
  {
    id: 'vi_a1_09',
    language: 'vi',
    pattern: 'những',
    title: 'những — Indefinite Pluralizer',
    shortExplanation: 'Pluralizes a subset of countable nouns ("some / the ...").',
    longExplanation: 'Placed before a classifier + noun (or bare noun), "những" denotes multiple items without referring to an entire group (contrast with "các", which implies all members of a set).',
    formation: 'những + (Loại từ) + Danh từ',
    level: 'CEFR A1',
    examples: [
      { sentence: 'Tôi thích những món ăn này.', translation: 'I like these dishes.' },
      { sentence: 'Những ngày đầu rất khó khăn.', translation: 'The first days were very difficult.' },
    ],
  },
  {
    id: 'vi_a1_10',
    language: 'vi',
    pattern: 'các',
    title: 'các — Collective Pluralizer (all / the)',
    shortExplanation: 'Pluralizes an entire group or audience ("all the ...").',
    longExplanation: '"Các" precedes nouns or classifiers to refer to every member of a defined group, and is standard in greetings ("các bạn", "các anh chị").',
    formation: 'các + (Loại từ) + Danh từ',
    level: 'CEFR A1',
    examples: [
      { sentence: 'Chào các bạn!', translation: 'Hello everyone!' },
      { sentence: 'Các học sinh đang làm bài.', translation: 'The students are doing their exercises.' },
    ],
  },
  {
    id: 'vi_a1_11',
    language: 'vi',
    pattern: 'hơn',
    title: 'hơn — Comparative Degree (more than)',
    shortExplanation: 'Compares two items on a quality ("A is more ADJ than B").',
    longExplanation: 'Follows an adjective or adverb; the standard of comparison B comes right after "hơn". Omit B to simply mean "...er / more".',
    formation: 'A + Tính từ + hơn + B',
    level: 'CEFR A1',
    examples: [
      { sentence: 'Hôm nay nóng hơn hôm qua.', translation: 'Today is hotter than yesterday.' },
      { sentence: 'Cái áo này đẹp hơn.', translation: 'This shirt is nicer.' },
    ],
  },
  {
    id: 'vi_a1_12',
    language: 'vi',
    pattern: 'nhất',
    title: 'nhất — Superlative Degree (the most / -est)',
    shortExplanation: 'Marks the highest degree of a quality ("the most ...").',
    longExplanation: 'Placed immediately after an adjective or stative verb (and some verbs like "thích nhất" = like most) to form the superlative.',
    formation: 'Tính từ / Động từ + nhất',
    level: 'CEFR A1',
    examples: [
      { sentence: 'Đây là quán ngon nhất.', translation: 'This is the most delicious restaurant.' },
      { sentence: 'Tôi thích mùa thu nhất.', translation: 'I like autumn the most.' },
    ],
  },
  {
    id: 'vi_a1_13',
    language: 'vi',
    pattern: 'bao nhiêu',
    title: 'bao nhiêu — Asking Quantity or Price (how much/many)',
    shortExplanation: 'Asks for prices, quantities, or measurements.',
    longExplanation: 'Usually appears at the end of price questions ("bao nhiêu tiền?") or before uncountable/plural nouns.',
    formation: 'Danh từ + bao nhiêu / giá bao nhiêu',
    level: 'CEFR A1',
    examples: [
      { sentence: 'Ly này bao nhiêu tiền?', translation: 'How much is this cup?' },
      { sentence: 'Bạn cần bao nhiêu thời gian?', translation: 'How much time do you need?' },
    ],
  },
  {
    id: 'vi_a1_14',
    language: 'vi',
    pattern: 'tại sao',
    title: 'tại sao — Asking Why',
    shortExplanation: 'Introduces a "why" question asking for a reason.',
    longExplanation: 'Commonly placed at the start of a question ("Tại sao bạn không đi?") or occasionally at the end for emphasis.',
    formation: 'Tại sao + Chủ ngữ + Động từ?',
    level: 'CEFR A1',
    examples: [
      { sentence: 'Tại sao bạn học tiếng Việt?', translation: 'Why are you learning Vietnamese?' },
      { sentence: 'Tại sao hôm qua anh không gọi?', translation: 'Why didn’t you call yesterday?' },
    ],
  },
  {
    id: 'vi_a1_15',
    language: 'vi',
    pattern: 'như thế nào',
    title: 'như thế nào — Asking How / What Kind',
    shortExplanation: 'Asks about manner, method, condition, or description ("how?").',
    longExplanation: 'Placed after a verb or subject to ask how an action is performed or how something feels/looks.',
    formation: 'Chủ ngữ + Động từ + như thế nào?',
    level: 'CEFR A1',
    examples: [
      { sentence: 'Công việc của bạn như thế nào?', translation: 'How is your work going?' },
      { sentence: 'Món này nấu như thế nào?', translation: 'How do you cook this dish?' },
    ],
  },
  {
    id: 'vi_a1_16',
    language: 'vi',
    pattern: 'nhé',
    title: 'nhé — Friendly Suggestion / Softener',
    shortExplanation: 'Sentence-final particle turning a request or proposal into a warm suggestion.',
    longExplanation: 'Placed at the end of sentences among friends or slightly younger listeners to mean "okay?", "let’s...", or to soften commands politely.',
    formation: 'Câu đề nghị + nhé',
    level: 'CEFR A1',
    examples: [
      { sentence: 'Mình đi ăn trưa nhé!', translation: 'Let’s go get lunch, okay?' },
      { sentence: 'Nhớ nhắn tin cho anh nhé.', translation: 'Remember to text me, okay?' },
    ],
  },

  // ============================================================================
  // CEFR A2 (16 elementary patterns)
  // ============================================================================
  {
    id: 'vi_a2_01',
    language: 'vi',
    pattern: 'phải',
    title: 'phải — Obligation & Necessity (must / have to)',
    shortExplanation: 'Expresses external obligation, rules, or necessity ("must / have to").',
    longExplanation: 'Placed before a verb to show duty or necessity. Note that "không phải" means "not true / is not", whereas "không cần phải" means "don’t have to".',
    formation: 'Chủ ngữ + phải + Động từ',
    level: 'CEFR A2',
    examples: [
      { sentence: 'Tôi phải hoàn thành báo cáo hôm nay.', translation: 'I have to finish the report today.' },
      { sentence: 'Bạn phải dậy sớm ngày mai.', translation: 'You must wake up early tomorrow.' },
    ],
  },
  {
    id: 'vi_a2_02',
    language: 'vi',
    pattern: 'được',
    title: 'được — Beneficial Passive / Permission / Result',
    shortExplanation: 'Marks passive voice for positive/neutral events, permission ("allowed to"), or achieved capability.',
    longExplanation: 'Before a verb, "được" expresses permission ("được phép") or a positive passive ("I got praised"). After a verb, it signals successful potential ("làm được").',
    formation: 'Chủ ngữ + được + (Ai đó) + Động từ',
    level: 'CEFR A2',
    examples: [
      { sentence: 'Cô ấy được thầy giáo khen.', translation: 'She was praised by the teacher.' },
      { sentence: 'Ở đây có được chụp ảnh không?', translation: 'Are you allowed to take photos here?' },
    ],
  },
  {
    id: 'vi_a2_03',
    language: 'vi',
    pattern: 'bị',
    title: 'bị — Adversative Passive (suffer / undergo)',
    shortExplanation: 'Marks negative, unwanted, or unfortunate events ("get ...ed / suffer ...").',
    longExplanation: 'Paired with a verb or adjective expressing discomfort or misfortune (sick, scolded, delayed, rained on). Never use "bị" for pleasant outcomes (use "được").',
    formation: 'Chủ ngữ + bị + (Tác nhân) + Động từ / Tính từ xấu',
    level: 'CEFR A2',
    examples: [
      { sentence: 'Tôi bị kẹt xe gần một tiếng.', translation: 'I got stuck in traffic for nearly an hour.' },
      { sentence: 'Điện thoại của mình bị hết pin rồi.', translation: 'My phone ran out of battery.' },
    ],
  },
  {
    id: 'vi_a2_04',
    language: 'vi',
    pattern: 'sắp',
    title: 'sắp — Immediate Future (about to)',
    shortExplanation: 'Indicates an event that will happen very soon ("about to / soon").',
    longExplanation: 'Placed before verbs or seasonal nouns ("sắp Tết") to express imminence, closer in time than "sẽ".',
    formation: 'Chủ ngữ + sắp + Động từ',
    level: 'CEFR A2',
    examples: [
      { sentence: 'Tàu sắp chạy rồi.', translation: 'The train is about to depart.' },
      { sentence: 'Chúng ta sắp đến nơi chưa?', translation: 'Are we almost there yet?' },
    ],
  },
  {
    id: 'vi_a2_05',
    language: 'vi',
    pattern: 'vừa',
    title: 'vừa — Recent Past (just happened)',
    shortExplanation: 'Shows that an action was completed only moments ago ("just did").',
    longExplanation: 'Placed before a verb (often reinforced as "vừa mới") to indicate immediacy in the past.',
    formation: 'Chủ ngữ + vừa (mới) + Động từ',
    level: 'CEFR A2',
    examples: [
      { sentence: 'Anh ấy vừa rời khỏi văn phòng.', translation: 'He just left the office.' },
      { sentence: 'Tôi vừa mới nghe tin đó.', translation: 'I just heard that news.' },
    ],
  },
  {
    id: 'vi_a2_06',
    language: 'vi',
    pattern: 'vẫn',
    title: 'vẫn — Continuity (still)',
    shortExplanation: 'Indicates a state or action continues unchanged ("still").',
    longExplanation: 'Placed before a verb or adjective (often paired with "còn") to emphasize persistence despite expectations or time passing.',
    formation: 'Chủ ngữ + vẫn (còn) + Động từ / Tính từ',
    level: 'CEFR A2',
    examples: [
      { sentence: 'Khuya rồi mà bạn vẫn thức à?', translation: 'It’s late and you’re still awake?' },
      { sentence: 'Quán đó vẫn mở cửa.', translation: 'That shop is still open.' },
    ],
  },
  {
    id: 'vi_a2_07',
    language: 'vi',
    pattern: 'chưa bao giờ',
    title: 'chưa bao giờ — Experiential Negation (never yet)',
    shortExplanation: 'Means "have never done ... before (up to now)".',
    longExplanation: 'Combines "chưa" (not yet) with "bao giờ" (ever) before a verb to deny any prior life experience.',
    formation: 'Chủ ngữ + chưa bao giờ + Động từ',
    level: 'CEFR A2',
    examples: [
      { sentence: 'Tôi chưa bao giờ đến Đà Lạt.', translation: 'I have never been to Da Lat.' },
      { sentence: 'Chưa bao giờ tôi thấy cảnh đẹp thế này.', translation: 'I have never seen such a beautiful view.' },
    ],
  },
  {
    id: 'vi_a2_08',
    language: 'vi',
    pattern: 'đã từng',
    title: 'đã từng — Past Experience (used to / have ever)',
    shortExplanation: 'Highlights an experience one has had at least once in the past.',
    longExplanation: 'Placed before a verb to focus on life experience rather than a specific timestamp ("used to" or "have done before").',
    formation: 'Chủ ngữ + (đã) từng + Động từ',
    level: 'CEFR A2',
    examples: [
      { sentence: 'Bạn đã từng ăn phở Hà Nội chưa?', translation: 'Have you ever eaten Hanoi pho?' },
      { sentence: 'Trước đây cô ấy từng sống ở Nhật.', translation: 'She used to live in Japan before.' },
    ],
  },
  {
    id: 'vi_a2_09',
    language: 'vi',
    pattern: 'vì ... nên',
    title: 'vì ... nên — Cause and Effect (because ... therefore)',
    shortExplanation: 'Connects a reason clause and its consequence ("because ... so ...").',
    longExplanation: 'Unlike English (where "because" and "so" cannot appear together), Vietnamese naturally pairs "vì / bởi vì" in the first clause with "nên" in the result clause.',
    formation: '(Bởi) vì + Nguyên nhân, nên + Kết quả',
    level: 'CEFR A2',
    examples: [
      { sentence: 'Vì trời mưa nên chúng tôi ở nhà.', translation: 'Because it rained, we stayed home.' },
      { sentence: 'Vì bận quá nên anh ấy quên gọi.', translation: 'Because he was too busy, he forgot to call.' },
    ],
  },
  {
    id: 'vi_a2_10',
    language: 'vi',
    pattern: 'nếu ... thì',
    title: 'nếu ... thì — Conditional Clause (if ... then)',
    shortExplanation: 'Expresses real or hypothetical conditions and their outcomes.',
    longExplanation: '"Nếu" introduces the condition and "thì" introduces the consequence. Either marker can occasionally be omitted in fast speech.',
    formation: 'Nếu + Điều kiện, (thì) + Kết quả',
    level: 'CEFR A2',
    examples: [
      { sentence: 'Nếu có thời gian thì mình ghé qua nhé.', translation: 'If we have time, let’s stop by.' },
      { sentence: 'Nếu trời nắng thì chúng ta đi biển.', translation: 'If it’s sunny, we will go to the beach.' },
    ],
  },
  {
    id: 'vi_a2_11',
    language: 'vi',
    pattern: 'trước khi',
    title: 'trước khi — Sequence: Before Doing X',
    shortExplanation: 'Sets a time boundary before an event ("before ...").',
    longExplanation: 'Can precede a complete clause ("trước khi bạn đi") or an action verb phrase ("trước khi ngủ").',
    formation: 'Trước khi + (Chủ ngữ) + Động từ, Mệnh đề chính',
    level: 'CEFR A2',
    examples: [
      { sentence: 'Nhớ tắt đèn trước khi ra ngoài.', translation: 'Remember to turn off the lights before going out.' },
      { sentence: 'Trước khi ăn cơm, mình rửa tay đã.', translation: 'Before eating, let’s wash our hands first.' },
    ],
  },
  {
    id: 'vi_a2_12',
    language: 'vi',
    pattern: 'sau khi',
    title: 'sau khi — Sequence: After Doing X',
    shortExplanation: 'Marks an action that takes place once another action finishes ("after ...").',
    longExplanation: 'Introduces a completed prior event followed by the main clause (often linked with "thì").',
    formation: 'Sau khi + (Chủ ngữ) + Động từ, (thì) + Mệnh đề chính',
    level: 'CEFR A2',
    examples: [
      { sentence: 'Sau khi tốt nghiệp, tôi đi làm ngay.', translation: 'After graduating, I started working right away.' },
      { sentence: 'Mình uống trà sau khi ăn tối nhé.', translation: 'Let’s drink tea after dinner.' },
    ],
  },
  {
    id: 'vi_a2_13',
    language: 'vi',
    pattern: 'giống như',
    title: 'giống như — Similarity & Resemblance (like / similar to)',
    shortExplanation: 'Compares two things or situations to highlight similarity.',
    longExplanation: 'Used between nouns or before a descriptive clause to mean "just like" or "similar to".',
    formation: 'A + giống (như) + B',
    level: 'CEFR A2',
    examples: [
      { sentence: 'Giọng bạn giống như người Hà Nội.', translation: 'Your accent sounds just like a Hanoian’s.' },
      { sentence: 'Hôm nay nóng giống như mùa hè vậy.', translation: 'Today is hot just like summer.' },
    ],
  },
  {
    id: 'vi_a2_14',
    language: 'vi',
    pattern: 'thử',
    title: 'thử — Attempt / Trying Something Out',
    shortExplanation: 'Used with verbs to mean "try doing something" to see what happens.',
    longExplanation: 'Placed right after an action verb (or occasionally before it in "thử + V") to invite or describe an attempt.',
    formation: 'Động từ + thử (+ xem)',
    level: 'CEFR A2',
    examples: [
      { sentence: 'Bạn ăn thử món bún bò này đi.', translation: 'Try eating this beef noodle soup.' },
      { sentence: 'Để mình gọi thử cho cô ấy xem sao.', translation: 'Let me try calling her to see how it goes.' },
    ],
  },
  {
    id: 'vi_a2_15',
    language: 'vi',
    pattern: 'để',
    title: 'để — Purpose ("in order to / so that")',
    shortExplanation: 'States the goal or purpose behind an action.',
    longExplanation: 'Connects an action with its intended purpose; can precede a verb phrase or a full clause with a new subject.',
    formation: 'Mệnh đề 1 + để + (Chủ ngữ) + Động từ',
    level: 'CEFR A2',
    examples: [
      { sentence: 'Tôi dậy sớm để tập thể dục.', translation: 'I wake up early in order to exercise.' },
      { sentence: 'Nói to lên để mọi người cùng nghe.', translation: 'Speak louder so everyone can hear.' },
    ],
  },
  {
    id: 'vi_a2_16',
    language: 'vi',
    pattern: 'chưa',
    title: 'chưa — Not Yet & Polarity Question',
    shortExplanation: 'Expresses "not yet" before a verb, or forms a "have you ... yet?" question at the end of a sentence.',
    longExplanation: 'Before a verb: "Tôi chưa ăn" (I haven’t eaten yet). At the end: "Bạn ăn chưa?" (Have you eaten yet?).',
    formation: 'Chủ ngữ + chưa + Động từ / Câu + chưa?',
    level: 'CEFR A2',
    examples: [
      { sentence: 'Bạn làm xong bài tập chưa?', translation: 'Have you finished the homework yet?' },
      { sentence: 'Xin lỗi, tôi chưa xem tin nhắn của bạn.', translation: 'Sorry, I haven’t seen your message yet.' },
    ],
  },

  // ============================================================================
  // CEFR B1 (16 intermediate patterns)
  // ============================================================================
  {
    id: 'vi_b1_01',
    language: 'vi',
    pattern: 'mặc dù ... nhưng',
    title: 'mặc dù ... nhưng — Concession (although ... yet)',
    shortExplanation: 'Shows an unexpected contrast between two facts ("although A, (still) B").',
    longExplanation: 'Vietnamese routinely keeps "nhưng" (but) in the second clause alongside "mặc dù" or "dù" in the first clause.',
    formation: 'Mặc dù + Mệnh đề 1, nhưng + Mệnh đề 2',
    level: 'CEFR B1',
    examples: [
      { sentence: 'Mặc dù trời lạnh nhưng nhiều người vẫn đi dạo.', translation: 'Although it is cold, many people are still taking a walk.' },
      { sentence: 'Mặc dù rất bận nhưng cô ấy vẫn giúp tôi.', translation: 'Although she was very busy, she still helped me.' },
    ],
  },
  {
    id: 'vi_b1_02',
    language: 'vi',
    pattern: 'tuy ... nhưng',
    title: 'tuy ... nhưng — Soft Concession (even though)',
    shortExplanation: 'Concise concessive pair common in both speech and writing ("though ... but").',
    longExplanation: 'Slightly lighter and tighter than "mặc dù ... nhưng", often linking adjectives or short clauses.',
    formation: 'Tuy + Mệnh đề 1, nhưng + Mệnh đề 2',
    level: 'CEFR B1',
    examples: [
      { sentence: 'Quán tuy nhỏ nhưng rất ấm cúng.', translation: 'Though small, the café is very cozy.' },
      { sentence: 'Tuy mới học được ba tháng nhưng bạn nói tốt lắm.', translation: 'Even though you have only studied for three months, you speak very well.' },
    ],
  },
  {
    id: 'vi_b1_03',
    language: 'vi',
    pattern: 'không những ... mà còn',
    title: 'không những ... mà còn — Cumulative Addition (not only ... but also)',
    shortExplanation: 'Emphasizes two qualities or actions together ("not only A, but also B").',
    longExplanation: 'Adds emphasis to the second element. Interchangeable in spoken Vietnamese with "không chỉ ... mà còn".',
    formation: 'không những + A + mà còn + B',
    level: 'CEFR B1',
    examples: [
      { sentence: 'Anh ấy không những thông minh mà còn rất chăm chỉ.', translation: 'He is not only smart but also very hardworking.' },
      { sentence: 'Món này không những ngon mà còn rẻ nữa.', translation: 'This dish is not only delicious but also affordable.' },
    ],
  },
  {
    id: 'vi_b1_04',
    language: 'vi',
    pattern: 'vừa ... đã',
    title: 'vừa ... đã — Immediate Sequence (no sooner ... than)',
    shortExplanation: 'Highlights how quickly a second event followed the first ("just ... and already ...").',
    longExplanation: 'Connects two rapid actions; often reinforced with "vừa mới ... đã" to stress surprise at the speed.',
    formation: 'Vừa (mới) + Hành động 1, đã + Hành động 2',
    level: 'CEFR B1',
    examples: [
      { sentence: 'Tôi vừa đặt lưng xuống đã ngủ thiếp đi.', translation: 'I had barely laid down when I fell fast asleep.' },
      { sentence: 'Trời vừa tạnh mưa đã thấy cầu vồng.', translation: 'No sooner did the rain stop than a rainbow appeared.' },
    ],
  },
  {
    id: 'vi_b1_05',
    language: 'vi',
    pattern: 'càng ... càng',
    title: 'càng ... càng — Proportional Change (the more ... the more)',
    shortExplanation: 'Expresses that a change in one degree leads directly to an increase in another.',
    longExplanation: 'Placed before two adjectives, adverbs, or verbs to show parallel escalation ("the more X, the more Y").',
    formation: '(Chủ ngữ) + càng + A + càng + B',
    level: 'CEFR B1',
    examples: [
      { sentence: 'Càng luyện tập nhiều, bạn càng nói tự nhiên.', translation: 'The more you practice, the more naturally you speak.' },
      { sentence: 'Trời càng về khuya càng lạnh.', translation: 'The later it gets at night, the colder it becomes.' },
    ],
  },
  {
    id: 'vi_b1_06',
    language: 'vi',
    pattern: 'có vẻ',
    title: 'có vẻ — Impression / Appearance (looks like / seems)',
    shortExplanation: 'Softens an observation based on outward cues ("seems / looks like").',
    longExplanation: 'Used before adjectives or verbs to convey an impression without asserting absolute certainty.',
    formation: 'Chủ ngữ + có vẻ (+ như) + Tính từ / Mệnh đề',
    level: 'CEFR B1',
    examples: [
      { sentence: 'Hôm nay trông bạn có vẻ mệt.', translation: 'You look a bit tired today.' },
      { sentence: 'Kế hoạch này có vẻ khá khả thi.', translation: 'This plan seems quite feasible.' },
    ],
  },
  {
    id: 'vi_b1_07',
    language: 'vi',
    pattern: 'hình như',
    title: 'hình như — Uncertain Guess (it seems / apparently)',
    shortExplanation: 'Signals an educated guess or tentative memory ("I think / seems like").',
    longExplanation: 'Often placed at the start of a sentence or right before the predicate when the speaker is not 100% sure.',
    formation: 'Hình như + Mệnh đề',
    level: 'CEFR B1',
    examples: [
      { sentence: 'Hình như ngoài kia đang có lễ hội.', translation: 'It seems there is a festival outside.' },
      { sentence: 'Tôi hình như đã gặp chị ở đâu rồi.', translation: 'I feel like I’ve met you somewhere before.' },
    ],
  },
  {
    id: 'vi_b1_08',
    language: 'vi',
    pattern: 'thay vì',
    title: 'thay vì — Substitution (instead of)',
    shortExplanation: 'Presents an alternative chosen over an expected option.',
    longExplanation: 'Takes a verb phrase or noun phrase; can stand either at the start of a sentence or before the avoided choice.',
    formation: 'Thay vì + A, (thì) + B',
    level: 'CEFR B1',
    examples: [
      { sentence: 'Thay vì đi xe máy, hôm nay mình đi bộ nhé.', translation: 'Instead of riding a motorbike, let’s walk today.' },
      { sentence: 'Cô ấy chọn đọc sách thay vì xem phim.', translation: 'She chose reading a book instead of watching a movie.' },
    ],
  },
  {
    id: 'vi_b1_09',
    language: 'vi',
    pattern: 'ngay khi',
    title: 'ngay khi — Exact Simultaneity (as soon as / right when)',
    shortExplanation: 'Emphasizes that the main action occurs immediately at the trigger moment.',
    longExplanation: 'Synonyms include "ngay sau khi" (immediately after) and "ngay lúc" (at the exact moment).',
    formation: 'Ngay khi + Mệnh đề 1, Mệnh đề 2',
    level: 'CEFR B1',
    examples: [
      { sentence: 'Ngay khi đến sân bay, hãy nhắn tin cho mẹ nhé.', translation: 'As soon as you arrive at the airport, text Mom.' },
      { sentence: 'Tôi nhận ra anh ấy ngay khi anh bước vào.', translation: 'I recognized him the moment he walked in.' },
    ],
  },
  {
    id: 'vi_b1_10',
    language: 'vi',
    pattern: 'ngoài ra',
    title: 'ngoài ra — Discourse Addition (besides / in addition)',
    shortExplanation: 'Adds a supporting point or extra detail in speech and essays.',
    longExplanation: 'Usually opens a follow-up sentence, separated by a comma, to expand an argument.',
    formation: 'Ngoài ra, + Mệnh đề',
    level: 'CEFR B1',
    examples: [
      { sentence: 'Ngoài ra, bạn cũng nên uống đủ nước mỗi ngày.', translation: 'Besides, you should also drink enough water every day.' },
      { sentence: 'Phòng này rất rộng. Ngoài ra còn có ban công nữa.', translation: 'This room is very spacious. In addition, it has a balcony.' },
    ],
  },
  {
    id: 'vi_b1_11',
    language: 'vi',
    pattern: 'thậm chí',
    title: 'thậm chí — Scalar Emphasis (even)',
    shortExplanation: 'Highlights an extreme or surprising case ("even ...").',
    longExplanation: 'Can precede the subject ("Thậm chí trẻ em cũng hiểu") or the verb phrase ("...thậm chí còn...").',
    formation: 'Thậm chí + (Chủ ngữ) + còn / cũng + Động từ',
    level: 'CEFR B1',
    examples: [
      { sentence: 'Anh ấy bận đến nỗi thậm chí không kịp ăn trưa.', translation: 'He was so busy that he didn’t even have time for lunch.' },
      { sentence: 'Thậm chí người bản xứ đôi khi cũng nhầm từ này.', translation: 'Even native speakers sometimes mix up this word.' },
    ],
  },
  {
    id: 'vi_b1_12',
    language: 'vi',
    pattern: 'dần dần',
    title: 'dần dần — Gradual Progression (gradually)',
    shortExplanation: 'Describes a steady, step-by-step change over time.',
    longExplanation: 'Functions as a manner/aspect adverb modifying verbs or adjectives; short form "dần" follows the predicate.',
    formation: 'Dần dần + Mệnh đề / Động từ + dần',
    level: 'CEFR B1',
    examples: [
      { sentence: 'Dần dần tôi đã quen với nhịp sống ở đây.', translation: 'Gradually I got used to the pace of life here.' },
      { sentence: 'Mọi thứ rồi sẽ ổn dần thôi.', translation: 'Everything will gradually be okay.' },
    ],
  },
  {
    id: 'vi_b1_13',
    language: 'vi',
    pattern: 'trừ khi',
    title: 'trừ khi — Negative Condition (unless)',
    shortExplanation: 'Introduces the sole exception that changes an outcome.',
    longExplanation: 'Usually follows the main clause to specify the only condition under which the main statement won’t hold.',
    formation: 'Mệnh đề chính + trừ khi + Ngoại lệ',
    level: 'CEFR B1',
    examples: [
      { sentence: 'Chúng ta sẽ khởi hành lúc bảy giờ, trừ khi trời bão.', translation: 'We will depart at seven, unless there is a storm.' },
      { sentence: 'Tôi không ra ngoài đâu, trừ khi có việc gấp.', translation: 'I won’t go out unless there’s an emergency.' },
    ],
  },
  {
    id: 'vi_b1_14',
    language: 'vi',
    pattern: 'nhất là',
    title: 'nhất là — Narrowing Focus (especially)',
    shortExplanation: 'Picks out the strongest example within a category.',
    longExplanation: 'Introduces a highlighted noun or "khi + clause" to sharpen a statement.',
    formation: 'Mệnh đề, nhất là + Danh từ / khi ...',
    level: 'CEFR B1',
    examples: [
      { sentence: 'Hà Nội rất đẹp, nhất là vào mùa thu.', translation: 'Hanoi is very beautiful, especially in autumn.' },
      { sentence: 'Bạn nhớ giữ sức khỏe, nhất là khi thời tiết thay đổi.', translation: 'Take care of your health, especially when the weather changes.' },
    ],
  },
  {
    id: 'vi_b1_15',
    language: 'vi',
    pattern: 'ít nhất',
    title: 'ít nhất — Minimum Bound (at least)',
    shortExplanation: 'Sets a baseline amount, duration, or consolation point.',
    longExplanation: 'Used before numbers or at the beginning of a reassuring clause.',
    formation: 'ít nhất (+ là) + Số lượng / Mệnh đề',
    level: 'CEFR B1',
    examples: [
      { sentence: 'Mỗi ngày tôi nghe tiếng Việt ít nhất ba mươi phút.', translation: 'Every day I listen to Vietnamese for at least thirty minutes.' },
      { sentence: 'Ít nhất chúng ta cũng đã thử hết sức.', translation: 'At least we tried our best.' },
    ],
  },
  {
    id: 'vi_b1_16',
    language: 'vi',
    pattern: 'vô tình',
    title: 'vô tình — Unintentional Action (accidentally)',
    shortExplanation: 'Indicates an action occurred without intent or by pure chance.',
    longExplanation: 'Adverb placed before the main verb; contrasts with "cố tình" (deliberately).',
    formation: 'Chủ ngữ + vô tình + Động từ',
    level: 'CEFR B1',
    examples: [
      { sentence: 'Tôi vô tình gặp lại người bạn cũ ở siêu thị.', translation: 'I happened to bump into an old friend at the supermarket.' },
      { sentence: 'Xin lỗi, mình vô tình xóa mất tin nhắn đó.', translation: 'Sorry, I accidentally deleted that message.' },
    ],
  },

  // ============================================================================
  // CEFR B2 (16 upper-intermediate patterns)
  // ============================================================================
  {
    id: 'vi_b2_01',
    language: 'vi',
    pattern: 'chỉ cần ... là',
    title: 'chỉ cần ... là — Sufficient Condition (just ... and ...)',
    shortExplanation: 'States one simple requirement that guarantees a result ("all it takes is...").',
    longExplanation: 'Emphasizes how minimal the condition is to achieve the outcome introduced by "là" or "thì".',
    formation: 'Chỉ cần + Điều kiện + là + Kết quả',
    level: 'CEFR B2',
    examples: [
      { sentence: 'Bạn chỉ cần kiên trì luyện nghe là sẽ tiến bộ.', translation: 'You just need to practice listening consistently and you’ll improve.' },
      { sentence: 'Chỉ cần bấm nút này là máy tự chạy.', translation: 'All you need to do is press this button and the machine runs by itself.' },
    ],
  },
  {
    id: 'vi_b2_02',
    language: 'vi',
    pattern: 'chỉ khi ... mới',
    title: 'chỉ khi ... mới — Exclusive Condition (only when ... does ...)',
    shortExplanation: 'Restricts an outcome exclusively to one time or condition.',
    longExplanation: 'Requires "mới" in the result clause to underscore that the outcome cannot happen any other way.',
    formation: 'Chỉ khi + Điều kiện + (Chủ ngữ) + mới + Kết quả',
    level: 'CEFR B2',
    examples: [
      { sentence: 'Chỉ khi thực sự tự mình làm, bạn mới hiểu hết vấn đề.', translation: 'Only when you actually do it yourself do you fully understand the issue.' },
      { sentence: 'Chỉ khi mất đi người ta mới biết trân trọng.', translation: 'Only after losing something do people learn to appreciate it.' },
    ],
  },
  {
    id: 'vi_b2_03',
    language: 'vi',
    pattern: 'cho dù',
    title: 'cho dù — Unconditional Concession (even if / no matter)',
    shortExplanation: 'Asserts the result holds regardless of extreme or hypothetical obstacles.',
    longExplanation: 'Stronger than "mặc dù", used for hypothetical situations ("cho dù chuyện gì xảy ra"). Often pairs with "vẫn" or "cũng".',
    formation: 'Cho dù + Giả thiết, (thì) + Kết quả vẫn ...',
    level: 'CEFR B2',
    examples: [
      { sentence: 'Cho dù bận đến đâu, anh ấy vẫn dành thời gian cho gia đình.', translation: 'No matter how busy he gets, he still makes time for his family.' },
      { sentence: 'Cho dù có thất bại, tôi cũng không hối hận.', translation: 'Even if I fail, I won’t regret it.' },
    ],
  },
  {
    id: 'vi_b2_04',
    language: 'vi',
    pattern: 'bất kể',
    title: 'bất kể — Indifference to Conditions (regardless of)',
    shortExplanation: 'Means "regardless of" or "no matter which/what".',
    longExplanation: 'Takes a noun phrase, question word ("bất kể ai / lúc nào"), or contrasting pair ("nắng hay mưa").',
    formation: 'Bất kể + Danh từ / Từ nghi vấn',
    level: 'CEFR B2',
    examples: [
      { sentence: 'Cửa hàng mở cửa mỗi ngày, bất kể lễ Tết.', translation: 'The shop opens every day, regardless of holidays.' },
      { sentence: 'Bạn có thể hỏi bất kể lúc nào.', translation: 'You can ask at any time whatsoever.' },
    ],
  },
  {
    id: 'vi_b2_05',
    language: 'vi',
    pattern: 'một mặt ... mặt khác',
    title: 'một mặt ... mặt khác — Balanced Contrast (on the one hand ... on the other)',
    shortExplanation: 'Presents two sides of an issue objectively.',
    longExplanation: 'Widely used in discussions, essays, and news analysis to weigh pros and cons or simultaneous motives.',
    formation: 'Một mặt + Mệnh đề 1, mặt khác + Mệnh đề 2',
    level: 'CEFR B2',
    examples: [
      { sentence: 'Một mặt công việc này lương cao, mặt khác áp lực lại rất lớn.', translation: 'On one hand this job pays well; on the other hand, the pressure is huge.' },
      { sentence: 'Chúng ta cần một mặt tiết kiệm chi phí, mặt khác giữ vững chất lượng.', translation: 'We need to cut costs on the one hand while maintaining quality on the other.' },
    ],
  },
  {
    id: 'vi_b2_06',
    language: 'vi',
    pattern: 'thà ... còn hơn',
    title: 'thà ... còn hơn — Marked Preference (rather ... than)',
    shortExplanation: 'Chooses the lesser of two evils or a principled preference.',
    longExplanation: 'Places the chosen option after "thà" and the rejected alternative after "còn hơn (là)".',
    formation: 'Thà + Phương án A + còn hơn (là) + Phương án B',
    level: 'CEFR B2',
    examples: [
      { sentence: 'Thà đi chậm mà chắc còn hơn vội vàng rồi sai sót.', translation: 'Better to go slow and steady than rush and make mistakes.' },
      { sentence: 'Tôi thà ở nhà đọc sách còn hơn ra ngoài trời mưa.', translation: 'I would rather stay home and read than go out in the rain.' },
    ],
  },
  {
    id: 'vi_b2_07',
    language: 'vi',
    pattern: 'nhờ có',
    title: 'nhờ có — Positive Attribution (thanks to)',
    shortExplanation: 'Credits a person, tool, or circumstance for a favorable outcome.',
    longExplanation: 'Always carries a positive or appreciative tone; for negative causes, use "tại" or "do".',
    formation: 'Nhờ (có) + Nguyên nhân tích cực, Kết quả tốt',
    level: 'CEFR B2',
    examples: [
      { sentence: 'Nhờ có sự giúp đỡ của bạn, dự án đã kịp tiến độ.', translation: 'Thanks to your help, the project stayed on schedule.' },
      { sentence: 'Nhờ nghe podcast hằng ngày mà khả năng phản xạ của mình tốt hẳn lên.', translation: 'Thanks to listening to podcasts daily, my reflexes improved noticeably.' },
    ],
  },
  {
    id: 'vi_b2_08',
    language: 'vi',
    pattern: 'so với',
    title: 'so với — Explicit Baseline Comparison (compared to)',
    shortExplanation: 'Sets a benchmark to evaluate growth, difference, or scale.',
    longExplanation: 'Follows a clause or stands at sentence-initial position ("So với năm ngoái, ...").',
    formation: 'A + Tính từ / Mệnh đề + so với + B',
    level: 'CEFR B2',
    examples: [
      { sentence: 'So với năm ngoái, năm nay thời tiết dễ chịu hơn nhiều.', translation: 'Compared to last year, the weather this year is much more pleasant.' },
      { sentence: 'Mức giá này khá hợp lý so với chất lượng.', translation: 'This price is quite reasonable compared to the quality.' },
    ],
  },
  {
    id: 'vi_b2_09',
    language: 'vi',
    pattern: 'dựa trên',
    title: 'dựa trên — Evidential Basis (based on)',
    shortExplanation: 'Cites data, rules, or experience supporting a judgment or design.',
    longExplanation: 'Formal and analytical connector used in presentations, articles, and explanations.',
    formation: 'Động từ / Mệnh đề + dựa trên + Cơ sở',
    level: 'CEFR B2',
    examples: [
      { sentence: 'Bộ phim được dựng dựa trên một câu chuyện có thật.', translation: 'The film is based on a true story.' },
      { sentence: 'Chúng tôi đánh giá dựa trên kết quả thực tế.', translation: 'We evaluate based on actual results.' },
    ],
  },
  {
    id: 'vi_b2_10',
    language: 'vi',
    pattern: 'miễn là',
    title: 'miễn là — Proviso Condition (as long as / provided that)',
    shortExplanation: 'States the one essential condition for agreement ("as long as").',
    longExplanation: 'Expresses flexibility on all details except one key prerequisite placed after "miễn là".',
    formation: 'Mệnh đề chính, miễn là + Điều kiện cốt lõi',
    level: 'CEFR B2',
    examples: [
      { sentence: 'Đi đâu cũng được, miễn là mọi người vui vẻ.', translation: 'Anywhere is fine, as long as everyone is happy.' },
      { sentence: 'Bạn có thể mượn xe, miễn là trả lại trước tối.', translation: 'You can borrow the bike, provided you return it before evening.' },
    ],
  },
  {
    id: 'vi_b2_11',
    language: 'vi',
    pattern: 'ngày càng',
    title: 'ngày càng — Increasing Trend (more and more)',
    shortExplanation: 'Describes a progressive intensification over time.',
    longExplanation: 'Placed before adjectives or psychological verbs ("ngày càng phổ biến", "ngày càng thích").',
    formation: 'Chủ ngữ + ngày càng + Tính từ / Động từ',
    level: 'CEFR B2',
    examples: [
      { sentence: 'Tiếng Việt đang ngày càng phổ biến trên mạng.', translation: 'Vietnamese is becoming more and more popular online.' },
      { sentence: 'Công nghệ phát triển ngày càng nhanh.', translation: 'Technology is developing faster and faster.' },
    ],
  },
  {
    id: 'vi_b2_12',
    language: 'vi',
    pattern: 'hóa ra',
    title: 'hóa ra — Sudden Realization (turned out to be)',
    shortExplanation: 'Reveals an unexpected truth after misunderstanding or investigation.',
    longExplanation: 'Can introduce the whole sentence ("Hóa ra là thế!") or follow a pronoun as a surprise revelation.',
    formation: 'Hóa ra + (là) + Sự thật mới phát hiện',
    level: 'CEFR B2',
    examples: [
      { sentence: 'Hóa ra hai người là bạn học cũ từ cấp ba!', translation: 'It turned out they were old high school classmates!' },
      { sentence: 'Mình tưởng khó lắm, hóa ra cũng đơn giản thôi.', translation: 'I thought it was really hard, but it turns out it’s quite simple.' },
    ],
  },
  {
    id: 'vi_b2_13',
    language: 'vi',
    pattern: 'tóm lại',
    title: 'tóm lại — Summarizing Discourse (in short / to sum up)',
    shortExplanation: 'Signals a concise takeaway or conclusion after a detailed explanation.',
    longExplanation: 'Stands at the beginning of a concluding sentence to distill previous points.',
    formation: 'Tóm lại, + Kết luận chính',
    level: 'CEFR B2',
    examples: [
      { sentence: 'Tóm lại, muốn giỏi ngoại ngữ thì phải dùng hằng ngày.', translation: 'In short, to master a language you have to use it daily.' },
      { sentence: 'Nói tóm lại, kế hoạch đã được thông qua.', translation: 'To summarize, the plan has been approved.' },
    ],
  },
  {
    id: 'vi_b2_14',
    language: 'vi',
    pattern: 'huống chi',
    title: 'huống chi — A Fortiori Comparison (let alone / much less)',
    shortExplanation: 'Argues that if an easier/smaller case is true (or impossible), a larger one is even more so.',
    longExplanation: 'Follows a premise to highlight an even more obvious consequence; synonymous with "huống hồ".',
    formation: 'Mệnh đề 1 (cơ sở), huống chi (+ là) + Mệnh đề 2',
    level: 'CEFR B2',
    examples: [
      { sentence: 'Người lớn còn mệt, huống chi là trẻ con.', translation: 'Even adults get tired, let alone children.' },
      { sentence: 'Đi bộ còn khó khăn, huống chi chạy bộ.', translation: 'Even walking is hard, much less jogging.' },
    ],
  },
  {
    id: 'vi_b2_15',
    language: 'vi',
    pattern: 'hầu như',
    title: 'hầu như — Near-Totality (almost / virtually)',
    shortExplanation: 'Qualifies universal claims to mean "almost every / practically all".',
    longExplanation: 'Usually modifies "tất cả", "ngày nào cũng", or negative "không" ("hầu như không" = hardly any).',
    formation: 'Hầu như + mọi / tất cả / không + Động từ',
    level: 'CEFR B2',
    examples: [
      { sentence: 'Hầu như ngày nào tôi cũng xem một video ngắn.', translation: 'Practically every day I watch a short video.' },
      { sentence: 'Căn phòng hầu như không có tiếng ồn.', translation: 'The room has almost no noise.' },
    ],
  },
  {
    id: 'vi_b2_16',
    language: 'vi',
    pattern: 'không ... cũng không',
    title: 'không ... cũng không — Correlative Denial (neither ... nor)',
    shortExplanation: 'Rules out two alternatives simultaneously.',
    longExplanation: 'Places one negated verb or quality in each slot to state that neither option applies.',
    formation: 'Chủ ngữ + không + A + cũng không + B',
    level: 'CEFR B2',
    examples: [
      { sentence: 'Hôm nay trời không nóng cũng không lạnh.', translation: 'Today it is neither hot nor cold.' },
      { sentence: 'Cô ấy không gọi điện cũng không nhắn tin.', translation: 'She neither called nor texted.' },
    ],
  },

  // ============================================================================
  // CEFR C1 (16 advanced / nuanced patterns)
  // ============================================================================
  {
    id: 'vi_c1_01',
    language: 'vi',
    pattern: 'giá mà',
    title: 'giá mà — Counterfactual Wish (if only / I wish)',
    shortExplanation: 'Expresses regret or an unfulfilled wish contrary to reality.',
    longExplanation: 'Typically opens a sentence expressing longing about the present or regret about the past ("giá mà ... thì hay biết mấy"). Synonymous with "giá như".',
    formation: 'Giá mà + Giả định trái thực tế (+ thì tốt biết bao)',
    level: 'CEFR C1',
    examples: [
      { sentence: 'Giá mà hôm qua tôi mang theo ô thì đã không bị ướt.', translation: 'If only I had brought an umbrella yesterday, I wouldn’t have gotten wet.' },
      { sentence: 'Giá mà một ngày có thêm vài tiếng đồng hồ!', translation: 'If only a day had a few more hours!' },
    ],
  },
  {
    id: 'vi_c1_02',
    language: 'vi',
    pattern: 'tuy nhiên',
    title: 'tuy nhiên — Formal Contrast (however / nevertheless)',
    shortExplanation: 'Formal written and spoken connector introducing a counterpoint.',
    longExplanation: 'More formal than "nhưng"; normally appears at the start of a new sentence followed by a comma.',
    formation: 'Câu 1. Tuy nhiên, + Câu 2',
    level: 'CEFR C1',
    examples: [
      { sentence: 'Chi phí đầu tư ban đầu khá cao. Tuy nhiên, hiệu quả lâu dài rất lớn.', translation: 'Initial investment costs are quite high. However, the long-term return is substantial.' },
      { sentence: 'Ý tưởng rất hay; tuy nhiên, việc triển khai cần thêm thời gian.', translation: 'The idea is great; nevertheless, implementation takes more time.' },
    ],
  },
  {
    id: 'vi_c1_03',
    language: 'vi',
    pattern: 'do đó',
    title: 'do đó — Formal Deduction (therefore / consequently)',
    shortExplanation: 'Draws a logical conclusion in academic, journalistic, or professional contexts.',
    longExplanation: 'Equivalent to "vì vậy" or "cho nên" in higher registers of writing and formal speeches.',
    formation: 'Mệnh đề nguyên nhân. Do đó, + Kết quả suy ra',
    level: 'CEFR C1',
    examples: [
      { sentence: 'Nguồn cung giảm mạnh; do đó giá nguyên liệu tăng cao.', translation: 'Supply fell sharply; consequently, raw material prices rose.' },
      { sentence: 'Dữ liệu chưa đầy đủ, do đó chưa thể kết luận vội.', translation: 'The data is incomplete; therefore, no hasty conclusion can be drawn.' },
    ],
  },
  {
    id: 'vi_c1_04',
    language: 'vi',
    pattern: 'tức là',
    title: 'tức là — Clarification & Restatement (that is to say / meaning)',
    shortExplanation: 'Rephrases, defines, or unpacks the implication of a prior statement.',
    longExplanation: 'Connects an abstract claim to a concrete restatement ("in other words / which means").',
    formation: 'Nhận định, tức là + Giải thích rõ hơn',
    level: 'CEFR C1',
    examples: [
      { sentence: 'Hạn chót là thứ Sáu, tức là chúng ta chỉ còn hai ngày.', translation: 'The deadline is Friday, meaning we only have two days left.' },
      { sentence: 'Học chủ động tức là tự đặt câu hỏi và tìm lời giải.', translation: 'Active learning means asking questions yourself and seeking answers.' },
    ],
  },
  {
    id: 'vi_c1_05',
    language: 'vi',
    pattern: 'chẳng lẽ',
    title: 'chẳng lẽ — Rhetorical Disbelief (don’t tell me / could it be)',
    shortExplanation: 'Frames a rhetorical question expressing surprise, doubt, or mild protest.',
    longExplanation: 'Indicates the speaker finds a situation hard to believe ("Could it really be that...?", often ending with "sao / ư?").',
    formation: 'Chẳng lẽ + Mệnh đề + (lại ... sao?)',
    level: 'CEFR C1',
    examples: [
      { sentence: 'Chẳng lẽ anh không nhớ cuộc hẹn hôm nay sao?', translation: 'Don’t tell me you don’t remember today’s appointment?' },
      { sentence: 'Làm việc cả tuần rồi, chẳng lẽ cuối tuần không được nghỉ một chút?', translation: 'After working all week, shouldn’t we get a little rest on the weekend?' },
    ],
  },
  {
    id: 'vi_c1_06',
    language: 'vi',
    pattern: 'quả thật',
    title: 'quả thật — Sincere Confirmation (indeed / truly)',
    shortExplanation: 'Affirms that reality genuinely matches reputation or expectation.',
    longExplanation: 'Placed before the predicate or at sentence-initial position to give measured, sincere emphasis.',
    formation: 'Chủ ngữ + quả thật + Tính từ / Động từ',
    level: 'CEFR C1',
    examples: [
      { sentence: 'Phong cảnh nơi đây quả thật hùng vĩ như lời đồn.', translation: 'The scenery here is truly as majestic as people say.' },
      { sentence: 'Quả thật, học một ngoại ngữ mở ra rất nhiều cơ hội.', translation: 'Indeed, learning a foreign language opens up many opportunities.' },
    ],
  },
  {
    id: 'vi_c1_07',
    language: 'vi',
    pattern: 'trái lại',
    title: 'trái lại — Direct Reversal Contrast (on the contrary)',
    shortExplanation: 'Rejects or reverses an assumption with an opposing truth.',
    longExplanation: 'Formal discourse marker comparable to "ngược lại", often opening a corrective sentence.',
    formation: 'Phỏng đoán. Trái lại, + Thực tế đối lập',
    level: 'CEFR C1',
    examples: [
      { sentence: 'Anh ấy không hề kiêu ngạo; trái lại, rất khiêm tốn và cởi mở.', translation: 'He is not arrogant at all; on the contrary, he is very modest and open.' },
      { sentence: 'Càng giải thích kỹ, người nghe không rối hơn mà trái lại càng dễ hiểu.', translation: 'Rather than confusing listeners, detailed explanations actually make it easier to grasp.' },
    ],
  },
  {
    id: 'vi_c1_08',
    language: 'vi',
    pattern: 'xét về',
    title: 'xét về — Analytical Perspective (in terms of / considering)',
    shortExplanation: 'Frames a focused angle of evaluation ("speaking in terms of...").',
    longExplanation: 'Used in reviews, essays, and structured discussions to isolate one criterion (cost, efficiency, style).',
    formation: 'Xét về + (mặt) + Tiêu chí, Mệnh đề',
    level: 'CEFR C1',
    examples: [
      { sentence: 'Xét về mặt kinh tế, phương án này tối ưu hơn cả.', translation: 'In economic terms, this option is the most optimal.' },
      { sentence: 'Xét về độ bền, sản phẩm nội địa không thua kém hàng nhập.', translation: 'Considering durability, local products are no inferior to imports.' },
    ],
  },
  {
    id: 'vi_c1_09',
    language: 'vi',
    pattern: 'trở nên',
    title: 'trở nên — State Transformation (become [adjective])',
    shortExplanation: 'Describes a shift in quality, atmosphere, or abstract state.',
    longExplanation: '"Trở nên" pairs with adjectives/states ("trở nên rõ ràng"), whereas "trở thành" pairs with nouns/roles ("trở thành bác sĩ").',
    formation: 'Chủ ngữ + trở nên + Tính từ',
    level: 'CEFR C1',
    examples: [
      { sentence: 'Nhờ minh họa cụ thể, khái niệm trừu tượng trở nên dễ hiểu hơn.', translation: 'Thanks to concrete illustrations, the abstract concept became easier to understand.' },
      { sentence: 'Không khí cuộc họp đột nhiên trở nên căng thẳng.', translation: 'The atmosphere of the meeting suddenly became tense.' },
    ],
  },
  {
    id: 'vi_c1_10',
    language: 'vi',
    pattern: 'trở thành',
    title: 'trở thành — Role Transformation (become [noun])',
    shortExplanation: 'Indicates developing into a defined status, identity, or phenomenon.',
    longExplanation: 'Always takes a noun or noun phrase; highlights completion or milestone achievement.',
    formation: 'Chủ ngữ + trở thành + Danh từ',
    level: 'CEFR C1',
    examples: [
      { sentence: 'Thói quen đọc sách đã trở thành niềm vui mỗi tối của tôi.', translation: 'Reading has become my nightly source of joy.' },
      { sentence: 'Thành phố nhanh chóng trở thành trung tâm công nghệ.', translation: 'The city quickly became a technology hub.' },
    ],
  },
  {
    id: 'vi_c1_11',
    language: 'vi',
    pattern: 'chính là',
    title: 'chính là — Cleft Focus & Identification (is precisely)',
    shortExplanation: 'Spotlights an exact cause, person, or definition ("the very one that...").',
    longExplanation: 'Combines emphatic "chính" with copula "là" to eliminate ambiguity and focus listener attention.',
    formation: 'A + chính là + B (điều cốt lõi)',
    level: 'CEFR C1',
    examples: [
      { sentence: 'Sự kiên trì chính là chìa khóa dẫn đến thành công.', translation: 'Perseverance is precisely the key to success.' },
      { sentence: 'Đây chính là điều mà chúng tôi đang tìm kiếm.', translation: 'This is exactly what we have been looking for.' },
    ],
  },
  {
    id: 'vi_c1_12',
    language: 'vi',
    pattern: 'dẫu sao',
    title: 'dẫu sao — Philosophical Concession (after all / anyway)',
    shortExplanation: 'Concedes prior difficulties while shifting toward a practical bottom line.',
    longExplanation: 'Often appears as "Dẫu sao đi nữa" or "Dẫu sao thì" to mean "be that as it may / anyway".',
    formation: 'Dẫu sao (đi nữa), + Kết luận thực tế',
    level: 'CEFR C1',
    examples: [
      { sentence: 'Dẫu sao mọi chuyện cũng đã qua rồi, đừng buồn nữa.', translation: 'In any case, it’s all in the past now, don’t be sad anymore.' },
      { sentence: 'Quá trình hơi vất vả, nhưng dẫu sao kết quả rất xứng đáng.', translation: 'The process was tough, yet all things considered the result was well worth it.' },
    ],
  },
  {
    id: 'vi_c1_13',
    language: 'vi',
    pattern: 'kể cả khi',
    title: 'kể cả khi — Extreme Inclusion (even when / even in the case that)',
    shortExplanation: 'Extends a commitment or truth into challenging edge scenarios.',
    longExplanation: 'Introduces a demanding timeframe or scenario ("even when...") where the main rule still holds.',
    formation: 'Mệnh đề chính + kể cả khi + Tình huống khắc nghiệt',
    level: 'CEFR C1',
    examples: [
      { sentence: 'Đừng bỏ cuộc, kể cả khi kết quả ban đầu chưa như mong đợi.', translation: 'Don’t give up, even when initial results fall short of expectations.' },
      { sentence: 'Hệ thống vẫn hoạt động ổn định kể cả khi lượng truy cập tăng gấp đôi.', translation: 'The system remains stable even when traffic doubles.' },
    ],
  },
  {
    id: 'vi_c1_14',
    language: 'vi',
    pattern: 'về mặt',
    title: 'về mặt — Aspect Specifier (in terms of / as regards)',
    shortExplanation: 'Specifies the dimension or aspect being evaluated.',
    longExplanation: 'Compact prepositional phrase bridging general observations and domain-specific judgment (theory, practice, law).',
    formation: 'Về mặt + Danh từ trừu tượng, Mệnh đề',
    level: 'CEFR C1',
    examples: [
      { sentence: 'Về mặt lý thuyết, giải pháp này hoàn toàn khả thi.', translation: 'In theory, this solution is completely feasible.' },
      { sentence: 'Đội ngũ rất vững về mặt chuyên môn.', translation: 'The team is very strong in terms of professional expertise.' },
    ],
  },
  {
    id: 'vi_c1_15',
    language: 'vi',
    pattern: 'đồng thời',
    title: 'đồng thời — Simultaneous / Dual Action (at the same time)',
    shortExplanation: 'Links two actions occurring together or two concurrent roles/effects.',
    longExplanation: 'Common in journalism and explanatory speech to avoid repeating "và cũng".',
    formation: 'Mệnh đề 1, đồng thời + Động từ / Mệnh đề 2',
    level: 'CEFR C1',
    examples: [
      { sentence: 'Chương trình giúp tiết kiệm thời gian, đồng thời nâng cao độ chính xác.', translation: 'The program saves time while simultaneously improving accuracy.' },
      { sentence: 'Cô ấy vừa là giảng viên, đồng thời là cố vấn chuyên môn.', translation: 'She is a lecturer and at the same time a technical advisor.' },
    ],
  },
  {
    id: 'vi_c1_16',
    language: 'vi',
    pattern: 'nói cách khác',
    title: 'nói cách khác — Reformulation Marker (in other words)',
    shortExplanation: 'Signals an upcoming clearer or simpler rephrasing of a complex idea.',
    longExplanation: 'Discourse linker used before restating an implication from a fresh perspective.',
    formation: 'Ý gốc. Nói cách khác, + Diễn đạt lại',
    level: 'CEFR C1',
    examples: [
      { sentence: 'Nói cách khác, chúng ta cần ưu tiên chất lượng hơn số lượng.', translation: 'In other words, we need to prioritize quality over quantity.' },
      { sentence: 'Ngân sách bị cắt giảm; nói cách khác, kế hoạch mở rộng phải hoãn lại.', translation: 'The budget was cut; in other words, the expansion plan must be postponed.' },
    ],
  },
  {
    "id": "vi_a1_17",
    "language": "vi",
    "pattern": "cái + Danh từ",
    "title": "cái + Noun — General Object Classifier",
    "shortExplanation": "General classifier used before most everyday inanimate objects, tools, and abstract items.",
    "longExplanation": "Vietnamese nouns usually require a classifier when counted or pointed out. \"Cái\" is the safest default for non-living things like tables, bags, cups, or ideas.",
    "formation": "(Số lượng) + cái + Danh từ đồ vật / khái niệm",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "Cho tôi xem cái túi màu đen kia.",
        "translation": "Let me look at that black bag over there."
      },
      {
        "sentence": "Trên bàn có hai cái cốc thủy tinh.",
        "translation": "There are two glass cups on the table."
      }
    ]
  },
  {
    "id": "vi_a1_18",
    "language": "vi",
    "pattern": "con + Danh từ",
    "title": "con + Noun — Living & Moving Classifier",
    "shortExplanation": "Classifier for animals, children, and certain elongated or moving things (rivers, knives, roads).",
    "longExplanation": "Beyond animals (con mèo, con cá), Vietnamese traditionally extends \"con\" to animated or shaped items like roads (con đường), rivers (con sông), knives (con dao), and ships (con tàu).",
    "formation": "(Số lượng) + con + Danh từ động vật / sông / dao / đường",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "Nhà tôi nuôi một con mèo mướp rất hiền.",
        "translation": "My family keeps a very gentle tabby cat."
      },
      {
        "sentence": "Con đường này dẫn thẳng ra bờ sông.",
        "translation": "This road leads straight to the riverbank."
      }
    ]
  },
  {
    "id": "vi_a1_19",
    "language": "vi",
    "pattern": "chiếc / cuốn / người",
    "title": "chiếc / cuốn / người — Specific Noun Classifiers",
    "shortExplanation": "Core specialized classifiers that make Vietnamese sound natural when talking about cars, books, or people.",
    "longExplanation": "Use \"chiếc\" for vehicles and paired/crafted items (chiếc xe, chiếc đũa), \"cuốn\" or \"quyển\" for books/notebooks, and \"người\" before roles or nationalities (người bạn, người Việt).",
    "formation": "chiếc (vehicles/single items) / cuốn (books) / người (people)",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "Tôi đọc hết cuốn sách này trong ba tối.",
        "translation": "I finished reading this whole book in three evenings."
      },
      {
        "sentence": "Chiếc xe buýt số tám vừa dừng trước cổng.",
        "translation": "Bus number eight just stopped in front of the gate."
      }
    ]
  },
  {
    "id": "vi_a1_20",
    "language": "vi",
    "pattern": "này / đó / kia / ấy",
    "title": "này / đó / kia — Spatial Demonstratives",
    "shortExplanation": "Pointing words placed AFTER the noun to distinguish near vs. distant items or people.",
    "longExplanation": "Unlike English (this book), Vietnamese puts demonstratives at the END of the noun phrase: \"quyển sách này\" (this book), \"chỗ đó\" (that spot), \"bên kia\" (over there).",
    "formation": "Danh từ (+ loại từ) + này (here) / đó, ấy (nearby) / kia (far)",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "Quán phở này buổi sáng rất đông khách.",
        "translation": "This pho shop gets very busy in the morning."
      },
      {
        "sentence": "Anh có thấy tòa nhà cao màu trắng ở đằng kia không?",
        "translation": "Do you see the tall white building over there?"
      }
    ]
  },
  {
    "id": "vi_a1_21",
    "language": "vi",
    "pattern": "... không? (Câu hỏi có/không)",
    "title": "... không? — Yes/No Question Tag",
    "shortExplanation": "Turns any statement into a standard yes/no question simply by placing \"không\" at the end.",
    "longExplanation": "Optionally add \"có\" before the verb/adjective for smoother rhythm: \"Bạn có thích nghe nhạc không?\". Answer yes with \"Có\" and no with \"Không\".",
    "formation": "Chủ ngữ + (có) + Vị ngữ + không?",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "Bạn có hiểu hết đoạn hội thoại vừa rồi không?",
        "translation": "Did you understand the whole conversation just now?"
      },
      {
        "sentence": "Hôm nay trời có lạnh lắm không?",
        "translation": "Is it very cold today?"
      }
    ]
  },
  {
    "id": "vi_a1_22",
    "language": "vi",
    "pattern": "... chưa? (Câu hỏi đã xảy ra chưa)",
    "title": "... chưa? — Completion Check ('Already / Yet?')",
    "shortExplanation": "Asks whether an action has happened yet (\"Have you eaten yet?\").",
    "longExplanation": "Reply positively with \"Rồi\" (or \"Đã ... rồi\") and negatively with \"Chưa\" (\"not yet\", softer than a flat \"Không\").",
    "formation": "Chủ ngữ + Động từ (+ Tân ngữ) + chưa?",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "Bạn ăn trưa chưa hay vẫn đang làm việc?",
        "translation": "Have you had lunch yet or are you still working?"
      },
      {
        "sentence": "Chuyến tàu buổi sáng đã chạy chưa ạ?",
        "translation": "Has the morning train departed yet?"
      }
    ]
  },
  {
    "id": "vi_a1_23",
    "language": "vi",
    "pattern": "... phải không? / đúng không?",
    "title": "... phải không? — Confirmation Tag ('Right?')",
    "shortExplanation": "Checks whether your assumption is right, equivalent to English tag questions (\"isn't it? / right?\").",
    "longExplanation": "More polite and common in conversation than repeating verbs. You can put \"có phải ... không\" or simply end with \"phải không? / đúng không?\".",
    "formation": "Mệnh đề, phải không / đúng không?",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "Đây là lần đầu tiên bạn đến Đà Nẵng phải không?",
        "translation": "This is your first time visiting Da Nang, right?"
      },
      {
        "sentence": "Cửa hàng mở cửa đến chín giờ tối đúng không?",
        "translation": "The shop stays open until nine PM, correct?"
      }
    ]
  },
  {
    "id": "vi_a1_24",
    "language": "vi",
    "pattern": "... ạ (Tiểu từ lễ phép)",
    "title": "... ạ — Polite Sentence-Final Particle",
    "shortExplanation": "Added to the end of greetings, replies, and questions to show respect to elders or strangers.",
    "longExplanation": "One tiny syllable that completely elevates politeness toward teachers, elders, customers, or service staff. Pair with respectful pronouns like \"em / cháu / con\" + \"anh / chị / cô / chú / bác\".",
    "formation": "Câu nói / Câu trả lời + ạ",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "Em chào anh ạ, cho em gọi một ly cà phê sữa đá.",
        "translation": "Hello sir, may I order one iced milk coffee please."
      },
      {
        "sentence": "Dạ, cháu cảm ơn cô nhiều ạ!",
        "translation": "Yes, thank you very much, ma'am!"
      }
    ]
  },
  {
    "id": "vi_a1_25",
    "language": "vi",
    "pattern": "... nhé / nha (Gợi ý thân mật)",
    "title": "... nhé / nha — Warm Friendly Suggestion Particle",
    "shortExplanation": "Softens suggestions, reminders, or goodbyes so they sound warm rather than bossy.",
    "longExplanation": "Without a particle, imperatives like \"Ngồi xuống\" can sound blunt. Adding \"nhé\" (or Southern \"nha\") makes it friendly: \"Ngồi xuống đây nhé!\".",
    "formation": "Mệnh đề / Đề nghị + nhé (North/Standard) / nha (South)",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "Tối nay rảnh thì gọi cho mình nhé!",
        "translation": "Call me tonight if you're free, okay!"
      },
      {
        "sentence": "Mình để chìa khóa trên bàn nha.",
        "translation": "I'll leave the keys on the table, okay?"
      }
    ]
  },
  {
    "id": "vi_a1_26",
    "language": "vi",
    "pattern": "ở + Nơi chốn",
    "title": "ở + Location — Spatial Preposition ('at / in / live in')",
    "shortExplanation": "Functions both as a verb meaning \"to live/be located at\" and a preposition meaning \"in/at\".",
    "longExplanation": "Remember: \"Tôi ở Hà Nội\" means \"I live in Hanoi\" (no \"là\" needed!). Also placed after verbs: \"làm việc ở công ty\".",
    "formation": "Chủ ngữ + ở + Nơi chốn  |  Chủ ngữ + Động từ + ở + Nơi chốn",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "Hiện tại gia đình tôi đang sống ở Cần Thơ.",
        "translation": "Currently my family lives in Can Tho."
      },
      {
        "sentence": "Họ gặp nhau ở quán trà đá góc phố.",
        "translation": "They met at the iced-tea stall on the street corner."
      }
    ]
  },
  {
    "id": "vi_a1_27",
    "language": "vi",
    "pattern": "có + Danh từ (Sở hữu & Tồn tại)",
    "title": "có + Noun — Possession ('Have') & Existence ('There is')",
    "shortExplanation": "Expresses both ownership (\"I have a dictionary\") and existence (\"There is a café nearby\").",
    "longExplanation": "With no subject at the start (or starting with a location), \"có\" translates smoothly to English \"There is / There are\".",
    "formation": "Chủ ngữ + có + Danh từ  |  (Ở đây) + có + Danh từ",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "Ở đầu ngõ có một tiệm bánh mì rất thơm.",
        "translation": "At the entrance of the alley there is a fragrant banh mi stall."
      },
      {
        "sentence": "Mỗi ngày mình đều có ba mươi phút đọc báo tiếng Việt.",
        "translation": "Every day I have thirty minutes to read Vietnamese news."
      }
    ]
  },
  {
    "id": "vi_a1_28",
    "language": "vi",
    "pattern": "định + Động từ",
    "title": "định + Verb — Personal Intention ('plan / intend to')",
    "shortExplanation": "Expresses a personal plan or tentative intention you are thinking of doing.",
    "longExplanation": "Warmer and less rigid than formal \"dự định\". Frequently combined with future time markers like \"cuối tuần này\" or \"tháng sau\".",
    "formation": "Chủ ngữ + định + Động từ (+ Thời gian)",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "Cuối tuần này bạn định đi đâu chơi không?",
        "translation": "Do you plan on going anywhere for fun this weekend?"
      },
      {
        "sentence": "Tôi định học thêm hai mươi từ mới trước khi ngủ.",
        "translation": "I'm thinking of learning twenty more words before bed."
      }
    ]
  },
  {
    "id": "vi_a1_29",
    "language": "vi",
    "pattern": "muốn + Động từ",
    "title": "muốn + Verb — Wishing & Polite Ordering",
    "shortExplanation": "States clearly what you want or would like to do—pair with \"ạ\" or \"cho tôi\" when ordering.",
    "longExplanation": "In shops or requests, speakers often soften \"tôi muốn...\" with \"cho em/tôi...\" or \"muốn nhờ anh...\".",
    "formation": "Chủ ngữ + muốn + Động từ / Danh từ",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "Mình muốn luyện phát âm chuẩn giọng miền Nam.",
        "translation": "I want to practice pronouncing with a clean Southern accent."
      },
      {
        "sentence": "Chị muốn uống trà nóng hay trà đá ạ?",
        "translation": "Would you like hot tea or iced tea, ma'am?"
      }
    ]
  },
  {
    "id": "vi_a1_30",
    "language": "vi",
    "pattern": "không vs. chưa (Phủ định)",
    "title": "không vs. chưa — Permanent/General Negation vs. 'Not Yet'",
    "shortExplanation": "\"Không\" denies a fact or habit outright; \"chưa\" means it has simply not happened SO FAR.",
    "longExplanation": "Saying \"Tôi không ăn\" means you refuse or skip eating; \"Tôi chưa ăn\" means you haven't eaten yet (and probably will soon).",
    "formation": "Chủ ngữ + không + V/Adj (general no)  vs.  Chủ ngữ + chưa + V (not yet)",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "Tôi không uống cà phê vào buổi tối vì sợ mất ngủ.",
        "translation": "I don't drink coffee at night because I'm afraid of losing sleep."
      },
      {
        "sentence": "Xin lỗi, tôi chưa kịp xem tin nhắn của bạn.",
        "translation": "Sorry, I haven't had time to check your message yet."
      }
    ]
  },
  {
    "id": "vi_a1_31",
    "language": "vi",
    "pattern": "một ít / nhiều / vài + Danh từ",
    "title": "một ít / nhiều / vài + Noun — Basic Quantifiers",
    "shortExplanation": "Quantifiers placed BEFORE the noun: \"vài\" (several/a few) takes countable items, \"một ít\" takes uncountable/small portions, and \"nhiều\" covers both.",
    "longExplanation": "Remember: \"một vài người bạn\" (a few friends), \"một ít nước\" (a little water), \"nhiều thời gian\" (a lot of time). No plural \"-s\" inflection is needed on the noun.",
    "formation": "một ít (uncountable/small amount) / vài (+ classifier + plural) / nhiều + Danh từ",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "Mình chỉ mang theo một ít tiền mặt để mua nước.",
        "translation": "I only brought a little cash along to buy water."
      },
      {
        "sentence": "Cuối tuần tôi gặp vài người bạn cũ ở quán cũ.",
        "translation": "Over the weekend I met a few old friends at our usual café."
      }
    ]
  },
  {
    "id": "vi_a1_32",
    "language": "vi",
    "pattern": "nào? / gì? / đâu? / ai? (Từ để hỏi tại chỗ)",
    "title": "nào / gì / đâu / ai — In-Situ Wh-Questions",
    "shortExplanation": "Vietnamese question words stay right in the position of the missing answer—NO fronting to the start of the sentence!",
    "longExplanation": "To ask \"What are you watching?\", simply replace the object position after the verb: \"Bạn đang xem gì thế?\". Same for \"Bạn ở đâu?\", \"Ai gọi thế?\".",
    "formation": "Chủ ngữ + Động từ + gì / ai / ở đâu / thế nào?",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "Hôm nay bạn đang luyện nghe chủ đề gì vậy?",
        "translation": "What topic are you practicing listening to today?"
      },
      {
        "sentence": "Quán ăn ngon nhất quanh đây nằm ở đâu thế?",
        "translation": "Where is the tastiest restaurant around here located?"
      }
    ]
  },
  {
    "id": "vi_a2_17",
    "language": "vi",
    "pattern": "Động từ + ra (Bổ ngữ hướng ra / phát hiện)",
    "title": "Verb + ra — Outward / Discovery Complement",
    "shortExplanation": "Marks outward movement (\"bước ra\", \"mang ra\") OR mental/sensory discovery (\"nhận ra\", \"tìm ra\", \"nghĩ ra\").",
    "longExplanation": "One of Vietnamese's most productive directional complements: physical exit OR making something clear/discovered (\"nhớ ra\" = suddenly recall, \"tìm ra\" = discover).",
    "formation": "Động từ + (Tân ngữ) + ra (+ Kết quả)",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Nghe chậm lại một nhịp, tôi mới nhận ra từ nối câu này.",
        "translation": "After slowing it down a beat, I recognized this linking phrase."
      },
      {
        "sentence": "Họ vừa tìm ra lỗi nhỏ khiến phụ đề hiển thị lệch.",
        "translation": "They just discovered the tiny bug causing subtitles to shift."
      }
    ]
  },
  {
    "id": "vi_a2_18",
    "language": "vi",
    "pattern": "Động từ + vào / vô (Hướng vào trong / tham gia)",
    "title": "Verb + vào / vô — Inward & Engagement Complement",
    "shortExplanation": "Shows inward physical motion (\"bước vào\") OR focused engagement/contact (\"nhìn vào\", \"tập trung vào\", \"ghi vào\").",
    "longExplanation": "Northern/standard uses \"vào\", Southern conversation often uses \"vô\". Essential in app instructions like \"bấm vào\" (tap on) or \"chép vào sổ\" (write into notebook).",
    "formation": "Động từ + vào / vô (+ Danh từ)",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Hãy bấm vào từ bạn chưa biết để nghe phát âm chuẩn.",
        "translation": "Tap on any word you don't know to hear clear pronunciation."
      },
      {
        "sentence": "Đừng quên ghi các cụm hay vào sổ ôn tập.",
        "translation": "Don't forget to jot useful phrases down into your review notebook."
      }
    ]
  },
  {
    "id": "vi_a2_19",
    "language": "vi",
    "pattern": "Động từ + lên / xuống (Tăng giảm & hướng trên dưới)",
    "title": "Verb + lên / xuống — Upward/Rising vs. Downward/Lowering",
    "shortExplanation": "\"Lên\" shows upward motion, rising pitch/volume, or improvement; \"xuống\" shows downward motion, lowering, or calming.",
    "longExplanation": "Pairs naturally with sound/pace controls and adjectives: \"nói to lên\" (speak louder), \"chậm xuống\" (slow down), \"tăng lên\" (increase), \"giảm xuống\" (decrease).",
    "formation": "Động từ / Tính từ + lên  vs.  Động từ / Tính từ + xuống",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Bạn có thể nói to lên một chút được không?",
        "translation": "Could you speak up a little bit louder?"
      },
      {
        "sentence": "Khi mệt quá, nhịp đọc của anh ấy chậm hẳn xuống.",
        "translation": "Whenever he got too tired, his reading pace slowed noticeably down."
      }
    ]
  },
  {
    "id": "vi_a2_20",
    "language": "vi",
    "pattern": "Động từ + lại (Lặp lại / giữ lại / phản hồi)",
    "title": "Verb + lại — Repetition, Return & Retention",
    "shortExplanation": "Marks doing something again (\"nghe lại\"), returning (\"quay lại\"), slowing/pausing (\"dừng lại\"), or retaining (\"giữ lại\", \"ghi lại\").",
    "longExplanation": "One of Vietnamese's busiest particles! Context distinguishes repeating (\"đọc lại\") vs replying (\"nhắn lại\") vs pausing/keeping (\"đứng lại\", \"lưu lại\").",
    "formation": "Động từ + lại (+ Đối tượng)",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Tôi thường nghe lại đoạn khó ba lần trước khi xem giải thích.",
        "translation": "I usually replay the tricky clip three times before checking explanations."
      },
      {
        "sentence": "Tới ngã tư phía trước rồi mình dừng lại nghỉ nhé.",
        "translation": "Let's stop and take a break at the intersection ahead."
      }
    ]
  },
  {
    "id": "vi_a2_21",
    "language": "vi",
    "pattern": "Động từ + đi (Rời xa / tiêu biến / thúc giục)",
    "title": "Verb + đi — Awayward Motion, Disappearance & Mild Urge",
    "shortExplanation": "Shows moving away (\"chạy đi\"), losing/fading (\"quên đi\", \"xóa đi\"), OR gently urges someone (\"nói thử đi\").",
    "longExplanation": "At the end of an imperative sentence, \"đi\" often translates as \"go ahead and...\" (\"Ăn đi!\" = Eat up!), while with verbs of removal (\"vứt đi\", \"bỏ đi\") it signals throwing away completely.",
    "formation": "Động từ + đi  |  (Câu đề nghị) + Động từ + đi!",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Đừng giữ những tệp cũ nữa, cứ xóa đi cho nhẹ máy.",
        "translation": "Don't keep those old files—delete them to free up space."
      },
      {
        "sentence": "Sai một chút không sao đâu, bạn cứ mạnh dạn nói thử đi!",
        "translation": "Making a small slip is fine—just go ahead and try speaking!"
      }
    ]
  },
  {
    "id": "vi_a2_22",
    "language": "vi",
    "pattern": "Động từ + về / qua / sang (Về gốc / vượt qua / chuyển sang)",
    "title": "Verb + về / qua / sang — Returning & Crossing Complements",
    "shortExplanation": "Completes verbs with homeward return (\"về\"), passing across/over (\"qua\"), or shifting over to another place/topic (\"sang\").",
    "longExplanation": "Essential verbs in daily stories: \"đi về\" (head home), \"chạy qua\" (stop/drop by), \"chuyển sang\" (switch over to another topic or tab).",
    "formation": "Động từ + về (back/home) / qua (past/across) / sang (across/next to)",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Tối nay tan làm muộn nên chín giờ anh ấy mới về.",
        "translation": "Since he finished work late, he didn't get back until nine PM."
      },
      {
        "sentence": "Sau phần từ vựng, chúng ta chuyển sang luyện nghe nhé.",
        "translation": "After vocabulary, let's switch over to listening practice."
      }
    ]
  },
  {
    "id": "vi_a2_23",
    "language": "vi",
    "pattern": "Động từ + được (Đạt được / có khả năng làm xong)",
    "title": "Verb + được — Potential & Achievement Result ('Managed to / Can')",
    "shortExplanation": "Placed AFTER a verb to show successful achievement (\"tìm được\" = managed to find) or ability (\"nghe được\" = can hear).",
    "longExplanation": "Compare \"được + V\" BEFORE the verb (receiving good luck/permission) vs \"V + được\" AFTER the verb (successfully achieving or being able to perform the action).",
    "formation": "Chủ ngữ + Động từ + được (+ Tân ngữ)",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Cuối cùng tôi cũng tìm được phiên bản có phụ đề chuẩn.",
        "translation": "I finally managed to find a version with accurate subtitles."
      },
      {
        "sentence": "Đoạn này nói nhanh quá nên mình không nghe được chữ cuối.",
        "translation": "This clip is so fast that I couldn't catch the last word."
      }
    ]
  },
  {
    "id": "vi_a2_24",
    "language": "vi",
    "pattern": "Động từ + xong (Hoàn tất dứt điểm)",
    "title": "Verb + xong — Completed Action ('Finish doing')",
    "shortExplanation": "Marks that a task has been completed from start to finish before moving on.",
    "longExplanation": "Pairs smoothly before temporal \"thì / mới\" in sequential sentences: \"Làm xong bài tập rồi mới đi ngủ\" (Finish homework before sleeping).",
    "formation": "Chủ ngữ + Động từ + xong (+ Tân ngữ) (+ rồi)",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Xem xong tập này mình sẽ ôn lại danh sách từ mới.",
        "translation": "Once I finish watching this episode, I'll review the new word list."
      },
      {
        "sentence": "Cô ấy vừa viết xong email gửi cho khách hàng.",
        "translation": "She just finished writing the email to the client."
      }
    ]
  },
  {
    "id": "vi_a2_25",
    "language": "vi",
    "pattern": "Động từ + mất / hết (Mất mát & Cạn sạch)",
    "title": "Verb + mất / hết — Unfortunate Loss vs. Exhaustion",
    "shortExplanation": "\"Mất\" conveys accidental loss or disappearance (\"quên mất\"); \"hết\" signals using/finishing up completely (\"ăn hết\", \"học hết\").",
    "longExplanation": "Both follow action verbs: \"làm mất chìa khóa\" (lost the key), \"quên mất tên\" (completely forgot the name), \"uống hết ly trà\" (drank the whole tea).",
    "formation": "Động từ + mất (+ Tân ngữ)  |  Động từ + hết (+ Tân ngữ)",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Trời ơi, mình quên mất hôm nay có hẹn họp nhóm lúc ba giờ!",
        "translation": "Oh no, I completely forgot we had a group meeting at three today!"
      },
      {
        "sentence": "Chỉ trong một buổi tối cậu ấy đã xem hết cả loạt video ngắn.",
        "translation": "In just one evening he finished watching the entire short video series."
      }
    ]
  },
  {
    "id": "vi_a2_26",
    "language": "vi",
    "pattern": "đã từng + Động từ",
    "title": "đã từng + Verb — Past Life Experience ('Have ever')",
    "shortExplanation": "Describes having experienced something at least once in your life—never use it for yesterday's routine.",
    "longExplanation": "Match it with \"chưa từng\" (never once experienced). Unlike simple \"đã\" (past tense), \"đã từng\" focuses on life experience, just like English \"Have you ever...\".",
    "formation": "Chủ ngữ + đã từng (+ chưa từng) + Động từ",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Bạn đã từng sống ở miền Trung Việt Nam bao giờ chưa?",
        "translation": "Have you ever lived in Central Vietnam before?"
      },
      {
        "sentence": "Tôi đã từng thử học bằng bài hát và thấy nhớ rất lâu.",
        "translation": "I've tried learning through songs before and found it stuck very well."
      }
    ]
  },
  {
    "id": "vi_a2_27",
    "language": "vi",
    "pattern": "mới + Động từ (Vừa mới / Chỉ đến lúc đó mới)",
    "title": "mới + Verb — Recency & 'Only Then' Threshold",
    "shortExplanation": "Before a verb, \"mới\" has two huge jobs: \"just happened\" OR \"only then / not until then\".",
    "longExplanation": "Check context! \"Mình mới tới\" = I just arrived. \"Học kỹ thì mới nhớ lâu\" = Only if you study thoroughly will you remember long.",
    "formation": "Chủ ngữ + (vừa) mới + Động từ  |  Mốc thời gian / Điều kiện + mới + Động từ",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Tôi vừa mới tải ứng dụng này sáng nay thôi.",
        "translation": "I just downloaded this app this very morning."
      },
      {
        "sentence": "Nghe lại câu này lần thứ ba tôi mới hiểu ý tác giả.",
        "translation": "Only on my third listen did I understand the author's meaning."
      }
    ]
  },
  {
    "id": "vi_a2_28",
    "language": "vi",
    "pattern": "vẫn còn + Động từ / Tính từ",
    "title": "vẫn còn + Verb/Adj — Ongoing Persistence ('Still')",
    "shortExplanation": "Emphasizes that a situation, habit, or remaining supply still continues unchanged.",
    "longExplanation": "\"Vẫn\" alone handles verbs/adjectives smoothly; pairing \"vẫn còn\" underscores that some amount or state persists longer than expected.",
    "formation": "Chủ ngữ + vẫn (còn) + Động từ / Tính từ / Danh từ",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Ngoài trời giờ này vẫn còn mưa lất phất.",
        "translation": "Outside it is still drizzling at this hour."
      },
      {
        "sentence": "Sau nhiều năm xa quê, bác ấy vẫn giữ giọng địa phương rất rõ.",
        "translation": "After many years away from home, he still keeps a clear local accent."
      }
    ]
  },
  {
    "id": "vi_a2_29",
    "language": "vi",
    "pattern": "... nhỉ (Tìm sự đồng cảm)",
    "title": "... nhỉ — Seeking Warm Agreement ('Right? / Don't you think?')",
    "shortExplanation": "Added at the end of comments to invite warm agreement or muse aloud together.",
    "longExplanation": "Unlike a factual check (\"phải không?\"), \"nhỉ\" shares a feeling—\"Hôm nay trời mát nhỉ!\" (Lovely cool weather today, isn't it?). Southern speech often uses \"ha / hén\".",
    "formation": "Nhận xét / Cảm nghĩ + nhỉ?",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Video này giải thích ngữ pháp dễ hiểu thật nhỉ!",
        "translation": "This video explains grammar really clearly, doesn't it!"
      },
      {
        "sentence": "Lâu rồi tụi mình chưa ngồi uống trà nói chuyện nhỉ.",
        "translation": "It's been a while since we sat over tea and chatted, hasn't it."
      }
    ]
  },
  {
    "id": "vi_a2_30",
    "language": "vi",
    "pattern": "... đấy / đó (Nhấn mạnh thông báo hoặc nhắc nhẹ)",
    "title": "... đấy / đó — Highlighting Fact or Warning ('You know / Look!')",
    "shortExplanation": "Adds focus when pointing something out, giving friendly warnings, or reacting with surprise.",
    "longExplanation": "Pairs naturally with everyday reminders (\"Cẩn thận trơn đấy!\" = Careful, it's slippery!) and vivid praise (\"Nghe giống người bản xứ rồi đấy!\" = You already sound like a native!).",
    "formation": "Câu thông báo / nhắc nhở + đấy (North) / đó (South)",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Bạn đọc câu đó tự nhiên lắm rồi đấy!",
        "translation": "You read that sentence really naturally just now, you know!"
      },
      {
        "sentence": "Ngoài đường đang tắc xe lắm đó, đi sớm chút nha.",
        "translation": "Traffic is packed out there right now—leave a little early!"
      }
    ]
  },
  {
    "id": "vi_a2_31",
    "language": "vi",
    "pattern": "... cơ mà / mà (Giải thích hoặc phản bác nhẹ)",
    "title": "... cơ mà / mà — Persuasive Reminder ('Come on / But I thought...')",
    "shortExplanation": "Used when gently correcting someone or insisting on a known reason (\"It's still early, though!\").",
    "longExplanation": "Adds emotional warmth or playful protest: \"Mình đã dặn bạn rồi mà!\" (I already told you!) or \"Mới tám giờ cơ mà!\" (Come on, it's only eight!).",
    "formation": "Lý lẽ / Giải thích + cơ mà / mà",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Cứ bình tĩnh, mình mới bắt đầu tuần đầu tiên thôi cơ mà.",
        "translation": "Take it easy—we've only just started the very first week!"
      },
      {
        "sentence": "Hôm qua mình đã gửi đường dẫn cho bạn rồi mà.",
        "translation": "I already sent you the link yesterday, though!"
      }
    ]
  },
  {
    "id": "vi_a2_32",
    "language": "vi",
    "pattern": "... chứ (Khẳng định hiển nhiên / Khác biệt kỳ vọng)",
    "title": "... chứ — Expecting Agreement ('Of course / Surely')",
    "shortExplanation": "Conveys certainty that something obviously holds true—or expresses \"surely not?\" in polite check-ins.",
    "longExplanation": "Depending on intonation: rising \"Đi chứ?\" asks excitedly \"You're coming, right?\", while flat \"Đúng chứ!\" stresses \"Of course that's right!\".",
    "formation": "Câu khẳng định / Câu hỏi + chứ?",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Cuối tuần này bạn vẫn tham gia câu lạc bộ nói tiếng Việt chứ?",
        "translation": "You're still joining the Vietnamese speaking club this weekend, right?"
      },
      {
        "sentence": "Tất nhiên rồi, học mỗi ngày chắc chắn tiến bộ chứ!",
        "translation": "Of course—studying every day will definitely pay off!"
      }
    ]
  },
  {
    "id": "vi_a2_33",
    "language": "vi",
    "pattern": "hơn / nhất (So sánh hơn và nhất)",
    "title": "hơn / nhất — Comparative ('More/-er') & Superlative ('Most/-est')",
    "shortExplanation": "Place \"hơn\" directly AFTER an adjective/verb to compare two things, and \"nhất\" for the superlative.",
    "longExplanation": "No messy prefixes or suffixes! Simply follow the adjective with \"hơn\" (more/better) or \"nhất\" (most/best): \"rẻ hơn\" (cheaper), \"hay nhất\" (best).",
    "formation": "A + Tính từ/Động từ + hơn + B  |  (Trong nhóm) + A + Tính từ + nhất",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Nghe giọng gốc giúp mình quen nhịp điệu nhanh hơn nhiều.",
        "translation": "Listening to native audio helps me get used to the rhythm much faster."
      },
      {
        "sentence": "Đây là bộ phim tài liệu tôi thích nhất trong tháng này.",
        "translation": "This is my favorite documentary of the month."
      }
    ]
  },
  {
    "id": "vi_a2_34",
    "language": "vi",
    "pattern": "giống / khác (+ với) (So sánh tương đồng & khác biệt)",
    "title": "giống / khác (+ với) — Similarity & Difference ('Like / Different from')",
    "shortExplanation": "Compares whether two words, accents, or habits are alike or different.",
    "longExplanation": "Pairs cleanly with intensifiers like \"y hệt\" (identical) or \"hoàn toàn\" (completely). \"Giống\" works with or without \"với\", while \"khác\" often keeps \"với\" in full sentences.",
    "formation": "A + giống (hệt) / khác (hẳn) + (với) + B",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Cách phát âm âm cuối ở hai vùng hơi khác với nhau một chút.",
        "translation": "Final-consonant pronunciation differs slightly between the two regions."
      },
      {
        "sentence": "Từ này nghe gần giống một từ tôi học hôm qua.",
        "translation": "This word sounds almost like a word I learned yesterday."
      }
    ]
  },
  {
    "id": "vi_a2_35",
    "language": "vi",
    "pattern": "mà lại (Tương phản gây ngạc nhiên nhẹ)",
    "title": "mà lại — Unexpected Contrast ('And yet / Instead')",
    "shortExplanation": "Connects two facts when the second feels slightly surprising or contradictory given the first.",
    "longExplanation": "Softer and more conversational than formal \"nhưng mà\". Great for irony or pleasant surprises: \"Ngắn gọn mà lại rất đầy đủ\" (Short, yet very thorough).",
    "formation": "Vế 1 + mà lại + Kết quả bất ngờ",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Video chỉ dài ba phút mà lại giải thích rất rõ từng bước.",
        "translation": "The video is only three minutes long, yet explains every step clearly."
      },
      {
        "sentence": "Trời nắng to thế này mà lại nổi gió lạnh bất ngờ.",
        "translation": "It's super sunny like this, yet a cold breeze suddenly picked up."
      }
    ]
  },
  {
    "id": "vi_a2_36",
    "language": "vi",
    "pattern": "để + Động từ / Mệnh đề (Mục đích)",
    "title": "để + Verb/Clause — Expressing Purpose ('In order to / So that')",
    "shortExplanation": "Links an action directly to its purpose (\"pause to check\", \"turn on captions so I can follow\").",
    "longExplanation": "Same word whether followed directly by a verb (\"để hiểu rõ\") or a full new subject + verb (\"để mọi người cùng nghe\").",
    "formation": "Hành động + để (+ Chủ ngữ) + Động từ mục đích",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Mình bật phụ đề hai dòng để vừa nghe vừa đối chiếu nghĩa.",
        "translation": "I turned on dual subtitles to listen and compare meanings together."
      },
      {
        "sentence": "Nói chậm một chút để bạn mới học còn theo kịp nhé.",
        "translation": "Speak a bit slower so beginners can still keep up."
      }
    ]
  },
  {
    "id": "vi_b1_17",
    "language": "vi",
    "pattern": "làm cho + Tân ngữ + Tính/Động từ",
    "title": "làm cho + Object + Adj/Verb — Natural Causative ('Make / Cause')",
    "shortExplanation": "Expresses that something triggers a feeling or state change in someone or something.",
    "longExplanation": "Neutral and everyday causative used constantly for emotions and practical effects (\"làm cho câu văn mượt hơn\" = makes the sentence smoother). \"Cho\" can be kept for emphasis or dropped in concise phrases.",
    "formation": "Nguyên nhân + làm (cho) + Đối tượng + Thay đổi trạng thái/hành động",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Giọng đọc truyền cảm làm cho bài phóng sự cuốn hút hẳn lên.",
        "translation": "An expressive voice makes the news feature much more engaging."
      },
      {
        "sentence": "Âm thanh nền quá ồn làm cho người nghe khó tập trung.",
        "translation": "Loud background noise makes it hard for listeners to concentrate."
      }
    ]
  },
  {
    "id": "vi_b1_18",
    "language": "vi",
    "pattern": "khiến (cho) + Tân ngữ + Động/Tính từ",
    "title": "khiến (cho) + Object + Verb/Adj — Expressive Causative ('Drive / Prompt')",
    "shortExplanation": "Slightly stronger and more literary/news-style sibling of \"làm cho\", highlighting involuntary reactions.",
    "longExplanation": "Frequent in journalism, storytelling, and commentary when an external event compels a strong reaction (\"khiến nhiều người bất ngờ\" = left many people surprised).",
    "formation": "Nguyên nhân + khiến (cho) + Đối tượng + Phản ứng",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Tin tức bất ngờ đó khiến cả phòng họp im lặng vài giây.",
        "translation": "That unexpected news made the entire meeting room go quiet for seconds."
      },
      {
        "sentence": "Câu chơi chữ khéo léo khiến người xem bật cười thích thú.",
        "translation": "The clever wordplay caused viewers to burst out laughing with delight."
      }
    ]
  },
  {
    "id": "vi_b1_19",
    "language": "vi",
    "pattern": "bảo / nhờ / giúp + Người + Động từ",
    "title": "bảo / nhờ / giúp + Person + Verb — Directives, Requests & Help",
    "shortExplanation": "Distinguishes telling/instructing (\"bảo\"), asking politely for a favor (\"nhờ\"), and assisting (\"giúp\").",
    "longExplanation": "Remember social nuance: \"nhờ\" asks kindly without authority, \"bảo\" suits peers/juniors or relaying instructions, and \"giúp\" stresses helping someone accomplish it.",
    "formation": "Chủ ngữ + bảo / nhờ / giúp + Người + Động từ",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Tôi nhờ người bạn bản xứ kiểm tra giúp phần phát âm thanh hỏi.",
        "translation": "I asked a native friend to help check my falling-rising tone pronunciation."
      },
      {
        "sentence": "Cô giáo bảo cả lớp nghe lại đoạn đối thoại một lần nữa.",
        "translation": "The teacher told the class to listen to the dialogue once more."
      }
    ]
  },
  {
    "id": "vi_b1_20",
    "language": "vi",
    "pattern": "càng ngày càng + Tính/Động từ",
    "title": "càng ngày càng — Progressive Intensification ('More and more / Increasingly')",
    "shortExplanation": "Describes a steady trend growing stronger over time (\"ngày càng\" is the concise alternative).",
    "longExplanation": "Both \"càng ngày càng\" (conversational) and \"ngày càng\" (clean/news-style) express gradual upward or downward progression.",
    "formation": "Chủ ngữ + càng ngày càng + Tính từ / Động từ",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Càng luyện tập, bạn sẽ thấy việc nghe hiểu càng ngày càng nhẹ nhàng hơn.",
        "translation": "With practice, you'll find listening becomes increasingly effortless."
      },
      {
        "sentence": "Nội dung học tiếng Việt trên YouTube ngày càng đa dạng.",
        "translation": "Vietnamese-learning content on YouTube is becoming more and more diverse."
      }
    ]
  },
  {
    "id": "vi_b1_21",
    "language": "vi",
    "pattern": "càng ... càng ... (Tương quan tỷ lệ)",
    "title": "càng ... càng ... — Double Proportional ('The more ..., the more ...')",
    "shortExplanation": "Links two qualities moving in lockstep—just like English \"The more..., the more...\".",
    "longExplanation": "Often drops the repeated subject if clear from context: \"Càng đọc to càng nhanh thuộc\" (The louder you read, the faster you memorize).",
    "formation": "Càng + Động/Tính từ 1, (chủ ngữ) + càng + Động/Tính từ 2",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Bạn càng nghe nhiều giọng vùng miền, tai bạn càng linh hoạt.",
        "translation": "The more regional accents you listen to, the sharper your ear becomes."
      },
      {
        "sentence": "Câu chuyện càng về cuối càng kịch tính.",
        "translation": "The story gets more suspenseful the closer it gets to the end."
      }
    ]
  },
  {
    "id": "vi_b1_22",
    "language": "vi",
    "pattern": "suýt nữa thì (Thoát trong gang tấc)",
    "title": "suýt nữa thì — Narrow Escape ('Almost / Nearly')",
    "shortExplanation": "Marks an undesirable close call that narrowly avoided happening.",
    "longExplanation": "CRITICAL NUANCE: Use \"suýt nữa thì\" ONLY for things you are glad did NOT happen (missing a bus, dropping a cup, forgetting a file). Never use it for happy near-misses like almost winning!",
    "formation": "(Tôi) suýt nữa (thì) + Động từ không mong muốn",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Sáng nay ngủ quên, tôi suýt nữa thì lỡ chuyến tàu sớm.",
        "translation": "Having overslept this morning, I nearly missed the early train."
      },
      {
        "sentence": "May quá, suýt nữa thì mình bấm nhầm nút xóa toàn bộ danh sách.",
        "translation": "What a relief—I almost pressed the delete-all button by mistake."
      }
    ]
  },
  {
    "id": "vi_b1_23",
    "language": "vi",
    "pattern": "lẽ ra (nên) (Hối tiếc hoặc trách nhẹ việc đã qua)",
    "title": "lẽ ra (nên) — Past Expectation & Hindsight ('Should have / Was supposed to')",
    "shortExplanation": "Looks back at what ought to have happened differently compared with actual outcome.",
    "longExplanation": "Pairs naturally with a contrasting \"nhưng\" or \"mà\" clause pointing out what actually happened.",
    "formation": "Lẽ ra (+ Chủ ngữ) + nên / đã phải + Động từ (+ nhưng lại...)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Lẽ ra mình nên kiểm tra micro trước khi bắt đầu ghi âm.",
        "translation": "I really should have checked the mic before starting the recording."
      },
      {
        "sentence": "Lẽ ra cuộc họp đã xong sớm hơn nếu mạng không chập chờn.",
        "translation": "The meeting should have finished earlier if the Wi-Fi hadn't dropped."
      }
    ]
  },
  {
    "id": "vi_b1_24",
    "language": "vi",
    "pattern": "hóa ra (là) (Phát hiện sự thật ngược kỳ vọng)",
    "title": "hóa ra (là) — Surprise Twist ('Turns out that...')",
    "shortExplanation": "Reveals the real truth after holding a mistaken assumption.",
    "longExplanation": "Pairs brilliantly with \"tưởng\" (thought/assumed): \"Tưởng khó lắm, hóa ra dễ không ngờ!\" (I thought it was hard—turns out it's surprisingly easy!).",
    "formation": "Tưởng rằng A, hóa ra (là) + B",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Ban đầu tưởng từ mới phức tạp, hóa ra ghép từ hai chữ rất quen.",
        "translation": "At first the word looked complex, yet it turns out to combine two familiar roots."
      },
      {
        "sentence": "Hóa ra hai bạn học cùng trường cấp ba từ lâu rồi!",
        "translation": "Turns out you two attended the exact same high school back then!"
      }
    ]
  },
  {
    "id": "vi_b1_25",
    "language": "vi",
    "pattern": "thảo nào / hèn gì (Bảo sao / Hèn chi)",
    "title": "thảo nào / hèn gì — 'No Wonder!' Reaction",
    "shortExplanation": "Used when you suddenly connect a cause you just heard to an effect that puzzled you earlier.",
    "longExplanation": "\"Thảo nào\" leans Northern/standard, while \"hèn gì / hèn chi\" leans Southern/colloquial; both translate cleanly to \"No wonder!\".",
    "formation": "Thảo nào / Hèn gì (+ mà) + Kết quả vừa quan sát",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "À, cô ấy từng sống ở Huế năm năm—thảo nào nói giọng ngọt thế!",
        "translation": "Ah, she lived in Hue for five years—no wonder her accent sounds so sweet!"
      },
      {
        "sentence": "Ngoài kia mưa to từ nãy giờ, hèn gì trời mát rượi hẳn lên.",
        "translation": "It's been pouring outside—no wonder the air cooled down so nicely."
      }
    ]
  },
  {
    "id": "vi_b1_26",
    "language": "vi",
    "pattern": "thà ... còn hơn ... (Thà chọn ít dở hơn)",
    "title": "thà ... còn hơn ... — Choosing the Lesser Burden ('Would rather ... than ...')",
    "shortExplanation": "Expresses a strong personal preference between two imperfect options.",
    "longExplanation": "Notice the sharp contrast: you would rather endure Option 1 than suffer Option 2 (\"thà nghe chậm mà chắc còn hơn tua nhanh rồi quên sạch\").",
    "formation": "(Tôi) thà + Lựa chọn 1 + còn hơn (là) + Lựa chọn 2",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Mình thà học năm câu thật kỹ còn hơn lướt qua năm mươi câu.",
        "translation": "I'd rather study five sentences thoroughly than skim past fifty."
      },
      {
        "sentence": "Thà hỏi lại cho chắc còn hơn đoán mò rồi dùng sai.",
        "translation": "Better to ask again and be sure than guess blindly and misuse it."
      }
    ]
  },
  {
    "id": "vi_b1_27",
    "language": "vi",
    "pattern": "miễn là + Mệnh đề (Điều kiện tối thiểu)",
    "title": "miễn là + Clause — Sole Necessary Condition ('As long as / Provided that')",
    "shortExplanation": "Signals that you accept everything else as long as one essential condition is met.",
    "longExplanation": "Sets a clear bottom line in negotiations, study plans, and friendly agreements.",
    "formation": "Mệnh đề chính, miễn là + Điều kiện duy nhất",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Tốc độ nói không quan trọng, miễn là phát âm rõ từng thanh.",
        "translation": "Speaking speed doesn't matter, as long as each tone stays clear."
      },
      {
        "sentence": "Hôm nào học cũng được, miễn là duy trì đều mỗi ngày mười phút.",
        "translation": "Any time of day works, provided you keep up a steady ten minutes daily."
      }
    ]
  },
  {
    "id": "vi_b1_28",
    "language": "vi",
    "pattern": "trừ khi + Mệnh đề (Ngoại lệ duy nhất)",
    "title": "trừ khi + Clause — Conditional Exception ('Unless')",
    "shortExplanation": "States that the main action holds true in every case EXCEPT when a specific condition occurs.",
    "longExplanation": "Works identically to English \"unless\": avoid adding extra \"nếu\" inside \"trừ khi\". Can precede or follow the main clause.",
    "formation": "Mệnh đề chính, trừ khi + Tình huống ngoại lệ",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Tối nay tụi mình vẫn học nhóm bình thường, trừ khi trời mưa bão.",
        "translation": "We're still meeting for study group tonight, unless there's a storm."
      },
      {
        "sentence": "Đừng bật dịch sẵn ngay từ đầu, trừ khi câu đó thật sự quá khó.",
        "translation": "Avoid turning on full translations from the start unless a line is truly tough."
      }
    ]
  },
  {
    "id": "vi_b1_29",
    "language": "vi",
    "pattern": "nhân tiện (Tận dụng dịp sẵn có)",
    "title": "nhân tiện — Opportune Side Action ('By the way / While at it')",
    "shortExplanation": "Introduces something convenient done alongside your current errand, trip, or conversation.",
    "longExplanation": "Conversationally versatile: either \"Nhân tiện đang ở đây...\" (= while we're here) or \"À nhân tiện hỏi chút...\" (= by the way, quick question).",
    "formation": "(Vế bối cảnh), nhân tiện (+ Chủ ngữ) + Hành động kèm theo",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Mình ra siêu thị mua sữa, nhân tiện ghé hiệu sách lấy từ điển.",
        "translation": "I went out to the supermarket for milk, and dropped by the bookstore while I was out."
      },
      {
        "sentence": "Nhân tiện bạn đang mở tập tin đó, kiểm tra giúp mình dòng cuối nhé.",
        "translation": "Since you already have that file open, could you check the last line for me?"
      }
    ]
  },
  {
    "id": "vi_b1_30",
    "language": "vi",
    "pattern": "hình như / có vẻ như (Phỏng đoán nhẹ)",
    "title": "hình như / có vẻ như — Hedged Impression ('It seems / Looks like')",
    "shortExplanation": "Softens an observation when you aren't 100% sure, preventing blunt mistakes.",
    "longExplanation": "\"Hình như\" leans on memory or intuition (\"I think maybe...\"); \"có vẻ như\" relies more on visible or audible clues (\"judging by how it looks/sounds...\").",
    "formation": "Hình như / Có vẻ (như) + Mệnh đề phỏng đoán",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Hình như phụ đề tập này hơi nhanh hơn âm thanh một giây.",
        "translation": "It seems the subtitles in this episode run about a second ahead of the audio."
      },
      {
        "sentence": "Sau hai tuần luyện tập, giọng bạn có vẻ tự tin hơn hẳn rồi đấy.",
        "translation": "After two weeks of practice, your voice seems noticeably more confident."
      }
    ]
  },
  {
    "id": "vi_b1_31",
    "language": "vi",
    "pattern": "chẳng qua là (Chỉ đơn giản là... chứ không gì to tát)",
    "title": "chẳng qua là — Downplaying Reason ('Simply / Merely because...')",
    "shortExplanation": "Reframes something seemingly mysterious or dramatic as having a plain, simple explanation.",
    "longExplanation": "Matches English \"It's simply that... / Nothing more than...\". Very natural when reassuring someone or explaining away a misunderstanding.",
    "formation": "(Vấn đề A) chẳng qua (chỉ) là + Nguyên nhân đơn giản (+ thôi / mà thôi)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Anh ấy không giận đâu, chẳng qua là đang tập trung làm nốt báo cáo thôi.",
        "translation": "He isn't angry—it's simply that he's focused on finishing the report."
      },
      {
        "sentence": "Lúc đầu nghe lạ tai chẳng qua vì bạn chưa quen ngữ điệu miền Nam.",
        "translation": "It only sounded unusual at first simply because you weren't used to Southern intonation."
      }
    ]
  },
  {
    "id": "vi_b1_32",
    "language": "vi",
    "pattern": "vậy mà / thế mà (Ngược lại hoàn toàn kỳ vọng)",
    "title": "vậy mà / thế mà — Sharp Surprising Twist ('Yet / Even so')",
    "shortExplanation": "Links two sentences or clauses when the actual result strongly contradicts expectation.",
    "longExplanation": "Carries noticeably stronger surprise or mild disbelief than plain \"nhưng\".",
    "formation": "Tiền đề 1; vậy mà / thế mà + Kết quả ngược hẳn kỳ vọng",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Dự báo sáng nay bảo trời nắng cả ngày, vậy mà chiều lại đổ mưa rào.",
        "translation": "This morning's forecast said sun all day, yet by afternoon it poured."
      },
      {
        "sentence": "Từ này trông dài thế mà phát âm lại rất quy luật.",
        "translation": "This word looks so long, yet its pronunciation is remarkably regular."
      }
    ]
  },
  {
    "id": "vi_b1_33",
    "language": "vi",
    "pattern": "... chứ không phải ... (Đính chính rõ A, không phải B)",
    "title": "... chứ không phải ... — Contrastive Correction ('... rather than / not ...')",
    "shortExplanation": "Clearly clarifies what something truly IS (A) while ruling out a common confusion (B).",
    "longExplanation": "Super helpful when correcting misunderstandings, explaining word nuances, or setting priorities cleanly.",
    "formation": "Chủ ngữ + A + chứ không phải (+ là) + B",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Trong câu này \"chỉ\" là phó từ nhấn mạnh, chứ không phải động từ chỉ tay.",
        "translation": "Here \"chỉ\" is an emphasizing adverb, rather than the verb meaning to point."
      },
      {
        "sentence": "Quan trọng là hiểu ngữ cảnh chứ không phải dịch từng chữ rời rạc.",
        "translation": "What matters is grasping context rather than translating isolated words."
      }
    ]
  },
  {
    "id": "vi_b1_34",
    "language": "vi",
    "pattern": "không những ... mà còn ... (Không chỉ... mà còn)",
    "title": "không những ... mà còn ... — Cumulative Escalation ('Not only ... but also ...')",
    "shortExplanation": "Stacks a second, often stronger benefit or point on top of the first.",
    "longExplanation": "Also frequently seen with \"không chỉ ... mà còn ...\" (identical meaning, slightly crisper rhythm).",
    "formation": "Chủ ngữ + không những + A + mà còn + B",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Xem video có phụ đề không những cải thiện nghe mà còn mở rộng từ vựng.",
        "translation": "Watching captioned videos not only improves listening, but also expands vocabulary."
      },
      {
        "sentence": "Cô ấy không những nói trôi chảy mà còn nắm chắc ngữ điệu từng vùng.",
        "translation": "She not only speaks fluently, but also nails regional intonations."
      }
    ]
  },
  {
    "id": "vi_b1_35",
    "language": "vi",
    "pattern": "nếu ... thì ... (Điều kiện & Kết quả)",
    "title": "nếu ... thì ... — Conditional Frame ('If ..., then ...')",
    "shortExplanation": "Core conditional builder—keep \"thì\" in the result clause even though English omits \"then\"!",
    "longExplanation": "In polite or hypothetical situations, speakers sometimes replace \"nếu\" with \"giả sử\" (suppose) or omit \"nếu\" while keeping \"thì\": \"Rảnh thì ghé chơi!\" (If free, stop by!).",
    "formation": "Nếu (+ như) + Điều kiện, thì + Kết quả",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Nếu gặp cụm thành ngữ lạ, bạn hãy bấm vào để xem giải thích nhé.",
        "translation": "If you encounter an unfamiliar idiom, tap it to check the explanation."
      },
      {
        "sentence": "Nếu hôm qua trời không mưa lớn thì buổi dã ngoại đã rất vui.",
        "translation": "If it hadn't poured yesterday, the picnic would have been great."
      }
    ]
  },
  {
    "id": "vi_b1_36",
    "language": "vi",
    "pattern": "vừa ... vừa ... (Song song hai hành động/tính chất)",
    "title": "vừa ... vừa ... — Concurrent Actions or Dual Qualities ('Both ... and ... / While ...')",
    "shortExplanation": "Describes two actions happening at the exact same moment OR two traits held together.",
    "longExplanation": "Works seamlessly for verbs (\"vừa đi bộ vừa nghe podcast\" = listen while walking) and adjectives (\"vừa nhanh vừa chính xác\" = both fast and accurate).",
    "formation": "Chủ ngữ + vừa + Động/Tính từ 1 + vừa + Động/Tính từ 2",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Tôi thích vừa pha cà phê sáng vừa nghe bản tin ngắn.",
        "translation": "I like making morning coffee while listening to the short news briefing."
      },
      {
        "sentence": "Ứng dụng thiết kế vừa gọn nhẹ vừa dễ tra cứu từ mới.",
        "translation": "The app is designed to be both lightweight and easy for looking up new words."
      }
    ]
  },
  {
    "id": "vi_b2_17",
    "language": "vi",
    "pattern": "Từ láy AABB / ABAB",
    "title": "Reduplication AABB / ABAB — Expressive Nuance & Rhythm",
    "shortExplanation": "Repeats whole words or altered tones/syllables to soften, intensify, or add vivid rhythm.",
    "longExplanation": "Partial reduplication with softening tone (\"nhè nhẹ\" = gently, \"đo đỏ\" = reddish) softens meaning, while AABB/ABAB forms add restless continuity or expressive vividness.",
    "formation": "đo đỏ, nhè nhẹ, vui vui  |  vội vội vàng vàng, đi đi lại lại",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Trời chiều thu se se lạnh, gió thổi nhè nhẹ qua hàng cây.",
        "translation": "Autumn evening felt mildly crisp as a gentle breeze blew through the trees."
      },
      {
        "sentence": "Cậu ấy cứ đi đi lại lại trước phòng thi vì hồi hộp.",
        "translation": "He kept pacing back and forth outside the exam room out of nerves."
      }
    ]
  },
  {
    "id": "vi_b2_18",
    "language": "vi",
    "pattern": "Động từ + đi + Động từ + lại",
    "title": "V đi V lại — Persistent Repetition ('Over and over / Back and forth')",
    "shortExplanation": "Repeats the same verb around \"đi ... lại\" to highlight repeated effort, pacing, or insistence.",
    "longExplanation": "Works with everyday verbs of study, speech, and motion: \"nghe đi nghe lại\" (listen repeatedly), \"nói đi nói lại\" (repeat oneself), \"suy đi nghĩ lại\" (think thoroughly back and forth).",
    "formation": "Chủ ngữ + Động từ + đi + Động từ + lại",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Mình phải nghe đi nghe lại câu đó năm lần mới bắt được nối âm.",
        "translation": "I had to replay that line over and over five times to catch the linking sound."
      },
      {
        "sentence": "Hãy đọc đi đọc lại đoạn hội thoại ngắn cho đến khi trôi chảy.",
        "translation": "Read the short dialogue over and over until it flows smoothly."
      }
    ]
  },
  {
    "id": "vi_b2_19",
    "language": "vi",
    "pattern": "làm gì có / làm sao mà (Phản bác hùng biện)",
    "title": "làm gì có / làm sao mà — Emphatic Rhetorical Denial ('No way / How could...')",
    "shortExplanation": "Vigorous conversational way to deny something strongly or say something is plainly impossible.",
    "longExplanation": "Notice neither actually asks for facts—they passionately mean \"There's no such thing!\" or \"How could anyone possibly...\".",
    "formation": "Làm gì có + Danh từ / Chuyện đó!  |  Làm sao mà + Động từ + được!",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Làm gì có chuyện học một đêm mà nhớ hết cả ngàn từ!",
        "translation": "There's no way anyone memorizes a thousand words in one night!"
      },
      {
        "sentence": "Không bật âm thanh thì làm sao mà phân biệt được thanh điệu!",
        "translation": "Without audio on, how could anyone possibly tell the tones apart!"
      }
    ]
  },
  {
    "id": "vi_b2_20",
    "language": "vi",
    "pattern": "đâu có + Động/Tính từ (Phủ nhận nhẹ nhàng tự nhiên)",
    "title": "đâu có — Colloquial Emphatic Negation ('Not at all / It's not like...')",
    "shortExplanation": "Natural conversational denial that sounds warmer and less stiff than \"không hề\".",
    "longExplanation": "Frequently echoes \"đâu\" again at the end for extra emphasis: \"Mình đâu có nói thế đâu!\" (I didn't say that at all!).",
    "formation": "Chủ ngữ + đâu (có) + Động/Tính từ (+ đâu)",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Mình đâu có chê đâu, chỉ góp ý nhỏ cho dễ nghe hơn thôi.",
        "translation": "I wasn't criticizing at all—just offering a small suggestion to make it clearer."
      },
      {
        "sentence": "Bài nghe hôm nay đâu có khó như hôm qua tụi mình tưởng.",
        "translation": "Today's listening wasn't nearly as hard as we expected yesterday."
      }
    ]
  },
  {
    "id": "vi_b2_21",
    "language": "vi",
    "pattern": "chẳng lẽ lại (Nghi vấn ngạc nhiên không tin nổi)",
    "title": "chẳng lẽ lại — Disbelieving Rhetorical Check ('Could it really be that...?')",
    "shortExplanation": "Asks in mild disbelief whether an unlikely conclusion could possibly be true.",
    "longExplanation": "Signals skepticism or reluctant realization—usually expecting the answer \"Surely not!\" unless irony is intended.",
    "formation": "Chẳng lẽ (+ Chủ ngữ) + lại + Kết quả khó tin (+ sao / à)?",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Chẳng lẽ cả tuần nay cậu chưa hề mở sách ôn một lần nào à?",
        "translation": "Could it really be that you haven't opened your review book once all week?"
      },
      {
        "sentence": "Từ dễ vậy mà chẳng lẽ mình lại nghe nhầm sang nghĩa khác sao?",
        "translation": "Could I really have misheard such an easy word as a different meaning?"
      }
    ]
  },
  {
    "id": "vi_b2_22",
    "language": "vi",
    "pattern": "bất chấp (Vượt qua / Không màng trở ngại)",
    "title": "bất chấp — Defying Obstacles ('Regardless of / Despite')",
    "shortExplanation": "Formal-to-neutral preposition showing determination despite harsh barriers, risks, or rules.",
    "longExplanation": "Stronger and more resolute than \"mặc dù\"—carries deliberate defiance or persistence in spite of tough conditions.",
    "formation": "Bất chấp + Trở ngại / Quy tắc, Chủ ngữ + Hành động  |  S + V + bất chấp + ...",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Bất chấp thời tiết mưa gió, buổi giao lưu ngôn ngữ vẫn kín chỗ.",
        "translation": "Despite the stormy weather, the language meetup was still packed."
      },
      {
        "sentence": "Cô ấy kiên trì học mỗi ngày bất chấp lịch làm việc bận rộn.",
        "translation": "She kept studying daily regardless of her packed work schedule."
      }
    ]
  },
  {
    "id": "vi_b2_23",
    "language": "vi",
    "pattern": "nhờ có ... mới ... (Ghi công nhân tố quyết định)",
    "title": "nhờ có ... mới ... — Attributed Breakthrough ('Only thanks to ... did ...')",
    "shortExplanation": "Credits a helpful factor as the crucial reason a positive success became possible.",
    "longExplanation": "Strictly for POSITIVE results! For bad outcomes, switch to \"chỉ tại / do\". Pairing \"nhờ có ... mới\" sharpens focus on the key turning point.",
    "formation": "Nhờ (có) + Yếu tố tích cực, (chủ ngữ) + mới + Kết quả tốt",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Nhờ có thói quen ghi âm tự nghe lại, phát âm của mình mới tiến bộ nhanh thế.",
        "translation": "It's thanks to recording and replaying myself that my pronunciation improved so fast."
      },
      {
        "sentence": "Nhờ anh nhắc kịp thời nên tụi em mới tránh được lỗi sai này.",
        "translation": "Thanks to your timely reminder, we were able to avoid this mistake."
      }
    ]
  },
  {
    "id": "vi_b2_24",
    "language": "vi",
    "pattern": "do / bởi vì ... nên mới ... (Chuỗi nhân quả nhấn mạnh)",
    "title": "do ... nên mới ... — Focused Causal Chain ('Because of ..., that's why...')",
    "shortExplanation": "Tightens a cause-and-effect link by adding \"mới\" to explain why an outcome specifically turned out that way.",
    "longExplanation": "Putting \"mới\" before the second verb focuses the listener on how logically the effect followed from that exact root cause.",
    "formation": "Do / Bởi vì + Nguyên nhân, nên (+ S) + mới + Hệ quả",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Do nhiều từ ghép mang âm Hán Việt nên người mới học hay thấy trừu tượng.",
        "translation": "Because many compounds are Sino-Vietnamese, beginners often find them abstract."
      },
      {
        "sentence": "Vì phụ đề chia từng cụm ngắn nên người học mới kịp đọc theo âm thanh.",
        "translation": "Because captions break into short chunks, learners can read along smoothly."
      }
    ]
  },
  {
    "id": "vi_b2_25",
    "language": "vi",
    "pattern": "nói gì thì nói (Chốt vấn đề cốt lõi)",
    "title": "nói gì thì nói — Bottom-Line Pivot ('Say what you will, still / All things considered')",
    "shortExplanation": "Acknowledges varied opinions, then lands firmly on the one undeniable truth.",
    "longExplanation": "Great spoken discourse glue in discussions and reviews before delivering your balanced bottom line.",
    "formation": "Nói gì thì nói, + Nhận định cốt lõi không thể chối cãi",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Nói gì thì nói, nền tảng ngữ âm vững vẫn là chìa khóa cho người mới.",
        "translation": "Say what you will, solid phonetics remains the key foundation for beginners."
      },
      {
        "sentence": "Nói gì thì nói, tự nghe được câu nói ngoài đời thật vẫn sướng nhất.",
        "translation": "All things considered, catching real-life lines by yourself feels best."
      }
    ]
  },
  {
    "id": "vi_b2_26",
    "language": "vi",
    "pattern": "xét cho cùng (Suy cho cùng / Đánh giá tổng thể)",
    "title": "xét cho cùng — Analytical Bottom Line ('After all / Ultimately')",
    "shortExplanation": "Steps back from surface details to weigh the bigger picture fairly.",
    "longExplanation": "Slightly more analytical and reflective than casual \"nói gì thì nói\"—ideal for balanced summaries and essays.",
    "formation": "Xét cho cùng, + Kết luận tổng quát",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Xét cho cùng, mục tiêu của học ngôn ngữ là hiểu và kết nối với con người.",
        "translation": "Ultimately, the goal of language learning is understanding and connecting with people."
      },
      {
        "sentence": "Xét cho cùng, lỗi sai nhỏ giúp mình nhớ cách dùng đúng lâu hơn.",
        "translation": "After all, minor slips help us remember the right usage much longer."
      }
    ]
  },
  {
    "id": "vi_b2_27",
    "language": "vi",
    "pattern": "trước sau gì cũng (Chắc chắn không sớm thì muộn)",
    "title": "trước sau gì cũng — Inevitable Outcome ('Sooner or later')",
    "shortExplanation": "Expresses confidence that an event is bound to happen eventually.",
    "longExplanation": "Pairs \"trước sau gì\" with \"cũng\" to eliminate doubt about timing—like English \"sooner or later / eventually\".",
    "formation": "Trước sau gì (+ Chủ ngữ) + cũng + Động từ/Kết quả",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Cứ tiếp xúc mỗi ngày đi, trước sau gì bạn cũng bật ra được câu tự nhiên.",
        "translation": "Keep getting daily input—sooner or later you'll produce natural sentences effortlessly."
      },
      {
        "sentence": "Vấn đề này trước sau gì cũng phải bàn thẳng với nhau một lần.",
        "translation": "We're going to have to discuss this issue openly sooner or later."
      }
    ]
  },
  {
    "id": "vi_b2_28",
    "language": "vi",
    "pattern": "chỉ tại (Đổ lỗi trực tiếp cho một lý do duy nhất)",
    "title": "chỉ tại — Pinpointing Blame ('All because of / Just because of...')",
    "shortExplanation": "Fixes blame playfully or seriously onto one specific irritant or mistake.",
    "longExplanation": "Strictly negative/regretful counterpart of \"nhờ có\": used from affectionate teasing (\"Chỉ tại anh đến muộn!\") to genuine frustration.",
    "formation": "(Kết quả xấu) chỉ tại + Nguyên nhân bị trách",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Chỉ tại hôm qua thức khuya xem hết bộ phim nên sáng nay buồn ngủ rũ.",
        "translation": "All because I stayed up binging that show last night, I'm dead sleepy this morning."
      },
      {
        "sentence": "Mình quên mất đáp án cũng chỉ tại không ôn lại sau hai ngày.",
        "translation": "I forgot the answer simply because I didn't review it after two days."
      }
    ]
  },
  {
    "id": "vi_b2_29",
    "language": "vi",
    "pattern": "vừa mới ... đã ... (Liên tiếp nhanh chóng / Quá sớm)",
    "title": "vừa mới ... đã ... — Instant Follow-Up ('No sooner ... than / Hardly ... already')",
    "shortExplanation": "Highlights that the second event happened right on the heels of the first—surprisingly fast!",
    "longExplanation": "Often underlines impatience, speed, or astonishment: \"Vừa mới mở mắt đã thấy tin nhắn\" (Scarcely opened my eyes when a message was already there).",
    "formation": "Chủ ngữ + vừa mới + Hành động 1 + (thì/mà) + đã + Hành động 2",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Video vừa mới đăng lên mười phút mà đã có hàng trăm bình luận.",
        "translation": "No sooner had the video been posted for ten minutes than hundreds of comments poured in."
      },
      {
        "sentence": "Mới học được vài hôm mà bạn đã nghe bắt kịp nhiều câu rồi đấy.",
        "translation": "Having studied only a few days, you're already catching lots of lines."
      }
    ]
  },
  {
    "id": "vi_b2_30",
    "language": "vi",
    "pattern": "chưa ... đã ... (Vội vàng / Sớm hơn trình tự)",
    "title": "chưa ... đã ... — Prematurely Jumping Ahead ('Before even ... already...')",
    "shortExplanation": "Comments that someone skips step A and jumps straight to step B too soon.",
    "longExplanation": "Pairs \"chưa\" (not yet) with \"đã\" (already) to critique haste or describe lightning-fast surprises.",
    "formation": "Chủ ngữ + chưa (+ kịp) + Việc A + (mà) đã + Việc B",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Nhiều bạn chưa nghe hết câu đã vội tra từng chữ một.",
        "translation": "Many learners rush to look up every word before even hearing the full sentence."
      },
      {
        "sentence": "Hội thảo chưa kịp kết thúc mà khán giả đã xếp hàng xin chữ ký.",
        "translation": "Before the talk even wrapped up, attendees were already lining up for signatures."
      }
    ]
  },
  {
    "id": "vi_b2_31",
    "language": "vi",
    "pattern": "đến mức (mà) (Mức độ cực điểm dẫn đến kết quả)",
    "title": "đến mức (mà) — Extreme Degree ('To the point where / So much that')",
    "shortExplanation": "Describes an intensity reaching an extreme threshold with dramatic consequences.",
    "longExplanation": "Stronger and more vivid than neutral \"quá ... nên\", equivalent to English \"to such an extent that...\".",
    "formation": "Động/Tính từ + đến mức (mà) + Hệ quả cực điểm",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Đoạn hài kịch duyên dáng đến mức mình xem đi xem lại mà vẫn cười.",
        "translation": "The comedy sketch was so charming that even rewatching it still made me laugh."
      },
      {
        "sentence": "Cô ấy luyện đọc nhại theo chuẩn đến mức nhiều người tưởng sinh ra ở Hà Nội.",
        "translation": "She shadowed pronunciation so accurately that many thought she grew up in Hanoi."
      }
    ]
  },
  {
    "id": "vi_b2_32",
    "language": "vi",
    "pattern": "tùy theo / tùy thuộc vào (Phụ thuộc điều kiện biến đổi)",
    "title": "tùy theo / tùy thuộc vào — Conditional Dependence ('Depending on')",
    "shortExplanation": "Explains that what happens or what choice is best changes based on specific conditions.",
    "longExplanation": "\"Tùy theo\" works slightly lighter for guidelines and preferences; \"tùy thuộc vào\" sounds more formal and analytical for objective causes.",
    "formation": "Kết quả / Lựa chọn + tùy theo / tùy thuộc vào + Biến số",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Tùy theo mục tiêu giao tiếp hay thi cử mà bạn chọn bộ từ vựng phù hợp.",
        "translation": "Depending on whether your goal is conversation or exams, pick the right deck."
      },
      {
        "sentence": "Tốc độ nhớ từ mới còn tùy thuộc vào tần suất bạn gặp lại chúng trong ngữ cảnh.",
        "translation": "How fast you retain new words depends on how often you meet them in context."
      }
    ]
  },
  {
    "id": "vi_b2_33",
    "language": "vi",
    "pattern": "trái ngược với (Đối lập trực diện)",
    "title": "trái ngược với — Direct Contrast ('Contrary to / In sharp contrast to')",
    "shortExplanation": "Sets up a clean, analytical contrast between two opposing realities, trends, or assumptions.",
    "longExplanation": "Stronger and clearer than \"khác với\", signaling direct opposition—common in articles, debates, and documentary narration.",
    "formation": "Trái ngược với + Kỳ vọng / Nhận định A, B + Thực tế",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Trái ngược với lo lắng ban đầu, buổi thuyết trình diễn ra rất suôn sẻ.",
        "translation": "Contrary to initial worries, the presentation went very smoothly."
      },
      {
        "sentence": "Giọng nói ngoài đời của anh ấy trầm ấm, trái ngược với vai diễn nghiêm khắc.",
        "translation": "His real-life voice is warm and deep, in contrast to his stern character."
      }
    ]
  },
  {
    "id": "vi_b2_34",
    "language": "vi",
    "pattern": "có ... đi nữa thì ... cũng (Nhượng bộ giả định cực đại)",
    "title": "có ... đi (chăng) nữa thì ... cũng — Extreme Hypothetical Concession ('Even if ... still...')",
    "shortExplanation": "Pushes a concession to the extreme (\"Even if it takes a hundred tries...\") to prove determination.",
    "longExplanation": "Inserting \"đi nữa\" or formal \"đi chăng nữa\" at the end of the concession clause amplifies the resilience of the main clause.",
    "formation": "Dù / Cho dù + có + Tình huống cực đoan + đi (chăng) nữa, thì + vẫn / cũng...",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Dù bài nói có dài đi nữa, chia nhỏ từng đoạn năm câu thì vẫn dễ chinh phục.",
        "translation": "Even if a talk is long, breaking it into five-sentence chunks keeps it conquerable."
      },
      {
        "sentence": "Cho dù có bận đến mấy đi chăng nữa, hãy giữ thói quen nghe mười phút.",
        "translation": "No matter how busy things get, still protect your ten-minute listening habit."
      }
    ]
  },
  {
    "id": "vi_c1_17",
    "language": "vi",
    "pattern": "xét về phương diện (Phân tích theo góc độ chuyên biệt)",
    "title": "xét về phương diện — Analytical Dimension ('From the standpoint / aspect of')",
    "shortExplanation": "Formal analytical opener evaluating an issue strictly from a chosen angle (economic, linguistic, cultural).",
    "longExplanation": "More formal and academic than B2 \"về mặt\". Frequent in essays, documentaries, and panel critiques.",
    "formation": "Xét về phương diện + Lĩnh vực trừu tượng, Mệnh đề nhận định",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "Xét về phương diện ngữ âm, hai phương ngữ vẫn giữ đầy đủ thanh điệu cơ bản.",
        "translation": "From a phonetic standpoint, both dialects preserve the core tonal system."
      },
      {
        "sentence": "Xét về phương diện thực tiễn, học theo cụm tự nhiên tiết kiệm thời gian hơn.",
        "translation": "In practical terms, learning natural chunks saves far more time."
      }
    ]
  },
  {
    "id": "vi_c1_18",
    "language": "vi",
    "pattern": "không ngoại trừ khả năng (Giữ lại giả thiết có thể xảy ra)",
    "title": "không ngoại trừ khả năng — Measured Hedging ('Cannot rule out the possibility that')",
    "shortExplanation": "Objective diplomatic expression acknowledging a plausible risk or alternative without overclaiming.",
    "longExplanation": "Standard in news analysis, policy reporting, and cautious forecasting where certainty is unjustified.",
    "formation": "(Các chuyên gia) không ngoại trừ khả năng + Mệnh đề giả thuyết",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "Không ngoại trừ khả năng từ vay mượn sẽ còn thay đổi cách phát âm theo thời gian.",
        "translation": "We cannot rule out that loanwords will shift pronunciation over time."
      },
      {
        "sentence": "Ban tổ chức không ngoại trừ khả năng mở thêm buổi giao lưu cuối tuần.",
        "translation": "Organizers are not ruling out adding another weekend meetup session."
      }
    ]
  },
  {
    "id": "vi_c1_19",
    "language": "vi",
    "pattern": "về bản chất (Bản chất cốt lõi đằng sau hình thức)",
    "title": "về bản chất — Essential Nature ('In essence / Fundamentally')",
    "shortExplanation": "Cuts past superficial labels to identify what a concept or mechanism truly is at its core.",
    "longExplanation": "Pairs powerfully with explanatory contrast: comparing surface appearance with underlying function.",
    "formation": "Về bản chất, + Nhận định cốt lõi",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "Về bản chất, lặp lại ngắt quãng là tối ưu hóa thời điểm ôn tập trước khi quên.",
        "translation": "In essence, spaced repetition optimizes review timing right before forgetting sets in."
      },
      {
        "sentence": "Về bản chất, hai cấu trúc đó diễn đạt cùng một ý nhưng khác mức độ trang trọng.",
        "translation": "Fundamentally, those two structures convey the same idea at different registers."
      }
    ]
  },
  {
    "id": "vi_c1_20",
    "language": "vi",
    "pattern": "một mặt ... mặt khác ... (Cân bằng hai chiều phân tích)",
    "title": "một mặt ... mặt khác ... — Balanced Dual Perspective ('On the one hand ..., on the other hand ...')",
    "shortExplanation": "Structures balanced arguments weighing two complementary or competing forces side by side.",
    "longExplanation": "Indispensable rhetorical skeleton for C1 essays, journalism, and thoughtful video commentary.",
    "formation": "Một mặt, + Khía cạnh 1; mặt khác, + Khía cạnh 2",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "Một mặt, phụ đề giúp người mới đỡ ngợp; mặt khác, ta cần tập tắt phụ đề dần.",
        "translation": "On one hand, subtitles prevent overwhelm; on the other hand, we should practice hiding them gradually."
      },
      {
        "sentence": "Một mặt cần giữ kỷ luật ôn tập, mặt khác đừng tự tạo áp lực quá mức.",
        "translation": "On one hand keep study discipline steady; on the other avoid excessive self-pressure."
      }
    ]
  },
  {
    "id": "vi_c1_21",
    "language": "vi",
    "pattern": "căn cứ vào / dựa trên (Lập luận có cơ sở chứng cứ)",
    "title": "căn cứ vào / dựa trên — Evidence-Based Grounding ('Based on / Judging by')",
    "shortExplanation": "Anchors decisions or claims explicitly to verified data, rules, or observations.",
    "longExplanation": "\"Căn cứ vào\" sounds slightly more legal/institutional (regulations, official criteria); \"dựa trên\" fits empirical data, models, and everyday evidence.",
    "formation": "Căn cứ vào / Dựa trên + Dữ liệu / Bằng chứng, + Kết luận",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "Căn cứ vào tần suất sử dụng, đây là nhóm từ ưu tiên học trước.",
        "translation": "Judging by usage frequency, this word group should be prioritized first."
      },
      {
        "sentence": "Hệ thống gợi ý từ vựng dựa trên ngữ cảnh thực tế của từng câu.",
        "translation": "The system suggests vocabulary items based on each sentence's real context."
      }
    ]
  },
  {
    "id": "vi_c1_22",
    "language": "vi",
    "pattern": "đứng trên góc độ (Đặt mình vào góc nhìn phân tích)",
    "title": "đứng trên góc độ — Perspective Framing ('From the perspective of')",
    "shortExplanation": "Shifts explicitly into a particular stakeholder's or discipline's viewpoint before offering critique.",
    "longExplanation": "Smooth diplomatic tool in debates and evaluations when acknowledging multiple valid angles (learners vs. teachers, users vs. engineers).",
    "formation": "Đứng trên góc độ + Vai trò / Lĩnh vực, + Nhận xét",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "Đứng trên góc độ người học, phụ đề gọn gàng giúp giảm mỏi mắt rõ rệt.",
        "translation": "From a learner's perspective, clean subtitles noticeably reduce eye fatigue."
      },
      {
        "sentence": "Đứng trên góc độ ngôn ngữ học, từ láy giữ vai trò tạo nhạc tính đặc trưng.",
        "translation": "From a linguistics angle, reduplication plays a key musical role."
      }
    ]
  },
  {
    "id": "vi_c1_23",
    "language": "vi",
    "pattern": "kéo theo hệ lụy (Chuỗi tác động dây chuyền tiêu cực)",
    "title": "kéo theo hệ lụy — Domino Consequences ('Trigger knock-on consequences')",
    "shortExplanation": "Warns that an action triggers serious ripple-effect problems down the line.",
    "longExplanation": "High-register journalistic collocation combining \"kéo theo\" (drag along in its wake) with Sino-Vietnamese \"hệ lụy\" (chain consequences).",
    "formation": "Hành động / Hiện tượng + kéo theo (nhiều) hệ lụy (+ cho...)",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "Học vẹt không gắn ngữ cảnh thường kéo theo hệ lụy là dễ nhầm nghĩa.",
        "translation": "Rote memorization without context often triggers the consequence of mixing up meanings."
      },
      {
        "sentence": "Thiếu ngủ kéo dài sẽ kéo theo nhiều hệ lụy cho khả năng tập trung.",
        "translation": "Prolonged lack of sleep brings cascading consequences for focus."
      }
    ]
  },
  {
    "id": "vi_c1_24",
    "language": "vi",
    "pattern": "góp phần không nhỏ (Đóng góp đáng kể bằng lối nói giảm)",
    "title": "góp phần không nhỏ — Understated Significance ('Play no small part / Contribute significantly')",
    "shortExplanation": "Uses gentle double-negative phrasing (\"not small\") to praise an important contribution smoothly.",
    "longExplanation": "Elegant formal understatement far more idiomatic in Vietnamese commentary than literally saying \"góp phần rất lớn\".",
    "formation": "Yếu tố A + góp phần không nhỏ + vào / trong + Thành công B",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "Việc nghe thụ động mỗi sáng góp phần không nhỏ vào độ nhạy âm thanh.",
        "translation": "Morning passive listening plays no small part in sharpening sound sensitivity."
      },
      {
        "sentence": "Phản hồi từ cộng đồng đã góp phần không nhỏ trong việc hoàn thiện tính năng mới.",
        "translation": "Community feedback contributed significantly to refining the new feature."
      }
    ]
  },
  {
    "id": "vi_c1_25",
    "language": "vi",
    "pattern": "tuy nhiên vẫn phải thừa nhận (Nhượng bộ công bằng)",
    "title": "tuy nhiên vẫn phải thừa nhận — Fair Concession ('However, one must still admit')",
    "shortExplanation": "Balances strong critique by fairly granting valid credit before proceeding.",
    "longExplanation": "Signals intellectual maturity in debates and reviews: criticizing cleanly while still acknowledging strengths or challenges.",
    "formation": "Luận điểm 1. Tuy nhiên, (chúng ta) vẫn phải thừa nhận rằng + Điểm hợp lý của phía đối diện",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "Tài liệu này hơi dài dòng; tuy nhiên vẫn phải thừa nhận hệ thống ví dụ rất phong phú.",
        "translation": "This material is somewhat wordy; still, one must admit its examples are super rich."
      },
      {
        "sentence": "Tốc độ nói tự nhiên khó nghe ban đầu, tuy nhiên vẫn phải thừa nhận nó giúp tai quen nhanh.",
        "translation": "Natural speech feels hard at first, yet one has to admit it trains the ear rapidly."
      }
    ]
  },
  {
    "id": "vi_c1_26",
    "language": "vi",
    "pattern": "làm dấy lên lo ngại (Gây ra làn sóng băn khoăn)",
    "title": "làm dấy lên lo ngại — Formal Concern Trigger ('Spark / Raise concerns')",
    "shortExplanation": "Journalistic/essay collocation conveying that an issue sparked widespread worry or debate.",
    "longExplanation": "Notice the evocative verb \"dấy lên\" (stir up / spark a wave), common in broadcast news and commentary on tech, society, and culture.",
    "formation": "Sự việc + làm dấy lên lo ngại (về việc / rằng) + Vấn đề",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "Việc phụ thuộc quá nhiều vào dịch máy làm dấy lên lo ngại về khả năng tự tư duy.",
        "translation": "Over-relying on machine translation raises concerns about independent thinking skills."
      },
      {
        "sentence": "Sự mai một của phương ngữ địa phương đang làm dấy lên lo ngại từ giới nghiên cứu.",
        "translation": "The fading of regional dialects is sparking concern among researchers."
      }
    ]
  },
  {
    "id": "vi_c2_01",
    "language": "vi",
    "pattern": "âu cũng là (Triết lý đón nhận nhẹ lòng)",
    "title": "âu cũng là — Philosophical Acceptance ('Perhaps that too is after all...')",
    "shortExplanation": "Reflective, literary phrase accepting an unexpected setback as fitting or meaningful in the grand scheme.",
    "longExplanation": "Brings gentle wisdom and literary poise—rather like \"maybe it's for the best / perhaps that too is part of life\".",
    "formation": "(Tình huống không như ý), âu cũng là + Ý nghĩa an ủi / tất yếu",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "Chuyến đi bị hoãn lại sát giờ, âu cũng là dịp để cả nhà nghỉ ngơi.",
        "translation": "The trip got postponed last minute—perhaps that too is a welcome chance for everyone to rest."
      },
      {
        "sentence": "Gặp khó khăn lúc khởi đầu, âu cũng là thử thách rèn tính kiên nhẫn.",
        "translation": "Facing hurdles early on is, after all, a test that builds patience."
      }
    ]
  },
  {
    "id": "vi_c2_02",
    "language": "vi",
    "pattern": "há chẳng phải ... sao (Hùng biện tu từ cổ điển)",
    "title": "há chẳng phải ... sao — Classical Rhetorical Appeal ('Is it not true that ...?')",
    "shortExplanation": "High rhetorical question appealing strongly to shared wisdom or undeniable truth.",
    "longExplanation": "Adds classical weight in essays, speeches, and persuasive commentary—translates cleanly as \"Isn't that precisely...? / Is it not true that...?\".",
    "formation": "Há chẳng phải + Điều hiển nhiên + sao?",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "Học một ngôn ngữ mới há chẳng phải mở thêm một cánh cửa nhìn thế giới sao?",
        "translation": "Is learning a new language not, after all, opening another window onto the world?"
      },
      {
        "sentence": "Kiên trì mỗi ngày một bước nhỏ há chẳng phải bí quyết bền bỉ nhất sao?",
        "translation": "Is taking one small steady step daily not the surest secret of endurance?"
      }
    ]
  },
  {
    "id": "vi_c2_03",
    "language": "vi",
    "pattern": "chẳng qua chỉ là ... mà thôi (Thu hẹp bản chất vấn đề)",
    "title": "chẳng qua chỉ là ... mà thôi — Formal Reductive Framing ('Nothing more than ... after all')",
    "shortExplanation": "Elevates B1 \"chẳng qua là\" with \"mà thôi\" to deliver a definitive, sober deflation of overhyped claims.",
    "longExplanation": "Used in analytical essays and sharp commentary when demystifying complex-sounding jargon.",
    "formation": "Vấn đề phức tạp + chẳng qua chỉ là + Thực chất giản đơn + mà thôi",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "Những thuật ngữ nghe cao siêu ấy chẳng qua chỉ là cách gọi mới cho quy tắc cũ mà thôi.",
        "translation": "Those lofty-sounding terms are, after all, nothing more than fresh labels for old rules."
      },
      {
        "sentence": "Nỗi sợ nói sai chẳng qua chỉ là rào cản tâm lý tự ta dựng lên mà thôi.",
        "translation": "Fear of speaking imperfectly is ultimately nothing more than a mental barrier we build ourselves."
      }
    ]
  },
  {
    "id": "vi_c2_04",
    "language": "vi",
    "pattern": "thiết nghĩ (Khiêm tốn trình bày chính kiến)",
    "title": "thiết nghĩ — Humility-Marked Formal Opinion ('I venture to think / In my considered view')",
    "shortExplanation": "Dignified, humble yet authoritative way to offer serious advice or personal reflection.",
    "longExplanation": "Pairs classical \"thiết\" (earnestly/respectfully) with \"nghĩ\"—ideal when addressing colleagues, elders, or public readers politely without arrogance.",
    "formation": "Thiết nghĩ, + Đề xuất / Nhận định nghiêm túc",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "Thiết nghĩ, thay vì học thuộc hàng trăm mẫu hiếm gặp, ta nên trau dồi từ vựng cốt lõi.",
        "translation": "In my considered view, rather than memorizing hundreds of rare patterns, we should refine core words."
      },
      {
        "sentence": "Thiết nghĩ nhà trường nên dành thêm thời gian thực hành giao tiếp thực tế.",
        "translation": "I earnestly think schools ought to devote more hours to real communication practice."
      }
    ]
  },
  {
    "id": "vi_c2_05",
    "language": "vi",
    "pattern": "khó lòng (mà) (Tế nhị nói điều gần như bất khả)",
    "title": "khó lòng (mà) — Tactful Impossibility ('Scarcely able to / Hard put to')",
    "shortExplanation": "Expresses gracefully and diplomatically that something can hardly happen under present constraints.",
    "longExplanation": "Refined alternative to blunt \"không thể\"—acknowledges sympathy or realism while holding firm boundaries.",
    "formation": "Chủ ngữ + khó lòng (mà) + Động từ kết quả",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "Không tiếp xúc với ngữ cảnh thật thì khó lòng mà cảm nhận hết sắc thái tinh tế.",
        "translation": "Without real-world context, one can scarcely appreciate all subtle nuances."
      },
      {
        "sentence": "Chỉ trông chờ vài tuần ôn gấp thì khó lòng đạt được phản xạ tự nhiên.",
        "translation": "Relying only on a few cram weeks makes natural reflexes hard to achieve."
      }
    ]
  },
  {
    "id": "vi_c2_06",
    "language": "vi",
    "pattern": "dẫn tới hệ quả tất yếu (Tính tất yếu logic)",
    "title": "dẫn tới hệ quả tất yếu — Logical Inevitability ('Lead to the inevitable consequence')",
    "shortExplanation": "Links structural causes to their unavoidable systemic conclusion in analytical prose.",
    "longExplanation": "Signals rigorous cause-and-effect necessity—something isn't accidental, it follows logically by nature.",
    "formation": "Chuỗi nguyên nhân + (từ đó) dẫn tới hệ quả tất yếu (là) + Kết cục",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "Việc bỏ qua luyện phát âm đầu câu dẫn tới hệ quả tất yếu là nghe nhầm liên tục.",
        "translation": "Neglecting early pronunciation training inevitably leads to recurring listening confusion."
      },
      {
        "sentence": "Cắt giảm đầu tư dài hạn sẽ dẫn tới hệ quả tất yếu là tụt hậu chất lượng.",
        "translation": "Cutting long-term investment leads as an inevitable consequence to falling quality."
      }
    ]
  },
  {
    "id": "vi_c2_07",
    "language": "vi",
    "pattern": "nếu không muốn nói là (Đẩy nhận định lên nấc cao hơn)",
    "title": "nếu không muốn nói là — Rhetorical Escalation ('If not to say / One might even say')",
    "shortExplanation": "Starts with an understated term, then sharpens it dramatically for rhetorical punch.",
    "longExplanation": "Mirrors English \"...if not downright...\". Lets speakers sound measured at first before landing a vivid stronger word.",
    "formation": "Nhận định vừa phải, nếu không muốn nói là + Nhận định mạnh hơn",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "Cách giải thích ấy khá mù mờ, nếu không muốn nói là dễ gây hiểu nhầm hoàn toàn.",
        "translation": "That explanation is rather vague, if not to say completely misleading."
      },
      {
        "sentence": "Tốc độ tiến bộ của lớp rất đáng nể, nếu không muốn nói là vượt xa mong đợi.",
        "translation": "The class's pace of progress is impressive, if not far beyond expectations."
      }
    ]
  },
  {
    "id": "vi_c2_08",
    "language": "vi",
    "pattern": "dù muốn dù không (Không tránh khỏi dù có thích hay không)",
    "title": "dù muốn dù không — Unavoidable Reality ('Whether one likes it or not')",
    "shortExplanation": "Notes bluntly yet thoughtfully that reality moves forward regardless of anyone's personal wishes.",
    "longExplanation": "More literary and symmetrical than casual \"muốn hay không cũng vậy\"—widely used in strategic essays and serious discussions.",
    "formation": "Dù muốn dù không, + Sự thật tất yếu / Thay đổi không thể né tránh",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "Dù muốn dù không, tiếng lóng trên mạng xã hội vẫn len lỏi vào lời ăn tiếng nói hằng ngày.",
        "translation": "Whether we like it or not, social media slang steadily filters into everyday speech."
      },
      {
        "sentence": "Dù muốn dù không, ta vẫn phải thích nghi với nhịp điệu nói tự nhiên ngoài đời.",
        "translation": "Like it or not, we still have to adapt to natural real-world speech speed."
      }
    ]
  },
  {
    "id": "vi_c2_09",
    "language": "vi",
    "pattern": "lấy ... làm trọng (Đặt giá trị cốt lõi lên hàng đầu)",
    "title": "lấy ... làm trọng — Core Value Priority ('Hold ... paramount / Prioritize ... above all')",
    "shortExplanation": "Dignified idiom meaning to treat something as the highest guiding principle.",
    "longExplanation": "Common in ethics, education, leadership, and proverbs (\"lấy chữ tín làm trọng\" = hold trustworthiness paramount).",
    "formation": "(Chủ thể) lấy + Giá trị cốt lõi + làm trọng",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "Khi luyện giao tiếp thực tế, hãy lấy sự tự tin và tự nhiên làm trọng.",
        "translation": "When practicing real communication, prioritize confidence and naturalness above all."
      },
      {
        "sentence": "Người làm nghề dịch thuật luôn lấy sự trung thực với nguyên tác làm trọng.",
        "translation": "Professional translators always hold fidelity to the source text paramount."
      }
    ]
  },
  {
    "id": "vi_c2_10",
    "language": "vi",
    "pattern": "một khi đã ... thì ắt ... (Điều kiện tất định trang trọng)",
    "title": "một khi đã ... thì ắt ... — Inevitable Conditional ('Once one has ..., surely/inevitably...')",
    "shortExplanation": "Formal conditional emphasizing an irreversible threshold that naturally triggers its consequence.",
    "longExplanation": "Pairs solemn \"một khi đã\" (once it has crossed that point) with literary \"ắt\" (= bound to / surely will).",
    "formation": "Một khi đã + Hành động / Quyết định, thì ắt (+ sẽ) + Kết quả tất yếu",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "Một khi đã hiểu quy luật ghép vần, bạn ắt sẽ đọc được hầu hết từ mới.",
        "translation": "Once you grasp syllable-spelling rules, you are bound to read most new words."
      },
      {
        "sentence": "Một khi đã đặt ra cam kết rõ ràng, tập thể ắt sẽ hành động đồng lòng.",
        "translation": "Once a clear commitment is established, a group will inevitably act in unison."
      }
    ]
  },
  {
    "id": "vi_c2_11",
    "language": "vi",
    "pattern": "không khỏi + Động từ cảm xúc (Không ngăn được xúc động)",
    "title": "không khỏi + Emotion Verb — Involuntary Literary Feeling ('Cannot help feeling')",
    "shortExplanation": "Refined literary equivalent of English \"cannot help feeling...\" for involuntary emotional reactions.",
    "longExplanation": "Unlike everyday \"không nhịn được\", \"không khỏi\" pairs cleanly with subtle mental or emotional states like \"chạnh lòng\", \"bồi hồi\", \"ngỡ ngàng\", \"thán phục\".",
    "formation": "Chủ ngữ + không khỏi + ngạc nhiên / xúc động / băn khoăn / mỉm cười",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "Nghe lại giọng nói của người thân trong đoạn băng cũ, ai cũng không khỏi xúc động.",
        "translation": "Hearing a loved one's voice in the old recording, everyone couldn't help feeling moved."
      },
      {
        "sentence": "Đọc những trang viết mộc mạc ấy, người đọc không khỏi mỉm cười đồng cảm.",
        "translation": "Reading those simple pages, readers cannot help smiling in warm sympathy."
      }
    ]
  },
  {
    "id": "vi_c2_12",
    "language": "vi",
    "pattern": "vô hình trung (Vô tình nhưng tạo hiệu ứng lớn)",
    "title": "vô hình trung — Unintended Side Effect ('Inadvertently / Without realizing it')",
    "shortExplanation": "Classical Sino-Vietnamese adverb explaining how an ordinary act unexpectedly brings about an unseen consequence.",
    "longExplanation": "Highlights irony or hidden influence—no one planned consequence B, yet doing A invisibly produced it anyway.",
    "formation": "Hành động A + vô hình trung + (đã) tạo ra Hệ quả B",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "Việc chỉ xem clip có dịch sẵn vô hình trung làm tai quen ỷ lại vào chữ.",
        "translation": "Watching only pre-translated clips inadvertently trains your ear to lean on text."
      },
      {
        "sentence": "Thói quen trò chuyện mỗi tối vô hình trung gắn kết mọi thành viên trong nhà.",
        "translation": "An evening chat routine inadvertently binds everyone in the household closer together."
      }
    ]
  },
  {
    "id": "vi_c2_13",
    "language": "vi",
    "pattern": "nhất thiết phải (Bắt buộc tuyệt đối không thể thiếu)",
    "title": "nhất thiết phải — Strict Necessity ('Strictly necessary / Essential to')",
    "shortExplanation": "Measures strict necessity—used most idiomatically in the negative (\"không nhất thiết phải\" = not strictly required) or formal urgency.",
    "longExplanation": "Distinguish crisp \"cần phải\" (should/need) from high-register \"nhất thiết phải\" (strictly indispensable) and polite clarifier \"không nhất thiết phải\" (needn't necessarily).",
    "formation": "Không nhất thiết phải...  |  Chủ ngữ + nhất thiết phải + Điều kiện cốt tử",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "Khi mới luyện nghe, bạn không nhất thiết phải hiểu ngay từng từ một.",
        "translation": "When starting listening practice, you don't strictly need to catch every single word."
      },
      {
        "sentence": "Để hệ thống chạy ổn định, thiết bị nhất thiết phải được cập nhật định kỳ.",
        "translation": "For stable operation, the device strictly needs to be updated regularly."
      }
    ]
  },
  {
    "id": "vi_c2_14",
    "language": "vi",
    "pattern": "tựu trung lại (Gom gọn toàn bộ luận điểm)",
    "title": "tựu trung lại — Authoritative Synthesis ('In sum / Boiled down to its essence')",
    "shortExplanation": "Refined closing linker condensing multi-part arguments into one decisive takeaway.",
    "longExplanation": "Far more elevated than everyday \"tóm lại\"—literally \"gathering into the center\", suited to keynote endings and essays.",
    "formation": "Tựu trung (lại), + Tổng kết cô đọng toàn bộ ý",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "Tựu trung lại, chìa khóa của phát triển bền vững vẫn nằm ở chất lượng giáo dục.",
        "translation": "Boiled down, the key to sustainable growth still lies in the quality of education."
      },
      {
        "sentence": "Tựu trung lại, mọi phương pháp hiệu quả đều xoay quanh việc tiếp xúc đều đặn.",
        "translation": "In sum, every effective method revolves around consistent exposure."
      }
    ]
  },
  {
    "id": "vi_c2_15",
    "language": "vi",
    "pattern": "biết bao nhiêu mà kể (Cảm thán không sao đong đếm hết)",
    "title": "biết bao nhiêu mà kể — Poetic Ineffability ('Beyond counting / Too many to tell')",
    "shortExplanation": "Lyrical exclamative phrase expressing overwhelming gratitude, joy, effort, or memories beyond words.",
    "longExplanation": "Placed cleanly at the end of a heartfelt sentence—frequent in memoirs, speeches, and warm cultural writing.",
    "formation": "Kỷ niệm / Cảm xúc / Vất vả + biết bao nhiêu mà kể",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "Những kỷ niệm đẹp thuở sinh viên ngồi ôn bài cùng nhau biết bao nhiêu mà kể.",
        "translation": "The fond student memories of reviewing lessons together are truly beyond counting."
      },
      {
        "sentence": "Tấm lòng tận tụy của thầy cô truyền cảm hứng cho bao thế hệ biết bao nhiêu mà kể.",
        "translation": "Teachers' devotion has inspired generations to an extent beyond all telling."
      }
    ]
  },
  {
    "id": "vi_c2_16",
    "language": "vi",
    "pattern": "thử hỏi (Đặt vấn đề chất vấn sắc bén)",
    "title": "thử hỏi — Socratic Challenge ('Let us ask ourselves / Suppose we ask')",
    "shortExplanation": "Sharply invites listeners to confront an uncomfortable truth or test a principle logically.",
    "longExplanation": "Notice the calm intellectual challenge: \"Thử hỏi\" pauses a debate so the listener must examine consistency themselves.",
    "formation": "Thử hỏi (+ nếu như...), + Câu chất vấn không dễ né tránh",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "Thử hỏi nếu ai cũng ngại nói vì sợ sai thì làm sao ngôn ngữ trở nên sống động?",
        "translation": "Ask yourself: if everyone stayed silent out of fear, how could a language stay alive?"
      },
      {
        "sentence": "Thử hỏi có thành tựu bền vững nào đạt được mà thiếu đi sự kiên trì lặng lẽ?",
        "translation": "Ask yourself whether any lasting achievement comes without quiet persistence."
      }
    ]
  }
];

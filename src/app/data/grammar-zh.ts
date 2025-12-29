import { GrammarPattern } from '../models/grammar.model';

// Data source: Chinese Zero to Hero (CC0 Public Domain)
// https://github.com/openlanguageprofiles/olp-zh-zerotohero

export const GRAMMAR_ZH: GrammarPattern[] = [
  {
    "id": "zh_什么_1",
    "language": "zh",
    "pattern": "什么",
    "title": "什么 (what)",
    "shortExplanation": "what",
    "longExplanation": "what. Pinyin: shénme",
    "formation": "shénme",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "这是什么?",
        "romanization": "zhè shì shénme?",
        "translation": "What is this?"
      }
    ]
  },
  {
    "id": "zh_什么N_2",
    "language": "zh",
    "pattern": "什么 N",
    "title": "什么 N (what kind of N)",
    "shortExplanation": "what kind of N",
    "longExplanation": "what kind of N. Pinyin: shénme N",
    "formation": "shénme N",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "那是什么书?",
        "romanization": "nàshi shénme shū?",
        "translation": "What book is that?"
      }
    ]
  },
  {
    "id": "zh_不是_3",
    "language": "zh",
    "pattern": "不是",
    "title": "不是 (not to be)",
    "shortExplanation": "not to be",
    "longExplanation": "not to be. Pinyin: bùshì",
    "formation": "bùshì",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "我不是美国人。",
        "romanization": "wǒ bùshì Měiguórén。",
        "translation": "I am not an American."
      }
    ]
  },
  {
    "id": "zh_是_4",
    "language": "zh",
    "pattern": "是",
    "title": "是 (to be)",
    "shortExplanation": "to be",
    "longExplanation": "to be. Pinyin: shì",
    "formation": "shì",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "她是老师。",
        "romanization": "tā shì lǎoshī。",
        "translation": "She is a teacher."
      }
    ]
  },
  {
    "id": "zh_吗_5",
    "language": "zh",
    "pattern": "吗?",
    "title": "吗? (right?)",
    "shortExplanation": "right?",
    "longExplanation": "right?. Pinyin: ma?",
    "formation": "ma?",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "你是老师吗?",
        "romanization": "nǐ shì lǎoshī ma?",
        "translation": "You’re a teacher, right?"
      }
    ]
  },
  {
    "id": "zh_谁_6",
    "language": "zh",
    "pattern": "谁",
    "title": "谁 (who)",
    "shortExplanation": "who",
    "longExplanation": "who. Pinyin: shéi",
    "formation": "shéi",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "她是谁?",
        "romanization": "tā shì shéi?",
        "translation": "Who is she?"
      }
    ]
  },
  {
    "id": "zh_哪MN_7",
    "language": "zh",
    "pattern": "哪 M N",
    "title": "哪 M N (which N)",
    "shortExplanation": "which N",
    "longExplanation": "which N. Pinyin: nǎ M N",
    "formation": "nǎ M N",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "哪个人?",
        "romanization": "nǎ gèrén?",
        "translation": "Which person?"
      }
    ]
  },
  {
    "id": "zh_的_8",
    "language": "zh",
    "pattern": "(的)",
    "title": "(的) (’s)",
    "shortExplanation": "’s",
    "longExplanation": "’s. Pinyin: ( de)",
    "formation": "( de)",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "她是我 (的) 老师。",
        "romanization": "tā shì wǒ ( de) lǎoshī。",
        "translation": "She is my teacher."
      }
    ]
  },
  {
    "id": "zh_N呢_9",
    "language": "zh",
    "pattern": "N 呢?",
    "title": "N 呢? (what about N?)",
    "shortExplanation": "what about N?",
    "longExplanation": "what about N?. Pinyin: N ne?",
    "formation": "N ne?",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "我是中国人，你呢?",
        "romanization": "wǒ shì Zhōngguórén， nǐ ne?",
        "translation": "I am Chinese, what about you?"
      }
    ]
  },
  {
    "id": "zh_几MN_10",
    "language": "zh",
    "pattern": "几 M N",
    "title": "几 M N (how many N)",
    "shortExplanation": "how many N",
    "longExplanation": "how many N. Pinyin: jǐ M N",
    "formation": "jǐ M N",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "你有几个汉语老师?",
        "romanization": "nǐ yǒu jǐge Hànyǔ lǎoshī?",
        "translation": "How many teachers do you have?"
      }
    ]
  },
  {
    "id": "zh_一九十九_11",
    "language": "zh",
    "pattern": "一～九十九",
    "title": "一～九十九 (1 ~ 99)",
    "shortExplanation": "1 ~ 99",
    "longExplanation": "1 ~ 99. Pinyin: yī～ jiǔ shíjiǔ",
    "formation": "yī～ jiǔ shíjiǔ",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "九十一",
        "romanization": "jiǔ shí·yī",
        "translation": "1 - 99"
      }
    ]
  },
  {
    "id": "zh_AGE了_12",
    "language": "zh",
    "pattern": "AGE 了",
    "title": "AGE 了 (became AGE)",
    "shortExplanation": "became AGE",
    "longExplanation": "became AGE. Pinyin: AGE le",
    "formation": "AGE le",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "我40岁了。",
        "romanization": "wǒ40 suì le。",
        "translation": "I’m 40 years old."
      }
    ]
  },
  {
    "id": "zh_多大_13",
    "language": "zh",
    "pattern": "多大",
    "title": "多大 (how old)",
    "shortExplanation": "how old",
    "longExplanation": "how old. Pinyin: duōdà",
    "formation": "duōdà",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "你女儿多大了？",
        "romanization": "nǐ nǚ'ér duōdà le？",
        "translation": "How old is your daughter?"
      }
    ]
  },
  {
    "id": "zh_会V_14",
    "language": "zh",
    "pattern": "会 V",
    "title": "会 V (know how to V)",
    "shortExplanation": "know how to V",
    "longExplanation": "know how to V. Pinyin: huì V",
    "formation": "huì V",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "我会写。",
        "romanization": "wǒ huì xiě。",
        "translation": "I know how to write."
      }
    ]
  },
  {
    "id": "zh_很_15",
    "language": "zh",
    "pattern": "很",
    "title": "很 (very)",
    "shortExplanation": "very",
    "longExplanation": "very. Pinyin: hěn",
    "formation": "hěn",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "我很好",
        "romanization": "wǒ hěn hǎo",
        "translation": "I am good."
      }
    ]
  },
  {
    "id": "zh_怎么V_16",
    "language": "zh",
    "pattern": "怎么 V",
    "title": "怎么 V (how to V)",
    "shortExplanation": "how to V",
    "longExplanation": "how to V. Pinyin: zěnme V",
    "formation": "zěnme V",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "这个怎么读?",
        "romanization": "zhège zěnme dú?",
        "translation": "How do you read this?"
      }
    ]
  },
  {
    "id": "zh_月号日星期_17",
    "language": "zh",
    "pattern": "月、号/日、星期",
    "title": "月、号/日、星期 ((telling dates))",
    "shortExplanation": "(telling dates)",
    "longExplanation": "(telling dates). Pinyin: yuè、 hào/ rì、 xīngqī",
    "formation": "yuè、 hào/ rì、 xīngqī",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "九月二号/日星期四",
        "romanization": "Jiǔyuè èrhào/ rì Xīngqīsì",
        "translation": "Thursday September 2"
      }
    ]
  },
  {
    "id": "zh_去PLACEV_19",
    "language": "zh",
    "pattern": "去 PLACE V",
    "title": "去 PLACE V (go to PLACE to do V)",
    "shortExplanation": "go to PLACE to do V",
    "longExplanation": "go to PLACE to do V. Pinyin: qù PLACE V",
    "formation": "qù PLACE V",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "我去学校学习。",
        "romanization": "wǒ qù xuéxiào xuéxí。",
        "translation": "I go to school to study."
      }
    ]
  },
  {
    "id": "zh_想_20",
    "language": "zh",
    "pattern": "想",
    "title": "想 (to want)",
    "shortExplanation": "to want",
    "longExplanation": "to want. Pinyin: xiǎng",
    "formation": "xiǎng",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "我想看书",
        "romanization": "wǒ xiǎng kànshū",
        "translation": "I want to read books."
      }
    ]
  },
  {
    "id": "zh_多少N_21",
    "language": "zh",
    "pattern": "多少 N",
    "title": "多少 N (how much N)",
    "shortExplanation": "how much N",
    "longExplanation": "how much N. Pinyin: duōshao N",
    "formation": "duōshao N",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "你有多少汉语老师?",
        "romanization": "nǐ yǒu duōshao Hànyǔ lǎoshī?",
        "translation": "How many Chinese teachers do you have?"
      }
    ]
  },
  {
    "id": "zh_个_22",
    "language": "zh",
    "pattern": "个",
    "title": "个 ((measure word))",
    "shortExplanation": "(measure word)",
    "longExplanation": "(measure word). Pinyin: gè",
    "formation": "gè",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "五个学生",
        "romanization": "wǔ gè xuésheng",
        "translation": "5 students"
      }
    ]
  },
  {
    "id": "zh_口_23",
    "language": "zh",
    "pattern": "口",
    "title": "口 ((measure word))",
    "shortExplanation": "(measure word)",
    "longExplanation": "(measure word). Pinyin: kǒu",
    "formation": "kǒu",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "我家有五口人。",
        "romanization": "wǒ jiā yǒu wǔ kǒu rén。",
        "translation": "There are 5 people in our family."
      }
    ]
  },
  {
    "id": "zh_元块_24",
    "language": "zh",
    "pattern": "元／块",
    "title": "元／块 ((currency))",
    "shortExplanation": "(currency)",
    "longExplanation": "(currency). Pinyin: yuán／ kuài",
    "formation": "yuán／ kuài",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "一元／块",
        "romanization": "yīyuán／ kuài",
        "translation": "one yuan"
      }
    ]
  },
  {
    "id": "zh_在_25",
    "language": "zh",
    "pattern": "在",
    "title": "在 (at)",
    "shortExplanation": "at",
    "longExplanation": "at. Pinyin: zài",
    "formation": "zài",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "他在椅子下面",
        "romanization": "tā zài yǐzi xiàmian",
        "translation": "He’s under the chair."
      }
    ]
  },
  {
    "id": "zh_哪儿_26",
    "language": "zh",
    "pattern": "哪儿？",
    "title": "哪儿？ (where)",
    "shortExplanation": "where",
    "longExplanation": "where. Pinyin: nǎr？",
    "formation": "nǎr？",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "我的杯子在哪儿?",
        "romanization": "wǒ de bēizi zàinǎr?",
        "translation": "Where is my cup?"
      }
    ]
  },
  {
    "id": "zh_在PLACEV_27",
    "language": "zh",
    "pattern": "在 PLACE V",
    "title": "在 PLACE V (V at PLACE)",
    "shortExplanation": "V at PLACE",
    "longExplanation": "V at PLACE. Pinyin: zài PLACE V",
    "formation": "zài PLACE V",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "我在朋友家喝茶。",
        "romanization": "wǒ zài péngyou jiā hē chá。",
        "translation": "I am having tea at my friend’s home."
      }
    ]
  },
  {
    "id": "zh_Q呢_28",
    "language": "zh",
    "pattern": "Q 呢",
    "title": "Q 呢 (I wonder)",
    "shortExplanation": "I wonder",
    "longExplanation": "I wonder. Pinyin: Q ne",
    "formation": "Q ne",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "他在哪儿呢?",
        "romanization": "tā zàinǎr ne?",
        "translation": "Where is he, I wonder?"
      }
    ]
  },
  {
    "id": "zh_N呢_29",
    "language": "zh",
    "pattern": "N 呢？",
    "title": "N 呢？ (where is N)",
    "shortExplanation": "where is N",
    "longExplanation": "where is N. Pinyin: N ne？",
    "formation": "N ne？",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "我的杯子呢?",
        "romanization": "wǒ de bēizi ne?",
        "translation": "Where is my cup?"
      }
    ]
  },
  {
    "id": "zh_PLACE有N_30",
    "language": "zh",
    "pattern": "PLACE 有 N",
    "title": "PLACE 有 N (there is N at PLACE)",
    "shortExplanation": "there is N at PLACE",
    "longExplanation": "there is N at PLACE. Pinyin: PLACE yǒu N",
    "formation": "PLACE yǒu N",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "椅子下面有一只小狗",
        "romanization": "yǐzi xiàmian yǒu yī zhǐ xiǎogǒu",
        "translation": "There is a dog under the chair."
      }
    ]
  },
  {
    "id": "zh_PLACE没有N_31",
    "language": "zh",
    "pattern": "PLACE 没有 N",
    "title": "PLACE 没有 N (there isn’t N at PLACE)",
    "shortExplanation": "there isn’t N at PLACE",
    "longExplanation": "there isn’t N at PLACE. Pinyin: PLACE méiyǒu N",
    "formation": "PLACE méiyǒu N",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "这儿没有人。",
        "romanization": "zhèr méiyǒu rén。",
        "translation": "There isn’t anyone here."
      }
    ]
  },
  {
    "id": "zh_和_32",
    "language": "zh",
    "pattern": "和",
    "title": "和 (and)",
    "shortExplanation": "and",
    "longExplanation": "and. Pinyin: hé",
    "formation": "hé",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "爸爸、妈妈和我",
        "romanization": "bàba、 māma hé wǒ",
        "translation": "dad, mom and I"
      }
    ]
  },
  {
    "id": "zh_能_33",
    "language": "zh",
    "pattern": "能",
    "title": "能 (can)",
    "shortExplanation": "can",
    "longExplanation": "can. Pinyin: néng",
    "formation": "néng",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "我能坐这儿吗?。",
        "romanization": "wǒ néng zuò zhèr ma?。",
        "translation": "Can I sit here?"
      }
    ]
  },
  {
    "id": "zh_请V_34",
    "language": "zh",
    "pattern": "请 V",
    "title": "请 V (please V)",
    "shortExplanation": "please V",
    "longExplanation": "please V. Pinyin: qǐng V",
    "formation": "qǐng V",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "请坐。",
        "romanization": "qǐng zuò。",
        "translation": "Please sit."
      }
    ]
  },
  {
    "id": "zh_点分_35",
    "language": "zh",
    "pattern": "# 点 # 分",
    "title": "# 点 # 分 (# hour # minute)",
    "shortExplanation": "# hour # minute",
    "longExplanation": "# hour # minute. Pinyin: # diǎn # fēn",
    "formation": "# diǎn # fēn",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "十一点十分",
        "romanization": "shí yīdiǎn shífēn",
        "translation": "11:10"
      }
    ]
  },
  {
    "id": "zh_上午下午_36",
    "language": "zh",
    "pattern": "上午／下午",
    "title": "上午／下午 (AM/PM)",
    "shortExplanation": "AM/PM",
    "longExplanation": "AM/PM. Pinyin: shàngwǔ／ xiàwǔ",
    "formation": "shàngwǔ／ xiàwǔ",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "下午三点十分",
        "romanization": "xiàwǔ sān diǎn shífēn",
        "translation": "3:10 PM"
      }
    ]
  },
  {
    "id": "zh_STIMEV_37",
    "language": "zh",
    "pattern": "S TIME V",
    "title": "S TIME V ((time phrase))",
    "shortExplanation": "(time phrase)",
    "longExplanation": "(time phrase). Pinyin: S TIME V",
    "formation": "S TIME V",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "妈妈六点做饭。",
        "romanization": "māma liù diǎn zuòfàn。",
        "translation": "Mom cooks at six."
      }
    ]
  },
  {
    "id": "zh_TIMESV_38",
    "language": "zh",
    "pattern": "TIME S V",
    "title": "TIME S V ((time phrase))",
    "shortExplanation": "(time phrase)",
    "longExplanation": "(time phrase). Pinyin: TIME S V",
    "formation": "TIME S V",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "七点我吃饭。",
        "romanization": "qī diǎn wǒ chīfàn。",
        "translation": "I eat at seven."
      }
    ]
  },
  {
    "id": "zh_TIME前_39",
    "language": "zh",
    "pattern": "TIME 前",
    "title": "TIME 前 (before TIME)",
    "shortExplanation": "before TIME",
    "longExplanation": "before TIME. Pinyin: TIME qián",
    "formation": "TIME qián",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "星期五前",
        "romanization": "Xīngqīwǔ qián",
        "translation": "before Friday"
      }
    ]
  },
  {
    "id": "zh_DURATION前_40",
    "language": "zh",
    "pattern": "DURATION 前",
    "title": "DURATION 前 (DURATION ago)",
    "shortExplanation": "DURATION ago",
    "longExplanation": "DURATION ago. Pinyin: DURATION qián",
    "formation": "DURATION qián",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "一个星期前",
        "romanization": "yī gè xīngqī qián",
        "translation": "a week ago"
      }
    ]
  },
  {
    "id": "zh_N怎么样_41",
    "language": "zh",
    "pattern": "N 怎么样？",
    "title": "N 怎么样？ (how is N?)",
    "shortExplanation": "how is N?",
    "longExplanation": "how is N?. Pinyin: N zěnmeyàng？",
    "formation": "N zěnmeyàng？",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "你的汉语怎么样？",
        "romanization": "nǐ de Hànyǔ zěnmeyàng？",
        "translation": "How is your Chinese?"
      }
    ]
  },
  {
    "id": "zh_的_42",
    "language": "zh",
    "pattern": "(的)",
    "title": "(的) ((omission of 的))",
    "shortExplanation": "(omission of 的)",
    "longExplanation": "(omission of 的). Pinyin: ( de)",
    "formation": "( de)",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "我身体不太好。",
        "romanization": "wǒ shēntǐ bùtàihǎo。",
        "translation": "My health isn’t very good."
      }
    ]
  },
  {
    "id": "zh_太A了_43",
    "language": "zh",
    "pattern": "太 A (了)",
    "title": "太 A (了) (too A)",
    "shortExplanation": "too A",
    "longExplanation": "too A. Pinyin: tài A ( le)",
    "formation": "tài A ( le)",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "天气太冷 (了)。",
        "romanization": "tiānqì tài lěng ( le)。",
        "translation": "The weather’s too cold."
      }
    ]
  },
  {
    "id": "zh_不太A_44",
    "language": "zh",
    "pattern": "(不) 太 A",
    "title": "(不) 太 A (not too A)",
    "shortExplanation": "not too A",
    "longExplanation": "not too A. Pinyin: ( bù) tài A",
    "formation": "( bù) tài A",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "我身体不太好。",
        "romanization": "wǒ shēntǐ bùtàihǎo。",
        "translation": "My health is not too good."
      }
    ]
  },
  {
    "id": "zh_会V_45",
    "language": "zh",
    "pattern": "会 V",
    "title": "会 V (will V)",
    "shortExplanation": "will V",
    "longExplanation": "will V. Pinyin: huì V",
    "formation": "huì V",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "你会回家吗？",
        "romanization": "nǐ huì huíjiā ma？",
        "translation": "Will you come home?"
      }
    ]
  },
  {
    "id": "zh_喂_46",
    "language": "zh",
    "pattern": "喂",
    "title": "喂 (hello)",
    "shortExplanation": "hello",
    "longExplanation": "hello. Pinyin: wèi",
    "formation": "wèi",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "喂，李老师在家吗？",
        "romanization": "wèi， lǐ lǎoshī zài jiā ma？",
        "translation": "Hello, is Teacher Li home?"
      }
    ]
  },
  {
    "id": "zh_在V呢_47",
    "language": "zh",
    "pattern": "在 V (呢)",
    "title": "在 V (呢) (V-ing)",
    "shortExplanation": "V-ing",
    "longExplanation": "V-ing. Pinyin: zài V ( ne)",
    "formation": "zài V ( ne)",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "我在睡觉 (呢)。",
        "romanization": "wǒ zài shuìjiào ( ne)。",
        "translation": "I’m sleeping."
      }
    ]
  },
  {
    "id": "zh_没在V呢_48",
    "language": "zh",
    "pattern": "没 在 V (呢)",
    "title": "没 在 V (呢) (not V-ing)",
    "shortExplanation": "not V-ing",
    "longExplanation": "not V-ing. Pinyin: méi zài V ( ne)",
    "formation": "méi zài V ( ne)",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "他们没在看电视 (呢)。",
        "romanization": "tāmen méi zài kàn diànshì ( ne)。",
        "translation": "They’re not watching TV."
      }
    ]
  },
  {
    "id": "zh_1yo_49",
    "language": "zh",
    "pattern": "1 (yāo)",
    "title": "1 (yāo) ((1 in telephony))",
    "shortExplanation": "(1 in telephony)",
    "longExplanation": "(1 in telephony). Pinyin: 1 (yāo)",
    "formation": "1 (yāo)",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "138-0156-7749",
        "romanization": "138-0156-7749",
        "translation": "1 reads as yāo."
      }
    ]
  },
  {
    "id": "zh_V吧_50",
    "language": "zh",
    "pattern": "V 吧。",
    "title": "V 吧。 (feel free to V)",
    "shortExplanation": "feel free to V",
    "longExplanation": "feel free to V. Pinyin: V ba。",
    "formation": "V ba。",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "这儿没有人，坐吧。",
        "romanization": "zhèr méiyǒu rén， zuò ba。",
        "translation": "Nobody’s here, (feel free to) sit."
      }
    ]
  },
  {
    "id": "zh_VO了_51",
    "language": "zh",
    "pattern": "V O 了",
    "title": "V O 了 (have V’ed O)",
    "shortExplanation": "have V’ed O",
    "longExplanation": "have V’ed O. Pinyin: V O le",
    "formation": "V O le",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "他去学校了。",
        "romanization": "tā qù xuéxiào le。",
        "translation": "He went to learn how to drive."
      }
    ]
  },
  {
    "id": "zh_V了O_52",
    "language": "zh",
    "pattern": "V 了 O",
    "title": "V 了 O (have V’ed O)",
    "shortExplanation": "have V’ed O",
    "longExplanation": "have V’ed O. Pinyin: V le O",
    "formation": "V le O",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "我买了不少衣服。",
        "romanization": "wǒ mǎi le bùshǎo yīfu。",
        "translation": "I bought a lot of clothes."
      }
    ]
  },
  {
    "id": "zh_没VO_53",
    "language": "zh",
    "pattern": "没 V O",
    "title": "没 V O (have not V’ed O)",
    "shortExplanation": "have not V’ed O",
    "longExplanation": "have not V’ed O. Pinyin: méi V O",
    "formation": "méi V O",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "她没去商店。",
        "romanization": "tā méi qù shāngdiàn。",
        "translation": "She didn’t go to the store."
      }
    ]
  },
  {
    "id": "zh_TIME后_54",
    "language": "zh",
    "pattern": "TIME 后",
    "title": "TIME 后 (after TIME)",
    "shortExplanation": "after TIME",
    "longExplanation": "after TIME. Pinyin: TIME hòu",
    "formation": "TIME hòu",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "五点后",
        "romanization": "wǔ diǎn hòu",
        "translation": "after 5"
      }
    ]
  },
  {
    "id": "zh_DURATION后_55",
    "language": "zh",
    "pattern": "DURATION 后",
    "title": "DURATION 后 (after DURATION)",
    "shortExplanation": "after DURATION",
    "longExplanation": "after DURATION. Pinyin: DURATION hòu",
    "formation": "DURATION hòu",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "四十分钟后",
        "romanization": "sìshí fēnzhōng hòu",
        "translation": "after 40 minutes"
      }
    ]
  },
  {
    "id": "zh_啊_56",
    "language": "zh",
    "pattern": "……啊",
    "title": "……啊 ((exclamation))",
    "shortExplanation": "(exclamation)",
    "longExplanation": "(exclamation). Pinyin: …… ā",
    "formation": "…… ā",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "好啊。是啊。",
        "romanization": "hǎo ā。 shì ā。",
        "translation": "Sure! Yeah!"
      }
    ]
  },
  {
    "id": "zh_都N_57",
    "language": "zh",
    "pattern": "都 N",
    "title": "都 N (both Ns)",
    "shortExplanation": "both Ns",
    "longExplanation": "both Ns. Pinyin: dōu N",
    "formation": "dōu N",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "我们都是中国人。",
        "romanization": "wǒmen dōu shì Zhōngguórén。",
        "translation": "We both are Chinese."
      }
    ]
  },
  {
    "id": "zh_S是MANNERV的_58",
    "language": "zh",
    "pattern": "S 是 MANNER V 的",
    "title": "S 是 MANNER V 的 (it is MANNER that S V)",
    "shortExplanation": "it is MANNER that S V",
    "longExplanation": "it is MANNER that S V. Pinyin: S shì MANNER V de",
    "formation": "S shì MANNER V de",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "我们是开车来的。",
        "romanization": "wǒmen shì kāichē lái de。",
        "translation": "We drove here. (Lit. It is [by] driving that we came here.)"
      }
    ]
  },
  {
    "id": "zh_年_59",
    "language": "zh",
    "pattern": "年",
    "title": "年 (year)",
    "shortExplanation": "year",
    "longExplanation": "year. Pinyin: nián",
    "formation": "nián",
    "level": "HSK 1",
    "examples": [
      {
        "sentence": "二零一七年",
        "romanization": "èr líng yī qī nián",
        "translation": "Year 2017"
      }
    ]
  },
  {
    "id": "zh_要_60",
    "language": "zh",
    "pattern": "要",
    "title": "要 (want to, will)",
    "shortExplanation": "want to, will",
    "longExplanation": "want to, will. Pinyin: yào",
    "formation": "yào",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "王芳要学英语。",
        "romanization": "wáng fāng yào xué Yīngyǔ。",
        "translation": "Wang Fang wants to / will learn English."
      }
    ]
  },
  {
    "id": "zh_最_61",
    "language": "zh",
    "pattern": "最",
    "title": "最 (the most)",
    "shortExplanation": "the most",
    "longExplanation": "the most. Pinyin: zuì",
    "formation": "zuì",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "它的眼睛最漂亮。",
        "romanization": "tā de yǎnjing zuì piàoliang。",
        "translation": "Its eyes are the prettiest."
      }
    ]
  },
  {
    "id": "zh_几_62",
    "language": "zh",
    "pattern": "几",
    "title": "几 (several)",
    "shortExplanation": "several",
    "longExplanation": "several. Pinyin: jǐ",
    "formation": "jǐ",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "几本书",
        "romanization": "jǐ běn shū",
        "translation": "several books"
      }
    ]
  },
  {
    "id": "zh_十几_63",
    "language": "zh",
    "pattern": "十几",
    "title": "十几 ((any # from 11 to 19))",
    "shortExplanation": "(any # from 11 to 19)",
    "longExplanation": "(any # from 11 to 19). Pinyin: shíjǐ",
    "formation": "shíjǐ",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "十几本书",
        "romanization": "shíjǐ běn shū",
        "translation": "a dozen or more books"
      }
    ]
  },
  {
    "id": "zh_几十_64",
    "language": "zh",
    "pattern": "几十",
    "title": "几十 (tens of)",
    "shortExplanation": "tens of",
    "longExplanation": "tens of. Pinyin: jǐ shí",
    "formation": "jǐ shí",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "几十本书",
        "romanization": "jǐ shí běn shū",
        "translation": "tens of people"
      }
    ]
  },
  {
    "id": "zh_几多_65",
    "language": "zh",
    "pattern": "# 几/多",
    "title": "# 几/多 (over #)",
    "shortExplanation": "over #",
    "longExplanation": "over #. Pinyin: # jǐ/ duō",
    "formation": "# jǐ/ duō",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "二十几本书/二十多本书",
        "romanization": "èrshí jǐ běn shū/ èrshíduō běn shū",
        "translation": "twenty something books"
      }
    ]
  },
  {
    "id": "zh_M多月星期_66",
    "language": "zh",
    "pattern": "# M 多 月/星期",
    "title": "# M 多 月/星期 (over # of months/weeks)",
    "shortExplanation": "over # of months/weeks",
    "longExplanation": "over # of months/weeks. Pinyin: # M duō yuè/ xīngqī",
    "formation": "# M duō yuè/ xīngqī",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "两个多月，三个多星期",
        "romanization": "liǎng gè duō yuè， sān gè duō xīngqī",
        "translation": "over two months, over three weeks"
      }
    ]
  },
  {
    "id": "zh_V不VorA不A_67",
    "language": "zh",
    "pattern": "V不V or A不A",
    "title": "V不V or A不A ((questions))",
    "shortExplanation": "(questions)",
    "longExplanation": "(questions). Pinyin: V bùV or A bùA",
    "formation": "V bùV or A bùA",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "我去商店，你去不去？",
        "romanization": "wǒ qù shāngdiàn， nǐ qù bù qù？",
        "translation": "I’m going to the shop, are you going?"
      }
    ]
  },
  {
    "id": "zh_是不是_68",
    "language": "zh",
    "pattern": "是不是……？",
    "title": "是不是……？ (Is it true that…?)",
    "shortExplanation": "Is it true that…?",
    "longExplanation": "Is it true that…?. Pinyin: shìbùshì……？",
    "formation": "shìbùshì……？",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "你是不是喜欢运动？",
        "romanization": "nǐ shìbùshì xǐhuan yùndòng？",
        "translation": "Is it true that you like to exercise?"
      }
    ]
  },
  {
    "id": "zh_每MN都V_69",
    "language": "zh",
    "pattern": "每 M N (都) V",
    "title": "每 M N (都) V (every N V)",
    "shortExplanation": "every N V",
    "longExplanation": "every N V. Pinyin: měi M N ( dōu) V",
    "formation": "měi M N ( dōu) V",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "你每个星期六(都)工作吗？",
        "romanization": "nǐ měi gè Xīngqīliù( dōu) gōngzuò ma？",
        "translation": "Do you work every Saturday (without exception)?"
      }
    ]
  },
  {
    "id": "zh_多A_70",
    "language": "zh",
    "pattern": "多 A",
    "title": "多 A (how A)",
    "shortExplanation": "how A",
    "longExplanation": "how A. Pinyin: duō A",
    "formation": "duō A",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "他多高？",
        "romanization": "tā duō gāo？",
        "translation": "How tall is he?"
      }
    ]
  },
  {
    "id": "zh_的N_71",
    "language": "zh",
    "pattern": "的 (N)",
    "title": "的 (N) ((omitting nouns after 的))",
    "shortExplanation": "(omitting nouns after 的)",
    "longExplanation": "(omitting nouns after 的). Pinyin: de (N)",
    "formation": "de (N)",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "这个杯子是昨天买的(杯子)。",
        "romanization": "zhège bēizi shì zuótiān mǎi de( bēizi)。",
        "translation": "This cup is the one (cup) that was bought yesterday."
      }
    ]
  },
  {
    "id": "zh_一下_72",
    "language": "zh",
    "pattern": "一下",
    "title": "一下 (once (quickly/easily))",
    "shortExplanation": "once (quickly/easily)",
    "longExplanation": "once (quickly/easily). Pinyin: yīxià",
    "formation": "yīxià",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "你去给老师送一下报纸。",
        "romanization": "nǐ qù gěi lǎoshī sòng yīxià bàozhǐ。",
        "translation": "Go and deliver the newspaper to your teacher."
      }
    ]
  },
  {
    "id": "zh_真_73",
    "language": "zh",
    "pattern": "真",
    "title": "真 (very, truly)",
    "shortExplanation": "very, truly",
    "longExplanation": "very, truly. Pinyin: zhēn",
    "formation": "zhēn",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "牛奶真好喝啊！",
        "romanization": "niúnǎi zhēn hǎohē ā！",
        "translation": "The milk is so tasty!"
      }
    ]
  },
  {
    "id": "zh_O是SV的_74",
    "language": "zh",
    "pattern": "O 是 S V 的",
    "title": "O 是 S V 的 (it’s S who V’ed O)",
    "shortExplanation": "it’s S who V’ed O",
    "longExplanation": "it’s S who V’ed O. Pinyin: O shì S V de",
    "formation": "O shì S V de",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "这本书是我买的。",
        "romanization": "zhè běn shū shì wǒ mǎi de。",
        "translation": "(It’s) I (who) bought the book."
      }
    ]
  },
  {
    "id": "zh_的时候_75",
    "language": "zh",
    "pattern": "……的时候",
    "title": "……的时候 (the time when …)",
    "shortExplanation": "the time when …",
    "longExplanation": "the time when …. Pinyin: …… de shíhou",
    "formation": "…… de shíhou",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "我18岁的时候来过北京。",
        "romanization": "wǒ18 suì de shíhou lái guò Běijīng。",
        "translation": "I’ve come to Beijing when I was 18."
      }
    ]
  },
  {
    "id": "zh_已经VA了_76",
    "language": "zh",
    "pattern": "已经 V/A 了",
    "title": "已经 V/A 了 (already V/A)",
    "shortExplanation": "already V/A",
    "longExplanation": "already V/A. Pinyin: yǐjīng V/A le",
    "formation": "yǐjīng V/A le",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "我已经工作两年多了。",
        "romanization": "wǒ yǐjīng gōngzuò liǎng nián duō le。",
        "translation": "I already worked for over two years."
      }
    ]
  },
  {
    "id": "zh_就_77",
    "language": "zh",
    "pattern": "就",
    "title": "就 (just V then)",
    "shortExplanation": "just V then",
    "longExplanation": "just V then. Pinyin: jiù",
    "formation": "jiù",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "你不想去，就在家休息吧。",
        "romanization": "nǐ bùxiǎng qù， jiù zài jiā xiūxi ba。",
        "translation": "If you don't want to go, just rest at home then."
      }
    ]
  },
  {
    "id": "zh_还A_78",
    "language": "zh",
    "pattern": "还 A",
    "title": "还 A (somewhat A)",
    "shortExplanation": "somewhat A",
    "longExplanation": "somewhat A. Pinyin: hái A",
    "formation": "hái A",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "昨天的考试还好。",
        "romanization": "zuótiān de kǎoshì háihǎo。",
        "translation": "Yesterday’s test was so-so (lit. somewhat OK)."
      }
    ]
  },
  {
    "id": "zh_有点儿A_79",
    "language": "zh",
    "pattern": "有点儿 A",
    "title": "有点儿 A (a bit A)",
    "shortExplanation": "a bit A",
    "longExplanation": "a bit A. Pinyin: yǒudiǎnr A",
    "formation": "yǒudiǎnr A",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "今天天气有点儿冷。",
        "romanization": "jīntiān tiānqì yǒudiǎnr lěng。",
        "translation": "It's a bit cold today."
      }
    ]
  },
  {
    "id": "zh_怎么_80",
    "language": "zh",
    "pattern": "怎么",
    "title": "怎么 (how come)",
    "shortExplanation": "how come",
    "longExplanation": "how come. Pinyin: zěnme",
    "formation": "zěnme",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "你怎么不高兴?",
        "romanization": "nǐ zěnme bù gāoxìng?",
        "translation": "How come you’re unhappy?"
      }
    ]
  },
  {
    "id": "zh_NMM都_81",
    "language": "zh",
    "pattern": "N M M 都",
    "title": "N M M 都 (every N)",
    "shortExplanation": "every N",
    "longExplanation": "every N. Pinyin: N M M dōu",
    "formation": "N M M dōu",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "同学个个都很高兴。",
        "romanization": "tóngxué gègè dōu hěn gāoxìng。",
        "translation": "Every student is very happy."
      }
    ]
  },
  {
    "id": "zh_因为所以_82",
    "language": "zh",
    "pattern": "因为……所以……",
    "title": "因为……所以…… (because… so…)",
    "shortExplanation": "because… so…",
    "longExplanation": "because… so…. Pinyin: yīnwèi…… suǒyǐ……",
    "formation": "yīnwèi…… suǒyǐ……",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "因为不好吃，所以我不吃。",
        "romanization": "yīnwèi bùhǎo chī， suǒyǐ wǒ bù chī。",
        "translation": "Because it’s not tasty, so I won’t eat it."
      }
    ]
  },
  {
    "id": "zh_还V_83",
    "language": "zh",
    "pattern": "还 V",
    "title": "还 V (still V-ing)",
    "shortExplanation": "still V-ing",
    "longExplanation": "still V-ing. Pinyin: hái V",
    "formation": "hái V",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "八点了，他还在睡觉。",
        "romanization": "bā diǎn le， tā hái zài shuìjiào。",
        "translation": "It’s 8, he’s still sleeping."
      }
    ]
  },
  {
    "id": "zh_还没V_84",
    "language": "zh",
    "pattern": "还没 V",
    "title": "还没 V (still haven’t V’ed)",
    "shortExplanation": "still haven’t V’ed",
    "longExplanation": "still haven’t V’ed. Pinyin: hái méi V",
    "formation": "hái méi V",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "你怎么还没吃饭？",
        "romanization": "nǐ zěnme hái méi chīfàn？",
        "translation": "How come you still haven’t eaten?"
      }
    ]
  },
  {
    "id": "zh_TIME就V_85",
    "language": "zh",
    "pattern": "TIME 就 V",
    "title": "TIME 就 V (V as early as TIME)",
    "shortExplanation": "V as early as TIME",
    "longExplanation": "V as early as TIME. Pinyin: TIME jiù V",
    "formation": "TIME jiù V",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "同学们七点半就来教室了。",
        "romanization": "tóngxué men qī diǎn bàn jiù lái jiàoshì le。",
        "translation": "The students got to the classroom as early as 7:30."
      }
    ]
  },
  {
    "id": "zh_N1离N2DISTANCE_86",
    "language": "zh",
    "pattern": "N1 离 N2 DISTANCE",
    "title": "N1 离 N2 DISTANCE (N1 is DISTANCE away from N2)",
    "shortExplanation": "N1 is DISTANCE away from N2",
    "longExplanation": "N1 is DISTANCE away from N2. Pinyin: N1 lí N2 DISTANCE",
    "formation": "N1 lí N2 DISTANCE",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "学校离机场20多公里。",
        "romanization": "xuéxiào lí jīchǎng20 duō gōnglǐ。",
        "translation": "The school is over 20 km away from the airport."
      }
    ]
  },
  {
    "id": "zh_呢_87",
    "language": "zh",
    "pattern": "……呢!",
    "title": "……呢! ((adding emphasis))",
    "shortExplanation": "(adding emphasis)",
    "longExplanation": "(adding emphasis). Pinyin: …… ne!",
    "formation": "…… ne!",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "他还在学习呢！",
        "romanization": "tā hái zài xuéxí ne！",
        "translation": "He is still studying!"
      }
    ]
  },
  {
    "id": "zh_好吗_88",
    "language": "zh",
    "pattern": "……好吗?",
    "title": "……好吗? (…okay?)",
    "shortExplanation": "…okay?",
    "longExplanation": "…okay?. Pinyin: …… hǎo ma?",
    "formation": "…… hǎo ma?",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "你明天下午给我打电话好吗？",
        "romanization": "nǐ míngtiān xiàwǔ gěi wǒ dǎdiànhuà hǎo ma？",
        "translation": "Call me tomorrow afternoon, okay?"
      }
    ]
  },
  {
    "id": "zh_再V_89",
    "language": "zh",
    "pattern": "再 V",
    "title": "再 V (again)",
    "shortExplanation": "again",
    "longExplanation": "again. Pinyin: zài V",
    "formation": "zài V",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "你再看一下这本书吧。",
        "romanization": "nǐ zài kàn yīxià zhè běn shū ba。",
        "translation": "Take another look at this book."
      }
    ]
  },
  {
    "id": "zh_再V_90",
    "language": "zh",
    "pattern": "再 V",
    "title": "再 V (then)",
    "shortExplanation": "then",
    "longExplanation": "then. Pinyin: zài V",
    "formation": "zài V",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "让我想想再告诉你。",
        "romanization": "ràng wǒ xiǎng xiǎng zài gàosu nǐ。",
        "translation": "Let me think about it, then I’ll let you know."
      }
    ]
  },
  {
    "id": "zh_TIME再V_91",
    "language": "zh",
    "pattern": "TIME 再 V",
    "title": "TIME 再 V (V only until TIME)",
    "shortExplanation": "V only until TIME",
    "longExplanation": "V only until TIME. Pinyin: TIME zài V",
    "formation": "TIME zài V",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "我明天再去。",
        "romanization": "wǒ míngtiān zài qù。",
        "translation": "I’ll go (only until) tomorrow."
      }
    ]
  },
  {
    "id": "zh_请让叫OV_92",
    "language": "zh",
    "pattern": "请/让/叫 O V",
    "title": "请/让/叫 O V (invite/let/ask O to V)",
    "shortExplanation": "invite/let/ask O to V",
    "longExplanation": "invite/let/ask O to V. Pinyin: qǐng/ ràng/ jiào O V",
    "formation": "qǐng/ ràng/ jiào O V",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "我请你吃饭。",
        "romanization": "wǒ qǐng nǐ chīfàn。",
        "translation": "I’m inviting you to have a meal."
      }
    ]
  },
  {
    "id": "zh_VV_93",
    "language": "zh",
    "pattern": "V V",
    "title": "V V (V for a bit)",
    "shortExplanation": "V for a bit",
    "longExplanation": "V for a bit. Pinyin: V V",
    "formation": "V V",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "你看看这几件衣服。",
        "romanization": "nǐ kànkan zhè jǐ jiàn yīfu。",
        "translation": "Take a look at these clothes."
      }
    ]
  },
  {
    "id": "zh_V一V_94",
    "language": "zh",
    "pattern": "V一V",
    "title": "V一V (V for a bit)",
    "shortExplanation": "V for a bit",
    "longExplanation": "V for a bit. Pinyin: V yīV",
    "formation": "V yīV",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "你看一看这几件衣服。",
        "romanization": "nǐ kànyīkàn zhè jǐ jiàn yīfu。",
        "translation": "Take a look at these clothes."
      }
    ]
  },
  {
    "id": "zh_Vresult_95",
    "language": "zh",
    "pattern": "V result",
    "title": "V result ((result complements))",
    "shortExplanation": "(result complements)",
    "longExplanation": "(result complements). Pinyin: V result",
    "formation": "V result",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "我看到你的女朋友了。",
        "romanization": "wǒ kàn dào nǐ de nǚpéngyou le。",
        "translation": "I saw your girlfriend."
      }
    ]
  },
  {
    "id": "zh_没Vresult_96",
    "language": "zh",
    "pattern": "没 V result",
    "title": "没 V result ((result complements))",
    "shortExplanation": "(result complements)",
    "longExplanation": "(result complements). Pinyin: méi V result",
    "formation": "méi V result",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "我没看到你的女朋友。",
        "romanization": "wǒ méi kàn dào nǐ de nǚpéngyou。",
        "translation": "I didn’t see your girlfriend."
      }
    ]
  },
  {
    "id": "zh_从N1到N2_97",
    "language": "zh",
    "pattern": "从 N1 到 N2",
    "title": "从 N1 到 N2 (from N1 to N2)",
    "shortExplanation": "from N1 to N2",
    "longExplanation": "from N1 to N2. Pinyin: cóng N1 dào N2",
    "formation": "cóng N1 dào N2",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "从老人到孩子都喜欢吃苹果。",
        "romanization": "cóng lǎorén dào háizi dōu xǐhuan chī píngguǒ。",
        "translation": "From old to young, all like to eat apples."
      }
    ]
  },
  {
    "id": "zh_第MN_98",
    "language": "zh",
    "pattern": "第 # M N",
    "title": "第 # M N (#-th N)",
    "shortExplanation": "#-th N",
    "longExplanation": "#-th N. Pinyin: dì # M N",
    "formation": "dì # M N",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "第四件事情还没做。",
        "romanization": "dì sì jiàn shìqing hái méi zuò。",
        "translation": "We haven't done the fourth thing yet."
      }
    ]
  },
  {
    "id": "zh_不要别V_99",
    "language": "zh",
    "pattern": "不要/别 V",
    "title": "不要/别 V (don’t do V)",
    "shortExplanation": "don’t do V",
    "longExplanation": "don’t do V. Pinyin: bùyào/ bié V",
    "formation": "bùyào/ bié V",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "不要/别玩儿手机！",
        "romanization": "bùyào/ bié wánr shǒujī！",
        "translation": "Don’t play with your phone!"
      }
    ]
  },
  {
    "id": "zh_不要别V了_100",
    "language": "zh",
    "pattern": "不要/别 V 了",
    "title": "不要/别 V 了 (stop doing V)",
    "shortExplanation": "stop doing V",
    "longExplanation": "stop doing V. Pinyin: bùyào/ bié V le",
    "formation": "bùyào/ bié V le",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "不要/别玩儿手机了！",
        "romanization": "bùyào/ bié wánr shǒujī le！",
        "translation": "Stop playing with your phone!"
      }
    ]
  },
  {
    "id": "zh_对NA_101",
    "language": "zh",
    "pattern": "对 N A",
    "title": "对 N A (Is A for N)",
    "shortExplanation": "Is A for N",
    "longExplanation": "Is A for N. Pinyin: duì N A",
    "formation": "duì N A",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "学汉语对在中国工作有帮助。",
        "romanization": "xué Hànyǔ duì zài Zhōngguó gōngzuò yǒubāngzhù。",
        "translation": "Learning Chinese is helpful for working in China."
      }
    ]
  },
  {
    "id": "zh_SV的N_102",
    "language": "zh",
    "pattern": "S V 的 N",
    "title": "S V 的 N (the N which S V’ed)",
    "shortExplanation": "the N which S V’ed",
    "longExplanation": "the N which S V’ed. Pinyin: S V de N",
    "formation": "S V de N",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "我妈妈做的饭非常好吃。",
        "romanization": "wǒ māma zuò de fàn fēicháng hǎochī。",
        "translation": "The food that mom makes is very delicious."
      }
    ]
  },
  {
    "id": "zh_N1比N2A_103",
    "language": "zh",
    "pattern": "N1 比 N2 A",
    "title": "N1 比 N2 A (N2 is more A than N1)",
    "shortExplanation": "N2 is more A than N1",
    "longExplanation": "N2 is more A than N1. Pinyin: N1 bǐ N2 A",
    "formation": "N1 bǐ N2 A",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "哥哥比姐姐高。",
        "romanization": "gēge bǐ jiějie gāo。",
        "translation": "My (older) brother is taller than my (older) sister."
      }
    ]
  },
  {
    "id": "zh_N1没有N2A_104",
    "language": "zh",
    "pattern": "N1 没有 N2 A",
    "title": "N1 没有 N2 A (N2 is not as A than N1)",
    "shortExplanation": "N2 is not as A than N1",
    "longExplanation": "N2 is not as A than N1. Pinyin: N1 méiyǒu N2 A",
    "formation": "N1 méiyǒu N2 A",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "哥哥没有姐姐高。",
        "romanization": "gēge méiyǒu jiějie gāo。",
        "translation": "My (older) brother is not as tall as my (older) sister."
      }
    ]
  },
  {
    "id": "zh_可能_105",
    "language": "zh",
    "pattern": "可能",
    "title": "可能 (probably)",
    "shortExplanation": "probably",
    "longExplanation": "probably. Pinyin: kěnéng",
    "formation": "kěnéng",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "她可能不会唱歌。",
        "romanization": "tā kěnéng bùhuì chànggē。",
        "translation": "Maybe she cannot sing."
      }
    ]
  },
  {
    "id": "zh_V得A_106",
    "language": "zh",
    "pattern": "V 得 A",
    "title": "V 得 A ((using adverbs))",
    "shortExplanation": "(using adverbs)",
    "longExplanation": "(using adverbs). Pinyin: V dé A",
    "formation": "V dé A",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "我跑得很快。",
        "romanization": "wǒ pǎo dehěn kuài。",
        "translation": "I run very quickly."
      }
    ]
  },
  {
    "id": "zh_VOV得A_107",
    "language": "zh",
    "pattern": "V O V 得 A",
    "title": "V O V 得 A ((using adverbs))",
    "shortExplanation": "(using adverbs)",
    "longExplanation": "(using adverbs). Pinyin: V O V dé A",
    "formation": "V O V dé A",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "姐姐唱歌唱得很好。",
        "romanization": "jiějie chànggē chàng dehěn hǎo。",
        "translation": "My (older) sister sings brilliantly."
      }
    ]
  },
  {
    "id": "zh_VOV得比NA_108",
    "language": "zh",
    "pattern": "V (O V) 得 比 N A",
    "title": "V (O V) 得 比 N A (V (O) more A than N)",
    "shortExplanation": "V (O) more A than N",
    "longExplanation": "V (O) more A than N. Pinyin: V (O V) dé bǐ N A",
    "formation": "V (O V) dé bǐ N A",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "他学(汉语学)得比我快。",
        "romanization": "tā xué( Hànyǔ xué) dé bǐ wǒ kuài。",
        "translation": "He learns (Chinese) more quickly than I do."
      }
    ]
  },
  {
    "id": "zh_比NVOV得A_109",
    "language": "zh",
    "pattern": "比 N V (O V) 得 A",
    "title": "比 N V (O V) 得 A (V (O) more A than N)",
    "shortExplanation": "V (O) more A than N",
    "longExplanation": "V (O) more A than N. Pinyin: bǐ N V (O V) dé A",
    "formation": "bǐ N V (O V) dé A",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "他比我学(汉语学)得快。",
        "romanization": "tā bǐ wǒ xué( Hànyǔ xué) dé kuài。",
        "translation": "He learns (Chinese) more quickly than I do."
      }
    ]
  },
  {
    "id": "zh_V着O_110",
    "language": "zh",
    "pattern": "V 着 O",
    "title": "V 着 O (V-ing O)",
    "shortExplanation": "V-ing O",
    "longExplanation": "V-ing O. Pinyin: V zhe O",
    "formation": "V zhe O",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "他们穿着西服。",
        "romanization": "tāmen chuānzhuó xīfú。",
        "translation": "They are wearing suites."
      }
    ]
  },
  {
    "id": "zh_没V着O_111",
    "language": "zh",
    "pattern": "没 V 着 O",
    "title": "没 V 着 O (not V-ing O)",
    "shortExplanation": "not V-ing O",
    "longExplanation": "not V-ing O. Pinyin: méi V zhe O",
    "formation": "méi V zhe O",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "他没拿着铅笔。",
        "romanization": "tā méi ná zhe qiānbǐ。",
        "translation": "He’s not holding a pencil."
      }
    ]
  },
  {
    "id": "zh_N不是吗_112",
    "language": "zh",
    "pattern": "N 不是……吗？",
    "title": "N 不是……吗？ (is N not…)",
    "shortExplanation": "is N not…",
    "longExplanation": "is N not…. Pinyin: N bùshì…… ma？",
    "formation": "N bùshì…… ma？",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "你不是北京人吗？",
        "romanization": "nǐ bùshì Běijīngrén ma？",
        "translation": "Aren’t you a Beijinger?"
      }
    ]
  },
  {
    "id": "zh_往DIRECTIONV_113",
    "language": "zh",
    "pattern": "往 DIRECTION V",
    "title": "往 DIRECTION V (V toward DIRECTION)",
    "shortExplanation": "V toward DIRECTION",
    "longExplanation": "V toward DIRECTION. Pinyin: wǎng DIRECTION V",
    "formation": "wǎng DIRECTION V",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "从这儿一直往东走。",
        "romanization": "cóng zhèr yīzhí wǎng dōng zǒu。",
        "translation": "Walk straight toward the east from here."
      }
    ]
  },
  {
    "id": "zh_V过_114",
    "language": "zh",
    "pattern": "V 过",
    "title": "V 过 (V’ed before)",
    "shortExplanation": "V’ed before",
    "longExplanation": "V’ed before. Pinyin: V guò",
    "formation": "V guò",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "我去过中国。",
        "romanization": "wǒ qù guò Zhōngguó。",
        "translation": "I've been to China."
      }
    ]
  },
  {
    "id": "zh_没有V过_115",
    "language": "zh",
    "pattern": "没有 V 过",
    "title": "没有 V 过 (haven’t V’ed)",
    "shortExplanation": "haven’t V’ed",
    "longExplanation": "haven’t V’ed. Pinyin: méiyǒu V guò",
    "formation": "méiyǒu V guò",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "他们没有来过我家。",
        "romanization": "tāmen méiyǒu lái guò wǒ jiā。",
        "translation": "They have never been to my place."
      }
    ]
  },
  {
    "id": "zh_虽然但是_116",
    "language": "zh",
    "pattern": "虽然……但是",
    "title": "虽然……但是 (although…)",
    "shortExplanation": "although…",
    "longExplanation": "although…. Pinyin: suīrán…… dànshì",
    "formation": "suīrán…… dànshì",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "虽然是晴天，但是还是很冷。",
        "romanization": "suīrán shì qíngtiān， dànshì háishi hěn lěng。",
        "translation": "Even though it's sunny, it's still cold."
      }
    ]
  },
  {
    "id": "zh_V过次O_117",
    "language": "zh",
    "pattern": "V 过 # 次 O",
    "title": "V 过 # 次 O (V’ed O # times)",
    "shortExplanation": "V’ed O # times",
    "longExplanation": "V’ed O # times. Pinyin: V guò # cì O",
    "formation": "V guò # cì O",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "他们坐过三次飞机。",
        "romanization": "tāmen zuò guò sāncì fēijī。",
        "translation": "They have taken a plane three times."
      }
    ]
  },
  {
    "id": "zh_V过PLACE次_118",
    "language": "zh",
    "pattern": "V 过 PLACE # 次",
    "title": "V 过 PLACE # 次 (V’ed to PLACE # times)",
    "shortExplanation": "V’ed to PLACE # times",
    "longExplanation": "V’ed to PLACE # times. Pinyin: V guò PLACE # cì",
    "formation": "V guò PLACE # cì",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "我们来过三次中国。",
        "romanization": "wǒmen lái guò sāncì Zhōngguó。",
        "translation": "We have been to China three times."
      }
    ]
  },
  {
    "id": "zh_TIME就要V了_119",
    "language": "zh",
    "pattern": "TIME (就) 要 V 了",
    "title": "TIME (就) 要 V 了 (about to V in TIME)",
    "shortExplanation": "about to V in TIME",
    "longExplanation": "about to V in TIME. Pinyin: TIME ( jiù) yào V le",
    "formation": "TIME ( jiù) yào V le",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "下个星期我们(就)要考试了。",
        "romanization": "xiàgèxīngqī wǒmen( jiù) yào kǎoshì le。",
        "translation": "We are about to have an exam in just a week."
      }
    ]
  },
  {
    "id": "zh_都TIMEAV了_120",
    "language": "zh",
    "pattern": "都 TIME/A/V 了",
    "title": "都 TIME/A/V 了 (It’s already TIME, is already A, has already V’ed)",
    "shortExplanation": "It’s already TIME, is already A, has already V’ed",
    "longExplanation": "It’s already TIME, is already A, has already V’ed. Pinyin: dōu TIME/A/V le",
    "formation": "dōu TIME/A/V le",
    "level": "HSK 2",
    "examples": [
      {
        "sentence": "都8点了，快点儿起床吧。",
        "romanization": "dōu8 diǎn le， kuàidiǎnr qǐchuáng ba。",
        "translation": "It’s already 8, get up quick!"
      }
    ]
  },
  {
    "id": "zh_V好_121",
    "language": "zh",
    "pattern": "V 好",
    "title": "V 好 (done V-ing)",
    "shortExplanation": "done V-ing",
    "longExplanation": "done V-ing. Pinyin: V hǎo",
    "formation": "V hǎo",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "饭还没做好，请你等一会儿。",
        "romanization": "fàn hái méi zuò hǎo， qǐng nǐděng yīhuìr。",
        "translation": "The food is not cooked yet, please wait awhile."
      }
    ]
  },
  {
    "id": "zh_一MN也都不V_122",
    "language": "zh",
    "pattern": "一 + M + N + 也／都 + 不 + V",
    "title": "一 + M + N + 也／都 + 不 + V (not V even one N)",
    "shortExplanation": "not V even one N",
    "longExplanation": "not V even one N. Pinyin: yī + M + N + yě／ dōu + bù + V",
    "formation": "yī + M + N + yě／ dōu + bù + V",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "我一个苹果也不吃。",
        "romanization": "wǒ yī gè píngguǒ yě bù chī。",
        "translation": "I’m not eating any apples. (Lit. I don’t eat even one apple.)"
      }
    ]
  },
  {
    "id": "zh_那_123",
    "language": "zh",
    "pattern": "那",
    "title": "那 (so then)",
    "shortExplanation": "so then",
    "longExplanation": "so then. Pinyin: nà",
    "formation": "nà",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "你不去，那我也不去了。",
        "romanization": "nǐ bù qù， nà wǒ yě bù qù le。",
        "translation": "[If] you don’t go, then I won’t go either."
      }
    ]
  },
  {
    "id": "zh_那也_124",
    "language": "zh",
    "pattern": "那也",
    "title": "那也 (but still)",
    "shortExplanation": "but still",
    "longExplanation": "but still. Pinyin: nà yě",
    "formation": "nà yě",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "A: 我早就复习好了。B: 那也不能一直玩儿啊。",
        "romanization": "A: wǒ zǎojiù fùxí hǎole。B: nà yě bùnéng yīzhí wánr ā。",
        "translation": "A: I’ve done my reviewed a long time ago already."
      }
    ]
  },
  {
    "id": "zh_V1了就V2_126",
    "language": "zh",
    "pattern": "V1了就 V2",
    "title": "V1了就 V2 (V2 as soon as V1)",
    "shortExplanation": "V2 as soon as V1",
    "longExplanation": "V2 as soon as V1. Pinyin: V1 le jiù V2",
    "formation": "V1 le jiù V2",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "爸爸回来了我们就吃饭。",
        "romanization": "bàba huílai le wǒmen jiù chīfàn。",
        "translation": "We’ll eat when dad comes back."
      }
    ]
  },
  {
    "id": "zh_V来去_127",
    "language": "zh",
    "pattern": "V 来／去",
    "title": "V 来／去 ((complements of direction))",
    "shortExplanation": "(complements of direction)",
    "longExplanation": "(complements of direction). Pinyin: V lái／ qù",
    "formation": "V lái／ qù",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "我们在楼上等你呢，你上来吧。",
        "romanization": "wǒmen zài lóushàng děng nǐ ne， nǐ shànglái ba。",
        "translation": "We are upstairs waiting, please come up."
      }
    ]
  },
  {
    "id": "zh_Vsomewhere来去_128",
    "language": "zh",
    "pattern": "V somewhere 来／去",
    "title": "V somewhere 来／去 ((complements of direction))",
    "shortExplanation": "(complements of direction)",
    "longExplanation": "(complements of direction). Pinyin: V somewhere lái／ qù",
    "formation": "V somewhere lái／ qù",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "朋友回家去了。",
        "romanization": "péngyou huíjiā qù le。",
        "translation": "[My] friend went back home."
      }
    ]
  },
  {
    "id": "zh_VO来去_129",
    "language": "zh",
    "pattern": "V O 来／去",
    "title": "V O 来／去 ((complements of direction))",
    "shortExplanation": "(complements of direction)",
    "longExplanation": "(complements of direction). Pinyin: V O lái／ qù",
    "formation": "V O lái／ qù",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "明天要带作业来。",
        "romanization": "míngtiān yào dài zuòyè lái。",
        "translation": "You need to bring [your] homework tomorrow."
      }
    ]
  },
  {
    "id": "zh_V来去O_130",
    "language": "zh",
    "pattern": "V 来／去 O",
    "title": "V 来／去 O ((complements of direction))",
    "shortExplanation": "(complements of direction)",
    "longExplanation": "(complements of direction). Pinyin: V lái／ qù O",
    "formation": "V lái／ qù O",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "明天要带来作业。",
        "romanization": "míngtiān yào dàilái zuòyè。",
        "translation": "Bring [your] homework tomorrow."
      }
    ]
  },
  {
    "id": "zh_能吗_131",
    "language": "zh",
    "pattern": "能……吗？",
    "title": "能……吗？ (how can you…?)",
    "shortExplanation": "how can you…?",
    "longExplanation": "how can you…?. Pinyin: néng…… ma？",
    "formation": "néng…… ma？",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "你不做作业，也不练习，能学好汉语吗？",
        "romanization": "nǐ bù zuò zuòyè， yě bù liànxí， néng xuéhǎo Hànyǔ ma？",
        "translation": "You don't do [your] homework, don't practice, how can you [possibly] learn Chinese well?"
      }
    ]
  },
  {
    "id": "zh_N1还是N2_132",
    "language": "zh",
    "pattern": "N1 还是 N2 ?",
    "title": "N1 还是 N2 ? (N1 or N2 ?)",
    "shortExplanation": "N1 or N2 ?",
    "longExplanation": "N1 or N2 ?. Pinyin: N1 háishi N2 ?",
    "formation": "N1 háishi N2 ?",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "你要喝咖啡还是喝茶？",
        "romanization": "nǐ yào hē kāfēi háishi hē chá？",
        "translation": "Do you want coffee or tea?"
      }
    ]
  },
  {
    "id": "zh_N1或者N2_133",
    "language": "zh",
    "pattern": "N1 或者 N2",
    "title": "N1 或者 N2 (either N1 or N21)",
    "shortExplanation": "either N1 or N21",
    "longExplanation": "either N1 or N21. Pinyin: N1 huòzhě N2",
    "formation": "N1 huòzhě N2",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "天冷了或者工作累了的时候，喝杯热茶很舒服。",
        "romanization": "tiānlěng le huòzhě gōngzuò lèi le de shíhou， hē bēi rèchá hěn shūfu。",
        "translation": "When the weather is cold or when you’re tired from work, it is very comfortable to drink a cup of hot tea."
      }
    ]
  },
  {
    "id": "zh_N1还是N2_134",
    "language": "zh",
    "pattern": "N1 还是 N2",
    "title": "N1 还是 N2 (N1 or N2 (in question-like clauses))",
    "shortExplanation": "N1 or N2 (in question-like clauses)",
    "longExplanation": "N1 or N2 (in question-like clauses). Pinyin: N1 háishi N2",
    "formation": "N1 háishi N2",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "我还没想好去爬山还是去看电影。",
        "romanization": "wǒ hái méi xiǎng hǎoqù páshān háishi qù kàn diànyǐng。",
        "translation": "I haven't decided whether to go hiking or to go to the movies."
      }
    ]
  },
  {
    "id": "zh_PLACEV着N_135",
    "language": "zh",
    "pattern": "PLACE + V + 着 + N",
    "title": "PLACE + V + 着 + N (There is N V’ed in PLACE.)",
    "shortExplanation": "There is N V’ed in PLACE.",
    "longExplanation": "There is N V’ed in PLACE.. Pinyin: PLACE + V + zhe + N",
    "formation": "PLACE + V + zhe + N",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "桌子上放着一杯咖啡。",
        "romanization": "zhuōzi shàng fàng zhe yī bēi kāfēi。",
        "translation": "There is a cup of coffee placed on the table."
      }
    ]
  },
  {
    "id": "zh_PLACE没V着N_136",
    "language": "zh",
    "pattern": "PLACE + 没 + V + 着 + N",
    "title": "PLACE + 没 + V + 着 + N (There is not N V’ed in PLACE.)",
    "shortExplanation": "There is not N V’ed in PLACE.",
    "longExplanation": "There is not N V’ed in PLACE.. Pinyin: PLACE + méi + V + zhe + N",
    "formation": "PLACE + méi + V + zhe + N",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "桌子上没放着咖啡。",
        "romanization": "zhuōzi shàng méi fàng zhe kāfēi。",
        "translation": "There was no coffee placed on the table."
      }
    ]
  },
  {
    "id": "zh_会VA的_137",
    "language": "zh",
    "pattern": "会 + V / A + (的）",
    "title": "会 + V / A + (的） (will V, will be A)",
    "shortExplanation": "will V, will be A",
    "longExplanation": "will V, will be A. Pinyin: huì + V / A + ( de）",
    "formation": "huì + V / A + ( de）",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "你穿得那么少，会感冒的。",
        "romanization": "nǐ chuān dé nàme shǎo， huì gǎnmào de。",
        "translation": "You wear so little, you will catch a cold."
      }
    ]
  },
  {
    "id": "zh_又又_138",
    "language": "zh",
    "pattern": "又……又……",
    "title": "又……又…… (not only… but also…)",
    "shortExplanation": "not only… but also…",
    "longExplanation": "not only… but also…. Pinyin: yòu…… yòu……",
    "formation": "yòu…… yòu……",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "这个西瓜又大又甜。",
        "romanization": "zhège xīguā yòu dà yòu tián。",
        "translation": "This watermelon is big and sweet."
      }
    ]
  },
  {
    "id": "zh_V1着V2_139",
    "language": "zh",
    "pattern": "V1 + 着 + V2",
    "title": "V1 + 着 + V2 (V1-ing while V2-ing)",
    "shortExplanation": "V1-ing while V2-ing",
    "longExplanation": "V1-ing while V2-ing. Pinyin: V1 + zhe + V2",
    "formation": "V1 + zhe + V2",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "弟弟吃着苹果写作业。",
        "romanization": "dìdi chī zhe píngguǒ xiě zuòyè。",
        "translation": "The younger brother is doing homework while eating [an] apple."
      }
    ]
  },
  {
    "id": "zh_A了_140",
    "language": "zh",
    "pattern": "A 了",
    "title": "A 了 (become A)",
    "shortExplanation": "become A",
    "longExplanation": "become A. Pinyin: A le",
    "formation": "A le",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "昨天吃了感冒药，现在好一些了。",
        "romanization": "zuótiān chī le gǎnmàoyào， xiànzài hǎo yīxiē le。",
        "translation": "I took flu medicine yesterday, and I’m better now."
      }
    ]
  },
  {
    "id": "zh_V了_141",
    "language": "zh",
    "pattern": "V 了",
    "title": "V 了 ((didn’t V but) now V)",
    "shortExplanation": "(didn’t V but) now V",
    "longExplanation": "(didn’t V but) now V. Pinyin: V le",
    "formation": "V le",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "现在我可以穿漂亮的裙子了。",
        "romanization": "xiànzài wǒ kěyǐ chuān piàoliang de qúnzi le。",
        "translation": "Now I can wear a beautiful dress."
      }
    ]
  },
  {
    "id": "zh_越来越A了_142",
    "language": "zh",
    "pattern": "越来越 + A + (了)",
    "title": "越来越 + A + (了) (more and more A)",
    "shortExplanation": "more and more A",
    "longExplanation": "more and more A. Pinyin: yuèláiyuè + A + ( le)",
    "formation": "yuèláiyuè + A + ( le)",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "你最近越来越帅了。",
        "romanization": "nǐ zuìjìn yuèláiyuè shuài le。",
        "translation": "You’re more and more handsome these days."
      }
    ]
  },
  {
    "id": "zh_V得RESULT_143",
    "language": "zh",
    "pattern": "V + 得 + RESULT",
    "title": "V + 得 + RESULT (can V to RESULT)",
    "shortExplanation": "can V to RESULT",
    "longExplanation": "can V to RESULT. Pinyin: V + dé + RESULT",
    "formation": "V + dé + RESULT",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "我看得清楚那个汉字。",
        "romanization": "wǒ kàn dé qīngchu nàge hànzì。",
        "translation": "I can see the Chinese character clearly."
      }
    ]
  },
  {
    "id": "zh_V得DIRECTION_144",
    "language": "zh",
    "pattern": "V + 得 + DIRECTION",
    "title": "V + 得 + DIRECTION (can V to DIRECTION)",
    "shortExplanation": "can V to DIRECTION",
    "longExplanation": "can V to DIRECTION. Pinyin: V + dé + DIRECTION",
    "formation": "V + dé + DIRECTION",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "楼这么高，你上得来吗？",
        "romanization": "lóu zhème gāo， nǐ shàng dé lái ma？",
        "translation": "The building is so high, are you able to come up?"
      }
    ]
  },
  {
    "id": "zh_V不result_145",
    "language": "zh",
    "pattern": "V + 不 + result",
    "title": "V + 不 + result (cannot V to RESULT)",
    "shortExplanation": "cannot V to RESULT",
    "longExplanation": "cannot V to RESULT. Pinyin: V + bù + result",
    "formation": "V + bù + result",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "我找不到好饭馆。",
        "romanization": "wǒ zhǎobudào hǎo fànguǎn。",
        "translation": "I can't seek out a good restaurant."
      }
    ]
  },
  {
    "id": "zh_V不direction_146",
    "language": "zh",
    "pattern": "V + 不 + direction",
    "title": "V + 不 + direction (cannot V to DIRECTION)",
    "shortExplanation": "cannot V to DIRECTION",
    "longExplanation": "cannot V to DIRECTION. Pinyin: V + bù + direction",
    "formation": "V + bù + direction",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "楼太高了，我上不去。",
        "romanization": "lóu tài gāo le， wǒ shàng bù qù。",
        "translation": "The building is too high, I can't go up."
      }
    ]
  },
  {
    "id": "zh_N呢_147",
    "language": "zh",
    "pattern": "N 呢?",
    "title": "N 呢? (where is N?)",
    "shortExplanation": "where is N?",
    "longExplanation": "where is N?. Pinyin: N ne?",
    "formation": "N ne?",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "你的书呢？",
        "romanization": "nǐ de shū ne？",
        "translation": "Where is your book?"
      }
    ]
  },
  {
    "id": "zh_刚V_148",
    "language": "zh",
    "pattern": "刚 V",
    "title": "刚 V (just V)",
    "shortExplanation": "just V",
    "longExplanation": "just V. Pinyin: gāng V",
    "formation": "gāng V",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "儿子刚做完作业。",
        "romanization": "érzi gāng zuòwán zuòyè。",
        "translation": "The son just finished his homework."
      }
    ]
  },
  {
    "id": "zh_刚才_149",
    "language": "zh",
    "pattern": "刚才",
    "title": "刚才 (moments ago)",
    "shortExplanation": "moments ago",
    "longExplanation": "moments ago. Pinyin: gāngcái",
    "formation": "gāngcái",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "刚才儿子在做作业。",
        "romanization": "gāngcái érzi zài zuò zuòyè。",
        "translation": "My son is doing homework moments ago."
      }
    ]
  },
  {
    "id": "zh_V了DURATIONO_150",
    "language": "zh",
    "pattern": "V + 了 + DURATION + O",
    "title": "V + 了 + DURATION + O (V’ed O for DURATION)",
    "shortExplanation": "V’ed O for DURATION",
    "longExplanation": "V’ed O for DURATION. Pinyin: V + le + DURATION + O",
    "formation": "V + le + DURATION + O",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "我们坐了一个小时公共汽车。",
        "romanization": "wǒmen zuò le yī gè xiǎoshí gōnggòngqìchē。",
        "translation": "We took a bus for an hour."
      }
    ]
  },
  {
    "id": "zh_V了DURATIONO了_151",
    "language": "zh",
    "pattern": "V + 了 + DURATION + O + 了",
    "title": "V + 了 + DURATION + O + 了 (have been V-ing O for DURATION)",
    "shortExplanation": "have been V-ing O for DURATION",
    "longExplanation": "have been V-ing O for DURATION. Pinyin: V + le + DURATION + O + le",
    "formation": "V + le + DURATION + O + le",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "我学习了一年汉语了。",
        "romanization": "wǒ xuéxí le yī nián Hànyǔ le。",
        "translation": "I have studied Chinese for a year."
      }
    ]
  },
  {
    "id": "zh_对N感兴趣有兴趣_152",
    "language": "zh",
    "pattern": "对 N 感兴趣/有兴趣",
    "title": "对 N 感兴趣/有兴趣 (interested in N)",
    "shortExplanation": "interested in N",
    "longExplanation": "interested in N. Pinyin: duì N gǎnxìngqù/ yǒuxìngqù",
    "formation": "duì N gǎnxìngqù/ yǒuxìngqù",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "他们对中国电影感兴趣。",
        "romanization": "tāmen duì Zhōngguó diànyǐng gǎnxìngqù。",
        "translation": "They are interested in Chinese movies."
      }
    ]
  },
  {
    "id": "zh_对N没兴趣_153",
    "language": "zh",
    "pattern": "对 N 没兴趣",
    "title": "对 N 没兴趣 (not interested in N)",
    "shortExplanation": "not interested in N",
    "longExplanation": "not interested in N. Pinyin: duì N méi xìngqù",
    "formation": "duì N méi xìngqù",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "他们对中国电影没兴趣。",
        "romanization": "tāmen duì Zhōngguó diànyǐng méi xìngqù。",
        "translation": "They are not interested in Chinese movies."
      }
    ]
  },
  {
    "id": "zh_半_154",
    "language": "zh",
    "pattern": "半",
    "title": "半 (half hour)",
    "shortExplanation": "half hour",
    "longExplanation": "half hour. Pinyin: bàn",
    "formation": "bàn",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "现在七点半。",
        "romanization": "xiànzài qī diǎn bàn。",
        "translation": "It’s half past seven."
      }
    ]
  },
  {
    "id": "zh_一刻_155",
    "language": "zh",
    "pattern": "一刻",
    "title": "一刻 (quarter hour (when telling time))",
    "shortExplanation": "quarter hour (when telling time)",
    "longExplanation": "quarter hour (when telling time). Pinyin: yī kè",
    "formation": "yī kè",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "现在七点一刻。",
        "romanization": "xiànzài qī diǎn yī kè。",
        "translation": "Now it’s quarter past seven."
      }
    ]
  },
  {
    "id": "zh_一刻钟_156",
    "language": "zh",
    "pattern": "一刻钟",
    "title": "一刻钟 (quarter hour (duration))",
    "shortExplanation": "quarter hour (duration)",
    "longExplanation": "quarter hour (duration). Pinyin: yī kè zhōng",
    "formation": "yī kè zhōng",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "你迟到了一刻钟。",
        "romanization": "nǐ chí dàoliǎo yī kè zhōng。",
        "translation": "You are late for 15 minutes."
      }
    ]
  },
  {
    "id": "zh_差ch_157",
    "language": "zh",
    "pattern": "差 (chà)",
    "title": "差 (chà) (to (when telling time))",
    "shortExplanation": "to (when telling time)",
    "longExplanation": "to (when telling time). Pinyin: chà (chà)",
    "formation": "chà (chà)",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "已经差一刻八点了！",
        "romanization": "yǐjīng chà yī kè bā diǎn le！",
        "translation": "It’s already a quarter to eight!"
      }
    ]
  },
  {
    "id": "zh_再V_158",
    "language": "zh",
    "pattern": "再 V",
    "title": "再 V (again (later))",
    "shortExplanation": "again (later)",
    "longExplanation": "again (later). Pinyin: zài V",
    "formation": "zài V",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "我明天还要再去看看。",
        "romanization": "wǒ míngtiān hái yào zài qù kànkan。",
        "translation": "I will go see it again tomorrow."
      }
    ]
  },
  {
    "id": "zh_又V_159",
    "language": "zh",
    "pattern": "又 V",
    "title": "又 V ((did) again)",
    "shortExplanation": "(did) again",
    "longExplanation": "(did) again. Pinyin: yòu V",
    "formation": "yòu V",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "你今天怎么又迟到了?",
        "romanization": "nǐ jīntiān zěnme yòu chí dàoliǎo?",
        "translation": "Why are you late again today?"
      }
    ]
  },
  {
    "id": "zh_SQ1就Q2_160",
    "language": "zh",
    "pattern": "S + Q1 + 就 + Q2",
    "title": "S + Q1 + 就 + Q2 ((S acts in a way so that the answer to Q1 is the same as the answer to Q2.))",
    "shortExplanation": "(S acts in a way so that the answer to Q1 is the same as the answer to Q2.)",
    "longExplanation": "(S acts in a way so that the answer to Q1 is the same as the answer to Q2.). Pinyin: S + Q1 + jiù + Q2",
    "formation": "S + Q1 + jiù + Q2",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "我想喝什么就喝什么。",
        "romanization": "wǒ xiǎng hē shénme jiù hē shénme。",
        "translation": "I drink whatever I want to drink."
      }
    ]
  },
  {
    "id": "zh_S1QS2就Q_161",
    "language": "zh",
    "pattern": "S1 + Q + S2 + 就 + Q",
    "title": "S1 + Q + S2 + 就 + Q ((S2 acts in a way that the answer to Q is true for both S1 and S2.))",
    "shortExplanation": "(S2 acts in a way that the answer to Q is true for both S1 and S2.)",
    "longExplanation": "(S2 acts in a way that the answer to Q is true for both S1 and S2.). Pinyin: S1 + Q + S2 + jiù + Q",
    "formation": "S1 + Q + S2 + jiù + Q",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "你喝什么我就喝什么。",
        "romanization": "nǐ hē shénme wǒ jiù hē shénme。",
        "translation": "I drink whatever you drink."
      }
    ]
  },
  {
    "id": "zh_越V1A1越V2A2_162",
    "language": "zh",
    "pattern": "越 V1/A1 越 V2/A2",
    "title": "越 V1/A1 越 V2/A2 (the more V1/A1 the more V2/A2)",
    "shortExplanation": "the more V1/A1 the more V2/A2",
    "longExplanation": "the more V1/A1 the more V2/A2. Pinyin: yuè V1/A1 yuè V2/A2",
    "formation": "yuè V1/A1 yuè V2/A2",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "我们越聊越开心。",
        "romanization": "wǒmen yuè liáo yuè kāixīn。",
        "translation": "The more we chat, the more joyous we are."
      }
    ]
  },
  {
    "id": "zh_N1跟N2一样_163",
    "language": "zh",
    "pattern": "N1 跟 N2 一样",
    "title": "N1 跟 N2 一样 (N1 is like N2)",
    "shortExplanation": "N1 is like N2",
    "longExplanation": "N1 is like N2. Pinyin: N1 gēn N2 yīyàng",
    "formation": "N1 gēn N2 yīyàng",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "你的眼睛跟大熊猫一样。",
        "romanization": "nǐ de yǎnjing gēn dàxióngmāo yīyàng。",
        "translation": "Your eyes are like pandas’ [eyes]."
      }
    ]
  },
  {
    "id": "zh_N1跟N2一样A_164",
    "language": "zh",
    "pattern": "N1 跟 N2 一样 A",
    "title": "N1 跟 N2 一样 A (N1 is as A as N2)",
    "shortExplanation": "N1 is as A as N2",
    "longExplanation": "N1 is as A as N2. Pinyin: N1 gēn N2 yīyàng A",
    "formation": "N1 gēn N2 yīyàng A",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "儿子跟爸爸一样高。",
        "romanization": "érzi gēn bàba yīyàng gāo。",
        "translation": "The son is as tall as his father."
      }
    ]
  },
  {
    "id": "zh_没有N这么那么A_165",
    "language": "zh",
    "pattern": "没有 N (这么/那么) A",
    "title": "没有 N (这么/那么) A (not as A as N)",
    "shortExplanation": "not as A as N",
    "longExplanation": "not as A as N. Pinyin: méiyǒu N ( zhème/ nàme) A",
    "formation": "méiyǒu N ( zhème/ nàme) A",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "我的汉语没有他那么好。",
        "romanization": "wǒ de Hànyǔ méiyǒu tā nàme hǎo。",
        "translation": "My Chinese is not as good as his."
      }
    ]
  },
  {
    "id": "zh_A一点儿一些_166",
    "language": "zh",
    "pattern": "A 一点儿/一些",
    "title": "A 一点儿/一些 (A little more A)",
    "shortExplanation": "A little more A",
    "longExplanation": "A little more A. Pinyin: A yīdiǎnr/ yīxiē",
    "formation": "A yīdiǎnr/ yīxiē",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "大山比大卫矮一点儿。",
        "romanization": "Dàshān bǐ Dàwèi ǎi yīdiǎnr。",
        "translation": "Dashan is a little shorter than David."
      }
    ]
  },
  {
    "id": "zh_A得多多了_167",
    "language": "zh",
    "pattern": "A 得多/多了",
    "title": "A 得多/多了 (much more A)",
    "shortExplanation": "much more A",
    "longExplanation": "much more A. Pinyin: A dé duō/ duō le",
    "formation": "A dé duō/ duō le",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "今天的作业比昨天多得多。",
        "romanization": "jīntiān de zuòyè bǐ zuótiān duō dé duō。",
        "translation": "Today's homework is much more than yesterday’s."
      }
    ]
  },
  {
    "id": "zh_1_168",
    "language": "zh",
    "pattern": "# #+1",
    "title": "# #+1 (# or #+1)",
    "shortExplanation": "# or #+1",
    "longExplanation": "# or #+1. Pinyin: # #+1",
    "formation": "# #+1",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "我每天学习一两个小时汉语。",
        "romanization": "wǒ měitiān xuéxí yī liǎng gè xiǎoshí Hànyǔ。",
        "translation": "I study Chinese for one or two hours a day."
      }
    ]
  },
  {
    "id": "zh_把了_169",
    "language": "zh",
    "pattern": "把 + Ｏ + Ｖ + 了",
    "title": "把 + Ｏ + Ｖ + 了 (V’ed the O)",
    "shortExplanation": "V’ed the O",
    "longExplanation": "V’ed the O. Pinyin: bǎ + Ｏ + Ｖ + le",
    "formation": "bǎ + Ｏ + Ｖ + le",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "我把钱包忘了。",
        "romanization": "wǒ bǎ qiánbāo wàng le。",
        "translation": "I forgot my/the wallet."
      }
    ]
  },
  {
    "id": "zh_不要别没把了_170",
    "language": "zh",
    "pattern": "不要/别/没把 + Ｏ + Ｖ + 了",
    "title": "不要/别/没把 + Ｏ + Ｖ + 了 (don’t/don’t/haven’t V’ed the O)",
    "shortExplanation": "don’t/don’t/haven’t V’ed the O",
    "longExplanation": "don’t/don’t/haven’t V’ed the O. Pinyin: bùyào/ bié/ méi bǎ + Ｏ + Ｖ + le",
    "formation": "bùyào/ bié/ méi bǎ + Ｏ + Ｖ + le",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "别把手机忘了。",
        "romanization": "bié bǎshǒu jī wàng le。",
        "translation": "Don't forget your/the phone."
      }
    ]
  },
  {
    "id": "zh_左右_171",
    "language": "zh",
    "pattern": "# 左右",
    "title": "# 左右 (approximately #)",
    "shortExplanation": "approximately #",
    "longExplanation": "approximately #. Pinyin: # zuǒyòu",
    "formation": "# zuǒyòu",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "周末我一般十点左右起床。",
        "romanization": "zhōumò wǒ yībān shí diǎn zuǒyòu qǐchuáng。",
        "translation": "I usually get up at around 10 o'clock on weekends."
      }
    ]
  },
  {
    "id": "zh_就VA_172",
    "language": "zh",
    "pattern": "就 V/A",
    "title": "就 V/A (just (better than expected))",
    "shortExplanation": "just (better than expected)",
    "longExplanation": "just (better than expected). Pinyin: jiù V/A",
    "formation": "jiù V/A",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "坐飞机一个小时就到了。",
        "romanization": "zuòfēijī yī gè xiǎoshí jiù dàoliǎo。",
        "translation": "It takes only an hour to get there by plane."
      }
    ]
  },
  {
    "id": "zh_才VA_173",
    "language": "zh",
    "pattern": "才 V/A",
    "title": "才 V/A (just (worse than expected))",
    "shortExplanation": "just (worse than expected)",
    "longExplanation": "just (worse than expected). Pinyin: cái V/A",
    "formation": "cái V/A",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "你怎么才来？",
        "romanization": "nǐ zěnme cái lái？",
        "translation": "How come you only came just now? (Why are you so late?)"
      }
    ]
  },
  {
    "id": "zh_把OV在到PLACE_174",
    "language": "zh",
    "pattern": "把 + O + V + 在/到 +  PLACE",
    "title": "把 + O + V + 在/到 +  PLACE (V’d the O to PLACE)",
    "shortExplanation": "V’d the O to PLACE",
    "longExplanation": "V’d the O to PLACE. Pinyin: bǎ + O + V + zài/ dào + PLACE",
    "formation": "bǎ + O + V + zài/ dào + PLACE",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "我把照片放在你包里了。",
        "romanization": "wǒ bǎ zhàopiàn fàng zài nǐ bāo lǐ le。",
        "translation": "I put the photo in your bag."
      }
    ]
  },
  {
    "id": "zh_VmotionV来去_175",
    "language": "zh",
    "pattern": "V + motion V + 来/去",
    "title": "V + motion V + 来/去 ((compound complements of direction))",
    "shortExplanation": "(compound complements of direction)",
    "longExplanation": "(compound complements of direction). Pinyin: V + motion V + lái/ qù",
    "formation": "V + motion V + lái/ qù",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "明天我们一起把礼物送过去。",
        "romanization": "míngtiān wǒmen yīqǐ bǎ lǐwù sòng guòqu。",
        "translation": "Let's send the gift over together tomorrow."
      }
    ]
  },
  {
    "id": "zh_一边V1一边V2_176",
    "language": "zh",
    "pattern": "一边 + V1 + 一边 + V2",
    "title": "一边 + V1 + 一边 + V2 (V1 while V2)",
    "shortExplanation": "V1 while V2",
    "longExplanation": "V1 while V2. Pinyin: yībiān + V1 + yībiān + V2",
    "formation": "yībiān + V1 + yībiān + V2",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "他一边唱歌一边跳舞。",
        "romanization": "tā yībiān chànggē yībiān tiàowǔ。",
        "translation": "He sang while he danced."
      }
    ]
  },
  {
    "id": "zh_把OVresult_177",
    "language": "zh",
    "pattern": "把 + O + V + result",
    "title": "把 + O + V + result (V the O until RESULT)",
    "shortExplanation": "V the O until RESULT",
    "longExplanation": "V the O until RESULT. Pinyin: bǎ + O + V + result",
    "formation": "bǎ + O + V + result",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "我把衣服洗干净了。",
        "romanization": "wǒ bǎ yīfu xǐ gānjìng le。",
        "translation": "I washed my clothes clean."
      }
    ]
  },
  {
    "id": "zh_把OVdirection_178",
    "language": "zh",
    "pattern": "把 + O + V + direction",
    "title": "把 + O + V + direction (V the O to DIRECTION)",
    "shortExplanation": "V the O to DIRECTION",
    "longExplanation": "V the O to DIRECTION. Pinyin: bǎ + O + V + direction",
    "formation": "bǎ + O + V + direction",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "他把水果拿过来了。",
        "romanization": "tā bǎ shuǐguǒ ná guòlái le。",
        "translation": "He took the fruit over."
      }
    ]
  },
  {
    "id": "zh_先再又然后_179",
    "language": "zh",
    "pattern": "先……再/又……然后……",
    "title": "先……再/又……然后…… (First, then, then, …)",
    "shortExplanation": "First, then, then, …",
    "longExplanation": "First, then, then, …. Pinyin: xiān…… zài/ yòu…… ránhòu……",
    "formation": "xiān…… zài/ yòu…… ránhòu……",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "我先坐了公共汽车，又坐了地铁，然后才到小刚家。",
        "romanization": "wǒ xiān zuò le gōnggòngqìchē， yòu zuò le dìtiě， ránhòu cái dào xiǎo gāng jiā。",
        "translation": "I first took the bus, then took the subway, and then went to Xiaogang's house."
      }
    ]
  },
  {
    "id": "zh_除了N以外_180",
    "language": "zh",
    "pattern": "除了 N 以外",
    "title": "除了 N 以外 (except N)",
    "shortExplanation": "except N",
    "longExplanation": "except N. Pinyin: chúle N yǐwài",
    "formation": "chúle N yǐwài",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "除了这个汉字以外，别的我都认识。",
        "romanization": "chúle zhège hànzì yǐwài， biéde wǒ dōu rènshi。",
        "translation": "Except for this Chinese character, I know everything else."
      }
    ]
  },
  {
    "id": "zh_除了以外还_181",
    "language": "zh",
    "pattern": "除了……(以外)，还……",
    "title": "除了……(以外)，还…… (not only…, but also…)",
    "shortExplanation": "not only…, but also…",
    "longExplanation": "not only…, but also…. Pinyin: chúle……( yǐwài)， hái……",
    "formation": "chúle……( yǐwài)， hái……",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "上网除了看新闻(以外)，还可以听音乐。",
        "romanization": "shàngwǎng chúle kàn xīnwén( yǐwài)， hái kěyǐ tīng yīnyuè。",
        "translation": "In addition to watching the news, you can listen to music too."
      }
    ]
  },
  {
    "id": "zh_什么_182",
    "language": "zh",
    "pattern": "什么",
    "title": "什么 (any)",
    "shortExplanation": "any",
    "longExplanation": "any. Pinyin: shénme",
    "formation": "shénme",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "周末你有什么打算吗?",
        "romanization": "zhōumò nǐ yǒu shénme dǎsuàn ma?",
        "translation": "Do you have any plans for the weekend?"
      }
    ]
  },
  {
    "id": "zh_A极了_183",
    "language": "zh",
    "pattern": "A 极了",
    "title": "A 极了 (extremely A)",
    "shortExplanation": "extremely A",
    "longExplanation": "extremely A. Pinyin: A jíle",
    "formation": "A jíle",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "今天天气冷极了。",
        "romanization": "jīntiān tiānqì lěng jíle。",
        "translation": "The weather is extremely cold today."
      }
    ]
  },
  {
    "id": "zh_如果的话就_184",
    "language": "zh",
    "pattern": "如果……(的话), 就……",
    "title": "如果……(的话), 就…… (if …, then…)",
    "shortExplanation": "if …, then…",
    "longExplanation": "if …, then…. Pinyin: rúguǒ……( dehuà), jiù……",
    "formation": "rúguǒ……( dehuà), jiù……",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "如果你太累的话，就休息一会儿。",
        "romanization": "rúguǒ nǐ tài lèi dehuà， jiù xiūxi yīhuìr。",
        "translation": "If you are too tired, take a break."
      }
    ]
  },
  {
    "id": "zh_A得CLAUSE_185",
    "language": "zh",
    "pattern": "A + 得 + CLAUSE",
    "title": "A + 得 + CLAUSE (so A that + CLAUSE)",
    "shortExplanation": "so A that + CLAUSE",
    "longExplanation": "so A that + CLAUSE. Pinyin: A + dé + CLAUSE",
    "formation": "A + dé + CLAUSE",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "儿子累得下了班就睡觉了。",
        "romanization": "érzi lèi dé xià le bān jiù shuìjiào le。",
        "translation": "The son was so tired that he went to sleep as soon as he got off work."
      }
    ]
  },
  {
    "id": "zh_AA的_186",
    "language": "zh",
    "pattern": "A + A + 的",
    "title": "A + A + 的 (A (with characteristics))",
    "shortExplanation": "A (with characteristics)",
    "longExplanation": "A (with characteristics). Pinyin: A + A + de",
    "formation": "A + A + de",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "她鼻子小小的，头发黑黑的。",
        "romanization": "tā bízi xiǎoxiǎo de， tóufa hēi hēi de。",
        "translation": "Her nose is teeny tiny and her hair is black."
      }
    ]
  },
  {
    "id": "zh_VV_187",
    "language": "zh",
    "pattern": "V + V",
    "title": "V + V (V for a bit)",
    "shortExplanation": "V for a bit",
    "longExplanation": "V for a bit. Pinyin: V + V",
    "formation": "V + V",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "我带你去医院检查检查吧。",
        "romanization": "wǒ dài nǐ qù yīyuàn jiǎnchá jiǎnchá ba。",
        "translation": "Let me take you to the hospital for to check up a bit."
      }
    ]
  },
  {
    "id": "zh_Q都_188",
    "language": "zh",
    "pattern": "Q + 都",
    "title": "Q + 都 (Q-ever)",
    "shortExplanation": "Q-ever",
    "longExplanation": "Q-ever. Pinyin: Q + dōu",
    "formation": "Q + dōu",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "小刚什么都喜欢吃。",
        "romanization": "xiǎo gāng shénme dōu xǐhuan chī。",
        "translation": "Xiao Gang likes to eat anything (lit. whatever)."
      }
    ]
  },
  {
    "id": "zh_只要就_189",
    "language": "zh",
    "pattern": "只要……就……",
    "title": "只要……就…… (as long as)",
    "shortExplanation": "as long as",
    "longExplanation": "as long as. Pinyin: zhǐyào…… jiù……",
    "formation": "zhǐyào…… jiù……",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "只要我有时间，就一定跟你去旅游。",
        "romanization": "zhǐyào wǒ yǒu shíjiān， jiù yīdìng gēn nǐ qù lǚyóu。",
        "translation": "As long as I have time, I will definitely travel with you."
      }
    ]
  },
  {
    "id": "zh_关于_190",
    "language": "zh",
    "pattern": "关于",
    "title": "关于 (about)",
    "shortExplanation": "about",
    "longExplanation": "about. Pinyin: guānyú",
    "formation": "guānyú",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "关于这件事，我们还没有决定呢。",
        "romanization": "guānyú zhè jiàn shì， wǒmen hái méiyǒu juédìng ne。",
        "translation": "We have not decided on this matter yet."
      }
    ]
  },
  {
    "id": "zh_V出来_191",
    "language": "zh",
    "pattern": "V + 出来",
    "title": "V + 出来 (V and produce an outcome)",
    "shortExplanation": "V and produce an outcome",
    "longExplanation": "V and produce an outcome. Pinyin: V + chūlái",
    "formation": "V + chūlái",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "这个字你能写出来吗?",
        "romanization": "zhège zì nǐ néng xiě chūlái ma?",
        "translation": "Can you write (out) this word?"
      }
    ]
  },
  {
    "id": "zh_V出来_192",
    "language": "zh",
    "pattern": "V + 出来",
    "title": "V + 出来 (V and recognize)",
    "shortExplanation": "V and recognize",
    "longExplanation": "V and recognize. Pinyin: V + chūlái",
    "formation": "V + chūlái",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "你听出来了吗？这是谁的声音？",
        "romanization": "nǐ tīng chūlái le ma？ zhè shì shéi de shēngyīn？",
        "translation": "After listening, did you recognize [it]? Whose voice is this?"
      }
    ]
  },
  {
    "id": "zh_V下来_193",
    "language": "zh",
    "pattern": "V + 下来",
    "title": "V + 下来 (V down)",
    "shortExplanation": "V down",
    "longExplanation": "V down. Pinyin: V + xiàlai",
    "formation": "V + xiàlai",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "我真希望时间能慢下来。",
        "romanization": "wǒ zhēn xīwàng shíjiān néng màn xiàlai。",
        "translation": "I really hope that time can slow down."
      }
    ]
  },
  {
    "id": "zh_想起来_194",
    "language": "zh",
    "pattern": "想起来",
    "title": "想起来 (to recall)",
    "shortExplanation": "to recall",
    "longExplanation": "to recall. Pinyin: xiǎngqilai",
    "formation": "xiǎngqilai",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "我想不起来他的名字了。",
        "romanization": "wǒ xiǎng bù qilai tā de míngzi le。",
        "translation": "I can't think of (lit. think up) his name."
      }
    ]
  },
  {
    "id": "zh_看起来看上去_195",
    "language": "zh",
    "pattern": "看起来/看上去",
    "title": "看起来/看上去 (to seem)",
    "shortExplanation": "to seem",
    "longExplanation": "to seem. Pinyin: kànqǐlái/ kànshangqu",
    "formation": "kànqǐlái/ kànshangqu",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "他看上去/看起来像40多岁。",
        "romanization": "tā kànshangqu/ kànqǐlái xiàng40 duō suì。",
        "translation": "He looks like he is in his 40s."
      }
    ]
  },
  {
    "id": "zh_使叫让OAV_196",
    "language": "zh",
    "pattern": "使/叫/让 + O + A/V",
    "title": "使/叫/让 + O + A/V (make O A/V)",
    "shortExplanation": "make O A/V",
    "longExplanation": "make O A/V. Pinyin: shǐ/ jiào/ ràng + O + A/V",
    "formation": "shǐ/ jiào/ ràng + O + A/V",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "读书使/叫/让我快乐。",
        "romanization": "dúshū shǐ/ jiào/ ràng wǒ kuàilè。",
        "translation": "Reading makes me happy."
      }
    ]
  },
  {
    "id": "zh_O被叫让SV_197",
    "language": "zh",
    "pattern": "O + 被/叫/让 + S + V",
    "title": "O + 被/叫/让 + S + V (O is V’ed by S)",
    "shortExplanation": "O is V’ed by S",
    "longExplanation": "O is V’ed by S. Pinyin: O + bèi/ jiào/ ràng + S + V",
    "formation": "O + bèi/ jiào/ ràng + S + V",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "我的照相机被/叫/让谁拿走了?",
        "romanization": "wǒ de zhàoxiàngjī bèi/ jiào/ ràng shéi názǒu le?",
        "translation": "My camera was taken by who?"
      }
    ]
  },
  {
    "id": "zh_O不没被叫让SV_198",
    "language": "zh",
    "pattern": "O + 不/没 + 被/叫/让 + S + V",
    "title": "O + 不/没 + 被/叫/让 + S + V (O is not V’ed by S)",
    "shortExplanation": "O is not V’ed by S",
    "longExplanation": "O is not V’ed by S. Pinyin: O + bù/ méi + bèi/ jiào/ ràng + S + V",
    "formation": "O + bù/ méi + bèi/ jiào/ ràng + S + V",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "问题还没有被解决呢。",
        "romanization": "wèntí hái méiyǒu bèi jiějué ne。",
        "translation": "The problem has not been solved yet."
      }
    ]
  },
  {
    "id": "zh_只有才_199",
    "language": "zh",
    "pattern": "只有……才……",
    "title": "只有……才…… (only if)",
    "shortExplanation": "only if",
    "longExplanation": "only if. Pinyin: zhǐyǒu…… cái……",
    "formation": "zhǐyǒu…… cái……",
    "level": "HSK 3",
    "examples": [
      {
        "sentence": "只有写完作业，才能看电视。",
        "romanization": "zhǐyǒu xiěwán zuòyè， cáinéng kàn diànshì。",
        "translation": "You can watch TV only if you finish your homework."
      }
    ]
  },
  {
    "id": "zh_不仅也还而且_200",
    "language": "zh",
    "pattern": "不仅……也/还/而且……",
    "title": "不仅……也/还/而且…… (Not only… but also…)",
    "shortExplanation": "Not only… but also…",
    "longExplanation": "Not only… but also…. Pinyin: bùjǐn…… yě/ hái/ érqiě……",
    "formation": "bùjǐn…… yě/ hái/ érqiě……",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "我不仅看过《泰坦尼克号》，也看过《诺丁山》。",
        "romanization": "wǒ bùjǐn kàn guò《 Tàitǎnníkè Hào》， yě kàn guò《 nuò dīng shān》。",
        "translation": "I have not only seen Titanic, but also Notting Hill."
      }
    ]
  },
  {
    "id": "zh_不仅S1S2也_201",
    "language": "zh",
    "pattern": "不仅 S1……，S2 也……",
    "title": "不仅 S1……，S2 也…… (Not only S1…, S2 also…)",
    "shortExplanation": "Not only S1…, S2 also…",
    "longExplanation": "Not only S1…, S2 also…. Pinyin: bùjǐn S1……，S2 yě……",
    "formation": "bùjǐn S1……，S2 yě……",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "不仅马克看过《诺丁山》，我也看过《诺丁山》。",
        "romanization": "bùjǐn Mǎkè kàn guò《 nuò dīng shān》， wǒ yě kàn guò《 nuò dīng shān》。",
        "translation": "Not only did Mark see Notting Hill, I also saw Notting Hill."
      }
    ]
  },
  {
    "id": "zh_从来不V_202",
    "language": "zh",
    "pattern": "从来不 V",
    "title": "从来不 V (never V)",
    "shortExplanation": "never V",
    "longExplanation": "never V. Pinyin: cóngláibù V",
    "formation": "cóngláibù V",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "我中午从来不睡觉。",
        "romanization": "wǒ zhōngwǔ cóngláibù shuìjiào。",
        "translation": "I never sleep at noon."
      }
    ]
  },
  {
    "id": "zh_从来没VA过_203",
    "language": "zh",
    "pattern": "从来没 V/A 过",
    "title": "从来没 V/A 过 (never have V’ed, never have been A)",
    "shortExplanation": "never have V’ed, never have been A",
    "longExplanation": "never have V’ed, never have been A. Pinyin: cóngláiméi V/A guò",
    "formation": "cóngláiméi V/A guò",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "他爸爸妈妈从来没这么高兴过。",
        "romanization": "tā bàba māma cóngláiméi zhème gāoxìng guò。",
        "translation": "His father and mother have never been so happy."
      }
    ]
  },
  {
    "id": "zh_刚刚刚V_204",
    "language": "zh",
    "pattern": "刚/刚刚 V",
    "title": "刚/刚刚 V (just V’ed)",
    "shortExplanation": "just V’ed",
    "longExplanation": "just V’ed. Pinyin: gāng/ gānggang V",
    "formation": "gāng/ gānggang V",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "我上个月刚结婚。",
        "romanization": "wǒ shànggèyuè gāng jiéhūn。",
        "translation": "I just got married last month."
      }
    ]
  },
  {
    "id": "zh_刚VDURATION_205",
    "language": "zh",
    "pattern": "刚 + V + DURATION",
    "title": "刚 + V + DURATION (have V’ed for just DURATION)",
    "shortExplanation": "have V’ed for just DURATION",
    "longExplanation": "have V’ed for just DURATION. Pinyin: gāng + V + DURATION",
    "formation": "gāng + V + DURATION",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "他刚来一个月。",
        "romanization": "tā gāng lái yī gè yuè。",
        "translation": "He’s been [lit. come] here for just a month."
      }
    ]
  },
  {
    "id": "zh_刚才_206",
    "language": "zh",
    "pattern": "刚才",
    "title": "刚才 (moments ago)",
    "shortExplanation": "moments ago",
    "longExplanation": "moments ago. Pinyin: gāngcái",
    "formation": "gāngcái",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "刚才我收到了一封电子邮件。",
        "romanization": "gāngcái wǒ shōu dàoliǎo yī fēng diànzǐyóujiàn。",
        "translation": "I just received an email."
      }
    ]
  },
  {
    "id": "zh_即使也_207",
    "language": "zh",
    "pattern": "即使……也……",
    "title": "即使……也…… (even if…, still…)",
    "shortExplanation": "even if…, still…",
    "longExplanation": "even if…, still…. Pinyin: jíshǐ…… yě……",
    "formation": "jíshǐ…… yě……",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "即使冬天很冷，他也每天去操场跑步。",
        "romanization": "jíshǐ dōngtiān hěn lěng， tā yě měitiān qù cāochǎng pǎobù。",
        "translation": "Even if it’s very cold in winter, he still goes to the playground to job every day."
      }
    ]
  },
  {
    "id": "zh_在N上_208",
    "language": "zh",
    "pattern": "(在) N 上",
    "title": "(在) N 上 (with regard to N)",
    "shortExplanation": "with regard to N",
    "longExplanation": "with regard to N. Pinyin: ( zài) N shàng",
    "formation": "( zài) N shàng",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "在爱好上，我更像我妈妈。",
        "romanization": "zài àihào shàng， wǒ gèng xiàng wǒ māma。",
        "translation": "In terms of hobbies, I am more like my mother."
      }
    ]
  },
  {
    "id": "zh_正好_209",
    "language": "zh",
    "pattern": "正好",
    "title": "正好 (just right)",
    "shortExplanation": "just right",
    "longExplanation": "just right. Pinyin: zhènghǎo",
    "formation": "zhènghǎo",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "衣服大小正好。",
        "romanization": "yīfu dàxiǎo zhènghǎo。",
        "translation": "The clothes are just the right size."
      }
    ]
  },
  {
    "id": "zh_V得正好_210",
    "language": "zh",
    "pattern": "V 得正好",
    "title": "V 得正好 (V’ed at just the right time)",
    "shortExplanation": "V’ed at just the right time",
    "longExplanation": "V’ed at just the right time. Pinyin: V dé zhènghǎo",
    "formation": "V dé zhènghǎo",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "你来得正好。",
        "romanization": "nǐ láide zhènghǎo。",
        "translation": "You came at just the right time."
      }
    ]
  },
  {
    "id": "zh_NN差不多_211",
    "language": "zh",
    "pattern": "N & N 差不多",
    "title": "N & N 差不多 (N & N are about the same)",
    "shortExplanation": "N & N are about the same",
    "longExplanation": "N & N are about the same. Pinyin: N & N chàbuduō",
    "formation": "N & N chàbuduō",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "这辆车的颜色和那辆车的颜色差不多。",
        "romanization": "zhè liàng chē de yánsè hé nà liàng chē de yánsè chàbuduō。",
        "translation": "The color of this car is similar to the color of that car."
      }
    ]
  },
  {
    "id": "zh_差不多_212",
    "language": "zh",
    "pattern": "差不多 #",
    "title": "差不多 # (about #)",
    "shortExplanation": "about #",
    "longExplanation": "about #. Pinyin: chàbuduō #",
    "formation": "chàbuduō #",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "这台电脑差不多5000块。",
        "romanization": "zhè tái diànnǎo chàbuduō5000 kuài。",
        "translation": "This computer is about 5,000 yuan."
      }
    ]
  },
  {
    "id": "zh_差不多A_213",
    "language": "zh",
    "pattern": "差不多 A",
    "title": "差不多 A (about A)",
    "shortExplanation": "about A",
    "longExplanation": "about A. Pinyin: chàbuduō A",
    "formation": "chàbuduō A",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "女儿个子跟我差不多一样高。",
        "romanization": "nǚ'ér gèzi gēn wǒ chàbuduō yīyàng gāo。",
        "translation": "My daughter is about as tall as me."
      }
    ]
  },
  {
    "id": "zh_差不多V_214",
    "language": "zh",
    "pattern": "差不多 V",
    "title": "差不多 V (about V’ed)",
    "shortExplanation": "about V’ed",
    "longExplanation": "about V’ed. Pinyin: chàbuduō V",
    "formation": "chàbuduō V",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "工作差不多干完了。",
        "romanization": "gōngzuò chàbuduō gàn wánle。",
        "translation": "Work is about finished."
      }
    ]
  },
  {
    "id": "zh_几乎_215",
    "language": "zh",
    "pattern": "几乎 #",
    "title": "几乎 # (almost #)",
    "shortExplanation": "almost #",
    "longExplanation": "almost #. Pinyin: jīhū #",
    "formation": "jīhū #",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "这台电脑几乎5000块。",
        "romanization": "zhè tái diànnǎo jīhū5000 kuài。",
        "translation": "This computer is almost 5,000 yuan."
      }
    ]
  },
  {
    "id": "zh_几乎A_216",
    "language": "zh",
    "pattern": "几乎 A",
    "title": "几乎 A (almost)",
    "shortExplanation": "almost",
    "longExplanation": "almost. Pinyin: jīhū A",
    "formation": "jīhū A",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "得失几乎相当。",
        "romanization": "déshī jīhū xiāngdāng。",
        "translation": "The loss and the gain are almost the same."
      }
    ]
  },
  {
    "id": "zh_几乎V_217",
    "language": "zh",
    "pattern": "几乎 V",
    "title": "几乎 V (almost)",
    "shortExplanation": "almost",
    "longExplanation": "almost. Pinyin: jīhū V",
    "formation": "jīhū V",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "这件事我几乎忘了告诉你了。",
        "romanization": "zhè jiàn shì wǒ jīhū wàng le gàosu nǐ le。",
        "translation": "I almost forgot to tell you about this."
      }
    ]
  },
  {
    "id": "zh_尽管_218",
    "language": "zh",
    "pattern": "尽管",
    "title": "尽管 (although)",
    "shortExplanation": "although",
    "longExplanation": "although. Pinyin: jǐnguǎn",
    "formation": "jǐnguǎn",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "尽管今天很冷，可是他穿的衣服很少。",
        "romanization": "jǐnguǎn jīntiān hěn lěng， kěshì tā chuān de yīfu hěn shǎo。",
        "translation": "Although it is very cold today, he wears very little clothes."
      }
    ]
  },
  {
    "id": "zh_虽然尽管却_219",
    "language": "zh",
    "pattern": "(虽然/尽管) …… 却",
    "title": "(虽然/尽管) …… 却 ((although)… but)",
    "shortExplanation": "(although)… but",
    "longExplanation": "(although)… but. Pinyin: ( suīrán/ jǐnguǎn) …… què",
    "formation": "( suīrán/ jǐnguǎn) …… què",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "(虽然/尽管) 工作很忙，她们却每天坚持锻炼。",
        "romanization": "( suīrán/ jǐnguǎn) gōngzuò hěn máng， tāmen què měitiān jiānchí duànliàn。",
        "translation": "(Although) they are busy at work, but they insist on exercising every day."
      }
    ]
  },
  {
    "id": "zh_而_220",
    "language": "zh",
    "pattern": "而",
    "title": "而 (and/but)",
    "shortExplanation": "and/but",
    "longExplanation": "and/but. Pinyin: ér",
    "formation": "ér",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "听、说能力很重要，而写汉字的能力也重要。",
        "romanization": "tīng、 shuō nénglì hěn zhòngyào， ér xiě hànzì de nénglì yě zhòngyào。",
        "translation": "Listening and speaking abilities are very important, and (on the other hand) the ability to write Chinese characters is also important."
      }
    ]
  },
  {
    "id": "zh_挺A的_221",
    "language": "zh",
    "pattern": "挺 A 的",
    "title": "挺 A 的 (quite A)",
    "shortExplanation": "quite A",
    "longExplanation": "quite A. Pinyin: tǐng A de",
    "formation": "tǐng A de",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "我挺喜欢这个地方的。",
        "romanization": "wǒ tǐng xǐhuan zhège dìfang de。",
        "translation": "I quite like this place."
      }
    ]
  },
  {
    "id": "zh_本来VA_222",
    "language": "zh",
    "pattern": "本来 V/A",
    "title": "本来 V/A (originally V/A)",
    "shortExplanation": "originally V/A",
    "longExplanation": "originally V/A. Pinyin: běnlái V/A",
    "formation": "běnlái V/A",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "她本来想学新闻，但是现在学习法律。",
        "romanization": "tā běnlái xiǎng xué xīnwén， dànshì xiànzài xuéxí fǎlǜ。",
        "translation": "She originally wanted to learn the news, but now she is studying law."
      }
    ]
  },
  {
    "id": "zh_本来就VA_223",
    "language": "zh",
    "pattern": "本来就 V/A",
    "title": "本来就 V/A (V/A in the first place)",
    "shortExplanation": "V/A in the first place",
    "longExplanation": "V/A in the first place. Pinyin: běnlái jiù V/A",
    "formation": "běnlái jiù V/A",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "学生本来就不应该上课迟到。",
        "romanization": "xuésheng běnlái jiù bù yīnggāi shàngkè chídào。",
        "translation": "Students should not be late for class in the first place."
      }
    ]
  },
  {
    "id": "zh_另另外另外的N_224",
    "language": "zh",
    "pattern": "另/另外/另外的 + # + N",
    "title": "另/另外/另外的 + # + N (another # N)",
    "shortExplanation": "another # N",
    "longExplanation": "another # N. Pinyin: lìng/ lìngwài/ lìngwài de + # + N",
    "formation": "lìng/ lìngwài/ lìngwài de + # + N",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "他拿出另/另外/另外的一本书。",
        "romanization": "tā náchū lìng/ lìngwài/ lìngwài de yī běn shū。",
        "translation": "He took out another book."
      }
    ]
  },
  {
    "id": "zh_另外的其他的别的N_225",
    "language": "zh",
    "pattern": "另外的/其他的/别的 N",
    "title": "另外的/其他的/别的 N (other N)",
    "shortExplanation": "other N",
    "longExplanation": "other N. Pinyin: lìngwài de/ qítā de/ biéde N",
    "formation": "lìngwài de/ qítā de/ biéde N",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "不要看这本书，请看另外的/其他的/别的书。",
        "romanization": "bùyào kàn zhè běn shū， qǐngkàn lìngwài de/ qítā de/ biéde shū。",
        "translation": "Don't read this book, please read other books."
      }
    ]
  },
  {
    "id": "zh_另另外V_226",
    "language": "zh",
    "pattern": "另/另外 V",
    "title": "另/另外 V (V another)",
    "shortExplanation": "V another",
    "longExplanation": "V another. Pinyin: lìng/ lìngwài V",
    "formation": "lìng/ lìngwài V",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "他另/另外给了我三十元。",
        "romanization": "tā lìng/ lìngwài gěi le wǒ sānshí yuán。",
        "translation": "He gave me another 30 yuan."
      }
    ]
  },
  {
    "id": "zh_另外_227",
    "language": "zh",
    "pattern": "另外，……",
    "title": "另外，…… (In addition, …)",
    "shortExplanation": "In addition, …",
    "longExplanation": "In addition, …. Pinyin: lìngwài，……",
    "formation": "lìngwài，……",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "多吃水果。另外，还要记得多喝水。",
        "romanization": "duō chī shuǐguǒ。 lìngwài， hái yào jìde duō hē shuǐ。",
        "translation": "Eat more fruits. Also, remember to drink more water."
      }
    ]
  },
  {
    "id": "zh_首先其次_228",
    "language": "zh",
    "pattern": "首先……其次……",
    "title": "首先……其次…… (First… second…)",
    "shortExplanation": "First… second…",
    "longExplanation": "First… second…. Pinyin: shǒuxiān…… qícì……",
    "formation": "shǒuxiān…… qícì……",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "应聘时，首先要穿正式的衣服，其次不要紧张。",
        "romanization": "yìngpìn shí， shǒuxiān yào chuān zhèngshì de yīfu， qícì bùyào jǐnzhāng。",
        "translation": "At the job interview, first [you] should wear formal clothing, and second don't be nervous."
      }
    ]
  },
  {
    "id": "zh_不管_229",
    "language": "zh",
    "pattern": "不管",
    "title": "不管 (no matter)",
    "shortExplanation": "no matter",
    "longExplanation": "no matter. Pinyin: bùguǎn",
    "formation": "bùguǎn",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "不管什么电影，我都喜欢看。",
        "romanization": "bùguǎn shénme diànyǐng， wǒ dōu xǐhuan kàn。",
        "translation": "I like to watch all kinds of movies. (Lit. No matter what movie, I like to watch them all.)"
      }
    ]
  },
  {
    "id": "zh_以为_230",
    "language": "zh",
    "pattern": "以为",
    "title": "以为 (to believe falsely)",
    "shortExplanation": "to believe falsely",
    "longExplanation": "to believe falsely. Pinyin: yǐwéi",
    "formation": "yǐwéi",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "我以为东西是给我的，其实是给爸爸的。",
        "romanization": "wǒ yǐwéi dōngxi shì gěi wǒ de， qíshí shì gěi bàba de。",
        "translation": "I thought the thing was for me, but actually it was for my father."
      }
    ]
  },
  {
    "id": "zh_原来本来_231",
    "language": "zh",
    "pattern": "原来/本来",
    "title": "原来/本来 (originally)",
    "shortExplanation": "originally",
    "longExplanation": "originally. Pinyin: yuánlái/ běnlái",
    "formation": "yuánlái/ běnlái",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "原来/本来需要12个小时。",
        "romanization": "yuánlái/ běnlái xūyào12 gè xiǎoshí。",
        "translation": "It originally required 12 hours."
      }
    ]
  },
  {
    "id": "zh_原来clause_232",
    "language": "zh",
    "pattern": "原来 clause",
    "title": "原来 clause (it turns out)",
    "shortExplanation": "it turns out",
    "longExplanation": "it turns out. Pinyin: yuánlái clause",
    "formation": "yuánlái clause",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "我还以为是谁帮我打扫房间呢，原来是你啊！",
        "romanization": "wǒ hái yǐwéi shì shéi bāng wǒ dǎsǎo fángjiān ne， yuánlái shì nǐ ā！",
        "translation": "I was wondering who was cleaning the room for me. It turns out it’s you!"
      }
    ]
  },
  {
    "id": "zh_本来就VA_233",
    "language": "zh",
    "pattern": "本来就 V/A",
    "title": "本来就 V/A ((see 4.03.2))",
    "shortExplanation": "(see 4.03.2)",
    "longExplanation": "(see 4.03.2). Pinyin: běnlái jiù V/A",
    "formation": "běnlái jiù V/A",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "-",
        "romanization": "-",
        "translation": "-"
      }
    ]
  },
  {
    "id": "zh_并不并没VA_234",
    "language": "zh",
    "pattern": "并不/并没 V/A",
    "title": "并不/并没 V/A ((emphasize the negative))",
    "shortExplanation": "(emphasize the negative)",
    "longExplanation": "(emphasize the negative). Pinyin: bìngbù/ bìng méi V/A",
    "formation": "bìngbù/ bìng méi V/A",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "大家说外面很冷，但我并不觉得冷。",
        "romanization": "dàjiā shuō wàimiàn hěn lěng， dàn wǒ bìngbù juéde lěng。",
        "translation": "Everyone said that it was cold outside, but I (rather) didn’t feel cold."
      }
    ]
  },
  {
    "id": "zh_按照N_235",
    "language": "zh",
    "pattern": "按照 N",
    "title": "按照 N (according to N)",
    "shortExplanation": "according to N",
    "longExplanation": "according to N. Pinyin: ànzhào N",
    "formation": "ànzhào N",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "我们还是按照原来的计划进行。",
        "romanization": "wǒmen háishi ànzhào yuánlái de jìhuà jìnxíng。",
        "translation": "We are still proceeding according to the original plan."
      }
    ]
  },
  {
    "id": "zh_甚至VA_236",
    "language": "zh",
    "pattern": "甚至 V/A",
    "title": "甚至 V/A (even V/A)",
    "shortExplanation": "even V/A",
    "longExplanation": "even V/A. Pinyin: shènzhì V/A",
    "formation": "shènzhì V/A",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "他工作很努力，甚至忘了吃饭。",
        "romanization": "tā gōngzuò hěn nǔlì， shènzhì wàng le chīfàn。",
        "translation": "He worked hard and even forgot to eat."
      }
    ]
  },
  {
    "id": "zh_肯定VA_237",
    "language": "zh",
    "pattern": "肯定 V/A",
    "title": "肯定 V/A (certainly V/A)",
    "shortExplanation": "certainly V/A",
    "longExplanation": "certainly V/A. Pinyin: kěndìng V/A",
    "formation": "kěndìng V/A",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "运动对身体健康肯定有好处。",
        "romanization": "yùndòng duì shēntǐ jiànkāng kěndìng yǒu hǎochu。",
        "translation": "Exercise is definitely good for your health."
      }
    ]
  },
  {
    "id": "zh_肯定_238",
    "language": "zh",
    "pattern": "肯定",
    "title": "肯定 (certain)",
    "shortExplanation": "certain",
    "longExplanation": "certain. Pinyin: kěndìng",
    "formation": "kěndìng",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "我能肯定，张远一定会来。",
        "romanization": "wǒ néng kěndìng， zhāng yuǎn yīdìng huì lái。",
        "translation": "I can be sure that Zhang Yuan will definitely come."
      }
    ]
  },
  {
    "id": "zh_肯定的_239",
    "language": "zh",
    "pattern": "肯定的",
    "title": "肯定的 (affirmative, positive)",
    "shortExplanation": "affirmative, positive",
    "longExplanation": "affirmative, positive. Pinyin: kěndìng de",
    "formation": "kěndìng de",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "他的回答是肯定的。",
        "romanization": "tā de huídá shì kěndìng de。",
        "translation": "His answer is yes (in the affirmative)."
      }
    ]
  },
  {
    "id": "zh_再说_240",
    "language": "zh",
    "pattern": "再说",
    "title": "再说 (talk about it / deal with it until a later time)",
    "shortExplanation": "talk about it / deal with it until a later time",
    "longExplanation": "talk about it / deal with it until a later time. Pinyin: zàishuō",
    "formation": "zàishuō",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "现在学习忙，考完再说吧。",
        "romanization": "xiànzài xuéxí máng， kǎowán zàishuō ba。",
        "translation": "I’m busy studying now, let’s talk about it / deal with it (until) after the exam."
      }
    ]
  },
  {
    "id": "zh_再说_241",
    "language": "zh",
    "pattern": "再说",
    "title": "再说 (besides)",
    "shortExplanation": "besides",
    "longExplanation": "besides. Pinyin: zàishuō",
    "formation": "zàishuō",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "毕业后大家都很忙，再说，很多同学不在一个城市。",
        "romanization": "bìyè hòu dàjiā dōu hěn máng， zàishuō， hěn duō tóngxué bùzài yī gè chéngshì。",
        "translation": "After graduation, everyone was very busy. Besides, many students are not in a city."
      }
    ]
  },
  {
    "id": "zh_实际的_242",
    "language": "zh",
    "pattern": "实际的",
    "title": "实际的 (real)",
    "shortExplanation": "real",
    "longExplanation": "real. Pinyin: shíjì de",
    "formation": "shíjì de",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "实际的东西跟广告上的不一样。",
        "romanization": "shíjì de dōngxi gēn guǎnggào shàng de bùyīyàng。",
        "translation": "The actual thing is different from the one on the advertisement."
      }
    ]
  },
  {
    "id": "zh_实际_243",
    "language": "zh",
    "pattern": "实际",
    "title": "实际 (reality)",
    "shortExplanation": "reality",
    "longExplanation": "reality. Pinyin: shíjì",
    "formation": "shíjì",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "广告跟实际不一样。",
        "romanization": "guǎnggào gēn shíjì bùyīyàng。",
        "translation": "Advertising is not the same as the actual [thing]."
      }
    ]
  },
  {
    "id": "zh_实际上_244",
    "language": "zh",
    "pattern": "实际上",
    "title": "实际上 (in reality)",
    "shortExplanation": "in reality",
    "longExplanation": "in reality. Pinyin: shíjìshàng",
    "formation": "shíjìshàng",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "广告说得好，实际上不一定好。",
        "romanization": "guǎnggào shuō dé hǎo， shíjìshàng bùyīdìng hǎo。",
        "translation": "The advertisement is well said, but it is not necessarily good in reality."
      }
    ]
  },
  {
    "id": "zh_对来说_245",
    "language": "zh",
    "pattern": "对……来说",
    "title": "对……来说 (for, as for)",
    "shortExplanation": "for, as for",
    "longExplanation": "for, as for. Pinyin: duì…… láishuō",
    "formation": "duì…… láishuō",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "对我来说，学习机会更重要。",
        "romanization": "duìwǒláishuō， xuéxí jīhuì gèng zhòngyào。",
        "translation": "For me, learning opportunities are more important."
      }
    ]
  },
  {
    "id": "zh_特别_246",
    "language": "zh",
    "pattern": "特别",
    "title": "特别 (very much, extremely)",
    "shortExplanation": "very much, extremely",
    "longExplanation": "very much, extremely. Pinyin: tèbié",
    "formation": "tèbié",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "您女儿长得特别像您。",
        "romanization": "nín nǚ'ér zhǎngde tèbié xiàng nín。",
        "translation": "Your daughter looks especially like you."
      }
    ]
  },
  {
    "id": "zh_特别尤其_247",
    "language": "zh",
    "pattern": "特别/尤其",
    "title": "特别/尤其 (especially, particularly)",
    "shortExplanation": "especially, particularly",
    "longExplanation": "especially, particularly. Pinyin: tèbié/ yóuqí",
    "formation": "tèbié/ yóuqí",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "您女儿长得真像您，特别是/尤其眼睛。",
        "romanization": "nín nǚ'ér zhǎngde zhēn xiàng nín， tèbié shì/ yóuqí yǎnjing。",
        "translation": "Your daughter looks like you, especially her eyes."
      }
    ]
  },
  {
    "id": "zh_特别的_248",
    "language": "zh",
    "pattern": "特别的",
    "title": "特别的 (special)",
    "shortExplanation": "special",
    "longExplanation": "special. Pinyin: tèbié de",
    "formation": "tèbié de",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "我有一个特别的要求。",
        "romanization": "wǒ yǒu yī gè tèbié de yāoqiú。",
        "translation": "I have a special request."
      }
    ]
  },
  {
    "id": "zh_竟然VA_249",
    "language": "zh",
    "pattern": "竟然 V/A",
    "title": "竟然 V/A ((expressing surprise))",
    "shortExplanation": "(expressing surprise)",
    "longExplanation": "(expressing surprise). Pinyin: jìngrán V/A",
    "formation": "jìngrán V/A",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "这个歌特别好听，最近很流行，你竟然没听过？",
        "romanization": "zhège gē tèbié hǎotīng， zuìjìn hěn liúxíng， nǐ jìngrán méi tīng guò？",
        "translation": "This song is particularly nice, it has been very popular recently, you’re telling me you’ve never heard of it?"
      }
    ]
  },
  {
    "id": "zh_倍_250",
    "language": "zh",
    "pattern": "# 倍",
    "title": "# 倍 (# times)",
    "shortExplanation": "# times",
    "longExplanation": "# times. Pinyin: # bèi",
    "formation": "# bèi",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "二的五倍是十。",
        "romanization": "èr de wǔ bèi shì shí。",
        "translation": "2, multiplied 5 times, is 10."
      }
    ]
  },
  {
    "id": "zh_值得V_251",
    "language": "zh",
    "pattern": "值得 V",
    "title": "值得 V (is worth)",
    "shortExplanation": "is worth",
    "longExplanation": "is worth. Pinyin: zhíde V",
    "formation": "zhíde V",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "您看看这个，不管从价格方面看， 还是从质量上看， 都是值得考虑的。",
        "romanization": "nín kànkan zhège， bùguǎn cóng jiàgé fāngmiàn kàn， háishi cóng zhìliàng shàng kàn， dōu shì zhíde kǎolǜ de。",
        "translation": "Look at this, both in terms of price and quality, it is worth considering."
      }
    ]
  },
  {
    "id": "zh_值值得_252",
    "language": "zh",
    "pattern": "值/值得",
    "title": "值/值得 (is worth it)",
    "shortExplanation": "is worth it",
    "longExplanation": "is worth it. Pinyin: zhí/ zhíde",
    "formation": "zhí/ zhíde",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "别总是为一点儿小事生气，不值/值得。",
        "romanization": "bié zǒngshì wéi yīdiǎnr xiǎoshì shēngqì， bùzhí/ zhíde。",
        "translation": "Don't always be angry with a little thing, it’s not worth it."
      }
    ]
  },
  {
    "id": "zh_值_253",
    "language": "zh",
    "pattern": "值 $",
    "title": "值 $ (is worth $)",
    "shortExplanation": "is worth $",
    "longExplanation": "is worth $. Pinyin: zhí $",
    "formation": "zhí $",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "这个手表值五十块。",
        "romanization": "zhège shǒubiǎo zhí wǔshí kuài。",
        "translation": "This watch is worth fifty yuan."
      }
    ]
  },
  {
    "id": "zh_其中_254",
    "language": "zh",
    "pattern": "其中",
    "title": "其中 (among them)",
    "shortExplanation": "among them",
    "longExplanation": "among them. Pinyin: qízhōng",
    "formation": "qízhōng",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "我们不仅要会读书，还要会选择其中的好书来读。",
        "romanization": "wǒmen bùjǐn yào huì dúshū， hái yào huì xuǎnzé qízhōng de hǎo shū lái dú。",
        "translation": "Not only do we have to read books, but we also need to know how to choose the good ones among them to read."
      }
    ]
  },
  {
    "id": "zh_在SITUATION下_255",
    "language": "zh",
    "pattern": "(在) SITUATION 下",
    "title": "(在) SITUATION 下 (under SITUATION)",
    "shortExplanation": "under SITUATION",
    "longExplanation": "under SITUATION. Pinyin: ( zài) SITUATION xià",
    "formation": "( zài) SITUATION xià",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "(在) 一般情况下，你花的钱越多，买的东西也就越好。",
        "romanization": "( zài) yībān qíngkuàng xià， nǐ huā de qián yuè duō， mǎi de dōngxi yě jiù yuè hǎo。",
        "translation": "In general (lit. under general circumstances), the more money you spend, the better the goods you buy."
      }
    ]
  },
  {
    "id": "zh_估计可能CLAUSE_256",
    "language": "zh",
    "pattern": "估计/可能 CLAUSE",
    "title": "估计/可能 CLAUSE (perhaps CLAUSE)",
    "shortExplanation": "perhaps CLAUSE",
    "longExplanation": "perhaps CLAUSE. Pinyin: gūjì/ kěnéng CLAUSE",
    "formation": "gūjì/ kěnéng CLAUSE",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "你有没有去问问小王？估计/可能他应该有办法。",
        "romanization": "nǐ yǒu méiyǒu qù wèn wèn xiǎo wáng？ gūjì/ kěnéng tā yīnggāi yǒubànfǎ。",
        "translation": "Have you asked Xiao Wang? Perhaps he should have a solution."
      }
    ]
  },
  {
    "id": "zh_估计可能V_257",
    "language": "zh",
    "pattern": "估计/可能 V",
    "title": "估计/可能 V (perhaps V)",
    "shortExplanation": "perhaps V",
    "longExplanation": "perhaps V. Pinyin: gūjì/ kěnéng V",
    "formation": "gūjì/ kěnéng V",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "我还不习惯北方的气候，估计/可能是天气太干。",
        "romanization": "wǒ hái bù xíguàn běifāng de qìhòu， gūjì/ kěnéng shì tiānqì tài gàn。",
        "translation": "I am not used to the climate in the north. Perhaps it’s because the weather is too dry."
      }
    ]
  },
  {
    "id": "zh_可能的N_258",
    "language": "zh",
    "pattern": "可能的 N",
    "title": "可能的 N (probable)",
    "shortExplanation": "probable",
    "longExplanation": "probable. Pinyin: kěnéng de N",
    "formation": "kěnéng de N",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "他这么多天没来上课，最可能的原因就是他回国了。",
        "romanization": "tā zhème duō tiān méi lái shàngkè， zuì kěnéng de yuányīn jiùshì tā huíguó le。",
        "translation": "He did not come to class for so many days. The most probable reason is that he returned to China."
      }
    ]
  },
  {
    "id": "zh_来不及_259",
    "language": "zh",
    "pattern": "来不及",
    "title": "来不及 (be too late)",
    "shortExplanation": "be too late",
    "longExplanation": "be too late. Pinyin: láibují",
    "formation": "láibují",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "等你身体出现问题了，后悔就来不及了。",
        "romanization": "děng nǐ shēntǐ chūxiàn wèntí le， hòuhuǐ jiù láibují le。",
        "translation": "When you have a problem with your health, it’ll be too late to regret it."
      }
    ]
  },
  {
    "id": "zh_VVO_260",
    "language": "zh",
    "pattern": "V + V + O",
    "title": "V + V + O (VO for a bit (reduplication))",
    "shortExplanation": "VO for a bit (reduplication)",
    "longExplanation": "VO for a bit (reduplication). Pinyin: V + V + O",
    "formation": "V + V + O",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "咱们午饭后就去附近的公园散散步吧。",
        "romanization": "zánmen wǔfàn hòu jiù qù fùjìn de gōngyuán sànsànbù ba。",
        "translation": "Let's go for a walk in the nearby park after lunch."
      }
    ]
  },
  {
    "id": "zh_V了VO_261",
    "language": "zh",
    "pattern": "V + 了 + V + O",
    "title": "V + 了 + V + O (V’ed O for a bit (reduplication))",
    "shortExplanation": "V’ed O for a bit (reduplication)",
    "longExplanation": "V’ed O for a bit (reduplication). Pinyin: V + le + V + O",
    "formation": "V + le + V + O",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "星期天我睡了睡觉，游了游泳，做了做作业。",
        "romanization": "Xīngqītiān wǒ shuì le shuìjiào， yóu le yóuyǒng， zuò le zuò zuòyè。",
        "translation": "On Sunday, I slept a bit, did some swimming, [and] did some homework."
      }
    ]
  },
  {
    "id": "zh_要是_262",
    "language": "zh",
    "pattern": "要是",
    "title": "要是 (if)",
    "shortExplanation": "if",
    "longExplanation": "if. Pinyin: yàoshi",
    "formation": "yàoshi",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "要是质量好的话，那么价格贵一点儿也没关系。",
        "romanization": "yàoshi zhìliàng hǎo dehuà， nàme jiàgé guì yīdiǎnr yě méiguānxi。",
        "translation": "If the quality is good, then it doesn't matter if the price is a little bit expensive."
      }
    ]
  },
  {
    "id": "zh_既又也还_263",
    "language": "zh",
    "pattern": "既..... 又/也/还……",
    "title": "既..... 又/也/还…… (not only… but also…)",
    "shortExplanation": "not only… but also…",
    "longExplanation": "not only… but also…. Pinyin: jì..... yòu/ yě/ hái……",
    "formation": "jì..... yòu/ yě/ hái……",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "散步既可以活动身体，又可以减肥。",
        "romanization": "sànbù jì kěyǐ huódòng shēntǐ， yòu kěyǐ jiǎnféi。",
        "translation": "Walking can [allow you to] both move the body and lose weight."
      }
    ]
  },
  {
    "id": "zh_使OAV_264",
    "language": "zh",
    "pattern": "使 O A/V",
    "title": "使 O A/V (make O A/V)",
    "shortExplanation": "make O A/V",
    "longExplanation": "make O A/V. Pinyin: shǐ O A/V",
    "formation": "shǐ O A/V",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "怎么样才能使她喜欢我呢？",
        "romanization": "zěnmeyàng cáinéng shǐ tā xǐhuan wǒ ne？",
        "translation": "How can I make her like me?"
      }
    ]
  },
  {
    "id": "zh_只要就_265",
    "language": "zh",
    "pattern": "只要……(就)……",
    "title": "只要……(就)…… (as long as… (then)…)",
    "shortExplanation": "as long as… (then)…",
    "longExplanation": "as long as… (then)…. Pinyin: zhǐyào……( jiù)……",
    "formation": "zhǐyào……( jiù)……",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "只要这次你好好儿准备，(就) 一定能把比赛踢好。",
        "romanization": "zhǐyào zhè cì nǐhǎo hǎo r zhǔnbèi，( jiù) yīdìng néng bǎ bǐsài tī hǎo。",
        "translation": "As long as you are ready this time, you will be able to play the match well."
      }
    ]
  },
  {
    "id": "zh_可不是_266",
    "language": "zh",
    "pattern": "可不是！",
    "title": "可不是！ (No kidding!)",
    "shortExplanation": "No kidding!",
    "longExplanation": "No kidding!. Pinyin: kěbushì！",
    "formation": "kěbushì！",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "A: 没想到咱们毕业都已经十年了。B: 可不是！时间过得太快了， 真想大家。",
        "romanization": "A: méixiǎngdào zánmen bìyè dōu yǐjīng shí nián le。B: kěbushì！ shíjiān guòdé tài kuài le， zhēn xiǎng dàjiā。",
        "translation": "A: I didn't expect that we have graduated for ten years."
      }
    ]
  },
  {
    "id": "zh_因此_268",
    "language": "zh",
    "pattern": "因此",
    "title": "因此 (therefore)",
    "shortExplanation": "therefore",
    "longExplanation": "therefore. Pinyin: yīncǐ",
    "formation": "yīncǐ",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "我认识他很多年，因此，很了解他的性格。",
        "romanization": "wǒ rènshi tā hěn duō nián， yīncǐ， hěn liǎojiě tā de xìnggé。",
        "translation": "I have known him for many years, so I know his character very well."
      }
    ]
  },
  {
    "id": "zh_往往_269",
    "language": "zh",
    "pattern": "往往",
    "title": "往往 (usually, often)",
    "shortExplanation": "usually, often",
    "longExplanation": "usually, often. Pinyin: wǎngwǎng",
    "formation": "wǎngwǎng",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "女孩子对衣服颜色的选择往往与她们的性格有关。",
        "romanization": "nǚháizi duì yīfu yánsè de xuǎnzé wǎngwǎng yǔ tāmen de xìnggé yǒuguān。",
        "translation": "Girls' choice of clothing color is often related to their personality."
      }
    ]
  },
  {
    "id": "zh_经常常_270",
    "language": "zh",
    "pattern": "经常/常",
    "title": "经常/常 (often)",
    "shortExplanation": "often",
    "longExplanation": "often. Pinyin: jīngcháng/ cháng",
    "formation": "jīngcháng/ cháng",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "上大学时我很喜欢运动，经常/常打篮球、踢足球。",
        "romanization": "shàng dàxué shí wǒ hěn xǐhuan yùndòng， jīngcháng/ cháng dǎ lánqiú、 tī zúqiú。",
        "translation": "When I was in college, I liked sports very much. I often played basketball and football."
      }
    ]
  },
  {
    "id": "zh_难道_271",
    "language": "zh",
    "pattern": "难道",
    "title": "难道 (could it be that)",
    "shortExplanation": "could it be that",
    "longExplanation": "could it be that. Pinyin: nándào",
    "formation": "nándào",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "怎么又买了这么多饼干和巧克力？难道你不减肥了？",
        "romanization": "zěnme yòu mǎi le zhème duō bǐnggān hé qiǎokèlì？ nándào nǐ bù jiǎnféi le？",
        "translation": "How did you buy so many cookies and chocolates? Could it be that you’re not dieting any more?"
      }
    ]
  },
  {
    "id": "zh_通过_272",
    "language": "zh",
    "pattern": "通过",
    "title": "通过 (through)",
    "shortExplanation": "through",
    "longExplanation": "through. Pinyin: tōngguò",
    "formation": "tōngguò",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "任何成功都要通过努力才能得到。",
        "romanization": "rènhé chénggōng dōu yào tōngguò nǔlì cáinéng dédào。",
        "translation": "Any success must be achieved through hard work."
      }
    ]
  },
  {
    "id": "zh_经过_273",
    "language": "zh",
    "pattern": "经过",
    "title": "经过 (after having gone through)",
    "shortExplanation": "after having gone through",
    "longExplanation": "after having gone through. Pinyin: jīngguò",
    "formation": "jīngguò",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "经过一次次失败之后，他终于成功了。",
        "romanization": "jīngguò yīcì cì shībài zhīhòu， tā zhōngyú chénggōng le。",
        "translation": "Having gone through many failures, he finally succeeded."
      }
    ]
  },
  {
    "id": "zh_通过_274",
    "language": "zh",
    "pattern": "通过",
    "title": "通过 (pass through)",
    "shortExplanation": "pass through",
    "longExplanation": "pass through. Pinyin: tōngguò",
    "formation": "tōngguò",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "这条街只能步行通过。",
        "romanization": "zhè tiáo jiē zhǐnéng bùxíng tōngguò。",
        "translation": "You can only go through this street on foot."
      }
    ]
  },
  {
    "id": "zh_经过_275",
    "language": "zh",
    "pattern": "经过",
    "title": "经过 (pass by)",
    "shortExplanation": "pass by",
    "longExplanation": "pass by. Pinyin: jīngguò",
    "formation": "jīngguò",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "我正好经过这儿，顺便过来看看你。",
        "romanization": "wǒ zhènghǎo jīngguò zhèr， shùnbiàn guòlái kànkan nǐ。",
        "translation": "It just so happened that I’m passing by, [so I] came to see you on the way."
      }
    ]
  },
  {
    "id": "zh_通过_276",
    "language": "zh",
    "pattern": "通过",
    "title": "通过 (to pass (an exam, interview or resolution))",
    "shortExplanation": "to pass (an exam, interview or resolution)",
    "longExplanation": "to pass (an exam, interview or resolution). Pinyin: tōngguò",
    "formation": "tōngguò",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "我通过那家公司的面试了。",
        "romanization": "wǒ tōngguò nà jiā gōngsī de miànshì le。",
        "translation": "I passed the interview with that company."
      }
    ]
  },
  {
    "id": "zh_经过_277",
    "language": "zh",
    "pattern": "经过",
    "title": "经过 (the whole story)",
    "shortExplanation": "the whole story",
    "longExplanation": "the whole story. Pinyin: jīngguò",
    "formation": "jīngguò",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "小王把事情的经过告诉我了。",
        "romanization": "xiǎo wáng bǎ shìqing de jīngguò gàosu wǒ le。",
        "translation": "Xiao Wang told me the whole story of [how] the event [happened]."
      }
    ]
  },
  {
    "id": "zh_可是_278",
    "language": "zh",
    "pattern": "可是",
    "title": "可是 (but)",
    "shortExplanation": "but",
    "longExplanation": "but. Pinyin: kěshì",
    "formation": "kěshì",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "当时她的父母和亲戚都不支持她，可是她坚持自己的选择。",
        "romanization": "dāngshí tā de fùmǔ hé qīnqi dōu bù zhīchí tā， kěshì tā jiānchí zìjǐ de xuǎnzé。",
        "translation": "At that time her parents and relatives did not support her, but she insisted on her choice."
      }
    ]
  },
  {
    "id": "zh_结果_279",
    "language": "zh",
    "pattern": "结果",
    "title": "结果 (result)",
    "shortExplanation": "result",
    "longExplanation": "result. Pinyin: jiéguǒ",
    "formation": "jiéguǒ",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "请把调查结果交上来。",
        "romanization": "qǐng bǎ diàochájiéguǒ jiāo shànglái。",
        "translation": "Please submit the results of the investigation."
      }
    ]
  },
  {
    "id": "zh_结果_280",
    "language": "zh",
    "pattern": "结果……",
    "title": "结果…… (As a result, …)",
    "shortExplanation": "As a result, …",
    "longExplanation": "As a result, …. Pinyin: jiéguǒ……",
    "formation": "jiéguǒ……",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "上学期他学习很用功，结果考试及格了。",
        "romanization": "shàng xuéqī tā xuéxí hěn yònggōng， jiéguǒ kǎoshì jígé le。",
        "translation": "He studied hard last term and, as a result, he passed the examination."
      }
    ]
  },
  {
    "id": "zh_上_281",
    "language": "zh",
    "pattern": "上 #",
    "title": "上 # (over #)",
    "shortExplanation": "over #",
    "longExplanation": "over #. Pinyin: shàng #",
    "formation": "shàng #",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "这个城市的地铁已经有上百年的历史了。",
        "romanization": "zhège chéngshì de dìtiě yǐjīng yǒu shàng bǎinián de lìshǐ le。",
        "translation": "The city's subway has been around for over a hundred years."
      }
    ]
  },
  {
    "id": "zh_不过_282",
    "language": "zh",
    "pattern": "不过",
    "title": "不过 (nevertheless)",
    "shortExplanation": "nevertheless",
    "longExplanation": "nevertheless. Pinyin: bùguò",
    "formation": "bùguò",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "我本来想当律师，不过后来我发现自己对新闻更感兴趣。",
        "romanization": "wǒ běnlái xiǎng dāng lǜshī， bùguò hòulái wǒ fāxiàn zìjǐ duì xīnwén gèng gǎnxìngqù。",
        "translation": "I originally wanted to be a lawyer, nevertheless I found myself more interested in news."
      }
    ]
  },
  {
    "id": "zh_不过V_283",
    "language": "zh",
    "pattern": "不过 V",
    "title": "不过 V (only V)",
    "shortExplanation": "only V",
    "longExplanation": "only V. Pinyin: bùguò V",
    "formation": "bùguò V",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "我们不过谈了点儿工作方面的问题，别的都没谈。",
        "romanization": "wǒmen bùguò tán le diǎnr gōngzuò fāngmiàn de wèntí， biéde dōu méi tán。",
        "translation": "We only talked about some work problems (and nothing more), and we didn’t talk about anything else."
      }
    ]
  },
  {
    "id": "zh_确实_284",
    "language": "zh",
    "pattern": "确实",
    "title": "确实 (indeed)",
    "shortExplanation": "indeed",
    "longExplanation": "indeed. Pinyin: quèshí",
    "formation": "quèshí",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "爱情确实是结婚的重要原因，但仅有爱情是不够的。",
        "romanization": "àiqíng quèshí shì jiéhūn de zhòngyào yuányīn， dàn jǐn yǒu àiqíng shì bùgòu de。",
        "translation": "Love is indeed an important reason for marriage, but only love is not enough."
      }
    ]
  },
  {
    "id": "zh_在S看来_285",
    "language": "zh",
    "pattern": "在 S 看来",
    "title": "在 S 看来 (the way S see it)",
    "shortExplanation": "the way S see it",
    "longExplanation": "the way S see it. Pinyin: zài S kànlai",
    "formation": "zài S kànlai",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "在很多人看来，听流行音乐仅仅是年轻人的爱好。",
        "romanization": "zài hěn duō rén kànlai， tīng liúxíngyīnyuè jǐnjǐn shì niánqīngrén de àihào。",
        "translation": "The way a lot of people sees it [is that] listening to pop music is only a hobby of young people."
      }
    ]
  },
  {
    "id": "zh_由于_286",
    "language": "zh",
    "pattern": "由于……",
    "title": "由于…… (because …)",
    "shortExplanation": "because …",
    "longExplanation": "because …. Pinyin: yóuyú……",
    "formation": "yóuyú……",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "由于我们的共同努力，任务提前完成了。",
        "romanization": "yóuyú wǒmen de gòngtóngnǔlì， rènwu tíqián wánchéng le。",
        "translation": "Owing to our joint efforts, the task was fulfilled ahead of schedule."
      }
    ]
  },
  {
    "id": "zh_由于N_287",
    "language": "zh",
    "pattern": "由于 N",
    "title": "由于 N (due to N)",
    "shortExplanation": "due to N",
    "longExplanation": "due to N. Pinyin: yóuyú N",
    "formation": "yóuyú N",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "由于种种原因，我们不得不改变原来的计划。",
        "romanization": "yóuyú zhǒngzhǒng yuányīn， wǒmen bùdébù gǎibiàn yuánlái de jìhuà。",
        "translation": "For various reasons, we had to change the original plan."
      }
    ]
  },
  {
    "id": "zh_比如_288",
    "language": "zh",
    "pattern": "比如……",
    "title": "比如…… (for example, ……)",
    "shortExplanation": "for example, ……",
    "longExplanation": "for example, ……. Pinyin: bǐrú……",
    "formation": "bǐrú……",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "旅游前最好做个计划，比如要去几个地方，怎么坐车等。",
        "romanization": "lǚyóu qián zuìhǎo zuò gè jìhuà， bǐrú yào qù jǐge dìfang， zěnme zuòchē děng。",
        "translation": "It is best to make a plan before the trip, for example, how many places to go to, how to take transit, etc."
      }
    ]
  },
  {
    "id": "zh_连O也都V_289",
    "language": "zh",
    "pattern": "连 O 也/都 V",
    "title": "连 O 也/都 V (even V O)",
    "shortExplanation": "even V O",
    "longExplanation": "even V O. Pinyin: lián O yě/ dōu V",
    "formation": "lián O yě/ dōu V",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "你太厉害了，连中文报纸都看得懂。",
        "romanization": "nǐ tài lìhai le， lián Zhōngwén bàozhǐ dōu kàn dé dǒng。",
        "translation": "You are so awesome/skilled you can even understand Chinese newspapers."
      }
    ]
  },
  {
    "id": "zh_连S也都V_290",
    "language": "zh",
    "pattern": "连 S 也/都 V",
    "title": "连 S 也/都 V (even S V)",
    "shortExplanation": "even S V",
    "longExplanation": "even S V. Pinyin: lián S yě/ dōu V",
    "formation": "lián S yě/ dōu V",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "如果连你自己都不喜欢自己，又怎么能让别人喜欢你呢？",
        "romanization": "rúguǒ lián nǐ zìjǐ dōu bù xǐhuan zìjǐ， yòu zěnme néng ràng biéren xǐhuan nǐ ne？",
        "translation": "If even you don’t like yourself, how can you let others like you?"
      }
    ]
  },
  {
    "id": "zh_否则_291",
    "language": "zh",
    "pattern": "否则",
    "title": "否则 (if not, otherwise)",
    "shortExplanation": "if not, otherwise",
    "longExplanation": "if not, otherwise. Pinyin: fǒuzé",
    "formation": "fǒuzé",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "他一定有重要的事找你，否则不会打这么多次电话来。",
        "romanization": "tā yīdìng yǒu zhòngyào de shì zhǎo nǐ， fǒuzé bùhuì dǎ zhème duōcì diànhuà lái。",
        "translation": "He must have something important to see (lit. look for) you about, otherwise he won't call so many times."
      }
    ]
  },
  {
    "id": "zh_无论不管Q都_292",
    "language": "zh",
    "pattern": "无论/不管 Q 都",
    "title": "无论/不管 Q 都 (regardless of Q)",
    "shortExplanation": "regardless of Q",
    "longExplanation": "regardless of Q. Pinyin: wúlùn/ bùguǎn Q dōu",
    "formation": "wúlùn/ bùguǎn Q dōu",
    "level": "HSK 4",
    "examples": []
  },
  {
    "id": "zh_然而_294",
    "language": "zh",
    "pattern": "然而",
    "title": "然而 (but)",
    "shortExplanation": "but",
    "longExplanation": "but. Pinyin: rán'ér",
    "formation": "rán'ér",
    "level": "HSK 4",
    "examples": []
  },
  {
    "id": "zh_同时_298",
    "language": "zh",
    "pattern": "同时……",
    "title": "同时…… (at the same time, …)",
    "shortExplanation": "at the same time, …",
    "longExplanation": "at the same time, …. Pinyin: tóngshí……",
    "formation": "tóngshí……",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "阅读能丰富你的知识，同时还会丰富你的情感。",
        "romanization": "yuèdú néng fēngfù nǐ de zhīshi， tóngshí hái huì fēngfù nǐ de qínggǎn。",
        "translation": "Reading can enrich your knowledge and (at the same time) [it will] enrich your affects."
      }
    ]
  },
  {
    "id": "zh_的同时_299",
    "language": "zh",
    "pattern": "……的同时",
    "title": "……的同时 (at the same time when…)",
    "shortExplanation": "at the same time when…",
    "longExplanation": "at the same time when…. Pinyin: …… de tóngshí",
    "formation": "…… de tóngshí",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "在学习汉语的同时，我还了解了中国的文化。",
        "romanization": "zài xuéxí Hànyǔ de tóngshí， wǒ hái liǎojiě le Zhōngguó de wénhuà。",
        "translation": "While learning Chinese (at the same time), I also learned about Chinese culture."
      }
    ]
  },
  {
    "id": "zh_并并且V_300",
    "language": "zh",
    "pattern": "并/并且 V",
    "title": "并/并且 V (and V)",
    "shortExplanation": "and V",
    "longExplanation": "and V. Pinyin: bìng/ bìngqiě V",
    "formation": "bìng/ bìngqiě V",
    "level": "HSK 4",
    "examples": []
  },
  {
    "id": "zh_再也_303",
    "language": "zh",
    "pattern": "再……也......",
    "title": "再……也...... (no matter how… still…)",
    "shortExplanation": "no matter how… still…",
    "longExplanation": "no matter how… still…. Pinyin: zài…… yě......",
    "formation": "zài…… yě......",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "事情已经发生了，你再后悔也无法改变，别伤心了。",
        "romanization": "shìqing yǐjīng fāshēng le， nǐ zài hòuhuǐ yě wúfǎ gǎibiàn， bié shāngxīn le。",
        "translation": "Things have already happened, no matter how you regret it you (still) won’t be able to change it, don't be sad."
      }
    ]
  },
  {
    "id": "zh_对于N_304",
    "language": "zh",
    "pattern": "对于 N",
    "title": "对于 N (regarding N)",
    "shortExplanation": "regarding N",
    "longExplanation": "regarding N. Pinyin: duìyú N",
    "formation": "duìyú N",
    "level": "HSK 4",
    "examples": []
  },
  {
    "id": "zh_关于N_307",
    "language": "zh",
    "pattern": "关于 N",
    "title": "关于 N (about N)",
    "shortExplanation": "about N",
    "longExplanation": "about N. Pinyin: guānyú N",
    "formation": "guānyú N",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "关于这次调查计划，经理说有很多不清楚的地方。",
        "romanization": "guānyú zhè cì diàochá jìhuà， jīnglǐ shuō yǒu hěn duō bùqīngchu de dìfang。",
        "translation": "About the survey plan, the manager said that there are many unclear places."
      }
    ]
  },
  {
    "id": "zh_MMN都_308",
    "language": "zh",
    "pattern": "M + M + (N) + 都",
    "title": "M + M + (N) + 都 (every N)",
    "shortExplanation": "every N",
    "longExplanation": "every N. Pinyin: M + M + (N) + dōu",
    "formation": "M + M + (N) + dōu",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "件件小事都应该被看成是一次学习的机会。",
        "romanization": "jiàn jiàn xiǎoshì dōu yīnggāi bèi kànchéng shì yīcì xuéxí de jīhuì。",
        "translation": "Each small thing should (all) be seen as an opportunity to learn."
      }
    ]
  },
  {
    "id": "zh_相反_309",
    "language": "zh",
    "pattern": "相反，……",
    "title": "相反，…… (on the other hand, …)",
    "shortExplanation": "on the other hand, …",
    "longExplanation": "on the other hand, …. Pinyin: xiāngfǎn，……",
    "formation": "xiāngfǎn，……",
    "level": "HSK 4",
    "examples": []
  },
  {
    "id": "zh_和跟N相反_314",
    "language": "zh",
    "pattern": "和/跟 N 相反",
    "title": "和/跟 N 相反 (to be the opposite of N)",
    "shortExplanation": "to be the opposite of N",
    "longExplanation": "to be the opposite of N. Pinyin: hé/ gēn N xiāngfǎn",
    "formation": "hé/ gēn N xiāngfǎn",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "调查结果和他们想的几乎完全相反。",
        "romanization": "diàochájiéguǒ hé tāmen xiǎng de jīhūwánquán xiāngfǎn。",
        "translation": "The results of the survey are almost completely the opposite of what they thought."
      }
    ]
  },
  {
    "id": "zh_大概也许VA_315",
    "language": "zh",
    "pattern": "大概/也许 V/A",
    "title": "大概/也许 V/A (probably/perhaps V/A)",
    "shortExplanation": "probably/perhaps V/A",
    "longExplanation": "probably/perhaps V/A. Pinyin: dàgài/ yěxǔ V/A",
    "formation": "dàgài/ yěxǔ V/A",
    "level": "HSK 4",
    "examples": []
  },
  {
    "id": "zh_大概的N_317",
    "language": "zh",
    "pattern": "大概的 N",
    "title": "大概的 N (approximate N)",
    "shortExplanation": "approximate N",
    "longExplanation": "approximate N. Pinyin: dàgài de N",
    "formation": "dàgài de N",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "请给我一个大概的数字。",
        "romanization": "qǐng gěi wǒ yī gè dàgài de shùzì。",
        "translation": "Please give me an approximate number."
      }
    ]
  },
  {
    "id": "zh_大概_318",
    "language": "zh",
    "pattern": "大概 #",
    "title": "大概 # (about #)",
    "shortExplanation": "about #",
    "longExplanation": "about #. Pinyin: dàgài #",
    "formation": "dàgài #",
    "level": "HSK 4",
    "examples": []
  },
  {
    "id": "zh_偶尔_320",
    "language": "zh",
    "pattern": "偶尔",
    "title": "偶尔 (occasionally)",
    "shortExplanation": "occasionally",
    "longExplanation": "occasionally. Pinyin: ǒu'ěr",
    "formation": "ǒu'ěr",
    "level": "HSK 4",
    "examples": []
  },
  {
    "id": "zh_由SV_322",
    "language": "zh",
    "pattern": "由 S V",
    "title": "由 S V (V’ed by S)",
    "shortExplanation": "V’ed by S",
    "longExplanation": "V’ed by S. Pinyin: yóu S V",
    "formation": "yóu S V",
    "level": "HSK 4",
    "examples": []
  },
  {
    "id": "zh_进行_324",
    "language": "zh",
    "pattern": "进行",
    "title": "进行 (to proceed)",
    "shortExplanation": "to proceed",
    "longExplanation": "to proceed. Pinyin: jìnxíng",
    "formation": "jìnxíng",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "10点30分会议继续进行。",
        "romanization": "10 diǎn30 fēn huìyì jìxù jìnxíng。",
        "translation": "The meeting will continue to proceed at half past 10."
      }
    ]
  },
  {
    "id": "zh_进行O_325",
    "language": "zh",
    "pattern": "进行 O",
    "title": "进行 O (to carry out O)",
    "shortExplanation": "to carry out O",
    "longExplanation": "to carry out O. Pinyin: jìnxíng O",
    "formation": "jìnxíng O",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "进行观察",
        "romanization": "jìnxíng guānchá",
        "translation": "carry out an observation"
      }
    ]
  },
  {
    "id": "zh_随着N_326",
    "language": "zh",
    "pattern": "随着 N",
    "title": "随着 N (with N (as N happens))",
    "shortExplanation": "with N (as N happens)",
    "longExplanation": "with N (as N happens). Pinyin: suízhe N",
    "formation": "suízhe N",
    "level": "HSK 4",
    "examples": []
  },
  {
    "id": "zh_够_328",
    "language": "zh",
    "pattern": "够",
    "title": "够 (sufficient)",
    "shortExplanation": "sufficient",
    "longExplanation": "sufficient. Pinyin: gòu",
    "formation": "gòu",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "钱不够。",
        "romanization": "qián bùgòu。",
        "translation": "The money is not enough."
      }
    ]
  },
  {
    "id": "zh_V够_329",
    "language": "zh",
    "pattern": "V 够 (#)",
    "title": "V 够 (#) (V (and fulfill) #)",
    "shortExplanation": "V (and fulfill) #",
    "longExplanation": "V (and fulfill) #. Pinyin: V gòu (#)",
    "formation": "V gòu (#)",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "睡觉时间太长并不好，一般睡够八小时就可以了。",
        "romanization": "shuìjiào shíjiān tài cháng bìngbù hǎo， yībān shuì gòu bā xiǎoshí jiù kěyǐ le。",
        "translation": "It’s not good if [your] sleeping time is too long. Usually it’s enough just to sleep for a good eight hours (lit. sleep to fulfill 8 hours)."
      }
    ]
  },
  {
    "id": "zh_够A_330",
    "language": "zh",
    "pattern": "够 A",
    "title": "够 A ((good) enough)",
    "shortExplanation": "(good) enough",
    "longExplanation": "(good) enough. Pinyin: gòu A",
    "formation": "gòu A",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "不用装这些，箱子已经够重的了！",
        "romanization": "bùyòng zhuāng zhèxiē， xiāngzi yǐjīng gòu zhòng de le！",
        "translation": "No need to load these, the box is already heavy enough!"
      }
    ]
  },
  {
    "id": "zh_以N_331",
    "language": "zh",
    "pattern": "以 N",
    "title": "以 N (with N (speed, standard))",
    "shortExplanation": "with N (speed, standard)",
    "longExplanation": "with N (speed, standard). Pinyin: yǐ N",
    "formation": "yǐ N",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "经理您放心，我一定以最快的速度完成。",
        "romanization": "jīnglǐ nín fàngxīn， wǒ yīdìng yǐ zuì kuài de sùdù wánchéng。",
        "translation": "Manager, you can rest assured that I will finish at the fastest speed."
      }
    ]
  },
  {
    "id": "zh_以N1为N2_332",
    "language": "zh",
    "pattern": "以 N1 为 N2",
    "title": "以 N1 为 N2 (consider N1 as N2)",
    "shortExplanation": "consider N1 as N2",
    "longExplanation": "consider N1 as N2. Pinyin: yǐ N1 wéi N2",
    "formation": "yǐ N1 wéi N2",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "我们应该以历史为镜子。",
        "romanization": "wǒmen yīnggāi yǐ lìshǐ wéi jìngzi。",
        "translation": "We should use history as a mirror."
      }
    ]
  },
  {
    "id": "zh_以_333",
    "language": "zh",
    "pattern": "以",
    "title": "以 (in order to)",
    "shortExplanation": "in order to",
    "longExplanation": "in order to. Pinyin: yǐ",
    "formation": "yǐ",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "她送来了一份礼物以表示感谢。",
        "romanization": "tā sòng lái le yī fèn lǐwù yǐ biǎoshì gǎnxiè。",
        "translation": "She sent a gift to express her gratitude."
      }
    ]
  },
  {
    "id": "zh_既然_334",
    "language": "zh",
    "pattern": "既然",
    "title": "既然 (now that)",
    "shortExplanation": "now that",
    "longExplanation": "now that. Pinyin: jìrán",
    "formation": "jìrán",
    "level": "HSK 4",
    "examples": []
  },
  {
    "id": "zh_于是_336",
    "language": "zh",
    "pattern": "于是……",
    "title": "于是…… (consequently…)",
    "shortExplanation": "consequently…",
    "longExplanation": "consequently…. Pinyin: yúshì……",
    "formation": "yúshì……",
    "level": "HSK 4",
    "examples": []
  },
  {
    "id": "zh_因此_338",
    "language": "zh",
    "pattern": "因此……",
    "title": "因此…… (therefore…)",
    "shortExplanation": "therefore…",
    "longExplanation": "therefore…. Pinyin: yīncǐ……",
    "formation": "yīncǐ……",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "小时候，他经常生病，因此每天都去跑步锻炼身体。",
        "romanization": "xiǎoshíhou， tā jīngcháng shēngbìng， yīncǐ měitiān dōu qù pǎobù duànliàn shēntǐ。",
        "translation": "When he was a child, he was often ill, [and] as a result he went to run and exercise every day."
      }
    ]
  },
  {
    "id": "zh_什么的_339",
    "language": "zh",
    "pattern": "什么的",
    "title": "什么的 (and stuff like that)",
    "shortExplanation": "and stuff like that",
    "longExplanation": "and stuff like that. Pinyin: shénmede",
    "formation": "shénmede",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "明天出去玩儿，得买点儿饼干、面包什么的。",
        "romanization": "míngtiān chūqù wánr， dé mǎi diǎnr bǐnggān、 miànbāo shénmede。",
        "translation": "Go out to play tomorrow, you have to buy some biscuits, bread or things like that."
      }
    ]
  },
  {
    "id": "zh_V起来_340",
    "language": "zh",
    "pattern": "V 起来",
    "title": "V 起来 (V up)",
    "shortExplanation": "V up",
    "longExplanation": "V up. Pinyin: V qilai",
    "formation": "V qilai",
    "level": "HSK 4",
    "examples": []
  },
  {
    "id": "zh_想起来_342",
    "language": "zh",
    "pattern": "想起来",
    "title": "想起来 (remember, call to mind)",
    "shortExplanation": "remember, call to mind",
    "longExplanation": "remember, call to mind. Pinyin: xiǎngqilai",
    "formation": "xiǎngqilai",
    "level": "HSK 4",
    "examples": []
  },
  {
    "id": "zh_弄AO_344",
    "language": "zh",
    "pattern": "弄 A O",
    "title": "弄 A O (cause O to be A)",
    "shortExplanation": "cause O to be A",
    "longExplanation": "cause O to be A. Pinyin: nòng A O",
    "formation": "nòng A O",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "搬的时候要小心点儿，别弄坏沙发了。",
        "romanization": "bān de shíhou yào xiǎoxīn diǎnr， bié nònghuài shāfā le。",
        "translation": "Be careful when moving, don't break the sofa."
      }
    ]
  },
  {
    "id": "zh_弄得OCLAUSE_345",
    "language": "zh",
    "pattern": "弄得 O CLAUSE",
    "title": "弄得 O CLAUSE (make O CLAUSE)",
    "shortExplanation": "make O CLAUSE",
    "longExplanation": "make O CLAUSE. Pinyin: nòng dé O CLAUSE",
    "formation": "nòng dé O CLAUSE",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "每天因为这些小事批评她，弄得我俩心情都不好。",
        "romanization": "měitiān yīnwèi zhèxiē xiǎoshì pīpíng tā， nòng dé wǒ liǎ xīnqíng dōu bùhǎo。",
        "translation": "Every day I tell her off for these small things, [which] makes the two of us both in a bad mood."
      }
    ]
  },
  {
    "id": "zh_千万不能不要别V_346",
    "language": "zh",
    "pattern": "千万不能/不要/别 V",
    "title": "千万不能/不要/别 V (make sure not to V)",
    "shortExplanation": "make sure not to V",
    "longExplanation": "make sure not to V. Pinyin: qiānwàn bùnéng/ bùyào/ bié V",
    "formation": "qiānwàn bùnéng/ bùyào/ bié V",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "我要等她生日那天再送给她这个礼物，你现在千万别告诉她。",
        "romanization": "wǒ yào děng tā shēngrì nàtiān zài sònggěi tā zhège lǐwù， nǐ xiànzài qiānwàn bié gàosu tā。",
        "translation": "I have to give her this gift on her birthday, make sure you don’t tell her now."
      }
    ]
  },
  {
    "id": "zh_一定要得VA_347",
    "language": "zh",
    "pattern": "一定要/得 V/A",
    "title": "一定要/得 V/A (must V, must be A)",
    "shortExplanation": "must V, must be A",
    "longExplanation": "must V, must be A. Pinyin: yīdìngyào/ dé V/A",
    "formation": "yīdìngyào/ dé V/A",
    "level": "HSK 4",
    "examples": []
  },
  {
    "id": "zh_一定会VA_350",
    "language": "zh",
    "pattern": "一定(会) V/A",
    "title": "一定(会) V/A (definitely V/A)",
    "shortExplanation": "definitely V/A",
    "longExplanation": "definitely V/A. Pinyin: yīdìng( huì) V/A",
    "formation": "yīdìng( huì) V/A",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "感谢您的支持和鼓励，我一定会继续努力。",
        "romanization": "gǎnxiè nín de zhīchí hé gǔlì， wǒ yīdìng huì jìxù nǔlì。",
        "translation": "Thank you for your support and encouragement, I will definitely continue to work hard."
      }
    ]
  },
  {
    "id": "zh_不一定_351",
    "language": "zh",
    "pattern": "不一定",
    "title": "不一定 (not necessarily)",
    "shortExplanation": "not necessarily",
    "longExplanation": "not necessarily. Pinyin: bùyīdìng",
    "formation": "bùyīdìng",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "个子高不一定力气大。",
        "romanization": "gèzi gāo bùyīdìng lìqi dà。",
        "translation": "If someone is tall he/she is not necessarily strong."
      }
    ]
  },
  {
    "id": "zh_一定的_352",
    "language": "zh",
    "pattern": "一定的",
    "title": "一定的 (some, a certain)",
    "shortExplanation": "some, a certain",
    "longExplanation": "some, a certain. Pinyin: yīdìng de",
    "formation": "yīdìng de",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "如果有一定的语言基础，那么出国学习外语是最好的选择。",
        "romanization": "rúguǒ yǒu yīdìng de yǔyán jīchǔ， nàme chūguó xuéxí wàiyǔ shì zuìhǎo de xuǎnzé。",
        "translation": "If you have a certain language foundation, then studying a foreign language abroad is the best choice."
      }
    ]
  },
  {
    "id": "zh_来V_353",
    "language": "zh",
    "pattern": "来 V",
    "title": "来 V ((verb prefix, indicating the verb hasn’t happened))",
    "shortExplanation": "(verb prefix, indicating the verb hasn’t happened)",
    "longExplanation": "(verb prefix, indicating the verb hasn’t happened). Pinyin: lái V",
    "formation": "lái V",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "这个沙发这么大，我来帮你们一起抬。",
        "romanization": "zhège shāfā zhème dà， wǒ lái bāng nǐmen yīqǐ tái。",
        "translation": "This sofa is so big, I will help you carry it together."
      }
    ]
  },
  {
    "id": "zh_通过用N来V_354",
    "language": "zh",
    "pattern": "通过/用 N 来 V",
    "title": "通过/用 N 来 V (V through N)",
    "shortExplanation": "V through N",
    "longExplanation": "V through N. Pinyin: tōngguò/ yòng N lái V",
    "formation": "tōngguò/ yòng N lái V",
    "level": "HSK 4",
    "examples": []
  },
  {
    "id": "zh_左右_356",
    "language": "zh",
    "pattern": "# 左右",
    "title": "# 左右 (around #)",
    "shortExplanation": "around #",
    "longExplanation": "around #. Pinyin: # zuǒyòu",
    "formation": "# zuǒyòu",
    "level": "HSK 4",
    "examples": []
  },
  {
    "id": "zh_可VA了_359",
    "language": "zh",
    "pattern": "可 V/A 了",
    "title": "可 V/A 了 (really A/V)",
    "shortExplanation": "really A/V",
    "longExplanation": "really A/V. Pinyin: kě V/A le",
    "formation": "kě V/A le",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "今天天气可热了。",
        "romanization": "jīntiān tiānqì kě rè le。",
        "translation": "The weather is really hot today."
      }
    ]
  },
  {
    "id": "zh_可Q_360",
    "language": "zh",
    "pattern": "可 Q",
    "title": "可 Q (Q on earth?)",
    "shortExplanation": "Q on earth?",
    "longExplanation": "Q on earth?. Pinyin: kě Q",
    "formation": "kě Q",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "下个星期就要去使馆办签证了，这可怎么办？",
        "romanization": "xiàgèxīngqī jiùyào qù shǐguǎn bàn qiānzhèng le， zhè kě zěnmebàn？",
        "translation": "I am going to the embassy to apply for a visa next week, what on earth am I supposed to do?"
      }
    ]
  },
  {
    "id": "zh_可V_361",
    "language": "zh",
    "pattern": "可 V",
    "title": "可 V (indeed)",
    "shortExplanation": "indeed",
    "longExplanation": "indeed. Pinyin: kě V",
    "formation": "kě V",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "这可是个大问题，我也不太清楚。",
        "romanization": "zhè kěshì gè dà wèntí， wǒ yě bù tài qīngchu。",
        "translation": "Now this (this indeed) is a big question, and I am not too sure about it."
      }
    ]
  },
  {
    "id": "zh_怕害怕_362",
    "language": "zh",
    "pattern": "怕/害怕",
    "title": "怕/害怕 (to be afraid)",
    "shortExplanation": "to be afraid",
    "longExplanation": "to be afraid. Pinyin: pà/ hàipà",
    "formation": "pà/ hàipà",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "我的工作经验还比较少，那份工作我怕/害怕完成不了。",
        "romanization": "wǒ de gōngzuò jīngyàn hái bǐjiào shǎo， nà fèn gōngzuò wǒ pà/ hàipà wánchéng bùliǎo。",
        "translation": "My work experience is still relatively small, I am afraid the job cannot be completed."
      }
    ]
  },
  {
    "id": "zh_恐怕_363",
    "language": "zh",
    "pattern": "恐怕……",
    "title": "恐怕…… (I guess I’m afraid…)",
    "shortExplanation": "I guess I’m afraid…",
    "longExplanation": "I guess I’m afraid…. Pinyin: kǒngpà……",
    "formation": "kǒngpà……",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "听完我的回答，恐怕你已经知道我的答案了吧。",
        "romanization": "tīng wán wǒ de huídá， kǒngpà nǐ yǐjīng zhīdào wǒ de dá'àn le ba。",
        "translation": "After listening to my response, I guess I’m afraid you already know the answer."
      }
    ]
  },
  {
    "id": "zh_怕恐怕V_364",
    "language": "zh",
    "pattern": "怕/恐怕 V",
    "title": "怕/恐怕 V (probably I’m afraid)",
    "shortExplanation": "probably I’m afraid",
    "longExplanation": "probably I’m afraid. Pinyin: pà/ kǒngpà V",
    "formation": "pà/ kǒngpà V",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "他离开这里怕/恐怕有二十天了。",
        "romanization": "tā líkāi zhèlǐ pà/ kǒngpà yǒu èrshí tiān le。",
        "translation": "He left here for probably 20 days (I’m afraid)."
      }
    ]
  },
  {
    "id": "zh_到底_365",
    "language": "zh",
    "pattern": "到底",
    "title": "到底 (to the end)",
    "shortExplanation": "to the end",
    "longExplanation": "to the end. Pinyin: dàodǐ",
    "formation": "dàodǐ",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "今天我一定陪你逛街逛到底，保证让你买到合适的衣服。",
        "romanization": "jīntiān wǒ yīdìng péi nǐ guàngjiē guàng dàodǐ， bǎozhèng ràng nǐ mǎi dào héshì de yīfu。",
        "translation": "Today I will go shopping with you to the end. [I can] guarantee that you will buy the right clothes."
      }
    ]
  },
  {
    "id": "zh_到底Q_366",
    "language": "zh",
    "pattern": "到底 Q",
    "title": "到底 Q (in the world)",
    "shortExplanation": "in the world",
    "longExplanation": "in the world. Pinyin: dàodǐ Q",
    "formation": "dàodǐ Q",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "到底你怎么打算的呀？",
        "romanization": "dàodǐ nǐ zěnme dǎsuàn de ya？",
        "translation": "What in the world are you planning?"
      }
    ]
  },
  {
    "id": "zh_拿来说_367",
    "language": "zh",
    "pattern": "拿……来说",
    "title": "拿……来说 (take… for example)",
    "shortExplanation": "take… for example",
    "longExplanation": "take… for example. Pinyin: ná…… láishuō",
    "formation": "ná…… láishuō",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "拿我来说，我已经学了十年汉语了。",
        "romanization": "ná wǒ láishuō， wǒ yǐjīng xué le shí nián Hànyǔ le。",
        "translation": "Take me, for example, I’ve been learning Chinese for 10 years."
      }
    ]
  },
  {
    "id": "zh_敢V_368",
    "language": "zh",
    "pattern": "敢 V",
    "title": "敢 V (to dare to V)",
    "shortExplanation": "to dare to V",
    "longExplanation": "to dare to V. Pinyin: gǎn V",
    "formation": "gǎn V",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "谁也不敢说他的坏话。",
        "romanization": "shéi yě bù gǎn shuō tā de huàihuà。",
        "translation": "No one dares to say bad things about her."
      }
    ]
  },
  {
    "id": "zh_倒_369",
    "language": "zh",
    "pattern": "倒",
    "title": "倒 (to pour)",
    "shortExplanation": "to pour",
    "longExplanation": "to pour. Pinyin: dǎo",
    "formation": "dǎo",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "我给你倒杯水吧。",
        "romanization": "wǒ gěi nǐ dǎo bēi shuǐ ba。",
        "translation": "I will pour you a glass of water."
      }
    ]
  },
  {
    "id": "zh_倒_370",
    "language": "zh",
    "pattern": "倒",
    "title": "倒 (to reverse)",
    "shortExplanation": "to reverse",
    "longExplanation": "to reverse. Pinyin: dǎo",
    "formation": "dǎo",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "“我爱你”，倒过来就是“你爱我”。",
        "romanization": "“ wǒ ài nǐ”， dǎo guòlái jiùshì“ nǐ ài wǒ”。",
        "translation": "“I love you” said in reverse is “you love me.”"
      }
    ]
  },
  {
    "id": "zh_S倒V_371",
    "language": "zh",
    "pattern": "S 倒 V",
    "title": "S 倒 V (although S V)",
    "shortExplanation": "although S V",
    "longExplanation": "although S V. Pinyin: S dǎo V",
    "formation": "S dǎo V",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "你说得倒是容易，做起来可就难了！",
        "romanization": "nǐ shuō dé dàoshi róngyì， zuò qilai kějiù nán le！",
        "translation": "Although you say [it as if] it is easy, it’s hard to do it!"
      }
    ]
  },
  {
    "id": "zh_干gn_372",
    "language": "zh",
    "pattern": "干 (gān)",
    "title": "干 (gān) (dry)",
    "shortExplanation": "dry",
    "longExplanation": "dry. Pinyin: gàn (gān)",
    "formation": "gàn (gān)",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "把头发擦干。",
        "romanization": "bǎ tóufa cāgān。",
        "translation": "Wipe your hair dry."
      }
    ]
  },
  {
    "id": "zh_干gn_373",
    "language": "zh",
    "pattern": "干 (gàn)",
    "title": "干 (gàn) (to do)",
    "shortExplanation": "to do",
    "longExplanation": "to do. Pinyin: gàn (gàn)",
    "formation": "gàn (gàn)",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "你在干什么呢？",
        "romanization": "nǐ zài gànshénme ne？",
        "translation": "What are you doing?"
      }
    ]
  },
  {
    "id": "zh_趟_374",
    "language": "zh",
    "pattern": "# 趟",
    "title": "# 趟 (# times (of trips))",
    "shortExplanation": "# times (of trips)",
    "longExplanation": "# times (of trips). Pinyin: # tàng",
    "formation": "# tàng",
    "level": "HSK 4",
    "examples": []
  },
  {
    "id": "zh_次_377",
    "language": "zh",
    "pattern": "# 次",
    "title": "# 次 (No. # (bus/train route))",
    "shortExplanation": "No. # (bus/train route)",
    "longExplanation": "No. # (bus/train route). Pinyin: # cì",
    "formation": "# cì",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "502次公交车很快就要到了。",
        "romanization": "502 cì gōngjiāochē hěn kuài jiùyào dàoliǎo。",
        "translation": "Bus No. 502 are coming soon."
      }
    ]
  },
  {
    "id": "zh_为了V1而V2_378",
    "language": "zh",
    "pattern": "为了 V1 而 V2",
    "title": "为了 V1 而 V2 (V2 in order to V1)",
    "shortExplanation": "V2 in order to V1",
    "longExplanation": "V2 in order to V1. Pinyin: wèile V1 ér V2",
    "formation": "wèile V1 ér V2",
    "level": "HSK 4",
    "examples": []
  },
  {
    "id": "zh_为了N而V_381",
    "language": "zh",
    "pattern": "为了 N 而 V",
    "title": "为了 N 而 V (V for N)",
    "shortExplanation": "V for N",
    "longExplanation": "V for N. Pinyin: wèile N ér V",
    "formation": "wèile N ér V",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "植物会为了阳光、空气和水而竞争。",
        "romanization": "zhíwù huì wèile yángguāng、 kōngqì hé shuǐ ér jìngzhēng。",
        "translation": "Plants compete for sunlight, air, and water."
      }
    ]
  },
  {
    "id": "zh_仍然VA_382",
    "language": "zh",
    "pattern": "仍然 V/A",
    "title": "仍然 V/A (still V/A)",
    "shortExplanation": "still V/A",
    "longExplanation": "still V/A. Pinyin: réngrán V/A",
    "formation": "réngrán V/A",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "就算在几公里深的海底也仍然能看到东西。",
        "romanization": "jiùsuàn zài jǐ gōnglǐ shēn de hǎidǐ yě réngrán néng kàn dào dōngxi。",
        "translation": "Even at a few kilometers deep on the sea floor, you can still see things."
      }
    ]
  },
  {
    "id": "zh_是否_383",
    "language": "zh",
    "pattern": "是否",
    "title": "是否 (if, whether)",
    "shortExplanation": "if, whether",
    "longExplanation": "if, whether. Pinyin: shìfǒu",
    "formation": "shìfǒu",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "不过她这么小，这本书我不知道她是否能读懂。",
        "romanization": "bùguò tā zhème xiǎo， zhè běn shū wǒ bù zhīdào tā shìfǒu néng dúdǒng。",
        "translation": "But she is so young, I don't know if she can read this book."
      }
    ]
  },
  {
    "id": "zh_受不了_384",
    "language": "zh",
    "pattern": "受不了",
    "title": "受不了 (tolerate)",
    "shortExplanation": "tolerate",
    "longExplanation": "tolerate. Pinyin: shòubùliǎo",
    "formation": "shòubùliǎo",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "我真的受不了你了，你到底还要逛多久？",
        "romanization": "wǒ zhēn de shòubùliǎo nǐ le， nǐ dàodǐ hái yào guàng duōjiǔ？",
        "translation": "I really can't tolerate you, how long do you have to keep shopping?"
      }
    ]
  },
  {
    "id": "zh_接着V_385",
    "language": "zh",
    "pattern": "接着 V",
    "title": "接着 V (continue to V)",
    "shortExplanation": "continue to V",
    "longExplanation": "continue to V. Pinyin: jiēzhe V",
    "formation": "jiēzhe V",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "你看完这本书以后先不要还，我接着看。",
        "romanization": "nǐ kàn wán zhè běn shū yǐhòu xiān bùyào hái， wǒ jiēzhe kàn。",
        "translation": "Don't pay back after reading this book, I will continue to watch."
      }
    ]
  },
  {
    "id": "zh_接着_386",
    "language": "zh",
    "pattern": "接着",
    "title": "接着 (then)",
    "shortExplanation": "then",
    "longExplanation": "then. Pinyin: jiēzhe",
    "formation": "jiēzhe",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "他毕业后在老家工作了一年，接着又考上了北京大学，读研究生。",
        "romanization": "tā bìyè hòu zài lǎojiā gōngzuò le yī nián， jiēzhe yòu kǎoshàng le Běijīng Dàxué， dú yánjiūshēng。",
        "translation": "After graduating, he worked in his hometown for a year. And then he was admitted to Peking University to study for graduate students."
      }
    ]
  },
  {
    "id": "zh_除此以外_387",
    "language": "zh",
    "pattern": "除此以外",
    "title": "除此以外 (other than that)",
    "shortExplanation": "other than that",
    "longExplanation": "other than that. Pinyin: chú cǐ yǐwài",
    "formation": "chú cǐ yǐwài",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "他和弟弟同一天出生，兄弟俩长得很像，但除此以外几乎再找不到其他共同点。",
        "romanization": "tā hé dìdi tóngyī tiān chūshēng， xiōngdì liǎ zhǎngde hěn xiàng， dàn chú cǐ yǐwài jīhū zài zhǎobudào qítā gòngtóngdiǎn。",
        "translation": "He and his brother were born on the same day. The two brothers look very much alike, but other than that they can hardly find other things in common."
      }
    ]
  },
  {
    "id": "zh_把N1叫作N2_388",
    "language": "zh",
    "pattern": "把 N1 叫作 N2",
    "title": "把 N1 叫作 N2 (call N1 N2)",
    "shortExplanation": "call N1 N2",
    "longExplanation": "call N1 N2. Pinyin: bǎ N1 jiàozuò N2",
    "formation": "bǎ N1 jiàozuò N2",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "中国人把黄河叫作“母亲河” 。",
        "romanization": "Zhōngguórén bǎ Huáng Hé jiàozuò“ mǔqīn hé” 。",
        "translation": "The Chinese call the Yellow River Mother River."
      }
    ]
  },
  {
    "id": "zh_无论不管Q都_389",
    "language": "zh",
    "pattern": "(无论/不管) Q 都",
    "title": "(无论/不管) Q 都 (no matter Q)",
    "shortExplanation": "no matter Q",
    "longExplanation": "no matter Q. Pinyin: ( wúlùn/ bùguǎn) Q dōu",
    "formation": "( wúlùn/ bùguǎn) Q dōu",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "没关系，不用道歉，(无论/不管) 谁都有粗心填错的时候。",
        "romanization": "méiguānxi， bùyòng dàoqiàn，( wúlùn/ bùguǎn) shéi dōu yǒu cūxīn tián cuò de shíhou。",
        "translation": "It doesn't matter, don't apologize, anyone (lit. no matter who) can make a mistake."
      }
    ]
  },
  {
    "id": "zh_V上_390",
    "language": "zh",
    "pattern": "V 上",
    "title": "V 上 (get to V)",
    "shortExplanation": "get to V",
    "longExplanation": "get to V. Pinyin: V shàng",
    "formation": "V shàng",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "看来今天吃不上羊肉饺子了。",
        "romanization": "kànlai jīntiān chībushàng yángròu jiǎozi le。",
        "translation": "It seems that I don’t get to eat lamb dumplings today."
      }
    ]
  },
  {
    "id": "zh_V出来_391",
    "language": "zh",
    "pattern": "V 出来",
    "title": "V 出来 (V out (an outcome is produced))",
    "shortExplanation": "V out (an outcome is produced)",
    "longExplanation": "V out (an outcome is produced). Pinyin: V chūlái",
    "formation": "V chūlái",
    "level": "HSK 4",
    "examples": []
  },
  {
    "id": "zh_总的来说_393",
    "language": "zh",
    "pattern": "总的来说",
    "title": "总的来说 (overall)",
    "shortExplanation": "overall",
    "longExplanation": "overall. Pinyin: zǒngdeláishuō",
    "formation": "zǒngdeláishuō",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "这个公司总的来说还不错。",
        "romanization": "zhège gōngsī zǒngdeláishuō hái bùcuò。",
        "translation": "Overall, this company is good."
      }
    ]
  },
  {
    "id": "zh_在于_394",
    "language": "zh",
    "pattern": "在于",
    "title": "在于 (is all about)",
    "shortExplanation": "is all about",
    "longExplanation": "is all about. Pinyin: zàiyú",
    "formation": "zàiyú",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "人们常说“生命在于运动”。",
        "romanization": "rénmen cháng shuō“ shēngmìngzàiyúyùndòng”。",
        "translation": "People often say that life is all about moving/exercising.”"
      }
    ]
  },
  {
    "id": "zh_V1着V1着V2了_395",
    "language": "zh",
    "pattern": "V1 着 V1 着 V2了",
    "title": "V1 着 V1 着 V2了 (V2’ed while V1-ing)",
    "shortExplanation": "V2’ed while V1-ing",
    "longExplanation": "V2’ed while V1-ing. Pinyin: V1 zhe V1 zhe V2 le",
    "formation": "V1 zhe V1 zhe V2 le",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "她讲着讲着就笑了。",
        "romanization": "tā jiǎng zhe jiǎng zhe jiù xiào le。",
        "translation": "As she was speaking, she started to laugh."
      }
    ]
  },
  {
    "id": "zh_一就_396",
    "language": "zh",
    "pattern": "一……就……",
    "title": "一……就…… (as soon as … then …)",
    "shortExplanation": "as soon as … then …",
    "longExplanation": "as soon as … then …. Pinyin: yī…… jiù……",
    "formation": "yī…… jiù……",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "她一回家就看电视。",
        "romanization": "tā yī huíjiā jiù kàn diànshì。",
        "translation": "As soon as she gets home, (then) she watches TV."
      }
    ]
  },
  {
    "id": "zh_一就_397",
    "language": "zh",
    "pattern": "一……就……",
    "title": "一……就…… (每次只要)",
    "shortExplanation": "每次只要",
    "longExplanation": "每次只要. Pinyin: yī…… jiù……",
    "formation": "yī…… jiù……",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "儿子小时候一说话就脸红。",
        "romanization": "érzi xiǎoshíhou yī shuōhuà jiù liǎnhóng。",
        "translation": "When [my] son was a child, as soon as he speaks, (then) he blushes."
      }
    ]
  },
  {
    "id": "zh_究竟Q_398",
    "language": "zh",
    "pattern": "究竟 Q",
    "title": "究竟 Q (Q exactly)",
    "shortExplanation": "Q exactly",
    "longExplanation": "Q exactly. Pinyin: jiūjìng Q",
    "formation": "jiūjìng Q",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "究竟哪个季节去旅游比较好呢？",
        "romanization": "jiūjìng nǎge jìjié qù lǚyóu bǐjiào hǎo ne？",
        "translation": "Which season exactly is better to travel?"
      }
    ]
  },
  {
    "id": "zh_V起来_399",
    "language": "zh",
    "pattern": "V 起(来)",
    "title": "V 起(来) (V up)",
    "shortExplanation": "V up",
    "longExplanation": "V up. Pinyin: V qǐ( lái)",
    "formation": "V qǐ( lái)",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "你先把桌子上的东西拿起(来)，我擦完之后你再放下来。",
        "romanization": "nǐ xiān bǎ zhuōzi shàng de dōngxi náqǐ( lái)， wǒ cā wán zhīhòu nǐ zài fàng xiàlai。",
        "translation": "You pick up the things on the table first, and then you [can] put them down after I clean it."
      }
    ]
  },
  {
    "id": "zh_V起来_400",
    "language": "zh",
    "pattern": "V 起来",
    "title": "V 起来 (to start to V)",
    "shortExplanation": "to start to V",
    "longExplanation": "to start to V. Pinyin: V qilai",
    "formation": "V qilai",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "小王又唱起来了。",
        "romanization": "xiǎo wáng yòu chàng qilai le。",
        "translation": "Xiao Wang started singing again."
      }
    ]
  },
  {
    "id": "zh_V起来_401",
    "language": "zh",
    "pattern": "V 起来",
    "title": "V 起来 (seems like, sounds like)",
    "shortExplanation": "seems like, sounds like",
    "longExplanation": "seems like, sounds like. Pinyin: V qilai",
    "formation": "V qilai",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "上海话听起来就像外语一样。",
        "romanization": "Shànghǎihuà tīngqilai jiù xiàng wàiyǔ yīyàng。",
        "translation": "The Shanghai dialect sounds like a foreign language."
      }
    ]
  },
  {
    "id": "zh_说起O_402",
    "language": "zh",
    "pattern": "说起 O",
    "title": "说起 O (speaking of O)",
    "shortExplanation": "speaking of O",
    "longExplanation": "speaking of O. Pinyin: shuōqǐ O",
    "formation": "shuōqǐ O",
    "level": "HSK 4",
    "examples": [
      {
        "sentence": "说起吃的东西，给我印象最深的是湖南菜。",
        "romanization": "shuōqǐ chī de dōngxi， gěi wǒ yìnxiàng zuì shēn de shì Húnán cài。",
        "translation": "Speaking of food, the one that impressed me the most is Hunan cuisine."
      }
    ]
  },
  {
    "id": "zh_如何_403",
    "language": "zh",
    "pattern": "如何",
    "title": "如何 (how)",
    "shortExplanation": "how",
    "longExplanation": "how. Pinyin: rúhé",
    "formation": "rúhé",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "评委叫第一对夫妻说说他俩是如何恩爱的。",
        "romanization": "píngwěi jiào dìyī duì fūqī shuōshuo tā liǎ shì rúhé ēn'ài de。",
        "translation": "The judge called the first couple to talk about how they loved each other."
      }
    ]
  },
  {
    "id": "zh_如何_404",
    "language": "zh",
    "pattern": "如何",
    "title": "如何 (how is)",
    "shortExplanation": "how is",
    "longExplanation": "how is. Pinyin: rúhé",
    "formation": "rúhé",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "“80后”们月收入情况如何？",
        "romanization": "“80 hòu” men yuèshōurù qíngkuàng rúhé？",
        "translation": "How is the monthly income situation with those born in the 80s?"
      }
    ]
  },
  {
    "id": "zh_怎么_405",
    "language": "zh",
    "pattern": "怎么，……",
    "title": "怎么，…… ((expression of surprise))",
    "shortExplanation": "(expression of surprise)",
    "longExplanation": "(expression of surprise). Pinyin: zěnme，……",
    "formation": "zěnme，……",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "怎么，你不认识我了？！",
        "romanization": "zěnme， nǐ bù rènshi wǒ le？！",
        "translation": "What, you don't know me anymore?!"
      }
    ]
  },
  {
    "id": "zh_靠_406",
    "language": "zh",
    "pattern": "靠",
    "title": "靠 (to lean)",
    "shortExplanation": "to lean",
    "longExplanation": "to lean. Pinyin: kào",
    "formation": "kào",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "王老师喜欢靠着桌子讲课。",
        "romanization": "wáng lǎoshī xǐhuan kào zhe zhuōzi jiǎngkè。",
        "translation": "Teacher Wang likes to give her lecture while leaning on the table."
      }
    ]
  },
  {
    "id": "zh_靠_407",
    "language": "zh",
    "pattern": "靠",
    "title": "靠 (beside)",
    "shortExplanation": "beside",
    "longExplanation": "beside. Pinyin: kào",
    "formation": "kào",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "我的座位是17号，是靠窗的座位。",
        "romanization": "wǒ de zuòwèi shì17 hào， shì kàochuāng de zuòwèi。",
        "translation": "My seat is No. 17, which is (a seat) by the window."
      }
    ]
  },
  {
    "id": "zh_靠_408",
    "language": "zh",
    "pattern": "靠",
    "title": "靠 (to depend)",
    "shortExplanation": "to depend",
    "longExplanation": "to depend. Pinyin: kào",
    "formation": "kào",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "在家靠父母，出门靠朋友。",
        "romanization": "zài jiā kào fùmǔ， chūmén kào péngyou。",
        "translation": "At home [you] relies on [your] parents, [when you] go out [you] rely on [your] friends."
      }
    ]
  },
  {
    "id": "zh_居然_409",
    "language": "zh",
    "pattern": "居然",
    "title": "居然 ((See 竟然))",
    "shortExplanation": "(See 竟然)",
    "longExplanation": "(See 竟然). Pinyin: jūrán",
    "formation": "jūrán",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "这么简单的题，你居然也不会做？",
        "romanization": "zhème jiǎndān de tí， nǐ jūrán yě bùhuì zuò？",
        "translation": "[For] such a simple question, [you’re telling me that] you don’t know how to do it?"
      }
    ]
  },
  {
    "id": "zh_以来_410",
    "language": "zh",
    "pattern": "以来",
    "title": "以来 (since)",
    "shortExplanation": "since",
    "longExplanation": "since. Pinyin: yǐlái",
    "formation": "yǐlái",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "改革开放以来，中国发生了巨大的变化。",
        "romanization": "gǎigékāifàng yǐlái， Zhōngguó fāshēng le jùdà de biànhuà。",
        "translation": "Since the reform and opening up, China has undergone tremendous changes."
      }
    ]
  },
  {
    "id": "zh_临_411",
    "language": "zh",
    "pattern": "临",
    "title": "临 (adjacent to)",
    "shortExplanation": "adjacent to",
    "longExplanation": "adjacent to. Pinyin: lín",
    "formation": "lín",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "我想买一套不临街的房子，这样不会太吵。",
        "romanization": "wǒ xiǎng mǎi yītào bù línjiē de fángzi， zhèyàng bùhuì tài chǎo。",
        "translation": "I want to buy a house that is not adjacent to a street, so it won't be too noisy."
      }
    ]
  },
  {
    "id": "zh_临_412",
    "language": "zh",
    "pattern": "临",
    "title": "临 (just before)",
    "shortExplanation": "just before",
    "longExplanation": "just before. Pinyin: lín",
    "formation": "lín",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "临走那天，父亲从老家赶来送我们。",
        "romanization": "línzǒu nàtiān， fùqīn cóng lǎojiā gǎnlái sòng wǒmen。",
        "translation": "On the day (just before) he left, my father came to us from my hometown."
      }
    ]
  },
  {
    "id": "zh_立刻_413",
    "language": "zh",
    "pattern": "立刻",
    "title": "立刻 (immediately)",
    "shortExplanation": "immediately",
    "longExplanation": "immediately. Pinyin: lìkè",
    "formation": "lìkè",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "我们回来时，立刻感受到了家的温暖。",
        "romanization": "wǒmen huílai shí， lìkè gǎnshòu dàoliǎo jiāde wēnnuǎn。",
        "translation": "When we came back, we immediately felt the warmth of home."
      }
    ]
  },
  {
    "id": "zh_包括_414",
    "language": "zh",
    "pattern": "包括",
    "title": "包括 (to include)",
    "shortExplanation": "to include",
    "longExplanation": "to include. Pinyin: bāokuò",
    "formation": "bāokuò",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "汉语技能教学包括听、说、读、写四个方面。",
        "romanization": "Hànyǔ jìnéng jiàoxué bāokuò tīng、 shuō、 dú、 xiě sì gè fāngmiàn。",
        "translation": "Chinese language skills teaching includes listening, speaking, reading and writing."
      }
    ]
  },
  {
    "id": "zh_各自_415",
    "language": "zh",
    "pattern": "各自",
    "title": "各自 (each by themselves)",
    "shortExplanation": "each by themselves",
    "longExplanation": "each by themselves. Pinyin: gèzì",
    "formation": "gèzì",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "中场休息时间到了，比赛双方队员各自回场外休息。",
        "romanization": "zhōngchǎng xiūxi shíjiān dàoliǎo， bǐsài shuāngfāng duìyuán gèzì huí chǎng wài xiūxi。",
        "translation": "The intermission time has arrived, and the players on both sides of the game (each by themselves) went back out of the court to rest."
      }
    ]
  },
  {
    "id": "zh_勿_416",
    "language": "zh",
    "pattern": "勿",
    "title": "勿 (do not)",
    "shortExplanation": "do not",
    "longExplanation": "do not. Pinyin: wù",
    "formation": "wù",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "非工作人员，请勿入内。",
        "romanization": "fēi gōngzuòrényuán， qǐng wù rù nèi。",
        "translation": "If you’re not a staff member, please do not enter."
      }
    ]
  },
  {
    "id": "zh_时刻_417",
    "language": "zh",
    "pattern": "时刻",
    "title": "时刻 (moment)",
    "shortExplanation": "moment",
    "longExplanation": "moment. Pinyin: shíkè",
    "formation": "shíkè",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "在最后时刻，他为本队踢进了关键一球。",
        "romanization": "zài zuìhòu shíkè， tā wéi běn duì tī jìn le guānjiàn yī qiú。",
        "translation": "At the last moment, he scored the key goal for the team."
      }
    ]
  },
  {
    "id": "zh_时刻时时刻刻_418",
    "language": "zh",
    "pattern": "时刻，时时刻刻",
    "title": "时刻，时时刻刻 (at all times)",
    "shortExplanation": "at all times",
    "longExplanation": "at all times. Pinyin: shíkè， shíshíkèkè",
    "formation": "shíkè， shíshíkèkè",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "工作中，他时时刻刻提醒自已： 乘客的安全是最重要的。",
        "romanization": "gōngzuò zhōng， tā shíshíkèkè tíxǐng zì yǐ： chéngkè de ānquán shì zuì zhòngyào de。",
        "translation": "At work, he reminds himself at all times: The safety of passengers is the most important."
      }
    ]
  },
  {
    "id": "zh_至今_419",
    "language": "zh",
    "pattern": "至今",
    "title": "至今 (to this day)",
    "shortExplanation": "to this day",
    "longExplanation": "to this day. Pinyin: zhìjīn",
    "formation": "zhìjīn",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "我在北京出生、长大，至今还没离开过呢。",
        "romanization": "wǒ zài Běijīng chūshēng、 zhǎngdà， zhìjīn hái méi líkāi guò ne。",
        "translation": "I was born and raised in Beijing and have never left to this day."
      }
    ]
  },
  {
    "id": "zh_顶_420",
    "language": "zh",
    "pattern": "顶",
    "title": "顶 ((measure word for hats))",
    "shortExplanation": "(measure word for hats)",
    "longExplanation": "(measure word for hats). Pinyin: dǐng",
    "formation": "dǐng",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "我这顶新帽子怎么样？",
        "romanization": "wǒ zhè dǐng xīn màozi zěnmeyàng？",
        "translation": "How [what do you think of] this new hat of mine?"
      }
    ]
  },
  {
    "id": "zh_顶_421",
    "language": "zh",
    "pattern": "顶",
    "title": "顶 (the top of)",
    "shortExplanation": "the top of",
    "longExplanation": "the top of. Pinyin: dǐng",
    "formation": "dǐng",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "请把手举过头顶。",
        "romanization": "qǐng bǎshǒu jǔ guòtóu dǐng。",
        "translation": "Please raise your hand over (the top of) your head."
      }
    ]
  },
  {
    "id": "zh_顶_422",
    "language": "zh",
    "pattern": "顶",
    "title": "顶 (to lift)",
    "shortExplanation": "to lift",
    "longExplanation": "to lift. Pinyin: dǐng",
    "formation": "dǐng",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "他能用头顶起20斤重的东西。",
        "romanization": "tā néng yòng tóudǐng qǐ20 jīn zhòng de dōngxi。",
        "translation": "He can use his head to lift 20 pounds."
      }
    ]
  },
  {
    "id": "zh_顶着_423",
    "language": "zh",
    "pattern": "顶着",
    "title": "顶着 (against)",
    "shortExplanation": "against",
    "longExplanation": "against. Pinyin: dǐng zhe",
    "formation": "dǐng zhe",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "天气非常寒冷，子路顶着大雪往前走。",
        "romanization": "tiānqì fēicháng hánlěng， Zǐ Lù dǐng zhe Dàxuě wǎngqián zǒu。",
        "translation": "The weather is very cold, and Zilu was trudging ahead against heavy snow."
      }
    ]
  },
  {
    "id": "zh_得很得不行得不得了_424",
    "language": "zh",
    "pattern": "……得很/得不行/得不得了",
    "title": "……得很/得不行/得不得了 (very/so/extremely)",
    "shortExplanation": "very/so/extremely",
    "longExplanation": "very/so/extremely. Pinyin: …… dehěn/ dé bùxíng/ dé bùdéliǎo",
    "formation": "…… dehěn/ dé bùxíng/ dé bùdéliǎo",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "这个地方这么热闹，孩子们高兴得很/得不行/得不得了。",
        "romanization": "zhège dìfang zhème rènao， háizimen gāoxìng dehěn/ dé bùxíng/ dé bùdéliǎo。",
        "translation": "The place is so lively, the children are very/so/extremely happy."
      }
    ]
  },
  {
    "id": "zh_反而_425",
    "language": "zh",
    "pattern": "反而",
    "title": "反而 (actually (opposite to what one expects))",
    "shortExplanation": "actually (opposite to what one expects)",
    "longExplanation": "actually (opposite to what one expects). Pinyin: fǎn'ér",
    "formation": "fǎn'ér",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "大城市的生活虽然很精彩，但一辈子生活在农村的父母反而会不适应。",
        "romanization": "dàchéngshì de shēnghuó suīrán hěn jīngcǎi， dàn yībèizi shēnghuó zài nóngcūn de fùmǔ fǎn'ér huìbùhuì shìyìng。",
        "translation": "Although the life in a big city is very exciting, [my] parents who have lived in rural areas for a lifetime will actually (opposite to what one expects) find themselves ill-adapted."
      }
    ]
  },
  {
    "id": "zh_从而_426",
    "language": "zh",
    "pattern": "从而",
    "title": "从而 (consequently)",
    "shortExplanation": "consequently",
    "longExplanation": "consequently. Pinyin: cóng'ér",
    "formation": "cóng'ér",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "比赛前做好思想准备可以减少运动员的压力，从而取得比赛的成功。",
        "romanization": "bǐsài qián zuò hǎo sīxiǎng zhǔnbèi kěyǐ jiǎnshǎo yùndòngyuán de yālì， cóng'ér qǔdé bǐsài de chénggōng。",
        "translation": "Preparing mentally before the game can reduce the stress on the athletes [and] consequently achieve the success of the game."
      }
    ]
  },
  {
    "id": "zh_V于N_427",
    "language": "zh",
    "pattern": "V 于 N",
    "title": "V 于 N (V in N)",
    "shortExplanation": "V in N",
    "longExplanation": "V in N. Pinyin: V yú N",
    "formation": "V yú N",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "这家公司成立于1997年。",
        "romanization": "zhè jiā gōngsī chénglì yú1997 nián。",
        "translation": "This company was founded in 1997."
      }
    ]
  },
  {
    "id": "zh_V于N_428",
    "language": "zh",
    "pattern": "V 于 N",
    "title": "V 于 N (V to N)",
    "shortExplanation": "V to N",
    "longExplanation": "V to N. Pinyin: V yú N",
    "formation": "V yú N",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "李明没办法，只好求助于当经理的老同学王峰。",
        "romanization": "lǐ míng méibànfǎ， zhǐhǎo qiúzhù yú dāng jīnglǐ de lǎo tóngxué wáng fēng。",
        "translation": "Li Ming had no choice but to turn to Wang Feng (for help), the old classmate of the manager."
      }
    ]
  },
  {
    "id": "zh_V于N_429",
    "language": "zh",
    "pattern": "V 于 N",
    "title": "V 于 N (V from N)",
    "shortExplanation": "V from N",
    "longExplanation": "V from N. Pinyin: V yú N",
    "formation": "V yú N",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "他出身于知识分子家庭。",
        "romanization": "tā chūshēn yú zhīshifènzǐ jiātíng。",
        "translation": "He came from an intellectual family."
      }
    ]
  },
  {
    "id": "zh_A于N_430",
    "language": "zh",
    "pattern": "A 于 N",
    "title": "A 于 N (A to N)",
    "shortExplanation": "A to N",
    "longExplanation": "A to N. Pinyin: A yú N",
    "formation": "A yú N",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "运动有助于健康。",
        "romanization": "yùndòng yǒuzhùyú jiànkāng。",
        "translation": "Exercise is beneficial to health."
      }
    ]
  },
  {
    "id": "zh_A于N_431",
    "language": "zh",
    "pattern": "A 于 N",
    "title": "A 于 N (A from/than N)",
    "shortExplanation": "A from/than N",
    "longExplanation": "A from/than N. Pinyin: A yú N",
    "formation": "A yú N",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "水生动物不同于陆地动物。",
        "romanization": "shuǐshēng dòngwù bùtóng yú lùdì dòngwù。",
        "translation": "Aquatic creatures are different from terrestrial ones."
      }
    ]
  },
  {
    "id": "zh_V为wiN_432",
    "language": "zh",
    "pattern": "V 为 (wéi) N",
    "title": "V 为 (wéi) N (V into N)",
    "shortExplanation": "V into N",
    "longExplanation": "V into N. Pinyin: V wéi (wéi) N",
    "formation": "V wéi (wéi) N",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "压力也可以变为动力。",
        "romanization": "yālì yě kěyǐ biànwéi dònglì。",
        "translation": "Stress can also be turned into strength."
      }
    ]
  },
  {
    "id": "zh_V为wiN_433",
    "language": "zh",
    "pattern": "V 为 (wéi) N",
    "title": "V 为 (wéi) N (V as N)",
    "shortExplanation": "V as N",
    "longExplanation": "V as N. Pinyin: V wéi (wéi) N",
    "formation": "V wéi (wéi) N",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "在他看来，没有工作的生活就不能称其为生活。",
        "romanization": "zài tā kànlai， méiyǒu gōngzuò de shēnghuó jiù bùnéng chēng qí wéi shēnghuó。",
        "translation": "In his view, life without work cannot be called (as) life."
      }
    ]
  },
  {
    "id": "zh_V起来_434",
    "language": "zh",
    "pattern": "V 起来",
    "title": "V 起来 (V up)",
    "shortExplanation": "V up",
    "longExplanation": "V up. Pinyin: V qilai",
    "formation": "V qilai",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "地下水积蓄起来，越积越多。",
        "romanization": "dìxiàshuǐ jīxù qilai， yuè jī yuè duō。",
        "translation": "The groundwater is store (up) and accumulates."
      }
    ]
  },
  {
    "id": "zh_藏起来躲起来_435",
    "language": "zh",
    "pattern": "藏起来/躲起来",
    "title": "藏起来/躲起来 (V away)",
    "shortExplanation": "V away",
    "longExplanation": "V away. Pinyin: cáng qilai/ duǒ qilai",
    "formation": "cáng qilai/ duǒ qilai",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "刘丽知道自己做得不对，躲起来不敢见我。",
        "romanization": "Liú lì zhīdào zìjǐ zuò dé bùduì， duǒ qilai bù gǎn jiàn wǒ。",
        "translation": "Liu Li knows that she is doing something wrong, and she hides [herself] away and does not dare to see me."
      }
    ]
  },
  {
    "id": "zh_替_436",
    "language": "zh",
    "pattern": "替",
    "title": "替 (to replace)",
    "shortExplanation": "to replace",
    "longExplanation": "to replace. Pinyin: tì",
    "formation": "tì",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "见了外公，请替我向他问好。",
        "romanization": "jiàn le wàigōng， qǐng tì wǒ xiàng tā wènhǎo。",
        "translation": "When you see my grandfather, please say hello to him (on my behalf)."
      }
    ]
  },
  {
    "id": "zh_替_437",
    "language": "zh",
    "pattern": "替",
    "title": "替 (on behalf of)",
    "shortExplanation": "on behalf of",
    "longExplanation": "on behalf of. Pinyin: tì",
    "formation": "tì",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "李阳要去留学了，我们都替他高兴。",
        "romanization": "lǐ yáng yào qù liúxué le， wǒmen dōu tì tā gāoxìng。",
        "translation": "Li Yang is going to study abroad, and we are all happy for him."
      }
    ]
  },
  {
    "id": "zh_说不定_438",
    "language": "zh",
    "pattern": "说不定",
    "title": "说不定 (uncertain)",
    "shortExplanation": "uncertain",
    "longExplanation": "uncertain. Pinyin: shuōbudìng",
    "formation": "shuōbudìng",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "这事儿经理已经同意了，只是出发的时间还说不定。",
        "romanization": "zhè shìr jīnglǐ yǐjīng tóngyì le， zhǐshì chūfā de shíjiān hái shuōbudìng。",
        "translation": "The manager has already agreed, but the time of departure is still uncertain."
      }
    ]
  },
  {
    "id": "zh_说不定_439",
    "language": "zh",
    "pattern": "说不定",
    "title": "说不定 (maybe)",
    "shortExplanation": "maybe",
    "longExplanation": "maybe. Pinyin: shuōbudìng",
    "formation": "shuōbudìng",
    "level": "HSK 5",
    "examples": []
  },
  {
    "id": "zh_N似的_441",
    "language": "zh",
    "pattern": "N 似的",
    "title": "N 似的 (like N)",
    "shortExplanation": "like N",
    "longExplanation": "like N. Pinyin: N shìde",
    "formation": "N shìde",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "我不敢相信这是真的，好像做梦似的。",
        "romanization": "wǒ bù gǎn xiāngxìn zhè shì zhēn de， hǎoxiàng zuòmèng shìde。",
        "translation": "I can't believe this is true, it seems like a dream."
      }
    ]
  },
  {
    "id": "zh_A得什么似的_442",
    "language": "zh",
    "pattern": "A 得什么似的",
    "title": "A 得什么似的 (so A (to an extreme))",
    "shortExplanation": "so A (to an extreme)",
    "longExplanation": "so A (to an extreme). Pinyin: A dé shénme shìde",
    "formation": "A dé shénme shìde",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "他背着重重的电脑包挤地铁，下班回到家累得什么似的。",
        "romanization": "tā bèi zhuózhòng zhòng de diànnǎo bāo jǐ dìtiě， xiàbān huídào jiā lèi dé shénme shìde。",
        "translation": "He squeezed into the [crowded] subway with [his] heavy computer bag, and he was so tired when he got home from work."
      }
    ]
  },
  {
    "id": "zh_纷纷V_443",
    "language": "zh",
    "pattern": "纷纷 V",
    "title": "纷纷 V (V in quick succession)",
    "shortExplanation": "V in quick succession",
    "longExplanation": "V in quick succession. Pinyin: fēnfēn V",
    "formation": "fēnfēn V",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "要下雨了， 路上的人纷纷往家里跑。",
        "romanization": "yào xiàyǔ le， lùshang de rén fēnfēn wǎng jiālǐ pǎo。",
        "translation": "It’s going to rain, and people on the road are running home (one after another in quick succession)."
      }
    ]
  },
  {
    "id": "zh_瞎_444",
    "language": "zh",
    "pattern": "瞎",
    "title": "瞎 (blind)",
    "shortExplanation": "blind",
    "longExplanation": "blind. Pinyin: xiā",
    "formation": "xiā",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "一天， 他让士兵们去找一头大象和一些出生时眼晴就瞎了的人回来。",
        "romanization": "yī tiān， tā ràng shìbīng men qù zhǎo yītóu dàxiàng hé yīxiē chūshēng shí yǎn qíng jiù xiā le de rén huílai。",
        "translation": "One day, he asked the soldiers to find an elephant and some people who were blind when they were born."
      }
    ]
  },
  {
    "id": "zh_瞎_445",
    "language": "zh",
    "pattern": "瞎",
    "title": "瞎 (thoughtlessly)",
    "shortExplanation": "thoughtlessly",
    "longExplanation": "thoughtlessly. Pinyin: xiā",
    "formation": "xiā",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "他会想办法的，你就别替他瞎担心了。",
        "romanization": "tā huì xiǎng bànfǎ de， nǐ jiù bié tì tā xiā dānxīn le。",
        "translation": "He will find a way, you don't (thoughtlessly) worry about him."
      }
    ]
  },
  {
    "id": "zh_分别_446",
    "language": "zh",
    "pattern": "分别",
    "title": "分别 (to separate)",
    "shortExplanation": "to separate",
    "longExplanation": "to separate. Pinyin: fēnbié",
    "formation": "fēnbié",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "分别是暂时的，我们以后一定会再见。",
        "romanization": "fēnbié shì zànshí de， wǒmen yǐhòu yīdìng huì zàijiàn。",
        "translation": "The separation is temporary. We will definitely see each other again in the future."
      }
    ]
  },
  {
    "id": "zh_分别_447",
    "language": "zh",
    "pattern": "分别",
    "title": "分别 (difference)",
    "shortExplanation": "difference",
    "longExplanation": "difference. Pinyin: fēnbié",
    "formation": "fēnbié",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "我不知道这两种做法有什么分别。",
        "romanization": "wǒ bù zhīdào zhè liǎng zhǒng zuòfǎ yǒu shénme fēnbié。",
        "translation": "I don't know the difference between the two approaches."
      }
    ]
  },
  {
    "id": "zh_分别_448",
    "language": "zh",
    "pattern": "分别",
    "title": "分别 (separately)",
    "shortExplanation": "separately",
    "longExplanation": "separately. Pinyin: fēnbié",
    "formation": "fēnbié",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "我分别找两个人打听了这件事，他们的说法都是一样的。",
        "romanization": "wǒ fēnbié zhǎo liǎng gèrén dǎting le zhè jiàn shì， tāmen de shuōfa dōu shì yīyàng de。",
        "translation": "I asked two people (separately) to ask about this, and they all said the same thing."
      }
    ]
  },
  {
    "id": "zh_分别_449",
    "language": "zh",
    "pattern": "分别",
    "title": "分别 (respectively)",
    "shortExplanation": "respectively",
    "longExplanation": "respectively. Pinyin: fēnbié",
    "formation": "fēnbié",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "砂岩和砾岩分别是砂和砾石固结的产物。",
        "romanization": "shāyán hé lìyán fēnbié shì shā hé lìshí gù jié de chǎnwù。",
        "translation": "Sandstone and conglomerate are the consolidated equivalent of sand and gravel, respectively."
      }
    ]
  },
  {
    "id": "zh_根_450",
    "language": "zh",
    "pattern": "根",
    "title": "根 ((measure word))",
    "shortExplanation": "(measure word)",
    "longExplanation": "(measure word). Pinyin: gēn",
    "formation": "gēn",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "摸到尾巴的盲人说大象像一根绳子。",
        "romanization": "mō dào wěiba de mángrén shuō dàxiàng xiàng yī gēn shéngzi。",
        "translation": "The blind man who touched the tail said that the elephant is like a rope."
      }
    ]
  },
  {
    "id": "zh_根_451",
    "language": "zh",
    "pattern": "根",
    "title": "根 (root)",
    "shortExplanation": "root",
    "longExplanation": "root. Pinyin: gēn",
    "formation": "gēn",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "这棵树的根又粗又长。",
        "romanization": "zhè kē shù de gēn yòu cū yòu cháng。",
        "translation": "The root of this tree is thick and long."
      }
    ]
  },
  {
    "id": "zh_便_452",
    "language": "zh",
    "pattern": "便",
    "title": "便 (then)",
    "shortExplanation": "then",
    "longExplanation": "then. Pinyin: biàn",
    "formation": "biàn",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "楼上新买了一架钢琴，我们家便多了一些不安静。",
        "romanization": "lóushàng xīn mǎi le yī jià gāngqín， wǒmen jiā biàn duō le yīxiē bù ānjìng。",
        "translation": "A new piano was bought upstairs, and then there were more noise (lit. unquiet) [heard] in our home."
      }
    ]
  },
  {
    "id": "zh_倒反倒_453",
    "language": "zh",
    "pattern": "倒/反倒",
    "title": "倒/反倒 (contrary to logic)",
    "shortExplanation": "contrary to logic",
    "longExplanation": "contrary to logic. Pinyin: dǎo/ fǎndào",
    "formation": "dǎo/ fǎndào",
    "level": "HSK 5",
    "examples": []
  },
  {
    "id": "zh_倒_455",
    "language": "zh",
    "pattern": "倒",
    "title": "倒 (despite all)",
    "shortExplanation": "despite all",
    "longExplanation": "despite all. Pinyin: dǎo",
    "formation": "dǎo",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "质量倒是挺好，就是价格太贵了。",
        "romanization": "zhìliàng dàoshi tǐnghǎo， jiùshì jiàgé tài guì le。",
        "translation": "(Despite all) the quality is (actually) pretty good, it’s just that the price is too expensive."
      }
    ]
  },
  {
    "id": "zh_倒_456",
    "language": "zh",
    "pattern": "倒",
    "title": "倒 (for crying out loud)",
    "shortExplanation": "for crying out loud",
    "longExplanation": "for crying out loud. Pinyin: dǎo",
    "formation": "dǎo",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "你倒是说说看，这件事你不负责谁负责？",
        "romanization": "nǐ dàoshi shuōshuo kàn， zhè jiàn shì nǐ bù fùzé shéi fùzé？",
        "translation": "Now you tell us, for crying out loud, if you’re not responsible for this, then who is?"
      }
    ]
  },
  {
    "id": "zh_V来V去_457",
    "language": "zh",
    "pattern": "V 来 V 去",
    "title": "V 来 V 去 (V around)",
    "shortExplanation": "V around",
    "longExplanation": "V around. Pinyin: V lái V qù",
    "formation": "V lái V qù",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "小狗追着自己的尾巴， 在草地上跑来跑去。",
        "romanization": "xiǎogǒu zhuī zhe zìjǐ de wěiba， zài cǎo dìshang pǎo lái pǎo qù。",
        "translation": "The dog chased his tail and ran around on the grass."
      }
    ]
  },
  {
    "id": "zh_要不不然要不然_458",
    "language": "zh",
    "pattern": "要不/不然/要不然",
    "title": "要不/不然/要不然 (otherwise)",
    "shortExplanation": "otherwise",
    "longExplanation": "otherwise. Pinyin: yàobù/ bùrán/ yàobùrán",
    "formation": "yàobù/ bùrán/ yàobùrán",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "还好碰见你了，要不/不然/要不然我今天肯定要迟到了。",
        "romanization": "háihǎo pèngjiàn nǐ le， yàobù/ bùrán/ yàobùrán wǒ jīntiān kěndìng yào chí dàoliǎo。",
        "translation": "Fortunately, I ran into you, otherwise I must have been late today."
      }
    ]
  },
  {
    "id": "zh_要不不然要不然_459",
    "language": "zh",
    "pattern": "要不/不然/要不然",
    "title": "要不/不然/要不然 (why not try)",
    "shortExplanation": "why not try",
    "longExplanation": "why not try. Pinyin: yàobù/ bùrán/ yàobùrán",
    "formation": "yàobù/ bùrán/ yàobùrán",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "今天太晚了，要不/不然/要不然你明天再走吧。",
        "romanization": "jīntiān tài wǎn le， yàobù/ bùrán/ yàobùrán nǐ míngtiān zài zǒu ba。",
        "translation": "It’s too late today, why don’t (you) leave tomorrow instead?"
      }
    ]
  },
  {
    "id": "zh_彼此V_460",
    "language": "zh",
    "pattern": "彼此 V",
    "title": "彼此 V (each other)",
    "shortExplanation": "each other",
    "longExplanation": "each other. Pinyin: bǐcǐ V",
    "formation": "bǐcǐ V",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "好朋友应该彼此帮助。",
        "romanization": "hǎopéngyou yīnggāi bǐcǐ bāngzhù。",
        "translation": "Good friends should help each other."
      }
    ]
  },
  {
    "id": "zh_彼此_461",
    "language": "zh",
    "pattern": "彼此",
    "title": "彼此 ((pronoun for 2 people))",
    "shortExplanation": "(pronoun for 2 people)",
    "longExplanation": "(pronoun for 2 people). Pinyin: bǐcǐ",
    "formation": "bǐcǐ",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "我们彼此的爱好相同。",
        "romanization": "wǒmen bǐcǐ de àihào xiāngtóng。",
        "translation": "We (us two) have the same hobbies."
      }
    ]
  },
  {
    "id": "zh_彼此彼此_462",
    "language": "zh",
    "pattern": "彼此彼此",
    "title": "彼此彼此 (about the same)",
    "shortExplanation": "about the same",
    "longExplanation": "about the same. Pinyin: bǐcǐbǐcǐ",
    "formation": "bǐcǐbǐcǐ",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "咱们俩彼此彼此， 我画得比你好不了多少。",
        "romanization": "zánmen liǎ bǐcǐbǐcǐ， wǒ huà dé bǐ nǐhǎo bùliǎo duōshao。",
        "translation": "We (the two of us) are pretty much the same, I can't paint much better than you."
      }
    ]
  },
  {
    "id": "zh_算_463",
    "language": "zh",
    "pattern": "算",
    "title": "算 (counts as)",
    "shortExplanation": "counts as",
    "longExplanation": "counts as. Pinyin: suàn",
    "formation": "suàn",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "这钱就算我借给你的，将来你有了的时候再还我。",
        "romanization": "zhè qián jiùsuàn wǒ jiègěi nǐ de， jiānglái nǐ yǒule de shíhou zài hái wǒ。",
        "translation": "Let’s just say that the money is loaned to you, you can pay me back when you have [more money]."
      }
    ]
  },
  {
    "id": "zh_V了掉算了_464",
    "language": "zh",
    "pattern": "V 了/掉 算了",
    "title": "V 了/掉 算了 (might as well V)",
    "shortExplanation": "might as well V",
    "longExplanation": "might as well V. Pinyin: V le/ diào suànle",
    "formation": "V le/ diào suànle",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "不就是一个空瓶子吗？扔掉算了。",
        "romanization": "bù jiùshì yī gè kōng píngzi ma？ rēngdiào suànle。",
        "translation": "Isn't it just an empty bottle? Might as well throw it away."
      }
    ]
  },
  {
    "id": "zh_作为N_465",
    "language": "zh",
    "pattern": "作为 N",
    "title": "作为 N (as N)",
    "shortExplanation": "as N",
    "longExplanation": "as N. Pinyin: zuòwéi N",
    "formation": "zuòwéi N",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "作为大作家、大学问家，鲁迅对吃很讲究。",
        "romanization": "zuòwéi dà zuòjiā、 dàxué wèn jiā， Lǔ Xùn duì chī hěn jiǎngjiu。",
        "translation": "As a great writer and a great intellectual, Lu Xun is very particular about eating."
      }
    ]
  },
  {
    "id": "zh_曾经_466",
    "language": "zh",
    "pattern": "曾经",
    "title": "曾经 (once)",
    "shortExplanation": "once",
    "longExplanation": "once. Pinyin: céngjīng",
    "formation": "céngjīng",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "孔子曾经带着学生周游各国14年，传播他的思想。",
        "romanization": "Kǒngzǐ céngjīng dài zhe xuésheng zhōuyóu gèguó14 nián， chuánbō tā de sīxiǎng。",
        "translation": "Confucius once took students around the country for 14 years, spreading his thoughts."
      }
    ]
  },
  {
    "id": "zh_毕竟_467",
    "language": "zh",
    "pattern": "毕竟",
    "title": "毕竟 (after all)",
    "shortExplanation": "after all",
    "longExplanation": "after all. Pinyin: bìjìng",
    "formation": "bìjìng",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "虽然我们遇到了很多困难，但毕竟完成了任务。",
        "romanization": "suīrán wǒmen yù dàoliǎo hěn duō kùnnan， dàn bìjìng wánchéng le rènwu。",
        "translation": "Although we have encountered a lot of difficulties, we have completed the task after all."
      }
    ]
  },
  {
    "id": "zh_逐渐_468",
    "language": "zh",
    "pattern": "逐渐",
    "title": "逐渐 (gradually)",
    "shortExplanation": "gradually",
    "longExplanation": "gradually. Pinyin: zhújiàn",
    "formation": "zhújiàn",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "食物越来越少，老人不得不逐渐限制猴子的食量。",
        "romanization": "shíwù yuèláiyuè shǎo， lǎorén bùdébù zhújiàn xiànzhì hóuzi de shíliàng。",
        "translation": "With less and less food, the elderly have to gradually limit the amount of food they eat."
      }
    ]
  },
  {
    "id": "zh_或许_469",
    "language": "zh",
    "pattern": "或许",
    "title": "或许 (maybe)",
    "shortExplanation": "maybe",
    "longExplanation": "maybe. Pinyin: huòxǔ",
    "formation": "huòxǔ",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "虽然以前她不支持你，但或许这次会有变化。",
        "romanization": "suīrán yǐqián tā bù zhīchí nǐ， dàn huòxǔ zhè cì huì yǒu biànhuà。",
        "translation": "Although she did not support you before, maybe this time things will change."
      }
    ]
  },
  {
    "id": "zh_V过来_470",
    "language": "zh",
    "pattern": "V 过来",
    "title": "V 过来 (V and recover)",
    "shortExplanation": "V and recover",
    "longExplanation": "V and recover. Pinyin: V guòlái",
    "formation": "V guòlái",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "过了半天，脑子才清醒过来。",
        "romanization": "guò le bàntiān， nǎozi cái qīngxǐng guòlái。",
        "translation": "My head cleared up only after a long time,"
      }
    ]
  },
  {
    "id": "zh_V得过来V不过来_471",
    "language": "zh",
    "pattern": "V 得过来 / V 不过来",
    "title": "V 得过来 / V 不过来 (can finish V / cannot finish V)",
    "shortExplanation": "can finish V / cannot finish V",
    "longExplanation": "can finish V / cannot finish V. Pinyin: V dé guòlái / V bùguò lái",
    "formation": "V dé guòlái / V bùguò lái",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "天上的星星那么多，谁数得过来呀？",
        "romanization": "tiānshàng de xīngxing nàme duō， shéi shǔ dé guòlái ya？",
        "translation": "There are so many stars in the sky, who can count them (out)?"
      }
    ]
  },
  {
    "id": "zh_所_472",
    "language": "zh",
    "pattern": "所",
    "title": "所 ((measure word for institutions))",
    "shortExplanation": "(measure word for institutions)",
    "longExplanation": "(measure word for institutions). Pinyin: suǒ",
    "formation": "suǒ",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "他来自北京的一所大学。",
        "romanization": "tā láizì Běijīng de yī suǒ dàxué。",
        "translation": "He is from a university in Beijing."
      }
    ]
  },
  {
    "id": "zh_S所V的_473",
    "language": "zh",
    "pattern": "S + (所) + V + 的",
    "title": "S + (所) + V + 的 (what S V)",
    "shortExplanation": "what S V",
    "longExplanation": "what S V. Pinyin: S + ( suǒ) + V + de",
    "formation": "S + ( suǒ) + V + de",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "山水画(所)表现的是人与自然的关系。",
        "romanization": "shānshuǐhuà( suǒ) biǎoxiàn de shì rén yǔ zìrán de guānxi。",
        "translation": "What the landscape painting shows is the relationship between man and nature."
      }
    ]
  },
  {
    "id": "zh_有所V_474",
    "language": "zh",
    "pattern": "有所 V",
    "title": "有所 V (has/have V’ed)",
    "shortExplanation": "has/have V’ed",
    "longExplanation": "has/have V’ed. Pinyin: yǒusuǒ V",
    "formation": "yǒusuǒ V",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "随着年龄的增大，女性的职场幸福感有所提高。",
        "romanization": "suízhe niánlíng de zēngdà， nǚxìng de zhíchǎng xìngfú gǎn yǒusuǒ tígāo。",
        "translation": "As [their] age increases, women’s happiness at work has increased."
      }
    ]
  },
  {
    "id": "zh_无所V_475",
    "language": "zh",
    "pattern": "无所 V",
    "title": "无所 V (have nothing to V)",
    "shortExplanation": "have nothing to V",
    "longExplanation": "have nothing to V. Pinyin: wú suǒ V",
    "formation": "wú suǒ V",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "你要是坚持真理就可以无所畏惧。",
        "romanization": "nǐ yàoshi jiānchí zhēnlǐ jiù kěyǐ wú suǒ wèijù。",
        "translation": "If you stick to the truth, you've nothing to fear."
      }
    ]
  },
  {
    "id": "zh_与N相当_476",
    "language": "zh",
    "pattern": "与 N 相当",
    "title": "与 N 相当 (equivalent to N)",
    "shortExplanation": "equivalent to N",
    "longExplanation": "equivalent to N. Pinyin: yǔ N xiāngdāng",
    "formation": "yǔ N xiāngdāng",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "开车打电话的人的反应速度与醉酒者相当。",
        "romanization": "kāichē dǎdiànhuà de rén de fǎnyìng sùdù yǔ zuìjiǔ zhě xiāngdāng。",
        "translation": "The reaction speed of the person who calls while driving is equivalent to a drunk."
      }
    ]
  },
  {
    "id": "zh_相当于N_477",
    "language": "zh",
    "pattern": "相当于 N",
    "title": "相当于 N (equivalent to N)",
    "shortExplanation": "equivalent to N",
    "longExplanation": "equivalent to N. Pinyin: xiāngdāngyú N",
    "formation": "xiāngdāngyú N",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "这种鸟一天所食的害虫相当于自己的体重。",
        "romanization": "zhèzhǒng niǎo yī tiān suǒ shí de hàichóng xiāngdāngyú zìjǐ de tǐzhòng。",
        "translation": "The pests that this bird eats a day are equivalent to its own weight."
      }
    ]
  },
  {
    "id": "zh_相当_478",
    "language": "zh",
    "pattern": "相当",
    "title": "相当 (quite)",
    "shortExplanation": "quite",
    "longExplanation": "quite. Pinyin: xiāngdāng",
    "formation": "xiāngdāng",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "菜的味道好极了，服务也周到，我相当满意。",
        "romanization": "cài de wèidao hǎo jíle， fúwù yě zhōudào， wǒ xiāngdāng mǎnyì。",
        "translation": "The dish is very delicious, the service is also thoughtful, I am quite satisfied."
      }
    ]
  },
  {
    "id": "zh_相当_479",
    "language": "zh",
    "pattern": "相当",
    "title": "相当 (considerable)",
    "shortExplanation": "considerable",
    "longExplanation": "considerable. Pinyin: xiāngdāng",
    "formation": "xiāngdāng",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "相当一部分人会以收入多少作为幸福的标准。",
        "romanization": "xiāngdāng yībùfèn rén huì yǐ shōurù duōshao zuòwéi xìngfú de biāozhǔn。",
        "translation": "A considerable number of people will regard their income as a standard of happiness."
      }
    ]
  },
  {
    "id": "zh_数sh_480",
    "language": "zh",
    "pattern": "数 (shǔ)",
    "title": "数 (shǔ) (to count)",
    "shortExplanation": "to count",
    "longExplanation": "to count. Pinyin: shǔ (shǔ)",
    "formation": "shǔ (shǔ)",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "我大概数了一下，车上有32个学生。",
        "romanization": "wǒ dàgài shǔ le yīxià， chē shàng yǒu32 gè xuésheng。",
        "translation": "I roughly counted it, there are 32 students in the vehicle."
      }
    ]
  },
  {
    "id": "zh_数sh_481",
    "language": "zh",
    "pattern": "数 (shǔ)",
    "title": "数 (shǔ) (to be reckoned as)",
    "shortExplanation": "to be reckoned as",
    "longExplanation": "to be reckoned as. Pinyin: shǔ (shǔ)",
    "formation": "shǔ (shǔ)",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "要说我们班跑得最快的，那就数李阳了。",
        "romanization": "yàoshuō wǒmen bān pǎo dé zuì kuài de， nà jiù shǔ lǐ yáng le。",
        "translation": "If we were to discuss who our class runs the fastest, then it’s no other than Li Yang."
      }
    ]
  },
  {
    "id": "zh_数sh_482",
    "language": "zh",
    "pattern": "数 (shù)",
    "title": "数 (shù) (several)",
    "shortExplanation": "several",
    "longExplanation": "several. Pinyin: shǔ (shù)",
    "formation": "shǔ (shù)",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "这里夏季的雷阵雨一般可持续数小时或者更久的时间。",
        "romanization": "zhèlǐ xiàjì de léizhènyǔ yībān kěchíxù shùxiǎoshí huòzhě gèng jiǔ de shíjiān。",
        "translation": "The thunderstorms in summer here generally last for several hours or longer."
      }
    ]
  },
  {
    "id": "zh_以及_483",
    "language": "zh",
    "pattern": "以及",
    "title": "以及 (and)",
    "shortExplanation": "and",
    "longExplanation": "and. Pinyin: yǐjí",
    "formation": "yǐjí",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "学校的领导、教师以及一些学生代表观看了演出。",
        "romanization": "xuéxiào de lǐngdǎo、 jiàoshī yǐjí yīxiē xuésheng dàibiǎo guānkàn le yǎnchū。",
        "translation": "School leaders, teachers, and some student representatives watched the show."
      }
    ]
  },
  {
    "id": "zh_程度_484",
    "language": "zh",
    "pattern": "程度",
    "title": "程度 (degree)",
    "shortExplanation": "degree",
    "longExplanation": "degree. Pinyin: chéngdù",
    "formation": "chéngdù",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "问题已经发展到了十分严重的程度。",
        "romanization": "wèntí yǐjīng fāzhǎn dàoliǎo shífēn yánzhòng de chéngdù。",
        "translation": "The problem has grown to a very serious degree."
      }
    ]
  },
  {
    "id": "zh_更何况_485",
    "language": "zh",
    "pattern": "(更)何况",
    "title": "(更)何况 (let alone)",
    "shortExplanation": "let alone",
    "longExplanation": "let alone. Pinyin: ( gèng) hékuàng",
    "formation": "( gèng) hékuàng",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "连运动员都不满意，更何况看比赛的球迷呢？",
        "romanization": "lián yùndòngyuán dōu bùmǎnyì， gèng hékuàng kàn bǐsài de qiúmí ne？",
        "translation": "Even the athletes are not satisfied, let alone the fans watching the game?"
      }
    ]
  },
  {
    "id": "zh_何必_486",
    "language": "zh",
    "pattern": "何必",
    "title": "何必 (What for? Why do you have to…?)",
    "shortExplanation": "What for? Why do you have to…?",
    "longExplanation": "What for? Why do you have to…?. Pinyin: hébì",
    "formation": "hébì",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "你何必亲自送一趟呢？叫个快递不就行了？",
        "romanization": "nǐ hébì qīnzì sòng yī tàng ne？ jiào gè kuàidì bù jiù xíng le？",
        "translation": "Why do you have to deliver it yourself? Calling a courier is not enough?"
      }
    ]
  },
  {
    "id": "zh_多亏_487",
    "language": "zh",
    "pattern": "多亏",
    "title": "多亏 (thanks to)",
    "shortExplanation": "thanks to",
    "longExplanation": "thanks to. Pinyin: duōkuī",
    "formation": "duōkuī",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "多亏了他这句话，人们如梦初醒。",
        "romanization": "duōkuī le tā zhè jù huà， rénmen rú mèng chū xǐng。",
        "translation": "Thanks to his words, people wake up like a dream."
      }
    ]
  },
  {
    "id": "zh_所谓_488",
    "language": "zh",
    "pattern": "所谓",
    "title": "所谓 (so-called)",
    "shortExplanation": "so-called",
    "longExplanation": "so-called. Pinyin: suǒwèi",
    "formation": "suǒwèi",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "他所谓的“新闻”， 其实我们早就知道了！",
        "romanization": "tā suǒwèi de“ xīnwén”， qíshí wǒmen zǎojiù zhīdàole！",
        "translation": "His so-called news, in fact, we already know!"
      }
    ]
  },
  {
    "id": "zh_N则VA_489",
    "language": "zh",
    "pattern": "N 则 V/A",
    "title": "N 则 V/A (whereas N V)",
    "shortExplanation": "whereas N V",
    "longExplanation": "whereas N V. Pinyin: N zé V/A",
    "formation": "N zé V/A",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "他高中毕业以后出国留学了，而我则一直留在国内。",
        "romanization": "tā gāozhōng bìyè yǐhòu chūguó liúxué le， ér wǒ zé yīzhí liú zài guónèi。",
        "translation": "After graduating from high school, he went abroad to study, whereas I stayed at home."
      }
    ]
  },
  {
    "id": "zh_则_490",
    "language": "zh",
    "pattern": "……则……",
    "title": "……则…… (if… then…)",
    "shortExplanation": "if… then…",
    "longExplanation": "if… then…. Pinyin: …… zé……",
    "formation": "…… zé……",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "北京的冬天，有风则寒，无风则暖。",
        "romanization": "Běijīng de dōngtiān， yǒufēng zé hán， wú fēng zé nuǎn。",
        "translation": "Beijing in the winter, if it’s windy then it’s cold, and if not then it’s warm."
      }
    ]
  },
  {
    "id": "zh_则_491",
    "language": "zh",
    "pattern": "# 则",
    "title": "# 则 ((measure word for stories))",
    "shortExplanation": "(measure word for stories)",
    "longExplanation": "(measure word for stories). Pinyin: # zé",
    "formation": "# zé",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "今天的报纸上有一则非常重要的新闻。",
        "romanization": "jīntiān de bàozhǐ shàng yǒu yīzé fēicháng zhòngyào de xīnwén。",
        "translation": "There is a very important news in today's newspaper."
      }
    ]
  },
  {
    "id": "zh_为S所V_492",
    "language": "zh",
    "pattern": "为 S 所 V",
    "title": "为 S 所 V (is V’ed by S)",
    "shortExplanation": "is V’ed by S",
    "longExplanation": "is V’ed by S. Pinyin: wéi S suǒ V",
    "formation": "wéi S suǒ V",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "有了科学，大自然就可以更好地为人所用。",
        "romanization": "yǒule kēxué， dàzìrán jiù kěyǐ gèng hǎo dì wéirén suǒ yòng。",
        "translation": "With science, nature can be better used by mankind."
      }
    ]
  },
  {
    "id": "zh_V起_493",
    "language": "zh",
    "pattern": "V 起",
    "title": "V 起 (V up)",
    "shortExplanation": "V up",
    "longExplanation": "V up. Pinyin: V qǐ",
    "formation": "V qǐ",
    "level": "HSK 5",
    "examples": []
  },
  {
    "id": "zh_V得过_495",
    "language": "zh",
    "pattern": "V 得过",
    "title": "V 得过 (can V and overcome)",
    "shortExplanation": "can V and overcome",
    "longExplanation": "can V and overcome. Pinyin: V dé guò",
    "formation": "V dé guò",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "跟别人谈论起军事来，没有人说得过他。",
        "romanization": "gēn biéren tánlùn qǐ jūnshì lái， méiyǒu rén shuō dé guò tā。",
        "translation": "Talking to others about military affairs, no one can win arguments (lit. talk) over him."
      }
    ]
  },
  {
    "id": "zh_迟早_496",
    "language": "zh",
    "pattern": "迟早",
    "title": "迟早 (sooner or later)",
    "shortExplanation": "sooner or later",
    "longExplanation": "sooner or later. Pinyin: chízǎo",
    "formation": "chízǎo",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "随着网络技术的发展，这些问题迟早都会得到解决。",
        "romanization": "suízhe wǎngluòjìshù de fāzhǎn， zhèxiē wèntí chízǎo dūhuì dédào jiějué。",
        "translation": "With the development of network technology, these problems will be solved sooner or later."
      }
    ]
  },
  {
    "id": "zh_再三_497",
    "language": "zh",
    "pattern": "再三",
    "title": "再三 (repeatedly)",
    "shortExplanation": "repeatedly",
    "longExplanation": "repeatedly. Pinyin: zàisān",
    "formation": "zàisān",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "赵括的母亲再三阻止赵王任命儿子为大将。",
        "romanization": "Zhào Kuò de mǔqīn zàisān zǔzhǐ zhào wáng rènmìng érzi wéi dàjiàng。",
        "translation": "Zhao Kuo’s mother repeatedly prevented Zhao Wang from appointing his son as a general."
      }
    ]
  },
  {
    "id": "zh_即_498",
    "language": "zh",
    "pattern": "即",
    "title": "即 (that is)",
    "shortExplanation": "that is",
    "longExplanation": "that is. Pinyin: jí",
    "formation": "jí",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "“旦”是象形字，即太阳从地平线上升起。",
        "romanization": "“ dàn” shì xiàngxíngzì， jí tàiyang cóng dì píng xiànshàng shēngqǐ。",
        "translation": "“旦” is a pictograph, that is, the sun rising from the horizon."
      }
    ]
  },
  {
    "id": "zh_即_499",
    "language": "zh",
    "pattern": "……即……",
    "title": "……即…… (if… then…)",
    "shortExplanation": "if… then…",
    "longExplanation": "if… then…. Pinyin: …… jí……",
    "formation": "…… jí……",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "不懂即问是他最大的优点，也是他成功的主要原因。",
        "romanization": "bù dǒng jí wèn shì tā zuì dà de yōudiǎn， yě shì tā chénggōng de zhǔyào yuányīn。",
        "translation": "If he doesn’t understand something, (then) he’ll just ask. This is his greatest strength, but also the main reason for his success."
      }
    ]
  },
  {
    "id": "zh_个别V_500",
    "language": "zh",
    "pattern": "个别 V",
    "title": "个别 V (individually V, separately V)",
    "shortExplanation": "individually V, separately V",
    "longExplanation": "individually V, separately V. Pinyin: gèbié V",
    "formation": "gèbié V",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "他经常采取个别谈话的方式了解情况和解决问题。",
        "romanization": "tā jīngcháng cǎiqǔ gèbié tánhuà de fāngshì liǎojiě qíngkuàng hé jiějué wèntí。",
        "translation": "He often uses individual conversations to understand the situation and solve problems."
      }
    ]
  },
  {
    "id": "zh_个别N_501",
    "language": "zh",
    "pattern": "个别 N",
    "title": "个别 N (only a few N (as an exception))",
    "shortExplanation": "only a few N (as an exception)",
    "longExplanation": "only a few N (as an exception). Pinyin: gèbié N",
    "formation": "gèbié N",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "除了个别人以外，多数人体重的增加会从周六开始。",
        "romanization": "chúle gè biéren yǐwài， duōshù rén tǐzhòng de zēngjiā huì cóng Zhōuliù kāishǐ。",
        "translation": "Except for a few individual [persons], the weight gain of most people starts on Saturday."
      }
    ]
  },
  {
    "id": "zh_非_502",
    "language": "zh",
    "pattern": "非",
    "title": "非 (to insist on)",
    "shortExplanation": "to insist on",
    "longExplanation": "to insist on. Pinyin: fēi",
    "formation": "fēi",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "他非要离婚，我们谁拦也拦不住。",
        "romanization": "tā fēiyào líhūn， wǒmen shéi lán yě lán bùzhù。",
        "translation": "He insists on divorcing, and we can’t stop it."
      }
    ]
  },
  {
    "id": "zh_非_503",
    "language": "zh",
    "pattern": "非",
    "title": "非 (not, un-)",
    "shortExplanation": "not, un-",
    "longExplanation": "not, un-. Pinyin: fēi",
    "formation": "fēi",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "出现非正常情况时请不要紧张。",
        "romanization": "chūxiàn fēizhèngcháng qíngkuàng shí qǐng bùyào jǐnzhāng。",
        "translation": "Please do not be nervous when emergencies (lit. abnormal conditions) occur."
      }
    ]
  },
  {
    "id": "zh_并非_504",
    "language": "zh",
    "pattern": "并非",
    "title": "并非 (not)",
    "shortExplanation": "not",
    "longExplanation": "not. Pinyin: bìngfēi",
    "formation": "bìngfēi",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "成功有时候并非想象中那么难。",
        "romanization": "chénggōng yǒushíhou bìngfēi xiǎngxiàng zhōng nàme nán。",
        "translation": "Success is sometimes not as difficult as it might seem."
      }
    ]
  },
  {
    "id": "zh_以_505",
    "language": "zh",
    "pattern": "以",
    "title": "以 ((see 4.14.2 “以”))",
    "shortExplanation": "(see 4.14.2 “以”)",
    "longExplanation": "(see 4.14.2 “以”). Pinyin: yǐ",
    "formation": "yǐ",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "-",
        "romanization": "-",
        "translation": "-"
      }
    ]
  },
  {
    "id": "zh_平常_506",
    "language": "zh",
    "pattern": "平常",
    "title": "平常 (ordinary)",
    "shortExplanation": "ordinary",
    "longExplanation": "ordinary. Pinyin: píngcháng",
    "formation": "píngcháng",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "对小王来说，今天是一个不平常的日子。",
        "romanization": "duì xiǎo wáng láishuō， jīntiān shì yī gè bùpíngcháng de rìzi。",
        "translation": "For Xiao Wang, today is an extraordinary day."
      }
    ]
  },
  {
    "id": "zh_平常_507",
    "language": "zh",
    "pattern": "平常",
    "title": "平常 (usually)",
    "shortExplanation": "usually",
    "longExplanation": "usually. Pinyin: píngcháng",
    "formation": "píngcháng",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "他平常总是来得很早，今天却迟到了。",
        "romanization": "tā píngcháng zǒngshì lái dehěn zǎo， jīntiān què chí dàoliǎo。",
        "translation": "He usually comes very early, but he is late today."
      }
    ]
  },
  {
    "id": "zh_宁可_508",
    "language": "zh",
    "pattern": "宁可",
    "title": "宁可 (would rather)",
    "shortExplanation": "would rather",
    "longExplanation": "would rather. Pinyin: nìngkě",
    "formation": "nìngkě",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "作为母亲，她宁可自已累一点儿，也不想委屈了孩子。",
        "romanization": "zuòwéi mǔqīn， tā nìngkě zì yǐ lèi yīdiǎnr， yě bùxiǎng wěiqu le háizi。",
        "translation": "As a mother, she would rather be tired of herself and would not want to wrong her child."
      }
    ]
  },
  {
    "id": "zh_极其_509",
    "language": "zh",
    "pattern": "极其",
    "title": "极其 (extremely)",
    "shortExplanation": "extremely",
    "longExplanation": "extremely. Pinyin: jíqí",
    "formation": "jíqí",
    "level": "HSK 5",
    "examples": []
  },
  {
    "id": "zh_其余_511",
    "language": "zh",
    "pattern": "其余",
    "title": "其余 (the rest)",
    "shortExplanation": "the rest",
    "longExplanation": "the rest. Pinyin: qíyú",
    "formation": "qíyú",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "怎么只有你们两个人？其余的同学呢？",
        "romanization": "zěnme zhǐyǒu nǐmen liǎng gèrén？ qíyú de tóngxué ne？",
        "translation": "How come you two people? What about the rest of the classmates?"
      }
    ]
  },
  {
    "id": "zh_由此可见_512",
    "language": "zh",
    "pattern": "(由此) 可见",
    "title": "(由此) 可见 (This shows that)",
    "shortExplanation": "This shows that",
    "longExplanation": "This shows that. Pinyin: ( yóucǐ) kějiàn",
    "formation": "( yóucǐ) kějiàn",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "由此可见，成功是需要努力的。",
        "romanization": "yóucǐkějiàn， chénggōng shì xūyào nǔlì de。",
        "translation": "This shows that success requires hard work."
      }
    ]
  },
  {
    "id": "zh_N般_513",
    "language": "zh",
    "pattern": "N 般",
    "title": "N 般 (like N)",
    "shortExplanation": "like N",
    "longExplanation": "like N. Pinyin: N bān",
    "formation": "N bān",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "她的脸上露出了阳光般的笑容。",
        "romanization": "tā de liǎn shàng lùchū le yángguāng bān de xiàoróng。",
        "translation": "Her face showed a sunny (lit. like sunlight) smile."
      }
    ]
  },
  {
    "id": "zh_闻_514",
    "language": "zh",
    "pattern": "闻",
    "title": "闻 (to smell)",
    "shortExplanation": "to smell",
    "longExplanation": "to smell. Pinyin: wén",
    "formation": "wén",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "他把壶盖儿打开，闻了闻，原来是酒。",
        "romanization": "tā bǎ hú gàir dǎkāi， wén le wén， yuánlái shì jiǔ。",
        "translation": "He opened the lid of the pot and smelled it. It turned out to be alcohol."
      }
    ]
  },
  {
    "id": "zh_闻_515",
    "language": "zh",
    "pattern": "闻",
    "title": "闻 (to hear)",
    "shortExplanation": "to hear",
    "longExplanation": "to hear. Pinyin: wén",
    "formation": "wén",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "百闻不如一见。",
        "romanization": "bǎiwénbùrúyījiàn。",
        "translation": "Seeing is believing. (Lit. hearing about something 100 times is not as good as seeing it once.)"
      }
    ]
  },
  {
    "id": "zh_趁_516",
    "language": "zh",
    "pattern": "趁",
    "title": "趁 (while (an opportunity exists))",
    "shortExplanation": "while (an opportunity exists)",
    "longExplanation": "while (an opportunity exists). Pinyin: chèn",
    "formation": "chèn",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "趁电影还没开始，我去买两瓶矿泉水。",
        "romanization": "chèn diànyǐng hái méi kāishǐ， wǒ qù mǎi liǎng píng kuàngquánshuǐ。",
        "translation": "The movie hasn’t started, I’ll make use of the opportunity and get two bottles of mineral water."
      }
    ]
  },
  {
    "id": "zh_V不起_517",
    "language": "zh",
    "pattern": "V 不起",
    "title": "V 不起 (cannot)",
    "shortExplanation": "cannot",
    "longExplanation": "cannot. Pinyin: V bù qǐ",
    "formation": "V bù qǐ",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "他家里很穷，买不起灯，一到晚上就不能读书。",
        "romanization": "tā jiālǐ hěn qióng， mǎibuqǐ dēng， yī dào wǎnshang jiù bùnéng dúshū。",
        "translation": "His family is very poor and can't afford a lamp, [so he] can’t read at night."
      }
    ]
  },
  {
    "id": "zh_V得起_518",
    "language": "zh",
    "pattern": "V 得起",
    "title": "V 得起 (can stand/tolerate)",
    "shortExplanation": "can stand/tolerate",
    "longExplanation": "can stand/tolerate. Pinyin: V dé qǐ",
    "formation": "V dé qǐ",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "经得起时间考验的朋友才算是真正的朋友。",
        "romanization": "jīngdeqǐ shíjiān kǎoyàn de péngyou cái suànshì zhēnzhèng de péngyou。",
        "translation": "A friend who can stand the test of time is a true friend."
      }
    ]
  },
  {
    "id": "zh_支_519",
    "language": "zh",
    "pattern": "支",
    "title": "支 (to prop up, to support)",
    "shortExplanation": "to prop up, to support",
    "longExplanation": "to prop up, to support. Pinyin: zhī",
    "formation": "zhī",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "他的两只手放在桌上，支着脑袋，想着事情。",
        "romanization": "tā de liǎng zhǐ shǒu fàng zài zhuō shàng， zhī zhe nǎodài， xiǎng zhe shìqing。",
        "translation": "His two hands were on the table, propping up his head, and he thought about things."
      }
    ]
  },
  {
    "id": "zh_支_520",
    "language": "zh",
    "pattern": "支",
    "title": "支 ((measure word for guns, songs, or armies))",
    "shortExplanation": "(measure word for guns, songs, or armies)",
    "longExplanation": "(measure word for guns, songs, or armies). Pinyin: zhī",
    "formation": "zhī",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "给他十支枪，他就能拉起一支军队来。",
        "romanization": "gěi tā shí zhī qiāng， tā jiù néng lā qǐ yī zhī jūnduì lái。",
        "translation": "Give him ten guns and he can raise an army."
      }
    ]
  },
  {
    "id": "zh_凭_521",
    "language": "zh",
    "pattern": "凭",
    "title": "凭 (to reply on)",
    "shortExplanation": "to reply on",
    "longExplanation": "to reply on. Pinyin: píng",
    "formation": "píng",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "干工作不能光凭经验，还要有创新。",
        "romanization": "gàn gōngzuò bùnéng guāng píng jīngyàn， hái yàoyǒu chuàngxīn。",
        "translation": "When we work, we can’t just rely on experience, we also need to innovate."
      }
    ]
  },
  {
    "id": "zh_硬V_522",
    "language": "zh",
    "pattern": "硬 V",
    "title": "硬 V (by brute force)",
    "shortExplanation": "by brute force",
    "longExplanation": "by brute force. Pinyin: yìng V",
    "formation": "yìng V",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "虽然中药有点儿苦，但他还是硬喝下去了。",
        "romanization": "suīrán Zhōngyào yǒudiǎnr kǔ， dàn tā háishi yìng hē xiàqù le。",
        "translation": "Although the Chinese medicine is a bit bitter, he still bit the bullet and drank it."
      }
    ]
  },
  {
    "id": "zh_硬V_523",
    "language": "zh",
    "pattern": "硬 V",
    "title": "硬 V (to insist on V-ing)",
    "shortExplanation": "to insist on V-ing",
    "longExplanation": "to insist on V-ing. Pinyin: yìng V",
    "formation": "yìng V",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "我不让他去，他硬要去。",
        "romanization": "wǒ bù ràng tā qù， tā yìngyào qù。",
        "translation": "I won’t let him go, he just insists on going."
      }
    ]
  },
  {
    "id": "zh_偶然的_524",
    "language": "zh",
    "pattern": "偶然的",
    "title": "偶然的 (accidental (opportunity))",
    "shortExplanation": "accidental (opportunity)",
    "longExplanation": "accidental (opportunity). Pinyin: ǒurán de",
    "formation": "ǒurán de",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "那是一次偶然的相遇。",
        "romanization": "nàshi yīcì ǒurán de xiāngyù。",
        "translation": "It was an accidental encounter."
      }
    ]
  },
  {
    "id": "zh_偶然V_525",
    "language": "zh",
    "pattern": "偶然 V",
    "title": "偶然 V (occasionally)",
    "shortExplanation": "occasionally",
    "longExplanation": "occasionally. Pinyin: ǒurán V",
    "formation": "ǒurán V",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "她专心地织着毛衣，偶然也会抬眼看一下墙上的挂钟。",
        "romanization": "tā zhuānxīn dì zhī zhe máoyī， ǒurán yě huì tái yǎnkàn yīxià qiáng shàng de guàzhōng。",
        "translation": "She focused on knitting a sweater, and occasionally glances at the clock on the wall."
      }
    ]
  },
  {
    "id": "zh_尽快V_526",
    "language": "zh",
    "pattern": "尽快 V",
    "title": "尽快 V (as soon as possible)",
    "shortExplanation": "as soon as possible",
    "longExplanation": "as soon as possible. Pinyin: jǐnkuài V",
    "formation": "jǐnkuài V",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "新产品出了点儿问题，你和严经理尽快商量一下这事。",
        "romanization": "xīnchǎnpǐn chū le diǎnr wèntí， nǐ hé yán jīnglǐ jǐnkuài shāngliang yīxià zhè shì。",
        "translation": "The new product has some problems. You should discuss with Manager Yan as soon as you can."
      }
    ]
  },
  {
    "id": "zh_一旦V_527",
    "language": "zh",
    "pattern": "一旦 V",
    "title": "一旦 V (once (something happens))",
    "shortExplanation": "once (something happens)",
    "longExplanation": "once (something happens). Pinyin: yīdàn V",
    "formation": "yīdàn V",
    "level": "HSK 5",
    "examples": []
  },
  {
    "id": "zh_难免_529",
    "language": "zh",
    "pattern": "难免",
    "title": "难免 (inevitable)",
    "shortExplanation": "inevitable",
    "longExplanation": "inevitable. Pinyin: nánmiǎn",
    "formation": "nánmiǎn",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "刚开始工作，这样的错误是难免的。",
        "romanization": "gāng kāishǐ gōngzuò， zhèyàng de cuòwù shì nánmiǎn de。",
        "translation": "At the beginning of work, such mistakes are inevitable."
      }
    ]
  },
  {
    "id": "zh_自从TIME_530",
    "language": "zh",
    "pattern": "自从 TIME",
    "title": "自从 TIME (since TIME)",
    "shortExplanation": "since TIME",
    "longExplanation": "since TIME. Pinyin: zìcóng TIME",
    "formation": "zìcóng TIME",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "自从我到北京以后，身体越来越好了。",
        "romanization": "zìcóng wǒ dào Běijīng yǐhòu， shēntǐ yuèláiyuè hǎole。",
        "translation": "Since I arrived in Beijing, my body has gotten better and better."
      }
    ]
  },
  {
    "id": "zh_一致_531",
    "language": "zh",
    "pattern": "一致",
    "title": "一致 (in agreement)",
    "shortExplanation": "in agreement",
    "longExplanation": "in agreement. Pinyin: yīzhì",
    "formation": "yīzhì",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "他们的意见不一致。",
        "romanization": "tāmen de yìjiàn bù yīzhì。",
        "translation": "Their opinions do not agree."
      }
    ]
  },
  {
    "id": "zh_一致V_532",
    "language": "zh",
    "pattern": "一致 V",
    "title": "一致 V (unanimously)",
    "shortExplanation": "unanimously",
    "longExplanation": "unanimously. Pinyin: yīzhì V",
    "formation": "yīzhì V",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "专家们一致认为这是一种成功的产品。",
        "romanization": "zhuānjiā men yīzhì rènwéi zhè shì yīzhǒng chénggōng de chǎnpǐn。",
        "translation": "Experts agree (lit. unanimously think) that this is a successful product."
      }
    ]
  },
  {
    "id": "zh_某MN_533",
    "language": "zh",
    "pattern": "某 (M) N",
    "title": "某 (M) N (certain)",
    "shortExplanation": "certain",
    "longExplanation": "certain. Pinyin: mǒu (M) N",
    "formation": "mǒu (M) N",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "进行某(个)方面的训练，就可以在那方面的能力提高。",
        "romanization": "jìnxíng mǒu( gè) fāngmiàn de xùnliàn， jiù kěyǐ zài nà fāngmiàn de nénglì tígāo。",
        "translation": "If you receiving training in a certain discipline (lit. aspect), you will be able to improve your ability in that discipline."
      }
    ]
  },
  {
    "id": "zh_某某_534",
    "language": "zh",
    "pattern": "某某",
    "title": "某某 (so-and-so)",
    "shortExplanation": "so-and-so",
    "longExplanation": "so-and-so. Pinyin: mǒumǒu",
    "formation": "mǒumǒu",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "在墙上写“某某到此一游”的行为是不文明的。",
        "romanization": "zài qiáng shàng xiě“ mǒumǒu dàocǐyīyóu” de xíngwéi shì bù wénmíng de。",
        "translation": "It is not civil to write “so-and-so visited here” on the wall."
      }
    ]
  },
  {
    "id": "zh_name某某某_535",
    "language": "zh",
    "pattern": "name 某/某某",
    "title": "name 某/某某 (placeholder for a name)",
    "shortExplanation": "placeholder for a name",
    "longExplanation": "placeholder for a name. Pinyin: name mǒu/ mǒumǒu",
    "formation": "name mǒu/ mǒumǒu",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "公司业务员李某/李某某闻之大喜。",
        "romanization": "gōngsī yèwùyuán lǐ mǒu/ lǐ mǒumǒu wén zhī dàxǐ。",
        "translation": "Company salesman Li (So-and-so) heard the big joy."
      }
    ]
  },
  {
    "id": "zh_幸亏_536",
    "language": "zh",
    "pattern": "幸亏……",
    "title": "幸亏…… (thankfully…)",
    "shortExplanation": "thankfully…",
    "longExplanation": "thankfully…. Pinyin: xìngkuī……",
    "formation": "xìngkuī……",
    "level": "HSK 5",
    "examples": []
  },
  {
    "id": "zh_行动_538",
    "language": "zh",
    "pattern": "行动",
    "title": "行动 (activity, action)",
    "shortExplanation": "activity, action",
    "longExplanation": "activity, action. Pinyin: xíngdòng",
    "formation": "xíngdòng",
    "level": "HSK 5",
    "examples": []
  },
  {
    "id": "zh_行动_540",
    "language": "zh",
    "pattern": "行动",
    "title": "行动 (move around)",
    "shortExplanation": "move around",
    "longExplanation": "move around. Pinyin: xíngdòng",
    "formation": "xíngdòng",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "他运动时受伤了，行动不便。",
        "romanization": "tā yùndòng shí shòushāng le， xíngdòngbùbiàn。",
        "translation": "When he was doing sports he injured his feet, so it’s hard for him to move around."
      }
    ]
  },
  {
    "id": "zh_行动_541",
    "language": "zh",
    "pattern": "行动",
    "title": "行动 (act)",
    "shortExplanation": "act",
    "longExplanation": "act. Pinyin: xíngdòng",
    "formation": "xíngdòng",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "有些鸟类喜欢单独行动。",
        "romanization": "yǒuxiē niǎolèi xǐhuan dāndú xíngdòng。",
        "translation": "Some birds like to act alone."
      }
    ]
  },
  {
    "id": "zh_义务_542",
    "language": "zh",
    "pattern": "义务",
    "title": "义务 (obligation)",
    "shortExplanation": "obligation",
    "longExplanation": "obligation. Pinyin: yìwù",
    "formation": "yìwù",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "建设家乡，人人有责，我们也要承担这个义务。",
        "romanization": "jiànshè jiāxiāng， rénrényǒuzé， wǒmen yě yào chéngdān zhège yìwù。",
        "translation": "Everyone has the responsibility of building his/her hometown, and we should also take up this obligation."
      }
    ]
  },
  {
    "id": "zh_义务_543",
    "language": "zh",
    "pattern": "义务",
    "title": "义务 (compulsory)",
    "shortExplanation": "compulsory",
    "longExplanation": "compulsory. Pinyin: yìwù",
    "formation": "yìwù",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "我们每个学期都要至少参加三次义务劳动。",
        "romanization": "wǒmen měi gè xuéqī dōu yào zhìshǎo cānjiā sāncì yìwù láodòng。",
        "translation": "We must participate in at least three compulsory labor per semester."
      }
    ]
  },
  {
    "id": "zh_朝_544",
    "language": "zh",
    "pattern": "朝",
    "title": "朝 (toward)",
    "shortExplanation": "toward",
    "longExplanation": "toward. Pinyin: cháo",
    "formation": "cháo",
    "level": "HSK 5",
    "examples": []
  },
  {
    "id": "zh_朝_546",
    "language": "zh",
    "pattern": "朝",
    "title": "朝 (to face toward)",
    "shortExplanation": "to face toward",
    "longExplanation": "to face toward. Pinyin: cháo",
    "formation": "cháo",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "我们学校的正门坐西朝东。",
        "romanization": "wǒmen xuéxiào de zhèngmén zuò xī cháo dōng。",
        "translation": "The main entrance of our school is situated in the west and oriented toward the east."
      }
    ]
  },
  {
    "id": "zh_简直_547",
    "language": "zh",
    "pattern": "简直",
    "title": "简直 (practically, in essence)",
    "shortExplanation": "practically, in essence",
    "longExplanation": "practically, in essence. Pinyin: jiǎnzhí",
    "formation": "jiǎnzhí",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "船长简直是疯了！",
        "romanization": "chuánzhǎng jiǎnzhí shì fēng le！",
        "translation": "The captain is practically mad!"
      }
    ]
  },
  {
    "id": "zh_来_548",
    "language": "zh",
    "pattern": "来",
    "title": "来 (over)",
    "shortExplanation": "over",
    "longExplanation": "over. Pinyin: lái",
    "formation": "lái",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "他几乎每天都能钓到5斤来重的大鱼。",
        "romanization": "tā jīhū měitiān dōu néng diào dào5 jīn lái zhòng de dà yú。",
        "translation": "He can catch over 5 pounds (weight) of fish almost every day."
      }
    ]
  },
  {
    "id": "zh_一来是二来是_549",
    "language": "zh",
    "pattern": "一来(是)……二来(是)……",
    "title": "一来(是)……二来(是)…… (First… secondly…)",
    "shortExplanation": "First… secondly…",
    "longExplanation": "First… secondly…. Pinyin: yīlái( shì)…… èrlái( shì)……",
    "formation": "yīlái( shì)…… èrlái( shì)……",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "我到这里看看大家，一(来)是给大家送水果，二(来)是看看大家过节还有什么难处。",
        "romanization": "wǒ dào zhèlǐ kànkan dàjiā， yī( lái) shì gěi dàjiā sòng shuǐguǒ， èr( lái) shì kànkan dàjiā guòjié háiyǒu shénme nánchu。",
        "translation": "I am here to see everyone, one [reason] is to bring fruit to everyone, another [reason] is to see if anyone has any difficulties over the holidays."
      }
    ]
  },
  {
    "id": "zh_至于_550",
    "language": "zh",
    "pattern": "至于",
    "title": "至于 (as for)",
    "shortExplanation": "as for",
    "longExplanation": "as for. Pinyin: zhìyú",
    "formation": "zhìyú",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "我们决定明年结婚，至于具体时间还要再商量。",
        "romanization": "wǒmen juédìng míngnián jiéhūn， zhìyú jùtǐ shíjiān hái yào zài shāngliang。",
        "translation": "We decided to get married next year. As for the specific time, we’ll have to discuss later."
      }
    ]
  },
  {
    "id": "zh_至于_551",
    "language": "zh",
    "pattern": "至于",
    "title": "至于 (go so far as)",
    "shortExplanation": "go so far as",
    "longExplanation": "go so far as. Pinyin: zhìyú",
    "formation": "zhìyú",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "他不至于撒谎。",
        "romanization": "tā bùzhìyú sāhuǎng。",
        "translation": "He won’t go so far as to tell a lie."
      }
    ]
  },
  {
    "id": "zh_总算_552",
    "language": "zh",
    "pattern": "总算",
    "title": "总算 (finally)",
    "shortExplanation": "finally",
    "longExplanation": "finally. Pinyin: zǒngsuàn",
    "formation": "zǒngsuàn",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "经过沟通，大导演总算搞明白了。",
        "romanization": "jīngguò gōutōng， dà dǎoyǎn zǒngsuàn gǎo míngbai le。",
        "translation": "After communicating, the principal director has finally figured it out."
      }
    ]
  },
  {
    "id": "zh_总算_553",
    "language": "zh",
    "pattern": "总算",
    "title": "总算 (finally)",
    "shortExplanation": "finally",
    "longExplanation": "finally. Pinyin: zǒngsuàn",
    "formation": "zǒngsuàn",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "虽然这家宾馆不太好，但总算有个睡觉的地方了。",
        "romanization": "suīrán zhè jiā bīnguǎn bùtàihǎo， dàn zǒngsuàn yǒu gè shuìjiào de dìfang le。",
        "translation": "Although this hotel is not very good, there is finally a place to sleep."
      }
    ]
  },
  {
    "id": "zh_V下来_554",
    "language": "zh",
    "pattern": "V 下来",
    "title": "V 下来 (V down)",
    "shortExplanation": "V down",
    "longExplanation": "V down. Pinyin: V xiàlai",
    "formation": "V xiàlai",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "你的论文大概什么时候发表？定下来了吗？",
        "romanization": "nǐ de lùnwén dàgài shénmeshíhou fābiǎo？ dìng xiàlai le ma？",
        "translation": "When will your paper be published? Have you decided (lit. decided down)?"
      }
    ]
  },
  {
    "id": "zh_舍得_555",
    "language": "zh",
    "pattern": "舍得",
    "title": "舍得 (willing (to to let go))",
    "shortExplanation": "willing (to to let go)",
    "longExplanation": "willing (to to let go). Pinyin: shěde",
    "formation": "shěde",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "把你最喜欢的玩具送给小朋友，你舍得吗？",
        "romanization": "bǎ nǐ zuì xǐhuan de wánjù sònggěi xiǎopéngyǒu， nǐ shěde ma？",
        "translation": "Give your favorite toys to children, are you willing (to let go)?"
      }
    ]
  },
  {
    "id": "zh_舍不得_556",
    "language": "zh",
    "pattern": "舍不得",
    "title": "舍不得 (unwilling (to to let go))",
    "shortExplanation": "unwilling (to to let go)",
    "longExplanation": "unwilling (to to let go). Pinyin: shěbude",
    "formation": "shěbude",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "有些人舍不得把钱花在有意思的事情上。",
        "romanization": "yǒuxiērén shěbude bǎ qián huā zài yǒuyìsi de shìqing shàng。",
        "translation": "Some people are reluctant to spend money on fun things."
      }
    ]
  },
  {
    "id": "zh_从此_557",
    "language": "zh",
    "pattern": "从此",
    "title": "从此 (since then)",
    "shortExplanation": "since then",
    "longExplanation": "since then. Pinyin: cóngcǐ",
    "formation": "cóngcǐ",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "从此李白刻苦用功，最后成了一位伟大的诗人。",
        "romanization": "cóngcǐ Lǐ Bái kèkǔ yònggōng， zuìhòu chéngle yī wèi wěidà de shīrén。",
        "translation": "Since then, Li Bai has worked hard and finally became a great poet."
      }
    ]
  },
  {
    "id": "zh_假设_558",
    "language": "zh",
    "pattern": "假设……",
    "title": "假设…… (suppose …)",
    "shortExplanation": "suppose …",
    "longExplanation": "suppose …. Pinyin: jiǎshè……",
    "formation": "jiǎshè……",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "假设你的钱用完了呢？你该怎么办呢？",
        "romanization": "jiǎshè nǐ de qián yòng wánle ne？ nǐ gāi zěnmebàn ne？",
        "translation": "Suppose your money is running out? What would you do?"
      }
    ]
  },
  {
    "id": "zh_假设_559",
    "language": "zh",
    "pattern": "假设",
    "title": "假设 (supposition)",
    "shortExplanation": "supposition",
    "longExplanation": "supposition. Pinyin: jiǎshè",
    "formation": "jiǎshè",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "您当年的假设已经被证明是对的。",
        "romanization": "nín dāngnián de jiǎshè yǐjīng bèi zhèngmíng shì duì de。",
        "translation": "Your assumptions for the year have been proven to be correct."
      }
    ]
  },
  {
    "id": "zh_堆_560",
    "language": "zh",
    "pattern": "堆",
    "title": "堆 (a pile, a heap)",
    "shortExplanation": "a pile, a heap",
    "longExplanation": "a pile, a heap. Pinyin: duī",
    "formation": "duī",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "工厂旁边有一个建筑材料堆。",
        "romanization": "gōngchǎng pángbiān yǒu yī gè jiànzhù cáiliào duī。",
        "translation": "There is a pile of building materials next to the factory."
      }
    ]
  },
  {
    "id": "zh_堆_561",
    "language": "zh",
    "pattern": "堆",
    "title": "堆 (to pile, to heap)",
    "shortExplanation": "to pile, to heap",
    "longExplanation": "to pile, to heap. Pinyin: duī",
    "formation": "duī",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "这些零件怎么都堆在这儿啊？",
        "romanization": "zhèxiē língjiàn zěnme dōu duī zài zhèr ā？",
        "translation": "How are these parts piled up here?"
      }
    ]
  },
  {
    "id": "zh_不如NA_562",
    "language": "zh",
    "pattern": "不如 N A",
    "title": "不如 N A (not as A as N)",
    "shortExplanation": "not as A as N",
    "longExplanation": "not as A as N. Pinyin: bùrú N A",
    "formation": "bùrú N A",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "三家的营业额加起来还不如他一家高。",
        "romanization": "sān jiāde yíngyè'é jiā qilai háibùrú tā yījiā gāo。",
        "translation": "The turnover of the three companies is not as high as his family."
      }
    ]
  },
  {
    "id": "zh_与其不如_563",
    "language": "zh",
    "pattern": "(与其)……不如……",
    "title": "(与其)……不如…… (rather than… it’s better to)",
    "shortExplanation": "rather than… it’s better to",
    "longExplanation": "rather than… it’s better to. Pinyin: ( yǔqí)…… bùrú……",
    "formation": "( yǔqí)…… bùrú……",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "与其待在家里，不如去外边走走。",
        "romanization": "yǔqí dài zài jiālǐ， bùrú qù wàibian zǒu zǒu。",
        "translation": "Instead of staying at home, it is better to go outside."
      }
    ]
  },
  {
    "id": "zh_干脆V_564",
    "language": "zh",
    "pattern": "干脆 V",
    "title": "干脆 V (simply, quick and dirty)",
    "shortExplanation": "simply, quick and dirty",
    "longExplanation": "simply, quick and dirty. Pinyin: gāncuì V",
    "formation": "gāncuì V",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "许多亲朋好友建议他干脆把另三家书店挤垮。",
        "romanization": "xǔduō qīnpénghǎoyǒu jiànyì tā gāncuì bǎ lìng sān jiā shūdiàn jǐkuǎ。",
        "translation": "Many relatives and friends suggested that he simply “squeeze out” the other three bookstores, [quick and dirty]. [That its, drive them out of their business.]"
      }
    ]
  },
  {
    "id": "zh_干脆_565",
    "language": "zh",
    "pattern": "干脆",
    "title": "干脆 (decisive)",
    "shortExplanation": "decisive",
    "longExplanation": "decisive. Pinyin: gāncuì",
    "formation": "gāncuì",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "我求他帮忙，他答应得很干脆。",
        "romanization": "wǒ qiú tā bāngmáng， tā dāying dehěn gāncuì。",
        "translation": "I asked him for help, and he readily agreed."
      }
    ]
  },
  {
    "id": "zh_万一_566",
    "language": "zh",
    "pattern": "万一",
    "title": "万一 (in the unlikely case where)",
    "shortExplanation": "in the unlikely case where",
    "longExplanation": "in the unlikely case where. Pinyin: wànyī",
    "formation": "wànyī",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "如果鸡蛋都放在一个篮子里，万一不小心就有可能全部打碎。",
        "romanization": "rúguǒ jīdàn dōu fàng zài yī gè lánzi lǐ， wànyī bù xiǎoxīn jiù yǒukěnéng quánbù dǎsuì。",
        "translation": "If all [your] eggs are placed in one basket, should an accident happen they would all be crushed."
      }
    ]
  },
  {
    "id": "zh_万一_567",
    "language": "zh",
    "pattern": "万一",
    "title": "万一 (unlikely case, mishap)",
    "shortExplanation": "unlikely case, mishap",
    "longExplanation": "unlikely case, mishap. Pinyin: wànyī",
    "formation": "wànyī",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "不怕一万，就怕万一。",
        "romanization": "bùpà yī wàn， jiù pà wànyī。",
        "translation": "We’re not afraid of the usual, just the unexpected mishap."
      }
    ]
  },
  {
    "id": "zh_无意中无意地_568",
    "language": "zh",
    "pattern": "无意中/无意地",
    "title": "无意中/无意地 (accidentally)",
    "shortExplanation": "accidentally",
    "longExplanation": "accidentally. Pinyin: wúyìzhōng/ wúyì dì",
    "formation": "wúyìzhōng/ wúyì dì",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "她在收拾花园时，无意中/无意地找到了这只耳环。",
        "romanization": "tā zài shōushi huāyuán shí， wúyìzhōng/ wúyì dì zhǎo dàoliǎo zhè zhǐ ěrhuán。",
        "translation": "When she was cleaning up the garden, she accidentally found this earring."
      }
    ]
  },
  {
    "id": "zh_无意_569",
    "language": "zh",
    "pattern": "无意",
    "title": "无意 (no intention to)",
    "shortExplanation": "no intention to",
    "longExplanation": "no intention to. Pinyin: wúyì",
    "formation": "wúyì",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "他无意伤害任何人。",
        "romanization": "tā wúyì shānghài rènhé rén。",
        "translation": "He has no intention to hurt anyone."
      }
    ]
  },
  {
    "id": "zh_有利_570",
    "language": "zh",
    "pattern": "有利",
    "title": "有利 (to be beneficial)",
    "shortExplanation": "to be beneficial",
    "longExplanation": "to be beneficial. Pinyin: yǒulì",
    "formation": "yǒulì",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "适度的压力有利于我们保持良好的状态。",
        "romanization": "shìdù de yālì yǒulì yú wǒmen bǎochí liánghǎo de zhuàngtài。",
        "translation": "Moderate pressure helps us stay in good shape."
      }
    ]
  },
  {
    "id": "zh_的确_571",
    "language": "zh",
    "pattern": "的确",
    "title": "的确 (indeed)",
    "shortExplanation": "indeed",
    "longExplanation": "indeed. Pinyin: díquè",
    "formation": "díquè",
    "level": "HSK 5",
    "examples": []
  },
  {
    "id": "zh_嗯_573",
    "language": "zh",
    "pattern": "嗯",
    "title": "嗯 (Yep)",
    "shortExplanation": "Yep",
    "longExplanation": "Yep. Pinyin: èn",
    "formation": "èn",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "A：吃了吗？B：嗯，吃了。",
        "romanization": "A： chī le ma？B： èn， chī le。",
        "translation": "A: Have you eaten? B: Yep, I did."
      }
    ]
  },
  {
    "id": "zh_嗯_574",
    "language": "zh",
    "pattern": "嗯？",
    "title": "嗯？ (Huh?)",
    "shortExplanation": "Huh?",
    "longExplanation": "Huh?. Pinyin: èn？",
    "formation": "èn？",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "嗯？难道是我记错了？",
        "romanization": "èn？ nándào shì wǒ jì cuò le？",
        "translation": "Hmm… Is it that I remember correctly?"
      }
    ]
  },
  {
    "id": "zh_嗯_575",
    "language": "zh",
    "pattern": "嗯！",
    "title": "嗯！ (Man…!)",
    "shortExplanation": "Man…!",
    "longExplanation": "Man…!. Pinyin: èn！",
    "formation": "èn！",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "嗯！你怎么还没走啊？",
        "romanization": "èn！ nǐ zěnme hái méi zǒu ā？",
        "translation": "(Man…) Why haven't you left yet?"
      }
    ]
  },
  {
    "id": "zh_轻易地V_576",
    "language": "zh",
    "pattern": "轻易地 V",
    "title": "轻易地 V (easily)",
    "shortExplanation": "easily",
    "longExplanation": "easily. Pinyin: qīngyì dì V",
    "formation": "qīngyì dì V",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "他学什么都可以很轻易地记住。",
        "romanization": "tā xué shénme dōu kěyǐ hěn qīngyì dì jìzhu。",
        "translation": "What he can learn can be easily remembered."
      }
    ]
  },
  {
    "id": "zh_轻易V_577",
    "language": "zh",
    "pattern": "轻易 V",
    "title": "轻易 V (frivolously)",
    "shortExplanation": "frivolously",
    "longExplanation": "frivolously. Pinyin: qīngyì V",
    "formation": "qīngyì V",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "他从不轻易决定，决定了就不轻易转变。",
        "romanization": "tā cóngbù qīngyì juédìng， juédìng le jiù bù qīngyì zhuǎnbiàn。",
        "translation": "He never decided easily, and he decided not to change easily."
      }
    ]
  },
  {
    "id": "zh_密切_578",
    "language": "zh",
    "pattern": "密切",
    "title": "密切 (closely)",
    "shortExplanation": "closely",
    "longExplanation": "closely. Pinyin: mìqiè",
    "formation": "mìqiè",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "污染和我们的日常生活密切相关。",
        "romanization": "wūrǎn hé wǒmen de rìcháng shēnghuó mìqièxiāngguān。",
        "translation": "Pollution is closely related to our daily lives."
      }
    ]
  },
  {
    "id": "zh_密切_579",
    "language": "zh",
    "pattern": "密切",
    "title": "密切 (close (in relationship))",
    "shortExplanation": "close (in relationship)",
    "longExplanation": "close (in relationship). Pinyin: mìqiè",
    "formation": "mìqiè",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "从此，两人来往比先前密切了。",
        "romanization": "cóngcǐ， liǎng rén láiwǎng bǐ xiānqián mìqiè le。",
        "translation": "Since then, the two have been closer than [ever] before."
      }
    ]
  },
  {
    "id": "zh_密切_580",
    "language": "zh",
    "pattern": "密切",
    "title": "密切 (to strengthen)",
    "shortExplanation": "to strengthen",
    "longExplanation": "to strengthen. Pinyin: mìqiè",
    "formation": "mìqiè",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "这条铁路大大密切了西南地区与首都的联系。",
        "romanization": "zhè tiáo tiělù dàdà mìqiè le xīnán dìqū yǔ shǒudū de liánxì。",
        "translation": "This railway has greatly strengthened the connection between the southwest and the capital."
      }
    ]
  },
  {
    "id": "zh_尽量jnling_581",
    "language": "zh",
    "pattern": "尽量 (jǐnliàng)",
    "title": "尽量 (jǐnliàng) (as … as possible)",
    "shortExplanation": "as … as possible",
    "longExplanation": "as … as possible. Pinyin: jǐnliàng (jǐnliàng)",
    "formation": "jǐnliàng (jǐnliàng)",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "尽量多骑自行车，多选择公共交通。",
        "romanization": "jǐnliàng duō qí zìxíngchē， duō xuǎnzé gōnggòngjiāotōng。",
        "translation": "Try to cycle as much as possible, and choose [to use] public transportation as much as possible."
      }
    ]
  },
  {
    "id": "zh_逐步_582",
    "language": "zh",
    "pattern": "逐步",
    "title": "逐步 (step by step)",
    "shortExplanation": "step by step",
    "longExplanation": "step by step. Pinyin: zhúbù",
    "formation": "zhúbù",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "调整能源消费结构，逐步向可再生能源转变。",
        "romanization": "tiáozhěng néngyuán xiāofèi jiégòu， zhúbù xiàng kězàishēng néngyuán zhuǎnbiàn。",
        "translation": "Adjust energy consumption structure and gradually shift to renewable energy."
      }
    ]
  },
  {
    "id": "zh_照常_583",
    "language": "zh",
    "pattern": "照常",
    "title": "照常 (as usual)",
    "shortExplanation": "as usual",
    "longExplanation": "as usual. Pinyin: zhàocháng",
    "formation": "zhàocháng",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "虽然战争临近，但这里的日常生活，一切照常。",
        "romanization": "suīrán zhànzhēng línjìn， dàn zhèlǐ de rìcháng shēnghuó， yīqiè zhàocháng。",
        "translation": "Although the war is approaching, everyday life here is as usual."
      }
    ]
  },
  {
    "id": "zh_难怪怪不得_584",
    "language": "zh",
    "pattern": "难怪/怪不得",
    "title": "难怪/怪不得 (no wonder)",
    "shortExplanation": "no wonder",
    "longExplanation": "no wonder. Pinyin: nánguài/ guàibude",
    "formation": "nánguài/ guàibude",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "你的抽屉真乱，难怪/怪不得总是找不到东西。",
        "romanization": "nǐ de chōuti zhēn luàn， nánguài/ guàibude zǒngshì zhǎobudào dōngxi。",
        "translation": "Your drawer is really messy, no wonder you can never find [your] things."
      }
    ]
  },
  {
    "id": "zh_难怪怪不得_585",
    "language": "zh",
    "pattern": "难怪/怪不得",
    "title": "难怪/怪不得 (understandable)",
    "shortExplanation": "understandable",
    "longExplanation": "understandable. Pinyin: nánguài/ guàibude",
    "formation": "nánguài/ guàibude",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "他从来不操心孩子的事。这也难怪/怪不得，他那么忙，哪儿有时间啊。",
        "romanization": "tā cóngláibù cāoxīn háizi de shì。 zhè yě nánguài/ guàibude， tā nàme máng， nǎr yǒu shíjiān ā。",
        "translation": "He never concerns [himself] with his children’s problems (lit. matters). But that’s no surprise. He’s so busy, how could he find the time?"
      }
    ]
  },
  {
    "id": "zh_与其倒不如_586",
    "language": "zh",
    "pattern": "与其……(倒)不如……",
    "title": "与其……(倒)不如…… (Instead of… it’s better to…)",
    "shortExplanation": "Instead of… it’s better to…",
    "longExplanation": "Instead of… it’s better to…. Pinyin: yǔqí……( dǎo) bùrú……",
    "formation": "yǔqí……( dǎo) bùrú……",
    "level": "HSK 5",
    "examples": []
  },
  {
    "id": "zh_总之_588",
    "language": "zh",
    "pattern": "总之",
    "title": "总之 (In short)",
    "shortExplanation": "In short",
    "longExplanation": "In short. Pinyin: zǒngzhī",
    "formation": "zǒngzhī",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "我想去上海、南京，杭州……总之想去南方转转。",
        "romanization": "wǒ xiǎng qù Shàng Hǎi、 Nánjīng， Hángzhōu…… zǒngzhī xiǎng qù nánfāng zhuànzhuan。",
        "translation": "I want to go to Shanghai, Nanjing, Hangzhou... In short, I want to go south."
      }
    ]
  },
  {
    "id": "zh_V过_589",
    "language": "zh",
    "pattern": "V 过",
    "title": "V 过 (V away)",
    "shortExplanation": "V away",
    "longExplanation": "V away. Pinyin: V guò",
    "formation": "V guò",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "他转过身，一句话也不说。",
        "romanization": "tā zhuàn guò shēn， yījùhuà yě bù shuō。",
        "translation": "He turned (his body) away, and didn’t say a word."
      }
    ]
  },
  {
    "id": "zh_V过_590",
    "language": "zh",
    "pattern": "V 过",
    "title": "V 过 (V over, V by)",
    "shortExplanation": "V over, V by",
    "longExplanation": "V over, V by. Pinyin: V guò",
    "formation": "V guò",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "短短的几分钟里，我的脑子里闪过了很多想法。",
        "romanization": "duǎn duǎn de jǐ fēnzhōng lǐ， wǒ de nǎozi lǐ shǎnguò le hěn duō xiǎngfǎ。",
        "translation": "In as little as a few minutes, many thoughts flashed by my mind."
      }
    ]
  },
  {
    "id": "zh_V开_591",
    "language": "zh",
    "pattern": "V 开",
    "title": "V 开 (V open)",
    "shortExplanation": "V open",
    "longExplanation": "V open. Pinyin: V kāi",
    "formation": "V kāi",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "猴子突然站了起来，张开手臂抱住了管理员。",
        "romanization": "hóuzi tūrán zhàn le qilai， zhāngkāi shǒubì bào zhù le guǎnlǐyuán。",
        "translation": "The monkey suddenly stood up and opened his arm and hugged the zookeeper."
      }
    ]
  },
  {
    "id": "zh_赶快_592",
    "language": "zh",
    "pattern": "赶快",
    "title": "赶快 (quickly, urgently)",
    "shortExplanation": "quickly, urgently",
    "longExplanation": "quickly, urgently. Pinyin: gǎnkuài",
    "formation": "gǎnkuài",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "我下个月要搬家， 得赶快找房子。",
        "romanization": "wǒ xiàgèyuè yào bānjiā， dé gǎnkuài zhǎo fángzi。",
        "translation": "I have to move next month, I have to find housing quickly."
      }
    ]
  },
  {
    "id": "zh_片_593",
    "language": "zh",
    "pattern": "片",
    "title": "片 (a piece of)",
    "shortExplanation": "a piece of",
    "longExplanation": "a piece of. Pinyin: piàn",
    "formation": "piàn",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "天上飘着一片云。",
        "romanization": "tiānshàng piāo zhe yīpiàn yún。",
        "translation": "There is a cloud in the sky."
      }
    ]
  },
  {
    "id": "zh_片_594",
    "language": "zh",
    "pattern": "片",
    "title": "片 (a wave of)",
    "shortExplanation": "a wave of",
    "longExplanation": "a wave of. Pinyin: piàn",
    "formation": "piàn",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "同学们听了，发出一片热烈的欢呼声。",
        "romanization": "tóngxué men tīng le， fāchū yīpiàn rèliè de huānhū shēng。",
        "translation": "The students listened and gave a (wave of) warm cheer."
      }
    ]
  },
  {
    "id": "zh_根本negative_595",
    "language": "zh",
    "pattern": "根本 + negative",
    "title": "根本 + negative (at all)",
    "shortExplanation": "at all",
    "longExplanation": "at all. Pinyin: gēnběn + negative",
    "formation": "gēnběn + negative",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "我发现自己根本读不懂考试题。",
        "romanization": "wǒ fāxiàn zìjǐ gēnběn dú bù dǒng kǎoshì tí。",
        "translation": "I found myself unable to read the exam questions at all."
      }
    ]
  },
  {
    "id": "zh_根本_596",
    "language": "zh",
    "pattern": "根本",
    "title": "根本 (root cause, fundamental)",
    "shortExplanation": "root cause, fundamental",
    "longExplanation": "root cause, fundamental. Pinyin: gēnběn",
    "formation": "gēnběn",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "教育是国家的根本。",
        "romanization": "jiàoyù shì guójiā de gēnběn。",
        "translation": "Education is the foundation of the country."
      }
    ]
  },
  {
    "id": "zh_根本肯定_597",
    "language": "zh",
    "pattern": "根本 肯定",
    "title": "根本 肯定 (completely)",
    "shortExplanation": "completely",
    "longExplanation": "completely. Pinyin: gēnběn kěndìng",
    "formation": "gēnběn kěndìng",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "事情已经根本解决了。",
        "romanization": "shìqing yǐjīng gēnběn jiějué le。",
        "translation": "Things have been completely (lit. from the root) solved."
      }
    ]
  },
  {
    "id": "zh_根本就是_598",
    "language": "zh",
    "pattern": "根本(就)是",
    "title": "根本(就)是 (simply)",
    "shortExplanation": "simply",
    "longExplanation": "simply. Pinyin: gēnběn( jiù) shì",
    "formation": "gēnběn( jiù) shì",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "他根本就是在故意找我们的麻烦。",
        "romanization": "tā gēnběn jiùshì zài gùyì zhǎo wǒmen de máfan。",
        "translation": "He is simply trying to make trouble for us."
      }
    ]
  },
  {
    "id": "zh_除非否则_599",
    "language": "zh",
    "pattern": "除非……否则……",
    "title": "除非……否则…… (unless)",
    "shortExplanation": "unless",
    "longExplanation": "unless. Pinyin: chúfēi…… fǒuzé……",
    "formation": "chúfēi…… fǒuzé……",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "除非再给我一个星期，否则我们无法完成任务。",
        "romanization": "chúfēi zài gěi wǒ yī gè xīngqī， fǒuzé wǒmen wúfǎ wánchéng rènwu。",
        "translation": "Unless you give me another week, (otherwise) we can't complete the task."
      }
    ]
  },
  {
    "id": "zh_除非才_600",
    "language": "zh",
    "pattern": "(除非)……才……",
    "title": "(除非)……才…… (unless)",
    "shortExplanation": "unless",
    "longExplanation": "unless. Pinyin: ( chúfēi)…… cái……",
    "formation": "( chúfēi)…… cái……",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "(除非)你答应我的条件，我才告诉你。",
        "romanization": "( chúfēi) nǐ dāying wǒ de tiáojiàn， wǒ cái gàosu nǐ。",
        "translation": "(Unless) you promise me, I won’t tell you."
      }
    ]
  },
  {
    "id": "zh_除非_601",
    "language": "zh",
    "pattern": "除非",
    "title": "除非 (except)",
    "shortExplanation": "except",
    "longExplanation": "except. Pinyin: chúfēi",
    "formation": "chúfēi",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "这种机器，除非李阳，没人修得好。",
        "romanization": "zhèzhǒng jīqì， chúfēi lǐ yáng， méi rén xiū dé hǎo。",
        "translation": "This kind of machine, except Li Yang, no one can fix."
      }
    ]
  },
  {
    "id": "zh_V1得O直V2_602",
    "language": "zh",
    "pattern": "V1 得 (O) 直 V2",
    "title": "V1 得 (O) 直 V2 (V1 O so much that O V2)",
    "shortExplanation": "V1 O so much that O V2",
    "longExplanation": "V1 O so much that O V2. Pinyin: V1 dé (O) zhí V2",
    "formation": "V1 dé (O) zhí V2",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "父亲听说儿子卖了房子，气得(他)直发抖。",
        "romanization": "fùqīn tīngshuō érzi mài le fángzi， qì dé( tā) zhí fādǒu。",
        "translation": "The father heard that his son had sold the house. He was so angry that he kept on shivering."
      }
    ]
  },
  {
    "id": "zh_直到_603",
    "language": "zh",
    "pattern": "直到",
    "title": "直到 (untill)",
    "shortExplanation": "untill",
    "longExplanation": "untill. Pinyin: zhídào",
    "formation": "zhídào",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "直到今天，我也不明白他当时为什么发那么大脾气。",
        "romanization": "zhídào jīntiān， wǒ yě bù míngbai tā dāngshí wèishénme fā nàme dà píqi。",
        "translation": "Until today, I don’t understand why he had such a bad temper at the time."
      }
    ]
  },
  {
    "id": "zh_反正_604",
    "language": "zh",
    "pattern": "反正",
    "title": "反正 (anyway)",
    "shortExplanation": "anyway",
    "longExplanation": "anyway. Pinyin: fǎnzhèng",
    "formation": "fǎnzhèng",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "不管你们谁去，反正我不会去。",
        "romanization": "bùguǎn nǐmen shéi qù， fǎnzhèng wǒ bùhuì qù。",
        "translation": "I don’t care if any of you go. I won’t go anyway."
      }
    ]
  },
  {
    "id": "zh_点_605",
    "language": "zh",
    "pattern": "# 点 ##",
    "title": "# 点 ## (# point ##)",
    "shortExplanation": "# point ##",
    "longExplanation": "# point ##. Pinyin: # diǎn ##",
    "formation": "# diǎn ##",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "三点一四",
        "romanization": "sān diǎn yī sì",
        "translation": "3.14"
      }
    ]
  },
  {
    "id": "zh_1分之2_606",
    "language": "zh",
    "pattern": "#1 分之 #2",
    "title": "#1 分之 #2 (#2 #1-th (fraction))",
    "shortExplanation": "#2 #1-th (fraction)",
    "longExplanation": "#2 #1-th (fraction). Pinyin: #1 fēnzhī #2",
    "formation": "#1 fēnzhī #2",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "五分之一",
        "romanization": "wǔfēnzhīyī",
        "translation": "1/5"
      }
    ]
  },
  {
    "id": "zh_百分之_607",
    "language": "zh",
    "pattern": "百分之 #",
    "title": "百分之 # (# percent)",
    "shortExplanation": "# percent",
    "longExplanation": "# percent. Pinyin: bǎifēnzhī #",
    "formation": "bǎifēnzhī #",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "百分之九",
        "romanization": "bǎifēnzhī jiǔ",
        "translation": "9 percent"
      }
    ]
  },
  {
    "id": "zh_甲乙丙丁_608",
    "language": "zh",
    "pattern": "甲乙丙丁",
    "title": "甲乙丙丁 (A, B, C, D (series))",
    "shortExplanation": "A, B, C, D (series)",
    "longExplanation": "A, B, C, D (series). Pinyin: jiǎyǐ bǐng dīng",
    "formation": "jiǎyǐ bǐng dīng",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "如果乙方同意，甲方可以可以提前把产品交给乙方。",
        "romanization": "rúguǒ yǐfāng tóngyì， jiǎfāng kěyǐ kěyǐ tíqián bǎ chǎnpǐn jiāogěi yǐfāng。",
        "translation": "If Party B agrees, Party A may give the product to Party B in advance."
      }
    ]
  },
  {
    "id": "zh_顺着_609",
    "language": "zh",
    "pattern": "顺(着)",
    "title": "顺(着) (along)",
    "shortExplanation": "along",
    "longExplanation": "along. Pinyin: shùn( zhe)",
    "formation": "shùn( zhe)",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "汗水顺着他的脸往下流。",
        "romanization": "hànshuǐ shùnzhe tā de liǎn wǎng xiàliú。",
        "translation": "The sweat flowed down (along) his face."
      }
    ]
  },
  {
    "id": "zh_自_610",
    "language": "zh",
    "pattern": "自",
    "title": "自 (from)",
    "shortExplanation": "from",
    "longExplanation": "from. Pinyin: zì",
    "formation": "zì",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "鸟类能觉察得出地球自北向南磁极的磁力线。",
        "romanization": "niǎolèi néng juéchá déchū dìqiú zì běi xiàngnán cíjí de cílìxiàn。",
        "translation": "Birds can perceive the magnetic field lines from the earth’s north magnetic pole to the south magnetic pole."
      }
    ]
  },
  {
    "id": "zh_把V着_611",
    "language": "zh",
    "pattern": "把……V 着",
    "title": "把……V 着 ((imperative))",
    "shortExplanation": "(imperative)",
    "longExplanation": "(imperative). Pinyin: bǎ……V zhe",
    "formation": "bǎ……V zhe",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "你把书带着。",
        "romanization": "nǐ bǎ shū dài zhe。",
        "translation": "Bring your book."
      }
    ]
  },
  {
    "id": "zh_把O给V了_612",
    "language": "zh",
    "pattern": "把 O (给) V 了",
    "title": "把 O (给) V 了 (have V’ed the O)",
    "shortExplanation": "have V’ed the O",
    "longExplanation": "have V’ed the O. Pinyin: bǎ O ( gěi) V le",
    "formation": "bǎ O ( gěi) V le",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "我把这事(给)忘了。",
        "romanization": "wǒ bǎ zhè shì( gěi) wàng le。",
        "translation": "I forgot about this matter."
      }
    ]
  },
  {
    "id": "zh_给_613",
    "language": "zh",
    "pattern": "给",
    "title": "给 ((See 被))",
    "shortExplanation": "(See 被)",
    "longExplanation": "(See 被). Pinyin: gěi",
    "formation": "gěi",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "我的手机给小偷偷走了。",
        "romanization": "wǒ de shǒujī gěi xiǎo tōutōu zǒu le。",
        "translation": "My mobile phone was stolen by the thief."
      }
    ]
  },
  {
    "id": "zh_何不_614",
    "language": "zh",
    "pattern": "何不",
    "title": "何不 (why not)",
    "shortExplanation": "why not",
    "longExplanation": "why not. Pinyin: hébù",
    "formation": "hébù",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "天气这么好，何不出去玩儿玩儿呢？",
        "romanization": "tiānqì zhème hǎo， hébù chūqù wánr wánr ne？",
        "translation": "The weather is so good, why not go out and play?"
      }
    ]
  },
  {
    "id": "zh_何尝_615",
    "language": "zh",
    "pattern": "何尝",
    "title": "何尝 (why wouldn’t)",
    "shortExplanation": "why wouldn’t",
    "longExplanation": "why wouldn’t. Pinyin: hécháng",
    "formation": "hécháng",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "我何尝不想买一所大房子呢？",
        "romanization": "wǒ hécháng bùxiǎng mǎi yī suǒ dà fángzi ne？",
        "translation": "Why wouldn’t I want to buy a big house?"
      }
    ]
  },
  {
    "id": "zh_何至于_616",
    "language": "zh",
    "pattern": "何至于",
    "title": "何至于 (why must)",
    "shortExplanation": "why must",
    "longExplanation": "why must. Pinyin: hé zhìyú",
    "formation": "hé zhìyú",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "你何至于生这么大的气呢？",
        "romanization": "nǐ hé zhìyú shēng zhème dà de qì ne？",
        "translation": "Why do you have to get so angry?"
      }
    ]
  },
  {
    "id": "zh_V了个RESULT_617",
    "language": "zh",
    "pattern": "V 了个 RESULT",
    "title": "V 了个 RESULT (V to RESULT)",
    "shortExplanation": "V to RESULT",
    "longExplanation": "V to RESULT. Pinyin: V le gè RESULT",
    "formation": "V le gè RESULT",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "我们喝了个痛快。",
        "romanization": "wǒmen hē le gè tòngkuài。",
        "translation": "We drank to [our] satisfaction."
      }
    ]
  },
  {
    "id": "zh_据说_618",
    "language": "zh",
    "pattern": "据说……",
    "title": "据说…… (It is said that…)",
    "shortExplanation": "It is said that…",
    "longExplanation": "It is said that…. Pinyin: jùshuō……",
    "formation": "jùshuō……",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "据说，他年轻时曾经一个人去过非洲大森林。",
        "romanization": "jùshuō， tā niánqīng shí céngjīng yīgèrén qù guò Fēizhōu dà sēnlín。",
        "translation": "It is said that at one time he went to the great forest in Africa when he was young."
      }
    ]
  },
  {
    "id": "zh_因而_619",
    "language": "zh",
    "pattern": "因而",
    "title": "因而 (therefore)",
    "shortExplanation": "therefore",
    "longExplanation": "therefore. Pinyin: yīn'ér",
    "formation": "yīn'ér",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "这条河河道很窄，因而容易发生水灾。",
        "romanization": "zhè tiáo hé hédào hěn zhǎi， yīn'ér róngyì fāshēng shuǐzāi。",
        "translation": "The river is narrow and is therefore prone to flooding."
      }
    ]
  },
  {
    "id": "zh_也_620",
    "language": "zh",
    "pattern": "也",
    "title": "也 (still)",
    "shortExplanation": "still",
    "longExplanation": "still. Pinyin: yě",
    "formation": "yě",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "你不想干也得干。",
        "romanization": "nǐ bùxiǎng gàn yě dé gàn。",
        "translation": "You still have to do it even if you don’t want to."
      }
    ]
  },
  {
    "id": "zh_再也_621",
    "language": "zh",
    "pattern": "再……也……",
    "title": "再……也…… (no matter how)",
    "shortExplanation": "no matter how",
    "longExplanation": "no matter how. Pinyin: zài…… yě……",
    "formation": "zài…… yě……",
    "level": "HSK 5",
    "examples": [
      {
        "sentence": "我再累也要把作业做完。",
        "romanization": "wǒ zài lèi yě yào bǎ zuòyè zuòwán。",
        "translation": "No matter how tired I am, I need to finish my homework."
      }
    ]
  },
  {
    "id": "zh_巴不得_622",
    "language": "zh",
    "pattern": "巴不得",
    "title": "巴不得 (be only too eager to)",
    "shortExplanation": "be only too eager to",
    "longExplanation": "be only too eager to. Pinyin: bābude",
    "formation": "bābude",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "我巴不得他们能真的和好，从此以后和和睦睦过日子。",
        "romanization": "wǒ bābude tāmen néng zhēn de héhǎo， cóngcǐ yǐhòu hé hémù mù guòrìzi。",
        "translation": "I only wish that they could really be reconciled and lived in harmony from now on."
      }
    ]
  },
  {
    "id": "zh_别提多了_623",
    "language": "zh",
    "pattern": "别提多……了",
    "title": "别提多……了 (indescribably)",
    "shortExplanation": "indescribably",
    "longExplanation": "indescribably. Pinyin: bié tíduō…… le",
    "formation": "bié tíduō…… le",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "这个人办事，别提多负责了。",
        "romanization": "zhège rén bànshì， bié tíduō fùzé le。",
        "translation": "This person does things, don't mention more responsibility."
      }
    ]
  },
  {
    "id": "zh_具有语体差别的同义词_624",
    "language": "zh",
    "pattern": "具有语体差别的同义词",
    "title": "具有语体差别的同义词 (synonyms that differ by style)",
    "shortExplanation": "synonyms that differ by style",
    "longExplanation": "synonyms that differ by style. Pinyin: jùyǒu yǔ tǐ chà biéde tóngyìcí",
    "formation": "jùyǒu yǔ tǐ chà biéde tóngyìcí",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "他便/就回答说/道：“将/把这只戒指拿去吧。”",
        "romanization": "tā biàn/ jiù huídá shuō/ dào：“ jiāng/ bǎ zhè zhǐ jièzhi ná qù ba。”",
        "translation": "Then he just said, “Take this ring.”"
      }
    ]
  },
  {
    "id": "zh_恨不得_625",
    "language": "zh",
    "pattern": "恨不得",
    "title": "恨不得 (to wish (badly))",
    "shortExplanation": "to wish (badly)",
    "longExplanation": "to wish (badly). Pinyin: hènbude",
    "formation": "hènbude",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "工作忙的时候，她恨不得一个人干两个人的活儿。",
        "romanization": "gōngzuò máng de shíhou， tā hènbude yīgèrén gàn liǎng gèrén de huór。",
        "translation": "When the work [gets] busy, she wished [she could] do two people’s work all by herself."
      }
    ]
  },
  {
    "id": "zh_顿时_626",
    "language": "zh",
    "pattern": "顿时",
    "title": "顿时 (suddenly)",
    "shortExplanation": "suddenly",
    "longExplanation": "suddenly. Pinyin: dùnshí",
    "formation": "dùnshí",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "听了医生的话，顿时，他的心里又燃起了希望。",
        "romanization": "tīng le yīshēng dehuà， dùnshí， tā de xīnli yòu ránqǐ le xīwàng。",
        "translation": "After hearing to the doctor's words, suddenly, his heart lit up hope again."
      }
    ]
  },
  {
    "id": "zh_不由得_627",
    "language": "zh",
    "pattern": "不由得",
    "title": "不由得 (can’t help but to)",
    "shortExplanation": "can’t help but to",
    "longExplanation": "can’t help but to. Pinyin: bùyóude",
    "formation": "bùyóude",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "李朋带病上场参加比赛了，我不由得有些担心。",
        "romanization": "lǐ péng dàibìng shàngchǎng cānjiā bǐsài le， wǒ bùyóude yǒuxiē dānxīn。",
        "translation": "Li Peng was sick and went to the competition. I couldn't help but worry (somewhat)."
      }
    ]
  },
  {
    "id": "zh_V番_628",
    "language": "zh",
    "pattern": "V # 番",
    "title": "V # 番 (V’ed # times over)",
    "shortExplanation": "V’ed # times over",
    "longExplanation": "V’ed # times over. Pinyin: V # fān",
    "formation": "V # fān",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "他打量了我一番，到嘴边的话又不说了。",
        "romanization": "tā dǎliang le wǒ yī fān， dào zuǐ biān dehuà yòu bù shuō le。",
        "translation": "He sized me up (once over) and swallowed his words. (Lit. [As for] the words that [came] to the edge of his mouth, he [changed his mind] again and didn’t utter them.)"
      }
    ]
  },
  {
    "id": "zh_番_629",
    "language": "zh",
    "pattern": "番",
    "title": "番 ((measure word for tumultuous events))",
    "shortExplanation": "(measure word for tumultuous events)",
    "longExplanation": "(measure word for tumultuous events). Pinyin: fān",
    "formation": "fān",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "经过了几番风雨，他才懂得人生的价值。",
        "romanization": "jīngguò le jǐ fān fēngyǔ， tā cái dǒngde rénshēng de jiàzhí。",
        "translation": "Only after a few (times of) setbacks (lit. storms), he understood the value of life."
      }
    ]
  },
  {
    "id": "zh_翻番_630",
    "language": "zh",
    "pattern": "翻 (#) 番",
    "title": "翻 (#) 番 (multiply # times)",
    "shortExplanation": "multiply # times",
    "longExplanation": "multiply # times. Pinyin: fān (#) fān",
    "formation": "fān (#) fān",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "和五年前比，多数人的工资已经翻番了。",
        "romanization": "hé wǔ niánqián bǐ， duōshù rén de gōngzī yǐjīng fānfān le。",
        "translation": "Compared to five years ago, most people’s wages have doubled."
      }
    ]
  },
  {
    "id": "zh_过于_631",
    "language": "zh",
    "pattern": "过于",
    "title": "过于 (too)",
    "shortExplanation": "too",
    "longExplanation": "too. Pinyin: guòyú",
    "formation": "guòyú",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "他出来得过于匆忙，居然忘了带手机。",
        "romanization": "tā chūlái dé guòyú cōngmáng， jūrán wàng le dài shǒujī。",
        "translation": "He came out too hurriedly and forgot to bring his mobile phone."
      }
    ]
  },
  {
    "id": "zh_着呢_632",
    "language": "zh",
    "pattern": "着呢",
    "title": "着呢 (state + emphasis)",
    "shortExplanation": "state + emphasis",
    "longExplanation": "state + emphasis. Pinyin: zhene",
    "formation": "zhene",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "这儿坐吧，这个位空着呢。",
        "romanization": "zhèr zuò ba， zhège wèi kōng zhene。",
        "translation": "Sit here, this seat is vacant (which you perhaps didn’t know)."
      }
    ]
  },
  {
    "id": "zh_乘机_633",
    "language": "zh",
    "pattern": "乘机",
    "title": "乘机 (take this opportunity and)",
    "shortExplanation": "take this opportunity and",
    "longExplanation": "take this opportunity and. Pinyin: chéngjī",
    "formation": "chéngjī",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "这次出差去北京，我们可以乘机游览一下长城。",
        "romanization": "zhè cì chūchāi qù Běijīng， wǒmen kěyǐ chéngjī yóulǎn yīxià Chángchéng。",
        "translation": "On this business trip to Beijing, we can take the opportunity and take a tour of the Great Wall."
      }
    ]
  },
  {
    "id": "zh_不料_634",
    "language": "zh",
    "pattern": "不料",
    "title": "不料 (who would have thought)",
    "shortExplanation": "who would have thought",
    "longExplanation": "who would have thought. Pinyin: bùliào",
    "formation": "bùliào",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "我只想和她开个玩笑，不料她却生气了。",
        "romanization": "wǒ zhǐ xiǎng hé tā kāi gè wánxiào， bùliào tā què shēngqì le。",
        "translation": "I just wanted to joke with her, but who would have thought she got angry."
      }
    ]
  },
  {
    "id": "zh_未免太A了_635",
    "language": "zh",
    "pattern": "未免+太+A+了",
    "title": "未免+太+A+了 (can’t say it’s not too A)",
    "shortExplanation": "can’t say it’s not too A",
    "longExplanation": "can’t say it’s not too A. Pinyin: wèimiǎn+ tài+A+ le",
    "formation": "wèimiǎn+ tài+A+ le",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "警察赶到时未免太迟了。",
        "romanization": "jǐngchá gǎn dàoshí wèimiǎn tài chíle。",
        "translation": "The police arrived rather too late. (Lit. you can’t say they didn’t arrive too late.)"
      }
    ]
  },
  {
    "id": "zh_未免有些有点A_636",
    "language": "zh",
    "pattern": "未免+有些/有点+A",
    "title": "未免+有些/有点+A (can’t say it’s not a bit A)",
    "shortExplanation": "can’t say it’s not a bit A",
    "longExplanation": "can’t say it’s not a bit A. Pinyin: wèimiǎn+ yǒuxiē/ yǒudiǎn+A",
    "formation": "wèimiǎn+ yǒuxiē/ yǒudiǎn+A",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "拒绝他的建议未免有些/有点失礼。",
        "romanization": "jùjué tā de jiànyì wèimiǎn yǒuxiē/ yǒudiǎn shīlǐ。",
        "translation": "It’s rather a bit rude to reject his suggestions. (Lit. you can’t say it’s not rude.)"
      }
    ]
  },
  {
    "id": "zh_仅仅只不过而已_637",
    "language": "zh",
    "pattern": "仅仅/只不过……而已",
    "title": "仅仅/只不过……而已 (only)",
    "shortExplanation": "only",
    "longExplanation": "only. Pinyin: jǐnjǐn/ zhǐbuguò…… éryǐ",
    "formation": "jǐnjǐn/ zhǐbuguò…… éryǐ",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "他的工作是警察， 写小说仅仅是他的业余爱好而已。",
        "romanization": "tā de gōngzuò shì jǐngchá， xiě xiǎoshuō jǐnjǐn shì tā de yèyú àihào éryǐ。",
        "translation": "His works as a policeman, and writing novels is just his hobby (that’s all)."
      }
    ]
  },
  {
    "id": "zh_固然_638",
    "language": "zh",
    "pattern": "固然",
    "title": "固然 (granted)",
    "shortExplanation": "granted",
    "longExplanation": "granted. Pinyin: gùrán",
    "formation": "gùrán",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "考上大学固然好，没考上大学也不是就没有出路了。",
        "romanization": "kǎoshàng dàxué gùrán hǎo， méi kǎoshàng dàxué yě bùshì jiù méiyǒu chūlù le。",
        "translation": "Granted, it’s good to go to college, [but even if] you don’t go to college it doesn’t mean you have no way out."
      }
    ]
  },
  {
    "id": "zh_无非_639",
    "language": "zh",
    "pattern": "无非",
    "title": "无非 (simply)",
    "shortExplanation": "simply",
    "longExplanation": "simply. Pinyin: wúfēi",
    "formation": "wúfēi",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "他这么努力地工作，无非想多挣些钱，让妻子、孩子生活得更舒适。",
        "romanization": "tā zhème nǔlì dì gōngzuò， wúfēi xiǎng duō zhèng xiē qián， ràng qīzi、 háizi shēnghuó dé gèng shūshì。",
        "translation": "He works so hard, simply [because] he wants to make more money and make his wife and children live more comfortably."
      }
    ]
  },
  {
    "id": "zh_唯独_640",
    "language": "zh",
    "pattern": "唯独",
    "title": "唯独 (only)",
    "shortExplanation": "only",
    "longExplanation": "only. Pinyin: wéidú",
    "formation": "wéidú",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "那次旅行大家都去了，唯独你没有去成。",
        "romanization": "nà cì lǚxíng dàjiā dōu qù le， wéidú nǐ méiyǒu qù chéng。",
        "translation": "Everyone went on that trip, only you didn't go."
      }
    ]
  },
  {
    "id": "zh_明明_641",
    "language": "zh",
    "pattern": "明明",
    "title": "明明 (obviously)",
    "shortExplanation": "obviously",
    "longExplanation": "obviously. Pinyin: míngmíng",
    "formation": "míngmíng",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "你唱的明明是流行歌曲，哪里是京剧啊？",
        "romanization": "nǐ chàng de míngmíng shì liúxíng gēqǔ， nǎlǐ shì Jīngjù ā？",
        "translation": "What you are singing is obviously a pop song, how can you [say] it’s Beijing opera?"
      }
    ]
  },
  {
    "id": "zh_大不了_642",
    "language": "zh",
    "pattern": "大不了……",
    "title": "大不了…… (If the worst came to the worst, …)",
    "shortExplanation": "If the worst came to the worst, …",
    "longExplanation": "If the worst came to the worst, …. Pinyin: dàbùliǎo……",
    "formation": "dàbùliǎo……",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "失败了不要紧，大不了从头再来。",
        "romanization": "shībài le bùyàojǐn， dàbùliǎo cóngtóu zài lái。",
        "translation": "It doesn't matter if you fail. If the worst came to the worst, you can start from scratch again."
      }
    ]
  },
  {
    "id": "zh_大不了的_643",
    "language": "zh",
    "pattern": "大不了的",
    "title": "大不了的 (big deal)",
    "shortExplanation": "big deal",
    "longExplanation": "big deal. Pinyin: dàbùliǎo de",
    "formation": "dàbùliǎo de",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "接个吻有什么大不了的？",
        "romanization": "jiē gè wěn yǒu shénme dàbùliǎo de？",
        "translation": "What's the big deal with a kiss?"
      }
    ]
  },
  {
    "id": "zh_V于PLACE_644",
    "language": "zh",
    "pattern": "V 于 PLACE",
    "title": "V 于 PLACE (V in PLACE)",
    "shortExplanation": "V in PLACE",
    "longExplanation": "V in PLACE. Pinyin: V yú PLACE",
    "formation": "V yú PLACE",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "著名的西湖龙井茶产于浙江看的西湖一带。",
        "romanization": "zhùmíng de Xīhú lóngjǐngchá chǎn yú Zhèjiāng kàn de Xīhú yīdài。",
        "translation": "The famous West Lake Longjing tea is produced in the West Lake area in Zhejiang."
      }
    ]
  },
  {
    "id": "zh_A于V_645",
    "language": "zh",
    "pattern": "A 于 V",
    "title": "A 于 V (A to V)",
    "shortExplanation": "A to V",
    "longExplanation": "A to V. Pinyin: A yú V",
    "formation": "A yú V",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "做决定，需要勇于承担责任。",
        "romanization": "zuò juédìng， xūyào yǒngyú chéngdān zérèn。",
        "translation": "To make a decision, you need to be courageous to take responsibility."
      }
    ]
  },
  {
    "id": "zh_致使_646",
    "language": "zh",
    "pattern": "致使",
    "title": "致使 (to cause)",
    "shortExplanation": "to cause",
    "longExplanation": "to cause. Pinyin: zhìshǐ",
    "formation": "zhìshǐ",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "他的粗心致使试验失败。",
        "romanization": "tā de cūxīn zhìshǐ shìyàn shībài。",
        "translation": "His carelessness caused the test to fail."
      }
    ]
  },
  {
    "id": "zh_并非_647",
    "language": "zh",
    "pattern": "并非",
    "title": "并非 (not (with emphasis, see “并”4.04.3))",
    "shortExplanation": "not (with emphasis, see “并”4.04.3)",
    "longExplanation": "not (with emphasis, see “并”4.04.3). Pinyin: bìngfēi",
    "formation": "bìngfēi",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "类似小王这样的年轻人并非少数。",
        "romanization": "lèisì xiǎo wáng zhèyàng de niánqīngrén bìngfēi shǎoshù。",
        "translation": "Young people like Xiao Wang are not a minority."
      }
    ]
  },
  {
    "id": "zh_对N而言_648",
    "language": "zh",
    "pattern": "对 N 而言",
    "title": "对 N 而言 (for N (see 4.05.4 “对……来说”))",
    "shortExplanation": "for N (see 4.05.4 “对……来说”)",
    "longExplanation": "for N (see 4.05.4 “对……来说”). Pinyin: duì N éryán",
    "formation": "duì N éryán",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "对今天的中国而言，经济发展必须坚持走可持续发展的道路。",
        "romanization": "duì jīntiān de Zhōngguó éryán， jīngjìfāzhǎn bìxū jiānchí zǒu kěchíxùfāzhǎn de dàolù。",
        "translation": "For today's China, economic development must adhere to the path of sustainable development."
      }
    ]
  },
  {
    "id": "zh_有关N_649",
    "language": "zh",
    "pattern": "有关 N",
    "title": "有关 N (about N)",
    "shortExplanation": "about N",
    "longExplanation": "about N. Pinyin: yǒuguān N",
    "formation": "yǒuguān N",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "他查阅了大量有关服饰问题的资料。",
        "romanization": "tā cháyuè le dàliàng yǒuguān fúshì wèntí de zīliào。",
        "translation": "He consulted a lot of information about clothing issues."
      }
    ]
  },
  {
    "id": "zh_和N有关_650",
    "language": "zh",
    "pattern": "和 N 有关",
    "title": "和 N 有关 (related to N)",
    "shortExplanation": "related to N",
    "longExplanation": "related to N. Pinyin: hé N yǒuguān",
    "formation": "hé N yǒuguān",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "中国的语文教学向来重视识字，这固然和汉字的特点有关。",
        "romanization": "Zhōngguó de yǔwén jiàoxué xiànglái zhòngshì shízì， zhè gùrán hé hànzì de tèdiǎn yǒuguān。",
        "translation": "Chinese language teaching has always attached importance to literacy, which is of course related to the characteristics of Chinese characters."
      }
    ]
  },
  {
    "id": "zh_不瞒你说_651",
    "language": "zh",
    "pattern": "不瞒你说",
    "title": "不瞒你说 (actually)",
    "shortExplanation": "actually",
    "longExplanation": "actually. Pinyin: bù mán nǐ shuō",
    "formation": "bù mán nǐ shuō",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "不瞒你说，对这个问题，我是这样想的。",
        "romanization": "bù mán nǐ shuō， duì zhège wèntí， wǒ shì zhèyàng xiǎng de。",
        "translation": "To tell you the truth, regarding this question, this is what I think."
      }
    ]
  },
  {
    "id": "zh_说真的说实在的_652",
    "language": "zh",
    "pattern": "说真的/说实在的",
    "title": "说真的/说实在的 (indeed, truthfully)",
    "shortExplanation": "indeed, truthfully",
    "longExplanation": "indeed, truthfully. Pinyin: shuō zhēn de/ shuō shízài de",
    "formation": "shuō zhēn de/ shuō shízài de",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "说真的，这次真是孩子给我上了一课。",
        "romanization": "shuō zhēn de， zhè cì zhēnshi háizi gěi wǒ shàng le yī kè。",
        "translation": "Seriously, this time the child really gave me a lesson."
      }
    ]
  },
  {
    "id": "zh_通红雪白_653",
    "language": "zh",
    "pattern": "通红、雪白",
    "title": "通红、雪白 (very red, very white)",
    "shortExplanation": "very red, very white",
    "longExplanation": "very red, very white. Pinyin: tōnghóng、 xuěbái",
    "formation": "tōnghóng、 xuěbái",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "我脸憋得通红。",
        "romanization": "wǒ liǎn biē dé tōnghóng。",
        "translation": "My face is red from suffocation."
      }
    ]
  },
  {
    "id": "zh_说VA就VA_654",
    "language": "zh",
    "pattern": "说 V/A 就 V/A",
    "title": "说 V/A 就 V/A (V without thinking, be A without thinking)",
    "shortExplanation": "V without thinking, be A without thinking",
    "longExplanation": "V without thinking, be A without thinking. Pinyin: shuō V/A jiù V/A",
    "formation": "shuō V/A jiù V/A",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "挺好的工作，怎么说不干就不干了？",
        "romanization": "tǐnghǎo de gōngzuò， zěnme shuō bù gàn jiù bù gàn le？",
        "translation": "Very good job, how come you quit just like that (without thinking)?"
      }
    ]
  },
  {
    "id": "zh_VA得要命_655",
    "language": "zh",
    "pattern": "V/A 得要命",
    "title": "V/A 得要命 (V so much one could die, so A one could die)",
    "shortExplanation": "V so much one could die, so A one could die",
    "longExplanation": "V so much one could die, so A one could die. Pinyin: V/A dé yàomìng",
    "formation": "V/A dé yàomìng",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "五个小时没碰手机，我空虚得要命。",
        "romanization": "wǔ gè xiǎoshí méi pèng shǒujī， wǒ kōngxū dé yàomìng。",
        "translation": "I didn't touch my cell phone for five hours, and I feel so empty [from not having anythnig to do] I could die."
      }
    ]
  },
  {
    "id": "zh_以至于_656",
    "language": "zh",
    "pattern": "以至 (于)",
    "title": "以至 (于) (as a result)",
    "shortExplanation": "as a result",
    "longExplanation": "as a result. Pinyin: yǐzhì ( yú)",
    "formation": "yǐzhì ( yú)",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "中国的饮食文化汲收不同国家的优异之处，以至于辉煌至今。",
        "romanization": "Zhōngguó de yǐnshí wénhuà jí shōu bùtóng guójiā de yōuyì zhī chǔ， yǐzhìyú huīhuáng zhìjīn。",
        "translation": "China's food culture has absorbed the excellence of different countries, [and] as a result its brilliance [has shone] to this day."
      }
    ]
  },
  {
    "id": "zh_即便_657",
    "language": "zh",
    "pattern": "即便",
    "title": "即便 (even if)",
    "shortExplanation": "even if",
    "longExplanation": "even if. Pinyin: jíbiàn",
    "formation": "jíbiàn",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "她最近心情不好，即便有些不讲理，你也要原谅她。",
        "romanization": "tā zuìjìn xīnqíng bùhǎo， jíbiàn yǒuxiē bù jiǎnglǐ， nǐ yě yào yuánliàng tā。",
        "translation": "She has a bad mood recently. Even if she is a little unreasonable, you still have to forgive her."
      }
    ]
  },
  {
    "id": "zh_所在_658",
    "language": "zh",
    "pattern": "所在",
    "title": "所在 (where … lies)",
    "shortExplanation": "where … lies",
    "longExplanation": "where … lies. Pinyin: suǒzài",
    "formation": "suǒzài",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "培养人是教育的立足点，是教育价值的根本所在，是教育的本体功能。",
        "romanization": "péiyǎng rén shì jiàoyù de lìzúdiǎn， shì jiàoyù jiàzhí de gēnběn suǒzài， shì jiàoyù de běntǐ gōngnéng。",
        "translation": "Cultivating people is the foothold of education, is where the foundation of education’s value lies, and the ontological function of education."
      }
    ]
  },
  {
    "id": "zh_所在_659",
    "language": "zh",
    "pattern": "所在",
    "title": "所在 (place)",
    "shortExplanation": "place",
    "longExplanation": "place. Pinyin: suǒzài",
    "formation": "suǒzài",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "他选择了风景秀美、气候宜人的所在。",
        "romanization": "tā xuǎnzé le fēngjǐng xiùměi、 qìhòu yírén de suǒzài。",
        "translation": "He chose a place with beautiful scenery and a pleasant climate."
      }
    ]
  },
  {
    "id": "zh_统统_660",
    "language": "zh",
    "pattern": "统统",
    "title": "统统 (all)",
    "shortExplanation": "all",
    "longExplanation": "all. Pinyin: tǒngtǒng",
    "formation": "tǒngtǒng",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "影院、酒吧，统统与他无缘。",
        "romanization": "yǐngyuàn、 jiǔbā， tǒngtǒng yǔ tā wúyuán。",
        "translation": "Theaters and bars (all) have nothing to do with him."
      }
    ]
  },
  {
    "id": "zh_以A为B_661",
    "language": "zh",
    "pattern": "以 A 为 B",
    "title": "以 A 为 B (regard A as B)",
    "shortExplanation": "regard A as B",
    "longExplanation": "regard A as B. Pinyin: yǐ A wéi B",
    "formation": "yǐ A wéi B",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "高级阶段的汉语学习应以阅读吸收为主，语法学习为辅。",
        "romanization": "gāojí jiēduàn de Hànyǔ xuéxí yīng yǐ yuèdú xīshōu wéizhǔ， yǔfǎ xuéxí wéi fǔ。",
        "translation": "At the advanced stage of Chinese learning, [we] should consider reading and input should as the primary, [and] consider grammar learning as secondary."
      }
    ]
  },
  {
    "id": "zh_该V就得V_662",
    "language": "zh",
    "pattern": "该 V (就)(得) V",
    "title": "该 V (就)(得) V (if one should V then one must V)",
    "shortExplanation": "if one should V then one must V",
    "longExplanation": "if one should V then one must V. Pinyin: gāi V ( jiù)( dé) V",
    "formation": "gāi V ( jiù)( dé) V",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "中国过年过节的时候商店最忙了，根本不放假，该开门就得开门。",
        "romanization": "Zhōngguó guònián guòjié de shíhou shāngdiàn zuì máng le， gēnběn bù fàngjià， gāi kāimén jiù dé kāimén。",
        "translation": "When the Chinese New Year is over, the store is the busiest, and there is no holiday at all. We have no choice but to stay open. (Lit. If we should open the door [for business] then we must open the door [for business].)"
      }
    ]
  },
  {
    "id": "zh_不妨V_663",
    "language": "zh",
    "pattern": "不妨 V",
    "title": "不妨 V (it won’t hurt to V)",
    "shortExplanation": "it won’t hurt to V",
    "longExplanation": "it won’t hurt to V. Pinyin: bùfáng V",
    "formation": "bùfáng V",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "有什么意见，你不妨直说。",
        "romanization": "yǒu shénme yìjiàn， nǐ bùfáng zhí shuō。",
        "translation": "If you have any comments, it won’t hurt for you to say it frankly. (You’re welcome to say it frankly. There’s nothing preventing you to say it frankly.)"
      }
    ]
  },
  {
    "id": "zh_务必_664",
    "language": "zh",
    "pattern": "务必",
    "title": "务必 (must)",
    "shortExplanation": "must",
    "longExplanation": "must. Pinyin: wùbì",
    "formation": "wùbì",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "飞机起飞前务必系好安全带。",
        "romanization": "fēijī qǐfēi qián wùbì xì hǎo ānquándài。",
        "translation": "you must fasten your seatbelt before the plane takes off."
      }
    ]
  },
  {
    "id": "zh_鉴于_665",
    "language": "zh",
    "pattern": "鉴于",
    "title": "鉴于 (in view of)",
    "shortExplanation": "in view of",
    "longExplanation": "in view of. Pinyin: jiànyú",
    "formation": "jiànyú",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "鉴于农村教师严重缺乏，他决定大学毕业以后，到农村去当老师。",
        "romanization": "jiànyú nóngcūn jiàoshī yánzhòng quēfá， tā juédìng dàxué bìyè yǐhòu， dào nóngcūn qù dāng lǎoshī。",
        "translation": "In view of the serious shortage of rural teachers, he decided to go to the countryside to become a teacher after graduating from college."
      }
    ]
  },
  {
    "id": "zh_便于_666",
    "language": "zh",
    "pattern": "便于",
    "title": "便于 (easy to)",
    "shortExplanation": "easy to",
    "longExplanation": "easy to. Pinyin: biànyú",
    "formation": "biànyú",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "科普文章应该写得简明易懂、便于理解。",
        "romanization": "kēpǔ wénzhāng yīnggāi xiě dé jiǎnmíng yìdǒng、 biànyú lǐjiě。",
        "translation": "Popular science articles should be written in a concise way, [so it’s] easy to understand."
      }
    ]
  },
  {
    "id": "zh_犹如N一般般A_667",
    "language": "zh",
    "pattern": "犹如 N (一般/般) A",
    "title": "犹如 N (一般/般) A (as A as N (metaphorically))",
    "shortExplanation": "as A as N (metaphorically)",
    "longExplanation": "as A as N (metaphorically). Pinyin: yóurú N ( yībān/ bān) A",
    "formation": "yóurú N ( yībān/ bān) A",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "公司的劣质产品气坏了消费者，顾客的愤怒情绪犹如火山爆发(一般/般)难以控制。",
        "romanization": "gōngsī de lièzhì chǎnpǐn qì huàile xiāofèizhě， gùkè de fènnù qíngxù yóurú huǒshānbàofā( yībān/ bān) nányǐ kòngzhì。",
        "translation": "The company's inferior products have angered consumers, and their anger is as difficult to control as a volcanic eruption."
      }
    ]
  },
  {
    "id": "zh_和相比_668",
    "language": "zh",
    "pattern": "和……相比",
    "title": "和……相比 (compared to…)",
    "shortExplanation": "compared to…",
    "longExplanation": "compared to…. Pinyin: hé…… xiāngbǐ",
    "formation": "hé…… xiāngbǐ",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "和10年前相比，人们要经历更多次的职业选择。",
        "romanization": "hé10 niánqián xiāngbǐ， rénmen yào jīnglì gèng duōcì de zhíyè xuǎnzé。",
        "translation": "People have to go through more career choices compared to 10 years ago."
      }
    ]
  },
  {
    "id": "zh_一MM_669",
    "language": "zh",
    "pattern": "一 + M + M",
    "title": "一 + M + M (one batch after another)",
    "shortExplanation": "one batch after another",
    "longExplanation": "one batch after another. Pinyin: yī + M + M",
    "formation": "yī + M + M",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "每天都会有一拨拨同行前来考察访问。",
        "romanization": "měitiān dūhuì yǒu yī bō bō tóngháng qiánlái kǎochá fǎngwèn。",
        "translation": "Every day, there are group after group of people from the same profession coming to tour [the facilities] and visit."
      }
    ]
  },
  {
    "id": "zh_难以V_670",
    "language": "zh",
    "pattern": "难以 V",
    "title": "难以 V (hard to)",
    "shortExplanation": "hard to",
    "longExplanation": "hard to. Pinyin: nányǐ V",
    "formation": "nányǐ V",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "他能否成功尚难以预料。",
        "romanization": "tā néngfǒu chénggōng shàng nányǐ yùliào。",
        "translation": "It’s still hard to predict whether he will be successful."
      }
    ]
  },
  {
    "id": "zh_免得_671",
    "language": "zh",
    "pattern": "免得",
    "title": "免得 (lest)",
    "shortExplanation": "lest",
    "longExplanation": "lest. Pinyin: miǎnde",
    "formation": "miǎnde",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "今天大家晚点儿走，把活儿都干完，免得明天再来。",
        "romanization": "jīntiān dàjiā wǎndiǎn r zǒu， bǎ huór dōu gàn wán， miǎnde míngtiān zài lái。",
        "translation": "Everyone [please] leave a little later today and finish all the work, lest you [have to] come again tomorrow."
      }
    ]
  },
  {
    "id": "zh_时而时而_672",
    "language": "zh",
    "pattern": "时而……时而……",
    "title": "时而……时而…… (sometimes… sometimes…)",
    "shortExplanation": "sometimes… sometimes…",
    "longExplanation": "sometimes… sometimes…. Pinyin: shí'ér…… shí'ér……",
    "formation": "shí'ér…… shí'ér……",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "阳光下，蝴蝶的颜色鲜艳极了，时而金黄，时而翠绿，时而由紫变蓝。",
        "romanization": "yángguāng xià， húdié de yánsè xiānyàn jíle， shí'ér jīnhuáng， shí'ér cuìlǜ， shí'ér yóu zǐ biàn lán。",
        "translation": "In the sun, the color of the butterfly is very bright, sometimes golden, sometimes green, sometimes from purple to blue."
      }
    ]
  },
  {
    "id": "zh_时而_673",
    "language": "zh",
    "pattern": "时而",
    "title": "时而 (from time to time)",
    "shortExplanation": "from time to time",
    "longExplanation": "from time to time. Pinyin: shí'ér",
    "formation": "shí'ér",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "主人去世以后，那狗没有了往日的精神，时而发出令人伤心的叫声。",
        "romanization": "zhǔrén qùshì yǐhòu， nà gǒu méiyǒu le wǎngrì de jīngshén， shí'ér fāchū lìngrén shāngxīn de jiàoshēng。",
        "translation": "After the death of the owner, the dog did not have the spirit like it did in the past, and it sometimes makes a sad call."
      }
    ]
  },
  {
    "id": "zh_不禁V_674",
    "language": "zh",
    "pattern": "不禁 V",
    "title": "不禁 V (can’t help but to V)",
    "shortExplanation": "can’t help but to V",
    "longExplanation": "can’t help but to V. Pinyin: bùjīn V",
    "formation": "bùjīn V",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "听到这个消息，大家不禁兴奋起来。",
        "romanization": "tīngdào zhège xiāoxi， dàjiā bùjīn xīngfèn qilai。",
        "translation": "When you heard the news, everyone couldn't help but get excited."
      }
    ]
  },
  {
    "id": "zh_无不V_675",
    "language": "zh",
    "pattern": "无不 V",
    "title": "无不 V (there is nothing that doesn’t V)",
    "shortExplanation": "there is nothing that doesn’t V",
    "longExplanation": "there is nothing that doesn’t V. Pinyin: wúbù V",
    "formation": "wúbù V",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "你的一言一行，一举一动，无不影响着你周围的人们。",
        "romanization": "nǐ de yīyányīxíng， yījǔyīdòng， wúbù yǐngxiǎng zhe nǐ zhōuwéi de rénmen。",
        "translation": "Your words and deeds, every move, they all (lit. there is nothing that doesn’t) affect the people around you."
      }
    ]
  },
  {
    "id": "zh_换句话说也就是说_676",
    "language": "zh",
    "pattern": "换句话说/(也)就是说",
    "title": "换句话说/(也)就是说 (in other words)",
    "shortExplanation": "in other words",
    "longExplanation": "in other words. Pinyin: huànjùhuàshuō/( yě) jiùshìshuō",
    "formation": "huànjùhuàshuō/( yě) jiùshìshuō",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "每个国家都应与他国和睦相处。换句话说/(也)就是说，国家不能为所欲为。",
        "romanization": "měi gè guójiā dōu yīng yǔ tāguó hémùxiāngchǔ。 huànjùhuàshuō/( yě) jiùshìshuō， guójiā bùnéng wéisuǒyùwéi。",
        "translation": "Every country should live in harmony with other countries. In other words, a country can't do whatever it wants."
      }
    ]
  },
  {
    "id": "zh_为S所V_677",
    "language": "zh",
    "pattern": "为 S 所 V",
    "title": "为 S 所 V (V’ed by S)",
    "shortExplanation": "V’ed by S",
    "longExplanation": "V’ed by S. Pinyin: wéi S suǒ V",
    "formation": "wéi S suǒ V",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "没有一个人不为这部电影中的人物所感动。",
        "romanization": "méiyǒu yīgèrén bù wéi zhè bù diànyǐng zhòngdì rénwù suǒ gǎndòng。",
        "translation": "No one is [left] untouched by the characters in this movie."
      }
    ]
  },
  {
    "id": "zh_足以_678",
    "language": "zh",
    "pattern": "足以",
    "title": "足以 (is enough to)",
    "shortExplanation": "is enough to",
    "longExplanation": "is enough to. Pinyin: zúyǐ",
    "formation": "zúyǐ",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "对这样的坏人不严惩就不足以平民愤。",
        "romanization": "duì zhèyàng de huàirén bù yánchéng jiù bùzú yǐ píngmín fèn。",
        "translation": "If they do not severely punish such bad people, it won’t be enough to calm the anger civilians."
      }
    ]
  },
  {
    "id": "zh_东M西M_679",
    "language": "zh",
    "pattern": "东 # M 西 # M",
    "title": "东 # M 西 # M (one here and one there, willy nilly)",
    "shortExplanation": "one here and one there, willy nilly",
    "longExplanation": "one here and one there, willy nilly. Pinyin: dōng # M xī # M",
    "formation": "dōng # M xī # M",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "客人还不走，我只好跟他东一句西一句地没话找话说。",
        "romanization": "kèrén hái bù zǒu， wǒ zhǐhǎo gēn tā dōng yījù xī yījù dì méi huà zhǎo huàshuō。",
        "translation": "The guest is not leaving yet, so I have to talk aimlessly to him."
      }
    ]
  },
  {
    "id": "zh_V中zhng_680",
    "language": "zh",
    "pattern": "V 中 (zhòng)",
    "title": "V 中 (zhòng) (V on the mark)",
    "shortExplanation": "V on the mark",
    "longExplanation": "V on the mark. Pinyin: V zhōng (zhòng)",
    "formation": "V zhōng (zhòng)",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "飞来一只苍蝇，人动手去打，却总是打不中。",
        "romanization": "fēi lái yī zhǐ cāngying， rén dòngshǒu qù dǎ， què zǒngshì dǎ bù zhōng。",
        "translation": "A fly flew in. People tried to hit it with their hands but always missed it."
      }
    ]
  },
  {
    "id": "zh_中zhngN_681",
    "language": "zh",
    "pattern": "中 (zhòng) N",
    "title": "中 (zhòng) N (hit by N)",
    "shortExplanation": "hit by N",
    "longExplanation": "hit by N. Pinyin: zhōng (zhòng) N",
    "formation": "zhōng (zhòng) N",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "这种蘑菇不能吃，吃了会中毒的。",
        "romanization": "zhèzhǒng mógu bùnéng chī， chī le huì zhòngdú de。",
        "translation": "This kind of mushroom can't be eaten. You will be poisoned if you eat it."
      }
    ]
  },
  {
    "id": "zh_姑且_682",
    "language": "zh",
    "pattern": "姑且",
    "title": "姑且 (for now)",
    "shortExplanation": "for now",
    "longExplanation": "for now. Pinyin: gūqiě",
    "formation": "gūqiě",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "这件事，你姑且先答应下来，然后再慢慢想办法。",
        "romanization": "zhè jiàn shì， nǐ gūqiě xiān dāying xiàlai， ránhòu zài mànmàn xiǎng bànfǎ。",
        "translation": "As for this matter, you can agree to it for now, and then take your time and think about how to deal with it."
      }
    ]
  },
  {
    "id": "zh_随即_683",
    "language": "zh",
    "pattern": "随即",
    "title": "随即 (as soon as)",
    "shortExplanation": "as soon as",
    "longExplanation": "as soon as. Pinyin: suíjí",
    "formation": "suíjí",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "耶稣受了洗，随即从水里上来。",
        "romanization": "Yēsū shòu le xǐ， suíjí cóng Shuǐlǐ shànglái。",
        "translation": "As soon as Jesus was baptized, he went up out of the water."
      }
    ]
  },
  {
    "id": "zh_宁愿_684",
    "language": "zh",
    "pattern": "宁愿",
    "title": "宁愿 (would rather)",
    "shortExplanation": "would rather",
    "longExplanation": "would rather. Pinyin: nìngyuàn",
    "formation": "nìngyuàn",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "咱们宁愿多花点儿钱，也要买个质量好的。",
        "romanization": "zánmen nìngyuàn duō huā diǎnr qián， yě yào mǎi gè zhìliàng hǎo de。",
        "translation": "We'd rather spend more money than buy a good one."
      }
    ]
  },
  {
    "id": "zh_N归N_685",
    "language": "zh",
    "pattern": "N 归 N",
    "title": "N 归 N (although N is N)",
    "shortExplanation": "although N is N",
    "longExplanation": "although N is N. Pinyin: N guī N",
    "formation": "N guī N",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "朋友之间，开玩笑归开玩笑，但千万别过了头。",
        "romanization": "péngyou zhījiān， kāiwánxiào guī kāiwánxiào， dàn qiānwàn bié guò le tóu。",
        "translation": "Between friends, [although] jokes are jokes, but don't go too far."
      }
    ]
  },
  {
    "id": "zh_进而_686",
    "language": "zh",
    "pattern": "进而",
    "title": "进而 (and then)",
    "shortExplanation": "and then",
    "longExplanation": "and then. Pinyin: jìn'ér",
    "formation": "jìn'ér",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "人是在实践中接受环境的影响，进而改造自己的。",
        "romanization": "rén shì zài shíjiàn zhōng jiēshòu huánjìng de yǐngxiǎng， jìn'ér gǎizào zìjǐ de。",
        "translation": "It is through trial and error, mankind is influenced by their environment, and then transform themselves."
      }
    ]
  },
  {
    "id": "zh_得以V_687",
    "language": "zh",
    "pattern": "得以 V",
    "title": "得以 V (be enabled to V)",
    "shortExplanation": "be enabled to V",
    "longExplanation": "be enabled to V. Pinyin: déyǐ V",
    "formation": "déyǐ V",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "他因为年轻，得以免除惩罚。",
        "romanization": "tā yīnwèi niánqīng， déyǐ miǎnchú chéngfá。",
        "translation": "He is young, [which] enabled [him] to be exempt from punishment."
      }
    ]
  },
  {
    "id": "zh_偏偏V_689",
    "language": "zh",
    "pattern": "偏偏 V",
    "title": "偏偏 V (just V, to insist on V)",
    "shortExplanation": "just V, to insist on V",
    "longExplanation": "just V, to insist on V. Pinyin: piānpiān V",
    "formation": "piānpiān V",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "那里太危险了，大家都劝他不要去，他偏偏要去。",
        "romanization": "nàli tài wēixiǎn le， dàjiā dōu quàn tā bùyào qù， tā piānpiān yào qù。",
        "translation": "It's too dangerous there. Everyone advised him not to go. He just wanted to go. (He insisted on going.)"
      }
    ]
  },
  {
    "id": "zh_偏偏CLAUSE_690",
    "language": "zh",
    "pattern": "偏偏 CLAUSE",
    "title": "偏偏 CLAUSE ((CLAUSE is an undesirable occurence by chance))",
    "shortExplanation": "(CLAUSE is an undesirable occurence by chance)",
    "longExplanation": "(CLAUSE is an undesirable occurence by chance). Pinyin: piānpiān CLAUSE",
    "formation": "piānpiān CLAUSE",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "正当我坐下来吃晚饭时, 偏偏电话来了。",
        "romanization": "zhèngdàng wǒ zuò xiàlai chī wǎnfàn shí,  piānpiān diànhuà lái le。",
        "translation": "It just have to [be] when I sit down and eat supper that a call came."
      }
    ]
  },
  {
    "id": "zh_况且_691",
    "language": "zh",
    "pattern": "况且",
    "title": "况且 (besides)",
    "shortExplanation": "besides",
    "longExplanation": "besides. Pinyin: kuàngqiě",
    "formation": "kuàngqiě",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "这套房子交通方便，附近有书店，况且房租又不贵，真是再合适不过了。",
        "romanization": "zhè tào fángzi jiāotōng fāngbiàn， fùjìn yǒu shūdiàn， kuàngqiě fángzū yòu bù guì， zhēnshi zài héshì bùguò le。",
        "translation": "This apartment has convenient transportation, a bookstore nearby. And besides, the rent is not expensive. It's perfect."
      }
    ]
  },
  {
    "id": "zh_大TIME_692",
    "language": "zh",
    "pattern": "大 TIME",
    "title": "大 TIME ((emphasize on TIME))",
    "shortExplanation": "(emphasize on TIME)",
    "longExplanation": "(emphasize on TIME). Pinyin: dà TIME",
    "formation": "dà TIME",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "那辆汽车大白天被人偷走了。",
        "romanization": "nà liàng qìchē dàbáitiān bèi rén tōu zǒu le。",
        "translation": "The car was stolen in broad daylight."
      }
    ]
  },
  {
    "id": "zh_与其V倒不如V_693",
    "language": "zh",
    "pattern": "(与其) V 倒不如 V",
    "title": "(与其) V 倒不如 V (rather than V, it’s better to V)",
    "shortExplanation": "rather than V, it’s better to V",
    "longExplanation": "rather than V, it’s better to V. Pinyin: ( yǔqí) V dǎo bùrú V",
    "formation": "( yǔqí) V dǎo bùrú V",
    "level": "HSK 6",
    "examples": []
  },
  {
    "id": "zh_以免_695",
    "language": "zh",
    "pattern": "以免",
    "title": "以免 (为了避免)",
    "shortExplanation": "为了避免",
    "longExplanation": "为了避免. Pinyin: yǐmiǎn",
    "formation": "yǐmiǎn",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "感冒时应尽量少去公共场所，以免传染别人。",
        "romanization": "gǎnmào shí yīng jǐnliàng shǎo qù gōnggòng chǎngsuǒ， yǐmiǎn chuánrǎn biéren。",
        "translation": "When you have a cold, you should go to public places as little as possible so as not to infect others."
      }
    ]
  },
  {
    "id": "zh_嫌_696",
    "language": "zh",
    "pattern": "嫌",
    "title": "嫌 (dislike, have a strong negative opinion about)",
    "shortExplanation": "dislike, have a strong negative opinion about",
    "longExplanation": "dislike, have a strong negative opinion about. Pinyin: xián",
    "formation": "xián",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "大家都嫌这个旅行计划不够合理。",
        "romanization": "dàjiā dōu xián zhège lǚxíng jìhuà bùgòu hélǐ。",
        "translation": "Everyone feels (badly) that travel plan is unreasonable."
      }
    ]
  },
  {
    "id": "zh_动不动就V_697",
    "language": "zh",
    "pattern": "动不动就 V",
    "title": "动不动就 V (on a whim)",
    "shortExplanation": "on a whim",
    "longExplanation": "on a whim. Pinyin: dòngbudòng jiù V",
    "formation": "dòngbudòng jiù V",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "他最近工作忙、压力大，动不动就着急、发脾气。",
        "romanization": "tā zuìjìn gōngzuò máng、 yālì dà， dòngbudòng jiù zháojí、 fāpíqì。",
        "translation": "He's been busy and stressed recently. He gets angry on a whim."
      }
    ]
  },
  {
    "id": "zh_甲乙丙丁_698",
    "language": "zh",
    "pattern": "甲乙丙丁",
    "title": "甲乙丙丁 (A, B, C, D (series))",
    "shortExplanation": "A, B, C, D (series)",
    "longExplanation": "A, B, C, D (series). Pinyin: jiǎyǐ bǐng dīng",
    "formation": "jiǎyǐ bǐng dīng",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "甲、乙、丙、丁是一个序列，相当于英文的A、B、C、D。",
        "romanization": "jiǎ、 yǐ、 bǐng、 dīng shì yī gè xùliè， xiāngdāngyú Yīngwén deA、B、C、D。",
        "translation": "A, B, C and D are sequences equivalent to A, B, C and D in English."
      }
    ]
  },
  {
    "id": "zh_加以V_699",
    "language": "zh",
    "pattern": "加以 V",
    "title": "加以 V (proceed with V)",
    "shortExplanation": "proceed with V",
    "longExplanation": "proceed with V. Pinyin: jiāyǐ V",
    "formation": "jiāyǐ V",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "对于你的意见和建议，我们会认真加以研究。",
        "romanization": "duìyú nǐ de yìjiàn hé jiànyì， wǒmen huì rènzhēn jiāyǐ yánjiū。",
        "translation": "As for your opinions and suggestions, we will carefully (conduct a) study."
      }
    ]
  },
  {
    "id": "zh_大大远远V_700",
    "language": "zh",
    "pattern": "大大/远远 V",
    "title": "大大/远远 V (V by far)",
    "shortExplanation": "V by far",
    "longExplanation": "V by far. Pinyin: dàdà/ yuǎnyuǎn V",
    "formation": "dàdà/ yuǎnyuǎn V",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "你的能力大大/远远超出了我们的想象。",
        "romanization": "nǐ de nénglì dàdà/ yuǎnyuǎn chāochū le wǒmen de xiǎngxiàng。",
        "translation": "Your abilities exceeded our imagination by far."
      }
    ]
  },
  {
    "id": "zh_远远不没VA_701",
    "language": "zh",
    "pattern": "远远 + 不/没 + V/A",
    "title": "远远 + 不/没 + V/A (far from V-ing, far from A)",
    "shortExplanation": "far from V-ing, far from A",
    "longExplanation": "far from V-ing, far from A. Pinyin: yuǎnyuǎn + bù/ méi + V/A",
    "formation": "yuǎnyuǎn + bù/ méi + V/A",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "你现在的知识、能力都远远不能胜任你理想中的工作。",
        "romanization": "nǐ xiànzài de zhīshi、 nénglì dōu yuǎnyuǎn bùnéng shèngrèn nǐ lǐxiǎng zhòngdì gōngzuò。",
        "translation": "Your current knowledge and abilities are far from [sufficient for you to be] competent for your ideal job."
      }
    ]
  },
  {
    "id": "zh_紧缩句_702",
    "language": "zh",
    "pattern": "紧缩句",
    "title": "紧缩句 ((omitting “if” words))",
    "shortExplanation": "(omitting “if” words)",
    "longExplanation": "(omitting “if” words). Pinyin: jǐnsuō jù",
    "formation": "jǐnsuō jù",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "站住！(要是) 不站住，我就开枪了。",
        "romanization": "zhànzhù！( yàoshi) bù zhànzhù， wǒ jiù kāiqiāng le。",
        "translation": "Stop! If you don't stop, I'll shoot."
      }
    ]
  },
  {
    "id": "zh_特意_703",
    "language": "zh",
    "pattern": "特意",
    "title": "特意 (on purpose)",
    "shortExplanation": "on purpose",
    "longExplanation": "on purpose. Pinyin: tèyì",
    "formation": "tèyì",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "那一年我出差去天津，特意绕道北京，去了趟圆明园。",
        "romanization": "nà yī nián wǒ chūchāi qù Tiānjīn， tèyì ràodào Běijīng， qù le tàng Yuánmíngyuán。",
        "translation": "That year, I went to Tianjin on business. On purpose, I made a detour to Beijing and went to Yuanmingyuan."
      }
    ]
  },
  {
    "id": "zh_即将_704",
    "language": "zh",
    "pattern": "即将",
    "title": "即将 (about)",
    "shortExplanation": "about",
    "longExplanation": "about. Pinyin: jíjiāng",
    "formation": "jíjiāng",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "我们已经完成了学业，即将走上工作岗位，开始人生新的一页。",
        "romanization": "wǒmen yǐjīng wánchéng le xuéyè， jíjiāng zǒu shàng gōngzuò gǎngwèi， kāishǐ rénshēng xīn de yī yè。",
        "translation": "We have finished our studies and about to go to work and start a new page in our lives."
      }
    ]
  },
  {
    "id": "zh_能V就V_705",
    "language": "zh",
    "pattern": "能 + V + 就 + V",
    "title": "能 + V + 就 + V (V if possible)",
    "shortExplanation": "V if possible",
    "longExplanation": "V if possible. Pinyin: néng + V + jiù + V",
    "formation": "néng + V + jiù + V",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "这个手机没用多久，能修就修，尽量别换新的。",
        "romanization": "zhège shǒujī méiyòng duōjiǔ， néng xiū jiù xiū， jǐnliàng bié huànxīn de。",
        "translation": "This mobile phone hasn’t been used for long. If it can be repaired, (then) repair it. Try not to replace it."
      }
    ]
  },
  {
    "id": "zh_别说_706",
    "language": "zh",
    "pattern": "别说",
    "title": "别说 (let alone)",
    "shortExplanation": "let alone",
    "longExplanation": "let alone. Pinyin: bié shuō",
    "formation": "bié shuō",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "晚上看书别说蜡烛了，就是灯油也要节省着用。",
        "romanization": "wǎnshang kànshū bié shuō làzhú le， jiùshì dēng yóu yě yào jiéshěng zhe yòng。",
        "translation": "When [I] read at night, let alone candles, I had to scrooge even on the lamp oil."
      }
    ]
  },
  {
    "id": "zh_V1V1V2V2_707",
    "language": "zh",
    "pattern": "V1V1V2V2",
    "title": "V1V1V2V2 ((repeated action))",
    "shortExplanation": "(repeated action)",
    "longExplanation": "(repeated action). Pinyin: V1V1V2V2",
    "formation": "V1V1V2V2",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "小孩子就喜欢打打闹闹，磕磕碰碰是难免的，过几天就好了， 别担心。",
        "romanization": "xiǎoháizi jiù xǐhuan dǎ dǎ nào nào， kē kēpèng pèng shì nánmiǎn de， guò jǐtiān jiù hǎole， bié dānxīn。",
        "translation": "Children like to make a lot of noise. It's inevitable to bump into each other. It'll be all right in a few days. Don't worry."
      }
    ]
  },
  {
    "id": "zh_左MN右MN_708",
    "language": "zh",
    "pattern": "左 # M N 右 # M N",
    "title": "左 # M N 右 # M N (one N after another)",
    "shortExplanation": "one N after another",
    "longExplanation": "one N after another. Pinyin: zuǒ # M N yòu # M N",
    "formation": "zuǒ # M N yòu # M N",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "妈妈左一个电话右一个电话地催他回家。",
        "romanization": "māma zuǒ yī gè diànhuà yòu yī gè diànhuà dì cuī tā huíjiā。",
        "translation": "Mother called him left and right (lit. with one call after another), trying to hurry him to come home."
      }
    ]
  },
  {
    "id": "zh_莫非难道不成_709",
    "language": "zh",
    "pattern": "莫非/难道 …… 不成",
    "title": "莫非/难道 …… 不成 (could it be that)",
    "shortExplanation": "could it be that",
    "longExplanation": "could it be that. Pinyin: mòfēi/ nándào …… bùchéng",
    "formation": "mòfēi/ nándào …… bùchéng",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "他大吃一惊，头脑中一片空白——莫非受了骗不成?",
        "romanization": "tā dàchīyījīng， tóunǎo zhōng yīpiàn kòngbái—— mòfēi shòu le piàn bùchéng?",
        "translation": "He was shocked and his mind was blank - could he possibly be deceived?"
      }
    ]
  },
  {
    "id": "zh_一个N_710",
    "language": "zh",
    "pattern": "一个 N",
    "title": "一个 N (with a…)",
    "shortExplanation": "with a…",
    "longExplanation": "with a…. Pinyin: yī gè N",
    "formation": "yī gè N",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "他手没抓住栏杆，一个跟头栽了下来。",
        "romanization": "tā shǒu méi zhuāzhù lángān， yī gè gēntou zāi le xiàlai。",
        "translation": "He missed the railing and fell with a flip."
      }
    ]
  },
  {
    "id": "zh_了个A_711",
    "language": "zh",
    "pattern": "(了) 个 A",
    "title": "(了) 个 A (to the extent that it became A)",
    "shortExplanation": "to the extent that it became A",
    "longExplanation": "to the extent that it became A. Pinyin: ( le) gè A",
    "formation": "( le) gè A",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "他把心爱的琴摔了个粉碎。",
        "romanization": "tā bǎ xīn'ài de qín shuāi le gè fěnsuì。",
        "translation": "He smashed his beloved violin to pieces (lit. to the extent that it became shattered)."
      }
    ]
  },
  {
    "id": "zh_向来VA_712",
    "language": "zh",
    "pattern": "向来 V/A",
    "title": "向来 V/A (always have (been) V/A)",
    "shortExplanation": "always have (been) V/A",
    "longExplanation": "always have (been) V/A. Pinyin: xiànglái V/A",
    "formation": "xiànglái V/A",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "他们向来忠厚、老实，为人诚恳。",
        "romanization": "tāmen xiànglái zhōnghòu、 lǎoshi， wéirén chéngkěn。",
        "translation": "They have always been loyal, honest and sincere."
      }
    ]
  },
  {
    "id": "zh_预先_713",
    "language": "zh",
    "pattern": "预先",
    "title": "预先 (ahead of time)",
    "shortExplanation": "ahead of time",
    "longExplanation": "ahead of time. Pinyin: yùxiān",
    "formation": "yùxiān",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "大家预先都没有想到，本届绘画展览竟然这么受欢迎。",
        "romanization": "dàjiā yùxiān dōu méiyǒu xiǎngdào， běnjiè huìhuà zhǎnlǎn jìngrán zhème shòuhuānyíng。",
        "translation": "It was never expected (ahead of time) that this painting exhibition would be so popular."
      }
    ]
  },
  {
    "id": "zh_CLAUSE1也好CLAUSE2也罢_714",
    "language": "zh",
    "pattern": "CLAUSE1 也好 CLAUSE2 也罢",
    "title": "CLAUSE1 也好 CLAUSE2 也罢 (it doesn’t matter whether CLAUSE1 or CLAUSE2)",
    "shortExplanation": "it doesn’t matter whether CLAUSE1 or CLAUSE2",
    "longExplanation": "it doesn’t matter whether CLAUSE1 or CLAUSE2. Pinyin: CLAUSE1 yě hǎo CLAUSE2 yěbà",
    "formation": "CLAUSE1 yě hǎo CLAUSE2 yěbà",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "开汽车也好，骑自行车也罢，行进中打电话都会影响注意力与反应能力。",
        "romanization": "kāi qìchē yě hǎo， qí zìxíngchē yěbà， xíngjìn zhōng dǎdiànhuà dūhuì yǐngxiǎng zhùyìlì yǔ fǎnyìng nénglì。",
        "translation": "It doesn’t matter whether [you are] driving a car or riding a bicycle, making phone calls during the journey can affect attention and reaction ability."
      }
    ]
  },
  {
    "id": "zh_不时_715",
    "language": "zh",
    "pattern": "不时",
    "title": "不时 (from time to time)",
    "shortExplanation": "from time to time",
    "longExplanation": "from time to time. Pinyin: bùshí",
    "formation": "bùshí",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "不时传来的几声鸟叫提醒我们，新的一天又开始了。",
        "romanization": "bùshí chuánlái de jǐ shēng niǎo jiào tíxǐng wǒmen， xīn de yī tiān yòu kāishǐ le。",
        "translation": "A few bird calls from time to time remind us that a new day has begun."
      }
    ]
  },
  {
    "id": "zh_多多少少_716",
    "language": "zh",
    "pattern": "多多少少",
    "title": "多多少少 (more or less)",
    "shortExplanation": "more or less",
    "longExplanation": "more or less. Pinyin: duōduōshǎoshǎo",
    "formation": "duōduōshǎoshǎo",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "他的话多多少少有些真实。",
        "romanization": "tā dehuà duōduōshǎoshǎo yǒuxiē zhēnshí。",
        "translation": "What he said was more or less truthful."
      }
    ]
  },
  {
    "id": "zh_逐M_717",
    "language": "zh",
    "pattern": "逐 M",
    "title": "逐 M (one by one)",
    "shortExplanation": "one by one",
    "longExplanation": "one by one. Pinyin: zhú M",
    "formation": "zhú M",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "雨季快到了，水库要逐个检查，以排除安全隐患。",
        "romanization": "yǔjì kuài dàoliǎo， shuǐkù yào zhúgè jiǎnchá， yǐ páichú ānquán yǐnhuàn。",
        "translation": "As the rainy season is approaching, reservoirs should be inspected one by one to eliminate potential safety hazards."
      }
    ]
  },
  {
    "id": "zh_归根到底_718",
    "language": "zh",
    "pattern": "归根到底",
    "title": "归根到底 (after all)",
    "shortExplanation": "after all",
    "longExplanation": "after all. Pinyin: guīgēndàodǐ",
    "formation": "guīgēndàodǐ",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "运动健身归根到底是自己的事，胡乱对付其实是在骗自己。",
        "romanization": "yùndòng jiànshēn guīgēndàodǐ shì zìjǐ de shì， húluàn duìfu qíshí shì zài piàn zìjǐ。",
        "translation": "Exercise and fitness is after all [your] own business. If you just try to scrape through it, you are actually deceiving yourself."
      }
    ]
  },
  {
    "id": "zh_哪怕_719",
    "language": "zh",
    "pattern": "哪怕",
    "title": "哪怕 (even if)",
    "shortExplanation": "even if",
    "longExplanation": "even if. Pinyin: nǎpà",
    "formation": "nǎpà",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "您放心，我们 一定会尽全力抢救病人，哪怕只有一线希望。",
        "romanization": "nín fàngxīn， wǒmen yīdìng huì jìn quánlì qiǎngjiù bìngrén， nǎpà zhǐyǒu yīxiànxīwàng。",
        "translation": "You can rest assured that we will do our best to save the patients, even if there is only a glimmer of hope."
      }
    ]
  },
  {
    "id": "zh_反之_720",
    "language": "zh",
    "pattern": "反之",
    "title": "反之 (on the contrary)",
    "shortExplanation": "on the contrary",
    "longExplanation": "on the contrary. Pinyin: fǎnzhī",
    "formation": "fǎnzhī",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "经济发展了，百姓的收入增加了，消费能力就强，反之，百姓的消费能力就差。",
        "romanization": "jīngjìfāzhǎn le， bǎixìng de shōurù zēngjiā le， xiāofèi nénglì jiù qiáng， fǎnzhī， bǎixìng de xiāofèi nénglì jiù chà。",
        "translation": "If the economy develops, people's income increases, and their buying power increases. On the contrary [if the opposite is true], people's buying power will be less."
      }
    ]
  },
  {
    "id": "zh_VA1的VA1VA2的VA2_721",
    "language": "zh",
    "pattern": "V/A1 的 V/A1，V/A2 的 V/A2",
    "title": "V/A1 的 V/A1，V/A2 的 V/A2 (some V/A1, some V/A2)",
    "shortExplanation": "some V/A1, some V/A2",
    "longExplanation": "some V/A1, some V/A2. Pinyin: V/A1 de V/A1，V/A2 de V/A2",
    "formation": "V/A1 de V/A1，V/A2 de V/A2",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "进了果园，大家看到一树的桃 ，红的红，绿的绿，漂亮极了。",
        "romanization": "jìn le guǒyuán， dàjiā kàn dào yī shù de táo ， hóng de hóng， lǜ de lǜ， piàoliang jíle。",
        "translation": "Entering the orchard, you can see a tree of peaches, some red, some green, very beautiful."
      }
    ]
  },
  {
    "id": "zh_一时_722",
    "language": "zh",
    "pattern": "一时",
    "title": "一时 (momentarily)",
    "shortExplanation": "momentarily",
    "longExplanation": "momentarily. Pinyin: yīshí",
    "formation": "yīshí",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "她一时心急，连门都没有锁就冲出家门。",
        "romanization": "tā yīshí xīnjí， lián mén dōu méiyǒu suǒ jiù chōngchū jiāmén。",
        "translation": "She was anxious at the time and she rushed out without locking the door."
      }
    ]
  },
  {
    "id": "zh_CLAUSES尚且V_723",
    "language": "zh",
    "pattern": "(CLAUSE) S 尚且 V",
    "title": "(CLAUSE) S 尚且 V (even (CLAUSE) S V)",
    "shortExplanation": "even (CLAUSE) S V",
    "longExplanation": "even (CLAUSE) S V. Pinyin: (CLAUSE) S shàngqiě V",
    "formation": "(CLAUSE) S shàngqiě V",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "经济增长时，这个企业尚且如此，经济衰退时，企业肯定会出现生存问题。",
        "romanization": "jīngjìzēngzhǎng shí， zhège qǐyè shàngqiě rúcǐ， jīngjìshuāituì shí， qǐyè kěndìng huì chūxiàn shēngcún wèntí。",
        "translation": "Even during economic growth, the company is (yet) like this. It will certainly face survival problems in economic recession."
      }
    ]
  },
  {
    "id": "zh_当年当时当代_724",
    "language": "zh",
    "pattern": "当年、当时、当代",
    "title": "当年、当时、当代 (at that time)",
    "shortExplanation": "at that time",
    "longExplanation": "at that time. Pinyin: dāngnián、 dāngshí、 dāngdài",
    "formation": "dāngnián、 dāngshí、 dāngdài",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "他已不是当年的他了。",
        "romanization": "tā yǐ bùshì dāngnián de tā le。",
        "translation": "He is not the same man as he used to be (back in those days)."
      }
    ]
  },
  {
    "id": "zh_终究_725",
    "language": "zh",
    "pattern": "终究",
    "title": "终究 (after all)",
    "shortExplanation": "after all",
    "longExplanation": "after all. Pinyin: zhōngjiū",
    "formation": "zhōngjiū",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "猫终究是动物，动物急了咬人也是常的。",
        "romanization": "māo zhōngjiū shì dòngwù， dòngwù jí le yǎo rén yě shì cháng de。",
        "translation": "Cats are animals after all, and it is normal for animals to bite people when they get frantic."
      }
    ]
  },
  {
    "id": "zh_愈愈_726",
    "language": "zh",
    "pattern": "愈……愈……",
    "title": "愈……愈…… (the more… the more…)",
    "shortExplanation": "the more… the more…",
    "longExplanation": "the more… the more…. Pinyin: yù…… yù……",
    "formation": "yù…… yù……",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "愈是经营年画久了，他对年画就愈是热爱。",
        "romanization": "yù shì jīngyíng nián huà jiǔ le， tā duì nián huà jiù yù shì rè'ài。",
        "translation": "The longer he has been selling New Year's paintings, the more he loves them."
      }
    ]
  },
  {
    "id": "zh_一经_727",
    "language": "zh",
    "pattern": "一经",
    "title": "一经 (once)",
    "shortExplanation": "once",
    "longExplanation": "once. Pinyin: yī jīng",
    "formation": "yī jīng",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "领导集团会对重大问题做出决定。一经决定，集团成员必须共同遵守。",
        "romanization": "lǐngdǎo jítuán huì duì zhòngdà wèntí zuòchū juédìng。 yī jīng juédìng， jítuán chéngyuán bìxū gòngtóng zūnshǒu。",
        "translation": "Leading groups will make decisions on major issues. Once a decision has been made, the members of the group must abide by it together."
      }
    ]
  },
  {
    "id": "zh_本着N_728",
    "language": "zh",
    "pattern": "本着 N",
    "title": "本着 N (based on)",
    "shortExplanation": "based on",
    "longExplanation": "based on. Pinyin: běnzhe N",
    "formation": "běnzhe N",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "两国谈判代表本着互谅互让的精神，解决了拖延多年的问题。",
        "romanization": "liǎngguó tánpàn dàibiǎo běnzhe hù liàng hù ràng de jīngshén， jiějué le tuōyán duō nián de wèntí。",
        "translation": "In the spirit of mutual understanding and compromise, the negotiators of the two countries solved the problem of many years’ delay."
      }
    ]
  },
  {
    "id": "zh_为起见_729",
    "language": "zh",
    "pattern": "为……起见",
    "title": "为……起见 (for the sake of)",
    "shortExplanation": "for the sake of",
    "longExplanation": "for the sake of. Pinyin: wéi…… qǐjiàn",
    "formation": "wéi…… qǐjiàn",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "购买餐具后，为安全起见可先将餐具进行消毒处理。",
        "romanization": "gòumǎi cānjù hòu， wéi ānquán qǐjiàn kě xiān jiāng cānjù jìnxíng xiāodú chǔlǐ。",
        "translation": "After you purchasing tableware, they can be disinfected in view of safety."
      }
    ]
  },
  {
    "id": "zh_暂且_730",
    "language": "zh",
    "pattern": "暂且",
    "title": "暂且 (for now)",
    "shortExplanation": "for now",
    "longExplanation": "for now. Pinyin: zànqiě",
    "formation": "zànqiě",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "干了几天，小王就不想干了。大家没办法，只得暂且由他去。",
        "romanization": "gàn le jǐtiān， xiǎo wáng jiù bùxiǎng gàn le。 dàjiā méibànfǎ， zhǐdé zànqiě yóu tā qù。",
        "translation": "After a few days, Xiao Wang didn't want to work [that job] anymore. Everyone had no choice but to leave him for the time being."
      }
    ]
  },
  {
    "id": "zh_屡次_731",
    "language": "zh",
    "pattern": "屡次",
    "title": "屡次 (repeatedly)",
    "shortExplanation": "repeatedly",
    "longExplanation": "repeatedly. Pinyin: lǚcì",
    "formation": "lǚcì",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "屡次创业，却屡次惨遭失败的人总想知道，创业有窍门吗?",
        "romanization": "lǚcì chuàngyè， què lǚcì cǎnzāo shībài de rén zǒng xiǎng zhīdào， chuàngyè yǒu qiàomén ma?",
        "translation": "People who repeatedly start businesses but repeatedly fail miserably often wonder, “Are there any secrets to starting a [successful] business?”"
      }
    ]
  },
  {
    "id": "zh_依据_732",
    "language": "zh",
    "pattern": "依据",
    "title": "依据 (basis)",
    "shortExplanation": "basis",
    "longExplanation": "basis. Pinyin: yījù",
    "formation": "yījù",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "你们这样做有法律依据吗?",
        "romanization": "nǐmen zhèyàng zuò yǒu fǎlǜ yījù ma?",
        "translation": "Do you have any legal basis for doing so?"
      }
    ]
  },
  {
    "id": "zh_依据_733",
    "language": "zh",
    "pattern": "依据",
    "title": "依据 (based on)",
    "shortExplanation": "based on",
    "longExplanation": "based on. Pinyin: yījù",
    "formation": "yījù",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "创业必须依据市场需求，这是一条永恒的真理。",
        "romanization": "chuàngyè bìxū yījù shìchǎng xūqiú， zhè shì yī tiáo yǒnghéng de zhēnlǐ。",
        "translation": "It is an eternal truth that entrepreneurship must be based on market demand."
      }
    ]
  },
  {
    "id": "zh_任意_734",
    "language": "zh",
    "pattern": "任意",
    "title": "任意 (arbitrary)",
    "shortExplanation": "arbitrary",
    "longExplanation": "arbitrary. Pinyin: rènyì",
    "formation": "rènyì",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "合同一旦生效，任何一方都不能任意反悔了。",
        "romanization": "hétong yīdàn shēngxiào， rènhé yīfāng dōu bùnéng rènyì fǎnhuǐ le。",
        "translation": "Once the contract comes into force, neither party can change their minds arbitrarily."
      }
    ]
  },
  {
    "id": "zh_尚未_735",
    "language": "zh",
    "pattern": "尚未",
    "title": "尚未 (not yet)",
    "shortExplanation": "not yet",
    "longExplanation": "not yet. Pinyin: shàngwèi",
    "formation": "shàngwèi",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "所谓潜在的市场，就是尚未被人们认识的市场。",
        "romanization": "suǒwèi qiánzài de shìchǎng， jiùshì shàngwèi bèi rénmen rènshi de shìchǎng。",
        "translation": "The so-called potential market is the market not yet recognized by people."
      }
    ]
  },
  {
    "id": "zh_把放在眼里_736",
    "language": "zh",
    "pattern": "(把)……放在眼里",
    "title": "(把)……放在眼里 (take … seriously)",
    "shortExplanation": "take … seriously",
    "longExplanation": "take … seriously. Pinyin: ( bǎ)…… fàngzàiyǎnlǐ",
    "formation": "( bǎ)…… fàngzàiyǎnlǐ",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "这点困难她根本不放在眼里。",
        "romanization": "zhè diǎn kùnnan tā gēnběn bù fàngzàiyǎnlǐ。",
        "translation": "[As for] this (little bit of) difficulty, she didn't take it seriously  at all."
      }
    ]
  },
  {
    "id": "zh_不无_737",
    "language": "zh",
    "pattern": "不无",
    "title": "不无 (not without)",
    "shortExplanation": "not without",
    "longExplanation": "not without. Pinyin: bùwú",
    "formation": "bùwú",
    "level": "HSK 6",
    "examples": [
      {
        "sentence": "她说工资低，这也不无道理。",
        "romanization": "tā shuō gōngzī dī， zhè yě bùwú dàoli。",
        "translation": "She says that her salary is low. This is not without reason."
      }
    ]
  }
];

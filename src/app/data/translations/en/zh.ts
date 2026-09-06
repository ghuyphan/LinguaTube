import { GrammarTranslation } from '../../../models/grammar.model';

export const GRAMMAR_EN_ZH: Record<string, GrammarTranslation> = {
  "en_a1_01": {
    "title": "am / is / are - be动词的现在时形式",
    "shortExplanation": "be动词现在时形式：I 搭配 am；he/she/it 搭配 is；you/we/they 搭配 are；意为“是、在”或表状态。",
    "longExplanation": "be动词是英语中最核心且最基础的动词，常译为“是”、“在”或作为连系动词连接主语和表语（形容词、名词等）。在一般现在时中，be动词随主语的人称和数分为三种形式：\n• 'am'：仅用于第一人称单数 'I'。\n• 'is'：用于第三人称单数（he、she、it 以及单数可数名词或不可数名词）。\n• 'are'：用于第二人称及各复数人称（you、we、they 以及复数名词）。",
    "formation": "主语 + am / is / are (+ 名词 / 形容词 / 介词短语)",
    "examples": [
      {
        "translation": "我饿了。"
      },
      {
        "translation": "她是一名医生。"
      },
      {
        "translation": "他们准备好了。"
      }
    ]
  },
  "en_a1_02": {
    "title": "be动词的否定句：am not / isn't / aren't",
    "shortExplanation": "在be动词后直接加 'not' 构成否定；缩略形式为 isn't (= is not)、aren't (= are not)、I'm not。",
    "longExplanation": "be动词的否定句构成非常规则，只需在 'am'、'is'、'are' 之后添加否定词 'not' 即可。在日常交际和口语中，通常使用缩略形式：\n• is not 缩写为 isn't\n• are not 缩写为 aren't\n• am not 在标准英语中没有 'amn't' 这种形式，而是与主语缩写为 I'm not（特殊例外）。",
    "formation": "主语 + am / is / are + not (+ 名词 / 形容词)",
    "examples": [
      {
        "translation": "我不是学生。"
      },
      {
        "translation": "他不累。"
      },
      {
        "translation": "我们还没准备好。"
      }
    ]
  },
  "en_a1_03": {
    "title": "be动词的疑问句：Am I? / Is she? / Are they?",
    "shortExplanation": "将be动词提至主语前构成一般疑问句；特殊疑问句为：疑问词 + be动词 + 主语。",
    "longExplanation": "含有be动词的句子在变疑问句时，需将 'am / is / are' 置于主语之前（例如：She is → Is she?）。\n• 一般疑问句：Am / Is / Are + 主语...？\n• 特殊疑问句：特殊疑问词（Where, What, Who 等）+ am / is / are + 主语...？\n• 简略回答：Yes, 主语代词 + be动词. / No, 主语代词 + be动词 + not.",
    "formation": "Am / Is / Are + 主语...? 或 疑问词 + am / is / are + 主语...?",
    "examples": [
      {
        "translation": "你是学生吗？"
      },
      {
        "translation": "这个贵吗？"
      },
      {
        "translation": "他们在哪里？"
      }
    ]
  },
  "en_a1_04": {
    "title": "简略回答：Yes, I am. / No, she isn't.",
    "shortExplanation": "be动词问句的简略回答：肯定回答必须使用完整形式（如 Yes, I am；不可缩写为 Yes, I'm）；否定回答常使用缩略形式。",
    "longExplanation": "回答以be动词开头的疑问句时，通常使用简略回答，结构为：Yes/No + 人称代词 + be动词。\n• 肯定回答：be动词必须用完整形式，绝对不可缩写（例如：Yes, I am. 正确 / Yes, I'm. 错误；Yes, she is. 正确 / Yes, she's. 错误）。\n• 否定回答：通常使用缩略形式（例如：No, I'm not. / No, she isn't. / No, they aren't.）。",
    "formation": "肯定：Yes, + 代词 + am / is / are. | 否定：No, + 代词 + am not / isn't / aren't.",
    "examples": [
      {
        "translation": "她准备好了吗？——是的，她准备好了。"
      },
      {
        "translation": "他们是你的朋友吗？——不，他们不是。"
      }
    ]
  },
  "en_a1_05": {
    "title": "不定冠词：a / an",
    "shortExplanation": "置于单数可数名词前，表示泛指或初次提及；以辅音音素开头用 'a'，以元音音素开头用 'an'。",
    "longExplanation": "'a' 和 'an' 是不定冠词，置于单数可数名词之前，用于泛指某类人或事物中的一个，或者初次提及的对象。选用 'a' 还是 'an' 取决于紧随其后的单词的发音（音素），而非拼写字母：\n• 'a' 用于以辅音音素开头的单词前：a book、a car、a university（首音为辅音/半元音 /juː/）。\n• 'an' 用于以元音音素开头的单词前：an apple、an orange、an hour（字母 h 不发音，以元音 /aʊ/ 开头）、an honest person。\n• 不可数名词及复数名词前不可使用 a/an。",
    "formation": "a + 辅音音素开头的词 / an + 元音音素开头的词 + 单数可数名词",
    "examples": [
      {
        "translation": "我看见花园里有一只猫。"
      },
      {
        "translation": "她是一名工程师。"
      },
      {
        "translation": "这花了一个小时。"
      }
    ]
  },
  "en_a1_06": {
    "title": "定冠词：the",
    "shortExplanation": "用于说话双方心知肚明的特定对象，或世上独一无二的事物、最高级等。",
    "longExplanation": "'the' 是定冠词，可修饰单数名词、复数名词及不可数名词，表示特指。主要用法包括：\n1. 前文已经提到过的人或物：I saw a cat. The cat was black.\n2. 世界上独一无二的事物：the sun（太阳）、the moon（月亮）、the earth（地球）。\n3. 结合上下文或现场语境双方心知肚明的对象：Close the window, please.（请关上窗户）。\n4. 与形容词最高级和序数词连用：the best（最好的）、the first（第一）。",
    "formation": "the + 名词（单数、复数或不可数）",
    "examples": [
      {
        "translation": "我们看的那部电影太精彩了。"
      },
      {
        "translation": "你能把盐递给我吗？"
      }
    ]
  },
  "en_a1_07": {
    "title": "零冠词：不使用冠词的情况",
    "shortExplanation": "专有名词、语言、运动项目，以及表示泛指的不可数名词或复数名词前通常不加冠词。",
    "longExplanation": "在英语中，名词前不加任何冠词（a, an, the）的现象称为零冠词。主要情形包括：\n• 专有名词（人名、城市名、国名）：John、London、Russia、China。\n• 语言名称：English、Spanish、Chinese。\n• 球类运动与棋类游戏：football、basketball、chess。\n• 泛指的饮食与物质名词：I love coffee, She drinks milk.\n• 泛指的抽象概念：Life is short. Love is blind.\n• 泛指某一类人或事物的复数名词：Dogs are friendly.",
    "formation": "动词 / 介词 + 名词（不加冠词）",
    "examples": [
      {
        "translation": "她说西班牙语。"
      },
      {
        "translation": "他每天都打篮球。"
      }
    ]
  },
  "en_a1_08": {
    "title": "一般现在时：肯定句",
    "shortExplanation": "表示经常性习惯、普遍真理或客观事实；主语为第三人称单数时动词需加 -s 或 -es。",
    "longExplanation": "一般现在时（Present Simple）用于表示经常性、规律性的动作，客观事实以及自然规律。\n• 动词形式规则：\n- 主语为 I / you / we / they 或复数名词：动词使用原形。\n- 主语为 he / she / it 或单数名词（第三人称单数）：动词末尾加 '-s' 或 '-es'。\n• 动词加 -s / -es 的拼写规则：\n- 大多数动词：直接加 '-s'（works, plays）。\n- 以 -o, -ch, -sh, -s, -ss, -x 结尾的动词：加 '-es'（goes, watches, washes）。\n- 以“辅音字母 + y”结尾的动词：变 y 为 '-ies'（study → studies, try → tries）。",
    "formation": "主语 (I/you/we/they) + 动词原形 | 主语 (he/she/it) + 动词原形加 -s/-es",
    "examples": [
      {
        "translation": "我每天早晨都喝咖啡。"
      },
      {
        "translation": "她在一家医院工作。"
      },
      {
        "translation": "地球绕着太阳运转。"
      }
    ]
  },
  "en_a1_09": {
    "title": "一般现在时：否定句 (don't / doesn't)",
    "shortExplanation": "借助助动词 'don't' 或 'doesn't' 后接动词原形构成否定句。",
    "longExplanation": "在一般现在时中，实义动词的否定句需要借助助动词 do / does 与 not 结合，后接动词原形：\n• 主语为 I / you / we / they 时：主语 + don't (do not) + 动词原形。\n• 主语为 he / she / it（第三人称单数）时：主语 + doesn't (does not) + 动词原形。\n特别注意：在 doesn't 之后，动词必须还原为原形，不能再加 -s 或 -es（正确：He doesn't like / 错误：He doesn't likes）。",
    "formation": "主语 (I/you/we/they) + don't + 动词原形 | 主语 (he/she/it) + doesn't + 动词原形",
    "examples": [
      {
        "translation": "我不吃肉。"
      },
      {
        "translation": "他不会说法语。"
      },
      {
        "translation": "他们不在这里工作。"
      }
    ]
  },
  "en_a1_10": {
    "title": "一般现在时：疑问句 (Do you? / Does she?)",
    "shortExplanation": "将助动词 Do 或 Does 提至主语前；特殊疑问句为：疑问词 + do/does + 主语 + 动词原形。",
    "longExplanation": "一般现在时中对实义动词提问时，将助动词 Do 或 Does 置于主语之前，谓语动词使用原形：\n• 一般疑问句：\n- Do + I/you/we/they + 动词原形...？\n- Does + he/she/it + 动词原形...？\n• 特殊疑问句：特殊疑问词（Where, What, When 等）+ do / does + 主语 + 动词原形...？",
    "formation": "Do / Does + 主语 + 动词原形...? 或 疑问词 + do / does + 主语 + 动词原形...?",
    "examples": [
      {
        "translation": "你会说俄语吗？"
      },
      {
        "translation": "她住在附近吗？"
      },
      {
        "translation": "你在哪里工作？"
      }
    ]
  },
  "en_a1_11": {
    "title": "状态动词：通常不用于进行时的动词",
    "shortExplanation": "表示心理状态、情感或感官的动词通常不用于进行时（使用 'I know'，不可用 'I am knowing'）。",
    "longExplanation": "状态动词（Stative verbs）用于表示某种持续的状态、知觉、情感或所有关系，而非具体的动作。这类动词通常不能用于现在进行时或任何进行时态：\n• 认知与观点：know（知道）、believe（相信）、understand（理解）、remember（记得）、forget（忘记）。\n• 情感与愿望：love（爱）、hate（讨厌）、like（喜欢）、want（想要）、need（需要）、prefer（更喜欢）。\n• 感官与知觉：see（看见）、hear（听见）、smell（闻起来）、taste（尝起来）。\n• 存在与所有：belong（属于）、contain（包含）、seem（似乎）、appear（显得）。",
    "formation": "主语 + 状态动词（使用一般时态，不用进行时态 -ing 形式）",
    "examples": [
      {
        "translation": "我理解你的意思。（不可说：I am understanding）"
      },
      {
        "translation": "她很喜欢巧克力。（不可说：is loving）"
      }
    ]
  },
  "en_a1_12": {
    "title": "人称代词：I, you, he, she, it, we, they",
    "shortExplanation": "英语句子必须有明确的主语；区分作主语的主格（I, you, he...）与作宾语的宾格（me, you, him...）。",
    "longExplanation": "在英语中，完整的陈述句必须包含明确的主语，不能随意省略代词主语。\n• 主格代词（在句中作主语，置于动词前）：I（我）、you（你/你们）、he（他）、she（她）、it（它）、we（我们）、they（他们）。\n• 宾格代词（作动词或介词的宾语，置于动词或介词后）：me、you、him、her、it、us、them（例如：Tell him, Listen to me, Help us）。",
    "formation": "主格代词 + 动词 | 动词 / 介词 + 宾格代词",
    "examples": [
      {
        "translation": "她是一名教师。"
      },
      {
        "translation": "把真相告诉他。"
      },
      {
        "translation": "你能帮我一下吗？"
      }
    ]
  },
  "en_a1_13": {
    "title": "形容词性物主代词：my, your, his, her, its, our, their",
    "shortExplanation": "置于名词前表示所属关系（“我的”、“你的”等）；形式不随所修饰名词的单复数改变。",
    "longExplanation": "形容词性物主代词用于指明物品的归属，必须放在名词前面使用：\n• my（我的）、your（你的/你们的）、his（他的）、her（她的）、its（它的）、our（我们的）、their（他们的）。\n• 重要辨析：区分 'its'（物主代词，无撇号）与 'it's'（it is 或 it has 的缩写，有撇号）。\n• 形容词性物主代词本身没有单复数变化：my friend（我的一个朋友）/ my friends（我的朋友们）中 'my' 保持不变。",
    "formation": "形容词性物主代词 (my / your / his / her / its / our / their) + 名词",
    "examples": [
      {
        "translation": "这是我的手机。"
      },
      {
        "translation": "他们的狗很可爱。"
      },
      {
        "translation": "那只猫弄伤了它的爪子。"
      }
    ]
  },
  "en_a1_14": {
    "title": "名词复数形式",
    "shortExplanation": "规则变化在词尾加 -s 或 -es；另有 -y、-f/-fe 结尾的变化及不规则复数变化形式。",
    "longExplanation": "英语可数名词表示两个或两个以上时须使用复数形式：\n• 一般规则：在词尾直接加 '-s'（cat → cats、book → books）。\n• 以 -s, -ss, -sh, -ch, -x, -o 结尾：加 '-es'（box → boxes、watch → watches、tomato → tomatoes）。\n• “元音字母 + y”结尾：直接加 '-s'（boy → boys、day → days）。\n• “辅音字母 + y”结尾：变 y 为 '-ies'（city → cities、baby → babies）。\n• 以 -f 或 -fe 结尾：变 -f/-fe 为 '-ves'（knife → knives、leaf → leaves、wife → wives）。\n• 常见不规则复数：child → children、man → men、woman → women、tooth → teeth、foot → feet、mouse → mice、person → people、sheep → sheep、fish → fish。",
    "formation": "单数名词 + s / es / ies / ves（或不规则复数形式）",
    "examples": [
      {
        "translation": "一辆公共汽车 → 两辆公共汽车"
      },
      {
        "translation": "一个孩子 → 许多孩子"
      }
    ]
  },
  "en_a1_15": {
    "title": "指示代词：This / that / these / those",
    "shortExplanation": "this/these 指代较近的人或事物；that/those 指代较远的人或事物；this/that 接单数，these/those 接复数。",
    "longExplanation": "指示代词用于指代特定的人或事物，依据空间或时间上的远近以及数量的单复数进行区分：\n• 'this'（这，这个）：指代距离说话人较近的单数对象。\n• 'these'（这些）：指代距离说话人较近的复数对象。\n• 'that'（那，那个）：指代距离说话人较远的单数对象，或前文提及的事物。\n• 'those'（那些）：指代距离说话人较远的复数对象。\n在时间表达中也经常使用：this week（本周）、that year（那一年）。",
    "formation": "This / That + 单数名词（或单数动词）| These / Those + 复数名词（或复数动词）",
    "examples": [
      {
        "translation": "这是我的包。"
      },
      {
        "translation": "那些鞋子很贵。"
      },
      {
        "translation": "那是什么？"
      }
    ]
  },
  "en_a1_16": {
    "title": "There is / There are - 表示存在",
    "shortExplanation": "用于表示某处存在某人或某物，相当于汉语的'有……'。",
    "longExplanation": "'There is / There are'句型用于表示人或事物的存在（相当于汉语中的'有'）。\n• There is 后面接单数可数名词或不可数名词。\n• There are 后面接复数可数名词。\n否定式：There isn't / There aren't。\n疑问式：将be动词提前至句首，即 Is there...? / Are there...?",
    "formation": "肯定句：There is + 单数名词/不可数名词 | There are + 复数名词\n否定句：There isn't / There aren't + 名词\n疑问句：Is there...? / Are there...?",
    "examples": [
      {
        "translation": "这附近有一家电影院。"
      },
      {
        "translation": "附近有商店吗？——是的，有。"
      }
    ]
  },
  "en_a1_17": {
    "title": "地点介词：in, on, at, under, next to, behind, between",
    "shortExplanation": "用于明确人或事物在空间中的具体位置；'在……里'、'在……上'、'在……处'等。",
    "longExplanation": "三个最核心的地点介词：\n• in = 在某个空间或范围内部：in the box（盒子里）、in the city（城市里）、in bed（在床上）\n• on = 在表面上：on the table（桌子上）、on the wall（墙上）、on the left（在左边）\n• at = 在某个具体地点或位置点：at the station（在车站）、at home（在家）、at school（在学校）\n其他常用介词：under（在……下方）、next to / beside（在……旁边）、behind（在……后面）、in front of（在……前面）、between（在……两者之间）、opposite（在……对面）。",
    "formation": "地点介词 (in / on / at / under / next to / behind...) + 名词短语/地点",
    "examples": [
      {
        "translation": "钥匙在桌子上。"
      },
      {
        "translation": "她在厨房里。"
      },
      {
        "translation": "在入口处碰头吧。"
      }
    ]
  },
  "en_a1_18": {
    "title": "祈使句（Imperative）",
    "shortExplanation": "用于发出命令、请求、指示或劝诱建议；'请……'、'不要……'、'让我们……'。",
    "longExplanation": "祈使句用于表达指示、指令、警告或建议，通常省略主语，直接以动词原形开头。\n• 肯定形式：动词原形开头（例如：Open your books - 打开书本）。\n• 否定形式：Don't + 动词原形（例如：Don't run - 不要跑）。\n• 在句首或句尾加上'please'可以使语气更加礼貌客气。\n• 包含说话人在内的提议或号召：Let's + 动词原形（例如：Let's go! - 我们走吧！）。",
    "formation": "肯定句：动词原形 (+ 宾语/其他成分)\n否定句：Don't + 动词原形\n礼貌请求：(Please) + 动词原形 + (please)\n提议劝诱：Let's + 动词原形",
    "examples": [
      {
        "translation": "在十字路口向左转。"
      },
      {
        "translation": "不要碰那个！"
      },
      {
        "translation": "我们休息一下吧。"
      }
    ]
  },
  "en_a1_19": {
    "title": "can / can't - 能力、可能性与许可",
    "shortExplanation": "情态动词，用于表示能力、可能性或请求许可；'能'、'会'、'可以' / '不能'。",
    "longExplanation": "'can'是情态动词，后面接动词原形，常用于表达：\n1. 能力或技能：I can play the guitar（我会弹吉他）。\n2. 可能性或客观情况：It can be dangerous（这可能会很危险）。\n3. 请求或给予许可（常用于口语）：Can I use your phone?（我可以用一下你的手机吗？）\n否定形式为 can't（cannot 的缩写）。",
    "formation": "肯定句：主语 + can + 动词原形\n否定句：主语 + can't (cannot) + 动词原形\n疑问句：Can + 主语 + 动词原形...?",
    "examples": [
      {
        "translation": "我会说三种语言。"
      },
      {
        "translation": "她今天来不了。"
      },
      {
        "translation": "请问你能帮我一下吗？"
      }
    ]
  },
  "en_a1_20": {
    "title": "疑问词：what, where, who, when, how, why, which, whose, how much/many",
    "shortExplanation": "用于引导特殊疑问句以获取具体信息；'什么'、'哪里'、'谁'、'怎样'等。",
    "longExplanation": "疑问词通常置于疑问句句首，后接助动词或be动词，再接主语。\n• what = 什么\n• where = 哪里、何处\n• who = 谁（询问主语时不需要助动词do/does：Who lives here?）\n• when = 什么时候\n• why = 为什么\n• which = 哪一个（有特定选择范围）\n• whose = 谁的\n• how = 怎样、如何；how much = 多少（修饰不可数名词/价格）；how many = 多少（修饰可数名词复数）；how old = 多大年纪；how long = 多久/多长。",
    "formation": "疑问词 + 助动词 / be动词 + 主语 + 动词原形 / 其他成分...?",
    "examples": [
      {
        "translation": "她在哪里工作？"
      },
      {
        "translation": "现在几点了？"
      },
      {
        "translation": "你有几个兄弟？"
      }
    ]
  },
  "en_a1_21": {
    "title": "基数词（Cardinal numerals）：1–1000",
    "shortExplanation": "用于计算人或事物的数量；'一、二、三……一百、一千'。",
    "longExplanation": "英语中1到1000基数词的构成规律：\n• 1至12：各自有独立单词（one, two, three... twelve）。\n• 13至19：词尾加'-teen'（thirteen, fourteen... nineteen；注意 thirteen, fifteen, eighteen 的拼写变化）。\n• 几十的整数：词尾为'-ty'（twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety）。\n• 几十几的复合数字：用连字符连接（例如：21 = twenty-one）。\n• 百与千：100 = a/one hundred；1000 = a/one thousand。\n• 在英式英语中，hundred之后通常用'and'连接后面的十位或个位（例如：two hundred and fifty）。",
    "formation": "十位数 + 连字符 (-) + 个位数 (21–99) | 数量词 + hundred / thousand (+ and + 其余数字)",
    "examples": [
      {
        "translation": "她二十三岁。"
      },
      {
        "translation": "这张票价值四百英镑。"
      }
    ]
  },
  "en_a1_22": {
    "title": "序数词（Ordinal numbers）：first, second, third...",
    "shortExplanation": "用于表示顺序、位次、日期或楼层；'第一、第二、第三……'。",
    "longExplanation": "英语序数词大多数通过在基数词后加'-th'构成：fourth, sixth, seventh...\n特殊变化形式需单独记忆：first（第1）、second（第2）、third（第3）、fifth（第5）、eighth（第8）、ninth（第9）、twelfth（第12）。\n用法要点：序数词前通常必须加定冠词'the'（例如：the first day - 第一天，the third floor - 三楼）。\n分数表达：½ = a half（二分之一），⅓ = a third（三分之一），¼ = a quarter（四分之一）。",
    "formation": "the + 序数词 (+ 名词) | （例如：the first, the second, the third... the twenty-first）",
    "examples": [
      {
        "translation": "我的办公室在三楼。"
      },
      {
        "translation": "今天是三月一日。"
      }
    ]
  },
  "en_a1_23": {
    "title": "名词所有格：'s 与 s'",
    "shortExplanation": "用撇号与字母's'表示所属关系；'……的'。",
    "longExplanation": "英语中主要通过撇号和字母s（'s 或 s'）来表示生命体或特定对象的所属关系：\n• 单数名词：在词尾加's（例如：Tom's book - 汤姆的书，the dog's tail - 狗的尾巴）。\n• 以-s结尾的规则复数名词：仅加撇号'（例如：the teachers' room - 教师办公室，my parents' house - 我父母的房子）。\n• 不规则复数名词（不以-s结尾）：加's（例如：the children's playground - 孩子们游乐场，men's clothes - 男士服装）。\n• 以-s结尾的人名专有名词：James's 或 James' 两种拼写均可。",
    "formation": "单数名词 + 's + 所属名词 | 以-s结尾的复数名词 + ' + 所属名词",
    "examples": [
      {
        "translation": "这是安娜的笔记本电脑。"
      },
      {
        "translation": "孩子们的玩具都在箱子里。"
      }
    ]
  },
  "en_a1_24": {
    "title": "方向与动态介词：to, into, out of, up, down, along, across, through",
    "shortExplanation": "与移动动词搭配，用于表示运动的方向或轨迹；'向'、'进入'、'穿过'等。",
    "longExplanation": "动态介词常与表示位移的动词连用，表示运动的方向、路径与轨迹：\n• to = 朝着某个目标点移动：go to work（去上班）、walk to the park（步行去公园）\n• into = 向内部移动：come into the room（走进房间）、jump into the pool（跳进泳池）\n• out of = 从内部移向外部：get out of the car（从车里出来）、take out of the bag（从包里拿出来）\n• up / down = 向上 / 向下：climb up the hill（爬上小山）、walk down the stairs（走下楼梯）\n• along = 沿着：walk along the river（沿着河边走）\n• across = 从表面穿过/横穿：swim across the lake（游过湖）、walk across the road（过马路）\n• through = 从立体空间或内部穿过：drive through the tunnel（开车穿过隧道）。",
    "formation": "移动动词 + 动态介词 (to / into / out of / across / through...) + 名词/地点",
    "examples": [
      {
        "translation": "她走进了房间。"
      },
      {
        "translation": "他跑着穿过了马路。"
      },
      {
        "translation": "我们驱车穿过了森林。"
      }
    ]
  },
  "en_a2_01": {
    "title": "一般过去时 - 规则动词：加 -ed",
    "shortExplanation": "表示在过去已经完成的动作或状态，规则动词在词尾加'-ed'。",
    "longExplanation": "一般过去时用于描述在过去特定时间发生且已结束的动作。\n规则动词过去式加'-ed'的拼写规则：\n• 大多数动词：直接加'-ed'（worked, played）。\n• 以'-e'结尾的动词：直接加'-d'（loved, used）。\n• 以'辅音字母 + y'结尾的动词：变'y'为'i'再加'-ed'（studied, tried）。\n• 以单个短元音加单个辅音字母结尾的重读音节动词：双写该辅音字母再加'-ed'（stopped, planned）。",
    "formation": "主语 + 规则动词过去式(-ed) (+ 宾语/时间状语)",
    "examples": [
      {
        "translation": "她昨天工作了一整天。"
      },
      {
        "translation": "他们上周日打了网球。"
      }
    ]
  },
  "en_a2_02": {
    "title": "一般过去时 - 不规则动词",
    "shortExplanation": "用于描述过去的动作，不规则动词不按加'-ed'的规则变化，拥有独特的过去式形式。",
    "longExplanation": "英语中许多常用动词在变成过去式时不加'-ed'，而是具有独特的不规则变化形态（最核心的50个动词覆盖了约90%的日常使用）。\n按形态变化规律归类：\n• AAA型（原形、过去式、过去分词均相同）：cut, put, hit, set, let。\n• ABA型（过去分词回到原形）：run→ran→run, come→came→come。\n• ABC型（三态各不相同）：go→went→gone, be→was/were→been, see→saw→seen。\n• ABB型（过去式与过去分词相同）：have→had→had, buy→bought→bought。",
    "formation": "主语 + 不规则动词过去式 (+ 宾语/时间状语)",
    "examples": [
      {
        "translation": "我去年夏天去了巴黎。"
      },
      {
        "translation": "她看了一部非常棒的电影。"
      },
      {
        "translation": "我们上午9点开了一个会。"
      }
    ]
  },
  "en_a2_03": {
    "title": "一般过去时 - 否定句：didn't + 动词原形",
    "shortExplanation": "用于否定过去发生的动作或事件，表示'过去没有做某事'。",
    "longExplanation": "在一般过去时中，普通动词的否定句统一使用助动词'did'加'not'，通常缩写为'didn't'，适用于所有人称主语。\n关键规则：助动词'didn't'之后，主要动词必须恢复为动词原形，绝对不能再使用过去式（例如：She didn't go，而不能说 She didn't went）。",
    "formation": "主语 + didn't (did not) + 动词原形",
    "examples": [
      {
        "translation": "我昨天没有见到他。"
      },
      {
        "translation": "她没有去上班。"
      }
    ]
  },
  "en_a2_04": {
    "title": "一般过去时 - 疑问句：Did you? Where did she go?",
    "shortExplanation": "用于询问过去发生的动作或事件；'……了吗？'、'去哪儿了？'等。",
    "longExplanation": "一般过去时中普通动词疑问句的构成方式：\n• 一般疑问句：将助动词'Did'置于句首，接主语和动词原形：Did + 主语 + 动词原形？（例如：Did they arrive? - 他们到了吗？）。\n• 特殊疑问句：疑问词置于句首，后接 did、主语及动词原形：疑问词 + did + 主语 + 动词原形？（例如：Where did they go? - 他们去哪里了？）。\n• 特殊情况：当疑问词本身作主语时，不使用助动词did，动词直接使用过去式（例如：Who told you that? - 谁告诉你那件事的？）。",
    "formation": "一般疑问句：Did + 主语 + 动词原形...?\n特殊疑问句：疑问词 + did + 主语 + 动词原形...?",
    "examples": [
      {
        "translation": "你喜欢那部电影吗？"
      },
      {
        "translation": "他们去哪儿了？"
      },
      {
        "translation": "谁告诉你那件事的？"
      }
    ]
  },
  "en_a2_05": {
    "title": "was / were - be动词的过去式",
    "shortExplanation": "be动词的过去时态形式，用于描述过去的状态、身份或特征；'是'、'在'。",
    "longExplanation": "be动词在一般过去时中有两种形式，根据主语的人称和单复数而定：\n• was：用于第一人称单数和第三人称单数主语（I, he, she, it 以及单数名词/不可数名词）。\n• were：用于第二人称和复数主语（you, we, they 以及复数名词）。\n否定式：wasn't（was not 的缩写）/ weren't（were not 的缩写）。\n疑问式：将 was 或 were 提前至主语之前：Was she...? / Were they...?",
    "formation": "肯定句：I / He / She / It + was | You / We / They + were\n否定句：主语 + wasn't / weren't\n疑问句：Was / Were + 主语...?",
    "examples": [
      {
        "translation": "我昨晚非常累。"
      },
      {
        "translation": "他们一整天都在家。"
      },
      {
        "translation": "那个东西贵吗？"
      }
    ]
  },
  "en_a2_06": {
    "title": "will - 预测与临时即兴决定",
    "shortExplanation": "情态动词，用于表达说话时即刻做出的决定、主观预测、承诺或请求；'将'、'会'。",
    "longExplanation": "'will'作为情态助动词后接动词原形，常用于以下情境：\n1. 即时决定（在说话时刻做出的决定）：I'll help you with that（我来帮你做那件事）。\n2. 无明确计划的主观预测：I think it will rain（我觉得天要下雨了）。\n3. 承诺与保证：I won't tell anyone（我不会告诉任何人的）。\n4. 请求与邀请：Will you open the window?（你能打开窗户吗？）。\n缩写形式为'll。否定形式为 won't（will not 的缩写）。",
    "formation": "肯定句：主语 + will ('ll) + 动词原形\n否定句：主语 + won't (will not) + 动词原形\n疑问句：Will + 主语 + 动词原形...?",
    "examples": [
      {
        "translation": "电话在响。——我去接！"
      },
      {
        "translation": "明天天气会很冷。"
      }
    ]
  },
  "en_a2_07": {
    "title": "be going to - 计划打算与依据预见",
    "shortExplanation": "表示事先做好的打算、计划，或根据现有迹象做出的明显预测。",
    "longExplanation": "'be going to'主要用于以下两种情况：\n1. 事先做好的决定或计划打算：例如 'I'm going to start a diet next week.'（我打算下周开始节食）。\n2. 根据眼前的明显迹象做出的推断与预测：例如 'Look at those clouds - it's going to rain!'（看那些乌云——要下雨了！）。\n结构：am/is/are + going to + 动词原形",
    "formation": "主语 + am/is/are + going to + 动词原形",
    "examples": [
      {
        "translation": "我打算学医。"
      },
      {
        "translation": "她要生小孩了。"
      }
    ]
  },
  "en_a2_08": {
    "title": "现在进行时：am/is/are + V-ing",
    "shortExplanation": "表示此时此刻正在进行的动作，或现阶段暂时发生的行为。",
    "longExplanation": "现在进行时用于描述说话瞬间正在发生的动作，或现阶段处于暂时状态的事情。\n结构：am/is/are + 动词现在分词（-ing形式）\n动词加-ing的规则：\n• 一般动词：直接加-ing → working, playing\n• 以不发音的-e结尾：去掉-e再加-ing → making, coming\n• 短元音的重读闭音节：双写末尾辅音字母再加-ing → running, sitting",
    "formation": "主语 + am/is/are + 动词-ing形式",
    "examples": [
      {
        "translation": "我现在正在学英语。"
      },
      {
        "translation": "她这个月都在居家办公。"
      }
    ]
  },
  "en_a2_09": {
    "title": "现在进行时表示既定未来计划",
    "shortExplanation": "用于表示未来已做好明确安排或约定的计划日程。",
    "longExplanation": "现在进行时可用于表示将来确切的安排或约定，通常时间和地点均已商定好。\n区别比较：\n• 'I'm meeting Alice tomorrow'：双方已约定好见面的具体安排（确定的计划）。\n• 'I'll meet Alice tomorrow'：临时决定、个人意图或随口提议。",
    "formation": "主语 + am/is/are + 动词-ing形式 + 将来时间状语",
    "examples": [
      {
        "translation": "我今晚要和亚历克斯一起吃晚餐。"
      },
      {
        "translation": "他们定于六月份结婚。"
      }
    ]
  },
  "en_a2_10": {
    "title": "一般现在时与现在进行时的区别",
    "shortExplanation": "一般现在时表示习惯与客观事实；现在进行时表示此刻正在进行或现阶段暂时发生的事。",
    "longExplanation": "一般现在时（Present Simple）：用于表示长期的习惯、客观真理、固定日程或普遍事实。\n现在进行时（Present Continuous）：用于表示此刻正在发生的事情，或现阶段短期的临时状态。\n对比示例：\n• 'She speaks French.'：她会讲法语（属于长期掌握的语言能力）。\n• 'She is speaking French.'：她此刻正在讲法语。",
    "formation": "一般现在时：主语 + 动词原形/第三人称单数形式 | 现在进行时：主语 + am/is/are + 动词-ing形式",
    "examples": [
      {
        "translation": "水在100摄氏度时沸腾。"
      },
      {
        "translation": "这周我正在读一本很棒的书。"
      }
    ]
  },
  "en_a2_11": {
    "title": "should / shouldn't - 建议与劝告",
    "shortExplanation": "用于提出温和的建议或个人观点，意为'应该'或'不应该'。",
    "longExplanation": "'should'用于表达友善的建议、劝告或个人意见，语气比'must'缓和得多。\n'should / shouldn't'后接不带to的动词原形。\n此外，'should have + 过去分词'还可用于对过去的事情表达遗憾、责备或后悔。",
    "formation": "主语 + should / shouldn't + 动词原形",
    "examples": [
      {
        "translation": "你应该多做运动。"
      },
      {
        "translation": "她不应该工作得那么拼命。"
      }
    ]
  },
  "en_a2_12": {
    "title": "must / mustn't - 必须与严厉禁止",
    "shortExplanation": "'must'表示强烈的责任或命令；'mustn't'表示严厉的禁止，意为'绝不能'、'千万不可'。",
    "longExplanation": "'must'表示出于内心强烈认同的义务或命令，语气十分坚决。\n'mustn't'则表示强烈的禁止，指绝对不允许做某事。\n注意区分：\n• mustn't = 禁止、严禁（绝不能做）\n• don't have to = 不必（没有硬性规定，做与不做均可）",
    "formation": "主语 + must / mustn't + 动词原形",
    "examples": [
      {
        "translation": "你必须出示护照。"
      },
      {
        "translation": "你绝对不能在这里吸烟。"
      }
    ]
  },
  "en_a2_13": {
    "title": "have to - 客观必要性",
    "shortExplanation": "表示由于外界规则、法律或客观情况所迫而'不得不'、'必须'做某事。",
    "longExplanation": "'have to'表示源于外界要求、规章制度或现实环境的客观必要性。\n与'must'的区别：\n• must - 出自主观意愿的必要性：'I must call her'（我觉得我很有必要给她打电话）。\n• have to - 客观规则约束：'I have to wear a uniform'（这是校规或工服规定）。\n'don't have to' = 没必要做（不作强制要求，想做也可以做）。",
    "formation": "主语 + have to / has to / don't have to / doesn't have to + 动词原形",
    "examples": [
      {
        "translation": "我必须在周五之前完成这份报告。"
      },
      {
        "translation": "如果你不想去，就不必去了。"
      }
    ]
  },
  "en_a2_14": {
    "title": "could - 过去能力与委婉礼貌请求",
    "shortExplanation": "表示过去具备的能力，或在提出请求与请求帮助时表达委婉礼貌的语气。",
    "longExplanation": "'could'是'can'的过去式，主要有两个核心用法：\n1. 过去的能力：例如 'I could read at 4 years old.'（我4岁时就会读书了）。\n2. 委婉礼貌的请求（比'can'更加客气和尊崇）：例如 'Could you pass the salt, please?'（请把盐递给我好吗？）。\n此外还可用于表达现在的可能性：'It could be true.'（这可能是真的）。",
    "formation": "主语 + could + 动词原形 | Could + 主语 + 动词原形...?",
    "examples": [
      {
        "translation": "她小时候就会拉小提琴。"
      },
      {
        "translation": "请问您能讲得慢一点吗？"
      }
    ]
  },
  "en_a2_15": {
    "title": "形容词比较级",
    "shortExplanation": "用于两者之间的比较：单音节形容词词尾加-er，多音节形容词前加more。",
    "longExplanation": "形容词比较级的构成规则：\n• 单音节词及以-y结尾的双音节词：词尾加-er（fast → faster, happy → happier）。\n• 多音节词（多数双音节及三音节以上）：more + 形容词原级（more interesting）。\n• 拼写规则：以-e结尾只加-r（nice → nicer）；重读闭音节双写末尾辅音（big → bigger）；以辅音字母加-y结尾变y为-ier（heavy → heavier）。\n• 不规则变化：good → better, bad → worse, far → further/farther, much/many → more。\n比较级后面常用than连接比较对象：'She is taller than her sister.'",
    "formation": "短形容词-er + than / more + 长形容词 + than",
    "examples": [
      {
        "translation": "这部电影比那部更有趣。"
      },
      {
        "translation": "今天的情况比昨天更糟。"
      }
    ]
  },
  "en_a2_16": {
    "title": "形容词最高级",
    "shortExplanation": "用于三者或三者以上的比较：单音节形容词用'the + -est'，多音节形容词用'the most + 形容词'。",
    "longExplanation": "形容词最高级的构成规则：\n• 单音节词：the + 形容词尾加-est（the biggest）。\n• 多音节词：the most + 形容词原级（the most beautiful）。\n• 拼写变化规则与比较级一致：以-e结尾直接加-st（the nicest）；双写末尾辅音字母（the biggest）；变-y为-iest（the heaviest）。\n• 不规则变化：good → the best, bad → the worst, far → the furthest/farthest, much/many → the most。",
    "formation": "the + 短形容词-est / the most + 长形容词",
    "examples": [
      {
        "translation": "这是全城最昂贵的餐厅。"
      },
      {
        "translation": "他是全队最出色的队员。"
      }
    ]
  },
  "en_a2_17": {
    "title": "some / any - 不定量代词与限定词",
    "shortExplanation": "'some'常用于肯定句及礼貌提议；'any'常用于否定句和一般疑问句。",
    "longExplanation": "'some'和'any'均可修饰不可数名词或可数名词复数，表示'一些、某些'：\n• some：用于肯定句；以及希望得到肯定回答或表示诚意邀请、请求的疑问句中（如：'Would you like some tea?'，'Can I have some water?'）。\n• any：用于否定句（表示'任何、一点也没有'）和普通疑问句中（如：'Do you have any questions?'）。",
    "formation": "some / any + 不可数名词 或 可数名词复数",
    "examples": [
      {
        "translation": "我买了一些面包和牛奶。"
      },
      {
        "translation": "冰箱里还有牛奶吗？"
      },
      {
        "translation": "我身上没有带任何现金。"
      }
    ]
  },
  "en_a2_18": {
    "title": "much / many / a lot of / a few / a little - 数量词",
    "shortExplanation": "'much/a little'修饰不可数名词；'many/a few'修饰可数名词复数；'a lot of'两者皆可修饰。",
    "longExplanation": "常用数量表达方式及用法区别：\n• much：修饰不可数名词（much water, much time），多用于否定句和疑问句。\n• many：修饰可数名词复数（many people, many books）。\n• a lot of / lots of：两者均可修饰，常用于日常口语肯定句。\n• a few：有几个、一些（修饰可数名词，含肯定意味）。\n• few：几乎没有（修饰可数名词，含否定意味）。\n• a little：有一点（修饰不可数名词，含肯定意味）。\n• little：几乎没有（修饰不可数名词，含否定意味）。",
    "formation": "much/a little + 不可数名词 | many/a few + 可数名词复数 | a lot of + 两者皆可",
    "examples": [
      {
        "translation": "我没有多少时间了。"
      },
      {
        "translation": "她在伦敦有几位朋友。"
      },
      {
        "translation": "还剩下一点糖。"
      }
    ]
  },
  "en_a2_19": {
    "title": "可数名词与不可数名词",
    "shortExplanation": "可数名词有单复数之分；不可数名词不能直接计数，没有复数形式，不能直接加不定冠词。",
    "longExplanation": "可数名词与不可数名词的界定与用法：\n• 可数名词（Countable）：可以用具体数字直接计数，有单数和复数形式（如：a book, two books）。\n• 不可数名词（Uncountable）：无法直接用数字计数，没有复数形式，前面不能加 a/an。\n常见不可数名词：water（水）、milk（牛奶）、bread（面包）、rice（大米）、money（金钱）、information（信息）、advice（建议）、news（新闻）、weather（天气）、luggage（行李）、furniture（家具）、hair（头发）、music（音乐）、work（工作）。\n表示不可数名词的数量时，需使用计量单位词：a glass of water（一杯水）、a piece of advice（一条建议）、a loaf of bread（一条面包）、a bag of rice（一袋大米）。",
    "formation": "可数：a/an + 单数名词 / 复数名词-s/es | 不可数：计量词 + of + 不可数名词",
    "examples": [
      {
        "translation": "请问能给我提供一些信息吗？"
      },
      {
        "translation": "她给了我非常实用的建议。"
      }
    ]
  },
  "en_a2_20": {
    "title": "时间介词 in / on / at",
    "shortExplanation": "'at'用于具体时间点；'on'用于具体某一天和日期；'in'用于月份、年份、季节及较长时段。",
    "longExplanation": "常用时间介词的用法规则：\n• at → 具体的具体时刻或特殊节点：at 6 o'clock（6点整）、at noon（正午）、at midnight（午夜）、at night（在夜间）、at the weekend（在周末）。\n• on → 特定的某一天或具体日期：on Monday（在星期一）、on 5 March（在3月5日）、on my birthday（在我生日那天）、on New Year's Day（在元旦）。\n• in → 较长的时间段（月份、年份、季节、世纪）及一日当中的某一时段：in July（在七月）、in 2023（在2023年）、in the morning/afternoon/evening（在上午/下午/晚上）、in summer（在夏天）、in the 21st century（在21世纪）。\n不加介词的情况：含有this / last / next的时间状语前不加介词（如：this morning, last week, next year）。",
    "formation": "at + 具体钟点/时刻 | on + 星期/具体日期 | in + 月份/年份/季节/世纪",
    "examples": [
      {
        "translation": "会议在三点半举行。"
      },
      {
        "translation": "她出生于四月十二日。"
      },
      {
        "translation": "我是十月份开始这份工作的。"
      }
    ]
  },
  "en_a2_21": {
    "title": "for / since / ago - 时段、起点与过去时间",
    "shortExplanation": "'for'表示持续的一段时间；'since'表示动作开始的时间起点；'ago'表示从现在起算过去的某个时间点。",
    "longExplanation": "for, since 和 ago 的用法及区别：\n• for - 表示动作持续了多久（一段时间）：for two hours（持续两小时）、for a week（持续一周）、for years（持续数年）。可用于多种时态。\n• since - 表示动作开始的过去具体时间点（自……以来）：since Monday（自周一以来）、since 2019（自2019年以来）、since I was a child（自幼童时期起）。常与现在完成时连用。\n• ago - 用于一段时间之后，表示距今多久以前：three days ago（三天前）、a month ago（一个月前）。仅与一般过去时连用。",
    "formation": "for + 一段时间 | since + 时间起点/过去从句 | 一段时间 + ago",
    "examples": [
      {
        "translation": "我已经在这里待了六个月了。"
      },
      {
        "translation": "她从2020年起就在这里工作了。"
      },
      {
        "translation": "我两天前见到了他。"
      }
    ]
  },
  "en_a2_22": {
    "title": "反意疑问句（附加疑问句）：...isn't it? / ...do you? / ...haven't they?",
    "shortExplanation": "用于陈述句后寻求确认或求证；相当于汉语中的'……是吗？'、'……对吧？'。",
    "longExplanation": "反意疑问句（附加疑问句）由陈述句加上简短的疑问尾句构成，主要用于向对方求证事实或寻求赞同。\n核心规则：\n• 前肯后否：陈述部分为肯定句，疑问尾句用否定形式（例：你喜欢爵士乐，对吧？）。\n• 前否后肯：陈述部分为否定句，疑问尾句用肯定形式（例：你不喜欢恐怖片，是吗？）。\n疑问尾句中的助动词（包括系动词、助动词或情态动词）必须与陈述部分的时态及主语人称保持一致，且尾句主语须用相应的人称代词。\n语调特点：\n• 降调（↘）：说话人倾向于确认事实或寻求附和，并非真正询问。\n• 升调（↗）：说话人对事实并不确信，属于真正的提问。",
    "formation": "肯定句：肯定陈述句 + , + 否定形式助动词 + 代词主语？\n否定句：否定陈述句 + , + 肯定形式助动词 + 代词主语？",
    "examples": [
      {
        "translation": "今天天气真不错，对吧？"
      },
      {
        "translation": "你不喜欢看恐怖电影，是吗？"
      },
      {
        "translation": "她会游泳，不是吗？"
      }
    ]
  },
  "en_a2_23": {
    "title": "have got - 表所属/拥有（英式口语）",
    "shortExplanation": "英式英语中常用于口语表达拥有或具备某物；相当于动词 have，'有'。",
    "longExplanation": "have got 在英式英语口语中极为常用，用来表示所属关系或拥有，其含义完全等同于普通的 have。\n句型结构：\n• 肯定式：主语 + have got / has got（常缩写为 've got / 's got）。\n• 否定式：主语 + haven't got / hasn't got（无需借助助动词 do/does）。\n• 疑问式：Have / Has + 主语 + got...?（简略回答：Yes, I have. / No, I haven't.）。\n注意：该结构仅用于一般现在时表示所属；在过去时中直接使用 had，不可使用 had got 表示所属。",
    "formation": "肯定句：主语 + have got / has got + 名词\n否定句：主语 + haven't got / hasn't got + 名词\n疑问句：Have / Has + 主语 + got + 名词？",
    "examples": [
      {
        "translation": "我有两个哥哥。"
      },
      {
        "translation": "你知道现在几点了吗？"
      },
      {
        "translation": "她身上没带任何现金。"
      }
    ]
  },
  "en_a2_24": {
    "title": "方式副词：quickly, carefully, well, hard, fast",
    "shortExplanation": "用于修饰动词，说明动作以何种方式进行；通常位于动词或宾语之后。",
    "longExplanation": "方式副词用于描述动作进行的方式、状态或特点。\n构成规则：\n• 大多数方式副词由形容词后加后缀 -ly 构成：quick → quickly（快速地）、careful → carefully（仔细地）、slow → slowly（缓慢地）。\n特殊与不规则变化：\n• good → well（好地；没有 goodly 这种形式）。\n• fast → fast（快速地；形容词与副词同形，无 fastly）。\n• hard → hard（努力地、猛烈地；hardly 为另一个词，意为'几乎不'）。\n• late → late（迟、晚；lately 为另一个词，意为'最近、近来'）。\n句中位置：通常位于动词之后，或位于动词的宾语之后（例：She speaks English well）。切忌将副词放在动词与直接宾语之间。",
    "formation": "形容词 + -ly（或不规则同形副词）\n句中位置：动词 + 副词 或 动词 + 宾语 + 副词",
    "examples": [
      {
        "translation": "他把事情解释得很清楚。"
      },
      {
        "translation": "她跑得很快。"
      },
      {
        "translation": "他们一整天都在辛勤工作。"
      }
    ]
  },
  "en_a2_25": {
    "title": "频度副词及其在句中的位置",
    "shortExplanation": "用于表达动作发生的频繁程度；常位于实义动词之前、系动词及助动词之后。",
    "longExplanation": "频度副词用来表达某件事或某个动作发生的频率高低。\n常见频度副词（频率从高到低）：\nalways（总是 100%）→ usually（通常 90%）→ often（经常 70%）→ sometimes（有时 50%）→ occasionally（偶尔 30%）→ rarely / seldom（罕见、极少 10%）→ never（从不 0%）。\n句中位置规则：\n• 位于实义动词（行为动词）之前：She always drinks tea.\n• 位于系动词 be 之后：He is always late.\n• 位于助动词或情态动词之后：She has never been to Italy.\n注：短语形式的频度表达（如 every day, once a week, twice a month 等）通常放在句末。",
    "formation": "主语 + 频度副词 + 实义动词\n主语 + 系动词/助动词 + 频度副词",
    "examples": [
      {
        "translation": "我通常早上7点起床。"
      },
      {
        "translation": "她上班从不迟到。"
      },
      {
        "translation": "他们每周见一次面。"
      }
    ]
  },
  "en_a2_26": {
    "title": "名词前多个形容词的排列顺序",
    "shortExplanation": "当多个形容词共同修饰一个名词时，必须遵循固定的前后排列先后顺序。",
    "longExplanation": "在英语中，当名词前面出现两个或两个以上的修饰性形容词时，通常遵循严格的先后排列顺序：\n1. 观点/主观评价（Opinion：lovely, beautiful）\n2. 尺寸/大小（Size：big, small）\n3. 年龄/新旧（Age：old, young, new）\n4. 形状（Shape：round, square）\n5. 颜色（Color：red, brown）\n6. 来源/产地（Origin：Italian, French）\n7. 质地/材料（Material：leather, wooden）\n8. 用途/功能（Purpose：writing, sports）\n→ 最后接中心名词。\n例：a small beautiful old square brown French wooden writing desk（一张精致小巧、年代久远、方形棕色的法国木质写字台）。",
    "formation": "观点 + 大小 + 新旧 + 形状 + 颜色 + 产地 + 材料 + 用途 + 中心名词",
    "examples": [
      {
        "translation": "一座可爱小巧的古朴小屋"
      },
      {
        "translation": "一辆红色的大号意大利跑车"
      }
    ]
  },
  "en_b1_01": {
    "title": "现在完成时 - 形式与用法",
    "shortExplanation": "强调过去发生的动作对现在产生的影响、结果，或过去的经历与持续状态；'已经……'、'曾经……'。",
    "longExplanation": "现在完成时用于将过去的动作或状态与现在联系起来。\n基本构成：主语 + have / has + 动词过去分词（规则动词加 -ed，不规则动词需单独记忆变化）。\n三大核心用法：\n1. 人生经历（不提及具体时间）：表示过去是否有过某项体验，如 I have visited Tokyo（我去过东京）。\n2. 对现在造成的结果或影响：强调过去发生的事在当下产生的状态，如 I have lost my keys（我把钥匙弄丢了，现在手里没有钥匙）。\n3. 持续到现在的动作或状态：动作起于过去，一直延续至今，如 She has lived here for 5 years（她在这里住了5年）。",
    "formation": "肯定句：主语 + have / has + 过去分词\n否定句：主语 + haven't / hasn't + 过去分词\n疑问句：Have / Has + 主语 + 过去分词？",
    "examples": [
      {
        "translation": "你吃过寿司吗？"
      },
      {
        "translation": "我刚刚做完家庭作业。"
      },
      {
        "translation": "她还没有打电话来。"
      }
    ]
  },
  "en_b1_02": {
    "title": "ever / never / already / yet / just - 现在完成时标志副词",
    "shortExplanation": "与现在完成时连用的常用时间副词，用于强调人生体验、提前完成或刚发生的状态。",
    "longExplanation": "这些副词是现在完成时中最典型的标志词，各自有着固定的用法与位置：\n• ever（曾经）：常用于疑问句中询问是否有某种人生经历。位置：置于过去分词之前。\n• never（从不、从未）：表示全盘否定的经历。位置：置于过去分词之前（句中不再加 not）。\n• already（已经）：强调事情比预期更早发生。位置：常位于过去分词前，亦可置于句末。\n• yet（还、已经）：常用于否定句（表示'尚未、还没'）与疑问句（表示'已经……了吗'）。位置：通常置于句末。\n• just（刚刚）：表示动作在极短的片刻之前刚发生。位置：置于过去分词之前。",
    "formation": "主语 + have / has + ever / never / already / just + 过去分词\n主语 + haven't / hasn't + 过去分词 + yet\nHave / Has + 主语 + ever + 过去分词？\nHave / Has + 主语 + 过去分词 + yet？",
    "examples": [
      {
        "translation": "你曾经去过苏格兰吗？"
      },
      {
        "translation": "我从没吃过蜗牛。"
      },
      {
        "translation": "我已经看过那部电影了。"
      }
    ]
  },
  "en_b1_03": {
    "title": "现在完成时与一般过去时的区别 - 核心差异",
    "shortExplanation": "现在完成时强调动作与现在的关联及影响（不提及具体过去时间）；一般过去时仅表示过去明确时间发生并已结束的事实。",
    "longExplanation": "这是英语语法中最关键的区别之一。\n• 现在完成时：动作发生在过去，但重点在于对现在的影响或结果，句中不能带有表示具体的过去时间状语。例如：I've lost my wallet（我的钱包丢了——核心在于当下我现在手里没钱包）。\n• 一般过去时：动作在过去已经彻底发生并结束，通常带有明确的过去时间状语（如 yesterday, last night, in 2019 等）或存在具体的过去语境。例如：I lost my wallet yesterday（我昨天把钱包丢了——强调事件发生在昨天这个具体时间）。",
    "formation": "现在完成时：主语 + have / has + 过去分词（无具体过去时间点）\n一般过去时：主语 + 动词过去式（常带具体过去时间状语）",
    "examples": [
      {
        "translation": "我已经见过新来的主管了。"
      },
      {
        "translation": "我上周二见到了他。"
      }
    ]
  },
  "en_b1_04": {
    "title": "现在完成时与 for 及 since 的搭配用法",
    "shortExplanation": "用于表达动作从过去某时开始一直持续到当下；for 后接时间段，since 后接时间点。",
    "longExplanation": "在现在完成时中，for 和 since 是回答'多久了？'（How long...?）的核心引导词：\n• for（长达、计有）：后接表示持续长度的一段时间（例如：for two days, for a year, for a long time, for ages）。\n• since（自……以来、从……起）：后接一个明确的历史起始时间点，或是由一般过去时引导的时间状语从句（例如：since Monday, since 2015, since I was a child）。\n询问动作持续时间的疑问句型为：How long + have / has + 主语 + 过去分词...?",
    "formation": "主语 + have / has + 过去分词 + for + 时间段\n主语 + have / has + 过去分词 + since + 时间点/一般过去时从句",
    "examples": [
      {
        "translation": "她在这里工作已经有十年了。"
      },
      {
        "translation": "我和他从大学时代起就认识了。"
      }
    ]
  },
  "en_b1_05": {
    "title": "现在完成进行时：have been + 动词现在分词(-ing)",
    "shortExplanation": "强调动作从过去持续到现在的过程、时长，或解释当前眼前的结果；'一直在做……'。",
    "longExplanation": "现在完成进行时着重强调动作的延续性、未完成性或长时间的过程。\n基本构成：主语 + have / has been + 动词现在分词（-ing 形式）。\n核心特点：\n1. 强调过程的持续性（回答'持续了多久？'）：I've been waiting for an hour（我已经等了整整一个小时了）。\n2. 用于解释眼前的直观结果或状态：You look tired - have you been running?（你看起来很累——刚才跑步去了吗？）。\n与现在完成时（简单式）的区别：\n• 现在完成时强调结果与完成度：I've read 50 pages（我已经读了50页——看重成效）。\n• 现在完成进行时强调动作的过程本身：I've been reading all evening（我整个晚上都在看书——看重投入的时间与持续动作）。",
    "formation": "肯定句：主语 + have / has been + 动词现在分词(-ing)\n否定句：主语 + haven't / hasn't been + 动词现在分词(-ing)\n疑问句：Have / Has + 主语 + been + 动词现在分词(-ing)？",
    "examples": [
      {
        "translation": "我已经学了整整两年的英语了。"
      },
      {
        "translation": "你的手怎么脏兮兮的？——我刚才一直在修车。"
      }
    ]
  },
  "en_b1_06": {
    "title": "过去进行时：was/were + 动词现在分词(-ing)",
    "shortExplanation": "表示在过去某一具体时刻或某一段时间内正在进行的动作；'那时正在做……'。",
    "longExplanation": "过去进行时用于表达过去某个特定时间点上正在发生或持续的动作。\n构成公式：主语 + was / were + 动词现在分词（-ing 形式）。单数主语用 was，复数及第二人称用 were。\n核心用法场景：\n1. 过去某一具体时刻正在发生的动作：At 9pm I was having dinner（昨晚9点我正在吃晚饭）。\n2. 作为背景动作被另一突发动作打断：I was walking when it started to rain（我正在散步，突然下起了雨）。\n3. 过去同时进行的两个平行对比动作：While she was cooking, he was watching TV（她做饭的时候，他正在看电视）。",
    "formation": "肯定句：主语 + was / were + 动词现在分词(-ing)\n否定句：主语 + wasn't / weren't + 动词现在分词(-ing)\n疑问句：Was / Were + 主语 + 动词现在分词(-ing)？",
    "examples": [
      {
        "translation": "我出门的时候天正下着雨。"
      },
      {
        "translation": "昨天晚上7点你在做什么呢？"
      }
    ]
  },
  "en_b1_07": {
    "title": "一般过去时与过去进行时 - 背景动作与插曲事件",
    "shortExplanation": "过去进行时用于描绘持续发生的长背景动作，一般过去时用于表达突发插入的短动作。",
    "longExplanation": "这是讲述过去故事时的经典句式搭配：一个持续进行的长动作作为背景（用过去进行时），中间被一个短暂突发的动作打断（用一般过去时）。\n常用连词规则：\n• when（当……时）：通常引导一般过去时从句，表示突发介入的短暂事件：She was sleeping when the alarm went off（她正睡着，闹钟突然响了）。\n• while / as（正当……之际）：通常引导过去进行时从句，用于交代持续的背景动作：While I was watching TV, the power went out（我正在看电视，突然停电了）。",
    "formation": "过去进行时分句 + when + 一般过去时分句\nWhile + 过去进行时分句 + , + 一般过去时分句",
    "examples": [
      {
        "translation": "她正在洗澡，电话突然响了起来。"
      },
      {
        "translation": "在他发表演讲的时候，有人睡着了。"
      }
    ]
  },
  "en_b1_08": {
    "title": "零级条件句：If + 一般现在时，一般现在时 - 客观真理与规律",
    "shortExplanation": "用于叙述客观真理、科学事实或自然规律；'只要……就必然……'。",
    "longExplanation": "零级条件句（Zero Conditional）用于表达科学定律、客观规律或无可置疑的事实常识。在这些情况下，只要前提条件满足，结果就必然百分之百发生。\n句型公式：If + 一般现在时从句，一般现在时主句。\n核心特点：从句与主句均采用一般现在时，因为两件事属于因果必然关系。\n在零级条件句中，连词 if 通常可以与 when 相互替换而意思保持不变：When you mix red and blue, you get purple（将红蓝两色混合时，就会得到紫色）。",
    "formation": "If / When + 主语 + 动词一般现在时 + , + 主语 + 动词一般现在时",
    "examples": [
      {
        "translation": "如果给冰加热，它就会融化。"
      },
      {
        "translation": "如果下雨，街道就会变湿。"
      }
    ]
  },
  "en_b1_09": {
    "title": "第一类条件句：If + 一般现在时，will - 真实的将来可能",
    "shortExplanation": "表示在将来现实生活中完全有可能发生的事情或条件；'如果……就会……'。",
    "longExplanation": "第一类条件句（First Conditional）用于表达在现在或将来极有可能成真、符合现实的假设及可能导致的结果。\n句型结构：If + 一般现在时从句，主语 + will + 动词原形。\n核心规则：\n• 主将从现：条件从句（if从句）必须使用一般现在时，绝对不可使用 will；主句则使用一般将来时。\n• 主句中的 will 也可以根据需要替换为情态动词 can, may, might, should 等，以表达不同的情态语气或建议。\n• 主句与从句位置可以互换，若主句在前则中间无需加逗号：I'll stay home if it rains。",
    "formation": "If + 主语 + 动词一般现在时 + , + 主语 + will / can / may + 动词原形",
    "examples": [
      {
        "translation": "如果她用功学习，她就会通过考试。"
      },
      {
        "translation": "如果你需要帮忙，我可以过来。"
      }
    ]
  },
  "en_b1_10": {
    "title": "第二类条件句：If + 一般过去时，would - 与现在事实相反的虚拟假设",
    "shortExplanation": "用于假想与现在或将来事实相反的情况，或可能性极小的事情；'要是……就会……'。",
    "longExplanation": "第二类条件句（Second Conditional，即对现在的虚拟语气）用于表达与现在客观事实相反的纯粹设想，或在将来几乎不太可能实现的假设情况。\n句型公式：If + 一般过去时从句，主语 + would + 动词原形。\n核心要点：\n• 从句谓语采用一般过去时。如果是系动词 be，在传统规范英语中无论人称单复数一律使用 were（如 If I were you...）。\n• 主句使用情态动词过去式 would / could / might + 动词原形，表达假定推导出的结果。",
    "formation": "If + 主语 + 动词一般过去时 + , + 主语 + would / could + 动词原形",
    "examples": [
      {
        "translation": "如果我中了彩票，我就会去环游世界。"
      },
      {
        "translation": "要是我再长高一点，我就会去打篮球了。"
      }
    ]
  },
  "en_b1_11": {
    "title": "第一类与第二类条件句对比：真实条件句 vs 非真实条件句",
    "shortExplanation": "对比第一类条件句（可能发生的事实或未来可能）与第二类条件句（与现在事实相反的假设或不太可能的情况）。",
    "longExplanation": "选择第一类还是第二类条件句取决于说话人对情况真实性的把握与态度：\n• 第一类条件句（If + 一般现在时，will + 动词原形）：表示说话人认为条件很可能实现或完全符合实际（例如：'If I see her'——我预计会见到她）。\n• 第二类条件句（If + 一般过去时，would + 动词原形）：表示与现在事实相反的假设，或说话人认为极不可能发生的事情（例如：'If I saw her'——几乎不可能见到，纯属幻想）。\n这不仅是语法形式的区别，更体现了说话人对事件可能性的主观看法。",
    "formation": "第一类：If + 主语 + 一般现在时动词，主语 + will + 动词原形\n第二类：If + 主语 + 一般过去时动词，主语 + would + 动词原形",
    "examples": [
      {
        "translation": "如果明天下雨，我会带把伞。（现实中很有可能发生）"
      },
      {
        "translation": "如果天天都下雨，我就搬去西班牙。（不太可能的假设或幻想）"
      }
    ]
  },
  "en_b1_12": {
    "title": "一般现在时的被动语态：am / is / are + 过去分词",
    "shortExplanation": "表示经常性、习惯性或现阶段客观存在的被动动作，侧重动作本身或承受者。",
    "longExplanation": "一般现在时的被动语态主要在以下情况使用：\n• 动作本身比动作的执行者更重要或更值得关注。\n• 动作的执行者未知、不言自明或无需提及。\n构成规则：主语 + am / is / are + 过去分词。如果需要指明动作的执行者，可用介词 'by' 引出：例如 'The window is broken by the children'（窗户被孩子们打破了）。",
    "formation": "主语 + am / is / are + 过去分词 (+ by + 动作执行者)",
    "examples": [
      {
        "translation": "许多国家都讲英语。"
      },
      {
        "translation": "这封信是用法语写的。"
      }
    ]
  },
  "en_b1_13": {
    "title": "一般过去时的被动语态：was / were + 过去分词",
    "shortExplanation": "表示过去发生的被动动作或过去承受某种动作的状态；'被……'、'受到……'。",
    "longExplanation": "一般过去时的被动语态用于强调过去某个时刻或时间段内发生的动作承受情况：\n• 单数主语（I、he、she、it及不可数/单数名词）使用 was + 过去分词\n• 复数主语（you、we、they及复数名词）使用 were + 过去分词\n主动语态转被动语态示例：Someone stole my car.（有人偷了我的车。）→ My car was stolen.（我的车被偷了。）",
    "formation": "主语 + was / were + 过去分词 (+ by + 动作执行者)",
    "examples": [
      {
        "translation": "埃菲尔铁塔建于1889年。"
      },
      {
        "translation": "事故中有三人受伤。"
      }
    ]
  },
  "en_b1_14": {
    "title": "现在完成时的被动语态：has / have been + 过去分词",
    "shortExplanation": "表示过去发生并已经完成的被动动作，强调该动作对现在造成的影响或结果。",
    "longExplanation": "现在完成时的被动语态用于强调动作已经完成并产生了当前的结果，而不需要指明动作具体发生的确切时间：\n• 第三人称单数主语使用 has been + 过去分词\n• 其他人称及复数主语使用 have been + 过去分词",
    "formation": "主语 + has / have been + 过去分词",
    "examples": [
      {
        "translation": "该项目已经顺利竣工。"
      },
      {
        "translation": "所有宾客均已接到通知。"
      }
    ]
  },
  "en_b1_15": {
    "title": "间接引语——时态后退规则",
    "shortExplanation": "当引述动词为过去时，将直接引语转为间接引语时，从句的时态通常需要相应地往过去推移一个时态。",
    "longExplanation": "在间接引语中，若主句引述动词（如 said, told）为过去时，宾语从句的时态通常遵循'时态后退'规则：\n• 一般现在时 → 一般过去时（work → worked）\n• 一般过去时 → 过去完成时（went → had gone）\n• 现在完成时 → 过去完成时（have seen → had seen）\n• 情态动词变化：will → would、can → could、is/am going to → was going to。",
    "formation": "主语 + said (that) / told + 宾语 + (that) + 降阶时态从句",
    "examples": [
      {
        "translation": "她说：'我要走了。' → 她说她要走了。"
      },
      {
        "translation": "他告诉我：'我来不了。' → 他告诉我他来不了了。"
      }
    ]
  },
  "en_b1_16": {
    "title": "间接疑问句：疑问词 / if / whether + 陈述语序",
    "shortExplanation": "直接引语的疑问句转为间接引语时，必须使用陈述句语序（主语 + 谓语动词），不再使用倒装。",
    "longExplanation": "在间接疑问句中需注意以下三条核心规则：\n1. 语序还原为陈述句语序（主语在前，谓语动词在后），绝不倒装。\n2. 去掉疑问句助动词 do / does / did。\n3. 特殊疑问句保留原疑问词（where, what, who 等）引导从句；一般疑问句（Yes/No 问句）使用 if 或 whether 引导，意为'是否'。",
    "formation": "特殊疑问句：主语 + asked + 疑问词 + 主语 + 谓语动词\n一般疑问句：主语 + asked + if / whether + 主语 + 谓语动词",
    "examples": [
      {
        "translation": "'你在哪里工作？' → 她问我在哪里工作。"
      },
      {
        "translation": "'你结婚了吗？' → 他想知道我是否结了婚。"
      }
    ]
  },
  "en_b1_17": {
    "title": "间接引语中 say 与 tell 的区别",
    "shortExplanation": "say 后面通常不直接接听话人；tell 后面必须紧跟听话的对象（人称宾语）。",
    "longExplanation": "在转述间接引语时，say 和 tell 的接续用法有明确区分：\n• say (that)...：后方无需跟听话的人（例如：She said she was tired）。若要提及对象，必须加介词 to：said to me。\n• tell + 人 + (that)...：tell 后面必须直接跟听话的人作为宾语（例如：She told me she was tired）。\n常见错误：He told that he was late ✗ → 正确表达：He said that he was late ✓ 或 He told us that he was late ✓。",
    "formation": "主语 + say/said + (that) + 从句\n主语 + tell/told + 听话人宾语 + (that) + 从句",
    "examples": [
      {
        "translation": "她说她需要帮助。"
      },
      {
        "translation": "他告诉我们会议已经取消了。"
      }
    ]
  },
  "en_b1_18": {
    "title": "动词后接动名词（动词-ing形式）",
    "shortExplanation": "某些动词后必须接动名词（动词-ing）作为宾语，而不能接不定式（to + 动词原形）。",
    "longExplanation": "英语中有一类及物动词只能接动名词（V-ing）作宾语：\n常见动词包括：enjoy（享受/喜爱）、finish（完成）、avoid（避免）、mind（介意）、suggest（建议）、keep（保持/持续）、consider（考虑）、deny（否认）、imagine（想象）、miss（错过/想念）、practice（练习）、risk（冒……险）、admit（承认）、delay（推迟）、give up（放弃）、put off（拖延）、recommend（推荐/建议）等。\n记忆诀窍：动名词通常表达已经发生、实际体验过或具有持续过程性质的行为动作。",
    "formation": "主语 + 动词 + 动名词 (动词-ing)",
    "examples": [
      {
        "translation": "我喜欢在海里游泳。"
      },
      {
        "translation": "她正在考虑移居国外。"
      },
      {
        "translation": "他刻意回避了眼神接触。"
      }
    ]
  },
  "en_b1_19": {
    "title": "动词后接不定式（to + 动词原形）",
    "shortExplanation": "某些动词后必须接不定式（to + 动词原形）作宾语，通常表达未来的意向、期望或计划。",
    "longExplanation": "英语中许多动词要求后接不定式（to-infinitive）作宾语，这类动词多与未来的意图、决定、愿望或计划相关：\n常见动词包括：want（想要）、decide（决定）、hope（希望）、plan（计划）、manage（设法做到）、agree（同意）、promise（承诺）、refuse（拒绝）、fail（未能做到）、expect（期盼）、offer（提议）、learn（学习）、need（需要）、afford（负担得起）、arrange（安排）、attempt（尝试）、choose（选择）、demand（要求）、deserve（值得）、pretend（假装）、tend（倾向于）、threaten（威胁要）等。",
    "formation": "主语 + 动词 + to + 动词原形",
    "examples": [
      {
        "translation": "她决定辞去自己的工作。"
      },
      {
        "translation": "我希望能尽快见到你。"
      },
      {
        "translation": "他未能给出答复。"
      }
    ]
  },
  "en_b1_20": {
    "title": "兼接动名词与不定式的动词（like, love, hate, start, begin）",
    "shortExplanation": "这类动词后既可以接动名词（V-ing）也可以接不定式（to-V），意义相同或仅有细微语感差别。",
    "longExplanation": "在英语中，部分动词后接动名词（V-ing）或不定式（to-V）均可：\n• 表示喜好的动词（like, love, hate, prefer）：接 V-ing 侧重于表达一般的兴趣、爱好或享受某种活动的过程（如：'I love cooking'——我平时很喜欢烹饪）；接 to-V 则常侧重于特定情境下的选择或习惯动作（如：'I like to wake up early'——我习惯早起）。\n• 表示开始或继续的动词（start, begin, continue）：接两种形式在意义上几乎没有任何实质性差异。",
    "formation": "主语 + like / love / hate / start / begin + 动名词 (V-ing) 或 to + 动词原形",
    "examples": [
      {
        "translation": "我热爱旅行。"
      },
      {
        "translation": "她从五月份开始在这里工作。"
      }
    ]
  },
  "en_b1_21": {
    "title": "used to——过去的习惯与状态",
    "shortExplanation": "表示过去经常发生或曾经存在但现在已经停止的习惯、动作或状态；'过去常常'、'曾经'。",
    "longExplanation": "'used to' 用于表达过去规律性的动作、习惯或状态，而这种习惯或状态目前已不复存在。\n• 肯定形式：主语 + used to + 动词原形\n• 否定形式：主语 + didn't use to + 动词原形\n• 疑问形式：Did + 主语 + use to + 动词原形……？\n与 'be used to + 动名词/名词' 的区别：'be used to' 表示'现在习惯于某事'（例如：'I am used to waking up early'——我已经习惯早起了）。",
    "formation": "肯定句：主语 + used to + 动词原形\n否定句：主语 + didn't use to + 动词原形\n疑问句：Did + 主语 + use to + 动词原形？",
    "examples": [
      {
        "translation": "我过去常常抽烟，不过后来戒掉了。"
      },
      {
        "translation": "你以前曾经演奏过某种乐器吗？"
      }
    ]
  },
  "en_b1_22": {
    "title": "定语从句：who, which, that, where, whose",
    "shortExplanation": "使用关系代词或关系副词引导从句，修饰前面的先行词（名词或代词）。",
    "longExplanation": "定语从句用于为前面的名词（先行词）提供修饰和补充说明：\n• who：先行词为人，在从句中作主语或宾语（例：The woman who called is my sister）。\n• which：先行词为物或动物（例：The book which I borrowed was great）。\n• that：在限制性定语从句中既可指人也可指物（例：The car that he bought is new）。\n• where：关系副词，先行词为地点，并在从句中作地点状语（例：The café where we met is closed）。\n• whose：关系代词，表示所属关系，相当于'……的'（例：The girl whose bag was stolen）。\n提示：在口语交流中，当关系代词在从句中充当动词宾语时常常可以省略：The film (that) I saw。",
    "formation": "先行词 (名词) + who / which / that / where / whose + 从句",
    "examples": [
      {
        "translation": "住在隔壁的那位男士非常友善。"
      },
      {
        "translation": "我们入住的那家酒店自带一个游泳池。"
      }
    ]
  },
  "en_b1_23": {
    "title": "表示对比与转折的连词：although, however, despite, in spite of, whereas",
    "shortExplanation": "用于表达转折、让步或对比关系的连接词与副词；'虽然'、'尽管'、'然而'、'而'。",
    "longExplanation": "英语中表示对比与让步的连接词在语法搭配上有严格区分：\n• although / even though / though + 从句（主语 + 谓语）：表示'虽然、尽管'。\n• despite / in spite of + 名词 / 代词 / 动名词（V-ing）：注意后面绝对不能直接接完整的陈述从句。\n• however：副词，常置于句首（位于句号或分号之后），后接逗号，表示'然而、不过'。\n• whereas：从属连词，用于对比两个对照明显的事实，意为'然而、鉴于、而'。",
    "formation": "although / even though + 从句\ndespite / in spite of + 名词 / 代词 / 动名词\nhowever, + 新完整句子\n分句1, whereas + 分句2",
    "examples": [
      {
        "translation": "虽然很累，但她还是坚持继续工作。"
      },
      {
        "translation": "尽管下着雨，他依然骑自行车去上班。"
      },
      {
        "translation": "价格很昂贵。然而，物有所值。"
      }
    ]
  },
  "en_b1_24": {
    "title": "将来进行时：will be + 动词-ing",
    "shortExplanation": "表示将来某一特定时刻正在进行的动作，或按计划必然发生的未来行动。",
    "longExplanation": "将来进行时主要用于以下三大典型语境：\n1. 将来某一明确时间点正在持续进行的动作（例如：At this time tomorrow, I'll be lying on the beach——明天这个时候，我正躺在沙滩上呢）。\n2. 预计在将来发生或作为事情自然发展的结果而发生的动作（例如：I'll be seeing her tomorrow anyway——反正我明天也会见到她）。\n3. 礼貌客气地询问对方未来的安排或打算，避免显得施压或过于探听隐私（例如：Will you be coming to the party?——您会来参加聚会吗？）。",
    "formation": "肯定式：主语 + will be + 动词-ing\n否定式：主语 + will not (won't) be + 动词-ing\n疑问式：Will + 主语 + be + 动词-ing？",
    "examples": [
      {
        "translation": "8点别给我打电话——那时我正在吃晚饭。"
      },
      {
        "translation": "下周的这个时候，我正坐在海滩上享受呢。"
      }
    ]
  },
  "en_b1_25": {
    "title": "将来完成时：will have + 过去分词",
    "shortExplanation": "表示在将来某一时间点或另一动作发生之前就已经完成的动作；'到……时将已经完成'。",
    "longExplanation": "将来完成时强调某种动作或状态在将来的某个特定截点之前将处于'已经完成'的状态。\n通常与表示时间截点的状语连用，如 'by...'（到……为止）、'by the time + 从句'（等到……的时候）、'before...'（在……之前）等：\n例如：'By the time you arrive, I will have cooked dinner'（等你到的时候，我肯定已经把晚饭做好了）。",
    "formation": "肯定式：主语 + will have + 过去分词\n否定式：主语 + will not (won't) have + 过去分词\n疑问式：Will + 主语 + have + 过去分词？",
    "examples": [
      {
        "translation": "到星期天之前，我就会读完这本书。"
      },
      {
        "translation": "到2050年，科学家们将已经找到治愈方法。"
      }
    ]
  },
  "en_b1_26": {
    "title": "目的状语表达方式：to, in order to, so that, so as to",
    "shortExplanation": "用于表达动作的目的；'为了……'、'以便……'。",
    "longExplanation": "用于表达做某事的目的的常见句型：\n• to / in order to / so as to + 动词原形：用于前后主语一致时，表示动作的目的。其中 in order to 和 so as to 比单独的 to 更具正式语体色彩。否定形式为 in order not to 或 so as not to（为了不做某事）。\n• so that / in order that + 从句（主语 + 情态动词 can/could, will/would + 动词原形）：常用于两个分句主语不同，或强调实现某种可能与能力的情况。",
    "formation": "to / in order to / so as to + 动词原形 | so that + 主语 + 情态动词 + 动词原形",
    "examples": [
      {
        "translation": "她努力学习是为了拿到奖学金。"
      },
      {
        "translation": "他早早出发，以便能赶上末班火车。"
      }
    ]
  },
  "en_b1_27": {
    "title": "基础短语动词",
    "shortExplanation": "动词与副词或介词结合构成的固定搭配，通常具有独特的习惯意义。",
    "longExplanation": "短语动词是由'动词 + 小品词（介词或副词）'组合而成，其整体含义往往不能仅凭字面直接推导，具有强烈的习语色彩。\n最常用的短语动词包括：\n• give up = 放弃、戒掉\n• find out = 查明、弄清楚\n• turn on / turn off = 打开 / 关闭（电源、电器）\n• look up = 查阅（字典、网络信息等）\n• look after = 照顾、照料\n• put off = 推迟、延期\n• carry on = 继续进行\n• get on / along (with) = 与某人和睦相处\n• bring up = 养育成人；提出（话题）\n• come across = 偶然遇见、偶然发现",
    "formation": "动词 + 介词 / 副词（小品词）",
    "examples": [
      {
        "translation": "我已经戒烟了。"
      },
      {
        "translation": "我不在家的时候你能帮我照看一下猫吗？"
      },
      {
        "translation": "我们需要查明到底发生了什么事。"
      }
    ]
  },
  "en_b2_01": {
    "title": "过去完成时：had + 过去分词",
    "shortExplanation": "表示在过去某一特定时刻或另一过去动作之前已经完成的动作（过去的过去）。",
    "longExplanation": "过去完成时用于描述在过去某个时间参照点之前就已经发生并结束的动作（即'过去的过去'）。\n• 肯定句：主语 + had + 过去分词（所有主语人称均使用 had）\n• 否定句：主语 + hadn't + 过去分词\n• 疑问句：Had + 主语 + 过去分词？\n• 常用连词与时间状语：before, after, when, by the time, already, just, never。",
    "formation": "主语 + had + 过去分词 (hadn't + 过去分词)",
    "examples": [
      {
        "translation": "当我到达时，她已经离开了。"
      },
      {
        "translation": "在那个冬天之前，他从未见过雪。"
      }
    ]
  },
  "en_b2_02": {
    "title": "过去完成进行时：had been + 动词现在分词",
    "shortExplanation": "强调在过去某一时刻之前一直持续不断进行的动作，常用于解释过去某一结果的原因。",
    "longExplanation": "过去完成进行时的结构为 had been + 动词现在分词（动词-ing形式）。该时态侧重强调动作在过去某个基准点之前持续的时间跨度和过程，常用于解释过去某一状态的原因或展示当时显而易见的痕迹与结果。",
    "formation": "主语 + had been + 动词-ing形式 (hadn't been + 动词-ing形式)",
    "examples": [
      {
        "translation": "她筋疲力尽——她整整工作了一整夜。"
      },
      {
        "translation": "在她到达之前，你已经等了多久了？"
      }
    ]
  },
  "en_b2_03": {
    "title": "must have + 过去分词 - 对过去事实的有把握推测",
    "shortExplanation": "表示依据证据对过去发生的事情进行极有把握的逻辑推测；'一定已经……'、'准是……'。",
    "longExplanation": "must have + 过去分词用于根据已有的迹象或事实，对过去的情况做出高度确定的推测，说话人确信这是唯一合理的解释。\n对过去推测的语气强弱梯队：\n• must have + 过去分词：必定发生过（极有把握）\n• should have + 过去分词：本来理应发生（实际未发生）\n• may / might have + 过去分词：可能发生过（存疑不确定）\n• can't have + 过去分词：绝不可能发生过（确定没发生）。",
    "formation": "主语 + must have + 过去分词",
    "examples": [
      {
        "translation": "在那次长途跋涉之后，你当时一定累坏了。"
      },
      {
        "translation": "她肯定是提前离开了——她的大衣已经不在了。"
      }
    ]
  },
  "en_b2_04": {
    "title": "can't have + 过去分词 - 对过去可能性的否定推测",
    "shortExplanation": "表示对过去事实有把握的否定推论；'不可能已经……'、'绝不可能……'。",
    "longExplanation": "can't have（或 couldn't have）+ 过去分词用于根据确凿证据断定某事在过去绝不可能发生过。它是 must have + 过去分词 的反义否定结构。",
    "formation": "主语 + can't have + 过去分词",
    "examples": [
      {
        "translation": "他不可能见过她——她当时还在国外呢。"
      },
      {
        "translation": "那绝不可能是正确的地址。"
      }
    ]
  },
  "en_b2_05": {
    "title": "should have + 过去分词 - 对过去的责备与遗憾",
    "shortExplanation": "表示过去本该做某事却没做，或本不该做却做了；表达懊悔、遗憾或批评指责。",
    "longExplanation": "• should have + 过去分词：表示过去本应该做某事，但实际上并未付诸行动（含有遗憾、内疚或责怪的意思）。\n• shouldn't have + 过去分词：表示过去本不应该做某事，但实际上却做了（用于批评、谴责或自我反省）。\n这是表达遗憾与责备时最核心的高频句型。",
    "formation": "主语 + should have / shouldn't have + 过去分词",
    "examples": [
      {
        "translation": "我本来应该带把伞的。"
      },
      {
        "translation": "她本不该把那个秘密告诉他的。"
      }
    ]
  },
  "en_b2_06": {
    "title": "might / could have + 过去分词 - 对过去可能性的推测与假设",
    "shortExplanation": "表示过去可能发生过某事（不太确定），或过去本来有能力/可能做到某事（实际没做）。",
    "longExplanation": "• might have / could have + 过去分词：用于对过去可能发生的情况做出推测，但说话人并不十分确定（'也许已经……'、'说不定……'）。\n• 此外，could have + 过去分词 还可表示过去本来具备能力或机会做到某事，但实际上并没有去实现（例如：如果我再努力一点，我本来是可以获胜的）。",
    "formation": "主语 + might / could have + 过去分词",
    "examples": [
      {
        "translation": "她可能把开会的事给忘了。"
      },
      {
        "translation": "他当时可能是从后门溜出去的。"
      }
    ]
  },
  "en_b2_07": {
    "title": "第三类条件句：If + 过去完成时, would have + 过去分词",
    "shortExplanation": "用于假设与过去事实完全相反的情况；'如果当时……那么本来就会……'。",
    "longExplanation": "第三类条件句（过去非真实条件句）用于表达对过去情况的虚拟假设，所描述的场景在过去完全没有发生：\n• 句型：If + 主语 + had + 过去分词, 主语 + would have + 过去分词\n• 前后两个分句皆为假想：条件未曾满足，预期的结果自然也未曾出现。\n• 主句中的 would 也可用 could（本来能够）或 might（也许本来会）替换。",
    "formation": "If + 主语 + had + 过去分词, 主语 + would have + 过去分词",
    "examples": [
      {
        "translation": "如果她当时按时吃药，她本来就已经康复了。"
      },
      {
        "translation": "如果他当时没有提早离开，他本来就能遇见她的。"
      }
    ]
  },
  "en_b2_08": {
    "title": "混合条件句",
    "shortExplanation": "将不同时间层面的假设条件与结果结合在一起（过去 ↔ 现在）。",
    "longExplanation": "混合条件句打破了单一时间维度的限制，连接不同时间的假设与结果：\n1. 过去的假设条件 → 现在的虚拟结果：\n• If + 主语 + had + 过去分词, 主语 + would + 动词原形\n• 例：如果我当初接受了那份工作，我现在就身在纽约了。\n2. 现在的恒常属性/状态 → 过去的虚拟结果：\n• If + 主语 + 一般过去时, 主语 + would have + 过去分词\n• 例：如果她平时做事更细心一点，当初就不会把它弄坏了。",
    "formation": "If + 主语 + had + 过去分词, 主语 + would + 动词原形",
    "examples": [
      {
        "translation": "如果我当年学了医，我现在就是一名医生了。"
      }
    ]
  },
  "en_b2_09": {
    "title": "将来时被动语态与含情态动词的被动语态",
    "shortExplanation": "表示将来被执行或必须/应该被处理的动作；'将被……'、'必须被……'。",
    "longExplanation": "含有情态动词及将来时的被动语态基本结构：\n• 情态动词 + be + 过去分词\n常见搭配句式：\n• will be + 过去分词：将被完成\n• must be + 过去分词：必须被完成\n• should be + 过去分词：应该被完成\n• can be + 过去分词：能够被完成。",
    "formation": "主语 + 情态动词 (will / must / should / can) + be + 过去分词",
    "examples": [
      {
        "translation": "这份报告将于明天发布。"
      },
      {
        "translation": "这个错误必须立即得到纠正。"
      }
    ]
  },
  "en_b2_10": {
    "title": "使役结构 have/get：have something done",
    "shortExplanation": "表示请人、雇人或安排他人为自己提供服务或代办某事。",
    "longExplanation": "have / get + 宾语 + 过去分词 结构用于说明请专业人员或他人为自己服务，而非本人亲自动手。\n对比说明：\n• I cut my hair：我自己拿起剪刀理发（通常不合常理）。\n• I had my hair cut：我去理发店剪头发了（由理发师剪发）。\n其中 get 更偏向日常口语对话，have 相对更具书面正式色彩。",
    "formation": "主语 + have / get + 宾语 + 过去分词",
    "examples": [
      {
        "translation": "我需要去检查一下牙齿（找牙医做检查）。"
      },
      {
        "translation": "去年春天她雇人把房子重新粉刷了一遍。"
      }
    ]
  },
  "en_b2_11": {
    "title": "客观报道动词的被动语态：It is said that... / He is believed to...",
    "shortExplanation": "用于客观转述大众舆论、新闻报道或公认观点；'据说……'、'据普遍认为……'。",
    "longExplanation": "常与 say, think, believe, report, know, expect, consider 等传达动词搭配使用的两种被动句型（在新闻媒体和官方正式文本中极常见）：\n1. It + 被动形式动词 + that + 从句（例如：It is believed that... 人们普遍相信……）\n2. 主语 + be动词 + 过去分词 + to + 动词原形（例如：She is known to be... 大家都知道她是……）。\n注意：如果不定式所表达的动作发生在报道动作之前，则需要使用不定式的完成式：to have + 过去分词。",
    "formation": "It + be动词 + 过去分词 + that 从句 | 主语 + be动词 + 过去分词 + to + 动词原形",
    "examples": [
      {
        "translation": "据报道，有三人在事故中受伤。"
      },
      {
        "translation": "据普遍认为，他已经离开了该国。"
      }
    ]
  },
  "en_b2_12": {
    "title": "区分 remember / forget 接动词-ing形式与动词不定式",
    "shortExplanation": "接动词-ing表示记得/忘记过去做过某事；接to不定式表示记得/忘记去做该做的事项。",
    "longExplanation": "remember 与 forget 之后接不同的动词形式时，含义具有明确差异：\n• remember / forget + 动词-ing形式（动名词）：指记得或忘记在过去已经发生过的经历或事件。\n• remember / forget + to + 动词原形（动词不定式）：指记住或忘记去做某件未来的任务、职责或待办事项。",
    "formation": "remember / forget + 动词-ing形式 (过去经历) vs remember / forget + to + 动词原形 (待办任务)",
    "examples": [
      {
        "translation": "我记得曾经在一场会议上见过她。"
      },
      {
        "translation": "记得给你妈妈打电话！"
      },
      {
        "translation": "我忘了买牛奶。"
      }
    ]
  },
  "en_b2_13": {
    "title": "区分 stop / regret / mean 接动词-ing形式与动词不定式",
    "shortExplanation": "stop、regret、mean 接动词-ing形式或to不定式时所表达的截然不同的语法意义。",
    "longExplanation": "动词 stop, regret, mean 后面接动名词（-ing）还是不定式（to + 动词原形）决定了其具体的语义指向：\n• stop + 动词-ing：终止正在进行中的动作（例如：戒除抽烟恶习）。\n• stop + to + 动词原形：停下手头的事情，转而去做另一件事。\n• regret + 动词-ing：为过去曾经做过的事情感到追悔与内疚。\n• regret + to + 动词原形：遗憾地去传达或做某事（常用于正式公函通报不良消息：很遗憾地通知您……）。\n• mean + 动词-ing：意味着……、意味着需要付出某种代价。\n• mean + to + 动词原形：意图、打算做某事。",
    "formation": "stop / regret / mean + 动词-ing形式 vs stop / regret / mean + to + 动词原形",
    "examples": [
      {
        "translation": "他去年戒烟了。"
      },
      {
        "translation": "她停下脚步，驻足欣赏周围的风景。"
      }
    ]
  },
  "en_b2_14": {
    "title": "wish + 一般过去时 - 对现在情况的虚拟愿望",
    "shortExplanation": "用于表达与现在事实相反、难以实现的愿望或遗憾，意为“要是……就好了”、“但愿”。",
    "longExplanation": "结构“wish + 一般过去时”属于虚拟语气范畴，动词形式与第二类条件句（虚拟条件句）相同，用来表达说话者希望改变当前的某种现状，但在现实中该愿望无法实现或难以成真。从句中的 be 动词在正式文体中各人称一律使用 were，但在日常口语中 was 也很常见。",
    "formation": "主语 + wish / wishes + (that) + 主语 + 动词一般过去时 / were",
    "examples": [
      {
        "translation": "要是我的英语能说得更好一些就好了。"
      },
      {
        "translation": "她希望自己能生活在一个气候更温暖的国家。"
      }
    ]
  },
  "en_b2_15": {
    "title": "wish + 过去完成时 - 对过去的遗憾与后悔",
    "shortExplanation": "用于表达对过去已经发生或未发生之事的懊悔与遗憾，意为“要是当时……就好了”。",
    "longExplanation": "结构“wish + 过去完成时（had + 过去分词）”是对过去事实的虚拟，语法形式与第三类条件句相同。常用来对过去已经无法更改的决定、经历或既成事实表达惋惜与自责。",
    "formation": "主语 + wish / wishes + (that) + 主语 + had + 动词过去分词",
    "examples": [
      {
        "translation": "真希望我当时没吃那么多。"
      },
      {
        "translation": "她后悔当时没有接受那份工作邀请。"
      }
    ]
  },
  "en_b2_16": {
    "title": "wish + would - 表达希望他人改变行为或现状转变",
    "shortExplanation": "用于表达对他人行为的不满、焦躁，或迫切希望某种令人厌烦的现状发生改变，意为“要是……肯……就好了”。",
    "longExplanation": "结构“wish + would + 动词原形”通常带有说话者的不耐烦、抱怨或强烈期盼，希望某人能改正令人困扰的举动，或者期盼天气等不受主观控制的客观环境能够转变。注意：主句主语与从句主语相同时通常不使用 would（即不说 I wish I would，而改用 could 或动词过去时）。",
    "formation": "主语 1 + wish / wishes + (that) + 主语 2 + would + 动词原形",
    "examples": [
      {
        "translation": "真希望你能听听我说话。"
      },
      {
        "translation": "但愿雨快点停下来。"
      }
    ]
  },
  "en_b2_17": {
    "title": "限制性定语从句与非限制性定语从句",
    "shortExplanation": "限制性从句用于明确界定先行词（不用逗号），非限制性从句仅补充说明附加信息（用逗号隔开）。",
    "longExplanation": "1. 限制性定语从句：不用逗号隔开，是主句意思不可或缺的组成部分，用于具体明确所指的人或事物；若将其删去，主句语义将不明确；关系代词可使用 that 替代 who 或 which。\n2. 非限制性定语从句：通常用逗号与主句隔开，仅对已知或特定的先行词提供附加说明；若将其删去，主句的核心意义依然完整清晰；在此结构中绝对不能使用关系代词 that 代替 who 或 which。",
    "formation": "限制性：先行词 + 关系代词 (who / which / that) + 从句 | 非限制性：先行词, + 关系代词 (who / which), + 从句",
    "examples": [
      {
        "translation": "我和你提过的那部电影今晚放映。"
      },
      {
        "translation": "我姐姐目前住在巴黎，她下周要来看我。"
      }
    ]
  },
  "en_b2_18": {
    "title": "定语从句中介词的位置与搭配规则",
    "shortExplanation": "日常口语中介词通常留在从句末尾，而在正式文体与书面语中介词前置于关系代词（whom / which）之前。",
    "longExplanation": "定语从句中介词的位置主要取决于语体风格：\n1. 非正式口语：介词通常保留在从句末尾（例如：the house I grew up in），此时引导从句的关系代词常可省略或由 that 充当。\n2. 正式文体与书面语：介词移至关系代词之前（例如：the house in which I grew up）。\n关键规则：介词紧随其后时，指人只能使用宾格 whom，指物只能使用 which，绝对不能使用 that 或 who。",
    "formation": "口语形式：先行词 + (关系代词) + 从句 + 介词 | 正式形式：先行词 + 介词 + whom / which + 从句",
    "examples": [
      {
        "translation": "我正在参与的这个项目非常吸引人。"
      },
      {
        "translation": "我目前正在参与的该项目非常引人入胜。"
      }
    ]
  },
  "en_b2_19": {
    "title": "结果连词与连接词：so... that, such... that, therefore, as a result",
    "shortExplanation": "用于表达因某种原因而导致的结果，意为“如此……以至于……”、“因此”、“结果”。",
    "longExplanation": "英语中表达因果结果的典型句型与连接副词：\n1. so + 形容词 / 副词 + that 从句：强调程度之深以致产生某种结果（例如：He spoke so quickly that nobody understood）。\n2. such + (a / an) + 形容词 + 名词 + that 从句：语义与 so... that 相同，但核心修饰对象为名词短语（例如：It was such a long film that I fell asleep）。\n3. 句子之间的连接副词：therefore（因此）、consequently（结果）、as a result（结果是）、hence / thus（因而）。通常置于分号或句号之后，并后跟逗号。",
    "formation": "so + 形容词 / 副词 + that + 从句 | such + (a / an) + 形容词 + 名词 + that + 从句 | 句子 1; therefore / consequently / as a result, + 句子 2",
    "examples": [
      {
        "translation": "那是本非常精彩的书，以至于我读了两次。"
      },
      {
        "translation": "她错过了截止日期，因此失去了那份合同。"
      }
    ]
  },
  "en_b2_20": {
    "title": "be used to / get used to + 动名词 - 习惯于 / 逐渐习惯于",
    "shortExplanation": "“be used to”表示已经对某事习以为常，“get used to”强调从不习惯到习惯的适应过程。",
    "longExplanation": "1. be used to + 动名词 (V-ing) / 名词：表示主语已处于对某事物习惯、熟谙的状态（此处 to 为介词，故后接动名词或名词）。\n2. get used to + 动名词 (V-ing) / 名词：侧重于“逐渐适应、开始习惯”这一动态过渡与心理转变。\n辨析重点：务必与“used to + 动词原形”（过去常常做某事但现在已不做）区分开来，二者语法结构与含义截然不同。",
    "formation": "主语 + be / get used to + 动名词 (V-ing) / 名词",
    "examples": [
      {
        "translation": "我还不太习惯起得这么早。"
      },
      {
        "translation": "虽然花了些时间，但她已经适应了新系统。"
      }
    ]
  },
  "en_b2_21": {
    "title": "过去将来时：would / was, were going to",
    "shortExplanation": "立足于过去某一时刻来看待将要发生的动作或打算，常用于间接引语或叙事文学中。",
    "longExplanation": "过去将来时用于叙述从过去特定时间点眺望未来所呈现的动作或状态：\n1. would + 动词原形：情态助动词 will 的过去形式，常在间接引语中转述过去所作出的承诺、决定或预判（例如：She said she would come）。\n2. was / were going to + 动词原形：表示过去曾拟定好的计划或打算，但常常暗示该计划因故未达成或受阻（例如：He was going to call but forgot）。\n3. was / were about to + 动词原形：表示在过去那一瞬间“正打算、刚要”做某事，却被突发状况打断。",
    "formation": "主语 + would + 动词原形 | 主语 + was / were going to + 动词原形 | 主语 + was / were about to + 动词原形",
    "examples": [
      {
        "translation": "她答应过她一定会到场的。"
      },
      {
        "translation": "他正打算离开，这时她打来了电话。"
      }
    ]
  },
  "en_b2_22": {
    "title": "be to + 动词不定式 - 官方指令、既定日程与宿命安排",
    "shortExplanation": "用于传达正式指令、规章要求、预先安排的官方活动，或叙事中不可避免的命运结局。",
    "longExplanation": "“be 动词 + to 动词不定式”为正式书面语结构，具有以下核心含义：\n1. 官方指令与规章要求：表示上级指示、规则条例或严肃要求（例如：Passengers are to remain seated - 乘客须保持就座）。\n2. 正式计划与日程安排：用于正式公布的重大日程或协议（例如：The summit is to take place next month - 峰会定于下月举行）。\n3. 注定的命运（通常用过去式 was / were to）：在传记或历史叙事中描述不可改变的命中注定（例如：They were never to meet again - 他们此后注定再未相遇）。",
    "formation": "主语 + am / is / are / was / were + to + 动词原形",
    "examples": [
      {
        "translation": "你必须在周五前提交这份报告。"
      },
      {
        "translation": "她注定将成为那个时代最伟大的科学家之一。"
      }
    ]
  },
  "en_b2_23": {
    "title": "ought to - 道德义务与合情推断",
    "shortExplanation": "表示道义责任、社会规劝或合乎逻辑的必然期望，意为“应当”、“理应”。",
    "longExplanation": "情态动词“ought to”强调客观道义上的规范、职责或合情合理的逻辑推论，语意比 should 更加正式且严肃。\n• 形式特点：必须携带不定式符号 to，接动词原形（ought to do）。\n• 否定形式：ought not to（缩写为 oughtn't to）。\n• 指向过去：“ought to have + 过去分词”表示“过去本应该做某事却未做”，含有责备、批评或追悔的意味。",
    "formation": "肯定句：主语 + ought to + 动词原形 | 否定句：主语 + ought not to + 动词原形 | 过去式：主语 + ought to have + 动词过去分词",
    "examples": [
      {
        "translation": "你理应为你所说的话道歉。"
      },
      {
        "translation": "她本来应该早点告诉我们的。"
      }
    ]
  },
  "en_b2_24": {
    "title": "need - 情态动词与实义动词的用法",
    "shortExplanation": "“need”兼具情态动词（主要用于正式否定句和疑问句）与普通实义动词双重属性。",
    "longExplanation": "“need”在英语语法中具有两种不同的语法功能与句式结构：\n1. 作为情态动词：主要用于正式文体的否定句和疑问句。第三人称单数不加 -s，否定句无需借助助动词（使用 needn't），后接不带 to 的动词原形（例如：You needn't worry / Need I explain?）。\n2. 作为实义动词：具有常规动词的一切屈折变化（第三人称单数加 -s），否定与疑问句借用 do / does / did，后接带 to 的动词不定式（例如：She doesn't need to come）。",
    "formation": "情态动词：主语 + needn't + 动词原形 | 实义动词：主语 + don't / doesn't / didn't need to + 动词原形",
    "examples": [
      {
        "translation": "你不需要把两份表格都填写好。"
      },
      {
        "translation": "她不必参加每一次会议。"
      }
    ]
  },
  "en_b2_25": {
    "title": "dare - 敢于、竟敢（情态动词与实义动词）",
    "shortExplanation": "用于表示有胆量做某事，或在感叹句中表达强烈的愤怒与谴责，意为“敢”、“竟敢”。",
    "longExplanation": "“dare”意为“敢于”、“竟敢”，具备情态动词与实义动词两种形态：\n1. 作为情态动词：常见于修辞疑问句、感叹句及否定句中。无人称数的变化，后面直接跟不带 to 的动词原形（例如：How dare you! / I daren't ask）。\n2. 作为实义动词：遵循常规动词变化规则，否定句与疑问句借助 do / does / did，后接带 to（有时亦可省略 to）的不定式（例如：She didn't dare to look / He dared to challenge the boss）。",
    "formation": "感叹 / 情态：How dare + 主语 + 动词原形! | 主语 + daren't + 动词原形 | 实义动词：主语 + dare / dares / dared (to) + 动词原形",
    "examples": [
      {
        "translation": "你竟敢这样跟我说话！"
      },
      {
        "translation": "她敢于公开表达自己的观点。"
      }
    ]
  },
  "en_b2_26": {
    "title": "反身代词：myself, yourself, himself, herself, itself, ourselves, yourselves, themselves",
    "shortExplanation": "用于动作作用于自身时充当宾语，或置于名词后以强调亲自独立完成某事。",
    "longExplanation": "反身代词（myself, yourself, himself, herself, itself, ourselves, yourselves, themselves）在句中主要发挥以下语法功能：\n1. 充当反身宾语：当谓语动词的承受者与施动主语为同一主体时，必须使用反身代词作宾语（例如：He cut himself - 他割伤了自己）。\n2. 充当同位语表示强调：紧跟在主语之后或置于句末，强调“亲自、独立”完成该动作，不假外力（例如：I did it myself - 这是我亲手做的）。\n3. 常见固定词组：by oneself（独自一人、独立地）、help yourself（请自便、请随意享用）、enjoy oneself（尽情玩乐）。",
    "formation": "作宾语：主语 + 动词 + 反身代词 | 作强调：主语 (+ 反身代词) + 谓语 + 宾语 (+ 反身代词)",
    "examples": [
      {
        "translation": "她是自学弹吉他的。"
      },
      {
        "translation": "这台机器会自动关机。"
      }
    ]
  },
  "en_b2_27": {
    "title": "集合名词的主谓一致：team, family, committee, government...",
    "shortExplanation": "指代由多名成员构成的集体名词；根据着眼于整体还是各个成员，谓语动词可单可复。",
    "longExplanation": "集合名词（如 team, family, government, committee, staff, audience, crew, public 等）指代若干个体构成的群体：\n• 英式英语：灵活根据语境判定。当强调群体中各个成员的个体行为时，谓语动词常用复数形式（例如：The team are playing well）；若将整个组织视作单一整体时则用单数形式。\n• 美式英语：倾向于将集合名词统一视作单一实体，绝大多数情况下一律搭配单数动词（例如：The team is playing well）。\n特别注意：“police”（警方）在任何英语变体中均被视作复数，必须搭配复数动词。",
    "formation": "集合名词 + 单数谓语动词（视为统一实体 / 美式偏好）或 复数谓语动词（着眼于各个成员 / 英式偏好）",
    "examples": [
      {
        "translation": "政府公布了新的应对举措。"
      },
      {
        "translation": "全场观众都起立欢呼鼓掌。"
      }
    ]
  },
  "en_b2_28": {
    "title": "分数、小数与基本数学运算表达规则",
    "shortExplanation": "英语中分数、小数、百分数以及基础四则算术运算的正确读法与句式表达规则。",
    "longExplanation": "英语中各类数词与数学表达的规范读法：\n1. 分数表达：分子采用基数词，分母采用序数词；若分子大于 1，分母序数词必须加复数后缀 -s（例如：1/2 读作 a half；1/3 读作 a third；1/4 读作 a quarter；3/4 读作 three quarters；2/3 读作 two thirds）。\n2. 小数表达：小数点读作“point”，小数点后的所有数字依次单个独立读出（例如：3.14 读作 three point one four；5.7 读作 five point seven）。\n3. 百分比表达：基数词 + percent（例如：25% 读作 twenty-five percent）。\n4. 基础四则运算：加法符号（+）读作 plus，减法符号（-）读作 minus，乘法符号（×）读作 times 或 multiplied by，除法符号（÷）读作 divided by，等号（=）读作 equals 或 is。",
    "formation": "分数：基数词（分子）+ 序数词（分母，分子>1时加-s） | 小数：整数 + point + 各个数字逐位独立读出",
    "examples": [
      {
        "translation": "四分之三的学生通过了这次考试。"
      },
      {
        "translation": "通货膨胀率下降至百分之二点五。"
      }
    ]
  },
  "en_b2_29": {
    "title": "副词的比较等级（比较级与最高级）",
    "shortExplanation": "副词的比较变化：更快、更仔细、最好、更差、更远。",
    "longExplanation": "副词的比较等级构成规则与形容词基本相同：\n• 单音节副词：词尾加 -er（比较级）/ -est（最高级）：fast → faster, hard → harder, early → earlier。\n• 大多数以 -ly 结尾的副词：在词前加 more（比较级）/ most（最高级）：carefully → more carefully → most carefully。\n• 不规则变化：well → better → best, badly → worse → worst, far → further/farther → furthest/farthest, little → less → least, much → more → most。",
    "formation": "单音节副词 + -er / -est 或 more / most + -ly结尾副词",
    "examples": [
      {
        "translation": "她说话比以前更自信了。"
      },
      {
        "translation": "他在团队中工作最努力。"
      }
    ]
  },
  "en_c1_01": {
    "title": "否定副词引起的倒装句",
    "shortExplanation": "否定副词置于句首时，助动词置于主语之前构成倒装以示强调。",
    "longExplanation": "为了达到强调效果，将具有否定或半否定含义的副词/短语置于句首。此时句子必须采用部分倒装语序：助动词/be动词置于主语之前（词序与疑问句相同）。\n引起倒装的常见词语：never（从不）、rarely / seldom（极少）、little（几乎不）、hardly / scarcely / barely（几乎不/刚……就）、not only（不仅）、only（只有）、no sooner（刚……就）。",
    "formation": "否定副词 + 助动词 + 主语 + 主要动词",
    "examples": [
      {
        "translation": "我从未见过如此美丽的东西。"
      },
      {
        "translation": "她极少犯错误。"
      },
      {
        "translation": "我当时全然不知即将发生什么。"
      }
    ]
  },
  "en_c1_02": {
    "title": "Not only... but also 引起的倒装",
    "shortExplanation": "强调句式：Not only 引导的分句采用部分倒装，but also 引导的分句保持正常语序。",
    "longExplanation": "当把 'Not only' 置于句首用于加强语气时，前一个分句必须使用倒装语序（助动词置于主语前），而 'but (also)' 引导的后半部分则保持正常陈述句语序。\n常用于强调某种情况比预想的更加显著或更进一步：“不仅……而且……”。",
    "formation": "Not only + 助动词 + 主语 + 动词, but (主语) + also + ...",
    "examples": [
      {
        "translation": "她不仅才华横溢，而且非常勤奋。"
      },
      {
        "translation": "他们不仅迟到了，还把文件给忘了。"
      }
    ]
  },
  "en_c1_03": {
    "title": "Hardly / Scarcely / No sooner 倒装句（刚……就……）",
    "shortExplanation": "表示两个动作紧密相连、紧接着发生：“刚……就……”、“一……就……”。",
    "longExplanation": "用于表达过去两个动作接踵而至、紧密相连的固定句型。先发生的动作使用过去完成时的倒装结构（had + 主语 + 过去分词），后发生的动作使用一般过去时。\n• Hardly / Scarcely + had + 主语 + 过去分词 + when / before + 一般过去时句子。\n• No sooner + had + 主语 + 过去分词 + than + 一般过去时句子。",
    "formation": "Hardly/Scarcely + had + 主语 + 过去分词 + when + 过去时 / No sooner + had + 主语 + 过去分词 + than + 过去时",
    "examples": [
      {
        "translation": "她刚到，天就下起雨来了。"
      },
      {
        "translation": "我刚坐下，就有人敲门。"
      }
    ]
  },
  "en_c1_04": {
    "title": "条件句中的倒装：Had / Were / Should",
    "shortExplanation": "在正式文体中省略连词 if，通过将 Had、Were 或 Should 提前至句首构成倒装。",
    "longExplanation": "在正式文体或书面语中，可以省略连词 'if' 并采用倒装语序来表达条件关系：\n• 虚拟语气第三类条件句（对过去的虚拟）：Had + 主语 + 过去分词（等同于 If + 主语 + had + 过去分词）。\n• 虚拟语气第二类条件句（对现在的虚拟）：Were + 主语 (+ to + 动词原形)（等同于 If + 主语 + were / 一般过去时）。\n• 第一类条件句（表达可能性较低的设想）：Should + 主语 + 动词原形（等同于 If + 主语 + should + 动词原形）。",
    "formation": "Had + 主语 + 过去分词 / Were + 主语 (+ to + 动词原形) / Should + 主语 + 动词原形",
    "examples": [
      {
        "translation": "要是她早告诉我，我早就帮忙了。"
      },
      {
        "translation": "如果我处于你的位置，我就会接受。"
      },
      {
        "translation": "如果您需要任何帮助，请致电我们。"
      }
    ]
  },
  "en_c1_05": {
    "title": "It 强调句（分裂句）：It was ... who/that ...",
    "shortExplanation": "利用 'It is/was ... that/who' 结构将句中的某一特定成分独立出来加以重点强调。",
    "longExplanation": "It 分裂句（强调句）的基本结构为：It + 动词 be 的相应时态 + 被强调成分 + that/who/which + 句子的其余部分。\n该结构的作用是将受众的注意力焦点完全转移到被提出来的核心要素上：\n• 强调人时：可用 who 或 that。\n• 强调事物、状语等时：通常使用 that（有时可用 which）。",
    "formation": "It + be动词 + 被强调成分 + that/who + 其余部分",
    "examples": [
      {
        "translation": "正是那个噪音把我吵醒了。"
      },
      {
        "translation": "正是辛勤的付出带来了成功。"
      }
    ]
  },
  "en_c1_06": {
    "title": "Wh- 引导的分裂句（假拟分裂句）：What ... is/was ...",
    "shortExplanation": "用 What 引导的主语从句引出话题，将想要重点强调的内容放在 be 动词之后。",
    "longExplanation": "Wh- 分裂句（又称假拟分裂句）的典型结构为：What 从句 + 动词 be + 被强调的成分。\n该结构先用 What 从句抛出关注点，随后在句末揭晓核心信息，从而产生突出的强调效果：“我所……的正是……”。",
    "formation": "What + 从句 + be动词 + 被强调成分",
    "examples": [
      {
        "translation": "我最喜欢伦敦的一点就是它的多元化。"
      },
      {
        "translation": "他的所作所为完全出乎所有人的意料。"
      }
    ]
  },
  "en_c1_07": {
    "title": "要求/建议动词后的正式虚拟语气",
    "shortExplanation": "在表示要求、建议等动词后的 that 从句中，谓语动词一律使用动词原形（虚拟语气）。",
    "longExplanation": "在表示建议、推荐、要求、命令的动词之后，如 suggest（建议）、recommend（推荐）、insist（坚持）、demand（要求）、propose（提议）、request / require（请求/要求）、order（命令）+ that 从句：\n从句中的谓语动词必须使用动词原形，不受主语人称和数的影响（即不加 -s，be 动词直接用 be）。\n• 美式英语倾向于直接使用动词原形的纯虚拟语气。\n• 英式英语则常常使用 'should + 动词原形' 的形式（例如：I suggest that he should leave）。",
    "formation": "主语 + 要求/建议类动词 + that + 主语 + (should) + 动词原形",
    "examples": [
      {
        "translation": "我建议他去看看医生。"
      },
      {
        "translation": "所有学生都必须参加这次会议，这是至关重要的。"
      }
    ]
  },
  "en_c1_08": {
    "title": "It's high time + 一般过去时（正是……的时候了）",
    "shortExplanation": "表示某事早该完成却拖延至今，含有轻微催促或批评的意味：“早该……了”。",
    "longExplanation": "句型结构：It's (high / about) time + 主语 + 动词一般过去时。\n虽然形式上使用了一般过去时，但实际表达的是针对现在或将来的虚拟语气含义。用以强调某事拖得太久，现在必须立刻去做：\n• It's time：到……的时间了。\n• It's high time / It's about time：语气更加强烈，“早该……了”、“正是……的关头”。",
    "formation": "It's (high / about) time + 主语 + 一般过去时动词",
    "examples": [
      {
        "translation": "她该找份新工作了。"
      },
      {
        "translation": "你早就该道歉了。"
      }
    ]
  },
  "en_c1_09": {
    "title": "as if / as though 后的虚拟语气（仿佛……似乎……）",
    "shortExplanation": "表示与事实相反或不太可能实现的非真实比喻：“仿佛……”、“好像……一样”。",
    "longExplanation": "连词 as if 与 as though（仿佛、好似）常与虚拟语气连用，表达与实际情况不符的假设或比喻：\n• as if / as though + 一般过去时：表示与现在事实相反的假设（be 动词通常统一使用 were）。\n• as if / as though + 过去完成时（had + 过去分词）：表示与过去事实相反的假设。",
    "formation": "主语 + 动词 + as if / as though + 主语 + 过去时 / 过去完成时",
    "examples": [
      {
        "translation": "他花起钱来就好像自己是个百万富翁似的。"
      },
      {
        "translation": "她说起话来仿佛之前就见过他似的。"
      }
    ]
  },
  "en_c1_10": {
    "title": "So / Neither + 助动词 + 主语（简略倒装赞同句）",
    "shortExplanation": "用于表达同意：'So...' 附和肯定句（也是），'Neither...' 附和否定句（也不）。",
    "longExplanation": "用于附和前者的观点或状况，避免重复整句话：\n• So + 助动词 + 主语：针对肯定陈述表示“某人也是如此”。\n• Neither / Nor + 助动词 + 主语：针对否定陈述表示“某人也不……”。\n注意：使用的助动词/be动词在时态和形式上必须与上文句子的谓语动词保持一致。",
    "formation": "So / Neither + 助动词 + 主语",
    "examples": [
      {
        "translation": "我喜欢爵士乐。她也喜欢。"
      },
      {
        "translation": "我还没去过罗马。我也没去过。"
      }
    ]
  },
  "en_c1_11": {
    "title": "代替从句的 'so'：I think so / I hope so / I'm afraid so",
    "shortExplanation": "在 think、hope、afraid 等词后用 'so' 代替前文提到的整个从句内容。",
    "longExplanation": "单词 'so' 常用作代词，承接上文提到的一整句话或宾语从句，多用于表达个人观点、期望或顾虑的动词之后：think（认为）、hope（希望）、suppose（料想）、expect（预计）、believe（相信）、imagine（设想）、be afraid（恐怕）。\n否定形式有两种表现方式：\n• 否定主动词：I don't think so、I don't suppose so。\n• 在动词后直接加 not（与 hope、be afraid 连用）：I hope not（希望不会）、I'm afraid not（恐怕不行）。切记不能说 'I don't hope so'。",
    "formation": "主语 + think / hope / suppose... + so（否定形式：I don't think so / I hope not）",
    "examples": [
      {
        "translation": "他会来吗？——我想会吧。/ 我觉得不会。"
      },
      {
        "translation": "这个贵吗？——恐怕挺贵的。"
      },
      {
        "translation": "已经关门了吗？——希望没有。"
      }
    ]
  },
  "en_c1_12": {
    "title": "限制性定语从句与非限制性定语从句",
    "shortExplanation": "区分限制性定语从句（无逗号，界定修饰）与非限制性定语从句（有逗号，补充说明）。",
    "longExplanation": "关系从句（定语从句）的两大类别及核心区别：\n• 限制性定语从句（Defining）：提供必不可少的关键识别信息，指明具体是哪一个人或物。不用逗号隔开；关系代词可用 that；关系代词在从句中作宾语时通常可以省略。\n• 非限制性定语从句（Non-defining）：对已知或已明确的人/物提供额外的补充说明信息。前后必须用逗号隔开；关系代词只能用 who 或 which（绝不能用 that）；关系代词绝不可省略。",
    "formation": "限制性：先行词 + that/who/which + 句子 / 非限制性：先行词, who/which + 句子, ...",
    "examples": [
      {
        "translation": "赢得奥斯卡奖的那部电影棒极了。（限制性从句，界定是哪部电影）"
      },
      {
        "translation": "2009年上映的电影《阿凡达》取得了巨大的成功。（非限制性从句，补充已知电影的背景）"
      }
    ]
  },
  "en_c1_13": {
    "title": "正式文体中“介词 + which/whom”结构",
    "shortExplanation": "在正式语体中将介词置于关系代词 which/whom 之前，而非置于句末。",
    "longExplanation": "在正式、学术或商务语体中：\n• 介词通常直接置于关系代词之前：介词 + which（修饰物）或 介词 + whom（修饰人）。\n• 在口语或非正式交流中，介词通常留在从句末尾（此时常使用 who、that 或直接省略关系代词）。\n注意：当介词位于关系代词前时，指人只能使用 whom（不可用 who 或 that），指物只能使用 which（不可用 that）。",
    "formation": "正式：先行词 + 介词 + which/whom + ... / 非正式：先行词 + (who/that/which) + ... + 介词",
    "examples": [
      {
        "translation": "我所提及的那份报告已附在后。（正式文体）"
      },
      {
        "translation": "我提到的那份报告已经附上了。（中性语体）"
      },
      {
        "translation": "我刚才说的那份报告附在邮件里了。（口语/非正式表达）"
      }
    ]
  },
  "en_c1_14": {
    "title": "英语中的名词化现象（Nominalization）",
    "shortExplanation": "将动词或形容词转化为名词形式，是学术文体与商务写作的核心特征。",
    "longExplanation": "名词化（Nominalization）是指通过词缀派生等方式，将动词或形容词转化为名词的过程。这是学术论文、科技报告和商务文书的关键特征，能够使语言表达更加客观、紧凑、正式且富于凝练度。\n主要常见名词后缀：\n• -tion / -sion：decide → decision（决定）、discuss → discussion（讨论）。\n• -ment：improve → improvement（改进）、develop → development（发展）。\n• -ance / -ence：appear → appearance（外貌/出现）、differ → difference（差异）。\n• -ity：complex → complexity（复杂性）、able → ability（能力）。\n• -ness：happy → happiness（幸福）、aware → awareness（意识）。",
    "formation": "动词/形容词 + 名词后缀（-tion, -ment, -ance, -ity, -ness等）",
    "examples": [
      {
        "translation": "她决定扩张业务。→ 我们扩大公司规模的决定……"
      },
      {
        "translation": "他发现了…… → 他对该错误的发现……"
      }
    ]
  },
  "en_c1_15": {
    "title": "学术文本中的名词化（Nominalization）",
    "shortExplanation": "将动词或从句转换为名词短语，使语言更加精炼、客观并富有学术色彩。",
    "longExplanation": "名词化是指将动词、形容词或整个从句转换为名词或名词短语的语言现象。其主要功能包括：\n1. 浓缩信息：避免冗长的复合从句，大幅提升信息密度（如将'物价大幅上涨'表达为'物价的显著上涨'）。\n2. 便于添加修饰成分：能够在名词前后灵活添加定语进行严谨界定。\n3. 营造客观严谨的学术基调：弱化第一人称主观色彩，凸显客观研究事实。",
    "formation": "谓语从句/动词短语 → 名词短语（例如：The fact that prices increased → The increase in prices...）",
    "examples": [
      {
        "translation": "空气质量有了显著的改善。"
      },
      {
        "translation": "他拒绝发表评论让所有人都感到意外。"
      }
    ]
  },
  "en_c1_16": {
    "title": "现在分词短语：V-ing 分词从句（Present participle clause）",
    "shortExplanation": "使用现在分词（V-ing）短语简化状语从句，表达伴随动作、同时发生或原因。",
    "longExplanation": "当状语从句与主句主语一致时，可用现在分词（V-ing）短语进行简化：\n• 表示动作同时发生：Walking home, I noticed something strange.（= 在走回家的路上，我注意到了一些异常情况）\n• 表示原因：Knowing the answer, she raised her hand.（= 因为知道答案，她举起了手）\n• 注意避免悬垂分词错误：分词短语的逻辑主语必须严格与主句主语保持一致。",
    "formation": "现在分词（V-ing）+ ……，主语 + 谓语…… / 否定形式：Not + V-ing + ……，主语 + 谓语……",
    "examples": [
      {
        "translation": "一到达机场，他就意识到自己忘了带护照。"
      },
      {
        "translation": "不知该如何是好，她便给母亲打了电话。"
      }
    ]
  },
  "en_c1_17": {
    "title": "过去分词短语：V3 / Having + V3 从句（Past participial phrase）",
    "shortExplanation": "过去分词表被动含义，Having + V3 则强调分词动作先于主句动作完成。",
    "longExplanation": "使用过去分词或完成分词短语可以使书面表达更加简洁优雅：\n• 过去分词短语（V-ed/V3）：表示被动含义或完成状态（例如：Built in 1889, the Eiffel Tower... = 埃菲尔铁塔建于1889年……）。\n• 完成分词短语（Having + V3）：明确强调该动作在主句谓语动作发生之前就已经结束（例如：Having read the report, he called a meeting. = 读完报告后，他召集了会议）。",
    "formation": "过去分词（V-ed/V3）+ ……，主语 + 谓语…… 或 Having + 过去分词（V-ed/V3）+ ……，主语 + 谓语……",
    "examples": [
      {
        "translation": "听到这个消息感到十分震惊，她默默地坐了下来。"
      },
      {
        "translation": "完成考试后，学生们便离开了考场。"
      }
    ]
  },
  "en_c2_01": {
    "title": "含 unless / provided / as long as / on condition that 的条件句",
    "shortExplanation": "替代 'if' 引导条件从句，表达除非、只要或以……为前提等严格限定条件。",
    "longExplanation": "在高级英语中，常用特定连词替代 if 来表达更精确的条件关系：\n• unless = 除非、如果不（相当于 if not，其引导的从句本身含否定意味，从句谓语不可再用否定式）。\n• provided / providing (that) = 只要、在……条件下（强调必要前提条件）。\n• as long as = 只要（强调条件的持续性或前提假设）。\n• on condition that = 在……条件下（语体极为正式，常用于合同或书面协议）。\n• in case = 以防、万一。",
    "formation": "条件连词（Unless / Provided / As long as / On condition that）+ 条件从句，主句",
    "examples": [
      {
        "translation": "只要你保证按时还钱，我就把钱借给你。"
      },
      {
        "translation": "你可以使用我的笔记本电脑，前提是不能下载任何内容。"
      }
    ]
  },
  "en_c2_02": {
    "title": "Suppose / Supposing / What if 引导的假设问句",
    "shortExplanation": "用于提出假设性问题、推测未知情况或邀请对方设想某种情境。",
    "longExplanation": "用于构建假设情境的句型结构：\n• Suppose / Supposing：相当于 if，常用于引导假设性、探讨性的设问。\n• What if：更为口语化的表达方式，意思是'要是……怎么办？'或'如果……会怎样？'。\n• 搭配一般过去时或过去完成时：表示与现实相反或极不可能发生的纯假设情况。",
    "formation": "Suppose / Supposing / What if + 主语 + 谓语动词（过去时或现在时）……，疑问句分句？",
    "examples": [
      {
        "translation": "假定你必须做出选择——你会选哪一个？"
      },
      {
        "translation": "要是没有人来怎么办？我们该采取什么措施？"
      }
    ]
  },
  "en_c2_03": {
    "title": "Only + 状语置于句首的倒装结构",
    "shortExplanation": "将含有 'Only' 的时间、条件或方式状语置于句首以示强调，主句必须进行部分倒装。",
    "longExplanation": "当以 Only 开头的时间、条件或方式状语（如 only when, only after, only if, only then, only by, only in）置于句首以突出重点时，主句必须采用部分倒装（将助动词、情态动词或 be 动词置于主语之前）。\n这是正式书面语和公众演讲中最具感染力与修辞力量的句式之一。",
    "formation": "Only + 状语（时间/条件/方式）+ 助动词/情态动词/be动词 + 主语 + 谓语主要动词……",
    "examples": [
      {
        "translation": "唯有亲身经历过，你才能真正体会与理解。"
      },
      {
        "translation": "历经数年的刻苦练习之后，她才真正掌握了这门技能。"
      }
    ]
  },
  "en_c2_04": {
    "title": "So + 形容词/副词 引起的倒装结构",
    "shortExplanation": "将 'So + 形容词/副词' 或 'Such' 提前到句首以强化程度，引导表示结果的倒装句。",
    "longExplanation": "属于典雅的书面语与演说修辞风格：\n• So + 形容词/副词 + be动词/助动词 + 主语 + that + 结果从句（程度剧烈到如此地步，以至于……）。\n• Such + be动词 + 主语 + that + 结果从句（情况严重/程度重大到如此地步，以至于……）。",
    "formation": "So + 形容词/副词 + be动词/助动词 + 主语 + that + 从句 或 Such + be动词 + 主语 + that + 从句",
    "examples": [
      {
        "translation": "变革来得如此迅猛，以至于没有任何人能够立刻适应。"
      },
      {
        "translation": "她的才华极为出众，以至于直接获得了全额奖学金。"
      }
    ]
  },
  "en_c2_05": {
    "title": "学术模糊限制语（Hedging）：appear to, seem to, tend to, be likely to",
    "shortExplanation": "通过委婉弱化陈述的确定性，体现科学论述的审慎度与客观谦逊。",
    "longExplanation": "模糊限制语是学术写作中不可或缺的表达策略，旨在避免主观武断，保持严谨审慎的学术态度。\n常用核心结构包括：\n• appear / seem to：似乎、表面看来\n• tend to：倾向于、往往容易\n• be likely / unlikely to：很可能 / 极不可能\n• be thought / considered to be：被认为、被视作",
    "formation": "主语 + appear / seem / tend + 动词不定式（to + 动词原形）或 主语 + be likely / thought / considered + 动词不定式（to + 动词原形）",
    "examples": [
      {
        "translation": "实验结果似乎表明两者之间存在某种关联性。"
      },
      {
        "translation": "企业往往容易低估方案的落地实施成本。"
      }
    ]
  },
  "en_c2_06": {
    "title": "学术文本中的语篇标记词（Discourse markers）",
    "shortExplanation": "连接各逻辑层面的衔接词，用于梳理学术论证脉络并增强行文逻辑性。",
    "longExplanation": "语篇标记词在学术文本中用于构建逻辑骨架，引导读者的思维走向：\n• 递进与补充：Moreover, Furthermore, In addition, Additionally（此外、而且、并且）\n• 转折与对比：However, Nevertheless, Conversely, On the other hand（然而、尽管如此、相反、另一方面）\n• 因果与推论：Therefore, Consequently, As a result, Hence, Thus（因此、由此、结果表明）\n• 解释与阐明：In other words, That is to say, Namely（换句话说、也就是说、即）\n• 让步与限定：Admittedly, While it is true that, Despite this（诚然、虽然确实如此、尽管如此）",
    "formation": "语篇标记词（句首）+ 逗号 + 独立句子 或 句子1；语篇标记词，句子2",
    "examples": [
      {
        "translation": "实验失败了。尽管如此，所获得的研究发现依然极具启发意义。"
      },
      {
        "translation": "此外，各项数据均显示出极强的正相关性。"
      }
    ]
  },
  "en_c2_07": {
    "title": "语言语体（Speech registers）：正式、中性、口语",
    "shortExplanation": "根据交际场合、受众群体与交流目的，准确选取适宜的词汇与句式层次。",
    "longExplanation": "语体风格由语境、交流对象和表达目的共同决定：\n• 正式语体：大量运用被动语态、名词化结构、复合连词、无缩略形式，偏好拉丁源动词（如 commence, terminate, assist）。\n• 中性语体：遵循规范语法，不包含俚语，采用通用得体的标准表达。\n• 口语语体：多用省略句、短语动词（如用 put off 代替 postpone）、缩略词以及口语熟语。",
    "formation": "正式语体（学术词汇、被动语态、完整书写）↔ 中性语体（规范日常表达）↔ 口语语体（短语动词、缩略形式、口语俚俗）",
    "examples": [
      {
        "translation": "正式语体：我想提请阁下注意此处存在的一处差异。"
      },
      {
        "translation": "中性语体：我想指出这里的一个错误。"
      },
      {
        "translation": "口语语体：就是想顺便提醒你注意一下这事。"
      }
    ]
  },
  "en_c2_08": {
    "title": "同义词内涵意义与感情色彩（Connotations）",
    "shortExplanation": "辨析同义词在感情色彩（褒义、中性、贬义）及细微语义上的明暗层次。",
    "longExplanation": "同义词尽管概念意义相近，但其所蕴含的感情色彩（内涵意义）和适用的语体风格存在显著差异。\n典型梯度对比示例：\n• slim（苗条：褒义）→ thin（消瘦：中性）→ skinny（皮包骨：贬义）→ scrawny/gaunt（骨瘦如柴/憔悴干瘪：极贬义）\n• determined（坚定执着：褒义）→ firm（坚决稳重：中性）→ stubborn/pig-headed（顽固不化/死脑筋：贬义）\n• thrifty（节俭善持家：褒义）→ economical（节约算计：中性）→ stingy/tight-fisted（吝啬小气：贬义）\n• confident（自信昂扬：褒义）→ assertive（笃定果敢：中性）→ arrogant（傲慢狂妄：贬义）",
    "formation": "同义词序列：褒义倾向（+）→ 中性基调（0）→ 贬义倾向（-）",
    "examples": [
      {
        "translation": "描述同一客观体态却体现完全不同的情感倾向：她很苗条（+）/ 她很瘦（0）/ 她骨瘦如柴（-）。"
      }
    ]
  },
  "en_c2_09": {
    "title": "修辞手法：首语从复、交错配列、三句式（Rhetorical devices）",
    "shortExplanation": "经典修辞格，赋予语言节奏美感与感染力，广泛运用于公共演说与政论散文。",
    "longExplanation": "高级英语写作与公众演说中常用的经典修辞手法：\n• 首语从复：在连续的句子或从句开头重复相同的词句，层层递进以强化情感力量（例如：'I have a dream... I have a dream...'）。\n• 交错配列：采用 AB-BA 的交叉对称句式，产生哲理思辨的对照张力（例如：'Ask not what your country can do for you, but what you can do for your country'）。\n• 三句式（三分法）：由三个并列的排比要素构成平衡对称的节律（例如凯撒名言 'Veni, vidi, vici' 我来，我见，我征服；林肯演说 '民有、民治、民享的政府'）。",
    "formation": "首语从复（句首连续重复 A...）/ 交错配列（A-B 对照 B-A）/ 三句式排比（并列三要素 A, B, C）",
    "examples": [
      {
        "translation": "朋友们，罗马同胞们，乡亲们，请听我说。（经典三句式排比）"
      },
      {
        "translation": "学得越多，赚得越多。（民间谚语中的交错对称句式）"
      }
    ]
  },
  "en_c2_10": {
    "title": "学术文本中的精准词语搭配（Academic collocations）",
    "shortExplanation": "掌握符合学术规范的固定动宾搭配与习惯用语，确保行文地道严谨。",
    "longExplanation": "在高级英语表达中，特定学术名词往往有其约定俗成的标准搭配动词：\n常见学术核心搭配：\n• conduct / carry out research（开展研究；切忌使用 make 或 do）\n• draw / reach a conclusion（得出结论）\n• raise / address / tackle an issue（提出/正视/解决问题）\n• reach / achieve a consensus（达成共识）\n• make significant progress（取得显著进展）\n• pose / present a challenge（构成严峻挑战）",
    "formation": "规范学术动词 + 相应核心名词（例如：conduct research, reach a consensus...）",
    "examples": [
      {
        "translation": "研究人员展开了极其广泛的深度访谈。"
      },
      {
        "translation": "委员会最终未能就该议题达成共识。"
      }
    ]
  },
  "en_c2_11": {
    "title": "分词独立主格结构（Absolute construction）",
    "shortExplanation": "由名词/代词与分词构成的独立状语结构，无需连词即可简洁交代背景情境。",
    "longExplanation": "独立主格结构（分词独立结构）= 名词/代词 + 分词短语（拥有独立于主句的逻辑主语）。\n常用于正式书面文体中，能够在不依赖从属连词的前提下，极其凝练地提供时间、原因、条件或伴随状况等背景信息。\n典型类别解析：\n• 条件背景：Weather permitting = 如果天气情况允许\n• 综合评述：All things considered = 全面综合权衡之后\n• 时间与完成：Her work finished = 当她的工作完成之后；This done = 此事办妥之后",
    "formation": "名词/代词 + 现在分词（V-ing）或 过去分词（V-ed/V3），主句",
    "examples": [
      {
        "translation": "综合所有因素来看，这依然是一场非常成功的活动。"
      },
      {
        "translation": "由于截止日期已过，该项目遗憾被取消了。"
      }
    ]
  },
  "en_c2_12": {
    "title": "语篇中的省略与替代（Ellipsis & Substitution）",
    "shortExplanation": "省略已知多余成分或运用代词、助动词进行替代，使语篇紧凑连贯、自然流畅。",
    "longExplanation": "省略与替代是构建语篇衔接、避免机械重复的关键语言手段：\n• 省略：略去前文已明确交代过的信息成分（例如：I wanted to leave, but wasn't allowed to [leave] 省略了动词原形）。\n• 替代：使用 do, so, one, it 等简短代用词来指代先前出现过的名词、动词短语或整个命题。\n常见类型展示：\n• 对话简答省略：A: Are you coming? B: Might (do).\n• 并列替代：She speaks French and he does too / so does he.\n• 名词单复数替代：The big one? I prefer the small one.",
    "formation": "前置陈述句子 + 连词/对话回应 + [省去重合成分 或 使用 do / so / one / to 进行替代]",
    "examples": [
      {
        "translation": "你会开车吗？——我过去会开（现在不开好多年了）。"
      },
      {
        "translation": "她曾说过自己会准时来这儿，她确实来了。"
      }
    ]
  },
  "en_c2_13": {
    "title": "不定式短语代替从句",
    "shortExplanation": "使用动词不定式短语替代宾语从句或状语从句，使句子结构更加紧凑精炼。",
    "longExplanation": "复合宾语结构（宾语 + 动词不定式）常用于替代由从属连词引导的完整从句：\n• 表示意愿、要求的动词 + 宾语 + 动词不定式（带 'to'）：例如表达'想要某人留下'。\n• 在感官动词与使役动词（如看见、听见、注视、让、迫使等）后：主动语态中省略 'to'，使用不带 'to' 的动词原形，例如'看见她离开'、'使他哭泣'、'让我来帮忙'。\n• 使役动词变为被动语态时：必须恢复使用带 'to' 的不定式，例如'他被迫付款'。\n• 主语补足语结构（接在看似、显得、碰巧、证明是等表象动词后）+ 带 'to' 的不定式：例如'她似乎知情'、'他碰巧在场'。",
    "formation": "主语 + 谓语动词 + 宾语 + 动词不定式（带 'to' / 不带 'to'）或 主语 + 表象动词 + 动词不定式（带 'to'）",
    "examples": [
      {
        "translation": "我需要你在这份文件上签字。"
      },
      {
        "translation": "她被迫公开道歉。"
      },
      {
        "translation": "他似乎把一切都忘了。"
      }
    ]
  },
  "en_c2_14": {
    "title": "将来完成进行时",
    "shortExplanation": "强调某一动作持续进行，一直延续到未来某一特定时刻的时间长度。",
    "longExplanation": "将来完成进行时用于着重强调某一动作持续至未来某个时间点的时间长度或不间断性，通常回答'到那时为止已经进行了多久？'这一问题。\n常与表示时间界限或持续时长的状语连用（如'到……为止'、'持续……时间'、'当……时'）：例如'到下周一为止，她参与该项目的工作就满三周了'。",
    "formation": "主语 + will have been + 动词现在分词（'-ing' 形式）",
    "examples": [
      {
        "translation": "到明年，我学习英语就满五年了。"
      },
      {
        "translation": "等我们到达时，她就已经等了两个小时了。"
      }
    ]
  },
  "en_c2_15": {
    "title": "时态呼应（复合句中的时态一致）",
    "shortExplanation": "复合句中从句谓语动词根据主句过去时态进行的相应时态调整与呼应。",
    "longExplanation": "在主从复合句中，从句的谓语动词时态须受主句动词时态的制约。\n当主句谓语动词使用过去时态时，从句动词通常需要向过去推移一个时态（时态后退）：\n• 一般现在时变为一般过去时（例如：他说那是真的）。\n• 一般过去时变为过去完成时（例如：她说她曾见过）。\n• 现在完成时变为过去完成时（例如：他说他已经完成了）。\n• 情态动词与助动词相应变为过去式（will 变为 would，can 变为 could，may 变为 might，is 变为 was 等）。\n*注意例外：当从句表述客观真理、科学事实或普遍规律时，时态不作改变，依然保持一般现在时。",
    "formation": "主句（一般过去时） + 从句（相应后退的过去时态动词）",
    "examples": [
      {
        "translation": "他告诉我他在那里已经住了很多年。"
      },
      {
        "translation": "她说地球绕着太阳转。"
      }
    ]
  },
  "en_c2_16": {
    "title": "并列连词",
    "shortExplanation": "连接语法地位平等的单词、短语或独立分句的连词。",
    "longExplanation": "并列连词用于连接句中具有同等语法地位和结构的成分。英语中最常见的7个基础并列连词：\n• for：意为'因为'（较正式，用于补充说明理由）：例如'她离开了，因为她累了'。\n• and：意为'和、并且'（表示并列与递进补充）。\n• nor：意为'也不'（连接否定分句，后接倒装语序）：例如'她没有打电话，也没有写信'。\n• but：意为'但是'（表示转折对比）。\n• or：意为'或者'（表示选择）。\n• yet：意为'然而、尽管如此'（比 but 更具书面语色彩的转折）。\n• so：意为'因此、所以'（表示结果）。",
    "formation": "独立分句 + 逗号（,） + 并列连词（for, and, nor, but, or, yet, so） + 独立分句",
    "examples": [
      {
        "translation": "她虽然很累，然而依然坚持工作。"
      },
      {
        "translation": "他既没有复习功课，也没有去上课。"
      }
    ]
  },
  "en_c2_17": {
    "title": "从属连词",
    "shortExplanation": "用于引导从句并阐明从句与主句之间各种逻辑关系的连词。",
    "longExplanation": "从属连词用于引导状语从句或名词性从句，表明从句与主句之间的逻辑从属关系。\n按表达语义分类：\n• 时间关系：当……时、在……期间、在……之后、在……之前、直到……、一旦……、一……就……、无论何时等\n• 原因关系：因为、既然、鉴于、考虑到等\n• 条件关系：如果、除非、只要、在……条件下、以防万一、假设等\n• 目的关系：为了、以便、唯恐、免得等\n• 让步与对比关系：虽然、尽管、而/反之、然而等",
    "formation": "从属连词 + 从属从句 + 逗号（,） + 主句 或 主句 + 从属连词 + 从属从句",
    "examples": [
      {
        "translation": "鉴于截止日期已过，我们取消了会议。"
      },
      {
        "translation": "唯恐她遗忘，他给她发了一份提醒。"
      }
    ]
  },
  "en_c2_18": {
    "title": "逗号、分号与冒号的用法",
    "shortExplanation": "掌握英文标点符号中逗号、分号与冒号在连接分句、引出列表及解释说明时的规范用法。",
    "longExplanation": "英文标点符号的核心用法规则：\n• 逗号（,）：位于连接两个独立分句的并列连词前；位于句首状语或引导短语之后（例如：'然而，她决定留下'）；用于项的列举与分隔（包括位于最后一个并列词之前的牛津逗号）。\n• 分号（;）：用于在无需连词的情况下，直接连接两个在语义上联系紧密的独立分句（例如：'她累了；她上床睡觉了'）。\n• 冒号（:）：用于引出清单列表、进一步的阐释说明或直接引用语。",
    "formation": "独立分句 + 逗号（,） + 并列连词 + 独立分句 或 独立分句 + 分号（;） + 独立分句 或 完整句子 + 冒号（:） + 列表 / 解释说明",
    "examples": [
      {
        "translation": "然而，结果并不确凿；仍需开展进一步的研究。"
      },
      {
        "translation": "该公司拥有三大重点目标：效率、创新与可持续性。"
      }
    ]
  },
  "en_c2_19": {
    "title": "破折号、撇号与引号的用法",
    "shortExplanation": "掌握英文中破折号强调插入语、撇号表示缩写及所有格、以及引号用于直接引语的规范用法。",
    "longExplanation": "破折号、撇号及引号的用法准则：\n• 破折号（—）：用于分隔并突显句中的插入语或补充说明，其强调语气比逗号更为强烈（例如：'该方案——尽管造价昂贵——被证明是行之有效的'）。\n• 撇号（'）：用于单词的缩写形式（如 it's 代替 it is，don't，they're 等）；以及用于名词所有格（如约翰的书、学生们的分数）。\n• 引号：用于标示直接引语或精确引文（美式英语习惯使用双引号 \" \"，英式英语则更常用单引号 ' '）。",
    "formation": "原句成分 + 破折号（—） + 插入语/补充成分 + 破折号（—） 或 缩写词 / 名词 + 撇号（'） + 所有格成分 或 引号（\" \"） + 直接引语",
    "examples": [
      {
        "translation": "该项目——于2020年启动——超越了所有的预期。"
      },
      {
        "translation": "在使用之前检查它的各项设置是非常重要的。"
      }
    ]
  },
  "en_c2_20": {
    "title": "学术文本中的间接疑问句",
    "shortExplanation": "在学术写作中，直接疑问句通常转换为使用陈述语序的间接疑问句（疑问从句）。",
    "longExplanation": "在学术论文与学术文本中，为保持客观严谨、正式庄重的文风，通常避免使用直接疑问句，而采用间接疑问句（名词性从句）来表述问题。\n间接疑问句属于从属分句，遵循陈述句的标准语序（即'主语 + 谓语'，不进行主谓倒装，也不借助助动词构成疑问语序）。\n常用引导词包括：表示'是否'的引导词，以及各类疑问词（什么、何处、何时、如何、为何、哪个等）。\n转换示例：'这组数据说明了什么？' → '核心问题在于这组数据说明了什么'。",
    "formation": "主句 + 疑问词 / 是否引导词 + 主语 + 谓语动词（陈述语序）",
    "examples": [
      {
        "translation": "我想知道该假设是否正确。"
      },
      {
        "translation": "这项研究探讨了社交媒体如何对行为产生影响。"
      }
    ]
  }
};

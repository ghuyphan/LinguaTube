import { GrammarTranslation } from "../../../models/grammar.model";

export const GRAMMAR_EN_ZH: Record<string, GrammarTranslation> = {
  "en_a1_01": {
    "title": "am / is / are - 动词 to be 的形式",
    "shortExplanation": "我是，他是，他们是",
    "longExplanation": "to be 是英语中最重要的动词，类似于俄语中的“to be/appear”。\n三种形式：am - 仅与I； 是 - 与他、她、它； 是 - 和你、我们、他们在一起。\n⚠️ 与俄语的一个重要区别：在英语中，动词不能错过。在俄语中我们说“我是学生”，而在英语中我们必须说：我是学生。",
    "formation": "我是，他是，他们是",
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
    "title": "否定：我不是/不是/不是",
    "shortExplanation": "我不累。他不在这里。他们还没准备好。",
    "longExplanation": "否定是通过添加not来构造的：am not、is not、are not。\n缩写形式：isn't（= is not）、aren't（= are not）。只有 am not 不会简化为 amn't - 例外！",
    "formation": "我不累。他不在这里。他们还没准备好。",
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
    "title": "问题是：我是吗？ / 她是吗？ / 他们是吗？",
    "shortExplanation": "她是老师吗？你冷吗？我迟到了吗？",
    "longExplanation": "在疑问句中，动词to be置于主语之前：She is → Is she?\n特殊问题：疑问词 + to be + 主语：Where is he？这是什么？\n简短回答：是的，我是。 / 不，她不是",
    "formation": "她是老师吗？你冷吗？我迟到了吗？",
    "examples": [
      {
        "translation": "你是学生吗？"
      },
      {
        "translation": "贵吗？"
      },
      {
        "translation": "他们在哪里？"
      }
    ]
  },
  "en_a1_04": {
    "title": "简短的回答：是的，我是。 / 不，她不是。",
    "shortExplanation": "仅限完整形式 - 不允许：“是的，我是”",
    "longExplanation": "简而言之，回答代词+to be。 你不能缩短肯定答案中动词的形式。\n你累了吗？ — 是的，我是。✓ ✓    是的，我是。✗",
    "formation": "仅限完整形式 - 不允许：“是的，我是”",
    "examples": [
      {
        "translation": "她准备好了吗？ - 是的。"
      },
      {
        "translation": "他们是你的朋友吗？ - 不。"
      }
    ]
  },
  "en_a1_05": {
    "title": "第 a / an - 无限期",
    "shortExplanation": "一只狗、一个苹果、一个小时、一所大学",
    "longExplanation": "a 和 an 是不定冠词，放置在单数首先提到对象之前。\n选择取决于声音，而不是字母：\n• a - 辅音之前：a book, a car, a University [ju...]\n• an - 元音之前声音：一个苹果，一个小时 [aʊ...]，一个诚实的人",
    "formation": "一只狗、一个苹果、一个小时、一所大学",
    "examples": [
      {
        "translation": "我在花园里看到一只猫。"
      },
      {
        "translation": "她是一名工程师。"
      },
      {
        "translation": "花了一个小时。"
      }
    ]
  },
  "en_a1_06": {
    "title": "文章 - 明确",
    "shortExplanation": "阳光、门、桌上的书",
    "longExplanation": "the用于当说话者和听者知道他们在谈论什么时。\n当我们使用the时：\n1.主题已经提到过：我看到了一只猫。猫是黑色的。\n2。独一无二：太阳、月亮、地球\n3。从上下文中可以清楚地看出：请关闭窗口。\n4。最高级：最好的，最大的",
    "formation": "阳光、门、桌上的书",
    "examples": [
      {
        "translation": "我们看的电影很棒。"
      },
      {
        "translation": "你能把盐递过去吗？"
      }
    ]
  },
  "en_a1_07": {
    "title": "零文章 - 当不需要文章时",
    "shortExplanation": "我喜欢音乐。她打网球。他来自俄罗斯。",
    "longExplanation": "文章未放置在之前：\n• 专有名称：约翰，伦敦，俄罗斯\n• 语言和国籍：英语、俄语\n• 体育和游戏：足球、象棋\n• 一般意义上的食物/饮料：我喜欢咖啡\n• 一般抽象概念：生命短暂。爱情是盲目的。\n• 一般意义上的复数：狗是友好的。",
    "formation": "我喜欢音乐。她打网球。他来自俄罗斯。",
    "examples": [
      {
        "translation": "她说 西班牙语。"
      },
      {
        "translation": "他每天都打篮球。"
      }
    ]
  },
  "en_a1_08": {
    "title": "一般现在时 - 肯定句",
    "shortExplanation": "我工作。他工作。她走了。它运行了。",
    "longExplanation": "现在简单用于：习惯和常规行为、事实和一般真理、时间表。\n公式：我/你/我们/他们+不定式； he/she/it + 不定式+s/es\n词尾书写规则-s/-es：\n• 大多数动词：+ s → works、plays\n• 以 -o、-ch、-sh、-s、-ss、-x 结尾：+ es → goes、watchs、washes\n• 以辅音 + -y 结尾：-y → ies → 研究、尝试",
    "formation": "我工作。他工作。她走了。它运行了。",
    "examples": [
      {
        "translation": "我每天早上都喝咖啡。"
      },
      {
        "translation": "她在医院工作。"
      },
      {
        "translation": "地球绕着太阳转。"
      }
    ]
  },
  "en_a1_09": {
    "title": "一般现在时 - 否定：不/不",
    "shortExplanation": "我不喜欢它。他不喜欢这样。 （不是：他没有）",
    "longExplanation": "否定是使用助动词do/does + not构建的：\n• I/you/we/they + dont + 不定式\n• he/she/it + doesn't + 不定式\n⚠️ 在doesn't主要动词不带-s之后！ 她不喜欢（不是喜欢）。",
    "formation": "我不喜欢它。他不喜欢这样。 （不是：他没有）",
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
    "title": "现在简单 - 问题：你吗？ /她是吗？",
    "shortExplanation": "你喜欢披萨吗？他在这里工作吗？他们住在哪里？",
    "longExplanation": "问题：做/做 + 主语+不定式？\n• 我/你/我们/他们：你...吗？\n• 他/她/它：她...吗？\n特殊问题：疑问词+ do/does + 主语+不定式：\n她住在哪里？他们做什么？\n⚠️ 例外：“谁？”这个问题没有do：谁喜欢冰淇淋？",
    "formation": "你喜欢披萨吗？他在这里工作吗？他们住在哪里？",
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
    "title": "静态动词 - 不用于连续式的动词",
    "shortExplanation": "我知道，不：我知道。我爱，不是：我正在爱。",
    "longExplanation": "有些动词描述的是状态而不是动作 - 它们不用于进行时态。\n主要类别：\n• 意见：知道、相信、思考、理解、记住、忘记\n• 感觉：爱、恨、喜欢、想要、需要、更喜欢\n• 感知：看到、听到、闻到、尝到、看起来\n• 存在：是、存在、属于、包含、似乎、出现",
    "formation": "我知道，不：我知道。我爱，不是：我正在爱。",
    "examples": [
      {
        "translation": "我理解你。"
      },
      {
        "translation": "她喜欢巧克力。"
      }
    ]
  },
  "en_a1_12": {
    "title": "人称代词：我、你、他、她、它、我们、他们",
    "shortExplanation": "你总是需要一个明确的主题 - 你不能跳过我",
    "longExplanation": "与俄语不同，英语主语始终是必填。\n俄语：“我要回家了。”英语：我要回家了。\n宾语形式（在动词或介词之后）：我、你、他、她、它、我们、他们。",
    "formation": "你总是需要一个明确的主题 - 你不能跳过我",
    "examples": [
      {
        "translation": "她是一名老师。"
      },
      {
        "translation": "告诉他真相。"
      },
      {
        "translation": "你能帮我吗？"
      }
    ]
  },
  "en_a1_13": {
    "title": "所有格形容词：我的、你的、他的、她的、它的、我们的、他们的",
    "shortExplanation": "我的书，她的车，他们的房子——不要按号码改变",
    "longExplanation": "所有格形容词显示所有权，并位于名词之前。\n重要提示：its（不带撇号）= 所有权； it's（带有撇号）= it is。\n性别和号码不要改变：我的朋友/我的朋友 - 一样。",
    "formation": "我的书，她的车，他们的房子——不要按号码改变",
    "examples": [
      {
        "translation": "这是我的手机。"
      },
      {
        "translation": "他们的狗很可爱。"
      },
      {
        "translation": "猫的爪子受伤了。"
      }
    ]
  },
  "en_a1_14": {
    "title": "名词复数",
    "shortExplanation": "猫、盒子、刀、儿童、男人、羊",
    "longExplanation": "基本规则：添加-s。\n特殊情况：\n• -s、-ss、-sh、-ch、-x、-o: + es → 盒子、手表、西红柿\n• 元音 + -y: + s → 男孩、天\n• 辅音 + -y: -y → ies → 城市、婴儿\n• -f/-fe：→ ves → 刀、树叶、妻子\n不规则：儿童→儿童、男人→男人、女人→女人、牙齿→牙齿、脚→脚、老鼠→老鼠、人→人、鱼→鱼、羊→羊",
    "formation": "猫、盒子、刀、儿童、男人、羊",
    "examples": [
      {
        "translation": "一辆巴士 → 两辆巴士"
      },
      {
        "translation": "一个孩子 → 许多孩子"
      }
    ]
  },
  "en_a1_15": {
    "title": "这个/那个/这些/那些",
    "shortExplanation": "这个/这些 - 附近；那个/那些——远方",
    "longExplanation": "this（这个）- 单数+下一个\n这些（这些）- 复数+附近\nthat（那个）- 单数+远或已知\nthose（那些）- 复数+远\n也用于时间：本周（本周），那一年（那一年）。",
    "formation": "这个/这些 - 附近；那个/那些——远方",
    "examples": [
      {
        "translation": "这是我的袋子。"
      },
      {
        "translation": "那双鞋很贵。"
      },
      {
        "translation": "它是什么？"
      }
    ]
  },
  "en_a1_16": {
    "title": "There is / there are - existence",
    "shortExplanation": "有一个公园。有五个房间。",
    "longExplanation": "there is/are 的意思是“存在/存在”、“是”。\n• There is + 单数名词。 number\n• There are + plural noun. number\n否定：没有/没有\n问题：有...吗？ / 有...吗？\n⚠️ 不要与是混淆！ 桌子上有一本书（书就在那里）vs这是一本好书（有特色）。",
    "formation": "有一个公园。有五个房间。",
    "examples": [
      {
        "translation": "附近有一家电影院。"
      },
      {
        "translation": "附近有商店吗？ - 是的。"
      }
    ]
  },
  "en_a1_17": {
    "title": "地点介词：in, on, at, under, next to, Behind, Between",
    "shortExplanation": "在盒子里、在桌子上、在车站",
    "longExplanation": "三个主要介词：\n• in = 在某物内：在盒子里、在城市中、在床上\n• on = 在表面上：在桌子上、在墙上、在左边\n• at = 在特定点：在车站、在家里、在学校\n其他： under（下）、next to/beside（附近）、behind（后面）、in front of（前面）、 Between（之间）、opposite（相反）",
    "formation": "在盒子里、在桌子上、在车站",
    "examples": [
      {
        "translation": "钥匙在桌子上。"
      },
      {
        "translation": "她在厨房里。"
      },
      {
        "translation": "在入口处见我。"
      }
    ]
  },
  "en_a1_18": {
    "title": "势在必行",
    "shortExplanation": "打开你的书。别跑。请坐。",
    "longExplanation": "命令式 = 没有主语的动词的基本形式。\n否定：Don't + 不定式\nPlease 使请求更加礼貌（在开头或结尾）。\n要包括说话者：Let's + 不定式 → Let's go！咱们吃饭吧！",
    "formation": "打开你的书。别跑。请坐。",
    "examples": [
      {
        "translation": "在路口左转。"
      },
      {
        "translation": "别碰这个！"
      },
      {
        "translation": "我们休息一下吧。"
      }
    ]
  },
  "en_a1_19": {
    "title": "能/不能——技巧和决心",
    "shortExplanation": "我会游泳。她不会开车。我可以帮你吗？",
    "longExplanation": "can是情态动词，表示：\n1.技能/能力：我会弹吉他\n2。机会：可能很危险\n3.决议（口头）：我可以使用你的手机吗？\n⚠️ 可以永远不会改变：他可以（不是他可以）。其后是不带to的不定式。",
    "formation": "我会游泳。她不会开车。我可以帮你吗？",
    "examples": [
      {
        "translation": "我会说三种语言。"
      },
      {
        "translation": "她今天不能来。"
      },
      {
        "translation": "你能帮我吗？"
      }
    ]
  },
  "en_a1_20": {
    "title": "疑问词：什么、哪里、谁、何时、如何、为什么、哪个、谁、多少/多少",
    "shortExplanation": "这是什么？你住在哪里？你今年多大？",
    "longExplanation": "疑问词出现在问题的开头，主语之前有助动词。\n• what = 什么/which\n• where = where/where\n• who = who（不带 do 的问题：谁住在这里？）\n• when = when\n• why =为什么\n• 如何 = 如何； 多少 = 多少（不可数）； 多少 = 多少（计数）； 多大 = 多大； 多长时间 = 多长时间",
    "formation": "这是什么？你住在哪里？你今年多大？",
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
    "title": "定量数字：1–1000",
    "shortExplanation": "一、二、三……二十一、一百、一千",
    "longExplanation": "数字 1–12：特殊词（一、二、三...十二）。\n13–19：+ -teen（十三、十四...十九；例外：十三、十五、十八）。\n十：二十、三十、四十、五十、六十、七十、八十、九十。\n复合词：21 = 二十一（通过连字符）。\n100 = 一个/一百； 1000 = 一/一千。\n一百/千之后 - 和 (BrE)：两百五十。",
    "formation": "一、二、三……二十一、一百、一千",
    "examples": [
      {
        "translation": "她今年二十三岁。"
      },
      {
        "translation": "票价四百英镑。"
      }
    ]
  },
  "en_a1_22": {
    "title": "序数词：第一、第二、第三……",
    "shortExplanation": "第一、第二、第三、第四……二十一",
    "longExplanation": "序数由-th相加而成：第四、第五、第六...\n例外：第一（1st）、第二（2nd）、第三（3rd）、第五（5）、第八（8）、第九（9）、第十二（12）。\n总是与冠词the一起使用：第一天、第三天地板。\n分数：½ = 二分之一，⅓ = 三分之一，¼ = 四分之一。",
    "formation": "第一、第二、第三、第四……二十一",
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
    "title": "所有格：'s 和 s'",
    "shortExplanation": "约翰的车，我姐姐的朋友，孩子们的玩具，老师的房间",
    "longExplanation": "在英语中，归属感由撇号 + s 表示：\n• 单数：汤姆的书、狗尾巴\n• 带-s 的复数：仅撇号：老师的房间、我父母的房子\n• 不规则复数：'s：儿童游乐场、男人的房子衣服\n• 以 -s 结尾的名字：James's / James' - 两个选项都是正确的",
    "formation": "约翰的车，我姐姐的朋友，孩子们的玩具，老师的房间",
    "examples": [
      {
        "translation": "这是安娜的笔记本电脑。"
      },
      {
        "translation": "盒子里的儿童玩具。"
      }
    ]
  },
  "en_a1_24": {
    "title": "运动介词：到、进入、出、上、下、沿着、穿过、通过",
    "shortExplanation": "去学校，走进房间，跑过马路",
    "longExplanation": "• to = 到一点的方向：去上班，步行去公园\n• into = 向内运动：进入房间，跳进游泳池\n• 出 = 向外运动：下车，从包里拿出来\n• 上/下 = 上/下： 爬上山，走下楼梯\n• 沿着 = 沿着：沿着河走\n• 穿过 = 穿过/穿过：游过湖，穿过马路\n• 穿过 = 穿过：开车穿过隧道",
    "formation": "去学校，走进房间，跑过马路",
    "examples": [
      {
        "translation": "她进了房间。"
      },
      {
        "translation": "他跑过马路。"
      },
      {
        "translation": "我们开车穿过森林。"
      }
    ]
  },
  "en_a2_01": {
    "title": "一般过去时 - 规则动词：+ed",
    "shortExplanation": "工作→工作、玩耍→玩耍、停止→停止、学习→学习",
    "longExplanation": "简单过去时 - 过去完成的动作，有或没有特定时态。\n词尾-ed的书写规则：\n• 大多数动词：+ ed → worked、played\n• 以 -e 结尾：+ d → loved、used\n• 辅音 + -y：-y → ied → 研究、尝试\n• 一个元音 + 一个辅音（短重读音节）：双辅音 → 停止，计划",
    "formation": "工作→工作、玩耍→玩耍、停止→停止、学习→学习",
    "examples": [
      {
        "translation": "她昨天工作了一整天。"
      },
      {
        "translation": "他们上周日打网球。"
      }
    ]
  },
  "en_a2_02": {
    "title": "一般过去时 - 不规则动词（表）",
    "shortExplanation": "去→去，看→看见，有→有，来→来，买→买",
    "longExplanation": "大约200个不规则动词需要死记硬背。最频繁的 50 种覆盖约 90% 的使用。\n按变化的相似性进行分组：\n• AAA（不更改）：剪切、放置、击中、设置、让\n• ABA（返回开头）：跑→跑→跑、来→来→来\n• ABC（全部不同）：走→去→走，是→曾经/曾经→曾经",
    "formation": "去→去，看→看见，有→有，来→来，买→买",
    "examples": [
      {
        "translation": "去年夏天我去了巴黎。"
      },
      {
        "translation": "她看了一部很棒的电影。"
      },
      {
        "translation": "我们九点开会。"
      }
    ]
  },
  "en_a2_03": {
    "title": "一般过去时 - 否定：did not + 不定式",
    "shortExplanation": "她没有去（不是：没有去）。我没有看到他。",
    "longExplanation": "否定：didn't（= 没有）+ 不定式表示所有人。\n⚠️ 在 didn't 之后 - 动词的基本形式（不是过去时！）：她没有去（不是去）。",
    "formation": "她没有去（不是：没有去）。我没有看到他。",
    "examples": [
      {
        "translation": "昨天我没有看到他。"
      },
      {
        "translation": "她没有来上班。"
      }
    ]
  },
  "en_a2_04": {
    "title": "一般过去时 - 问题：你是吗？她去哪儿了？",
    "shortExplanation": "他们到了吗？他说什么？",
    "longExplanation": "问题：Did + 主语 + 不定式？\n特殊问题：地点/时间/什么 + did + 主语 + 不定式？\n⚠️ 例外：问题“谁执行了该操作？”是在没有 did 的情况下构建的：谁打电话来的？谁打破了花瓶？",
    "formation": "他们到了吗？他说什么？",
    "examples": [
      {
        "translation": "你喜欢这部电影吗？"
      },
      {
        "translation": "他们去哪儿了？"
      },
      {
        "translation": "谁告诉你这个的？"
      }
    ]
  },
  "en_a2_05": {
    "title": "was / were - 动词过去式",
    "shortExplanation": "我/他/她/它是。你/我们/他们是。",
    "longExplanation": "动词to be的过去式：\n• was - 与我、他、她、它\n• were - 与你、我们、他们\n否定：wasn't / were not\n问题：Was she...？他们是……吗？",
    "formation": "我/他/她/它是。你/我们/他们是。",
    "examples": [
      {
        "translation": "昨晚我很累。"
      },
      {
        "translation": "他们一整天都待在家里。"
      },
      {
        "translation": "贵吗？"
      }
    ]
  },
  "en_a2_06": {
    "title": "意志——预测和自发决定",
    "shortExplanation": "我会给你回电话。明天会下雨。我要吃意大利面。",
    "longExplanation": "will 用于：\n1。 自发决定（在演讲时做出）：我会帮助你。\n2.没有具体计划的预测：我认为会下雨。\n3. 承诺：我不会告诉任何人。\n4. 请求：你愿意打开窗户吗？\n缩写：'ll。否定：不会（=不会）。",
    "formation": "我会给你回电话。明天会下雨。我要吃意大利面。",
    "examples": [
      {
        "translation": "电话响了。 - 我会回答！"
      },
      {
        "translation": "明天会很冷。"
      }
    ]
  },
  "en_a2_07": {
    "title": "去 - 意图和明显的预测",
    "shortExplanation": "我要去访问 巴黎 。小心——你会摔倒的！",
    "longExplanation": "前往用于：\n1. 预先制定的决定和意图：我下周要开始节食。\n2. 有明显迹象的预测：看看那些云彩 - 要下雨了！\n形式：am/is/are + getting to + 不定式",
    "formation": "我要去访问 巴黎 。小心——你会摔倒的！",
    "examples": [
      {
        "translation": "我要去学医。"
      },
      {
        "translation": "她正在怀孕。"
      }
    ]
  },
  "en_a2_08": {
    "title": "现在进行时：am/is/are + V-ing",
    "shortExplanation": "她现在正在读书。他们正在外面玩。",
    "longExplanation": "现在进行时是现在或在此期间暂时发生的动作。\n形式：am/is/are + 动词 + -ing\n-ing的书写规则：\n• 大多数：只是 + ing → 工作、玩耍\n• 以 -e 结尾：删除-e + ing → 制作、到来\n• 短重读音节：双读最后一个辅音 → 跑、坐",
    "formation": "她现在正在读书。他们正在外面玩。",
    "examples": [
      {
        "translation": "我现在正在学习英语。"
      },
      {
        "translation": "这个月她在家工作。"
      }
    ]
  },
  "en_a2_09": {
    "title": "现在 连续 计划的未来",
    "shortExplanation": "我明天要见汤姆。我们周五飞往罗马。",
    "longExplanation": "现在进行时用于将来具体协议 - 当时间和地点已经确定时。\n区别：\n• 我明天会见爱丽丝 - 会议已商定（具体计划）\n• 我明天会见爱丽丝 - 意图或建议",
    "formation": "我明天要见汤姆。我们周五飞往罗马。",
    "examples": [
      {
        "translation": "今晚我要和亚历克斯共进晚餐。"
      },
      {
        "translation": "他们将于六月结婚。"
      }
    ]
  },
  "en_a2_10": {
    "title": "一般现在时与现在进行时 - 区别",
    "shortExplanation": "我喝咖啡（习惯）与我正在喝咖啡（现在）",
    "longExplanation": "现在简单：习惯、事实、时间表、一般真理。\n现在进行时：现在或暂时发生的事情。\n比较：\n• 她说法语。 - 知道该语言（总是）\n• 她说法语。 - 现在说\n⚠️ 静态动词（知道、爱、想要，理解...) - 只有现在简单！",
    "formation": "我喝咖啡（习惯）与我正在喝咖啡（现在）",
    "examples": [
      {
        "translation": "水在 100°C 时沸腾。"
      },
      {
        "translation": "这周我正在读一本很棒的书。"
      }
    ]
  },
  "en_a2_11": {
    "title": "应该/不应该——建议和推荐",
    "shortExplanation": "你应该去看医生。你不应该吃那么多。",
    "longExplanation": "应该表达温和的建议或个人意见。弱于必须。\n应该之后 - 不带to的不定式。\n也用于批评或遗憾：You Should had call（应该打电话）。",
    "formation": "你应该去看医生。你不应该吃那么多。",
    "examples": [
      {
        "translation": "你应该多运动。"
      },
      {
        "translation": "她不应该这么辛苦。"
      }
    ]
  },
  "en_a2_12": {
    "title": "必须/不得——义务和严格禁止",
    "shortExplanation": "您必须系好安全带。你不可以在这里抽烟。",
    "longExplanation": "必须 - 强烈的义务（通常是内部）或校准类别要求。\n不得 - 严格的禁止（绝对不可能！）。\n⚠️ 重要区别：必须 ≠ 不必！\n• 必须 =禁止\n• 不必 = 不要求，但可能",
    "formation": "您必须系好安全带。你不可以在这里抽烟。",
    "examples": [
      {
        "translation": "您必须出示您的护照。"
      },
      {
        "translation": "你不能在这里吸烟。"
      }
    ]
  },
  "en_a2_13": {
    "title": "必须 - 外部必要性",
    "shortExplanation": "我必须工作到很晚。她不必来。",
    "longExplanation": "have to - 由于外部规则、环境或其他人的要求而必需的。\n与must的区别：\n• must - 内部必要性：我必须打电话给她（我自己认为有必要）\n• have to - 外部：我必须穿制服 （规则）\n不必=可选（不是必需的，但允许）。",
    "formation": "我必须工作到很晚。她不必来。",
    "examples": [
      {
        "translation": "我必须在星期五之前提交报告。"
      },
      {
        "translation": "你不必来。"
      }
    ]
  },
  "en_a2_14": {
    "title": "可以 - 过去的技能和礼貌的请求",
    "shortExplanation": "她五岁时就会游泳。你能帮我吗？",
    "longExplanation": "could 是 can 的过去式。主要有两个含义：\n1． 过去的技能：我4岁就能读书。\n2. 礼貌请求（比能更有礼貌）：请你把盐递过来吗？\n还有目前的可能性：这可能是真的。",
    "formation": "她五岁时就会游泳。你能帮我吗？",
    "examples": [
      {
        "translation": "她小时候就知道如何拉小提琴。"
      },
      {
        "translation": "你能说慢一点吗？"
      }
    ]
  },
  "en_a2_15": {
    "title": "形容词的比较级",
    "shortExplanation": "更大、更有趣、更好、更差",
    "longExplanation": "-y 中的单音节和双音节：+ er（快→更快，快乐→快乐）。\n多音节：更多 + 形容词。\n书写规则：-e → + r（好→更好）；短重读音节：双（大→更大）； -y → ier（重→重）。\n不规则：好→更好，坏→更差，远→更远/更远，多/很多→更多\n比较级后 - 比：她比她姐姐高。",
    "formation": "更大、更有趣、更好、更差",
    "examples": [
      {
        "translation": "这部电影比那更有趣。"
      },
      {
        "translation": "今天比昨天更糟糕。"
      }
    ]
  },
  "en_a2_16": {
    "title": "形容词最高级",
    "shortExplanation": "最大的、最美的、最好的",
    "longExplanation": "单音节：+ -est。多音节：最。\n书写规则与比较级相同。\n不规则：好→最好，坏→最差，远→最远，多/很多→最\n⚠️总是用冠词the！最高级之后，通常是in或of：班级里最高的女孩。",
    "formation": "最大的、最美的、最好的",
    "examples": [
      {
        "translation": "这是城里最贵的餐厅。"
      },
      {
        "translation": "他是队里最好的球员。"
      }
    ]
  },
  "en_a2_17": {
    "title": "一些/任何 - 无限量",
    "shortExplanation": "我有一些钱。你有吗？我没有。",
    "longExplanation": "some - 在肯定句和提议/请求中。\nany - 在问题和否定中。\n例外：some 在我们期望得到肯定答案或提供某物时的问题中：你想喝点茶吗？我可以喝点水吗？",
    "formation": "我有一些钱。你有吗？我没有。",
    "examples": [
      {
        "translation": "我买了面包和牛奶。"
      },
      {
        "translation": "冰箱里有牛奶吗？"
      },
      {
        "translation": "我身上没带现金。"
      }
    ]
  },
  "en_a2_18": {
    "title": "much / many / a lot of / a few / a little",
    "shortExplanation": "很多水（不可数），很多人（可数），很多——到处",
    "longExplanation": "很多 - 不可数（很多水，很多时间，很多钱）。\n很多 - 可数（很多人，很多书，很多次）。\n很多/很多 - 两者都有，对话风格。\n一些 - 一点（可数，中性/积极）。\n很少 - 很少，几乎没有（可数，负）。\n一点 - 一点（不可数，中性）。\n一点 - 很少，几乎没有（不可数，负）。",
    "formation": "很多水（不可数），很多人（可数），很多——到处",
    "examples": [
      {
        "translation": "我没有太多时间。"
      },
      {
        "translation": "她在伦敦有几个朋友。"
      },
      {
        "translation": "还剩下一些糖。"
      }
    ]
  },
  "en_a2_19": {
    "title": "可数名词和不可数名词",
    "shortExplanation": "水、信息、建议 - 不允许：一水、两个建议",
    "longExplanation": "可数：可以数，有复数。 number：一本书，两本书。\n不可数：不能直接计数 - 没有复数。数字，没有不定冠词。\n典型的不可数词：水、牛奶、面包、大米、金钱、信息、建议、新闻、天气、行李、家具、头发、音乐、工作\n表示部分：一杯水、一条建议、一条面包、一袋米",
    "formation": "水、信息、建议 - 不允许：一水、两个建议",
    "examples": [
      {
        "translation": "我可以知道一些事情吗？"
      },
      {
        "translation": "她给了我非常有用的建议。"
      }
    ]
  },
  "en_a2_20": {
    "title": "介词 in / on / at 表示时间",
    "shortExplanation": "2024年3月，冬季； 6 月 5 日星期一；下午 3 点，晚上",
    "longExplanation": "在 → 确切时间：6 点、中午、午夜、晚上、周末（BrE）\n于 → 日期和日期：周一、3 月 5 日、我生日、元旦\n于 → 期间：2023 年 7 月、上午/下午/晚上，在夏天，在21世纪\n不带介词：这个/上一个/下一个+时间：今天早上，上周，明年",
    "formation": "2024年3月，冬季； 6 月 5 日星期一；下午 3 点，晚上",
    "examples": [
      {
        "translation": "四点半集合。"
      },
      {
        "translation": "她出生于4月12日。"
      },
      {
        "translation": "我十月份开始这项工作。"
      }
    ]
  },
  "en_a2_21": {
    "title": "for/since/ago - 持续时间和开始",
    "shortExplanation": "三年了，从2020年开始，三年前",
    "longExplanation": "持续 - 持续时间（多长时间）：两小时、一周、几年。用于不同的时态。\nsince - 初始时刻（since）：since Monday，since 2019，since I was a child。与现在完成时一起使用。\n前 - 从现在开始的时间：三天前，一个月前。仅限过去简单。",
    "formation": "三年了，从2020年开始，三年前",
    "examples": [
      {
        "translation": "我来这里已经六个月了。"
      },
      {
        "translation": "她自2020年以来一直在这里工作。"
      },
      {
        "translation": "两天前我见过他。"
      }
    ]
  },
  "en_a2_22": {
    "title": "尾部疑问：……不是吗？ / ...你？ / ...不是吗？",
    "shortExplanation": "天气很冷，不是吗？你喜欢爵士乐，不是吗？",
    "longExplanation": "标记疑问句用于确认或澄清。\n规则：肯定句→否定标记，反之亦然。\n尾部助动词=主句时态。\n语调：↘（落）=确认； ↗（上升）= 真正的问题。",
    "formation": "天气很冷，不是吗？你喜欢爵士乐，不是吗？",
    "examples": [
      {
        "translation": "美好的一天，对吧？"
      },
      {
        "translation": "你不喜欢恐怖片，是吗？"
      },
      {
        "translation": "她会游泳，不是吗？"
      }
    ]
  },
  "en_a2_23": {
    "title": "拥有 - 拥有（英国版）",
    "shortExplanation": "我有一辆车。你有笔吗？她没有时间。",
    "longExplanation": "have got 是英国口语中的占有形式。值 = 有。\n• 肯定：我有/我有一台笔记本电脑。\n• 否认：我没有/我没有\n• 问题：你有...吗？ / 你有...吗？\n⚠️ have got 仅用于现在时。对于过去 - 只有有。",
    "formation": "我有一辆车。你有笔吗？她没有时间。",
    "examples": [
      {
        "translation": "我有两个兄弟。"
      },
      {
        "translation": "你不知道现在几点了吗？"
      },
      {
        "translation": "她没有现金。"
      }
    ]
  },
  "en_a2_24": {
    "title": "方式副词：快速、仔细、好、硬、快",
    "shortExplanation": "她唱歌很美。他工作很努力。她开得很快。",
    "longExplanation": "大多数副词由形容词+-ly组成：quick→fastly，career→carely，slow→slowly。\n特殊情况：\n•good→well（不是goodly）\n•fast→fast（不是fastly）\n•hard→hard（不是几乎 - 这是另一个词：“勉强”）\n• 迟到→迟（不是最近 - 这是“最近”）\n地点：通常在动词/宾语之后：她英语说得很好。",
    "formation": "她唱歌很美。他工作很努力。她开得很快。",
    "examples": [
      {
        "translation": "他解释得很清楚。"
      },
      {
        "translation": "她跑得很快。"
      },
      {
        "translation": "他们辛苦工作了一整天。"
      }
    ]
  },
  "en_a2_25": {
    "title": "频率副词及其在句子中的位置",
    "shortExplanation": "总是、通常、经常、有时、很少、从不 - 在主要动词之前",
    "longExplanation": "频率副词：总是、通常、经常、有时、偶尔、很少、很少、从不。\n放在句子中：\n• 主要动词前：她总是喝茶。\n• 动词to be后：他总是迟到。\n• 助动词后：她从来没有去过意大利。\n另外：每天/每周、每周一次、每月两次 - 在句子末尾。",
    "formation": "总是、通常、经常、有时、很少、从不 - 在主要动词之前",
    "examples": [
      {
        "translation": "我通常7点起床。"
      },
      {
        "translation": "她上班从不迟到。"
      },
      {
        "translation": "他们每周见面一次。"
      }
    ]
  },
  "en_a2_26": {
    "title": "形容词在名词之前的顺序",
    "shortExplanation": "一个可爱的小旧红色意大利皮包",
    "longExplanation": "当几个形容词出现在名词前时，会遵守严格的顺序：意见 → 大小 → 年龄 → 形状 → 颜色 → 起源 → 材料 → 目的\n（意见 → 大小 → 年龄 → 形状 → 颜色 → 起源 → 材料 → 目的）\n示例：一个小而漂亮的旧方形棕色法式木制写字台",
    "formation": "一个可爱的小旧红色意大利皮包",
    "examples": [
      {
        "translation": "可爱的小旧小屋"
      },
      {
        "translation": "大红色意大利跑车"
      }
    ]
  },
  "en_b1_01": {
    "title": "现在完成时——形式和意义",
    "shortExplanation": "我已经看到了。她已经走了。他们已经到了。",
    "longExplanation": "现在完成 = have/has + V3（动词的第三种形式）。\n三个主要含义：\n1. 生活经历（未指定时间）：我去过东京。\n2。 目前的结果：我丢失了钥匙。（现在没有钥匙）\n3。 未完成的行动，正在进行中：她已经在这里住了 5 年了。\nV3 规则动词 = 一般过去时（工作、玩耍）。不正确的需要单独了解。",
    "formation": "我已经看到了。她已经走了。他们已经到了。",
    "examples": [
      {
        "translation": "你吃过寿司吗？"
      },
      {
        "translation": "我刚刚做完作业。"
      },
      {
        "translation": "她还没打电话。"
      }
    ]
  },
  "en_b1_02": {
    "title": "曾经/从未/已经/还/只是 - 现在完美标记",
    "shortExplanation": "你有没有...?我从来没有……我已经……还没有。我刚刚...",
    "longExplanation": "曾经 - 有一天（关于经验的问题）。位置：V3前面。\n从不 - 从不（负值）。位置：V3前面。\n已经 - 已经（比预期早）。放置：V3之前或末尾。\n但是 - 已经/还。在疑问（你完成了吗？）和否定（我还没完成）中。地点：句末。\n刚刚 - 就在现在。位置：V3前面。",
    "formation": "你有没有...?我从来没有……我已经……还没有。我刚刚...",
    "examples": [
      {
        "translation": "你去过苏格兰吗？"
      },
      {
        "translation": "我从来没有吃过蜗牛。"
      },
      {
        "translation": "我已经看过这部电影了。"
      }
    ]
  },
  "en_b1_03": {
    "title": "现在完成时与过去简单 - 主要区别",
    "shortExplanation": "我去过巴黎（经历） vs 我2019年去过巴黎（具体时间）",
    "longExplanation": "这是英语语法中最重要的差异之一。\n现在完成 - 与现在联系，不指示时间：\n我丢了钱包。（现在没有钱包 - 这很重要）\n简单过去时 - 完成的过去时，时间是指示或暗示的：\n我昨天丢了钱包。（昨天是特定时间）\n⚠️ 有特定的时间标记（昨天、上周、2020 年、之前）→ 仅过去简单！",
    "formation": "我去过巴黎（经历） vs 我2019年去过巴黎（具体时间）",
    "examples": [
      {
        "translation": "我认识了新导演。"
      },
      {
        "translation": "我上周二见过他。"
      }
    ]
  },
  "en_b1_04": {
    "title": "现在完成时与 for 和since",
    "shortExplanation": "自 2019 年以来，我已经在这里住了 5 年了。",
    "longExplanation": "持续 - 持续时间：两天、一年、很长一段时间、很多年\n自从 - 起点：从星期一开始，从我小时候开始，从 2015 年开始\n问题“多长时间？” — 多久了 + 现在完成时：你认识她多久了？",
    "formation": "自 2019 年以来，我已经在这里住了 5 年了。",
    "examples": [
      {
        "translation": "她已经在这里工作十年了。"
      },
      {
        "translation": "我从大学就认识他了。"
      }
    ]
  },
  "en_b1_05": {
    "title": "现在完成进行时：have was + V-ing",
    "shortExplanation": "我已经等了一个小时了。她一整天都在学习。",
    "longExplanation": "现在完成进行时 = 已经/已经 + V-ing\n强调行动的持续时间或不完整。回答“多长时间？”的问题\n经常解释当前可见的结果：你看起来很累 - 你跑步了吗？\n与现在完成简单的区别：\n• 我已经读了 50 页。 - 结果、完整性\n• 我整个晚上都在读书。 - 强调过程",
    "formation": "我已经等了一个小时了。她一整天都在学习。",
    "examples": [
      {
        "translation": "我已经学英语两年了。"
      },
      {
        "translation": "你的手为什么脏？ — 我正在修理汽车。"
      }
    ]
  },
  "en_b1_06": {
    "title": "过去进行时：was/were + V-ing",
    "shortExplanation": "我晚上八点在读书。他们整个晚上都在说话。",
    "longExplanation": "过去进行时 = was/were + V-ing\n价值观：\n1.过去某个特定时刻流程中的行动：晚上 9 点我正在吃晚饭。\n2。 后台活动被另一个打断：开始下雨时我正在散步。\n3。并行动作：当她做饭时，他在看电视。",
    "formation": "我晚上八点在读书。他们整个晚上都在说话。",
    "examples": [
      {
        "translation": "我离开家时正在下雨。"
      },
      {
        "translation": "昨天七点你在做什么？"
      }
    ]
  },
  "en_b1_07": {
    "title": "一般过去时与过去进行时 - 背景和事件",
    "shortExplanation": "当我做饭的时候，他打来电话。我正在散步，天开始下雨了。",
    "longExplanation": "典型设计：长背景动作（过去进行时）+短事件（过去简单）。\n工会：\n• 何时 - 与一般过去时一起用于该事件：闹钟响时她正在睡觉。\n• while/as - 与过去进行时一起使用作为背景：当我看电视时，电源熄灭了。",
    "formation": "当我做饭的时候，他打来电话。我正在散步，天开始下雨了。",
    "examples": [
      {
        "translation": "她正在洗澡，电话铃响了。"
      },
      {
        "translation": "当他演讲时，有人睡着了。"
      }
    ]
  },
  "en_b1_08": {
    "title": "类型0：如果+现在，现在-事实和法律",
    "shortExplanation": "如果将水加热到 100°C，它就会沸腾。",
    "longExplanation": "输入零——代表科学事实、自然法则、一般真理。这两个动作总是同时发生。\n形式：If + 现在简单，现在简单\n您可以使用when来代替if：当你混合红色和蓝色时，你会得到紫色。",
    "formation": "如果将水加热到 100°C，它就会沸腾。",
    "examples": [
      {
        "translation": "如果你加热冰，它就会融化。"
      },
      {
        "translation": "如果下雨，街道就会湿透。"
      }
    ]
  },
  "en_b1_09": {
    "title": "第一种：If + 现在简单，will - 真实的未来",
    "shortExplanation": "如果明天下雨，我就呆在家里。",
    "longExplanation": "未来真实的、可能发生的情况。\n形式：If + 一般现在时，will + 不定式\n⚠️ 在if部分 - NEVER Future！仅现在时简单。\n在主要部分中，您可以使用：can、may、might、should，而不是will。\n零件可以更换：如果下雨我会呆在家里。（不带逗号）",
    "formation": "如果明天下雨，我就呆在家里。",
    "examples": [
      {
        "translation": "如果她学习好，她就会通过考试。"
      },
      {
        "translation": "如果你需要帮助，我可以来。"
      }
    ]
  },
  "en_b1_10": {
    "title": "类型2：If + 一般过去时，would - 虚幻现在时",
    "shortExplanation": "如果我有车，我会开车去上班。如果我是你...",
    "longExplanation": "当前或将来不真实或不可能的情况。\n形式：If + 一般过去式，would + 不定式\n⚠️if部分的动词是一般过去时，但意思是现在/将来！\n⚠️ were 用于所有人：If I were you, If she were here 是正式的语言标准。",
    "formation": "如果我有车，我会开车去上班。如果我是你...",
    "examples": [
      {
        "translation": "如果我中了彩票，我就会环游世界。"
      },
      {
        "translation": "如果我长高一点，我就会打篮球。"
      }
    ]
  },
  "en_b1_11": {
    "title": "类型 1 与类型 2：真实与不可能",
    "shortExplanation": "如果我赢了（第一，真的） vs 如果我赢了（第二，不太可能）",
    "longExplanation": "类型的选择反映了您对现实情况的信心。\n• 如果我看到她（第一种类型）- 我希望见到她\n• 如果我看到她（第二种）- 不太可能，或者我只是在幻想\n这不是语法上的差异，而是说话者态度上的差异。",
    "formation": "如果我赢了（第一，真的） vs 如果我赢了（第二，不太可能）",
    "examples": [
      {
        "translation": "如果明天下雨，我就带伞。"
      },
      {
        "translation": "如果每天都下雨，我就会搬到西班牙。"
      }
    ]
  },
  "en_b1_12": {
    "title": "被动语态 - 现在简单: is/are + V3",
    "shortExplanation": "咖啡产于巴西。这辆车是德国制造的。",
    "longExplanation": "被动语态用于以下情况：\n• 行动本身很重要，而不是执行该行动的人\n• 表演者未知或明显\n形成现在简单被动：am/is/are + V3\n表演者（如果需要）添加了by：窗户被球打破了。",
    "formation": "咖啡产于巴西。这辆车是德国制造的。",
    "examples": [
      {
        "translation": "许多国家都使用英语。"
      },
      {
        "translation": "这封信是用法语写的。"
      }
    ]
  },
  "en_b1_13": {
    "title": "被动语态 - 过去简单: was/were + V3",
    "shortExplanation": "这座桥建于 1890 年。他们被捕了。",
    "longExplanation": "过去简单被动语态：was/were + V3\n• was - 单位。数量\n• were - 复数。数量\n主动 → 被动：有人偷了我的车。 → 我的车被偷了。",
    "formation": "这座桥建于 1890 年。他们被捕了。",
    "examples": [
      {
        "translation": "埃菲尔铁塔建于 1889 年。"
      },
      {
        "translation": "事故造成三人受伤。"
      }
    ]
  },
  "en_b1_14": {
    "title": "被动语态 - 现在完成时：已经/已经 + V3",
    "shortExplanation": "车已经修好了。所有邀请均已发送。",
    "longExplanation": "现在完成被动语态：已经/已经 + V3\n当当前的结果很重要时使用，而不是当它确切发生时使用。",
    "formation": "车已经修好了。所有邀请均已发送。",
    "examples": [
      {
        "translation": "该项目已完成。"
      },
      {
        "translation": "所有客人均已收到通知。"
      }
    ]
  },
  "en_b1_15": {
    "title": "报告演讲-时移",
    "shortExplanation": "“我累了。” → 他说他累了。",
    "longExplanation": "当翻译成间接引语时，时态会“转移”回来：\n• 现在简单→过去简单：“我工作”→他说他工作\n• 过去简单→过去完成时：“我去了”→她说她走了\n• 现在完成时 → 过去完成时：“我见过”→ 他说他见过\n• 将 → 将；可以 → 可以；是 → 是；我要去 → 要去",
    "formation": "“我累了。” → 他说他累了。",
    "examples": [
      {
        "translation": "她说她要走了。"
      },
      {
        "translation": "他说他不能来。"
      }
    ]
  },
  "en_b1_16": {
    "title": "报告问题 - 间接问题",
    "shortExplanation": "“你住在哪里？” → 她问我住在哪里。",
    "longExplanation": "在间接疑问句中：\n1. 无倒装（词序与声明中相同）\n2。 没有辅助 do/did\n3。一般问题（是/否）→如果/是否+主语+动词",
    "formation": "“你住在哪里？” → 她问我住在哪里。",
    "examples": [
      {
        "translation": "她问我在哪里工作。"
      },
      {
        "translation": "他想知道我是否已婚。"
      }
    ]
  },
  "en_b1_17": {
    "title": "间接引语中的说与说",
    "shortExplanation": "他说.../他告诉我...-在告诉我你需要一张脸之后！",
    "longExplanation": "说 - 没有必要的补充：她说她累了。\n告诉 - 总是加上一个补充（告诉谁）：她告诉我她累了。\n❌他说他迟到了。 ✓ 他说他迟到了。",
    "formation": "他说.../他告诉我...-在告诉我你需要一张脸之后！",
    "examples": [
      {
        "translation": "她说她需要帮助。"
      },
      {
        "translation": "他通知我们会议取消了。"
      }
    ]
  },
  "en_b1_18": {
    "title": "动词 + 动名词 (V-ing)",
    "shortExplanation": "我喜欢读书。她写完了。他避免犯错误。",
    "longExplanation": "这些动词后面需要加动名词 (V-ing)：\n享受、完成、避免、介意、建议、保留、考虑、否认、想象、错过、实践、冒险、承认、延迟、不喜欢、幻想、放弃、参与、推迟、推荐、抵制\n记忆技巧：如果你能用“process”代替它，它很可能是一个动名词。",
    "formation": "我喜欢读书。她写完了。他避免犯错误。",
    "examples": [
      {
        "translation": "我喜欢在海里游泳。"
      },
      {
        "translation": "她正在考虑移居国外。"
      },
      {
        "translation": "他避免目光接触。"
      }
    ]
  },
  "en_b1_19": {
    "title": "动词 + 不定式 (to + V)",
    "shortExplanation": "我想去。她决定留下来。他设法完成了。",
    "longExplanation": "这些动词需要带 to 的不定式：\n想要、决定、希望、计划、管理、同意、承诺、拒绝、失败、期望、提供、学习、需要、负担、安排、尝试、选择、主张、要求、应得、帮助、假装、倾向、威胁",
    "formation": "我想去。她决定留下来。他设法完成了。",
    "examples": [
      {
        "translation": "她决定退出。"
      },
      {
        "translation": "希望很快能见到你。"
      },
      {
        "translation": "他无法回答。"
      }
    ]
  },
  "en_b1_20": {
    "title": "两者兼有的动词（喜欢、爱、恨、开始、开始）",
    "shortExplanation": "我喜欢读书=我喜欢读书-略有不同",
    "longExplanation": "在喜欢/喜欢/讨厌/喜欢之后，两种选择都是可能的：\n• V-ing - 我们从整体上讨论行动：我喜欢烹饪。（我通常喜欢烹饪）\n• to-inf - 我们正在讨论一个具体案例：我今晚想做饭。\n在开始/开始/继续/停止之后几乎没有区别。",
    "formation": "我喜欢读书=我喜欢读书-略有不同",
    "examples": [
      {
        "translation": "我喜欢旅行。"
      },
      {
        "translation": "她五月份开始在这里工作。"
      }
    ]
  },
  "en_b1_21": {
    "title": "过去的习惯和状态",
    "shortExplanation": "我以前踢足球。她曾经留着长发。",
    "longExplanation": "曾经 - 过去已经停止的常规行为或情况。\n形式：used to + 不定式\n否认：没用过\n问题：您曾经...吗？\n⚠️ 没有现在时形式！你不能：我目前使用。\n与习惯于的区别：我习惯早起 = 我已经习惯了（现在）。",
    "formation": "我以前踢足球。她曾经留着长发。",
    "examples": [
      {
        "translation": "我以前也抽烟，但后来戒了。"
      },
      {
        "translation": "您以前演奏过乐器吗？"
      }
    ]
  },
  "en_b1_22": {
    "title": "关系从句：who、which、that、where、whose",
    "shortExplanation": "那个打电话的人。我读过的书。我们相遇的地方。",
    "longExplanation": "谁 - 对于人：打电话的女人是我的妹妹。\n其中 - 对于物体和动物：我借的书很棒。\nthat - 用于人和物体（在定义子句中）：他买的汽车是新的。\nwhere - 地点：我们见面的咖啡馆关门了。\n谁的 - 配件：包被偷的女孩...\n在口语中，如果代词是宾语，则通常会被省略：我看过的电影...",
    "formation": "那个打电话的人。我读过的书。我们相遇的地方。",
    "examples": [
      {
        "translation": "住在隔壁的那个人非常友好。"
      },
      {
        "translation": "我们住的酒店有游泳池。"
      }
    ]
  },
  "en_b1_23": {
    "title": "对比连词：尽管、然而、尽管、尽管、而",
    "shortExplanation": "尽管下着雨，我们还是出去了。尽管下雨，我们还是去了。",
    "longExplanation": "尽管/即使/尽管 + 从句。\n尽管/尽管 + 名词/动名词（不是从句！）。\n但是 + 新句子（句号或分号之后）。\n而是两个事实之间的对比。",
    "formation": "尽管下着雨，我们还是出去了。尽管下雨，我们还是去了。",
    "examples": [
      {
        "translation": "尽管很累，她还是继续工作。"
      },
      {
        "translation": "尽管下雨，他还是骑自行车去上班。"
      },
      {
        "translation": "价格很贵。尽管如此，这是值得的。"
      }
    ]
  },
  "en_b1_24": {
    "title": "将来进行时：will be + V-ing",
    "shortExplanation": "我明天九点上班。她将飞越大西洋。",
    "longExplanation": "未来连续 = 将是 + V-ing\n价值观：\n1.将在未来某个特定时刻正在进行的动作：明天这个时候，我将躺在海滩上。\n2。未来计划的、预期的行动（事件的自然进程）：无论如何我明天都会见到她。\n3。关于计划的礼貌问题（无压力）：你会来参加聚会吗？",
    "formation": "我明天九点上班。她将飞越大西洋。",
    "examples": [
      {
        "translation": "八点别打电话——我去吃晚饭。"
      },
      {
        "translation": "下周的这个时候我将坐在海滩上。"
      }
    ]
  },
  "en_b1_25": {
    "title": "未来完美：将有+V3",
    "shortExplanation": "到周五我就会完成报告。到 2030 年，他们将建成这座桥。",
    "longExplanation": "未来完美 = 将有+ V3\n将在未来某个时间点之前完成的操作。\n经常与按（时间）、之前连用：By the time youarriage, I'll have煮熟的晚餐。",
    "formation": "到周五我就会完成报告。到 2030 年，他们将建成这座桥。",
    "examples": [
      {
        "translation": "我将在周日之前读完这本书。"
      },
      {
        "translation": "到 2050 年，科学家将找到治疗方法。"
      }
    ]
  },
  "en_b1_26": {
    "title": "次要目标：为了、为了、以便、以便",
    "shortExplanation": "我努力学习才能通过。她很早就出发了，以便能赶上火车。",
    "longExplanation": "为了/为了 + 不定式 - 目标。 为了和以便更正式一些。\nso + 主语 + 动词 - 与另一个主语或情态动词一起表达目的。\n⚠️否认：为了不/所以不（不是不）。",
    "formation": "我努力学习才能通过。她很早就出发了，以便能赶上火车。",
    "examples": [
      {
        "translation": "她努力学习以获得奖学金。"
      },
      {
        "translation": "他很早就出发赶末班车了。"
      }
    ]
  },
  "en_b1_27": {
    "title": "短语动词 - 基本",
    "shortExplanation": "放弃、查找、关闭、找出、继续、推迟、继续",
    "longExplanation": "短语动词 = 动词 + 助词（介词或副词）。其含义通常是惯用的。\n最常见的：\n• 放弃 = 放弃，放弃\n• 找出 = 找出，找出\n• 打开/关闭 = 打开/关闭\n• 查找 = 查找（在字典/互联网中）\n• 照顾 = 保重\n• 推迟 = 推迟\n• 继续 = 继续\n• get on/along =（与某人）相处\n• 抚养 = 教育；提出话题\n• 遇到 = 偶然发现",
    "formation": "放弃、查找、关闭、找出、继续、推迟、继续",
    "examples": [
      {
        "translation": "我戒烟了。"
      },
      {
        "translation": "我不在的时候你能照顾一下我的猫吗？"
      },
      {
        "translation": "我们需要找出发生了什么。"
      }
    ]
  },
  "en_b2_01": {
    "title": "过去完成时: had + V3",
    "shortExplanation": "当她到达时，他已经离开了。",
    "longExplanation": "过去完成时 - 在过去的另一个时刻或事件之前完成的动作。\n形式：所有面had + V3。\n否定：没有 + V3\n问题：有 + 主题 + V3？\n典型连词：before、after、when、by the time、already、just、never",
    "formation": "当她到达时，他已经离开了。",
    "examples": [
      {
        "translation": "当我到达时，她已经离开了。"
      },
      {
        "translation": "那年冬天之前他从未见过雪。"
      }
    ]
  },
  "en_b2_02": {
    "title": "过去完成进行时：had was + V-ing",
    "shortExplanation": "当她到达时，他已经等了两个小时了。",
    "longExplanation": "过去完成进行时 = had was + V-ing\n强调过去另一点之前发生的动作的持续时间。\n经常解释过去的原因或可见的结果。",
    "formation": "当她到达时，他已经等了两个小时了。",
    "examples": [
      {
        "translation": "她已经筋疲力尽了——她工作了一整夜。"
      },
      {
        "translation": "她来之前你等了多久？"
      }
    ]
  },
  "en_b2_03": {
    "title": "必须有 + V3 - 对过去的自信结论",
    "shortExplanation": "她肯定忘记了。 - 我确信这是唯一的解释",
    "longExplanation": "必须有 + V3 = 我确定这发生了（唯一合乎逻辑的解释）。\n置信度：\n• 一定已经完成了 - 几乎肯定发生了\n• 应该完成 - 预计会发生\n• 可能/可能已经完成 - 它可能已经发生\n• 不可能完成 - 它可能没有发生",
    "formation": "她肯定忘记了。 - 我确信这是唯一的解释",
    "examples": [
      {
        "translation": "这次旅行之后你一定很累了。"
      },
      {
        "translation": "她显然很早就离开了——她的外套不见了。"
      }
    ]
  },
  "en_b2_04": {
    "title": "不能拥有 + V3 - 过去不可能",
    "shortExplanation": "她不可能这么说！他不可能在那儿。",
    "longExplanation": "不能有 + V3 = 我确信这没有发生（这是不可能的）。\n与相反的事情一定已经完成了。",
    "formation": "她不可能这么说！他不可能在那儿。",
    "examples": [
      {
        "translation": "他看不到她——她在国外。"
      },
      {
        "translation": "这不可能是正确的地址。"
      }
    ]
  },
  "en_b2_05": {
    "title": "应该有+V3——责备和遗憾",
    "shortExplanation": "我应该打电话的。你不应该这么说。",
    "longExplanation": "应该有 + V3 = 这样做是正确的，但我没有（遗憾，责备）。\n不应该 + V3 = 不应该这样做。\n这是表达遗憾和批评的一种非常常见的结构。",
    "formation": "我应该打电话的。你不应该这么说。",
    "examples": [
      {
        "translation": "我应该带把伞的。"
      },
      {
        "translation": "她不应该告诉他这个秘密。"
      }
    ]
  },
  "en_b2_06": {
    "title": "might / might have + V3 - 过去的可能性",
    "shortExplanation": "她可能已经忘记了。情况可能会更糟。",
    "longExplanation": "可能/可能有 + V3 = 这可能已经发生（我们不确定）。\n另外：本来可以做到 =本来可以做到（但没有）：如果我更加努力，我就可以获胜。",
    "formation": "她可能已经忘记了。情况可能会更糟。",
    "examples": [
      {
        "translation": "也许她忘记了这次会议。"
      },
      {
        "translation": "他本来可以从后门出去的。"
      }
    ]
  },
  "en_b2_07": {
    "title": "第三种条件句：If + 过去完成时，would have + V3",
    "shortExplanation": "如果我更努力地学习，我就会通过。",
    "longExplanation": "过去的不真实情况——我们正在谈论一些没有发生过的事情。\n形式：If + 过去完成时，会有 + V3\n这两个元素都是不真实的：\n• 不满足条件\n•也没有结果",
    "formation": "如果我更努力地学习，我就会通过。",
    "examples": [
      {
        "translation": "如果她吃了药，就会好起来。"
      },
      {
        "translation": "如果不是他走得早，他早就遇见了她。"
      }
    ]
  },
  "en_b2_08": {
    "title": "混合条件句",
    "shortExplanation": "如果我学过的话，我现在就能说得流利了。 （过去→现在）",
    "longExplanation": "混合条件连接不同的时间计划：\n1。 过去的情况→现在的结果：\nIf + 过去完成时、would + 不定式\n如果我接受了那份工作，我现在就会在纽约。\n2。 当前状况 → 过去结果：\n如果+过去简单，就会+V3\n如果她再小心一些，就不会弄坏它了。",
    "formation": "如果我学过的话，我现在就能说得流利了。 （过去→现在）",
    "examples": [
      {
        "translation": "如果我学习成为一名医生，我现在就会成为一名医生。"
      }
    ]
  },
  "en_b2_09": {
    "title": "未来被动语态和带有情态动词的被动语态",
    "shortExplanation": "它将完成。它必须被修复。应该检查一下。",
    "longExplanation": "情态 + 被动：情态 + be + V3\n• 将完成 - 将完成\n• 必须完成 - 必须完成\n• 应该完成 - 应该完成\n• 可以做到 - 可以做到",
    "formation": "它将完成。它必须被修复。应该检查一下。",
    "examples": [
      {
        "translation": "该报告将于明天发布。"
      },
      {
        "translation": "这个错误必须立即纠正。"
      }
    ]
  },
  "en_b2_10": {
    "title": "使役有/得到：做了某事",
    "shortExplanation": "我剪了头发。她把车修好了。",
    "longExplanation": "拥有/获取 + 对象 + V3 - 您订购服务或某人为您做某事。\n比较：\n• 我剪了头发。 - 我自己剪了头发（这并不典型）\n• 我剪了头发。 - 由美发师剪的\nget 更加会话化一点，have 更加正式一点。",
    "formation": "我剪了头发。她把车修好了。",
    "examples": [
      {
        "translation": "我需要让医生检查我的牙齿。"
      },
      {
        "translation": "去年春天，她粉刷了房子（雇用工人）。"
      }
    ]
  },
  "en_b2_11": {
    "title": "被动报告动词：据说.../他被认为...",
    "shortExplanation": "人们认为价格将会上涨。众所周知，她很诚实。",
    "longExplanation": "动词说、思考、相信、报告、知道、期望、考虑的两种构造选项：\n1。 It + 被动语态 + that + 从句： It is believe that...\n2。 主语+ is + V3 + to-不定式：她被认为是...\n用于新闻和官方文本。",
    "formation": "人们认为价格将会上涨。众所周知，她很诚实。",
    "examples": [
      {
        "translation": "据报道，三人受伤。"
      },
      {
        "translation": "据信他已离开该国。"
      }
    ]
  },
  "en_b2_12": {
    "title": "记住/忘记 + V-ing 与 to-inf - 含义差异",
    "shortExplanation": "我记得锁定它（过去的事实）与记住锁定它（任务）",
    "longExplanation": "记住/忘记 + V-ing - 关于我们记住/忘记的过去事件。\n记住/忘记+ to-inf - 关于任务：记住将来要做的事情。",
    "formation": "我记得锁定它（过去的事实）与记住锁定它（任务）",
    "examples": [
      {
        "translation": "我记得在一次会议上见过她。"
      },
      {
        "translation": "别忘了给你妈妈打电话！"
      },
      {
        "translation": "我忘记买牛奶了。"
      }
    ]
  },
  "en_b2_13": {
    "title": "停止/后悔/平均值+V-ing vs to-inf",
    "shortExplanation": "她停止吸烟 vs 她停止吸烟",
    "longExplanation": "stop + V-ing - 停止动作。\nstop + to-inf - 停止做其他事情。\nregret + V-ing - 对过去感到遗憾。\nregret + to-inf - 遗憾地通知您（正式）：我遗憾地通知您...\n意思是 + V-ing - 意思是：这意味着更加努力。\nmean + to-inf - 意图：我想给你打电话。",
    "formation": "她停止吸烟 vs 她停止吸烟",
    "examples": [
      {
        "translation": "他去年戒烟了。"
      },
      {
        "translation": "她停下来欣赏风景。"
      }
    ]
  },
  "en_b2_14": {
    "title": "Wish + 一般过去时 - 改变现在的愿望",
    "shortExplanation": "我希望我知道答案。我希望我有更多的时间。",
    "longExplanation": "wish + Past Simple - 关于当前不切实际的愿望。\n形式与第二类条件句相同。对于to be - were（正式），尽管也使用was。",
    "formation": "我希望我知道答案。我希望我有更多的时间。",
    "examples": [
      {
        "translation": "遗憾的是我英语说得不好。"
      },
      {
        "translation": "她想生活在一个温暖的国家。"
      }
    ]
  },
  "en_b2_15": {
    "title": "愿望 + 过去完成时 - 对过去的遗憾",
    "shortExplanation": "我希望我能更努力地学习。我希望我没有这么说过。",
    "longExplanation": "愿望 + 过去完成时 - 对无法改变的过去事件感到遗憾。形式与第三种条件句相同。",
    "formation": "我希望我能更努力地学习。我希望我没有这么说过。",
    "examples": [
      {
        "translation": "可惜我吃了这么多。"
      },
      {
        "translation": "她希望自己接受了这份工作机会。"
      }
    ]
  },
  "en_b2_16": {
    "title": "Wish + Will - 渴望改变别人的行为",
    "shortExplanation": "我希望你别再说话了。我希望它能变暖。",
    "longExplanation": "希望 + 会 - 由于别人的行为或渴望改变情况而感到恼火。\n⚠️ 你不能使用关于你自己的内容：我希望我会 - 只能关于其他人或天气/情况。",
    "formation": "我希望你别再说话了。我希望它能变暖。",
    "examples": [
      {
        "translation": "我希望你能听我说。"
      },
      {
        "translation": "我希望雨快点停。"
      }
    ]
  },
  "en_b2_17": {
    "title": "定义性从句与非定义性从句",
    "shortExplanation": "打电话的人（确定哪一个）与打电话的我兄弟（添加信息）",
    "longExplanation": "定义（定义）：不带逗号 - 他们澄清他们在谈论谁/什么。代词可以替换为that。它不能在不失去意义的情况下被删除。\n非定义：用逗号 - 添加信息而不改变含义。  不能使用。可以去除。\n⚠️ which在非限定词中可以指整个句子：她通过了考试，这让所有人都感到惊讶。",
    "formation": "打电话的人（确定哪一个）与打电话的我兄弟（添加信息）",
    "examples": [
      {
        "translation": "我告诉过你的电影今晚上映。"
      },
      {
        "translation": "我住在巴黎的姐姐将于下周抵达。"
      }
    ]
  },
  "en_b2_18": {
    "title": "关系从句中的介词",
    "shortExplanation": "与我一起工作的人/与我一起工作的人（正式）",
    "longExplanation": "在口语中，介词出现在结尾：我长大的房子。\n在书面/正式演讲中，which/whom之前的介词：我长大的房子。\n介词后 - 仅which（用于事物）和whom（用于人）。从来没有那样！",
    "formation": "与我一起工作的人/与我一起工作的人（正式）",
    "examples": [
      {
        "translation": "我正在从事的项目非常有趣。"
      },
      {
        "translation": ""
      }
    ]
  },
  "en_b2_19": {
    "title": "结果连词：so...that、such...that、因此、结果",
    "shortExplanation": "天气太冷了，我们就呆在里面。她工作努力；因此，她通过了。",
    "longExplanation": "so + 形容词/副词 + that：他说得太快了，没人听懂。\nsuch + (a/an) + 形容词 + 名词 + that：电影太长了，我睡着了。\n结果的连接词（句子之间）：因此、因此、作为结果、因此、因此。",
    "formation": "天气太冷了，我们就呆在里面。她工作努力；因此，她通过了。",
    "examples": [
      {
        "translation": "这本书太好了，我看了两遍。"
      },
      {
        "translation": "她错过了最后期限；结果，她失去了合同。"
      }
    ]
  },
  "en_b2_20": {
    "title": "习惯/习惯+V-ing - 习惯（真实）",
    "shortExplanation": "我习惯早起。她已经习惯寒冷了。",
    "longExplanation": "beused to + V-ing /名词 = to beused to（已经习惯了）。\n习惯+ V-ing /名词 = 习惯（习惯的过程）。\n⚠️不要与used to +不定式（过去的习惯）混淆。\n• 我曾经住在巴黎。 - 曾经住过（不再）\n• 我习惯了生活在大城市。 - 习惯了生活在大城市",
    "formation": "我习惯早起。她已经习惯寒冷了。",
    "examples": [
      {
        "translation": "我不习惯起这么早。"
      },
      {
        "translation": "虽然花了一些时间，但她还是习惯了新系统。"
      }
    ]
  },
  "en_b2_21": {
    "title": "过去的未来：会/将会",
    "shortExplanation": "她说她会打电话。他正要离开。",
    "longExplanation": "过去的未来 - 从过去的角度表达未来的结构。用于间接引语和叙述。\n• would + V（来自遗嘱）：她说她会来。\n• 曾经/我们要去+V：他本来要打电话但是忘记了。\n• 正要+V：他到达时她正要离开。",
    "formation": "她说她会打电话。他正要离开。",
    "examples": [
      {
        "translation": "她答应她会来。"
      },
      {
        "translation": "他正要离开，她打电话来了。"
      }
    ]
  },
  "en_b2_22": {
    "title": "be to - 正式任命和命令",
    "shortExplanation": "你要在周一之前报告。他们再也不会见面了。",
    "longExplanation": "be to + 不定式 - 官方命令、计划中的事件和叙述中的命运。\n1。法律指示：乘客应保持座位。\n2。官方计划：峰会将于下个月举行。\n3。叙述中的命运：他们再也没有见面。",
    "formation": "你要在周一之前报告。他们再也不会见面了。",
    "examples": [
      {
        "translation": "您必须在周五之前提交报告。"
      },
      {
        "translation": "她注定会成为最伟大的科学家之一。"
      }
    ]
  },
  "en_b2_23": {
    "title": "应该——道德义务和逻辑期望",
    "shortExplanation": "你应该道歉。她应该告诉我们的。",
    "longExplanation": "应该是一种道德义务或逻辑期望。 应该更强。\n始终使用to：应该去（而不是应该）。\n对于过去：应该有+ V3 - 责备或遗憾。",
    "formation": "你应该道歉。她应该告诉我们的。",
    "examples": [
      {
        "translation": "你应该为你所说的话道歉。"
      },
      {
        "translation": "她应该早点告诉我们。"
      }
    ]
  },
  "en_b2_24": {
    "title": "need - 情态动词和规则动词",
    "shortExplanation": "你不用担心。 / 她不需要来。",
    "longExplanation": "需要作为情态动词（正式，在疑问句/否定句中）和常规动词。\n模态（不带 -s，不带 to）：\n• 你不用担心。 / 需要我解释吗？\n常规需要 + ：\n• 她不需要来。",
    "formation": "你不用担心。 / 她不需要来。",
    "examples": [
      {
        "translation": "您无需填写这两个表格。"
      },
      {
        "translation": "她不必参加每次会议。"
      }
    ]
  },
  "en_b2_25": {
    "title": "敢——勇气和挑战",
    "shortExplanation": "你怎么敢！我不敢问。她敢于挑战他。",
    "longExplanation": "敢 - 敢，敢。反问句和否定句中的情态。\n莫代尔：你怎么敢！ / 我不敢问。 /我敢说...\n正常：她不敢看。 / 他敢于挑战老大。\n⚠️我敢说=也许，可能（稳定表达）。",
    "formation": "你怎么敢！我不敢问。她敢于挑战他。",
    "examples": [
      {
        "translation": "你竟敢这样对我说话！"
      },
      {
        "translation": "她敢于公开表达自己的意见。"
      }
    ]
  },
  "en_b2_26": {
    "title": "反身代词：我自己、你自己、他自己……",
    "shortExplanation": "我伤害了自己。她自己做的。他们玩得很开心。",
    "longExplanation": "我自己，你自己，你自己，你自己，你自己，你自己，你自己，你自己。\n1。动作针对主体：他割伤了自己。\n2。强调（你自己，没有帮助）：我自己做的。\n稳定：我自己 = 单独； 自助=自助。",
    "formation": "我伤害了自己。她自己做的。他们玩得很开心。",
    "examples": [
      {
        "translation": "她自学弹吉他。"
      },
      {
        "translation": "机器自动关闭。"
      }
    ]
  },
  "en_b2_27": {
    "title": "集体名词：团队、家庭、委员会……",
    "shortExplanation": "球队踢得很好。 (BrE) / 球队正在比赛。 (AmE)",
    "longExplanation": "集体名词是一个整体。\n• BrE：通常是复数。 number：球队正在比赛。\n• AmE：通常为单位。 number：球队正在比赛。\n常见：团队、家庭、政府、委员会、工作人员、观众、工作人员、警察、军队、公众、管理层",
    "formation": "球队踢得很好。 (BrE) / 球队正在比赛。 (AmE)",
    "examples": [
      {
        "translation": "政府宣布了新措施。"
      },
      {
        "translation": "观众们跳了起来。"
      }
    ]
  },
  "en_b2_28": {
    "title": "分数和数学",
    "shortExplanation": "二分之一、四分之三、5.7 = 五点七、25%",
    "longExplanation": "分数：½ = 二分之一； ⅓=三分之一； ¼ = 四分之一； 3/4 = 四分之三； ⅔ = 三分之二。\n分子是定量的，分母是序数（如果分子> 1则为复数）。\n小数：句点（不是逗号）：3.14 = 三点一四。\n数学：+ = 加； - = 减； × = 次； ÷ = 除以； = = 等于。",
    "formation": "二分之一、四分之三、5.7 = 五点七、25%",
    "examples": [
      {
        "translation": "四分之三的学生通过了考试。"
      },
      {
        "translation": "通货膨胀率降至2.5%。"
      }
    ]
  },
  "en_b2_29": {
    "title": "副词的比较级",
    "shortExplanation": "更快、更仔细、最好、更差、更远",
    "longExplanation": "副词根据与形容词相同的规则形成比较级。\n• 单音节：+er/est：快→更快，硬→硬，早→早\n• 最-ly：更多/最：仔细→更仔细→最仔细\n• 错误：好→更好→最好，差→更差→最差，远→更远→最远，小→少→最少，多→更多→最多",
    "formation": "更快、更仔细、最好、更差、更远",
    "examples": [
      {
        "translation": "她说话比以前更加自信了。"
      },
      {
        "translation": "他比团队中的任何人都更加努力。"
      }
    ]
  },
  "en_c1_01": {
    "title": "否定副词的倒装",
    "shortExplanation": "我从来没有见过这个。她很少抱怨。",
    "longExplanation": "为了强调，否定副词/表达被放置在开头 → 助动词主语之前（词序如问题中）。\n引发倒装的单词：从不、很少、很少、很少、几乎、几乎、勉强、不仅、仅、不久",
    "formation": "我从来没有见过这个。她很少抱怨。",
    "examples": [
      {
        "translation": "我从来没有见过如此美丽的东西。"
      },
      {
        "translation": "她很少犯错误。"
      },
      {
        "translation": "我不知道等待我的是什么。"
      }
    ]
  },
  "en_c1_02": {
    "title": "不仅...而且还有反转",
    "shortExplanation": "他不仅道歉，还主动提出提供帮助。",
    "longExplanation": "不仅第一部分有+反转，第二部分也是通常的顺序。\n用于强调：表示某事比预期更进一步。",
    "formation": "他不仅道歉，还主动提出提供帮助。",
    "examples": [
      {
        "translation": "她不仅才华横溢，而且非常努力。"
      },
      {
        "translation": "他们不仅迟到了，还忘记了证件。"
      }
    ]
  },
  "en_c1_03": {
    "title": "几乎/几乎/不久+反转",
    "shortExplanation": "我刚坐下，电话就响了。",
    "longExplanation": "立即数序列构造：\n• 几乎/很少 + had + 主语 + V3 + 当/之前 + 一般过去时\n• + had + subject + V3 + 不久于+过去简单",
    "formation": "我刚坐下，电话就响了。",
    "examples": [
      {
        "translation": "她刚到就下雨了。"
      },
      {
        "translation": "我刚坐下，就有人敲门。"
      }
    ]
  },
  "en_c1_04": {
    "title": "条件句中的倒装：Had / Were / Should",
    "shortExplanation": "如果我知道（=如果我知道）。我是你吗（=如果我是你）。",
    "longExplanation": "正式风格 - 排除 if，使用反转：\n• Had + 主语 + V3 = If + 过去完成时（第三种类型）\n• Were + 主语（+ to + 不定式） = If + 一般过去时（第二种类型）\n• Should + 主语 + 不定式 = If（不太可能，输入 1）",
    "formation": "如果我知道（=如果我知道）。我是你吗（=如果我是你）。",
    "examples": [
      {
        "translation": "如果她告诉我，我就会帮忙。"
      },
      {
        "translation": "如果我是你，我就会同意。"
      },
      {
        "translation": "如果您需要帮助，请致电我们。"
      }
    ]
  },
  "en_c1_05": {
    "title": "它-裂口：是约翰打来的。",
    "shortExplanation": "突出显示句子的任何成员",
    "longExplanation": "结构：It + to be + 所选元素 + who/that/which + rest\n将注意力焦点转移到突出显示的元素上。\n• 对于人 - 谁；对于事物/情况 - 那个/哪个。",
    "formation": "突出显示句子的任何成员",
    "examples": [
      {
        "translation": "是噪音把我吵醒了。"
      },
      {
        "translation": "艰苦的工作才能带来成功。"
      }
    ]
  },
  "en_c1_06": {
    "title": "Wh-cleft：令我惊讶的是价格。",
    "shortExplanation": "我需要的是休息。她的话让所有人都震惊了。",
    "longExplanation": "结构：What + 从句 + to be + 突出显示的元素\n强调最后引入的元素的重要性。",
    "formation": "我需要的是休息。她的话让所有人都震惊了。",
    "examples": [
      {
        "translation": "我最喜欢伦敦的一点是它的多样性。"
      },
      {
        "translation": "他的所作所为完全出乎他的意料。"
      }
    ]
  },
  "en_c1_07": {
    "title": "要求动词后的正式虚拟语气",
    "shortExplanation": "我建议他离开。让她了解情况至关重要。",
    "longExplanation": "在建议、推荐、坚持、要求、提议、请求、要求、询问、建议、命令 + that 之后 - 用于所有人的动词的基本形式（不带-s、不带was）。\n英国版本经常使用应该代替虚拟语气：我建议他应该离开。\n美国语 - 通常是纯粹的虚拟语气。",
    "formation": "我建议他离开。让她了解情况至关重要。",
    "examples": [
      {
        "translation": "我建议他去看医生。"
      },
      {
        "translation": "所有学生都必须参加会议。"
      }
    ]
  },
  "en_c1_08": {
    "title": "是时候了+过去简单时",
    "shortExplanation": "你该睡觉了。我们是时候离开了。",
    "longExplanation": "这是（高/大约）时间 + 主题 + 一般过去时\n含义：现在/未来 - 我们正在谈论很久以前就应该做的事情。\n时间到了 - 更强烈的是：时间到了！",
    "formation": "你该睡觉了。我们是时候离开了。",
    "examples": [
      {
        "translation": "现在是她找到新工作的时候了。"
      },
      {
        "translation": "是时候道歉了。"
      }
    ]
  },
  "en_c1_09": {
    "title": "好像 / 好像 + 虚拟语气",
    "shortExplanation": "她说得好像她什么都知道一样。他看上去就像见了鬼一样。",
    "longExplanation": "as if / as if + Past Simple在现在是一个不切实际的比较。\nas if / as if +过去完成时是对过去的不切实际的比较。",
    "formation": "她说得好像她什么都知道一样。他看上去就像见了鬼一样。",
    "examples": [
      {
        "translation": "他花钱就像百万富翁一样。"
      },
      {
        "translation": "她说话的语气就好像她以前见过他一样。"
      }
    ]
  },
  "en_c1_10": {
    "title": "所以 / 都不 + 助动词 + 主语",
    "shortExplanation": "我也是，她也一样。我也是。",
    "longExplanation": "So + 辅助 + 主语 - 同意肯定句。\n既不/也不+辅助+主语 - 同意否定。\n助动词必须与原句时态一致。",
    "formation": "我也是，她也一样。我也是。",
    "examples": [
      {
        "translation": "我喜欢爵士乐。她也是。"
      },
      {
        "translation": "我没去过罗马。我也是。"
      }
    ]
  },
  "en_c1_11": {
    "title": "我想是这样/我希望如此/恐怕是这样",
    "shortExplanation": "会下雨吗？ - 我想是的。 / 我希望不会。",
    "longExplanation": "so 替换以下从句：认为、希望、假设、期望、相信、想象、害怕。\n否定形式：not（not so not！）。",
    "formation": "会下雨吗？ - 我想是的。 / 我希望不会。",
    "examples": [
      {
        "translation": "他会来吗？ - 我想是的。 / 别想。"
      },
      {
        "translation": "贵吗？ - 恐怕是这样。"
      },
      {
        "translation": "关门了？ - 我希望不会。"
      }
    ]
  },
  "en_c1_12": {
    "title": "包容性条款与非包容性条款",
    "shortExplanation": "打电话的人是我的兄弟。 VS 打电话给我的兄弟是一名医生。",
    "longExplanation": "定义：指定我们正在谈论的人/事 - 不带逗号。 这是可能的。如果代词是宾语，则可以省略。\n非定义：添加信息 - 需要逗号。只有谁/哪个（不是那个！）。代词不能省略。",
    "formation": "打电话的人是我的兄弟。 VS 打电话给我的兄弟是一名医生。",
    "examples": [
      {
        "translation": "获得奥斯卡奖的这部电影很棒。"
      },
      {
        "translation": "2009年上映的《阿凡达》一炮而红。"
      }
    ]
  },
  "en_c1_13": {
    "title": "介词 + 正式风格中的which/whom",
    "shortExplanation": "我工作的公司。与我交谈的人。",
    "longExplanation": "正式风格：关系代词前的介词+which/whom。\n非正式等价物：句子末尾的介词。\nwhom 是 who 的正式对象形式。",
    "formation": "我工作的公司。与我交谈的人。",
    "examples": [
      {
        "translation": "我提到的报告已附后。"
      },
      {
        "translation": ""
      },
      {
        "translation": ""
      }
    ]
  },
  "en_c1_14": {
    "title": "名词化 - 基础知识",
    "shortExplanation": "决定→决策、发现→发现、改进→改进",
    "longExplanation": "名词化是将动词/形容词转换为名词。学术和商业风格的标志。\n主要后缀：\n• -tion/-sion：决定→决定，讨论→讨论\n• -ment：改进→改进，发展→发展\n• -ance/-ence：出现→外观，不同→不同\n• -ity：复杂→复杂性，能力→能力\n• -ness：快乐→幸福，意识→意识",
    "formation": "决定→决策、发现→发现、改进→改进",
    "examples": [
      {
        "translation": "我们决定扩大..."
      },
      {
        "translation": "他发现了这个错误......"
      }
    ]
  },
  "en_c1_15": {
    "title": "学术文本中的名词化",
    "shortExplanation": "价格上涨的事实 → 价格上涨......",
    "longExplanation": "名词化允许：\n1.压缩信息：价格大幅上涨。\n2。添加定义：房价的快速上涨...\n3。营造正式、客观的语气。",
    "formation": "价格上涨的事实 → 价格上涨......",
    "examples": [
      {
        "translation": "空气质量明显改善。"
      },
      {
        "translation": "他拒绝发表评论令所有人感到惊讶。"
      }
    ]
  },
  "en_c1_16": {
    "title": "现在分词：V-ing 子句",
    "shortExplanation": "走在街上，我看到了一位老朋友。没有钱，他买不到食物。",
    "longExplanation": "带现在分词 (V-ing) 的分词短语取代从句：\n• 同时性：走回家时，我注意到一些奇怪的事情。（= 当我走回家时）\n• 原因：知道答案，她举起了手。（= 因为她知道）\n⚠️分词短语的主语必须与主句的主语一致！\n错误：走在街上，下雨了。（雨没有落在街上）",
    "formation": "走在街上，我看到了一位老朋友。没有钱，他买不到食物。",
    "examples": [
      {
        "translation": "到达机场后，他发现自己忘记带护照了。"
      },
      {
        "translation": "她不知道该怎么办，就给妈妈打电话。"
      }
    ]
  },
  "en_c1_17": {
    "title": "过去分词短语：V3 /having + V3 从句",
    "shortExplanation": "这部小说写于 1815 年……完成工作后，她回家了。",
    "longExplanation": "V3 子句（过去分词）= 被动含义：Built in 1889, the Eiffel Tower...\n+ V3 = 在主要操作之前完成操作：\n读完报告后，他召开了一次会议。（= 他读完后...）",
    "formation": "这部小说写于 1815 年……完成工作后，她回家了。",
    "examples": [
      {
        "translation": "听到这个消息，她很惊讶，默默地坐下来。"
      },
      {
        "translation": "考试结束后，学生们离开了教室。"
      }
    ]
  },
  "en_c2_01": {
    "title": "有条件除非/提供/只要/条件是",
    "shortExplanation": "除非你学习，否则你就会失败。只要你诚实，我就会帮你。",
    "longExplanation": "除非 = if not（但不能与否定一起使用！）：除非你着急 = 如果你不着急\n提供/提供（那个） = 当且仅当（严格条件）\n只要 = 前提是（假设）\n条件 = 条件（正式）\n以防万一=以防万一",
    "formation": "除非你学习，否则你就会失败。只要你诚实，我就会帮你。",
    "examples": [
      {
        "translation": "我借钱给你，条件是你还钱。"
      },
      {
        "translation": "你可以使用我的笔记本电脑，只要你不下载任何东西。"
      }
    ]
  },
  "en_c2_02": {
    "title": "假设/假定/如果",
    "shortExplanation": "假设你中了彩票——你会做什么？",
    "longExplanation": "假设/假设 - 在假设性问题中用作if。\nWhat if 是一个非正式的类比。\n使用过去简单 - 情况不太可能或虚构。",
    "formation": "假设你中了彩票——你会做什么？",
    "examples": [
      {
        "translation": "想象一下，如果你必须做出选择——你会选择什么？"
      },
      {
        "translation": "万一没人来怎么办？我们应该做什么？"
      }
    ]
  },
  "en_c2_03": {
    "title": "唯一+情境+反转",
    "shortExplanation": "直到我离开后我才意识到。这时他才明白。",
    "longExplanation": "仅+ when/after/if/then/by/in/on - 整个组移动到开头 → 反转。\n这是写作和公开演讲中最强大的修辞手段之一。",
    "formation": "直到我离开后我才意识到。这时他才明白。",
    "examples": [
      {
        "translation": "只有亲身经历过，才能真正理解。"
      },
      {
        "translation": "经过多年的练习，她才掌握了这项技能。"
      }
    ]
  },
  "en_c2_04": {
    "title": "so + 形容词/副词 + 倒装",
    "shortExplanation": "他如释重负，流下了眼泪。这就是她的天赋……",
    "longExplanation": "书籍和演讲风格。\nSo + adj/adv + be/aux + 主语\n这样的 + 是/是 + 主题",
    "formation": "他如释重负，流下了眼泪。这就是她的天赋……",
    "examples": [
      {
        "translation": "变化发生得如此之快，以至于没有人能够适应。"
      },
      {
        "translation": "她的才华如此之大，以至于她获得了奖学金。"
      }
    ]
  },
  "en_c2_05": {
    "title": "对冲：似乎、似乎、倾向于、可能",
    "shortExplanation": "价格似乎正在上涨。这种情况往往会发生在...",
    "longExplanation": "对冲是故意软化陈述以表达科学谦虚。\n主要结构：\n• 出现/似乎 - 显然\n• 倾向于 - 通常，倾向于\n• 可能/不太可能 - 可能/不可能\n• 被认为/被认为是 - 人们相信",
    "formation": "价格似乎正在上涨。这种情况往往会发生在...",
    "examples": [
      {
        "translation": "结果似乎表明存在相关性。"
      },
      {
        "translation": "公司往往会低估实施成本。"
      }
    ]
  },
  "en_c2_06": {
    "title": "学术文本中的话语标记",
    "shortExplanation": "此外，然而，相反，鉴于，关于",
    "longExplanation": "标记结构和连接学术文本：\n• 加法：此外，此外，此外，另外\n• 对比：然而，尽管如此，尽管如此，相反，另一方面\n• 结果：因此，结果，结果，因此，因此\n• 解释：换句话说，也就是说，即\n• 让步：诚然，虽然确实如此，尽管如此",
    "formation": "此外，然而，相反，鉴于，关于",
    "examples": [
      {
        "translation": "实验失败了。尽管如此，结果还是有启发性的。"
      },
      {
        "translation": "此外，数据表明存在很强的相关性。"
      }
    ]
  },
  "en_c2_07": {
    "title": "语音语域：正式、中性、口语",
    "shortExplanation": "我想问... vs 我想问... vs 我可以问吗...",
    "longExplanation": "注册由目的、受众和背景决定。\n形式：被动、名词化、复杂连词、完整形式、源自拉丁语的动词（开始、终止、协助）。\n中性：标准语法，没有俚语，适度的缩写。\n非正式：省略号、短语动词（推迟=推迟）、缩写、口语表达。",
    "formation": "我想问... vs 我想问... vs 我可以问吗...",
    "examples": [
      {
        "translation": ""
      },
      {
        "translation": ""
      },
      {
        "translation": ""
      }
    ]
  },
  "en_c2_08": {
    "title": "同义词的内涵 - 含义的深浅",
    "shortExplanation": "瘦/苗条/苗条/瘦/憔悴：正→中性→负",
    "longExplanation": "同义词的内涵（情感色彩）和语域有所不同。\n尺度示例：\n• 苗条 (+) → 瘦 (0) → 瘦 (-) → 骨瘦如柴/憔悴 (--)\n• 坚定 (+) → 坚定 (0) → 固执/固执 (-)\n• 节俭 (+) → 经济 (0) → 吝啬/吝啬 (-)\n• 自信 (+) → 自信 (0) → 傲慢 (-)",
    "formation": "瘦/苗条/苗条/瘦/憔悴：正→中性→负",
    "examples": [
      {
        "translation": "同样的事情，但态度不同。"
      }
    ]
  },
  "en_c2_09": {
    "title": "修辞手段：照应、交叉、三角号",
    "shortExplanation": "“我们将在海滩上战斗，我们将在登陆场上战斗......” - 照应法",
    "longExplanation": "照应：在连续句子的开头重复单词。 “我有一个梦想...我有一个梦想...”\nChiasmus：AB-BA交叉结构。 “不要问你的国家能为你做什么，而要问你能为你的国家做什么。”\n三分号：三个平行元素。 “Veni，vidi，vici。” /“民有、民治、民享的政府。”\n这些技巧用于演讲、散文和新闻报道。",
    "formation": "“我们将在海滩上战斗，我们将在登陆场上战斗......” - 照应法",
    "examples": [
      {
        "translation": ""
      },
      {
        "translation": ""
      }
    ]
  },
  "en_c2_10": {
    "title": "学术文本中的精确搭配",
    "shortExplanation": "进行研究、得出结论、达成共识、解决问题",
    "longExplanation": "在 C2 中，每个名词使用“正确”动词非常重要。\n学术搭配：\n• 进行/开展研究（不是制造/做）\n• 得出/得出结论\n• 提出/解决/解决问题\n• 达成/实现共识\n• 取得重大进展\n• 提出/提出挑战",
    "formation": "进行研究、得出结论、达成共识、解决问题",
    "examples": [
      {
        "translation": "研究人员进行了广泛的采访。"
      },
      {
        "translation": "委员会未能达成共识。"
      }
    ]
  },
  "en_c2_11": {
    "title": "带分词的绝对结构",
    "shortExplanation": "如果天气允许的话，我们会去野餐。她的眼里充满了泪水，离开了房间。",
    "longExplanation": "绝对结构=名词/代词+分词（独立主语）。\n用于书面和正式风格 - 添加一个没有连词的情况。\n类型：\n• 天气允许 = 如果天气允许\n• 考虑所有事情 = 如果您考虑所有事情\n• 她的工作完成 = 她的工作完成时/之后\n• 此完成 = 完成此操作的时间/之后",
    "formation": "如果天气允许的话，我们会去野餐。她的眼里充满了泪水，离开了房间。",
    "examples": [
      {
        "translation": "综合考虑，这是一次成功的活动。"
      },
      {
        "translation": "截止日期过后，该项目被取消。"
      }
    ]
  },
  "en_c2_12": {
    "title": "连接文本中的省略和替换",
    "shortExplanation": "我想去但没去。她说她会打电话，她就打电话了。",
    "longExplanation": "省略号是省略已知元素。\n替换 - 使用do/so/one/it而不是重复。\n椭圆类型：\n• A：你来吗？ B：可能（做）。\n• 她会说法语，他也会说/他也会。\n• 我想离开，但不被允许。（离开省略）\n替补：我以为他会通过。他做到了。 / 大的？我更喜欢小一点的",
    "formation": "我想去但没去。她说她会打电话，她就打电话了。",
    "examples": [
      {
        "translation": "你会开车吗？ - 我以前可以。"
      },
      {
        "translation": "她说她会来，她就来了。"
      }
    ]
  },
  "en_c2_13": {
    "title": "不定式短语代替从句",
    "shortExplanation": "我要你解释一下。她请我帮忙。他看起来并不高兴。",
    "longExplanation": "复杂不定式（复杂宾语）取代从句：\n我想要+宾语+ to-不定式：我希望她留下来。\n在see、hear、watch、let、make、have之后 - 不带to的不定式：\n我看到她离开。 / 她让他哭了。 / 让我帮忙。\n在被动语态中 - 与to：He was made to pay.\n带有seem、appear、happen、prove + to-inf的结构：\n她似乎知道。 / 他碰巧在那儿。",
    "formation": "我要你解释一下。她请我帮忙。他看起来并不高兴。",
    "examples": [
      {
        "translation": "我需要你签署这份文件。"
      },
      {
        "translation": "她被迫公开道歉。"
      },
      {
        "translation": "他似乎已经忘记了一切。"
      }
    ]
  },
  "en_c2_14": {
    "title": "将来完成进行时: will be + V-ing",
    "shortExplanation": "到明年，我将学习英语五年了。",
    "longExplanation": "将来完成进行时 = will be + V-ing\n强调将持续到未来某一时刻的动作的持续时间。经常回答“到那时还有多久？”的问题。\n经常与by（时间）、for、when连用：到星期一，她将在这个项目上工作三周。",
    "formation": "到明年，我将学习英语五年了。",
    "examples": [
      {
        "translation": "到明年我就已经学习英语五年了。"
      },
      {
        "translation": "当我们到达时，她已经等了两个小时了。"
      }
    ]
  },
  "en_c2_15": {
    "title": "时态协调 - 时态顺序",
    "shortExplanation": "她说她一直在工作。他认为这会很困难。",
    "longExplanation": "在复杂的句子中，从句的动词与主句的动词在时间上一致。\n如果主要动词是过去时：\n• 现在简单→过去简单：他说这是真的\n• 过去简单→过去完成时：她说她看到了\n• 现在完成时 → 过去完成时：他说他已经完成了\n• 将 → 将；可以 → 可以；可能 → 可能；是 → 是\n⚠️例外：一般真理和科学事实不会改变：她说水在 100°C 时沸腾。",
    "formation": "她说她一直在工作。他认为这会很困难。",
    "examples": [
      {
        "translation": "他告诉我他已经在那里住了很多年了。"
      },
      {
        "translation": "她说地球绕着太阳转。"
      }
    ]
  },
  "en_c2_16": {
    "title": "并列连词：and、but、or、nor、for、yet、so",
    "shortExplanation": "粉丝：对于、并且、也不、但是、或者、然而、所以",
    "longExplanation": "并列连词连接句子的等效部分。\n七个基本（缩写 FANBOYS）：\n• for = 因为（正式）：她离开了，因为她累了。\n• 和 = 和（相加）\n• nor = 与 not（既不/也不...反转！）：她没有打电话，也没有写信。\n• 但是 = 但是（对比）\n• 或 = 或（替代）\n• yet = 然而（对比，更正式但是）\n• so = 因此（结果）",
    "formation": "粉丝：对于、并且、也不、但是、或者、然而、所以",
    "examples": [
      {
        "translation": "她很累，但仍继续工作。"
      },
      {
        "translation": "他没有学习，也没有去上课。"
      }
    ]
  },
  "en_c2_17": {
    "title": "从属连词：虽然、然而、提供、除非...",
    "shortExplanation": "虽然，好像，然而，规定，除非，鉴于，万一",
    "longExplanation": "从属连词引入从属从句。\n按价值：\n• 时间：何时、同时、作为、之后、之前、直到、一次、一次、每当\n• 原因：因为、因为、因为、考虑到、看到\n• 条件：如果、除非、提供、只要、万一、假设\n• 目标：以便做到最好\n• 让步：尽管、尽管、而、同时、但是",
    "formation": "虽然，好像，然而，规定，除非，鉴于，万一",
    "examples": [
      {
        "translation": "由于截止日期已过，我们取消了会议。"
      },
      {
        "translation": "为了让她不要忘记，他给她发了一条提醒。"
      }
    ]
  },
  "en_c2_18": {
    "title": "逗号、分号和冒号",
    "shortExplanation": "在 FANBOYS 之前使用逗号。使用分号链接相关子句。",
    "longExplanation": "逗号：\n• 在独立子句之间协调连词 FANBOYS 之前。\n• 在介绍性词语/短语之后：但是，她决定留下来。\n• 在枚举中（牛津逗号 - 最后一个 and 之前）：苹果、橙子和香蕉。\n分号(;)：连接两个独立子句，无需连词。\n她很累；她很累。她去睡觉了\n冒号(:)：介绍列表、解释、引用。",
    "formation": "在 FANBOYS 之前使用逗号。使用分号链接相关子句。",
    "examples": [
      {
        "translation": "然而，结果好坏参半。需要进一步研究。"
      },
      {
        "translation": "该公司有三个优先事项：效率、创新和可持续发展。"
      }
    ]
  },
  "en_c2_19": {
    "title": "破折号、撇号和引号",
    "shortExplanation": "Em dash - 用于强调 - 引发一个短语。它与它的对比。 “直接讲话”",
    "longExplanation": "破折号 (—)：突出显示插件结构（比逗号更强）：该解决方案虽然昂贵，但已被证明是有效的。\n撇号：\n• 缩写：it's = it is;不;他们是\n• 所有格：约翰的书；学生成绩\n• ⚠️ 它（属于）与它（它是）\n引号：AmE - 双引号（“文本”），BrE - 单引号（'文本'）。",
    "formation": "Em dash - 用于强调 - 引发一个短语。它与它的对比。 “直接讲话”",
    "examples": [
      {
        "translation": "该项目于 2020 年启动，超出了所有人的预期。"
      },
      {
        "translation": "使用前检查其设置非常重要。"
      }
    ]
  },
  "en_c2_20": {
    "title": "学术文本中的特殊问题和间接问题",
    "shortExplanation": "问题是是否.../我想知道数据显示了什么。",
    "longExplanation": "在学术文本中，直接问题被间接问题（疑问句）所取代。\n间接疑问句是具有通常词序的从句（没有倒装，没有 do）。\n介绍性词语：是否、如果（是/否）、什么、何处、何时、如何、为什么、哪个。\n示例：此数据显示什么？ → 问题是此数据显示什么。",
    "formation": "问题是是否.../我想知道数据显示了什么。",
    "examples": [
      {
        "translation": "我想知道这个假设是否正确。"
      },
      {
        "translation": "该研究探讨了社交媒体如何影响行为。"
      }
    ]
  }
};

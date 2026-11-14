import { GrammarTranslation } from '../../../models/grammar.model';

export const GRAMMAR_VI_ZH: Record<string, GrammarTranslation> = {
  "vi_a1_01": {
    "title": "là — 判断系动词（是）",
    "shortExplanation": "连接主语和名词，表示身份、职业或称谓；不能直接用在形容词前。",
    "longExplanation": "越南语的“là”只用于名词谓语句，相当于中文的“是”。形容词可直接作谓语，前面不加“là”。",
    "formation": "主语 + là + 名词",
    "examples": [{ "translation": "我是学生。" }, { "translation": "这是我的朋友。" }]
  },
  "vi_a1_02": {
    "title": "không phải — 否定判断（不是）",
    "shortExplanation": "用于否定名词身份或陈述内容。",
    "longExplanation": "否定“là”时应使用“không phải (là)”，避免直接说“không là”。",
    "formation": "主语 + không phải (là) + 名词",
    "examples": [{ "translation": "他不是医生。" }, { "translation": "这个不是我的。" }]
  },
  "vi_a1_03": {
    "title": "không — 一般否定（不）",
    "shortExplanation": "直接放在动词或形容词前构成否定句。",
    "longExplanation": "在动词或形容词前加“không”即可否定，越南语动词没有时态或人称词形变化。",
    "formation": "主语 + không + 动词 / 形容词",
    "examples": [{ "translation": "我今天不忙。" }, { "translation": "她不喝咖啡。" }]
  },
  "vi_a1_04": {
    "title": "đang — 进行体（正在……）",
    "shortExplanation": "表示说话时或某参考时间正在进行的动作。",
    "longExplanation": "放在主要动词前，强调动作处于进行状态。",
    "formation": "主语 + đang + 动词",
    "examples": [{ "translation": "我正在学越南语。" }, { "translation": "外面正在下大雨。" }]
  },
  "vi_a1_05": {
    "title": "đã — 过去 / 完成体（已经……了）",
    "shortExplanation": "表示已经发生或完成的动作与状态。",
    "longExplanation": "放在动词或形容词前，口语中常与句尾的“rồi”搭配。",
    "formation": "主语 + đã + 动词 (+ rồi)",
    "examples": [{ "translation": "我已经吃过早饭了。" }, { "translation": "上周他们去了河内。" }]
  },
  "vi_a1_06": {
    "title": "sẽ — 将来时标记（会 / 将要）",
    "shortExplanation": "表示未来的打算、计划或预测。",
    "longExplanation": "置于动词前，时间跨度比“sắp（马上要）”更宽泛。",
    "formation": "主语 + sẽ + 动词",
    "examples": [{ "translation": "明天我会给你打电话。" }, { "translation": "我们将在这里待三天。" }]
  },
  "vi_a1_07": {
    "title": "có thể — 能力与可能性（可以 / 可能）",
    "shortExplanation": "表示能力、许可或推测的可能性。",
    "longExplanation": "在动词前加“có thể”（否定为“không thể”）。",
    "formation": "主语 + (không) có thể + 动词",
    "examples": [{ "translation": "你能说慢一点吗？" }, { "translation": "我今天来不了。" }]
  },
  "vi_a1_08": {
    "title": "muốn — 愿望与打算（想 / 想要）",
    "shortExplanation": "表示想要某物或想要做某事。",
    "longExplanation": "“muốn”后可直接接名词或动词短语。",
    "formation": "主语 + muốn + 动词 / 名词",
    "examples": [{ "translation": "我想喝奶茶。" }, { "translation": "这个周末你想去哪里？" }]
  },
  "vi_a1_09": {
    "title": "những — 不定复数（一些 / 这些）",
    "shortExplanation": "修饰多个可数名词，表示部分复数。",
    "longExplanation": "置于量词和名词前，强调“某些多个”（与强调整体全部的“các”相对）。",
    "formation": "những + (量词) + 名词",
    "examples": [{ "translation": "我喜欢这些菜。" }, { "translation": "最初的几天非常艰难。" }]
  },
  "vi_a1_10": {
    "title": "các — 全体复数（各位 / 全部……）",
    "shortExplanation": "指代某一群体或对象中的全部成员。",
    "longExplanation": "常用于集合名词或称呼语（如“các bạn 朋友们”）。",
    "formation": "các + (量词) + 名词",
    "examples": [{ "translation": "大家好！" }, { "translation": "学生们正在做练习。" }]
  },
  "vi_a1_11": {
    "title": "hơn — 比较级（比……更）",
    "shortExplanation": "比较两个事物在某种性质上的高低。",
    "longExplanation": "接在形容词或副词后，后面跟比较对象 B。",
    "formation": "A + 形容词 + hơn + B",
    "examples": [{ "translation": "今天比昨天热。" }, { "translation": "这件衣服更好看。" }]
  },
  "vi_a1_12": {
    "title": "nhất — 最高级（最……）",
    "shortExplanation": "表示性质或喜好的最高程度。",
    "longExplanation": "放在形容词或情感动词（如“thích nhất 最喜欢”）之后。",
    "formation": "形容词 / 动词 + nhất",
    "examples": [{ "translation": "这是最好吃的馆子。" }, { "translation": "我最喜欢秋天。" }]
  },
  "vi_a1_13": {
    "title": "bao nhiêu — 询问数量或价格（多少）",
    "shortExplanation": "用于询问价钱、数量或时长。",
    "longExplanation": "问价格时常放在句尾（“bao nhiêu tiền?”）。",
    "formation": "名词 + bao nhiêu / giá bao nhiêu",
    "examples": [{ "translation": "这一杯多少钱？" }, { "translation": "你需要多少时间？" }]
  },
  "vi_a1_14": {
    "title": "tại sao — 询问原因（为什么）",
    "shortExplanation": "引导询问原因的“为什么”问句。",
    "longExplanation": "通常放在疑问句开头。",
    "formation": "Tại sao + 主语 + 动词?",
    "examples": [{ "translation": "你为什么学越南语？" }, { "translation": "昨天你为什么没打电话？" }]
  },
  "vi_a1_15": {
    "title": "như thế nào — 询问方式或状况（怎么 / 怎么样）",
    "shortExplanation": "询问做事方法、状态或评价。",
    "longExplanation": "置于动词或主语之后。",
    "formation": "主语 + 动词 + như thế nào?",
    "examples": [{ "translation": "你的工作怎么样？" }, { "translation": "这道菜怎么做？" }]
  },
  "vi_a1_16": {
    "title": "nhé — 亲切建议语气词（吧 / 哦）",
    "shortExplanation": "放在句尾，使邀请、建议或叮嘱听起来更温和自然。",
    "longExplanation": "常用于朋友或晚辈之间，表达“好吗？/ 吧”。",
    "formation": "建议句 + nhé",
    "examples": [{ "translation": "我们去吃午饭吧！" }, { "translation": "记得给我发信息哦。" }]
  },
  "vi_a2_01": {
    "title": "phải — 义务与必须（必须 / 得）",
    "shortExplanation": "表示规则、职责或客观必要性。",
    "longExplanation": "放在动词前。注意“không phải”意为“不是”，“không cần phải”才表示“不必”。",
    "formation": "主语 + phải + 动词",
    "examples": [{ "translation": "我今天必须完成报告。" }, { "translation": "你明天必须早起。" }]
  },
  "vi_a2_02": {
    "title": "được — 受益被动 / 允许 / 达成",
    "shortExplanation": "表示积极意义的被动、获得许可或成功做到。",
    "longExplanation": "在动词前表允许或积极被动；在动词后表示能够成功完成。",
    "formation": "主语 + được + (施事者) + 动词",
    "examples": [{ "translation": "她受到了老师的表扬。" }, { "translation": "这里可以拍照吗？" }]
  },
  "vi_a2_03": {
    "title": "bị — 不利被动（被 / 遭遇……）",
    "shortExplanation": "表示遭遇消极、不愿发生或令人困扰的事情。",
    "longExplanation": "常与生病、堵车、故障等词搭配。积极结果请用“được”。",
    "formation": "主语 + bị + (原因) + 动词 / 消极形容词",
    "examples": [{ "translation": "我堵车堵了快一个小时。" }, { "translation": "我的手机没电了。" }]
  },
  "vi_a2_04": {
    "title": "sắp — 紧迫将来（快要……了）",
    "shortExplanation": "表示事情很快就要发生。",
    "longExplanation": "时间上比“sẽ”更紧迫。",
    "formation": "主语 + sắp + 动词",
    "examples": [{ "translation": "火车快要开了。" }, { "translation": "我们快到了吗？" }]
  },
  "vi_a2_05": {
    "title": "vừa — 刚刚发生（刚才 / 刚刚）",
    "shortExplanation": "表示动作在极短时间前刚刚完成。",
    "longExplanation": "常加强为“vừa mới”放在动词前。",
    "formation": "主语 + vừa (mới) + 动词",
    "examples": [{ "translation": "他刚刚离开办公室。" }, { "translation": "我刚刚听到那个消息。" }]
  },
  "vi_a2_06": {
    "title": "vẫn — 持续不变（仍然 / 还是）",
    "shortExplanation": "表示动作或状态依旧保持不变。",
    "longExplanation": "常与“còn”连用，强调虽经时间变化依然持续。",
    "formation": "主语 + vẫn (còn) + 动词 / 形容词",
    "examples": [{ "translation": "这么晚了你还在醒着吗？" }, { "translation": "那家店还开着门。" }]
  },
  "vi_a2_07": {
    "title": "chưa bao giờ — 从未体验（从来没有……过）",
    "shortExplanation": "表示截至目前从未有过某种经历。",
    "longExplanation": "由“chưa”和“bao giờ”组合，放在动词前。",
    "formation": "主语 + chưa bao giờ + 动词",
    "examples": [{ "translation": "我从来没有去过大叻。" }, { "translation": "我从未见过这么美的风景。" }]
  },
  "vi_a2_08": {
    "title": "đã từng — 过去经历（曾经……过）",
    "shortExplanation": "强调过去至少有过一次的经验。",
    "longExplanation": "重在说明“有过此经历”，不强调具体时间点。",
    "formation": "主语 + (đã) từng + 动词",
    "examples": [{ "translation": "你吃过河内河粉吗？" }, { "translation": "她以前曾在日本生活过。" }]
  },
  "vi_a2_09": {
    "title": "vì ... nên — 因果关联（因为……所以……）",
    "shortExplanation": "连接原因分句与结果分句。",
    "longExplanation": "与汉语一致，越南语习惯同时保留“vì”和“nên”。",
    "formation": "(Bởi) vì + 原因, nên + 结果",
    "examples": [{ "translation": "因为下雨，所以我们待在家里。" }, { "translation": "因为太忙了，所以他忘了打电话。" }]
  },
  "vi_a2_10": {
    "title": "nếu ... thì — 条件句（如果……就……）",
    "shortExplanation": "引出假设条件及其相应结果。",
    "longExplanation": "“nếu”引导条件，“thì”引导结果。",
    "formation": "Nếu + 条件, (thì) + 结果",
    "examples": [{ "translation": "如果有时间，咱们就顺路过去看看。" }, { "translation": "如果天晴，我们就去海边。" }]
  },
  "vi_a2_11": {
    "title": "trước khi — 在……之前",
    "shortExplanation": "标明在某个动作发生之前的时间。",
    "longExplanation": "可引导完整从句或动词短语。",
    "formation": "Trước khi + (主语) + 动词, 主句",
    "examples": [{ "translation": "出门前记得关灯。" }, { "translation": "吃饭前先洗手。" }]
  },
  "vi_a2_12": {
    "title": "sau khi — 在……之后",
    "shortExplanation": "表示在先前的动作完成之后发生的事件。",
    "longExplanation": "从句后常带“thì”引出后续主句。",
    "formation": "Sau khi + (主语) + 动词, (thì) + 主句",
    "examples": [{ "translation": "毕业后，我马上就开始工作了。" }, { "translation": "晚饭后我们喝点茶吧。" }]
  },
  "vi_a2_13": {
    "title": "giống như — 相似比较（像……一样）",
    "shortExplanation": "比较两个事物或情景的相似之处。",
    "longExplanation": "用在两个名词之间或比喻短语之前。",
    "formation": "A + giống (như) + B",
    "examples": [{ "translation": "你的口音听起来就像河内人一样。" }, { "translation": "今天热得就像夏天一样。" }]
  },
  "vi_a2_14": {
    "title": "thử — 尝试体验（试着…… / ……看看）",
    "shortExplanation": "表示尝试做某事或品尝以看结果。",
    "longExplanation": "常置于动词后，并与“xem sao（看看怎么样）”搭配。",
    "formation": "动词 + thử (+ xem)",
    "examples": [{ "translation": "你尝尝这道牛肉粉吧。" }, { "translation": "我试着给她打个电话看看。" }]
  },
  "vi_a2_15": {
    "title": "để — 目的关联（为了…… / 以便……）",
    "shortExplanation": "说明动作想要达成的目的或意图。",
    "longExplanation": "可连接动词短语或带新主语的目的从句。",
    "formation": "主句 + để + (主语) + 动词",
    "examples": [{ "translation": "我早起是为了锻炼身体。" }, { "translation": "请大声一点，好让大家都能听到。" }]
  },
  "vi_a2_16": {
    "title": "chưa — 尚未 & 完成与否疑问",
    "shortExplanation": "在动词前表“还没”；在句尾构成“……了吗？”疑问句。",
    "longExplanation": "日常交流中最核心的体貌表达之一。",
    "formation": "主语 + chưa + 动词 / 句子 + chưa?",
    "examples": [{ "translation": "作业写完了没有？" }, { "translation": "抱歉，我还没看你的消息。" }]
  },
  "vi_b1_01": {
    "title": "mặc dù ... nhưng — 转折让步（虽然……但是……）",
    "shortExplanation": "连接与预期相反的两个事实。",
    "longExplanation": "越南语习惯在前后两句同时使用“mặc dù”和“nhưng”。",
    "formation": "Mặc dù + 分句1, nhưng + 分句2",
    "examples": [{ "translation": "虽然天冷，但还是有很多人在散步。" }, { "translation": "虽然她很忙，但还是帮了我。" }]
  },
  "vi_b1_02": {
    "title": "tuy ... nhưng — 轻度让步（虽说……但……）",
    "shortExplanation": "口语与书面语中都很常用的简练让步结构。",
    "longExplanation": "比“mặc dù ... nhưng”更轻巧，常用于连接形容词或短句。",
    "formation": "Tuy + 分句1, nhưng + 分句2",
    "examples": [{ "translation": "店虽小，但很温馨。" }, { "translation": "虽然只学了三个月，但你说得真不错。" }]
  },
  "vi_b1_03": {
    "title": "không những ... mà còn — 递进（不但……而且……）",
    "shortExplanation": "强调主体同时具备两项特征或行动。",
    "longExplanation": "突出后半部分；口语中常与“không chỉ ... mà còn”互换。",
    "formation": "không những + A + mà còn + B",
    "examples": [{ "translation": "他不仅聪明，而且非常勤奋。" }, { "translation": "这道菜不仅好吃，而且还便宜。" }]
  },
  "vi_b1_04": {
    "title": "vừa ... đã — 紧接动作（一……就…… / 刚……就已经……）",
    "shortExplanation": "突出第二个动作紧随第一个动作迅速发生。",
    "longExplanation": "常说成“vừa mới ... đã”，强调速度之快出乎意料。",
    "formation": "Vừa (mới) + 动作1, đã + 动作2",
    "examples": [{ "translation": "我刚躺下就睡着了。" }, { "translation": "雨刚一停就看见彩虹了。" }]
  },
  "vi_b1_05": {
    "title": "càng ... càng — 正比递进（越……越……）",
    "shortExplanation": "表示前者程度增加时后者也随之提高。",
    "longExplanation": "置于两个形容词、副词或动词之前。",
    "formation": "(主语) + càng + A + càng + B",
    "examples": [{ "translation": "练习得越多，你说得就越自然。" }, { "translation": "夜越深天越冷。" }]
  },
  "vi_b1_06": {
    "title": "có vẻ — 外观印象（看起来似乎 / 好像）",
    "shortExplanation": "根据外在迹象作出委婉评价。",
    "longExplanation": "避免生硬武断，用来表达“显得……”。",
    "formation": "主语 + có vẻ (+ như) + 形容词 / 从句",
    "examples": [{ "translation": "你今天看起来有点累。" }, { "translation": "这个计划似乎挺可行的。" }]
  },
  "vi_b1_07": {
    "title": "hình như — 不确定推测（好像 / 似乎）",
    "shortExplanation": "表示说话人不完全肯定的猜测或模糊记忆。",
    "longExplanation": "常置于句首或谓语前。",
    "formation": "Hình như + 从句",
    "examples": [{ "translation": "外面好像正在办庙会。" }, { "translation": "我好像在哪儿见过您。" }]
  },
  "vi_b1_08": {
    "title": "thay vì — 替代选择（与其 / 而不是……）",
    "shortExplanation": "说明放弃常规或预期选项 A 而改选 B。",
    "longExplanation": "置于被替代的动词短语或名词前。",
    "formation": "Thay vì + A, (thì) + B",
    "examples": [{ "translation": "今天别骑摩托了，咱们走着去吧。" }, { "translation": "她选择看书而不是看电影。" }]
  },
  "vi_b1_09": {
    "title": "ngay khi — 立即触发（一……就…… / 一旦）",
    "shortExplanation": "强调某事件刚发生时主句动作立刻随之发生。",
    "longExplanation": "近义表达有“ngay sau khi（紧接着……之后）”。",
    "formation": "Ngay khi + 分句1, 分句2",
    "examples": [{ "translation": "一到机场就给妈妈发个消息。" }, { "translation": "他一走进来我就认出他了。" }]
  },
  "vi_b1_10": {
    "title": "ngoài ra — 补充说明（此外 / 另外）",
    "shortExplanation": "在口语和文章中添加额外要点或信息。",
    "longExplanation": "通常放在后一句句首，并用逗号隔开。",
    "formation": "Ngoài ra, + 从句",
    "examples": [{ "translation": "此外，每天还应该喝足够的水。" }, { "translation": "这房间很宽敞。此外还有个阳台。" }]
  },
  "vi_b1_11": {
    "title": "thậm chí — 极端强调（甚至）",
    "shortExplanation": "举出令人意外或极端的情况以强化语气。",
    "longExplanation": "常与“cũng”或“còn”呼应。",
    "formation": "Thậm chí + (主语) + còn / cũng + 动词",
    "examples": [{ "translation": "他忙得甚至连午饭都来不及吃。" }, { "translation": "甚至母语者有时也会弄错这个词。" }]
  },
  "vi_b1_12": {
    "title": "dần dần — 逐渐变化（渐渐地 / 逐步）",
    "shortExplanation": "描述随时间推移一步步发生变化。",
    "longExplanation": "简略形式“dần”用在谓语后面。",
    "formation": "Dần dần + 从句 / 动词 + dần",
    "examples": [{ "translation": "渐渐地我习惯了这里的生活节奏。" }, { "translation": "一切都会慢慢好起来的。" }]
  },
  "vi_b1_13": {
    "title": "trừ khi — 否定条件（除非）",
    "shortExplanation": "指出足以改变结果的唯一例外情形。",
    "longExplanation": "常置于主句之后说明例外条件。",
    "formation": "主句 + trừ khi + 例外",
    "examples": [{ "translation": "除非刮暴风雨，否则我们七点出发。" }, { "translation": "除非有急事，不然我不出门。" }]
  },
  "vi_b1_14": {
    "title": "nhất là — 突出重点（尤其是 / 特别是）",
    "shortExplanation": "在整体范围内挑出最具代表性的例子。",
    "longExplanation": "常接名词或“khi + 从句”。",
    "formation": "从句, nhất là + 名词 / khi ...",
    "examples": [{ "translation": "河内非常美，尤其是在秋天。" }, { "translation": "注意保重身体，尤其是换季的时候。" }]
  },
  "vi_b1_15": {
    "title": "ít nhất — 最低限度（至少）",
    "shortExplanation": "给出数量下限、时间保底或安慰性的底线。",
    "longExplanation": "放在数字前或引出让人宽慰的分句。",
    "formation": "ít nhất (+ là) + 数量 / 从句",
    "examples": [{ "translation": "我每天至少听三十分钟越南语。" }, { "translation": "至少我们已经尽力了。" }]
  },
  "vi_b1_16": {
    "title": "vô tình — 无意巧合（无意中 / 碰巧）",
    "shortExplanation": "强调事情出于偶然或疏忽而非故意。",
    "longExplanation": "置于动词前的副词，反义词为“cố tình（故意）”。",
    "formation": "主语 + vô tình + 动词",
    "examples": [{ "translation": "我在超市碰巧遇到了老朋友。" }, { "translation": "不好意思，我不小心把那条消息删了。" }]
  },
  "vi_b2_01": {
    "title": "chỉ cần ... là — 充分条件（只要……就……）",
    "shortExplanation": "指出达成结果所需的极简前提条件。",
    "longExplanation": "强调要求不多，随后用“là”引出必然效果。",
    "formation": "Chỉ cần + 条件 + là + 结果",
    "examples": [{ "translation": "只要你坚持练习听力，就会有进步。" }, { "translation": "只要按下这个按钮，机器就会自动运行。" }]
  },
  "vi_b2_02": {
    "title": "chỉ khi ... mới — 唯一条件（只有当……才……）",
    "shortExplanation": "严格限定结果只在某一特定前提下才能实现。",
    "longExplanation": "结果分句中需搭配“mới”突出排他性。",
    "formation": "Chỉ khi + 条件 + (主语) + mới + 结果",
    "examples": [{ "translation": "只有当你自己真正动手做时，才会完全理解问题。" }, { "translation": "只有失去之后，人们才懂得珍惜。" }]
  },
  "vi_b2_03": {
    "title": "cho dù — 无条件让步（哪怕……也 / 无论……都……）",
    "shortExplanation": "强调即便面对极端或假设阻力，结论依然不变。",
    "longExplanation": "语气强于“mặc dù”，常与“vẫn”、“cũng”搭配。",
    "formation": "Cho dù + 假设, (thì) + 结果 vẫn ...",
    "examples": [{ "translation": "不管有多忙，他还是会抽时间陪家人。" }, { "translation": "哪怕失败，我也不会后悔。" }]
  },
  "vi_b2_04": {
    "title": "bất kể — 不分条件（无论 / 不管）",
    "shortExplanation": "表示不受任何限制或例外影响。",
    "longExplanation": "后接名词、疑问词（如“bất kể lúc nào”）或正反对照。",
    "formation": "Bất kể + 名词 / 疑问词",
    "examples": [{ "translation": "这家店全年无休，节假日也不例外。" }, { "translation": "你随时都可以提问。" }]
  },
  "vi_b2_05": {
    "title": "một mặt ... mặt khác — 双面对比（一方面……另一方面……）",
    "shortExplanation": "客观并列分析事物的两个不同维度。",
    "longExplanation": "常见于讨论、议论文和利弊分析中。",
    "formation": "Một mặt + 分句1, mặt khác + 分句2",
    "examples": [{ "translation": "这份工作一方面薪水高，另一方面压力也很大。" }, { "translation": "我们既要节约成本，又要保证质量。" }]
  },
  "vi_b2_06": {
    "title": "thà ... còn hơn — 权衡取舍（宁可……也不愿……）",
    "shortExplanation": "在两种不够完美的选项中明确偏向前者。",
    "longExplanation": "“thà”后放选中的做法，“còn hơn”后放宁愿避开的做法。",
    "formation": "Thà + 方案A + còn hơn (là) + 方案B",
    "examples": [{ "translation": "宁可慢一点走稳，也比匆忙出错好。" }, { "translation": "我宁可在家看书，也不愿冒雨出门。" }]
  },
  "vi_b2_07": {
    "title": "nhờ có — 积极归因（幸亏有 / 多亏了）",
    "shortExplanation": "对带来好结果的人、工具或条件表示感谢与肯定。",
    "longExplanation": "仅用于正面结果；负面原因用“tại”或“do”。",
    "formation": "Nhờ (có) + 积极原因, 好结果",
    "examples": [{ "translation": "多亏你的帮助，项目才赶上了进度。" }, { "translation": "多亏每天听播客，我的反应能力明显提高了。" }]
  },
  "vi_b2_08": {
    "title": "so với — 对比基准（与……相比）",
    "shortExplanation": "设立参照基准以评估变化、差异或性价比。",
    "longExplanation": "可放在句首确立范围，也可置于被比较的内容之后。",
    "formation": "A + 形容词 / 从句 + so với + B",
    "examples": [{ "translation": "与去年相比，今年天气舒服多了。" }, { "translation": "和质量相比，这个价位相当合理。" }]
  },
  "vi_b2_09": {
    "title": "dựa trên — 依据基础（基于 / 根据）",
    "shortExplanation": "说明判断、研究或创作所依赖的数据、事实或规则。",
    "longExplanation": "常见于报告、评论和说明性表达。",
    "formation": "动词 / 从句 + dựa trên + 依据",
    "examples": [{ "translation": "这部电影是根据真实故事改编的。" }, { "translation": "我们根据实际结果进行评估。" }]
  },
  "vi_b2_10": {
    "title": "miễn là — 附带底线条件（只要……就行）",
    "shortExplanation": "只要满足一个核心前提，其他细节均可通融。",
    "longExplanation": "常置于主句末尾点明不可缺少的前提。",
    "formation": "主句, miễn là + 核心条件",
    "examples": [{ "translation": "去哪儿都行，只要大家开心就好。" }, { "translation": "你可以借车，只要天黑前还回来就行。" }]
  },
  "vi_b2_11": {
    "title": "ngày càng — 递增趋势（越来越 / 日益）",
    "shortExplanation": "描述某种性质或趋势随时间不断加深。",
    "longExplanation": "放在形容词或心理状态动词前。",
    "formation": "主语 + ngày càng + 形容词 / 动词",
    "examples": [{ "translation": "越南语在网上正变得越来越流行。" }, { "translation": "科技发展得越来越快。" }]
  },
  "vi_b2_12": {
    "title": "hóa ra — 恍然大悟（原来如此 / 结果竟然是）",
    "shortExplanation": "经历误解或核实后揭晓出人意料的真相。",
    "longExplanation": "通常置于句首表达惊讶与恍然明白。",
    "formation": "Hóa ra + (là) + 新发现的真相",
    "examples": [{ "translation": "原来他们俩是高中同学啊！" }, { "translation": "我还以为很难呢，原来挺简单的。" }]
  },
  "vi_b2_13": {
    "title": "tóm lại — 总结收束（总之 / 简言之）",
    "shortExplanation": "在详述之后用一句话提炼核心结论。",
    "longExplanation": "置于总结句句首。",
    "formation": "Tóm lại, + 核心结论",
    "examples": [{ "translation": "总之，想学好外语就必须每天使用。" }, { "translation": "总而言之，计划已经获得批准。" }]
  },
  "vi_b2_14": {
    "title": "huống chi — 递进反推（何况 / 更不用说）",
    "shortExplanation": "连较轻的情况尚且如此，更严重的情况自然不在话下。",
    "longExplanation": "与“huống hồ”同义，加强论证说服力。",
    "formation": "分句1 (前提), huống chi (+ là) + 分句2",
    "examples": [{ "translation": "大人都觉得累，更何况小孩子呢。" }, { "translation": "走路都吃力，更别说跑步了。" }]
  },
  "vi_b2_15": {
    "title": "hầu như — 接近全部（几乎）",
    "shortExplanation": "对全称表述稍作保留，意为“几乎所有 / 几乎不”。",
    "longExplanation": "常修饰“mọi”“tất cả”或否定词“không（几乎没有）”。",
    "formation": "Hầu như + mọi / tất cả / không + 动词",
    "examples": [{ "translation": "我几乎每天都会看一个短视频。" }, { "translation": "房间里几乎没有噪音。" }]
  },
  "vi_b2_16": {
    "title": "không ... cũng không — 双重否定（既不……也不……）",
    "shortExplanation": "同时否定两个选项或性质。",
    "longExplanation": "形成对称并列结构。",
    "formation": "主语 + không + A + cũng không + B",
    "examples": [{ "translation": "今天既不热也不冷。" }, { "translation": "她既没打电话，也没发信息。" }]
  },
  "vi_c1_01": {
    "title": "giá mà — 虚拟惋惜（要是……该多好）",
    "shortExplanation": "表达对现实的遗憾或对过去未能实现的愿望。",
    "longExplanation": "与“giá như”同义，用于与事实相反的假设叹息。",
    "formation": "Giá mà + 反事实假设 (+ thì tốt biết bao)",
    "examples": [{ "translation": "要是昨天我带了伞，就不会淋湿了。" }, { "translation": "要是一天能多出几个小时该多好！" }]
  },
  "vi_c1_02": {
    "title": "tuy nhiên — 正式转折（然而 / 不过）",
    "shortExplanation": "书面语和正式演讲中引出转折或限制条件。",
    "longExplanation": "比“nhưng”更正式，通常位于句首并用逗号隔开。",
    "formation": "句子1. Tuy nhiên, + 句子2",
    "examples": [{ "translation": "初期投入成本较高。然而，长期效益非常可观。" }, { "translation": "想法很棒，不过落地实施还需要时间。" }]
  },
  "vi_c1_03": {
    "title": "do đó — 正式推论（因此 / 因而）",
    "shortExplanation": "在学术、新闻或商务语境下引出严密的逻辑结果。",
    "longExplanation": "相当于口语“vì vậy / cho nên”的书面正式版。",
    "formation": "原因句. Do đó, + 推论结果",
    "examples": [{ "translation": "供应大幅减少，因此原材料价格飙升。" }, { "translation": "数据尚不完整，因此不能仓促下结论。" }]
  },
  "vi_c1_04": {
    "title": "tức là — 释义阐明（也就是说 / 即）",
    "shortExplanation": "用更浅显或更具体的说法来重述前文含义。",
    "longExplanation": "把抽象说法与实际含意连接起来。",
    "formation": "观点, tức là + 进一步阐释",
    "examples": [{ "translation": "截止日期是星期五，也就是说我们只剩两天时间了。" }, { "translation": "主动学习就是自己提出问题并寻找答案。" }]
  },
  "vi_c1_05": {
    "title": "chẳng lẽ — 反问质疑（难道……不成）",
    "shortExplanation": "用反问句表达惊讶、难以置信或委婉抗议。",
    "longExplanation": "暗示说话人认为某事不合理或难以接受。",
    "formation": "Chẳng lẽ + 从句 + (lại ... sao?)",
    "examples": [{ "translation": "难道你把今天的约定忘了吗？" }, { "translation": "工作了一整周，难道周末连休息一会儿都不行吗？" }]
  },
  "vi_c1_06": {
    "title": "quả thật — 由衷肯定（确实 / 果然）",
    "shortExplanation": "证实所见所感完全符合传闻或预期。",
    "longExplanation": "带有沉稳真诚的感叹语气。",
    "formation": "主语 + quả thật + 形容词 / 动词",
    "examples": [{ "translation": "这里的风景果然如传闻般壮丽。" }, { "translation": "的确，学会一门外语能打开很多机会之门。" }]
  },
  "vi_c1_07": {
    "title": "trái lại — 截然相反（恰恰相反）",
    "shortExplanation": "彻底推翻先前的猜测并指出相反事实。",
    "longExplanation": "正式语篇标记，近义词为“ngược lại”。",
    "formation": "猜测. Trái lại, + 相反事实",
    "examples": [{ "translation": "他一点也不傲慢，恰恰相反，非常谦逊随和。" }, { "translation": "详细解释非但不会让听众糊涂，反而更容易理解。" }]
  },
  "vi_c1_08": {
    "title": "xét về — 分析视角（就……而言 / 从……来看）",
    "shortExplanation": "聚焦某一特定评价维度来展开论述。",
    "longExplanation": "常用于评测、论文与讨论，界定考察标准。",
    "formation": "Xét về + (mặt) + 标准, 主句",
    "examples": [{ "translation": "从经济角度来看，这个方案最为优化。" }, { "translation": "就耐用性而言，国产品并不逊色于进口货。" }]
  },
  "vi_c1_09": {
    "title": "trở nên — 状态转变（变得[形容词]）",
    "shortExplanation": "描述性质、氛围或抽象状态的转变。",
    "longExplanation": "后接形容词或状态（接身份名词时用“trở thành”）。",
    "formation": "主语 + trở nên + 形容词",
    "examples": [{ "translation": "借助具体示例，抽象概念变得更容易理解了。" }, { "translation": "会议气氛突然变得紧张起来。" }]
  },
  "vi_c1_10": {
    "title": "trở thành — 身份演变（成为[名词]）",
    "shortExplanation": "发展成为某种明确身份、职业或现象。",
    "longExplanation": "后必须接名词或名词短语。",
    "formation": "主语 + trở thành + 名词",
    "examples": [{ "translation": "读书习惯已经成了我每晚的乐趣。" }, { "translation": "这座城市迅速成为了科技中心。" }]
  },
  "vi_c1_11": {
    "title": "chính là — 焦点强调（正是）",
    "shortExplanation": "明确锁定核心原因或唯一对象，消除歧义。",
    "longExplanation": "结合强调副词“chính”与“là”。",
    "formation": "A + chính là + B (核心所在)",
    "examples": [{ "translation": "坚持不懈正是通往成功的关键。" }, { "translation": "这正是我们一直在寻找的东西。" }]
  },
  "vi_c1_12": {
    "title": "dẫu sao — 豁达让步（无论如何 / 毕竟）",
    "shortExplanation": "承认过往波折，同时转向务实的最终判断。",
    "longExplanation": "常以“dẫu sao đi nữa / dẫu sao thì”出现。",
    "formation": "Dẫu sao (đi nữa), + 务实结论",
    "examples": [{ "translation": "不管怎样事情都已经过去了，别再难过了。" }, { "translation": "过程虽有些辛苦，但无论如何结果非常值得。" }]
  },
  "vi_c1_13": {
    "title": "kể cả khi — 囊括极端情形（即使在……的时候）",
    "shortExplanation": "表明在棘手或极端情境下原则依然适用。",
    "longExplanation": "将严苛的时间或前提也纳入范围。",
    "formation": "主句 + kể cả khi + 严峻情况",
    "examples": [{ "translation": "即使初期结果不如预期，也不要放弃。" }, { "translation": "即使访问量翻倍，系统依然运行稳定。" }]
  },
  "vi_c1_14": {
    "title": "về mặt — 维度限定（在……方面）",
    "shortExplanation": "精准界定正在讨论的领域或层面。",
    "longExplanation": "紧凑的介词短语，常见于分析与总结。",
    "formation": "Về mặt + 抽象名词, 主句",
    "examples": [{ "translation": "从理论上讲，这个解决方案完全可行。" }, { "translation": "团队在专业能力方面非常扎实。" }]
  },
  "vi_c1_15": {
    "title": "đồng thời — 并行兼顾（同时）",
    "shortExplanation": "连接同时发生的两项动作或并行成效。",
    "longExplanation": "常用于新闻与说明文，使句式更凝练。",
    "formation": "分句1, đồng thời + 动词 / 分句2",
    "examples": [{ "translation": "该程序既能节省时间，同时还能提升准确率。" }, { "translation": "她既是讲师，同时也担任技术顾问。" }]
  },
  "vi_c1_16": {
    "title": "nói cách khác — 换言之（换句话说）",
    "shortExplanation": "引出更清晰、直白的等价转述。",
    "longExplanation": "用来点破前文观点在实践中的直接意义。",
    "formation": "原意. Nói cách khác, + 重述表达",
    "examples": [{ "translation": "换句话说，我们需要把质量放在数量前面。" }, { "translation": "预算被削减了；换言之，扩建计划必须推迟。" }]
  }
};

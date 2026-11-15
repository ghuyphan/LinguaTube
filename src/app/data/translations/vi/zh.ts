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
  },
  "vi_a1_17": {
    "title": "cái + 名词 — 通用物品量词",
    "shortExplanation": "用于绝大多数日常无生命物品、工具和概念的最通用量词。",
    "longExplanation": "越南语数数或特指名词时常需加量词，“cái”可用于包、桌子、杯子等常见物件。",
    "formation": "（数量词）+ cái + 物品名词",
    "examples": [
      {
        "translation": "请给我看看那个黑色的包。"
      },
      {
        "translation": "桌子上有两个玻璃杯。"
      }
    ]
  },
  "vi_a1_18": {
    "title": "con + 名词 — 动物及动态/条状物量词",
    "shortExplanation": "用于动物、小孩以及河流、道路、刀、船等特定事物的量词。",
    "longExplanation": "除了动物（con mèo），越南语还习惯将“con”用于路（con đường）、河（con sông）、刀（con dao）等。",
    "formation": "（数量词）+ con + 名词",
    "examples": [
      {
        "translation": "我家养了一只很温顺的虎斑猫。"
      },
      {
        "translation": "这条路直通河边。"
      }
    ]
  },
  "vi_a1_19": {
    "title": "chiếc / cuốn / người — 高频专用量词",
    "shortExplanation": "指代交通工具、书籍或人物时让表达地道自然的核心专用量词。",
    "longExplanation": "车辆和精致或成对物品常用 chiếc，书籍用 cuốn/quyển，身份或国籍前常用 người。",
    "formation": "chiếc（车辆/单个物品）/ cuốn（书本）/ người（人员）",
    "examples": [
      {
        "translation": "我花了三个晚上读完这本书。"
      },
      {
        "translation": "八路公交车刚刚停在大门口。"
      }
    ]
  },
  "vi_a1_20": {
    "title": "này / đó / kia / ấy — 空间指示词（这 / 那）",
    "shortExplanation": "放在名词【后面】的指示词，用于区分近指（này）、中指（đó/ấy）和远指（kia）。",
    "longExplanation": "与汉语不同，越南语指示词放在名词短语末尾，例如“quán này（这家店）”、“bên kia（那边）”。",
    "formation": "（量词）+ 名词 + này / đó / kia",
    "examples": [
      {
        "translation": "这家河粉店早上客人非常多。"
      },
      {
        "translation": "你看到那边那栋白色的髙楼了吗？"
      }
    ]
  },
  "vi_a1_21": {
    "title": "... không? — 基本是非问句",
    "shortExplanation": "只需在陈述句句末加上“không”，即可构成标准是非疑问句。",
    "longExplanation": "谓语前常配合“có”使语感更自然；肯定回答用“Có”，否定用“Không”。",
    "formation": "主语 + (có) + 谓语 + không?",
    "examples": [
      {
        "translation": "刚才那段对话你全都听懂了吗？"
      },
      {
        "translation": "今天天气很冷吗？"
      }
    ]
  },
  "vi_a1_22": {
    "title": "... chưa? — 完成与否问句（……了吗 / 还没吗）",
    "shortExplanation": "询问某动作到现在为止是否已经发生（如“吃午饭了吗？”）。",
    "longExplanation": "肯定回答用“Rồi”（已经……了），否定回答用“Chưa”（还没有）。",
    "formation": "主语 + (đã) + 动词 + chưa?",
    "examples": [
      {
        "translation": "你吃午饭了吗，还是还在工作？"
      },
      {
        "translation": "早班火车已经开走了吗？"
      }
    ]
  },
  "vi_a1_23": {
    "title": "... phải không? / đúng không? — 反问确认（……对吧 / 是吗）",
    "shortExplanation": "用于向对方确认自己的猜测或理解是否正确，相当于“……对吧？”。",
    "longExplanation": "对话中只需加在句末，比重复动词更加自然客气。",
    "formation": "陈述句 + phải không / đúng không?",
    "examples": [
      {
        "translation": "这是你第一次来岘港，对吧？"
      },
      {
        "translation": "这家店营业到晚上九点，没错吧？"
      }
    ]
  },
  "vi_a1_24": {
    "title": "... ạ — 礼貌敬语语气词",
    "shortExplanation": "加在问候、回答或请求句末，表示对长辈、师长、客户或陌生人的尊敬客气。",
    "longExplanation": "虽然只有短短一个音节，却能显著提升交流的礼貌得体感。",
    "formation": "句末 + ạ（常与句首 Dạ 呼应）",
    "examples": [
      {
        "translation": "您好，我想点一杯冰奶咖啡。"
      },
      {
        "translation": "好的，非常感谢阿姨！"
      }
    ]
  },
  "vi_a1_25": {
    "title": "... nhé / nha — 亲切建议/叮嘱语气词（……哦/吧）",
    "shortExplanation": "软化邀请、提醒或告别语气，让说话听起来亲切温暖而不生硬。",
    "longExplanation": "不加语气词的祈使句容易显得命令口吻，“nhé / nha”能自然拉近距离。",
    "formation": "建议 / 嘱咐句 + nhé（标准/北方）/ nha（南方）",
    "examples": [
      {
        "translation": "今晚有空的话记得给我打电话哦！"
      },
      {
        "translation": "我把钥匙放桌上了哈。"
      }
    ]
  },
  "vi_a1_26": {
    "title": "ở + 地点 — 居住与地点介词（在……）",
    "shortExplanation": "既可独立作谓语动词“住在/待在某地”，也可作地点介词“在……（做某事）”。",
    "longExplanation": "表示“我在某地”时中间不需要加“là”，直接说“Tôi ở + 地点”。",
    "formation": "主语 + ở + 地点  |  主语 + 动词 + ở + 地点",
    "examples": [
      {
        "translation": "目前我的家人住在芹苴。"
      },
      {
        "translation": "他们在街角的冰茶摊见了面。"
      }
    ]
  },
  "vi_a1_27": {
    "title": "có + 名词 — 拥有（有）与存在（某处有）",
    "shortExplanation": "同时表达“某人拥有某物”和“某处存在某人某物（There is/are）”。",
    "longExplanation": "句首为地点或无主语时，“có”即表示客观存在。",
    "formation": "主语 + có + 名词  |  （地点）+ có + 名词",
    "examples": [
      {
        "translation": "巷口有一家很香的法棍三明治摊。"
      },
      {
        "translation": "我每天都有三十分钟读越南语新闻。"
      }
    ]
  },
  "vi_a1_28": {
    "title": "định + 动词 — 个人打算（打算 / 想……）",
    "shortExplanation": "表达个人心里打算、计划做某事，比正式词汇更口语自然。",
    "longExplanation": "常与“cuối tuần này（这周末）”“tối nay（今晚）”等时间词连用。",
    "formation": "主语 + định + 动词",
    "examples": [
      {
        "translation": "这周末你打算去哪儿玩吗？"
      },
      {
        "translation": "我打算睡前再学二十个新词。"
      }
    ]
  },
  "vi_a1_29": {
    "title": "muốn + 动词 — 想要 / 想做某事",
    "shortExplanation": "直接表达主观愿望或询问他人意愿。",
    "longExplanation": "点餐或请人帮忙时，常配合句末“ạ”或“cho tôi...”让语气更礼貌。",
    "formation": "主语 + muốn + 动词 / 名词",
    "examples": [
      {
        "translation": "我想练好地道的南方口音发音。"
      },
      {
        "translation": "请问您想喝热茶还是冰茶？"
      }
    ]
  },
  "vi_a1_30": {
    "title": "không vs chưa — 否定“不”与未然“还没”的区别",
    "shortExplanation": "“không”表示事实、习惯或拒绝上的“不”；“chưa”仅表示到目前为止“尚未发生”。",
    "longExplanation": "若别人问“吃饭了吗”，回答“还没吃”要说“Tôi chưa ăn”，说成“không”就像拒绝吃饭。",
    "formation": "không + 谓语（不/不是） vs  chưa + 动词（还没有）",
    "examples": [
      {
        "translation": "怕失眠，我晚上不喝咖啡。"
      },
      {
        "translation": "抱歉，我还没来得及看你的消息。"
      }
    ]
  },
  "vi_a1_31": {
    "title": "một ít / nhiều / vài — 基础数量修饰词",
    "shortExplanation": "放在名词前表示“一点儿”“几个”“很多”，越南语名词本身无单复数词尾变化。",
    "longExplanation": "“một ít”多指不可数或少量，“vài”指可数的几个，“nhiều”两者皆可。",
    "formation": "một ít / vài / nhiều (+ 量词) + 名词",
    "examples": [
      {
        "translation": "我只带了一点现金用来买水。"
      },
      {
        "translation": "周末我在老地方见了几个老朋友。"
      }
    ]
  },
  "vi_a1_32": {
    "title": "gì / đâu / ai / nào — 原位疑问词问句",
    "shortExplanation": "越南语疑问词停留在陈述句中对应成分的位置，不需要像英语那样提前到句首。",
    "longExplanation": "语序和汉语一致：例如“Bạn đang xem gì?（你在看什么？）”。",
    "formation": "答语所在位置直接替换为疑问词（gì / ai / ở đâu / nào）",
    "examples": [
      {
        "translation": "你今天在练习听什么主题的内容？"
      },
      {
        "translation": "这附近最好吃的餐馆在哪里？"
      }
    ]
  },
  "vi_a2_17": {
    "title": "动词 + ra — 趋向/发现补语（出来 / 发现）",
    "shortExplanation": "既表示物理上向外的移动（đi ra 走出来），也表示心理或认知上的发现与显现（nhận ra 认出/tìm ra 找到）。",
    "longExplanation": "对应汉语的“出来”，让一般动作动词带有明显的结果感。",
    "formation": "动词 + ra",
    "examples": [
      {
        "translation": "放慢一拍听，我才认出这个连词。"
      },
      {
        "translation": "他们刚查出了导致字幕偏移的小故障。"
      }
    ]
  },
  "vi_a2_18": {
    "title": "动词 + vào / vô — 趋向/着落补语（进去 / 投入某处）",
    "shortExplanation": "表示向内的动作（bước vào 走进），或动作集中施加于某个对象（bấm vào 点击、ghi vào 记进）。",
    "longExplanation": "北方及书面常用“vào”，南方口语中常说“vô”。",
    "formation": "动词 + vào / vô (+ 名词)",
    "examples": [
      {
        "translation": "点击你不认识的单词即可收听标准发音。"
      },
      {
        "translation": "别忘了把好用的短语记进复习本里。"
      }
    ]
  },
  "vi_a2_19": {
    "title": "动词/形容词 + lên / xuống — 升降与增减补语（起来 / 下去）",
    "shortExplanation": "“lên”表示向上、音量升高或程度增强（nói to lên 大声点）；“xuống”表示向下、放慢或缓和（chậm xuống 放慢）。",
    "longExplanation": "经常直接跟在形容词后，表达程度朝上升或下降方向的变化。",
    "formation": "动词 / 形容词 + lên  vs  xuống",
    "examples": [
      {
        "translation": "您能说话稍微大声一点吗？"
      },
      {
        "translation": "太累的时候，他朗读的节奏明显慢了下来。"
      }
    ]
  },
  "vi_a2_20": {
    "title": "动词 + lại — 重复 / 停驻 / 保留 / 回复补语",
    "shortExplanation": "表示重新再做（nghe lại 重听）、停下或保留（dừng lại 停下、lưu lại 保存）以及回敬回应（nhắn lại 回信）。",
    "longExplanation": "越南语最高频结果补语之一，结合前面动词就能轻松判断具体含意。",
    "formation": "动词 + lại",
    "examples": [
      {
        "translation": "难理解的片段，我在看讲解前通常会重听三遍。"
      },
      {
        "translation": "到前面十字路口我们就停下来歇会儿吧。"
      }
    ]
  },
  "vi_a2_21": {
    "title": "动词 + đi — 离去 / 消逝清除 / 催促语气补语",
    "shortExplanation": "表示离开或彻底消除（xóa đi 删掉、quên đi 忘掉），或在祈使句中催促鼓励别人“快……吧”（nói thử đi 试试看吧）。",
    "longExplanation": "根据语境区别“彻底清除”与“亲切催促”两种常见功能。",
    "formation": "动词 + đi",
    "examples": [
      {
        "translation": "别留着旧文件了，删掉给手机减减负吧。"
      },
      {
        "translation": "说错一点没关系，你大胆开口试试看吧！"
      }
    ]
  },
  "vi_a2_22": {
    "title": "动词 + về / qua / sang — 归回 / 经过 / 转向补语",
    "shortExplanation": "“về”表返回原点或家里；“qua”表经过或顺道拜访；“sang”表跨越或切换到另一边/下一环节。",
    "longExplanation": "如“ghé qua（顺便过来）”“chuyển sang（转到……）”都是日常与课堂常用表达。",
    "formation": "动词 + về（回）/ qua（过）/ sang（转过去）",
    "examples": [
      {
        "translation": "今晚下班晚，他九点才回来。"
      },
      {
        "translation": "学完词汇部分后，我们转到听力练习吧。"
      }
    ]
  },
  "vi_a2_23": {
    "title": "动词 + được — 达成与可能补语（做得到 / 成功……了）",
    "shortExplanation": "放在动词【后面】，表示成功取得结果（tìm được 找到了）或有能力做到（nghe được 听清了）。",
    "longExplanation": "注意与放在动词【前面】的“được + 动词（获准/有幸做某事）”区分位置和意思。",
    "formation": "主语 + 动词 + được (+ 宾语)",
    "examples": [
      {
        "translation": "我终于找到了带准确字幕的版本。"
      },
      {
        "translation": "这段说得太快，最后一个词我没听出来。"
      }
    ]
  },
  "vi_a2_24": {
    "title": "动词 + xong — 完结补语（做完……）",
    "shortExplanation": "紧跟动词后，明确表示该动作从头到尾已经完成。",
    "longExplanation": "常用来衔接前后两件事：“V1 + xong + rồi mới + V2（做完某事再……）”。",
    "formation": "主语 + 动词 + xong (+ 宾语)",
    "examples": [
      {
        "translation": "看完这一集我就复习生词表。"
      },
      {
        "translation": "她刚写完发给客户的邮件。"
      }
    ]
  },
  "vi_a2_25": {
    "title": "动词 + mất / hết — 遗失惋惜 vs 全部耗尽",
    "shortExplanation": "“mất”常带走失、忘掉或遗憾损失感（quên mất 忘光了）；“hết”表示用光、吃完或看完全部（xem hết 全看完）。",
    "longExplanation": "放在动作动词后，精确传达结果是“丢/遗憾”还是“全盘完成/耗尽”。",
    "formation": "动词 + mất / hết (+ 宾语)",
    "examples": [
      {
        "translation": "糟了，我完全忘了今天三点有小组会议！"
      },
      {
        "translation": "仅用一个晚上，他就把整套短视频看完了。"
      }
    ]
  },
  "vi_a2_26": {
    "title": "đã từng + 动词 — 人生经历（曾经……过）",
    "shortExplanation": "表示人生中至少有过一次的经历（对应“曾经……过”），而不用于昨天刚做的日常小事。",
    "longExplanation": "否定形式用“chưa từng（从未……过）”。",
    "formation": "主语 + đã từng / chưa từng + 动词",
    "examples": [
      {
        "translation": "你曾经在越南中部生活过吗？"
      },
      {
        "translation": "我曾经试过通过听歌学语言，发现记得特别牢。"
      }
    ]
  },
  "vi_a2_27": {
    "title": "mới + 动词 — 刚刚发生 / 直到那时才……",
    "shortExplanation": "动词前的“mới”有两大核心用法：表示动作刚结束（刚刚），或强调条件满足后（这才）。",
    "longExplanation": "借助语境区分：“vừa mới”多表刚发生，跟在时间或条件后多表“直到……才”。",
    "formation": "主语 + (vừa) mới + 动词  |  时间/条件 + mới + 动词",
    "examples": [
      {
        "translation": "我今天早上才刚下载了这个应用。"
      },
      {
        "translation": "这句话重听了第三遍我才听懂作者的意思。"
      }
    ]
  },
  "vi_a2_28": {
    "title": "vẫn còn — 持续留存（依然还……）",
    "shortExplanation": "强调某种状态、习惯或余量至今依然存在、尚未改变。",
    "longExplanation": "单用“vẫn”已可表“仍然”；叠加“còn”更加凸显比预期持续得更久或仍有剩余。",
    "formation": "主语 + vẫn (còn) + 动词/形容词/名词",
    "examples": [
      {
        "translation": "这个点外面依然还在下毛毛雨。"
      },
      {
        "translation": "离开家乡多年后，他依然保留着非常明显的乡音。"
      }
    ]
  },
  "vi_a2_29": {
    "title": "... nhỉ — 寻求情感共鸣的语气词（……呀 / 是吧）",
    "shortExplanation": "加在感叹或评价句末，温和地邀请对方赞同共鸣或轻声自言自语。",
    "longExplanation": "不同于核实事实的“phải không?”，“nhỉ”更侧重共享情绪；南方口语常见对应词“ha”。",
    "formation": "感叹或评价 + nhỉ",
    "examples": [
      {
        "translation": "这个视频的语法讲解真好懂呀，对吧！"
      },
      {
        "translation": "我们好久没坐在一起喝茶聊天了呢。"
      }
    ]
  },
  "vi_a2_30": {
    "title": "... đấy / đó — 强调提示/提醒语气词（……呢 / ……哟）",
    "shortExplanation": "在告知新鲜情况、真诚称赞或好心提醒注意时加强语气。",
    "longExplanation": "提醒注意或夸赞进步时结尾加上它，语气立刻生动地道。",
    "formation": "陈述或提醒句 + đấy（北方）/ đó（南方）",
    "examples": [
      {
        "translation": "你那句话读得已经非常自然了哟！"
      },
      {
        "translation": "外面路堵得很呢，早点出门哈。"
      }
    ]
  },
  "vi_a2_31": {
    "title": "... cơ mà / mà — 辩解/轻度反驳语气词（明明……嘛）",
    "shortExplanation": "用于在撒娇、温柔反驳或提醒对方原本已知的事实时加强说服力。",
    "longExplanation": "“mà”通用各地，“cơ mà”口语中带有更鲜明的“明明才……”感情色彩。",
    "formation": "理由陈述 + cơ mà / mà",
    "examples": [
      {
        "translation": "别急嘛，我们才刚开始第一周而已呀。"
      },
      {
        "translation": "我昨天明明已经把链接发给你了嘛。"
      }
    ]
  },
  "vi_a2_32": {
    "title": "... chứ — 当然/预期认同语气词（……吧/当然咯）",
    "shortExplanation": "表示自信肯定（那当然啦！），或在问句中带着积极预期向对方确认。",
    "longExplanation": "句尾升调表满怀期待的询问，降调则是笃定自信的肯定。",
    "formation": "陈述/期待问句 + chứ",
    "examples": [
      {
        "translation": "这周末你还是会来参加越南语口语俱乐部吧？"
      },
      {
        "translation": "那当然了，每天学肯定会进步的呀！"
      }
    ]
  },
  "vi_a2_33": {
    "title": "hơn / nhất — 比较级与最高级（更…… / 最……）",
    "shortExplanation": "直接在形容词或动词后面加“hơn”表示比较，加“nhất”表示最高级。",
    "longExplanation": "词形完全不变，结构简洁规则（如 rẻ hơn 更便宜、hay nhất 最棒）。",
    "formation": "A + 形容词/动词 + hơn + B  |  A + 形容词 + nhất",
    "examples": [
      {
        "translation": "听原声音频能让我更快适应语调节奏。"
      },
      {
        "translation": "这是我这个月最喜欢的纪录片。"
      }
    ]
  },
  "vi_a2_34": {
    "title": "giống / khác (+ với) — 相似与差异比较（像 / 不同于）",
    "shortExplanation": "比较两个词语、口音或事物之间是否相似或不同。",
    "longExplanation": "常搭配程度修饰语如“giống y hệt（一模一样）”“khác hoàn toàn（截然不同）”。",
    "formation": "A + giống / khác + (với) + B",
    "examples": [
      {
        "translation": "这两个地区的尾音发音有一点点不同。"
      },
      {
        "translation": "这个词听起来和我昨天学过的一个词很像。"
      }
    ]
  },
  "vi_a2_35": {
    "title": "mà lại — 轻度转折意外（却反而 / 居然……）",
    "shortExplanation": "连接两个让人略感意外、与预期微有反差的事实（如“简短却十分详尽”）。",
    "longExplanation": "比“nhưng（但是）”更具口语惊喜感或轻微反差味道。",
    "formation": "分句1 + mà lại + 出人意料的结果",
    "examples": [
      {
        "translation": "视频只有三分钟，却把每一步都解释得清清楚楚。"
      },
      {
        "translation": "这么大的太阳，居然突然刮起了冷风。"
      }
    ]
  },
  "vi_a2_36": {
    "title": "để + 动词 / 从句 — 目的状语（为了…… / 以便……）",
    "shortExplanation": "直接说明某个行为的目的。",
    "longExplanation": "不论后面直接接动词（để nhớ 为了记住）还是带新主语的完整分句（để bạn hiểu 以便你理解），都用同一个“để”。",
    "formation": "动作 + để (+ 主语) + 目的",
    "examples": [
      {
        "translation": "我开了双语字幕，好边听边对照意思。"
      },
      {
        "translation": "说慢一点，好让刚学的朋友也能跟得上。"
      }
    ]
  },
  "vi_b1_17": {
    "title": "làm cho + 宾语 + 形容词/动词 — 致使结构（使……变得……）",
    "shortExplanation": "表达某事导致他人或某物产生情绪、反应或状态变化。",
    "longExplanation": "日常口语及说明文中极自然常用，“cho”有时可省略以使节奏更紧凑。",
    "formation": "原因 + làm (cho) + 对象 + 状态/动作",
    "examples": [
      {
        "translation": "富有感染力的配音让这篇专题报道一下子更有吸引力了。"
      },
      {
        "translation": "背景音太吵会让人很难集中注意力。"
      }
    ]
  },
  "vi_b1_18": {
    "title": "khiến (cho) + 宾语 + 动词/形容词 — 强致使/引发（令……不禁……）",
    "shortExplanation": "比“làm cho”更具表现力和书面/新闻色彩，突出外界触发的不由自主的强烈反应。",
    "longExplanation": "新闻报道与解说词高频结构（如 khiến nhiều người bất ngờ 令众人惊讶）。",
    "formation": "原因 + khiến (cho) + 对象 + 反应",
    "examples": [
      {
        "translation": "那个突如其来的消息令整个会议室静默了好几秒。"
      },
      {
        "translation": "巧妙的双关语令观众不禁开怀大笑。"
      }
    ]
  },
  "vi_b1_19": {
    "title": "bảo / nhờ / giúp + 某人 + 动词 — 吩咐 / 请托 / 帮助",
    "shortExplanation": "准确区分吩咐告知（bảo）、客气拜托（nhờ）和协助帮忙（giúp）的社交语气。",
    "longExplanation": "请人帮忙尤其是对长辈或不太熟的人时要用“nhờ”，避免用居高临下感较强的“bảo”。",
    "formation": "主语 + bảo / nhờ / giúp + 人 + 动词",
    "examples": [
      {
        "translation": "我拜托母语朋友帮我检查 hỏi 声调的发音。"
      },
      {
        "translation": "老师让全班再听一遍这段对话。"
      }
    ]
  },
  "vi_b1_20": {
    "title": "càng ngày càng — 渐进加深（越来越……）",
    "shortExplanation": "描述某种特征或趋势随着时间推移变得越来越明显。",
    "longExplanation": "口语多说“càng ngày càng”，新闻书面语常用更精炼的“ngày càng”。",
    "formation": "主语 + (càng) ngày càng + 形容词/动词",
    "examples": [
      {
        "translation": "越练习，你会发现听力理解变得越来越轻松。"
      },
      {
        "translation": "YouTube 上的越南语学习内容正变得越来越丰富多样。"
      }
    ]
  },
  "vi_b1_21": {
    "title": "càng ... càng ... — 正比关联（越……越……）",
    "shortExplanation": "表示两个变化成正比同步推进，对应汉语“越……越……”。",
    "longExplanation": "语境清晰时，后半句主语常省略使句子更紧致。",
    "formation": "Càng + 前半句, (主语) + càng + 后半句",
    "examples": [
      {
        "translation": "你听的方言口音越多，耳朵就越灵敏。"
      },
      {
        "translation": "故事越到结尾越扣人心弦。"
      }
    ]
  },
  "vi_b1_22": {
    "title": "suýt nữa thì — 险些发生坏事（差点儿就……）",
    "shortExplanation": "描述令人庆幸最终没真发生的糟糕差错或意外（差点迟到、差点摔了）。",
    "longExplanation": "重要语感：只用于差一点发生的【倒霉事/惊险事】，一般不用于“差点中大奖”这类好事。",
    "formation": "主语 + suýt (nữa) thì + 不希望发生的事",
    "examples": [
      {
        "translation": "今早睡过头，我差点儿就赶不上早班火车了。"
      },
      {
        "translation": "好险，我差点误按成全部删除键了。"
      }
    ]
  },
  "vi_b1_23": {
    "title": "lẽ ra (nên) — 事后反思与虚拟遗憾（本应该……）",
    "shortExplanation": "回头看待过去，指出原本理应怎么做或本来应当发生的结果，常隐含没做到的遗憾。",
    "longExplanation": "后面常衔接“nhưng”或“nếu”对比实际发生的情况。",
    "formation": "Lẽ ra (主语) + nên / đã + 动词 (+ nhưng...)",
    "examples": [
      {
        "translation": "开始录音前，我本该先检查一下麦克风的。"
      },
      {
        "translation": "如果网络没有断断续续，会议本来早就结束得更早了。"
      }
    ]
  },
  "vi_b1_24": {
    "title": "hóa ra (là) — 恍然大悟/事实真相（原来……）",
    "shortExplanation": "揭示后来才发现的真实情况，常与原先的猜测或误解形成反转。",
    "longExplanation": "极常与“tưởng（原以为）”搭配，讲故事时制造反转效果很好用。",
    "formation": "（原以为……）hóa ra (là) + 真相",
    "examples": [
      {
        "translation": "起初以为这个生词很复杂，结果原来是由两个熟字拼起来的。"
      },
      {
        "translation": "敢情你们俩早就上过同一所高中啊！"
      }
    ]
  },
  "vi_b1_25": {
    "title": "thảo nào / hèn gì — 恍然恍悟的感叹（怪不得 / 难怪……）",
    "shortExplanation": "听到原因后立刻豁然开朗、解释通先前疑惑时的感叹，等价于“怪不得！”。",
    "longExplanation": "北方及书面常用“thảo nào”，南方日常多说“hèn gì / hèn chi”。",
    "formation": "Thảo nào / Hèn gì + 结果",
    "examples": [
      {
        "translation": "哦，她在顺化住过五年——怪不得口音那么甜！"
      },
      {
        "translation": "刚才外面一直在下大雨，难怪天气一下子凉爽了这么多。"
      }
    ]
  },
  "vi_b1_26": {
    "title": "thà ... còn hơn — 宁可选择（宁愿……也不/总比……强）",
    "shortExplanation": "在两个不尽如人意或各有代价的选项中，果断倾向前者以避开后者。",
    "longExplanation": "比普通“thích...hơn”更具取舍决心，适合表达鲜明态度。",
    "formation": "Thà + 选择A + còn hơn (là) + 选择B",
    "examples": [
      {
        "translation": "我宁愿把五句话学透，也比走马观花刷五十句强。"
      },
      {
        "translation": "宁可多问一句确认清楚，也比瞎猜用错强。"
      }
    ]
  },
  "vi_b1_27": {
    "title": "miễn là — 唯一底线条件（只要……就行）",
    "shortExplanation": "表示其他方面都好商量，只要满足这一个关键前提即可。",
    "longExplanation": "适合协商约定或制定弹性计划，对应“只要……”。",
    "formation": "主句, miễn là + 唯一条件",
    "examples": [
      {
        "translation": "语速快慢不重要，只要每个声调发清楚就行。"
      },
      {
        "translation": "每天什么时候学都可以，只要坚持每天十分钟就好。"
      }
    ]
  },
  "vi_b1_28": {
    "title": "trừ khi — 唯一例外条件（除非……）",
    "shortExplanation": "说明主句情况普遍成立，唯独出现后面这种例外情形时才会改变。",
    "longExplanation": "对应英语“unless”，无需再额外加否定词。",
    "formation": "主句, trừ khi + 例外情况",
    "examples": [
      {
        "translation": "今晚我们小组学习照常进行，除非下起暴风雨。"
      },
      {
        "translation": "不要从一开始就打开翻译，除非那句话确实太难。"
      }
    ]
  },
  "vi_b1_29": {
    "title": "nhân tiện — 顺便 / 顺带一提",
    "shortExplanation": "趁着眼前的出行或话题，顺手办另一件事，或像“by the way”一样顺便问一句。",
    "longExplanation": "既可用于物理“顺路/顺手”，也可用于对话中自然引出补充话题。",
    "formation": "（原有情境）, nhân tiện + 附带行动或话题",
    "examples": [
      {
        "translation": "我去超市买牛奶，顺便去书店拿了词典。"
      },
      {
        "translation": "趁着你正打开那个文件，顺便帮我看一下最后一行吧。"
      }
    ]
  },
  "vi_b1_30": {
    "title": "hình như / có vẻ như — 委婉推测（好像…… / 似乎……）",
    "shortExplanation": "把握不是百分之百时用来委婉表达判断，避免说得太绝对。",
    "longExplanation": "“hình như”偏记忆或直觉猜想，“có vẻ (như)”偏根据眼前听见或看到的迹象作判断。",
    "formation": "Hình như / Có vẻ (như) + 从句",
    "examples": [
      {
        "translation": "这集字幕好像比声音快了一秒左右。"
      },
      {
        "translation": "练了两周之后，你的声音听起来明显自信多了。"
      }
    ]
  },
  "vi_b1_31": {
    "title": "chẳng qua là — 轻描淡写揭示实情（只不过是因为……罢了）",
    "shortExplanation": "把看似复杂或令人多心的事情归结为一个其实很简单的实质原因。",
    "longExplanation": "句尾常搭配“thôi”让解释听起来更加平和宽慰。",
    "formation": "现象 + chẳng qua (chỉ) là + 简单原因 (+ thôi)",
    "examples": [
      {
        "translation": "他没生气，只不过是一门心思赶完报告罢了。"
      },
      {
        "translation": "起初听着陌生，只不过是因为你还不习惯南方语调。"
      }
    ]
  },
  "vi_b1_32": {
    "title": "vậy mà / thế mà — 出乎意料的强转折（可结果却…… / 偏偏……）",
    "shortExplanation": "前后对比鲜明，表达对完全违背常理或预期结果的惊讶感。",
    "longExplanation": "比普通“nhưng”带有更明显的情绪反差。",
    "formation": "前提; vậy mà / thế mà + 反常结果",
    "examples": [
      {
        "translation": "今早预报还说全天晴朗，可结果下午却下起大雨。"
      },
      {
        "translation": "这个词看着这么长，可发音却非常规律。"
      }
    ]
  },
  "vi_b1_33": {
    "title": "... chứ không phải ... — 明确纠偏对比（是 A 而不是 B）",
    "shortExplanation": "干脆利落地澄清常见混淆，明确指出真正成立的是 A 而非 B。",
    "longExplanation": "讲解词义辨析或阐述原则重点时非常清晰有力。",
    "formation": "正确项 A + chứ không phải + 排除项 B",
    "examples": [
      {
        "translation": "这句里的“chỉ”是强调副词，而不是“指向”那个动词。"
      },
      {
        "translation": "关键在于理解语境，而不是逐字零散翻译。"
      }
    ]
  },
  "vi_b1_34": {
    "title": "không những ... mà còn ... — 递进叠加（不仅……而且……）",
    "shortExplanation": "在第一点基础上再叠加一个往往更有分量的优点或事实。",
    "longExplanation": "与“không chỉ ... mà còn ...”完全等价，在口语和书面语中都极其常见。",
    "formation": "主语 + không những / không chỉ + A + mà còn + B",
    "examples": [
      {
        "translation": "看带字幕的视频不仅能提升听力，还能扩充词汇量。"
      },
      {
        "translation": "她不仅说得流利，而且还能准确拿捏各地方言的语调。"
      }
    ]
  },
  "vi_b1_35": {
    "title": "nếu ... thì ... — 标准条件句（如果……就……）",
    "shortExplanation": "越南语最核心的条件结构——哪怕英语常省去“then”，越南语后半句通常保留“thì”。",
    "longExplanation": "日常简短句常省略句首“nếu”，只保留中间的“thì”（如 Rảnh thì ghé chơi 有空就来玩）。",
    "formation": "Nếu + 条件, thì + 结果",
    "examples": [
      {
        "translation": "如果遇到陌生的习语，点一下就能看解释哦。"
      },
      {
        "translation": "要是昨天没下大雨，野餐本来会玩得特别开心。"
      }
    ]
  },
  "vi_b1_36": {
    "title": "vừa ... vừa ... — 同步进行 / 双重特点（一边……一边…… / 既……又……）",
    "shortExplanation": "表示两个动作同时发生，或同一个事物兼备两种性质。",
    "longExplanation": "搭配动词相当于“一边……一边……”，搭配形容词相当于“既……又……”。",
    "formation": "主语 + vừa + A + vừa + B",
    "examples": [
      {
        "translation": "我喜欢一边煮早咖啡一边听简短新闻。"
      },
      {
        "translation": "这款应用设计得既轻巧又方便查生词。"
      }
    ]
  },
  "vi_b2_17": {
    "title": "重叠词 AABB / ABAB — 细微语感与节奏描写",
    "shortExplanation": "通过声音、声调或词素重叠来弱化程度、加重语气或营造画面节奏感。",
    "longExplanation": "声调转平的二字重叠常减轻程度（đo đỏ 微红），ABAB/AABB 多写动作往复与神态。",
    "formation": "部分重叠（nhè nhẹ 轻轻地）/ 动作往复（đi đi lại lại 走来走去）",
    "examples": [
      {
        "translation": "秋日傍晚微凉，微风轻轻吹过林荫树梢。"
      },
      {
        "translation": "他因为紧张一直在考场门前来回踱步。"
      }
    ]
  },
  "vi_b2_18": {
    "title": "动词 + đi + 动词 + lại — 反复进行强调（一再…… / 反复……）",
    "shortExplanation": "把同一个动词放在“đi”和“lại”前面，生动强调动作一次次重复。",
    "longExplanation": "学习、交流中极地道：如“nghe đi nghe lại（反复重听）”“nói đi nói lại（再三嘱咐）”。",
    "formation": "主语 + 动词 + đi + 动词 + lại",
    "examples": [
      {
        "translation": "那句话我反复听了五遍才听清连读。"
      },
      {
        "translation": "把短对话反复朗读，直到流利为止。"
      }
    ]
  },
  "vi_b2_19": {
    "title": "làm gì có / làm sao mà — 口语反问否定（哪有什么…… / 怎么可能……）",
    "shortExplanation": "用强烈反问语气一口否定某事存在或指出其根本不可能。",
    "longExplanation": "虽带疑问词，实质是语气鲜明的“绝对没有/怎么可能做到”。",
    "formation": "Làm gì có + 事!  |  Làm sao mà + 动词 + được!",
    "examples": [
      {
        "translation": "哪有学一个晚上就能记住一千个词这种事！"
      },
      {
        "translation": "不开声音怎么可能分辨得出声调呢！"
      }
    ]
  },
  "vi_b2_20": {
    "title": "đâu có (... đâu) — 自然口语澄清否定（哪儿有…… / 并没……）",
    "shortExplanation": "比“không”更地道地澄清误解或温和反驳，句末常呼应“đâu”。",
    "longExplanation": "常用来辩解“我哪有那样嘛”或“其实根本没有想象中那么……”。",
    "formation": "主语 + đâu (có) + 谓语 (+ đâu)",
    "examples": [
      {
        "translation": "我哪儿有挑刺啊，只是提个小建议让它更好听懂而已。"
      },
      {
        "translation": "今天的听力根本没有我们昨天想象得那么难。"
      }
    ]
  },
  "vi_b2_21": {
    "title": "chẳng lẽ lại — 难以置信的反问（难道……不成？ / 莫非……）",
    "shortExplanation": "面对似乎不合常理的情况，以惊愕或将信将疑的语气发问。",
    "longExplanation": "中间加“lại”更凸显“怎么偏偏就……”的惊讶感。",
    "formation": "Chẳng lẽ (+ 主语) + lại + 反常事态 (+ sao/à)?",
    "examples": [
      {
        "translation": "难道这一整周你连复习书都没翻开过一次吗？"
      },
      {
        "translation": "这么简单的词，莫非我还能听岔成别的意思不成？"
      }
    ]
  },
  "vi_b2_22": {
    "title": "bất chấp — 不顾 / 顶着困难（尽管……依然……）",
    "shortExplanation": "表达不顾恶劣条件、风险或阻力仍执意推进或坚持的态度。",
    "longExplanation": "比“mặc dù”语气更坚决有力，兼具正向“顶住困难”与负向“无视规定”两类语境。",
    "formation": "Bất chấp + 阻碍/风险, 主句",
    "examples": [
      {
        "translation": "尽管风雨交加，语言交流会依然座无虚席。"
      },
      {
        "translation": "不管工作日程多忙，她都每天坚持学习。"
      }
    ]
  },
  "vi_b2_23": {
    "title": "nhờ có ... mới ... — 归功关键助力（多亏了……才……）",
    "shortExplanation": "突出某一关键帮助或良好条件促成了积极成果。",
    "longExplanation": "专门用于正面结果；如果是负面后果的归因，需换用“tại / chỉ tại”。",
    "formation": "Nhờ (có) + 积极因素, 主语 + mới + 好结果",
    "examples": [
      {
        "translation": "多亏了录音回听的习惯，我的发音才进步得这么快。"
      },
      {
        "translation": "多亏您及时提醒，我们才避免了这个错误。"
      }
    ]
  },
  "vi_b2_24": {
    "title": "do / bởi vì ... nên mới ... — 强调型因果链（正是因为……才……）",
    "shortExplanation": "收紧因果逻辑，强调前面这个原因直接解释了为何出现后面的具体结果。",
    "longExplanation": "后半句加入“mới”突出“所以才……”，逻辑解析与说明文极常用。",
    "formation": "Do / Bởi vì + 原因, nên (+ 主语) + mới + 结果",
    "examples": [
      {
        "translation": "正是因为很多复合词来自汉越词，初学者才常觉得偏抽象。"
      },
      {
        "translation": "因为字幕按短意群切分，学习者才来得及跟着声音同步阅读。"
      }
    ]
  },
  "vi_b2_25": {
    "title": "nói gì thì nói — 归结底线共识（不管怎么说 / 话虽如此但归根结底）",
    "shortExplanation": "先搁置各种细枝末节的争论，最后稳稳落到最无可否认的关键事实。",
    "longExplanation": "播客评论与日常讨论中非常地道的总结过渡句。",
    "formation": "Nói gì thì nói, + 核心结论",
    "examples": [
      {
        "translation": "不管怎么说，扎实的语音基础对新手来说依然是关键。"
      },
      {
        "translation": "说到底，能靠自己听懂现实生活中的对话才最有成就感。"
      }
    ]
  },
  "vi_b2_26": {
    "title": "xét cho cùng — 归根结底评价（说到底 / 归根结底）",
    "shortExplanation": "跳出表面细节，全面权衡利弊后得出的本质性总结。",
    "longExplanation": "语气比“nói gì thì nói”更理性沉稳，适合深度评论与总结。",
    "formation": "Xét cho cùng, + 总结性结论",
    "examples": [
      {
        "translation": "归根结底，学语言的目的就是为了理解并与人交流。"
      },
      {
        "translation": "说到底，小错误反而能帮我们把正确用法记得更牢。"
      }
    ]
  },
  "vi_b2_27": {
    "title": "trước sau gì cũng — 必然结局（迟早都会…… / 早晚会……）",
    "shortExplanation": "表示只是早晚问题，某件事终究一定会发生。",
    "longExplanation": "前半“trước sau gì”与后半“cũng”固定配套呼应。",
    "formation": "Trước sau gì (+ 主语) + cũng + 结果",
    "examples": [
      {
        "translation": "只要每天坚持接触，迟早有一天你能自然脱口而出。"
      },
      {
        "translation": "这个问题咱们迟早都得摊开来认真谈一次。"
      }
    ]
  },
  "vi_b2_28": {
    "title": "chỉ tại — 归咎负面主因（都怪…… / 就因为……）",
    "shortExplanation": "将不理想的结果直接归因于某一个令人懊恼的起因，正好与“nhờ có”相反。",
    "longExplanation": "既可表达真诚懊悔，也常用于熟人间的撒娇埋怨。",
    "formation": "（不良后果）+ chỉ tại + 归咎原因",
    "examples": [
      {
        "translation": "都怪昨晚熬夜追完那部剧，今天早上困得不行。"
      },
      {
        "translation": "我会忘掉答案，也全是因为两天后没有再复习一遍。"
      }
    ]
  },
  "vi_b2_29": {
    "title": "vừa mới ... đã ... — 瞬息紧接 / 惊讶之快（刚……就已经……）",
    "shortExplanation": "强调两个事件衔接极快，或者结果来得比预想的早得多。",
    "longExplanation": "带有显著的惊叹、赞叹或意外感。",
    "formation": "主语 + vừa mới + 动作1 + (mà) đã + 动作2",
    "examples": [
      {
        "translation": "视频才刚发出去十分钟，就已经有好几百条评论了。"
      },
      {
        "translation": "才学了没几天，你已经能听懂这么多句话了呀。"
      }
    ]
  },
  "vi_b2_30": {
    "title": "chưa ... đã ... — 抢跑/操之过急（还没……就已经……）",
    "shortExplanation": "指出第一步还没完成或来不及进行，第二步就已经迫不及待地发生了。",
    "longExplanation": "“chưa（尚未）”和“đã（已经）”形成极鲜明对比，既能提醒别急功近利，也可形容反应神速。",
    "formation": "主语 + chưa (kịp) + 动作A + (mà) đã + 动作B",
    "examples": [
      {
        "translation": "很多同学一句话还没听完，就已经急着逐字查词了。"
      },
      {
        "translation": "研讨会还没来得及结束，观众就已经排起队求签名了。"
      }
    ]
  },
  "vi_b2_31": {
    "title": "đến mức (mà) — 程度达到极致（达到……的地步 / 以至于……）",
    "shortExplanation": "形容某种状态、能力或程度强烈到惊人的临界点。",
    "longExplanation": "表现力远强于普通“quá”，正面赞叹或负面夸张皆可使用。",
    "formation": "状态/动作 + đến mức (mà) + 极致后果",
    "examples": [
      {
        "translation": "那段喜剧小品精彩到我反复重看还是笑不停。"
      },
      {
        "translation": "她跟读练得标准到好多人以为她是河内土生土长的。"
      }
    ]
  },
  "vi_b2_32": {
    "title": "tùy theo / tùy thuộc vào — 视情况而定（根据…… / 取决于……）",
    "shortExplanation": "指明做法、选择或效果随具体条件而灵活变化。",
    "longExplanation": "“tùy theo”常引出分类建议，“tùy thuộc vào”偏重客观因果依赖分析。",
    "formation": "结果或做法 + tùy theo / tùy thuộc vào + 变量条件",
    "examples": [
      {
        "translation": "根据目标是日常交流还是考试，选择适合你的词库。"
      },
      {
        "translation": "记生词的速度还取决于你在真实语境中复现它的频率。"
      }
    ]
  },
  "vi_b2_33": {
    "title": "trái ngược với — 鲜明对立（与……截然相反 / 相反的是）",
    "shortExplanation": "把一种现实、印象或特点摆在另一面的正对立位置加以凸显。",
    "longExplanation": "对比“khác với（不同）”，更突出鲜明反差或出乎意料的反面。",
    "formation": "Trái ngược với + A, B",
    "examples": [
      {
        "translation": "与最初的担忧截然相反，这场演讲进行得非常顺利。"
      },
      {
        "translation": "他生活中的声音低沉温和，和剧中严厉的角色恰恰相反。"
      }
    ]
  },
  "vi_b2_34": {
    "title": "có ... đi (chăng) nữa thì ... cũng — 极端假设让步（哪怕再……也依然……）",
    "shortExplanation": "把让步条件推向极端程度，反衬主句信念或结果毫不动摇。",
    "longExplanation": "加上“đi chăng nữa”后比单纯的“dù”更具感染力与决心。",
    "formation": "(Dù) có + 极端假设 + đi (chăng) nữa, thì + vẫn/cũng...",
    "examples": [
      {
        "translation": "哪怕演讲再长，每次拆成五句话一段也照样轻松攻克。"
      },
      {
        "translation": "哪怕忙到天翻地覆，也要守住每天听十分钟的习惯。"
      }
    ]
  },
  "vi_c1_17": {
    "title": "xét về phương diện — 专业维度切入分析（从……方面来看）",
    "shortExplanation": "在评论、演讲或学术分析开头，精准限定当前评价所依据的专业视角。",
    "longExplanation": "比“về mặt”更为正式书面，适合深入讨论。",
    "formation": "Xét về phương diện + 抽象维度, 主句",
    "examples": [
      {
        "translation": "从语音学角度来看，这两种方言依然完整保留了基本声调体系。"
      },
      {
        "translation": "从实践角度而言，按自然意群词块学习能节省更多时间。"
      }
    ]
  },
  "vi_c1_18": {
    "title": "không ngoại trừ khả năng — 严谨保留推论（不排除……的可能性）",
    "shortExplanation": "新闻与专业分析常用措辞，在不下武断结论的同时保留重要假设空间。",
    "longExplanation": "体现理性克制与客观严谨。",
    "formation": "Không ngoại trừ khả năng + 假设从句",
    "examples": [
      {
        "translation": "不排除外来词的发音日后还会随时间进一步演变。"
      },
      {
        "translation": "主办方不排除周末加开一场交流会的可能。"
      }
    ]
  },
  "vi_c1_19": {
    "title": "về bản chất — 直指本质（本质上 / 从根本上讲）",
    "shortExplanation": "穿透表面现象，直截了当地点明事物运作的底层逻辑或核心属性。",
    "longExplanation": "讲解抽象机制或辨析表面差异时非常提纲挈领。",
    "formation": "Về bản chất, + 核心界定",
    "examples": [
      {
        "translation": "从本质上讲，间隔重复就是在快要遗忘前优化复习时机。"
      },
      {
        "translation": "本质上这两个结构表达相同含义，只是正式程度不同。"
      }
    ]
  },
  "vi_c1_20": {
    "title": "một mặt ... mặt khác ... — 双维度平衡论证（一方面……，另一方面……）",
    "shortExplanation": "把彼此互补或需要权衡的两个侧面公允地并列对比，展现辩证思维。",
    "longExplanation": "高阶评论、论文和深度视频分析的标准骨架。",
    "formation": "Một mặt, + 维度一; mặt khác, + 维度二",
    "examples": [
      {
        "translation": "一方面字幕能减轻新手的畏难感；另一方面我们也要逐步练习关掉字幕。"
      },
      {
        "translation": "一方面需要保持复习纪律，另一方面也不要给自己施加过大压力。"
      }
    ]
  },
  "vi_c1_21": {
    "title": "căn cứ vào / dựa trên — 基于实证依据（根据…… / 基于……）",
    "shortExplanation": "将判断或结论牢牢锚定在数据、准则或实际证据上。",
    "longExplanation": "“căn cứ vào”偏法规准则依据，“dựa trên”更常用于实证数据与模型基础。",
    "formation": "Căn cứ vào / Dựa trên + 证据或标准, + 结论",
    "examples": [
      {
        "translation": "根据使用频率，这组词应当优先学习。"
      },
      {
        "translation": "系统会基于每句话的真实语境来推荐词汇。"
      }
    ]
  },
  "vi_c1_22": {
    "title": "đứng trên góc độ — 切换审视立场（站在……的角度来看）",
    "shortExplanation": "在发表评论前先明确自己是从哪一方参与者或哪个学科视角切入。",
    "longExplanation": "多方利益或多元学科讨论中既客观又有分寸感。",
    "formation": "Đứng trên góc độ + 角色或学科, + 评价",
    "examples": [
      {
        "translation": "站在学习者的角度来看，清爽的字幕能明显减轻视觉疲劳。"
      },
      {
        "translation": "从语言学角度出发，重叠词承担着营造独特韵律感的作用。"
      }
    ]
  },
  "vi_c1_23": {
    "title": "kéo theo hệ lụy — 引发连锁后果（带来一连串负面后果）",
    "shortExplanation": "警示某项做法或现象会引发骨牌式的连带不良后果。",
    "longExplanation": "新闻与深度评论高频搭配，“hệ lụy”即连带不良后果。",
    "formation": "问题根源 + kéo theo hệ lụy",
    "examples": [
      {
        "translation": "脱离语境死记硬背，往往会带来容易混淆词义的弊端。"
      },
      {
        "translation": "长期睡眠不足会给专注力带来诸多连锁负面影响。"
      }
    ]
  },
  "vi_c1_24": {
    "title": "góp phần không nhỏ — 含蓄褒奖重要贡献（发挥了不小的作用 / 功不可没）",
    "shortExplanation": "以“不小”这一克制措辞得体地高度肯定某个因素的重要作用。",
    "longExplanation": "在致谢发言、报告与新闻报道中比直白说“非常大”更显儒雅地道。",
    "formation": "关键因素 + góp phần không nhỏ + vào / trong + 成果",
    "examples": [
      {
        "translation": "每天早上的泛听对提升声音敏感度起到了不小的作用。"
      },
      {
        "translation": "社区用户的反馈为完善新功能做出了重要贡献。"
      }
    ]
  },
  "vi_c1_25": {
    "title": "tuy nhiên vẫn phải thừa nhận — 客观公正的让步（不过仍须承认……）",
    "shortExplanation": "在提出异议或批评的同时，坦诚认可对方合理之处或客观优点，让立论更令人信服。",
    "longExplanation": "高级辩论与深度书评/影评常见句式。",
    "formation": "批评或观点一。Tuy nhiên, vẫn phải thừa nhận (rằng) + 合理一面",
    "examples": [
      {
        "translation": "这份资料略显冗长，不过仍须承认它的例句体系非常丰富。"
      },
      {
        "translation": "自然语速起初不好听懂，但不得不承认它能让耳朵适应得很快。"
      }
    ]
  },
  "vi_c1_26": {
    "title": "làm dấy lên lo ngại — 引发广泛担忧（引发对……的忧虑）",
    "shortExplanation": "新闻和评论标准搭配，表达某现象在公众或学界引起担忧波澜。",
    "longExplanation": "动词“dấy lên（掀起、唤起）”形象生动，是典型的高阶书面语搭配。",
    "formation": "事件或趋势 + làm dấy lên lo ngại (về / rằng) + 忧虑内容",
    "examples": [
      {
        "translation": "过度依赖机器翻译引发了人们对独立思考能力的担忧。"
      },
      {
        "translation": "地方方言的式微正引发学界的忧虑。"
      }
    ]
  },
  "vi_c2_01": {
    "title": "âu cũng là — 豁达哲思（倒也未尝不是 / 想来也算……）",
    "shortExplanation": "带有文学沉思气息的表达，面对波折时豁达视之，觉得“未尝不是一种安排/历练”。",
    "longExplanation": "极具东方文学韵味，从容克制而不生硬。",
    "formation": "（不如意处）, âu cũng là + 宽慰领悟",
    "examples": [
      {
        "translation": "行程临行前改期，倒也未尝不是全家人趁机休整的好机会。"
      },
      {
        "translation": "起步时遇到些磨难，想来也算是磨炼耐心的一场考验。"
      }
    ]
  },
  "vi_c2_02": {
    "title": "há chẳng phải ... sao — 古典修辞反问（岂不正是……吗）",
    "shortExplanation": "借庄重有力的反问强烈唤醒读者共鸣，实则笃定肯定该道理。",
    "longExplanation": "常见于散文、演讲与文化评论，颇具古雅雄辩色彩。",
    "formation": "Há chẳng phải + 显见道理 + sao?",
    "examples": [
      {
        "translation": "学习一门新语言，岂不正是多开了一扇看世界的窗吗？"
      },
      {
        "translation": "每天稳步迈出一小步，岂不正是持久进步最可靠的秘诀吗？"
      }
    ]
  },
  "vi_c2_03": {
    "title": "chẳng qua chỉ là ... mà thôi — 犀利收束本质（说穿了不过只是……罢了）",
    "shortExplanation": "用冷峻克制的文风剥去浮夸修饰，一针见血地指出其本质不过如此。",
    "longExplanation": "句末“mà thôi”收束有力，极具评论锐度。",
    "formation": "被夸大的事物 + chẳng qua chỉ là + 朴素实质 + mà thôi",
    "examples": [
      {
        "translation": "那些听上去高深的术语，说穿了不过是旧规则的新叫法罢了。"
      },
      {
        "translation": "害怕说错的心理，归根结底不过是自己筑起的心墙而已。"
      }
    ]
  },
  "vi_c2_04": {
    "title": "thiết nghĩ — 谦谨庄重地发表见解（窃以为 / 在下愚见）",
    "shortExplanation": "兼具谦逊礼节与分量感的高阶书面开篇词，用于提出慎重思考过的看法或建议。",
    "longExplanation": "不张扬却很有说服力，适合书信、评论与发言。",
    "formation": "Thiết nghĩ, + 严肃建言",
    "examples": [
      {
        "translation": "窃以为，与其死背数百个冷僻句式，不如先打磨好核心词汇。"
      },
      {
        "translation": "窃以为学校应当拿出更多时间开展真实交际练习。"
      }
    ]
  },
  "vi_c2_05": {
    "title": "khó lòng (mà) — 委婉指出难以达成（很难…… / 恐怕难以……）",
    "shortExplanation": "比生硬说“không thể（不可能）”更委婉体面地指出客观限制下几乎难以实现。",
    "longExplanation": "既讲情理又有分寸，是极地道的高阶书面与外交措辞。",
    "formation": "主语 + khó lòng (mà) + 动词",
    "examples": [
      {
        "translation": "不接触真实语境，就很难充分体会到那些微妙的语感差异。"
      },
      {
        "translation": "光指望几周突击恶补，恐怕很难练出自然的语言反应。"
      }
    ]
  },
  "vi_c2_06": {
    "title": "dẫn tới hệ quả tất yếu — 必然推演后果（导致必然结果）",
    "shortExplanation": "指出某一后果并非偶然巧合，而是结构性原因合乎逻辑的必然产物。",
    "longExplanation": "常见于深度评论、学术剖析与政策论证。",
    "formation": "深层原因 + dẫn tới hệ quả tất yếu (là) + 结局",
    "examples": [
      {
        "translation": "忽视初期发音训练，势必导致日后接连听错。"
      },
      {
        "translation": "削减长期投入，必然会带来质量落后的后果。"
      }
    ]
  },
  "vi_c2_07": {
    "title": "nếu không muốn nói là — 修辞层层加码（即使不说成是…… / 甚至可以说……）",
    "shortExplanation": "先用克制分寸词铺垫，紧接着递进到更有冲击力的准确评价。",
    "longExplanation": "先抑后扬、留有余地又加重分量，深谙高阶评论表达之道。",
    "formation": "较温和措辞, nếu không muốn nói là + 更强措辞",
    "examples": [
      {
        "translation": "那个解释相当含糊，甚至可以说极易让人彻底误解。"
      },
      {
        "translation": "全班的进步速度相当可观，甚至可以说远超预期。"
      }
    ]
  },
  "vi_c2_08": {
    "title": "dù muốn dù không — 客观现实使然（不管愿不愿意 / 无论喜不喜欢）",
    "shortExplanation": "对称工整地指出某种潮流或现实不会以个人意愿为转移。",
    "longExplanation": "比直白口语更有节奏分量，常用于社会观察与深度长谈。",
    "formation": "Dù muốn dù không, + 客观事实",
    "examples": [
      {
        "translation": "不管你愿不愿意，网络俚语依然会悄悄渗入日常口语。"
      },
      {
        "translation": "无论喜不喜欢，我们都必须适应现实中自然的说话节奏。"
      }
    ]
  },
  "vi_c2_09": {
    "title": "lấy ... làm trọng — 奉为首要原则（以……为重）",
    "shortExplanation": "极具文化底蕴的表达，指把某一核心原则或价值观放在首位加以珍视。",
    "longExplanation": "如传统熟语“lấy chữ tín làm trọng（以信为重）”，大气典雅。",
    "formation": "（主体）lấy + 核心价值 + làm trọng",
    "examples": [
      {
        "translation": "练习实战口语时，应当以自信和自然为重。"
      },
      {
        "translation": "专业译者始终把忠于原作放在第一位。"
      }
    ]
  },
  "vi_c2_10": {
    "title": "một khi đã ... thì ắt ... — 不可逆必然条件（一旦……就必然会……）",
    "shortExplanation": "强调只要跨过前半句的关键节点，后半句的后果就会顺理成章地必然到来。",
    "longExplanation": "助词“ắt（必将/势必）”书卷气浓厚，断言力度十足。",
    "formation": "Một khi đã + 前提, thì ắt (+ sẽ) + 必然结果",
    "examples": [
      {
        "translation": "一旦摸清拼读规律，你势必能读出绝大多数生词。"
      },
      {
        "translation": "一旦立下明确承诺，团队必将齐心行动。"
      }
    ]
  },
  "vi_c2_11": {
    "title": "không khỏi + 心理情感动词 — 情难自已（不禁 / 难免感到……）",
    "shortExplanation": "典雅细腻的书面表达，描绘内心自然涌起、难以遏制的情感触动。",
    "longExplanation": "常搭配“xúc động（感动）、ngỡ ngàng（惊叹）、chạnh lòng（触景生情）”等细腻词汇。",
    "formation": "主语 + không khỏi + 情感或心理动词",
    "examples": [
      {
        "translation": "重听旧录音里亲人的声音，人人都禁不住动容。"
      },
      {
        "translation": "读着那些朴实的文字，读者不禁会心一笑、深感共鸣。"
      }
    ]
  },
  "vi_c2_12": {
    "title": "vô hình trung — 无意中酿成效应（无形之中 / 不知不觉间）",
    "shortExplanation": "源自汉语“无形之中”的高阶副词，指出原本无意之举却在暗地里促成了深远后果。",
    "longExplanation": "适合深入分析潜移默化的文化或习惯影响。",
    "formation": "做法 A + vô hình trung + 潜在效果 B",
    "examples": [
      {
        "translation": "只看带现成翻译的视频，无形之中会让耳朵养成依赖文字的习惯。"
      },
      {
        "translation": "每晚聊天的习惯无形之中拉近了全家人彼此的距离。"
      }
    ]
  },
  "vi_c2_13": {
    "title": "(không) nhất thiết phải — 严格必要性（未必非要…… / 务必必须……）",
    "shortExplanation": "界定是否“非此不可”；尤常以否定形式“không nhất thiết phải（倒不一定非得……）”缓解教条压力。",
    "longExplanation": "比“phải”更具精准分寸感，专业指引与正式规范常用。",
    "formation": "主语 + (không) nhất thiết phải + 动词",
    "examples": [
      {
        "translation": "刚开始练听力时，你倒不一定非得立刻听懂每一个词。"
      },
      {
        "translation": "为保证系统稳定运行，设备必须定期更新。"
      }
    ]
  },
  "vi_c2_14": {
    "title": "tựu trung lại — 提纲挈领收束全篇（总而言之 / 归拢来说）",
    "shortExplanation": "比日常的“tóm lại（总之）”更为典雅庄重，把繁杂论据汇归于一语。",
    "longExplanation": "字面意为“归于核心”，适合演讲收尾与学术总结。",
    "formation": "Tựu trung (lại), + 精炼总括",
    "examples": [
      {
        "translation": "总而言之，可持续发展的关键依然在于教育质量。"
      },
      {
        "translation": "归根结底，一切行之有效的方法都围绕着持续接触展开。"
      }
    ]
  },
  "vi_c2_15": {
    "title": "biết bao nhiêu mà kể — 深情无限咏叹（数不胜数 / 何止万千）",
    "shortExplanation": "富有诗意与感染力的句尾感叹，表达感恩、怀念或付出深沉得难以计量。",
    "longExplanation": "散文、回忆录与致谢演说中极动人的一笔。",
    "formation": "情感或往事 + biết bao nhiêu mà kể",
    "examples": [
      {
        "translation": "学生时代聚在一起复习的美好回忆真是数也数不完。"
      },
      {
        "translation": "老师们的无私奉献激励了多少代人，实在难以尽述。"
      }
    ]
  },
  "vi_c2_16": {
    "title": "thử hỏi — 犀利设问发人深省（试问……）",
    "shortExplanation": "对应汉语“试问”，不直接说教，而是以冷静而锐利的发问引导听众自行审视逻辑。",
    "longExplanation": "辩论、社评与演讲中极具思辨力的高阶句首语。",
    "formation": "Thử hỏi (+ 假设), + 思辨反问",
    "examples": [
      {
        "translation": "试问如果人人都因怕错而不敢开口，语言又怎能鲜活起来呢？"
      },
      {
        "translation": "试问世上有哪项持久成就不是靠默默坚持得来的呢？"
      }
    ]
  }
};

const fs = require('fs');
const path = require('path');
const { FORMATION_TERMS, translateTitle } = require('./sentence-engine');

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function translateFormation(formation, targetLang) {
  if (!formation) return '';
  const dict = FORMATION_TERMS[targetLang];
  if (!dict) return formation;
  let result = formation;
  const sortedKeys = Object.keys(dict).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    const val = dict[key];
    const regex = new RegExp(`(?<=[^a-zA-Z]|^)${escapeRegExp(key)}(?=[^a-zA-Z]|$)`, 'gi');
    result = result.replace(regex, val);
  }
  return result;
}

// Explanation phrases mapping
const EXPLANATION_TEMPLATES = {
  vi: [
    [/Used to express giving something to someone; 'give', 'offer'\.?/i, "Dùng để diễn tả hành động cho, tặng ai đó một thứ gì; 'cho', 'tặng'."],
    [/To receive something or some action from someone; 'to get', 'to receive'\.?/i, "Dùng để diễn tả hành động nhận được một thứ gì hoặc một hành động từ ai đó; 'nhận', 'được'."],
    [/Express the superlative degree; 'the most', 'the best', 'the least'\.?/i, "Diễn tả cấp độ so sánh nhất; 'nhất', 'tốt nhất'."],
    [/Used to express a contrast between two statements\. It can be translated as 'but' or 'however'\.?/i, "Dùng để diễn tả sự tương phản giữa hai mệnh đề. Có thể dịch là 'nhưng' hoặc 'tuy nhiên'."],
    [/Expresses contrast or contradiction between two clauses; 'A, but B', 'A, however B'\.?/i, "Diễn tả sự tương phản, mâu thuẫn giữa hai vế; 'A, nhưng B', 'A, tuy nhiên B'."],
    [/Indicates a decision or suggestion; 'well then', 'in that case', 'so'\.?/i, "Biểu thị quyết định hoặc gợi ý; 'vậy thì', 'trong trường hợp đó', 'thế thì'."],
    [/Connect two sentences; 'A, so\/in that case, B'/i, "Liên kết hai câu; 'A, vậy thì/trong trường hợp đó, B'."],
    [/Express a change in situation; 'then', 'in that case', 'so'\.?/i, "Diễn tả sự thay đổi tình huống; 'vậy thì', 'thế thì'."],
    [/Indicates that there is something unique or different about A and describes what is special about it\.?/i, "Nhấn mạnh nét đặc trưng hoặc điểm nổi bật của A."],
    [/Express a change or transformation into a state described by the な-adjective\.?/i, "Diễn tả sự thay đổi, biến đổi thành trạng thái được mô tả bởi tính từ đuôi な."],
    [/Expresses the action of returning to a previous state, place, or condition\.?/i, "Diễn tả hành động quay trở lại trạng thái, địa điểm hoặc điều kiện trước đó."],
    [/Express 'where', used with question words for asking about locations\.?/i, "Dùng để hỏi 'ở đâu', sử dụng để hỏi về địa điểm hoặc phương hướng."],
    [/Express possession, apposition, or description using 'of' or ''s'\.?/i, "Diễn tả sự sở hữu, quan hệ bổ nghĩa hoặc thuộc tính ('của')."],
    [/Express that something is difficult or tough\.?/i, "Diễn tả rằng một việc gì đó rất vất vả, khó khăn hoặc gian nan."],
    [/Used to express 'almost', 'nearly', or 'most'\.?/i, "Diễn tả ý nghĩa 'hầu như', 'gần như' hoặc 'phần lớn'."],
    [/Expresses something as 'so-so', 'not bad', or 'average'\.?/i, "Diễn tả một điều gì đó ở mức 'tàm tạm', 'bình thường', 'không đến nỗi nào'."],
    [/Used to express an ongoing action or state\.?/i, "Diễn tả một hành động đang diễn ra hoặc trạng thái đang duy trì (thì tiếp diễn)."],
    [/Used to express ability or possibility; 'can', 'be able to'\.?/i, "Dùng để diễn tả khả năng hoặc năng lực; 'có thể'."],
    [/Used to ask for permission; 'may I', 'is it okay to'\.?/i, "Dùng để xin phép làm một điều gì đó; 'làm... có được không?'."],
    [/Used to express prohibition; 'must not', 'cannot'\.?/i, "Dùng để diễn tả sự cấm đoán; 'không được làm...'."],
    [/Used to express obligation or necessity; 'must', 'have to'\.?/i, "Dùng để diễn tả nghĩa vụ hoặc sự cần thiết; 'phải làm...'."],
    [/Express a reason or cause; 'because', 'since'\.?/i, "Diễn tả lý do hoặc nguyên nhân; 'bởi vì', 'do...'."],
    [/Express a condition; 'if'\.?/i, "Diễn tả câu điều kiện; 'nếu...'."]
  ],
  zh: [
    [/Used to express giving something to someone; 'give', 'offer'\.?/i, "用于表达给某人某物；“给”、“赠送”。"],
    [/To receive something or some action from someone; 'to get', 'to receive'\.?/i, "用于表达从某人那里得到某物或接受动作；“得到”、“收到”。"],
    [/Express the superlative degree; 'the most', 'the best', 'the least'\.?/i, "表达最高级程度；“最”、“最好”。"],
    [/Used to express a contrast between two statements\. It can be translated as 'but' or 'however'\.?/i, "用于表达两个分句之间的转折对比。可以翻译为“但是”或“然而”。"],
    [/Expresses contrast or contradiction between two clauses; 'A, but B', 'A, however B'\.?/i, "表达两个分句之间的转折或矛盾；“A，但是B”。"],
    [/Indicates a decision or suggestion; 'well then', 'in that case', 'so'\.?/i, "表示决定或建议；“那么”、“那样的话”。"],
    [/Connect two sentences; 'A, so\/in that case, B'/i, "连接两个句子；“A，那么/在那种情况下，B”。"],
    [/Express a change in situation; 'then', 'in that case', 'so'\.?/i, "表达情况的变化；“那么”、“既然如此”。"],
    [/Indicates that there is something unique or different about A and describes what is special about it\.?/i, "强调A的独特性或特征，并对其特殊之处进行描述。"],
    [/Express a change or transformation into a state described by the な-adjective\.?/i, "表达变成由な形容词所描述的状态或变化。"],
    [/Expresses the action of returning to a previous state, place, or condition\.?/i, "表示回到之前的状态、地点或条件。"],
    [/Express 'where', used with question words for asking about locations\.?/i, "表示“哪里”，用于询问地点或位置。"],
    [/Express possession, apposition, or description using 'of' or ''s'\.?/i, "表示所属、同位或修饰关系，相当于“的”。"],
    [/Express that something is difficult or tough\.?/i, "表达某事很艰难、辛苦或棘手。"],
    [/Used to express 'almost', 'nearly', or 'most'\.?/i, "表达“几乎”、“差不多”或“大部分”。"],
    [/Expresses something as 'so-so', 'not bad', or 'average'\.?/i, "表示某事物处于“还可以”、“普通”、“不过不失”的状态。"],
    [/Used to express an ongoing action or state\.?/i, "用于表达正在进行的动作或持续的状态（进行时/状态）。"],
    [/Used to express ability or possibility; 'can', 'be able to'\.?/i, "用于表达能力或可能性；“能够”、“可以”。"],
    [/Used to ask for permission; 'may I', 'is it okay to'\.?/i, "用于请求许可；“可以……吗？”。"],
    [/Used to express prohibition; 'must not', 'cannot'\.?/i, "用于表达禁止；“不可以”、“不能”。"],
    [/Used to express obligation or necessity; 'must', 'have to'\.?/i, "用于表达义务或必要性；“必须”、“不得不”。"],
    [/Express a reason or cause; 'because', 'since'\.?/i, "表达原因或理由；“因为”。"],
    [/Express a condition; 'if'\.?/i, "表达条件；“如果……的话”。"]
  ],
  ko: [
    [/Used to express giving something to someone; 'give', 'offer'\.?/i, "누군가에게 무언가를 주는 행위를 나타냅니다 ('주다', '선물하다')."],
    [/To receive something or some action from someone; 'to get', 'to receive'\.?/i, "누군가로부터 무언가나 어떤 행위를 받음을 나타냅니다 ('받다', '얻다')."],
    [/Express the superlative degree; 'the most', 'the best', 'the least'\.?/i, "최상급을 나타냅니다 ('가장', '제일')."],
    [/Used to express a contrast between two statements\. It can be translated as 'but' or 'however'\.?/i, "두 진술 사이의 대조를 나타냅니다. '하지만' 또는 '그러나'로 번역될 수 있습니다."],
    [/Expresses contrast or contradiction between two clauses; 'A, but B', 'A, however B'\.?/i, "두 절 사이의 대조나 모순을 나타냅니다 ('A, 하지만 B')."],
    [/Indicates a decision or suggestion; 'well then', 'in that case', 'so'\.?/i, "결정이나 제안을 나타냅니다 ('그러면', '그렇다면')."],
    [/Connect two sentences; 'A, so\/in that case, B'/i, "두 문장을 연결합니다 ('A, 그렇다면 B')."],
    [/Express a change in situation; 'then', 'in that case', 'so'\.?/i, "상황의 변화를 나타냅니다 ('그러면', '그렇다면')."],
    [/Indicates that there is something unique or different about A and describes what is special about it\.?/i, "A의 고유한 특징이나 두드러진 점을 설명합니다."],
    [/Express a change or transformation into a state described by the な-adjective\.?/i, "な형용사로 표현되는 상태로의 변화를 나타냅니다."],
    [/Expresses the action of returning to a previous state, place, or condition\.?/i, "이전의 상태, 장소 또는 조건으로 돌아가는 동작을 나타냅니다."],
    [/Express 'where', used with question words for asking about locations\.?/i, "'어디'를 나타내며 장소를 물어볼 때 사용됩니다."],
    [/Express possession, apposition, or description using 'of' or ''s'\.?/i, "소유, 동격, 설명을 나타내며 '~의'에 해당합니다."],
    [/Express that something is difficult or tough\.?/i, "무언가가 힘들거나 어렵다는 것을 나타냅니다."],
    [/Used to express 'almost', 'nearly', or 'most'\.?/i, "'거의', '대부분'의 의미를 나타냅니다."],
    [/Expresses something as 'so-so', 'not bad', or 'average'\.?/i, "'그럭저럭', '보통', '나쁘지 않음'을 나타냅니다."],
    [/Used to express an ongoing action or state\.?/i, "진행 중인 동작이나 지속되는 상태를 나타냅니다."],
    [/Used to express ability or possibility; 'can', 'be able to'\.?/i, "능력이나 가능성을 나타냅니다 ('할 수 있다')."],
    [/Used to ask for permission; 'may I', 'is it okay to'\.?/i, "허가를 구할 때 사용됩니다 ('~해도 됩니까?')."],
    [/Used to express prohibition; 'must not', 'cannot'\.?/i, "금지를 나타냅니다 ('~해서는 안 된다')."],
    [/Used to express obligation or necessity; 'must', 'have to'\.?/i, "의무나 필요성을 나타냅니다 ('~해야 한다')."],
    [/Express a reason or cause; 'because', 'since'\.?/i, "이유나 원인을 나타냅니다 ('~때문에')."],
    [/Express a condition; 'if'\.?/i, "조건을 나타냅니다 ('~라면')."]
  ],
  ja: [
    [/Used to express giving something to someone; 'give', 'offer'\.?/i, "相手に物などを与える・贈ることを表します（「あげる」「贈る」）。"],
    [/To receive something or some action from someone; 'to get', 'to receive'\.?/i, "相手から物や行為を受け取ることを表します（「もらう」「受ける」）。"],
    [/Express the superlative degree; 'the most', 'the best', 'the least'\.?/i, "最上級の度合いを表します（「最も」「一番」）。"],
    [/Used to express a contrast between two statements\. It can be translated as 'but' or 'however'\.?/i, "二つの文の間の対比や逆接を表します（「しかし」「けれども」）。"],
    [/Expresses contrast or contradiction between two clauses; 'A, but B', 'A, however B'\.?/i, "二つの節の対比や矛盾を表します（「A、しかしB」）。"],
    [/Indicates a decision or suggestion; 'well then', 'in that case', 'so'\.?/i, "決定や提案を表します（「それでは」「じゃあ」）。"],
    [/Connect two sentences; 'A, so\/in that case, B'/i, "二つの文をつなぎます（「A、それならB」）。"],
    [/Express a change in situation; 'then', 'in that case', 'so'\.?/i, "状況の変化や展開を表します（「それでは」「その場合」）。"],
    [/Indicates that there is something unique or different about A and describes what is special about it\.?/i, "Aの特徴や際立った点を強調・描写します。"],
    [/Express a change or transformation into a state described by the な-adjective\.?/i, "な形容詞が表す状態への変化を表します。"],
    [/Expresses the action of returning to a previous state, place, or condition\.?/i, "以前の状態、場所、条件に戻る動作を表します。"],
    [/Express 'where', used with question words for asking about locations\.?/i, "「どこ」を表し、場所や位置を尋ねる際に用いられます。"],
    [/Express possession, apposition, or description using 'of' or ''s'\.?/i, "所有、同格、修飾関係を表します（「〜の」）。"],
    [/Express that something is difficult or tough\.?/i, "物事が大変である、つらい、困難であることを表します。"],
    [/Used to express 'almost', 'nearly', or 'most'\.?/i, "「ほとんど」「大半」「およそ」という意味を表します。"],
    [/Expresses something as 'so-so', 'not bad', or 'average'\.?/i, "「まあまあ」「悪くはない」「普通」であることを表します。"],
    [/Used to express an ongoing action or state\.?/i, "進行中の動作や継続している状態を表します。"],
    [/Used to express ability or possibility; 'can', 'be able to'\.?/i, "能力や可能性を表します（「〜ができる」）。"],
    [/Used to ask for permission; 'may I', 'is it okay to'\.?/i, "許可を求める際に用いられます（「〜してもいいですか」）。"],
    [/Used to express prohibition; 'must not', 'cannot'\.?/i, "禁止を表します（「〜してはいけない」）。"],
    [/Used to express obligation or necessity; 'must', 'have to'\.?/i, "義務や必要性を表します（「〜しなければならない」）。"],
    [/Express a reason or cause; 'because', 'since'\.?/i, "理由や原因を表します（「〜から」「〜ので」）。"],
    [/Express a condition; 'if'\.?/i, "条件を表します（「〜なら」「〜たら」）。"]
  ]
};

function translateExplanation(text, targetLang, pattern) {
  if (!text) return '';
  const templates = EXPLANATION_TEMPLATES[targetLang] || [];
  for (const [regex, replacement] of templates) {
    if (regex.test(text)) {
      return replacement;
    }
  }

  // Fallback translation based on grammar terms and patterns
  if (targetLang === 'vi') {
    return text
      .replace(/The (.*?) grammar point is used when /gi, 'Điểm ngữ pháp $1 được dùng khi ')
      .replace(/The (.*?) grammar point is used to /gi, 'Điểm ngữ pháp $1 được dùng để ')
      .replace(/The grammar point (.*?) is used to /gi, 'Điểm ngữ pháp $1 được dùng để ')
      .replace(/This grammar point is used to /gi, 'Điểm ngữ pháp này được dùng để ')
      .replace(/Used to express /gi, 'Dùng để diễn tả ')
      .replace(/Used to indicate /gi, 'Dùng để biểu thị ')
      .replace(/Used to show /gi, 'Dùng để chỉ ra ')
      .replace(/Used to ask /gi, 'Dùng để hỏi ')
      .replace(/Expresses the idea of /gi, 'Diễn tả ý niệm ')
      .replace(/Expresses that /gi, 'Diễn tả rằng ')
      .replace(/Indicates that /gi, 'Biểu thị rằng ')
      .replace(/It can be translated as /gi, 'Có thể dịch là ')
      .replace(/The formation involves /gi, 'Cấu trúc bao gồm ')
      .replace(/It emphasizes that /gi, 'Cấu trúc nhấn mạnh rằng ')
      .replace(/in English/gi, 'trong câu')
      .replace(/in Japanese/gi, 'trong tiếng Nhật');
  } else if (targetLang === 'zh') {
    return text
      .replace(/The (.*?) grammar point is used when /gi, '“$1”语法点用于当')
      .replace(/The (.*?) grammar point is used to /gi, '“$1”语法点用于')
      .replace(/The grammar point (.*?) is used to /gi, '“$1”语法点用于')
      .replace(/This grammar point is used to /gi, '该语法点用于')
      .replace(/Used to express /gi, '用于表达')
      .replace(/Used to indicate /gi, '用于表示')
      .replace(/Used to show /gi, '用于指示')
      .replace(/Used to ask /gi, '用于询问')
      .replace(/It can be translated as /gi, '可以翻译为')
      .replace(/in English/gi, '在句中')
      .replace(/in Japanese/gi, '在日语中');
  } else if (targetLang === 'ko') {
    return text
      .replace(/The (.*?) grammar point is used when /gi, '\'$1\' 문법은 ')
      .replace(/The (.*?) grammar point is used to /gi, '\'$1\' 문법은 ')
      .replace(/Used to express /gi, '~를 나타내는 데 사용됨: ')
      .replace(/Used to indicate /gi, '~를 표시하는 데 사용됨: ')
      .replace(/It can be translated as /gi, '~로 번역될 수 있음: ')
      .replace(/in English/gi, '문장에서')
      .replace(/in Japanese/gi, '일본어에서');
  } else if (targetLang === 'ja') {
    return text
      .replace(/The (.*?) grammar point is used when /gi, '「$1」は')
      .replace(/The (.*?) grammar point is used to /gi, '「$1」は')
      .replace(/Used to express /gi, '〜を表す文法: ')
      .replace(/Used to indicate /gi, '〜を示す文法: ')
      .replace(/It can be translated as /gi, '〜と訳されます: ')
      .replace(/in English/gi, '文中では')
      .replace(/in Japanese/gi, '日本語では');
  }
  return text;
}

// Full sentence translations for JA examples
const SENTENCE_MAP = {
  vi: {
    'Of all these, I like sushi the most.': 'Trong số này, tôi thích sushi nhất.',
    'She can swim the fastest in the class.': 'Cô ấy có thể bơi nhanh nhất trong lớp.',
    'In this town, this park is the most beautiful.': 'Ở thị trấn này, công viên này là đẹp nhất.',
    'Among all drinks, I like tea the most.': 'Trong các loại đồ uống, tôi thích trà nhất.',
    'It is sunny today. However, it is cold.': 'Hôm nay trời nắng. Tuy nhiên, trời lại lạnh.',
    'She is noisy. But, she is interesting.': 'Cô ấy ồn ào. Nhưng cô ấy rất thú vị.',
    "The movie was long. But, it wasn't boring.": 'Bộ phim dài. Nhưng nó không hề nhàm chán.',
    'He is good at sports. However, he is not good at studying.': 'Anh ấy giỏi thể thao. Tuy nhiên, anh ấy lại học không giỏi.',
    "I'm busy today. However, if I have time, let's have coffee.": 'Hôm nay tôi bận. Nhưng nếu có thời gian, chúng ta hãy uống cà phê nhé.',
    'The movie was interesting. But, it was too long.': 'Bộ phim rất hay. Nhưng nó quá dài.',
    'He was tired. However, he finished his homework.': 'Anh ấy mệt. Tuy nhiên, anh ấy vẫn hoàn thành bài tập về nhà.',
    'The room is small. But, it is in a convenient location.': 'Căn phòng nhỏ. Nhưng nó ở vị trí rất thuận tiện.',
    "There's no time for a movie. Well then, let's go another time.": 'Không có thời gian xem phim. Vậy thì để lần khác chúng ta đi nhé.',
    "I'm hungry. In that case, let's go to a restaurant.": 'Tôi đói bụng rồi. Vậy thì chúng ta hãy đến nhà hàng nhé.',
    "The train is late. So, let's go by bus.": 'Tàu điện bị trễ. Vậy thì chúng ta hãy đi bằng xe buýt nhé.',
    "This shirt is expensive. Well then, let's buy a different one.": 'Cái áo sơ mi này đắt quá. Vậy thì hãy mua cái khác nhé.',
    "Today is a day off. In that case, let's go watch a movie.": 'Hôm nay là ngày nghỉ. Vậy thì chúng ta hãy đi xem phim nhé.',
    "The electricity went out. In that case, let's use candles.": 'Mất điện rồi. Vậy thì chúng ta hãy dùng nến nhé.',
    "The restaurant is crowded. In that case, let's eat somewhere else.": 'Nhà hàng đông người quá. Vậy thì chúng ta hãy ăn ở nơi khác nhé.',
    "It seems it will rain tomorrow. In that case, let's cancel the picnic.": 'Có vẻ ngày mai sẽ mưa. Vậy thì hãy hủy buổi dã ngoại nhé.',
    "Today is a day off. In that case, let's go see a movie.": 'Hôm nay là ngày nghỉ. Vậy thì hãy đi xem phim nào.',
    "This bread is already old. Then, let's throw it away.": 'Chiếc bánh mì này cũ rồi. Vậy thì chúng ta hãy vứt nó đi.',
    "It started raining. In that case, let's play indoors.": 'Trời bắt đầu mưa rồi. Vậy thì chúng ta hãy chơi trong nhà nhé.',
    "I'm hungry. So, let's go eat something.": 'Tôi đói bụng. Vậy thì hãy đi ăn gì đó nhé.',
    "As for fruits, apples are my favorite.": 'Về các loại trái cây, táo là món tôi thích nhất.',
    "As for sports, soccer is the most popular.": 'Về thể thao, bóng đá là môn phổ biến nhất.',
    "As for today's weather, it looks like it will rain.": 'Về thời tiết hôm nay, trông như trời sắp mưa.',
    "As for cooking, I am best at Japanese cuisine.": 'Về nấu ăn, tôi giỏi nhất là món ăn Nhật.',
    "Yesterday was cold. But today it's warm.": 'Hôm qua trời lạnh. Nhưng hôm nay thì ấm áp.',
    "He is busy. However, he still has time to hang out with friends.": 'Anh ấy bận rộn. Tuy nhiên, anh ấy vẫn có thời gian đi chơi với bạn bè.',
    "I passed the exam. But I'm still continuing to study.": 'Tôi đã đỗ kỳ thi. Nhưng tôi vẫn tiếp tục học tập.',
    "She is famous. However, she's very humble.": 'Cô ấy nổi tiếng. Tuy nhiên, cô ấy rất khiêm tốn.',
    "Which do you like, apples or oranges?": 'Bạn thích táo hay cam/quýt hơn?',
    "Should I go by train or bus?": 'Tôi nên đi bằng tàu điện hay xe buýt?',
    "Which do you think suits me better, the red dress or the blue dress?": 'Bạn nghĩ cái váy đỏ hay váy xanh hợp với tôi hơn?',
    "Which one is easier to use, this camera or that camera?": 'Chiếc máy ảnh này hay chiếc máy ảnh kia dễ dùng hơn?',
    "Which do you like, coffee or tea?": 'Bạn thích cà phê hay trà hơn?',
    "Which do you enjoy, movies or music?": 'Bạn thích phim ảnh hay âm nhạc hơn?',
    "Which one will you buy, the red shirt or the blue shirt?": 'Bạn sẽ mua chiếc áo màu đỏ hay chiếc áo màu xanh?',
    "Which do you want to study, Japanese or Korean?": 'Bạn muốn học tiếng Nhật hay tiếng Hàn hơn?',
    "What's special about her is that she has long hair.": 'Cô ấy có mái tóc dài đặc biệt.',
    "This juice is sweeter than that juice.": 'Nước ép này ngọt hơn nước ép kia.',
    "Hamburgers are more delicious than pizza.": 'Burger ngon hơn pizza.',
    "He ran quickly.": 'Anh ấy đã chạy thật nhanh.',
    "I will make the room brighter.": 'Tôi sẽ làm cho căn phòng sáng hơn.',
    "This pizza is not delicious.": 'Cái pizza này không ngon.',
    "This apple is sweet and delicious.": 'Quả táo này vừa ngọt vừa ngon.',
    "He speaks quietly.": 'Anh ấy nói chuyện một cách nhẹ nhàng.',
    "He likes women who are beautiful and kind.": 'Anh ấy thích những người phụ nữ vừa xinh đẹp vừa tốt bụng.',
    "I will be quiet.": 'Tôi sẽ giữ im lặng.',
    "I gave a book to my friend.": 'Tôi đã tặng sách cho bạn tôi.',
    "Let's give him a present.": 'Chúng ta hãy tặng quà cho anh ấy nhé.',
    "I will give flowers to the teacher.": 'Tôi sẽ tặng hoa cho thầy giáo.',
    "I want to give chocolate to my mom.": 'Tôi muốn tặng sô-cô-la cho mẹ.',
    "I received a present from my friend.": 'Tôi đã nhận được một món quà từ bạn tôi.',
    "I got a souvenir from my teacher.": 'Tôi đã nhận được một món quà lưu niệm từ thầy giáo.',
    "I received help from him.": 'Tôi đã nhận được sự giúp đỡ từ anh ấy.',
    "I received money from my parents.": 'Tôi đã nhận được tiền từ bố mẹ.',
    "I can speak Japanese.": 'Tôi có thể nói tiếng Nhật.',
    "Can you swim?": 'Bạn có biết bơi không?',
    "I cannot eat raw fish.": 'Tôi không thể ăn cá sống.',
    "I can play the piano.": 'Tôi có thể chơi đàn piano.',
    "Where is the station?": 'Nhà ga ở đâu vậy?',
    "Where is the bathroom?": 'Nhà vệ sinh ở đâu vậy?',
    "Where are you going?": 'Bạn đang đi đâu đấy?',
    "Where do you live?": 'Bạn sống ở đâu?',
    "Let's drop off a letter at the post office while going shopping.": 'Nhân tiện đi mua sắm, chúng ta hãy ghé bưu điện gửi thư nhé.',
    "There is an exam tomorrow. Therefore, I plan to study tonight.": 'Ngày mai có bài thi. Vì vậy tối nay tôi định sẽ học bài.',
    "When it comes to cooking skills, she is second to none.": 'Nói về tài nấu ăn thì cô ấy không thua kém ai cả.',
    "He has at least 500 items in his collection.": 'Bộ sưu tập của anh ấy có ít nhất 500 món đồ.',
    "I came to Japan but ended up going home without ever getting to see Mt. Fuji.": 'Tôi đã đến Nhật nhưng cuối cùng lại về nước mà chưa từng được ngắm núi Phú Sĩ.',
    "Since he’s still a beginner, he’s doing his best in his own beginner way.": 'Vì vẫn là người mới bắt đầu nên anh ấy đang nỗ lực hết mình theo cách của người mới.',
    "When put in the refrigerator, the melted ice cream returns to its solid state.": 'Khi cho vào tủ lạnh, cây kem tan chảy sẽ đông cứng lại như cũ.'
  },
  zh: {
    'Of all these, I like sushi the most.': '在这些当中，我最喜欢寿司。',
    'She can swim the fastest in the class.': '她是班里游泳最快的人。',
    'In this town, this park is the most beautiful.': '在这座小镇上，这个公园最美丽。',
    'Among all drinks, I like tea the most.': '在所有的饮料中，我最喜欢红茶。',
    'It is sunny today. However, it is cold.': '今天天气晴朗。但是，天气很冷。',
    'She is noisy. But, she is interesting.': '她很吵闹。但是，她很有趣。',
    "The movie was long. But, it wasn't boring.": '这部电影很长。但是，一点也不无聊。',
    'He is good at sports. However, he is not good at studying.': '他擅长体育。但是，他不擅长学习。',
    "I'm busy today. However, if I have time, let's have coffee.": '我今天很忙。不过如果还有时间的话，一起喝咖啡吧。',
    'The movie was interesting. But, it was too long.': '这部电影很有意思。但是，太长了。',
    'He was tired. However, he finished his homework.': '他很累。但是，他还是完成了作业。',
    'The room is small. But, it is in a convenient location.': '房间虽然小，但是地段很便利。',
    "There's no time for a movie. Well then, let's go another time.": '看电影没时间了。那么，下次再去吧。',
    "I'm hungry. In that case, let's go to a restaurant.": '我肚子饿了。那么，我们去餐厅吧。',
    "The train is late. So, let's go by bus.": '电车晚点了。那么，我们坐公交车去吧。',
    "This shirt is expensive. Well then, let's buy a different one.": '这件衬衫很贵。那么，买一件别的吧。',
    "Today is a day off. In that case, let's go watch a movie.": '今天是休息日。那么，我们去看电影吧。',
    "The electricity went out. In that case, let's use candles.": '停电了。那么，我们用蜡烛吧。',
    "The restaurant is crowded. In that case, let's eat somewhere else.": '这家餐厅人很拥挤。那么，我们在别的地方吃吧。',
    "It seems it will rain tomorrow. In that case, let's cancel the picnic.": '明天好像要下雨。那么，取消野餐吧。',
    "Today is a day off. In that case, let's go see a movie.": '今天是休息日。那么，去看看电影吧。',
    "This bread is already old. Then, let's throw it away.": '这个面包已经不新鲜了。那么，扔掉吧。',
    "It started raining. In that case, let's play indoors.": '开始下雨了。那么，我们在室内玩吧。',
    "I'm hungry. So, let's go eat something.": '我饿了。那么，我们去吃点什么吧。',
    "As for fruits, apples are my favorite.": '在水果当中，我最喜欢苹果。',
    "As for sports, soccer is the most popular.": '在体育运动中，足球最受欢迎。',
    "As for today's weather, it looks like it will rain.": '关于今天的天气，看起来要下雨。',
    "As for cooking, I am best at Japanese cuisine.": '说到做饭，我最擅长做日本料理。',
    "Yesterday was cold. But today it's warm.": '昨天很冷。但是今天很暖和。',
    "He is busy. However, he still has time to hang out with friends.": '他虽然很忙，但还是有时间和朋友一起玩。',
    "I passed the exam. But I'm still continuing to study.": '我通过了考试。但我仍在继续学习。',
    "She is famous. However, she's very humble.": '她很有名。但是，她非常谦虚。',
    "Which do you like, apples or oranges?": '苹果和橘子，你更喜欢哪一个？',
    "Should I go by train or bus?": '我应该乘电车去还是乘公交车去？',
    "Which do you think suits me better, the red dress or the blue dress?": '你觉得红色的连衣裙和蓝色的连衣裙哪个更适合我？',
    "Which one is easier to use, this camera or that camera?": '这台照相机和那台照相机，哪一台更好用？',
    "Which do you like, coffee or tea?": '咖啡和红茶，你更喜欢哪一个？',
    "Which do you enjoy, movies or music?": '电影和音乐，你更喜欢哪一种？',
    "Which one will you buy, the red shirt or the blue shirt?": '红衬衫和蓝衬衫，你要买哪一件？',
    "Which do you want to study, Japanese or Korean?": '日语和韩语，你想学哪一种？',
    "What's special about her is that she has long hair.": '她的特别之处在于留着长头发。',
    "This juice is sweeter than that juice.": '这种果汁比那种果汁更甜。',
    "Hamburgers are more delicious than pizza.": '汉堡比比萨更好吃。',
    "He ran quickly.": '他跑得很快。',
    "I will make the room brighter.": '我会让房间变得更加明亮。',
    "This pizza is not delicious.": '这个比萨不好吃。',
    "This apple is sweet and delicious.": '这个苹果又甜又好吃。',
    "He speaks quietly.": '他安静温和地说话。',
    "He likes women who are beautiful and kind.": '他喜欢既漂亮又温柔善良的女性。',
    "I will be quiet.": '我会保持安静。',
    "I gave a book to my friend.": '我把书给了朋友。',
    "Let's give him a present.": '我们给他送礼物吧。',
    "I will give flowers to the teacher.": '我给老师送花。',
    "I want to give chocolate to my mom.": '我想给妈妈送巧克力。',
    "I received a present from my friend.": '我从朋友那里收到了礼物。',
    "I got a souvenir from my teacher.": '我收到了老师给的纪念品。',
    "I received help from him.": '我得到了他的帮助。',
    "I received money from my parents.": '我从父母那里收到了钱。',
    "I can speak Japanese.": '我会说日语。',
    "Can you swim?": '你会游泳吗？',
    "I cannot eat raw fish.": '我不能吃生鱼。',
    "I can play the piano.": '我会弹钢琴。',
    "Where is the station?": '车站在哪里？',
    "Where is the bathroom?": '洗手间在哪里？',
    "Where are you going?": '你要去哪里？',
    "Where do you live?": '你住在哪里？'
  },
  ko: {
    'Of all these, I like sushi the most.': '이 중에서 초밥을 가장 좋아합니다.',
    'She can swim the fastest in the class.': '그녀는 반에서 수영을 가장 빨리 할 수 있습니다.',
    'In this town, this park is the most beautiful.': '이 마을에서는 이 공원이 가장 아름답습니다.',
    'Among all drinks, I like tea the most.': '모든 음료 중에서 홍차를 가장 좋아합니다.',
    'It is sunny today. However, it is cold.': '오늘은 날씨가 맑다. 그렇지만 춥다.',
    'She is noisy. But, she is interesting.': '그녀는 시끄럽다. 하지만 재미있다.',
    "The movie was long. But, it wasn't boring.": '그 영화는 길었다. 하지만 지루하지 않았다.',
    'He is good at sports. However, he is not good at studying.': '그는 운동을 잘한다. 하지만 공부는 서투르다.',
    "I'm busy today. However, if I have time, let's have coffee.": '오늘은 바쁩니다. 하지만 시간이 있다면 커피를 마십시다.',
    'The movie was interesting. But, it was too long.': '그 영화는 재미있었다. 하지만 너무 길었다.',
    'He was tired. However, he finished his homework.': '그는 피곤했다. 하지만 숙제를 끝마쳤다.',
    'The room is small. But, it is in a convenient location.': '방은 좁습니다. 하지만 편리한 위치에 있습니다.',
    "There's no time for a movie. Well then, let's go another time.": '영화 볼 시간이 없다. 그럼 다음에 가자.',
    "I'm hungry. In that case, let's go to a restaurant.": '배가 고프다. 그렇다면 식당에 가자.',
    "The train is late. So, let's go by bus.": '전철이 늦었다. 그럼 버스로 가자.',
    "This shirt is expensive. Well then, let's buy a different one.": '이 셔츠는 비싸다. 그럼 다른 것을 사자.',
    "Today is a day off. In that case, let's go watch a movie.": '오늘은 쉬는 날입니다. 그러면 영화를 보러 갑시다.',
    "The electricity went out. In that case, let's use candles.": '전기가 나갔다. 그러면 양초를 사용합시다.',
    "The restaurant is crowded. In that case, let's eat somewhere else.": '식당이 붐비고 있습니다. 그렇다면 다른 곳에서 먹읍시다.',
    "It seems it will rain tomorrow. In that case, let's cancel the picnic.": '내일 비가 올 것 같다. 그렇다면 소풍은 취소합시다.',
    "Today is a day off. In that case, let's go see a movie.": '오늘은 쉬는 날이다. 그러면 영화를 보러 가자.',
    "This bread is already old. Then, let's throw it away.": '이 빵은 이미 오래되었습니다. 그러면 버립시다.',
    "It started raining. In that case, let's play indoors.": '비가 내리기 시작했다. 그러면 실내에서 놀자.',
    "I'm hungry. So, let's go eat something.": '배가 고프다. 그러면 무언가 먹으러 가자.',
    "As for fruits, apples are my favorite.": '과일 중에서는 사과를 가장 좋아합니다.',
    "As for sports, soccer is the most popular.": '스포츠 중에서는 축구가 가장 인기 있습니다.',
    "As for today's weather, it looks like it will rain.": '오늘 날씨로 보아 비가 올 것 같습니다.',
    "As for cooking, I am best at Japanese cuisine.": '요리 중에서는 일식을 가장 잘합니다.',
    "Yesterday was cold. But today it's warm.": '어제는 추웠다. 하지만 오늘은 따뜻합니다.',
    "He is busy. However, he still has time to hang out with friends.": '그는 바쁘다. 하지만 친구와 놀 시간은 있다.',
    "I passed the exam. But I'm still continuing to study.": '시험에 합격했다. 하지만 아직 공부를 계속하고 있다.',
    "She is famous. However, she's very humble.": '그녀는 유명하다. 하지만 매우 겸손하다.',
    "Which do you like, apples or oranges?": '사과와 귤 중 어느 쪽을 더 좋아합니까?',
    "Should I go by train or bus?": '전철과 버스 중 어느 쪽으로 가야 합니까?',
    "Which do you think suits me better, the red dress or the blue dress?": '빨간 원피스와 파란 원피스 중 어느 쪽이 저에게 더 어울린다고 생각합니까?',
    "Which one is easier to use, this camera or that camera?": '이 카메라와 저 카메라 중 어느 쪽이 더 사용하기 쉽습니까?',
    "Which do you like, coffee or tea?": '커피와 홍차 중 어느 쪽이 좋아?',
    "Which do you enjoy, movies or music?": '영화와 음악 중 어느 쪽을 즐기나요?',
    "Which one will you buy, the red shirt or the blue shirt?": '빨간 셔츠와 파란 셔츠 중 어느 것을 살 거야?',
    "Which do you want to study, Japanese or Korean?": '일본어와 한국어 중 어느 것을 공부하고 싶어?',
    "What's special about her is that she has long hair.": '그녀의 특징은 머리가 길다는 것입니다.',
    "This juice is sweeter than that juice.": '이 주스는 저 주스보다 답니다.',
    "Hamburgers are more delicious than pizza.": '피자보다 햄버거가 더 맛있습니다.',
    "He ran quickly.": '그는 빠르게 달렸습니다.',
    "I will make the room brighter.": '방을 밝게 하겠습니다.',
    "This pizza is not delicious.": '이 피자는 맛이 없습니다.',
    "This apple is sweet and delicious.": '이 사과는 달고 맛있습니다.',
    "He speaks quietly.": '그는 조용히 말합니다.',
    "He likes women who are beautiful and kind.": '그는 아름답고 다정한 여성을 좋아합니다.',
    "I will be quiet.": '조용히 하겠습니다.',
    "I gave a book to my friend.": '나는 친구에게 책을 주었습니다.',
    "Let's give him a present.": '그에게 선물을 줍시다.',
    "I will give flowers to the teacher.": '선생님께 꽃을 드립니다.',
    "I want to give chocolate to my mom.": '어머니께 초콜릿을 드리고 싶습니다.',
    "I received a present from my friend.": '나는 친구에게서 선물을 받았습니다.',
    "I got a souvenir from my teacher.": '선생님께 기념품을 받았습니다.',
    "I received help from him.": '그에게서 도움을 받았습니다.',
    "I received money from my parents.": '부모님께 용돈을 받았습니다.',
    "I can speak Japanese.": '나는 일본어를 할 수 있습니다.',
    "Can you swim?": '수영할 수 있습니까?',
    "I cannot eat raw fish.": '나는 날생선을 먹을 수 없습니다.',
    "I can play the piano.": '나는 피아노를 칠 수 있습니다.',
    "Where is the station?": '역은 어디입니까?',
    "Where is the bathroom?": '화장실은 어디입니까?',
    "Where are you going?": '어디에 가십니까?',
    "Where do you live?": '어디에 사십니까?'
  }
};

function translateJaExample(ex, targetLang) {
  if (targetLang === 'ja') {
    return ex.sentence;
  }
  const en = ex.translation;
  if (!en) return ex.sentence;

  const map = SENTENCE_MAP[targetLang];
  if (map && map[en]) {
    return map[en];
  }

  return translateSentenceFallback(en, targetLang, ex.sentence);
}

function translateSentenceFallback(en, targetLang, originalSentence) {
  if (targetLang === 'vi') {
    let s = en;
    s = s.replace(/\bI am hungry\b/gi, 'Tôi đang đói bụng')
         .replace(/\bI am\b/gi, 'Tôi là')
         .replace(/\bI'm\b/gi, 'Tôi')
         .replace(/\bYou are\b/gi, 'Bạn là')
         .replace(/\bHe is\b/gi, 'Anh ấy là')
         .replace(/\bShe is\b/gi, 'Cô ấy là')
         .replace(/\bThey are\b/gi, 'Họ là')
         .replace(/\bWe are\b/gi, 'Chúng tôi là')
         .replace(/\bI want to\b/gi, 'Tôi muốn')
         .replace(/\bI have to\b/gi, 'Tôi phải')
         .replace(/\bI must\b/gi, 'Tôi phải')
         .replace(/\bI can\b/gi, 'Tôi có thể')
         .replace(/\bI cannot\b/gi, 'Tôi không thể')
         .replace(/\bcan't\b/gi, 'không thể')
         .replace(/\bPlease\b/gi, 'Xin vui lòng')
         .replace(/\bLet's\b/gi, 'Chúng ta hãy')
         .replace(/\bBecause\b/gi, 'Bởi vì')
         .replace(/\bHowever\b/gi, 'Tuy nhiên')
         .replace(/\bTherefore\b/gi, 'Vì vậy')
         .replace(/\bAlthough\b/gi, 'Mặc dù')
         .replace(/\bIn that case\b/gi, 'Trong trường hợp đó')
         .replace(/\bWell then\b/gi, 'Vậy thì')
         .replace(/\bYesterday\b/gi, 'Hôm qua')
         .replace(/\bToday\b/gi, 'Hôm nay')
         .replace(/\bTomorrow\b/gi, 'Ngày mai')
         .replace(/\bevery day\b/gi, 'mỗi ngày')
         .replace(/\bevery morning\b/gi, 'mỗi sáng');
    return s;
  } else if (targetLang === 'zh') {
    let s = en;
    s = s.replace(/\bI am hungry\b/gi, '我肚子饿了')
         .replace(/\bI am\b/gi, '我是')
         .replace(/\bI'm\b/gi, '我')
         .replace(/\bYou are\b/gi, '你是')
         .replace(/\bHe is\b/gi, '他是')
         .replace(/\bShe is\b/gi, '她是')
         .replace(/\bThey are\b/gi, '他们是')
         .replace(/\bWe are\b/gi, '我们是')
         .replace(/\bI want to\b/gi, '我想')
         .replace(/\bI have to\b/gi, '我必须')
         .replace(/\bI can\b/gi, '我可以')
         .replace(/\bPlease\b/gi, '请')
         .replace(/\bLet's\b/gi, '让我们')
         .replace(/\bHowever\b/gi, '然而')
         .replace(/\bTherefore\b/gi, '因此')
         .replace(/\bYesterday\b/gi, '昨天')
         .replace(/\bToday\b/gi, '今天')
         .replace(/\bTomorrow\b/gi, '明天');
    return s;
  } else if (targetLang === 'ko') {
    let s = en;
    s = s.replace(/\bI am hungry\b/gi, '배가 고픕니다')
         .replace(/\bI am\b/gi, '나는 ~이다')
         .replace(/\bI want to\b/gi, '하고 싶다')
         .replace(/\bI have to\b/gi, '해야 한다')
         .replace(/\bI can\b/gi, '할 수 있다')
         .replace(/\bHowever\b/gi, '하지만')
         .replace(/\bTherefore\b/gi, '따라서')
         .replace(/\bYesterday\b/gi, '어제')
         .replace(/\bToday\b/gi, '오늘')
         .replace(/\bTomorrow\b/gi, '내일');
    return s;
  }
  return en;
}

function buildJaTranslations(targetLang) {
  const tsPath = path.join(__dirname, '..', '..', 'src', 'app', 'data', 'grammar-ja.ts');
  const content = fs.readFileSync(tsPath, 'utf8');
  const eq = content.indexOf('=');
  const jaPatterns = JSON.parse(content.substring(content.indexOf('[', eq), content.lastIndexOf(']') + 1));

  const result = {};
  for (const p of jaPatterns) {
    const title = translateTitle(p.title, targetLang);
    const formation = translateFormation(p.formation, targetLang);
    const shortExplanation = translateExplanation(p.shortExplanation, targetLang, p.pattern);
    const longExplanation = translateExplanation(p.longExplanation, targetLang, p.pattern);
    const examples = (p.examples || []).map(ex => ({
      translation: translateJaExample(ex, targetLang)
    }));

    result[p.id] = {
      title,
      shortExplanation,
      longExplanation,
      formation,
      examples
    };
  }

  return result;
}

module.exports = {
  buildJaTranslations,
  translateJaExample,
  translateFormation,
  translateExplanation
};

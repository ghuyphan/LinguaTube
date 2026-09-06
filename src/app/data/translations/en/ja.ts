import { GrammarTranslation } from '../../../models/grammar.model';

export const GRAMMAR_EN_JA: Record<string, GrammarTranslation> = {
  "en_a1_01": {
    "title": "am / is / are - be動詞の現在形",
    "shortExplanation": "be動詞の現在形：Iにはam、he/she/itにはis、you/we/theyにはareを用い、「〜である」「〜にいる・ある」を表します。",
    "longExplanation": "be動詞は英語で最も基本的かつ重要な動詞であり、主語と名詞・形容詞を結んで状態を表したり、「〜である」「〜にいる・ある」という意味を表します。現在形では、主語の人称や数に応じて3つの形を使い分けます：\n• 'am'：一人称単数の 'I' のみに接続します。\n• 'is'：三人称単数（he、she、it、単数名詞、不可算名詞）に接続します。\n• 'are'：二人称および複数（you、we、they、複数名詞）に接続します。",
    "formation": "主語 + am / is / are (+ 名詞 / 形容詞 / 前置詞句)",
    "examples": [
      {
        "translation": "私はお腹が空いています。"
      },
      {
        "translation": "彼女は医師です。"
      },
      {
        "translation": "彼らは準備ができています。"
      }
    ]
  },
  "en_a1_02": {
    "title": "be動詞の否定文：am not / isn't / aren't",
    "shortExplanation": "be動詞の直後に 'not' を置いて否定を表します。短縮形は isn't、aren't、I'm not です。",
    "longExplanation": "be動詞の否定文を作るには、'am'、'is'、'are' の直後に否定語の 'not' を置きます。会話や親しい間柄の文章では短縮形が広く用いられます：\n• is not → isn't\n• are not → aren't\n• am not は 'amn't' とは短縮せず、主語と短縮して 'I'm not' とします（例外的な重要ルール）。",
    "formation": "主語 + am / is / are + not (+ 名詞 / 形容詞)",
    "examples": [
      {
        "translation": "私は学生ではありません。"
      },
      {
        "translation": "彼は疲れていません。"
      },
      {
        "translation": "私たちは準備ができていません。"
      }
    ]
  },
  "en_a1_03": {
    "title": "be動詞の疑問文：Am I? / Is she? / Are they?",
    "shortExplanation": "be動詞を主語の前に置いて疑問文を作ります。疑問詞がある場合は「疑問詞 + be動詞 + 主語」となります。",
    "longExplanation": "be動詞を含む文を疑問文にするには、be動詞（am / is / are）を主語の前に移動させます（例：She is → Is she?）。\n• 一般疑問文（Yes/No疑問文）：Am / Is / Are + 主語...?\n• 疑問詞疑問文：疑問詞（Where, What, Who など）+ am / is / are + 主語...?\n• 短縮の答え方：Yes, 代名詞 + be動詞. / No, 代名詞 + be動詞 + not.",
    "formation": "Am / Is / Are + 主語...? または 疑問詞 + am / is / are + 主語...?",
    "examples": [
      {
        "translation": "あなたは学生ですか？"
      },
      {
        "translation": "それは高価ですか？"
      },
      {
        "translation": "彼らはどこにいますか？"
      }
    ]
  },
  "en_a1_04": {
    "title": "短い返答：Yes, I am. / No, she isn't.",
    "shortExplanation": "be動詞の質問に対する短い答え：肯定文では短縮形を使えず完全な形で答えます（Yes, I am は可、Yes, I'm は不可）。否定文では短縮形が使われます。",
    "longExplanation": "be動詞のYes/No疑問文に簡潔に答える場合、代名詞とbe動詞を組み合わせて返答します。\n• 肯定の返答（Yes）：be動詞は必ず完全な形で言い、短縮形は使えません（正：Yes, I am. / 誤：Yes, I'm.；正：Yes, she is. / 誤：Yes, she's.）。\n• 否定の返答（No）：通常は短縮形を用います（例：No, I'm not. / No, she isn't. / No, they aren't.）。",
    "formation": "肯定：Yes, + 代名詞 + am / is / are. | 否定：No, + 代名詞 + am not / isn't / aren't.",
    "examples": [
      {
        "translation": "彼女は準備ができていますか？——はい、できています。"
      },
      {
        "translation": "彼らはあなたの友達ですか？——いいえ、違います。"
      }
    ]
  },
  "en_a1_05": {
    "title": "不定冠詞：a / an",
    "shortExplanation": "単数可算名詞の前に置き、特定されていない1つのものを表します。子音の音の前には 'a'、母音の音の前には 'an' を用います。",
    "longExplanation": "'a' と 'an' は不定冠詞と呼ばれ、不特定の単数可算名詞を初めて言及する際にその前に置かれます。どちらを使うかは綴りの文字ではなく、直後の単語の「発音（音）」によって決まります：\n• 'a'：子音の音で始まる単語の前（例：a book, a car, a university ※頭文字の発音は半母音 /juː/ で子音扱い）。\n• 'an'：母音の音で始まる単語の前（例：an apple, an hour ※hが無音で母音 /aʊ/ から発音される、an honest man）。\n• 複数名詞や数えられない名詞（不可算名詞）の前にはつけられません。",
    "formation": "a + 子音の音で始まる語 / an + 母音の音で始まる語 + 単数可算名詞",
    "examples": [
      {
        "translation": "私は庭で1匹の猫を見かけました。"
      },
      {
        "translation": "彼女はエンジニアです。"
      },
      {
        "translation": "1時間かかりました。"
      }
    ]
  },
  "en_a1_06": {
    "title": "定冠詞：the",
    "shortExplanation": "話し手と聞き手双方がどれのことか特定できる名詞の前に置きます。唯一無二のものや最上級などにも用いられます。",
    "longExplanation": "'the' は定冠詞と呼ばれ、単数名詞・複数名詞・不可算名詞のいずれにも接続でき、「その〜」と共通認識できる特定の対象を指します。主な使いどころ：\n1. 前にすでに述べられた名詞を再び指すとき：I saw a cat. The cat was black.\n2. 世の中に1つしか存在しないもの：the sun（太陽）、the moon（月）、the earth（地球）。\n3. その場の文脈や状況からどの対象か明らかなとき：Close the window, please.（窓を閉めてください）。\n4. 形容詞の最上級や序数詞とともに用いるとき：the best、the first。",
    "formation": "the + 名詞（単数・複数・不可算）",
    "examples": [
      {
        "translation": "私たちが見た映画は素晴らしかったです。"
      },
      {
        "translation": "お塩を取っていただけますか？"
      }
    ]
  },
  "en_a1_07": {
    "title": "無冠詞：冠詞をつけない用法",
    "shortExplanation": "固有名詞、言語名、スポーツ、一般的な総称を表す名詞などの前には a、an、the をつけません。",
    "longExplanation": "英語では、名詞の前に冠詞（a, an, the）を置かない「無冠詞」のルールがあります。主な場合は以下の通りです：\n• 固有名詞（人名、都市名、国名）：John, London, Russia, Japan。\n• 言語名：English, Spanish, Japanese。\n• スポーツ競技やゲーム：football, basketball, chess。\n• 一般論として語る飲食物や物質：I love coffee, She drinks tea.\n• 抽象概念の総称：Life is short. Love is blind.\n• 総称を表す複数名詞：Dogs are friendly（犬というものは人懐っこい動物だ）。",
    "formation": "動詞 / 前置詞 + 名詞（冠詞なし）",
    "examples": [
      {
        "translation": "彼女はスペイン語を話します。"
      },
      {
        "translation": "彼は毎日バスケットボールをします。"
      }
    ]
  },
  "en_a1_08": {
    "title": "現在形：肯定文",
    "shortExplanation": "日頃の習慣や普遍の真理、現在の事実を表します。主語が三人称単数の場合は動詞に -s または -es をつけます。",
    "longExplanation": "現在形（Present Simple）は、日頃の習慣、定期的な動作、普遍の真理や確定した予定を表す時制です。\n• 動詞の形のルール：\n- 主語が I / you / we / they や複数名詞の場合：動詞の原形をそのまま使用します。\n- 主語が he / she / it や単数名詞（三人称単数）の場合：動詞の末尾に '-s' または '-es' をつけます（三単現のs）。\n• -s / -es のつけ方：\n- 大半の動詞：語尾に '-s' を追加（works, plays）。\n- 語尾が -o, -ch, -sh, -s, -ss, -x の動詞：'-es' を追加（goes, watches, washes）。\n- 「子音字 ＋ y」で終わる動詞：y を i に変えて '-es'（study → studies, try → tries）。",
    "formation": "主語 (I/you/we/they) + 動詞の原形 | 主語 (he/she/it) + 動詞語尾に -s/-es",
    "examples": [
      {
        "translation": "私は毎朝コーヒーを飲みます。"
      },
      {
        "translation": "彼女は病院で働いています。"
      },
      {
        "translation": "地球は太陽の周りを回っています。"
      }
    ]
  },
  "en_a1_09": {
    "title": "現在形：否定文 (don't / doesn't)",
    "shortExplanation": "助動詞 'don't' または 'doesn't' の直後に動詞の原形を続けて否定文を作ります。",
    "longExplanation": "一般動詞の現在形を否定文にする際は、助動詞 do / does に not をつけた短縮形（don't / doesn't）を動詞の前に置き、動詞は必ず原形にします：\n• 主語が I / you / we / they の場合：don't (do not) + 動詞の原形。\n• 主語が he / she / it（三人称単数）の場合：doesn't (does not) + 動詞の原形。\n重要な注意点：doesn't を用いた場合、動詞の語尾にあった -s や -es は不要となり、必ず原形に戻ります（正：He doesn't like / 誤：He doesn't likes）。",
    "formation": "主語 (I/you/we/they) + don't + 動詞の原形 | 主語 (he/she/it) + doesn't + 動詞の原形",
    "examples": [
      {
        "translation": "私は肉を食べません。"
      },
      {
        "translation": "彼はフランス語を話しません。"
      },
      {
        "translation": "彼らはここでは働いていません。"
      }
    ]
  },
  "en_a1_10": {
    "title": "現在形：疑問文 (Do you? / Does she?)",
    "shortExplanation": "助動詞 Do または Does を主語の前に置き、動詞は原形にします。疑問詞疑問文は「疑問詞 + do/does + 主語 + 動詞の原形」です。",
    "longExplanation": "一般動詞の現在形を疑問文にする際は、助動詞 Do または Does を主語の前に置き、本動詞は原形にします：\n• Yes/No疑問文：\n- Do + I/you/we/they + 動詞の原形...?\n- Does + he/she/it + 動詞の原形...?\n• 疑問詞疑問文：疑問詞（Where, What, When など）+ do / does + 主語 + 動詞の原形...?",
    "formation": "Do / Does + 主語 + 動詞の原形...? または 疑問詞 + do / does + 主語 + 動詞の原形...?",
    "examples": [
      {
        "translation": "あなたはロシア語を話しますか？"
      },
      {
        "translation": "彼女は近くに住んでいますか？"
      },
      {
        "translation": "あなたはどこで働いていますか？"
      }
    ]
  },
  "en_a1_11": {
    "title": "状態動詞：進行形にできない動詞",
    "shortExplanation": "状態や感情、思考、知覚を表す動詞は原則として進行形（-ing）にできません（'I know' と言い、'I am knowing' とは言いません）。",
    "longExplanation": "状態動詞（Stative verbs）は、具体的な動作ではなく、一定期間継続する状態、心理活動、知覚、所有などを表す動詞です。これらの動詞は原則として現在進行形などの進行形（be + -ing）にできません：\n• 思考・認知：know（知っている）、believe（信じる）、understand（理解している）、remember（覚えている）、forget（忘れる）。\n• 感情・願望：love（愛している）、hate（嫌う）、like（好む）、want（欲しい）、need（必要とする）、prefer（〜の方を好む）。\n• 知覚・感覚：see（見える）、hear（聞こえる）、smell（匂いがする）、taste（味がする）。\n• 存在・所属：belong（所属する）、contain（含む）、seem（〜のように思える）。",
    "formation": "主語 + 状態動詞（基本時制で用い、進行形 -ing にはしない）",
    "examples": [
      {
        "translation": "あなたの言うことが分かります。（誤：I am understanding）"
      },
      {
        "translation": "彼女はチョコレートが大好きです。（誤：is loving）"
      }
    ]
  },
  "en_a1_12": {
    "title": "人称代名詞：I, you, he, she, it, we, they",
    "shortExplanation": "英語では主語を省略できません。主語となる主格（I, you, he...）と、動詞や前置詞の目的語となる目的格（me, you, him...）を区別します。",
    "longExplanation": "日本語と異なり、英語の文では命令文などを除いて必ず明示的な主語が必要です（'I' などの主語を省略することはできません）。人称代名詞には主格と目的格の使い分けがあります：\n• 主格（動詞の前に置き、文の主語になる）：I（私）、you（あなた/あなたたち）、he（彼）、she（彼女）、it（それ）、we（私たち）、they（彼ら/それら）。\n• 目的格（動詞や前置詞の直後に置き、目的語になる）：me、you、him、her、it、us、them（例：Tell him, Listen to me, Can you help us?）。",
    "formation": "主格代名詞 + 動詞 | 動詞 / 前置詞 + 目的格代名詞",
    "examples": [
      {
        "translation": "彼女は教師です。"
      },
      {
        "translation": "彼に真実を話しなさい。"
      },
      {
        "translation": "私を手伝っていただけますか？"
      }
    ]
  },
  "en_a1_13": {
    "title": "所有格の形容詞：my, your, his, her, its, our, their",
    "shortExplanation": "名詞の直前に置いて「〜の」という所有を表します。後ろの名詞が単数か複数かによって形が変わることはありません。",
    "longExplanation": "所有格の形容詞（所有限定詞）は、名詞の前に置いて所有者や所属関係を表します：\n• my（私の）、your（あなたの/あなたたちの）、his（彼の）、her（彼女の）、its（それの）、our（私たちの）、their（彼らの/それらの）。\n• 重要な区別：所有を表す 'its'（アポストロフィなし）と、it is の短縮形である 'it's'（アポストロフィあり）を混同しないようにしましょう。\n• 後続の名詞が単数でも複数でも形は変わりません（例：my friend / my friends どちらも同じ 'my'）。",
    "formation": "所有格形容詞 (my / your / his / her / its / our / their) + 名詞",
    "examples": [
      {
        "translation": "これは私のスマートフォンです。"
      },
      {
        "translation": "彼らの犬は可愛いです。"
      },
      {
        "translation": "その猫は足を怪我しました。"
      }
    ]
  },
  "en_a1_14": {
    "title": "名詞の複数形",
    "shortExplanation": "規則変化では語尾に -s または -es をつけます。-y や -f/-fe で終わる単語の変化や、不規則に変化する名詞もあります。",
    "longExplanation": "英語の数えられる名詞（可算名詞）が2つ以上ある場合、複数形にします：\n• 基本ルール：名詞の語尾に '-s' をつける（cat → cats, book → books）。\n• 語尾が -s, -ss, -sh, -ch, -x, -o の場合：'-es' をつける（box → boxes, watch → watches, tomato → tomatoes）。\n• 「母音字 ＋ y」で終わる場合：そのまま '-s' をつける（boy → boys, day → days）。\n• 「子音字 ＋ y」で終わる場合：y を i に変えて '-es'（city → cities, baby → babies）。\n• 語尾が -f または -fe の場合：-ves に変える（knife → knives, leaf → leaves, wife → wives）。\n• 代表的な不規則変化名詞：child → children, man → men, woman → women, tooth → teeth, foot → feet, mouse → mice, person → people, sheep → sheep, fish → fish。",
    "formation": "単数名詞 + s / es / ies / ves（または不規則変化形）",
    "examples": [
      {
        "translation": "バス1台 → バス2台"
      },
      {
        "translation": "子ども1人 → たくさんの子どもたち"
      }
    ]
  },
  "en_a1_15": {
    "title": "指示代名詞：This / that / these / those",
    "shortExplanation": "話し手に近いものを指す this/these（これ/これら）と、遠いものを指す that/those（あれ/あれら）。単数には this/that、複数には these/those を用います。",
    "longExplanation": "指示代名詞は、話し手からの距離（空間的または時間的）と数量（単数か複数か）に応じて使い分けます：\n• 'this'（これ、この人）：話し手の近くにある単数の対象。\n• 'these'（これら、この人たち）：話し手の近くにある複数の対象。\n• 'that'（あれ、それ、あの人）：話し手から離れた位置にある単数の対象、または既出の内容。\n• 'those'（あれら、それら、あの人たち）：話し手から離れた位置にある複数の対象。\nまた、時間的な近さや遠さを表す際にも用いられます：this week（今週）、that year（あの年）。",
    "formation": "This / That + 単数名詞（または単数動詞）| These / Those + 複数名詞（または複数動詞）",
    "examples": [
      {
        "translation": "これは私のカバンです。"
      },
      {
        "translation": "あの靴は高いです。"
      },
      {
        "translation": "あれは何ですか？"
      }
    ]
  },
  "en_a1_16": {
    "title": "There is / There are - 存在を表す構文",
    "shortExplanation": "人や物が特定の場所に存在することを表し、「〜がある」「〜がいる」という意味になります。",
    "longExplanation": "「There is / There are」構文は、新情報として人や物が存在することを表す表現で、日本語の「〜がある」「〜がいる」に相当します。\n• There is ＋ 単数名詞または不可算名詞。\n• There are ＋ 複数名詞。\n否定文：There isn't / There aren't。\n疑問文：be動詞を文頭に出して Is there...? / Are there...?",
    "formation": "肯定文：There is ＋ 単数名詞/不可算名詞 | There are ＋ 複数名詞\n否定文：There isn't / There aren't ＋ 名詞\n疑問文：Is there...? / Are there...?",
    "examples": [
      {
        "translation": "この近くに映画館があります。"
      },
      {
        "translation": "近くに店はありますか？——はい、あります。"
      }
    ]
  },
  "en_a1_17": {
    "title": "場所の前置詞：in, on, at, under, next to, behind, between",
    "shortExplanation": "人や物が存在する空間的な位置を表し、「〜の中に」「〜の上に」「〜で」などを表します。",
    "longExplanation": "代表的な3つの場所の前置詞：\n• in ＝ 空間や枠組みの「中」：in the box（箱の中に）、in the city（都市に）、in bed（ベッドの中に）\n• on ＝ 物の「表面・接触面の上」：on the table（机の上に）、on the wall（壁に）、on the left（左側に）\n• at ＝ 地図上の「特定の地点・場所」：at the station（駅で）、at home（家で）、at school（学校で）\nその他の前置詞：under（〜の下に）、next to / beside（〜の隣に）、behind（〜の後ろに）、in front of（〜の前に）、between（〜の間に）、opposite（〜の向かいに）。",
    "formation": "場所の前置詞（in / on / at / under / next to / behind...） ＋ 名詞句・場所",
    "examples": [
      {
        "translation": "鍵はテーブルの上にあります。"
      },
      {
        "translation": "彼女はキッチンにいます。"
      },
      {
        "translation": "入口で会いましょう。"
      }
    ]
  },
  "en_a1_18": {
    "title": "命令文（Imperative）",
    "shortExplanation": "指示、命令、依頼、勧誘などを表し、「〜しなさい」「〜しないで」「〜しましょう」という意味になります。",
    "longExplanation": "英語の命令文は、主語を置かずに動詞の原形で文を始めます。\n• 肯定の命令：動詞の原形から始める（例：Open your books - 本を開きなさい）。\n• 否定の命令（禁止）：Don't ＋ 動詞の原形（例：Don't run - 走らないで）。\n• 文頭または文末に「please」を添えると丁寧な依頼になります。\n• 話し手を含む勧誘・提案：「Let's ＋ 動詞の原形」（例：Let's go! - 一緒に行きましょう！）。",
    "formation": "肯定命令：動詞原形（＋ 目的語など）\n否定命令（禁止）：Don't ＋ 動詞原形\n丁寧な依頼：(Please) ＋ 動詞原形 ＋ (please)\n勧誘：Let's ＋ 動詞原形",
    "examples": [
      {
        "translation": "交差点を左に曲がってください。"
      },
      {
        "translation": "それに触らないで！"
      },
      {
        "translation": "少し休憩しましょう。"
      }
    ]
  },
  "en_a1_19": {
    "title": "can / can't - 能力・可能性・許可",
    "shortExplanation": "能力、可能性、または許可を求める際に用いる助動詞で、「〜できる」「〜してもよい」／「〜できない」を表します。",
    "longExplanation": "「can」は助動詞で、後ろに動詞の原形を取り、主に以下の意味を表します：\n1. 能力・技能：「〜ができる」（例：I can play the guitar - ギターが弾ける）\n2. 可能性：「〜することがある・あり得る」（例：It can be dangerous - 危険なこともある）\n3. 許可・依頼（口語）：「〜してもいいですか／〜してくれますか」（例：Can I use your phone? - 電話を使ってもいいですか？）\n否定形は can't（cannot の短縮形）です。",
    "formation": "肯定文：主語 ＋ can ＋ 動詞原形\n否定文：主語 ＋ can't (cannot) ＋ 動詞原形\n疑問文：Can ＋ 主語 ＋ 動詞原形...?",
    "examples": [
      {
        "translation": "私は3つの言語を話すことができます。"
      },
      {
        "translation": "彼女は今日来ることができません。"
      },
      {
        "translation": "手伝っていただけますか？"
      }
    ]
  },
  "en_a1_20": {
    "title": "疑問詞：what, where, who, when, how, why, which, whose, how much/many",
    "shortExplanation": "具体的な情報を尋ねる特殊疑問文（Wh疑問文）をつくる語で、「何」「どこ」「誰」「いつ」などを表します。",
    "longExplanation": "疑問詞は原則として文頭に置き、その後に「助動詞/be動詞 ＋ 主語」の倒置形が続きます。\n• what ＝ 何\n• where ＝ どこ\n• who ＝ 誰（主語を尋ねる場合はdo/doesを使わず：Who lives here?）\n• when ＝ いつ\n• why ＝ なぜ、どうして\n• which ＝ どちら、どれ（選択肢が限られている場合）\n• whose ＝ 誰のもの\n• how ＝ どのように；how much ＝ いくら・どのくらい（不可算名詞や値段）；how many ＝ いくつ（可算名詞の複数形）；how old ＝ 何歳；how long ＝ どのくらいの長さ/期間。",
    "formation": "疑問詞 ＋ 助動詞 / be動詞 ＋ 主語 ＋ 動詞原形 / 補語...?",
    "examples": [
      {
        "translation": "彼女はどこで働いていますか？"
      },
      {
        "translation": "今、何時ですか？"
      },
      {
        "translation": "兄弟は何人いますか？"
      }
    ]
  },
  "en_a1_21": {
    "title": "基数詞（数詞）：1〜1000",
    "shortExplanation": "人や物の数量を数えるときに用いる数詞で、「1、2、3……100、1000」を表します。",
    "longExplanation": "1から1000までの英語の基数詞の構成ルール：\n• 1〜12：固有の単語（one, two, three... twelve）。\n• 13〜19：語尾に「-teen」を付ける（thirteen, fourteen... nineteen；thirteen, fifteen, eighteenの綴りに注意）。\n• 10の倍数（20〜90）：語尾に「-ty」を付ける（twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety）。\n• 2桁の複合数：ハイフンで結ぶ（例：21 ＝ twenty-one）。\n• 100 ＝ a/one hundred、1000 ＝ a/one thousand。\n• イギリス英語では、hundredの後に「and」を補って十の位や一の位を続けます（例：two hundred and fifty）。",
    "formation": "十の位 ＋ ハイフン（-） ＋ 一の位（21〜99） | 数 ＋ hundred / thousand（＋ and ＋ 数字）",
    "examples": [
      {
        "translation": "彼女は23歳です。"
      },
      {
        "translation": "そのチケットは400ポンドします。"
      }
    ]
  },
  "en_a1_22": {
    "title": "序数詞（順序を表す数）：first, second, third...",
    "shortExplanation": "順序、順番、日付、建物の階数などを表し、「第1の、1番目の」という意味になります。",
    "longExplanation": "英語の序数詞は、原則として基数詞の末尾に「-th」を付けて作ります（fourth, sixth, seventhなど）。\n例外的な不規則変化：first（第1）、second（第2）、third（第3）、fifth（第5）、eighth（第8）、ninth（第9）、twelfth（第12）。\n重要ルール：順序が特定されるため、通常は定冠詞「the」を伴います（例：the first day - 初日、the third floor - 3階）。\n分数表現にも用いられます：½ ＝ a half（2分の1）、⅓ ＝ a third（3分の1）、¼ ＝ a quarter（4分の1）。",
    "formation": "the ＋ 序数詞（＋ 名詞） | （例：the first, the second, the third... the twenty-first）",
    "examples": [
      {
        "translation": "私のオフィスは3階にあります。"
      },
      {
        "translation": "今日は3月1日です。"
      }
    ]
  },
  "en_a1_23": {
    "title": "名詞の所有格：'s と s'",
    "shortExplanation": "アポストロフィと「s」を用いて所有・所属関係を表し、「〜の」を意味します。",
    "longExplanation": "英語では、アポストロフィと「s」（'s または s'）を名詞に付けることで所有関係を表します：\n• 単数名詞：末尾に「's」を付ける（例：Tom's book - トムの本、the dog's tail - 犬のしっぽ）。\n• -sで終わる規則複数名詞：末尾にアポストロフィ「'」のみを付ける（例：the teachers' room - 職員室、my parents' house - 両親の家）。\n• 不規則複数名詞（-sで終わらない複数形）：「's」を付ける（例：the children's playground - 子どもたちの遊び場、men's clothes - 紳士服）。\n• -sで終わる固有名詞（人名など）：James's でも James' でもどちらも正しいです。",
    "formation": "単数名詞 ＋ 's ＋ 名詞 | -sで終わる複数名詞 ＋ ' ＋ 名詞",
    "examples": [
      {
        "translation": "これはアナのノートパソコンです。"
      },
      {
        "translation": "子どもたちのおもちゃは箱の中にあります。"
      }
    ]
  },
  "en_a1_24": {
    "title": "移動・方向の前置詞：to, into, out of, up, down, along, across, through",
    "shortExplanation": "移動動詞とともに用い、動作の移動方向や経路を表します。「〜へ」「〜の中へ」「〜を横切って」など。",
    "longExplanation": "移動を表す動詞とともに使われ、動きの方向や軌跡を表す前置詞です：\n• to ＝ ある地点への方向・到達：go to work（仕事に行く）、walk to the park（公園へ歩く）\n• into ＝ 空間の内部への進入：come into the room（部屋に入ってくる）、jump into the pool（プールに飛び込む）\n• out of ＝ 内部から外部への移動：get out of the car（車から降りる）、take out of the bag（バッグから取り出す）\n• up / down ＝ 上方向へ / 下方向へ：climb up the hill（丘を登る）、walk down the stairs（階段を降りる）\n• along ＝ 〜に沿って：walk along the river（川沿いを歩く）\n• across ＝ 平面を横切って・渡って：swim across the lake（湖を泳いで渡る）、walk across the road（道を横断する）\n• through ＝ 立体的な空間・トンネルなどを通り抜けて：drive through the tunnel（トンネルを車で通り抜ける）。",
    "formation": "移動動詞 ＋ 移動の前置詞（to / into / out of / across / through...） ＋ 名詞・場所",
    "examples": [
      {
        "translation": "彼女は部屋の中へ入って行きました。"
      },
      {
        "translation": "彼は走って通りを横切りました。"
      },
      {
        "translation": "私たちは車で森の中を通り抜けました。"
      }
    ]
  },
  "en_a2_01": {
    "title": "過去形（規則動詞）：-ed の付加",
    "shortExplanation": "過去に完了した動作や状態を表す表現で、規則動詞は語尾に「-ed」を付けます。",
    "longExplanation": "過去形は、過去の特定の時点で起きてすでに完了した動作や状態を表します。\n規則動詞に「-ed」を付ける際の綴りの規則：\n• 多くの動詞：そのまま「-ed」を付ける（worked, played）。\n• 「-e」で終わる動詞：「-d」のみを付ける（loved, used）。\n• 「子音字 ＋ y」で終わる動詞：「y」を「i」に変えて「-ed」を付ける（studied, tried）。\n• 「短母音 ＋ 1つの子音字」で終わる1音節の動詞：最後の子音字を重ねて「-ed」を付ける（stopped, planned）。",
    "formation": "主語 ＋ 規則動詞の過去形（-ed） （＋ 目的語・過去を表す副詞句）",
    "examples": [
      {
        "translation": "彼女は昨日、一日中働きました。"
      },
      {
        "translation": "彼らはこの前の日曜日にテニスをしました。"
      }
    ]
  },
  "en_a2_02": {
    "title": "過去形（不規則動詞）",
    "shortExplanation": "「-ed」を付けずに独自の形に変化する不規則動詞を用いて、過去の動作を表します。",
    "longExplanation": "英語の日常会話で最もよく使われる動詞の多くは、過去形にする際に「-ed」を付ける規則変化ではなく、独自の形に変化する不規則動詞です（最頻出の約50語で全体の約90%をカバーします）。\n変化パターンの分類：\n• AAA型（原形・過去形・過去分詞がすべて同じ）：cut, put, hit, set, let。\n• ABA型（過去分詞が原形と同じ）：run→ran→run, come→came→come。\n• ABC型（3つすべて異なる）：go→went→gone, be→was/were→been, see→saw→seen。\n• ABB型（過去形と過去分詞が同じ）：have→had→had, buy→bought→bought。",
    "formation": "主語 ＋ 不規則動詞の過去形 （＋ 目的語・過去を表す副詞句）",
    "examples": [
      {
        "translation": "私は去年の夏、パリへ行きました。"
      },
      {
        "translation": "彼女は素晴らしい映画を見ました。"
      },
      {
        "translation": "私たちは9時に会議がありました。"
      }
    ]
  },
  "en_a2_03": {
    "title": "過去形（否定文）：didn't ＋ 動詞原形",
    "shortExplanation": "過去に行われなかった動作や事実を否定し、「〜しなかった」という意味を表します。",
    "longExplanation": "一般動詞の過去形の否定文は、主語の人称や単複にかかわらず、助動詞「did not」の短縮形「didn't」を用います。\n最重要ポイント：「didn't」の後ろに続く本動詞は必ず「動詞の原形」に戻します。過去形を重ねて使わないように注意してください（例：She didn't go は正しいですが、She didn't went とは言えません）。",
    "formation": "主語 ＋ didn't (did not) ＋ 動詞原形",
    "examples": [
      {
        "translation": "私は昨日、彼を見かけませんでした。"
      },
      {
        "translation": "彼女は仕事に来ませんでした。"
      }
    ]
  },
  "en_a2_04": {
    "title": "過去形（疑問文）：Did you? Where did she go?",
    "shortExplanation": "過去の出来事について尋ねる疑問文で、「〜しましたか？」「どこへ行きましたか？」などを表します。",
    "longExplanation": "一般動詞の過去形の疑問文の作り方：\n• Yes/No疑問文：助動詞「Did」を文頭に出し、動詞を原形にします：Did ＋ 主語 ＋ 動詞原形〜？（例：Did they arrive? - 彼らは到着しましたか？）\n• 疑問詞を含む疑問文：文頭に疑問詞を置き、その後に did ＋ 主語 ＋ 動詞原形 を続けます：疑問詞 ＋ did ＋ 主語 ＋ 動詞原形〜？（例：Where did they go? - 彼らはどこへ行きましたか？）\n• 例外：疑問詞自体が主語になる場合は、didを用いずに動詞を過去形のまま置きます（例：Who told you that? - 誰があなたにそれを言いましたか？）。",
    "formation": "Yes/No疑問文：Did ＋ 主語 ＋ 動詞原形...?\n疑問詞疑問文：疑問詞 ＋ did ＋ 主語 ＋ 動詞原形...?",
    "examples": [
      {
        "translation": "映画は楽しめましたか？"
      },
      {
        "translation": "彼らはどこへ行きましたか？"
      },
      {
        "translation": "誰があなたにそう言ったのですか？"
      }
    ]
  },
  "en_a2_05": {
    "title": "was / were - be動詞の過去形",
    "shortExplanation": "be動詞の過去の形で、過去における状態、所在、身分などを表し、「〜だった」「〜にいた」を意味します。",
    "longExplanation": "be動詞の過去形には、主語の人称と数に応じて「was」と「were」の2つの形があります：\n• was：主語が I, he, she, it および単数名詞・不可算名詞の場合に使います。\n• were：主語が you, we, they および複数名詞の場合に使います。\n否定文：wasn't（＝ was not） / weren't（＝ were not）。\n疑問文：was または were を主語の前に出します：Was she...? / Were they...?",
    "formation": "肯定文：I / He / She / It ＋ was | You / We / They ＋ were\n否定文：主語 ＋ wasn't / weren't\n疑問文：Was / Were ＋ 主語...?",
    "examples": [
      {
        "translation": "昨晩、私はとても疲れていました。"
      },
      {
        "translation": "彼らは一日中家にいました。"
      },
      {
        "translation": "それは高かったですか？"
      }
    ]
  },
  "en_a2_06": {
    "title": "will - 予測と即座の意思決定",
    "shortExplanation": "その場で下した決定、未来の予測、約束、依頼などを表す助動詞で、「〜するつもりだ」「〜だろう」を意味します。",
    "longExplanation": "助動詞「will」は後ろに動詞の原形を取り、主に以下のような未来の事柄を表します：\n1. その場での即座の決定（発話時に決めたこと）：I'll help you with that（それ、手伝うよ）。\n2. 根拠に基づかない主観的な予測：I think it will rain（雨が降ると思います）。\n3. 約束：I won't tell anyone（誰にも言いません）。\n4. 依頼：Will you open the window?（窓を開けてくれませんか？）。\n短縮形は「'll」、否定形は「won't」（＝ will not）です。",
    "formation": "肯定文：主語 ＋ will ('ll) ＋ 動詞原形\n否定文：主語 ＋ won't (will not) ＋ 動詞原形\n疑問文：Will ＋ 主語 ＋ 動詞原形...?",
    "examples": [
      {
        "translation": "電話が鳴っています。——私が出ます！"
      },
      {
        "translation": "明日は寒くなるでしょう。"
      }
    ]
  },
  "en_a2_07": {
    "title": "be going to - 予定・意図と根拠のある予測",
    "shortExplanation": "事前に決めていた予定や意図、または目に見える根拠に基づく予測を表します。",
    "longExplanation": "「be going to」は主に以下の場面で用いられます：\n1. 事前に決めていた予定や意志：「I'm going to start a diet next week.」（来週からダイエットを始める予定です）。\n2. 目の前の兆候に基づく予測：「Look at those clouds - it's going to rain!」（あの雲を見て、雨が降りそうだ！）。\n構造：am/is/are + going to + 動詞の原形",
    "formation": "主語 + am/is/are + going to + 動詞の原形",
    "examples": [
      {
        "translation": "私は医学を勉強するつもりです。"
      },
      {
        "translation": "彼女は赤ちゃんが生まれる予定です。"
      }
    ]
  },
  "en_a2_08": {
    "title": "現在進行形：am/is/are + V-ing",
    "shortExplanation": "今まさに起きている動作や、現時点で一時的に行われている行為を表します。",
    "longExplanation": "現在進行形（Present Continuous）は、話しているまさにその瞬間に進行している動作や、最近一時的に行っている事柄を表します。\n構造：am/is/are + 動詞の-ing形\n-ingの付け方の規則：\n• ほとんどの動詞：そのまま-ingを付ける → working, playing\n• 語尾が-eで終わる語：-eを取り除いて-ingを付ける → making, coming\n• 短母音＋子音字で終わる1音節の語：末尾の子音字を重ねて-ingを付ける → running, sitting",
    "formation": "主語 + am/is/are + 動詞-ing",
    "examples": [
      {
        "translation": "私は今、英語を勉強しています。"
      },
      {
        "translation": "彼女は今月、在宅勤務をしています。"
      }
    ]
  },
  "en_a2_09": {
    "title": "確定した未来の予定を表す現在進行形",
    "shortExplanation": "時間や場所などがすでに手配・約束されている確実な未来の予定を表します。",
    "longExplanation": "現在進行形は、日時や場所があらかじめ決められている具体的な予定・取り決めを表す際にも用いられます。\nニュアンスの違い：\n• 「I'm meeting Alice tomorrow」：アリスとの面会の約束がすでに済んでいる（確定した予定）。\n• 「I'll meet Alice tomorrow」：その場で決めた意志や提案。",
    "formation": "主語 + am/is/are + 動詞-ing + 未来を表す副詞句",
    "examples": [
      {
        "translation": "今夜アレックスとディナーを食べる予定です。"
      },
      {
        "translation": "彼らは6月に結婚します。"
      }
    ]
  },
  "en_a2_10": {
    "title": "現在形と現在進行形の違い",
    "shortExplanation": "現在形は習慣や普遍の事実を表し、現在進行形は今まさに起きていることや一時的な状態を表します。",
    "longExplanation": "現在形（Present Simple）：普段の習慣、客観的な事実、確定した時刻表、一般的な真理を表します。\n現在進行形（Present Continuous）：今この瞬間に起きていることや、一時的な動作・状態を表します。\n比較例：\n• 「She speaks French.」：彼女はフランス語を話せる（永続的な能力・状態）。\n• 「She is speaking French.」：彼女は今まさにフランス語を話している。",
    "formation": "現在形：主語 + 動詞原形/三人称単数形 | 現在進行形：主語 + am/is/are + 動詞-ing",
    "examples": [
      {
        "translation": "水は100度で沸騰します。"
      },
      {
        "translation": "今週、私は素晴らしい本を読んでいます。"
      }
    ]
  },
  "en_a2_11": {
    "title": "should / shouldn't - 助言・提案",
    "shortExplanation": "穏やかなアドバイスや個人的な意見を表し、「〜すべきだ」「〜しないほうがいい」という意味になります。",
    "longExplanation": "「should」は強制力のない親身な助言や提案、主観的な意見を表します（「must」よりも柔らかいニュアンス）。\n「should / shouldn't」の後にはtoの付かない動詞の原形が続きます。\nまた、「should have + 過去分詞」の形で過去に対する後悔や非難を表すこともできます。",
    "formation": "主語 + should / shouldn't + 動詞の原形",
    "examples": [
      {
        "translation": "もっと運動したほうがいいですよ。"
      },
      {
        "translation": "彼女はそんなに無理して働くべきではありません。"
      }
    ]
  },
  "en_a2_12": {
    "title": "must / mustn't - 義務と厳格な禁止",
    "shortExplanation": "「must」は強い義務や命令を表し、「mustn't」は絶対にしてはならない禁止を表します。",
    "longExplanation": "「must」は強い義務（話し手自身の強い意志や確信）や絶対的な要求を表します。\n一方「mustn't」は強い禁止（絶対にダメ、許されないこと）を表します。\n使い分けの注意点：\n• mustn't ＝ 〜してはならない（禁止）\n• don't have to ＝ 〜する必要はない（自由選択であり、禁止ではない）",
    "formation": "主語 + must / mustn't + 動詞の原形",
    "examples": [
      {
        "translation": "パスポートを提示しなければなりません。"
      },
      {
        "translation": "ここでタバコを吸ってはいけません。"
      }
    ]
  },
  "en_a2_13": {
    "title": "have to - 客観的な必要性",
    "shortExplanation": "規則、法律、外部の状況などによって「〜しなければならない」という客観的な義務を表します。",
    "longExplanation": "「have to」は、ルールや周囲の状況、他者の要求などの外的要因によって生じる必要性を表します。\n「must」との違い：\n• must - 話し手自身の内面的な必要性：「I must call her」（自分の気持ちとして電話しなきゃと思う）。\n• have to - 外的な規則や状況：「I have to wear a uniform」（規則なので制服を着なければならない）。\n否定形の「don't have to」は「〜する必要はない（自由）」という意味になります。",
    "formation": "主語 + have to / has to / don't have to / doesn't have to + 動詞の原形",
    "examples": [
      {
        "translation": "金曜日までにこの報告書を仕上げなければなりません。"
      },
      {
        "translation": "来たくないなら、来なくてもいいですよ。"
      }
    ]
  },
  "en_a2_14": {
    "title": "could - 過去の能力・丁寧な依頼",
    "shortExplanation": "過去にできた能力を表すほか、相手に丁寧に頼み事をする際の「〜していただけますか」を表します。",
    "longExplanation": "「could」は「can」の過去形であり、主に2つの使い方があります：\n1. 過去における能力：「I could read at 4 years old.」（4歳の時に本が読めました）。\n2. 丁寧な依頼・お願い（canより丁寧で控えめな表現）：「Could you pass the salt, please?」（お塩を取っていただけますか？）。\nまた、現在の可能性（「〜かもしれない」）を表すこともあります：「It could be true.」（本当かもしれない）。",
    "formation": "主語 + could + 動詞の原形 | Could + 主語 + 動詞の原形...?",
    "examples": [
      {
        "translation": "彼女は子どもの頃バイオリンを弾くことができました。"
      },
      {
        "translation": "もう少しゆっくり話していただけますでしょうか？"
      }
    ]
  },
  "en_a2_15": {
    "title": "形容詞の比較級",
    "shortExplanation": "2つのものを比較する表現です。短い形容詞は語尾に-erを付け、長い形容詞は前にmoreを置きます。",
    "longExplanation": "比較級の作り方：\n• 1音節の語および-yで終わる2音節の語：語尾に-erを付ける（fast → faster, happy → happier）。\n• 2音節以上の長い語：more + 形容詞原級（more interesting）。\n• つづりの規則：語尾が-eの語は-rのみ（nice → nicer）、短母音＋子音字は末尾の子音字を重ねる（big → bigger）、子音字＋-yは-ierに変える（heavy → heavier）。\n• 不規則変化：good → better, bad → worse, far → further/farther, much/many → more。\n比較の対象を示す接続詞thanとともに使います：「She is taller than her sister.」",
    "formation": "短い形容詞-er + than / more + 長い形容詞 + than",
    "examples": [
      {
        "translation": "この映画はあの映画よりも面白いです。"
      },
      {
        "translation": "今日は昨日よりも悪いです。"
      }
    ]
  },
  "en_a2_16": {
    "title": "形容詞の最上級",
    "shortExplanation": "3つ以上のものの中で「最も〜」であることを表します。短い形容詞にはthe + -est、長い形容詞にはthe mostを付けます。",
    "longExplanation": "最上級の作り方：\n• 1音節の語：the + 語尾に-estを付ける（the biggest）。\n• 多音節の語：the most + 形容詞原級（the most beautiful）。\n• つづりの変化規則は比較級と同様です：語尾が-eの語は-stのみ、短母音＋子音字は末尾の子音字を重ねる、子音字＋-yは-iestに変える。\n• 不規則変化：good → the best, bad → the worst, far → the furthest/farthest, much/many → the most。",
    "formation": "the + 短い形容詞-est / the most + 長い形容詞",
    "examples": [
      {
        "translation": "ここは市内で最も高級なレストランです。"
      },
      {
        "translation": "彼はチームの中で一番優秀な選手です。"
      }
    ]
  },
  "en_a2_17": {
    "title": "some / any - 不特定な数量を表す表現",
    "shortExplanation": "「some」は肯定文や丁寧な勧誘・依頼で用いられ、「any」は否定文や通常の疑問文で用いられます。",
    "longExplanation": "「some」と「any」は数えられない名詞（不可算名詞）または複数形の名詞とともに用いられ、不特定の数量（いくつか、いくらか）を表します：\n• some：主に肯定文で使われます。また、相手に勧める時や肯定の返答を期待する依頼の疑問文でも使われます（例：「Would you like some tea?」「Can I have some water?」）。\n• any：主に否定文（「一つも〜ない」）や一般的な疑問文（「少しでも〜あるか」）で使われます。",
    "formation": "some / any + 不可算名詞 または 複数名詞",
    "examples": [
      {
        "translation": "パンと牛乳を少し買いました。"
      },
      {
        "translation": "冷蔵庫に牛乳はありますか？"
      },
      {
        "translation": "現金の持ち合わせが全くありません。"
      }
    ]
  },
  "en_a2_18": {
    "title": "much / many / a lot of / a few / a little - 数量を表す語",
    "shortExplanation": "「much/a little」は不可算名詞に、「many/a few」は可算名詞に、「a lot of」は両方に使われます。",
    "longExplanation": "数量を表す修飾語の使い分け：\n• much：数えられない名詞に用います（much water, much time）。主に否定文や疑問文で使われます。\n• many：数えられる名詞の複数形に用います（many people, many books）。\n• a lot of / lots of：どちらの名詞にも使え、会話表現で頻繁に用いられます。\n• a few：少数の、2〜3の（可算名詞・肯定的なニュアンス）。\n• few：ほとんどない（可算名詞・否定的なニュアンス）。\n• a little：少量の、少しの（不可算名詞・肯定的なニュアンス）。\n• little：ほとんどない（不可算名詞・否定的なニュアンス）。",
    "formation": "much/a little + 不可算名詞 | many/a few + 可算名詞複数形 | a lot of + 両方",
    "examples": [
      {
        "translation": "私にはあまり時間がありません。"
      },
      {
        "translation": "彼女にはロンドンに何人か友人がいます。"
      },
      {
        "translation": "砂糖が少し残っています。"
      }
    ]
  },
  "en_a2_19": {
    "title": "可算名詞と不可算名詞",
    "shortExplanation": "可算名詞は1つ2つと数えられ複数形がありますが、不可算名詞は直接数えられず複数形や不定冠詞を持ちません。",
    "longExplanation": "英語における名詞の分類：\n• 可算名詞（Countable）：直接数えることができ、単数形と複数形が存在します（例：a book, two books）。\n• 不可算名詞（Uncountable）：直接数字で数えられないため、複数形がなく、不定冠詞（a/an）を付けることもできません。\n代表的な不可算名詞：water（水）、milk（牛乳）、bread（パン）、rice（米）、money（お金）、information（情報）、advice（助言）、news（ニュース）、weather（天気）、luggage（荷物）、furniture（家具）、hair（髪）、music（音楽）、work（仕事）。\n不可算名詞の分量を表すには単位表現を用います：a glass of water（コップ一杯の水）、a piece of advice（一つの助言）、a loaf of bread（パン一斤）、a bag of rice（米一袋）。",
    "formation": "可算名詞：a/an + 単数名詞 / 複数名詞-s/es | 不可算名詞：単位を表す語 + of + 不可算名詞",
    "examples": [
      {
        "translation": "情報を少し教えていただけますでしょうか？"
      },
      {
        "translation": "彼女はとても役に立つアドバイスをくれました。"
      }
    ]
  },
  "en_a2_20": {
    "title": "時を表す前置詞 in / on / at",
    "shortExplanation": "「at」は特定の時刻、「on」は曜日や日付、「in」は月・年・季節・時間帯などに使います。",
    "longExplanation": "時を表す前置詞の使い分け：\n• at → ピンポイントの時刻や決まった時：at 6 o'clock（6時に）、at noon（正午に）、at midnight（真夜中に）、at night（夜に）、at the weekend（週末に）。\n• on → 特定の日や曜日、日付：on Monday（月曜日に）、on 5 March（3月5日に）、on my birthday（私の誕生日に）、on New Year's Day（元日に）。\n• in → ある程度の幅がある期間（月、年、季節、世紀、一日の時間帯）：in July（7月に）、in 2023（2023年に）、in the morning/afternoon/evening（午前中/午後/夕方に）、in summer（夏に）、in the 21st century（21世紀に）。\n前置詞を伴わない場合：this / last / nextが付く時間表現には前置詞を置きません（例：this morning, last week, next year）。",
    "formation": "at + 時刻・時点 | on + 曜日・特定の日 | in + 月・年・季節・世紀",
    "examples": [
      {
        "translation": "会議は3時半からです。"
      },
      {
        "translation": "彼女は4月12日に生まれました。"
      },
      {
        "translation": "私は10月にこの仕事を始めました。"
      }
    ]
  },
  "en_a2_21": {
    "title": "for / since / ago - 期間・起点・過去の時点",
    "shortExplanation": "「for」は継続する期間を表し、「since」は開始した起点を表し、「ago」は現在から遡った過去の時点を表します。",
    "longExplanation": "「for」「since」「ago」の使い分け：\n• for - 動作がどれくらい続いているかという期間を表します：for two hours（2時間）、for a week（1週間）、for years（何年間も）。様々な時制で用いられます。\n• since - 行為や状態が始まった過去の起点（〜以来）を表します：since Monday（月曜日から）、since 2019（2019年から）、since I was a child（子どもの頃から）。主に現在完了形とともに用いられます。\n• ago - 現在を基準として「〜前」という過去の時点を表します：three days ago（3日前）、a month ago（1ヶ月前）。過去形とのみ組み合わせて使います。",
    "formation": "for + 期間 | since + 起点となる時点・過去の節 | 期間 + ago",
    "examples": [
      {
        "translation": "私はここに6か月間います。"
      },
      {
        "translation": "彼女は2020年からここで働いています。"
      },
      {
        "translation": "私は2日前に彼と会いました。"
      }
    ]
  },
  "en_a2_22": {
    "title": "付加疑問文：...isn't it? / ...do you? / ...haven't they?",
    "shortExplanation": "平叙文の末尾につけて確認や同意を求める表現。「～ですよね？」「～でしょう？」の意味。",
    "longExplanation": "付加疑問文は、相手に事実を確認したり、同意を求めたりする際に文末に付け加えられる表現です。日本語の「～ですよね？」「～じゃないですか？」に相当します。\n基本ルール：\n• 前が肯定文なら後ろは否定の疑問尾句（例：ジャズが好きなんですよね？）。\n• 前が否定文なら後ろは肯定の疑問尾句（例：ホラー映画は好きじゃないんですよね？）。\n尾句で使う助動詞（またはbe動詞・助動詞）は、主文の時制および主語と一致させ、主語には代名詞を用います。\nイントネーションによるニュアンスの違い：\n• 語尾を下げる（↘）：単なる同意・確認（ほぼ相手の同意を確信している場合）。\n• 語尾を上げる（↗）：本当の質問（確信がなく、事実を確かめたい場合）。",
    "formation": "肯定文：肯定の平叙文 + , + 否定の助動詞 + 主語の代名詞？\n否定文：否定の平叙文 + , + 肯定の助動詞 + 主語の代名詞？",
    "examples": [
      {
        "translation": "いいお天気ですね？"
      },
      {
        "translation": "ホラー映画は好きじゃないんですよね？"
      },
      {
        "translation": "彼女は泳げますよね？"
      }
    ]
  },
  "en_a2_23": {
    "title": "have got - 所有を表す表現（イギリス英語口語）",
    "shortExplanation": "主にイギリス英語の日常会話で所有を表す表現。一般動詞 have と同じく「～を持っている」「～がある」という意味。",
    "longExplanation": "have got は、主にイギリス英語の口語でよく用いられる所有表現で、意味は動詞 have（持っている）と同じです。\n文の構成：\n• 肯定文：主語 + have got / has got（短縮形：'ve got / 's got）。\n• 否定文：主語 + haven't got / hasn't got（do や does の助動詞を補う必要はありません）。\n• 疑問文：Have / Has + 主語 + got ...?（短い返答：Yes, I have. / No, I haven't.）。\n注意点：この形は現在時制のみで使用されます。過去の所有を表す場合は had got ではなく単に had を用います。",
    "formation": "肯定文：主語 + have got / has got + 名詞\n否定文：主語 + haven't got / hasn't got + 名詞\n疑問文：Have / Has + 主語 + got + 名詞？",
    "examples": [
      {
        "translation": "私には兄（弟）が2人います。"
      },
      {
        "translation": "今何時かわかりますか？"
      },
      {
        "translation": "彼女は現金をまったく持っていません。"
      }
    ]
  },
  "en_a2_24": {
    "title": "様態の副詞：quickly, carefully, well, hard, fast",
    "shortExplanation": "動作がどのように行われるかを詳しく説明する副詞。通常、動詞または目的語の後に置かれます。",
    "longExplanation": "様態の副詞は、ある動作がどのような方法や様子で行われるかを表す修飾語です。\n作り方のルール：\n• 多くの副詞は形容詞の語尾に -ly を付けて作ります：quick → quickly（素早く）、careful → carefully（注意深く）、slow → slowly（ゆっくりと）。\n例外および不規則変化：\n• good → well（上手に、よく；goodlyとは言いません）。\n• fast → fast（速く；形容詞と同形で、fastlyとは言いません）。\n• hard → hard（熱心に、激しく；hardlyは「ほとんど～ない」という全く別の単語になります）。\n• late → late（遅く；latelyは「最近」という意味の別単語です）。\n文中の位置：通常は動詞の直後、または目的語の直後に置かれます（例：She speaks English well）。動詞と目的語の間に副詞を挟まないよう注意しましょう。",
    "formation": "形容詞 + -ly（または不規則形）\n語順：動詞 + 副詞 または 動詞 + 目的語 + 副詞",
    "examples": [
      {
        "translation": "彼はそれを分かりやすく説明してくれました。"
      },
      {
        "translation": "彼女は速く走りました。"
      },
      {
        "translation": "彼らは一日中一生懸命に働きました。"
      }
    ]
  },
  "en_a2_25": {
    "title": "頻度を表す副詞と文中の位置",
    "shortExplanation": "動作が行われる頻度・回数を表す副詞。一般動詞の前、be動詞や助動詞の後に配置します。",
    "longExplanation": "頻度を表す副詞は、ある動作がどれくらいの頻度で行われるかを示す単語です。\n代表的な単語（頻度の高い順）：\nalways（いつも 100%）→ usually（普段は、たいてい 90%）→ often（よく、しばしば 70%）→ sometimes（時々 50%）→ occasionally（たまに 30%）→ rarely / seldom（めったに～ない 10%）→ never（決して～ない 0%）。\n文中での配置ルール：\n• 一般動詞の前：She always drinks tea.\n• be動詞の後：He is always late.\n• 助動詞（haveなど）の後：She has never been to Italy.\nなお、every day, once a week, twice a month などのまとまった副詞句は通常文末に置きます。",
    "formation": "主語 + 頻度副詞 + 一般動詞\n主語 + be動詞/助動詞 + 頻度副詞",
    "examples": [
      {
        "translation": "私は普段7時に起きます。"
      },
      {
        "translation": "彼女は仕事に決して遅刻しません。"
      },
      {
        "translation": "彼らは週に一度会っています。"
      }
    ]
  },
  "en_a2_26": {
    "title": "名詞の前における形容詞の語順",
    "shortExplanation": "複数の形容詞が1つの名詞を修飾する際、決まった順序に従って並べるルール。",
    "longExplanation": "英語では、1つの名詞の前に複数の形容詞を重ねて修飾する場合、配置順序に厳格なルールが存在します：\n1. 意見・評価（Opinion：lovely, beautiful）\n2. 大きさ・サイズ（Size：big, small）\n3. 年齢・新旧（Age：old, new, young）\n4. 形状・形（Shape：round, square）\n5. 色（Color：red, brown）\n6. 出身・原産地（Origin：Italian, French）\n7. 素材・材料（Material：leather, wooden）\n8. 目的・用途（Purpose：writing, sports）\n→ 最後に被修飾名詞が来ます。\n例：a small beautiful old square brown French wooden writing desk（小さくて美しい、年代物の正方形で茶色いフランス製木製ライティングデスク）。",
    "formation": "意見 + 大きさ + 新旧 + 形状 + 色 + 産地 + 素材 + 目的 + 名詞",
    "examples": [
      {
        "translation": "小さくて愛らしい古風なコテージ"
      },
      {
        "translation": "大きな赤いイタリア製スポーツカー"
      }
    ]
  },
  "en_b1_01": {
    "title": "現在完了形 - 構造と用法",
    "shortExplanation": "過去の出来事と現在とのつながりを表す時制。「～したことがある」「～してしまった」「ずっと～している」。",
    "longExplanation": "現在完了形は、過去に行われた動作や状態を現在の視点と結びつけて述べる文法形式です。\n基本公式：主語 + have / has + 過去分詞（規則動詞は -ed、不規則動詞は個別の変化形）。\n代表的な3つの用法：\n1. 経験（具体的な過去の時は示さない）：これまでの人生での経験を表す（例：I have visited Tokyo / 東京を訪れたことがある）。\n2. 完了・結果（現在の状態に直結）：過去の出来事の結果が現在に残っていることを表す（例：I have lost my keys / 鍵を失くしてしまった、今も持っていない）。\n3. 継続（過去から現在まで続いている）：過去に始まり今も続いている動作・状態（例：She has lived here for 5 years / 彼女はここに5年間住んでいる）。",
    "formation": "肯定文：主語 + have / has + 過去分詞\n否定文：主語 + haven't / hasn't + 過去分詞\n疑問文：Have / Has + 主語 + 過去分詞？",
    "examples": [
      {
        "translation": "今までに寿司を食べたことがありますか？"
      },
      {
        "translation": "ちょうど宿題を終えたところです。"
      },
      {
        "translation": "彼女からはまだ電話がありません。"
      }
    ]
  },
  "en_b1_02": {
    "title": "ever / never / already / yet / just - 現在完了形の特徴的な副詞",
    "shortExplanation": "現在完了形と一緒に用いられ、経験や完了のタイミングを強調する定番の副詞群。",
    "longExplanation": "これらの副詞は、現在完了形の文において動作のタイミングやニュアンスを具体的に伝える役割を持ちます：\n• ever（今までに、かつて）：主に疑問文でこれまでの経験を尋ねる時に使用。位置：過去分詞の直前。\n• never（一度も～ない）：強い否定の経験を表す。位置：過去分詞の直前（文中に not は不要）。\n• already（すでに、もう）：予期していたよりも早く完了したことを示す。位置：過去分詞の前、または文末。\n• yet（まだ、もう）：否定文では「まだ～ない」、疑問文では「もう～しましたか」を表す。位置：文末に置くのが原則。\n• just（ちょうど、たった今）：動作がほんの少し前に完了したことを示す。位置：過去分詞の直前。",
    "formation": "主語 + have / has + ever / never / already / just + 過去分詞\n主語 + haven't / hasn't + 過去分詞 + yet\nHave / Has + 主語 + ever + 過去分詞？\nHave / Has + 主語 + 過去分詞 + yet？",
    "examples": [
      {
        "translation": "これまでにスコットランドへ行ったことがありますか？"
      },
      {
        "translation": "私は一度もエスカルゴを食べたことがありません。"
      },
      {
        "translation": "その映画はもう見ました。"
      }
    ]
  },
  "en_b1_03": {
    "title": "現在完了形と過去形の違い - 本質的な相違点",
    "shortExplanation": "現在完了形は現在とのつながりや結果を重視（過去の特定時は示さない）；過去形は過去の特定時点で完結した事実を表す。",
    "longExplanation": "これは英語文法において最も重要な違いの一つです。\n• 現在完了形：過去の出来事と「現在」との結びつきを表し、過去の具体的な時点（yesterday など）は明示しません。例：I've lost my wallet（財布を失くしてしまった——大事なのは「今財布を持っていない」という現在の状態です）。\n• 過去形：過去の決まった時点で完全に終了した過去の事実を表し、特定の過去の時（yesterday, last week, in 2019 など）を伴うか前提とします。例：I lost my wallet yesterday（昨日財布を失くした——過去の特定の時点に焦点があります）。",
    "formation": "現在完了形：主語 + have / has + 過去分詞（特定の過去時制の語句は不可）\n過去形：主語 + 動詞の過去形（特定の過去時制の副詞句を伴う）",
    "examples": [
      {
        "translation": "新しい責任者にお会いしました。"
      },
      {
        "translation": "この前の火曜日に彼と会いました。"
      }
    ]
  },
  "en_b1_04": {
    "title": "現在完了形における for と since の用法",
    "shortExplanation": "過去から現在まで継続している動作・状態を表す表現。for は期間、since は起点を伴います。",
    "longExplanation": "現在完了形の「継続用法」において、for と since は「どのくらいの期間～しているか」（How long...?）に答えるための不可欠な表現です：\n• for（～の間）：動作が続いている時間の長さ・期間を表す名詞を伴います（例：for two days, for a year, for a long time, for ages）。\n• since（～以来、～から）：過去の明確な始まりの時点、または過去形の節を伴います（例：since Monday, since 2015, since I was a child）。\n継続期間を尋ねる疑問文：How long + have / has + 主語 + 過去分詞...?（例：How long have you known her?）。",
    "formation": "主語 + have / has + 過去分詞 + for + 期間を表す名詞\n主語 + have / has + 過去分詞 + since + 起点の時点 / 過去形の節",
    "examples": [
      {
        "translation": "彼女はここで10年間働いています。"
      },
      {
        "translation": "大学時代からの知り合いです。"
      }
    ]
  },
  "en_b1_05": {
    "title": "現在完了進行形：have been + 現在分詞(-ing)",
    "shortExplanation": "過去から現在まである動作が絶え間なく続いていることや、その行為が現在の状態を引き起こしていることを表す。「ずっと～し続けている」。",
    "longExplanation": "現在完了進行形は、動作の継続時間やプロセスそのものに焦点を当てます。\n公式：主語 + have / has been + 現在分詞（動詞の -ing 形）。\n主な特徴：\n1. 行為の継続期間の強調（「どれくらいの間？」に答える）：I've been waiting for an hour（1時間ずっと待っています）。\n2. 現在目に見える結果の理由を説明する：You look tired - have you been running?（疲れているようだけど、走っていたの？）。\n現在完了形（単純形）との違い：\n• 現在完了形は「結果や完了」を重視：I've read 50 pages（50ページ読み終えた——完了・達成）。\n• 現在完了進行形は「動作の過程そのもの」を重視：I've been reading all evening（一晩中ずっと本を読んでいた——プロセスの継続）。",
    "formation": "肯定文：主語 + have / has been + 現在分詞(-ing)\n否定文：主語 + haven't / hasn't been + 現在分詞(-ing)\n疑問文：Have / Has + 主語 + been + 現在分詞(-ing)？",
    "examples": [
      {
        "translation": "私は2年間英語を勉強し続けています。"
      },
      {
        "translation": "どうして手が汚れているの？ —— 車の修理をしていたんだ。"
      }
    ]
  },
  "en_b1_06": {
    "title": "過去進行形：was/were + 現在分詞(-ing)",
    "shortExplanation": "過去のある特定の時点で「～している最中だった」という動作の進行を表す時制。",
    "longExplanation": "過去進行形は、過去の決まった一時点において進行中だった動作を表します。\n公式：主語 + was / were + 現在分詞（動詞の -ing 形）。単数主語には was、複数および二人称には were を用います。\n主な用法：\n1. 過去の特定の一時点で進行中だった動作：At 9pm I was having dinner（昨晩の午後9時、私は夕食を食べているところでした）。\n2. 他の出来事によって遮られた背景的な動作：I was walking when it started to rain（歩いている最中に雨が降り出しました）。\n3. 過去に同時に並行して行われていた動作：While she was cooking, he was watching TV（彼女が料理をしている間、彼はテレビを見ていました）。",
    "formation": "肯定文：主語 + was / were + 現在分詞(-ing)\n否定文：主語 + wasn't / weren't + 現在分詞(-ing)\n疑問文：Was / Were + 主語 + 現在分詞(-ing)？",
    "examples": [
      {
        "translation": "私が家を出たとき、雨が降っていました。"
      },
      {
        "translation": "昨日の7時には何をしていましたか？"
      }
    ]
  },
  "en_b1_07": {
    "title": "過去形と過去進行形の対比 - 背景動作と割り込みの出来事",
    "shortExplanation": "過去進行形で背景となる長めの動作を表し、過去形でそこに割り込んできた突発的な短い出来事を表します。",
    "longExplanation": "過去の物語を語る際の典型的な構文パターンです。背景として進行していた長い動作（過去進行形）の途中で、突然別の短い出来事が発生して割り込みます（過去形）。\n接続詞の使い分け：\n• when（～した時）：通常、過去形の節を導き、割り込んできた出来事を表します：She was sleeping when the alarm went off（目覚まし時計が鳴った時、彼女は眠っていました）。\n• while / as（～している間）：通常、過去進行形の節を導き、継続中の背景動作を表します：While I was watching TV, the power went out（テレビを見ている最中に停電が起きました）。",
    "formation": "過去進行形の節 + when + 過去形の節\nWhile + 過去進行形の節 + , + 過去形の節",
    "examples": [
      {
        "translation": "彼女がお風呂に入っていた時に電話が鳴りました。"
      },
      {
        "translation": "彼がスピーチをしている最中に、誰かが居眠りをしてしまいました。"
      }
    ]
  },
  "en_b1_08": {
    "title": "ゼロ条件文：If + 現在形, 現在形 - 科学的事実や自然法則",
    "shortExplanation": "科学的真理、自然の法則、一般的な事実を表す条件文。「～すると必ず～になる」。",
    "longExplanation": "ゼロ条件文（Zero Conditional）は、自然の法則や科学的事実、普遍の真理など、ある条件が満たされれば必ず同じ結果が伴う事柄を述べる際に用いられます。\n構文：If + 現在形の節, 現在形の主節。\n特徴：条件節も帰結節も両方とも現在形を用います。これは、普遍的・恒常的な因果関係を表すためです。\nこの構文では if の代わりに when（～するとき）を用いても同じ意味になります：When you mix red and blue, you get purple（赤と青を混ぜると紫色になります）。",
    "formation": "If / When + 主語 + 動詞の現在形 + , + 主語 + 動詞の現在形",
    "examples": [
      {
        "translation": "氷を温めると溶けます。"
      },
      {
        "translation": "雨が降れば、通りは濡れます。"
      }
    ]
  },
  "en_b1_09": {
    "title": "第1条件文：If + 現在形, will - 未来の現実的な可能性",
    "shortExplanation": "未来において実現する可能性が十分にある現実的な条件と結果を表す。「もし～なら、～するだろう」。",
    "longExplanation": "第1条件文（First Conditional）は、将来起こる可能性が極めて高い現実的な事態を想定して、その結果を述べる構文です。\n公式：If + 現在形の節, 主語 + will + 動詞の原形。\n重要な注意点：\n• 時・条件を表す副詞節の中では、未来のことでも will ではなく現在形を用います（主節は will + 原形）。\n• 主節では will の代わりに、文脈に応じて can, may, might, should などの助動詞を用いることもできます。\n• 節の順番は前後を入れ替えることが可能で、主節が先に来る場合はカンマを置きません：I'll stay home if it rains。",
    "formation": "If + 主語 + 動詞の現在形 + , + 主語 + will / can / may + 動詞の原形",
    "examples": [
      {
        "translation": "一生懸命勉強すれば、彼女は試験に合格するでしょう。"
      },
      {
        "translation": "手助けが必要なら、私が行くことができます。"
      }
    ]
  },
  "en_b1_10": {
    "title": "第2条件文（仮定法過去）：If + 過去形, would - 現在の事実に反する仮定",
    "shortExplanation": "現在の事実とは異なる空想や、実現の可能性が極めて低い仮定を表す。「もし～なら、～するのに」。",
    "longExplanation": "第2条件文（仮定法過去 / Second Conditional）は、現在の事実とは正反対の状況を空想したり、将来実現する見込みがほとんどない事柄を仮定する際に使います。\n公式：If + 過去形の節, 主語 + would + 動詞の原形。\n文法のポイント：\n• if節の中の動詞には過去形を用います。be動詞を用いる場合、伝統的・規範的な文法では主語の人称に関わらず were を用いるのが一般的です（例：If I were you... / もし私があなたなら）。\n• 主節には would（または could / might）+ 動詞の原形を置き、実現し得ない仮想の結果を表します。",
    "formation": "If + 主語 + 動詞の過去形 + , + 主語 + would / could + 動詞の原形",
    "examples": [
      {
        "translation": "もし宝くじに当たったら、世界中を旅するのに。"
      },
      {
        "translation": "もしもっと背が高ければ、バスケットボールをするのに。"
      }
    ]
  },
  "en_b1_11": {
    "title": "第1種条件文と第2種条件文（仮定法過去）の比較：現実的 vs 非現実的",
    "shortExplanation": "第1種条件文（現実に起こる可能性が高い未来の条件）と第2種条件文・仮定法過去（現在の事実に反する仮定や起こりそうにない空想）の違いを比較します。",
    "longExplanation": "どちらの条件文を使うかは、その状況が実現可能かどうかに対する話し手の確信度や態度によって決まります。\n• 第1種条件文（If ＋ 現在形、will ＋ 動詞の原形）：実現の可能性が高い現実的な状況を表します（例：'If I see her' ＝ 実際に会うと予想している）。\n• 第2種条件文（If ＋ 過去形、would ＋ 動詞の原形）：現在の事実と異なる仮定や、実現の可能性が極めて低い空想を表します（例：'If I saw her' ＝ 会える見込みはほとんどなく、単なる想像）。\nこれは単なる文法上の違いにとどまらず、話し手がその状況をどのように捉えているかという主観的なニュアンスの違いを表します。",
    "formation": "第1種：If ＋ 主語 ＋ 現在形動詞, 主語 ＋ will ＋ 動詞の原形\n第2種：If ＋ 主語 ＋ 過去形動詞, 主語 ＋ would ＋ 動詞の原形",
    "examples": [
      {
        "translation": "明日雨が降ったら、傘を持って行きます。（現実に起こる可能性が高い）"
      },
      {
        "translation": "毎日雨が降るなら、スペインに引っ越すのになあ。（実現性の低い空想）"
      }
    ]
  },
  "en_b1_12": {
    "title": "受動態（現在形）：am / is / are ＋ 過去分詞",
    "shortExplanation": "現在における受動の動作や状態を表し、「〜される」「〜されている」という意味を表します。",
    "longExplanation": "現在形の受動態は、以下のような場合に使用されます：\n• 動作を行う人（行為者）よりも、動作そのものやその対象が重要なとき。\n• 行為者が不明であるか、文脈上言うまでもなく明らかなとき。\n行為者を表す必要がある場合は、後ろに「by ＋ 行為者」を付け加えます（例：The window is broken by the ball. 窓がボールによって割られる）。",
    "formation": "主語 ＋ am / is / are ＋ 過去分詞 (＋ by ＋ 行為者)",
    "examples": [
      {
        "translation": "英語は多くの国で話されています。"
      },
      {
        "translation": "その手紙はフランス語で書かれています。"
      }
    ]
  },
  "en_b1_13": {
    "title": "受動態（過去形）：was / were ＋ 過去分詞",
    "shortExplanation": "過去に行われた受動の動作や出来事を表し、「〜された」「〜された状態だった」という意味を表します。",
    "longExplanation": "過去形の受動態は、過去のある時点で動作が行われたり出来事が起きたりしたことを表します。\n• 単数主語（I, he, she, it, 単数名詞）には was を使用\n• 複数主語（you, we, they, 複数名詞）には were を使用\n能動態から受動態への書き換え例：Someone stole my car.（誰かが私の車を盗んだ）→ My car was stolen.（私の車が盗まれた）。",
    "formation": "主語 ＋ was / were ＋ 過去分詞 (＋ by ＋ 行為者)",
    "examples": [
      {
        "translation": "エッフェル塔は1889年に建設されました。"
      },
      {
        "translation": "その事故で3人が負傷しました。"
      }
    ]
  },
  "en_b1_14": {
    "title": "受動態（現在完了形）：has / have been ＋ 過去分詞",
    "shortExplanation": "過去にすでに行われ、現在において「〜されてしまった」「〜されたところである」という結果や完了の状態を表します。",
    "longExplanation": "現在完了形の受動態は、動作が具体的にいつ起きたかよりも、現在どのような結果になっているか・完了しているかに焦点を当てる際に用いられます。\n• 三人称単数主語には has been ＋ 過去分詞\n• 一人称・二人称・複数主語には have been ＋ 過去分詞",
    "formation": "主語 ＋ has / have been ＋ 過去分詞",
    "examples": [
      {
        "translation": "そのプロジェクトは完了しました。"
      },
      {
        "translation": "ゲスト全員に案内が通知されました。"
      }
    ]
  },
  "en_b1_15": {
    "title": "間接話法——時制の一致（時制の後退）",
    "shortExplanation": "直接話法から間接話法に書き換える際、主節の動詞が過去形であれば従属節の時制を過去方向へと1つ繰り下げます。",
    "longExplanation": "間接話法において、伝達動詞（said や told など）が過去形の場合、被伝達節内の時制を1段階過去へシフトさせる「時制の一致」が適用されます：\n• 現在形 → 過去形（work → worked）\n• 過去形 → 過去完了形（went → had gone）\n• 現在完了形 → 過去完了形（have seen → had seen）\n• 助動詞の変化：will → would、can → could、is/am going to → was going to。",
    "formation": "主語 ＋ said (that) / told ＋ 目的語 ＋ (that) ＋ 時制が一致した節",
    "examples": [
      {
        "translation": "彼女は「出発します」と言った。→ 彼女は出発すると言った。"
      },
      {
        "translation": "彼は私に「行けない」と言った。→ 彼は私に来られないと伝えた。"
      }
    ]
  },
  "en_b1_16": {
    "title": "間接疑問文：疑問詞 / if / whether ＋ 平叙文の語順",
    "shortExplanation": "疑問文を間接話法で伝える構文で、倒置を行わず「主語 ＋ 動詞」という平叙文の語順にします。",
    "longExplanation": "間接疑問文を作る際の主要なポイントは以下の通りです：\n1. 倒置を行わず、平叙文と同じ「主語 ＋ 動詞」の語順にする。\n2. 疑問文用の助動詞 do / does / did は削除する。\n3. 疑問詞で始まる疑問文は、その疑問詞（where, what など）をそのまま接続詞として用いる。\n4. はい／いいえで答える一般疑問文は、if または whether（〜かどうか）を用いて接続する。",
    "formation": "疑問詞疑問文：主語 ＋ asked (＋ 目的語) ＋ 疑問詞 ＋ 主語 ＋ 動詞\nYes/No疑問文：主語 ＋ asked (＋ 目的語) ＋ if / whether ＋ 主語 ＋ 動詞",
    "examples": [
      {
        "translation": "「どこで働いているのですか？」→ 彼女は私がどこで働いているのか尋ねた。"
      },
      {
        "translation": "「結婚していますか？」→ 彼は私が既婚かどうか知りたがっていた。"
      }
    ]
  },
  "en_b1_17": {
    "title": "間接話法における say と tell の使い分け",
    "shortExplanation": "say は聞き手を直接後ろに置かないのに対し、tell は必ず直後に「誰に伝えたか」という聞き手（目的語）を必要とします。",
    "longExplanation": "間接話法で発言を伝える際、say と tell では構文の取り方が異なります：\n• say (that)...：直後に聞き手を置かずに内容を伝えます（例：She said she was tired.）。もし相手を表す場合は said to me のように前置詞 to が必要です。\n• tell ＋ 人 ＋ (that)...：tell の直後には必ず「話しかけた相手（目的語）」が必要です（例：She told me she was tired.）。\n誤用例：He told that he was late ✗ → 正しい文：He said that he was late ✓ / He told me that he was late ✓。",
    "formation": "主語 ＋ say/said ＋ (that) ＋ 節\n主語 ＋ tell/told ＋ 聞き手（人） ＋ (that) ＋ 節",
    "examples": [
      {
        "translation": "彼女は助けが必要だと言った。"
      },
      {
        "translation": "彼は私たちに会議が中止になったと伝えた。"
      }
    ]
  },
  "en_b1_18": {
    "title": "動名詞（〜ing）を目的語にとる動詞",
    "shortExplanation": "後ろに不定詞（to＋動詞の原形）ではなく、必ず動名詞（〜ing）を目的語として従える動詞の用法です。",
    "longExplanation": "英語の一部の動詞は、目的語として動名詞（〜ing形）のみを必要とし、to不定詞を取ることができません。\n代表的な動詞：enjoy（楽しむ）、finish（終える）、avoid（避ける）、mind（気にする）、suggest（提案する）、keep（〜し続ける）、consider（検討する）、deny（否定する）、imagine（想像する）、miss（逃す/恋しく思う）、practice（練習する）、risk（危険を冒す）、admit（認める）、delay / put off（延期する）、give up（諦める）、recommend（勧める）など。\n理解のポイント：動名詞は「過去の経験」「既に行われていること」「継続するプロセス」を連想させる動詞と相性が良い傾向があります。",
    "formation": "主語 ＋ 動詞 ＋ 動名詞 (動詞の〜ing形)",
    "examples": [
      {
        "translation": "私は海で泳ぐのが大好きです。"
      },
      {
        "translation": "彼女は海外移住を検討しています。"
      },
      {
        "translation": "彼は視線を合わせるのを避けました。"
      }
    ]
  },
  "en_b1_19": {
    "title": "to不定詞（to ＋ 動詞の原形）を目的語にとる動詞",
    "shortExplanation": "動名詞ではなく、後ろにto不定詞（to ＋ 動詞の原形）を目的語として従える動詞の用法です。",
    "longExplanation": "英語の多くの動詞は、目的語としてto不定詞を必要とします。これらは主に将来に向けた意図、計画、希望、決断などを表す動詞に多く見られます。\n代表的な動詞：want（〜したい）、decide（決める）、hope（望む）、plan（計画する）、manage（どうにかやり遂げる）、agree（同意する）、promise（約束する）、refuse（断る）、fail（〜し損なう）、expect（期待する）、offer（申し出る）、learn（学ぶ）、need（必要とする）、afford（〜する余裕がある）、attempt（試みる）、choose（選ぶ）、pretend（〜のふりをする）、tend（〜する傾向がある）など。",
    "formation": "主語 ＋ 動詞 ＋ to ＋ 動詞の原形",
    "examples": [
      {
        "translation": "彼女は仕事を辞めることを決意しました。"
      },
      {
        "translation": "近いうちにお会いできることを楽しみにしています。"
      },
      {
        "translation": "彼は返答することができませんでした。"
      }
    ]
  },
  "en_b1_20": {
    "title": "動名詞（〜ing）とto不定詞の両方を取る動詞（like, love, hate, start, begin）",
    "shortExplanation": "後ろに動名詞（〜ing）とto不定詞の両方を置くことができ、ほぼ同じ意味またはわずかなニュアンスの違いを表す動詞です。",
    "longExplanation": "英語の一部の動詞は、目的語に動名詞とto不定詞のどちらを取ることも可能です：\n• 好悪を表す動詞（like, love, hate, prefer）：〜ing は一般的な趣味や行為そのものを楽しむニュアンス（例：'I love cooking.' 普段料理するのが好き）；to不定詞は特定の状況での選択や習慣・意図を強調する傾向があります。\n• 開始・継続を表す動詞（start, begin, continue）：どちらを用いても意味やニュアンスの違いは実質的にほとんどありません。",
    "formation": "主語 ＋ like / love / hate / start / begin ＋ 動名詞 (〜ing) または to ＋ 動詞の原形",
    "examples": [
      {
        "translation": "私は旅行することが大好きです。"
      },
      {
        "translation": "彼女は5月にここで働き始めました。"
      }
    ]
  },
  "en_b1_21": {
    "title": "used to——過去の習慣と状態",
    "shortExplanation": "過去に定期的に行っていた習慣や、過去に存在していたが現在はもう続いていない状態を表し、「かつて〜していた」「以前は〜だった」という意味を表します。",
    "longExplanation": "「used to ＋ 動詞の原形」は、過去に反復して行われていた行動やかつての習慣・状態を表す際に用います。現在はすでに終了している点が特徴です。\n• 肯定文：主語 ＋ used to ＋ 動詞の原形\n• 否定文：主語 ＋ didn't use to ＋ 動詞の原形\n• 疑問文：Did ＋ 主語 ＋ use to ＋ 動詞の原形...?\n※「be used to ＋ 名詞／動名詞（〜に慣れている）」との混同に注意してください（例：I am used to waking up early. ＝ 早起きに慣れている）。",
    "formation": "肯定文：主語 ＋ used to ＋ 動詞の原形\n否定文：主語 ＋ didn't use to ＋ 動詞の原形\n疑問文：Did ＋ 主語 ＋ use to ＋ 動詞の原形？",
    "examples": [
      {
        "translation": "昔はタバコを吸っていましたが、やめました。"
      },
      {
        "translation": "以前、何か楽器を演奏していましたか？"
      }
    ]
  },
  "en_b1_22": {
    "title": "関係詞節（関係代名詞・関係副詞）：who, which, that, where, whose",
    "shortExplanation": "関係代名詞や関係副詞を用いて名詞（先行詞）を修飾し、詳細な情報を付け加える構文です。",
    "longExplanation": "関係詞節は、直前の先行詞（名詞）を後ろから修飾して説明を加える役割を果たします：\n• who：人を先行詞とし、関係節内で主語や目的語になります（例：The woman who called is my sister.）。\n• which：物や動物を先行詞とします（例：The book which I borrowed was great.）。\n• that：制限用法において人・物の両方を先行詞として使えます（例：The car that he bought is new.）。\n• where：関係副詞として場所を表す先行詞を修飾します（例：The café where we met is closed.）。\n• whose：先行詞の所有関係を表します（例：The girl whose bag was stolen...）。\n注記：口語では、関係代名詞が目的語として機能している場合に省略されることがよくあります（The film (that) I saw...）。",
    "formation": "先行詞 (名詞) ＋ who / which / that / where / whose ＋ 修飾節",
    "examples": [
      {
        "translation": "隣に住んでいる男性はとても親切です。"
      },
      {
        "translation": "私たちが宿泊したホテルにはプールがありました。"
      }
    ]
  },
  "en_b1_23": {
    "title": "対比・譲歩の接続詞・副詞：although, however, despite, in spite of, whereas",
    "shortExplanation": "対比や逆接、譲歩を表す表現で、「〜にもかかわらず」「しかしながら」「その一方で」という意味を表します。",
    "longExplanation": "対比や譲歩を表す英語の表現は、後ろに続く品詞や文構造に明確な違いがあります：\n• although / even though / though ＋ 節（主語 ＋ 動詞）：「〜だけれども」「〜にもかかわらず」。\n• despite / in spite of ＋ 名詞 / 動名詞（〜ing）：前置詞句のため、後ろに直接節（主語＋動詞）を置くことはできません。\n• however：接続副詞であり、ピリオドやセミコロンの後に置かれ、後ろにカンマを伴って独立した文を導きます（「しかしながら」）。\n• whereas：2つの事実や状況を対比させる接続詞で、「一方で」「〜であるのに対して」という意味を表します。",
    "formation": "although / even though ＋ 節 (主語 ＋ 動詞)\ndespite / in spite of ＋ 名詞 / 動名詞 (〜ing)\nhowever, ＋ 新しい文\n節1, whereas ＋ 節2",
    "examples": [
      {
        "translation": "彼女は疲れていたにもかかわらず、仕事を続けました。"
      },
      {
        "translation": "雨にもかかわらず、彼は自転車で出勤しました。"
      },
      {
        "translation": "それは高価でした。しかしながら、それだけの価値はありました。"
      }
    ]
  },
  "en_b1_24": {
    "title": "未来進行形：will be ＋ 動詞の〜ing形",
    "shortExplanation": "未来の特定の時点で進行中である動作や、自然の成り行きで予定されている未来の事柄を表します。",
    "longExplanation": "未来進行形は主に以下のような場面で用いられます：\n1. 未来のある特定の時点でまさに進行している動作を表す（例：At this time tomorrow, I'll be lying on the beach. 明日の今頃は浜辺で寝そべっているだろう）。\n2. 予定や成り行きとして自然に発生する未来の出来事を表す（例：I'll be seeing her tomorrow anyway. どのみち明日彼女に会うことになっている）。\n3. 相手に押し付けがましくなく、計画について丁寧に尋ねる（例：Will you be coming to the party? パーティーには来られるご予定ですか？）。",
    "formation": "肯定文：主語 ＋ will be ＋ 動詞の〜ing形\n否定文：主語 ＋ won't be ＋ 動詞の〜ing形\n疑問文：Will ＋ 主語 ＋ be ＋ 動詞の〜ing形？",
    "examples": [
      {
        "translation": "8時には電話しないでね。ちょうど夕食を食べているところだから。"
      },
      {
        "translation": "来週の今頃は、ビーチに座っていることでしょう。"
      }
    ]
  },
  "en_b1_25": {
    "title": "未来完了形：will have ＋ 過去分詞",
    "shortExplanation": "未来の特定の時点、あるいは別の出来事が起きる前までに完了している動作を表し、「〜までに（すでに）…してしまっているだろう」という意味を表します。",
    "longExplanation": "未来完了形は、将来のある基準となる時点までに、ある動作や状態が完了・結果として生じていることを表します。\n期限や基準時を表す「by ＋ 時句（〜までに）」、「by the time ＋ 節（〜する時までに）」、「before ＋ 時句/節（〜の前に）」などの表現とともに頻繁に用いられます：\n例：By the time you arrive, I will have cooked dinner.（あなたが到着する時までには、私は夕食を作り終えているでしょう）。",
    "formation": "肯定文：主語 ＋ will have ＋ 過去分詞\n否定文：主語 ＋ won't have ＋ 過去分詞\n疑問文：Will ＋ 主語 ＋ have ＋ 過去分詞？",
    "examples": [
      {
        "translation": "日曜日までにはこの本を読み終えているでしょう。"
      },
      {
        "translation": "2050年までには、科学者たちが治療法を発見しているはずです。"
      }
    ]
  },
  "en_b1_26": {
    "title": "目的を表す表現：to, in order to, so that, so as to",
    "shortExplanation": "動作の目的を表し、「〜するために」「〜するように」という意味を表します。",
    "longExplanation": "目的を表す代表的な構文です：\n・to / in order to / so as to + 動詞の原形：前後の主語が一致する場合に用いられます。in order to や so as to は単独の to よりも改まった丁寧な響きを持ちます。否定形は in order not to または so as not to（〜しないように）となります。\n・so that / in order that + 主語 + 助動詞（can/could, will/would など） + 動詞の原形：節（主語＋動詞）を従え、前後の主語が異なる場合や「〜できるように」と可能性や意図を強調する際に使われます。",
    "formation": "to / in order to / so as to + 動詞の原形 | so that + 主語 + 助動詞 + 動詞の原形",
    "examples": [
      {
        "translation": "彼女は奨学金を得るために一生懸命勉強しています。"
      },
      {
        "translation": "彼は終電に間に合うように早く出発しました。"
      }
    ]
  },
  "en_b1_27": {
    "title": "基本の句動詞",
    "shortExplanation": "動詞と前置詞や副詞が組み合わさり、独自の慣用的な意味を表す表現です。",
    "longExplanation": "句動詞は「動詞 ＋ 小辞（前置詞または副詞）」で構成され、個々の単語の字面からは予測しにくい独自の意味を生み出します。\n日常的によく使われる句動詞：\n・give up ＝ やめる、諦める\n・find out ＝ 見つけ出す、突き止める\n・turn on / turn off ＝ つける／消す（電源・明かりなど）\n・look up ＝ 調べる（辞書やインターネットで）\n・look after ＝ 世話をする\n・put off ＝ 延期する\n・carry on ＝ 続ける\n・get on / along (with) ＝ （〜と）仲良くやっていく\n・bring up ＝ 育てる、（話題を）持ち出す\n・come across ＝ 偶然出くわす・見つける",
    "formation": "動詞 + 前置詞 / 副詞（小辞）",
    "examples": [
      {
        "translation": "私はタバコをやめました。"
      },
      {
        "translation": "私が留守の間、猫の世話をしてもらえますか？"
      },
      {
        "translation": "私たちは何が起きたのかを突き止める必要があります。"
      }
    ]
  },
  "en_b2_01": {
    "title": "過去完了形：had + 過去分詞",
    "shortExplanation": "過去のある時点や出来事よりも前に完了した動作や状態を表します（大過去）。",
    "longExplanation": "過去完了形は、過去の基準となる時点よりも「さらに前」にすでに完了していた動作、経験、継続していた状態を表す時制です。\n・肯定文：主語 + had + 過去分詞（すべての人称で共通）\n・否定文：主語 + hadn't + 過去分詞\n・疑問文：Had + 主語 + 過去分詞？\n・よく用いられる接続詞や副詞：before, after, when, by the time, already, just, never。",
    "formation": "主語 + had + 過去分詞 (hadn't + 過去分詞)",
    "examples": [
      {
        "translation": "私が到着したとき、彼女はすでに出発していました。"
      },
      {
        "translation": "その冬を迎えるまで、彼は一度も雪を見たことがありませんでした。"
      }
    ]
  },
  "en_b2_02": {
    "title": "過去完了進行形：had been + 動詞の-ing形",
    "shortExplanation": "過去のある時点まで一定期間ずっと続いていた動作を強調します。",
    "longExplanation": "過去完了進行形は「had been + 動詞の-ing形（現在分詞）」で表され、過去の基準時点よりも前からその時点まで動作が絶え間なく継続していたことを強調します。また、過去の時点における疲労や結果をもたらした原因・理由を説明する際にもよく用いられます。",
    "formation": "主語 + had been + 動詞の-ing形 (hadn't been + 動詞の-ing形)",
    "examples": [
      {
        "translation": "彼女は一晩中働いていたので、疲れ果てていました。"
      },
      {
        "translation": "彼女が到着する前、あなたはどのくらいの間待っていたのですか？"
      }
    ]
  },
  "en_b2_03": {
    "title": "must have + 過去分詞 - 過去についての確信的な推量",
    "shortExplanation": "過去の出来事について「〜したに違いない」「〜だったはずだ」と強い確信を持って推測します。",
    "longExplanation": "「must have + 過去分詞」は、過去の明確な証拠や状況に基づき、「論理的に考えてそれ以外にはあり得ない」と強い確信を持って肯定的に推測する際に用います。\n過去に対する推量の確信度比較：\n・must have + 過去分詞：〜したに違いない（強い確信）\n・should have + 過去分詞：〜したはずだ／〜すべきだったのに\n・may / might have + 過去分詞：〜したかもしれない（不確実な可能性）\n・can't have + 過去分詞：〜したはずがない（強い否定の確信）。",
    "formation": "主語 + must have + 過去分詞",
    "examples": [
      {
        "translation": "あの長旅の後は、きっと疲れ果てていたに違いありません。"
      },
      {
        "translation": "彼女は早く帰ったに違いない。コートがもうありません。"
      }
    ]
  },
  "en_b2_04": {
    "title": "can't have + 過去分詞 - 過去についての強い否定推量",
    "shortExplanation": "過去の出来事について「〜したはずがない」「〜だったわけがない」と不可能性を確信します。",
    "longExplanation": "「can't have（または couldn't have）+ 過去分詞」は、確固たる証拠や客観的事実から判断して「過去にそんなことが起こったはずがない」と否定的に強く断定する表現です。「must have + 過去分詞」の対義となる表現です。",
    "formation": "主語 + can't have + 過去分詞",
    "examples": [
      {
        "translation": "彼が彼女を見かけたはずがありません。彼女は海外にいたのですから。"
      },
      {
        "translation": "そこが正しい住所だったはずがありません。"
      }
    ]
  },
  "en_b2_05": {
    "title": "should have + 過去分詞 - 過去への後悔と非難",
    "shortExplanation": "過去に「〜すべきだった（のにしなかった）」「〜すべきではなかった（のにした）」と後悔や非難を表します。",
    "longExplanation": "・should have + 過去分詞：過去にそうするべきだったのに、実際には行わなかったことに対する後悔や反省、他者への非難を表します（〜すべきだった）。\n・shouldn't have + 過去分詞：過去にすべきでなかった行為を実際にしてしまったことに対する後悔や批判を表します（〜すべきではなかった）。\n日常会話で反省や苦言を述べる際に極めて重要な構文です。",
    "formation": "主語 + should have / shouldn't have + 過去分詞",
    "examples": [
      {
        "translation": "傘を持ってくるべきでした。"
      },
      {
        "translation": "彼女は彼にその秘密を話すべきではありませんでした。"
      }
    ]
  },
  "en_b2_06": {
    "title": "might / could have + 過去分詞 - 過去の可能性についての推量",
    "shortExplanation": "過去に「〜したかもしれない」「〜だった可能性がある」と不確実な推測を表します。",
    "longExplanation": "・might have / could have + 過去分詞：過去の事柄について、確たる証拠がなく断定はできないものの「ひょっとすると〜したかもしれない」と推量する際に用います。\n・また could have + 過去分詞 には、「過去に〜することも可能だった（しかし実際には行わなかった）」という実現しなかった能力や機会を表す用法もあります（例：もっと努力していれば勝てていただろうに）。",
    "formation": "主語 + might / could have + 過去分詞",
    "examples": [
      {
        "translation": "彼女は会議のことを忘れてしまったのかもしれません。"
      },
      {
        "translation": "彼は裏口から抜け出した可能性があります。"
      }
    ]
  },
  "en_b2_07": {
    "title": "仮定法過去完了（第3条件文）：If + 過去完了形, would have + 過去分詞",
    "shortExplanation": "過去の事実とは正反対の事柄を仮定し、「もしあの時〜していたら、〜だっただろうに」と述べます。",
    "longExplanation": "仮定法過去完了は、過去に実際には起こらなかった事柄に対する反実仮想を表します。条件節・帰結節ともに事実に反する内容となります。\n・構文：If + 主語 + had + 過去分詞, 主語 + would have + 過去分詞\n・条件が満たされなかったため、その結果も実現しませんでした。\n・主節の would は、意味に応じて could（〜できただろうに）や might（〜だったかもしれないのに）に置き換えることも可能です。",
    "formation": "If + 主語 + had + 過去分詞, 主語 + would have + 過去分詞",
    "examples": [
      {
        "translation": "もし薬を飲んでいたら、彼女は回復していただろうに。"
      },
      {
        "translation": "もし彼が早く出発していなければ、彼女に会えていただろうに。"
      }
    ]
  },
  "en_b2_08": {
    "title": "混合仮定法",
    "shortExplanation": "条件節と帰結節で異なる時制を結びつけます（過去の条件 ↔ 現在の結果など）。",
    "longExplanation": "混合仮定法は、異なる時間の枠組みを組み合わせて仮定を表現します：\n1. 過去の仮定条件 → 現在の仮想結果：\n・If + 主語 + had + 過去分詞, 主語 + would + 動詞の原形\n・例：もしあの仕事を引き受けていたら、今頃ニューヨークにいるだろうに。\n2. 現在の性質・状態 → 過去の仮想結果：\n・If + 主語 + 過去形, 主語 + would have + 過去分詞\n・例：彼女がもっと慎重な性格なら、それを壊したりはしなかっただろうに。",
    "formation": "If + 主語 + had + 過去分詞, 主語 + would + 動詞の原形",
    "examples": [
      {
        "translation": "もしあの時医学を学んでいたら、今頃私は医者になっていただろうに。"
      }
    ]
  },
  "en_b2_09": {
    "title": "未来の受動態および助動詞を伴う受動態",
    "shortExplanation": "未来時制や助動詞と結びついた受動態構文；「〜されるだろう」「〜されなければならない」など。",
    "longExplanation": "助動詞や未来表現を伴う受動態の基本構造：\n・助動詞 + be + 過去分詞\n代表的な表現パターン：\n・will be + 過去分詞：〜されるだろう\n・must be + 過去分詞：〜されなければならない\n・should be + 過去分詞：〜されるべきだ\n・can be + 過去分詞：〜され得る、〜されることが可能である。",
    "formation": "主語 + 助動詞 (will / must / should / can) + be + 過去分詞",
    "examples": [
      {
        "translation": "その報告書は明日公開されます。"
      },
      {
        "translation": "この間違いは直ちに修正されなければなりません。"
      }
    ]
  },
  "en_b2_10": {
    "title": "使役構文 have/get：have something done",
    "shortExplanation": "他人に依頼したり専門業者に頼んで「〜してもらう」「〜させる」という状況を表します。",
    "longExplanation": "「have / get + 目的語 + 過去分詞」構文は、自分自身で直接行うのではなく、業者や専門職などの他者に依頼してサービスや処置をしてもらう際に用います。\n比較：\n・I cut my hair：自分で自分の髪をハサミで切った。\n・I had my hair cut：美容院などで髪を切ってもらった。\n日常会話では get の方が口語的で好まれ、have の方がやや改まった響きを持ちます。",
    "formation": "主語 + have / get + 目的語 + 過去分詞",
    "examples": [
      {
        "translation": "歯医者で歯を診てもらう必要があります。"
      },
      {
        "translation": "彼女は去年の春、業者に頼んで家の壁を塗り直してもらいました。"
      }
    ]
  },
  "en_b2_11": {
    "title": "伝聞・報道動詞の受動態：It is said that... / He is believed to...",
    "shortExplanation": "客観的な報道や世間の噂、一般的な共通認識を述べる際に用います；「〜と言われている」「〜と信じられている」。",
    "longExplanation": "say, think, believe, report, know, expect, consider などの伝聞・思考動詞を用いた受動態の代表的な2つの構文（ニュース報道や公的文書で多用されます）：\n1. It + 受動態動詞 + that + 節（例：It is believed that... 〜だと信じられている）\n2. 主語 + be動詞 + 過去分詞 + to + 動詞の原形（例：She is known to be... 彼女は〜として知られている）。\nなお、不定詞の内容が主節の時制より過去である場合は、完了不定詞「to have + 過去分詞」を用います。",
    "formation": "It + be動詞 + 過去分詞 + that 節 | 主語 + be動詞 + 過去分詞 + to + 動詞の原形",
    "examples": [
      {
        "translation": "3名が負傷したと報じられています。"
      },
      {
        "translation": "彼はすでに出国したと考えられています。"
      }
    ]
  },
  "en_b2_12": {
    "title": "remember / forget に続く動詞-ing形とto不定詞の意味の違い",
    "shortExplanation": "動詞-ing形は過去の出来事・経験を「覚えている／忘れる」、to不定詞はこれからの用事・義務を「忘れずに〜する／〜し忘れる」ことを表します。",
    "longExplanation": "remember と forget は後に続く形によって指し示す内容が大きく異なります：\n・remember / forget + 動詞-ing形（動名詞）：過去に実際に行った出来事や経験した事実を「覚えている／忘れてしまう」。\n・remember / forget + to + 動詞の原形（to不定詞）：これから行うべき予定や用事、義務を「忘れずに実行する／うっかりし忘れる」。",
    "formation": "remember / forget + 動詞-ing形 (過去の経験) vs remember / forget + to + 動詞の原形 (これからの用事)",
    "examples": [
      {
        "translation": "会議で彼女にお会いしたのを覚えています。"
      },
      {
        "translation": "お母さんに電話するのを忘れないでね！"
      },
      {
        "translation": "牛乳を買うのを忘れてしまいました。"
      }
    ]
  },
  "en_b2_13": {
    "title": "stop / regret / mean に続く動詞-ing形とto不定詞の意味の違い",
    "shortExplanation": "stop、regret、mean の後ろに動詞-ing形をとるかto不定詞をとるかによって生じる明確な意味の違い。",
    "longExplanation": "動詞 stop, regret, mean は続く形によって意味が大きく変化します：\n・stop + 動詞-ing形：行っていた動作そのものをやめる（例：喫煙をやめる）。\n・stop + to + 動詞の原形：別の動作を行うために立ち止まる／手を休める。\n・regret + 動詞-ing形：過去にしてしまった行為を後悔する。\n・regret + to + 動詞の原形：残念ながら〜する（公式な通知で用いる：残念ながら〜とお知らせいたします）。\n・mean + 動詞-ing形：〜することを意味する／結果として〜を伴う。\n・mean + to + 動詞の原形：〜するつもりである／意図する。",
    "formation": "stop / regret / mean + 動詞-ing形 vs stop / regret / mean + to + 動詞の原形",
    "examples": [
      {
        "translation": "彼は昨年タバコをやめました。"
      },
      {
        "translation": "彼女は立ち止まって景色を眺めました。"
      }
    ]
  },
  "en_b2_14": {
    "title": "wish + 過去形 - 現在の事実に反する願望（仮定法過去）",
    "shortExplanation": "現在の事実とは異なる、実現不可能な願望や後悔を表し、「〜ならいいのに」「〜であればいいのに」という意味を表します。",
    "longExplanation": "「wish ＋ 動詞の過去形」は仮定法過去を用いた文法構造で、話し手が現在の状況を変えたいと望みつつも、それが現実には不可能・困難であることを表現します。動詞の形は仮定法過去（条件文第2種）と同一であり、be動詞を用いる場合は格式ばった文体では主語に関わらず「were」が標準とされます（日常会話では「was」も広く使われます）。",
    "formation": "主語 + wish / wishes + (that) + 主語 + 動詞の過去形 / were",
    "examples": [
      {
        "translation": "もっと上手に英語が話せたらいいのに。"
      },
      {
        "translation": "彼女はもっと暖かい国に住んでいればいいのにと思っている。"
      }
    ]
  },
  "en_b2_15": {
    "title": "wish + 過去完了形 - 過去の事実に反する後悔（仮定法過去完了）",
    "shortExplanation": "過去に起こった（または起こらなかった）出来事に対する後悔や痛恨の思いを表し、「〜していればよかったのに」という意味を表します。",
    "longExplanation": "「wish ＋ 過去完了形（had ＋ 過去分詞）」は仮定法過去完了の構文であり、もはややり直すことのできない過去の行為や出来事に対する悔恨や残念な気持ちを表します。仮定法第3種の条件節と同じ形をとります。",
    "formation": "主語 + wish / wishes + (that) + 主語 + had + 動詞の過去分詞",
    "examples": [
      {
        "translation": "あんなにたくさん食べなければよかったのに。"
      },
      {
        "translation": "彼女はその仕事のオファーを受けておけばよかったと後悔している。"
      }
    ]
  },
  "en_b2_16": {
    "title": "wish + would - 他人の行動改善や状況の好転を求める表現",
    "shortExplanation": "他人の迷惑な言動に対する苛立ちや不満、あるいは天候など現状が好転することを強く願う気持ちを表し、「〜してくれたらいいのに」という意味を表します。",
    "longExplanation": "「wish ＋ would ＋ 動詞の原形」は、相手の行動を改めさせたいという不満やもどかしさ、あるいは天候や状況が変わってほしいという強い願望を表します。原則として主語と従属節の主語が同一人物である場合には用いません（自身の願望の場合は wish ＋ 過去形または could を用います）。",
    "formation": "主語 1 + wish / wishes + (that) + 主語 2 + would + 動詞の原形",
    "examples": [
      {
        "translation": "私の言うことをちゃんと聞いてくれたらいいのに。"
      },
      {
        "translation": "雨がやんでくれたらいいのに。"
      }
    ]
  },
  "en_b2_17": {
    "title": "制限用法と非制限用法（関係詞節の機能差）",
    "shortExplanation": "制限用法はどの先行詞かを特定・限定し（カンマなし）、非制限用法はすでにはっきりしている先行詞に補足説明を加えます（カンマあり）。",
    "longExplanation": "1. 制限用法（限定用法）：カンマを置かずに用い、話し手と聞き手がどの人物・事物を指しているのかを特定するために不可欠な情報を提供します。この節を省くと文意が成り立たなくなります。関係代名詞に that を使用することが可能です。\n2. 非制限用法（継続用法）：先行詞の直後にカンマを伴って置かれ、すでに特定されている人物・事物に対して補足的な情報を付け加えます。この節を取り除いても文の主要な意味は成立します。関係代名詞に that を用いることはできません。",
    "formation": "制限用法: 先行詞 + 関係代名詞 (who / which / that) + 節 | 非制限用法: 先行詞, + 関係代名詞 (who / which), + 節",
    "examples": [
      {
        "translation": "私が話したあの映画が今夜上映されます。"
      },
      {
        "translation": "パリに住んでいる私の姉が、来週訪ねてくる予定です。"
      }
    ]
  },
  "en_b2_18": {
    "title": "関係詞節における前置詞の位置と使い分け",
    "shortExplanation": "日常会話では前置詞を節の末尾に置き、改まった文体や書面では関係代名詞（whom / which）の直前に前置します。",
    "longExplanation": "関係詞節内における前置詞の配置様式は文体によって区別されます：\n1. 口語・日常会話：前置詞を節の末尾に残します（例: the house I grew up in）。この場合、関係代名詞は省略されるか that や who が用いられます。\n2. 形式張った文体・書面：前置詞を関係代名詞の前に置きます（例: the house in which I grew up）。\n重要規則：前置詞の直後には、人を指す場合は目的格の whom、物を指す場合は which のみが使用可能です。that や主格の who を前置詞直後に置くことはできません。",
    "formation": "口語表現: 先行詞 + (関係代名詞) + 節 + 前置詞 | 格式表現: 先行詞 + 前置詞 + whom / which + 節",
    "examples": [
      {
        "translation": "私が今取り組んでいるプロジェクトはとても面白い。"
      },
      {
        "translation": "私が現在従事しているプロジェクトは実に興味深いものです。"
      }
    ]
  },
  "en_b2_19": {
    "title": "結果を表す接続詞・接続表現：so... that, such... that, therefore, as a result",
    "shortExplanation": "ある原因から生じた結果を表し、「非常に〜なので…」「したがって」「その結果」という意味を表します。",
    "longExplanation": "結果を導く英語の代表的な構文および接続副詞：\n1. so ＋ 形容詞／副詞 ＋ that 節：程度を強調し「あまりに〜なので…だ」という結果を導きます（例: He spoke so quickly that nobody understood）。\n2. such ＋ (a / an) ＋ 形容詞 ＋ 名詞 ＋ that 節：意味は so... that と同じですが、名詞句を修飾する形で用いられます（例: It was such a long film that I fell asleep）。\n3. 文と文をつなぐ接続副詞：therefore（したがって）、consequently（結果として）、as a result（その結果）、hence / thus（それゆえに）。通常はピリオドやセミコロンの後に置かれ、直後にカンマを伴います。",
    "formation": "so + 形容詞 / 副詞 + that + 節 | such + (a / an) + 形容詞 + 名詞 + that + 節 | 文 1; therefore / consequently / as a result, + 文 2",
    "examples": [
      {
        "translation": "それはとても素晴らしい本だったので、私は2回も読みました。"
      },
      {
        "translation": "彼女は締め切りに間に合わなかったため、その結果契約を失ってしまいました。"
      }
    ]
  },
  "en_b2_20": {
    "title": "be used to / get used to + 動名詞 - 〜に慣れている／慣れる",
    "shortExplanation": "「be used to」は何かにすでに慣れている状態を表し、「get used to」は次第に慣れていく適応過程を表します。",
    "longExplanation": "1. be used to ＋ 動名詞 (V-ing) ／ 名詞：対象に「慣れている」という現在の状態を表します（ここでの to は前置詞であるため、後ろには動名詞または名詞が続きます）。\n2. get used to ＋ 動名詞 (V-ing) ／ 名詞：不慣れな段階から「徐々に慣れていく」「適応する」という変化の過程を強調します。\n注意すべき混同：過去の習慣や状態を表す「used to ＋ 動詞の原形」（かつて〜したものだ）とは構文的にも意味的にも全く異なるため明確に区別しましょう。",
    "formation": "主語 + be / get used to + 動名詞 (V-ing) / 名詞",
    "examples": [
      {
        "translation": "私はこんなに早く起きるのには慣れていません。"
      },
      {
        "translation": "時間はかかりましたが、彼女は新しいシステムに慣れました。"
      }
    ]
  },
  "en_b2_21": {
    "title": "過去未来：would / was, were going to",
    "shortExplanation": "過去のある時点を基準にして、その後に起きる予定だった動作や意図を表し、間接話法や物語文で使われます。",
    "longExplanation": "過去の視点から将来を見据える「過去における未来」の表現形式：\n1. would ＋ 動詞の原形：助動詞 will の過去形で、過去の発言や約束、予測を間接話法で伝える際に多用されます（例: She said she would come）。\n2. was / were going to ＋ 動詞の原形：過去の時点で予定・意図していた事柄を表しますが、実際には実現しなかったり中断されたりしたニュアンスを伴うことがよくあります（例: He was going to call but forgot）。\n3. was / were about to ＋ 動詞の原形：過去において「まさに〜しようとしていた」という直前の緊迫した状況を表します。",
    "formation": "主語 + would + 動詞の原形 | 主語 + was / were going to + 動詞の原形 | 主語 + was / were about to + 動詞の原形",
    "examples": [
      {
        "translation": "彼女はそこに行くと約束してくれました。"
      },
      {
        "translation": "彼がまさに立ち去ろうとしていたその時、彼女から電話がかかってきた。"
      }
    ]
  },
  "en_b2_22": {
    "title": "be to + 不定詞 - 公式な指令・義務・予定・運命",
    "shortExplanation": "公的な指示や規則、あらかじめ取り決められた予定、または物語文における宿命を表します。",
    "longExplanation": "「be動詞 ＋ to不定詞」構文は格式の高い文体で用いられ、以下の主な用法を持ちます：\n1. 公式な命令・義務：公的な規則や上位からの正式な指示を表します（例: Passengers are to remain seated - 乗客は着席していなければならない）。\n2. 公式な予定：公の協議や合意によって定められた将来の計画を表します（例: The summit is to take place next month - 首脳会談は来月開催される予定である）。\n3. 運命（主に過去形 was / were to）：伝記や物語の記述において「〜する運命にあった」という避けられない結末を表します（例: They were never to meet again - 二人は二度と再会することはなかった）。",
    "formation": "主語 + am / is / are / was / were + to + 動詞の原形",
    "examples": [
      {
        "translation": "金曜日までにレポートを提出しなければなりません。"
      },
      {
        "translation": "彼女は同時代における最も偉大な科学者の一人となる運命にあった。"
      }
    ]
  },
  "en_b2_23": {
    "title": "ought to - 道徳的義務と論理的当然性",
    "shortExplanation": "道義的な責任や当然なすべきこと、または道理に適った推測を表し、「〜すべきである」「〜するはずだ」という意味を表します。",
    "longExplanation": "「ought to」は客観的な道徳規範や社会通念、論理的な必然性に基づく助動詞的表現です（should よりも客観的で重い響きを持ちます）。\n• 形態の特徴：常に to を伴い、後ろに動詞の原形をとります（ought to do）。\n• 否定形：ought not to（短縮形 oughtn't to）。\n• 過去の行為：「ought to have ＋ 過去分詞」の形で「過去に〜すべきだったのに（実際はしなかった）」という不作為に対する非難や遺憾の念を表します。",
    "formation": "肯定: 主語 + ought to + 動詞の原形 | 否定: 主語 + ought not to + 動詞の原形 | 過去: 主語 + ought to have + 動詞の過去分詞",
    "examples": [
      {
        "translation": "あなたは自分の言ったことについて謝罪すべきです。"
      },
      {
        "translation": "彼女はもっと早く私たちに伝えておくべきでした。"
      }
    ]
  },
  "en_b2_24": {
    "title": "need - 助動詞と本動詞（一般動詞）の文法機能",
    "shortExplanation": "「need」には否定文・疑問文で使われる助動詞としての用法と、通常の一般動詞としての用法の2種類があります。",
    "longExplanation": "英語の「need」は文脈や文体によって2つの異なる文法クラスに属します：\n1. 助動詞としての need（主に格式ばった否定文や疑問文で用いられる）：三人称単数現在形の -s を付けず、助動詞 do の助けを借りずに用いられ、後ろには直接動詞の原形（原形不定詞）が続きます（例: You needn't worry / Need I explain?）。\n2. 一般動詞としての need：主語や時制に応じて語形変化し（三人称単数で -s を付加）、否定や疑問には do / does / did を用い、目的語として to不定詞をとります（例: She doesn't need to come）。",
    "formation": "助動詞: 主語 + needn't + 動詞の原形 | 一般動詞: 主語 + don't / doesn't / didn't need to + 動詞の原形",
    "examples": [
      {
        "translation": "両方の用紙に記入する必要はありません。"
      },
      {
        "translation": "彼女はすべての会議に出席する必要はありません。"
      }
    ]
  },
  "en_b2_25": {
    "title": "dare - あえて〜する・よくも〜できる（助動詞と一般動詞）",
    "shortExplanation": "思い切って行動する勇気や、反語・憤りの表現で「よくも〜できる」「あえて〜する」という意味を表します。",
    "longExplanation": "「dare」は「思い切って〜する」「あえて〜する」という意味を表し、助動詞と一般動詞の双方の性質を持ちます：\n1. 助動詞としての用法：修辞疑問文、感嘆文、否定文で多く用いられます。主語の活用変化はなく、直後に動詞の原形が接続します（例: How dare you! / I daren't ask）。\n2. 一般動詞としての用法：通常の規則に従って時制や人称変化を行い、否定や疑問には do / does / did を伴い、後ろには to不定詞（文脈により原形不定詞）をとります（例: She didn't dare to look / He dared to challenge the boss）。",
    "formation": "感嘆 / 助動詞: How dare + 主語 + 動詞の原形! | 主語 + daren't + 動詞の原形 | 一般動詞: 主語 + dare / dares / dared (to) + 動詞の原形",
    "examples": [
      {
        "translation": "よくも私に向かってそんな口が利けたものね！"
      },
      {
        "translation": "彼女は恐れずに堂々と自分の意見を述べた。"
      }
    ]
  },
  "en_b2_26": {
    "title": "再帰代名詞：myself, yourself, himself, herself, itself, ourselves, yourselves, themselves",
    "shortExplanation": "動作の対象が主語自身に向かう場合や、他人に頼らず自力で行ったことを強調する際に用います。",
    "longExplanation": "再帰代名詞（myself, yourself, himself, herself, itself, ourselves, yourselves, themselves）は文中で以下の主要な役割を果たします：\n1. 再帰的用法（目的語）：主語の行った動作が主語自身に向けられるとき、動詞や前置詞の目的語として用います（例: He cut himself - 彼は誤って自分の手を切った）。\n2. 強調的用法（同格）：主語や目的語の直後あるいは文末に置かれ、「他ならぬ自分自身で」「自ら」行ったことを際立たせます（例: I did it myself - 私自身が独力でやりました）。\n3. 頻出慣用句：by oneself（一人で、独力で）、help yourself（ご自由にどうぞ／ご自由にお取りください）、enjoy oneself（楽しく過ごす）。",
    "formation": "目的語用法: 主語 + 動詞 + 再帰代名詞 | 強調用法: 主語 (+ 再帰代名詞) + 動詞 + 目的語 (+ 再帰代名詞)",
    "examples": [
      {
        "translation": "彼女は独学でギターを習得しました。"
      },
      {
        "translation": "その機械は自動的に電源が切れます。"
      }
    ]
  },
  "en_b2_27": {
    "title": "集合名詞の単数・複数の一致：team, family, committee, government...",
    "shortExplanation": "人や物の集まりを表す集合名詞で、1つのまとまりとみなすか構成員個々を指すかによって単数・複数の動詞を使い分けます。",
    "longExplanation": "集合名詞（team, family, government, committee, staff, audience, crew, public など）は複数の構成員からなる集団を表します：\n• イギリス英語：集団内の個々のメンバーに意識を向けることが多く、複数動詞をとることが一般的です（例: The team are playing well）。集団全体を1つの単位として捉える場合は単数動詞も用いられます。\n• アメリカ英語：原則として集団全体を1つの単位とみなす傾向が強く、通常は単数動詞を用います（例: The team is playing well）。\n注意すべき例外：「police」（警察）はどの英語圏でも常に複数扱いであり、必ず複数動詞と組み合わせます。",
    "formation": "集合名詞 + 単数動詞（全体をひとまとまりとする場合／米語的傾向）または 複数動詞（構成員一人一人に焦点を当てる場合／英語的傾向）",
    "examples": [
      {
        "translation": "政府は新たな政策を発表した。"
      },
      {
        "translation": "観客は総立ちになって熱狂していた。"
      }
    ]
  },
  "en_b2_28": {
    "title": "分数・小数および基本的な計算式の表現ルール",
    "shortExplanation": "英語における分数、小数、パーセンテージ、ならびに四則演算記号の正確な読み方と構文ルール。",
    "longExplanation": "英語における数値や算術記号の標準的な読み上げ規則：\n1. 分数の読み方：分子を基数（通常の数詞）、分母を序数（順序数詞）で読みます。分子が2以上の場合は、分母の序数詞に複数形の -s を付けます（例: 1/2 は a half、1/3 は a third、1/4 は a quarter、3/4 は three quarters、2/3 は two thirds）。\n2. 小数の読み方：小数点は「point」と発音し、小数点以下の数字は1桁ずつ個別に読み上げます（例: 3.14 は three point one four、5.7 は five point seven）。\n3. パーセンテージ：基数 ＋ percent（例: 25% は twenty-five percent）。\n4. 四則演算の記号：加算（＋）は plus、減算（−）は minus、乗算（×）は times または multiplied by、除算（÷）は divided by、等号（＝）は equals または is と読みます。",
    "formation": "分数: 基数（分子）+ 序数（分母、分子が2以上なら複数形の-s） | 小数: 整数 + point + 各桁の数字を個別に発音",
    "examples": [
      {
        "translation": "生徒の4分の3が試験に合格しました。"
      },
      {
        "translation": "インフレ率は2.5パーセントに低下しました。"
      }
    ]
  },
  "en_b2_29": {
    "title": "副詞の比較級と最上級",
    "shortExplanation": "副詞の比較変化：より速く、より注意深く、最も良く、より悪く、より遠く。",
    "longExplanation": "副詞の比較変化は形容詞と基本的に同じ規則に従います：\n• 1音節の副詞：語尾に -er（比較級）/ -est（最上級）を付ける：fast → faster、hard → harder、early → earlier。\n• 主に -ly で終わる副詞：直前に more（比較級）/ most（最上級）を置く：carefully → more carefully → most carefully。\n• 不規則変化：well → better → best、badly → worse → worst、far → further/farther → furthest/farthest、little → less → least、much → more → most。",
    "formation": "短い副詞 + -er / -est、または more / most + -lyで終わる副詞",
    "examples": [
      {
        "translation": "彼女は以前よりも自信を持って話した。"
      },
      {
        "translation": "彼はチームの中で最も懸命に働いている。"
      }
    ]
  },
  "en_c1_01": {
    "title": "否定副詞による倒置構文",
    "shortExplanation": "強調のため否定の副詞を文頭に置き、助動詞を主語の前に配置する構文。",
    "longExplanation": "強調を表すために、否定または半否定の意味を持つ副詞や副詞句を文頭に置く構文です。その際、主語の前に助動詞（またはbe動詞）が置かれる倒置（疑問文と同じ語順）が起こります。\n倒置を引き起こす主な語句：never（決して〜ない）、rarely / seldom（めったに〜ない）、little（ほとんど〜ない）、hardly / scarcely / barely（ほとんど〜ない／〜するやいなや）、not only（〜だけでなく）、only（〜だけ）、no sooner（〜するやいなや）。",
    "formation": "否定副詞 + 助動詞 + 主語 + 本動詞",
    "examples": [
      {
        "translation": "これほど美しいものは今まで一度も見たことがない。"
      },
      {
        "translation": "彼女がミスをすることはめったにない。"
      },
      {
        "translation": "何が起ころうとしているのか、私は夢にも思っていなかった。"
      }
    ]
  },
  "en_c1_02": {
    "title": "Not only... but also の倒置構文",
    "shortExplanation": "強調表現：Not only で始まる節で倒置が起こり、後半の節は通常の語順を保ちます。",
    "longExplanation": "強調のために 'Not only' を文頭に置く場合、前半の節では助動詞が主語の前に来る倒置構文が適用されます。一方、後半の 'but (also)' に続く節は通常の語順のままとなります。\n「〜だけでなく、さらに…でもある」という予想以上の進展や事実を際立たせるために用いられます。",
    "formation": "Not only + 助動詞 + 主語 + 動詞, but (主語) + also + ...",
    "examples": [
      {
        "translation": "彼女は才能があるだけでなく、非常に勤勉でもある。"
      },
      {
        "translation": "彼らは遅刻しただけでなく、書類まで忘れてきた。"
      }
    ]
  },
  "en_c1_03": {
    "title": "Hardly / Scarcely / No sooner の倒置構文（〜するやいなや）",
    "shortExplanation": "2つの動作が直前直後に連続して起こることを表す：「〜するやいなや…」。",
    "longExplanation": "過去において2つの出来事が時間をおかずに連続して起こったことを表す構文です。先に起こった動作には過去完了形の倒置（had + 主語 + 過去分詞）を用い、後に続いた動作には過去形を用います。\n• Hardly / Scarcely + had + 主語 + 過去分詞 + when / before + 過去形の節。\n• No sooner + had + 主語 + 過去分詞 + than + 過去形の節。",
    "formation": "Hardly/Scarcely + had + 主語 + 過去分詞 + when + 過去形 / No sooner + had + 主語 + 過去分詞 + than + 過去形",
    "examples": [
      {
        "translation": "彼女が到着するかしないかのうちに、雨が降り出した。"
      },
      {
        "translation": "私が席に着くやいなや、誰かがドアをノックした。"
      }
    ]
  },
  "en_c1_04": {
    "title": "条件文（仮定法）における倒置：Had / Were / Should",
    "shortExplanation": "格式ばった文体において if を省略し、Had、Were、Should を文頭に置く倒置構文。",
    "longExplanation": "格式ばった文章や公的な文脈では、接続詞 'if' を省略して助動詞などを主語の前に置く倒置構文が頻繁に使われます：\n• 仮定法過去完了（過去の事実に反する仮定）：Had + 主語 + 過去分詞（= If + 主語 + had + 過去分詞）。\n• 仮定法過去（現在の事実に反する仮定）：Were + 主語 (+ to + 動詞の原形)（= If + 主語 + were / 過去形）。\n• 万一の仮定（実現の可能性が低い未来の仮定）：Should + 主語 + 動詞の原形（= If + 主語 + should + 動詞の原形）。",
    "formation": "Had + 主語 + 過去分詞 / Were + 主語 (+ to + 動詞原形) / Should + 主語 + 動詞原形",
    "examples": [
      {
        "translation": "彼女が私に話してくれていたら、手助けできたものを。"
      },
      {
        "translation": "もし私があなたの立場なら、引き受けるだろう。"
      },
      {
        "translation": "万が一ご支援が必要な場合は、お電話にてご連絡ください。"
      }
    ]
  },
  "en_c1_05": {
    "title": "It 分裂文（It is ... that/who 強調構文）",
    "shortExplanation": "文中の特定の要素に焦点を当てて際立たせる「It is/was ... that/who」の強調構文。",
    "longExplanation": "It を主語にした分裂文（強調構文）の基本構造：It + be動詞（時制に応じる）+ 強調したい要素 + that/who/which + 文の残り部分。\n文全体の焦点を特定の主語、目的語、あるいは副詞句へとシフトさせ、「他ならぬ〜こそが…だ」という意味合いを際立たせます：\n• 人を強調する場合：who または that。\n• モノ・状況・時・場所などを強調する場合：that（または which）。",
    "formation": "It + be動詞 + 強調要素 + that/who + 文の残り",
    "examples": [
      {
        "translation": "私の目を覚まさせたのは、まさにその物音だった。"
      },
      {
        "translation": "成功へと導くものこそ、懸命な努力である。"
      }
    ]
  },
  "en_c1_06": {
    "title": "Wh- 分裂文（擬似分裂文：What ... is/was ...）",
    "shortExplanation": "「What」で始まる名詞節を主語にし、強調したい要点を文末（be動詞の後）に提示する構文。",
    "longExplanation": "擬似分裂文（Wh-cleft）の典型的な構造：What節 + be動詞 + 強調したい要素。\n文頭の What 節で前提となる話題を提示し、言いたい最重要のポイントを文末（be動詞の後ろ）に持ってくることで、聞き手の注意を強く引きつけます。",
    "formation": "What + 従属節 + be動詞 + 強調要素",
    "examples": [
      {
        "translation": "私がロンドンで一番気に入っているのは、その多様性です。"
      },
      {
        "translation": "彼がしたことは、全く思いもよらないことだった。"
      }
    ]
  },
  "en_c1_07": {
    "title": "要求・提案を表す動詞に続く仮定法現在",
    "shortExplanation": "要求・提案・命令を表す動詞の後の that 節内では、主語の人称に関わらず動詞の原形を用います。",
    "longExplanation": "提案、要求、主張、命令などを表す動詞（suggest, recommend, insist, demand, propose, request, require, order 等）に続く that 節では、動詞に「原形不定詞（仮定法現在）」を用います。\n主語が3人称単数であっても -s は付かず、過去の文脈であっても過去形にならず、be動詞は常に「be」となります。\n• アメリカ英語では動詞の原形を用いる純粋な仮定法が一般的です。\n• イギリス英語では「should + 動詞の原形」を用いることも好まれます（例：I suggest that he should leave）。",
    "formation": "主語 + 提案・要求動詞 + that + 主語 + (should) + 動詞の原形",
    "examples": [
      {
        "translation": "私は彼に医師の診察を受けるよう勧めます。"
      },
      {
        "translation": "全ての学生がその会議に出席することが不可欠です。"
      }
    ]
  },
  "en_c1_08": {
    "title": "It's high time + 過去形（もう〜してもよい頃だ）",
    "shortExplanation": "とっくに実行されているべき時が来ていることを表し、軽い促しや批判のニュアンスを含みます。",
    "longExplanation": "基本構造：It's (high / about) time + 主語 + 動詞の過去形。\n動詞の形は過去形をとりますが、意味は現在や未来に向けられた仮定法的な表現です。本来ならもっと前に済ませておくべきだった事柄に対して、「もうとっくに〜する時間だ」と強い促しやもどかしさを表します：\n• It's time：〜する時間だ。\n• It's high time / It's about time：さらに強調され、「とっくに〜していて然るべき頃合だ」。",
    "formation": "It's (high / about) time + 主語 + 動詞の過去形",
    "examples": [
      {
        "translation": "彼女はそろそろ新しい仕事を見つけてもいい頃だ。"
      },
      {
        "translation": "あなたはとっくに謝罪していて当然の時間ですよ。"
      }
    ]
  },
  "en_c1_09": {
    "title": "as if / as though に続く仮定法（まるで〜であるかのように）",
    "shortExplanation": "事実とは異なる、あるいは現実味のない比喩を表す：「まるで〜であるかのように」。",
    "longExplanation": "接続詞 as if または as though（まるで〜のように）に仮定法を続けることで、事実に反する状況や現実離れした様子を描写します：\n• as if / as though + 過去形：現在の事実に反する仮定を表します（be動詞には人称に関わらず were を用いるのが正式）。\n• as if / as though + 過去完了形（had + 過去分詞）：過去の事実に反する仮定を表します。",
    "formation": "主語 + 動詞 + as if / as though + 主語 + 過去形 / 過去完了形",
    "examples": [
      {
        "translation": "彼はまるで自分が大富豪であるかのように金を使う。"
      },
      {
        "translation": "彼女はまるで以前彼に会ったことがあるかのように話した。"
      }
    ]
  },
  "en_c1_10": {
    "title": "So / Neither + 助動詞 + 主語（同意を表す倒置表現）",
    "shortExplanation": "相手の発言への同意を表す：肯定文には 'So...'（〜もそうだ）、否定文には 'Neither...'（〜もそうではない）。",
    "longExplanation": "前述の発言に対して、同じ文を繰り返さずに「〜も同じです」と同調・同意を表す倒置構文です：\n• So + 助動詞 + 主語：肯定文に対する同意（「〜もそうです」）。\n• Neither / Nor + 助動詞 + 主語：否定文に対する同意（「〜もそうではありません」）。\n注意点：助動詞や be 動詞は、元の文の時制および動詞の種類（一般動詞なら do/did、完了形なら have 等）に正確に一致させる必要があります。",
    "formation": "So / Neither + 助動詞 + 主語",
    "examples": [
      {
        "translation": "私はジャズが大好きです。彼女もそうです。"
      },
      {
        "translation": "私はローマに行ったことがありません。私もありません。"
      }
    ]
  },
  "en_c1_11": {
    "title": "従属節の代用となる 'so'：I think so / I hope so / I'm afraid so",
    "shortExplanation": "think や hope、be afraid などの後で、前述の内容（節全体）の代わりに「so」を用いる表現。",
    "longExplanation": "代名詞「so」は、前述の文や節の内容全体を簡潔に受けるために、思考・希望・懸念などを表す動詞の後ろで用いられます：think, hope, suppose, expect, believe, imagine, be afraid など。\n否定の形には2つのパターンがあります：\n• 動詞そのものを否定形にする：I don't think so、I don't suppose so など。\n• 後ろに not を置く（hope や be afraid 等）：I hope not（そうでないことを願う）、I'm afraid not（あいにくそうではないようだ）。※「I don't hope so」とは言わない点に注意。",
    "formation": "主語 + think / hope / suppose... + so（否定形：I don't think so / I hope not）",
    "examples": [
      {
        "translation": "彼は来るでしょうか？——来ると思います。／来ないと思います。"
      },
      {
        "translation": "それは高いですか？——あいにくそのようです。"
      },
      {
        "translation": "もう閉まっていますか？——閉まっていないといいのですが。"
      }
    ]
  },
  "en_c1_12": {
    "title": "制限用法の関係詞節と非制限用法の関係詞節",
    "shortExplanation": "先行詞を限定する制限用法（カンマなし）と、付加的な情報を添える非制限用法（カンマあり）の相違。",
    "longExplanation": "関係代名詞節における2つの重要な用法の区別：\n• 制限用法（Defining）：どの人やモノを指しているかを特定するために不可欠な情報を与えます。カンマは置かず、関係代名詞に that を使用することも可能です。目的格の関係代名詞は省略できます。\n• 非制限用法（Non-defining）：既に特定されている人物や事物に対して補足的な情報を追加します。必ず前後にカンマを置く必要があります。関係代名詞には who または which のみを用い（that は不可）、関係代名詞を省略することはできません。",
    "formation": "制限用法：先行詞 + who/that/which + 節 / 非制限用法：先行詞, who/which + 節, ...",
    "examples": [
      {
        "translation": "オスカーを受賞したその映画は素晴らしかった。（どの映画かを特定する制限用法）"
      },
      {
        "translation": "2009年に公開された『アバター』は、大ヒットを記録した。（既に特定された映画についての補足情報）"
      }
    ]
  },
  "en_c1_13": {
    "title": "格式ばった文体における「前置詞 + which/whom」",
    "shortExplanation": "格式ばった文脈において、前置詞を関係代名詞 which/whom の直前に置く構文。",
    "longExplanation": "論文、公式文書、ビジネスレターなどの格式高い文体では：\n• 関係詞節内の前置詞を関係代名詞の直前に配置します：「前置詞 + which（モノ）」または「前置詞 + whom（人）」。\n• 一方、日常会話やくだけた文体では、前置詞を節の末尾に残す語順が好まれます（その際、関係代名詞には who を用いたり省略したりします）。\n注意：前置詞の直後には、人に対しては whom（who や that は不可）、モノに対しては which（that は不可）のみが使用可能です。",
    "formation": "格式表現：先行詞 + 前置詞 + which/whom + ... / 口語表現：先行詞 + (who/which) + ... + 前置詞",
    "examples": [
      {
        "translation": "私が言及した報告書を添付いたします。（格式表現）"
      },
      {
        "translation": "私が言及していた報告書は添付してあります。（一般的な表現）"
      },
      {
        "translation": "話に出ていた報告書、添付しておいたよ。（くだけた会話表現）"
      }
    ]
  },
  "en_c1_14": {
    "title": "英語における名詞化（Nominalization）",
    "shortExplanation": "動詞や形容詞を名詞へと変換する表現で、学術論文や公的文書の際立った特徴です。",
    "longExplanation": "名詞化（Nominalization）とは、接尾辞などを付加して動詞や形容詞を名詞の形へと変換する現象です。学術論文、ビジネス文書、公式報告書などの特徴的な文体技法であり、文章を客観的で引き締まった格調高いものにする効果があります。\n主要な名詞語尾（接尾辞）：\n• -tion / -sion：decide → decision（決定）、discuss → discussion（議論）。\n• -ment：improve → improvement（改善）、develop → development（発展）。\n• -ance / -ence：appear → appearance（出現・外見）、differ → difference（相違）。\n• -ity：complex → complexity（複雑さ）、able → ability（能力）。\n• -ness：happy → happiness（幸福）、aware → awareness（認識・自覚）。",
    "formation": "動詞・形容詞 + 名詞化接尾辞（-tion, -ment, -ance, -ity, -ness 等）",
    "examples": [
      {
        "translation": "彼女は拡大することを決定した。→ 当社を拡大するという我々の決定は……"
      },
      {
        "translation": "彼は〜を発見した。→ 誤りに関する彼の発見は……"
      }
    ]
  },
  "en_c1_15": {
    "title": "学術文における名詞化（Nominalization）",
    "shortExplanation": "動詞や節を名詞句へ変換することで、文章を簡潔で客観的かつ格調高い学術的文体にする手法。",
    "longExplanation": "名詞化とは、動詞、形容詞、または従属節全体を名詞や名詞句へと変換する文法的手法です。以下の効果があります：\n1. 情報の凝縮：複数の節からなる長い文を簡潔にまとめ、情報密度を高めます（例：「物価が上がった」→「物価の上昇」）。\n2. 修飾語の付加：名詞句の前後に形容詞などの修飾語を付加し、精密な定義を可能にします。\n3. 客観的・学術的な文体の形成：主観的な人称代名詞を排除し、フォーマルで客観的な論文調の文章に仕上げます。",
    "formation": "動詞を含む節 → 名詞句（例：The fact that prices increased → The increase in prices...）",
    "examples": [
      {
        "translation": "大気の質に著しい改善が見られました。"
      },
      {
        "translation": "彼がコメントを拒否したことは、誰もを驚かせました。"
      }
    ]
  },
  "en_c1_16": {
    "title": "現在分詞構文：V-ing 節（Present participle clause）",
    "shortExplanation": "現在分詞（V-ing）を用いて副詞節を短縮し、同時進行の動作や理由・原因を表す表現。",
    "longExplanation": "主節と主語が一致する場合、副詞節を現在分詞（V-ing）を用いた分詞構文へと書き換えることができます：\n• 同時進行（〜しながら、〜するとき）：Walking home, I noticed something strange.（＝ 家に歩いて帰っている途中、奇妙なことに気づいた）\n• 理由・原因（〜なので）：Knowing the answer, she raised her hand.（＝ 答えがわかっていたので、彼女は手を挙げた）\n• 注意点：分詞構文の意味上の主語は、必ず主節の主語と一致していなければならず、懸垂分詞の誤りを避ける必要があります。",
    "formation": "現在分詞（V-ing）＋ 〜, 主語 ＋ 動詞〜 ／ 否定形：Not ＋ V-ing ＋ 〜, 主語 ＋ 動詞〜",
    "examples": [
      {
        "translation": "空港に到着したとき、彼はパスポートを忘れてきたことに気づきました。"
      },
      {
        "translation": "どうすべきかわからず、彼女は母親に電話をかけました。"
      }
    ]
  },
  "en_c1_17": {
    "title": "過去分詞構文：V3 / Having + V3 節（Past participial phrase）",
    "shortExplanation": "過去分詞で受動の意味を表し、「Having + 過去分詞」で主節よりも前の完了動作を表す表現。",
    "longExplanation": "過去分詞や完了分詞を用いた分詞構文は、格調高い簡潔な記述を可能にします：\n• 過去分詞節（V-ed/V3）：受動の意味や完了した状態を表します（例：Built in 1889, the Eiffel Tower... ＝ 1889年に建造されたエッフェル塔は…）。\n• 完了分詞節（Having ＋ 過去分詞）：分詞の表す動作が、主節の動作よりも明確に過去に完了していたことを強調します（例：Having read the report, he called a meeting. ＝ 報告書を読み終えた後、彼は会議を招集した）。",
    "formation": "過去分詞（V-ed/V3）＋ 〜, 主語 ＋ 動詞〜 または Having ＋ 過去分詞（V-ed/V3）＋ 〜, 主語 ＋ 動詞〜",
    "examples": [
      {
        "translation": "その知らせに大きな衝撃を受け、彼女は静かに座り込みました。"
      },
      {
        "translation": "試験を終えると、生徒たちは教室を退出していきました。"
      }
    ]
  },
  "en_c2_01": {
    "title": "unless / provided / as long as / on condition that を用いた条件節",
    "shortExplanation": "「if」の代用として、「〜でない限り」「〜という条件で」「〜でさえあれば」という厳格な条件を表す表現。",
    "longExplanation": "上級英語において、if の代わりに特定の接続詞を用いて条件を細やかに表現します：\n• unless ＝ 〜でない限り、もし〜でなければ（if not に相当。語自体に否定の意味が含まれるため、節内では否定形を用いません）。\n• provided / providing (that) ＝ 〜という条件で、〜でありさえすれば（不可欠な必要条件を表します）。\n• as long as ＝ 〜である限り、〜でさえあれば（状態の継続を前提とする条件）。\n• on condition that ＝ 〜を条件として（契約書や公式文書で用いられる非常にフォーマルな表現）。\n• in case ＝ 〜の場合に備えて、万一〜なら。",
    "formation": "条件を表す接続詞（Unless / Provided / As long as / On condition that）＋ 条件節, 主節",
    "examples": [
      {
        "translation": "きちんと返済してくれるなら、お金をお貸ししますよ。"
      },
      {
        "translation": "何もダウンロードしないという条件なら、私のノートパソコンを使って構いません。"
      }
    ]
  },
  "en_c2_02": {
    "title": "Suppose / Supposing / What if による仮定表現",
    "shortExplanation": "仮定の状況を提示したり、もしもの場合の問いかけを行ったりする表現。",
    "longExplanation": "仮定の状況を設定して問いかける際に用いられる構文です：\n• Suppose / Supposing：if の代わりに用いられ、「もし〜だとしたらどうするか」という仮定の設問を作ります。\n• What if：「もし〜だったらどうなるだろう？」「〜したらどうする？」という口語的な表現です。\n• 過去形や過去完了形を伴う場合：現実には起こりそうにない空想上の事態や反実仮想を表します。",
    "formation": "Suppose / Supposing / What if ＋ 主語 ＋ 動詞（過去形または現在形）〜, 疑問節？",
    "examples": [
      {
        "translation": "仮に選択しなければならないとしたら、どちらを選びますか？"
      },
      {
        "translation": "もし誰も来なかったらどうしましょう？ どうすべきですかね？"
      }
    ]
  },
  "en_c2_03": {
    "title": "Only + 状況語句による倒置構文",
    "shortExplanation": "「Only」を伴う時や条件の副詞句・節を文頭に置いて強調し、主節を倒置させる構文。",
    "longExplanation": "Only を伴う時・条件・手段の表現（only when, only after, only if, only then, only by, only in など）が文頭に置かれて強調されると、主節は助動詞・be動詞が主語の前に出る部分倒置になります。\nこれは格式ある文章や公式演説において、極めて強い説得力と力強さをもたらす代表的な修辞技法です。",
    "formation": "Only ＋ 状況副詞句／副詞節（時・条件・手段）＋ 助動詞／be動詞 ＋ 主語 ＋ 本動詞〜",
    "examples": [
      {
        "translation": "実際に自ら経験してみて初めて、人は真に理解できるのです。"
      },
      {
        "translation": "何年もの厳しい鍛錬を経て初めて、彼女はその技を完全に習得しました。"
      }
    ]
  },
  "en_c2_04": {
    "title": "So + 形容詞／副詞 による倒置構文",
    "shortExplanation": "「So ＋ 形容詞／副詞」や「Such」を文頭に配置して程度を際立たせ、結果を導く倒置表現。",
    "longExplanation": "文語的で格調高い演説調の倒置構文です：\n• So ＋ 形容詞／副詞 ＋ be動詞／助動詞 ＋ 主語 ＋ that ＋ 結果の節（非常に〜だったので、その結果…）。\n• Such ＋ be動詞 ＋ 主語 ＋ that ＋ 結果の節（事態があまりにも〜であったため、その結果…）。",
    "formation": "So ＋ 形容詞／副詞 ＋ be動詞／助動詞 ＋ 主語 ＋ that ＋ 節 または Such ＋ be動詞 ＋ 主語 ＋ that ＋ 節",
    "examples": [
      {
        "translation": "変化があまりにも急激であったため、誰ひとりとして適応することができませんでした。"
      },
      {
        "translation": "彼女の才能は極めて卓越していたため、奨学金の給付を提示されました。"
      }
    ]
  },
  "en_c2_05": {
    "title": "垣根表現・ヘッジング（Hedging）：appear to, seem to, tend to, be likely to",
    "shortExplanation": "断定を慎重に和らげることで、学術的な客観性と謙虚さを示す表現法。",
    "longExplanation": "垣根表現（ヘッジング）とは、学術論文などで主張を過度に断定せず、控えめで慎重なトーンを保つために用いられる表現技術です。\n代表的な基本構造：\n• appear / seem to：〜のように思われる、〜のように見受けられる\n• tend to：〜する傾向がある、往々にして〜である\n• be likely / unlikely to：〜する可能性が高い ／ 考えにくい\n• be thought / considered to be：〜であると考えられている／みなされている",
    "formation": "主語 ＋ appear / seem / tend ＋ to 不定詞 または 主語 ＋ be likely / thought / considered ＋ to 不定詞",
    "examples": [
      {
        "translation": "研究結果は、一定の相関関係の存在を示唆しているように見受けられます。"
      },
      {
        "translation": "企業は導入コストを過小評価してしまう傾向にあります。"
      }
    ]
  },
  "en_c2_06": {
    "title": "学術文における談話標識（Discourse markers）",
    "shortExplanation": "論理の展開や段落間の接続を明示し、学術的な議論を整然と構築するつなぎ言葉。",
    "longExplanation": "ディスコースマーカー（談話標識）は、学術的文章の論理構造を整理し、読者を正しく導く役割を果たします：\n• 追加・情報の付加：Moreover, Furthermore, In addition, Additionally（さらに、加えて）\n• 対比・逆接：However, Nevertheless, Conversely, On the other hand（しかしながら、それにもかかわらず、逆に、他方では）\n• 結果・帰結：Therefore, Consequently, As a result, Hence, Thus（したがって、結果として、それゆえに）\n• 言い換え・詳述：In other words, That is to say, Namely（言い換えれば、すなわち、つまり）\n• 譲歩：Admittedly, While it is true that, Despite this（確かに〜であるが、事実ではあるものの、それにもかかわらず）",
    "formation": "談話標識（文頭）＋ カンマ ＋ 独立節 または 節1；談話標識, 節2",
    "examples": [
      {
        "translation": "実験は不成功に終わりました。それにもかかわらず、得られた知見は多くの示唆に富むものでした。"
      },
      {
        "translation": "さらに、収集されたデータは極めて強い相関関係を示しています。"
      }
    ]
  },
  "en_c2_07": {
    "title": "言語位相・レジスター（Speech registers）：フォーマル、ニュートラル、口語",
    "shortExplanation": "相手、場面、目的に応じて、格式体、中立体、口語体を適切に使い分ける概念。",
    "longExplanation": "言語の位相（レジスター）は、文脈、話し相手、伝達目的に応じて適切に選択されます：\n• 格式体（フォーマル）：受動態、名詞化構文、複合接続詞を多用し、短縮形を避け、ラテン語起源の語彙（commence, terminate, assist など）を用います。\n• 中立体（ニュートラル）：標準的な文法に従い、俗語を用いず、平易かつ過不足のない表現を用います。\n• 口語体（インフォーマル）：主語や語句の省略、句動詞（postpone に対する put off など）、短縮形、日常的なくだけた口語表現を多用します。",
    "formation": "格式体（学術語彙・受動態・非短縮）↔ 中立体（標準文法表現）↔ 口語体（句動詞・短縮形・口語表現）",
    "examples": [
      {
        "translation": "フォーマル（格式体）：ある相違点につきまして、ご留意いただきたく存じます。"
      },
      {
        "translation": "ニュートラル（中立体）：間違いをひとつ指摘させていただきたいと思います。"
      },
      {
        "translation": "インフォーマル（口語）：ちょっと気になった点があったから共有しておきたくて。"
      }
    ]
  },
  "en_c2_08": {
    "title": "類義語のニュアンスとコノテーション（Connotations）",
    "shortExplanation": "類義語が持つ感情的色彩（肯定的、中立的、否定的）や語感の違いを正しく見極める概念。",
    "longExplanation": "同じ事象を指す同義語であっても、内包する感情的色彩（コノテーション）や受ける印象が大きく異なります。\n代表的なニュアンスのグラデーション：\n• slim（ほっそりとして魅力的：肯定）→ thin（痩せている：中立）→ skinny（痩せこけている：否定）→ scrawny/gaunt（骨と皮ばかり／げっそりやつれた：極めて否定）\n• determined（意志が固く不屈：肯定）→ firm（揺るぎない：中立）→ stubborn/pig-headed（頑固／意固地：否定）\n• thrifty（やりくり上手：肯定）→ economical（経済的：中立）→ stingy/tight-fisted（ケチ／出し惜しみ：否定）\n• confident（自信に満ちた：肯定）→ assertive（自己主張がはっきりした：中立）→ arrogant（傲慢で横柄：否定）",
    "formation": "類義語の階層：肯定的な意味合い（＋）→ 中立的な意味合い（0）→ 否定的な意味合い（−）",
    "examples": [
      {
        "translation": "同じ体型を指す場合でも話者の評価が異なります：彼女はスリムだ（肯定）／彼女は痩せている（中立）／彼女はガリガリだ（否定）。"
      }
    ]
  },
  "en_c2_09": {
    "title": "修辞技法：首句反復、交差配列法、三連句法（Rhetorical devices）",
    "shortExplanation": "演説や論説文においてリズムを生み出し、聴衆に強い印象を残す古典的レトリック手法。",
    "longExplanation": "格調高い文章や演説で多用される伝統的な修辞技法：\n• 首句反復：連続する文や節の冒頭で同じ言葉を繰り返し、感情的な高揚感を生み出します（例：「I have a dream... I have a dream...」）。\n• 交差配列法：A-B に対し B-A という交差的・対称的な構造を用いて深い対比の印象を残します（例：「Ask not what your country can do for you, but what you can do for your country」）。\n• 三連句法（トリコロン）：3つの並列する要素をテンポよく並べて心地よいリズムを作ります（例：「来た、見た、勝った」／「人民の、人民による、人民のための政治」）。",
    "formation": "首句反復（文頭で A を反復）／ 交差配列法（A-B に対する B-A の対称構造）／ 三連句法（3つの並列句 A, B, C）",
    "examples": [
      {
        "translation": "友よ、ローマ市民たちよ、同胞たちよ、私の声に耳を傾けてほしい。（三連句法による呼びかけ）"
      },
      {
        "translation": "多くを学べば学ぶほど、より多くを稼ぐことができる。（格言に見られる交差対句表現）"
      }
    ]
  },
  "en_c2_10": {
    "title": "学術文における的確なコロケーション（Academic collocations）",
    "shortExplanation": "特定の名詞に対して最もふさわしい学術動詞を正しく組み合わせる連結表現。",
    "longExplanation": "最上級の英語においては、各名詞と自然に結びつく「正しい動詞」を選択することが極めて重視されます：\n主要な学術的コロケーション：\n• conduct / carry out research（研究・調査を実施する；make や do は用いない）\n• draw / reach a conclusion（結論を導き出す・達する）\n• raise / address / tackle an issue（問題を提起する／問題に対処する／取り組む）\n• reach / achieve a consensus（合意に達する／コンセンサスを形成する）\n• make significant progress（著しい進展を遂げる）\n• pose / present a challenge（難題を突きつける／課題をもたらす）",
    "formation": "定型的な学術動詞 ＋ 対応する名詞句（例：conduct research, reach a consensus など）",
    "examples": [
      {
        "translation": "研究チームは非常に広範なインタビュー調査を実施しました。"
      },
      {
        "translation": "委員会は最終的に合意に達することができませんでした。"
      }
    ]
  },
  "en_c2_11": {
    "title": "独立分詞構文（Absolute construction）",
    "shortExplanation": "主節と異なる主語を持つ名詞と分詞の組み合わせにより、接続詞なしで簡潔に状況を補足する構文。",
    "longExplanation": "独立分詞構文＝ 名詞／代名詞 ＋ 分詞（主節とは異なる独自の意味上の主語を保持）。\n文語的でフォーマルなスタイルで用いられ、従属接続詞を用いずに状況（時、原因、条件、付帯状況）を凝縮して付け加えることができます。\n代表的な類型：\n• 条件：Weather permitting ＝ 天候が許せば\n• 総合評価：All things considered ＝ あらゆる事情を勘案すると\n• 完了・時：Her work finished ＝ 彼女の仕事が終わったとき；This done ＝ これが済んだ後",
    "formation": "名詞／代名詞 ＋ 分詞（現在分詞 V-ing または過去分詞 V-ed/V3）, 主節",
    "examples": [
      {
        "translation": "すべての要素を総合的に勘案すれば、それは非常に成功したイベントでした。"
      },
      {
        "translation": "提出期限がすでに過ぎてしまっていたため、そのプロジェクトは打ち切られました。"
      }
    ]
  },
  "en_c2_12": {
    "title": "談話における省略と代名・代行（Ellipsis & Substitution）",
    "shortExplanation": "既出の冗長な要素を省略したり代用表現に置き換えることで、文を簡潔かつ自然に連結する技法。",
    "longExplanation": "文章の流れをスムーズにし、同一語の退屈な重複を避けるための必須技法です：\n• 省略：文脈上すでに自明な要素を思い切って省くこと（例：I wanted to leave, but wasn't allowed to [leave] で不定詞の動詞を省略）。\n• 代名・代行（代用）：繰り返しの代わりに do, so, one, it などの代用表現を用いること。\n具体的なパターンの例：\n• 対話における省略：A: Are you coming? B: Might (do).\n• 並列での代動詞：She speaks French and he does too / so does he.\n• 名詞の反復回避（one）：The big one? I prefer the small one.",
    "formation": "先行する文／節 ＋ 接続詞／対話応答 ＋ [既知要素の省略 または do / so / one / to による代用]",
    "examples": [
      {
        "translation": "車の運転はできますか？ —— 以前は運転していました（今はしていません）。"
      },
      {
        "translation": "彼女はここに来ると言っていましたし、実際にやって来ました。"
      }
    ]
  },
  "en_c2_13": {
    "title": "従属節の代用となる不定詞句",
    "shortExplanation": "従属節の代わりに不定詞句を用いることで、文を簡潔かつ論理的に表現します。",
    "longExplanation": "複合目的語（目的語 ＋ 不定詞）などの構文を用いることで、接続詞で始まる従属節を簡潔に置き換えることができます：\n• 願望や要求を表す動詞 ＋ 目的語 ＋ 'to' 不定詞：例えば「彼女に残ってほしい」を表す構文など。\n• 知覚動詞や使役動詞（見る、聞く、見守る、〜させる、してもらう等）の後：能動態では 'to' のない原形不定詞を用います（例：「彼女が去るのを見た」「彼を泣かせた」「手伝わせてください」）。\n• 使役動詞を受身形にする場合：'to' 不定詞を補う必要があります（例：「彼は支払いを余儀なくされた」）。\n• 推量や外見を表す動詞（〜のようだ、たまたま〜である、〜だと判明する等）＋ 'to' 不定詞：例えば「彼女は知っているようだ」「彼は偶然そこに居合わせた」などの表現になります。",
    "formation": "主語 + 動詞 + 目的語 + 不定詞（'to' 不定詞 / 原形不定詞）または 主語 + 推量・外見動詞 + 'to' 不定詞",
    "examples": [
      {
        "translation": "あなたにこの書類へ署名していただく必要があります。"
      },
      {
        "translation": "彼女は公の場で謝罪させられました。"
      },
      {
        "translation": "彼はすべてのことを忘れてしまったようでした。"
      }
    ]
  },
  "en_c2_14": {
    "title": "未来完了進行形",
    "shortExplanation": "未来のある時点まで動作が継続していることを表し、その時点までの継続期間の長さを強調します。",
    "longExplanation": "未来完了進行形は、過去または現在から始まった動作が未来の特定の時点まで継続していることを表し、特に「その時点でどれくらいの期間続いているか」という継続の長さを強調する際に用いられます。\n「〜までに」「〜の間」「〜するとき」といった時間や期限を表す表現とともに用いられることが多く、例えば「月曜日の時点で、彼女はこのプロジェクトに3週間取り組み続けていることになります」のように使われます。",
    "formation": "主語 + will have been + 動詞の現在分詞（'-ing' 形）",
    "examples": [
      {
        "translation": "来年で、私は英語を学び続けて5年になります。"
      },
      {
        "translation": "私たちが到着する頃には、彼女は2時間待ち続けていることになります。"
      }
    ]
  },
  "en_c2_15": {
    "title": "時制の一致",
    "shortExplanation": "主節の動詞が過去形の場合、従属節の動詞も原則として過去の時制へ繰り下げる規則です。",
    "longExplanation": "複文において、従属節の述語動詞の時制は主節の動詞の時制に連動して変化します。\n主節の動詞が過去時制である場合、従属節の動詞は一段階過去の時制へと一致（バックシフト）させます：\n• 現在形 → 過去形（例：「彼はそれが真実だと言った」）\n• 過去形 → 過去完了形（例：「彼女はそれを見たと言った」）\n• 現在完了形 → 過去完了形（例：「彼は終えたと言った」）\n• 助動詞も過去形へ変化（will は would に、can は could に、may は might に、is は was に変化）\n※例外規則：不変の真理や科学的事実を述べる場合は、主節が過去形であっても時制の一致を行わず現在形を維持します。",
    "formation": "主節（過去時制） + 従属節（連動して過去時制へ繰り下げた動詞）",
    "examples": [
      {
        "translation": "彼は何年もの間そこに住んでいたと私に話してくれました。"
      },
      {
        "translation": "彼女は地球が太陽の周りを回っていると言いました。"
      }
    ]
  },
  "en_c2_16": {
    "title": "等位接続詞",
    "shortExplanation": "文法上対等な関係にある単語、句、独立節同士を結びつける接続詞です。",
    "longExplanation": "等位接続詞は、文の中で対等な資格を持つ文法要素を結びつけます。英語における主要な7つの等位接続詞：\n• for：というのも〜だから（フォーマルな理由説明）：例「彼女は立ち去った、疲れていたからである」\n• and：そして、〜と（情報の追加・並列）\n• nor：〜もまた…ない（否定の追加。節を導く場合は主語と動詞が倒置されます）：例「彼女は電話もしなかったし、手紙も書かなかった」\n• but：しかし（対比・逆接）\n• or：または、あるいは（選択）\n• yet：それにもかかわらず、だが（but よりも改まった逆接表現）\n• so：したがって、それで（結果・帰結）",
    "formation": "独立節 + コンマ（,） + 等位接続詞（for, and, nor, but, or, yet, so） + 独立節",
    "examples": [
      {
        "translation": "彼女は疲れていましたが、それでも仕事を続けました。"
      },
      {
        "translation": "彼は勉強もしなかったし、授業にも出席しませんでした。"
      }
    ]
  },
  "en_c2_17": {
    "title": "従属接続詞",
    "shortExplanation": "主節に従属する節を導き、主節との論理的な関係性を表す接続詞です。",
    "longExplanation": "従属接続詞は、主節に対して従属的な役割を持つ節を導き、文と文の間に論理的な関係を与えます。\n表す意味による分類：\n• 時：〜のとき、〜する間、〜した後に、〜する前に、〜までずっと、いったん〜すると、〜するとすぐに、〜するときはいつでも 等\n• 理由・原因：〜だから、〜である以上、〜を考慮すると、〜にかんがみて 等\n• 条件：もし〜なら、〜でない限り、〜という条件で、〜である限り、〜の場合に備えて、仮に〜としたら 等\n• 目的：〜するために、〜しないように 等\n• 譲歩・対比：〜であるけれども、〜にもかかわらず、その一方で、〜である反面 等",
    "formation": "従属接続詞 + 従属節 + コンマ（,） + 主節 または 主節 + 従属接続詞 + 従属節",
    "examples": [
      {
        "translation": "締め切りが過ぎてしまったことを受けて、私たちは会議を中止しました。"
      },
      {
        "translation": "彼女が忘れてしまわないように、彼はリマインダーを送りました。"
      }
    ]
  },
  "en_c2_18": {
    "title": "コンマ、セミコロン、コロンの語法",
    "shortExplanation": "独立節の接続、リストの提示、補足説明を行う際のコンマ、セミコロン、コロンの正確な用法です。",
    "longExplanation": "英語における主要な約物（句読点）の用法ルール：\n• コンマ（,）：独立節同士を結ぶ等位接続詞の前、文頭の導入語句や接続副詞の後（例：「しかしながら、彼女は残ることに決めました」）、語句の列挙（最後の並列語の直前に置くオックスフォード・コンマを含む）に用いられます。\n• セミコロン（;）：接続詞を介さずに、意味的に密接に関連する2つの独立節を直接つなぎます（例：「彼女は疲れていました。そのため彼女は床に就きました」）。\n• コロン（:）：項目の列挙、詳しい説明や言い換え、または引用文を導入する際に用いられます。",
    "formation": "独立節 + コンマ（,） + 等位接続詞 + 独立節 または 独立節 + セミコロン（;） + 独立節 または 主文 + コロン（:） + 列挙項目 / 説明文",
    "examples": [
      {
        "translation": "しかしながら、結果は決定的なものではありませんでした。さらなる研究が必要です。"
      },
      {
        "translation": "その会社には3つの優先課題があります：効率性、革新性、そして持続可能性です。"
      }
    ]
  },
  "en_c2_19": {
    "title": "ダッシュ、アポストロフィ、引用符の語法",
    "shortExplanation": "文中の挿入句を強調するダッシュ、短縮形や所有格を表すアポストロフィ、直接話法を導く引用符の用法です。",
    "longExplanation": "ダッシュ、アポストロフィ、引用符の使い分けと規則：\n• ダッシュ（—）：コンマよりも強い調子で挿入句や補足説明を際立たせるために用いられます（例：「その解決策は――費用はかかったものの――効果的であることが証明された」）。\n• アポストロフィ（'）：短縮形を表す場合（例：it's や don't、they're など）や、名詞の所有格を表す場合（例：ジョンの本、生徒たちの成績）に用いられます。\n• 引用符（クォーテーションマーク）：直接話法や語句の引用に用いられます（アメリカ英語では主に二重引用符 \" \"、イギリス英語では一重引用符 ' ' が好まれます）。",
    "formation": "文構成要素 + ダッシュ（—） + 挿入語句・補足説明 + ダッシュ（—） または 短縮形 / 名詞 + アポストロフィ（'） + 所有格 または 引用符（\" \"） + 直接話法",
    "examples": [
      {
        "translation": "そのプロジェクトは――2020年に立ち上げられたものですが――すべての予想を上回りました。"
      },
      {
        "translation": "使用する前にその設定を確認することが重要です。"
      }
    ]
  },
  "en_c2_20": {
    "title": "学術的テキストにおける間接疑問文",
    "shortExplanation": "学術論文や専門的文書では、直接疑問文を避け、平叙文の語順を持つ間接疑問文（名詞節）を用います。",
    "longExplanation": "学術的な文章やフォーマルな文書では、直接的な疑問文の代わりに間接疑問文（名詞節として機能する節）を用いることで、客観的で洗練された論述を行います。\n間接疑問文は従属節であるため、通常の平叙文と同じ語順（主語 ＋ 動詞）をとり、疑問文のような倒置や助動詞の補正を行いません。\n主な導入語句には、「〜かどうか」を表す接続詞や、各種の疑問詞（何、どこ、いつ、どのように、なぜ、どれ 等）が用いられます。\n書き換えの例：「このデータは何を示しているか？」→「問題はこのデータが何を示しているかである」。",
    "formation": "主節 + 疑問詞 / 接続詞 + 主語 + 動詞（平叙文の語順）",
    "examples": [
      {
        "translation": "その仮説が正しいかどうか疑問に思います。"
      },
      {
        "translation": "本研究では、ソーシャルメディアが行動にどのような影響を与えるかを検証しています。"
      }
    ]
  }
};

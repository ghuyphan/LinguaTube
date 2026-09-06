import { GrammarTranslation } from '../../../models/grammar.model';

export const GRAMMAR_JA_JA: Record<string, GrammarTranslation> = {
  "ja_て_69": {
    "title": "～て います (～te imasu)",
    "shortExplanation": "現在進行している動作や継続している行為を表し、「〜している」「〜しているところだ」という意味を表します。",
    "longExplanation": "「～ています」は、ある動作が今まさに行われていることや、進行・継続中であることを表す文法表現です。動詞の種類（1グループ／五段動詞、2グループ／一段動詞、3グループ／不規則動詞）によって「て形」の作り方は異なりますが、いずれも「動詞 て形 ＋ います」の形で接続します。",
    "formation": "動詞 て形 + います",
    "examples": [
      {
        "translation": "今、音楽を聞いています。"
      },
      {
        "translation": "父は新聞を読んでいます。"
      },
      {
        "translation": "彼女は英語を勉強しています。"
      },
      {
        "translation": "子どもたちは公園で遊んでいます。"
      }
    ]
  },
  "ja_に_122": {
    "title": "～に あげます (〜 ni agemasu)",
    "shortExplanation": "人に対して物を与える・プレゼントする行為を表し、「〜に（物を）あげる」という意味です。",
    "longExplanation": "「～にあげます」は、話し手（または身内）が他の人に対して物を差し出したりプレゼントしたりする際に用いる表現です。その行為が相手の利益になることを表します。物を受け取る相手の後ろに助詞「に」を置き、渡す物の後ろに助詞「を」、そして動詞「あげます」を続けます。",
    "formation": "相手 + に + 物 + を + あげます",
    "examples": [
      {
        "translation": "私は友達に本をあげました。"
      },
      {
        "translation": "彼にプレゼントをあげましょう。"
      },
      {
        "translation": "先生に花をあげます。"
      },
      {
        "translation": "お母さんにチョコレートをあげたいです。"
      }
    ]
  },
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
  },
  "ja_A_0": {
    "title": "A うが B うが (A uga B uga)",
    "shortExplanation": "AであってもBであっても、どちらの場合にも関係なく後件の結果や状況が変わらないことを表し、「〜しようが〜しようが」「〜であろうと〜であろうと」という意味を表します。",
    "longExplanation": "JLPT N1文型「Aうが Bうが」は、動詞の意向形やい形容詞の推量形（〜かろうが）、「名詞／な形容詞語幹＋であろうが」に接続し、対立する二つの条件や肯定・否定の事柄（「しようがしまいが」など）を並列して、「どちらの条件であっても後件の事態や判断には全く影響がない」と強く主張する表現です。いかなる事態に直面しても結果や話し手の意志が左右されないことを表します。",
    "formation": "動詞意向形 ＋ が ＋ 動詞意向形／動詞辞書形＋まい ＋ が ｜ い形容詞語幹＋かろう ＋ が ｜ な形容詞語幹／名詞＋であろう ＋ が",
    "examples": [
      {
        "translation": "朝早かろうが夜遅かろうが、いつもバスが遅れる。"
      },
      {
        "translation": "彼に話そうが話すまいが、結果は変わらない。"
      },
      {
        "translation": "この仕事をしようがしまいが、給料は同じだ。"
      },
      {
        "translation": "あの人に話そうが話すまいが、理解してくれるとは思えない。"
      }
    ]
  },
  "ja_AけれどもB_1": {
    "title": "A。けれども、～B。(A. Keredomo,~ B.)",
    "shortExplanation": "前後の文の逆接・対比を表し、「しかし」「だが」「けれども」という意味を表します。",
    "longExplanation": "「A。けれども、～B。」は、文Aの事実や前提に対して、予想されることとは反対の内容や対立する内容を文Bで述べる逆接の接続表現です。「けれども」は文頭に置かれ、口語からやや改まった場面まで幅広く使われます。",
    "formation": "文A + 。けれども、 + 文B",
    "examples": [
      {
        "translation": "今日は晴れている。けれども、寒いです。"
      },
      {
        "translation": "彼女はうるさい。けれども、面白いです。"
      },
      {
        "translation": "その映画は長かった。けれども、退屈じゃなかった。"
      },
      {
        "translation": "彼は運動が得意だ。けれども、勉強は苦手だ。"
      }
    ]
  },
  "ja_AしかしB_2": {
    "title": "A。しかし、～B。 (A. Shikashi, ~B.)",
    "shortExplanation": "前文と対立・矛盾する内容を後文で述べる逆接の表現で、「しかし」「だが」という意味を表します。",
    "longExplanation": "「A。しかし、～B。」は、文Aの述べる内容に対して、反対の事実や予想外の展開を文Bで述べる逆接の接続詞「しかし」を用いた表現です。「でも」に比べて改まった硬い響きがあり、文章語や改まった会話でもよく用いられます。",
    "formation": "文A + 。しかし、 + 文B",
    "examples": [
      {
        "translation": "今日は忙しい。しかし、時間があるなら、コーヒーを飲もう。"
      },
      {
        "translation": "その映画は面白かった。しかし、長すぎました。"
      },
      {
        "translation": "彼は疲れていた。しかし、宿題を終わらせた。"
      },
      {
        "translation": "部屋は狭いです。しかし、便利な場所にあります。"
      }
    ]
  },
  "ja_AじゃB_3": {
    "title": "A。じゃ、～B。(A. Ja, ~B.)",
    "shortExplanation": "前述の状況を受けて判断・提案・行動を表す口語表現で、「それなら」「では」という意味を表します。",
    "longExplanation": "「A。じゃ、～B。」は、文Aで提示された状況や情報をもとに、文Bで次の行動の決定や提案、話題の転換を行う際に用いる日常会話のくだけた表現です。「では」や「それじゃ」のくだけた口語形にあたります。",
    "formation": "文A + 。じゃ、 + 文B",
    "examples": [
      {
        "translation": "映画は時間がない。じゃ、また今度行こう。"
      },
      {
        "translation": "お腹がすいた。じゃ、レストランに行こう。"
      },
      {
        "translation": "電車が遅れた。じゃ、バスで行こう。"
      },
      {
        "translation": "このシャツは高い。じゃ、別のを買おう。"
      }
    ]
  },
  "ja_AそれじゃB_4": {
    "title": "A。それじゃ、～B。(A. Soreja,~B.)",
    "shortExplanation": "前文の状況を受けて、それに応じた判断や提案を述べる接続表現で、「それなら」「それでは」という意味を表します。",
    "longExplanation": "「A。それじゃ、～B。」は、先行する文Aで述べられた状況や条件を受けて、文Bでそれに対応する判断、提案、結論を述べる接続表現です。「それでは」の日常会話における口語的な形です。",
    "formation": "文A + 。それじゃ、 + 文B",
    "examples": [
      {
        "translation": "今日は休みです。それじゃ、映画を観に行きましょう。"
      },
      {
        "translation": "電気が切れた。それじゃ、ろうそくを使いましょう。"
      },
      {
        "translation": "レストランが混んでいます。それじゃ、別の場所で食べましょう。"
      },
      {
        "translation": "明日は雨が降るらしい。それじゃ、ピクニックは中止しましょう。"
      }
    ]
  },
  "ja_AそれではB_5": {
    "title": "A。それでは、～B。(A. Soredewa,~B.)",
    "shortExplanation": "前文の状況を受けて次の行動や結論、場面の転換を導く表現で、「それでは」「それなら」という意味を表します。",
    "longExplanation": "「A。それでは、～B。」は、先行する発言や状況Aを前提として受け止め、後続の文Bで新たな行動の開始、判断、提案を導き出す接続表現です。「じゃ」「それじゃ」よりも丁寧で改まった語感があり、丁寧な会話や改まった席でも用いられます。",
    "formation": "文A + 。それでは、 + 文B",
    "examples": [
      {
        "translation": "今日は休みだ。それでは、映画を見に行こう。"
      },
      {
        "translation": "このパンはもう古いです。それでは、捨てましょう。"
      },
      {
        "translation": "雨が降ってきた。それでは、室内で遊ぼう。"
      },
      {
        "translation": "お腹が空いた。それでは、何か食べに行きましょう。"
      }
    ]
  },
  "ja_A_6": {
    "title": "A というか B というか (A to iu ka B to iu ka)",
    "shortExplanation": "どちらの言葉で表現すべきか判断に迷う気持ちを表します。「〜と言うべきか〜と言うべきか」「〜というか〜というか」。",
    "longExplanation": "「A というか B というか」は、ある物事の様子や感情などを表現する際に、Aとも言えるしBとも言えるため、どちらの言い方がより適切なのか決めかねている話し手のニュアンスを表す文型です。「〜と言うべきか〜と言うべきか」という意味になり、後続文には「とにかく」「いずれにしても」などの言葉を伴って全体の感想をまとめることが多いです。",
    "formation": "語句・節A ＋ というか ＋ 語句・節B ＋ というか（名詞・形容詞・動詞普通形などに幅広く接続）",
    "examples": [
      {
        "translation": "彼は無礼というか、直接的というか、とにかくはっきりしている。"
      },
      {
        "translation": "この映画は面白いというか、変というか、とにかく不思議な雰囲気がある。"
      },
      {
        "translation": "彼の絵は素晴らしいというか、驚くべきというか、本当に見る価値がある。"
      },
      {
        "translation": "彼女の服はかわいいというか、派手というか、とにかく人目を引く。"
      }
    ]
  },
  "ja_AでもB_7": {
    "title": "A。でも、～B。(A. Demo, ~B)",
    "shortExplanation": "前文の内容と反対・対照的な事柄を後文で述べる日常的な逆接表現で、「でも」「しかし」という意味を表します。",
    "longExplanation": "「A。でも、～B。」は、文Aの事実や前提に対して、それに反する事柄や予想外の展開を文Bで述べる逆接の表現です。「でも」は日常会話で最も頻繁に用いられるくだけた接続詞で、自然な対話に適しています。",
    "formation": "文A + 。でも、 + 文B",
    "examples": [
      {
        "translation": "昨日は寒かった。でも、今日は暖かいです。"
      },
      {
        "translation": "彼は忙しい。でも、友達と遊ぶ時間がある。"
      },
      {
        "translation": "試験に合格した。でも、まだ勉強を続けています。"
      },
      {
        "translation": "彼女は有名だ。でも、とても謙虚です。"
      }
    ]
  },
  "ja_Aと_8": {
    "title": "Aと Bと どちら～ (A to B to dochira~)",
    "shortExplanation": "2つの選択肢（AとB）を比較して、どちらが良いか・好きかを尋ねる表現で、「AとBとどちらが〜ですか」という意味を表します。",
    "longExplanation": "「Aと Bと どちら～」は、二つの物事や選択肢AとBを並列し、どちらがより優れているか、どちらを好むかなどを尋ねる丁寧な比較疑問表現です。「どちら」は二者択一を表す丁寧な疑問詞です。",
    "formation": "Aと + Bと + どちら + が/を/で + 動詞/形容詞/名詞 + か",
    "examples": [
      {
        "translation": "りんごとみかんとどちらが好きですか。"
      },
      {
        "translation": "電車とバスとどちらで行くべきですか。"
      },
      {
        "translation": "赤いワンピースと青いワンピースとどちらが似合うと思いますか。"
      },
      {
        "translation": "このカメラとあのカメラとどちらのほうが使いやすいですか。"
      }
    ]
  },
  "ja_AとBと_9": {
    "title": "AとBと どっち〜 (A to B to docchi〜)",
    "shortExplanation": "二者択一を親しい相手に尋ねる日常会話のくだけた表現で、「AとBとどっちが〜」という意味を表します。",
    "longExplanation": "「AとBと どっち〜」は、「AとBとどちら〜」のくだけた口語形（話し言葉）です。友人や家族など親しい間柄で、二つの選択肢の中からどちらを選ぶか、どちらが好みかを気軽に尋ねる際に用いられます。「AかBか どっち〜」と言われることもあります。",
    "formation": "Aと + Bと + どっち + が/を + 動詞/形容詞 (+ か/？)",
    "examples": [
      {
        "translation": "コーヒーと紅茶とどっちが好き？"
      },
      {
        "translation": "映画と音楽とどっちを楽しむ？"
      },
      {
        "translation": "赤いシャツと青いシャツとどっちを買う？"
      },
      {
        "translation": "日本語と韓国語とどっちを勉強したい？"
      }
    ]
  },
  "ja_A_10": {
    "title": "A につけ B につけ (A ni tsuke B ni tsuke)",
    "shortExplanation": "対照的な状況や心情を並べ、「Aの時もBの時もいつも同様である」という意味を表します。「〜につけても〜につけても」。",
    "longExplanation": "「～AにつけBにつけ」は、喜びと悲しみ、笑いと涙、昼と夜のように対比的な事柄や感情を表す語を並べ、「Aの時であってもBの時であっても、どちらの場合にも常に同じ状態や行動が当てはまる」と述べる表現です。情緒的で品のある言い回しとして用いられます。",
    "formation": "動詞辞書形 ＋ につけ ＋ 動詞辞書形 ＋ につけ ｜ い形容詞 ＋ につけ ＋ い形容詞 ＋ につけ ｜ 名詞 ＋ につけ ＋ 名詞 ＋ につけ",
    "examples": [
      {
        "translation": "彼には笑うにつけ泣くにつけ、とても魅力的だ。"
      },
      {
        "translation": "嬉しいにつけ悲しいにつけ、彼はいつも音楽を聴いている。"
      },
      {
        "translation": "日中につけ夜間につけ、この景色は美しい。"
      },
      {
        "translation": "喜びにつけ悲しみにつけ、彼女はいつも私を支えてくれる。"
      }
    ]
  },
  "ja_A_11": {
    "title": "A のやら B のやら (A no yara B no yara)",
    "shortExplanation": "どちらなのか分からず当惑している気持ちを表します。「〜のか〜のか（分からない）」「〜のやら〜のやら」。",
    "longExplanation": "「A のやら B のやら」は、提示された2つの可能性のうち実際にはどちらであるのか判別がつかず、話し手が困惑・疑問を抱いている様子を表す文型です。「〜のか〜のか見当がつかない」という意味になり、文末には「分からない」「はっきりしない」「見当がつかない」などの表現が続きます。",
    "formation": "動詞・い形容詞普通形 ＋ のやら ＋ 動詞・い形容詞普通形 ＋ のやら ｜ な形容詞語幹 ＋ なのやら ｜ 名詞 ＋ なのやら（または のやら）",
    "examples": [
      {
        "translation": "彼が怒っているのやら、悲しいのやら、私には分からない。"
      },
      {
        "translation": "試験の結果が良いのやら悪いのやら、気になって仕方がない。"
      },
      {
        "translation": "彼女が私を好きなのやら嫌いなのやら、わからない。"
      },
      {
        "translation": "彼が本当に行くのやら行かないのやら、はっきりしない。"
      }
    ]
  },
  "ja_A_12": {
    "title": "A より B のほうが～ (A yori B no hou ga ～)",
    "shortExplanation": "2つのものを比較し、Bの方が程度が上であることを強調する表現で、「AよりBのほうが〜だ」という意味を表します。",
    "longExplanation": "「A より B のほうが～」は、二者間で比較を行い、Aを基準（〜より）として、Bの方（〜のほうが）がよりその形容詞の表す性質や状態の度合いが勝っていることを際立たせる文法表現です。い形容詞・な形容詞のどちらにも接続します。",
    "formation": "A + より + B + のほうが + 形容詞",
    "examples": [
      {
        "translation": "ピザよりハンバーガーのほうが美味しい。"
      },
      {
        "translation": "夏より冬のほうが寒い。"
      },
      {
        "translation": "ここよりそこのほうが静かです。"
      },
      {
        "translation": "車より電車のほうが速い。"
      }
    ]
  },
  "ja_いAdjective_13": {
    "title": "い形容詞連用形（〜く）＋ 動詞 (i-keiyoushi ku + doushi)",
    "shortExplanation": "い形容詞を副詞的に用いて後続の動詞を修飾し、動作の様子や状態を表す表現です。",
    "longExplanation": "い形容詞の語尾「い」を「く」に変えた連用形を用いて、後ろに続く動詞を修飾する用法です。動作がどのような状態・様子で行われるか（様態）を説明します。",
    "formation": "い形容詞語幹 (語尾「い」を除く) + く + 動詞",
    "examples": [
      {
        "translation": "彼は速く走りました。"
      },
      {
        "translation": "この料理は美味しく食べました。"
      },
      {
        "translation": "彼女は優しく話します。"
      },
      {
        "translation": "母は忙しく仕事をしています。"
      }
    ]
  },
  "ja_いAdjective_14": {
    "title": "い形容詞連用形（〜く）＋ します (i-keiyoushi ku shimasu)",
    "shortExplanation": "人為的な働きかけによって対象をある状態に変化させることを表し、「〜くする」「〜く変える」という意味を表します。",
    "longExplanation": "い形容詞の語尾「い」を「く」に変えた連用形に動詞「します」を接続させることで、意志や人為的な働きかけによって対象の状態をその形容詞の性質に変化させる（他動的な変化）ことを表します。自然な変化を表す「〜くなります」と対比されます。",
    "formation": "目的語 + を + い形容詞語幹 (語尾「い」を除く) + くします",
    "examples": [
      {
        "translation": "部屋を明るくします。"
      },
      {
        "translation": "友達の気分を楽しくします。"
      },
      {
        "translation": "仕事が簡単になるように、やり方を早くします。"
      },
      {
        "translation": "食べ物を美味しくします。"
      }
    ]
  },
  "ja_いAdjective_15": {
    "title": "い形容詞の丁寧な否定形（～くないです / ～くありません）",
    "shortExplanation": "い形容詞の語尾「い」を取り、「～くないです」（または改まった「～くありません」）を付けて丁寧な否定を表します。「〜くない」「〜ではありません」。",
    "longExplanation": "い形容詞を丁寧な否定の形にする場合、語尾の「い」を除いて「くないです」を接続します。より改まった丁寧な表現としては「くありません」も用いられます（例：美味しい → 美味しくないです / 美味しくありません）。なお、「いい（良い）」の否定形は「よくないです / よくありません」となる点に注意が必要です。",
    "formation": "い形容詞語幹（「い」を除く） + くないです / くありません",
    "examples": [
      {
        "translation": "このピザはおいしくないです。"
      },
      {
        "translation": "この部屋は広くないです。"
      },
      {
        "translation": "彼の意見は面白くないです。"
      },
      {
        "translation": "その映画は楽しくありません。"
      }
    ]
  },
  "ja_いAdjective_16": {
    "title": "い形容詞の「て形」（～くて）",
    "shortExplanation": "い形容詞の語尾「い」を「くて」に変えて複数の形容詞や文をつなぎ、並列や理由を表します。「〜くて、〜」。",
    "longExplanation": "い形容詞を並列して複数の性質や状態を述べる場合、語尾の「い」を「くて」に活用させます。「〜くて、〜」の形で人や物の特徴を並べる（「〜で、〜」）だけでなく、「〜ので」という原因や理由を表すこともあります。「いい」は「よくて」と活用します。",
    "formation": "い形容詞語幹（「い」を除く） + くて + 形容詞 / 文",
    "examples": [
      {
        "translation": "このリンゴは甘くておいしいです。"
      },
      {
        "translation": "彼女は優しくてかわいいです。"
      },
      {
        "translation": "映画は面白くて感動的でした。"
      },
      {
        "translation": "この部屋は広くて明るいです。"
      }
    ]
  },
  "ja_なAdjective_17": {
    "title": "な形容詞 ＋ に ＋ 動詞（連用修飾・副詞化）",
    "shortExplanation": "な形容詞の語尾「な」を「に」に変えて、動詞を修飾する連用形にします。「〜に（〜する）」。",
    "longExplanation": "な形容詞（形容動詞）で動詞を修飾する際、語尾を「に」に変えて接続します。これにより動詞の動作がどのような様子・様態で行われるかを説明する副詞的な役割を果たします。例：静か（な） → 静かに話す、きれい（な） → きれいに掃除する。",
    "formation": "な形容詞語幹（「な」を除く） + に + 動詞",
    "examples": [
      {
        "translation": "彼は静かに話す。"
      },
      {
        "translation": "部屋をきれいに掃除した。"
      },
      {
        "translation": "彼女は元気に働いています。"
      },
      {
        "translation": "先生は親切に説明してくれる。"
      }
    ]
  },
  "ja_なAdjective_18": {
    "title": "な形容詞の「で形」（中止形・並列）",
    "shortExplanation": "な形容詞の語幹に「で」を付け、後続の形容詞や文と並列・接続します。「〜で、〜」。",
    "longExplanation": "な形容詞（形容動詞）の語尾「な」を「で」に変えることで、文をいったん中頓（中止）させ、別の性質や状態、動作へとつなぎます。人や物の複数の特徴を並列して挙げる場合や、「〜なので」という理由・原因を表す場合などに用いられます。",
    "formation": "な形容詞語幹（「な」を除く） + で + 形容詞 / 動詞 / 節",
    "examples": [
      {
        "translation": "彼は綺麗で優しい女性が好きです。"
      },
      {
        "translation": "この料理は健康的で、元気な気分になります。"
      },
      {
        "translation": "彼は静かで落ち着いた環境で仕事をしたい。"
      },
      {
        "translation": "この部屋は清潔で気持ちがいいです。"
      }
    ]
  },
  "ja_なAdjective_19": {
    "title": "な形容詞 ＋ に します（人為的変化・決定）",
    "shortExplanation": "主体の働きかけによってその状態にすること（「〜にする」）や、選択・決定を表します。",
    "longExplanation": "「な形容詞語幹 ＋ に ＋ します」は、主体の意志的な働きかけによって対象をある状態に変化させること（「〜にする」）を表します。また、文脈によっては、ある性質や方針を選択・決定すること（「〜に決める」）を表す場合もあります。",
    "formation": "な形容詞語幹（「な」を除く） + に + します",
    "examples": [
      {
        "translation": "静かにします。"
      },
      {
        "translation": "部屋をきれいにします。"
      },
      {
        "translation": "明日の会議は簡単にします。"
      },
      {
        "translation": "健康的な食事にします。"
      }
    ]
  },
  "ja_なAdjective_20": {
    "title": "な形容詞 ＋ に なります（自然な状態変化）",
    "shortExplanation": "状態が自然に変化して、その状態に至ることを表します。「〜になる」。",
    "longExplanation": "「な形容詞語幹 ＋ に ＋ なります」は、人や物事の性質・状態が時間の経過や環境によって自然に別の状態へ変化することを表す表現です。作為的な働きかけを表す「〜にします」に対して、「〜になります」は自然な成り行きや変化の結果を客観的に述べます。",
    "formation": "な形容詞語幹（「な」を除く） + に + なります",
    "examples": [
      {
        "translation": "この部屋は静かになります。"
      },
      {
        "translation": "彼女はきれいになります。"
      },
      {
        "translation": "彼は元気になります。"
      },
      {
        "translation": "町はにぎやかになります。"
      }
    ]
  },
  "ja_Noun_21": {
    "title": "名詞 ＋ ぐるみ (gurumi)",
    "shortExplanation": "集団や組織を表す名詞に付き、その構成員全体が一体となって関わっていることを表します。「〜全体で」「〜を挙げて」。",
    "longExplanation": "「名詞 ＋ ぐるみ」（多くは「〜ぐるみで」の形）は、家族・学校・地域・会社などの集団や組織を表す名詞に付き、その構成員全員が例外なくある行動を共にしたり、巻き込まれたりしている状態を表す表現です。「〜全体で」「〜を挙げて」という意味を表し、「家族ぐるみ」「町ぐるみ」「組織ぐるみ」などの定型的な結びつきでよく用いられます。",
    "formation": "名詞（集団・組織を表す名詞） ＋ ぐるみ（主に：名詞 ＋ ぐるみで）",
    "examples": [
      {
        "translation": "家族ぐるみで旅行に行きました。"
      },
      {
        "translation": "クラスぐるみで遠足に行きました。"
      },
      {
        "translation": "この国は国民ぐるみでその法案を支持しています。"
      },
      {
        "translation": "彼は友人ぐるみでそのクラブに参加した。"
      }
    ]
  },
  "ja_Noun_22": {
    "title": "名詞 ＋ こそあれ (koso are)",
    "shortExplanation": "前項の欠点や負担の存在を認めつつも、後項の事実や評価に支障がないことを表す硬い表現です。「〜はあるけれど」「〜はあっても」。",
    "longExplanation": "「名詞 ＋ こそあれ」（「あれ」は古語「あり」の已然形）は、やや改まった硬い文語的表現で、「確かに〜はあるにはあるが、それでも後項には影響しない／依然として価値がある」という意味を表します。前項で多少の欠点・不安・リスクなどの存在を認めた上で、後項で積極的な評価や前進を述べる文脈でよく使われます。",
    "formation": "名詞 ＋ こそあれ ｜ な形容詞語幹 ＋ でこそあれ",
    "examples": [
      {
        "translation": "問題こそあれ、プロジェクトは順調に進んでいます。"
      },
      {
        "translation": "多少のリスクこそあれ、挑戦する価値はある。"
      },
      {
        "translation": "欠点こそあれ、彼の提案は興味深い。"
      },
      {
        "translation": "不安こそあれ、今が行動するときだ。"
      }
    ]
  },
  "ja_Noun_23": {
    "title": "名詞 ＋ こそ～が (koso ~ ga)",
    "shortExplanation": "名詞の重要性や正当性を強く認めた上で、それに対照的な別の側面や制限を提示します。「〜こそ〜だが」「確かに〜であるが」。",
    "longExplanation": "「名詞 ＋ こそ～が」は、強調の取り立て助詞「こそ」を用いて「まさに名詞は確かにその通りである・極めて重要である」と前項の価値を強く認めた上で、接続助詞「が」を用いてそれとは対照的な別の事実や事情を提示する構文です。「〜こそ〜だが」「確かに〜であるのは事実だが、しかし」という意味を表します。",
    "formation": "名詞 ＋ こそ ＋ 述語（動詞／形容詞など） ＋ が",
    "examples": [
      {
        "translation": "お金こそ必要だが、それだけが人生のすべてではない。"
      },
      {
        "translation": "努力こそ大事だが、結果も見逃せない。"
      },
      {
        "translation": "健康こそ宝だが、ときには仕事を優先せざるを得ない。"
      },
      {
        "translation": "愛こそ力だが、表現するのは難しい。"
      }
    ]
  },
  "ja_Noun_24": {
    "title": "名詞 ＋ こそすれ (koso sure)",
    "shortExplanation": "前項のことはあっても、決して後項のことはあり得ないと強く否定します。「〜することはあっても決して〜ない」。",
    "longExplanation": "「名詞 ＋ こそすれ」（「すれ」は動詞「する」の已然形）は、「前項の可能性はあっても、後項のことは絶対にない」と、2つの事柄を対比させて後項を強く否定する強調表現です。「〜することはあっても決して〜ない」「〜こそすれ〜しない」という意味になり、後項には必ず否定的な表現（〜ない、〜できないなど）が呼応します。動作性名詞や動詞連用形に接続します。",
    "formation": "名詞（動作性名詞） ＋ こそすれ ＋ 否定表現 ｜ 動詞ます形語幹 ＋ こそすれ ＋ 否定表現",
    "examples": [
      {
        "translation": "感謝こそすれ、非難などできません。"
      },
      {
        "translation": "忙しさこそすれ、退屈することはありません。"
      },
      {
        "translation": "後悔こそすれ、忘れることはできない。"
      },
      {
        "translation": "疑問こそすれ、賛成はできない。"
      }
    ]
  },
  "ja_Noun_25": {
    "title": "名詞 ＋ ごとき ／ ごとく (gotoki / gotoku)",
    "shortExplanation": "文語的な比喩表現で、ある事物や様子を別のものに例えて表します。「〜のような」「〜のように」。（ごときは名詞修飾、ごとくは動詞・形容詞修飾）。",
    "longExplanation": "「〜ごとき／〜ごとく」（「如し」の連体形「ごとき」・連用形「ごとく」）は、古風で格調高い文語的な比喩表現です。「まるで〜のような」「あたかも〜のように」という意味を表し、名詞を修飾する際には連体形の「ごとき」、動詞や形容詞を修飾する際には連用形の「ごとく」を用います。日常会話の「〜ようだ／〜みたいだ」に比べて、文学的・劇的な響きを持ちます。",
    "formation": "名詞 ＋ ごとき ＋ 名詞 ｜ 名詞 ＋ ごとく ＋ 動詞／形容詞",
    "examples": [
      {
        "translation": "彼は天使のごとく純粋だ。"
      },
      {
        "translation": "悪魔のごとき行為をするな。"
      },
      {
        "translation": "彼女は雪のごとく白い肌をしている。"
      },
      {
        "translation": "彼は風のごとく去った。"
      }
    ]
  },
  "ja_Noun_26": {
    "title": "名詞 ＋ じゃあるまいし (ja aru mai shi)",
    "shortExplanation": "「〜であるわけではないのに」と相手の過剰な態度や行動をたしなめたり批判したりする口語表現です。「〜でもあるまいし」「〜ではないのだから」。",
    "longExplanation": "「名詞 ＋ じゃあるまいし」（「〜ではあるまいし」のくだけた口語形）は、「決して〜というわけではないのだから、そのような不相応な行動や過剰な心配をする必要はない」と、相手を批判したり、からかったり、たしなめたりする際に用いられる表現です。後項には「〜するな」「〜すべきだ」などの忠告や非難の言葉がよく続きます。",
    "formation": "名詞 ＋ じゃあるまいし（改まった言い方：ではあるまいし）",
    "examples": [
      {
        "translation": "彼は子供じゃあるまいし、その問題をしっかりと解決するべきだ。"
      },
      {
        "translation": "急ぐ必要はない、時間じゃあるまいし。"
      },
      {
        "translation": "監督じゃあるまいし、試合の結果について心配するな。"
      },
      {
        "translation": "飴じゃあるまいし、そのまま飲み込んでも大丈夫だよ。"
      }
    ]
  },
  "ja_Noun_27": {
    "title": "名詞 ＋ ずくめ (zukume)",
    "shortExplanation": "その事柄や物ばかりが続いて全体を満たしている状態を表します。「〜ばかり」「〜だらけ」。",
    "longExplanation": "「名詞 ＋ ずくめ」（接尾辞）は、ある期間や状況、身の回りがその事物や出来事だけで占められ、他の要素が入り込む余地がないほど徹底している様子を表します。「〜ばかり」「〜尽くし」という意味になり、良いこと（結構ずくめ・いいことずくめ）にも悪いこと（失敗ずくめ・嘘ずくめ）にも、また服装などの色（黒ずくめ）にも広く用いられます。",
    "formation": "名詞 ＋ ずくめ（名詞を修飾する場合は：〜ずくめの ＋ 名詞 ／ 文末では：〜ずくめだ）",
    "examples": [
      {
        "translation": "彼は最近、失敗ずくめだ。"
      },
      {
        "translation": "この冬は雪ずくめで大変だ。"
      },
      {
        "translation": "彼の話は嘘ずくめだった。"
      },
      {
        "translation": "今日の仕事は忙しさずくめだった。"
      }
    ]
  },
  "ja_Noun_28": {
    "title": "名詞 ＋ だけではすまない (dake dewa sumanai)",
    "shortExplanation": "その事柄や行為だけで問題を解決したり事態を収拾したりすることはできないことを表します。「〜だけでは済まされない」「〜だけでは終わらない」。",
    "longExplanation": "「名詞 ＋ だけではすまない」（動詞「済む」の否定形）は、事態の深刻さや要求される水準が高いため、提示された前項の行為や条件だけでは到底不十分で、それだけで物事を終わらせる・解決することはできないと述べる文型です。「〜だけでは解決しない」「〜だけで済まされる問題ではない」という意味を表します。",
    "formation": "名詞 ＋ だけではすまない（動詞辞書形／て形 ＋ だけではすまない とも）",
    "examples": [
      {
        "translation": "この問題は謝罪だけではすまない。"
      },
      {
        "translation": "彼女が怒っているから、お菓子をあげただけではすまないよ。"
      },
      {
        "translation": "このプロジェクトの成功は努力だけではすまない。"
      },
      {
        "translation": "資金調達だけではすまない、実際のビジネスプランも必要だ。"
      }
    ]
  },
  "ja_Nounで_29": {
    "title": "名詞 ＋ で（動作の場所・手段・道具・言語）",
    "shortExplanation": "動作や出来事が行われる場所（「〜で」）や、用いる手段・道具・言語（「〜を使って」）を表します。",
    "longExplanation": "格助詞「で」は、名詞に付いて様々な状況を限定する助詞です。主な用法として、① 動作や行為が行われる場所（「図書館で」など。静的な存在場所を表す「に」と対比）、② 移動の手段・交通機関（「バスで」）、③ 道具・材料・言語（「鉛筆で」「英語で」）など、行為を成立させるための手段や方法を表します。",
    "formation": "名詞（場所 / 手段 / 道具 / 言語） + で",
    "examples": [
      {
        "translation": "図書館で勉強します。"
      },
      {
        "translation": "バスで学校に行きます。"
      },
      {
        "translation": "鉛筆で書きました。"
      },
      {
        "translation": "英語で話しましょう。"
      }
    ]
  },
  "ja_Noun_30": {
    "title": "名詞1 ＋ たる ＋ 名詞2 (taru)",
    "shortExplanation": "高い身分や社会的地位にふさわしい義務や資格・あるべき姿を強調する格調高い表現です。「〜たる資格を持つ〜」「〜としての〜」。",
    "longExplanation": "「名詞1 ＋ たる ＋ 名詞2」（古語の断定の助動詞「たり」の連体形）は、指導者・教師・医者・親などの責任ある社会的立場・身分を表す名詞1に接続し、「その立場にある者には当然それ相応の義務・資格・誇りが求められる」と強い倫理観や使命感を述べる格調高い文語表現です。名詞2には多くの場合「者（もの）」が続き、「リーダーたる者」「教師たる者」のように用いられます。",
    "formation": "名詞1（身分・立場・職業） ＋ たる ＋ 名詞2（主に「者」）",
    "examples": [
      {
        "translation": "リーダーたる者は、常に先を見て行動すべきだ。"
      },
      {
        "translation": "教師たる者、学生に模範を示すべきである。"
      },
      {
        "translation": "母たる者、家族を愛するのは当然だ。"
      },
      {
        "translation": "医者たる者、患者の安全を最優先に考えるべきだ。"
      }
    ]
  },
  "ja_Noun_31": {
    "title": "名詞 ＋ ですら (desura)",
    "shortExplanation": "極端な例や最も基本的な事柄を取り上げて他を類推させる改まった強調表現です。「〜でさえ」「〜ですらも」。",
    "longExplanation": "「名詞 ＋ ですら」は、断定の助動詞連用形「で」に強調の副助詞「すら」が付いた形で、「〜でさえ」よりもやや硬く改まった響きを持つ文型です。極端な例やごく初歩的・当然の事柄を提示し、「そのような極端な場合でさえこうなのだから、他の場合は言うまでもない」と事態の深刻さや意外性を強く印象付ける際に用いられます。",
    "formation": "名詞 ＋ ですら",
    "examples": [
      {
        "translation": "明日試験があるのに、彼はテキストですら読まない。"
      },
      {
        "translation": "この問題は専門家ですら解けない。"
      },
      {
        "translation": "彼女は最後のスピーチですら泣いてしまった。"
      },
      {
        "translation": "彼は毎日勉強しているが、基本の漢字ですら覚えられない。"
      }
    ]
  },
  "ja_Noun_32": {
    "title": "名詞 ＋ でなくてなんだろう (〜de nakute nandarou)",
    "shortExplanation": "強い反語表現で「まさに〜にほかならない」という確信や賛美を表します。「〜でなくて何だろう」「まさに〜だ」。",
    "longExplanation": "「名詞 ＋ でなくてなんだろう」は、「これがその名詞でなければ、一体何だというのか」という強い反語の形式を用いて、話し手が「これこそまさにその名詞そのものである」と確信・賛美・強調する文型です。「愛」「真実」「奇跡」「運命」などの感情や価値観に関わる抽象名詞に付くことが多く、感嘆や情熱を込めた改まった表現や文学的・演説的な表現として用いられます。「〜でなくて何だろうか」の形でも用いられます。",
    "formation": "名詞 ＋ でなくてなんだろう（または でなくて何だろうか）",
    "examples": [
      {
        "translation": "これが真実でなくてなんだろう。"
      },
      {
        "translation": "彼がリーダーでなくてなんだろう。"
      },
      {
        "translation": "これが愛でなくてなんだろう。"
      },
      {
        "translation": "これが最高のレストランでなくてなんだろう。"
      }
    ]
  },
  "ja_Noun_33": {
    "title": "名詞 ＋ ではあるまいし (~dewa aru maishi)",
    "shortExplanation": "「〜ではないのだから」と理由や前提を否定し、非難・忠告・なだめを表します。「〜ではあるまいし」「〜じゃあるまいし」。",
    "longExplanation": "「名詞 ＋ ではあるまいし」は、「決してその名詞の立場や状況ではないのだから」と事実でない前提を打ち消し、それにふさわしくない相手の言動に対して不満・非難・忠告・あきれを表明したり、あるいは「心配することはない」となだめたりする文型です。日常会話で多用される「〜じゃあるまいし」の改まった言い方（文語的表現）であり、主に書き言葉や丁寧な場面で用いられます。",
    "formation": "名詞 ＋ ではあるまいし（話し言葉：じゃあるまいし）",
    "examples": [
      {
        "translation": "彼女はプロの歌手ではあるまいし、完璧を求めるのは酷だ。"
      },
      {
        "translation": "彼は子供ではあるまいし、そんなにチョコレートばかり食べるのはどうかと思う。"
      },
      {
        "translation": "彼は医者ではあるまいし、あなたの健康状態を詮索する必要はない。"
      },
      {
        "translation": "この指輪は高価なものではあるまいし、落としても大したことはない。"
      }
    ]
  },
  "ja_Noun_34": {
    "title": "名詞1 ＋ と ＋ 名詞2 ＋ を兼ねて (Noun to Noun o kanete)",
    "shortExplanation": "1つの人や物が2つの役割・職務・目的・機能を同時に果たすことを表します。「〜と〜を兼ねて」「〜と〜を兼ねる」。",
    "longExplanation": "「名詞1 ＋ と ＋ 名詞2 ＋ を兼ねて」（述語としては「〜を兼ねる／〜を兼ねている」）は、動詞「兼ねる」に由来し、1人の人物が2つの役職や役割を同時に担当したり、1つの物や場所が2つの目的や機能を併せ持ったりすることを表す文型です。「〜と〜の両方の役割を持って」「〜と〜を兼務して」という意味で、役職の兼務、多目的な部屋や設備の用途説明、2つの目的を同時に果たす行為などに用いられます。",
    "formation": "名詞1 ＋ と ＋ 名詞2 ＋ を兼ねて（または を兼ねる ｜ を兼ねている）",
    "examples": [
      {
        "translation": "お父さんは社長と経理部長を兼ねています。"
      },
      {
        "translation": "彼女は音楽教師とピアニストを兼ねています。"
      },
      {
        "translation": "この部屋は寝室と書斎を兼ねています。"
      },
      {
        "translation": "彼は父と母を兼ねて子どもの世話をしている。"
      }
    ]
  },
  "ja_Noun_35": {
    "title": "名詞1 ＋ といい ＋ 名詞2 ＋ といい (〜to ii〜to ii)",
    "shortExplanation": "代表的な2つの例を挙げて、全体に対する評価や感想を述べます。「〜といい〜といい」「〜を見ても〜を見ても」。",
    "longExplanation": "「名詞1 ＋ といい ＋ 名詞2 ＋ といい」は、同じテーマや全体の中から代表的な例を2つ取り上げ、「AにしてもBにしても、どれをとっても同様に〜である」と全体に対する総合的な評価・感想を強調する文型です。後続節には話し手の主観的な判断・評価が続き、称賛や賛美（「素晴らしい」「完璧だ」など）にも、不満やあきれ、批判の気持ちを表す場合にも用いられます。",
    "formation": "名詞1 ＋ といい ＋ 名詞2 ＋ といい ＋ ［評価・感想］",
    "examples": [
      {
        "translation": "日本の食べ物といい観光地といい、すべてが素晴らしいです。"
      },
      {
        "translation": "彼の優しさといい、体力といい、彼は理想的なパートナーだ。"
      },
      {
        "translation": "この町の映画館といい、公園といい、老若男女が楽しめる。"
      },
      {
        "translation": "彼の歌唱力といい、ダンスのスキルといい、完璧だ。"
      }
    ]
  },
  "ja_Noun_36": {
    "title": "名詞1 ＋ という ＋ 名詞2 (~to iu~)",
    "shortExplanation": "名詞1という名称や内容によって名詞2を特定・定義します。「〜という〜」「〜と呼ばれる〜」。",
    "longExplanation": "「名詞1 ＋ という ＋ 名詞2」は、人名・地名・作品名などの名称（名詞1）を挙げて、それがどのような部類や概念の事物（名詞2）であるかを特定・定義・説明する文型です。「〜という名前の〜」「〜と呼ばれる〜」という意味を表し、相手がまだ知らない可能性がある事物を紹介したり、改めて対象を明示したりする際に日常会話から文章語まで幅広く用いられます。",
    "formation": "名詞1（名称・固有名詞） ＋ という ＋ 名詞2（種類・一般名詞）",
    "examples": [
      {
        "translation": "宮崎駿という人は有名なアニメーション監督です。"
      },
      {
        "translation": "その恋人という女性は彼にとても厳しいです。"
      },
      {
        "translation": "東京という都市は夜も賑やかです。"
      },
      {
        "translation": "私は「ハリーポッター」という本が好きです。"
      }
    ]
  },
  "ja_Noun_37": {
    "title": "名詞 ＋ というところだ (Noun to iu tokoro da)",
    "shortExplanation": "数量・割合・程度などの大体の見当や評価を示します。「およそ〜といったところだ」「せいぜい〜という段階だ」。",
    "longExplanation": "「名詞 ＋ というところだ」（推量形「〜というところだろう」や丁寧形「〜というところです」も多用される）は、数量・割合・進行度・到達水準などについて、話し手がおおよその見当や評価を下す文型です。「だいたい〜くらいだ」「多くても〜といったレベルだ」という意味を表し、割合（〜割、〜％）や数量詞、段階を表す名詞に付いて用いられます。",
    "formation": "名詞（数量・割合・程度） ＋ というところだ（または というところだろう ｜ というところです）",
    "examples": [
      {
        "translation": "今回の試験の合格者は半数というところだろう。"
      },
      {
        "translation": "彼の力は80％というところだ。"
      },
      {
        "translation": "このプランに賛成の人は7割というところだ。"
      },
      {
        "translation": "課長の意見には、私としては90％というところでしょう。"
      }
    ]
  },
  "ja_Noun_38": {
    "title": "名詞 ＋ というもの (~ to iu mono)",
    "shortExplanation": "その名詞が持つ本質的な性質や普遍的な傾向・通則を提示します。「〜というものは」「〜とは」。",
    "longExplanation": "「名詞 ＋ というもの」（通常は主題提示の「〜というものは」の形で用いられる）は、その事物の本質的な性質、通則、普遍的な特徴を取り上げ、「そもそも〜とはそういう性質のものだ」と一般化して語る文型です。「〜というものは」と提示することで、単なる個別的事象ではなく、そのカテゴリー全体に共通する真理・常識・人生訓などを述べる際に用いられます。",
    "formation": "名詞 ＋ というもの（通常は：名詞 ＋ というものは）",
    "examples": [
      {
        "translation": "子供というものは、毎日たくさん遊びます。"
      },
      {
        "translation": "大学生というものは研究に時間をたくさんかけます。"
      },
      {
        "translation": "日本文化というものは伝統的なものと新しいものが混ざっています。"
      },
      {
        "translation": "別れというものはいつも悲しいものです。"
      }
    ]
  },
  "ja_Noun_39": {
    "title": "名詞 ＋ といったところだ (Noun to itta tokoro da)",
    "shortExplanation": "数量や水準の上限・限度を示し、「最高でもその程度だ」というニュアンスを表します。「せいぜい〜くらいだ」「多くても〜といったところだ」。",
    "longExplanation": "「名詞 ＋ といったところだ」は、数量や能力、進行の度合いなどについて、「最高に見積もってもだいたいこの程度にとどまる」「それ以上にはならない」と限度や上限を評価して述べる文型です。「せいぜい〜だ」「多くても〜くらいだ」という控えめなニュアンスを含み、「せいぜい」「多くても」などの副詞とともに用いられることが多くあります。",
    "formation": "名詞（数量・程度・段階） ＋ といったところだ（または といったところです）",
    "examples": [
      {
        "translation": "彼の英語レベルは初級といったところだ。"
      },
      {
        "translation": "私の日本語の語彙は1000語といったところだ。"
      },
      {
        "translation": "彼が毎日ランニングできるのは5キロといったところだ。"
      },
      {
        "translation": "その会社の従業員は20人といったところだ。"
      }
    ]
  },
  "ja_Noun_40": {
    "title": "名詞1 ＋ といわず ＋ 名詞2 ＋ といわず (A to iwazu B to iwazu)",
    "shortExplanation": "区別なく全体すべてにその事態が当てはまることを表します。「〜といい〜といい区別なく」「〜も〜もすべて」。",
    "longExplanation": "「名詞1 ＋ といわず ＋ 名詞2 ＋ といわず」は、「Aと言わずBと言わず、その区別なく両方ともすべて」という意味で、ある状態や行為が例外なく全体に及んでいることを強調する文型です。季節（夏／冬）、時間（昼／夜）、老若男女、身体の部位（手／足）など、対比的な2つの名詞を並べて「どれもこれもすべて同様だ」と包括的に述べる際に用いられます。",
    "formation": "名詞1 ＋ といわず ＋ 名詞2 ＋ といわず ＋ ［全体に行き渡る叙述］",
    "examples": [
      {
        "translation": "冬といわず夏といわず、彼はいつもアイスクリームを食べます。"
      },
      {
        "translation": "老いといわず若きといわず、全ての人がそのイベントを楽しめます。"
      },
      {
        "translation": "男といわず女といわず、誰もがこの映画を楽しむでしょう。"
      },
      {
        "translation": "月といわず火といわず、あの店は毎日混んでいます。"
      }
    ]
  },
  "ja_Noun_41": {
    "title": "名詞 ＋ ときたら (〜tokitara)",
    "shortExplanation": "話題を取り上げて強い感情（主に不満・非難・あきれ、時には強い賞賛）を述べます。「〜ときたら」「〜について言えば」。",
    "longExplanation": "「名詞 ＋ ときたら」は、身近な人物や事柄を話題として提示し、それに対して話し手が抱く強い感情を吐露する文型です。多くは不満・非難・あきれ・困惑といった批判的な気持ちを表す場面で用いられますが（「最近の若い者ときたら」「あいつの態度ときたら」など）、まれに並外れた美味しさや素晴らしさに感嘆・賛美する文脈でも用いられます。口語的なニュアンスを伴います。",
    "formation": "名詞 ＋ ときたら ＋ ［感情を込めた評価・描写］",
    "examples": [
      {
        "translation": "寿司ときたら、彼は何も食べられない。"
      },
      {
        "translation": "数学の問題ときたら、彼女はいつも困っている。"
      },
      {
        "translation": "あの店のハンバーガーときたら、本当に美味しい。"
      },
      {
        "translation": "彼のいつもの態度ときたら、本当に困ったものだ。"
      }
    ]
  },
  "ja_Noun_42": {
    "title": "名詞 ＋ とは比べものにならない (~to wa kurabemono ni naranai)",
    "shortExplanation": "2つの事物に圧倒的な差があり、比較の対象にすらならないことを表します。「〜とは比較にならない」「〜とは比べようがない」。",
    "longExplanation": "「名詞 ＋ とは比べものにならない」（修飾表現として「〜とは比べものにならないほど」も頻出）は、能力、規模、性能、被害などの差が極めて大きく、一方が他方を圧倒しており、到底並べて比べることすらできない状態を強調する文型です。「〜とは比較にならない」「〜の比ではない」という意味を表し、隔絶した優劣やスケールの違いを述べる際に用いられます。",
    "formation": "名詞 ＋ とは比べものにならない（連用修飾形：とは比べものにならないほど）",
    "examples": [
      {
        "translation": "新しい車の速さは古い車とは比べものにならない。"
      },
      {
        "translation": "彼の英語のうまさは私とは比べものにならない。"
      },
      {
        "translation": "日本の技術は他の国とは比べものにならない。"
      },
      {
        "translation": "今回の地震の被害は前回とは比べものにならない。"
      }
    ]
  },
  "ja_Verb_43": {
    "title": "～てしまう (～te shimau)",
    "shortExplanation": "動作の完全な完了を表すか、意図しない事態が生じて後悔や残念な気持ちを表し、「すっかり〜してしまう」または「〜してしまった（後悔）」という意味を表します。",
    "longExplanation": "「～てしまう」は、動詞のて形に補助動詞「しまう」が接続した文法形式です。主に2つの用法があります。①後悔・遺憾：予期しないことや不都合な事態が起こってしまい、残念に思ったり後悔したりする気持ちを表します（「忘れてしまった」「言ってしまった」など）。②完了：動作が完全に最後まで終わること、すっかりその状態になることを表します（「全部食べてしまった」など）。日常会話では「～ちゃう／～じゃう」（例：食べちゃう、読んじゃう）というくだけた口語形がよく用いられます。",
    "formation": "動詞て形 ＋ しまう（丁寧体：～てしまいました；口語短縮形：～ちゃう／～じゃう）",
    "examples": [
      {
        "translation": "ケーキを全部食べてしまった。"
      },
      {
        "translation": "宿題を忘れてしまいました。"
      },
      {
        "translation": "彼に秘密を言ってしまった。"
      },
      {
        "translation": "値札を見ずに高い服を買ってしまった。"
      }
    ]
  },
  "ja_Verb_44": {
    "title": "～てほしい (～te hoshii)",
    "shortExplanation": "話し手が他者に対してある行為をしてくれることを望む気持ちを表し、「〜してほしい」「〜してほしいと思う」という意味を表します。",
    "longExplanation": "「～てほしい」は、動詞のて形に希望を表す形容詞「ほしい」が接続した文法表現です。話し手自身が何かをしたいときに用いる「～たい」とは異なり、相手や第三者（聞き手または第三者）にある動作をしてほしいと望む際に用います。動作を行う対象は通常、格助詞「に」で表されますが、くだけた会話では省略されることもあります。否定表現には「～ないでほしい」（〜しないでほしい・より一般的）と「～てほしくない」（〜してほしくない）の2通りがあります。主観的な要求や願望を直接的に伝える表現であるため、目上の人や取引先に対して直接使うのは不作法とされ、改まった場面では「～ていただきたい」「～ていただけますか」などの謙譲・丁寧表現を用います。",
    "formation": "動詞て形 ＋ ほしい／否定形：動詞ない形 ＋ でほしい（または動詞て形 ＋ ほしくない）",
    "examples": [
      {
        "translation": "子供にもっと勉強してほしい。"
      },
      {
        "translation": "彼にもっと早く来てほしい。"
      },
      {
        "translation": "友達にその本を読んでほしい。"
      },
      {
        "translation": "先生に質問に答えてほしい。"
      }
    ]
  },
  "ja_Verb_45": {
    "title": "～てみる (～te miru)",
    "shortExplanation": "試しにある行為を行って、その結果や様子を確かめることを表し、「試しに〜する」「〜してみる」という意味を表します。",
    "longExplanation": "「～てみる」は、動詞のて形に補助動詞「みる」（動詞「見る」に由来しますが、通常は平仮名で表記）が接続した文法表現です。どのような結果になるか、どのような感触が得られるかを確かめるために、試しにある動作を行ってみる（試行・挑戦）というニュアンスを表します。補助動詞「みる」は通常の動詞と同様に活用し、丁寧な依頼「～てみてください」、希望「～てみたい」、意志・勧誘「～てみよう」など、文脈に応じて多様な文末表現に接続します。",
    "formation": "動詞て形 ＋ みる",
    "examples": [
      {
        "translation": "この料理を作ってみます。"
      },
      {
        "translation": "その服を着てみてください。"
      },
      {
        "translation": "新しいレストランに行ってみよう。"
      },
      {
        "translation": "映画を見てみたいです。"
      }
    ]
  },
  "ja_Verb_46": {
    "title": "～てもらいたい (～te moraitai)",
    "shortExplanation": "他者から自分（または身内）のためにある恩恵的な行為を施してもらうことを望む気持ちを表し、「〜してもらいたい」「〜してほしい」という意味を表します。",
    "longExplanation": "「～てもらいたい」は、動詞のて形に授受の補助動詞「もらう」の希望形「もらいたい」が接続した文法表現です。他者が自分のために行ってくれる行為や助力を恩恵として受け取りたいという願望を表します。動作の主体（恩恵の提供者）は助詞「に」で表されます。他者の動作そのものを望む「～てほしい」とほぼ同義ですが、「～てもらいたい」は話し手が受益者として行為を授かるというニュアンスがやや強く表れます。同僚や友人、目下に対して用いられるのが一般的で、目上の人や取引先に対しては謙譲表現である「～ていただきたい」を用います。",
    "formation": "動詞て形 ＋ もらいたい（丁寧体：～てもらいたいです／～てもらいたいんですが）",
    "examples": [
      {
        "translation": "この荷物を運んでもらいたいです。"
      },
      {
        "translation": "彼にそのニュースを教えてもらいたい。"
      },
      {
        "translation": "友達に日本語を教えてもらいたい。"
      },
      {
        "translation": "スタッフにチェックインの方法を説明してもらいたい。"
      }
    ]
  },
  "ja_Verb_47": {
    "title": "～てもらう (～te morau)",
    "shortExplanation": "他者に頼んだり依頼したりして、自分（または身内）のためにある有益な行為をしてもらうことを表し、「〜してもらう」という意味を表します。",
    "longExplanation": "「～てもらう」は、動詞のて形に授受の補助動詞「もらう」が接続した文法表現です。主語（多くは話し手または身内の者）が、他者からある行為や援助を恩恵として受けることを表します。恩恵を受ける人が文の主語（「は」や「が」）になり、実際の動作を行う相手は格助詞「に」で示されます。丁寧体は「～てもらいます／～てもらいました」となります。対等な関係の友人や同僚、または目下に対して用いられます。動作主が目上の人や顧客である場合は、謙譲語の「～ていただく」を用います。",
    "formation": "動詞て形 ＋ もらう（丁寧体：～てもらいます／～てもらいました）",
    "examples": [
      {
        "translation": "友達に宿題を手伝ってもらった。"
      },
      {
        "translation": "母に部屋を掃除してもらいました。"
      },
      {
        "translation": "彼に荷物を持ってもらいたい。"
      },
      {
        "translation": "先生に質問に答えてもらえますか？"
      }
    ]
  },
  "ja_Verb_48": {
    "title": "～てもらえませんか (～te moraemasen ka)",
    "shortExplanation": "相手に対して何かをしてくれるよう丁寧に依頼・お願いする表現で、「〜してもらえませんか」「〜していただけますか」という意味を表します。",
    "longExplanation": "「～てもらえませんか」は、動詞のて形に授受の補助動詞「もらう」の可能動詞「もらえる」の否定丁寧疑問形「もらえませんか」が接続した依頼表現です。文字通りには「〜してもらうことができませんか」と相手の可能・意志を否定疑問の形で尋ねることで、相手に断る余地を残し、押しつけがましさを排除した非常に柔らかく丁寧な依頼となります。「～てください」や「～てくれませんか」よりも丁寧で、同僚や知人、近所の人などに対して日常的によく用いられます。なお、上司や目上の人、顧客に対してさらに敬意を払う場合は、謙譲語の「～ていただけませんか」「～ていただけないでしょうか」を用います。",
    "formation": "動詞て形 ＋ もらえませんか",
    "examples": [
      {
        "translation": "この手紙を見てもらえませんか。"
      },
      {
        "translation": "荷物を持ってもらえませんか。"
      },
      {
        "translation": "部屋を掃除してもらえませんか。"
      },
      {
        "translation": "明日のミーティングに参加してもらえませんか。"
      }
    ]
  },
  "ja_Verb_49": {
    "title": "～ないことがある (～nai koto ga aru)",
    "shortExplanation": "普段は通常行われる動作や発生する事態について、時々そうならない場合もあることを表し、「〜しないことがある」「〜しない場合もある」という意味を表します。",
    "longExplanation": "「～ないことがある」は、動詞の否定形（ない形）に形式名詞「こと」、格助詞「が」、存在動詞「ある」が接続した文法表現です。普段の習慣や一般的な決まり事として行われていることに対し、例外的にそうしない時があることや、ある事態が発生しない場合が存在することを表します。「ときどき」「たまに」などの頻度を表す副詞とともに用いられることが多くあります。過去の経験の有無を表す「～たことがない（一度も〜したことがない）」とは意味・用法が異なりますので区別が必要です。",
    "formation": "動詞ない形 ＋ ことがある（丁寧体：～ないことがあります）",
    "examples": [
      {
        "translation": "彼は会議に出席しないことがある。"
      },
      {
        "translation": "この電車は定刻に来ないことがある。"
      },
      {
        "translation": "私は朝食を食べないことがある。"
      },
      {
        "translation": "彼女は電話に出ないことがある。"
      }
    ]
  },
  "ja_Noun_50": {
    "title": "名詞 ＋ ならいざ知らず (nara iza shirazu)",
    "shortExplanation": "「〜ならともかく／〜ならまだしも、…は無理だ」と、一方を例外・許容としつつ他方を強く否定します。「〜ならいざ知らず」。",
    "longExplanation": "「名詞 ＋ ならいざ知らず」は、「前者の場合ならまだ理解できるし仕方ないかもしれないが、後者の場合は到底あり得ない・認められない」と2つの事柄を対比させて後者を強く否定・非難・驚愕する文型です。「いざ知らず」は古風な表現で「どうだか知らないが」を意味し、現代語の「〜ならまだしも」「〜ならともかく」に相当します。後続節には「全然わからない」「走れません」など、不可能や呆れ、批判を表す文が続きます。",
    "formation": "名詞1 ＋ ならいざ知らず ＋ 名詞2／後続節［否定・困難・評価］",
    "examples": [
      {
        "translation": "数学ならいざ知らず、物理なんて全然わからない。"
      },
      {
        "translation": "5キロならいざ知らず、10キロなんて走れません。"
      },
      {
        "translation": "日本語ならいざ知らず、中国語なんて話せない。"
      },
      {
        "translation": "冷たい水ならいざ知らず、熱い水で泳ぐなんて考えたこともない。"
      }
    ]
  },
  "ja_Verb_51": {
    "title": "～ないことになる (～nai koto ni naru)",
    "shortExplanation": "客観的な状況、外部の決定、社会的な決まりなどにより、ある事態が起こらないことに決まることや、結果としてそうならないことを表し、「〜しないことになる」という意味を表します。",
    "longExplanation": "「～ないことになる」は、動詞の否定形（ない形）に形式名詞「こと」、格助詞「に」、変化を表す動詞「なる」が接続した文法表現です。話し手個人の主観的な意志ではなく、周囲の状況の変化、組織や他者の決定、または論理的な帰結として「その行為を行わない」「その事態が発生しない」という結果に至ることを表します。客観的に決定した事実を報告する際は「～ないことになった」、規則や予定として定まっている場合は「～ないことになっている」を用います。個人の意志決定を表す「～ないことにする」と対比されます。",
    "formation": "動詞ない形 ＋ ことになる（決定の事実：～ないことになった／～ないことになりました、規則・予定：～ないことになっている）",
    "examples": [
      {
        "translation": "今日彼が来ないことになると、私たちの予定はキャンセルされます。"
      },
      {
        "translation": "このプロジェクトが進まないことになると、収益が減るでしょう。"
      },
      {
        "translation": "彼女は試験に合格しないことになると、卒業が遅れます。"
      },
      {
        "translation": "雨が降ると、ピクニックが行われないことになるでしょう。"
      }
    ]
  },
  "ja_Verb_52": {
    "title": "～ないほうがいい (～nai hou ga ii)",
    "shortExplanation": "相手に対してある動作を行わないことを勧める助言や忠告を表し、「〜しないほうがよい」「〜しないほうがいい」という意味を表します。",
    "longExplanation": "「～ないほうがいい」は、動詞の否定形（ない形）に形式名詞「ほう」、形容詞「いい」が接続した忠告・助言の文法表現です。ある行為を行うと好ましくない結果を招く恐れがあるため、それをしない選択肢をとることが望ましいと相手にアドバイスする際に用います。丁寧体は「～ないほうがいいです」となります。肯定の行為を勧める「～たほうがいい（動詞た形 ＋ ほうがいい）」と対比されます（肯定では「た形」を用いますが、否定では「ない形」を用いる点に文法上の注意が必要です）。",
    "formation": "動詞ない形 ＋ ほうがいい（丁寧体：～ないほうがいいです）",
    "examples": [
      {
        "translation": "この薬は飲まないほうがいいです。"
      },
      {
        "translation": "急いでいるときは、走らないほうがいい。"
      },
      {
        "translation": "彼に秘密を知られたくなければ、話さないほうがいい。"
      },
      {
        "translation": "雨の日には、外出しないほうがいい。"
      }
    ]
  },
  "ja_Verb_53": {
    "title": "～ながら (～nagara)",
    "shortExplanation": "同一の主体が二つの動作を同時に並行して行うことを表し、「〜しながら」という意味を表します。",
    "longExplanation": "接続助詞「～ながら」は、動詞の連用形（ます形語幹）に接続し、同一の動作主が二つの行為を同時に並行して行うこと（同時進行・並行動作）を表します。この文法形式には以下の重要な特徴があります。①前後の動作主は必ず同一人物でなければなりません。②文の主眼（重点）は後ろの主動詞に置かれ、「ながら」の前の動作は付随的・副次的な動作となります。文全体の時制は文末の動詞によって決まります。なお、「ながら」には逆接・譲歩（〜でありながら・〜にもかかわらず）を表す用法もありますが、初中級では主に同時動作の用法として頻繁に用いられます。",
    "formation": "動詞連用形（ます形語幹）＋ ながら",
    "examples": [
      {
        "translation": "テレビを見ながら宿題をしました。"
      },
      {
        "translation": "音楽を聞きながら料理をしました。"
      },
      {
        "translation": "歩きながらスマホを見るのは危険です。"
      },
      {
        "translation": "彼は話しながら笑っていました。"
      }
    ]
  },
  "ja_Verb_54": {
    "title": "～なさい (～nasai)",
    "shortExplanation": "親や教師など目上の者が目下の者に対して指示や命令を与える際に用いられ、「〜しなさい」という意味を表します。",
    "longExplanation": "「～なさい」は、動詞の連用形（ます形語幹）に接続する穏やかな命令表現です。もともと敬語動詞「なさる」の命令形に由来するため、言葉遣いとしては丁寧で上品な響きを持ちますが、立場が上の者から下の者へ向けた強制力を伴う命令・指示となります。主に親が子供に対して言い聞かせるとき、教師が生徒に指示を出すとき、あるいはテスト・試験問題の指示文（「答えを書きなさい」など）に用いられます。親しい間柄ではさらに省略されて「～な」（例：「早く食べな」）となることもあります。同等または目上の相手に対して用いることはできません。",
    "formation": "動詞連用形（ます形語幹）＋ なさい",
    "examples": [
      {
        "translation": "部屋を掃除しなさい。"
      },
      {
        "translation": "勉強しなさい。"
      },
      {
        "translation": "早く起きなさい。"
      },
      {
        "translation": "宿題をやりなさい。"
      }
    ]
  },
  "ja_Verb_55": {
    "title": "～にくい (～nikui)",
    "shortExplanation": "動詞の連用形に接続して、その動作を行うことが困難であることや、その事態が起こりにくいことを表し、「〜しにくい」「〜するのが難しい」という意味を表します。",
    "longExplanation": "「～にくい」は、動詞の連用形（ます形語幹）に接続して複合形容詞（い形容詞）をつくる接尾辞です。ある行為を実行するのに手間や困難が伴うこと、または対象の性質上その事態が生じにくいことを客観的に表します。接続後は通常のい形容詞と同様に活用します（否定形「～にくくない」、過去形「～にくかった」など）。話し手の肉体的・精神的な苦痛や抵抗感に焦点を当てる「～づらい」に比べ、「～にくい」は対象の客観的な性質や物理的なやりにくさを表す点でより広く一般的に用いられます。対義語は「～やすい」です。",
    "formation": "動詞連用形（ます形語幹）＋ にくい",
    "examples": [
      {
        "translation": "この字は読みにくいです。"
      },
      {
        "translation": "このドアは開けにくい。"
      },
      {
        "translation": "彼の字は読みにくい。"
      },
      {
        "translation": "この料理は作りにくい。"
      }
    ]
  },
  "ja_Verb_56": {
    "title": "～やすい (～yasui)",
    "shortExplanation": "動詞の連用形に接続して、その動作を行うことが容易であることや、ある事態が生じやすい傾向を表し、「〜しやすい」「〜するのが簡単だ」という意味を表します。",
    "longExplanation": "「～やすい」は、動詞の連用形（ます形語幹）に接続して複合形容詞（い形容詞）をつくる接尾辞です。主に以下の二つの意味を表します。①対象の扱いやすさや性質により、その動作を容易・快適に行えること（例：読みやすい、着やすい）。②ある好ましくない状態や変化を起こしやすい傾向・性質があること（例：風邪をひきやすい、壊れやすい）。接続後は通常のい形容詞と同様に活用します（否定形「～やすくない」、過去形「～やすかった」など）。実行の困難さを表す「～にくい」の対義表現です。",
    "formation": "動詞連用形（ます形語幹）＋ やすい",
    "examples": [
      {
        "translation": "この本は読みやすいです。"
      },
      {
        "translation": "このシャツは着やすい。"
      },
      {
        "translation": "彼は話しやすい人です。"
      },
      {
        "translation": "この料理は作りやすい。"
      }
    ]
  },
  "ja_Verb_57": {
    "title": "～ようと思う (～you to omou)",
    "shortExplanation": "話し手が将来ある行為を行おうとする意志や計画、考えを表し、「〜しようと思う」「〜するつもりだ」という意味を表します。",
    "longExplanation": "「～ようと思う」は、動詞の意向形（意志形）に引用の格助詞「と」、動詞「思う」が接続した意志表現です。これからある行動を実行しようと考えている話し手の意図や計画を表します。時制によって以下の使い分けがあります。①「～ようと思う」は発話の場で生じた即座の意志や思いつきを表す傾向があります。②「～ようと思っている」は、以前から考え続けている継続的な意図・計画を表します。確定的な意志を宣言する「～つもりだ」に比べて響きが柔らかく控えめであり、公に決定した日程を述べる「～予定だ」とも区別されます。",
    "formation": "動詞意向形（意志形）＋ と思う（継続的な意図：～ようと思っている／丁寧体：～ようと思います）",
    "examples": [
      {
        "translation": "明日、映画を見ようと思います。"
      },
      {
        "translation": "週末に友達と遊ぼうと思っています。"
      },
      {
        "translation": "勉強をもっと頑張ろうと思う。"
      },
      {
        "translation": "来年は海外旅行に行こうと思っている。"
      }
    ]
  },
  "ja_Verb_58": {
    "title": "～ように (～you ni)",
    "shortExplanation": "ある状態や事態が実現することを目標とする目的（「〜するように」「〜できるように」）や、様子を何かに例える比喩（「〜のように」）を表します。",
    "longExplanation": "「～ように」は多様な意味・機能を持つ文法表現で、主に以下の二大用法で広く用いられます。①目的を表す用法（〜するように・〜なるように）：前節には無意志動詞（可能動詞や「見える」「分かる」などの状態動詞）または動詞の否定形（ない形）が接続し、その望ましい状態が実現するように、あるいは望ましくない事態を回避するように後節の行為を行うことを表します（意志動詞に接続する「～ために」と対比されます）。②比喩・例示を表す用法（〜のように）：名詞（名詞 ＋ のように）や動詞の普通形に接続し、動作や状態が別の事物に酷似している様子を鮮やかに描写します。このほか、文末で願望・祈願（「合格しますように」）や間接的な指示・依頼を表す用法もあります。",
    "formation": "目的用法：動詞辞書形／ない形 ＋ ように｜比喩用法：名詞 ＋ のように／動詞普通形 ＋ ように",
    "examples": [
      {
        "translation": "彼女は鳥のように軽やかに踊る。"
      },
      {
        "translation": "覚えたことを忘れないように、毎日復習しましょう。"
      },
      {
        "translation": "歌手になるように、毎日歌の練習をしています。"
      },
      {
        "translation": "道を渡る時、車が来ないように確認してください。"
      }
    ]
  },
  "ja_Verb_59": {
    "title": "～ようにする (～you ni suru)",
    "shortExplanation": "ある状態や習慣の実現に向けて意識的に努力したり心掛けたりすることを表し、「〜するように心掛ける」「努めて〜する」という意味を表します。",
    "longExplanation": "「～ようにする」は、目標とする行動や状態を実現させるために、意志を持って努力したり配慮・工夫したりすることを表す文型です。「〜ようにしている」の形にすると日頃から意識して続けている習慣や心掛けを表し、「〜ようにしてください」の形にすると相手に対してある行動を取るよう促したり注意・指示したりする丁寧な依頼・忠告の表現になります。",
    "formation": "動詞辞書形 / ない形 ＋ ようにする",
    "examples": [
      {
        "translation": "毎日運動するようにしています。"
      },
      {
        "translation": "早く寝るようにしてください。"
      },
      {
        "translation": "約束を守るようにします。"
      },
      {
        "translation": "彼に会わないようにする。"
      }
    ]
  },
  "ja_Verb_60": {
    "title": "～ようになる (～you ni naru)",
    "shortExplanation": "能力や状況、習慣などが以前とは異なる状態へと変化したことを表し、「〜できるようになる」「〜するようになる」という意味を表します。",
    "longExplanation": "「～ようになる」は、時間の経過や練習、環境の変化などに伴い、それまでは不可能だったことができるようになったり、以前には見られなかった新しい習慣や心理状態へと移行したりしたことを表す表現です。可能動詞に接続して能力の獲得を表す用法が代表的ですが、無意志動詞や一般動詞の辞書形・ない形に接続して習慣・状況の客観的な変化を表すこともできます。",
    "formation": "動詞可能形 / 動詞辞書形 / 動詞ない形 ＋ ようになる",
    "examples": [
      {
        "translation": "日本語が話せるようになりました。"
      },
      {
        "translation": "最近、早く寝るようになった。"
      },
      {
        "translation": "彼はピアノを弾けるようになりました。"
      },
      {
        "translation": "この仕事を始めてから、毎日忙しいと感じるようになりました。"
      }
    ]
  },
  "ja_あまりありません_61": {
    "title": "あまり～ありません (amari ~ arimasen)",
    "shortExplanation": "丁寧な否定表現と呼応して程度が高くないことを表し、「あまり〜ない」「それほど〜ではない」という意味です。",
    "longExplanation": "副詞「あまり」は、丁寧な否定の述語（～ません／～ありません／～じゃありません）と呼応して、物事の程度や頻度が著しくないこと（部分否定）を表します。直接的な強い否定を避け、表現を柔らかく控えめにする働きがあります。動詞の否定形、い形容詞の連用形（〜く）＋ありません、な形容詞や名詞＋じゃありません（ではありません）に接続します。",
    "formation": "あまり + 動詞丁寧否定形（～ません／～ていません） / あまり + い形容詞語幹＋くありません / あまり + な形容詞語幹・名詞 ＋ じゃありません（ではありません）",
    "examples": [
      {
        "translation": "彼はあまり疲れていません。"
      },
      {
        "translation": "彼女はあまり早くないですよ。"
      },
      {
        "translation": "私はあまり勉強しないです。"
      },
      {
        "translation": "あまりお金がありません。"
      }
    ]
  },
  "ja_あまりないです_62": {
    "title": "あまり～ないです (amari ~ nai desu)",
    "shortExplanation": "口語で柔らかく部分否定を表す丁寧表現で、「あまり〜ない」「それほど〜ではない」という意味です。",
    "longExplanation": "「あまり～ないです」は、副詞「あまり」に動詞や形容詞のない形（普通形否定）＋「です」を組み合わせた文型です。日常会話において広く用いられ、「～ません」よりも親しみやすく、断定を避けた穏やかな否定のトーンを表現できます。",
    "formation": "あまり + 動詞ない形 + です / あまり + い形容詞語幹＋くないです / あまり + な形容詞語幹・名詞 ＋ じゃないです",
    "examples": [
      {
        "translation": "あまり食べないです。"
      },
      {
        "translation": "この映画はあまり面白くないです。"
      },
      {
        "translation": "彼はあまり親切じゃないです。"
      },
      {
        "translation": "私はあまり日本語が上手じゃないです。"
      }
    ]
  },
  "ja_あります_63": {
    "title": "～あります (〜arimasu)",
    "shortExplanation": "無生物や植物、概念などの存在や所有を表し、「〜がある」「〜に存在する」という意味です。",
    "longExplanation": "動詞「あります」は、自らの意志で動かない物品、建物、植物、抽象的な事柄などの存在や所有を表します。存在する対象を助詞「が」で指し示し、その所在場所を助詞「に」で表す「場所 ＋ に ＋ 物 ＋ が ＋ あります」の構文が基本です。人間や動物などの生物の存在を表す「います」と明確に使い分ける必要があります。",
    "formation": "名詞（無生物・植物など） + が + あります / 場所 + に + 名詞 + が + あります",
    "examples": [
      {
        "translation": "教室に机があります。"
      },
      {
        "translation": "この公園にたくさんの花があります。"
      },
      {
        "translation": "駅の近くにコンビニがあります。"
      },
      {
        "translation": "家の中に古いテレビがあります。"
      }
    ]
  },
  "ja_いかがですか_64": {
    "title": "～いかがですか (〜ikaga desu ka)",
    "shortExplanation": "相手に飲食物を勧めたり、提案や意向を丁寧に尋ねたりする敬語表現で、「〜はどうですか」の丁寧な言い方です。",
    "longExplanation": "「～いかがですか」は、「どうですか」の改まった敬語表現（丁寧語）です。相手に物を勧めるとき（名詞＋はいかがですか）や、ある行動を控えめに提案・勧誘するとき（動詞て形＋はいかがですか）、または相手の意見や都合を伺うときに用いられます。接客業やビジネスシーン、目上の人との会話で頻繁に使われる基本表現です。",
    "formation": "名詞 + は + いかがですか / 動詞 て形 + は + いかがですか",
    "examples": [
      {
        "translation": "お茶はいかがですか？"
      },
      {
        "translation": "このドレスはいかがですか？"
      },
      {
        "translation": "ケーキを食べてはいかがですか？"
      },
      {
        "translation": "映画を見てはいかがですか？"
      }
    ]
  },
  "ja_いくつ_65": {
    "title": "いくつ～ (ikutsu~)",
    "shortExplanation": "物の個数や数量を尋ねる疑問詞で、「何個」「いくつ」を表し、「いくつか」で「数個」「何点か」を表します。",
    "longExplanation": "「いくつ」は、物の個数や数量（主に和語数詞「ひとつ、ふたつ…」に対応する対象）を尋ねる疑問詞で、「いくつ」「何個」という意味を表します。また、年齢を丁寧に尋ねる際にも用いられます。不定を表す助詞「か」を伴った「いくつか」「いくつかの＋名詞」の形では、「定まらない少数の数量（数個、いくつか）」を表します。",
    "formation": "いくつ + 助詞 / いくつ + の + 名詞 / いくつか + の + 名詞",
    "examples": [
      {
        "translation": "リンゴはいくつありますか？"
      },
      {
        "translation": "いくつかの問題を解決しなければなりません。"
      },
      {
        "translation": "あなたはいくつの言語を話せますか？"
      },
      {
        "translation": "パーティーにはいくつかの飲み物があります。"
      }
    ]
  },
  "ja_いつか_66": {
    "title": "いつか～ (itsuka～)",
    "shortExplanation": "特定されていない未来や過去の時を指し、「いつの日か」「そのうちに」という意味を表します。",
    "longExplanation": "「いつか」は、時を尋ねる疑問詞「いつ」に不特定を表す助詞「か」が接続した副詞です。確定していない未来のある時点、または過去のある時を漠然と指します。特に将来の夢や希望、期待、予測などを述べる文脈脈でよく使われ、「将来いつの日か」「いつかきっと」というニュアンスを表します。",
    "formation": "いつか + 文",
    "examples": [
      {
        "translation": "いつか日本に行きたいです。"
      },
      {
        "translation": "彼はいつか有名な作家になるでしょう。"
      },
      {
        "translation": "いつかあの山を登りたいと思っています。"
      },
      {
        "translation": "彼女はいつか夢を叶えることができると信じています。"
      }
    ]
  },
  "ja_いつでも_67": {
    "title": "いつでも～ (itsudemo～)",
    "shortExplanation": "時間の制約がないことを表し、「どんな時でも」「いつでも自由に」「常に」という意味です。",
    "longExplanation": "「いつでも」は、疑問詞「いつ」に全般的な受容・肯定を表す助詞「でも」が付いた副詞です。時間的な制限や条件が全くないことを表し、相手への許可や誘いにおける「好きな時にいつでも」「いつでも自由に」という意味や、状態が常に変わらない「いついかなる時も」「普段から常に」という意味を表します。",
    "formation": "いつでも + 動詞 / 形容詞 / 名詞",
    "examples": [
      {
        "translation": "いつでも遊びに来てください。"
      },
      {
        "translation": "彼女はいつでも笑顔です。"
      },
      {
        "translation": "いつでも電話で連絡できます。"
      },
      {
        "translation": "この店はいつでも混んでいます。"
      }
    ]
  },
  "ja_いつも_68": {
    "title": "いつも～ (itsumo～)",
    "shortExplanation": "習慣的な動作や常に変わらない状態を表す頻度副詞で、「常に」「普段から」という意味です。",
    "longExplanation": "「いつも」は、日常の習慣として規則的に繰り返される動作や、常に一定して変わらない状態を表す頻度副詞です。「常に」「普段」「毎回」などの意味を持ち、日頃の習慣的な行動パターンや一貫した好み・性質を表現する際に用いられます。",
    "formation": "いつも + 動詞 / 形容詞 / 名詞",
    "examples": [
      {
        "translation": "彼はいつも遅刻します。"
      },
      {
        "translation": "私はいつも優しい犬が好きです。"
      },
      {
        "translation": "彼女はいつも静かな場所で勉強します。"
      },
      {
        "translation": "いつも朝ご飯を食べます。"
      }
    ]
  },
  "ja_が_70": {
    "title": "～が (〜ga)",
    "shortExplanation": "文の主語を表す格助詞、または前後の節を逆接で結ぶ接続助詞で、「〜が」「〜けれど」という意味です。",
    "longExplanation": "助詞「が」は、日本語の最重要助詞の一つで、主に2つの基本的機能を持っています。\n1. 格助詞としての用法：文の主語を示します。特に未知の情報を提示するときや、主語そのものを排他的に指定・強調するとき、自然現象などを客観的に描写する際に使われます。\n2. 接続助詞としての用法：二つの節を結びつけ、前後の事柄が対比・逆接関係にあることを表し、「〜だが」「〜けれど」という意味を表します。",
    "formation": "名詞 + が（主語） / 動詞・形容詞・名詞 + が（逆接の接続助詞）",
    "examples": [
      {
        "translation": "私が学生です。"
      },
      {
        "translation": "このりんごが美味しい。"
      },
      {
        "translation": "彼は頭がいいが、性格が悪い。"
      },
      {
        "translation": "走りたいが、足が痛い。"
      }
    ]
  },
  "ja_が_71": {
    "title": "～が、～ (〜ga, 〜)",
    "shortExplanation": "前後の文をつなぎ、対比や逆接の関係を表す接続助詞で、「〜だが」「〜けれど」という意味です。",
    "longExplanation": "「～が、～」は、二つの文や節を接続して、前後の内容が対立・矛盾していることや、対比関係にあることを表す逆接の接続表現です。話し言葉で多用される「～けど」に比べて改まった丁寧な響きを持ち、書き言葉や公の場でのスピーチ、ニュース、ビジネス会話などで標準的に用いられます。",
    "formation": "文1 + が、+ 文2",
    "examples": [
      {
        "translation": "デザートは美味しいが、カロリーが高い。"
      },
      {
        "translation": "彼は頭がいいが、少し怠け者だ。"
      },
      {
        "translation": "会社は利益を上げたが、従業員の給与は上がらなかった。"
      },
      {
        "translation": "外国語を勉強することが楽しいが、時々難しい。"
      }
    ]
  },
  "ja_から_72": {
    "title": "～から、～ (〜kara, 〜)",
    "shortExplanation": "原因や理由を表す接続助詞で、「〜だから」「〜ので」という意味を表します。",
    "longExplanation": "「～から」は、後続の事柄に対する原因や理由を表す接続助詞です。話者の主観的な判断や理由づけを表すことが多く、後続の節には話者の意志、希望、推量、働きかけ（勧誘・依頼・命令など）が自然に続きます。動詞やい形容詞の普通形に接続し、な形容詞や名詞には「～だから」（丁寧体では「～ですから」）の形で接続します。",
    "formation": "動詞普通形 + から / い形容詞 + から / な形容詞 + だから / 名詞 + だから",
    "examples": [
      {
        "translation": "明日は試験があるから、今晩勉強しなければなりません。"
      },
      {
        "translation": "この部屋は狭いから、もっと大きい部屋を探しています。"
      },
      {
        "translation": "彼は友達だから、手伝ってくれるでしょう。"
      },
      {
        "translation": "雨が降ったから、外に出られません。"
      }
    ]
  },
  "ja_からです_73": {
    "title": "～からです (〜kara desu)",
    "shortExplanation": "文末で理由や原因を丁寧に述べる表現で、「〜だからです」「〜という理由によるものです」という意味です。",
    "longExplanation": "「～からです」は、文末に置いて先行する発言や出来事の理由・根拠を丁寧に説明する表現です。「なぜ」「どうして」と理由を尋ねられた際の丁寧な返答としても多用されます。動詞やい形容詞の普通形にそのまま接続し、な形容詞や名詞には「～だからです」の形で接続します。",
    "formation": "動詞普通形 + からです / い形容詞 + からです / な形容詞 + だからです / 名詞 + だからです",
    "examples": [
      {
        "translation": "寒いからです。コートを着ています。"
      },
      {
        "translation": "この店は安いからです。よく来ます。"
      },
      {
        "translation": "彼は親切だからです。みんなに好かれています。"
      },
      {
        "translation": "彼女は学生だからです。図書館で勉強しています。"
      }
    ]
  },
  "ja_から_74": {
    "title": "～から もらいます (〜kara moraimasu)",
    "shortExplanation": "人や組織から物を受け取ったり、他者に恩恵的な行為をしてもらうことを表し、「〜からもらう」「〜に〜してもらう」という意味です。",
    "longExplanation": "「～からもらいます」（または「～にもらいます」）は、話し手（または身内の者）が他者や学校・会社などの組織から物品を受け取ることを表します。また、動詞のて形に接続する「～てもらいます」の形では、他者の好意や依頼によって自分（または身内）のためにある動作をしてもらい、それに対して感謝の気持ちを抱いていることを表します。物品の授受元や行為者には助詞「から」または「に」を用います。",
    "formation": "相手 + から／に + 物 + を + もらいます / 行為者 + に／から + 動詞 て形 + もらいます",
    "examples": [
      {
        "translation": "友達からプレゼントをもらいました。"
      },
      {
        "translation": "先生に宿題を渡してもらいました。"
      },
      {
        "translation": "お母さんに料理を作ってもらいました。"
      },
      {
        "translation": "兄に車を貸してもらいました。"
      }
    ]
  },
  "ja_が_75": {
    "title": "～が 私に くれます (〜ga watashi ni kuremasu)",
    "shortExplanation": "他人が「私」に対して物を与えたり、親切な行為をしてくれたりすることを表し、「〜が私にくれる／くれます」という意味です。",
    "longExplanation": "「～が私にくれます」は、話し手（私）または話し手側の身内に対して、他者が物を与えたり好意的な行為を行ったりすることを表す表現です。物や行為を与える人物を助詞「が」で表し、受け手となる自分を「私に」で表します。行為をしてくれる場合は「動詞 て形 ＋ くれます」の形で用いられます。",
    "formation": "与える人 + が + （物／動詞て形） + 私に + くれます",
    "examples": [
      {
        "translation": "彼がプレゼントを私にくれました。"
      },
      {
        "translation": "友達が宿題を手伝って私にくれました。"
      },
      {
        "translation": "お母さんがお弁当を作って私にくれました。"
      },
      {
        "translation": "先生がアドバイスを私にくれました。"
      }
    ]
  },
  "ja_けど_76": {
    "title": "～けど、～ (〜kedo、～)",
    "shortExplanation": "前後の文をつなぎ、逆接（対比）や前置きを表し、「〜けれど」「〜が」のくだけた口語表現です。",
    "longExplanation": "「～けど」は、二つの文や節をつなぎ、前後の内容が対比・逆接関係にあることを示したり、前置き・前触れとして本題を切り出す際に用いる接続助詞です。「〜けれど」「〜が」よりもくだけた日常会話（口語）で非常によく使われます。",
    "formation": "動詞普通形 + けど / い形容詞 + けど / な形容詞語幹 + だけど / 名詞 + だけど",
    "examples": [
      {
        "translation": "授業に出たけど、まだ宿題をしないといけない。"
      },
      {
        "translation": "昨日寒かったけど、今日は暖かいです。"
      },
      {
        "translation": "彼は親切だけど、ちょっと怖い。"
      },
      {
        "translation": "これはおいしそうだけど、高すぎる。"
      }
    ]
  },
  "ja_けれど_77": {
    "title": "～けれど、～ (〜keredo、～)",
    "shortExplanation": "前後の文をつなぎ、対比・逆接や前置きを表し、「〜だが」「〜けれども」という意味を表します。",
    "longExplanation": "「～けれど」は、二つの文をつないで前後の事柄が対立・対比関係にあることを示したり、前置きとして本題に導入したりする際に用いる接続表現です。「けど」に比べてやや改まった丁寧な響きを持ち、日常会話から一般的な丁寧表現まで幅広く使われます。",
    "formation": "動詞普通形 + けれど / い形容詞 + けれど / な形容詞語幹 + だけれど / 名詞 + だけれど",
    "examples": [
      {
        "translation": "今日は寒いけれど、散歩に行きます。"
      },
      {
        "translation": "彼は親切けれど、少し怖いです。"
      },
      {
        "translation": "この部屋は狭いけれど、明るいです。"
      },
      {
        "translation": "彼女は病気だけれど、毎日働いています。"
      }
    ]
  },
  "ja_こちら_78": {
    "title": "こちら～ (kochira～)",
    "shortExplanation": "話し手に近い方向・場所・物、または人物を丁寧に指し示し、「こちら」「この方」「こちら側」を表します。",
    "longExplanation": "「こちら」は、こそあど言葉（指示代名詞）の近称に属し、話し手に近い方向（こちら・こっち）、場所（ここ）、物（これ）を丁寧に指す語です。また、第三者を他者に丁寧に紹介する際（「こちらは〜さんです」）にも用いられます。「こっち」「ここ」「これ」の丁寧な表現です。",
    "formation": "こちら / こちら + の + 名詞",
    "examples": [
      {
        "translation": "こちらは田中さんです。"
      },
      {
        "translation": "こちらのレストランは美味しいです。"
      },
      {
        "translation": "こちらへどうぞ。"
      },
      {
        "translation": "こちらの方がいいですか、それともあちらの方がいいですか？"
      }
    ]
  },
  "ja_さっき_79": {
    "title": "さっき～ (sakki～)",
    "shortExplanation": "少し前の時間、わずか前を表す副詞で、「先ほど」「たった今」という意味を表します。",
    "longExplanation": "「さっき」は、現在から少し前の短い時間、少し前に起こった事柄を表す時間副詞です。「たった今」「少し前」という意味で日常会話で非常によく使われます。改まった場面や目上の人に対しては、より丁寧な「先ほど（さきほど）」を用います。名詞を修飾するときは「さっきの＋名詞」の形をとります。",
    "formation": "さっき + 動詞／文；さっき + の + 名詞",
    "examples": [
      {
        "translation": "さっき電話がありました。"
      },
      {
        "translation": "さっき部屋を掃除しました。"
      },
      {
        "translation": "さっき彼に会いました。"
      },
      {
        "translation": "さっきのニュースを見ましたか？"
      }
    ]
  },
  "ja_すぐに_80": {
    "title": "すぐに～ (sugu ni～)",
    "shortExplanation": "時間を置かずに動作や変化が行われることを表す副詞で、「直ちに」「間もなく」「即座に」という意味です。",
    "longExplanation": "「すぐに」は、ある出来事や動作の後に時間を置かず、即座に行動を起こしたり状態が変化したりすることを表す副詞です。「ただちに」「今すぐ」という意味で、動詞の直前に置いてその行動の迅速さを表します。",
    "formation": "すぐに + 動詞／形容詞",
    "examples": [
      {
        "translation": "友達が来たら、すぐに電話をかけてください。"
      },
      {
        "translation": "そのニュースを聞いたら、すぐに会社に行きました。"
      },
      {
        "translation": "彼女はすぐに泣き出した。"
      },
      {
        "translation": "教室に入ると、先生はすぐに授業を始めた。"
      }
    ]
  },
  "ja_ぜんぜん_81": {
    "title": "ぜんぜん～ (zenzen～)",
    "shortExplanation": "否定の表現と呼応して、程度が皆無であることを強調し、「まったく〜ない」「少しも〜ない」という意味を表します。",
    "longExplanation": "「ぜんぜん（全然）」は、後ろに打ち消し・否定の表現（動詞や形容詞の否定形）を伴って、その状態や動作が少しも存在しないこと（全面否定）を強調する副詞です。「少しも〜ない」「まったく〜ない」という意味になります。",
    "formation": "ぜんぜん + 動詞・形容詞の否定形",
    "examples": [
      {
        "translation": "彼はぜんぜん話さない。"
      },
      {
        "translation": "この部屋はぜんぜん暗くない。"
      },
      {
        "translation": "彼女はぜんぜん疲れていない。"
      },
      {
        "translation": "その映画はぜんぜん面白くなかった。"
      }
    ]
  },
  "ja_そして_82": {
    "title": "そして、～ (soshite、～)",
    "shortExplanation": "前後の文をつなぎ、動作の順序や事柄の追加を表す接続詞で、「それから」「その上」という意味を表します。",
    "longExplanation": "「そして」は、文と文をつなぐ順接・並立・累加の接続詞です。前の動作や事柄に引き続いて次の動作が起きる時間的順序を表したり（「それから」「続いて」）、前述の事柄に新たな情報や事実を付け加えたり（「その上」「さらに」）する際に広く用いられます。",
    "formation": "文1 + 。そして、 + 文2",
    "examples": [
      {
        "translation": "朝起きて、そして宿題をしました。"
      },
      {
        "translation": "コーヒーを飲んで、そして新聞を読みました。"
      },
      {
        "translation": "家を出発しました。そして、駅へ行きました。"
      },
      {
        "translation": "彼はゲームをした。そして、テレビを見ました。"
      }
    ]
  },
  "ja_そちら_83": {
    "title": "そちら～ (sochira～)",
    "shortExplanation": "聞き手に近い方向・場所・物、または人物を丁寧に指し示し、「そっち」「そこ」「その方」の丁寧表現です。",
    "longExplanation": "「そちら」は、こそあど言葉の中称に属し、聞き手に近い方向（そちら側）、場所（そこ）、物（それ）、または聞き手の身近にいる人物を丁寧に表す指示代名詞です。「そっち」「そこ」「それ」の丁寧な表現にあたり、ビジネスや改まった対話では相手方や相手の会社・部署を指す敬称としても用いられます。",
    "formation": "そちら / そちら + の + 名詞",
    "examples": [
      {
        "translation": "そちらのレストランはどうですか？"
      },
      {
        "translation": "そちらの方、お名前を教えていただけますか？"
      },
      {
        "translation": "そちらに行く途中で駅があります。"
      },
      {
        "translation": "そちらのかばん、私のと似ていますね。"
      }
    ]
  },
  "ja_それから_84": {
    "title": "それから、～ (sorekara、～)",
    "shortExplanation": "前の事柄のあとに続いて次の事柄が行われることを表し、「そのあとで」「続いて」という意味を表します。",
    "longExplanation": "「それから」は、ある動作や出来事が完了したあと、引き続いて次の事柄が行われる時間的継起を表す接続詞です。「そのあとで」「次に」という意味で、前後の文をつなぎます。また、物を追加して数え上げたり、話題を付け足したりする際にも使われます。",
    "formation": "文・節1（動詞て形など） + 、それから + 文・節2",
    "examples": [
      {
        "translation": "コーヒーを飲んで、それから家を出ました。"
      },
      {
        "translation": "買い物をして、それから映画を見に行きました。"
      },
      {
        "translation": "彼女は勉強をして、それから寝ました。"
      },
      {
        "translation": "パーティーに行って、それから友達と話しました。"
      }
    ]
  },
  "ja_だいたい_85": {
    "title": "だいたい〜 (daitai〜)",
    "shortExplanation": "数量や程度をおおよそ見積もって表す副詞で、「およそ」「約」「おおむね」という意味です。",
    "longExplanation": "「だいたい（大体）」は、厳密な数値ではなく、大体の目安やおおよその見当を表す副詞です。数量・時間・割合（パーセント）などの前に置くことで、「およそ」「約」という意味を表します。また、物事の大半・あらましを表す際にも用いられます。",
    "formation": "だいたい + 数量・数値・割合",
    "examples": [
      {
        "translation": "だいたい１００人がパーティーに参加しました。"
      },
      {
        "translation": "彼女はだいたい２時間でその仕事を終えます。"
      },
      {
        "translation": "だいたい８０％の生徒が試験に合格しました。"
      },
      {
        "translation": "今日はだいたい３０度の暑さです。"
      }
    ]
  },
  "ja_たいてい_86": {
    "title": "たいてい～ (taitei～)",
    "shortExplanation": "一般的な習慣や大部分の状況を表す副詞で、「普段は」「普通は」「大部分は」という意味を表します。",
    "longExplanation": "「たいてい（大抵）」は、通常の状況や高い頻度で繰り返される事柄、あるいは全体の大部分・大半を占める様子を表す副詞です。「普段は〜する」「おおよそ」「大部分」という意味になります。名詞を修飾する場合は「たいていの＋名詞」の形をとります。",
    "formation": "たいてい + 動詞／形容詞；たいてい + の + 名詞",
    "examples": [
      {
        "translation": "たいてい朝８時に起きます。"
      },
      {
        "translation": "彼はたいてい遅刻します。"
      },
      {
        "translation": "この店の商品はたいてい安いです。"
      },
      {
        "translation": "たいていの人はその映画が好きです。"
      }
    ]
  },
  "ja_だから_87": {
    "title": "だから、～ (dakara、～)",
    "shortExplanation": "理由や原因を表して後続の結果や判断を導き、「〜だから」「そのため」「したがって」という意味を表します。",
    "longExplanation": "「だから」は、前述の事柄が理由・原因となり、後述の結論・結果や話者の判断・行動が導き出されることを表す接続表現です。文中では名詞やな形容詞の語幹に接続し（名詞／な形容詞 ＋ だから）、文頭に置いて単独の接続詞（「だから、〜」）としても使われます。動詞やい形容詞には「だ」を付けず「〜から」の形で接続します。",
    "formation": "名詞 + だから / な形容詞語幹 + だから；文1 + 。だから、 + 文2",
    "examples": [
      {
        "translation": "雨だから、傘を持って行きましょう。"
      },
      {
        "translation": "このケーキは有名だから、みんなが食べたいです。"
      },
      {
        "translation": "彼は病気だから、学校に行けません。"
      },
      {
        "translation": "彼女は学生だから、このレストランで割引があります。"
      }
    ]
  },
  "ja_たりたり_88": {
    "title": "～たり、～たり します (〜tari, 〜tari shimasu)",
    "shortExplanation": "多くの動作や状態の中から代表的なものを例示・列挙し、「〜したり〜したりする」という意味を表します。",
    "longExplanation": "「～たり、～たり します」は、行われる多くの動作や状態の中から、代表的なものを2〜3個取り上げて例示・並列する文法表現です。例に挙げた以外にも他の動作が行われているニュアンスを含みます。動詞の普通形過去（た形）に「り」を接続させ、文末は「します」（過去なら「しました」）で結びます。",
    "formation": "動詞た形 + り + 動詞た形 + り + します",
    "examples": [
      {
        "translation": "休日には、映画を見たり、友達と遊んだりします。"
      },
      {
        "translation": "彼は歌ったり、踊ったり、ピアノを弾いたりします。"
      },
      {
        "translation": "このレストランでは、寿司を食べたり、刺身を食べたりします。"
      },
      {
        "translation": "彼女は毎朝、ジョギングしたり、ヨガをしたりします。"
      }
    ]
  },
  "ja_だれ_89": {
    "title": "だれ～ (dare～)",
    "shortExplanation": "人物の素性・名前・正体を尋ねる不定称の指示代名詞（疑問詞）で、「誰」「どなた」という意味を表します。",
    "longExplanation": "「だれ（誰）」は、不特定の人物や正体が分からない人について尋ねる際に用いる疑問詞（不定称の人代名詞）です。文中の役割に応じて、「だれが（主語）」「だれを（目的語）」「だれに（対象）」「だれの（所有）」など各種の格助詞を伴って使われます。改まった場や敬意を表す場面では、より丁寧な「どなた」を用います。",
    "formation": "だれ + 助詞（が、を、に、の など）",
    "examples": [
      {
        "translation": "だれがその本を買いましたか。"
      },
      {
        "translation": "だれを待っていますか。"
      },
      {
        "translation": "だれがそのリンゴを食べましたか。"
      },
      {
        "translation": "だれが鍵を持っていますか。"
      }
    ]
  },
  "ja_だれか_90": {
    "title": "だれか〜 (dareka〜)",
    "shortExplanation": "不特定の人物を指し、「だれか」「ある人」という意味を表します。",
    "longExplanation": "「だれか」は、人物の特定ができない場合や、具体的に誰であるかを問わない場合に「だれか」「ある人」という意味で用いる不定称の代名詞です。助詞（が・を・に・の等）を伴って主語や修飾語として機能するほか、会話では「が」や「を」が省略されて動詞などに直接接続することもあります。",
    "formation": "だれか (+ 助詞 が / を / に / の) + 動詞 / 形容詞 / 名詞",
    "examples": [
      {
        "translation": "だれかがドアをノックしました。"
      },
      {
        "translation": "だれかが私の傘を盗みました。"
      },
      {
        "translation": "だれか助けてください。"
      },
      {
        "translation": "だれかのせいで、電気がきれました。"
      }
    ]
  },
  "ja_だれでも_91": {
    "title": "だれでも～ (dare demo～)",
    "shortExplanation": "対象を限定せず全員に当てはまることを表し、「だれでも」「どんな人でも」という意味を表します。",
    "longExplanation": "「だれでも」は、疑問詞「だれ」に全面的な肯定・包含を表す助詞「でも」が付いた表現です。「どんな人でも」「すべての人」という意味で、条件や能力、権利、性質などが特定の人に限られず、誰にでも等しく当てはまることを強調します。",
    "formation": "だれでも + 動詞 / 形容詞 / 名詞",
    "examples": [
      {
        "translation": "だれでもこのゲームができます。"
      },
      {
        "translation": "だれでも疲れることがあります。"
      },
      {
        "translation": "だれでも無料でこのイベントに参加できます。"
      },
      {
        "translation": "だれでもこの町の観光スポットを楽しむことができます。"
      }
    ]
  },
  "ja_だれもないです_92": {
    "title": "だれも～ないです (dare mo ~ nai desu)",
    "shortExplanation": "否定の述語を伴って人物を全面否定し、「だれも〜ない」「一人も〜ない」という丁寧な意味を表します。",
    "longExplanation": "「だれも～ないです」は、不定称「だれ」に助詞「も」が付いた「だれも」に、動詞・形容詞の否定形「〜ないです」を接続して、人を完全に否定する文法表現です。「一人も〜ない」という意味を、丁寧かつ親しみのある口語的な調子で表します。",
    "formation": "だれも + 動詞 ない形 + です / い形容詞 語幹 + くないです / な形容詞 語幹 + じゃないです",
    "examples": [
      {
        "translation": "だれも知らないです。"
      },
      {
        "translation": "だれも来ないです。"
      },
      {
        "translation": "彼女はだれも好きじゃないです。"
      },
      {
        "translation": "ここにはだれもいないです。"
      }
    ]
  },
  "ja_だれもません_93": {
    "title": "だれも～ません (daremo ~masen)",
    "shortExplanation": "動詞の改まった丁寧否定形を伴い、「だれも〜しません」「一人も〜しません」という意味を表します。",
    "longExplanation": "「だれも～ません」は、「だれも」に動詞の標準的な丁寧否定形「〜ません」（または過去否定形「〜ませんでした」）を接続し、ある行為を行う人物が皆無であることを改まった丁寧な語調で述べる文法表現です。",
    "formation": "だれも + 動詞 連用形（ます形語幹）+ ません / ませんでした",
    "examples": [
      {
        "translation": "だれも秘密を知りません。"
      },
      {
        "translation": "だれもその質問に答えませんでした。"
      },
      {
        "translation": "だれも彼を助けてあげません。"
      },
      {
        "translation": "だれもその映画を見たがりません。"
      }
    ]
  },
  "ja_どう_94": {
    "title": "～どう しますか。 (～dou shimasu ka.)",
    "shortExplanation": "相手の意向・判断・対応策を尋ね、「どうしますか」「どう対応しますか」という意味を表します。",
    "longExplanation": "「～どうしますか」は、特定の状況や課題、想定される条件に対して、相手がどのような判断を下すか、どのような行動をとるかを尋ねる表現です。理由（ので・から）、条件（たら）、話題（について）などを提示した文に続けて用いられます。",
    "formation": "状況節 / 話題 (+ について / は / たら / ので) + どうしますか",
    "examples": [
      {
        "translation": "雨が降っているので、どうしますか？"
      },
      {
        "translation": "この問題について、どうしますか？"
      },
      {
        "translation": "彼が来なかったら、どうしますか？"
      },
      {
        "translation": "進路を決める時、どうしますか？"
      }
    ]
  },
  "ja_どうですか_95": {
    "title": "～どうですか。 (〜dou desu ka.)",
    "shortExplanation": "相手の感想・意見を尋ねたり（「どう思いますか」）、提案・勧誘を行ったりする（「〜はどうですか」）際に用います。",
    "longExplanation": "「～どうですか」は、主に2つの場面で用いられます。(1) ある物事や経験について、相手の感想・意見・状態を尋ねる用法（「〜をどう思いますか」）。(2) 相手に提案や勧めを控えめに行う用法（「〜はいかがですか」「〜しませんか」）。改まりすぎず、日常会話で非常に幅広く使われる丁寧な表現です。",
    "formation": "名詞 + は / が + どうですか / 動詞 普通形 + のは + どうですか / 形容詞・文 + どうですか",
    "examples": [
      {
        "translation": "この映画はどうですか？"
      },
      {
        "translation": "晩ご飯に寿司を食べるのはどうですか？"
      },
      {
        "translation": "この部屋は広いと思いますが、どうですか？"
      },
      {
        "translation": "新しい会社の要件が厳しいですね。鈴木さん、転職するならどうですか？"
      }
    ]
  },
  "ja_どうやって_96": {
    "title": "どうやって～ (douyatte～)",
    "shortExplanation": "手段・方法・手順などを尋ね、「どのようにして」「どういう方法で」という意味を表します。",
    "longExplanation": "「どうやって」は、「どうやる」のて形に由来する疑問詞的表現で、ある動作や目的を達成するための具体的な手段・方法・交通手段・手順などを尋ねる際に用います。動詞の前に置かれ、「どのようにして〜するか」「どんな方法で〜するか」という意味を表します。",
    "formation": "どうやって + 動詞",
    "examples": [
      {
        "translation": "どうやってお寿司を作りますか？"
      },
      {
        "translation": "どうやって日本語を勉強しましたか？"
      },
      {
        "translation": "どうやってこの問題を解決しますか？"
      },
      {
        "translation": "どうやって駅に行きますか？"
      }
    ]
  },
  "ja_どう_97": {
    "title": "～どう 言いますか。 (〜dou iimasu ka.)",
    "shortExplanation": "特定の言葉や表現をある言語でどう表現するかを尋ね、「どう言いますか」という意味を表します。",
    "longExplanation": "「～どう言いますか」は、ある単語やフレーズ、概念を特定の外国語（または適切な表現）でどのように言い表すかを尋ねる表現です。質問対象となる語句を「は」（または「を」）で提示し、言語名の後ろに手段を表す助詞「で」を伴って「〜でどう言いますか」の形で用います。",
    "formation": "言葉・表現 + は（または を）+［言語名］+ で + どう言いますか",
    "examples": [
      {
        "translation": "「ありがとう」は英語でどう言いますか。"
      },
      {
        "translation": "この言葉を日本語でどう言いますか。"
      },
      {
        "translation": "「すみません」はフランス語でどう言いますか。"
      },
      {
        "translation": "その表現をスペイン語でどう言いますか。"
      }
    ]
  },
  "ja_とき_98": {
    "title": "～とき (〜toki)",
    "shortExplanation": "動作や状態が起こる時点・時期を表し、「〜の時」「〜の際」という意味を表します。",
    "longExplanation": "「～とき」は、ある行為や状態が生じる時期・時間・場面を表す接続表現です。名詞「とき」が連体修飾を受ける形をとり、前接する品詞によって接続形が異なります（動詞普通形、い形容詞はそのまま、な形容詞は「〜な」、名詞は「〜の」を伴います）。",
    "formation": "動詞 普通形 + とき / い形容詞 + とき / な形容詞 語幹 + なとき / 名詞 + のとき",
    "examples": [
      {
        "translation": "公園で遊ぶとき、帽子をかぶりましょう。"
      },
      {
        "translation": "このりんごが赤いとき、食べごろです。"
      },
      {
        "translation": "私が勉強するとき、家族は静かにしてくれます。"
      },
      {
        "translation": "子供のとき、よくおばあちゃんの家に遊びに行きました。"
      }
    ]
  },
  "ja_ときどき_99": {
    "title": "ときどき～ (tokidoki～)",
    "shortExplanation": "頻度を表す副詞で、「時々」「たまに」という意味を表します。",
    "longExplanation": "「ときどき」（時々）は、行為や現象が常時ではなく、間隔をおいて不定期に発生することを表す頻度の副詞です。「たまに」「折節」と同様の意味を持ち、文頭または動詞の直前に置いて述語を修飾します。",
    "formation": "ときどき + 動詞 / 形容詞 / 述語",
    "examples": [
      {
        "translation": "彼はときどきケーキを作ります。"
      },
      {
        "translation": "ときどき雨が降るので、傘を持って行ったほうがいいです。"
      },
      {
        "translation": "私はときどきこの店で買い物をします。"
      },
      {
        "translation": "彼女はときどき遅刻します。"
      }
    ]
  },
  "ja_どこ_100": {
    "title": "どこ～ (doko～)",
    "shortExplanation": "場所や位置を尋ねる疑問詞で、「どこ」「どの場所」という意味を表します。",
    "longExplanation": "「どこ」は、場所・位置・方角を尋ねる不定称の指示代名詞（疑問詞）です。助詞と組み合わせて用いられ、「どこですか」（所在の確認）、「どこで」（動作の行われる場所）、「どこに」（存在場所・定住先）、「どこへ」（移動の方向・目的地）などの形で場所を具体的に尋ねます。",
    "formation": "どこ (+ 助詞 は / で / に / へ / から) + 動詞 / ですか",
    "examples": [
      {
        "translation": "駅はどこですか？"
      },
      {
        "translation": "どこで映画を見ましたか？"
      },
      {
        "translation": "どこに住んでいますか？"
      },
      {
        "translation": "どこへ行きたいですか？"
      }
    ]
  },
  "ja_どこか_101": {
    "title": "どこか～ (dokoka～)",
    "shortExplanation": "不特定の場所を指し、「どこか」「ある場所」という意味を表します。",
    "longExplanation": "「どこか」は、疑問詞「どこ」に不特定を表す助詞「か」が付いた不定称の代名詞です。具体的な場所が不明であったり、特定する必要がなかったりする場合に「どこか」「ある場所」という意味で用います。助詞（で・に・へ）を伴って動詞に接続したり、名詞修飾表現の中で用いられたりします。",
    "formation": "どこか (+ 助詞 で / に / へ) + 動詞 / 名詞",
    "examples": [
      {
        "translation": "どこかで財布をなくしました。"
      },
      {
        "translation": "今日はどこかに行きたいです。"
      },
      {
        "translation": "どこか安いレストランがありますか？"
      },
      {
        "translation": "どこか静かな場所で勉強したい。"
      }
    ]
  },
  "ja_どこでも_102": {
    "title": "どこでも～ (dokodemo～)",
    "shortExplanation": "場所を限定せず全体を包括し、「どこでも」「どの場所でも」という意味を表します。",
    "longExplanation": "「どこでも」は、疑問詞「どこ」に包括・全面肯定を表す助詞「でも」が付いた表現で、「どの場所でも」「すべての場所で」という意味を表します。場所による制限を一切受けず、あらゆる場所である行為や状態が可能・成立することを強調する際に副詞的に用いられます。",
    "formation": "どこでも (+ 助詞 で / に / へ) + 動詞 / 文",
    "examples": [
      {
        "translation": "どこでも好きな場所で勉強できます。"
      },
      {
        "translation": "このノートパソコンは便利なので、どこでもインターネットが使えます。"
      },
      {
        "translation": "彼はどこでも寝ることができます。"
      },
      {
        "translation": "彼女はどこでも歌うのが大好きです。"
      }
    ]
  },
  "ja_どこにも_103": {
    "title": "どこにも + 動詞 + ないです (doko ni mo ~ nai desu)",
    "shortExplanation": "場所の全面否定を表し、「どこにも〜ない」「どの場所にも〜ない」という丁寧な意味を表します。",
    "longExplanation": "「どこにも＋動詞ない形＋です」は、場所の完全な否定を表す「どこにも」に動詞の否定形「〜ないです」を接続した構文です。目的の物や人物がどの場所にも一切存在しないことや、いかなる場所でもその動作が成立しないことを、丁寧かつ自然な口語調で強調する際に用います。",
    "formation": "どこにも + 動詞 ない形 + です",
    "examples": [
      {
        "translation": "どこにも傘が売ってないです。"
      },
      {
        "translation": "彼はどこにも見つけられないです。"
      },
      {
        "translation": "どこにも勉強できる場所がないです。"
      },
      {
        "translation": "どこにも美味しいビーガン料理がないです。"
      }
    ]
  },
  "ja_どこにも_104": {
    "title": "どこにも + 動詞 + ません (doko ni mo ~ masen)",
    "shortExplanation": "動詞の丁寧な否定形を伴って場所を全面否定し、「どこにも〜ません」「どの場所にも〜ません」という意味を表します。",
    "longExplanation": "「どこにも＋動詞連用形＋ません」（または状態を表す「〜ていません」）は、場所の完全な否定を表す「どこにも」に、動詞の改まった丁寧否定形「〜ません」を続けた表現です。対象がどの場所にも存在しないことや、いかなる場所でもその行為が行われていないことを、改まった調子で明確に示します。",
    "formation": "どこにも + 動詞 連用形（ます形語幹）+ ません / て形 + いません",
    "examples": [
      {
        "translation": "どこにもあの猫がいません。"
      },
      {
        "translation": "どこにもお金を置いていません。"
      },
      {
        "translation": "この町にはどこにも美味しいラーメン屋がありません。"
      },
      {
        "translation": "どこにも彼女の名前が書いていません。"
      }
    ]
  },
  "ja_どこへも_105": {
    "title": "どこへも～ないです (doko e mo ~ nai desu)",
    "shortExplanation": "動作や移動がどの場所に対しても行われないことを全面的に否定し、「どこへも〜ない」という意味を表します。",
    "longExplanation": "「どこへも〜ないです」は、移動や動作の方向・目的地を全面的に否定する表現です。話し手がある動作をどの場所に対しても行わないことを強調します。「どこへも」の後ろには必ず動詞の否定形（ない形＋です）が続きます。",
    "formation": "どこへも + 動詞ない形 + です",
    "examples": [
      {
        "translation": "今週末どこへも行かないです。"
      },
      {
        "translation": "彼女はどこへも買い物に行きませんでした。"
      },
      {
        "translation": "スーパーはどこへも売らないです。"
      },
      {
        "translation": "私はどこへも行く予定がないです。"
      }
    ]
  },
  "ja_どこへも_106": {
    "title": "どこへも～ません (doko e mo ~ masen)",
    "shortExplanation": "目的地や移動の方向を丁寧に全面否定し、「どこへも〜ません」という意味を表します。",
    "longExplanation": "「どこへも～ません」は、方向を表す助詞「へ」に全否定の助詞「も」、そして丁寧な否定形「〜ません」が結びついた文型です。主に移動を表す動詞（行く、走るなど）とともに用いられ、どの場所へも向かわないことを改まって丁寧に表します。",
    "formation": "どこへも + 動詞ます形語幹 + ません",
    "examples": [
      {
        "translation": "今日はどこへも行きません。"
      },
      {
        "translation": "彼はどこへも走りませんでした。"
      },
      {
        "translation": "どこへも買い物に行きませんでした。"
      },
      {
        "translation": "彼女はどこへも連れて行かせません。"
      }
    ]
  },
  "ja_どこも_107": {
    "title": "どこも～ないです (doko mo ~ nai desu)",
    "shortExplanation": "どの場所にも該当するものや状態が存在しないことを全面的に否定し、「どこにも〜ない」という意味を表します。",
    "longExplanation": "「どこも～ないです」は、場所を表す疑問詞「どこ」に全否定の助詞「も」がつき、否定形「ないです」と呼応して、すべての場所において何かが存在しないことや見当たらないことを表す表現です。名詞＋「がないです」の形や、動詞のナイ形＋「です」の形で接続します。",
    "formation": "どこも + [名詞] + が + ないです / 動詞ない形 + です",
    "examples": [
      {
        "translation": "どこもうちわがないです。"
      },
      {
        "translation": "この町ではどこも美味しいラーメンがないです。"
      },
      {
        "translation": "どこも駐車場がないです。"
      },
      {
        "translation": "どこも席がないです。"
      }
    ]
  },
  "ja_どこも_108": {
    "title": "どこも～ません (doko mo ~ masen)",
    "shortExplanation": "どの場所もその動作や状態に当てはまらないことを丁寧に表し、「どこも〜ない」「どこも〜ません」という意味を表します。",
    "longExplanation": "「どこも～ません」は、すべての場所や機関を対象として、動作の成立や状態を丁寧に全否定する文型です。後続には動詞の否定形（〜ません、〜ていません、〜できません）や形容動詞の否定形（〜じゃありません）が用いられ、該当する場所が一つもないことを表します。",
    "formation": "どこも + 動詞ます形語幹 + ません / ナ形容詞 + じゃありません",
    "examples": [
      {
        "translation": "どこも静かじゃありません。"
      },
      {
        "translation": "どこもその本を売っていません。"
      },
      {
        "translation": "この地域では、どこもインターネットに接続できません。"
      },
      {
        "translation": "どこも彼を知りません。"
      }
    ]
  },
  "ja_どちら_109": {
    "title": "どちら～ (dochira～)",
    "shortExplanation": "2つの選択肢の中から1つを選ぶ際に用いる疑問詞で、「どちら」「どちらの方」という意味を表します。",
    "longExplanation": "「どちら」は、2つの事物や選択肢を比較したり、その中から1つを選んだりする際に用いる疑問詞です。「どっち」の丁寧な表現であり、方角や場所を丁寧に尋ねる際（「どこ」の丁寧語）にも用いられます。主に「どちらが」「どちらの＋名詞」「どちらに／を」などの形で接続します。",
    "formation": "どちら + が / を / に + 動詞/形容詞、または どちらの + 名詞",
    "examples": [
      {
        "translation": "この二つのリンゴ、どちらが美味しいですか？"
      },
      {
        "translation": "どちらのドレスを着たいですか？"
      },
      {
        "translation": "この二つの町、どちらに行きたいですか？"
      },
      {
        "translation": "どちらの映画が面白いと思いますか？"
      }
    ]
  },
  "ja_どなた_110": {
    "title": "どなた～ (donata～)",
    "shortExplanation": "「だれ」の丁寧・敬語表現で、人の身元や名前を改まって尋ねる際に用いる疑問詞です。",
    "longExplanation": "「どなた」は、疑問詞「だれ」の改まった敬語表現（丁寧語・尊敬表現）です。ビジネスシーンや改まった場面で、相手や第三者の名前・身元を尋ねる際に用いられます。「どなたが」「どなたか」「どなたも」などの形で助詞と結びついて広く使われます。",
    "formation": "どなた (+ 助詞：が／に／の／か／も)",
    "examples": [
      {
        "translation": "すみません、どなたが山田さんですか？"
      },
      {
        "translation": "どなたも知っている有名な俳優です。"
      },
      {
        "translation": "明日のパーティーにはどなたが来ますか？"
      },
      {
        "translation": "どなたか手伝っていただけますか？"
      }
    ]
  },
  "ja_どの_111": {
    "title": "どの + 名詞 (dono + 名詞)",
    "shortExplanation": "名詞を直接修飾する連体詞で、3つ以上の選択肢の中から対象を特定・質問する際に用い、「どの〜」という意味を表します。",
    "longExplanation": "「どの」は、こそあど言葉の連体詞（指示代名詞連体形）であり、必ず後ろに名詞を伴って「どの＋名詞」の形で用います。3つ以上の複数の対象の中から、特定の事物や人物を尋ねたり選んだりする際に使用されます。",
    "formation": "どの + 名詞",
    "examples": [
      {
        "translation": "どの本が一番面白いですか。"
      },
      {
        "translation": "どの服を着たいですか。"
      },
      {
        "translation": "どの色が好きですか。"
      },
      {
        "translation": "どのレストランに行きたいですか。"
      }
    ]
  },
  "ja_どれでも_112": {
    "title": "どれでも～ (dore demo～)",
    "shortExplanation": "複数の事物の中からどれを選んでも構わない・問題ないことを表し、「どれでも」「どの１つでも」という意味を表します。",
    "longExplanation": "「どれでも」は、疑問代名詞「どれ」に助詞「でも」が結合した表現です。3つ以上の選択肢の中で、特定のものに限定せず、どれを選んでも差し支えないことや、すべてに共通して当てはまることを表します。「どれでもいい」「どれでも選んでください」などの形で頻繁に用いられます。",
    "formation": "どれ + でも",
    "examples": [
      {
        "translation": "どれでもいいですか？"
      },
      {
        "translation": "どれでも選んでください。"
      },
      {
        "translation": "どれでもおいしいです。"
      },
      {
        "translation": "この中でどれでも好きなものを持って行ってください。"
      }
    ]
  },
  "ja_どんな_113": {
    "title": "どんな + 名詞 (donna + 名詞)",
    "shortExplanation": "人や事物の性質、状態、種類などを尋ねる連体詞で、「どんな〜」「どのような〜」という意味を表します。",
    "longExplanation": "「どんな」は名詞を直接修飾し、その対象の性質、特徴、形状、種類などを具体的に尋ねる際に用いる疑問詞（連体詞）です。答える側は、形容詞や詳しい説明を含む名詞句を用いて性質や特徴を答えます。「どのような」のくだけた口語表現としても位置づけられます。",
    "formation": "どんな + 名詞",
    "examples": [
      {
        "translation": "どんな音楽が好きですか？"
      },
      {
        "translation": "彼女はどんな映画が好きだと思う？"
      },
      {
        "translation": "どんな本が一番面白いですか？"
      },
      {
        "translation": "どんな料理が得意ですか？"
      }
    ]
  },
  "ja_なに_114": {
    "title": "なに～ (nani～)",
    "shortExplanation": "事柄や内容、動作などを尋ねる基本的な疑問代名詞で、「何（なに）」という意味を表します。",
    "longExplanation": "「なに（何）」は、未知の事物、内容、行為などを問う最も基礎的な疑問代名詞です。単独で用いる場合や、助詞「が」「を」「に」などが続く場合は原則として「なに」と発音されます。一方、「です」の前や助数詞の前、またはタ行・ダ行・ナ行の音が続く環境では「なん」と音韻変化します。",
    "formation": "なに + 助詞（が／を／に／で／から）または なに + ですか",
    "examples": [
      {
        "translation": "これはなにですか。"
      },
      {
        "translation": "あの人はなにをしているのですか？"
      },
      {
        "translation": "なにが好きですか？"
      },
      {
        "translation": "今日の天気はなにですか？"
      }
    ]
  },
  "ja_なにか_115": {
    "title": "なにか～ (nanika～)",
    "shortExplanation": "特定しない事物や漠然としたものを指し、「何か」「何かしらの」という意味を表します。",
    "longExplanation": "「なにか（何か）」は、疑問詞「なに」に不特定を表す副助詞「か」がついた語で、話し手が具体的に特定していない事物や漠然とした対象を表します。名詞の前に置かれて連体的に修飾したり（「何か飲み物」）、文中で副詞的・代名詞的に用いられたりします。",
    "formation": "なにか + 名詞、または単独で なにか (+ 助詞) + 動詞",
    "examples": [
      {
        "translation": "なにか飲み物を持ってきてください。"
      },
      {
        "translation": "なにか質問があれば、遠慮なく聞いてください。"
      },
      {
        "translation": "彼女はなにかプレゼントを持っている。"
      },
      {
        "translation": "なにか助けが必要なら、言ってください。"
      }
    ]
  },
  "ja_なにもないです_116": {
    "title": "なにも～ないです (nani mo ~ nai desu)",
    "shortExplanation": "動作の対象や事物を全面的に否定し、「何も〜ない」という意味を表します。",
    "longExplanation": "「なにも～ないです」は、疑問詞「なに」に全否定を表す助詞「も」がつき、動詞のナイ形＋「です」と呼応して、対象となる事物が全く存在しないことや、何一つその動作を行わないことを全面的に表す否定表現です。",
    "formation": "なにも + 動詞ない形 + です",
    "examples": [
      {
        "translation": "彼はなにも言わなかったです。"
      },
      {
        "translation": "私はなにも食べないです。"
      },
      {
        "translation": "彼女はなにも持っていないです。"
      },
      {
        "translation": "この箱にはなにも入っていないです。"
      }
    ]
  },
  "ja_なにもません_117": {
    "title": "なにも～ません (nani mo ~ masen)",
    "shortExplanation": "丁寧な表現において動作の対象を全面的に否定し、「何も〜ません」という意味を表します。",
    "longExplanation": "「なにも～ません」は、丁寧語の文脈において、事物の存在や動作の対象を全否定する標準的な文型です。「なにも」の後ろに動詞のマス形否定「〜ません」（過去否定なら「〜ませんでした」）が接続し、何一つその行為を行わない、または行わなかったことを改まって表します。",
    "formation": "なにも + 動詞ます形語幹 + ません",
    "examples": [
      {
        "translation": "昨日はなにも食べませんでした。"
      },
      {
        "translation": "彼はなにも話しません。"
      },
      {
        "translation": "この部屋ではなにも見えません。"
      },
      {
        "translation": "彼女はなにも買いませんでした。"
      }
    ]
  },
  "ja_なん_118": {
    "title": "なん～ (nan～)",
    "shortExplanation": "疑問詞「何」の音便形で、助数詞の前やタ行・ダ行・ナ行音の前で用いられ、「何」「いくつ」という意味を表します。",
    "longExplanation": "「なん」は、漢字「何」が特定の音環境において音変化した形です。主に助数詞に直接接続して数量や順序を尋ねる場合（何歳、何時、何人など）や、後ろに「です」やタ行・ダ行・ナ行音（「なんという」「なんで」「なんですか」など）が続く場合に「なに」に代わって用いられます。",
    "formation": "なん + 助数詞 / なん + ですか / なん + と",
    "examples": [
      {
        "translation": "あなたはなん歳ですか？"
      },
      {
        "translation": "これはなんですか？"
      },
      {
        "translation": "彼はなんで来ましたか？"
      },
      {
        "translation": "あのレストランはなんと言う名前ですか？"
      }
    ]
  },
  "ja_なんで_119": {
    "title": "なんで～ (nande～)",
    "shortExplanation": "日常会話において理由や原因をくだけて尋ねる疑問詞で、「なぜ」「どうして」という意味を表します。",
    "longExplanation": "「なんで」は、事態の理由や原因、動機を尋ねる際に日常の親しい間柄で広く使われる口語表現です。中立的な「どうして」や改まった文章語の「なぜ」と比べてカジュアルな響きを持ち、時に話者の驚きや不満、疑問の気持ちが込められることがあります。文頭に置いて文全体に接続します。",
    "formation": "なんで + 文",
    "examples": [
      {
        "translation": "なんで遅れたの？"
      },
      {
        "translation": "なんでこの部屋はこんなに汚いの？"
      },
      {
        "translation": "なんで彼女は怒っているの？"
      },
      {
        "translation": "なんで今日は休みなの？"
      }
    ]
  },
  "ja_なんでも_120": {
    "title": "なんでも～ (nandemo～)",
    "shortExplanation": "「何でも」「すべて」という意味を表し、限定せず全面的に対象を受け入れる・肯定する際に用います。",
    "longExplanation": "「なんでも」は疑問詞「なに」に助詞「でも」が付いた語で、「どんなものでも」「すべて」「制限なく何であっても」という意味を表します。選択肢を限定せず、何であっても差し支えない・可能であるという状況を述べるときに動詞、形容詞、名詞などとともに広く用いられます。",
    "formation": "なんでも + 動詞 / 形容詞 / 名詞",
    "examples": [
      {
        "translation": "何でも食べられるから、何を頼んでも大丈夫です。"
      },
      {
        "translation": "何でもよければ、この本をおすすめします。"
      },
      {
        "translation": "何でもできるスタッフを探しています。"
      },
      {
        "translation": "この食堂では、何でも美味しくて安い料理が出されます。"
      }
    ]
  },
  "ja_なんと_121": {
    "title": "～なんと 言いますか。 (〜nan to iimasu ka.)",
    "shortExplanation": "物や事柄の名前・呼び方、または表現の仕方を尋ねるときに用い、「〜を何と言いますか」「〜の名前は何ですか」という意味を表します。",
    "longExplanation": "「～なんと言いますか」は、相手にある物の名前や言葉の言い方を丁寧に尋ねる表現です。疑問詞「なん」、引用の助詞「と」、動詞「言います」に疑問の終助詞「か」が結びついた形です。日本語での呼び方が分からないときや、外国語での表現を質問する際によく使われます。",
    "formation": "名詞 + は / が + なんと言いますか",
    "examples": [
      {
        "translation": "この花は何と言いますか。"
      },
      {
        "translation": "この料理は何と言いますか。"
      },
      {
        "translation": "日本でこれは何と言いますか。"
      },
      {
        "translation": "その映画の名前は何と言いますか。"
      }
    ]
  },
  "ja_に_123": {
    "title": "～に もらいます (〜ni moraimasu)",
    "shortExplanation": "人から物を受け取ったり、恩恵となる行為をしてもらったりすることを表し、「〜から（物を）もらう」「〜に（〜して）もらう」という意味を表します。",
    "longExplanation": "「～にもらいます」は、話し手（または身内）が他者から物やアドバイス、あるいは親切な行為・恩恵を受け取ることを表す表現です。授与者（相手）の後ろに助詞「に」（または「から」）を置き、物を受ける場合は「相手 ＋ に ＋ 物 ＋ を ＋ もらいます」、行為を受ける場合は「動詞て形 ＋ もらいます」という形で接続します。",
    "formation": "相手 + に + 物 + を + もらいます / 動詞 て形 + もらいます",
    "examples": [
      {
        "translation": "友達にプレゼントをもらいました。"
      },
      {
        "translation": "先生にアドバイスをもらいました。"
      },
      {
        "translation": "おばあさんに手紙を書いてもらいました。"
      },
      {
        "translation": "弟に宿題を手伝ってもらいました。"
      }
    ]
  },
  "ja_の_124": {
    "title": "～の (〜no)",
    "shortExplanation": "名詞と名詞を結びつけ、所有、所属、性質、所在などの修飾関係を表します。「〜の」に当たります。",
    "longExplanation": "助詞「の」は、名詞と名詞を連結して前項が後項の名詞を修飾する働きをする格助詞です。所有（私の本）、所属（会社の同僚）、属性・性質、所在や産地など、多様な関係を表します。また、既出の名詞の代用（代名詞的用法）や用言の後ろに付いて名詞化する用法（準体助詞）としても用いられます。",
    "formation": "名詞1 + の + 名詞2",
    "examples": [
      {
        "translation": "これは私の鞄です。"
      },
      {
        "translation": "彼女は赤いバッグを持っています。"
      },
      {
        "translation": "彼はきれいな部屋があります。"
      },
      {
        "translation": "東京の天気は暑いです。"
      }
    ]
  },
  "ja_はたいへんです_125": {
    "title": "～はたいへんです (〜wa taihen desu)",
    "shortExplanation": "ある事柄や行為が多大な労力や苦労を要し、つらい・困難であることを表します。「〜は大変です」「〜は苦労が多い」という意味です。",
    "longExplanation": "「～はたいへんです」は、ある仕事や状況、または特定の行為を行うことが肉体的・精神的に厳しく、苦労や負担が大きいことを述べる表現です。主語には名詞が直接入るほか、動詞辞書形に準体助詞「の」を付けて名詞化した形（〜するのは大変です）もよく用いられます。",
    "formation": "名詞 / 動詞 辞書形 + の + はたいへんです",
    "examples": [
      {
        "translation": "漢字を覚えるのは大変です。"
      },
      {
        "translation": "この仕事は大変です。"
      },
      {
        "translation": "日本の駅のことを理解するのは大変です。"
      },
      {
        "translation": "彼女は病気の時、生活は大変です。"
      }
    ]
  },
  "ja_ほとんど_126": {
    "title": "ほとんど〜 (hotondo〜)",
    "shortExplanation": "数量や割合、程度が全体に極めて近いことを表します。肯定文では「大部分」「ほぼすべて」、否定文では「めったに〜ない」「ほとんど〜ない」という意味になります。",
    "longExplanation": "「ほとんど」は副詞または名詞として用いられ、分量や程度が100％に極めて近い状態を表します。肯定の文脈では「大半」「ほぼ全部」「もう少しで完了する」という意味を表し、否定の表現（〜ない）と呼応すると「ごくわずかしか〜ない」「ほとんど〜しない」という意味になります。名詞を修飾する場合は「ほとんどの＋名詞」の形をとります。",
    "formation": "ほとんど + 動詞 / 形容詞、または ほとんどの + 名詞",
    "examples": [
      {
        "translation": "彼女はほとんど英語を話せません。"
      },
      {
        "translation": "ほとんどの人がパーティーに出席しました。"
      },
      {
        "translation": "私たちはほとんど勉強しないでテストに合格しました。"
      },
      {
        "translation": "この本はほとんど読み終わりました。"
      }
    ]
  },
  "ja_まあまあ_127": {
    "title": "まあまあ～ (maa maa～)",
    "shortExplanation": "程度や状態が特段優れても悪くもなく、中くらいであることを表し、「可もなく不可もなく」「ひとまず合格点である」という意味です。",
    "longExplanation": "「まあまあ」は副詞やな形容詞として用いられ、品質、能力、状態などが最高ではないものの、それなりに満足・納得できる中間的なレベルにあることを表します。「一応満足できる」「悪くはない」というニュアンスを持ちます。また会話において、興奮している相手をなだめるときの間投詞（「まあまあ、落ち着いて」）としても用いられます。",
    "formation": "まあまあ + 形容詞 / 動詞 / 名詞 + です",
    "examples": [
      {
        "translation": "彼の料理の腕前はまあまあです。"
      },
      {
        "translation": "今日の天気はまあまあですね。"
      },
      {
        "translation": "あの映画はまあまあ面白かったです。"
      },
      {
        "translation": "彼女の歌はまあまあ上手だと思います。"
      }
    ]
  },
  "ja_まだ_128": {
    "title": "まだ〜 (mada〜)",
    "shortExplanation": "状態が以前のまま継続していること（「依然として」）、またはある動作が現在に至るまで実現していないこと（「未完了」）を表します。",
    "longExplanation": "「まだ」は時間や状態の継続・未完了を表す副詞です。肯定の表現とともに用いる場合は、過去から続く状態が今なお継続していることを表し（「まだ暑い」など）、否定の表現（〜ない／〜ません）とともに用いる場合は、予定・予想されていた事柄が現在までに完了・発生していないことを表します（「まだ食べていない」など）。",
    "formation": "まだ + 動詞否定形（未完了） / まだ + 形容詞 / 名詞 / 動詞継続形（状態継続）",
    "examples": [
      {
        "translation": "昼ご飯はまだ食べていません。"
      },
      {
        "translation": "山田さんはまだ来ていません。"
      },
      {
        "translation": "この部屋はまだ暑いです。"
      },
      {
        "translation": "彼はまだ学生じゃないです。"
      }
    ]
  },
  "ja_まだないです_129": {
    "title": "まだ〜ないです (mada 〜 nai desu)",
    "shortExplanation": "ある動作や事態がまだ起きていないこと、完了していないことを丁寧に表し、「まだ〜していない」という意味を表します。",
    "longExplanation": "「まだ〜ないです」は、副詞「まだ」に動詞の普通形否定（ない形）＋丁寧の「です」を組み合わせた文型です。「〜ません」と同等の丁寧さを持ちつつ、日常会話においてやや親しみやすく柔らかなニュアンスを与えます。動作が未完了であることや、これから行われる予定の行為が現在まだ実施されていないことを示します（多くの場合「まだ〜ていないです」の形で継続・結果の未完了を表します）。",
    "formation": "まだ + 動詞 ない形 + です（または まだ + 動詞 ていない + です）",
    "examples": [
      {
        "translation": "まだ宿題をしていないです。"
      },
      {
        "translation": "彼はまだ来ないです。"
      },
      {
        "translation": "映画はまだ始まっていないです。"
      },
      {
        "translation": "私たちはまだ夕食を食べていないです。"
      }
    ]
  },
  "ja_まだません_130": {
    "title": "まだ～ません (mada ~masen)",
    "shortExplanation": "ある動作や経験が現在までに完了していない・実現していないことを丁寧な敬体で表し、「まだ〜していません」という意味を表します。",
    "longExplanation": "「まだ～ません」は、標準的な丁寧語（ます体）の否定形を用いて、予定されていた事柄や行為が現在まで完了していないことを表す文法表現です。動作がまだ行われておらずその結果状態に達していないことを表す際には、主に「まだ＋動詞ていません」の形で用いられます。また、経験がないことを述べる場合は「まだ＋動詞たことがありません」の形をとります。",
    "formation": "まだ + 動詞 ます形否定（〜ません / 〜ていません）",
    "examples": [
      {
        "translation": "昼ご飯をまだ食べていません。"
      },
      {
        "translation": "宿題がまだ終わっていません。"
      },
      {
        "translation": "東京にはまだ行ったことがありません。"
      },
      {
        "translation": "彼はまだ来ていません。"
      }
    ]
  },
  "ja_もう_131": {
    "title": "もう～ (mou～)",
    "shortExplanation": "動作や事態が既に完了していること（「既に」）、これ以上続かないこと（「もはや〜ない」）、または時期が迫っていること（「間もなく」）を表します。",
    "longExplanation": "「もう」は多様な用法を持つ副詞です。1. 過去形・完了形とともに用いられ、動作や事態がすでに済んでいることを表します（「もう食べた」など）。2. 否定表現とともに用いられ、これ以上行為や状態が継続しないことを表します（「もう行かない」など）。3. 「すぐ」や時期を表す言葉とともに用いられ、ある時期が間近に迫っていることを表します（「もうすぐ」など）。4. また、数量の追加（「もう一つ」など）を表す際にも用いられます。",
    "formation": "もう + 動詞（過去形／否定形） / 形容詞 / 名詞",
    "examples": [
      {
        "translation": "もう昼ごはんを食べました。"
      },
      {
        "translation": "もうここでは働かない。"
      },
      {
        "translation": "もうすぐ夏休みですね。"
      },
      {
        "translation": "もう十分です。"
      }
    ]
  },
  "ja_もうすぐ_132": {
    "title": "もうすぐ〜 (mou sugu~)",
    "shortExplanation": "ある事柄や動作が時間的にごく近い未来に実現・到来することを表し、「間もなく」「今にも」という意味を表します。",
    "longExplanation": "「もうすぐ」は、事態の発生や完了、あるいは時期の到来までの時間が残りわずかであることを表す時間副詞です。「もう」と「すぐ」が合わさった語で、話している時点からあまり時間を置かずに何かが起こることを予告します。後続には動詞の現在形（未来を表す）や、時期・行事を表す名詞文が続きます。",
    "formation": "もうすぐ + 動詞 / 名詞 + です",
    "examples": [
      {
        "translation": "もうすぐ春が来ます。"
      },
      {
        "translation": "もうすぐ彼女の誕生日です。"
      },
      {
        "translation": "もうすぐ試験が終わる。"
      },
      {
        "translation": "もうすぐ雨が止むでしょう。"
      }
    ]
  },
  "ja_もっと_133": {
    "title": "もっと〜 (motto〜)",
    "shortExplanation": "現在の状態や基準に比べて、数量・程度・質などがさらに上回ることを表し、「さらに」「より一層」という意味を表します。",
    "longExplanation": "「もっと」は、現在の水準や比較対象よりも程度や度合い、分量をさらに高める・深めることを表す程度副詞です。願望や要求、努力の継続などを表す文脈でよく用いられ、動詞、い形容詞、な形容詞の前に置いて修飾します。",
    "formation": "もっと + 動詞 / い形容詞 / な形容詞（な）",
    "examples": [
      {
        "translation": "もっと勉強しなければなりません。"
      },
      {
        "translation": "このかばんをもっと大きいサイズに変えたいです。"
      },
      {
        "translation": "もっと静かな場所で働きたいです。"
      },
      {
        "translation": "彼女はもっと上手になりたいと思っています。"
      }
    ]
  },
  "ja_よく_134": {
    "title": "よく～ (yoku ~)",
    "shortExplanation": "行為の頻度が高いこと（「しばしば」「頻繁に」）、または程度が優れていること・念入りであること（「上手に」「十分に」）を表します。",
    "longExplanation": "「よく」は形容詞「よい／いい」の連用形から生じた副詞で、主に二つの代表的な用法があります。1. 頻度：動作や事態が繰り返し頻繁に行われることを表し、「いつも」「たびたび」という意味になります。2. 程度・巧拙：動作が巧みであること、または十分・念入りに行われることを表し、「上手に」「詳しく」「しっかりと」という意味になります。称賛の言葉である「よくできました」はその代表例です。",
    "formation": "よく + 動詞",
    "examples": [
      {
        "translation": "彼はよく勉強します。"
      },
      {
        "translation": "彼女はよく料理を作ります。"
      },
      {
        "translation": "昔の友達とよく遊んでいました。"
      },
      {
        "translation": "よくできました！"
      }
    ]
  },
  "ja_場所にがあります_135": {
    "title": "～（場所）に～があります (〜basho ni 〜 ga arimasu)",
    "shortExplanation": "ある場所に物や植物などが存在することを表し、「〜に〜がある／あります」という意味を表します。",
    "longExplanation": "「～（場所）に～があります」は、特定の場所や位置に無生物（物）や植物が存在していることを表す基本的な文法です。場所を表す名詞に助詞「に」をつけて存在の所在を示し、存在する対象に助詞「が」をつけ、文末に存在を表す動詞「あります」を続けます。有情物（人や動物）には「います」を用いる点に注意が必要です。",
    "formation": "場所 ＋ に ＋ 物／対象 ＋ が ＋ あります",
    "examples": [
      {
        "translation": "図書館にたくさんの本があります。"
      },
      {
        "translation": "公園に池があります。"
      },
      {
        "translation": "駅の前にコンビニがあります。"
      },
      {
        "translation": "山の上に神社があります。"
      }
    ]
  },
  "ja_A_1": {
    "title": "A うと B うと (A uto B uto)",
    "shortExplanation": "AであってもBであっても、そのどちらの場合にも左右されず事態や態度が変わらないことを表し、「〜であろうと〜であろうと」「〜であれ〜であれ」という意味を表します。",
    "longExplanation": "JLPT N1文型「Aうと Bうと」は「Aうが Bうが」とほぼ同義で、動詞の意向形やい形容詞の推量形（〜かろうと）、「名詞／な形容詞語幹＋であろうと」に接続し、対立・対照的な二つの事態を想定して、どちらの場合であっても話し手の決意や後件の状況が何ら変わることがないことを強調する文型です（「〜であっても〜であっても、やはり…」）。文末には意志、決意、普遍的な事実などを表す文が続きます。",
    "formation": "動詞意向形 ＋ と ＋ 動詞意向形／動詞辞書形＋まい ＋ と ｜ い形容詞語幹＋かろう ＋ と ｜ な形容詞語幹／名詞＋であろう ＋ と",
    "examples": [
      {
        "translation": "雨が降ろうと晴れようと、私は毎日ジョギングをします。"
      },
      {
        "translation": "試験が難しかろうと易しかろうと、一生懸命勉強します。"
      },
      {
        "translation": "彼が学生であろうと社会人であろうと、私は彼を尊敬しています。"
      },
      {
        "translation": "その映画が新しいであろうと古いであろうと、面白ければ観ます。"
      }
    ]
  },
  "ja_A_2": {
    "title": "A かたわら B (A katawara B)",
    "shortExplanation": "本業や主な活動をする一方で、別の活動も並行して行っていることを表します。「〜する一方で」「〜のかたわら」。",
    "longExplanation": "「～かたわら」は、職業や学業など中心となる本業や社会的役割（A）を続けながら、それと並行して別の活動や仕事（B）にも携わっていることを表す文型です。「〜する一方で」「〜の合間に」という意味を表し、長期的・継続的な活動について述べる際に用いられます。人物紹介や略歴などのやや改まった文脈でよく使われます。",
    "formation": "動詞辞書形 ＋ かたわら ｜ 名詞 ＋ のかたわら",
    "examples": [
      {
        "translation": "彼は仕事をするかたわら、大学に通っている。"
      },
      {
        "translation": "私は学生のかたわら、レストランでアルバイトをしている。"
      },
      {
        "translation": "彼女は医者のかたわら、趣味で絵を描いている。"
      },
      {
        "translation": "彼は仕事をするかたわら、ボランティア活動にも積極的に参加している。"
      }
    ]
  },
  "ja_A_3": {
    "title": "A かれ B かれ (A kare B kare)",
    "shortExplanation": "AであってもBであっても、どちらの場合も該当することを示します。「〜であれ〜であれ」「〜につけ〜につけ」。",
    "longExplanation": "「～AかれBかれ」は、古風あるいは文語的な慣用表現で、対立・対比する2つの事柄を並べて「AであってもBであっても、どちらの場合でも同様である」という意味を表します。「多かれ少なかれ」「早かれ遅かれ」「良かれ悪しかれ」のようにい形容詞の語幹に付く慣用句が一般的ですが、強調や古風な言い回しとして名詞や動詞に接続して用いられることもあります。",
    "formation": "い形容詞語幹 ＋ かれ ＋ い形容詞語幹 ＋ かれ（慣用表現） ｜ 名詞 ＋ かれ ＋ 名詞 ＋ かれ ｜ 動詞普通形 ＋ かれ ＋ 動詞普通形 ＋ かれ",
    "examples": [
      {
        "translation": "冬かれ夏かれ、毎日ジョギングする。"
      },
      {
        "translation": "彼が来るかれ来ないかれ、パーティーは始める。"
      },
      {
        "translation": "勝つかれ負けるかれ、試合に出ることが大事だ。"
      },
      {
        "translation": "雨かれ雪かれ、犬の散歩は欠かさない。"
      }
    ]
  },
  "ja_いAdjective_4": {
    "title": "い形容詞 ＋ くする／くなる (i-keiyoushi kusuru/naru)",
    "shortExplanation": "い形容詞の表す状態への変化を表し、「〜くなる（自然な変化）」または「〜くする（人為的な変化）」という意味を表します。",
    "longExplanation": "「い形容詞 ＋ くする／くなる」は、事物や人物の性質・状態が変化することを表す文型です。\n・「〜くなる」：自然にその状態に変化・移行することを表します（自動詞的表現）。\n・「〜くする」：意図的な働きかけによってその状態に変化させることを表します（他動詞的表現）。\nい形容詞の語尾「い」を「く」に変えた連用形に接続します。",
    "formation": "い形容詞語尾「い」を除く ＋ く ＋ する／なる",
    "examples": [
      {
        "translation": "部屋を明るくします。"
      },
      {
        "translation": "彼の顔は赤くなりました。"
      },
      {
        "translation": "この料理を辛くしてください。"
      },
      {
        "translation": "雨が降ると、道が滑りやすくなります。"
      }
    ]
  },
  "ja_なadjective_5": {
    "title": "な形容詞 ＋ にする／になる (na-keiyoushi ni suru/naru)",
    "shortExplanation": "な形容詞の表す状態への変化を表し、「〜になる（自然な変化）」または「〜にする（人為的な働きかけ）」という意味を表します。",
    "longExplanation": "「な形容詞 ＋ にする／になる」は、な形容詞（形容動詞）が表す状態に変化することを表す文型です。\n・「〜になる」：その状態へ自然に変化・移行することを表します（自動词的表現）。\n・「〜にする」：人為的な働きかけや決定によってその状態にすることを表します（他動詞的表現）。\nな形容詞の語幹に助詞「に」を添えて接続します。",
    "formation": "な形容詞語幹 ＋ に ＋ する／なる",
    "examples": [
      {
        "translation": "部屋をきれいにする。"
      },
      {
        "translation": "彼は元気になりました。"
      },
      {
        "translation": "毎日静かにすることが大切です。"
      },
      {
        "translation": "日本語の勉強が楽しくなるように努力します。"
      }
    ]
  },
  "ja_Noun_6": {
    "title": "名詞 ＋ しか～ない (shika~nai)",
    "shortExplanation": "唯一の限定や数量の少なさを強調し、後続の否定表現と呼応して「〜だけ」「〜のほかにない」という意味を表します。",
    "longExplanation": "「名詞 ＋ しか～ない」は、それ以外には存在しないこと、または数量が極めて少ないことを強調する限定表現です。後ろには必ず否定の動詞が呼応しますが、文全体の意味は「それだけをする／それだけがある」という限定の肯定的な意味を表します。話し手の「不満」「物足りなさ」「他に選択肢がない」というニュアンスを含みます。",
    "formation": "名詞（または動詞辞書形）＋ しか ＋ 否定動詞（〜ない／〜ません）",
    "examples": [
      {
        "translation": "私はリンゴしか食べない。"
      },
      {
        "translation": "電車で行くしかないです。"
      },
      {
        "translation": "彼は一冊の本しか持っていない。"
      },
      {
        "translation": "この店にはビールしかない。"
      }
    ]
  },
  "ja_Noun_7": {
    "title": "名詞 ＋ にする (ni suru)",
    "shortExplanation": "複数の選択肢の中からあるものを選び決定することを表し、「〜にする」「〜に決める」という意味を表します。",
    "longExplanation": "「名詞 ＋ にする」は、話し手（または主語）がいくつかの候補や選択肢の中から自分の意思で特定の物事を選び取る決定を表す表現です。飲食店での注文（「これにします」）、買い物の決定、計画や日時の設定など、日常会話の多様な場面で極めて頻繁に使われます。",
    "formation": "名詞 ＋ に ＋ する",
    "examples": [
      {
        "translation": "メニューからピザにしました。"
      },
      {
        "translation": "誕生日プレゼントに時計にするつもりです。"
      },
      {
        "translation": "今日の午後は買い物にすることにしました。"
      },
      {
        "translation": "海外旅行の目的地として、日本にする。"
      }
    ]
  },
  "ja_Noun_8": {
    "title": "名詞 ＋ になる (ni naru)",
    "shortExplanation": "身分、職業、状態、時間などが新しい状態へ変化することを表し、「〜になる」という意味を表します。",
    "longExplanation": "「名詞 ＋ になる」は、人物の身分や職業、事物の状態、年齢や季節などが、自然な推移や結果として別の状態に変化することを表す表現です。自発的・客観的な変化を表し、将来の夢や年齢・季節の推移などを語る際によく用いられます。",
    "formation": "名詞 ＋ に ＋ なる",
    "examples": [
      {
        "translation": "彼は医者になりました。"
      },
      {
        "translation": "子供の頃、私は先生になりたかったです。"
      },
      {
        "translation": "彼女は緊張して顔が赤くなりました。"
      },
      {
        "translation": "春になると桜が咲きます。"
      }
    ]
  },
  "ja_のために_9": {
    "title": "名詞 ＋ のために (no tame ni)",
    "shortExplanation": "ある行為の目的や、対象の利益・ためになることを表し、「〜のために」「〜を目的に」という意味を表します。",
    "longExplanation": "「名詞 ＋ のために」は、ある行為を行う明確な目的や目標を表すとともに、特定の人や集団の利益・幸福のために行動することを表す表現です。名詞に助詞「の」を介して「ために」が接続します。口語では「に」が省略されて「〜のため」となることもあります。",
    "formation": "名詞 ＋ のために",
    "examples": [
      {
        "translation": "勉強のために、図書館で静かな場所を探しています。"
      },
      {
        "translation": "彼は家族のために、一生懸命働いています。"
      },
      {
        "translation": "健康のために、毎日運動をしています。"
      },
      {
        "translation": "世界平和のために、みんなで協力しましょう。"
      }
    ]
  },
  "ja_Noun_10": {
    "title": "名詞 ＋ の間に (no aida ni)",
    "shortExplanation": "ある時間や期間の幅の中で、ある行為や出来事が行われることを表し、「〜の間に」「〜の期間中に」という意味を表します。",
    "longExplanation": "「名詞 ＋ の間に」は、前項の名詞が表す一定の期間・時間の幅の中で、後項の動作や出来事がその期間内の一時点で行われることを表す文法です。「に」を伴わない「〜の間」が期間全体にわたる継続状態を表すのに対し、「〜の間に」は期間内の瞬間的・一時的な動作を表します。",
    "formation": "名詞（期間を表す名詞）＋ の間に",
    "examples": [
      {
        "translation": "昼休みの間に銀行に行きます。"
      },
      {
        "translation": "夏休みの間に海外旅行に行く予定です。"
      },
      {
        "translation": "子供たちが学校の間に買い物に行きました。"
      },
      {
        "translation": "母の日にお母さんにプレゼントを送りました。"
      }
    ]
  },
  "ja_Noun_11": {
    "title": "名詞 ＋ ばかり (bakari)",
    "shortExplanation": "同類のものが非常に多いことや、同じ行為を繰り返していることを表し、「〜だけ」「〜ばかり」という意味を表します。",
    "longExplanation": "「名詞 ＋ ばかり」は、特定の物や出来事、行為が際立って多いことや、そればかりに偏っていることを表す副助詞です。「いつもそればかりしている」「それ以外にほとんどない」というニュアンスを含み、話し手の非難・不満・あきれなどの気持ちを込めて使われることが多くあります。名詞のほか、動詞て形に接続する「〜てばかりいる」も頻出します。",
    "formation": "名詞 ＋ ばかり（動詞普通形・て形 ＋ ばかり／形容詞 ＋ ばかり）",
    "examples": [
      {
        "translation": "彼はお金の話ばかりする。"
      },
      {
        "translation": "彼女は勉強ばかりしている。"
      },
      {
        "translation": "デパートには高い商品ばかりだ。"
      },
      {
        "translation": "この部屋は狭いばかりだ。"
      }
    ]
  },
  "ja_Noun_12": {
    "title": "名詞 ＋ をあげる (wo ageru)",
    "shortExplanation": "話し手（または身内）が相手に対して物を与える授受表現で、「〜をあげる」「〜を与える」という意味を表します。",
    "longExplanation": "「名詞 ＋ をあげる」は、話し手または身内の者が、対等な相手や目下の者（友人・後輩・子供・動植物など）に物を与える行為を表す授受動詞表現です。与える対象（相手）には助詞「に」、渡す物には助詞「を」を添えます。目上の人に対して物を与える際には「あげる」ではなく謙譲語の「差し上げる」を用います。",
    "formation": "（相手 ＋ に）＋ 名詞 ＋ を ＋ あげる",
    "examples": [
      {
        "translation": "プレゼントをあげる。"
      },
      {
        "translation": "友達に花をあげた。"
      },
      {
        "translation": "父に時計をあげます。"
      },
      {
        "translation": "彼女に手紙をあげたい。"
      }
    ]
  },
  "ja_Nounをいただく_13": {
    "title": "名詞 ＋ をいただく (wo itadaku)",
    "shortExplanation": "「もらう」の謙譲語で、目上の人から物やアドバイスなどをいただく行為をへりくだって表し、「お受けする」「頂戴する」という意味を表します。",
    "longExplanation": "「名詞 ＋ をいただく」は、受取の授受動詞「もらう」の謙譲語表現です。目上の人や社会的地位の高い人から物やアドバイス、恩恵などを受け取る際に、自分を低め相手への敬意や感謝を示すために用います。与え手には助詞「から」または「に」が接続します。また、「食べる」「飲む」の謙譲語としても広く用いられます。",
    "formation": "（目上の人 ＋ から／に）＋ 名詞 ＋ を ＋ いただく",
    "examples": [
      {
        "translation": "プレゼントをいただきありがとうございます。"
      },
      {
        "translation": "先生からアドバイスをいただきました。"
      },
      {
        "translation": "このコーヒーをいただいていいですか？"
      },
      {
        "translation": "会社の上司に昇進のお知らせをいただきました。"
      }
    ]
  },
  "ja_Nounをくださる_14": {
    "title": "～をくださる (〜wo kudasaru)",
    "shortExplanation": "「くれる」の尊敬語で、目上の人が話し手（または身内）に物や恩恵を与えることを表し、「（私に）くださる／くださいます」という意味を表します。",
    "longExplanation": "「～をくださる」は、授受動詞「くれる」の尊敬語表現です。先生や上司、目上の人が、話し手やその身内のために物を与えたり、配慮や恩恵を施してくれたりした際に敬意と感謝を込めて用います。日常の丁寧な会話では、丁寧形の「くださいます」や過去形の「くださいました」の形で用いられることが一般的です。",
    "formation": "相手（目上の人） ＋ が ＋ 話し手側 ＋ に ＋ 名詞（物） ＋ を ＋ くださる（丁寧形：くださいます／くださいました）",
    "examples": [
      {
        "translation": "先生が資料をくださいました。"
      },
      {
        "translation": "お母さんがおやつをくださいます。"
      },
      {
        "translation": "上司がアドバイスをくださいました。"
      },
      {
        "translation": "友達がプレゼントをくださいました。"
      }
    ]
  },
  "ja_Noun_15": {
    "title": "名詞 ＋ かたがた (Noun kata gata)",
    "shortExplanation": "ある行動をする機会を利用して、別の目的も兼ねて行うことを表す改まった表現です。「〜を兼ねて」「〜のついでに」。",
    "longExplanation": "「名詞 ＋ かたがた」は、移動や訪問を伴う行為を表す名詞に付き、1つの行動の中で主たる目的を果たしつつ、別の目的も合わせて果たすことを述べる改まった表現です。「〜を兼ねて」「〜のついでに」という意味になり、手紙文やビジネスでの挨拶、お礼、お見舞いなどの社交的な場面でよく用いられます。",
    "formation": "名詞（動作性名詞） ＋ かたがた",
    "examples": [
      {
        "translation": "東京へ出張のかたがた、友人に会いに行った。"
      },
      {
        "translation": "観光のかたがた、お土産を買いました。"
      },
      {
        "translation": "散歩のかたがた、ゴミを拾った。"
      },
      {
        "translation": "学習のかたがた、音楽を聞いた。"
      }
    ]
  },
  "ja_Noun_16": {
    "title": "名詞 ＋ がてら (Noun gatera)",
    "shortExplanation": "移動を伴う主たる行動の機会を利用して、別の行動もついでに行うことを表します。「〜のついでに」「〜を兼ねて」。",
    "longExplanation": "「～がてら」は、散歩や買い物、ドライブなどの移動を伴う動作性名詞や動詞の連用形に接続し、その主たる活動を行う機会を利用して別の行為もついでに済ませることを表す文型です。「〜のついでに」「〜を兼ねて」という意味になり、日常的な場面で自然によく使われます。助詞「に」を伴って「～がてらに」の形をとることもあります。",
    "formation": "名詞（移動を表す動作性名詞） ＋ がてら（または がてらに） ｜ 動詞ます形語幹 ＋ がてら",
    "examples": [
      {
        "translation": "散歩がてらに、近くの公園で花を摘みました。"
      },
      {
        "translation": "買い物がてら、友達に会いに行きました。"
      },
      {
        "translation": "彼女は旅行がてら、新しい言語を勉強しました。"
      },
      {
        "translation": "ドライブがてら、新しいアルバムを聞きました。"
      }
    ]
  },
  "ja_Noun_17": {
    "title": "数量詞 ＋ からある (kara aru)",
    "shortExplanation": "数量・重さ・長さ・大きさなどを表す語に付き、その数量が非常に多いことや規模が大きいことを強調します。「〜以上もある」「〜に達する」。",
    "longExplanation": "「数量詞 ＋ からある」（名詞を修飾する場合は「〜からの」）は、重量・距離・数量・階数・金額などの数量を表す語に付き、「少なくともその数以上はある」「その数に達するほど多い」と、数量の多さや大きさに対する驚き・感嘆の気持ちを込めて強調する表現です。「〜以上もある」「〜を下らない」という意味を表します。（※値段には主に「〜からする」を用いますが、資産や巨額の数字には「〜からある」も用いられます）。",
    "formation": "数量詞 ＋ からある（または からの ＋ 名詞）",
    "examples": [
      {
        "translation": "彼のコレクションは500個からある。"
      },
      {
        "translation": "このビルは40階からある。"
      },
      {
        "translation": "彼の財産は10億円からある。"
      },
      {
        "translation": "このマラソンは10kmからある。"
      }
    ]
  },
  "ja_Noun_18": {
    "title": "名詞 ＋ からすると (kara suru to)",
    "shortExplanation": "ある事柄や立場を根拠・手がかりとして推測や判断を下すことを表します。「〜から見ると」「〜から判断すると」。",
    "longExplanation": "「名詞 ＋ からすると」（「〜からすれば」「〜からして」とも）は、ある兆候・態度・データ・立場などを判断の基準や手がかりとして取り上げ、「その観点から推測・判断すると」と述べる文型です。「〜から見ると」「〜から判断すると」という意味になり、後項には「〜ようだ」「〜はずだ」「〜だろう」などの推量や判断を表す表現がよく続きます。",
    "formation": "名詞 ＋ からすると ｜ 名詞 ＋ からすれば ｜ 名詞 ＋ からして",
    "examples": [
      {
        "translation": "彼の態度からすると、彼はその計画に反対しているようだ。"
      },
      {
        "translation": "このレストランの雰囲気からすると、料理もすばらしいはずだ。"
      },
      {
        "translation": "彼女の成績からすると、彼女は非常に勉強熱心な人でしょう。"
      },
      {
        "translation": "その会社の成長率からすると、将来的には大きな利益を得られるでしょう。"
      }
    ]
  },
  "ja_Verb_19": {
    "title": "～させられる (〜saserareru)",
    "shortExplanation": "使役受身形で、他者からの強制や指示によって本人の意志に反してある動作を行わされることを表し、「無理やり〜させられる」「〜することになる」という意味を表します。",
    "longExplanation": "「～させられる」は、動詞の使役形と受身形が合体した「使役受身形」です。話し手（主語）が相手から強制されたり、嫌々ながら不本意に行動させられたりする心理的負担や迷惑のニュアンスを表します。Ⅰグループ動詞（五段動詞）では、語尾が「す」で終わる動詞を除き、日常会話において「～される」（行かされる、書かされる等）という縮約形が非常によく用いられます。",
    "formation": "Ⅰグループ動詞：語尾のう段をあ段に変えて ＋ せられる（縮約形：あ段 ＋ される、語尾「す」を除く）／Ⅱグループ動詞：語尾の「る」を取って ＋ させられる／Ⅲグループ動詞：する → させられる、くる → こさせられる",
    "examples": [
      {
        "translation": "子供たちは先生に宿題をやらせられました。"
      },
      {
        "translation": "彼は会社にもっと働かせられた。"
      },
      {
        "translation": "私は友達にその機密を話させられました。"
      },
      {
        "translation": "怪我をした選手は、コーチに休ませられました。"
      }
    ]
  },
  "ja_Verb_20": {
    "title": "～させる (〜saseru)",
    "shortExplanation": "動詞の使役形で、相手に動作を指示・強制したり、あるいは相手がすることを許可・容認したりすることを表し、「〜させる」「〜させるようにする」という意味を表します。",
    "longExplanation": "「～させる」は動詞の使役形の表現です。親、教師、上司など目上の立場から目下に対して用いられることが多く、主に以下の用法があります。①相手に指示や命令を出してその動作を行わせる「強制」の用法。②相手の望む動作を行うことを認める「許可・容認」の用法（「～させてあげる」「～させてくれる」などの形で多用）。また、感情や生理的反応を引き起こす用法（「驚かせる」「安心させる」など）もあります。",
    "formation": "Ⅰグループ動詞：語尾のう段をあ段に変えて ＋ せる／Ⅱグループ動詞：語尾の「る」を取って ＋ させる／Ⅲグループ動詞：する → させる、くる → こさせる",
    "examples": [
      {
        "translation": "先生が生徒に宿題をさせました。"
      },
      {
        "translation": "母が私に部屋を掃除させました。"
      },
      {
        "translation": "彼女にピアノを弾かせてあげました。"
      },
      {
        "translation": "上司は彼にそのプログラムを作らせました。"
      }
    ]
  },
  "ja_Verb_21": {
    "title": "～たことがある (〜ta koto ga aru)",
    "shortExplanation": "過去にその動作や事柄を経験したことがあることを表し、「〜した経験がある」という意味を表します。",
    "longExplanation": "「～たことがある」は、動詞の過去形（た形）に「ことがある」を接続させ、話し手や主語がこれまでに少なくとも一度はその行為を経験した事実があることを表す文法です。日常的な習慣やごく直近の過去の出来事には使わず、これまでの人生における経験・体験を述べる際に用います。否定形は「～たことがない」、疑問形は「～たことがありますか」となります。",
    "formation": "動詞た形 ＋ ことがある（丁寧形：あります／ありません）",
    "examples": [
      {
        "translation": "日本に行ったことがあります。"
      },
      {
        "translation": "寿司を食べたことがありますか？"
      },
      {
        "translation": "彼はマラソンを走ったことがあります。"
      },
      {
        "translation": "私はスカイダイビングをしたことがありません。"
      }
    ]
  },
  "ja_Verb_22": {
    "title": "～たときに (〜ta toki ni)",
    "shortExplanation": "前項の動作が完了した時点において後項の事態が起こることを表し、「〜した時に」という意味を表します。",
    "longExplanation": "「～たときに」は、動詞のた形に時を表す名詞「とき（に）」が接続した構文です。前項の動作やすでに成立した状態を前提として、その時点で後項の出来事や行動が生じたことを表します。動作が完了する前を表す「動詞辞書形＋とき」とは異なり、前項の動作が完全に終了した後の時間軸に焦点を当てます。",
    "formation": "動詞た形 ＋ ときに（または とき）",
    "examples": [
      {
        "translation": "映画を見たときに、泣きました。"
      },
      {
        "translation": "彼に初めて会ったときに、遅刻していました。"
      },
      {
        "translation": "日本へ行ったときに、たくさんの写真を撮りました。"
      },
      {
        "translation": "友達が家に来たときに、ゲームをしました。"
      }
    ]
  },
  "ja_Verb_23": {
    "title": "～たところ (〜ta tokoro)",
    "shortExplanation": "ある動作を行った直後の状況や、ある行為をしてみた結果新しい事実が分かったことを表し、「〜したところ」「〜してみたら」という意味を表します。",
    "longExplanation": "「～たところ」は、動詞のた形に接続し、主に二つの用法を持ちます。①ある動作が完了した直後に次の事態が発生したことを表す用法（時間的直後）。②ある行為を試みたり働きかけたりした結果、ある状況や事実が判明したことを表す用法（契機・結果の発見）。後項には実際に起こった客観的な事実が述べられ、話し手の意志や働きかけ（命令・勧誘など）の文は続きません。",
    "formation": "動詞た形 ＋ ところ（または ところで）",
    "examples": [
      {
        "translation": "ドアを開けたところ、猫が飛び出してきた。"
      },
      {
        "translation": "電話を切ったところ、また鳴った。"
      },
      {
        "translation": "宿題を終わらせたところで、友達から連絡が来た。"
      },
      {
        "translation": "買い物をして帰ったところ、財布を失くしたことに気づいた。"
      }
    ]
  },
  "ja_Verb_24": {
    "title": "～たほうがいい (〜ta hou ga ii)",
    "shortExplanation": "相手に助言やアドバイス、勧告を伝える際に用いられ、「〜したほうが良い」「〜するのが望ましい」という意味を表します。",
    "longExplanation": "「～たほうがいい」は、動詞の過去形（た形）に「ほうがいい」が接続し、相手に対してある行動をとることを勧めたり、忠告や助言を与えたりする文法です。た形を用いることで「すでに行為が完了した状態を選択するほうが良い」というニュアンスを含みます。反対にある動作をしないことを勧める場合は「～ないほうがいい」を用います。丁寧な場面では「～たほうがいいです」と結びます。",
    "formation": "動詞た形 ＋ ほうがいい（否定：動詞ない形 ＋ ほうがいい、丁寧形：ほうがいいです）",
    "examples": [
      {
        "translation": "早く寝たほうがいいです。"
      },
      {
        "translation": "もっと勉強したほうがいいです。"
      },
      {
        "translation": "病気の時は、薬を飲んだほうがいいです。"
      },
      {
        "translation": "コーヒーを飲まないほうがいいです。"
      }
    ]
  },
  "ja_Verb_25": {
    "title": "～ために (〜tame ni)",
    "shortExplanation": "ある行動の目的を表す用法（「〜のために」）と、事態を引き起こした客観的な原因・理由を表す用法（「〜のために／〜が原因で」）があります。",
    "longExplanation": "「～ために」は、文脈や接続によって二つの重要な意味を表します。①目的の用法：意志動詞の辞書形や「名詞＋の」に接続し、目標を達成しようとする意図を表します（「〜を目標として」）。②原因・理由の用法：動詞普通形、い形容詞、な形容詞（＋な）、名詞（＋の）に接続し、主に客観的な出来事や不都合な結果を引き起こした原因・理由を改まった口調で述べます（「〜が原因で」）。",
    "formation": "目的：動詞辞書形／名詞 ＋ の ＋ ために｜原因：動詞普通形／い形容詞／な形容詞 ＋ な／名詞 ＋ の ＋ ために",
    "examples": [
      {
        "translation": "試験に合格するために、毎日勉強しています。"
      },
      {
        "translation": "健康のために、毎日運動しなければなりません。"
      },
      {
        "translation": "仕事が忙しいために、友達と会う時間がありません。"
      },
      {
        "translation": "雨が降ったために、試合が中止されました。"
      }
    ]
  },
  "ja_Verb_26": {
    "title": "～つもり (〜tsumori)",
    "shortExplanation": "話し手の意図や今後の予定、決意を表し、「〜する予定だ」「〜する考えだ」という意味を表します。",
    "longExplanation": "「～つもり」は、動詞の辞書形（または否定形）に接続し、話し手が前もって心の中で決めている意図や計画を表す文法です。主に話し手自身の意志について述べます。否定形には「〜しない予定だ」を意味する「～ないつもり」と、意志の不在を強く示す「～つもりはない」があります。丁寧な場面では文末に「です」をつけて「～つもりです」の形で用います。",
    "formation": "動詞辞書形 ＋ つもり（否定：動詞ない形 ＋ つもり／動詞辞書形 ＋ つもりはない、丁寧形：つもりです）",
    "examples": [
      {
        "translation": "明日、友達に会うつもりです。"
      },
      {
        "translation": "今夜、晩ご飯を作るつもりです。"
      },
      {
        "translation": "来年、留学するつもりです。"
      },
      {
        "translation": "この週末、山に登るつもりです。"
      }
    ]
  },
  "ja_Verb_27": {
    "title": "～てあげる (〜te ageru)",
    "shortExplanation": "話し手（または身内）が他者のために親切や好意である行為を行うことを表し、「〜してやる」「〜してあげる」という意味を表します。",
    "longExplanation": "「～てあげる」は、動詞のて形に授受動詞「あげる」が接続し、話し手（または身内の者）が他者の利益になる行為を進んで行うことを表す表現です。行為の恩恵を与えるニュアンス（恩着せがましさ）を含むため、目上の人に対して直接使うことは失礼とされます。目上の人に対しては「～てさしあげる」やより遠回しな表現を用い、本表現は同僚、目下、身内、動植物などに対して用いるのが一般的です。",
    "formation": "動詞て形 ＋ あげる（丁寧形：あげます／あげました）",
    "examples": [
      {
        "translation": "友達が疲れていたから、荷物を持ってあげました。"
      },
      {
        "translation": "弟は宿題がわからなかったので、手伝ってあげました。"
      },
      {
        "translation": "彼女が遅れそうだったから、駅まで迎えに行ってあげました。"
      },
      {
        "translation": "犬はのどが渇いたそうだったので、水を飲ませてあげました。"
      }
    ]
  },
  "ja_Verb_28": {
    "title": "～てある (〜te aru)",
    "shortExplanation": "誰かが何らかの目的をもって行った行為の結果が、現在もそのままの状態として残っていることを表し、「〜してある／〜してあります」という意味を表します。",
    "longExplanation": "「～てある」は、他動詞のて形に補助動詞「ある」が接続した構文です。ある人によって意図的・目的をもって行われた行為の結果状態が、現在も維持されていることを表します。この構文では、通常他動詞の目的語に助詞「が」が用いられます（例：窓が開けてある）。自動詞と結びついて単なる自然な状態を表す「～ている」に対し、「～てある」は何者かによる準備や意図的な行為が存在することを明確に示します。",
    "formation": "他動詞て形 ＋ ある（丁寧形：あります）",
    "examples": [
      {
        "translation": "窓が開けてあります。"
      },
      {
        "translation": "宿題がもう終わってあります。"
      },
      {
        "translation": "洗濯物が全部干してあります。"
      },
      {
        "translation": "この部屋はきれいに掃除してあります。"
      }
    ]
  },
  "ja_Verb_29": {
    "title": "～ていく (～te iku)",
    "shortExplanation": "現在の時点から未来に向かって動作が継続することや、時間の経過に伴って状態が変化していくことを表し、「〜していく」という意味を表します。",
    "longExplanation": "「～ていく」は、動詞のて形に補助動詞「いく」が接続した文法形式で、主に以下の意味を表します。①現在の時点を基準にして、動作や状態が未来に向かって継続・発展していくこと（時間的推移）。②ある状態への変化が徐々に進展していくこと。③話し手や基準となる場所から離れていく動作・移動を表すこと（空間的移動）。未来への継続や離反を表し、「～てくる」と対比して用いられます。",
    "formation": "動詞て形 ＋ いく",
    "examples": [
      {
        "translation": "このまま練習を続けていくと、上達するでしょう。"
      },
      {
        "translation": "彼は成長していくうちに、自立心が強くなった。"
      },
      {
        "translation": "この会社はこれからも技術革新を行っていくでしょう。"
      },
      {
        "translation": "子供たちはどんどん学んでいく。"
      }
    ]
  },
  "ja_Verb_30": {
    "title": "～ていただきたい (～te itadakitai)",
    "shortExplanation": "相手に何かをしてもらうことを望む気持ちをへりくだって丁寧に表し、「〜してもらいたい」「〜していただきたい」という意味を表します。",
    "longExplanation": "「～ていただきたい」は、動詞のて形に「もらう」の謙譲語「いただく」の希望形「いただきたい」が接続した表現です。相手に対して自分（または身内）のためにある行為をしてもらいたいという希望や依頼を、敬意を込めて丁寧に伝える際に用います。「～てほしい」に比べて相手に対する敬意が高く、目上の人やビジネスの場面でよく用いられます。会話では語尾を和らげるために「～ていただきたいのですが」の形で用いられることが一般的です。",
    "formation": "動詞て形 ＋ いただきたい（／いただきたいです／いただきたいのですが）",
    "examples": [
      {
        "translation": "資料をコピーしていただきたいです。"
      },
      {
        "translation": "この仕事を手伝っていただきたいのですが。"
      },
      {
        "translation": "もしよろしければ、指導していただきたいです。"
      },
      {
        "translation": "駅まで送っていただきたいんですが。"
      }
    ]
  },
  "ja_Verb_31": {
    "title": "～ていただく (～te itadaku)",
    "shortExplanation": "目上の人や他者から恩恵や親切な行為を受けることをへりくだって表し、「〜してもらう」の謙譲表現です。",
    "longExplanation": "「～ていただく」は、「～てもらう」の謙譲語表現です。話し手（または身内）が、目上の人や外部の人からある親切な行為や手助け、恩恵を受けたことを、相手に対する敬意と感謝を込めてへりくだって述べる際に用います。行為を行う相手は助詞「に」で示されます。丁寧な表現として「～ていただきます」「～ていただきました」の形で多用されます。",
    "formation": "動詞て形 ＋ いただく（丁寧体：～ていただきます／～ていただきました）",
    "examples": [
      {
        "translation": "メールを送っていただいて、ありがとうございます。"
      },
      {
        "translation": "荷物を運んでいただいて、助かりました。"
      },
      {
        "translation": "資料をチェックしていただきたいです。"
      },
      {
        "translation": "先生にアドバイスをしていただきました。"
      }
    ]
  },
  "ja_Verb_32": {
    "title": "～ていただけませんか (～te itadakemasen ka)",
    "shortExplanation": "相手に対して何かをしてくれるよう丁寧に依頼する表現で、「〜していただけますか」「〜してくださいませんか」という意味を表します。",
    "longExplanation": "「～ていただけませんか」は、謙譲語「いただく」の可能形否定「いただけない」に丁寧の助動詞「ます」と疑問の終助詞「か」がついた丁寧な依頼表現です。相手に何かをしてもらうことをへりくだりつつ、相手の意志や都合を尊重しながら遠回しに依頼するため、非常に丁寧で角が立たない表現です。「～てください」や「～てくれませんか」よりも敬意が高く、目上の人や取引先、初対面の人への依頼に適しています。",
    "formation": "動詞て形 ＋ いただけませんか",
    "examples": [
      {
        "translation": "この手紙を投函していただけませんか。"
      },
      {
        "translation": "この荷物を持っていただけませんか。"
      },
      {
        "translation": "隣の部屋にいる人に静かにしていただけませんか。"
      },
      {
        "translation": "説明書を読んでいただけませんか。"
      }
    ]
  },
  "ja_Verb_33": {
    "title": "～ている (～te iru)",
    "shortExplanation": "動作が現在進行中であることや、動作が完了した結果の状態が続いていることを表し、「〜している」という意味を表します。",
    "longExplanation": "「～ている」は、動詞のて形に補助動詞「いる」が接続した基本的な文法形式です。動詞の種類によって大きく2つの用法に分かれます。①継続動詞（「読む」「勉強する」など）に接続する場合：動作が現在進行していること（進行中）を表します。②瞬間動詞・変化動詞（「入る」「壊れる」「結婚する」「なる」など）に接続する場合：動作が完了した後の結果の状態が現在も存続していること（結果の状態）を表します。丁寧形は「～ています」となります。",
    "formation": "動詞て形 ＋ いる（丁寧体：～ています）",
    "examples": [
      {
        "translation": "今、本を読んでいます。"
      },
      {
        "translation": "彼は英語を勉強しています。"
      },
      {
        "translation": "ケーキが冷蔵庫に入っています。"
      },
      {
        "translation": "部屋がきれいになっています。"
      }
    ]
  },
  "ja_Verb_34": {
    "title": "～ているところ (～te iru tokoro)",
    "shortExplanation": "ある動作がまさに今行われている最中であることを強調し、「ちょうど〜している最中だ」という意味を表します。",
    "longExplanation": "「～ているところ」は、動詞の「～ている」の連体形に形式名詞「ところ」が接続した構文です。ある動作がまさにその瞬間、進行中の局面にあることを際立たせて表します。単なる進行を表す「～ている」に比べ、時間的な局面（まさに今その真っ最中であること）を強く意識させるニュアンスがあります。文末は「だ」「です」「でした」などが続きます。",
    "formation": "動詞て形 ＋ いる ＋ ところ（だ／です／でした）",
    "examples": [
      {
        "translation": "彼は宿題をしているところです。"
      },
      {
        "translation": "私たちは映画を見ているところでした。"
      },
      {
        "translation": "子供たちは公園で遊んでいるところです。"
      },
      {
        "translation": "彼女はケーキを作っているところで、すぐ来ます。"
      }
    ]
  },
  "ja_Verb_35": {
    "title": "動詞辞書形 ＋ ことなく (~kotonaku)",
    "shortExplanation": "ある行為をまったく行わない状態、あるいはある事態が生じない状態のまま、動作や状態が継続することを表します。「〜しないで」「〜することなしに」。",
    "longExplanation": "文法項目「～ことなく」は、話し言葉の「〜ないで」「〜ずに」に相当する改まった書き言葉の表現です。動詞の辞書形（基本形）に接続し、途中でその動作を挟んだり事態に妨げられたりすることなく、物事が円滑に、または継続して進む様子を表します。改まった談話、公のスピーチ、文章などで好んで使われます。",
    "formation": "動詞辞書形 ＋ ことなく",
    "examples": [
      {
        "translation": "彼女は泣くことなく帰ってしまいました。"
      },
      {
        "translation": "彼は注意することなく突然出かけた。"
      },
      {
        "translation": "山田さんは誰にも話すことなく会社を辞めました。"
      },
      {
        "translation": "２０年間、病気になることなく働いています。"
      }
    ]
  },
  "ja_Verb_36": {
    "title": "動詞ない形 ＋ ことには (~nai koto ni wa ~ nai)",
    "shortExplanation": "ある条件が成立しなければ、望ましい結果や後続の事態も決して実現し得ないという不可欠な前提条件を表します。「〜しなければ（〜できない）」。",
    "longExplanation": "「～ないことには」は、後ろに続く事態を実現させるために、前項の動作や条件が絶対に不可欠であることを表す文型です。前節は動詞の否定形「ない形」を取り、後節には必ず「〜ない」「〜できない」「〜わけにはいかない」といった不可能・否定を表す表現が呼応して、「前項を済ませない限り、後ろの事態は決して成立しない」という強い前提関係を明示します。",
    "formation": "動詞ない形 ＋ ことには ＋ 後続節（不可能・否定表現）",
    "examples": [
      {
        "translation": "薬を飲まないことには、病気が治らない。"
      },
      {
        "translation": "この問題によく考えないことには、解決できない。"
      },
      {
        "translation": "練習をしないことには、スキルが上達しない。"
      },
      {
        "translation": "手続きをしないことには、新しいパスポートがもらえない。"
      }
    ]
  },
  "ja_Verb_37": {
    "title": "～てくださいませんか (～te kudasaimasen ka)",
    "shortExplanation": "相手に対して敬意を込めて丁寧に依頼する表現で、「〜してくれませんか」「〜していただけませんか」という意味を表します。",
    "longExplanation": "「～てくださいませんか」は、尊敬語「くださる」に丁寧の助動詞「ます」の否定形「ません」と疑問の終助詞「か」が接続した丁寧な依頼表現です。「～てください」よりも相手への配慮が深く、相手の意向を伺いながら依頼するため、より敬意が高く角が立ちません。目上の人やお客様、改まった場面での依頼・お願いとして広く用いられます。",
    "formation": "動詞て形 ＋ くださいませんか",
    "examples": [
      {
        "translation": "コーヒーを飲んでくださいませんか。"
      },
      {
        "translation": "ドアを閉めてくださいませんか。"
      },
      {
        "translation": "明日お昼に会ってくださいませんか。"
      },
      {
        "translation": "その資料を送ってくださいませんか。"
      }
    ]
  },
  "ja_Verb_38": {
    "title": "～てくださる (～te kudasaru)",
    "shortExplanation": "目上の人などが話し手（または身内）のために親切な行為をしてくれることを敬って表し、「〜してくれる」の尊敬表現です。",
    "longExplanation": "「～てくださる」は、「～てくれる」の尊敬語表現です。目上の人や敬意を払うべき相手が、話し手やその身内（内グループ）のために恩恵となる行為をしてくれることを敬意と感謝を込めて表します。動作主（相手）は助詞「が」や「は」で示されます。丁寧な表現として「～てくださいます」「～てくださいました」の形で頻繁に用いられます。",
    "formation": "動詞て形 ＋ くださる（丁寧体：～てくださいます／～てくださいました）",
    "examples": [
      {
        "translation": "先生が手伝ってくださる。"
      },
      {
        "translation": "お母さんが美味しい料理を作ってくださる。"
      },
      {
        "translation": "友達が私を駅まで送ってくださる。"
      },
      {
        "translation": "部長がすぐに質問に答えてくださる。"
      }
    ]
  },
  "ja_Verb_39": {
    "title": "～てくる (～te kuru)",
    "shortExplanation": "過去から現在に向かって動作・状態が継続してきたことや、変化や感覚が生じ始めることを表し、「〜してくる」という意味を表します。",
    "longExplanation": "「～てくる」は、動詞のて形に補助動詞「くる」が接続した文型で、主に以下の意味を表します。①時間的推移：過去から現在に至るまで動作や状態が継続・発展してきたこと（「ずっと研究を続けてきた」など）。②状態・感覚の出現：自然現象や心理、感覚などの変化が徐々に現れ始めること（「寒くなってきた」「分かってきた」など）。③空間的移動：話し手の視点に向かって近づいてくる動作や、「～してから戻る」こと。未来へ向かう「～ていく」と対比されます。",
    "formation": "動詞て形 ＋ くる（過去形：～てきた）",
    "examples": [
      {
        "translation": "最近、日本語が分かってくるようになりました。"
      },
      {
        "translation": "寒くなってきたので、コートを着ましょう。"
      },
      {
        "translation": "雨がやんできました。"
      },
      {
        "translation": "彼がだんだん怖くなってきた。"
      }
    ]
  },
  "ja_Verb_40": {
    "title": "～てくれませんか (～te kuremasen ka)",
    "shortExplanation": "相手に対して好意的な行為を依頼・要請する丁寧な表現で、「〜してくれませんか」「〜してくれますか」という意味を表します。",
    "longExplanation": "「～てくれませんか」は、動詞のて形に補助動詞「くれる」の丁寧否定疑問形「くれませんか」が接続した依頼表現です。相手に自分に対する手助けや行為を丁寧に頼む際に用います。親しい間柄、同僚、友人、あるいは目下の人に対して親愛の情を込めて依頼するのに適しています。目上の人や改まった場面では、より敬意の高い「～ていただけませんか」を用いるのが適切です。",
    "formation": "動詞て形 ＋ くれませんか",
    "examples": [
      {
        "translation": "ドアを開けてくれませんか。"
      },
      {
        "translation": "これを見てくれませんか。"
      },
      {
        "translation": "手伝ってくれませんか。"
      },
      {
        "translation": "明日、迎えに来てくれませんか。"
      }
    ]
  },
  "ja_Verb_41": {
    "title": "～てくれる (～te kureru)",
    "shortExplanation": "他者が話し手（または身内）のために親切にある行為をしてくれることを感謝の気持ちを込めて表し、「〜してくれる」という意味を表します。",
    "longExplanation": "「～てくれる」は、動詞のて形に授受の補助動詞「くれる」が接続した文法表現です。他者が話し手自身や話し手の身内（内グループ）に対して、恩恵や利益となる行為を行ってくれることを表します。相手の親切に対する感謝の気持ちが含まれるのが特徴です。行為を行う主体は助詞「が」や「は」で示されます。丁寧な表現は「～てくれます」「～てくれました」となります。",
    "formation": "動詞て形 ＋ くれる（丁寧体：～てくれます／～てくれました）",
    "examples": [
      {
        "translation": "友達が宿題を手伝ってくれました。"
      },
      {
        "translation": "弟が部屋を掃除してくれた。"
      },
      {
        "translation": "先生が質問に答えてくれます。"
      },
      {
        "translation": "彼女が手紙を書いてくれる。"
      }
    ]
  },
  "ja_Verb_42": {
    "title": "～てさしあげる (～te sashiageru)",
    "shortExplanation": "話し手（または身内）が目上の人などのために親切に何かを行うことをへりくだって表し、「〜してあげる」の謙譲表現です。",
    "longExplanation": "「～てさしあげる」は、「～てあげる」の謙譲語表現です。話し手（または身内）が、目上の人やお客様など敬意を払うべき相手のために何か親切な行為・手助けをすることを、へりくだって表します。ただし、「恩恵を施す（親切をしてやる）」というニュアンスが含まれるため、相手の面前で直接使うと恩着せがましく聞こえる場合があり、現代の敬語マナーでは「お／ご…する」（例：「お持ちしましょうか」）を用いる方が好まれることも多いです。",
    "formation": "動詞て形 ＋ さしあげる（丁寧体：～てさしあげます／～てさしあげましょうか）",
    "examples": [
      {
        "translation": "お茶を入れてさしあげます。"
      },
      {
        "translation": "メッセージを送ってさしあげました。"
      },
      {
        "translation": "荷物を持ってさしあげましょうか。"
      },
      {
        "translation": "お電話をかけてさしあげます。"
      }
    ]
  },
  "ja_Verb_50": {
    "title": "～ないことにする (～nai koto ni suru)",
    "shortExplanation": "話し手自身の主観的な意志や判断によって、ある行為をしないと決めることを表し、「〜しないことにする」「〜しないと決める」という意味を表します。",
    "longExplanation": "「～ないことにする」は、動詞の否定形（ない形）に形式名詞「こと」、格助詞「に」、動詞「する」が接続した意志決定の文法表現です。話し手が自分自身の主体的な意志に基づいて、その動作を行わないという選択・決断を下したことを表します。すでに決定した事柄を述べる際は過去形の「～ないことにした」「～ないことにしました」、その決定を習慣や個人的なルールとして継続している場合は「～ないことにしている」の形をとります。外部の状況や規則などによって客観的に決まる「～ないことになる」と対比されます。",
    "formation": "動詞ない形 ＋ ことにする（過去形：～ないことにした／～ないことにしました、継続・習慣：～ないことにしている）",
    "examples": [
      {
        "translation": "明日のパーティーに行かないことにする。"
      },
      {
        "translation": "そのケーキを食べないことにします。"
      },
      {
        "translation": "今日はジョギングをしないことにする。"
      },
      {
        "translation": "彼と会わないことにしました。"
      }
    ]
  },
  "ja_かどうか_74": {
    "title": "～かどうか (〜ka dou ka)",
    "shortExplanation": "間接疑問文などで、ある事柄が成立するか否かを表し、「〜か、それともそうでないか」という意味を表します。",
    "longExplanation": "「～かどうか」は、間接疑問の節を作り、その事柄の真偽や選択（成立するかどうか）が不確定であることを表す文法表現です。後続節には「知りません」「分かりません」「教えてください」「覚えていません」などの動詞がよく呼応します。名詞やな形容詞に接続する場合は、標準語では「だ」を省いて直接接続するのが一般的ですが、口語では「だかどうか」と言われることもあります。",
    "formation": "動詞普通形 ＋ かどうか ／ い形容詞 ＋ かどうか ／ な形容詞語幹（または＋だ）＋ かどうか ／ 名詞（または＋だ）＋ かどうか",
    "examples": [
      {
        "translation": "彼が来るかどうか知りません。"
      },
      {
        "translation": "この本が面白いかどうか教えてください。"
      },
      {
        "translation": "彼女が綺麗だかどうかは分かりません。"
      },
      {
        "translation": "彼が先生だかどうか覚えていません。"
      }
    ]
  },
  "ja_かなあ_75": {
    "title": "～かなあ (〜kanaa)",
    "shortExplanation": "独り言や親しい相手に対して、不確実な疑念、自問、または控えめな願望を表し、「〜だろうか」という意味を表します。",
    "longExplanation": "終助詞「～かなあ」は、主に日常会話の独り言や親しい間柄において、不確かな事柄に対する疑問や迷い、自問自答の気持ち、あるいは控えめな希望を表す表現です。名詞やな形容詞に続く場合、助動詞「だ」は脱落するか「なのかなあ」の形を取ることが一般的です。目上の人に対して直接疑問を投げかける表現としては適していません。",
    "formation": "動詞普通形 ＋ かなあ ／ い形容詞 ＋ かなあ ／ な形容詞語幹（または＋なの）＋ かなあ ／ 名詞（または＋なの）＋ かなあ",
    "examples": [
      {
        "translation": "明日雨が降るかなあ。"
      },
      {
        "translation": "このケーキは美味しいかなあ。"
      },
      {
        "translation": "彼は病気かなあ。"
      },
      {
        "translation": "彼女は学生かなあ。"
      }
    ]
  },
  "ja_かもしれない_76": {
    "title": "～かもしれない (〜kamoshirenai)",
    "shortExplanation": "ある事柄が起こる可能性や不確実な推量を表し、「もしかすると〜の可能性がある」という意味を表します。",
    "longExplanation": "「～かもしれない」は、話し手が確信を持てず、可能性が五分五分かそれ以下であると推測するときに用いる表現です。丁寧な形は「～かもしれません」で、親しい会話では「～かも」と短縮されることもよくあります。名詞やな形容詞に接続する場合、助動詞「だ」は通常省かれます。",
    "formation": "動詞普通形 ＋ かもしれない ／ い形容詞 ＋ かもしれない ／ な形容詞語幹（「だ」は通常省略）＋ かもしれない ／ 名詞（「だ」は通常省略）＋ かもしれない",
    "examples": [
      {
        "translation": "明日雨が降るかもしれない。"
      },
      {
        "translation": "このケーキは美味しいかもしれない。"
      },
      {
        "translation": "彼が病気かもしれない。"
      },
      {
        "translation": "彼女は学生かもしれない。"
      }
    ]
  },
  "ja_から_77": {
    "title": "～から (〜kara)",
    "shortExplanation": "主観的な理由や原因、判断の根拠を表し、「〜ので」「〜という理由で」という意味を表します。",
    "longExplanation": "接続助詞「～から」は、前節が後節の理由や原因、判断の根拠であることを示します。客観的な事情を述べる「～ので」に比べて、話し手の主観的な意図、主張、命令、勧誘、推量などの感情が強く表れやすい特徴があります。名詞やな形容詞の普通形に接続する場合は「～だから」の形になります。",
    "formation": "動詞普通形 ＋ から ／ い形容詞 ＋ から ／ な形容詞 ＋ だから ／ 名詞 ＋ だから",
    "examples": [
      {
        "translation": "雨が降るから、傘を持って行ってください。"
      },
      {
        "translation": "このケーキは美味しいから、みんな食べるでしょう。"
      },
      {
        "translation": "彼は病気だから、学校を休みます。"
      },
      {
        "translation": "今日は日曜日だから、学校がありません。"
      }
    ]
  },
  "ja_けれど_78": {
    "title": "～けれど (〜keredo)",
    "shortExplanation": "前後の文を軽い逆接や対比で結んだり、前置きとしてつないだりし、「〜だが」「〜けれども」という意味を表します。",
    "longExplanation": "接続助詞「～けれど」は、前節と後節が対立・対比する関係にあることを柔らかく表現したり、本題に入る前の前置きとして使われたりします。やや口語的な表現で、より改まった場面では「～けれども」や接続助詞「～が」が用いられます。名詞やな形容詞の普通形に続く場合は「～だけれど」の形をとります。",
    "formation": "動詞普通形 ＋ けれど ／ い形容詞 ＋ けれど ／ な形容詞 ＋ だけれど ／ 名詞 ＋ だけれど",
    "examples": [
      {
        "translation": "今日は忙しいけれど、明日はもっと時間がある。"
      },
      {
        "translation": "このレストランは高いけれど、料理が美味しい。"
      },
      {
        "translation": "彼は若いけれど、とても経験豊富だ。"
      },
      {
        "translation": "彼女は病気だけれど、明るく元気だ。"
      }
    ]
  },
  "ja_させてください_79": {
    "title": "～させてください (〜sasete kudasai)",
    "shortExplanation": "相手に対して、自分がある行為を行う許可を丁寧に求め、「〜することを許してください」という意味を表します。",
    "longExplanation": "「～させてください」は、動詞の使役形のて形に補助動詞「ください」がついた形で、話し手が特定の動作を行うことへの許可を相手に丁寧に求める表現です。「私に〜させてください」というニュアンスを持ちます。ビジネスシーンなどの改まった場面では、より敬意の高い「～させていただきます」「～させていただけますでしょうか」が用いられます。",
    "formation": "動詞使役形て形（〜させて）＋ ください",
    "examples": [
      {
        "translation": "もう少し考えさせてください。"
      },
      {
        "translation": "写真を撮らせてください。"
      },
      {
        "translation": "もうちょっと練習させてください。"
      },
      {
        "translation": "ここで待たせてください。"
      }
    ]
  },
  "ja_しし_80": {
    "title": "～し、～し、～ (〜shi, 〜shi, 〜)",
    "shortExplanation": "複数の理由や根拠、あるいは同等の性質・特徴を並列して挙げ、「〜だし、〜だし」という意味を表します。",
    "longExplanation": "接続助詞「～し」は、後節の結論や判断に至った理由を二つ以上並べて強調するとき、あるいは同類の事柄や特徴を対等に並列して述べる表現です。「挙げた理由のほかにもまだある」という含みを持たせることができます。名詞やな形容詞の普通形に接続する場合は「～だし」の形になります。",
    "formation": "動詞普通形 ＋ し ／ い形容詞 ＋ し ／ な形容詞 ＋ だし ／ 名詞 ＋ だし",
    "examples": [
      {
        "translation": "彼は若いし、元気だし、フレンドリーだし、みんなと仲良くなれると思います。"
      },
      {
        "translation": "このレストランは料理が美味しいし、雰囲気がいいし、価格も手頃だからお勧めです。"
      },
      {
        "translation": "彼女は勉強ができるし、スポーツも得意だし、性格もいい。"
      },
      {
        "translation": "今日は寒いし、雨も降っているし、家でゆっくり休んだ方がいいでしょう。"
      }
    ]
  },
  "ja_すぎる_81": {
    "title": "～すぎる (〜sugiru)",
    "shortExplanation": "動作や状態の度合いが適度な限界を超えていることを表し、「度を超えて〜だ」という意味を表します。",
    "longExplanation": "複合動詞「～すぎる」は、動詞のます形語幹や形容詞の語幹に後続し、行為や状態の度合いが通常許容される水準や好ましい限度を超えていることを示します。多くの場合、不都合や好ましくない結果を伴う否定的な文脈で用いられます。文法上は2グループ（一段）動詞として活用します。現代の若者言葉では過度の強調として肯定的に用いられることもあります。",
    "formation": "動詞連用形（ます形語幹）＋ すぎる ／ い形容詞語幹（「い」を除く）＋ すぎる ／ な形容詞語幹 ＋ すぎる",
    "examples": [
      {
        "translation": "この部屋は暑すぎる。"
      },
      {
        "translation": "彼は早く来すぎた。"
      },
      {
        "translation": "この箱は重すぎて持ち上げられない。"
      },
      {
        "translation": "彼女は忙しくて遊びすぎはしない。"
      }
    ]
  },
  "ja_ずつ_82": {
    "title": "～ずつ (〜zutsu)",
    "shortExplanation": "数量や分量を表す言葉に付き、等しい割り当てや一定量ずつの反復・進行を表します。",
    "longExplanation": "副助詞「～ずつ」は、数量詞や分量を表す語について、それぞれに同等に配分すること（例：一人に2個ずつ）や、一定のまとまりや分量で動作や変化が反復・継続して進むこと（例：一歩ずつ）を表します。",
    "formation": "数量詞／名詞 ＋ ずつ",
    "examples": [
      {
        "translation": "りんごを2つずつ配ります。"
      },
      {
        "translation": "私たちは週に一度ずつ掃除をします。"
      },
      {
        "translation": "みんなは同じ距離を一歩ずつ歩いた。"
      },
      {
        "translation": "彼女は子供たちに一枚ずつプレゼントをくれました。"
      }
    ]
  },
  "ja_そうだ_83": {
    "title": "～そうだ (〜sou da)",
    "shortExplanation": "視覚的な直感に基づいて事物の様子や今にも起こりそうな兆候を推量し、「〜に見える」「今にも〜しそうだ」という意味を表します。",
    "longExplanation": "様態の助動詞「～そうだ」は、話し手が目で見た様子や直感的な印象から物事の状態を推測したり、今にもある動作や変化が起こりそうな前兆を捉えて表現したりする文型です。例外として「いい」は「よさそうだ」、「ない」は「なさそうだ」となります。普通形に接続して人づてに聞いた内容を伝える伝聞の「～そうだ（〜という話だ）」とは区別されます。",
    "formation": "動詞連用形（ます形語幹）＋ そうだ ／ い形容詞語幹（「い」を除く）＋ そうだ ／ な形容詞語幹 ＋ そうだ",
    "examples": [
      {
        "translation": "その花はとてもきれいそうだ。"
      },
      {
        "translation": "彼は疲れそうだ。"
      },
      {
        "translation": "この本は面白そうだ。"
      },
      {
        "translation": "雨が降りそうだ。"
      }
    ]
  },
  "ja_そんな_84": {
    "title": "そんな (sonna) ＋ 名詞",
    "shortExplanation": "名詞を修飾して、聞き手に関連する事柄や直前に話題に出た同種の事物を指し、「そのような」という意味を表します。",
    "longExplanation": "連体詞「そんな」は、「こそあど」指示詞の「そ」系列に属し、名詞の直前に置かれて、聞き手の側にある事物や、会話の中で直前に言及された事柄の性質・状態を指し示します。口語においては、驚きや否定、軽視のニュアンスを込めて用いられることも多くあります。",
    "formation": "そんな ＋ 名詞",
    "examples": [
      {
        "translation": "そんな話、信じられない。"
      },
      {
        "translation": "そんな映画、見たくない。"
      }
    ]
  },
  "ja_そんなに_85": {
    "title": "そんなに～ (sonna ni〜)",
    "shortExplanation": "主に否定表現を伴い、程度がそれほど著しくないことを表す副詞で、「それほど〜ない」という意味を表します。",
    "longExplanation": "程度を表す副詞「そんなに」は、文末の否定表現と呼応して、状態や度合いが相手や周囲の予想・印象ほど甚だしくないことを表します。「それほど〜ない」「あまり〜ない」という意味合いになります。",
    "formation": "そんなに ＋ 動詞否定形 ／ い形容詞否定形 ／ な形容詞否定形",
    "examples": [
      {
        "translation": "そんなに急がなくてもいいですよ。"
      },
      {
        "translation": "そんなに難しくない問題だと思います。"
      },
      {
        "translation": "彼女はそんなに背が高くありません。"
      },
      {
        "translation": "そんなにたくさん食べる必要はないと思う。"
      }
    ]
  },
  "ja_たらいい_86": {
    "title": "～たらいい (〜tara ii)",
    "shortExplanation": "相手に対する助言や勧め、あるいは特定の事態が実現することを望む願望を表し、「〜するとよい」「〜したらいい」という意味を表します。",
    "longExplanation": "「～たらいい」は、条件を表す「～たら」に形容詞「いい」が結びついた形で、相手に解決策や行動を柔らかく勧めたり助言したりするときに用いられます。また、文末に終助詞「な」などをつけて独り言として使うことで、話し手自身の「〜したらいいな（〜であってほしい）」という願望や希望を表すことができます。",
    "formation": "動詞た形 ＋ らいい（〜たらいい）",
    "examples": [
      {
        "translation": "もっと勉強したらいいですよ。"
      },
      {
        "translation": "雨が止んだらいいな。"
      },
      {
        "translation": "早く元気になったらいいですね。"
      },
      {
        "translation": "彼に連絡したらいいと思います。"
      }
    ]
  },
  "ja_たら_87": {
    "title": "～たら いかがですか (〜tara ikaga desu ka)",
    "shortExplanation": "相手に対して非常に丁寧・丁重に提案や助言、勧めを行い、「〜なさってはいかがでしょうか」という意味を表します。",
    "longExplanation": "「～たら いかがですか」は、仮定条件の「～たら」に改まった敬語疑問表現である「いかがですか」を接続した文型です。目上の人や顧客などに対して、失礼のないよう極めて丁寧に提案やアドバイスを行ったり、意向を尋ねたりする際に用いられます。「～たらどうですか」の丁寧な敬語表現に当たります。",
    "formation": "動詞た形 ＋ ら いかがですか ／ い形容詞語幹 ＋ かったら いかがですか ／ な形容詞 ＋ だったら いかがですか ／ 名詞 ＋ だったら いかがですか",
    "examples": [
      {
        "translation": "図書館に行ったらいかがですか。"
      },
      {
        "translation": "寒かったらカーディガンを着るのはいかがですか。"
      },
      {
        "translation": "部屋が暗かったら照明を付けるのはいかがですか。"
      },
      {
        "translation": "自分の意見だったら他人に聞くのはいかがですか。"
      }
    ]
  },
  "ja_たら_88": {
    "title": "～たら どうですか (〜tara doudesuka)",
    "shortExplanation": "相手に対して柔らかく提案や勧め、助言を行い、「〜してみてはどうですか」という意味を表します。",
    "longExplanation": "「～たら どうですか」は、動詞のた形に「ら」と「どうですか」を接続し、相手に対して親しみやすく控えめに助言や提案をする表現です。相手に行動を促すニュアンスが含まれるため、基本的には同僚や目下、親しい間柄で用いられ、目上の人に対してはより敬意の高い「～たら いかがですか」などを用いるのが適切です。",
    "formation": "動詞た形 ＋ ら どうですか（たらどうですか）",
    "examples": [
      {
        "translation": "スキーに行ったらどうですか？"
      },
      {
        "translation": "少し休んだらどうですか？"
      },
      {
        "translation": "この本を読んだらどうですか？"
      },
      {
        "translation": "タクシーで帰ったらどうですか？"
      }
    ]
  },
  "ja_たりたり_89": {
    "title": "～たり～たり (〜tari 〜tari)",
    "shortExplanation": "複数の動作や状態の中から代表的な例を並べて挙げたり、交互に繰り返すことを表し、「〜したり〜したりする」「〜かったり〜かったりする」という意味を表します。",
    "longExplanation": "「～たり～たり」は、多くの動作や状態の中から代表的なものを2、3挙げて並べる不完全列挙の文法表現です。動作の順序や軽重は問わず、「他にも同様のことがある」というニュアンスを含みます。文末には通常「する」を伴います。また、対照的な形容詞や動詞を並べることで、状態が交互に入れ替わること（「暑かったり寒かったりする」など）を表すこともできます。",
    "formation": "動詞た形 ＋ り ＋ 動詞た形 ＋ り ＋ する ／ い形容詞語幹 ＋ かったり ／ な形容詞語幹 ＋ だったり ／ 名詞 ＋ だったり",
    "examples": [
      {
        "translation": "週末は映画を観たり、本を読んだりする。"
      },
      {
        "translation": "彼女は料理が上手だったり、歌がうまかったりする。"
      },
      {
        "translation": "このリゾートではスキーをしたり、温泉に入ったりできる。"
      },
      {
        "translation": "この地域の天気は暑かったり、寒かったりする。"
      }
    ]
  },
  "ja_だろう_90": {
    "title": "～だろう (〜darou)",
    "shortExplanation": "話し手の推量や判断を普通体（くだけた表現）で表し、「おそらく〜だろう」「〜だろうと思う」という意味を表します。",
    "longExplanation": "「～だろう」は、丁寧体「〜でしょう」の普通体（常体）の形で、話し手が不確定な事態や状況について推測・判断して述べる推量表現です。「たぶん」「きっと」などの推量を表す副詞とともに用いられることが多くあります。また、文末を上昇調（上がり目）で発音することで、親しい間柄で相手の同意を求めたり確認したりする際にも用いられます。",
    "formation": "動詞普通形 ＋ だろう ／ い形容詞普通形 ＋ だろう ／ な形容詞語幹 ＋ だろう ／ 名詞 ＋ だろう",
    "examples": [
      {
        "translation": "明日は晴れるだろう。"
      },
      {
        "translation": "彼は忙しいだろう。"
      },
      {
        "translation": "この本は面白いだろう。"
      },
      {
        "translation": "彼女は先生だろう。"
      }
    ]
  },
  "ja_っていう_91": {
    "title": "～っていう (〜tte iu)",
    "shortExplanation": "「～という」のくだけた口語表現で、名称を挙げたり、定義・引用・話題提示をしたりする際に用いられ、「〜という」という意味を表します。",
    "longExplanation": "「～っていう」は、「～という」が口語で音変化したくだけた日常会話表現です。聞き手が知らないと思われる事物や人の名前を紹介する際（「〜という名前の」）や、事柄を定義・話題提示する際（「〜というのは」）、あるいは伝聞や引用を述べる際によく用いられます。",
    "formation": "普通形（名詞／動詞／形容詞） ＋ っていう ＋ 名詞",
    "examples": [
      {
        "translation": "ピザっていう料理が大好きです。"
      },
      {
        "translation": "彼っていう男性はすごく面白いです。"
      },
      {
        "translation": "この映画っていうのは本当に感動的だよ。"
      },
      {
        "translation": "彼女が言っているっていう店はここではない。"
      }
    ]
  },
  "ja_で_92": {
    "title": "～で (〜de)",
    "shortExplanation": "動作が行われる場所や、動作に用いる手段・方法・道具・材料などを表す格助詞で、「〜で」「〜を使って」という意味を表します。",
    "longExplanation": "格助詞「～で」は、文脈に応じて多様な文法機能を担います。主な用法として以下のものがあります。\n1. 手段・方法・道具・材料：移動手段（乗り物）、使用する道具、言語、材料などを表し、その手段を用いて動作を行うことを示します。\n2. 動作の場所：具体的な動作や行為が行われる活動の場所を示します。",
    "formation": "名詞（手段／道具／場所など） ＋ で",
    "examples": [
      {
        "translation": "私は自転車で学校に行きます。"
      },
      {
        "translation": "彼は日本語で手紙を書いた。"
      },
      {
        "translation": "鉛筆で絵を描きました。"
      },
      {
        "translation": "レストランで昼食を食べました。"
      }
    ]
  },
  "ja_でしょう_93": {
    "title": "～でしょう (〜deshou)",
    "shortExplanation": "話し手の丁寧な推量や推測を表し、「おそらく〜だろう」「〜でしょう」という意味を表します。",
    "longExplanation": "「～でしょう」は、丁寧体（敬体）で事態を推量・推測して述べる表現です。天気予報やニュース報道、改まった会話などで頻繁に用いられ、「たぶん」「きっと」などの副詞とよく呼応します。文末を上げて発音すると、相手に同意を求めたり確認を促したりする表現（確認要求）になります。",
    "formation": "動詞普通形 ＋ でしょう ／ い形容詞普通形 ＋ でしょう ／ な形容詞語幹 ＋ でしょう ／ 名詞 ＋ でしょう",
    "examples": [
      {
        "translation": "明日は晴れでしょう。"
      },
      {
        "translation": "彼は元気でしょう。"
      },
      {
        "translation": "この本は面白いでしょう。"
      },
      {
        "translation": "彼女は医者でしょう。"
      }
    ]
  },
  "ja_てはいけない_94": {
    "title": "～てはいけない (〜te wa ikenai)",
    "shortExplanation": "禁止を表し、その行為をしてはならないことを指示・警告する表現で、「〜してはいけない／いけません」という意味を表します。",
    "longExplanation": "「～てはいけない」（丁寧形は「～てはいけません」）は、ある行為を行うことを明確に禁じる禁止表現です。公共の場所のルールや規則、法律、または目上の人が目下の人に対して注意や指示を与える際によく使われます。日常会話では「〜ちゃいけない」「〜じゃいけない」と縮約されることもあります。",
    "formation": "動詞て形 ＋ はいけない／はいけません",
    "examples": [
      {
        "translation": "公園でたばこを吸ってはいけない。"
      },
      {
        "translation": "ここで写真を撮ってはいけない。"
      },
      {
        "translation": "図書館で大きな声を出してはいけない。"
      },
      {
        "translation": "バスの中で立っている人に席を譲ってはいけない。"
      }
    ]
  },
  "ja_てもいい_95": {
    "title": "～てもいい (〜temo ii)",
    "shortExplanation": "許可を与えたり、許可を求めたりする表現で、「〜してもかまわない」「〜してもよい」という意味を表します。",
    "longExplanation": "「～てもいい」（丁寧形は「～てもいいです」）は、ある行為を行うことを許可・容認する文法表現です。文末に助詞「か」を伴った疑問形「～てもいいですか」にすることで、相手に対して丁寧に許可を求める表現になります。動詞のて形が濁点（〜で）で終わる動詞には「〜でもいい」と接続します。",
    "formation": "動詞て形 ＋ もいい／もいいです／もいいですか",
    "examples": [
      {
        "translation": "ここで写真を撮ってもいいですか。"
      },
      {
        "translation": "このリンゴを食べてもいいですか。"
      },
      {
        "translation": "試験が終わったら、帰ってもいいです。"
      },
      {
        "translation": "今夜友達と遊んでもいい。"
      }
    ]
  },
  "ja_てもでも_96": {
    "title": "～ても/でも (〜te mo/demo)",
    "shortExplanation": "逆接の確定条件または仮定条件を表し、「たとえ〜であっても」「〜としても」という意味を表します。",
    "longExplanation": "「～ても／でも」は、前件の事態や条件が成立しても、後件の内容がそれに左右されず成立することを表す逆接の譲歩・条件表現です。「たとえ〜であっても、やはり〜だ」という強いニュアンスを持ちます。動詞はて形に「も」、い形容詞は「〜くても」、な形容詞と名詞は「〜でも」に接続します。",
    "formation": "動詞て形 ＋ も ／ い形容詞語幹 ＋ くても ／ な形容詞語幹 ＋ でも ／ 名詞 ＋ でも",
    "examples": [
      {
        "translation": "雨が降っても、学校に行きます。"
      },
      {
        "translation": "この部屋が汚くても、掃除しないつもりです。"
      },
      {
        "translation": "その映画が面白くなくても、見ます。"
      },
      {
        "translation": "彼女が病気でも、働きます。"
      }
    ]
  },
  "ja_といい_97": {
    "title": "～といい (〜to ii)",
    "shortExplanation": "話し手の希望や願い、あるいは相手に対する好意的な祈り・期待を表し、「〜であることを望む」「〜だとよい」という意味を表します。",
    "longExplanation": "「～といい」は、望ましい事態や結果が実現することを願う気持ちを表す文法表現です。文末に終助詞「ね」「な」を伴った「〜といいね」「〜といいな」の形で独り言や親しい人への共感・希望として使われたり、丁寧な「〜といいですね」の形で相手への祈念や思いやりを伝える挨拶的な表現としても多用されます。",
    "formation": "動詞普通形 ＋ といい ／ い形容詞普通形 ＋ といい ／ な形容詞語幹 ＋ だといい ／ 名詞 ＋ だといい",
    "examples": [
      {
        "translation": "明日晴れるといいね。"
      },
      {
        "translation": "この試験に合格するといい。"
      },
      {
        "translation": "彼が元気だといいな。"
      },
      {
        "translation": "そのレストランが美味しいといいですね。"
      }
    ]
  },
  "ja_という_98": {
    "title": "～という ＋ 名詞 (〜to iu ＋ 名詞)",
    "shortExplanation": "名詞を修飾して、その具体的な名称・定義・内容や評判・伝聞を説明し、「〜という〜」という意味を表します。",
    "longExplanation": "「～という ＋ 名詞」は、後続する名詞の内容を具体的に規定・説明する連体修飾の表現です。事物や人物の名称・肩書を提示する用法（「〜という名前の」）のほか、その対象に関する評判・伝聞・実質的な内容を補足して説明する際（「〜といわれている製品」など）に幅広く用いられます。",
    "formation": "普通形（名詞／動詞／形容詞） ＋ という ＋ 名詞",
    "examples": [
      {
        "translation": "彼は日本語が流暢なアメリカ人という人です。"
      },
      {
        "translation": "昨日、美味しかったというケーキを食べました。"
      },
      {
        "translation": "有名な歌手という彼女は、たくさんのファンがいます。"
      },
      {
        "translation": "環境に優しいという製品が人気があります。"
      }
    ]
  },
  "ja_どういう_99": {
    "title": "どういう ＋ 名詞 (dou iu ＋ 名詞)",
    "shortExplanation": "後続する名詞の性質・種類・内容・理由などを尋ねる連体詞的表現で、「どんな〜」「どのような〜」という意味を表します。",
    "longExplanation": "「どういう ＋ 名詞」は、後続の名詞について詳細な情報や説明、具体的な内容・理由を尋ねる際に用いる疑問表現です。「どんな」と意味合いが似ていますが、「どういう」は理由や意味、内実を論理的に説明してもらいたい場合（「どういう理由」「どういう意味」など）により多く用いられる傾向があります。",
    "formation": "どういう ＋ 名詞",
    "examples": [
      {
        "translation": "どういう仕事をしていますか？"
      },
      {
        "translation": "どういう映画が好きですか？"
      },
      {
        "translation": "どういう服を着たいですか？"
      },
      {
        "translation": "どういう理由で遅れましたか？"
      }
    ]
  },
  "ja_と思う_100": {
    "title": "～と思う (〜to omou)",
    "shortExplanation": "話し手の考え・意見・感想や主観的な判断を表し、「〜と考える」「〜と思う」という意味を表します。",
    "longExplanation": "「～と思う」（丁寧形は「～と思います」）は、ある事柄についての話し手自身の思考や意見、判断を述べる最も代表的な文法表現です。断定的な言いまわしを避け、表現を和らげて控えめに伝える働きもあります。「と思う」の直前は常に普通形（常体）が接続します。",
    "formation": "動詞普通形 ＋ と思う ／ い形容詞普通形 ＋ と思う ／ な形容詞語幹 ＋ だと思う ／ 名詞 ＋ だと思う",
    "examples": [
      {
        "translation": "明日晴れると思います。"
      },
      {
        "translation": "この映画は面白いと思う。"
      },
      {
        "translation": "彼は親切だと思います。"
      },
      {
        "translation": "鈴木さんは先生だと思う。"
      }
    ]
  },
  "ja_という_101": {
    "title": "～という (〜to iu)",
    "shortExplanation": "発言や思考内容の引用、伝聞や世間の評判、あるいは人や事物の名称提示を表し、「〜と言う」「〜という評判だ」「〜という名前の」という意味を表します。",
    "longExplanation": "「～という」は、多面的な機能を持つ重要な文型です。\n1. 引用：他者の発言や思考内容を直接・間接に引用する用法。\n2. 伝聞・評判：聞き及んだ情報や世間の噂・評価を述べる用法（「〜という話だ」「〜という評判がある」）。\n3. 名称・定義：事物や人の名前を提示したり定義づけたりする用法。\n接続は原則として普通形に接続します。",
    "formation": "普通形（動詞／形容詞／名詞） ＋ という",
    "examples": [
      {
        "translation": "彼は「好きだ」と言った。"
      },
      {
        "translation": "その映画は面白いという評判があります。"
      },
      {
        "translation": "日本には富士山という高い山があります。"
      },
      {
        "translation": "彼女は難しい仕事をしているという話です。"
      }
    ]
  },
  "ja_ないといけない_102": {
    "title": "～ないといけない (〜nai to ikenai)",
    "shortExplanation": "義務や必要性を表し、その行為をしなければならないことを述べ、「〜しなければならない」という意味を表します。",
    "longExplanation": "「～ないといけない」（丁寧形は「～ないといけません」）は、「もし〜しないと都合が悪い・通用しない」という論理から転じて、義務や必要性、当然すべき行為を表す文法表現です。日常会話で自己の予定や義務、他者への助言を述べる際によく用いられます。",
    "formation": "動詞ない形 ＋ といけない／といけません",
    "examples": [
      {
        "translation": "明日試験があるから、今夜勉強しないといけない。"
      },
      {
        "translation": "９時に出発しないといけない。"
      },
      {
        "translation": "風邪をひかないように、手をよく洗わないといけない。"
      },
      {
        "translation": "この仕事は明日までに終わらないといけない。"
      }
    ]
  },
  "ja_なきゃいけない_103": {
    "title": "～なきゃいけない (〜nakya ikenai)",
    "shortExplanation": "「～なければいけない」の口語的・くだけた縮約表現で、義務や必然性を表し、「〜しなければならない」という意味を表します。",
    "longExplanation": "「～なきゃいけない」は、「～なければいけない」の「なければ」が口語で「なきゃ」に変化した日常会話表現です。しなければならない義務や予定、差し迫った必要性を親しい相手に伝える際に非常によく用いられます。さらに日常会話では文末の「いけない」を省略して「〜なきゃ（例：早く行かなきゃ）」だけで済ませることも一般的です。",
    "formation": "動詞ない形（語尾の「い」を除く） ＋ なきゃいけない／なきゃいけません",
    "examples": [
      {
        "translation": "明日までに宿題を終わらなきゃいけない。"
      },
      {
        "translation": "もうすぐ出かけるから、急いで準備しなきゃいけない。"
      },
      {
        "translation": "このプロジェクトは来週提出しなきゃいけない。"
      },
      {
        "translation": "電車に乗る前に、切符を買わなきゃいけない。"
      }
    ]
  },
  "ja_なくちゃいけない_104": {
    "title": "～なくちゃいけない (〜naku cha ikenai)",
    "shortExplanation": "義務や必要性があることを表す口語表現で、「〜しなければならない」という意味を表します。",
    "longExplanation": "「～なくちゃいけない」は、「～なくてはいけない」の口語的な縮約表現（「なくては」が「なくちゃ」に変化したもの）です。状況や規則などにより、その行為を行う義務や必要性があることを表します。日常会話で親しい間柄に対して非常によく使われます。丁寧な形には「～なくちゃいけません」があります。",
    "formation": "動詞ない形（「ない」を除く）＋ なくちゃいけない／なくちゃいけません",
    "examples": [
      {
        "translation": "仕事に行かなくちゃいけないので、早起きしなければなりません。"
      },
      {
        "translation": "試験があるから、勉強しなくちゃいけません。"
      },
      {
        "translation": "パスポートを更新しなくちゃいけないので、大使館に行かなければ。"
      },
      {
        "translation": "今日はお金を払わなくちゃいけないから、銀行に行かないと。"
      }
    ]
  },
  "ja_なくてはいけない_105": {
    "title": "～なくてはいけない (〜nakute wa ikenai)",
    "shortExplanation": "義務や必要性があることを表し、「〜しなければならない」という意味を表します。",
    "longExplanation": "「～なくてはいけない」は、動詞のない形に「くては」と「いけない」が接続した表現で、「それをしないと都合が悪い、許されない」という論理から、必然的にその行為をする義務や必要性があることを表します。日常会話から公の場面まで幅広く使われます。丁寧な形には「～なくてはいけません」があります。",
    "formation": "動詞ない形（「ない」を除く）＋ くてはいけない／くてはいけません",
    "examples": [
      {
        "translation": "宿題をしなくてはいけない。"
      },
      {
        "translation": "この手紙を明日までに出さなくてはいけない。"
      },
      {
        "translation": "食べ物を無駄にしなくてはいけない。"
      },
      {
        "translation": "早退したいが、授業が終わるまで待たなくてはいけない。"
      }
    ]
  },
  "ja_なくてもいい_106": {
    "title": "～なくてもいい (〜nakutemo ii)",
    "shortExplanation": "行為を行う必要がないことや、しなくても構わないという許可を表し、「〜しなくてもよい」という意味を表します。",
    "longExplanation": "「～なくてもいい」は、動詞のない形に「くてもいい」が接続した表現で、その行為を行う義務や必然性がなく、しなくても問題や支障がないことを表します。相手に対して「無理にしなくていい」と配慮や許可を与える際によく使われます。丁寧な形には「～なくてもいいです」があります。",
    "formation": "動詞ない形（「ない」を除く）＋ くてもいい／くてもいいです",
    "examples": [
      {
        "translation": "コーヒーは飲まなくてもいいです。"
      },
      {
        "translation": "宿題を今日しなくてもいいです。"
      },
      {
        "translation": "すぐに返事をしなくてもいいですよ。"
      },
      {
        "translation": "全部食べなくてもいいですから、無理しないでください。"
      }
    ]
  },
  "ja_なければ_107": {
    "title": "～なければ ならない (〜nakereba naranai)",
    "shortExplanation": "義務や当然すべき行為を表し、「〜しなければならない」という意味を表します。",
    "longExplanation": "「～なければならない」は、動詞のない形に仮定条件の「ば」が付いた「～なければ」と「ならない」が組み合わさった表現です。社会的な規範、法律、道徳、あるいは客観的な状況から判断して、その行為を行うことが不可欠であることを表します。改まった場面や書き言葉でも広く使われます。丁寧な形には「～なければなりません」があります。",
    "formation": "動詞ない形（「ない」を除く）＋ ければならない／ければなりません",
    "examples": [
      {
        "translation": "宿題をやらなければならない。"
      },
      {
        "translation": "明日までにこの本を読まなければならない。"
      },
      {
        "translation": "授業に遅れないように、早く起きなければならない。"
      },
      {
        "translation": "旅行に行く前に切符を買わなければならない。"
      }
    ]
  },
  "ja_に_108": {
    "title": "～に (〜ni)",
    "shortExplanation": "動作の時点、目的地・帰着点、相手、存在場所、目的などを表す格助詞です。",
    "longExplanation": "格助詞「に」は日本語の中で最も多岐にわたる用法を持つ助詞の一つです。主な働きとして以下が挙げられます。\n1. 動作の行われる具体的な時間（7時に起きる）。\n2. 移動の目的地や帰着点（東京に引っ越す、銀行に預ける）。\n3. 動作の向かう相手・対象（私にケーキを作る）。\n4. 人や物の存在する場所（庭に犬がいる）。\n5. 移動動作の目的（買い物に行く）。",
    "formation": "名詞 ＋ に / 動詞ます形語幹 ＋ に",
    "examples": [
      {
        "translation": "母は私にケーキを作りました。"
      },
      {
        "translation": "彼女は東京に引っ越しました。"
      },
      {
        "translation": "銀行にお金を預けます。"
      },
      {
        "translation": "私は７時に起きます。"
      }
    ]
  },
  "ja_ので_109": {
    "title": "～ので (〜node)",
    "shortExplanation": "客観的な理由や原因を丁寧に表す接続助詞で、「〜だから」「〜のために」という意味を表します。",
    "longExplanation": "接続助詞「ので」は、前件が後件の自然な成り行きとしての理由・原因であることを表します。主観的・感情的な主張になりやすい「から」に比べ、「ので」は客観的な事実に基づいているニュアンスがあり、語感が柔らかく丁寧です。そのため、お願いや断り、謝罪の場面などで広く好んで用いられます。",
    "formation": "動詞・い形容詞普通形 ＋ ので / な形容詞語幹 ＋ なので / 名詞 ＋ なので",
    "examples": [
      {
        "translation": "明日試験があるので、今晩勉強します。"
      },
      {
        "translation": "このドレスが高いので、買わないことにします。"
      },
      {
        "translation": "田中さんは病気なので、今日は来ません。"
      },
      {
        "translation": "雨が降っているので、外に出ない方がいいですよ。"
      }
    ]
  },
  "ja_のです_110": {
    "title": "～のです (〜no desu)",
    "shortExplanation": "事態の背景や理由・事情を説明・強調する表現で、「〜わけなのです」「実は〜なのです」という意味を表します。",
    "longExplanation": "「～のです」（口語では「～んです」）は、文末に用いて、話し手が目の前の状況について理由や背景、事情を説明したり、自分の言いたいことを強調したりする表現です。聞き手に対して「こういう事情があるのです」と理解を促すニュアンスを含みます。疑問文では、相手に理由や詳細な説明を求める表現になります。",
    "formation": "動詞・い形容詞普通形 ＋ のです / な形容詞語幹 ＋ なのです / 名詞 ＋ なのです",
    "examples": [
      {
        "translation": "この本は難しいのです。"
      },
      {
        "translation": "明日は忙しいのです。"
      },
      {
        "translation": "彼女は英語の先生なのです。"
      },
      {
        "translation": "私は風邪なのです。"
      }
    ]
  },
  "ja_のに_111": {
    "title": "～のに (〜no ni)",
    "shortExplanation": "予想と反する事態に対する逆接（「〜にもかかわらず」）や、目的・用途（「〜のために」）を表します。",
    "longExplanation": "「～のに」には主に2つの用法があります。\n1. 逆接の接続助詞：前件から当然予想される結果とは異なる事態が後件に生じることを表し、不満、意外、残念などの話し手の感情が込められます（「〜のに〜ない」）。\n2. 目的・用途：動詞辞書形に接続し、「〜という目的のために」「〜する用途で」という意味を表し、後ろに「必要だ」「使う」「時間がかかる」などが続きます。",
    "formation": "【逆接】動詞・い形容詞普通形 ＋ のに / な形容詞語幹 ＋ なのに / 名詞 ＋ なのに | 【目的】動詞辞書形 ＋ のに",
    "examples": [
      {
        "translation": "遅刻したのに、先生は怒らなかった。"
      },
      {
        "translation": "彼は疲れているのに、まだ働いています。"
      },
      {
        "translation": "勉強するのに静かな場所が必要です。"
      },
      {
        "translation": "健康のために毎日運動するのに、うちでヨガをしている。"
      }
    ]
  },
  "ja_ばいい_112": {
    "title": "～ばいい (〜ba ii)",
    "shortExplanation": "助言や提案、解決策を表し、「〜すればよい」「〜するのが適当だ」という意味を表します。",
    "longExplanation": "「～ばいい」は、仮定形「～ば」に「いい」が接続した表現で、相手に対して問題の解決策やアドバイス、提案を行う際に使われます。「それを行えば十分だ、問題が解決する」というニュアンスを含みます。疑問形「〜ばいいですか」の形では、どのように行動すべきかアドバイスを求める表現になります。",
    "formation": "動詞仮定形（ば形）＋ いい / い形容詞語尾「い」→「ければ」＋ いい / な形容詞語幹 ＋ であればいい / 名詞 ＋ であればいい",
    "examples": [
      {
        "translation": "もっと勉強すればいい。"
      },
      {
        "translation": "お腹が空いたら、何か食べればいい。"
      },
      {
        "translation": "もっと速く走ればいい。"
      },
      {
        "translation": "わからなければ、先生に聞けばいい。"
      }
    ]
  },
  "ja_まで_113": {
    "title": "～まで (〜made)",
    "shortExplanation": "時間や空間、動作の及ぶ限界・終点を表し、「〜に至るまで」「〜までも」という意味を表します。",
    "longExplanation": "助詞「まで」は主に以下の2つの用法を持ちます。\n1. 限度・終点：時間的・空間的な到達点や、動作・状態が継続する終点を表します（「〜まで待つ」「駅から学校まで」）。「〜から〜まで」の形で起点と終点を対比させることも多いです。\n2. 極端な例示：意外な事柄を挙げて「その程度にまで及ぶ」という極端さを強調します（「子供にまで知られている」）。",
    "formation": "動詞辞書形 ＋ まで / 名詞 ＋ まで",
    "examples": [
      {
        "translation": "仕事が終わるまで待っています。"
      },
      {
        "translation": "ここから駅まで歩いて10分かかります。"
      },
      {
        "translation": "私は彼が成功するまで応援します。"
      },
      {
        "translation": "彼女は猫まで好きです。"
      }
    ]
  },
  "ja_までに_114": {
    "title": "～までに (〜made ni)",
    "shortExplanation": "動作や事態が完了していなければならない最終期限を表し、「〜までに（終える）」という意味を表します。",
    "longExplanation": "「～までに」は、ある瞬間的な動作や行為が、その時点より前に完了しているべき最終期限・タイムリミットを表します。その時点まで動作が継続することを表す「～まで」とは異なり、「～までに」はその期限が来る前のどこかの時点で行為が完了していればよいことを意味します。締め切りや約束の時間を指定する際によく使われます。",
    "formation": "動詞辞書形 ＋ までに / 時間・名詞 ＋ までに",
    "examples": [
      {
        "translation": "明日の朝８時までに起きてください。"
      },
      {
        "translation": "来週の金曜日までにレポートを提出してください。"
      },
      {
        "translation": "彼が帰るまでに料理を終わらせたい。"
      },
      {
        "translation": "３０分までに駅に着く必要があります。"
      }
    ]
  },
  "ja_まま_115": {
    "title": "～まま (〜mama)",
    "shortExplanation": "ある状態が変化せずにそのまま保たれていることを表し、「〜の状態のまま」という意味を表します。",
    "longExplanation": "「～まま」は、前に行った動作の結果や状態が変化せず、そのまま保たれた状態で次の動作を行うことを表します。本来なら変えるべき状態（ドアを閉める、電気を消すなど）を変えずに放置しているという不自然さや不注意のニュアンスを含むことが多いです。名詞や形容詞に接続して、元のままの状態を維持することを表すこともあります。",
    "formation": "動詞た形・ない形 ＋ まま / い形容詞 ＋ まま / な形容詞語幹 ＋ なまま / 名詞 ＋ のまま",
    "examples": [
      {
        "translation": "ドアを開けたまま出かけてしまった。"
      },
      {
        "translation": "彼は目覚まし時計を止めたまま寝てしまった。"
      },
      {
        "translation": "その部屋はきれいなままにしておいてください。"
      },
      {
        "translation": "彼女は子供のままの心を持っている。"
      }
    ]
  },
  "ja_みたいだ_116": {
    "title": "～みたいだ (〜mitai da)",
    "shortExplanation": "直感的な観察による推測（「〜のようだ」）や、例え・比喩（「〜に似ている」）を表す口語表現です。",
    "longExplanation": "「～みたいだ」は、「～ようだ」の口語的表現で、親しい間柄での日常会話で非常によく使われます。\n1. 推量：五感で得た直感的な印象に基づいて「どうやら〜らしい」「〜に見える」と判断することを表します。\n2. 比喩：他のものに似ていることを例えて「まるで〜のようだ」と表現します。丁寧な形には「～みたいです」があります。",
    "formation": "動詞・い形容詞普通形 ＋ みたいだ / な形容詞語幹 ＋ みたいだ / 名詞 ＋ みたいだ",
    "examples": [
      {
        "translation": "彼女が病気のみたいだ。"
      },
      {
        "translation": "このドレスは高いみたいだ。"
      },
      {
        "translation": "あの人は有名人みたいだ。"
      },
      {
        "translation": "彼は今忙しいみたいだ。"
      }
    ]
  },
  "ja_も_117": {
    "title": "～も (〜mo)",
    "shortExplanation": "同類事物の追加や並立を表す係助詞で、「〜もまた」「〜さえ」という意味を表します。",
    "longExplanation": "係助詞「も」は、前に述べられたことと同じ事柄や性質が及ぶことを表し、「〜も同様に」という意味を表します。「AもBも」の形で並立を表したり、数量詞について「〜も（たくさん）」と数量の多さを強調したり、疑問詞＋「も」＋否定の形で全面否定を表すなど、多様な働きを持ちます。",
    "formation": "名詞 ＋ も（動詞て形 ＋ も）",
    "examples": [
      {
        "translation": "私もお寿司が好きです。"
      },
      {
        "translation": "彼女は英語も日本語も話せます。"
      },
      {
        "translation": "その映画は面白いし、彼も見たいと言っています。"
      },
      {
        "translation": "今日は寒いです。明日も寒いでしょう。"
      }
    ]
  },
  "ja_ようだ_118": {
    "title": "～ようだ (〜you da)",
    "shortExplanation": "客観的な根拠に基づく推量（「〜のようだ」）や、比喩（「まるで〜のようだ」）を表す表現です。",
    "longExplanation": "助動詞「～ようだ」は、「～みたいだ」よりも改まった文章語的な表現で、主に以下の2つの用法があります。\n1. 不確実な断定・推量：五感で得た客観的な情報や状況証拠に基づいて「〜の様子である」「〜と思われる」と判断する。\n2. 比喩：ある状態を別のものに例え、「まるで〜のようだ」と表す。",
    "formation": "動詞・い形容詞普通形 ＋ ようだ / な形容詞語幹 ＋ なようだ / 名詞 ＋ のようだ",
    "examples": [
      {
        "translation": "彼は元気がないようだ。"
      },
      {
        "translation": "この料理は美味しいようだ。"
      },
      {
        "translation": "彼女は有名人のようだ。"
      },
      {
        "translation": "この部屋は図書館のようだ。"
      }
    ]
  },
  "ja_んです_119": {
    "title": "～んです (〜n desu)",
    "shortExplanation": "理由や事情を説明したり、状況の背景を強調したりする表現で、「〜のです」「〜わけです」という意味を表します。",
    "longExplanation": "「～んです」（書き言葉の「～のだ」、くだけた口語の「～んだ」の丁寧な表現）は、相手に対してある事態や行動の理由・原因・事情を説明したり、背景にある情報を強調して伝えたりするときに用いる文法です。相手との共感や理解を促すニュアンスを含みます。動詞・い形容詞の普通形にそのまま接続し、な形容詞や名詞の現在肯定形には「だ」の代わりに「な」をつけて「～なんです」の形をとります。",
    "formation": "動詞普通形 ＋ んです / い形容詞普通形 ＋ んです / な形容詞語幹 ＋ なんです / 名詞 ＋ なんです",
    "examples": [
      {
        "translation": "遅れたんですが、電車が遅れました。"
      },
      {
        "translation": "疲れたんです。"
      },
      {
        "translation": "彼は優しいんです。"
      },
      {
        "translation": "宿題が多いんです。"
      }
    ]
  },
  "ja_文Aそのうえ_120": {
    "title": "文A。そのうえ 文B。",
    "shortExplanation": "前の文の内容にさらに別の情報を付け加える接続表現で、「それに加えて」「さらに」「おまけに」という意味を表します。",
    "longExplanation": "「そのうえ（その上）」は、文Aで述べた事柄に加えて、同じ方向性（良いことには良いこと、悪いことには悪いこと）の新しい事実や情報を文Bで付け足す接続詞です。「それに加えて」「さらに」「おまけに」などの意味を持ち、事態の累積や強調を表します。",
    "formation": "文A。 ＋ そのうえ（その上）、 ＋ 文B。",
    "examples": [
      {
        "translation": "このソフトウェアは使いやすい。そのうえ、価格も手ごろだ。"
      },
      {
        "translation": "彼女は美人だ。そのうえ、頭もいい。"
      },
      {
        "translation": "この映画は面白い。そのうえ、俳優たちの演技も素晴らしい。"
      },
      {
        "translation": "東京はたくさんの観光スポットがある。そのうえ、美味しいレストランも多い。"
      }
    ]
  },
  "ja_文Aそれで_121": {
    "title": "文A。それで 文B (Bun A. Sorede Bun B)",
    "shortExplanation": "前後の文の因果関係を表し、「だから」「その結果」「そういうわけで」という意味を表します。",
    "longExplanation": "「それで」は、文Aを原因・理由・きっかけとして、その結果として生じた事態や自然な帰結を文Bで述べる順接の接続詞です。日常会話や出来事の経緯を説明するときによく用いられ、「そのため」「そういうわけで」「その結果」などのニュアンスを持ちます。後続の文には自然な結果や過去の事実が来ることが多く、命令や強い働きかけの文にはあまり用いられません。",
    "formation": "文A。 ＋ それで、 ＋ 文B。",
    "examples": [
      {
        "translation": "今日は暑いです。それで、エアコンをつけました。"
      },
      {
        "translation": "電車が遅れました。それで、仕事に遅れてしまいました。"
      },
      {
        "translation": "彼は疲れている。それで、早く寝ることにした。"
      },
      {
        "translation": "試験に合格しました。それで、友達とお祝いパーティーを開きました。"
      }
    ]
  },
  "ja_文Aそれに_122": {
    "title": "文A。それに 文B (Bun A. Soreni Bun B)",
    "shortExplanation": "前の文の内容に別の事柄や理由を付け足す接続表現で、「さらに」「そのうえ」「おまけに」という意味を表します。",
    "longExplanation": "「それに」は、文Aで述べた事柄に対して、さらに別の事実、特徴、根拠などを並列的に付け加える接続詞です。自分の意見や描写を補強・強調する際によく用いられ、「さらに」「そのうえ」「加えて」などのニュアンスを持ちます。原因と結果を示すのではなく、同類の情報の追加を表す点に特徴があります。",
    "formation": "文A。 ＋ それに、 ＋ 文B。",
    "examples": [
      {
        "translation": "彼は頭がいい。それに、スポーツも得意だ。"
      },
      {
        "translation": "このケーキはおいしい。それに、値段も安い。"
      },
      {
        "translation": "私は日本語が話せます。それに、韓国語も話せます。"
      },
      {
        "translation": "彼女は美人だ。それに、性格もいい。"
      }
    ]
  },
  "ja_文Aだから_123": {
    "title": "文A。だから 文B (Bun A. Dakara Bun B)",
    "shortExplanation": "前の文を理由・根拠として後の文で結論や主張を導く接続表現で、「だから」「したがって」「そういう理由で」という意味を表します。",
    "longExplanation": "「だから」は、文Aで理由・根拠を述べ、それを受けた文Bで判断・行動・提案・意志などを導く順接の接続詞です。「それで」が客観的な成り行きを述べるのに対し、「だから」の後ろには話者の強い意志、推量、提案、働きかけ（指示や勧誘）なども自然に続くことができます。",
    "formation": "文A。 ＋ だから、 ＋ 文B。",
    "examples": [
      {
        "translation": "明日は試験だ。だから今日勉強しなければならない。"
      },
      {
        "translation": "この料理は簡単だ。だから初心者でも作れる。"
      },
      {
        "translation": "彼は病気だ。だから今日学校を休む。"
      },
      {
        "translation": "駅まで遠い。だからタクシーで行ったほうがいい。"
      }
    ]
  },
  "ja_うちに_1": {
    "title": "～うちに (〜uchi ni)",
    "shortExplanation": "ある状態が変化する前にその行動をすること、またはある状態が続いている間に別の事態が生じることを表し、「〜の間に」「〜ない前に」という意味を表します。",
    "longExplanation": "「～うちに」には主に2つの用法があります。(1) ある状況や状態が変化してしまう前に、機会を逃さず何かを行うことを表す用法（「〜の間にしておく」「〜ない前にする」）；(2) ある状態が続いている時間の間に、予期せぬ変化や別の事態が自然と起こることを表す用法（「〜している間に…になった」）。動詞の辞書形・ている形・ない形、い形容詞、な形容詞（＋な）、名詞（＋の）に接続します。",
    "formation": "動詞辞書形 / ている形 / ない形 ＋ うちに / い形容詞 ＋ うちに / な形容詞語幹 ＋ なうちに / 名詞 ＋ のうちに",
    "examples": [
      {
        "translation": "若いうちに、いろいろな経験をしておくことが大切です。"
      },
      {
        "translation": "雨が降っていないうちに、買い物に行こう。"
      },
      {
        "translation": "料理が熱いうちに食べましょう。"
      },
      {
        "translation": "休みのうちに、旅行の計画を立てたいです。"
      }
    ]
  },
  "ja_うとした_2": {
    "title": "～うとした (〜uto shita)",
    "shortExplanation": "まさにその動作を行おうとした直前に妨げが入り、実現しなかったことを表し、「〜しようとしたが」「〜する直前だったが」という意味を表します。",
    "longExplanation": "「～（よ）うとした（が／けれど）」は、ある動作を開始しようと試みたり、直前まで準備したりしていたものの、予期せぬ障害や事情によってその動作が途中で妨げられたり、実行できなかったりした事態を表す文法です。動詞の意向形（意志形）に「とした」を接続し、後には「が」や「けれど」などの逆接が続くのが一般的です。",
    "formation": "動詞意向形（意志形） ＋ とした（が／けれど）",
    "examples": [
      {
        "translation": "電話に出ようとしたが、相手は切ってしまった。"
      },
      {
        "translation": "彼は大声で話そうとしたが、言葉が出なかった。"
      },
      {
        "translation": "ケーキを作ろうとしたが、材料が足りなかった。"
      },
      {
        "translation": "彼女は泳ごうとしたが、怖くて水に入れなかった。"
      }
    ]
  },
  "ja_おかげで_3": {
    "title": "～おかげで (〜okagede)",
    "shortExplanation": "人の恩恵や有利な原因によって良い結果になったことを表し、感謝の意を込めて「〜のおかげで」「〜に助けられて」という意味を表します。",
    "longExplanation": "「～おかげで」は、誰かの助力や好都合な条件・事態が原因となって、望ましい良い結果がもたらされたときに感謝や安堵の気持ちを込めて用いる文法です（皮肉として悪い結果を他人のせいにする際にも使われます）。動詞・い形容詞の普通形、な形容詞（＋な）、名詞（＋の）に接続します。",
    "formation": "動詞普通形 ＋ おかげで / い形容詞 ＋ おかげで / な形容詞語幹 ＋ なおかげで / 名詞 ＋ のおかげで",
    "examples": [
      {
        "translation": "お母さんのおかげで、私は元気になりました。"
      },
      {
        "translation": "先生の助けのおかげで、試験に合格しました。"
      },
      {
        "translation": "日本語の勉強のおかげで、この映画が理解できました。"
      },
      {
        "translation": "晴れた天気のおかげで、ピクニックが楽しかったです。"
      }
    ]
  },
  "ja_かけ_4": {
    "title": "～かけ (〜kake)",
    "shortExplanation": "動作が始まってまだ途中であり、完了していない状態を表し、「〜しかけて途中の」「〜しかけの」という意味を表します。",
    "longExplanation": "「～かけ」（主に「～かけの＋名詞」や「～かけだ」の形をとる）は、動詞のます形語幹に接続して、ある動作をやり始めて途中のままであったり、完了せずに中断していたりする状態を表す表現です。「やりかけ」「食べかけ」「読みかけ」のように、まだ終わっていない事柄を示します。",
    "formation": "動詞ます形語幹 ＋ かけ（だ／の＋名詞）",
    "examples": [
      {
        "translation": "彼は食事を食べかけです。"
      },
      {
        "translation": "この本は読みかけで、まだ終わっていません。"
      },
      {
        "translation": "この部屋は掃除しかけで、まだ片づいていません。"
      },
      {
        "translation": "プロジェクトは進行しかけで、来週には完了する予定です。"
      }
    ]
  },
  "ja_かなあ_5": {
    "title": "～かなあ (〜kanaa)",
    "shortExplanation": "独り言や親しい間柄で、不確かさ・疑問や淡い願望を表し、「〜だろうか」「〜かな」という意味を表します。",
    "longExplanation": "終助詞「～かなあ」（「かな」を伸ばした形）は、主に独り言や親しい相手との気軽な会話において、ある事柄に対して確信が持てず疑問に思ったり、控えめな推量や願望をつぶやいたりする際に用いられます。「〜だろうか」「〜かしら」という自問の気持ちを表します。動詞・い形容詞の普通形、な形容詞や名詞に接続します。",
    "formation": "動詞普通形 ＋ かなあ / い形容詞 ＋ かなあ / な形容詞語幹 (＋ だ) ＋ かなあ / 名詞 (＋ だ) ＋ かなあ",
    "examples": [
      {
        "translation": "明日晴れるかなあ。"
      },
      {
        "translation": "このスープ、辛いかなあ。"
      },
      {
        "translation": "彼は静かだかなあ。"
      },
      {
        "translation": "彼女は医者だかなあ。"
      }
    ]
  },
  "ja_ないで_6": {
    "title": "～ないで (〜naide)",
    "shortExplanation": "前の動作を行わない状態で後ろの動作を行うことを表し、「〜せずに」「〜しないで」という意味を表します。",
    "longExplanation": "「～ないで」は、動詞のない形に助詞「で」が接続した形で、本来行われるはずの動作や予期される動作を行わない状態（付帯状況）のまま、主となる後続の動作を実行することを表します。「〜せずに」「〜しないまま」と言い換えることができます。",
    "formation": "動詞ない形 ＋ で",
    "examples": [
      {
        "translation": "会わないでその電話をかけました。"
      },
      {
        "translation": "雨が降るのを待たないで、家を出ました。"
      },
      {
        "translation": "誰にも聞かないで、その秘密を知りました。"
      },
      {
        "translation": "遅れることを知らないで、駅に向かいました。"
      }
    ]
  },
  "ja_からにかけて_7": {
    "title": "～から～にかけて (〜kara 〜ni kakete)",
    "shortExplanation": "時間や空間、範囲の大まかな始まりから終わりまでを表し、「〜から〜の間」「〜から〜にわたって」という意味を表します。",
    "longExplanation": "「～から～にかけて」は、時や場所、数量などのおおよその範囲を示す文法です。境界線がはっきりとした区切りを示す「〜から〜まで」と異なり、始点と終点の境界が緩やかで、その範囲全体にわたって状態や事態が継続的または断続的に及んでいることを表します。",
    "formation": "名詞（時・場所・範囲） ＋ から ＋ 名詞 ＋ にかけて",
    "examples": [
      {
        "translation": "午前８時から午後５時にかけて働いています。"
      },
      {
        "translation": "この地域は、北から南にかけて狭いです。"
      },
      {
        "translation": "１０歳から２０歳にかけて成長が早いです。"
      },
      {
        "translation": "今年の夏は、６月から８月にかけて雨が多かった。"
      }
    ]
  },
  "ja_かわりに_8": {
    "title": "～かわりに (〜kawari ni)",
    "shortExplanation": "別の物事で代用すること、または補償や交換条件を表し、「〜の代わりに」「〜をしないで別のことを」という意味を表します。",
    "longExplanation": "「～かわりに」には主に2つの用法があります。(1) ある行動や人・物に代えて別の行動や人・物で代用することを表す用法（「〜をしないで別のことをする」「〜の代理として」）；(2) 一方の事柄に対して見返りや代償、埋め合わせの関係があることを表す用法（「〜という良い点がある一方で」「〜する代わりに」）。動詞・い形容詞の普通形、な形容詞（＋な）、名詞（＋の）に接続します。",
    "formation": "動詞普通形 ＋ かわりに / い形容詞 ＋ かわりに / な形容詞語幹 ＋ なかわりに / 名詞 ＋ のかわりに",
    "examples": [
      {
        "translation": "映画を見るかわりに、本を読んだ。"
      },
      {
        "translation": "お酒を飲むかわりに、水を飲んでください。"
      },
      {
        "translation": "犬のかわりに、猫を飼いたいです。"
      },
      {
        "translation": "電車を使わないかわりに、自転車で行くことにしました。"
      }
    ]
  },
  "ja_きり_9": {
    "title": "～きり (〜kiri)",
    "shortExplanation": "ある動作が行われた後、その状態がずっと続いて次の変化や動作が起こらないことを表し、「〜したきり」「〜したまま」という意味を表します。",
    "longExplanation": "「～きり」には主に2つの用法があります。(1) 動詞の過去形（た形）に接続し、その動作が行われて以来、状態がそのまま続いて予想される次の事態が起こらないことを表す用法（後続文には否定文が来ることが多く、「〜したきり…ない」「〜したままその後の変化がない」という意味になります）；(2) 名詞や数量詞に接続して、それ以外にはないという限定を表す用法（「二人きり」「これっきり」など）。",
    "formation": "動詞た形 ＋ きり（または動詞て形 ＋ きり） / 名詞 ＋ きり",
    "examples": [
      {
        "translation": "彼は出かけたきり帰ってきません。"
      },
      {
        "translation": "昨日コーヒーを飲んだきり、何も飲まなかった。"
      },
      {
        "translation": "卒業したきり、彼女に会っていません。"
      },
      {
        "translation": "その映画を見たきり、もう一度見たいと思っています。"
      }
    ]
  },
  "ja_くせに_10": {
    "title": "～くせに (〜kuse ni)",
    "shortExplanation": "相手に対する非難や不満、軽蔑の気持ちを表し、「〜のに」「〜のくせに」という意味を表します。",
    "longExplanation": "「～くせに」は、前項の事実・状態から当然期待されることとは反対の行動をとることに対して、話し手が非難、不満、蔑みなどの否定的な感情を込めて述べる表現です。主に相手や第三者に対して用いられ、自分自身の行為には原則として使いません。",
    "formation": "動詞普通形 ＋ くせに / い形容詞 ＋ くせに / な形容詞 ＋ なくせに / 名詞 ＋ のくせに",
    "examples": [
      {
        "translation": "彼はお金持ちのくせに、ケチです。"
      },
      {
        "translation": "この部屋が汚いくせに、文句を言うな。"
      },
      {
        "translation": "彼は暇なくせに、手伝ってくれません。"
      },
      {
        "translation": "彼女は美人なくせに、デートが続かない。"
      }
    ]
  },
  "ja_くらい_11": {
    "title": "～くらい (〜kurai)",
    "shortExplanation": "およその数量や時間、または状態・動作の程度を表し、「〜くらい」「〜ほど」「〜するほど」という意味を表します。",
    "longExplanation": "「～くらい」（「～ぐらい」とも言う）は、数量詞などに接続しておよその数量や時間を示す用法（「約〜」「〜ほど」）と、動詞や形容詞などに接続してある状態や動作の程度・レベルを例示・比喩的に示す用法（「〜するほど」）があります。",
    "formation": "動詞普通形 ＋ くらい / い形容詞 ＋ くらい / な形容詞 ＋ なくらい / 名詞 ＋ くらい",
    "examples": [
      {
        "translation": "１０分くらい待ちましょう。"
      },
      {
        "translation": "彼女はその映画を５回くらい見ました。"
      },
      {
        "translation": "その本は面白いくらい難しいです。"
      },
      {
        "translation": "この部屋はきれいなくらい広いです。"
      }
    ]
  },
  "ja_くらいはない_12": {
    "title": "～くらい～は～ない (〜kurai 〜wa 〜nai)",
    "shortExplanation": "最低限の基準や義務を強調し、「せめて〜くらいは〜（ないといけない）」という意味を表します。",
    "longExplanation": "「～くらい～は～ない」（会話では「～くらいは～ない／ないと」の形で頻出）は、ある状況において満たすべき最低限の条件や期待を強調する表現です。「他のことはともかく、せめてこれくらいはしなければならない」という最低限の要求・義務感を表します。",
    "formation": "名詞 / 動詞普通形 ＋ くらい ＋ は ＋ 動詞否定形（～ない／～ないと） / 形容詞 ＋ くらい ＋ は ＋ 形容詞否定形",
    "examples": [
      {
        "translation": "週に一度くらいはジムに行かないと。"
      },
      {
        "translation": "毎日くらいは歯を磨かないと。"
      },
      {
        "translation": "この問題くらいは解決しないと。"
      },
      {
        "translation": "彼女が泣いているくらいなら慰めないと。"
      }
    ]
  },
  "ja_こそ_13": {
    "title": "～こそ (〜koso)",
    "shortExplanation": "特定の事柄や人物、時などを強く強調し、「まさに〜」「〜こそが」という意味を表します。",
    "longExplanation": "「～こそ」は、取り立て助詞の一つで、他のものを排して特定の事物、人物、時、理由などを強く強調する文法表現です。話し手の強い確信や決意を表す場面のほか、「こちらこそ」などの挨拶の返答、また「〜てこそ」の形で必要不可欠な条件を示す際にもよく用いられます。",
    "formation": "名詞 ＋ こそ / 動詞て形 ＋ こそ",
    "examples": [
      {
        "translation": "今日こそ勉強しなければなりません。"
      },
      {
        "translation": "あなたこそ私の一番の友達です。"
      },
      {
        "translation": "お金がないことこそ幸せの秘訣ではないか。"
      },
      {
        "translation": "彼こそまさにプロの歌手のように歌える。"
      }
    ]
  },
  "ja_こと_14": {
    "title": "～こと (〜koto)",
    "shortExplanation": "動詞や節を名詞化し、「〜すること」「〜という行為・事実」という意味を表します。",
    "longExplanation": "形式名詞「こと」は、動詞の普通形に接続して動詞や述語節を抽象的な名詞句に変える働きをします。これにより、動作や行為そのものを文の主語、目的語、補語として扱うことが可能になり、助詞「が」「は」「を」「に」などと自由に結びつきます。",
    "formation": "動詞普通形 ＋ こと",
    "examples": [
      {
        "translation": "日本語を話すことができます。"
      },
      {
        "translation": "毎日運動することは健康に良いです。"
      },
      {
        "translation": "彼はピアノを弾くことが大好きです。"
      },
      {
        "translation": "映画を見ることに時間を使いたくない。"
      }
    ]
  },
  "ja_ことだ_15": {
    "title": "～ことだ (〜koto da)",
    "shortExplanation": "相手に対する忠告や助言を表し、「〜するのがよい」「〜すべきだ」という意味を表します。",
    "longExplanation": "「～ことだ」は、動詞の辞書形またはない形に接続し、その状況において相手が取るべき望ましい行動やアドバイスを述べる文法表現です。「〜することが大切だ」「〜するのが一番良い」というニュアンスを含み、目上の人や経験者が目下の人に助言する場面などで多く使われます。",
    "formation": "動詞辞書形 / 動詞ない形 ＋ ことだ",
    "examples": [
      {
        "translation": "毎日運動することだ。"
      },
      {
        "translation": "健康のために、野菜をたくさん食べることだ。"
      },
      {
        "translation": "勉強しているとき、静かな場所を選ぶことだ。"
      },
      {
        "translation": "辞書を使って、新しい言葉を覚えることだ。"
      }
    ]
  },
  "ja_ことにしている_16": {
    "title": "～ことにしている (〜koto ni shite iru)",
    "shortExplanation": "自分の意志で決めた習慣や規則を表し、「いつも〜することに決めている」「〜するようにしている」という意味を表します。",
    "longExplanation": "「～ことにしている」は、動詞の辞書形またはない形に接続し、話し手自身の自発的な意志や決意によって定めた習慣、生活上のルール、または意識的に続けている行動を表します。「習慣として〜することを自分に課している」というニュアンスを含みます。",
    "formation": "動詞辞書形 / 動詞ない形 ＋ ことにしている",
    "examples": [
      {
        "translation": "毎日運動することにしている。"
      },
      {
        "translation": "夜遅くまで働かないことにしている。"
      },
      {
        "translation": "食事の後、歯を磨くことにしている。"
      },
      {
        "translation": "会議には必ず10分前に着くことにしている。"
      }
    ]
  },
  "ja_ことになっている_17": {
    "title": "～ことになっている (〜koto ni natte iru)",
    "shortExplanation": "組織の規則や法律、社会的な慣習、または決定された予定を表し、「〜という決まりになっている」「〜する予定だ」という意味を表します。",
    "longExplanation": "「～ことになっている」は、個人の意志ではなく、組織の規則、法律、社会通念、契約、または他者との間で取り決められた客観的な予定や慣習を表す文法表現です。「個人の意志による習慣」を表す「〜ことにしている」と対比してよく用いられます。",
    "formation": "動詞辞書形 / 動詞ない形 ＋ ことになっている",
    "examples": [
      {
        "translation": "この会社では、20時には仕事を終えることになっている。"
      },
      {
        "translation": "日本では、18歳以上の人が選挙に投票することになっている。"
      },
      {
        "translation": "学校では、制服を着ることになっている。"
      },
      {
        "translation": "田中さんが今回のプロジェクトリーダーになることになっている。"
      }
    ]
  },
  "ja_ことはが_18": {
    "title": "～ことは…が (～koto wa... ga)",
    "shortExplanation": "前項の事実を一旦認めた上で、それに対立する事柄や不満を述べ、「〜ことは〜だが」「確かに〜が」という意味を表します。",
    "longExplanation": "「～ことは…が」は、同じ動詞や形容詞などを繰り返して用い、前項で述べられている事実や性質を一応認めた上で、後項でそれに対する制限、不満、対立する評価などを付け加える文法表現です。「確かに〜であるが、しかし〜だ」というニュアンスを表します。",
    "formation": "動詞普通形 ＋ ことは ＋ 動詞 ＋ が / い形容詞 ＋ ことは ＋ い形容詞 ＋ が / な形容詞 ＋ なことは ＋ な形容詞 ＋ だが / 名詞 ＋ であることは ＋ 名詞 ＋ だが",
    "examples": [
      {
        "translation": "この映画は面白いことは面白いが、ちょっと長すぎる。"
      },
      {
        "translation": "彼は親切なことは親切だが、少し無口だ。"
      },
      {
        "translation": "このゲームは難しいことは難しいが、やめられない。"
      },
      {
        "translation": "彼女は美しいことは美しいが、ちょっと高飛車だ。"
      }
    ]
  },
  "ja_ことはない_19": {
    "title": "～ことはない (〜koto wa nai)",
    "shortExplanation": "その行為をする必要がないことを表し、「〜する必要はない」「〜しなくてもよい」という意味を表します。",
    "longExplanation": "「～ことはない」は、主に動詞の辞書形に接続し、その行動を行う必然性や理由がないことを述べる文法表現です。相手を励ましたり、安心させたり、過度な心配を解きほぐすために「そこまでする必要はない」と助言する際によく用いられます。",
    "formation": "動詞辞書形 ＋ ことはない",
    "examples": [
      {
        "translation": "お金があるから、無理に貯金することはない。"
      },
      {
        "translation": "この本は簡単だから、辞書を使うことはない。"
      },
      {
        "translation": "彼女は海外旅行に行きたくなければ、行くことはない。"
      },
      {
        "translation": "寒くなければ、コートを着ることはない。"
      }
    ]
  },
  "ja_さ_20": {
    "title": "～さ (〜sa)",
    "shortExplanation": "形容詞を名詞化し、その性質や状態の客観的な程度・度合いを表します。",
    "longExplanation": "接尾辞「～さ」は、い形容詞の語幹（語尾の「い」を取った形）や、な形容詞の語幹に接続して、性質や状態を客観的に測定・比較できる度合いや分量を表す名詞を作ります（「高さ」「重さ」「親切さ」など）。客観的な数値や基準で表せる尺度として広く用いられます。",
    "formation": "い形容詞語幹（「い」を除く） ＋ さ / な形容詞語幹 ＋ さ",
    "examples": [
      {
        "translation": "この料理は辛さが強い。"
      },
      {
        "translation": "彼女の美しさは皆に憧れられる。"
      },
      {
        "translation": "山田さんの親切さで、困っている人を助けてくれる。"
      },
      {
        "translation": "この部屋の広さは十分だと思う。"
      }
    ]
  },
  "ja_さえ_21": {
    "title": "～さえ (～sae)",
    "shortExplanation": "極端な例を挙げて他を類推させたり（「〜でさえ」「〜すら」）、最低限の条件（「〜さえ〜ば」）を表します。",
    "longExplanation": "「～さえ」は、取り立て助詞の一つで、極端な一例を挙げることで「他は言うまでもない」という意味を表す用法（「〜すら」「〜も」）と、仮定表現と呼応して「その条件一つさえ満たせば他は十分である」という最低限の必要条件を示す用法（「〜さえ〜ば」）を持ちます。",
    "formation": "名詞 ＋ さえ / な形容詞 ＋ でさえ / 名詞 ＋ さえ ＋ 動詞仮定形（～ば）",
    "examples": [
      {
        "translation": "お金さえあれば、世界中を旅行できる。"
      },
      {
        "translation": "彼は英語さえ話せれば、その仕事ができるだろう。"
      },
      {
        "translation": "彼女は頭がいいだけでなく、運動も上手だ。テニスさえできる。"
      },
      {
        "translation": "明るい場所で本を読むのが好きだ。部屋の電気さえつけなくても大丈夫だ。"
      }
    ]
  },
  "ja_しかない_22": {
    "title": "～しかない (〜shika nai)",
    "shortExplanation": "他に選択肢や手段がないことを表し、「〜するよりほかない」「〜だけしかない」という意味を表します。",
    "longExplanation": "「～しかない」は、動詞の辞書形や名詞に接続し、他の方法や可能性が排除されており、その行為をする以外に道がないこと、あるいはそれだけしか残されていないことを強調する文法表現です。「他に手段がないため、どうしても〜せざるを得ない」という諦めや強い決意のニュアンスを含みます。",
    "formation": "動詞辞書形 ＋ しかない / 名詞 ＋ しかない",
    "examples": [
      {
        "translation": "この問題を解決する方法は一つしかない。"
      },
      {
        "translation": "彼が出て行ったら、泣くしかない。"
      },
      {
        "translation": "彼女にはあと一月しかない。"
      },
      {
        "translation": "僕には君を信じるしかない。"
      }
    ]
  },
  "ja_すこしもない_23": {
    "title": "すこしも〜ない (sukoshimo~nai)",
    "shortExplanation": "否定の述語と呼応して完全な否定を表し、「ちっとも〜ない」「まったく〜ない」という意味を表します。",
    "longExplanation": "副詞「すこしも（少しも）」は、必ず否定の述語（動詞や形容詞の否定形）と呼応して用いられ、ある性質や状態、動作が微塵も存在しないことを強調する全否定の文法表現です。「全く〜ない」「少しも〜ない」という強い否定の気持ちを表します。",
    "formation": "すこしも ＋ 動詞否定形（～ない / ～ません） / すこしも ＋ い形容詞語幹 ＋ くない / すこしも ＋ な形容詞 / 名詞 ＋ ではない",
    "examples": [
      {
        "translation": "彼はすこしも悲しそうに見えません。"
      },
      {
        "translation": "この部屋はすこしも寒くない。"
      },
      {
        "translation": "彼女はすこしも心配していない。"
      },
      {
        "translation": "まったく知らない人と話すのは怖い。"
      }
    ]
  },
  "ja_ずに_24": {
    "title": "～ずに (〜zu ni)",
    "shortExplanation": "ある動作をしないで別の動作を行うことを表し、「〜しないで」「〜することなく」という意味を表します。",
    "longExplanation": "「～ずに」は、動詞の未然形（ない形の「ない」を除いた形）に接続し（「する」は「せずに」となる）、前項の行為を行わない状態のまま後項の行為を行うという付帯状況を表す文法表現です。口語の「〜ないで」に相当しますが、「〜ずに」はより硬い文章語的な響きを持ちます。",
    "formation": "動詞ない形（「ない」を除く） ＋ ずに（不規則：する → せずに）",
    "examples": [
      {
        "translation": "彼は笑わずに話を聞いていました。"
      },
      {
        "translation": "食べずに寝るのは良くないです。"
      },
      {
        "translation": "コーヒーを飲まずに仕事を始めました。"
      },
      {
        "translation": "誰にも言わずに出かけました。"
      }
    ]
  },
  "ja_せいで_25": {
    "title": "～せいで (〜sei de)",
    "shortExplanation": "好ましくない結果や残念な事態を引き起こした原因・理由を表し、「〜のせいで」「〜が原因で」という意味を表します。",
    "longExplanation": "「～せいで」は、悪い結果や不都合な出来事、被害などが生じた原因を表す文法です。非難や後悔、恨み言などのニュアンスを含み、「〜が原因で（悪い結果になった）」と言いたいときに用いられます。文末では「〜せいだ」「〜せいです」の形をとります。",
    "formation": "動詞普通形 ＋ せいで | い形容詞 ＋ せいで | な形容詞 ＋ なせいで | 名詞 ＋ のせいで",
    "examples": [
      {
        "translation": "雨のせいで試合が中止になりました。"
      },
      {
        "translation": "彼の遅刻のせいで、みんな待たされました。"
      },
      {
        "translation": "病気のせいで休日が台無しになった。"
      },
      {
        "translation": "仕事が忙しくて寝不足なせいで、集中できない。"
      }
    ]
  },
  "ja_せてください_26": {
    "title": "～せてください (〜sete kudasai)",
    "shortExplanation": "相手に許可を求めて、自分（または身内）にその動作をさせてもらう丁寧な依頼表現で、「〜させてください」という意味を表します。",
    "longExplanation": "「～（さ）せてください」は、動詞の使役形のて形に「ください」を接続させた形で、相手に対して自分の希望する行動を許可してもらうよう丁寧に頼む表現です。相手に敬意を払い、謙虚にお願いする場面でよく用いられます。",
    "formation": "動詞使役形て形（～せて／～させて） ＋ ください",
    "examples": [
      {
        "translation": "もう一度説明させてください。"
      },
      {
        "translation": "帰らせてください。"
      },
      {
        "translation": "その本を見せてください。"
      },
      {
        "translation": "ここで待たせてください。"
      }
    ]
  },
  "ja_そのために_27": {
    "title": "～そのために (〜sono tame ni)",
    "shortExplanation": "前文で述べた目的や目標を受けて、それを実現するための行動や手段を述べ、「そのために」「その目的のために」という意味を表します。",
    "longExplanation": "接続詞「そのために」は、前に提示された目的・目標や理由を指し示し、後続の文でその目的を果たすためにどのような行動や努力、対策をとっているかを接続して述べる表現です。「〜を実現するために、これを行う」という前後の関係を明確にします。",
    "formation": "文1（目的・目標） ＋ 。そのために、 ＋ 文2（手段・行動）",
    "examples": [
      {
        "translation": "試験に合格するために、毎日勉強しています。そのために、早く寝て早く起きるようにしています。"
      },
      {
        "translation": "健康的な生活を送りたい。そのために、ジムに通って運動しています。"
      },
      {
        "translation": "環境を守るために、リサイクルに取り組んでいます。そのために、ゴミを分別して捨てています。"
      },
      {
        "translation": "新しい仕事を見つけたい。そのために、履歴書を書いて応募しています。"
      }
    ]
  },
  "ja_その結果_28": {
    "title": "～その結果 (〜sono kekka)",
    "shortExplanation": "前述の事柄や行動によってもたらされた結末・結果を客観的に述べ、「その結果」「その結果として」という意味を表します。",
    "longExplanation": "接続詞「その結果」は、文と文をつなぎ、前の文で述べられた原因・契機・出来事を受けて、その影響でどのような結果や結末が生じたのかを後続の文で述べる表現です。良い結果にも悪い結果にも使われ、客観的な説明や改まった文章でよく用いられます。",
    "formation": "文1（行為・事態） ＋ 。その結果、 ＋ 文2（結果）",
    "examples": [
      {
        "translation": "彼女は毎日練習した。その結果、試合に勝った。"
      },
      {
        "translation": "会社が倒産した。その結果、彼は仕事を失った。"
      },
      {
        "translation": "私たちは遅刻した。その結果、電車に乗れなかった。"
      },
      {
        "translation": "彼は勉強を怠った。その結果、試験に落ちた。"
      }
    ]
  },
  "ja_それと_29": {
    "title": "～それと～ (〜sore to〜)",
    "shortExplanation": "前に述べた事柄に加えて、別の事柄や項目を付け足すときに用いられ、「それと」「それに加えて」という意味を表します。",
    "longExplanation": "接続詞「それと」は、日常の会話で頻繁に使われるくだけた表現で、すでに話題に出した事柄や物事のほかに、もう一つの要素や追加の用件・項目を並列して付け加える際に用いられます。「それから」「それに」と近い意味を持ちます。",
    "formation": "項目／文1 ＋ 。それと、 ＋ 項目／文2",
    "examples": [
      {
        "translation": "買い物に行くつもりです。それと、郵便局にも行かなくては。"
      },
      {
        "translation": "今日はタコスを作りました。それと、サラダも作りました。"
      },
      {
        "translation": "出かける前に、部屋を掃除してください。それと、ゴミを捨ててください。"
      },
      {
        "translation": "彼はフランス語が話せます。それと、スペイン語も話せます。"
      }
    ]
  },
  "ja_それとも_30": {
    "title": "～？それとも～？ (～? sore tomo ～?)",
    "shortExplanation": "二つの事柄や選択肢を提示して相手に選ばせる選択疑問の表現で、「それとも」「あるいは」という意味を表します。",
    "longExplanation": "接続詞「それとも」は、主に二者択一の疑問文において用いられ、二つの異なる選択肢や可能性を並べて相手にどちらかを選ばせる際に使用します。「Aですか？ それともBですか？」のように、疑問文をつなぐ働きをします。",
    "formation": "疑問文A ＋ ？それとも ＋ 疑問文B ＋ ？",
    "examples": [
      {
        "translation": "コーヒーを飲む？それとも紅茶を飲む？"
      },
      {
        "translation": "この映画は面白い？それともつまらない？"
      },
      {
        "translation": "彼は日本人だ？それとも外国人だ？"
      },
      {
        "translation": "寿司を食べに行く？それともラーメンを食べに行く？"
      }
    ]
  },
  "ja_だけしか_31": {
    "title": "～だけしか (～dake shika)",
    "shortExplanation": "限定を表す助詞を重ねて数量や範囲の少なさ・不十分さを強く強調し、後続の否定表現と呼応して「〜だけしか…ない」という意味を表します。",
    "longExplanation": "「～だけしか」は、限定の「だけ」と排他を表す「しか」を組み合わせた表現で、後続に否定の述語（動詞の否定形など）を伴います。取り上げた数量や対象がきわめて少なく、それ以外にはないことに対する不足感、不満、残念な気持ちを強く強調します。",
    "formation": "名詞／数量詞 ＋ だけしか ＋ 動詞否定形",
    "examples": [
      {
        "translation": "今日は1時間だけしか勉強できなかった。"
      },
      {
        "translation": "彼はカレーだけしか食べない。"
      },
      {
        "translation": "田中さんは5人だけしか招待しなかった。"
      },
      {
        "translation": "あのレストランでは野菜だけしか売っていない。"
      }
    ]
  },
  "ja_だけど_32": {
    "title": "だけど (dakedo)",
    "shortExplanation": "前後の事柄が対立・矛盾することを表すくだけた逆接の接続詞で、「だが」「けれども」「しかし」という意味を表します。",
    "longExplanation": "接続詞「だけど」は、「だけれども」が簡略化された日常会話でよく使われる口語表現です。前の事柄に対して予想と異なることや反対の事柄を後続の文で述べる際に用いられます。文頭に置かれて「だけど、〜」とするほか、文中で「〜けど」の形で節をつなぐこともしばしばあります。",
    "formation": "文1 ＋ だけど／けど ＋ 文2 | 文1 ＋ 。だけど、 ＋ 文2",
    "examples": [
      {
        "translation": "試験に合格したけど、まだ勉強しなければならない。"
      },
      {
        "translation": "この部屋は広いけど、家賃が高いです。"
      },
      {
        "translation": "彼は優しいけど、時々厳しいです。"
      },
      {
        "translation": "朝ごはんは作りたいけど、時間がない。"
      }
    ]
  },
  "ja_たて_33": {
    "title": "～たて (～tate)",
    "shortExplanation": "ある動作やすべきことが終わったばかりで、その状態がきわめて新鮮・生々しいことを表し、「〜したばかりの」という意味を表します。",
    "longExplanation": "「～たて」は、動詞の連用形（ます形語幹）に接続し、その動作が完了した直後で、出来上がった物や状態がまだ新しく温かみや鮮度を保っていることを表します。料理や洗濯などに関する動詞（焼く、作る、炊く、洗うなど）とよく結びつき、名詞を修飾するときは「〜たての＋名詞」の形をとります。",
    "formation": "動詞連用形（ます形語幹） ＋ たて（＋の＋名詞／＋で）",
    "examples": [
      {
        "translation": "このパンは焼きたてで、まだ温かいです。"
      },
      {
        "translation": "作りたてのお弁当が美味しい。"
      },
      {
        "translation": "洗いたてのシャツはいい匂いがする。"
      },
      {
        "translation": "彼女は切りたての野菜をサラダに入れました。"
      }
    ]
  },
  "ja_たとえても_34": {
    "title": "～たとえ～ても (〜tatoe〜temo)",
    "shortExplanation": "仮定の条件を提示し、たとえそれが成立しても結論や意志が変わらないことを表し、「たとえ〜ても」「仮に〜だとしても」という意味を表します。",
    "longExplanation": "「～たとえ～ても」は、譲歩の仮定条件を表す構文です。副詞「たとえ」を文頭に置き、述語の「〜ても／〜でも」と呼応させることで、「仮に前項のような極端な事態が起きても、後項の事実・決意・判断には何の影響も及ばない」という強い意志や確定性を表します。",
    "formation": "たとえ ＋ 動詞て形 ＋ も | たとえ ＋ い形容詞語幹（「い」を除く） ＋ くても | たとえ ＋ な形容詞語幹／名詞 ＋ でも（または であっても）",
    "examples": [
      {
        "translation": "たとえ雨が降っても、出かけましょう。"
      },
      {
        "translation": "たとえ彼が怒っても、本当のことを言いましょう。"
      },
      {
        "translation": "たとえ寒くても、散歩に行きたい。"
      },
      {
        "translation": "たとえ彼が有名であっても、彼には興味がありません。"
      }
    ]
  },
  "ja_たところ_35": {
    "title": "～たところ (〜ta tokoro)",
    "shortExplanation": "ある動作を行った結果、新たな事実や思いがけない状況が分かったことを表し、「〜したら」「〜した結果」という意味を表します。",
    "longExplanation": "「～たところ」は、動詞のた形に接続し、ある行動を実際にとってみた結果、どういう状況になったか、どのような反応や新たな事実が判明したかを客観的に述べる文法です。後続の文には、話し手の意志による行動ではなく、自然に生じた出来事や知った事実が来ます。",
    "formation": "動詞た形 ＋ ところ",
    "examples": [
      {
        "translation": "宿題をしたところ、先生からもう一つ課題が出された。"
      },
      {
        "translation": "友達に会ったところ、彼が海外に行くと言った。"
      },
      {
        "translation": "食事を食べ終わったところ、電話がかかってきた。"
      },
      {
        "translation": "机を整理したところ、忘れていたメモが見つかった。"
      }
    ]
  },
  "ja_たとたん_36": {
    "title": "～たとたん (〜ta totan)",
    "shortExplanation": "ある動作や変化が起きたまさにその瞬間に、思いがけない次の事態が発生することを表し、「〜した瞬間に」「〜するとすぐに」という意味を表します。",
    "longExplanation": "「～たとたん（に）」は、動詞のた形に接続し、先行する動作や出来事が完了した直後、ほとんど同時に予期しない変化や事態が生じることを表します。後続の文には、話し手の意志的な行為ではなく、突発的・偶然に起こった現象や驚きの出来事が続きます。",
    "formation": "動詞た形 ＋ とたん（に）",
    "examples": [
      {
        "translation": "ドアを開けたとたん、猫が逃げ出した。"
      },
      {
        "translation": "電話をかけたとたん、電池が切れた。"
      },
      {
        "translation": "雨が降り始めたとたん、みんなが傘をさした。"
      },
      {
        "translation": "彼に会ったとたん、彼の笑顔が消えた。"
      }
    ]
  },
  "ja_たびに_37": {
    "title": "～たびに (〜tabi ni)",
    "shortExplanation": "その動作や出来事が起こるたびに、いつも決まって同じことが繰り返されることを表し、「〜する時はいつも」「〜ごとに」という意味を表します。",
    "longExplanation": "「～たびに」は、動詞の辞書形（基本形）または「名詞＋の」に接続し、ある行為や契機が生じる機会ごとに、常に例外なく同一の事態・感情・反応が引き起こされることを表します。自然現象や日常的な周期（毎朝起きる等）には使わず、特定の出来事に付随する反復性を表します。",
    "formation": "動詞辞書形 ＋ たびに | 名詞 ＋ のたびに",
    "examples": [
      {
        "translation": "彼女に会うたびに、心が弾む。"
      },
      {
        "translation": "雨が降るたびに、懐かしい思い出がよみがえる。"
      },
      {
        "translation": "この歌を聴くたびに、幸せな気分になる。"
      },
      {
        "translation": "家に帰るたびに、猫が出迎えてくれる。"
      }
    ]
  },
  "ja_だものだ_38": {
    "title": "～だものだ (〜da mono da)",
    "shortExplanation": "理由や言い訳を主観的に述べ、相手に事情を納得・理解してもらおうとする表現で、「〜なんだから」「〜ものだから」という意味を表します。",
    "longExplanation": "「～ものだから」（口語では「〜んだもの」「〜もの」など）は、自分の都合や行動に対する理由・言い訳を弁解がましく述べたり、相手の理解や同情を求めたりする際に用いられる表現です。「どうしても〜なのだから仕方がない」という主観的なニュアンスを含みます。",
    "formation": "動詞普通形 ＋ んだものだから／んだもの | い形容詞 ＋ んだものだから／んだもの | な形容詞語幹 ＋ なんだものだから／んだもの | 名詞 ＋ なんだものだから／んだもの",
    "examples": [
      {
        "translation": "疲れたんだものだから、休みたい。"
      },
      {
        "translation": "お腹が空いたんだものだから、何か食べたい。"
      },
      {
        "translation": "忙しいんだものだから、来られない。"
      },
      {
        "translation": "彼は親切なんだものだから、誰も彼が好きだ。"
      }
    ]
  },
  "ja_ちゃった_39": {
    "title": "～ちゃった (〜chatta)",
    "shortExplanation": "「〜てしまった」のくだけた口語表現で、意図せず失敗したことへの後悔や遺憾、あるいは動作の完全な終了を表し、「〜してしまった」という意味を表します。",
    "longExplanation": "「～ちゃった」（濁音は「〜じゃった」）は、会話で非常によく使われる「〜てしまった／〜でしまった」の縮約形です。不注意や思わぬ成り行きで望ましくない事態になってしまったときの残念・後悔の気持ち（「うっかり〜してしまった」）や、動作を完全にやり終えたことをくだけた調子で表します。",
    "formation": "動詞て形（「て」を除く） ＋ ちゃった | 動詞で形（「で」を除く） ＋ じゃった（例：食べてしまった → 食べちゃった、飲んでしまった → 飲んじゃった）",
    "examples": [
      {
        "translation": "忘れ物をしちゃった。"
      },
      {
        "translation": "寝坊して遅刻しちゃった。"
      },
      {
        "translation": "ケーキを全部食べちゃった。"
      },
      {
        "translation": "言わないつもりだったけど、言っちゃった。"
      }
    ]
  },
  "ja_Verb_61": {
    "title": "～ように言う (～you ni iu)",
    "shortExplanation": "指示や依頼、忠告などの内容を第三者に間接的に伝える表現で、「〜するように言う」「〜しろと伝える」という意味を表します。",
    "longExplanation": "「～ように言う」は、人からの依頼・指示・忠告・命令などの発言内容を間接話法で伝達する文型です。命令形や「〜てください」といった直接話法で伝えるのに比べ、客観的で角の立たない表現になります。文末の「言う」は、状況に応じて「頼む（依頼）」「伝える（伝言）」「注意する（警告）」などの動詞に置き換えて使用されることも多いです。",
    "formation": "動詞辞書形 / ない形 ＋ ように言う（または 頼む / 伝える / 注意する）",
    "examples": [
      {
        "translation": "先生は私たちに宿題をやるように言いました。"
      },
      {
        "translation": "母は弟に部屋を片付けるように言いました。"
      },
      {
        "translation": "上司は私に報告書を提出するように言いました。"
      },
      {
        "translation": "友達が私に早く来るように言いました。"
      }
    ]
  },
  "ja_Verb_62": {
    "title": "～られる (～rareru)",
    "shortExplanation": "動詞の受身（他者から動作を受けること）または可能（動作を行う能力や条件があること）を表します。",
    "longExplanation": "助動詞「れる・られる」は、主に「受身」と「可能」の二大用法を持ちます。①受身用法：主語が他者からある動作を受けることを表し、動作主は格助詞「に」で示されます。通常の直接受身のほか、迷惑を被る「迷惑受身（間接受身）」の用法もあります。②可能用法：ある行為を行う能力や条件が備わっていることを示し、特に一段動詞の語尾「る」を「られる」に変えることで可能動詞を形成します（例：観られる）。本項の例文1・2・4は受身用法、例文3は可能用法です。",
    "formation": "五段動詞：語尾「う」段を「あ」段に変えて ＋ れる／一段動詞：語尾「る」を取って ＋ られる／サ変動詞：する → される／カ変動詞：くる → こられる",
    "examples": [
      {
        "translation": "彼は先生に褒められました。"
      },
      {
        "translation": "彼は友達に笑われました。"
      },
      {
        "translation": "映画は観られましたか？"
      },
      {
        "translation": "彼女はリーダーに選ばれました。"
      }
    ]
  },
  "ja_Verb_63": {
    "title": "～ることがある (～ru koto ga aru)",
    "shortExplanation": "常に起こるわけではないが、たまにそのような事態や行為が発生することを表し、「たまに〜することがある」「〜する場合もある」という意味を表します。",
    "longExplanation": "「動詞辞書形 ＋ ことがある」は、日常的・普遍的な現象ではないものの、時々そのような事態や行為が起こることを表す文型です。「たまに」「ときどき」などの頻度を表す副詞とともに用いられることが多くあります。過去の経験を表す「動詞た形 ＋ ことがある（〜した経験がある）」とは明確に区別されます。また、否定の「〜ないことがある」は「たまに〜しないことがある」という意味を表します。",
    "formation": "動詞辞書形 ＋ ことがある / ことがあります",
    "examples": [
      {
        "translation": "彼は遅刻することがあります。"
      },
      {
        "translation": "私は寝坊することがあります。"
      },
      {
        "translation": "彼女は歌を歌うことがあります。"
      },
      {
        "translation": "子供の頃、よく山に登ることがありました。"
      }
    ]
  },
  "ja_Verb_64": {
    "title": "～ることができる (～ru koto ga dekiru)",
    "shortExplanation": "ある動作を行う能力・技術があることや、状況・条件により可能であることを表し、「〜することができる」という意味を表します。",
    "longExplanation": "「動詞辞書形 ＋ ことができる」は、可能性・能力を客観的に述べる代表的な表現です。主に①主体の能力・技術（外国語を話す能力など）、②客観的状況や条件・規則による可能性（クレジットカードで支払える条件など）の二つを表します。動詞の可能形（例：話せる、弾ける）と実質的な意味は同等ですが、改まった書き言葉や説明文、手続きの案内文などで好んで用いられます。",
    "formation": "動詞辞書形 ＋ ことができる / ことができます",
    "examples": [
      {
        "translation": "私は日本語を話すことができます。"
      },
      {
        "translation": "彼はギターを弾くことができます。"
      },
      {
        "translation": "この問題を解決することができますか？"
      },
      {
        "translation": "彼女は犬を泳がせることができます。"
      }
    ]
  },
  "ja_Verb_65": {
    "title": "～ることにする (～ru koto ni suru)",
    "shortExplanation": "話し手自身の意志や判断によって、ある行為を行う（または行わない）ことを決める表現で、「〜することに決める」という意味を表します。",
    "longExplanation": "「～ことにする」は、自己の主体的な意志や選択に基づいて行動を決定することを表す文型です。決定した事実を報告する際には過去形の「〜ことにした」「〜ことにしました」がよく用いられます。また、「〜ことにしている」の形にすると、自分自身で決めた習慣や生活上のルールとして継続していることを表します。否定形は「〜ないことにする（〜しないことに決める）」となります。",
    "formation": "動詞辞書形 / ない形 ＋ ことにする / ことにしました",
    "examples": [
      {
        "translation": "来週、ジムに行くことにしました。"
      },
      {
        "translation": "この靴を買うことにしました。"
      },
      {
        "translation": "毎日、散歩をすることにしました。"
      },
      {
        "translation": "彼に電話をかけることにします。"
      }
    ]
  },
  "ja_Verb_66": {
    "title": "～ることになる (～ru koto ni naru)",
    "shortExplanation": "話し手の主観的な意志ではなく、周囲の状況や組織の決定、規則などによって物事が決まったことを表し、「〜することに決まる」「〜という結果になる」という意味を表します。",
    "longExplanation": "「～ことになる」は、計画や予定、出来事の決定が個人の単なる意志によるものではなく、組織の方針・他者からの決定・客観的な成り行きによって生じたことを表す客観的表現です。自己の主観的決定を表す「〜ことにする」と対比されます。決定した事実を述べる際は過去形の「〜ことになった」「〜ことになりました」が用いられ、「〜ことになっている」の形にすると規則や法律、社会的慣習、あらかじめ定まった予定を表します。",
    "formation": "動詞辞書形 / ない形 ＋ ことになる / ことになりました",
    "examples": [
      {
        "translation": "今日は会議がなくなることになりました。"
      },
      {
        "translation": "来週、友達と旅行することになった。"
      },
      {
        "translation": "彼女が今度のプロジェクトのリーダーになることになりました。"
      },
      {
        "translation": "急に仕事が入ったので、休みを取ることになった。"
      }
    ]
  },
  "ja_Verb_67": {
    "title": "～るときに (～ru toki ni)",
    "shortExplanation": "ある動作や出来事が行われる時間・時点を表し、「〜するとき」「〜する際に」という意味を表します。",
    "longExplanation": "「動詞辞書形 ＋ とき（に）」は、ある行為や事態が生じる時間的場面・機会を設定する表現です。動詞の辞書形（非過去形）が接続する場合、その動作がまだ完了していない段階（その動作をする直前やその最中）、あるいは習慣的・一般的な事柄を表します（例：「寝るときに電気を消す」は寝る前の動作）。前項の動作が完全に完了した後に次の動作を行う「動詞た形 ＋ とき（に）」との時間的前後関係の相違が重要です。",
    "formation": "動詞辞書形 ＋ とき（に）",
    "examples": [
      {
        "translation": "映画を見るときに、ポップコーンを食べます。"
      },
      {
        "translation": "寝るときに、部屋の電気を消します。"
      },
      {
        "translation": "運動するときに、水分補給が大切です。"
      },
      {
        "translation": "旅行するときに、カメラを持っていくことが好きです。"
      }
    ]
  },
  "ja_Verb_68": {
    "title": "～るところ (～ru tokoro)",
    "shortExplanation": "ある動作をまさに今から始めようとする直前の瞬間を表し、「ちょうど今から〜するところだ」「〜しそうになる」という意味を表します。",
    "longExplanation": "「動詞辞書形 ＋ ところ（です）」は、行為が開始される直前の局面を表す文型です。「今から」「ちょうど」「これから」などの副詞を伴うことが多く、行為の直前性を強調します。過去形の「〜ところだった / 〜ところでした」を用いると、もう少しである事態になりかけたが直前で回避されたこと（「泣くところだった」＝泣きそうになった）を表す用法にもなります。「〜ているところ（進行中）」「〜たところ（直後）」と並ぶアスペクト（相）の重要表現です。",
    "formation": "動詞辞書形 ＋ ところ（です / でした）",
    "examples": [
      {
        "translation": "彼は食べるところです。"
      },
      {
        "translation": "私は出かけるところです。"
      },
      {
        "translation": "彼女は泣くところでした。"
      },
      {
        "translation": "私たちは勉強するところです。"
      }
    ]
  },
  "ja_Verb_69": {
    "title": "～出す (～dasu)",
    "shortExplanation": "複合動詞として動作が急に始まること（突然の開始）を表すほか、本動詞として「外に出す」「提出する」という意味を表します。",
    "longExplanation": "「出す（だす）」には主に二つの重要用法があります。①本動詞（他動詞）：中にあるものを外へ取り出す（例文1：棚から出す）、または書類や宿題を提出する（例文3：宿題を出す）という意味を表します。（※例文2「出ました」は対応する自動詞「出る」の用法です）。②補助動詞（接尾語的用法）：動詞の連用形（ます形語幹）に接続して複合動詞を作り、ある動作や変化が突然・勢いよく開始することを表します（例文4：歌い出しました。「泣き出す」「雨が降り出す」など）。",
    "formation": "動詞連用形（ます形語幹） ＋ 出す / 名詞 ＋ を ＋ 出す",
    "examples": [
      {
        "translation": "本を棚から出してください。"
      },
      {
        "translation": "彼は部屋から急いで出ました。"
      },
      {
        "translation": "授業が始まる前に宿題を出してください。"
      },
      {
        "translation": "彼女は歌い出しました。"
      }
    ]
  },
  "ja_Verb_70": {
    "title": "～方 (～kata)",
    "shortExplanation": "ある行為を行うやり方や方法を表し、「〜する方法」「〜のやり方」という意味を表します。",
    "longExplanation": "接尾語「～方（かた）」は、動詞の連用形（ます形語幹）に接続して名詞を作り、その動作を行う具体的な手段や方法、方式を表します（例：作り方、使い方、話し方、解き方）。元の動詞の目的語を示す格助詞「を」は、名詞化に伴って連体修飾の助詞「の」に変化するのが重要な文法規則です（例：ケーキを作る → ケーキの作り方）。",
    "formation": "動詞連用形（ます形語幹） ＋ 方（読み：かた） / 名詞 ＋ の ＋ 動詞連用形 ＋ 方",
    "examples": [
      {
        "translation": "誰かがケーキの作り方を知っていますか？"
      },
      {
        "translation": "彼女は英語の話し方を学んでいます。"
      },
      {
        "translation": "このパソコンの使い方を教えてください。"
      },
      {
        "translation": "数学の問題の解き方を覚えるのが難しいです。"
      }
    ]
  },
  "ja_Verb_71": {
    "title": "～終わる (～owaru)",
    "shortExplanation": "動作や出来事、仕事などが完了して終了することを表し、「終わる」「〜し終える」という意味を表します。",
    "longExplanation": "「終わる（おわる）」は、語尾が「る」ですが一段動詞ではなく五段動詞（一類動詞）です。主格を表す助詞「が」を伴う自動詞として「仕事が終わる」「映画が終わる」のように行事や事態の終了を表すほか、動詞の連用形（ます形語幹）に接続して「読み終わる」「書き終わる」のようにある行為を完全に完了することを表す複合動詞の補助動詞としても機能します。対義語は「始まる／始める」です。",
    "formation": "名詞 ＋ が ＋ 終わる（五段動詞） / 動詞連用形（ます形語幹） ＋ 終わる",
    "examples": [
      {
        "translation": "映画が終わったら、家に帰ります。"
      },
      {
        "translation": "仕事が終わるまで、待ってください。"
      },
      {
        "translation": "パーティーはもうすぐ終わります。"
      },
      {
        "translation": "試験が終わったら、友達と遊びに行く予定です。"
      }
    ]
  },
  "ja_Verb_72": {
    "title": "～続ける (～tsuzukeru)",
    "shortExplanation": "ある動作や状態を中断せずに継続して行うことを表し、「〜し続ける」「継続する」という意味を表します。",
    "longExplanation": "「続ける（つづける）」は、行為や状態を途切れることなく継続・持続させることを表す他動詞です。動詞の連用形（ます形語幹）に接続して複合動詞を作る場合、ある動作を休まずに継続することや、習慣的にずっとやり続けることを表します（例：走り続ける、祈り続ける）。また、本動詞として「名詞 ＋ を ＋ 続ける」の形でも頻繁に用いられます。",
    "formation": "動詞連用形（ます形語幹） ＋ 続ける / 名詞 ＋ を ＋ 続ける",
    "examples": [
      {
        "translation": "彼は毎日ジムで運動を続けています。"
      },
      {
        "translation": "彼女は勉強を続けるために図書館に行きました。"
      },
      {
        "translation": "私たちは雨にも関わらず散歩を続けました。"
      },
      {
        "translation": "彼は仕事を続けることに決めた。"
      }
    ]
  },
  "ja_かしら_73": {
    "title": "～かしら (～kashira)",
    "shortExplanation": "文末に付いて不確かさや疑念、自問を表す終助詞で、主に親しい間柄の会話（女性語的ニュアンス）で「〜だろうか」「〜かな」という意味を表します。",
    "longExplanation": "「かしら」は、「か＋知ら（ぬ）」に由来する終助詞で、自分の推量・疑問・不確かな気持ちを柔らかく表現したり、独り言として自問したりする際に用いられます。意味としては「〜かな」と同等ですが、より上品で柔らかな女性語としての色彩を持ちます。動詞・い形容詞の普通形に接続するほか、な形容詞・名詞には「だ」を付けずに直接接続するのが一般的です。",
    "formation": "動詞普通形 ＋ かしら / い形容詞普通形 ＋ かしら / な形容詞語幹（だを除く） ＋ かしら / 名詞（だを除く） ＋ かしら",
    "examples": [
      {
        "translation": "今日は雨が降るかしら？"
      },
      {
        "translation": "このケーキは美味しいかしら？"
      },
      {
        "translation": "彼は病気かしら？"
      },
      {
        "translation": "彼女は学生かしら？"
      }
    ]
  },
  "ja_ついでに_40": {
    "title": "～ついでに (〜tsuide ni)",
    "shortExplanation": "ある本来の目的・行動を行う機会を利用して、合わせて別の行動も行うことを表し、「〜のついでに」「〜の機会を利用して」という意味を表します。",
    "longExplanation": "「～ついでに」は、主たる行動や予定を行うついで・機会を利用して、それに付随して別の行動を合わせて行うときに用いる表現です。前節には本来の目的となる動作が、後節にはその機会を利用して行った動作が来ます。",
    "formation": "動詞辞書形／た形 ＋ ついでに | 名詞 ＋ のついでに",
    "examples": [
      {
        "translation": "買い物に行くついでに、郵便局で手紙を出しましょう。"
      },
      {
        "translation": "図書館で本を借りたついでに、友達に会いました。"
      },
      {
        "translation": "日本に来たついでに、有名な観光地を訪れたいです。"
      },
      {
        "translation": "映画館に行ったついでに、新作のポスターを見ました。"
      }
    ]
  },
  "ja_っけ_41": {
    "title": "～っけ？ (〜kke?)",
    "shortExplanation": "過去の事実や記憶があいまいな事柄を思い出そうとしたり、相手に確認したりするときに用い、「〜だったっけ？」「〜だっけ？」という意味を表します。",
    "longExplanation": "「～っけ」は、親しい間柄でのくだけた会話（口語）で文末に用いられる終助詞です。話し手が一度聞いたことや経験したことを思い出そうと独り言を言ったり、あいまいな記憶を相手に問いかけて確認したりするときに使われます。",
    "formation": "動詞普通形（主にた形） ＋ っけ | い形容詞 ＋ かったっけ | な形容詞／名詞 ＋ だっけ（丁寧：でしたっけ）",
    "examples": [
      {
        "translation": "彼は何時に来るっけ？"
      },
      {
        "translation": "この映画、面白かったっけ？"
      },
      {
        "translation": "彼女は学生だっけ？"
      },
      {
        "translation": "すし屋はどこだっけ？"
      }
    ]
  },
  "ja_っぱい_42": {
    "title": "～っぱい (〜ppai)",
    "shortExplanation": "ある場所や空間、あるいは心が物や感情などで満ちあふれている状態を表し、「〜で満ちている」「〜でいっぱいだ」という意味を表します。",
    "longExplanation": "「～（で）いっぱい」は、ある空間や時間、または人の心や表情などが、特定の事物や感情、予定などで満たされている状態を表す表現です。主に「名詞 ＋ でいっぱい」の形で用いられ、「〜があふれんばかりにある」ことを表します。",
    "formation": "名詞 ＋ でいっぱい（または でいっぱいです／でいっぱいだ）",
    "examples": [
      {
        "translation": "部屋が荷物でいっぱいです。"
      },
      {
        "translation": "彼女は笑顔でいっぱいでした。"
      },
      {
        "translation": "彼は仕事でいっぱいです。"
      },
      {
        "translation": "公園は花でいっぱいです。"
      }
    ]
  },
  "ja_っぱなし_43": {
    "title": "～っぱなし (〜ppanashi)",
    "shortExplanation": "本来すべき後始末などをせず、ある動作をしたまま放置している状態や、その状態が継続していることを表し、「〜したまま」という意味を表します。",
    "longExplanation": "「～っぱなし」は、動詞のます形語幹に接続し、ある行為を行った後、通常行うべき後始末や次の動作を行わずにその状態を放っておくことを表します。多くの場合、不注意や不満、非難などの好ましくないニュアンスを伴います（例：開けっぱなし、つけっぱなし）。また、同じ状態がずっと続くことを表す場合もあります。",
    "formation": "動詞ます形（ます脱落） ＋ っぱなし（＋ にする／になる／だ）",
    "examples": [
      {
        "translation": "窓を開けっぱなしにすると、虫が入ってくる。"
      },
      {
        "translation": "洗濯物を干しっぱなしで、雨に濡れた。"
      },
      {
        "translation": "彼はドアを開けっぱなしにして出かけた。"
      },
      {
        "translation": "テレビをつけっぱなしにして寝てしまった。"
      }
    ]
  },
  "ja_つまり_44": {
    "title": "～つまり (〜tsumari)",
    "shortExplanation": "前に述べた内容を要約したり、言い換えたり、結論づけたりするときに用い、「つまり」「要するに」「言い換えると」という意味を表します。",
    "longExplanation": "接続詞「つまり」は、前で述べた事柄を受けて、それをわかりやすく要約して言い直したり、そこから導かれる当然の結論を導いたりするときに使われます。「要するに」「言い換えれば」と同義で、論理的な説明や日常会話で幅広く使われます。",
    "formation": "文1 ＋ 。つまり、 ＋ 文2",
    "examples": [
      {
        "translation": "彼は大学の教授です。つまり、専門家です。"
      },
      {
        "translation": "今日は土曜日だ。つまり、明日は日曜日だ。"
      },
      {
        "translation": "山田さんは友達のお姉さんです。つまり、私たちの知り合いです。"
      },
      {
        "translation": "彼女はフランス出身です。つまり、フランス語が話せます。"
      }
    ]
  },
  "ja_つもりでした_45": {
    "title": "～つもりでした (〜tsumori deshita)",
    "shortExplanation": "過去に持っていた予定や意図を表しますが、実際には実現しなかったときに用い、「〜する予定でした」「〜するつもりだった」という意味を表します。",
    "longExplanation": "「～つもりでした」は、過去の時点ではそうする意思や計画があったものの、予期せぬ事情や障害により実際には実行できなかったり変更になったりした事柄を表します。多くの場合、後続に「〜が」「〜けれど」を伴って残念な気持ちや言い訳を表します。",
    "formation": "動詞辞書形／ない形 ＋ つもりでした",
    "examples": [
      {
        "translation": "昨日は友達に会うつもりでしたが、風邪を引いてしまいました。"
      },
      {
        "translation": "映画を見るつもりでしたが、時間がなくなりました。"
      },
      {
        "translation": "彼らが来るつもりでしたが、電話でキャンセルされました。"
      },
      {
        "translation": "この本を読むつもりでしたが、もう読み終わっていました。"
      }
    ]
  },
  "ja_てくれと_46": {
    "title": "～てくれと (〜te kureto)",
    "shortExplanation": "他者から依頼された内容や頼み事を間接的に引用して伝える表現で、「〜してくれと（頼まれる／言われる）」という意味を表します。",
    "longExplanation": "「～てくれと」は、他者から受けた依頼・要望・指示などを間接的に引用して述べる表現です。主に「〜てくれと言われる」「〜てくれと頼まれる」「〜てくれとお願いされる」などの形で用いられ、相手から「〜してほしい」と頼まれたことを他人に伝えるときに使われます。",
    "formation": "動詞て形 ＋ くれと（言われる／頼まれる／言う／頼む など）",
    "examples": [
      {
        "translation": "電話をかけてくれと言われました。"
      },
      {
        "translation": "この荷物を運んでくれと頼まれました。"
      },
      {
        "translation": "最後まで待ってくれとお願いされました。"
      },
      {
        "translation": "休んでくれと言われました。"
      }
    ]
  },
  "ja_てごらん_47": {
    "title": "～てごらん (〜te goran)",
    "shortExplanation": "目下の者や子どもなどに対して、何かの行動を試してみるよう優しく促したり勧めたりする表現で、「〜してみてごらん」「〜してみなさい」という意味を表します。",
    "longExplanation": "「～てごらん」は「〜てごらんなさい」のくだけた表現で、主に親が子どもに対して、あるいは目上の人が目下の者に対して、親愛の情を込めて「試しにやってみなさい」と促す際に使われます。「〜てみて」よりも優しく促す親身なニュアンスが含まれます。",
    "formation": "動詞て形 ＋ ごらん（または ごらんなさい）",
    "examples": [
      {
        "translation": "そのゲームをやってごらん。"
      },
      {
        "translation": "彼に話してごらん。"
      },
      {
        "translation": "新しいレシピを作ってごらん。"
      },
      {
        "translation": "そのドレスを着てごらん。"
      }
    ]
  },
  "ja_ですから_48": {
    "title": "ですから～ (desu kara)",
    "shortExplanation": "丁寧な言葉遣いで原因や理由を表し、「ですから」「ですので」「〜ですから」という意味を表します。",
    "longExplanation": "接続詞「ですから」は、丁寧体（です・ます体）の文脈において前文の理由や原因を受け、後続でそれに基づく結果や判断、勧誘、依頼などを述べる表現です。「したがって」「そういうわけですから」と丁寧に論理をつなぐ役割を果たします。",
    "formation": "文1（原因・理由） ＋ ですから、 ＋ 文2（結果・判断・依頼など）",
    "examples": [
      {
        "translation": "今日は寒いですから、コートを着てください。"
      },
      {
        "translation": "この映画は面白いですから、ぜひ見てください。"
      },
      {
        "translation": "明日は休みですから、ゆっくり休んでください。"
      },
      {
        "translation": "彼は親切ですから、手伝ってくれるでしょう。"
      }
    ]
  },
  "ja_てはじめて_49": {
    "title": "～てはじめて (〜te hajimete)",
    "shortExplanation": "前項の動作や経験をして初めて、後項の事実を実感したり気づいたりすることを表し、「〜してはじめて」「〜したことによって初めて」という意味を表します。",
    "longExplanation": "「～てはじめて」は、動詞のて形に接続し、ある出来事や経験を実際に体験して初めて、今まで気づかなかった物事の価値や重要性、気持ちなどを深く認識・実感したということを表す表現です。",
    "formation": "動詞て形 ＋ はじめて",
    "examples": [
      {
        "translation": "海外に行ってはじめて、日本の良さが分かりました。"
      },
      {
        "translation": "彼女と別れてはじめて、彼女の大切さに気づいた。"
      },
      {
        "translation": "大学を卒業してはじめて、学生時代の楽しさが分かった。"
      },
      {
        "translation": "子供ができてはじめて、親の気持ちが分かった。"
      }
    ]
  },
  "ja_てほしい_50": {
    "title": "～てほしい (〜te hoshii)",
    "shortExplanation": "話し手が他者（相手や第三者）に対して、ある動作をしてくれることを望む気持ちを表し、「〜してほしい」という意味を表します。",
    "longExplanation": "「～てほしい」は動詞のて形に接続し、話し手自身ではなく相手や他人にその行為をしてほしいという希望・願望を表す文法です。動作の主体は助詞「に」で示されます。否定の形は「〜ないでほしい」（〜しないでほしい）となります。",
    "formation": "動作主 ＋ に ＋ 動詞て形 ＋ ほしい（否定：～ないでほしい）",
    "examples": [
      {
        "translation": "子供にもっと勉強してほしい。"
      },
      {
        "translation": "彼に私に電話してほしい。"
      },
      {
        "translation": "友達に手伝ってほしい。"
      },
      {
        "translation": "彼女に明日ここに来てほしい。"
      }
    ]
  },
  "ja_ても_51": {
    "title": "～ても (〜temo)",
    "shortExplanation": "仮定または確定の逆接条件を表し、「〜しても」「〜であっても」という意味を表します。",
    "longExplanation": "「～ても」（濁音の場合は「～でも」）は逆接の譲歩条件を表す文法です。前項で挙げた条件が成立したとしても、後項の事態や判断には影響せず、通常予想される結果とは異なる事態が生じることを表します。",
    "formation": "動詞て形 ＋ も | い形容詞（い脱落） ＋ くても | な形容詞語幹／名詞 ＋ でも",
    "examples": [
      {
        "translation": "雨が降っても、運動会は開催されます。"
      },
      {
        "translation": "忙しくても、毎日勉強する時間を作る。"
      },
      {
        "translation": "高くても、良い品質のものを買います。"
      },
      {
        "translation": "彼女が有名人でも、私は彼女のことを知らない。"
      }
    ]
  },
  "ja_といいなあ_52": {
    "title": "～といいなあ (〜to ii naa)",
    "shortExplanation": "自分や他者にとって望ましい事態が起きることを願う気持ちを表し、「〜だといいな」「〜であってほしい」という意味を表します。",
    "longExplanation": "「～といいなあ」は、条件を表す「と」に「いい」と終助詞「なあ」が接続したくだけた口語表現です。独り言や親しい相手に対して、事態が希望どおりに進むことを祈ったり願ったりする気持ちを情感を込めて表します。",
    "formation": "動詞普通形 ＋ といいなあ | い形容詞 ＋ といいなあ | な形容詞／名詞 ＋ だといいなあ",
    "examples": [
      {
        "translation": "明日晴れるといいなあ。"
      },
      {
        "translation": "この試験に合格するといいなあ。"
      },
      {
        "translation": "彼女が元気だといいなあ。"
      },
      {
        "translation": "彼が新しい仕事が見つかるといいなあ。"
      }
    ]
  },
  "ja_という_53": {
    "title": "～という (〜to iu)",
    "shortExplanation": "名前や名称を示したり、後続の名詞の内容を説明・定義したりするときに用い、「〜という（名前の）」「〜という（内容の）」という意味を表します。",
    "longExplanation": "「～という」は、物事の名称や具体的な内容、伝聞などを引用して後続の名詞を修飾する表現です。「名詞1 ＋ という ＋ 名詞2」の形で「名詞1という名前の名詞2」と名付けられたものを紹介する際や、普通形に接続して「〜という評判」「〜という噂」のように内容を詳しく説明する際に使われます。",
    "formation": "名詞1 ＋ という ＋ 名詞2 | 普通形（動詞／形容詞／名詞＋だ） ＋ という ＋ 名詞",
    "examples": [
      {
        "translation": "本屋で「ハリー・ポッター」という本を買いました。"
      },
      {
        "translation": "昨日、美味しいというケーキを食べました。"
      },
      {
        "translation": "彼はとても親切だという評判です。"
      },
      {
        "translation": "今年の夏、東京にある「ディズニーランド」というテーマパークに行きたいです。"
      }
    ]
  },
  "ja_ということだ_54": {
    "title": "～ということだ (〜to iu koto da)",
    "shortExplanation": "他から聞いた情報や噂を伝える「伝聞」（〜とのことだ・〜そうだ）や、事態の意味を説明・結論づける「解釈・意味」（〜という意味だ）を表します。",
    "longExplanation": "「～ということだ」には主に2つの用法があります。1つはニュースや他者から聞いた情報を改まった形で客観的に伝える「伝聞」の用法（「〜によると…ということだ」）で、「〜だそうだ」「〜と聞いている」に相当します。もう1つは、ある状況を受けて「つまり〜という意味だ」と要約・結論づける用法です。",
    "formation": "動詞普通形 ＋ ということだ | い形容詞 ＋ ということだ | な形容詞語幹／名詞 ＋ だということだ",
    "examples": [
      {
        "translation": "彼は来週結婚するということだ。"
      },
      {
        "translation": "この試験は難しいということだ。"
      },
      {
        "translation": "彼女が引っ越したということだ。"
      },
      {
        "translation": "彼は仕事がうまくいかないだということだ。"
      }
    ]
  },
  "ja_というと_55": {
    "title": "～というと (〜to iu to)",
    "shortExplanation": "ある話題や言葉を取り上げて、そこからすぐに連想される代表的な物事や典型的な特徴を挙げる表現で、「〜といえば」「〜から連想するのは」という意味を表します。",
    "longExplanation": "「～というと」は、話題となる名詞を提示し、それによって真っ先に心に思い浮かぶ典型的な事柄や代表的な具体例、連想されるイメージを述べるときに使われます。また、日常会話の中で相手の発言を取り上げて確認したり、話を深めたりする際にも頻繁に用いられます。",
    "formation": "名詞 ＋ というと",
    "examples": [
      {
        "translation": "日本料理というと、寿司が思い浮かびます。"
      },
      {
        "translation": "パリというと、エッフェル塔を思い出します。"
      },
      {
        "translation": "夏休みというと、海に行くのが楽しみです。"
      },
      {
        "translation": "彼というと、いつも元気な人だなと思います。"
      }
    ]
  },
  "ja_というの_56": {
    "title": "～というの～ (〜to iu no〜)",
    "shortExplanation": "主に「〜のは、〜というのだ」の形で用いられ、ある事態や行動が生じた理由や背景を明示・強調して説明する表現で、「〜なのは、〜というわけだ」という意味を表します。",
    "longExplanation": "「～というの～」は、前置きされた事態や結果に対して、「〜なのは、実は〜という理由からだ」と根本的な原因や理由を取り立てて強調・説明する文型です。会話や文章において因果関係や理由付けを明確にする際に用いられます。",
    "formation": "動詞普通形 ＋ というの | い形容詞 ＋ というの | な形容詞 ＋ だというの | 名詞 ＋ だというの",
    "examples": [
      {
        "translation": "遅刻したのは、電車が遅れたという理由からです。"
      },
      {
        "translation": "この部屋が汚いのは、掃除をしなかったからです。"
      },
      {
        "translation": "彼女が怒っているのは、彼が約束を破ったからです。"
      },
      {
        "translation": "彼が成功したのは、努力して勉強したからです。"
      }
    ]
  },
  "ja_というのは_57": {
    "title": "～というのは (〜to iu no wa)",
    "shortExplanation": "言葉の意味や概念を定義・説明したり、前に述べた事柄の理由や内情を詳しく説明したりする表現で、「〜の意味は」「〜というのは実は」という意味を表します。",
    "longExplanation": "「～というのは」は、取り上げた語句や事柄について「〜というのは…という意味・ことだ」（文末：〜のことだ／〜ということだ）と定義・解説するときや、「〜なのは…という理由だからだ」（文末：〜からだ）と背景や原因を解き明かすときに用いられる基本的な文法表現です。",
    "formation": "語句／文 ＋ というのは ＋ 説明・定義（文末は主に「〜のことだ」「〜ということだ」「〜からだ」）",
    "examples": [
      {
        "translation": "「日本に行く」というのは、日本へ旅行することです。"
      },
      {
        "translation": "この問題が難しいというのは、解決に時間がかかるということです。"
      },
      {
        "translation": "彼が怒っているというのは、彼が不満を感じているということです。"
      },
      {
        "translation": "「太る」というのは、体重が増えるということです。"
      }
    ]
  },
  "ja_というより_58": {
    "title": "～というより (〜to iu yori)",
    "shortExplanation": "前に挙げた表現よりも、後に続く表現のほうが実態に合っていてより適切であると述べる表現で、「〜というよりはむしろ」「〜と言うより」という意味を表します。",
    "longExplanation": "「～というより」（多くは「AというよりB」の形）は、ある事柄を表現する際に、Aという言い方をするよりもBという言い方をしたほうが、より実情に合致しており的確であるという判断を示す比較表現です。「Aというよりは、むしろBだ」というニュアンスを含みます。",
    "formation": "動詞普通形 ＋ というより | い形容詞 ＋ というより | な形容詞 ＋ (だ)というより | 名詞 ＋ (だ)というより",
    "examples": [
      {
        "translation": "この部屋は狭いというより、居心地がいいです。"
      },
      {
        "translation": "彼は怖いというより、むしろ頼りがいがあります。"
      },
      {
        "translation": "映画はつまらないというより、少し長すぎました。"
      },
      {
        "translation": "彼女は友達というより、まるで家族のような存在です。"
      }
    ]
  },
  "ja_といっても_59": {
    "title": "～といっても (〜to ittemo)",
    "shortExplanation": "前述の事実を一応認めつつも、実際には聞き手が想像するほど大げさなものではないと程度を限定・補足する表現で、「〜と言っても実際は」「確かに〜だが」という意味を表します。",
    "longExplanation": "「～といっても」は、「確かに〜であることは事実だが、一般的なイメージや期待ほど程度が高かったり規模が大きかったりするわけではない」と、相手の過度な思い込みや誤解を防ぐために事実の範囲を限定・釈明する逆接的ニュアンスの表現です。",
    "formation": "動詞普通形 ＋ といっても | い形容詞 ＋ といっても | な形容詞 ＋ (だ)といっても | 名詞 ＋ (だ)といっても",
    "examples": [
      {
        "translation": "彼は有名だといっても、誰もが知っているわけではありません。"
      },
      {
        "translation": "このスープは辛いといっても、私にはちょうどいい辛さです。"
      },
      {
        "translation": "彼女は若いですが、経験があるといっても、まだ新人にすぎません。"
      },
      {
        "translation": "このレストランは高いといっても、美味しい料理が食べられるので価値があります。"
      }
    ]
  },
  "ja_とおり_60": {
    "title": "～とおり (〜toori)",
    "shortExplanation": "前に述べられた指示・予想・情報・基準と全く同じ状態や動作を行うことを表し、「〜と同じように」「〜に従って」という意味を表します。",
    "longExplanation": "「～とおり」（または「～とおりに」）は、見聞きしたこと、言われたこと、考えたこと、書かれている内容などに寸分違わず従って行動したり、物事がその基準通りに進行・成立したりすることを表します。名詞に直接接続する場合は連濁して「〜どおり」となることが一般的です。",
    "formation": "動詞（辞書形／た形／てある形）＋ とおり（に） | 名詞 ＋ のとおり（に）／名詞 ＋ どおり（に）",
    "examples": [
      {
        "translation": "先生のおっしゃったとおりに、宿題をやりました。"
      },
      {
        "translation": "地図に書いてあるとおりに行けば、駅に到着します。"
      },
      {
        "translation": "レシピのとおりにケーキを作りました。"
      },
      {
        "translation": "彼女は約束したとおり、時間どおりに来ました。"
      }
    ]
  },
  "ja_とく_61": {
    "title": "～とく (〜toku)",
    "shortExplanation": "準備や以後の便宜のために前もって動作を行うことを表す「〜ておく」の口語縮約表現で、「あらかじめ〜しておく」という意味を表します。",
    "longExplanation": "「～とく」は、日常のくだけた会話において「〜ておく」が音変化して縮まった形です（「〜ておく」→「〜とく」、「〜でおく」→「〜どく」）。将来の必要やトラブル回避のためにあらかじめ準備として動作を済ませておくことや、状態をそのまま保っておくことを表します。",
    "formation": "動詞て形から「て」を除いて「とく」を接続（～ておく → ～とく、～でおく → ～どく）",
    "examples": [
      {
        "translation": "夜遅くなるから、今晩のご飯をあらかじめ作っておきます。"
      },
      {
        "translation": "傘が必要かもしれないので、持っておきます。"
      },
      {
        "translation": "試験が近いから、今のうちから勉強しておこう。"
      },
      {
        "translation": "明日は忙しいので、前もって洗濯をしておきます。"
      }
    ]
  },
  "ja_ところが_62": {
    "title": "～ところが (〜tokoro ga)",
    "shortExplanation": "前述の動作・計画・予想から当然期待されることとは正反対の、意外な結果や事態が生じたことを表し、「ところが」「しかし意外にも」という意味を表します。",
    "longExplanation": "「～ところが」は、ある事柄や働きかけを行った結果、予想や期待とは食い違う予期せぬ結果が生じたことを述べる逆接表現です。話者の驚き、当惑、失望などの感情を伴うことが多く、文頭で接続詞「ところが、〜」として用いるほか、「動詞た形＋ところが」として従属節を導く形でも用いられます。",
    "formation": "動詞た形 ＋ ところが | 文1（予想や試み）＋ 。ところが、 ＋ 文2（予期せぬ結果）",
    "examples": [
      {
        "translation": "彼はいつも遅刻するのに、驚いたことに今日は早く来ました。"
      },
      {
        "translation": "昨日は暑かったのですが、打って変わって今日は寒くなりました。"
      },
      {
        "translation": "試合で負けると思ったのですが、思いがけず勝利しました。"
      },
      {
        "translation": "決勝戦で優勝しそうだったのですが、最後の1点で負けてしまいました。"
      }
    ]
  },
  "ja_ところだった_63": {
    "title": "～ところだった (〜tokoro datta)",
    "shortExplanation": "好ましくない事態や危険な状況の寸前までいきながら、実際には間一髪でそれを免れたことを表し、「もう少しで〜するところだった」「危うく〜しそうだった」という意味を表します。",
    "longExplanation": "「～ところだった」は、もう少しで失敗や事故、不都合な事態に陥りそうだったが、直前で回避できて実際には起こらずに済んだという過去の事実を振り返る表現です。文中では「もう少しで」「危うく」などの副詞と共起することが非常に多く見られます。",
    "formation": "動詞辞書形／動詞ない形 ＋ ところだった（「もう少しで」「危うく」などと呼応）",
    "examples": [
      {
        "translation": "もう少しで遅刻するところでした。"
      },
      {
        "translation": "彼が危うく事故に遭ってしまうところでした。"
      },
      {
        "translation": "電車に乗ろうとしたところでしたが、無情にもドアが閉まってしまいました。"
      },
      {
        "translation": "もう少しで忘れ物をしてしまうところでした。"
      }
    ]
  },
  "ja_ところで_64": {
    "title": "ところで (tokorode)",
    "shortExplanation": "これまでの会話の話題を打ち切って、全く新しい話題や質問へ転換するときに用いる接続詞で、「それはそうと」「話を切り替えるが」という意味を表します。",
    "longExplanation": "接続詞「ところで」は、それまでの話を一区切りさせ、意識的に別の新しい話題へ切り替えたり、ふと思い出した別の用件や質問を持ち出したりする際に使われます。会話の流れをスムーズに別のテーマへ移行させる働きを持ちます。",
    "formation": "文1 ＋ 。ところで、 ＋ 文2（新しい話題や問いかけ）",
    "examples": [
      {
        "translation": "ところで、昨日の宿題はもう終わりましたか。"
      },
      {
        "translation": "彼はプールで泳いでいます。ところで、お昼ご飯は何にしますか。"
      },
      {
        "translation": "昨日は楽しかったですね。ところで、この写真を見ましたか。"
      },
      {
        "translation": "ところで、明日の会議の時間をご存知ですか。"
      }
    ]
  },
  "ja_としたら_65": {
    "title": "～としたら (〜to shitara)",
    "shortExplanation": "ある事柄を仮にそうであると仮定・設定し、その条件のもとでの判断や対処を述べる表現で、「もし〜と仮定するならば」「仮に〜とすれば」という意味を表します。",
    "longExplanation": "「～としたら」は、「もし仮に〜という事態が成立すると想定した場合」と仮定の前提を提示し、その前提に基づいて導き出される話者の推量、判断、疑問、あるいは取るべき行動を後続の節で述べる仮定表現です。",
    "formation": "動詞普通形 ＋ としたら | い形容詞 ＋ としたら | な形容詞 ＋ だとしたら | 名詞 ＋ だとしたら",
    "examples": [
      {
        "translation": "もし明日雨が降ると仮定するなら、傘を持って行きましょう。"
      },
      {
        "translation": "もしこのケーキが美味しくないとすれば、誰も食べないでしょう。"
      },
      {
        "translation": "もし彼が病気なのだとしたら、すぐに病院へ行かせてあげてください。"
      },
      {
        "translation": "もし彼女が学生であるならば、このレストランでは学割がきくでしょう。"
      }
    ]
  },
  "ja_として_66": {
    "title": "～として (〜to shite)",
    "shortExplanation": "人や事物の資格・身分・立場・役割・名目・種類などを明確に示す表現で、「〜の資格で」「〜の立場で」「〜という名目で」という意味を表します。",
    "longExplanation": "「～として」は、名詞に直接接続して、その人物の社会的立場や身分、資格、あるいはその物が果たす役割や用途・名目を表す基本的な表現です。また、後ろの名詞を修飾する際には「〜としての＋名詞」という形をとります。",
    "formation": "名詞 ＋ として（名詞修飾時は 名詞 ＋ としての ＋ 名詞）",
    "examples": [
      {
        "translation": "彼は弁護士という資格・立場で働いています。"
      },
      {
        "translation": "この料理はおやつ・軽食として食べられます。"
      },
      {
        "translation": "彼女はリーダーの立場で周囲から尊敬されています。"
      },
      {
        "translation": "この本は参考書という名目で利用されています。"
      }
    ]
  },
  "ja_どんなにことか_67": {
    "title": "～どんなに～ことか (〜donna ni〜koto ka)",
    "shortExplanation": "感情や状態の程度が非常に甚だしいことを深く感嘆・強調して表す文末表現で、「どれほど〜だろうか」「本当に〜だ」という意味を表します。",
    "longExplanation": "「～どんなに～ことか」は、話し手が心の中で抱く強い感慨、苦労、喜びなどの感情の度合いが並大抵ではないことを感嘆を込めて強調する表現です。「言葉では言い尽くせないほど〜だ」という強いニュアンスを持ち、「どんなに」の代わりに「どれほど」「なんと」などが用いられることもあります。",
    "formation": "どんなに ＋ 動詞普通形／い形容詞／な形容詞な ＋ ことか",
    "examples": [
      {
        "translation": "どれほど疲れたことか、とても言葉では言い表せません。"
      },
      {
        "translation": "どれほど辛いことでしょう、彼女は毎日一生懸命に働いています。"
      },
      {
        "translation": "彼の成功がどれほど喜ばしいことか、心から嬉しく思います。"
      },
      {
        "translation": "みんなで旅行に行くのは、どれほど楽しいことでしょうか。"
      }
    ]
  },
  "ja_どんなにても_68": {
    "title": "どんなに～ても (donna ni ~ temo)",
    "shortExplanation": "動作や状態の度合いがどれほど極限に達しても、後件の結果や事実が全く変わらないことを表す逆接の条件表現で、「いくら〜しても」「どれほど〜であっても」という意味を表します。",
    "longExplanation": "「どんなに～ても」は、前件の条件や度合いがどれほど大きく高まろうとも、後件に示された結果、意志、状況には何ら影響を与えず、変わることがないという強い逆接条件（譲歩）を表します。「いくら〜ても」とほぼ同義で用いられます。",
    "formation": "どんなに ＋ 動詞て形 ＋ も | どんなに ＋ い形容詞語幹 ＋ くても | どんなに ＋ な形容詞／名詞 ＋ でも",
    "examples": [
      {
        "translation": "どれほど勉強しても、まだ理解できないことがあります。"
      },
      {
        "translation": "いくら速く走っても、彼には到底勝てません。"
      },
      {
        "translation": "どれほど疲れていても、仕事を片付けるまでは帰るわけにはいきません。"
      },
      {
        "translation": "いくら美味しくても、これ以上はもう食べられません。"
      }
    ]
  },
  "ja_ないことはない_69": {
    "title": "～ないことはない (〜nai koto wa nai)",
    "shortExplanation": "二重否定の形をとることによって、消極的・控えめに肯定のニュアンスを表し、「全く〜ないわけではない」「〜しようと思えばできる」という意味を表します。",
    "longExplanation": "「～ないことはない」（口語では「〜ないこともない」とも言います）は、「ない」を重ねることで、「決して完全に不可能だったり否定されるわけではないが、積極的に賛成・実行したいわけでもない（多少の条件や難点がある）」というニュアンスを込めて、控えめ・遠回しに肯定する表現です。",
    "formation": "動詞ない形 ＋ ことはない | い形容詞語幹 ＋ くない ＋ ことはない | な形容詞 ＋ ではない／じゃない ＋ ことはない | 名詞 ＋ ではない／じゃない ＋ ことはない",
    "examples": [
      {
        "translation": "この問題が解けないわけではありませんが、時間がかかりそうです。"
      },
      {
        "translation": "彼に会えないわけではないけれど、あまり会話はしたくありません。"
      },
      {
        "translation": "この映画を見ないわけではないけれど、ほかの映画のほうが面白いと思います。"
      },
      {
        "translation": "その本を読まないわけではありませんが、長いので心して読んでください。"
      }
    ]
  },
  "ja_ないと_70": {
    "title": "～ないと (〜nai to)",
    "shortExplanation": "否定の仮定条件を表し、「もし〜しなければ」「〜しないと」という意味で、後には不都合な結果や困った事態が続きます。",
    "longExplanation": "「～ないと」は、動詞のナイ形に接続して、「もしその動作を行わなければ」という否定の条件を表す表現です。その行為を行わないと、好ましくない結果や困った事態が必然的に生じることを述べる際に用いられます。また、日常会話において文末で用いられる場合は、「〜ないといけない」「〜ないとだめだ」の省略表現として、「〜しなければならない」という義務や必要性を表します。",
    "formation": "動詞ナイ形 ＋ と",
    "examples": [
      {
        "translation": "朝食を食べないと、お腹が空きます。"
      },
      {
        "translation": "宿題をしないと、先生に怒られます。"
      },
      {
        "translation": "充電をしないと、電話が使えなくなります。"
      },
      {
        "translation": "この事故を報告しないと、問題が大きくなります。"
      }
    ]
  },
  "ja_なぜなら_71": {
    "title": "～なぜなら (〜nazenara)",
    "shortExplanation": "先に述べた結果や結論に対してその理由や原因を説明する接続表現で、「なぜなら〜からだ」「理由は〜だからだ」という意味を表します。",
    "longExplanation": "「～なぜなら」（改まった表現では「なぜならば」）は、前の文で結果や判断、結論を述べた後、それに引き続いて「なぜそのような事態になったのか」という理由や根拠を明確に説明するために用いられる接続表現です。文末には通常「〜からだ」「〜からである」「〜から」などが呼応して、論理的な理由づけを行います。",
    "formation": "文（結果）。なぜなら（ば） ＋ 理由 ＋ から（だ）／だから",
    "examples": [
      {
        "translation": "このレストランが大好きです。なぜなら料理が美味しいからです。"
      },
      {
        "translation": "彼女は試験に合格しませんでした。なぜなら勉強しなかったからです。"
      },
      {
        "translation": "私は映画を見に行きません。なぜなら今日は忙しいからです。"
      },
      {
        "translation": "彼はこのプロジェクトを任せられます。なぜなら経験が豊富だからです。"
      }
    ]
  },
  "ja_など_72": {
    "title": "～など (〜nado)",
    "shortExplanation": "代表的な例をいくつか挙げて、他にも同種の物事があることを示す表現で、「〜など」「〜といったもの」という意味を表します。",
    "longExplanation": "「～など」は、名詞などに付いて代表的な例をいくつか示し、挙げられたもの以外にも同類のものがまだ存在することを含みとして表す副助詞です。すべてを網羅して挙げるのではなく一部を例示する際に用いられ、「AやBなど」の形で頻繁に使われます。",
    "formation": "名詞 ＋ など",
    "examples": [
      {
        "translation": "魚、果物などを市場で買いました。"
      },
      {
        "translation": "彼は日本語、英語、中国語などを話せます。"
      },
      {
        "translation": "美術館では絵画、彫刻などの作品を見ました。"
      },
      {
        "translation": "この店ではパン、ケーキなどのお菓子を売っています。"
      }
    ]
  },
  "ja_なんか_73": {
    "title": "～なんか (〜nanka)",
    "shortExplanation": "「など」のくだけた口語表現で、例示のほか、物事を軽視・謙遜したり、強く否定したりする気持ちを表し、「〜など」「〜なんて」という意味になります。",
    "longExplanation": "「～なんか」は、助詞「など」の口語的で親しい表現です。日常会話で例を挙げる際によく使われるほか、対象を「たいしたことではない」と見下したり軽んじたりするニュアンスや、自分自身をへりくだって言う謙遜の意を含みます。また、否定文と結びつくことで「決して〜ではない」と否定の気持ちを強調します。",
    "formation": "名詞 ＋ なんか | 動詞普通形 ＋ なんか | い形容詞 ＋ なんか | な形容詞 ＋ (な)なんか",
    "examples": [
      {
        "translation": "お金なんかいらない。"
      },
      {
        "translation": "彼はピアノなんかも弾けます。"
      },
      {
        "translation": "忙しいなんかじゃないよ。"
      },
      {
        "translation": "彼女は親切なんかじゃない。"
      }
    ]
  },
  "ja_において_74": {
    "title": "～において (〜ni oite)",
    "shortExplanation": "動作や事態が生じる場所、時代、時間、分野、状況などを表す改まった表現で、「〜で」「〜において」という意味を表します。",
    "longExplanation": "「～において」は、話し言葉の助詞「で」に相当する改まった書き言葉の文型です。動作や現象が起きる具体的な場所、時代や時間、学問・活動の分野、あるいは特定の場面や状況を取り上げる際に用いられます。後ろに続く名詞を修飾する際には「〜における＋名詞」の形をとります。",
    "formation": "名詞（場所・時代・時間・分野・状況） ＋ において（名詞修飾：〜における ＋ 名詞）",
    "examples": [
      {
        "translation": "日本において、お盆は家族が集まる大切な行事です。"
      },
      {
        "translation": "会議において、彼の意見が一番説得力がありました。"
      },
      {
        "translation": "科学の分野において、研究が日々進んでいます。"
      },
      {
        "translation": "幼少期において、子供たちは勢いよく物を覚えます。"
      }
    ]
  },
  "ja_にかわって_75": {
    "title": "～にかわって (〜ni kawatte)",
    "shortExplanation": "本来の担当者や人に代わって行動したり、代理を務めたりすることを表し、「〜の代わりに」「〜を代表して」という意味を表します。",
    "longExplanation": "「～にかわって」（漢字では「〜に代わって」「〜に換わって」）は、名詞に接続して、本来その行為を行うべき人に代わって別の人が代理として行動することや、以前のものに代わって新しいものがその役割を果たすことを表す文型です。後ろの名詞を修飾するときは「〜にかわる＋名詞」の形になります。",
    "formation": "名詞 ＋ にかわって（名詞修飾：〜にかわる ＋ 名詞）",
    "examples": [
      {
        "translation": "彼が病気なので、私が会議に出席することになりました。私が彼にかわって会議に出席します。"
      },
      {
        "translation": "母は忙しいので、私が母にかわって料理を作ります。"
      },
      {
        "translation": "今度の旅行は妹にかわって、私が一緒に行きます。"
      },
      {
        "translation": "先生が出張中でいないので、助手が先生にかわってクラスを担当します。"
      }
    ]
  },
  "ja_にしては_76": {
    "title": "～にしては (〜ni shite wa)",
    "shortExplanation": "ある基準や条件から当然予想されることとは異なっていることを表し、「〜の基準から考えると意外にも」「〜のわりには」という意味を表します。",
    "longExplanation": "「～にしては」は、具体的な事実や立場、条件を前提の基準として提示し、そこから通常予想される標準的な結果や水準と実際の様子が食い違っており、意外であるという評価や驚きを表す文型です。後ろには話し手の希望や意志を表す文は来ず、客観的な事実や評価が述べられます。",
    "formation": "動詞普通形 ＋ にしては | い形容詞 ＋ にしては | な形容詞（語幹／である） ＋ にしては | 名詞 ＋ にしては",
    "examples": [
      {
        "translation": "彼女は初心者にしては、上手に水泳ができます。"
      },
      {
        "translation": "このお寿司は安いにしては、とても美味しいです。"
      },
      {
        "translation": "彼は若いにしては、とても落ち着いています。"
      },
      {
        "translation": "あの人は外国人にしては、日本語がうまいです。"
      }
    ]
  },
  "ja_にしても_77": {
    "title": "～にしても (〜ni shitemo)",
    "shortExplanation": "仮定や譲歩を表し、「たとえ〜だとしても」「〜という場合であっても」という意味を表します。",
    "longExplanation": "「～にしても」は、ある条件や事実を一歩譲って認めたとしても、それによって話し手の判断や態度、後続の結論が変わることはないという譲歩の気持ちを表す文型です。「たとえ〜であってもやはり……」と述べるときに用いられ、批判や不満、義務的な判断などが続くことが多くあります。",
    "formation": "動詞普通形 ＋ にしても | い形容詞 ＋ にしても | な形容詞（語幹／である／だ） ＋ にしても | 名詞（語幹／である／だ） ＋ にしても",
    "examples": [
      {
        "translation": "雨が降るにしても、学校へ行かなければなりません。"
      },
      {
        "translation": "彼女が怒っているにしても、話し合いは避けられません。"
      },
      {
        "translation": "このレストランが高いにしても、料理の質がよくておすすめです。"
      },
      {
        "translation": "彼が有名だにしても、彼の私生活について話すのは失礼です。"
      }
    ]
  },
  "ja_について_78": {
    "title": "～について (〜ni tsuite)",
    "shortExplanation": "思考、発話、調査、研究などの対象や話題を取り上げて提示する表現で、「〜に関して」「〜のことを」という意味を表します。",
    "longExplanation": "「～について」は、名詞に接続して、話す、考える、調べる、書くなどの行為が向けられる具体的なテーマや対象・話題を提示する文型です。日常会話から公の場まで幅広く使われます。後ろに続く名詞を修飾する際には「〜についての＋名詞」という形をとります。",
    "formation": "名詞 ＋ について（名詞修飾：〜についての ＋ 名詞）",
    "examples": [
      {
        "translation": "日本の文化について学びたいです。"
      },
      {
        "translation": "彼の意見について話し合いましょう。"
      },
      {
        "translation": "この問題について詳しく教えてください。"
      },
      {
        "translation": "子供たちの教育について考えなければなりません。"
      }
    ]
  },
  "ja_にとって_79": {
    "title": "～にとって (〜ni totte)",
    "shortExplanation": "評価や判断の立場・基準となる対象を示し、「〜の立場から考えると」「〜には」という意味を表します。",
    "longExplanation": "「～にとって」は、人や組織などの名詞に接続して、その立場や視点から見た場合にどのような価値や意味、重要性を持つか、どう評価されるかを述べる文型です。後ろには「大切だ」「重要だ」「難しい」「必要だ」などの価値判断や評価を表す語句が続くのが特徴です。名詞を修飾するときは「〜にとっての＋名詞」の形になります。",
    "formation": "名詞（人・組織・立場） ＋ にとって（名詞修飾：〜にとっての ＋ 名詞）",
    "examples": [
      {
        "translation": "私にとって、健康は一番大切なことです。"
      },
      {
        "translation": "あの会社にとって、このプロジェクトは重要な意味があります。"
      },
      {
        "translation": "子供たちにとって、おもちゃは楽しいものです。"
      },
      {
        "translation": "外国人にとって、日本語は難しい言語の一つです。"
      }
    ]
  },
  "ja_によって_80": {
    "title": "～によって (〜ni yotte)",
    "shortExplanation": "原因・理由（〜のために）、手段・方法（〜を使って）、または対応・相違（〜に応じて・〜次第で）を表します。",
    "longExplanation": "「～によって」は多様な用法を持つ重要な文型で、主に次の意味を表します。(1) 事態を引き起こした原因や理由（「〜のために」）、(2) 行為や目的を達成するための手段・方法（「〜を使って」「〜の方法で」）、(3) 条件や場合によってそれぞれ異なること（「〜によってそれぞれ違う」「〜次第で」）、(4) 受身文における創造者・行為の主体。後ろの名詞を修飾する場合は「〜による＋名詞」の形をとります。",
    "formation": "名詞 ＋ によって（名詞修飾：〜による ＋ 名詞） | 動詞普通形 ＋ ことによって",
    "examples": [
      {
        "translation": "その事故は悪天候によって引き起こされました。"
      },
      {
        "translation": "生活習慣によって、健康状態が変わります。"
      },
      {
        "translation": "彼の成功は努力によって得られたものです。"
      },
      {
        "translation": "結果は試験の難易度によって異なります。"
      }
    ]
  },
  "ja_によれば_81": {
    "title": "～によれば (〜ni yoreba)",
    "shortExplanation": "情報や伝聞の出所・根拠を示す表現で、「〜の話では」「〜によると」という意味を表します。",
    "longExplanation": "「～によれば」（「〜によると」とほぼ同義）は、ニュース、天気予報、新聞記事、調査結果、人の話など、得られた情報の出所や根拠を提示する文型です。「〜から得た情報では」という意味を表し、文末には伝聞や推量を表す「〜そうだ」「〜ということだ」「〜らしい」「〜だろう」などの表現が呼応して用いられます。",
    "formation": "名詞（情報の出所） ＋ によれば ＋ 伝聞・推量の表現（〜そうだ／〜ということだ／〜らしい／〜だろう）",
    "examples": [
      {
        "translation": "天気予報によれば、明日は晴れるでしょう。"
      },
      {
        "translation": "先生によれば、この問題は簡単だそうです。"
      },
      {
        "translation": "調査によれば、若者の喫煙率が減っているということです。"
      },
      {
        "translation": "新聞記事によれば、その企業は倒産の危機にあるらしいです。"
      }
    ]
  },
  "ja_に対して_82": {
    "title": "～に対して (～ni taishite)",
    "shortExplanation": "行為や感情が向けられる相手・対象（「〜に向かって」）や、二つの事柄の対比（「〜と比べて一方は」）を表します。",
    "longExplanation": "「～に対して」は、主に2つの用法を持つ文型です。(1) 態度、動作、感情、働きかけの向けられる対象や相手を提示する用法（「〜を対象として」「〜に向かって」）。(2) 2つの人・物事や状況を取り上げ、それらが著しく対照的・対比的であることを示す用法（「〜であるのとは違って」「〜に反して」）。後ろの名詞を修飾する際には「〜に対する＋名詞」の形をとります。",
    "formation": "名詞 ＋ に対して | 普通形（な形容詞＋な／である＋の、名詞＋な／である＋の） ＋ に対して（名詞修飾：〜に対する ＋ 名詞）",
    "examples": [
      {
        "translation": "子供たちに対して、親は常にやさしくあるべきです。"
      },
      {
        "translation": "彼は質問に対して正直に答えました。"
      },
      {
        "translation": "田中さんは成功したのに対して、佐藤さんは失敗しました。"
      },
      {
        "translation": "彼の意見に対して、私は反対の立場を取りました。"
      }
    ]
  },
  "ja_に比べて_83": {
    "title": "～に比べて (〜ni kurabete)",
    "shortExplanation": "物事を比較する基準を示し、「〜と比較して」「〜よりも」という意味を表します。",
    "longExplanation": "「～に比べて」は、動詞「比べる」から派生した文型で、ある人や事物、事態を比較の基準として取り上げ、それと引き比べることで後項の性質や程度、状態の相違を際立たせて述べる際に用いられます。「〜に比べ」「〜に比べると」という形でも同様の意味で使われます。",
    "formation": "名詞 ＋ に比べて | 動詞・形容詞普通形 ＋ のに比べて",
    "examples": [
      {
        "translation": "夏に比べて、冬は寒いです。"
      },
      {
        "translation": "このトマトは赤いトマトに比べて美味しくないです。"
      },
      {
        "translation": "彼は私に比べて英語が上手です。"
      },
      {
        "translation": "東京に比べて、京都は静かな町です。"
      }
    ]
  },
  "ja_に関して_84": {
    "title": "～に関して (〜ni kanshite)",
    "shortExplanation": "取り上げる話題や関連する事柄を提示する改まった表現で、「〜について」「〜に関連して」という意味を表します。",
    "longExplanation": "「～に関して」は、「〜について」よりも改まった硬い表現で、あるテーマや内容、関連する幅広い領域を話題として取り上げる際に用いられます。調査、研究、報告書、公の議論、ニュースなどで頻繁に使われます。後ろに続く名詞を修飾する際には「〜に関する＋名詞」の形をとります。",
    "formation": "名詞 ＋ に関して（名詞修飾：〜に関する ＋ 名詞）",
    "examples": [
      {
        "translation": "健康に関して気を付けることが大切です。"
      },
      {
        "translation": "このプロジェクトに関しては、彼がすべての詳細を知っています。"
      },
      {
        "translation": "環境問題に関して、私たちはもっと責任を持たなければなりません。"
      },
      {
        "translation": "この事件に関しての情報はまだ十分ではありません。"
      }
    ]
  },
  "ja_の_85": {
    "title": "～の～ (〜no 〜)",
    "shortExplanation": "2つの名詞をつなぎ、所有、所属、性質、所在などの関係を表す表現で、「〜の」という意味を表します。",
    "longExplanation": "助詞「の」は、名詞と名詞を接続して（名詞1＋の＋名詞2）、前の名詞が後ろの名詞を修飾・限定する最も基本的な文法です。所有（私の傘）、所属・所在（東京のスポット）、性質・分野（音楽の先生）など、事物の多様な関係性を明示します。",
    "formation": "名詞1 ＋ の ＋ 名詞2",
    "examples": [
      {
        "translation": "これは私の傘です。"
      },
      {
        "translation": "あのビルは東京の有名な観光スポットです。"
      },
      {
        "translation": "彼は部長の秘書です。"
      },
      {
        "translation": "彼女は音楽の先生です。"
      }
    ]
  },
  "ja_ばかり_86": {
    "title": "～ばかり (〜bakari)",
    "shortExplanation": "ある物事が大部分を占めていることや、同じ動作を繰り返してばかりいることを表し、「〜だけ」「〜ばかり」という意味を表します（不満や非難のニュアンスを伴うことが多い）。",
    "longExplanation": "「～ばかり」は、名詞に接続して「そればかりがたくさんある」（名詞＋ばかり）状態を表したり、動詞て形に接続して「他のことをせずその行為ばかりを繰り返している」（動詞て形＋ばかりいる）様子を表したりする副助詞です。話し手の不満、呆れ、非難などの感情を伴って使われることが多くあります。",
    "formation": "名詞 ＋ ばかり | 動詞て形 ＋ ばかり（いる）",
    "examples": [
      {
        "translation": "彼はゲームばかりしている。"
      },
      {
        "translation": "この部屋は綺麗なものばかりだ。"
      },
      {
        "translation": "彼女は勉強ばかりしていて、遊んでいる暇がない。"
      },
      {
        "translation": "彼の話は嘘ばかりで、信じることができない。"
      }
    ]
  },
  "ja_ばかりか_87": {
    "title": "～ばかりか (〜bakarika) ～も (mo)",
    "shortExplanation": "前に述べた事柄だけでなく、さらにそれ以上のことが加わることを表し、「〜だけでなく〜も」「〜にとどまらず」という意味を表します。",
    "longExplanation": "「～ばかりか」（後節には多く「～も」が呼応する）は、「前項の事柄だけに限定されず、さらに後項のような別の事柄や、より程度の高い事態まで付加される」と強調する文型です。前後の節は良いこと同士、あるいは悪いこと同士でそろえて使われるのが一般的です。",
    "formation": "動詞普通形 ＋ ばかりか | い形容詞 ＋ ばかりか | な形容詞 ＋ (な／である)ばかりか | 名詞 ＋ (である)ばかりか",
    "examples": [
      {
        "translation": "彼女は英語ばかりか、フランス語も話せます。"
      },
      {
        "translation": "このレストランは味が良いばかりか、サービスも素晴らしい。"
      },
      {
        "translation": "パーティは楽しかったばかりか、料理も美味しかった。"
      },
      {
        "translation": "彼は頭がいいばかりか、スポーツも得意だ。"
      }
    ]
  },
  "ja_はずだ_88": {
    "title": "～はずだ (〜hazu da)",
    "shortExplanation": "確かな根拠や道理、既知の事実に基づいて、「当然そうなるはずだ」と高い確信を持って判断・推測する表現で、「〜に違いない」「〜はずだ」という意味を表します。",
    "longExplanation": "「～はずだ」は、客観的な理由や証拠、自然の摂理、常識などから論理的に考えて「当然そうであるべきだ」「そうなるのが妥当だ」と話し手が強い自信を持って述べる推量・期待の表現です。",
    "formation": "動詞普通形 ＋ はずだ | い形容詞 ＋ はずだ | な形容詞 ＋ なはずだ | 名詞 ＋ のはずだ",
    "examples": [
      {
        "translation": "彼はもう着いたはずだ。"
      },
      {
        "translation": "この薬を飲むと、痛みがなくなるはずだ。"
      },
      {
        "translation": "明日は晴れるはずだ。"
      },
      {
        "translation": "彼女は元気なはずだ。"
      }
    ]
  },
  "ja_ばのに_89": {
    "title": "～ば～のに (〜ba 〜noni)",
    "shortExplanation": "事実とは異なる反実仮想の条件を述べることで、残念な気持ちや後悔、不満のニュアンスを表し、「〜すればよかったのに」「〜だったらいいのに」という意味を表します。",
    "longExplanation": "「～ば～のに」は、仮定形「〜ば」と終助詞「〜のに」が結びついた構文です。現実とは逆の状況を仮定して「もしそうしていれば望ましい結果になったはずなのに、実際はそうならず残念だ」と、強い悔恨や心残りの感情を吐露する際に用いられます。",
    "formation": "動詞ば形 ＋ ～のに | い形容詞語幹 ＋ ければ ＋ ～のに | な形容詞 ＋ であれば／なら ＋ ～のに | 名詞 ＋ であれば／なら ＋ ～のに",
    "examples": [
      {
        "translation": "もっと早く来れば、電車に間に合ったのに。"
      },
      {
        "translation": "もっと勉強すれば、試験に合格したのに。"
      },
      {
        "translation": "彼女がもっと優しければ、彼と上手くいくのに。"
      },
      {
        "translation": "日本語が上手であれば、この本が読めるのに。"
      }
    ]
  },
  "ja_ばほど_90": {
    "title": "～ば～ほど (〜ba 〜hodo)",
    "shortExplanation": "前項の程度が高まるにつれて、それに比例して後項の程度もさらに変化することを表し、「〜すればするほど」「〜であればあるほど」という意味を表します。",
    "longExplanation": "「～ば～ほど」は、同じ動詞や形容詞を仮定形（ば形）と基本形＋「ほど」の形で重ねて用い、ある事態の進行や程度の上昇に正比例して、後続の結果や影響の度合いも増大していく関係性を表す構文です。",
    "formation": "動詞ば形 ＋ 動詞辞書形 ＋ ほど | い形容詞語幹 ＋ ければ ＋ い形容詞 ＋ ほど | な形容詞 ＋ であれば／なら ＋ な形容詞 ＋ なほど",
    "examples": [
      {
        "translation": "早く起きれば起きるほど、時間がたくさんある。"
      },
      {
        "translation": "練習すればするほど、上達します。"
      },
      {
        "translation": "料理が美味しければ美味しいほど、皆が喜びます。"
      },
      {
        "translation": "日本語が上手であれば上手なほど、日本の生活が楽になります。"
      }
    ]
  },
  "ja_はもちろんも_91": {
    "title": "～はもちろん～も (〜wa mochiron 〜mo)",
    "shortExplanation": "前項の事柄は当然のこととして前提に置き、さらに後項も同様であると付け加えて強調する表現で、「〜は当然として〜も」「〜はもちろんのこと」という意味を表します。",
    "longExplanation": "「～はもちろん～も」は、誰もが納得する当然の具体例（前項）をまず挙げておき、「それだけでなく、実は後項の事柄もそうなのだ」と対象を広げて強調する構文です。日常会話からビジネス文書まで幅広く用いられます。",
    "formation": "名詞1 ＋ はもちろん ＋ 名詞2 ＋ も",
    "examples": [
      {
        "translation": "彼は数学はもちろん、英語も得意です。"
      },
      {
        "translation": "このレストランは和食はもちろん、洋食も美味しいです。"
      },
      {
        "translation": "私の趣味は音楽はもちろん、読書も大好きです。"
      },
      {
        "translation": "東京は観光はもちろん、ビジネスも盛んです。"
      }
    ]
  },
  "ja_ばよかった_92": {
    "title": "～ばよかった (〜ba yokatta)",
    "shortExplanation": "過去にしなかった行動について、「そうすれば望ましい結果が得られたのに」と後悔や心残りを表す表現で、「〜すればよかった」「〜しておけばよかった」という意味を表します。",
    "longExplanation": "「～ばよかった」は、過去の事態を振り返り、実際には行わなかった行為を取り上げて「あの時そうしていればよかったのに、しなかったことを悔やんでいる」と、後悔や反省、未練の気持ちを吐露する文型です。",
    "formation": "動詞ば形 ＋ よかった | い形容詞語幹 ＋ ければよかった | な形容詞 ＋ ならよかった",
    "examples": [
      {
        "translation": "もっと早く起きればよかった。"
      },
      {
        "translation": "昨日のパーティーに行けばよかった。"
      },
      {
        "translation": "もっと安いものを買えばよかった。"
      },
      {
        "translation": "あの時、もっと勉強すればよかった。"
      }
    ]
  },
  "ja_ふりをする_93": {
    "title": "～ふりをする (〜furi wo suru)",
    "shortExplanation": "実際はそうではないのに、まるでそうであるかのように見せかける態度をとることを表し、「〜のふりをする」「〜を装う」という意味を表します。",
    "longExplanation": "「～ふりをする」は、本当の事実や本心とは異なる様子を他人の前で意図的に演じたり、ごまかしたりする行動を指す表現です。外見や仕草を取り繕って「〜のように見せる」というニュアンスを持ちます。",
    "formation": "動詞普通形 ＋ ふりをする | い形容詞 ＋ ふりをする | な形容詞 ＋ な ＋ ふりをする | 名詞 ＋ の ＋ ふりをする",
    "examples": [
      {
        "translation": "彼は知らないふりをしました。"
      },
      {
        "translation": "彼女は病気のふりをして、学校を休みました。"
      },
      {
        "translation": "彼は嬉しいふりをしていますが、本当は悲しいです。"
      },
      {
        "translation": "彼女はリーダーのふりをして、チームを率いました。"
      }
    ]
  },
  "ja_べきだ_94": {
    "title": "～べきだ (〜beki da)",
    "shortExplanation": "社会的な常識や道徳観、責任、義務などから考えて「そうするのが当然だ」と主張する表現で、「〜するのが当たり前だ」「〜しなければならない」という意味を表します。",
    "longExplanation": "「～べきだ」は、古語の助動詞「べし」に由来し、人間としての道理、良識、あるいは社会的立場から判断して、「そう行動することが義務であり当然である」と強く確信して述べる表現です。目上の人に対して直接使うのは失礼に当たることがあります。",
    "formation": "動詞辞書形 ＋ べきだ（「する」は「すべきだ」「するべきだ」）",
    "examples": [
      {
        "translation": "勉強するべきだ。"
      },
      {
        "translation": "早く寝るべきだ。"
      },
      {
        "translation": "静かにするべきだ。"
      },
      {
        "translation": "彼に謝るべきだ。"
      }
    ]
  },
  "ja_ほど_95": {
    "title": "～ほど～ (〜hodo〜)",
    "shortExplanation": "主に「AはBほど…ない」の否定の形で用いられ、程度を比較して「AはBのレベルに及ばない」「〜ほど…なものはない」という意味を表します。",
    "longExplanation": "「～ほど…ない」は、Bを比較の基準や極限として掲げ、主語であるAがその程度に達していないことを表す比較構文です（「AはBほど〜ではない」）。また「〜ほど…はない」という形にすると、「〜が一番…だ」という最上級の強調表現になります。",
    "formation": "名詞 ＋ ほど ＋ 形容詞／動詞否定形（ない）",
    "examples": [
      {
        "translation": "彼女は私ほど速く走ることができません。"
      },
      {
        "translation": "このケーキはあのケーキほど美味しくない。"
      },
      {
        "translation": "日本ほど四季がはっきりしている国はない。"
      },
      {
        "translation": "東京は大阪ほど人が多くない。"
      }
    ]
  },
  "ja_ますように_96": {
    "title": "～ますように (〜masu you ni)",
    "shortExplanation": "文末に用いて、自分や他者の幸福、目標の達成などを神仏に祈ったり願ったりする表現で、「〜しますように」「〜でありますように」という意味を表します。",
    "longExplanation": "「～ますように」は、神社やお寺での祈願、七夕の短冊、あるいは手紙やメッセージの末尾などで、心からの願い事や相手への祝福の気持ちを込めて使われる祈願の文型です。",
    "formation": "動詞ます形 ＋ ように",
    "examples": [
      {
        "translation": "明日のテストで良い点をとりますように。"
      },
      {
        "translation": "彼が無事に帰ってきますように。"
      },
      {
        "translation": "みんなが健康でいられますように。"
      },
      {
        "translation": "彼女に幸せになりますように。"
      }
    ]
  },
  "ja_まったくない_97": {
    "title": "まったく～ない (mattaku ~nai)",
    "shortExplanation": "副詞「まったく」が後ろの否定表現と呼応して、事態や状態を全面的・徹底的に否定する表現で、「全然〜ない」「少しも〜ない」という意味を表します。",
    "longExplanation": "「まったく～ない」は、打消しの語（ない、ではない等）を伴って、ある動作や性質がゼロであることを強調する完全否定の呼応構文です。「少しも〜の傾向がない」「完全に否定される」という強いニュアンスを相手に伝えます。",
    "formation": "まったく ＋ 動詞否定形（ない） | まったく ＋ い形容詞語幹 ＋ くない | まったく ＋ な形容詞／名詞 ＋ ではない",
    "examples": [
      {
        "translation": "彼は、まったく覚えていない。"
      },
      {
        "translation": "この部屋はまったく暖かくない。"
      },
      {
        "translation": "彼女はまったく遅れていない。"
      },
      {
        "translation": "これはまったく便利ではない。"
      }
    ]
  },
  "ja_まで_98": {
    "title": "～まで (〜made)",
    "shortExplanation": "時間、空間、場所、数量などの終点や限界を示し、「〜まで」「〜に至るまで」という意味を表します。",
    "longExplanation": "助詞「～まで」は、動作や事態の及ぶ時間的・空間的な終着点や限界、範囲の極限を示す文法です。動詞辞書形に接続する場合は、ある状態に達するその時点まで動作が継続することを表します。",
    "formation": "名詞（時間・場所・数量など） ＋ まで | 動詞辞書形 ＋ まで",
    "examples": [
      {
        "translation": "10時まで働きます。"
      },
      {
        "translation": "東京まで電車で行きます。"
      },
      {
        "translation": "彼は疲れるまで走りました。"
      },
      {
        "translation": "5ページまで読んでください。"
      }
    ]
  },
  "ja_まま_99": {
    "title": "～まま (〜mama)",
    "shortExplanation": "ある状態が変化せずにそのまま保たれている様子を表し、「〜の状態のままで」「〜したままで」という意味を表します。",
    "longExplanation": "「～まま」は、動作の結果生じた状態や現在の様子が、何の変更や後始末も加えられないまま継続しており、その状態のまま次の動作を行うことを表す表現です。通常とは異なる状態が続いていることへの言及や、そのまま放置されているニュアンスを含むことが多くあります。",
    "formation": "動詞た形／ない形 ＋ まま | い形容詞 ＋ まま | な形容詞 ＋ なまま | 名詞 ＋ のまま",
    "examples": [
      {
        "translation": "部屋の窓を開けたまま寝ました。"
      },
      {
        "translation": "熱いままのコーヒーを飲んで、舌を焦がしました。"
      },
      {
        "translation": "彼は忙しいなまま、休みの日も仕事をしています。"
      },
      {
        "translation": "彼女は故郷にいるまま、外国に行かないで仕事を見つけた。"
      }
    ]
  },
  "ja_まるでよう_100": {
    "title": "まるで～よう (maru de ~ you)",
    "shortExplanation": "ある事物の様子を別のものに例えて強調する比喩の表現で、「まるで〜のようだ」「あたかも〜のようだ」という意味を表します。",
    "longExplanation": "副詞「まるで」と比喩を表す「〜よう」が呼応し、実際は異なるものの、極めてよく似ている様子を強調して表現する文型です。名詞を修飾するときは「まるで〜ような＋名詞」、用言を修飾するときは「まるで〜ように」、文末では「まるで〜ようだ」の形をとります。",
    "formation": "まるで ＋ 名詞 ＋ のよう(だ／な／に) | まるで ＋ 動詞・形容詞普通形 ＋ よう(だ／な／に)",
    "examples": [
      {
        "translation": "彼女はまるで天使のように美しい。"
      },
      {
        "translation": "彼はまるでロボットのように仕事をしている。"
      },
      {
        "translation": "あの家はまるでお城のようだ。"
      },
      {
        "translation": "ここはまるで楽園のような場所です。"
      }
    ]
  },
  "ja_てみる_101": {
    "title": "～てみる (〜te miru)",
    "shortExplanation": "どのような結果になるかを確かめるために、試しにある行動を行うことを表し、「〜してみる」という意味を表します。",
    "longExplanation": "動詞のて形に補助動詞「みる」が接続し、未知の結果や状態、味などを確かめる目的で、実験的・試行的に動作を行うことを表します。実際に視覚で見るのではなく、「試みにその動作をする」という意味合いになります。",
    "formation": "動詞て形 ＋ みる",
    "examples": [
      {
        "translation": "彼は走ってみたが、まだ膝が痛いと感じた。"
      },
      {
        "translation": "彼女は料理を作ってみたが、失敗してしまった。"
      },
      {
        "translation": "初めてのデートで、彼は彼女にサプライズをしようと考え、歌ってみた。"
      },
      {
        "translation": "このケーキは美味しそうだから、味見に食べてみる。"
      }
    ]
  },
  "ja_みたいだ_102": {
    "title": "～みたいだ (〜mitai da)",
    "shortExplanation": "五感を通じた直感的な推量や比喩を表すくだけた口語表現で、「〜のようだ」「〜に見える」という意味を表します。",
    "longExplanation": "「～ようだ」の口語形として日常会話で非常によく使われる表現です。見たり聞いたりした感覚的な根拠をもとに不確実な推量を述べたり（「疲れているみたいだ」）、事物の類似性を例えたり（「子どものみたいだ」）する際に用います。名詞を修飾する場合は「〜みたいな＋名詞」、用言を修飾する場合は「〜みたいに」となります。",
    "formation": "動詞普通形 ＋ みたいだ | い形容詞 ＋ みたいだ | な形容詞語幹 ＋ みたいだ | 名詞 ＋ みたいだ",
    "examples": [
      {
        "translation": "彼は怒っているみたいだ。"
      },
      {
        "translation": "そのビルは古いみたいだ。"
      },
      {
        "translation": "彼女は疲れているみたいだ。"
      },
      {
        "translation": "この料理は辛いみたいだ。"
      }
    ]
  },
  "ja_めったにない_103": {
    "title": "～めったに～ない (〜metta ni 〜nai)",
    "shortExplanation": "ある動作や出来事が起こる頻度が極めて低いことを表し、「ほとんど〜ない」「めったに〜しない」という意味を表します。",
    "longExplanation": "副詞「めったに」は常に後続の否定表現「〜ない」と呼応して用いられます。日常的な場面において、ある事柄が発生する頻度が非常に稀であり、滅多なことでは起こらないという状況を強調します。",
    "formation": "めったに ＋ 動詞ない形 | めったに ＋ い形容詞語幹 ＋ くない | めったに ＋ な形容詞 ＋ ではない／じゃない",
    "examples": [
      {
        "translation": "彼はめったに外食しない。"
      },
      {
        "translation": "私はめったに寿司を食べない。"
      },
      {
        "translation": "この地域はめったに雪が降らない。"
      },
      {
        "translation": "彼女はめったに怒らない。"
      }
    ]
  },
  "ja_めったにない_104": {
    "title": "～めったにない (〜metta ni nai)",
    "shortExplanation": "事態や現象、機会などが極めて稀であり、珍しいことを表し、「めったにない」「めったに見られない」という意味を表します。",
    "longExplanation": "述語として「〜はめったにない」と用いるほか、「めったにない＋名詞」（めったにないチャンス）のように名詞修飾としても用いられます。動詞の形式名詞化を伴う「動詞辞書形＋ことは／のはめったにない」の形で、その事柄の生起確率が極度に低く希少であることを明示します。",
    "formation": "動詞辞書形 ＋ (こと／の)はめったにない | 名詞 ＋ はめったにない | めったにない ＋ 名詞",
    "examples": [
      {
        "translation": "この町では雪が降ることはめったにない。"
      },
      {
        "translation": "彼はめったに外食しない。"
      },
      {
        "translation": "友達が遊びに来るのはめったにない。"
      },
      {
        "translation": "彼女はめったに怒らない。"
      }
    ]
  },
  "ja_もしかするとかもしれない_105": {
    "title": "もしかすると〜かもしれない (moshikasuru to 〜kamoshirenai)",
    "shortExplanation": "確実ではないものの、ある事態が起こる可能性があることを控えめに推量する表現で、「ひょっとすると〜かもしれない」という意味を表します。",
    "longExplanation": "文頭の副詞「もしかすると」と文末の推量の助動詞「かもしれない」が呼応し、確たる根拠はないものの、ある可能性を排除できない話し手の不確実な推測を表します。可能性が低いと予想される場合にも控えめに言及する際に適しています。",
    "formation": "もしかすると ＋ 動詞・形容詞普通形 ＋ かもしれない | もしかすると ＋ な形容詞語幹・名詞 ＋ かもしれない",
    "examples": [
      {
        "translation": "もしかすると彼は遅刻するかもしれない。"
      },
      {
        "translation": "もしかすると彼女は疲れているかもしれない。"
      },
      {
        "translation": "もしかすると雨が降るかもしれない。"
      },
      {
        "translation": "もしかすると彼らはその映画が好きじゃないかもしれない。"
      }
    ]
  },
  "ja_もしたなら_106": {
    "title": "もし～たなら (moshi ~ tanara)",
    "shortExplanation": "事態の発生や完了を仮定の前提として強調する表現で、「もし〜した場合は」「仮に〜だったなら」という意味を表します。",
    "longExplanation": "仮定を表す副詞「もし」と過去形「〜た」に接続助詞「なら」が呼応し、ある事態が生じたこと、あるいは成立した状態を前提条件として際立たせる文型です。後件には話し手の判断、提案、助言、依頼などが続くことが一般的です。",
    "formation": "もし ＋ 動詞た形 ＋ なら | もし ＋ い形容詞語幹 ＋ かったなら | もし ＋ な形容詞／名詞 ＋ だったなら",
    "examples": [
      {
        "translation": "もし雨が降ったなら、傘を持って行きましょう。"
      },
      {
        "translation": "もしケーキが美味しくなかったなら、誰も食べないでしょう。"
      },
      {
        "translation": "もし彼が病気だったなら、すぐに病院に行かせてあげてください。"
      },
      {
        "translation": "もし彼女が学生だったなら、このレストランは割引があるでしょう。"
      }
    ]
  },
  "ja_もしても_107": {
    "title": "もし～ても (moshi ~ temo)",
    "shortExplanation": "仮定の逆接条件を表し、前項の事態が起こったとしても後項の結果や意志に変わりがないことを表し、「たとえ〜ても」「仮に〜だとしても」という意味を表します。",
    "longExplanation": "副詞「もし」と逆接確定・仮定の接続助詞「〜ても／〜でも」が呼応し、前項の条件が成立したとしても、それによって後項の行動や事態が妨げられることはなく、予定や意志が不変であることを強調する表現です。",
    "formation": "もし ＋ 動詞て形 ＋ も | もし ＋ い形容詞語幹 ＋ くても | もし ＋ な形容詞／名詞 ＋ でも",
    "examples": [
      {
        "translation": "もし雨が降っても、ピクニックに行きます。"
      },
      {
        "translation": "もし彼が謝っても、まだ怒っているでしょう。"
      },
      {
        "translation": "もし試験に合格しても、まだ勉強を続けます。"
      },
      {
        "translation": "もし彼女が遅く来ても、待っています。"
      }
    ]
  },
  "ja_もしもなら_108": {
    "title": "もしも～なら (moshimo ~ nara)",
    "shortExplanation": "不確定な事態や万が一の可能性を強く意識して仮定する表現で、「もしも〜であるならば」「万が一〜なら」という意味を表します。",
    "longExplanation": "「もし」よりも仮定のニュアンスが強く、起こる可能性が低い事柄や万が一の事態、あるいは架空の状況を想定して述べる文型です。後件には、その事態が起こった場合にとるべき判断や対応、心構えなどが示されます。",
    "formation": "もしも ＋ 動詞・形容詞普通形 ＋ なら | もしも ＋ な形容詞語幹 ＋ なら | もしも ＋ 名詞 ＋ なら",
    "examples": [
      {
        "translation": "もしも明日雨が降ったなら、出かけません。"
      },
      {
        "translation": "もしも彼が来なかったなら、私たちだけでパーティーをします。"
      },
      {
        "translation": "もしも彼女が疲れているなら、休ませてあげてください。"
      },
      {
        "translation": "もしもそれが真実なら、認めなければなりません。"
      }
    ]
  },
  "ja_ようとしない_109": {
    "title": "～ようとしない (〜you to shinai)",
    "shortExplanation": "第三者がある行動を起こす意志や兆候を全く示さないことを表し、「〜する気がない」「〜しようとしない」という意味を表します。",
    "longExplanation": "動詞の意向形（意志形）に助詞「と」と否定の「しない」が接続し、第三者がその行為を行う意思を全く見せない様子を表します。本来行うべき行動に対して積極性や意欲が見られないことに対し、話し手の不満、非難、もどかしさなどの感情が込められることが多いです。",
    "formation": "動詞意向形 ＋ としない",
    "examples": [
      {
        "translation": "彼は勉強しようとしない。"
      },
      {
        "translation": "彼女は謝ろうとしない。"
      },
      {
        "translation": "息子は部屋を片付けようとしない。"
      },
      {
        "translation": "犬は散歩に行こうとしない。"
      }
    ]
  },
  "ja_ようと思う_110": {
    "title": "～ようと思う (〜you to omou)",
    "shortExplanation": "話し手の意志やこれからの計画・予定を表し、「〜しようと考えている」「〜するつもりだ」という意味を表します。",
    "longExplanation": "動詞の意向形（意志形）に「と思う」が接続し、話し手自身の自発的な意志や計画を表明する表現です。発話の時点で思い立ったことには「〜ようと思う」、以前から継続して考えている計画や予定には「〜ようと思っている」を用いるのが自然です。",
    "formation": "動詞意向形 ＋ と思う／と思っている",
    "examples": [
      {
        "translation": "今日は早く寝ようと思います。"
      },
      {
        "translation": "明日美術館に行こうと思っています。"
      },
      {
        "translation": "新しいカメラを買おうと思います。"
      },
      {
        "translation": "来週友達と映画を見ようと思っています。"
      }
    ]
  },
  "ja_ように_111": {
    "title": "～ように (〜you ni)",
    "shortExplanation": "後項の動作が目指す目的や目標を表す用法と、事物の様子を別のものに例える比喩の用法の両方を表し、「〜するために」「〜のように」という意味を表します。",
    "longExplanation": "「～ように」には主に2つの機能があります。(1) 目的・目標：無意志動詞や可能動詞、否定形などに接続し、ある望ましい状態や結果を実現させるために後項の行動を行うことを示します。(2) 比喩・様態：名詞や用言に接続し、事物の類似性や見かけの様子を表します。",
    "formation": "動詞辞書形／ない形 ＋ ように | い形容詞 ＋ ように | な形容詞 ＋ なように | 名詞 ＋ のように",
    "examples": [
      {
        "translation": "早く家に帰るように、仕事を急いで終わらせました。"
      },
      {
        "translation": "彼女は美しい花のように見えました。"
      },
      {
        "translation": "この部屋がきれいになるように、掃除をしましょう。"
      },
      {
        "translation": "山田さんは元気なように振る舞っていましたが、実際は疲れているらしいです。"
      }
    ]
  },
  "ja_ように_112": {
    "title": "～ように (〜you ni)",
    "shortExplanation": "望ましい状態や結果を達成するための目的（「〜できるように」「〜となるように」）や、事物を例える比喩（「〜のように」）を表します。",
    "longExplanation": "前項に達成したい望ましい状態や目標を掲げ、後項でその実現に向けた準備や努力を行うことを示す目的の表現です。前項には可能動詞や無意志動詞が接続することが多く、実現を目指すニュアンスを表します。また、名詞に接続して比喩的な描写を行うこともできます。",
    "formation": "動詞辞書形／可能形／ない形 ＋ ように | 名詞 ＋ のように",
    "examples": [
      {
        "translation": "子供が安全に過ごせるように、家の中を整理します。"
      },
      {
        "translation": "美しい花のように、彼女は笑顔が素敵です。"
      },
      {
        "translation": "自然に英語を話せるように、毎日練習しています。"
      },
      {
        "translation": "成功するように、計画を立てましょう。"
      }
    ]
  },
  "ja_ように_113": {
    "title": "～ように (〜you ni)",
    "shortExplanation": "動作が行われる様態や配慮の仕方（「〜となるように」）、努力の目標、あるいは動作の比喩（「〜のように」）を表します。",
    "longExplanation": "後項の動作を行う際の配慮や様態のあり方を指定したり、日常的な努力や心がけの方向性を示したりする表現です。また、動作が何かに似ている様子を表す比喩としても幅広く用いられます。",
    "formation": "動詞辞書形／ない形 ＋ ように | い形容詞 ＋ ように | 名詞 ＋ のように",
    "examples": [
      {
        "translation": "分かりやすいように説明してください。"
      },
      {
        "translation": "彼は鳥のように歌います。"
      },
      {
        "translation": "友達と仲良くするように努めています。"
      },
      {
        "translation": "日本語が上手になるように勉強しています。"
      }
    ]
  },
  "ja_ようにしましょう_114": {
    "title": "～ようにしましょう (〜you ni shimashou)",
    "shortExplanation": "ある行動を習慣づけたり努力して実行したりするよう、相手に優しく勧めたり呼びかけたりする表現で、「〜するように努めましょう」「〜することを心がけましょう」という意味を表します。",
    "longExplanation": "努力や心がけ、習慣化を表す「〜ようにする」に、丁寧な勧誘・呼びかけを表す「〜ましょう」が接続した文型です。望ましい生活習慣の定着や好ましい行動様式について、相手に強制することなく、互いに努力しようと前向きに促す場面で頻繁に使われます。",
    "formation": "動詞辞書形 ＋ ようにしましょう | 動詞ない形 ＋ ようにしましょう",
    "examples": [
      {
        "translation": "毎日運動するようにしましょう。"
      },
      {
        "translation": "早く寝るようにしましょう。"
      },
      {
        "translation": "親切にするようにしましょう。"
      },
      {
        "translation": "時間を無駄にしないようにしましょう。"
      }
    ]
  },
  "ja_ようになった_115": {
    "title": "～ようになった (〜you ni natta)",
    "shortExplanation": "以前は不可能だったことやしていなかったことが可能になったり、新しい習慣や状態に移行したことを表し、「〜するようになる」「〜できるようになる」という意味を表します。",
    "longExplanation": "「～ようになった」は、時間の経過や努力、環境の変化などによって、主体の能力や習慣、あるいは客観的な状況が新たな段階へと変化したことを表す表現です。動詞の可能形と結びつくと、以前はできなかった行為を遂行できる能力を獲得したこと（例：読めるようになった）を表し、意志動詞の辞書形と結びつくと、新たな習慣が定着して日常的に行うようになったこと（例：作るようになった）を表します。",
    "formation": "動詞辞書形／動詞可能形 ＋ ようになった",
    "examples": [
      {
        "translation": "彼は料理を作るようになった。"
      },
      {
        "translation": "その子は読めるようになった。"
      },
      {
        "translation": "会議は週に一度開催されるようになった。"
      },
      {
        "translation": "日本語がわかるようになった。"
      }
    ]
  },
  "ja_ように言う_116": {
    "title": "～ように言う (〜you ni iu)",
    "shortExplanation": "指示、依頼、注意、助言などの内容を他者へ間接的に伝える表現で、「〜するように言う」「〜するように伝える」という意味を表します。",
    "longExplanation": "「～ように言う」（関連表現に「ように頼む」「ように伝える」など）は、ある人物が下した指示や要望、忠告などの内容を、第三者に間接的に引用して伝達する間接話法の文型です。直接的な命令形（「〜しろと言った」など）に比べて威圧感がなく、柔らかく丁寧な語感で相手に指示内容を伝達することができます。",
    "formation": "動詞辞書形 ＋ ように言う | 動詞ない形 ＋ ように言う",
    "examples": [
      {
        "translation": "先生は私にもっと勉強するように言った。"
      },
      {
        "translation": "彼女は彼に待つように言いました。"
      },
      {
        "translation": "母は私に部屋を片付けるように言いました。"
      },
      {
        "translation": "先生は生徒に質問をするように言った。"
      }
    ]
  },
  "ja_らしい_117": {
    "title": "～らしい (〜rashii)",
    "shortExplanation": "他者から聞き及んだ情報や客観的な間接証拠に基づく推量を表し、「〜だそうだ」「〜のようだ」という意味を表します。",
    "longExplanation": "助動詞「～らしい」は、伝聞や間接的な情報源に基づく推量判断を表します。報道、噂、他人の発言など外部から間接的に得られた情報や、周囲の客観的な状況証拠から「どうやら〜であるようだ」と判断した事柄を客観的に述べます。話し手自身が直接見聞きした確証ではないことを示すニュアンスを含みます。",
    "formation": "動詞普通形 ＋ らしい | い形容詞 ＋ らしい | な形容詞語幹 ＋ らしい | 名詞 ＋ らしい",
    "examples": [
      {
        "translation": "彼はインフルエンザにかかっているらしい。"
      },
      {
        "translation": "明日雪が降るらしい。"
      },
      {
        "translation": "このレストランは美味しいらしい。"
      },
      {
        "translation": "彼女は医者であるらしい。"
      }
    ]
  },
  "ja_られた_118": {
    "title": "～られた (〜rareta)",
    "shortExplanation": "受身（受身形）の過去形を表し、主語が他者や外力から何らかの動作や影響を受けたことを表します。",
    "longExplanation": "「～られた」は、受身の助動詞「れる／られる」の過去形です。主語が動作の主体ではなく客体として外的な影響を被ったことを示します。事実を客観的に記述する直接受身（本が読まれた）のほか、他者の行為によって不利益や迷惑を被ったことを表す迷惑受身（財布が盗まれた）、さらには心動かされた経緯を表す使役受身過去形（感動させられた）など幅広い文脈で用いられます。",
    "formation": "動詞受身形（過去形）：Iグループ動詞あ段＋れた | IIグループ動詞語幹＋られた | IIIグループ動詞：された／来られた",
    "examples": [
      {
        "translation": "この本はたくさんの人に読まれた。"
      },
      {
        "translation": "彼は友達に騙された。"
      },
      {
        "translation": "昨日、私の財布が盗まれました。"
      },
      {
        "translation": "彼女は映画に感動させられた。"
      }
    ]
  },
  "ja_ている_119": {
    "title": "～ている (〜te iru)",
    "shortExplanation": "動作が現在進行中であること、あるいは動作完了に伴う結果状態がそのまま持続していることを表し、「〜している」「〜してある」という意味を表します。",
    "longExplanation": "「～ている」は、動詞のアスペクト（様相）を表す極めて基本的な構文です。継続動詞と結びつくと「現にその動作が進行している局面」を表し、瞬間動詞・変化動詞と結びつくと「動作や変化はすでに完了したが、その結果として生じた状態が今もそのまま継続している局面」を表します。受身形と結びついた場合（開けられているなど）は、他者による行為が施されたあとの状態維持を表します。",
    "formation": "動詞て形 ＋ いる",
    "examples": [
      {
        "translation": "窓が開けられている（誰かが開けて開いたままになっている）。"
      },
      {
        "translation": "ケーキが全部食べられている。"
      },
      {
        "translation": "彼女は病気で寝込んでいる。"
      },
      {
        "translation": "宿題が終わっている。"
      }
    ]
  },
  "ja_わけがない_120": {
    "title": "～わけがない (〜wake ga nai)",
    "shortExplanation": "道理、常識、確固たる根拠に基づき、事態の可能性を強く全否定する表現で、「絶対に〜なはずがない」「〜するわけがない」という意味を表します。",
    "longExplanation": "「～わけがない」（くだけた口語では「〜わけない」）は、論理的な思考や常識、明確な根拠に照らして、「客観的に考えてそのような事態になる理由や可能性は絶対にあり得ない」と話し手が強い確信を持って否定する文型です。二重否定の形（〜ないわけがない）を取ると、「絶対に〜であるはずだ」という強い肯定的確信を表します。",
    "formation": "動詞普通形 ＋ わけがない | い形容詞 ＋ わけがない | な形容詞 ＋ なわけがない | 名詞 ＋ の／である／なわけがない",
    "examples": [
      {
        "translation": "彼がそんなことを言うわけがない。"
      },
      {
        "translation": "あのレストランがまずいわけがない。"
      },
      {
        "translation": "彼女が優しくないわけがない。"
      },
      {
        "translation": "彼が試験に合格しないわけがない。"
      }
    ]
  },
  "ja_わけだ_121": {
    "title": "～わけだ (〜wake da)",
    "shortExplanation": "原因や背景となる事情を知り、当然の帰結として論理的に納得したことを表し、「道理で〜なわけだ」「そういうわけで〜なのだ」という意味を表します。",
    "longExplanation": "「～わけだ」は、ある事象の背景や原因を知った話し手が、「なるほど、そういう理由だったのか、それなら納得がいく」と事態の必然性を理解し納得した気持ちを表す表現です。前提となる事実から結果への自然で論理的な因果関係を明示します。",
    "formation": "動詞普通形 ＋ わけだ | い形容詞 ＋ わけだ | な形容詞 ＋ なわけだ | 名詞 ＋ な／である／というわけだ",
    "examples": [
      {
        "translation": "彼は風邪を引いている。だから、声がかすれているわけだ。"
      },
      {
        "translation": "今日は忙しかった。だから、疲れたわけだ。"
      },
      {
        "translation": "田中さんはたくさん勉強している。だから、試験に合格したわけだ。"
      },
      {
        "translation": "彼女は有名な歌手の娘なんだ。だから、歌が上手なわけだ。"
      }
    ]
  },
  "ja_わけではない_122": {
    "title": "～わけではない (〜wake dewa nai)",
    "shortExplanation": "一面的な決めつけや極端な断定を否定し、部分的な否定を表す表現で、「必ずしも〜というわけではない」「〜ではない」という意味を表します。",
    "longExplanation": "「～わけではない」（口語では「〜わけじゃない」）は、全面否定ではなく「全部が全部そうというわけではない」「一概にそうとは言えない」と、相手の誤解や過度な一般化を穏やかに是正する部分否定の構文です。「〜からといって」と呼応して使われることが多くあります。",
    "formation": "動詞普通形 ＋ わけではない | い形容詞 ＋ わけではない | な形容詞 ＋ なわけではない | 名詞 ＋ な／である／のわけではない",
    "examples": [
      {
        "translation": "彼が忙しいからといって、友達がいないわけではない。"
      },
      {
        "translation": "この映画は面白くないわけではないが、好みではない。"
      },
      {
        "translation": "彼女が病気だからといって、毎日寝ているわけではない。"
      },
      {
        "translation": "彼が大学に行っていないからといって、バカなわけではない。"
      }
    ]
  },
  "ja_わけにはいかない_123": {
    "title": "～わけにはいかない (〜wake ni wa ikanai)",
    "shortExplanation": "社会的常識、道徳的義務、立場や周囲の状況から判断して、「そうすることはできない」「〜するわけにはいかない」という意味を表します。",
    "longExplanation": "「～わけにはいかない」は、個人の感情や願望がどうであれ、社会通念、道義的責任、世間体、あるいは後々の不都合を考慮すると「人情や道理の上から到底そんな行為は許されない・できない」と自己抑制する心理を表す文型です。否定形「〜ないわけにはいかない」は「義務感や義理からどうしても〜せざるを得ない」という強い必然性を表します。",
    "formation": "動詞辞書形 ＋ わけにはいかない | 動詞ない形 ＋ わけにはいかない",
    "examples": [
      {
        "translation": "こんなところで寝るわけにはいかない。"
      },
      {
        "translation": "試験が明日だから、遊びに行くわけにはいかない。"
      },
      {
        "translation": "こんなに高いものを買うわけにはいかない。"
      },
      {
        "translation": "体調が悪いから、パーティーに参加するわけにはいかない。"
      }
    ]
  },
  "ja_わりには_124": {
    "title": "～わりには (〜wari ni wa)",
    "shortExplanation": "前項の基準や通念から予想される程度と実際の結果が釣り合わず、意外であることを表し、「〜の割には」「〜にしては」という意味を表します。",
    "longExplanation": "「～わりには」は、前項の基準（年齢、価格、外見、条件など）から一般的に予想される当然の結果と、後項の実際の事実とが食い違っており、不相応・意外であると話し手が感じたときに用いる表現です。意外性や感嘆、驚きのニュアンスを含みます。",
    "formation": "動詞普通形 ＋ わりには | い形容詞 ＋ わりには | な形容詞 ＋ な／であるわりには | 名詞 ＋ の／であるわりには",
    "examples": [
      {
        "translation": "彼はあまり勉強しないわりには、テストの点数が高いです。"
      },
      {
        "translation": "この料理は見た目が悪いわりには、味は美味しいです。"
      },
      {
        "translation": "彼女は若いわりには、とても落ち着いていますね。"
      },
      {
        "translation": "この部屋は狭いわりには、家賃が高いです。"
      }
    ]
  },
  "ja_んだって_125": {
    "title": "～んだって (〜n datte)",
    "shortExplanation": "口語で他者から聞き知った情報や噂を親しい相手に伝える伝聞表現で、「〜なんだそうだ」「〜らしいよ」という意味を表します。",
    "longExplanation": "「～んだって」は、状況説明の「のだ（んだ）」と引用の終助詞「って」が組み合わさった親しい間柄での口語表現です。外部で耳にした情報や人づてに聞いた話を、相手に共有・報告する際に日常会話で頻繁に用いられます。",
    "formation": "動詞普通形 ＋ んだって | い形容詞 ＋ んだって | な形容詞 ＋ なんだって | 名詞 ＋ なんだって",
    "examples": [
      {
        "translation": "彼は東京に行くんだって。"
      },
      {
        "translation": "この映画、面白いんだって。"
      },
      {
        "translation": "彼女は有名な歌手なんだって。"
      },
      {
        "translation": "あのレストラン、夜景がきれいなんだって。"
      }
    ]
  },
  "ja_んだもん_126": {
    "title": "～んだもん (〜nda mon)",
    "shortExplanation": "口語で自分の行為や感情の理由を述べ、甘え、言い訳、または自己主張するニュアンスを表し、「〜なんだもの」「〜だから」という意味を表します。",
    "longExplanation": "「～んだもん」（「〜のだもの」のくだけた口語形、さらに縮まると「〜もん」）は、親しい間柄での会話で、自分の行動や主張の正当性を主張したり、言い訳や甘えの気持ちを込めて理由を述べたりする終助詞的構文です。女性や子どもがよく用いますが、親しい友人同士の間でも日常的に使われます。",
    "formation": "動詞普通形 ＋ んだもん | い形容詞 ＋ んだもん | な形容詞 ＋ なんだもん | 名詞 ＋ なんだもん",
    "examples": [
      {
        "translation": "遅れたんだもん、ごめん。"
      },
      {
        "translation": "おいしいんだもん、もうちょっと食べたい。"
      },
      {
        "translation": "疲れているんだもん、早く寝たい。"
      },
      {
        "translation": "彼は友達なんだもん、手伝わないわけにはいかない。"
      }
    ]
  },
  "ja_上げる_127": {
    "title": "～上げる (〜ageru)",
    "shortExplanation": "努力や手間をかけて、ある動作や作業を最後まで完全にやり遂げることを表し、「〜し終える」「すっかり〜し終える」という意味を表します。",
    "longExplanation": "「～上げる」は、動詞の連用形（ます形語幹）に後続する複合動詞の構文で、時間や労力を費やして、ある行為や制作・作業を完璧に仕上げ、完成させたことを表します（例：書き上げる、作り上げる、やり上げる、鍛え上げる）。",
    "formation": "動詞ます形語幹 ＋ 上げる",
    "examples": [
      {
        "translation": "レポートを書き上げるまで、寝られません。"
      },
      {
        "translation": "彼女は早速部屋の掃除を始め、一時間で掃除をやり上げた。"
      },
      {
        "translation": "試験前夜、勉強をやり上げてから寝た。"
      },
      {
        "translation": "このプロジェクトをやり上げるためには、みんなの協力が必要です。"
      }
    ]
  },
  "ja_切れない_128": {
    "title": "～切れない (～kirenai)",
    "shortExplanation": "数量が多すぎたり限度を超えていたりして、最後まで全部やり終えることができないことを表し、「すべて〜しきることができない」「最後まで〜できない」という意味を表します。",
    "longExplanation": "「～切れない」は、行為を最後まで完全にやり遂げることを表す複合動詞「～切る」の可能否定形です。対象となる数量が膨大であることや、程度が甚だしいことなどが原因で、その行為を完全に完了させたり尽くしたりすることが不可能である状況を表します（例：食べきれない、数えきれない、読み切れない）。",
    "formation": "動詞ます形語幹 ＋ 切れない",
    "examples": [
      {
        "translation": "この本を一晩で読み切れない。"
      },
      {
        "translation": "彼は泣き切れないほど嬉しかった。"
      },
      {
        "translation": "この部屋を一日で掃除し切れない。"
      },
      {
        "translation": "彼女は話し切れないほどの悩みがある。"
      }
    ]
  },
  "ja_必ずしもとは限らない_129": {
    "title": "必ずしも～とは限らない (kanarazushimo ～ towa kagiranai)",
    "shortExplanation": "一般的な通念や思い込みに対して例外が存在することを指摘する部分否定表現で、「絶対に〜とは言えない」「いつも〜であるとは限らない」という意味を表します。",
    "longExplanation": "「必ずしも～とは限らない」は、副詞「必ずしも」と陳述の副詞呼応「とは限らない」が結びついた代表的な部分否定の構文です。「一般的にはそう考えられがちだが、100パーセント常にそうであるとは断定できず、例外もある」という客観的で慎重な判断を述べる際に用いられます。",
    "formation": "必ずしも ＋ 動詞／形容詞／名詞普通形 ＋ とは限らない",
    "examples": [
      {
        "translation": "高いものが必ずしも良いとは限らない。"
      },
      {
        "translation": "有名な人が必ずしも幸せとは限らない。"
      },
      {
        "translation": "外国語が話せる人が必ずしも英語が得意とは限らない。"
      },
      {
        "translation": "勉強時間が多い生徒が必ずしも試験で点数が高いとは限らない。"
      }
    ]
  },
  "ja_最中に_130": {
    "title": "～最中に (～saichuu ni)",
    "shortExplanation": "ある動作や出来事がちょうど盛んに行われている最中に、予期せぬ別の事態が割り込んで起こることを表し、「ちょうど〜している時に」「〜の真っ最中に」という意味を表します。",
    "longExplanation": "「～最中に」（文末では「～最中だ」）は、ある行為や事態が熱心に行われているそのまっただ中に、予期せぬ出来事や突発的な事故などが起こり、進行中の動作が妨げられたり中断されたりする様子を表します。動詞の「〜ている」形や、動作性の名詞に「の」を添えた形に接続します。後続の文には、話し手の意志による動作ではなく、偶発的・瞬間的に発生した事態が来ることが一般的です。",
    "formation": "動詞て形 ＋ いる ＋ 最中に ｜ 名詞 ＋ の ＋ 最中に",
    "examples": [
      {
        "translation": "昼寝をしている最中に電話が鳴った。"
      },
      {
        "translation": "料理を作っている最中に火事が起こった。"
      },
      {
        "translation": "会議の最中に急な用事で出なければならなかった。"
      },
      {
        "translation": "試験の最中に地震が起こった。"
      }
    ]
  },
  "ja_決してない_131": {
    "title": "決して～ない (kesshite ~ nai)",
    "shortExplanation": "強い打消しの意志や決意、絶対的な否定の判断を表し、「絶対に〜ない」「どんなことがあっても〜ない」という意味を表します。",
    "longExplanation": "副詞「決して」は、後続の文末に否定形（〜ない、〜ません、〜ないで等）を伴って呼応し、どんな状況であっても例外なくその事態を認めないという絶対的な否定や、強い意志・決意を表します。約束や誓い、忠告、禁止の強調などに用いられ、妥協を許さない断定的なニュアンスを帯びます。",
    "formation": "決して ＋ 動詞否定形（ない形／ません／ないで） ｜ 決して ＋ 形容詞・名詞否定形",
    "examples": [
      {
        "translation": "彼は決して遅刻しない。"
      },
      {
        "translation": "この秘密を決して誰にも言わないでください。"
      },
      {
        "translation": "決して諦めないで、最後までがんばりましょう。"
      },
      {
        "translation": "彼女は決して嘘をつかない人です。"
      }
    ]
  },
  "ja_Aおまけに_1": {
    "title": "A。おまけに B。(~omake ni)",
    "shortExplanation": "前の文に同方向の事柄をさらに付け加える接続詞で、「それに加えて」「その上」「さらに」という意味を表します。",
    "longExplanation": "接続詞「おまけに」（「景品」「添え物」を意味する「おまけ」に由来）は、文Aで述べた事柄に、同傾向の新たな事態Bを累加・補足する際に用いられます。良いことが重なる場面でも用いられますが、多くは好ましくない事態や困った状況が重なる「泣き面に蜂」「弱り目に祟り目」といったニュアンスで用いられ、「その上さらに」「余計なことに」といった強い感情の籠もった語感を与えます。",
    "formation": "文A。 ＋ おまけに ＋ 文B。",
    "examples": [
      {
        "translation": "彼は遅刻した。おまけに宿題も忘れた。"
      },
      {
        "translation": "このアパートは狭い。おまけに家賃が高い。"
      },
      {
        "translation": "彼女は仕事が忙しい。おまけに子供も小さい。"
      },
      {
        "translation": "昨日は雨が降った。おまけに風も強かった。"
      }
    ]
  },
  "ja_Aさて_2": {
    "title": "A。さて B。(A. Sate B.)",
    "shortExplanation": "話題を転換したり、一区切りつけて次の動作・本題へ移る際に用いられ、「それでは」「ところで」「さあ」という意味を表します。",
    "longExplanation": "接続詞「さて」は、それまでの話題や行動に一区切りをつけ、新しい話題や次の行動へ意識を切り替える際に文頭で用いられます。日常会話のほか、司会進行、スピーチ、文章の段落の変わり目などで聞き手の注意を引きつけ、本題や次の展開へスムーズに誘導する働きを持ちます。",
    "formation": "文A。 ＋ さて、 ＋ 文B。",
    "examples": [
      {
        "translation": "今日の仕事が終わった。さて、これから帰るか。"
      },
      {
        "translation": "話がちょっと長くなったね。さて、もっと喜美子さんのことを教えてください。"
      },
      {
        "translation": "映画を見て楽しかった。さて、何を食べに行こう。"
      },
      {
        "translation": "マラソンが終わった！さて、少し休んでからシャワーを浴びよう。"
      }
    ]
  },
  "ja_Aしかも_3": {
    "title": "A。しかも B。(A. Shikamo B.)",
    "shortExplanation": "前の文で述べた事柄に、さらに同傾向の情報を付け加えて強調する接続詞で、「その上」「さらに」「おまけに」という意味を表します。",
    "longExplanation": "接続詞「しかも」は、文Aの陳述に対して、その程度をさらに際立たせる新たな属性や事実Bを累積・補足する際に用いられます。前後の文はそれぞれ独立した文構造を持ち、対象の複数の美点や特徴を並列して強調する（「美味しい、しかも安い」など）際によく使われます。",
    "formation": "文A。 ＋ しかも、 ＋ 文B。",
    "examples": [
      {
        "translation": "この料理は美味しいです。しかも、安いです。"
      },
      {
        "translation": "彼は優秀な学生です。しかも、スポーツが得意です。"
      },
      {
        "translation": "彼女は歌が上手です。しかも、ダンスも上手です。"
      },
      {
        "translation": "このカフェは雰囲気がいいです。しかも、コーヒーも美味しいです。"
      }
    ]
  },
  "ja_Aしたがって_4": {
    "title": "A。したがって B。(A. Shitagatte B.)",
    "shortExplanation": "前の文を根拠・理由として、論理的・必然的な結論や結果を導く改まった接続詞で、「それゆえに」「だから」「その結果」という意味を表します。",
    "longExplanation": "接続詞「したがって」（漢字表記：従って）は、文Aを原因・理由・根拠とし、そこから論理的に導き出される当然の帰結や判断、結論を文Bで述べる際に用いられます。客観的かつ論理的な文章語であり、個人の感情的な主張よりも必然的な因果関係を述べる論文、公用文、ビジネス文書、学術発表などで多用されます。",
    "formation": "文A。 ＋ したがって、 ＋ 文B。",
    "examples": [
      {
        "translation": "今日は雨が降っています。したがって、傘を持って行きましょう。"
      },
      {
        "translation": "彼は忙しいです。したがって、彼に連絡するのはやめましょう。"
      },
      {
        "translation": "そのレストランは人気があります。したがって、予約しないと席がないかもしれません。"
      },
      {
        "translation": "試験が近いです。したがって、勉強に集中しましょう。"
      }
    ]
  },
  "ja_A_5": {
    "title": "A であれ B であれ (A deare B deare)",
    "shortExplanation": "AであってもBであっても、どちらの場合にも同じことが当てはまることを表します。「〜であっても〜であっても」「〜であれ〜であれ」。",
    "longExplanation": "「A であれ B であれ」は、対比的な名詞やな形容詞語幹などを並べ、「Aの場合であってもBの場合であっても、その違いに関わらず同じ条件や結論が成り立つ」と述べる硬い表現です。書面語や演説などで好んで用いられ、例外を認めない普遍的な原則や方針を示す際によく使われます。",
    "formation": "名詞1 ＋ であれ ＋ 名詞2 ＋ であれ ｜ な形容詞語幹 ＋ であれ ＋ な形容詞語幹 ＋ であれ",
    "examples": [
      {
        "translation": "雨であれ雪であれ、試合は中止にならない。"
      },
      {
        "translation": "男であれ女であれ、平等に扱われるべきだ。"
      },
      {
        "translation": "豊かであれ貧乏であれ、真の幸福は金では買えない。"
      },
      {
        "translation": "経験者であれ初心者であれ、このゲームは楽しめる。"
      }
    ]
  },
  "ja_Aすると_6": {
    "title": "A。すると B。(~suruto)",
    "shortExplanation": "前の動作や出来事をきっかけとして、直後に次の事態が展開したり発見されたりすることを表し、「そうすると」「そうしたところ」「その結果」という意味を表します。",
    "longExplanation": "接続詞「すると」は、文Aの動作や事態が生じた直後に、それに引き続いて文Bの事態が起こる（または新たな状況を発見する）ことを表す順接の接続詞です。出来事の客観的な推移や時間的継起を述べる際に多用されます。後続の文Bには、話し手の意志・命令・依頼などの主観的な表現は来ず、自然な結果や過去の事実が来ます。",
    "formation": "文A。 ＋ すると、 ＋ 文B。",
    "examples": [
      {
        "translation": "電話をかけると、彼女が出ました。"
      },
      {
        "translation": "このボタンを押すと、ドアが開きます。"
      },
      {
        "translation": "コンビニに行くと、たまたま友達に会いました。"
      },
      {
        "translation": "彼が家を出ると、すぐに雨が降り始めました。"
      }
    ]
  },
  "ja_Aそういえば_7": {
    "title": "A。そういえば B。(~souieba)",
    "shortExplanation": "前の話題や出来事をきっかけとして、関連する事柄を思い出した際に用いられ、「そう言われてみれば」「考えてみれば」という意味を表します。",
    "longExplanation": "接続詞「そういえば」（「そう言えば」から派生）は、直前の発言や状況Aを耳にしたり目にしたことで、それに関連した別の情報や過去の記憶Bがふと脳裏に呼び起こされた際に用いられます。日常の対話において、話題を自然に関連した方向へと展開させたり、聞き手と共通の思い出や情報を共有したりする際に頻繁に使われます。",
    "formation": "文A。 ＋ そういえば、 ＋ 文B。",
    "examples": [
      {
        "translation": "映画。そういえば、彼は映画館で働いているんだ。"
      },
      {
        "translation": "山田さん。そういえば、彼女は今週末旅行しています。"
      },
      {
        "translation": "そのレストラン。そういえば、次の週末そこでパーティーがあるんだ。"
      },
      {
        "translation": "寒い。そういえば、明日雪が降るらしいよ。"
      }
    ]
  },
  "ja_Aそこで_8": {
    "title": "A。そこで B。(~sokode)",
    "shortExplanation": "前の文の状況や問題点を受け、それに対する対策や意志的な行動を起こす接続詞で、「そういうわけで」「それについて」「そこで」という意味を表します。",
    "longExplanation": "接続詞「そこで」は、文Aで提示された状況・課題・動機を背景として、それに対処・解決するために主体が意図的に取る行動や決定Bを導く順接の表現です。客観的・自然な結果を述べる「それで」と異なり、「そこで」は問題解決のための対策や、話し手の能動的・意図的な働きかけを述べる文によく用いられます。",
    "formation": "文A。 ＋ そこで、 ＋ 文B。",
    "examples": [
      {
        "translation": "明日は試験があります。そこで今晩勉強しようと思います。"
      },
      {
        "translation": "このレストランは混んでいます。そこで別の場所でランチを食べましょう。"
      },
      {
        "translation": "彼女はアレルギーがある。そこで彼女のために別の料理を作ります。"
      },
      {
        "translation": "傘を持っていない。そこで雨が止むまで待ちます。"
      }
    ]
  },
  "ja_AそれがB_9": {
    "title": "A。それがB。(~sorega)",
    "shortExplanation": "前の文で述べた事柄Aこそが、Bの本質や真の定義であることを表し、「それこそが〜だ」「それこそ〜というものだ」という意味を表します。",
    "longExplanation": "「A。それがB。」の表現は、指示代名詞「それが」を用いて直前の文Aで述べた行為や状態を指し示し、それこそがBの定義や本質的な姿であると断定・強調する文型です。後続の文Bには「〜というものだ」などの表現が頻繁に伴われ、深い実感や感慨を込めて物事の本質を言い表す際に用いられます。",
    "formation": "文A。 ＋ それが ＋ 文B／句B。",
    "examples": [
      {
        "translation": "彼は勉強ができる。それが天才というものだ。"
      },
      {
        "translation": "美味しい料理を作る。それが私の趣味なんです。"
      },
      {
        "translation": "彼女は私を助けてくれる。それが友達というものだ。"
      },
      {
        "translation": "一人で長い旅をする。それが自由というものだ。"
      }
    ]
  },
  "ja_Aそれで_10": {
    "title": "A。それで B。 (~sore de)",
    "shortExplanation": "前の文を理由・原因として、自然に生じた結果や事態を述べる接続詞で、「だから」「そのために」「そういうわけで」という意味を表します。",
    "longExplanation": "接続詞「それで」は、文Aで述べた状況や原因から、文Bの事態が自然な成り行きとして生じたことを表す順接の接続詞です。日常会話や出来事の経緯を説明する際に極めて頻繁に用いられます。後続の文Bには客観的な事実や過去の成り行きが述べられることが多く、命令・依頼・意志などの主観的な働きかけには原則として用いられません。",
    "formation": "文A。 ＋ それで、 ＋ 文B。",
    "examples": [
      {
        "translation": "昨日は雨が降っていた。それで公園に行かなかった。"
      },
      {
        "translation": "試験に落ちた。それで再試験を受けなければならない。"
      },
      {
        "translation": "部屋が寒かった。それで暖房をつけた。"
      },
      {
        "translation": "今日は休みだ。それで映画を見に行く。"
      }
    ]
  },
  "ja_Aそれでも_11": {
    "title": "A。それでも B。(~sore demo)",
    "shortExplanation": "前の文の状況や困難を認めた上で、それに屈せず次の行動や事態が成り立つことを表し、「それにもかかわらず」「それでもなお」という意味を表します。",
    "longExplanation": "接続詞「それでも」は、文Aで述べられた障害・悪条件・前置きの状況を前提として認めつつも、その影響を受けずに文Bの行動や意志を貫く（または常識的な予想に反する事態が起こる）ことを表す逆接・譲歩の接続詞です。困難に負けない強い意志表明や、意外性のある事実を対比的に述べる場面でよく使われます。",
    "formation": "文A。 ＋ それでも、 ＋ 文B。",
    "examples": [
      {
        "translation": "今日は日曜日です。それでも、仕事に行かなければなりません。"
      },
      {
        "translation": "彼は若いです。それでも、経験が豊富です。"
      },
      {
        "translation": "雨が降っています。それでも、散歩に行きたいです。"
      },
      {
        "translation": "試験の結果が悪かったです。それでも、諦めません。"
      }
    ]
  },
  "ja_Aそれなのに_12": {
    "title": "A。それなのに B。(~sorenanoni)",
    "shortExplanation": "前の文の事柄から当然予想されることとは正反対の結果になり、意外感や不満、非難の気持ちを表し、「それにもかかわらず」「それなのに」という意味を表します。",
    "longExplanation": "接続詞「それなのに」（「それ」＋逆接の確定条件「なのに」）は、文Aの事実から常識的に期待・推測される結果とは著しく矛盾する事態Bが生じた際に用いられます。単なる逆接にとどまらず、「〜であるはずなのに、なぜ」「納得がいかない」という話し手の驚き、不満、失望、理不尽さなどの感情的なニュアンスが強く込められるのが大きな特徴です。",
    "formation": "文A。 ＋ それなのに、 ＋ 文B。",
    "examples": [
      {
        "translation": "彼は頭がいい。それなのに、試験に落ちた。"
      },
      {
        "translation": "私は早く起きた。それなのに、バスに遅れた。"
      },
      {
        "translation": "昨日は晴れていた。それなのに、彼は傘を持っていた。"
      },
      {
        "translation": "彼女は運動が苦手だ。それなのに、マラソンを走ることにした。"
      }
    ]
  },
  "ja_Aそれなら_13": {
    "title": "A。それなら B。(A. Sore nara B.)",
    "shortExplanation": "前文Aで述べられた状況や相手の発言を受けて、「もしそうであるなら」とその事実を前提とし、それに伴う判断、行動、提案などを後文Bで導く接続詞です。「それなら」「それでは」。",
    "longExplanation": "接続詞「それなら」（「それならば」のくだけた口語形）は、先行する文Aで示された事態や情報を受け止め、それを条件・前提として話し手の判断、決断、提案、意志などを後続の文Bで述べる際に用いられます。「その通りの状況であるならば、次にこのような行動をとろう」という論理的な帰結を表します。",
    "formation": "文A（前提状況・事実） ＋ 。それなら ＋ 文B（判断・決断・提案）",
    "examples": [
      {
        "translation": "試験が近い。それなら、もっと勉強しなければならない。"
      },
      {
        "translation": "明日は雨が降るだろう。それなら、傘を持って行こう。"
      },
      {
        "translation": "彼らはもう帰った。それなら、私も帰ろう。"
      },
      {
        "translation": "あのレストランは予約がいっぱいだ。それなら、別の場所を探そう。"
      }
    ]
  },
  "ja_A_14": {
    "title": "A それはそうと B。 (A Sore wa sou to B)",
    "shortExplanation": "それまでの話題Aを一度脇に置き、新しい別の話題Bへと転換する際に用いる接続詞です。「それはさておき」「ところで」。",
    "longExplanation": "接続表現「それはそうと」は、会話の流れの中でこれまでの話の内容Aを承認しつつも一旦打ち切り、話の焦点を新しい別の話題Bへと切り替えるときに用いられる口語表現です。「それはそれとして」「ところで」と似た働きを持ち、話題をスムーズに転換する際に役立ちます。",
    "formation": "文A（これまでの話題） ＋ 。それはそうと ＋ 文B（新しい話題）",
    "examples": [
      {
        "translation": "それはそうと、今日の天気はいいですね。"
      },
      {
        "translation": "映画は面白かったです。それはそうと、この店のラーメンはおいしいですよ。"
      },
      {
        "translation": "明日から夏休みですね。それはそうと、新しいカフェがオープンしたみたいです。"
      },
      {
        "translation": "昨日の試験は難しかった。それはそうと、週末にパーティーがあるのを知ってますか？"
      }
    ]
  },
  "ja_Aだが_15": {
    "title": "A。だが B。(~daga)",
    "shortExplanation": "前文Aの内容に対して、それと対立・矛盾・対比する内容を後文Bで述べる逆接の接続詞です。「しかし」「けれども」。",
    "longExplanation": "接続詞「だが」（「であるが」の縮約形）は、前文Aで述べた事実や前提とは相反する事実、あるいは対照的な評価・意見を後文Bで導く表現です。日常会話で多用される「でも」に比べて硬く引き締まった文体であり、書き言葉や論説文、改まった談話などで好んで用いられます。",
    "formation": "文A ＋ 。だが ＋ 文B",
    "examples": [
      {
        "translation": "このレストランは値段が高い。だが、味はとてもいい。"
      },
      {
        "translation": "彼は疲れている。だが、仕事を終わらせるまで休まない。"
      },
      {
        "translation": "昨日は寒かった。だが、今日は暖かい。"
      },
      {
        "translation": "彼女は外見は地味だ。だが、性格が素晴らしい。"
      }
    ]
  },
  "ja_AただB_16": {
    "title": "A。ただB。(~tada)",
    "shortExplanation": "前文Aの内容を基本的に認めつつ、それに対する軽い留保、条件、例外、不満な点などを後文Bで補足する接続詞です。「ただ」「単にそれだけは」。",
    "longExplanation": "接続詞「ただ」は、先行文Aの内容をおおむね肯定・承認した上で、「ただしこれだけは補足しておくが」というニュアンスで、小さな例外や条件、わずかな欠点・懸念点などを後続文Bで付け加える際に用いられます。「しかし」ほど強い全面的な対立ではなく、部分的な補足や限定のニュアンスを含みます。",
    "formation": "文A ＋ 。ただ ＋ 文B",
    "examples": [
      {
        "translation": "彼は頭がいい。ただ、努力はあまりしない。"
      },
      {
        "translation": "外は雨が降っている。ただ、家にいると暇だ。"
      },
      {
        "translation": "そのレストランは値段が高い。ただ、サービスが良い。"
      },
      {
        "translation": "テストの結果は良くなかった。ただ、やり直すチャンスがある。"
      }
    ]
  },
  "ja_AただしB_17": {
    "title": "A。ただしB。 (A. Tadashi B)",
    "shortExplanation": "前文Aで述べた原則的な内容や許可事項に対して、後文Bで補足的な制限、例外、付帯条件などを明確に付け加える接続詞です。「ただし」「但し」。",
    "longExplanation": "接続詞「ただし」（但し）は、前文Aで全体的な方針や許可・権利などを提示した上で、それに伴う守るべき条件、例外規定、注意事項などを後文Bで補足する際に用いられます。規約、契約書、公的な案内文、ビジネス文書などの改まった場面で非常に頻繁に使用される厳格な表現です。",
    "formation": "文A（主たる原則・許可） ＋ 。ただし ＋ 文B（付帯条件・例外）",
    "examples": [
      {
        "translation": "この部屋を使ってもいいです。ただし、使った後で掃除してください。"
      },
      {
        "translation": "明日から出張で不在になります。ただし、緊急の場合は携帯に連絡してください。"
      },
      {
        "translation": "食事代は全額会社が負担します。ただし、アルコールのみ自己負担となります。"
      },
      {
        "translation": "図書館で本を借りることができます。ただし、期限内に返さなければなりません。"
      }
    ]
  },
  "ja_Aだって_18": {
    "title": "A。だって B。(Datte~)",
    "shortExplanation": "親しい間柄のくだけた日常会話で、理由や原因、言い訳を述べたり、後続の提案や行動の根拠を提示する表現です。「だって〜だもの」「〜だっていうから」。",
    "longExplanation": "「だって」は、親しい友人や家族との口語会話において、自分の主張や行動、提案に対する理由や言い訳を感情を込めて提示する際に用いられます。「〜という理由だから」「だって〜なんだから」と相手に甘えたり、理由を親しみやすく伝えたりする親密なニュアンスを帯びます。",
    "formation": "動詞普通形 ＋ だって | い形容詞 ＋ だって | な形容詞語幹 ＋ だって | 名詞 ＋ だって",
    "examples": [
      {
        "translation": "暇だって、映画を見に行こうよ。"
      },
      {
        "translation": "寒いだって、コートを着てください。"
      },
      {
        "translation": "疲れているだって、休んだほうがいい。"
      },
      {
        "translation": "彼女が料理上手だって、みんな彼女の作った料理を楽しみにしています。"
      }
    ]
  },
  "ja_Aちなみに_19": {
    "title": "A。ちなみに B。(A. Chinamini B.)",
    "shortExplanation": "前文Aで取り上げた話題に関連して、参考情報や補足的な事柄をついでに付け加える接続詞です。「ついでに言うと」「参考までに」。",
    "longExplanation": "接続詞「ちなみに」（漢字表記「因みに」）は、先行文Aで言及した主題に関連付けて、付け足しの情報、背景知識、参考となる豆知識などを後続文Bで軽く補足する際に用いられます。話題を別のものへと完全に切り替える「それはそうと」とは異なり、同一テーマの補足・関連事項を付け加える役割を果たします。",
    "formation": "文A（主たる話題） ＋ 。ちなみに ＋ 文B（参考・補足情報）",
    "examples": [
      {
        "translation": "今日は授業がありません。ちなみに、明日も休みです。"
      },
      {
        "translation": "この店のラーメンは美味しいです。ちなみに、餃子もおすすめです。"
      },
      {
        "translation": "彼は今日は遅刻しました。ちなみに、昨日は欠席しました。"
      },
      {
        "translation": "映画は面白かったです。ちなみに、原作の方がもっといいですよ。"
      }
    ]
  },
  "ja_Aということは_20": {
    "title": "A。ということは B。 (A. To iu koto wa B.)",
    "shortExplanation": "前文Aの事実や状況を根拠として、論理的な推論や結論を後文Bで導き出す表現です。「つまり〜ということだ」「そのことから判断すると〜」。",
    "longExplanation": "「ということは」は、前文Aで述べられた観察事実や情報を受け止め、「その事実が意味するところは〜だ」と論理的に帰結・推測される内容を後文Bで導く接続表現です。後続の文末には、「〜に違いない」「〜かもしれない」「〜だろう」といった推量・確信の表現が頻繁に伴います。",
    "formation": "文A（観測された事実・情報） ＋ 。ということは ＋ 文B（導かれる推論・結論）",
    "examples": [
      {
        "translation": "彼女が泣いている。ということは何か悲しいことがあったに違いない。"
      },
      {
        "translation": "このケーキが残っている。ということは、みんなお腹がいっぱいだったのかな。"
      },
      {
        "translation": "道が渋滞している。ということは、事故があったのかもしれない。"
      },
      {
        "translation": "彼が試験に受かった。ということは、勉強がたくさん頑張ったんだね。"
      }
    ]
  },
  "ja_Aというのは_21": {
    "title": "A。というのは B。(Toiu no wa~)",
    "shortExplanation": "前文Aで述べた結論や判断に対して、その理由、原因、または具体的な内容を後文Bで詳しく説明する表現です。「なぜなら〜だからだ」「そのわけは〜」。",
    "longExplanation": "「というのは」は、先行する文Aで示した事実・判断・結果を受けて、「その理由は何かというと〜」「具体的に説明すると〜」と後続文Bでその因果関係や背景を明かす接続表現です。後文の結びには、理由を明示する「〜からだ」「〜ためだ」などが呼応することが非常に一般的です。",
    "formation": "文A（結果・結論） ＋ 。というのは ＋ 文B（理由：〜からだ・〜ためだ、または詳細な説明）",
    "examples": [
      {
        "translation": "彼は非常に疲れています。というのは、昨夜、車で遠くまで行ってきたためです。"
      },
      {
        "translation": "このレストランはおすすめです。というのは、料理が美味しいし、雰囲気もいいからです。"
      },
      {
        "translation": "試験に落ちた。というのは、十分に勉強しなかったからです。"
      },
      {
        "translation": "彼女は独特な趣味がある。というのは、昆虫収集だ。"
      }
    ]
  },
  "ja_AなおB_22": {
    "title": "A。なおB。(A. Nao B.)",
    "shortExplanation": "前文Aの事柄を述べ終えた後に、関連する補足事項、連絡事項、追加情報を改まって付け加える接続詞です。「さらに」「また」「付け加えて」。",
    "longExplanation": "接続詞「なお」（漢字表記「尚」）は、先行文Aで主要な連絡や説明を完了した上で、それに付随する追加情報、例外事項、留意点などを後続文Bで客観的・公式に補足する際に用いられます。公的な通知文書、案内板、ビジネスメール、報道などで頻繁に用いられる改まった表現です。",
    "formation": "文A ＋ 。なお ＋ 文B",
    "examples": [
      {
        "translation": "明日は休みです。なお、月曜日も休みです。"
      },
      {
        "translation": "彼は頭が良いです。なお、スポーツも得意です。"
      },
      {
        "translation": "この本は面白いです。なお、安いです。"
      },
      {
        "translation": "私は日本語を勉強しています。なお、韓国語も勉強しています。"
      }
    ]
  },
  "ja_Aもっとも_23": {
    "title": "A。もっとも B。(Motto mo ~)",
    "shortExplanation": "前文Aで述べた一般的・全体的な主張に対して、言葉足らずや断定を避けるために、後文Bで但し書きや例外、留保条件を自ら補足する接続詞です。「そうは言っても」「ただし」。",
    "longExplanation": "接続詞「もっとも」（漢字表記「尤も」）は、先行文Aで一つの事実や判断を言い切った後、その表現があまりに一方的・絶対的になることを和らげるため、「もっとも、〜という一面もあるが」「とはいえ〜」と補足・限定のニュアンスを後続文Bで付け加える際に使われます。自らの言明を客観的に補正・調整する働きを持ちます。",
    "formation": "文A ＋ 。もっとも ＋ 文B",
    "examples": [
      {
        "translation": "彼は頭がいい。もっとも、勉強も大切だ。"
      },
      {
        "translation": "このレストランは美味しい。もっとも、値段が高い。"
      },
      {
        "translation": "彼女は綺麗だ。もっとも、性格が悪い。"
      },
      {
        "translation": "日本は面白い国だ。もっとも、住むのが大変そうだ。"
      }
    ]
  },
  "ja_A要するに_24": {
    "title": "A。要するに B。(A. Yousuru ni B.)",
    "shortExplanation": "前文Aで詳しく述べた内容や具体例を、後文Bで手短に要約・集約して結論を述べる接続詞です。「要約すると」「つまり」「一言で言えば」。",
    "longExplanation": "接続詞「要するに」は、先行文Aで展開された事情や長めの説明を、最も本質的なポイントに絞って後続文Bで簡潔にまとめる際に用いられます。「端的に言えば」「結局のところ何が言いたいかというと」という論理的な要約の働きをします。",
    "formation": "文A（詳細な説明・事情） ＋ 。要するに ＋ 文B（要約・核心の結論）",
    "examples": [
      {
        "translation": "このプロジェクトは成功しました。要するに、私たちのチームは素晴らしい仕事をしました。"
      },
      {
        "translation": "彼は料理が上手です。要するに、彼は優れたシェフです。"
      },
      {
        "translation": "昨日はとても忙しかった。要するに、一日中働いていました。"
      },
      {
        "translation": "彼女は新しい仕事が好きです。要するに、彼女は満足しています。"
      }
    ]
  },
  "ja_Noun_29": {
    "title": "最小数量詞 ＋ たりとも～ない (tari tomo ~ nai)",
    "shortExplanation": "極めて小さい最小限の数量に付き、それを完全に否定することを強調します。「たとえ〜でも決して〜ない」「わずか〜も〜ない」。",
    "longExplanation": "「最小数量詞 ＋ たりとも～ない」は、数字の「一」を含む最小単位の数量詞（一分、一秒、一言、一滴、一円など）に接続し、「たとえそのわずかな数量であっても絶対に〜しない」と全面的な否定や厳格な禁止を強く述べる文型です。訓戒や決意などの改まった硬い場面でよく用いられます。",
    "formation": "最小数量詞（1 ＋ 助数詞） ＋ たりとも ＋ 否定表現（〜ない／〜するな など）",
    "examples": [
      {
        "translation": "一分たりとも無駄にするな。"
      },
      {
        "translation": "彼は一言たりとも話さない。"
      },
      {
        "translation": "彼女は一度たりともその映画を見たことがない。"
      },
      {
        "translation": "私は一枚たりともその写真を持っていない。"
      }
    ]
  },
  "ja_あげく_37": {
    "title": "～あげく (~ageku)",
    "shortExplanation": "長い時間あれこれ悩んだり苦労を重ねたりした末に、結局残念な結果や好ましくない結末に至ったことを表します。「〜した末に」「結果として」。",
    "longExplanation": "「～あげく」（「～あげくに」「～あげくの＋名詞」の形も用いられる）は、長い時間にわたって試行錯誤、苦労、葛藤、迷いなどを繰り返した果てに、最終的に望ましくない結果、失敗、あるいは苦渋の決断などに至ってしまったことを表します。話し手の「あんなに苦労したのに、結局こうなってしまった」という落胆や残念な気持ちが含まれることが多い表現です。動詞た形や「名詞＋の」に接続します。",
    "formation": "動詞た形 ＋ あげく ／ 名詞 ＋ の ＋ あげく",
    "examples": [
      {
        "translation": "長い時間待ったあげく、電車が来なかった。"
      },
      {
        "translation": "いろいろな方法を試したあげく、成功した。"
      },
      {
        "translation": "彼は失敗のあげく、会社を辞める決心をした。"
      },
      {
        "translation": "彼女は長い間悩んだあげく、その仕事を断った。"
      }
    ]
  },
  "ja_あまり_38": {
    "title": "～あまり (〜amari)",
    "shortExplanation": "感情や状態の度合いが極度に強すぎたために、普通ではない極端な行動や好ましくない結果を引き起こすことを表します。「〜のあまり」「あまりに〜すぎて」。",
    "longExplanation": "「～あまり」（「～あまりに」「～あまりの＋名詞＋に／で」）は、ある感情（喜び、悲しみ、怒り、緊張、不安など）や状態が通常の限度を超えて高ぶった結果、自分でも抑制できないような極端な行動を取ってしまったり、予期せぬ異常な事態が生じてしまったりすることを表します。主として心情・精神状態を表す語句に伴って用いられます。",
    "formation": "動詞普通形 ＋ あまり ｜ い形容詞 ＋ あまり ｜ な形容詞語幹 ＋ なあまり（または のあまり） ｜ 名詞 ＋ のあまり",
    "examples": [
      {
        "translation": "昨日は疲れすぎたあまり、朝まで眠り続けました。"
      },
      {
        "translation": "彼女はうれしいあまり、泣き出してしまった。"
      },
      {
        "translation": "彼は安全を確認するあまり、何回もドアをチェックしている。"
      },
      {
        "translation": "寒さのあまり、彼は震えが止まらなかった。"
      }
    ]
  },
  "ja_うちに_39": {
    "title": "～うちに (〜uchi ni)",
    "shortExplanation": "状態が変わってしまう前の、有利な状況が保たれている限られた時間を利用して何かを行うことを表します。「〜の間に」「〜する前に」。",
    "longExplanation": "「～うちに」は、現在の状況や好条件（若さ、健康、天候、温かさなど）が変化してしまわないうちに、好機を逃さず何かをしておくべきだという意図を表します。時間が経って状況が変わってしまうと実行が難しくなるため、後続節には話し手の意志的な行為、勧誘、助言などの表現がよく続きます。",
    "formation": "動詞普通形 ＋ うちに ｜ い形容詞 ＋ うちに ｜ な形容詞語幹 ＋ なうちに ｜ 名詞 ＋ のうちに",
    "examples": [
      {
        "translation": "元気なうちに、旅行を楽しんでください。"
      },
      {
        "translation": "若いうちに、いろいろなことを学ぶべきだ。"
      },
      {
        "translation": "子供が寝ているうちに、夕食の準備をしましょう。"
      },
      {
        "translation": "雨が降らないうちに、家に帰りましょう。"
      }
    ]
  },
  "ja_がい_40": {
    "title": "～がい (〜gai)",
    "shortExplanation": "動詞のます形語幹に付き、その行為を行うに値する価値、やりがい、手応えがあることを表します。「〜する甲斐」「〜する価値」。",
    "longExplanation": "接尾辞「～がい」（名詞「甲斐（かい）」が連濁して濁音化したもの）は、動詞の連用形（ます形の「ます」を取った形）に接続して、時間や労力を費やすだけの十分な価値や精神的な手応え・満足感があることを示す複合名詞を作ります。「～がいがある」「～がいがない」「～がいのある＋名詞」などの形で多用されます。代表例として「やりがい」「生きがい」「働きがい」などがあります。",
    "formation": "動詞ます形（ますを除く） ＋ がい（＋ がある ／ がない ／ のある ＋ 名詞）",
    "examples": [
      {
        "translation": "この本は読みがいがあります。"
      },
      {
        "translation": "早起きしがいがあると思いますよ。"
      },
      {
        "translation": "長い時間をかけがいのある仕事だ。"
      },
      {
        "translation": "彼とは話しがいがあるでしょう。"
      }
    ]
  },
  "ja_かいがあって_41": {
    "title": "～かいがあって (〜kaiga atte)",
    "shortExplanation": "費やした努力や苦労が報われて、期待通りの望ましい良い結果が得られたことを表します。「〜した甲斐があって」「努力が実って」。",
    "longExplanation": "「～かいがあって」（「甲斐がある」の接続表現）は、前もって注ぎ込んだ努力、訓練、苦労、忍耐、時間などが無駄にならず、その相応の素晴らしい成果や満足のいく結果がもたらされたことを表します。「一生懸命頑張った成果が出て本当によかった」という充足感を表す表現です。動詞た形や「名詞＋の」に接続します。",
    "formation": "動詞た形 ＋ かいがあって ／ 名詞 ＋ の ＋ かいがあって",
    "examples": [
      {
        "translation": "毎日勉強したかいがあって、テストに合格しました。"
      },
      {
        "translation": "練習のかいがあって、試合に勝つことができた。"
      },
      {
        "translation": "雨の中を走ってきたかいがあって、電車に間に合った。"
      },
      {
        "translation": "早起きして掃除をしたかいがあって、部屋がきれいになった。"
      }
    ]
  },
  "ja_かいもなく_42": {
    "title": "～かいもなく (〜kai mo naku)",
    "shortExplanation": "せっかく尽くした努力や苦労がまったく実を結ばず、無駄に終わってしまった落胆を表します。「〜した甲斐もなく」「努力の甲斐なく」。",
    "longExplanation": "「～かいもなく」（「甲斐がある」の否定接続表現）は、前項でどれほど大きな努力、期待、苦労、時間などを費やしたにもかかわらず、それが何ひとつ報われず、失敗や残念な結果に終わってしまったことに対する強い無念や落胆の気持ちを表します。後続節には不首尾や期待外れの結果が来ます。",
    "formation": "動詞た形 ＋ かいもなく ／ 名詞 ＋ の ＋ かいもなく",
    "examples": [
      {
        "translation": "長い間苦労したかいもなく、失敗してしまった。"
      },
      {
        "translation": "このプロジェクトにたくさん時間をかけたかいもなく、うまくいかなかった。"
      },
      {
        "translation": "助けを求めたかいもなく、誰も来なかった。"
      },
      {
        "translation": "色々な方法でダイエットを試みたかいもなく、全然痩せなかった。"
      }
    ]
  },
  "ja_かける_43": {
    "title": "～かける (〜kakeru)",
    "shortExplanation": "ある動作を始めて途中の段階にあり、まだ最後まで完了していない状態を表し、「〜しかけて途中でやめる」「〜の途中である」という意味を表します。",
    "longExplanation": "「～かける」は動詞の連用形（ます形語幹）に接続し、ある行為に着手したものの、完了せずに途中で中断している状態を表します。名詞を修飾する際には「〜かけの＋名詞」という形がよく用いられ、「食べかけ」「読みかけ」のように複合名詞化して定着しているものも多くあります。また、無意志動詞や瞬間動詞に接続して「もう少しで〜しそうになる（溺れかけるなど）」という直前の状態を表す用法もあります。",
    "formation": "動詞ます形語幹 ＋ かける ／ かけの ＋ 名詞",
    "examples": [
      {
        "translation": "彼女は食べかけのリンゴを置いて出かけた。"
      },
      {
        "translation": "子供たちはやりかけの宿題を机の上に残した。"
      },
      {
        "translation": "読みかけの本を夜になると探す。"
      },
      {
        "translation": "オフィスには、作りかけの書類がたくさんある。"
      }
    ]
  },
  "ja_がち_44": {
    "title": "～がち (〜gachi)",
    "shortExplanation": "好ましくない事態や行為が頻繁に起こる傾向があることを表し、「〜することが多い」「〜しやすい」という意味を表します。",
    "longExplanation": "「～がち」は動詞の連用形（ます形語幹）や一部の名詞に接続し、ある望ましくない状態や行為が習慣的・頻繁に現れやすい傾向にあることを表します。病気になりやすい、忘れ物をしやすい、遅刻しやすいなど、マイナス評価の事柄に対して用いられることが一般的です。名詞を修飾するときは「〜がちな＋名詞」、文末では「〜がちだ／がちです」の形をとります。",
    "formation": "動詞ます形語幹 ＋ がち ｜ 名詞 ＋ がち （＋ だ／な／に）",
    "examples": [
      {
        "translation": "彼は風邪を引きがちです。"
      },
      {
        "translation": "この地域は雨が降りがちです。"
      },
      {
        "translation": "彼女は忘れ物をしがちです。"
      },
      {
        "translation": "私は遅刻しがちなので、もっと早く起きないといけません。"
      }
    ]
  },
  "ja_かないかのうちに_45": {
    "title": "～か～ないかのうちに (〜ka〜naika no uchi ni)",
    "shortExplanation": "前のある動作が終わるとほぼ同時に、あるいは終わるか終わらないかの瞬間に次の事態が起こることを表し、「〜するとすぐに」「〜したとたんに」という意味を表します。",
    "longExplanation": "「～か～ないかのうちに」は、同一の動詞の辞書形（肯定）とない形（否定）を組み合わせて用いることで、前の事態が完全に完了したかどうかも定かでないほどごくわずかな時間のうちに、間髪を入れず次の事態が発生することを強調する表現です。後続文には話者の意志や命令・依頼表現は用いられず、突発的な事態の発生や客観的な事実の推移が述べられます。",
    "formation": "動詞辞書形 ＋ か ＋ 動詞ない形 ＋ かのうちに",
    "examples": [
      {
        "translation": "駅に着くか着かないかのうちに、雨が降り出した。"
      },
      {
        "translation": "ケータイを買うか買わないかのうちに、新しいモデルが発売された。"
      },
      {
        "translation": "彼が家を出るか出ないかのうちに、電話が鳴った。"
      },
      {
        "translation": "パーティーが始まるか始まらないかのうちに、彼女が泣き出した。"
      }
    ]
  },
  "ja_かねない_46": {
    "title": "～かねない (〜kane nai)",
    "shortExplanation": "現在の状況や原因から判断して、好ましくない結果や危険な事態を引き起こす可能性があることを表し、「〜するおそれがある」「〜しかねない」という意味を表します。",
    "longExplanation": "「～かねない」は動詞の連用形（ます形語幹）に接続し、放置したり不注意であったりすると、重大な悪影響や失敗、事故などの好ましくない事態に発展する危険性・可能性があることを示唆します。話し手の心配や警告のニュアンスを含み、原則としてマイナス評価の出来事に対して用いられます。",
    "formation": "動詞ます形語幹 ＋ かねない",
    "examples": [
      {
        "translation": "彼はあまりにも無責任で、約束を破りかねない。"
      },
      {
        "translation": "注意しないと、事故を起こしかねない。"
      },
      {
        "translation": "このアプリはバグが多いので、クラッシュしかねない。"
      },
      {
        "translation": "彼女は緊張しているので、失敗しかねない。"
      }
    ]
  },
  "ja_かねる_47": {
    "title": "～かねる (〜kaneru)",
    "shortExplanation": "心理的な抵抗や立場上の制約、状況の困難さから「〜することができない」と遠回し・丁寧に断る際に用いられ、「〜するのが難しい」「〜いたしかねる」という意味を表します。",
    "longExplanation": "「～かねる」は動詞の連用形（ます形語幹）に接続し、能力的に単に不可能であるというよりは、立場や事情、心情的な理由からその行為を遂行することが困難であることを表します。改まったビジネスの場では丁寧体の「～かねます」の形で頻繁に用いられ、直接的な「できません」という表現を避けて相手の要求を角を立てずにやんわりと断るための重要な敬語的表現です。",
    "formation": "動詞ます形語幹 ＋ かねる ／ かねます",
    "examples": [
      {
        "translation": "その問題は難しいので、私には解決しかねます。"
      },
      {
        "translation": "彼の言っていることが真実かどうか判断しかねます。"
      },
      {
        "translation": "彼女が来るかどうか今すぐには分かりかねます。"
      },
      {
        "translation": "詳しい内容については説明しかねます。"
      }
    ]
  },
  "ja_かのようだ_48": {
    "title": "～かのようだ (〜ka no you da)",
    "shortExplanation": "実際はそうではない、あるいは確実ではないのに、まるでそうであるかのような様子であることを比喩的に表し、「まるで〜のようだ」という意味を表します。",
    "longExplanation": "「～かのようだ」は、実際には事実と異なる、または定かではない事柄について、外見や態度、雰囲気がまるでその状態であるかのように感じられることを比喩的に表現する文型です。名詞を修飾する際には「〜かのような＋名詞」、用言を修飾する連用修飾では「〜かのように」の形になります。な形容詞および名詞には通常「である」が前置されます。",
    "formation": "動詞普通形 ＋ かのようだ ｜ い形容詞 ＋ かのようだ ｜ な形容詞 ＋ であるかのようだ ｜ 名詞 ＋ であるかのようだ",
    "examples": [
      {
        "translation": "彼は犬が怖いかのようだ。"
      },
      {
        "translation": "この部屋は寒いかのようだ。"
      },
      {
        "translation": "彼女は有名人であるかのようだ。"
      },
      {
        "translation": "彼は子供であるかのようだ。"
      }
    ]
  },
  "ja_かまいか_49": {
    "title": "～か～まいか (〜ka 〜maika)",
    "shortExplanation": "ある行為をするべきか、それともやめておくべきか、心の中で迷い躊躇している様子を表し、「〜しようか〜するのをやめようか」という意味を表します。",
    "longExplanation": "「～か～まいか」は動詞の意志形（意向形）と、否定の意志・推量を表す「まい」を対比させて並べることで、ある行動を起こすか起こさないかの狭間で二者択一に悩み、葛藤する心理を表す表現です。やや硬い文語的な響きを持ちます。論文や改まった叙述では、形容詞や名詞を伴って「〜であるか〜であるまいか」の形が取られることもあります。",
    "formation": "動詞意向形 ＋ か ＋ 動詞 ＋ まいか ｜ 形容詞／名詞 ＋ であるか ＋ であるまいか",
    "examples": [
      {
        "translation": "このプロジェクトを引き受けようか引き受けまいか、まだ決めていない。"
      },
      {
        "translation": "彼が成功しようか成功するまいか、今は予測できない。"
      },
      {
        "translation": "この問題は簡単であるか難しいであるまいか、意見が分かれている。"
      },
      {
        "translation": "彼はリーダーであるかフォロワーであるまいか、自分で選ぶべきだ。"
      }
    ]
  },
  "ja_からこそ_50": {
    "title": "～からこそ (〜kara koso)",
    "shortExplanation": "後続の結果をもたらした決定的な理由・原因を強く強調して表し、「まさに〜だから」「〜だからこそ」という意味を表します。",
    "longExplanation": "「～からこそ」は、理由を表す「から」に取り立ての助詞「こそ」が付いた文型で、他の理由ではなくまさにその理由があるからこそ、後続の特別な結果や状態が導き出されているという強い確信や実感を込めて述べるときに用いられます。苦労の末の成功や、特別な恩恵に対する感謝など、感情を込めた叙述で好んで用いられます。",
    "formation": "動詞普通形 ＋ からこそ ｜ い形容詞 ＋ からこそ ｜ な形容詞 ＋ だからこそ ｜ 名詞 ＋ だからこそ",
    "examples": [
      {
        "translation": "失敗したからこそ、成功の意味がわかる。"
      },
      {
        "translation": "苦しかったからこそ、今日の私がある。"
      },
      {
        "translation": "彼は親切だからこそ、人気がある。"
      },
      {
        "translation": "昔の経験があるからこそ、その問題がよく理解できる。"
      }
    ]
  },
  "ja_からして_51": {
    "title": "〜からして (〜kara shite)",
    "shortExplanation": "代表的な一つの手がかりや極端な一端を取り上げ、それを根拠にして全体を判断・評価する表現で、「〜から見ても」「〜の時点で既に」という意味を表します。",
    "longExplanation": "「〜からして」は名詞に接続し、表情や見た目、タイトルなど、真っ先に目につく典型的な一面やささいな手がかりを例示して、「その最初の一点からして既にこのような状態なのだから、全体も推して知るべしである」という強い批判的・否定的な判断を下す際に多く用いられます。多くの場合、マイナス面の評価や悲観的な推測を伴います。",
    "formation": "名詞 ＋ からして",
    "examples": [
      {
        "translation": "彼の顔つきからして、何か悪いことがあったのだろう。"
      },
      {
        "translation": "この料理の見た目からして、おいしくなさそうだ。"
      },
      {
        "translation": "彼女の試験成績からして、合格するのは難しいでしょう。"
      },
      {
        "translation": "その映画のタイトルからして、面白くないと思う。"
      }
    ]
  },
  "ja_からすると_52": {
    "title": "～からすると (〜kara suru to)",
    "shortExplanation": "ある根拠・判断基準や特定の立場を取り上げ、それに基づいて判断や評価を下す表現で、「〜から判断すると」「〜の立場から見れば」という意味を表します。",
    "longExplanation": "「～からすると」（「〜からすれば」も同義）は名詞に接続し、推測や判断を行う際の材料・手掛かり・評価基準（経験、評判、価格など）を提示し、それをもとに「〜と考えられる」「〜に違いない」といった判断や意見を述べる際に用いられます。また、特定の人物や集団の立場に身を置いて意見を述べる文脈でも使用されます。",
    "formation": "名詞 ＋ からすると",
    "examples": [
      {
        "translation": "経験からすると、この仕事は難しいでしょう。"
      },
      {
        "translation": "評判からすると、あのレストランはとても美味しいです。"
      },
      {
        "translation": "価格からすると、この商品は高品質のものと思われます。"
      },
      {
        "translation": "このエリアですが、交通の便からすると、便利です。"
      }
    ]
  },
  "ja_からといって_53": {
    "title": "～からといって (〜kara to itte)",
    "shortExplanation": "前述の理由や事実を認めるとしても、それだけで後述の事態が当然に成り立つわけではないことを表し、「〜という理由だけで」「〜だからといって」という意味を表します。",
    "longExplanation": "「～からといって」は、ある理由や前提が存在することは認めつつも、そのことだけを根拠として後の結果が必然的・当然に引き起こされるわけではないと反論・留保する文型です。そのため、文末には「〜わけではない」「〜とは限らない」「〜とは言えない」といった部分否定や限定の表現が呼応して用いられるのが一般的です。",
    "formation": "動詞普通形 ＋ からといって ｜ い形容詞 ＋ からといって ｜ な形容詞 ＋ だからといって ｜ 名詞 ＋ だからといって",
    "examples": [
      {
        "translation": "雨が降ったからといって、試合が中止になるわけではありません。"
      },
      {
        "translation": "彼が有名だからといって、彼の意見がいつも正しいわけではない。"
      },
      {
        "translation": "このスープが辛いからといって、全ての人が辛いと感じるわけではない。"
      },
      {
        "translation": "彼女が泣いているからといって、悲しいわけではないかもしれない。"
      }
    ]
  },
  "ja_からにかけて_54": {
    "title": "～から～にかけて (〜kara 〜ni kakete)",
    "shortExplanation": "時間や空間のある大体の範囲や広がりを表し、「〜から〜の間」「〜から〜の地域一帯にわたって」という意味を表します。",
    "longExplanation": "「～から～にかけて」は、時間的または空間的な始まりとおおよその終わりを指し示し、その一連の範囲全体にわたって状態が継続したり、現象が広がったりしていることを表す表現です。始点と終点が明確に区切られる「〜から〜まで」に比べ、境界線があいまいで幅を持たせた範囲を示すニュアンスを含みます。",
    "formation": "名詞1 ＋ から ＋ 名詞2 ＋ にかけて",
    "examples": [
      {
        "translation": "午前９時から午後５時にかけて、仕事をしています。"
      },
      {
        "translation": "東京から大阪にかけて、新幹線が走っています。"
      },
      {
        "translation": "春から夏にかけて、花がたくさん咲いています。"
      },
      {
        "translation": "２０歳から３０歳にかけて、多くの人が大学を卒業し、仕事に就くことが一般的です。"
      }
    ]
  },
  "ja_からには_55": {
    "title": "～からには (〜kara niwa)",
    "shortExplanation": "前述の事態が確定した事実や前提となった以上、それに見合う強い決意や当然の義務を果たすべきであることを表し、「〜である以上は」「〜のだから当然」という意味を表します。",
    "longExplanation": "「～からには」は、先行する事柄が既成事実や避けられない前提となった状況において、「そうである以上は、覚悟を決めて後続の行為を行うのが当然である」という話し手の強い責任感、義務感、決意を表す表現です。後続の文には「〜なければならない」「〜べきだ」「〜つもりだ」「〜てはいけない」などの意志や義務を表す表現が呼応して用いられます。",
    "formation": "動詞普通形 ＋ からには ｜ い形容詞 ＋ からには ｜ な形容詞 ＋ である／だ ＋ からには ｜ 名詞 ＋ である／だ ＋ からには",
    "examples": [
      {
        "translation": "試験に合格したからには、一所懸命働かなければならない。"
      },
      {
        "translation": "約束したからには、守らなければなりません。"
      },
      {
        "translation": "この映画が面白いからには、友達にも見せたい。"
      },
      {
        "translation": "彼女が助けを求めたからには、手伝わなければならない。"
      }
    ]
  },
  "ja_から見ると_56": {
    "title": "～から見ると (〜kara miru to)",
    "shortExplanation": "特定の立場、観点、あるいは物事の側面から眺めて判断や評価を下す表現で、「〜の立場から考えると」「〜の側面から言えば」という意味を表します。",
    "longExplanation": "「～から見ると」（「〜から見れば」「〜から見て」も同義）は名詞に接続し、事態を考察する際の特定の視点・観点・側面（費用、実力、健康面、ある人物の立場など）を明示し、その角度から見た場合の妥当性や評価、判断を客観的・主観的に述べる表現です。",
    "formation": "名詞 ＋ から見ると",
    "examples": [
      {
        "translation": "費用から見ると、このプランはお得です。"
      },
      {
        "translation": "彼女の意見から見ると、社長の決定は理解できる。"
      },
      {
        "translation": "実力から見ると、彼はチームで最も優れている。"
      },
      {
        "translation": "健康面から見ると、この食品は良くない。"
      }
    ]
  },
  "ja_から言うと_57": {
    "title": "～から言うと (〜kara iuto)",
    "shortExplanation": "ある特定の側面や評価基準に限定して意見や判断を述べる表現で、「〜の点から言えば」「〜の立場・基準で言えば」という意味を表します。",
    "longExplanation": "「～から言うと」（「〜から言えば」「〜から言って」も同義）は、判断の対象となる性質、基準、側面（値段、味、利便性、健康など）を表す名詞に接続し、「他の要素はともかくとして、その側面だけに焦点を絞って述べるならば」というニュアンスで評価や意見を提示する表現です。",
    "formation": "名詞 ＋ から言うと ／ から言って ／ から言えば",
    "examples": [
      {
        "translation": "値段から言うと、この商品が最もお得です。"
      },
      {
        "translation": "味から言って、このレストランはおいしいと思います。"
      },
      {
        "translation": "便利さから言って、このアパートは最適な場所にあります。"
      },
      {
        "translation": "健康から言うと、毎日運動することが大切です。"
      }
    ]
  },
  "ja_くせに_58": {
    "title": "～くせに (〜kuse ni)",
    "shortExplanation": "その人の身分・立場・能力や言動と矛盾する好ましくない行為をしていることに対して、非難・不満・軽蔑の気持ちを表し、「〜のくせに」「〜であるのに」という意味を表します。",
    "longExplanation": "「～くせに」は、ある人物が自分の立場・能力・前言などから当然期待されることとは正反対の行動をとることに対して、話し手が強い不満や非難、呆れ、軽蔑の感情を込めて述べる表現です。主にくだけた会話表現で用いられ、批判的なニュアンスを帯びます。前後の節の主語は同一人物である必要があり、原則として話し手自身のことには用いません（自虐の場合を除く）。口語では「〜くせして」という形も使われます。",
    "formation": "動詞普通形 ＋ くせに ｜ い形容詞 ＋ くせに ｜ な形容詞 ＋ な／の ＋ くせに ｜ 名詞 ＋ の ＋ くせに",
    "examples": [
      {
        "translation": "彼はいつも遅刻してくるくせに、自分が待たされるのが嫌いだ。"
      },
      {
        "translation": "悪いなと言ってるくせに、また同じことを繰り返している。"
      },
      {
        "translation": "彼は背が高いくせに、バスケが下手だ。"
      },
      {
        "translation": "この店は有名なのくせに、サービスが悪い。"
      }
    ]
  },
  "ja_ことから_59": {
    "title": "～ことから (〜koto kara)",
    "shortExplanation": "ある判断や結論、名前の由来、事態の発生などの根拠やきっかけを表し、「〜という事実から」「〜が原因で」という意味を表します。",
    "longExplanation": "「～ことから」は、客観的な事実や特徴を根拠として、何らかの判断を下したり、命名の由来を説明したり、新たな事態が生じたりした理由を述べる文型です。「〜ということがきっかけとなって」という因果関係を客観的に叙述する際に用いられ、ニュース報道や論文、説明文などの硬い文章で頻繁に使われます。",
    "formation": "動詞普通形 ＋ ことから ｜ い形容詞 ＋ ことから ｜ な形容詞 ＋ なことから ｜ 名詞 ＋ であることから／のことから",
    "examples": [
      {
        "translation": "彼は毎日運動することから、体が丈夫です。"
      },
      {
        "translation": "この店のサービスがいいことから、いつも混んでいます。"
      },
      {
        "translation": "彼女は親切なことから、みんなに好かれています。"
      },
      {
        "translation": "その会社の評判が良いことから、就職先として人気があります。"
      }
    ]
  },
  "ja_ことに_60": {
    "title": "～ことに (〜koto ni)",
    "shortExplanation": "ある事態や結果に対して抱く強い主観的感情や心理的反応を表し、「〜することに（驚く／腹が立つ）」「〜なことには」という意味を表します。",
    "longExplanation": "「～ことに」は、ある出来事や事実に対して話し手が抱く感情や心の動き（驚き、感動、怒り、感慨など）を際立たせる文型です。文頭に置いて「驚いたことに」「残念なことに」のように感情を先に提示する用法と、本項の例文のように事実を表す節の後に接続して「〜という事態に対して（感情を抱く）」という感情の対象を表す用法があります。",
    "formation": "動詞普通形 ＋ ことに ｜ い形容詞 ＋ ことに ｜ な形容詞 ＋ なことに",
    "examples": [
      {
        "translation": "彼が急に帰国することに驚いた。"
      },
      {
        "translation": "彼女が優勝したことに感動した。"
      },
      {
        "translation": "彼がいつも遅刻することに腹が立つ。"
      },
      {
        "translation": "彼女がこんなに美しいことに気がつかなかった。"
      }
    ]
  },
  "ja_ことになっている_61": {
    "title": "～ことになっている (〜koto ni natte iru)",
    "shortExplanation": "規則・法律・社会的な慣習、またはあらかじめ決まっている予定や取り決めを表し、「〜と決まっている」「〜という予定・規則だ」という意味を表します。",
    "longExplanation": "「～ことになっている」は、集団のルールや法律、社会的なマナー・慣習、あるいは前もって決められた予定などを述べる文型です。話し手個人の主観的な意志ではなく、周囲の合意や客観的な規則によってすでに定まっている事柄であることを客観的・婉曲的に伝える際に用いられます。",
    "formation": "動詞普通形 ＋ ことになっている ｜ い形容詞 ＋ ことになっている ｜ な形容詞 ＋ である／だという ＋ ことになっている ｜ 名詞 ＋ である／だという ＋ ことになっている",
    "examples": [
      {
        "translation": "日本では、左側を運転することになっています。"
      },
      {
        "translation": "会社の規則では、制服を着ることになっている。"
      },
      {
        "translation": "彼女は明日結婚することになっています。"
      },
      {
        "translation": "この商品は高品質だということになっています。"
      }
    ]
  },
  "ja_さえば_62": {
    "title": "～さえ～ば (〜sae ~ba)",
    "shortExplanation": "その条件一つさえ満たされれば、他のことは問題なく成立することを表し、「〜だけで」「〜さえすれば」という意味を表します。",
    "longExplanation": "「～さえ～ば」は、最低限その一つの条件さえ整えば、他の条件はどうであれ後続の事態や望ましい結果が成立することを強調する文型です。名詞に接続して「名詞＋さえ＋仮定形（あれば・いればなど）」とする形や、動詞の連用形に接続して「動詞ます形語幹＋さえすれば」とする形が代表的です。",
    "formation": "名詞 ＋ さえ ＋ 仮定形（ば） ｜ 動詞ます形語幹 ＋ さえすれば／さえあれば",
    "examples": [
      {
        "translation": "お金さえあれば、幸せです。"
      },
      {
        "translation": "試験に合格しさえすれば、卒業できます。"
      },
      {
        "translation": "野菜さえたくさん食べれば、母は喜びます。"
      },
      {
        "translation": "交通費さえ支払ってもらえれば、どこへでも行きます。"
      }
    ]
  },
  "ja_ざるを得ない_63": {
    "title": "～ざるを得ない (〜zaru wo enai)",
    "shortExplanation": "本心ではやりたくないが、客観的な状況や立場から判断してそうするよりほかに方法がないことを表し、「〜しないわけにはいかない」「どうしても〜せざるを得ない」という意味を表します。",
    "longExplanation": "「～ざるを得ない」は、話し手自身の積極的な意志によるものではなく、周囲の状況や義理、客観的な情勢から判断して、他に選択肢がないため不本意ながらその行為を行わなければならないことを表すやや硬い文語的表現です。動詞の未然形（ない形語幹）に接続し、「する」は「せざるを得ない」となる不規則変化に注意が必要です。",
    "formation": "動詞ない形語幹 ＋ ざるを得ない（「する」は「せざるを得ない」）",
    "examples": [
      {
        "translation": "この仕事は締め切りが近いので、残業せざるを得ない。"
      },
      {
        "translation": "電車が遅れたため、タクシーに乗るざるを得なかった。"
      },
      {
        "translation": "彼女の説明が納得できなかったが、とりあえず信じざるを得ない。"
      },
      {
        "translation": "この状況では、新しい計画を立て直さざるを得ない。"
      }
    ]
  },
  "ja_ずにはいられない_64": {
    "title": "～ずにはいられない (〜zu ni wa irarenai)",
    "shortExplanation": "感情や欲求、内なる衝動を抑えることができず、自然とそうしてしまう様子を表し、「どうしても〜してしまう」「〜せずにはいられない」という意味を表します。",
    "longExplanation": "「～ずにはいられない」は、ある状況に直面したときに湧き上がる激しい感情や生理的欲求を理性でコントロールすることができず、思わずその行為をしてしまうという主観的な衝動を表す文型です。原則として話し手自身の心情を述べる際に用いられ、三人称の主語の場合は「〜ようだ」「〜らしい」などを伴うことが一般的です。動詞の未然形（ない形語幹）に接続し、「する」は「せずにはいられない」となります。",
    "formation": "動詞ない形語幹 ＋ ずにはいられない（「する」は「せずにはいられない」）",
    "examples": [
      {
        "translation": "この曲を聞くと、歌わずにはいられない。"
      },
      {
        "translation": "彼女が泣いているのを見ると、慰めずにはいられない。"
      },
      {
        "translation": "この小説は面白いので、読まずにはいられない。"
      },
      {
        "translation": "彼はおいしい料理を前にすると、食べずにはいられない。"
      }
    ]
  },
  "ja_そうにない_65": {
    "title": "～そうにない (〜sou ni nai)",
    "shortExplanation": "現状や様子から判断して、その動作や事態が起こる可能性が極めて低いことを表し、「〜しそうにもない」「とても〜とは思えない」という意味を表します。",
    "longExplanation": "「～そうにない」（強調形は「〜そうにもない」）は、様態の助動詞「〜そうだ」の否定形で、現在の様子や周囲の兆候から推測して、ある事態の実現する可能性がほとんどない、見込みが薄いと話し手が判断した際に用いる文型です。動詞の連用形（ます形語幹）や形容詞の語幹に接続します。",
    "formation": "動詞ます形語幹 ＋ そうにない ｜ い形容詞語幹 ＋ そうにない ｜ な形容詞語幹 ＋ そうにない",
    "examples": [
      {
        "translation": "この雨は止みそうにない。"
      },
      {
        "translation": "彼が試験に合格しそうにない。"
      },
      {
        "translation": "この料理がおいしそうにない。"
      },
      {
        "translation": "この部屋はきれいそうにない。"
      }
    ]
  },
  "ja_たかと思ったら_66": {
    "title": "～たかと思ったら (〜ta ka to omottara)",
    "shortExplanation": "ある事態が起きた直後、間髪を容れずに次の事態が発生したことに対する驚きを表し、「〜したと思ったらすぐに」「〜するやいなや」という意味を表します。",
    "longExplanation": "「～たかと思ったら」（「〜たと思うと」も同義）は、前項の動作や変化が起こって間もないうちに、ほとんど同時に後項の事態が連続して生じたことを表す文型です。事態の推移があまりにも素早いことに対する話し手の驚きや意外性のニュアンスが含まれます。後続節には客観的な事実が述べられ、話し手の意志や命令・働きかけの表現は使われません。",
    "formation": "動詞た形 ＋ かと思ったら／かと思うと",
    "examples": [
      {
        "translation": "電話をかけたかと思ったら、すぐに彼女が出た。"
      },
      {
        "translation": "離陸したかと思ったら、飛行機が揺れ始めた。"
      },
      {
        "translation": "買い物に行ったかと思ったら、雨が降ってきた。"
      },
      {
        "translation": "仕事を終わったかと思ったら、上司が追加の仕事を持ってきた。"
      }
    ]
  },
  "ja_たきり_67": {
    "title": "～たきり (〜takiri)",
    "shortExplanation": "ある過去の行為が行われたのを最後に、その状態がずっと続き、期待されるその後の変化や連絡がないことを表し、「〜したきり（その後何もない）」「〜したまま」という意味を表します。",
    "longExplanation": "「～たきり」は、動詞のた形に接続し、ある行為が過去に一度行われて以来、その結果生じた状態がそのまま継続し、当然起こるはずの次の行動や連絡が全く途絶えていることを表す文型です。後続節には「〜ない」といった否定表現が来ることが多く、音信不通や停滞に対する不満・心配・残念といった感情が込められます。",
    "formation": "動詞た形 ＋ きり（後続節に否定表現を伴うことが多い）",
    "examples": [
      {
        "translation": "彼は会社を辞めたきり、連絡がない。"
      },
      {
        "translation": "昨日の朝、メールを送ったきり、返事がない。"
      },
      {
        "translation": "子供のころ海に行ったきりで、もう20年になる。"
      },
      {
        "translation": "彼女と別れたきり、彼女のことを考えなくなった。"
      }
    ]
  },
  "ja_だけあって_68": {
    "title": "～だけあって (〜dake atte)",
    "shortExplanation": "ある立場・名声・能力や努力にふさわしく、期待どおりの素晴らしい結果や状態であることを賞賛し、「さすが〜だけあって」「〜にふさわしく」という意味を表します。",
    "longExplanation": "「～だけあって」（類義表現に「〜だけのことはある」）は、対象が持つ高い能力、資格、知名度、努力の度合いなどに相応して、期待通りの優れた成果や能力が発揮されていることを褒め称えたり感心したりする際に用いる文型です。「〜という名声・理由に恥じない」というニュアンスを含み、後続節には必ず肯定的な良い評価が来ます。マイナスの結果には用いられません。",
    "formation": "動詞普通形 ＋ だけあって ｜ い形容詞 ＋ だけあって ｜ な形容詞 ＋ なだけあって ｜ 名詞 ＋ だけあって",
    "examples": [
      {
        "translation": "彼は日本語が上手だけあって、日本人のように話すことができる。"
      },
      {
        "translation": "このレストランは有名だけあって、料理がとても美味しい。"
      },
      {
        "translation": "彼女は経験豊富なだけあって、その問題を簡単に解決できた。"
      },
      {
        "translation": "彼は優秀な学生だけあって、いつもテストの点数が高い。"
      }
    ]
  },
  "ja_だけましだ_69": {
    "title": "～だけましだ (〜dake mashi da)",
    "shortExplanation": "現状は決して理想的・十分ではないものの、もっと悪い最悪の事態と比べればまだ救いがあることを表し、「〜だけまだいい」「不幸中の幸いだ」という意味を表します。",
    "longExplanation": "「～だけましだ」は、不満や問題がある現状を受け入れつつも、起こり得たより深刻で最悪な事態と比較して、「それと比べればこの程度で済んでまだ救われている、ましな方だ」と自らを慰めたり納得させたりする際に用いる文型です。",
    "formation": "動詞普通形 ＋ だけましだ ｜ い形容詞 ＋ だけましだ ｜ な形容詞 ＋ なだけましだ ｜ 名詞 ＋ なだけましだ／であるだけましだ",
    "examples": [
      {
        "translation": "失敗するだけましだ。もっと大変なことにならなくてよかった。"
      },
      {
        "translation": "遅れるだけましだ。来られないよりはいい。"
      },
      {
        "translation": "小さな部屋だけましだ。全く部屋がないよりはいい。"
      },
      {
        "translation": "彼が結婚しないだけましだ。大変なことになるところだったよ。"
      }
    ]
  },
  "ja_たところ_70": {
    "title": "～たところ (〜ta tokoro)",
    "shortExplanation": "ある行為を行ってみた結果、新しい事実が判明したり、予想外の反応や結果が生じたりしたことを表し、「〜してみたら」「〜した結果」という意味を表します。",
    "longExplanation": "「～たところ」は、動詞のた形に接続し、前項の行為を契機として、どのような結果や相手の反応、あるいは客観的な事実が得られたかを報告・叙述する文型です。後続節にはその行為によって発見された客観的事実が述べられ、話し手の意志や命令・依頼などの主観的な表現は使われません。",
    "formation": "動詞た形 ＋ ところ",
    "examples": [
      {
        "translation": "掃除したところ、部屋がずっとキレイになりました。"
      },
      {
        "translation": "彼に聞いたところ、その質問の答えは分からないみたいです。"
      },
      {
        "translation": "宿題を出したところ、先生が間違いを見つけました。"
      },
      {
        "translation": "昼ごはんを食べたところ、気分が良くなりました。"
      }
    ]
  },
  "ja_たとたん_71": {
    "title": "～たとたん (〜ta totan)",
    "shortExplanation": "ある動作が行われたまさにその瞬間に、予期せぬ別の事態が突発的に起こることを表し、「〜した瞬間に」「〜するやいなや」という意味を表します。",
    "longExplanation": "「～たとたん」（「〜たとたんに」も同様）は、動詞のた形に接続し、前項の動作が完了したまさにその一瞬に、それに引き続いて突発的な出来事や変化が発生したことを表す文型です。後続節には話者のコントロールできない偶発的・突発的な事態が述べられるため、話者の意志的な行為や命令・希望などの表現は用いられません。",
    "formation": "動詞た形 ＋ とたん／とたんに",
    "examples": [
      {
        "translation": "ドアを開けたとたん、雨が降り始めた。"
      },
      {
        "translation": "電話をかけたとたん、バッテリーが切れた。"
      },
      {
        "translation": "彼女に会ったとたん、思い出の歌が流れた。"
      },
      {
        "translation": "テストが終わったとたん、リラックスできた。"
      }
    ]
  },
  "ja_だらけ_72": {
    "title": "～だらけ (〜darake)",
    "shortExplanation": "表面や空間が一面に汚いものや好ましくないもので覆われ、たくさんある様子を表し、「〜だらけだ」「〜まみれだ」という意味を表します。",
    "longExplanation": "「～だらけ」は名詞に直接接続し、ある場所や物の表面、あるいは全体が、視覚的・心理的に不快で望ましくないもの（ゴミ、埃、シワ、傷、間違い、借金など）で一面に満ちている状態を表す文型です。原則としてマイナス評価の事柄に対して用いられ、名詞を修飾するときは「〜だらけの＋名詞」、文末では「〜だらけだ」の形になります。",
    "formation": "名詞 ＋ だらけ（＋ だ／の ＋ 名詞）",
    "examples": [
      {
        "translation": "彼の部屋はゴミだらけだ。"
      },
      {
        "translation": "このビーチは岩だらけで泳ぎにくい。"
      },
      {
        "translation": "彼の顔はしわだらけだ。"
      },
      {
        "translation": "このリンゴは虫食いだらけだ。"
      }
    ]
  },
  "ja_っこない_73": {
    "title": "～っこない (〜kkonai)",
    "shortExplanation": "「絶対に〜できるはずがない」「いくら何でも〜するわけがない」と、強い確信をもって可能性を全否定する表現です。",
    "longExplanation": "「～っこない」は動詞の連用形（ます形語幹）に接続し、話し手の主観的な強い確信に基づいて「絶対に〜するはずがない」「到底〜できっこない」と可能性を完全に否定する表現です。日常会話や親しい間柄でのくだけた口語表現としてよく使われ、客観的な根拠というよりは話し手の強い気持ちや判断が前面に出ます。",
    "formation": "動詞ます形語幹 ＋ っこない",
    "examples": [
      {
        "translation": "こんなに雪が降っているんだから、学校に間に合いっこない。"
      },
      {
        "translation": "彼は泳げないので、プールの向こう側に泳いで行きっこない。"
      },
      {
        "translation": "彼女はとても怖がりなので、一人で夜の公園に行きっこない。"
      },
      {
        "translation": "この短い時間で、その本を全部読むことはできっこない。"
      }
    ]
  },
  "ja_つつ_74": {
    "title": "～つつ (〜tsutsu)",
    "shortExplanation": "二つの動作が並行して同時に行われていること（「〜しながら」）や、前後の事柄が矛盾・相反していること（逆接「〜けれども」）を表すやや改まった表現です。",
    "longExplanation": "「～つつ」は動詞の連用形（ます形語幹）に接続し、主に書き言葉や改まった場面で用いられる表現です。主な用法として、①二つの動作が同時並行して行われることを表す「〜しながら（同時進行）」、②心の中で思っていることと実際の行動が矛盾していることを表す逆接の「〜けれども／〜と思いながらも（逆接）」の二つがあります。逆接用法では「思う」「知る」などの心理動詞とともによく用いられます。",
    "formation": "動詞ます形語幹 ＋ つつ",
    "examples": [
      {
        "translation": "彼はテレビを見つつ、宿題をしていました。"
      },
      {
        "translation": "最近忙しいと思いつつ、毎日運動を続けています。"
      },
      {
        "translation": "彼女は泣きつつ、笑顔で別れを告げた。"
      },
      {
        "translation": "雨に濡れつつ、彼は歩き続けました。"
      }
    ]
  },
  "ja_つつある_75": {
    "title": "～つつある (〜tsutsu aru)",
    "shortExplanation": "ある変化や事態が今まさに継続して進んでいる過程にあることを表し、「次第に〜してきている」「〜という方向へ変化しつつある」という意味を表す硬い表現です。",
    "longExplanation": "「～つつある」は動詞の連用形（ます形語幹）に接続し、ある変化の過程が現在進行形として進んでいることを表す硬い書き言葉です。「暖かくなる」「回復する」「増加する」「発展する」といった変化を表す動詞に接続し、事態が少しずつその方向へ動いている実態を客観的・公式的に述べる際に用いられます。ニュースや論説文で多用されます。",
    "formation": "動詞ます形語幹 ＋ つつある",
    "examples": [
      {
        "translation": "地球温暖化は進行しつつある。"
      },
      {
        "translation": "この町は急速に発展しつつある。"
      },
      {
        "translation": "子供たちは成長しつつある。"
      },
      {
        "translation": "景気が回復しつつある。"
      }
    ]
  },
  "ja_っぱなし_76": {
    "title": "～っぱなし (〜ppanashi)",
    "shortExplanation": "本来なら後始末や次の動作をすべきなのに、そのまま放置している状態を表したり、ある動作や状態が途切れずずっと続いていることを表します。",
    "longExplanation": "「～っぱなし」は動詞の連用形（ます形語幹）に接続し、「〜したまま放置する」という意味を表す口語表現です。通常であれば片付けたり元の状態に戻したりすべき後処置を怠り、そのままの状態が続いていることに対して、非難・不満・反省などの感情を込めて使われることが多くあります（例：出しっぱなし、つけっぱなし）。また、「立ちっぱなし」「歩きっぱなし」のように、ある動作や負荷のかかる状態が休みなく継続していることを表す用法もあります。",
    "formation": "動詞ます形語幹 ＋ っぱなし （＋ だ／にする／で）",
    "examples": [
      {
        "translation": "窓を開けっぱなしにして、部屋が寒くなってしまった。"
      },
      {
        "translation": "彼は音楽を聴くのが好きで、いつもイヤホンをつけっぱなしです。"
      },
      {
        "translation": "子供はおもちゃを床に置きっぱなしで、片付けなかった。"
      },
      {
        "translation": "昨夜は忙しかったので、テレビをつけっぱなしにして寝てしまった。"
      }
    ]
  },
  "ja_っぽい_77": {
    "title": "～っぽい (〜ppoi)",
    "shortExplanation": "その性質、傾向、感じを強く帯びていることを表し、「〜のように見える」「〜の感じがする」「〜しやすい」という意味を表すくだけた表現です。",
    "longExplanation": "「～っぽい」は名詞、形容詞語幹、動詞の連用形（ます形語幹）に付く接尾辞で、親しい間柄のくだけた会話でよく使われます。主に①本来はそうではないが外見や雰囲気がそれに似ている（「大人っぽい」「子供っぽい」）、②そのような色合いや性質を帯びている（「白っぽい」「油っぽい」「安っぽい」）、③ある感情や行動を起こしやすい性格・傾向にある（「怒りっぽい」「忘れっぽい」）といったニュアンスを表します。",
    "formation": "名詞 ＋ っぽい ｜ 動詞ます形語幹 ＋ っぽい ｜ い形容詞語幹 ＋ っぽい ｜ な形容詞語幹 ＋ っぽい",
    "examples": [
      {
        "translation": "彼女は大人っぽい服を着ている。"
      },
      {
        "translation": "この説明は分かりにくっぽい。"
      },
      {
        "translation": "彼は疲れたっぽい顔をしている。"
      },
      {
        "translation": "この部屋は寒っぽい感じがする。"
      }
    ]
  },
  "ja_ていられない_78": {
    "title": "～ていられない (〜te irarenai)",
    "shortExplanation": "状況が逼迫していたり精神的に耐えられなかったりして、ある動作をこれ以上続けたりその状態のままでいたりすることができないことを表します。",
    "longExplanation": "「～ていられない」は動詞のて形に接続し、「〜ている」の可能否定「〜ていられる」の否定形です。時間的・精神的な余裕がないため、あるいは事態が急を告げているために、ある動作や状態をのんびりと継続することができないという切迫した気持ちを表します（例：「待っていられない」「黙っていられない」）。現状を打破するために直ちに行動を起こさなければならないという意思や焦燥感が含まれます。",
    "formation": "動詞て形 ＋ いられない",
    "examples": [
      {
        "translation": "こんなに忙しいのに、無理に遊んでいられない。"
      },
      {
        "translation": "寒すぎて、外で待っていられない。"
      },
      {
        "translation": "この問題は重要だから、放っておいていられない。"
      },
      {
        "translation": "彼女の態度が我慢できず、黙っていられない。"
      }
    ]
  },
  "ja_てかなわない_79": {
    "title": "～てかなわない (〜te kanawanai)",
    "shortExplanation": "ある事態や感情の程度が甚だしく、我慢できない、やりきれないという迷惑や苦痛の気持ちを表し、「〜で我慢できない」「〜でたまらない」という意味を表します。",
    "longExplanation": "「～てかなわない」は形容詞や動詞のて形に接続し、「敵わない（対抗できない・太刀打ちできない）」という語源の通り、ある状態や事態が極端で我慢の限界を超えているという強い困惑や不満、苦痛を表す表現です。「暑くてかなわない」「うるさくてかなわない」「不便でかなわない」のように、話し手にとって不快・迷惑な状況に対して用いられるのが一般的です。",
    "formation": "い形容詞語幹 ＋ くてかなわない ｜ な形容詞 ＋ でかなわない ｜ 動詞て形 ＋ かなわない",
    "examples": [
      {
        "translation": "こんなに暑くてかなわない。"
      },
      {
        "translation": "彼の話は失礼すぎてかなわない。"
      },
      {
        "translation": "映画があまりに感動的で、忘れられなくてかなわない。"
      },
      {
        "translation": "彼女の笑顔がまぶしくてかなわない。"
      }
    ]
  },
  "ja_てからでないと_80": {
    "title": "～てからでないと (〜te kara denai to)",
    "shortExplanation": "前の事柄を完了した後でなければ、後ろの事柄を行うことができない（実現しない）という前提条件を表し、「〜した上でなければ」「〜してからでなければ」という意味を表します。",
    "longExplanation": "「～てからでないと」（あるいは「〜てからでなければ」）は動詞のて形に接続し、後項の事柄を行うための絶対的な前提条件・順序を提示する表現です。後項には「〜できない」「〜わけにはいかない」といった否定的な意味を表す文が必ず続き、「まず前項の動作を完了させない限り、後項の実現はあり得ない」という強い制約を表します。",
    "formation": "動詞て形 ＋ からでないと ／ からでなければ",
    "examples": [
      {
        "translation": "宿題をしてからでないと、遊びに行けません。"
      },
      {
        "translation": "食事をしてからでないと、デザートを食べられません。"
      },
      {
        "translation": "チケットを買ってからでないと、映画を見られません。"
      },
      {
        "translation": "試験が終わってからでないと、休みを取れません。"
      }
    ]
  },
  "ja_てこそ_81": {
    "title": "～てこそ (〜te koso)",
    "shortExplanation": "その行為を実際にしてはじめて、あるいはその条件が揃ってはじめて本来の意義や価値が生まれることを強調し、「〜してはじめて本当の〜と言える」という意味を表します。",
    "longExplanation": "「～てこそ」は動詞のて形などに強調のとりたて助詞「こそ」が接続した構文で、「それを実際に行ってはじめて」「その条件が満たされてはじめて、真価を発揮する／本来の意義がある」ということを力説する表現です。後項には「意味がある」「一人前と言える」「相手の気持ちがわかる」のように、努力や経験を経て得られる積極的な評価や成果が述べられることが多くあります。",
    "formation": "動詞て形 ＋ こそ ｜ い形容詞語幹 ＋ くてこそ ｜ な形容詞 ＋ でこそ ｜ 名詞 ＋ でこそ",
    "examples": [
      {
        "translation": "勉強してこそ、テストに合格できる。"
      },
      {
        "translation": "素直になってこそ、相手の気持ちが分かります。"
      },
      {
        "translation": "静かでこそ、心が落ち着く。"
      },
      {
        "translation": "友達でこそ、お互いに助け合うのは当然だ。"
      }
    ]
  },
  "ja_でしょうがない_82": {
    "title": "～でしょうがない (〜deshou ga nai)",
    "shortExplanation": "ある感情や感覚、生理的欲求が自然と強く湧き上がり、自分では抑えられない状態を表し、「非常に〜だ」「〜でたまらない」という意味を表す口語的な表現です。",
    "longExplanation": "「～でしょうがない」（あるいは「〜てしょうがない」）は形容詞や動詞のて形に接続し、「仕様がない（方法がない）」という言葉通り、自発的に湧き起こる感情や生理的欲求、身体的感覚が非常に強烈で、理性や意志では抑えようがない状態を表す表現です。「不安で（しょうがない）」「気になって（しょうがない）」「痛くて（しょうがない）」のように用いられ、話し手の切実な実感を伝えます。",
    "formation": "い形容詞語幹 ＋ くてしょうがない ｜ な形容詞 ＋ で（は）しょうがない ｜ 動詞て形 ＋ しょうがない",
    "examples": [
      {
        "translation": "今日は暇で(は)しょうがない。"
      },
      {
        "translation": "試験が近いから不安でしょうがない。"
      },
      {
        "translation": "頭が痛くてしょうがないから、早退したい。"
      },
      {
        "translation": "新しいゲームが気になってしょうがない。"
      }
    ]
  },
  "ja_でたまらない_83": {
    "title": "～でたまらない (〜de tamaranai)",
    "shortExplanation": "ある感情や身体的感覚、欲求が極めて強烈で、我慢することができない状態を表し、「非常に〜だ」「〜て我慢できない」という意味を表します。",
    "longExplanation": "「～でたまらない」は形容詞や動詞のて形に接続し、「堪える（我慢する）」の否定形から成り立っています。身体的な感覚（暑い、痛い、喉が渇いた）や内面的な感情（嬉しい、好きだ、悔しい）、強い願望（〜したくてたまらない）が極限に達し、これ以上我慢できない、抑えきれない状態を表します。迷惑や苦痛に偏る「〜てかなわない」とは異なり、「〜てたまらない」は喜びや好意などの肯定的な強い感情にも自然に使うことができます。",
    "formation": "い形容詞語幹 ＋ くてたまらない ｜ な形容詞 ＋ でたまらない ｜ 動詞て形 ＋ たまらない",
    "examples": [
      {
        "translation": "この暑さは本当に暑くてたまらない。"
      },
      {
        "translation": "彼女のことが好きでたまらない。"
      },
      {
        "translation": "この部屋は寒くてたまらない。"
      },
      {
        "translation": "彼の態度を見ていると、腹が立ってたまらない。"
      }
    ]
  },
  "ja_でならない_84": {
    "title": "～でならない (〜de naranai)",
    "shortExplanation": "ある感情や思いが心の中から自然と湧き上がってきて、それを理性や意志で抑えることができない状態を表し、「思えて仕方がない」「非常に〜だ」という意味を表す文語的な表現です。",
    "longExplanation": "「～でならない」（あるいは「〜てならない」）は形容詞や動詞のて形に接続し、ある感情や思考が心の底から自発的に湧き起こり、自分の意志ではどうしても抑えることができない状態を表すやや硬い表現です。主観的な強い感情を表しますが、「心配でならない」「残念でならない」「思えてならない」「気になってならない」のように自発動詞や心理形容詞と結びつくことが多く、理屈ではなく自然とそう感じられてしまうというニュアンスを含みます。",
    "formation": "い形容詞語幹 ＋ くてならない ｜ な形容詞 ＋ でならない ｜ 動詞て形 ＋ ならない",
    "examples": [
      {
        "translation": "彼の演技が素晴らしくてならない。"
      },
      {
        "translation": "合格発表が気になってならない。"
      },
      {
        "translation": "友達が引っ越してしまって、寂しくてならない。"
      },
      {
        "translation": "初めての海外旅行で、不安でならない。"
      }
    ]
  },
  "ja_でばかりはいられない_85": {
    "title": "～でばかりはいられない (〜de bakari wa irarenai)",
    "shortExplanation": "いつまでもその動作を続けたりその状態に甘んじたりしているわけにはいかないという自戒や決意を表し、「ずっと〜しているわけにはいかない」「〜ばかりしている状態から脱しなければならない」という意味を表します。",
    "longExplanation": "「～でばかりはいられない」（あるいは「〜てばかりはいられない」）は、限定を表す「ばかり」と「〜てはいられない」が結びついた構文です。悲しみに暮れたり、他人に甘えたり、休んだりといった一つの状態にいつまでも留まり続けることは許されない、現実に立ち向かって次の行動や義務を果たさなければならないという、強い自戒や気持ちの切り替えを表現します。",
    "formation": "動詞て形 ＋ ばかりはいられない ｜ い形容詞語幹 ＋ くてばかりはいられない ｜ な形容詞 ＋ でばかりはいられない ｜ 名詞 ＋ でばかりはいられない",
    "examples": [
      {
        "translation": "いつも助けてもらってばかりはいられない。"
      },
      {
        "translation": "好きな仕事ばかりしてはいられない。"
      },
      {
        "translation": "親に頼ってばかりはいられない。"
      },
      {
        "translation": "休んでばかりはいられない。仕事もしなくちゃ。"
      }
    ]
  },
  "ja_ではないか_86": {
    "title": "～ではないか (〜de wa nai ka)",
    "shortExplanation": "自分の意見や主張を相手に強く主張したり同意を求めたりする用法や、意外な事実を発見して驚き・感嘆を表す用法があり、「〜ではないか」「〜じゃないか」という意味を表します。",
    "longExplanation": "「～ではないか」（口語では「〜じゃないか」）は文末に用いられ、文脈やイントネーションによって多様なニュアンスを表します。主な用法として、①話し手の強い主張・意見を述べ相手に同意を促す用法（「〜ではないか」）、②相手への注意喚起や軽い非難・詰問の用法、③予想外の事実に直面して驚きや感動、新発見の喜びを声に出す詠嘆の用法（「〜ではないか！」）があります。",
    "formation": "動詞普通形 ＋ ではないか ｜ い形容詞 ＋ ではないか ｜ な形容詞語幹 ＋ ではないか ｜ 名詞 ＋ ではないか",
    "examples": [
      {
        "translation": "彼は優秀な学生ではないか。"
      },
      {
        "translation": "この料理は美味しいではないか。"
      },
      {
        "translation": "あなたは彼女の友達ではないか。"
      },
      {
        "translation": "明日は休みではないか。"
      }
    ]
  },
  "ja_てはならない_87": {
    "title": "～てはならない (〜te wa naranai)",
    "shortExplanation": "法律や規則、道徳的な観点から「決して〜してはいけない」と強い禁止を命じる表現で、「〜してはだめだ」の格式高く厳格な言い方です。",
    "longExplanation": "「～てはならない」は動詞のて形に接続し、法律、社会規範、道徳的責任などに基づき、強い義務感をもってある行為を厳格に禁止する硬い表現です。「〜してはいけない」に比べて非常に重々しく格式のある文体で、公的な規則・標語、法律の条文、訓戒、論文や演説などで多用されます。個人の私的な日常会話における軽い注意にはあまり用いられません。",
    "formation": "動詞て形 ＋ はならない",
    "examples": [
      {
        "translation": "ここでタバコを吸ってはならない。"
      },
      {
        "translation": "秘密を他人に話してはならない。"
      },
      {
        "translation": "この部屋に入ってはならない。"
      },
      {
        "translation": "飲酒運転をしてはならない。"
      }
    ]
  },
  "ja_てまで_88": {
    "title": "～てまで (〜te made)",
    "shortExplanation": "ある目的を達成するために、普通では考えられない極端な手段をとったり大きな犠牲を払ったりすることを表し、「〜してまで」「〜という極端なことまでして」という意味を表します。",
    "longExplanation": "「～てまで」は動詞のて形に接続し、ある目的を果たすために、通常の限度や常識の範囲をはるかに超えた極端な行動に踏み切ることや、過大な犠牲・負担を払うことを表します。「そこまでして…するのか」という話し手の驚き・非難・疑問の感情、あるいは「何としてでも…を成し遂げたい」という並々ならぬ強い決意を込めて用いられます。",
    "formation": "動詞て形 ＋ まで",
    "examples": [
      {
        "translation": "彼は試験に合格するために、徹夜してまで勉強しました。"
      },
      {
        "translation": "この商品がほしかったので、朝早く起きてまで並んで買いました。"
      },
      {
        "translation": "彼女は彼を助けるために、お金を借りてまで手術代を払いました。"
      },
      {
        "translation": "部長はそのプロジェクトを成功させるために、休日も働いてまで取り組んでいます。"
      }
    ]
  },
  "ja_て当然だ_89": {
    "title": "～て当然だ (〜te tōzen da)",
    "shortExplanation": "理由や前提となる状況から考えて、その結果が生じるのは至極当たり前・自然なことであると判断して述べる表現で、「〜するのは当然だ」「〜して当たり前だ」という意味を表します。",
    "longExplanation": "「～て当然だ」（類義表現に「～て当たり前だ」）は、動詞のて形や形容詞の接続形に接続し、前提となる努力や原因に照らし合わせれば、その結果に至るのは極めて自然であり、誰が見ても当然の道理であることを表します。努力に見合った妥当な成果を肯定的に評価するときや、自然の因果関係を強調する場面で用いられます。",
    "formation": "動詞て形 ＋ 当然だ ｜ い形容詞語幹 ＋ くて当然だ ｜ な形容詞 ＋ で当然だ",
    "examples": [
      {
        "translation": "彼は毎日勉強しているから、試験に合格して当然だ。"
      },
      {
        "translation": "そのレストランは料理が美味しいので、予約がいっぱいになって当然だ。"
      },
      {
        "translation": "彼女は毎晩練習しているので、上手になって当然だ。"
      },
      {
        "translation": "彼は仕事で成功していて、お金持ちになって当然だ。"
      }
    ]
  },
  "ja_というものだ_90": {
    "title": "～というものだ (〜to iu mono da)",
    "shortExplanation": "一般的な常識や人生の道理、物事の本質に照らし、「本当にそれこそが〜だ」「まさに〜と呼ぶべきだ」と強い実感や確信を込めて評価・断定する表現です。",
    "longExplanation": "「～というものだ」は、世間一般の常識、道理、または客観的な事実に基づき、話し手が「それこそが真の〜というものだ」「まさに〜と考えるのが当然だ」と深く納得したり、感慨を込めて主張・断定したりする際に用いられます。人生の真理や教訓、あるいは物事の本質を感慨深く語り聞かせるような文脈でよく使われます。",
    "formation": "普通形 ＋ というものだ ｜ な形容詞語幹（だ／である） ＋ というものだ ｜ 名詞（だ／である） ＋ というものだ",
    "examples": [
      {
        "translation": "若者の熱情は尊敬に値するというものだ。"
      },
      {
        "translation": "勉強は一日でもサボれば遅れるというものだ。"
      },
      {
        "translation": "成功するためには困難に立ち向かうというものだ。"
      },
      {
        "translation": "友情はお金で買えないというものだ。"
      }
    ]
  },
  "ja_どうにかないものか_91": {
    "title": "どうにか～ないものか (dō ni ka ~ nai mono ka)",
    "shortExplanation": "困難な局面や思い通りにならない事態に直面し、「何とかして解決する方法はないだろうか」「どうにか実現してほしい」と強く願う気持ちを表します。",
    "longExplanation": "「どうにか～ないものか」は、副詞「どうにか（何とかして）」に動詞の否定形と終助詞的な「ものか（だろうか）」が結びついた表現です。容易には解決できない厳しい状況や思い通りにいかない現実に対して、「何らかの手段を尽くして打破できないものか」「何としても良い方向へ向かってほしい」と、解決策を必死に模索し祈るような話し手のもどかしい強い願望を表します。",
    "formation": "どうにか ＋ 動詞ない形 ＋ （もの）か／ないものだろうか",
    "examples": [
      {
        "translation": "どうにかこの仕事を終わらせないものか。"
      },
      {
        "translation": "どうにか次の試験で合格しないものか。"
      },
      {
        "translation": "どうにか込んでいる電車に乗れないものか。"
      },
      {
        "translation": "どうにか彼女と仲直りしないものか。"
      }
    ]
  },
  "ja_とおり_92": {
    "title": "～とおり (〜toori)",
    "shortExplanation": "前もって示された指示、規則、予想、発言などの内容と寸分違わず同じように物事を行う、またはその通りになることを表し、「〜と同じように」「〜に従って」という意味を表します。",
    "longExplanation": "「～とおり（～どおり）」は、前に示された指示、計画、規則、あるいは前評判・予想などと全く同じ状態や動作であることを表します。動詞の辞書形・た形に接続するほか、名詞に直接接続する場合は連濁して「～どおり（予定どおり、規則どおり等）」となるか、「名詞＋のとおり」の形で用いられます。",
    "formation": "動詞辞書形／た形 ＋ とおり（に） ｜ 名詞 ＋ のとおり（に）／名詞 ＋ どおり（に） ｜ 普通形 ＋ というとおり",
    "examples": [
      {
        "translation": "先生が言ったとおりに宿題をしました。"
      },
      {
        "translation": "この地図のとおりに歩いてください。"
      },
      {
        "translation": "彼はいつもルールどおりに遊びます。"
      },
      {
        "translation": "その道路は昼間と同じくらい夜も賑やかだというとおりでした。"
      }
    ]
  },
  "ja_とか_93": {
    "title": "～とか (〜to ka)",
    "shortExplanation": "同類の動作や事柄から代表的な例を並べて挙げたり、不確かな伝聞や推測を断定を避けて柔らかく述べたりする際に用いる口語表現です。",
    "longExplanation": "「～とか」は親しい間柄の日常会話で多用される表現で、主に二つの用法があります。①同類の動作・事物の中から代表的なものをいくつか例として不完全に列挙する「〜とか〜とか（〜や〜など）」、②人から伝え聞いた不確かな情報や記憶を、断定を避けて柔らかく伝える「〜だとか（〜ということだ／〜らしい）」の用法です。会話の調子を和らげる働きを持ちます。",
    "formation": "動詞普通形 ＋ とか ｜ い形容詞 ＋ とか ｜ な形容詞 ＋ だとか ｜ 名詞 ＋ だとか",
    "examples": [
      {
        "translation": "休日は映画を見るとか、買い物に行くとかして過ごします。"
      },
      {
        "translation": "彼女はオーストラリアとかニュージーランドとかに行きたがっています。"
      },
      {
        "translation": "今日の天気は晴れたり、曇ったりとかだそうです。"
      },
      {
        "translation": "彼は野球をしたり、サッカーをしたりとかしています。"
      }
    ]
  },
  "ja_ところ_94": {
    "title": "～ところ (〜tokoro)",
    "shortExplanation": "動作が今どの段階にあるか（直前・最中・直後）という時間的局面や、特定の状況・場面を表し、「〜するところだ」「〜している最中だ」「〜したばかりだ」という意味を表します。",
    "longExplanation": "「～ところ」は、接続する動詞の活用形によって動作の時間的プロセスを精密に描き分ける形式名詞表現です。①動詞辞書形＋ところ（直前：「今まさに〜しようとしている局面」）、②動詞ている形＋ところ（進行中：「今まさに〜している最中」）、③動詞た形＋ところ（直後：「たった今〜し終えた直後」）を表します。また、形容詞や名詞に接続して「お忙しいところ」「危ないところ」のように、特定の状況や折を表す挨拶・慣用表現としても多用されます。",
    "formation": "動詞辞書形／ている形／た形 ＋ ところ ｜ い形容詞 ＋ ところ ｜ な形容詞 ＋ なところ ｜ 名詞 ＋ のところ",
    "examples": [
      {
        "translation": "出かけるところです。"
      },
      {
        "translation": "映画を見ているところです。"
      },
      {
        "translation": "おいしいところで食事をするつもりです。"
      },
      {
        "translation": "彼は忙しいところを手伝ってくれました。"
      }
    ]
  },
  "ja_どころか_95": {
    "title": "～どころか (〜dokoro ka)",
    "shortExplanation": "前に挙げた事柄の程度にとどまらず、実際はそれをはるかに超えていること、または期待とは正反対の事態であることを強調する表現です。",
    "longExplanation": "「～どころか」は、話し手や聞き手が想定した基準・程度を強く否定し、現実はそれとはかけ離れた極端な状態にあることを際立たせる表現です。①「〜どころか、それをはるかに上回る素晴らしいレベルだ」と想定以上の高さを強調する用法（「上手どころかプロ並みだ」）と、②「〜どころか、全く逆の悪い状態だ」と事態の深刻さ・期待外れを強調する用法（「治るどころか悪化した」）の両面で用いられます。",
    "formation": "動詞普通形 ＋ どころか ｜ い形容詞 ＋ どころか ｜ な形容詞 ＋ どころか ｜ 名詞 ＋ どころか",
    "examples": [
      {
        "translation": "彼は歌が上手どころか、プロの歌手みたいだ。"
      },
      {
        "translation": "この料理はおいしいどころか、最高の味だ。"
      },
      {
        "translation": "彼女はただの友達どころか、私の親友だ。"
      },
      {
        "translation": "彼は英語ができるどころか、他の3つの言語も話せる。"
      }
    ]
  },
  "ja_どころではない_96": {
    "title": "～どころではない (〜dokoro de wa nai)",
    "shortExplanation": "目下の状況が極めて逼迫・多忙・深刻であるため、とてもその行為をする時間的・精神的・経済的なゆとりがないことを表し、「〜している場合ではない」「とても〜どころではない」という意味を表します。",
    "longExplanation": "「～どころではない」は、現在直面している事態が非常に切迫していたり、仕事に追われていたりと重大な局面にあるため、のんびりと特定の行動をとったり楽しんだりする心のゆとりや時間・お金が全くないことを表します。「今は〜している場合ではない」「そんなことを考えている余裕はない」と、誘いを断ったり切羽詰まった現状を訴えたりする際に頻繁に用いられます。",
    "formation": "動詞普通形 ＋ どころではない ｜ い形容詞 ＋ どころではない ｜ な形容詞 ＋ どころではない ｜ 名詞 ＋ どころではない",
    "examples": [
      {
        "translation": "彼の失敗を笑うどころではない。私たちも同じミスをしている。"
      },
      {
        "translation": "病気で寝ている時は、遊ぶどころではない。"
      },
      {
        "translation": "試験が近いので、映画を見るどころではない。"
      },
      {
        "translation": "仕事が忙しすぎて、旅行なんて考えるどころではない。"
      }
    ]
  },
  "ja_としたら_97": {
    "title": "～としたら (〜to shitara)",
    "shortExplanation": "ある事柄を仮定・想定の条件として設定し、「もし〜だと仮定すれば」とその場合の判断、推量、意志などを述べる表現です。",
    "longExplanation": "「～としたら」は、ある事柄や状況を事実として頭の中で仮定・想定し、「もし〜という前提が成り立つなら」「仮に〜という事態が起きるとすれば」という枠組みのもとで、後件において判断、推量、あるいは対策・意見などを述べる際に用いられます。一般的な条件表現「〜たら」に比べ、話し手が仮定の前提条件を意識的に設定するニュアンスが強く出ます。",
    "formation": "動詞普通形 ＋ としたら ｜ い形容詞 ＋ としたら ｜ な形容詞 ＋ だとしたら ｜ 名詞 ＋ だとしたら",
    "examples": [
      {
        "translation": "明日雨が降るとしたら、傘を持っていきましょう。"
      },
      {
        "translation": "このケーキが美味しくないとしたら、誰も食べないだろう。"
      },
      {
        "translation": "彼が病気だとしたら、早めに病院へ行かないといけません。"
      },
      {
        "translation": "彼女が学生だとしたら、このレストランは割引があるでしょう。"
      }
    ]
  },
  "ja_としても_98": {
    "title": "～としても (〜to shite mo)",
    "shortExplanation": "仮定の逆接・譲歩条件を提示し、「たとえ〜と仮定しても、後件の結論や意志・事実は揺らがない」ということを表し、「たとえ〜としても」「〜だとしても」という意味を表します。",
    "longExplanation": "「～としても」は、仮にその事態が真実であると譲歩・想定したとしても、後件で述べる話し手の強い意志、判断、あるいは客観的な結論が左右されたり覆ったりすることはないという確固たる態度を表します。「〜ても」に比べて「もしそうだと仮定した場合であっても」という仮定・前提の意識がより色濃く打ち出される表現です。",
    "formation": "動詞普通形 ＋ としても ｜ い形容詞 ＋ としても ｜ な形容詞 ＋ だとしても ｜ 名詞 ＋ だとしても",
    "examples": [
      {
        "translation": "雨が降るとしても、レースは中止しません。"
      },
      {
        "translation": "このケーキが美味しくないとしても、私は食べるつもりです。"
      },
      {
        "translation": "彼女が遅刻するとしても、私たちは待ち続けます。"
      },
      {
        "translation": "忙しいだとしても、友達との約束は守りたい。"
      }
    ]
  },
  "ja_とともに_99": {
    "title": "～と～ともに (〜to 〜tomoni)",
    "shortExplanation": "一方の変化に伴って他方も並行して変化していくことや、二つの事柄が同時に行われること、あるいは「〜と一緒に」を表す硬い表現です。",
    "longExplanation": "「～とともに（共に）」は、主に書き言葉や改まった場面で用いられる表現で、以下の主要な意味を持ちます。①一方の変化に比例・連動して他方も変化していくことを表す「〜に伴って／〜につれて（比例変化）」、②二つの事柄がほぼ同じ瞬間に生起することを表す「〜と同時に」、③人や事柄と行動を共にする「〜と一緒に」を表します。",
    "formation": "動詞辞書形 ＋ とともに ｜ 名詞 ＋ とともに ｜ い形容詞 ＋ とともに ｜ な形容詞（である） ＋ とともに",
    "examples": [
      {
        "translation": "彼が来るとともに、パーティーが始まりました。"
      },
      {
        "translation": "季節が変わるとともに、服のファッションも変わります。"
      },
      {
        "translation": "成長とともに、いろいろな経験を積むことが大切です。"
      },
      {
        "translation": "技術の進歩とともに、便利なアプリが増えています。"
      }
    ]
  },
  "ja_とは限らない_100": {
    "title": "～とは限らない (〜to wa kagiranai)",
    "shortExplanation": "一般的に当然と考えられている常識や予測が、100%常に当てはまるわけではないという「部分否定」を表し、「必ずしも〜とは言えない」「〜とは決まっていない」という意味を表します。",
    "longExplanation": "「～とは限らない」は、部分否定を表す代表的な構文です。世間一般の常識、思い込み、あるいは確率の高い推測に対して「例外もあり得る」「いつでも絶対にそうだとは断定できない」と慎重に述べる際に用いられます。「必ずしも」「いつも」「すべて」などの副詞と呼応して多用され、物事を決めつけずに柔軟な見方を示すニュアンスを持ちます。",
    "formation": "動詞普通形 ＋ とは限らない ｜ い形容詞 ＋ とは限らない ｜ な形容詞（だ） ＋ とは限らない ｜ 名詞（だ） ＋ とは限らない",
    "examples": [
      {
        "translation": "いつも勉強しているとは限らない。"
      },
      {
        "translation": "高い商品がいいとは限らない。"
      },
      {
        "translation": "彼が正しいとは限らない。"
      },
      {
        "translation": "雨が降るとは限らない。"
      }
    ]
  },
  "ja_ないことはない_101": {
    "title": "～ないことはない (〜nai koto wa nai)",
    "shortExplanation": "二重否定を用いて「絶対に〜ないとは言えない」「可能かと言われれば可能だ」と、控えめに消極的な肯定を表す表現です。",
    "longExplanation": "「～ないことはない」は、否定形に「〜ことはない」を重ねた二重否定の構文です。断定的な強い肯定を避け、「努力や条件次第ではできないわけではない」「可能性がゼロというわけではない」と消極的に肯定する際に用いられます。話し手の謙虚さや、少し含みを持たせた慎重な判断を表します。",
    "formation": "動詞ない形 ＋ ことはない ｜ い形容詞語幹 ＋ くないことはない ｜ な形容詞 ＋ でない／じゃないことはない ｜ 名詞 ＋ でない／じゃないことはない",
    "examples": [
      {
        "translation": "彼が来ないことはない。"
      },
      {
        "translation": "あの問題が解けないことはない。"
      },
      {
        "translation": "その仕事が難しくないことはない。"
      },
      {
        "translation": "彼女が正しくないことはない。"
      }
    ]
  },
  "ja_ないこともない_102": {
    "title": "～ないこともない (〜nai koto mo nai)",
    "shortExplanation": "「絶対にできないというわけではないが…」と消極的に可能性を認めつつも、ためらいや難色、気乗りしないニュアンスを込めて述べる表現です。",
    "longExplanation": "「～ないこともない」は、助詞「も」が加わることで、「～ないことはない」よりもさらにためらいや消極的な態度、あるいは「どうしてもと言うならできなくもないが、あまり気は進まない」という含みを持たせた表現です。後件には「〜が」「〜けれど」などの逆接表現が続き、気が進まない理由や困難な事情が付け加えられるのが極めて自然です。",
    "formation": "動詞ない形 ＋ こともない ｜ い形容詞語幹 ＋ くないこともない ｜ な形容詞 ＋ でない／じゃないこともない ｜ 名詞 ＋ でない／じゃないこともない",
    "examples": [
      {
        "translation": "この問題は解けないこともないけど、難しいです。"
      },
      {
        "translation": "彼に会わないこともないが、あまり話す時間がない。"
      },
      {
        "translation": "お金がないこともないけれど、節約した方がいい。"
      },
      {
        "translation": "このゲームが面白くないこともないが、他のゲームの方が楽しい。"
      }
    ]
  },
  "ja_ないではいられない_103": {
    "title": "～ないではいられない (〜nai de wa irarenai)",
    "shortExplanation": "感情や衝動、生理的な欲求などが抑えられず、自然と〜してしまうことを表し、「どうしても〜せずにはいられない」「〜することを抑えられない」という意味を表します。",
    "longExplanation": "「～ないではいられない」（口語では「〜ないじゃいられない」）は、動詞のない形に接続し、話し手の抑えきれない感情や強い衝動、やむを得ない欲求によって「どうしても〜してしまう」「〜せずには我慢できない」という状態を表す表現です。理屈や意志の力では感情や行動をコントロールできないニュアンスを含みます。原則として話し手自身の感情や行動について述べますが、三人称を主語にする場合は「〜ようだ」「〜らしい」などの推量表現を伴うのが一般的です。",
    "formation": "動詞ない形 ＋ ではいられない／じゃいられない（「する」は「しないではいられない」または「せずにはいられない」）",
    "examples": [
      {
        "translation": "この映画はとても感動的で、泣かないではいられなかった。"
      },
      {
        "translation": "彼女の笑顔を見ると、笑わないではいられない。"
      },
      {
        "translation": "この部屋はとても寒いので、震えないではいられない。"
      },
      {
        "translation": "彼の話はつまらないが、聞かないではいられない。"
      }
    ]
  },
  "ja_ながら_104": {
    "title": "～ながら (〜nagara)",
    "shortExplanation": "同一の主語が二つの動作を並行して同時に行うことを表し、「〜しながら」という意味を表します。",
    "longExplanation": "「～ながら」は動詞の連用形（ます形語幹）に接続し、一人の人物が二つの動作を同時並行して行うことを表す文型です（「〜しながら」）。この文型では、「ながら」の前に来る動詞が副次的・付随的な動作を表し、後ろに来る述語が主たる中心的な動作を表します。",
    "formation": "動詞ます形語幹 ＋ ながら",
    "examples": [
      {
        "translation": "テレビを見ながら宿題をしています。"
      },
      {
        "translation": "彼女は歌いながら料理を作っていました。"
      },
      {
        "translation": "電車の中で立ちながら本を読んでいる人が多いです。"
      },
      {
        "translation": "僕は歩きながらスマホを使っています。"
      }
    ]
  },
  "ja_にあたり_105": {
    "title": "～にあたり (〜ni atari)",
    "shortExplanation": "新しいことや重要な節目・行事を始める・迎える機会に際して述べる表現で、「〜に際して」「〜を迎えるにあたって」という意味を表します。",
    "longExplanation": "「～にあたり」（または「～にあたって」）は、名詞や動詞の辞書形に接続し、入学、結婚、開業、新年など、人生や事業における特別な節目や重要な出来事・行事を迎えたり始めたりする重要なタイミングを表す改まった表現です。後続の文には、その機会に向けた心構え、挨拶、準備すべき事項、決意などが続きます。式典のスピーチや公式文書、ビジネスレターなどで頻繁に用いられます。",
    "formation": "名詞 ＋ にあたり／にあたって ｜ 動詞辞書形 ＋ にあたり／にあたって",
    "examples": [
      {
        "translation": "入学にあたり、必要な書類を準備してください。"
      },
      {
        "translation": "新年にあたり、抱負を立てる人が多いです。"
      },
      {
        "translation": "結婚にあたり、両家は大切な儀式を行います。"
      },
      {
        "translation": "新しい仕事を始めるにあたり、準備が必要です。"
      }
    ]
  },
  "ja_において_106": {
    "title": "～において (〜ni oite)",
    "shortExplanation": "動作や出来事が行われる場所、時代、分野、状況などを表す硬い表現で、「〜で」「〜において」という意味を表します。",
    "longExplanation": "「～において」は名詞に接続し、助詞「で」や「に」に相当する改まった書き言葉の文型です。出来事や行為が展開する場所、時代、領域、状況、観点などを客観的かつ厳粛に提示する際に用いられます（「〜で」「〜の分野で」）。後続の名詞を修飾する際には「～における＋名詞」の形をとります。ニュース報道、論文、公的文書、式典のスピーチなどの改まった場面で多用されます。",
    "formation": "名詞 ＋ において（名詞修飾形：名詞 ＋ における ＋ 名詞）",
    "examples": [
      {
        "translation": "この大学において、英語のクラスが一番人気があります。"
      },
      {
        "translation": "彼の研究において新しい発見がありました。"
      },
      {
        "translation": "運動会において、彼は大活躍しました。"
      },
      {
        "translation": "環境問題においては、みんなが責任を持って行動すべきです。"
      }
    ]
  },
  "ja_にかかわらず_107": {
    "title": "～にかかわらず (〜ni kakawarazu)",
    "shortExplanation": "前の条件や状況、差異などに左右・影響されることなく、後の事柄が成立することを表し、「〜に関係なく」「〜を問わず」という意味を表します。",
    "longExplanation": "「～にかかわらず」（漢字表記では「～に関わらず」）は、動詞、形容詞、名詞に接続し、前項で示された条件や事態、区別などに一切影響を受けることなく、後項の行為や状態が一様に成立することを表す文型です（「〜に関係なく」「〜を問わず」）。前項には、対立する概念（有無、良し悪し、するかしないかなど）や、幅や変化を含む名詞（天候、年齢、性別、国籍など）がよく用いられます。",
    "formation": "動詞辞書形／ない形 ＋ にかかわらず ｜ い形容詞 ＋ にかかわらず ｜ な形容詞（または である） ＋ にかかわらず ｜ 名詞 ＋ にかかわらず",
    "examples": [
      {
        "translation": "天気にかかわらず、今日の試合は行われます。"
      },
      {
        "translation": "彼は年齢にかかわらず、新しいことを学び続けています。"
      },
      {
        "translation": "その仕事が難しいかどうかにかかわらず、彼女は努力し続けた。"
      },
      {
        "translation": "経験の有無にかかわらず、このプログラムは誰でも利用できます。"
      }
    ]
  },
  "ja_にかけては_108": {
    "title": "～にかけては (〜ni kakete wa)",
    "shortExplanation": "ある特定の分野や技術、能力において人並み外れて優れていることを強調して表し、「〜のことに関しては」「〜の腕前では」という意味を表します。",
    "longExplanation": "「～にかけては」は名詞に接続し、ある特定の技術、能力、知識、専門分野などを取り上げ、「その方面においては誰よりも優れている」「他に引けを取らない」と高く評価・強調する文型です。後続の文には「誰にも負けない」「一番詳しい」「得意だ」といった、能力の高さや自信を肯定的に評価する表現が来ることが特徴です。",
    "formation": "名詞 ＋ にかけては",
    "examples": [
      {
        "translation": "料理の腕前にかけては、彼女は誰にも負けません。"
      },
      {
        "translation": "この町にかけては、彼の店が一番おいしいラーメンを売っています。"
      },
      {
        "translation": "音楽の知識にかけては、彼は私たちの中で一番詳しいです。"
      },
      {
        "translation": "スポーツにかけては、彼はどんな競技も得意です。"
      }
    ]
  },
  "ja_にしたがって_109": {
    "title": "～にしたがって (〜ni shitagatte)",
    "shortExplanation": "①一方の変化に伴って他方も次第に変化していくこと（「〜するにつれて」「〜に伴って」）、または②規則や指示・順序にそのまま従うこと（「〜のとおりに」）を表します。",
    "longExplanation": "「～にしたがって」は、動詞の辞書形や名詞に接続し、主に二つの用法を持ちます。第一に、一方の事態が変化・進行するのに応じて、もう一方の事態も連動して次第に変化していく比例的な相関関係を表します（「〜につれて」「〜とともに」）。第二に、指示、規則、方針、計画などに忠実に順応・準拠して行動することを表します（「〜の指示通りに」「〜に従順に」）。",
    "formation": "動詞辞書形 ＋ にしたがって ｜ 名詞 ＋ にしたがって",
    "examples": [
      {
        "translation": "成長にしたがって、この植物の葉が大きくなります。"
      },
      {
        "translation": "説明書にしたがって、家具を組み立ててください。"
      },
      {
        "translation": "年齢にしたがって、人の体力は低下します。"
      },
      {
        "translation": "運動にしたがって、心拍数が増加することが一般的です。"
      }
    ]
  },
  "ja_にしたら_110": {
    "title": "～にしたら (〜ni shitara)",
    "shortExplanation": "ある人物の立場や境遇に身を置いて考えたり、心情を推測したりする際に用い、「〜の立場からすれば」「〜にとっては」という意味を表します。",
    "longExplanation": "「～にしたら」（同義表現として「〜にすれば」「〜にしてみれば」）は、人物を表す名詞や代名詞に接続し、その人の立場や状況に身を置き換えて考え、相手がどのように感じ、考えているかを推し量る文型です（「〜の立場から見れば」「〜にとってみれば」）。後続の文には、「〜だろう」「〜かもしれない」などの推量や判断を表す表現がよく用いられます。",
    "formation": "名詞 ＋ にしたら ｜ 代名詞 ＋ にしたら",
    "examples": [
      {
        "translation": "彼にしたら、早く帰りたいだろう。"
      },
      {
        "translation": "子供たちにしたら、この話はつまらないかもしれない。"
      },
      {
        "translation": "私にしたら、そのプレゼントは素晴らしいと思います。"
      },
      {
        "translation": "彼女にしたら、この映画が好きではないでしょう。"
      }
    ]
  },
  "ja_にしろにしろ_111": {
    "title": "～にしろ～にしろ (〜ni shiro 〜ni shiro)",
    "shortExplanation": "対照的・並列的な二つの例を挙げ、どちらの場合であっても結論や状況に変わりがないことを表し、「〜にしても〜にしても」「〜であれ〜であれ」という意味を表します。",
    "longExplanation": "「～にしろ～にしろ」（改まった表現では「〜にせよ〜にせよ」）は、動詞、形容詞、名詞に接続し、対立する二つの選択肢や代表的な例を並べて、「どちらの場合であっても」「AであってもBであっても」後の事柄や話し手の判断・態度・結論には何の影響もなく同一であることを表す文型です。後続の文には、助言、決定、判断、促しなどが続くことが多いです。",
    "formation": "動詞普通形 ＋ にしろ ｜ い形容詞 ＋ にしろ ｜ な形容詞（または である） ＋ にしろ ｜ 名詞（または である） ＋ にしろ",
    "examples": [
      {
        "translation": "行くにしろ行かないにしろ、早く決めてください。"
      },
      {
        "translation": "彼が来るにしろ来ないにしろ、パーティーは始めましょう。"
      },
      {
        "translation": "雨が降るにしろ降らないにしろ、傘を持って行ったほうがいいです。"
      },
      {
        "translation": "このレストランが高いにしろ安いにしろ、料理は美味しいです。"
      }
    ]
  },
  "ja_につけにつけ_112": {
    "title": "～につけ～につけ (〜ni tsuke 〜ni tsuke)",
    "shortExplanation": "対照的・並列的な事柄を挙げ、どちらの場合においても自然と同じ感情や感慨が湧き起こることを表し、「〜のときも〜のときも」「〜につけても〜につけても」という意味を表します。",
    "longExplanation": "「～につけ～につけ」は、動詞、形容詞、名詞に接続し、対照的な二つの事態（良し悪し、悲喜、春秋など）を例示して、「そのどちらの場合においても、いつも決まって同様の感情・感慨・思いが心の中に湧き起こる」ことを表す文型です。後続節には、心の中に自然と生じる感情、感慨、回想などを表す表現が続くことが典型的です。",
    "formation": "動詞普通形 ＋ につけ ｜ い形容詞 ＋ につけ ｜ な形容詞 ＋ につけ ｜ 名詞 ＋ につけ",
    "examples": [
      {
        "translation": "外国へ行くにつけ、勉強するにつけ、言葉の壁にぶつかる。"
      },
      {
        "translation": "彼と話すにつけ、彼が考えるにつけ、彼の知識に驚かされる。"
      },
      {
        "translation": "この公園で遊ぶにつけ、散歩するにつけ、子供時代を思い出す。"
      },
      {
        "translation": "春につけ、秋につけ、彼は母校を訪れる。"
      }
    ]
  },
  "ja_につれて_113": {
    "title": "～につれて (〜ni tsurete)",
    "shortExplanation": "一方の事態が時間の経過や程度に応じて変化・進行するのに伴って、他方も自然に連動して変化していくことを表し、「〜するのに伴ってだんだんと」「〜とともに」という意味を表します。",
    "longExplanation": "「～につれて」は動詞の辞書形や名詞に接続し、前項が時間とともに変化・進行していくプロセスに応じて、後項もそれに比例するように自然と変化していく様子を表す文型です（「〜するに従って次第に」）。前項には「近づく」「増える」「年をとる」など、時間的推移や段階的な変化を表す動詞がよく用いられ、人為的な命令や意志ではなく自然な推移・変化を表します。",
    "formation": "動詞辞書形 ＋ につれて ｜ 名詞 ＋ につれて",
    "examples": [
      {
        "translation": "年を取るにつれて、健康に気をつけなければなりません。"
      },
      {
        "translation": "春が近づくにつれて、気温が上がる。"
      },
      {
        "translation": "勉強するにつれて、だんだん分かるようになる。"
      },
      {
        "translation": "経験が増えるにつれて、自信もついてくる。"
      }
    ]
  },
  "ja_にともなって_114": {
    "title": "～にともなって (〜ni tomonatte)",
    "shortExplanation": "ある事態や変化が起こるのに伴い、別の事態が同時に生じたり結果として引き起こされたりすることを表し、「〜に伴って」「〜とともに」という意味を表します。",
    "longExplanation": "「～にともなって」（漢字表記では「〜に伴って」）は、名詞や動詞の普通形に接続し、大規模な変化、社会現象、重大な出来事などが生じることと連動して、別の事態が付随的に発生したり影響が波及したりする因果的・伴随的関係を表す硬い表現です。主に社会、経済、自然環境などのマクロな変化について論じるニュースや論文、公式な報告書などでよく用いられます。",
    "formation": "名詞 ＋ にともなって ｜ 動詞普通形 ＋ にともなって",
    "examples": [
      {
        "translation": "人口が増えるにともなって、交通渋滞も悪化しています。"
      },
      {
        "translation": "季節の変わり目にともなって、体調を崩しやすくなります。"
      },
      {
        "translation": "経済の成長にともなって、雇用の機会も増えるでしょう。"
      },
      {
        "translation": "彼の昇進にともなって、引っ越しをすることになりました。"
      }
    ]
  },
  "ja_にほかならない_115": {
    "title": "～にほかならない (〜ni hoka naranai)",
    "shortExplanation": "ある事柄の理由や本質がまさにそれであり、それ以外の何物でもないと強く断定して表し、「まさに〜である」「〜以外の何物でもない」という意味を表します。",
    "longExplanation": "「～にほかならない」（漢字表記では「〜に他ならない」）は、名詞や普通形に接続し、話し手がある事態や結果の根本的な理由・原因・本質を「それ以外の何物でもなく、まさにそれである」と強い確信をもって断定的に述べる表現です。論説文、意見表明、演説などで自らの強い主張や結論を強調する際に用いられる硬い文型です。",
    "formation": "名詞 ＋ にほかならない ｜ 動詞普通形 ＋ （から）にほかならない ｜ い形容詞 ＋ （から）にほかならない ｜ な形容詞 ＋ である（から）にほかならない",
    "examples": [
      {
        "translation": "彼の成功は努力にほかならない。"
      },
      {
        "translation": "この痛みは寒さにほかならない。"
      },
      {
        "translation": "彼の失敗の原因は慢心にほかならない。"
      },
      {
        "translation": "彼女の笑顔は明るさにほかならない。"
      }
    ]
  },
  "ja_にもかかわらず_116": {
    "title": "～にもかかわらず (〜ni mo kakawarazu)",
    "shortExplanation": "前項の状況や事実から当然予想されることとは正反対の結果が生じることを表し、「〜であるのに」「〜という悪条件にも負けず」という意味を表します。",
    "longExplanation": "「～にもかかわらず」（漢字表記では「〜にも関わらず」）は、動詞、形容詞、名詞に接続し、前項で示された事実や状況（障害や悪条件など）があるにもかかわらず、そこから当然予想される結果とは相容れない意外な事態や行動が後項で生じることを表す逆接の文型です（「〜なのに」「〜という状況下であっても」）。口語の「〜のに」に比べて改まった硬い文章語として使われます。",
    "formation": "動詞普通形 ＋ にもかかわらず ｜ い形容詞 ＋ にもかかわらず ｜ な形容詞／名詞 ＋ であるにもかかわらず（または 名詞 ＋ にもかかわらず）",
    "examples": [
      {
        "translation": "忙しいにもかかわらず、彼は毎日運動しています。"
      },
      {
        "translation": "雨が降っているにもかかわらず、彼女は散歩に行きました。"
      },
      {
        "translation": "車が古いにもかかわらず、まだよく走ります。"
      },
      {
        "translation": "結果が良くないにもかかわらず、彼は頑張り続けました。"
      }
    ]
  },
  "ja_により_117": {
    "title": "～により (〜ni yori)",
    "shortExplanation": "原因・理由、手段・方法、根拠、受身文の動作主などを表す改まった表現で、「〜によって」「〜が原因で」「〜の方法で」という意味を表します。",
    "longExplanation": "「～により」（または「〜によって」）は名詞に接続し、多様な客観的事態を格調高く説明する書き言葉の文型です。主な用法として、①事故や事態を引き起こした原因・理由（「〜が原因で」）、②目標達成のための手段・方法・媒介（「〜の方法で」「〜を通じて」）、③判断や決定の基準・根拠（「〜を根拠として」）、④受身文における創作・発見などの動作主（「〜の手によって」）などがあります。後続の名詞を修飾する場合は「～による＋名詞」となります。",
    "formation": "名詞 ＋ により（名詞修飾形：名詞 ＋ による ＋ 名詞）",
    "examples": [
      {
        "translation": "この事故は運転手の不注意により起こりました。"
      },
      {
        "translation": "その映画は小説により制作されました。"
      },
      {
        "translation": "犯人は警察により逮捕されました。"
      },
      {
        "translation": "会社の成長は従業員の努力により実現しました。"
      }
    ]
  },
  "ja_にわたって_118": {
    "title": "～にわたって (〜ni watatte)",
    "shortExplanation": "ある行為や現象が時間的な長さ、空間的な広がり、または規模や回数などの広範囲全体に及んでいることを表し、「〜の期間ずっと」「〜の範囲全体に及んで」という意味を表します。",
    "longExplanation": "「～にわたって」（名詞を修飾するときは「〜にわたる＋名詞」、改まった表現では「〜にわたり」）は、時間・期間、場所・空間、回数、範囲などを表す名詞に接続し、その範囲全体・期間全体に及んで事態が続いていることや広がっていることを強調する文型です。規模や範囲が広大・長期であることを表す場合によく用いられ、ニュースや論説文などの公的な場面でも頻繁に使われます。",
    "formation": "名詞 ＋ にわたって（連体修飾：名詞 ＋ にわたる ＋ 名詞）",
    "examples": [
      {
        "translation": "彼女は一年にわたって日本語を勉強しました。"
      },
      {
        "translation": "このプロジェクトは50キロにわたって道路を建設します。"
      },
      {
        "translation": "彼の著作は数多くの国にわたって読まれている。"
      },
      {
        "translation": "その秘密は世代にわたって保たれ続けた。"
      }
    ]
  },
  "ja_に先立ち_119": {
    "title": "～に先立ち (〜ni sakidachi)",
    "shortExplanation": "何か重要な行事や行動を始める前に、それに先立って準備や関連する行為を行うことを表し、「〜の前に」「〜に先立って」という意味を表します。",
    "longExplanation": "「～に先立ち」（「〜に先立って」とも言い、名詞を修飾するときは「〜に先立つ＋名詞」）は、名詞や動詞の辞書形に接続し、重要な事業、会議、出発、式典などを始める前にあらかじめ準備や必要な行為をしておくことを表す改まった表現です。ビジネスの場や公的な行事、公式アナウンスなどで広く使用されます。",
    "formation": "名詞 ＋ に先立ち／に先立って ｜ 動詞辞書形 ＋ に先立ち／に先立って（連体修飾：名詞／動詞辞書形 ＋ に先立つ ＋ 名詞）",
    "examples": [
      {
        "translation": "会議に先立ち、資料を確認しましょう。"
      },
      {
        "translation": "出発に先立ち、荷物を整理しました。"
      },
      {
        "translation": "就寝に先立ち、歯を磨きます。"
      },
      {
        "translation": "映画の上映に先立ち、予告編が放映されます。"
      }
    ]
  },
  "ja_に反して_120": {
    "title": "～に反して (〜ni hanshite)",
    "shortExplanation": "事態や結果が事前の予想・期待・意図や規則などと食い違っていることを表し、「〜と反対に」「〜に逆らって」という意味を表します。",
    "longExplanation": "「～に反して」（名詞を修飾するときは「〜に反する＋名詞」、改まった文章語では「〜に反し」）は、「予想」「期待」「意図」「規則」「命令」などの名詞に接続し、実際の結果や行われた行為がそれらの予測や規範と正反対であること、または背いていることを表す文型です。",
    "formation": "名詞 ＋ に反して／に反し（連体修飾：名詞 ＋ に反する ＋ 名詞）",
    "examples": [
      {
        "translation": "天気予報に反して、今日は雨が降っている。"
      },
      {
        "translation": "彼の予想に反して、試合に勝った。"
      },
      {
        "translation": "両親の意見に反して、彼と結婚した。"
      },
      {
        "translation": "この映画は批評家の評価に反して大ヒットした。"
      }
    ]
  },
  "ja_に基づいて_121": {
    "title": "～に基づいて (〜ni motozuite)",
    "shortExplanation": "ある事柄・基準・データ・法令などを確かな根拠や基礎として行動や判断を行うことを表し、「〜を根拠として」「〜をもとにして」という意味を表します。",
    "longExplanation": "「～に基づいて」（名詞を修飾するときは「〜に基づく＋名詞」または「〜に基づいた＋名詞」、公的な文章語では「〜に基づき」）は、法律、基本方針、調査結果、データ、事実などの名詞に接続し、それを判断や行動の確かな拠り所・基準として物事を行うことを表す文型です。客観的な根拠や裏付けがあることを示す改まった表現です。",
    "formation": "名詞 ＋ に基づいて／に基づき（連体修飾：名詞 ＋ に基づく／に基づいた ＋ 名詞）",
    "examples": [
      {
        "translation": "研究結果に基づいて、新しい治療法が開発されました。"
      },
      {
        "translation": "法律に基づいて、犯罪者は逮捕されました。"
      },
      {
        "translation": "そのデータに基づいて、結論を出すことができます。"
      },
      {
        "translation": "お客様の要望に基づいて、商品の改善が行われます。"
      }
    ]
  },
  "ja_に対して_122": {
    "title": "～に対して (〜ni taishite)",
    "shortExplanation": "動作や態度、感情が向けられる対象を表す用法（「〜に向かって」「〜を相手として」）と、二つの物事の対比・対照を表す用法（「〜である一方」「〜と比べて」）があります。",
    "longExplanation": "「～に対して」（名詞を修飾するときは「〜に対する＋名詞」、文章語では「〜に対し」）には主に二つの用法があります。一つは、人や物事、意見などに向ける態度や働きかけの対象を表す場合（「〜に向けて」「〜を対象として」）です。もう一つは、二つの対照的な事実や状況を並べて比較・対比する場合（「Aであるのに対してBは…」）です。文脈に応じて対象か対比かを判断します。",
    "formation": "名詞 ＋ に対して／に対し（連体修飾：名詞 ＋ に対する ＋ 名詞）｜ 普通形（な形容詞語幹＋な／である ｜ 名詞＋な／である）＋ のに対して",
    "examples": [
      {
        "translation": "日本の文化に対して尊敬の念を持っています。"
      },
      {
        "translation": "彼に対して無礼な態度を取らないでください。"
      },
      {
        "translation": "先生の質問に対して、彼女はすぐに答えました。"
      },
      {
        "translation": "男性に対して、女性は同じ仕事でも低い給料をもらっている。"
      }
    ]
  },
  "ja_に応えて_123": {
    "title": "～に応えて (〜ni kotaete)",
    "shortExplanation": "相手の期待・要望・要請・声援などに添うように行動することを表し、「〜に報いて」「〜に添って」という意味を表します。",
    "longExplanation": "「～に応えて」（名詞を修飾するときは「〜に応える＋名詞」、改まった文章語では「〜に応え」）は、「期待」「要望」「要請」「声」「アンコール」などの名詞に接続し、周りからの働きかけや希望を満足させるように、それに応じる行動をとることを表す文型です。相手の望みや社会的な要求に積極的に報いるニュアンスを含みます。",
    "formation": "名詞 ＋ に応えて／に応え（連体修飾：名詞 ＋ に応える ＋ 名詞）",
    "examples": [
      {
        "translation": "お客様の要望に応えて、新しいメニューを作りました。"
      },
      {
        "translation": "彼はチームの期待に応えて素晴らしいプレーを見せた。"
      },
      {
        "translation": "政府は国民の声に応えて、新しい法律を制定した。"
      },
      {
        "translation": "企業は環境問題に応えて、環境に優しい製品を開発している。"
      }
    ]
  },
  "ja_に応じて_124": {
    "title": "～に応じて (〜ni oujite)",
    "shortExplanation": "前にある条件・変化・段階・希望などに合わせて、それに見合うように対応を変えることを表し、「〜に合わせて」「〜に見合って」という意味を表します。",
    "longExplanation": "「～に応じて」（名詞を修飾するときは「〜に応じた＋名詞」、改まった文章語では「〜に応じ」）は、変化するものや幅のある名詞（年齢、収入、天候、能力、希望など）に接続し、その条件や状況の変化・差異に合わせて後ろの事柄や対応を相応しく調整・変化させることを表す文型です。",
    "formation": "名詞 ＋ に応じて／に応じ（連体修飾：名詞 ＋ に応じた ＋ 名詞）",
    "examples": [
      {
        "translation": "仕事の量に応じて給料が変わります。"
      },
      {
        "translation": "季節に応じて服装を選びましょう。"
      },
      {
        "translation": "お客様の希望に応じてプランを提案します。"
      },
      {
        "translation": "年齢に応じて健康診断項目が異なります。"
      }
    ]
  },
  "ja_に決まっている_125": {
    "title": "～に決まっている (〜ni kimatte iru)",
    "shortExplanation": "話し手が主観的な強い確信や直感に基づいて「絶対に〜だ」「〜に違いない」と断定することを表します。",
    "longExplanation": "「～に決まっている」は、動詞・形容詞・名詞の普通形に接続し（な形容詞や名詞は「だ」をつけずに接続することが多い）、客観的な証拠の有無にかかわらず、話し手の主観や経験から「どう考えても絶対にそうだ」「他にはあり得ない」と強く思い込んで断定する表現です。親しい間柄の日常会話でよく使われます。",
    "formation": "動詞普通形 ＋ に決まっている ｜ い形容詞 ＋ に決まっている ｜ な形容詞語幹 ＋ に決まっている ｜ 名詞 ＋ に決まっている",
    "examples": [
      {
        "translation": "こんなに暑い日に運動したら、汗をかくに決まっている。"
      },
      {
        "translation": "彼が試験に落ちたら、がっかりするに決まっている。"
      },
      {
        "translation": "彼女はいつも遅れるから、今日も遅れるに決まっている。"
      },
      {
        "translation": "このゲームは楽しいに決まっている。"
      }
    ]
  },
  "ja_に沿って_126": {
    "title": "～に沿って (〜ni sotte)",
    "shortExplanation": "道路や川などの細長い線に並行して進むこと（「〜に沿いながら」）や、基準・方針・規則・計画などから外れないように従うこと（「〜に従って」「〜通りに」）を表します。",
    "longExplanation": "「～に沿って」（名詞を修飾するときは「〜に沿う＋名詞」または「〜に沿った＋名詞」、改まった文章語では「〜に沿い」）は名詞に接続します。空間的な意味では川や海岸、通りなどの細長い実体に並行して移動することを表し、抽象的な意味では規則、マニュアル、方針、計画、相手の希望などの基準に忠実に従って行動することを表します。",
    "formation": "名詞 ＋ に沿って／に沿い（連体修飾：名詞 ＋ に沿う／に沿った ＋ 名詞）",
    "examples": [
      {
        "translation": "川に沿って歩いていくと、橋が見えてきます。"
      },
      {
        "translation": "このレシピに沿って料理を作れば、間違いありません。"
      },
      {
        "translation": "規則に沿って行動しなければなりません。"
      },
      {
        "translation": "山道に沿って進むと、小さな神社があります。"
      }
    ]
  },
  "ja_に過ぎない_127": {
    "title": "～に過ぎない (〜ni suginai)",
    "shortExplanation": "程度や価値が高くなく、ただそれだけのことであることを表し、「ただの〜だ」「〜にすぎない」「それ以上のものではない」という意味を表します。",
    "longExplanation": "「～に過ぎない」は、動詞・形容詞・名詞の普通形に接続し（名詞やな形容詞は「だ」を省いてそのまま、または「である」をつけて接続）、物事の評価や程度が世間で思われているほど大したものではなく、ただその枠内に収まっているにすぎないことを客観的または控えめに述べる文型です。過大評価を否定するニュアンスを持ちます。",
    "formation": "動詞普通形 ＋ に過ぎない ｜ い形容詞 ＋ に過ぎない ｜ な形容詞語幹（／である）＋ に過ぎない ｜ 名詞（／である）＋ に過ぎない",
    "examples": [
      {
        "translation": "彼の失敗はミスに過ぎない。"
      },
      {
        "translation": "この試験は簡単な問題に過ぎない。"
      },
      {
        "translation": "彼女は友達に過ぎない。"
      },
      {
        "translation": "その発言は冗談に過ぎない。"
      }
    ]
  },
  "ja_に関わって_128": {
    "title": "～に関わって (〜ni kakawatte)",
    "shortExplanation": "ある事柄に関係したり影響を及ぼしたりしていることを表し、「〜に関係して」「〜に携わって」「〜に関係を持って」という意味を表します。",
    "longExplanation": "「～に関わって」（名詞を修飾するときは「〜に関わる＋名詞」、改まった文章語では「〜に関わり」）は名詞に接続し、その事柄や事件・事業に直接関係していることや参加・関与していることを表す文型です。また、命や名誉、将来など重大な事態に重大な影響や責任が及ぶ文脈でも用いられます。",
    "formation": "名詞 ＋ に関わって／に関わり（連体修飾：名詞 ＋ に関わる ＋ 名詞）",
    "examples": [
      {
        "translation": "試験の内容に関わって、先生に質問があります。"
      },
      {
        "translation": "このプロジェクトに関わって、意見があれば、遠慮なく言ってください。"
      },
      {
        "translation": "健康に関わって、食生活はとても重要です。"
      },
      {
        "translation": "その事件に関わって、彼も少し疑われています。"
      }
    ]
  },
  "ja_に限り_129": {
    "title": "～に限り (〜ni kagiri)",
    "shortExplanation": "特定の対象・日時・条件だけに限定して例外的に扱うことを表し、「〜だけ特別に」「〜に限定して」という意味を表します。",
    "longExplanation": "「～に限り」（文末で言い切る形は「〜に限る」）は名詞に接続し、案内文、規則、広告などで、特別な待遇や条件の適用をその対象・資格・期間だけに厳密に限定することを表す改まった表現です。「それ以外には適用されない」という例外性・限定性を明示します。",
    "formation": "名詞 ＋ に限り（文末表現：名詞 ＋ に限る）",
    "examples": [
      {
        "translation": "今日に限り、この商品が半額です。"
      },
      {
        "translation": "このクーポンはこの店に限り有効です。"
      },
      {
        "translation": "会員に限り、無料でこのサービスを利用できます。"
      },
      {
        "translation": "この特典は先着10名に限ります。"
      }
    ]
  },
  "ja_に際して_130": {
    "title": "～に際して (〜ni saishite)",
    "shortExplanation": "特別な出来事や重要な行事・行為を始めるタイミングを表し、「〜にあたって」「〜の時に」という意味を表します。",
    "longExplanation": "「～に際して」（名詞を修飾するときは「〜に際しての＋名詞」、改まった文章語では「〜に際し」）は、名詞や動詞の辞書形に接続し、卒業、結婚、留学、契約など、人生の節目や公式な重要行事を迎えるにあたって、挨拶や準備事項、注意事項などを述べる際に用いられる格式の高い表現です。",
    "formation": "名詞 ＋ に際して／に際し ｜ 動詞辞書形 ＋ に際して／に際し（連体修飾：名詞／動詞辞書形 ＋ に際しての ＋ 名詞）",
    "examples": [
      {
        "translation": "卒業式に際して、校長先生がスピーチをします。"
      },
      {
        "translation": "この仕事に際して、責任感が大切です。"
      },
      {
        "translation": "留学に際して、ビザの手続きが必要です。"
      },
      {
        "translation": "結婚式に際して、両親に感謝の気持ちを伝えました。"
      }
    ]
  },
  "ja_ねばならない_131": {
    "title": "～ねばならない (〜neba naranai)",
    "shortExplanation": "強い義務感や必要性から「どうしても〜しなければならない」という決意や使命感を表します。",
    "longExplanation": "「～ねばならない」（文語的表現として「〜ねばならぬ」とも言う）は、動詞の未然形（ない形から「ない」を除いた形）に接続し、「〜なければならない」の硬い文語的表現として用いられます（サ変動詞「する」は「せねばならない」となる）。強い使命感、義務、避けられない状況に対する個人の強い決意や主張を述べる際に使われます。",
    "formation": "動詞ない形（ないを除く） ＋ ねばならない（「する」は「せねばならない」）",
    "examples": [
      {
        "translation": "試験に合格するために、もっと勉強せねばならない。"
      },
      {
        "translation": "飛行機に間に合うためには、急がねばならない。"
      },
      {
        "translation": "６時までに帰らねばならない。"
      },
      {
        "translation": "この仕事を今日中に終わらせねばならない。"
      }
    ]
  },
  "ja_のみならずも_132": {
    "title": "～のみならず～も (〜nomi narazu 〜mo)",
    "shortExplanation": "それだけに留まらず、ほかの同種のものにも当てはまることを表し、「〜だけでなく〜も」「〜にとどまらず」という意味を表します。",
    "longExplanation": "「～のみならず～も」は、動詞・形容詞・名詞の普通形に接続し（名詞やな形容詞は語幹のまま、または「である」をつけて接続）、「〜だけでなく」の硬い文語的表現として用いられます。前件で述べた事柄や範囲だけに限定されず、さらに後件のような同類やそれ以上の事柄にも当てはまることを強調する表現です。スピーチや論説文などで好まれます。",
    "formation": "動詞普通形 ＋ のみならず（…も） ｜ い形容詞 ＋ のみならず（…も） ｜ な形容詞語幹（／である）＋ のみならず（…も） ｜ 名詞（／である）＋ のみならず（…も）",
    "examples": [
      {
        "translation": "彼は英語のみならず、フランス語も話せます。"
      },
      {
        "translation": "このレストランは美味しいのみならず、雰囲気も素晴らしいです。"
      },
      {
        "translation": "このアプリは便利のみならず、安全性も高いです。"
      },
      {
        "translation": "彼女は頭が良いのみならず、スポーツも得意です。"
      }
    ]
  },
  "ja_のももっともだ_133": {
    "title": "～のももっともだ (〜no mo mottomo da)",
    "shortExplanation": "ある状況や理由を考慮すれば、その行動や感情、結果などが極めて当然であり、十分に理解できることを表し、「〜のも当然だ」「〜のも無理はない」という意味を表します。",
    "longExplanation": "「～のももっともだ」（漢字では「尤も」）は、普通形＋「の」に接続し、その場の事情や背景となる理由から考えて、そうした感情を抱いたり行動を取ったり、あるいはその結果になることが極めて妥当で道理にかなっていることを表す文型です。「〜するのも当たり前だ」「〜なのも無理はない」と話し手が深く納得し、同調や共感を示す際に用いられます。",
    "formation": "動詞普通形 ＋ のももっともだ | い形容詞 ＋ のももっともだ | な形容詞語幹 ＋ なのももっともだ | 名詞 ＋ なのももっともだ",
    "examples": [
      {
        "translation": "彼が緊張するのももっともだ。"
      },
      {
        "translation": "この問題が難しいのももっともだ。"
      },
      {
        "translation": "彼女が幸せなのももっともだ。"
      },
      {
        "translation": "彼がリーダーなのももっともだ。"
      }
    ]
  },
  "ja_の上では_134": {
    "title": "〜の上では (〜no ue de wa)",
    "shortExplanation": "特定の観点や基準、理論、法律などの根拠に基づいて判断や評価を下すことを表し、「〜の点では」「〜の立場・基準から見れば」という意味を表します。",
    "longExplanation": "「〜の上では」は、名詞に接続し、議論や判断、評価の対象を特定の側面・観点・理論的根拠に限定して述べる表現です（「〜の観点からは」「〜の基準では」）。法律、書類、理論、計算上などの前提・基準を明示する際によく用いられ、「理論や形式上はそうであるが、実際の現実とは異なる場合もある」という対比の含みを持つこともあります。",
    "formation": "名詞 ＋ の上では",
    "examples": [
      {
        "translation": "効率の上では、この方法が最適です。"
      },
      {
        "translation": "法律の上では、彼の行為は違法ではありません。"
      },
      {
        "translation": "味の上では、このレストランは評価が高いです。"
      },
      {
        "translation": "成績の上では、彼はクラスで一番優秀です。"
      }
    ]
  },
  "ja_の下で_135": {
    "title": "～の下で (〜no shita de)",
    "shortExplanation": "ある人の指導、庇護、影響、支配などのもとで、または特定の自然条件や状況・雰囲気のもとで物事が行われることを表し、「〜の指導・影響を受けて」「〜という条件や環境の中で」という意味を表します。",
    "longExplanation": "「～の下で」（多くは「〜のもとで」と読まれます）は、主に名詞に接続し、影響力や権威を持つ人物の指導・管理・庇護・愛情などの恩恵や支配を受けながら物事が行われること、あるいは特定の環境条件や雰囲気の中で行動がなされることを表します（「〜の管理・指導のもとで」「〜という状況下で」）。",
    "formation": "名詞 ＋ の下で",
    "examples": [
      {
        "translation": "先生の下で勉強するのはとても楽しいです。"
      },
      {
        "translation": "晴天の下でピクニックをしましょう。"
      },
      {
        "translation": "緊張感の下で、彼女はスピーチに成功しました。"
      },
      {
        "translation": "親の愛情の下で、子供たちは幸せに育ちます。"
      }
    ]
  },
  "ja_ばかりかも_136": {
    "title": "～ばかりか〜も (〜bakari ka 〜 mo)",
    "shortExplanation": "「〜だけでなく、その上〜も」という意味で、前述の事柄にとどまらず、さらに別の事柄やそれ以上の程度が加わることを強調して表します。",
    "longExplanation": "「～ばかりか〜も」は、各品詞の普通形に接続し、「それだけでも十分な程度・状態であるのに、さらにそれにとどまらず別の要素まで加わる」という累加・添加のニュアンスを表す文型です（「〜だけでなく〜も」「〜のみならず〜さえ」）。後続の文節には助詞「も」のほか、「まで」や「さえ」などが呼応して用いられることが多く、予想以上であるという驚きや感嘆、呆れなどの気持ちが含まれます。",
    "formation": "動詞普通形 ＋ ばかりか…も | い形容詞 ＋ ばかりか…も | な形容詞語幹 ＋ な／である ＋ ばかりか…も | 名詞（＋ である） ＋ ばかりか…も",
    "examples": [
      {
        "translation": "彼はかわいいばかりか、賢くもある。"
      },
      {
        "translation": "このレストランは味が良いばかりかサービスも素晴らしいです。"
      },
      {
        "translation": "彼女は日本語が上手ばかりか英語も話せる。"
      },
      {
        "translation": "彼は歌が上手いばかりかダンスもうまい。"
      }
    ]
  },
  "ja_ばかりだ_137": {
    "title": "～ばかりだ (〜bakari da)",
    "shortExplanation": "動詞のて形や名詞に接続し、ある好ましくない行為を絶え間なく繰り返したり、特定の状態ばかりが続いていることを表し、「いつも〜ばかりしている」「〜ばかりである」という意味を表します。",
    "longExplanation": "「～ばかりだ」は、動詞のて形や名詞に接続することで、他のことをせず特定の好ましくない行動ばかりを何度も繰り返すことや、同じような不満・否定的な出来事・状態ばかりが占めている様子を表します（「〜してばかりいる」「〜だらけだ」）。話し手の不満、非難、呆れ、自嘲などのマイナスの気持ちを込めて使われることが多いです。（※なお、動詞辞書形に接続する場合は「悪い方向に変化が進む一方だ」という意味を表します）。",
    "formation": "動詞て形 ＋ ばかりだ／ばかりいる | 名詞 ＋ ばかりだ",
    "examples": [
      {
        "translation": "彼は文句を言ってばかりだ。"
      },
      {
        "translation": "この映画は面白くなくて、退屈してばかりだ。"
      },
      {
        "translation": "彼女は暇でいるばかりだ。"
      },
      {
        "translation": "最近、仕事の失敗ばかりだ。"
      }
    ]
  },
  "ja_ばかりに_138": {
    "title": "～ばかりに (〜bakari ni)",
    "shortExplanation": "そのことだけが原因となって、思わぬ悪い結果や不本意で残念な事態を招いてしまったことを表し、「〜したことだけが原因で」「〜したばっかりに」という意味を表します。",
    "longExplanation": "「～ばかりに」は、各品詞の普通形（な形容詞・名詞は「な／である」）に接続し、「ただそのことだけが直接の引き金となって、思いがけない好ましくない結果や大きな不利益を招いてしまった」という強い後悔、無念さ、恨みなどの気持ちを表す表現です。後続文には必ず望ましくない事態が述べられ、話し手の「〜さえしなければこんなことにはならなかったのに」というニュアンスが強く含まれます。",
    "formation": "動詞普通形（主にた形） ＋ ばかりに | い形容詞 ＋ ばかりに | な形容詞語幹 ＋ な／である ＋ ばかりに | 名詞 ＋ な／である ＋ ばかりに",
    "examples": [
      {
        "translation": "雨が降ったばかりに、試合が中止になりました。"
      },
      {
        "translation": "彼が遅れたばかりに、私たちも遅刻しました。"
      },
      {
        "translation": "忘れ物をしたばかりに、買い物に戻らなければなりません。"
      },
      {
        "translation": "彼女が美人なばかりに、みんなが彼女を羨んでいます。"
      }
    ]
  },
  "ja_ばというものでもない_139": {
    "title": "～ば～というものでもない (〜ba 〜to iu mono demo nai)",
    "shortExplanation": "前の条件が満たされたからといって、必ずしも後ろの結果になるわけではないという部分否定を表し、「〜すればそれでいいというわけではない」「必ずしも〜とは限らない」という意味を表します。",
    "longExplanation": "「～ば～というものでもない」（または「〜たら〜というものでもない」）は、ある条件を満たせば当然望ましい結果が得られると考えがちな一般的な見方に対して、「実際には必ずしもそうとは言い切れない」「それだけでは不十分である」と反論・釘を刺す際に用いる文型です。物事を一面だけで判断することへの戒めや、現実はそう単純ではないというニュアンスを含みます。",
    "formation": "動詞ば形 ＋ というものでもない | い形容詞（ければ） ＋ というものでもない | な形容詞・名詞（なら） ＋ というものでもない",
    "examples": [
      {
        "translation": "高いものがいいものばかりではない。"
      },
      {
        "translation": "英語ができれば、成功するというものでもない。"
      },
      {
        "translation": "見た目が美しいからといって、心も美しいというものでもない。"
      },
      {
        "translation": "有名大学に入れば、将来が安泰だというものでもない。"
      }
    ]
  },
  "ja_はともかくは_140": {
    "title": "～はともかく～は (〜wa tomokaku 〜wa)",
    "shortExplanation": "前述の事柄は今は問題にせずひとまず横に置いておき、後ろのより重要な事柄に焦点を当てて述べる表現で、「〜はさておき、〜は」「〜は別として、〜は」という意味を表します。",
    "longExplanation": "「～はともかく～は」（または「〜はともかくとして」）は、名詞に接続し、「前の要素については評価や議論をひとまず保留するが、後ろの要素についてははっきりと主張・強調したい」という場合に使われる文型です。前項には多少の難点や議論の余地がある事柄が置かれ、後項には確実に評価できる点や優先すべき重要な事柄が対比的に述べられます。",
    "formation": "名詞1 ＋ はともかく（として） ＋ 名詞2 ＋ は",
    "examples": [
      {
        "translation": "デザインはともかく、機能はこの携帯電話が一番です。"
      },
      {
        "translation": "彼の容姿はともかく、性格は素晴らしいです。"
      },
      {
        "translation": "料理の味はともかく、盛り付けは綺麗です。"
      },
      {
        "translation": "値段はともかく、このバッグの質は良いです。"
      }
    ]
  },
  "ja_はまだしも_141": {
    "title": "～はまだしも (〜wa mada shimo)",
    "shortExplanation": "前者の状況ならまだ我慢できたり許容できたりするが、後者の状況は度を越していて到底許せない・受け入れられないことを表し、「〜ならまだいいが」「〜ならまだ許せるが、〜は到底だめだ」という意味を表します。",
    "longExplanation": "「～はまだしも」（または「〜ならまだしも」）は、名詞や形式名詞「の」を伴う節に接続し、前の事態については「決して良くはないが、まだ許容の余地がある／我慢できる」と譲歩を示しつつ、それに対して後ろの事態は一層悪質・深刻であり「到底許容できない」「話にならない」と強い不満や批判を述べる文型です。",
    "formation": "名詞 ＋ はまだしも | 動詞・形容詞普通形 ＋ のはまだしも",
    "examples": [
      {
        "translation": "失敗するのはまだしも、やらないで後悔する方がつらい。"
      },
      {
        "translation": "このピザは野菜が少ないのはまだしも、味も悪い。"
      },
      {
        "translation": "たまに遅刻するのはまだしも、連絡もせずに遅刻するのは許せない。"
      },
      {
        "translation": "難しい質問に答えられないのはまだしも、簡単な質問にも答えられないのは問題だ。"
      }
    ]
  },
  "ja_はもとより_142": {
    "title": "～はもとより (〜wa moto yori)",
    "shortExplanation": "前述の事柄は言うまでもなく当然のことであり、その上さらに別の事柄も同様であることを表し、「〜はもちろんのこと、〜も」「〜は言うに及ばず〜も」という意味を表します。",
    "longExplanation": "「～はもとより」は、名詞に接続し、「前の事柄はわざわざ言うまでもなく当然の前提であるが、それに加えてさらに後ろの事柄も当てはまる」という累加を表す、改まった書き言葉の文型です。日常会話でよく使われる「〜はもちろん」に比べて硬く格式ばった響きを持ち、公式な挨拶文やスピーチ、論文などでよく用いられます。",
    "formation": "名詞1 ＋ はもとより（＋ 名詞2 ＋ も）",
    "examples": [
      {
        "translation": "英語はもとより、スペイン語も勉強しています。"
      },
      {
        "translation": "彼女は料理はもとより、お菓子作りも得意です。"
      },
      {
        "translation": "このホテルは部屋の清潔さはもとより、サービスも素晴らしいです。"
      },
      {
        "translation": "彼は音楽はもとより、絵も上手です。"
      }
    ]
  },
  "ja_は抜きにして_143": {
    "title": "～は抜きにして (〜wa nuki ni shite)",
    "shortExplanation": "通常なら含まれるはずの要素や条件を取り除き、それを除外して物事を考えたり評価したりすることを表し、「〜を除いて」「〜は横に置いて」という意味を表します。",
    "longExplanation": "「～は抜きにして」（または「〜を抜きにして」「〜抜きで」）は、名詞に接続し、本来あるべきものや通常考慮される事柄をあえて除外・省略して、本質的な部分を客観的に評価・議論したいときに用いる文型です（「〜を考慮に入れずに」「〜なしで」）。日常会話やビジネスでも「お世辞は抜きにして（お世辞抜きで）」「冗談は抜きにして」といった慣用的な言い回しとして非常によく使われます。",
    "formation": "名詞 ＋ は抜きにして／を抜きにして",
    "examples": [
      {
        "translation": "値段は抜きにして、味は美味しい。"
      },
      {
        "translation": "彼の性格は抜きにして、彼の実力は認めざるを得ない。"
      },
      {
        "translation": "デザインは抜きにして、この携帯電話の機能は優れています。"
      },
      {
        "translation": "運転の速さは抜きにして、彼女は親切で信頼できる運転手だ。"
      }
    ]
  },
  "ja_べきではない_144": {
    "title": "～べきではない (〜beki dewa nai)",
    "shortExplanation": "社会的な常識や道徳、良識、義務などに照らして「そうするべきではない」「してはならない」と判断・忠告する表現で、「〜しないのが当然だ」「〜してはならない」という意味を表します。",
    "longExplanation": "「～べきではない」は、動詞の辞書形に接続し、人間としての道徳心や社会通念、一般的な常識・ルールに照らし合わせて、「その行為をすることは間違っている」「道理として絶対にしてはならない」と強く主張したり忠告したりする文型です。個人の単なる希望や一時的な感情ではなく、客観的な正しさ・道理に基づいた判断を表します（※「する」は「するべきではない」のほかに「すべきではない」の形も非常によく使われます）。",
    "formation": "動詞辞書形 ＋ べきではない／べきではありません（※「する」は「するべきではない」または「すべきではない」）",
    "examples": [
      {
        "translation": "遅れる理由がないなら、遅れるべきではありません。"
      },
      {
        "translation": "子供に悪口を言うべきではありません。"
      },
      {
        "translation": "この薬は一度に飲みすぎるべきではない。"
      },
      {
        "translation": "知らない人と個人情報を共有するべきではない。"
      }
    ]
  },
  "ja_まい_145": {
    "title": "～まい (〜mai)",
    "shortExplanation": "（1）二度と〜しないという強い決意（否定の意志：「決して〜しない」）や、（2）おそらく〜ないだろうという推量を表します（否定の推量：「〜ないだろう」）。",
    "longExplanation": "「～まい」は、改まった文体や書き言葉で用いられる否定表現で、文脈や主語によって2つの意味を持ちます。（1）主語が一人称（話し手）の場合は、「もう二度と〜するまい」という固い決意や不作為の誓いを表します（否定の意志）。（2）主語が三人称や客観的な事態の場合は、「おそらく〜しないだろう」「〜のはずがない」という強い推量を表します（否定の推量）。なお、三人称の意志を表す場合には「〜まいと思っているようだ」などの形式をとるのが一般的です。",
    "formation": "Ⅰグループ（五段動詞）：辞書形 ＋ まい | Ⅱグループ（一段動詞）：辞書形（またはます形語幹） ＋ まい | Ⅲグループ：する → するまい／すまい、来る → くるまい／こまい",
    "examples": [
      {
        "translation": "彼は今晩来るまい。"
      },
      {
        "translation": "こんなに遅れては、電車に間に合うまい。"
      },
      {
        "translation": "あの人は絶対に忘れるまい。"
      },
      {
        "translation": "私は二度とその失敗を繰り返すまい。"
      }
    ]
  },
  "ja_までて_146": {
    "title": "～まで～て (〜made 〜te)",
    "shortExplanation": "ある時間や限度、条件に至るまで動作や状態を継続して行い、その上で次の動作へ移行することを表し、「〜の時点・段階まで…して、それから〜」という意味を表します。",
    "longExplanation": "「～まで～て」は、限界や到達点を表す助詞「まで」と動作の接続を表す「動詞て形」を組み合わせた表現で、ある特定の時刻・限界・状態に達するまで一つの行為を継続して行い、その後で次の行動に移る一連の経過を順序立てて説明する際に用いられます（「〜まで…し続けて、それから〜」）。日常の行動記録や出来事の推移を客観的に叙述する際によく現れます。",
    "formation": "時間／名詞／動詞辞書形 ＋ まで ＋ 動詞て形",
    "examples": [
      {
        "translation": "9時まで働いて、その後休憩しました。"
      },
      {
        "translation": "夜まで勉強して、試験に合格しました。"
      },
      {
        "translation": "最後のページまで読んで、本を閉じました。"
      },
      {
        "translation": "電車が着くまで待って、友達と会いました。"
      }
    ]
  },
  "ja_ままに_147": {
    "title": "～ままに (〜mama ni)",
    "shortExplanation": "ある状態を変化させずそのままの状態で別の動作を行ったり、感情や自然の成り行きに任せて行動することを表し、「〜の状態のままで」「〜の通りに、〜に任せて」という意味を表します。",
    "longExplanation": "「～ままに」（または「〜まま」「〜ままで」）は、名詞や動詞・形容詞に接続し、主に2つのニュアンスを持ちます。（1）既存の状態に手を加えず、そのままの状態を維持しながら別の動作を行うことを表します（「〜た状態のままで」）。（2）自分の感情や欲求、あるいは自然の推移や他人のなすがままに任せて行動することを表します（「気の向くままに」「思うままに」「言われるがままに」など、作為を加えず流れに身を任せるニュアンス）。",
    "formation": "動詞た形／ている形 ＋ まま（に） | い形容詞 ＋ まま（に） | な形容詞語幹 ＋ なまま（に） | 名詞 ＋ のまま（に）",
    "examples": [
      {
        "translation": "子供が寝ているままに、静かに部屋を出ました。"
      },
      {
        "translation": "窓が開いたままで、寒くなりました。"
      },
      {
        "translation": "彼は元気なままで老人ホームに入りました。"
      },
      {
        "translation": "昔の思い出のままに、この町に戻りました。"
      }
    ]
  },
  "ja_もかまわず_148": {
    "title": "～もかまわず (〜mo kamawazu)",
    "shortExplanation": "周囲の視線や時間、危険などを全く気にかけず、平気で物事を行うことを表し、「〜も気にしないで」「〜を無視して」という意味を表します。",
    "longExplanation": "「～もかまわず」は、動詞「構う（気にする、配慮する）」の否定形から派生した文型で、名詞や動詞辞書形（＋の）に接続します。通常であれば配慮すべき周囲の迷惑や視線、時間、天候、危険などを完全に無視して行動する様子を表します（「〜も気にせず」「〜もお構いなしに」）。話し手自身の行動に用いることは少なく、主に第三者の行動に対して意外感や呆れ、批判的な気持ちを込めて客観的に描写する際に用いられます。",
    "formation": "名詞 ＋ もかまわず | 動詞辞書形 ＋ のもかまわず",
    "examples": [
      {
        "translation": "彼は周りの人の迷惑も気にせず、大声で話しました。"
      },
      {
        "translation": "彼女は時間を気にかけることもなく、ゆっくりと本を読み続けました。"
      },
      {
        "translation": "彼は寒さも物ともせず、外で運動しました。"
      },
      {
        "translation": "彼女は危険を顧みず、火事の中に飛び込んで助けに行きました。"
      }
    ]
  },
  "ja_ものか_149": {
    "title": "～ものか (〜mono ka)",
    "shortExplanation": "強い否定や反論、断固たる拒絶の意志を表し、「絶対に〜ない」「〜するものか（断じてあり得ない）」という意味を表します。",
    "longExplanation": "「～ものか」（口語形では「〜もんか」、丁寧形では「〜ものですか／〜もんですか」）は、各品詞の普通形に接続し、相手の意見やある状況に対する強い反発、断固とした否定や拒絶の気持ちを反語的に表す文型です。「決して〜しない」「絶対に〜であるはずがない」という話者の強い感情や意志、憤りを表現する際に用いられます。",
    "formation": "動詞普通形 ＋ ものか | い形容詞 ＋ ものか | な形容詞語幹 ＋ なものか | 名詞 ＋ なものか",
    "examples": [
      {
        "translation": "そんなこと、僕が絶対にやりたいはずがない。"
      },
      {
        "translation": "こんな仕事を、一体誰が引き受けるものか（誰も引き受けない）。"
      },
      {
        "translation": "誰が彼なんかに助けを求めるものか（絶対に求めない）。"
      },
      {
        "translation": "こんなに寒い日に外で遊ぶなんて、無理に決まっているだろう。"
      }
    ]
  },
  "ja_ものがある_150": {
    "title": "～ものがある (〜mono ga aru)",
    "shortExplanation": "ある対象や状況に人の心を強く動かす要素や深い感慨があり、「〜と感じられる要素がある」「実に〜だ」という意味を表します。",
    "longExplanation": "「～ものがある」は、動詞普通形、い形容詞、な形容詞（＋な）に接続し、その対象に話し手が強く心を動かされたり、深く感銘を受けたりする特徴・性質がはっきりと存在することを表す文型です（「強く〜と感じられる」「〜という深い感慨がある」）。話し手の主観的な強い実感や評価を込めて述べるときに用いられ、「心を打たれる」「考えさせられる」など感情や評価を表す語句とよく呼応します。",
    "formation": "動詞普通形 ＋ ものがある | い形容詞 ＋ ものがある | な形容詞語幹 ＋ なものがある",
    "examples": [
      {
        "translation": "彼のスピーチには深く心を打たれるものがある。"
      },
      {
        "translation": "この映画には深く考えさせられるものがある。"
      },
      {
        "translation": "彼の言うことにも一理あると感じさせられる点がある。"
      },
      {
        "translation": "毎日忙しすぎる生活には少し息苦しさを感じさせるものがある。"
      }
    ]
  },
  "ja_ものだ_151": {
    "title": "～ものだ (〜mono da)",
    "shortExplanation": "物事の本質や一般的常識、自然な心理法則、または当然守るべき倫理道徳を表し、「本来〜するのが当然だ」「〜するものだ」という意味を表します。",
    "longExplanation": "「～ものだ」は、動詞の辞書形や形容詞に接続し、世間一般の常識、社会通念、事物の普遍的な真理や性質、あるいは人間として当然守るべき道徳的義務を表す文型です（「本来〜するのが当たり前だ」「普通は〜するものだ」）。一般論として述べられるため、特定の個人への直接的な命令ではなく、社会的な良識に基づいた教訓や一般的な心得を諭す際によく用いられます。（※動詞のた形に接続すると過去の習慣の回想を表し、感嘆表現としても用いられます）。",
    "formation": "動詞辞書形 ＋ ものだ | い形容詞 ＋ ものだ | な形容詞語幹 ＋ なものだ",
    "examples": [
      {
        "translation": "若い時はたくさん遊ぶのが当然だ。"
      },
      {
        "translation": "約束をしたからには、守るのが当たり前だ。"
      },
      {
        "translation": "お客さんが来たら、お茶を出すのが礼儀というものだ。"
      },
      {
        "translation": "人生とは本来、困難に立ち向かうべきものだ。"
      }
    ]
  },
  "ja_ものだから_152": {
    "title": "～ものだから (〜mono dakara)",
    "shortExplanation": "相手に理由や原因を説明・釈明する際に用いられ、「〜だから」「〜という事情があって」という意味を表します。",
    "longExplanation": "「～ものだから」（口語では「〜もんだから」）は、普通形（な形容詞・名詞は「〜な」）に接続し、ある行動や結果に至った個人的な事情や理由を相手に説明したり、言い訳・弁解を述べたりする文型です（「〜というわけで」「〜なものですから」）。単に客観的な原因を述べるだけでなく、「実はこういう事情がありまして」と相手の理解や同情を求める柔らかいニュアンスを含みます。",
    "formation": "動詞普通形 ＋ ものだから | い形容詞 ＋ ものだから | な形容詞語幹 ＋ なものだから | 名詞 ＋ なものだから",
    "examples": [
      {
        "translation": "試験が間近に迫っているものですから、毎日必死に勉強しています。"
      },
      {
        "translation": "このレストランは非常に人気があるものですから、予約しないと席がないかもしれません。"
      },
      {
        "translation": "彼はまだ若いため、十分な経験を積んでいないのです。"
      },
      {
        "translation": "今日はかなり寒いですから、手袋を持って出かけましょう。"
      }
    ]
  },
  "ja_ものではない_153": {
    "title": "～ものではない (〜mono dewa nai)",
    "shortExplanation": "一般的な道徳や常識、礼儀の観点から「〜するべきではない」「〜してはならない」と相手を戒めたり忠告したりする文型です。",
    "longExplanation": "「～ものではない」（丁寧形は「〜ものではありません」、口語形は「〜もんじゃない」）は、動詞の辞書形に接続し、社会通念や常識、倫理道徳に照らし合わせて、ある行為を行うことが不適切であり、慎むべきであることを諭す文型です（「〜するべきではない」「〜してはならない」）。個人の単なる命令ではなく、人間としての道理や一般的な良識に基づいて相手に忠告・禁止を促す際に用いられます。",
    "formation": "動詞辞書形 ＋ ものではない／ものではありません",
    "examples": [
      {
        "translation": "そのような無礼なことを口にするべきではありません。"
      },
      {
        "translation": "公共の場所で大声を出すべきではありません。"
      },
      {
        "translation": "他人に彼の秘密を漏らすものではありません。"
      },
      {
        "translation": "安全な場所で遊ぶのは構いませんが、危険な場所で遊ぶべきではありません。"
      }
    ]
  },
  "ja_ものなら_154": {
    "title": "～ものなら (〜mono nara)",
    "shortExplanation": "実際には実現が極めて困難または不可能な事柄を仮定し、「もしできるものなら〜したい」と強い希望や願望を表します。",
    "longExplanation": "「～ものなら」は、主に動詞の可能形に接続し、現実的には実現する可能性が極めて低い、あるいは不可能なことを仮定した上で、「もしそれが可能であるならば、ぜひ〜したい」という話し手の切実な願望や強い意志を述べる文型です（「もし〜できるものなら」「〜できることなら」）。現実には叶わないことへのもどかしさや強い憧れ、後悔の念などが色濃く含まれます。",
    "formation": "動詞可能形 ＋ ものなら",
    "examples": [
      {
        "translation": "帰れるものなら、今すぐにでも故郷の国へ帰りたい。"
      },
      {
        "translation": "実現できるものなら、世界一周旅行をしてみたい。"
      },
      {
        "translation": "人生をやり直せるものなら、幼い子供の頃に戻りたい。"
      },
      {
        "translation": "元気になれるものなら、どんな薬であっても試したい。"
      }
    ]
  },
  "ja_ものの_155": {
    "title": "～ものの、～ (〜mono no、～)",
    "shortExplanation": "前件の事実を認めた上で、後件にそれから予想される結果とは異なる不満足な事態や対比が続くことを表し、「〜だが」「〜とはいうものの」という意味を表します。",
    "longExplanation": "「～ものの」は、各品詞の普通形に接続し、確定した前件の事実を肯定しつつも、後件ではその前提から当然期待・予想される結果に至らなかったり、不相応な状態にとどまったりする逆接の文型です（「〜のは事実だが、実際は〜」「〜とはいうものの」）。話し手の落胆や期待外れ、遺憾のニュアンスを伴うことが多く、文章語や改まった会話でよく用いられます。",
    "formation": "動詞普通形 ＋ ものの | い形容詞 ＋ ものの | な形容詞語幹 ＋ なものの（または であるものの） | 名詞 ＋ であるものの",
    "examples": [
      {
        "translation": "早起きはしたものの、結局バスには間に合いませんでした。"
      },
      {
        "translation": "この部屋は広々としているものの、家具がほとんど置かれていません。"
      },
      {
        "translation": "彼女は美しいものの、性格に難があります。"
      },
      {
        "translation": "彼は有名な歌手であるものの、コンサートにはあまり観客が集まりませんでした。"
      }
    ]
  },
  "ja_もばも_156": {
    "title": "～も～ば～も～ (〜mo〜ba〜mo〜)",
    "shortExplanation": "同一の事物や人物が持つ複数の性質や行動を並列して挙げ、「〜もあれば〜もある」「〜もするし〜もする」という意味を表します。",
    "longExplanation": "「～も～ば～も～」は、助詞「も」と仮定形「〜ば」を呼応させて、ある対象が併せ持つ複数の長所や特徴、あるいは共存する多様な状況を並列・列挙して述べる文型です（「〜も〜し、〜も〜だ」「〜もあれば〜もある」）。二つの要素が揃っていることを強調し、多才さや好条件を褒め称える文脈や、人生の様々な局面を述べる際によく用いられます。",
    "formation": "名詞 ＋ も ＋ 動詞・形容詞仮定形（ば形） ＋ 名詞 ＋ も ＋ 動詞・形容詞",
    "examples": [
      {
        "translation": "彼は勉強もできればスポーツも優秀だ。"
      },
      {
        "translation": "このレストランは値段も安ければ味も申し分ない。"
      },
      {
        "translation": "彼女はピアノも弾けばギターも弾きこなす。"
      },
      {
        "translation": "人生には楽しい時もあれば、辛く苦しい時もある。"
      }
    ]
  },
  "ja_も同然だ_157": {
    "title": "～も同然だ (〜mo douzen da)",
    "shortExplanation": "厳密・形式的には同一でなくても、実質的な状態や結果から見ればほとんど同じであることを表し、「〜とほとんど同じだ」「〜も同様だ」という意味を表します。",
    "longExplanation": "「～も同然だ」は、名詞や動詞普通形（特に「〜た」「〜ていない」など）に接続し、形式や建前の上では完全に同じとは言えないものの、実際の効果や実質的な実態を考慮すればそれとほとんど差がない状態であることを強調する文型です（「〜も同然だ」「〜と変わらない」）。親しい間柄を強調する肯定的な文脈のほか、不満や呆れを表す批判的な文脈でも頻繁に用いられます。",
    "formation": "名詞 ＋ も同然だ | 動詞普通形 ＋ も同然だ",
    "examples": [
      {
        "translation": "彼とは付き合いが長いため、家族も同然の間柄です。"
      },
      {
        "translation": "毎日遅刻するようでは、出席していないも同然です。"
      },
      {
        "translation": "彼女と私は幼なじみであり、実の姉妹も同然の仲です。"
      },
      {
        "translation": "これほど少ない給料では、ただ働きをしているのも同然だ。"
      }
    ]
  },
  "ja_やらやら_158": {
    "title": "～やら～やら (〜yara〜yara)",
    "shortExplanation": "さまざまな事柄や動作、状態を非限定的に次々と並べ挙げ、「〜やら〜やら（たくさんあって整理がつかない）」という意味を表します。",
    "longExplanation": "「～やら～やら」は、名詞、動詞普通形、形容詞に接続し、同類の物事や動作、感情などを代表例として例示・列挙する文型です（「〜や〜など」「〜たり〜たり」）。単なる並列にとどまらず、物が散乱していたり、やるべきことが立て続けに多くて混乱していたり、様々な思いが交錯して整理がつかないといった、煩雑さや慌ただしさのニュアンスを伴います。",
    "formation": "名詞 ＋ やら ＋ 名詞 ＋ やら | 動詞普通形 ＋ やら | い形容詞 ＋ やら | な形容詞語幹 ＋ やら",
    "examples": [
      {
        "translation": "宿題やら掃除やら、やらなければならないことが山積みだ。"
      },
      {
        "translation": "野菜やら果物やら、いろいろな食材を買い込みました。"
      },
      {
        "translation": "彼女は歌が上手やら踊りもできるやらで、実に多才だ。"
      },
      {
        "translation": "お店にはバッグやら靴やらアクセサリーやらが所狭しと並んでいる。"
      }
    ]
  },
  "ja_ようがない_159": {
    "title": "～ようがない (〜you ga nai)",
    "shortExplanation": "そうしたくても手段や方法が全く存在せず、どうすることもできない状態を表し、「〜する方法がない」「〜しようにもできない」という意味を表します。",
    "longExplanation": "「～ようがない」（丁寧形は「〜ようがありません」、名詞修飾形は「〜ようのない」）は、動詞のます形語幹に接続し、その行為を行いたい意志があっても、手段や可能性、条件が完全に欠落しているため実行不可能であることを表す文型です（「〜する手段がない」「どうにも〜できない」）。手の施しようがない事態に対する無力感や強い諦めの感情を伴って用いられます。",
    "formation": "動詞ます形語幹 ＋ ようがない／ようがありません",
    "examples": [
      {
        "translation": "彼の連絡先が分からないため、助けようにも方法がありません。"
      },
      {
        "translation": "ここまで破損してしまうと、もはや修理のしようがありません。"
      },
      {
        "translation": "証拠が皆無であるため、彼が犯人であることを証明しようがありません。"
      },
      {
        "translation": "不意に英語で話しかけられ、何と答えるべきか分からず返答のしようがなかった。"
      }
    ]
  },
  "ja_よりほかない_160": {
    "title": "～よりほかない (〜yori hoka nai)",
    "shortExplanation": "他に選択肢や解決策がなく、その行動をとる以外に道がないことを表し、「〜するしかない」「〜のほかに方法がない」という意味を表します。",
    "longExplanation": "「～よりほかない」（類義表現に「〜よりほかはない」「〜よりない」「〜ほかない」）は、動詞の辞書形に接続し、置かれた状況において他の手段や選択肢が尽きており、その行動をとる以外に道が残されていないことを表す文型です（「〜するしかない」「ただ〜するだけだ」）。他に手立てがないことに対する消極的な諦めや、やむを得ず受け入れる決断のニュアンスを含みます。",
    "formation": "動詞辞書形 ＋ よりほかない／よりほかはない",
    "examples": [
      {
        "translation": "試験が間近に迫っている以上、勉強するよりほかにありません。"
      },
      {
        "translation": "風邪の症状がひどいので、早く寝るよりほかない。"
      },
      {
        "translation": "バスが来ない以上、歩いて向かうよりほかにない。"
      },
      {
        "translation": "お金がないのだから、安い品物を買うよりほかない。"
      }
    ]
  },
  "ja_わけがない_161": {
    "title": "～わけがない (〜wake ga nai)",
    "shortExplanation": "道理や客観的事実から考えて、絶対にそうであるはずがないと強く否定し、「〜はずがない」「〜わけはない」という意味を表します。",
    "longExplanation": "「～わけがない」（口語形は「〜わけない」、丁寧形は「〜わけがありません」）は、普通形（な形容詞は「〜な」、名詞は「〜の」）に接続し、明確な根拠や前後の状況、道理から論理的に判断して、その事態が成立することは絶対にあり得ないと確信を持って全否定する文型です（「〜するはずがない」「〜である道理がない」）。話し手の強い確信と断定の語気を伴います。",
    "formation": "動詞普通形 ＋ わけがない | い形容詞 ＋ わけがない | な形容詞語幹 ＋ なわけがない | 名詞 ＋ のわけがない",
    "examples": [
      {
        "translation": "彼が負傷している以上、試合に勝てるはずがありません。"
      },
      {
        "translation": "嘘ばかりついている人物を、信用できるわけがありません。"
      },
      {
        "translation": "彼女は多忙を極めているので、このパーティーに来るはずがありません。"
      },
      {
        "translation": "昨日は一日中眠っていたのですから、その事件を知っているわけがありません。"
      }
    ]
  },
  "ja_わけだ_162": {
    "title": "～わけだ (〜wake da)",
    "shortExplanation": "理由や背景を知って納得し、その結果になるのが当然であると理解したことを表し、「なるほど〜のはずだ」「道理で〜なわけだ」という意味を表します。",
    "longExplanation": "「～わけだ」（丁寧形は「〜わけです」）は、普通形（な形容詞・名詞は「〜な」または「〜である」）に接続し、原因や事情を理解した結果、「なるほど、それならそうなるのも当然だ」と論理的な帰結として深く納得・合点がいったことを表す文型です（「道理で〜なわけだ」「そういう事情なら〜のも納得だ」）。疑問や違和感の理由が判明した際の腑に落ちた気持ちを表すのによく用いられます。",
    "formation": "動詞普通形 ＋ わけだ | い形容詞 ＋ わけだ | な形容詞語幹 ＋ なわけだ | 名詞 ＋ なわけだ（または であるわけだ）",
    "examples": [
      {
        "translation": "彼女が遅刻したのは、電車が遅延したからだったのですね。"
      },
      {
        "translation": "授業がとても面白かったからこそ、皆が熱心に耳を傾けていたわけですね。"
      },
      {
        "translation": "彼は多忙を極めているのですから、休日がほとんどないのも納得がいきます。"
      },
      {
        "translation": "この問題がこれほど難しいのですから、全く理解できないのも道理です。"
      }
    ]
  },
  "ja_わけではない_163": {
    "title": "～わけではない (〜wake dewa nai)",
    "shortExplanation": "全面的・絶対的な肯定を和らげて部分的に否定する表現で、「必ずしも〜とは言えない」「〜というわけではない」という意味を表します。",
    "longExplanation": "「～わけではない」は、相手の推測や世間一般の思い込み、あるいは状況から当然予想される事柄に対して、「完全にそうであるとは限らない」と一部を否定する文型です（「必ずしも〜ではない」「〜という意味ではない」）。全体を完全に否定するのではなく、事実を正確に伝えたり、断定を避けて婉曲に述べたりする際によく用いられ、「必ずしも」「特に」「すべて」などの副詞と共起することが多いです。",
    "formation": "動詞普通形 ＋ わけではない ｜ い形容詞 ＋ わけではない ｜ な形容詞語幹＋な / である ＋ わけではない ｜ 名詞＋な / である / という ＋ わけではない",
    "examples": [
      {
        "translation": "彼が勉強しないわけではないが、成績があまり良くない。"
      },
      {
        "translation": "このレストランが高いわけではないけど、毎日通うには少し高いね。"
      },
      {
        "translation": "彼女が優しくないわけではないが、時々話し方がきついことがある。"
      },
      {
        "translation": "彼が忙しいわけではないが、時間を上手に使えていないようだ。"
      }
    ]
  },
  "ja_わけにはいかない_164": {
    "title": "～わけにはいかない (〜wake ni wa ikanai)",
    "shortExplanation": "社会的規範や道徳、義理、責任感などの理由から、「〜するわけにはいかない」「〜することはできない」という強い自制や禁止の気持ちを表します。",
    "longExplanation": "「～わけにはいかない」は動詞の辞書形に接続し、能力的に不可能なのではなく、常識や倫理観、責任、人間関係のしがらみ、社会的な立場などの理由によって「心理的・道義的にそうすることはできない」と述べる文型です。自身の立場や責任を踏まえ、ある行動を控える強い抑制や義務感を表します。",
    "formation": "動詞辞書形 ＋ わけにはいかない",
    "examples": [
      {
        "translation": "試験が近いから、遊ぶわけにはいかない。"
      },
      {
        "translation": "田中さんが待っているので、遅れるわけにはいかない。"
      },
      {
        "translation": "子供たちのために、この仕事を辞めるわけにはいかない。"
      },
      {
        "translation": "この問題は重要だから、無視するわけにはいかない。"
      }
    ]
  },
  "ja_をきっかけに_165": {
    "title": "～をきっかけに (〜wo kikkake ni)",
    "shortExplanation": "ある出来事や機会が動機や転機となって、新しい行動や変化が始まることを表し、「〜を動機・契機として」という意味を表します。",
    "longExplanation": "「～をきっかけに」（「〜をきっかけにして」「〜をきっかけとして」の形も用いられ、名詞修飾では「〜をきっかけにした / とした＋名詞」）は名詞に接続し、ある具体的な出来事、出会い、体験などが引き金や転機となって、それまでと異なる新しい行動を起こしたり、生活や環境に大きな変化が生じたりしたことを述べる文型です。人生の転換点や新しい取り組みの始まりを説明する際によく使われます。",
    "formation": "名詞 ＋ をきっかけに（または をきっかけにして / をきっかけとして）",
    "examples": [
      {
        "translation": "結婚をきっかけに、彼は真剣に仕事を頑張り始めた。"
      },
      {
        "translation": "あの出会いをきっかけに、私たちは友達になりました。"
      },
      {
        "translation": "コンサートをきっかけに、彼女は音楽の道に進むことを決めました。"
      },
      {
        "translation": "留学をきっかけに、私の外国語スキルが向上しました。"
      }
    ]
  },
  "ja_をとして_166": {
    "title": "～を～として (〜wo〜toshite)",
    "shortExplanation": "ある物や人を、特定の役割、資格、目的、基盤などに位置づけることを表し、「〜を〜と見なして」「〜を〜の役割・資格として」という意味を表します。",
    "longExplanation": "「～を～として」（名詞を修飾する場合は「〜を〜とする＋名詞」「〜を〜とした＋名詞」）は、名詞1を名詞2が示す役割、目的、資格、基準、基盤などに設定して行動や判断を行うことを表す文型です（「AをBとして扱う」「AをBと位置づける」）。方針や役割分担、目標などを公式・明確に述べる公的な場面や文章語でよく使われます。",
    "formation": "名詞1 ＋ を ＋ 名詞2 ＋ として（連体修飾：とする＋名詞 / とした＋名詞）",
    "examples": [
      {
        "translation": "彼は教師を職業として働いています。"
      },
      {
        "translation": "彼女はリーダーを役割として受け入れました。"
      },
      {
        "translation": "私たちは彼を仲間として信頼しています。"
      },
      {
        "translation": "このアーティストは伝統を基盤として作品を作ります。"
      }
    ]
  },
  "ja_を中心に_167": {
    "title": "～を中心に (〜wo chuushin ni)",
    "shortExplanation": "ある物・人・地域・テーマなどを活動や事態の最も重要な中心・重点とすることを表し、「〜を中心として」「〜を主として」という意味を表します。",
    "longExplanation": "「～を中心に」（「〜を中心にして」「〜を中心として」、名詞修飾では「〜を中心とした / とする＋名詞」）は名詞に接続し、その人や物、場所、課題などが全体の中で最も主要な核・焦点となって物事が展開していることを表す文型です（「〜を核にして」「〜を重点的に」）。報道、論文、ビジネス、地域や組織の動向を客観的に説明する際によく用いられます。",
    "formation": "名詞 ＋ を中心に（または を中心にして / を中心として；連体修飾：を中心とした＋名詞 / を中心とする＋名詞）",
    "examples": [
      {
        "translation": "このイベントは音楽を中心に楽しまれています。"
      },
      {
        "translation": "彼の仕事は東京を中心に行われています。"
      },
      {
        "translation": "彼女は健康を中心に本を書いています。"
      },
      {
        "translation": "最近の研究は環境保護を中心に行われている。"
      }
    ]
  },
  "ja_を問わず_168": {
    "title": "～を問わず (〜wo towazu)",
    "shortExplanation": "条件や違い、区別に関係なく、すべてに一律に当てはまることを表し、「〜に関係なく」「〜を問題にしないで」という意味を表します。",
    "longExplanation": "「～を問わず」（漢字では「問わず」）は名詞に接続し、年齢、性別、国籍、昼夜、経験の有無、天候など、対立や幅・差異を含む概念を問題にせず、どの条件であっても一律に適用されることを表す文型です（「〜に関わりなく」「〜の区別なく」）。求人広告やイベントの参加条件、公共の案内文など、改まった文章や公的な表現で頻繁に用いられます。",
    "formation": "名詞 ＋ を問わず",
    "examples": [
      {
        "translation": "このイベントは、年齢を問わず、誰でも参加できます。"
      },
      {
        "translation": "このスーパーは、日曜日を問わず、毎日開いています。"
      },
      {
        "translation": "彼女は、暑さ寒さを問わず、毎朝散歩をしています。"
      },
      {
        "translation": "社長は、国籍を問わず、すべての社員を平等に扱っています。"
      }
    ]
  },
  "ja_を込めて_169": {
    "title": "～を込めて (〜wo komete)",
    "shortExplanation": "愛情、感謝、祈りなどの強い感情や心をある行為に十分に注ぎ込むことを表し、「〜の気持ちを込めて」「〜を十分に含ませて」という意味を表します。",
    "longExplanation": "「～を込めて」（名詞を修飾するときは「〜を込めた＋名詞」）は、愛、感謝、真心、祈り、願い、力などの感情や意図を表す名詞に接続し、その気持ちや情熱を余すところなくその行動や制作物の中に注ぎ込んで行うことを表す文型です（「心を込めて」「気持ちを込めて」）。手紙を書く、料理を作る、プレゼントを贈る、全力を尽くすなど、真摯な思いを伝える場面で広く使われます。",
    "formation": "名詞（感情・心・祈りなどを表す語） ＋ を込めて（連体修飾：を込めた＋名詞）",
    "examples": [
      {
        "translation": "愛を込めて料理を作りました。"
      },
      {
        "translation": "感謝を込めて先生にお礼の手紙を書きました。"
      },
      {
        "translation": "彼は全力を込めて最後の瞬間まで戦いました。"
      },
      {
        "translation": "彼女は悲しみを込めて友達へ別れの言葉を伝えました。"
      }
    ]
  },
  "ja_を通じて_170": {
    "title": "～を通じて (〜wo tsuujite)",
    "shortExplanation": "手段や仲介・媒介となるものを経由することを表す用法（「〜を介して」「〜によって」）と、ある期間の最初から最後までずっと続くことを表す用法（「〜の期間ずっと」）の二つの意味を表します。",
    "longExplanation": "「～を通じて」（名詞を修飾するときは「〜を通じた＋名詞」）には主に二つの用法があります。①手段・仲介者・媒体などを経て何かが行われることを表す用法（「〜を仲介として」「〜を手段として」）。②特定の期間を表す名詞（一年、四季、一日など）に付き、その期間の初めから終わりまで継続してその状態や行為が続いていることを表す用法（「〜の間ずっと」）。文脈によって「手段・媒介」か「全期間の継続」かを判断します。",
    "formation": "名詞 ＋ を通じて（連体修飾：を通じた＋名詞）",
    "examples": [
      {
        "translation": "インターネットを通じて友達と連絡を取ります。"
      },
      {
        "translation": "彼は一日を通じて熱心に働いています。"
      },
      {
        "translation": "このイベントは週末を通じて開催されます。"
      },
      {
        "translation": "その花は春を通じて咲いています。"
      }
    ]
  },
  "ja_を頼りに_171": {
    "title": "～を頼りに (〜wo tayori ni)",
    "shortExplanation": "人や物、記憶や手がかりなどを頼るべき支えや道しるべとして行動することを表し、「〜をあてにして」「〜を手がかり・支えにして」という意味を表します。",
    "longExplanation": "「～を頼りに」（「〜を頼りにして」「〜を頼りとして」、名詞修飾では「〜を頼りにした＋名詞」）は名詞に接続し、人、物、地図、微かな記憶や光、手がかりなどを自分を導く支えや助けとして、何らかの行動や問題解決を行うことを表す文型です（「〜を支えとして」「〜を頼みとして」）。困難な状況や見通しの立たない場面で、何かを頼って前進する様子を表す際によく用いられます。",
    "formation": "名詞 ＋ を頼りに（または を頼りにして；連体修飾：を頼りにした＋名詞）",
    "examples": [
      {
        "translation": "彼女は地図を頼りに旅行をしている。"
      },
      {
        "translation": "多くの人が彼の力を頼りに生活している。"
      },
      {
        "translation": "このプロジェクトでは、君のスキルを頼りにしています。"
      },
      {
        "translation": "彼は友達の助けを頼りに問題を解決しようとした。"
      }
    ]
  },
  "ja_一方_172": {
    "title": "～一方 (〜ippou)",
    "shortExplanation": "ある事柄について対照的な二つの側面を述べたり、ある事態が進むと同時に別の事態も並行して起こっていることを表し、「一方で」「その反面」という意味を表します。",
    "longExplanation": "「～一方」（「～一方で」の形も頻繁に使われます）は、普通形に接続し、同一の人物、物事、現象が持っている二つの対照的・矛盾する側面を並べて対比する文型です（「〜である反面」「〜の一方で」）。また、一つの事態が進行しているのと同時に別の事態も並行して起きている状況を表す際にも使われます。物事を多角的・客観的に分析して述べる論説文などで重宝される表現です。",
    "formation": "動詞普通形 ＋ 一方（で） ｜ い形容詞 ＋ 一方（で） ｜ な形容詞語幹＋な / である ＋ 一方（で） ｜ 名詞＋である ＋ 一方（で）",
    "examples": [
      {
        "translation": "技術が進化する一方、生活が忙しくなっている。"
      },
      {
        "translation": "日本語が上達する一方、英語力が下がっている気がする。"
      },
      {
        "translation": "この料理は美味しい一方、ちょっと高いです。"
      },
      {
        "translation": "彼は優しい一方、厳しい面もある。"
      }
    ]
  },
  "ja_一方だ_173": {
    "title": "～一方だ (〜ippou da)",
    "shortExplanation": "事態や状況の変化が止まらず、一定の一方向へ進み続けていることを表し、「ますます〜していくばかりだ」「〜する傾向が進む」という意味を表します。",
    "longExplanation": "「～一方だ」は、変化を表す動詞の辞書形（増える、悪化する、進む、低下するなど）に接続し、ある傾向や状態の変化が歯止めなく一つの方向に向かって進み続けていることを表す文型です（「〜するばかりだ」「どんどん〜していく」）。多くは事態の悪化や懸念される傾向の加速に対して用いられますが、客観的な増減やスキルの向上などにも用いられます。",
    "formation": "動詞辞書形（変化を表す動詞） ＋ 一方だ",
    "examples": [
      {
        "translation": "世界の人口は増える一方だ。"
      },
      {
        "translation": "この町の治安は悪化する一方だ。"
      },
      {
        "translation": "僕の日本語は上達する一方だ。"
      },
      {
        "translation": "夏になると、暑さが厳しくなる一方だ。"
      }
    ]
  },
  "ja_上で_174": {
    "title": "～上で (〜ue de)",
    "shortExplanation": "前項の行為を前提や準備として完了させた後に、次の行動や判断を行うことを表し、「〜してから」「〜した結果に基づいて」という意味を表します。",
    "longExplanation": "「～上で」は、動詞のた形または「名詞＋の上で」に接続し、まず前項の行為（確認、相談、調査、熟考など）を条件や前提として済ませた後、その結果を踏まえて後項の決定や行動へ進むことを表す文型です（「〜した上で判断する」「〜した後に」）。単なる時間の前後関係ではなく、前項が後項のための不可欠な準備・手続きであることを強調する改まった表現です。",
    "formation": "動詞た形 ＋ 上で ｜ 名詞＋の上で",
    "examples": [
      {
        "translation": "調査を行った上で、結論を出しましょう。"
      },
      {
        "translation": "就職活動を終えた上で、進学するかどうか決めます。"
      },
      {
        "translation": "試着した上で、この服を買うかどうか考えます。"
      },
      {
        "translation": "経験者の意見を聞いた上で、プロジェクトの方向性を決定しましょう。"
      }
    ]
  },
  "ja_上に_175": {
    "title": "～上に (〜ue ni)",
    "shortExplanation": "ある状態や事実に加えて、さらに同じ評価の事柄が重なることを表し、「〜だけでなく、さらに」「〜に加えて」という意味を表します。",
    "longExplanation": "「～上に」は、普通形（な形容詞＋な/である、名詞＋の/である）に接続し、前項の状況や性質に加えて、さらに同種の事態や評価がプラスされることを表す文型です（「〜であるだけでなく」「その上」）。前項と後項は必ず評価の方向性が一致（良いこと＋良いこと、または悪いこと＋悪いこと）する必要があり、対比には用いられません。",
    "formation": "動詞普通形 ＋ 上に ｜ い形容詞 ＋ 上に ｜ な形容詞語幹＋な上に（または である上に） ｜ 名詞＋の上に（または である上に）",
    "examples": [
      {
        "translation": "彼は頭がいい上に、スポーツも得意です。"
      },
      {
        "translation": "このドレスは美しい上に、値段も安いです。"
      },
      {
        "translation": "彼女は優しい上に、料理も上手です。"
      },
      {
        "translation": "彼は社長の上に、有名な作家でもある。"
      }
    ]
  },
  "ja_上は_176": {
    "title": "～上は (～ue wa)",
    "shortExplanation": "事態がすでに決まった以上、強い責任や覚悟を持って相応の行動をすべきであることを表し、「〜である以上は」「〜となったからには」という意味を表します。",
    "longExplanation": "「～上は」（「〜以上は」「〜からには」とほぼ同義）は、動詞の普通形（特にた形）に接続し、ある事実や決定、事態が確定したことを受けて、「そうである以上は当然、責任や覚悟を持って行動しなければならない」という話し手の強い決意や義務感を述べる文型です。後項には「〜つもりだ」「〜べきだ」「〜なければならない」「〜う／よう」など、強い意志、覚悟、義務を表す表現が続きます。",
    "formation": "動詞普通形（主にた形・辞書形） ＋ 上は",
    "examples": [
      {
        "translation": "試験に合格した上は、パーティーを開こう。"
      },
      {
        "translation": "この仕事を引き受けた上は、最後までやり遂げるつもりだ。"
      },
      {
        "translation": "親切だと言われた上は、手伝ってあげよう。"
      },
      {
        "translation": "甘いものが好きな上は、このデザートをきっと気に入るでしょう。"
      }
    ]
  },
  "ja_以上_177": {
    "title": "～以上 (〜ijou)",
    "shortExplanation": "ある事実や約束、立場などを前提として、「そうである以上は当然〜すべきだ」という強い義務や決意を表し、「〜であるからには」「〜する以上は」という意味を表します。",
    "longExplanation": "「～以上」（「〜以上は」の形も頻繁に使われます）は、普通形（名詞やな形容詞は「である」）に接続し、既に確定している事実、約束、立場、身分などを前提として挙げ、「その状況であるからには、当然相応の責任を果たすべきだ」「当然そうなるはずだ」という話し手の強い主張、覚悟、義務感を述べる文型です（「〜からには」「〜のうえは」）。後項には「〜べきだ」「〜なければならない」「〜つもりだ」などの表現が呼応することが多いです。",
    "formation": "動詞普通形 ＋ 以上（は） ｜ い形容詞 ＋ 以上（は） ｜ な形容詞＋である以上（は） ｜ 名詞＋である以上（は）",
    "examples": [
      {
        "translation": "彼は忙しい以上、手伝いに行っても無駄だろう。"
      },
      {
        "translation": "約束した以上、守るべきだ。"
      },
      {
        "translation": "締め切りが近い以上、全力で仕事をしなければならない。"
      },
      {
        "translation": "彼女は大学生である以上、勉強が優先されるべきだ。"
      }
    ]
  },
  "ja_以来_178": {
    "title": "～以来 (〜irai)",
    "shortExplanation": "過去のある時点や出来事をきっかけとして、その状態が現在までずっと続いていることを表し、「〜てからずっと」「〜以降」という意味を表します。",
    "longExplanation": "「～以来」は動詞のて形・た形や名詞に接続し、過去の特定の時点や出来事を出発点として、ある事態や状態が途切れることなく現在まで継続していることを表す文型です（「〜てから今までずっと」）。後件には現在まで続いている状態や傾向を表す文が続き、一回限りの動作や未来の事柄には用いられません。",
    "formation": "動詞て形／た形 ＋ 以来 ｜ 名詞 ＋ 以来",
    "examples": [
      {
        "translation": "卒業以来、彼女に会っていない。"
      },
      {
        "translation": "子供が生まれて以来、忙しくなった。"
      },
      {
        "translation": "東京に引っ越して以来、友達が増えた。"
      },
      {
        "translation": "あの映画を見た以来、彼女は怖がりになった。"
      }
    ]
  },
  "ja_切る_179": {
    "title": "～切る (〜kiru)",
    "shortExplanation": "ある行為を最後まで完全にやり遂げることや、状態が極限に達していることを表し、「完全に〜する」「最後まで〜し尽くす」という意味を表します。",
    "longExplanation": "「～切る」は動詞のます形語幹に接続し、主に二つの意味を表します。一つは動作を最後まで徹底的にやり通すこと、あるいは残すところなく完全に終わらせることです（「言い切る」「使い切る」）。もう一つは、疲労や困憊など心身の状態が限界に達していることを表します（「疲れ切る」「困り切る」）。可能形の「～切れる」や、余りにも多くて最後まで処理できないことを表す「～切れない」（「数え切れない」「食べ切れない」）の形も多用されます。",
    "formation": "動詞ます形語幹 ＋ 切る（可能形：切れる、否定形：切れない）",
    "examples": [
      {
        "translation": "彼は試験勉強をがんばり切るつもりだ。"
      },
      {
        "translation": "この仕事を終わり切るまで、帰らないでください。"
      },
      {
        "translation": "友達と喧嘩して、何も言い切れなかった。"
      },
      {
        "translation": "彼らは、そのゲームをやり切ることができました。"
      }
    ]
  },
  "ja_反面_180": {
    "title": "～反面 (〜hanmen)",
    "shortExplanation": "同一の物事や人物が持つ、対立する二つの側面を対比して述べる表現で、「〜である一方で」「その反面」という意味を表します。",
    "longExplanation": "「～反面」は、ある一つの事柄や対象が持っている、相反する二つの性質や側面（長所と短所、利益と不利益など）を同時に取り上げて対比する文型です（「〜だが、その一方で…」）。物事を多角的に捉えて客観的に評価する際によく用いられ、文頭で「その反面」として接続詞的に使われることもあります。",
    "formation": "動詞普通形 ＋ 反面 ｜ い形容詞 ＋ 反面 ｜ な形容詞語幹＋な／である ＋ 反面 ｜ 名詞＋である ＋ 反面",
    "examples": [
      {
        "translation": "この車は速い反面、燃費が悪いです。"
      },
      {
        "translation": "彼は頭がいい反面、運動が苦手です。"
      },
      {
        "translation": "彼女は親切である反面、面倒見が良すぎることがある。"
      },
      {
        "translation": "この仕事は給料が高い反面、ストレスがたくさんあります。"
      }
    ]
  },
  "ja_向け_181": {
    "title": "～向け (〜muke)",
    "shortExplanation": "ある製品やサービス、企画などが特定の対象・人物に向けて作られていることを表し、「〜を対象とした」「〜用」という意味を表します。",
    "longExplanation": "接尾辞「～向け」は人を表す名詞などに接続し、その物や情報、催しなどが特定の読者層・顧客層・対象者を想定して意図的に作られたものであることを表します（「〜を対象として」「〜のために」）。名詞を修飾するときは「〜向けの名詞」、動詞を修飾するときは「〜向けに」の形をとります。性質として自然と適していることを表す「〜向き」とのニュアンスの違いに留意する必要があります。",
    "formation": "名詞 ＋ 向け（名詞修飾：向けの名詞、副詞的用法：向けに）",
    "examples": [
      {
        "translation": "この雑誌は若者向けです。"
      },
      {
        "translation": "スーパーで家族向けの食品セットが売っています。"
      },
      {
        "translation": "このアプリは初心者向けに作られています。"
      },
      {
        "translation": "このレストランはビーガン向けのメニューが充実しています。"
      }
    ]
  },
  "ja_恐れがある_182": {
    "title": "～恐れがある (〜osore ga aru)",
    "shortExplanation": "好ましくない事態や危険、被害などが生じる可能性があることを表し、「〜の危険性がある」「〜という心配がある」という意味を表します。",
    "longExplanation": "「～恐れがある」は動詞の辞書形・ない形や「名詞＋の」に接続し、将来的に望ましくない事態や深刻な被害、危険な出来事が発生する可能性があることを警告・懸念する文型です（「〜の懸念がある」「〜してしまう心配がある」）。改まった硬い表現であり、天気予報や災害情報、ニュース報道、公的な発表文書などで頻繁に用いられます。",
    "formation": "動詞辞書形／ない形 ＋ 恐れがある ｜ 名詞＋の ＋ 恐れがある",
    "examples": [
      {
        "translation": "地震が来る恐れがあるため、避難所に行ってください。"
      },
      {
        "translation": "彼は事故に遭う恐れがあるので、注意して運転してください。"
      },
      {
        "translation": "この薬を飲みすぎると、副作用の恐れがある。"
      },
      {
        "translation": "低い予算でこのプロジェクトを進めると、品質が低くなる恐れがある。"
      }
    ]
  },
  "ja_折には_183": {
    "title": "～折には (〜ori ni wa)",
    "shortExplanation": "ある特定の時や機会、好機を表す改まった表現で、「〜の時に」「〜の機会に」という意味を表します。",
    "longExplanation": "「～折には」（「〜折に」とも）は「〜とき」の改まった丁寧な表現で、特別な機会や巡ってきた好機、特定の時期を指して述べる文型です（「〜の折には」「〜の機会に」）。ビジネス文書や手紙、改まった挨拶、接客などの場面において、相手への配慮や敬意を込めて好機や状況を述べる際によく用いられます。",
    "formation": "動詞辞書形／た形 ＋ 折（に／には） ｜ い形容詞 ＋ 折（に／には） ｜ な形容詞語幹＋な ＋ 折（に／には） ｜ 名詞＋の ＋ 折（に／には）",
    "examples": [
      {
        "translation": "喉が渇く折には、このペットボトルの水を飲んでください。"
      },
      {
        "translation": "この地域に来る折には、この神社に必ずお参りしましょう。"
      },
      {
        "translation": "彼が元気じゃない折には、具合が悪いか尋ねてください。"
      },
      {
        "translation": "チャンスがある折には、躊躇せずに行動しましょう。"
      }
    ]
  },
  "ja_末_184": {
    "title": "～末 (～sue)",
    "shortExplanation": "長い間の苦労や葛藤、議論などを経た最終的な結果を表し、「〜の最後に」「〜した結果」という意味を表します。",
    "longExplanation": "「～末」（主に「〜末に」「〜末の」の形で用いられる）は、動詞のた形や「名詞＋の」に接続し、長期間にわたる深い思索や議論、苦難、努力のプロセスを経た後に、ようやくある結論や結果に至ったことを表す文型です（「〜した結果、ついに…」「〜の果てに」）。最終的に得られた結果は良いことにも悪いことにも用いられます。",
    "formation": "動詞た形 ＋ 末（に／の） ｜ 名詞＋の ＋ 末（に／の）",
    "examples": [
      {
        "translation": "長い議論の末、ようやく意見がまとまった。"
      },
      {
        "translation": "一週間の勉強の末、試験に合格した。"
      },
      {
        "translation": "何度も失敗の末、成功を手に入れた。"
      },
      {
        "translation": "彼との別れの末、新しい人生を始めた。"
      }
    ]
  },
  "ja_次第_185": {
    "title": "～次第 (〜shidai)",
    "shortExplanation": "動詞に接続して「〜したらすぐに」を表し、名詞に接続して「〜によって決まる」を表す文型です。",
    "longExplanation": "「～次第」には大きく分けて二つの用法があります。一つは動詞のます形語幹に接続し、ある行為や事態が完了したら、時間を置かずに直ちに次の意志的な動作を行うことを表します（「〜が終わり次第、ただちに…」）。もう一つは名詞に直接接続し、物事の結果や状況がその条件や相手の意向によって左右されることを表します（「〜によって」「〜次第で」）。",
    "formation": "動詞ます形語幹 ＋ 次第（〜したらすぐ） ｜ 名詞 ＋ 次第（〜によって決まる）",
    "examples": [
      {
        "translation": "仕事が終わり次第、帰ります。"
      },
      {
        "translation": "お客様のご意見次第で、サービスを改善します。"
      },
      {
        "translation": "彼の返事次第で、パーティーに行くかどうか決めます。"
      },
      {
        "translation": "天気次第で、ピクニックを予定しています。"
      }
    ]
  },
  "ja_次第で_186": {
    "title": "～次第で (〜shidai de)",
    "shortExplanation": "後件の事態や結果が前件の条件や状況によって左右されることを表し、「〜によって」「〜次第で」という意味を表します。",
    "longExplanation": "「～次第で」は名詞に接続し、その事柄や条件がどのようであるかによって、後に続く結果や選択、対応が異なってくることを表す文型です（「〜によって変わる」「〜のあり方次第で」）。名詞を修飾する場合は「〜次第での名詞」や「〜次第の名詞」の形をとります。",
    "formation": "名詞 ＋ 次第で（名詞修飾：次第での／次第の ＋ 名詞）",
    "examples": [
      {
        "translation": "仕事の終わり次第で、家に帰る時間が変わります。"
      },
      {
        "translation": "天気次第で、ピクニックに行く予定です。"
      },
      {
        "translation": "彼の気分次第で、パーティーに参加するかどうか決まります。"
      },
      {
        "translation": "会議の進行次第で、決定が変わるかもしれません。"
      }
    ]
  },
  "ja_次第です_187": {
    "title": "～次第です (〜shidai desu)",
    "shortExplanation": "物事が「〜によって決まる」ことを丁寧に述べる表現、またはビジネス文書等で事の成り行きや理由を改まって述べる結びの表現です。",
    "longExplanation": "「～次第です」は「次第」の丁寧な結びの表現で、主に二つの使われ方をします。（1）名詞に接続して「〜によって決まる」という依存関係を丁寧に述べる用法（「皆様のご協力次第です」など）。（2）動詞普通形に接続し、ビジネス文書や改まった手紙などの結びにおいて、ある事態に至った事情や経緯、行動の理由を丁寧に説明する用法です（「〜という経緯でございます」「〜という次第です」）。",
    "formation": "名詞 ＋ 次第です（〜によって決まります） ｜ 動詞普通形 ＋ 次第です（改まった文脈での事情・経緯の説明）",
    "examples": [
      {
        "translation": "天気次第ですが、明日はピクニックに行こうと思います。"
      },
      {
        "translation": "試験の結果次第ですが、留学したいと考えています。"
      },
      {
        "translation": "お客様のご意見次第で新メニューを追加する次第です。"
      },
      {
        "translation": "申請が完了次第ですので、手続きが終わったらパスポートを受け取れます。"
      }
    ]
  },
  "ja_気味_188": {
    "title": "～気味 (〜gimi)",
    "shortExplanation": "心身の状態や傾向が少しそのようであること、そうした兆候が感じられることを表し、「少し〜の傾向がある」「〜気味である」という意味を表します。",
    "longExplanation": "接尾辞「～気味」（ぎみ）は名詞や動詞のます形語幹に接続し、程度はそれほど深刻ではないものの、好ましくない状態や変化の兆候が少し感じられることを表す文型です（「なんとなく〜の傾向がある」「少し〜っぽい」）。主に「風邪気味」「寝不足気味」「緊張気味」「太り気味」「遅れ気味」など、ややマイナスな状態を表す語句とともに用いられます。",
    "formation": "名詞 ＋ 気味 ｜ 動詞ます形語幹 ＋ 気味（名詞修飾：気味の＋名詞、副詞的用法：気味に）",
    "examples": [
      {
        "translation": "最近寝不足気味で、ちょっと疲れています。"
      },
      {
        "translation": "この部屋は暗い気味だから、もっと明るい照明をつけよう。"
      },
      {
        "translation": "彼女は緊張気味で話していました。"
      },
      {
        "translation": "彼の声は風邪気味だったね。"
      }
    ]
  },
  "ja_限り_189": {
    "title": "～限り (〜kagiri)",
    "shortExplanation": "前件の条件や状態が続いている間は、後件の状態も継続することを表し、「〜である間は」「〜するうちは」という意味を表します。",
    "longExplanation": "「～限り」は動詞・形容詞の普通形や「名詞＋である」などに接続し、ある状態や条件が成立している限度・期間においては、後件の事態も一貫して変わらず継続することを表す文型です（「〜している間はずっと」「〜である以上は」）。また、「私の知る限り（私の知識の範囲では）」のように、認知や調査の及ぶ「限界・範囲」を表す際にも広く使われます。",
    "formation": "動詞普通形 ＋ 限り ｜ い形容詞 ＋ 限り ｜ な形容詞語幹＋な／である ＋ 限り ｜ 名詞＋である／の ＋ 限り",
    "examples": [
      {
        "translation": "元気な限り、運動し続けます。"
      },
      {
        "translation": "お金がある限り、旅行を楽しみたい。"
      },
      {
        "translation": "彼が話し続ける限り、このプロジェクトのメリットが伝わるでしょう。"
      },
      {
        "translation": "勉強する限り、試験に合格できる可能性が高まります。"
      }
    ]
  },
  "ja_際に_190": {
    "title": "～際に (〜sai ni)",
    "shortExplanation": "「〜の時」の改まった表現で、特定の行為や状況が生じる時を表し、「〜の際に」「〜の時には」という意味を表します。",
    "longExplanation": "「～際に」（「〜際には」とも）は「〜とき」の硬い改まった表現で、動詞の辞書形・た形や「名詞＋の」に接続し、ある行為を行ったり事態が発生したりする特定の時や機会を指定する文型です（「〜を行うにあたって」「〜の折に」）。公共の案内表示、ビジネス文書、取り扱い説明書、公式なアナウンスなどで指示や注意事項を述べる際によく用いられます。",
    "formation": "動詞辞書形／た形 ＋ 際（に／には） ｜ 名詞＋の ＋ 際（に／には）",
    "examples": [
      {
        "translation": "出発の際に、パスポートを忘れないでください。"
      },
      {
        "translation": "地震が起こる際に、すぐに避難してください。"
      },
      {
        "translation": "日本へ来る際に、お土産をたくさん買うつもりです。"
      },
      {
        "translation": "面接の際に、スーツを着用してください。"
      }
    ]
  },
  "ja_A_4": {
    "title": "A だの B だの (A dano B dano)",
    "shortExplanation": "例を並べて列挙する表現で、不満や非難、あきれた気持ちを含んで用いられることが多いです。「〜だの〜だの」「〜とか〜とか」。",
    "longExplanation": "「～だの～だの」は、同類の事柄や理由、動作などをいくつか並べて例示する話し言葉の文型です。「〜とか〜とか」と似ていますが、多くの場合、話し手の不満、愚痴、非難、あきれなどの否定的な感情や、うんざりしたニュアンスを伴って用いられます。",
    "formation": "名詞 ＋ だの ＋ 名詞 ＋ だの ｜ 動詞・形容詞普通形 ＋ だの ＋ 動詞・形容詞普通形 ＋ だの",
    "examples": [
      {
        "translation": "彼はいつも遅刻だの、仕事を忘れるだので困る。"
      },
      {
        "translation": "彼女は新しい服だの、化粧品だのによくお金を使います。"
      },
      {
        "translation": "彼が言うには、音楽だの映画だの本だのが好きらしい。"
      },
      {
        "translation": "子供にはお菓子だの、おもちゃだの、好きなものを限りなく与えてあげたい。"
      }
    ]
  },
  "ja_A_7": {
    "title": "A とも B とも (A tomo B tomo)",
    "shortExplanation": "2つの可能性や対象を並べ、「AともBともつかない」「AであれBであれ」という意味を表します。",
    "longExplanation": "「A とも B とも」は、2つの可能性や対象を並べて提示し、「AであるかBであるか区別・断定がつかない」あるいは「Aの場合もBの場合も同様である」という意味を表す文型です。後ろに「〜言えない」「〜つかない」などの判断を保留・否定する表現を伴ったり、結果を成り行きに任せる表現が続いたりすることが多いです。",
    "formation": "名詞 ＋ とも ＋ 名詞 ＋ とも ｜ 普通形 ＋ とも ＋ 普通形 ＋ とも",
    "examples": [
      {
        "translation": "決断とも誤りとも、結果は時間が教えてくれるでしょう。"
      },
      {
        "translation": "彼は父とも兄とも、もう何年も話していない。"
      },
      {
        "translation": "彼女とも友達とも映画を見に行くつもりです。"
      },
      {
        "translation": "このゲームには時間とも努力とも言えないほどの根気が必要です。"
      }
    ]
  },
  "ja_A_8": {
    "title": "A にしろ B にしろ (A nishiro B nishiro)",
    "shortExplanation": "対立する2つの事柄を例に挙げ、どちらの場合であっても結論や方針は変わらないことを表します。「〜にしても〜にしても」「〜であれ〜であれ」。",
    "longExplanation": "「A にしろ B にしろ」は、対立的あるいは異なる2つの事態を仮定または提示し、「Aの場合であっても、あるいはBの場合であっても、そのどちらにも関係なく同じ結論や義務、判断が当てはまる」と述べる文型です。日常会話から改まった文章まで幅広く用いられます。",
    "formation": "名詞 ＋ にしろ ＋ 名詞 ＋ にしろ ｜ 動詞・形容詞普通形 ＋ にしろ ＋ 動詞・形容詞普通形 ＋ にしろ",
    "examples": [
      {
        "translation": "暑いにしろ寒いにしろ、毎日運動するべきです。"
      },
      {
        "translation": "合格するにしろ不合格になるにしろ、最善を尽くしました。"
      },
      {
        "translation": "忙しいにしろ暇にしろ、時間を大切にすべきです。"
      },
      {
        "translation": "大きいにしろ小さいにしろ、その箱は全部ここに運んでください。"
      }
    ]
  },
  "ja_A_9": {
    "title": "A にせよ B にせよ (A ni seyo B ni seyo)",
    "shortExplanation": "改まった書き言葉で、AであってもBであっても後続の判断や事実に変わりがないことを表します。「〜にしても〜にしても」「〜であれ〜であれ」。",
    "longExplanation": "「A にせよ B にせよ」は、「～にしろ～にしろ」よりも硬い書き言葉の表現で、2つの可能性や事態を提示し、「Aの場合であってもBの場合であっても、いずれにしても同様の結論や状況が成り立つ」と述べる文型です。論説文や公的な演説などで好んで用いられます。",
    "formation": "名詞 ＋ にせよ ＋ 名詞 ＋ にせよ ｜ 動詞・形容詞普通形 ＋ にせよ ＋ 動詞・形容詞普通形 ＋ にせよ",
    "examples": [
      {
        "translation": "雨にせよ雪にせよ、試合は中止しない。"
      },
      {
        "translation": "彼にせよ彼女にせよ、誰か一人が行くべきだ。"
      },
      {
        "translation": "成果にせよ努力にせよ、どちらも重要だ。"
      },
      {
        "translation": "春にせよ秋にせよ、私は花が好きだ。"
      }
    ]
  },
  "ja_Noun1_12": {
    "title": "名詞1 ＋ が ＋ 名詞1 ＋ なら、 名詞2 ＋ も ＋ 名詞2 ＋ だ (A ga A nara, B mo B da)",
    "shortExplanation": "同一の名詞を反復して2つの事柄の同等性や対等な関係を表します。「AがAならBもBだ」。",
    "longExplanation": "「名詞1 が 名詞1 なら、名詞2 も 名詞2 だ」は、2つの名詞をそれぞれ繰り返すことによって、「Aがまさにそのような性質のものであるなら、対するBも同等にそのような性質のものである」と、両者の対等性、相応性、または拮抗する関係を修辞的に強調する文型です。反論や対抗意識を述べる際にもよく用いられます。",
    "formation": "名詞1 ＋ が ＋（名詞1の反復）＋ なら、名詞2 ＋ も ＋（名詞2の反復）＋ だ",
    "examples": [
      {
        "translation": "鬼が鬼なら、人間も人間だ。"
      },
      {
        "translation": "彼が社長なら、私も社長だ。"
      },
      {
        "translation": "貴様が戦士なら、俺も戦士だ。"
      },
      {
        "translation": "ハムスターがペットなら、猫もペットだ。"
      }
    ]
  },
  "ja_Noun1_13": {
    "title": "名詞1 ＋ も ＋ 名詞1 ＋ なら、名詞2 ＋ も ＋ 名詞2 ＋ だ (A mo A nara, B mo B da)",
    "shortExplanation": "双方ともに問題点や特異な点があることをあきれや批判を込めて表します。「AもAならBもBだ」。",
    "longExplanation": "「名詞1 も 名詞1 なら、名詞2 も 名詞2 だ」は、2つの対象を並べて「Aの側にも相当な非や特異な点があるが、それに対するBの側も同様に問題があり、どっちもどっちである」と、両者に対してあきれや批判的な気持ちを含んで述べる文型です。お互いに極端な性質を持っていることを対比する際にも使われます。",
    "formation": "名詞1 ＋ も ＋（名詞1の反復）＋ なら、名詞2 ＋ も ＋（名詞2の反復）＋ だ",
    "examples": [
      {
        "translation": "君も君なら、私も私だ。"
      },
      {
        "translation": "夏も夏なら、冬も冬だ。"
      },
      {
        "translation": "東京も東京なら、大阪も大阪だ。"
      },
      {
        "translation": "犬も犬なら、猫も猫だ。"
      }
    ]
  },
  "ja_Noun_14": {
    "title": "名詞1 ＋ あっての ＋ 名詞2 (A atte no B)",
    "shortExplanation": "名詞1が存在するからこそ名詞2が成り立つという、不可欠な前提関係を強調します。「〜があってこその〜」「〜があるからこその〜」。",
    "longExplanation": "「名詞1 ＋ あっての ＋ 名詞2」は、名詞1が名詞2にとって不可欠な基盤・条件・恩恵であり、名詞1がなければ名詞2も存在し得ないという強い依存・前提関係を表す文型です。「AがあってこそのBだ」という意味になり、深い感謝の念や、基本となる土台の大切さを強調する際によく用いられます。",
    "formation": "名詞1 ＋ あっての ＋ 名詞2",
    "examples": [
      {
        "translation": "家族あっての私です。"
      },
      {
        "translation": "お客様あってのビジネスです。"
      },
      {
        "translation": "練習あっての成功です。"
      },
      {
        "translation": "健康あっての仕事です。"
      }
    ]
  },
  "ja_Noun_19": {
    "title": "名詞1 ＋ からの ＋ 名詞2 (kara no)",
    "shortExplanation": "後ろの名詞を修飾して、出発点・出所・起源・発信元などを表します。「〜からの」「〜から届いた」。",
    "longExplanation": "「名詞1 ＋ からの ＋ 名詞2」は、起点や出所を表す助詞「から」に連体修飾の助詞「の」が付いた形で、後ろの名詞を修飾して、どこから生じたのか、どこから届いたのか、いつからのものなのかという起点や出所・起源を明示する文型です。「〜からの」「〜発信の」という意味を表します。",
    "formation": "名詞1 ＋ からの ＋ 名詞2",
    "examples": [
      {
        "translation": "日本からの手紙を受け取りました。"
      },
      {
        "translation": "彼は東京からの旅行者です。"
      },
      {
        "translation": "昨日、母からの電話がありました。"
      },
      {
        "translation": "彼女は大学からの友人です。"
      }
    ]
  },
  "ja_Noun_20": {
    "title": "名詞 ＋ から言わせれば (kara iwasereba)",
    "shortExplanation": "その人物や対象の立場・視点から意見や見解を述べる際に用います。「〜の立場から言えば」「〜に言わせたら」。",
    "longExplanation": "「名詞 ＋ から言わせれば」（「〜に言わせれば」「〜から言えば」とも）は、動詞「言う」の使役形「言わせる」の仮定形を用いた表現で、その人物や対象の固有の視点・立場に立って意見や不満、持論を主張する文型です。「〜の立場から見れば」「〜が口を挟むとすれば」という意味を表し、一般的な見方とは異なる独自の主張を強調する際によく使われます。",
    "formation": "名詞（人物や擬人化された対象） ＋ から言わせれば ｜ 名詞 ＋ から言えば",
    "examples": [
      {
        "translation": "先生から言わせれば、毎日勉強するべきだ。"
      },
      {
        "translation": "子供たちから言わせれば、もっと遊ぶ時間がほしい。"
      },
      {
        "translation": "僕から言わせれば、そのプランは実行可能だ。"
      },
      {
        "translation": "犬から言わせれば、もっと散歩したいはずだ。"
      }
    ]
  },
  "ja_Noun_43": {
    "title": "名詞1 ＋ ともあろう ＋ 名詞2 (~tomoarou~)",
    "shortExplanation": "高い地位や立場にふさわしくない不適切な言動に対して、強い非難やあきれを表します。「〜ほどの立場の人が」「〜ともあろう者が」。",
    "longExplanation": "「名詞1 ＋ ともあろう ＋ 名詞2」（名詞1には社会的責任や高い評価を伴う立場・身分・職名が入り、名詞2には「者」「人」などが来る）は、「そのように尊敬されるべき・責任ある立場にある立派な人物が、それに全くふさわしくない恥ずべき不祥事や失敗をするとは」と、強い非難・失望・驚きを込めて述べる文型です。「〜たる者が」「〜ほどの人物が」という意味を表し、不祥事やモラル欠如を叱責する際に用いられます。",
    "formation": "名詞1（地位・身分・役職） ＋ ともあろう ＋ 名詞2（者 ｜ 人 ｜ 方） ＋ が ｜ は",
    "examples": [
      {
        "translation": "先生ともあろう者が、そんな間違いをするなんて。"
      },
      {
        "translation": "大人ともあろう者が子供みたいにふるまってはいけない。"
      },
      {
        "translation": "社長ともあろう人がそんな失礼なことを言うなんて。"
      },
      {
        "translation": "プロの選手ともあろう者が、試合に遅刻するなんて。"
      }
    ]
  },
  "ja_Noun_44": {
    "title": "名詞 ＋ ともなると (〜to mo naru to)",
    "shortExplanation": "特別な時期・段階・立場になると、普段とは異なる状況が生じることを表します。「〜ともなると」「〜の時期になるとやはり」。",
    "longExplanation": "「名詞 ＋ ともなると」（名詞のほか動詞普通形にも接続する）は、季節や特別な行事、年齢、高い地位や特別な段階に至ると、普段とは明確に異なった事態や変化が生じることを表す文型です。「〜という段階・時期になると当然」「〜ともなればやはり」という意味合いを持ち、後続節にはその状況に伴って自然に生じる顕著な変化や必然的な現象が述べられます。",
    "formation": "名詞 ＋ ともなると ｜ 動詞普通形 ＋ ともなると",
    "examples": [
      {
        "translation": "クリスマスともなると、街中がきらきらと輝いて見えます。"
      },
      {
        "translation": "子供が自分の過ちを認めるともなると、話は別ですね。"
      },
      {
        "translation": "夏休みともなると、海辺は観光客で溢れかえります。"
      },
      {
        "translation": "試験週間ともなると、図書館はいつもより混雑します。"
      }
    ]
  },
  "ja_Noun_45": {
    "title": "名詞 ＋ ともなれば (〜to mo nareba)",
    "shortExplanation": "重要な段階や立場に至ると、当然それに伴う変化や事態が生じることを表します。「〜となればやはり」「〜の段階に至れば」。",
    "longExplanation": "「名詞 ＋ ともなれば」（名詞のほか動詞普通形にも接続する）は、動詞「なる」の仮定形を用いた表現で、人生の重大な局面や特別な地位、大きなイベントなどの段階に達すると、それにふさわしい相応の緊張感・責任・変化が当然のように生じることを強調する文型です。「〜という身分・状況になれば当然」「〜の段階に至ればやはり」という意味を表し、結婚や試験、昇進などの節目によく用いられます。",
    "formation": "名詞 ＋ ともなれば ｜ 動詞普通形 ＋ ともなれば",
    "examples": [
      {
        "translation": "試験ともなれば、大抵の人が緊張するものです。"
      },
      {
        "translation": "彼がリーダーともなれば、チームの性能はさらに向上するでしょう。"
      },
      {
        "translation": "夏休みともなれば、観光地はいつも人であふれている。"
      },
      {
        "translation": "結婚ともなれば、ただ二人が愛し合っているだけではすまされない事情も多い。"
      }
    ]
  },
  "ja_Noun_46": {
    "title": "名詞 ＋ と相まって (~ to aimatte)",
    "shortExplanation": "複数の要素が互いに作用し合い、相乗効果を生み出すことを表します。「〜と作用し合って」「〜と相まって一層」。",
    "longExplanation": "「名詞 ＋ と相まって」は、動詞「相まつ（互いに作用し合う、結びつく）」に由来し、2つ以上の要素や条件が互いに重なり合い、組み合わさることで、より際立った効果や優れた結果（相乗効果）をもたらすことを表す文型です。「〜と影響し合って」「〜が加わって一層」という意味を表し、「AとB（と）が相まって」「AがBと相まって」の形で、自然の美しさ、料理の風味、事業の成功などを格調高く描写する際によく用いられます。",
    "formation": "名詞 ＋ と相まって（「名詞1 と 名詞2（と）が相まって」または「名詞1 が 名詞2 と相まって」）",
    "examples": [
      {
        "translation": "天気の良さと相まって、ピクニックは大成功でした。"
      },
      {
        "translation": "努力と運と相まって、彼は試験に合格しました。"
      },
      {
        "translation": "ひまわり油とガーリックと相まって、この料理は美味しいです。"
      },
      {
        "translation": "新しい技術と経験と相まって、私たちはこの問題を克服できました。"
      }
    ]
  },
  "ja_Noun_47": {
    "title": "名詞 ＋ なくして～はない (nakushite ~ wa nai)",
    "shortExplanation": "「〜がなければ…は成り立たない」と、絶対に不可欠な前提条件であることを表します。「〜なくしては〜ない」。",
    "longExplanation": "「名詞 ＋ なくして～はない」（または「〜なくしては〜ない」）は、ある物事や結果が成り立つために「その名詞が絶対に必要不可欠である」と強調する硬い文語的な表現です。「〜がなければ…は存在しない／達成できない」という意味を表し、「努力」「愛」「信頼」「協力」などの高い価値を持つ抽象名詞に多く接続します。後続節には「〜はない」「〜はあり得ない」「〜はできない」などの強い否定表現が続きます。",
    "formation": "名詞 ＋ なくして(は) ＋ ［否定節：〜はない／〜できない］",
    "examples": [
      {
        "translation": "努力なくして成功はない。"
      },
      {
        "translation": "時間なくして完璧な作品は作れない。"
      },
      {
        "translation": "経験なくして成長はない。"
      },
      {
        "translation": "リーダーシップなくしてグループの成功はない。"
      }
    ]
  },
  "ja_Noun_48": {
    "title": "名詞 ＋ なしでは～ない (nashi de wa ~ nai)",
    "shortExplanation": "「〜がなければ…できない」と、物事を行う上で欠かせない存在であることを表します。「〜なしでは…ない」。",
    "longExplanation": "「名詞 ＋ なしでは～ない」は、「もしその名詞がなかったら、ある行為や状態が成り立たない、実現できない」と不可欠性を表す文型です。「水」「パソコン」などの具体的な生活必需品から、「助け」「友情」などの抽象的な支えまで幅広く用いられます。後続節には「〜生きられない」「〜できない」「〜成り立たない」など、可能動詞の否定形や不可能を表す表現を伴うのが一般的です。",
    "formation": "名詞 ＋ なしでは ＋ ［否定節：〜ない／〜られない／〜成り立たない］",
    "examples": [
      {
        "translation": "水なしでは生きられない。"
      },
      {
        "translation": "彼の助けなしでは、この問題を解決することはできない。"
      },
      {
        "translation": "コンピュータなしでは、現代のビジネスは成り立たない。"
      },
      {
        "translation": "友情なしでは、人生は退屈だろう。"
      }
    ]
  },
  "ja_Noun_49": {
    "title": "名詞 ＋ なしには～ない (nashi ni wa ~ nai)",
    "shortExplanation": "「〜がなければ…できない」と、前提として欠かせない条件であることを表します。「〜なしでは」よりやや改まった文語的表現。",
    "longExplanation": "「名詞 ＋ なしには～ない」は、「もしその名詞が欠けていたならば、後続の行為や事態は絶対に実現できない」という不可欠な条件関係を表す文型です。意味合いは「〜なしでは〜ない」とほぼ共通しますが、「なしには」の方がより改まった硬い響き（文語的ニュアンス）を持ちます。後続節には「〜生活ができない」「〜進められない」など、動詞の否定形（特に可能動詞の否定形）が続きます。",
    "formation": "名詞 ＋ なしには ＋ ［動詞否定形：〜ない／〜られない］",
    "examples": [
      {
        "translation": "お金なしには生活ができない。"
      },
      {
        "translation": "愛情なしには子育てができない。"
      },
      {
        "translation": "彼なしにはこのプロジェクトを進められない。"
      },
      {
        "translation": "水なしには生きていけない。"
      }
    ]
  },
  "ja_Noun_51": {
    "title": "名詞 ＋ ならでは (nara dewa)",
    "shortExplanation": "「〜だけが持つ特別な魅力・特徴だ」と、他にはない固有の素晴らしさを称賛します。「〜ならではの」「〜ならではだ」。",
    "longExplanation": "「名詞 ＋ ならでは」は、「その人、その場所、その物だけが独自に持っている素晴らしい特長や魅力である」と、他には真似のできない固有性や独自性を高く評価・称賛する文型です。「〜特有の」「〜でなければ味わえない」という意味を表し、名詞を修飾する「名詞1 ＋ ならではの ＋ 名詞2」の形や、文末で結ぶ「〜ならではだ」「〜ならではのものだ」の形で頻繁に用いられます。",
    "formation": "名詞 ＋ ならではの ＋ 名詞 ／ 名詞 ＋ ならではだ",
    "examples": [
      {
        "translation": "これは日本ならではの風景ですね。"
      },
      {
        "translation": "新鮮な魚はこの町ならではの特産品です。"
      },
      {
        "translation": "彼の技術は彼ならではのものだ。"
      },
      {
        "translation": "この手作りの一品は、彼女ならではのものです。"
      }
    ]
  },
  "ja_Noun_52": {
    "title": "名詞1 ＋ なり ＋ 名詞2 ＋ なり (nari ~ nari)",
    "shortExplanation": "同類の例をいくつか挙げて「〜でも〜でも」と選択肢を提示します。「〜なり〜なり」。",
    "longExplanation": "「名詞1 ＋ なり ＋ 名詞2 ＋ なり」は、同類の事柄の中から代表的な選択肢を2つ例示して、「AでもBでも、あるいはそれ以外のものでも構わないから、何かしら選んで行動してほしい」と提案・助言・勧誘する文型です。「〜とか〜とか」「〜であれ〜であれ」に相当し、後続節には「〜てください」「〜たらどうですか」などの働きかけを表す文が続くのが一般的です。",
    "formation": "名詞1 ＋ なり ＋ 名詞2 ＋ なり（＋ 助詞）",
    "examples": [
      {
        "translation": "映画なり、音楽なり、何か趣味はありますか。"
      },
      {
        "translation": "紅茶なり、コーヒーなり、何か飲み物をください。"
      },
      {
        "translation": "パンなり、おにぎりなり、何か食べてください。"
      },
      {
        "translation": "タクシーなり、バスなりに乗って来てください。"
      }
    ]
  },
  "ja_Noun_53": {
    "title": "名詞 ＋ なりとも (nari tomo)",
    "shortExplanation": "「せめて〜だけでも」と、最小限の希望や要求を控えめに表します。「〜なりとも」。「少しでも」「一言でも」。",
    "longExplanation": "「名詞 ＋ なりとも」は、極めて少ない数量や短い時間、ごくわずかな程度を表す語（「一言」「一目」「少し」「一時間」など）に付き、「十全でなくてもよいから、せめてそれだけでも実現してほしい／役立てたい」と最低限の希望や提案を控えめに示す文型です。「〜だけでも」「〜くらいでも」の意味で、謙虚さや丁寧さを伴う改まった表現です。文末には「〜たい」「〜てほしい」「〜べきだ」などが呼応します。",
    "formation": "名詞（最小限の数量・程度を表す語） ＋ なりとも",
    "examples": [
      {
        "translation": "時間が限られているので、一時間なりとも練習すべきだ。"
      },
      {
        "translation": "彼には一言なりとも謝罪の言葉を聞きたい。"
      },
      {
        "translation": "このプロジェクトには、一人なりともメンバーが必要だ。"
      },
      {
        "translation": "あなたには、一言なりとも感謝の言葉を述べたい。"
      }
    ]
  },
  "ja_Noun_54": {
    "title": "名詞 ＋ に ＋ 名詞 ＋ を重ねて (ni ~ o kasanete)",
    "shortExplanation": "同じ行為や事態が何度も繰り返され、蓄積することを表します。「〜に〜を重ねて」「〜を繰り返して」。",
    "longExplanation": "「名詞 ＋ に ＋ 名詞 ＋ を重ねて」（前後に同じ名詞を反復し、動詞「重ねる」を用いる）は、同一の行為、事態、経験が幾度も幾度も積み重なる様子を強調する文型です。「〜を何度も繰り返した結果」という意味を表します。「努力に努力を重ねて」のように肯定的な積み重ねにも用いられますが、「失敗に失敗を重ねて」「失望に失望を重ねて」のように、重なる困難や挫折が最終的な結果へと繋がった状況を表す際にもよく用いられます。",
    "formation": "名詞（同一名詞） ＋ に ＋ 名詞 ＋ を重ねて（または を重ねる／を重ねた結果）",
    "examples": [
      {
        "translation": "彼女は失敗に失敗を重ねて、とうとう会社を辞めた。"
      },
      {
        "translation": "仕事に仕事を重ねて、彼は疲れ果てた。"
      },
      {
        "translation": "彼は試験に不合格になり、失望に失望を重ねていた。"
      },
      {
        "translation": "彼は問題に問題を重ねて、とうとう退学になった。"
      }
    ]
  },
  "ja_Noun_55": {
    "title": "名詞 ＋ にあっては (ni atte wa)",
    "shortExplanation": "「〜という特別な状況・時代・立場においては」と、特殊な環境下にあることを表します。硬い文語表現。",
    "longExplanation": "「名詞 ＋ にあっては」は、「〜という特別な状況や立場、非常時、時代に置かれては」という意味を表す硬い書き言葉の文型です。「〜においては」の改まった表現で、戦争、不況、経済危機、変革期といった困難な情勢や重大な転換期を表す名詞に付くことが多く、その特殊な環境・状況が後続の事態や判断に強く影響を及ぼしていることを強調します。",
    "formation": "名詞（時期・状況・環境など） ＋ にあっては",
    "examples": [
      {
        "translation": "戦争時にあっては、すべての人々が困難に直面していました。"
      },
      {
        "translation": "経済危機にあっては、多くの企業が倒産の危機に瀕している。"
      },
      {
        "translation": "不況下にあっては、どの企業も経費削減を迫られている。"
      },
      {
        "translation": "改革期にあっては、新しいアイデアを大切にする必要がある。"
      }
    ]
  },
  "ja_Noun_56": {
    "title": "名詞1 ＋ にあるまじき ＋ 名詞2 (ni aru majiki)",
    "shortExplanation": "「〜の立場として決してあってはならない」と、身分や資格に反する不適切な言動を強く非難します。「〜にあるまじき」。",
    "longExplanation": "「名詞1 ＋ にあるまじき ＋ 名詞2」は、古語の打消推量・当然の打消の助動詞「まじ」の連体形に由来する格調高い文語表現です。「名詞1（立場・身分・職業・人倫）にある者として、決してあってはならない・許されない名詞2（行為・言動・態度など）だ」と、道義的・職務的に激しく非難・批判する際に用いられます。名詞1には「教師」「医者」「政治家」「人間」「社会人」などが、名詞2には「行為」「言動」「態度」「振る舞い」などが来ます。",
    "formation": "名詞1（立場・身分・資格） ＋ にあるまじき ＋ 名詞2（行為・言動など）",
    "examples": [
      {
        "translation": "彼は教師にあるまじき言動をとった。"
      },
      {
        "translation": "これは人間にあるまじき行為だ。"
      },
      {
        "translation": "彼女は社長にあるまじき振る舞いをした。"
      },
      {
        "translation": "それは社会人にあるまじき行動だ。"
      }
    ]
  },
  "ja_Noun_57": {
    "title": "名詞 ＋ にして (ni shite)",
    "shortExplanation": "「〜ほどの高い能力・身分の人であっても」と、意外な結果に対する驚きを表します。硬い文語表現。「〜にして」。",
    "longExplanation": "「名詞 ＋ にして」は、高い専門性、優れた才能、豊富な経験を持つ人物を表す名詞に付き、「〜という高いレベルや立場にある人でさえ」と意外な事態に対する驚きや信じがたい気持ちを表す文型です。「〜であって」「〜ほどの人物でさえ」を意味し、後続節にはその高い能力や立場からは予想もつかない失敗、不理解、事故などの意外な結果が続きます。",
    "formation": "名詞（高い能力・資格・経験を持つ人など） ＋ にして",
    "examples": [
      {
        "translation": "彼は医者にしてその基本的な知識がないのが信じられない。"
      },
      {
        "translation": "彼は経験豊富な運転手にして、事故を起こした。"
      },
      {
        "translation": "彼は成績優秀な生徒にして、その問題が解けなかった。"
      },
      {
        "translation": "彼は勉強家にして、その問題を理解できなかった。"
      }
    ]
  },
  "ja_Noun_58": {
    "title": "名詞 ＋ にして初めて (ni shite hajimete)",
    "shortExplanation": "「その年齢・立場・時期になってようやく初めて」と、遅まきながら実感・経験したことを表します。「〜にして初めて」。",
    "longExplanation": "「名詞 ＋ にして初めて」は、年齢や人生の段階、社会的立場を表す名詞（「40歳」「大人」「親」「社長」など）に付き、「その年齢や境遇に至ってようやく、それまで分からなかったことを痛感したり、初めて経験したりした」と深い感慨を込めて表す文型です。「〜になって初めて」「〜に至ってようやく」という意味を表し、後続節には深い気づきや初体験を表す動詞（「分かった」「痛感した」「経験した」など）が続きます。",
    "formation": "名詞（年齢・立場・段階など） ＋ にして初めて",
    "examples": [
      {
        "translation": "大人にして初めて、親の苦労が分かった。"
      },
      {
        "translation": "彼は40歳にして初めて、海外旅行を経験した。"
      },
      {
        "translation": "彼女は親にして初めて、子育ての大変さを理解した。"
      },
      {
        "translation": "社長にして初めて、会社全体の重責を痛感した。"
      }
    ]
  },
  "ja_Noun_59": {
    "title": "名詞 ＋ にすら (ni sura)",
    "shortExplanation": "「〜にさえ」と極端な例を挙げて驚きや否定を強調します。格助詞「に」と副助詞「すら」の複合形で、文語的な表現。",
    "longExplanation": "「名詞 ＋ にすら」は、対象や帰着点を表す格助詞「に」に、極端な例を提示して他を推し量らせる副助詞「すら」（＝さえ）が組み合わさった文型です。「〜という最も確実・基本的な対象にさえ…ない」と、事態の深刻さや意外性、落胆を際立たせるために用いられます。主に否定表現と呼応し、日常会話で多用される「〜にさえ」と比べて改まった響きを持つ文語的・文章語的な表現です。",
    "formation": "名詞 ＋ にすら",
    "examples": [
      {
        "translation": "彼にすらその問題は解けなかった。"
      },
      {
        "translation": "彼女はテストにすら合格しなかった。"
      },
      {
        "translation": "この犬は自分の名前にすら反応しない。"
      },
      {
        "translation": "彼にすら話す余裕がなかった。"
      }
    ]
  },
  "ja_Noun_60": {
    "title": "名詞1 ＋ にとどまらず ＋ 名詞2 ＋ も (ni todomarazu ~ mo)",
    "shortExplanation": "「〜の範囲内だけに留まらず、さらに広く…も」と、影響や広がりを表します。「〜にとどまらず〜も」。「〜だけでなく」。",
    "longExplanation": "「名詞1 ＋ にとどまらず ＋ 名詞2 ＋ も」は、動詞「留まる（とどまる）」の打消連用形「ず」に由来し、ある現象や影響力、活動の範囲が前者の枠内だけに留まることなく、さらに広い範囲や別の領域にまで拡大・波及していることを表す文型です。「〜だけに限定されず、さらに〜も」という意味を表し、ニュース報道や論説文、スピーチなどの硬い文章・改まった場面で多用されます。",
    "formation": "名詞1 ＋ にとどまらず ＋ 名詞2 ＋ も",
    "examples": [
      {
        "translation": "このアプリは、日本語にとどまらず、他の言語もサポートしています。"
      },
      {
        "translation": "彼は、音楽にとどまらず、映画製作にも興味がある。"
      },
      {
        "translation": "彼の影響は、家族にとどまらず、地域全体にも及んでいます。"
      },
      {
        "translation": "彼女の才能は、絵画にとどまらず、文学にも及ぶ。"
      }
    ]
  },
  "ja_Noun_61": {
    "title": "名詞1 ＋ にひきかえ ＋ 名詞2 ＋ は (ni hikikae ~ wa)",
    "shortExplanation": "「〜とは対照的に」「〜とは大きく違って」と、2つの事柄の極端な違いを対比させます。「〜にひきかえ」。",
    "longExplanation": "「名詞1 ＋ にひきかえ ＋ 名詞2 ＋ は」は、動詞「引き換える」に由来し、性質や状態が正反対または著しく異なる2つの人物や事物を引き合いに出して、その大きな落差や対照性を際立たせる文型です。「〜とはまったく対照的に」「〜とは正反対に」という意味を表し、一方を肯定・賞賛し他方を批判・落胆する場合など、話し手の強い主観的な感情や評価が込められることが多い表現です。",
    "formation": "名詞1 ＋ にひきかえ ＋ 名詞2 ＋ は",
    "examples": [
      {
        "translation": "彼の親切さにひきかえ、彼女は無感情だ。"
      },
      {
        "translation": "夏にひきかえ、冬は雪で寒い。"
      },
      {
        "translation": "日本の駅にひきかえ、アメリカの駅は広い。"
      },
      {
        "translation": "昔にひきかえ、現代はテクノロジーが進歩した。"
      }
    ]
  },
  "ja_Noun_62": {
    "title": "名詞 ＋ にもまして (〜ni mo mashite)",
    "shortExplanation": "基準となるものよりもさらに程度が上回っていることを強調し、「〜以上に」「〜にも増して」という意味を表します。",
    "longExplanation": "「名詞 ＋ にもまして」は、比較の基準となる名詞を取り上げ、後項の事態や性質の程度がそれをさらに上回っていることを強調する文型です。基準となる名詞自体も元々高い程度や通常と異なる状態であることが多く、後項は「それよりもさらに一段と〜だ」という強い強調のニュアンスを持ちます。「以前」「去年」「昨日」などの過去の時点を表す名詞に付いて以前の状態と比較したり、疑問詞「何」と結びついた慣用表現「何にもまして（何よりも一番に）」の形でも多用されます。",
    "formation": "名詞 ＋ にもまして（または 疑問詞 ＋ にもまして）",
    "examples": [
      {
        "translation": "私は彼にもまして、音楽を愛しています。"
      },
      {
        "translation": "彼女は年齢にもまして、経験豊富です。"
      },
      {
        "translation": "今日は昨日にもまして寒いです。"
      },
      {
        "translation": "このビルは高さにもまして、美しい設計が有名です。"
      }
    ]
  },
  "ja_Noun_63": {
    "title": "名詞 ＋ によらず (～ni yorazu)",
    "shortExplanation": "前項の条件や差異に左右されないことを表し、「〜に関係なく」「〜にかかわらず」「〜を問わず」という意味を表します。",
    "longExplanation": "「名詞 ＋ によらず」は、動詞「による」の古風な否定形を用いた文型で、前項に挙げられた条件・基準・差異・区別などに拘束されたり左右されたりすることなく、後項の結果や状態が一律に成立・適用されることを表します。「〜に関係なく」「〜にかかわらず」という意味で、「年齢」「国籍」「性別」「理由」「天候」「季節」など多様な区分や選択肢を持つ名詞に多く接続します。改まった場面や公的な規則・文書などで用いられる硬い文章語的表現です。",
    "formation": "名詞 ＋ によらず",
    "examples": [
      {
        "translation": "結果は勉強時間によらず変わらないでしょう。"
      },
      {
        "translation": "季節によらず、この地域は常に暖かいです。"
      },
      {
        "translation": "年齢によらず、皆が楽しめるイベントです。"
      },
      {
        "translation": "国籍によらず、誰でも参加できます。"
      }
    ]
  },
  "ja_Noun_64": {
    "title": "名詞 ＋ に先駆けて (〜ni sakigakete)",
    "shortExplanation": "他よりも時期的に先んじて新しい試みや行動を起こすことを表し、「〜より先に」「〜に先立って（率先して）」という意味を表します。",
    "longExplanation": "「名詞 ＋ に先駆けて」は、動詞「先駆ける（他より先に行う・流行の先頭に立つ）」に由来し、他の人・団体・競合・地域などに先んじて、いち早く新しい行動や公開・開発・事業などを始めることを表す文型です。単なる事前の準備段階を表す「〜に先立って」と異なり、他者よりも一歩リードして先陣を切るという「先駆的・率先的」なニュアンスを強く帯びます。「〜に先駆け」の形でも用いられ、ニュース報道やビジネス・公式文書などの改まった文脈で広く使われます。",
    "formation": "名詞 ＋ に先駆けて（または に先駆け）",
    "examples": [
      {
        "translation": "この映画は日本に先駆けて、アメリカで公開されました。"
      },
      {
        "translation": "彼は周りの人々に先駆けて、その発表を聞いた。"
      },
      {
        "translation": "ジョンソンさんは他の参加者に先駆けて、会場に到着しました。"
      },
      {
        "translation": "彼女は同級生に先駆けて卒業することができました。"
      }
    ]
  },
  "ja_Noun_65": {
    "title": "名詞1 ＋ に即した ＋ 名詞2 (A ni sokushita B)",
    "shortExplanation": "後ろの名詞を修飾し、現実や規則などの基準にぴったり合致していることを表します。「〜に即した」「〜に合致した」「〜に基づいた」。",
    "longExplanation": "「名詞1 ＋ に即した ＋ 名詞2」は、動詞「即する（適合する・基準に従う）」の連体形を用いた文型で、名詞2（計画・方針・対策・教育・行動など）が、名詞1（現実・事実・規則・社会のニーズなど）にぴったりと寄り添い、合致していることを表します。「〜に合致した」「〜に基づいた」「〜に沿った」という意味で、ビジネス・行政・教育・法規などの公的な論説文や方針説明で多用される改まった硬い表現です。",
    "formation": "名詞1 ＋ に即した ＋ 名詞2",
    "examples": [
      {
        "translation": "社会のニーズに即した教育改革が必要だ。"
      },
      {
        "translation": "国際法に即した対応をとるべきだ。"
      },
      {
        "translation": "チームのポリシーに即した行動を取りましょう。"
      },
      {
        "translation": "現実に即した計画を立てなければならない。"
      }
    ]
  },
  "ja_Noun_66": {
    "title": "名詞 ＋ に即して ＋ 動詞 (〜ni sokushite〜)",
    "shortExplanation": "後ろの動詞を修飾し、事実や規則・方針に沿って行動することを表します。「〜に即して」「〜に基づいて」「〜に従って」。",
    "longExplanation": "「名詞 ＋ に即して ＋ 動詞」は、動詞「即する」の連用形（副詞的用法）を用いた文型で、前項に挙げられた事実・現実・規則・方針などにしっかりと沿い、それに適合させるようにして後項の動作や判断を行うことを表します。「〜に沿って」「〜に基づいて」「〜に従って」という意味で、名詞を修飾する「〜に即した」に対して、本表現は述語動詞を修飾します。ビジネス、行政、裁判、公式発表などの改まった場面で多用されます。",
    "formation": "名詞 ＋ に即して ＋ 動詞",
    "examples": [
      {
        "translation": "会社のポリシーに即して行動しましょう。"
      },
      {
        "translation": "法律に即して判断を下すことが重要です。"
      },
      {
        "translation": "彼の意見に即して、プランを変更しました。"
      },
      {
        "translation": "ルールに即して行動すれば、問題は起きません。"
      }
    ]
  },
  "ja_Noun_67": {
    "title": "名詞 ＋ に言わせれば (Noun ni iwasereba)",
    "shortExplanation": "ある人物の立場や見解から意見を述べることを表し、「〜の意見では」「〜の立場から言えば」という意味を表します。",
    "longExplanation": "「名詞 ＋ に言わせれば」は、動詞「言う」の使役形と仮定形を組み合わせた文型で、人物を表す名詞に接続し、「その人の立場や考え方から意見を述べさせてもらうならば」という前提で主観的な主張や見解・評価を提示する際に用いられます。「〜の立場から言えば」「〜の意見によれば」という意味で、専門家ならではの厳しい指摘や、世間一般とは異なるその人特有の持論・批評を述べる場面でよく使われます。会話では「〜に言わせたら」の形も多用されます。",
    "formation": "名詞（人物など） ＋ に言わせれば（話し言葉：に言わせたら）",
    "examples": [
      {
        "translation": "先生に言わせれば、毎日勉強することが重要だと言う。"
      },
      {
        "translation": "彼に言わせれば、早く結婚する方がいいと思っている。"
      },
      {
        "translation": "評論家に言わせれば、この映画は今年の最高の映画だそうだ。"
      },
      {
        "translation": "父に言わせれば、海外で働く経験はとても価値がある。"
      }
    ]
  },
  "ja_Noun_68": {
    "title": "名詞 ＋ に限ったことではない (〜ni kagitta koto dewa nai)",
    "shortExplanation": "その事態や特徴が提示された名詞だけに限定されるものではないことを表し、「〜だけに限らない」「〜だけに当てはまるわけではない」という意味を表します。",
    "longExplanation": "「名詞 ＋ に限ったことではない」は、問題・現象・傾向・特徴などが、前項に挙げられた特定の名詞だけに当てはまるのではなく、他の人々・国・分野・状況などにも広く共通して見られる事柄であることを断定的に示す文型です。「〜だけに限定されたことではない」「〜だけに限った話ではない」という意味で、視野を広げたり、偏見や誤解を正したりする論説文や社会的な議論で多用されます。会話では「〜に限ったことじゃない」の形も用いられます。",
    "formation": "名詞 ＋ に限ったことではない（話し言葉：に限ったことじゃない）",
    "examples": [
      {
        "translation": "この問題は日本に限ったことではない。"
      },
      {
        "translation": "英語はアメリカに限ったことではない。"
      },
      {
        "translation": "スマホの依存症は若者に限ったことではない。"
      },
      {
        "translation": "地球温暖化は我々人間に限ったことではない。"
      }
    ]
  },
  "ja_Noun_69": {
    "title": "名詞 ＋ に限ったことでもない (~ni kagitta koto demo nai)",
    "shortExplanation": "語感を和らげて限定的ではないことを示し、「〜だけに限った話でもない」「〜だけのこととも言えない」という意味を表します。",
    "longExplanation": "「名詞 ＋ に限ったことでもない」は、「〜に限ったことではない」と実質的な意味は同様ですが、助詞「でも」を用いることで断定の響きを和らげ、より穏やかで控えめな語調で提示する文型です。「〜だけに当てはまるわけでもない」「〜に限ったこととも言えない」という意味で、提示された名詞以外の面や対象にも同様の状況が十分に当てはまることを婉曲に示唆する際に用いられます。",
    "formation": "名詞 ＋ に限ったことでもない",
    "examples": [
      {
        "translation": "この試験が難しいのは、数学に限ったことでもない。"
      },
      {
        "translation": "彼女が可愛いのは顔だけに限ったことでもない。性格も好きだ。"
      },
      {
        "translation": "その問題が起こるのは、我々の国に限ったことでもない。"
      },
      {
        "translation": "この作家の本が売れているのは日本に限ったことでもない。"
      }
    ]
  },
  "ja_Noun_70": {
    "title": "名詞 ／ 動詞 ＋ に限る (~ni kagiru)",
    "shortExplanation": "特定の状況においてそれが最善・最高であると断定し、「〜が一番だ」「〜に如くはない」という意味を表します。",
    "longExplanation": "「名詞 ／ 動詞辞書形 ＋ に限る」は、話し手の主観的な確信・経験・実感を基にして、「ある特定の状況や条件においては、それが最も優れており、他の何よりも素晴らしい」と推奨・断定する文型です。「〜が一番だ」「〜が最高だ」「〜に越したことはない」という意味で、日常会話において生活の知恵やおすすめ、リフレッシュ法などを熱意を込めて語る際によく使われます。",
    "formation": "名詞 ／ 動詞辞書形 ＋ に限る",
    "examples": [
      {
        "translation": "こういう時には家族に話すに限る。"
      },
      {
        "translation": "寒い冬には温かいお茶に限る。"
      },
      {
        "translation": "疲れたときは、よい睡眠に限る。"
      },
      {
        "translation": "ダイエットするなら、運動に限る。"
      }
    ]
  },
  "ja_Noun_71": {
    "title": "名詞1 ＋ (を)ぬいた ＋ 名詞2 (A nuita B)",
    "shortExplanation": "特定の成分や要素を取り除いた物であることを表し、「〜を省いた〜」「〜を取り除いた〜」という意味を表します。",
    "longExplanation": "「名詞1 ＋ (を)ぬいた ＋ 名詞2」は、動詞「抜く（不要なものや特定の成分を取り出す・省く）」の連体形を用いて後ろの名詞2を修飾し、名詞2が、特定の具材・成分・添加物・汚れなど（名詞1）を除去したり入れないようにしたりしたものであることを表す文型です。「〜を抜いた〜」「〜を除いた〜」という意味で、料理の具材抜き（ワサビ抜き、人参抜きなど）や、不純物・シミの除去など日常生活で幅広く用いられます。",
    "formation": "名詞1 ＋ (を)ぬいた ＋ 名詞2",
    "examples": [
      {
        "translation": "このサラダはにんじんをぬいたサラダです。"
      },
      {
        "translation": "彼はコーヒーから砂糖をぬいた。"
      },
      {
        "translation": "私は料理から塩をぬいた。"
      },
      {
        "translation": "彼女は服からシミをぬいた。"
      }
    ]
  },
  "ja_Noun_72": {
    "title": "名詞 ＋ ぬいて (~nuite)",
    "shortExplanation": "全体の中から特定の対象や時間を除外することを表し、「〜を除いて」「〜を抜きにして」という意味を表します。",
    "longExplanation": "「名詞 ＋ (を)ぬいて」は、動詞「抜く」のて形を用いた表現で、「〜抜きにして」「〜を除外して」と同様に、全体の中から特定の人・項目・時間などを省き、それ以外の全体について状況を述べる文型です。「〜を除いて」「〜を抜きにして」という意味を表し、特定の人物の不在や、ある一つの例外を除いた全体の特徴を語る際に用いられます。",
    "formation": "名詞 ＋ (を)ぬいて",
    "examples": [
      {
        "translation": "私たちは、彼ぬいて全員が集まることができました。"
      },
      {
        "translation": "このレストランはお子様メニューをぬいてすべてが美味しい。"
      },
      {
        "translation": "今日の仕事は昼休みをぬいて忙しかった。"
      },
      {
        "translation": "休暇の日をぬいて、毎日彼は働きます。"
      }
    ]
  },
  "ja_ぬくnuku_73": {
    "title": "動詞ます形 ＋ ぬく (~nuku)",
    "shortExplanation": "最後までやり遂げることや、徹底的にその状態に至ることを表し、「最後まで〜し通す」「徹底的に〜する」という意味を表します。",
    "longExplanation": "「動詞ます形（連用形語幹） ＋ ぬく」は、動詞の後ろに付いて複合動詞を作る文型で、主に2つの用法があります。①苦難や困難・長時間の負担に耐えながら、最後まで強い意志を持って動作を完遂することを表します（「やり抜く」「生き抜く」「走り抜く」など）。②ある状態や心理的動作を極限・限界まで徹底的に行い尽くすことを表します（「悩み抜く」「困り抜く」「考え抜く」など）。粘り強い意志や行為の徹底性を強調する表現です。",
    "formation": "動詞ます形（連用形語幹） ＋ ぬく",
    "examples": [
      {
        "translation": "彼は一日中本を読みぬく。"
      },
      {
        "translation": "私はこのプロジェクトを終わらせぬく。"
      },
      {
        "translation": "彼女は毎日ジムに行き、エクササイズを終わりぬく。"
      },
      {
        "translation": "私たちはこのゲームを解きぬく。"
      }
    ]
  },
  "ja_Nounのいかんだ_74": {
    "title": "名詞 ＋ のいかんだ (Noun no ikan da)",
    "shortExplanation": "文末で事態の成り行きや決定がその内容次第であることを表し、「〜次第だ」「〜によって決まる」という意味を表します。",
    "longExplanation": "「名詞 ＋ のいかんだ」（または接続形「〜のいかんで」）は、漢語「如何（いかん）」を用いた改まった文語的表現で、文末で述語となり、事態の成否・方向性・決定が、前項の名詞が示す事情・結果・努力・態度などのあり方に全面的にかかっていることを表します。「〜次第だ」「〜によって左右される」という意味で、「結果」「業績」「態度」「努力」など成り行きが変わり得る名詞に接続します。条件や可能性を示す場合は「〜のいかんでは」の形も用いられます。",
    "formation": "名詞 ＋ のいかんだ（または のいかんで ｜ のいかんでは）",
    "examples": [
      {
        "translation": "彼が来るのいかんで決めよう。"
      },
      {
        "translation": "試験の結果のいかんで留年が決まります。"
      },
      {
        "translation": "天気のいかんでは、ピクニックをキャンセルします。"
      },
      {
        "translation": "彼の回答のいかんで、我々の次の行動が決まる。"
      }
    ]
  },
  "ja_Noun_75": {
    "title": "名詞 ＋ のいかんでは (Noun no ikan de wa)",
    "shortExplanation": "前項の状況や結果次第で、ある事態が生じる可能性があることを表し、「〜次第では」「〜によっては」という意味を表します。",
    "longExplanation": "「名詞 ＋ のいかんでは」は、前項の名詞が示す条件や成り行きのあり方次第によって、後項に一定の結果が生じたり特定の対応が取られたりする可能性があることを表す文型です。「〜次第では」「〜の成り行きによっては」という意味を表し、文末には「〜かもしれない」「〜こともある」といった可能性や推量を表す表現が結びつくことが多く見られます。公的な通知やビジネスの契約・方針などで用いられる硬い文章語です。",
    "formation": "名詞 ＋ のいかんでは",
    "examples": [
      {
        "translation": "試験の結果のいかんでは、大学の入学許可を得られるかどうかが決まります。"
      },
      {
        "translation": "天気のいかんでは、ピクニックを延期するかもしれません。"
      },
      {
        "translation": "交通事情のいかんでは、遅れることがあります。"
      },
      {
        "translation": "経済の状況のいかんでは、会社の将来は決まります。"
      }
    ]
  },
  "ja_Noun_76": {
    "title": "名詞 ＋ のいかんにかかわらず (Noun no ikan ni kakawarazu)",
    "shortExplanation": "前項の状況や結果に左右されず一律に行われることを表し、「〜がどうであるかに関係なく」「〜にかかわらず」という意味を表します。",
    "longExplanation": "「名詞 ＋ のいかんにかかわらず」（同義表現：「〜のいかんによらず」）は、前項の名詞が示す理由・結果・状況・成否などがどうであるかに関係なく、それに拘束されたり左右されたりすることなく、後項の方針・事態・規則が一律に変わらず実行・適用されることを表す文型です。「〜の如何に関係なく」「〜にかかわらず」という意味で、通常の「〜にかかわらず」よりも一段と改まった公式的・規約的な響きを持ち、法規・公的約款・声明文などで用いられます。",
    "formation": "名詞 ＋ のいかんにかかわらず（または のいかんによらず）",
    "examples": [
      {
        "translation": "結果のいかんにかかわらず、彼は決定を後悔しなかった。"
      },
      {
        "translation": "年齢のいかんにかかわらず、どんな人でも学ぶことは可能です。"
      },
      {
        "translation": "経験のいかんにかかわらず、始めることが大切です。"
      },
      {
        "translation": "天候のいかんにかかわらず、ハイキングは予定通りに行われます。"
      }
    ]
  },
  "ja_Noun_77": {
    "title": "名詞 ＋ のいかんによっては (Noun no ikan ni yotte wa)",
    "shortExplanation": "事柄の状態や成り行き次第では、ある結果や対応が生じる可能性があることを表します。「〜のいかんによっては」「〜次第では」。",
    "longExplanation": "「名詞 ＋ のいかんによっては」（「いかん」は漢字で「如何」）は、前項の名詞が表す事態の状態、結果、推移などのあり方次第で、後項のような結果が生じたり、特定の対応が取られたりする可能性があることを表す文型です。「〜のいかんによって」に比べて「〜によっては」とすることで、特定の事態や可能性が生じ得ることに焦点を当てています。公的な通知やビジネス文書、改まった場面で用いられます。",
    "formation": "名詞 ＋ のいかんによっては",
    "examples": [
      {
        "translation": "天気のいかんによっては、ピクニックを延期しましょう。"
      },
      {
        "translation": "試験の結果のいかんによっては、進学できます。"
      },
      {
        "translation": "状況のいかんによっては、早期退職を考えます。"
      },
      {
        "translation": "彼の反応のいかんによっては、私たちの次の行動を決めます。"
      }
    ]
  },
  "ja_Noun_78": {
    "title": "名詞 ＋ のいかんによらず (~ no ikan ni yorazu)",
    "shortExplanation": "事態の成り行きや状態のいかんに関係なく、後項が成立することを表します。「〜のいかんに関わらず」「〜がどうであっても」。",
    "longExplanation": "「名詞 ＋ のいかんによらず」は、前項の名詞が示す状態、結果、理由などがどうであるかに関係なく、後項の事態が実行されたり成り立ったりすることを表す文型です。「〜のいかんに関わらず」とほぼ同義で、多様な変化や可能性を持つ語（「理由」「結果」「天候」「成否」など）に付きます。公的な規則、規約、宣言などの極めて改まった文章や硬い表現として用いられます。",
    "formation": "名詞 ＋ のいかんによらず",
    "examples": [
      {
        "translation": "試験の結果のいかんによらず、自分を信じ続けてください。"
      },
      {
        "translation": "天気のいかんによらず、毎日、ジョギングをします。"
      },
      {
        "translation": "彼の年齢のいかんによらず、彼は非常に経験豊富です。"
      },
      {
        "translation": "国籍のいかんによらず、誰でもイベントに参加できます。"
      }
    ]
  },
  "ja_Noun_79": {
    "title": "名詞1 ＋ のごとき ＋ 名詞2 (A no gotoki B)",
    "shortExplanation": "強い比喩を表す文語的な表現で、後項の名詞を修飾します。「〜のような」「〜のごとき」。",
    "longExplanation": "「名詞1 ＋ のごとき ＋ 名詞2」は、古典助動詞「ごとし」の連体形を用いた古風で格調高い文語的表現で、現代語の「〜のような」に相当します。後項の名詞が前項の名詞と極めて似ていること、あるいはそのようであるさまを格調高く比喩的に表現する際に用いられます。連用修飾には「〜のごとく」、文末の断定には「〜のごとし」が用いられます。現代では日常会話ではあまり使われず、文学作品、小説、演説、格言などで用いられます。",
    "formation": "名詞1 ＋ のごとき ＋ 名詞2（または 動詞普通形 ＋ ごとき ＋ 名詞）",
    "examples": [
      {
        "translation": "彼は神のごとき存在だ。"
      },
      {
        "translation": "彼女の美しさは花のごときものだ。"
      },
      {
        "translation": "彼は悪魔のごとき行動をした。"
      },
      {
        "translation": "この地方は春のごとき気候だ。"
      }
    ]
  },
  "ja_Noun_80": {
    "title": "名詞 ＋ のことだから (〜no koto dakara)",
    "shortExplanation": "その人の性格や特徴をよく知っていることから、高い確信を持って推測することを表します。「〜のことだから」「〜だからきっと」。",
    "longExplanation": "「名詞 ＋ のことだから」は、話し手が前項の人物（または組織・店など）の普段の性格、行動パターン、特徴などを熟知していることを根拠として、「あの人のことだから、きっと〜だろう」と判断や推測を下す際に用いる文型です。前項には主に話し手がよく知っている人物の名詞が来ます。後項には「〜だろう」「〜はずだ」「〜に違いない」などの推量・判断の文末表現がよく呼応します。",
    "formation": "名詞（主に人物・組織） ＋ のことだから",
    "examples": [
      {
        "translation": "彼のことだから、きっと大丈夫だと思う。"
      },
      {
        "translation": "この店のことだから、料理は美味しいはずです。"
      },
      {
        "translation": "彼女のことだから、もうすぐ到着するでしょう。"
      },
      {
        "translation": "この会社のことだから、もうすぐ新製品が発表されるでしょう。"
      }
    ]
  },
  "ja_Noun_81": {
    "title": "名詞 ＋ の嫌いがある (Noun no kirai ga aru)",
    "shortExplanation": "特定の物事に対して嫌悪感や苦手意識を持っていることを表します。「〜を嫌う傾向がある」「〜が嫌いである」。",
    "longExplanation": "「名詞 ＋ の嫌いがある」（嫌いがある）は、やや改まった古風な言い回しで、前項の名詞で示される特定の対象や環境などに対して、嫌悪感や苦手意識、敬遠する傾向があることを表す文型です。日常会話では通常「〜が嫌いだ」「〜が苦手だ」と平易に表現されます。（なお、JLPT N1の文法としては動詞辞書形などに接続して「好ましくない傾向・性質がある」という意味で使われることが多いですが、本項目では名詞に付き特定の対象を嫌う心理的傾向を表す用法を扱っています）。",
    "formation": "名詞 ＋ の嫌いがある（または のきらいがある）",
    "examples": [
      {
        "translation": "彼は魚の嫌いがあるので、寿司を食べません。"
      },
      {
        "translation": "彼女は高いところの嫌いがあるから、山登りはしない。"
      },
      {
        "translation": "私の父は人ごみの嫌いがあるので、混雑した場所には行かない。"
      },
      {
        "translation": "子供の頃、私は野菜の嫌いがあったが、今は好きだ。"
      }
    ]
  },
  "ja_Noun_82": {
    "title": "名詞 ＋ の手前 (~no temae)",
    "shortExplanation": "ある重要な出来事や行動の直前の時点であることを表します。「〜の直前で」「〜を間近に控えて」。",
    "longExplanation": "「名詞 ＋ の手前」（または動詞辞書形＋手前）は、重要な出来事、行事、期限などが起こる時間的な直前・直前の段階にあることを表す文型です。「試験の手前」「選挙の手前」「締め切りの手前」のように、重要な節目や行事を表す名詞によく接続します。（なお、「〜手前」には時間的な直前を表す用法のほかに、立場や世間体、相手への配慮から「〜の手前、そうせざるを得ない（面目を保つため）」という意味を表す重要な文法用法もあります）。",
    "formation": "名詞 ＋ の手前（または 動詞辞書形 ＋ 手前）",
    "examples": [
      {
        "translation": "試験の手前、遊びに行くのはやめた方がいい。"
      },
      {
        "translation": "彼女と別れる手前、思い直しました。"
      },
      {
        "translation": "締め切りの手前で、やっとレポートが完成しました。"
      },
      {
        "translation": "選挙の手前、政治の話が多くなります。"
      }
    ]
  },
  "ja_Noun_83": {
    "title": "名詞 ＋ の極み (〜no kiwami)",
    "shortExplanation": "物事の状態、感情、境地などが最高峰や極限に達していることを表します。「〜の極み」「これ以上ない〜」。",
    "longExplanation": "「名詞 ＋ の極み」は、感情や状態、技術・美しさなどの度合いが最高潮・極限に達しており、これ以上はない状態であることを表す格調高い文章語表現です。「美の極み」「感動の極み」「贅沢の極み」「痛恨の極み」のように、感情や精神的状態、抽象的な性質を表す名詞に接続します。日常会話よりも、文学作品、スピーチ、論説などで深い感慨や賞賛を述べる際に用いられます。",
    "formation": "名詞 ＋ の極み",
    "examples": [
      {
        "translation": "彼の料理の極みは、誰もマネできない。"
      },
      {
        "translation": "彼女の努力の極みが、この成功を作り出した。"
      },
      {
        "translation": "彼は音楽の極みを追求し続けている。"
      },
      {
        "translation": "この風景は美の極みだ。"
      }
    ]
  },
  "ja_Noun_84": {
    "title": "名詞 ＋ の至り (~no itari)",
    "shortExplanation": "感情や名誉、心理状態などが最高潮・極限に達していることを表します。「〜の至り」「最高の〜」「この上なく〜」。",
    "longExplanation": "「名詞 ＋ の至り」（「至り」は極点に達することの意）は、感情や精神状態、名誉や羞恥などの気持ちが極限に達していることを表す、極めて改まった格調高い慣用表現です。「光栄の至り（この上なく光栄だ）」「感激の至り」「若気の至り（若さゆえの無分別な行動）」「赤面の至り」のように、決まった名詞と結びついて用いられることが多いのが特徴です。公式なスピーチや挨拶状、改まった手紙などでよく用いられます。",
    "formation": "名詞 ＋ の至り",
    "examples": [
      {
        "translation": "彼の冗談には驚きの至りだ。"
      },
      {
        "translation": "父がプロジェクトのリーダーになったのは、光栄の至りです。"
      },
      {
        "translation": "彼女の素晴らしい演技には感動の至りだった。"
      },
      {
        "translation": "その失敗は恥ずかしさの至りだった。"
      }
    ]
  },
  "ja_Noun_85": {
    "title": "名詞 ＋ はいざ知らず (~ wa iza shirazu)",
    "shortExplanation": "前者は理解できる（または別として）、後者の事態は意外で驚きや呆れがあることを表します。「〜ならともかく」「〜はどうか知らないが」。",
    "longExplanation": "「名詞 ＋ はいざ知らず」（または動詞普通形＋のはいざ知らず）は、対比する2つの事柄を取り上げ、「前の事柄ならまだ理解できるし仕方がないかもしれないが、後の事柄となると意外であり納得がいかない、または驚きだ」という話者の意外感や批判的な感情を表す文型です。「〜ならともかく」「〜は別として」に相当します。後項には「〜まで」「〜とは」「〜なんて」など、驚きや極端さを表す表現がよく続きます。",
    "formation": "名詞 ＋ はいざ知らず（または 動詞・形容詞普通形 ＋ のはいざ知らず）",
    "examples": [
      {
        "translation": "彼が遅れるのはいざ知らず、彼女まで遅刻するとは意外だ。"
      },
      {
        "translation": "夏はいざ知らず、冬にアイスクリームを食べるのは寒すぎませんか？"
      },
      {
        "translation": "子供がテレビゲームに夢中になるのはいざ知らず、大人までそんなに夢中になるとは思わなかった。"
      },
      {
        "translation": "苦しい時はいざ知らず、平時でもそんなに努力するなんてすばらしい。"
      }
    ]
  },
  "ja_Noun_86": {
    "title": "名詞1 ＋ はおろか ＋ 名詞2 ＋ すら (Noun wa oroka ～sura)",
    "shortExplanation": "Aは当然として、より基本的なBさえも成り立たないことを強調します。「AはおろかBすら」「〜はもちろん、〜さえ」。",
    "longExplanation": "「名詞1 ＋ はおろか ＋ 名詞2 ＋ すら」（または「〜さえ」）は、より高度・上位であるAができないのは言うまでもなく、それよりも容易で基本的なはずのBですら満たされない・できないという極端な状態を強調する文型です。「〜は言うに及ばず、それより下の〜すら」という意味を表し、多くは否定的な文脈や不十分な状態を際立たせるために用いられます。",
    "formation": "名詞1 ＋ はおろか ＋ 名詞2 ＋ すら（または さえ）",
    "examples": [
      {
        "translation": "彼は走るはおろか、速く歩くことすらできない。"
      },
      {
        "translation": "日本語はおろか、英語さえ話しません。"
      },
      {
        "translation": "彼は食事はおろか、一日中何も飲まなかった。"
      },
      {
        "translation": "このレストランは味はおろか、サービスさえ悪い。"
      }
    ]
  },
  "ja_Noun_87": {
    "title": "名詞1 ＋ はおろか ＋ 名詞2 ＋ まで (~wa oroka ~made)",
    "shortExplanation": "Aはもちろんのこと、予想を超えてさらにBにまで及んでいることを表します。「AはおろかBまで」「〜はもちろん、〜まで」。",
    "longExplanation": "「名詞1 ＋ はおろか ＋ 名詞2 ＋ まで」は、当然のことと見なされるAにとどまらず、話者の予想や一般的な範囲を大きく越えて、意外なBにまで事態や能力が及んでいることを感嘆を込めて表す文型です。「まで」が付くことによって、範囲や到達点が極端なところにまで達しているという強調のニュアンスが加わります。",
    "formation": "名詞1 ＋ はおろか ＋ 名詞2 ＋ まで",
    "examples": [
      {
        "translation": "彼は英語はおろか、日本語までペラペラなんです。"
      },
      {
        "translation": "彼女は数学はおろか、物理まで得意なんです。"
      },
      {
        "translation": "この料理は見た目はおろか、味まで最高だ。"
      },
      {
        "translation": "彼は歌はおろか、ダンスまで上手だ。"
      }
    ]
  },
  "ja_Noun_88": {
    "title": "名詞1 ＋ はおろか ＋ 名詞2 ＋ も (Noun wa oroka ～ mo)",
    "shortExplanation": "上位のAはもちろんのこと、より基礎的なBも成り立たないことを否定的に表します。「AはおろかBも（〜ない）」「〜はもちろん、〜も」。",
    "longExplanation": "「名詞1 ＋ はおろか ＋ 名詞2 ＋ も」は、主に後項に否定や困難を表す語を伴って用いられ、より高度なAができないのは当然として、より簡単で基本的であるはずのBさえも満たされていないことを強調する文型です。「〜はおろか〜さえ/すら」とほぼ同義ですが、助詞「も」を用いることで、包括的にどちらも成立しないという並列否定のニュアンスを簡潔に表現します。",
    "formation": "名詞1 ＋ はおろか ＋ 名詞2 ＋ も",
    "examples": [
      {
        "translation": "絵を描くことはおろか、字さえ書けない。"
      },
      {
        "translation": "彼は英語はおろか、日本語もわからない。"
      },
      {
        "translation": "彼女は数学はおろか、算数も得意ではない。"
      },
      {
        "translation": "彼は走ることはおろか、歩くことも難しい。"
      }
    ]
  },
  "ja_Noun_89": {
    "title": "名詞 ＋ はさておき (~ wa sateoki)",
    "shortExplanation": "前項の事柄をひとまず脇に置いて、別の重要な事柄に焦点を当てることを表します。「〜はひとまずおいて」「〜は別にして」。",
    "longExplanation": "「名詞 ＋ はさておき」は、前項の話題や事柄をひとまず本題や議論の中心から外して横に置き、後項で述べるより重要・本質的なことや優先すべき事項に視点を移す際に用いる文型です。「〜は別にして」「〜はひとまず脇に置いて」という意味を表します。「動詞・形容詞普通形 ＋ こと/の ＋ はさておき」の形でも用いられます。日常会話からビジネスシーンまで、話題を切り替えて優先順位を明確にする際によく用いられます。",
    "formation": "名詞 ＋ はさておき（または 普通形 ＋ こと/の ＋ はさておき）",
    "examples": [
      {
        "translation": "試験の結果はさておき、この学期はとても学ぶことが多かった。"
      },
      {
        "translation": "天候はさておき、明日のピクニックは楽しみにしています。"
      },
      {
        "translation": "彼の性格はさておき、彼のスキルは認めざるを得ない。"
      },
      {
        "translation": "彼があまりにも遅いことはさておき、彼が来ると思われること自体が問題だ。"
      }
    ]
  },
  "ja_Noun_90": {
    "title": "名詞 ＋ はどうであれ (~ wa dou de are)",
    "shortExplanation": "事態や結果がどのようであっても、後項の事実や決意が変わらないことを表します。「〜がどうであっても」「〜に関係なく」。",
    "longExplanation": "「名詞 ＋ はどうであれ」（「であれ」は助動詞「である」の古風な仮定・譲歩形）は、前項の名詞が示す状況、結果、意見などの状態がどうであろうとも、それに左右されずに後項の決意、行動、事実が変わらないことを表す文型です。「〜がどうであっても」「〜のいかんに関わらず」と同様に、話者の強い意志や不変の事実を述べる際に用いられ、やや改まった響きを持ちます。",
    "formation": "名詞 ＋ はどうであれ",
    "examples": [
      {
        "translation": "天候はどうであれ、試合は行われます。"
      },
      {
        "translation": "結果はどうであれ、最善を尽くすだけです。"
      },
      {
        "translation": "あなたの意見はどうであれ、私は彼を信じます。"
      },
      {
        "translation": "試験の結果はどうであれ、あなたには何も変わりません。"
      }
    ]
  },
  "ja_Noun_91": {
    "title": "名詞 ＋ まみれ (~mamire)",
    "shortExplanation": "人や物の表面全体に、汚いものや不快なものがべっとりと付着している状態を表します。「〜まみれ」「〜だらけ」。",
    "longExplanation": "「名詞 ＋ まみれ」（接尾辞「塗れ」）は、身体や物の表面全体に、泥・血・埃・汗などの汚れて不快な液体や粉末、あるいは借金やスキャンダルといった好ましくないものがべったりと付着・充満している状態を表す文型です。ほぼ常に不快感、汚らしさ、悲惨さなどの否定的なニュアンスを伴います。「〜だらけ」が平面や空間に散らばっている様子全般を表すのに対し、「〜まみれ」は表面全体に付着して一体化しているような状態を表すのが特徴です。",
    "formation": "名詞 ＋ まみれ",
    "examples": [
      {
        "translation": "彼は泥まみれになって帰ってきた。"
      },
      {
        "translation": "彼女は涙まみれになりながら告白した。"
      },
      {
        "translation": "その事件後、彼はスキャンダルまみれになった。"
      },
      {
        "translation": "この部屋は埃まみれだ。"
      }
    ]
  },
  "ja_Noun_92": {
    "title": "名詞1 ＋ もさることながら ＋ 名詞2 ＋ も (A mo saru koto nagara B mo)",
    "shortExplanation": "Aももちろんそうであるが、それ以上にBもそうであると、後者をより強調して述べます。「AはもちろんのことBも」「AだけでなくBも」。",
    "longExplanation": "「～もさることながら」は、「前項Aの事実は当然のこととして認めた上で、後項Bはそれ以上に強調すべき特徴・魅力である」という気持ちを表すN1の文型です。「Aももちろん素晴らしいが、Bはさらに〜だ」という文脈で、物事や人物を高く評価・賞賛する際によく用いられます。",
    "formation": "名詞1 ＋ もさることながら ＋ 名詞2 ＋ も",
    "examples": [
      {
        "translation": "彼の歌唱力もさることながら、ダンスも素晴らしい。"
      },
      {
        "translation": "このレストラン、味もさることながら、サービスもすばらしい。"
      },
      {
        "translation": "彼女の美しさもさることながら、その知性も魅力的だ。"
      },
      {
        "translation": "その映画、ストーリーもさることながら、音楽も素晴らしかった。"
      }
    ]
  },
  "ja_Noun_93": {
    "title": "名詞 ＋ も兼ねて (mo kanete)",
    "shortExplanation": "本来の目的に加えて、別の目的も合わせて同時に行うことを表します。「〜も合わせて」「〜を兼ねて」。",
    "longExplanation": "「～も兼ねて」は、主たる目的を果たすだけでなく、前項の名詞で示されたもう一つの目的や意図を同時に兼ね合わせて行動を起こすことを表す文型です。「〜の目的も兼ねて」「〜も合わせて」という意味になり、散歩・観光・勉強・挨拶・視察など、目的を表す名詞に接続します。",
    "formation": "名詞 ＋ も兼ねて",
    "examples": [
      {
        "translation": "散歩も兼ねて、公園に行きました。"
      },
      {
        "translation": "今日は日本語の勉強も兼ねて、日本の映画を見ます。"
      },
      {
        "translation": "仕事も兼ねて、海外に行く予定です。"
      },
      {
        "translation": "旅行も兼ねて、友人の結婚式に出席します。"
      }
    ]
  },
  "ja_Noun_94": {
    "title": "名詞 ＋ も相まって (mo aimatte)",
    "shortExplanation": "いくつかの要素が互いに重なり合い、相乗効果をもたらしてある結果を生み出すことを表します。「〜も重なって」「〜とあいまって」。",
    "longExplanation": "「～も相まって」は、ある要因が他の要因と結びつき、互いに影響し合ってより際立った結果や状態を生み出すことを表す硬い表現の文型です。「〜も影響して」「〜と互いに重なり合って」という意味を持ち、成功した理由や特徴的な現象の複合要因を述べる際によく使われます。",
    "formation": "名詞 ＋ も相まって",
    "examples": [
      {
        "translation": "気候も相まって、この地域は農業に適しています。"
      },
      {
        "translation": "彼の才能も相まって、彼は急速に昇進した。"
      },
      {
        "translation": "技術進歩も相まって、私たちはより効率的に仕事をこなすことができるようになりました。"
      },
      {
        "translation": "彼の努力も相まって、プロジェクトは成功しました。"
      }
    ]
  },
  "ja_Noun_95": {
    "title": "名詞 ＋ をおいて他に ＋ 動詞否定形 (wo oite hoka ni...nai)",
    "shortExplanation": "その対象以外にはふさわしいものや代わりになるものが存在しないと強く評価・断定します。「〜のほかには〜ない」。",
    "longExplanation": "「～をおいて他に～ない」は、提示された名詞が唯一無二の存在であり、それ以上の適任者や最良の選択肢は他に決して存在しないと強い確信をもって称賛・評価する文型です。「〜を除いては他に〜ない」「〜をおいて他にはない」という意味で、人物の能力や物事の価値を高く評価する際に用いられます。",
    "formation": "名詞 ＋ をおいて他に ＋ 動詞否定形（ない形）",
    "examples": [
      {
        "translation": "この仕事を彼に任せる人をおいて他にいない。"
      },
      {
        "translation": "この問題を解決できるのは彼をおいて他にいない。"
      },
      {
        "translation": "この地域で美味しい麺を作る店をおいて他にない。"
      },
      {
        "translation": "彼女の歌声を超える歌手をおいて他にいない。"
      }
    ]
  },
  "ja_Noun_96": {
    "title": "名詞 ＋ をもって (wo motte)",
    "shortExplanation": "手段・方法・態度を示す（「〜によって」「〜をもちいて」）、または公式な区切りとなる時点を示す（「〜を限りに」「〜で」）硬い表現です。",
    "longExplanation": "「～をもって」（漢字表記は「以て」）は、公式な通知や改まったスピーチ・文書などで用いられる硬い表現で、主に以下の2つの意味を持ちます。\n1. 手段・方法・態度・根拠などを表し、「〜を用いて」「〜の気持ちで」という意味を表します。\n2. 期日や期限の終了点を示し、「〜を限りに」「〜の時点をもちまして」という意味で公式な終了や区切りを表します。",
    "formation": "名詞 ＋ をもって",
    "examples": [
      {
        "translation": "彼は誠実さをもって人々に信頼されています。"
      },
      {
        "translation": "この賞をもって、彼女の努力が認められました。"
      },
      {
        "translation": "彼は強い決意をもって問題に取り組んだ。"
      },
      {
        "translation": "3月をもって、この店は閉店します。"
      }
    ]
  },
  "ja_Noun_97": {
    "title": "名詞 ＋ をものともせずに (wo mono tomo sezu ni)",
    "shortExplanation": "困難・危険・悪条件・プレッシャーなどを恐れず、問題にしないで勇敢に行動することを表します。「〜を恐れずに」「〜をものともせず」。",
    "longExplanation": "「～をものともせずに」は、普通であれば大きな障害や苦難となる事柄（風雪・危険・病気・プレッシャー・失敗など）をものともせず、平気で乗り越えて立ち向かっていく様子を表す文型です。「〜を問題にしないで」「〜に屈することなく」という意味を持ち、勇気や強い意志をもって行動する人物を称賛・描写する際に用いられます。",
    "formation": "名詞 ＋ をものともせずに",
    "examples": [
      {
        "translation": "彼女は怖さをものともせずに、暗闇の中へ進んで行った。"
      },
      {
        "translation": "試験のプレッシャーをものともせずに、彼は自信満々に答えた。"
      },
      {
        "translation": "彼は風雪をものともせずに山を登った。"
      },
      {
        "translation": "彼は失敗をものともせずに、前に進み続けた。"
      }
    ]
  },
  "ja_Noun_98": {
    "title": "名詞 ＋ をよそに (wo yoso ni)",
    "shortExplanation": "周囲の心配・反対・期待や置かれた状況などを全く気にかけず、平気で行動することを表します。「〜を気にしないで」「〜を無視して」。",
    "longExplanation": "「～をよそに」（漢字表記は「余所に」）は、自分に関わる周囲の意見・忠告・心配・反対や、世間の状況などを全く関係のないことのように受け流し、配慮することなく行動する様子を表す文型です。「〜を気にかけずに」「〜をよそにして」という意味になり、話し手の呆れや非難、驚きの気持ちが含まれることがよくあります。",
    "formation": "名詞 ＋ をよそに",
    "examples": [
      {
        "translation": "経済危機をよそに、彼は高級な車を買った。"
      },
      {
        "translation": "試験が迫るをよそに、彼は遊び続けている。"
      },
      {
        "translation": "親の反対をよそに、彼女は彼と結婚しました。"
      },
      {
        "translation": "その国の経済状況をよそに、多くの企業が進出し続けている。"
      }
    ]
  },
  "ja_Noun_99": {
    "title": "名詞 ＋ を余儀なくされる (wo yogi naku sareru)",
    "shortExplanation": "やむを得ない外部の事情により、本人の意志に関わらずその状況に追い込まれることを表します。「〜せざるを得なくなる」「〜を強いられる」。",
    "longExplanation": "「～を余儀なくされる」（「余儀ない」＝他の方法がない）は、天候・経済難・怪我・社会情勢などの不可抗力な理由により、選択の余地なく望まない行為や状態を強いられることを表す硬い文語的表現です。「〜することを余儀なくされる」「〜を強いられる」という意味になり、ニュースや公的な文書でよく用いられます。",
    "formation": "名詞 ＋ を余儀なくされる",
    "examples": [
      {
        "translation": "彼は経済的困難により、退学を余儀なくされた。"
      },
      {
        "translation": "厳しい天候によって、私たちは遠足を中止する余儀なくされた。"
      },
      {
        "translation": "怪我のため、彼は入院を余儀なくされた。"
      },
      {
        "translation": "リストラの恐怖により、多くの従業員が転職を余儀なくされた。"
      }
    ]
  },
  "ja_Noun_100": {
    "title": "名詞 ＋ を前提として (wo zentei toshite)",
    "shortExplanation": "ある事柄があらかじめ成り立つ条件・前提であることを基盤にして行動や計画を進めることを表します。「〜を条件として」「〜という仮定のもとで」。",
    "longExplanation": "「～を前提として」は、後項の計画・決定・行動が成立するための必須条件や根拠となる仮定として、前項の名詞をあらかじめ設定していることを表す文型です。「〜を条件にして」「〜があることをあらかじめ見込んで」という意味を持ち、ビジネスや学術、公式な計画立案などで広く用いられます。",
    "formation": "名詞 ＋ を前提として",
    "examples": [
      {
        "translation": "成功を前提として、ビジネスプランを作成しました。"
      },
      {
        "translation": "彼の勝利を前提として、パーティーの準備を始めました。"
      },
      {
        "translation": "両親の理解を前提として、旅行計画を進めます。"
      },
      {
        "translation": "このプロジェクトは、資金が揃うことを前提としています。"
      }
    ]
  },
  "ja_Noun_101": {
    "title": "名詞 ＋ を前提にして (wo zentei ni shite)",
    "shortExplanation": "ある条件や状況があらかじめ満たされることを前提・基礎として物事を考えることを表します。「〜を前提として」「〜を見込んで」。",
    "longExplanation": "「～を前提にして」は、「～を前提として」とほぼ同義で、ある事柄や状況があらかじめ起こる・存在するはずだという仮定を立て、それを土台にして行動や判断を行うことを表す文型です。「〜という前提のもとで」「〜を見込んで」という意味を持ち、日常の段取りからビジネスの打ち合わせまで幅広く用いられます。",
    "formation": "名詞 ＋ を前提にして",
    "examples": [
      {
        "translation": "好天を前提にして、明日のピクニックの計画を立てました。"
      },
      {
        "translation": "彼女の合格を前提にして、祝いのパーティーの準備を始めました。"
      },
      {
        "translation": "経済成長を前提にして、予算案が作られた。"
      },
      {
        "translation": "彼の参加を前提にして、会議の日程を決めました。"
      }
    ]
  },
  "ja_Noun_102": {
    "title": "名詞 ＋ を境にして (wo sakai ni shite)",
    "shortExplanation": "ある時点や重大な出来事を境界・転換点として、それ以前と以後で状況が大きく変化することを表します。「〜を境に」「〜を契機として大きく変わる」。",
    "longExplanation": "「～を境にして」（「〜を境に」とも）は、特定の出来事や時期を一つの明確な区切り・境界線として捉え、それを機に状況・状態・性質などが一変したことを表す文型です。「〜を分岐点として」「〜を境にそれ以降」という意味になり、人生の節目や時代の転換期を述べる際によく使われます。",
    "formation": "名詞 ＋ を境に ｜ 名詞 ＋ を境にして",
    "examples": [
      {
        "translation": "父の死を境にして、彼の性格が一変した。"
      },
      {
        "translation": "試験を境にして、休暇を取る予定です。"
      },
      {
        "translation": "春を境にして、新しい生活を始めるつもりだ。"
      },
      {
        "translation": "彼女は入学を境にして、ファッションに興味を持ち始めた。"
      }
    ]
  },
  "ja_Noun_103": {
    "title": "名詞 ＋ を機にして (wo ki ni shite)",
    "shortExplanation": "ある出来事や節目を絶好の機会・契機と捉えて、新しい行動を起こしたり変化させたりすることを表します。「〜を良い機会として」「〜をきっかけにして」。",
    "longExplanation": "「～を機にして」（「〜を機に」とも、漢字表記は「機にして」）は、引っ越し・卒業・結婚・事業の節目や失敗などを絶好のチャンス（転機）と捉え、それをきっかけとして新たな行動を開始したり生活や方針を改めたりすることを表す文型です。「〜をきっかけにして」「〜を好機と捉えて」という意味で前向きな行動によく用いられます。",
    "formation": "名詞 ＋ を機に ｜ 名詞 ＋ を機にして",
    "examples": [
      {
        "translation": "引っ越しを機にして、家具を新しくしました。"
      },
      {
        "translation": "卒業を機にして、新しい仕事を探し始めた。"
      },
      {
        "translation": "このプロジェクトの失敗を機にして、会社全体の仕事のやり方を見直すことにした。"
      },
      {
        "translation": "結婚を機にして、私たちは新しい町へ引っ越しました。"
      }
    ]
  },
  "ja_Noun_104": {
    "title": "名詞 ＋ を皮切りに / を皮切りにして (wo kawakiri ni / wo kawakiri ni shite)",
    "shortExplanation": "ある出来事が最初の突破口・皮切りとなり、それを合図に同種の事柄が次々と連続して起こることを表します。「〜を手始めに」「〜を皮切りとして」。",
    "longExplanation": "「～を皮切りに / ～を皮切りにして」（お灸を据える際に最初に皮を焼くことに由来）は、ある行動や催しが先陣を切って口火となり、それを合図にして同類の出来事や活動が次々と勢いよく展開・拡大していく様子を表す文型です。「〜を手始めとして」「〜を皮切りに次々と」という意味になり、コンサートの全国ツアー・新店舗の連続開店・一連のプロジェクト展開などのニュースで頻繁に使われます。",
    "formation": "名詞 ＋ を皮切りに ｜ 名詞 ＋ を皮切りにして",
    "examples": [
      {
        "translation": "彼はその論文を皮切りにして複数の研究を開始した。"
      },
      {
        "translation": "彼女はこのコンペティションを皮切りにして彼女のダンスキャリアが飛躍的に成長した。"
      },
      {
        "translation": "この映画を皮切りに、彼は人気俳優としての立場を確立した。"
      },
      {
        "translation": "このプロジェクトを皮切りにして、会社は新たな方向性を示し始めた。"
      }
    ]
  },
  "ja_Noun_105": {
    "title": "名詞 ＋ を皮切りにして (wo kawakiri ni shite)",
    "shortExplanation": "ある事柄を最初のスタート・合図として、それに続いて一連の活動や出来事が次々と行われることを表します。「〜を始めとして」「〜を皮切りにして」。",
    "longExplanation": "「～を皮切りにして」は、あるイベントや日付を最初の口火・皮切りとして定め、それを契機に同種の計画や活動が次々と続いていく様子を表す文型です。「〜を最初の合図として」「〜を皮切りにして以降」という意味を持ち、全国巡回イベントの初日や、ある出来事から勢いよく発展していく文脈で用いられます。",
    "formation": "名詞 ＋ を皮切りにして（または を皮切りに）",
    "examples": [
      {
        "translation": "彼はその日を皮切りにして毎日ジムに通い始めました。"
      },
      {
        "translation": "新年会を皮切りにして、今年はたくさんのイベントが開催されます。"
      },
      {
        "translation": "この映画を皮切りにして彼の人気は急上昇しました。"
      },
      {
        "translation": "東京を皮切りにして、彼の展示会は全国で開かれる予定です。"
      }
    ]
  },
  "ja_Noun_106": {
    "title": "名詞 ＋ を禁じ得ない (wo kinjienai)",
    "shortExplanation": "ある事態に対して生じる強い感情や衝動を、どうしても抑えきることができないことを表します。「〜を抑えられない」「〜の感情を禁じ得ない」。",
    "longExplanation": "「～を禁じ得ない」（漢字表記は「禁じ得ない」）は、改まった文章や談話で用いられる硬い文型です。感情や心理状態を表す名詞（驚き・怒り・涙・同情・疑念・喜びなど）に接続し、沸き起こる強い感情を理性で抑えようとしてもどうしても抑えることができない様子を表します。「〜を抑えることができない」「〜の念を抱かずにはいられない」という意味になります。",
    "formation": "名詞（感情・心理を表す名詞） ＋ を禁じ得ない",
    "examples": [
      {
        "translation": "この結果には驚きを禁じ得ない。"
      },
      {
        "translation": "そのニュースを聞いて、彼の成功を祝福する気持ちを禁じ得ない。"
      },
      {
        "translation": "彼女の美しさには感動を禁じ得ない。"
      },
      {
        "translation": "彼の話を聞いて、笑いを禁じ得ない。"
      }
    ]
  },
  "ja_Noun_107": {
    "title": "名詞 ＋ を経て (wo hete)",
    "shortExplanation": "ある過程・段階・時間を「通って」「経過して」、またはある場所を「経由して」次の段階や結果に至ることを表します。「〜を通って」「〜を経験して」「〜を経由して」。",
    "longExplanation": "「～を経て」は、あるプロセス、段階、年月、試練などを通過・経験した上で何らかの結果に至ることや、空間的にある場所を経由して目的地へ向かうことを表す文型です。時間的・抽象的な経過にも、地理的な経由地にも用いることができ、改まった書き言葉やスピーチでよく使われます。",
    "formation": "名詞 ＋ を経て",
    "examples": [
      {
        "translation": "彼は苦労を経て成功を手に入れた。"
      },
      {
        "translation": "彼女はニューヨークを経て日本に帰国した。"
      },
      {
        "translation": "私たちは長い議論を経て決定を下した。"
      },
      {
        "translation": "多くの修練を経て、彼は達人のレベルになった。"
      }
    ]
  },
  "ja_Noun_108": {
    "title": "名詞 ＋ を踏まえて (wo fumaete)",
    "shortExplanation": "ある事実・経験・過去の結果・意見などを「前提や判断の根拠として考慮に入れて」次の行動や判断を行うことを表します。「〜を前提にして」「〜を考慮して」「〜に立脚して」。",
    "longExplanation": "「～を踏まえて」は、動詞「踏まえる（しっかりと足元に据える）」から派生した表現で、前項に提示された過去のデータ、反省点、意見、現状などをしっかりと土台・判断材料にして、その上に立った計画や行動を進めることを表します。ビジネスや論文、公式の場などで方針を述べる際によく用いられます。",
    "formation": "名詞 ＋ を踏まえて",
    "examples": [
      {
        "translation": "過去の結果を踏まえて、新たな計画を立てました。"
      },
      {
        "translation": "現地の文化を踏まえて、プレゼンテーションを準備します。"
      },
      {
        "translation": "教師の意見を踏まえて、規則を変更しました。"
      },
      {
        "translation": "最新の研究結果を踏まえて、新しい薬が開発されました。"
      }
    ]
  },
  "ja_Noun_109": {
    "title": "名詞 ＋ を限りに (wo kagiri ni)",
    "shortExplanation": "ある時・期限を「最後として」「区切りとして」、それまで続いていた状態や行為を完全に終了・停止することを表します。「〜を最後に」「〜をもって」。",
    "longExplanation": "「～を限りに」は、時間や期限を表す名詞（今日、今年度、今回など）に接続し、その時を最後の限度・区切りとして、継続してきた活動や習慣をきっぱりと終えることを宣言する文型です。「〜を最後に」「〜を境として終わりにする」という意味で、退職、番組の終了、禁煙の決意など、公式な告知や強い決断を表す際によく用いられます。",
    "formation": "名詞（時を表す言葉） ＋ を限りに",
    "examples": [
      {
        "translation": "今年度を限りに、この大学での教授活動を終えるつもりです。"
      },
      {
        "translation": "今日を限りに、タバコを吸うのをやめます。"
      },
      {
        "translation": "3月31日を限りに、会社を退職します。"
      },
      {
        "translation": "来週を限りに、この番組は終了します。"
      }
    ]
  },
  "ja_Noun_110": {
    "title": "名詞 ＋ 並み (nami)",
    "shortExplanation": "程度・レベル・状態がその名詞と同等、あるいは匹敵することを表します。「〜と同程度」「〜に匹敵する」「〜並の」。",
    "longExplanation": "「～並み」は、名詞の直後に接続して、能力・程度・状態などがその名詞と同じ基準・レベルに達していることや、匹敵する様子を表す表現です。「〜と同レベルの」「〜に劣らない」という意味で、「プロ並み」「人並み」「世間並み」などの形でも頻繁に使われます。",
    "formation": "名詞 ＋ 並み（＋ の ＋ 名詞 ／ ＋ だ ／ ＋ に）",
    "examples": [
      {
        "translation": "彼はプロのボクサー並みの力を持っています。"
      },
      {
        "translation": "彼女の料理の腕前はレストラン並みです。"
      },
      {
        "translation": "このエリアの夏は砂漠並みの暑さです。"
      },
      {
        "translation": "今日の仕事は社長並みの忙しさだった。"
      }
    ]
  },
  "ja_Noun_111": {
    "title": "名詞 ／ 動詞普通形 ＋ 前提で (zentei de)",
    "shortExplanation": "ある条件や仮定を「前もって決めた条件・土台」として設定し、それを基準に行動や計画を進めることを表します。「〜を前提として」「〜という条件で」。",
    "longExplanation": "「～前提で」は、後項の計画や行動が、ある決まった条件や仮定の上に成り立っていることを表す文型です。「〜という前提のもとに」「〜を条件にして」という意味で、名詞に直接接続するか（例：「結婚前提で」）、動詞の普通形に接続して条件を提示します。",
    "formation": "名詞 ＋ 前提で | 動詞普通形 ＋ 前提で",
    "examples": [
      {
        "translation": "説明できる英語力がある前提で、この仕事を引き受けてください。"
      },
      {
        "translation": "彼が一緒に行く前提で、旅行の計画を立てました。"
      },
      {
        "translation": "成功する前提で、このプロジェクトを進めています。"
      },
      {
        "translation": "雨が降らない前提で、ピクニックの準備をしました。"
      }
    ]
  },
  "ja_Verbる_112": {
    "title": "動詞辞書形 ／ 名詞(である) ＋ 限り(は) (kagiri (wa))",
    "shortExplanation": "ある状態や条件が続いている間はずっと、後項の事態も成立し続けることを表します。「〜である間は」「〜する間はずっと」。",
    "longExplanation": "「～限り（は）」は、前項で示された条件や状態が継続している限度内において、後項の行動・状態・義務などが常に成立・維持されることを表す文型です。「〜する間は」「〜である以上は」という意味で、動詞辞書形や「ている形」、名詞＋「である」などに接続します。",
    "formation": "動詞辞書形／ている形 ＋ 限り(は) | 名詞 ＋ である限り(は) | い形容詞 ＋ 限り(は) | な形容詞 ＋ である／な限り(は)",
    "examples": [
      {
        "translation": "私が生きている限りは、あなたを支えます。"
      },
      {
        "translation": "子供が学校に通っている限り、私たちは彼らを守ります。"
      },
      {
        "translation": "能力がある限り、最善を尽くします。"
      },
      {
        "translation": "あなたがここにいる限り、私は安心です。"
      }
    ]
  },
  "ja_Verb_113": {
    "title": "動詞ます形（ますを除く） ／ 名詞 ＋ がてら (gatera)",
    "shortExplanation": "ある主たる行動（主に移動や外出）のついでに、もう一つの行動を合わせて行うことを表します。「〜のついでに」「〜を兼ねて」。",
    "longExplanation": "「～がてら」は、散歩や買い物、外出など移動を伴う主要な行動を行う際に、その行き帰りや機会を利用して別の用事も一緒に済ませることを表す文型です。「〜のついでに」「〜を兼ねて」という意味で、動詞連用形（ます形語幹）や動作性名詞に接続します。「〜ついでに」に比べて、一つの行動の中に別の目的が自然に組み合わさっているニュアンスを持ちます。",
    "formation": "動詞ます形（ますを除く） ＋ がてら(に) | 名詞 ＋ がてら(に)",
    "examples": [
      {
        "translation": "散歩がてらに郵便局へ行った。"
      },
      {
        "translation": "買い物がてらに友達に会いに行った。"
      },
      {
        "translation": "ジョギングがてらに新聞を買いに行った。"
      },
      {
        "translation": "公園でピクニックがてら読書をした。"
      }
    ]
  },
  "ja_Verb_114": {
    "title": "動詞ます形（ますを除く） ／ 名詞 ＋ こそすれ (koso sure)",
    "shortExplanation": "「Aこそすれ、B〜ない」の形で、「Aすることはあっても、決してBすることはない」と後項を強く否定して前項を強調します。「〜はしても、決して〜ない」。",
    "longExplanation": "「～こそすれ」は、強調の助詞「こそ」と動詞「する」の已然形「すれ」が結びついたN1文型です。主に「Aこそすれ、Bはない／しない」という構文で用いられ、「Aすることは確かにあっても、反対の極端な事態Bなどは絶対にあり得ない」と後項を強く否定し、前項の限度・純粋さを際立たせます。",
    "formation": "動詞ます形（ますを除く） ＋ こそすれ | 名詞 ＋ こそすれ",
    "examples": [
      {
        "translation": "彼は友達を助けこそすれ、自分を卑下することはありません。"
      },
      {
        "translation": "彼女は料理こそすれ、掃除はほとんどしない。"
      },
      {
        "translation": "私の兄は勉強こそすれ、遊ぶ時間がほとんどない。"
      },
      {
        "translation": "母は働きこそすれ、自分のために時間を使うことはほとんどない。"
      }
    ]
  },
  "ja_Verb_115": {
    "title": "動詞使役受身形 (saserareru / sareru)",
    "shortExplanation": "他者からの強制や命令、あるいはやむを得ない状況によって、本人の意志に反して無理に何かをさせられることを表します。「無理やり〜させられる」「〜することを余儀なくされる」。",
    "longExplanation": "「〜させられる／〜される」は、使役形と受身形が合体した「使役受身形」です。他者からの強制・指示や状況の圧力により、自分の望まない行為を不本意ながら行う（させられる）という迷惑・不満の感情を込めて用いられます。Iグループ（五段）動詞では「〜される」（語尾「す」を除く）という短縮形が日常的に多用され、IIグループ（一段）動詞は「〜させられる」、IIIグループは「させられる／こさせられる」となります。",
    "formation": "Iグループ動詞：語尾をあ段に変化 ＋ される（または させられる） | IIグループ動詞：語尾の「る」を除く ＋ させられる | IIIグループ動詞：する → させられる、くる → こさせられる",
    "examples": [
      {
        "translation": "彼に無理やり飲ませられた。"
      },
      {
        "translation": "私は父に勉強させられました。"
      },
      {
        "translation": "子供たちは毎日ピアノを弾かせられる。"
      },
      {
        "translation": "私たちは強制的に早起きさせられました。"
      }
    ]
  },
  "ja_Verb_116": {
    "title": "動詞未然形 ＋ ざるを得ない (zaru wo enai)",
    "shortExplanation": "本人の希望や本意ではないが、状況や立場上そうしないわけにはいかず、どうしてもそうするしかないことを表します。「〜しないわけにはいかない」「どうしても〜せざるを得ない」。",
    "longExplanation": "「～ざるを得ない」は、古語の否定「ざる」に可能否定「得ない」がついた改まった文型です。自身の意志や感情としては消極的であっても、周囲の状況、客観的な情勢、社会的責任や圧力から逃れることができず、「他に選択肢がないため、不本意ながらその行為を行うしかない」という強い必然性を表します。「する」は不規則に「せざるを得ない」となります。",
    "formation": "動詞未然形（ない形から「ない」を除く） ＋ ざるを得ない（※「する」は「せざるを得ない」）",
    "examples": [
      {
        "translation": "この仕事が嫌ならもう辞めざるを得ない。"
      },
      {
        "translation": "試験が近いので、夜遅くまで勉強せざるを得ない。"
      },
      {
        "translation": "涙が止まらない。泣かざるを得ない。"
      },
      {
        "translation": "先生の命令だから、従わざるを得ない。"
      }
    ]
  },
  "ja_Verb_117": {
    "title": "動詞未然形 ＋ ずじまい (zu jimai)",
    "shortExplanation": "何かをするつもりや機会があったのに、実現できないまま終わってしまったことに対する心残りや残念な気持ちを表します。「結局〜しないで終わった」。",
    "longExplanation": "「～ずじまい」は、古語の否定「ず」と終わりを意味する「仕舞い」が組み合わさった表現です。前もって予定していたり機会があったりしたにもかかわらず、事情があって実行に移せないまま時間切れや終了となり、「結局〜できずに終わってしまった」という残念さ・後悔のニュアンスを込めて用いられます。「する」は「せずじまい」となります。",
    "formation": "動詞未然形（ない形から「ない」を除く） ＋ ずじまい（※「する」は「せずじまい」）",
    "examples": [
      {
        "translation": "日本へ来たのに、一度も富士山を見ずじまいで帰国してしまった。"
      },
      {
        "translation": "出張のため、彼女に会わずじまいだった。"
      },
      {
        "translation": "昨日は疲れすぎて、宿題をせずじまいだ。"
      },
      {
        "translation": "着物を買ったが、結局、一度も着ずじまいだ。"
      }
    ]
  },
  "ja_Verb_118": {
    "title": "動詞未然形 ＋ ずとも ／ なくとも (zu tomo / nakutomo)",
    "shortExplanation": "口語の「〜なくても」に相当する硬い文語的表現で、前項の動作や条件を行わなくても後項の成立に支障がないことを表します。「〜しなくても」「〜がなくても」。",
    "longExplanation": "「～ずとも」は、日常会話の「〜なくても」を改まった文章語として表現した文型です。前項のことをわざわざ行わなかったり、ある条件が存在しなかったりしても、後項の望ましい結果や事態は何ら問題なく成立することを表します。「する」は「せずとも」、「ない」は「なくとも」となります。",
    "formation": "動詞未然形（ない形から「ない」を除く） ＋ ずとも（※「する」は「せずとも」） | ない → なくとも",
    "examples": [
      {
        "translation": "朝ごはんを食べずとも、働くことができます。"
      },
      {
        "translation": "車がなくとも、バスで行くことができます。"
      },
      {
        "translation": "お金がなくとも、幸せになれる。"
      },
      {
        "translation": "インターネットがなくとも、情報を得る方法はいくつかあります。"
      }
    ]
  },
  "ja_Verb_119": {
    "title": "動詞未然形 ＋ ずにはおかない (zuni wa okanai)",
    "shortExplanation": "話者の強い決意として「必ず〜する」「そのままにしてはおかない」、または状況が「自然と相手に強い感情・反応を起こさせる」ことを表します。「必ず〜する」「〜させずにはいられない」。",
    "longExplanation": "「～ずにはおかない」は、「そのまま放置せず、必ずその行為をする」という話者の断固たる決意・義務感を表す文型です。また、感情などを表す動詞と結びつき、「その出来事や作品が、人々の心を動かさずにはおかない（必ず感動・共鳴させる）」というように、対象に強い影響を及ぼす必然性を表す用法もあります。「する」は「せずにはおかない」となります。",
    "formation": "動詞未然形（ない形から「ない」を除く） ＋ ずにはおかない（※「する」は「せずにはおかない」）",
    "examples": [
      {
        "translation": "彼が困っていると聞いたら、助けずにはおかない。"
      },
      {
        "translation": "食事の準備がこのままだと、手伝わずにはおかないだろう。"
      },
      {
        "translation": "この問題が解決しないなら、改善策を考えずにはおかない。"
      },
      {
        "translation": "彼女が泣いているのを見たら、慰めずにはおかない。"
      }
    ]
  },
  "ja_Verb_120": {
    "title": "動詞未然形 ＋ ずにはすまない (zuni wa sumanai)",
    "shortExplanation": "社会的ルール、道義的責任、良識に照らして、「その行為をしないままでは物事が済まない・解決しない」ことを表します。「〜しないでは済まない」「必ず〜しなければならない」。",
    "longExplanation": "「～ずにはすまない」は、「済む（解決する、落着する）」の否定形を伴い、社会常識・道徳・法律・良心などの観点から見て、その行為を行わずに放置することは絶対に許されない、行わなければ後始末がつかないという強い義務感や必然性を表す文型です。「する」は「せずにはすまない」となります。",
    "formation": "動詞未然形（ない形から「ない」を除く） ＋ ずにはすまない（※「する」は「せずにはすまない」）",
    "examples": [
      {
        "translation": "この問題を解決しないと、社会全体が影響を受けるので、解決せずにはすまない。"
      },
      {
        "translation": "これは子供たちの未来を思うと、教育改革を行わずにはすまないことだ。"
      },
      {
        "translation": "この件については、彼に謝らずにはすまない。"
      },
      {
        "translation": "結婚式に出席するなら、プレゼントを渡さずにはすまない。"
      }
    ]
  },
  "ja_Verb_121": {
    "title": "動詞ます形（ますを除く） ＋ そうにない (sou ni nai)",
    "shortExplanation": "現在の状況や様子から判断して、ある事態が実現する可能性が極めて低い・見込みがないことを表します。「〜しそうもない」「とても〜とは思えない」。",
    "longExplanation": "「～そうにない」は、様態の助動詞「そうだ」の否定表現で、動詞連用形（ます形語幹）に接続します。見聞きした様子や客観的条件から判断して、「その動作や変化が起きる可能性・見込みがほとんどない」という否定的な推測を表します。「〜そうにもない」「〜そうもない」とすることで、さらに否定のニュアンスを強めることができます。",
    "formation": "動詞ます形（ますを除く） ＋ そうにない（または そうにもない／そうもない）",
    "examples": [
      {
        "translation": "彼はそんなに早く走れそうにない。"
      },
      {
        "translation": "この書類を明日までに終わりそうにない。"
      },
      {
        "translation": "今日雨が降りそうにない。"
      },
      {
        "translation": "彼女は間違えそうにない。"
      }
    ]
  },
  "ja_Verb_122": {
    "title": "動詞ます形 ＋ そうもない (〜sou mo nai)",
    "shortExplanation": "ある事態が実現する可能性が極めて低いことを表し、「〜しそうにない」「とても〜とは思えない」という意味を表します。",
    "longExplanation": "「～そうもない」は、動詞のます形（連用形語幹）に接続し、話し手の主観的な観察や判断に基づいて、その動作や現象が実現する可能性が極めて薄いことを表す文型です。「〜そうにない」とほぼ同義ですが、取り立て助詞「も」が含まれることで否定のニュアンスが一段と強調され、「とても〜できる見込みがない」「〜する兆しがまるで見られない」という強い否定的推量を表します。",
    "formation": "動詞ます形（連用形語幹） ＋ そうもない",
    "examples": [
      {
        "translation": "今日中に仕事を終えそうもない。"
      },
      {
        "translation": "雨が止みそうもない。"
      },
      {
        "translation": "彼が約束を守りそうもない。"
      },
      {
        "translation": "この難しい問題は解決しそうもない。"
      }
    ]
  },
  "ja_Verb_123": {
    "title": "動詞 ＋ そばから (〜soba kara)",
    "shortExplanation": "ある動作を行ってもすぐにそれと対立する事態が次々に起こることを表し、「〜するとすぐに」「〜したそばから」という意味を表します。",
    "longExplanation": "「～そばから」は、動詞の辞書形やた形に接続し、ある行為を完了させても、直後にそれを打ち消すような別の行為や事態が繰り返し発生することを表す文型です。「〜してもすぐにまた〜する」といういたちごっこのような状態を表し、せっかくの努力が無駄になったり徒労に終わったりすることに対する話し手の困惑・不満・あきれといった感情を伴うことが多く見られます。",
    "formation": "動詞辞書形 / た形 ＋ そばから",
    "examples": [
      {
        "translation": "掃除をするそばから子供たちが散らかす。"
      },
      {
        "translation": "仕事を終えるそばから新たな仕事が舞い込んできた。"
      },
      {
        "translation": "それを解決するそばからまた別の問題が出てきた。"
      },
      {
        "translation": "眠りにつくそばから電話が鳴った。"
      }
    ]
  },
  "ja_Verb_124": {
    "title": "動詞た形 ＋ が最後 (〜ta ga saigo)",
    "shortExplanation": "いったんある事態が起きてしまったら、もう取り返しがつかない決定的な結果になることを表し、「一度〜したら最後」「もし〜したらそれで終わりだ」という意味を表します。",
    "longExplanation": "「～たが最後」は、動詞のた形に接続し、ある行為を行ったり事態が発生したりしたならば、その後はもはや後戻りや修正が不可能な深刻な結末に至ることを表すN1の文型です。「〜たら最後」と同様に、後続節には破滅的な結果、取り返しのつかない事態、あるいは歯止めが利かなくなるような強い事態を表す表現が続きます。",
    "formation": "動詞た形 ＋ が最後",
    "examples": [
      {
        "translation": "彼が一度怒ったが最後、誰も彼を止めることはできません。"
      },
      {
        "translation": "このゲームを始めたが最後、一晩中やり続けた。"
      },
      {
        "translation": "彼女が部屋を出たが最後、二度と戻ってこなかった。"
      },
      {
        "translation": "私がその橋を渡ったが最後、それが最後の別れだった。"
      }
    ]
  },
  "ja_Verb_125": {
    "title": "動詞た形 ＋ ことにしてください (~ ta koto ni shite kudasai)",
    "shortExplanation": "実際とは異なっていても、便宜上ある事態がすでに起きたかのように見なしてほしいと頼む表現で、「〜したという扱いにしてください」「〜したことにしてください」という意味を表します。",
    "longExplanation": "「～たことにしてください」は、動詞のた形に接続し、実際にはそうでない場合も含めて、便宜上またはトラブル回避のために「その動作がすでに行われた、あるいはそのような状態になった」と見なして対応してほしいと相手に依頼する文型です。秘密を守ったり、角を立てずに穏便に済ませたりする場面でよく用いられます。",
    "formation": "動詞た形 ＋ ことにしてください",
    "examples": [
      {
        "translation": "昨日のことは忘れたことにしてください。"
      },
      {
        "translation": "私がここに来たことを誰にも言わないで、秘密にしたことにしてください。"
      },
      {
        "translation": "彼が間違えたと思ったことにしてください。"
      },
      {
        "translation": "彼女が帰ったことにしてください。"
      }
    ]
  },
  "ja_Verb_126": {
    "title": "動詞た形 ＋ ら ＋ 動詞た形 ＋ で (~ tara ~ tade)",
    "shortExplanation": "仮にその事態が実現したとしても、それはそれで別の問題や苦労が生じることを表し、「〜したらしたで（大変だ）」という意味を表します。",
    "longExplanation": "「動詞た形 ＋ ら ＋ 動詞た形 ＋ で」は、仮にある動作を行ったり状況が実現したりしても、それに応じた別の面倒や悩みが生じることを表す文型です。「〜したらしたで…だし、〜しなければしないで…だ」のように肯定と否定を対比させて用いることが多く、どちらの道を選んでもそれぞれ固有の難点や不満が伴うというジレンマやためらいの気持ちを表します。",
    "formation": "動詞た形 ＋ ら ＋ （同一の）動詞た形 ＋ で",
    "examples": [
      {
        "translation": "行ったら行ったで大変だし、行かなかったら行かなかったで後悔しそうだ。"
      },
      {
        "translation": "買ったら買ったでお金がなくなるし、買わなかったら買わなかったで後で欲しくなる。"
      },
      {
        "translation": "作ったら作ったで食べきれないし、作らなかったら作らなかったでお腹が空く。"
      },
      {
        "translation": "旅行に出かけたら出かけたで疲れるし、家にいたらいたで退屈する。"
      }
    ]
  },
  "ja_Verb_127": {
    "title": "動詞た形 ＋ ら ＋ きりがない (tara kiri ga nai)",
    "shortExplanation": "ある動作や事態を一度始めると限度がなくどこまでも続いてしまうことを表し、「〜したらきりがない」「〜し始めたら際限がない」という意味を表します。",
    "longExplanation": "「～たらきりがない」は、動詞のた形＋らに接続し、ある行為や要求に一度応じたり始めたりしてしまうと、限度や終わりが見当たらず果てしなく続いてしまうことを表す文型です。「きり（限）」がないことから、主に不満、苦情、要求、出費などの望ましくない事態に対して用いられ、「きりがないからどこかで止めなければならない」という自制や忠告のニュアンスを含みます。",
    "formation": "動詞た形 ＋ ら ＋ きりがない",
    "examples": [
      {
        "translation": "このエンジンを修理したら、またすぐ壊れて、直したらきりがない。"
      },
      {
        "translation": "飲み始めたらきりがない。"
      },
      {
        "translation": "彼女にお金を貸したら、きりがない。"
      },
      {
        "translation": "彼の話を聞き始めたらきりがない。"
      }
    ]
  },
  "ja_Verb_128": {
    "title": "動詞た形 ＋ ら最後 (〜tara saigo)",
    "shortExplanation": "いったんその事態が起きてしまったら、もう歯止めが利かなくなったり取り返しがつかなくなったりすることを表し、「一度〜したら最後」「ひとたび〜すれば終わりだ」という意味を表します。",
    "longExplanation": "「～たら最後」は、動詞のた形＋らに接続し、ある行為をひとたび行ったりある事態が発生したりすると、後戻りができなくなったり自己制御が利かなくなったりすることを表す文型です。「〜たが最後」と同義であり、後続には夢中になって止められなくなる様子や、容易には修復できない深刻な結果を表す表現が続きます。",
    "formation": "動詞た形 ＋ ら最後",
    "examples": [
      {
        "translation": "このゲームを始めたら最後、時間の経つのを忘れてしまいます。"
      },
      {
        "translation": "彼はビールを一杯飲み始めたら最後、止まらなくなります。"
      },
      {
        "translation": "この本を読み始めたら最後、一気に読破してしまいました。"
      },
      {
        "translation": "彼を怒らせたら最後、なかなか許してもらえないよ。"
      }
    ]
  },
  "ja_Verb_129": {
    "title": "動詞ます形 ＋ つ ＋ 動詞ます形 ＋ つ (tsu... tsu...)",
    "shortExplanation": "二つの動作が交互に繰り返されることを表し、「〜たり〜たり」「〜しつ〜しつ」という意味を表します。",
    "longExplanation": "「～つ～つ」は、動詞のます形（連用形語幹）に接続し、対立的または対照的な関係にある二つの動作が交互に何度も繰り返される様子を表す文語的なN1の文型です。「押しつ押されつ」「持ちつ持たれつ」「行きつ戻りつ」のように慣用的な対句として用いられることが多く、格調高い文章語として動作が交互に展開する情景を生き生きと描写します。",
    "formation": "動詞1ます形（語幹） ＋ つ ＋ 動詞2ます形（語幹） ＋ つ",
    "examples": [
      {
        "translation": "朝から晩まで働きつ勉強しつで、疲れてしまった。"
      },
      {
        "translation": "彼は話しつ笑いつして楽しんでいた。"
      },
      {
        "translation": "子供たちは食べつ遊びつしていた。"
      },
      {
        "translation": "私は読みつ書きつして過ごした。"
      }
    ]
  },
  "ja_Verb_130": {
    "title": "動詞て形 ＋ からというもの (te kara to iu mono)",
    "shortExplanation": "ある出来事をきっかけとして、それ以来ずっとある状態が続いていることを表し、「〜してからずっと」「〜したのを機に」という意味を表します。",
    "longExplanation": "「～てからというもの」は、動詞のて形に接続し、ある重大な出来事や転機となる行為を境にして、それ以前とは異なる状態が現在に至るまで一貫して継続していることを強調するN1の文型です。単なる時間の前後関係を表す「～てから」よりも、その変化の大きさや長期的な継続性に焦点が当てられます。",
    "formation": "動詞て形 ＋ からというもの",
    "examples": [
      {
        "translation": "彼女と別れてからというもの、一人で過ごす時間が増えました。"
      },
      {
        "translation": "子供が生まれてからというもの、自由な時間がなくなった。"
      },
      {
        "translation": "新しい仕事を始めてからというもの、毎日忙しくなりました。"
      },
      {
        "translation": "大学に入ってからというもの、スポーツをする時間がなくなった。"
      }
    ]
  },
  "ja_Verb_131": {
    "title": "動詞て形 ＋ こそ (te koso)",
    "shortExplanation": "その行為を実際に行って初めて本当の価値や効果が生じることを強調し、「〜してはじめて」「〜してこそ意味がある」という意味を表します。",
    "longExplanation": "「～てこそ」は、動詞のて形に取り立て助詞「こそ」が接続した文型で、前項の行為が後項の認識や成果を得るための必要不可欠な条件であることを強く主張します。「実際に〜してはじめて真価がわかる・成果が出る」という意味合いを持ち、後続節には理解・達成・成長などの前向きで意義深い事態を表す表現が続きます。",
    "formation": "動詞て形 ＋ こそ",
    "examples": [
      {
        "translation": "実際に使ってこそ、その価値を理解できる。"
      },
      {
        "translation": "自分で経験してこそ、大切なことが学べる。"
      },
      {
        "translation": "失敗してこそ、成功の味がわかる。"
      },
      {
        "translation": "努力してこそ、何かを成し遂げることができる。"
      }
    ]
  },
  "ja_Verb_132": {
    "title": "動詞て形 ＋ は (～te wa)",
    "shortExplanation": "ある動作や事態が生じるたびに決まった結果が繰り返されることや、二つの行為が反復・循環することを表し、「〜しては（いつも〜になる）」「〜したり〜したりする」という意味を表します。",
    "longExplanation": "「～ては」は、動詞のて形に接続し、①「ある行為をするたびに、決まっていつも同じ結果や心理状態が繰り返される」という条件反復の用法と、②「〜ては…、〜ては…」の形で二つの動作や状態が堂々巡りのように交互に繰り返される循環的動作の用法を持ちます。せっかくの行為が無駄になることへのもどかしさや、変化のない反復的な日常を描写する際によく用いられます。",
    "formation": "動詞て形 ＋ は",
    "examples": [
      {
        "translation": "彼女に会っては、いつも緊張してしまいます。"
      },
      {
        "translation": "この部屋を掃除しては乱雑になり、片づけては散らかる。"
      },
      {
        "translation": "運動しては食べ、食べては運動する生活が続いている。"
      },
      {
        "translation": "勉強しては寝て、寝ては勉強する日々です。"
      }
    ]
  },
  "ja_Verb_133": {
    "title": "動詞1て形 ＋ は ＋ 動詞2 (~ te wa ~)",
    "shortExplanation": "前項の動作が行われるたびに、それに伴って後項の動作が繰り返し習慣的に行われることを表し、「〜するたびにいつも〜する」という意味を表します。",
    "longExplanation": "「動詞1て形 ＋ は ＋ 動詞2」は、ある状況や契機（動詞1）が生じるたびに、決まってそれに応じて特定の行為（動詞2）を行うという、反復的・習慣的な行動パターンを表す文型です。日常的なルーティンや、特定の出来事に付随して規則的に生じる行動の連鎖を客観的または描写的に表します。",
    "formation": "動詞1て形 ＋ は ＋ 動詞2",
    "examples": [
      {
        "translation": "私が通勤しては、電子書籍を読んでいます。"
      },
      {
        "translation": "友達が部屋に来ては、ゲームをしています。"
      },
      {
        "translation": "彼が酒を飲んでは、運転を止めさせています。"
      },
      {
        "translation": "私が新しい曲を作っては、すぐに録音します。"
      }
    ]
  },
  "ja_Verb_134": {
    "title": "動詞て形 ＋ までも (~ temademo)",
    "shortExplanation": "ある目的を達成するためには、通常では考えられないような極端な手段や犠牲を払うことも辞さないことを表し、「〜してまで」「〜という極端なことまでして」という意味を表します。",
    "longExplanation": "「～てまでも」（または「〜てまで」）は、動詞のて形に接続し、常識的な範囲を超えた極端な行為や過度の負担を敢えて引き受けてでも、何としても目的を果たしたいという強い意志や覚悟を表すN1の文型です。取り立て助詞「も」が加わることで、通常ならそこまではしないような並外れた手段に踏み切るニュアンスがより一層強調されます。",
    "formation": "動詞て形 ＋ までも（または てまで）",
    "examples": [
      {
        "translation": "試験に合格するために、寝る時間を削ってまでも勉強します。"
      },
      {
        "translation": "彼女と結婚できるなら、どんな苦労をしてまでもお金を貯めたい。"
      },
      {
        "translation": "この会社で働きたいので、長時間かけてまでも通います。"
      },
      {
        "translation": "彼の快復のためなら、何をしてまでも支えたい。"
      }
    ]
  },
  "ja_Verb_135": {
    "title": "動詞て形 ＋ みせる (te miseru)",
    "shortExplanation": "実際にその動作を行って相手に証拠や実力を見せることや、強い意志を持って成し遂げる決意を表し、「〜して見せる」「必ず〜してみせる」という意味を表します。",
    "longExplanation": "「～てみせる」は、動詞のて形に補助動詞「みせる」が接続した表現で、主に二つの用法を持ちます。①相手の目の前で実際に動作を行って腕前や結果を実証・誇示すること（「やって見せる」「解いて見せる」）。②自分の強い意志や決意を周囲に対して宣言し、「どんな困難があっても必ずやり遂げて結果を示す」という固い覚悟を表すこと（「合格してみせる」「勝ってみせる」）。意気込みや実力の誇示を力強く表明します。",
    "formation": "動詞て形 ＋ みせる",
    "examples": [
      {
        "translation": "彼はそのパズルを解いてみせた。"
      },
      {
        "translation": "私はこの仕事ができることをやってみせます。"
      },
      {
        "translation": "彼女は試験に合格するために一生懸命勉強してみせました。"
      },
      {
        "translation": "彼は自分が何も恐れていないと跳んでみせた。"
      }
    ]
  },
  "ja_Verb_136": {
    "title": "動詞て形 ＋ やまない (te yamanai)",
    "shortExplanation": "心情や祈りを表す動詞に接続し、心の底から湧き起こる強い感情が絶え間なく続いていることを表し、「心から〜してやまない」「強く〜し続けている」という意味を表します。",
    "longExplanation": "「～てやまない」は、動詞のて形に「止む」の否定形が接続した格調高い文語的文型です。主に「願う」「祈る」「愛する」「尊敬する」「期待する」「念願する」などの話者の内面的な心理・感情・祈念を表す特定の動詞と共起し、その感情が一過性のものではなく、心の底から湧き上がって止まることがないほど深く強いものであることを表します。スピーチ、挨拶文、改まった文章などで好んで用いられます。",
    "formation": "動詞て形 ＋ やまない（主に「祈る」「願う」「愛する」「尊敬する」「期待する」などの心情動詞に接続）",
    "examples": [
      {
        "translation": "私は母を思ってやまない。"
      },
      {
        "translation": "彼は彼女を愛してやまない。"
      },
      {
        "translation": "彼は日本の文化を尊敬してやまない。"
      },
      {
        "translation": "彼女の成功を願ってやまない。"
      }
    ]
  },
  "ja_Verb_137": {
    "title": "動詞ない形 ＋ ではおかない / ずにはおかない (〜nai de wa okanai)",
    "shortExplanation": "自然の成り行きや感情として必然的にそうなること、または話し手が強い決意を持って必ずそうすることを表し、「必ず〜する」「〜しないわけにはいかない」という意味を表します。",
    "longExplanation": "「～ないではおかない」は、動詞の未然形（ない形）に接続し、二重否定によって極めて強い断定や意志を表すN1の文型です。主語が話し手（一人称）の場合は、「絶対に〜してやる」「放っておくものか」という強い決意・覚悟を表します。一方、主語が三人称や事象である場合は、その事態が周囲に強い影響や感情の起伏を必然的にもたらすこと（「必ず〜させる」「どうしても〜という結果を招く」）を表します。同義の表現に「～ずにはおかない」があります。",
    "formation": "動詞ない形 ＋ ではおかない / 動詞ない形（語幹） ＋ ずにはおかない（「する」は「せずにはおかない」）",
    "examples": [
      {
        "translation": "彼女は毎回遅刻をしては、先生に怒られないではおかない。"
      },
      {
        "translation": "美味しいものがあれば、彼は食べないではおかない。"
      },
      {
        "translation": "この小説は感動的で、読めば涙を流さないではおかない。"
      },
      {
        "translation": "毎日練習しているから、試合では勝たないではおかないだろう。"
      }
    ]
  },
  "ja_Verb_138": {
    "title": "動詞ない形 ＋ ではすまない / ずにはすまない (〜nai de wa sumanai)",
    "shortExplanation": "社会的な常識、道義的責任、法律や心理的な面から、そうしないことは許されない・事態が収拾しないことを表し、「〜しないわけにはいかない」「〜しなければ済まない」という意味を表します。",
    "longExplanation": "「～ないではすまない」は、動詞のない形に接続し、社会的なルール、世間体、道徳的な責任感、あるいは自分自身の良心に照らし合わせて、「その行為をしなければ事態が解決しない、または自分の気持ちがおさまらない」ことを表すN1の文型です。一般的な義務を表す「〜なければならない」よりも、道義的な責任や状況的な不可避性の重みが強調されます。同義表現に「～ずにはすまない」があります。",
    "formation": "動詞ない形 ＋ ではすまない / 動詞ない形（語幹） ＋ ずにはすまない（「する」は「せずにはすまない」）",
    "examples": [
      {
        "translation": "失敗をしたら、謝らないではすまない。"
      },
      {
        "translation": "この問題は重大なので、報告しないではすまない。"
      },
      {
        "translation": "この映画はとても感動的で、泣かないではすまない。"
      },
      {
        "translation": "子供が間違えたら、教えないではすまない。"
      }
    ]
  },
  "ja_Verb_139": {
    "title": "動詞ない形 ＋ までも (〜nai made mo)",
    "shortExplanation": "完全にその状態や高いレベルに達しないまでも、せめて最低限のある段階には達してほしい、あるいは達していることを表し、「〜とは言えないまでも」「〜しないまでも」という意味を表します。",
    "longExplanation": "「～ないまでも」は、動詞のない形に接続し、前項で述べられている理想的・極端な程度までは実現できないことを認めた上で、少なくとも後項に挙げる最低限のラインや現実的な妥協点だけは満たしたい、あるいは満たすべきであるという気持ちを表すN1の文型です。後続節には話し手の最低限の希望、方針、現状の評価などが続きます。",
    "formation": "動詞ない形 ＋ までも",
    "examples": [
      {
        "translation": "全てを理解しないまでも、基本的なことは分かってほしい。"
      },
      {
        "translation": "会えないまでも、電話で声を聞きたい。"
      },
      {
        "translation": "毎日は無理にしても、週に一度くらいはジョギングを続けたい。"
      },
      {
        "translation": "全員に気に入られないまでも、誠実に向き合いたい。"
      }
    ]
  },
  "ja_Verb_140": {
    "title": "動詞ない形 ＋ ものだろうか (〜nai mono darou ka)",
    "shortExplanation": "困難な状況の中で、何とかして実現できないものかと切に願う気持ちや問いかけを表し、「何とか〜できないだろうか」「〜できないものか」という意味を表します。",
    "longExplanation": "「～ないものだろうか」は、主に動詞の可能動詞の否定形（ない形）に接続し、現状では実現が難しい事柄に対して、「どうにかして実現させる方法はないものか」と強く願ったり、もどかしさや期待を込めて自問したりするN1の表現です。話し手の切実な願望や、諦めきれない心情を吐露するニュアンスを持ちます。",
    "formation": "動詞可能形ない形（または動詞ない形） ＋ ものだろうか",
    "examples": [
      {
        "translation": "もっと時間があれば、ここに来られないものだろうか。"
      },
      {
        "translation": "彼女にもっとよく説明すれば、理解できないものだろうか。"
      },
      {
        "translation": "この問題を解決する方法はないものだろうか。"
      },
      {
        "translation": "自分の間違いを認められないものだろうか。"
      }
    ]
  },
  "ja_Verb_141": {
    "title": "動詞ない形 ＋ ものでもない (〜nai mono demo nai)",
    "shortExplanation": "二重否定によって、完全に不可能だったり全くそうでないとは言い切れないという控えめな肯定を表し、「〜できなくもない」「全く〜ないわけではない」という意味を表します。",
    "longExplanation": "「～ないものでもない」は、動詞のない形（または可能動詞の否定形）に接続し、強い肯定を避けつつ、「条件次第では全く不可能というわけではない」「少しは〜する可能性もある」という婉曲的・消極的な肯定を表すN1の文型です。控えめな態度を示したり、相手への配慮や自己の判断をぼかして伝える際に用いられます。",
    "formation": "動詞ない形（または可能形ない形） ＋ ものでもない",
    "examples": [
      {
        "translation": "旅行に行きたいと思わないものでもない。"
      },
      {
        "translation": "彼の言ったこと全部が間違いないものでもない。"
      },
      {
        "translation": "その問題が解けないものでもない。"
      },
      {
        "translation": "彼に会いたくないものでもない。"
      }
    ]
  },
  "ja_Verb_142": {
    "title": "名詞1 ＋ のない ＋ 名詞2 (〜no nai〜)",
    "shortExplanation": "名詞2を修飾し、名詞1の存在や要素を欠いていることを表し、「〜のない…」「〜を欠いた…」という意味を表します。",
    "longExplanation": "「[名詞1] のない [名詞2]」は、連体修飾節（名詞を修飾する節）の内部において、主格の格助詞「が」が連体格の「の」に変化する「が・の交代」という日本語の文法現象です。「笑いがない」「水がない」といった述語「ない」を伴う修飾部において、「が」が「の」に置き換わり、後続する中心名詞を滑らかに修飾します。ある特定の要素や特質が欠如している状態を表します。",
    "formation": "名詞1 ＋ のない ＋ 名詞2",
    "examples": [
      {
        "translation": "笑いのない人生は、つまらない。"
      },
      {
        "translation": "水のない場所には、人は住めない。"
      },
      {
        "translation": "言葉のない世界は、想像するのが難しい。"
      },
      {
        "translation": "愛のない結婚は、長続きしない。"
      }
    ]
  },
  "ja_Verb_143": {
    "title": "動詞ば形 ＋ きりがない (〜ba kiri ga nai)",
    "shortExplanation": "ある行為（数え上げ、不満、悪口など）を始めると、際限がなくいつまでも終わらないことを表し、「〜し出したらきりがない」「〜すれば限度がない」という意味を表します。",
    "longExplanation": "「～ばきりがない」は、動詞の仮定形（ば形）に「限度・限界がない」を意味する慣用句「きりがない」が結合したN1の文型です。悪口、欠点、不満、あるいは実例などを一度挙げ始めると、その数が膨大であったり延々と続いて終わりが見えなくなったりすることを強調する際に用いられます。",
    "formation": "動詞ば形 ＋ きりがない",
    "examples": [
      {
        "translation": "悪口を言い始めればきりがない。"
      },
      {
        "translation": "彼の欠点を数えればきりがない。"
      },
      {
        "translation": "この国の美しい場所は、挙げればきりがない。"
      },
      {
        "translation": "ほかにも例を挙げればきりがない。"
      }
    ]
  },
  "ja_Verb_144": {
    "title": "動詞ます形 ＋ もしないで (〜mo shinai de)",
    "shortExplanation": "当然最初に行うべき動作を全く行わないまま次の行動を取ることを非難・呆れて述べ、「〜さえしないで」「〜もしないまま」という意味を表します。",
    "longExplanation": "「～もしないで」は、動詞の連用形（ます形語幹）に接続し、本来ならば事前に行うのが当然である基本的な動作や確認作業を全くしようともせず、軽率に次の行動を進めてしまう態度に対する批判、不満、呆れを表すN1の文型です（「調べもしないで答える」「勉強もしないで受ける」など）。",
    "formation": "動詞ます形（連用形語幹） ＋ もしないで",
    "examples": [
      {
        "translation": "調べもしないで、答えを書きました。"
      },
      {
        "translation": "彼は試験を勉強もしないで、テストに合格した。"
      },
      {
        "translation": "彼女はその本を読みもしないで、レポートを書いた。"
      },
      {
        "translation": "準備もしないで、プレゼンテーションを始めました。"
      }
    ]
  },
  "ja_Verb_145": {
    "title": "動詞ます形 ＋ やしない (〜yashinai)",
    "shortExplanation": "くだけた口語において強い否定や不満・苛立ちを表し、「絶対に〜しない」「〜するはずがない」という意味を表します。",
    "longExplanation": "「～やしない」は、口語において「～はしない」が音変化した強調表現で、動詞の連用形（ます形語幹）に接続します。「全く〜しない」「絶対に〜するわけがない」という断定的な強い否定を表し、話し手の不満、苛立ち、愚痴、あるいは頑なな拒絶といった強い感情を伴うことが特徴です。",
    "formation": "動詞ます形（連用形語幹） ＋ やしない",
    "examples": [
      {
        "translation": "こんな時に泣きやしない。"
      },
      {
        "translation": "私が彼を助けやしない。"
      },
      {
        "translation": "彼がそんなことを言いやしない。"
      },
      {
        "translation": "私がそんな高価なものを買いやしない。"
      }
    ]
  },
  "ja_Verb_146": {
    "title": "動詞辞書形 / ない形 ＋ ように (〜you ni)",
    "shortExplanation": "目的（〜するように）、様態（〜したとおりに）、習慣的な努力（〜するようにする）、あるいは指示や祈願（〜するように）を表します。",
    "longExplanation": "「～ように」は、動詞の辞書形やない形に接続し、目的や様態、努力の方向性などを表す基本的な文型です。後続に「努力する」「気をつける」「〜ようにしている」を伴うことで、ある状態を維持・実現するための継続的な努力を表し、「言う」「頼む」などの伝達動詞を伴うことで婉曲な指示や命令の間接引用を表します。また、指示された通りに行う様態を表す用法もあります。",
    "formation": "動詞辞書形 / ない形 ＋ ように（＋ する / 努力する / 言う など）",
    "examples": [
      {
        "translation": "この問題を解くように努力します。"
      },
      {
        "translation": "彼が言ったようにやりましょう。"
      },
      {
        "translation": "毎日走るようにしています。"
      },
      {
        "translation": "自分の心を大切にするように。"
      }
    ]
  },
  "ja_Verb_147": {
    "title": "動詞意向形 ＋ か ＋ 動詞 ＋ まいか (〜you ka〜mai ka)",
    "shortExplanation": "ある行為をしようか、それともやめようかと二者択一の間で激しく迷い悩む心情を表し、「〜しようか〜すまいか」という意味を表します。",
    "longExplanation": "「～ようか～まいか」は、同一動詞の意向形（意志形）と打ち消しの意志形（〜まい）を並列させて、正反対の選択肢の間で決めかねて葛藤する心理状態を表すN1の文型です。後続には「迷う」「悩む」「考える」など、思考や逡巡を表す語が続くのが一般的です。",
    "formation": "動詞意向形 ＋ か ＋ 動詞辞書形（一段動詞は語幹） ＋ まい ＋ か（「する」は「しようかしまいか/すまいか」、「来る」は「こようかくるまいか/こまいか」）",
    "examples": [
      {
        "translation": "彼に話そうか話すまいか、本当に迷っている。"
      },
      {
        "translation": "試験を受けようか受けまいか迷っています。"
      },
      {
        "translation": "あの人に謝ろうか謝るまいか考えています。"
      },
      {
        "translation": "進学しようかしまいか悩んでいる。"
      }
    ]
  },
  "ja_Verb_148": {
    "title": "動詞意向形 ＋ が ＋ 動詞 ＋ まいが (〜you ga〜mai ga)",
    "shortExplanation": "その行為をするかしないかに関わらず、後項の結果や話し手の態度・決意は全く影響を受けず不変であることを表し、「〜しようと〜しまいと」という意味を表します。",
    "longExplanation": "「～ようが～まいが」は、肯定と否定の相反する二つの仮定を並べ、「どちらの事態が生じようとも、後項の成り行きや話し手の意志・判断には何ら影響を与えない」ということを表すN1の文型です。「〜ようと〜まいと」とほぼ同義であり、改まった場面や文章語でも広く用いられます。",
    "formation": "動詞意向形 ＋ が ＋ 動詞辞書形（一段動詞は語幹） ＋ まいが（「する」は「しようがしまいが」、「来る」は「こようかくるまいが」）",
    "examples": [
      {
        "translation": "彼が来ようが来るまいが、パーティーは始まります。"
      },
      {
        "translation": "勉強しようがしまいが、テストの結果は変わらない。"
      },
      {
        "translation": "雨が降ろうが降るまいが、ピクニックに行きます。"
      },
      {
        "translation": "暑かろうが寒かろうが、毎日ジョギングします。"
      }
    ]
  },
  "ja_Verb_149": {
    "title": "動詞ます形 ＋ ようがない (〜you ga nai)",
    "shortExplanation": "そうしたい気持ちや必要があっても、方法や手段が全く存在しないため不可能なことを表し、「〜する方法がない」「〜しようにもできない」という意味を表します。",
    "longExplanation": "「～ようがない」は、動詞の連用形（ます形語幹）に接続し、話し手にその行為を実行したい意志や動機があるにもかかわらず、客観的な手段・方策が完全に欠落していて実行不可能であることを表すN1の文型です。不可抗力や手詰まりの状況に対する深い無力感や諦めのニュアンスを含みます。",
    "formation": "動詞ます形（連用形語幹） ＋ ようがない",
    "examples": [
      {
        "translation": "電車が混んでいて、動きようがない。"
      },
      {
        "translation": "彼はとても早く走るので、追いつきようがない。"
      },
      {
        "translation": "私には理解しようがない。"
      },
      {
        "translation": "どうやっても、これを直しようがない。"
      }
    ]
  },
  "ja_Verb_150": {
    "title": "動詞意向形 ＋ と ＋ 動詞 ＋ まいと (〜you to〜mai to)",
    "shortExplanation": "その行為をするかしないかに関わらず、事態の推移や話し手の決意は変わらないことを表し、「〜しようと〜すまいと」という意味を表します。",
    "longExplanation": "「～ようと〜まいと」は、意味の上では「〜ようが～まいが」と同様に、肯定と否定のいずれの道を選ぼうとも、後項の事態や話し手の揺るぎない態度には全く変化がないことを表すN1の文型です。「〜ようが～まいが」よりも一層文章語的で硬い響きを持ち、厳粛な決意表明や公的な文章において用いられます。",
    "formation": "動詞意向形 ＋ と ＋ 動詞辞書形（一段動詞は語幹） ＋ まいと（「する」は「しようとしまいと」、「来る」は「こようとくるまいと」）",
    "examples": [
      {
        "translation": "あなたが来ようと来るまいと、パーティーは予定通りに始まります。"
      },
      {
        "translation": "彼があそこに行こうと行くまいと、私たちは止めることができません。"
      },
      {
        "translation": "彼女が謝ろうと謝るまいと、事実は変わらない。"
      },
      {
        "translation": "試験を受けようと受けるまいと、親として私はあなたを支えます。"
      }
    ]
  },
  "ja_Verb_151": {
    "title": "動詞意向形 ＋ にも (〜you ni mo)",
    "shortExplanation": "そうしたいという意図や気持ちはあるものの、何らかの障害や事情があってどうしても実行できないことを表し、「〜しようにも（〜できない）」という意味を表します。",
    "longExplanation": "「～ようにも」は、動詞の意向形に助詞「にも」が結合した形で、後続節には「〜できない」「〜無理だ」といった不可能・困難を表す表現が続きます。主観的にはその行動を起こしたいと強く思っているにもかかわらず、身体的制約、状況の悪化、時間的猶予の欠如などにより、思い通りに行動できない無念さやもどかしさを表します。",
    "formation": "動詞意向形 ＋ にも ＋ （後続節に可能動詞の否定形、無理だなど）",
    "examples": [
      {
        "translation": "もう少し速く走ろうにも、足が痛くて無理だ。"
      },
      {
        "translation": "彼に話そうにも、彼は私を無視している。"
      },
      {
        "translation": "もっと勉強しようにも、時間がない。"
      },
      {
        "translation": "彼女に謝ろうにも、彼女はもう怒っている。"
      }
    ]
  },
  "ja_Verb_152": {
    "title": "動詞意向形 ＋ にも ＋ 動詞可能形否定 / 理由 (〜you ni mo 〜renai)",
    "shortExplanation": "〜しようという意志や望みがあっても、何らかの障害や事情があってどうしてもできないことを表し、「〜しようとしても〜できない」という意味を表します。",
    "longExplanation": "「～ようにも～（ら）れない」は、動詞の意向形に「にも」が付き、後続に同一動詞の可能形否定（または不可能な理由を表す節）を伴って、話し手にはその行為を行いたい強い意欲や試みがあるにもかかわらず、客観的な事情・障害に阻まれて実現できないもどかしさや無力感を表す文型です。「〜しようと思ってもできない」「〜したくても〜できない」という強いジレンマを表します。",
    "formation": "動詞意向形 ＋ にも ＋ 動詞可能形否定 / 不可能な理由",
    "examples": [
      {
        "translation": "彼を信じようにも信じられない証拠がある。"
      },
      {
        "translation": "早く出発しようにも車が故障してしまった。"
      },
      {
        "translation": "彼に電話しようにも電話番号を知らない。"
      },
      {
        "translation": "もっと勉強しようにも時間がない。"
      }
    ]
  },
  "ja_Verb_153": {
    "title": "動詞ます形 ＋ ようもない (~you mo nai)",
    "shortExplanation": "その動作を行う手段や方法が全くないことを表し、「どうやっても〜できない」「〜する手段がない」という意味を表します。",
    "longExplanation": "「～ようもない」は、動詞のます形（連用形語幹）に接続し、その動作を実現するための方法、手段、可能性が全く存在しないことを表す文型です。「〜ようがない」とほぼ同様の用法ですが、取り立て助詞「も」が加わることで否定の意がより強調され、「どんな手段を用いても絶対に〜できない」という完全な不可能性を示します。",
    "formation": "動詞ます形（連用形語幹） ＋ ようもない",
    "examples": [
      {
        "translation": "この問題は解きようもない。"
      },
      {
        "translation": "これ以上我慢しようもない。"
      },
      {
        "translation": "彼には通じようもない。"
      },
      {
        "translation": "その薬は飲みようもない。"
      }
    ]
  },
  "ja_Verbる_154": {
    "title": "動詞辞書形 ＋ がままに (〜ga mama ni)",
    "shortExplanation": "作為や抵抗を加えず、あるがままの自然な状態や成り行きに任せることを表し、「〜するがままに」「〜の通りに任せて」という意味を表します。",
    "longExplanation": "「～がままに」は、動詞の辞書形に接続し、人為的な意図や制限を加えずに、その動作や事態の自然な推移・成り行きにそのまま任せる様子を表す文型です（「言われるがままに」「なされるがままに」などの慣用表現も頻出します）。自分から抵抗したりコントロールしようとしたりせず、受動的あるいは自然な流れに従うニュアンスを含みます。",
    "formation": "動詞辞書形 ＋ がままに",
    "examples": [
      {
        "translation": "窓を開けるがままにしておいたら、風が部屋に入ってきました。"
      },
      {
        "translation": "彼女は涙を流すがままに、ただ黙って座っていた。"
      },
      {
        "translation": "子供たちは笑うがままに、公園で走り回っていた。"
      },
      {
        "translation": "日が沈むがままに、私たちは海辺で話し続けました。"
      }
    ]
  },
  "ja_Verbる_155": {
    "title": "動詞辞書形 / た形 ＋ が早いか (verb-ru ga hayai ka)",
    "shortExplanation": "前項の動作が行われるとほとんど同時に、瞬間的に後項の動作や事態が起こることを表し、「〜するとすぐに」「〜するやいなや」という意味を表します。",
    "longExplanation": "「～が早いか」は、動詞の辞書形（またはた形）に接続し、ある行為が終わるか終わらないかの瞬間、間髪を入れずに次の動作や事態が電光石火のように行われる様子を表すN1の文型です。「〜するが早いか」の後には既定の事実を表す文が続き、話し手の意志・希望・命令・働きかけなどの表現は続きません。",
    "formation": "動詞辞書形 / た形 ＋ が早いか",
    "examples": [
      {
        "translation": "部屋に入るが早いか、彼はテレビをつけた。"
      },
      {
        "translation": "電車に乗るが早いか、私はすぐに眠ってしまった。"
      },
      {
        "translation": "彼女が見るが早いか、すぐに泣き始めた。"
      },
      {
        "translation": "給料をもらうが早いか、全て使い果たしてしまった。"
      }
    ]
  },
  "ja_Verbる_156": {
    "title": "動詞辞書形 ＋ くらいなら (〜ru kurai nara)",
    "shortExplanation": "前項のような嫌な事態になるくらいなら、後項の選択肢を選んだ方がまだ良いという気持ちを表し、「〜するくらいなら、むしろ…のほうがましだ」という意味を表します。",
    "longExplanation": "「～くらいなら」は、動詞の辞書形に接続し、前項に極めて受け入れがたい最悪の事態・行為を挙げ、それを受け入れるくらいなら後項の行動をとるほうがずっとましであるという強い忌避や比較選択の心情を表す文型です。「〜するくらいなら、むしろ〜したい／〜ほうがいい／〜ほうがましだ」などの表現が後続することが一般的です。",
    "formation": "動詞辞書形 ＋ くらいなら",
    "examples": [
      {
        "translation": "一人で行くくらいなら、家にいるほうがましです。"
      },
      {
        "translation": "負けるくらいなら、試合をしないほうがいい。"
      },
      {
        "translation": "遅刻するくらいなら、一日休んだほうがいい。"
      },
      {
        "translation": "痛い目に遭うくらいなら、そのリスクは避けます。"
      }
    ]
  },
  "ja_Verbる_157": {
    "title": "動詞辞書形 ＋ ことなしに (Verb-ru koto nashi ni)",
    "shortExplanation": "前項の動作を全く行わないで後項の事を行うことを表し、「〜しないで」「〜することなく」という意味の硬い改まった表現です。",
    "longExplanation": "「～ことなしに」は、動詞の辞書形に接続し、日常会話の「〜ないで」「〜ずに」に相当する改まった書き言葉の文型です。本来行われるべき、あるいは予想される前項の動作や手続きを一切省略したり欠いたりした状態で後項の行為を行うことを表します。",
    "formation": "動詞辞書形 ＋ ことなしに",
    "examples": [
      {
        "translation": "試験を勉強することなしに、合格しました。"
      },
      {
        "translation": "試着することなしに、服を買いました。"
      },
      {
        "translation": "彼は働くことなしに生活しています。"
      },
      {
        "translation": "手続きをすることなしに、退職しました。"
      }
    ]
  },
  "ja_Verbる_158": {
    "title": "動詞辞書形 ＋ ことのないように (Verb-ru koto no nai you ni)",
    "shortExplanation": "望ましくない事態や失敗が起こらないように注意や配慮を促す表現で、「〜しないように」「〜という事態を避けるために」という意味を表します。",
    "longExplanation": "「～ことのないように」は、動詞の辞書形に接続し、「〜ないように」よりも改まった丁寧な言い方で、前項に挙げる好ましくない結果やトラブルを未然に防ぐための配慮・予防・注意喚起を表す文型です。ビジネス文書や公の場での指示・呼びかけなどで広く用いられます。",
    "formation": "動詞辞書形 ＋ ことのないように",
    "examples": [
      {
        "translation": "車をなくすことのないように、駐車場で必ずロックしましょう。"
      },
      {
        "translation": "風邪を引くことのないように、手をよく洗いましょう。"
      },
      {
        "translation": "試験に落ちることのないように、毎日勉強しましょう。"
      },
      {
        "translation": "間違いをすることのないように、仕事を慎重に行いましょう。"
      }
    ]
  },
  "ja_Verbる_159": {
    "title": "動詞辞書形 ＋ ときりがない (verb-ru to kiri ga nai)",
    "shortExplanation": "一度その動作を始めると、際限がなく終わりが見えない状態になることを表し、「〜すると際限がない」「〜し始めると切りがない」という意味を表します。",
    "longExplanation": "「～るときりがない」は、動詞の辞書形に条件を表す「と」と「終わり・限度」を意味する「きり（限り）」の否定「ない」が結びついた文型です。その行為をやり始めると、対象の数や事態の広がりがあまりにも多くてどこまでも続いてしまい、きりをつけることができなくなる様子を表します。",
    "formation": "動詞辞書形 ＋ と ＋ きりがない",
    "examples": [
      {
        "translation": "彼の悪口を言うときりがない。"
      },
      {
        "translation": "その問題を考えるときりがない。"
      },
      {
        "translation": "彼女の美点を挙げるときりがない。"
      },
      {
        "translation": "この世でおいしいものを食べるときりがない。"
      }
    ]
  },
  "ja_Verbる_160": {
    "title": "動詞辞書形 ＋ ともなく ＋ 動詞 (Verb-ru tomonaku Verb)",
    "shortExplanation": "明確な目的や意識を持たず、ぼんやりと無意識にその動作を行っている様子を表し、「特に〜する気もなく」「何となく〜する」という意味を表します。",
    "longExplanation": "「～ともなく」は、動詞の辞書形に接続し（後項にはしばしば同一または関連する動詞が続く。例：「見るともなく見る」「聞くともなく聞く」など）、明確な目的や強い意志を持たないまま、心ここにあらずの状態で漫然と・無意識にその動作を行っている情景を描写する文型です。",
    "formation": "動詞辞書形 ＋ ともなく ＋ 動詞（主に同一または関連動詞）",
    "examples": [
      {
        "translation": "遠くを見るともなく窓の外を眺めた。"
      },
      {
        "translation": "知るともなく、彼が去ったことを感じた。"
      },
      {
        "translation": "本を読むともなく、ページをめくっていた。"
      },
      {
        "translation": "寝るともなく、ベッドに横になっていた。"
      }
    ]
  },
  "ja_Verbる_161": {
    "title": "動詞辞書形 ＋ ともなしに ＋ 動詞 (Verb-ru tomonashi ni Verb)",
    "shortExplanation": "特定の目的や強い意志を持たずに漫然とその動作を行い、その結果別の事態に至ることを表し、「特に〜する気もなく何となく」「無意識に〜して」という意味を表します。",
    "longExplanation": "「～ともなしに」は、動詞の辞書形に接続し、「～ともなく」とほぼ同義のN1文型です。確固たる動機や意志がなく、ふと無心に・気兼ねなくその動作をしている状態を表します。また、そうして漫然と行動している最中に、思いがけない発見をしたり別の展開に至ったりする文脈で多く用いられます。",
    "formation": "動詞辞書形 ＋ ともなしに ＋ 動詞",
    "examples": [
      {
        "translation": "本を読むともなしに眠ってしまった。"
      },
      {
        "translation": "軽い気持ちで手紙を書くともなしに、彼に本心を告白した。"
      },
      {
        "translation": "散歩をするともなしに、新しいカフェを見つけた。"
      },
      {
        "translation": "洋服を整理するともなしに、昔の写真を見つけた。"
      }
    ]
  },
  "ja_Verbる_162": {
    "title": "動詞辞書形 ＋ なり (Verb-ru nari)",
    "shortExplanation": "前項の動作が終わるやいなや、引き続いてすぐに後項の動作を行うことを表し、「〜するとすぐに」「〜するやいなや」という意味を表します。",
    "longExplanation": "「～なり」は、動詞の辞書形に接続し、ある行為が完了した直後に、間を置かず次の動作に移る様子を表す文型です。前後の主語は通常同一（主に三人称）であり、後項には予想外の行動や素早い反射的動作が続きます。文末に命令や依頼、働きかけなどの表現を使うことはできません。",
    "formation": "動詞辞書形 ＋ なり",
    "examples": [
      {
        "translation": "家に帰るなり、すぐに寝た。"
      },
      {
        "translation": "彼が駅に着くなり、電話をかけてきた。"
      },
      {
        "translation": "ドアを開けるなり、犬が吠え始めた。"
      },
      {
        "translation": "テストが終わるなり、彼は教室を出て行った。"
      }
    ]
  },
  "ja_Verbる_163": {
    "title": "名詞 / 動詞辞書形 ＋ にとどまらず～も (Verb-ru ni todomarazu ~ mo)",
    "shortExplanation": "ある事態が前項の範囲内だけに留まらず、さらに広く及んでいることを表し、「〜だけに終わらず…も」「〜にとどまらないで…も」という意味を表します。",
    "longExplanation": "「～にとどまらず」は、名詞または動詞の辞書形に接続し、事態の影響や規模がある特定の狭い範囲・枠内に限定されず、それを超えてさらに広い範囲や別の対象にまで広がっていることを表すN1の文型です。後項には「〜も」などの取り立て助詞を伴うことが多く、範囲の拡大や発展を示します。",
    "formation": "名詞 / 動詞辞書形 ＋ にとどまらず ＋ 名詞/節 ＋ も",
    "examples": [
      {
        "translation": "彼は仕事にとどまらず、ボランティア活動もしている。"
      },
      {
        "translation": "この機能は写真撮影にとどまらず、動画撮影も可能です。"
      },
      {
        "translation": "このレストランは日本料理にとどまらず、中華料理も提供しています。"
      },
      {
        "translation": "その企業は製造業にとどまらず、流通業務も手がけている。"
      }
    ]
  },
  "ja_Verbる_164": {
    "title": "動詞辞書形 / 名詞 ＋ にはあたらない (Verb-ru ni wa ataranai)",
    "shortExplanation": "それほど大した事態ではないため、そこまでするほどの価値や必要性はないことを表し、「〜するほどのことではない」「〜するには及ばない」という意味を表します。",
    "longExplanation": "「～にはあたらない」は、動詞の辞書形や名詞に接続する改まった文型の表現です。状況の程度がそれほど深刻・重大ではないため、大げさに反応したり取り乱したりする必要性・妥当性がないことを客観的に述べます。感情や評価を表す動詞とともに頻繁に用いられます。",
    "formation": "動詞辞書形 / 名詞 ＋ にはあたらない",
    "examples": [
      {
        "translation": "パニックに陥るにはあたらない。"
      },
      {
        "translation": "彼に謝るにはあたらない。"
      },
      {
        "translation": "そのようなことを心配するにはあたらない。"
      },
      {
        "translation": "それについて深く考えるにはあたらない。"
      }
    ]
  },
  "ja_Verbる_165": {
    "title": "動詞辞書形 ＋ にも (Verb-ru ni mo)",
    "shortExplanation": "その動作を行おうとしても、事情や条件の制約があって困難または不可能な状況であることを表し、「〜しようとしても（事情があってできない）」という意味を表します。",
    "longExplanation": "「動詞辞書形 ＋ にも」は、後続節にその動作の実行を妨げる障害や理由を伴い、話し手がその行為を行おうとする意図があっても、客観的な条件不足や困難な状況に阻まれてままならないことを表す文型です。「〜しようにも」と同様に、現実的な障壁によって行為の実現が妨げられているジレンマを表現します。",
    "formation": "動詞辞書形 ＋ にも ＋ （不可能な理由・困難な状況）",
    "examples": [
      {
        "translation": "明日雨が降ったとしても、傘を持つにも荷物が多すぎる。"
      },
      {
        "translation": "試験に落ちたが、もう一度受けるにもお金が足りない。"
      },
      {
        "translation": "彼に会いたいと思っても、彼に会うにも難しい状況だ。"
      },
      {
        "translation": "この空港から彼女の家に行くにもタクシーが必要だ。"
      }
    ]
  },
  "ja_Verbる_166": {
    "title": "動詞意向形 ＋ にも ＋ 動詞可能形否定 (Verb-ru ni mo Verb-re nai)",
    "shortExplanation": "いくらその行為を行おうと強く望んだり試みたりしても、どうしても実行できないことを強調し、「〜しようとしても〜できない」「〜したくてもできない」という意味を表します。",
    "longExplanation": "「動詞意向形 ＋ にも ＋ 動詞可能形否定」は、同一の動詞を前後に重ねて用い（前節は意向形、後節は可能動詞の否定形）、話し手がその動作を行いたい強い意志や試みを持っているにもかかわらず、客観的な障害や心理的障壁によってどうしても達成できない無力感やジレンマを強く際立たせる文型です。",
    "formation": "動詞意向形 ＋ にも ＋ 動詞可能形否定",
    "examples": [
      {
        "translation": "彼を理解しようにも理解できない。"
      },
      {
        "translation": "走ろうにも走れない。"
      },
      {
        "translation": "泣こうにも泣けない。"
      },
      {
        "translation": "忘れようにも忘れられない。"
      }
    ]
  },
  "ja_Verbる_167": {
    "title": "動詞辞書形 ＋ べからざる ＋ 名詞 (Verb-ru bekara zaru Noun)",
    "shortExplanation": "名詞を修飾して、「決して〜してはならない…」「〜するべきではない…」という強い禁止や道義的否定を表します。",
    "longExplanation": "「～べからざる」は、古語の助動詞「べし」の打消連体形に由来する硬い改まった表現（N1文型）です。後ろに「行為」「行動」「過ち」「態度」などの名詞を伴い、道徳的・社会的・法的に「決して行ってはならないこと」「許されないこと」を厳格に表します。また、「欠くべからざる（欠くことができない）」「許すべからざる（許してはならない）」など慣用句的にも多用されます。動詞「する」に付く場合は「すべからざる」または「するべからざる」の形をとります。",
    "formation": "動詞辞書形（「する」は「すべからざる」「するべからざる」） ＋ べからざる ＋ 名詞",
    "examples": [
      {
        "translation": "人を裏切るべからざる行為だ。"
      },
      {
        "translation": "子供を傷つけるべからざる行動だ。"
      },
      {
        "translation": "公に嘘をつくべからざる行動だ。"
      },
      {
        "translation": "他人の財産を侵すべからざる行為だ。"
      }
    ]
  },
  "ja_Verbる_168": {
    "title": "動詞辞書形 ＋ べからず (〜ru bekara zu)",
    "shortExplanation": "文末で強い禁止命令を表し、「〜してはならない」「〜するな」という意味を表します。",
    "longExplanation": "「～べからず」は、古語の助動詞「べし」の打消終止形を用いた極めて硬い表現（N1文型）です。文末において「決して〜してはならない」という強い禁止や戒めの命令を下す際に用いられます。主に立て看板や掲示（「芝生に入るべからず」など）、規約、格言・訓戒などで用いられ、日常会話では使用されません。動詞「する」に付く場合は「すべからず」または「するべからず」の形をとります。",
    "formation": "動詞辞書形（「する」は「すべからず」「するべからず」） ＋ べからず",
    "examples": [
      {
        "translation": "嘘をつくべからず。"
      },
      {
        "translation": "彼らの秘密を漏らすべからず。"
      },
      {
        "translation": "ルールを破るべからず。"
      },
      {
        "translation": "勉強を怠るべからず。"
      }
    ]
  },
  "ja_Verbる_169": {
    "title": "動詞辞書形 ＋ べく (Verb-ru beku)",
    "shortExplanation": "強い意図や目的を持って行動することを表し、「〜しようと思って」「〜するために」という意味を表します。",
    "longExplanation": "「～べく」は、古語の助動詞「べし」の連用形に由来する硬い改まった文語的表現（N1文型）です。「〜するために」「〜しようと決心して」という強い目的意識を表し、その目的を果たすために後続の積極的・意志的な行動をとることを示します。前後の主語は同一であり、文末に依頼や命令などの働きかけの表現は用いません。動詞「する」に付く場合は主に「すべく」（または「するべく」）となります。",
    "formation": "動詞辞書形（「する」は主に「すべく」「するべく」） ＋ べく",
    "examples": [
      {
        "translation": "成功するべく、日々努力しています。"
      },
      {
        "translation": "健康を維持するべく、毎日運動をしています。"
      },
      {
        "translation": "彼は学位を得るべく、毎日勉強しています。"
      },
      {
        "translation": "早く目的地に到着するべく、タクシーを呼びました。"
      }
    ]
  },
  "ja_Verbる_170": {
    "title": "動詞辞書形 ＋ べくもない (Verb-ru beku mo nai)",
    "shortExplanation": "その状況ではどう考えても実現が不可能であることを表し、「とても〜できない」「〜できるわけがない」という意味を表します。",
    "longExplanation": "「～べくもない」は、可能を表す文語表現「べく」に取り立て助詞「も」と打消の「ない」が付いた硬い表現（N1文型）です。「その状況から考えて、到底〜することはできない」「〜できるはずがない」という強い不可能の判断を示します。主に「知るべくもない（知る由もない）」「望むべくもない（望むことなど到底できない）」「比べるべくもない（比較にすらならない）」などの慣用的な結びつきでよく用いられます。動詞「する」に付く場合は「すべくもない」または「するべくもない」となります。",
    "formation": "動詞辞書形（「する」は「すべくもない」「するべくもない」） ＋ べくもない",
    "examples": [
      {
        "translation": "その問題はとても難しく、解くべくもない。"
      },
      {
        "translation": "彼女はあまりに速く走って、追いつくべくもない。"
      },
      {
        "translation": "試験の筆記用具を忘れた。書くべくもない。"
      },
      {
        "translation": "彼はとても高く跳ぶ。追い越すべくもない。"
      }
    ]
  },
  "ja_Verbる_171": {
    "title": "動詞辞書形 ＋ までもない (〜ru made mo nai)",
    "shortExplanation": "極めて当然であるか、あるいは些細なことなのでわざわざその行為をする必要がないことを表し、「〜する必要もない」「〜するまでもない」という意味を表します。",
    "longExplanation": "「～までもない」は、動詞の辞書形に接続し、事態が明白・自明であるか、あるいは極めて軽微であるため、わざわざその動作を行うほどの段階・程度には達していないことを表す文型です（「〜するまで及ばない」「〜する必要はない」）。当たり前で誰もが知っていることを表す「言うまでもない（言う必要もない・言わずもがな）」は極めて代表的な慣用表現です。また、過剰な心配や過大な対応が不要であることを示す際にも多用されます。",
    "formation": "動詞辞書形 ＋ までもない",
    "examples": [
      {
        "translation": "そんなに心配するまでもない。"
      },
      {
        "translation": "電話するまでもないことだ。"
      },
      {
        "translation": "小さな失敗であきらめるまでもない。"
      },
      {
        "translation": "この問題は、会議で話し合うまでもない。"
      }
    ]
  },
  "ja_Verbる_172": {
    "title": "動詞辞書形 ＋ ものとする (〜ru mono to suru)",
    "shortExplanation": "契約書や公的文書、規約などで方針や決定、義務的な取り決めを定める表現で、「〜と決める」「〜することにする」という意味を表します。",
    "longExplanation": "「～ものとする」は、動詞の辞書形に接続し、法律の条文、契約書、規約、公的ガイドラインなどにおいて、当事者間の合意事項や規則、方針を公に決定・規定する際に用いられる公式な文体（N1文型）です。「〜と規定する」「〜と見なす」「〜することとする」という意味を持ち、客観的で厳格な拘束力を持たせる役割を果たします。",
    "formation": "動詞辞書形 ＋ ものとする（丁寧形：ものとします）",
    "examples": [
      {
        "translation": "ここでの話し合いは秘密とするものとします。"
      },
      {
        "translation": "この契約は明日から有効とするものとする。"
      },
      {
        "translation": "彼をチームのリーダーとするものとします。"
      },
      {
        "translation": "この件については終了とするものとする。"
      }
    ]
  },
  "ja_Verbる_173": {
    "title": "動詞辞書形 ＋ や否や (Verb-ru ya ina ya)",
    "shortExplanation": "前項の動作が起こるとほとんど同時に、即座に後項の事態が起こることを表し、「〜するとすぐに」「〜するやいなや」という意味を表します。",
    "longExplanation": "「～や否や」は、動詞の辞書形に接続し、前項の動作が完了したかどうかの瞬間、間髪を入れずに後項の動作や突発的事態が立て続けに生起することを生き生きと描写する文型（N1）です。文末には実際に起こった客観的な事実の描写が続き、話し手の意志・希望・命令・働きかけなどの表現は来ません。",
    "formation": "動詞辞書形 ＋ や否や",
    "examples": [
      {
        "translation": "彼女が家に帰るや否や、すぐにテレビをつけました。"
      },
      {
        "translation": "私が郵便箱を開けるや否や、手紙が落ちました。"
      },
      {
        "translation": "子供たちは学校が終わるや否や、公園に走りました。"
      },
      {
        "translation": "父が新聞を読むや否や、何かに震えていました。"
      }
    ]
  },
  "ja_Verbる_174": {
    "title": "動詞辞書形 ＋ 始末だ (〜ru shimatsu da)",
    "shortExplanation": "良くない経過をたどった結果、最終的に情けない・好ましくない結末に至ってしまったことを表し、「とうとう〜という結末になった」「〜という始末だ」という意味を表します。",
    "longExplanation": "「～始末だ」は、動詞の辞書形に接続し、さまざまな良くない事態や愚かな行為が重なった末に、最終的に極めて不都合で情けない、あるいは悲惨な結末・結果に陥ってしまったことを嘆息や批判を込めて述べる文型（N1）です。「〜てしまう」などのマイナス表現と共起することが多く、話者の自嘲や呆れの気持ちが強く表れます。",
    "formation": "動詞辞書形 ＋ 始末だ（過去形：始末だった）",
    "examples": [
      {
        "translation": "忘れてしまって、パスポートを家に置いてくる始末だった。"
      },
      {
        "translation": "毎晩遅くまで働いて、倒れる始末だ。"
      },
      {
        "translation": "勉強しなかったので、試験に落ちる始末だ。"
      },
      {
        "translation": "電車が遅れたため、会議に遅れる始末だ。"
      }
    ]
  },
  "ja_Verbる_175": {
    "title": "動詞辞書形 / 名詞 ＋ の ＋ 嫌いがある (～ru kirai ga aru)",
    "shortExplanation": "好ましくない傾向や悪い癖、欠点があることを表し、「〜する傾向がある」「〜という嫌いがある」という意味を表します。",
    "longExplanation": "「～嫌いがある」は、動詞の辞書形または「名詞＋の」に接続し、その人物や事態に望ましくない性質・傾向や悪い癖・懸念すべき特徴があることを遠回しに指摘・批判する文型（N1）です。「嫌い」は「好ましくない傾向」を意味し、客観的な事実の指摘にとどまらず、批判や反省、改善すべき点としてのニュアンスを含みます。",
    "formation": "動詞辞書形 / 名詞 ＋ の ＋ 嫌いがある",
    "examples": [
      {
        "translation": "彼女は遅刻する嫌いがある。"
      },
      {
        "translation": "私の父はお酒を飲み過ぎる嫌いがある。"
      },
      {
        "translation": "彼は物をすぐ忘れる嫌いがある。"
      },
      {
        "translation": "彼女は人の話を途中で切る嫌いがある。"
      }
    ]
  },
  "ja_いつまでのやら_176": {
    "title": "いつまで ＋ 動詞辞書形 ＋ のやら (itsumade ~ no yara)",
    "shortExplanation": "先の見えない事態が一体いつまで続くのか見当がつかず、ため息や困惑を込めてつぶやく表現で、「いつまで〜するのだろうか」「いつまで〜することやら」という意味を表します。",
    "longExplanation": "「いつまで～のやら」は、疑問詞「いつまで」に不確かさや詠嘆を表す終助詞「のやら」が結びついた表現です。長く続いている好ましくない状態や大変な状況が一体いつ終わるのか予測がつかず、話し手が困惑、うんざりした気持ち、または強い不安やため息を込めて自問・独白する際によく用いられます。",
    "formation": "いつまで ＋ 動詞辞書形 / 形容詞 / 名詞 ＋ のやら",
    "examples": [
      {
        "translation": "この試験勉強はいつまで続くのやら。"
      },
      {
        "translation": "彼の話がいつ終わるのやら、わからない。"
      },
      {
        "translation": "この雨がいつまで降り続くのやら。"
      },
      {
        "translation": "コロナのパンデミックがいつまで続くのやら。"
      }
    ]
  },
  "ja_が_177": {
    "title": "主語 / 対象 ＋ が ＋ 動詞可能形 (〜ga Verb rareru)",
    "shortExplanation": "主体にその動作を行う能力があること、または状況的に可能であることを表し、「〜することができる」「〜できる」という意味を表します。",
    "longExplanation": "動詞の可能形を用いて、行為者の能力（〜する力がある）や状況的可能（〜できる条件が整っている）を表す文型です。可能動詞が表す動作の対象（目的語）には格助詞「を」ではなく「が」を用いるのが標準的です（例：日本語が話せる）。また、節内の動作主を「が」で示すこともあります。可能形の作り方は、Iグループ（五段動詞）は語尾のウ段音をエ段音に変えて「る」を付け（解く→解ける、運ぶ→運べる）、IIグループ（一段動詞）は語幹に「られる」を付け（食べる→食べられる）、IIIグループ（変格動詞）は「する→できる」「来る→来られる」となります。",
    "formation": "❶ Iグループ（五段動詞）：語尾ウ段→エ段 ＋ る（解く→解ける、運ぶ→運べる）\n❷ IIグループ（一段動詞）：語幹 ＋ られる（食べる→食べられる、見る→見られる）\n❸ IIIグループ（変格動詞）：する → できる / 来る → 来られる\n接続：名詞（対象・主語） ＋ が ＋ 動詞可能形",
    "examples": [
      {
        "translation": "彼がこの問題を解けると思いますか？"
      },
      {
        "translation": "私がその大きな箱を運べるか？"
      },
      {
        "translation": "彼が早く走れると思います。"
      },
      {
        "translation": "彼女は日本語が話せる。"
      }
    ]
  },
  "ja_かと思いきや_178": {
    "title": "普通形 ＋ かと思いきや (〜ka to omoikiya)",
    "shortExplanation": "当初予想していたことと実際の結果が正反対・予想外であることを表し、「〜と思ったところ、なんと」「〜かと思ったら案の定ではなく」という意味を表します。",
    "longExplanation": "「～かと思いきや」は、文語の過去推量表現「思いきや（〜と思っただろうか、いや思わなかった）」に由来する文型（N1）です。文（普通形）に接続し、話し手が「当然こうなるだろう」と予想・推測していたことに対して、実際の展開が全く予想外の反対の結果になった際の驚きや意外性を生き生きと表します。",
    "formation": "普通形（動詞・い形容詞普通形 / な形容詞語幹・名詞 ＋ だ） ＋ かと思いきや",
    "examples": [
      {
        "translation": "明日は晴れるかと思いきや、まさかの雨が降った。"
      },
      {
        "translation": "彼が試験に落ちたかと思いきや、合格していた。"
      },
      {
        "translation": "このケーキは美味しそうだったかと思いきや、全然甘くなかった。"
      },
      {
        "translation": "列車が遅れるかと思いきや、時間通りに到着した。"
      }
    ]
  },
  "ja_がゆえに_179": {
    "title": "名詞 / 動詞 / 形容詞 ＋ がゆえに (～ga yue ni)",
    "shortExplanation": "改まった文語で理由や原因を強調して表し、「〜だからこそ」「〜という理由のために」という意味を表します。",
    "longExplanation": "「～がゆえに」は、理由・原因を表す古語名詞「ゆえ（故）」を用いた格調高い文章語（N1文型）です。「〜のせいで」「〜という理由があるからこそ」と、後項の結果を生み出す決定的な原因・背景を強調します。愛憎などの強い情動、若さや未熟さ、立場や宿命など、文学的・心理的な背景を述べる際に多く用いられます。",
    "formation": "名詞（＋ である） / 動詞普通形 / い形容詞 / な形容詞（＋ な/である） ＋ がゆえに",
    "examples": [
      {
        "translation": "愛情がゆえに、彼は彼女を許した。"
      },
      {
        "translation": "突然の雨がゆえに、試合は延期された。"
      },
      {
        "translation": "彼の努力がゆえに、彼は成功を収めた。"
      },
      {
        "translation": "彼の死がゆえに、彼の家族は深い悲しみに包まれた。"
      }
    ]
  },
  "ja_がゆえの_180": {
    "title": "名詞 / 動詞辞書形 ＋ がゆえの ＋ 名詞 (〜ga yue no Noun)",
    "shortExplanation": "名詞を修飾して、前項の理由・原因から生じた結果であることを表し、「〜だからこその…」「〜に起因する…」という意味を表します。",
    "longExplanation": "「～がゆえの」は、「～がゆえに」の連体修飾形（N1文型）です。後ろに名詞を伴い、その名詞が表す結果・心情・事態が、前項の性質や原因から必然的にもたらされたものであることを格調高く表現します。「若さゆえの過ち（若さがあるからこそ犯してしまった過ち）」のように、深い感慨や文学的なニュアンスを伴って慣用的に用いられることが多々あります。",
    "formation": "名詞 / 動詞辞書形 ＋ がゆえの ＋ 名詞",
    "examples": [
      {
        "translation": "愛がゆえの悲しみ。"
      },
      {
        "translation": "健康がゆえの幸せ。"
      },
      {
        "translation": "悪行がゆえの罰。"
      },
      {
        "translation": "努力がゆえの成功。"
      }
    ]
  },
  "ja_から_181": {
    "title": "名詞1 ＋ から ＋ 名詞2 ＋ に至るまで (〜kara 〜ni itaru made)",
    "shortExplanation": "範囲が一方の極からもう一方の極に及ぶまで極めて広範であることを強調し、「〜から〜にいたるまで」「〜から〜まであらゆる…」という意味を表します。",
    "longExplanation": "「～から～に至るまで」は、起点を表す「から」と終点を表す「に至るまで」を用いて、両端の代表的な例を挙げることで、その範囲・規模が隅々まで及んでいて例外なく包括されていることを強調する改まった文型（N1）です。年齢層、空間、時期、事物の大小や種類など、極めて広範な対象を包括的に述べる際に用いられます。",
    "formation": "名詞1（起点） ＋ から ＋ 名詞2（到達点） ＋ に至るまで",
    "examples": [
      {
        "translation": "このバンドの曲は、青年から老人に至るまで、人々に愛されています。"
      },
      {
        "translation": "小さい物件から大きな建物に至るまで、全てのプロパティの管理を我々が行います。"
      },
      {
        "translation": "朝のニュース放送から夜のドラマに至るまで、テレビは毎日見ています。"
      },
      {
        "translation": "この地域は、春から冬に至るまで旅行者で賑わいます。"
      }
    ]
  },
  "ja_ごとく_182": {
    "title": "～ごとく (〜gotoku)",
    "shortExplanation": "比喩を表す改まった文語的表現で、「まるで〜のように」「〜のごとく」という意味を表します。",
    "longExplanation": "「～ごとく」は、文語助動詞「ごとし（如し）」の連用形で、改まった硬い文章語として用いられます。ある動作や状態を他のものに例えて比喩的に修飾し、「まるで〜のように」「〜の通りに」という意味を表します。副詞として後続の動詞や形容詞などを修飾します。",
    "formation": "動詞普通形（＋かの） / 動詞た形 ＋ ごとく ｜ 名詞 ＋ （の） ＋ ごとく",
    "examples": [
      {
        "translation": "彼はまるで鳥のように飛んでいるかのように見えた。"
      },
      {
        "translation": "彼はまるで死んだかのように深く眠り込んでいた。"
      },
      {
        "translation": "彼女はまるでアイドルのように人々から崇拝されている。"
      },
      {
        "translation": "彼は疾風のごとく素早く駆け抜けた。"
      }
    ]
  },
  "ja_こととて_183": {
    "title": "～こととて (〜koto tote)",
    "shortExplanation": "改まった文章語で理由や事情を表し、「〜のことなので」「〜だから」という意味を表します。",
    "longExplanation": "「～こととて」は、手紙や公的な文章などで用いられる格調高い文語的表現です。「〜という事情があるため」「〜のことゆえ」と原因や前提となる事情を述べ、後続節ではその事情に配慮した行動をとったり、相手に対して理解や容赦、配慮を求めたりする文脈で多く用いられます。",
    "formation": "動詞普通形 ＋ こととて ｜ 名詞 ＋ の（または である） ＋ こととて ｜ な形容詞 ＋ な（または である） ＋ こととて ｜ い形容詞 ＋ こととて",
    "examples": [
      {
        "translation": "彼は裁判に勝つために全財産を投じる覚悟であることから、弁護士に依頼した。"
      },
      {
        "translation": "明日は重要な試験を控えているため、今夜は早く就寝することにします。"
      },
      {
        "translation": "このプロジェクトの成否は会社の命運に関わる重大事であるゆえ、全力を尽くします。"
      },
      {
        "translation": "彼が著名人であるという事情はあるにせよ、プライバシーは保護されるべきだ。"
      }
    ]
  },
  "ja_ずにすんだ_184": {
    "title": "～ずにすんだ (〜zuni sunda)",
    "shortExplanation": "望ましくない事態や負担を負うことなく無事に済んだことを表し、「〜しないで済んだ」「〜しなくてよかった」という意味を表します。",
    "longExplanation": "「～ずにすんだ」は、動詞の否定形「〜ず（に）」に「済む（問題が解決する・収まる）」の過去形が結合した文型です。本来なら発生する恐れがあった好ましくない事態、労力、損失などを免れることができ、胸をなでおろす安堵の気持ちを込めて「〜せずに解決した」「〜しなくて済んだ」という意味を表します。",
    "formation": "動詞ない形（ないを除く） ＋ ずにすんだ（「する」は「せずにすんだ」）",
    "examples": [
      {
        "translation": "彼は事故を起こすこともなく無事に済んだ。"
      },
      {
        "translation": "私は手術を受けずに解決した。"
      },
      {
        "translation": "幸い雨に降られずに済んだ。"
      },
      {
        "translation": "罰金を支払わずに済んでほっとした。"
      }
    ]
  },
  "ja_だろうとなかろうと_185": {
    "title": "～だろうとなかろうと (〜darou to nakarou to)",
    "shortExplanation": "前項の事態が肯定であれ否定であれ関係なく、後項の方針や行動が変わらないことを表し、「〜であろうとなかろうと」「〜であってもなくても」という意味を表します。",
    "longExplanation": "「～だろうとなかろうと」は、推量・意志の「〜だろうと」と否定推量「〜なかろうと」を並立させ、前項の状況や条件が成立しようとしまいと、それとは無関係に話し手の決意や事態の進行が微動だにしないことを強調する表現です。「〜であれ否定であれ関係なく」「〜であろうがなかろうが」という意味を表します。",
    "formation": "動詞普通形 / い形容詞 / な形容詞 / 名詞 ＋ だろうとなかろうと",
    "examples": [
      {
        "translation": "試験が難しいかどうかにかかわらず、全力を尽くして頑張ります。"
      },
      {
        "translation": "彼が来ようと来まいと、私たちは開始します。"
      },
      {
        "translation": "この仕事が面白いかどうかにかかわらず、私は継続します。"
      },
      {
        "translation": "彼が賛成しようと反対しようと、私たちは進行させます。"
      }
    ]
  },
  "ja_つもりだ_186": {
    "title": "～つもりだ (〜tsumori da)",
    "shortExplanation": "話し手の意図や計画を表し、「〜する予定だ」「〜する気である」という意味を表します。",
    "longExplanation": "「～つもりだ」は、動詞の辞書形またはない形に接続し、ある行為を行おう（あるいは行わないでおこう）とする話し手自身の主観的な意図、計画、意志を表す文型です。「〜する気でいる」「〜する予定だ」という意味を表します。主語が三人称の場合は、「〜と言っている」「〜らしい」などの表現を伴って用いられます。",
    "formation": "動詞辞書形 / 動詞ない形 ＋ つもりだ（または つもりです）",
    "examples": [
      {
        "translation": "明日は早起きをする予定です。"
      },
      {
        "translation": "私は日本語を学習する意志を持っています。"
      },
      {
        "translation": "彼は留学する予定であると話した。"
      },
      {
        "translation": "私は来週末に家族と旅行に行く計画を立てている。"
      }
    ]
  },
  "ja_つもりで_187": {
    "title": "～つもりで (〜tsumori de)",
    "shortExplanation": "ある意図や心構え、覚悟を持って行動することを表し、「〜する気持ちで」「〜する気構えで」という意味を表します。",
    "longExplanation": "「～つもりで」は、動詞の辞書形やた形、名詞などに接続し、その行為を行うにあたって抱いている意図、心構え、あるいは覚悟を伴う心理状態を表す文型です。「〜する決意を持って」「〜する意図で」という意味を表します。また、客観的には事実と異なっていても、気持ちの上ではそう仮定して行動する際（「〜した気になって」）にも用いられます。",
    "formation": "動詞辞書形 / 動詞た形 / 名詞 ＋ の ＋ つもりで",
    "examples": [
      {
        "translation": "私は将来日本で暮らす気構えで日本語を勉強しています。"
      },
      {
        "translation": "彼は全財産を失っても構わないという覚悟で賭け事をしました。"
      },
      {
        "translation": "明日の試験に絶対に合格する意気込みで一生懸命勉強します。"
      },
      {
        "translation": "彼は明朝早起きする目的で早めに就寝しました。"
      }
    ]
  },
  "ja_ではすまない_188": {
    "title": "～ではすまない (〜dewa sumanai)",
    "shortExplanation": "事態の深刻さゆえに、その程度の行為や対処だけでは許容・解決されないことを表し、「〜だけでは許されない」「〜では解決しない」という意味を表します。",
    "longExplanation": "「～ではすまない」は、問題の重大性や社会的責任の重さを強調し、単なる言葉の謝罪や軽い措置だけでは責任を果たしたことにならず、事態を収拾することは到底不可能であるという強い判断を表す文型です。「〜だけで終わらせることはできない」「〜では済まされない」という意味で、より重い処分や本格的な補償、責任追及が不可避であることを示します。",
    "formation": "動詞辞書形 / 名詞 / 形容詞 ＋ ではすまない（主に「〜だけではすまない」の形で用いる）",
    "examples": [
      {
        "translation": "ただ口頭で謝罪するだけでは済まされない。何か具体的な行動を起こすべきだ。"
      },
      {
        "translation": "この問題は単に議論を重ねるだけで片付くものではない。具体的な行動計画が必要だ。"
      },
      {
        "translation": "彼の犯した過ちは口頭注意だけで済む問題ではない。彼は責任を取るべきだ。"
      },
      {
        "translation": "この過失は金銭の補償だけで解決できるものではない。信頼を取り戻すには誠心誠意の謝罪が不可欠だ。"
      }
    ]
  },
  "ja_とあって_189": {
    "title": "～とあって (〜to atte)",
    "shortExplanation": "普段とは異なる特別な状況や事情であるため、当然それにふさわしい結果が生じていることを表し、「〜という特別な状況なので」「〜だからこそ」という意味を表します。",
    "longExplanation": "「～とあって」は、特別な行事や時期、状況（春休み、開店日など）を理由として挙げ、その特別な事情があるからこそ、後続のような盛況や結果が生じるのは当然であるという因果関係を客観的に描写する文型です。「〜という事情があるため」と状況を説明・報道する際によく用いられます。",
    "formation": "名詞 / 動詞普通形 ＋ とあって",
    "examples": [
      {
        "translation": "春休みという特別な時期であるため、公園は子供たちで溢れている。"
      },
      {
        "translation": "試験直前という事情もあり、図書館は学生で混み合っている。"
      },
      {
        "translation": "オープン初日ということもあって、その店には大勢の客が列を作っていた。"
      },
      {
        "translation": "彼の誕生日という特別な日なので、友人たちはサプライズパーティーを企画した。"
      }
    ]
  },
  "ja_とあれば_190": {
    "title": "～とあれば (〜to areba)",
    "shortExplanation": "もしそのような特別な条件や状況であるなら当然そうする・そうなることを表し、「〜というなら」「〜のためなら」という意味を表します。",
    "longExplanation": "「～とあれば」は、「もし〜という特別な事態や条件であるならば」という前提を提示し、その状況下であれば進んでその行為をする、あるいは当然そうなるだろうという話し手の強い意欲や必然的な判断を表す文型です。「〜のためならば喜んで〜する」「〜という条件であるなら何でもする」といったニュアンスを伴います。",
    "formation": "動詞普通形 / い形容詞 / な形容詞（だ） / 名詞（だ） ＋ とあれば",
    "examples": [
      {
        "translation": "無料であるというなら、誰でも利用したいと思うはずです。"
      },
      {
        "translation": "この曲が流れると決まっているなら、彼は間違いなく踊り出します。"
      },
      {
        "translation": "明日が休みであるというなら、今夜は夜更かししても差し支えありません。"
      },
      {
        "translation": "彼が参加してくれるというのなら、この催しはきっと成功するに違いありません。"
      }
    ]
  },
  "ja_といえども_191": {
    "title": "～といえども (〜to iedomo)",
    "shortExplanation": "改まった逆接・譲歩の表現で、「〜であっても」「いくら〜とはいっても」という意味を表します。",
    "longExplanation": "「～といえども」は、古語の「と言へども」に由来する硬い文章語的表現です。前項で特別な身分、優れた能力、客観的事実などを提示してそれを認めつつも、後項ではその通念から期待されることとは異なる現実や限界を述べる文型です。「いくら〜であっても例外ではない」「〜とはいっても〜だ」という譲歩・逆接を表します。",
    "formation": "名詞 / 動詞普通形 / 形容詞 ＋ といえども",
    "examples": [
      {
        "translation": "彼がいくら天才であろうとも、過ちを犯すことはあります。"
      },
      {
        "translation": "このパソコンがいくら新品だといっても、不具合は存在します。"
      },
      {
        "translation": "暦の上では春とはいっても、まだ冷え込む日があります。"
      },
      {
        "translation": "彼女がいくら最も愛しい人であろうとも、嫌なものは嫌です。"
      }
    ]
  },
  "ja_といったらありはしない_192": {
    "title": "～といったらありはしない (〜to ittara ari wa shinai)",
    "shortExplanation": "程度が極端で言葉では言い尽くせないほど甚だしいことを表し、「この上なく〜だ」「〜といったらこの上ない」という意味を表します。",
    "longExplanation": "「～といったらありはしない」は、ある状態や性質の度合いが非常に極端であり、「それを言葉で言い表そうとしても、他に比べるものがないほどである」と強調する慣用的な文型です。「〜と言ったら、それ以上のものはない」「言葉に尽くせないほど〜だ」という強い感嘆・強調を表し、驚きや称賛、呆れなどの感情を込めて用いられます。",
    "formation": "名詞（主に「形容詞語幹＋さ」） / い形容詞 / な形容詞 ＋ といったらありはしない",
    "examples": [
      {
        "translation": "彼の英語の堪能さといったら、他に並ぶものがないほどだ。"
      },
      {
        "translation": "このスイーツの美味しさといったら、言葉に尽くせないほど素晴らしい。"
      },
      {
        "translation": "その子の頭の回転の速さといったら、驚くべきものがある。"
      },
      {
        "translation": "彼女の美しさといったら、息をのむほどである。"
      }
    ]
  },
  "ja_といったらありゃしない_193": {
    "title": "～といったらありゃしない (〜to ittara arya shinai)",
    "shortExplanation": "口語で極端な程度を強調する表現で、「言葉にできないほど〜だ」「この上なく〜だ」という意味を表します。",
    "longExplanation": "「～といったらありゃしない」は、「～といったらありはしない」の「ありは」が口語的に縮約されて「ありゃ」となった話し言葉の表現です。日常会話において、ある性質や状態の度合いが並外れて甚だしく、到底言葉では言い表せないほど極端であることを強調します。称賛や感嘆だけでなく、呆れや不満、愚痴などの感情を強く込めて多用されます。",
    "formation": "動詞普通形 / い形容詞 / な形容詞（だ） / 名詞（だ） ＋ といったらありゃしない",
    "examples": [
      {
        "translation": "その店のラーメンの美味しさといったら、言葉に尽くせないほどだ。"
      },
      {
        "translation": "彼女の料理の腕前は、驚くほど見事なものだ。"
      },
      {
        "translation": "今年の冬の寒さは、耐え難いほど厳しい。"
      },
      {
        "translation": "その小説は、夢中になるほど面白い。"
      }
    ]
  },
  "ja_といったらない_194": {
    "title": "～といったらない (〜to ittara nai)",
    "shortExplanation": "その程度が極限に達していて言葉では言い表せないことを強調し、「言葉にできないほど〜だ」「この上なく〜だ」という意味を表します。",
    "longExplanation": "「～といったらない」は、感情や状態の度合いが最高潮・極限に達しており、「それを言葉で言い表そうとしても、適切な表現が見当たらないほど甚だしい」という強調の気持ちを表す文型です。「〜といったらない（言葉がない）」という表現構造から生じたもので、素晴らしさや喜びだけでなく、寒さやだらしなさ、憤りなど様々な極端な状態を描写する際に用いられます。",
    "formation": "い形容詞 / な形容詞（だ） / 名詞（だ） ＋ といったらない",
    "examples": [
      {
        "translation": "今日は言葉にできないほど凍える寒さだ。"
      },
      {
        "translation": "彼女の料理の美味しさといったら、この上ない。"
      },
      {
        "translation": "この子の聡明さといったら、目を見張るものがある。"
      },
      {
        "translation": "彼のだらしなさといったら、呆れて言葉も出ないほどだ。"
      }
    ]
  },
  "ja_ときている_195": {
    "title": "～ときている (〜to kite iru)",
    "shortExplanation": "ある際立った状況や不利な条件を理由・前提として取り上げ、「〜という状況なのだから当然〜だ」という意味を表します。",
    "longExplanation": "「～ときている」は、取り立てて目立つ性質や特別な状況（多くは困難・不都合・マイナスな条件）を提示し、「〜という事情なのだから、後項のような結果になるのも無理はない」という必然的な帰結を導く文型です。日常的な語感があり、「〜ので」「〜だけに」「〜から」「〜うえに」などの表現と結びついて理由や重なる悪条件を強調します。",
    "formation": "動詞普通形 / い形容詞 / な形容詞（だ） / 名詞（だ） ＋ ときている",
    "examples": [
      {
        "translation": "仕事が非常に多忙な状況であるため、なかなか休みを取ることができません。"
      },
      {
        "translation": "景気が悪化している折だけに、会社は大規模な人員削減を発表した。"
      },
      {
        "translation": "旅先で荷物を盗まれるという災難に遭ったのだから、旅行を楽しむどころではない。"
      },
      {
        "translation": "試験が間近に迫っている上に課題も山積みで、本当に大変だ。"
      }
    ]
  },
  "ja_ところを_196": {
    "title": "～ところを (〜tokoro wo)",
    "shortExplanation": "ある動作の最中や特定の状態にあるちょうどその時に、予期せぬ出来事が割り込むことを表し、「〜している最中に」「〜という状況なのに」という意味を表します。",
    "longExplanation": "「～ところを」は、ある行為や状態が進行中であるまさにその瞬間、あるいは特定の状況にあるタイミングをとらえて、不都合な事態や割り込み、妨害が生じたことを表す文型です。「〜の最中だったのに」「〜という折に」と、タイミングの悪さや皮肉な展開を浮き彫りにします。また、改まった挨拶（「お忙しいところを恐縮ですが」など）で相手の状況に配慮する際にも多用されます。",
    "formation": "動詞ている形 / 動詞意向形＋としている / 名詞＋の / い形容詞 / な形容詞＋な ＋ ところを",
    "examples": [
      {
        "translation": "ちょうど映画に没頭している最中に、停電で部屋が真っ暗になった。"
      },
      {
        "translation": "美味しく味わって食べていたところを、彼に全部奪い取られてしまった。"
      },
      {
        "translation": "飛行機がまさに離陸しようとしていたその瞬間に、突如エンジンが停止した。"
      },
      {
        "translation": "彼女が腹を立てている最悪のタイミングで、私は冗談を口にしてしまった。"
      }
    ]
  },
  "ja_とされる_197": {
    "title": "～とされる (〜to sareru)",
    "shortExplanation": "世間一般の認識や共通の評価を表し、「〜と考えられている」「〜と見なされている」という意味を表します。",
    "longExplanation": "「～とされる」は、「とする」の受身形で、ニュース報道や学術論文、公的な文章などで広く用いられる表現です。話者個人の主観ではなく、世間一般の通念や社会的な評価、客観的な事実として「〜と広く認められている」「〜と見なされている」と述べるときに用いられます。",
    "formation": "動詞普通形 ＋ とされる ｜ い形容詞 ＋ とされる ｜ な形容詞 ＋ だとされる ｜ 名詞 ＋ だとされる（「～とされている」の形も多い）",
    "examples": [
      {
        "translation": "サッカーは世界で最も人気のあるスポーツだと見なされています。"
      },
      {
        "translation": "彼はもっとも有能な科学者だと評価されている。"
      },
      {
        "translation": "この建物は地元を代表するランドマークであると見なされています。"
      },
      {
        "translation": "その寺院は古代の貴重な美術工芸品であると評価されている。"
      }
    ]
  },
  "ja_としたところで_198": {
    "title": "～としたところで (〜to shita tokoro de)",
    "shortExplanation": "仮定の譲歩を表し、たとえそれを仮定・実行したとしても結果は変わらないことを強調します。「たとえ〜としても」「〜としたって」。",
    "longExplanation": "「～としたところで」は、逆接の仮定条件を表す表現です。「たとえ一歩譲ってそれを想定・実行したとしても、事態や結果に大きな好転や変化はない」という話者のあきらめ、懐疑、または無駄であるという否定的な判断を表します。後続文には否定的な評価や不確実な推量が続きます。",
    "formation": "動詞普通形 ＋ としたところで ｜ い形容詞 ＋ としたところで ｜ な形容詞 ＋ だとしたところで ｜ 名詞 ＋ だとしたところで",
    "examples": [
      {
        "translation": "たとえ彼が来たとしても、状況は何も変わらないだろう。"
      },
      {
        "translation": "たとえ美味しいお菓子を作れたとしても、それが売れるという保証はない。"
      },
      {
        "translation": "電話をかけてみたところで、彼女が出るとは限らない。"
      },
      {
        "translation": "最高の材料を用いたとしても、必ず美味しく仕上がるとは限らない。"
      }
    ]
  },
  "ja_とすると_199": {
    "title": "～とすると (〜to suru to)",
    "shortExplanation": "仮定や前提を提示し、「もし〜と仮定すれば」「〜だとすれば」という意味を表します。",
    "longExplanation": "「～とすると」は、ある事柄を仮定の条件や前提として設定する表現です。「もし〜だと仮定した場合には」という条件を受け、その前提から論理的に導き出される帰結、予測、判断、あるいは計算結果などを後続文で述べます。",
    "formation": "動詞普通形 ＋ とすると ｜ い形容詞 ＋ とすると ｜ な形容詞 ＋ だとすると ｜ 名詞 ＋ だとすると",
    "examples": [
      {
        "translation": "もし彼が来るのだとすれば、もう間もなく到着するはずです。"
      },
      {
        "translation": "この業務を終わらせると仮定すれば、最低でも3日間は要するでしょう。"
      },
      {
        "translation": "万一戦争が勃発すると仮定したら、多くの人々が犠牲になるでしょう。"
      },
      {
        "translation": "彼が経営責任者だと仮定するならば、多大な責任を背負うことになるはずです。"
      }
    ]
  },
  "ja_とすれば_200": {
    "title": "～とすれば (～to sureba)",
    "shortExplanation": "仮定条件を提示し、「もし〜だとすれば」「〜と仮定するならば」という意味を表します。",
    "longExplanation": "「～とすれば」は、ある状況を仮定の条件や前提として置き（「もし〜だと仮定するならば」）、その前提に立った上での判断、意見、意志、あるいは問いかけを後続文で述べます。客観的帰結に傾きやすい「とすると」に比べ、「とすれば」は話者の意志・希望・働きかけの表現も後続しやすい特徴があります。",
    "formation": "動詞普通形 ＋ とすれば ｜ い形容詞 ＋ とすれば ｜ な形容詞 ＋ だとすれば ｜ 名詞 ＋ だとすれば",
    "examples": [
      {
        "translation": "もし彼が嘘つきだと仮定するなら、その話は到底信用できない。"
      },
      {
        "translation": "あなたが一緒に行ってくれるのであれば、私も喜んで行きます。"
      },
      {
        "translation": "万一彼が浮気しているとするならば、私はどう対処すべきだろうか。"
      },
      {
        "translation": "その薬が効かないとするならば、別の治療法を試すべきです。"
      }
    ]
  },
  "ja_となったら_201": {
    "title": "～となったら (〜to nattara)",
    "shortExplanation": "事態が実際に現実味を帯びたりその段階に直面したりした場合を想定し、「いざ〜となれば」「実際に〜するとなると」という意味を表します。",
    "longExplanation": "「～となったら」は、ある事柄が単なる想像を超えて実際に現実のものとなったり、差し迫った局面を迎えたりした場面を想定する表現です。「もし現実にそうなった場合」という切迫感や決意、戸惑い、感情の揺れを伴うことが多く、後続節には具体的な対応や心境が述べられます。",
    "formation": "動詞普通形 ＋ となったら ｜ 名詞 ＋ となったら",
    "examples": [
      {
        "translation": "実際に旅行へ出かけるとなれば、荷造りを急がなければなりません。"
      },
      {
        "translation": "もし本当に試験に落ちるとなったら、一体どうしたらよいのだろう。"
      },
      {
        "translation": "現実に彼女と別れることになったら、とても耐えられないほど悲しいです。"
      },
      {
        "translation": "いざ結婚するとなれば、人生観も環境も大きく一変することでしょう。"
      }
    ]
  },
  "ja_となると_202": {
    "title": "～となると (〜to naru to)",
    "shortExplanation": "特定の状況や話題を取り上げ、その事態に直面した際に当然生じる事態や反応を表します。「〜ということになると」「〜の段になると」。",
    "longExplanation": "「～となると」は、ある特定の状況や条件を前提としてクローズアップし、「その状況に立ち至った場合」「いざその段になると」という意味を表します。その事態のもとで自然と引き起こされる必然的な心理的反応、予想される成り行き、または論理的帰結が後続文に述べられます。",
    "formation": "動詞普通形 ＋ となると ｜ い形容詞 ＋ となると ｜ な形容詞 ＋ だとなると ｜ 名詞（＋だ） ＋ となると",
    "examples": [
      {
        "translation": "いざ試験のこととなると、多くの学生は緊張を覚えるものだ。"
      },
      {
        "translation": "東京へ転居するということになると、生活費が一気に跳ね上がる。"
      },
      {
        "translation": "締め切りが明日となれば、今夜は徹夜作業を免れそうにない。"
      },
      {
        "translation": "彼がリーダーに就任するとなれば、チームの活動状況は大幅に改善されるかもしれない。"
      }
    ]
  },
  "ja_となれば_203": {
    "title": "～となれば (〜to nareba)",
    "shortExplanation": "事態がそのような局面を迎えるとするならばという仮定を表し、「〜ということになれば」「〜という状況なら」という意味を表します。",
    "longExplanation": "「～となれば」は、ある事態や変化を前提条件として提示し（「もしそのような状況に立ち至るなら」）、その前提を踏まえて必然的に下される判断、対応措置、行動の決意、または働きかけを後続文で述べます。",
    "formation": "動詞普通形 ＋ となれば ｜ い形容詞 ＋ となれば ｜ な形容詞 ＋ だとなれば ｜ 名詞 ＋ だとなれば",
    "examples": [
      {
        "translation": "もし彼がリーダーを引き受けてくれるのであれば、プロジェクトは必ず成功するでしょう。"
      },
      {
        "translation": "明日は雨天になるという見通しならば、ピクニックは中止にしましょう。"
      },
      {
        "translation": "この仕事がすべて完了したという状況なら、休暇を取得しても構いません。"
      },
      {
        "translation": "その試験が難関だというのであれば、なお一層真剣に勉強しなければならない。"
      }
    ]
  },
  "ja_とのことだ_204": {
    "title": "～とのことだ (〜to no koto da)",
    "shortExplanation": "他者から得た情報や伝言を改まった形で伝え、「〜ということだ」「〜と聞いている」という意味を表します。",
    "longExplanation": "「～とのことだ」（丁寧形は「～とのことです」）は、人づてに聞いた話や手紙・連絡事項などを他者に伝える伝聞の表現です。「〜そうだ」よりも改まった丁寧な響きを持ち、ビジネスメールや改まった対話、公的な報告の場で頻繁に用いられます。",
    "formation": "普通形節 ＋ とのことだ（または とのことです） ｜ 名詞 / な形容詞 ＋ だとのことだ",
    "examples": [
      {
        "translation": "今週末にパーティーが催される予定であると伺っております。"
      },
      {
        "translation": "彼は来年ロンドンへ移住されるとのことです。"
      },
      {
        "translation": "彼女は新しい職場に無事就職したと聞いております。"
      },
      {
        "translation": "明日は試験の実施はないとのことです。"
      }
    ]
  },
  "ja_とはいえ_205": {
    "title": "～とはいえ (～to wa ie)",
    "shortExplanation": "前項の事実を認めた上で逆接の事実を述べ、「〜とはいっても」「〜ではあるが」という意味を表します。",
    "longExplanation": "「～とはいえ」は、改まった文章語で用いられる逆接・譲歩の表現です。前項で述べられた事実や事情をひとまず認めた上で（「確かに〜ではあるが」）、そこから当然予想される期待や評価とは食い違う現実、制限、あるいは例外的な側面を後続文で述べます。",
    "formation": "名詞 ＋ とはいえ ｜ な形容詞（＋だ） ＋ とはいえ ｜ い形容詞 ＋ とはいえ ｜ 動詞普通形 ＋ とはいえ",
    "examples": [
      {
        "translation": "彼は確かに頭脳明晰ではあるが、少々怠惰なところがある。"
      },
      {
        "translation": "この料理店は美味ではあるものの、少々値が張る。"
      },
      {
        "translation": "日本は小国であるとはいえ、その技術水準は世界最高峰を誇る。"
      },
      {
        "translation": "彼女は年齢こそ若いものの、非常に実務経験が豊富である。"
      }
    ]
  },
  "ja_とみえて_206": {
    "title": "～とみえて (〜to miete)",
    "shortExplanation": "目に見える様子や状況を根拠に推測を述べ、「〜のようで」「〜らしく」という意味を表します。",
    "longExplanation": "「～とみえて」は、目撃した相手の様子や客観的な状況証拠から、その背景にある事情や心情を推測して述べる表現です（「〜の様子で」「〜と見受けられて」）。後続文には、その推測の裏付けとなる具体的な行動や客観的事実が続きます。",
    "formation": "動詞普通形 ＋ とみえて ｜ い形容詞 ＋ とみえて ｜ な形容詞（＋だ） ＋ とみえて ｜ 名詞（＋だ） ＋ とみえて",
    "examples": [
      {
        "translation": "彼はスポーツが得意らしく、毎日欠かさずジムに通っている。"
      },
      {
        "translation": "彼女は多忙を極めている様子で、なかなか会うことができない。"
      },
      {
        "translation": "田中さんは疲労困憊している様子で、早く帰宅した。"
      },
      {
        "translation": "その店は評判の人気店らしく、常に長蛇の列ができている。"
      }
    ]
  },
  "ja_とみられる_207": {
    "title": "～とみられる (～to mirareru)",
    "shortExplanation": "客観的な状況や証拠に基づいた判断・予測を表し、「〜と考えられる」「〜と推測される」という意味を表します。",
    "longExplanation": "「～とみられる」は、「見る（判断・評価する）」の受動態であり、ニュース報道や公的な報告書などで極めて多用される客観的推量の表現です。断定を避けつつ、現状のデータや状況証拠に基づいて「〜と判断される」「〜という見通しである」と述べる際に用いられます。",
    "formation": "動詞普通形 ＋ とみられる ｜ い形容詞 ＋ とみられる ｜ な形容詞（だ） ＋ とみられる ｜ 名詞（だ） ＋ とみられる（「～とみられている」の形も多い）",
    "examples": [
      {
        "translation": "彼の行動は無責任であると見なされている。"
      },
      {
        "translation": "この絵画はピカソによる作品であると推定されている。"
      },
      {
        "translation": "地震発生後、被害状況はさらに拡大すると見込まれている。"
      },
      {
        "translation": "週末にかけて天候は回復に向かうものと見られています。"
      }
    ]
  },
  "ja_とみると_208": {
    "title": "～とみると (〜to miru to)",
    "shortExplanation": "特定の視点や基準、立場に立って観察・評価し、「〜という観点で見ると」「〜と見なせば」という意味を表します。",
    "longExplanation": "「～とみると」は、物事や人物を特定の視点、立場、前提条件のもとに置いて捉え直す表現です。「〜という観点から眺めると」「〜であると判断すれば」という意味合いを持ち、視点を定めたことで見えてくる新たな見解や正当な評価、対応の必要性が後続文に述べられます。",
    "formation": "動詞普通形 ＋ とみると ｜ い形容詞 ＋ とみると ｜ な形容詞 ＋ だとみると ｜ 名詞 ＋ だとみると",
    "examples": [
      {
        "translation": "この問題を数学的な視座から捉え直してみると、打開策がおのずと見えてきます。"
      },
      {
        "translation": "彼女が極めて優秀な学生であると見なせば、その受賞はごく当然の結果です。"
      },
      {
        "translation": "彼が新入社員であるという前提で評価するならば、その成果は誠に目覚ましい。"
      },
      {
        "translation": "このパンダが絶滅危惧種であると見なす以上、手厚い保護が不可欠です。"
      }
    ]
  },
  "ja_どんなにうが_209": {
    "title": "どんなに～うが (donna ni ～ u ga)",
    "shortExplanation": "極端な程度の譲歩を表し、「どんなに〜しても」「たとえどれほど〜であろうと」という意味を表します。",
    "longExplanation": "「どんなに～うが」は、動詞の意向形や形容詞の推量形（かろう・だろう）に逆接助詞「が」が接続した、語気鋭い譲歩の表現です（「どんなに〜ても」に相当）。前項の動作や状態がどれほど極限まで達しようとも、後続文の事態や話者の決意は一切揺るぎなく変わらないことを強調します。",
    "formation": "どんなに ＋ 動詞意向形 ＋ が（〜ようが / 〜ろうが） ｜ どんなに ＋ い形容詞（〜かろう） ＋ が ｜ どんなに ＋ な形容詞 / 名詞 ＋ だろうが",
    "examples": [
      {
        "translation": "たとえどれほど全力で努力しようとも、彼の驚異的な速さには追いつけない。"
      },
      {
        "translation": "どれほど大量に食べようとも、彼女は決して太らない体質だ。"
      },
      {
        "translation": "どれほど厳しい寒さであろうとも、彼は毎日欠かさずジョギングを行う。"
      },
      {
        "translation": "どれほど猛暑であろうとも、私はエアコンを使いません。"
      }
    ]
  },
  "ja_と言わんばかりに_210": {
    "title": "～と言わんばかりに (〜to iwan bakari ni)",
    "shortExplanation": "実際には口に出さないものの、態度や様子がまるでそう言っているかのように見える様子を表し、「今にも〜と言いそうに」「まるで〜と言わんばかりに」という意味を表します。",
    "longExplanation": "「～と言わんばかりに」（「言わん」は文語の否定・意志形）は、実際には言葉を発していないものの、その人物の仕草、表情、態度から、まるでそう口に出して主張しているかのようにありありと感じ取れる様子を描写する表現です。後続の動詞を副詞的に修飾します。",
    "formation": "動詞普通形 / 意向形 ＋ と言わんばかりに ｜ い形容詞 ＋ と言わんばかりに ｜ な形容詞 ＋ だと言わんばかりに ｜ 名詞 ＋ だと言わんばかりに",
    "examples": [
      {
        "translation": "彼女はまるで自分が優勝したと言いたげに満面の笑みを浮かべた。"
      },
      {
        "translation": "彼は今にも倒れ伏してしまうのではないかと思われるほどの激しい疲労感を漂わせていた。"
      },
      {
        "translation": "彼女は雨の日を嫌がり、早く晴れてほしいと訴えるかのようにじっと窓の外を見つめていた。"
      },
      {
        "translation": "彼の振る舞いは、まるで誰にも信用してもらえないと主張しているかのようであった。"
      }
    ]
  },
  "ja_と言わんばかりの_211": {
    "title": "～と言わんばかりの ＋ 名詞 (～to iwan bakari no Noun)",
    "shortExplanation": "名詞を修飾して、まるでそう言っているかのような表情や態度を表し、「まるで〜と言いたげな（名詞）」という意味を表します。",
    "longExplanation": "「～と言わんばかりの ＋ 名詞」は、「～と言わんばかりに」の連体修飾形です。直後に続く名詞（笑顔、視線、態度、姿、形相など）を修飾し、本人が言葉にしていないにもかかわらず、その表情や仕草から強烈にメッセージが伝わってくる様子を生き生きと描写します。",
    "formation": "動詞普通形 ＋ と言わんばかりの ＋ 名詞 ｜ 普通形節 ＋ と言わんばかりの ＋ 名詞",
    "examples": [
      {
        "translation": "田中さんは、嬉しさのあまり飛び上がらんばかりの満面の笑みを浮かべた。"
      },
      {
        "translation": "彼女は、私に何か話しかけたがっていると言わんばかりの熱い視線を送ってきた。"
      },
      {
        "translation": "その老人は、身を切るような寒さに凍えていると訴えるかのような姿を見せていた。"
      },
      {
        "translation": "彼の全身からは、過度の緊張で硬直していると言わんばかりの張り詰めた空気が漂っている。"
      }
    ]
  },
  "ja_ながらに_212": {
    "title": "～ながらに (～nagara ni)",
    "shortExplanation": "初めからの状態やある状態をそのまま保ち続けていることを表し、「〜のまま」「〜の状態で」という意味を表します。",
    "longExplanation": "「～ながらに」（主に「～ながらにして」の形でも用いられる）は、改まった文章語的な表現で、ある状態や性質が出発点から変化することなくそのまま保持されていることや、ある感情・情勢の中に身を置いたままであることを表します。「生まれながらに（生まれつき）」「涙ながらに（涙を流しながら）」「昔ながらに（昔のまま変わらず）」「子供ながらに（子供であるのに）」など、特定の語と結びついた慣用的な表現として定着しています。",
    "formation": "慣用的固定表現：名詞 / 動詞ます形語幹 ＋ ながらに（主な慣用句：生まれながらに、涙ながらに、昔ながらに、子供ながらに など）",
    "examples": [
      {
        "translation": "彼女は生まれつき類まれな優れた音感を持っている。"
      },
      {
        "translation": "彼はまだ子供でありながらも大人の会話の内容をしっかりと理解していた。"
      },
      {
        "translation": "彼女は涙を流しながら必死に真実を訴えた。"
      },
      {
        "translation": "私たちは昔からの姿を色濃く残して受け継がれている伝統の祭りを大切にしている。"
      }
    ]
  },
  "ja_ながらの_213": {
    "title": "～ながらの ＋ 名詞 (〜nagara no Noun)",
    "shortExplanation": "後続の名詞を修飾し、ある動作と同時に行われる状態を表し、「〜しながらの…」という意味を表します。",
    "longExplanation": "「～ながらの」は、動詞のます形語幹などに接続して後続の名詞を連体修飾し、前項の動作を行いつつ同時並行で進行する事柄を表す文型です。「テレビを見ながらの夕食（テレビを見つつ食べる夕食）」のように、二つの動作が重なり合う状況を名詞句として表現する際に用いられます。",
    "formation": "動詞ます形語幹 ＋ ながら ＋ の ＋ 名詞",
    "examples": [
      {
        "translation": "テレビを見つつ食べる夕食は、子供たちにとってきっと楽しい時間だろう。"
      },
      {
        "translation": "地図を見ながら車を運転する行為は非常に危険です。"
      },
      {
        "translation": "散歩を楽しみながら交わす会話は、心身を大いにリラックスさせてくれます。"
      },
      {
        "translation": "音楽を聴きながら勉強することは、集中力をより高めてくれるかもしれません。"
      }
    ]
  },
  "ja_ながらも_214": {
    "title": "～ながらも (〜nagara mo)",
    "shortExplanation": "前項の状況と対比される意外な事実を表し、「〜であるけれど」「〜にもかかわらず」という意味を表します。",
    "longExplanation": "「～ながらも」は、逆接を表すN1レベルの文型で、前項の客観的な状態や制約から通常予想される結果とは反する事態や行動が後項に生じることを表します（「〜という状態ではあるが、それでも…」）。動詞、い形容詞、な形容詞、名詞に幅広く接続します。",
    "formation": "動詞ます形語幹 / い形容詞辞書形 / な形容詞語幹 / 名詞（または 名詞＋であり） ＋ ながらも",
    "examples": [
      {
        "translation": "彼は貧しい暮らしでありながらも、心豊かな幸せな生活を送っている。"
      },
      {
        "translation": "私は多忙な身でありながらも、毎日欠かさず運動を続けています。"
      },
      {
        "translation": "病気の身でありながらも、彼は休むことなく懸命に仕事を続けました。"
      },
      {
        "translation": "激しい雨が降っているにもかかわらず、彼は散歩に出かけて行った。"
      }
    ]
  },
  "ja_なくはない_215": {
    "title": "～なくはない (〜naku wa nai)",
    "shortExplanation": "二重否定によって控えめな肯定や含みを持たせ、「〜ないわけではない」「〜することも不可能ではない」という意味を表します。",
    "longExplanation": "「～なくはない」は、否定を二度重ねることにより、積極的・全面的ではないものの、消極的・控えめに肯定する気持ちを表す文型です。「完全に否定するわけではない」「可能性が全くないわけではない」というニュアンスを含み、断定を避けて控えめに意見を述べたい場面で用いられます。",
    "formation": "動詞ない形（ないを除く） ＋ なくはない ｜ い形容詞語幹 ＋ くなくはない ｜ な形容詞語幹 / 名詞 ＋ ではなくはない",
    "examples": [
      {
        "translation": "それをやり遂げるのは決して難しくないわけではない。"
      },
      {
        "translation": "彼に自分から話しかけるのは、内心怖くないわけではない。"
      },
      {
        "translation": "映画を観に行くための時間が全くないというわけではない。"
      },
      {
        "translation": "日本語で学術講演を行うことは、決して容易ではないが可能ではある。"
      }
    ]
  },
  "ja_なくもない_216": {
    "title": "～なくもない (〜naku mo nai)",
    "shortExplanation": "二重否定によって消極的な可能性や余地を示し、「〜ないこともない」「〜してもよい」という意味を表します。",
    "longExplanation": "「～なくもない」は、二重否定の形式を用いて「完全に無理だというわけではない」「状況次第では選択肢としてあり得る」と消極的な肯定的態度や許容を表す文型です。「～なくはない」に比べてやや柔軟で、「まあ、それでもいいかもしれない」といった妥協や考慮の余地を含みます。",
    "formation": "動詞ない形（ないを除く） ＋ なくもない ｜ い形容詞語幹 ＋ くなくはない ｜ な形容詞語幹 / 名詞 ＋ ではなくはない",
    "examples": [
      {
        "translation": "彼が間もなく戻ってくるというのなら、少し待たないこともない。"
      },
      {
        "translation": "この書籍が本当に実務の役に立つなら、購入しても悪くはない。"
      },
      {
        "translation": "天候に恵まれるのであれば、ピクニックに出かけるのもやぶさかではない。"
      },
      {
        "translation": "そのプロジェクトが無事に成功を収めれば、昇進の道も全くあり得ない話ではない。"
      }
    ]
  },
  "ja_ならなりに_217": {
    "title": "～なら～なりに",
    "shortExplanation": "その条件や立場にふさわしい相応のやり方や良さがあることを表し、「〜ならそれにふさわしく」という意味を表します。",
    "longExplanation": "「～なら～なりに」は、同一の名詞や形容詞を反復して用い、たとえ制約や特殊な条件があったとしても、その立場や状況に応じた独自の努力、工夫、あるいは味わいがあることを表す文型です。現状を前向きに受け止め、その枠組みの中での価値を認めるニュアンスを伴います。",
    "formation": "名詞 / 形容詞 ＋ なら ＋ （同一の名詞・形容詞） ＋ なりに",
    "examples": [
      {
        "translation": "彼はまだ初心者ではあるが、初心者なりに懸命に努力を重ねている。"
      },
      {
        "translation": "この料理は辛いなら辛いなりに、独特の深い美味しさがある。"
      },
      {
        "translation": "あの人は変わっているなら変わっているなりに、他にはない面白さがある。"
      },
      {
        "translation": "この街は小規模なら小規模なりに、アットホームな楽しさにあふれている。"
      }
    ]
  },
  "ja_には及ばない_218": {
    "title": "～には及ばない (〜ni wa oyobanai)",
    "shortExplanation": "そこまで過剰にする必要がないことを表し、「〜するまでもない」「〜する必要はない」という意味を表します。",
    "longExplanation": "「～には及ばない」は、動詞辞書形や名詞に接続し、ある行為や過度な配慮・努力を行う必要性が全くないこと、あるいはそこまでの大げさな事態には至っていないことを表すN1文型です。「〜するまでもない」「わざわざ〜するには及ばない」という意味で、相手をなだめたり客観的な判断を示したりする際に用いられます。",
    "formation": "動詞辞書形 / 名詞 ＋ には及ばない",
    "examples": [
      {
        "translation": "わざわざファーストクラスを利用するまでもない、エコノミークラスで十分だ。"
      },
      {
        "translation": "会うたびに毎回律儀に手土産を持っていく必要などありません。"
      },
      {
        "translation": "その程度の些細な問題なら先生に尋ねるまでもなく、自分自身で解決できます。"
      },
      {
        "translation": "ほんの小さな失敗に対して、そこまで辛辣な言葉を浴びせるには及ばないだろう。"
      }
    ]
  },
  "ja_に堪えない_219": {
    "title": "～に堪えない (～ni taenai)",
    "shortExplanation": "ひどすぎて見聞きするのが耐えられない状態を表し、「見る／聞く／読むに耐えない」という意味を表します。",
    "longExplanation": "「～に堪えない」は、事態や作品、態度などがあまりにも拙劣、無残、あるいは不快であるため、それを見たり聞いたり読んだりすることに耐えられない気持ちを表す文型です。主に「見るに堪えない」「聞くに堪えない」「読むに堪えない」などの慣用表現として定着しています（※なお、「感謝に堪えない」「感激に堪えない」のように感情名詞に付く場合は、抑えきれないほど強い感情を表す丁寧な表現となります）。",
    "formation": "動詞辞書形 / 名詞 ＋ に堪えない（主に「見る」「聞く」「読む」などの動詞と結びつく）",
    "examples": [
      {
        "translation": "彼の冗談はあまりにも下品で、とても聞くに堪えないものだった。"
      },
      {
        "translation": "その映画は出来栄えがあまりに粗悪で、最後まで見るに堪えないほどだった。"
      },
      {
        "translation": "この小説はストーリーが退屈すぎて、途中で読むに堪えなくなった。"
      },
      {
        "translation": "彼の卑劣な振る舞いは、周りから見ていて本当に見るに堪えない。"
      }
    ]
  },
  "ja_に堪える_220": {
    "title": "～に堪える (～ni taeru)",
    "shortExplanation": "十分に鑑賞や評価に値する優れた価値があることを表し、「〜する価値が十分にある」という意味を表します。",
    "longExplanation": "「～に堪える」は、「～に堪えない」の肯定形であり、対象となる作品や事柄が優れた水準や深みを備えており、しっかりと見たり聞いたり読んだり、あるいは批判や鑑賞に耐えうるだけの価値があることを表します。「見るに堪える」「聞くに堪える」「鑑賞に堪える」などの形で用いられます。",
    "formation": "動詞辞書形 / 名詞 ＋ に堪える（主に「見る」「聞く」「読む」「鑑賞する」などの動詞と結びつく）",
    "examples": [
      {
        "translation": "彼の歌声は非常に素晴らしく、じっくりと聞くに堪える実力がある。"
      },
      {
        "translation": "この小説は読み応えがあり、大人の鑑賞に十分に耐える秀作だ。"
      },
      {
        "translation": "あの映画は何度見返しても感動できる、鑑賞に堪える名作である。"
      },
      {
        "translation": "彼の建設的な意見は、十分に検討し参考にするに堪えるものだ。"
      }
    ]
  },
  "ja_に耐える_221": {
    "title": "～に耐える (～ni taeru)",
    "shortExplanation": "苦痛や過酷な試練、または外部からの強い物理的圧力に持ちこたえることを表し、「〜に耐え忍ぶ」「〜に持ちこたえる」という意味を表します。",
    "longExplanation": "「～に耐える」（漢字は「耐」を用いる）は、肉体的な苦痛や精神的な辛さ、過酷な試練をじっと我慢して持ちこたえること、あるいは強風や地震などの激しい物理的衝撃に破壊されることなく耐え抜くことを表す文型です。「試練に耐える」「重圧に耐える」「地震に耐える」などのように用いられます。",
    "formation": "名詞 ＋ に耐える",
    "examples": [
      {
        "translation": "彼は過酷を極めた厳しい修行の日々をじっと耐え抜いた。"
      },
      {
        "translation": "この橋梁は猛烈な強風の吹き付けにも十分に持ちこたえられる構造だ。"
      },
      {
        "translation": "彼女は胸を引き裂かれるような苦しみにじっと耐え忍んだ。"
      },
      {
        "translation": "この建造物は巨大地震の強い揺れにも耐えることができる。"
      }
    ]
  },
  "ja_に至った_222": {
    "title": "～に至った (〜ni itatta)",
    "shortExplanation": "様々な経過を経て最終的な結果や段階に到達したことを表し、「〜という結末になった」「〜に至った」という意味を表します。",
    "longExplanation": "「～に至った」は、「～に至る」の過去形で、一連の出来事、経過、あるいは多くの曲折を経た結果として、最終的に重大な局面、結論、または事態にまで到達したことを表す文型です。重大な決断や結末、あるいは深刻な事態に立ち至ったことを述べる際に用いられます。",
    "formation": "名詞 / 動詞辞書形 ＋ に至った（または に至る）",
    "examples": [
      {
        "translation": "彼は弛まぬ練習を積み重ねた末に、ついにプロのギタリストの地位に至った。"
      },
      {
        "translation": "粘り強く調査を進める過程で、思いもよらない驚くべき結論に至った。"
      },
      {
        "translation": "この対立問題はエスカレートし、ついに国際的な紛争に至った。"
      },
      {
        "translation": "幾多の苦い失敗を乗り越えて、ようやく確固たる成功に至った。"
      }
    ]
  },
  "ja_に越したことはない_223": {
    "title": "～に越したことはない (〜ni koshita koto wa nai)",
    "shortExplanation": "それが最も安全で望ましい状態であることを表し、「〜であるのが一番良い」「〜に越したことはない」という意味を表します。",
    "longExplanation": "「～に越したことはない」は、動詞「越す（勝る・上回る）」を打ち消した形で、「これを超えるものはない」という原義から、ある行為や条件を満たすことが最も安全・確実で理想的であることを表すN1文型です。「当然そうあるべきだ」「そうであるのが一番無難で望ましい」と述べる際に用いられます。",
    "formation": "動詞辞書形 / い形容詞辞書形 / な形容詞（または である） / 名詞（または である） ＋ に越したことはない",
    "examples": [
      {
        "translation": "何事も前もって早めに準備を整えておくのに越したことはない。"
      },
      {
        "translation": "料理には新鮮な旬の食材を使用するに越したことはない。"
      },
      {
        "translation": "車を運転する際は、常に安全運転を心がけるに越したことはない。"
      },
      {
        "translation": "規則正しい健康的な生活習慣を送るに越したことはない。"
      }
    ]
  },
  "ja_に難くない_224": {
    "title": "～に難くない (～ni katakunai)",
    "shortExplanation": "状況から容易に推察や理解ができることを表す硬い文章語で、「〜するのは難しくない」「容易に〜できる」という意味を表します。",
    "longExplanation": "「～に難くない」（読み：にかたくない）は、改まった格調高い文章語で、客観的な情勢や事態から判断して、相手の心情や事態の背景を推し量ったり理解したりすることが極めて容易であることを表します。主に「想像に難くない」「察するに難くない」「理解に難くない」などの定型表現として用いられます。",
    "formation": "動詞辞書形 / 名詞 ＋ に難くない（主に「想像」「察する」「理解」などと結びつく）",
    "examples": [
      {
        "translation": "目標を達成した彼の歓喜の大きさは、想像するに全く難くない。"
      },
      {
        "translation": "この不本意な結果が彼女をひどく失望させたことは、容易に理解できる。"
      },
      {
        "translation": "彼があれほど激怒した胸の内は、察するに難くない。"
      },
      {
        "translation": "このような憂慮すべき事態が引き起こされた理由は、容易に想像がつく。"
      }
    ]
  },
  "ja_のは_225": {
    "title": "～のは ＋ 名詞 ＋ ぐらいのものだ (〜no wa Noun gurai no mono da)",
    "shortExplanation": "該当するものがそれ一つだけであることを表し、「〜なのは…くらいのものだ」「せいぜい…だけだ」という意味を表します。",
    "longExplanation": "「～のは ＋ 名詞 ＋ ぐらいのものだ」（または「くらいのものだ」）は、ある状況において取り立てて言及するに値するもの、あるいは条件を満たすものがその名詞ただ一つしか存在しないことを強調する表現です。「唯一…だけだ」「せいぜい…程度にすぎない」という限定を表し、往々にして不満や過小評価、諦めの気持ちが込められます。",
    "formation": "動詞普通形 / い形容詞 / な形容詞（＋な） ＋ のは ＋ 名詞 ＋ ぐらいのものだ（または くらいのものだ）",
    "examples": [
      {
        "translation": "この退屈な小説を読む価値など、せいぜい時間つぶし程度のものである。"
      },
      {
        "translation": "今夜の夕食の中で辛うじて満足できたのはピザくらいのものだった。"
      },
      {
        "translation": "この駄作の映画をわざわざ観るなど、単なる時間の無駄遣いというものだ。"
      },
      {
        "translation": "彼と議論を交わしたところで、余計なストレスがたまるくらいのものだ。"
      }
    ]
  },
  "ja_ばものを_226": {
    "title": "～ば～ものを (～ba～mono o)",
    "shortExplanation": "過去の事態に対して強い後悔や遺憾、不満の念を表し、「〜していればよかったのに」という意味を表します。",
    "longExplanation": "「～ば～ものを」は、過去に生じた好ましくない結果に対して、「もし〜していれば好結果が得られたはずなのに、実際にはそうしなかった」という強い後悔、惜別の念、または相手への非難やもどかしさを表すN1文型です。反実仮想の形式をとり、事態の残念さを強く訴えかけます。",
    "formation": "動詞仮定形（ば形） / い形容詞（ければ） / な形容詞・名詞（なら / であれば） ＋ 動詞た形（または普通形） ＋ ものを",
    "examples": [
      {
        "translation": "もっと早く起きさえしていれば、遅刻などせずに済んだものを。"
      },
      {
        "translation": "もう少し粘り強く頑張っていれば、無事に試験に合格できたものを。"
      },
      {
        "translation": "手元に十分な資金がありさえすれば、憧れの新車を購入できたものを。"
      },
      {
        "translation": "一緒に過ごす仲間がいさえすれば、楽しく遊んで過ごせたものを。"
      }
    ]
  },
  "ja_びた_227": {
    "title": "～びた (～bita)",
    "shortExplanation": "そのような様子や気配を帯びていることを表す接尾辞で、「〜のような様子をした」「〜の趣がある」という意味を表します。",
    "longExplanation": "接尾辞「～びた」は、動詞「～びる」の連体形（過去・完了形）で、特定の名詞や形容詞の語幹などに付いて後続の名詞を修飾し、そのものの性質や雰囲気を色濃く帯びているさまを表します。「大人びた（大人のような落ち着きがある）」「古びた（年月を経て古めかしい風情がある）」「田舎びた（都会的でなく素朴な田舎の趣がある）」など、慣用的な複合語として用いられます。",
    "formation": "名詞 / 形容詞語幹 ＋ びた ＋ 名詞（例：大人びた人、古びた建物、田舎びた町 など）",
    "examples": [
      {
        "translation": "大人のように落ち着いて物事を深く考える子供。"
      },
      {
        "translation": "長年愛用してすっかり古めかしくなったカバンを捨てられない。"
      },
      {
        "translation": "どこか田舎の素朴な趣を帯びた雰囲気が、この町の最大の魅力だ。"
      },
      {
        "translation": "彼女は年頃よりも少し大人っぽい落ち着いた服装をしている。"
      }
    ]
  },
  "ja_びる_228": {
    "title": "～びる (〜biru)",
    "shortExplanation": "そのような様子や性質を帯びるようになることを表す動詞を作る接尾辞で、「〜の様子を帯びる」「〜らしくなる」という意味を表します。",
    "longExplanation": "接尾辞「～びる」は、名詞や形容詞の語幹などに付いて二一段（グループ2）動詞を形成し、その事物の持つ気配や性質、風情が表面に現れてくることを表します。多くの場合、状態を表す「～びている」の形で用いられ、「大人びる（大人のような落ち着きを帯びる）」「古びる（年月が経って古めかしくなる）」「田舎びる（田舎特有の素朴さや風情を帯びる）」などの慣用句として用いられます。",
    "formation": "名詞 / 形容詞語幹 ＋ びる（二一段動詞として活用：びる、びて、びている、びた）",
    "examples": [
      {
        "translation": "彼女は実年齢よりもずっと大人びた雰囲気を醸し出している。"
      },
      {
        "translation": "この建物は長い年月が経ち、すっかり古びて風情を増している。"
      },
      {
        "translation": "彼は都会育ちであるにもかかわらず、どこか田舎びた素朴な話し方をする。"
      },
      {
        "translation": "子供がふとした拍子に急に大人びる瞬間を目の当たりにすると驚かされる。"
      }
    ]
  },
  "ja_ぶった_229": {
    "title": "～ぶった (～butta)",
    "shortExplanation": "「～ぶる」の過去形または連体修飾形で、実際はそうでないのにそのように見せかける態度を表し、「〜ぶった」「〜を装った」という意味を表します。",
    "longExplanation": "「～ぶった」は、実際はそうではないのに外見や態度だけそのように取り繕って見せる動詞「～ぶる」の連体修飾形（過去形）です。相手の気取った態度や偽善的な振る舞いに対する批判や皮肉といった否定的なニュアンスを含みます。「偉そうぶった（偉そうに振る舞う）」「大人ぶった（大人のふりをした）」「いい子ぶった（善人ぶった）」などの形で後続の名詞を修飾します。",
    "formation": "名詞 / 形容詞語幹 ＋ ぶる → ぶった ＋ 名詞（例：偉そうぶった態度、大人ぶった口調、いい子ぶった顔 など）",
    "examples": [
      {
        "translation": "彼はまるで何事も知り尽くしているかのように気取った態度を取る。"
      },
      {
        "translation": "偉そうに尊大ぶった物言いをされると、内心少し腹が立つ。"
      },
      {
        "translation": "彼女は大人びた口調を気取って話しているが、実際はまだ高校生にすぎない。"
      },
      {
        "translation": "わざわざ周囲にいい子ぶった態度を取り繕う必要などないよ。"
      }
    ]
  },
  "ja_ぶって_230": {
    "title": "～ぶって (〜butte)",
    "shortExplanation": "「～ぶる」のて形で、実際はそうでないのにそのようなふりをして振る舞うことを表し、「〜のふりをして」「〜ぶって」という意味を表します。",
    "longExplanation": "「～ぶって」は、自分を実際以上に見せかけたり、知ったかぶりや気取った態度をとったりする動詞「～ぶる」のて形です。多くは相手の思い上がりや不誠実な見栄を批判・揶揄する文脈で用いられます。「知ったかぶって（知っているふりをして）」「偉そうぶって（尊大に構えて）」「大人ぶって（大人のまねをして）」のように用いられ、後続の行動へ続きます。",
    "formation": "名詞 / 形容詞語幹 ＋ ぶる → ぶって",
    "examples": [
      {
        "translation": "彼は何事に対しても知ったかぶりをして得意げに語る。"
      },
      {
        "translation": "彼女は何も知らないふりを装って見せていたが、実は全てを把握している。"
      },
      {
        "translation": "彼はいつも周囲に対して偉そうに尊大な態度をとって指図している。"
      },
      {
        "translation": "普段は大人ぶって背伸びしているけれど、まだまだ子供っぽい一面が残っている。"
      }
    ]
  },
  "ja_ぶり_231": {
    "title": "～ぶり (〜buri)",
    "shortExplanation": "時間を表す言葉の後に付き、前回の出来事からその期間が経過した後に再び同じことが起こることを表し、「〜ぶりに」「〜の間隔を経て」という意味を表します。",
    "longExplanation": "接尾辞「～ぶり」は、年・月・日・週などの時間を表す語句に直接接続し、以前にある事柄が行われてからその期間ずっと途絶えていた後、久しぶりに再びその事柄が実現することを表します。「〜年ぶりに」「〜週間ぶりに」のように、空白期間の長さを意識しながら感慨を込めて用いられることが多くあります。",
    "formation": "時間を表す名詞 ＋ ぶり（例：三年ぶり、一週間ぶり、一ヶ月ぶり、五年ぶり など）",
    "examples": [
      {
        "translation": "前回の再会から3年という歳月を経て、彼と久しぶりに再会しました。"
      },
      {
        "translation": "まるまる1週間もの間隔を空けて、久しぶりにジムへ行って汗を流した。"
      },
      {
        "translation": "1ヶ月もの間音沙汰がなかった彼から、久しぶりに手紙が届いた。"
      },
      {
        "translation": "観測史上5年という歳月を経て、この地に久しぶりに雪が降った。"
      }
    ]
  },
  "ja_ぶる_232": {
    "title": "～ぶる (〜buru)",
    "shortExplanation": "実際はそうでないのに、そのように見せかけて気取ることを表す動詞を作る接尾辞で、「〜のふりをする」「〜ぶる」という意味を表します。",
    "longExplanation": "接尾辞「～ぶる」は、名詞や形容詞の語幹などに接続して五一段（グループ1）動詞を作り、実際にはその身分や器量、性質を備えていないにもかかわらず、外見や態度だけそれらしく装って気取るさまを表します。相手の見栄っ張りな態度や偽善、うぬぼれを非難・軽蔑する否定的なニュアンスを含みます。「学者ぶる（学者気取りをする）」「女優ぶる（女優のように振る舞う）」「お嬢様ぶる（令嬢のように気取る）」「無邪気ぶる（純真なふりをする）」などの形で用いられます。",
    "formation": "名詞 / 形容詞語幹 ＋ ぶる（五一段動詞として活用：ぶる、ぶらない、ぶった、ぶって）",
    "examples": [
      {
        "translation": "彼はあたかも全知全能であるかのように学者気取りの態度をとる。"
      },
      {
        "translation": "大女優気取りで振る舞うのはやめて、ありのままの自分らしくありなさい。"
      },
      {
        "translation": "彼女は周囲の目を気にして、いつでも育ちのいいお嬢様ぶっている。"
      },
      {
        "translation": "私がいじめの標的にされている時、無邪気な善人を装ってすます彼女を見て怒りが込み上げた。"
      }
    ]
  },
  "ja_までだ_233": {
    "title": "～までだ (～made da)",
    "shortExplanation": "範囲・期限・程度の限界を示し、「〜までにすぎない」「〜の段階にとどまる」という意味を表します。",
    "longExplanation": "「～までだ」は、時間や範囲、人間関係や知識などの限度を明確に画し、それ以上の領域や段階には決して踏み込まないことを限定・強調する表現です（「〜にとどまり、それ以上ではない」）。なお、動詞に接続して「ただ〜しただけだ（他意はない）」や「いざとなれば〜するだけのことだ（覚悟の表明）」を表す用法もありますが、名詞などに付いて境界線を引く用法としても広く使われます。",
    "formation": "動詞辞書形 / 動詞ない形 ＋ までだ ｜ い形容詞辞書形 ＋ までだ ｜ 名詞 ＋ までだ",
    "examples": [
      {
        "translation": "彼と私の間柄は友人関係にとどまる。それ以上の特別な関係では決してありません。"
      },
      {
        "translation": "飲み放題のサービスは夜の9時までだ。その時間を過ぎると別途追加料金が発生する。"
      },
      {
        "translation": "私たちが把握している情報は昨日の時点までだ。それ以降の最新の更新状況はありません。"
      },
      {
        "translation": "彼の学識は中学生レベルの段階までだ。それ以上の専門的な内容になると理解が追いつかない。"
      }
    ]
  },
  "ja_もなんでもない_234": {
    "title": "～もなんでもない (〜mo nandemonai)",
    "shortExplanation": "事態の重要性や影響力を完全に否定し、「全く大したことではない」「何の意味も持たない」という意味を表します。",
    "longExplanation": "「～もなんでもない」は、ある事柄や性質、身分などが持つ重大性や影響力を強く打ち消し、取るに足らないこととして一蹴する表現です。話者がその事態を全く気にも留めていないことや、問題にする価値すら感じていないという無関心や強気の姿勢を表します。",
    "formation": "動詞辞書形 / 動詞ない形 ＋ もなんでもない ｜ い形容詞辞書形 ＋ もなんでもない ｜ な形容詞 ＋ なもなんでもない（または でもなんでもない） ｜ 名詞 ＋ （だ）もなんでもない",
    "examples": [
      {
        "translation": "100万円の損失を被ることなど、私にとっては痛くも痒くもなく何でもない。"
      },
      {
        "translation": "彼が会社の社長であろうが何だろうが、私にとっては全く関係のないことだ。"
      },
      {
        "translation": "あなたがこちらに来ないとしても、私にとっては少しも痛手ではない。"
      },
      {
        "translation": "それが世間的に美しいものであろうとなかろうと、何一つ価値を持たない。"
      }
    ]
  },
  "ja_ものとして_235": {
    "title": "～ものとして (～mono to shite)",
    "shortExplanation": "ある事柄を仮定や前提として設定し、「〜と仮定して」「〜と見なして」という意味を表します。",
    "longExplanation": "「～ものとして」は、ある状況や条件をあらかじめ確定した前提や仮定として設定し、その仮定に基づいた上で次の行動や判断、手続きを進めることを表す文型です（「〜という前提に立って」「〜であると見なして」）。あらかじめ起こりうる事態を想定して対策を講じる際などに用いられます。",
    "formation": "普通形（動詞 / い形容詞 / な形容詞 ＋ な / 名詞 ＋ の または である） ＋ ものとして",
    "examples": [
      {
        "translation": "後から雨が降るものとあらかじめ想定して、傘を携えて出かけました。"
      },
      {
        "translation": "彼が病気で欠席するものと見なして、代理として私が会議に出席した。"
      },
      {
        "translation": "このケーキが格別に美味しいものと仮定して、皆で均等に分け合いましょう。"
      },
      {
        "translation": "彼女が正式な学生であると見なして、学生割引の手続きを適用しました。"
      }
    ]
  },
  "ja_んがために_236": {
    "title": "～んがために (〜n ga tame ni)",
    "shortExplanation": "強い目的意識や重大な決意を表す改まった文章語的表現で、「〜するために」「〜することを目的として」という意味を表します。",
    "longExplanation": "「～んがために」（または「～んがため」）は、古語の助動詞「む」に由来する格調高い文章語の表現で、ある重大な目的や強い願望を達成するために、強い決意をもって並々ならぬ努力や行動を起こすことを表します（「どうしても〜するために」）。後続文には強い意志を伴う行為が述べられます。動詞の未然形（ない形の「ない」を除いた形）に接続し、「する」は不規則に「せんがために」となります。",
    "formation": "動詞未然形（ない形語幹） ＋ んがために（例外：する → せんがために）",
    "examples": [
      {
        "translation": "自らの健康な身体を維持せんがために、毎日欠かさず運動に励んでいます。"
      },
      {
        "translation": "難関試験に何としても合格せんがために、身を粉にして懸命に勉強する。"
      },
      {
        "translation": "明日に控えた重要試験に万全に備えんがため、今夜は早めに就寝する所存です。"
      },
      {
        "translation": "彼女の喜ぶ笑顔をひと目見んがために、毎日彼女のもとへと足を運ぶ。"
      }
    ]
  },
  "ja_んばかりに_237": {
    "title": "～んばかりに (〜n bakari ni)",
    "shortExplanation": "今にもその動作をしそうな様子や、まるでそう言わんとする勢いを表し、「今にも〜しそうに」「〜と言わんばかりに」という意味を表します。",
    "longExplanation": "「～んばかりに」（名詞を修飾する場合は「～んばかりの」）は、今にもある動作や現象が起こりそうなほど差し迫った様子や、言葉には出さないものの態度や表情が雄弁にその内容を物語っているさまを臨場感豊かに描写する文型です（「あたかも〜しそうな勢いで」）。動詞の未然形に接続し、「する」は「せんばかりに」となります。",
    "formation": "動詞未然形（ない形語幹） ＋ んばかりに（例外：する → せんばかりに）",
    "examples": [
      {
        "translation": "彼は自分は何も知らないと言わんばかりの態度で、私の質問を無視した。"
      },
      {
        "translation": "その幼子は今にも大声で泣き出しそうに顔を激しく歪めた。"
      },
      {
        "translation": "彼女は思わず吹き出して大笑いしそうになり、慌てて手で口元を覆った。"
      },
      {
        "translation": "彼は退屈で仕方がないと全身で言わんばかりに、何度も大きなため息をついた。"
      }
    ]
  },
  "ja_差し支えない_238": {
    "title": "～差し支えない (〜sashitsukaenai)",
    "shortExplanation": "支障や不都合がないことを丁寧に表し、「問題ない」「構わない」「支障をきたさない」という意味を表します。",
    "longExplanation": "「～差し支えない」（丁寧形：～差し支えありません / ～差し支えないです）は、改まった場面やビジネスシーンでよく用いられる表現で、ある行為を行ったりある状態が生じたりしても、何ら支障や不都合、悪影響が生じないことを礼儀正しく述べる際に用いられます（「〜しても問題ありません」「〜でも差し支えございません」）。主に「〜ても差し支えない」の形で用いられます。",
    "formation": "動詞て形 ＋ も差し支えない ｜ い形容詞連用形（く） ＋ ても差し支えない ｜ な形容詞語幹 / 名詞 ＋ でも差し支えない ｜ 名詞 ＋ が / は差し支えない",
    "examples": [
      {
        "translation": "到着が多少遅れたとしても、業務上特に差し支えございません。"
      },
      {
        "translation": "部屋が多少散らかっていたとしても、私としては一向に差し支えない。"
      },
      {
        "translation": "たとえ雨が降ったとしても、今回の催しには何の支障もございません。"
      },
      {
        "translation": "彼がこの場に同席することについて、何か差し支えはございませんか。"
      }
    ]
  },
  "ja_折に_239": {
    "title": "～折に (〜ori ni)",
    "shortExplanation": "ある事柄が起こる時や機会を改まって表し、「〜の際に」「〜の時に」「〜の機会に」という意味を表します。",
    "longExplanation": "「～折に」（「～折には」「～折の」とも）は、手紙やビジネス文書、改まった会話などで用いられる品格のある表現で、「〜の時に」を丁寧に言い換えた文型です。特定の時期や好機、巡り合わせを捉えてある事柄が行われることを表します（「〜した折に」「〜の機会に」）。",
    "formation": "動詞辞書形 / 動詞た形 / 動詞ている形 ＋ 折に ｜ 名詞 ＋ の ＋ 折に",
    "examples": [
      {
        "translation": "父が病の床に伏していた折に、私は海外へ留学しておりました。"
      },
      {
        "translation": "今度日本へ行かれる折には、ぜひお土産を買ってきてください。"
      },
      {
        "translation": "子供が静かに眠っている折には、どうか静粛にお願いいたします。"
      },
      {
        "translation": "近いうちに彼とお会いになる折に、この手紙をお渡し願えますでしょうか。"
      }
    ]
  },
  "ja_極まりない_240": {
    "title": "～極まりない (〜kiwamarinai)",
    "shortExplanation": "状態や性質がこの上ない極限に達していることを表し（主に否定的な文脈）、「極めて〜だ」「この上なく〜だ」という意味を表します。",
    "longExplanation": "「～極まりない」は、改まった文章語の表現で、ある状態や性質の度合いが極限まで達しており、それ以上はない状態であることを強調します。大半は「失礼」「危険」「非常識」「不衛生」などの好ましくない評価を表す語と結びつき、話者の強い憤りや非難の念を込めて用いられます。",
    "formation": "な形容詞語幹 ＋ 極まりない ｜ い形容詞連用形（く） ＋ こと ＋ 極まりない ｜ 名詞 ＋ 極まりない",
    "examples": [
      {
        "translation": "彼の無礼極まりない態度は、社会人として到底容認できるものではない。"
      },
      {
        "translation": "あのような無謀な運転の仕方は危険極まりない行為だ。"
      },
      {
        "translation": "彼女の常軌を逸したわがままぶりは、非常識極まりない。"
      },
      {
        "translation": "この部屋の凄まじい汚れようは、不衛生極まりないと言わざるを得ない。"
      }
    ]
  },
  "ja_極まる_241": {
    "title": "～極まる (〜kiwamaru)",
    "shortExplanation": "状態や性質が極限・頂点に達していることを表し、「この上なく〜だ」「極めて〜だ」という意味を表します。",
    "longExplanation": "「～極まる」は、「～極まりない」とほぼ同義の格調高い文章語表現で、事態や性質の度合いが極限に達していることを強調します。「失礼極まる（極めて無礼である）」「非常識極まる（常識を甚だしく逸脱している）」「無責任極まる（この上なく無責任だ）」「遺憾極まる（痛恨の極みである）」のように、主にな形容詞の語幹と結合して慣用的な定型句として用いられます。",
    "formation": "な形容詞語幹 ＋ 極まる ｜ い形容詞連用形（く） ＋ こと ＋ 極まる",
    "examples": [
      {
        "translation": "彼の言動の数々は失礼極まり、断じて許容されるものではない。"
      },
      {
        "translation": "そのような反抗的な態度は非常識極まり、良識を疑う。"
      },
      {
        "translation": "公式の場での彼女の発言は無責任極まり、非難に値する。"
      },
      {
        "translation": "このような重大な誤解が生じてしまったことは、遺憾極まる次第であります。"
      }
    ]
  },
  "ja_足りない_242": {
    "title": "～足りない (～tarinai)",
    "shortExplanation": "数量や時間、能力などが十分でなく、不足していることを表し、「足りていない」「不足している」という意味を表します。",
    "longExplanation": "「～足りない」は、動詞「足りる（十分にある、満ちている）」の否定形であり、数量、時間、詳細、能力などが基準や必要とされる量に達しておらず、欠けている状態を表します。「まだ足りない」「～が足りない」などの形で、物足りなさや不足を直接的に言い表す際に日常的にも広く使われます。",
    "formation": "名詞 ＋ (が) 足りない ｜ 動詞普通形 ＋ ほど / だけ ＋ (が) 足りない",
    "examples": [
      {
        "translation": "私の日本語能力はまだまだ不十分で、十分なレベルには達していない。"
      },
      {
        "translation": "時間が不足しているため、今すぐに出発しなければならない。"
      },
      {
        "translation": "彼の説明には詳しい内容や具体性が欠けている。"
      },
      {
        "translation": "料理を作るために必要な食材が不足している。"
      }
    ]
  },
  "ja_足る_243": {
    "title": "～足る ＋ 名詞 (〜taru Noun)",
    "shortExplanation": "後続の名詞を修飾し、それを行うだけの十分な価値や資格・理由があることを表し、「〜するに値する」「〜するのに十分な」という意味を表します。",
    "longExplanation": "「～に足る＋名詞」は、改まった文語調の表現であり、名詞または動詞の辞書形に接続して後続の名詞を連体修飾します。ある対象がそれにふさわしい価値や資格、根拠を十分に備えており、その評価や行為を行うに値することを表します（「信頼に足る人物」「読むに足る本」など）。日常会話で用いる動詞「足りる」と異なり、格調高い文章語として定着しています。",
    "formation": "名詞 / 動詞辞書形 ＋ に足る ＋ 名詞",
    "examples": [
      {
        "translation": "彼は心から信頼するに値する人物である。"
      },
      {
        "translation": "この小説は時間をかけてじっくり読む価値が十分にある。"
      },
      {
        "translation": "本格的に検討を進めるに値するデータが十分に集まった。"
      },
      {
        "translation": "彼の説明は十分に信用するに値するものだと思う。"
      }
    ]
  },
  "ja_限りだ_244": {
    "title": "～限りだ (〜kagiri da)",
    "shortExplanation": "話し手の感情や心理状態が最高潮・極限に達していることを表し、「これ以上ないほど〜だ」「非常に〜だと感じる」という意味を表します。",
    "longExplanation": "「～限りだ」（N1）は、話し手の主観的な感情や気持ちが極限・極致に達していることを強く表す文型です。「嬉しい」「悲しい」「寂しい」「羨ましい」「幸せ」「驚き」など、心情や感情を表す語句と結びつき、「最高に〜だ」「この上なく〜だ」という強い感動や情動を述べるときに用いられます。",
    "formation": "い形容詞 ＋ 限りだ ｜ な形容詞 ＋ な / である ＋ 限りだ ｜ 名詞 ＋ の ＋ 限りだ（または感情を表す動詞た形 ＋ 限りだ）",
    "examples": [
      {
        "translation": "彼女が何の前触れもなく突然辞めてしまい、これ以上ないほど驚いている。"
      },
      {
        "translation": "息子が立派に成功を収めてくれて、この上なく嬉しい気持ちでいっぱいだ。"
      },
      {
        "translation": "このように見事な美しい花々を眺められるとは、最高の幸せである。"
      },
      {
        "translation": "無事に試験に合格することができ、心からほっとして安心している。"
      }
    ]
  }
};

import { GrammarTranslation } from '../../../models/grammar.model';

export const GRAMMAR_VI_JA: Record<string, GrammarTranslation> = {
  "vi_a1_01": {
    "title": "là — コピュラ（〜は〜です）",
    "shortExplanation": "主語と名詞（職業・身分・名称など）を結びつけます。形容詞の前には使いません。",
    "longExplanation": "ベトナム語の「là」は名詞述語にのみ使われ、「AはBである」という同一性を表します。形容詞はそのまま述語になるため、形容詞の前に「là」は置きません。",
    "formation": "主語 + là + 名詞",
    "examples": [{ "translation": "私は学生です。" }, { "translation": "こちらは私の友達です。" }]
  },
  "vi_a1_02": {
    "title": "không phải — 名詞の否定（〜ではありません）",
    "shortExplanation": "名詞や断定内容を否定するときに使います。",
    "longExplanation": "「là」の否定には「không là」ではなく「không phải (là)」を用いるのが自然です。",
    "formation": "主語 + không phải (là) + 名詞",
    "examples": [{ "translation": "彼は医者ではありません。" }, { "translation": "これは私のではありません。" }]
  },
  "vi_a1_03": {
    "title": "không — 一般否定（〜ない）",
    "shortExplanation": "動詞や形容詞の直前に置いて否定文を作ります。",
    "longExplanation": "動詞・形容詞の直前に「không」を置くだけで否定になります。人称や時制による語形変化はありません。",
    "formation": "主語 + không + 動詞 / 形容詞",
    "examples": [{ "translation": "今日は忙しくありません。" }, { "translation": "彼女はコーヒーを飲みません。" }]
  },
  "vi_a1_04": {
    "title": "đang — 進行相（〜している）",
    "shortExplanation": "現在または基準時点で進行中の動作を表します。",
    "longExplanation": "本動詞の直前に「đang」を置き、まさに進行している動作を示します。",
    "formation": "主語 + đang + 動詞",
    "examples": [{ "translation": "私はベトナム語を勉強しています。" }, { "translation": "雨が激しく降っています。" }]
  },
  "vi_a1_05": {
    "title": "đã — 過去・完了（すでに〜した）",
    "shortExplanation": "過去の出来事や完了した動作・状態を表します。",
    "longExplanation": "動詞や形容詞の前に置き、しばしば文末の「rồi（もう）」と呼応して完了を表します。",
    "formation": "主語 + đã + 動詞 (+ rồi)",
    "examples": [{ "translation": "私はもう朝ごはんを食べました。" }, { "translation": "先週、彼らはハノイへ行きました。" }]
  },
  "vi_a1_06": {
    "title": "sẽ — 未来（〜するつもりだ・〜だろう）",
    "shortExplanation": "これからの予定・意志・予測を表します。",
    "longExplanation": "動詞の前に置いて未来の出来事を示します。直前を表す「sắp」より時間的な幅が広いです。",
    "formation": "主語 + sẽ + 動詞",
    "examples": [{ "translation": "明日あなたに電話します。" }, { "translation": "私たちはここに3日間滞在します。" }]
  },
  "vi_a1_07": {
    "title": "có thể — 可能・推量（〜できる・〜かもしれない）",
    "shortExplanation": "能力・許可・可能性を表します。",
    "longExplanation": "動詞の前に「có thể」（否定は「không thể」）を置きます。",
    "formation": "主語 + (không) có thể + 動詞",
    "examples": [{ "translation": "もう少しゆっくり話せますか。" }, { "translation": "今日は行けません。" }]
  },
  "vi_a1_08": {
    "title": "muốn — 願望（〜したい・〜が欲しい）",
    "shortExplanation": "物への欲求や動作への願望を表します。",
    "longExplanation": "「muốn」の後ろに名詞または動詞を直接続けます。",
    "formation": "主語 + muốn + 動詞 / 名詞",
    "examples": [{ "translation": "タピオカミルクティーが飲みたいです。" }, { "translation": "今週末はどこへ行きたいですか。" }]
  },
  "vi_a1_09": {
    "title": "những — 不定複数",
    "shortExplanation": "全体の一部を指す複数の名詞につけます。",
    "longExplanation": "類別詞や名詞の前に置き、特定の集合全体ではなく「いくつかの〜」を表します（全体を指す「các」と対比）。",
    "formation": "những + (類別詞) + 名詞",
    "examples": [{ "translation": "私はこれらの料理が好きです。" }, { "translation": "最初の数日間はとても大変でした。" }]
  },
  "vi_a1_10": {
    "title": "các — 全体を表す複数",
    "shortExplanation": "あるグループに属する全員・すべてを指します。",
    "longExplanation": "「các bạn（みなさん）」など、対象全体を含めて呼びかける際によく使われます。",
    "formation": "các + (類別詞) + 名詞",
    "examples": [{ "translation": "みなさん、こんにちは！" }, { "translation": "生徒たちは課題をしています。" }]
  },
  "vi_a1_11": {
    "title": "hơn — 比較級（〜より…）",
    "shortExplanation": "2つの対象を比べて程度が高いことを表します。",
    "longExplanation": "形容詞・副詞の直後に「hơn + 比較対象」を続けます。",
    "formation": "A + 形容詞 + hơn + B",
    "examples": [{ "translation": "今日は昨日より暑いです。" }, { "translation": "こちらの服のほうがきれいです。" }]
  },
  "vi_a1_12": {
    "title": "nhất — 最上級（いちばん〜）",
    "shortExplanation": "程度や好みが最も高いことを表します。",
    "longExplanation": "形容詞や一部の感情動詞（thích nhất など）の直後に置きます。",
    "formation": "形容詞 / 動詞 + nhất",
    "examples": [{ "translation": "ここは一番おいしい店です。" }, { "translation": "私は秋が一番好きです。" }]
  },
  "vi_a1_13": {
    "title": "bao nhiêu — 数量・値段の疑問詞（いくら・いくつ）",
    "shortExplanation": "値段、数量、期間などを尋ねるときに使います。",
    "longExplanation": "値段を聞くときは「bao nhiêu tiền?」の形でよく文末に置きます。",
    "formation": "名詞 + bao nhiêu / giá bao nhiêu",
    "examples": [{ "translation": "このカップはいくらですか。" }, { "translation": "どのくらい時間が必要ですか。" }]
  },
  "vi_a1_14": {
    "title": "tại sao — 理由の疑問詞（なぜ）",
    "shortExplanation": "理由・原因を尋ねる疑問文を作ります。",
    "longExplanation": "通常は文頭に置き、「なぜ〜ですか」と尋ねます。",
    "formation": "Tại sao + 主語 + 動詞?",
    "examples": [{ "translation": "なぜベトナム語を勉強しているのですか。" }, { "translation": "昨日どうして電話しなかったのですか。" }]
  },
  "vi_a1_15": {
    "title": "như thế nào — 方法・様子の疑問詞（どのように・どう）",
    "shortExplanation": "方法、やり方、状態や感想を尋ねます。",
    "longExplanation": "動詞や主語の後ろに置いて「どうですか」「どうやって〜しますか」を表します。",
    "formation": "主語 + 動詞 + như thế nào?",
    "examples": [{ "translation": "お仕事はどうですか。" }, { "translation": "この料理はどうやって作りますか。" }]
  },
  "vi_a1_16": {
    "title": "nhé — 親密な提案・確認の終助詞（〜ね・〜しよう）",
    "shortExplanation": "文末に添えて誘いや依頼を柔らかく表現します。",
    "longExplanation": "親しい相手に対して「〜しようね」「〜してね」と温かく提案・確認するときに使います。",
    "formation": "提案・依頼文 + nhé",
    "examples": [{ "translation": "お昼ごはんを食べに行きましょうね！" }, { "translation": "私にメッセージするのを忘れないでね。" }]
  },
  "vi_a2_01": {
    "title": "phải — 義務・必要（〜しなければならない）",
    "shortExplanation": "規則や状況による義務・必要性を表します。",
    "longExplanation": "動詞の前に置きます。「không phải」は「〜ではない」という意味になる点に注意が必要です。",
    "formation": "主語 + phải + 動詞",
    "examples": [{ "translation": "今日中に報告書を仕上げなければなりません。" }, { "translation": "明日は早く起きなければなりません。" }]
  },
  "vi_a2_02": {
    "title": "được — 恩恵の受身・許可・達成",
    "shortExplanation": "好ましい受け身、許可（〜してもよい）、動作の達成を表します。",
    "longExplanation": "動詞の前では「〜してもらう・許可される」、動詞の後ろでは「〜できる（達成）」を表します。",
    "formation": "主語 + được + (行為者) + 動詞",
    "examples": [{ "translation": "彼女は先生に褒められました。" }, { "translation": "ここで写真を撮ってもいいですか。" }]
  },
  "vi_a2_03": {
    "title": "bị — 被害・不本意の受身（〜されてしまう）",
    "shortExplanation": "望まない出来事やマイナスの影響を受けるときに使います。",
    "longExplanation": "病気、渋滞、故障など不都合な事柄に用います。良い結果には「được」を使います。",
    "formation": "主語 + bị + (原因) + 動詞 / 形容詞",
    "examples": [{ "translation": "1時間近く渋滞に巻き込まれました。" }, { "translation": "スマホの充電が切れてしまいました。" }]
  },
  "vi_a2_04": {
    "title": "sắp — 近接未来（もうすぐ〜する）",
    "shortExplanation": "まもなく起ころうとしている事柄を表します。",
    "longExplanation": "「sẽ」よりも時間的に切迫している近い未来を示します。",
    "formation": "主語 + sắp + 動詞",
    "examples": [{ "translation": "電車がもうすぐ発車します。" }, { "translation": "もうすぐ着きますか。" }]
  },
  "vi_a2_05": {
    "title": "vừa — 直近の過去（〜したばかり）",
    "shortExplanation": "つい先ほど動作が完了したことを表します。",
    "longExplanation": "強調して「vừa mới」の形でもよく使われます。",
    "formation": "主語 + vừa (mới) + 動詞",
    "examples": [{ "translation": "彼はたった今オフィスを出ました。" }, { "translation": "そのニュースを聞いたばかりです。" }]
  },
  "vi_a2_06": {
    "title": "vẫn — 継続（まだ・相変わらず〜）",
    "shortExplanation": "状態や動作が変わらず続いていることを表します。",
    "longExplanation": "しばしば「vẫn còn」の形で、予想に反して続いていることを示します。",
    "formation": "主語 + vẫn (còn) + 動詞 / 形容詞",
    "examples": [{ "translation": "もう遅いのにまだ起きているんですか。" }, { "translation": "あの店はまだ開いています。" }]
  },
  "vi_a2_07": {
    "title": "chưa bao giờ — 経験の否定（一度も〜ない）",
    "shortExplanation": "これまでの人生で一度も経験がないことを表します。",
    "longExplanation": "「chưa（まだ）」と「bao giờ（いつか）」を組み合わせて動詞の前に置きます。",
    "formation": "主語 + chưa bao giờ + 動詞",
    "examples": [{ "translation": "ダラットには一度も行ったことがありません。" }, { "translation": "こんなに美しい景色は見たことがありません。" }]
  },
  "vi_a2_08": {
    "title": "đã từng — 過去の経験（かつて〜したことがある）",
    "shortExplanation": "過去に少なくとも一度経験したことがある事実を表します。",
    "longExplanation": "具体的な時点よりも人生経験を述べるときに使います。",
    "formation": "主語 + (đã) từng + 動詞",
    "examples": [{ "translation": "ハノイのフォーを食べたことがありますか。" }, { "translation": "以前彼女は日本に住んでいたことがあります。" }]
  },
  "vi_a2_09": {
    "title": "vì ... nên — 原因と結果（〜ので…）",
    "shortExplanation": "原因節と結果節を結びつけます。",
    "longExplanation": "ベトナム語では前の節に「vì」、後ろの節に「nên」をセットで置くのが自然です。",
    "formation": "(Bởi) vì + 原因, nên + 結果",
    "examples": [{ "translation": "雨が降ったので私たちは家にいました。" }, { "translation": "忙しすぎたので彼は電話をかけ忘れました。" }]
  },
  "vi_a2_10": {
    "title": "nếu ... thì — 条件（もし〜なら…）",
    "shortExplanation": "仮定や条件とそれに伴う結果を表します。",
    "longExplanation": "条件節を「nếu」、結果節を「thì」で導きます。",
    "formation": "Nếu + 条件, (thì) + 結果",
    "examples": [{ "translation": "時間があれば立ち寄りましょうね。" }, { "translation": "晴れたら海に行きましょう。" }]
  },
  "vi_a2_11": {
    "title": "trước khi — 〜する前に",
    "shortExplanation": "ある動作より前の時点を示します。",
    "longExplanation": "節または動詞句の前に置きます。",
    "formation": "Trước khi + (主語) + 動詞, 主節",
    "examples": [{ "translation": "出かける前に電気を消すのを忘れないで。" }, { "translation": "食べる前にまず手を洗いましょう。" }]
  },
  "vi_a2_12": {
    "title": "sau khi — 〜した後で",
    "shortExplanation": "先行する動作が完了した後の行動を表します。",
    "longExplanation": "完了した事柄の後ろに主節（しばしば「thì」を伴う）を続けます。",
    "formation": "Sau khi + (主語) + 動詞, (thì) + 主節",
    "examples": [{ "translation": "卒業した後、すぐに働き始めました。" }, { "translation": "夕食の後でお茶を飲みましょうね。" }]
  },
  "vi_a2_13": {
    "title": "giống như — 類似（〜のようだ）",
    "shortExplanation": "2つの物事や状況がよく似ていることを表します。",
    "longExplanation": "名詞同士をつないだり、比較対象の句の前に置いたりします。",
    "formation": "A + giống (như) + B",
    "examples": [{ "translation": "あなたの発音はハノイの人のようです。" }, { "translation": "今日はまるで夏のように暑いです。" }]
  },
  "vi_a2_14": {
    "title": "thử — 試行（〜してみる）",
    "shortExplanation": "試しに行ってみることを表します。",
    "longExplanation": "動詞の直後に置き、よく「xem sao（どうか見る）」と組み合わされます。",
    "formation": "動詞 + thử (+ xem)",
    "examples": [{ "translation": "このブンボーを食べてみてください。" }, { "translation": "彼女に試しに電話してみますね。" }]
  },
  "vi_a2_15": {
    "title": "để — 目的（〜するために）",
    "shortExplanation": "行動の目的や狙いを表します。",
    "longExplanation": "動詞句または別の主語を伴う目的節を導きます。",
    "formation": "主節 + để + (主語) + 動詞",
    "examples": [{ "translation": "運動するために早起きします。" }, { "translation": "みんなが聞こえるように大きな声で話してください。" }]
  },
  "vi_a2_16": {
    "title": "chưa — 未完了（まだ〜ない／もう〜した？）",
    "shortExplanation": "動詞の前で「まだ〜ない」、文末で「もう〜しましたか」を表します。",
    "longExplanation": "日常会話で最も頻繁に使われるアスペクト表現の一つです。",
    "formation": "主語 + chưa + 動詞 / 文 + chưa?",
    "examples": [{ "translation": "宿題はもう終わりましたか。" }, { "translation": "すみません、まだメッセージを見ていません。" }]
  },
  "vi_b1_01": {
    "title": "mặc dù ... nhưng — 譲歩（〜だけれども）",
    "shortExplanation": "予想に反する2つの事実を対比させます。",
    "longExplanation": "ベトナム語では前節に「mặc dù」、後節に「nhưng」を両方使うのが標準的です。",
    "formation": "Mặc dù + 節1, nhưng + 節2",
    "examples": [{ "translation": "寒いにもかかわらず、多くの人が散歩しています。" }, { "translation": "とても忙しかったけれど、彼女は手伝ってくれました。" }]
  },
  "vi_b1_02": {
    "title": "tuy ... nhưng — 軽い譲歩（〜とはいえ）",
    "shortExplanation": "話し言葉・書き言葉の両方で使われる簡潔な譲歩表現です。",
    "longExplanation": "「mặc dù ... nhưng」より軽快で、形容詞や短い節をつなぐ際によく使われます。",
    "formation": "Tuy + 節1, nhưng + 節2",
    "examples": [{ "translation": "店が小さいながらもとても居心地がいいです。" }, { "translation": "まだ3か月しか勉強していないのに、とても上手に話しますね。" }]
  },
  "vi_b1_03": {
    "title": "không những ... mà còn — 累加（〜だけでなく…も）",
    "shortExplanation": "2つの性質や動作が両方備わっていることを強調します。",
    "longExplanation": "後半の要素をより際立たせます。「không chỉ ... mà còn」とも言います。",
    "formation": "không những + A + mà còn + B",
    "examples": [{ "translation": "彼は頭がいいだけでなく、とても勤勉です。" }, { "translation": "この料理はおいしいだけでなく値段も手頃です。" }]
  },
  "vi_b1_04": {
    "title": "vừa ... đã — 直後の展開（〜するとすぐに）",
    "shortExplanation": "最初の動作に続いて次の出来事が瞬時に起こったことを表します。",
    "longExplanation": "「vừa mới ... đã」の形で速さへの驚きを表すこともあります。",
    "formation": "Vừa (mới) + 動作1, đã + 動作2",
    "examples": [{ "translation": "横になった途端に眠り込んでしまいました。" }, { "translation": "雨が止むとすぐに虹が出ました。" }]
  },
  "vi_b1_05": {
    "title": "càng ... càng — 比例変化（〜ば〜ほど）",
    "shortExplanation": "一方の程度が増すにつれてもう一方も比例して変化することを表します。",
    "longExplanation": "2つの形容詞・副詞・動詞の前に置きます。",
    "formation": "(主語) + càng + A + càng + B",
    "examples": [{ "translation": "練習すればするほど自然に話せるようになります。" }, { "translation": "夜が更けるほど寒くなります。" }]
  },
  "vi_b1_06": {
    "title": "có vẻ — 外見からの印象（〜のようだ）",
    "shortExplanation": "見た目の様子から受ける印象を柔らかく述べます。",
    "longExplanation": "断定を避けて「〜そうだ」「〜に見える」と伝えるときに使います。",
    "formation": "主語 + có vẻ (+ như) + 形容詞 / 節",
    "examples": [{ "translation": "今日は少し疲れているように見えますね。" }, { "translation": "この計画はかなり実現可能に見えます。" }]
  },
  "vi_b1_07": {
    "title": "hình như — 確信のない推量（どうやら〜らしい）",
    "shortExplanation": "話し手の控えめな推測や曖昧な記憶を表します。",
    "longExplanation": "100%確信がないとき、文頭や述語の前に置きます。",
    "formation": "Hình như + 節",
    "examples": [{ "translation": "どうやら外でお祭りをやっているようです。" }, { "translation": "どこかであなたにお会いしたことがある気がします。" }]
  },
  "vi_b1_08": {
    "title": "thay vì — 代替選択（〜する代わりに）",
    "shortExplanation": "予定・予想されていた選択肢ではなく別の選択をとることを表します。",
    "longExplanation": "避ける対象の動詞句・名詞句の前に置きます。",
    "formation": "Thay vì + A, (thì) + B",
    "examples": [{ "translation": "バイクに乗る代わりに、今日は歩きましょう。" }, { "translation": "彼女は映画を見る代わりに読書を選びました。" }]
  },
  "vi_b1_09": {
    "title": "ngay khi — 即時（〜するとすぐに）",
    "shortExplanation": "ある出来事とほぼ同時に主節の動作が行われることを強調します。",
    "longExplanation": "「ngay sau khi（〜した直後に）」とも類義です。",
    "formation": "Ngay khi + 節1, 節2",
    "examples": [{ "translation": "空港に着いたらすぐにお母さんに連絡してね。" }, { "translation": "彼が入ってきた瞬間に彼だとわかりました。" }]
  },
  "vi_b1_10": {
    "title": "ngoài ra — 追加情報（そのうえ・さらに）",
    "shortExplanation": "前の内容に加えて補足的なポイントや情報を述べます。",
    "longExplanation": "文頭に置いてコンマで区切り、論理的に話題を広げます。",
    "formation": "Ngoài ra, + 節",
    "examples": [{ "translation": "さらに、毎日十分な水を飲むことも大切です。" }, { "translation": "この部屋はとても広いです。そのうえバルコニーもあります。" }]
  },
  "vi_b1_11": {
    "title": "thậm chí — 極端な例の強調（〜さえ）",
    "shortExplanation": "意外な極端例を挙げて程度を強調します。",
    "longExplanation": "「cũng」「còn」と呼応して文の主語または述語を際立たせます。",
    "formation": "Thậm chí + (主語) + còn / cũng + 動詞",
    "examples": [{ "translation": "彼は忙しすぎて昼ごはんを食べる時間さえありませんでした。" }, { "translation": "ネイティブスピーカーでさえ時々この言葉を間違えます。" }]
  },
  "vi_b1_12": {
    "title": "dần dần — 漸進（だんだん・徐々に）",
    "shortExplanation": "時間をかけて段階的に変化していく様子を表します。",
    "longExplanation": "省略形の「dần」は述語の後ろに置かれます。",
    "formation": "Dần dần + 節 / 動詞 + dần",
    "examples": [{ "translation": "だんだんここの生活リズムに慣れてきました。" }, { "translation": "すべては徐々に落ち着いていくでしょう。" }]
  },
  "vi_b1_13": {
    "title": "trừ khi — 例外条件（〜でない限り）",
    "shortExplanation": "主節の内容が変わる唯一の例外条件を示します。",
    "longExplanation": "通常は主節の後ろに続けて例外を示します。",
    "formation": "主節 + trừ khi + 例外",
    "examples": [{ "translation": "嵐でない限り、7時に出発します。" }, { "translation": "急用がない限り外出しません。" }]
  },
  "vi_b1_14": {
    "title": "nhất là — 焦点の限定（特に〜）",
    "shortExplanation": "範囲の中から最も代表的な例や場面を取り上げます。",
    "longExplanation": "名詞句や「khi + 節」の前で特に強調したい対象を示します。",
    "formation": "節, nhất là + 名詞 / khi ...",
    "examples": [{ "translation": "ハノイはとても美しく、特に秋がきれいです。" }, { "translation": "特に季節の変わり目には健康に気をつけてください。" }]
  },
  "vi_b1_15": {
    "title": "ít nhất — 最小限の基準（少なくとも）",
    "shortExplanation": "数量や時間の最低ライン、または消極的な慰めを示します。",
    "longExplanation": "数詞の前や安心・納得を表す節の冒頭に置きます。",
    "formation": "ít nhất (+ là) + 数量 / 節",
    "examples": [{ "translation": "毎日少なくとも30分ベトナム語を聞いています。" }, { "translation": "少なくとも私たちは全力を尽くしました。" }]
  },
  "vi_b1_16": {
    "title": "vô tình — 無意識・偶然（うっかり・偶然にも）",
    "shortExplanation": "意図せずたまたま、あるいは不注意で起こったことを表します。",
    "longExplanation": "動詞の前に置く副詞で、「cố tình（わざと）」の反対です。",
    "formation": "主語 + vô tình + 動詞",
    "examples": [{ "translation": "スーパーで偶然古い友人に会いました。" }, { "translation": "すみません、うっかりそのメッセージを削除してしまいました。" }]
  },
  "vi_b2_01": {
    "title": "chỉ cần ... là — 十分条件（〜しさえすれば）",
    "shortExplanation": "結果を得るのに必要な最小限の条件を示します。",
    "longExplanation": "必要な条件のシンプルさを際立たせ、「là」で結果を導きます。",
    "formation": "Chỉ cần + 条件 + là + 結果",
    "examples": [{ "translation": "コツコツ聞き取り練習を続けさえすれば上達します。" }, { "translation": "このボタンを押すだけで機械が自動で動きます。" }]
  },
  "vi_b2_02": {
    "title": "chỉ khi ... mới — 排他的条件（〜して初めて）",
    "shortExplanation": "ある特定の場合にのみ結果が成り立つことを強調します。",
    "longExplanation": "後節に「mới」を伴い、それ以外では実現しないことを示します。",
    "formation": "Chỉ khi + 条件 + (主語) + mới + 結果",
    "examples": [{ "translation": "自分で実際にやってみて初めて問題の本質がわかります。" }, { "translation": "失って初めて大切さに気づくものです。" }]
  },
  "vi_b2_03": {
    "title": "cho dù — 無条件の譲歩（たとえ〜でも）",
    "shortExplanation": "どんな障害や仮定のもとでも結論が変わらないことを述べます。",
    "longExplanation": "「mặc dù」より強く仮定的な色合いがあり、よく「vẫn」「cũng」と呼応します。",
    "formation": "Cho dù + 仮定, (thì) + 結果 vẫn ...",
    "examples": [{ "translation": "どんなに忙しくても、彼は家族のための時間を作ります。" }, { "translation": "たとえ失敗しても後悔しません。" }]
  },
  "vi_b2_04": {
    "title": "bất kể — 無差別・不問（〜に関わらず）",
    "shortExplanation": "「〜を問わず」「どれであっても」を表します。",
    "longExplanation": "名詞、疑問詞（「bất kể lúc nào」など）、対比表現をとります。",
    "formation": "Bất kể + 名詞 / 疑問詞",
    "examples": [{ "translation": "この店は祝日に関係なく毎日開いています。" }, { "translation": "いつでも好きな時に質問して構いません。" }]
  },
  "vi_b2_05": {
    "title": "một mặt ... mặt khác — 二面的対比（一方では〜、他方では〜）",
    "shortExplanation": "物事の2つの側面を客観的に並べて論じます。",
    "longExplanation": "議論やエッセイ、長所と短所の比較でよく使われます。",
    "formation": "Một mặt + 節1, mặt khác + 節2",
    "examples": [{ "translation": "この仕事は一方で給料が高いが、他方でプレッシャーも非常に大きいです。" }, { "translation": "一方でコストを削減し、他方で品質を保つ必要があります。" }]
  },
  "vi_b2_06": {
    "title": "thà ... còn hơn — 優先選択（〜するほうがまだましだ）",
    "shortExplanation": "2つの選択肢のうち、より納得できる方を選び取る表現です。",
    "longExplanation": "望む方を「thà」の後に、避けたい方を「còn hơn」の後に置きます。",
    "formation": "Thà + 選択A + còn hơn (là) + 選択B",
    "examples": [{ "translation": "焦ってミスをするより、ゆっくり確実に進むほうがましです。" }, { "translation": "雨の中を出かけるくらいなら、家で読書しているほうがいいです。" }]
  },
  "vi_b2_07": {
    "title": "nhờ có — 肯定的な原因（〜のおかげで）",
    "shortExplanation": "良い結果をもたらした人や物事への感謝・評価を表します。",
    "longExplanation": "肯定的な原因専用です。悪い原因には「tại」や「do」を使います。",
    "formation": "Nhờ (có) + 良い原因, 良い結果",
    "examples": [{ "translation": "あなたの手助けのおかげで、プロジェクトは予定通り進みました。" }, { "translation": "毎日ポッドキャストを聞いたおかげで、反応力がぐっと伸びました。" }]
  },
  "vi_b2_08": {
    "title": "so với — 比較の基準（〜と比べて）",
    "shortExplanation": "変化や差を測るための基準点を提示します。",
    "longExplanation": "文頭に置いて基準を示したり、比較内容の後ろに添えたりします。",
    "formation": "A + 形容詞 / 節 + so với + B",
    "examples": [{ "translation": "昨年と比べて、今年の天気はずっと過ごしやすいです。" }, { "translation": "品質と比べると、この価格はかなり妥当です。" }]
  },
  "vi_b2_09": {
    "title": "dựa trên — 根拠・基盤（〜に基づいて）",
    "shortExplanation": "判断や制作の土台となるデータ・事実・ルールを示します。",
    "longExplanation": "プレゼンや記事などでよく使われる分析的な表現です。",
    "formation": "動詞 / 節 + dựa trên + 根拠",
    "examples": [{ "translation": "その映画は実話に基づいて作られました。" }, { "translation": "私たちは実際の結果に基づいて評価します。" }]
  },
  "vi_b2_10": {
    "title": "miễn là — 但し書き条件（〜しさえすれば・〜という条件で）",
    "shortExplanation": "他の条件には柔軟だが、この1点だけは外せないという前提を示します。",
    "longExplanation": "合意の必須条件を後節で提示するときに使います。",
    "formation": "主節, miễn là + 必須条件",
    "examples": [{ "translation": "みんなが楽しければ、どこへ行ってもいいですよ。" }, { "translation": "夕方までに返すなら、自転車を借りてもいいです。" }]
  },
  "vi_b2_11": {
    "title": "ngày càng — 増加傾向（ますます・日に日に）",
    "shortExplanation": "時間とともに程度が徐々に強まっていく様子を表します。",
    "longExplanation": "形容詞や心理動詞の前に置きます。",
    "formation": "主語 + ngày càng + 形容詞 / 動詞",
    "examples": [{ "translation": "ベトナム語はネット上でますます人気が高まっています。" }, { "translation": "テクノロジーは日に日に速く進歩しています。" }]
  },
  "vi_b2_12": {
    "title": "hóa ra — 意外な判明（実は〜だった・なんと〜）",
    "shortExplanation": "誤解や調査の後で、意外な真相に気づいたことを表します。",
    "longExplanation": "文頭や代名詞の後ろに置いて驚きや納得を示します。",
    "formation": "Hóa ra + (là) + 新しく分かった事実",
    "examples": [{ "translation": "なんと、二人は高校時代の同級生だったんです！" }, { "translation": "すごく難しいと思っていたら、実はとても簡単でした。" }]
  },
  "vi_b2_13": {
    "title": "tóm lại — 要約・まとめ（要するに）",
    "shortExplanation": "長い説明のあとで結論を端的にまとめます。",
    "longExplanation": "まとめの文の冒頭に置いてコンマで区切ります。",
    "formation": "Tóm lại, + 結論",
    "examples": [{ "translation": "要するに、外国語が上達するには毎日使うことが必要です。" }, { "translation": "まとめると、計画は承認されました。" }]
  },
  "vi_b2_14": {
    "title": "huống chi — 抑揚・ましてや（〜なおさらだ）",
    "shortExplanation": "軽いケースでさえそうなのだから、重いケースなら当然だ、と論じます。",
    "longExplanation": "「huống hồ」と同義で、後ろに当然視される事柄を続けます。",
    "formation": "節1 (根拠), huống chi (+ là) + 節2",
    "examples": [{ "translation": "大人でさえ疲れるのだから、まして子どもはなおさらです。" }, { "translation": "歩くのも大変なのに、ジョギングなどとても無理です。" }]
  },
  "vi_b2_15": {
    "title": "hầu như — ほぼ全体（ほとんど・実質的に）",
    "shortExplanation": "「ほとんどすべて」「めったに〜ない」のように例外が少ないことを表します。",
    "longExplanation": "「mọi」「tất cả」、または否定の「không（ほとんど〜ない）」を修飾します。",
    "formation": "Hầu như + mọi / tất cả / không + 動詞",
    "examples": [{ "translation": "ほとんど毎日短い動画を1本見ています。" }, { "translation": "部屋にはほとんど雑音がありません。" }]
  },
  "vi_b2_16": {
    "title": "không ... cũng không — 両否定（〜でもなく〜でもない）",
    "shortExplanation": "2つの選択肢や性質を同時に打ち消します。",
    "longExplanation": "それぞれのスロットに動詞や形容詞を入れて並立否定を作ります。",
    "formation": "主語 + không + A + cũng không + B",
    "examples": [{ "translation": "今日は暑くも寒くもありません。" }, { "translation": "彼女は電話もせず、メッセージも送りませんでした。" }]
  },
  "vi_c1_01": {
    "title": "giá mà — 反実仮想の願望（〜だったらなあ）",
    "shortExplanation": "現実とは異なる望みや過去への後悔を表します。",
    "longExplanation": "「giá như」と同義で、現在や過去への切実な願望・後悔を述べます。",
    "formation": "Giá mà + 反実仮想 (+ thì tốt biết bao)",
    "examples": [{ "translation": "昨日傘を持っていっていたら、濡れずに済んだのに。" }, { "translation": "1日がもう少し長かったらなあ！" }]
  },
  "vi_c1_02": {
    "title": "tuy nhiên — 改まった逆接（しかしながら）",
    "shortExplanation": "文章や改まったスピーチで対立・留保を示す接続詞です。",
    "longExplanation": "「nhưng」より硬い表現で、文頭でコンマを伴って使われます。",
    "formation": "文1. Tuy nhiên, + 文2",
    "examples": [{ "translation": "初期投資はかなり高いです。しかし、長期的な効果は非常に大きいです。" }, { "translation": "アイデアは素晴らしいですが、実施にはさらに時間が必要です。" }]
  },
  "vi_c1_03": {
    "title": "do đó — 論理的帰結（したがって・それゆえ）",
    "shortExplanation": "論文・報道・ビジネスなどで論理的な結論を導きます。",
    "longExplanation": "話し言葉の「vì vậy / cho nên」より硬めの書き言葉表現です。",
    "formation": "原因節. Do đó, + 帰結",
    "examples": [{ "translation": "供給が急減し、その結果、原材料価格が高騰しました。" }, { "translation": "データが不十分なため、性急な結論は下せません。" }]
  },
  "vi_c1_04": {
    "title": "tức là — 言い換え・補足定義（つまり・すなわち）",
    "shortExplanation": "直前の発言をわかりやすく言い換えたり意味を明確化したりします。",
    "longExplanation": "抽象的な主張を具体的な含意へ結びつけます。",
    "formation": "主張, tức là + 言い換え",
    "examples": [{ "translation": "締め切りは金曜日、つまりあと2日しかありません。" }, { "translation": "主体的な学びとは、自ら問いを立てて答えを探すことです。" }]
  },
  "vi_c1_05": {
    "title": "chẳng lẽ — 反語的な疑念（まさか〜ではあるまい）",
    "shortExplanation": "驚き・疑い・軽い抗議を込めた反語疑問を作ります。",
    "longExplanation": "「本当にそんなはずはないだろう」という話し手の感情を表します。",
    "formation": "Chẳng lẽ + 節 + (lại ... sao?)",
    "examples": [{ "translation": "まさか今日の約束を忘れたんじゃないでしょうね？" }, { "translation": "一週間ずっと働いたんだから、週末に少し休んでもいいじゃないですか。" }]
  },
  "vi_c1_06": {
    "title": "quả thật — 実感に基づく確認（本当に・実に）",
    "shortExplanation": "評判や予想と実際が本当に一致していることを認めます。",
    "longExplanation": "落ち着いた誠実な強調を表す副詞です。",
    "formation": "主語 + quả thật + 形容詞 / 動詞",
    "examples": [{ "translation": "ここの景色は噂に違わず実に雄大です。" }, { "translation": "確かに、外国語を学ぶことで多くの機会が開けます。" }]
  },
  "vi_c1_07": {
    "title": "trái lại — 全面的な逆転（それどころか・反対に）",
    "shortExplanation": "先入観や推測を真っ向から否定して逆の事実を示します。",
    "longExplanation": "「ngược lại」と同様に使われる硬めの談話標識です。",
    "formation": "推測. Trái lại, + 反対の事実",
    "examples": [{ "translation": "彼は決して尊大ではありません。それどころか、とても謙虚で気さくです。" }, { "translation": "詳しく説明するほど混乱するどころか、かえって理解しやすくなります。" }]
  },
  "vi_c1_08": {
    "title": "xét về — 観点・側面からの考察（〜の点から見ると）",
    "shortExplanation": "評価の基準や切り口を明確に設定します。",
    "longExplanation": "レビューや評論で特定の側面（経済性・耐久性など）を取り上げるときに便利です。",
    "formation": "Xét về + (mặt) + 観点, 主節",
    "examples": [{ "translation": "経済面から見ると、この案が最も優れています。" }, { "translation": "耐久性を考慮すると、国産品は輸入品に引けを取りません。" }]
  },
  "vi_c1_09": {
    "title": "trở nên — 状態・性質の変化（〜になる）",
    "shortExplanation": "性質、雰囲気、抽象的な状態への変化を表します。",
    "longExplanation": "後ろには形容詞や状態が来ます（名詞・役割には「trở thành」を使用）。",
    "formation": "主語 + trở nên + 形容詞",
    "examples": [{ "translation": "具体例のおかげで、抽象的な概念が理解しやすくなりました。" }, { "translation": "会議の空気が急に張り詰めたものになりました。" }]
  },
  "vi_c1_10": {
    "title": "trở thành — 身分・役割の変化（〜となる）",
    "shortExplanation": "ある地位、職業、現象へと発展・変化することを表します。",
    "longExplanation": "必ず名詞や名詞句を伴い、到達点や役割を強調します。",
    "formation": "主語 + trở thành + 名詞",
    "examples": [{ "translation": "読書の習慣は毎晩の楽しみとなりました。" }, { "translation": "その都市は急速にテクノロジーの中心地となりました。" }]
  },
  "vi_c1_11": {
    "title": "chính là — 焦点化・強調（まさに〜こそが）",
    "shortExplanation": "原因や核心となる対象を一点に絞って強調します。",
    "longExplanation": "強調の「chính」と「là」を組み合わせて曖昧さをなくします。",
    "formation": "A + chính là + B (核心)",
    "examples": [{ "translation": "粘り強さこそが成功への鍵です。" }, { "translation": "これこそ私たちが探していたものです。" }]
  },
  "vi_c1_12": {
    "title": "dẫu sao — 大局的な譲歩（いずれにせよ・何はともあれ）",
    "shortExplanation": "これまでの苦労や問題を認めつつ、現実的な結論へ目を向けます。",
    "longExplanation": "「dẫu sao đi nữa」「dẫu sao thì」の形でよく使われます。",
    "formation": "Dẫu sao (đi nữa), + 現実的な結論",
    "examples": [{ "translation": "何はともあれすべて過ぎたことですから、もう悲しまないで。" }, { "translation": "過程は少し大変でしたが、ともかく結果には十分な価値がありました。" }]
  },
  "vi_c1_13": {
    "title": "kể cả khi — 極端な状況の包摂（〜するときでさえ）",
    "shortExplanation": "厳しい状況下でも決意や法則が揺るがないことを表します。",
    "longExplanation": "「たとえ〜のときであっても」と負荷のかかる条件を取り込みます。",
    "formation": "主節 + kể cả khi + 厳しい条件",
    "examples": [{ "translation": "最初の結果が期待通りでなくても、諦めないでください。" }, { "translation": "アクセスが倍増してもシステムは安定して稼働します。" }]
  },
  "vi_c1_14": {
    "title": "về mặt — 側面の特定（〜の面において）",
    "shortExplanation": "議論している領域・観点を簡潔に限定します。",
    "longExplanation": "理論・専門性・法律など特定の分野について論じる前置詞句です。",
    "formation": "Về mặt + 抽象名詞, 主節",
    "examples": [{ "translation": "理論上、この解決策は完全に実現可能です。" }, { "translation": "チームは専門知識の面で非常に強固です。" }]
  },
  "vi_c1_15": {
    "title": "đồng thời — 同時並行・二重作用（同時に）",
    "shortExplanation": "2つの動作の同時進行や2つの効果の並立を結びつけます。",
    "longExplanation": "報道や解説文で洗練された並列関係を示すのに重宝します。",
    "formation": "節1, đồng thời + 動詞 / 節2",
    "examples": [{ "translation": "このプログラムは時間を節約し、同時に精度も高めます。" }, { "translation": "彼女は講師であると同時に技術アドバイザーでもあります。" }]
  },
  "vi_c1_16": {
    "title": "nói cách khác — 換言（言い換えれば）",
    "shortExplanation": "複雑な内容を別の視点からわかりやすく言い直す合図です。",
    "longExplanation": "前の主張の直接的な意味を簡潔にまとめ直すときに使います。",
    "formation": "元の意見. Nói cách khác, + 言い換え",
    "examples": [{ "translation": "言い換えれば、量より質を優先する必要があります。" }, { "translation": "予算が削減されました。つまり、拡大計画は延期せざるを得ません。" }]
  },
  "vi_a1_17": {
    "title": "cái + 名詞 — 一般物の類別詞",
    "shortExplanation": "日常の多くの無生物・道具・抽象的事柄に使う最も汎用的な類別詞です。",
    "longExplanation": "ベトナム語で数を数えたり指したりする際、名詞の前に類別詞が必要です。「cái」は鞄・机・コップなどに広く使えます。",
    "formation": "（数詞）+ cái + 物の名詞",
    "examples": [
      {
        "translation": "あの黒いカバンを見せてください。"
      },
      {
        "translation": "テーブルの上にガラスのコップが2つあります。"
      }
    ]
  },
  "vi_a1_18": {
    "title": "con + 名詞 — 動物・動くもの等の類別詞",
    "shortExplanation": "動物や子ども、さらに川・道・ナイフ・船など特定のものに使う類別詞です。",
    "longExplanation": "生き物（con mèo）だけでなく、道（con đường）・川（con sông）・包丁（con dao）にも定着しています。",
    "formation": "（数詞）+ con + 名詞",
    "examples": [
      {
        "translation": "うちではとてもおとなしいキジトラ猫を1匹飼っています。"
      },
      {
        "translation": "この道は川岸へまっすぐ続いています。"
      }
    ]
  },
  "vi_a1_19": {
    "title": "chiếc / cuốn / người — 用途別の必須類別詞",
    "shortExplanation": "乗り物、本、人を表すときに自然なベトナム語にするための重要類別詞です。",
    "longExplanation": "車や箸の片方などには chiếc、本やノートには cuốn/quyển、職業や国籍の人物には người を使います。",
    "formation": "chiếc（乗り物・単品）/ cuốn（本）/ người（人）",
    "examples": [
      {
        "translation": "この本を3晩で読み終えました。"
      },
      {
        "translation": "8番のバスがちょうど門の前に停まりました。"
      }
    ]
  },
  "vi_a1_20": {
    "title": "này / đó / kia / ấy — 指示詞（これ・それ・あれ）",
    "shortExplanation": "名詞の「後ろ」に置いて距離（ここ・そこ・あそこ）を示します。",
    "longExplanation": "英語や日本語と逆に名詞句の最後に置くのが鉄則です（quán này＝この店、đằng kia＝あちら）。",
    "formation": "（類別詞）+ 名詞 + này / đó / kia",
    "examples": [
      {
        "translation": "このフォーのお店は朝とても賑わいます。"
      },
      {
        "translation": "あそこにある白い高いビルが見えますか？"
      }
    ]
  },
  "vi_a1_21": {
    "title": "... không? — はい・いいえ疑問文",
    "shortExplanation": "文末に「không」を置くだけで普通の文をYes/No疑問文にできます。",
    "longExplanation": "述語の前に「có」を添えるのが自然なリズムです。答えは「Có（はい）」「Không（いいえ）」を使います。",
    "formation": "主語 + (có) + 動詞/形容詞 + không?",
    "examples": [
      {
        "translation": "さっきの会話は全部理解できましたか？"
      },
      {
        "translation": "今日はとても寒いですか？"
      }
    ]
  },
  "vi_a1_22": {
    "title": "... chưa? — 完了確認の疑問文（もう〜しましたか）",
    "shortExplanation": "ある動作が「もう済んだか・まだか」を尋ねる定番表現です。",
    "longExplanation": "「はい、もう」は「Rồi」、「まだです」は「Chưa」で答えます。",
    "formation": "主語 + (đã) + 動詞 + chưa?",
    "examples": [
      {
        "translation": "もう昼食を食べましたか、それともまだ仕事中ですか？"
      },
      {
        "translation": "朝の電車はもう出発しましたか？"
      }
    ]
  },
  "vi_a1_23": {
    "title": "... phải không? / đúng không? — 確認の付加疑問（〜ですよね？）",
    "shortExplanation": "自分の推測が合っているか相手に念押し確認するときに使います。",
    "longExplanation": "英語の「right?」のように文末に添えるだけで自然な会話が作れます。",
    "formation": "平叙文 + phải không / đúng không?",
    "examples": [
      {
        "translation": "ダナンに来るのは今回が初めてですよね？"
      },
      {
        "translation": "お店は夜9時まで開いていますよね？"
      }
    ]
  },
  "vi_a1_24": {
    "title": "... ạ — 丁寧・敬意の文末助詞",
    "shortExplanation": "目上の人や年長者、初対面の相手に対する敬意を示す文末表現です。",
    "longExplanation": "たった1語添えるだけで、先生・店員・年長者への丁寧さが大きく伝わる必須表現です。",
    "formation": "文末 + ạ（よく文頭の Dạ と併用）",
    "examples": [
      {
        "translation": "こんにちは、アイスミルクコーヒーを1つお願いします。"
      },
      {
        "translation": "はい、おばさま、本当にありがとうございます！"
      }
    ]
  },
  "vi_a1_25": {
    "title": "... nhé / nha — 親しみのある文末助詞（〜ね・〜しよう）",
    "shortExplanation": "誘い・お願い・別れの挨拶を和らげて、温かく親しい響きにします。",
    "longExplanation": "助詞なしだと命令口調に聞こえがちな表現も、「nhé / nha」を付けると「〜してね／しようね」と柔らかくなります。",
    "formation": "提案・連絡 + nhé（標準・北部）/ nha（南部）",
    "examples": [
      {
        "translation": "今夜ヒマだったら電話してね！"
      },
      {
        "translation": "鍵はテーブルの上に置いておくね。"
      }
    ]
  },
  "vi_a1_26": {
    "title": "ở + 場所 — 存在・場所の前置詞（〜にいる・〜で）",
    "shortExplanation": "単独で「〜に住んでいる／いる」という動詞にも、動詞の後ろで「〜で」を表す前置詞にもなります。",
    "longExplanation": "「là」は挟まず直接「Tôi ở Tokyo」のように使います。",
    "formation": "主語 + ở + 場所  |  主語 + 動詞 + ở + 場所",
    "examples": [
      {
        "translation": "現在、私の家族はカントーに住んでいます。"
      },
      {
        "translation": "彼らは角のアイスティー屋台で待ち合わせました。"
      }
    ]
  },
  "vi_a1_27": {
    "title": "có + 名詞 — 所有（持っている）と存在（〜がある・いる）",
    "shortExplanation": "人が物を「持っている」ことと、ある場所に人や物が「ある・いる」ことの両方を表します。",
    "longExplanation": "文頭が場所や無主語のとき「（〜に）…がある」という存在文になります。",
    "formation": "主語 + có + 名詞  |  （場所）+ có + 名詞",
    "examples": [
      {
        "translation": "路地の入口にとても香ばしいバインミー屋台があります。"
      },
      {
        "translation": "毎日ベトナム語のニュースを読む時間が30分あります。"
      }
    ]
  },
  "vi_a1_28": {
    "title": "định + 動詞 — 〜するつもり（個人的な予定・意向）",
    "shortExplanation": "「〜しようと思っている」と個人的な計画や予定を気軽に伝える表現です。",
    "longExplanation": "改まった「dự định」よりも日常会話でずっとよく使われます。",
    "formation": "主語 + định + 動詞",
    "examples": [
      {
        "translation": "今週末はどこか遊びに行くつもりですか？"
      },
      {
        "translation": "寝る前に新しい単語をあと20語覚えるつもりです。"
      }
    ]
  },
  "vi_a1_29": {
    "title": "muốn + 動詞 — 〜したい・欲しい（願望）",
    "shortExplanation": "自分の希望や相手の希望をストレートに表現します。",
    "longExplanation": "注文や依頼では文末に「ạ」を付けたり「cho tôi 〜」と言ったりするとより丁寧になります。",
    "formation": "主語 + muốn + 動詞 / 名詞",
    "examples": [
      {
        "translation": "私はきれいな南部なまりの発音を練習したいです。"
      },
      {
        "translation": "温かいお茶と冷たいお茶、どちらになさいますか？"
      }
    ]
  },
  "vi_a1_30": {
    "title": "không と chưa — 一般否定 vs 未完了（まだ〜ない）",
    "shortExplanation": "không は事実や習慣の全面否定、chưa は「今のところまだだが、これからするかも」という未完了です。",
    "longExplanation": "ご飯に誘われたとき「Tôi chưa ăn（まだです）」と「Tôi không ăn（食べません）」では意味が大きく変わります。",
    "formation": "không + 動詞/形容詞（しない） vs  chưa + 動詞（まだ〜していない）",
    "examples": [
      {
        "translation": "眠れなくなるので、夜はコーヒーを飲みません。"
      },
      {
        "translation": "すみません、まだあなたのメッセージを見る時間がありませんでした。"
      }
    ]
  },
  "vi_a1_31": {
    "title": "một ít / nhiều / vài — 基本の数量表現",
    "shortExplanation": "「少しの・いくつかの・多くの」を表し、名詞の前に置きます（名詞の複数形変化はありません）。",
    "longExplanation": "một ít は不可算・少量、vài は可算の数個、nhiều は可算・不可算どちらにも使えます。",
    "formation": "một ít / vài / nhiều (+ 類別詞) + 名詞",
    "examples": [
      {
        "translation": "水を買うために少しだけ現金を持ってきました。"
      },
      {
        "translation": "週末にいつものカフェで昔からの友人に何人か会いました。"
      }
    ]
  },
  "vi_a1_32": {
    "title": "gì / đâu / ai / nào — 語順を変えない疑問詞（in-situ）",
    "shortExplanation": "英語のように疑問詞を文頭に移動させず、答えと同じ語順の位置にそのまま置きます。",
    "longExplanation": "「Bạn đang xem [phim]」→「Bạn đang xem [gì]?」となるため、英語より語順が素直です。",
    "formation": "答えが入る位置にそのまま gì / ai / ở đâu / nào を置く",
    "examples": [
      {
        "translation": "今日はどんなテーマのリスニングを練習していますか？"
      },
      {
        "translation": "この辺りで一番おいしい食堂はどこにありますか？"
      }
    ]
  },
  "vi_a2_17": {
    "title": "動詞 + ra — 方向補語（外へ・発見・気づき）",
    "shortExplanation": "物理的に外へ出る動き（đi ra）と、隠れていたことに「気づく・思いつく・見つけ出す」（nhận ra, tìm ra, nhớ ra）を表します。",
    "longExplanation": "動詞の後ろに置くだけで「はっきり現れる・わかる」という結果のニュアンスが加わります。",
    "formation": "動詞 + ra",
    "examples": [
      {
        "translation": "テンポを少し落として聴いて、ようやくこのつなぎ言葉に気づきました。"
      },
      {
        "translation": "字幕がずれる原因の小さなバグを彼らは見つけ出しました。"
      }
    ]
  },
  "vi_a2_18": {
    "title": "動詞 + vào / vô — 方向補語（中へ・対象へ向き合う）",
    "shortExplanation": "外から中へ入る動き（bước vào）や、対象への働きかけ（bấm vào クリックする、ghi vào 書き込む）を表します。",
    "longExplanation": "標準・北部は「vào」、南部口語では「vô」がよく使われます。",
    "formation": "動詞 + vào / vô (+ 名詞)",
    "examples": [
      {
        "translation": "知らない単語をタップして正しい発音を聞いてみてください。"
      },
      {
        "translation": "便利なフレーズを復習ノートに書き留めるのを忘れないでください。"
      }
    ]
  },
  "vi_a2_19": {
    "title": "動詞/形容詞 + lên / xuống — 上下・増減の補語",
    "shortExplanation": "「lên」は上向きの動きや増加・上達（to lên 大きく、tăng lên 増える）、「xuống」は下降・落ち着き・減速（chậm xuống 遅く）を表します。",
    "longExplanation": "形容詞のすぐ後ろに置いて「より〜になる」と変化を示せるのが特徴です。",
    "formation": "動詞 / 形容詞 + lên vs xuống",
    "examples": [
      {
        "translation": "もう少し大きな声で話してもらえますか？"
      },
      {
        "translation": "疲れすぎると、彼の読むペースは目に見えてゆっくりになりました。"
      }
    ]
  },
  "vi_a2_20": {
    "title": "動詞 + lại — 反復・停止・保持・返信の補語",
    "shortExplanation": "「もう一度する（nghe lại 聞き直す）」「留まる・残す（dừng lại 立ち止まる、ghi lại 記録する）」「やり返す・返信する（gọi lại 折り返す）」を表します。",
    "longExplanation": "どの動詞に付いても実用度が非常に高い最重要補語のひとつです。",
    "formation": "動詞 + lại",
    "examples": [
      {
        "translation": "難しいパートは解説を見る前に3回聞き直すことが多いです。"
      },
      {
        "translation": "前の交差点まで来たら立ち止まって休みましょう。"
      }
    ]
  },
  "vi_a2_21": {
    "title": "動詞 + đi — 遠ざかる・消滅・促しの補語",
    "shortExplanation": "遠ざかる・取り除く（xóa đi 消してしまう、quên đi 忘れてしまう）と、「さあ〜してごらん」という親しい促しを表します。",
    "longExplanation": "命令・提案の文末では「遠慮せず〜しなよ！」という明るい後押しになります。",
    "formation": "動詞 + đi",
    "examples": [
      {
        "translation": "古いファイルはもう残さず、端末を軽くするために消してしまいましょう。"
      },
      {
        "translation": "少し間違えても大丈夫だから、思い切って話してみてくださいよ！"
      }
    ]
  },
  "vi_a2_22": {
    "title": "動詞 + về / qua / sang — 帰着・通過・移行の補語",
    "shortExplanation": "原点への帰着（về）、通過・立ち寄り（qua）、別の場所や話題への移行（sang）を表します。",
    "longExplanation": "日常の予定や話題転換で「ghé qua（立ち寄る）」「chuyển sang（〜へ移る）」が定番です。",
    "formation": "動詞 + về（戻る）/ qua（通る・立ち寄る）/ sang（移る）",
    "examples": [
      {
        "translation": "今夜は残業が遅くなったので、9時になってようやく帰宅しました。"
      },
      {
        "translation": "語彙パートのあとはリスニング練習に移りましょうね。"
      }
    ]
  },
  "vi_a2_23": {
    "title": "動詞 + được — 可能・達成の結果補語（〜できる／〜できた）",
    "shortExplanation": "動詞の「後ろ」に置き、実際にやり遂げたこと（tìm được 見つけ出せた）やできる能力（nghe được 聞き取れる）を表します。",
    "longExplanation": "動詞の「前」の được（〜させてもらえる・受身）との位置の違いが重要です。",
    "formation": "主語 + 動詞 + được (+ 目的語)",
    "examples": [
      {
        "translation": "ついに正確な字幕付きのバージョンを見つけることができました。"
      },
      {
        "translation": "この部分は話すのが速すぎて最後の単語が聞き取れませんでした。"
      }
    ]
  },
  "vi_a2_24": {
    "title": "動詞 + xong — 動作の完了（〜し終える）",
    "shortExplanation": "動詞の直後に置いて、その作業を最後まで終えたことを明確にします。",
    "longExplanation": "「xem xong（見終わってから）〜する」のように連続する行動をつなぐのに大変便利です。",
    "formation": "主語 + 動詞 + xong (+ 目的語)",
    "examples": [
      {
        "translation": "このエピソードを見終えたら、新しい単語リストを復習します。"
      },
      {
        "translation": "彼女はクライアント宛てのメールをちょうど書き終えました。"
      }
    ]
  },
  "vi_a2_25": {
    "title": "動詞 + mất / hết — 喪失（〜してしまう）と完遂（全部〜し切る）",
    "shortExplanation": "「mất」はうっかり失う・忘れてしまう残念さ（quên mất すっかり忘れる）、「hết」は残らず使い切る・全部終える（xem hết 全部見切る）を表します。",
    "longExplanation": "同じ結果補語でも感情や量のニュアンスが大きく異なります。",
    "formation": "動詞 + mất / hết (+ 目的語)",
    "examples": [
      {
        "translation": "しまった、今日3時にグループのミーティングがあるのをすっかり忘れてた！"
      },
      {
        "translation": "たった一晩で彼はそのショート動画シリーズをすべて見終えました。"
      }
    ]
  },
  "vi_a2_26": {
    "title": "đã từng + 動詞 — 過去の経験（〜したことがある）",
    "shortExplanation": "人生の中で少なくとも一度「〜した経験がある」ことを表します。",
    "longExplanation": "反対の「一度も〜したことがない」は「chưa từng」を使います。単なる過去「đã」より経験のニュアンスが明確です。",
    "formation": "主語 + đã từng / chưa từng + 動詞",
    "examples": [
      {
        "translation": "これまでにベトナム中部に住んだことはありますか？"
      },
      {
        "translation": "以前、歌を使って勉強してみたことがあり、とてもよく覚えられました。"
      }
    ]
  },
  "vi_a2_27": {
    "title": "mới + 動詞 — 直前（〜したばかり）と「〜して初めて」",
    "shortExplanation": "動詞の前の「mới」には「たった今〜したばかり」と「その条件・時点になって初めて〜する」の2大用法があります。",
    "longExplanation": "過去なら直前、未来や条件文なら「ようやく・初めて」と文脈で見分けます。",
    "formation": "S + (vừa) mới + V  |  条件/時点 + S + mới + V",
    "examples": [
      {
        "translation": "今朝このアプリをダウンロードしたばかりです。"
      },
      {
        "translation": "この文を3回目に聞き直してようやく作者の意図がわかりました。"
      }
    ]
  },
  "vi_a2_28": {
    "title": "vẫn còn — 状態の継続（まだ〜している・残っている）",
    "shortExplanation": "ある状況や習慣、残量が今も変わらず続いていることを強調します。",
    "longExplanation": "動詞や形容詞には「vẫn」だけでも自然ですが、「vẫn còn」で「まだ残っている」実感を強められます。",
    "formation": "主語 + vẫn (còn) + 動詞/形容詞/名詞",
    "examples": [
      {
        "translation": "外はこの時間になってもまだ小雨が降っています。"
      },
      {
        "translation": "故郷を離れて何年も経つのに、あの方は今でもはっきりとした地元なまりを保っています。"
      }
    ]
  },
  "vi_a2_29": {
    "title": "... nhỉ — 共感を誘う文末助詞（〜ですね・〜だね）",
    "shortExplanation": "自分の感想を伝えて相手に温かい共感を求めるときや、しみじみ独り言のように言うときに使います。",
    "longExplanation": "事実確認の「phải không?」と違い、気持ちの共有（〜だよね）に使われます。",
    "formation": "感想・コメント + nhỉ",
    "examples": [
      {
        "translation": "この動画の文法解説、本当にわかりやすいですね！"
      },
      {
        "translation": "ずいぶん長いこと、お茶を飲みながらゆっくり話していませんよね。"
      }
    ]
  },
  "vi_a2_30": {
    "title": "... đấy / đó — 情報強調・注意喚起の助詞（〜だよ・〜ですよ）",
    "shortExplanation": "相手が気づいていない事実を教えたり、驚いて褒めたり、軽く注意を促したりするときに付けます。",
    "longExplanation": "「発音がすごく自然になったよ！（〜rồi đấy!）」のような生き生きした会話に欠かせません。",
    "formation": "文末 + đấy（北部）/ đó（南部）",
    "examples": [
      {
        "translation": "その文の読み方、もうとても自然になっていますよ！"
      },
      {
        "translation": "外の道がすごく混んでいるから、少し早めに出たほうがいいよ。"
      }
    ]
  },
  "vi_a2_31": {
    "title": "... cơ mà / mà — 軽い抗議・念押しの助詞（だって〜なんだもの）",
    "shortExplanation": "「だって〜じゃない」「前に言ったのに」と軽く反論したり弁明したりするときに添えます。",
    "longExplanation": "親しい会話で感情や理由を柔らかく押し出す便利な文末語です。",
    "formation": "理由・弁明 + cơ mà / mà",
    "examples": [
      {
        "translation": "落ち着いて、まだ1週目が始まったばかりじゃないですか。"
      },
      {
        "translation": "昨日あなたにリンクを送ったはずですよ。"
      }
    ]
  },
  "vi_a2_32": {
    "title": "... chứ — 当然の期待・強い肯定（〜ですよね／もちろんですとも）",
    "shortExplanation": "相手も同じ意見のはずだと期待して念押しするときや、「当然そうでしょ！」と強調するときに使います。",
    "longExplanation": "イントネーションを上げれば期待の疑問、下げれば力強い断言になります。",
    "formation": "文 + chứ",
    "examples": [
      {
        "translation": "今週末もベトナム語スピーキングクラブに参加しますよね？"
      },
      {
        "translation": "もちろんです、毎日勉強すれば必ず上達しますとも！"
      }
    ]
  },
  "vi_a2_33": {
    "title": "hơn / nhất — 比較級（より〜）と最上級（一番〜）",
    "shortExplanation": "形容詞や動詞の後ろに「hơn」を置くと比較級、「nhất」を置くと最上級になります。",
    "longExplanation": "語形変化は一切なく、後ろに1語足すだけで明快に比較できます。",
    "formation": "A + 形容詞/動詞 + hơn + B  |  A + 形容詞 + nhất",
    "examples": [
      {
        "translation": "ネイティブの音声を聴くと、ずっと速くリズムに慣れることができます。"
      },
      {
        "translation": "これは今月私の一番お気に入りのドキュメンタリー映画です。"
      }
    ]
  },
  "vi_a2_34": {
    "title": "giống / khác (+ với) — 類似と相違（似ている／異なる）",
    "shortExplanation": "2つの言葉・発音・習慣などが似ているか違っているかを比較します。",
    "longExplanation": "「giống y hệt（そっくり）」「khác hoàn toàn（まったく違う）」で程度を強調できます。",
    "formation": "A + giống / khác + (với) + B",
    "examples": [
      {
        "translation": "2つの地域では語末の子音の発音が少しだけ違います。"
      },
      {
        "translation": "この単語は昨日覚えた単語と音がよく似ています。"
      }
    ]
  },
  "vi_a2_35": {
    "title": "mà lại — 意外な対比（それなのに・〜なのにかえって）",
    "shortExplanation": "最初の条件から予想されることとは少し違う意外な結果（短いのに詳しい、など）をつなぎます。",
    "longExplanation": "硬い逆接「nhưng」より感情や驚きのこもった自然なつながりになります。",
    "formation": "内容1 + mà lại + 意外な結果",
    "examples": [
      {
        "translation": "わずか3分の動画なのに、すべての手順をとても分かりやすく説明しています。"
      },
      {
        "translation": "こんなに強い日差しなのに、急に冷たい風が吹いてきました。"
      }
    ]
  },
  "vi_a2_36": {
    "title": "để + 動詞 / 節 — 目的（〜するために）",
    "shortExplanation": "ある行動をとる目的「〜するために／〜できるように」をつなぎます。",
    "longExplanation": "直後に動詞を置くことも、新しい主語を含む節を続けることも同じ「để」で表現できます。",
    "formation": "行動 + để (+ 主語) + 目的",
    "examples": [
      {
        "translation": "聴きながら意味を照らし合わせるために二言語字幕をオンにしています。"
      },
      {
        "translation": "初心者でもついてこられるように、少しゆっくり話してくださいね。"
      }
    ]
  },
  "vi_b1_17": {
    "title": "làm cho + 目的語 + 形容詞/動詞 — 使役・原因（〜を…にさせる）",
    "shortExplanation": "ある事柄が相手や物事に特定の感情・状態変化を引き起こすことを表します。",
    "longExplanation": "日常会話で最も自然な使役表現で、口語では「cho」を省いて「làm + 人 + 感情」と言うことも多いです。",
    "formation": "原因 + làm (cho) + 対象 + 状態・反応",
    "examples": [
      {
        "translation": "感情のこもった語り口のおかげで、その特集記事がぐっと引き込まれるものになりました。"
      },
      {
        "translation": "環境音がうるさすぎると、聞き手が集中しづらくなります。"
      }
    ]
  },
  "vi_b1_18": {
    "title": "khiến (cho) + 目的語 + 動詞/形容詞 — 強い喚起・誘発（思わず〜させる）",
    "shortExplanation": "「làm cho」より報道・物語調の響きがあり、予期せぬ反応や感情を強く引き起こす場面で使われます。",
    "longExplanation": "ニュースの「多くの人を驚かせた（khiến nhiều người bất ngờ）」などで頻出です。",
    "formation": "原因 + khiến (cho) + 対象 + 反応",
    "examples": [
      {
        "translation": "その突然のニュースは会議室全体を数秒間静まり返らせました。"
      },
      {
        "translation": "巧妙なダジャレに、視聴者は思わず楽しそうに笑い出しました。"
      }
    ]
  },
  "vi_b1_19": {
    "title": "bảo / nhờ / giúp + 人 + 動詞 — 指示・依頼・手助けの使い分け",
    "shortExplanation": "「bảo（言う・指示する）」「nhờ（丁寧にお願いする）」「giúp（手伝う）」を対人関係で使い分けます。",
    "longExplanation": "目上の人に「bảo（〜しろと言う）」は失礼になるため、お願いするときは「nhờ」を選ぶのがマナーです。",
    "formation": "主語 + bảo / nhờ / giúp + 人 + 動詞",
    "examples": [
      {
        "translation": "私はネイティブの友人に hỏi声調の発音チェックを頼みました。"
      },
      {
        "translation": "先生はクラス全員にもう一度対話を聴き直すよう指示しました。"
      }
    ]
  },
  "vi_b1_20": {
    "title": "càng ngày càng — 漸進的変化（ますます〜になる）",
    "shortExplanation": "時間が経つにつれて状態や傾向がだんだん強まっていくことを表します。",
    "longExplanation": "会話では「càng ngày càng」、記事や書き言葉ではすっきりした「ngày càng」も好まれます。",
    "formation": "主語 + (càng) ngày càng + 形容詞/動詞",
    "examples": [
      {
        "translation": "練習を積むほど、リスニングがどんどん楽になっていくのを感じますよ。"
      },
      {
        "translation": "YouTubeのベトナム語学習コンテンツはますます多様化しています。"
      }
    ]
  },
  "vi_b1_21": {
    "title": "càng ... càng ... — 比例の相関（〜すればするほどますます…）",
    "shortExplanation": "一方の度合いが増すにつれて、もう一方も比例して強まることを表します。",
    "longExplanation": "2つ目の節では主語を省略してリズムよくまとめることもよくあります。",
    "formation": "Càng + 節1, (主語) + càng + 節2",
    "examples": [
      {
        "translation": "いろんな地域の方言を聴けば聴くほど、耳が柔軟になります。"
      },
      {
        "translation": "その物語は終盤に近づくほどどんどんスリリングになります。"
      }
    ]
  },
  "vi_b1_22": {
    "title": "suýt nữa thì — 危機一髪（あやうく〜するところだった）",
    "shortExplanation": "乗り遅れ・落とし物など、起こってほしくない事態寸前で免れたときに使います。",
    "longExplanation": "「あやうく優勝するところだった」のような嬉しい惜敗には使わない点がポイントです。",
    "formation": "主語 + suýt (nữa) thì + 望ましくない出来事",
    "examples": [
      {
        "translation": "今朝は寝坊して、あやうく早朝の電車に乗り遅れるところでした。"
      },
      {
        "translation": "危なかった、うっかりリスト全消去ボタンを押すところでした。"
      }
    ]
  },
  "vi_b1_23": {
    "title": "lẽ ra (nên) — 過去の悔い・想定（〜すべきだったのに）",
    "shortExplanation": "現実とは異なり「本来なら〜すべきだった」「〜だったはずだ」と振り返る表現です。",
    "longExplanation": "後ろに「nhưng（しかし実際には）」と続ける形が定番です。",
    "formation": "Lẽ ra (主語) + nên / đã + 動詞 (+ nhưng ...)",
    "examples": [
      {
        "translation": "録音を始める前にマイクを確認しておくべきでした。"
      },
      {
        "translation": "ネットが不安定にならなければ、会議はもっと早く終わっていたはずです。"
      }
    ]
  },
  "vi_b1_24": {
    "title": "hóa ra (là) — 意外な真相の発見（実は〜だったとは）",
    "shortExplanation": "当初の思い込みとは違う本当の事情に気づいたときの「なんだ、そうだったのか」という表現です。",
    "longExplanation": "前段の「tưởng（〜だと思っていた）」と対になるのが会話の王道パターンです。",
    "formation": "（最初は〜と思ったが）hóa ra (là) + 真実",
    "examples": [
      {
        "translation": "最初は難しい単語かと思いましたが、よく知った2つの語の組み合わせだったんですね。"
      },
      {
        "translation": "なんだ、お二人は昔から同じ高校の同級生だったんですか！"
      }
    ]
  },
  "vi_b1_25": {
    "title": "thảo nào / hèn gì — 納得の感嘆（なるほど、だからか！）",
    "shortExplanation": "理由を聞いた瞬間に「どうりで〜なわけだ！」と腑に落ちたときに使う反応表現です。",
    "longExplanation": "北部・標準は「thảo nào」、南部口語では「hèn gì / hèn chi」が好まれます。",
    "formation": "Thảo nào / Hèn gì + 納得した事実",
    "examples": [
      {
        "translation": "なるほど、彼女はフエに5年住んでいたんですね—どうりであんなに優しいアクセントなわけだ！"
      },
      {
        "translation": "外ではさっきから大雨なんですね、どうりで空気がひんやり涼しくなったわけだ。"
      }
    ]
  },
  "vi_b1_26": {
    "title": "thà ... còn hơn — 比較選好（〜するほうがまだましだ）",
    "shortExplanation": "2つの選択肢のうち「BするくらいならAするほうがよい」と強く選び取る表現です。",
    "longExplanation": "「あやふやなまま使うくらいなら聞き直すほうがまし」のような主張で力を発揮します。",
    "formation": "Thà + 選択A + còn hơn (là) + 選択B",
    "examples": [
      {
        "translation": "50文を流し読みするより、5文をじっくり学ぶほうがずっといいです。"
      },
      {
        "translation": "当てずっぽうで間違えるくらいなら、聞き直して確かめるほうがましです。"
      }
    ]
  },
  "vi_b1_27": {
    "title": "miễn là — 唯一の必要条件（〜さえすれば）",
    "shortExplanation": "他の点は柔軟でよいが「これだけは満たしてほしい」という最小条件を示します。",
    "longExplanation": "合意や条件交渉、無理のない学習計画を語るときによく使われます。",
    "formation": "主節, miễn là + 条件節",
    "examples": [
      {
        "translation": "話す速さは重要ではありません、各声調がはっきり発音されてさえいれば。"
      },
      {
        "translation": "いつ勉強しても構いませんよ、毎日10分コンスタントに続けさえすれば。"
      }
    ]
  },
  "vi_b1_28": {
    "title": "trừ khi — 例外条件（〜でない限り）",
    "shortExplanation": "その例外状況が起きない限り、主節の予定やルールがそのまま成り立つことを表します。",
    "longExplanation": "英語の「unless」にあたり、文の前にも後ろにも置けます。",
    "formation": "主節, trừ khi + 例外条件",
    "examples": [
      {
        "translation": "嵐にならない限り、今夜も予定どおり勉強会を開きます。"
      },
      {
        "translation": "その文が本当に難しすぎない限り、最初から翻訳をオンにしないでください。"
      }
    ]
  },
  "vi_b1_29": {
    "title": "nhân tiện — ついでに・ところで",
    "shortExplanation": "出先や会話の流れに合わせて「ついでに〜する」や「ちなみに〜」と自然に付け加えます。",
    "longExplanation": "行動をつなぐ「ついでに」にも、話題を少し添える「ところで」にも使えます。",
    "formation": "（元の用事）, nhân tiện + ついでの行動 / 質問",
    "examples": [
      {
        "translation": "スーパーへ牛乳を買いに行き、ついでに本屋に寄って辞書を受け取りました。"
      },
      {
        "translation": "ちょうどそのファイルを開いているついでに、最後の行を見てもらえますか？"
      }
    ]
  },
  "vi_b1_30": {
    "title": "hình như / có vẻ như — 控えめな推量（どうやら〜らしい・〜のようだ）",
    "shortExplanation": "100%の確信がない観察や推測を柔らかく伝える表現です。",
    "longExplanation": "「hình như」は曖昧な記憶や直感、「có vẻ như」は見た目や声などの根拠に基づく印象を表します。",
    "formation": "Hình như / Có vẻ (như) + 節",
    "examples": [
      {
        "translation": "どうやらこの回の字幕は音声より1秒ほど早く流れているようです。"
      },
      {
        "translation": "2週間練習したおかげで、あなたの声はずいぶん自信に満ちて聞こえますよ。"
      }
    ]
  },
  "vi_b1_31": {
    "title": "chẳng qua là — 実質的な単純理由（要するにただ〜にすぎない）",
    "shortExplanation": "大げさ・複雑に見えることに対して「実は単に〜なだけだよ」と落ち着いた理由を示します。",
    "longExplanation": "文末の「thôi」と組み合わせると、相手の不安を和らげる自然な説明になります。",
    "formation": "事柄 + chẳng qua (chỉ) là + シンプルな理由 (+ thôi)",
    "examples": [
      {
        "translation": "彼は怒っているんじゃないよ、ただレポートを仕上げるのに集中しているだけさ。"
      },
      {
        "translation": "最初は耳慣れなく聞こえたのは、単に南部のイントネーションに慣れていなかっただけですよ。"
      }
    ]
  },
  "vi_b1_32": {
    "title": "vậy mà / thế mà — 予想外の展開（それなのに・なのに）",
    "shortExplanation": "前提からするとあり得なさそうな反対の結果になった驚きを表します。",
    "longExplanation": "単なる逆接「nhưng」よりも「それなのにまさか！」という感情がはっきり乗ります。",
    "formation": "前提; vậy mà / thế mà + 予想に反する結果",
    "examples": [
      {
        "translation": "今朝の予報では一日中晴れと言っていたのに、午後になって土砂降りになりました。"
      },
      {
        "translation": "この単語は長そうに見えるのに、発音はとても規則的です。"
      }
    ]
  },
  "vi_b1_33": {
    "title": "... chứ không phải ... — 対比による明確な訂正（BではなくAだ）",
    "shortExplanation": "混同しやすい2つの事柄について「BではなくAのほうだ」と誤解をはっきり解きます。",
    "longExplanation": "言葉のニュアンス説明や優先順位の整理で大活躍する構文です。",
    "formation": "正しい内容A + chứ không phải + 否定するB",
    "examples": [
      {
        "translation": "この文の「chỉ」は強調の副詞であって、「指さす」という動詞ではありません。"
      },
      {
        "translation": "大切なのは個々の単語をばらばらに訳すことではなく、文脈を理解することです。"
      }
    ]
  },
  "vi_b1_34": {
    "title": "không những ... mà còn ... — 累加・並列の強調（〜だけでなく…もまた）",
    "shortExplanation": "1つ目の要素に加えて、さらに2つ目の良い点や特徴を積み上げて強調します。",
    "longExplanation": "同じ意味の「không chỉ ... mà còn ...」も会話・文章の両方でよく使われます。",
    "formation": "主語 + không những / không chỉ + A + mà còn + B",
    "examples": [
      {
        "translation": "字幕付き動画を見ることはリスニングを上達させるだけでなく、語彙も広げてくれます。"
      },
      {
        "translation": "彼女は流暢に話すだけでなく、各地域のイントネーションまでしっかり押さえています。"
      }
    ]
  },
  "vi_b1_35": {
    "title": "nếu ... thì ... — 基本の条件文（もし〜なら、そのときは…）",
    "shortExplanation": "「もし〜なら…だ」を表す最重要構文です。英語と違い後半に「thì」を残すのが自然です。",
    "longExplanation": "親しい会話では前半の「Nếu」を省き「時間があれば（Rảnh thì）〜しよう」と簡潔に言えます。",
    "formation": "Nếu + 条件節, thì + 結果節",
    "examples": [
      {
        "translation": "見慣れないイディオムに出会ったら、タップして解説を見てみてください。"
      },
      {
        "translation": "昨日もし大雨が降らなかったら、ピクニックはとても楽しかったはずです。"
      }
    ]
  },
  "vi_b1_36": {
    "title": "vừa ... vừa ... — 同時進行・二重の性質（〜しながら…する／〜であり…でもある）",
    "shortExplanation": "2つの動作を同時に行うこと、または1つのものが2つの性質を兼ね備えていることを表します。",
    "longExplanation": "動詞なら「〜しながら」、形容詞なら「安くて美味しい（vừa rẻ vừa ngon）」のようになります。",
    "formation": "主語 + vừa + A + vừa + B",
    "examples": [
      {
        "translation": "私は朝のコーヒーを淹れながら短いニュースを聴くのが好きです。"
      },
      {
        "translation": "このアプリは動作が軽快なうえに新しい単語も調べやすい設計になっています。"
      }
    ]
  },
  "vi_b2_17": {
    "title": "畳語 AABB / ABAB — 微妙なニュアンスとリズム表現",
    "shortExplanation": "音や語を繰り返して、程度を和らげたり動き・感情を生き生きと描き出したりします。",
    "longExplanation": "平声への畳語は「少し〜（nhè nhẹ ほのかに優しく）」、ABAB型は動作の反復を表します。",
    "formation": "半畳語（nhè nhẹ そっと）/ 反復畳語（đi đi lại lại 行ったり来たり）",
    "examples": [
      {
        "translation": "秋の夕方はほんのり肌寒く、並木をそよ風がやさしく吹き抜けていました。"
      },
      {
        "translation": "彼は緊張のあまり試験室の前を行ったり来たりしていました。"
      }
    ]
  },
  "vi_b2_18": {
    "title": "動詞 + đi + 動詞 + lại — 反復の強調（何度も〜し直す）",
    "shortExplanation": "同じ動詞を「đi ... lại」で挟み、何度も繰り返して行うことを生き生きと強調します。",
    "longExplanation": "「nghe đi nghe lại（何度も聞き返す）」「nhắc đi nhắc lại（繰り返し言う）」など学習でも頻出です。",
    "formation": "主語 + 動詞 + đi + 動詞 + lại",
    "examples": [
      {
        "translation": "その文を5回も繰り返し聴き直してようやく音のつながりを聞き取れました。"
      },
      {
        "translation": "スムーズに言えるようになるまで短い対話を何度も繰り返し音読しましょう。"
      }
    ]
  },
  "vi_b2_19": {
    "title": "làm gì có / làm sao mà — 強い反駁の修辞疑問（そんなわけない／どうやって〜できるのか）",
    "shortExplanation": "情報を尋ねるのではなく「そんなことあるはずがない」「〜できるわけがない」と強く否定する口語表現です。",
    "longExplanation": "日常の議論やツッコミで感情を込めて使われます。",
    "formation": "Làm gì có + 名詞/こと!  |  Làm sao mà + 動詞 + được!",
    "examples": [
      {
        "translation": "たった一晩勉強しただけで千語も全部覚えられるわけがないですよ！"
      },
      {
        "translation": "音声を出さずにどうやって声調を聞き分けられるっていうんですか！"
      }
    ]
  },
  "vi_b2_20": {
    "title": "đâu có (... đâu) — 自然な強い否定・弁明（〜なんかしていない）",
    "shortExplanation": "「そんなつもりじゃない」「まったく〜ではない」と会話で柔らかく、しかしはっきり否定します。",
    "longExplanation": "文末に「đâu」をもう一度添えて「〜なんてこと全然ないよ！」と響かせることがよくあります。",
    "formation": "主語 + đâu (có) + 述語 (+ đâu)",
    "examples": [
      {
        "translation": "けなしたわけじゃないよ、もっと聞きやすくなるよう少し提案しただけさ。"
      },
      {
        "translation": "今日のリスニング課題は、昨日私たちが想像していたほど難しくなんてありませんでしたよ。"
      }
    ]
  },
  "vi_b2_21": {
    "title": "chẳng lẽ lại — 信じられない気持ちの疑問（まさか〜というわけではあるまいし）",
    "shortExplanation": "「そんなばかなことがあり得るのか？」と信じがたい気持ちや意外感を込めて問いかけます。",
    "longExplanation": "多くは「まさかそんなはずはないよね」という否定寄りのニュアンスを帯びます。",
    "formation": "Chẳng lẽ (+ S) + lại + 信じがたい事態 (+ sao/à)?",
    "examples": [
      {
        "translation": "まさか今週ずっと一度も復習の本を開いていないなんてことはないよね？"
      },
      {
        "translation": "こんな簡単な単語を別の意味に聞き間違えるなんて、まさかあり得るかなあ？"
      }
    ]
  },
  "vi_b2_22": {
    "title": "bất chấp — 障壁を顧みない決意（〜にもかかわらず／〜をものともせず）",
    "shortExplanation": "困難・悪天候・批判などを気にかけず突き進む強い姿勢を表します。",
    "longExplanation": "単なる譲歩「mặc dù」より意志の強さや思い切りが際立つ表現です。",
    "formation": "Bất chấp + 障害/規則, 主節",
    "examples": [
      {
        "translation": "悪天候にもかかわらず、語学交流会は満席の盛況ぶりでした。"
      },
      {
        "translation": "忙しい仕事スケジュールをものともせず、彼女は毎日コツコツ勉強を続けました。"
      }
    ]
  },
  "vi_b2_23": {
    "title": "nhờ có ... mới ... — 好結果の決定因への感謝（〜のおかげでようやく…できた）",
    "shortExplanation": "良い結果をもたらした決定的な助けや習慣にスポットを当てて「〜のおかげでこそ…」と述べます。",
    "longExplanation": "肯定的な結果専用です（悪い原因には tại を使います）。",
    "formation": "Nhờ (có) + 良い要因, S + mới + 好結果",
    "examples": [
      {
        "translation": "自分で録音して聞き返す習慣があったおかげで、発音がこんなに速く上達したんです。"
      },
      {
        "translation": "先輩がタイミングよく注意してくださったおかげで、このミスを避けられました。"
      }
    ]
  },
  "vi_b2_24": {
    "title": "do / bởi vì ... nên mới ... — 焦点化された因果（〜だからこそ…なのだ）",
    "shortExplanation": "単なる原因説明を超え、「ほかならぬその理由のせいで／おかげでこうなった」と因果の筋道を明確にします。",
    "longExplanation": "後半の「mới」が「それでこそ・だからこそ」という焦点を生みます。",
    "formation": "Do / Bởi vì + 原因, nên (+ S) + mới + 結果",
    "examples": [
      {
        "translation": "漢越語由来の複合語が多いため、初心者は抽象的に感じやすいのです。"
      },
      {
        "translation": "字幕が短いチャンクに分かれているからこそ、学習者は音声に合わせて読み切れるのです。"
      }
    ]
  },
  "vi_b2_25": {
    "title": "nói gì thì nói — 核心への立ち返り（何と言っても・いずれにせよ）",
    "shortExplanation": "いろいろな意見や事情はあるにせよ、「結局いちばん大事なのはこれだ」と本音や本質を述べます。",
    "longExplanation": "対談やポッドキャスト、感想コメントで非常によく使われるつなぎ表現です。",
    "formation": "Nói gì thì nói, + 核心となる結論",
    "examples": [
      {
        "translation": "何と言っても、確かな音声の基礎が初心者にとって一番の鍵になります。"
      },
      {
        "translation": "何はともあれ、実際の会話が自力で聞き取れたときが一番うれしいものです。"
      }
    ]
  },
  "vi_b2_26": {
    "title": "xét cho cùng — 総合的な帰結（結局のところ・突き詰めれば）",
    "shortExplanation": "細かな事情を一通り踏まえたうえで、大局的な本質を冷静にまとめるときに使います。",
    "longExplanation": "エッセイや対談で説得力のある結論を導くのに適した表現です。",
    "formation": "Xét cho cùng, + 総合的結論",
    "examples": [
      {
        "translation": "結局のところ、語学学習の目的は人を理解しつながることにあります。"
      },
      {
        "translation": "突き詰めれば、小さなミスこそ正しい使い方を長く記憶する助けになります。"
      }
    ]
  },
  "vi_b2_27": {
    "title": "trước sau gì cũng — 必然の未来（遅かれ早かれ必ず〜する）",
    "shortExplanation": "時期が早い遅いの違いだけで、いずれ必ずその事態になると確信して述べます。",
    "longExplanation": "「trước sau gì」と後半の「cũng」は必ずセットで使います。",
    "formation": "Trước sau gì (+ S) + cũng + 結果",
    "examples": [
      {
        "translation": "毎日触れ続けていれば、遅かれ早かれ自然と口から文が出てきますよ。"
      },
      {
        "translation": "この問題はいずれにせよ一度率直に話し合わなければなりません。"
      }
    ]
  },
  "vi_b2_28": {
    "title": "chỉ tại — 悪い結果への単一原因（ひとえに〜のせいだ）",
    "shortExplanation": "失敗や残念な結果を引き起こした特定の原因を指して「〜のせいばかりに」と述べます。",
    "longExplanation": "本気の愚痴にも、親しい間柄の軽い恨み言にもよく使われます。",
    "formation": "（悪い結果）+ chỉ tại + 責める原因",
    "examples": [
      {
        "translation": "昨日夜更かししてドラマを全部見ちゃったせいで、今朝は眠くてたまらないよ。"
      },
      {
        "translation": "答えを忘れたのも、2日後に復習しなかったせいなんです。"
      }
    ]
  },
  "vi_b2_29": {
    "title": "vừa mới ... đã ... — 矢継ぎ早・驚くほどの早さ（〜したばかりなのにもう…）",
    "shortExplanation": "1つ目が起きた直後に、もう2つ目が起きているというスピード感・驚きを表します。",
    "longExplanation": "「まだ〜したばかりなのに、もうこんなに！」という感嘆にもよく使われます。",
    "formation": "主語 + vừa mới + 事1 + (mà) đã + 事2",
    "examples": [
      {
        "translation": "動画が公開されてまだ10分しか経っていないのに、もう何百件もコメントがついています。"
      },
      {
        "translation": "まだ数日学んだだけなのに、もう多くのフレーズを聞き取れるようになっていますね。"
      }
    ]
  },
  "vi_b2_30": {
    "title": "chưa ... đã ... — 時期尚早・先走り（まだ〜してもいないうちにもう…）",
    "shortExplanation": "本来先にあるべきAが終わらないうちに、もうBが起きている（または急ぎすぎる）ことを表します。",
    "longExplanation": "忠告にもスピード感の描写にも使えるメリハリの効いた構文です。",
    "formation": "主語 + chưa (kịp) + 動作A + (mà) đã + 動作B",
    "examples": [
      {
        "translation": "多くの人が文を最後まで聴き終わらないうちに、急いで1語ずつ調べ始めてしまいます。"
      },
      {
        "translation": "セミナーがまだ終わらないうちに、聴衆はもうサインを求めて列を作り始めました。"
      }
    ]
  },
  "vi_b2_31": {
    "title": "đến mức (mà) — 極限の程度（〜するほどまでに）",
    "shortExplanation": "普通の水準を超えて「〜という状態に至るほどまでに」と結果の強さで程度を際立たせます。",
    "longExplanation": "「rất / quá」よりずっと臨場感があり、良い意味にも悪い意味にも使えます。",
    "formation": "状態・動作 + đến mức (mà) + 極端な結果",
    "examples": [
      {
        "translation": "そのコメディ寸劇は魅力的すぎて、何度見返してもやはり笑ってしまいます。"
      },
      {
        "translation": "彼女はシャドーイングを極めて正確に仕上げたので、ハノイ生まれだと思われるほどです。"
      }
    ]
  },
  "vi_b2_32": {
    "title": "tùy theo / tùy thuộc vào — 条件依存（〜に応じて・〜次第で）",
    "shortExplanation": "相手・目的・状況という条件次第で方法や結果が変わることを明確に示します。",
    "longExplanation": "「tùy theo」は選び方や目安、「tùy thuộc vào」は客観的な依存関係の分析によく使われます。",
    "formation": "結果・選択 + tùy theo / tùy thuộc vào + 変数",
    "examples": [
      {
        "translation": "会話目的か試験対策かに応じて、自分に合った単語セットを選びましょう。"
      },
      {
        "translation": "新語の定着スピードは文脈の中で再び出会う頻度にも左右されます。"
      }
    ]
  },
  "vi_b2_33": {
    "title": "trái ngược với — 明確な対照・逆行（〜とは対照的に／〜に反して）",
    "shortExplanation": "予想や世間のイメージ、あるいは別の特徴と真っ向から反対であることを際立たせます。",
    "longExplanation": "単なる相違「khác với」より対立やコントラストがくっきり出ます。",
    "formation": "Trái ngược với + 想定A, 現実B",
    "examples": [
      {
        "translation": "当初の心配とは裏腹に、プレゼンテーションはとても順調に進みました。"
      },
      {
        "translation": "実生活での彼の声は温かみがあって低く、厳しい役柄とは対照的です。"
      }
    ]
  },
  "vi_b2_34": {
    "title": "có ... đi (chăng) nữa thì ... cũng — 極限の譲歩（たとえどれほど〜であっても）",
    "shortExplanation": "譲歩の条件を極端なレベルまで押し上げたうえで「それでも結論は揺るがない」と強調します。",
    "longExplanation": "「đi chăng nữa」にするとさらに力強い書き言葉・スピーチ調になります。",
    "formation": "(Dù) có + 極端な条件 + đi (chăng) nữa, thì + vẫn/cũng...",
    "examples": [
      {
        "translation": "たとえスピーチが長くても、5文ずつの塊に区切れば無理なく攻略できます。"
      },
      {
        "translation": "どれほど忙しかったとしても、1日10分のリスニング習慣は守りましょう。"
      }
    ]
  },
  "vi_c1_17": {
    "title": "xét về phương diện — 専門的観点からの分析（〜という側面から見れば）",
    "shortExplanation": "議論や解説で「どの視点・領域に絞って評価しているか」を明示する洗練された導入表現です。",
    "longExplanation": "「về mặt」より一段フォーマルで、論文・ドキュメンタリー・評論に適しています。",
    "formation": "Xét về phương diện + 分野・観点, 主節",
    "examples": [
      {
        "translation": "音声学の観点から見れば、両方言とも基本的な声調体系をしっかり保っています。"
      },
      {
        "translation": "実践面から考えれば、自然なフレーズ単位で学ぶほうがはるかに時間効率がよいです。"
      }
    ]
  },
  "vi_c1_18": {
    "title": "không ngoại trừ khả năng — 客観的留保（〜の可能性も排除できない）",
    "shortExplanation": "断定を避けつつも「その可能性も十分あり得る」と冷静に示す報道・分析の定型句です。",
    "longExplanation": "リスク予測や政策・見通しの解説で頻出します。",
    "formation": "Không ngoại trừ khả năng + 仮説の節",
    "examples": [
      {
        "translation": "借用語の発音が時間をかけてさらに変化していく可能性も排除できません。"
      },
      {
        "translation": "主催側は週末に追加の交流会を開く可能性も除外していません。"
      }
    ]
  },
  "vi_c1_19": {
    "title": "về bản chất — 本質への切り込み（本質的には・突き詰めれば）",
    "shortExplanation": "表面的な見た目の奥にある「本来の仕組みや意味」を一言で解き明かします。",
    "longExplanation": "コンセプト解説や専門トピックの整理で説得力を高める導入語です。",
    "formation": "Về bản chất, + 核心の説明",
    "examples": [
      {
        "translation": "本質的に、間隔反復とは忘れる直前の復習タイミングを最適化することです。"
      },
      {
        "translation": "本質的にこの2つの構文は同じ意味を表しますが、丁寧さのレベルが異なります。"
      }
    ]
  },
  "vi_c1_20": {
    "title": "một mặt ... mặt khác ... — 多角的な対比整理（一方では〜、他方では…）",
    "shortExplanation": "長所と注意点、または両立すべき2つの観点をバランスよく対比して論じます。",
    "longExplanation": "C1レベルの小論文・討論・解説動画に欠かせない骨組み表現です。",
    "formation": "Một mặt, + 側面A; mặt khác, + 側面B",
    "examples": [
      {
        "translation": "一方では字幕が初心者の負担を和らげますが、他方では徐々に字幕を消す練習も必要です。"
      },
      {
        "translation": "一方では復習の規律を保つ必要がありますが、他方では自分に過度なプレッシャーをかけすぎないようにしましょう。"
      }
    ]
  },
  "vi_c1_21": {
    "title": "căn cứ vào / dựa trên — 根拠に基づく立論（〜に基づいて・〜を根拠に）",
    "shortExplanation": "単なる推測ではなく、明確な基準・規定・データに立脚して判断や仕組みを述べます。",
    "longExplanation": "「căn cứ vào」は規約や公的基準、「dựa trên」はデータや理論モデルに相性がよいです。",
    "formation": "Căn cứ vào / Dựa trên + 根拠データ, + 結論",
    "examples": [
      {
        "translation": "使用頻度に基づけば、まず優先して学ぶべき単語グループはこちらです。"
      },
      {
        "translation": "システムは各文の実際の文脈にもとづいて語彙を提案します。"
      }
    ]
  },
  "vi_c1_22": {
    "title": "đứng trên góc độ — 視点の切り替え（〜の立場・観点から見ると）",
    "shortExplanation": "「学習者の立場で言えば」「言語学の視点から見ると」と視座をはっきりさせて意見を述べます。",
    "longExplanation": "異なる立場への配慮を示しながら多角的に議論するときに重宝します。",
    "formation": "Đứng trên góc độ + 立場/分野, + 評価",
    "examples": [
      {
        "translation": "学習者の立場からすると、すっきりした字幕は目の疲れを大きく減らしてくれます。"
      },
      {
        "translation": "言語学の観点から見ると、畳語は独特の音楽性を生み出す役割を担っています。"
      }
    ]
  },
  "vi_c1_23": {
    "title": "kéo theo hệ lụy — 連鎖的な悪影響（深刻な連鎖的帰結を招く）",
    "shortExplanation": "ある行動や問題がドミノ倒しのように後続の悪影響を引き起こすことを警告する報道の定番表現です。",
    "longExplanation": "漢越語「hệ lụy（連累・後遺的帰結）」を使った引き締まった表現です。",
    "formation": "原因・現象 + kéo theo hệ lụy (+ cho 対象)",
    "examples": [
      {
        "translation": "文脈なしに丸暗記すると、意味を取り違えやすいという弊害を招きがちです。"
      },
      {
        "translation": "慢性的な睡眠不足は集中力に多くの悪影響を及ぼします。"
      }
    ]
  },
  "vi_c1_24": {
    "title": "góp phần không nhỏ — 控えめな強調による貢献評価（少なからず貢献する）",
    "shortExplanation": "「小さくない＝非常に大きい」という婉曲表現で、重要な貢献を品よく称える定型句です。",
    "longExplanation": "挨拶・報告書・ドキュメンタリー解説で非常に品格よく響きます。",
    "formation": "要因 + góp phần không nhỏ + vào / trong + 成果",
    "examples": [
      {
        "translation": "毎朝のながら聴きは、音への感度を磨くうえで少なからず役立っています。"
      },
      {
        "translation": "コミュニティからの意見は新機能の完成度を高めるのに大きく寄与しました。"
      }
    ]
  },
  "vi_c1_25": {
    "title": "tuy nhiên vẫn phải thừa nhận — 公正な譲歩（とはいえ〜である点は認めざるを得ない）",
    "shortExplanation": "批判や課題を示したあとで、反対側の長所や客観的事実をフェアに認める知的な表現です。",
    "longExplanation": "討論やレビューで説得力とバランス感覚を高めるのに効果的です。",
    "formation": "意見1。Tuy nhiên, vẫn phải thừa nhận (rằng) + 妥当な点",
    "examples": [
      {
        "translation": "この教材はやや冗長ですが、それでも豊富な例文がそろっている点は認めざるを得ません。"
      },
      {
        "translation": "自然な会話速度は最初聞き取りづらいものの、耳を早く慣らしてくれる点はやはり認めるところです。"
      }
    ]
  },
  "vi_c1_26": {
    "title": "làm dấy lên lo ngại — 懸念の喚起（〜に対する懸念を呼び起こしている）",
    "shortExplanation": "ある出来事や風潮が世間や専門家のあいだに広い心配・議論を巻き起こしていることを伝える報道表現です。",
    "longExplanation": "「dấy lên（湧き上がらせる）」を使ったニュースや解説の定番コロケーションです。",
    "formation": "出来事 + làm dấy lên lo ngại (về / rằng) + 懸念内容",
    "examples": [
      {
        "translation": "機械翻訳への過度な依存は、自分で考える力への懸念を呼び起こしています。"
      },
      {
        "translation": "地域方言の衰退は研究者たちのあいだで危機感を募らせています。"
      }
    ]
  },
  "vi_c2_01": {
    "title": "âu cũng là — 達観の受容（それもまた〜というものだろう）",
    "shortExplanation": "思い通りにならない出来事を「それもまた人生の巡り合わせだろう」としみじみ受け止める文学的表現です。",
    "longExplanation": "穏やかな知恵と深みを感じさせる格調高い語り口になります。",
    "formation": "（予想外の事情）, âu cũng là + 前向きな意味合い",
    "examples": [
      {
        "translation": "出発直前に旅行が延期になったのも、家族みんなが休めるよい機会だったのかもしれません。"
      },
      {
        "translation": "最初のうちにつまずくのも、忍耐力を鍛えるための試練というものなのでしょう。"
      }
    ]
  },
  "vi_c2_02": {
    "title": "há chẳng phải ... sao — 修辞的な反語（〜ではないだろうか、いやまさにそうだ）",
    "shortExplanation": "「それはまさに〜ではないか？」と聴衆の理性と共感に訴えかける格調高い反語表現です。",
    "longExplanation": "スピーチ・エッセイ・文化的評論で力強い余韻を残します。",
    "formation": "Há chẳng phải + 当然の真理 + sao?",
    "examples": [
      {
        "translation": "新しい言語を学ぶことは、世界を見つめるもう一つの扉を開くことではないでしょうか？"
      },
      {
        "translation": "毎日小さな一歩を積み重ねることこそ、最も確かな継続の秘訣ではないでしょうか？"
      }
    ]
  },
  "vi_c2_03": {
    "title": "chẳng qua chỉ là ... mà thôi — 誇張を剥ぐ本質指摘（所詮は〜にすぎない）",
    "shortExplanation": "大仰な言葉や誇張を冷静に見抜き、「突き詰めれば単に〜にほかならない」と鋭く締めくくります。",
    "longExplanation": "文末の「mà thôi」が評論調の落ち着いた切れ味を与えます。",
    "formation": "誇張された対象 + chẳng qua chỉ là + 単純な実態 + mà thôi",
    "examples": [
      {
        "translation": "いかにも高尚に聞こえるその専門用語も、所詮は古い規則を新しく言い換えたものにすぎません。"
      },
      {
        "translation": "間違いを恐れる気持ちなど、結局のところ自分で作り上げた心理的な壁にすぎないのです。"
      }
    ]
  },
  "vi_c2_04": {
    "title": "thiết nghĩ — 謙虚かつ重みのある意見提示（思うに・愚考するに）",
    "shortExplanation": "謙遜と誠実さを保ちながら、聞き手や読者に向けて自分の考えを格調高く述べる導入句です。",
    "longExplanation": "主張の強さと礼儀正しさを両立したい論考やスピーチに適しています。",
    "formation": "Thiết nghĩ, + 真摯な見解・提言",
    "examples": [
      {
        "translation": "思うに、珍しい表現を何百も丸暗記するより、まずは核となる語彙を磨くべきでしょう。"
      },
      {
        "translation": "学校は実際のコミュニケーション練習にもっと時間を割くべきではないかと考えます。"
      }
    ]
  },
  "vi_c2_05": {
    "title": "khó lòng (mà) — 婉曲な不可能性（なかなか〜しがたい・難しいところだ）",
    "shortExplanation": "「絶対無理だ」と突き放すのではなく、現実的な難しさを品よく認める成熟した表現です。",
    "longExplanation": "限界の指摘にも丁寧な断りにも使える洗練された言い回しです。",
    "formation": "主語 + khó lòng (mà) + 動詞",
    "examples": [
      {
        "translation": "実際の文脈に触れなければ、繊細なニュアンスを十分に感じ取ることはなかなか難しいでしょう。"
      },
      {
        "translation": "数週間の詰め込みだけに頼っていては、自然な反射力を身につけるのは困難です。"
      }
    ]
  },
  "vi_c2_06": {
    "title": "dẫn tới hệ quả tất yếu — 論理的必然の帰結（必然的な結果をもたらす）",
    "shortExplanation": "偶然ではなく構造的・論理的な法則として「必然的にその結末に行き着く」と論じます。",
    "longExplanation": "社会分析・政策論・解説文で高い説得力を発揮します。",
    "formation": "構造的原因 + dẫn tới hệ quả tất yếu (là) + 帰結",
    "examples": [
      {
        "translation": "初期の発音練習を疎かにすると、聞き間違いが続くという必然的な結果を招きます。"
      },
      {
        "translation": "長期投資を削減すれば、品質の低下という避けられない帰結につながります。"
      }
    ]
  },
  "vi_c2_07": {
    "title": "nếu không muốn nói là — 修辞的な段階引き上げ（〜とまでは言わなくとも／いやむしろ〜と言えるほど）",
    "shortExplanation": "最初は穏当な言葉を置き、続けて「もっと踏み込んで言えば〜とすら言える」と表現を強めます。",
    "longExplanation": "知的なバランス感覚を保ちながら印象を鮮烈にする高度な修辞法です。",
    "formation": "控えめな評価, nếu không muốn nói là + より強い評価",
    "examples": [
      {
        "translation": "その説明はかなり曖昧で、むしろ誤解を招きかねないと言えます。"
      },
      {
        "translation": "クラスの進歩の速さは見事というほかなく、期待を大きく上回っているとさえ言えます。"
      }
    ]
  },
  "vi_c2_08": {
    "title": "dù muốn dù không — 避けがたい現実（好むと好まざるとにかかわらず）",
    "shortExplanation": "個人の好みや抵抗とは無関係に進んでいく現実・潮流を冷静に認める対句的表現です。",
    "longExplanation": "文化論・言語変化・戦略論などの文章でよく登場します。",
    "formation": "Dù muốn dù không, + 避けられない現実",
    "examples": [
      {
        "translation": "好むと好まざるとにかかわらず、SNSの俗語は日常会話に少しずつ入り込んできます。"
      },
      {
        "translation": "好きであろうとなかろうと、実社会の自然な話すスピードに適応しなければなりません。"
      }
    ]
  },
  "vi_c2_09": {
    "title": "lấy ... làm trọng — 最高原則の重視（〜を第一に重んじる）",
    "shortExplanation": "他の細かなことよりも特定の原則や価値観を何より重んじるという品格ある表現です。",
    "longExplanation": "「信用を第一とする（lấy chữ tín làm trọng）」など伝統的にも大切にされる言い回しです。",
    "formation": "（主体）lấy + 核心価値 + làm trọng",
    "examples": [
      {
        "translation": "実践的な会話練習では、自信と自然さを何より重んじてください。"
      },
      {
        "translation": "翻訳に携わる者は常に原文への忠実さを第一の原則とします。"
      }
    ]
  },
  "vi_c2_10": {
    "title": "một khi đã ... thì ắt ... — 不可逆の条件必然（いったん〜したからには必ず…）",
    "shortExplanation": "「ひとたびこの一線を越えたなら、必ずや次の結果につながる」と重みをもって述べます。",
    "longExplanation": "「ắt」が「きっと・必然的に」という格調高い響きをもたらします。",
    "formation": "Một khi đã + 決断・段階, thì ắt (+ sẽ) + 必然の結果",
    "examples": [
      {
        "translation": "ひとたび綴りの規則を理解してしまえば、たいていの新語は必ず読めるようになります。"
      },
      {
        "translation": "いったん明確な約束を定めたなら、組織は必ず一丸となって行動するものです。"
      }
    ]
  },
  "vi_c2_11": {
    "title": "không khỏi + 感情動詞 — 抑えきれない心情（〜せずにはいられない・思わず〜する）",
    "shortExplanation": "日常の「không nhịn được」より洗練された文語で、感動・驚き・しみじみした思いが自然に湧き上がる様子を描きます。",
    "longExplanation": "文学作品、映画評論、エッセイの情感表現で頻出です。",
    "formation": "主語 + không khỏi + 感情・内面の動き",
    "examples": [
      {
        "translation": "古い録音に残る家族の声を聴き直し、誰もが胸を打たれずにはいられませんでした。"
      },
      {
        "translation": "その素朴な文章を読むと、読者は思わず共感の微笑みを浮かべてしまいます。"
      }
    ]
  },
  "vi_c2_12": {
    "title": "vô hình trung — 図らずももたらす影響（期せずして・知らず知らずのうちに）",
    "shortExplanation": "本人にその意図はなかったのに、結果として見えない形で大きな作用を生むことを表す漢越語副詞です。",
    "longExplanation": "社会批評や心理学的な考察で非常によく用いられる知的な表現です。",
    "formation": "行為A + vô hình trung + 思わぬ帰結B",
    "examples": [
      {
        "translation": "翻訳付きの動画ばかり見ていると、期せずして耳が文字に頼る癖をつけてしまいます。"
      },
      {
        "translation": "毎晩おしゃべりをする習慣が、知らず知らずのうちに家族みんなの絆を深めていました。"
      }
    ]
  },
  "vi_c2_13": {
    "title": "(không) nhất thiết phải — 絶対的必要性と非必須（必ずしも〜しなくてよい／不可欠である）",
    "shortExplanation": "「どうしても〜する必要がある」という厳格な必要性、特に否定「không nhất thiết phải（必ずしも〜する必要はない）」で定番となる表現です。",
    "longExplanation": "アドバイスや技術・規約の説明で精度の高いニュアンスを伝えます。",
    "formation": "主語 + (không) nhất thiết phải + 動詞",
    "examples": [
      {
        "translation": "リスニングを始めたばかりのころは、必ずしも一語一語すべてをすぐ理解する必要はありません。"
      },
      {
        "translation": "システムを安定稼働させるには、端末を定期的に更新することが不可欠です。"
      }
    ]
  },
  "vi_c2_14": {
    "title": "tựu trung lại — 要点の総括（要するに・総じて言えば）",
    "shortExplanation": "さまざまな視点からの議論を最後に一点へ凝縮する、品格のある総括表現です。",
    "longExplanation": "日常の「tóm lại（要するに）」を格上げした講演・論文向きの結び言葉です。",
    "formation": "Tựu trung (lại), + 核心的まとめ",
    "examples": [
      {
        "translation": "要するに、持続可能な発展の鍵はやはり教育の質にあります。"
      },
      {
        "translation": "総じて言えば、効果的な学習法はすべて継続的なインプットを中心に回っています。"
      }
    ]
  },
  "vi_c2_15": {
    "title": "biết bao nhiêu mà kể — 言い尽くせないほどの感慨（数えきれないほどだ）",
    "shortExplanation": "喜び・苦労・思い出・感謝などが「言葉では数え尽くせないほど深い」と詩情豊かに締めくくる感嘆表現です。",
    "longExplanation": "回想録や感謝のスピーチで温かい余韻を残します。",
    "formation": "名詞・感慨 + biết bao nhiêu mà kể",
    "examples": [
      {
        "translation": "学生時代に一緒に復習した美しい思い出は、本当に数えきれないほどあります。"
      },
      {
        "translation": "先生方の献身的な想いがどれほど多くの世代を励ましてきたか、言葉では言い尽くせません。"
      }
    ]
  },
  "vi_c2_16": {
    "title": "thử hỏi — 知的な問いかけ（あえて問うが／考えてみてほしい）",
    "shortExplanation": "頭ごなしに説教するのではなく、「では考えてみてください、もし〜だとしたらどうでしょう」と相手に問いを投げかけます。",
    "longExplanation": "評論・ディベート・スピーチで聞き手の思考を揺さぶる巧みな技法です。",
    "formation": "Thử hỏi (+ 仮定), + 鋭い問い",
    "examples": [
      {
        "translation": "考えてみてください、誰もが間違いを恐れて話すのをためらったら、どうして言葉が生き生きと息づくでしょうか？"
      },
      {
        "translation": "地道な粘り強さなしに成し遂げられた揺るぎない成果など、果たしてあるでしょうか？"
      }
    ]
  }
};

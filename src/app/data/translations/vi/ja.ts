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
  }
};

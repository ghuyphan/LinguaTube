import json
import re
import os

data_vi = {
  "zh_几_62": {
    "title": "几 + Lượng từ + Danh từ (Số từ ước lượng: vài, mấy [dưới 10])",
    "shortExplanation": "Số từ '几' (jǐ) đứng trước lượng từ và danh từ để biểu thị số lượng ước chừng không xác định nhưng nhỏ hơn 10; tương đương 'mấy', 'vài'.",
    "longExplanation": "'几' (jǐ) ngoài công dụng phổ biến làm đại từ nghi vấn để hỏi số lượng dưới 10 ('mấy?'), còn được dùng trong câu trần thuật như một từ chỉ số lượng ước chừng (khái số) nhỏ hơn 10 (thường từ 1 đến 9). Cấu trúc ngữ pháp cơ bản là '几 + Lượng từ + Danh từ' (ví dụ: 几本书: mấy cuốn sách, 几个人: vài người). Khi biểu thị số ước tính, '几' mang ngữ khí không cần xác định chính xác số lượng cụ thể.",
    "formation": "几 + Lượng từ + Danh từ",
    "examples": [
      {
        "translation": "Mấy quyển sách."
      }
    ]
  },
  "zh_十几_63": {
    "title": "十几 + Lượng từ + Danh từ (Số từ ước lượng từ 11 đến 19: mười mấy)",
    "shortExplanation": "'十几' (shíjǐ) biểu thị số lượng ước chừng lớn hơn 10 và nhỏ hơn 20 (từ 11 đến 19); tương đương với 'mười mấy' trong tiếng Việt.",
    "longExplanation": "Khi đặt '几' ngay sau số từ '十', ta có '十几' (shíjǐ), dùng để chỉ số lượng ước chừng trong khoảng từ 11 đến 19 (lớn hơn 10 nhưng chưa đến 20). Lượng từ đứng ngay sau '十几', tạo thành kết cấu '十几 + Lượng từ + Danh từ' (ví dụ: 十几本书: mười mấy cuốn sách, 十几个人: mười mấy người, 十几天: mười mấy ngày). Cần lưu ý vị trí của '几' đứng sau '十' khác với '几十' (mấy chục).",
    "formation": "十几 + Lượng từ + Danh từ",
    "examples": [
      {
        "translation": "Mười mấy quyển sách."
      }
    ]
  },
  "zh_几十_64": {
    "title": "几十 + Lượng từ + Danh từ (Số từ ước lượng hàng chục: mấy chục, vài chục)",
    "shortExplanation": "'几十' (jǐ shí) dùng để biểu thị số lượng ước tính hàng chục (từ 20 đến 90); mang nghĩa 'mấy chục', 'vài chục'.",
    "longExplanation": "Khi '几' đứng trước '十' tạo thành '几十' (jǐ shí), nó biểu thị số lượng ước tính hàng chục trong phạm vi từ hai mươi đến chín mươi (tương đương với 'mấy chục', 'vài chục' trong tiếng Việt). Cấu trúc đi liền với lượng từ là '几十 + Lượng từ + Danh từ' (ví dụ: 几十本书: mấy chục cuốn sách, 几十个人: mấy chục người, 几十块钱: mấy chục tệ). Cần phân biệt rõ trật tự từ: '几十' là hàng chục (20-90), còn '十几' là số lẻ từ 11 đến 19.",
    "formation": "几十 + Lượng từ + Danh từ",
    "examples": [
      {
        "translation": "Mấy chục quyển sách."
      }
    ]
  },
  "zh_几多_65": {
    "title": "Số từ + 几 / 多 + Lượng từ + Danh từ (Biểu thị số lẻ ước chừng sau hàng chục: hơn, ngoài, mấy)",
    "shortExplanation": "Đặt '几' hoặc '多' ngay sau số từ tròn chục (từ 20 trở lên) và trước lượng từ để biểu thị số lượng ước tính có phần lẻ (ví dụ: hai mươi mấy, hơn hai mươi).",
    "longExplanation": "Khi muốn biểu thị số lượng ước lượng có phần lẻ sau các số chẵn tròn chục trở lên (như 20, 30, 40, 100...), tiếng Trung đặt '几' hoặc '多' ngay sau số từ và đứng trước lượng từ. '二十几本书' mang nghĩa 'hai mươi mấy cuốn sách' (trong khoảng 21 đến 29 cuốn), còn '二十多本书' mang nghĩa 'hơn hai mươi cuốn sách' (lớn hơn 20). Lưu ý rằng '几' hoặc '多' đứng trước lượng từ là đặc trưng khi số từ là số tròn chục trở lên.",
    "formation": "Số từ (tròn chục trở lên) + 几 / 多 + Lượng từ + Danh từ",
    "examples": [
      {
        "translation": "Hai mươi mấy quyển sách / Hơn hai mươi cuốn sách."
      }
    ]
  },
  "zh_M多月星期_66": {
    "title": "Số từ + Lượng từ + 多 + Danh từ (Biểu thị phần lẻ nhỏ hơn một đơn vị lượng từ: hơn # tháng/tuần)",
    "shortExplanation": "Khi số từ nhỏ hơn 10, '多' (duō) được đặt SAU lượng từ để biểu thị phần dư lẻ nhỏ hơn một đơn vị của lượng từ đó (ví dụ: '两个多月' là hơn hai tháng nhưng chưa tới ba tháng).",
    "longExplanation": "Trong tiếng Trung, quy tắc đặt từ chỉ khái số '多' (duō) phụ thuộc vào giá trị của số từ: nếu số từ nhỏ hơn 10 (không tận cùng bằng số 0 như 1, 2, 3...), '多' bắt buộc phải đặt SAU lượng từ và TRƯỚC danh từ ('Số từ + Lượng từ + 多 + Danh từ'). Cấu trúc này biểu thị phần lẻ phát sinh nhỏ hơn một đơn vị đo lường tương ứng. Ví dụ: '两个多月' có nghĩa là hai tháng lẻ (khoảng 2 tháng rưỡi, dưới 3 tháng); '三个多星期' là ba tuần lẻ (khoảng hơn 3 tuần một vài ngày, dưới 4 tuần). Khác với số chẵn chục (十多个月: hơn 10 tháng).",
    "formation": "Số từ (dưới 10) + Lượng từ + 多 + Danh từ (Thời gian)",
    "examples": [
      {
        "translation": "Hơn hai tháng, hơn ba tuần."
      }
    ]
  },
  "zh_V不VorA不A_67": {
    "title": "Động từ + 不 + Động từ / Tính từ + 不 + Tính từ (Câu hỏi chính phản: ...có... không?)",
    "shortExplanation": "Ghép dạng khẳng định và phủ định của động từ hoặc tính từ qua từ '不' để tạo thành câu hỏi chính phản; cuối câu tuyệt đối không dùng '吗'.",
    "longExplanation": "Cấu trúc 'Động từ + 不 + Động từ' hoặc 'Tính từ + 不 + Tính từ' là hình thức câu hỏi chính phản (正反疑问句) đặc trưng trong ngữ pháp tiếng Trung. Người nói đặt dạng khẳng định và phủ định song song để yêu cầu người nghe lựa chọn một trong hai phương án (tương đương với '...có... không?' trong tiếng Việt). Ví dụ: '你去不去？' (Bạn có đi không?), '好不好？' (Có tốt không / được không?). Lưu ý quy tắc vàng: bản thân câu hỏi chính phản đã mang đầy đủ ngữ khí nghi vấn, do đó cuối câu không được phép thêm trợ từ '吗'.",
    "formation": "Động từ + 不 + Động từ (+ Tân ngữ)? / Tính từ + 不 + Tính từ?",
    "examples": [
      {
        "translation": "Tôi đi cửa hàng, bạn có đi không?"
      }
    ]
  },
  "zh_是不是_68": {
    "title": "是不是……？ (Có phải... không? - Câu hỏi phỏng đoán, xác nhận thông tin)",
    "shortExplanation": "'是不是' (shìbùshì) dùng để thăm dò, phỏng đoán hoặc yêu cầu người nghe xác nhận lại tính chính xác của một thông tin; 'có phải... không?'.",
    "longExplanation": "'是不是' (shìbùshì) là hình thức hỏi chính phản của động từ '是', thường được dùng khi người nói đã có sẵn một nhận định hoặc dự đoán trong đầu và muốn hỏi để xác nhận lại từ đối phương (tương đương với 'có phải là... không?', 'phải chăng...'). Cụm từ này có vị trí rất linh hoạt trong câu: có thể đứng trước vị ngữ động từ/tính từ (你是不是喜欢运动？), đứng ở đầu câu trước chủ ngữ (是不是你不想去？), hoặc đứng ở cuối câu như một câu hỏi đuôi để tìm kiếm sự đồng tình (你喜欢运动，是不是？). Cuối câu không dùng '吗'.",
    "formation": "Chủ ngữ + 是不是 + Vị ngữ? / 是不是 + Chủ ngữ + Vị ngữ?",
    "examples": [
      {
        "translation": "Có phải bạn thích thể thao không?"
      }
    ]
  },
  "zh_每MN都V_69": {
    "title": "每 + Lượng từ + Danh từ + (都) + Động từ (Mỗi... đều... - Biểu thị tính toàn thể không ngoại lệ)",
    "shortExplanation": "Đại từ '每' (mỗi) kết hợp với lượng từ và danh từ, vị ngữ phía sau đi kèm phó từ '都' (đều) để nhấn mạnh toàn bộ mọi cá thể đều thực hiện hành động.",
    "longExplanation": "Cấu trúc '每 + Lượng từ + Danh từ + (都) + Động từ' dùng để khái quát hóa toàn thể các đối tượng trong một phạm vi, nhấn mạnh tính chất chung hoặc hành động diễn ra không có ngoại lệ (tương đương với 'mỗi / mọi... đều...' trong tiếng Việt). '每' mang tính phân phối từng cá thể, nên ở vị ngữ thường dùng phó từ tổng quát '都' (dōu) để hô ứng (ví dụ: 每个星期六都工作: thứ bảy nào cũng đi làm; 每个人都喜欢: ai cũng thích). Trợ từ nghi vấn '吗' có thể đặt ở cuối câu để hỏi về thói quen toàn bộ.",
    "formation": "每 + Lượng từ + Danh từ (+ 都) + Động từ",
    "examples": [
      {
        "translation": "Thứ bảy nào bạn (cũng) đi làm à?"
      }
    ]
  },
  "zh_多A_70": {
    "title": "多 + Tính từ (Hỏi về mức độ, kích thước, khoảng cách: ...bao nhiêu? ...thế nào?)",
    "shortExplanation": "Phó từ '多' (duō) đứng trước tính từ đo lường (như 高, 大, 远...) để hỏi về số lượng, mức độ, kích thước hoặc khoảng cách cụ thể.",
    "longExplanation": "Trong tiếng Trung, đặt phó từ '多' (duō) trước các tính từ đơn âm tiết chỉ kích thước, mức độ đo lường được (như 高: cao, 大: lớn/tuổi, 远: xa, 重: nặng, 长: dài...) là cách hỏi phổ biến nhất về độ lớn, số đo cụ thể (tương đương với cấu trúc '...bao nhiêu?', '...thế nào?' trong tiếng Việt). Ví dụ: '他多高？' (Anh ấy cao bao nhiêu?), '你多大？' (Bạn bao nhiêu tuổi?), '有多远？' (Cách bao xa?). Câu trả lời thường cung cấp trực tiếp con số và đơn vị đo lường cụ thể.",
    "formation": "Chủ ngữ + 多 + Tính từ?",
    "examples": [
      {
        "translation": "Anh ấy cao bao nhiêu?"
      }
    ]
  },
  "zh_的N_71": {
    "title": "Định ngữ + 的 (+ Danh từ lược bỏ) (Cụm từ chữ 的: Lược bỏ danh từ trung tâm ngữ)",
    "shortExplanation": "Khi danh từ trung tâm ngữ đã rõ ràng theo ngữ cảnh, ta có thể lược bỏ danh từ đó sau '的' để tạo thành cụm từ chữ '的' độc lập mang ý nghĩa 'cái...', 'người...'.",
    "longExplanation": "Trong tiếng Trung, khi danh từ trung tâm ngữ đã được nhắc đến trước đó hoặc hiển nhiên ai cũng hiểu trong ngữ cảnh giao tiếp, người ta thường lược bỏ danh từ đó ngay sau trợ từ kết cấu '的' nhằm tránh lặp từ và giúp câu văn cô đọng, tự nhiên hơn. Cấu trúc 'Định ngữ + 的' lúc này được gọi là 'cụm từ chữ 的' (的字短语), có chức năng ngữ pháp tương đương một danh từ hoàn chỉnh (nghĩa là 'cái...', 'người...'). Ví dụ trong câu '这个杯子是昨天买的(杯子)', từ '杯子' ở cuối câu được lược bỏ vì chủ ngữ ở đầu câu đã nêu rõ là 'chiếc cốc này'.",
    "formation": "Định ngữ + 的 (+ Danh từ được lược bỏ)",
    "examples": [
      {
        "translation": "Chiếc cốc này là cái mua ngày hôm qua."
      }
    ]
  },
  "zh_一下_72": {
    "title": "Động từ + 一下 (Động lượng từ: ...một chút, ...một lát [làm dịu ngữ khí, hành động ngắn])",
    "shortExplanation": "Động lượng từ '一下' (yīxià) đứng sau động từ để biểu thị hành động diễn ra trong thời gian ngắn, làm thử hoặc giúp ngữ khí câu cầu khiến trở nên nhẹ nhàng, lịch sự.",
    "longExplanation": "'一下' (yīxià) là động lượng từ được sử dụng cực kỳ phổ biến sau động từ trong khẩu ngữ tiếng Trung. Cấu trúc này có các chức năng chính: (1) biểu thị hành động diễn ra nhanh chóng, trong khoảng thời gian ngắn hoặc làm một lần (ví dụ: 等一下: đợi một lát, 看一下: xem một chút); (2) biểu thị ý định làm thử việc gì đó (ví dụ: 尝一下: nếm thử một chút); (3) làm cho ngữ khí của câu mệnh lệnh hoặc nhờ vả trở nên mềm mại, thân mật và lịch sự hơn, không gây cảm giác gò bó hay áp đặt (ví dụ: 你去给老师送一下报纸: bạn đi đưa báo cho thầy một lát nhé).",
    "formation": "Động từ + 一下 (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Bạn đi mang báo đến cho thầy giáo một chút nhé."
      }
    ]
  },
  "zh_真_73": {
    "title": "真 + Tính từ / Động từ tâm lý (Phó từ cảm thán: thật là, thật sự...)",
    "shortExplanation": "Phó từ '真' (zhēn) đứng trước tính từ hoặc động từ tâm lý, cuối câu thường đi kèm trợ từ ngữ khí '啊', dùng trong câu cảm thán để bày tỏ sự khen ngợi hoặc thán phục chân thành.",
    "longExplanation": "'真' (zhēn) là phó từ chỉ mức độ dùng chủ yếu trong các câu cảm thán để bộc lộ cảm xúc, ấn tượng mạnh mẽ của người nói đối với tính chất của sự vật, sự việc (tương đương với 'thật là...', 'thật...' trong tiếng Việt). Nó thường bổ nghĩa cho tính từ hoặc động từ trạng thái tâm lý (như 喜欢, 羡慕), cuối câu thường kết hợp với trợ từ ngữ khí như '啊' (ā), '呀' (ya). Khác với '很' chỉ miêu tả mức độ một cách khách quan, '真' mang đậm sắc thái tình cảm chủ quan và ngữ khí tán thưởng.",
    "formation": "Chủ ngữ + 真 + Tính từ / Động từ tâm lý (+ 啊 / 呀 / 呢)!",
    "examples": [
      {
        "translation": "Sữa ngon thật đấy!"
      }
    ]
  },
  "zh_O是SV的_74": {
    "title": "Tân ngữ + 是 + Chủ ngữ + Động từ + 的 (Cấu trúc 是……的 nhấn mạnh người thực hiện: Tân ngữ là do ai làm)",
    "shortExplanation": "Đưa tân ngữ lên đầu câu làm chủ đề, dùng cấu trúc nhấn mạnh '是……的' để làm nổi bật chính chủ ngữ (ai) là người thực hiện hành động đã xảy ra.",
    "longExplanation": "Cấu trúc '是……的' (shì... de) được sử dụng để nhấn mạnh một chi tiết cụ thể (thời gian, địa điểm, phương thức hoặc người thực hiện) của một hành động đã diễn ra trong quá khứ. Khi tân ngữ được đưa lên đầu câu làm chủ đề bàn luận, cấu trúc có dạng 'Tân ngữ + 是 + Chủ ngữ (Người thực hiện) + Động từ + 的', nhằm nhấn mạnh rõ ràng chính chủ thể đó là người đã thực hiện hành động (ví dụ: '这本书是我买的' = Cuốn sách này là do tôi mua / chính tôi là người mua cuốn sách này). Dạng phủ định đặt '不' trước '是' (这本书不是我买的).",
    "formation": "Tân ngữ + 是 + Chủ ngữ + Động từ + 的",
    "examples": [
      {
        "translation": "Quyển sách này là do tôi mua."
      }
    ]
  },
  "zh_的时候_75": {
    "title": "……的时候 (Khi..., lúc... - Biểu thị thời điểm diễn ra sự việc)",
    "shortExplanation": "Đặt '……的时候' (de shíhou) sau cụm từ chỉ thời gian, tuổi tác hoặc động từ/mệnh đề để diễn tả thời điểm xảy ra sự việc; 'khi...', 'lúc...'.",
    "longExplanation": "'……的时候' (de shíhou) là cấu trúc chuẩn mực và thông dụng nhất trong tiếng Trung để tạo trạng ngữ chỉ thời gian, tương đương với 'khi...', 'lúc...', 'hồi...' trong tiếng Việt. Cấu trúc này có khả năng kết hợp rất linh hoạt: có thể đứng sau từ ngữ chỉ tuổi tác (như 18岁的时候: lúc 18 tuổi), sau động từ hoặc cụm động từ (như 吃饭的时候: lúc ăn cơm), hoặc sau một phân câu chủ vị hoàn chỉnh (như 我读大学的时候: lúc tôi học đại học). Cụm này thường đứng ở đầu câu hoặc đứng giữa chủ ngữ và vị ngữ chính.",
    "formation": "Thời gian / Cụm động từ / Mệnh đề + 的时候",
    "examples": [
      {
        "translation": "Hồi tôi 18 tuổi, tôi từng đến Bắc Kinh."
      }
    ]
  },
  "zh_已经VA了_76": {
    "title": "已经 + Động từ / Tính từ + 了 (Đã... rồi - Biểu thị hành động đã hoàn tất hoặc trạng thái đã diễn ra)",
    "shortExplanation": "Phó từ '已经' (yǐjīng) kết hợp với trợ từ '了' (le) ở cuối câu để nhấn mạnh hành động đã hoàn thành hoặc tình huống đã phát triển đến một mức độ nhất định; 'đã... rồi'.",
    "longExplanation": "Cấu trúc '已经……了' (yǐjīng... le) được dùng để biểu thị một hành động đã hoàn tất, hoặc một trạng thái/tình huống đã nảy sinh và đạt tới một thời điểm, mức độ nhất định (tương đương với 'đã... rồi' trong tiếng Việt). Phó từ '已经' đứng trước động từ hoặc tính từ, còn trợ từ ngữ khí '了' đặt ở cuối câu để hô ứng tạo thành kết cấu khép kín. Khi đi kèm bổ ngữ thời lượng (như: '我已经工作两年多了'), cấu trúc biểu thị hành động đã bắt đầu từ quá khứ và vẫn đang tiếp diễn ở hiện tại.",
    "formation": "Chủ ngữ + 已经 + Động từ / Tính từ (+ Tân ngữ / Bổ ngữ) + 了",
    "examples": [
      {
        "translation": "Tôi đã đi làm được hơn hai năm rồi."
      }
    ]
  }
}

data_ja = {
  "zh_几_62": {
    "title": "几 ＋ 量詞 ＋ 名詞（10未満の概数：いくつか、何〜、数〜）",
    "shortExplanation": "「几」（jǐ）は10未満の不特定の数量（概数）を表し、量詞と名詞の前に置かれて「いくつか」「何〜」「数〜」という意味を表します。",
    "longExplanation": "「几」（jǐ）は疑問代名詞として10未満の数を尋ねる（「何〜」「いくつ」）だけでなく、平叙文において10未満の不特定の数量（概数）を表す数詞としても用いられます（日本語の「何〜」「数〜」「いくつか」に相当）。基本形式は「几 ＋ 量詞 ＋ 名詞」で、具体的な数字を特定せずに少数のまとまりを表す際に便利です（例：几本书＝何冊かの本、几个人＝何人かの人、几天＝数日）。",
    "formation": "几 ＋ 量詞 ＋ 名詞",
    "examples": [
      {
        "translation": "何冊かの本。"
      }
    ]
  },
  "zh_十几_63": {
    "title": "十几 ＋ 量詞 ＋ 名詞（11〜19の概数：十数〜、十何〜）",
    "shortExplanation": "「十几」（shíjǐ）は10より大きく20未満の概数（11〜19）を表し、「十数〜」「十何〜」という意味を表します。",
    "longExplanation": "数字「十」の直後に「几」を置いた「十几」（shíjǐ）は、11から19までの不特定の数（概数）を表します（日本語の「十数〜」「十何〜」に相当）。名詞を修飾する際は「十几 ＋ 量詞 ＋ 名詞」の順になり、量詞は「十几」の後ろに置かれます（例：十几本书＝十数冊の本、十几个人＝十数人の人、十几天＝十数日、十几岁＝十代の年齢）。「几十」（何十〜）との語順の違いに注意が必要です。",
    "formation": "十几 ＋ 量詞 ＋ 名詞",
    "examples": [
      {
        "translation": "十数冊の本。"
      }
    ]
  },
  "zh_几十_64": {
    "title": "几十 ＋ 量詞 ＋ 名詞（20〜90の概数：何十〜、数十〜）",
    "shortExplanation": "「几十」（jǐ shí）は20から90までの十の位の概数（「何十〜」「数十〜」）を表します。",
    "longExplanation": "「十」の前に「几」を置いた「几十」（jǐ shí）は、20から90までの十の位の不特定の数（概数）を表します（日本語の「何十〜」「数十〜」に相当）。修飾語として用いる場合は「几十 ＋ 量詞 ＋ 名詞」の形をとります（例：几十本书＝何十冊もの本／数十冊の本、几十个人＝何十人もの人、几十块钱＝何十元）。語順が逆の「十几」（11〜19）と混同しないよう注意が必要です。",
    "formation": "几十 ＋ 量詞 ＋ 名詞",
    "examples": [
      {
        "translation": "何十冊もの本。"
      }
    ]
  },
  "zh_几多_65": {
    "title": "数詞 ＋ 几／多 ＋ 量詞 ＋ 名詞（十以上の整数の概数端数：〜数、〜あまり）",
    "shortExplanation": "20、30など十以上のキリの良い整数の直後に「几」または「多」を置き、量詞の前に挟むことで、端数のある概数（「20数〜」「20あまりの〜」）を表します。",
    "longExplanation": "20や30、100など十以上のキリの良い整数の後ろに「几」または「多」を置き、量詞の前に配置することで、その基数を超える端数を含んだ概数を表します。「二十几本书」は21〜29冊の範囲にある「20数冊の本（20何冊かの本）」を指し、「二十多本书」は20冊を上回る「20冊あまりの本（20冊以上）」を表します。基数が十の倍数である場合に量詞の前に置かれる点が文法的な特徴です。",
    "formation": "数詞（十以上の整数の位） ＋ 几／多 ＋ 量詞 ＋ 名詞",
    "examples": [
      {
        "translation": "20数冊の本／20冊あまりの本。"
      }
    ]
  },
  "zh_M多月星期_66": {
    "title": "数詞 ＋ 量詞 ＋ 多 ＋ 名詞（1単位未満の端数を表す概数：〜ヶ月余り、〜週間余り）",
    "shortExplanation": "数詞が10未満の場合、「多」は量詞の後ろに置かれ、その量詞の1単位に満たない端数（「〜余り」「〜ちょっと」）を表します。",
    "longExplanation": "中国語において概数を表す「多」（duō）の位置には厳密な文法規則があります。基底の数詞が10未満（1〜9）である場合、「多」は量詞の後ろ、名詞の前に置かれます（「数詞 ＋ 量詞 ＋ 多 ＋ 名詞」）。これは直前の量詞の1単位に満たない余剰の端数を表します。例えば「两个多月」は2ヶ月と何日か（3ヶ月未満の「2ヶ月余り／2ヶ月ちょっと」）を意味し、「三个多星期」は3週間と数日（4週間未満の「3週間余り／3週間ちょっと」）を意味します。",
    "formation": "数詞（10未満） ＋ 量詞 ＋ 多 ＋ 名詞（時間）",
    "examples": [
      {
        "translation": "2ヶ月余り、3週間余り。"
      }
    ]
  },
  "zh_V不VorA不A_67": {
    "title": "動詞 ＋ 不 ＋ 動詞 ／ 形容詞 ＋ 不 ＋ 形容詞（反復疑問文：〜しますか、〜ですか）",
    "shortExplanation": "動詞や形容詞の肯定形と否定形を並べて尋ねる反復疑問文です。文末に疑問助詞「吗」はつけません。",
    "longExplanation": "「動詞 ＋ 不 ＋ 動詞」および「形容詞 ＋ 不 ＋ 形容詞」は、述語の肯定形と否定形を並列させて聞き手に二者択一で回答を求める「反復疑問文（正反疑問句）」です（日本語の「〜しますか・しませんか」「〜ですか」に相当）。例：去不去（行くか行かないか＝行きますか）、冷不冷（寒いか寒くないか＝寒いですか）。この構文自体が疑問を表すため、文末に疑問の語気助詞「吗」を併用することはできません（「你去不去吗？」は誤り）。",
    "formation": "動詞 ＋ 不 ＋ 動詞（＋ 目的語）？／ 形容詞 ＋ 不 ＋ 形容詞？",
    "examples": [
      {
        "translation": "私は店に行きますが、あなたは行きますか？"
      }
    ]
  },
  "zh_是不是_68": {
    "title": "是不是……？（〜ではないですか、本当に〜ですか：推測・確認の疑問文）",
    "shortExplanation": "「是不是」（shìbùshì）を述語の前や文頭に置き、話し手の推測や把握している事柄が正しいかどうかを相手に確認します。",
    "longExplanation": "「是不是」（shìbùshì）は動詞「是」の反復疑問形式に由来し、話し手がある程度の予測や推測を持ちながら、「〜ではないですか」「本当に〜なのですか」と相手に事実の確認や念押しを求める際に用います。語順は柔軟で、主語と述語の間（你是不是喜欢运动？）、文頭（是不是你……？）、あるいは文末の付加疑問（……，是不是？）として配置されます。文末に疑問助詞「吗」は添えません。",
    "formation": "主語 ＋ 是不是 ＋ 述語？／ 是不是 ＋ 主語 ＋ 述語？",
    "examples": [
      {
        "translation": "あなたはスポーツが好きなんですか？（スポーツが好きなのではないですか？）"
      }
    ]
  },
  "zh_每MN都V_69": {
    "title": "每 ＋ 量詞 ＋ 名詞 ＋（都）＋ 動詞（どの〜も皆、毎〜必ず：例外のない全体を表す）",
    "shortExplanation": "「每」（毎〜、どの〜も）は量詞・名詞と結合し、後ろの副詞「都」（すべて）と呼応して例外のない全体を表します。",
    "longExplanation": "「每 ＋ 量詞 ＋ 名詞 ＋（都）＋ 動詞」は、ある範囲の個々の対象をすべて取り上げ、「どれもみな〜する」「毎〜例外なく〜である」という全称的な事態を表す基本構文です。「每」によって個別に取り出された各要素を、後ろの副詞「都」（dōu）が総括して受けるのが中国語の自然な呼応パターンです（例：你每个星期六(都)工作吗？＝あなたは毎週土曜日（いつも）仕事をしていますか？、每个人都知道＝誰もが知っている）。",
    "formation": "每 ＋ 量詞 ＋ 名詞（＋ 都） ＋ 動詞",
    "examples": [
      {
        "translation": "あなたは毎週土曜日（いつも）仕事をしていますか？"
      }
    ]
  },
  "zh_多A_70": {
    "title": "多 ＋ 形容詞（程度・数値を尋ねる：どれくらい〜ですか、どのくらい〜ですか）",
    "shortExplanation": "副詞「多」（duō）を計測可能な形容詞（高、大、远など）の前に置き、具体的な程度や数値を尋ねます。",
    "longExplanation": "尺度や計測を表す形容詞（高、大、远、重、长など）の直前に副詞「多」（duō）を置くことで、「どれくらい〜ですか」「どの程度〜ですか」と具体的な数値や程度を尋ねる疑問表現を作ります（英語の how tall, how old, how far に相当）。例：他多高？（彼の身長はどれくらいですか？）、你多大？（おいくつですか？）、学校离这里有多远？（学校はここからどれくらい遠いですか？）。回答には「一米八（1メートル80）」などの具体的な数量詞を用いて答えます。",
    "formation": "主語 ＋ 多 ＋ 形容詞？",
    "examples": [
      {
        "translation": "彼の背はどれくらい高いですか？（彼の身長はどれくらいですか？）"
      }
    ]
  },
  "zh_的N_71": {
    "title": "修飾語 ＋ 的（＋ 名詞の省略）（「的」のフレーズ：名詞の省略による名詞句化）",
    "shortExplanation": "文脈から指示対象が明らかな場合、「的」の後ろの中心名詞を省略して「〜のもの」「〜の」という名詞句（「的」字構造）を作ります。",
    "longExplanation": "中国語では、連体修飾語と中心名詞を結ぶ構造助詞「的」の後ろの名詞が、文脈や直前の発言からすでに自明である場合、語の重複を避けて簡潔に表現するために名詞を省略することができます。この「修飾語 ＋ 的」の形を「的字短語（的のフレーズ）」と呼び、独立した名詞句として機能します（日本語の「〜のもの」「〜のやつ」に相当）。例文の「这个杯子是昨天买的(杯子)」では、冒頭にすでに「杯子（コップ）」が出ているため、文末の「杯子」を省略して自然な表現にしています。",
    "formation": "連体修飾語 ＋ 的（＋ 省略された名詞）",
    "examples": [
      {
        "translation": "このコップは昨日買った（コップ）です。"
      }
    ]
  },
  "zh_一下_72": {
    "title": "動詞 ＋ 一下（動量詞：ちょっと〜する、一度〜してみる［語気を和らげる表現］）",
    "shortExplanation": "動詞の直後に動量詞「一下」（yīxià）を置き、動作が短時間であること、試みにやってみること、または依頼の語気を柔らかくすることを表します。",
    "longExplanation": "「動詞 ＋ 一下」（yīxià）は、中国語の日常会話で多用される表現です。主な文法機能は次の通りです。(1) 動作の継続時間が短いことや、動作が1回行われることを表す（例：等一下＝少々お待ちください、看一下＝ちょっと見る）。(2) 試しにその行為を行ってみる試行を表す（例：尝一下＝味見してみる）。(3) 相手に何かを頼む際、命令的な響きを抑えて語気を柔らかく親しみやすいものにする（例：你去给老师送一下报纸＝先生のところへ新聞をちょっと届けてきてください）。",
    "formation": "動詞 ＋ 一下（＋ 目的語）",
    "examples": [
      {
        "translation": "先生のところへ新聞を届けてきてください（ちょっと新聞を届けてきて）。"
      }
    ]
  },
  "zh_真_73": {
    "title": "真 ＋ 形容詞／心理動詞（感嘆を表す程度副詞：本当に〜、実に〜）",
    "shortExplanation": "副詞「真」（zhēn）は形容詞や心理動詞の前に置かれ、文末に感嘆助詞「啊」などを伴って「本当に〜だ」「実に〜だなあ」と心からの感情を表します。",
    "longExplanation": "程度副詞「真」（zhēn）は主に感嘆文において用いられ、話し手の主観的な感動、感嘆、賛美の気持ちを生き生きと表します（日本語の「本当に〜だ」「実に〜だなあ」に相当）。形容詞や心理動詞（喜欢、爱、高兴など）の前に置かれ、文末には語気助詞「啊（ā）」や「呀（ya）」を伴うのが典型的です（例：牛奶真好喝啊！＝牛乳は本当においしいですね！、今天真冷啊！＝今日は本当に寒いなあ！）。単なる客観的な高程度を表す「很」に比べ、強い主観的詠嘆が含まれます。",
    "formation": "主語 ＋ 真 ＋ 形容詞／心理動詞（＋ 啊／呀）！",
    "examples": [
      {
        "translation": "牛乳は本当においしいですね！"
      }
    ]
  },
  "zh_O是SV的_74": {
    "title": "目的語 ＋ 是 ＋ 主語 ＋ 動詞 ＋ 的（「是……的」構文：動作主・誰が行ったかを強調する）",
    "shortExplanation": "目的語を文頭に出して話題とし、「是……的」構文を用いて「誰がその動作を行ったのか（動作主）」を際立たせて強調します。",
    "longExplanation": "「是……的」（shì... de）構文は、すでに完了した確定済みの出来事を前提とし、その動作の「時・場所・方法」あるいは「誰がしたのか（動作の主体）」を際立たせるための構文です。目的語を文頭に置いて話題化し、「目的語 ＋ 是 ＋ 主語（動作主） ＋ 動詞 ＋ 的」の形にすることで、「この目的語を動詞したのはまさに主語である」と動作主を明確に強調します（例：这本书是我买的＝この本は私が買ったものです／この本を買ったのは私です）。否定文では「不是」を用います（这本书不是我买的）。",
    "formation": "目的語 ＋ 是 ＋ 主語 ＋ 動詞 ＋ 的",
    "examples": [
      {
        "translation": "この本は私が買ったものです。"
      }
    ]
  },
  "zh_的时候_75": {
    "title": "……的时候（〜の時、〜のころ：動作や状況が生じる時点を表す）",
    "shortExplanation": "年齢、時間詞、動詞句、節の後ろに「……的时候」（de shíhou）を置き、「〜の時」「〜のころ」と事態が発生した時点を表します。",
    "longExplanation": "「……的时候」（de shíhou）は、ある動作、状態、または出来事が発生した具体的な時点や期間を表す最も代表的な時間表現構文です（日本語の「〜の時」「〜の頃」に相当）。年齢（18岁的时候＝18歳の時）、動詞句（吃饭的时候＝ご飯を食べている時）、あるいは主述の節（我来中国的时候＝私が中国に来た時）の後ろに自由に接続して時間状語を構成します。文頭または主語の直後に置かれます。",
    "formation": "時間詞／動詞句／節 ＋ 的时候",
    "examples": [
      {
        "translation": "私は18歳の時に北京に来たことがあります。"
      }
    ]
  },
  "zh_已经VA了_76": {
    "title": "已经 ＋ 動詞／形容詞 ＋ 了（すでに〜した、もう〜になった：動作の完了・持続・変化の実現）",
    "shortExplanation": "副詞「已经」（yǐjīng）と文末の助詞「了」（le）が呼応し、動作がすでに完了したことや事態がある段階に達したことを表します。",
    "longExplanation": "「已经 ＋ 動詞／形容詞 ＋ 了」（yǐjīng... le）は、動作がすでに完了したこと、あるいは事態がすでに特定の段階に達したことを表す重要構文です（日本語の「すでに〜した」「もう〜になった」に相当）。副詞「已经」が動詞・形容詞の前に置かれ、文末の助詞「了」と呼応して完了や実現を明確に示します。「我已经工作两年多了」のように時量補語を伴う場合、過去に始まった動作が現在までその期間継続していることを表します。",
    "formation": "主語 ＋ 已经 ＋ 動詞／形容詞（＋ 目的語／補語） ＋ 了",
    "examples": [
      {
        "translation": "私はすでに2年余り働いています。"
      }
    ]
  }
}

data_ko = {
  "zh_几_62": {
    "title": "几 + 양사 + 명사 (10 미만의 개략적인 수: 몇, 서너, 얼마간의)",
    "shortExplanation": "'几'(jǐ)는 10 미만의 불특정한 개수나 수량(개수)을 나타내며, 양사와 명사 앞에 놓여 '몇', '몇몇', '얼마간의'라는 뜻을 나타냅니다.",
    "longExplanation": "'几'(jǐ)는 10 미만의 수를 묻는 의문사('몇?')로 쓰일 뿐만 아니라, 평서문에서 10 미만의 불특정한 수량(개수, 概数)을 나타내는 수사로도 널리 사용됩니다(한국어의 '몇', '몇몇', '서너'에 해당). 기본 구조는 '几 + 양사 + 명사'이며, 1에서 9 사이의 적은 수량을 어림잡아 나타낼 때 쓰입니다(예: 几本书 - 몇 권의 책, 几个人 - 몇몇 사람, 几天 - 며칠).",
    "formation": "几 + 양사 + 명사",
    "examples": [
      {
        "translation": "책 몇 권."
      }
    ]
  },
  "zh_十几_63": {
    "title": "十几 + 양사 + 명사 (11에서 19 사이의 개략적인 수: 십 몇, 십여)",
    "shortExplanation": "'十几'(shíjǐ)는 10보다 크고 20 미만인 11~19 사이의 대략적인 수량('십 몇', '십여')을 나타냅니다.",
    "longExplanation": "숫자 '十'(10) 바로 뒤에 '几'가 결합된 '十几'(shíjǐ)는 11부터 19까지의 불특정한 수를 나타내는 수량 표현입니다(한국어의 '십여', '십 몇'에 해당). 사물을 셀 때는 '十几 + 양사 + 명사' 어순으로 쓰이며, 양사는 반드시 '十几' 뒤에 위치합니다(예: 十几本书 - 십여 권의 책, 十几个人 - 십여 명의 사람, 十几天 - 십여 일). 20~90을 가리키는 '几十'(수십)과 어순을 혼동하지 않도록 주의해야 합니다.",
    "formation": "十几 + 양사 + 명사",
    "examples": [
      {
        "translation": "십여 권의 책."
      }
    ]
  },
  "zh_几十_64": {
    "title": "几十 + 양사 + 명사 (20에서 90 사이의 수십 단위 개략 수: 몇십, 수십)",
    "shortExplanation": "'几十'(jǐ shí)은 20에서 90 사이의 십 단위 불특정 수량('몇십', '수십')을 나타냅니다.",
    "longExplanation": "'十' 앞에 '几'를 둔 '几十'(jǐ shí)은 20부터 90까지의 십 단위 개략적인 수를 나타냅니다(한국어의 '몇십', '수십'에 해당). 양사와 명사를 연결할 때는 '几十 + 양사 + 명사' 어순을 취합니다(예: 几十本书 - 수십 권의 책, 几十个人 - 수십 명의 사람, 几十块钱 - 몇십 위안). 11~19를 가리키는 '十几'와 어순 및 의미가 상반되므로 명확한 구별이 필요합니다.",
    "formation": "几十 + 양사 + 명사",
    "examples": [
      {
        "translation": "수십 권의 책."
      }
    ]
  },
  "zh_几多_65": {
    "title": "수사 + 几 / 多 + 양사 + 명사 (10 이상의 묶음 정수 뒤의 단수 표현: ~ 몇, ~여, ~ 남짓)",
    "shortExplanation": "20, 30 등 10 단위 이상의 묶음 정수 바로 뒤에 '几'나 '多'를 붙여 양사 앞에 놓으면, 그 수를 조금 넘는 끝수가 있음을 나타냅니다('20 몇 ~', '20여 ~').",
    "longExplanation": "20, 30, 50, 100 등 10 단위 이상의 딱 떨어지는 정수 뒤에 '几' 또는 '多'를 결합하고 그 뒤에 양사와 명사를 놓아 기준 숫자를 넘는 단수(끝수)를 나타냅니다. '二十几本书'는 21~29 사이의 '20 몇 권의 책'을 의미하고, '二十多本书'는 20을 넘는 '20여 권의 책(20권 남짓한 책)'을 나타냅니다. 정수가 10 단위로 묶이는 수일 때 '几/多'가 양사 앞에 위치한다는 점이 중요합니다.",
    "formation": "수사(10 이상의 정수) + 几 / 多 + 양사 + 명사",
    "examples": [
      {
        "translation": "20 몇 권의 책 / 20여 권의 책."
      }
    ]
  },
  "zh_M多月星期_66": {
    "title": "수사 + 양사 + 多 + 명사 (1 단위 미만의 단수를 나타냄: ~ 남짓, ~ 넘게 [양사 뒤의 '多'])",
    "shortExplanation": "수사가 10 미만일 때 '多'는 양사 뒤에 놓여, 해당 양사 1단위에 못 미치는 자투리 단수('~ 남짓', '~ 넘게')를 나타냅니다.",
    "longExplanation": "중국어에서 끝수를 나타내는 '多'(duō)의 위치는 수사의 크기에 따라 달라집니다. 수사가 10 미만(1~9)인 경우, '多'는 반드시 양사 뒤, 명사 앞에 놓입니다('수사 + 양사 + 多 + 명사'). 이는 해당 양사 1단위를 채우지 못하는 자투리 시간이 더 붙어 있음을 뜻합니다. 예를 들어 '两个多月'는 2개월을 넘고 3개월은 되지 않는 기간('두 달 남짓 / 두 달 넘게')을 가리키며, '三个多星期'는 3주일을 넘고 4주는 되지 않는 기간('3주일 남짓 / 3주일 넘게')을 의미합니다.",
    "formation": "수사(10 미만) + 양사 + 多 + 명사 (시간)",
    "examples": [
      {
        "translation": "두 달 남짓, 3주일 남짓."
      }
    ]
  },
  "zh_V不VorA不A_67": {
    "title": "동사 + 不 + 동사 / 형용사 + 不 + 형용사 (정반의문문: ~하니 안 하니?, ~합니까?)",
    "shortExplanation": "동사나 형용사의 긍정형과 부정형을 나란히 연결하여 묻는 정반의문문으로, 문장 끝에 '吗'를 붙이지 않습니다.",
    "longExplanation": "'동사 + 不 + 동사' 또는 '형용사 + 不 + 형용사'는 술어의 긍정 형식과 부정 형식을 병렬하여 상대방에게 긍정과 부정 중 하나를 선택하여 대답하게 하는 '정반의문문(正反疑问句)'입니다(한국어의 '~하니 안 하니?', '~합니까?'에 해당). 예: 去不去(가니 안 가니 / 가니?), 好不好(좋니 안 좋니 / 좋습니까?). 문장 자체에 이미 의문의 뜻이 완전히 포함되어 있으므로, 문장 끝에 의문조사 '吗'를 덧붙일 수 없습니다.",
    "formation": "동사 + 不 + 동사 (+ 목적어)? / 형용사 + 不 + 형용사?",
    "examples": [
      {
        "translation": "나는 가게에 가는데, 너 갈래 안 갈래?"
      }
    ]
  },
  "zh_是不是_68": {
    "title": "是不是……？ (혹시 ~인 거 아니야?, 정말 ~이니? [추측 및 사실 확인])",
    "shortExplanation": "'是不是'(shìbùshì)를 술어 앞이나 문두에 놓아, 자신이 짐작하고 있는 내용이 맞는지 상대방에게 확인할 때 씁니다.",
    "longExplanation": "'是不是'(shìbùshì)는 동사 '是'의 정반의문 형식에서 비롯된 표현으로, 말하는 사람이 이미 마음속으로 짐작하고 있거나 추측한 사실에 대해 상대방에게 '혹시 ~인 것 아니니?', '~가 맞지?'라며 확인을 구하거나 동의를 구할 때 사용합니다. 위치가 자유로워 주어와 술어 사이(你是不是喜欢运动？), 문장 맨 앞(是不是……), 또는 문장 맨 끝의 부가 의문 형태로 쓰입니다. 문말에 '吗'는 쓰지 않습니다.",
    "formation": "주어 + 是不是 + 술어? / 是不是 + 주어 + 술어?",
    "examples": [
      {
        "translation": "너 운동 좋아하는 거 아니야? (너 운동 좋아하지?)"
      }
    ]
  },
  "zh_每MN都V_69": {
    "title": "每 + 양사 + 명사 + (都) + 동사 (매 ~마다 모두 ~하다: 예외 없는 전면적 포괄)",
    "shortExplanation": "'每'(매, 모든)는 양사·명사와 결합하고 뒤의 부사 '都'(모두)와 호응하여 예외 없이 모두 그러함을 나타냅니다.",
    "longExplanation": "'每 + 양사 + 명사 + (都) + 동사' 구문은 특정 범위 내의 개별 구성원을 하나하나 열거하면서 '하나도 빠짐없이 모두 ~하다'라는 전면적인 포괄을 나타냅니다. '每'가 개별 대상을 분산하여 가리키기 때문에, 뒤따르는 술어 앞에는 대개 총괄 부사 '都'(dōu)가 호응하여 문장을 이끕니다(예: 你每个星期六(都)工作吗？ - 당신은 토요일마다 다 일합니까?, 每个人都来了 - 모든 사람이 다 왔다). 일상 구어에서 '都'가 생략되기도 하지만, 호응할 때 의미가 더욱 분명해집니다.",
    "formation": "每 + 양사 + 명사 (+ 都) + 동사",
    "examples": [
      {
        "translation": "당신은 토요일마다 (다) 일하나요?"
      }
    ]
  },
  "zh_多A_70": {
    "title": "多 + 형용사 (정도나 수치를 묻는 표현: 얼마나 ~한가요?, 어느 정도로 ~합니까?)",
    "shortExplanation": "부사 '多'(duō)를 측정 가능한 형용사(高, 大, 远 등) 앞에 붙여, 구체적인 수치나 정도를 질문합니다.",
    "longExplanation": "길이, 높이, 무게, 나이 등 측정 가능한 척도를 지닌 형용사(高, 大, 远, 重, 长 등) 앞에 부사 '多'(duō)를 배치하여, '얼마나 ~합니까?', '어느 정도로 ~한가요?'라는 뜻으로 구체적인 수치나 정도를 묻습니다(영어의 how + 형용사 구조에 해당). 예: 他多高？(그 사람 키가 얼마나 되나요?), 你多大？(나이가 어떻게 되세요?), 离这儿有多远？(여기서 얼마나 먼가요?). 질문에 대한 대답으로는 '一米八(1미터 80)'처럼 구체적인 수량 표현을 사용합니다.",
    "formation": "주어 + 多 + 형용사?",
    "examples": [
      {
        "translation": "그는 키가 얼마나 되나요?"
      }
    ]
  },
  "zh_的N_71": {
    "title": "수식어 + 的 (+ 명사 생략) ('的'자 구: 반복되는 중심 명사의 생략)",
    "shortExplanation": "문맥상 대상을 명확히 알 수 있을 때 '的' 뒤의 중심 명사를 생략하여 '~한 것', '~의 것'을 뜻하는 명사 상당어구를 형성합니다.",
    "longExplanation": "중국어에서는 피수식어인 중심 명사가 문맥 앞부분에서 이미 언급되었거나 상황상 무엇을 뜻하는지 뻔히 알 수 있을 때, 불필요한 단어 중복을 피하기 위해 '的' 뒤의 중심 명사를 과감히 생략합니다. 이렇게 만들어진 '수식어 + 的' 형태를 '的자 구(的字短语)'라고 하며, 독립된 명사구처럼 쓰여 '~한 것', '~의 것'을 가리킵니다. 예문인 '这个杯子是昨天买的(杯子)'에서 주어로 이미 '杯子(컵)'가 제시되었으므로, 문장 끝의 '杯子'를 생략하여 '어제 산 것'으로 표현하는 것이 훨씬 자연스럽습니다.",
    "formation": "관형어(수식어) + 的 (+ 생략된 명사)",
    "examples": [
      {
        "translation": "이 컵은 어제 산 (컵)입니다."
      }
    ]
  },
  "zh_一下_72": {
    "title": "동사 + 一下 (동량사: 좀 ~하다, 한번 ~해 보다 [어기를 부드럽게 완곡화])",
    "shortExplanation": "동사 뒤에 동량사 '一下'(yīxià)를 붙여 동작이 짧은 시간 동안 가볍게 행해짐을 나타내거나, 시도해 봄, 또는 부탁할 때 어조를 부드럽게 완곡화합니다.",
    "longExplanation": "'동사 + 一下'(yīxià)는 일상 회화에서 매우 빈번하게 쓰이는 동량사 구조입니다. 주된 용법은 세 가지입니다. (1) 동작이 짧은 시간 동안 이루어짐을 표시(예: 等一下 - 잠깐 기다리다, 看一下 - 잠깐 보다). (2) 시험 삼아 어떤 행동을 시도해 봄을 표시(예: 尝一下 - 맛 좀 보다). (3) 상대방에게 부탁이나 심부름을 청할 때 직설적인 명령조를 부드럽게 누그러뜨려 친근하고 정중한 어기를 조성함(예: 你去给老师送一下报纸 - 선생님께 신문 좀 가져다 드리고 오세요).",
    "formation": "동사 + 一下 (+ 목적어)",
    "examples": [
      {
        "translation": "선생님께 신문 좀 가져다 드리고 오세요."
      }
    ]
  },
  "zh_真_73": {
    "title": "真 + 형용사 / 심리동사 (감탄을 나타내는 정도부사: 정말 ~, 참으로 ~)",
    "shortExplanation": "부사 '真'(zhēn)은 형용사나 심리동사 앞에 쓰여 문말의 감탄조사 '啊' 등과 함께 '정말 ~하다', '참 ~하구나'라는 진심 어린 감탄을 나타냅니다.",
    "longExplanation": "정도부사 '真'(zhēn)은 주로 감탄문에서 쓰여, 말하는 사람이 눈앞의 사실을 접하고 마음에 와닿은 진솔한 감탄, 칭찬, 놀라움 등의 정서를 표현합니다(한국어의 '정말 ~하다', '참 ~하구나'에 해당). 형용사나 심리 상태를 나타내는 동사(喜欢, 漂亮, 高兴 등) 앞에 놓이며, 문장 끝에는 통상 감탄의 어기조사인 '啊'(ā)나 '呀'(ya)를 동반합니다(예: 牛奶真好喝啊！ - 우유가 정말 맛있네요!). 단순한 사실적 정도 묘사인 '很'과 달리 강한 주관적 영탄의 뉘앙스를 지닙니다.",
    "formation": "주어 + 真 + 형용사 / 심리동사 (+ 啊 / 呀)!",
    "examples": [
      {
        "translation": "우유가 정말 맛있네요!"
      }
    ]
  },
  "zh_O是SV的_74": {
    "title": "목적어 + 是 + 주어 + 동사 + 的 ('是……的' 강조 구문: 동작 수행 주체의 강조)",
    "shortExplanation": "목적어를 문두로 내세워 화제화하고 '是……的' 구문을 사용하여, 해당 동작을 완수한 '주체(누가 했는지)'를 특별히 강조합니다.",
    "longExplanation": "'是……的'(shì... de) 구문은 이미 발생·완료된 과거의 사실을 전제로 하여, 그 행위의 시간, 장소, 방식 또는 '누가 그 행위를 했는가(행위 주체)'를 콕 집어 강조할 때 쓰입니다. 동작의 대상인 목적어를 화제로 삼아 문두에 배치하고 '목적어 + 是 + 주어 + 동사 + 的' 어순을 취하면, '이 사물을 동사한 사람은 바로 주어다'라는 점이 두드러지게 강조됩니다(예: 这本书是我买的 - 이 책은 제가 산 것입니다 / 이 책을 산 건 바로 저예요). 부정 형태는 '不是'를 사용합니다(这本书不是我买的).",
    "formation": "목적어 + 是 + 주어 + 동사 + 的",
    "examples": [
      {
        "translation": "이 책은 제가 산 것입니다."
      }
    ]
  },
  "zh_的时候_75": {
    "title": "……的时候 (~할 때, ~의 때 [어떤 동작이나 상태가 일어나는 시점])",
    "shortExplanation": "나이, 시간 명사, 동사구, 절 뒤에 '……的时候'(de shíhou)를 붙여 '~할 때', '~ 시절'이라는 시간 부사어를 만듭니다.",
    "longExplanation": "'……的时候'(de shíhou)는 특정 동작이나 상황, 사건이 발생하는 시점이나 시기를 나타내는 가장 기초적이고 대표적인 시간 표현입니다(한국어의 '~할 때', '~ 시절', '~ 때'에 해당). 나이(18岁的时候 - 18살 때), 동사구(吃饭的时候 - 밥 먹을 때), 주술 구조의 절(我在大学的时候 - 내가 대학에 다닐 때) 뒤에 자유롭게 연결되어 문장 앞이나 주어 바로 뒤에서 시간 부사어 역할을 담당합니다.",
    "formation": "시간사 / 동사구 / 절 + 的时候",
    "examples": [
      {
        "translation": "저는 18살 때 베이징에 와 본 적이 있습니다."
      }
    ]
  },
  "zh_已经VA了_76": {
    "title": "已经 + 동사 / 형용사 + 了 (이미 ~했다, 벌써 ~하게 되었다 [동작 완료 및 상태의 실현])",
    "shortExplanation": "부사 '已经'(yǐjīng)과 문말 조사 '了'(le)가 호응하여, 동작이 이미 완료되었거나 사태가 이미 특정 단계에 이르렀음을 나타냅니다.",
    "longExplanation": "'已经……了'(yǐjīng... le) 구문은 어떤 행위가 이미 완료되었거나 사태의 변화가 이미 발생했음을 나타냅니다(한국어의 '이미 ~했다', '벌써 ~하게 되었다'에 해당). 부사 '已经'이 술어 앞에 놓이고 문장 끝의 어기조사 '了'와 긴밀하게 호응합니다. '我已经工作两年多了'와 같이 시량보어가 함께 쓰이면, 해당 동작이 과거부터 시작되어 현재까지 이미 그 시간만큼 지속되어 왔음을 나타냅니다.",
    "formation": "주어 + 已经 + 동사 / 형용사 (+ 목적어 / 보어) + 了",
    "examples": [
      {
        "translation": "저는 이미 2년 넘게 일했습니다."
      }
    ]
  }
}

data_zh = {
  "zh_几_62": {
    "title": "几 + 量词 + 名词（表示十以内的概数：几个、几本）",
    "shortExplanation": "“几”（jǐ）置于量词和名词之前，表示十以内不确定的数目（概数），相当于“几个”、“几本”。",
    "longExplanation": "“几”（jǐ）除了作为疑问代词询问十以内的数目之外，还常用在陈述句中表示十以内的不定数目（概数），相当于“几个”、“数个”。基本结构为“几 + 量词 + 名词”（如：几本书、几个人、几天），表示的数量通常在二到九之间，明确指代少于十的有限数量，无须精确指出具体数目。",
    "formation": "几 + 量词 + 名词",
    "examples": [
      {
        "translation": "几本书。"
      }
    ]
  },
  "zh_十几_63": {
    "title": "十几 + 量词 + 名词（表示十一到十九的概数：十几本、十几个）",
    "shortExplanation": "“十几”（shíjǐ）表示大于十而小于二十的不定数目（十一到十九之间），意为“十几个”、“十数”。",
    "longExplanation": "在基数词“十”后加上“几”构成“十几”（shíjǐ），用来表示十一到十九之间的概数。修饰名词时，量词位于“十几”之后，构成“十几 + 量词 + 名词”（如：十几本书、十几个学生、十几天、十几岁）。需要严格区分“十几”（11至19）与“几十”（20至90）在词序和数值范围上的差异。",
    "formation": "十几 + 量词 + 名词",
    "examples": [
      {
        "translation": "十几本书。"
      }
    ]
  },
  "zh_几十_64": {
    "title": "几十 + 量词 + 名词（表示二十到九十的概数：几十本、数十）",
    "shortExplanation": "“几十”（jǐ shí）表示二十到九十之间的整十数概数，意为“几十个”、“数十”。",
    "longExplanation": "将“几”置于“十”之前构成“几十”（jǐ shí），用以表示二十至九十之间的整十位数概数，相当于“几十”、“数十”。其搭配结构为“几十 + 量词 + 名词”（如：几十本书、几十个人、几十块钱）。语法上须特别注意它与表示十一至十九的“十几”在结构位置与数值涵义上的区别。",
    "formation": "几十 + 量词 + 名词",
    "examples": [
      {
        "translation": "几十本书。"
      }
    ]
  },
  "zh_几多_65": {
    "title": "数词 + 几 / 多 + 量词 + 名词（整十数后表示带有零头的概数：二十几本、二十多本）",
    "shortExplanation": "在整十、整百等基数后加“几”或“多”，置于量词前，表示含有零头的概数（如“二十几”、“二十多”）。",
    "longExplanation": "当数词为十以上的整十、整百数时，在其后加上“几”或“多”，并置于量词之前，用来表示带有零头的不定数目。“二十几本书”表示二十一至二十九之间的概数（二十几本）；“二十多本书”则表示超过二十的零数概数。该句式的结构统一为“整十数 + 几/多 + 量词 + 名词”，其中“几/多”必须位于量词之前。",
    "formation": "数词（整十数以上） + 几 / 多 + 量词 + 名词",
    "examples": [
      {
        "translation": "二十几本书 / 二十多本书。"
      }
    ]
  },
  "zh_M多月星期_66": {
    "title": "数词 + 量词 + 多 + 名词（表示不足一个量词单位的零数概数：两个多月）",
    "shortExplanation": "当基数词小于十时，“多”置于量词之后，表示多出的零头不足一个量词单位（如“两个多月”、“三个多星期”）。",
    "longExplanation": "汉语中用“多”表示概数时其位置有严整的规则：当基数词小于十（非整十数）时，“多”必须放在量词之后、名词之前，构成“数词 + 量词 + 多 + 名词”。它表示多出的零数小于一个量词单位。例如：“两个多月”表示两个月零几天（不到三个月）；“三个多星期”表示三周零几天（不到四周）。这与基数为整十数时“多”放在量词前（如“十多个月”）形成鲜明对比。",
    "formation": "数词（十以内） + 量词 + 多 + 名词（时间）",
    "examples": [
      {
        "translation": "两个多月，三个多星期。"
      }
    ]
  },
  "zh_V不VorA不A_67": {
    "title": "动词 + 不 + 动词 / 形容词 + 不 + 形容词（正反疑问句：去不去、好不好）",
    "shortExplanation": "将动词或形容词的肯定形式与否定形式并列构成正反疑问句；句末严禁再加“吗”。",
    "longExplanation": "“动词 + 不 + 动词”或“形容词 + 不 + 形容词”是现代汉语中最常见的“正反疑问句”句式。它通过将谓语的肯定形式和否定形式并列提问，要求听话人在肯定和否定两方面做出选择（如：去不去、想不想、高不高、冷不冷）。重要语法规则：正反疑问句本身已经具备完备的疑问语气，句尾绝对不可再使用疑问语气助词“吗”（不能说“你去不去吗？”）。",
    "formation": "动词 + 不 + 动词（+ 宾语）？ / 形容词 + 不 + 形容词？",
    "examples": [
      {
        "translation": "我去商店，你去不去？"
      }
    ]
  },
  "zh_是不是_68": {
    "title": "是不是……？（用于推测并寻求对方证实：是不是喜欢运动）",
    "shortExplanation": "“是不是”（shìbùshì）置于谓语前、句首或句尾，用于对某种推测提出疑问并向对方求证。",
    "longExplanation": "“是不是”（shìbùshì）是动词“是”的正反疑问形式。说话人通常对某种情况已有所估计或推测，运用“是不是”向听话人核实、求证该推断是否属实（相当于“是不是真的……”、“难道……吗”）。它的位置较为灵活，最常见的是放在主语和谓语之间（如：你是不是喜欢运动？），也可位于句首（如：是不是你拿了？），或置于句末作附加提问（如：明天休息，是不是？）。句尾不再加“吗”。",
    "formation": "主语 + 是不是 + 谓语？ / 是不是 + 主语 + 谓语？",
    "examples": [
      {
        "translation": "你是不是喜欢运动？"
      }
    ]
  },
  "zh_每MN都V_69": {
    "title": "每 + 量词 + 名词 +（都）+ 动词（表示每一个都如此，毫无例外）",
    "shortExplanation": "“每”修饰“量词+名词”，谓语前常与副词“都”呼应，强调所指范围内的每一个体毫无例外。",
    "longExplanation": "“每 + 量词 + 名词 +（都）+ 动词”用于总括特定范围内的每一个体，表示毫无例外（相当于“每一个……都……”）。代词“每”具有逐一指代个体的分配性质，因此在谓语动词或形容词前，通常要用总括副词“都”（dōu）与之相呼应，形成完整的语义照应（如：你每个星期六(都)工作吗？、每个人都很努力）。口语中“都”偶可省略，但加上“都”更符合汉语习惯，强调意味更足。",
    "formation": "每 + 量词 + 名词（+ 都） + 动词",
    "examples": [
      {
        "translation": "你每个星期六(都)工作吗？"
      }
    ]
  },
  "zh_多A_70": {
    "title": "多 + 形容词（用于询问程度或具体度量：多高、多大、多远）",
    "shortExplanation": "副词“多”（duō）置于度量形容词（高、大、远等）前，用于询问具体的数值、程度或距离。",
    "longExplanation": "在表示尺度和度量的形容词（如高、大、远、重、长等）前加上副词“多”（duō），构成询问程度或具体度量数值的疑问句式（相当于“有多……”）。常见搭配包括：多高（问身高或高度）、多大（问年龄或面积大小）、多远（问距离）、多重（问重量）。回答此类问句时，通常给出明确具体的数量短语（如：一米八、二十岁、五公里）。",
    "formation": "主语 + 多 + 形容词？",
    "examples": [
      {
        "translation": "他多高？"
      }
    ]
  },
  "zh_的N_71": {
    "title": "定语 + 的（+ 省略的名词）（“的”字短语：省略中心名词）",
    "shortExplanation": "当中心名词在语境中明确时，可将其省略，构成相当于名词的“定语 + 的”（“的”字短语）。",
    "longExplanation": "在现代汉语中，定语和中心名词之间用结构助词“的”连接。如果被修饰的中心名词在句子前面已经出现，或者在具体的交际语境中彼此都清楚指代何物，为了避免重复并使句子简洁精炼，通常会省略“的”后面的中心名词。这种由“定语 + 的”构成的短语称为“的”字短语，其语法性质相当于名词，意为“……的人”或“……的事物”。例如在“这个杯子是昨天买的(杯子)”中，由于句首已有“这个杯子”，句末的“杯子”省略不言更为自然。",
    "formation": "定语 + 的（+ 省略的名词）",
    "examples": [
      {
        "translation": "这个杯子是昨天买的(杯子)。"
      }
    ]
  },
  "zh_一下_72": {
    "title": "动词 + 一下（动量词：表示动作短暂、尝试或使语气委婉轻松）",
    "shortExplanation": "动量词“一下”（yīxià）置于动词之后，表示动作历时简短、尝试去做，或用于祈使句中缓和语气，使表达更加委婉客气。",
    "longExplanation": "“一下”（yīxià）是现代汉语中使用频率极高的动量词，附在动词之后充当数量补语。主要用法包括：其一，表示动作经历的时间非常短暂或只进行一次（如：等一下、看一下）；其二，表示尝试性地进行某项动作（如：尝一下、试一下）；其三，用于祈使或请求句中，能有效淡化命令色彩，使语气变得和缓、轻松、客气，具有礼貌商量的口吻（如：你去给老师送一下报纸）。",
    "formation": "动词 + 一下（+ 宾语）",
    "examples": [
      {
        "translation": "你去给老师送一下报纸。"
      }
    ]
  },
  "zh_真_73": {
    "title": "真 + 形容词 / 心理动词（副词：用于感叹句，表示确实如此且程度极高）",
    "shortExplanation": "副词“真”（zhēn）修饰形容词或心理动词，句末常带感叹语气助词“啊”，用于感叹句中表达由衷的赞叹与强调。",
    "longExplanation": "副词“真”（zhēn）主要用于感叹句中，带有鲜明的主观感情色彩，表示情况确实如此，且带有说话人发自内心的赞赏、惊叹或深切感受（相当于“确实”、“实在是”）。它常修饰形容词或心理活动动词（如喜欢、高兴、漂亮、好喝），句末多带有感叹语气词“啊”（ā）或“呀”（ya）（如：牛奶真好喝啊！、今天真热啊！）。与侧重客观陈述程度的“很”相比，“真”更侧重于主观抒情和情绪抒发。",
    "formation": "主语 + 真 + 形容词 / 心理动词（+ 啊/呀/呢）！",
    "examples": [
      {
        "translation": "牛奶真好喝啊！"
      }
    ]
  },
  "zh_O是SV的_74": {
    "title": "宾语 + 是 + 主语 + 动词 + 的（“是……的”强调句：宾语前置，强调动作施事者）",
    "shortExplanation": "将动作的受事宾语提前至句首充当话题，运用“是……的”结构专门强调完成该动作的施事者是谁。",
    "longExplanation": "“是……的”（shì... de）是现代汉语中用于强调的典型句式，其前提是动作在过去已经发生或完成。当动作涉及的事物已知时，常将宾语提前到句首充当全句话题，构成“宾语 + 是 + 施事者 + 动词 + 的”。该句式的表达重心在于突出强调该动作究竟是由谁执行的（如：这本书是我买的，意在强调买书的人是“我”而非他人）。其否定形式是在“是”前加否定词“不”（如：这本书不是我买的）。",
    "formation": "宾语 + 是 + 主语 + 动词 + 的",
    "examples": [
      {
        "translation": "这本书是我买的。"
      }
    ]
  },
  "zh_的时候_75": {
    "title": "……的时候（表示动作或情况发生的时间：……时、当……的时候）",
    "shortExplanation": "置于年龄词、时间词、动词短语或小句之后，构成时间状语，表示“当……时”、“在……的时候”。",
    "longExplanation": "“……的时候”（de shíhou）是汉语中表示时间的典型格式，用于交代动作、变化或状态发生时的具体时间点或时间阶段（相当于“在……的时候”、“……时”）。它可以直接附着在年龄词后（如：18岁的时候），也可以接在动词短语、形容词短语或主谓短语之后（如：吃饭的时候、生病的时候、我来北京的时候）。在句中通常作时间状语，位于主语之前或主语与谓语动词之间。",
    "formation": "时间词 / 动词短语 / 小句 + 的时候",
    "examples": [
      {
        "translation": "我18岁的时候来过北京。"
      }
    ]
  },
  "zh_已经VA了_76": {
    "title": "已经 + 动词 / 形容词 + 了（表示动作已完成或状态已发生改变）",
    "shortExplanation": "副词“已经”（yǐjīng）与句尾助词“了”（le）搭配使用，表示动作已完成，或某种情况、时间已达到一定程度。",
    "longExplanation": "“已经……了”（yǐjīng... le）是表示动作完成或状态发生改变的常用呼应格式（相当于“已经……了”）。副词“已经”置于谓语动词或形容词前，表示动作已成既成事实；句尾的助词“了”则用于证实事态的实现与转变。若句子带有表示时段的时量补语（如：我已经工作两年多了），则表明该动作从过去开始一直持续至今，且时间已达该数量。",
    "formation": "主语 + 已经 + 动词 / 形容词（+ 宾语 / 补语） + 了",
    "examples": [
      {
        "translation": "我已经工作两年多了。"
      }
    ]
  }
}

full_data = {
  "vi": data_vi,
  "ja": data_ja,
  "ko": data_ko,
  "zh": data_zh
}

input_path = "/Users/huyphan/Downloads/web-app/lingua-tube/scripts/grammar-chunks/input/zh/zh_chunk_05.json"
with open(input_path, "r", encoding="utf-8") as f:
    input_items = json.load(f)

expected_ids = [item["id"] for item in input_items]
print(f"Total input items: {len(expected_ids)}")

for lang in ["vi", "ja", "ko", "zh"]:
    lang_ids = list(full_data[lang].keys())
    assert len(lang_ids) == len(expected_ids), f"Mismatch in {lang} count: {len(lang_ids)} vs {len(expected_ids)}"
    for pid in expected_ids:
        assert pid in full_data[lang], f"Missing {pid} in {lang}"
        item = full_data[lang][pid]
        for field in ["title", "shortExplanation", "longExplanation", "formation", "examples"]:
            assert field in item, f"Missing field {field} in {lang}[{pid}]"
            assert item[field], f"Empty field {field} in {lang}[{pid}]"
        assert len(item["examples"]) == 1, f"Examples count mismatch in {lang}[{pid}]"
        assert "translation" in item["examples"][0], f"Missing translation in {lang}[{pid}]"

# Check for forbidden English tokens or placeholders in formation and explanations
# E.g. isolated V, N, A, M, S, O, TIME
forbidden_patterns = [
    re.compile(r'\b[VNAMS]\b'),
    re.compile(r'\bTIME\b'),
    re.compile(r'\b(?:noun|verb|adjective|adverb|object|subject)\b', re.IGNORECASE)
]

for lang, items in full_data.items():
    for pid, entry in items.items():
        for field in ["formation", "shortExplanation", "longExplanation"]:
            text = entry[field]
            for pat in forbidden_patterns:
                matches = pat.findall(text)
                if matches:
                    print(f"Warning/Violation in {lang}.{pid}.{field}: matched {matches} in: {text}")

output_path = "/Users/huyphan/Downloads/web-app/lingua-tube/scripts/grammar-chunks/output/zh_chunk_05.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(full_data, f, ensure_ascii=False, indent=2)

print(f"Successfully generated and wrote {output_path}")

import { GrammarTranslation } from '../../../models/grammar.model';

export const GRAMMAR_ZH_VI: Record<string, GrammarTranslation> = {
  "zh_什么_1": {
    "title": "什么 (Cái gì, gì)",
    "shortExplanation": "Đại từ nghi vấn dùng để hỏi về sự vật, sự việc; tương đương với 'cái gì', 'gì' trong tiếng Việt.",
    "longExplanation": "'什么' (shénme) là đại từ nghi vấn cơ bản trong tiếng Trung, thường đứng ở vị trí tân ngữ hoặc chủ ngữ để hỏi về người, sự vật hoặc sự việc chưa biết. Khác với tiếng Anh (phải đảo từ để hỏi lên đầu câu), trong tiếng Trung trật tự từ của câu hỏi giữ nguyên như câu trần thuật: từ nghi vấn '什么' đặt ngay tại vị trí của thành phần cần hỏi.",
    "formation": "Chủ ngữ + Động từ + 什么？ (hoặc đứng độc lập làm đại từ)",
    "examples": [
      {
        "translation": "Đây là cái gì?"
      }
    ]
  },
  "zh_什么N_2": {
    "title": "什么 + Danh từ (Loại... gì, nào)",
    "shortExplanation": "Đại từ nghi vấn '什么' đứng trực tiếp trước danh từ làm định ngữ để hỏi về chủng loại, tính chất hoặc tên gọi của sự vật; 'gì', 'nào'.",
    "longExplanation": "Khi '什么' (shénme) đứng trực tiếp trước một danh từ, nó đóng vai trò là định ngữ tu sức cho danh từ đó, dùng để hỏi về thể loại, tính chất hoặc tên gọi cụ thể của đồ vật, sự việc (ví dụ: 什么书 - sách gì, 什么名字 - tên gì). Giữa '什么' và danh từ thường kết hợp trực tiếp mà không cần thêm lượng từ.",
    "formation": "什么 + Danh từ",
    "examples": [
      {
        "translation": "Kia là sách gì vậy?"
      }
    ]
  },
  "zh_不是_3": {
    "title": "不是 (Không phải, không phải là)",
    "shortExplanation": "Dạng phủ định của động từ phán đoán '是'; dùng để phủ nhận bản chất, danh tính, quốc tịch hoặc nghề nghiệp; 'không phải là'.",
    "longExplanation": "'不是' (bù shì) được tạo thành từ phó từ phủ định '不' kết hợp với động từ phán đoán '是'. Mẫu câu này dùng để phủ định danh tính, quan hệ sở hữu, nghề nghiệp, quốc tịch hoặc đặc tính của chủ ngữ (A 不是 B = A không phải là B). Theo quy tắc biến điệu, '不' đọc thành thanh 2 (bú) khi đi trước từ mang thanh 4 như '是' (đọc là bú shì).",
    "formation": "Chủ ngữ + 不是 + Danh từ / Đoản ngữ danh từ",
    "examples": [
      {
        "translation": "Tôi không phải là người Mỹ."
      }
    ]
  },
  "zh_是_4": {
    "title": "是 (Là, thì là)",
    "shortExplanation": "Động từ phán đoán dùng để khẳng định bản chất, nghề nghiệp, thân phận hoặc mối quan hệ tương đương; 'là'.",
    "longExplanation": "'是' (shì) là động từ phán đoán (hệ từ) cơ bản trong tiếng Trung, dùng để liên kết chủ ngữ và vị ngữ danh từ trong câu khẳng định (A 是 B = A là B). Cấu trúc này dùng để chỉ ra ai đó làm nghề gì, là người nước nào, hoặc vật này là vật gì. Lưu ý rằng '是' thường không dùng để nối chủ ngữ với tính từ miêu tả đơn thuần (ví dụ: không nói '我是好', mà dùng '我很好').",
    "formation": "Chủ ngữ + 是 + Danh từ / Đoản ngữ danh từ",
    "examples": [
      {
        "translation": "Cô ấy là giáo viên."
      }
    ]
  },
  "zh_吗_5": {
    "title": "...吗？ (Trợ từ nghi vấn: ...phải không?, ...không?)",
    "shortExplanation": "Trợ từ ngữ khí đặt ở cuối câu trần thuật để biến câu đó thành câu hỏi Có/Không; '...không?', '...phải không?'.",
    "longExplanation": "'吗' (ma) là trợ từ ngữ khí nghi vấn (đọc thanh nhẹ), được đặt ở cuối một câu trần thuật hoàn chỉnh để tạo thành câu hỏi Có/Không (nghi vấn thị phi). Trật tự từ trong câu hoàn toàn không thay đổi so với câu khẳng định ban đầu. Người nghe có thể trả lời bằng cách nhắc lại động từ/tính từ trong câu để khẳng định hoặc dùng '不/没' + động từ để phủ định.",
    "formation": "Câu trần thuật + 吗？",
    "examples": [
      {
        "translation": "Bạn là giáo viên phải không?"
      }
    ]
  },
  "zh_谁_6": {
    "title": "谁 (Đại từ nghi vấn: Ai)",
    "shortExplanation": "Đại từ nghi vấn dùng để hỏi về người; tương đương với 'ai' trong tiếng Việt.",
    "longExplanation": "'谁' (shéi hoặc shuí) là đại từ nghi vấn chỉ người, có thể làm chủ ngữ, tân ngữ hoặc định ngữ trong câu. Khi hỏi, từ '谁' được đặt ngay tại vị trí của danh từ chỉ người cần hỏi mà không cần thay đổi trật tự từ của câu. Khi làm định ngữ biểu thị quan hệ sở hữu, có thể kết hợp với '的' (ví dụ: 这是谁的书？ - Đây là sách của ai?).",
    "formation": "Chủ ngữ + 是 + 谁？ hoặc 谁 + Vị ngữ？",
    "examples": [
      {
        "translation": "Cô ấy là ai?"
      }
    ]
  },
  "zh_哪MN_7": {
    "title": "哪 + Lượng từ + Danh từ (Cái... nào, người... nào)",
    "shortExplanation": "Đại từ nghi vấn '哪' kết hợp với lượng từ và danh từ để hỏi lựa chọn cụ thể trong một phạm vi xác định; 'nào', 'cái nào'.",
    "longExplanation": "Cấu trúc '哪 + Lượng từ + Danh từ' (nǎ + lượng từ + danh từ) dùng để yêu cầu người nghe chỉ rõ một đối tượng cụ thể trong số hai hoặc nhiều đối tượng đã biết. Trong tiếng Trung, khi dùng '哪' để hạn định một danh từ đếm được, bắt buộc phải có lượng từ tương ứng đi kèm ở giữa (ví dụ: 哪个人 - người nào, 哪本书 - cuốn sách nào).",
    "formation": "哪 + Lượng từ + Danh từ",
    "examples": [
      {
        "translation": "Người nào vậy?"
      }
    ]
  },
  "zh_的_8": {
    "title": "(的) (Trợ từ kết cấu biểu thị sở hữu: Của)",
    "shortExplanation": "Trợ từ kết cấu biểu thị mối quan hệ sở hữu hoặc bổ nghĩa; có thể lược bỏ khi nói về quan hệ thân mật, gia đình hoặc tổ chức gắn bó.",
    "longExplanation": "'的' (de) là trợ từ kết cấu quan trọng bậc nhất trong tiếng Trung, đặt sau định ngữ để chỉ quyền sở hữu (Định ngữ + 的 + Trung tâm ngữ), tương đương với 'của' trong tiếng Việt. Khi định ngữ là đại từ nhân xưng và trung tâm ngữ chỉ quan hệ họ hàng ruột thịt, người thân thiết, thầy cô hoặc đơn vị, trường lớp thì '的' thường có thể được lược bỏ một cách tự nhiên (ví dụ: 我(的)妈妈 - mẹ tôi, 我(的)老师 - thầy/cô tôi).",
    "formation": "Định ngữ (Đại từ / Danh từ) + (的) + Danh từ trung tâm",
    "examples": [
      {
        "translation": "Cô ấy là giáo viên của tôi."
      }
    ]
  },
  "zh_N呢_9": {
    "title": "Danh từ + 呢？ (Thế còn... thì sao?)",
    "shortExplanation": "Trợ từ ngữ khí '呢' đi sau danh từ hoặc đại từ để hỏi lướt tiếp nối mạch hội thoại; 'thế còn... thì sao?'.",
    "longExplanation": "'Danh từ / Đại từ + 呢？' (ne) là mẫu câu hỏi tỉnh lược (nghi vấn phản vấn) rất phổ biến trong khẩu ngữ tiếng Trung. Dựa vào ngữ cảnh đã được thiết lập trước đó, người nói dùng '...呢？' để hỏi han đối tượng mới cùng một vấn đề mà không cần lặp lại toàn bộ câu hỏi (ví dụ: 我是中国人，你呢？ - Tôi là người Trung Quốc, thế còn bạn thì sao?). Ngoài ra, khi đứng độc lập không có tiền đề, cấu trúc này còn dùng để hỏi nơi chốn hoặc tung tích của người, vật (ví dụ: 我的书呢？ - Sách của tôi đâu rồi?).",
    "formation": "Danh từ / Đại từ + 呢？",
    "examples": [
      {
        "translation": "Tôi là người Trung Quốc, thế còn bạn thì sao?"
      }
    ]
  },
  "zh_几MN_10": {
    "title": "几 + Lượng từ + Danh từ (Mấy... [hỏi số lượng dưới 10])",
    "shortExplanation": "Đại từ nghi vấn '几' dùng để hỏi số lượng nhỏ (thường ước lượng dưới 10); bắt buộc đi kèm lượng từ; 'mấy'.",
    "longExplanation": "'几' (jǐ) là đại từ nghi vấn dùng để hỏi số lượng người hoặc vật khi dự đoán số lượng tương đối ít (thông thường là dưới 10), tương đương với 'mấy' trong tiếng Việt (đối lập với '多少' dùng để hỏi mọi số lượng và không bắt buộc có lượng từ). Theo quy tắc ngữ pháp tiếng Trung, giữa '几' và danh từ đếm được luôn luôn phải có lượng từ tương ứng (cấu trúc: 几 + Lượng từ + Danh từ).",
    "formation": "几 + Lượng từ + Danh từ",
    "examples": [
      {
        "translation": "Bạn có mấy giáo viên dạy tiếng Trung?"
      }
    ]
  },
  "zh_一九十九_11": {
    "title": "一～九十九 (Số đếm từ 1 đến 99)",
    "shortExplanation": "Quy tắc cấu tạo số đếm từ 1 đến 99 trong tiếng Trung theo hệ thập phân cơ bản.",
    "longExplanation": "Cách cấu tạo số đếm từ 1 đến 99 trong tiếng Trung tuân theo quy tắc số học thập phân rất rõ ràng và mạch lạc:\n• 1 đến 10: 一 (yī), 二 (èr), 三 (sān), 四 (sì), 五 (wǔ), 六 (liù), 七 (qī), 八 (bā), 九 (jiǔ), 十 (shí).\n• 11 đến 19: '十' ghép với số hàng đơn vị (Ví dụ: 十一 = 11, 十五 = 15).\n• 20 đến 90 (hàng chục tròn): Số hàng chục ghép với '十' (Ví dụ: 二十 = 20, 三十 = 30, 九十 = 90).\n• 21 đến 99: [Số hàng chục] + 十 + [Số hàng đơn vị] (Ví dụ: 九十一 = 91).",
    "formation": "Số hàng chục (2-9) + 十 + Số hàng đơn vị (1-9)",
    "examples": [
      {
        "translation": "Chín mươi mốt (91)."
      }
    ]
  },
  "zh_AGE了_12": {
    "title": "Số tuổi + 了 (Đã... tuổi rồi [biến đổi trạng thái])",
    "shortExplanation": "Trợ từ ngữ khí '了' đứng ở cuối câu chỉ tuổi tác để diễn tả sự thay đổi hoặc bước sang mốc tuổi mới; 'đã... tuổi rồi'.",
    "longExplanation": "Trong câu biểu đạt tuổi tác, trợ từ ngữ khí '了' (le) đặt ở cuối câu để biểu thị sự thay đổi trạng thái hoặc đạt đến một cột mốc tuổi tác mới, tương đương với 'đã... tuổi rồi' trong tiếng Việt. Nó nhấn mạnh rằng người nói vừa bước sang độ tuổi đó hoặc tuổi tác đã tăng thêm theo thời gian (ví dụ: 我40岁了 = Tôi đã 40 tuổi rồi).",
    "formation": "Chủ ngữ + Số từ + 岁 + 了",
    "examples": [
      {
        "translation": "Tôi đã 40 tuổi rồi."
      }
    ]
  },
  "zh_多大_13": {
    "title": "多大 (Hỏi tuổi: Bao nhiêu tuổi)",
    "shortExplanation": "Cụm từ nghi vấn dùng để hỏi tuổi tác của đối phương hoặc người khác; 'bao nhiêu tuổi', 'mấy tuổi'.",
    "longExplanation": "'多大' (duō dà) được tạo bởi phó từ '多' (biểu thị mức độ) kết hợp với tính từ '大' (lớn), dùng để hỏi tuổi của người bằng vai phải lứa, thanh thiếu niên hoặc người lớn nói chung. Trong câu hỏi tuổi, người ta thường thêm trợ từ '了' ở cuối câu ('……多大了？') để thể hiện tuổi đã đạt đến mức nào. (Lưu ý: Đối với trẻ em dưới 10 tuổi thường dùng '几岁', còn đối với người lớn tuổi/người già thì dùng '多大年纪' hoặc '多大岁数' để thể hiện sự kính trọng).",
    "formation": "Chủ ngữ + 多大 (了)？",
    "examples": [
      {
        "translation": "Con gái của bạn bao nhiêu tuổi rồi?"
      }
    ]
  },
  "zh_会V_14": {
    "title": "会 + Động từ (Động từ năng nguyện: Biết làm gì [qua học tập, rèn luyện])",
    "shortExplanation": "Động từ năng nguyện '会' biểu thị kỹ năng, khả năng có được thông qua quá trình học hỏi, tập luyện; 'biết làm gì'.",
    "longExplanation": "'会' (huì) là động từ năng nguyện (trợ động từ) đứng trước động từ chính, dùng để diễn tả năng lực hoặc kỹ năng mà một người nắm vững thông qua quá trình học tập hoặc rèn luyện (ví dụ: 会写 - biết viết, 会游泳 - biết bơi, 会说汉语 - biết nói tiếng Trung). Dạng phủ định của cấu trúc này là '不会 + Động từ' (không biết làm gì).",
    "formation": "Chủ ngữ + 会 + Động từ",
    "examples": [
      {
        "translation": "Tôi biết viết."
      }
    ]
  },
  "zh_很_15": {
    "title": "很 + Tính từ (Phó từ mức độ: Rất / Liên kết vị ngữ tính từ)",
    "shortExplanation": "Phó từ mức độ đứng trước tính từ để biểu thị mức độ cao ('rất') hoặc làm từ đệm liên kết trong câu vị ngữ tính từ.",
    "longExplanation": "'很' (hěn) là phó từ chỉ mức độ phổ biến nhất trong tiếng Trung, thường đứng trước tính từ để tạo thành vị ngữ tính từ (Chủ ngữ + 很 + Tính từ). Ngoài nghĩa biểu thị mức độ cao ('rất'), trong câu khẳng định đơn giản '很' thường đóng vai trò như một hư từ liên kết ngữ pháp để câu không bị cộc lốc hoặc mang sắc thái so sánh ngầm. Ví dụ: '我很好' có thể hiểu là 'Tôi rất khỏe' hoặc đơn giản là 'Tôi khỏe'.",
    "formation": "Chủ ngữ + 很 + Tính từ",
    "examples": [
      {
        "translation": "Tôi rất khỏe (Tôi khỏe)."
      }
    ]
  },
  "zh_怎么V_16": {
    "title": "怎么 + Động từ (cách làm gì / làm thế nào để...)",
    "shortExplanation": "Dùng để hỏi về cách thức, phương pháp thực hiện hành động; mang nghĩa 'làm thế nào', 'ra sao'.",
    "longExplanation": "Đại từ nghi vấn '怎么' (zěnme) khi đứng trước động từ được dùng để hỏi về cách thức hoặc phương pháp tiến hành một hành động, tương đương với 'làm sao', 'thế nào', 'làm như thế nào' trong tiếng Việt.",
    "formation": "怎么 + Động từ",
    "examples": [
      {
        "translation": "Cái này đọc như thế nào?"
      }
    ]
  },
  "zh_月号日星期_17": {
    "title": "...月...号/日 星期... (Cách diễn đạt ngày tháng thứ trong tiếng Trung)",
    "shortExplanation": "Thứ tự biểu đạt thời gian trong tiếng Trung từ lớn đến bé: Tháng → Ngày (号/日) → Thứ (星期).",
    "longExplanation": "Trong tiếng Trung, thứ tự biểu thị ngày tháng tuân theo quy tắc từ đơn vị lớn đến đơn vị nhỏ: 'Năm (年) → Tháng (月) → Ngày (号/日) → Thứ (星期)'. Trong khẩu ngữ hàng ngày thường dùng '号' (hào), còn trong văn viết hoặc văn phong trang trọng thường dùng '日' (rì).",
    "formation": "[Số] + 月 + [Số] + 号/日 + 星期 + [Số/天]",
    "examples": [
      {
        "translation": "Thứ Năm, ngày 2 tháng 9."
      }
    ]
  },
  "zh_去PLACEV_19": {
    "title": "去 + Địa điểm + Động từ (Đi đến nơi nào để làm gì)",
    "shortExplanation": "Câu liên động biểu thị mục đích: Đi đến một địa điểm nào đó để thực hiện một hành động.",
    "longExplanation": "Đây là cấu trúc câu liên động trong tiếng Trung, dùng để diễn đạt việc đi tới một địa điểm xác định nhằm mục đích thực hiện hành động phía sau. Trong đó, '去' (đi) kết hợp với từ chỉ địa điểm/nơi chốn, theo sau là động từ chỉ mục đích của chuyến đi.",
    "formation": "Chủ ngữ + 去 + Địa điểm + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Tôi đi đến trường để học."
      }
    ]
  },
  "zh_想_20": {
    "title": "想 + Động từ (Muốn / có ý định làm gì)",
    "shortExplanation": "Động từ năng nguyện biểu thị mong muốn, nguyện vọng hoặc dự định làm một việc gì đó; 'muốn', 'định'.",
    "longExplanation": "Động từ năng nguyện '想' (xiǎng) đứng trước động từ khác để biểu thị nguyện vọng, mong muốn hoặc ý định chủ quan của người nói, tương đương với 'muốn', 'thích' hoặc 'dự định' trong tiếng Việt. Khi phủ định dùng '不想' (không muốn). Ngoài ra '想' cũng có thể làm động từ độc lập mang nghĩa 'nhớ' hoặc 'suy nghĩ'.",
    "formation": "Chủ ngữ + 想 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Tôi muốn đọc sách."
      }
    ]
  },
  "zh_多少N_21": {
    "title": "多少 (+ Lượng từ) + Danh từ (Bao nhiêu...)",
    "shortExplanation": "Đại từ nghi vấn dùng để hỏi số lượng (thường dùng cho số lượng lớn hơn 10 hoặc số lượng chưa rõ); 'bao nhiêu'.",
    "longExplanation": "Đại từ nghi vấn '多少' (duōshao) dùng để hỏi về số lượng. Khác với '几' (thường dùng hỏi số lượng ước lượng dưới 10 và bắt buộc phải có lượng từ kèm theo), '多少' thường dùng cho số lượng lớn hơn 10 hoặc số lượng không xác định, và lượng từ theo sau có thể có hoặc lược bỏ.",
    "formation": "多少 (+ Lượng từ) + Danh từ",
    "examples": [
      {
        "translation": "Bạn có bao nhiêu giáo viên tiếng Trung?"
      }
    ]
  },
  "zh_个_22": {
    "title": "个 (Lượng từ đa năng thông dụng nhất)",
    "shortExplanation": "Lượng từ vạn năng phổ biến nhất trong tiếng Trung, dùng cho người hoặc nhiều loại đồ vật không có lượng từ chuyên biệt.",
    "longExplanation": "Lượng từ '个' (gè) là lượng từ cơ bản, thông dụng và đa năng nhất trong tiếng Trung hiện đại. Nó được dùng để đếm người (như học sinh, bạn bè), các đồ vật cụ thể không có lượng từ riêng hoặc các khái niệm trừu tượng (như vấn đề, ý kiến). Thường đứng giữa số từ (hoặc đại từ chỉ định '这/那') và danh từ.",
    "formation": "Số từ / 这 / 那 + 个 + Danh từ",
    "examples": [
      {
        "translation": "Năm người học sinh."
      }
    ]
  },
  "zh_口_23": {
    "title": "口 (Lượng từ chỉ số nhân khẩu trong gia đình)",
    "shortExplanation": "Lượng từ chuyên dùng để đếm số thành viên, nhân khẩu trong gia đình; 'người', 'nhân khẩu'.",
    "longExplanation": "Lượng từ '口' (kǒu) trong giao tiếp hàng ngày chủ yếu được dùng làm lượng từ để chỉ số lượng nhân khẩu trong một gia đình (thường kết hợp với '人'). Ngoài ra, '口' còn có thể dùng làm lượng từ cho một số đồ vật có miệng như giếng nước, chuông, nồi hoặc ngụm (uống một ngụm nước).",
    "formation": "Số từ + 口 + 人 (hoặc Danh từ phù hợp)",
    "examples": [
      {
        "translation": "Gia đình tôi có năm người."
      }
    ]
  },
  "zh_元块_24": {
    "title": "元 / 块 (Đơn vị tiền tệ đồng Nhân dân tệ)",
    "shortExplanation": "Đơn vị tiền tệ chính của Trung Quốc; '元' dùng trong văn viết/trang trọng, '块' dùng phổ biến trong khẩu ngữ.",
    "longExplanation": "Trong hệ thống tiền tệ Trung Quốc, đơn vị cơ bản là đồng (tệ). '元' (yuán) là đơn vị chính thức thường dùng trong văn viết, báo giá bằng văn bản hoặc giao dịch tài chính. Trong khi đó, '块' (kuài) là cách gọi quen thuộc, tự nhiên trong khẩu ngữ giao tiếp hàng ngày.",
    "formation": "Số từ + 元 / 块",
    "examples": [
      {
        "translation": "Một tệ (đồng)."
      }
    ]
  },
  "zh_在_25": {
    "title": "在 (Ở / tồn tại ở một địa điểm, vị trí)",
    "shortExplanation": "Động từ biểu thị sự tồn tại hoặc vị trí của người hoặc vật ở một nơi nào đó; 'ở', 'tại'.",
    "longExplanation": "Động từ '在' (zài) dùng để chỉ sự hiện diện, vị trí không gian của người hoặc sự vật tại một địa điểm hoặc phương vị xác định. Khi phủ định dùng '不在' (không ở). Cấu trúc thường là 'Chủ ngữ + 在 + Nơi chốn / Từ chỉ phương vị'.",
    "formation": "Chủ ngữ + 在 + Địa điểm / Từ chỉ vị trí",
    "examples": [
      {
        "translation": "Anh ấy ở dưới ghế."
      }
    ]
  },
  "zh_哪儿_26": {
    "title": "哪儿 / 哪里 (Ở đâu / đại từ nghi vấn chỉ nơi chốn)",
    "shortExplanation": "Đại từ nghi vấn dùng để hỏi về địa điểm, nơi chốn; 'ở đâu', 'chỗ nào'.",
    "longExplanation": "Đại từ nghi vấn '哪儿' (nǎr, phổ biến ở miền Bắc có âm uốn lưỡi) hoặc '哪里' (nǎlǐ, phổ biến ở miền Nam) dùng để hỏi về vị trí, địa điểm hoặc phương hướng. Khi kết hợp với '在' tạo thành câu hỏi vị trí '在哪儿' mang nghĩa 'ở đâu', 'ở chỗ nào'.",
    "formation": "Chủ ngữ + 在 + 哪儿？",
    "examples": [
      {
        "translation": "Cái cốc của tôi ở đâu?"
      }
    ]
  },
  "zh_在PLACEV_27": {
    "title": "在 + Địa điểm + Động từ (Làm gì ở đâu)",
    "shortExplanation": "Giới từ '在' kết hợp với danh từ nơi chốn làm trạng ngữ chỉ địa điểm diễn ra hành động: Ở đâu làm gì.",
    "longExplanation": "Trong tiếng Trung, trạng ngữ chỉ địa điểm đứng trước động từ (khác với tiếng Việt thường đứng sau động từ). Cấu trúc '在 + Địa điểm + Động từ' dùng để biểu thị nơi chốn xảy ra hành động, mang nghĩa là 'ở đâu đó làm việc gì'.",
    "formation": "Chủ ngữ + 在 + Địa điểm + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Tôi uống trà ở nhà bạn."
      }
    ]
  },
  "zh_Q呢_28": {
    "title": "Câu hỏi + 呢 (Trợ từ ngữ khí cuối câu nghi vấn)",
    "shortExplanation": "Trợ từ ngữ khí đặt ở cuối câu hỏi để làm dịu ngữ khí, tăng tính thân mật, uyển chuyển hoặc biểu thị sự băn khoăn, thắc mắc.",
    "longExplanation": "Khi đặt trợ từ ngữ khí '呢' (ne) ở cuối một câu hỏi đã có sẵn đại từ nghi vấn (như 谁, 什么, 哪儿, 怎么) hoặc câu hỏi chính phản, nó giúp làm cho ngữ điệu của câu hỏi trở nên nhẹ nhàng, tự nhiên, thân mật hơn, đồng thời nhấn mạnh tâm trạng băn khoăn, tò mò hoặc muốn xác nhận thông tin của người nói.",
    "formation": "Câu hỏi (có đại từ nghi vấn) + 呢？",
    "examples": [
      {
        "translation": "Anh ấy đang ở đâu thế nhỉ?"
      }
    ]
  },
  "zh_N呢_29": {
    "title": "Danh từ + 呢？ (Hỏi vị trí của đối tượng: ...đâu rồi?)",
    "shortExplanation": "Cấu trúc câu hỏi rút gọn hỏi về tung tích, vị trí của người hoặc đồ vật; '...đâu rồi?', '...ở đâu?'.",
    "longExplanation": "Khi 'Danh từ + 呢？' đứng một mình mà không có ngữ cảnh đối chiếu trước đó (như 'còn bạn thì sao?'), mẫu câu này dùng để hỏi về nơi chốn, vị trí hiện tại hoặc tung tích của đối tượng được nhắc đến. Nghĩa tương đương với '[Danh từ] 在哪儿？' ([Danh từ] ở đâu rồi?).",
    "formation": "Danh từ / Đại từ + 呢？",
    "examples": [
      {
        "translation": "Cái cốc của tôi đâu rồi?"
      }
    ]
  },
  "zh_PLACE有N_30": {
    "title": "Địa điểm + 有 + Danh từ (Ở đâu có cái gì / Câu tồn hiện)",
    "shortExplanation": "Câu tồn hiện biểu thị sự tồn tại: Tại một địa điểm nào đó có người hoặc vật gì đó.",
    "longExplanation": "Mẫu câu này thuộc câu tồn hiện trong tiếng Trung, dùng để diễn đạt sự tồn tại của người hoặc sự vật tại một địa điểm hoặc vị trí cụ thể. Cấu trúc là 'Từ chỉ nơi chốn/vị trí + 有 + Danh từ' (thường đi kèm số lượng từ), tương đương với 'Ở... có...' trong tiếng Việt.",
    "formation": "Địa điểm / Vị trí + 有 + (Số từ + Lượng từ) + Danh từ",
    "examples": [
      {
        "translation": "Dưới ghế có một chú chó con."
      }
    ]
  },
  "zh_PLACE没有N_31": {
    "title": "Địa điểm + 没有 + Danh từ (Ở đâu không có cái gì)",
    "shortExplanation": "Dạng phủ định của câu tồn hiện biểu thị sự không tồn tại của người hoặc sự vật ở một địa điểm nào đó; 'ở... không có...'.",
    "longExplanation": "Đây là dạng phủ định của câu tồn hiện 'Địa điểm + 有 + Danh từ'. Để phủ định sự tồn tại, ta dùng '没有' (hoặc rút gọn là '没') thay cho '有', mang nghĩa là tại địa điểm đó không có người hay sự vật nào. Trong câu phủ định tồn hiện, trước danh từ thường không dùng số từ hoặc lượng từ.",
    "formation": "Địa điểm / Vị trí + 没有 + Danh từ",
    "examples": [
      {
        "translation": "Ở đây không có ai cả."
      }
    ]
  },
  "zh_和_32": {
    "title": "和 (Liên từ: Và, cùng)",
    "shortExplanation": "Liên từ dùng để nối hai hoặc nhiều danh từ, đại từ hoặc cụm danh từ có quan hệ đẳng lập; 'và', 'cùng'.",
    "longExplanation": "'和' (hé) là liên từ cơ bản trong tiếng Trung dùng để kết nối các từ hoặc cụm từ có vị trí ngữ pháp ngang hàng (quan hệ đẳng lập), chủ yếu là giữa danh từ, đại từ hoặc đoản ngữ danh từ (ví dụ: 爸爸、妈妈和我 - Bố, mẹ và tôi). Cần lưu ý rằng '和' trong tiếng Trung không dùng để nối hai mệnh đề độc lập hoặc hai câu hoàn chỉnh như từ 'and' trong tiếng Anh hay 'và' trong tiếng Việt.",
    "formation": "Danh từ 1 / Đại từ 1 + 和 + Danh từ 2 / Đại từ 2",
    "examples": [
      {
        "translation": "Bố, mẹ và tôi."
      }
    ]
  },
  "zh_能_33": {
    "title": "能 (Động từ năng nguyện: Có thể [điều kiện, năng lực, sự cho phép])",
    "shortExplanation": "Động từ năng nguyện biểu thị năng lực vốn có, điều kiện khách quan cho phép hoặc lời thỉnh cầu lịch sự; 'có thể'.",
    "longExplanation": "'能' (néng) là động từ năng nguyện (trợ động từ) đứng trước động từ chính, dùng để biểu thị: 1) Khả năng/năng lực của bản thân đạt đến một mức độ nào đó; 2) Hoàn cảnh khách quan có đủ điều kiện để thực hiện hành động; 3) Sự cho phép hoặc hỏi ý kiến lịch sự trong câu nghi vấn ('我能...吗？' - Tôi có thể... được không?). Thể phủ định là '不能' (bù néng - không thể, không được phép).",
    "formation": "Chủ ngữ + 能 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Tôi có thể ngồi ở đây được không?"
      }
    ]
  },
  "zh_请V_34": {
    "title": "请 + Động từ (Mời, xin vui lòng... [câu cầu khiến lịch sự])",
    "shortExplanation": "Đặt trước động từ để biểu thị lời mời, thỉnh cầu hoặc đề nghị một cách lịch sự, nhã nhặn; 'mời...', 'xin mời...'.",
    "longExplanation": "'请' (qǐng) đứng trước động từ để tạo thành câu cầu khiến lịch sự, tương đương với 'mời', 'xin mời' hoặc 'làm ơn' trong tiếng Việt. Khi giao tiếp hàng ngày, việc thêm '请' vào trước hành động giúp câu nói trở nên tôn trọng, khách khí và nhã nhặn hơn (ví dụ: 请进 - Mời vào, 请坐 - Mời ngồi, 请喝茶 - Mời uống trà).",
    "formation": "(Chủ ngữ +) 请 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Xin mời ngồi."
      }
    ]
  },
  "zh_点分_35": {
    "title": "Số từ + 点 + (Số từ + 分) (Cách diễn đạt giờ phút trong tiếng Trung)",
    "shortExplanation": "Cách biểu đạt thời gian trong tiếng Trung: '点' biểu thị giờ và '分' biểu thị phút.",
    "longExplanation": "Trong tiếng Trung, để đọc giờ và phút cụ thể, ta dùng công thức: 'Số từ + 点 (diǎn: giờ) + Số từ + 分 (fēn: phút)'. Khi số phút lớn hơn 10 thì có thể lược bỏ từ '分' trong khẩu ngữ (ví dụ: 十一点十 - 11 giờ 10). Đối với số phút từ 1 đến 9, cần thêm từ '零' (líng: linh/lẻ) trước số phút và giữ nguyên '分' (ví dụ: 八点零五分 - 8 giờ 5 phút). Đối với 2 giờ, dùng '两点' chứ không dùng '二点'.",
    "formation": "Số từ + 点 (+ Số từ + 分)",
    "examples": [
      {
        "translation": "11 giờ 10 phút."
      }
    ]
  },
  "zh_上午下午_36": {
    "title": "上午 / 下午 (Buổi sáng / Buổi chiều trong diễn đạt thời gian)",
    "shortExplanation": "Từ chỉ buổi trong ngày đặt trước giờ cụ thể để phân biệt sáng (上午) và chiều (下午).",
    "longExplanation": "Trong tiếng Trung, để làm rõ thời điểm trong ngày (buổi sáng hay buổi chiều), các từ chỉ buổi như '上午' (shàngwǔ: buổi sáng, từ khoảng 8-9h đến 12h trưa) hoặc '下午' (xiàwǔ: buổi chiều, từ khoảng 12h trưa đến 18h tối) được đặt trước giờ cụ thể. Quy tắc ngữ pháp tiếng Trung luôn đi từ đơn vị thời gian lớn đến đơn vị nhỏ, do đó thứ tự luôn là: 'Buổi (上午/下午) + Giờ cụ thể (点/分)'.",
    "formation": "上午 / 下午 + Số từ + 点 (+ Số từ + 分)",
    "examples": [
      {
        "translation": "3 giờ 10 phút chiều."
      }
    ]
  },
  "zh_STIMEV_37": {
    "title": "Chủ ngữ + Thời gian + Động từ (Trạng ngữ thời gian đứng sau chủ ngữ)",
    "shortExplanation": "Từ chỉ thời gian đứng sau chủ ngữ và trước động từ để làm trạng ngữ biểu thị thời điểm hành động xảy ra.",
    "longExplanation": "Trong ngữ pháp tiếng Trung, quy tắc cốt lõi về thời gian là: thời gian xảy ra hành động bắt buộc phải đứng TRƯỚC động từ, không bao giờ đặt ở cuối câu như tiếng Anh hay tiếng Việt. Khi cấu trúc là 'Chủ ngữ + Thời gian + Động từ', từ chỉ thời gian đóng vai trò là trạng ngữ chỉ thời gian tu sức cho vị ngữ phía sau (ví dụ: 妈妈六点做饭 - Mẹ nấu cơm lúc 6 giờ).",
    "formation": "Chủ ngữ + Từ chỉ thời gian + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Mẹ nấu cơm lúc sáu giờ."
      }
    ]
  },
  "zh_TIMESV_38": {
    "title": "Thời gian + Chủ ngữ + Động từ (Trạng ngữ thời gian đứng đầu câu)",
    "shortExplanation": "Từ chỉ thời gian được đặt ở đầu câu trước chủ ngữ để làm trạng ngữ chỉ thời gian hoặc nhấn mạnh mốc thời gian.",
    "longExplanation": "Bên cạnh vị trí sau chủ ngữ, từ chỉ thời gian trong tiếng Trung còn có thể đảo lên vị trí đầu câu, đứng trước cả chủ ngữ ('Thời gian + Chủ ngữ + Động từ'). Cách sắp xếp này thường dùng để nhấn mạnh thời điểm diễn ra sự việc, thiết lập bối cảnh thời gian chung cho toàn câu hoặc tạo sự tương phản về thời gian (ví dụ: 七点我吃饭 - Bảy giờ tôi ăn cơm). Dù đứng trước hay sau chủ ngữ, thời gian luôn tuyệt đối đứng trước động từ.",
    "formation": "Từ chỉ thời gian + Chủ ngữ + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Bảy giờ tôi ăn cơm."
      }
    ]
  },
  "zh_TIME前_39": {
    "title": "Thời điểm + 前 (Trước một mốc thời điểm cụ thể)",
    "shortExplanation": "Đặt sau một mốc thời điểm cụ thể để chỉ thời gian trước thời điểm đó hoặc thời hạn chót; 'trước...', 'trước khi...'.",
    "longExplanation": "'前' (qián) là từ chỉ phương vị/thời gian. Khi đặt ngay sau một mốc thời gian cụ thể (như ngày, thứ, tháng, giờ cụ thể), cấu trúc 'Thời điểm + 前' biểu thị hành động cần diễn ra trước hoặc chậm nhất là đến mốc thời gian đó (ví dụ: 星期五前 - trước thứ Sáu, 五点前 - trước 5 giờ). Trong câu hoàn chỉnh, cụm này thường làm trạng ngữ thời gian đứng trước động từ.",
    "formation": "Mốc thời điểm cụ thể + 前",
    "examples": [
      {
        "translation": "Trước thứ Sáu."
      }
    ]
  },
  "zh_DURATION前_40": {
    "title": "Khoảng thời gian + 前 (... trước, cách đây...)",
    "shortExplanation": "Đặt sau một lượng từ chỉ khoảng thời gian để biểu thị khoảng thời gian đã qua tính từ thời điểm hiện tại; 'cách đây...', '... trước'.",
    "longExplanation": "Khác với mốc thời điểm cụ thể, khi '前' (qián) kết hợp sau một lượng thời gian (khoảng thời gian / thời lượng), cấu trúc 'Khoảng thời gian + 前' dùng để chỉ một sự việc đã xảy ra cách thời điểm nói bao lâu trong quá khứ, tương đương với '... trước' hoặc 'cách đây...' trong tiếng Việt (ví dụ: 一个星期前 - cách đây một tuần / một tuần trước, 三天前 - ba ngày trước).",
    "formation": "Khoảng thời gian (Số từ + Lượng từ thời gian) + 前",
    "examples": [
      {
        "translation": "Một tuần trước (cách đây một tuần)."
      }
    ]
  },
  "zh_N怎么样_41": {
    "title": "Danh từ / Chủ ngữ + 怎么样？ (Như thế nào, ra sao [hỏi tình trạng, tính chất])",
    "shortExplanation": "Đại từ nghi vấn '怎么样' đứng sau danh từ/chủ ngữ dùng để hỏi về tình trạng, tính chất, mức độ của người hoặc sự vật; '...thế nào?', '...ra sao?'.",
    "longExplanation": "'怎么样' (zěnmeyàng) là đại từ nghi vấn phổ biến dùng để hỏi về tình hình, trạng thái, tính chất hoặc sức khỏe của một đối tượng (Chủ ngữ + 怎么样？). Người trả lời thường dùng các tính từ hoặc cụm tính từ (kèm phó từ chỉ mức độ như 很, 不太, 非常) để miêu tả (ví dụ: 你的汉语怎么样？ - Tiếng Trung của bạn thế nào? -> 我的汉语很好 - Tiếng Trung của tôi rất tốt).",
    "formation": "Danh từ / Đại từ + 怎么样？",
    "examples": [
      {
        "translation": "Tiếng Trung của bạn thế nào?"
      }
    ]
  },
  "zh_的_42": {
    "title": "(的) (Lược bỏ 的 trong quan hệ sở hữu thân thuộc, gắn bó)",
    "shortExplanation": "Trợ từ kết cấu biểu thị sở hữu '的' có thể được lược bỏ một cách tự nhiên khi nói về người thân, bộ phận cơ thể hoặc đơn vị sở thuộc.",
    "longExplanation": "Trong tiếng Trung, trợ từ kết cấu '的' (de) dùng để nối định ngữ và trung tâm ngữ biểu thị quyền sở hữu (Định ngữ + 的 + Danh từ). Tuy nhiên, khi mối quan hệ giữa định ngữ và danh từ trung tâm là cực kỳ gắn bó, mật thiết—chẳng hạn như bộ phận cơ thể (我身体 - cơ thể/sức khỏe tôi), quan hệ gia đình ruột thịt (我妈妈 - mẹ tôi) hoặc trường lớp, công ty (我们学校 - trường chúng tôi)—thì '的' thường được lược bỏ trong khẩu ngữ để câu nói thêm tự nhiên, trôi chảy.",
    "formation": "Đại từ / Danh từ định ngữ + (的) + Danh từ (bộ phận cơ thể / người thân / đơn vị)",
    "examples": [
      {
        "translation": "Sức khỏe của tôi không được tốt lắm."
      }
    ]
  },
  "zh_太A了_43": {
    "title": "太 + Tính từ + (了) (Quá... rồi, rất... [mức độ cao/cảm thán])",
    "shortExplanation": "Phó từ mức độ '太' đứng trước tính từ, thường phối hợp với '了' ở cuối câu, biểu thị mức độ quá mức hoặc ngữ khí cảm thán; 'quá...', 'rất... rồi'.",
    "longExplanation": "Cấu trúc '太 + Tính từ + (了)' (tài... le) có hai sắc thái biểu đạt chính: 1) Biểu thị mức độ vượt quá giới hạn mong muốn hoặc chịu đựng, mang ý chê bai, phàn nàn ('quá...', ví dụ: 太贵了 - đắt quá, 天气太冷了 - thời tiết lạnh quá); 2) Biểu thị mức độ cực kỳ cao mang ngữ khí khen ngợi, cảm thán phấn khởi ('rất...', 'quá chừng', ví dụ: 太好了 - tốt quá rồi!). Trong câu trần thuật khẳng định, chữ '了' thường đi kèm ở cuối câu để hoàn chỉnh ngữ khí.",
    "formation": "Chủ ngữ + 太 + Tính từ + (了)",
    "examples": [
      {
        "translation": "Thời tiết lạnh quá (rồi)."
      }
    ]
  },
  "zh_不太A_44": {
    "title": "不太 + Tính từ (Không... lắm [phủ định mức độ nhẹ nhàng, uyển chuyển])",
    "shortExplanation": "Phó từ phủ định '不' kết hợp với phó từ mức độ '太' đứng trước tính từ, dùng để giảm nhẹ mức độ; 'không... lắm', 'không quá...'.",
    "longExplanation": "'不太 + Tính từ' (bù tài) là cấu trúc phủ định mức độ mang tính chất uyển chuyển, chừng mực trong tiếng Trung. Thay vì dùng '不好' (không tốt) tạo cảm giác thẳng thừng và tuyệt đối, việc dùng '不太好' (không tốt lắm) giúp câu nói trở nên nhẹ nhàng, tế nhị và khiêm tốn hơn. Chú ý: khác với câu khẳng định '太...了', trong câu phủ định '不太 + Tính từ' tuyệt đối KHÔNG dùng '了' ở cuối câu.",
    "formation": "Chủ ngữ + 不太 + Tính từ",
    "examples": [
      {
        "translation": "Sức khỏe của tôi không được tốt lắm."
      }
    ]
  },
  "zh_会V_45": {
    "title": "会 + Động từ (Sẽ... [Động từ năng nguyện biểu thị khả năng, phán đoán tương lai])",
    "shortExplanation": "Động từ năng nguyện đứng trước động từ để biểu thị khả năng một việc sẽ xảy ra trong tương lai theo phán đoán; 'sẽ'.",
    "longExplanation": "'会' (huì) là động từ năng nguyện đa năng. Ngoài nghĩa biểu thị kỹ năng học được ('biết làm gì'), khi '会' kết hợp với một hành động sắp tới, nó mang nghĩa dự đoán hoặc phán đoán về khả năng xảy ra của một sự việc trong tương lai, tương đương với 'sẽ' trong tiếng Việt (ví dụ: 你会回家吗？ - Bạn sẽ về nhà chứ?, 明天会下雨 - Ngày mai trời sẽ mưa). Thể phủ định là '不会' (bù huì - sẽ không...).",
    "formation": "Chủ ngữ + 会 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Bạn sẽ về nhà chứ?"
      }
    ]
  },
  "zh_喂_46": {
    "title": "喂 (Thán từ: A-lô [chào hỏi khi nghe hoặc gọi điện thoại])",
    "shortExplanation": "Thán từ dùng để chào hỏi, lên tiếng khi bắt đầu cuộc gọi điện thoại hoặc dùng để gọi gây sự chú ý; 'a-lô', 'này'.",
    "longExplanation": "'喂' (thường đọc là wéi khi bắt máy gọi điện thoại, hoặc đọc là wèi khi gọi với ai đó) là thán từ thông dụng bậc nhất trong khẩu ngữ tiếng Trung. Trong giao tiếp qua điện thoại, người ta hầu như luôn dùng '喂' (A-lô) ở đầu cuộc gọi để xác nhận đường truyền và chào hỏi đối phương trước khi xưng hô hoặc hỏi han tiếp theo (ví dụ: 喂，李老师在家吗？ - A-lô, thầy Lý có ở nhà không ạ?).",
    "formation": "喂，+ Lời chào hỏi / Câu nghi vấn",
    "examples": [
      {
        "translation": "A-lô, thầy Lý có ở nhà không ạ?"
      }
    ]
  },
  "zh_在V呢_47": {
    "title": "在 + Động từ (+ 呢) (Đang... - Diễn tả hành động đang tiếp diễn)",
    "shortExplanation": "Phó từ '在' đứng trước động từ (cuối câu thường có trợ từ ngữ khí '呢') để biểu thị hành động đang diễn ra tại thời điểm nói; tương đương với 'đang...' trong tiếng Việt.",
    "longExplanation": "'在 + Động từ (+ 呢)' (zài... ne) là cấu trúc cơ bản biểu thị thể tiếp diễn trong tiếng Trung. Phó từ '在' đặt trước động từ chỉ rõ hành động đang trong quá trình thực hiện. Trợ từ ngữ khí '呢' đặt ở cuối câu để tăng cường ngữ khí khẳng định hoặc tiếp diễn; '呢' có thể lược bỏ. Thể phủ định của cấu trúc này là '没(有)在 + Động từ'.",
    "formation": "Chủ ngữ + 在 + Động từ (+ 呢)",
    "examples": [
      {
        "translation": "Tôi đang ngủ."
      }
    ]
  },
  "zh_没在V呢_48": {
    "title": "没(有)在 + Động từ (+ 呢) (Không đang... - Phủ định hành động tiếp diễn)",
    "shortExplanation": "Dạng phủ định của hành động tiếp diễn; đặt '没' hoặc '没有' trước '在' để biểu thị 'không đang làm gì'.",
    "longExplanation": "Để phủ định hành động đang tiếp diễn trong cấu trúc '在 + Động từ', tiếng Trung dùng phó từ phủ định '没' hoặc '没有' đặt trước '在', tạo thành '没在 + Động từ'. Tuyệt đối không dùng '不' để phủ định cấu trúc tiếp diễn này (không nói '不在看电视'). Cuối câu có thể có trợ từ '呢' để tăng sắc thái giải thích, đính chính.",
    "formation": "Chủ ngữ + 没(有)在 + Động từ (+ 呢)",
    "examples": [
      {
        "translation": "Họ không đang xem ti vi."
      }
    ]
  },
  "zh_1yo_49": {
    "title": "1 đọc là yāo (幺) (Cách đọc số 1 trong số điện thoại, số phòng)",
    "shortExplanation": "Chữ số 1 khi đọc từng số riêng rẽ trong số điện thoại, số phòng, số xe thường được đọc là 'yāo' thay vì 'yī' để tránh nhầm với số 7 (qī).",
    "longExplanation": "Trong khẩu ngữ tiếng Trung, khi đọc các chuỗi số liên tiếp như số điện thoại, số phòng, số chuyến bay hoặc biển số xe, chữ số '1' thường được phát âm là 'yāo' (viết là 幺 hoặc chữ số 1) thay vì 'yī'. Quy tắc này nhằm tránh sự nhầm lẫn về âm thanh giữa 'yī' (1) và 'qī' (7) khi nghe qua điện thoại hoặc nơi đông người ồn ào.",
    "formation": "Số điện thoại / Số phòng có chữ số 1 → đọc là yāo (幺)",
    "examples": [
      {
        "translation": "138-0156-7749 (chữ số 1 đọc là 'yāo')"
      }
    ]
  },
  "zh_V吧_50": {
    "title": "Động từ + 吧 (Trợ từ ngữ khí: ...đi, ...nhé [đề nghị, thúc giục, cho phép])",
    "shortExplanation": "Trợ từ ngữ khí '吧' đặt ở cuối câu để đưa ra đề nghị, rủ rê, khuyên bảo nhẹ nhàng hoặc cho phép ai làm gì; mang nghĩa '...đi', '...nhé'.",
    "longExplanation": "'吧' (ba) là trợ từ ngữ khí đặt ở cuối câu cầu khiến để biểu thị sự thương lượng, đề nghị, rủ rê, thúc giục nhẹ nhàng hoặc cho phép với thái độ cởi mở, lịch sự (ví dụ: 坐吧 = ngồi đi / mời ngồi tự nhiên, 走吧 = đi thôi). Việc dùng '吧' giúp câu nói trở nên mềm mại, thân thiện và không gây cảm giác áp đặt mệnh lệnh.",
    "formation": "Động từ (+ Tân ngữ) + 吧",
    "examples": [
      {
        "translation": "Ở đây không có ai, ngồi đi."
      }
    ]
  },
  "zh_VO了_51": {
    "title": "Động từ + Tân ngữ + 了 (Trợ từ ngữ khí: Đã... rồi [biểu thị sự việc xảy ra hoặc thay đổi])",
    "shortExplanation": "Trợ từ ngữ khí '了' đặt ở cuối câu sau tân ngữ để thông báo hành động đã diễn ra hoặc một tình huống mới xuất hiện; '...rồi'.",
    "longExplanation": "Trong cấu trúc 'Động từ + Tân ngữ + 了' (le), '了' là trợ từ ngữ khí đứng ở cuối câu trần thuật. Nó được dùng để thông báo cho người nghe biết một sự việc, hành động đã hoàn tất hoặc một trạng thái mới đã nảy sinh (ví dụ: 他去学校了 = Anh ấy đã đến trường rồi). Câu phủ định của mẫu câu này dùng '没(有)' trước động từ và bỏ '了' ở cuối câu.",
    "formation": "Chủ ngữ + Động từ + Tân ngữ + 了",
    "examples": [
      {
        "translation": "Anh ấy đã đến trường rồi."
      }
    ]
  },
  "zh_V了O_52": {
    "title": "Động từ + 了 + Tân ngữ (Trợ từ động thái: Đã làm gì [hoàn thành hành động])",
    "shortExplanation": "Trợ từ động thái '了' đứng ngay sau động từ để nhấn mạnh hành động đã hoàn thành; tân ngữ theo sau thường có số lượng từ hoặc từ định ngữ bổ nghĩa.",
    "longExplanation": "'了' (le) khi đứng liền sau động từ là trợ từ động thái biểu thị bản thân động tác đó đã hoàn thành hoặc thực hiện xong. Khi '了' nằm giữa động từ và tân ngữ, thông thường tân ngữ phải có các định ngữ tu sức đi kèm như số lượng từ hoặc từ ngữ hạn định (ví dụ: 我买了不少衣服 = Tôi đã mua khá nhiều quần áo, 我喝了一杯水 = Tôi đã uống một cốc nước).",
    "formation": "Chủ ngữ + Động từ + 了 + Tân ngữ (thường có Số lượng từ / Định ngữ)",
    "examples": [
      {
        "translation": "Tôi đã mua khá nhiều quần áo."
      }
    ]
  },
  "zh_没VO_53": {
    "title": "没(有) + Động từ + Tân ngữ (Phủ định hành động trong quá khứ: Chưa / Không làm)",
    "shortExplanation": "Dùng phó từ phủ định '没' hoặc '没有' đứng trước động từ để diễn đạt việc hành động chưa xảy ra hoặc chưa hoàn thành; không dùng '了' ở cuối câu.",
    "longExplanation": "Để phủ định một hành động đã không xảy ra trong quá khứ hoặc một trạng thái chưa hoàn thành, tiếng Trung sử dụng '没' hoặc '没有' đặt trước động từ (tương đương với 'chưa' hoặc 'không' trong tiếng Việt). Điểm ngữ pháp cốt lõi: khi đã dùng '没(有)' để phủ định, tuyệt đối không được giữ trợ từ hoàn thành '了' ở cuối câu (nói '她没去商店', không được nói '她没去商店了').",
    "formation": "Chủ ngữ + 没(有) + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Cô ấy đã không đi đến cửa hàng."
      }
    ]
  },
  "zh_TIME后_54": {
    "title": "Mốc thời gian + 后 (Sau mốc thời gian nào đó)",
    "shortExplanation": "Đặt phương vị từ '后' (hoặc '以后') sau một mốc thời gian cụ thể để chỉ khoảng thời gian xảy ra sau mốc thời gian đó; 'sau...'",
    "longExplanation": "Trong tiếng Trung, để chỉ thời điểm diễn ra sau một mốc thời gian cụ thể (giờ giấc, buổi trong ngày, ngày cụ thể), ta đặt '后' (hòu) hoặc '以后' (yǐhòu) ngay sau mốc thời gian đó (ví dụ: 五点后 = sau 5 giờ, 星期一以后 = sau thứ Hai). Cụm từ này thường làm trạng ngữ chỉ thời gian đứng ở đầu câu hoặc ngay trước động từ.",
    "formation": "Mốc thời gian + 后 / 以后",
    "examples": [
      {
        "translation": "Sau 5 giờ"
      }
    ]
  },
  "zh_DURATION后_55": {
    "title": "Khoảng thời gian + 后 (Sau một khoảng thời gian: ...nữa, ...sau)",
    "shortExplanation": "Đặt '后' (hoặc '以后') sau một từ chỉ lượng thời gian (thời lượng) để biểu thị sự việc xảy ra sau một khoảng thời gian nhất định trôi qua.",
    "longExplanation": "Khi kết hợp với từ chỉ khoảng thời gian (thời lượng như phút, giờ, ngày, tuần, năm), 'Khoảng thời gian + 后' (hòu) mang ý nghĩa 'sau bao lâu nữa' tính từ thời điểm làm mốc (ví dụ: 四十分钟后 = sau 40 phút nữa, 三天后 = ba ngày sau). Mẫu câu này khác với 'Mốc thời gian + 后' ở chỗ danh từ đi trước là một khoảng độ dài thời gian chứ không phải điểm mốc cố định.",
    "formation": "Khoảng thời gian (Thời lượng) + 后 / 以后",
    "examples": [
      {
        "translation": "Sau 40 phút nữa"
      }
    ]
  },
  "zh_啊_56": {
    "title": "...啊 (Trợ từ ngữ khí cảm thán, tán đồng: ...nhé, ...nha, ...thế!)",
    "shortExplanation": "Trợ từ ngữ khí đặt ở cuối câu để tăng cường sắc thái cảm thán, tán thành nhiệt tình, nhắc nhở thân mật hoặc bày tỏ cảm xúc gần gũi.",
    "longExplanation": "'啊' (a) là trợ từ ngữ khí khẩu ngữ vô cùng thông dụng trong tiếng Trung. Đặt ở cuối câu, nó giúp câu văn trở nên sinh động, uyển chuyển và bộc lộ cảm xúc rõ ràng; thường dùng để thể hiện sự tán đồng vui vẻ (như: 好啊 = Được thôi!, 是啊 = Đúng vậy đó!), lời nhắc nhở thân thiện hoặc sự ngạc nhiên, khen ngợi. Tùy theo âm đuôi của từ đứng trước, '啊' có thể biến âm trong khẩu ngữ (như đọc thành ya, wa, na).",
    "formation": "Câu / Từ ngữ + 啊",
    "examples": [
      {
        "translation": "Được thôi! / Đúng vậy!"
      }
    ]
  },
  "zh_都N_57": {
    "title": "都 + Vị ngữ (Phó từ phạm vi: Đều, tất cả)",
    "shortExplanation": "Phó từ '都' đứng sau chủ ngữ số nhiều và đứng trước vị ngữ (thường là '是 + Danh từ') để tổng kết toàn bộ các đối tượng được nhắc tới; 'đều', 'tất cả'.",
    "longExplanation": "'都' (dōu) là phó từ chỉ phạm vi toàn bộ trong tiếng Trung, tương đương với 'đều', 'tất cả' trong tiếng Việt. '都' luôn đứng sau chủ ngữ số nhiều (hoặc danh từ biểu thị tập thể) và đứng ngay trước vị ngữ (như động từ, tính từ hoặc cụm '是 + Danh từ'). Nó biểu thị rằng mọi cá thể trong nhóm đều mang đặc điểm hoặc thực hiện hành động đó mà không có ngoại lệ (ví dụ: 我们都是中国人 = Chúng tôi đều là người Trung Quốc).",
    "formation": "Chủ ngữ (số nhiều) + 都 + 是 + Danh từ (hoặc 都 + Vị ngữ)",
    "examples": [
      {
        "translation": "Chúng tôi đều là người Trung Quốc."
      }
    ]
  },
  "zh_S是MANNERV的_58": {
    "title": "Chủ ngữ + 是 + Phương thức + Động từ + 的 (Cấu trúc nhấn mạnh cách thức thực hiện hành động)",
    "shortExplanation": "Cấu trúc '是...的' dùng để nhấn mạnh cách thức, phương tiện hoặc phương pháp mà một hành động đã diễn ra trong quá khứ được thực hiện.",
    "longExplanation": "Cấu trúc '是...的' (shì... de) được sử dụng khi hành động đã xảy ra trong quá khứ và cả người nói lẫn người nghe đều đã biết về hành động đó; mục đích chính của câu là nhấn mạnh vào chi tiết như cách thức, phương tiện (làm bằng cách nào), thời gian hoặc địa điểm. Trong mẫu câu này, '是' đứng trước từ ngữ chỉ phương thức/phương tiện và '的' đứng ở cuối câu (ví dụ: 我们是开车来的 = Chúng tôi đến đây là bằng cách lái xe). Trong câu khẳng định '是' có thể lược bỏ, nhưng câu phủ định bắt buộc phải dùng '不是...的'.",
    "formation": "Chủ ngữ + 是 + Phương thức/Cách thức + Động từ + 的",
    "examples": [
      {
        "translation": "Chúng tôi đến đây bằng ô tô."
      }
    ]
  },
  "zh_年_59": {
    "title": "Số đếm + 年 (Cách biểu đạt năm trong tiếng Trung)",
    "shortExplanation": "Để biểu đạt năm trong tiếng Trung, đọc lần lượt từng chữ số của năm từ trái qua phải rồi thêm từ '年' (nián) ở phía sau.",
    "longExplanation": "Khi nói về năm trong tiếng Trung, các chữ số tạo nên năm được đọc rời từng số một theo thứ tự từ trái sang phải, không đọc theo quy tắc hàng nghìn, hàng trăm; sau đó thêm từ chỉ thời gian '年' (nián) ở cuối cùng (ví dụ: 2017年 đọc là 'èr líng yī qī nián'). Chữ số 0 được đọc là 'líng' (零). Trong cách biểu đạt thời gian hoàn chỉnh, năm luôn đứng ở vị trí đầu tiên trước tháng và ngày.",
    "formation": "Số đếm (đọc từng chữ số) + 年",
    "examples": [
      {
        "translation": "Năm 2017"
      }
    ]
  },
  "zh_要_60": {
    "title": "要 + Động từ (Động từ năng nguyện: Muốn, sẽ, định làm gì)",
    "shortExplanation": "Động từ năng nguyện biểu thị ý chí, nguyện vọng chủ quan muốn làm gì ('muốn'), hoặc dự định, sắp sửa làm gì trong tương lai ('sẽ', 'định').",
    "longExplanation": "Động từ năng nguyện '要' (yào) đứng trước động từ có hai nét nghĩa chính: thứ nhất là biểu thị ý muốn, nguyện vọng kiên quyết muốn thực hiện một việc gì đó (sắc thái chủ động và quyết tâm hơn '想'); thứ hai là biểu thị dự định, kế hoạch sẽ làm gì hoặc hành động sắp xảy ra trong tương lai gần (tương đương với 'sẽ', 'định'). Để phủ định ý muốn, thông thường dùng '不想'; dùng '不要' sẽ mang nghĩa cấm đoán ('đừng / không được').",
    "formation": "Chủ ngữ + 要 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Vương Phương muốn học tiếng Anh."
      }
    ]
  },
  "zh_最_61": {
    "title": "最 + Tính từ / Động từ tâm lý (Phó từ mức độ tuyệt đối: Nhất, đứng đầu)",
    "shortExplanation": "Phó từ chỉ mức độ cao nhất '最', đứng trước tính từ hoặc động từ tâm lý để biểu thị sự so sánh bậc nhất; tương đương với 'nhất' trong tiếng Việt.",
    "longExplanation": "'最' (zuì) là phó từ chỉ mức độ tuyệt đối (so sánh bậc nhất) trong tiếng Trung. Nó đứng trực tiếp trước tính từ (ví dụ: 最好 = tốt nhất, 最漂亮 = đẹp nhất) hoặc các động từ chỉ cảm xúc, tâm lý (ví dụ: 最喜欢 = thích nhất, 最爱 = yêu nhất) nhằm biểu thị rằng đối tượng được miêu tả đạt mức độ cao nhất hoặc đứng đầu trong số các đối tượng được đem ra so sánh.",
    "formation": "Chủ ngữ + 最 + Tính từ / Động từ tâm lý",
    "examples": [
      {
        "translation": "Mắt của nó đẹp nhất."
      }
    ]
  },
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
  },
  "zh_就_77": {
    "title": "就 (Thì, vậy thì [kết luận, giải pháp tự nhiên theo hoàn cảnh])",
    "shortExplanation": "Phó từ '就' đặt trước động từ trong vế sau để đưa ra giải pháp, kết luận hoặc hành động hợp lý dựa trên tiền đề; 'thì...', 'vậy thì...'.",
    "longExplanation": "'就' (jiù) là phó từ đa năng trong tiếng Trung. Trong kết cấu câu liên kết điều kiện hoặc tình huống giả định (thường ngầm chứa hoặc đi kèm với '要是/如果...'), '就' đứng trước vị ngữ ở phân câu sau để biểu thị: dựa vào tình hình ở phân câu trước mà đưa ra quyết định, lời khuyên hoặc kết quả tự nhiên tất yếu ('nếu... thì...'). Khi kết hợp với trợ từ ngữ khí '吧' ở cuối câu, nó mang sắc thái gợi ý, dàn xếp nhẹ nhàng.",
    "formation": "(Điều kiện / Tình huống + ) 就 + Động từ (+ Tân ngữ / Bổ ngữ)",
    "examples": [
      {
        "translation": "Bạn không muốn đi thì ở nhà nghỉ ngơi đi."
      }
    ]
  },
  "zh_还A_78": {
    "title": "还 + Tính từ (Cũng tạm, tàm tạm [đạt mức chấp nhận được])",
    "shortExplanation": "Phó từ '还' đứng trước tính từ biểu thị mức độ chấp nhận được, không quá xuất sắc nhưng vừa đủ, tàm tạm; 'cũng tạm', 'tương đối'.",
    "longExplanation": "'还' (hái) khi đứng trước một số tính từ mang nghĩa tích cực (như 好, 行, 可以, 不错) có tác dụng giảm nhẹ mức độ khẳng định, biểu thị sự việc đạt ở mức trung bình, có thể chấp nhận được hoặc miễn cưỡng thông qua chứ chưa thật sự nổi bật hay hoàn hảo. Cụm '还好' thường được dịch là 'cũng tạm', 'cũng ổn', 'tàm tạm'.",
    "formation": "Chủ ngữ + 还 + Tính từ",
    "examples": [
      {
        "translation": "Kỳ thi hôm qua cũng tạm ổn."
      }
    ]
  },
  "zh_有点儿A_79": {
    "title": "有点儿 + Tính từ (Hơi... một chút [mang sắc thái không hài lòng, không như ý])",
    "shortExplanation": "Cụm phó từ '有点儿' đứng trước tính từ để biểu thị mức độ nhẹ nhưng thường hàm ý phàn nàn, tiêu cực hoặc không vừa ý; 'hơi...', 'có chút...'.",
    "longExplanation": "'有点儿' (yǒudiǎnr, phương nam thường nói là 有点 yǒudiǎn) làm trạng ngữ đứng trước tính từ hoặc động từ tâm lý, biểu thị mức độ nhẹ ('hơi...'). Điểm ngữ pháp mấu chốt là cấu trúc này thường dùng cho những trạng thái tiêu cực, phiền phức hoặc không như ý muốn của người nói (như 冷 - lạnh, 累 - mệt, 贵 - đắt). Cần phân biệt với '一点儿' (yīdiǎnr) thường đứng sau tính từ để so sánh (冷一点儿 = lạnh hơn một chút) hoặc đứng trước danh từ để chỉ số lượng ít (一点儿水 = một chút nước).",
    "formation": "Chủ ngữ + 有点儿 + Tính từ / Động từ tâm lý",
    "examples": [
      {
        "translation": "Thời tiết hôm nay hơi lạnh."
      }
    ]
  },
  "zh_怎么_80": {
    "title": "怎么 (Sao, làm sao mà, sao lại... [hỏi nguyên nhân kèm sắc thái ngạc nhiên, thắc mắc])",
    "shortExplanation": "Đại từ nghi vấn '怎么' đứng trước vị ngữ để hỏi nguyên nhân hoặc lý do, thường hàm chứa sự ngạc nhiên, thắc mắc hoặc băn khoăn; 'sao...', 'sao lại...'.",
    "longExplanation": "'怎么' (zěnme) là đại từ nghi vấn đa năng. Khi đứng trước vị ngữ (động từ hoặc tính từ) để hỏi về nguyên nhân của một hiện tượng hay tình huống, nó mang nghĩa 'sao lại', 'làm sao mà', 'thế nào mà'. Khác với '为什么' chỉ dùng để hỏi lý do một cách khách quan thuần túy, '怎么' thường biểu thị sự ngạc nhiên của người nói trước một sự việc bất thường, không ngờ tới hoặc không hợp lẽ thường (ví dụ: 你怎么不吃？ - Sao bạn lại không ăn?).",
    "formation": "Chủ ngữ + 怎么 + Vị ngữ (Động từ / Tính từ / Đoản ngữ phủ định)?",
    "examples": [
      {
        "translation": "Sao bạn lại không vui thế?"
      }
    ]
  },
  "zh_NMM都_81": {
    "title": "Danh từ + Lượng từ trùng điệp + 都 (Từng... đều, ai nấy đều, mỗi một... đều)",
    "shortExplanation": "Lượng từ được lặp lại (trùng điệp) đi kèm phó từ '都' để nhấn mạnh ý nghĩa toàn thể, mang nghĩa 'mỗi một...', 'từng cái/người một đều...'.",
    "longExplanation": "Trong tiếng Trung, phần lớn đơn âm tiết lượng từ có thể trùng điệp theo hình thức 'AA' (như 个个 - từng người/cái một, 张张 - từng tờ một, 本本 - từng cuốn một). Khi lượng từ trùng điệp đứng sau danh từ hoặc làm chủ ngữ, nó mang ý nghĩa 'mỗi một', 'tất cả không sót ai/cái nào'. Do biểu thị phạm vi toàn bộ, vị ngữ phía sau hầu như luôn phải đi kèm với phó từ tổng quát '都' (đều).",
    "formation": "(Danh từ + ) Lượng từ trùng điệp + 都 + Vị ngữ",
    "examples": [
      {
        "translation": "Các bạn học ai nấy đều rất vui vẻ."
      }
    ]
  },
  "zh_因为所以_82": {
    "title": "因为……所以…… (Bởi vì... cho nên... [quan hệ nhân quả])",
    "shortExplanation": "Cặp liên từ hô ứng biểu thị quan hệ nhân quả; '因为' dẫn xuất nguyên nhân, '所以' dẫn xuất kết quả; 'bởi vì... nên...'.",
    "longExplanation": "'因为……所以……' (yīnwèi... suǒyǐ...) là cấu trúc liên từ cơ bản và chuẩn mực nhất dùng để liên kết câu phức biểu thị mối quan hệ nhân quả trong tiếng Trung. Mệnh đề đứng sau '因为' giải thích nguồn cơn, lý do phát sinh sự việc; mệnh đề đứng sau '所以' đưa ra kết quả, hệ quả tương ứng từ lý do đó. Trong khẩu ngữ, đôi khi một trong hai từ có thể được lược bỏ, nhưng dùng đầy đủ cả cặp sẽ làm câu văn mạch lạc, rõ ràng.",
    "formation": "因为 + Nguyên nhân / Lý do, 所以 + Kết quả",
    "examples": [
      {
        "translation": "Bởi vì không ngon nên tôi không ăn."
      }
    ]
  },
  "zh_还V_83": {
    "title": "还 + Động từ (Vẫn còn, vẫn đang [tiếp diễn hành động hoặc trạng thái])",
    "shortExplanation": "Phó từ '还' đứng trước động từ để biểu thị hành động hoặc trạng thái vốn có từ trước vẫn tiếp tục diễn ra, chưa dừng lại; 'vẫn còn...', 'vẫn đang...'.",
    "longExplanation": "'还' (hái) là phó từ chỉ sự tiếp diễn của động tác hoặc trạng thái. Khi đặt trước động từ (thường kết hợp với '在' hoặc '着' để tạo thành '还在' hoặc '还...着'), nó biểu thị một hành động bắt đầu từ quá khứ đến thời điểm hiện tại vẫn đang tiếp diễn, chưa kết thúc như dự tính hoặc vượt quá kỳ vọng của người nói (ví dụ: 八点了，他还在睡觉 - Đã 8 giờ rồi mà anh ấy vẫn còn đang ngủ).",
    "formation": "Chủ ngữ + 还 (+ 在) + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Tám giờ rồi mà cậu ấy vẫn còn đang ngủ."
      }
    ]
  },
  "zh_还没V_84": {
    "title": "还没(有) + Động từ (Vẫn chưa... [hành động chưa diễn ra tính đến hiện tại])",
    "shortExplanation": "Kết hợp giữa phó từ '还' và từ phủ định '没(有)' đứng trước động từ để biểu thị hành động đến nay vẫn chưa xảy ra hoặc chưa hoàn thành; 'vẫn chưa...'.",
    "longExplanation": "'还没' (hái méi, dạng đầy đủ là 还没有 hái méiyǒu) là cấu trúc phủ định thời gian rất thông dụng trong tiếng Trung. Nó diễn tả một hành động, sự việc mà người nói kỳ vọng hoặc dự đoán lẽ ra đã phải hoàn thành, nhưng tính đến thời điểm nói thì vẫn chưa hề diễn ra (ví dụ: 还没来 - vẫn chưa đến, 还没吃 - vẫn chưa ăn). Phủ định với '还没' luôn hàm ý hành động có thể sẽ diễn ra sau thời điểm nói.",
    "formation": "Chủ ngữ + 还没(有) + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Sao bạn vẫn chưa ăn cơm thế?"
      }
    ]
  },
  "zh_TIME就V_85": {
    "title": "Từ chỉ thời gian + 就 + Động từ (Mới... đã... [nhấn mạnh thời gian sớm, nhanh chóng])",
    "shortExplanation": "Phó từ '就' đứng sau từ chỉ thời gian để nhấn mạnh hành động diễn ra sớm, nhanh hoặc thuận lợi hơn dự kiến; 'mới... đã...', 'ngay từ...'.",
    "longExplanation": "Trong tiếng Trung, phó từ '就' (jiù) đặt sau cụm từ chỉ thời gian và trước động từ mang sắc thái chủ quan của người nói, nhằm nhấn mạnh hành động, sự việc diễn ra vào thời điểm rất sớm, nhanh chóng hoặc sớm hơn mức bình thường (ví dụ: 他六点就起床了 - Mới 6 giờ anh ấy đã thức dậy rồi). Cuối câu thường có trợ từ ngữ khí '了' để biểu thị sự việc đã hoàn thành. Cấu trúc này đối lập trực tiếp với phó từ '才' (nhấn mạnh thời gian muộn, chậm chạp).",
    "formation": "Chủ ngữ + Từ chỉ thời gian + 就 + Động từ (+ Tân ngữ) (+ 了)",
    "examples": [
      {
        "translation": "Mới bảy rưỡi mà các bạn học đã đến lớp rồi."
      }
    ]
  },
  "zh_N1离N2DISTANCE_86": {
    "title": "Địa điểm 1 + 离 + Địa điểm 2 + Khoảng cách (Cách... bao xa [biểu thị khoảng cách không gian])",
    "shortExplanation": "Giới từ '离' dùng để biểu thị khoảng cách không gian giữa hai địa điểm; 'địa điểm 1 cách địa điểm 2 một khoảng cách...'.",
    "longExplanation": "'离' (lí) là giới từ dùng để xác định khoảng cách không gian (hoặc thời gian) tương đối giữa hai mốc tham chiếu. Cấu trúc chuẩn là 'Địa điểm 1 + 离 + Địa điểm 2 + Từ chỉ cự ly' (như 远 - xa, 近 - gần, hoặc số đo khoảng cách cụ thể: 20多公里 - hơn 20 cây số). Giới từ '离' đi cùng mốc chuẩn (Địa điểm 2) để làm trạng ngữ chỉ khoảng cách bổ nghĩa cho vị ngữ.",
    "formation": "Địa điểm 1 + 离 + Địa điểm 2 + Khoảng cách (Số từ + Lượng từ / 远 / 近)",
    "examples": [
      {
        "translation": "Trường học cách sân bay hơn 20 km."
      }
    ]
  },
  "zh_呢_87": {
    "title": "……呢! (Trợ từ ngữ khí: ...cơ đấy!, ...đấy! [nhấn mạnh tình huống, nhắc nhở chú ý])",
    "shortExplanation": "Trợ từ ngữ khí '呢' đặt ở cuối câu trần thuật hoặc câu tiếp diễn để khẳng định sự việc đang diễn ra và thu hút sự chú ý của người nghe; '...đấy!', '...cơ đấy!'.",
    "longExplanation": "'呢' (ne) là trợ từ ngữ khí đặt ở cuối câu khẳng định (thường đi kèm với các từ chỉ sự tiếp diễn như '在', '正', '还在'). Nó có tác dụng tăng cường ngữ khí khẳng định, xác thực một tình trạng đang tiếp diễn trước mắt, đồng thời gây chú ý, nhắc nhở hoặc thông báo cho người nghe biết một sự thật cụ thể với sắc thái tình cảm rõ nét (ví dụ: 他还在学习呢！ - Cậu ấy vẫn đang học bài đấy nhé!).",
    "formation": "Câu trần thuật (thường có 在 / 还在) + 呢！",
    "examples": [
      {
        "translation": "Cậu ấy vẫn còn đang học bài đấy nhé!"
      }
    ]
  },
  "zh_好吗_88": {
    "title": "……好吗? (Có được không?, được không? [trưng cầu ý kiến, đề nghị nhã nhặn])",
    "shortExplanation": "Cụm hỏi ý kiến '好吗？' đặt ở cuối câu để thăm dò ý kiến, đề xuất hoặc nhờ vả một cách hòa nhã, lịch sự; 'được không?', 'nhé?'.",
    "longExplanation": "'……好吗？' (hǎo ma?) là hình thức câu hỏi chính phản/nghi vấn phụ thêm đặt ở cuối câu cầu khiến hoặc trần thuật. Mẫu câu này được người nói sử dụng khi đưa ra một kế hoạch, đề xuất, yêu cầu hoặc nhờ vả, nhằm thăm dò và trưng cầu sự đồng ý của đối phương một cách lịch sự, nhã nhặn và tôn trọng (tương tự như '好不好？' hay '行吗？').",
    "formation": "Câu cầu khiến / Đề xuất + 好吗？",
    "examples": [
      {
        "translation": "Chiều mai bạn gọi điện thoại cho tôi được không?"
      }
    ]
  },
  "zh_再V_89": {
    "title": "再 + Động từ (Lại, nữa, thêm một lần nữa [hành động lặp lại chưa xảy ra hoặc trong tương lai])",
    "shortExplanation": "Phó từ '再' đứng trước động từ để biểu thị hành động sẽ lặp lại hoặc tiếp tục trong tương lai, hoặc yêu cầu đối phương làm lại việc gì; 'lại...', 'nữa'.",
    "longExplanation": "'再' (zài) là phó từ chỉ sự lặp lại của hành động. Điểm ngữ pháp căn bản trong tiếng Trung là '再' dùng cho hành động sẽ lặp lại trong tương lai hoặc hành động chưa phát sinh (ví dụ: 再见 - hẹn gặp lại, 再看一次 - xem lại một lần nữa), khác biệt hoàn toàn với '又' (dùng cho hành động đã lặp lại trong quá khứ). Cấu trúc '再 + Động từ' cũng thường xuất hiện trong câu cầu khiến để yêu cầu ai đó thực hiện lại một hành động.",
    "formation": "Chủ ngữ + 再 + Động từ (+ Tân ngữ / Bổ ngữ)",
    "examples": [
      {
        "translation": "Bạn xem lại cuốn sách này một chút đi."
      }
    ]
  },
  "zh_再V_90": {
    "title": "Hành động 1 + 再 + Hành động 2 (Xong rồi mới..., rồi hãy... [thứ tự hành động])",
    "shortExplanation": "Phó từ '再' đứng trước động từ thứ hai để biểu thị hành động sau chỉ được tiến hành sau khi hành động trước hoàn thành; '...rồi mới...', '...rồi hãy...'.",
    "longExplanation": "'再' (zài) ngoài nghĩa lặp lại còn được dùng để biểu thị trình tự trước sau của hai hành động. Trong chuỗi liên tiếp 'Hành động 1 + 再 + Hành động 2', phó từ '再' đứng trước động từ ở vế sau để nhấn mạnh rằng hành động thứ hai sẽ chỉ diễn ra sau khi hành động hoặc điều kiện thứ nhất đã được hoàn tất hoặc giải quyết xong (ví dụ: 吃完饭再走 = ăn cơm xong rồi hẵng đi, 想想再告诉你 = nghĩ kỹ rồi mới nói cho bạn biết).",
    "formation": "Hành động 1 (Động từ 1) + 再 + Hành động 2 (Động từ 2)",
    "examples": [
      {
        "translation": "Để tôi suy nghĩ đã rồi mới nói cho bạn biết."
      }
    ]
  },
  "zh_TIME再V_91": {
    "title": "Từ chỉ thời gian + 再 + Động từ (Đến... mới làm, để... rồi hãy... [trì hoãn đến thời điểm xác định])",
    "shortExplanation": "Phó từ '再' đặt sau từ chỉ thời gian để biểu thị việc hoãn hành động lại và chờ đến thời điểm đó mới thực hiện; 'đến... rồi hãy...', 'để... mới...'.",
    "longExplanation": "Kết cấu 'Từ chỉ thời gian + 再 + Động từ' dùng để biểu thị sự trì hoãn một hành động, quyết định không làm ngay lúc này mà đợi đến một thời điểm cụ thể trong tương lai mới bắt đầu thực hiện (ví dụ: 我明天再去 = Đến mai tôi mới đi / Để ngày mai tôi hãy đi). Phó từ '再' ở đây mang sắc thái hoãn lại một kế hoạch hoặc dời hành động sang một thời điểm thích hợp hơn.",
    "formation": "Chủ ngữ + Từ chỉ thời gian + 再 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Ngày mai tôi mới đi (Để mai tôi hãy đi)."
      }
    ]
  },
  "zh_请让叫OV_92": {
    "title": "请 / 让 / 叫 + Tân ngữ + Động từ (Câu kiêm ngữ: Mời / Để / Bảo ai làm gì)",
    "shortExplanation": "Câu kiêm ngữ dùng các động từ sứ khiến như '请' (mời), '让' (cho phép/bảo), '叫' (bảo/kêu) để yêu cầu, mời mọc hoặc cho phép ai đó làm một việc gì.",
    "longExplanation": "Trong tiếng Trung, câu kiêm ngữ (兼语句) là mẫu câu có tân ngữ của động từ thứ nhất đồng thời làm chủ ngữ thực hiện hành động của động từ thứ hai. Ba động từ sứ khiến thông dụng nhất là: '请' (qǐng - mời, nhờ, mang sắc thái lịch sự, tôn trọng), '让' (ràng - để, cho phép, bảo ai làm gì), và '叫' (jiào - gọi, sai, bảo ai làm gì, rất phổ biến trong khẩu ngữ hàng ngày).",
    "formation": "Chủ ngữ + 请 / 让 / 叫 + Tân ngữ (Người thực hiện) + Động từ (+ Thành phần khác)",
    "examples": [
      {
        "translation": "Tôi mời bạn ăn cơm."
      }
    ]
  },
  "zh_VV_93": {
    "title": "Động từ trùng điệp (Lặp lại động từ: Làm một chút, thử làm [giảm nhẹ ngữ khí])",
    "shortExplanation": "Động từ đơn âm tiết lặp lại biểu thị hành động diễn ra trong thời gian ngắn, làm thử hoặc làm một cách nhẹ nhàng, thoải mái; '...một chút', 'thử... xem'.",
    "longExplanation": "Trong tiếng Trung, động từ đơn âm tiết có thể lặp lại (như: 看看 - xem xem/nhìn xem, 听听 - nghe một chút, 想想 - nghĩ ngợi một chút). Khi trùng điệp, âm tiết thứ hai thường đọc thanh nhẹ (khinh thanh). Mẫu câu này biểu thị hành động diễn ra trong khoảng thời gian rất ngắn hoặc có tính chất thử nghiệm, đồng thời làm cho ngữ khí câu nói trở nên nhẹ nhàng, thân mật, bớt tính mệnh lệnh.",
    "formation": "Chủ ngữ + Động từ + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Bạn xem thử mấy bộ quần áo này xem."
      }
    ]
  },
  "zh_V一V_94": {
    "title": "Động từ + 一 + Động từ (Trùng điệp động từ chèn 一: Làm thử một chút, làm một lát)",
    "shortExplanation": "Chèn số từ '一' vào giữa động từ trùng điệp để biểu thị hành động diễn ra nhanh chóng, làm thử một chút; 'thử... một chút'.",
    "longExplanation": "Bên cạnh hình thức lặp trực tiếp (như 看看), động từ đơn âm tiết trong tiếng Trung còn có biến thể rất phổ biến là chèn số từ '一' vào giữa (như 看一看 - xem thử một chút, 听一听 - nghe thử một lát, 想一想 - nghĩ một chút). Nghĩa của hình thức này tương đương với hình thức lặp trực tiếp, đều nhấn mạnh tính chất thử nghiệm, hành động diễn ra nhanh gọn và làm giảm nhẹ sắc thái mệnh lệnh, khiến câu nói nghe nhẹ nhàng, uyển chuyển hơn.",
    "formation": "Chủ ngữ + Động từ + 一 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Bạn xem thử mấy bộ quần áo này xem nào."
      }
    ]
  },
  "zh_Vresult_95": {
    "title": "Động từ + Bổ ngữ kết quả (Biểu thị kết quả đạt được của hành động)",
    "shortExplanation": "Động từ kết hợp trực tiếp với một động từ hoặc tính từ phía sau làm bổ ngữ kết quả, diễn tả hành động đã dẫn đến kết cục hoặc mục đích nhất định.",
    "longExplanation": "Trong tiếng Trung, bổ ngữ kết quả (结果补语) đứng ngay liền kề sau động từ chính mà không có bất kỳ từ nào xen vào giữa, dùng để biểu thị kết quả nảy sinh từ động tác đó. Các bổ ngữ kết quả phổ biến bao gồm: '到' hoặc '见' (nhìn thấy, nghe thấy, đạt được), '完' (xong, hết), '好' (hoàn tất, ổn thỏa), '懂' (hiểu), '对/错' (đúng/sai). Khi câu biểu thị sự việc đã hoàn thành hoặc đạt kết quả trong thực tế, thường có trợ từ động thái '了' đi kèm.",
    "formation": "Chủ ngữ + Động từ + Bổ ngữ kết quả (+ Tân ngữ) (+ 了)",
    "examples": [
      {
        "translation": "Tôi đã nhìn thấy bạn gái của bạn rồi."
      }
    ]
  },
  "zh_没Vresult_96": {
    "title": "没(有) + Động từ + Bổ ngữ kết quả (Phủ định của bổ ngữ kết quả: Chưa/Không đạt được kết quả)",
    "shortExplanation": "Dùng phó từ phủ định '没(有)' đặt trước động từ để phủ định việc kết quả của hành động đã diễn ra; tuyệt đối không dùng '了' ở cuối câu.",
    "longExplanation": "Để phủ định một hành động đã không đạt được kết quả mong muốn hoặc kết quả đó chưa từng xảy ra, tiếng Trung sử dụng '没' hoặc '没有' đặt trước cấu trúc 'Động từ + Bổ ngữ kết quả'. Hai điểm quy tắc ngữ pháp tối quan trọng cần nhớ: (1) Không được dùng '不' để phủ định bổ ngữ kết quả của sự việc trong quá khứ/hiện tại; (2) Trợ từ hoàn thành '了' phải được lược bỏ hoàn toàn khi đã có '没(有)' phủ định.",
    "formation": "Chủ ngữ + 没(有) + Động từ + Bổ ngữ kết quả (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Tôi không nhìn thấy bạn gái của bạn."
      }
    ]
  },
  "zh_从N1到N2_97": {
    "title": "从 + Danh từ 1 + 到 + Danh từ 2 (Từ... đến... [chỉ phạm vi đối tượng, không gian, thời gian])",
    "shortExplanation": "Cụm giới từ biểu thị phạm vi bao quát từ đối tượng/địa điểm/thời gian này đến đối tượng/địa điểm/thời gian khác; 'từ... đến...'.",
    "longExplanation": "'从……到……' (cóng... dào...) là kết cấu giới từ dùng để biểu thị điểm xuất phát và điểm kết thúc trong một phạm vi. Mẫu câu này không chỉ giới hạn ở phạm vi không gian (địa điểm) hoặc thời gian, mà còn mở rộng rất phổ biến sang phạm vi đối tượng con người, sự vật (ví dụ: '从老人到孩子' - từ người già đến trẻ nhỏ). Do bao hàm toàn bộ phạm vi, vị ngữ phía sau thường đi kèm với phó từ '都' (đều).",
    "formation": "从 + Danh từ 1 + 到 + Danh từ 2 (+ 都) + Vị ngữ",
    "examples": [
      {
        "translation": "Từ người già đến trẻ con đều thích ăn táo."
      }
    ]
  },
  "zh_第MN_98": {
    "title": "第 + Số từ + Lượng từ + Danh từ (Chỉ số thứ tự: Thứ... [cái thứ tư, người thứ nhất])",
    "shortExplanation": "Tiền tố '第' kết hợp với số từ và lượng từ đứng trước danh từ để biểu thị thứ tự sắp xếp; tương đương với 'thứ...' trong tiếng Việt.",
    "longExplanation": "Trong tiếng Trung, để chuyển đổi số đếm (nhất, nhị, tam, tứ...) thành số thứ tự (thứ nhất, thứ hai, thứ ba, thứ tư...), người ta thêm tiền tố '第' (dì) vào ngay trước con số. Khi bổ nghĩa cho danh từ, cấu trúc bắt buộc phải có lượng từ thích hợp chen giữa số từ và danh từ: '第 + Số từ + Lượng từ + Danh từ' (ví dụ: 第四本书 - cuốn sách thứ tư, 第一位老师 - người thầy đầu tiên).",
    "formation": "第 + Số từ + Lượng từ + Danh từ",
    "examples": [
      {
        "translation": "Việc thứ tư vẫn còn chưa làm."
      }
    ]
  },
  "zh_不要别V_99": {
    "title": "不要 / 别 + Động từ (Câu mệnh lệnh phủ định: Đừng, không được làm gì)",
    "shortExplanation": "Dùng '不要' hoặc '别' đứng trước động từ để khuyên can, ngăn cấm hoặc ra lệnh cho người khác không được thực hiện một hành động; 'đừng...', 'không được...'.",
    "longExplanation": "'不要' (bùyào) và '别' (bié) là hai phó từ phủ định dùng trong câu cầu khiến để thể hiện sự khuyên ngăn, khuyên bảo hoặc cấm đoán ai làm việc gì. Trong khẩu ngữ hàng ngày, '别' được sử dụng cực kỳ phổ biến vì tính ngắn gọn và dứt khoát. Cả hai từ này đều đứng trực tiếp trước động từ hoặc cụm động từ để tạo thành câu mệnh lệnh phủ định (ví dụ: 别说话 - đừng nói chuyện, 不要走 - đừng đi).",
    "formation": "(Chủ ngữ + ) 不要 / 别 + Động từ (+ Tân ngữ)!",
    "examples": [
      {
        "translation": "Đừng nghịch điện thoại! (Đừng chơi điện thoại!)"
      }
    ]
  },
  "zh_不要别V了_100": {
    "title": "不要 / 别 + Động từ + 了 (Đừng... nữa! [yêu cầu chấm dứt hành động đang diễn ra])",
    "shortExplanation": "Thêm trợ từ ngữ khí '了' vào cuối câu mệnh lệnh phủ định để yêu cầu người nghe dừng ngay hành động đang làm lại; 'đừng... nữa!'.",
    "longExplanation": "Khi cấu trúc '不要' hoặc '别' kết hợp với trợ từ ngữ khí '了' ở cuối câu ('不要/别……了'), nghĩa của câu chuyển từ việc khuyên không nên làm nói chung sang việc yêu cầu dừng hẳn một hành động đang thực sự diễn ra tại thời điểm nói. Trợ từ '了' ở đây biểu thị sự chuyển biến trạng thái (từ đang làm chuyển sang ngừng làm), tương đương với 'đừng... nữa', 'thôi... đi' trong tiếng Việt.",
    "formation": "(Chủ ngữ + ) 不要 / 别 + Động từ (+ Tân ngữ) + 了！",
    "examples": [
      {
        "translation": "Đừng nghịch điện thoại nữa!"
      }
    ]
  },
  "zh_对NA_101": {
    "title": "对 + Danh từ + Tính từ (Đối với... thì... [biểu thị đối tượng tiếp nhận hoặc tác động])",
    "shortExplanation": "Giới từ '对' dẫn ra đối tượng hướng tới, liên quan hoặc chịu tác động, phía sau kết hợp với tính từ hoặc cụm miêu tả; 'đối với... thì...'.",
    "longExplanation": "'对' (duì) là giới từ thông dụng dùng để giới thiệu đối tượng mà một tính chất, thái độ, đánh giá hoặc tác động hướng vào. Trong cấu trúc '对 + Danh từ/Cụm danh từ + Tính từ/Cụm miêu tả', vị ngữ phía sau thường là các tính từ hoặc đoản ngữ đánh giá như: 有帮助 (có ích, giúp ích), 有好处 (có lợi), 有用 (hữu ích), 好 (tốt), 严格 (nghiêm khắc). Cấu trúc này tương đương với 'đối với... có lợi/tốt/hữu ích...' trong tiếng Việt.",
    "formation": "(Chủ ngữ + ) 对 + Danh từ / Cụm danh từ + Tính từ / Cụm tính chất",
    "examples": [
      {
        "translation": "Học tiếng Trung rất có ích cho công việc tại Trung Quốc."
      }
    ]
  },
  "zh_SV的N_102": {
    "title": "Chủ ngữ + Động từ + 的 + Danh từ (Cụm chủ - vị làm định ngữ: Cái mà... làm)",
    "shortExplanation": "Một mệnh đề chủ - vị hoàn chỉnh đứng trước trợ từ kết cấu '的' để làm định ngữ tu sức cho danh từ trung tâm đứng sau; 'cái/người mà... làm'.",
    "longExplanation": "Trong tiếng Trung, mọi thành phần bổ nghĩa (định ngữ) đều bắt buộc phải đứng TRƯỚC danh từ trung tâm được bổ nghĩa. Khi cả một cụm chủ - vị (chủ ngữ nhỏ + vị ngữ động từ nhỏ) làm định ngữ để hạn định hoặc miêu tả cho một danh từ, giữa chúng bắt buộc phải có trợ từ kết cấu '的' (de) làm cầu nối liên kết. Cấu trúc này tương đương với mệnh đề quan hệ (relative clause) trong tiếng Anh, hay cách diễn đạt 'cái mà ai đó làm' trong tiếng Việt.",
    "formation": "(Chủ ngữ nhỏ + Động từ) + 的 + Danh từ trung tâm",
    "examples": [
      {
        "translation": "Cơm mẹ tôi nấu ăn rất ngon."
      }
    ]
  },
  "zh_N1比N2A_103": {
    "title": "Danh từ 1 + 比 + Danh từ 2 + Tính từ (Câu chữ 比: So sánh hơn giữa hai đối tượng)",
    "shortExplanation": "Dùng giới từ '比' để so sánh giữa hai đối tượng, biểu thị đối tượng thứ nhất có mức độ tính chất cao hơn đối tượng thứ hai; '...hơn...'.",
    "longExplanation": "Câu chữ '比' (bǐ) là cấu trúc so sánh hơn cơ bản nhất trong tiếng Trung. Trật tự câu là: 'Đối tượng 1 + 比 + Đối tượng 2 + Tính từ'. Lưu ý quy tắc ngữ pháp đặc biệt: tính từ vị ngữ trong câu so sánh '比' tuyệt đối KHÔNG được đi kèm với các phó từ chỉ mức độ tuyệt đối như '很', '非常', '太', '真' (ví dụ: nói '哥哥比姐姐高', không được nói '哥哥比姐姐很高').",
    "formation": "Danh từ 1 + 比 + Danh từ 2 + Tính từ",
    "examples": [
      {
        "translation": "Anh trai cao hơn chị gái."
      }
    ]
  },
  "zh_N1没有N2A_104": {
    "title": "Danh từ 1 + 没有 + Danh từ 2 + Tính từ (So sánh kém với 没有: Không bằng, chưa bằng)",
    "shortExplanation": "Dùng '没有' để so sánh giữa hai đối tượng, biểu thị đối tượng thứ nhất không đạt đến mức độ tính chất như đối tượng thứ hai; '...không bằng...'.",
    "longExplanation": "'没有' (méiyǒu) được dùng trong cấu trúc so sánh để biểu thị sự so sánh kém hoặc phủ định sự ngang bằng. Cấu trúc chuẩn là: 'Đối tượng 1 + 没有 + Đối tượng 2 + (这么/那么) + Tính từ'. Mẫu câu này chỉ rõ đối tượng 1 có mức độ thuộc tính thấp hơn đối tượng 2 (chưa đạt đến chuẩn của đối tượng 2). Trong khẩu ngữ, người ta thường chèn thêm '那么' (nàme) hoặc '这么' (zhème) trước tính từ để nhấn mạnh (ví dụ: 哥哥没有姐姐那么高 = Anh trai không cao bằng chị gái).",
    "formation": "Danh từ 1 + 没有 + Danh từ 2 (+ 这么 / 那么) + Tính từ",
    "examples": [
      {
        "translation": "Anh trai không cao bằng chị gái."
      }
    ]
  },
  "zh_可能_105": {
    "title": "可能 (Phó từ / Động từ năng nguyện: Có thể, có lẽ, có khả năng)",
    "shortExplanation": "Dùng để phỏng đoán, ước lượng hoặc đánh giá về khả năng xảy ra của một sự việc hay hành động; 'có thể', 'có lẽ'.",
    "longExplanation": "'可能' (kěnéng) vừa có thể hoạt động như một phó từ chỉ sự phỏng đoán, vừa có thể dùng như một động từ năng nguyện (trợ động từ) trong tiếng Trung. Nó thường đứng trước vị ngữ hoặc đứng ở đầu câu (trước chủ ngữ) để đưa ra nhận định không hoàn toàn chắc chắn của người nói về một sự việc, tương đương với 'có thể', 'có lẽ', 'chắc là'. Khi kết hợp với phủ định, thường đặt trước '不' hoặc '没' (ví dụ: 可能不会 - có lẽ không biết/sẽ không).",
    "formation": "Chủ ngữ + 可能 + Vị ngữ (Động từ / Tính từ) (hoặc: 可能 + Chủ ngữ + Vị ngữ)",
    "examples": [
      {
        "translation": "Cô ấy có lẽ không biết hát đâu."
      }
    ]
  },
  "zh_V得A_106": {
    "title": "Động từ + 得 + Tính từ (Bổ ngữ trạng thái: Đánh giá trình độ hoặc kết quả của hành động)",
    "shortExplanation": "Dùng trợ từ kết cấu '得' đứng sau động từ để nối với tính từ, biểu thị nhận xét, đánh giá về trạng thái, mức độ hoặc hiệu quả của hành động.",
    "longExplanation": "Trong tiếng Trung, cấu trúc 'Động từ + 得 + Tính từ/Cụm tính từ' là hình thức cơ bản nhất của bổ ngữ trạng thái (状态补语, còn gọi là bổ ngữ mức độ hoặc bổ ngữ tình thái). Nó dùng để miêu tả, đánh giá hoặc nhận xét xem một động tác diễn ra như thế nào, đạt đến trình độ hoặc trạng thái ra sao (ví dụ: 跑得快 - chạy nhanh, 说得好 - nói hay). Nếu sau '得' là một tính từ đơn độc mang nghĩa tích cực thì phía trước tính từ đó thường bắt buộc phải có phó từ chỉ mức độ như '很', '非常', '真' (ví dụ: nói '跑得很快', không nói '跑得快' trừ khi so sánh).",
    "formation": "Chủ ngữ + Động từ + 得 + (Phó từ mức độ + ) Tính từ",
    "examples": [
      {
        "translation": "Tôi chạy rất nhanh."
      }
    ]
  },
  "zh_VOV得A_107": {
    "title": "Động từ + Tân ngữ + Động từ + 得 + Tính từ (Lặp lại động từ khi có tân ngữ để miêu tả trình độ, kết quả)",
    "shortExplanation": "Dùng để miêu tả, đánh giá mức độ, trình độ hoặc kết quả của hành động khi động từ có mang tân ngữ; động từ phải được lặp lại trước '得'.",
    "longExplanation": "Trong tiếng Trung, khi động từ mang tân ngữ và người nói muốn bổ sung bổ ngữ trạng thái/trình độ với '得' để miêu tả, đánh giá xem hành động thực hiện như thế nào (tốt, nhanh, hay...), cấu trúc bắt buộc phải lặp lại động từ theo dạng 'Động từ + Tân ngữ + Động từ + 得 + Tính từ / Cụm tính từ' (ví dụ: 唱歌唱得很好 - hát rất hay). Trong khẩu ngữ, động từ thứ nhất đôi khi có thể được lược bỏ nếu tân ngữ được chuyển thành chủ đề đứng trước động từ.",
    "formation": "Chủ ngữ + Động từ + Tân ngữ + Động từ + 得 + (Phó từ + ) Tính từ",
    "examples": [
      {
        "translation": "Chị gái tôi hát rất hay."
      }
    ]
  },
  "zh_VOV得比NA_108": {
    "title": "Động từ (+ Tân ngữ + Động từ) + 得 + 比 + Danh từ + Tính từ (So sánh về trình độ, trạng thái: đặt cụm '比' sau '得')",
    "shortExplanation": "Dùng để so sánh trình độ, kết quả hoặc trạng thái của hành động giữa hai đối tượng, trong đó cụm so sánh '比 + Danh từ' được đặt ngay sau '得'.",
    "longExplanation": "Đây là một trong hai cấu trúc so sánh phổ biến kết hợp với bổ ngữ trạng thái trong tiếng Trung. Trong mẫu câu này, cụm so sánh '比 + Danh từ' (hoặc đại từ) được đặt ở vị trí bổ ngữ, ngay sau trợ từ '得' và trước tính từ miêu tả: 'Chủ ngữ + Động từ (+ Tân ngữ + Động từ) + 得 + 比 + Đối tượng so sánh + Tính từ'. Cấu trúc này nhấn mạnh vào sự chênh lệch về mức độ hoặc kết quả của hành động. Khi có tân ngữ, có thể lặp lại động từ hoặc lược bỏ động từ đầu tiên.",
    "formation": "Chủ ngữ + Động từ (+ Tân ngữ + Động từ) + 得 + 比 + Danh từ (Đối tượng so sánh) + Tính từ",
    "examples": [
      {
        "translation": "Cậu ấy học (tiếng Trung) nhanh hơn tôi."
      }
    ]
  },
  "zh_比NVOV得A_109": {
    "title": "比 + Danh từ + Động từ (+ Tân ngữ + Động từ) + 得 + Tính từ (So sánh về trình độ, trạng thái: đặt cụm '比' trước động từ)",
    "shortExplanation": "Dùng để so sánh trình độ, kết quả của hành động, trong đó cụm giới từ '比 + Danh từ' được đặt trước động từ vị ngữ để làm trạng ngữ.",
    "longExplanation": "Đây là dạng thứ hai của câu so sánh chữ '比' kết hợp với bổ ngữ trạng thái trong tiếng Trung. Khác với dạng đặt sau '得', trong cấu trúc này cụm giới từ '比 + Danh từ' (đối tượng so sánh) được đặt ngay sau chủ ngữ và trước động từ chính để làm trạng ngữ: 'Chủ ngữ + 比 + Đối tượng so sánh + Động từ (+ Tân ngữ + Động từ) + 得 + Tính từ'. Cả hai dạng (trước động từ và sau '得') đều biểu thị cùng một ý nghĩa so sánh về trình độ hoặc kết quả của hành động.",
    "formation": "Chủ ngữ + 比 + Danh từ (Đối tượng so sánh) + Động từ (+ Tân ngữ + Động từ) + 得 + Tính từ",
    "examples": [
      {
        "translation": "Cậu ấy học (tiếng Trung) nhanh hơn tôi."
      }
    ]
  },
  "zh_V着O_110": {
    "title": "Động từ + 着 + Tân ngữ (Biểu thị trạng thái đang duy trì: đang...)",
    "shortExplanation": "Trợ từ động thái '着' đi sau động từ mang tân ngữ để biểu thị trạng thái hoặc động tác đang tiếp diễn, duy trì.",
    "longExplanation": "'着' (zhe) là trợ từ động thái quan trọng trong tiếng Trung, thường được đặt trực tiếp sau động từ để biểu thị sự duy trì của một trạng thái hoặc hành động (thường là kết quả của hành động trước đó, ví dụ: 穿着 - đang mặc, 拿着 - đang cầm, 戴着 - đang đeo). Khác với '在' nhấn mạnh quá trình hành động đang tiến hành, '着' nhấn mạnh trạng thái tĩnh đang tiếp diễn hoặc duy trì.",
    "formation": "Chủ ngữ + Động từ + 着 + Tân ngữ",
    "examples": [
      {
        "translation": "Họ đang mặc âu phục."
      }
    ]
  },
  "zh_没V着O_111": {
    "title": "没(有) + Động từ + 着 + Tân ngữ (Phủ định của trạng thái duy trì: không...)",
    "shortExplanation": "Dạng phủ định của cấu trúc trạng thái 'Động từ + 着'; dùng phó từ phủ định '没' hoặc '没有' đặt trước động từ; 'không...'.",
    "longExplanation": "Để phủ định một trạng thái đang tiếp diễn hoặc duy trì được tạo bởi 'Động từ + 着', tiếng Trung dùng phó từ phủ định '没' hoặc '没有' đặt ngay trước động từ (tuyệt đối không dùng '不'). Cấu trúc 'Chủ ngữ + 没(有) + Động từ + 着 + Tân ngữ' dùng để diễn đạt rằng chủ ngữ hiện tại không ở trong trạng thái đó, chẳng hạn không mang, không mặc, không cầm nắm đồ vật nào đó.",
    "formation": "Chủ ngữ + 没(有) + Động từ + 着 + Tân ngữ",
    "examples": [
      {
        "translation": "Cậu ấy không cầm bút chì."
      }
    ]
  },
  "zh_N不是吗_112": {
    "title": "Danh từ / Đại từ + 不是……吗？ (Chẳng phải là... sao?, Không phải... hay sao?)",
    "shortExplanation": "Mẫu câu phản vấn dùng để hỏi ngược lại nhằm khẳng định hoặc nhắc nhở đối phương về một sự thật hiển nhiên; 'chẳng phải là... sao?'.",
    "longExplanation": "'不是……吗？' (bùshì... ma?) là cấu trúc câu phản vấn (nghi vấn tu từ) cực kỳ thông dụng trong tiếng Trung. Người nói dùng cấu trúc này khi muốn khẳng định một sự việc mà mình tin là đúng, hoặc nhắc nhở, chất vấn đối phương về một sự thật hiển nhiên mà đối phương dường như đã quên hoặc hành động trái ngược (ví dụ: 你不是北京人吗？ - Bạn chẳng phải là người Bắc Kinh sao?). Cấu trúc mang hình thức phủ định nhưng truyền tải ý nghĩa khẳng định mạnh mẽ.",
    "formation": "Chủ ngữ (Danh từ / Đại từ) + 不是 + Thành phần vị ngữ (Danh từ / Cụm động từ) + 吗？",
    "examples": [
      {
        "translation": "Chẳng phải bạn là người Bắc Kinh sao?"
      }
    ]
  },
  "zh_往DIRECTIONV_113": {
    "title": "往 + Phương hướng + Động từ (Đi / làm gì về phía, hướng về...)",
    "shortExplanation": "Giới từ '往' kết hợp với từ chỉ phương hướng hoặc địa điểm, đặt trước động từ để chỉ hướng của hành động; 'về phía...', 'hướng về...'.",
    "longExplanation": "'往' (wǎng) là giới từ chỉ phương hướng trong tiếng Trung, thường kết hợp với danh từ phương vị hoặc từ chỉ phương hướng (như: 东, 西, 南, 北, 前, 左, 右...) để tạo thành cụm giới từ đóng vai trò trạng ngữ trước động từ hành động ('往 + Phương hướng + Động từ'). Mẫu câu này rất thông dụng khi chỉ đường hoặc miêu tả hướng di chuyển của người và phương tiện.",
    "formation": "Chủ ngữ + 往 + Từ chỉ phương hướng + Động từ",
    "examples": [
      {
        "translation": "Từ đây đi thẳng về hướng đông."
      }
    ]
  },
  "zh_V过_114": {
    "title": "Động từ + 过 (Biểu thị trải nghiệm: Đã từng...)",
    "shortExplanation": "Trợ từ động thái '过' đứng ngay sau động từ để biểu thị hành động đã từng xảy ra trong quá khứ và là một trải nghiệm; 'đã từng...'.",
    "longExplanation": "'过' (guo) là trợ từ động thái biểu thị kinh nghiệm hoặc trải nghiệm trong quá khứ. Khi đặt '过' ngay sau động từ ('Động từ + 过'), người nói muốn nhấn mạnh rằng hành động đó đã diễn ra ít nhất một lần trước thời điểm nói và hiện tại không còn tiếp diễn nữa (ví dụ: 去过中国 - từng đi Trung Quốc). Khác với '了' nhấn mạnh sự hoàn thành hoặc xuất hiện tình huống mới, '过' nhấn mạnh việc chủ ngữ đã có kinh nghiệm hoặc trải nghiệm đó.",
    "formation": "Chủ ngữ + Động từ + 过 (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Tôi từng đi Trung Quốc."
      }
    ]
  },
  "zh_没有V过_115": {
    "title": "没(有) + Động từ + 过 (Chưa từng..., chưa bao giờ...)",
    "shortExplanation": "Dạng phủ định của trợ từ kinh nghiệm '过'; dùng '没' hoặc '没有' đặt trước động từ để biểu thị chưa từng trải qua hành động đó.",
    "longExplanation": "Để phủ định trải nghiệm kinh nghiệm của 'Động từ + 过', tiếng Trung đặt phó từ phủ định '没' hoặc '没有' ở phía trước động từ ('没(有) + Động từ + 过'). Cấu trúc này có nghĩa là từ trước tới nay chủ ngữ chưa bao giờ thực hiện hoặc trải qua hành động đó (tuyệt đối không dùng '不' để phủ định '过'). Có thể kết hợp với '从来' (cónglái) để nhấn mạnh: '从来没(有) + Động từ + 过' (từ trước tới nay chưa từng...).",
    "formation": "Chủ ngữ + 没(有) + Động từ + 过 (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Họ chưa từng đến nhà tôi."
      }
    ]
  },
  "zh_虽然但是_116": {
    "title": "虽然……但是…… (Tuy... nhưng..., mặc dù... nhưng...)",
    "shortExplanation": "Cặp liên từ biểu thị mối quan hệ chuyển ngoặt giữa hai phân câu; tương đương với 'tuy rằng... nhưng...', 'mặc dù... nhưng...'.",
    "longExplanation": "'虽然……但是……' (suīrán... dànshì...) là cặp liên từ biểu thị quan hệ chuyển ngoặt (nghịch tiếp) phổ biến nhất trong tiếng Trung. Phân câu thứ nhất dùng '虽然' để nêu ra một sự thật, tiền đề hoặc sự nhượng bộ; phân câu thứ hai dùng '但是' (hoặc '可是', '但') để đưa ra kết quả hoặc tình huống trái ngược, bất ngờ so với tiền đề đó. '虽然' có thể đứng trước hoặc sau chủ ngữ của phân câu thứ nhất.",
    "formation": "虽然 + Phân câu 1，但是 + Phân câu 2",
    "examples": [
      {
        "translation": "Mặc dù trời nắng, nhưng vẫn rất lạnh."
      }
    ]
  },
  "zh_V过次O_117": {
    "title": "Động từ + 过 + Số từ + 次 + Tân ngữ (Bổ ngữ động lượng với danh từ chỉ vật: Đã từng... bao nhiêu lần)",
    "shortExplanation": "Bổ ngữ động lượng (Số từ + 次) đứng trước tân ngữ chỉ vật thông thường để biểu thị số lần đã từng thực hiện hành động.",
    "longExplanation": "Trong tiếng Trung, khi muốn nói về số lần diễn ra của một hành vi trong quá khứ với trợ từ kinh nghiệm '过' và tân ngữ là danh từ chỉ đồ vật/sự việc thông thường, bổ ngữ động lượng ('Số từ + 次 / 遍 / 趟...') thường được đặt ở vị trí giữa trợ từ '过' và tân ngữ danh từ đó: 'Chủ ngữ + Động từ + 过 + Số từ + 次 + Tân ngữ' (ví dụ: 坐过三次飞机 - từng đi máy bay 3 lần, 看过两次电影 - từng xem phim 2 lần).",
    "formation": "Chủ ngữ + Động từ + 过 + Số từ + 次 + Tân ngữ (Danh từ chỉ vật)",
    "examples": [
      {
        "translation": "Họ đã từng đi máy bay ba lần."
      }
    ]
  },
  "zh_V过PLACE次_118": {
    "title": "Động từ + 过 + Nơi chốn + Số từ + 次 / Động từ + 过 + Số từ + 次 + Nơi chốn (Bổ ngữ động lượng với danh từ chỉ nơi chốn: Đã từng đến... bao nhiêu lần)",
    "shortExplanation": "Khi tân ngữ là từ chỉ nơi chốn, bổ ngữ động lượng (Số từ + 次) có thể đặt sau hoặc đặt trước danh từ chỉ nơi chốn; 'từng đến... mấy lần'.",
    "longExplanation": "Trong tiếng Trung, khi tân ngữ là danh từ chỉ địa điểm/nơi chốn và kết hợp với bổ ngữ động lượng chỉ số lần, vị trí của tân ngữ rất linh hoạt: có thể đặt danh từ nơi chốn trước bổ ngữ động lượng ('Động từ + 过 + Nơi chốn + Số từ + 次', ví dụ: 去过中国三次) hoặc đặt bổ ngữ động lượng trước danh từ nơi chốn ('Động từ + 过 + Số từ + 次 + Nơi chốn', ví dụ: 来过三次中国). Cả hai trật tự từ này đều hoàn toàn tự nhiên và mang ý nghĩa tương đương.",
    "formation": "Chủ ngữ + Động từ + 过 + Danh từ nơi chốn + Số từ + 次 (hoặc: Chủ ngữ + Động từ + 过 + Số từ + 次 + Danh từ nơi chốn)",
    "examples": [
      {
        "translation": "Chúng tôi từng đến Trung Quốc ba lần."
      }
    ]
  },
  "zh_TIME就要V了_119": {
    "title": "Thời gian + (就)要 + Động từ + 了 (Sắp... vào thời gian tới [có mốc thời gian cụ thể])",
    "shortExplanation": "Dùng để biểu thị hành động hoặc sự việc sắp sửa diễn ra vào một mốc thời gian cụ thể trong tương lai gần; 'sắp... rồi'.",
    "longExplanation": "Cấu trúc '(Thời gian + ) (就)要……了' biểu thị một sự việc sắp sửa xảy ra trong tương lai gần. Điểm ngữ pháp rất quan trọng: Khi câu có trạng ngữ chỉ mốc thời gian cụ thể (như 下个星期 - tuần sau, 明天 - ngày mai, 八点 - 8 giờ), tiếng Trung bắt buộc phải dùng '(就)要……了' mà không thể dùng '快要……了' ('快要……了' không kết hợp với mốc thời gian cụ thể). Từ '就' được thêm vào để nhấn mạnh thời điểm diễn ra rất gần và nhanh chóng.",
    "formation": "(Chủ ngữ + ) Từ chỉ thời gian (+ Chủ ngữ) + (就)要 + Động từ (+ Tân ngữ) + 了",
    "examples": [
      {
        "translation": "Tuần sau chúng tôi sắp thi rồi."
      }
    ]
  },
  "zh_都TIMEAV了_120": {
    "title": "都 + Thời gian / Tính từ / Động từ + 了 (Đã... rồi [nhấn mạnh mức độ cao, thời gian muộn, mang ngữ khí thúc giục hoặc phàn nàn])",
    "shortExplanation": "Cấu trúc '都……了' biểu thị sự việc 'đã... rồi', nhấn mạnh thời gian đã muộn hoặc mức độ đã cao, thường mang sắc thái giục giã hoặc không hài lòng.",
    "longExplanation": "'都……了' (dōu... le) là cấu trúc nhấn mạnh trong khẩu ngữ tiếng Trung, tương đương với '已经……了' (đã... rồi) nhưng mang sắc thái tình cảm rõ rệt hơn. Cấu trúc này thường đi với từ chỉ thời gian, số lượng, tính từ hoặc động từ để biểu thị thời gian đã muộn, tuổi tác đã lớn, số lượng đã nhiều hoặc việc gì đã hoàn thành từ lâu. Người nói thường dùng mẫu câu này để giục giã, phàn nàn, trách móc hoặc khuyên nhủ (ví dụ: 都8点了，快点儿起床吧 - Đã 8 giờ rồi, mau dậy đi).",
    "formation": "Chủ ngữ + 都 + Từ chỉ thời gian / Tính từ / Cụm động từ + 了",
    "examples": [
      {
        "translation": "Đã 8 giờ rồi, dậy mau lên đi!"
      }
    ]
  },
  "zh_V好_121": {
    "title": "Động từ + 好 (Bổ ngữ kết quả: Làm... xong, làm... chu đáo/hoàn thiện)",
    "shortExplanation": "'好' làm bổ ngữ kết quả đứng sau động từ biểu thị hành động đã hoàn thành và đạt đến độ hoàn hảo, thỏa đáng, sẵn sàng.",
    "longExplanation": "Trong tiếng Trung, khi tính từ '好' làm bổ ngữ kết quả đặt trực tiếp sau động từ ('Động từ + 好'), nó không chỉ đơn thuần biểu thị hành động đã kết thúc (như '完') mà còn nhấn mạnh kết quả đạt đến trạng thái hoàn chỉnh, chu đáo, làm người khác hài lòng hoặc đã chuẩn bị sẵn sàng để sử dụng (ví dụ: 饭做好了 - cơm nấu xong rồi, 准备好了 - đã chuẩn bị sẵn sàng, 想好了 - đã suy nghĩ thấu đáo). Dạng phủ định là '没(有) + Động từ + 好' (chưa làm xong/chưa chuẩn bị xong).",
    "formation": "Chủ ngữ + Động từ + 好 (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Cơm vẫn chưa nấu xong, xin bạn đợi một lát."
      }
    ]
  },
  "zh_一MN也都不V_122": {
    "title": "一 + Lượng từ + Danh từ + 也 / 都 + 不 / 没 + Động từ (Phủ định hoàn toàn: một... cũng không...)",
    "shortExplanation": "Dùng để biểu thị sự phủ định hoàn toàn; 'ngay cả một... cũng không...', 'chẳng... chút nào'.",
    "longExplanation": "Trong tiếng Trung, cấu trúc '一 + Lượng từ + Danh từ + 也 / 都 + 不 / 没 + Động từ' được dùng để nhấn mạnh sự phủ định tuyệt đối (hoàn toàn không có ngoại lệ). Người nói sử dụng đơn vị nhỏ nhất là '一 + Lượng từ' kết hợp với phó từ '也' hoặc '都' và từ phủ định '不' (phủ định thói quen, ý chí) hoặc '没' (phủ định hành động chưa xảy ra trong quá khứ hoặc hiện tại) để biểu thị ngay cả một lượng tối thiểu cũng không thực hiện.",
    "formation": "Chủ ngữ + 一 + Lượng từ + Danh từ + 也 / 都 + 不 / 没 + Động từ",
    "examples": [
      {
        "translation": "Tôi một quả táo cũng không ăn. (Tôi chẳng ăn quả táo nào cả.)"
      }
    ]
  },
  "zh_那_123": {
    "title": "那 (Liên từ: Thế thì, vậy thì [dẫn ra kết luận hoặc quyết định])",
    "shortExplanation": "Liên từ '那' đứng đầu phân câu hoặc trước chủ ngữ, biểu thị căn cứ vào tình huống hoặc lời nói phía trước để đưa ra suy luận, quyết định; 'thế thì', 'vậy thì'.",
    "longExplanation": "Trong tiếng Trung, '那' (nà - trong khẩu ngữ đôi khi dùng '那么') thường được dùng làm liên từ ở đầu phân câu sau hoặc đứng trước chủ ngữ để biểu thị sự tiếp nối và chuyển ý. Dựa trên điều kiện, tình huống thực tế hoặc ý kiến mà đối phương vừa nêu ở phân câu trước, người nói dùng '那' để đưa ra phán đoán, kết luận hoặc quyết định tương ứng.",
    "formation": "Phân câu 1，那 + (Chủ ngữ + ) Phân câu 2",
    "examples": [
      {
        "translation": "Bạn không đi, vậy thì tôi cũng không đi nữa."
      }
    ]
  },
  "zh_那也_124": {
    "title": "那也 (Dù vậy thì cũng..., thế thì cũng... [nhượng bộ chuyển ngoặt trong khẩu ngữ])",
    "shortExplanation": "Cụm từ khẩu ngữ dùng để thừa nhận một phần lý do của đối phương nhưng vẫn chuyển hướng nhấn mạnh: 'dù vậy thì cũng không thể...'; 'thế thì cũng...'.",
    "longExplanation": "'那也' (nà yě) là cách diễn đạt chuyển ngoặt mang tính nhượng bộ thường gặp trong giao tiếp hàng ngày. Người nói dùng '那也' để tiếp nhận lý do, hoàn cảnh hoặc lời giải thích mà đối phương vừa đưa ra, nhưng ngay sau đó chỉ ra rằng điều đó không thể là lý do chính đáng để làm một việc gì đó quá mức hoặc không phù hợp, tương đương với 'cho dù như vậy thì cũng...'.",
    "formation": "那也 + Phó từ / Động từ năng nguyện + Động từ",
    "examples": [
      {
        "translation": "A: Tôi đã ôn tập xong từ sớm rồi. B: Thế thì (dù vậy) cũng không thể chơi suốt thế được chứ."
      }
    ]
  },
  "zh_V1了就V2_126": {
    "title": "Động từ 1 + 了 + 就 + Động từ 2 (Hành động kế tiếp: Vừa... xong là... ngay/liền)",
    "shortExplanation": "Biểu thị hai hành động diễn ra liên tiếp nhau; hành động thứ hai lập tức bắt đầu ngay sau khi hành động thứ nhất kết thúc.",
    "longExplanation": "Cấu trúc 'Động từ 1 + 了 + 就 + Động từ 2' dùng để diễn tả sự nối tiếp tức thì của hai hành vi hoặc sự việc. Trợ từ động thái '了' đứng sau động từ thứ nhất biểu thị hành động 1 hoàn thành, và phó từ '就' đứng trước động từ thứ hai biểu thị hành động 2 diễn ra ngay sau đó không chậm trễ. Hai hành động này có thể cùng một chủ ngữ hoặc hai chủ ngữ khác nhau.",
    "formation": "(Chủ ngữ 1 + ) Động từ 1 + 了 (+ Tân ngữ 1)，(Chủ ngữ 2 + ) 就 + Động từ 2 (+ Tân ngữ 2)",
    "examples": [
      {
        "translation": "Bố về một cái là chúng ta ăn cơm liền."
      }
    ]
  },
  "zh_V来去_127": {
    "title": "Động từ + 来 / 去 (Bổ ngữ xu hướng đơn: ... lại đây / ... đi ra)",
    "shortExplanation": "Bổ ngữ xu hướng đơn giản '来' và '去' đứng sau động từ để biểu thị hướng chuyển động hướng về phía người nói ('来') hoặc rời xa người nói ('去').",
    "longExplanation": "Trong tiếng Trung, '来' (lái) và '去' (qù) đặt trực tiếp sau động từ hành động để tạo thành bổ ngữ xu hướng đơn giản. '来' biểu thị động tác có xu hướng di chuyển tiến lại gần vị trí của người nói hoặc điểm quy chiếu; ngược lại, '去' biểu thị động tác có xu hướng di chuyển rời xa vị trí của người nói (ví dụ: 上来 là 'lên đây' khi người nói ở trên lầu, 上去 là 'lên đó' khi người nói ở dưới lầu).",
    "formation": "Chủ ngữ + Động từ + 来 / 去",
    "examples": [
      {
        "translation": "Chúng tôi đang đợi bạn ở trên lầu này, bạn lên đây đi."
      }
    ]
  },
  "zh_Vsomewhere来去_128": {
    "title": "Động từ + Nơi chốn + 来 / 去 (Bổ ngữ xu hướng với tân ngữ nơi chốn [Bắt buộc đặt nơi chốn trước 来/去])",
    "shortExplanation": "Khi động từ có tân ngữ là từ chỉ nơi chốn / địa điểm, tân ngữ BẮT BUỘC phải đứng trước bổ ngữ xu hướng '来' hoặc '去'.",
    "longExplanation": "Đây là một quy tắc ngữ pháp bắt buộc và quan trọng trong tiếng Trung: Khi động từ mang bổ ngữ xu hướng '来' hoặc '去', nếu tân ngữ là từ chỉ nơi chốn/địa điểm (như 家, 教室, 办公室, 北京...), tân ngữ đó bắt buộc phải được đặt ở vị trí giữa động từ và '来/去' theo trật tự: 'Động từ + Nơi chốn + 来 / 去'. Tuyệt đối không được đặt tân ngữ nơi chốn ở phía sau '来/去'.",
    "formation": "Chủ ngữ + Động từ + Danh từ nơi chốn + 来 / 去 (+ 了)",
    "examples": [
      {
        "translation": "Bạn tôi đã về nhà rồi (đi về phía nhà)."
      }
    ]
  },
  "zh_VO来去_129": {
    "title": "Động từ + Tân ngữ (sự vật) + 来 / 去 (Bổ ngữ xu hướng với tân ngữ chỉ vật: Đặt tân ngữ trước 来/去)",
    "shortExplanation": "Khi tân ngữ là danh từ chỉ sự vật thông thường, có thể đặt tân ngữ ở giữa động từ và '来/去'; thường dùng khi biểu thị mệnh lệnh, dự định hoặc hành động chưa hoàn thành.",
    "longExplanation": "Khi động từ mang bổ ngữ xu hướng '来' hoặc '去' và tân ngữ là danh từ chỉ sự vật thông thường (không phải nơi chốn), tiếng Trung có thể đặt tân ngữ chỉ vật ở giữa động từ và bổ ngữ xu hướng: 'Động từ + Tân ngữ + 来 / 去'. Vị trí này rất phổ biến trong các câu cầu khiến, dặn dò, hoặc biểu thị hành động dự định sẽ thực hiện trong tương lai.",
    "formation": "Chủ ngữ + (Trợ động từ + ) Động từ + Tân ngữ (Danh từ chỉ vật) + 来 / 去",
    "examples": [
      {
        "translation": "Ngày mai phải mang bài tập đến nhé."
      }
    ]
  },
  "zh_V来去O_130": {
    "title": "Động từ + 来 / 去 + Tân ngữ (sự vật) (Bổ ngữ xu hướng với tân ngữ chỉ vật: Đặt tân ngữ sau 来/去)",
    "shortExplanation": "Khi tân ngữ là danh từ chỉ sự vật thông thường, tân ngữ cũng có thể đặt ngay sau '来/去'; động từ và bổ ngữ xu hướng kết hợp chặt chẽ thành một khối.",
    "longExplanation": "Đây là cách sắp xếp thứ hai khi động từ mang bổ ngữ xu hướng '来' hoặc '去' và tân ngữ là danh từ chỉ sự vật. Ở cấu trúc này, tân ngữ được đặt ở phía sau cụm 'Động từ + 来 / 去' ('Động từ + 来 / 去 + Tân ngữ'). Khi động từ và '来/去' liền kề nhau, chúng tạo thành một khối liên kết chặt chẽ biểu thị phương hướng di chuyển mang theo vật gì. Cả hai cách đặt trước và sau '来/去' đều được sử dụng tự nhiên trong giao tiếp.",
    "formation": "Chủ ngữ + (Trợ động từ + ) Động từ + 来 / 去 + Tân ngữ (Danh từ chỉ vật)",
    "examples": [
      {
        "translation": "Ngày mai phải mang bài tập đến nhé."
      }
    ]
  },
  "zh_能吗_131": {
    "title": "能……吗？ (Câu phản vấn: Có thể... được sao?, Làm sao mà... được chứ?)",
    "shortExplanation": "Mẫu câu phản vấn dùng động từ năng nguyện '能' để khẳng định mạnh mẽ rằng sự việc không thể nào xảy ra hoặc không hợp lý; 'làm sao mà... được?'.",
    "longExplanation": "'能……吗？' (néng... ma?) là cấu trúc câu phản vấn (nghi vấn tu từ) rất quen thuộc trong tiếng Trung. Người nói dùng hình thức câu hỏi khẳng định với trợ động từ '能' để truyền tải ý nghĩa phủ định dứt khoát: 'tuyệt đối không thể nào...'. Mẫu câu này thường dùng khi trách móc, phê bình, chất vấn hoặc khuyên bảo đối phương khi nhận thấy hành động của đối phương vô lý hoặc không thể đem lại kết quả tốt.",
    "formation": "(Chủ ngữ + ) 能 + Cụm động từ / Cụm tính từ + 吗？",
    "examples": [
      {
        "translation": "Cậu không làm bài tập, cũng chẳng chịu luyện tập, thì làm sao học tốt tiếng Trung được chứ?"
      }
    ]
  },
  "zh_N1还是N2_132": {
    "title": "Danh từ 1 / Phân câu 1 + 还是 + Danh từ 2 / Phân câu 2？ (Câu hỏi lựa chọn: ... hay là...?)",
    "shortExplanation": "Dùng liên từ '还是' trong câu nghi vấn để đưa ra hai hoặc nhiều sự lựa chọn nhằm hỏi người đối thoại xem chọn phương án nào.",
    "longExplanation": "'还是' (háishi) là liên từ dùng trong câu hỏi lựa chọn trong tiếng Trung. Cấu trúc này liên kết hai (hoặc nhiều hơn) danh từ, cụm từ hoặc phân câu mang tính chất loại trừ lẫn nhau, yêu cầu người nghe chọn lấy một trong các phương án đó ('... hay là...?'). Đây là điểm ngữ pháp căn bản và quan trọng nhất cần phân biệt: Trong câu hỏi trực tiếp yêu cầu lựa chọn, bắt buộc dùng '还是', tuyệt đối không được dùng '或者'.",
    "formation": "(Chủ ngữ + ) Lựa chọn 1 + 还是 + Lựa chọn 2？",
    "examples": [
      {
        "translation": "Bạn muốn uống cà phê hay là uống trà?"
      }
    ]
  },
  "zh_N1或者N2_133": {
    "title": "Danh từ 1 / Phân câu 1 + 或者 + Danh từ 2 / Phân câu 2 (Liên từ lựa chọn trong câu trần thuật: Hoặc là, hoặc)",
    "shortExplanation": "Dùng liên từ '或者' trong câu trần thuật để biểu thị sự lựa chọn giữa các khả năng hoặc phương án; 'hoặc là...', 'hoặc...'.",
    "longExplanation": "'或者' (huòzhě) là liên từ biểu thị quan hệ lựa chọn được dùng chuyên biệt trong câu trần thuật (miêu tả, khẳng định, giả định). Cấu trúc liên kết các từ, cụm từ hoặc phân câu để chỉ ra rằng bất kỳ phương án nào trong số đó cũng đều có thể xảy ra hoặc được chấp nhận. Khác biệt cốt lõi với '还是': '或者' dùng trong câu trần thuật để liệt kê các khả năng, không dùng trong câu hỏi trực tiếp để bắt người nghe chọn lựa.",
    "formation": "Lựa chọn 1 + 或者 + Lựa chọn 2",
    "examples": [
      {
        "translation": "Khi trời lạnh hoặc khi làm việc mệt mỏi, uống một tách trà nóng rất dễ chịu."
      }
    ]
  },
  "zh_N1还是N2_134": {
    "title": "Phân câu 1 + 还是 + Phân câu 2 (Mệnh đề nghi vấn gián tiếp trong câu trần thuật: ... hay là...)",
    "shortExplanation": "Dùng '还是' trong mệnh đề phụ mang ý nghĩa phân vân, chưa quyết định hoặc nghi vấn gián tiếp (đứng sau các động từ như '想', '知道', '决定').",
    "longExplanation": "Mặc dù toàn bộ câu là câu trần thuật (kết thúc bằng dấu chấm), nhưng khi phân câu làm tân ngữ đứng sau các động từ biểu thị nhận thức, suy nghĩ hoặc quyết định (như 还没想好 - chưa nghĩ xong, 不知道 - không biết, 决定不了 - chưa quyết định được, 考虑 - cân nhắc) mang tính chất phân vân giữa các khả năng, tiếng Trung bắt buộc phải dùng '还是' chứ KHÔNG ĐƯỢC dùng '或者'. Cấu trúc này diễn đạt mệnh đề câu hỏi gián tiếp: 'liệu là A hay là B'.",
    "formation": "Chủ ngữ + Động từ nhận thức/chưa quyết định + Lựa chọn 1 + 还是 + Lựa chọn 2",
    "examples": [
      {
        "translation": "Tôi vẫn chưa nghĩ xong là nên đi leo núi hay là đi xem phim."
      }
    ]
  },
  "zh_PLACEV着N_135": {
    "title": "Từ chỉ nơi chốn + Động từ + 着 + Danh từ (Câu tồn hiện: Ở đâu đó đang để/treo/nằm/ngồi... cái gì)",
    "shortExplanation": "Dùng từ chỉ nơi chốn làm chủ ngữ kết hợp với 'Động từ + 着' để miêu tả trạng thái tĩnh của người hoặc vật đang tồn tại ở một vị trí cụ thể.",
    "longExplanation": "Đây là cấu trúc câu tồn hiện (câu tồn tại) điển hình trong tiếng Trung. Từ chỉ nơi chốn/địa điểm đứng ở đầu câu làm chủ ngữ, theo sau là động từ vị ngữ kết hợp với trợ từ động thái '着', và cuối cùng là danh từ biểu thị đối tượng tồn tại ('Từ chỉ nơi chốn + Động từ + 着 + Danh từ'). Cấu trúc dùng để miêu tả khách quan một trạng thái tĩnh đang duy trì ở một không gian nào đó (như 放着 - đang để, 挂着 - đang treo, 坐着 - đang ngồi, 躺着 - đang nằm, 停着 - đang đỗ xe). Danh từ phía sau thường là danh từ vô định, đi kèm với số lượng từ.",
    "formation": "Từ chỉ nơi chốn + Động từ + 着 + (Số từ + Lượng từ + ) Danh từ",
    "examples": [
      {
        "translation": "Trên bàn có để một tách cà phê."
      }
    ]
  },
  "zh_PLACE没V着N_136": {
    "title": "Từ chỉ nơi chốn + 没(有) + Động từ + 着 + Danh từ (Phủ định của câu tồn hiện: Ở đâu đó không có để/treo/đặt... cái gì)",
    "shortExplanation": "Dạng phủ định của câu tồn hiện; dùng phó từ '没' hoặc '没有' đặt trước động từ để biểu thị ở địa điểm nào đó không tồn tại sự vật trong trạng thái đó.",
    "longExplanation": "Để phủ định câu tồn hiện có chứa trợ từ động thái '着', tiếng Trung đặt phó từ phủ định '没' hoặc '没有' ngay trước động từ (tuyệt đối không dùng '不'). Cấu trúc 'Từ chỉ nơi chốn + 没(有) + Động từ + 着 + Danh từ' dùng để thông báo rằng tại một vị trí cụ thể nào đó không có đồ vật hay người duy trì trạng thái đó. Điểm ngữ pháp rất quan trọng cần lưu ý: Trong thể phủ định của câu tồn hiện, danh từ đứng sau thường không đi kèm với số từ và lượng từ.",
    "formation": "Từ chỉ nơi chốn + 没(有) + Động từ + 着 + Danh từ",
    "examples": [
      {
        "translation": "Trên bàn không có đặt cà phê."
      }
    ]
  },
  "zh_会VA的_137": {
    "title": "会 + Động từ / Tính từ + (的) (Biểu thị khả năng, ước đoán: Sẽ... đấy, nhất định sẽ...)",
    "shortExplanation": "Động từ năng nguyện '会' kết hợp với trợ từ ngữ khí '的' ở cuối câu để dự đoán sự việc rất có khả năng hoặc chắc chắn sẽ xảy ra; 'sẽ... đấy'.",
    "longExplanation": "Trong tiếng Trung, động từ năng nguyện '会' (huì) ngoài nghĩa chỉ kỹ năng qua học hỏi còn biểu thị khả năng hoặc sự ước đoán về một sự việc sẽ diễn ra trong tương lai ('sẽ...'). Khi đi kèm với trợ từ ngữ khí '的' ở cuối câu ('会……的'), cấu trúc này làm tăng mạnh ngữ khí khẳng định, đảm bảo hoặc cảnh báo của người nói, nhấn mạnh rằng sự việc hoặc trạng thái đó nhất định sẽ xảy ra.",
    "formation": "Chủ ngữ + 会 + Động từ / Tính từ (+ Tân ngữ) + (的)",
    "examples": [
      {
        "translation": "Bạn mặc ít như thế, sẽ bị cảm cúm đấy."
      }
    ]
  },
  "zh_又又_138": {
    "title": "又……又…… (Vừa... lại vừa...)",
    "shortExplanation": "Dùng để liên kết hai tính từ hoặc động từ cùng tính chất, biểu thị hai đặc điểm hoặc hành động cùng tồn tại đồng thời; 'vừa... lại vừa...'.",
    "longExplanation": "Cấu trúc liên từ/phó từ sóng đôi '又……又……' dùng để nối hai đặc tính, trạng thái hoặc hành động cùng tồn tại ở một chủ thể. Hai từ hoặc cụm từ đi sau '又' thường thuộc cùng một từ loại (thường là tính từ hoặc động từ) và phải nhất quán về mặt sắc thái nghĩa (cùng mang ý tích cực khen ngợi hoặc cùng mang ý tiêu cực chê bai, ví dụ: '又大又甜' - vừa to vừa ngọt, '又累又渴' - vừa mệt vừa khát; không thể kết hợp một đặc điểm tốt với một đặc điểm xấu). Tương đương với 'vừa... vừa...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 又 + Tính từ 1 / Động từ 1 + 又 + Tính từ 2 / Động từ 2",
    "examples": [
      {
        "translation": "Quả dưa hấu này vừa to lại vừa ngọt."
      }
    ]
  },
  "zh_V1着V2_139": {
    "title": "Động từ 1 + 着 + (Tân ngữ 1 + ) Động từ 2 (Hành động 1 làm phương thức/trạng thái kèm theo cho hành động 2: vừa... vừa...)",
    "shortExplanation": "Dùng hai động từ liên tiếp với '着' đặt sau động từ thứ nhất để biểu thị hành động hoặc trạng thái 1 đóng vai trò là phương thức, tư thế kèm theo khi tiến hành hành động chính 2.",
    "longExplanation": "Trong cấu trúc liên động 'Động từ 1 + 着 + (Tân ngữ 1 + ) Động từ 2 (+ Tân ngữ 2)', trợ từ động thái '着' đi kèm hành động thứ nhất biểu thị trạng thái đang diễn ra hoặc tư thế, phương thức mà nhờ đó hành động thứ hai (hành động trọng tâm) được tiến hành. Ví dụ: '站着说话' (đứng nói chuyện), '听着音乐看书' (nghe nhạc đọc sách), '吃着苹果写作业' (vừa ăn táo vừa làm bài tập). Hành động 1 đóng vai trò làm trạng ngữ chỉ phương thức hoặc tình thái cho động từ chính 2.",
    "formation": "Chủ ngữ + Động từ 1 + 着 + (Tân ngữ 1 + ) Động từ 2 + (Tân ngữ 2)",
    "examples": [
      {
        "translation": "Em trai vừa ăn táo vừa làm bài tập."
      }
    ]
  },
  "zh_A了_140": {
    "title": "Tính từ + 了 (Biến chuyển trạng thái: đã... rồi, trở nên...)",
    "shortExplanation": "Trợ từ ngữ khí '了' đứng cuối cụm tính từ biểu thị trạng thái đã có sự thay đổi, phát sinh tình huống mới; 'đã... rồi', 'trở nên... hơn'.",
    "longExplanation": "Khi trợ từ ngữ khí '了' đặt sau tính từ (hoặc cụm tính từ), nó biểu thị sự biến chuyển trạng thái (hiện tượng thay đổi, xuất hiện tình huống hoặc đặc điểm mới so với trước đó). Chẳng hạn: '天气冷了' (trời trở lạnh rồi - trước đó không lạnh), '身体好了' (sức khỏe đã tốt lên rồi), '好一些了' (đã đỡ hơn một chút rồi). '了' ở đây là trợ từ ngữ khí biểu thị biến hóa tình thế, không phải trợ từ động thái hoàn thành.",
    "formation": "Chủ ngữ + (Phó từ mức độ + ) Tính từ + 了",
    "examples": [
      {
        "translation": "Hôm qua uống thuốc cảm, bây giờ đã đỡ hơn một chút rồi."
      }
    ]
  },
  "zh_V了_141": {
    "title": "Động từ / Cụm động từ + 了 (Biến chuyển tình huống mới: trước đây không... nay đã... rồi)",
    "shortExplanation": "Trợ từ ngữ khí '了' đứng cuối câu biểu thị một tình huống hoặc khả năng mới xuất hiện (trước đây chưa từng hoặc không thể làm, nhưng nay thì đã làm/có thể làm được rồi).",
    "longExplanation": "Trợ từ ngữ khí '了' đặt ở cuối câu vị ngữ động từ dùng để biểu thị sự thay đổi tình huống, sự ra đời của một trạng thái hoặc năng lực mới so với trước kia (trước đây không diễn ra, nhưng hiện tại bắt đầu diễn ra). Đặc biệt khi kết hợp với động từ năng nguyện (như 可以, 能, 会) hoặc mốc thời gian '现在' (bây giờ), câu mang nghĩa 'bây giờ đã có thể / đã bắt đầu... rồi' (ví dụ: '我可以穿漂亮的裙子了' - Bây giờ tôi đã có thể mặc váy đẹp rồi - ngụ ý trước đây vì lý do nào đó như béo hay trời lạnh mà không mặc được). Cần phân biệt với '了' biểu thị hoàn thành động tác.",
    "formation": "(Thời gian + ) Chủ ngữ + (Động từ năng nguyện + ) Động từ + (Tân ngữ + ) 了",
    "examples": [
      {
        "translation": "Bây giờ tôi đã có thể mặc váy đẹp rồi."
      }
    ]
  },
  "zh_越来越A了_142": {
    "title": "越来越 + Tính từ + (了) (Càng ngày càng...)",
    "shortExplanation": "Phó từ '越来越' đi trước tính từ (thường kèm '了' ở cuối câu) để biểu thị mức độ của tính chất, đặc điểm tăng dần theo thời gian; 'ngày càng...', 'càng ngày càng...'.",
    "longExplanation": "Cấu trúc '越来越 + Tính từ + (了)' dùng để diễn tả mức độ phát triển lũy tiến của trạng thái hoặc tính chất theo thời gian, tương đương với 'càng ngày càng...', 'ngày càng...' trong tiếng Việt. Trợ từ ngữ khí '了' ở cuối câu thường được dùng kèm để chỉ rõ sự biến chuyển tăng dần của trạng thái. Lưu ý: sau '越来越' tuyệt đối không dùng thêm các phó từ chỉ mức độ khác như '很', '非常', '太', '十分' (không nói *越来越很帅).",
    "formation": "Chủ ngữ + (Thời gian + ) 越来越 + Tính từ + (了)",
    "examples": [
      {
        "translation": "Dạo này cậu càng ngày càng đẹp trai đấy."
      }
    ]
  },
  "zh_V得RESULT_143": {
    "title": "Động từ + 得 + Bổ ngữ kết quả (Bổ ngữ khả năng khẳng định: có thể... được)",
    "shortExplanation": "Dùng trợ từ '得' chen giữa động từ và bổ ngữ kết quả để tạo thành bổ ngữ khả năng dạng khẳng định, biểu thị có đủ điều kiện hoặc năng lực để đạt được kết quả của hành động.",
    "longExplanation": "Bổ ngữ khả năng trong tiếng Trung được dùng để biểu thị trong điều kiện chủ quan hoặc khách quan nhất định, hành động có thể đạt được một kết quả nào đó hay không. Ở dạng khẳng định, trợ từ '得' được chèn vào giữa động từ và bổ ngữ kết quả: 'Động từ + 得 + Bổ ngữ kết quả' (ví dụ: 看得清楚 - nhìn rõ được, 听得懂 - nghe hiểu được, 做得完 - làm xong được). Khi mang tân ngữ, tân ngữ thường đặt sau bổ ngữ khả năng hoặc chuyển lên đầu câu làm chủ đề.",
    "formation": "Chủ ngữ + Động từ + 得 + Bổ ngữ kết quả + (Tân ngữ)",
    "examples": [
      {
        "translation": "Tôi có thể nhìn rõ chữ Hán đó."
      }
    ]
  },
  "zh_V得DIRECTION_144": {
    "title": "Động từ + 得 + Bổ ngữ phương hướng (Bổ ngữ khả năng phương hướng: có thể... lên/vào/lại được)",
    "shortExplanation": "Dùng trợ từ '得' chen giữa động từ và bổ ngữ phương hướng để biểu thị có khả năng thực hiện hành động theo một phương hướng nhất định.",
    "longExplanation": "Khi trợ từ '得' được đặt giữa động từ và bổ ngữ phương hướng (đơn như 来, 去; hoặc phức như 上来, 下去, 出来, 进去...), cấu trúc này tạo thành bổ ngữ khả năng chỉ phương hướng dạng khẳng định, biểu thị chủ thể có đủ khả năng hoặc điều kiện để tiến hành động tác theo hướng đó (ví dụ: 上得来 - có thể lên đây được, 进得去 - có thể vào trong được, 爬得上去 - có thể leo lên được). Thường dùng trong câu hỏi nghi vấn với '吗' hoặc khẳng định năng lực.",
    "formation": "Chủ ngữ + Động từ + 得 + Bổ ngữ phương hướng + (Tân ngữ)",
    "examples": [
      {
        "translation": "Tòa nhà cao như vậy, bạn có leo lên được (đây) không?"
      }
    ]
  },
  "zh_V不result_145": {
    "title": "Động từ + 不 + Bổ ngữ kết quả (Bổ ngữ khả năng phủ định: không thể... được)",
    "shortExplanation": "Dùng phó từ phủ định '不' chèn vào giữa động từ và bổ ngữ kết quả để biểu thị không thể đạt được kết quả của hành động do thiếu điều kiện hoặc năng lực.",
    "longExplanation": "Đây là dạng phủ định của bổ ngữ khả năng trong tiếng Trung. Bằng cách đặt '不' vào giữa động từ và bổ ngữ kết quả ('Động từ + 不 + Bổ ngữ kết quả'), cấu trúc biểu thị rằng vì thiếu điều kiện chủ quan hoặc khách quan mà không thể thực hiện hành động để dẫn đến kết quả mong muốn (ví dụ: 找不到 - không tìm thấy được, 看不清 - nhìn không rõ, 听不懂 - nghe không hiểu, 做不完 - làm không xong). Trong giao tiếp hàng ngày, dạng phủ định này được sử dụng phổ biến hơn nhiều so với dạng khẳng định 'Động từ + 得 + Bổ ngữ kết quả'.",
    "formation": "Chủ ngữ + Động từ + 不 + Bổ ngữ kết quả + (Tân ngữ)",
    "examples": [
      {
        "translation": "Tôi không tìm thấy quán ăn ngon nào cả."
      }
    ]
  },
  "zh_V不direction_146": {
    "title": "Động từ + 不 + Bổ ngữ phương hướng (Bổ ngữ khả năng phủ định với phương hướng: không thể... lên/qua/vào được)",
    "shortExplanation": "Dùng phó từ phủ định '不' chèn vào giữa động từ và bổ ngữ phương hướng để biểu thị không thể tiến hành hành động theo một phương hướng nhất định do gặp trở ngại hoặc thiếu sức lực.",
    "longExplanation": "Cấu trúc 'Động từ + 不 + Bổ ngữ phương hướng' là dạng phủ định của bổ ngữ khả năng chỉ phương hướng. Khi có vật cản khách quan (như quá cao, quá hẹp, quá xa) hoặc năng lực chủ quan không đủ (như mệt mỏi, sợ hãi), người nói sử dụng cấu trúc này để diễn đạt rằng không thể di chuyển theo hướng đó được (ví dụ: 上不去 - không lên được, 进不去 - không vào được, 过不去 - không qua được, 回不来 - không về được). Tương đương với 'không... lên/vào/về... được' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ + 不 + Bổ ngữ phương hướng + (Tân ngữ)",
    "examples": [
      {
        "translation": "Tòa nhà cao quá, tôi không leo lên nổi."
      }
    ]
  },
  "zh_N呢_147": {
    "title": "Danh từ + 呢？ (Hỏi vị trí, tung tích: ...đâu rồi?)",
    "shortExplanation": "Trợ từ ngữ khí '呢' đi trực tiếp sau danh từ hoặc đại từ trong câu hỏi tĩnh lược để hỏi về vị trí, tung tích của người hoặc vật ('...đâu rồi?').",
    "longExplanation": "Khi trợ từ ngữ khí '呢' đi trực tiếp sau một danh từ, cụm danh từ hoặc đại từ mà không có động từ vị ngữ, nó tạo thành câu hỏi tĩnh lược đặc biệt dùng để truy tìm tung tích hoặc vị trí hiện tại của đối tượng đó, tương đương với '... ở đâu rồi?', '... đâu rồi?' trong tiếng Việt (ví dụ: '你的书呢？' = Sách của bạn đâu rồi?, '我妈妈呢？' = Mẹ tôi đâu rồi?). Nghĩa này tương đương với mẫu câu hỏi hoàn chỉnh '... 在哪儿？'.",
    "formation": "Danh từ / Đại từ + 呢？",
    "examples": [
      {
        "translation": "Sách của cậu đâu rồi?"
      }
    ]
  },
  "zh_刚V_148": {
    "title": "刚 + Động từ (Phó từ: vừa mới...)",
    "shortExplanation": "Phó từ '刚' đứng trước động từ để biểu thị hành động hoặc tình huống vừa mới xảy ra cách đây không lâu; 'vừa...', 'vừa mới...'.",
    "longExplanation": "Phó từ '刚' (gāng) đặt ngay trước động từ hoặc cụm vị ngữ để chỉ hành động hoặc sự việc xảy ra trong khoảng thời gian rất gần với thời điểm nói hoặc thời điểm được đề cập (mang tính cảm nhận chủ quan của người nói rằng thời gian vừa trôi qua rất ngắn). Vì '刚' là phó từ, nó bắt buộc phải đứng sau chủ ngữ và đứng ngay trước động từ (không thể đứng trước chủ ngữ như danh từ chỉ thời gian '刚才'). Phía sau động từ thường kết hợp với các bổ ngữ kết quả như '完', '好', '到' (ví dụ: 刚做完 - vừa làm xong, 刚来 - vừa mới đến).",
    "formation": "Chủ ngữ + 刚 + Động từ + (Bổ ngữ kết quả + Tân ngữ)",
    "examples": [
      {
        "translation": "Con trai vừa mới làm xong bài tập."
      }
    ]
  },
  "zh_刚才_149": {
    "title": "刚才 (Danh từ thời gian: vừa nãy, lúc nãy, vừa rồi)",
    "shortExplanation": "Danh từ chỉ thời gian '刚才' chỉ khoảng thời gian ngắn trước thời điểm nói ('vừa nãy', 'lúc nãy'); có thể đứng trước hoặc sau chủ ngữ.",
    "longExplanation": "Khác với phó từ '刚', '刚才' (gāngcái) là một danh từ chỉ thời gian, dùng để chỉ một mốc hoặc khoảng thời gian khách quan vừa mới trôi qua cách đây vài phút hoặc trong chốc lát trước thời điểm hiện tại. Vì mang tính chất của danh từ thời gian, '刚才' có thể đứng trước chủ ngữ ở đầu câu ('刚才 + Chủ ngữ...') hoặc đứng sau chủ ngữ ('Chủ ngữ + 刚才...'). Nó cũng có thể kết hợp với phó từ chỉ trạng thái đang diễn ra như '在' ('刚才在做作业' - lúc nãy đang làm bài tập) hoặc đứng độc lập để trả lời câu hỏi về thời gian.",
    "formation": "刚才 + Chủ ngữ + Vị ngữ / Chủ ngữ + 刚才 + Vị ngữ",
    "examples": [
      {
        "translation": "Vừa nãy con trai đang làm bài tập."
      }
    ]
  },
  "zh_V了DURATIONO_150": {
    "title": "Động từ + 了 + Thời lượng + Tân ngữ (Bổ ngữ thời lượng: hành động đã diễn ra trong bao lâu và đã kết thúc)",
    "shortExplanation": "Dùng bổ ngữ thời lượng đứng sau 'Động từ + 了' để biểu thị hành động đã kéo dài trong một khoảng thời gian nhất định trong quá khứ và hiện tại đã kết thúc.",
    "longExplanation": "Khi muốn biểu thị khoảng thời gian mà một hành động diễn ra khi động từ có mang tân ngữ, tiếng Trung sử dụng cấu trúc bổ ngữ thời lượng: 'Động từ + 了 + Thời lượng + (的 + ) Tân ngữ'. Lưu ý quan trọng: vì cuối câu KHÔNG có trợ từ '了' thứ hai, cấu trúc này nhấn mạnh rằng hành động đó đã diễn ra trong khoảng thời gian đó và HIỆN TẠI ĐÃ HOÀN TOÀN KẾT THÚC, không còn tiếp diễn nữa (ví dụ: '我们坐了一个小时公共汽车' - Chúng tôi đã đi xe buýt suốt một tiếng đồng hồ, ngụ ý hiện tại đã xuống xe, không còn ngồi nữa). Cần phân biệt rõ với cấu trúc có thêm '了' ở cuối câu biểu thị hành động vẫn đang tiếp tục.",
    "formation": "Chủ ngữ + Động từ + 了 + Thời lượng + (的 + ) Tân ngữ",
    "examples": [
      {
        "translation": "Chúng tôi đã đi xe buýt suốt một tiếng đồng hồ."
      }
    ]
  },
  "zh_V了DURATIONO了_151": {
    "title": "Động từ + 了 + Thời lượng + Tân ngữ + 了 (Đã làm gì được bao lâu rồi và vẫn đang tiếp tục)",
    "shortExplanation": "Dùng hai chữ '了' (một sau động từ, một ở cuối câu) kết hợp với bổ ngữ thời lượng để biểu thị hành động đã kéo dài được một khoảng thời gian và hiện tại vẫn đang tiếp tục diễn ra.",
    "longExplanation": "Khác với cấu trúc chỉ có một chữ '了' sau động từ, mẫu câu 'Động từ + 了 + Thời lượng + Tân ngữ + 了' sử dụng đồng thời cả trợ từ động thái '了' (sau động từ) và trợ từ ngữ khí '了' (cuối câu). Sự xuất hiện của '了' cuối câu đóng vai trò then chốt: nó biểu thị sự kéo dài liên tục của hành động tính từ quá khứ cho đến thời điểm nói và HIỆN TẠI VẪN ĐANG TIẾP TỤC, trong tương lai có thể còn tiếp diễn nữa (ví dụ: '我学习了一年汉语了' = Tôi đã học tiếng Trung được một năm rồi - ngụ ý hiện tại vẫn đang theo học, chưa dừng lại). Tương đương với thì hiện tại hoàn thành tiếp diễn trong ngữ pháp.",
    "formation": "Chủ ngữ + Động từ + 了 + Thời lượng + (的 + ) Tân ngữ + 了",
    "examples": [
      {
        "translation": "Tôi đã học tiếng Trung được một năm rồi (và hiện vẫn đang học tiếp)."
      }
    ]
  },
  "zh_对N感兴趣有兴趣_152": {
    "title": "对 + Danh từ + 感兴趣 / 有兴趣 (Có hứng thú / yêu thích đối với...)",
    "shortExplanation": "Dùng giới từ '对' để dẫn ra đối tượng mà chủ ngữ nảy sinh hứng thú, sở thích hoặc sự quan tâm; 'có hứng thú với...', 'quan tâm đến...'.",
    "longExplanation": "Cấu trúc giới từ '对 + Danh từ + 感兴趣 / 有兴趣' dùng để biểu thị sự quan tâm, niềm say mê hoặc sự thích thú của người nói đối với một lĩnh vực, sự vật, con người hoặc hoạt động nào đó. Trong đó, '对' là giới từ mang nghĩa 'đối với/với', đi kèm danh từ làm trạng ngữ đứng trước cụm '感兴趣' (cảm thấy hứng thú) hoặc '有兴趣' (có hứng thú). Nếu muốn biểu thị mức độ hứng thú (rất thích, cực kỳ quan tâm), phó từ mức độ (như 很, 非常, 极, 不太) phải đặt TRƯỚC '感兴趣' hoặc '有兴趣', không đặt trước '对' (ví dụ: 对中国电影很感兴趣; dạng phủ định là '对……不感兴趣 / 没有兴趣').",
    "formation": "Chủ ngữ + 对 + Danh từ (Đối tượng) + (Phó từ mức độ + ) 感兴趣 / 有兴趣",
    "examples": [
      {
        "translation": "Họ có hứng thú với phim điện ảnh Trung Quốc."
      }
    ]
  },
  "zh_对N没兴趣_153": {
    "title": "对 + Danh từ + 没兴趣 (Không có hứng thú / Không quan tâm đến...)",
    "shortExplanation": "Dùng giới từ '对' dẫn ra đối tượng kết hợp với '没兴趣' (hoặc '没有兴趣') để biểu thị không có hứng thú, không quan tâm hay say mê đối với sự vật, lĩnh vực nào đó.",
    "longExplanation": "Cấu trúc '对 + Danh từ + 没兴趣' (dạng đầy đủ là '对……没有兴趣') là dạng phủ định của '对……有兴趣', dùng để biểu đạt sự thiếu quan tâm, thờ ơ hoặc không hề thích thú trước một đối tượng, hoạt động hay lĩnh vực cụ thể. Trong cấu trúc này, '对' là giới từ mang nghĩa 'đối với/với', đi cùng danh từ tạo thành cụm giới từ làm trạng ngữ đứng trước cụm vị ngữ '没兴趣'. Có thể thêm phó từ chỉ mức độ phủ định như '一点儿也/都没兴趣' (hoặc '不太有兴趣') để gia giảm sắc thái nghĩa. Tương đương với 'không có hứng thú với...', 'không thích...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 对 + Danh từ (Đối tượng) + 没兴趣 / 没有兴趣",
    "examples": [
      {
        "translation": "Họ không có hứng thú với phim điện ảnh Trung Quốc."
      }
    ]
  },
  "zh_半_154": {
    "title": "Số từ + 点 + 半 (Cách nói giờ rưỡi: ... giờ rưỡi / ... giờ 30 phút)",
    "shortExplanation": "Từ '半' (bàn - rưỡi, nửa) được đặt sau từ chỉ giờ '点' để biểu thị thời điểm đúng 30 phút (giờ rưỡi).",
    "longExplanation": "Trong tiếng Trung, khi biểu đạt thời điểm (xem giờ), từ '半' có nghĩa là 'nửa/rưỡi' (tương đương 30 phút). Nó được đặt ngay sau từ chỉ giờ '点' (hoặc '点钟') theo công thức 'Số từ + 点 + 半'. Ví dụ: '七点半' (bảy giờ rưỡi / 7:30), '十二点半' (mười hai giờ rưỡi / 12:30). Lưu ý phân biệt với '半个小时' biểu thị khoảng thời gian (thời lượng nửa tiếng đồng hồ).",
    "formation": "Số từ + 点 + 半",
    "examples": [
      {
        "translation": "Bây giờ là bảy giờ rưỡi."
      }
    ]
  },
  "zh_一刻_155": {
    "title": "Số từ + 点 + 一刻 (Cách nói giờ hơn 15 phút: ... giờ 15 phút / ... giờ một khắc)",
    "shortExplanation": "Từ '一刻' (yī kè) đặt sau số giờ '点' để biểu thị thời điểm hơn đúng 15 phút (một khắc).",
    "longExplanation": "Trong cách xem giờ của tiếng Trung, '刻' (khắc) là đơn vị đo thời gian tương đương với 15 phút. '一刻' (một khắc) được dùng ngay sau '点' để biểu thị thời điểm hơn 15 phút (ví dụ: '七点一刻' - bảy giờ 15 phút, '九点一刻' - chín giờ 15 phút). Tiếng Trung không dùng *七点两刻 (thay vào đó phải nói '七点半') và khi nói hơn 45 phút thường nói '差一刻八点' hoặc '七点四十五分' (thay vì *七点三刻 trong khẩu ngữ tiêu chuẩn hiện đại).",
    "formation": "Số từ + 点 + 一刻",
    "examples": [
      {
        "translation": "Bây giờ là bảy giờ 15 phút."
      }
    ]
  },
  "zh_一刻钟_156": {
    "title": "一刻钟 (Thời lượng: 15 phút đồng hồ / một khắc)",
    "shortExplanation": "Từ '一刻钟' (yī kè zhōng) dùng làm bổ ngữ thời lượng, biểu thị một khoảng thời gian kéo dài đúng 15 phút.",
    "longExplanation": "Khác với '一刻' thường đi sau '点' để chỉ mốc thời gian (thời điểm 15 phút), '一刻钟' được dùng độc lập làm từ chỉ lượng thời gian (thời đoạn, thời lượng) kéo dài trong 15 phút. Trong câu, '一刻钟' thường đứng sau động từ (kèm '了') để làm bổ ngữ thời lượng, diễn tả hành động hay trạng thái đã duy trì hoặc diễn ra trong 15 phút (ví dụ: '迟到了一刻钟' - đến muộn 15 phút, '等了一刻钟' - đợi suốt 15 phút, '休息一刻钟' - nghỉ ngơi 15 phút). Tương đương với '15 phút', 'một khắc đồng hồ' trong tiếng Việt.",
    "formation": "Động từ + (了 + ) 一刻钟",
    "examples": [
      {
        "translation": "Bạn đến muộn mất 15 phút rồi."
      }
    ]
  },
  "zh_差ch_157": {
    "title": "差 + Số phút / 一刻 + Số giờ + 点 (Cách nói giờ kém: kém ... phút nữa là ... giờ)",
    "shortExplanation": "Động từ/phó từ '差' (chà - thiếu, kém) đặt trước số phút và số giờ để diễn đạt cách nói giờ kém (còn thiếu bao nhiêu phút nữa thì đến mốc giờ đó).",
    "longExplanation": "Trong tiếng Trung, '差' (chà) có nghĩa gốc là 'thiếu, kém'. Khi dùng để xem giờ, '差' được đặt ở đầu cụm chỉ thời gian theo công thức '差 + Số phút / 一刻 + Số giờ + 点' để biểu thị mốc giờ kém, tức còn thiếu bao nhiêu phút nữa thì đến giờ tròn tiếp theo. Ví dụ: '差一刻八点' (kém 15 phút nữa là 8 giờ / 7:45), '差五分十点' (kém 5 phút nữa là 10 giờ / 9:55). Cũng có thể đặt số giờ trước: '八点差一刻'. Tương đương với cách nói 'kém ... giờ' trong tiếng Việt.",
    "formation": "(已经 + ) 差 + Số phút / 一刻 + Số giờ + 点 + (了)",
    "examples": [
      {
        "translation": "Đã là tám giờ kém 15 rồi đấy!"
      }
    ]
  },
  "zh_再V_158": {
    "title": "再 + Động từ (Lại, sẽ lại...: hành động lặp lại trong tương lai hoặc chưa xảy ra)",
    "shortExplanation": "Phó từ '再' đặt trước động từ biểu thị một hành động sẽ lặp lại hoặc tiếp tục diễn ra trong tương lai (hoặc chưa xảy ra); 'lại...', 'sẽ lại...'.",
    "longExplanation": "Phó từ '再' (zài) được dùng trước động từ để biểu thị sự lặp lại hoặc tiếp diễn của một hành vi, trạng thái trong tương lai (hành động chưa phát sinh hoặc sắp sửa thực hiện lại). Ví dụ: '明天再去' (ngày mai lại đi tiếp), '再见' (gặp lại sau), '请再说一遍' (xin hãy nói lại một lần nữa). Điểm ngữ pháp trọng tâm là phân biệt giữa '再' và '又': '再' biểu thị hành động lặp lại chưa xảy ra (thuộc về tương lai hoặc mệnh lệnh, dự định), trong khi '又' biểu thị hành động lặp lại đã phát sinh trong quá khứ hoặc quy luật tất yếu. Tương đương với 'lại', 'tiếp tục' trong tiếng Việt.",
    "formation": "Chủ ngữ + (Thời gian + / 还 / 要 + ) 再 + Động từ + (Tân ngữ)",
    "examples": [
      {
        "translation": "Ngày mai tôi còn muốn đến xem lại lần nữa."
      }
    ]
  },
  "zh_又V_159": {
    "title": "又 + Động từ (Đã lại...: hành động lặp lại đã xảy ra trong quá khứ)",
    "shortExplanation": "Phó từ '又' đặt trước động từ biểu thị một hành động hoặc tình huống đã lặp lại lần nữa trong quá khứ (thường mang sắc thái than phiền, ngạc nhiên hoặc trách móc).",
    "longExplanation": "Phó từ '又' (yòu) được đặt trước động từ để biểu thị hành động hoặc trạng thái đã lặp lại một lần nữa trong quá khứ (việc đã xảy ra). Khác với '再' (dùng cho hành động chưa xảy ra trong tương lai), '又' chỉ hành vi đã hoàn thành hoặc tái diễn trên thực tế. Trong câu hỏi nghi vấn với '怎么' (làm sao mà, sao lại...), cấu trúc '怎么又……' thường mang ngữ khí không hài lòng, ngạc nhiên hoặc trách móc nhẹ (ví dụ: '你今天怎么又迟到了?' - Hôm nay sao cậu lại đến muộn nữa rồi?). Tương đương với 'lại...', 'đã lại... rồi' trong tiếng Việt.",
    "formation": "Chủ ngữ + (Thời gian + ) (怎么 + ) 又 + Động từ + (Tân ngữ + 了)",
    "examples": [
      {
        "translation": "Hôm nay sao bạn lại đi muộn nữa thế?"
      }
    ]
  },
  "zh_SQ1就Q2_160": {
    "title": "Chủ ngữ + Từ để hỏi 1 + 就 + Từ để hỏi 2 (Đại từ nghi vấn dùng linh hoạt: ... gì thì ... nấy / Thích sao làm vậy)",
    "shortExplanation": "Cùng một từ để hỏi được dùng lặp lại hai lần trước và sau phó từ '就', biểu thị hành động phía sau hoàn toàn tùy thuộc hoặc tương ứng với điều kiện phía trước; '... gì thì ... nấy'.",
    "longExplanation": "Cấu trúc 'Chủ ngữ + Từ để hỏi 1 + 就 + Từ để hỏi 2' (hoặc 'Động từ 1 + Từ để hỏi 1 + 就 + Động từ 2 + Từ để hỏi 2') sử dụng cùng một đại từ nghi vấn (như 什么, 哪儿, 谁, 怎么) ở cả hai phân câu trước và sau '就'. Đây là cách dùng phi nghi vấn (phiếm chỉ/linh hoạt) của từ để hỏi: phân câu thứ nhất đưa ra điều kiện hoặc mong muốn, còn phân câu thứ hai biểu thị hành động diễn ra tùy ý, tương ứng hoàn toàn theo điều kiện đó (ví dụ: '想吃什么就吃什么' - muốn ăn gì thì ăn nấy, '想去哪儿就去哪儿' - muốn đi đâu thì đi đó, '怎么好就怎么做' - làm sao tốt thì làm thế ấy). Tương đương với kết cấu '... gì thì ... nấy', '... đâu thì ... đó' trong tiếng Việt.",
    "formation": "Chủ ngữ + (Động từ 1 + ) Từ để hỏi + 就 + (Động từ 2 + ) Từ để hỏi",
    "examples": [
      {
        "translation": "Tôi muốn uống gì thì uống nấy."
      }
    ]
  },
  "zh_S1QS2就Q_161": {
    "title": "Chủ ngữ 1 + Từ để hỏi + Chủ ngữ 2 + 就 + Từ để hỏi (Hai chủ ngữ: Người 1 ... gì thì người 2 ... nấy / Theo ý của người 1)",
    "shortExplanation": "Dùng cùng một từ để hỏi kết hợp với hai chủ ngữ khác nhau nối bởi '就', biểu thị hành động hoặc lựa chọn của chủ ngữ 2 hoàn toàn chiều theo hoặc giống hệt chủ ngữ 1.",
    "longExplanation": "Đây là biến thể hai chủ ngữ của kết cấu nghi vấn phiếm chỉ: 'Chủ ngữ 1 + (Động từ 1 + ) Từ để hỏi + Chủ ngữ 2 + 就 + (Động từ 2 + ) Từ để hỏi'. Cùng một đại từ nghi vấn (như 什么, 哪儿, 谁, 怎么) xuất hiện ở cả hai mệnh đề. Mệnh đề thứ nhất do Chủ ngữ 1 quyết định, và mệnh đề thứ hai biểu thị Chủ ngữ 2 sẽ hành động hoặc lựa chọn tương ứng hệt như vậy (chủ ngữ 2 thuận theo chủ ngữ 1). Ví dụ: '你喝什么我就喝什么' (Cậu uống gì thì tớ uống nấy), '你去哪儿我就去哪儿' (Cậu đi đâu tớ theo đó), '谁赢了我就支持谁' (Ai thắng thì tôi ủng hộ người đó). Rất phổ biến trong giao tiếp hàng ngày thể hiện sự tùy ý, đồng thuận.",
    "formation": "Chủ ngữ 1 + (Động từ 1 + ) Từ để hỏi + Chủ ngữ 2 + 就 + (Động từ 2 + ) Từ để hỏi",
    "examples": [
      {
        "translation": "Bạn uống gì thì tôi uống nấy."
      }
    ]
  },
  "zh_越V1A1越V2A2_162": {
    "title": "越 + Động từ 1 / Tính từ 1 + 越 + Động từ 2 / Tính từ 2 (Càng... càng...)",
    "shortExplanation": "Dùng phó từ '越……越……' kết nối hai động từ hoặc tính từ để biểu thị mức độ của hành động hoặc trạng thái thứ hai tăng dần tương ứng theo sự gia tăng của hành động hoặc trạng thái thứ nhất; 'càng... càng...'.",
    "longExplanation": "Cấu trúc liên từ/phó từ sóng đôi '越……越……' dùng để diễn tả mối quan hệ tỷ lệ thuận lũy tiến giữa hai sự việc: mức độ của hành động/tính chất thứ nhất biến đổi hoặc tăng tiến thì kéo theo mức độ của hành động/tính chất thứ hai cũng biến đổi tăng theo. Đi sau mỗi từ '越' có thể là động từ hoặc tính từ (ví dụ: '越聊越开心' - càng nói chuyện càng vui, '雨越下越大' - mưa càng rơi càng to, '越快越好' - càng nhanh càng tốt, '风越刮越冷' - gió càng thổi càng lạnh). Có thể dùng chung một chủ ngữ hoặc dùng cho hai chủ ngữ khác nhau ('你越说我越糊涂' - cậu càng nói tôi càng lú lẫn). Tương đương với kết cấu 'càng... càng...' trong tiếng Việt.",
    "formation": "(Chủ ngữ + ) 越 + Động từ 1 / Tính từ 1 + 越 + Động từ 2 / Tính từ 2",
    "examples": [
      {
        "translation": "Chúng tôi càng nói chuyện thì lại càng vui vẻ."
      }
    ]
  },
  "zh_N1跟N2一样_163": {
    "title": "Danh từ 1 + 跟 + Danh từ 2 + 一样 (So sánh ngang bằng: ... giống như / giống với ...)",
    "shortExplanation": "Dùng giới từ '跟' (hoặc '和', '同') kết hợp với '一样' để biểu thị hai đối tượng có tính chất, đặc điểm hoặc diện mạo hoàn toàn tương đồng; 'giống như...', 'giống với...'.",
    "longExplanation": "Cấu trúc so sánh ngang bằng 'Danh từ 1 + 跟 + Danh từ 2 + 一样' dùng để diễn tả đối tượng thứ nhất (Danh từ 1) có đặc điểm, trạng thái hoặc vẻ ngoài giống hệt hoặc tương tự như đối tượng thứ hai (Danh từ 2). Trong đó, '跟' là giới từ mang nghĩa 'với, cùng' (có thể thay thế bằng '和' hoặc '同'), còn '一样' giữ vai trò là vị ngữ mang nghĩa 'giống nhau'. Ví dụ: '你的眼睛跟大熊猫一样' (Mắt của bạn giống như gấu trúc vậy - thâm quầng), '这本词典跟那本一样' (Cuốn từ điển này giống cuốn kia). Dạng phủ định là '跟……不一样' (không giống). Tương đương với 'giống như', 'như nhau' trong tiếng Việt.",
    "formation": "Danh từ 1 + 跟 / 和 + Danh từ 2 + 一样",
    "examples": [
      {
        "translation": "Mắt của bạn giống y như mắt gấu trúc vậy."
      }
    ]
  },
  "zh_N1跟N2一样A_164": {
    "title": "Danh từ 1 + 跟 + Danh từ 2 + 一样 + Tính từ (So sánh ngang bằng theo tiêu chí: ... bằng ... / ... như ...)",
    "shortExplanation": "Thêm tính từ vào sau '跟……一样' để so sánh ngang bằng về một tính chất, đặc điểm cụ thể; 'A ... bằng B', 'A ... như B'.",
    "longExplanation": "Cấu trúc 'Danh từ 1 + 跟 + Danh từ 2 + 一样 + Tính từ' là dạng mở rộng của câu so sánh ngang bằng, dùng để chỉ rõ tiêu chí hoặc phương diện so sánh (chiều cao, độ lớn, sắc đẹp, độ khó...) mà hai đối tượng đạt đến mức độ tương đương nhau. Trong đó, tính từ đặt ở cuối làm vị ngữ chính, còn cụm '跟 + Danh từ 2 + 一样' đóng vai trò là trạng ngữ chỉ mức độ (ví dụ: '儿子跟爸爸一样高' - con trai cao bằng bố, '汉语跟英语一样难' - tiếng Trung khó ngang tiếng Anh, '他跑得跟我一样快' - anh ấy chạy nhanh bằng tôi). Dạng phủ định là '跟……不一样 + Tính từ' hoặc phổ biến hơn là dùng '没有' ('没有……那么/这么 + Tính từ'). Tương đương với '... bằng...', '... như...' trong tiếng Việt.",
    "formation": "Danh từ 1 + 跟 / 和 + Danh từ 2 + 一样 + Tính từ",
    "examples": [
      {
        "translation": "Con trai cao bằng bố rồi."
      }
    ]
  },
  "zh_没有N这么那么A_165": {
    "title": "Danh từ 1 + 没有 + Danh từ 2 + (这么 / 那么 + ) Tính từ (So sánh kém: ... không bằng ... / ... không ... như ...)",
    "shortExplanation": "Dùng '没有' kết hợp với danh từ chuẩn so sánh và '这么 / 那么' trước tính từ để biểu thị sự so sánh kém; 'A không ... bằng B'.",
    "longExplanation": "Cấu trúc so sánh kém 'Danh từ 1 + 没有 + Danh từ 2 + (这么/那么) + Tính từ' được sử dụng phổ biến nhất trong tiếng Trung để biểu thị đối tượng 1 không đạt tới mức độ tính chất của đối tượng 2 (tương đương dạng phủ định của câu so sánh '比' hoặc '一样'). Trong đó, '没有' đóng vai trò phủ định so sánh; đại từ chỉ thị '这么' (như thế này - gần người nói) hoặc '那么' (như thế kia - xa người nói) thường được thêm vào trước tính từ để nhấn mạnh mức độ cao của đối tượng làm chuẩn (ví dụ: '我的汉语没有他那么好' - tiếng Trung của tôi không giỏi bằng anh ấy, '今天没有昨天那么冷' - hôm nay không lạnh bằng hôm qua). Tương đương với 'không... bằng...', 'không... như...' trong tiếng Việt.",
    "formation": "Danh từ 1 + 没有 + Danh từ 2 + (这么 / 那么 + ) Tính từ",
    "examples": [
      {
        "translation": "Tiếng Trung của tôi không giỏi bằng anh ấy."
      }
    ]
  },
  "zh_A一点儿一些_166": {
    "title": "Tính từ + 一点儿 / 一些 (Bổ ngữ sai biệt: ... hơn một chút / hơn một ít)",
    "shortExplanation": "Đặt '一点儿' hoặc ' some' sau tính từ làm bổ ngữ chỉ mức độ sai biệt nhẹ; '... hơn một chút', '... hơn một ít'.",
    "longExplanation": "Trong tiếng Trung, khi so sánh hai đối tượng, nếu mức độ chênh lệch giữa chúng là rất nhỏ (không đáng kể), người ta đặt cụm lượng từ '一点儿' (yīdiǎnr - một chút) hoặc '一些' (yīxiē - một ít) ngay sau tính từ để làm bổ ngữ sai biệt: 'Tính từ + 一点儿 / 一些'. Cấu trúc này thường xuất hiện trong câu so sánh có từ '比' (ví dụ: '大山比大卫矮一点儿' - Đại Sơn thấp hơn David một chút, '今天比昨天暖和一些' - hôm nay ấm hơn hôm qua một chút) hoặc dùng độc lập trong câu yêu cầu, mong muốn (ví dụ: '便宜一点儿吧' - rẻ hơn một chút đi, '快一点儿' - nhanh hơn một chút). Cần phân biệt với '有一点儿 + Tính từ' (đứng TRƯỚC tính từ, mang sắc thái tiêu cực phàn nàn: hơi...). Tương đương với '... hơn một chút', '... hơn một tí' trong tiếng Việt.",
    "formation": "(Danh từ 1 + 比 + Danh từ 2 + ) Tính từ + 一点儿 / 一些",
    "examples": [
      {
        "translation": "Đại Sơn thấp hơn David một chút."
      }
    ]
  },
  "zh_A得多多了_167": {
    "title": "Tính từ + 得多 / 多了 (Bổ ngữ mức độ/sai biệt lớn: ... hơn nhiều / ... hơn rất nhiều)",
    "shortExplanation": "Đặt '得多' hoặc '多了' sau tính từ làm bổ ngữ biểu thị mức độ chênh lệch rất lớn giữa hai đối tượng; '... hơn nhiều', '... hơn rất nhiều'.",
    "longExplanation": "Trong câu so sánh hoặc câu vị ngữ tính từ, cụm từ '得多' (dé duō) hoặc '多了' (duō le) được đặt ngay sau tính từ để làm bổ ngữ mức độ (bổ ngữ sai biệt), biểu thị sự chênh lệch giữa hai đối tượng là rất lớn, vượt trội hoàn toàn. Cấu trúc thường dùng trong câu so sánh '比': 'Danh từ 1 + 比 + Danh từ 2 + Tính từ + 得多 / 多了' (ví dụ: '今天的作业比昨天多得多' - bài tập hôm nay nhiều hơn hôm qua rất nhiều, '他比我高得多' - anh ấy cao hơn tôi rất nhiều, '身体好多了' - sức khỏe đã tốt hơn nhiều rồi). Chú ý: trong câu so sánh có '比', KHÔNG được dùng các phó từ mức độ như '很', '非常', '太' trước tính từ (không nói *比昨天很多), mà bắt buộc phải dùng bổ ngữ '得多/多了' đặt ở sau tính từ. Tương đương với 'hơn nhiều', 'hơn rất nhiều' trong tiếng Việt.",
    "formation": "(Danh từ 1 + 比 + Danh từ 2 + ) Tính từ + 得多 / 多了",
    "examples": [
      {
        "translation": "Bài tập hôm nay nhiều hơn hôm qua rất nhiều."
      }
    ]
  },
  "zh_1_168": {
    "title": "Số từ + (Số từ + 1) + Lượng từ + Danh từ (Biểu thị ước lượng bằng hai số từ liền kề: một hai, ba bốn...)",
    "shortExplanation": "Đặt hai số từ liền kề nhau kết hợp với lượng từ và danh từ để biểu thị số lượng ước lượng xấp xỉ; tương đương 'một hai', 'ba bốn' trong tiếng Việt.",
    "longExplanation": "Trong tiếng Trung, để biểu thị số lượng ước chừng hoặc xấp xỉ, người ta thường dùng hai số từ liền kề nhau (như '一两', '两三', '三四', '七八', '八九') đặt trước lượng từ và danh từ theo kết cấu 'Số từ + (Số từ + 1) + Lượng từ + Danh từ'. Khi hai số từ là 1 và 2 đứng liền kề, số 2 bắt buộc dùng '两' chứ không dùng '二' (nói '一两个', không nói *一二个). Đối với các số hàng chục, có thể dùng '二三十', '七八十' v.v. Tương đương với cách nói 'một hai...', 'ba bốn...', 'vài ba...' trong tiếng Việt.",
    "formation": "Số từ + (Số từ + 1) + Lượng từ + Danh từ",
    "examples": [
      {
        "translation": "Mỗi ngày tôi học tiếng Trung khoảng một hai tiếng đồng hồ."
      }
    ]
  },
  "zh_把了_169": {
    "title": "把 + Tân ngữ + Động từ + 了 (Câu chữ 把 biểu thị xử lý hoàn thành: đã làm gì với đối tượng)",
    "shortExplanation": "Dùng giới từ '把' đưa tân ngữ lên trước động từ kết hợp trợ từ ngữ khí/động thái '了' ở cuối để diễn tả hành động xử lý đã tác động xong lên đối tượng, dẫn đến một kết quả hoặc thay đổi.",
    "longExplanation": "Câu chữ 把 (câu xử lý) là một cấu trúc ngữ pháp đặc biệt trong tiếng Trung. Giới từ '把' đem đối tượng chịu tác động (tân ngữ xác định) đặt lên trước động từ vị ngữ, nhấn mạnh hành động xử lý và sự chi phối đối với đối tượng đó. Đi sau động từ bắt buộc phải có thành phần khác chứ không thể đứng đơn độc; trong cấu trúc này, trợ từ '了' đặt sau động từ hoặc cuối câu để biểu thị hành động đã hoàn tất hoặc dẫn đến trạng thái mới. Thường dùng khi người nói muốn nhấn mạnh việc tân ngữ đã bị thay đổi, di chuyển hoặc xử lý thế nào (ví dụ: '我把钱包忘了' - Tôi quên mất ví rồi, '他把作业写完了' - Cậu ấy đã viết xong bài tập rồi).",
    "formation": "Chủ ngữ + 把 + Tân ngữ (Đối tượng xác định) + Động từ + 了",
    "examples": [
      {
        "translation": "Tôi quên mất ví tiền rồi."
      }
    ]
  },
  "zh_不要别没把了_170": {
    "title": "不要 / 别 / 没 + 把 + Tân ngữ + Động từ + (了) (Dạng phủ định của câu chữ 把: Đừng... / Không... đối với tân ngữ)",
    "shortExplanation": "Đặt phó từ phủ định '别', '不要' (đừng...) hoặc '没' (chưa, không...) trước giới từ '把' để khuyên ngăn, cảnh báo không làm việc gì hoặc biểu thị hành động chưa xử lý tân ngữ.",
    "longExplanation": "Trong câu chữ 把, các phó từ phủ định như '别', '不要' (dùng trong câu cầu khiến, mệnh lệnh mang nghĩa 'đừng...') hoặc '没 / 没有' (dùng cho hành vi chưa xảy ra hoặc chưa hoàn thành) bắt buộc phải đứng TRƯỚC giới từ '把', tuyệt đối không được đặt sau động từ. Khi dùng '别把 / 不要把 + Tân ngữ + Động từ + 了', từ '了' ở cuối thường đóng vai trò là trợ từ ngữ khí cảnh báo hoặc nhắc nhở tránh một kết quả xấu không mong muốn (như '别把手机忘了' - Đừng để quên điện thoại đấy nhé, '不要把杯子摔了' - Đừng làm rơi vỡ cốc nhé). Còn đối với '没把', nó biểu thị sự việc chưa được xử lý đến kết quả nào đó. Tương đương với 'đừng...', 'chưa...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 不要 / 别 / 没 + 把 + Tân ngữ + Động từ + (了 / Bổ ngữ)",
    "examples": [
      {
        "translation": "Đừng quên điện thoại đấy nhé."
      }
    ]
  },
  "zh_左右_171": {
    "title": "Số từ (+ Lượng từ + Danh từ) / Mốc thời gian + 左右 (Khoảng, chừng: biểu thị con số hoặc thời điểm xấp xỉ)",
    "shortExplanation": "Từ '左右' (tả hữu) được đặt ngay sau số từ, lượng từ hoặc từ chỉ thời gian để biểu thị số lượng hoặc mốc thời gian xấp xỉ (khoảng, chừng...).",
    "longExplanation": "Trong tiếng Trung, '左右' (zuǒyòu) là từ chỉ độ ước lượng, luôn được đặt ở SAU từ ngữ chỉ số lượng, tuổi tác, chiều cao, cân nặng hoặc mốc thời gian để biểu thị con số xấp xỉ, không tuyệt đối chính xác (dao động trên dưới con số đó). Ví dụ: '十点左右' (khoảng 10 giờ), '三十岁左右' (khoảng 30 tuổi), '一千块左右' (khoảng 1000 tệ), '五个人左右' (chừng 5 người). Lưu ý về vị trí: trong tiếng Việt từ 'khoảng/chừng' đứng trước số từ, nhưng '左右' trong tiếng Trung bắt buộc phải đứng SAU. Tương đương với 'khoảng...', 'chừng...', 'tầm...' trong tiếng Việt.",
    "formation": "Số từ (+ Lượng từ + Danh từ) / Thời gian + 左右",
    "examples": [
      {
        "translation": "Cuối tuần tôi thường thức dậy vào khoảng 10 giờ."
      }
    ]
  },
  "zh_就VA_172": {
    "title": "就 + Động từ / Tính từ (Phó từ '就': sớm, nhanh, thuận lợi hơn dự kiến - đã... rồi / là... ngay)",
    "shortExplanation": "Phó từ '就' đặt trước động từ hoặc tính từ biểu thị hành động hoặc trạng thái diễn ra sớm, nhanh chóng, dễ dàng, mất ít thời gian hoặc thuận lợi hơn so với dự kiến; 'chỉ... là...', 'đã... rồi'.",
    "longExplanation": "Trong ngữ pháp tiếng Trung, phó từ '就' (jiù) mang ngữ khí biểu thị hành vi, sự việc diễn ra sớm hơn, nhanh hơn hoặc thuận lợi hơn so với mong đợi của người nói. Thường đứng sau từ ngữ chỉ thời gian hoặc số lượng ít ỏi để nhấn mạnh tính chất mau chóng hoặc tốn ít thời gian công sức (ví dụ: '坐飞机一个小时就到了' - Đi máy bay chỉ một tiếng là đã đến nơi rồi; '他七点就来了' - Anh ấy 7 giờ đã đến rồi). Đây là điểm ngữ pháp đối lập trực tiếp với phó từ '才' (biểu thị muộn màng, tốn nhiều thời gian, khó khăn hơn dự kiến). Tương đương với 'đã...', 'chỉ... là...', 'ngay...' trong tiếng Việt.",
    "formation": "Thời gian / Điều kiện + 就 + Động từ / Tính từ + (Tân ngữ / 了)",
    "examples": [
      {
        "translation": "Đi máy bay chỉ một tiếng đồng hồ là đến nơi rồi."
      }
    ]
  },
  "zh_才VA_173": {
    "title": "才 + Động từ / Tính từ (Phó từ '才': muộn, chậm, khó khăn hơn dự kiến - mãi mới... / mới...)",
    "shortExplanation": "Phó từ '才' đặt trước động từ hoặc tính từ biểu thị hành động xảy ra muộn màng, tốn nhiều thời gian, chậm chạp hoặc không thuận lợi như mong đợi; 'mãi mới...', 'mới...'.",
    "longExplanation": "Phó từ '才' (cái) được dùng trước động từ hoặc tính từ để biểu thị sự việc, hành động diễn ra muộn, chậm, tốn nhiều thời gian và công sức, hoặc trễ hơn nhiều so với dự tính của người nói. Thường mang sắc thái sốt ruột, than phiền hoặc nhấn mạnh sự muộn màng (ví dụ: '你怎么才来？' - Sao giờ này cậu mới đến thế?; '我等了两个小时他才来' - Tôi đợi suốt hai tiếng đồng hồ anh ấy mới đến). Khác với '就' (thường đi với '了'), câu dùng '才' ở vế sau thường KHÔNG dùng trợ từ '了' biểu thị hoàn thành động tác. Tương đương với 'mãi mới...', 'đến tận... mới...' trong tiếng Việt.",
    "formation": "Chủ ngữ / Thời gian (muộn) + 才 + Động từ / Tính từ + (Tân ngữ)",
    "examples": [
      {
        "translation": "Sao bây giờ bạn mới đến thế? (Sao bạn đến muộn vậy?)"
      }
    ]
  },
  "zh_把OV在到PLACE_174": {
    "title": "把 + Tân ngữ + Động từ + 在 / 到 + Nơi chốn (Câu chữ 把 kết hợp bổ ngữ chỉ nơi chốn: đặt, để, chuyển... đối tượng ở/vào đâu)",
    "shortExplanation": "Dùng câu chữ '把' kết hợp với động từ và cụm giới từ chỉ nơi chốn '在 / 到 + Nơi chốn' làm bổ ngữ để biểu thị hành động làm đối tượng dịch chuyển hoặc lưu lại tại một vị trí cụ thể.",
    "longExplanation": "Đây là một dạng phổ biến và rất điển hình của câu chữ 把: kết hợp với bổ ngữ chỉ kết quả/phương hướng nơi chốn ('在/到 + Nơi chốn'). Trong cấu trúc này, hành động tác động lên tân ngữ khiến cho tân ngữ đó thay đổi vị trí hoặc cố định tại một địa điểm mới: '在 + Nơi chốn' nhấn mạnh tân ngữ lưu lại, dừng lại hoặc định vị tại vị trí đó (ví dụ: '把照片放在包里' - để ảnh trong túi); '到 + Nơi chốn' nhấn mạnh điểm đến hoặc đích đến của sự dịch chuyển (ví dụ: '把车开到学校' - lái xe đến trường). Cuối câu thường có '了' để biểu thị việc xử lý đã hoàn thành.",
    "formation": "Chủ ngữ + 把 + Tân ngữ + Động từ + 在 / 到 + Nơi chốn + (了)",
    "examples": [
      {
        "translation": "Tôi để tấm ảnh vào trong túi của bạn rồi."
      }
    ]
  },
  "zh_VmotionV来去_175": {
    "title": "Động từ + Động từ xu hướng + 来 / 去 (Bổ ngữ xu hướng kép: qua lại, lên xuống, ra vào... hướng về/rời xa)",
    "shortExplanation": "Kết hợp động từ chính với động từ chỉ phương hướng (上, 下, 进, 出, 回, 过, 起) và '来 / 去' tạo thành bổ ngữ xu hướng kép, biểu thị phương hướng cụ thể của hành động so với vị trí của người nói.",
    "longExplanation": "Trong tiếng Trung, bổ ngữ xu hướng kép (复合趋向补语) được tạo thành bởi một động từ xu hướng đơn (như 上, 下, 进, 出, 回, 过, 起) kết hợp với '来' hoặc '去' (tạo thành: 上来/上去, 下来/下去, 进来/进去, 出来/出去, 回来/回去, 过来/过去, 起来). Khi đứng sau động từ chính, cụm này bổ nghĩa cho phương hướng di chuyển cụ thể của động tác: dùng '来' khi hành động hướng về phía người nói (hoặc đối tượng được quy ước), dùng '去' khi hành động rời xa người nói (ví dụ: '送过去' - gửi qua bên kia, '走出来' - bước ra đây, '带回来' - mang về đây). Tương đương với các từ chỉ phương hướng như 'qua đó', 'lại đây', 'vào trong', 'ra ngoài' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ + (上 / 下 / 进 / 出 / 回 / 过 / 起) + 来 / 去 + (Tân ngữ)",
    "examples": [
      {
        "translation": "Ngày mai chúng mình cùng mang quà gửi qua đó nhé."
      }
    ]
  },
  "zh_一边V1一边V2_176": {
    "title": "一边 + Động từ 1 + 一边 + Động từ 2 (Vừa... vừa...: tiến hành song song hai hành động)",
    "shortExplanation": "Dùng liên từ/phó từ sóng đôi '一边……一边……' nối hai động từ hoặc cụm động từ để biểu thị cùng một chủ thể tiến hành đồng thời hai hành động; 'vừa... vừa...'.",
    "longExplanation": "Cấu trúc song song '一边 + Động từ 1 + 一边 + Động từ 2' (trong khẩu ngữ thường có thể giản lược thành '边……边……') dùng để diễn tả hai hành động hoặc trạng thái diễn ra song song cùng một lúc do cùng một chủ thể thực hiện (ví dụ: '一边听音乐一边看书' - vừa nghe nhạc vừa đọc sách; '一边吃饭一边聊天' - vừa ăn cơm vừa trò chuyện). Hai hành động này thường có tính chất tương đương hoặc bổ trợ lẫn nhau. Tương đương với kết cấu 'vừa... vừa...', 'đồng thời...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 一边 + Động từ 1 + 一边 + Động từ 2",
    "examples": [
      {
        "translation": "Anh ấy vừa hát vừa nhảy múa."
      }
    ]
  },
  "zh_把OVresult_177": {
    "title": "把 + Tân ngữ + Động từ + Bổ ngữ kết quả (Câu chữ 把 mang bổ ngữ kết quả: tác động lên đối tượng đạt kết quả ra sao)",
    "shortExplanation": "Dùng câu chữ '把' kết hợp với bổ ngữ kết quả (như 干净, 完, 错, 好, 破...) đặt sau động từ để biểu thị hành động xử lý tác động làm biến đổi tân ngữ đến một kết quả hoặc trạng thái cụ thể.",
    "longExplanation": "Trong câu chữ 把, vị ngữ động từ bắt buộc phải có thành phần bổ trợ phía sau, và bổ ngữ kết quả (结果补语) là một trong những thành phần bổ trợ phổ biến nhất. Bổ ngữ kết quả (thường là hình dung từ/tính từ hoặc động từ như 干净 - sạch, 完 - xong, 错 - sai, 好 - xong/tốt, 破 - rách, 坏 - hỏng) đặt ngay sau động từ chính để làm rõ tình trạng, kết quả phát sinh trên đối tượng sau khi chịu tác động của hành động. Ví dụ: '把衣服洗干净了' (giặt quần áo sạch sẽ rồi), '把作业写完了' (viết xong bài tập rồi), '把他打哭了' (đánh cho cậu ấy khóc). Cuối câu thường có '了' để khẳng định trạng thái kết quả đó.",
    "formation": "Chủ ngữ + 把 + Tân ngữ + Động từ + Bổ ngữ kết quả + (了)",
    "examples": [
      {
        "translation": "Tôi đã giặt sạch quần áo rồi."
      }
    ]
  },
  "zh_把OVdirection_178": {
    "title": "把 + Tân ngữ + Động từ + Bổ ngữ xu hướng (Câu chữ 把 mang bổ ngữ xu hướng: làm dịch chuyển đối tượng theo hướng nào)",
    "shortExplanation": "Dùng câu chữ '把' kết hợp với bổ ngữ xu hướng (đơn hoặc kép như 过来, 过去, 进来, 出去, 拿来...) đặt sau động từ để biểu thị hành động làm đối tượng di chuyển theo một hướng cụ thể.",
    "longExplanation": "Trong câu chữ 把, khi động từ chính kết hợp với bổ ngữ xu hướng (趋向补语), cấu trúc này diễn tả hành động xử lý đã làm cho đối tượng dịch chuyển trong không gian theo một hướng nhất định (hướng về phía người nói với '来' hoặc rời xa với '去'). Ví dụ: '把水果拿过来' (mang hoa quả lại đây), '把书带回去' (mang sách về lại), '把椅子搬出去' (dọn ghế ra ngoài). Cấu trúc này làm rõ sự di dời của tân ngữ thông qua động tác. Thường có '了' ở cuối để biểu thị hành động di dời đã diễn ra.",
    "formation": "Chủ ngữ + 把 + Tân ngữ + Động từ + Bổ ngữ xu hướng + (了)",
    "examples": [
      {
        "translation": "Anh ấy mang hoa quả lại đây rồi."
      }
    ]
  },
  "zh_先再又然后_179": {
    "title": "先……再 / 又……然后…… (Trước tiên... rồi... sau đó...: liên từ biểu thị thứ tự hành động)",
    "shortExplanation": "Dùng tổ hợp liên từ/phó từ '先……再/又……然后……' để liệt kê thứ tự tuần tự trước sau của các hành động hoặc sự việc diễn ra theo tiến trình thời gian.",
    "longExplanation": "Cấu trúc thứ tự hành động '先……再/又……然后……' dùng để miêu tả một chuỗi hành vi hoặc sự việc diễn ra theo trình tự thời gian liên tiếp. Trong đó: '先' (trước tiên) đứng ở hành động khởi đầu; '再' hoặc '又' biểu thị hành động tiếp theo (dùng '再' cho sự việc trong tương lai hoặc chưa hoàn thành, dùng '又' cho sự việc đã liên tiếp xảy ra trong quá khứ); '然后' (sau đó) dẫn ra bước tiếp nối hoặc giai đoạn cuối cùng trong chuỗi hành động (thường kết hợp với '才' ở phân câu cuối nếu tốn nhiều công sức để hoàn thành). Tương đương với 'trước tiên... rồi... sau đó...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 先 + Động từ 1 / Mệnh đề 1 + 再 / 又 + Động từ 2 / Mệnh đề 2 + 然后 + (才 + ) Động từ 3 / Mệnh đề 3",
    "examples": [
      {
        "translation": "Trước tiên tôi đi xe buýt, rồi lại đi tàu điện ngầm, sau đó mới đến được nhà Tiểu Cương."
      }
    ]
  },
  "zh_除了N以外_180": {
    "title": "除了 + Danh từ + 以外 (Ngoại trừ: trừ... ra, ngoài... ra)",
    "shortExplanation": "Dùng kết cấu '除了……以外' kết hợp với danh từ để biểu thị sự loại trừ, mang nghĩa 'ngoại trừ đối tượng này ra thì tất cả các đối tượng khác đều...'; thường đi kèm '都' hoặc '别的' ở vế sau.",
    "longExplanation": "Cấu trúc giới từ '除了 + Danh từ + 以外' (từ '以外' có thể lược bớt thành '除了……') dùng để biểu đạt ý loại trừ (trừ trường hợp này ra). Trong phân câu phía sau, câu thường đi cùng các từ như '都', '全', '别' để khẳng định rằng ngoài đối tượng được đề cập ở vế trước bị loại trừ ra, thì tất cả những đối tượng còn lại đều có chung đặc điểm hoặc hành vi (ví dụ: '除了这个汉字以外，别的我都认识' - Ngoại trừ chữ Hán này ra, những chữ khác tôi đều biết; '除了小王以外，大家都来了' - Trừ Tiểu Vương ra thì mọi người đều đã đến). Cần phân biệt với cấu trúc loại trừ bổ sung '除了……还/也' (ngoài... ra còn...). Tương đương với 'ngoại trừ...', 'trừ... ra' trong tiếng Việt.",
    "formation": "除了 + Danh từ + 以外，(Chủ ngữ + ) 都 / 全 / 别的……",
    "examples": [
      {
        "translation": "Ngoài chữ Hán này ra, những chữ khác tôi đều biết cả."
      }
    ]
  },
  "zh_除了以外还_181": {
    "title": "除了……(以外)，还 / 也…… (Ngoài... ra còn...: biểu thị sự bổ sung, tăng tiến)",
    "shortExplanation": "Dùng kết cấu '除了……(以外)' kết hợp với phó từ '还' hoặc '也' ở vế sau để biểu thị ngoài đối tượng/hành động đã nêu ra, còn có thêm những đối tượng/hành động khác; 'ngoài... ra còn...'.",
    "longExplanation": "Khác với cấu trúc loại trừ mang nghĩa 'ngoại trừ... ra thì đều...' (kết hợp với '都'), cấu trúc '除了……(以外)，还/也……' lại biểu thị sự dung nạp, bổ sung thêm (ngoài việc thứ nhất ra thì còn có thêm việc thứ hai). Vế thứ nhất đưa ra một nội dung nền tảng, và vế thứ hai dùng '还' (còn) hoặc '也' (cũng) để bổ sung thêm một nội dung khác cùng loại. Tương đương với ý nghĩa 'không chỉ... mà còn...', 'bên cạnh... thì còn...' (ví dụ: '上网除了看新闻以外，还可以听音乐' - Lên mạng ngoài xem tin tức ra còn có thể nghe nhạc; '他除了会说汉语，还会说英语' - Ngoài tiếng Trung ra anh ấy còn biết nói tiếng Anh). Tương đương với 'ngoài... ra còn...' trong tiếng Việt.",
    "formation": "除了 + Danh từ / Động từ / Mệnh đề + (以外)，(Chủ ngữ + ) 还 / 也 + Động từ / Vị ngữ",
    "examples": [
      {
        "translation": "Lên mạng ngoài việc xem tin tức ra, còn có thể nghe nhạc nữa."
      }
    ]
  },
  "zh_什么_182": {
    "title": "什么 (Đại từ nghi vấn dùng phiếm chỉ / hư chỉ: cái gì đó, bất kỳ cái gì)",
    "shortExplanation": "Đại từ nghi vấn '什么' được dùng phi nghi vấn (hư chỉ / phiếm chỉ) trong câu hỏi hoặc câu trần thuật để biểu thị một sự vật không xác định hoặc không cần nói rõ; 'gì đó', 'bất kỳ... nào'.",
    "longExplanation": "Trong tiếng Trung, ngoài chức năng là đại từ nghi vấn để hỏi ('cái gì?'), '什么' (shénme) còn có cách dùng hư chỉ (虚指) hoặc phiếm chỉ (泛指). Khi dùng hư chỉ trong câu nghi vấn hoặc trần thuật nhẹ nhàng, '什么' mang ý nghĩa chỉ một đối tượng chưa xác định hoặc mơ hồ, không nhất thiết phải nói rõ tên (như '有什么打算吗' - có kế hoạch gì không, '我想买点儿什么' - tôi muốn mua cái gì đó, '他好像在找什么' - dường như anh ấy đang tìm cái gì đó). Khi dùng phiếm chỉ kết hợp với '都 / 也', nó mang nghĩa bất kỳ thứ gì ('什么都喜欢' - cái gì cũng thích). Tương đương với từ 'gì đó', 'gì' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ + (点儿 + ) 什么 + (Danh từ) + (吗 / 呢)",
    "examples": [
      {
        "translation": "Cuối tuần bạn có kế hoạch gì chưa?"
      }
    ]
  },
  "zh_A极了_183": {
    "title": "Tính từ + 极了 (Bổ ngữ mức độ: ... cực kỳ / ... vô cùng)",
    "shortExplanation": "Dùng sau tính từ (hoặc một số động từ tâm lý) để biểu thị mức độ cực kỳ cao của tính chất, trạng thái hay cảm xúc; tương đương với '... cực kỳ', '... hết sức' trong tiếng Việt.",
    "longExplanation": "Cấu trúc 'Tính từ + 极了' (jíle) trong tiếng Trung là một dạng bổ ngữ chỉ mức độ rất phổ biến trong khẩu ngữ. Từ '极' mang nghĩa là cực điểm, tột đỉnh, và '极了' đứng ngay sau tính từ miêu tả hoặc một số động từ chỉ trạng thái tâm lý (như 喜欢, 讨厌, 满意) để diễn đạt mức độ cao nhất của đặc điểm hay cảm xúc đó. Cuối câu thường có trợ từ ngữ khí '了'. Khi dùng cấu trúc này, không dùng kèm phó từ chỉ mức độ như '很', '非常' trước tính từ.",
    "formation": "Chủ ngữ + Tính từ / Động từ tâm lý + 极了",
    "examples": [
      {
        "translation": "Thời tiết hôm nay lạnh cực kỳ."
      }
    ]
  },
  "zh_如果的话就_184": {
    "title": "如果……(的话)，就…… (Nếu... (thì), thì... - Câu phức giả thiết)",
    "shortExplanation": "Cặp liên từ biểu thị quan hệ giả thiết - kết quả: vế trước nêu giả thiết ('nếu...'), vế sau đưa ra kết quả, quyết định hoặc hành động tương ứng ('thì...').",
    "longExplanation": "Cấu trúc '如果……(的话)，就……' (rúguǒ…… dehuà, jiù……) là cấu trúc câu phức biểu thị điều kiện giả thiết rất phổ biến trong tiếng Trung. '如果' (nếu, nếu như) đứng ở đầu hoặc sau chủ ngữ của phân câu thứ nhất để nêu ra tình huống giả thiết; '的话' có thể có hoặc không, thường đứng ở cuối phân câu thứ nhất để làm mềm câu văn và củng cố ngữ khí giả thiết; '就' (thì) đứng trước vị ngữ của phân câu thứ hai để dẫn ra kết quả tất yếu, phán đoán hoặc đề xuất tương ứng.",
    "formation": "如果 + Mệnh đề giả thiết + (的话)，(Chủ ngữ + ) 就 + Mệnh đề kết quả",
    "examples": [
      {
        "translation": "Nếu bạn mệt quá thì hãy nghỉ ngơi một lát đi."
      }
    ]
  },
  "zh_A得CLAUSE_185": {
    "title": "Tính từ + 得 + Mệnh đề (Bổ ngữ trạng thái/mức độ: ... đến mức mà...)",
    "shortExplanation": "Dùng trợ từ kết cấu '得' sau tính từ để dẫn ra một mệnh đề làm bổ ngữ, diễn tả mức độ cao của tính chất, trạng thái dẫn tới một kết quả cụ thể.",
    "longExplanation": "Cấu trúc 'Tính từ + 得 + Mệnh đề' là câu có bổ ngữ trạng thái hoặc bổ ngữ chỉ mức độ dẫn ra bởi trợ từ kết cấu '得'. Trong cấu trúc này, phân câu hoặc mệnh đề đứng sau '得' dùng để miêu tả, cụ thể hóa mức độ sâu sắc của tính từ đứng trước, thường diễn tả sự việc đạt tới một mức độ làm nảy sinh tình huống hay kết quả nào đó. Tương đương với cấu trúc '... đến mức mà...', '... quá đến nỗi mà...' trong tiếng Việt.",
    "formation": "Chủ ngữ + Tính từ + 得 + Mệnh đề bổ ngữ (chỉ kết quả / mức độ)",
    "examples": [
      {
        "translation": "Con trai mệt đến mức vừa tan làm là đi ngủ ngay."
      }
    ]
  },
  "zh_AA的_186": {
    "title": "Tính từ đơn âm tiết lặp lại + 的 (AA的: ... nhè nhẹ, trăng trắng, be bé - Miêu tả sinh động)",
    "shortExplanation": "Hình thức lặp lại của tính từ đơn âm tiết kết hợp với trợ từ '的' (AA的) dùng để miêu tả hình dáng, đặc điểm một cách sinh động, gợi hình, mang sắc thái đáng yêu hoặc mức độ vừa phải.",
    "longExplanation": "Trong tiếng Trung, khi lặp lại tính từ đơn âm tiết theo dạng 'AA + 的' (như 红红的, 大大的, 小小的, 黑黑的), người nói muốn tăng tính miêu tả trực quan, gợi cảm giác sinh động, thân thiết hoặc dễ thương đối với đặc điểm của sự vật, người hay bộ phận cơ thể. Dạng trùng điệp này mang tính miêu tả chứ không mang tính so sánh hay đo lường chính xác, do đó trước cụm 'AA的' tuyệt đối không dùng các phó từ chỉ mức độ như '很', '非常', '太'.",
    "formation": "Danh từ + Tính từ lặp lại (dạng AA) + 的",
    "examples": [
      {
        "translation": "Mũi cô ấy nho nhỏ, tóc đen nhánh."
      }
    ]
  },
  "zh_VV_187": {
    "title": "Động từ lặp lại (V + V: ... một chút / ... thử xem - Giảm nhẹ ngữ khí)",
    "shortExplanation": "Động từ đơn âm tiết hoặc song âm tiết lặp lại (AA hoặc ABAB) biểu thị hành động diễn ra trong thời gian ngắn, mang tính chất thử nghiệm, nhẹ nhàng hoặc thư giãn; '... một chút', 'thử...'.",
    "longExplanation": "Hình thức trùng điệp động từ 'V + V' (với động từ đơn âm tiết dạng AA như 看看, 听听, hoặc song âm tiết dạng ABAB như 检查检查) dùng để biểu thị: (1) Hành động diễn ra trong thời gian ngắn; (2) Hành động có tính chất làm thử; (3) Làm cho ngữ khí câu trở nên nhẹ nhàng, tự nhiên, mang tính gợi ý, khuyên nhủ hoặc thư giãn. Khi lặp lại, âm tiết sau thường đọc thành thanh nhẹ (khinh thanh). Tương đương với '... một chút', '... thử xem' trong tiếng Việt.",
    "formation": "Động từ đơn âm tiết lặp lại (dạng AA) hoặc Động từ song âm tiết lặp lại (dạng ABAB)",
    "examples": [
      {
        "translation": "Để tôi đưa bạn đến bệnh viện kiểm tra một chút nhé."
      }
    ]
  },
  "zh_Q都_188": {
    "title": "Từ để hỏi + 都 (Bất kỳ... cũng / ... nào cũng - Biểu thị phiếm chỉ)",
    "shortExplanation": "Dùng đại từ nghi vấn (như 什么, 谁, 哪儿, 怎么) kết hợp với phó từ '都' (hoặc '也') để biểu thị ý nghĩa phiếm chỉ toàn bộ, chỉ bất kỳ ai/cái gì/nơi nào trong phạm vi đều như vậy; 'ai cũng...', 'cái gì cũng...'.",
    "longExplanation": "Cấu trúc 'Từ để hỏi + 都/也' là cách dùng phiếm chỉ của đại từ nghi vấn trong tiếng Trung. Khi đại từ nghi vấn (như 什么 - cái gì, 谁 - ai, 哪儿 - đâu/nơi nào, 什么时候 - khi nào) không dùng để hỏi mà đi cùng với '都' (hoặc '也' trong câu phủ định), nó biểu thị sự bao quát toàn bộ mọi đối tượng trong một phạm vi không có ngoại lệ. Ví dụ: '什么都喜欢' (cái gì cũng thích), '谁都知道' (ai cũng biết), '哪儿都不去' (đâu cũng không đi). Tương đương với 'bất cứ ai/cái gì... cũng', '... nào cũng' trong tiếng Việt.",
    "formation": "Chủ ngữ + Từ để hỏi + (Danh từ) + 都 / 也 + Vị ngữ (Động từ / Tính từ)",
    "examples": [
      {
        "translation": "Tiểu Cương món gì cũng thích ăn."
      }
    ]
  },
  "zh_只要就_189": {
    "title": "只要……，就…… (Chỉ cần... là/thì... - Câu phức điều kiện đủ)",
    "shortExplanation": "Cặp liên từ biểu thị điều kiện đầy đủ: chỉ cần thỏa mãn điều kiện ở vế trước là sẽ dẫn đến kết quả tất yếu ở vế sau; 'chỉ cần... là...'.",
    "longExplanation": "Cấu trúc '只要……，就……' (zhǐyào……, jiù……) là cấu trúc câu ghép chỉ điều kiện rất phổ biến. '只要' (chỉ cần) đứng ở vế trước để nêu ra một điều kiện tất yếu hoặc đầy đủ (chỉ cần điều kiện này xảy ra); '就' (thì, là) đứng trước vị ngữ của vế sau để khẳng định kết quả tự nhiên tương ứng sẽ xảy ra. Lưu ý phân biệt với '只有……才……' (chỉ khi... mới... - điều kiện duy nhất). '只要……就……' nhấn mạnh tính chất điều kiện đầy đủ: không cần điều kiện nào khác, chỉ cần điều này là đủ.",
    "formation": "只要 + Mệnh đề điều kiện，(Chủ ngữ + ) 就 + Mệnh đề kết quả",
    "examples": [
      {
        "translation": "Chỉ cần tôi có thời gian thì nhất định sẽ đi du lịch cùng bạn."
      }
    ]
  },
  "zh_关于_190": {
    "title": "关于 + Danh từ (Về... / Liên quan đến... - Giới từ chỉ phạm vi, chủ đề)",
    "shortExplanation": "Giới từ '关于' (guānyú) đặt trước danh từ hoặc cụm danh từ để dẫn ra chủ đề, phạm vi hoặc sự việc liên quan; tương đương với 'về...', 'liên quan đến...' trong tiếng Việt.",
    "longExplanation": "Giới từ '关于' trong tiếng Trung dùng để giới thiệu đối tượng, chủ đề hoặc phạm vi liên quan đến một hành động hay sự tình nào đó. Cụm giới từ '关于 + Danh từ' có thể: (1) Đứng ở đầu câu làm trạng ngữ chỉ chủ đề cho cả câu (giữa cụm này và chủ ngữ thường có dấu phẩy); (2) Đứng trước danh từ khác làm định ngữ (phải thêm '的', ví dụ: 关于这门课的规定); (3) Dùng làm tiêu đề sách báo, bài viết. Cần phân biệt với '对于' (chỉ đối tượng hướng đến của hành động hoặc thái độ).",
    "formation": "关于 + Danh từ / Cụm danh từ，Chủ ngữ + Vị ngữ (hoặc: 关于 + Danh từ + 的 + Danh từ trung tâm)",
    "examples": [
      {
        "translation": "Về việc này, chúng tôi vẫn chưa quyết định đâu."
      }
    ]
  },
  "zh_V出来_191": {
    "title": "Động từ + 出来 (Bổ ngữ xu hướng mở rộng: Làm nảy sinh kết quả / từ không thành có)",
    "shortExplanation": "Dùng sau động từ làm bổ ngữ xu hướng mở rộng để biểu thị động tác làm xuất hiện một kết quả mới, chuyển từ vô hình thành hữu hình hoặc từ chưa có thành đã có; '... ra'.",
    "longExplanation": "Cấu trúc 'Động từ + 出来' (chūlái) có nghĩa phái sinh rất phổ biến trong tiếng Trung, biểu thị thông qua động tác mà tạo ra một thành quả cụ thể, làm cho sự vật xuất hiện hoặc biến đổi từ chỗ chưa tồn tại sang tồn tại rõ ràng (từ không thành có, từ ẩn sang hiện). Ví dụ: '想出来' (nghĩ ra), '做出来' (làm ra), '写出来' (viết ra), '画出来' (vẽ ra). Tương đương với các cách nói 'làm ra', 'viết ra', 'nghĩ ra' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ + 出来 (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Chữ này bạn có thể viết ra được không?"
      }
    ]
  },
  "zh_V出来_192": {
    "title": "Động từ + 出来 (Bổ ngữ xu hướng mở rộng: Nhận biết, phân biệt qua giác quan)",
    "shortExplanation": "Dùng sau các động từ tri giác (như 看, 听, 闻, 尝) làm bổ ngữ xu hướng mở rộng để biểu thị việc nhận ra, phát hiện hoặc phân biệt được ai, cái gì qua giác quan; 'nhìn ra', 'nghe ra'.",
    "longExplanation": "Đây là một nghĩa phái sinh rất phổ biến khác của 'Động từ + 出来'. Khi đi sau các động từ chỉ tri giác hay tư duy (như 看 - nhìn, 听 - nghe, 闻 - ngửi, 尝 - nếm, 认 - nhận diện), '出来' biểu thị năng lực phát hiện, phân biệt hay nhận ra được bản chất, danh tính, đặc điểm của người hoặc sự vật. Thường đi cùng trợ từ ngữ khí '了' hoặc dùng trong thể khả năng: '听得出来' (nghe nhận ra được) / '听不出来' (không nghe ra được). Tương đương với 'nhận ra', 'nghe ra', 'nhìn ra' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ tri giác + 出来 + (了) (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Bạn có nghe ra không? Đây là giọng của ai thế?"
      }
    ]
  },
  "zh_V下来_193": {
    "title": "Động từ / Tính từ + 下来 (Bổ ngữ xu hướng mở rộng: Chuyển sang trạng thái tĩnh, chậm lại, lưu giữ lại)",
    "shortExplanation": "Dùng sau động từ hoặc tính từ làm bổ ngữ xu hướng mở rộng để biểu thị trạng thái biến đổi từ động sang tĩnh, từ nhanh chuyển sang chậm hoặc tiếp tục cố định lại; 'dần chậm lại', 'dừng lại'.",
    "longExplanation": "Cấu trúc 'Động từ/Tính từ + 下来' (xiàlai) là một nghĩa mở rộng quan trọng của bổ ngữ xu hướng '下来'. Nó thường diễn tả: (1) Sự thay đổi của sự vật, hành động chuyển từ trạng thái động sang tĩnh, từ ồn ào sang yên tĩnh, hoặc từ nhanh dần chuyển sang chậm (như 慢下来 - chậm lại, 静下来 - yên tĩnh lại, 停下来 - dừng lại); (2) Sự việc, thông tin được lưu giữ, cố định lại (như 记下来 - ghi chép lại, 拍下来 - chụp lại). Tương đương với các cách nói 'chậm lại', 'dừng lại', 'lắng xuống' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ / Tính từ + 下来",
    "examples": [
      {
        "translation": "Tôi thực sự mong thời gian có thể chậm lại."
      }
    ]
  },
  "zh_想起来_194": {
    "title": "想起来 (Động từ cụm: Nhớ ra / Hồi tưởng lại)",
    "shortExplanation": "Cụm động từ biểu thị thông tin, ký ức trong quá khứ bỗng xuất hiện trở lại trong trí nhớ; dạng phủ định hoặc bất khả năng là '想不起来' (không nhớ ra được).",
    "longExplanation": "'想起来' (xiǎngqilai) là cụm động từ kết hợp với bổ ngữ xu hướng '起来', biểu thị quá trình hồi tưởng khi một ký ức, thông tin hoặc hình ảnh trong quá khứ từ chỗ bị lãng quên bỗng hiện về trong tâm trí ('nhớ ra', 'nghĩ ra'). Trong sử dụng thực tế, cấu trúc này rất thường xuất hiện ở dạng bổ ngữ khả năng: '想得起来' (có thể nhớ ra) và '想不起来' (không thể nhớ ra, quên mất). Cần phân biệt với '想出来' (nghĩ ra sáng kiến, ý tưởng mới từ trước chưa có).",
    "formation": "Chủ ngữ + 想起来 (+ Tân ngữ) / Chủ ngữ + 想得起来 / 想不起来 (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Tôi không tài nào nhớ ra tên của anh ấy nữa rồi."
      }
    ]
  },
  "zh_看起来看上去_195": {
    "title": "看起来 / 看上去 (Trông có vẻ... / Nhìn như... - Đánh giá qua vẻ ngoài)",
    "shortExplanation": "Đặt ở đầu câu hoặc trước vị ngữ để biểu thị sự phán đoán, ước lượng hoặc cảm nhận trực quan qua bề ngoài; 'trông có vẻ...', 'nhìn dường như...'.",
    "longExplanation": "'看起来' (kànqǐlái) và '看上去' (kànshangqu) là hai cụm từ quán dụng dùng để đưa ra nhận xét, đánh giá hay phán đoán dựa trên quan sát bề ngoài hoặc cảm nhận trực giác. Chúng có thể đứng ở đầu câu làm trạng ngữ đánh giá cho toàn câu, hoặc đứng sau chủ ngữ và trước vị ngữ để miêu tả đặc điểm của đối tượng đó (như tuổi tác, diện mạo, tâm trạng hay tính chất sự việc). Hai từ này về cơ bản có thể dùng thay thế cho nhau, trong đó '看起来' còn có thể dùng rộng hơn cho sự việc mang tính suy luận logic, còn '看上去' thiên về quan sát bằng mắt thường. Tương đương với 'trông có vẻ', 'nhìn như' trong tiếng Việt.",
    "formation": "(Chủ ngữ + ) 看起来 / 看上去 + Tính từ / Cụm động từ / Mệnh đề",
    "examples": [
      {
        "translation": "Anh ấy trông có vẻ như ngoài 40 tuổi."
      }
    ]
  },
  "zh_使叫让OAV_196": {
    "title": "使 / 叫 / 让 + Tân ngữ + Tính từ / Động từ (Câu kiêm ngữ sai khiến: Khiến cho / làm cho / bảo ai...)",
    "shortExplanation": "Câu kiêm ngữ sai khiến dùng các động từ '使', '让', '叫' để biểu thị hành động hay sự việc làm cho đối tượng nảy sinh cảm xúc, biến đổi trạng thái hoặc thực hiện một hành động nào đó.",
    "longExplanation": "Cấu trúc '使/叫/让 + Tân ngữ (Kiêm ngữ) + Tính từ / Động từ' là cấu trúc câu kiêm ngữ mang ý nghĩa sai khiến rất quan trọng trong tiếng Trung. Trong đó, tân ngữ của động từ sai khiến '使/叫/让' đồng thời là chủ ngữ ngữ nghĩa của tính từ hoặc động từ đứng sau. Về sắc thái: (1) '使' mang sắc thái trang trọng, thường dùng trong văn viết hoặc văn phong chính luận, chủ ngữ thường là sự vật, sự việc trừu tượng (như '读书使我快乐' - đọc sách làm tôi vui vẻ); (2) '让' và '叫' rất phổ biến trong khẩu ngữ, có thể dùng khi người ra lệnh, cho phép hoặc khiến người khác làm gì. Tương đương với 'khiến cho', 'làm cho', 'bảo' trong tiếng Việt.",
    "formation": "Chủ ngữ (Tác nhân/Nguyên nhân) + 使 / 叫 / 让 + Tân ngữ (Kiêm ngữ) + Tính từ / Động từ",
    "examples": [
      {
        "translation": "Đọc sách làm cho tôi cảm thấy vui vẻ."
      }
    ]
  },
  "zh_O被叫让SV_197": {
    "title": "Tân ngữ (Đối tượng chịu tác động) + 被 / 叫 / 让 + Chủ thể hành động + Động từ (Câu bị động: Bị... / Được...)",
    "shortExplanation": "Dùng giới từ '被', '叫' hoặc '让' để dẫn ra chủ thể gây ra hành động, biểu thị chủ ngữ ngữ pháp ở đầu câu tiếp nhận hoặc bị tác động bởi hành động đó; 'bị/được ai...'.",
    "longExplanation": "Cấu trúc bị động 'Đối tượng chịu tác động + 被/叫/让 + Chủ thể thực hiện + Động từ' là cấu trúc câu bị động điển hình trong tiếng Trung. Trong đó, đối tượng chịu tác động (vốn là tân ngữ của hành động) được đảo lên làm chủ ngữ đầu câu. Lưu ý sự khác nhau giữa các từ biểu thị bị động: (1) '被' có thể dùng trong cả văn viết lẫn văn nói, và chủ thể thực hiện hành động có thể được lược bỏ (ví dụ: 照相机被拿走了); (2) '叫' và '让' chỉ dùng trong khẩu ngữ, và bắt buộc phải có chủ thể thực hiện hành động đi sau (nếu không xác định được rõ là ai thì dùng đại từ như '人', ví dụ: 让/叫人拿走了). Động từ vị ngữ trong câu bị động thường mang thành phần khác đi kèm (như 了, 走, bổ ngữ kết quả/xu hướng). Tương đương với 'bị...', 'được...' trong tiếng Việt.",
    "formation": "Tân ngữ (Đối tượng chịu tác động) + 被 / 叫 / 让 + Chủ thể thực hiện + Động từ + Thành phần khác",
    "examples": [
      {
        "translation": "Máy ảnh của tôi bị ai lấy đi mất rồi?"
      }
    ]
  },
  "zh_O不没被叫让SV_198": {
    "title": "Tân ngữ + 不 / 没 + 被 / 叫 / 让 + Chủ thể + Động từ (Thể phủ định của câu bị động)",
    "shortExplanation": "Dạng phủ định của câu bị động trong tiếng Trung: phó từ phủ định '不' hoặc '没(有)' bắt buộc phải đặt TRƯỚC giới từ bị động ('被', '叫', '让'), tuyệt đối không đặt sau giới từ hay trước động từ.",
    "longExplanation": "Trong tiếng Trung, khi muốn phủ định một câu bị động (câu chữ 被, 叫, 让), phó từ phủ định '不' (phủ định thói quen, ý chí hoặc trong tương lai) hoặc '没 / 没有' (phủ định hành động đã xảy ra trong quá khứ hoặc trạng thái hiện tại) bắt buộc phải đứng trước giới từ biểu thị bị động '被', '叫' hoặc '让'. Đây là quy tắc ngữ pháp cố định: không bao giờ được đặt từ phủ định sau '被/叫/让' hoặc ngay trước động từ chính (ví dụ không nói: ❌ 问题被没解决, mà phải nói: ✔️ 问题没被解决). Ngoài ra, các trợ động từ năng nguyện (能, 会, 想, 应该...) và phó từ chỉ thời gian cũng phải đặt trước '被/叫/让'. Tương đương với '... vẫn chưa bị/được...', '... không bị/được... bởi...' trong tiếng Việt.",
    "formation": "Tân ngữ (Đối tượng chịu tác động) + 不 / 没(有) + 被 / 叫 / 让 + Chủ thể thực hiện + Động từ + Thành phần khác",
    "examples": [
      {
        "translation": "Vấn đề vẫn chưa được giải quyết đâu."
      }
    ]
  },
  "zh_只有才_199": {
    "title": "只有……，才…… (Chỉ khi... mới... - Câu phức điều kiện duy nhất)",
    "shortExplanation": "Cặp liên từ biểu thị điều kiện cần và duy nhất: chỉ có thỏa mãn điều kiện ở vế trước thì mới có thể đạt được kết quả ở vế sau; tương đương với 'chỉ khi... mới...' trong tiếng Việt.",
    "longExplanation": "Cấu trúc '只有……，才……' (zhǐyǒu…… cái……) là cấu trúc câu phức biểu thị điều kiện tất yếu (điều kiện cần duy nhất) trong tiếng Trung. '只有' (chỉ có, chỉ khi) đứng ở vế trước nhằm nhấn mạnh rằng điều kiện được đưa ra là điều kiện duy nhất không thể thiếu; '才' (mới) đứng trước vị ngữ của vế sau để dẫn ra kết quả, năng lực hoặc mục đích chỉ xuất hiện sau khi thỏa mãn điều kiện đó. Cần phân biệt với '只要……就……' (chỉ cần... là... - điều kiện đủ). Nếu không có '只有', kết quả ở vế sau hoàn toàn không thể thực hiện được.",
    "formation": "只有 + Mệnh đề điều kiện duy nhất，(Chủ ngữ + ) 才 + Mệnh đề kết quả",
    "examples": [
      {
        "translation": "Chỉ khi làm xong bài tập về nhà thì mới được xem ti vi."
      }
    ]
  },
  "zh_不仅也还而且_200": {
    "title": "Chủ ngữ + 不仅……，也 / 还 / 而且…… (Không những... mà còn... - Cùng chủ ngữ)",
    "shortExplanation": "Cấu trúc câu phức tăng tiến khi hai vế câu có CÙNG CHỦ NGỮ: chủ ngữ đứng trước '不仅', biểu thị ngoài hành động hay đặc điểm ở vế trước, đối tượng còn có thêm hành động hay đặc điểm ở vế sau.",
    "longExplanation": "Cấu trúc 'Chủ ngữ + 不仅……，也 / 还 / 而且……' (bùjǐn…… yě/ hái/ érqiě……) dùng để diễn tả quan hệ tăng tiến về mặt ý nghĩa khi hai phân câu có cùng một chủ ngữ. Vì cùng chung chủ ngữ, vị trí của chủ ngữ bắt buộc phải đặt ở TRƯỚC liên từ '不仅' (Chủ ngữ + 不仅……). '不仅' (không những, không chỉ) nêu ra sự thực đầu tiên, còn các phó từ/liên từ ở vế sau như '也' (cũng), '还' (còn), '而且' (mà còn, hơn nữa) tiếp tục bổ sung thêm một sự thực hay mức độ cao hơn. Tương đương với 'không những... mà còn...', 'không chỉ... mà cũng...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 不仅 + Phân câu 1，也 / 还 / 而且 + Phân câu 2",
    "examples": [
      {
        "translation": "Tôi không những đã xem phim Titanic mà còn xem cả phim Notting Hill nữa."
      }
    ]
  },
  "zh_不仅S1S2也_201": {
    "title": "不仅 + Chủ ngữ 1……，Chủ ngữ 2 + 也 / 还…… (Không những Chủ ngữ 1... mà Chủ ngữ 2 cũng... - Khác chủ ngữ)",
    "shortExplanation": "Cấu trúc câu phức tăng tiến khi hai vế câu có HAI CHỦ NGỮ KHÁC NHAU: liên từ '不仅' bắt buộc phải đứng TRƯỚC chủ ngữ 1, và phó từ '也' hoặc '还' đứng sau chủ ngữ 2.",
    "longExplanation": "Cấu trúc '不仅 + Chủ ngữ 1……，Chủ ngữ 2 + 也……' biểu thị ý nghĩa tăng tiến, bao hàm đối tượng khi hai vế câu có hai chủ ngữ khác nhau. Đây là một quy tắc ngữ pháp rất quan trọng: khi chủ ngữ khác nhau, liên từ '不仅' (hoặc 不但) bắt buộc phải đứng ở ĐẦU CÂU (trước chủ ngữ 1). Nếu đặt sau chủ ngữ 1 sẽ bị sai ngữ pháp. Vế sau bắt đầu bằng chủ ngữ 2, theo sau là phó từ '也' (cũng) hoặc '还' (còn), đôi khi có thể đi kèm '而且'. Tương đương với 'Không những [người 1]... mà [người 2] cũng...' trong tiếng Việt.",
    "formation": "不仅 + Chủ ngữ 1 + Vị ngữ 1，Chủ ngữ 2 + 也 / 还 + Vị ngữ 2",
    "examples": [
      {
        "translation": "Không những Mark đã xem phim Notting Hill mà tôi cũng từng xem phim Notting Hill rồi."
      }
    ]
  },
  "zh_从来不V_202": {
    "title": "从来不 + Động từ (Từ trước đến nay chưa bao giờ / Không bao giờ làm gì)",
    "shortExplanation": "Dùng phó từ '从来不' (cónglái bù) trước động từ để biểu thị thói quen, nguyên tắc sống hoặc quy luật bền vững từ trước đến nay: không bao giờ làm một việc gì đó.",
    "longExplanation": "Cấu trúc '从来不 + Động từ' kết hợp phó từ '从来' (từ trước tới nay, luôn luôn) và phó từ phủ định '不' để diễn tả một thói quen cố định, nề nếp sinh hoạt, nguyên tắc xử thế hoặc quy luật tự nhiên được duy trì nhất quán từ quá khứ cho đến hiện tại và tương lai. Nó nhấn mạnh việc 'không bao giờ làm' một hành động nào đó do ý chí hoặc thói quen cá nhân. Khác với '从来没……过' (phủ định kinh nghiệm đã từng xảy ra trong quá khứ), '从来不 + Động từ' dùng để phủ định tính quy luật và thói quen thường nhật. Tương đương với 'từ trước đến giờ không bao giờ...', 'chưa bao giờ...' trong tiếng Việt.",
    "formation": "Chủ ngữ + (Thời gian) + 从来不 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Buổi trưa tôi không bao giờ ngủ trưa cả."
      }
    ]
  },
  "zh_从来没VA过_203": {
    "title": "从来没(有) + Động từ / Tính từ + 过 (Từ trước đến nay chưa từng... bao giờ)",
    "shortExplanation": "Dùng phó từ '从来没(有)' kết hợp với trợ từ động thái '过' để biểu thị từ trước tới nay chưa từng trải qua hành động đó, hoặc chưa từng đạt tới trạng thái đó bao giờ.",
    "longExplanation": "Cấu trúc '从来没(有) + Động từ / Tính từ + 过' (cóngláiméi…… guò) là cấu trúc phủ định kinh nghiệm tuyệt đối trong tiếng Trung. Khi đi với động từ, nó diễn tả một trải nghiệm chưa từng xảy ra dù chỉ một lần trong quá khứ tính đến thời điểm nói (ví dụ: 从来没吃过 - chưa từng ăn bao giờ, 从来没去过 - chưa từng đi bao giờ). Khi đi với tính từ (thường có đại từ chỉ mức độ như 这么, 那么 đi kèm), nó nhấn mạnh trạng thái từ trước đến nay chưa bao giờ đạt tới mức độ như vậy (ví dụ câu mẫu: 从来没这么高兴过 - chưa bao giờ vui như thế này). Tương đương với 'từ trước tới nay chưa từng... bao giờ' trong tiếng Việt.",
    "formation": "Chủ ngữ + 从来没(有) + Động từ / Tính từ + 过 (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Bố mẹ anh ấy từ trước tới nay chưa từng vui mừng như thế này bao giờ."
      }
    ]
  },
  "zh_刚刚刚V_204": {
    "title": "刚 / 刚刚 + Động từ (Phó từ thời gian: Vừa mới làm gì)",
    "shortExplanation": "Phó từ '刚' hoặc '刚刚' (gāng / gānggang) đặt trước động từ để biểu thị hành động vừa mới xảy ra cách thời điểm nói không lâu theo cảm nhận chủ quan của người nói; 'vừa mới...'.",
    "longExplanation": "Trong tiếng Trung, '刚' hoặc '刚刚' là phó từ chỉ thời gian, đứng ngay trước vị ngữ động từ để diễn đạt hành động vừa mới phát sinh hoặc hoàn thành cách đây không lâu. Điểm mấu chốt của '刚/刚刚' là tính tương đối theo nhận định chủ quan của người nói: khoảng thời gian đó không nhất thiết phải là vài phút hay vài giây, mà có thể là ngày hôm qua, tháng trước hay năm ngoái, miễn là người nói cảm thấy sự việc đó mới vừa diễn ra gần đây (ví dụ: 我上个月刚结婚 - Tôi tháng trước vừa mới kết hôn). Cần chú ý vị trí: là phó từ nên '刚/刚刚' chỉ đứng sau chủ ngữ và trước động từ (không được đứng ở đầu câu như danh từ thời gian '刚才').",
    "formation": "Chủ ngữ + (Thời gian) + 刚 / 刚刚 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Tháng trước tôi vừa mới kết hôn."
      }
    ]
  },
  "zh_刚VDURATION_205": {
    "title": "Chủ ngữ + 刚 + Động từ + Cụm từ chỉ thời lượng (Mới làm gì được bao lâu)",
    "shortExplanation": "Cấu trúc kết hợp phó từ '刚' với động từ và cụm từ chỉ thời lượng (khoảng thời gian) để nhấn mạnh khoảng thời gian hành động diễn ra là rất ngắn theo cảm nhận của người nói; 'mới... được [thời gian]'.",
    "longExplanation": "Cấu trúc '刚 + Động từ + Cụm từ chỉ thời lượng' dùng để diễn tả một hành động, sự việc hoặc trạng thái bắt đầu diễn ra và kéo dài cho tới nay mới chỉ được một khoảng thời gian ngắn. Ở đây, phó từ '刚' (mới) kết hợp với bổ ngữ thời lượng (như 一个月, 三天, 半年) nhằm nhấn mạnh tính ngắn ngủi, non nớt hoặc mới bắt đầu của sự việc theo góc nhìn của người nói. Ví dụ trong câu '他刚来一个月' (Anh ấy mới đến được một tháng), người nói hàm ý rằng một tháng là thời gian ngắn, chưa lâu. Tương đương với 'mới... được bao lâu' trong tiếng Việt.",
    "formation": "Chủ ngữ + 刚 + Động từ + (Tân ngữ) + Cụm từ chỉ thời lượng",
    "examples": [
      {
        "translation": "Anh ấy mới đến đây được một tháng thôi."
      }
    ]
  },
  "zh_刚才_206": {
    "title": "刚才 (Danh từ thời gian: Vừa nãy / Lúc nãy / Ban nãy)",
    "shortExplanation": "Danh từ chỉ thời gian '刚才' (gāngcái) biểu thị khoảng thời gian vừa mới trôi qua trước thời điểm nói chỉ vài giây hoặc vài phút; 'vừa nãy', 'lúc nãy'.",
    "longExplanation": "Từ '刚才' trong tiếng Trung là một danh từ chỉ thời gian (chứ không phải phó từ). Nó chỉ khoảng thời gian ngắn khách quan ngay trước thời điểm nói (thường chỉ vài phút hoặc chốc lát trước đó). Vì là danh từ thời gian nên '刚才' có các đặc điểm ngữ pháp đặc thù: (1) Có thể đứng trước chủ ngữ hoặc sau chủ ngữ (ví dụ: 刚才我收到... hoặc 我刚才收到...); (2) Có thể kết hợp với giới từ (như 比刚才好多了); (3) Có thể làm định ngữ bổ nghĩa cho danh từ khác khi thêm '的' (ví dụ: 刚才的事 - chuyện lúc nãy). Cần phân biệt rõ với phó từ '刚': '刚' có thể chỉ khoảng thời gian dài nếu người nói cảm thấy ngắn (như năm ngoái), còn '刚才' bắt buộc phải là thời gian vật lý thực tế vừa trôi qua cách đây ít phút. Tương đương với 'vừa nãy', 'lúc nãy' trong tiếng Việt.",
    "formation": "(Chủ ngữ + ) 刚才 (+ Chủ ngữ) + Vị ngữ (Động từ / Tính từ)",
    "examples": [
      {
        "translation": "Vừa nãy tôi nhận được một bức thư điện tử."
      }
    ]
  },
  "zh_即使也_207": {
    "title": "即使……，也…… (Cho dù... cũng... - Câu phức nhượng bộ giả thiết)",
    "shortExplanation": "Cặp liên từ biểu thị quan hệ nhượng bộ giả thiết: vế trước dùng '即使' để lùi một bước nêu ra tình huống giả định (thường là khắc nghiệt, cực đoan), vế sau dùng '也' để khẳng định kết quả hoặc hành động vẫn không thay đổi.",
    "longExplanation": "Cấu trúc '即使……，也……' (jíshǐ…… yě……) là dạng câu ghép nhượng bộ giả thiết rất thông dụng trong tiếng Trung. '即使' (cho dù, ngay cả khi) đặt ở vế trước nhằm đưa ra một giả thiết mang tính nhượng bộ cực đoan hoặc tình huống không thuận lợi; phó từ '也' (vẫn, cũng) đặt trước vị ngữ của vế sau để nhấn mạnh rằng trong bất kỳ hoàn cảnh nào, quyết định, quy luật hoặc kết quả nêu ra vẫn hoàn toàn không bị lay chuyển hay thay đổi. Kết cấu này có thể dùng cho cả tình huống giả định chưa xảy ra lẫn sự thật được thừa nhận để nhượng bộ. Tương đương với 'cho dù... vẫn...', 'ngay cả khi... thì cũng...' trong tiếng Việt.",
    "formation": "即使 + Mệnh đề nhượng bộ giả thiết，(Chủ ngữ + ) 也 + Mệnh đề chính",
    "examples": [
      {
        "translation": "Cho dù mùa đông rất lạnh, anh ấy vẫn chạy bộ ở sân vận động mỗi ngày."
      }
    ]
  },
  "zh_在N上_208": {
    "title": "(在) + Danh từ + 上 (Về mặt... / Xét về phương diện...)",
    "shortExplanation": "Cụm giới từ '(在)……上' kết hợp với danh từ trừu tượng để chỉ ra phạm vi, góc độ, phương diện hoặc lĩnh vực đang được bàn luận; 'về mặt...', 'xét về phương diện...'.",
    "longExplanation": "Cấu trúc '(在) + Danh từ + 上' (zài…… shàng) là cách diễn đạt phổ biến dùng để giới hạn phạm vi hoặc phương diện thảo luận trong tiếng Trung. Khi danh từ đứng giữa là một danh từ trừu tượng (như 爱好 - sở thích, 工作 - công việc, 学习 - học tập, 思想 - tư tưởng, 生活 - đời sống, 经济 - kinh tế), cụm này mang ý nghĩa 'xét về phương diện...', 'trên phương diện/lĩnh vực...'. Trong khẩu ngữ thông thường, giới từ '在' có thể được lược bỏ (chỉ còn 'Danh từ + 上', ví dụ: 工作上, 爱好上). Cụm giới từ này thường đứng ở đầu câu làm trạng ngữ định hướng chủ đề cho cả câu, theo sau thường có dấu phẩy. Tương đương với 'về phương diện...', 'về mặt...' trong tiếng Việt.",
    "formation": "(在 + ) Danh từ trừu tượng + 上，Chủ ngữ + Vị ngữ",
    "examples": [
      {
        "translation": "Về mặt sở thích, tôi giống mẹ tôi hơn."
      }
    ]
  },
  "zh_正好_209": {
    "title": "正好 (Tính từ / Phó từ: Vừa vặn / Đúng lúc / Vừa khéo)",
    "shortExplanation": "Từ '正好' (zhènghǎo) dùng làm tính từ mang nghĩa kích cỡ, số lượng, mức độ 'vừa vặn, vừa khéo'; hoặc làm phó từ mang nghĩa hành động diễn ra 'đúng lúc, vừa vặn gặp dịp'.",
    "longExplanation": "Từ '正好' trong tiếng Trung có hai chức năng ngữ pháp chủ yếu: (1) Làm tính từ vị ngữ: miêu tả kích thước, số lượng, thời gian, nhiệt độ hay mức độ đạt tới trạng thái chuẩn xác, hoàn hảo, không thừa không thiếu, không to không nhỏ (như ví dụ câu mẫu: 衣服大小正好 - Quần áo kích cỡ vừa vặn; hoặc 这双鞋不大不小，正好); (2) Làm phó từ: biểu thị thời điểm xảy ra sự việc là vừa đúng lúc, tình cờ gặp dịp thuận lợi (ví dụ: 我正好要找你 - Tôi vừa khéo đang định tìm bạn; 正好有空 - vừa vặn rảnh rỗi). Cần phân biệt với '刚' (nhấn mạnh thời gian ngắn) và '恰好'. Tương đương với 'vừa vặn', 'vừa khéo', 'đúng chuẩn' trong tiếng Việt.",
    "formation": "Chủ ngữ + (Kích cỡ / Số lượng / Thời gian...) + 正好",
    "examples": [
      {
        "translation": "Kích cỡ quần áo vừa vặn lắm."
      }
    ]
  },
  "zh_V得正好_210": {
    "title": "Chủ ngữ + Động từ + 得正好 (Đến / làm gì thật đúng lúc, thật vừa khéo)",
    "shortExplanation": "Dùng '得正好' làm bổ ngữ trạng thái sau động từ để biểu thị hành động diễn ra vào một thời điểm vô cùng lý tưởng, thuận tiện hoặc kịp thời; '... thật đúng lúc'.",
    "longExplanation": "Cấu trúc 'Động từ + 得正好' (V de zhènghǎo) là cấu trúc vị ngữ mang bổ ngữ trạng thái/tình thái rất đặc trưng trong khẩu ngữ tiếng Trung. Trong đó, trợ từ kết cấu '得' kết nối động từ chính với tính từ '正好' (vừa vặn, đúng lúc) để miêu tả và đánh giá thời cơ hoặc trạng thái thực hiện của hành động đó. Động từ thường gặp nhất là '来' (như câu mẫu: 你来得正好 - Bạn đến thật đúng lúc), '赶' (赶得正好 - kịp đến thật khéo), '碰' (碰得正好 - gặp gỡ thật khéo). Cấu trúc này bộc lộ cảm xúc vui mừng, hoan nghênh của người nói khi hành động của đối phương diễn ra ngay tại thời điểm tối ưu nhất để giải quyết vấn đề hoặc tham gia vào một việc gì đó.",
    "formation": "Chủ ngữ + Động từ + 得正好",
    "examples": [
      {
        "translation": "Bạn đến thật là đúng lúc."
      }
    ]
  },
  "zh_NN差不多_211": {
    "title": "Danh từ 1 + 和 / 跟 + Danh từ 2 + 差不多 (Hai sự vật xấp xỉ nhau / gần như nhau)",
    "shortExplanation": "Dùng tính từ '差不多' (chàbuduō) làm vị ngữ so sánh giữa hai đối tượng hoặc thuộc tính: biểu thị hai bên rất giống nhau, mức độ khác biệt là cực kỳ nhỏ; 'gần như nhau', 'xêm xêm nhau'.",
    "longExplanation": "Cấu trúc 'Danh từ 1 + 和 / 跟 + Danh từ 2 + 差不多' dùng để so sánh sự tương đồng giữa hai sự vật, người hoặc đặc tính. Trong cấu trúc này, '差不多' đóng vai trò là một tính từ làm vị ngữ ở cuối câu, có nghĩa là 'không sai khác bao nhiêu', 'xấp xỉ bằng nhau', 'gần như nhau'. Cấu trúc có thể so sánh trực tiếp hai danh từ (như: 这两辆车差不多 - Hai chiếc xe này gần như nhau) hoặc so sánh một thuộc tính cụ thể của hai sự vật (như câu mẫu: 这辆车的颜色和那辆车的颜色差不多 - Màu sắc của xe này và màu sắc của xe kia gần như giống nhau). Tương đương với '... và ... xấp xỉ nhau', '... tương đương nhau' trong tiếng Việt.",
    "formation": "Danh từ 1 + 和 / 跟 + Danh từ 2 + 差不多 (hoặc: Danh từ 1 + 和 + Danh từ 2 + 的 + Đặc điểm + 差不多)",
    "examples": [
      {
        "translation": "Màu của chiếc xe này và màu của chiếc xe kia gần như giống nhau."
      }
    ]
  },
  "zh_差不多_212": {
    "title": "差不多 + Số từ + Lượng từ (Phó từ ước lượng: Khoảng / Xấp xỉ / Gần như...)",
    "shortExplanation": "Phó từ '差不多' (chàbuduō) đứng trước số từ và lượng từ hoặc biểu thức số lượng để ước lượng con số xấp xỉ; tương đương với 'khoảng', 'xấp xỉ', 'gần bằng' trong tiếng Việt.",
    "longExplanation": "Khi đứng trước một cụm số lượng (Số từ + Lượng từ + Danh từ), '差不多' đóng vai trò là một phó từ chỉ số lượng ước lượng. Nó biểu thị số lượng thực tế xấp xỉ bằng hoặc suýt soát đạt tới con số được nêu ra (có thể hơi ít hơn một chút hoặc xấp xỉ mức đó). Ví dụ trong câu mẫu: '这台电脑差不多5000块' (Chiếc máy tính này khoảng 5.000 tệ). Cấu trúc này dùng rất phong phú để ước lượng giá cả, tuổi tác, thời gian, khoảng cách, trọng lượng hay số lượng người/đồ vật. Tương đương với 'khoảng chừng...', 'xấp xỉ...', 'gần...' trong tiếng Việt.",
    "formation": "Chủ ngữ + (Vị ngữ + ) 差不多 + Số từ + Lượng từ (+ Danh từ)",
    "examples": [
      {
        "translation": "Chiếc máy tính này giá khoảng 5.000 tệ."
      }
    ]
  },
  "zh_差不多A_213": {
    "title": "差不多 + Tính từ (Phó từ: Gần như... / Xấp xỉ...)",
    "shortExplanation": "Phó từ '差不多' đứng trước tính từ hoặc cụm tính từ biểu thị mức độ xấp xỉ, gần bằng nhau hoặc tương đương; 'gần như...', 'xấp xỉ...'.",
    "longExplanation": "'差不多' (chàbuduō) khi dùng làm phó từ đứng trước tính từ (hoặc cụm như '一样高', '一样大') nhằm biểu thị mức độ chênh lệch rất nhỏ, gần như tương đương hoặc tiệm cận với tính chất đó. Trong câu thường kết hợp với cấu trúc so sánh '跟……差不多一样……'. Tương đương với 'gần như...', 'xấp xỉ...', 'ngang ngửa...' trong tiếng Việt.",
    "formation": "Chủ ngữ + (跟 + Đối tượng so sánh + ) 差不多 + (一样 + ) Tính từ",
    "examples": [
      {
        "translation": "Chiều cao của con gái tôi xấp xỉ bằng tôi."
      }
    ]
  },
  "zh_差不多V_214": {
    "title": "差不多 + Động từ (Phó từ: Gần như đã... / Sắp... xong)",
    "shortExplanation": "Phó từ '差不多' đứng trước động từ (thường đi kèm bổ ngữ kết quả như '完', '好') để biểu thị hành động đã gần như hoàn thành; 'gần như đã... xong'.",
    "longExplanation": "'差不多' (chàbuduō) khi đứng trước động từ thường kết hợp với các động từ có bổ ngữ kết quả (như 干完, 做完, 准备好) hoặc trợ từ ngữ khí '了', biểu thị hành động hoặc công việc đã tiến hành đến giai đoạn sắp kết thúc, gần như đã hoàn tất toàn bộ tiến trình. Tương đương với 'gần như đã...', 'coi như đã... xong' trong tiếng Việt.",
    "formation": "Chủ ngữ + 差不多 + Động từ (+ Bổ ngữ kết quả + 了)",
    "examples": [
      {
        "translation": "Công việc gần như đã làm xong xuôi rồi."
      }
    ]
  },
  "zh_几乎_215": {
    "title": "几乎 + Số lượng từ (Phó từ: Gần... / Suýt soát... - Chỉ số lượng xấp xỉ)",
    "shortExplanation": "Phó từ '几乎' đặt trước cụm số lượng để biểu thị số lượng hoặc mức giá đã tiệm cận, suýt soát đạt đến con số đó; 'gần...', 'suýt soát...'.",
    "longExplanation": "'几乎' (jīhū) là phó từ chỉ mức độ tiệm cận. Khi đứng trước cụm số lượng từ (như 5000块, 一半, 一年), '几乎' biểu thị con số thực tế dù chưa hoàn toàn đạt tới nhưng đã vô cùng sát với con số được nêu ra. Cấu trúc thường dùng để nhấn mạnh số lượng lớn, giá trị cao hoặc mức độ xấp xỉ rất sát. Tương đương với 'gần...', 'suýt soát...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 几乎 + Số từ + Lượng từ (+ Danh từ)",
    "examples": [
      {
        "translation": "Chiếc máy tính này có giá gần 5000 tệ."
      }
    ]
  },
  "zh_几乎A_216": {
    "title": "几乎 + Tính từ (Phó từ: Gần như... / Hầu như... - Chỉ mức độ tiệm cận)",
    "shortExplanation": "Phó từ '几乎' đứng trước tính từ để biểu thị tính chất hoặc trạng thái đã tiệm cận mức độ hoàn toàn, sai khác không đáng kể; 'gần như...', 'hầu như...'.",
    "longExplanation": "'几乎' (jīhū) khi bổ nghĩa cho tính từ có tác dụng chỉ mức độ tiệm cận tuyệt đối, tức là trạng thái hoặc tính chất đó đã đạt đến mức gần như hoàn toàn (như 相当 - tương đương, 一样 - như nhau, 不可能 - không thể). Cấu trúc này thường mang phong cách tương đối trang trọng hơn so với '差不多'. Tương đương với 'gần như...', 'hầu như...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 几乎 + Tính từ",
    "examples": [
      {
        "translation": "Được và mất gần như tương đương nhau."
      }
    ]
  },
  "zh_几乎V_217": {
    "title": "几乎 + Động từ (Phó từ: Suýt nữa... / Gần như...)",
    "shortExplanation": "Phó từ '几乎' đứng trước động từ để biểu thị hành động suýt nữa đã xảy ra (thực tế chưa xảy ra hoặc vừa kịp ngăn lại), hoặc động tác gần như đạt tới một mức độ nhất định.",
    "longExplanation": "'几乎' (jīhū) khi bổ nghĩa cho động từ thường biểu thị hai trường hợp: (1) Biểu thị một tình huống không mong muốn suýt nữa thì xảy ra trên thực tế (tương tự như '差点儿'), ví dụ '几乎忘了' (suýt nữa thì quên), '几乎跌倒' (suýt nữa thì ngã); (2) Biểu thị hành vi, trạng thái gần như đã hoàn tất hoặc bao trùm toàn bộ. Tương đương với 'suýt nữa...', 'suýt chút nữa...', 'gần như...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 几乎 + Động từ (+ Tân ngữ / Bổ ngữ)",
    "examples": [
      {
        "translation": "Chuyện này tôi suýt nữa thì quên nói cho bạn biết rồi."
      }
    ]
  },
  "zh_尽管_218": {
    "title": "尽管……，可是 / 但是…… (Dù cho / Cho dù... nhưng... - Câu phức chuyển ngoặt nhượng bộ)",
    "shortExplanation": "Liên từ '尽管' dùng ở vế trước để thừa nhận một sự thật hiển nhiên (cho dù / mặc dù...), vế sau dùng '但是', '可是' hoặc '却' để diễn tả sự chuyển ngoặt trái ngược.",
    "longExplanation": "'尽管' (jǐnguǎn) là liên từ biểu thị quan hệ nhượng bộ chuyển ngoặt. Vế câu chứa '尽管' nêu ra một điều kiện, tình huống có thật đã hoặc đang tồn tại; vế tiếp theo thường phối hợp với các liên từ chuyển ngoặt như '但是', '可是', '却' để đưa ra một kết quả hoặc hành động đi ngược lại lẽ thường. Khác với '即使' (giả thiết điều chưa xảy ra), '尽管' nhấn mạnh vào sự thật đã tồn tại. Tương đương với 'cho dù...', 'mặc dù... nhưng...' trong tiếng Việt.",
    "formation": "尽管 + Mệnh đề thừa nhận sự thật，可是 / 但是 + Mệnh đề chuyển ngoặt",
    "examples": [
      {
        "translation": "Mặc dù hôm nay trời rất lạnh, nhưng anh ấy mặc rất ít quần áo."
      }
    ]
  },
  "zh_虽然尽管却_219": {
    "title": "(虽然 / 尽管) …… 却…… ((Tuy rằng / Mặc dù)... nhưng lại... - Câu chuyển ngoặt với phó từ 却)",
    "shortExplanation": "Vế trước dùng '虽然' hoặc '尽管' (có thể lược bỏ), vế sau dùng phó từ '却' đứng sau chủ ngữ để biểu thị sự chuyển hướng trái ngược đầy ngạc nhiên hoặc đáng khen; '... nhưng lại...'.",
    "longExplanation": "Cấu trúc '(虽然/尽管) …… 却……' dùng để diễn tả quan hệ nghịch tiếp mang tính tương phản rõ rệt. Trong đó, liên từ '虽然' hoặc '尽管' có thể xuất hiện ở vế đầu hoặc được lược bỏ; điểm mấu chốt là phó từ '却' bắt buộc phải đứng sau chủ ngữ của vế thứ hai (Chủ ngữ + 却 + Vị ngữ), không được đứng trước chủ ngữ như '但是'. '却' mang sắc thái chuyển hướng tương phản nhẹ nhàng nhưng dứt khoát, thường nhấn mạnh sự bất ngờ hoặc nỗ lực kiên trì. Tương đương với 'mặc dù... nhưng lại...' trong tiếng Việt.",
    "formation": "(虽然 / 尽管 + ) Mệnh đề 1，Chủ ngữ + 却 + Vị ngữ",
    "examples": [
      {
        "translation": "(Mặc dù) công việc rất bận rộn, nhưng họ vẫn kiên trì rèn luyện mỗi ngày."
      }
    ]
  },
  "zh_而_220": {
    "title": "而 (Liên từ: Mà / Và / Còn... thì - Biểu thị quan hệ liên hợp hoặc chuyển tiếp)",
    "shortExplanation": "Liên từ '而' (ér) dùng để nối hai mệnh đề, ngữ hoặc từ, biểu thị quan hệ tăng tiến, bổ sung ('và / mà còn') hoặc biểu thị sự chuyển tiếp, đối lập ('còn... thì / nhưng mà').",
    "longExplanation": "'而' là một liên từ đa năng mang tính chất văn phong trang trọng, thanh nhã trong tiếng Trung. Nó có thể biểu thị: (1) Quan hệ liên tiếp, bổ sung thêm một khía cạnh song song ('và', 'mà'); (2) Quan hệ tương phản hoặc đối chiếu hai sự việc, tình huống khác nhau ('nhưng', 'trong khi đó, trái lại'); (3) Quan hệ nhân quả hoặc tăng tiến. Trong ví dụ cụ thể này, '而' liên kết hai khía cạnh cùng quan trọng, tương đương với 'mà', 'còn... cũng...' trong tiếng Việt.",
    "formation": "Mệnh đề 1 / Thành phần 1 + ，+ 而 + Mệnh đề 2 / Thành phần 2",
    "examples": [
      {
        "translation": "Kỹ năng nghe, nói rất quan trọng, mà năng lực viết chữ Hán cũng quan trọng không kém."
      }
    ]
  },
  "zh_挺A的_221": {
    "title": "挺 + Tính từ / Động từ tâm lý + 的 (Khẩu ngữ: Khá là... / Rất...)",
    "shortExplanation": "Cấu trúc khẩu ngữ '挺……的' (tǐng... de) dùng để biểu thị mức độ tương đối cao của đặc điểm hay cảm xúc; tương đương với 'khá là...', 'rất...'.",
    "longExplanation": "'挺……的' là một cấu trúc quen thuộc trong khẩu ngữ tiếng Trung. Phó từ '挺' mang nghĩa là khá, rất; trợ từ ngữ khí '的' ở cuối câu giúp làm mềm ngữ khí và khẳng định đánh giá chủ quan của người nói. Cấu trúc này thường đi với tính từ (như 挺好的, 挺漂亮的) hoặc các động từ chỉ tâm lý, cảm xúc (như 挺喜欢的, 挺想你的). Mức độ của '挺' cao hơn '比较' (tương đối) nhưng sắc thái nhẹ nhàng, tự nhiên hơn '很' hay '非常'.",
    "formation": "Chủ ngữ + 挺 + Tính từ / Động từ tâm lý (+ Tân ngữ) + 的",
    "examples": [
      {
        "translation": "Tôi khá là thích nơi này."
      }
    ]
  },
  "zh_本来VA_222": {
    "title": "本来 + Động từ / Tính từ (Phó từ: Vốn dĩ... / Ban đầu... - Chỉ tình trạng ban đầu)",
    "shortExplanation": "Phó từ '本来' (běnlái) đứng trước động từ hoặc tính từ để biểu thị ý định, trạng thái lúc ban đầu, thường ngụ ý tình hình hiện tại đã có sự thay đổi; 'vốn dĩ...', 'ban đầu...'.",
    "longExplanation": "'本来' đóng vai trò là phó từ chỉ thời gian hoặc trạng thái, diễn tả sự việc, dự định hay thuộc tính vốn có từ trước, lúc ban đầu. Cấu trúc này thường đi kèm với các liên từ chỉ sự chuyển ngoặt ở vế sau như '但是', '可是', '后来', '现在' để nhấn mạnh sự thay đổi hoặc khác biệt giữa quá khứ ban đầu và thực tế hiện tại. Tương đương với 'vốn dĩ...', 'ban đầu...', 'trước kia...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 本来 + Động từ / Tính từ，但是 / 可是 + Hiện tại / Thay đổi",
    "examples": [
      {
        "translation": "Ban đầu cô ấy muốn học ngành báo chí, nhưng bây giờ lại đang theo học ngành luật."
      }
    ]
  },
  "zh_本来就VA_223": {
    "title": "本来就 + Động từ / Tính từ (Vốn dĩ đã... / Vốn dĩ nên/phải... - Nhấn mạnh lẽ đương nhiên)",
    "shortExplanation": "Kết hợp '本来就' (běnlái jiù) dùng để nhấn mạnh một chân lý hiển nhiên, một đạo lý vốn có từ trước hoặc sự việc vốn dĩ hiển nhiên phải như vậy; 'vốn dĩ đã...', 'ngay từ đầu đã...'.",
    "longExplanation": "Khi phó từ '本来' kết hợp với '就' đứng trước động từ hoặc tính từ, nó không chỉ biểu thị trạng thái vốn có mà còn mang ngữ khí nhấn mạnh mạnh mẽ rằng: sự việc đó là lẽ dĩ nhiên, hiển nhiên theo lẽ thường, không cần phải bàn cãi hoặc trách móc (mang nghĩa 'vốn dĩ đã...', 'vốn dĩ ngay từ đầu đã...'). Cấu trúc thường kết hợp với các động từ chỉ sự tất yếu như '应该', '不应该', '是'. Tương đương với 'vốn dĩ đã...', 'ngay từ đầu đã không nên/phải...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 本来就 + Động từ (như 应该 / 不应该 / 是) / Tính từ",
    "examples": [
      {
        "translation": "Học sinh vốn dĩ không nên đi học muộn."
      }
    ]
  },
  "zh_另另外另外的N_224": {
    "title": "另 / 另外 / 另外的 + Số từ + Lượng từ + Danh từ (Một... khác / ... còn lại)",
    "shortExplanation": "Dùng '另', '另外' hoặc '另外的' đứng trước cụm số lượng và danh từ để chỉ một đối tượng khác ngoài đối tượng đã được đề cập; 'một... khác'.",
    "longExplanation": "Các từ chỉ thị '另' (lìng) và '另外' (lìngwài) khi đứng trước cụm số lượng (Số từ + Lượng từ + Danh từ) biểu thị sự vật hoặc người khác ngoài phạm vi đã nói trước đó. '另' chỉ đi trực tiếp với số từ (thường là '一' + lượng từ, không dùng '的'); trong khi '另外' có thể dùng '另外 + Số từ + Lượng từ' hoặc thêm '的' thành '另外的 + Số từ + Lượng từ + Danh từ'. Tương đương với 'một... khác', '... khác nữa' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ + 另 / 另外 / 另外的 + Số từ + Lượng từ + Danh từ",
    "examples": [
      {
        "translation": "Anh ấy lấy ra một cuốn sách khác."
      }
    ]
  },
  "zh_另外的其他的别的N_225": {
    "title": "另外的 / 其他的 / 别的 + Danh từ (Định ngữ: ... khác / ... còn lại)",
    "shortExplanation": "Các định từ '另外的' (lìngwài de), '其他的' (qítā de) hoặc '别的' (biéde) đứng trước danh từ để chỉ các đối tượng, sự vật hoặc người khác; '... khác'.",
    "longExplanation": "Trong tiếng Trung, '另外的', '其他的' và '别的' đều làm định ngữ đứng trước danh từ trung tâm để chỉ những đối tượng khác ngoài đối tượng đang được đề cập: (1) '别的' là từ khẩu ngữ phổ biến nhất, đứng trực tiếp trước danh từ; (2) '其他的' mang tính tề chỉnh hơn, chỉ các đối tượng còn lại trong một phạm vi nhất định; (3) '另外的' nhấn mạnh vào sự riêng biệt, nằm ngoài nhóm đã nhắc tới. Tương đương với '... khác', 'những cái khác' trong tiếng Việt.",
    "formation": "另外的 / 其他的 / 别的 + Danh từ",
    "examples": [
      {
        "translation": "Đừng đọc cuốn sách này, xin hãy đọc những cuốn sách khác."
      }
    ]
  },
  "zh_另另外V_226": {
    "title": "另 / 另外 + Động từ (Phó từ: ... thêm / ... riêng / Làm... khác)",
    "shortExplanation": "Phó từ '另' hoặc '另外' đứng trước động từ để biểu thị hành động được thực hiện thêm ngoài hành động đã có, hoặc thực hiện theo một cách thức khác; 'làm... thêm', 'làm... riêng'.",
    "longExplanation": "'另' và '另外' khi dùng làm phó từ đứng trước động từ có chức năng bổ nghĩa cho hành động: (1) Biểu thị làm thêm hành động đó ngoài những gì đã làm từ trước (tương đương với 'thêm', 'bổ sung'); (2) Biểu thị đổi cách làm hoặc thực hiện với một đối tượng khác, nơi khác (như 另想办法 - nghĩ cách khác, 另外安排 - bố trí riêng). '另' thường đi với động từ đơn âm tiết, còn '另外' dùng linh hoạt hơn. Tương đương với '... thêm', '... riêng' trong tiếng Việt.",
    "formation": "Chủ ngữ + 另 / 另外 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Anh ấy đã đưa thêm cho tôi ba mươi tệ nữa."
      }
    ]
  },
  "zh_另外_227": {
    "title": "另外，…… (Liên từ: Ngoài ra,... / Hơn nữa,... - Bổ sung thông tin)",
    "shortExplanation": "Liên từ '另外' đặt ở đầu câu hoặc phân câu thứ hai (thường có dấu phẩy đi kèm) để bổ sung thêm một ý, thông tin hoặc lời dặn dò khác; 'ngoài ra, ...', 'hơn nữa, ...'.",
    "longExplanation": "'另外' (lìngwài) khi đứng độc lập ở đầu câu hoặc đầu phân câu đóng vai trò như một liên từ kết nối câu. Nó dùng để chuyển sang bổ sung thêm một sự việc, ý kiến, yêu cầu hoặc lời nhắc nhở mới nằm ngoài nội dung vừa trình bày ở câu trước. Sau '另外' thường có dấu phẩy ngắt quãng. Tương đương với 'ngoài ra,...', 'thêm vào đó,...', 'bên cạnh đó,...' trong tiếng Việt.",
    "formation": "Mệnh đề 1。另外，(Chủ ngữ + ) Mệnh đề bổ sung",
    "examples": [
      {
        "translation": "Hãy ăn nhiều hoa quả nhé. Ngoài ra, cũng phải nhớ uống nhiều nước nữa."
      }
    ]
  },
  "zh_首先其次_228": {
    "title": "首先……，其次…… (Liên từ: Trước tiên... tiếp theo / Thứ nhất... thứ hai...)",
    "shortExplanation": "Cặp liên từ '首先……，其次……' dùng để liệt kê các sự việc, thứ tự ưu tiên hoặc các luận điểm theo trình tự; 'trước tiên... tiếp theo...', 'thứ nhất là... thứ hai là...'.",
    "longExplanation": "'首先……，其次……' (shǒuxiān... qícì...) là cặp liên từ liên kết các vế câu dùng trong văn viết và khẩu ngữ trang trọng, biểu thị trình tự sắp xếp các bước thực hiện hoặc tầm quan trọng của các luận điểm. '首先' nêu ra điểm cốt lõi, việc cần làm trước hết; '其次' nối tiếp đưa ra việc hoặc ý tiếp theo sau đó. Tương đương với 'trước tiên... tiếp theo là...', 'thứ nhất... thứ hai...' trong tiếng Việt.",
    "formation": "(Chủ ngữ + ) 首先 + Mệnh đề 1，其次 + Mệnh đề 2",
    "examples": [
      {
        "translation": "Khi đi phỏng vấn xin việc, trước tiên phải mặc quần áo trang trọng, tiếp theo là đừng căng thẳng."
      }
    ]
  },
  "zh_不管_229": {
    "title": "不管……，都 / 也…… (Liên từ: Bất kể... / Cho dù... đều...)",
    "shortExplanation": "Liên từ '不管' biểu thị điều kiện vô điều kiện; dù trong bất kỳ tình huống, hoàn cảnh nào thì kết quả vẫn không thay đổi; 'cho dù...', 'bất kể... đều...'.",
    "longExplanation": "'不管' (bùguǎn) là liên từ biểu thị điều kiện bài trừ (vô điều kiện). Vế câu chứa '不管' thường đi cùng từ để hỏi (như 什么, 谁, 哪儿, 怎么), hình thức lựa chọn (……还是……), hoặc thể khẳng định - phủ định liền nhau (去不去, 好不好), biểu thị bao hàm toàn bộ mọi khả năng; vế sau bắt buộc dùng phó từ '都' hoặc '也' để chỉ kết luận không thay đổi. '不管' mang khẩu ngữ tự nhiên hơn '无论'. Tương đương với 'cho dù...', 'bất kể... đều...' trong tiếng Việt.",
    "formation": "不管 + Từ để hỏi / ……还是…… / Khẳng định-Phủ định (+ Danh từ) ，Chủ ngữ + 都 / 也 + Vị ngữ",
    "examples": [
      {
        "translation": "Bất kể là phim gì, tôi đều thích xem cả."
      }
    ]
  },
  "zh_以为_230": {
    "title": "以为 (Động từ: Tưởng rằng... / Cứ ngỡ là... - Nhận định sai thực tế)",
    "shortExplanation": "Động từ '以为' dùng khi người nói cho rằng một điều gì đó là đúng, nhưng thực tế sự thật lại hoàn toàn trái ngược; 'tưởng rằng...', 'cứ ngỡ là...'.",
    "longExplanation": "'以为' (yǐwéi) là động từ nhận thức, biểu thị phán đoán hoặc nhận định chủ quan của người nói trong quá khứ mà sau đó đã được chứng minh là sai lầm hoặc không phù hợp với thực tế khách quan. Câu thường đi kèm với '其实' (thực ra), '原来' (hóa ra) hoặc '没想到' (không ngờ) ở vế sau để đính chính sự thật. Cần phân biệt với '认为' (cho rằng - nhận định nghiêm túc, có căn cứ). Tương đương với 'tưởng rằng...', 'cứ ngỡ là...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 以为 + Mệnh đề phán đoán sai (，其实 / 原来 + Sự thật)",
    "examples": [
      {
        "translation": "Tôi cứ tưởng món đồ đó là cho tôi, thực ra là cho bố."
      }
    ]
  },
  "zh_原来本来_231": {
    "title": "原来 / 本来 (Phó từ: Ban đầu / Vốn dĩ / Trước kia)",
    "shortExplanation": "'原来' và '本来' đều có thể biểu thị tình trạng, kế hoạch hoặc thời gian vốn có lúc ban đầu trước khi có sự thay đổi; 'ban đầu...', 'vốn dĩ...'.",
    "longExplanation": "'原来' (yuánlái) và '本来' (běnlái) trong nét nghĩa chỉ thời gian đều có thể làm phó từ hoặc trạng ngữ đứng trước động từ/vị ngữ, biểu thị sự việc, tính chất hoặc kế hoạch ở vào trạng thái ban đầu, trước khi phát sinh biến đổi hay sự điều chỉnh nào đó. Cả hai đều có thể diễn đạt ý 'ban đầu / trước đây / vốn dĩ'. (Lưu ý: '原来' còn có nét nghĩa 'hóa ra là' mà '本来' không có; '本来' có nét nghĩa 'lẽ ra, đáng lý' mà '原来' không có). Tương đương với 'ban đầu...', 'vốn dĩ...', 'trước kia...' trong tiếng Việt.",
    "formation": "(Chủ ngữ + ) 原来 / 本来 + Động từ (+ Tân ngữ / Bổ ngữ)",
    "examples": [
      {
        "translation": "Ban đầu vốn dĩ cần đến 12 tiếng đồng hồ."
      }
    ]
  },
  "zh_原来clause_232": {
    "title": "原来 + Mệnh đề (Phó từ: Hóa ra là... / Thì ra là... - Nhận ra sự thật)",
    "shortExplanation": "Phó từ '原来' đứng trước một mệnh đề để biểu thị người nói vừa mới phát hiện hoặc vỡ lẽ ra sự thật vốn có từ trước; 'hóa ra là...', 'thì ra là...'.",
    "longExplanation": "'原来' (yuánlái) khi đứng ở đầu mệnh đề hoặc trước vị ngữ có thể biểu thị sự đốn ngộ, vỡ lẽ sau khi phát hiện ra một sự thật hay nguyên nhân mà trước đó bản thân chưa từng biết đến. Cấu trúc thường kết hợp ở vế trước với '我以为……' (tôi cứ tưởng là...) hoặc câu hỏi thắc mắc, vế sau dùng '原来……' kèm trợ từ cảm thán '啊', '呀' ở cuối câu để bộc lộ sự ngạc nhiên, bất ngờ. (Lưu ý: nét nghĩa này chỉ dùng '原来', tuyệt đối không được thay bằng '本来'). Tương đương với 'hóa ra là...', 'thì ra là...' trong tiếng Việt.",
    "formation": "(Mệnh đề hoài nghi / suy đoán ，) (Chủ ngữ + ) 原来 + Mệnh đề sự thật (+ Trợ từ ngữ khí 啊 / 呢)",
    "examples": [
      {
        "translation": "Tôi cứ tưởng là ai giúp tôi dọn dẹp phòng chứ, hóa ra là bạn à!"
      }
    ]
  },
  "zh_本来就VA_233": {
    "title": "本来就 + Động từ / Tính từ (Phó từ: Vốn dĩ đã... / Lẽ dĩ nhiên là...)",
    "shortExplanation": "Cấu trúc '本来就' đứng trước động từ hoặc tính từ nhằm nhấn mạnh tính chất, sự thật vốn có từ đầu hoặc lẽ đương nhiên phải như vậy; 'vốn dĩ đã...'.",
    "longExplanation": "'本来就' (běnlái jiù) kết hợp với động từ hoặc tính từ để nhấn mạnh một sự thật, tính chất vốn dĩ đã tồn tại từ trước đó hoặc là điều hiển nhiên theo lẽ thường, không cần bàn cãi hay ngạc nhiên. Cấu trúc thường dùng để giải thích lý do, khẳng định sự việc không có gì bất ngờ, hoặc phê phán việc làm thừa thãi (ví dụ: '天气本来就冷' - thời tiết vốn đã lạnh rồi; '这件事本来就应该他做' - việc này vốn dĩ là trách nhiệm của anh ấy). Tương đương với 'vốn dĩ đã...', 'vốn đã...', 'lẽ ra đương nhiên là...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 本来就 + Động từ / Tính từ (+ Tân ngữ / Bổ ngữ)",
    "examples": [
      {
        "translation": "-"
      }
    ]
  },
  "zh_并不并没VA_234": {
    "title": "并不 / 并没 + Động từ / Tính từ (Phó từ: Không hề... / Hoàn toàn không... - Nhấn mạnh phủ định)",
    "shortExplanation": "Phó từ '并' đứng trước '不' hoặc '没' để nhấn mạnh ngữ khí phủ định, thường dùng để bác bỏ một nhận định sai lầm hoặc làm rõ sự thật; 'không hề...', 'hoàn toàn không...'.",
    "longExplanation": "'并不 / 并没' (bìng bù / bìng méi) là cấu trúc nhấn mạnh sự phủ định trong tiếng Trung. Trong đó, phó từ '并' bổ nghĩa cho từ phủ định '不' (phủ định tính chất, thói quen, nhận thức hiện tại/tương lai) hoặc '没' (phủ định hành động chưa xảy ra hoặc đã hoàn thành), nhằm bác bỏ giả định, suy đoán hay định kiến của đối phương hoặc người khác. Cấu trúc thường đi sau các liên từ chuyển ngoặt như '但是', '可是', '其实'. Tương đương với 'không hề...', 'hoàn toàn không...', 'thực ra chẳng...' trong tiếng Việt.",
    "formation": "Chủ ngữ + (但是 / 其实 + ) 并不 / 并没 + Động từ / Tính từ (+ Tân ngữ / Bổ ngữ)",
    "examples": [
      {
        "translation": "Mọi người đều nói bên ngoài rất lạnh, nhưng tôi lại không hề thấy lạnh chút nào."
      }
    ]
  },
  "zh_按照N_235": {
    "title": "按照 + Danh từ (Giới từ: Căn cứ vào... / Theo như... - Dựa theo tiêu chuẩn)",
    "shortExplanation": "Giới từ '按照' đặt trước danh từ để nêu ra căn cứ, tiêu chuẩn, kế hoạch hoặc quy định làm kim chỉ nam cho hành động; 'căn cứ vào...', 'theo...'.",
    "longExplanation": "'按照' (ànzhào) là giới từ dùng để dẫn xuất căn cứ, phương châm, kế hoạch, luật lệ hoặc tiêu chuẩn mà hành động cần tuân thủ theo. Đi sau '按照' thường là các danh từ chỉ kế hoạch, quy định, yêu cầu, phong tục tập quán (như 计划, 规定, 要求, 习惯). Khác với '根据' (thiên về căn cứ đưa ra kết luận logic), '按照' nhấn mạnh vào việc làm theo, thực hiện rập khuôn theo một khuôn mẫu hay chỉ dẫn có sẵn. Tương đương với 'theo như...', 'căn cứ vào...', 'chiếu theo...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 按照 + Danh từ / Cụm danh từ + Động từ (+ Tân ngữ / Bổ ngữ)",
    "examples": [
      {
        "translation": "Chúng tôi vẫn tiến hành theo đúng như kế hoạch ban đầu."
      }
    ]
  },
  "zh_甚至VA_236": {
    "title": "甚至 + Động từ / Tính từ (Liên từ / Phó từ: Thậm chí... / Ngay cả... - Tăng tiến cực đoan)",
    "shortExplanation": "'甚至' đứng trước động từ hoặc tính từ để nêu ra một ví dụ nổi bật, vượt quá mức thông thường nhằm biểu thị quan hệ tăng tiến cực đoan; 'thậm chí...', 'ngay cả...'.",
    "longExplanation": "'甚至' (shènzhì) vừa là liên từ vừa là phó từ mang ý nghĩa tăng tiến vượt bậc. Khi đứng trước động từ hoặc tính từ, nó dẫn ra một tình huống hoặc hành vi mang tính cực đoan, bất ngờ hoặc vượt ngoài lẽ thường tình để làm nổi bật mức độ sâu sắc của sự việc được đề cập ở vế trước. Thường dùng trong cấu trúc '……，甚至 (连) …… 都 / 也……'. Tương đương với 'thậm chí...', 'ngay cả...', 'thậm chí đến mức...' trong tiếng Việt.",
    "formation": "Mệnh đề 1 ，(Chủ ngữ + ) 甚至 + Động từ / Tính từ (+ Tân ngữ / Bổ ngữ)",
    "examples": [
      {
        "translation": "Anh ấy làm việc rất chăm chỉ, thậm chí còn quên cả ăn cơm."
      }
    ]
  },
  "zh_肯定VA_237": {
    "title": "肯定 + Động từ / Tính từ (Phó từ: Nhất định... / Chắc chắn... - Khẳng định dứt khoát)",
    "shortExplanation": "Phó từ '肯定' đứng trước động từ hoặc tính từ biểu thị sự phán đoán chắc chắn, không còn chút nghi ngờ nào; 'chắc chắn...', 'nhất định...'.",
    "longExplanation": "'肯定' (kěndìng) khi dùng làm phó từ đứng trước vị ngữ (động từ hoặc tính từ) có tác dụng khẳng định phán đoán một cách chắc chắn tuyệt đối. Người nói có niềm tin vững chắc vào việc sự việc sẽ diễn ra hoặc tính chất đó là đúng sự thật, không hề do dự hay hoài nghi. Sắc thái khẳng định của '肯定' tương tự như '一定', nhưng mang màu sắc phán đoán nhận thức chủ quan rõ rệt hơn. Tương đương với 'chắc chắn...', 'nhất định sẽ...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 肯定 + Động từ / Tính từ (+ Tân ngữ / Bổ ngữ)",
    "examples": [
      {
        "translation": "Vận động chắc chắn có lợi cho sức khỏe thể chất."
      }
    ]
  },
  "zh_肯定_238": {
    "title": "肯定 (Động từ: Dám chắc / Khẳng định - Xác nhận với niềm tin tuyệt đối)",
    "shortExplanation": "Động từ '肯定' biểu thị hành động xác nhận, tin tưởng chắc chắn vào một sự việc mà không hề hoài nghi; 'dám chắc...', 'khẳng định...'.",
    "longExplanation": "'肯定' (kěndìng) ở đây đóng vai trò là một ngoại động từ nhận thức, biểu thị hành vi thừa nhận hoặc xác quyết một sự thật với niềm tin tuyệt đối. Thường kết hợp với các động từ năng nguyện như '能', '可以' tạo thành cụm '能肯定', '可以肯定' (có thể dám chắc rằng), theo sau là một mệnh đề tân ngữ trần thuật sự việc. Khác với phó từ '肯定' (bổ nghĩa cho động từ khác), động từ '肯定' trực tiếp đứng làm vị ngữ mang mệnh đề. Tương đương với 'dám chắc', 'khẳng định rằng' trong tiếng Việt.",
    "formation": "Chủ ngữ + (能 / 可以 + ) 肯定 + ，+ Mệnh đề được xác quyết",
    "examples": [
      {
        "translation": "Tôi có thể dám chắc rằng Trương Viễn nhất định sẽ đến."
      }
    ]
  },
  "zh_肯定的_239": {
    "title": "肯定的 (Tính từ: Mang tính khẳng định / Đồng ý - Câu trả lời tích cực)",
    "shortExplanation": "Hình thức '肯定的' dùng làm định ngữ hoặc vị ngữ để chỉ tính chất khẳng định, đồng ý hoặc tán thành; 'mang tính khẳng định', 'đồng ý'.",
    "longExplanation": "'肯定的' (kěndìng de) đóng vai trò là tính từ (hoặc kết cấu chữ 的), mang ý nghĩa tán thành, thừa nhận hoặc trả lời 'có/đúng' (trái nghĩa với 'phủ định' - 否定的). Thường xuất hiện trong cấu trúc vị ngữ '是肯定的' để mô tả câu trả lời, thái độ hoặc kết quả là mang tính tán thành, đồng thuận hoặc chắc chắn. Tương đương với 'mang tính khẳng định', 'là đồng ý', 'tán thành' trong tiếng Việt.",
    "formation": "Chủ ngữ (Câu trả lời / Thái độ / Kết quả) + 是肯定的",
    "examples": [
      {
        "translation": "Câu trả lời của anh ấy mang tính khẳng định (tức là đồng ý)."
      }
    ]
  },
  "zh_再说_240": {
    "title": "……再说 (Động từ / Cụm khẩu ngữ: Để sau rồi tính / Hãy hay / Bàn sau)",
    "shortExplanation": "Cụm '再说' đặt ở cuối câu hoặc sau một điều kiện thời gian để chỉ việc tạm gác sự việc lại, đợi đến thời điểm thích hợp sau này mới tính tiếp; 'để sau rồi tính', 'hãy hay'.",
    "longExplanation": "'再说' (zàishuō) khi đặt ở cuối câu (thường đi với trợ từ ngữ khí '吧') đóng vai trò là một động từ ngữ mang nghĩa hoãn lại một việc nào đó. Cấu trúc thường có vế đầu nêu ra một điều kiện thời gian, mốc hoàn thành (như 考完 - thi xong, 回去 - về nhà, 明天 - ngày mai), vế sau dùng '再说' để ngụ ý rằng hiện tại chưa cần đưa ra quyết định hay vội vàng hành động, cứ chờ làm xong việc trước mắt rồi hẵng bàn tiếp. Tương đương với 'để sau rồi tính', 'bàn sau', 'rồi hẵng hay' trong tiếng Việt.",
    "formation": "(Mệnh đề lý do ，) Điều kiện thời gian / Hành động hoàn thành + 再说 (+ 吧)",
    "examples": [
      {
        "translation": "Bây giờ bận học quá, đợi thi xong rồi hẵng tính sau nhé."
      }
    ]
  },
  "zh_再说_241": {
    "title": "再说 (Liên từ: Hơn nữa / Vả lại / Với lại - Bổ sung thêm lý do)",
    "shortExplanation": "Liên từ '再说' đứng ở đầu vế câu sau để bổ sung thêm một lý do, nguyên nhân hoặc tình huống quan trọng khác; 'hơn nữa...', 'vả lại...'.",
    "longExplanation": "'再说' (zàishuō) khi dùng làm liên từ có tác dụng liên kết các mệnh đề, thường đứng ở đầu vế câu thứ hai để đưa ra thêm một lý do hoặc hoàn cảnh bổ sung củng cố cho kết luận hoặc trạng thái ở vế trước. Thường đi sau dấu phẩy và mang khẩu ngữ tự nhiên, gần gũi hơn so với '况且' hay '而且'. Tương đương với 'hơn nữa...', 'vả lại...', 'với lại...' trong tiếng Việt.",
    "formation": "Mệnh đề 1 ，再说 + ，+ Mệnh đề lý do bổ sung",
    "examples": [
      {
        "translation": "Sau khi tốt nghiệp mọi người đều rất bận rộn, vả lại, rất nhiều bạn học không ở cùng một thành phố."
      }
    ]
  },
  "zh_实际的_242": {
    "title": "实际的 + Danh từ (Tính từ làm định ngữ: Thực tế / Trên thực tế - Đối lập với quảng cáo, lý thuyết)",
    "shortExplanation": "Cụm '实际的' dùng làm định ngữ đứng trước danh từ để chỉ tính chất thực tế, có thật trong đời sống (đối lập với tưởng tượng, quảng cáo, lý thuyết); 'thực tế', 'thực sự'.",
    "longExplanation": "'实际' (shíjì) là tính từ chỉ những gì tồn tại trong hiện thực khách quan, có thật, cụ thể chứ không phải là giả định, quảng cáo hay lý thuyết suông. Khi kết hợp với trợ từ kết cấu '的' tạo thành cụm định ngữ '实际的', nó bổ nghĩa cho danh từ đứng sau (như 实际的东西 - đồ vật thực tế, 实际的情况 - tình hình thực tế, 实际的困难 - khó khăn thực tế). Cấu trúc thường dùng để đối chiếu giữa hiện thực cụ thể với những lời quảng cáo, suy nghĩ hay kế hoạch trên giấy tờ. Tương đương với 'thực tế', 'trên thực tế', 'có thật' trong tiếng Việt.",
    "formation": "实际的 + Danh từ (+ Vị ngữ)",
    "examples": [
      {
        "translation": "Món đồ thực tế không giống với những gì trên quảng cáo."
      }
    ]
  },
  "zh_实际_243": {
    "title": "实际 (Danh từ / Tính từ: Thực tế / Thực tiễn)",
    "shortExplanation": "Dùng làm danh từ chỉ thực tế khách quan, hoặc tính từ chỉ sự cụ thể, phù hợp với sự thật khách quan; 'thực tế', 'thực tiễn'.",
    "longExplanation": "'实际' (shíjì) có thể làm danh từ hoặc tính từ: (1) Khi làm danh từ, chỉ tình hình hoặc sự vật có thật trong đời sống khách quan, đối lập với lý thuyết hay ảo tưởng (ví dụ: '脱离实际' - thoát ly thực tế, '跟实际不一样' - không giống với thực tế); (2) Khi làm tính từ, chỉ sự việc cụ thể, thực tiễn, có hiệu quả thiết thực (ví dụ: '实际行动' - hành động thực tế, '实际问题' - vấn đề thực tế). Tương đương với 'thực tế', 'thực tiễn' trong tiếng Việt.",
    "formation": "Chủ ngữ + 跟 / 与 + 实际 + 不一样 / 符合",
    "examples": [
      {
        "translation": "Quảng cáo không giống với thực tế."
      }
    ]
  },
  "zh_实际上_244": {
    "title": "实际上 (Phó từ liên kết: Trên thực tế / Thực ra)",
    "shortExplanation": "Đứng đầu câu hoặc sau chủ ngữ để chuyển hướng ý câu, chỉ rõ bản chất sự thật đối lập với vẻ bề ngoài hay nhận định ban đầu; 'thực tế là', 'trên thực tế', 'thực ra'.",
    "longExplanation": "'实际上' (shíjìshang) đóng vai trò như một phó từ liên kết hoặc ngữ liên kết đầu câu, dùng để đính chính, làm rõ hoặc bổ sung sự thật khách quan trái ngược với những gì người ta nhìn thấy bề ngoài, nghe đồn hoặc dự đoán trước đó. Thường tương đương với '其实' (kỳ thực) nhưng mang phong thái văn phong khách quan, trung tính hơn. Tương đương với 'trên thực tế', 'thực ra thì', 'thực chất' trong tiếng Việt.",
    "formation": "Mệnh đề 1，实际上 + Mệnh đề 2 (hoặc: Chủ ngữ + 实际上 + Vị ngữ)",
    "examples": [
      {
        "translation": "Quảng cáo nói thì hay, nhưng trên thực tế chưa chắc đã tốt."
      }
    ]
  },
  "zh_对来说_245": {
    "title": "对……来说 (Giới từ: Đối với... mà nói / Xét từ góc độ...)",
    "shortExplanation": "Đặt ở đầu câu hoặc trước vị ngữ, dùng để nêu ra chủ thể nhận định; 'đối với... mà nói', 'xét từ góc độ của...'.",
    "longExplanation": "Cấu trúc '对 + Đối tượng + 来说' (duì... láishuō) là mẫu câu quen thuộc dùng để xác định góc độ, lập trường hoặc trải nghiệm chủ quan của một đối tượng cụ thể (người, tập thể, hoặc sự vật). Theo sau cấu trúc này là lời nhận xét, đánh giá hoặc cảm nghĩ về tầm quan trọng, mức độ khó dễ, giá trị của sự việc đối với đối tượng đó. Trong văn bản trang trọng có thể dùng '对……而言' (duì... éryán). Tương đương với 'đối với... mà nói', 'với... thì...' trong tiếng Việt.",
    "formation": "对 + Danh từ / Đại từ + 来说，Chủ ngữ + Vị ngữ",
    "examples": [
      {
        "translation": "Đối với tôi mà nói, cơ hội học tập quan trọng hơn."
      }
    ]
  },
  "zh_特别_246": {
    "title": "特别 + Tính từ / Động từ tâm lý (Phó từ mức độ: Đặc biệt... / Vô cùng...)",
    "shortExplanation": "Đứng trước tính từ hoặc động từ chỉ tâm lý/trạng thái để nhấn mạnh mức độ cao vượt trội; 'đặc biệt...', 'vô cùng...', 'hết sức...'.",
    "longExplanation": "'特别' (tèbié) khi đóng vai trò là phó từ chỉ mức độ sẽ đứng trước tính từ (như 好, 漂亮, 像) hoặc động từ biểu thị tâm lý, cảm xúc (như 喜欢, 感谢, 关心). Nó diễn tả mức độ vượt qua mức bình thường rất nhiều, mang sắc thái khen ngợi, cảm thán hoặc làm nổi bật tính chất đặc thù. Có thể dùng thay thế cho '非常' hay '格外'. Tương đương với 'đặc biệt...', 'vô cùng...', 'hết sức...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 特别 + Tính từ / Động từ tâm lý",
    "examples": [
      {
        "translation": "Con gái của bác trông đặc biệt giống bác."
      }
    ]
  },
  "zh_特别尤其_247": {
    "title": "特别 / 尤其 (Phó từ liên kết: Đặc biệt là / Nhất là...)",
    "shortExplanation": "Dùng để nêu bật một đối tượng cụ thể hoặc trường hợp điển hình nhất trong một phạm vi đã nhắc đến; thường kết hợp thành '特别是', '尤其是'; 'đặc biệt là...', 'nhất là...'.",
    "longExplanation": "'特别' (tèbié) và '尤其' (yóuqí) khi dùng để liên kết thường đứng ở vế sau của câu, sau dấu phẩy, thường đi kèm với chữ '是' tạo thành '特别是' hoặc '尤其是'. Cấu trúc này dùng khi vế trước đã nêu một nhận định chung hoặc một nhóm đối tượng, sau đó người nói muốn trích xuất riêng một chi tiết, một bộ phận nổi bật nhất để nhấn mạnh. So với '特别', '尤其' có phong cách trang trọng và thiên về văn viết hơn một chút. Tương đương với 'đặc biệt là...', 'nhất là...', 'riêng...' trong tiếng Việt.",
    "formation": "Mệnh đề khái quát，特别是 / 尤其是 + Danh từ / Bộ phận nổi bật",
    "examples": [
      {
        "translation": "Con gái của bác trông thật giống bác, đặc biệt là / nhất là đôi mắt."
      }
    ]
  },
  "zh_特别的_248": {
    "title": "特别的 + Danh từ (Tính từ làm định ngữ: ...đặc biệt / ...riêng biệt)",
    "shortExplanation": "'特别' làm tính từ kết hợp với trợ từ kết cấu '的' đứng trước danh từ để bổ nghĩa, biểu thị tính chất khác biệt, đặc thù, khác với thông thường; '...đặc biệt'.",
    "longExplanation": "'特别' (tèbié) khi đóng vai trò tính từ có ý nghĩa là 'khác thường, độc đáo, đặc thù'. Khi kết hợp với '的' thành cụm '特别的 + Danh từ', nó làm định ngữ để làm rõ rằng sự vật đó không tầm thường, có những tính chất, yêu cầu hoặc ý nghĩa riêng biệt so với mặt bằng chung (ví dụ: '特别的要求' - yêu cầu đặc biệt, '特别的日子' - ngày đặc biệt, '特别的礼物' - món quà đặc biệt). Tương đương với '...đặc biệt', '...riêng biệt' trong tiếng Việt.",
    "formation": "特别的 + Danh từ",
    "examples": [
      {
        "translation": "Tôi có một yêu cầu đặc biệt."
      }
    ]
  },
  "zh_竟然VA_249": {
    "title": "竟然 + Động từ / Tính từ (Phó từ ngữ khí: Lại có thể... / Không ngờ lại...)",
    "shortExplanation": "Đứng trước động từ hoặc tính từ để diễn tả sự việc xảy ra hoàn toàn bất ngờ, không ngờ tới, nằm ngoài sức tưởng tượng của người nói; 'không ngờ lại...', 'lại có thể...'.",
    "longExplanation": "'竟然' (jìngrán) là phó từ ngữ khí biểu thị sự bất ngờ mạnh mẽ. Nó đứng trước vị ngữ (động từ hoặc tính từ) để nhấn mạnh rằng một hành động, sự tình hay hiện tượng đã xảy ra hoàn toàn trái với quy luật bình thường, trái với dự liệu của người nói hoặc số đông (ví dụ: '竟然没听过' - không ngờ lại chưa từng nghe, '竟然考了第一名' - không ngờ lại đỗ thủ khoa). Mang sắc thái kinh ngạc, có thể tích cực hoặc tiêu cực tùy ngữ cảnh. Đồng nghĩa với '居然'. Tương đương với 'không ngờ lại...', 'ai mà ngờ...', 'lại có thể...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 竟然 + Động từ / Tính từ (+ Tân ngữ / Bổ ngữ)",
    "examples": [
      {
        "translation": "Bài hát này cực kỳ hay, dạo này đang rất thịnh hành, cậu mà lại chưa từng nghe qua sao?"
      }
    ]
  },
  "zh_倍_250": {
    "title": "Số từ + 倍 (Lượng từ đo lường: Gấp... lần)",
    "shortExplanation": "Lượng từ '倍' đứng sau số từ dùng để biểu thị bội số, số lần gấp lên của một đại lượng; 'gấp... lần'.",
    "longExplanation": "'倍' (bèi) là lượng từ chuyên dụng biểu thị bội số trong tiếng Trung: (1) Biểu thị công thức toán học cơ bản: 'A 是 B 的 X 倍' (A gấp X lần B); (2) Biểu thị sự gia tăng số lượng: '增加 / 提高了一倍' (tăng thêm 1 lần, tức là gấp đôi). Lưu ý: '倍' trong tiếng Trung chỉ dùng cho sự gia tăng hoặc bằng bội số nguyên/thập phân, không dùng cho sự giảm sút (giảm sút thì dùng phân số hoặc phần trăm). Tương đương với 'gấp... lần', 'bội số' trong tiếng Việt.",
    "formation": "Số từ + 倍 (ví dụ: Đối tượng 1 + 是 + Đối tượng 2 + 的 + Số từ + 倍)",
    "examples": [
      {
        "translation": "Hai gấp năm lần là mười."
      }
    ]
  },
  "zh_值得V_251": {
    "title": "值得 + Động từ (Động từ năng nguyện: Đáng để... / Xứng đáng...)",
    "shortExplanation": "Đứng trước động từ (thường là động từ hai âm tiết) biểu thị hành động đó có giá trị, mang lại lợi ích xứng đáng để thực hiện; 'đáng để...', 'bõ công...'.",
    "longExplanation": "'值得' (zhíde) là động từ biểu thị sự đánh giá về giá trị. Khi kết hợp với một động từ ở phía sau (thường là động từ trừu tượng 2 âm tiết như 考虑 - cân nhắc, 学习 - học hỏi, 参观 - tham quan, 推荐 - giới thiệu), nó chỉ ra rằng kết quả hoặc trải nghiệm thu được hoàn toàn xứng đáng với thời gian, tiền bạc hoặc công sức bỏ ra. Phủ định là '不值得'. Tương đương với 'đáng để...', 'xứng đáng để...' trong tiếng Việt.",
    "formation": "Chủ ngữ + (很 / 都) 值得 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Bác xem cái này xem, dù là nhìn từ góc độ giá cả hay chất lượng, thì đều rất đáng để cân nhắc đấy ạ."
      }
    ]
  },
  "zh_值值得_252": {
    "title": "值 / 值得 (Tính từ / Động từ vị ngữ: Đáng giá / Bõ công)",
    "shortExplanation": "Dùng độc lập làm vị ngữ ở cuối câu để đánh giá một hành vi hay sự việc có bõ công, có đáng giá hay không; thường dùng ở thể phủ định '不值 / 不值得' (không đáng / chả bõ).",
    "longExplanation": "'值' (zhí) hoặc '值得' (zhíde) có thể đứng độc lập làm thành phần vị ngữ, không cần động từ đi kèm phía sau. Khi dùng như vậy, từ này đóng vai trò đánh giá xem cái giá phải trả (về tâm trạng, tiền bạc, thời gian, sức lực) có tương xứng hay không. Cực kỳ phổ biến trong khẩu ngữ ở dạng phủ định '不值' hoặc '不值得', mang hàm ý 'chẳng bõ', 'không đáng để hao tâm tổn sức vì chuyện cỏn con'. Tương đương với 'đáng giá', 'bõ công' hoặc 'chẳng bõ', 'không đáng' trong tiếng Việt.",
    "formation": "Chủ ngữ + (很) 值 / 值得 (hoặc: Chủ ngữ + 不值 / 不值得)",
    "examples": [
      {
        "translation": "Đừng lúc nào cũng bực mình vì mấy chuyện vặt vãnh, không đáng đâu."
      }
    ]
  },
  "zh_值_253": {
    "title": "值 + Số tiền (Động từ: Trị giá... tiền / Đáng giá...)",
    "shortExplanation": "Động từ '值' nhận tân ngữ là số tiền cụ thể để chỉ giá trị bằng tiền của một đồ vật; 'trị giá...', 'đáng giá...'.",
    "longExplanation": "'值' (zhí) dùng như một ngoại động từ chỉ giá trị tiền tệ. Khi kết hợp với cụm từ chỉ số tiền (như 五十块, 一千元, 两百万), cấu trúc này biểu thị giá trị định lượng thực tế hoặc ước lượng của một tài sản hay đồ vật nào đó. Khác với '卖' (bán với giá), '值' nhấn mạnh vào giá trị nội tại hoặc giá trị tương xứng của đồ vật. Tương đương với 'đáng giá...', 'trị giá...' trong tiếng Việt.",
    "formation": "Danh từ (vật phẩm) + 值 + Số từ + Lượng từ tiền tệ",
    "examples": [
      {
        "translation": "Chiếc đồng hồ đeo tay này đáng giá 50 tệ."
      }
    ]
  },
  "zh_其中_254": {
    "title": "其中 (Danh từ chỉ phương vị / Đại từ: Trong đó / Trong số đó)",
    "shortExplanation": "Dùng để chỉ một phần hoặc các đối tượng cụ thể nằm trong một tập hợp, phạm vi tổng thể đã nêu trước đó; 'trong đó', 'trong số đó'.",
    "longExplanation": "'其中' (qízhōng) là danh từ chỉ phương vị có chức năng như đại từ chỉ định phạm vi. Nó luôn quy chiếu về một tập thể, một số lượng hay một tình huống tổng thể đã được đề cập ở câu trước hoặc vế trước. Thường đứng độc lập ở đầu vế câu sau, hoặc kết hợp thành cụm định ngữ '其中的 + Danh từ' (những... trong số đó). Tương đương với 'trong đó', 'trong số đó', 'ở trong đó' trong tiếng Việt.",
    "formation": "Phạm vi tổng thể，(Chủ ngữ + ) 其中 (+ 的 + Danh từ) + Vị ngữ",
    "examples": [
      {
        "translation": "Chúng ta không những phải biết đọc sách, mà còn phải biết chọn lọc những cuốn sách hay trong số đó để đọc."
      }
    ]
  },
  "zh_在SITUATION下_255": {
    "title": "(在)……下 (Cụm giới từ: Trong hoàn cảnh... / Dưới điều kiện... / Dưới sự...)",
    "shortExplanation": "Dùng để nêu rõ điều kiện, bối cảnh, hoàn cảnh hoặc sự giúp đỡ, chỉ đạo của người khác mà một sự việc được diễn ra; 'trong hoàn cảnh...', 'dưới sự...'.",
    "longExplanation": "Cấu trúc '(在)……下' ((zài)... xià) là một kết cấu giới từ chỉ điều kiện hoặc hoàn cảnh: (1) Chỉ điều kiện, hoàn cảnh khách quan: thường đi với '情况' (tình hình), '条件' (điều kiện), '背景' (bối cảnh), ví dụ: '在一般情况下' (trong tình huống thông thường), '在这种条件下' (dưới điều kiện này); (2) Chỉ sự tác động, giúp đỡ hoặc lãnh đạo của con người: ví dụ '在老师的帮助下' (dưới sự giúp đỡ của thầy cô), '在大家的努力下' (dưới sự nỗ lực của mọi người). Giới từ '在' ở đầu cấu trúc có thể lược bỏ trong khẩu ngữ. Tương đương với 'trong hoàn cảnh...', 'dưới điều kiện...', 'dưới sự...' trong tiếng Việt.",
    "formation": "(在 + ) Danh từ chỉ tình huống / điều kiện + 下，Chủ ngữ + Vị ngữ",
    "examples": [
      {
        "translation": "Trong tình huống thông thường, bạn càng bỏ nhiều tiền ra thì đồ mua được cũng càng tốt."
      }
    ]
  },
  "zh_估计可能CLAUSE_256": {
    "title": "估计 / 可能 + Mệnh đề (Động từ / Phó từ ước đoán: Ước tính là... / Có lẽ là...)",
    "shortExplanation": "Đứng ở đầu một mệnh đề để đưa ra lời phán đoán, phỏng đoán về một sự tình; 'ước tính là...', 'có lẽ là...'.",
    "longExplanation": "'估计' (gūjì) và '可能' (kěnéng) khi đứng trước cả một mệnh đề đóng vai trò dẫn dắt lời suy đoán: (1) '估计' vốn là động từ có nghĩa là 'ước tính, ước lượng, dự đoán', khi đứng trước mệnh đề mang hàm ý người nói căn cứ vào tình hình thực tế để đưa ra phán đoán có cơ sở; (2) '可能' là phó từ hoặc tính từ biểu thị khả năng xảy ra, 'có thể, có lẽ'. Khi đứng trước cả một phân câu, chúng giúp làm giảm bớt tính khẳng định tuyệt đối, khiến câu nói khách quan, nhã nhặn hơn. Tương đương với 'ước tính...', 'chắc là...', 'có lẽ...' trong tiếng Việt.",
    "formation": "Mệnh đề 1，估计 / 可能 + Mệnh đề 2 (Mệnh đề phán đoán)",
    "examples": [
      {
        "translation": "Cậu đã đi hỏi thử Tiểu Vương chưa? Chắc là cậu ấy sẽ có cách giải quyết đấy."
      }
    ]
  },
  "zh_估计可能V_257": {
    "title": "估计 / 可能 + Động từ (Trạng ngữ ước đoán: Chắc là... / Có lẽ là...)",
    "shortExplanation": "Đóng vai trò trạng ngữ đứng trước động từ để biểu thị sự phỏng đoán về một hành động, trạng thái hoặc nguyên nhân; 'chắc là...', 'có lẽ là...'.",
    "longExplanation": "'估计' (gūjì) và '可能' (kěnéng) khi đứng trực tiếp trước động từ (rất thường kết hợp với động từ hệ từ '是' thành '估计是' hoặc '可能不是') giữ chức năng trạng ngữ chỉ sự ước đoán, phỏng đoán lý do hoặc diễn biến của hành động. Người nói không dám khẳng định chắc chắn 100% mà chỉ dựa trên cảm nhận, hiện tượng để giải thích sự việc. Tương đương với 'chắc là...', 'có lẽ là...', 'khả năng là...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 估计 / 可能 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Tôi vẫn chưa quen với khí hậu phương Bắc, chắc là do thời tiết quá khô hanh."
      }
    ]
  },
  "zh_可能的N_258": {
    "title": "可能的 + Danh từ (Tính từ làm định ngữ: Có thể... / Có khả năng...)",
    "shortExplanation": "'可能' làm tính từ kết hợp với trợ từ kết cấu '的' đứng trước danh từ để bổ nghĩa, biểu thị khả năng hoặc xác suất có thể xảy ra của sự vật; 'có thể...', 'có khả năng...'.",
    "longExplanation": "'可能' (kěnéng) ngoài vai trò là phó từ hoặc danh từ, còn có thể dùng như một tính từ. Khi kết hợp với '的' đứng trước danh từ ('可能的 + Danh từ'), nó đảm nhận vai trò định ngữ trong câu, chỉ rõ một khả năng, xác suất hoặc dự đoán có căn cứ về một tình huống, nguyên nhân hay kết quả nào đó (ví dụ: '最可能的原因' - nguyên nhân có khả năng xảy ra nhất, '可能的结果' - kết quả có thể có). Tương đương với 'có khả năng...', 'có thể...' trong tiếng Việt.",
    "formation": "(最 / 极 + ) 可能的 + Danh từ",
    "examples": [
      {
        "translation": "Nhiều ngày như vậy cậu ấy không đến lớp, nguyên nhân có khả năng nhất chính là cậu ấy đã về nước rồi."
      }
    ]
  },
  "zh_来不及_259": {
    "title": "来不及 (Cụm bổ ngữ khả năng: Không kịp / Không kịp nữa rồi)",
    "shortExplanation": "Biểu thị thời gian quá gấp rút hoặc sự việc đã rồi, không còn đủ thời gian để thực hiện hành động nào đó; 'không kịp', 'không kịp nữa rồi'.",
    "longExplanation": "'来不及' (láibují) là một bổ ngữ khả năng cố định (hình thức phủ định của '来得及'). Nó biểu thị do thời gian quá gấp hoặc tình thế đã phát triển đến một giai đoạn nhất định nên không thể kịp làm một việc gì đó nữa. Có thể đứng độc lập làm vị ngữ (thường đi với trợ từ '了') hoặc đứng trước một động từ khác biểu thị không kịp làm hành động đó (ví dụ: '来不及说' - không kịp nói, '来不及赶火车' - không kịp bắt tàu). Tương đương với 'không kịp', 'chẳng kịp nữa rồi' trong tiếng Việt.",
    "formation": "(Chủ ngữ + ) 来不及 (+ Động từ / Tân ngữ) (+ 了)",
    "examples": [
      {
        "translation": "Đợi đến khi sức khỏe của bạn có vấn đề rồi thì hối hận cũng không kịp nữa đâu."
      }
    ]
  },
  "zh_VVO_260": {
    "title": "Động từ + Động từ + Tân ngữ (Trùng điệp động từ ly hợp AAB: Làm gì đó một chút)",
    "shortExplanation": "Hình thức lặp lại động từ của động từ ly hợp theo dạng AAB (chỉ lặp lại phần động từ), biểu thị động tác diễn ra trong thời gian ngắn, thử làm hoặc mang sắc thái nhẹ nhàng, thư giãn; '...một chút', 'thử...'.",
    "longExplanation": "Trong tiếng Trung, động từ ly hợp (động từ mang kết cấu Động từ + Tân ngữ như 散步, 游泳, 睡觉, 跳舞, 聊天) khi lặp lại để biểu thị động tác diễn ra trong thời gian ngắn, mang tính giải trí, thư thái hoặc thử nghiệm sẽ tuân theo quy tắc lặp lại AAB: lặp lại phần tố động từ phía trước còn giữ nguyên tân ngữ (ví dụ: '散步' -> '散散步', '游泳' -> '游游泳', '睡觉' -> '睡睡觉', '见面' -> '见见面'). Hình thức này làm giảm nhẹ ngữ khí, tạo cảm giác nhẹ nhàng, tự nhiên trong khẩu ngữ. Tương đương với '...một chút', '...chút xíu', 'đi dạo một lát' trong tiếng Việt.",
    "formation": "Động từ + Động từ + Tân ngữ (Động từ ly hợp dạng AAB)",
    "examples": [
      {
        "translation": "Chúng ta sau bữa trưa hãy đến công viên gần đây đi dạo một chút nhé."
      }
    ]
  },
  "zh_V了VO_261": {
    "title": "Động từ + 了 + Động từ + Tân ngữ (Trùng điệp động tác đã hoàn thành: Đã làm gì đó một chút)",
    "shortExplanation": "Chèn trợ từ động thái '了' vào giữa hai động từ trùng điệp có tân ngữ, biểu thị hành động ngắn, nhẹ nhàng đã xảy ra và kết thúc trong quá khứ; 'đã... một chút', 'đã... qua'.",
    "longExplanation": "Khi muốn diễn tả một hành động mang tính chất ngắn ngủi, thư thái, nhẹ nhàng hoặc làm cho qua chuyện đã xảy ra trong quá khứ đối với động từ mang tân ngữ (đặc biệt là động từ ly hợp hoặc cụm động tân), tiếng Trung chèn trợ từ động thái '了' vào giữa hai động từ lặp lại: 'Động từ + 了 + Động từ + Tân ngữ' (ví dụ: '睡了睡觉' - đã ngủ một chút, '游了游泳' - đã bơi một lát, '做了做作业' - đã làm bài tập một lúc). Cấu trúc này thường dùng trong các câu liệt kê những việc thong thả, thường nhật đã làm. Tương đương với 'đã... một chút', 'đã... một lát' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ + 了 + Động từ + Tân ngữ",
    "examples": [
      {
        "translation": "Chủ nhật tôi đã ngủ một lát, đi bơi một chút, rồi làm bài tập một lúc."
      }
    ]
  },
  "zh_要是_262": {
    "title": "要是 (Liên từ giả thiết: Nếu / Giả sử / Nếu như)",
    "shortExplanation": "Đặt ở đầu mệnh đề giả thiết để nêu ra một điều kiện giả định trong khẩu ngữ, thường kết hợp với '的话' ở cuối vế và '就 / 那么' ở vế sau; 'nếu', 'nếu như'.",
    "longExplanation": "'要是' (yàoshi) là liên từ biểu thị điều kiện giả thiết rất phổ biến trong văn nói, mang sắc thái thân mật, tự nhiên hơn so với '如果' hay '假如'. Nó thường đứng ở đầu phân câu thứ nhất, có thể đi kèm với '的话' ở cuối phân câu điều kiện đó ('要是……的话'), và phân câu sau thường kết hợp với các phó từ liên kết như '就' (thì) hoặc '那么' (vậy thì) để dẫn ra kết quả hoặc hành động tương ứng. Tương đương với 'nếu', 'nếu như', 'giả dụ' trong tiếng Việt.",
    "formation": "要是 + Mệnh đề điều kiện (+ 的话)，(那么 / 就) + Mệnh đề kết quả",
    "examples": [
      {
        "translation": "Nếu chất lượng tốt thì giá đắt hơn một chút cũng không sao."
      }
    ]
  },
  "zh_既又也还_263": {
    "title": "既…… 又 / 也 / 还…… (Liên từ sóng đôi: Vừa... lại vừa... / Đã... lại còn...)",
    "shortExplanation": "Liên kết hai tính chất, đặc điểm hoặc hành động song song cùng tồn tại; 'vừa... lại vừa...', 'không những... mà còn...'.",
    "longExplanation": "Cấu trúc liên từ kết hợp sóng đôi '既……又 / 也 / 还……' (jì... yòu / yě / hái...) dùng để nối hai thành phần ngữ pháp ngang hàng (tính từ, cụm động từ hoặc phân câu ngắn). Nó diễn tả hai phương diện tính chất, tác dụng hoặc trạng thái cùng tồn tại đồng thời trên một chủ thể. Hai vế này thường có tính chất hài hòa đồng nhất (cùng mang ý tích cực hoặc cùng mang ý tiêu cực). Trong đó '既……又……' là phổ biến nhất; '既……也……' và '既……还……' mang sắc thái bổ sung, tăng tiến nhẹ. Tương đương với 'vừa... vừa...', 'đã... lại còn...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 既 + Vị ngữ 1，又 / 也 / 还 + Vị ngữ 2",
    "examples": [
      {
        "translation": "Đi dạo vừa có thể vận động cơ thể, lại vừa có thể giảm cân."
      }
    ]
  },
  "zh_使OAV_264": {
    "title": "使 + Tân ngữ + Tính từ / Động từ (Câu kiêm ngữ sai khiến: Khiến cho / Làm cho...)",
    "shortExplanation": "Động từ sai khiến '使' biểu thị việc dẫn đến hoặc tạo ra một kết quả, khiến người khác hoặc sự vật phát sinh hành động, thay đổi trạng thái; 'làm cho', 'khiến cho'.",
    "longExplanation": "'使' (shǐ) là động từ gây khiến (sai khiến) điển hình tạo thành câu kiêm ngữ: 'Chủ ngữ / Tác nhân + 使 + Tân ngữ kiêm Chủ ngữ vế sau + Động từ / Tính từ'. Tân ngữ của '使' đồng thời đóng vai trò chủ ngữ cho hành động hoặc trạng thái ở phía sau. So với '让' (nhượng) hay '叫' (khiếu), '使' mang phong thái trang trọng, văn viết và khách quan hơn, thường dùng để chỉ nguyên nhân, biện pháp dẫn đến một kết quả hoặc sự biến chuyển tâm lý, nhận thức, hành vi. Tương đương với 'làm cho', 'khiến cho' trong tiếng Việt.",
    "formation": "Tác nhân / Phương thức + 使 + Tân ngữ + Động từ / Tính từ",
    "examples": [
      {
        "translation": "Làm thế nào mới có thể khiến cô ấy thích tôi được nhỉ?"
      }
    ]
  },
  "zh_只要就_265": {
    "title": "只要…… (就)…… (Liên từ điều kiện đủ: Chỉ cần... là (sẽ)...)",
    "shortExplanation": "Nêu ra một điều kiện duy nhất hoặc đầy đủ, miễn là đáp ứng điều kiện đó thì kết quả tất yếu sẽ xảy ra; 'chỉ cần... là... / thì...'.",
    "longExplanation": "'只要……(就)……' (zhǐyào... jiù...) là cặp liên từ biểu thị quan hệ điều kiện đủ (thường gặp trong ngữ pháp tiếng Trung). '只要' đứng ở đầu phân câu điều kiện, nêu ra một điều kiện tiên quyết cần thiết; phân câu kết quả đi kèm phó từ '就' (có khi có thể lược bỏ trong khẩu ngữ nhưng thường giữ lại) để khẳng định một khi điều kiện được đáp ứng thì kết quả phía sau chắc chắn sẽ thành hiện thực. Khác với '只有……才……' (chỉ có... mới... - điều kiện cần duy nhất), '只要' chỉ nhấn mạnh tính đầy đủ của điều kiện. Tương đương với 'chỉ cần... là...', 'miễn là... thì...' trong tiếng Việt.",
    "formation": "只要 + Mệnh đề điều kiện đủ，(就) + Mệnh đề kết quả",
    "examples": [
      {
        "translation": "Chỉ cần lần này bạn chuẩn bị thật tốt thì nhất định có thể đá tốt trận đấu."
      }
    ]
  },
  "zh_可不是_266": {
    "title": "可不是！ (Thán từ / Khẩu ngữ biểu thị tán thành: Đúng thế còn gì nữa! / Chứ còn gì nữa!)",
    "shortExplanation": "Dùng độc lập trong giao tiếp đối thoại để bày tỏ sự đồng tình mạnh mẽ và hưởng ứng nhiệt tình với ý kiến của đối phương; 'đúng thế còn gì nữa!', 'chứ sao nữa!'.",
    "longExplanation": "'可不是！' (kěbushì! / kěbùshì!) hay '可不是吗！' là quán dụng ngữ khẩu ngữ cực kỳ sống động trong tiếng Trung, thường đứng ở đầu câu hồi đáp. Nó dùng để phụ họa, bày tỏ sự đồng tình sâu sắc và hoàn toàn nhất trí với nhận xét hay cảm thán mà đối phương vừa nêu ra. Mang sắc thái cảm thán, hào hứng hoặc cùng chung nỗi niềm tâm sự. Tương đương với 'đúng thế còn gì nữa!', 'chứ còn gì nữa!', 'chính là vậy đấy!' trong tiếng Việt.",
    "formation": "Người nói A: Lời phát biểu / Cảm thán。Người nói B: 可不是！+ Lời phụ họa",
    "examples": [
      {
        "translation": "A: Thật chẳng ngờ chúng mình đã tốt nghiệp được mười năm rồi đấy. B: Đúng thế còn gì nữa! Thời gian trôi nhanh quá, thực sự rất nhớ mọi người."
      }
    ]
  },
  "zh_因此_268": {
    "title": "因此 (Liên từ nhân quả: Do đó / Vì vậy / Cho nên)",
    "shortExplanation": "Đứng ở đầu mệnh đề sau để chỉ kết quả hoặc kết luận được rút ra từ nguyên nhân đã nêu ở mệnh đề trước; 'do đó', 'vì vậy'.",
    "longExplanation": "'因此' (yīncǐ) là liên từ biểu thị quan hệ nhân quả mang tính văn viết và trang trọng ('因' nghĩa là bởi vì, '此' là điều này/sự việc này). Nó thường đứng ở đầu phân câu phía sau, biểu thị kết quả tất yếu, phán đoán hoặc kết luận hợp lý bắt nguồn trực tiếp từ tiền đề, tình huống đã được trình bày ở phân câu trước. Nó có thể dùng độc lập ở đầu vế thứ hai (sau dấu phẩy) mà không nhất thiết phải có '因为' ở vế thứ nhất. Tương đương với 'do đó', 'vì vậy', 'cho nên' trong tiếng Việt.",
    "formation": "Mệnh đề nguyên nhân，因此 + Mệnh đề kết quả",
    "examples": [
      {
        "translation": "Tôi quen biết anh ấy rất nhiều năm rồi, vì vậy rất hiểu tính cách của anh ấy."
      }
    ]
  },
  "zh_往往_269": {
    "title": "往往 (Phó từ chỉ tần suất quy luật: Thường / Thường hay)",
    "shortExplanation": "Đứng trước vị ngữ để biểu thị một hiện tượng, hành động thường hay xảy ra theo một quy luật hoặc trong những điều kiện nhất định; 'thường', 'thường hay'.",
    "longExplanation": "'往往' (wǎngwǎng) là phó từ tần suất diễn tả một tình huống, hiện tượng hay hành động thường có xu hướng xảy ra theo quy luật hoặc kinh nghiệm tích lũy trong quá khứ dưới những điều kiện nhất định. Phân biệt với '常常' (thường): '往往' chỉ dùng cho những việc đã lặp lại có tính quy luật trong quá khứ hoặc chân lý chung, đòi hỏi ngữ cảnh có điều kiện hoặc hoàn cảnh cụ thể; không dùng cho kế hoạch tương lai hay ý chí chủ quan. Tương đương với 'thường', 'thường hay', 'hay' trong tiếng Việt.",
    "formation": "Chủ ngữ + (Điều kiện / Hoàn cảnh + ) 往往 + Vị ngữ",
    "examples": [
      {
        "translation": "Sự lựa chọn màu sắc trang phục của con gái thường hay có liên quan đến tính cách của họ."
      }
    ]
  },
  "zh_经常常_270": {
    "title": "经常 / 常 (Phó từ chỉ tần suất: Thường xuyên / Thường / Hay)",
    "shortExplanation": "Đứng trước động từ biểu thị một hành động hoặc trạng thái diễn ra nhiều lần với tần suất cao trong quá khứ, hiện tại hoặc tương lai; 'thường xuyên', 'thường', 'hay'.",
    "longExplanation": "'经常' (jīngcháng) và dạng rút gọn '常' (cháng) là các phó từ chỉ tần suất thông dụng nhất trong tiếng Trung. Chúng đứng trước động từ để nói về việc một hành động được thực hiện lặp đi lặp lại nhiều lần. Khác với '往往' (vốn phụ thuộc vào quy luật hoặc điều kiện nhất định), '经常 / 常' có thể dùng tự do cho cả quá khứ, thói quen hiện tại lẫn dự định tương lai, cũng như phản ánh ý chí chủ quan của con người. Hình thức phủ định là '不经常' hoặc '不常' (không thường xuyên). Tương đương với 'thường xuyên', 'thường', 'hay' trong tiếng Việt.",
    "formation": "Chủ ngữ + 经常 / 常 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Hồi học đại học tôi rất thích thể thao, thường xuyên / thường chơi bóng rổ và đá bóng."
      }
    ]
  },
  "zh_难道_271": {
    "title": "难道 (Phó từ ngữ khí câu phản vấn: Chẳng lẽ... / Lẽ nào...)",
    "shortExplanation": "Đứng ở đầu câu hoặc trước vị ngữ trong câu hỏi tu từ để tăng cường ngữ khí phản vấn, thể hiện sự nghi ngờ, ngạc nhiên hoặc trách móc; 'chẳng lẽ...', 'lẽ nào...'.",
    "longExplanation": "'难道' (nándào) là phó từ ngữ khí chuyên dùng trong câu phản vấn (câu hỏi tu từ). Nó có thể đặt ở đầu câu hoặc sau chủ ngữ, cuối câu thường kết hợp với trợ từ ngữ khí '吗' hoặc '了'. Khi dùng hình thức khẳng định '难道……' thì ngụ ý phủ định, còn khi dùng dạng phủ định '难道不……' thì lại ngụ ý khẳng định chắc chắn. Cấu trúc này dùng để nhấn mạnh một sự thật hiển nhiên, chất vấn hoặc bày tỏ sự kinh ngạc, không thể tin nổi trước một hành vi trái ngược với lẽ thường. Tương đương với 'chẳng lẽ...', 'lẽ nào...' trong tiếng Việt.",
    "formation": "难道 + (Chủ ngữ + ) Vị ngữ + (吗 / 了)？",
    "examples": [
      {
        "translation": "Sao lại mua nhiều bánh quy và sô-cô-la thế này nữa rồi? Chẳng lẽ cậu không giảm cân nữa à?"
      }
    ]
  },
  "zh_通过_272": {
    "title": "通过 (Giới từ phương thức: Thông qua / Bằng cách / Nhờ vào)",
    "shortExplanation": "Đứng trước danh từ hoặc cụm động từ chỉ phương thức, phương tiện hoặc con đường để đạt được mục đích; 'thông qua', 'nhờ vào'.",
    "longExplanation": "'通过' (tōngguò) khi làm giới từ dùng để dẫn ra phương thức, cách thức, trung gian hoặc con đường cần thiết nhằm đạt được một kết quả, mục đích cụ thể. Theo sau '通过' là đối tượng trung gian (con người, tổ chức) hoặc hành động, nỗ lực làm cầu nối (ví dụ: '通过努力' - nhờ vào nỗ lực, '通过朋友介绍' - thông qua bạn bè giới thiệu, '通过考试' - thông qua kỳ thi). Phân biệt với '经过': '通过' nhấn mạnh vào phương thức, thủ đoạn hoặc trung gian làm phương tiện, trong khi '经过' nhấn mạnh vào quá trình và thời gian trải nghiệm. Tương đương với 'thông qua', 'bằng cách', 'nhờ vào' trong tiếng Việt.",
    "formation": "通过 + Phương thức / Trung gian / Nỗ lực，(Chủ ngữ + ) Mệnh đề kết quả (hoặc: Chủ ngữ + 通过 + Phương thức + Vị ngữ)",
    "examples": [
      {
        "translation": "Bất kỳ thành công nào cũng đều phải thông qua nỗ lực mới có thể đạt được."
      }
    ]
  },
  "zh_经过_273": {
    "title": "经过 (Giới từ quá trình: Trải qua / Sau khi trải qua...)",
    "shortExplanation": "Dẫn ra một quá trình, thời gian hoặc chuỗi trải nghiệm đã diễn ra để dẫn đến kết quả sau đó; thường đi cùng với '之后 / 以后'; 'trải qua...', 'sau khi qua...'.",
    "longExplanation": "'经过' (jīngguò) khi làm giới từ được dùng để nêu bật một quá trình phát triển, sự diễn tiến của thời gian hoặc một chuỗi sự kiện, thử thách mà chủ thể đã trực tiếp trải qua trước khi đạt được kết quả ở vế sau. Thường tạo thành kết cấu khung '经过……之后 / 以后' (sau khi trải qua...). Khác với '通过' (thiên về thủ đoạn, phương tiện trung gian để đạt mục đích), '经过' nhấn mạnh quá trình gian nan, thời gian thử thách hoặc giai đoạn diễn biến khách quan. Tương đương với 'trải qua...', 'qua... mà...' trong tiếng Việt.",
    "formation": "经过 + Quá trình / Trải nghiệm / Thời gian (+ 之 / 以后)，Chủ ngữ + Vị ngữ",
    "examples": [
      {
        "translation": "Sau khi trải qua hết lần thất bại này đến lần thất bại khác, cuối cùng anh ấy cũng đã thành công."
      }
    ]
  },
  "zh_通过_274": {
    "title": "通过 (Động từ: Đi qua / Vượt qua không gian cụ thể)",
    "shortExplanation": "Động từ biểu thị sự di chuyển xuyên qua hoặc đi qua từ đầu này sang đầu kia của một không gian, con đường; 'đi qua', 'vượt qua', 'xuyên qua'.",
    "longExplanation": "'通过' (tōngguò) khi đóng vai trò làm động từ chỉ phương hướng và hành động di chuyển, có nghĩa là đi xuyên qua một vị trí, không gian hẹp, cây cầu hoặc con đường cụ thể từ bên này sang bên kia (ví dụ: '通过大桥' - đi qua cầu lớn, '通过海关' - qua cửa khẩu/hải quan, '步行通过' - đi bộ qua). Tương đương với 'đi qua', 'băng qua', 'xuyên qua' trong tiếng Việt.",
    "formation": "Cách thức di chuyển (步行 / 开车...) + 通过 (+ Nơi chốn)",
    "examples": [
      {
        "translation": "Con phố này chỉ có thể đi bộ qua."
      }
    ]
  },
  "zh_经过_275": {
    "title": "经过 (Động từ: Đi ngang qua / Tiện đường qua)",
    "shortExplanation": "Động từ biểu thị việc đi qua hoặc đi ngang qua một địa điểm nào đó trên lộ trình di chuyển; 'đi qua', 'đi ngang qua'.",
    "longExplanation": "'经过' (jīngguò) khi làm động từ chỉ hành động di chuyển có nghĩa là trên hành trình đi tới một đích đến nào đó, người hoặc phương tiện đi ngang qua một địa điểm trung gian (ví dụ: '经过北京' - đi qua Bắc Kinh, '经过超市' - đi ngang qua siêu thị, '正好经过' - vừa khéo đi ngang qua). Khác với '通过' (nhấn mạnh vào việc xuyên suốt từ đầu này sang đầu kia), '经过' nhấn mạnh vị trí dọc đường đi. Tương đương với 'đi ngang qua', 'ghé qua' trong tiếng Việt.",
    "formation": "Chủ ngữ + 经过 + Nơi chốn / Địa điểm",
    "examples": [
      {
        "translation": "Tôi vừa khéo đi ngang qua đây, tiện đường ghé vào thăm bạn một chút."
      }
    ]
  },
  "zh_通过_276": {
    "title": "通过 (Động từ: Vượt qua / Đỗ / Được phê duyệt)",
    "shortExplanation": "Động từ biểu thị việc đạt tiêu chuẩn, vượt qua một kỳ thi, phỏng vấn, kiểm tra hoặc một đề án được thông qua; 'vượt qua', 'đỗ', 'thông qua'.",
    "longExplanation": "'通过' (tōngguò) ở nghĩa trừu tượng làm động từ chỉ việc đáp ứng đầy đủ yêu cầu hoặc tiêu chuẩn đặt ra, từ đó vượt qua thử thách hay kỳ sát hạch (như '通过考试' - đỗ kỳ thi, '通过面试' - qua vòng phỏng vấn, '通过检查' - qua cửa kiểm tra), hoặc một dự luật, quyết định được cơ quan có thẩm quyền chấp thuận, phê chuẩn ('通过决议' - thông qua nghị quyết). Tương đương với 'vượt qua', 'đỗ', 'trúng tuyển', 'thông qua' trong tiếng Việt.",
    "formation": "Chủ ngữ + 通过 + Kỳ thi / Phỏng vấn / Tiêu chuẩn / Đề án",
    "examples": [
      {
        "translation": "Tôi đã vượt qua buổi phỏng vấn của công ty đó rồi."
      }
    ]
  },
  "zh_经过_277": {
    "title": "经过 (Danh từ: Quá trình / Diễn biến / Đầu đuôi sự việc)",
    "shortExplanation": "Danh từ chỉ toàn bộ quá trình phát triển, đầu đuôi diễn biến của một sự việc từ khi bắt đầu đến khi kết thúc; 'quá trình', 'diễn biến', 'đầu đuôi câu chuyện'.",
    "longExplanation": "'经过' (jīngguò) khi đóng vai trò danh từ mang ý nghĩa là trình tự diễn ra, các tình tiết cụ thể từ đầu đến cuối của một sự kiện, câu chuyện (ví dụ: '事情的经过' - đầu đuôi sự việc, '案件经过' - diễn biến vụ án, '了解经过' - hiểu rõ ngọn ngành câu chuyện). Thường làm tân ngữ hoặc định ngữ trong câu. Tương đương với 'quá trình', 'diễn biến', 'ngọn ngành', 'đầu đuôi sự việc' trong tiếng Việt.",
    "formation": "Sự việc / Danh từ + 的 + 经过",
    "examples": [
      {
        "translation": "Tiểu Vương đã kể cho tôi toàn bộ đầu đuôi diễn biến của sự việc."
      }
    ]
  },
  "zh_可是_278": {
    "title": "可是 (Liên từ biểu thị chuyển ý: Nhưng / Nhưng mà)",
    "shortExplanation": "Liên từ biểu thị quan hệ chuyển tiếp đối lập, đứng ở đầu phân câu sau để thể hiện sự tương phản rõ rệt với phân câu trước; 'nhưng', 'nhưng mà'.",
    "longExplanation": "'可是' (kěshì) là liên từ biểu thị quan hệ chuyển ý (nghịch tiếp) rất phổ biến trong cả văn nói lẫn văn viết. Nó đứng ở đầu vế câu thứ hai để đưa ra một kết quả, thực tế hoặc thái độ trái ngược với những gì được nói ở vế câu trước. Sắc thái chuyển ý của '可是' mạnh tương đương '但是', nhưng thường mang ngữ khí mềm mại, khẩu ngữ hơn một chút. Có thể kết hợp với '虽然' ở vế trước thành cặp '虽然……，可是……'. Tương đương với 'nhưng', 'thế nhưng', 'nhưng mà' trong tiếng Việt.",
    "formation": "Mệnh đề 1，可是 + Mệnh đề 2 (hoặc: 虽然 + Mệnh đề 1，可是 + Mệnh đề 2)",
    "examples": [
      {
        "translation": "Lúc đó bố mẹ và người thân đều không ủng hộ cô ấy, nhưng cô ấy vẫn kiên trì với lựa chọn của mình."
      }
    ]
  },
  "zh_结果_279": {
    "title": "结果 (Danh từ: Kết quả / Thành quả)",
    "shortExplanation": "Danh từ chỉ kết quả, trạng thái cuối cùng đạt được sau một quá trình hành động, nghiên cứu hay thi đấu; 'kết quả', 'thành quả'.",
    "longExplanation": "'结果' (jiéguǒ) khi làm danh từ biểu thị tình trạng, số liệu hoặc sự thật sau cùng nảy sinh từ một sự việc, hành động hay cuộc khảo sát (ví dụ: '调查结果' - kết quả điều tra, '考试结果' - kết quả thi, '比赛结果' - kết quả trận đấu, '没有结果' - không có kết quả). Thường làm chủ ngữ, tân ngữ hoặc định ngữ. Tương đương với 'kết quả' trong tiếng Việt.",
    "formation": "Danh từ / Động từ + 结果 (ví dụ: 调查 / 比赛 / 考试 / 实验 + 结果)",
    "examples": [
      {
        "translation": "Xin hãy nộp kết quả điều tra lên."
      }
    ]
  },
  "zh_结果_280": {
    "title": "结果…… (Liên từ kết quả: Kết quả là... / Rốt cuộc...)",
    "shortExplanation": "Liên từ đứng đầu phân câu sau để biểu thị kết cục, hậu quả hoặc kết quả phát sinh từ hành động ở phân câu trước; 'kết quả là...', 'rốt cuộc là...'.",
    "longExplanation": "'结果' (jiéguǒ) khi dùng làm liên từ liên kết câu sẽ đứng ở đầu vế câu sau (thường sau dấu phẩy), dùng để dẫn ra kết quả sau cùng của sự việc hay hành động được miêu tả ở vế câu trước. Kết quả này có thể là tích cực, tiêu cực hoặc mang tính chất khách quan. Thường không cần đi kèm các từ nối chỉ nguyên nhân như '因为' ở vế trước. Tương đương với 'kết quả là', 'rốt cuộc', 'cuối cùng thì' trong tiếng Việt.",
    "formation": "Mệnh đề nguyên nhân / hành động，结果 + Mệnh đề kết quả",
    "examples": [
      {
        "translation": "Kỳ học trước anh ấy học tập rất chăm chỉ, kết quả là thi đã đỗ."
      }
    ]
  },
  "zh_上_281": {
    "title": "上 + Số từ quy mô lớn (Động từ / Phó từ: Lên đến / Hơn...)",
    "shortExplanation": "Đứng trước các số từ biểu thị số lượng lớn (như 百, 千, 万) để nhấn mạnh số lượng đạt đến mức độ rất cao hoặc vượt qua con số đó; 'lên đến', 'hàng (trăm/nghìn)', 'hơn...'.",
    "longExplanation": "'上' (shàng) trong cấu trúc này đóng vai trò như một động từ mang nghĩa đạt đến, hoặc một phó từ chỉ mức độ trước các đơn vị số lượng tương đối lớn như '百' (trăm), '千' (nghìn), '万' (vạn, mười nghìn), '亿' (trăm triệu) (ví dụ: '上百' - hàng trăm/lên đến trăm, '上千人' - hàng nghìn người, '上万元' - hàng vạn tệ, '上百年' - hàng trăm năm). Cấu trúc này dùng để nhấn mạnh số lượng vô cùng phong phú, thời gian kéo dài hoặc quy mô to lớn. Tương đương với 'lên đến...', 'hàng (trăm/nghìn)...', 'hơn cả...' trong tiếng Việt.",
    "formation": "(Có / Đạt) + 上 + Số từ chỉ đơn vị lớn (百 / 千 / 万 / 亿) + Lượng từ / Danh từ",
    "examples": [
      {
        "translation": "Hệ thống tàu điện ngầm của thành phố này đã có lịch sử lên đến cả trăm năm."
      }
    ]
  },
  "zh_不过_282": {
    "title": "不过 (Liên từ chuyển ý nhẹ: Tuy nhiên / Nhưng mà / Có điều)",
    "shortExplanation": "Liên từ biểu thị quan hệ chuyển ý nhẹ nhàng, dùng ở đầu phân câu sau để bổ sung, điều chỉnh hoặc đối chiếu với phân câu trước; 'tuy nhiên', 'nhưng mà', 'có điều'.",
    "longExplanation": "'不过' (bùguò) là liên từ biểu thị sự chuyển ý với sắc thái nhẹ nhàng và ôn hòa hơn so với '但是' hay '可是'. Nó thường đứng ở đầu vế câu thứ hai để bổ sung một tình huống mới, đưa ra một ngoại lệ hoặc giới hạn cho nhận định ở vế câu trước mà không hoàn toàn phủ định vế trước. Thường dùng linh hoạt trong cả văn nói lẫn văn viết. Tương đương với 'tuy nhiên', 'có điều', 'nhưng mà', 'chỉ là' trong tiếng Việt.",
    "formation": "Mệnh đề 1，不过 + Mệnh đề 2",
    "examples": [
      {
        "translation": "Ban đầu tôi muốn làm luật sư, tuy nhiên sau đó tôi nhận ra mình có hứng thú với ngành báo chí hơn."
      }
    ]
  },
  "zh_不过V_283": {
    "title": "不过 + Động từ (Phó từ phạm vi: Chẳng qua chỉ... / Chỉ là...)",
    "shortExplanation": "Phó từ đứng trước động từ để biểu thị giới hạn phạm vi nhỏ bé, giản đơn của hành động, mang sắc thái xem nhẹ; 'chẳng qua chỉ...', 'chỉ là... mà thôi'.",
    "longExplanation": "'不过' (bùguò) khi làm phó từ sẽ đứng trước vị ngữ động từ, mang ý nghĩa tương tự như '只' (chỉ) hoặc '只不过' (chẳng qua chỉ). Cấu trúc này dùng để biểu thị hành động diễn ra chỉ dừng lại ở một mức độ rất nhỏ, bình thường, không có gì to tát hay đáng ngạc nhiên. Cuối câu thường có thể kết hợp với các trợ từ ngữ khí như '罢了' hay '而已' để củng cố ngữ khí. Tương đương với 'chẳng qua chỉ...', 'chỉ là... thôi' trong tiếng Việt.",
    "formation": "Chủ ngữ + 不过 + Động từ (+ Tân ngữ) (+ 罢了 / 而已)",
    "examples": [
      {
        "translation": "Chúng tôi chẳng qua chỉ trao đổi một chút về vấn đề công việc, ngoài ra không nói chuyện gì khác."
      }
    ]
  },
  "zh_确实_284": {
    "title": "确实 (Phó từ khẳng định: Quả thực / Thực sự / Đúng là)",
    "shortExplanation": "Phó từ đứng trước vị ngữ để khẳng định tính chân thực, đúng đắn không thể nghi ngờ của một sự việc hoặc nhận định; 'quả thực', 'thực sự', 'đúng là'.",
    "longExplanation": "'确实' (quèshí) là phó từ dùng để khẳng định mạnh mẽ rằng một sự tình, tính chất hay quan điểm là hoàn toàn có thật, khách quan và đáng tin cậy. Khi đứng trước động từ, tính từ hoặc cụm '是...', nó biểu thị sự đồng tình sâu sắc hoặc nhấn mạnh một chân lý rõ ràng trước khi chuyển ý bằng '但是 / 但' (ví dụ: '确实很漂亮' - thực sự rất đẹp, '确实如此' - quả thực là như vậy). Tương đương với 'quả thực', 'thực sự', 'đúng là' trong tiếng Việt.",
    "formation": "Chủ ngữ + 确实 + Vị ngữ (Động từ / Tính từ / 是...)",
    "examples": [
      {
        "translation": "Tình yêu quả thực là nguyên nhân quan trọng để kết hôn, nhưng chỉ có tình yêu thôi thì chưa đủ."
      }
    ]
  },
  "zh_在S看来_285": {
    "title": "在……看来 (Ngữ giới từ: Theo cách nhìn của... / Đối với... mà nói)",
    "shortExplanation": "Cụm giới từ đặt ở đầu câu hoặc trước chủ ngữ, dùng để nêu ra chủ thể nhận định hay góc nhìn chủ quan; 'theo cách nhìn của...', 'đối với... mà nói'.",
    "longExplanation": "Cấu trúc '在 + Chủ thể (Danh từ / Đại từ) + 看来' (zài... kànlai) dùng để định vị điểm xuất phát của quan điểm, nhận định hoặc cảm nhận cá nhân. Phía sau cụm từ này là mệnh đề trình bày phán đoán, quan điểm riêng biệt của chủ thể đó đối với sự vật, hiện tượng (ví dụ: '在我看来' - theo tôi thấy, '在老师看来' - theo góc nhìn của thầy cô). Tương đương với 'theo... thấy', 'trong mắt của...', 'đối với... mà nói' trong tiếng Việt.",
    "formation": "在 + Danh từ / Đại từ (Chủ thể) + 看来，Mệnh đề nhận định",
    "examples": [
      {
        "translation": "Theo cách nhìn của nhiều người, nghe nhạc pop chỉ là sở thích của giới trẻ."
      }
    ]
  },
  "zh_由于_286": {
    "title": "由于…… (Liên từ chỉ nguyên nhân: Do... / Bởi vì...)",
    "shortExplanation": "Liên từ biểu thị nguyên nhân khách quan, đứng ở đầu phân câu trước để dẫn ra lý do dẫn đến kết quả ở phân câu sau; 'do...', 'bởi vì...', 'nhờ có...'.",
    "longExplanation": "'由于' (yóuyú) là liên từ biểu thị quan hệ nhân quả trang trọng, mang phong cách văn viết rõ nét hơn '因为'. Nó đứng ở đầu vế câu nguyên nhân để nêu ra lý do, tiền đề dẫn đến kết quả hay sự biến chuyển ở vế câu tiếp theo. Vế sau có thể kết hợp với các từ nối kết quả như '所以', '因此', '因而'. Tương đương với 'do...', 'bởi vì...', 'nhờ vào...' trong tiếng Việt.",
    "formation": "由于 + Mệnh đề nguyên nhân / Cụm từ，(因此 / 所以 +) Mệnh đề kết quả",
    "examples": [
      {
        "translation": "Nhờ có sự nỗ lực chung của chúng ta, nhiệm vụ đã được hoàn thành trước thời hạn."
      }
    ]
  },
  "zh_由于N_287": {
    "title": "由于 + Danh từ (Giới từ chỉ nguyên nhân: Do... / Vì...)",
    "shortExplanation": "Giới từ kết hợp trực tiếp với danh từ hoặc ngữ danh từ ở phía sau để chỉ rõ lý do, nguyên nhân của sự việc; 'do...', 'vì... [danh từ]'.",
    "longExplanation": "'由于' (yóuyú) khi đóng vai trò giới từ sẽ kết hợp trực tiếp với một danh từ hoặc cụm danh từ phía sau (như '由于天气原因' - do lý do thời tiết, '由于种种原因' - do nhiều nguyên nhân, '由于工作关系' - do quan hệ công việc) để tạo thành ngữ giới từ chỉ nguyên nhân. Cụm này thường đứng trước chủ ngữ hoặc sau chủ ngữ làm trạng ngữ cho cả câu. Tương đương với 'do...', 'vì...' trong tiếng Việt.",
    "formation": "由于 + Danh từ / Cụm danh từ，Chủ ngữ + Vị ngữ",
    "examples": [
      {
        "translation": "Do nhiều nguyên nhân khác nhau, chúng tôi buộc phải thay đổi kế hoạch ban đầu."
      }
    ]
  },
  "zh_比如_288": {
    "title": "比如…… (Động từ / Liên từ nêu ví dụ: Ví dụ như... / Chẳng hạn như...)",
    "shortExplanation": "Dùng để dẫn ra một hoặc nhiều ví dụ cụ thể nhằm giải thích, làm sáng tỏ cho khái niệm hoặc nhận định khái quát phía trước; 'ví dụ như...', 'chẳng hạn như...'.",
    "longExplanation": "'比如' (bǐrú) đóng vai trò như một động từ hoặc liên từ chuyên dùng để đưa ra dẫn chứng, ví dụ minh họa cụ thể cho một nhận định khái quát vừa được nêu ở vế trước. Theo sau '比如' có thể là các từ ngữ, cụm từ hoặc cả phân câu hoàn chỉnh. Ở cuối phần liệt kê thường kết hợp với '等等' hoặc '等' để biểu thị vân vân. Tương đương với 'ví dụ như...', 'chẳng hạn như...', 'thí dụ...' trong tiếng Việt.",
    "formation": "Khái quát / Nhận định，比如 + Ví dụ 1，Ví dụ 2 (+ 等 / 等等)",
    "examples": [
      {
        "translation": "Trước khi đi du lịch tốt nhất nên lập kế hoạch, chẳng hạn như muốn đi những đâu, đi xe thế nào, v.v."
      }
    ]
  },
  "zh_连O也都V_289": {
    "title": "连 + Tân ngữ + 也/都 + Động từ (Ngay cả... cũng...)",
    "shortExplanation": "Đưa tân ngữ lên sau '连' trong cấu trúc '连……也/都……' để nhấn mạnh trường hợp cực đoan đối với đối tượng của hành động; 'ngay cả... cũng...'.",
    "longExplanation": "'连……也/都……' (lián... yě/ dōu...) là cấu trúc dùng để nhấn mạnh trường hợp cực đoan hoặc bất ngờ nhằm làm nổi bật sự việc. Khi tân ngữ được đưa lên đứng sau '连' (thường nằm sau chủ ngữ hoặc ở đầu câu), câu nhấn mạnh rằng ngay cả đối tượng khó khăn, bất ngờ hay tiêu biểu nhất đó mà chủ thể cũng thực hiện được (hoặc không thể thực hiện được). Tương đương với 'ngay cả... cũng...', 'đến cả... cũng...' trong tiếng Việt.",
    "formation": "(Chủ ngữ +) 连 + Tân ngữ + 也 / 都 + Động từ",
    "examples": [
      {
        "translation": "Bạn giỏi quá, ngay cả báo tiếng Trung cũng đọc hiểu được."
      }
    ]
  },
  "zh_连S也都V_290": {
    "title": "连 + Chủ ngữ + 也/都 + Động từ (Ngay cả... cũng...)",
    "shortExplanation": "Đặt '连' trước chủ ngữ trong cấu trúc '连……也/都……' để nhấn mạnh chủ thể mang tính tiêu biểu hoặc cực đoan nhất; 'ngay cả... cũng...'.",
    "longExplanation": "Trong cấu trúc '连……也/都……', khi '连' đứng trước chủ ngữ, nó dùng để nêu ra một chủ thể cực đoan nhất nhằm ngụ ý: nếu đến ngay cả chủ thể này mà còn như vậy thì những đối tượng khác hiển nhiên cũng thế (hoặc không thể làm được). Cấu trúc này thường xuất hiện trong câu hỏi tu từ hoặc câu điều kiện giả thiết để tăng cường sức thuyết phục. Tương đương với 'ngay cả... cũng...', 'đến cả... cũng...' trong tiếng Việt.",
    "formation": "连 + Chủ ngữ + 也 / 都 + Động từ / Tính từ",
    "examples": [
      {
        "translation": "Nếu ngay cả bản thân bạn còn không thích chính mình, thì làm sao có thể khiến người khác thích bạn được chứ?"
      }
    ]
  },
  "zh_否则_291": {
    "title": "否则 (Liên từ: Nếu không thì / Bằng không thì)",
    "shortExplanation": "Liên từ biểu thị điều kiện giả thiết ngược lại, đứng ở đầu phân câu sau để chỉ ra kết quả hoặc suy đoán nếu vế trước không thành; 'nếu không thì', 'bằng không'.",
    "longExplanation": "'否则' (fǒuzé) là liên từ biểu thị quan hệ điều kiện ngược trong văn viết và khẩu ngữ trang trọng, mang nghĩa tương đương với 'nếu không như vậy thì...'. Nó đứng ở đầu vế câu sau để nêu ra hậu quả bất lợi, hành động đối lập hoặc suy đoán logic dựa trên việc tình huống ở vế trước không được đáp ứng. Tương đương với 'nếu không thì', 'bằng không' trong tiếng Việt.",
    "formation": "Mệnh đề 1，否则 + Mệnh đề 2 (kết quả / suy đoán ngược)",
    "examples": [
      {
        "translation": "Anh ấy nhất định có chuyện quan trọng cần tìm bạn, nếu không thì đã chẳng gọi nhiều cuộc điện thoại đến thế."
      }
    ]
  },
  "zh_无论不管Q都_292": {
    "title": "无论/不管 + Từ để hỏi + 都 (Bất kể... đều...)",
    "shortExplanation": "Kết hợp '无论/不管' với từ để hỏi hoặc hình thức lựa chọn ở phân câu trước, phân câu sau dùng '都' để biểu thị trong mọi điều kiện thì kết quả đều không đổi; 'bất kể... đều...'.",
    "longExplanation": "'无论' (wúlùn - trang trọng hơn) và '不管' (bùguǎn - khẩu ngữ hơn) là các liên từ biểu thị điều kiện vô điều kiện. Phân câu trước chứa từ để hỏi (như 什么, 怎么, 谁, 哪儿) hoặc hình thức chính phản / lựa chọn (như 是……还是……, dạng lặp lại khẳng định phủ định), phân câu sau bắt buộc đi kèm phó từ '都' (hoặc '也') để nhấn mạnh rằng dù ở bất kỳ hoàn cảnh hay điều kiện nào thì kết quả hay hành động vẫn giữ nguyên không đổi. Tương đương với 'bất kể / dù cho [ai/gì/đâu]... đều...' trong tiếng Việt.",
    "formation": "无论 / 不管 + Từ để hỏi / Mệnh đề lựa chọn + 都 + Động từ / Tính từ",
    "examples": []
  },
  "zh_然而_294": {
    "title": "然而 (Liên từ: Thế nhưng / Tuy nhiên / Nhưng mà)",
    "shortExplanation": "Liên từ biểu thị quan hệ chuyển tiếp mang sắc thái trang trọng, thường dùng trong văn viết; 'thế nhưng', 'tuy nhiên'.",
    "longExplanation": "'然而' (rán'ér) là liên từ biểu thị quan hệ chuyển ý (nghịch tiếp) mang đậm màu sắc văn viết. Nó đứng ở đầu phân câu sau để biểu thị kết quả, tình hình thực tế đối lập hoặc khác biệt so với sự việc được nêu ra ở phân câu trước. Ngữ khí trang trọng hơn '但是' hay '可是'. Tương đương với 'thế nhưng', 'tuy nhiên', 'nhưng mà' trong tiếng Việt.",
    "formation": "Mệnh đề 1，然而 + Mệnh đề 2",
    "examples": []
  },
  "zh_同时_298": {
    "title": "同时…… (Liên từ / Phó từ: Đồng thời... / Cùng lúc đó...)",
    "shortExplanation": "Đứng ở đầu phân câu sau để biểu thị hai hành động, trạng thái cùng diễn ra song song hoặc bổ sung ý nghĩa tăng tiến; 'đồng thời...', 'cùng lúc đó...'.",
    "longExplanation": "'同时' (tóngshí) khi đứng ở đầu phân câu thứ hai đóng vai trò liên từ hoặc phó từ liên kết, biểu thị hai sự việc, hành động cùng song song tồn tại trong cùng một thời điểm, hoặc bổ sung thêm một khía cạnh tích cực, song hành khác ('không những... mà đồng thời còn...'). Phía sau thường kết hợp với '也' hoặc '还'. Tương đương với 'đồng thời', 'cùng lúc đó' trong tiếng Việt.",
    "formation": "Mệnh đề 1，同时（也 / 还） + Mệnh đề 2",
    "examples": [
      {
        "translation": "Đọc sách có thể làm phong phú tri thức của bạn, đồng thời còn bồi đắp thêm thế giới tình cảm của bạn."
      }
    ]
  },
  "zh_的同时_299": {
    "title": "……的同时 (Cấu trúc chỉ thời gian / liên kết: Trong khi... / Đồng thời với việc...)",
    "shortExplanation": "Đứng sau động từ hoặc mệnh đề biểu thị một hành động khác diễn ra đồng thời với hành động đó; 'trong khi...', 'đồng thời với việc...'.",
    "longExplanation": "'……的同时' (…… de tóngshí) là kết cấu định ngữ kết hợp với danh từ thời gian '同时', thường đứng sau cụm động từ hoặc mệnh đề (phía trước có thể có '在'). Cấu trúc này dùng để diễn đạt ý: trong quá trình đang thực hiện một hành động hoặc ở vào một trạng thái nào đó, thì một hành động hay sự việc khác cũng song song diễn ra. Tương đương với 'trong lúc...', 'trong khi...', 'đồng thời với việc...' trong tiếng Việt.",
    "formation": "(在 +) Động từ / Mệnh đề + 的同时，Chủ ngữ + cũng / còn...",
    "examples": [
      {
        "translation": "Trong lúc học tiếng Trung, tôi đồng thời còn tìm hiểu thêm về văn hóa Trung Quốc."
      }
    ]
  },
  "zh_并并且V_300": {
    "title": "并/并且 + Động từ (Liên từ: Đồng thời / Và / Hơn nữa)",
    "shortExplanation": "Liên từ dùng để nối hai động từ hoặc đoản ngữ động từ, biểu thị quan hệ song hành, tiếp nối hoặc tăng tiến; 'đồng thời', 'và', 'hơn nữa'.",
    "longExplanation": "'并' (bìng) và '并且' (bìngqiě) là các liên từ thường dùng để nối tiếp các động từ, tính từ hoặc cụm vị ngữ có cùng một chủ ngữ. Chúng biểu thị rằng hai hành động diễn ra song song ('vừa... vừa...'), tuần tự tiếp nối theo trình tự logic, hoặc hành động phía sau là một bước tiến sâu sắc hơn, cụ thể hơn so với hành động phía trước. '并' thường nối các động từ ngắn gọn trong văn viết, còn '并且' có thể nối các phân câu hoàn chỉnh. Tương đương với 'và', 'đồng thời', 'hơn nữa' trong tiếng Việt.",
    "formation": "Động từ 1 / Mệnh đề 1，并 / 并且 + Động từ 2",
    "examples": []
  },
  "zh_再也_303": {
    "title": "再……也…… (Dù có... đi chăng nữa thì cũng...)",
    "shortExplanation": "Cấu trúc biểu thị sự nhượng bộ giả thiết: cho dù đạt đến mức độ cực hạn thì kết quả vẫn không thể thay đổi; 'dù có... đến mấy cũng...'.",
    "longExplanation": "'再……也……' (zài... yě...) là cấu trúc biểu thị ý nhượng bộ giả thiết. Trong đó '再' đi kèm với động từ hoặc tính từ, biểu thị mức độ cực cao hoặc hành động lặp đi lặp lại đến cực hạn ('cho dù có làm... nhiều hơn nữa'); vế sau dùng '也' kết hợp với hình thức phủ định hoặc kết quả bất biến nhằm khẳng định kết cục vẫn không đổi. Tương đương với 'dù có... đến mấy cũng...', 'dù thế nào cũng vẫn...' trong tiếng Việt.",
    "formation": "再 + Động từ / Tính từ + 也 + Phủ định / Động từ",
    "examples": [
      {
        "translation": "Chuyện cũng đã xảy ra rồi, bạn có hối hận đến mấy cũng không thể thay đổi được gì, đừng đau lòng nữa."
      }
    ]
  },
  "zh_对于N_304": {
    "title": "对于 + Danh từ (Giới từ: Đối với Danh từ)",
    "shortExplanation": "Giới từ dùng để giới thiệu đối tượng, vấn đề hoặc phạm vi mà thái độ, quan điểm, hành động hướng tới; 'đối với...', 'về mặt...'.",
    "longExplanation": "'对于' (duìyú) là giới từ dùng để nêu ra sự vật, hiện tượng hoặc con người được xét đến, từ đó bày tỏ nhận xét, thái độ hay áp dụng biện pháp. Ngữ đoạn giới từ '对于 + Danh từ' có thể đứng ở đầu câu làm trạng ngữ (ngăn cách bằng dấu phẩy) hoặc đứng giữa chủ ngữ và vị ngữ. Khác với '对' (có thể dùng trong cả văn nói và kết hợp với động từ chỉ phương hướng hành vi), '对于' thiên về văn viết và nhấn mạnh vào việc đưa ra đối tượng được bàn luận. Tương đương với 'đối với', 'về phần' trong tiếng Việt.",
    "formation": "对于 + Danh từ / Đoản ngữ danh từ，Chủ ngữ... (hoặc: Chủ ngữ + 对于 + Danh từ...)",
    "examples": []
  },
  "zh_关于N_307": {
    "title": "关于 + Danh từ (Giới từ: Về... / Liên quan đến...)",
    "shortExplanation": "Giới từ dùng để dẫn ra phạm vi, chủ đề hoặc đối tượng được đề cập; 'về...', 'liên quan đến...'.",
    "longExplanation": "'关于' (guānyú) là giới từ dùng để chỉ rõ phạm vi vấn đề, đề tài hoặc chủ đề của câu chuyện, báo cáo, nghiên cứu. Cụm '关于 + Danh từ' thường đứng ở đầu câu (trước chủ ngữ) làm trạng ngữ biểu thị chủ đề thảo luận, hoặc kết hợp với '的' đứng trước danh từ trung tâm để tạo thành cụm định ngữ (ví dụ: '关于……的书' - sách về đề tài...). Khác với '对于' (chú trọng vào đối tượng chịu sự tác động hay thái độ), '关于' chú trọng vào việc giới thiệu phạm vi đề tài. Tương đương với 'về', 'liên quan đến' trong tiếng Việt.",
    "formation": "关于 + Danh từ / Sự việc，Chủ ngữ... (hoặc: 关于 + Danh từ + 的 + Danh từ)",
    "examples": [
      {
        "translation": "Về kế hoạch khảo sát lần này, giám đốc nói có rất nhiều điểm chưa rõ ràng."
      }
    ]
  },
  "zh_MMN都_308": {
    "title": "Lượng từ lặp lại + (Danh từ) + 都 (Từng... đều... / Mỗi một... đều...)",
    "shortExplanation": "Hình thức lặp lại của lượng từ kết hợp với '都' nhằm biểu thị tính toàn thể không có ngoại lệ; 'mỗi một... đều...', 'từng... một đều...'.",
    "longExplanation": "Trong tiếng Hán, việc lặp lại lượng từ đơn âm tiết theo dạng 'AA' (như 个个, 件件, 张张, 条条, 本本, 天天, 人人) mang ý nghĩa là 'mỗi một', 'tất cả từng cá thể'. Khi đứng trước danh từ (hoặc độc lập làm chủ ngữ), nó thường bắt buộc kết hợp với phó từ '都' ở phía sau để nhấn mạnh tính chất toàn thể, bao quát trọn vẹn và không có bất kỳ ngoại lệ nào. Tương đương với 'mỗi một [danh từ] đều...', 'từng [danh từ] một đều...' trong tiếng Việt.",
    "formation": "Lượng từ + Lượng từ (+ Danh từ) + 都 + Động từ / Tính từ",
    "examples": [
      {
        "translation": "Từng việc nhỏ một đều nên được xem như là một cơ hội để học hỏi."
      }
    ]
  },
  "zh_相反_309": {
    "title": "相反，…… (Liên từ / Phó từ: Trái lại... / Ngược lại...)",
    "shortExplanation": "Đứng ở đầu phân câu sau để biểu thị quan hệ chuyển ý đối lập rõ rệt với điều đã nói ở phân câu trước; 'trái lại...', 'ngược lại...'.",
    "longExplanation": "'相反' (xiāngfǎn) khi đứng ở đầu phân câu thứ hai (thường có dấu phẩy đi kèm) có vai trò như một liên từ chuyển ý, dùng để đối chiếu hai tình huống hoàn toàn trái ngược nhau. Nó biểu thị rằng thực tế, hành động hay kết quả không những không giống với những gì đã nêu ở vế trước (thường là vế trước mang tính phủ định hoặc nêu kỳ vọng sai), mà trái lại hoàn toàn ngược chiều. Tương đương với 'trái lại', 'ngược lại' trong tiếng Việt.",
    "formation": "Mệnh đề 1。相反，+ Mệnh đề 2 (hoặc: Mệnh đề 1，相反 + Mệnh đề 2)",
    "examples": []
  },
  "zh_和跟N相反_314": {
    "title": "和/跟 + Danh từ + 相反 (Trái ngược với Danh từ)",
    "shortExplanation": "Cấu trúc biểu thị một sự vật, kết quả hoặc hiện tượng đối lập hoàn toàn so với đối tượng được so sánh; 'trái ngược với...', 'ngược với...'.",
    "longExplanation": "Cấu trúc '和/跟 + Danh từ + 相反' (hé/ gēn... xiāngfǎn) dùng để so sánh hai sự vật, tình huống hoặc quan điểm, chỉ ra rằng chủ thể có tính chất hoặc phương hướng hoàn toàn đối lập với đối tượng sau '和/跟'. Trong đó thành phần danh từ có thể là danh từ cụ thể, danh từ trừu tượng hoặc một mệnh đề danh hóa (như '想的' - điều đã nghĩ, '说的' - điều đã nói, '预期的' - điều đã kỳ vọng). Phía trước '相反' thường có các phó từ chỉ mức độ như '正好', '完全', '几乎' để gia tăng ngữ khí. Tương đương với 'trái ngược với...', 'ngược hẳn với...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 和 / 跟 + Danh từ / Đoản ngữ danh từ + 相反",
    "examples": [
      {
        "translation": "Kết quả điều tra gần như hoàn toàn trái ngược với những gì họ nghĩ."
      }
    ]
  },
  "zh_大概也许VA_315": {
    "title": "大概/也许 + Động từ/Tính từ (Phó từ phỏng đoán: Có lẽ / Chắc là)",
    "shortExplanation": "Phó từ biểu thị sự suy đoán, ước lượng không hoàn toàn chắc chắn về hành động hoặc trạng thái; 'có lẽ', 'chắc là'.",
    "longExplanation": "'大概' (dàgài) và '也许' (yěxǔ) là các phó từ chỉ ngữ khí suy đoán, ước chừng, thường đứng trước động từ hoặc tính từ làm trạng ngữ. '大概' biểu thị sự phán đoán có cơ sở khá chắc chắn dựa trên tình hình thực tế (độ tin cậy tương đối cao, thường dịch là 'chắc là', 'có lẽ', hoặc ước lượng số lượng 'khoảng chừng'). Còn '也许' biểu thị một khả năng có thể xảy ra nhưng người nói không dám khẳng định chắc chắn (dịch là 'có lẽ', 'họa chăng'). Tương đương với 'có lẽ', 'chắc là' trong tiếng Việt.",
    "formation": "Chủ ngữ + 大概 / 也许 + Động từ / Tính từ",
    "examples": []
  },
  "zh_大概的N_317": {
    "title": "大概的 + Danh từ (Tính từ làm định ngữ: Đại khái / Ước chừng / Khoảng chừng)",
    "shortExplanation": "Đứng trước danh từ (kết hợp với 的) để chỉ tính chất đại khái, phỏng chừng, không chính xác tuyệt đối; 'đại khái', 'khoảng chừng', 'ước tính'.",
    "longExplanation": "'大概' (dàgài) khi đi kèm với trợ từ kết cấu '的' đứng trước danh từ làm định ngữ, biểu thị con số, phạm vi hoặc tình hình mang tính ước lượng, tương đối chứ không hoàn toàn chính xác tuyệt đối (ví dụ: '大概的数字' - con số ước chừng, '大概的情况' - tình hình sơ bộ/đại khái, '大概的想法' - ý tưởng khái quát). Tương đương với 'ước chừng', 'khoảng chừng', 'đại khái', 'sơ bộ' trong tiếng Việt.",
    "formation": "大概的 + Danh từ (như 数字 / 范围 / 想法 / 情况...)",
    "examples": [
      {
        "translation": "Xin hãy cho tôi một con số ước chừng."
      }
    ]
  },
  "zh_大概_318": {
    "title": "大概 + Số từ (Phó từ ước lượng: Khoảng / Chừng / Ước tính)",
    "shortExplanation": "Đứng trước số từ hoặc ngữ số lượng để biểu thị số lượng xấp xỉ, ước chừng; 'khoảng', 'chừng', 'ước chừng'.",
    "longExplanation": "'大概' (dàgài) làm phó từ biểu thị sự phỏng đoán, ước lượng, thường đứng trước số từ, lượng từ hoặc mốc thời gian để chỉ một số lượng xấp xỉ, gần đúng chứ không khẳng định tuyệt đối (ví dụ: '大概五个人' - khoảng 5 người, '大概三点' - chừng 3 giờ, '大概两千块' - khoảng 2000 tệ). Tương đương với 'khoảng', 'chừng', 'khoảng độ', 'ước tính' trong tiếng Việt.",
    "formation": "大概 + Số từ (+ Lượng từ + Danh từ)",
    "examples": []
  },
  "zh_偶尔_320": {
    "title": "偶尔 (Phó từ tần suất: Thỉnh thoảng / Đôi khi / Đôi lúc)",
    "shortExplanation": "Phó từ chỉ tần suất rất thấp, biểu thị một hành động hoặc sự việc chỉ xảy ra cách quãng, không thường xuyên; 'thỉnh thoảng', 'đôi khi', 'hiếm khi'.",
    "longExplanation": "'偶尔' (ǒu'ěr) là phó từ chỉ tần suất ở mức thấp (tần suất thấp hơn '常常' - thường thường, và thấp hơn '有时' - có lúc), dùng để miêu tả những sự việc hoặc hành vi thỉnh thoảng, đôi khi mới xảy ra một lần (ví dụ: '偶尔去一次' - thỉnh thoảng mới đi một lần, '偶尔喝咖啡' - thỉnh thoảng uống cà phê). Có thể đứng sau chủ ngữ trước vị ngữ, hoặc đứng ở đầu câu. Tương đương với 'thỉnh thoảng', 'đôi khi', 'đôi lúc' trong tiếng Việt.",
    "formation": "Chủ ngữ + 偶尔 + Động từ / Cụm động từ (hoặc: 偶尔 + Chủ ngữ + Động từ)",
    "examples": []
  },
  "zh_由SV_322": {
    "title": "由 + Chủ thể + Động từ (Giới từ dẫn xuất người thực hiện: Do... phụ trách / đảm nhiệm)",
    "shortExplanation": "Giới từ '由' dẫn ra chủ thể chịu trách nhiệm, người trực tiếp đảm nhận hoặc thực hiện hành động; 'do... làm/phụ trách'.",
    "longExplanation": "'由' (yóu) đóng vai trò làm giới từ dùng để đưa ra người, cơ quan hoặc chủ thể chịu trách nhiệm, đứng ra tổ chức, quyết định hoặc gánh vác một hành động, công việc cụ thể (ví dụ: '由他负责' - do anh ấy phụ trách, '由校长主持' - do hiệu trưởng chủ trì, '费用由公司承担' - chi phí do công ty chi trả). Cấu trúc này nhấn mạnh rõ ai là người có quyền hạn hoặc bổn phận thực hiện. Tương đương với 'do... đảm nhiệm', 'do... phụ trách', 'bởi...' trong tiếng Việt.",
    "formation": "(Sự việc / Danh từ +) 由 + Chủ thể thực hiện + Động từ (+ Tân ngữ)",
    "examples": []
  },
  "zh_进行_324": {
    "title": "进行 (Tự động từ: Tiến hành / Diễn ra / Tiếp tục triển khai)",
    "shortExplanation": "Tự động từ biểu thị một sự kiện, hoạt động, hội nghị hoặc trận đấu đang diễn ra hoặc tiếp tục tiến triển; 'diễn ra', 'tiến hành'.",
    "longExplanation": "'进行' (jìnxíng) khi dùng như một tự động từ biểu thị việc các hoạt động, cuộc họp, buổi lễ, trận đấu hoặc công việc đang trong quá trình diễn ra, vận hành hoặc tiếp tục theo đúng kế hoạch (ví dụ: '会议正在进行' - cuộc họp đang diễn ra, '比赛顺利进行' - trận đấu diễn ra thuận lợi, '继续进行' - tiếp tục tiến hành). Thường đi sau danh từ chỉ sự việc và các phó từ chỉ trạng thái như '正在', '顺利', '继续'. Tương đương với 'diễn ra', 'tiến hành', 'được tổ chức' trong tiếng Việt.",
    "formation": "Sự việc / Hoạt động (会议 / 比赛 / 仪式...) (+ Phó từ: 正在 / 继续 / 顺利...) + 进行",
    "examples": [
      {
        "translation": "10 giờ 30 phút cuộc họp tiếp tục diễn ra."
      }
    ]
  },
  "zh_进行O_325": {
    "title": "进行 + Tân ngữ (Động từ hình thức: Tiến hành / Thực hiện...)",
    "shortExplanation": "Động từ hình thức đi kèm tân ngữ là động từ hai âm tiết chỉ hành động, dùng trong phong cách trang trọng; 'tiến hành', 'thực hiện'.",
    "longExplanation": "'进行' (jìnxíng) làm động từ hình thức (hư hóa động từ), đứng trước một tân ngữ là động từ hai âm tiết mang tính động thái và liên tục, dùng để diễn đạt việc bắt tay vào làm hoặc triển khai một công việc, cuộc nghiên cứu mang sắc thái trang trọng, học thuật hoặc công vụ (ví dụ: '进行观察' - tiến hành quan sát, '进行调查' - thực hiện điều tra, '进行讨论' - tiến hành thảo luận, '进行研究' - tiến hành nghiên cứu). Lưu ý: '进行' không thể đi kèm với động từ đơn âm tiết hoặc danh từ cụ thể chỉ đồ vật (không nói '进行买' hay '进行苹果'). Tương đương với 'tiến hành', 'thực hiện', 'triển khai' trong tiếng Việt.",
    "formation": "Chủ ngữ + 进行 + Tân ngữ (Động từ 2 âm tiết: 观察 / 调查 / 讨论 / 研究 / 谈判...)",
    "examples": [
      {
        "translation": "Tiến hành quan sát"
      }
    ]
  },
  "zh_随着N_326": {
    "title": "随着 + Cụm danh từ (Giới từ chỉ sự biến đổi tương ứng: Cùng với... / Theo sự...)",
    "shortExplanation": "Giới từ đứng đầu phân câu để dẫn ra sự phát triển, thay đổi của sự vật mà theo đó một tình huống khác cũng biến đổi theo; 'cùng với...', 'theo đà...'.",
    "longExplanation": "'随着' (suízhe) là giới từ thường đứng ở đầu phân câu thứ nhất, theo sau là một danh từ hoặc cụm danh từ chỉ sự chuyển biến, phát triển (ví dụ: '随着经济的发展' - cùng với sự phát triển của kinh tế, '随着科技的进步' - theo sự tiến bộ của khoa học công nghệ, '随着时间的推移' - theo dòng thời gian trôi qua, '随着年龄的增长' - cùng với sự tăng lên của tuổi tác). Nó biểu thị rằng khi sự vật được nêu ra thay đổi thì tình huống ở phân câu sau cũng biến đổi theo tương ứng. Tương đương với 'cùng với...', 'theo sự...', 'theo đà...', 'gắn liền với...' trong tiếng Việt.",
    "formation": "随着 + Danh từ / Cụm danh từ chỉ sự thay đổi (经济的发展 / 科技的进步 / 时间的推移...)，Chủ ngữ + Vị ngữ",
    "examples": []
  },
  "zh_够_328": {
    "title": "够 (Tính từ / Vị từ: Đủ / Đầy đủ)",
    "shortExplanation": "Tính từ hoặc vị từ biểu thị số lượng, mức độ đáp ứng đầy đủ nhu cầu hay đạt chuẩn; 'đủ', dạng phủ định là '不够' (không đủ).",
    "longExplanation": "'够' (gòu) khi dùng độc lập làm vị ngữ hoặc tính từ biểu thị số lượng, thời gian, kinh phí hoặc điều kiện đạt đến mức độ vừa vặn, đáp ứng được nhu cầu thực tế (ví dụ: '时间够' - thời gian đủ, '人手够' - đủ người, '条件不够' - không đủ điều kiện). Dạng phủ định rất phổ biến là '不够' (không đủ, chưa đủ). Tương đương với 'đủ', 'đầy đủ' trong tiếng Việt.",
    "formation": "Danh từ (chỉ tiền bạc / thời gian / số lượng) (+ Phó từ) + 够 / 不够",
    "examples": [
      {
        "translation": "Tiền không đủ."
      }
    ]
  },
  "zh_V够_329": {
    "title": "Động từ + 够 (+ Số lượng từ) (Bổ ngữ kết quả: Làm đủ... / Làm thỏa thích)",
    "shortExplanation": "'够' làm bổ ngữ kết quả đứng sau động từ biểu thị hành động đạt đủ định mức số lượng, thời gian quy định hoặc thỏa mãn nhu cầu; 'làm đủ...', 'làm cho đã'.",
    "longExplanation": "'够' (gòu) đóng vai trò là bổ ngữ kết quả sau động từ, chỉ rõ hành động đã đạt đến hoặc hoàn thành đủ một lượng thời gian, số lượng hoặc định mức mong muốn (ví dụ: '睡够八小时' - ngủ đủ 8 tiếng, '学够学分' - học đủ số tín chỉ, '玩够了' - chơi đã đời/chơi thỏa thích rồi, '吃够了' - ăn đã/chán ngấy rồi). Cấu trúc này vừa dùng để nói về việc đáp ứng định mức số lượng, vừa có thể biểu thị trạng thái đã thỏa mãn hoặc chán ngấy. Tương đương với 'làm đủ (số lượng/thời gian)', 'làm cho thỏa' trong tiếng Việt.",
    "formation": "Động từ + 够 (+ Số từ + Lượng từ / Danh từ)",
    "examples": [
      {
        "translation": "Thời gian ngủ quá dài cũng không tốt, thông thường ngủ đủ tám tiếng là được rồi."
      }
    ]
  },
  "zh_够A_330": {
    "title": "够 + Tính từ (+ 的了) (Phó từ chỉ mức độ: Khá là... / Đủ... rồi / Quá đỗi...)",
    "shortExplanation": "Phó từ mức độ đứng trước tính từ để nhấn mạnh mức độ đã đạt rất cao hoặc quá mức (thường đi với '的/的了'); 'khá là...', 'đủ... rồi', 'quá... rồi'.",
    "longExplanation": "'够' (gòu) khi làm phó từ mức độ đứng trước tính từ, biểu thị tính chất hoặc trạng thái đã đạt đến mức độ rất cao, tương đương với '挺' (rất) hay '相当' (khá là). Trong khẩu ngữ thường kết hợp với '的' hoặc '的了' ở cuối câu để biểu đạt cảm xúc tán thán, than thở hoặc phàn nàn (ví dụ: '已经够重了' - đã đủ nặng rồi, '够累的' - mệt đứt cả hơi/khá mệt, '够朋友' - rất có nghĩa khí/thật là bạn tốt). Tương đương với 'đủ... rồi', 'khá là...', 'quá đỗi...' trong tiếng Việt.",
    "formation": "(Chủ ngữ +) (已经 +) 够 + Tính từ (+ 的 / 的了)",
    "examples": [
      {
        "translation": "Không cần chất thêm những thứ này đâu, vali đã đủ nặng rồi đấy!"
      }
    ]
  },
  "zh_以N_331": {
    "title": "以 + Danh từ (Giới từ chỉ phương thức, tiêu chuẩn: Với / Bằng / Theo...)",
    "shortExplanation": "Giới từ dẫn ra danh từ chỉ tốc độ, thái độ, tiêu chuẩn hoặc phương thức làm căn cứ để thực hiện hành động; 'với...', 'bằng...', 'theo...'.",
    "longExplanation": "'以' (yǐ) là giới từ trang trọng (thường thấy trong văn viết và khẩu ngữ trang nhã), đứng trước các danh từ hoặc cụm danh từ chỉ tốc độ, thái độ, tiêu chuẩn hoặc phương thức, dùng để dẫn ra cách thức hoặc căn cứ tiến hành hành động ở phía sau (ví dụ: '以最快的速度' - với tốc độ nhanh nhất, '以认真的态度' - với thái độ nghiêm túc, '以事实为依据' - lấy sự thật làm căn cứ, '以国家标准' - theo tiêu chuẩn quốc gia). Tương đương với 'với...', 'bằng...', 'theo...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 以 + Danh từ (Tốc độ / Tiêu chuẩn / Thái độ / Phương thức) + Động từ",
    "examples": [
      {
        "translation": "Giám đốc cứ yên tâm, tôi nhất định sẽ hoàn thành với tốc độ nhanh nhất."
      }
    ]
  },
  "zh_以N1为N2_332": {
    "title": "以 + Danh từ 1 + 为 + Danh từ 2 (Cấu trúc cố định: Lấy... làm... / Coi... là...)",
    "shortExplanation": "Cấu trúc cố định biểu thị việc coi Danh từ 1 là Danh từ 2 hoặc lấy Danh từ 1 làm chuẩn mực, căn cứ, hình mẫu; 'lấy... làm...', 'coi... là...'.",
    "longExplanation": "'以……为……' (yǐ... wéi...) là một kết cấu cố định mang phong cách thư diện (văn viết trang trọng) có nguồn gốc từ Hán ngữ cổ. Cấu trúc này dùng để biểu thị việc lấy Danh từ 1 làm chuẩn mực, đối tượng nòng cốt, cơ sở hoặc hình mẫu Danh từ 2 (ví dụ: '以历史为镜子' - lấy lịch sử làm gương soi, '以学生为中心' - lấy học sinh làm trung tâm, '以诚信为本' - lấy chữ tín làm gốc, '以他为榜样' - noi theo anh ấy làm tấm gương). Tương đương với 'lấy... làm...', 'coi... như là...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 以 + Danh từ 1 + 为 + Danh từ 2",
    "examples": [
      {
        "translation": "Chúng ta nên lấy lịch sử làm tấm gương soi."
      }
    ]
  },
  "zh_以_333": {
    "title": "以 (Liên từ biểu thị mục đích: Để / Nhằm / Nhằm mục đích)",
    "shortExplanation": "Liên từ nối giữa hai phân câu hoặc hai cụm động từ, dùng để dẫn ra mục đích của hành động đứng trước; 'để', 'nhằm', 'hòng'.",
    "longExplanation": "'以' (yǐ) làm liên từ nối phân câu chỉ hành động với phân câu chỉ mục đích, đứng ở vế sau để giải thích hành động ở vế trước được tiến hành 'để' hay 'nhằm' đạt được kết quả gì (ví dụ: '送礼物以表示感谢' - tặng quà để bày tỏ lòng cảm ơn, '制定制度以加强管理' - ban hành quy chế nhằm tăng cường quản lý). Mang sắc thái trang trọng của văn viết, tương đương với '以便' (để tiện cho) hoặc '来' (để) nhưng trang nhã hơn. Tương đương với 'để', 'nhằm', 'nhằm mục đích' trong tiếng Việt.",
    "formation": "Hành động / Phân câu 1 + 以 + Mục đích / Phân câu 2",
    "examples": [
      {
        "translation": "Cô ấy đã gửi tặng một món quà để bày tỏ lòng biết ơn."
      }
    ]
  },
  "zh_既然_334": {
    "title": "既然…… (Liên từ tiền đề: Đã... thì... / Một khi đã...)",
    "shortExplanation": "Liên từ đứng đầu phân câu thứ nhất để nêu ra tiền đề thực tế đã xảy ra, phân câu sau thường kết hợp với '就/那' để đưa ra kết luận hoặc kiến nghị; 'đã... thì...', 'một khi đã...'.",
    "longExplanation": "'既然' (jìrán) là liên từ biểu thị quan hệ nhân quả suy luận. Nó đứng ở đầu vế câu thứ nhất để nêu ra một sự thật hiển nhiên, một tình huống đã rồi hoặc tiền đề được hai bên công nhận. Vế câu thứ hai thường sử dụng các phó từ liên kết như '就' (thì), '那' (vậy thì), '也' (cũng) để dẫn ra kết luận, quyết định hợp lẽ hoặc lời khuyên/yêu cầu tất yếu nảy sinh từ tiền đề đó (ví dụ: '既然来了，就多玩几天' - đã đến rồi thì chơi thêm vài ngày, '既然决定了，就别后悔' - một khi đã quyết định thì đừng hối hận). Tương đương với 'đã... thì...', 'một khi đã... thì...' trong tiếng Việt.",
    "formation": "既然 + Tiền đề / Sự việc đã rồi，(Chủ ngữ +) 就 / 那 + Mệnh đề kết luận / kiến nghị",
    "examples": []
  },
  "zh_于是_336": {
    "title": "于是…… (Liên từ tiếp nối thuận: Thế là... / Thế nên... / Liền...)",
    "shortExplanation": "Liên từ đứng đầu phân câu sau để biểu thị một hành động, sự việc xảy ra nối tiếp ngay sau hoặc là kết quả tự nhiên từ phân câu trước; 'thế là...', 'thế nên...', 'liền...'.",
    "longExplanation": "'于是' (yúshì) là liên từ biểu thị quan hệ tiếp nối thuận (thuận thừa) trong diễn đạt tự sự. Nó đứng ở đầu vế câu sau (thường sau dấu phẩy) để dẫn ra sự việc hoặc hành động diễn ra ngay sau đó như một phản ứng tất yếu hoặc kết quả hợp lý từ sự việc ở vế trước (ví dụ: '大家都很赞成，于是我们开始分工' - mọi người đều rất tán thành, thế là chúng tôi bắt đầu phân công; '外面下大雨，于是他取消了行程' - bên ngoài mưa to, thế là anh ấy hủy chuyến đi). Khác với '所以' (nhấn mạnh vào quan hệ nhân quả logic thuần túy), '于是' nhấn mạnh tính liên tục theo trình tự thời gian và diễn biến tự nhiên của câu chuyện. Tương đương với 'thế là', 'thế nên', 'bèn', 'liền' trong tiếng Việt.",
    "formation": "Mệnh đề 1，于是 + Mệnh đề 2",
    "examples": []
  },
  "zh_因此_338": {
    "title": "因此…… (Liên từ nhân quả: Do đó / Vì vậy / Cho nên……)",
    "shortExplanation": "Liên từ biểu thị quan hệ nhân quả trong văn viết, đứng ở đầu phân câu sau để biểu thị kết quả hay kết luận rút ra từ tiền đề ở phân câu trước; 'do đó', 'vì vậy', 'cho nên'.",
    "longExplanation": "'因此' (yīncǐ) là liên từ biểu thị quan hệ nhân quả mang sắc thái trang trọng, thường dùng trong văn viết và khẩu ngữ trang nhã ('因' nghĩa là bởi vì, '此' là điều này, sự việc này). '因此' đứng ở đầu phân câu phía sau, nối tiếp nguyên nhân hay tình huống đã trình bày ở phân câu trước để dẫn ra kết quả tự nhiên hoặc kết luận hợp lý (ví dụ: '小时候经常生病，因此每天都去跑步' - hồi nhỏ hay đau ốm, vì vậy mỗi ngày đều đi chạy bộ; '两人志趣相投，因此成了好朋友' - hai người cùng chí hướng, cho nên đã trở thành bạn thân). Không cần vế trước phải có '因为', '因此' có thể đứng độc lập ở vế sau. Tương đương với 'do đó', 'vì vậy', 'cho nên', 'bởi thế' trong tiếng Việt.",
    "formation": "Mệnh đề nguyên nhân，因此 + Mệnh đề kết quả",
    "examples": [
      {
        "translation": "Hồi nhỏ anh ấy thường hay đau ốm, vì vậy mỗi ngày đều chạy bộ rèn luyện sức khỏe."
      }
    ]
  },
  "zh_什么的_339": {
    "title": "什么的 (Trợ từ liệt kê: Vân vân / Đại loại thế / Những thứ như là...)",
    "shortExplanation": "Trợ từ khẩu ngữ đặt sau các danh từ hoặc ngữ động từ liệt kê, biểu thị còn những sự vật, hành động tương tự khác chưa kể hết; 'vân vân', 'đại loại như vậy', 'những thứ như thế'.",
    "longExplanation": "'什么的' (shénmede) là trợ từ thường dùng trong khẩu ngữ hàng ngày, được đặt ở cuối danh sách liệt kê gồm hai hoặc nhiều danh từ, cụm từ hoặc ngữ động từ để biểu thị sự liệt kê chưa đầy đủ (tương tự như '等等' nhưng mang khẩu khí tự nhiên, thân mật hơn trong sinh hoạt). Nó ngụ ý rằng ngoài những thứ vừa kể ra, còn có những đồ vật hoặc sự việc tương tự thuộc cùng nhóm (ví dụ: '买点儿水果、零食什么的' - mua chút hoa quả, đồ ăn vặt này nọ; '周末看看书、听听音乐什么的' - cuối tuần đọc sách, nghe nhạc các kiểu). Tương đương với 'vân vân', 'các thứ', 'đại loại thế', 'những thứ tương tự' trong tiếng Việt.",
    "formation": "Danh từ 1 / Động từ 1、Danh từ 2 / Động từ 2 + 什么的",
    "examples": [
      {
        "translation": "Ngày mai đi chơi, phải mua chút bánh quy, bánh mì hoặc mấy thứ đại loại thế."
      }
    ]
  },
  "zh_V起来_340": {
    "title": "Động từ + 起来 (Bổ ngữ xu hướng / Biểu thị hướng lên, bắt đầu tiếp diễn hoặc góc độ đánh giá)",
    "shortExplanation": "Đứng sau động từ để chỉ hướng chuyển động từ dưới lên trên, biểu thị hành động bắt đầu và tiếp diễn (bắt đầu... lên), hoặc đưa ra nhận xét, đánh giá từ một giác quan, góc độ.",
    "longExplanation": "'起来' (qǐlai) là bổ ngữ xu hướng phức hợp đi sau động từ, mang ba nhóm ngữ nghĩa ngữ pháp cốt lõi: (1) Chỉ phương hướng thực tế từ dưới lên trên (ví dụ: '站起来' - đứng dậy, '拿起来' - nhặt lên, '抬起来' - khiêng/nhấc lên); (2) Biểu thị hành động hoặc trạng thái bắt đầu và có xu hướng tiếp diễn, chuyển biến nhanh chóng (ví dụ: '大家笑起来' - mọi người cười òa lên, '天气热起来' - thời tiết bắt đầu nóng lên); nếu có tân ngữ thì tân ngữ thường chèn vào giữa: 'Động từ + 起 + Tân ngữ + 来' (ví dụ: '唱起歌来' - cất tiếng hát, '下起雨来' - trời bắt đầu đổ mưa); (3) Biểu thị sự đánh giá, cảm nhận khi xem xét từ một phương diện nhất định (ví dụ: '看起来' - nhìn bề ngoài thì, '听起来' - nghe có vẻ, '这道菜做起来很复杂' - món này làm thì phức tạp).",
    "formation": "Động từ + 起来 (nếu có Tân ngữ: Động từ + 起 + Tân ngữ + 来)",
    "examples": []
  },
  "zh_想起来_342": {
    "title": "想起来 (Cụm động từ: Nhớ ra / Sực nhớ lại)",
    "shortExplanation": "Cụm động từ biểu thị ký ức hoặc thông tin trong quá khứ bỗng hiện lại trong trí nhớ; dạng khả năng phủ định phổ biến là '想不起来' (không nhớ ra được).",
    "longExplanation": "'想起来' (xiǎngqilai) là cụm động từ kết hợp với bổ ngữ xu hướng '起来', biểu thị quá trình hồi tưởng khi một ký ức, thông tin, khuôn mặt hoặc tên gọi trong quá khứ từ chỗ bị lãng quên bỗng xuất hiện trở lại trong tâm trí ('nhớ ra', 'sực nhớ'). Trong giao tiếp, cấu trúc này rất thường xuất hiện ở thể bổ ngữ khả năng: '想得起来' (có thể nhớ ra) và '想不起来' (không thể nhớ ra, quên mất). Cần phân biệt rõ với '想出来' (nghĩ ra ý tưởng, sáng kiến mới chưa từng có trước đây). Tương đương với 'nhớ ra', 'sực nhớ' trong tiếng Việt.",
    "formation": "Chủ ngữ + 想起来 (+ Tân ngữ) / Chủ ngữ + 想得起来 / 想不起来 (+ Tân ngữ)",
    "examples": []
  },
  "zh_弄AO_344": {
    "title": "弄 + Tính từ + Tân ngữ (Bổ ngữ kết quả: Làm cho... bị...)",
    "shortExplanation": "Động từ '弄' kết hợp với tính từ làm bổ ngữ kết quả phía sau và theo liền tân ngữ, biểu thị hành động làm cho tân ngữ rơi vào trạng thái nào đó (thường là kết quả tiêu cực, không mong muốn); 'làm hỏng', 'làm bẩn', 'làm mất'.",
    "longExplanation": "'弄' (nòng) là động từ hành động chỉ sự thao tác, động chạm hoặc xử lý một cách tổng quát. Khi '弄' kết hợp trực tiếp với tính từ làm bổ ngữ kết quả (như '坏' - hỏng, '脏' - bẩn, '破' - rách, '丢' - mất, '乱' - bừa bộn, '湿' - ướt) rồi theo sau là tân ngữ, cấu trúc này diễn tả việc tác động hoặc sơ ý làm cho đối tượng rơi vào một trạng thái cụ thể nào đó (ví dụ: '弄坏沙发' - làm hỏng ghế sofa, '弄脏衣服' - làm bẩn quần áo, '弄丢钥匙' - làm mất chìa khóa, '弄乱头发' - làm rối tóc). Cấu trúc này phần lớn được dùng để miêu tả các kết quả bất lợi, không mong muốn do sơ suất hoặc bất cẩn gây nên. Tương đương với 'làm cho... bị...', 'làm hỏng / bẩn / mất...' trong tiếng Việt.",
    "formation": "Chủ ngữ + (别 / 不要 +) 弄 + Tính từ (坏 / 脏 / 破 / 丢 / 乱 / 湿...) + Tân ngữ (+ 了)",
    "examples": [
      {
        "translation": "Lúc khiêng vác nhớ cẩn thận một chút, đừng làm hỏng ghế sofa đấy."
      }
    ]
  },
  "zh_弄得OCLAUSE_345": {
    "title": "弄得 + Tân ngữ + Mệnh đề (Bổ ngữ trạng thái: Khiến cho... / Làm cho... ra nông nỗi...)",
    "shortExplanation": "'弄得' dẫn ra bổ ngữ trạng thái là một cụm từ hoặc mệnh đề chỉ hậu quả, tình thế dở khóc dở cười hoặc không như ý do hành động ở vế trước gây ra; 'khiến cho...', 'làm cho... thành ra...'.",
    "longExplanation": "'弄得' (nòng de) là kết cấu động bổ chỉ trạng thái, thường đứng ở đầu vế câu sau hoặc theo sau một hành động cụ thể để dẫn ra tân ngữ và một mệnh đề miêu tả tình cảnh, trạng thái tâm lý hoặc hậu quả phiền toái phát sinh (ví dụ: '弄得我俩心情都不好' - khiến tâm trạng cả hai đứa chúng tôi đều không vui; '弄得大家都很尴尬' - làm cho mọi người đều rất ngượng ngùng; '弄得满地都是水' - làm cho nước lênh láng khắp sàn nhà). Kết cấu này thường mang sắc thái phàn nàn, bất đắc dĩ, chỉ ra một tình thế lộn xộn hoặc khó chịu do một việc làm nào đó gây nên. Tương đương với 'khiến cho...', 'làm cho... ra nông nỗi...', 'khiến... trở nên...' trong tiếng Việt.",
    "formation": "Hành động / Tình huống，弄得 + Tân ngữ + Mệnh đề / Cụm vị ngữ",
    "examples": [
      {
        "translation": "Ngày nào cũng phê bình cô ấy vì mấy chuyện vặt vãnh này, khiến tâm trạng của cả hai chúng tôi đều chẳng ra sao."
      }
    ]
  },
  "zh_千万不能不要别V_346": {
    "title": "千万 + 不能 / 不要 / 别 + Động từ (Phó từ nhấn mạnh: Tuyệt đối không được / Nhất thiết đừng...)",
    "shortExplanation": "Phó từ '千万' kết hợp với từ phủ định '不能', '不要' hoặc '别' đứng trước động từ để dặn dò, khuyên can hoặc cảnh báo khẩn thiết: 'tuyệt đối không được', 'nhất thiết đừng'.",
    "longExplanation": "'千万' (qiānwàn) là phó từ ngữ khí dùng để biểu đạt sự tha thiết, dặn dò hoặc cảnh cáo nghiêm túc ('ngàn vạn lần', 'tha thiết mong'). Khi kết hợp với các phó từ phủ định mang nghĩa cấm đoán hoặc khuyên can như '别' (đừng), '不要' (không được, chớ) hoặc '不能' (không thể, không được phép), cấu trúc này biểu thị mức độ nhấn mạnh cực kỳ cao, yêu cầu đối phương dứt khoát không được thực hiện một hành động nào đó (ví dụ: '千万别忘了' - nhất thiết đừng quên đấy; '千万不要大意' - tuyệt đối không được sơ suất; '千万不能告诉别人' - dứt khoát không được nói cho người khác biết). Tương đương với 'tuyệt đối không được', 'nhất thiết đừng', 'dứt khoát chớ có' trong tiếng Việt.",
    "formation": "Chủ ngữ + 千万 + 不能 / 不要 / 别 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Tôi muốn đợi đến đúng ngày sinh nhật cô ấy mới tặng món quà này, cậu bây giờ tuyệt đối đừng nói cho cô ấy biết nhé."
      }
    ]
  },
  "zh_一定要得VA_347": {
    "title": "一定要 / 得 + Động từ / Tính từ (Cụm phó từ - trợ động từ: Nhất định phải / Chắc chắn phải...)",
    "shortExplanation": "Sự kết hợp giữa phó từ '一定' và trợ động từ '要' hoặc '得' (děi) để nhấn mạnh yêu cầu bắt buộc, nghĩa vụ cần làm hoặc quyết tâm cao độ; 'nhất định phải', 'chắc chắn phải'.",
    "longExplanation": "'一定' (yīdìng - nhất định, chắc chắn) kết hợp với năng nguyện động từ '要' (cần, phải) hoặc động từ chỉ sự bắt buộc '得' (děi - phải) đứng trước động từ hoặc tính từ, biểu thị một yêu cầu tất yếu, một nghĩa vụ không thể thoái thác hoặc một ý chí, quyết tâm sắt đá của chủ ngữ (ví dụ: '你一定要来' - cậu nhất định phải đến nhé; '一定要成功' - nhất định phải thành công; '一定要注意安全' - nhất định phải chú ý an toàn; '一定要快' - nhất định phải nhanh). Cấu trúc này làm tăng đáng kể sức nặng và mức độ khẩn thiết so với chỉ dùng '要' hay '得' một mình. Tương đương với 'nhất định phải...', 'chắc chắn phải...', 'bắt buộc phải...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 一定要 / 一定得 + Động từ / Tính từ (+ Tân ngữ)",
    "examples": []
  },
  "zh_一定会VA_350": {
    "title": "一定(会) + Động từ / Tính từ (Phó từ - trợ động từ: Nhất định (sẽ)... / Chắc chắn (sẽ)...)",
    "shortExplanation": "'一定' kết hợp với trợ động từ '会' đứng trước động từ hoặc tính từ để biểu thị sự dự đoán chắc chắn, lời hứa hẹn hoặc niềm tin vững chắc vào tương lai; 'nhất định sẽ', 'chắc chắn sẽ'.",
    "longExplanation": "'一定' (yīdìng - nhất định) đứng trước '会' (huì - sẽ) bổ nghĩa cho động từ hoặc tính từ, biểu thị một phán đoán mang tính tất nhiên hoặc một cam kết, quyết tâm thực hiện hành vi trong tương lai (ví dụ: '我一定会继续努力' - tôi nhất định sẽ tiếp tục nỗ lực; '一切都会好起来的，你一定会成功' - mọi chuyện rồi sẽ tốt đẹp, bạn nhất định sẽ thành công; '明天一定会下雨' - ngày mai chắc chắn sẽ mưa). Khác với '一定要' (nhấn mạnh sự bắt buộc phải làm), '一定会' nhấn mạnh vào khả năng xảy ra chắc chắn 100% theo quy luật hoặc qua lời cam kết son sắt. Tương đương với 'nhất định sẽ...', 'chắc chắn sẽ...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 一定(会) + Động từ / Tính từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Cảm ơn sự ủng hộ và khích lệ của ngài, tôi nhất định sẽ tiếp tục cố gắng nỗ lực."
      }
    ]
  },
  "zh_不一定_351": {
    "title": "不一定 (Phó từ phủ định một phần: Chưa chắc / Không nhất thiết / Chưa hẳn)",
    "shortExplanation": "Phó từ biểu thị sự phủ định một phần, chỉ tình huống chưa chắc chắn, không mang tính tất yếu tuyệt đối; 'chưa chắc', 'chưa hẳn', 'không nhất thiết'.",
    "longExplanation": "'不一定' (bù yīdìng) là cụm phó từ phủ định thường gặp, dùng để phủ nhận tính tuyệt đối hoặc tất yếu của một sự việc, nhận định hay hiện tượng (ví dụ: '贵的不一定好' - đắt tiền chưa chắc đã tốt; '个子高不一定力气大' - dáng người cao chưa hẳn đã khỏe; '明天我不一定有空' - ngày mai chưa chắc tôi đã rảnh rỗi). Nó có thể đứng trước vị ngữ làm trạng ngữ, đứng độc lập làm câu trả lời để biểu đạt sự nghi ngại hoặc không dám khẳng định chắc chắn (như khi được hỏi: '他会来吗？' -> '不一定。' - Anh ấy sẽ đến chứ? -> Chưa chắc). Tương đương với 'chưa chắc', 'chưa hẳn', 'không nhất thiết', 'chưa hẳn đã' trong tiếng Việt.",
    "formation": "Chủ ngữ + 不一定 + Vị ngữ (Động từ / Tính từ / Cụm chủ vị) / Hoặc dùng độc lập: 不一定",
    "examples": [
      {
        "translation": "Dáng người cao chưa chắc sức lực đã khỏe."
      }
    ]
  },
  "zh_一定的_352": {
    "title": "一定的 + Danh từ (Tính từ làm định ngữ: ...nhất định / Có mức độ nào đó)",
    "shortExplanation": "'一定' kết hợp với trợ từ kết cấu '的' đứng trước danh từ làm định ngữ, biểu thị đạt đến một mức độ, trình độ hoặc số lượng tương đối nào đó; 'nhất định', 'chừng mực nào đó'.",
    "longExplanation": "'一定' (yīdìng) khi làm tính từ đi kèm '的' đứng trước danh từ làm định ngữ không mang nghĩa là 'chắc chắn', mà mang nghĩa là đạt tới một mức độ, quy mô, trình độ hoặc tỷ lệ đáng kể nào đó (ví dụ: '有一定的基础' - có nền tảng nhất định; '产生一定的影响' - tạo ra ảnh hưởng nhất định; '需要一定的时间' - cần một khoảng thời gian nhất định; '具有一定的难度' - có độ khó nhất định). Cấu trúc này thường đi kèm với các danh từ trừu tượng như '基础' (nền tảng), '水平' (trình độ), '规律' (quy luật), '距离' (khoảng cách), '比例' (tỷ lệ). Tương đương với '...nhất định', 'mức độ nhất định', 'chừng mực nào đó' trong tiếng Việt.",
    "formation": "(Động từ: 有 / 产生 / 达到...) + 一定的 + Danh từ (基础 / 影响 / 难度 / 距离 / 水平...)",
    "examples": [
      {
        "translation": "Nếu như có một nền tảng ngôn ngữ nhất định, thế thì ra nước ngoài học ngoại ngữ là sự lựa chọn tốt nhất."
      }
    ]
  },
  "zh_来V_353": {
    "title": "来 + Động từ (Trợ động từ chỉ sự chủ động: Để... làm / Đích thân... làm)",
    "shortExplanation": "'来' đứng trước động từ để biểu thị sự chủ động xung phong, đề nghị tự nguyện thực hiện hành động hoặc bắt tay vào thử làm; 'để tôi...', 'hãy để... làm'.",
    "longExplanation": "'来' (lái) khi đứng trước một động từ khác trong khẩu ngữ không nhằm chỉ sự di chuyển 'đến' từ xa tới gần, mà đóng vai trò như một trợ từ / động từ phụ trợ biểu thị ý thức chủ động đảm nhận, đề nghị xung phong hoặc sẵn sàng bắt tay làm một công việc gì đó (ví dụ: '我来做' - để tôi làm cho; '我来帮你' - để tôi giúp bạn; '你来试试' - bạn thử làm xem; '今天我来请客' - hôm nay để tôi mời). Cấu trúc này làm cho lời nói trở nên nhiệt tình, chủ động và tự nhiên trong giao tiếp đời thường. Tương đương với 'để (tôi)...', 'hãy để... làm', 'bắt tay vào...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 来 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Chiếc ghế sofa này to thế này, để tôi giúp các bạn khiêng một tay."
      }
    ]
  },
  "zh_通过用N来V_354": {
    "title": "通过 / 用 + Danh từ + 来 + Động từ (Cấu trúc chỉ phương thức - mục đích: Thông qua / Dùng... để...)",
    "shortExplanation": "Giới từ '通过' hoặc '用' dẫn ra phương tiện, cách thức hoặc công cụ, kết hợp với liên từ '来' ở phía sau để diễn tả việc thông qua hoặc dùng phương tiện đó để đạt được mục đích hành động.",
    "longExplanation": "Cấu trúc này kết hợp cụm giới từ chỉ phương thức ('通过' - thông qua phương thức, quá trình; hoặc '用' - sử dụng công cụ, vật liệu, sự thật) với liên từ '来' (để, nhằm) đứng trước động từ chỉ mục đích. Toàn câu biểu đạt rõ ràng phương tiện hoặc con đường được áp dụng nhằm thực hiện hóa một mục tiêu cụ thể (ví dụ: '通过阅读来提高汉语水平' - thông qua đọc sách để nâng cao trình độ tiếng Hán; '用事实来证明一切' - dùng sự thật để chứng minh mọi điều; '通过交流来增进了解' - thông qua giao lưu để tăng cường sự hiểu biết). Tương đương với 'thông qua... để...', 'dùng... để...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 通过 / 用 + Danh từ (Phương thức / Công cụ / Căn cứ) + 来 + Động từ (+ Tân ngữ)",
    "examples": []
  },
  "zh_左右_356": {
    "title": "Số từ (+ Lượng từ) / Mốc thời gian + 左右 (Từ biểu thị ước lượng: Khoảng / Chừng / Độ...)",
    "shortExplanation": "'左右' (tả hữu) được đặt ở SAU số từ, lượng từ hoặc từ chỉ thời gian để biểu thị con số hoặc thời điểm xấp xỉ; 'khoảng', 'chừng', 'tầm'.",
    "longExplanation": "Trong tiếng Trung, '左右' (zuǒyòu) là từ chỉ độ ước lượng (ước số), luôn được đặt ở ngay SAU từ ngữ chỉ số lượng, tuổi tác, giá cả hoặc mốc thời gian để biểu thị con số xấp xỉ, dao động trên dưới con số chuẩn đó một chút (ví dụ: '十点左右' - khoảng 10 giờ; '三十岁左右' - tầm 30 tuổi; '一千块左右' - chừng 1000 tệ; '五个小时左右' - khoảng 5 tiếng đồng hồ). Chú ý về vị trí trật tự từ: trong tiếng Việt từ 'khoảng/chừng' thường đứng TRƯỚC số từ, nhưng '左右' trong tiếng Trung bắt buộc phải đứng SAU số lượng từ. Tương đương với 'khoảng...', 'chừng...', 'tầm...', 'độ...' trong tiếng Việt.",
    "formation": "Số từ (+ Lượng từ + Danh từ) / Mốc thời gian + 左右",
    "examples": []
  },
  "zh_可VA了_359": {
    "title": "可 + Tính từ / Động từ + 了 (Phó từ ngữ khí cảm thán: Thật là... / Quá đỗi... lắm đấy)",
    "shortExplanation": "Phó từ '可' đứng trước tính từ hoặc động từ tâm lý, kết hợp với trợ từ ngữ khí '了' ở cuối câu để nhấn mạnh mức độ cực kỳ cao kèm ngữ khí cảm thán; 'thật là...', 'quá chừng', 'lắm đấy'.",
    "longExplanation": "'可' (kě) làm phó từ nhấn mạnh mức độ cao trong khẩu ngữ sinh động. Khi kết hợp với cấu trúc '可 + Tính từ / Động từ tâm lý + 了', nó diễn đạt cảm xúc tán thán, ngạc nhiên hoặc khẳng định mức độ của tính chất, trạng thái là rất lớn, vượt trội hơn hẳn thông thường (ví dụ: '今天天气可热了' - hôm nay trời nóng thật đấy; '那里的风景可美了' - cảnh sắc nơi đó đẹp tuyệt vời; '大家可高兴了' - mọi người vui mừng khôn xiết; '这道题可难了' - bài này khó dã man). Cấu trúc này mang sắc thái khẩu ngữ thân mật và tình cảm mạnh mẽ hơn hẳn so với các phó từ trung tính như '很' hay '非常'. Tương đương với 'thật là...', 'quá chừng', '...lắm luôn', 'hết sức...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 可 + Tính từ / Động từ tâm lý + 了",
    "examples": [
      {
        "translation": "Hôm nay thời tiết nóng thật đấy!"
      }
    ]
  },
  "zh_可Q_360": {
    "title": "可 + Từ để hỏi (Phó từ ngữ khí: Rốt cuộc thì... / Rốt cuộc biết làm sao)",
    "shortExplanation": "Đứng trước đại từ nghi vấn trong câu hỏi để nhấn mạnh ngữ khí thắc mắc, băn khoăn, lo lắng hoặc sốt ruột; 'rốt cuộc thì...', 'thế này thì... biết làm sao'.",
    "longExplanation": "'可' (kě) đóng vai trò là phó từ ngữ khí, thường đứng trước đại từ nghi vấn (như 怎么, 怎么办, 谁, 哪儿, 什么...) trong các câu hỏi hoặc câu hỏi tu từ. Cấu trúc này dùng để nhấn mạnh tâm trạng lo lắng, bất an, bối rối hoặc tha thiết muốn tìm ra hướng giải quyết trước một tình huống cấp bách, nan giải (ví dụ: '这可怎么办？' - Thế này thì biết làm sao đây?, '你可去哪儿了？' - Cậu rốt cuộc đã đi đâu thế?). Tương đương với 'rốt cuộc thì...', 'biết... làm sao', 'sao mà...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 可 + Từ để hỏi (怎么 / 怎么办 / 谁 / 哪儿...) (+ Trợ từ ngữ khí)",
    "examples": [
      {
        "translation": "Tuần sau phải đến đại sứ quán làm visa rồi, thế này thì rốt cuộc biết làm thế nào đây?"
      }
    ]
  },
  "zh_可V_361": {
    "title": "可 + Động từ / Tính từ (Phó từ ngữ khí: Thật là / Quả thực / Đúng là)",
    "shortExplanation": "Đứng trước động từ (đặc biệt là '是') hoặc tính từ để nhấn mạnh sự khẳng định, xác thực; 'thật là', 'quả thực', 'đúng là'.",
    "longExplanation": "'可' (kě) làm phó từ ngữ khí đứng trước động từ (phổ biến nhất là kết hợp thành '可是' - quả đúng là, đúng thật là) hoặc tính từ, dùng để tăng cường ngữ khí khẳng định một sự thật, nhận định hoặc tính chất nào đó, tương đương với '确实', '实在', '真是' (ví dụ: '这可不是开玩笑' - chuyện này quả không phải đùa đâu, '今天可真冷' - hôm nay thật là lạnh, '这可是个好机会' - đây đúng thật là cơ hội tốt). Nó giúp câu nói mang sắc thái nhấn mạnh và cảm xúc rõ nét. Tương đương với 'thật là', 'quả là', 'đúng là', 'chắc chắn là' trong tiếng Việt.",
    "formation": "Chủ ngữ + 可 + 是 / Động từ / Tính từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Đây quả thật là một vấn đề lớn, tôi cũng không rõ lắm."
      }
    ]
  },
  "zh_怕害怕_362": {
    "title": "怕 / 害怕 (Động từ tâm lý: Sợ / Sợ hãi / Lo sợ)",
    "shortExplanation": "Động từ biểu thị trạng thái tâm lý lo sợ, bất an trước nguy cơ, khó khăn hoặc đối tượng nguy hiểm; 'sợ', 'sợ hãi', 'lo ngại'.",
    "longExplanation": "'怕' (pà) và '害怕' (hàipà) đều là động từ tâm lý biểu thị cảm giác sợ sệt, e ngại trước sự vật hoặc tình huống không mong muốn. Trong đó, '害怕' thường nhấn mạnh cảm xúc sợ hãi trước một đối tượng cụ thể hoặc hoàn cảnh đáng sợ (ví dụ: '害怕黑' - sợ bóng tối, '害怕狗' - sợ chó), trong khi '怕' có phạm vi sử dụng rộng hơn, vừa chỉ cảm giác sợ hãi cụ thể vừa mang nghĩa lo lắng, e sợ về một hậu quả tiêu cực có thể xảy ra trong tương lai (ví dụ: '怕赶不上车' - sợ không kịp xe, '怕考不好' - sợ thi không tốt). Khi đứng trước một phân câu hoặc ngữ động từ, cả hai đều có thể dùng để diễn đạt sự âu lo rằng mình không hoàn thành được mục tiêu. Tương đương với 'sợ', 'lo sợ', 'e ngại' trong tiếng Việt.",
    "formation": "Chủ ngữ + 怕 / 害怕 (+ Danh từ / Động từ / Phân câu)",
    "examples": [
      {
        "translation": "Kinh nghiệm làm việc của tôi còn tương đối ít, công việc đó tôi sợ là hoàn thành không nổi."
      }
    ]
  },
  "zh_恐怕_363": {
    "title": "恐怕…… (Phó từ ngữ khí: E rằng / Sợ rằng / Chắc là...)",
    "shortExplanation": "Phó từ biểu thị sự phỏng đoán kèm theo tâm lý e ngại, lo lắng hoặc giữ phép lịch sự; 'e rằng...', 'sợ rằng...', 'chắc là...'.",
    "longExplanation": "'恐怕' (kǒngpà) là phó từ ngữ khí thường đứng ở đầu câu hoặc trước vị ngữ, dùng để đưa ra lời ước đoán, nhận định về một tình huống hoặc kết quả không mấy khả quan hoặc trái với mong đợi của đối phương (ví dụ: '恐怕来不及了' - e rằng không kịp nữa rồi, '恐怕不行' - sợ rằng không được đâu, '恐怕要下雨' - khéo mà trời sắp mưa). Nó giúp làm cho ngữ khí trở nên uyển chuyển, mềm mỏng và lịch sự hơn khi thông báo tin không vui. Tương đương với 'e rằng', 'sợ rằng', 'chắc là', 'khéo mà' trong tiếng Việt.",
    "formation": "(Chủ ngữ +) 恐怕 + Phân câu / Cụm vị ngữ",
    "examples": [
      {
        "translation": "Nghe xong câu trả lời của tôi, e rằng bạn đã biết đáp án của tôi rồi nhỉ."
      }
    ]
  },
  "zh_怕恐怕V_364": {
    "title": "怕 / 恐怕 + Động từ (Phó từ ước lượng: Ước chừng / Sợ là đã... / Khoảng chừng)",
    "shortExplanation": "Đứng trước động từ (thường là '有', '超过'...) kết hợp với từ ngữ chỉ số lượng, thời gian để biểu thị sự ước lượng, phỏng đoán; 'ước chừng', 'sợ là đã'.",
    "longExplanation": "'怕' (pà) hoặc '恐怕' (kǒngpà) khi đứng trước các động từ như '有' (có, được), '超/超过' (vượt quá), '要' (cần) đi kèm ngữ số lượng hoặc thời gian, đóng vai trò như phó từ ước tính. Cấu trúc này diễn đạt sự ước lượng phỏng đoán của người nói về con số, độ dài thời gian hoặc mức độ mà không thể khẳng định chính xác 100% (ví dụ: '恐怕有三十个人' - ước chừng phải có 30 người, '离开怕有二十天了' - rời đi sợ chừng đã 20 ngày rồi, '修好恐怕要一个月' - sửa xong e là phải mất một tháng). Tương đương với 'ước chừng', 'chắc phải', 'sợ chừng đã', 'khoảng độ' trong tiếng Việt.",
    "formation": "Chủ ngữ + 怕 / 恐怕 + Động từ (有 / 超过 / 要...) + Ngữ số lượng / Thời gian",
    "examples": [
      {
        "translation": "Anh ấy rời khỏi nơi này ước chừng đã có đến hai mươi ngày rồi."
      }
    ]
  },
  "zh_到底_365": {
    "title": "Động từ + 到底 (Bổ ngữ / Cụm động từ: Đến cùng / Triệt để / Tới tận cùng)",
    "shortExplanation": "Đứng sau động từ để biểu thị hành động được kiên trì thực hiện cho đến đích cuối cùng, không bỏ dở giữa chừng; 'đến cùng', 'tới cùng'.",
    "longExplanation": "'到底' (dàodǐ) khi dùng làm bổ ngữ hoặc thành phần kết hợp sau động từ mang ý nghĩa 'đến tận đáy/điểm tận cùng' của sự việc. Cấu trúc 'Động từ + 到底' biểu đạt ý chí kiên định, quyết tâm theo đuổi hành động cho đến khi có kết quả cuối cùng hoặc hoàn toàn xong xuôi, tuyệt đối không bỏ dở nửa chừng (ví dụ: '坚持到底' - kiên trì đến cùng, '调查到底' - điều tra đến cùng, '逛到底' - đi dạo đến cùng, '进行到底' - tiến hành tới cùng). Tương đương với 'đến cùng', 'tới cùng', 'cho trót' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ (+ Tân ngữ + Động từ) + 到底 (hoặc: Động từ + 到底)",
    "examples": [
      {
        "translation": "Hôm nay tôi nhất định sẽ cùng bạn dạo phố mua sắm đến cùng, bảo đảm giúp bạn mua được bộ quần áo ưng ý."
      }
    ]
  },
  "zh_到底Q_366": {
    "title": "到底 + Từ để hỏi (Phó từ: Rốt cuộc là... / Cuối cùng thì...)",
    "shortExplanation": "Phó từ dùng trong câu hỏi hoặc câu hỏi tu từ để truy vấn đến cùng sự thật, tăng cường ngữ khí gặng hỏi; 'rốt cuộc là...', 'rốt cuộc thì...'.",
    "longExplanation": "'到底' (dàodǐ) là phó từ thường đứng trước chủ ngữ hoặc trước vị ngữ trong câu có đại từ nghi vấn (như 怎么, 什么时候, 谁, 什么, 哪儿...) hoặc câu hỏi chính phản (khẳng định - phủ định như Đi hay không đi). Nó dùng để gặng hỏi, truy cứu cặn kẽ chân tướng sự việc hoặc thể hiện sự sốt ruột muốn biết rõ quyết định, kế hoạch dứt khoát của đối phương (ví dụ: '你到底去不去？' - Rốt cuộc cậu có đi hay không?, '到底是怎么回事？' - Rốt cuộc là có chuyện gì thế?, '到底谁赢了？' - Cuối cùng thì ai đã thắng?). Tương đương với 'rốt cuộc là', 'rốt cuộc thì', 'cuối cùng thì' trong tiếng Việt.",
    "formation": "(Chủ ngữ +) 到底 (+ Chủ ngữ +) Từ để hỏi / Mệnh đề nghi vấn (+ Trợ từ ngữ khí)",
    "examples": [
      {
        "translation": "Rốt cuộc thì bạn có dự tính như thế nào vậy?"
      }
    ]
  },
  "zh_拿来说_367": {
    "title": "拿……来说 (Cụm giới từ dẫn chứng: Lấy... làm ví dụ / Đối với... mà nói)",
    "shortExplanation": "Cụm giới từ dùng để đưa ra một người, sự vật hoặc ví dụ điển hình nhằm giải thích, minh họa cho một vấn đề; 'lấy... làm ví dụ', 'như... mà nói'.",
    "longExplanation": "'拿……来说' (ná ... láishuō) là cấu trúc giới từ cố định thường đứng ở đầu câu hoặc đầu phân câu, theo sau '拿' là một danh từ hoặc đại từ chỉ đối tượng cụ thể (người, sự việc, tổ chức...). Cấu trúc này dùng để dẫn ra một dẫn chứng điển hình, thực tế nhằm làm sáng tỏ một quan điểm, kinh nghiệm hoặc tình huống được đề cập (ví dụ: '拿中国来说' - lấy Trung Quốc làm ví dụ, '拿这个问题来说' - lấy vấn đề này mà nói, '拿我来说' - lấy bản thân tôi làm ví dụ). Tương đương với 'lấy... làm ví dụ', 'chẳng hạn như...', 'đối với... mà nói' trong tiếng Việt.",
    "formation": "拿 + Danh từ / Đại từ + 来说，Mệnh đề giải thích / minh họa",
    "examples": [
      {
        "translation": "Lấy tôi làm ví dụ, tôi đã học tiếng Trung được mười năm rồi."
      }
    ]
  },
  "zh_敢V_368": {
    "title": "敢 + Động từ (Động từ năng nguyện: Dám làm gì)",
    "shortExplanation": "Động từ năng nguyện biểu thị lòng dũng cảm, sự tự tin để thực hiện một hành động; 'dám làm gì', phủ định là '不敢' (không dám).",
    "longExplanation": "'敢' (gǎn) là động từ năng nguyện (trợ động từ) đứng trước động từ khác, biểu thị chủ thể có đủ dũng khí, sự tự tin hoặc sự táo bạo để tiến hành một việc nào đó mà thường có tính mạo hiểm, khó khăn hoặc dễ gây ra hậu quả (ví dụ: '敢于面对' - dám đối mặt, '你敢去吗？' - cậu có dám đi không?, '敢想敢干' - dám nghĩ dám làm). Thể phủ định '不敢' (không dám) được sử dụng rất phổ biến để biểu thị sự e ngại, kiêng dè hoặc khiêm tốn lịch sự. Tương đương với 'dám' trong tiếng Việt.",
    "formation": "Chủ ngữ + (不 / 也) + 敢 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Không một ai dám nói xấu anh ấy."
      }
    ]
  },
  "zh_倒_369": {
    "title": "倒 (Động từ âm dào: Rót / Đổ / Châm nước)",
    "shortExplanation": "Động từ (phát âm dào) chỉ hành động nghiêng hoặc lật đồ đựng để chất lỏng hay đồ vật chảy, trút ra ngoài; 'rót', 'đổ', 'châm'.",
    "longExplanation": "'倒' phát âm là dào (thanh 4) khi là động từ mang nghĩa nghiêng hoặc dốc ngược đồ chứa để rót chất lỏng (trà, nước, rượu...) hoặc đổ các thứ chứa bên trong ra ngoài (rác, nước bẩn...) (ví dụ: '倒水' - rót nước, '倒茶' - rót trà, '倒酒' - rót rượu, '倒垃圾' - đổ rác). Cần phân biệt với âm dǎo (thanh 3: ngã, đổ sập, phá sản). Tương đương với 'rót', 'châm', 'đổ', 'trút' trong tiếng Việt.",
    "formation": "Chủ ngữ + 倒 (+ Đối tượng nhận / Lượng từ) + Danh từ chất lỏng / rác (水 / 茶 / 垃圾...)",
    "examples": [
      {
        "translation": "Để tôi rót cho bạn một cốc nước nhé."
      }
    ]
  },
  "zh_倒_370": {
    "title": "倒 (Động từ / Phó từ âm dào: Đảo ngược / Quay ngược / Thụt lùi)",
    "shortExplanation": "Động từ hoặc phó từ (phát âm dào) chỉ hướng chuyển động thụt lùi hoặc vị trí, thứ tự bị đảo lộn ngược lại; 'đảo ngược', 'lùi lại', 'lộn ngược'.",
    "longExplanation": "'倒' phát âm là dào (thanh 4) biểu thị phương hướng di chuyển ngược chiều về phía sau (như lùi xe) hoặc trật tự trên dưới, trước sau bị hoán đổi, lộn ngược lại (ví dụ: '倒车' - lùi xe, '倒着走' - đi giật lùi, '倒过来' - đảo ngược lại/lộn ngược lại, '把画挂倒了' - treo bức tranh bị ngược đầu). Thường kết hợp với các bổ ngữ xu hướng như '过来', '过去' hoặc đi kèm trợ từ '着'. Tương đương với 'đảo ngược', 'lộn ngược', 'lùi' trong tiếng Việt.",
    "formation": "倒 + Bổ ngữ xu hướng (过来 / 过去...) (hoặc: 倒着 + Động từ)",
    "examples": [
      {
        "translation": "“Tôi yêu bạn”, đảo ngược lại chính là “Bạn yêu tôi”."
      }
    ]
  },
  "zh_S倒V_371": {
    "title": "Chủ ngữ + 倒 / 倒是 + Vị ngữ (Phó từ chuyển ý: Thì... đấy nhưng / Ngược lại)",
    "shortExplanation": "Phó từ biểu thị sự nhượng bộ, thừa nhận một khía cạnh trước rồi lập tức chuyển ý sang khía cạnh tương phản, khó khăn hơn; 'thì... đấy nhưng mà...'.",
    "longExplanation": "'倒' (dào) làm phó từ ngữ khí (thường kết hợp thành '倒是') đứng trước vị ngữ, dùng trong câu mang quan hệ nhượng bộ và chuyển ý (thường đi với '可是', '但是', '可'). Người nói trước hết thừa nhận một phần sự thật, ưu điểm hoặc sự hợp lý ở vế đầu, nhưng sau đó lập tức chuyển hướng để nhấn mạnh một khó khăn, hạn chế hoặc tình huống trái ngược ở vế sau (ví dụ: '去倒是可以，但是没时间' - Đi thì cũng được đấy, nhưng không có thời gian; '质量倒是挺好，就是太贵' - Chất lượng thì tốt thật đấy, ngặt nỗi đắt quá; '说得倒是容易，做起来难' - Nói thì dễ đấy, làm mới khó). Tương đương với 'thì... thật đấy nhưng', 'ngược lại' trong tiếng Việt.",
    "formation": "Chủ ngữ + 倒 / 倒是 + Vị ngữ 1，(可是 / 但是 / 可 +) Vị ngữ 2",
    "examples": [
      {
        "translation": "Bạn nói thì dễ đấy, nhưng khi bắt tay vào làm mới thấy khó làm sao!"
      }
    ]
  },
  "zh_干gn_372": {
    "title": "干 (gān) (Tính từ / Bổ ngữ kết quả: Khô / Cạn ráo)",
    "shortExplanation": "Tính từ hoặc bổ ngữ kết quả (phát âm gān) chỉ trạng thái khô ráo, hết sạch nước hoặc không còn ẩm ướt; 'khô', 'ráo'.",
    "longExplanation": "'干' phát âm là gān (thanh 1) là tính từ miêu tả tính chất khô ráo, không có hoặc còn rất ít hơi nước, độ ẩm (ví dụ: '衣服干了' - quần áo khô rồi, '天气很干' - thời tiết rất hanh khô, '干毛巾' - khăn khô). Khi đứng sau các động từ như 擦 (lau), 晒 (phơi), 吹 (sấy), 洗 (giặt), 烘 (sấy)... nó đóng vai trò làm bổ ngữ kết quả biểu thị việc làm cho một vật trở nên khô ráo hoàn toàn (ví dụ: '擦干' - lau khô, '晒干' - phơi khô, '吹干' - sấy khô). Cần phân biệt với gàn (làm việc). Tương đương với 'khô', 'cạn', 'ráo' trong tiếng Việt.",
    "formation": "Động từ + 干 (Bổ ngữ kết quả) (hoặc: Danh từ + 很 / 已经 + 干)",
    "examples": [
      {
        "translation": "Hãy lau khô tóc đi."
      }
    ]
  },
  "zh_干gn_373": {
    "title": "干 (gàn) (Động từ khẩu ngữ: Làm / Làm việc / Hành động)",
    "shortExplanation": "Động từ khẩu ngữ (phát âm gàn) chỉ hành động làm việc, thực hiện công việc hay hành vi; 'làm', tương đương với '做'.",
    "longExplanation": "'干' phát âm là gàn (thanh 4) là động từ thông dụng trong khẩu ngữ tiếng Hán, dùng để chỉ việc tiến hành một hoạt động, xử lý công việc hoặc bắt tay làm việc gì đó, hoàn toàn tương đương với '做' (làm) nhưng mang sắc thái bình dân, tự nhiên và mạnh mẽ hơn (ví dụ: '你在干什么？' - cậu đang làm gì đấy?, '干活儿' - làm việc/lao động, '好好干' - cố gắng làm việc cho tốt nhé, '干本行' - làm đúng chuyên môn). Tương đương với 'làm', 'làm việc', 'ra tay' trong tiếng Việt.",
    "formation": "Chủ ngữ + 干 + Tân ngữ (什么 / 活儿 / 工作...)",
    "examples": [
      {
        "translation": "Bạn đang làm gì thế?"
      }
    ]
  },
  "zh_趟_374": {
    "title": "Số từ + 趟 (Động lượng từ: Chuyến / Lượt / Bận đi lại)",
    "shortExplanation": "Động lượng từ (phát âm tàng) dùng sau động từ đi lại hoặc trước danh từ chỉ hành trình để đếm số lần qua lại, chuyến đi; 'chuyến', 'lượt', 'bận'.",
    "longExplanation": "'趟' (tàng) là động lượng từ chuyên dùng để đo đếm số lần di chuyển, qua lại hoặc hành trình đi về của người hoặc phương tiện giao thông (ví dụ: '去一趟北京' - đi Bắc Kinh một chuyến, '跑了两趟' - chạy đi chạy lại hai lượt, '白跑一趟' - cất công đi một chuyến vô ích, '走一趟' - đi một chuyến). Thường đặt sau động từ chỉ sự di chuyển (như 去, 来, 跑, 走) và đứng trước tân ngữ chỉ nơi chốn. Tương đương với 'chuyến', 'lượt', 'bận (đi lại)' trong tiếng Việt.",
    "formation": "Động từ (去 / 来 / 走 / 跑...) + Số từ + 趟 (+ Tân ngữ nơi chốn)",
    "examples": []
  },
  "zh_次_377": {
    "title": "Số thứ tự / Số hiệu + 次 (Lượng từ / Danh từ: Chuyến xe số... / Tuyến xe số...)",
    "shortExplanation": "Đứng sau số hiệu phương tiện giao thông (tàu hỏa, xe buýt...) để chỉ chuyến xe, tuyến xe mang số hiệu đó; 'số...', 'tuyến...'.",
    "longExplanation": "'次' (cì) khi đi liền sau con số hoặc số hiệu của phương tiện giao thông công cộng (như tàu hỏa '列车', xe buýt '公交车') được dùng như một danh từ/lượng từ chỉ số hiệu hành trình, chuyến xe hoặc tuyến đường chạy cố định (chính là '车次' - số hiệu chuyến tàu/xe). Ví dụ: '502次公交车' (xe buýt số 502), 'G1次高铁' (tàu cao tốc số G1), 'K123次列车' (tàu hỏa tốc hành số K123). Tương đương với 'số...', 'chuyến xe số...', 'tuyến số...' trong tiếng Việt.",
    "formation": "Số từ / Số hiệu + 次 (+ Danh từ phương tiện: 公交车 / 列车 / 火车...)",
    "examples": [
      {
        "translation": "Xe buýt số 502 sắp đến nơi rồi."
      }
    ]
  },
  "zh_为了V1而V2_378": {
    "title": "为了 + Động từ 1 + 而 + Động từ 2 (Liên từ mục đích: Vì... mà làm gì / Nhằm để... nên...)",
    "shortExplanation": "Biểu thị mục đích và hành động: '为了' đưa ra mục đích hành động (Động từ 1), '而' kết nối với hành động được thực hiện (Động từ 2); 'để...', 'vì... mà...'.",
    "longExplanation": "Cấu trúc '为了 + Động từ 1 + 而 + Động từ 2' kết hợp giới từ chỉ mục đích '为了' (wèile) và liên từ nối tiếp '而' (ér). Trong đó, 'Động từ 1' biểu thị mục đích, lý tưởng hoặc kết quả mà chủ thể hướng tới; 'Động từ 2' biểu thị hành động, nỗ lực hoặc biện pháp cụ thể được tiến hành nhằm đạt được mục đích đó (ví dụ: '为了生活而奔波' - bôn ba vì cuộc sống, '为了实现梦想而努力奋斗' - nỗ lực phấn đấu để thực hiện ước mơ, '为了保护环境而减少使用塑料' - giảm dùng đồ nhựa để bảo vệ môi trường). Tương đương với 'để / nhằm để... mà...', 'vì... nên thực hiện...' trong tiếng Việt.",
    "formation": "(Chủ ngữ +) 为了 + Động từ 1 (+ Tân ngữ) + (Chủ ngữ +) 而 + Động từ 2 (+ Tân ngữ)",
    "examples": []
  },
  "zh_为了N而V_381": {
    "title": "为了 + Danh từ + 而 + Động từ (Cụm giới từ mục đích: Vì... mà làm gì / Hành động vì...)",
    "shortExplanation": "Giới từ '为了' đưa ra danh từ chỉ đối tượng, mục đích hoặc lợi ích, '而' liên kết với hành động được thực hiện; 'vì... mà...', 'để có được... mà...'.",
    "longExplanation": "Cấu trúc '为了 + Danh từ + 而 + Động từ' dùng giới từ '为了' (wèile) dẫn ra đối tượng danh từ biểu thị mục đích, lợi ích, lý tưởng hoặc nhu cầu cốt lõi (như tiền bạc, tình yêu, hòa bình, tài nguyên sinh tồn...), và dùng liên từ '而' (ér) để kết nối với động từ biểu thị hành động nỗ lực hoặc cạnh tranh để giành lấy điều đó (ví dụ: '为了生存而战' - chiến đấu vì sự sinh tồn, '为了金钱而工作' - làm việc vì tiền bạc, '为了荣誉而拼搏' - dốc sức phấn đấu vì danh dự). Tương đương với 'vì... mà...', 'để giành lấy... mà thực hiện...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 为了 + Danh từ (+ Danh từ...) + 而 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Thực vật sẽ cạnh tranh lẫn nhau vì ánh nắng, không khí và nước."
      }
    ]
  },
  "zh_仍然VA_382": {
    "title": "仍然 + Động từ / Tính từ (Phó từ: Vẫn / Vẫn cứ / Vẫn như cũ)",
    "shortExplanation": "Phó từ biểu thị hành động, trạng thái hoặc tính chất tiếp tục duy trì không thay đổi bất chấp thời gian hoặc hoàn cảnh thay đổi; 'vẫn', 'vẫn cứ'.",
    "longExplanation": "'仍然' (réngrán) là phó từ chỉ sự tiếp diễn của trạng thái hoặc hành vi, có nghĩa là 'vẫn như trước', 'vẫn vậy' (đồng nghĩa với '依然', '还是'). Nó thường đứng trước động từ hoặc tính từ, dùng để chỉ một trạng thái, tình huống hoặc tính chất nào đó vẫn tiếp tục duy trì nguyên vẹn như cũ, không hề biến chuyển dù thời gian đã trôi qua hoặc hoàn cảnh xung quanh có đổi khác (ví dụ: '仍然坚持' - vẫn tiếp tục kiên trì, '仍然很年轻' - trông vẫn rất trẻ, '仍然没有消息' - vẫn chưa có tin tức gì). Thường kết hợp với '虽然……但是……' hoặc '即使/就算……也……'. Tương đương với 'vẫn', 'vẫn cứ', 'vẫn như cũ' trong tiếng Việt.",
    "formation": "Chủ ngữ (+ 即使 / 虽然...) + 仍然 + Động từ / Tính từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Cho dù ở đáy biển sâu vài kilomet thì vẫn có thể nhìn thấy đồ vật."
      }
    ]
  },
  "zh_是否_383": {
    "title": "是否…… (Phó từ liên kết: Liệu có... hay không / Có... không)",
    "shortExplanation": "Dạng văn viết trang trọng tương đương với '是不是', dùng trong câu hỏi hoặc phân câu làm tân ngữ để diễn đạt sự nghi vấn, không chắc chắn; 'liệu có... hay không'.",
    "longExplanation": "'是否' (shìfǒu) là từ mang sắc thái trang trọng, văn viết, kết hợp từ chữ Hán cổ '是' (phải, đúng) và '否' (không, chẳng), hoàn toàn tương đương với dạng câu hỏi chính phản khẩu ngữ '是不是' (phải chăng, có phải hay không). '是否' thường đứng trước vị ngữ trong câu trần thuật hoặc phân câu làm tân ngữ cho các động từ tri nhận (như 知道, 了解, 确定, 怀疑, 考虑...) để biểu thị tính hai mặt chưa xác định của sự việc (ví dụ: '是否同意' - liệu có đồng ý hay không, '是否可行' - có khả thi hay không, '是否参加' - liệu có tham gia hay không). Tương đương với 'liệu có... hay không', 'có... hay không' trong tiếng Việt.",
    "formation": "Chủ ngữ + (不确定 / 不知道 +) 是否 + Vị ngữ (Động từ / Tính từ / Cụm động từ)",
    "examples": [
      {
        "translation": "Nhưng con bé còn nhỏ thế này, cuốn sách này tôi không biết liệu nó có đọc hiểu được hay không."
      }
    ]
  },
  "zh_受不了_384": {
    "title": "受不了 (Cụm bổ ngữ khả năng: Chịu không nổi / Không thể chịu đựng được)",
    "shortExplanation": "Bổ ngữ khả năng biểu thị sự quá tải về thể chất hoặc tâm lý, không thể tiếp tục nhẫn nhịn hay chịu đựng được nữa; 'chịu không nổi', 'không chịu xiết'.",
    "longExplanation": "'受不了' (shòubùliǎo) là hình thức phủ định của bổ ngữ khả năng '受得了' (chịu đựng được), trong đó '受' là chịu đựng, tiếp nhận. Cụm từ này dùng để biểu thị một người không thể nào chịu đựng, kham nổi hoặc nhẫn nhịn thêm được nữa trước sự đau đớn, mệt mỏi về thể xác, áp lực tâm lý hoặc trước thái độ, hành vi quá quắt, khó chịu của người khác (ví dụ: '受不了这天气' - chịu không nổi thời tiết này, '受不了他的脾气' - không chịu nổi tính khí của anh ta, '热得受不了' - nóng chịu không thấu). Thường đi trực tiếp với tân ngữ danh từ/đại từ hoặc đứng sau '得' làm bổ ngữ trạng thái. Tương đương với 'chịu không nổi', 'không thể chịu đựng được', 'chịu hết xiết' trong tiếng Việt.",
    "formation": "Chủ ngữ + (真 / 实在) + 受不了 (+ Tân ngữ: Người / Sự việc / Hoàn cảnh)",
    "examples": [
      {
        "translation": "Tôi thật sự chịu không nổi cậu nữa rồi, rốt cuộc cậu còn muốn đi dạo bao lâu nữa hả?"
      }
    ]
  },
  "zh_接着V_385": {
    "title": "接着 + Động từ (Phó từ: Tiếp tục làm gì / Kế tiếp / Làm tiếp)",
    "shortExplanation": "Phó từ đứng trước động từ để biểu thị hành động tiếp diễn nối tiếp theo sau một hành động khác hoặc tiếp tục phần việc chưa hoàn tất; 'tiếp tục', 'làm tiếp'.",
    "longExplanation": "'接着' (jiēzhe) đóng vai trò là phó từ đứng trước động từ, biểu thị sự tiếp nối hành động. Cấu trúc này dùng để diễn đạt việc một chủ thể tiếp tục làm nốt phần việc dở dang, hoặc một hành động mới được triển khai nối tiếp ngay sau khi hành động trước vừa kết thúc (ví dụ: '接着说' - nói tiếp, '接着干' - làm tiếp, '你先吃，我接着写' - bạn ăn trước đi, tôi viết tiếp đã, '接着看' - xem tiếp/đọc tiếp). Nó nhấn mạnh tính liên tục, không đứt đoạn của dòng sự việc. Tương đương với 'tiếp tục...', 'làm tiếp', 'kế tiếp' trong tiếng Việt.",
    "formation": "Chủ ngữ + 接着 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Cậu đọc xong cuốn sách này thì trước tiên đừng vội trả nhé, tôi sẽ đọc tiếp."
      }
    ]
  },
  "zh_接着_386": {
    "title": "接着…… (Liên từ nối: Tiếp đó / Sau đó / Liền sau đó)",
    "shortExplanation": "Liên từ dùng ở đầu phân câu sau để nối tiếp dòng thời gian hoặc thứ tự diễn biến của sự việc; 'tiếp đó', 'sau đó', 'ngay sau đó'.",
    "longExplanation": "'接着' (jiēzhe) đóng vai trò là liên từ nối giữa hai phân câu, tương đương với '然后' (sau đó) hoặc '紧接着' (ngay tiếp đó). Từ này dùng để chỉ một sự việc, hành động mới phát sinh hoặc diễn ra nối tiếp ngay sau khi sự việc ở phân câu trước đã xảy ra theo đúng trình tự thời gian (ví dụ: '吃了晚饭，接着去散步' - ăn tối xong, tiếp đó đi dạo; '会议开完了，接着安排考察' - cuộc họp kết thúc, sau đó liền sắp xếp đi khảo sát). Thường phối hợp với phó từ '又', '就' ở phân câu sau để nhấn mạnh tính nhịp nhàng, liền mạch. Tương đương với 'tiếp đó', 'sau đó', 'kế tiếp' trong tiếng Việt.",
    "formation": "Phân câu 1，接着 (+ Chủ ngữ) (+ 又 / 就) + Phân câu 2",
    "examples": [
      {
        "translation": "Sau khi tốt nghiệp anh ấy làm việc ở quê một năm, tiếp đó lại thi đỗ vào Đại học Bắc Kinh để học thạc sĩ."
      }
    ]
  },
  "zh_除此以外_387": {
    "title": "除此以外 (Cụm liên từ: Ngoài điều này ra / Trừ cái đó ra / Bên cạnh đó)",
    "shortExplanation": "Cụm từ cố định đứng ở đầu phân câu để loại trừ sự việc vừa nêu hoặc bổ sung thêm thông tin khác; 'ngoài điều này ra', 'trừ cái đó ra'.",
    "longExplanation": "'除此以外' (chú cǐ yǐwài) (đồng nghĩa với '除此之外') là cụm liên từ/giới từ cố định thường đứng ở đầu phân câu thứ hai. '此' (cǐ) đại diện cho tình huống, sự việc hoặc đặc điểm vừa được đề cập ở câu trước. Cụm từ này có hai hướng sử dụng: một là loại trừ (loại bỏ điểm vừa nêu ra, ngoài nó ra thì không còn gì khác, thường kết hợp với '再也/几乎没...'); hai là bổ sung (bên cạnh điều này thì còn có thêm các yếu tố khác, thường đi với '还/也...'). Tương đương với 'ngoài điều này ra', 'trừ việc đó ra', 'bên cạnh đó' trong tiếng Việt.",
    "formation": "Tiền đề / Câu 1，(但 / 而且 +) 除此以外 (+ Chủ ngữ) + Phân câu loại trừ hoặc bổ sung",
    "examples": [
      {
        "translation": "Anh ấy và em trai sinh cùng ngày, hai anh em trông rất giống nhau, nhưng ngoài điều đó ra thì hầu như chẳng tìm thấy điểm chung nào khác nữa."
      }
    ]
  },
  "zh_把N1叫作N2_388": {
    "title": "把 + Danh từ 1 + 叫作 + Danh từ 2 (Câu chữ 把: Gọi danh từ 1 là danh từ 2 / Đặt tên là)",
    "shortExplanation": "Cấu trúc câu chữ 把 biểu thị việc xưng hô, gọi tên hoặc định danh cho một sự vật, đối tượng; 'gọi... là...'.",
    "longExplanation": "Cấu trúc '把 + Danh từ 1 + 叫作 + Danh từ 2' là một biến thể phổ biến của câu chữ '把' (bǎ) kết hợp với động từ kép '叫作' (gọi là, xem như là). Trong đó, 'Danh từ 1' là đối tượng được đề cập, còn 'Danh từ 2' là tên gọi, danh xưng, biệt hiệu hoặc ẩn dụ được gán cho đối tượng đó (ví dụ: '把这种现象叫作内卷' - gọi hiện tượng này là nội quyển, '把黄河叫作母亲河' - gọi sông Hoàng Hà là sông mẹ). Cấu trúc này dùng để diễn đạt việc quy ước tên gọi, cách gọi thân mật hoặc định nghĩa mang tính văn hóa/khoa học. Tương đương với 'gọi... là...', 'coi... như là...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 把 + Danh từ 1 + 叫作 + Danh từ 2 (Tên gọi / Danh hiệu / Biệt danh)",
    "examples": [
      {
        "translation": "Người Trung Quốc gọi sông Hoàng Hà là \"Dòng sông Mẹ\"."
      }
    ]
  },
  "zh_无论不管Q都_389": {
    "title": "(无论 / 不管) + Từ để hỏi + 都…… (Liên từ vô điều kiện: Cho dù... đều / Bất kể... cũng)",
    "shortExplanation": "Liên từ vô điều kiện kết hợp với đại từ nghi vấn (ai, cái gì, ở đâu...) và phó từ '都' để biểu thị trong bất kỳ tình huống nào kết quả vẫn không thay đổi; 'cho dù... đều...'.",
    "longExplanation": "Cấu trúc '(无论/不管) + Từ để hỏi + 都' là mẫu câu biểu thị điều kiện vô điều kiện rất phổ biến. Trong đó, '不管' mang khẩu ngữ gần gũi, còn '无论' mang sắc thái trang trọng, văn viết hơn. Sau '无论/不管' bắt buộc phải là một đại từ nghi vấn (như 谁 - ai, 什么 - cái gì, 怎么 - thế nào, 哪儿 - đâu, 什么时候 - khi nào...) hoặc hình thức lựa chọn. Phân câu chính dùng phó từ '都' (hoặc '也') để khẳng định rằng dù điều kiện giả định có biến đổi thế nào thì kết quả, quy luật hoặc thái độ vẫn hoàn toàn như nhau, không có ngoại lệ (ví dụ: '无论谁都……' - bất kể là ai cũng..., '不管去哪儿我都陪你' - dù đi đâu tôi cũng đi cùng cậu). Tương đương với 'cho dù... đều...', 'bất kể... cũng...' trong tiếng Việt.",
    "formation": "(无论 / 不管) + Từ để hỏi (谁 / 什么 / 哪儿 / 怎么...) + (Chủ ngữ +) 都 / 也 + Vị ngữ",
    "examples": [
      {
        "translation": "Không sao đâu, không cần phải xin lỗi, cho dù là ai thì cũng đều có lúc sơ suất điền sai mà."
      }
    ]
  },
  "zh_V上_390": {
    "title": "Động từ + 上 (Bổ ngữ kết quả / Bổ ngữ khả năng: Được làm gì / Kịp... / Đạt được)",
    "shortExplanation": "Đứng sau động từ để biểu đạt việc đạt được mục đích, nắm bắt được cơ hội hoặc được hưởng thụ một thành quả (thường gặp dạng khả năng 'Động từ + 得上 / 不上'); 'được...', 'kịp...'.",
    "longExplanation": "'上' (shàng) khi làm bổ ngữ kết quả hoặc bổ ngữ khả năng sau động từ mang ý nghĩa đạt được mục tiêu, thỏa mãn nguyện vọng hoặc có cơ hội thụ hưởng một điều kiện tốt (ví dụ: '吃上肉' - được ăn thịt, '考上大学' - thi đỗ đại học, '过上好日子' - có được cuộc sống ấm no). Cực kỳ phổ biến trong kết cấu bổ ngữ khả năng: 'Động từ + 得上' (có cơ hội/kịp để làm gì) và 'Động từ + 不上' (không có cơ hội/không được/không kịp làm gì, như '吃不上' - không được ăn, '赶不上' - không kịp xe, '用不上' - không dùng tới). Tương đương với 'được (hưởng/làm)', 'kịp...', 'đạt được' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ + (得 / 不) + 上 (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Xem ra hôm nay không được ăn sủi cảo thịt cừu rồi."
      }
    ]
  },
  "zh_V出来_391": {
    "title": "Động từ + 出来 (Bổ ngữ xu hướng: Làm ra / Tạo ra / Nhận ra kết quả)",
    "shortExplanation": "Bổ ngữ xu hướng mở rộng biểu thị thông qua động tác mà tạo ra một kết quả, thành phẩm mới hoặc nhận diện, phát hiện ra sự vật; 'ra', 'tạo ra', 'làm ra'.",
    "longExplanation": "'出来' (chūlái) khi làm bổ ngữ xu hướng sau động từ không chỉ mang nghĩa di chuyển từ trong ra ngoài, mà thường được dùng với nghĩa phái sinh trừu tượng. Ý nghĩa nổi bật nhất là biểu thị thông qua hành động, nỗ lực mà sáng tạo ra, sản xuất ra hoặc hoàn thành một thành quả, sự vật mới từ chỗ chưa có đến chỗ có (ví dụ: '做出来' - làm ra, '写出来' - viết ra, '想出来' - nghĩ ra, '研究出来' - nghiên cứu chế tạo ra). Ngoài ra, nó cũng dùng để chỉ việc nhận biết, phát hiện hoặc làm lộ rõ thông tin ẩn giấu (ví dụ: '看出来' - nhìn ra, '听出来' - nghe nhận ra). Tương đương với '... ra', 'tạo ra...', 'làm ra...' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ + (得 / 不) + 出来 (+ Tân ngữ: Thành phẩm / Kết quả / Ý tưởng)",
    "examples": []
  },
  "zh_总的来说_393": {
    "title": "总的来说 (Cụm từ liên kết / Khẩu ngữ dẫn nhập: Nhìn chung mà nói / Nói tóm lại / Tổng quan mà nói)",
    "shortExplanation": "Cụm từ dùng ở đầu câu hoặc trước vị ngữ để tóm tắt, khái quát đánh giá toàn diện về sự vật, sự việc; 'nhìn chung mà nói', 'nói chung'.",
    "longExplanation": "'总的来说' (zǒng de lái shuō) là cụm từ chêm xen (quán ngữ) đóng vai trò trạng ngữ, thường đứng ở đầu câu hoặc giữa chủ ngữ và vị ngữ. Cụm từ này dùng để đưa ra lời kết luận, đánh giá hoặc tóm lược có tính chất bao quát toàn cục về một đối tượng, sự việc hay tình hình nào đó sau khi đã cân nhắc các mặt tốt xấu (ví dụ: '总的来说，这是一次成功的会议' - nhìn chung mà nói, đây là một cuộc họp thành công; '总的来说还算满意' - nói chung vẫn coi là hài lòng). Tương đương với 'nhìn chung mà nói', 'nói tóm lại', 'tổng thể mà xét' trong tiếng Việt.",
    "formation": "(Chủ ngữ +) 总的来说，(+ Chủ ngữ +) Nhận định / Đánh giá tổng quát",
    "examples": [
      {
        "translation": "Công ty này nhìn chung mà nói thì vẫn khá tốt."
      }
    ]
  },
  "zh_在于_394": {
    "title": "在于 (Động từ: Cốt ở / Nằm ở / Quyết định bởi / Chính là ở chỗ)",
    "shortExplanation": "Động từ mang sắc thái văn viết chỉ ra nguyên nhân cốt lõi, bản chất của vấn đề hoặc yếu tố quyết định; 'nằm ở', 'cốt ở chỗ'.",
    "longExplanation": "'在于' (zàiyú) là động từ mang sắc thái trang trọng, văn viết, trong đó '在' mang nghĩa tồn tại và '于' là giới từ biểu thị phương hướng, vị trí hoặc lĩnh vực. Cấu trúc này dùng để chỉ ra mấu chốt, bản chất trọng tâm hoặc điều kiện tiên quyết của một sự việc, quy luật hay triết lý (ví dụ: '生命在于运动' - sự sống cốt ở vận động, '成功的关键在于坚持' - chìa khóa của thành công nằm ở sự kiên trì, '问题的实质在于缺少沟通' - thực chất của vấn đề nằm ở chỗ thiếu sự giao tiếp). Tương đương với 'nằm ở', 'cốt ở', 'chính là ở chỗ', 'tùy thuộc vào' trong tiếng Việt.",
    "formation": "Chủ ngữ (Hiện tượng / Vấn đề / Sự vật) + 在于 + Tân ngữ (Bản chất / Nguyên nhân mấu chốt / Hành động)",
    "examples": [
      {
        "translation": "Người ta thường nói rằng: \"Sự sống cốt ở vận động\"."
      }
    ]
  },
  "zh_V1着V1着V2了_395": {
    "title": "Động từ 1 + 着 + Động từ 1 + 着 + (就) + Động từ 2 + 了 (Đang... thì bỗng nhiên... / Cứ... mãi rồi lại...)",
    "shortExplanation": "Biểu thị trong quá trình hành động 1 diễn ra liên tục hoặc lặp đi lặp lại thì hành động 2 bất ngờ xảy ra hoặc xuất hiện tình huống mới; 'đang... thì...', 'cứ... mãi rồi bỗng...'.",
    "longExplanation": "Cấu trúc 'Động từ 1 + 着 + Động từ 1 + 着 + Động từ 2 + 了' dùng động từ lặp lại kết hợp với trợ từ trạng thái '着' để diễn tả hành động thứ nhất đang diễn ra kéo dài liên tục. Trong quá trình đó, hành động hoặc trạng thái thứ hai (thường là một sự thay đổi ngoài dự kiến hoặc biến chuyển tự nhiên) bất ngờ xuất hiện hoặc phát sinh, phía trước động từ 2 thường đi kèm '就' (ví dụ: '走着走着就迷路了' - đang đi thì bị lạc đường, '听着听着就睡着了' - đang nghe thì ngủ thiếp đi). Tương đương với 'đang... thì bỗng...', 'cứ... mãi rồi lại...', 'mải... đến mức...' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ 1 + 着 + Động từ 1 + 着 + (就) + Động từ 2 + 了",
    "examples": [
      {
        "translation": "Cô ấy đang nói thì bỗng bật cười."
      }
    ]
  },
  "zh_一就_396": {
    "title": "一……就…… (Liên từ nối tiếp: Vừa... liền... / Hễ... là... / Vừa mới... thì đã...)",
    "shortExplanation": "Biểu thị hai hành động xảy ra nối tiếp nhau liên tục trong khoảng thời gian rất ngắn; 'vừa... là...', 'hễ... liền...'.",
    "longExplanation": "Cấu trúc liên từ '一……就……' (yī ... jiù ...) biểu thị sự nối tiếp chặt chẽ và nhanh chóng về mặt thời gian giữa hai sự việc. Khi hành động thứ nhất vừa mới diễn ra hoặc kết thúc thì hành động thứ hai lập tức bắt đầu ngay sau đó. Hai phân câu có thể cùng chung một chủ ngữ hoặc mang hai chủ ngữ khác nhau (khi khác chủ ngữ, chủ ngữ 2 đứng trước '就', ví dụ: '他一叫我，我就出去了' - anh ấy vừa gọi tôi là tôi đi ra ngay). Tương đương với 'vừa... là...', 'vừa mới... thì đã...', 'hễ... là...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 一 + Động từ 1 / Phân câu 1 + 就 + Động từ 2 / Phân câu 2 (khác chủ ngữ: Chủ ngữ 1 + 一 + Động từ 1，Chủ ngữ 2 + 就 + Động từ 2)",
    "examples": [
      {
        "translation": "Cô ấy vừa về đến nhà là xem ti vi ngay."
      }
    ]
  },
  "zh_一就_397": {
    "title": "一……就…… (Điều kiện thường xuyên: Cứ... là... / Hễ... là lại... / Mỗi lần... đều...)",
    "shortExplanation": "Biểu thị tính quy luật, thói quen hoặc hệ quả tất nhiên; cứ mỗi lần điều kiện 1 xảy ra thì kết quả 2 chắc chắn sẽ theo sau; 'cứ... là...', 'hễ... là...'.",
    "longExplanation": "Ngoài ý nghĩa biểu thị hai hành động liên tiếp về thời gian, cấu trúc '一……就……' (yī ... jiù ...) còn thường dùng để biểu thị mối quan hệ điều kiện mang tính quy luật hoặc thói quen lặp đi lặp lại. Cấu trúc này tương đương với '每次只要……就……' (mỗi lần hễ cứ... thì...), nghĩa là cứ hễ điều kiện ở vế trước xuất hiện thì kết quả ở vế sau tất yếu sẽ xảy ra như một phản xạ hoặc quy luật tự nhiên (ví dụ: '他一紧张就出汗' - anh ấy cứ hễ căng thẳng là toát mồ hôi, '我一喝咖啡就失眠' - tôi cứ uống cà phê là mất ngủ). Tương đương với 'cứ... là...', 'hễ... là lại...', 'mỗi lần... đều...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 一 + Động từ 1 / Mệnh đề điều kiện + 就 + Động từ 2 / Mệnh đề kết quả",
    "examples": [
      {
        "translation": "Hồi còn nhỏ, con trai tôi cứ hễ nói chuyện là lại đỏ mặt."
      }
    ]
  },
  "zh_究竟Q_398": {
    "title": "究竟 + Từ để hỏi (Phó từ ngữ khí: Rốt cuộc là... / Cuối cùng thì...)",
    "shortExplanation": "Phó từ ngữ khí dùng trong câu hỏi để gặng hỏi, truy cứu đến cùng chân tướng sự việc; 'rốt cuộc là...', 'cuối cùng thì...'.",
    "longExplanation": "'究竟' (jiūjìng) là phó từ ngữ khí thường đứng trước chủ ngữ hoặc trước vị ngữ trong câu chứa từ để hỏi (như 什么, 谁, 哪儿, 哪个, 怎么, 为什么...) hoặc câu hỏi lựa chọn. Cấu trúc này dùng để nhấn mạnh sự truy cứu, gặng hỏi đến cùng bản chất, sự thật hoặc mong muốn có được một câu trả lời chính xác, rõ ràng trước một vấn đề còn mơ hồ, chưa ngã ngũ (ví dụ: '你究竟想干什么？' - Rốt cuộc cậu muốn làm gì?, '究竟谁赢了？' - Cuối cùng thì ai đã thắng?). Sắc thái trang trọng và văn viết hơn một chút so với '到底'. Tương đương với 'rốt cuộc là', 'cuối cùng thì', 'thực ra là' trong tiếng Việt.",
    "formation": "(Chủ ngữ +) 究竟 (+ Chủ ngữ +) Từ để hỏi (谁 / 什么 / 哪 / 怎么...) (+ Mệnh đề nghi vấn + Trợ từ ngữ khí)",
    "examples": [
      {
        "translation": "Rốt cuộc thì đi du lịch vào mùa nào là tương đối tốt nhỉ?"
      }
    ]
  },
  "zh_V起来_399": {
    "title": "Động từ + 起(来) (Bổ ngữ xu hướng: Hướng lên trên / Nâng lên / Nhấc lên / Đứng dậy)",
    "shortExplanation": "Bổ ngữ xu hướng biểu thị động tác có chiều hướng chuyển động từ dưới lên trên; 'lên', 'nhấc lên', 'cầm lên'.",
    "longExplanation": "'起' hoặc '起来' (qǐ / qǐlái) khi làm bổ ngữ xu hướng sau động từ mang ý nghĩa không gian thực tế, biểu thị động tác làm cho người hoặc vật chuyển động từ vị trí thấp hướng lên vị trí cao hơn (ngược nghĩa với '下来'). Thường kết hợp với các động từ hành động như '拿' (cầm/nhấc), '抬' (khiêng), '举' (giơ), '站' (đứng), '抱' (bế/ôm)... Khi có tân ngữ chỉ vật, tân ngữ thường có thể chen vào giữa: 'Động từ + 起 + Tân ngữ + 来' hoặc đặt sau '把' (ví dụ: '把箱子抬起来' - khiêng chiếc hòm lên, '拿起书来' - cầm quyển sách lên). Tương đương với '... lên', 'nhấc lên', 'cầm lên', 'đứng dậy' trong tiếng Việt.",
    "formation": "Chủ ngữ + (把 + Tân ngữ +) Động từ + 起(来) (hoặc: Động từ + 起 + Tân ngữ + 来)",
    "examples": [
      {
        "translation": "Bạn hãy cầm những đồ vật trên bàn lên trước đi, tôi lau xong rồi bạn hẵng đặt xuống."
      }
    ]
  },
  "zh_V起来_400": {
    "title": "Động từ / Tính từ + 起来 (Bổ ngữ xu hướng mở rộng: Bắt đầu làm gì và tiếp diễn)",
    "shortExplanation": "Biểu thị hành động hoặc trạng thái bắt đầu diễn ra và có xu hướng tiếp tục phát triển; 'bắt đầu... lên', 'nổi lên'.",
    "longExplanation": "'起来' (qǐlai) khi dùng làm bổ ngữ xu hướng mở rộng sau động từ hoặc tính từ mang ý nghĩa biểu thị sự khởi đầu và tiếp diễn. Nó chỉ rõ một hành động hoặc trạng thái mới bắt đầu xuất hiện và sẽ tiếp tục phát triển theo đà đó (ví dụ: '唱起来' - bắt đầu hát lên, '哭起来' - òa khóc lên, '热闹起来' - trở nên nhộn nhịp, '笑起来' - bật cười lên). Nếu động từ mang tân ngữ, tân ngữ thường đứng xen vào giữa: 'Động từ + 起 + Tân ngữ + 来' (ví dụ: '说起话来' - bắt đầu trò chuyện, '下起雨来' - bắt đầu đổ mưa). Tương đương với 'bắt đầu... lên', 'nổi lên', 'bật... lên' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ + 起来 + 了 (mang tân ngữ: Động từ + 起 + Tân ngữ + 来)",
    "examples": [
      {
        "translation": "Tiểu Vương lại bắt đầu hát lên rồi."
      }
    ]
  },
  "zh_V起来_401": {
    "title": "Động từ tri giác + 起来 (Đánh giá cảm nhận: Nghe có vẻ / Trông có vẻ / Xem ra / Cảm thấy)",
    "shortExplanation": "Đứng sau động từ tri giác (như 听, 看, 想, 尝...) để biểu thị sự đánh giá, cảm nhận từ một góc độ nhất định; 'nghe có vẻ', 'trông có vẻ'.",
    "longExplanation": "'起来' (qǐlai) đứng sau các động từ tri giác hoặc nhận thức (như '看' - nhìn, '听' - nghe, '尝' - nếm, '闻' - ngửi, '摸' - sờ, '想' - nghĩ, '做' - làm...) để đưa ra lời phán đoán, nhận xét hoặc cảm nhận chủ quan của người nói khi tiếp cận sự vật từ góc độ hành động đó (ví dụ: '看起来很年轻' - trông có vẻ rất trẻ, '尝起来很甜' - nếm vào thấy rất ngọt, '做起来不容易' - làm thì mới thấy không dễ). Tương đương với 'nghe có vẻ', 'trông có vẻ', 'nếm thử thì', 'xem ra' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ (看 / 听 / 尝 / 闻 / 想 / 做...) + 起来 + Tính từ / Cụm nhận xét (像……一样 / 很……)",
    "examples": [
      {
        "translation": "Tiếng Thượng Hải nghe như thể là tiếng nước ngoài vậy."
      }
    ]
  },
  "zh_说起O_402": {
    "title": "说起 + Tân ngữ (Cụm động từ dẫn nhập chủ đề: Nhắc đến... / Nói đến... / Bàn về...)",
    "shortExplanation": "Đứng ở đầu câu để gợi mở hoặc dẫn nhập một chủ đề thảo luận; 'nhắc đến...', 'nói đến...', 'bàn về...'.",
    "longExplanation": "'说起' (shuōqǐ) là cụm động từ thường đứng ở đầu câu hoặc đầu phân câu, phía sau đi kèm một danh từ, cụm danh từ hoặc tân ngữ chỉ chủ đề. Cấu trúc này dùng để khơi gợi, chuyển hướng câu chuyện hoặc nhắc đến một chủ đề, đối tượng mà người nói muốn tập trung đàm luận hay chia sẻ cảm nghĩ, kỷ niệm (ví dụ: '说起这件事' - nhắc đến chuyện này, '说起他' - nói đến anh ấy, '说起童年' - nhắc đến thời thơ ấu). Tương đương với 'nói đến', 'nhắc đến', 'bàn về', 'kể về' trong tiếng Việt.",
    "formation": "说起 + Tân ngữ / Danh từ (chủ đề)，Phân câu nhận xét / đàm luận",
    "examples": [
      {
        "translation": "Nhắc đến đồ ăn, món ăn để lại ấn tượng sâu sắc nhất cho tôi chính là món Hồ Nam."
      }
    ]
  },
  "zh_如何_403": {
    "title": "如何 (Đại từ nghi vấn cách thức: Làm sao / Thế nào / Như thế nào)",
    "shortExplanation": "Đại từ nghi vấn (mang sắc thái trang trọng, văn viết) đứng trước động từ để hỏi về phương thức, cách thức thực hiện; 'như thế nào', 'làm sao'.",
    "longExplanation": "'如何' (rúhé) là đại từ nghi vấn thuộc phong cách trang trọng hoặc văn viết, tương đương với '怎么' hoặc '怎样' trong khẩu ngữ. Khi đứng trước động từ hoặc tính từ, nó dùng để hỏi hoặc diễn đạt phương thức, phương pháp tiến hành hành động ('làm thế nào để...'), hoặc cách thức biểu hiện của một trạng thái ('yêu thương nhau như thế nào', 'giải quyết thế nào', 'đối phó ra sao'). Thường xuất hiện trong các bài viết, tin tức, phỏng vấn hoặc diễn đạt trang nhã. Tương đương với 'như thế nào', 'làm sao', 'ra sao' trong tiếng Việt.",
    "formation": "Chủ ngữ + (是 +) 如何 + Động từ (+ Tân ngữ) (+ 的)",
    "examples": [
      {
        "translation": "Ban giám khảo bảo cặp vợ chồng đầu tiên chia sẻ xem hai người họ đã yêu thương mặn nồng với nhau như thế nào."
      }
    ]
  },
  "zh_如何_404": {
    "title": "Danh từ / Mệnh đề + 如何？ (Đại từ nghi vấn vị ngữ: Như thế nào? / Ra sao?)",
    "shortExplanation": "Đứng ở cuối câu hoặc làm vị ngữ để hỏi về tình hình, trạng thái, kết quả hoặc ý kiến; 'như thế nào?', 'ra sao?'.",
    "longExplanation": "'如何' (rúhé) khi đứng làm vị ngữ (thường đặt ở cuối câu hoặc cuối phân câu) tương đương với '怎么样' trong khẩu ngữ. Cấu trúc này dùng để hỏi thăm, tìm hiểu về tình hình, tiến độ, tính chất, kết quả hoặc trưng cầu ý kiến về một đối tượng, sự việc nào đó (ví dụ: '近况如何？' - tình hình gần đây thế nào?, '效果如何？' - hiệu quả ra sao?, '你意下如何？' - ý của bạn thế nào?). Mang sắc thái trang trọng, nhã nhặn, thường dùng trong báo cáo, khảo sát, giao tiếp công việc. Tương đương với 'thế nào?', 'ra sao?', 'như thế nào?' trong tiếng Việt.",
    "formation": "Chủ ngữ (Tình hình / Kết quả / Đối tượng) + 如何？",
    "examples": [
      {
        "translation": "Tình hình thu nhập hằng tháng của thế hệ '8x' như thế nào?"
      }
    ]
  },
  "zh_怎么_405": {
    "title": "怎么，…… (Thán từ / Đại từ biểu thị ngạc nhiên: Sao cơ, ...?! / Thế nào, ...?!)",
    "shortExplanation": "Đứng độc lập ở đầu câu để biểu thị sự bất ngờ, ngạc nhiên, kinh ngạc hoặc không thể tin nổi trước một tình huống; 'sao cơ?!', 'thế nào?!'.",
    "longExplanation": "'怎么' (zěnme) khi đứng độc lập ở đầu câu và thường có dấu phẩy ngắt quãng đóng vai trò như một thán từ hoặc ngữ khí biểu thị sự ngạc nhiên cao độ. Nó diễn tả tâm trạng sững sờ, kinh ngạc, khó hiểu hoặc khó tin trước một sự việc bất ngờ xảy ra trái với dự đoán thông thường của người nói (ví dụ: '怎么，你还没走？' - Sao cơ, cậu vẫn chưa đi à?!, '怎么，你不答应？' - Sao, cậu không đồng ý ư?!). Tương đương với 'sao cơ?!', 'sao thế?!', 'thế nào?!', 'cái gì cơ?!' trong tiếng Việt.",
    "formation": "怎么，Phân câu biểu thị sự bất ngờ / thắc mắc (?!)",
    "examples": [
      {
        "translation": "Sao cơ, cậu không nhận ra tôi nữa rồi à?!"
      }
    ]
  },
  "zh_靠_406": {
    "title": "靠 (Động từ tư thế: Tựa vào / Tựa lưng / Dựa vào)",
    "shortExplanation": "Động từ biểu thị tư thế cơ thể hoặc vật thể tựa sát, nghiêng và dựa trọng lực vào một điểm tựa; 'tựa', 'dựa vào'.",
    "longExplanation": "'靠' (kào) là động từ tư thế biểu thị hành động nghiêng hoặc dồn một phần trọng lượng cơ thể/đồ vật tựa vào một điểm tựa vững chắc (như tường, bàn, ghế, cây cối...). Thường đi kèm với trợ từ trạng thái '着' hoặc giới từ '在' (ví dụ: '靠着墙' - tựa vào tường, '靠在椅子上' - dựa vào ghế, '背靠着背' - lưng tựa lưng). Tương đương với 'tựa', 'dựa', 'ngả lưng vào' trong tiếng Việt.",
    "formation": "Chủ ngữ + 靠着 / 靠在 + Điểm tựa (桌子 / 墙 / 沙发...) (+ Động từ 2)",
    "examples": [
      {
        "translation": "Thầy Vương thích tựa vào bàn để giảng bài."
      }
    ]
  },
  "zh_靠_407": {
    "title": "靠 + Danh từ nơi chốn / Vị trí (Động từ vị trí: Gần / Cạnh / Sát / Hướng về)",
    "shortExplanation": "Đứng trước danh từ chỉ vị trí, phương hướng để biểu thị sự tiếp giáp, nằm sát hoặc gần kề một vị trí; 'gần', 'cạnh', 'sát'.",
    "longExplanation": "'靠' (kào) còn có nghĩa là tiếp cận, nằm sát hoặc tiếp giáp về mặt không gian với một vị trí, phương hướng hoặc mốc địa lý nào đó. Thường kết hợp trực tiếp với danh từ nơi chốn để tạo thành định ngữ hoặc trạng ngữ (ví dụ: '靠窗' - sát cửa sổ/cạnh cửa sổ, '靠门' - gần cửa ra vào, '靠海' - gần biển, '靠北' - lệch về phía bắc, '靠右走' - đi nép về bên phải). Tương đương với 'gần', 'cạnh', 'sát', 'áp sát' trong tiếng Việt.",
    "formation": "靠 + Danh từ vị trí / Phương hướng (窗 / 门 / 墙 / 海 / 右...) (+ 的 + Danh từ)",
    "examples": [
      {
        "translation": "Chỗ ngồi của tôi là số 17, là ghế cạnh cửa sổ."
      }
    ]
  },
  "zh_靠_408": {
    "title": "靠 (Động từ trừu tượng: Dựa vào / Nhờ vào / Trông cậy vào)",
    "shortExplanation": "Biểu thị sự nương tựa, nhờ cậy hoặc dựa vào ai đó, sức lực, trí tuệ để sinh tồn hoặc đạt được mục đích; 'dựa vào', 'nhờ vào'.",
    "longExplanation": "'靠' (kào) mang nghĩa trừu tượng là nương tựa, dựa dẫm hoặc cậy nhờ vào sự giúp đỡ của người khác, hoặc dựa vào nỗ lực, kỹ năng, trí tuệ của chính bản thân để sinh sống, giải quyết khó khăn hay thực hiện mục tiêu (ví dụ: '靠自己' - dựa vào chính mình, '靠打工维持生活' - dựa vào làm thêm để trang trải cuộc sống, '全靠大家帮忙' - đều nhờ cậy mọi người giúp đỡ). Câu tục ngữ nổi tiếng '在家靠父母，出门靠朋友' (ở nhà dựa cha mẹ, ra đường nhờ bạn bè) phản ánh sâu sắc cách dùng này. Tương đương với 'dựa vào', 'nhờ vào', 'trông cậy vào' trong tiếng Việt.",
    "formation": "Chủ ngữ + 靠 + Danh từ / Đại từ (người / phương tiện / năng lực) (+ Động từ)",
    "examples": [
      {
        "translation": "Ở nhà nhờ cha mẹ, ra ngoài cậy bạn bè."
      }
    ]
  },
  "zh_居然_409": {
    "title": "居然 (Phó từ ngữ khí: Lại có thể... / Không ngờ lại... / Thế mà...)",
    "shortExplanation": "Phó từ biểu thị sự bất ngờ, ngạc nhiên trước một sự việc xảy ra ngoài dự liệu hoặc trái với lẽ thường; 'lại', 'thế mà', 'không ngờ'.",
    "longExplanation": "'居然' (jūrán) là phó từ ngữ khí đứng trước động từ hoặc tính từ, biểu thị một sự việc hoặc kết quả xuất hiện hoàn toàn ngoài dự tính, trái ngược với phán đoán hoặc lẽ thường. Nó thường mang sắc thái kinh ngạc, sửng sốt, không ngờ tới, hoặc đôi khi hàm chứa sự trách móc, tiếc nuối hay thán phục tùy theo ngữ cảnh (ví dụ: '这么难的考试他居然通过了' - kỳ thi khó thế mà anh ấy lại đỗ, '他居然骗我' - anh ta không ngờ lại dám lừa tôi). Ý nghĩa và cách dùng tương tự như '竟然'. Tương đương với 'lại có thể', 'không ngờ lại', 'thế mà' trong tiếng Việt.",
    "formation": "Chủ ngữ + 居然 + (也 / 都) + Động từ / Tính từ",
    "examples": [
      {
        "translation": "Câu hỏi đơn giản như thế này mà cậu lại cũng không biết làm ư?"
      }
    ]
  },
  "zh_以来_410": {
    "title": "……以来 (Danh từ thời gian / Mệnh đề + 以来: Kể từ... đến nay / Từ khi... trở lại đây)",
    "shortExplanation": "Đứng sau mốc thời gian, sự kiện hoặc mệnh đề để biểu thị khoảng thời gian liên tục từ một thời điểm trong quá khứ kéo dài cho tới hiện tại hoặc tới thời điểm đang xét; 'kể từ... đến nay', 'từ khi...'.",
    "longExplanation": "'以来' (yǐlái) là từ chỉ thời gian thường đứng sau danh từ thời gian, cụm từ chỉ sự kiện lịch sử, động từ hoặc phân câu miêu tả một mốc thời gian bắt đầu trong quá khứ. Cấu trúc này dùng để diễn đạt toàn bộ khoảng thời gian liên tục tính từ mốc đó kéo dài cho tới tận thời điểm hiện tại (hoặc mốc thời gian mà người nói đang đề cập), nhấn mạnh những thay đổi, phát triển hoặc tình trạng diễn ra trong suốt quá trình đó (ví dụ: '长期以来' - từ lâu đến nay, '自古以来' - từ xưa đến nay, '毕业以来' - kể từ khi tốt nghiệp đến nay). Tương đương với 'kể từ... đến nay', 'từ khi... trở lại đây' trong tiếng Việt.",
    "formation": "Mốc thời gian / Danh từ sự kiện / Động từ / Mệnh đề + 以来，Mệnh đề kết quả / biến chuyển",
    "examples": [
      {
        "translation": "Kể từ khi cải cách mở cửa đến nay, Trung Quốc đã diễn ra những thay đổi to lớn."
      }
    ]
  },
  "zh_临_411": {
    "title": "临 + Danh từ nơi chốn (Động từ vị trí: Giáp / Kề sát / Hướng ra / Nằm sát)",
    "shortExplanation": "Động từ vị trí biểu thị việc ở sát bên, giáp ranh hoặc quay mặt, hướng thẳng ra đường xá, bờ sông, mặt biển; 'giáp', 'kề sát', 'hướng ra'.",
    "longExplanation": "'临' (lín) khi dùng làm động từ vị trí mang ý nghĩa là kề sát, tiếp giáp, áp sát hoặc quay mặt hướng về một không gian, tuyến đường, nguồn nước nào đó (như đường phố, sông ngòi, biển cả...). Cụm '临 + Danh từ nơi chốn' thường làm định ngữ (thường có '的') để định vị nhà cửa, phòng ốc hoặc làm vị ngữ (ví dụ: '临街' - giáp mặt đường, '临水' - giáp bờ nước, '临海' - hướng ra biển, '临窗' - bên cạnh cửa sổ). Tương đương với 'giáp', 'sát', 'kề sát', 'hướng ra' trong tiếng Việt.",
    "formation": "临 + Danh từ nơi chốn / Không gian (街 / 水 / 海 / 河...) (+ 的 + Danh từ)",
    "examples": [
      {
        "translation": "Tôi muốn mua một căn nhà không giáp mặt đường, như vậy sẽ không quá ồn ào."
      }
    ]
  },
  "zh_临_412": {
    "title": "临 + Động từ (Giới từ / Động từ thời gian: Ngay trước khi... / Sắp sửa... / Đến lúc...)",
    "shortExplanation": "Biểu thị thời điểm ngay trước khi một hành động sắp sửa bắt đầu hoặc khi chuẩn bị xảy ra một sự việc; 'ngay trước khi', 'sắp sửa', 'đến lúc'.",
    "longExplanation": "'临' (lín) khi dùng chỉ thời gian đóng vai trò như một giới từ hoặc động từ có tính liên kết thời gian, mang ý nghĩa là ngay sát thời điểm, sắp sửa hoặc vừa đúng lúc chuẩn bị thực hiện một hành vi nào đó (tương đương với '快要' hoặc '到……的时候'). Thường kết hợp trực tiếp với các động từ đơn hoặc cụm từ chỉ hành động (như 走, 睡, 考, 出发, 毕业, 别...) và thường đi kèm với danh từ chỉ thời gian (như 那天, 之前, 之际, 时) tạo thành trạng ngữ chỉ thời gian cho câu (ví dụ: '临睡前' - trước lúc đi ngủ, '临走' - ngay trước khi đi, '临考' - trước lúc thi). Tương đương với 'ngay trước khi', 'sắp sửa', 'đến lúc' trong tiếng Việt.",
    "formation": "临 + Động từ (走 / 睡 / 考 / 出发...) (+ Danh từ thời gian / 时 / 的时候)，Chủ ngữ + Vị ngữ",
    "examples": [
      {
        "translation": "Vào ngày sắp sửa rời đi, cha đã từ quê vội vã lên tiễn chúng tôi."
      }
    ]
  },
  "zh_立刻_413": {
    "title": "立刻 (Phó từ thời gian: Ngay lập tức / Tức khắc / Liền / Ngay)",
    "shortExplanation": "Phó từ đứng trước động từ hoặc tính từ, biểu thị hành động hoặc phản ứng xảy ra ngay tức thì không chút chần chừ; 'ngay lập tức', 'tức khắc'.",
    "longExplanation": "'立刻' (lìkè) là phó từ chỉ thời gian đứng trước vị ngữ, dùng để diễn tả một hành động, sự chuyển biến hoặc phản ứng tâm lý phát sinh ngay tức khắc, không có bất kỳ sự chậm trễ hay ngắt quãng nào giữa sự việc trước và sự việc sau (tương đương với '马上'). Thường dùng trong cả văn phong nói lẫn viết trang trọng, nhấn mạnh tính dứt khoát, kịp thời và tức thì của sự việc (ví dụ: '立刻出发' - lập tức xuất phát, '立刻回答' - trả lời ngay lập tức, '立刻停止' - lập tức dừng lại). Tương đương với 'ngay lập tức', 'tức khắc', 'ngay tức thì', 'liền' trong tiếng Việt.",
    "formation": "Chủ ngữ + (Thời gian / Mệnh đề điều kiện +) 立刻 + Động từ / Tính từ",
    "examples": [
      {
        "translation": "Khi chúng tôi trở về, ngay lập tức cảm nhận được sự ấm áp của gia đình."
      }
    ]
  },
  "zh_包括_414": {
    "title": "包括 (Động từ: Bao gồm / Gồm có / Tính cả)",
    "shortExplanation": "Động từ biểu thị việc chứa đựng, dung nạp các bộ phận, thành phần hoặc đối tượng cụ thể trong một tổng thể hay phạm vi nhất định; 'bao gồm', 'gồm có'.",
    "longExplanation": "'包括' (bāokuò) là động từ ngoại động tác, dùng để chỉ một tổng thể, phạm vi, tập hợp lớn bao hàm hoặc dung nạp các thành phần cấu thành, yếu tố con hoặc đối tượng cụ thể bên trong. Phía sau '包括' thường là danh sách liệt kê các thành phần hoặc một danh từ đại diện cho các yếu tố thuộc phạm trù đó (ví dụ: '费用包括水电费' - chi phí bao gồm cả tiền điện nước, '包括我在内' - bao gồm cả tôi trong đó). Cần phân biệt với '包含' (bao hàm - thường dùng cho ý nghĩa trừu tượng, tư tưởng bên trong). Tương đương với 'bao gồm', 'gồm có', 'kể cả' trong tiếng Việt.",
    "formation": "Chủ ngữ (Tổng thể / Phạm vi) + 包括 + Tân ngữ (Các thành phần liệt kê / Đối tượng cụ thể)",
    "examples": [
      {
        "translation": "Giảng dạy kỹ năng tiếng Trung bao gồm bốn phương diện: nghe, nói, đọc, viết."
      }
    ]
  },
  "zh_各自_415": {
    "title": "各自 (Đại từ: Mỗi người tự... / Ai nấy... / Tự mình / Riêng phần mình)",
    "shortExplanation": "Đại từ chỉ định biểu thị từng cá nhân hoặc mỗi bên trong tập thể tự chịu trách nhiệm, hành động độc lập theo cách của mình; 'mỗi người tự', 'ai nấy'.",
    "longExplanation": "'各自' (gèzì) là đại từ biểu thị bản thân từng người hoặc từng phương diện trong một tập thể, một nhóm nhiều đối tượng. Cấu trúc này thường đứng trước động từ làm trạng ngữ (với nghĩa 'ai nấy tự làm việc của mình') hoặc đứng trước danh từ làm định ngữ (thường có '的', với nghĩa 'của riêng mỗi người') (ví dụ: '各自回家' - ai nấy tự về nhà mình, '各自表达不同的看法' - mỗi bên tự bày tỏ quan điểm riêng, '各自的特点' - đặc điểm riêng của mỗi cái). Nhấn mạnh tính độc lập, riêng rẽ của từng thành viên trong số đông. Tương đương với 'mỗi người tự', 'ai nấy', 'từng người', 'riêng phần mình' trong tiếng Việt.",
    "formation": "Chủ ngữ (Tập thể / Số nhiều) + 各自 + Động từ (+ Tân ngữ) / (+ 的 + Danh từ)",
    "examples": [
      {
        "translation": "Đã đến giờ nghỉ giữa hiệp, các cầu thủ hai đội đều tự ai nấy về khu vực ngoài sân để nghỉ ngơi."
      }
    ]
  },
  "zh_勿_416": {
    "title": "(请)勿 + Động từ (Phó từ phủ định / nghiêm cấm: Chớ / Đừng / Xin đừng / Không được)",
    "shortExplanation": "Phó từ phủ định mang sắc thái trang trọng, văn viết, dùng để khuyên can, cấm đoán hoặc yêu cầu không được làm một việc gì đó; 'xin đừng', 'chớ', 'không được'.",
    "longExplanation": "'勿' (wù) là phó từ mang phong cách văn viết trang trọng, cổ kính, tương đương với '不要' (đừng) hoặc '别' (chớ) trong khẩu ngữ. Từ này đứng trước động từ hoặc cụm động từ, thường dùng trong các thông báo chính thức, quy định công cộng, bảng cảnh báo, khẩu hiệu pháp lý để khuyên răn, nhắc nhở hoặc nghiêm cấm mọi người không được tiến hành một hành vi cụ thể (thường đi kèm với từ lịch sự '请' thành '请勿' - xin đừng, xin miễn) (ví dụ: '请勿吸烟' - xin đừng hút thuốc, '切勿轻信' - tuyệt đối chớ nhẹ dạ cả tin, '闲人勿入' - người không phận sự miễn vào). Tương đương với 'đừng', 'chớ', 'xin đừng', 'miễn' trong tiếng Việt.",
    "formation": "(请 +) 勿 + Động từ (+ Tân ngữ / Bổ ngữ)",
    "examples": [
      {
        "translation": "Không phận sự miễn vào (Người không có nhiệm vụ, xin đừng vào trong)."
      }
    ]
  },
  "zh_时刻_417": {
    "title": "时刻 (Danh từ: Thời khắc / Khoảnh khắc / Giờ phút quan trọng)",
    "shortExplanation": "Danh từ chỉ một thời điểm cụ thể, đặc biệt là giai đoạn, thời khắc then chốt mang ý nghĩa quan trọng, bước ngoặt; 'thời khắc', 'khoảnh khắc', 'giờ phút'.",
    "longExplanation": "'时刻' (shíkè) khi làm danh từ dùng để chỉ một điểm mốc thời gian cụ thể hoặc một khoảnh khắc có ý nghĩa đặc biệt quan trọng, tính chất quyết định trong tiến trình diễn biến của sự việc. Cụm từ thường được bổ nghĩa bởi các tính từ như '最后' (cuối cùng), '关键' (then chốt), '历史' (lịch sử), '紧急' (khẩn cấp), '幸福' (hạnh phúc)... (ví dụ: '关键时刻' - thời khắc then chốt/giờ phút quyết định, '紧急时刻' - lúc khẩn cấp, '历史时刻' - thời khắc lịch sử). Tương đương với 'thời khắc', 'khoảnh khắc', 'giờ phút', 'thời điểm' trong tiếng Việt.",
    "formation": "(在 +) Định ngữ (最后 / 关键 / 历史 / 紧要...) + 时刻",
    "examples": [
      {
        "translation": "Vào khoảnh khắc cuối cùng, anh ấy đã sút vào bàn thắng quyết định cho đội nhà."
      }
    ]
  },
  "zh_时刻时时刻刻_418": {
    "title": "时刻 / 时时刻刻 (Phó từ trạng thái: Luôn luôn / Mọi lúc mọi nơi / Lúc nào cũng / Từng giờ từng phút)",
    "shortExplanation": "Phó từ đứng trước vị ngữ, biểu thị hành động hoặc trạng thái diễn ra liên tục, thường trực, không ngừng nghỉ một giây phút nào; 'luôn luôn', 'lúc nào cũng'.",
    "longExplanation": "'时刻' (shíkè) khi đóng vai trò phó từ, hoặc khi được lặp lại dưới dạng AABB là '时时刻刻' (shíshíkèkè), mang ý nghĩa là thường trực, liên tục, mọi lúc mọi nơi, không một phút giây nào lơ là gián đoạn (tương đương với '经常', '每时每刻', '无时无刻'). Cấu trúc này thường đứng trước các động từ tâm lý, nhận thức hoặc hành vi chú ý (như 提醒, 记住, 关注, 准备, 警惕...) để nhấn mạnh tinh thần cảnh giác, ý thức trách nhiệm hoặc sự quan tâm sâu sắc luôn túc trực trong tâm trí (ví dụ: '时刻准备着' - luôn luôn sẵn sàng, '时时刻刻关心大家' - lúc nào cũng quan tâm đến mọi người). Tương đương với 'luôn luôn', 'mọi lúc mọi nơi', 'lúc nào cũng', 'từng giờ từng phút' trong tiếng Việt.",
    "formation": "Chủ ngữ + 时刻 / 时时刻刻 + Động từ / Tính từ",
    "examples": [
      {
        "translation": "Trong công việc, anh ấy lúc nào cũng nhắc nhở bản thân: Sự an toàn của hành khách là điều quan trọng nhất."
      }
    ]
  },
  "zh_至今_419": {
    "title": "至今 (Phó từ / Cụm giới từ: Cho đến nay / Đến tận bây giờ / Cho tới nay)",
    "shortExplanation": "Biểu thị một hành động, trạng thái hoặc sự thật kéo dài từ một mốc thời gian trong quá khứ liên tục cho tới tận thời điểm hiện tại; 'cho đến nay', 'đến tận bây giờ'.",
    "longExplanation": "'至今' (zhìjīn) là từ chỉ thời gian kết hợp giữa giới từ '至' (đến) và danh từ '今' (nay), có nghĩa là 'cho đến hôm nay', 'tới tận bây giờ' (tương đương với '直到现在'). Cấu trúc này thường đứng ở đầu câu làm trạng ngữ hoặc đứng sau chủ ngữ trước vị ngữ. Nó thường đi kèm với các phó từ như '还', '仍', '已经', '未', '没' để nhấn mạnh sự kéo dài, tính bất biến hoặc tình trạng chưa từng thay đổi của sự việc qua một khoảng thời gian dài (ví dụ: '至今仍未解决' - cho đến nay vẫn chưa được giải quyết, '至今记忆犹新' - đến tận bây giờ vẫn nhớ như in, '至今下落不明' - cho đến nay vẫn bặt vô âm tín). Tương đương với 'cho đến nay', 'đến nay', 'tận bây giờ' trong tiếng Việt.",
    "formation": "(Chủ ngữ +) 至今 (+ Chủ ngữ +) (还 / 仍 / 已经 / 未 / 没) + Động từ",
    "examples": [
      {
        "translation": "Tôi sinh ra và lớn lên ở Bắc Kinh, cho đến tận bây giờ vẫn chưa từng rời khỏi nơi này."
      }
    ]
  },
  "zh_顶_420": {
    "title": "顶 (Lượng từ: Chiếc / Cái - dùng cho mũ, nón, kiệu, màn...)",
    "shortExplanation": "Lượng từ chuyên dùng cho mũ nón và các vật dụng có chóp nhọn, vòm che hoặc chụp lên đầu; 'chiếc', 'cái'.",
    "longExplanation": "'顶' (dǐng) khi làm lượng từ dùng để đếm mũ nón (như 帽子) hoặc các vật thể có chóp nhô lên, có tán vòm che phủ phía trên đầu (như 帐子 - màn/mùng, 蚊帐 - màn chống muỗi, 轿子 - kiệu, 帐篷 - lều trại). Đứng sau số từ hoặc các đại từ chỉ định '这', '那' và đứng trước danh từ (ví dụ: '一顶帽子' - một chiếc mũ, '这顶新帽子' - chiếc mũ mới này, '搭了一顶帐篷' - dựng một chiếc lều). Tương đương với lượng từ 'chiếc', 'cái' trong tiếng Việt.",
    "formation": "Số từ / Đại từ chỉ định (这 / 那) + 顶 + Danh từ (帽子 / 帐篷 / 蚊帐 / 轿子...)",
    "examples": [
      {
        "translation": "Chiếc mũ mới này của tôi trông thế nào?"
      }
    ]
  },
  "zh_顶_421": {
    "title": "顶 (Danh từ vị trí: Đỉnh / Chóp / Nóc / Đỉnh đầu)",
    "shortExplanation": "Danh từ chỉ phần cao nhất, chóp trên cùng của cơ thể người hoặc vật thể; 'đỉnh', 'chóp', 'nóc'.",
    "longExplanation": "'顶' (dǐng) khi làm danh từ vị trí biểu thị phần đỉnh, chóp hoặc vị trí cao nhất của một đối tượng. Thường ghép trực tiếp sau danh từ chỉ bộ phận cơ thể hoặc vật thể để tạo thành danh từ chỉ vị trí (ví dụ: '头顶' - đỉnh đầu, '山顶' - đỉnh núi, '屋顶' - mái nhà/nóc nhà, '塔顶' - đỉnh tháp, '树顶' - ngọn cây). Tương đương với 'đỉnh', 'chóp', 'nóc', 'ngọn' trong tiếng Việt.",
    "formation": "Danh từ (头 / 山 / 屋 / 塔 / 树...) + 顶",
    "examples": [
      {
        "translation": "Xin vui lòng giơ tay qua đỉnh đầu."
      }
    ]
  },
  "zh_顶_422": {
    "title": "顶 (Động từ động tác: Đội / Nâng lên / Húc / Chống đỡ bằng đầu hoặc vai)",
    "shortExplanation": "Động từ biểu thị việc dùng đầu, sừng hoặc cơ thể nâng, đội, đẩy hoặc chống đỡ một vật nặng lên trên; 'đội', 'húc', 'nâng lên'.",
    "longExplanation": "'顶' (dǐng) khi làm động từ động tác thể hiện hành vi dùng đầu, trán, sừng (đối với động vật) hoặc vai để đội, húc, nâng đỡ hay đẩy một vật nặng từ dưới lên trên. Thường kết hợp với các bổ ngữ xu hướng như '起' (lên), '住' (chắc) (ví dụ: '用头顶球' - dùng đầu đánh đầu bóng, '头顶着重物' - đầu đội vật nặng, '顶起一块石头' - đội/đẩy một tảng đá lên). Tương đương với 'đội', 'nâng bằng đầu', 'húc lên' trong tiếng Việt.",
    "formation": "Chủ ngữ + (用 + Bộ phận cơ thể +) 顶(起) + Tân ngữ (vật nặng)",
    "examples": [
      {
        "translation": "Anh ấy có thể dùng đầu đội bổng vật nặng 20 cân (khoảng 10 kg) lên."
      }
    ]
  },
  "zh_顶着_423": {
    "title": "顶着 (Cụm động từ / Giới từ: Đội mưa tuyết / Ngược gió / Bất chấp / Đương đầu với)",
    "shortExplanation": "Biểu thị việc dũng cảm tiến bước, đối mặt trực tiếp hoặc bất chấp gió tuyết khắc nghiệt, áp lực lớn hay khó khăn thử thách; 'đội', 'ngược gió', 'bất chấp'.",
    "longExplanation": "'顶着' (dǐng zhe) kết hợp động từ '顶' với trợ từ trạng thái '着', dùng để diễn tả tư thế hoặc tinh thần lao mình về phía trước, dũng cảm đương đầu và chống chọi trực diện với điều kiện thời tiết khắc nghiệt (như 大雪 - tuyết lớn, 狂风 - gió bão, 烈日 - nắng gắt, 严寒 - giá rét) hoặc áp lực, chỉ trích, khó khăn gay gắt trong xã hội (như 巨大的压力 - áp lực lớn, 批评 - sự phê bình). Thường đóng vai trò làm trạng ngữ cho hành động tiếp theo trong câu (ví dụ: '顶着风雨前行' - đội mưa gió tiến bước, '顶着压力坚持' - bất chấp áp lực kiên trì đến cùng). Tương đương với 'đội (mưa tuyết)', 'ngược (gió)', 'bất chấp', 'đương đầu với' trong tiếng Việt.",
    "formation": "Chủ ngữ + 顶着 + Danh từ áp lực / Thời tiết khắc nghiệt (大雪 / 狂风 / 烈日 / 压力...) + Động từ",
    "examples": [
      {
        "translation": "Thời tiết vô cùng giá rét, Tử Lộ đội trận tuyết lớn rảo bước tiến về phía trước."
      }
    ]
  },
  "zh_得很得不行得不得了_424": {
    "title": "Tính từ / Động từ + 得很 / 得不行 / 得不得了 (Bổ ngữ mức độ: ... vô cùng / ... hết sức / ... không chịu nổi / ... cực kỳ)",
    "shortExplanation": "Bổ ngữ mức độ đứng sau tính từ hoặc động từ tâm lý, biểu thị tính chất hoặc cảm xúc đạt đến mức độ cực kỳ cao; '... vô cùng', '... không chịu nổi', '... hết sức'.",
    "longExplanation": "Cụm '得很' (dehěn), '得不行' (de bùxíng), '得不得了' (de bùdéliǎo) đứng sau tính từ hoặc động từ biểu thị trạng thái tâm lý để làm bổ ngữ mức độ, tương đương với '非常', '十分' hoặc '极了' nhưng mang sắc thái khẩu ngữ sinh động và mãnh liệt hơn:\n1. '得很': biểu thị mức độ rất cao, mang tính khẳng định chắc chắn (ví dụ: '好得很' - tốt vô cùng, '累得很' - mệt lắm);\n2. '得不行': nhấn mạnh mức độ cao đến mức không thể chịu đựng nổi hoặc không thể khống chế được (ví dụ: '困得不行' - buồn ngủ rũ rượi/không chịu nổi, '热得不行' - nóng không thể tả);\n3. '得不得了': biểu thị mức độ phi thường, đạt đến tột cùng, không gì sánh bằng (ví dụ: '高兴得不得了' - vui mừng khôn xiết, '疼得不得了' - đau đớn vô cùng).\nTương đương với 'vô cùng', 'cực kỳ', 'hết sức', 'không chịu nổi' trong tiếng Việt.",
    "formation": "Chủ ngữ + Tính từ / Động từ tâm lý + 得很 / 得不行 / 得不得了",
    "examples": [
      {
        "translation": "Nơi này nhộn nhịp thế này, lũ trẻ vui sướng vô cùng / vui không chịu nổi / vui hết biết."
      }
    ]
  },
  "zh_反而_425": {
    "title": "反而 (Phó từ chuyển ngoặt: Trái lại / Ngược lại / Ngược lại còn...)",
    "shortExplanation": "Phó từ biểu thị sự việc phát triển trái ngược hoàn toàn với dự liệu thông thường, lẽ thường hoặc mục đích ban đầu; 'trái lại', 'ngược lại', 'lại còn'.",
    "longExplanation": "'反而' (fǎn'ér) là phó từ liên kết ngữ nghĩa thường dùng ở phân câu sau. Nó biểu thị kết quả, tình huống hoặc diễn biến của sự việc phát triển ngược hẳn với lẽ thường tình, trái với mong đợi, quy luật tự nhiên hoặc dự tính ban đầu của mọi người. Cấu trúc này thường đi liền sau các liên từ chuyển ngoặt hoặc nhượng bộ như '不但不/不但没……，反而……' (chẳng những không... trái lại còn...), '虽然……，但……反而……' (tuy... nhưng ngược lại...). Tương đương với 'trái lại', 'ngược lại', 'ngược lại còn' trong tiếng Việt.",
    "formation": "Phân câu 1 (tiền đề / tình huống)，(nhưng / tuy nhiên +) Chủ ngữ + 反而 + Động từ / Tính từ",
    "examples": [
      {
        "translation": "Cuộc sống ở thành phố lớn tuy rất sôi động phong phú, nhưng bố mẹ cả đời sống ở nông thôn ngược lại sẽ không quen thích nghi được."
      }
    ]
  },
  "zh_从而_426": {
    "title": "从而 (Liên từ nhân quả - mục đích: Từ đó / Qua đó / Nhờ đó mà / Do đó)",
    "shortExplanation": "Liên từ văn viết nối hai phân câu, biểu thị phân câu trước là phương pháp hoặc nguyên nhân, phân câu sau là kết quả tất nhiên hoặc mục đích đạt được; 'từ đó', 'nhờ đó mà'.",
    "longExplanation": "'从而' (cóng'ér) là liên từ mang sắc thái trang trọng, văn viết, dùng để liên kết hai phân câu. Phân câu đi trước thường nêu ra phương pháp, hành động, điều kiện hoặc nguyên nhân; phân câu đi sau nêu lên kết quả thuận đà tự nhiên phát sinh hoặc mục đích tiếp theo đạt được nhờ phương pháp, điều kiện đó (kết hợp cả ý nghĩa 'từ đó' và 'do đó'). Tương đương với 'từ đó', 'qua đó', 'nhờ đó mà', 'kết quả là' trong tiếng Việt.",
    "formation": "Phân câu 1 (nguyên nhân / hành động / phương pháp)，从而 + Phân câu 2 (kết quả / mục đích)",
    "examples": [
      {
        "translation": "Chuẩn bị tâm lý tốt trước trận đấu có thể giảm bớt áp lực cho vận động viên, từ đó giành được chiến thắng trong cuộc thi."
      }
    ]
  },
  "zh_V于N_427": {
    "title": "Động từ + 于 + Danh từ (Giới từ chỉ thời gian / địa điểm: Vào / Tại / Ở / Lúc)",
    "shortExplanation": "Giới từ văn viết '于' đứng sau động từ làm bổ ngữ, dẫn nhập thời gian hoặc địa điểm diễn ra hành động; tương đương với '在', nghĩa là 'vào', 'tại', 'ở'.",
    "longExplanation": "'于' (yú) là giới từ mang đậm phong cách văn ngôn và văn viết trang trọng. Khi đứng sau các động từ (như 成立 - thành lập, 出生 - sinh ra, 发生 - xảy ra, 位于 - tọa lạc, 毕业 - tốt nghiệp...), '于' kết hợp với danh từ chỉ thời gian hoặc nơi chốn phía sau để tạo thành cụm giới từ làm bổ ngữ cho động từ. Cấu trúc này tương đương với '在' trong khẩu ngữ hiện đại. Tương đương với 'vào (năm/tháng/ngày)', 'tại', 'ở' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ (成立 / 出生 / 发生 / 位于 / 毕业...) + 于 + Danh từ (thời gian / địa điểm)",
    "examples": [
      {
        "translation": "Công ty này được thành lập vào năm 1997."
      }
    ]
  },
  "zh_V于N_428": {
    "title": "Động từ + 于 + Danh từ (Giới từ chỉ đối tượng tiếp nhận / mục tiêu: Đến / Cho / Với / Vào)",
    "shortExplanation": "Giới từ văn viết '于' đứng sau động từ để dẫn nhập đối tượng, mục tiêu tác động của hành động; tương đương với '向', '对', nghĩa là 'tới', 'cho', 'với'.",
    "longExplanation": "'于' (yú) đứng sau một số động từ để dẫn nhập đối tượng hoặc mục tiêu mà động tác hướng đến, tương đương với các giới từ '向' (hướng về/tới), '对' (đối với) hoặc '给' (cho) trong khẩu ngữ. Cấu trúc này thường thấy trong các cụm động từ cố định mang phong cách văn viết trang nhã như: '求助于' (tìm sự giúp đỡ từ/cầu cứu tới), '求教于' (thỉnh giáo), '致力于' (cống hiến cho/dốc sức vào), '归功于' (quy công cho/nhờ vào), '取决于' (phụ thuộc vào). Tương đương với 'đến', 'cho', 'vào', 'với', 'từ' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ (求助 / 致力于 / 忠 / 问 / 献...) + 于 + Danh từ (đối tượng / mục tiêu / người tiếp nhận)",
    "examples": [
      {
        "translation": "Lý Minh không còn cách nào khác, đành phải cầu cứu tới người bạn học cũ Vương Phong đang làm giám đốc."
      }
    ]
  },
  "zh_V于N_429": {
    "title": "Động từ + 于 + Danh từ (Giới từ chỉ nguồn gốc / xuất xứ: Từ / Bắt nguồn từ)",
    "shortExplanation": "Giới từ văn viết '于' đứng sau động từ để dẫn nhập nguồn gốc, xuất xứ, điểm xuất phát; tương đương với '从', '自', nghĩa là 'từ', 'xuất phát từ'.",
    "longExplanation": "'于' (yú) đứng sau một số động từ để dẫn nhập nguồn gốc, xuất thân, bối cảnh bắt đầu hoặc nơi sản sinh ra sự vật, tương đương với các giới từ '从' (từ) hoặc '自' (từ/tự) trong tiếng Hán hiện đại. Cấu trúc này thường thấy trong các cụm kết hợp chặt chẽ như '出身于' (xuất thân từ), '来源于' (bắt nguồn từ), '取材于' (lấy tài liệu/chất liệu từ), '产生于' (nảy sinh từ). Tương đương với 'từ', 'xuất thân từ', 'bắt nguồn từ' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ (出身 / 来源 / 取材 / 源...) + 于 + Danh từ (nguồn gốc / xuất thân / căn nguyên)",
    "examples": [
      {
        "translation": "Anh ấy xuất thân từ một gia đình trí thức."
      }
    ]
  },
  "zh_A于N_430": {
    "title": "Tính từ + 于 + Danh từ (Giới từ chỉ phương diện chịu tác động: Đối với / Cho / Có lợi cho)",
    "shortExplanation": "Giới từ văn viết '于' đứng sau tính từ biểu thị phương diện, đối tượng chịu tác động hoặc hưởng lợi ích; 'đối với', 'cho', 'có lợi cho'.",
    "longExplanation": "'于' (yú) đứng sau một số tính từ hoặc cụm từ mang tính chất tính từ biểu thị phương diện, đối tượng mà tính chất đó hướng tới hoặc tạo ra ảnh hưởng. Cấu trúc này thường thấy trong các cụm biểu thị sự có ích, bất lợi, thuận tiện hoặc sở trường như: '有助于' (có lợi cho/giúp ích đối với), '有益于' (có ích cho), '有害于' (có hại cho), '不利于' (bất lợi đối với), '便于' (thuận tiện cho), '善于' (giỏi về/khéo về). Tương đương với 'đối với', 'cho', 'có lợi cho' trong tiếng Việt.",
    "formation": "Chủ ngữ + Tính từ (有助于 / 有益 / 有害 / 不利 / 善 / 便...) + 于 + Danh từ",
    "examples": [
      {
        "translation": "Vận động có ích cho sức khỏe."
      }
    ]
  },
  "zh_A于N_431": {
    "title": "Tính từ + 于 + Danh từ (Giới từ so sánh: Khác với / Hơn / So với)",
    "shortExplanation": "Giới từ văn viết '于' đứng sau tính từ biểu thị sự so sánh, đối chiếu (khác biệt hoặc hơn/kém); tương đương với '跟……（不同）' hoặc '比', nghĩa là 'khác với', 'hơn'.",
    "longExplanation": "'于' (yú) đứng sau các tính từ so sánh biểu thị quan hệ đối chiếu, dị biệt hoặc mức độ hơn kém giữa hai sự vật. Khi đi với các tính từ như '不同' (khác), nó tương đương với '跟/与……不同' (khác với). Khi đi với các tính từ chỉ số lượng, mức độ hoặc phẩm chất (như 高 - cao, 大 - lớn, 多 - nhiều, 少 - ít, 优 - tốt hơn, 劣 - kém hơn...), '于' tương đương với từ so sánh '比' (hơn/so với). Cấu trúc này thường thấy trong văn bản khoa học, tin tức và văn viết trang trọng. Tương đương với 'khác với', 'hơn so với' trong tiếng Việt.",
    "formation": "Chủ ngữ + Tính từ (不同 / 高 / 低 / 大 / 小 / 优 / 劣...) + 于 + Danh từ (đối tượng so sánh)",
    "examples": [
      {
        "translation": "Động vật thủy sinh khác với động vật trên cạn."
      }
    ]
  },
  "zh_V为wiN_432": {
    "title": "Động từ + 为 (wéi) + Danh từ (Bổ ngữ biến đổi: Biến thành / Hóa thành / Chuyển thành)",
    "shortExplanation": "Động từ kết hợp với '为' (đọc thanh 2: wéi) làm bổ ngữ biểu thị sự biến đổi, chuyển hóa thành một trạng thái hoặc sự vật mới; 'biến thành', 'chuyển thành'.",
    "longExplanation": "'为' trong cấu trúc này được phát âm là 'wéi' (thanh 2), tương đương với '成' (chéng) hoặc '成为' (trở thành/biến thành). Khi đứng sau các động từ chỉ sự thay đổi, vận động (như 变 - biến, 化 - hóa, 转 - chuyển, 改 - sửa đổi, 降 - hạ...), nó đóng vai trò bổ ngữ kết quả biểu thị người hoặc sự vật trải qua một quá trình tác động hoặc diễn biến và biến đổi thành một sự vật, trạng thái hay hình thái mới. Tương đương với 'biến thành', 'hóa thành', 'chuyển thành', 'trở thành' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ (变 / 化 / 转 / 改 / 降...) + 为 + Danh từ (kết quả biến đổi)",
    "examples": [
      {
        "translation": "Áp lực cũng có thể biến thành động lực."
      }
    ]
  },
  "zh_V为wiN_433": {
    "title": "Động từ + 为 (wéi) + Danh từ (Bổ ngữ phán đoán / xưng định: Coi là / Xem là / Gọi là)",
    "shortExplanation": "Động từ kết hợp với '为' (đọc thanh 2: wéi) biểu thị sự phán đoán, nhận định hoặc định danh; 'coi là', 'xem là', 'gọi là'.",
    "longExplanation": "'为' trong cấu trúc này phát âm là 'wéi' (thanh 2), mang ý nghĩa 'làm', 'là', tương đương với '作' (zuò) hoặc '当作' (dàngzuò). Khi kết hợp sau các động từ biểu thị nhận thức, phán đoán, xưng hô hoặc bổ nhiệm (như 称 - gọi/xưng, 视 - coi, 认 - nhận, 选 - bầu/chọn, 奉 - tôn phụng...), nó dùng để xác định tính chất, danh phận hoặc tên gọi của đối tượng (thường gặp dạng '称……为……' - gọi... là..., '称其为' - gọi cái đó là..., '视……为……' - coi... là...). Tương đương với 'gọi là', 'xem là', 'coi là' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ (称 / 视 / 认 / 选 / 奉...) + (Đại từ / Danh từ +) 为 + Danh từ (danh xưng / định danh)",
    "examples": [
      {
        "translation": "Theo quan điểm của anh ấy, một cuộc sống không có công việc thì không thể gọi là một cuộc sống đích thực."
      }
    ]
  },
  "zh_V起来_434": {
    "title": "Động từ + 起来 (Bổ ngữ xu hướng mở rộng: Gom lại / Tích lũy lại / Tập trung lại)",
    "shortExplanation": "Bổ ngữ xu hướng mở rộng '起来' biểu thị hành động làm cho người hoặc sự vật từ phân tán tập hợp, tích tụ hoặc gom góp lại một chỗ; 'lại', 'tích lũy lại'.",
    "longExplanation": "'起来' (qǐlai) khi làm bổ ngữ xu hướng mở rộng có ý nghĩa biểu thị sự tập hợp, tích tụ hoặc dồn lại. Nó diễn tả hành động làm cho các sự vật, thông tin, lực lượng hoặc của cải vốn ở trạng thái phân tán, riêng lẻ được gom góp, tích tụ hoặc hợp nhất lại thành một khối hoặc số lượng lớn (ví dụ: '积蓄起来' - tích lũy lại, '集中起来' - tập trung lại, '团结起来' - đoàn kết lại, '组织起来' - tổ chức lại). Tương đương với 'lại', 'tích lũy lại', 'gom góp lại', 'tụ lại' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ (积蓄 / 集中 / 组织 / 团结 / 收 / 存...) + 起来",
    "examples": [
      {
        "translation": "Nước ngầm được tích lũy lại, càng tích tụ lại càng nhiều thêm."
      }
    ]
  },
  "zh_藏起来躲起来_435": {
    "title": "藏起来 / 躲起来 (Bổ ngữ xu hướng mở rộng: Trốn đi / Giấu đi / Ẩn mình / Cất kỹ)",
    "shortExplanation": "Bổ ngữ xu hướng '起来' kết hợp với động từ như '藏' (giấu) hoặc '躲' (trốn) biểu thị việc ẩn nấp, cất giấu để không bị phát hiện hoặc không lộ diện; 'trốn đi', 'giấu đi'.",
    "longExplanation": "'起来' (qǐlai) khi kết hợp với các động từ mang tính chất che giấu hoặc ẩn nấp (như '藏' - giấu, '躲' - trốn, '收' - cất, '遮' - che...) đóng vai trò bổ ngữ xu hướng mở rộng mang ý nghĩa ẩn giấu, giữ kín hoặc thu cất. Nó biểu thị hành động làm cho người hoặc vật được đưa vào nơi kín đáo, khuất tầm nhìn nhằm mục đích tránh né, không để lộ ra ngoài hoặc cất giữ cẩn thận (ví dụ: '藏起来' - giấu đi, '躲起来' - trốn đi, '收起来' - cất đi/thu dọn lại). Tương đương với 'trốn đi', 'giấu đi', 'ẩn mình đi' trong tiếng Việt.",
    "formation": "Chủ ngữ + (把 + Tân ngữ +) 藏 / 躲 / 收 + 起来 (hoặc: 藏 / 躲 + 起 + Tân ngữ + 来)",
    "examples": [
      {
        "translation": "Lưu Lệ biết mình làm sai nên trốn đi không dám gặp tôi."
      }
    ]
  },
  "zh_替_436": {
    "title": "替 + Danh từ / Đại từ + Động từ (Giới từ đại diện: Thay / Thay mặt / Hộ / Giùm)",
    "shortExplanation": "Giới từ '替' dẫn nhập đối tượng mà mình làm thay, đại diện hoặc làm giùm một hành động; 'thay', 'thay mặt', 'giùm', 'hộ'.",
    "longExplanation": "'替' (tì) là giới từ đứng trước danh từ hoặc đại từ chỉ người, kết hợp tạo thành cụm giới từ làm trạng ngữ đứng trước vị ngữ động từ. Nó dùng để chỉ hành động được thực hiện thay thế cho ai đó, đại diện cho người khác làm việc gì, hoặc làm hộ, làm giùm cho người khác khi họ không trực tiếp làm được (ví dụ: '替我请假' - xin nghỉ phép giùm tôi, '替他开车' - lái xe thay anh ấy, '替我问好' - gửi lời hỏi thăm thay tôi). Tương đương với 'thay', 'thay mặt', 'giùm', 'hộ' trong tiếng Việt.",
    "formation": "Chủ ngữ + 替 + Danh từ / Đại từ (người được làm thay) + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Khi gặp ông ngoại, xin hãy gửi lời hỏi thăm của cháu đến ông giúp cháu nhé."
      }
    ]
  },
  "zh_替_437": {
    "title": "替 + Danh từ / Đại từ + Tính từ tâm lý (Giới từ đồng cảm: Cho / Thay cho [mừng cho, lo cho])",
    "shortExplanation": "Giới từ '替' đứng trước người được quan tâm, biểu thị sự đồng cảm, đặt mình vào vị trí của người đó để vui mừng, lo lắng hoặc sốt ruột thay cho họ; 'mừng cho', 'lo cho'.",
    "longExplanation": "'替' (tì) trong cấu trúc này đi với các tính từ hoặc động từ chỉ tâm lý, cảm xúc (như 高兴 - mừng, 担心 - lo lắng, 着急 - sốt ruột, 难过 - buồn bã, 捏一把汗 - toát mồ hôi hột...). Nó dùng để dẫn nhập đối tượng mà người nói đang đặt mình vào hoàn cảnh của họ để cùng chia sẻ cảm xúc, cảm thấy vui mừng giùm hoặc lo âu, ái ngại thay cho người đó. Tương đương với 'mừng cho', 'vui thay cho', 'lo cho', 'sốt ruột thay cho' trong tiếng Việt.",
    "formation": "Chủ ngữ + 替 + Danh từ / Đại từ (người được đồng cảm) + Tính từ tâm lý (高兴 / 担心 / 着急 / 难过...)",
    "examples": [
      {
        "translation": "Lý Dương sắp đi du học rồi, tất cả chúng tôi đều thấy mừng cho cậu ấy."
      }
    ]
  },
  "zh_说不定_438": {
    "title": "说不定 (Vị ngữ: Chưa chắc chắn / Còn chưa biết chừng / Chưa định rõ)",
    "shortExplanation": "Làm vị ngữ trong câu, biểu thị sự việc, thời gian hoặc tình huống chưa được ấn định chắc chắn, chưa thể nói trước; 'chưa biết chừng', 'chưa chắc'.",
    "longExplanation": "'说不定' (shuōbudìng) khi đảm nhiệm chức năng vị ngữ trong câu (thường đi sau phó từ '还' tạo thành '还说不定') mang ý nghĩa chỉ một sự việc, kế hoạch, thời gian hoặc kết quả còn chưa được quyết định dứt khoát, vẫn còn bỏ ngỏ hoặc chưa thể khẳng định chắc chắn (tương đương với '难说' - khó nói, '还不能确定' - còn chưa thể khẳng định). Tương đương với 'chưa chắc chắn', 'chưa biết chừng', 'còn chưa định' trong tiếng Việt.",
    "formation": "Chủ ngữ (kế hoạch / thời gian / tình huống) + (还 +) 说不定",
    "examples": [
      {
        "translation": "Chuyện này giám đốc đã đồng ý rồi, chỉ là thời gian xuất phát thì vẫn chưa chắc chắn."
      }
    ]
  },
  "zh_说不定_439": {
    "title": "说不定 (Phó từ phỏng đoán: Có khi / Biết đâu chừng / Khéo lại / Có lẽ)",
    "shortExplanation": "Phó từ biểu thị sự phỏng đoán, ước chừng về một khả năng có thể xảy ra; tương đương với '也许', '可能', nghĩa là 'có khi', 'biết đâu'.",
    "longExplanation": "'说不定' (shuōbudìng) khi dùng làm phó từ đứng trước chủ ngữ hoặc trước vị ngữ, dùng để biểu thị sự phỏng đoán, suy đoán của người nói về một khả năng có thể phát sinh. Nó chỉ ra rằng một tình huống nào đó tuy chưa chắc chắn nhưng hoàn toàn có xác suất xảy ra, tương đương với '也许' (có lẽ), '可能' (có thể) trong tiếng Hán (ví dụ: '你去找找他，说不定他知道' - bạn đi tìm anh ấy thử xem, biết đâu anh ấy lại biết; '明天说不定会下雨' - ngày mai khéo lại mưa). Tương đương với 'có khi', 'biết đâu chừng', 'có lẽ', 'khéo mà' trong tiếng Việt.",
    "formation": "(Chủ ngữ +) 说不定 (+ Chủ ngữ +) Động từ / Tính từ / Phân câu",
    "examples": []
  },
  "zh_N似的_441": {
    "title": "Danh từ + 似的 (Trợ từ so sánh: Giống như / Tựa như / Cứ như là... vậy)",
    "shortExplanation": "Trợ từ đặt sau danh từ hoặc cụm từ biểu thị sự tương đồng, thường đi kèm với '像', '好像', '仿佛' ở phía trước; 'như', 'tựa như', 'cứ như... vậy'.",
    "longExplanation": "'似的' (thường đọc là shìde, trong văn thơ đôi khi đọc sìde) là trợ từ so sánh đứng sau danh từ, đại từ hoặc cụm đoản ngữ để tạo thành cụm trợ từ biểu thị sự giống nhau về hình thái, trạng thái hoặc tính chất giữa hai đối tượng. Cấu trúc này thường kết hợp nhịp nhàng với các phó từ hoặc động từ so sánh ở phía trước như '像' (xiàng), '好像' (hǎoxiàng), '仿佛' (fǎngfú), tạo thành dạng cố định '像……似的' hoặc '好像……似的'. Tương đương với 'như...', 'giống như...', 'cứ như là... vậy' trong tiếng Việt.",
    "formation": "(像 / 好像 / 仿佛 +) Danh từ / Cụm từ + 似的",
    "examples": [
      {
        "translation": "Tôi không dám tin đây là sự thật, cứ như đang nằm mơ vậy."
      }
    ]
  },
  "zh_A得什么似的_442": {
    "title": "Tính từ + 得什么似的 (Bổ ngữ trình độ cực độ: ... ơi là ... / ... đến mức không tả nổi / Vô cùng...)",
    "shortExplanation": "Bổ ngữ trình độ khẩu ngữ biểu thị trạng thái hoặc mức độ đạt đến mức tột cùng, không gì sánh bằng; '... ơi là ...', '... không tả xiết'.",
    "longExplanation": "'得什么似的' (dé shénme shìde) là cấu trúc bổ ngữ trình độ mang tính khẩu ngữ sinh động và cường điệu cao. Nó đứng sau tính từ miêu tả tính chất hoặc động từ biểu thị trạng thái tâm lý (như 累 - mệt, 忙 - bận, 高兴 - mừng rỡ, 气 - tức giận, 美 - đẹp đẽ...), biểu thị mức độ sâu sắc hoặc mãnh liệt đến mức dường như không từ ngữ nào có thể lột tả hết được. Tương đương với 'vô cùng...', 'hết sức...', '... ơi là ...', '... đến không tả nổi' trong tiếng Việt.",
    "formation": "Tính từ / Động từ tâm lý + 得什么似的",
    "examples": [
      {
        "translation": "Anh ấy đeo chiếc ba lô đựng máy tính nặng trịch chen chúc trên tàu điện ngầm, tan làm về đến nhà mệt ơi là mệt."
      }
    ]
  },
  "zh_纷纷V_443": {
    "title": "纷纷 + Động từ (Phó từ: Nối tiếp nhau / Đua nhau / Lần lượt / Dồn dập)",
    "shortExplanation": "Phó từ biểu thị nhiều người hoặc sự vật nối tiếp nhau thực hiện một hành động trong khoảng thời gian ngắn; 'lần lượt', 'đua nhau', 'nườm nượp'.",
    "longExplanation": "'纷纷' (fēnfēn) là phó từ đứng trước động từ. Nó biểu thị số lượng nhiều người hoặc sự vật (chủ ngữ nhất thiết phải ở số nhiều hoặc là danh từ tập thể) tiếp nối nhau thực hiện một động tác, hết người này đến người khác không ngớt, hoặc sự việc diễn ra dồn dập, rải rác nhưng liên tục. Tương đương với 'lần lượt', 'tiếp nhau', 'đua nhau', 'tấp nập', 'nối đuôi nhau' trong tiếng Việt.",
    "formation": "Chủ ngữ (số nhiều / tập thể) + 纷纷 + Động từ",
    "examples": [
      {
        "translation": "Trời sắp đổ mưa rồi, những người đi đường đua nhau chạy vội về nhà."
      }
    ]
  },
  "zh_瞎_444": {
    "title": "瞎 (Tính từ / Động từ: Mù / Mất thị lực / Hỏng mắt)",
    "shortExplanation": "Tính từ hoặc động từ chỉ trạng thái mắt bị mất thị lực, không nhìn thấy được; 'mù', 'hỏng mắt'.",
    "longExplanation": "'瞎' (xiā) có nghĩa gốc là mất đi thị lực, mắt bị mù, không thể nhìn thấy ánh sáng hoặc sự vật xung quanh. Từ này có thể dùng làm vị ngữ (như 眼睛瞎了 - mắt đã mù), làm định ngữ cho danh từ (như 瞎子 - người mù, 瞎马 - ngựa mù), hoặc làm động từ (bị mù). Tương đương với 'mù', 'mất thị lực', 'hỏng mắt' trong tiếng Việt.",
    "formation": "(眼睛 +) 瞎 (+ 了) / 瞎 + Danh từ",
    "examples": [
      {
        "translation": "Một ngày nọ, ông ấy sai các binh lính đi tìm một con voi và một vài người bị mù bẩm sinh đem về."
      }
    ]
  },
  "zh_瞎_445": {
    "title": "瞎 + Động từ (Phó từ: Mù quáng / Lung tung / Vô cớ / Bừa bãi / Hão)",
    "shortExplanation": "Phó từ đứng trước động từ biểu thị hành động không có căn cứ, không có mục đích, mù quáng hoặc vô ích; 'mù quáng', 'bừa bãi', 'lung tung'.",
    "longExplanation": "'瞎' (xiā) là phó từ đứng trước động từ. Nó mang ý nghĩa phái sinh biểu thị hành vi thực hiện một cách mù quáng, lung tung, bừa bãi, thiếu cơ sở thực tế hoặc hoàn toàn không mang lại hiệu quả thiết thực. Thường đi kèm với các động từ chỉ suy nghĩ, nói năng hoặc hành động như: '瞎说' (nói bừa, nói nhảm), '瞎想' (nghĩ ngợi lung tung), '瞎操心 / 瞎担心' (lo hão, lo bò trắng răng), '瞎闹' (làm loạn vô cớ). Tương đương với 'mù quáng', 'vô cớ', 'lung tung', 'bừa bãi' trong tiếng Việt.",
    "formation": "(别 / 不用 +) 瞎 + Động từ",
    "examples": [
      {
        "translation": "Anh ấy sẽ tự có cách giải quyết thôi, bạn đừng có lo lắng vô cớ thay cho anh ấy nữa."
      }
    ]
  },
  "zh_分别_446": {
    "title": "分别 (Động từ / Danh từ: Chia tay / Từ biệt / Xa cách / Sự ly biệt)",
    "shortExplanation": "Động từ biểu thị sự rời xa nhau sau thời gian gắn bó, hoặc danh từ chỉ sự ly biệt, xa cách; 'chia tay', 'từ biệt'.",
    "longExplanation": "'分别' (fēnbié) là động từ chỉ hành động rời xa nhau của hai hay nhiều người sau khi cùng ở chung một nơi hoặc gắn bó trong một khoảng thời gian, tương đương với '离别' (ly biệt) hay '分开' (chia tay). Từ này cũng có thể được danh từ hóa để chỉ cuộc chia tay, sự xa cách. Thường dùng trong bối cảnh tình cảm bạn bè, người thân chia tay trước khi lên đường. Tương đương với 'chia tay', 'từ biệt', 'xa cách' trong tiếng Việt.",
    "formation": "Chủ ngữ + 分别 / 分别 + 是...",
    "examples": [
      {
        "translation": "Chia tay chỉ là tạm thời thôi, sau này chúng ta nhất định sẽ gặp lại nhau."
      }
    ]
  },
  "zh_分别_447": {
    "title": "分别 (Danh từ: Sự khác biệt / Điểm khác nhau / Sai khác)",
    "shortExplanation": "Danh từ chỉ sự khác nhau hoặc ranh giới phân biệt giữa các sự vật, đối tượng; 'sự khác biệt', 'điểm khác nhau'.",
    "longExplanation": "'分别' (fēnbié) đóng vai trò là danh từ, mang ý nghĩa là sự sai khác, điểm bất đồng hoặc ranh giới phân biệt giữa hai hay nhiều đối tượng, tương đương với '区别' (khác biệt) hoặc '不同之处'. Thường xuất hiện trong các cấu trúc như '有什么分别' (có điểm gì khác nhau), '……和……没有分别' (không có gì khác biệt). Tương đương với 'sự khác biệt', 'điểm khác nhau' trong tiếng Việt.",
    "formation": "(……和……) 有 / 没有 + 分别 / 有什么分别",
    "examples": [
      {
        "translation": "Tôi không biết giữa hai cách làm này có điểm gì khác nhau cả."
      }
    ]
  },
  "zh_分别_448": {
    "title": "分别 + Động từ (Phó từ: Riêng rẽ / Tách biệt / Từng người một / Độc lập)",
    "shortExplanation": "Phó từ biểu thị hành động được thực hiện riêng biệt, độc lập cho từng đối tượng chứ không làm cùng nhau; 'riêng rẽ', 'tách biệt'.",
    "longExplanation": "'分别' (fēnbié) là phó từ đứng trước động từ. Nó biểu thị hành động được thực hiện một cách riêng rẽ, độc lập, từng người hoặc từng việc một cách phân tách chứ không làm chung một chỗ hay cùng một lúc. Tương đương với 'riêng rẽ', 'độc lập', 'tách biệt', 'từng người một' trong tiếng Việt.",
    "formation": "Chủ ngữ + 分别 + Động từ + Tân ngữ",
    "examples": [
      {
        "translation": "Tôi đã tìm hỏi riêng hai người về chuyện này, cách nói của họ đều hoàn toàn giống nhau."
      }
    ]
  },
  "zh_分别_449": {
    "title": "分别 (Phó từ đối ứng: Lần lượt là / Tương ứng là / Theo thứ tự là)",
    "shortExplanation": "Phó từ biểu thị mối quan hệ tương ứng đối chiếu một-một giữa hai danh sách sự vật theo đúng thứ tự liệt kê; 'lần lượt là', 'tương ứng là'.",
    "longExplanation": "'分别' (fēnbié) là phó từ biểu thị mối quan hệ tương ứng từng đôi một theo thứ tự giữa các đối tượng ở hai vế câu. Tức là đối tượng thứ nhất ở vế trước tương ứng với nội dung thứ nhất ở vế sau, đối tượng thứ hai tương ứng với nội dung thứ hai (tương đương 'respectively' trong tiếng Anh). Thường đi liền với '是' hoặc các động từ chỉ số liệu, xuất xứ. Tương đương với 'lần lượt là', 'tương ứng là', 'theo thứ tự là' trong tiếng Việt.",
    "formation": "Danh từ 1 和 Danh từ 2 + 分别 + 是 / Động từ + Nội dung 1 和 Nội dung 2",
    "examples": [
      {
        "translation": "Đá cát kết và đá cuội kết lần lượt là sản phẩm đông kết của cát và sỏi."
      }
    ]
  },
  "zh_根_450": {
    "title": "Số từ + 根 + Danh từ (Lượng từ: Sợi / Que / Cây / Cọng / Thanh)",
    "shortExplanation": "Lượng từ dùng cho các đồ vật thon dài, dạng que, thanh hoặc sợi (dây thừng, kim, tóc, gậy, chuối...); 'sợi', 'que', 'cây'.",
    "longExplanation": "'根' (gēn) là lượng từ chuyên dùng cho các sự vật có hình dáng thon dài, hình que, hình trụ mảnh hoặc dạng sợi. Các danh từ thường kết hợp với '根' bao gồm: dây thừng (绳子), sợi tóc (头发), cây kim (针), que củi (木棍), ngón tay (手指), khúc xương (骨头), điếu thuốc (烟), cây chuối/quả chuối (香蕉)... Tương đương với 'sợi', 'que', 'cây', 'cọng', 'thanh' trong tiếng Việt.",
    "formation": "Số từ + 根 + Danh từ (vật thon dài / sợi / que / thanh)",
    "examples": [
      {
        "translation": "Người khiếm thị sờ trúng phần đuôi nói rằng con voi giống như một sợi dây thừng."
      }
    ]
  },
  "zh_根_451": {
    "title": "根 (Danh từ: Rễ cây / Gốc rễ / Cội nguồn / Căn nguyên)",
    "shortExplanation": "Danh từ chỉ bộ phận rễ của thực vật hút dinh dưỡng dưới đất, hoặc nghĩa chuyển chỉ cội nguồn, gốc rễ của sự vật; 'rễ', 'gốc rễ'.",
    "longExplanation": "'根' (gēn) là danh từ có nghĩa gốc chỉ rễ cây, bộ phận của thực vật phát triển trong đất để hút nước và dưỡng chất, nâng đỡ thân cây. Nghĩa mở rộng và trừu tượng của nó chỉ cội nguồn, gốc rễ, nguồn gốc ban đầu hoặc căn bản của sự vật hiện tượng (như 根本 - căn bản, 根源 - căn nguyên, 扎根 - cắm rễ). Tương đương với 'rễ', 'gốc rễ', 'căn nguyên' trong tiếng Việt.",
    "formation": "Danh từ (thực vật / sự vật) + 的 + 根",
    "examples": [
      {
        "translation": "Rễ của cái cây này vừa to vừa dài."
      }
    ]
  },
  "zh_便_452": {
    "title": "便 + Động từ / Tính từ (Phó từ văn viết: Liền / Bèn / Thì / Ngay)",
    "shortExplanation": "Phó từ văn viết tương đương với '就', đứng trước vị ngữ biểu thị hành động diễn ra nối tiếp ngay sau hoặc là kết quả tất nhiên của tình huống trước; 'liền', 'bèn', 'thì'.",
    "longExplanation": "'便' (biàn) là phó từ mang phong cách văn viết trang trọng, tương đương với '就' (jiù) trong khẩu ngữ. Khi đứng trước động từ hoặc tính từ trong phân câu sau, '便' biểu thị: (1) Hành động xảy ra nhanh chóng, tiếp nối ngay tức khắc sau sự việc ở phân câu trước; (2) Kết quả nảy sinh một cách đương nhiên, thuận lý thành chương từ điều kiện hoặc tiền đề đã nêu. Tương đương với 'liền', 'bèn', 'thì', 'ngay lập tức' trong tiếng Việt.",
    "formation": "Phân câu 1 (tiền đề / sự kiện)，(Chủ ngữ +) 便 + Động từ / Tính từ",
    "examples": [
      {
        "translation": "Tầng trên mới mua một chiếc đàn piano, nhà chúng tôi bèn có thêm một chút ồn ào bất an."
      }
    ]
  },
  "zh_倒反倒_453": {
    "title": "倒 / 反倒 (Phó từ chuyển ngoặt: Trái lại / Ngược lại / Ngược đời)",
    "shortExplanation": "Phó từ biểu thị tình huống hoặc kết quả diễn ra hoàn toàn ngược lại với lẽ thường tình, mong muốn hoặc suy đoán tự nhiên; 'trái lại', 'ngược lại'.",
    "longExplanation": "'倒' (dào) hoặc '反倒' (fǎndào) là phó từ chuyển ngoặt đứng trước vị ngữ ở phân câu sau. Chúng dùng để nhấn mạnh sự việc, hiện tượng phát triển theo chiều hướng hoàn toàn đối lập với quy luật thông thường, trái ngược với dự đoán ban đầu hay mong ước của mọi người. Nghĩa tương đương với '反而' (fǎn'ér). '反倒' mang ngữ khí chuyển ngoặt bất ngờ và mạnh mẽ hơn một chút so với '倒'. Tương đương với 'trái lại', 'ngược lại', 'đằng này lại...' trong tiếng Việt.",
    "formation": "Phân câu 1 (tiền đề)，(Chủ ngữ +) 倒 / 反倒 + Động từ / Tính từ",
    "examples": []
  },
  "zh_倒_455": {
    "title": "倒 / 倒是 (Phó từ nhượng bộ: Thì có... thật / Quả thực / Được cái là...)",
    "shortExplanation": "Phó từ biểu thị sự nhượng bộ, thừa nhận một mặt tích cực hoặc sự thật trước khi chuyển ngoặt sang nêu khuyết điểm; 'thì... thật', 'được cái'.",
    "longExplanation": "'倒' (dào) hoặc '倒是' (dàoshi) là phó từ biểu thị sự nhượng bộ có điều kiện. Trong phân câu trước, người nói dùng '倒 / 倒是' để khẳng định, thừa nhận một ưu điểm, mặt tích cực hoặc một sự thật khách quan (như chất lượng tốt, người nhiệt tình...). Sau đó, phân câu đi sau sẽ dùng các từ chuyển ngoặt như '就是' (chỉ có điều là), '只是' (nhưng mà), '但是' (nhưng) để chỉ ra nhược điểm, hạn chế hay điều chưa được thỏa đáng. Tương đương với 'thì... thật đấy nhưng...', 'được cái là... chỉ tội...', 'quả thực là... có điều' trong tiếng Việt.",
    "formation": "(Chủ ngữ +) 倒 / 倒是 + Động từ / Tính từ，(nhưng / chỉ có điều là +) Phân câu 2",
    "examples": [
      {
        "translation": "Chất lượng thì tốt thật đấy, chỉ có điều giá cả đắt quá."
      }
    ]
  },
  "zh_倒_456": {
    "title": "倒 / 倒是 (Phó từ ngữ khí: Mau... xem / Thử... xem nào / Rốt cuộc thì... [thúc giục, chất vấn])",
    "shortExplanation": "Phó từ dùng trong câu nghi vấn hoặc cầu khiến để biểu thị sự thúc giục, sốt ruột, bất bình hoặc chất vấn; 'mau', 'thử... xem nào', 'rốt cuộc'.",
    "longExplanation": "'倒' (dào) hoặc '倒是' (dàoshi) là phó từ ngữ khí thường dùng trong câu cầu khiến, thúc giục hoặc câu hỏi tu từ, chất vấn. Nó diễn tả tâm trạng sốt ruột, nôn nóng, bức xúc hoặc không kiên nhẫn nổi của người nói đối với thái độ dùng dằng, im lặng hoặc thoái thác của đối phương. Nó có tác dụng thúc giục đối phương phải lập tức đưa ra câu trả lời, hành động hoặc giải thích rõ ràng ('nói mau xem', 'rốt cuộc thì...'). Tương đương với 'thử... xem nào', 'mau... đi chứ', 'rốt cuộc thì...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 倒 / 倒是 + Động từ (+ Tân ngữ / Xem thử)",
    "examples": [
      {
        "translation": "Bạn thử nói ra xem nào, việc này mà bạn không chịu trách nhiệm thì ai chịu trách nhiệm đây?"
      }
    ]
  },
  "zh_V来V去_457": {
    "title": "Động từ + 来 + Động từ + 去 (Hành động lặp đi lặp lại: ... đi ... lại / qua lại / tới lui)",
    "shortExplanation": "Cấu trúc lặp lại động từ với '来' và '去', biểu thị hành động diễn ra lặp đi lặp lại nhiều lần, qua lại liên tục không ngừng hoặc suy đi tính lại nhiều lần.",
    "longExplanation": "'V 来 V 去' (V lái V qù) là kết cấu lặp động từ thường dùng trong khẩu ngữ. Hai động từ ở hai vị trí là cùng một động từ đơn âm tiết (chỉ động tác có thể lặp lại hoặc chuyển động không gian, như 跑, 走, 飞, 看, 想, 问...). Cấu trúc này có hai nét nghĩa chính: một là biểu thị động tác di chuyển trong không gian qua lại nhiều lần, tới lui liên tục (như '跑来跑去' - chạy qua chạy lại, '走来走去' - đi đi lại lại); hai là biểu thị hành động được thực hiện lặp đi lặp lại nhiều lần nhằm mục đích tìm kiếm giải pháp hoặc suy ngẫm kỹ càng (như '想来想去' - suy đi tính lại, '看来看去' - nhìn tới nhìn lui/ngắm nghía mãi, '挑来挑去' - chọn tới chọn lui). Thường mang sắc thái tiêu tốn thời gian hoặc chưa có kết quả dứt khoát. Tương đương với '... đi ... lại', 'qua lại', 'tới lui' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ + 来 + Động từ + 去",
    "examples": [
      {
        "translation": "Chú chó con đuổi theo cái đuôi của mình, chạy qua chạy lại trên bãi cỏ."
      }
    ]
  },
  "zh_要不不然要不然_458": {
    "title": "要不 / 不然 / 要不然 (Liên từ giả thiết ngược: Nếu không thì / Bằng không / Không thì)",
    "shortExplanation": "Liên từ dùng ở đầu phân câu sau, biểu thị giả thiết nếu không như tình huống ở phân câu trước thì sẽ xảy ra hậu quả hoặc kết quả không mong muốn; 'nếu không thì', 'bằng không'.",
    "longExplanation": "'要不' (yàobù), '不然' (bùrán) và '要不然' (yàobùrán) là các liên từ biểu thị quan hệ giả thiết ngược lại, dùng nối tiếp giữa hai phân câu. Phân câu trước nêu ra một sự việc, hành động hoặc điều kiện đã diễn ra hay cần phải làm; phân câu sau dùng '要不 / 不然 / 要不然' đưa ra một giả định trái ngược (tức 'nếu không phải như vậy' hoặc 'nếu không làm như vậy') để dẫn tới một kết quả không hay, bất lợi hoặc đáng tiếc. Trong đó, '不然' mang sắc thái hơi trang trọng hơn, còn '要不' và '要不然' mang đậm phong cách khẩu ngữ hàng ngày. Tương đương với 'nếu không thì', 'bằng không', 'không thì' trong tiếng Việt.",
    "formation": "Phân câu 1 (sự thật / điều kiện)，要不 / 不然 / 要不然 + Phân câu 2 (hậu quả không mong muốn nếu không làm như phân câu 1)",
    "examples": [
      {
        "translation": "May mà gặp được bạn, nếu không thì hôm nay tôi chắc chắn bị muộn rồi."
      }
    ]
  },
  "zh_要不不然要不然_459": {
    "title": "要不 / 不然 / 要不然 (Đưa ra gợi ý, đề xuất: Hay là / Hoặc là / Hay là thế này)",
    "shortExplanation": "Dùng ở đầu phân câu để đưa ra một phương án, lời đề nghị hoặc gợi ý lựa chọn khác với giọng điệu thương lượng, nhẹ nhàng; 'hay là', 'hoặc là'.",
    "longExplanation": "'要不' (yàobù), '不然' (bùrán), '要不然' (yàobùrán) trong ngữ cảnh này được dùng như một phương thức đưa ra kiến nghị hoặc giải pháp thay thế mang tính chất bàn bạc, thương lượng. Khi gặp một tình huống khó khăn, bất tiện hoặc cần đề xuất ý kiến, người nói dùng từ này để mở đầu cho một phương án mới một cách uyển chuyển, lịch sự. Cuối câu thường có thêm trợ từ ngữ khí '吧' để tăng tính gợi ý, thân mật. Trong cách dùng này, '要不' và '要不然' được sử dụng phổ biến nhất trong khẩu ngữ. Tương đương với 'hay là', 'hay là thế này', 'hoặc là' trong tiếng Việt.",
    "formation": "Phân câu 1 (nêu tình huống / lý do)，要不 / 不然 / 要不然 + Chủ ngữ + Động từ / Mệnh đề (+ 吧)",
    "examples": [
      {
        "translation": "Hôm nay muộn quá rồi, hay là ngày mai bạn hãy đi."
      }
    ]
  },
  "zh_彼此V_460": {
    "title": "彼此 + Động từ (Đại từ làm trạng ngữ: Lẫn nhau / Cùng nhau / Cho nhau)",
    "shortExplanation": "Đại từ xưng hô '彼此' làm trạng ngữ đứng trước động từ song âm tiết, biểu thị hành động tương hỗ giữa hai bên; 'lẫn nhau', 'cho nhau'.",
    "longExplanation": "'彼此' (bǐcǐ) là đại từ chỉ hai bên đối ứng (bên này và bên kia, cả đôi bên). Khi đứng trực tiếp trước động từ vị ngữ, '彼此' giữ vai trò trạng ngữ chỉ tính chất tương hỗ của hành động. Động từ đi sau thường là động từ song âm tiết biểu thị mối quan hệ hoặc hành vi tương tác giữa người với người (như 帮助 - giúp đỡ, 了解 - tìm hiểu/hiểu rõ, 信任 - tin tưởng, 尊重 - tôn trọng, 照顾 - chăm sóc, 关心 - quan tâm). Nó diễn tả cả hai phía đều làm hành động đó cho đối phương. Tương đương với 'lẫn nhau', 'qua lại', 'cho nhau' trong tiếng Việt.",
    "formation": "Chủ ngữ (số nhiều / đôi bên) + 彼此 + Động từ",
    "examples": [
      {
        "translation": "Bạn bè tốt nên giúp đỡ lẫn nhau."
      }
    ]
  },
  "zh_彼此_461": {
    "title": "彼此 (Đại từ chỉ định / xưng hô: Đôi bên / Hai bên / Của nhau)",
    "shortExplanation": "Đại từ chỉ cả hai bên (người này và người kia), thường đảm nhiệm vai trò định ngữ (彼此的), chủ ngữ hoặc tân ngữ trong câu; 'đôi bên', 'hai bên'.",
    "longExplanation": "'彼此' (bǐcǐ) là đại từ biểu thị quan hệ hai bên đối ứng, gồm cả 'bên này' (此) và 'bên kia' (彼). Khác với khi làm trạng ngữ đứng trước động từ (như '彼此帮助'), ở đây '彼此' đóng vai trò danh từ/đại từ thực thụ trong câu: thường làm định ngữ kèm trợ từ '的' (như '彼此的爱好' - sở thích của nhau, '彼此的感情' - tình cảm của đôi bên, '彼此的距离' - khoảng cách giữa hai người), hoặc làm tân ngữ (như '不分彼此' - không phân biệt bên này bên kia, coi như một nhà). Tương đương với 'đôi bên', 'hai bên', 'của nhau' trong tiếng Việt.",
    "formation": "(Chủ ngữ +) 彼此 (+ 的) + Danh từ (hoặc làm Chủ ngữ / Tân ngữ)",
    "examples": [
      {
        "translation": "Sở thích của hai chúng tôi giống nhau."
      }
    ]
  },
  "zh_彼此彼此_462": {
    "title": "彼此彼此 (Thành ngữ khẩu ngữ: Cũng như nhau cả thôi / Đôi bên như nhau / Kẻ tám lạng người nửa cân)",
    "shortExplanation": "Cụm từ cố định thường dùng trong giao tiếp khẩu ngữ, biểu thị đôi bên có tình trạng, trình độ, hoàn cảnh hoặc kết quả tương đương nhau; 'cũng như nhau cả thôi'.",
    "longExplanation": "'彼此彼此' (bǐcǐbǐcǐ) là dạng trùng điệp của đại từ '彼此', tạo thành một quán dụng ngữ rất sinh động trong khẩu ngữ tiếng Hán. Nó được dùng để chỉ tình huống mà hai bên đều như nhau, không ai hơn ai kém, trình độ hay cảnh ngộ tương đương nhau. Thường dùng trong hai hoàn cảnh: một là câu nói khách khí khiêm tốn đáp lại lời khen của đối phương (mang ý 'bạn quá khen, thực ra hai ta ngang nhau thôi'); hai là dùng trong lời nói đùa vui, trêu chọc nhau (mang ý 'anh chê tôi thì anh cũng chẳng khá hơn đâu, đôi bên như nhau cả'). Tương đương với 'cũng như nhau cả thôi', 'kẻ tám lạng người nửa cân', 'đôi bên như một' trong tiếng Việt.",
    "formation": "Chủ ngữ (hai người / đôi bên) + 彼此彼此 (hoặc đứng độc lập làm câu đối đáp)",
    "examples": [
      {
        "translation": "Hai chúng ta cũng như nhau cả thôi, tôi vẽ cũng chẳng hơn bạn được bao nhiêu."
      }
    ]
  },
  "zh_算_463": {
    "title": "算 (Động từ phán đoán: Coi như / Tính là / Được xem là)",
    "shortExplanation": "Động từ biểu thị sự nhận định, quy ước hoặc công nhận một người, sự vật đạt đến tiêu chuẩn hay được đối xử như một trường hợp nào đó; 'coi như', 'tính là'.",
    "longExplanation": "'算' (suàn) ở đây là động từ phán đoán mang ý nghĩa coi là, tính là, được công nhận là. Nó dùng để khẳng định một tính chất, mức độ hoặc danh phận nào đó được công nhận, hoặc dùng để tạm quy ước một việc gì đó theo một hướng cụ thể (thường đi với '就算' - coi như là, '算作' - xem như là, '算得上' - có thể coi là). Cấu trúc này diễn tả ý 'quy ước tạm thời là như vậy' hoặc 'đạt đến tư cách/tiêu chuẩn để được tính là...'. Tương đương với 'coi như', 'tính là', 'được xem là' trong tiếng Việt.",
    "formation": "Chủ ngữ + (就 +) 算 + (Chủ ngữ 2 +) Động từ / Danh từ / Phân câu",
    "examples": [
      {
        "translation": "Số tiền này coi như tôi cho bạn vay, tương lai lúc nào có thì trả lại tôi sau."
      }
    ]
  },
  "zh_V了掉算了_464": {
    "title": "Động từ + 了 / 掉 + 算了 (Thôi ... phứt đi cho xong / Đành ... đi cho rồi)",
    "shortExplanation": "Động từ kết hợp với bổ ngữ kết quả '了' hoặc '掉' rồi thêm '算了', biểu thị quyết định dứt khoát giải quyết một việc cho xong chuyện, không bận tâm đến nữa; '... đi cho rồi', '... cho xong'.",
    "longExplanation": "'算了' (suànle) vốn là đoản ngữ mang ý nghĩa 'thôi bỏ đi, thôi không tính tới nữa, kết thúc ở đây'. Khi kết hợp sau cấu trúc 'Động từ + 了/掉' (như '扔掉算了' - vứt đi cho xong, '退了算了' - trả lại cho rồi, '卖了算了' - bán quách đi cho xong, '吃掉算了' - ăn nốt đi cho rồi), toàn bộ cấu trúc biểu đạt một quyết định mang tính buông bỏ, dứt khoát thực hiện một hành động nào đó để kết thúc sự phiền toái, không cần phải so đo, cân nhắc thêm nữa. Tương đương với '... phứt đi cho xong', '... cho rồi', 'thôi đành ... cho xong chuyện' trong tiếng Việt.",
    "formation": "Chủ ngữ + (把 + Tân ngữ +) Động từ + 了 / 掉 + 算了",
    "examples": [
      {
        "translation": "Chẳng phải chỉ là một cái chai rỗng thôi sao? Vứt đi cho xong."
      }
    ]
  },
  "zh_作为N_465": {
    "title": "作为 + Danh từ (Giới từ chỉ tư cách / thân phận: Với tư cách là / Là một... / Xét về vai trò...)",
    "shortExplanation": "Dẫn nhập thân phận, tư cách, địa vị hoặc tính chất của người hay sự vật làm xuất phát điểm để đưa ra nhận xét hoặc hành vi; 'với tư cách là', 'là một'.",
    "longExplanation": "'作为' (zuòwéi) được dùng như một giới từ chỉ thân phận, tư cách hoặc góc độ nhìn nhận. Cụm '作为 + Danh từ' thường đứng ở đầu câu làm trạng ngữ, nêu rõ cương vị, chức trách, danh phận xã hội (như bác sĩ, thầy giáo, nhà văn, người làm cha mẹ...) hoặc bản chất, công dụng của sự vật. Qua đó, phân câu chính tiếp theo sẽ bàn luận về nghĩa vụ, đặc điểm, quan điểm hoặc hành động tương xứng với thân phận hay vị thế đó. Tương đương với 'với tư cách là', 'với vai trò là', 'là một...' trong tiếng Việt.",
    "formation": "作为 + Danh từ (thân phận / tư cách / vai trò)，Chủ ngữ + Vị ngữ",
    "examples": [
      {
        "translation": "Với tư cách là một đại văn hào, một học giả uyên bác, Lỗ Tấn rất sành ăn."
      }
    ]
  },
  "zh_曾经_466": {
    "title": "曾经 (Phó từ thời gian: Đã từng / Từng / Trước kia từng)",
    "shortExplanation": "Phó từ đứng trước động từ, biểu thị một hành động hoặc tình huống đã từng phát sinh trong quá khứ và hiện tại không còn tiếp diễn; 'từng', 'đã từng'.",
    "longExplanation": "'曾经' (céngjīng) là phó từ chỉ thời gian mang sắc thái trang trọng, thường dùng trong cả văn viết và lời nói chuẩn mực. Nó đứng trước động từ (thường đi kèm với trợ từ động thái '过' hoặc '了') để khẳng định một hành động, trải nghiệm hoặc trạng thái nào đó đã từng xuất hiện ở một thời điểm trong quá khứ nhưng nay đã chấm dứt hoàn toàn. Cấu trúc phủ định thường dùng '不曾' (văn viết) hoặc '从来没有' (khẩu ngữ). Tương đương với 'đã từng', 'từng', 'trước kia từng' trong tiếng Việt.",
    "formation": "Chủ ngữ + 曾经 + Động từ (+ 过 / 了) (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Khổng Tử từng dẫn theo học trò chu du các nước trong suốt 14 năm để truyền bá tư tưởng của mình."
      }
    ]
  },
  "zh_毕竟_467": {
    "title": "毕竟 (Phó từ ngữ khí: Rốt cuộc / Dù sao thì / Nói cho cùng)",
    "shortExplanation": "Phó từ biểu thị việc truy tìm đến tận cùng bản chất, kết luận chung quy lại hoặc lý do căn bản nhất không thể phủ nhận; 'rốt cuộc', 'dù sao thì'.",
    "longExplanation": "'毕竟' (bìjìng) là phó từ ngữ khí thường dùng để nhấn mạnh kết luận tất yếu, chân lý căn bản hoặc nguyên nhân cốt lõi sau khi đã trải qua mọi khó khăn, suy xét đa chiều. Có hai trường hợp sử dụng điển hình: Một là sau khi trải qua nhiều trắc trở hoặc biến cố, cuối cùng đạt được một kết quả (như trong câu 'mặc dù khó khăn nhưng rốt cuộc đã hoàn thành'); hai là dùng để nêu lên một sự thật hiển nhiên hoặc nguyên nhân căn bản không thể thay đổi để giải thích hoặc tha thứ cho ai đó (như 'anh ấy dù sao cũng chỉ là một đứa trẻ'). Tương đương với 'rốt cuộc', 'dù sao thì', 'nói cho cùng' trong tiếng Việt.",
    "formation": "Chủ ngữ + (nhưng / tuy nhiên +) 毕竟 + Vị ngữ (hoặc: 毕竟 + Chủ ngữ + Vị ngữ)",
    "examples": [
      {
        "translation": "Tuy chúng tôi đã gặp phải rất nhiều khó khăn, nhưng rốt cuộc cũng đã hoàn thành nhiệm vụ."
      }
    ]
  },
  "zh_逐渐_468": {
    "title": "逐渐 (Phó từ chỉ phương thức / thời gian: Dần dần / Từng bước / Dần dà)",
    "shortExplanation": "Phó từ biểu thị sự biến đổi về số lượng, mức độ hoặc trạng thái diễn ra một cách từ từ, tuần tự theo thời gian; 'dần dần', 'từng bước'.",
    "longExplanation": "'逐渐' (zhújiàn) là phó từ mang phong cách văn viết tao nhã, biểu thị sự thay đổi hoặc phát triển của sự vật theo tiến trình thời gian một cách êm thấm, có trật tự và từng bước một. Nó dùng để miêu tả một quá trình tiệm tiến, không diễn ra đột ngột hay tức thì, thường đứng trước động từ hoặc tính từ biểu thị sự biến hóa (như 提高 - nâng cao, 习惯 - quen dần, 恢复 - phục hồi, 减少 - giảm bớt...). Tương đương với 'dần dần', 'từng bước', 'dần dà' trong tiếng Việt.",
    "formation": "Chủ ngữ + 逐渐 + Động từ / Tính từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Thức ăn ngày càng ít đi, ông lão buộc phải dần dần hạn chế khẩu phần ăn của bầy khỉ."
      }
    ]
  },
  "zh_或许_469": {
    "title": "或许 (Phó từ phỏng đoán: Có lẽ / Có thể / Biết đâu chừng / Họa chăng)",
    "shortExplanation": "Phó từ biểu thị sự suy đoán không chắc chắn về một khả năng có thể phát sinh; tương đương với '也许', '可能', nghĩa là 'có lẽ', 'biết đâu'.",
    "longExplanation": "'或许' (huòxǔ) là phó từ phỏng đoán mang sắc thái trang nhã, thường dùng trong cả khẩu ngữ văn nhã lẫn văn viết. Nó biểu thị sự nhận định của người nói về một khả năng có thể xảy ra nhưng không dám khẳng định hoàn toàn. '或许' có thể đứng trước chủ ngữ hoặc sau chủ ngữ (trước vị ngữ). Thường dùng khi đưa ra quan điểm dè dặt, mềm mỏng hoặc dự đoán về tương lai. Tương đương với 'có lẽ', 'có thể', 'biết đâu chừng' trong tiếng Việt.",
    "formation": "(Chủ ngữ +) 或许 (+ Chủ ngữ +) Động từ / Tính từ / Phân câu",
    "examples": [
      {
        "translation": "Tuy trước đây cô ấy không ủng hộ bạn, nhưng có lẽ lần này sẽ có sự thay đổi."
      }
    ]
  },
  "zh_V过来_470": {
    "title": "Động từ / Tính từ + 过来 (Bổ ngữ xu hướng mở rộng: Hồi phục / Tỉnh lại / Trở lại trạng thái bình thường)",
    "shortExplanation": "Bổ ngữ xu hướng phái sinh '过来' đứng sau động từ hoặc tính từ, biểu thị sự chuyển biến trở lại trạng thái tỉnh táo, bình thường, tích cực hoặc khỏe mạnh ban đầu; 'lại', 'trở lại'.",
    "longExplanation": "'过来' (guòlai) khi đóng vai trò bổ ngữ xu hướng phái sinh (mở rộng) có ý nghĩa diễn tả sự hồi phục hoặc chuyển biến tích cực. Nó biểu thị người hoặc trạng thái từ trạng thái bất thường, nguy hiểm, mê man, tiêu cực hoặc lệch lạc quay trở lại trạng thái bình thường, tỉnh táo, khỏe mạnh hoặc đúng đắn ban đầu. Thường kết hợp với các động từ/tính từ như '醒' (tỉnh), '明白' (hiểu ra), '清醒' (tỉnh táo), '缓' (hồi sức), '救' (cứu sống), '改' (sửa đổi)... Tương đương với 'lại', 'trở lại', 'hồi phục lại' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ / Tính từ (醒 / 清醒 / 缓 / 救 / 改...) + 过来",
    "examples": [
      {
        "translation": "Mãi một hồi lâu sau, đầu óc mới tỉnh táo trở lại."
      }
    ]
  },
  "zh_V得过来V不过来_471": {
    "title": "Động từ + 得过来 / 不过来 (Bổ ngữ khả năng: Làm xuể / Không làm xuể, kham nổi / không kham nổi)",
    "shortExplanation": "Bổ ngữ khả năng biểu thị khả năng có thể hoàn thành, ứng phó hoặc đảm đương hết khối lượng công việc, số lượng sự vật quá nhiều hay không; '... xuể / không ... xuể'.",
    "longExplanation": "'V 得过来' và thể phủ định 'V 不过来' là cấu trúc bổ ngữ khả năng chỉ mức độ kham nổi, ứng phó nổi trước khối lượng công việc, nhiệm vụ hoặc số lượng sự vật quá lớn trong một thời gian nhất định. Thể khẳng định 'V 得过来' mang nghĩa có đủ thời gian, sức lực hoặc khả năng để làm hết, quản hết; thể phủ định 'V 不过来' biểu thị số lượng quá nhiều hoặc việc quá dồn dập khiến một người không thể cáng đáng, làm xuể hoặc xoay xở kịp (như '忙不过来' - bận không xuể, '数不过来' - đếm không xuể, '看不过来' - nhìn không xuể, '照顾不过来' - chăm sóc không xuể). Tương đương với 'làm xuể / không làm xuể', 'kham nổi / không kham nổi' trong tiếng Việt.",
    "formation": "Chủ ngữ + (Tân ngữ / Số lượng nhiều +) Động từ + 得过来 / 不过来",
    "examples": [
      {
        "translation": "Ngôi sao trên trời nhiều như thế, ai mà đếm cho xuể được chứ?"
      }
    ]
  },
  "zh_所_472": {
    "title": "所 (Lượng từ: Cơ quan, trường học, bệnh viện, nhà cửa...)",
    "shortExplanation": "Lượng từ dùng cho các cơ quan, tổ chức, trường học, bệnh viện, viện nghiên cứu hoặc công trình kiến trúc nhà ở.",
    "longExplanation": "'所' (suǒ) là lượng từ chuyên dùng để đếm các đơn vị sự nghiệp, cơ quan tổ chức, cơ sở giáo dục, y tế hoặc công trình kiến trúc nhà ở (như '一所大学' - một trường đại học, '一所医院' - một bệnh viện, '一所学校' - một ngôi trường, '一所研究所' - một viện nghiên cứu, '一所房子' - một ngôi nhà). Thường mang sắc thái quy chuẩn, trang trọng hơn so với lượng từ thông dụng '个'. Tương đương với 'ngôi', 'trường', 'viện', 'căn' trong tiếng Việt.",
    "formation": "Số từ + 所 + Danh từ (trường học / bệnh viện / cơ quan / nhà ở)",
    "examples": [
      {
        "translation": "Anh ấy đến từ một trường đại học ở Bắc Kinh."
      }
    ]
  },
  "zh_S所V的_473": {
    "title": "Chủ ngữ + (所) + Động từ + 的 (Cái mà / Điều mà... làm/biểu hiện)",
    "shortExplanation": "Trợ từ '所' đặt trước động từ vị ngữ và kết hợp với '的' ở cuối, tạo thành cụm danh từ chỉ sự vật, đối tượng mà hành động hướng tới; mang sắc thái văn viết trang trọng.",
    "longExplanation": "Kết cấu 'Chủ ngữ + (所) + Động từ + 的' (Chủ ngữ + suǒ + Động từ + de) là cấu trúc định ngữ danh từ hóa mang đậm phong cách văn viết trang trọng. Trong đó, '所' là trợ từ được đặt ngay trước động từ (thường là động từ cập vật song âm tiết) có chủ ngữ làm chủ thể hành động. Toàn bộ cụm 'Chủ ngữ + 所 + Động từ + 的' đóng vai trò như một cụm danh từ làm chủ ngữ hoặc tân ngữ trong câu, biểu thị 'điều mà / thứ mà / nội dung mà chủ ngữ thực hiện'. Trong khẩu ngữ hàng ngày, '所' thường được lược bỏ, nhưng trong văn bản học thuật, tin tức, nghị luận, việc thêm '所' làm tăng tính trang trọng, nhã nhặn của câu văn. Tương đương với 'điều mà...', 'cái mà...', 'những gì mà...' trong tiếng Việt.",
    "formation": "Chủ ngữ + (所 +) Động từ + 的 (+ Danh từ trung tâm)",
    "examples": [
      {
        "translation": "Điều mà tranh sơn thủy thể hiện chính là mối quan hệ giữa con người và thiên nhiên."
      }
    ]
  },
  "zh_有所V_474": {
    "title": "有所 + Động từ (Có phần... / Đã có sự... / Đạt được mức độ nhất định)",
    "shortExplanation": "Kết cấu văn viết đứng trước động từ song âm tiết, biểu thị sự việc có phát sinh, biến đổi hoặc đạt đến một mức độ, phương diện nhất định; 'có phần...', 'đã có sự...'.",
    "longExplanation": "'有所 + Động từ' (yǒusuǒ + Động từ) là cấu trúc cố định mang phong cách văn viết trang trọng, thường dùng trong báo chí, báo cáo kinh tế, xã hội và nghiên cứu học thuật. '有所' đóng vai trò trạng ngữ đứng trước các động từ song âm tiết (chỉ sự biến đổi, hành vi hoặc phát triển, như 提高 - nâng cao, 改善 - cải thiện, 增加 - tăng thêm, 改变 - thay đổi, 了解 - tìm hiểu, 准备 - chuẩn bị). Cấu trúc này biểu thị sự việc đã diễn ra ở một phạm vi nhất định hoặc có sự chuyển biến đáng ghi nhận (dù không nhất thiết là mức độ tuyệt đối). Tương đương với 'có phần...', 'có sự...', 'đạt được mức độ... nhất định' trong tiếng Việt.",
    "formation": "Chủ ngữ + 有所 + Động từ (song âm tiết biểu thị biến đổi / phát triển)",
    "examples": [
      {
        "translation": "Cùng với sự gia tăng về độ tuổi, cảm giác hạnh phúc nơi công sở của phụ nữ đã có phần nâng cao."
      }
    ]
  },
  "zh_无所V_475": {
    "title": "无所 + Động từ (Không có gì để... / Hoàn toàn không... / Chẳng có gì phải...)",
    "shortExplanation": "Kết cấu văn viết cổ nhã đứng trước động từ song âm tiết, biểu thị hoàn toàn không có đối tượng để thực hiện hành vi, hoặc hoàn toàn không có gì phải e ngại, vướng bận.",
    "longExplanation": "'无所 + Động từ' (wú suǒ + Động từ) là cấu trúc phủ định mang đậm tính văn ngôn và thư diện ngữ, thường xuất hiện trong các thành ngữ, quán dụng ngữ cố định hoặc văn phong chính luận trang trọng. '无所' đứng trước các động từ song âm tiết (như 畏惧 - sợ hãi, 不知 - không biết, 不能 - không thể làm, 事事 - làm việc sự vụ, 顾忌 - kiêng dè, 作为 - làm nên chuyện). Nó mang ý nghĩa 'không có điều gì là...', 'hoàn toàn không có gì để...', thể hiện sự phủ định tuyệt đối. Ví dụ: '无所畏惧' (không có gì phải sợ hãi), '无所谓' (chẳng có gì đáng bận tâm / sao cũng được), '无所事事' (nhàn rỗi không làm việc gì). Tương đương với 'không có gì phải...', 'hoàn toàn không...', 'không điều gì là không...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 无所 + Động từ (song âm tiết)",
    "examples": [
      {
        "translation": "Nếu bạn kiên trì chân lý thì hoàn toàn không có gì phải sợ hãi cả."
      }
    ]
  },
  "zh_与N相当_476": {
    "title": "与 + Danh từ + 相当 (Tính từ vị ngữ: Tương đương với... / Ngang bằng với...)",
    "shortExplanation": "'相当' làm vị ngữ kết hợp với giới từ '与', biểu thị hai bên có mức độ, số lượng, năng lực hoặc điều kiện ngang bằng, tương đương nhau.",
    "longExplanation": "Trong cấu trúc '与 + Danh từ + 相当' (yǔ Danh từ xiāngdāng), '相当' đóng vai trò là một tính từ làm vị ngữ (có thể thay '与' bằng các giới từ đồng nghĩa như '跟', '和'). Cấu trúc này dùng để so sánh hai đối tượng, biểu thị chúng có trình độ, số lượng, điều kiện hoặc sức mạnh ngang ngửa nhau, không bên nào vượt trội hơn hẳn. Mang sắc thái trang trọng, khách quan, thường gặp trong các bài báo cáo, phân tích số liệu khoa học và văn bản học thuật. Tương đương với 'tương đương với...', 'ngang bằng với...', 'ngang ngửa với...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 与 / 跟 / 和 + Danh từ + 相当",
    "examples": [
      {
        "translation": "Tốc độ phản ứng của người vừa lái xe vừa nghe điện thoại tương đương với người say rượu."
      }
    ]
  },
  "zh_相当于N_477": {
    "title": "相当于 + Danh từ (Động từ mang giới từ: Tương đương với... / Bằng với...)",
    "shortExplanation": "Động từ '相当' kết hợp với giới từ '于' mang tân ngữ, biểu thị về số lượng, giá trị hoặc vai trò tương đương, bằng với một đối tượng nào đó.",
    "longExplanation": "'相当于 + Danh từ' (xiāngdāngyú Danh từ) là kết cấu động từ - giới từ cố định. Trong đó, '相当于' đóng vai trò như một ngoại động từ trực tiếp nhận danh từ/cụm danh từ làm tân ngữ phía sau. Nó biểu thị số lượng, tỷ lệ, giá trị quy đổi hoặc chức năng của chủ ngữ ngang bằng hoặc tương đương với đối tượng được nhắc đến. Thường dùng trong việc quy đổi tiền tệ, đo lường dung lượng, so sánh tỷ lệ sinh học hoặc đối chiếu tương đương. Tương đương với 'tương đương với...', 'bằng với...', 'ngang bằng với...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 相当于 + Danh từ / Cụm danh từ",
    "examples": [
      {
        "translation": "Lượng sâu bọ mà loài chim này ăn trong một ngày tương đương với trọng lượng cơ thể của chính nó."
      }
    ]
  },
  "zh_相当_478": {
    "title": "相当 + Tính từ / Động từ tâm lý (Phó từ mức độ: Khá / Rất / Hết sức)",
    "shortExplanation": "Phó từ chỉ mức độ cao, đứng trước tính từ hoặc động từ tâm lý; tương đương với '很', '十分', 'tương đối', 'khá là', 'rất'.",
    "longExplanation": "'相当' (xiāngdāng) trong trường hợp này là phó từ chỉ mức độ cao. Nó đứng trực tiếp trước tính từ hoặc động từ biểu thị trạng thái tâm lý (như 满意 - hài lòng, 喜欢 - thích, 丰富 - phong phú, 困难 - khó khăn, 复杂 - phức tạp, 成功 - thành công). Mức độ của '相当' cao hơn '比较' (khá) và tương đương với '很' hoặc '十分' (rất, vô cùng), nhưng mang sắc thái khách quan, chừng mực và trang trọng hơn. Tương đương với 'khá', 'rất', 'hết sức', 'tương đối' trong tiếng Việt.",
    "formation": "Chủ ngữ + 相当 + Tính từ / Động từ tâm lý",
    "examples": [
      {
        "translation": "Hương vị món ăn ngon tuyệt, phục vụ cũng chu đáo, tôi rất hài lòng."
      }
    ]
  },
  "zh_相当_479": {
    "title": "相当 + Lượng từ / Cụm số lượng (Định ngữ: Không nhỏ / Đáng kể / Tương đối lớn)",
    "shortExplanation": "Đứng trước cụm số lượng hoặc từ chỉ phạm vi để làm định ngữ, biểu thị số lượng hoặc quy mô đạt đến mức độ tương đối lớn, không thể xem nhẹ; 'đáng kể', 'không ít'.",
    "longExplanation": "'相当' (xiāngdāng) trong kết cấu này kết hợp với cụm từ chỉ số lượng hoặc tỷ lệ (như '相当一部分' - một bộ phận không nhỏ/đáng kể, '相当数量' - số lượng đáng kể, '相当规模' - quy mô tương đối lớn, '相当长的时间' - một khoảng thời gian khá dài) để làm định ngữ bổ nghĩa cho danh từ phía sau. Nó biểu thị số lượng, tỷ lệ hoặc mức độ đó là đáng kể, có tầm ảnh hưởng và không thể bỏ qua. Tương đương với 'đáng kể', 'không nhỏ', 'tương đối lớn', 'khá nhiều' trong tiếng Việt.",
    "formation": "相当 + 一部分 / 数量 / 规模 / Cụm số lượng + Danh từ",
    "examples": [
      {
        "translation": "Một bộ phận không nhỏ mọi người lấy mức thu nhập làm tiêu chuẩn của hạnh phúc."
      }
    ]
  },
  "zh_数sh_480": {
    "title": "数 (shǔ) (Động từ: Đếm / Điểm danh / Tính số lượng)",
    "shortExplanation": "Động từ phát âm là 'shǔ', biểu thị hành động đếm từng số một, tính toán số lượng người hoặc vật.",
    "longExplanation": "'数' khi phát âm là thanh ba (shǔ) đóng vai trò là một động từ thực thụ, mang nghĩa là đếm từng đơn vị một để xác định số lượng người, đồ vật hoặc sự việc (như '数数' - đếm số, '数钱' - đếm tiền, '数人数' - đếm sĩ số, '数一下' - đếm thử một lượt). Khác với khi đọc thanh bốn (shù) mang nghĩa là số từ/danh từ 'con số'. Tương đương với 'đếm', 'tính số lượng' trong tiếng Việt.",
    "formation": "Chủ ngữ + 数 (+ 了 / 一下) (+ Tân ngữ: con số / số lượng)",
    "examples": [
      {
        "translation": "Tôi đại khái đếm qua một lượt, trên xe có 32 học sinh."
      }
    ]
  },
  "zh_数sh_481": {
    "title": "数 (shǔ) (Động từ: Nổi trội nhất là / Đứng đầu là / Phải kể đến)",
    "shortExplanation": "Động từ phát âm là 'shǔ', dùng trong việc so sánh liệt kê để chỉ người hoặc vật nổi trội nhất, đứng đầu bảng; thường kết hợp thành '就数...', '要数...'.",
    "longExplanation": "'数' (shǔ) trong cấu trúc này là động từ dùng để chỉ sự so sánh, đánh giá nhằm nêu bật đối tượng xuất sắc, nổi bật nhất trong một tập thể hay phạm vi nhất định. Thường kết hợp trong các quán ngữ khẩu ngữ như '就数...' (nổi bật nhất phải kể đến...), '要数...' (nếu nói đến... thì đứng đầu là...), '数得着' (được xếp vào hàng nổi tiếng/nổi bật). Diễn đạt ý tôn vinh hoặc chỉ rõ người/sự vật đứng số một trong tiêu chí được nhắc tới. Tương đương với 'phải kể đến', 'đứng đầu là', 'nổi bật nhất là' trong tiếng Việt.",
    "formation": "Phân câu nêu tiêu chí so sánh (最...)，(那 / 就 / 要 +) 数 + Danh từ (người / sự vật nổi bật nhất)",
    "examples": [
      {
        "translation": "Nếu nói về người chạy nhanh nhất lớp chúng tôi, thì phải kể đến Lý Dương."
      }
    ]
  },
  "zh_数sh_482": {
    "title": "数 (shù) + Lượng từ / Danh từ đo lường (Số từ: Vài / Mấy / Hàng...)",
    "shortExplanation": "Số từ phát âm là 'shù', dùng trong văn viết đứng trước lượng từ hoặc danh từ thời gian, đơn vị đo lường; biểu thị số lượng không xác định khoảng vài, mấy; 'vài', 'mấy'.",
    "longExplanation": "'数' khi phát âm là thanh bốn (shù) đóng vai trò là một số từ phiếm chỉ trong văn viết (tương đương với '几' trong khẩu ngữ). Nó đứng trực tiếp trước các lượng từ hoặc danh từ đơn vị đo lường, thời gian (như '数日' - vài ngày, '数月' - vài tháng, '数年' - vài năm, '数小时' - vài giờ, '数次' - vài lần, '数千' - vài nghìn/hàng nghìn, '数万人' - hàng vạn người). Cấu trúc này mang sắc thái trang trọng, học thuật và ngắn gọn của văn thư diện ngữ. Tương đương với 'vài', 'mấy', 'hàng...' trong tiếng Việt.",
    "formation": "数 + Lượng từ / Danh từ đo lường (thời gian / số đếm)",
    "examples": [
      {
        "translation": "Cơn mưa rào mùa hè ở đây thông thường có thể kéo dài vài giờ đồng hồ hoặc thời gian lâu hơn nữa."
      }
    ]
  },
  "zh_以及_483": {
    "title": "以及 (Liên từ đẳng lập: Cùng với / Và / Cũng như)",
    "shortExplanation": "Liên từ văn viết dùng nối các từ, cụm từ đẳng lập; thường dẫn ra thành phần thứ yếu hoặc thành phần liệt kê cuối cùng.",
    "longExplanation": "'以及' (yǐjí) là liên từ biểu thị quan hệ liên hợp đẳng lập, chủ yếu dùng trong văn viết trang trọng, công văn báo chí và diễn văn chính thức. Nó dùng để nối các danh từ hoặc cụm danh từ đẳng lập với nhau. Trong chuỗi liệt kê gồm nhiều đối tượng, '以及' thường đặt trước đối tượng cuối cùng. Đáng chú ý, các thành phần đứng trước '以及' thường là đối tượng chính hoặc quan trọng hơn, còn thành phần đứng sau '以及' thường mang tính bổ sung, thứ yếu hoặc có phạm vi nhỏ hơn. Không dùng '以及' để nối hai mệnh đề độc lập có quan hệ nguyên nhân - kết quả. Tương đương với 'cùng với', 'và', 'cũng như' trong tiếng Việt.",
    "formation": "Danh từ 1、Danh từ 2 + 以及 + Danh từ 3 (thành phần sau cùng / bổ sung)",
    "examples": [
      {
        "translation": "Lãnh đạo, giáo viên của nhà trường cùng với một số đại biểu học sinh đã theo dõi buổi biểu diễn."
      }
    ]
  },
  "zh_程度_484": {
    "title": "程度 (Danh từ: Mức độ / Trình độ)",
    "shortExplanation": "Danh từ chỉ cấp bậc, giới hạn hoặc tình trạng phát triển của sự vật; thường dùng trong kết cấu 'đạt đến / phát triển đến mức độ...'.",
    "longExplanation": "'程度' (chéngdù) là danh từ chỉ mức độ, trình độ hoặc giới hạn đạt tới của một trạng thái, tính chất hoặc sự việc. Nó thường xuất hiện trong các kết cấu định lượng hoặc bổ ngữ như '达到 / 发展到 + (Tính từ + 的) + 程度' (đạt đến / phát triển tới mức độ...), '在某种程度上' (ở một mức độ nào đó), '程度很深' (mức độ rất sâu sắc). Cấu trúc này dùng để diễn đạt ranh giới, cấp độ phát triển của một sự việc cụ thể. Tương đương với 'mức độ', 'trình độ', 'chừng mực' trong tiếng Việt.",
    "formation": "Chủ ngữ + 发展到 / 达到 + (Tính từ + 的) + 程度",
    "examples": [
      {
        "translation": "Vấn đề đã phát triển tới mức độ hết sức nghiêm trọng."
      }
    ]
  },
  "zh_更何况_485": {
    "title": "(更)何况 (Liên từ tăng tiến: Huống hồ / Huống chi / Huống chi là)",
    "shortExplanation": "Liên từ dùng ở đầu phân câu sau, biểu thị mối quan hệ tăng tiến rõ rệt; thường kết hợp thành '连...都..., (更)何况...呢' để nhấn mạnh điều hiển nhiên; 'huống hồ', 'huống chi'.",
    "longExplanation": "'(更)何况' ((gèng) hékuàng) là liên từ biểu thị quan hệ tăng tiến sâu sắc. Nó thường dùng ở phân câu sau để bổ sung một lý do hoặc đối tượng có tính chất rõ rệt, hiển nhiên hơn nhiều so với đối tượng ở phân câu trước. Thường đi kèm với cấu trúc nhấn mạnh '连……都 / 也……，(更)何况……呢' (ngay cả... còn..., huống hồ... sao?). Ngoài ra, '何况' cũng có thể đứng ở vế sau để bổ sung thêm một lý do mang tính quyết định nhằm thuyết phục người nghe. Phía sau thường mang ngữ khí phản vấn với trợ từ '呢'. Tương đương với 'huống hồ', 'huống chi', 'nói chi đến' trong tiếng Việt.",
    "formation": "连 + Danh từ 1 + 都 / 也 + Vị ngữ，(更)何况 + Danh từ 2 (+ 呢)？",
    "examples": [
      {
        "translation": "Đến cả các vận động viên còn không hài lòng, huống hồ là những người hâm mộ theo dõi trận đấu?"
      }
    ]
  },
  "zh_何必_486": {
    "title": "何必 (Phó từ phản vấn: Hà tất / Việc gì phải / Cần gì phải)",
    "shortExplanation": "Phó từ ngữ khí phản vấn đứng trước động từ, biểu thị ý nghĩa không cần thiết phải làm như vậy; 'việc gì phải', 'cần gì phải', 'hà tất'.",
    "longExplanation": "'何必' (hébì) là phó từ ngữ khí mang giọng điệu phản vấn sâu sắc, tương đương với '为什么一定要' (tại sao nhất thiết phải...) hoặc '用不着' (không cần thiết/không cần làm vậy). Nó đứng trước vị ngữ động từ, dùng để nhắc nhở, khuyên can hoặc phản bác, cho rằng một hành động nào đó là dư thừa, phiền toái hoặc không đáng phải bỏ công sức ra làm. Cuối câu thường kết hợp với trợ từ ngữ khí '呢' để làm tăng âm hưởng phản vấn và khuyên nhủ. Tương đương với 'việc gì phải', 'hà tất phải', 'cần gì phải' trong tiếng Việt.",
    "formation": "Chủ ngữ + 何必 + Động từ / Cụm động từ (+ 呢)？",
    "examples": [
      {
        "translation": "Bạn việc gì phải tự mình đi giao một chuyến chứ? Gọi một shipper chuyển phát nhanh không phải là được rồi sao?"
      }
    ]
  },
  "zh_多亏_487": {
    "title": "多亏 (Phó từ / Động từ: Nhờ có / May mà / May nhờ)",
    "shortExplanation": "Biểu thị nhờ có sự giúp đỡ, điều kiện thuận lợi hoặc may mắn mà tránh được rủi ro, tai họa hoặc đạt được kết quả tốt; 'nhờ có', 'may mà'.",
    "longExplanation": "'多亏' (duōkuī) là phó từ hoặc động từ thường dùng trong khẩu ngữ và văn viết, mang ý nghĩa cảm kích, may mắn. Từ này dùng để nêu ra một nguyên nhân, nhân tố tích cực hoặc sự giúp đỡ quý báu của người khác (hoặc hoàn cảnh may mắn), nhờ đó mà người nói tránh được tổn thất, tai nạn hoặc giải quyết được khó khăn và nhận được kết quả tốt đẹp. Thường kết hợp trong các cặp ngữ khí: '多亏……，才……' (nhờ có... mới...), '多亏……，否则 / 不然 / 要不然……' (may mà... nếu không thì...). Tương đương với 'nhờ có', 'may mà', 'may nhờ' trong tiếng Việt.",
    "formation": "多亏 + Danh từ / Mệnh đề (，Chủ ngữ + 才 / 就 / 不然……)",
    "examples": [
      {
        "translation": "Nhờ có câu nói này của anh ấy mà mọi người như bừng tỉnh khỏi cơn mê."
      }
    ]
  },
  "zh_所谓_488": {
    "title": "所谓 (Tính từ / Từ hạn định: Cái gọi là... / Được gọi là)",
    "shortExplanation": "Dùng trước danh từ để chỉ 'cái được gọi là'; hoặc dùng để thể hiện thái độ nghi ngờ, mỉa mai, không công nhận tính chuẩn xác của tên gọi; 'cái gọi là'.",
    "longExplanation": "'所谓' (suǒwèi) là tính từ mang sắc thái thư diện ngữ, gồm '所' (cái mà) và '谓' (nói là, gọi là). Cấu trúc này có hai cách dùng chính: một là dùng một cách trung tính để dẫn dắt, giải thích định nghĩa của một khái niệm chuyên môn hay thuật ngữ (mang nghĩa 'cái mà người ta gọi là...'); hai là thường gặp trong khẩu ngữ và chính luận, đứng trước danh từ (thường đặt trong dấu ngoặc kép) nhằm biểu thị thái độ hoài nghi, châm biếm, phê phán hoặc không thừa nhận, ngụ ý rằng sự vật đó hữu danh vô thực, không xứng đáng với cái tên ấy. Tương đương với 'cái gọi là...' trong tiếng Việt.",
    "formation": "(Chủ ngữ +) 所谓 (+ 的) + Danh từ (hoặc: 所谓 + Danh từ + ，就是……)",
    "examples": [
      {
        "translation": "Cái gọi là 'tin tức' của anh ta, thật ra chúng tôi đã sớm biết từ lâu rồi!"
      }
    ]
  },
  "zh_N则VA_489": {
    "title": "Danh từ + 则 + Động từ / Tính từ (Phó từ chuyển ngoặt, đối chiếu: Còn... thì / Ngược lại thì)",
    "shortExplanation": "Phó từ '则' đứng sau chủ ngữ của phân câu sau, biểu thị sự tương phản, đối chiếu giữa hai sự vật hoặc hai hành động; 'còn... thì', 'ngược lại'.",
    "longExplanation": "'则' (zé) ở đây là một phó từ nối mang phong cách văn viết trang trọng. Khi đặt trong cấu trúc 'Danh từ + 则 + Động từ / Tính từ' ở phân câu thứ hai, '则' đứng ngay sau chủ ngữ mới để tạo sự đối sánh rõ rệt với chủ ngữ hoặc tình huống đã nêu ở phân câu trước. Thường đi kèm với liên từ '而' tạo thành kết cấu đối lập '……，而 [Danh từ] 则……' (người kia làm thế này, còn tôi thì làm thế kia). Cấu trúc này giúp câu văn khúc chiết, mạch lạc và mang tính học thuật cao. Tương đương với 'còn... thì', 'ngược lại thì', 'trong khi đó... thì' trong tiếng Việt.",
    "formation": "Phân câu 1，(而 +) Danh từ / Đại từ + 则 + Động từ / Tính từ",
    "examples": [
      {
        "translation": "Sau khi tốt nghiệp trung học, anh ấy đã đi du học nước ngoài, còn tôi thì luôn ở lại trong nước."
      }
    ]
  },
  "zh_则_490": {
    "title": "…… 则 …… (Liên từ điều kiện văn ngôn: Hễ... thì... / Nếu... thì... / Có... thì...)",
    "shortExplanation": "Liên từ mang phong cách thư diện ngữ biểu thị quan hệ điều kiện - kết quả hoặc quy luật tất yếu; 'nếu... thì', 'hễ... là'.",
    "longExplanation": "'则' (zé) ở đây là liên từ có nguồn gốc từ Hán văn cổ, dùng để liên kết vế điều kiện (giả thiết) và vế kết quả. Khi đặt giữa hai vế, '则' biểu thị rằng một khi điều kiện phía trước xảy ra hoặc được thỏa mãn, thì kết quả phía sau đương nhiên sẽ xuất hiện theo một quy luật khách quan. Cấu trúc này thường được dùng theo từng cặp song hành đối xứng (như 'hễ có điều kiện thì có kết quả' hoặc '有……则……，无……则……'), tạo nên nhịp điệu ngắn gọn, súc tích và trang trọng. Tương đương với 'hễ... thì', 'nếu... thì' trong tiếng Việt.",
    "formation": "Điều kiện 1 + 则 + Kết quả 1，Điều kiện 2 + 则 + Kết quả 2 (hoặc: Điều kiện + 则 + Kết quả)",
    "examples": [
      {
        "translation": "Mùa đông ở Bắc Kinh, có gió thì lạnh, không có gió thì ấm áp."
      }
    ]
  },
  "zh_则_491": {
    "title": "Số từ + 则 (Lượng từ: Mẩu / Bản / Điều / Đoạn / Bài)",
    "shortExplanation": "Lượng từ dùng cho tin tức, mẩu tin, thông báo, mẩu chuyện ngụ ngôn, quảng cáo hoặc điều khoản; 'mẩu tin', 'bản tin', 'điều'.",
    "longExplanation": "'则' (zé) ở đây là lượng từ thuộc phong cách thư diện ngữ trang trọng. Nó chuyên dùng để đếm các văn bản, phân đoạn thông tin ngắn độc lập có nội dung hoàn chỉnh, tiêu biểu như: tin tức báo chí ('一则新闻' - một mẩu tin tức), thông báo thông tri ('一则通知' - một bản thông báo), mẩu quảng cáo ('一则广告' - một mẩu quảng cáo), truyện ngụ ngôn ('一则寓言' - một mẩu chuyện ngụ ngôn) hoặc câu chuyện cười ngắn ('一则笑话'). Tương đương với 'mẩu', 'bản', 'bài', 'tin', 'điều' trong tiếng Việt.",
    "formation": "Số từ + 则 + Danh từ (tin tức / thông báo / quảng cáo / ngụ ngôn / chuyện cười)",
    "examples": [
      {
        "translation": "Trên tờ báo hôm nay có một mẩu tin vô cùng quan trọng."
      }
    ]
  },
  "zh_为S所V_492": {
    "title": "为 + Chủ thể hành động + 所 + Động từ (Câu bị động cổ điển: Được / Bị ... bởi ...)",
    "shortExplanation": "Kết cấu bị động mang phong cách thư diện ngữ trang trọng; '为' dẫn nhập chủ thể gây ra hành động, '所' đứng trước động từ vị ngữ; 'được / bị... bởi...'.",
    "longExplanation": "'为……所……' (wéi ... suǒ ...) là cấu trúc câu bị động cổ điển bắt nguồn từ Hán ngữ cổ đại, vẫn được sử dụng rộng rãi trong tiếng Hán hiện đại thuộc các văn bản văn học, chính luận, khoa học và tin tức trang trọng. Trong cấu trúc này: '为' đóng vai trò giới từ dẫn nhập chủ thể thực hiện hành vi (tác nhân), còn '所' là trợ từ đặt trực tiếp trước động từ chính nhằm bổ trợ và làm nổi bật tính bị động của hành động. Động từ thường là động từ đơn âm tiết hoặc song âm tiết có tính chuyển tác (như yòng, chēngdào, xīyǐn, zhìfú, pòhuài, liǎojiě). Tương đương với 'được... bởi...', 'bị... làm cho...' trong tiếng Việt.",
    "formation": "Chủ ngữ (đối tượng chịu tác động) + 为 + Chủ thể hành động + 所 + Động từ",
    "examples": [
      {
        "translation": "Có khoa học rồi, thiên nhiên có thể được con người tận dụng một cách tốt hơn."
      }
    ]
  },
  "zh_V起_493": {
    "title": "Động từ + 起 (Bổ ngữ xu hướng / Bổ ngữ kết quả: Bắt đầu làm / Nhắc đến / Hướng lên)",
    "shortExplanation": "Bổ ngữ biểu thị phương hướng từ dưới lên trên; hoặc biểu thị bắt đầu đề cập, nói tới một chủ đề; 'lên', 'nhắc đến'.",
    "longExplanation": "'Động từ + 起' (qǐ) là dạng rút gọn của bổ ngữ xu hướng hoặc bổ ngữ kết quả '起来'. Nó mang các ý nghĩa ngữ pháp quan trọng: thứ nhất, chỉ phương hướng chuyển động thực tế từ dưới lên trên (như '举起' - giơ lên, '抬起' - nhấc lên, '升起' - bay lên); thứ hai, thường kết hợp với các động từ tri giác, phát ngôn, tư duy (như '谈起' - bàn luận tới, '说起' - nói tới, '提起' - nhắc đến, '想起' - nhớ ra/nghĩ tới) để biểu thị việc bắt đầu khơi mào hoặc đề cập tới một chủ đề cụ thể trong cuộc đối thoại; thứ ba, biểu thị hành vi khép lại hoặc gắn kết (như '关起门' - đóng cửa lại, '收起' - cất gọn đi). Tương đương với 'lên', 'nhắc đến', 'nói tới' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ + 起 (+ Tân ngữ)",
    "examples": []
  },
  "zh_V得过_495": {
    "title": "Động từ + 得过 (Bổ ngữ khả năng: Thắng được / Vượt qua được / Đọ lại được)",
    "shortExplanation": "Bổ ngữ khả năng biểu thị có năng lực so tài và chiến thắng, vượt qua đối thủ trong một hành động; 'thắng được', 'đọ lại được'.",
    "longExplanation": "'Động từ + 得过' (dé guò) là kết cấu bổ ngữ khả năng chỉ mức độ cạnh tranh hoặc so sánh năng lực. Trong đó '过' mang ý nghĩa vượt qua, thắng thế. Cấu trúc này khẳng định chủ thể có đủ bản lĩnh, trình độ, năng lực để vượt qua hoặc đánh bại đối phương trong một hành động cụ thể (như '说得过' - nói lý lẽ thắng được/cãi thắng, '打得过' - đánh thắng được/đánh lại được, '跑得过' - chạy nhanh hơn, '比得过' - so bì thắng được). Dạng phủ định tương ứng là 'Động từ + 不过' (không đọ lại, không thắng nổi). Thường dùng trong các ngữ cảnh tranh luận, thi đấu thể thao hoặc so kè bản lĩnh. Tương đương với 'thắng được', 'vượt qua được', 'đọ lại được' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ + 得过 + Tân ngữ (đối thủ cạnh tranh)",
    "examples": [
      {
        "translation": "Khi bàn luận về chuyện quân sự với người khác, không ai có thể nói lại được anh ấy."
      }
    ]
  },
  "zh_迟早_496": {
    "title": "迟早 (Phó từ thời gian: Sớm muộn gì cũng / Trước sau gì cũng)",
    "shortExplanation": "Biểu thị sự việc nhất định sẽ xảy ra trong tương lai, chỉ là vấn đề thời gian diễn ra sớm hay muộn; 'sớm muộn', 'trước sau gì cũng'.",
    "longExplanation": "'迟早' (chízǎo) là phó từ chỉ thời gian, kết hợp giữa '迟' (muộn) và '早' (sớm). Từ này dùng để khẳng định một quy luật khách quan hoặc phán đoán chắc chắn rằng một sự việc nhất định sẽ xảy ra hoặc một mục tiêu, kết cục tất yếu sẽ thành hiện thực trong tương lai, chỉ là chưa xác định chính xác thời điểm sớm hay muộn mà thôi. Trong câu, '迟早' làm trạng ngữ đứng trước động từ vị ngữ, thường đi kèm với các phó từ hoặc trợ động từ chỉ xu hướng tất yếu như '会' (sẽ), '都' (đều), '要' (phải). Đồng nghĩa với '早晚'. Tương đương với 'sớm muộn gì cũng', 'trước sau gì cũng' trong tiếng Việt.",
    "formation": "Chủ ngữ + 迟早 + (都 +) 会 / 要 + Động từ / Tính từ",
    "examples": [
      {
        "translation": "Cùng với sự phát triển của công nghệ mạng, những vấn đề này sớm muộn gì cũng sẽ được giải quyết."
      }
    ]
  },
  "zh_再三_497": {
    "title": "再三 (Phó từ tần suất: Năm lần bảy lượt / Hết lần này đến lần khác / Nhiều lần)",
    "shortExplanation": "Phó từ biểu thị hành động được thực hiện lặp đi lặp lại nhiều lần với thái độ nghiêm túc, thận trọng; 'năm lần bảy lượt', 'nhiều lần'.",
    "longExplanation": "'再三' (zàisān) là phó từ chỉ tần suất và mức độ lặp lại mang tính trang trọng, gồm 'tái' (lại) và 'tam' (ba, phiếm chỉ nhiều lần). Từ này nhấn mạnh một hành vi mang ý thức chủ quan cao được thực hiện lặp đi lặp lại nhiều lần với thái độ hết sức thận trọng, tha thiết hoặc kiên trì. Khác với phó từ '屡次' (chỉ số lần xảy ra khách quan), '再三' chuyên đi kèm với các động từ chỉ sự suy nghĩ, dặn dò, đề nghị, khuyên can hoặc nhấn mạnh (như '再三考虑' - suy nghĩ kỹ nhiều lần, '再三叮嘱' - dặn đi dặn lại, '再三强调' - nhấn mạnh nhiều lần, '再三劝阻' - hết lời can ngăn, '再三道歉' - xin lỗi năm lần bảy lượt). Tương đương với 'năm lần bảy lượt', 'nhiều lần', 'hết lần này đến lần khác' trong tiếng Việt.",
    "formation": "Chủ ngữ + 再三 + Động từ (khuyên can / dặn dò / suy nghĩ / nhấn mạnh...)",
    "examples": [
      {
        "translation": "Mẹ của Triệu Quát đã năm lần bảy lượt khuyên ngăn Triệu Vương bổ nhiệm con trai mình làm đại tướng."
      }
    ]
  },
  "zh_即_498": {
    "title": "即 (Động từ phán đoán văn ngôn: Tức là / Chính là / Nghĩa là)",
    "shortExplanation": "Động từ biểu thị sự phán đoán hoặc giải thích định nghĩa trong phong cách thư diện ngữ trang trọng; tương đương với '就是', 'tức là'.",
    "longExplanation": "'即' (jí) là động từ phán đoán có nguồn gốc từ Hán văn cổ, rất phổ biến trong văn phong học thuật, khoa học, định nghĩa từ điển và tin tức hiện đại. Nó tương đương với '就是' trong khẩu ngữ, dùng để nối giữa một khái niệm, thuật ngữ, từ ngữ hoặc hiện tượng phía trước với lời giải thích, làm rõ bản chất, nội dung cụ thể ở phía sau. Cấu trúc này làm câu văn trở nên cô đọng, khúc chiết và đậm chất văn phong thư diện ngữ. Tương đương với 'tức là', 'chính là', 'nghĩa là' trong tiếng Việt.",
    "formation": "Thuật ngữ / Khái niệm + ，即 + Lời giải thích / Mệnh đề",
    "examples": [
      {
        "translation": "'Đán' là một chữ tượng hình, tức là mặt trời mọc lên từ đường chân trời."
      }
    ]
  },
  "zh_即_499": {
    "title": "…… 即 …… (Phó từ nối tiếp: Hễ... là lập tức... / Vừa... là... liền)",
    "shortExplanation": "Phó từ mang phong cách thư diện ngữ biểu thị sự tiếp nối nhanh chóng, tức thì giữa hành động và phản ứng; 'hễ... là...', 'vừa... là... liền'.",
    "longExplanation": "'即' (jí) ở đây là phó từ nối tiếp thư diện ngữ, tương đương với '就' (thì, là, liền) trong khẩu ngữ. Khi dùng giữa hai hành động hoặc giữa điều kiện và kết quả, '即' biểu thị rằng ngay sau khi tình huống thứ nhất phát sinh thì hành vi thứ hai lập tức diễn ra mà không hề có sự trì hoãn hay ngập ngừng. Cấu trúc này thường kết hợp thành các cấu trúc 4 chữ, thành ngữ hoặc các phân câu đối xứng ngắn gọn, nhịp nhàng (như '不懂即问' - không hiểu là hỏi ngay, '召之即来' - gọi là đến ngay, '稍纵即逝' - hơi lơ là là biến mất ngay, '非此即彼' - không phải cái này thì là cái kia). Tương đương với 'hễ... là lập tức...', 'vừa... là... liền' trong tiếng Việt.",
    "formation": "Điều kiện / Hành động 1 + 即 + Hành động 2 / Kết quả",
    "examples": [
      {
        "translation": "Không hiểu là hỏi ngay chính là ưu điểm lớn nhất của anh ấy, cũng là nguyên nhân chính dẫn đến thành công của anh."
      }
    ]
  },
  "zh_个别V_500": {
    "title": "个别 + Động từ (Phó từ làm trạng ngữ: Riêng lẻ / Từng người một / Riêng biệt)",
    "shortExplanation": "Từ '个别' làm trạng ngữ đứng trước động từ, biểu thị hành động được thực hiện riêng biệt với từng cá nhân hoặc đơn vị; 'riêng lẻ', 'từng người một'.",
    "longExplanation": "'个别' (gèbié) khi đóng vai trò trạng ngữ đứng trước động từ vị ngữ, biểu thị phương thức tiến hành hành động mang tính chất riêng biệt, đơn lẻ, làm việc riêng với từng cá nhân thay vì giải quyết chung cho cả tập thể. Cấu trúc này thường đi kèm với các động từ giao tiếp, trao đổi, hướng dẫn như '谈话' (nói chuyện/trao đổi), '辅导' (phụ đạo/kèm cặp), '通知' (thông báo), '处理' (xử lý). Thường xuất hiện trong kết cấu '采取个别……的方式' (áp dụng phương thức... riêng lẻ). Tương đương với 'riêng lẻ', 'từng người một', 'riêng biệt' trong tiếng Việt.",
    "formation": "Chủ ngữ + (采取 +) 个别 + Động từ (+ 的方式 / 形式)",
    "examples": [
      {
        "translation": "Anh ấy thường áp dụng hình thức trò chuyện riêng với từng người để tìm hiểu tình hình và giải quyết vấn đề."
      }
    ]
  },
  "zh_个别N_501": {
    "title": "个别 + Danh từ (Định ngữ: Cá biệt / Một vài / Số ít ngoại lệ)",
    "shortExplanation": "Từ '个别' làm định ngữ đứng trước danh từ, biểu thị số lượng cực kỳ ít ỏi, mang tính ngoại lệ hiếm hoi trong một tập thể; 'cá biệt', 'một vài'.",
    "longExplanation": "'个别' (gèbié) khi đóng vai trò định ngữ đứng trước danh từ, mang ý nghĩa chỉ một số lượng rất ít, cực kỳ hiếm thấy hoặc mang tính ngoại lệ đặc biệt trong một tổng thể rộng lớn. Nó thường đối lập với '多数' (đa số), '普遍' (phổ biến) hoặc '大家' (mọi người). Danh từ kết hợp thường chỉ người, hiện tượng, trường hợp, địa điểm (như '个别人' - một vài cá nhân riêng lẻ, '个别现象' - hiện tượng cá biệt, '个别情况' - trường hợp cá biệt, '个别地方' - một vài nơi hiếm hoi). Thường xuất hiện trong cấu trúc loại trừ như '除了个别……以外' (ngoại trừ một số ít... ra). Tương đương với 'cá biệt', 'một vài', 'số ít ngoại lệ' trong tiếng Việt.",
    "formation": "个别 + Danh từ (người / hiện tượng / trường hợp / nơi chốn)",
    "examples": [
      {
        "translation": "Trừ một vài cá nhân cá biệt ra, cân nặng của đa số mọi người đều bắt đầu tăng từ ngày thứ Bảy."
      }
    ]
  },
  "zh_非_502": {
    "title": "非 (Phó từ ngữ khí: Nhất quyết / Khăng khăng / Nằng nặc đòi)",
    "shortExplanation": "Phó từ biểu thị ý chí kiên quyết, khăng khăng đòi làm một việc gì đó bất chấp sự khuyên ngăn của người khác; 'nhất quyết', 'nằng nặc'.",
    "longExplanation": "'非' (fēi) ở đây là phó từ ngữ khí biểu thị ý muốn kiên quyết, cố chấp hoặc nằng nặc đòi làm một điều gì đó. Nó nhấn mạnh ý chí chủ quan mạnh mẽ của người nói hoặc chủ ngữ, thường bất chấp hoàn cảnh bất lợi hay sự can ngăn của mọi người xung quanh. Trong khẩu ngữ, '非' rất thường kết hợp với trợ động từ '要' hoặc '得' tạo thành cụm '非要' hoặc '非得' (nhất quyết phải...). Thường đi kèm với phân câu sau diễn tả sự bất lực của người khác hoặc hậu quả tất yếu (như '谁也拦不住' - không ai cản nổi). Tương đương với 'nhất quyết', 'khăng khăng', 'nằng nặc đòi' trong tiếng Việt.",
    "formation": "Chủ ngữ + 非 (要 / 得) + Động từ / Mệnh đề",
    "examples": [
      {
        "translation": "Anh ta nằng nặc đòi ly hôn, chúng tôi chẳng một ai cản nổi."
      }
    ]
  },
  "zh_非_503": {
    "title": "非 (Tiền tố / Phó từ phủ định: Phi, không phải, phi-)",
    "shortExplanation": "Dùng trước danh từ hoặc tính từ làm tiền tố cấu tạo từ mang nghĩa 'không phải', 'phi-'; hoặc làm phó từ phủ định mang sắc thái văn viết trang trọng; 'phi', 'không phải'.",
    "longExplanation": "'非' (fēi) có nguồn gốc từ Hán văn cổ, trong tiếng Hán hiện đại thường được sử dụng theo hai cách chính: thứ nhất, đóng vai trò như một tiền tố (phụ tố trước) kết hợp với danh từ hoặc tính từ để tạo thành từ ghép biểu thị sự đối lập hoặc không thuộc phạm trù đó (như '非正常' - bất thường, '非正式' - không chính thức, '非法人' - không có tư cách pháp nhân, '非法' - phi pháp, '非金属' - phi kim); thứ hai, đóng vai trò phó từ phủ định tương đương với '不是' (không phải là) trong các câu văn viết trang trọng, nghị luận hoặc ngạn ngữ. Tương đương với tiền tố 'phi-', 'không phải' trong tiếng Việt.",
    "formation": "非 + Danh từ / Tính từ (tạo thành từ phức: 非正常 / 非法 / 非正式……) (hoặc: Chủ ngữ + 非 + Danh từ / Động từ)",
    "examples": [
      {
        "translation": "Khi xuất hiện tình huống bất thường xin đừng căng thẳng."
      }
    ]
  },
  "zh_并非_504": {
    "title": "并非 (Phó từ phủ định: Hoàn toàn không phải, thực sự không phải)",
    "shortExplanation": "Phó từ mang sắc thái văn viết trang trọng, là dạng kết hợp của '并' và '非', tương đương '并不是'; dùng để nhấn mạnh phủ định và đính chính sự thật; 'hoàn toàn không phải'.",
    "longExplanation": "'并非' (bìngfēi) là sự kết hợp chặt chẽ giữa phó từ nhấn mạnh '并' và từ phủ định văn ngôn '非' (tương đương với '并不是' trong khẩu ngữ). Từ này dùng để nhấn mạnh ngữ khí phủ định, thường nhằm bác bỏ một quan điểm sai lầm, định kiến hoặc sự suy đoán chủ quan của người khác, từ đó đưa ra sự thật khách quan. Thường xuất hiện sau các từ nối mang ý chuyển ngoặt như '其实', '然而', '但是'. Tương đương với 'hoàn toàn không phải là', 'thực ra không phải', 'tuyệt nhiên không phải' trong tiếng Việt.",
    "formation": "Chủ ngữ + 并非 + Danh từ / Động từ / Tính từ (+ như vậy / đến mức đó)",
    "examples": [
      {
        "translation": "Thành công đôi khi hoàn toàn không khó như tưởng tượng."
      }
    ]
  },
  "zh_以_505": {
    "title": "以 (Giới từ / Liên từ: Lấy, dùng, căn cứ vào, để / nhằm)",
    "shortExplanation": "Giới từ hoặc liên từ mang phong cách thư diện ngữ trang trọng; biểu thị phương tiện, căn cứ ('lấy', 'dùng', 'dựa vào') hoặc biểu thị mục đích ('để', 'nhằm').",
    "longExplanation": "'以' (yǐ) là một hư từ cực kỳ quan trọng và đa nghĩa có nguồn gốc từ Hán văn cổ. Trong tiếng Hán hiện đại, từ này chủ yếu được dùng trong văn viết và các ngữ cảnh trang trọng với hai vai trò chính: (1) Làm giới từ, biểu thị phương tiện, công cụ, tư cách, hoặc căn cứ (tương đương với '用', '拿', '凭借', '按', '根据' - như '以理服人' lấy lý lẽ phục vụ lòng người, '以身作则' lấy mình làm gương, '以事实为依据' lấy sự thật làm căn cứ, '以……为名' nhân danh...); (2) Làm liên từ nối hai hành động hoặc mệnh đề để biểu thị mục đích (tương đương với '以便', '来' - như '制定法律以保障公民权利' ban hành luật nhằm bảo đảm quyền công dân). Tương đương với 'lấy', 'dùng', 'dựa vào', 'nhằm', 'để' trong tiếng Việt.",
    "formation": "Chủ ngữ + 以 + Danh từ (phương tiện / căn cứ / tư cách) + Động từ (hoặc: Mệnh đề hành động + 以 + Mệnh đề mục đích)",
    "examples": [
      {
        "translation": "-"
      }
    ]
  },
  "zh_平常_506": {
    "title": "平常 (Tính từ: Bình thường, thông thường, phổ thông)",
    "shortExplanation": "Tính từ chỉ tính chất bình thường, phổ biến, không có gì nổi bật hay kỳ lạ; thường dùng dạng phủ định '不平常' để nhấn mạnh sự phi thường, đặc biệt; 'bình thường'.",
    "longExplanation": "'平常' (píngcháng) khi đóng vai trò tính từ miêu tả sự vật, sự việc, hiện tượng hoặc con người có tính chất bình thường, giản dị, phổ thông, không có điểm gì xuất chúng hay kỳ lạ khác người. Có thể đứng trước danh từ làm định ngữ (như '平常人' - người bình thường, '平常事' - chuyện thường tình), làm vị ngữ (như '相貌平常' - tướng mạo bình thường) hoặc bổ ngữ. Trong thực tế, từ này rất thường kết hợp với phó từ phủ định thành '不平常' (không hề bình thường, phi thường, bất phàm) để nhấn mạnh tầm quan trọng hoặc tính đặc thù của một thời khắc, sự kiện lịch sử hay con người. Tương đương với 'bình thường', 'thông thường' trong tiếng Việt.",
    "formation": "(Chủ ngữ +) (很 / 不 +) 平常 (+ 的 + Danh từ)",
    "examples": [
      {
        "translation": "Đối với Tiểu Vương mà nói, hôm nay là một ngày không hề bình thường."
      }
    ]
  },
  "zh_平常_507": {
    "title": "平常 (Danh từ thời gian / Phó từ: Bình thường, thường ngày, mọi khi)",
    "shortExplanation": "Chỉ khoảng thời gian thông thường, những ngày bình thường không có biến cố hay khác biệt; thường đứng trước động từ làm trạng ngữ; 'bình thường', 'thường ngày', 'mọi khi'.",
    "longExplanation": "'平常' (píngcháng) khi dùng như danh từ chỉ thời gian hoặc phó từ, có ý nghĩa chỉ khoảng thời gian thông thường, những ngày bình thường hoặc thói quen diễn ra đều đặn từ trước tới nay (tương đương với '平时' - bình thường, thường ngày). Nó thường đứng ở đầu câu hoặc đứng trước cụm vị ngữ làm trạng ngữ thời gian, nhằm đối chiếu với một tình huống đặc biệt, ngoại lệ vừa mới xảy ra trong hiện tại (thường kết hợp với '但是', '今天却……'). Tương đương với 'bình thường', 'thường ngày', 'mọi khi', 'hằng ngày' trong tiếng Việt.",
    "formation": "(Chủ ngữ +) 平常 + (总 / 都 / 经常 +) Động từ / Tính từ (hoặc: 平常，Chủ ngữ + Động từ……)",
    "examples": [
      {
        "translation": "Anh ấy ngày thường luôn đến rất sớm, nhưng hôm nay lại đến muộn."
      }
    ]
  },
  "zh_宁可_508": {
    "title": "宁可……也…… (Liên từ lựa chọn: Thà rằng... cũng... / Thà... chứ không...)",
    "shortExplanation": "Liên từ biểu thị sự cân nhắc giữa hai tình huống bất lợi, chấp nhận chịu đựng điều thứ nhất để tránh xảy ra điều thứ hai tệ hại hơn; 'thà', 'thà rằng'.",
    "longExplanation": "'宁可' (nìngkě) là liên từ biểu thị quan hệ lựa chọn trong thế cân nhắc được mất. Khi đối mặt với hai sự việc đều mang tính chất bất lợi hoặc khó khăn, người nói quyết định chấp nhận hy sinh, chịu đựng phương án thứ nhất (dù gian khổ, thiệt thòi) chứ dứt khoát không chịu chấp nhận phương án thứ hai tồi tệ hơn. Thường kết hợp chặt chẽ với '也' hoặc '决不' trong cặp kết cấu '宁可……，也 / 决不……' (thà... chứ quyết không...). Đồng nghĩa với '宁愿', '宁肯'. Tương đương với 'thà rằng', 'thà... còn hơn...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 宁可 + Phương án chịu thiệt / hy sinh，也 + (不 / 决不 +) Phương án từ chối",
    "examples": [
      {
        "translation": "Là một người mẹ, cô ấy thà bản thân chịu mệt một chút, chứ không muốn để con mình phải chịu thiệt thòi."
      }
    ]
  },
  "zh_极其_509": {
    "title": "极其 (Phó từ mức độ: Cực kỳ, vô cùng, hết sức)",
    "shortExplanation": "Phó từ chỉ mức độ rất cao, đứng trước tính từ song âm tiết hoặc động từ tâm lý; mang sắc thái trang trọng, văn viết; 'cực kỳ', 'vô cùng', 'hết sức'.",
    "longExplanation": "'极其' (jíqí) là phó từ chỉ mức độ tuyệt đối cao, mang phong cách văn viết trang trọng, học thuật và tin tức báo chí. Từ này thường bổ nghĩa cho tính từ song âm tiết (như '极其重要' - cực kỳ quan trọng, '极其危险' - cực kỳ nguy hiểm, '极其严峻' - cực kỳ nghiêm trọng) hoặc động từ tâm lý (như '极其渴望' - vô cùng khao khát). Mức độ của '极其' cao hơn '很' và '非常', tương đương với '极度' (cực độ). Tương đương với 'cực kỳ', 'vô cùng', 'hết sức' trong tiếng Việt.",
    "formation": "极其 + Tính từ song âm tiết / Động từ tâm lý",
    "examples": []
  },
  "zh_其余_511": {
    "title": "其余 (Đại từ: Còn lại, phần còn lại, những người còn lại)",
    "shortExplanation": "Đại từ chỉ người hoặc vật còn lại sau khi đã trừ đi một bộ phận đã được đề cập; 'còn lại', 'những cái khác'.",
    "longExplanation": "'其余' (qíyú) là đại từ chỉ định mang sắc thái văn viết và trung tính. Từ này dùng để chỉ toàn bộ những người, sự vật hoặc phần còn lại trong một chỉnh thể sau khi đã tách riêng hoặc nhắc tới một bộ phận cụ thể trước đó. Có thể đứng độc lập làm chủ ngữ, tân ngữ (như '其余都很好' - những cái còn lại đều rất tốt) hoặc làm định ngữ đứng trước danh từ (thường có trợ từ kết cấu '的', như '其余的同学' - các bạn học còn lại, '其余的钱' - số tiền còn lại). Tương đương với 'còn lại', 'phần còn lại', 'những người khác' trong tiếng Việt.",
    "formation": "其余 (+ 的) + Danh từ (hoặc: 其余 + Động từ / Vị ngữ)",
    "examples": [
      {
        "translation": "Sao chỉ có hai người các bạn vậy? Những bạn học còn lại đâu rồi?"
      }
    ]
  },
  "zh_由此可见_512": {
    "title": "(由此) 可见 (Cụm từ liên kết: Từ đó có thể thấy, qua đó thấy rằng)",
    "shortExplanation": "Cụm từ liên kết mang tính lập luận, đứng đầu mệnh đề sau để rút ra nhận định, kết luận tất yếu từ tiền đề hoặc sự thật vừa nêu; 'từ đó có thể thấy'.",
    "longExplanation": "'(由此) 可见' ((yóucǐ) kějiàn) là cụm từ liên kết logic mang phong cách lập luận, nghị luận và học thuật. Trong đó '由此' có nghĩa là 'từ điểm này / từ việc này', còn '可见' mang nghĩa 'có thể thấy được rằng / có thể suy ra rằng'. Khi đứng ở đầu phân câu hoặc đầu đoạn văn sau một loạt chứng cứ hay sự kiện thực tế, cụm từ này dùng để dẫn dắt một kết luận mang tính quy luật, một nhận xét xác đáng hoặc một bài học sâu sắc rút ra từ những gì đã nói ở trước. Tương đương với 'từ đó có thể thấy', 'qua đó cho thấy', 'bởi thế mới thấy' trong tiếng Việt.",
    "formation": "Tiền đề / Hiện tượng thực tế ，(由此) 可见 + Mệnh đề kết luận / Đánh giá",
    "examples": [
      {
        "translation": "Từ đó có thể thấy rằng, thành công là cần phải nỗ lực."
      }
    ]
  },
  "zh_N般_513": {
    "title": "Danh từ + 般 (Trợ từ so sánh: Như..., tựa như..., giống như...)",
    "shortExplanation": "Trợ từ so sánh đứng sau danh từ tạo thành cụm từ mang ý nghĩa 'giống như', 'tựa như'; thường kết hợp với '的' làm định ngữ hoặc '地' làm trạng ngữ; 'như...'.",
    "longExplanation": "'般' (bān) là một trợ từ so sánh (tỉ huống trợ từ) mang màu sắc văn học, thi vị và giàu tính hình tượng. Khi đứng ngay sau một danh từ ('Danh từ + 般'), cấu trúc này tạo thành một cụm từ biểu thị sự ví von, so sánh mức độ hoặc hình dáng tương tự như sự vật đó (tương đương với '像……一样' trong khẩu ngữ). Thường đi kèm với trợ từ kết cấu '的' để bổ nghĩa cho danh từ phía sau làm định ngữ (như '阳光般的笑容' - nụ cười như ánh mặt trời, '大海般的胸怀' - tấm lòng bao la như biển cả) hoặc đi kèm với '地' làm trạng ngữ bổ nghĩa cho động từ (như '飞一般地跑' - chạy như bay). Tương đương với 'như...', 'tựa như...' trong tiếng Việt.",
    "formation": "Danh từ + 般 (+ 的 + Danh từ) (hoặc: Danh từ + 般 + 地 + Động từ)",
    "examples": [
      {
        "translation": "Trên gương mặt cô ấy nở nụ cười rạng rỡ như ánh mặt trời."
      }
    ]
  },
  "zh_闻_514": {
    "title": "闻 (Động từ: Ngửi, ngửi thấy mùi)",
    "shortExplanation": "Động từ biểu thị hành động dùng mũi để cảm nhận hoặc ngửi mùi hương, mùi vị; 'ngửi', 'ngửi thấy'.",
    "longExplanation": "'闻' (wén) trong tiếng Hán hiện đại có nghĩa thông dụng nhất trong đời sống hàng ngày là động từ chỉ hành động dùng khứu giác (mũi) để ngửi, cảm nhận mùi vị hoặc hương thơm của sự vật. Động từ này có thể mang tân ngữ chỉ mùi vị (như '闻味儿' - ngửi mùi, '闻花香' - ngửi hương hoa), có thể dùng theo dạng lặp động từ '闻了闻' hoặc '闻一闻' để biểu thị hành động ngửi thử ngắn gọn, hoặc kết hợp với bổ ngữ kết quả '到' / '见' tạo thành '闻到' / '闻见' (ngửi thấy). Tương đương với 'ngửi', 'ngửi thấy' trong tiếng Việt.",
    "formation": "Chủ ngữ + 闻 (+ 一闻 / 了闻) (+ Tân ngữ / Bổ ngữ kết quả: 到 / 见)",
    "examples": [
      {
        "translation": "Anh ấy mở nắp bình ra, ngửi ngửi một chút, hóa ra là rượu."
      }
    ]
  },
  "zh_闻_515": {
    "title": "闻 (Động từ văn ngôn: Nghe, nghe thấy, nghe nói)",
    "shortExplanation": "Động từ mang sắc thái văn ngôn cổ điển, biểu thị hành động nghe thấy, nghe kể lại hoặc hay tin; thường xuất hiện trong thành ngữ, ngạn ngữ hoặc văn viết; 'nghe'.",
    "longExplanation": "'闻' (wén) theo nghĩa gốc trong Hán văn cổ là động từ biểu thị thính giác: nghe, nghe thấy, nghe nói lại (tương đương với '听' hoặc '听说' trong khẩu ngữ hiện đại). Trong tiếng Hán hiện đại, nghĩa này được lưu giữ và sử dụng rộng rãi trong các thành ngữ, quán dụng ngữ cố định (như '百闻不如一见' - trăm nghe không bằng một thấy, '闻名' - nghe tiếng tăm, '听而不闻' - nghe mà như không nghe thấy, '闻所未闻' - chưa từng nghe thấy bao giờ) cũng như trong văn phong tin tức báo chí, thư diện ngữ trang trọng (như '新闻' - tin tức mới nghe được, '闻讯' - nghe được tin báo). Tương đương với 'nghe', 'nghe thấy', 'nghe nói' trong tiếng Việt.",
    "formation": "闻 + Danh từ (thường trong thành ngữ / từ ghép: 百闻不如一见 / 闻名 / 闻所未闻……)",
    "examples": [
      {
        "translation": "Trăm nghe không bằng một thấy."
      }
    ]
  },
  "zh_趁_516": {
    "title": "趁 (Giới từ: Nhân lúc, tranh thủ, thừa dịp)",
    "shortExplanation": "Giới từ chỉ sự nắm bắt và tận dụng thời cơ, điều kiện thuận lợi hoặc thời điểm thích hợp để thực hiện hành động; 'nhân lúc', 'thừa dịp', 'tranh thủ'.",
    "longExplanation": "'趁' (chèn) là giới từ dùng để chỉ hành vi nắm bắt, lợi dụng triệt để một điều kiện khách quan, khoảng thời gian ngắn hoặc cơ hội thuận lợi nhất định trước khi tình huống đó thay đổi, nhằm thực hiện một việc mong muốn. Theo sau '趁' thường là cụm từ chỉ thời gian, trạng thái hoặc mệnh đề điều kiện (như '趁热吃' - ăn lúc còn nóng, '趁年轻' - nhân lúc còn trẻ, '趁现在' - tranh thủ lúc này, '趁机' - thừa cơ hội). Câu chứa '趁' thường nêu ra cơ hội ở phân câu trước và hành động cần tranh thủ thực hiện ở phân câu sau. Tương đương với 'nhân lúc', 'thừa dịp', 'tranh thủ' trong tiếng Việt.",
    "formation": "趁 + Thời gian / Cơ hội / Trạng thái (，Chủ ngữ +) Động từ",
    "examples": [
      {
        "translation": "Nhân lúc phim còn chưa bắt đầu, tôi đi mua hai chai nước khoáng."
      }
    ]
  },
  "zh_V不起_517": {
    "title": "Động từ + 不起 (Bổ ngữ khả năng: Không nổi, không kham nổi (về tiền bạc, sức chịu đựng, tư cách))",
    "shortExplanation": "Dạng phủ định của bổ ngữ khả năng 'Động từ + 得起', biểu thị không có đủ tiền bạc, năng lực, địa vị hoặc sức chịu đựng để thực hiện hành động; 'không nổi', 'không kham nổi'.",
    "longExplanation": "'Động từ + 不起' (bù qǐ) là kết cấu bổ ngữ khả năng phủ định phổ biến. Cấu trúc này thường dùng trong 3 trường hợp chính: (1) Chỉ điều kiện kinh tế, tiền bạc không đủ khả năng chi trả, mua sắm (như '买不起' - không đủ tiền mua nổi, '住不起' - không đủ tiền thuê/ở nổi, '吃不起' - không đủ tiền ăn nổi); (2) Chỉ sức chịu đựng về mặt tâm lý, thể xác hoặc hậu quả vượt quá giới hạn chịu nổi (như '经不起' - không chịu nổi thử thách, '受不起' - không gánh nổi, '伤不起' - không chịu nổi tổn thương); (3) Mang hàm ý coi thường, xem nhẹ (như '看不起' - coi thường, khinh thường). Tương đương với 'không nổi', 'không kham nổi', 'không có tiền để...' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ + 不起 (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Nhà anh ấy rất nghèo, không có tiền mua nổi đèn dầu, cứ hễ đến tối là không thể đọc sách."
      }
    ]
  },
  "zh_V得起_518": {
    "title": "Động từ + 得起 (Bổ ngữ khả năng: Có đủ khả năng, kham nổi, chịu đựng được, xứng đáng với)",
    "shortExplanation": "Dạng khẳng định của bổ ngữ khả năng, biểu thị có đủ tài chính, bản lĩnh hoặc sức chịu đựng để gánh vác, vượt qua thử thách; 'kham nổi', 'chịu đựng được', 'xứng đáng'.",
    "longExplanation": "'Động từ + 得起' (dé qǐ) là kết cấu bổ ngữ khả năng khẳng định (đối lập với 'Động từ + 不起'). Cấu trúc này dùng để biểu thị: (1) Có đủ năng lực kinh tế, tiền tài để trang trải các chi phí đắt đỏ (như '买得起' - mua nổi/đủ tiền mua, '住得起' - có tiền ở/thuê nổi); (2) Có đủ sức bền, phẩm chất, nghị lực để chống chọi và vượt qua được gian nan, thử thách (như '经得起考验' - chịu đựng được thử thách, '经得起批评' - tiếp thu được phê bình, '担得起责任' - gánh vác nổi trách nhiệm); (3) Xứng đáng với sự kỳ vọng, tin cậy (như '对得起' - xứng đáng với / không phụ lòng). Tương đương với 'kham nổi', 'chịu đựng được', 'đủ tiền để...', 'xứng đáng với' trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ + 得起 (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Người bạn vượt qua được thử thách của thời gian mới được tính là người bạn thực sự."
      }
    ]
  },
  "zh_支_519": {
    "title": "支 (Động từ: Chống / Đỡ / Kê / Dựng)",
    "shortExplanation": "Động từ biểu thị dùng tay hoặc điểm tựa để chống đỡ vật thể từ bên dưới không cho đổ sụp; hoặc dựng lên; 'chống', 'đỡ', 'dựng'.",
    "longExplanation": "'支' (zhī) là động từ biểu thị hành động dùng tay, cơ thể hoặc một vật tựa, cột chống nhằm đỡ một vật thể từ bên dưới để giữ cho nó đứng vững hoặc không bị đổ sụp xuống. Thường dùng trong các tư thế thân thể (như '支着脑袋' - chống đầu suy nghĩ, '支着下巴' - chống cằm, '支着身子' - chống người dậy) hoặc dựng các đồ vật có khung, cột chống (như '支帐篷' - dựng lều, '支起铁锅' - kê dựng nồi). Thường đi kèm với trợ từ động thái '着' hoặc bổ ngữ xu hướng '起 / 起来'. Tương đương với 'chống', 'đỡ', 'kê', 'dựng' trong tiếng Việt.",
    "formation": "Chủ ngữ + 支 + (着 / 起 / 起来 +) Tân ngữ (đầu / cằm / thân thể / lều bạt...)",
    "examples": [
      {
        "translation": "Hai tay anh ấy đặt lên bàn, chống đầu suy nghĩ sự việc."
      }
    ]
  },
  "zh_支_520": {
    "title": "Số từ + 支 (Lượng từ: Cây, khẩu, bài, đạo, đoàn, đội [dùng cho súng, bút, bài hát, đội quân])",
    "shortExplanation": "Lượng từ dùng cho đồ vật hình que dài (súng, bút); bài hát, khúc nhạc; hoặc đơn vị quân đội, đội ngũ hợp thành; 'khẩu', 'cây', 'bài', 'đội'.",
    "longExplanation": "'支' (zhī) là lượng từ đa dụng trong tiếng Hán, dùng để đếm trong các trường hợp chính sau: thứ nhất, đếm các vật thể thon dài, cứng cáp hoặc vũ khí cán dài/cầm tay như bút, súng, mũi tên, nến ('一支笔' - một cây bút, '一支枪' - một khẩu súng, '一支箭' - một mũi tên); thứ hai, đếm các bản nhạc, bài hát ('一支歌' - một bài hát, '一支乐曲' - một khúc nhạc); thứ ba, đếm lực lượng vũ trang, đoàn thể, đội ngũ quân sự hay thể thao mang tính tổ chức ('一支军队' - một đội quân, '一支队伍' - một đoàn quân/đội ngũ, '一支登山队' - một đoàn leo núi). Tương đương với 'khẩu', 'cây', 'bài', 'đội', 'đoàn' trong tiếng Việt.",
    "formation": "Số từ + 支 + Danh từ (súng / bút / bài hát / đội quân / đoàn thể)",
    "examples": [
      {
        "translation": "Cho anh ấy mười khẩu súng, anh ấy liền có thể dựng nên một đội quân."
      }
    ]
  },
  "zh_凭_521": {
    "title": "凭 (Giới từ / Động từ: Dựa vào / Dựa trên / Nhờ vào)",
    "shortExplanation": "Biểu thị lấy một điều kiện, căn cứ, bằng chứng hay năng lực nào đó làm cơ sở để hành động; 'dựa vào', 'dựa trên', 'nhờ vào'.",
    "longExplanation": "'凭' (píng) là giới từ hoặc động từ rất thông dụng trong cả khẩu ngữ và văn viết. Từ này dùng để nêu ra chỗ dựa, căn cứ, điều kiện tiên quyết, tư cách hoặc năng lực thực tế để tiến hành một hoạt động (như '凭经验' - dựa vào kinh nghiệm, '凭本事' - dựa vào năng lực, '凭票入场' - vào cửa dựa trên vé). Thường kết hợp với các phó từ hạn định như '光 / 单 / 就' tạo thành '光凭……' (chỉ dựa vào...), '单凭……' (chỉ dựa trên...), '就凭……' (chỉ bằng.../chỉ dựa vào...). Tương đương với 'dựa vào', 'dựa trên', 'nhờ vào', 'căn cứ vào' trong tiếng Việt.",
    "formation": "Chủ ngữ + (光 / 单 / 就 +) 凭 + Danh từ (kinh nghiệm / năng lực / giấy tờ / căn cứ) + Động từ / Mệnh đề",
    "examples": [
      {
        "translation": "Làm công việc không thể chỉ dựa vào kinh nghiệm, mà còn cần phải có sự đổi mới sáng tạo."
      }
    ]
  },
  "zh_硬V_522": {
    "title": "硬 + Động từ (Phó từ: Cố gượng / Gắng gượng / Cắn răng làm)",
    "shortExplanation": "Phó từ biểu thị dù gặp khó khăn, đau đớn hoặc không muốn nhưng vẫn cố gắng gượng, cắn răng dùng sức hoặc ý chí để thực hiện; 'cố gượng', 'cắn răng'.",
    "longExplanation": "'硬' (yìng) ở đây là một phó từ đứng trước động từ vị ngữ, biểu thị hành động được thực hiện trong hoàn cảnh vô cùng khó khăn, bất lợi, đau đớn hoặc khi bản thân chủ thể không hề muốn nhưng vẫn gắng gượng, cắn răng dùng sức mạnh ý chí hoặc sức lực cơ bắp để hoàn thành cho bằng được. Thường dùng với các động từ chỉ sự chịu đựng, nuốt, cố nhét, chống đỡ (như '硬喝' - cắn răng uống, '硬撑' - cố gượng chống đỡ, '硬咽' - cố nuốt vào, '硬挤' - cố chen vào). Tương đương với 'cố gượng', 'gắng gượng', 'cắn răng mà...', 'miễn cưỡng làm' trong tiếng Việt.",
    "formation": "Chủ ngữ + 硬 + Động từ (+ Bổ ngữ / Tân ngữ)",
    "examples": [
      {
        "translation": "Tuy thuốc bắc hơi đắng, nhưng anh ấy vẫn cắn răng uống hết."
      }
    ]
  },
  "zh_硬V_523": {
    "title": "硬 (要) + Động từ (Phó từ: Khăng khăng / Cố chấp / Nhất quyết đòi làm)",
    "shortExplanation": "Phó từ biểu thị sự bướng bỉnh, cố chấp, khăng khăng làm theo ý mình bất chấp sự can ngăn hoặc phản đối của người khác; 'khăng khăng', 'cứ nhất quyết'.",
    "longExplanation": "'硬' (yìng) ở nghĩa này là phó từ biểu thị tính khí cố chấp, ngoan cố hoặc khăng khăng làm một việc gì đó bất chấp lời khuyên bảo, sự can ngăn hay phản đối của mọi người xung quanh. Trong ngữ cảnh này, '硬' rất thường đi liền với trợ động từ '要' tạo thành cụm '硬要 + Động từ' (khăng khăng muốn...), hoặc kết hợp với các động từ phán đoán, phát ngôn như '硬说' (khăng khăng cho là), '硬赖' (cố tình đổ lỗi). Tương đương với 'khăng khăng', 'cố chấp', 'cứ nhất định', 'cứ nằng nặc đòi làm' trong tiếng Việt.",
    "formation": "Chủ ngữ + 硬 (要) + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Tôi không cho anh ấy đi, anh ấy cứ khăng khăng đòi đi."
      }
    ]
  },
  "zh_偶然的_524": {
    "title": "偶然的 + Danh từ (Tính từ làm định ngữ: Ngẫu nhiên / Tình cờ / Bất ngờ)",
    "shortExplanation": "Tính từ làm định ngữ đứng trước danh từ, biểu thị sự việc xảy ra bất ngờ, tình cờ mà không được dự tính hay sắp đặt trước; 'ngẫu nhiên', 'tình cờ'.",
    "longExplanation": "'偶然' (ǒurán) là tính từ chỉ tính chất phát sinh một cách bất ngờ, ngẫu nhiên, không theo quy luật tất yếu và không được lên kế hoạch từ trước (trái nghĩa với '必然' - tất nhiên, tất yếu). Khi kết hợp với trợ từ kết cấu '的' tạo thành '偶然的 + Danh từ', cụm từ đóng vai trò định ngữ để tu từ và định tính cho các danh từ chỉ sự việc, cơ hội, cuộc gặp gỡ hay phát hiện (như '偶然的相遇' - cuộc hội ngộ tình cờ, '偶然的机会' - cơ hội ngẫu nhiên, '偶然的发现' - phát hiện tình cờ). Tương đương với 'ngẫu nhiên', 'tình cờ', 'bất ngờ' trong tiếng Việt.",
    "formation": "偶然的 + Danh từ (cuộc gặp gỡ / cơ hội / phát hiện / sự kiện...)",
    "examples": [
      {
        "translation": "Đó là một lần gặp gỡ tình cờ."
      }
    ]
  },
  "zh_偶然V_525": {
    "title": "偶然 + Động từ (Phó từ: Thỉnh thoảng / Đôi khi / Đôi lúc / Tình cờ)",
    "shortExplanation": "Phó từ làm trạng ngữ đứng trước động từ, biểu thị một hành động thỉnh thoảng, đôi khi mới xảy ra; hoặc tình cờ xảy ra; 'thỉnh thoảng', 'đôi lúc'.",
    "longExplanation": "'偶然' (ǒurán) ở đây đóng vai trò phó từ làm trạng ngữ đứng trước động từ, biểu thị tần suất thưa thớt, không thường xuyên, chỉ thỉnh thoảng hoặc đôi khi mới diễn ra (nghĩa tương đương với '偶尔'). Trong văn cảnh này, '偶然' thường kết hợp với '也' hoặc trợ động từ '会' tạo thành '偶然也会……' (thỉnh thoảng cũng sẽ...), dùng để miêu tả một hành động bất chợt xen kẽ vào một trạng thái tập trung kéo dài. Tương đương với 'thỉnh thoảng', 'đôi khi', 'đôi lúc', 'chốc chốc' trong tiếng Việt.",
    "formation": "Chủ ngữ + 偶然 + (也 / 会 +) Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Cô ấy chăm chú đan áo len, thỉnh thoảng cũng ngước mắt nhìn lên chiếc đồng hồ treo tường."
      }
    ]
  },
  "zh_尽快V_526": {
    "title": "尽快 + Động từ (Phó từ: Nhanh chóng / Càng sớm càng tốt / Khẩn trương làm)",
    "shortExplanation": "Phó từ làm trạng ngữ biểu thị nỗ lực đẩy nhanh tốc độ hoặc rút ngắn thời gian để hoàn thành hành động càng sớm càng tốt; 'nhanh chóng', 'càng sớm càng tốt'.",
    "longExplanation": "'尽快' (jǐnkuài - âm đọc chuẩn là thanh 3 'jǐn') là phó từ chỉ thời gian và tốc độ, cấu thành từ '尽' (hết mức có thể) và '快' (nhanh). Đứng trước động từ vị ngữ, từ này biểu thị mong muốn hoặc yêu cầu hành động cần được triển khai và hoàn thành trong thời gian ngắn nhất, không được trì hoãn hay chậm trễ. Rất thường dùng trong các thông báo hành chính, chỉ thị công việc, thư từ giao dịch và lời kêu gọi khẩn cấp (như '尽快解决' - nhanh chóng giải quyết, '尽快回复' - phản hồi càng sớm càng tốt, '尽快完成' - hoàn thành sớm nhất có thể). Tương đương với 'càng sớm càng tốt', 'nhanh chóng', 'khẩn trương' trong tiếng Việt.",
    "formation": "Chủ ngữ + 尽快 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Sản phẩm mới xuất hiện chút vấn đề, bạn và giám đốc Nhan hãy bàn bạc việc này càng sớm càng tốt."
      }
    ]
  },
  "zh_一旦V_527": {
    "title": "一旦 + Động từ (Liên từ giả thiết: Một khi... thì / Nếu như một ngày nào đó)",
    "shortExplanation": "Liên từ biểu thị điều kiện giả thiết, chỉ một khi tình huống nào đó xảy ra (thường là bất ngờ hoặc gây hậu quả lớn) thì sẽ dẫn đến kết quả tất yếu; 'một khi'.",
    "longExplanation": "'一旦' (yīdàn) là liên từ mang phong cách thư diện ngữ trang trọng, dùng ở đầu hoặc sau chủ ngữ của vế câu thứ nhất để nêu ra một giả thiết hoặc điều kiện bất thường, không xác định thời gian xảy ra (ngụ ý 'một khi đã...' hoặc 'ngộ nhỡ có một ngày nào đó...'). Sau khi điều kiện này được thỏa mãn, phân câu phía sau thường dùng phó từ '就' (thì), '便' (liền) hoặc '会' (sẽ) để dẫn xuất kết quả tất yếu, khó đảo ngược hoặc có tính chất nghiêm trọng. Tương đương với 'một khi... thì', 'ngộ nhỡ... thì' trong tiếng Việt.",
    "formation": "(Chủ ngữ +) 一旦 + Động từ / Mệnh đề ，(Chủ ngữ +) 就 / 便 / 会……",
    "examples": []
  },
  "zh_难免_529": {
    "title": "难免 (Tính từ / Phó từ: Khó tránh khỏi / Không thể tránh khỏi)",
    "shortExplanation": "Biểu thị theo quy luật tự nhiên hoặc hoàn cảnh thực tế thì một tình huống bất lợi nào đó là khó lòng tránh khỏi; 'khó tránh khỏi'.",
    "longExplanation": "'难免' (nánmiǎn) là tính từ hoặc phó từ, gồm '难' (khó) và '免' (tránh khỏi). Từ này dùng để chỉ một kết quả bất lợi, thiếu sót hoặc sai sót nào đó là điều đương nhiên sẽ xảy ra trong hoàn cảnh nhất định, rất khó để ngăn chặn hay tránh né một cách tuyệt đối. Trong câu, '难免' thường làm vị ngữ trong kết cấu '是难免的' (là điều khó tránh khỏi), hoặc làm trạng ngữ đứng trước động từ/tính từ, thường đi kèm với '会' tạo thành '难免会……' (khó tránh khỏi sẽ...). Tương đương với 'khó tránh khỏi', 'không tránh khỏi', 'tất yếu xảy ra' trong tiếng Việt.",
    "formation": "Chủ ngữ + 是难免的 (hoặc: Chủ ngữ + 难免 + (会 +) Động từ / Tính từ)",
    "examples": [
      {
        "translation": "Mới bắt đầu làm việc, những sai sót như thế này là khó tránh khỏi."
      }
    ]
  },
  "zh_自从TIME_530": {
    "title": "自从 + Mốc thời gian / Mệnh đề (Giới từ thời gian: Kể từ khi / Từ lúc)",
    "shortExplanation": "Giới từ chỉ thời gian, dẫn nhập mốc thời gian hoặc sự kiện trong quá khứ làm điểm khởi đầu cho một sự thay đổi hay phát triển liên tục; 'kể từ khi', 'từ lúc'.",
    "longExplanation": "'自从' (zìcóng) là giới từ dẫn nhập điểm xuất phát về mặt thời gian trong quá khứ. Cụm từ sau '自从' có thể là một mốc thời gian cụ thể hoặc một sự kiện, hành động đã diễn ra trong quá khứ. Cấu trúc này thường kết hợp với các từ ngữ định vị thời gian phía sau tạo thành kết cấu khung: '自从……以后' (từ sau khi...), '自从……以来' (kể từ... đến nay), hoặc '自从……起' (kể từ khi... bắt đầu). Vế câu sau miêu tả trạng thái, kết quả hoặc sự biến chuyển liên tục phát triển kéo dài cho tới hiện tại. Tương đương với 'kể từ khi', 'từ lúc', 'từ sau khi' trong tiếng Việt.",
    "formation": "自从 + Mốc thời gian / Mệnh đề quá khứ (+ 以后 / 以来 / 起) ，Chủ ngữ + Vị ngữ",
    "examples": [
      {
        "translation": "Kể từ sau khi tôi đến Bắc Kinh, sức khỏe ngày càng tốt hơn."
      }
    ]
  },
  "zh_一致_531": {
    "title": "一致 (Tính từ: Nhất trí / Thống nhất / Đồng nhất / Trùng khớp)",
    "shortExplanation": "Tính từ làm vị ngữ biểu thị ý kiến, thái độ, bước đi hoặc mục tiêu của hai hay nhiều bên hoàn toàn trùng khớp, không có mâu thuẫn; 'nhất trí', 'thống nhất'.",
    "longExplanation": "'一致' (yīzhì) là tính từ chỉ sự đồng điệu, tương đồng hoặc không mâu thuẫn giữa các bên về mặt tư tưởng, quan điểm, hành động hay phương hướng. Trong câu, '一致' thường làm vị ngữ miêu tả mối quan hệ giữa các chủ thể (thường kết hợp với các danh từ như '意见' - ý kiến, '看法' - cách nhìn, '步调' - bước đi, '利益' - lợi ích). Dạng phủ định là '不一致' (không nhất trí, bất đồng, không khớp). Tương đương với 'nhất trí', 'thống nhất', 'đồng nhất' trong tiếng Việt.",
    "formation": "Chủ ngữ (ý kiến / quan điểm / cách nhìn / bước đi) + (不 +) 一致",
    "examples": [
      {
        "translation": "Ý kiến của họ không nhất trí với nhau."
      }
    ]
  },
  "zh_一致V_532": {
    "title": "一致 + Động từ (Phó từ: Nhất trí / Đồng thanh / Cùng chung... làm gì)",
    "shortExplanation": "Phó từ làm trạng ngữ đứng trước động từ, biểu thị nhiều người hoặc tập thể có cùng chung một thái độ, hành động hoặc đưa ra cùng một quyết định; 'nhất trí', 'đồng lòng'.",
    "longExplanation": "'一致' (yīzhì) ở đây đóng vai trò phó từ làm trạng ngữ đứng trước động từ vị ngữ, biểu thị hành vi, quyết định hoặc thái độ của nhiều người trong một tập thể là hoàn toàn đồng lòng, cùng một nhịp và không có sự bất đồng. Rất thường kết hợp với các động từ phán đoán, quyết nghị, biểu quyết hoặc phát ngôn (như '一致认为' - nhất trí cho rằng, '一致通过' - nhất trí thông qua, '一致同意' - nhất trí đồng ý, '一致决定' - nhất trí quyết định). Thường dùng trong các hội nghị, văn bản báo cáo hoặc thông cáo chính thức. Tương đương với 'nhất trí', 'đồng lòng', 'đồng thanh' trong tiếng Việt.",
    "formation": "Chủ ngữ (số nhiều / tập thể) + 一致 + Động từ (cho rằng / thông qua / đồng ý / biểu quyết...)",
    "examples": [
      {
        "translation": "Các chuyên gia nhất trí cho rằng đây là một sản phẩm thành công."
      }
    ]
  },
  "zh_某MN_533": {
    "title": "某 (+ Lượng từ) + Danh từ (Đại từ bất định: ... nào đó / Mỗ / Một... nhất định)",
    "shortExplanation": "Đại từ chỉ định không xác định, dùng trước danh từ (hoặc lượng từ) để chỉ một người, vật, phương diện hoặc thời gian cụ thể mà không tiện nói rõ hoặc không cần thiết phải chỉ đích danh; '...nào đó'.",
    "longExplanation": "'某' (mǒu) là đại từ bất định mang phong cách thư diện ngữ và khẩu ngữ chuẩn mực. Từ này dùng để chỉ một đối tượng cụ thể (người, địa điểm, sự việc, khía cạnh hoặc thời điểm) mà người nói không muốn nêu đích danh, không thể nói rõ vì lý do bảo mật, hoặc không cần thiết phải chỉ ra một cách chi tiết. Khi kết hợp, '某' có thể đi kèm lượng từ hoặc trực tiếp đứng trước danh từ đơn âm tiết/song âm tiết (như '某人' - người nào đó/ông nọ, '某个方面' - một phương diện nào đó, '某一天' - một ngày nọ, '某所大学' - một trường đại học nào đó). Tương đương với '...nào đó', 'một... nhất định', 'mỗ' trong tiếng Việt.",
    "formation": "某 (+ Lượng từ) + Danh từ (người / nơi chốn / phương diện / sự việc / ngày tháng...)",
    "examples": [
      {
        "translation": "Tiến hành huấn luyện về một phương diện nào đó thì có thể nâng cao năng lực ở phương diện đó."
      }
    ]
  },
  "zh_某某_534": {
    "title": "某某 (Đại từ chỉ định: Ai đó / Người nào đó / Ông X bà Y / Mỗ mỗ)",
    "shortExplanation": "Đại từ dùng để thay thế cho tên người hoặc tên đơn vị, địa danh cụ thể khi không muốn hoặc không cần nêu đích danh; 'ai đó', 'ông X bà Y', 'mỗ mỗ'.",
    "longExplanation": "'某某' (mǒumǒu) là dạng điệp từ của đại từ '某', dùng để thay thế hoặc ám chỉ tên của một người, tổ chức hoặc địa danh cụ thể mà không tiện nói rõ, không muốn tiết lộ hoặc chỉ lấy làm ví dụ tượng trưng giả định (như '张某某' - Trương mỗ mỗ/người họ Trương, '某某单位' - đơn vị X nào đó). Rất hay xuất hiện trong các ví dụ mẫu, biên bản pháp lý, hoặc câu viết ghi dấu tượng trưng như '某某到此一游' (ai đó/ông A bà B đã đến nơi này du ngoạn). Tương đương với 'ai đó', 'người nào đó', 'ông A bà B', 'ông X', 'mỗ mỗ' trong tiếng Việt.",
    "formation": "Chủ ngữ / Định ngữ + 某某 (hoặc: Họ + 某某)",
    "examples": [
      {
        "translation": "Hành vi viết 'người nào đó từng đến đây du ngoạn' lên tường là hành vi thiếu văn minh."
      }
    ]
  },
  "zh_name某某某_535": {
    "title": "Họ + 某 / 某某 (Đại từ chỉ người: Ông/Bà X, mỗ, người mang họ...)",
    "shortExplanation": "Đại từ đi liền sau họ của người để thay thế cho tên riêng cụ thể khi không tiện nói rõ hoặc không cần thiết chỉ đích danh; 'ông/bà X', 'mỗ'.",
    "longExplanation": "'某' (mǒu) hoặc dạng điệp từ '某某' (mǒumǒu) khi đặt sau họ của một người (như '李某' - Lý mỗ, '张某某' - Trương mỗ mỗ) được dùng như một đại từ phiếm chỉ để thay thế cho tên gọi cụ thể. Thường xuất hiện trong văn bản báo chí, hồ sơ điều tra tư pháp, thông báo vụ án hoặc văn bản hành chính khi cần bảo vệ quyền riêng tư cá nhân, hoặc trong các ví dụ giả định khi không cần thiết phải xướng đích danh một người nào đó. Tương đương với 'ông Lý X', 'anh Lý nào đó', 'Lý mỗ' trong tiếng Việt.",
    "formation": "Họ + 某 / 某某 (hoặc: Chức danh / Danh từ chỉ người + Họ + 某 / 某某)",
    "examples": [
      {
        "translation": "Nhân viên kinh doanh của công ty là anh Lý X nghe được tin ấy thì mừng rỡ khôn xiết."
      }
    ]
  },
  "zh_幸亏_536": {
    "title": "幸亏 (Phó từ / Liên từ: May mà, may thay, may nhờ có)",
    "shortExplanation": "Biểu thị nhờ có một điều kiện thuận lợi hoặc hành động kịp thời mà tránh được nguy hiểm, tổn thất hay hậu quả xấu; 'may mà', 'may thay'.",
    "longExplanation": "'幸亏' (xìngkuī) là phó từ hoặc liên từ dùng ở đầu câu hoặc trước vị ngữ, biểu thị nhờ có sự xuất hiện của một nhân tố may mắn, một hành vi kịp thời hoặc sự giúp đỡ đúng lúc mà đã may mắn tránh được một tổn thất to lớn hay hậu quả tai hại. Vế câu sau thường đi kèm với các từ liên kết như '才' (mới), '否则' (nếu không thì), '要不然' (bằng không), '不然' (nhược bằng không) để làm nổi bật kết quả tốt đẹp hoặc giả định hậu quả xấu nếu không có nhân tố đó. Tương đương với 'may mà', 'may thay', 'may nhờ' trong tiếng Việt.",
    "formation": "幸亏 + Mệnh đề / Hành động ，(bằng không / nếu không thì / mới +) Mệnh đề kết quả",
    "examples": []
  },
  "zh_行动_538": {
    "title": "行动 (Danh từ: Hành động, hoạt động, chiến dịch, biện pháp thực tế)",
    "shortExplanation": "Danh từ chỉ hành vi hoặc hoạt động thực tế có kế hoạch, mục đích cụ thể nhằm đạt được kết quả đề ra; 'hành động', 'biện pháp'.",
    "longExplanation": "'行动' (xíngdòng) khi là danh từ dùng để chỉ các việc làm thực tế, hành vi cụ thể được tiến hành theo một kế hoạch hay chủ trương nhất định nhằm thực hiện mục tiêu đề ra (phân biệt với lời nói hay suy nghĩ suông). Thường kết hợp với các động từ và định ngữ như '采取行动' (áp dụng hành động), '付诸行动' (biến thành hành động thực tế), '实际行动' (hành động thiết thực), '行动计划' (kế hoạch hành động), '军事行动' (chiến dịch quân sự). Tương đương với 'hành động', 'hoạt động', 'chiến dịch' trong tiếng Việt.",
    "formation": "Chủ ngữ + (áp dụng / biến thành / thống nhất +) 行动 (hoặc: Định ngữ + 行动)",
    "examples": []
  },
  "zh_行动_540": {
    "title": "行动 (Động từ / Danh từ: Đi lại, cử động, hoạt động thân thể)",
    "shortExplanation": "Chỉ sự đi lại, di chuyển, đứng ngồi hay cử động chân tay của thân thể con người; 'đi lại', 'cử động'.",
    "longExplanation": "'行动' (xíngdòng) ở nét nghĩa này chỉ sự đi đứng, vận động thể chất, di chuyển cơ thể hoặc đi lại hàng ngày của con người. Thường dùng trong các ngữ cảnh miêu tả thể trạng, sức khỏe, bệnh tật hoặc tuổi tác khi năng lực vận động bị ảnh hưởng. Kết hợp rất phổ biến trong các cụm như '行动不便' (đi lại khó khăn, cử động bất tiện), '行动迟缓' (cử động chậm chạp lề mề), '行动敏捷' (thân thủ nhanh nhẹn hoạt bát), '自由行动' (tự do đi lại). Tương đương với 'đi lại', 'cử động', 'hoạt động thân thể' trong tiếng Việt.",
    "formation": "Chủ ngữ + 行动 + Bất tiện / Nhanh nhẹn / Chậm chạp (hoặc: 行动 + Động từ)",
    "examples": [
      {
        "translation": "Anh ấy bị thương khi chơi thể thao, việc đi lại cử động rất bất tiện."
      }
    ]
  },
  "zh_行动_541": {
    "title": "行动 (Động từ: Hành động, hoạt động, ra tay làm việc)",
    "shortExplanation": "Nội động từ biểu thị bắt tay vào thực hiện hành vi, di chuyển hoặc triển khai phương án hoạt động; 'hành động'.",
    "longExplanation": "'行动' (xíngdòng) là động từ nội động từ biểu thị việc chủ thể đích thân bắt tay vào hành động, triển khai các động thái cụ thể trong thực tế thay vì thụ động chờ đợi hay chỉ bàn suông. Thường đi kèm với các trạng ngữ chỉ phương thức, tính chất hoặc thời gian như '单独行动' (hành động một mình/đơn độc), '秘密行动' (hoạt động bí mật), '共同行动' (cùng nhau phối hợp hành động), '行动起来' (hành động ngay thôi). Tương đương với 'hành động', 'ra tay', 'tiến hành hoạt động' trong tiếng Việt.",
    "formation": "Chủ ngữ + (Trạng ngữ: đơn độc / bí mật / cùng nhau +) 行动",
    "examples": [
      {
        "translation": "Có một số loài chim thích hành động đơn độc."
      }
    ]
  },
  "zh_义务_542": {
    "title": "义务 (Danh từ: Nghĩa vụ, bổn phận, trách nhiệm pháp lý hoặc đạo đức)",
    "shortExplanation": "Danh từ chỉ trách nhiệm, bổn phận theo luật pháp hoặc đạo đức mà cá nhân phải gánh vác; 'nghĩa vụ', 'bổn phận'.",
    "longExplanation": "'义务' (yìwù) là danh từ chỉ trách nhiệm, bổn phận mà công dân, tổ chức hay cá nhân có trách nhiệm phải thực hiện theo quy định của pháp luật hoặc theo quy phạm đạo đức xã hội (đối lập hoàn toàn với '权利' - quyền lợi). Thường làm tân ngữ cho các động từ như '承担义务' (gánh vác nghĩa vụ), '履行义务' (thực hiện nghĩa vụ), '尽义务' (làm tròn bổn phận/nghĩa vụ). Tương đương với 'nghĩa vụ', 'bổn phận', 'trách nhiệm bắt buộc' trong tiếng Việt.",
    "formation": "Chủ ngữ + (gánh vác / thực hiện / làm tròn +) 义务 (hoặc: 义务 + của ai)",
    "examples": [
      {
        "translation": "Xây dựng quê hương, ai ai cũng có trách nhiệm, chúng ta cũng cần phải gánh vác nghĩa vụ này."
      }
    ]
  },
  "zh_义务_543": {
    "title": "义务 + Danh từ (Định ngữ: Tự nguyện không nhận thù lao, công ích / mang tính nghĩa vụ)",
    "shortExplanation": "Làm định ngữ trước danh từ chỉ hoạt động tự nguyện phục vụ cộng đồng không lấy thù lao; hoặc chế độ có tính nghĩa vụ bắt buộc; 'công ích', 'tình nguyện', 'nghĩa vụ'.",
    "longExplanation": "'义务' (yìwù) khi làm định ngữ tu từ cho danh từ phía sau mang hai nét nghĩa ngữ dụng đặc trưng: Thứ nhất, biểu thị các hoạt động tình nguyện cống hiến vì lợi ích công cộng, hoàn toàn miễn phí và không nhận tiền công hay thù lao (như '义务劳动' - lao động công ích/tình nguyện, '义务献血' - hiến máu nhân đạo/tình nguyện, '义务诊疗' - khám chữa bệnh từ thiện). Thứ hai, biểu thị các chế độ hay chương trình mang tính phổ cập bắt buộc theo quy định của pháp luật nhà nước (như '义务教育' - giáo dục bắt buộc). Tương đương với 'công ích', 'tình nguyện', 'từ thiện' hoặc 'nghĩa vụ' trong tiếng Việt.",
    "formation": "义务 + Danh từ (lao động / giáo dục / khám chữa bệnh / tư vấn / công tác...)",
    "examples": [
      {
        "translation": "Mỗi học kỳ chúng tôi đều phải tham gia lao động công ích tình nguyện ít nhất ba lần."
      }
    ]
  },
  "zh_朝_544": {
    "title": "朝 (Giới từ: Hướng về, về phía, đối với)",
    "shortExplanation": "Giới từ dẫn xuất phương hướng di chuyển, vị trí mục tiêu hoặc đối tượng tiếp nhận hành động; 'hướng về', 'về phía'.",
    "longExplanation": "'朝' (cháo) là giới từ dùng phổ biến trong khẩu ngữ và văn viết, đứng trước danh từ chỉ phương vị, nơi chốn hoặc đối tượng để tạo thành cụm giới từ làm trạng ngữ đứng trước động từ (công năng tương tự giới từ '向'). Biểu thị hướng di chuyển của hành động (như '朝南走' - đi về hướng nam), hướng nhìn hoặc cử chỉ (như '朝窗外看' - nhìn ra ngoài cửa sổ, '朝我摆手' - vẫy tay về phía tôi), hoặc đối tượng chịu tác động. Tương đương với 'hướng về', 'về phía', 'đối với' trong tiếng Việt.",
    "formation": "Chủ ngữ + 朝 + Phương hướng / Nơi chốn / Đối tượng + Động từ",
    "examples": []
  },
  "zh_朝_546": {
    "title": "朝 (Động từ: Quay mặt về, hướng về, trông ra [phương vị, kiến trúc])",
    "shortExplanation": "Động từ biểu thị mặt trước của nhà cửa, công trình, cửa sổ hoặc người hướng về một phương vị nhất định; 'hướng về', 'quay mặt về'.",
    "longExplanation": "'朝' (cháo) khi đóng vai trò là động từ cập vật mang nghĩa mặt tiền, chính diện của một công trình kiến trúc, phòng ốc, cửa ra vào, cửa sổ hoặc thân thể người đối diện, quay mặt thẳng về một phương vị nào đó. Thường dùng trong phong thủy kiến trúc, mô tả cấu trúc nhà đất (như '坐北朝南' - tọa bắc hướng nam, '坐西朝东' - tọa tây hướng đông, '窗户朝南' - cửa sổ hướng nam, '面朝大海' - mặt hướng ra biển lớn). Tương đương với 'hướng về', 'quay về', 'nhìn ra' trong tiếng Việt.",
    "formation": "Danh từ (cửa / cửa sổ / nhà cửa...) + 朝 + Phương vị từ (đông / tây / nam / bắc...)",
    "examples": [
      {
        "translation": "Cổng chính của trường chúng tôi tọa lạc ở phía tây, hướng mặt về phía đông."
      }
    ]
  },
  "zh_简直_547": {
    "title": "简直 (Phó từ: Quả thực, quả là, tưởng chừng như, chẳng khác nào)",
    "shortExplanation": "Phó từ biểu thị ngữ khí nhấn mạnh hoặc khoa trương tột độ, chỉ mức độ đã hoàn toàn giống như vậy; 'quả thực', 'chẳng khác nào'.",
    "longExplanation": "'简直' (jiǎnzhí) là phó từ tu từ chỉ mức độ mang ngữ khí khoa trương, cảm thán hoặc khẳng định mạnh mẽ. Từ này đứng trước vị ngữ biểu thị sự việc, tính chất đã phát triển tới mức độ gần như tuyệt đối, hoàn toàn tương đương hoặc giống hệt như một tình huống không tưởng (như '简直是奇迹' - quả thực là kỳ tích, '简直不可思议' - quả là không thể tưởng tượng nổi). Rất thường đi liền với '是' (là), '像' (như), '太' (quá), '不能' (không thể). Tương đương với 'quả thực là', 'quả là', 'chẳng khác nào', 'tưởng như' trong tiếng Việt.",
    "formation": "Chủ ngữ + 简直 + (là / như / không thể +) Vị ngữ (Động từ / Tính từ)",
    "examples": [
      {
        "translation": "Thuyền trưởng quả thực là điên rồi!"
      }
    ]
  },
  "zh_来_548": {
    "title": "来 (Trợ từ chỉ số ước lượng: Khoảng, trạc, hơn, ngót, xấp xỉ)",
    "shortExplanation": "Trợ từ đi sau số từ hoặc lượng từ để biểu thị con số ước lượng xấp xỉ; 'khoảng', 'ngót', 'hơn'.",
    "longExplanation": "'来' (lái) là trợ từ chỉ số ước lượng, dùng để biểu thị số lượng xấp xỉ, loanh quanh con số được nhắc tới (tương tự như '左右' - khoảng chừng). Về vị trí ngữ pháp: (1) Nếu là số tròn chục trở lên (10, 20, 100...), '来' đứng liền sau số từ và đứng trước lượng từ (như '二十来个人' - khoảng chừng hai mươi người); (2) Nếu là số đơn dưới 10 đi kèm lượng từ hoặc đơn vị đo lường, '来' đứng sau lượng từ (như '五斤来重' - nặng ngót 5 cân, '三米来长' - dài chừng 3 mét). Tương đương với 'khoảng', 'ngót', 'hơn', 'chừng' trong tiếng Việt.",
    "formation": "Số từ (10, 20, 100...) + 来 + Lượng từ + Danh từ (hoặc: Số từ [dưới 10] + Lượng từ + 来 + Danh từ / Tính từ)",
    "examples": [
      {
        "translation": "Hầu như ngày nào anh ấy cũng có thể câu được con cá lớn nặng ngót nghét 5 cân."
      }
    ]
  },
  "zh_一来是二来是_549": {
    "title": "一来(是)……二来(是)…… (Liên từ: Một là... hai là..., thứ nhất là... thứ hai là...)",
    "shortExplanation": "Cặp liên từ dùng để liệt kê hai nguyên nhân, lý do hoặc mục đích song song dẫn đến hành động; 'một là... hai là...'.",
    "longExplanation": "'一来(是)……二来(是)……' (yīlái (shì)... èrlái (shì)...) là cặp liên từ dùng để trình bày phân tích tuần tự hai nguyên nhân, lý do hoặc mục đích bình đẳng cấu thành nên một hành vi, kế hoạch hay quyết định (tương đương với '一则……二则……', '第一……第二……'). Trong khẩu ngữ thường ngày, chữ '是' hoặc chữ '来' có thể linh hoạt tỉnh lược thành '一是……二是……'. Giúp diễn đạt trở nên có trật tự, lớp lang và thuyết phục hơn. Tương đương với 'một là... hai là...', 'thứ nhất là... thứ hai là...' trong tiếng Việt.",
    "formation": "Chủ ngữ + 一来(是) + Lý do / Mục đích 1 ，二来(是) + Lý do / Mục đích 2",
    "examples": [
      {
        "translation": "Tôi đến đây thăm mọi người, một là để gửi tặng hoa quả cho mọi người, hai là xem mọi người đón tết đón lễ còn có khó khăn gì không."
      }
    ]
  },
  "zh_至于_550": {
    "title": "至于 (Giới từ: Còn về, đến như, về phần [chuyển tiếp đề tài])",
    "shortExplanation": "Giới từ đứng đầu vế câu để dẫn xuất một đề tài hoặc đối tượng bàn luận mới có liên quan; 'còn về', 'đến như'.",
    "longExplanation": "'至于' (zhìyú) là giới từ dùng ở đầu vế câu thứ hai để chuyển dịch mạch diễn đạt sang một đề tài, khía cạnh hoặc đối tượng mới có liên quan đến nội dung vừa đề cập trước đó (tương đương với '关于' - về, '说到' - nói đến). Giúp phân tách rõ ràng các phương diện của sự việc, tránh nhầm lẫn và giúp câu văn mạch lạc, chặt chẽ. Tương đương với 'còn về', 'đến như', 'về phần', 'riêng đối với' trong tiếng Việt.",
    "formation": "Mệnh đề 1 ，至于 + Danh từ / Mệnh đề đề tài mới ，Mệnh đề thuyết minh",
    "examples": [
      {
        "translation": "Chúng tôi quyết định năm sau sẽ kết hôn, còn về thời gian cụ thể thì vẫn cần bàn bạc thêm."
      }
    ]
  },
  "zh_至于_551": {
    "title": "至于 (Động từ: Đến mức, đến nỗi, đến độ [thường dùng trong câu phủ định '不至于'])",
    "shortExplanation": "Động từ biểu thị sự việc đạt tới một mức độ hoặc kết cục nghiêm trọng; hầu như luôn đi kèm phủ định '不至于'; 'đến nỗi', 'đến mức'.",
    "longExplanation": "'至于' (zhìyú) ở đây là động từ biểu thị sự việc phát triển tới một mức độ sâu sắc, cực đoan hoặc dẫn tới một kết cục xấu, nghiêm trọng. Trong đại đa số trường hợp của tiếng Hán hiện đại, từ này được dùng trong cấu trúc phủ định '不至于' (không đến mức, không đến nỗi, chưa đến nỗi) hoặc phản vấn '何至于' / '哪至于' (cớ sao đến mức) để bác bỏ khả năng xảy ra của một tình huống quá tệ hại, qua đó trấn an tinh thần hoặc giải tỏa sự lo lắng quá mức. Tương đương với 'đến mức', 'đến nỗi', 'không đến nỗi nào' trong tiếng Việt.",
    "formation": "Chủ ngữ + (不 / 何 / 哪 +) 至于 + Động từ / Mệnh đề",
    "examples": [
      {
        "translation": "Anh ấy không đến nỗi nói dối đâu."
      }
    ]
  },
  "zh_总算_552": {
    "title": "总算 (Phó từ: Rốt cuộc cũng, cuối cùng cũng, coi như là)",
    "shortExplanation": "Phó từ biểu thị sau thời gian dài chờ đợi hoặc nỗ lực gian khổ thì điều mong ước cuối cùng cũng thành hiện thực; 'rốt cuộc cũng', 'cuối cùng cũng'.",
    "longExplanation": "'总算' (zǒngsuàn) là phó từ làm trạng ngữ đứng trước vị ngữ, biểu thị sau khi trải qua một thời gian dài chờ đợi, thử thách hoặc trải qua biết bao trắc trở, gian nan vất vả, cuối cùng một kết quả hoặc nguyện vọng mong đợi từ lâu cũng được thực hiện (thường kèm theo cảm xúc nhẹ nhõm, thở phào an ủi; tương tự như '终于' - cuối cùng, '好不容易' - vất vả lắm mới). Ngoài ra, trong một số văn cảnh, từ này còn có nghĩa là nhìn chung, đại thể là tạm chấp nhận được. Tương đương với 'rốt cuộc cũng', 'cuối cùng cũng', 'mãi mới' trong tiếng Việt.",
    "formation": "Chủ ngữ + 总算 + Vị ngữ (Động từ / Tính từ) (+ 了)",
    "examples": [
      {
        "translation": "Trải qua quá trình trao đổi, vị đại đạo diễn rốt cuộc cũng đã hiểu rõ rồi."
      }
    ]
  },
  "zh_总算_553": {
    "title": "总算 (Phó từ: Cuối cùng cũng / Rốt cuộc cũng / Dù sao cũng)",
    "shortExplanation": "Phó từ biểu thị sau một thời gian dài, nhiều khó khăn hoặc chờ đợi thì nguyện vọng cuối cùng cũng đạt được; hoặc trong hoàn cảnh chưa như ý thì đạt được kết quả an ủi; \"cuối cùng cũng\", \"rốt cuộc cũng\".",
    "longExplanation": "“总算” (zǒngsuàn) là phó từ thường đứng trước vị ngữ động từ hoặc tính từ, biểu thị một kết quả hoặc nguyện vọng cuối cùng đã được thực hiện sau một khoảng thời gian dài, trải qua nhiều nỗ lực hoặc trắc trở. Từ này cũng biểu thị ý may mắn, giải tỏa hoặc cảm thấy an ủi khi đạt được một kết quả cơ bản chấp nhận được giữa hoàn cảnh chưa hoàn hảo. Khác với “终于” (nhấn mạnh tính tất yếu sau nỗ lực), “总算” thường mang sắc thái nhẹ nhõm, may mắn, trút được gánh nặng. Tương đương với \"cuối cùng cũng\", \"rốt cuộc cũng\", \"dù sao cũng... rồi\" trong tiếng Việt.",
    "formation": "Chủ ngữ + (dàn / kěshì +) 总算 + Động từ / Mệnh đề",
    "examples": [
      {
        "translation": "Tuy khách sạn này không tốt lắm, nhưng cuối cùng cũng có một chỗ để ngủ rồi."
      }
    ]
  },
  "zh_V下来_554": {
    "title": "Động từ + 下来 (Bổ ngữ xu hướng: Định hình / Cố định lại / Ổn định / Ghi nhận lại)",
    "shortExplanation": "Bổ ngữ xu hướng biểu thị sự chuyển biến từ trạng thái vận động, biến đổi sang trạng thái cố định, ngưng đọng, ổn định hoặc được ghi chép, quyết định dứt khoát; \"lại\", \"xuống\".",
    "longExplanation": "“下来” (xiàlai) ngoài ý nghĩa phương hướng không gian (hướng từ trên xuống người nói), còn là một bổ ngữ xu hướng có nhiều nghĩa phái sinh quan trọng trong ngữ pháp tiếng Hán. Khi đi sau các động từ như “定” (quyết định), “记” (ghi nhớ), “停” (dừng), “静” (yên tĩnh), “拍” (chụp ảnh), nó biểu thị: một sự vật hay trạng thái từ biến động, bất định chuyển sang cố định, ổn định, xác định dứt khoát (như “定下来” - chốt lại/quyết định xong, “静下来” - lắng dịu lại, “停下来” - dừng hẳn lại); hoặc biểu thị hành động ghi chép, lưu trữ thông tin (như “写下来” - viết lại, “记下来” - ghi chép lại). Tương đương với \"lại\", \"xuống\", \"xong\" trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ + 下来 (+ 了 / 吗)",
    "examples": [
      {
        "translation": "Luận văn của bạn khoảng khi nào thì đăng? Đã quyết định chốt xong chưa?"
      }
    ]
  },
  "zh_舍得_555": {
    "title": "舍得 (Động từ: Nỡ / Sẵn lòng bỏ ra / Không tiếc / Chịu chi)",
    "shortExplanation": "Động từ biểu thị sẵn lòng hy sinh, bỏ ra hoặc cho đi tiền của, thời gian, đồ vật quý báu mà không cảm thấy xót xa hay tiếc nuối; \"nỡ\", \"không tiếc\", \"sẵn lòng\".",
    "longExplanation": "“舍得” (shěde) là động từ tâm lý, cấu tạo từ “舍” (từ bỏ, cho đi) và “得”. Từ này biểu thị thái độ rộng lượng, hào phóng, sẵn sàng bỏ ra hoặc từ bỏ tiền của, công sức, thời gian hoặc những đồ vật yêu thích mà không tiếc nuối, xót của hay do dự (trái nghĩa với “舍不得” - không nỡ, tiếc rẻ). Thường dùng trong các câu hỏi lựa chọn, câu hỏi tu từ hoặc kết hợp với động từ khác như “舍得花钱” (sẵn lòng chi tiền), “舍得下功夫” (không tiếc công sức), “舍得放弃” (sẵn lòng buông bỏ). Tương đương với \"nỡ\", \"không tiếc\", \"sẵn lòng cho đi\", \"chịu chi\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 舍得 (+ Tân ngữ / Động từ + Tân ngữ)",
    "examples": [
      {
        "translation": "Đem món đồ chơi bạn thích nhất tặng cho em nhỏ, bạn có nỡ không?"
      }
    ]
  },
  "zh_舍不得_556": {
    "title": "舍不得 (Động từ: Tiếc / Không nỡ / Tiếc rẻ / Không đành lòng)",
    "shortExplanation": "Động từ biểu thị vì yêu quý, trân trọng hoặc tiếc của mà không nỡ rời xa, không đành lòng từ bỏ hoặc không dám tiêu xài; \"không nỡ\", \"tiếc rẻ\", \"không đành lòng\".",
    "longExplanation": "“舍不得” (shěbude) là dạng phủ định của “舍得”, mang ý nghĩa tâm lý rất phổ biến và sâu sắc trong tiếng Hán. Từ này biểu thị trạng thái cảm xúc luyến tiếc, xót xa, không đành lòng hoặc tiếc của khi phải chia tay người thân, rời xa nơi chốn gắn bó, hoặc khi phải bỏ ra tiền của, thời gian, công sức (như “舍不得花钱” - tiếc tiền, “舍不得离开” - không nỡ rời đi, “舍不得吃” - tiếc không dám ăn). Thường đi kèm trực tiếp với động từ hoặc mệnh đề chỉ hành động tiêu hao, chia ly. Tương đương với \"không nỡ\", \"tiếc\", \"tiếc rẻ\", \"không đành lòng\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 舍不得 (+ Tân ngữ / Động từ + Tân ngữ)",
    "examples": [
      {
        "translation": "Có một số người không nỡ đem tiền tiêu vào những việc thú vị."
      }
    ]
  },
  "zh_从此_557": {
    "title": "从此 (Phó từ: Kể từ đó / Từ đó trở đi / Kể từ đây)",
    "shortExplanation": "Phó từ biểu thị lấy một thời điểm hoặc sự kiện cụ thể làm mốc khởi đầu, từ đó về sau mở ra một trạng thái hay quá trình mới; \"kể từ đó\", \"từ đó về sau\".",
    "longExplanation": "“从此” (cóngcǐ) cấu tạo từ giới từ “从” (từ) và đại từ “此” (này, đây/đó), có vai trò như một phó từ liên kết thời gian, thường đứng ở đầu câu hoặc đầu phân câu. Từ này lấy một thời điểm, một biến cố hoặc một sự ngộ ra cụ thể làm ranh giới, biểu thị rằng từ mốc thời gian đó trở đi, một tình hình mới, thói quen mới hoặc chuỗi hành động kiên trì được bắt đầu và tiếp diễn liên tục (như “从此刻苦用功” - từ đó chăm chỉ dùi mài, “从此过上了幸福的生活” - từ đó sống cuộc đời hạnh phúc). Thường kết hợp với các từ ngữ chỉ kết cục như “最后” (cuối cùng), “终于” (rốt cuộc). Tương đương với \"từ đó\", \"từ đó về sau\", \"kể từ đấy\" trong tiếng Việt.",
    "formation": "(Sự kiện / Mốc thời gian ，) 从此 + Chủ ngữ + Vị ngữ (hoặc: Chủ ngữ + 从此 + Vị ngữ)",
    "examples": [
      {
        "translation": "Kể từ đó Lý Bạch chăm chỉ dùi mài, cuối cùng đã trở thành một nhà thơ vĩ đại."
      }
    ]
  },
  "zh_假设_558": {
    "title": "假设…… (Liên từ giả thiết: Giả sử... / Giả dụ... / Nếu như...)",
    "shortExplanation": "Liên từ biểu thị điều kiện giả định, dùng ở đầu phân câu để nêu ra một tình huống giả định nhằm suy xét kết quả hoặc phương án xử lý; \"giả sử\", \"giả dụ\".",
    "longExplanation": "“假设” (jiǎshè) ở đây đóng vai trò là một liên từ nối các vế câu điều kiện giả thiết (đồng nghĩa với “假如”, “假使”, “如果”). Từ này đứng ở đầu mệnh đề thứ nhất để đặt ra một tình huống giả định chưa xảy ra trong thực tế (hoặc trái ngược với hiện thực) nhằm dẫn dắt người nghe cùng suy ngẫm, dự trù hậu quả hoặc bàn luận về đối sách ứng phó. Cuối phân câu giả thiết thường có thể đi kèm ngữ khí từ “的话” hoặc “呢”. Thường xuất hiện trong các bài luận, tình huống chất vấn hoặc suy đoán logic. Tương đương với \"giả sử\", \"giả dụ\", \"nếu như\", \"ví thử\" trong tiếng Việt.",
    "formation": "假设 + Mệnh đề giả thiết (+ 的话 / 呢) ，(Chủ ngữ +) Kết quả / Câu hỏi ứng phó",
    "examples": [
      {
        "translation": "Giả sử tiền của bạn tiêu hết rồi thì sao? Bạn phải làm thế nào đây?"
      }
    ]
  },
  "zh_假设_559": {
    "title": "假设 (Danh từ: Giả thuyết / Giả định / Dự tưởng)",
    "shortExplanation": "Danh từ biểu thị luận điểm, suy đoán hoặc giả định khoa học được đặt ra dựa trên cơ sở nhất định nhưng chưa được chứng minh hoàn toàn; \"giả thuyết\", \"giả định\".",
    "longExplanation": "“假设” (jiǎshè) ở đây là một danh từ chỉ khái niệm trừu tượng trong học thuật hoặc tư duy logic. Từ này biểu thị một giả thuyết khoa học, một sự suy đoán có căn cứ hoặc tiền đề giả định được đưa ra nhằm giải thích các hiện tượng khách quan và chờ đợi thực nghiệm kiểm chứng tính đúng đắn (như “科学假设” - giả thuyết khoa học, “提出假设” - đưa ra giả thuyết, “证明假设” - chứng minh giả thuyết). Trong câu, từ này có thể làm chủ ngữ, tân ngữ hoặc định ngữ. Tương đương với \"giả thuyết\", \"giả định\" trong tiếng Việt.",
    "formation": "Chủ ngữ / Định ngữ + 假设 (hoặc: 提出 / 证明 / 验证 + 假设)",
    "examples": [
      {
        "translation": "Giả thuyết năm xưa của ngài đã được chứng minh là đúng đắn."
      }
    ]
  },
  "zh_堆_560": {
    "title": "堆 (Danh từ / Hậu tố danh từ: Đống / Gò / Đụn / Bãi)",
    "shortExplanation": "Danh từ hoặc hậu tố danh từ chỉ vật thể được chất đống, tích tụ lại thành từng đống, gò nhô cao; \"đống\", \"gò\", \"chồng\".",
    "longExplanation": "“堆” (duī) khi làm danh từ thường chỉ một khối lượng lớn đồ vật, rác rưởi, đất cát được dồn lại thành đụn, đống nhô cao trên mặt đất. Từ này thường kết hợp trực tiếp sau tên gọi của sự vật để tạo thành danh từ ghép hoặc cụm danh từ chỉ nơi tích tụ vật liệu (như “土堆” - đống đất/gò đất, “草堆” - đống rơm rạ, “垃圾堆” - bãi rác/đống rác, “建筑材料堆” - đống vật liệu xây dựng). Ngoài ra, “堆” cũng là một lượng từ rất phổ biến (như “一堆书” - một đống sách). Trong câu ví dụ này, “堆” đóng vai trò là danh từ trung tâm chỉ đống vật liệu. Tương đương với \"đống\", \"chồng\", \"gò\" trong tiếng Việt.",
    "formation": "Danh từ (đất / rơm / rác / vật liệu...) + 堆 (hoặc: Số từ + 堆 + Danh từ)",
    "examples": [
      {
        "translation": "Bên cạnh nhà máy có một đống vật liệu xây dựng."
      }
    ]
  },
  "zh_堆_561": {
    "title": "堆 (Động từ: Chất đống / Xếp đống / Chồng chất / Đùn lại)",
    "shortExplanation": "Động từ biểu thị hành động dồn tụ, tích trữ hoặc xếp chồng nhiều đồ vật lên nhau tại một vị trí; \"chất đống\", \"xếp đống\", \"chồng chất\".",
    "longExplanation": "“堆” (duī) khi làm động từ biểu thị hành vi gom góp, chất dồn hoặc xếp chồng nhiều vật thể lên nhau một cách lộn xộn hoặc thành cụm tại một địa điểm (như “堆雪人” - đắp người tuyết, “堆放货物” - chất xếp hàng hóa). Thường kết hợp với giới từ nơi chốn “在” tạo thành kết cấu “堆在 + Nơi chốn” (chất đống ở...), hoặc mang bổ ngữ kết quả “满” (đầy) tạo thành “堆满” (chất đầy). Từ này đôi khi mang sắc thái phàn nàn, nhắc nhở vì đồ đạc bừa bộn cản trở không gian. Tương đương với \"chất đống\", \"xếp đống\", \"đắp\", \"chất\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 堆 + 在 / 满 + Nơi chốn (hoặc: 堆 + Tân ngữ)",
    "examples": [
      {
        "translation": "Những linh kiện này sao đều chất đống ở đây thế này?"
      }
    ]
  },
  "zh_不如NA_562": {
    "title": "不如 + Danh từ + Tính từ (Cấu trúc so sánh: Không... bằng / Chẳng bằng)",
    "shortExplanation": "Cấu trúc so sánh hơn kém biểu thị đối tượng được so sánh không đạt đến mức độ hoặc tiêu chuẩn của đối tượng làm chuẩn về một phương diện nào đó; \"không... bằng\", \"chẳng bằng\".",
    "longExplanation": "“不如” (bùrú) cấu thành kết cấu so sánh phổ biến: “Chủ thể so sánh + 不如 + Đối tượng làm chuẩn (Danh từ) + Tính từ” (hoặc “Chủ thể so sánh + còn không bằng + Đối tượng làm chuẩn + Tính từ”). Trong cấu trúc này, danh từ đứng sau “不如” là đối tượng làm tiêu chuẩn so sánh, còn tính từ phía sau biểu thị thuộc tính hay phương diện được đem ra đo lường (như “高” - cao, “快” - nhanh, “大” - to). Cấu trúc này khẳng định chủ thể so sánh không thể bì kịp hoặc đạt tới mức độ của đối tượng làm chuẩn về phương diện đó. Thường đi kèm với phó từ “还” (còn) để tăng cường ngữ khí ngạc nhiên hoặc tương phản mạnh mẽ. Tương đương với \"không... bằng\", \"chẳng... bằng\", \"không... như\" trong tiếng Việt.",
    "formation": "Chủ thể so sánh + (还 +) 不如 + Đối tượng so sánh (Danh từ) + Tính từ",
    "examples": [
      {
        "translation": "Doanh thu của cả ba nhà cộng lại mà còn không cao bằng một mình nhà anh ấy."
      }
    ]
  },
  "zh_与其不如_563": {
    "title": "(与其)……不如…… (Liên từ lựa chọn: Thay vì... chi bằng... / Thà rằng... còn hơn...)",
    "shortExplanation": "Cặp liên từ so sánh lựa chọn, biểu thị sau khi cân nhắc giữa hai phương án thì quyết định bỏ phương án trước mà chọn phương án sau vì thỏa đáng hơn; \"thay vì... chi bằng...\", \"thà... còn hơn\".",
    "longExplanation": "“(与其)……不如……” (yǔqí... bùrú...) là cấu trúc liên từ quan hệ thuộc loại câu phức lựa chọn thiên lệch trong ngữ pháp tiếng Hán. Cấu trúc này dùng để so sánh, cân nhắc kỹ lưỡng giữa hai hành vi hoặc sự lựa chọn. Vế trước “与其” dẫn ra phương án kém thỏa đáng, tẻ nhạt hoặc mang lại ít giá trị hơn; vế sau “不如” dẫn ra phương án được đánh giá là tốt hơn, bổ ích hơn, hợp lý hơn và được khuyến khích thực hiện. Trong khẩu ngữ, “与其” đôi khi có thể lược bỏ, chỉ dùng “不如”. Tương đương với \"thay vì... chi bằng...\", \"thà rằng... còn hơn...\" trong tiếng Việt.",
    "formation": "(与其 +) Phương án thứ nhất ，不如 + Phương án thứ hai",
    "examples": [
      {
        "translation": "Thay vì ở lì trong nhà, chi bằng ra ngoài đi dạo một chút."
      }
    ]
  },
  "zh_干脆V_564": {
    "title": "干脆 + Động từ (Phó từ: Dứt khoát / Thẳng tay / Cứ dứt khoát làm... cho xong)",
    "shortExplanation": "Phó từ làm trạng ngữ, biểu thị hành động dứt khoát, dứt điểm, không vòng vo do dự mà chọn biện pháp trực tiếp, triệt để nhất; \"dứt khoát\", \"thẳng tay\", \"chi bằng cứ... luôn\".",
    "longExplanation": "“干脆” (gāncuì) ở đây làm phó từ đứng trước động từ vị ngữ (tương đương nghĩa với “索性”). Từ này biểu thị thái độ quyết đoán, dứt điểm, cắt đứt sự dùng dằng, lằng nhằng hoặc do dự để tiến hành một biện pháp nhanh gọn, trực diện và triệt để nhất nhằm giải quyết dứt điểm vấn đề (như “干脆放弃” - dứt khoát từ bỏ, “干脆直接去” - dứt khoát đi thẳng tới đó, “干脆辞职” - dứt khoát xin nghỉ việc). Thường xuất hiện trong lời khuyên, đề xuất hoặc khi đưa ra quyết sách lớn. Tương đương với \"dứt khoát\", \"thẳng tay\", \"chi bằng cứ... luôn cho xong\" trong tiếng Việt.",
    "formation": "Chủ ngữ + (建议 / 想 +) 干脆 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Nhiều người thân bạn bè khuyên anh ấy dứt khoát chèn ép đánh sập luôn ba hiệu sách kia."
      }
    ]
  },
  "zh_干脆_565": {
    "title": "干脆 (Tính từ: Dứt khoát / Sảng khoái / Thẳng thắn / Nhanh gọn)",
    "shortExplanation": "Tính từ miêu tả lời nói, cử chỉ hoặc tác phong sảng khoái, dứt khoát, rành mạch, không hề do dự hay lòng vòng; \"dứt khoát\", \"sảng khoái\".",
    "longExplanation": "“干脆” (gāncuì) khi làm tính từ dùng để miêu tả tính cách, thái độ, cách ăn nói hoặc cách xử lý công việc mau lẹ, rành mạch, rõ ràng, dứt khoát, không do dự, vòng vo hay lề mề (trái nghĩa với “拖泥带水” - dây dưa nhấc nhớm, “犹豫” - do dự). Thường làm vị ngữ, định ngữ (như “干脆的回答” - câu trả lời dứt khoát), hoặc đứng sau bổ ngữ trạng thái “得” (như “答应得很干脆” - nhận lời rất sảng khoái/dứt khoát). Tương đương với \"dứt khoát\", \"sảng khoái\", \"thẳng thắn\", \"nhanh gọn\" trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ + 得 + (很 / 非常 +) 干脆 (hoặc: 干脆的 + Danh từ)",
    "examples": [
      {
        "translation": "Tôi nhờ anh ấy giúp đỡ, anh ấy nhận lời rất dứt khoát."
      }
    ]
  },
  "zh_万一_566": {
    "title": "万一 (Liên từ / Phó từ: Vạn nhất / Ngộ nhỡ / Chẳng may / Lỡ như)",
    "shortExplanation": "Liên từ hoặc phó từ giả thiết, chỉ tình huống bất trắc ngẫu nhiên có xác suất xảy ra rất nhỏ nhưng có thể gây hậu quả nghiêm trọng; \"ngộ nhỡ\", \"chẳng may\", \"lỡ như\".",
    "longExplanation": "“万一” (wànyī) là liên từ hoặc phó từ chỉ điều kiện giả định đặc biệt trong tiếng Hán. Từ này dùng để nêu ra một sự việc bất ngờ, ngẫu nhiên với xác suất xảy ra cực kỳ thấp (ví von \"một trong một vạn\"), nhưng nếu xảy ra thì sẽ mang lại tổn thất, rủi ro hoặc hậu quả bất lợi (như “万一下雨” - ngộ nhỡ trời mưa, “万一失败” - lỡ như thất bại). Thường đứng ở đầu mệnh đề điều kiện hoặc trước động từ vị ngữ, và mệnh đề kết quả phía sau thường đi kèm với “就” (thì), “可能” (có thể), “会” (sẽ). Tương đương với \"vạn nhất\", \"ngộ nhỡ\", \"chẳng may\", \"lỡ như\" trong tiếng Việt.",
    "formation": "(Nếu như +) 万一 + Động từ / Mệnh đề ，(Chủ ngữ +) 就 / 会 / 有可能……",
    "examples": [
      {
        "translation": "Nếu như trứng gà đều để chung vào một chiếc giỏ, ngộ nhỡ không cẩn thận thì có khả năng sẽ vỡ tan hết."
      }
    ]
  },
  "zh_万一_567": {
    "title": "万一 (Danh từ: Điều bất trắc / Chuyện vạn nhất / Tình huống ngộ nhỡ)",
    "shortExplanation": "Danh từ chỉ tình huống rủi ro, tai nạn hoặc sự cố bất ngờ tuy hiếm khi xảy ra nhưng có thể dẫn tới hậu quả khó lường; \"điều bất trắc\", \"chuyện vạn nhất\".",
    "longExplanation": "“万一” (wànyī) ở đây được dùng như một danh từ trừu tượng chỉ một biến cố nguy hiểm, sự cố bất trắc hoặc trường hợp ngẫu nhiên rủi ro (thường dùng trong các thành ngữ, tục ngữ cố định như “不怕一万，就怕万一” - không sợ một vạn sự việc bình thường, chỉ sợ một điều bất trắc; hoặc “以防万一” - để phòng ngừa điều bất trắc). Trong câu, “万一” có thể làm tân ngữ cho động từ “怕” (sợ) hoặc giới từ “防” (phòng ngừa). Tương đương với \"điều bất trắc\", \"sự cố ngoài ý muốn\", \"chuyện ngộ nhỡ\", \"vạn nhất\" trong tiếng Việt.",
    "formation": "(Không sợ một vạn ，chỉ sợ / Để phòng +) 万一 (hoặc: 万一 + xảy ra)",
    "examples": [
      {
        "translation": "Không sợ một vạn tình huống bình thường, chỉ sợ một điều bất trắc xảy ra."
      }
    ]
  },
  "zh_无意中无意地_568": {
    "title": "无意中 / 无意地 (Trạng ngữ / Phó từ: Tình cờ / Vô tình / Ngẫu nhiên / Không cố ý)",
    "shortExplanation": "Trạng ngữ biểu thị hành động diễn ra một cách ngẫu nhiên, ngoài dự tính, không hề có chủ ý hay toan tính từ trước; \"vô tình\", \"tình cờ\", \"ngẫu nhiên\".",
    "longExplanation": "“无意中” (wúyìzhōng) và “无意地” (wúyì dì) đều đóng vai trò làm trạng ngữ đứng trước động từ trong câu, biểu thị một hành động được thực hiện hoặc một kết quả xuất hiện một cách tình cờ, ngẫu nhiên, hoàn toàn không xuất phát từ chủ ý, kế hoạch hay ý đồ có sẵn của người thực hiện. Trong đó, “无意中” nhấn mạnh vào bối cảnh/khoảnh khắc ngẫu nhiên phát sinh sự việc; còn “无意地” nhấn mạnh vào trạng thái hành vi không có toan tính. Thường dùng trong các trường hợp tình cờ tìm thấy đồ vật, buột miệng nói ra điều gì hoặc vô tình chứng kiến sự việc. Tương đương với \"vô tình\", \"tình cờ\", \"ngẫu nhiên\", \"không cố ý\" trong tiếng Việt.",
    "formation": "Chủ ngữ + (在 + Thời điểm / Hành động + 时 ，) 无意中 / 无意地 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Lúc dọn dẹp vườn hoa, cô ấy đã vô tình / tình cờ tìm thấy chiếc bông tai này."
      }
    ]
  },
  "zh_无意_569": {
    "title": "无意 (Động từ năng nguyện / Phó từ: Không có ý định / Không có ý / Không muốn)",
    "shortExplanation": "Biểu thị trong lòng hoàn toàn không có ý định, chủ đích hoặc không muốn thực hiện hành vi nào đó; \"không có ý định\", \"không muốn\", \"vô ý\".",
    "longExplanation": "“无意” (wúyì) cấu tạo từ chữ “无” (không có) và “意” (ý định, tâm ý). Khi đứng trước một động từ hoặc mệnh đề khác, “无意” thường đóng vai trò như một động từ vị ngữ mang tính năng nguyện hoặc một phó từ hạn định, biểu thị chủ ngữ hoàn toàn không có mong muốn, không có toan tính hoặc không cố tình thực hiện một hành vi nào đó (như “无意伤害” - không có ý làm tổn thương, “无意隐瞒” - không có ý giấu giếm, “无意参与” - không muốn tham gia). Khác với “无意中” (chỉ tính ngẫu nhiên của sự việc đã xảy ra), “无意” nhấn mạnh vào thái độ và tâm ý chủ quan rằng bản thân không có mục đích làm việc đó. Tương đương với \"không có ý\", \"không có ý định\", \"không muốn\", \"vô ý\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 无意 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Anh ấy không hề có ý định làm tổn thương bất kỳ ai."
      }
    ]
  },
  "zh_有利_570": {
    "title": "有利 (Tính từ / Động từ: Có lợi / Có ích / Thuận lợi / Tốt cho)",
    "shortExplanation": "Biểu thị điều kiện, yếu tố hay sự vật nào đó đem lại lợi ích, sự trợ giúp hoặc tác động tích cực đối với một sự việc; \"có lợi\", \"có ích\".",
    "longExplanation": "“有利” (yǒulì) là tính từ hoặc động từ có tính chất biểu thị quan hệ tích cực (trái nghĩa với “不利”). Từ này chỉ sự tồn tại của những nhân tố, điều kiện thuận lợi có tác dụng thúc đẩy, giúp ích hoặc bảo đảm cho một sự phát triển tốt đẹp. Trong ngữ pháp tiếng Hán hiện đại, “有利” rất thường đi kèm với giới từ “于” tạo thành kết cấu cố định “有利于 + Đối tượng / Hành vi” (có lợi cho..., có ích cho...), hoặc dùng trong cấu trúc “对……有利” (có lợi đối với...). Ngoài ra, nó cũng có thể làm định ngữ như “有利条件” (điều kiện có lợi), “有利地位” (vị thế có lợi). Tương đương với \"có lợi\", \"có ích\", \"tốt cho\", \"thuận lợi cho\" trong tiếng Việt.",
    "formation": "Chủ ngữ / Sự vật + 有利于 + Động từ / Danh từ (hoặc: 对 + Đối tượng + 有利)",
    "examples": [
      {
        "translation": "Áp lực vừa phải có lợi cho việc chúng ta duy trì trạng thái tốt."
      }
    ]
  },
  "zh_的确_571": {
    "title": "的确 (Phó từ: Quả thật / Quả đúng là / Thật sự)",
    "shortExplanation": "Phó từ biểu thị sự khẳng định chắc chắn về tính xác thực khách quan của một sự thật hoặc nhận định; \"quả thật\", \"quả đúng là\", \"thật sự\".",
    "longExplanation": "“的确” (díquè) là phó từ thường đứng trước vị ngữ (động từ, tính từ hoặc cụm từ biểu thị nhận định) trong câu, đóng vai trò làm trạng ngữ. Từ này dùng để khẳng định mạnh mẽ tính chân thực, khách quan và hoàn toàn đáng tin cậy của sự tình, thường dùng khi đồng tình với nhận định của người khác hoặc khi bản thân quan sát, trải nghiệm và thấy sự thật đúng hệt như lời đồn hay dự đoán ban đầu (như “的确如此” - quả thật như vậy, “的确很好” - quả thật rất tốt). Khác với “确实” (có thể làm tính từ như “确实的证据”), “的确” chỉ dùng làm phó từ. Tương đương với \"quả thật\", \"quả đúng là\", \"thật sự\", \"chính xác là\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 的确 + Vị ngữ (Động từ / Tính từ / 是……)",
    "examples": []
  },
  "zh_嗯_573": {
    "title": "嗯 (Thán từ thanh 4 / thanh nhẹ: Ừ / Vâng / Dạ / Ừm)",
    "shortExplanation": "Thán từ phát âm thanh 4 hoặc thanh nhẹ, dùng trong khẩu ngữ để đáp lại lời gọi, biểu thị đồng ý, chấp thuận hoặc xác nhận câu hỏi; \"ừ\", \"vâng\", \"dạ\".",
    "longExplanation": "“嗯” khi phát âm ở thanh thứ tư (èn) hoặc thanh nhẹ là thán từ thường gặp bậc nhất trong khẩu ngữ tiếng Hán thường nhật. Từ này thường đứng độc lập ở đầu câu nói, dùng để đáp lại tiếng gọi của người khác, hoặc biểu thị thái độ đồng tình, tán thành, ghi nhận hay trả lời khẳng định cho một câu hỏi nghi vấn (như “嗯，好” - ừ, được; “嗯，知道了” - ừ, biết rồi; “嗯，吃了” - ừ, ăn rồi). Ngữ điệu trầm, dứt khoát và mang tính xác nhận. Tương đương với \"ừ\", \"vâng\", \"dạ\", \"ừm\" trong tiếng Việt.",
    "formation": "(Lời gọi / Câu hỏi ，) 嗯 ，+ Câu trả lời / Khẳng định",
    "examples": [
      {
        "translation": "A: Ăn cơm chưa? B: Ừ/Dạ, ăn rồi."
      }
    ]
  },
  "zh_嗯_574": {
    "title": "嗯？ (Thán từ thanh 2 / ngữ điệu hỏi: Hả? / Ủa? / Ơ? / Sao cơ?)",
    "shortExplanation": "Thán từ phát âm thanh 2 hoặc lên giọng hỏi, dùng khi cảm thấy bất ngờ, khó hiểu, hoài nghi hoặc phát hiện điều bất thường; \"hả?\", \"ủa?\", \"ơ?\".",
    "longExplanation": "“嗯” khi mang dấu hỏi và phát âm ở thanh thứ hai (én) với ngữ điệu vút lên là thán từ biểu thị tâm trạng ngạc nhiên, hoài nghi hoặc khó hiểu. Nó thường đứng ở đầu câu, xuất hiện khi người nói bất chợt phát hiện ra một điều gì đó khác thường, mâu thuẫn với nhận thức hay trí nhớ thông thường của mình, từ đó dẫn tới một câu hỏi tự vấn hoặc tra hỏi đối phương (như “嗯？难道是我记错了？” - ủa? chẳng lẽ là mình nhớ nhầm?; “嗯？你怎么在这里？” - ủa? sao cậu lại ở đây?). Tương đương với \"hả?\", \"ủa?\", \"ơ?\", \"sao cơ?\" trong tiếng Việt.",
    "formation": "嗯？ + Câu hỏi nghi vấn / Phỏng đoán",
    "examples": [
      {
        "translation": "Ủa? Chẳng lẽ là mình nhớ nhầm rồi sao?"
      }
    ]
  },
  "zh_嗯_575": {
    "title": "嗯！ (Thán từ nhấn mạnh / cảm thán: Ơ này! / Kìa! / Trời ạ! / Sao thế!)",
    "shortExplanation": "Thán từ mang ngữ điệu cảm thán hoặc ngữ khí nhấn mạnh, biểu thị sự ngạc nhiên, trách móc, không hài lòng hoặc thúc giục; \"ơ này!\", \"kìa!\".",
    "longExplanation": "“嗯！” khi đi với dấu chấm than và phát âm ngắn, dứt khoát hoặc hơi kéo dài với ngữ khí nhấn mạnh là thán từ bộc lộ cảm xúc tương đối mạnh mẽ trong khẩu ngữ. Nó thường dùng khi người nói phát hiện ra một điều trái với lẽ thường hoặc trái với kỳ vọng, qua đó bày tỏ sự kinh ngạc, trách nhẹ, thúc giục hoặc phàn nàn đối với đối phương (như “嗯！你怎么还没走啊？” - ơ này! sao cậu vẫn chưa đi thế?; “嗯！这可不行！” - này! thế này sao được!). Tương đương với \"ơ này!\", \"kìa!\", \"trời ạ!\", \"sao thế!\" trong tiếng Việt.",
    "formation": "嗯！ + Câu hỏi phản vấn / Ngạc nhiên / Trách móc",
    "examples": [
      {
        "translation": "Ơ này! Sao cậu vẫn còn chưa đi vậy?"
      }
    ]
  },
  "zh_轻易地V_576": {
    "title": "轻易地 + Động từ (Cụm trạng ngữ: Một cách dễ dàng / Dễ như trở bàn tay / Không tốn sức)",
    "shortExplanation": "Cụm trạng ngữ biểu thị một hành động được hoàn thành một cách vô cùng dễ dàng, thuận lợi, không tốn nhiều công sức hay gặp phải trở ngại nào; \"một cách dễ dàng\".",
    "longExplanation": "“轻易地” (qīngyì dì) do hình dung từ “轻易” (dễ dàng) kết hợp với trợ từ kết cấu “地” tạo thành một ngữ trạng từ bổ nghĩa cho động từ theo sau. Cấu trúc này thường dùng trong các câu khẳng định chỉ năng lực xuất sắc hoặc điều kiện thuận lợi, biểu thị một hành vi hoặc mục tiêu được thực hiện trơn tru, mau chóng, tốn rất ít sức lực và không gặp bất kỳ khó khăn đáng kể nào (như “轻易地记住” - ghi nhớ một cách dễ dàng, “轻易地获胜” - chiến thắng một cách dễ dàng, “轻易地解决问题” - giải quyết vấn đề dễ như trở bàn tay). Thường kết hợp với các phó từ mức độ như “很” (rất), “这么” (như vậy). Tương đương với \"một cách dễ dàng\", \"dễ như trở bàn tay\", \"không tốn chút công sức nào\" trong tiếng Việt.",
    "formation": "Chủ ngữ + (có thể / đều +) 轻易地 + Động từ (+ Bổ ngữ / Tân ngữ)",
    "examples": [
      {
        "translation": "Cậu ấy học cái gì cũng đều có thể nhớ kỹ một cách rất dễ dàng."
      }
    ]
  },
  "zh_轻易V_577": {
    "title": "轻易 + Động từ (Phó từ: Tùy tiện / Khinh suất / Dễ dãi / Dễ dàng; thường dùng trong câu phủ định)",
    "shortExplanation": "Phó từ biểu thị thái độ tùy tiện, khinh suất, thiếu suy xét cẩn trọng; đặc biệt phổ biến trong câu phủ định \"不轻易……\" biểu thị không tùy tiện, không dễ dàng làm gì; \"tùy tiện\", \"khinh suất\".",
    "longExplanation": "“轻易” (qīngyì) khi đóng vai trò là phó từ đứng trực tiếp trước động từ (không cần trợ từ “地”) thường mang sắc thái chỉ thái độ làm việc tùy tiện, vội vã, thiếu chín chắn hoặc coi nhẹ sự việc. Đặc biệt, nó cực kỳ phổ biến trong các cấu trúc phủ định như “不轻易 + Động từ” hoặc “从不轻易 + Động từ” để biểu thị sự thận trọng, kiên định, không dễ dãi hay tùy tiện hành động, thay đổi quyết định (như “不轻易放弃” - không dễ dàng từ bỏ, “不轻易许诺” - không tùy tiện hứa hẹn, “从不轻易决定” - không bao giờ tùy tiện quyết định). Khi dùng trong câu khẳng định, nó thường mang hàm ý chê trách thái độ khinh suất. Tương đương với \"tùy tiện\", \"khinh suất\", \"dễ dàng (thay đổi/hứa hẹn)\" trong tiếng Việt.",
    "formation": "Chủ ngữ + (从不 / 不 +) 轻易 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Anh ấy trước giờ không tùy tiện quyết định, nhưng một khi đã quyết định thì không dễ dàng thay đổi."
      }
    ]
  },
  "zh_密切_578": {
    "title": "密切 (Phó từ / Trạng ngữ: Mật thiết / Chặt chẽ / Khăng khít / Sâu sát)",
    "shortExplanation": "Phó từ làm trạng ngữ bổ nghĩa cho động từ, biểu thị mức độ liên hệ, gắn kết hoặc phối hợp qua lại vô cùng khăng khít, sâu sắc; \"mật thiết\", \"chặt chẽ\".",
    "longExplanation": "“密切” (mìqiè) khi làm trạng ngữ đứng trước các động từ như “相关” (liên quan), “联系” (liên hệ), “配合” (phối hợp), “关注” (quan tâm theo dõi), biểu thị tính chất gắn bó keo sơn, liên quan sâu sắc hoặc sự hợp tác, theo dõi vô cùng sít sao giữa hai bên. Cấu trúc thường gặp nhất là “与 / 和……密切相关” (liên quan mật thiết với...) hoặc “密切关注” (theo dõi sát sao). Từ này thường xuất hiện trong văn phong nghị luận, thời sự, khoa học và các bài phát biểu trang trọng. Tương đương với \"mật thiết\", \"chặt chẽ\", \"sát sao\", \"khăng khít\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 与 / 和 + Đối tượng + 密切 + Động từ (như 相关 / 联系 / 配合)",
    "examples": [
      {
        "translation": "Ô nhiễm có liên quan mật thiết đến đời sống hằng ngày của chúng ta."
      }
    ]
  },
  "zh_密切_579": {
    "title": "密切 (Tính từ: Thân thiết / Thân mật / Gần gũi / Khăng khít)",
    "shortExplanation": "Tính từ biểu thị mối quan hệ giữa người với người hoặc giữa các bên ngày càng gần gũi, gắn bó thân thiết; \"thân thiết\", \"khăng khít\", \"gần gũi\".",
    "longExplanation": "“密切” (mìqiè) khi dùng làm tính từ chỉ mức độ thân tình, khăng khít và gần gũi trong mối quan hệ hoặc sự vãng lai giữa người với người, giữa các tổ chức hoặc giữa các quốc gia (như “关系密切” - quan hệ thân mật, “来往密切” - qua lại thân thiết). Trong câu, từ này thường đảm nhiệm chức năng vị ngữ (thường đi kèm phó từ so sánh hoặc biến đổi như “比先前密切了” - thân thiết hơn trước, “变得更加密切” - trở nên thân thiết hơn), hoặc làm bổ ngữ hay định ngữ. Tương đương với \"thân thiết\", \"thân mật\", \"gần gũi\", \"khăng khít\" trong tiếng Việt.",
    "formation": "Chủ ngữ (Mối quan hệ / Sự qua lại) + (比…… +) 密切 (+ 了)",
    "examples": [
      {
        "translation": "Kể từ đó, sự qua lại giữa hai người trở nên thân thiết gắn bó hơn trước."
      }
    ]
  },
  "zh_密切_580": {
    "title": "密切 (Động từ: Thắt chặt / Tăng cường / Làm cho gắn bó / Làm khăng khít thêm)",
    "shortExplanation": "Động từ biểu thị hành động hoặc yếu tố làm cho mối quan hệ, sự liên hệ giữa các bên thêm bền chặt, sâu sắc và gắn bó; \"thắt chặt\", \"tăng cường\".",
    "longExplanation": "“密切” (mìqiè) ở đây được sử dụng với tư cách là một ngoại động từ (mang ý nghĩa sử động: làm cho trở nên mật thiết). Từ này biểu thị một công trình, chính sách, hoạt động giao lưu hoặc biện pháp nào đó đã phát huy tác dụng to lớn, giúp gắn kết, thắt chặt và tăng cường mối liên hệ qua lại giữa các khu vực, các cộng đồng hoặc các tầng lớp nhân dân (như “密切联系” - thắt chặt mối liên hệ, “密切关系” - thắt chặt quan hệ). Thường đi với phó từ “大大” (rất lớn, hết sức) và trợ từ động thái “了”. Tương đương với \"thắt chặt\", \"tăng cường\", \"làm khăng khít thêm\", \"gắn kết thêm\" trong tiếng Việt.",
    "formation": "Chủ ngữ (Sự vật / Hành động) + (大大 +) 密切 + 了 + Đối tượng + 的联系 / 关系",
    "examples": [
      {
        "translation": "Tuyến đường sắt này đã thắt chặt đáng kể mối liên hệ giữa khu vực Tây Nam với thủ đô."
      }
    ]
  },
  "zh_尽量jnling_581": {
    "title": "尽量 (jǐnliàng) (Phó từ: Cố gắng hết sức / Cố hết mức / Trong khả năng tối đa)",
    "shortExplanation": "Phó từ phát âm thanh 3 (jǐn), biểu thị nỗ lực đạt đến giới hạn cao nhất trong phạm vi điều kiện khách quan cho phép; \"cố gắng hết sức\", \"cố hết mức\".",
    "longExplanation": "“尽量” khi đọc ở thanh thứ ba (jǐnliàng) là một phó từ làm trạng ngữ đứng trước động từ trong câu. Từ này biểu thị người nói hoặc chủ thể hành động ra sức phát huy khả năng, cố gắng đạt đến mức độ cao nhất hoặc số lượng nhiều nhất (hoặc ít nhất) trong phạm vi hoàn cảnh cho phép. Rất thường kết hợp với các từ chỉ mức độ hoặc phủ định như “尽量多……” (cố gắng nhiều hơn...), “尽量少……” (cố gắng hạn chế tối đa...), “尽量不要 / 别……” (cố gắng không nên...). Cần phân biệt với “尽 (jìn) 量” thanh 4 (mang nghĩa dốc hết dung lượng, tửu lượng). Tương đương với \"cố gắng hết sức\", \"hết mức có thể\", \"trong khả năng tối đa\" trong tiếng Việt.",
    "formation": "(Chủ ngữ +) 尽量 (+ 多 / 少 / 别 +) Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Cố gắng hết sức đi xe đạp nhiều hơn, lựa chọn phương tiện giao thông công cộng nhiều hơn."
      }
    ]
  },
  "zh_逐步_582": {
    "title": "逐步 (Phó từ: Từng bước / Dần dần theo giai đoạn / Từng bước một)",
    "shortExplanation": "Phó từ biểu thị hành động hoặc quá trình phát triển diễn ra từng bước một, có kế hoạch, có trật tự và giai đoạn rõ ràng; \"từng bước\", \"dần dần\".",
    "longExplanation": "“逐步” (zhúbù) là phó từ thường đứng trước vị ngữ động từ, biểu thị một hành động hoặc quá trình biến đổi tiến triển theo từng bước, có phương hướng, lộ trình và kế hoạch bài bản được định sẵn (như “逐步解决” - từng bước giải quyết, “逐步推广” - từng bước nhân rộng, “逐步向……转变” - từng bước chuyển biến sang...). Khác với “逐渐” (nhấn mạnh sự biến đổi tự nhiên dần dần theo thời gian mà không nhất thiết theo từng bước định sẵn), “逐步” thường gắn liền với sự nỗ lực có ý thức, quy hoạch chiến lược hoặc các chính sách cải cách của con người. Tương đương với \"từng bước\", \"dần dần theo lộ trình\", \"từng bước một\" trong tiếng Việt.",
    "formation": "(Chủ ngữ +) 逐步 + Động từ / Mệnh đề biến đổi",
    "examples": [
      {
        "translation": "Điều chỉnh cơ cấu tiêu thụ năng lượng, từng bước chuyển đổi sang năng lượng tái tạo."
      }
    ]
  },
  "zh_照常_583": {
    "title": "照常 (Phó từ / Tính từ / Vị ngữ: Như thường lệ / Vẫn như cũ / Không có gì thay đổi)",
    "shortExplanation": "Biểu thị sự việc, hoạt động vẫn diễn ra bình thường theo thông lệ cũ, không hề bị gián đoạn hay biến động dù hoàn cảnh có thay đổi; \"như thường lệ\", \"vẫn như cũ\".",
    "longExplanation": "“照常” (zhàocháng) cấu tạo từ “照” (chiếu theo) và “常” (thường lệ, lệ cũ). Từ này có thể làm trạng ngữ đứng trước động từ (như “照常营业” - kinh doanh bình thường, “照常上课” - đi học bình thường) hoặc làm vị ngữ đứng sau chủ ngữ (như “一切照常” - mọi thứ vẫn như thường). Nó biểu thị rằng dù điều kiện xung quanh có xảy ra biến cố, trắc trở hoặc hoàn cảnh có khác thường, thì công việc, nếp sinh hoạt hay tình hình chung vẫn giữ nguyên trạng thái ổn định, diễn ra y như ngày thường không hề lay chuyển. Tương đương với \"như thường lệ\", \"vẫn như thường\", \"vẫn như cũ\", \"bình thường như mọi khi\" trong tiếng Việt.",
    "formation": "(Tuy…… ，nhưng) Chủ ngữ + (一切 +) 照常 (hoặc: 照常 + Động từ)",
    "examples": [
      {
        "translation": "Tuy chiến tranh đang đến gần, nhưng cuộc sống thường nhật ở nơi này mọi thứ vẫn diễn ra như thường lệ."
      }
    ]
  },
  "zh_难怪怪不得_584": {
    "title": "难怪 / 怪不得 (Phó từ: Thảo nào / Hèn chi / Chẳng trách)",
    "shortExplanation": "Phó từ biểu thị sau khi hiểu rõ nguyên nhân thực tế thì thấy sự việc là hợp tình hợp lý, không còn cảm thấy kinh ngạc hay lạ lùng nữa; \"thảo nào\", \"hèn chi\", \"chẳng trách\".",
    "longExplanation": "“难怪” (nánguài) và “怪不得” (guàibude) là hai phó từ đồng nghĩa dùng rất phổ biến trong khẩu ngữ và văn viết hiện đại. Chúng thường đứng ở đầu phân câu thứ hai để chỉ ra rằng: sau khi phát hiện hoặc được giải thích một nguyên nhân, người nói lập tức vỡ lẽ và cảm thấy kết quả xảy ra là hoàn toàn tất yếu, hợp lý, không có gì đáng ngạc nhiên. Cả hai có thể hoán đổi cho nhau linh hoạt trong ngữ cảnh làm phó từ. Tương đương với \"thảo nào\", \"hèn chi\", \"chẳng trách\" trong tiếng Việt.",
    "formation": "Nguyên nhân / Sự thật ，难怪 / 怪不得 + Kết quả",
    "examples": [
      {
        "translation": "Ngăn kéo của bạn bừa bộn thật đấy, hèn chi/thảo nào lúc nào cũng không tìm thấy đồ."
      }
    ]
  },
  "zh_难怪怪不得_585": {
    "title": "这也难怪 / 怪不得 (Vị ngữ: Cũng dễ hiểu thôi / Cũng không trách được / Cũng phải thôi)",
    "shortExplanation": "Hình thức vị ngữ hoặc câu độc lập biểu thị tình huống có thể thông cảm, hợp tình hợp lý, không nên và không thể trách cứ đối phương; \"cũng phải thôi\", \"không trách được\".",
    "longExplanation": "“难怪” và “怪不得” trong ngữ cảnh này không đóng vai trò phó từ liên kết mà đóng vai trò là một cụm vị ngữ độc lập (thường xuất hiện dưới cấu trúc “这也难怪” hoặc “这也怪不得”). Ở đây, “怪” có nghĩa gốc là trách móc, trách phạt; “难怪” tức là 'khó mà trách cứ được', biểu thị thái độ đồng cảm, bao dung và thấu hiểu của người nói đối với một hành vi hay thiếu sót nào đó. Khi đối phương biết được hoàn cảnh khách quan đầy khó khăn hoặc bận rộn, họ nhận xét rằng điều đó hoàn toàn có thể hiểu được. Tương đương với \"cũng không trách được\", \"cũng dễ hiểu thôi\", \"cũng phải thôi\" trong tiếng Việt.",
    "formation": "Sự việc / Hành vi ，（这也 +）难怪 / 怪不得 ，Lý do / Giải thích",
    "examples": [
      {
        "translation": "Anh ấy trước giờ không bận tâm chuyện con cái. Nhưng điều này cũng dễ hiểu thôi, anh ấy bận như vậy, đâu có thời gian cơ chứ."
      }
    ]
  },
  "zh_与其倒不如_586": {
    "title": "与其……(倒)不如…… (Liên từ lựa chọn: Thà... còn hơn... / So với việc... thì chi bằng...)",
    "shortExplanation": "Cặp liên từ lựa chọn biểu thị sự cân nhắc so sánh giữa hai phương án, sau đó quyết định từ bỏ phương án trước mà lựa chọn phương án sau; \"thà... còn hơn\", \"so với việc... thì chi bằng\".",
    "longExplanation": "“与其……(倒)不如……” (yǔqí……(dǎo) bùrú……) là cấu trúc câu phức lựa chọn rất quan trọng trong tiếng Hán. Trong đó, vế đầu “与其” dẫn ra phương án mà người nói cho là bất lợi, tốn công vô ích hoặc không thỏa đáng; vế sau “不如” (hoặc thêm phó từ “倒不如” để nhấn mạnh ngữ khí chuyển hướng) đưa ra phương án tối ưu hơn, hợp lý hơn hoặc có giá trị hơn mà người nói chủ trương lựa chọn. Cấu trúc này phản ánh tư duy so sánh thiệt hơn rõ ràng. Tương đương với \"thà... còn hơn...\", \"so với việc... thì chi bằng...\" trong tiếng Việt.",
    "formation": "与其 + Phương án từ bỏ ，(倒)不如 + Phương án lựa chọn",
    "examples": []
  },
  "zh_总之_588": {
    "title": "总之 (Liên từ: Tóm lại / Nói tóm lại / Rút cuộc)",
    "shortExplanation": "Liên từ dùng ở đầu phân câu để tóm tắt, khái quát toàn bộ nội dung, các chi tiết liệt kê hoặc lý do đã nêu ở phần trước; \"tóm lại\", \"nói tóm lại\".",
    "longExplanation": "“总之” (zǒngzhī) là liên từ liên kết đoạn văn và câu rất thông dụng. Khi người nói đã liệt kê ra nhiều trường hợp cụ thể, nhiều địa danh, lý do hoặc ý kiến chi tiết ở phía trước, họ dùng “总之” ở đầu câu/phân câu tiếp theo để rút ra một kết luận cô đọng nhất, bỏ qua những chi tiết rườm rà. Ngoài ra, “总之” còn có thể dùng để nhấn mạnh một thái độ kiên định hoặc yêu cầu nhất quán bất chấp hoàn cảnh thế nào. Tương đương với \"tóm lại\", \"nói tóm lại\", \"nói chung là\" trong tiếng Việt.",
    "formation": "Liệt kê các trường hợp / Chi tiết …… 总之 + Phân câu tóm tắt / Kết luận",
    "examples": [
      {
        "translation": "Tôi muốn đi Thượng Hải, Nam Kinh, Hàng Châu... tóm lại là muốn đi dạo quanh miền nam một chuyến."
      }
    ]
  },
  "zh_V过_589": {
    "title": "Động từ + 过 (Bổ ngữ xu hướng: Quay sang hướng khác / Ngoảnh đi / Đổi chiều)",
    "shortExplanation": "Bổ ngữ xu hướng biểu thị động tác làm cho cơ thể, bộ phận cơ thể hoặc vật thể thay đổi góc độ, quay sang hướng khác hoặc ngoảnh mặt đi; \"quay\", \"ngoảnh\".",
    "longExplanation": "“过” (guò) khi làm bổ ngữ xu hướng (thường kết hợp với các động từ chỉ sự xoay chuyển như “转” - xoay, “扭” - vặn/ngoảnh, “偏” - nghiêng) biểu thị sự thay đổi về phương hướng quay của cơ thể hoặc vật thể. Điển hình nhất là kết cấu “转过身” (quay người lại / xoay người đi), “扭过头” (ngoảnh đầu đi), trong đó tân ngữ chỉ bộ phận cơ thể (như “身”, “头”, “脸”) thường chen vào giữa động từ và bổ ngữ hoặc đứng sau bổ ngữ. Ngữ nghĩa thể hiện sự xoay chuyển góc nhìn hoặc thái độ không muốn đối diện. Tương đương với \"quay (người) lại\", \"ngoảnh (đầu) đi\" trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ + 过 + Tân ngữ (thân thể: 身 / 头 / 脸)",
    "examples": [
      {
        "translation": "Anh ấy quay người đi, không nói một lời nào."
      }
    ]
  },
  "zh_V过_590": {
    "title": "Động từ + 过 (Bổ ngữ xu hướng: Lướt qua / Vụt qua / Thoáng qua / Lóe lên)",
    "shortExplanation": "Bổ ngữ xu hướng biểu thị luồng suy nghĩ, ánh sáng, hình bóng hoặc cảm xúc vụt lướt qua tâm trí hay tầm mắt trong chốc lát; \"lóe qua\", \"lướt qua\", \"vụt qua\".",
    "longExplanation": "“过” (guò) ở đây mang ý nghĩa của sự chuyển động lướt qua, trôi qua nhanh chóng trong không gian hoặc trong tiềm thức. Khi đi sau các động từ như “闪” (lóe, chớp), “掠” (lướt), “划” (rạch, vạch), “流” (chảy), nó diễn tả một ý nghĩ, tia hy vọng, ánh mắt hoặc hình ảnh xuất hiện đột ngột rồi vụt biến mất khỏi trí não hoặc ánh nhìn trong khoảnh khắc ngắn ngủi (ví dụ: “脑海里闪过一个念头” - trong đầu lóe lên một ý nghĩ, “脸上掠过一丝微笑” - trên mặt lướt qua một nụ cười). Tương đương với \"lóe qua\", \"vụt qua\", \"lướt qua\" trong tiếng Việt.",
    "formation": "Nơi chốn (trong đầu / trước mắt) + Động từ + 过 (+ 了) + Tân ngữ (ý nghĩ / hình bóng / cảm xúc)",
    "examples": [
      {
        "translation": "Chỉ trong vài phút ngắn ngủi, trong đầu tôi đã lóe lên rất nhiều suy nghĩ."
      }
    ]
  },
  "zh_V开_591": {
    "title": "Động từ + 开 (Bổ ngữ xu hướng / kết quả: Mở ra / Dang ra / Xòe ra / Tách rời ra)",
    "shortExplanation": "Bổ ngữ xu hướng hoặc kết quả biểu thị động tác làm cho sự vật từ trạng thái đóng kín, khép chặt trở nên mở rộng, xòe ra, dang rộng hoặc tách rời nhau ra; \"ra\", \"mở ra\".",
    "longExplanation": "“开” (kāi) khi làm bổ ngữ kết hợp với các động từ như “张” (giương/dang), “打” (mở), “拉” (kéo), “分” (chia), “松” (thả lỏng) mang hai nghĩa phái sinh chính: ① Làm cho sự vật chuyển từ trạng thái thu hẹp, khép kín sang trạng thái mở toang, dang rộng hoặc bung nở (như “张开手臂” - dang rộng vòng tay, “张开嘴” - há to miệng, “睁开眼睛” - mở to mắt); ② Làm cho các bộ phận đang dính liền tách rời ra (như “拉开距离” - kéo giãn khoảng cách, “解开绳子” - cởi dây thừng). Tương đương với \"ra\", \"mở ra\", \"dang ra\", \"xòe ra\" trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ + 开 (+ Tân ngữ / bộ phận thân thể)",
    "examples": [
      {
        "translation": "Con khỉ đột nhiên đứng dậy, dang rộng cánh tay ôm chầm lấy người quản lý."
      }
    ]
  },
  "zh_赶快_592": {
    "title": "赶快 (Phó từ: Nhanh chóng / Mau chóng / Mau mau / Khẩn trương)",
    "shortExplanation": "Phó từ biểu thị hành động cần phải được tiến hành gấp rút, nhanh chóng, không được để chậm trễ hay lãng phí thời gian; \"mau chóng\", \"khẩn trương\".",
    "longExplanation": "“赶快” (gǎnkuài) gồm “赶” (đuổi theo, tranh thủ thời gian) và “快” (nhanh), đóng vai trò phó từ chỉ thời gian khẩn cấp. Từ này đứng trước động từ vị ngữ, mang ý nghĩa cần phải nắm bắt thời cơ gấp, đẩy nhanh tiến độ làm một việc gì đó để tránh lỡ dở hoặc kịp thời hạn (như “得赶快找房子” - phải nhanh chóng tìm phòng, “赶快去医院” - mau chóng đến bệnh viện). Khác với “赶紧” (nghiêng về tâm lý sốt ruột, vội vã hành động), “赶快” nhấn mạnh nhiều hơn vào việc tăng tốc độ và tận dụng tối đa thời gian. Tương đương với \"mau chóng\", \"nhanh chóng\", \"khẩn trương\", \"mau mau\" trong tiếng Việt.",
    "formation": "Chủ ngữ + (得 / 要 +) 赶快 + Cụm động từ",
    "examples": [
      {
        "translation": "Tháng sau tôi phải chuyển nhà rồi, phải mau chóng đi tìm phòng thôi."
      }
    ]
  },
  "zh_片_593": {
    "title": "片 (Lượng từ: Lát / Mảnh / Đám / Áng / Dải)",
    "shortExplanation": "Lượng từ dùng cho các vật thể có hình dạng mỏng, phẳng hoặc các khối cảnh vật tự nhiên kết thành mảng, cụm trôi trên không; \"mảnh\", \"lát\", \"áng\", \"đám\".",
    "longExplanation": "“片” (piàn) là một lượng từ rất đa năng trong tiếng Hán. Trong nét nghĩa cụ thể này, nó dùng để đếm những sự vật có đặc điểm mỏng, dẹp, phẳng như lá cây (“一片树叶”), lát bánh mì (“一片面包”), viên thuốc dẹt (“一片药”), hoặc những vật thể tự nhiên tạo thành từng mảng trôi bồng bềnh trong không trung như mây trời (“一片云” - một áng mây / đám mây). Thường đi liền với số từ “一” tạo thành “一片”. Nó mang lại cảm giác nhẹ nhàng, bồng bềnh và mỏng manh về mặt thị giác. Tương đương với \"lát\", \"mảnh\", \"áng\", \"đám\" trong tiếng Việt.",
    "formation": "Số từ (一) + 片 + Danh từ (mây / lá / bánh mì / thuốc...)",
    "examples": [
      {
        "translation": "Trên bầu trời trôi lơ lửng một áng mây."
      }
    ]
  },
  "zh_片_594": {
    "title": "片 (Lượng từ: Tràng / Đợt / Vùng / Tràn ngập - âm thanh, cảnh tượng, cảm xúc)",
    "shortExplanation": "Lượng từ dùng cho âm thanh vang dội liên tiếp khắp không gian (tiếng vỗ tay, hoan hô) hoặc cảnh tượng, bầu không khí, tấm lòng trải rộng liên hoàn; \"tràng\", \"đợt\", \"vùng\".",
    "longExplanation": "“片” (piàn) ở nghĩa trừu tượng và không gian mở này được dùng làm lượng từ cho những hiện tượng không có đường biên rõ rệt mà tạo thành một vùng, một đợt liên tục lan tỏa khắp không gian. Điển hình nhất là dùng cho âm thanh tập thể vang dậy cùng lúc (như “一片欢呼声” - một tràng reo hò, “一片掌声” - một tràng pháo tay giòn giã), cảnh quan thiên nhiên trải dài ngút ngàn (như “一片汪洋” - một vùng biển nước mênh mông, “一片森林” - một cánh rừng bạt ngàn), hoặc bầu không khí, tình cảm chân thành (như “一片好心” - một tấm lòng tốt, “一片寂静” - một bầu không khí tĩnh mịch). Tương đương với \"tràng\", \"đợt\", \"vùng\", \"tấm\" trong tiếng Việt.",
    "formation": "Động từ + 一片 + Danh từ (tiếng reo hò / tiếng vỗ tay / cảnh tượng / tấm lòng)",
    "examples": [
      {
        "translation": "Các bạn học nghe xong liền cất lên một tràng reo hò nhiệt liệt."
      }
    ]
  },
  "zh_根本negative_595": {
    "title": "根本 + Từ phủ định (Phó từ: Căn bản không / Hoàn toàn không / Tuyệt nhiên không)",
    "shortExplanation": "Phó từ kết hợp với các từ phủ định (不, 没, 不懂...) nhằm tăng cường ngữ khí phủ định tuyệt đối, triệt để từ gốc rễ; \"căn bản không\", \"hoàn toàn không hề\".",
    "longExplanation": "“根本” (gēnběn) khi dùng làm phó từ đứng trước các từ ngữ phủ định (như “不”, “没”, “读不懂”, “不会”) biểu thị sự phủ định hoàn toàn và triệt để nhất. Nó nhấn mạnh rằng sự việc, tính chất hay khả năng đó ngay từ cội nguồn, bản chất hoặc xuất phát điểm đã không hề tồn tại, không hề xảy ra, không có bất kỳ ngoại lệ nào. Thường mang sắc thái dứt khoát, bực bội hoặc khẳng định một sự thật không thể chối cãi (ví dụ: “根本听不懂” - hoàn toàn nghe không hiểu gì, “根本没去过” - tuyệt nhiên chưa bao giờ đến đó). Tương đương với \"căn bản không\", \"hoàn toàn không\", \"tuyệt nhiên không\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 根本 + (就 +) Từ phủ định (不 / 没 / 读不懂) + Động từ / Tính từ / Vị ngữ",
    "examples": [
      {
        "translation": "Tôi phát hiện bản thân hoàn toàn đọc không hiểu đề thi."
      }
    ]
  },
  "zh_根本_596": {
    "title": "根本 (Danh từ: Căn bản / Cội rễ / Nền tảng cốt lõi / Gốc rễ)",
    "shortExplanation": "Danh từ chỉ cội nguồn, gốc rễ, nền tảng cơ bản nhất và quan trọng nhất quyết định sự tồn tại và phát triển của sự vật; \"gốc rễ\", \"căn bản\", \"nền tảng\".",
    "longExplanation": "“根本” (gēnběn) với tư cách là một danh từ trong tiếng Hán bắt nguồn từ hình tượng gốc rễ của cây cối (“根” là rễ, “本” là gốc thân cây). Về nghĩa trừu tượng, nó chỉ nền tảng vững chắc nhất, nguyên tắc cốt lõi hoặc cội nguồn thiết yếu của một quốc gia, tổ chức hay học thuyết (ví dụ: “教育是国家的根本” - giáo dục là nền tảng cốt lõi của quốc gia, “道德是做人的根本” - đạo đức là cái gốc làm người). Trong câu, từ này thường làm vị ngữ trong câu chữ “是”, hoặc làm tân ngữ cho các động từ như “抓” (nắm), “忘” (quên). Tương đương với \"căn bản\", \"gốc rễ\", \"nền tảng cốt lõi\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 是 + (Định ngữ +) 根本 (hoặc: Động từ + 根本)",
    "examples": [
      {
        "translation": "Giáo dục là nền tảng cốt lõi của quốc gia."
      }
    ]
  },
  "zh_根本肯定_597": {
    "title": "根本 (Phó từ khẳng định: Tận gốc / Triệt để / Căn bản / Hoàn toàn)",
    "shortExplanation": "Phó từ dùng trong câu khẳng định bổ nghĩa cho động từ, biểu thị hành động được xử lý triệt để từ gốc rễ, toàn diện và sâu sắc nhất; \"triệt để\", \"tận gốc\".",
    "longExplanation": "“根本” (gēnběn) khi dùng làm phó từ trong các câu khẳng định thường đi kèm với các động từ chỉ sự thay đổi, giải quyết vấn đề mang tính quyết định như “解决” (giải quyết), “改变” (thay đổi), “好转” (chuyển biến tốt), “消除” (xóa bỏ). Nó nhấn mạnh rằng hành động không phải là đối phó bề ngoài, tạm bợ mà đã tác động sâu sắc đến tận ngọn nguồn, giải quyết dứt điểm vấn đề một lần và mãi mãi (như “事情已经根本解决了” - sự việc đã được giải quyết tận gốc rồi). Tương đương với \"triệt để\", \"tận gốc\", \"căn bản\" trong tiếng Việt.",
    "formation": "Chủ ngữ + (已经 +) 根本 + Động từ (解决 / 改变 / 消除) + 了",
    "examples": [
      {
        "translation": "Vấn đề đã được giải quyết một cách triệt để từ gốc rễ."
      }
    ]
  },
  "zh_根本就是_598": {
    "title": "根本(就)是 (Cụm phó từ nhấn mạnh: Căn bản là / Hoàn toàn là / Rõ ràng là)",
    "shortExplanation": "Cấu trúc nhấn mạnh phán đoán dứt khoát về bản chất của một hành vi hay sự việc, bộc lộ sự thật mười mươi không thể chối cãi; \"căn bản là\", \"rõ ràng là\".",
    "longExplanation": "“根本(就)是” (gēnběn (jiù) shì) là kết cấu kết hợp giữa phó từ “根本” (vốn dĩ, từ bản chất), trợ từ ngữ khí nhấn mạnh “就” và động từ phán đoán “是”. Kết cấu này thường được dùng khi người nói nhìn thấu tâm can, động cơ thật sự hoặc bản chất của vấn đề và muốn vạch trần điều đó một cách không khoan nhượng. Nó thể hiện thái độ khẳng định đanh thép, không chấp nhận những lời biện hộ hay ngụy biện của đối phương (ví dụ: “他根本就是在故意找我们的麻烦” - hắn căn bản là đang cố tình gây phiền hà cho chúng ta). Tương đương với \"căn bản là\", \"hoàn toàn là\", \"rõ ràng là\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 根本(就)是 + (在 +) Vị ngữ / Động từ / Danh từ",
    "examples": [
      {
        "translation": "Hắn căn bản là đang cố tình kiếm chuyện gây phiền phức cho chúng ta."
      }
    ]
  },
  "zh_除非否则_599": {
    "title": "除非……否则…… (Liên từ điều kiện duy nhất: Trừ phi... nếu không thì...)",
    "shortExplanation": "Cặp liên từ điều kiện biểu thị một điều kiện tiên quyết duy nhất, nếu không thỏa mãn điều kiện đó thì tất yếu sẽ dẫn tới hậu quả tiêu cực hoặc không thể đạt mục tiêu; \"trừ phi... nếu không thì\".",
    "longExplanation": "“除非……否则……” (chúfēi…… fǒuzé……) là cặp liên từ điều kiện diễn tả điều kiện cần (duy nhất). Trong đó, “除非” dẫn ra điều kiện bắt buộc phải có, là con đường hoặc khả năng duy nhất để giải quyết vấn đề; còn “否则” (nếu không thì, bằng không thì) dẫn ra hậu quả không mong muốn, sự bế tắc hoặc sự việc thất bại chắc chắn xảy ra nếu điều kiện đó bị bỏ qua. Cấu trúc này mang tính logic chặt chẽ và ngữ khí dứt khoát, thường dùng trong giao kết, đặt ra thời hạn hoặc nêu lên yêu cầu đàm phán quan trọng. Tương đương với \"trừ phi... nếu không thì...\" trong tiếng Việt.",
    "formation": "除非 + Điều kiện duy nhất ，否则 + Hậu quả không mong muốn",
    "examples": [
      {
        "translation": "Trừ phi cho tôi thêm một tuần nữa, nếu không thì chúng tôi không thể hoàn thành nhiệm vụ."
      }
    ]
  },
  "zh_除非才_600": {
    "title": "(除非)……才…… (Liên từ điều kiện duy nhất: Chỉ khi... mới... / Trừ phi... mới...)",
    "shortExplanation": "Biểu thị điều kiện tiên quyết duy nhất cần phải có để đạt được kết quả; chỉ khi thỏa mãn điều kiện trước thì kết quả sau mới có thể thực hiện được (\"chỉ khi... mới...\", \"trừ phi... mới...\").",
    "longExplanation": "“(除非)……才……” ((chúfēi)…… cái……) là kết cấu câu phức điều kiện duy nhất trong tiếng Hán, có ý nghĩa và công dụng tương đương với cấu trúc “只有……才……”. Trong đó, “除非” dẫn ra điều kiện tiên quyết bắt buộc phải đáp ứng (điều kiện duy nhất), và “才” đứng trước vị ngữ ở phân câu sau để chỉ ra rằng chỉ dưới tiền đề của điều kiện này thì hành động hoặc kết quả mong đợi mới phát sinh. Trong khẩu ngữ, “除非” có thể được lược bỏ nhưng “才” là thành phần bắt buộc. Tương đương với \"chỉ khi... mới...\", \"trừ phi... mới...\" trong tiếng Việt.",
    "formation": "(除非 +) Điều kiện duy nhất ，Chủ ngữ + 才 + Hành động / Kết quả",
    "examples": [
      {
        "translation": "(Chỉ khi / Trừ phi) bạn đồng ý điều kiện của tôi, tôi mới nói cho bạn biết."
      }
    ]
  },
  "zh_除非_601": {
    "title": "除非 (Giới từ / Liên từ: Ngoại trừ / Trừ... ra / Ngoại trừ đối tượng duy nhất)",
    "shortExplanation": "Dùng để đưa ra đối tượng cá biệt duy nhất được ngoại lệ, theo sau thường là phân câu phủ định toàn thể biểu thị ngoài đối tượng này ra thì không ai hoặc không gì có thể làm được; \"ngoại trừ\", \"trừ ra\".",
    "longExplanation": "“除非” (chúfēi) khi dùng độc lập trước danh từ, đại từ hoặc cụm danh từ mang ý nghĩa bài trừ, loại trừ một ngoại lệ duy nhất, tương tự như “除了……以外”. Trong kết cấu này, vế sau thường đi kèm với những từ phủ định toàn bộ như “没人” (không ai), “都不” (đều không), “无法” (không thể), nhằm nhấn mạnh rằng đối tượng được nêu sau “除非” là trường hợp duy nhất có ngoại lệ hoặc có khả năng thực hiện việc đó. Tương đương với \"ngoại trừ\", \"trừ... ra\", \"chỉ có... mới...\" trong tiếng Việt.",
    "formation": "Chủ ngữ / Sự vật ，除非 + Đối tượng ngoại lệ ，Từ phủ định (没人 / 都不) + Vị ngữ",
    "examples": [
      {
        "translation": "Loại máy móc này, ngoại trừ Lý Dương ra thì chẳng ai sửa tốt được."
      }
    ]
  },
  "zh_V1得O直V2_602": {
    "title": "Động từ 1 + 得 (+ Tân ngữ) + 直 + Động từ 2 (Bổ ngữ mức độ: ... đến mức cứ liên tục / không ngừng...)",
    "shortExplanation": "Biểu thị động tác hoặc cảm xúc thứ nhất đạt đến mức độ cực hạn, dẫn đến việc chủ thể liên tục hoặc không ngừng thực hiện một phản ứng sinh lý hay hành động thứ hai; \"... đến mức cứ liên tục...\".",
    "longExplanation": "Cấu trúc “Động từ 1 + 得 (+ Tân ngữ) + 直 + Động từ 2” là một dạng bổ ngữ trạng thái / mức độ đặc sắc trong tiếng Hán. Trong đó, động từ 1 (thường là động từ chỉ tâm lý, cảm xúc hoặc trạng thái sinh lý như tức giận, mừng rỡ, đau đớn, sốt ruột, mệt mỏi) đạt đến mức độ rất cao; phó từ “直” mang ý nghĩa \"liên tục không ngừng, cứ dồn dập\"; và động từ 2 diễn tả hành vi thể chất hoặc biểu hiện sinh lý bộc phát không kìm nén được (như run rẩy, toát mồ hôi, thở dốc, giậm chân). Tân ngữ là đại từ hoặc danh từ chỉ người có thể xuất hiện để làm rõ chủ thể của hành động thứ hai. Tương đương với \"... đến nỗi cứ liên tục...\", \"... đến mức không ngừng...\" trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ / Tính từ 1 + 得 (+ Tân ngữ +) 直 + Động từ 2",
    "examples": [
      {
        "translation": "Người cha nghe nói con trai đã bán nhà, tức giận đến mức (ông ấy) run rẩy cả người."
      }
    ]
  },
  "zh_直到_603": {
    "title": "直到 (Giới từ: Cho đến khi / Mãi cho đến / Tận đến)",
    "shortExplanation": "Giới từ dùng trước danh từ thời gian, mốc thời điểm hoặc địa điểm để biểu thị hành động, trạng thái hoặc tình huống kéo dài liên tục cho tới tận mốc đó; \"mãi cho đến\", \"tận đến\".",
    "longExplanation": "“直到” (zhídào) là giới từ chỉ giới hạn thời gian hoặc không gian, được tạo thành từ “直” (thẳng, liên tục) và “到” (đến). Thường đứng đầu câu hoặc trước vị ngữ, kết hợp với từ ngữ chỉ thời gian (như “今天” - hôm nay, “现在” - bây giờ, “昨天深夜” - đêm muộn hôm qua) hoặc mệnh đề chỉ sự kiện để làm trạng ngữ chỉ thời gian. Cấu trúc này nhấn mạnh tính liên tục không đứt đoạn của trạng thái hoặc một nhận thức kéo dài suốt từ quá khứ cho tới tận thời điểm được đề cập. Vế sau thường đi kèm với “也” (cũng), “才” (mới), hoặc “还” (vẫn). Tương đương với \"mãi cho đến\", \"cho đến tận\", \"tận tới\" trong tiếng Việt.",
    "formation": "直到 + Thời gian / Mốc thời điểm ，Chủ ngữ + (也 / 还 / 才 +) Vị ngữ",
    "examples": [
      {
        "translation": "Cho đến tận hôm nay, tôi vẫn không hiểu vì sao khi đó anh ấy lại nổi trận lôi đình lớn như vậy."
      }
    ]
  },
  "zh_反正_604": {
    "title": "反正 (Phó từ: Dù sao thì / Dù thế nào đi nữa / Đằng nào thì)",
    "shortExplanation": "Phó từ biểu thị bất kể tình huống, điều kiện hay quyết định của người khác có biến đổi ra sao thì kết quả, sự thật hoặc thái độ kiên định của bản thân vẫn không thay đổi; \"dù sao thì\", \"đằng nào thì\".",
    "longExplanation": "“反正” (fǎnzhèng) là phó từ ngữ khí rất phổ biến trong tiếng Hán, kết hợp từ “反” (mặt trái/ngược) và “正” (mặt phải/xuôi), mang nghĩa đen là \"dù ngược hay xuôi thì cũng thế\". Thường đứng ở đầu phân câu kết luận, rất hay đi kèm cặp với các liên từ vô điều kiện như “不管” (bất kể), “无论” (cho dù). Từ này dùng để khẳng định một ý chí dứt khoát, một sự thật hiển nhiên hoặc một kết quả chắc chắn sẽ diễn ra mà không hề bị dao động bởi bất kỳ yếu tố ngoại cảnh nào. Tương đương với \"dù sao thì\", \"dù thế nào đi nữa\", \"đằng nào thì\" trong tiếng Việt.",
    "formation": "(不管 / 无论 + Điều kiện …… ，) 反正 + Quyết định / Kết quả kiên định",
    "examples": [
      {
        "translation": "Bất kể ai trong các bạn đi chăng nữa, dù sao đi nữa tôi cũng sẽ không đi."
      }
    ]
  },
  "zh_点_605": {
    "title": "Số từ + 点 + Số từ (Cách đọc số thập phân: ... phẩy...)",
    "shortExplanation": "Cách biểu đạt số thập phân trong tiếng Hán; chữ “点” (diǎn) tương ứng với dấu phẩy thập phân; phần nguyên đọc theo số đếm thông thường, phần thập phân đọc từng chữ số đơn lẻ; \"... phẩy...\".",
    "longExplanation": "Trong tiếng Hán, số thập phân được đọc theo công thức “Số phần nguyên + 点 (diǎn) + Các chữ số phần thập phân”. Trong đó, chữ “点” đóng vai trò là dấu chấm/phẩy thập phân. Quy tắc đọc: Phần nguyên đứng trước “点” được đọc như một số tự nhiên thông thường (như 三 - ba, 二十五 - hai mươi lăm); các chữ số đứng sau “点” được đọc tuần tự từng chữ số một cách riêng rẽ chứ không ghép hàng chục, hàng trăm (ví dụ: “三点一四” sān diǎn yī sì = 3,14; số 0 đọc là líng, số 1 đọc là yī, số 2 đọc là èr). Tương đương với cách đọc \"... phẩy...\" trong tiếng Việt.",
    "formation": "Số phần nguyên + 点 + Từng chữ số phần thập phân",
    "examples": [
      {
        "translation": "Ba phẩy một bốn (3,14)."
      }
    ]
  },
  "zh_1分之2_606": {
    "title": "Mẫu số + 分之 + Tử số (Cách đọc phân số: ... phần...)",
    "shortExplanation": "Cách biểu đạt phân số trong tiếng Hán; mẫu số đứng trước “分之” (fēnzhī), tử số đứng sau; tương đương với cách đọc \"... phần...\" trong tiếng Việt.",
    "longExplanation": "Trong tiếng Hán, phân số được biểu thị theo cấu trúc ngược lại so với tiếng Việt: “Mẫu số + 分之 (fēnzhī) + Tử số”. Chữ “分” có nghĩa là chia ra, “之” là trợ từ kết cấu mang nghĩa \"của\"; cấu trúc này bắt nguồn từ tư duy ngữ pháp Hán cổ: \"chia làm [Mẫu số] phần, lấy [Tử số] phần trong đó\". Ví dụ: “五分之一” (wǔ fēn zhī yī) có mẫu số là 5, tử số là 1, tức là phân số 1/5, đọc trong tiếng Việt là \"một phần năm\". Cần đặc biệt chú ý thứ tự: người học tiếng Hán rất dễ nhầm lẫn đặt tử số lên trước nếu không nắm vững quy tắc này. Tương đương với cách nói phân số \"... phần...\" trong tiếng Việt.",
    "formation": "Mẫu số + 分之 + Tử số",
    "examples": [
      {
        "translation": "Một phần năm (1/5)."
      }
    ]
  },
  "zh_百分之_607": {
    "title": "百分之 + Số từ (Cách đọc phần trăm: ... phần trăm)",
    "shortExplanation": "Cách biểu đạt tỷ lệ phần trăm (%) trong tiếng Hán; “百分之” (bǎifēnzhī) đứng trước, con số phần trăm đứng sau; tương đương với \"... phần trăm\" trong tiếng Việt.",
    "longExplanation": "“百分之 + Số từ” (bǎifēnzhī #) là cấu trúc chuẩn để biểu đạt phần trăm (%) trong tiếng Hán. Đây thực chất là trường hợp đặc biệt của cấu trúc phân số với mẫu số cố định là 100 (“百”). Trong khi tiếng Việt nói con số trước rồi thêm \"phần trăm\" ở phía sau (ví dụ: \"chín phần trăm\" = 9%), thì tiếng Hán luôn đặt “百分之” ở đằng trước rồi mới phát âm con số cụ thể ở phía sau (ví dụ: “百分之九” bǎi fēn zhī jiǔ = 9%, “百分之五十” bǎi fēn zhī wǔshí = 50%, “百分之百” bǎi fēn zhī bǎi = 100%). Tương đương với cách nói \"... phần trăm (%)\" trong tiếng Việt.",
    "formation": "百分之 + Số từ (con số phần trăm)",
    "examples": [
      {
        "translation": "Chín phần trăm (9%)."
      }
    ]
  },
  "zh_甲乙丙丁_608": {
    "title": "甲、乙、丙、丁 (Danh từ / Ký hiệu thứ tự: Giáp, Ất, Bính, Đinh / Bên A, Bên B, Bên C, Bên D)",
    "shortExplanation": "Bốn thiên can đầu tiên dùng để đánh số thứ tự, phân loại các bên trong hợp đồng pháp lý (Bên A, Bên B) hoặc xếp loại thứ bậc (A, B, C, D); \"Giáp, Ất, Bính, Đinh\", \"Bên A, Bên B\".",
    "longExplanation": "“甲、乙、丙、丁” (jiǎ, yǐ, bǐng, dīng) là bốn can đầu tiên trong hệ thống Thập Thiên Can cổ truyền của Trung Hoa. Trong tiếng Hán hiện đại, bốn chữ này được sử dụng tương đương như các chữ cái A, B, C, D trong bảng chữ cái Latinh để đánh số thứ tự, phân hạng hoặc định danh các đối tượng độc lập. Ứng dụng phổ biến nhất là trong văn bản hợp đồng pháp lý và thương mại: “甲方” (jiǎfāng - Bên A), “乙方” (yǐfāng - Bên B), “丙方” (bǐngfāng - Bên C). Ngoài ra còn dùng để chỉ các phương án lựa chọn, xếp loại học lực/chất lượng hoặc đặt tên cho các nhân vật tượng trưng trong câu chuyện/ví dụ. Tương đương với \"Giáp, Ất, Bính, Đinh\" hoặc \"Bên A, Bên B, Bên C, Bên D\" trong tiếng Việt.",
    "formation": "甲 / 乙 / 丙 / 丁 (+ 方 / Loại / Hạng) + Danh từ",
    "examples": [
      {
        "translation": "Nếu bên B đồng ý, bên A có thể giao trước sản phẩm cho bên B."
      }
    ]
  },
  "zh_顺着_609": {
    "title": "顺(着) (Giới từ: Men theo / Dọc theo / Xuôi theo / Theo)",
    "shortExplanation": "Giới từ kết hợp với từ chỉ tuyến đường, bề mặt hoặc phương hướng, biểu thị phương hướng di chuyển hoặc sự lan tỏa của động tác dọc theo quỹ đạo đó; \"men theo\", \"dọc theo\", \"theo\".",
    "longExplanation": "“顺(着)” (shùn(zhe)) là giới từ chỉ phương hướng và tuyến đường di chuyển trong tiếng Hán. Trong đó, “顺” có nghĩa là thuận theo, xuôi theo; trợ từ “着” gắn theo sau để biểu thị trạng thái liên tục. Giới từ ngữ này đứng trước danh từ chỉ con đường, bờ sông, phương hướng hoặc bề mặt cơ thể (như “顺着这条路” - dọc theo con đường này, “顺着脸” - men theo gò má, “顺着风向” - xuôi theo chiều gió), đóng vai trò trạng ngữ bổ nghĩa cho động từ di chuyển ở phía sau. Ngoài nghĩa không gian cụ thể, nó còn mở rộng sang nghĩa trừu tượng: nương theo manh mối, mạch suy nghĩ hoặc ý muốn của người khác (“顺着思路”, “顺着他的意思”). Tương đương với \"men theo\", \"dọc theo\", \"xuôi theo\", \"theo\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 顺(着) + Tuyến đường / Bề mặt / Phương hướng + Động từ di chuyển",
    "examples": [
      {
        "translation": "Mồ hôi men theo gò má anh ấy chảy dài xuống dưới."
      }
    ]
  },
  "zh_自_610": {
    "title": "自 (Giới từ văn viết: Từ / Kể từ / Bắt đầu từ)",
    "shortExplanation": "Giới từ trang trọng trong văn viết biểu thị điểm xuất phát về mặt không gian, thời gian hoặc phạm vi; tương đương với “从” (cóng); \"từ\", \"kể từ\".",
    "longExplanation": "“自” (zì) là giới từ chỉ khởi điểm mang đậm màu sắc văn ngôn và văn phong trang trọng, tương đương với “从” trong khẩu ngữ hiện đại. Khi dùng chỉ không gian hoặc phương hướng, nó thường kết hợp với các giới từ chỉ đích đến tạo thành kết cấu đối xứng thanh nhã như “自……向……” (từ... hướng về...), “自……至……” (từ... đến...), “自……往……” (từ... sang...). Ngoài ra, “自” còn dùng phổ biến để chỉ mốc khởi đầu của thời gian (như “自古以来” - từ xưa đến nay, “自昨天起” - kể từ ngày hôm qua). Thường xuất hiện trong văn bản khoa học, tin tức báo chí, văn học hoặc diễn ngôn pháp lý. Tương đương với \"từ\", \"kể từ\", \"bắt đầu từ\" trong tiếng Việt.",
    "formation": "自 + Khởi điểm (thời gian / nơi chốn) (+ 向 / 至 / 到 + Điểm đến) + Vị ngữ",
    "examples": [
      {
        "translation": "Loài chim có thể cảm nhận được các đường sức từ từ cực bắc hướng về cực nam của trái đất."
      }
    ]
  },
  "zh_把V着_611": {
    "title": "把 + Tân ngữ + Động từ + 着 (Cấu trúc câu chữ 把 mệnh lệnh: Hãy cầm/giữ... theo / Hãy làm... đi)",
    "shortExplanation": "Kết hợp câu chữ 把 với trợ từ động thái “着”, dùng trong câu mệnh lệnh, dặn dò hoặc nhắc nhở đối phương hãy đem theo, giữ gìn hoặc duy trì trạng thái của sự vật; \"hãy mang theo...\", \"cứ giữ lấy...\".",
    "longExplanation": "Kết cấu “把 + Tân ngữ + Động từ + 着” (bǎ……V zhe) là sự phối hợp độc đáo giữa câu chữ “把” (câu xử trí) và trợ từ trạng thái “着” (biểu thị sự duy trì liên tục của trạng thái hoặc hành động). Thường dùng trong các câu cầu khiến, khuyên nhủ hoặc căn dặn mang tính dứt khoát nhưng nhẹ nhàng giữa những người thân thiết. Khi người nói dặn đối phương mang theo vật gì đó bên mình (như “把书带着” - hãy mang sách theo, “把伞拿着” - cầm sẵn cái ô theo) hoặc yêu cầu giữ nguyên vị trí/tình trạng của đồ vật (như “把门开着” - cứ để cửa mở), cấu trúc này nhấn mạnh việc duy trì trạng thái sở hữu hoặc kiểm soát đối với vật đó trong suốt quá trình tiếp theo. Tương đương với \"hãy mang... theo\", \"cứ giữ... lấy\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 把 + Tân ngữ + Động từ + 着",
    "examples": [
      {
        "translation": "Bạn hãy mang theo sách bên mình đi."
      }
    ]
  },
  "zh_把O给V了_612": {
    "title": "把 + Tân ngữ + (给) + Động từ + 了 (Câu chữ 把 tăng cường ngữ khí: Đã làm... mất rồi / Đem... xử lý xong)",
    "shortExplanation": "Chêm từ “给” vào trước động từ trong câu chữ 把 nhằm tăng cường ngữ khí xử trí, thường diễn tả hành động đã hoàn tất trọn vẹn, bất cẩn để xảy ra hoặc mang kết quả không mong muốn; \"đã... mất rồi\", \"quên béng mất\".",
    "longExplanation": "Cấu trúc “把 + Tân ngữ + (给) + Động từ + 了” là một biến thể nhấn mạnh rất đặc trưng trong khẩu ngữ của câu chữ 把. Ở đây, từ “给” không mang nghĩa cho/tặng mà đóng vai trò như một trợ từ tăng cường ngữ khí xử trí, đặt ngay trước động từ chính. Nó thường xuất hiện trong hai ngữ cảnh: ① Diễn tả một hành vi lỡ đãng, bất cẩn hoặc sơ suất dẫn đến hậu quả không như ý muốn (ví dụ: “把这事给忘了” - quên béng mất chuyện này rồi, “把手机给弄丢了” - làm mất điện thoại mất rồi); ② Nhấn mạnh động tác đã được xử lý triệt để, dứt điểm (ví dụ: “把作业给写完了” - đã viết xong sạch bài tập rồi). Có thể có hoặc không có “给”, nhưng khi có “给” thì sắc thái cảm xúc và tính hoàn tất được tô đậm rõ rệt. Tương đương với \"đã... mất rồi\", \"lỡ... mất rồi\", \"quên béng đi\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 把 + Tân ngữ + (给 +) Động từ + 了",
    "examples": [
      {
        "translation": "Tôi quên béng mất chuyện này rồi."
      }
    ]
  },
  "zh_给_613": {
    "title": "给 (Giới từ câu bị động: Bị / Được - tương đương chữ 被)",
    "shortExplanation": "Giới từ dùng trong khẩu ngữ dẫn ra tác nhân gây ra hành động, tương đương với “被” (bèi) hoặc “让” (ràng) trong câu bị động; \"bị\", \"được\".",
    "longExplanation": "“给” (gěi) trong khẩu ngữ tiếng Hán cận đại và hiện đại thường được dùng như một giới từ bị động, hoàn toàn tương đương với chữ “被” (bèi), “叫” (jiào) hoặc “让” (ràng). Trong câu bị động chữ “给”, chủ ngữ là đối tượng tiếp nhận hành động (thụ sự), theo sau là “给 + Tác nhân gây ra hành động + Động từ + Thành phần khác (như 了 hoặc bổ ngữ)”. Cấu trúc này phần lớn biểu thị những sự việc không may mắn, gặp tổn thất hoặc bị động bất lợi đối với chủ thể (ví dụ: “手机给小偷偷走了” - điện thoại bị trộm lấy cắp mất, “衣服给淋湿了” - quần áo bị dầm ướt). Tương đương với \"bị\", \"được\" trong câu bị động tiếng Việt.",
    "formation": "Chủ ngữ (vật bị tác động) + 给 + Tác nhân gây ra hành động + Động từ + Bổ ngữ / 了",
    "examples": [
      {
        "translation": "Điện thoại của tôi bị kẻ trộm lấy cắp mất rồi."
      }
    ]
  },
  "zh_何不_614": {
    "title": "何不 (Phó từ tu từ: Sao không / Cớ sao không / Tại sao không / Tội gì mà không)",
    "shortExplanation": "Phó từ mang màu sắc văn nhã dùng trong câu hỏi tu từ để đưa ra lời gợi ý, khuyên nhủ hoặc đề xuất một giải pháp hợp tình hợp lý; \"sao không...\", \"cớ sao không...\".",
    "longExplanation": "“何不” (hébù) là từ ngữ bắt nguồn từ Hán cổ, gồm “何” (cớ gì, tại sao) và “不” (không), mang nghĩa \"tại sao lại không\". Thường đứng trước động từ hoặc đầu phân câu trong các câu hỏi tu từ, cuối câu thường đi kèm với trợ từ ngữ khí “呢” (ne). Người nói dùng hình thức phản vấn phủ định này không phải để truy cứu nguyên nhân, mà là để đưa ra một lời đề xuất, gợi ý vô cùng hào hứng, thỏa đáng hoặc một lời khuyên chân thành, khuyến khích đối phương nên thực hiện hành động đó (ví dụ: “何不去试试？” - sao không đi thử xem?, “何不出去走走？” - sao không ra ngoài đi dạo?). Mang sắc thái thanh lịch, văn nhã và đầy sức thuyết phục. Tương đương với \"sao không...\", \"cớ sao không...\", \"tội gì không...\" trong tiếng Việt.",
    "formation": "Hoàn cảnh / Lý do ，(Chủ ngữ +) 何不 + Động từ / Hành động đề xuất (+ 呢) ？",
    "examples": [
      {
        "translation": "Thời tiết đẹp như thế này, sao không ra ngoài dạo chơi một chuyến nhỉ?"
      }
    ]
  },
  "zh_何尝_615": {
    "title": "何尝 (Phó từ phản vấn: Đâu có / Nào có / Đâu phải không)",
    "shortExplanation": "Phó từ dùng trong câu phản vấn để nhấn mạnh phủ định hoặc khẳng định (với \"何尝不/没\"); biểu thị sự thật thực tế hoàn toàn trái ngược với bề ngoài; \"đâu có\", \"nào có\", \"đâu phải không\".",
    "longExplanation": "“何尝” (hécháng) là phó từ thường gặp trong văn viết và khẩu ngữ trang trọng, chuyên dùng trong các câu hỏi phản vấn (thường đi kèm trợ từ ngữ khí “呢” ở cuối câu) để củng cố ngữ khí khẳng định hoặc phủ định. Cụ thể có hai cách dùng: ① Khi đi với dạng phủ định “何尝不 / 何尝没”, nó tạo thành phủ định kép để nhấn mạnh ý khẳng định mạnh mẽ (ví dụ: “我何尝不想……” nghĩa là 'tôi nào phải không muốn, thực ra trong lòng tôi tha thiết muốn nhưng do hoàn cảnh không cho phép'); ② Khi đi ở dạng khẳng định thông thường, nó dùng câu hỏi tu từ để bác bỏ hoặc phủ định hoàn toàn một nhận định (ví dụ: “我何尝说过这话？” nghĩa là 'tôi có bao giờ nói lời này đâu!'). Tương đương với \"đâu có\", \"nào có\", \"đâu phải không\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 何尝 + 不 / 没 + Động từ / Tính từ + Tân ngữ + (呢)？ ｜ Chủ ngữ + 何尝 + Động từ + (呢)？",
    "examples": [
      {
        "translation": "Tôi nào có phải không muốn mua một ngôi nhà lớn cơ chứ?"
      }
    ]
  },
  "zh_何至于_616": {
    "title": "何至于 (Phó từ phản vấn: Làm gì đến mức / Đâu đến nỗi / Làm sao đến mức)",
    "shortExplanation": "Phó từ phản vấn biểu thị sự việc không đến mức nghiêm trọng, tồi tệ hoặc cực đoan như vậy; dùng để khuyên can hoặc bày tỏ sự khó hiểu; \"làm gì đến mức\", \"đâu đến nỗi\".",
    "longExplanation": "“何至于” (hé zhìyú) là từ ngữ phản vấn được cấu tạo từ phó từ nghi vấn “何” (sao, làm gì) và động từ “至于” (đến mức, đến nỗi). Cấu trúc này thường đứng trước vị ngữ hoặc phân câu thứ hai trong câu hỏi tu từ (thường đi với “呢” ở cuối câu), mang hàm ý: tình thế khách quan hay mức độ sự việc vốn dĩ không hề nghiêm trọng hay tồi tệ đến thế, hoàn toàn không cần thiết phải phản ứng thái quá, bi quan hoặc cực đoan như vậy. Thường dùng trong lời khuyên ngăn người khác không nên quá tức giận, lo âu hoặc làm lớn chuyện. Tương đương với \"làm gì đến mức...\", \"đâu đến nỗi...\", \"làm sao mà phải...\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 何至于 + Cụm động từ / Mệnh đề + (呢)？",
    "examples": [
      {
        "translation": "Bạn làm gì đến mức phải nổi giận đùng đùng như vậy cơ chứ?"
      }
    ]
  },
  "zh_V了个RESULT_617": {
    "title": "Động từ + 了个 + Bổ ngữ kết quả (Kết cấu khẩu ngữ: ... một cách thỏa thuê / đã đời / triệt để)",
    "shortExplanation": "Kết cấu khẩu ngữ sinh động diễn tả động tác được thực hiện một cách triệt để, thỏa thích, đã đời hoặc dẫn đến một kết quả trọn vẹn, bất ngờ; \"... một trận đã đời\", \"... đến mức thỏa thuê\".",
    "longExplanation": "Kết cấu “Động từ + 了个 + Tính từ / Bổ ngữ kết quả” là một cấu trúc ngữ pháp vô cùng đặc sắc và sinh động trong khẩu ngữ tiếng Hán. Trong đó, từ “个” (gè) đã bị hư hóa hoàn toàn về mặt ngữ pháp, không còn làm lượng từ đếm số lượng nữa mà đóng vai trò đệm âm và tăng cường ngữ khí cho bổ ngữ đứng sau. Cấu trúc này thường đi kèm với các tính từ hoặc ngữ kết quả chỉ mức độ tột cùng, trạng thái thỏa mãn cảm xúc hoặc kết cục triệt để, chẳng hạn như “喝了个痛快” (uống một trận thỏa thuê), “吃了个精光” (ăn sạch sành sanh), “闹了个大红脸” (ngượng chín cả mặt). Tương đương với \"... một trận đã đời / thỏa thích\", \"làm cho... một cách triệt để\" trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ + 了个 + Tính từ / Bổ ngữ kết quả (痛快 / 精光 / 饱 / 底朝天...)",
    "examples": [
      {
        "translation": "Chúng tôi đã uống một chầu thỏa thích đã đời."
      }
    ]
  },
  "zh_据说_618": {
    "title": "据说…… (Thành phần chêm xen: Nghe nói... / Tương truyền... / Theo tin cho biết...)",
    "shortExplanation": "Thành phần chêm xen đứng đầu câu biểu thị thông tin được thuật lại từ người khác hoặc dựa trên tin đồn, bản thân người nói không trực tiếp chứng kiến; \"nghe nói\", \"nghe đâu\".",
    "longExplanation": "“据说” (jùshuō) là một ngữ chêm xen (hoặc quán dụng ngữ dẫn xuất thông tin) rất phổ biến trong cả văn viết và đàm thoại hàng ngày. Nó được ghép bởi “据” (căn cứ vào, dựa theo) và “说” (nói, thuật lại), mang nghĩa đen là “căn cứ theo lời người ta nói”. Khi đứng ở đầu câu hoặc trước chủ ngữ, nó có tác dụng thông báo rõ cho người nghe rằng nội dung sau đó là gián tiếp tiếp nhận qua lời đồn đại, sự chuyển thuật của người khác hoặc tin tức truyền thông, người nói không hoàn toàn đảm bảo tính xác thực 100% của câu chuyện. Tương đương với \"nghe nói...\", \"nghe đâu...\", \"tương truyền rằng...\" trong tiếng Việt.",
    "formation": "据说 ，+ Phân câu / Mệnh đề",
    "examples": [
      {
        "translation": "Nghe nói khi còn trẻ, anh ấy từng một mình đến khu rừng già châu Phi."
      }
    ]
  },
  "zh_因而_619": {
    "title": "因而 (Liên từ: Do đó / Vì vậy / Cho nên - quan hệ nhân quả)",
    "shortExplanation": "Liên từ văn viết biểu thị quan hệ nhân quả và tiếp nối, đứng đầu phân câu sau để chỉ ra kết quả trực tiếp sinh ra từ nguyên nhân ở phân câu trước; \"do đó\", \"vì vậy\".",
    "longExplanation": "“因而” (yīn'ér) là một liên từ nối câu ghép mang tính chất nhân quả rất phổ biến trong văn phong học thuật, nghị luận và tin tức trang trọng. Nó là sự kết hợp giữa “因” (bởi vì) và “而” (mà, từ đó). Khác với từ nối khẩu ngữ “所以”, “因而” không đơn thuần chỉ ra kết quả, mà nó còn nhấn mạnh sự tiếp nối tự nhiên và trực tiếp theo quy luật nhân quả: chính nhờ/do tiền đề được nêu ở phân câu trước mà tự nhiên dẫn tới hệ quả tất yếu ở phân câu sau. Thường đứng đầu phân câu thứ hai, không cần kết hợp với “因为”. Tương đương với \"do đó\", \"vì vậy\", \"cho nên\" trong tiếng Việt.",
    "formation": "Nguyên nhân / Tiền đề ，因而 + Kết quả / Hệ quả",
    "examples": [
      {
        "translation": "Lòng con sông này rất hẹp, do đó rất dễ xảy ra lũ lụt."
      }
    ]
  },
  "zh_也_620": {
    "title": "也 (Phó từ nhượng bộ: Vẫn / Cứ / Cũng phải)",
    "shortExplanation": "Phó từ dùng trong phân câu chỉ kết quả của câu giả thiết nhượng bộ, biểu thị dù điều kiện tiền đề có nghịch lý hoặc không thuận lợi thì quyết định hay sự thật vẫn cứ tiếp tục; \"vẫn\", \"cũng phải\".",
    "longExplanation": "“也” (yě) trong cấu trúc câu phức nhượng bộ (thường đi liền sau vế giả thiết có hoặc lược bỏ liên từ “即使”, “就算”, “哪怕”, “不……”) đóng vai trò là phó từ nhấn mạnh tính bất biến của kết quả. Nó khẳng định rằng: cho dù hoàn cảnh ở vế trước có tồi tệ, ý muốn cá nhân có phản đối hay điều kiện có trở ngại đến đâu, thì hành động hoặc yêu cầu ở vế sau vẫn bắt buộc phải thực hiện hoặc vẫn diễn ra đúng như dự định mà không có bất kỳ ngoại lệ nào. Tương đương với \"vẫn\", \"dù sao cũng phải\", \"cũng phải\" trong tiếng Việt.",
    "formation": "(Dù / Cho dù +) Phân câu giả thiết nhượng bộ ，Chủ ngữ + 也 + Vị ngữ (得 / 要 / 会...)",
    "examples": [
      {
        "translation": "Bạn không muốn làm thì cũng phải làm."
      }
    ]
  },
  "zh_再也_621": {
    "title": "再……也…… (Cấu trúc nhượng bộ: Dù có... đến mấy cũng... / Cho dù... thế nào cũng...)",
    "shortExplanation": "Cấu trúc câu phức nhượng bộ biểu thị mức độ cực điểm: dù mức độ tính chất hoặc hành động có lên cao đến đâu thì kết quả, quyết tâm hoặc sự thật ở vế sau vẫn kiên định không đổi; \"dù... đến mấy cũng\".",
    "longExplanation": "“再……也……” (zài…… yě……) là một kết cấu biểu thị ý nghĩa giả thiết nhượng bộ vô cùng đắt giá trong tiếng Hán. Trong đó, “再” đứng trước tính từ hoặc động từ tâm lý mang nghĩa 'cho dù có... thêm nữa, dù mức độ có tăng tiến đến cực hạn'; còn “也” đứng ở phân câu sau để biểu thị rằng: sự nâng cao tột cùng về mức độ ấy hoàn toàn không thể làm lay chuyển được quyết tâm, kết quả hoặc phương châm hành động đã định sẵn. Cấu trúc này thường dùng để bộc lộ ý chí kiên cường vượt qua khó khăn, hoặc khẳng định một chân lý tuyệt đối không bị lay chuyển bởi ngoại cảnh. Tương đương với \"dù có... đến mấy cũng...\", \"cho dù... thế nào đi nữa cũng...\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 再 + Tính từ / Động từ + 也 + Vị ngữ / Kết quả",
    "examples": [
      {
        "translation": "Tôi dù có mệt đến mấy cũng phải làm cho xong bài tập."
      }
    ]
  },
  "zh_巴不得_622": {
    "title": "巴不得 (Động từ tâm lý: Chỉ mong sao / Nôn nóng mong muốn / Khát khao tha thiết)",
    "shortExplanation": "Động từ biểu thị tâm trạng mong mỏi vô cùng tha thiết một sự việc tốt đẹp hoặc kết quả như ý sớm xảy ra; thường mang phân câu làm tân ngữ; \"chỉ mong sao\", \"ước gì\".",
    "longExplanation": "“巴不得” (bābude) là một động từ tâm lý khẩu ngữ rất đặc sắc, được cấu thành từ “巴” (trông ngóng, tha thiết) và “不得”. Từ này chuyên dùng để diễn tả tâm trạng cực kỳ nôn nóng, sốt ruột và khao khát một mong ước tốt đẹp, một chuyển biến thuận lợi hay một kết quả hạnh phúc sẽ nhanh chóng trở thành hiện thực. Phía sau “巴不得” hầu như luôn đi kèm một mệnh đề phân câu đóng vai trò tân ngữ giải thích nội dung mong mỏi. Khác với “恨不得” (thường dùng cho những khao khát phi thực tế hoặc phóng đại), “巴不得” hướng đến những điều hoàn toàn có hy vọng xảy ra trong thực tế đời thường. Tương đương với \"chỉ mong sao...\", \"rất mong mỏi...\", \"ước gì...\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 巴不得 + Cụm động từ / Mệnh đề tân ngữ",
    "examples": [
      {
        "translation": "Tôi chỉ mong sao họ có thể thực sự làm lành với nhau, từ nay về sau sống những chuỗi ngày hòa thuận."
      }
    ]
  },
  "zh_别提多了_623": {
    "title": "别提多……了 (Cấu trúc khẩu ngữ: Khỏi phải nói... đến mức nào / Cực kỳ / Vô cùng)",
    "shortExplanation": "Cấu trúc khẩu ngữ dùng để diễn tả mức độ đạt đến đỉnh điểm, không thể dùng lời lẽ nào diễn tả xiết; mang sắc thái tán thán, khen ngợi hoặc cường điệu sinh động; \"khỏi phải nói... đến mức nào\".",
    "longExplanation": "“别提多……了” (bié tíduō…… le) là một mẫu câu cảm thán cố định rất đặc trưng của khẩu ngữ Bắc Kinh và tiếng Hán phổ thông. Từ “别提” mang nghĩa đen là 'đừng nhắc đến nữa / không cần phải nói thêm', kết hợp với “多……了” để tạo nên ý nghĩa phóng đại: sự việc hay phẩm chất đó xuất sắc, nổi bật hoặc mãnh liệt đến mức không lời nào có thể diễn tả hết được. Thường đi kèm với các tính từ tích cực (như 高兴, 精彩, 负责, 漂亮) hoặc một số động từ tâm lý. Dùng để bộc lộ sự thán phục, ngợi khen hoặc ấn tượng sâu sắc không thốt nên lời. Tương đương với \"khỏi phải nói... đến mức nào\", \"vô cùng...\", \"cực kỳ...\" trong tiếng Việt.",
    "formation": "Chủ ngữ / Sự việc ，别提多 + Tính từ / Động từ tâm lý + 了",
    "examples": [
      {
        "translation": "Người này làm việc, tận tâm và trách nhiệm khỏi phải nói."
      }
    ]
  },
  "zh_具有语体差别的同义词_624": {
    "title": "具有语体差别的同义词 (Ngữ pháp - Phong cách học: Cặp từ đồng nghĩa phân biệt theo phong cách khẩu ngữ và văn viết)",
    "shortExplanation": "Hiện tượng từ vựng - tu từ trong tiếng Hán: các cặp từ có ý nghĩa ngữ pháp và từ vựng tương đương nhưng phân chia rõ rệt về phong cách sử dụng (khẩu ngữ đời thường đối lập văn viết trang trọng).",
    "longExplanation": "Trong tiếng Hán cao cấp, “具有语体差别的同义词” (các từ đồng nghĩa mang sắc thái phong cách khác biệt) là một hiện tượng ngữ pháp - ngữ phong rất quan trọng. Nhiều cặp từ biểu thị cùng một ý nghĩa ngữ pháp hoặc hành vi, nhưng một từ thuộc phong cách khẩu ngữ (khẩu ngữ thể - tự nhiên, thân mật, dùng trong giao tiếp sinh hoạt) còn từ kia thuộc phong cách văn viết hoặc văn ngôn cổ (thư diện ngữ thể - trang trọng, nghiêm túc, dùng trong văn học, công văn, tin tức). Điển hình như: liên từ/phó từ “就” (khẩu ngữ) ↔ “便” (văn viết); động từ dẫn lời thoại “说” (khẩu ngữ) ↔ “道” (văn học cổ); giới từ xử lý “把” (khẩu ngữ) ↔ “将” (văn viết trang trọng). Người học cần nắm vững ngữ cảnh để vận dụng chuẩn xác, tránh lẫn lộn phong cách.",
    "formation": "Từ khẩu ngữ (như 就 / 说 / 把 / 爸爸 / 商量) ↔ Từ văn viết (như 便 / 道 / 将 / 父亲 / 磋商)",
    "examples": [
      {
        "translation": "Anh ấy liền trả lời rằng: 'Hãy cầm chiếc nhẫn này đi đi.' (trong đó '便 / 道 / 将' thuộc văn phong viết trang trọng, còn '就 / 说 / 把' thuộc khẩu ngữ đời thường)."
      }
    ]
  },
  "zh_恨不得_625": {
    "title": "恨不得 (Động từ tâm lý: Ước gì / Chỉ hận không thể / Nôn nóng muốn... đến tột cùng)",
    "shortExplanation": "Động từ biểu thị tâm trạng cực kỳ nôn nóng, sốt ruột khao khát thực hiện một điều gì đó vượt quá khả năng thực tế hoặc mang tính phóng đại; \"ước gì\", \"chỉ hận không thể\".",
    "longExplanation": "“恨不得” (hènbude) là một động từ tâm lý mang tính cường điệu rất cao trong tiếng Hán. Từ “恨” ở đây không mang nghĩa hận thù, mà mang nghĩa là tiếc nuối, day dứt, căm ghét sự bất lực của bản thân vì không thể làm được ngay lập tức (“hận không thể”). Do đó, “恨不得” biểu đạt một khát vọng bộc phát vô cùng mãnh liệt, cháy bỏng, muốn vượt qua mọi giới hạn về thời gian, không gian hoặc năng lực sinh lý của con người để làm ngay một việc gì đó (ví dụ: “恨不得生出一对翅膀飞过去” - ước gì mọc ra đôi cánh bay ngay đến đó, “恨不得一口吃下去” - muốn nuốt chửng ngay một miếng). Phía sau thường mang một cụm động từ hoặc phân câu có tính chất phóng đại làm tân ngữ. Tương đương với \"ước gì...\", \"chỉ hận không thể...\", \"nôn nóng muốn... đến tột cùng\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 恨不得 + Cụm động từ / Mệnh đề tân ngữ (thường mang tính phóng đại, phi thực tế)",
    "examples": [
      {
        "translation": "Khi công việc bận rộn, cô ấy ước gì một mình có thể gánh vác phần việc của hai người."
      }
    ]
  },
  "zh_顿时_626": {
    "title": "顿时 (Phó từ thời gian: Ngay lập tức / Bỗng chốc / Tức thì - dùng trong trần thuật quá khứ)",
    "shortExplanation": "Phó từ thời gian chỉ dùng trong trần thuật sự việc đã qua, biểu thị dưới tác động của một nguyên nhân hay kích thích, tình thế hoặc cảm xúc lập tức biến đổi trong chớp mắt; \"ngay lập tức\", \"bỗng chốc\".",
    "longExplanation": "“顿时” (dùnshí) là một phó từ chỉ thời gian rất tao nhã trong văn học và trần thuật văn viết tiếng Hán. Nó chỉ ra rằng dưới sự tác động của một nguyên nhân, một tin tức hoặc một kích thích bên ngoài xuất hiện ở trước đó, một trạng thái tâm lý mới, một hiện tượng hay một cảnh tượng đã lập tức bùng phát hoặc chuyển biến hoàn toàn trong khoảnh khắc ngắn ngủi. Điểm then chốt quan trọng nhất về ngữ pháp: “顿时” CHỈ DÙNG ĐỂ THUẬT LẠI SỰ VIỆC ĐÃ DIỄN RA TRONG QUÁ KHỨ, tuyệt đối không dùng cho tương lai hay câu mệnh lệnh (nếu là tương lai phải dùng “马上” hoặc “立刻”). Tương đương với \"ngay lập tức\", \"bỗng chốc\", \"thoắt cái\", \"tức thì\" trong tiếng Việt.",
    "formation": "Nguyên nhân / Kích thích khởi phát ，顿时 + Chủ ngữ + Vị ngữ (hoặc: Chủ ngữ + 顿时 + Vị ngữ)",
    "examples": [
      {
        "translation": "Nghe xong lời bác sĩ, ngay lập tức, trong lòng anh ấy lại nhen nhóm lên tia hy vọng."
      }
    ]
  },
  "zh_不由得_627": {
    "title": "不由得 (Phó từ tâm lý: Không kìm được / Bất giác / Tự nhiên nảy sinh cảm xúc)",
    "shortExplanation": "Phó từ biểu thị cảm xúc, suy nghĩ hoặc phản xạ tự nhiên trào dâng trong lòng mà bản thân không sao kiềm chế hoặc kiểm soát được; \"không kìm được\", \"bất giác\".",
    "longExplanation": "“不由得” (bùyóude) là một phó từ chỉ trạng thái tâm lý rất quen thuộc, tương đương với “不由自主” (không tự chủ được) hay “禁不住” (không nén nổi). Nó được dùng đứng trước các động từ chỉ hoạt động tâm lý, cảm xúc hoặc phản ứng cơ thể (như 担心, 笑了, 流泪, 感慨). Cấu trúc này làm nổi bật tính chất tự phát và bột phát không cưỡng lại được của tâm lý: trước một tình huống cụ thể khách quan, chủ thể dù muốn hay không cũng tự khắc sinh ra phản ứng nội tâm đó một cách vô thức. Tương đương với \"không kìm được\", \"bất giác\", \"tự nhiên thấy...\", \"không khỏi...\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 不由得 + Cụm động từ tâm lý / Cảm xúc",
    "examples": [
      {
        "translation": "Lý Bằng mang bệnh ra sân thi đấu, tôi không khỏi có chút lo lắng."
      }
    ]
  },
  "zh_V番_628": {
    "title": "Động từ + (Số từ +) 番 (Động lượng từ: ... một phen / một hồi / một lượt chu đáo)",
    "shortExplanation": "Lượng từ cho động tác (động lượng từ), đứng sau động từ để chỉ động tác được tiến hành một lượt tỉ mỉ, trải qua một quá trình hoặc tốn nhiều tâm sức; \"... một phen\", \"... một hồi\".",
    "longExplanation": "“番” (fān) khi làm động lượng từ thường kết hợp với số từ “一” (hoặc “几”) đứng sau động từ làm bổ ngữ động lượng (kết cấu “Động từ + 一番”). Khác với động lượng từ phổ thông “次” (chỉ thuần túy đếm số lần) hay “遍” (chỉ tính từ đầu đến cuối một quy trình), “一番” mang sắc thái nhấn mạnh vào quá trình hành động: đòi hỏi phải tiêu tốn một khoảng thời gian, công sức, sự suy nghĩ chín chắn hoặc trải qua một chuỗi thao tác công phu (ví dụ: “打量一番” - ngắm nghía đánh giá một hồi, “思考一番” - suy nghĩ kỹ một phen, “折腾一番” - đánh vật lăn lộn một hồi). Tương đương với \"... một phen\", \"... một hồi\", \"... một lượt kỹ càng\" trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ (+ Tân ngữ) + Số từ (一 / 几) + 番 (hoặc: Động từ + 了 + Số từ (一) + 番 + Tân ngữ)",
    "examples": [
      {
        "translation": "Anh ấy nhìn đánh giá tôi một hồi, lời đã đến bên miệng lại thôi không nói nữa."
      }
    ]
  },
  "zh_番_629": {
    "title": "番 (Danh lượng từ: Phen / Đợt / Tràng / Tấm lòng - dùng cho trải nghiệm, thử thách, tâm ý)",
    "shortExplanation": "Lượng từ dùng cho danh từ trừu tượng, thường đi kèm với các từ chỉ nỗi gian truân, sóng gió thử thách, tâm huyết hoặc lời chỉ bảo ân cần; \"phen\", \"đợt\", \"tấm (lòng)\".",
    "longExplanation": "“番” (fān) khi làm danh lượng từ (kết hợp với số từ “几” hoặc “一”, tạo thành “几番”, “一番”) chuyên dùng để định lượng cho các danh từ trừu tượng mang tính quá trình. Nó thường xuất hiện trong hai nhóm ngữ nghĩa chính: ① Dùng cho những sự việc, trải nghiệm trải qua nhiều gian truân, trắc trở, thăng trầm thử thách (như “几番风雨” - bao phen mưa gió bão bùng, “几番波折” - bao phen gập ghềnh); ② Dùng cho những lời tâm huyết, tấm lòng tốt đẹp hoặc sự cống hiến hết mình (như “一番好意” - một tấm lòng tốt, “一番苦心” - một phen khổ tâm, “一番事业” - một sự nghiệp lớn). Mang âm hưởng rất trang trọng, hàm súc và giàu chất văn học. Tương đương với \"phen\", \"đợt\", \"tấm (lòng)\" trong tiếng Việt.",
    "formation": "Số từ (一 / 几) + 番 + Danh từ trừu tượng (风雨 / 波折 / 苦心 / 好意 / 话 / 事业...)",
    "examples": [
      {
        "translation": "Trải qua bao phen mưa gió bão bùng, anh ấy mới thấu hiểu được giá trị của cuộc đời."
      }
    ]
  },
  "zh_翻番_630": {
    "title": "翻 (#) 番 (Động từ: Tăng gấp đôi / Tăng theo cấp số nhân 2^n)",
    "shortExplanation": "Động từ biểu thị số lượng tăng lên gấp đôi (khi đứng riêng) hoặc tăng theo cấp số nhân 2 lũy thừa n (khi chèn số từ ở giữa); \"tăng gấp đôi\", \"tăng gấp bội\".",
    "longExplanation": "“翻番” (fānfān) là một thuật ngữ số lượng rất thông dụng trong kinh tế, tin tức và đời sống hàng ngày, biểu thị sự tăng trưởng vượt bậc theo cấp số nhân (bội số của 2). Khi dùng độc lập “翻番” hoặc “翻了一番”, nó mang nghĩa là số lượng tăng thêm 1 lần so với cơ sở ban đầu, tức là tăng gấp đôi (2 lần). Khi chèn số từ vào giữa như “翻两番” thì tính theo công thức 2 lũy thừa n (2^2 = tăng gấp 4 lần), “翻三番” (2^3 = tăng gấp 8 lần). Cần chú ý phân biệt: “翻一番” là tăng lên gấp đôi, khác với “增加一倍” về mặt cách biểu đạt nhưng cùng giá trị toán học. Tương đương với \"tăng gấp đôi\", \"tăng gấp bội\", \"nhân lên gấp n lần\" trong tiếng Việt.",
    "formation": "Chủ ngữ + (已经 / 将) + 翻番 + (了) ｜ Chủ ngữ + 翻了 + Số từ + 番",
    "examples": [
      {
        "translation": "So với 5 năm trước, tiền lương của đa số mọi người đã tăng gấp đôi rồi."
      }
    ]
  },
  "zh_过于_631": {
    "title": "过于 (Phó từ: Quá / Quá mức / Quá đỗi)",
    "shortExplanation": "Phó từ chỉ mức độ vượt quá giới hạn bình thường hoặc tiêu chuẩn thích hợp; thường bổ nghĩa cho tính từ hoặc động từ tâm lý mang sắc thái không đồng tình hoặc nhắc nhở; \"quá\", \"quá mức\".",
    "longExplanation": "“过于” (guòyú) là phó từ chỉ mức độ mang phong cách trang trọng và thư diện hơn so với “太”. Nó được ghép từ “过” (vượt quá) và “于” (ở mức, đối với). “过于” đứng trước tính từ (thường là tính từ song âm tiết như 匆忙, 紧张, 严格, 敏感) hoặc một số động từ tâm lý để chỉ rõ mức độ phát triển của sự vật, hành vi đã vượt quá giới hạn hợp lý hay phạm vi thích đáng, dễ mang lại kết quả bất lợi hoặc không mong muốn. Thường mang sắc thái đánh giá tiêu cực hoặc đưa ra lời khuyên nhủ, phê bình nhẹ nhàng. Tương đương với \"quá\", \"quá mức\", \"quá đỗi\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 过于 + Tính từ / Động từ tâm lý (+ Tân ngữ) ｜ Động từ + 得 + 过于 + Tính từ",
    "examples": [
      {
        "translation": "Anh ấy ra ngoài quá vội vàng, đến nỗi quên cả mang theo điện thoại di động."
      }
    ]
  },
  "zh_着呢_632": {
    "title": "着呢 (Trợ từ ngữ khí: ... lắm đấy / ... còn đang đấy - nhấn mạnh trạng thái hoặc mức độ)",
    "shortExplanation": "Trợ từ ngữ khí đứng cuối câu sau tính từ hoặc động từ: ① Biểu thị mức độ rất cao (thay cho \"很 / 极了\"); ② Biểu thị trạng thái đang tiếp diễn kèm ngữ khí nhắc nhở khẳng định; \"lắm đấy\", \"còn đang... đấy\".",
    "longExplanation": "“着呢” (zhene) là một trợ từ ngữ khí đặc trưng và rất sinh động của khẩu ngữ tiếng Hán hiện đại. Khi đứng ở cuối phân câu hoặc câu, nó có hai chức năng ngữ pháp chủ yếu: ① Đứng sau tính từ hoặc một số động từ tâm lý để biểu thị mức độ cực kỳ cao, tương đương với “很”, “非常” hoặc “极了”, nhưng mang ngữ khí khẳng định chắc nịnh, tự hào hoặc nhắc nhở đối phương biết một sự thật hiển nhiên (ví dụ: “好着呢” = tốt lắm đấy, “多着呢” = nhiều lắm đấy, “忙着呢” = đang bận tối mắt tối mũi đây); ② Đứng sau động từ mang trợ từ thể “着” để nhấn mạnh một trạng thái khách quan vẫn đang duy trì ổn định, thường dùng để mách bảo hoặc giải tỏa thắc mắc cho người nghe (ví dụ: “空着呢” = còn đang trống đấy, đừng lo). Tương đương với \"... lắm đấy\", \"... còn đang... đấy\" trong tiếng Việt.",
    "formation": "Chủ ngữ + Tính từ / Động từ + 着呢 ｜ Chủ ngữ + Động từ + 着 + (Tân ngữ) + 呢",
    "examples": [
      {
        "translation": "Ngồi ở đây đi, chỗ này còn đang trống đấy."
      }
    ]
  },
  "zh_乘机_633": {
    "title": "乘机 (Phó từ / Đoản ngữ: Thừa cơ / Nhân cơ hội / Tranh thủ dịp này)",
    "shortExplanation": "Phó từ hoặc đoản ngữ trạng ngữ biểu thị việc tận dụng thời cơ, hoàn cảnh thuận lợi sẵn có để thực hiện một hành động dự định hoặc phát sinh; \"thừa cơ\", \"nhân cơ hội\".",
    "longExplanation": "“乘机” (chéngjī) là một từ kết hợp giữa “乘” (thừa, nhân, lợi dụng) và “机” (cơ hội, thời cơ). Về mặt ngữ pháp, nó đóng vai trò làm trạng ngữ đứng trước vị ngữ động từ trong câu, biểu thị việc chủ thể nắm bắt một điều kiện ngoại cảnh thuận tiện, một khoảng thời gian trống hoặc một thời cơ bất ngờ để tiến hành hành vi. Có thể dùng trong cả ngữ cảnh trung tính/tích cực (như tranh thủ chuyến công tác để tham quan danh lam thắng cảnh) lẫn ngữ cảnh tiêu cực (như kẻ xấu lợi dụng sơ hở, hỗn loạn để mưu lợi bất chính). Tương đương với \"nhân cơ hội này\", \"thừa cơ\", \"tranh thủ dịp\" trong tiếng Việt.",
    "formation": "Chủ ngữ + (可以 / 会 / 想) + 乘机 + Cụm động từ",
    "examples": [
      {
        "translation": "Chuyến công tác Bắc Kinh lần này, chúng ta có thể nhân cơ hội đi tham quan Vạn Lý Trường Thành một chuyến."
      }
    ]
  },
  "zh_不料_634": {
    "title": "不料 (Liên từ: Không ngờ / Chẳng ngờ / Ai ngờ - chuyển ý bất ngờ)",
    "shortExplanation": "Liên từ biểu thị quan hệ chuyển tiếp mang tính đột ngột; đứng đầu phân câu sau để chỉ sự việc diễn ra hoàn toàn trái ngược với dự đoán hoặc dự tính ban đầu; \"không ngờ\", \"chẳng ngờ\".",
    "longExplanation": "“不料” (bùliào) là một liên từ nối câu ghép rất thông dụng trong cả văn viết và lời nói hàng ngày, được cấu thành từ phó từ phủ định “不” (không) và động từ “料” (dự liệu, đoán trước). Nó thường đứng ở đầu phân câu thứ hai trong câu phức (sau dấu phẩy), thường kết hợp với phó từ “却” hoặc “倒” ở vế sau để tăng cường sắc thái tương phản. Cấu trúc này dùng để diễn tả: diễn biến khách quan hoặc kết quả thực tế xảy ra một cách hết sức đột ngột, hoàn toàn trái ngược với điều mà chủ thể mong đợi, dự tính hoặc trù liệu trước đó, mang lại cảm giác bất ngờ, kinh ngạc hoặc tiếc nuối. Tương đương với \"không ngờ\", \"chẳng ngờ\", \"ngờ đâu\", \"ai dè\" trong tiếng Việt.",
    "formation": "Phân câu tiền đề / dự tính ，不料 + (Chủ ngữ +) (却 / 倒 +) Phân câu sự việc bất ngờ",
    "examples": [
      {
        "translation": "Tôi chỉ muốn trêu đùa với cô ấy một chút, không ngờ cô ấy lại nổi giận thật."
      }
    ]
  },
  "zh_未免太A了_635": {
    "title": "未免 + 太 + Tính từ + 了 (Kết cấu phó từ: E rằng quá... / Không khỏi quá... / Thật là quá...)",
    "shortExplanation": "Kết cấu phó từ kết hợp với ngữ khí cảm thán, dùng để bày tỏ sự đánh giá không tán đồng, phê bình nhẹ nhàng hoặc cho rằng mức độ sự việc đã đi quá xa; \"e rằng quá...\", \"không khỏi quá...\".",
    "longExplanation": "“未免+太+Tính từ+了” (wèimiǎn tài ... le) là một cấu trúc ngữ pháp dùng để biểu thị sự đánh giá mang tính chất bất mãn, chê trách hoặc khuyên can một cách lịch sự, nhã nhặn. Trong đó, “未免” (nghĩa gốc là 'không khỏi', 'khó tránh khỏi') đứng trước cụm mức độ “太……了” nhằm làm dịu bớt mức độ gay gắt của lời phê bình, nhưng thực chất bên trong vẫn khẳng định rằng mức độ của tính chất đã vượt quá giới hạn có thể chấp nhận được. Người nói thường dùng cấu trúc này khi thấy hành động, phản ứng hoặc thái độ của ai đó quá đáng, thái quá, chậm trễ hay cực đoan. Tương đương với \"e rằng quá...\", \"không khỏi quá...\", \"thật là quá... rồi đấy\" trong tiếng Việt.",
    "formation": "Chủ ngữ / Hành vi + 未免 + 太 + Tính từ + 了",
    "examples": [
      {
        "translation": "Khi cảnh sát tới nơi thì e rằng đã quá muộn rồi."
      }
    ]
  },
  "zh_未免有些有点A_636": {
    "title": "未免 + 有些/有点(儿) + Tính từ (Kết cấu phó từ: E rằng có phần... / Không khỏi hơi... / Có vẻ hơi...)",
    "shortExplanation": "Kết cấu phó từ dùng để đưa ra nhận xét, đánh giá phê bình một cách nhẹ nhàng, hòa nhã và tế nhị về một tính chất không tích cực; \"e rằng hơi...\", \"không khỏi có phần...\".",
    "longExplanation": "“未免+有些/有点+Tính từ” (wèimiǎn yǒuxiē/yǒudiǎn ...) là dạng kết cấu biểu thị sự chê trách, không đồng tình nhưng với ngữ khí hết sức uyển chuyển, chừng mực và có chừng mực trong giao tiếp lịch sự. Khác với “未免太……了” (mang sắc thái phàn nàn rõ rệt hơn), việc dùng “有些” hoặc “有点(儿)” (hơi, có phần) sau “未免” tạo nên một lớp đệm giảm nhẹ, giúp người nói bày tỏ ý kiến phản đối mà không làm đối phương bị mất lòng hay bẽ bàng. Thường kết hợp với các tính từ chỉ thái độ ứng xử hoặc phán đoán tiêu cực như 失礼 (thất lễ), 勉强 (gượng ép), 草率 (qua loa, vội vàng), 过分 (quá đáng). Tương đương với \"e rằng hơi...\", \"không khỏi có phần...\", \"khó tránh có chút...\" trong tiếng Việt.",
    "formation": "Chủ ngữ / Hành vi + 未免 + 有些 / 有点(儿) + Tính từ",
    "examples": [
      {
        "translation": "Từ chối lời đề nghị của anh ấy thì e rằng có phần hơi thất lễ."
      }
    ]
  },
  "zh_仅仅只不过而已_637": {
    "title": "仅仅 / 只不过……而已 (Cấu trúc giới hạn: Chẳng qua chỉ là... mà thôi / Chỉ là... mà thôi)",
    "shortExplanation": "Cấu trúc biểu thị phạm vi, mức độ bị hạn chế trong một giới hạn nhỏ bé, không đáng kể hoặc không có gì to tát; \"chẳng qua chỉ là... mà thôi\", \"chỉ là... mà thôi\".",
    "longExplanation": "Cấu trúc “仅仅 / 只不过……而已” (jǐnjǐn / zhǐbuguò ... éryǐ) là mẫu câu phối hợp trước sau để nhấn mạnh tính chất nhỏ bé, bình thường, hạn chế hoặc không quan trọng của một sự vật, hiện tượng. Trong đó, “仅仅” (chỉ, vỏn vẹn) hoặc “只不过” (chẳng qua chỉ là) đứng trước tân ngữ hoặc vị ngữ để khoanh vùng giới hạn; còn “而已” (mà thôi, thế thôi) đứng ở cuối câu mang tính chất gút lại, làm nhẹ đi tầm quan trọng của sự việc. Cấu trúc này thường dùng để đính chính sự hiểu lầm của người khác, tự khiêm tốn về bản thân, hoặc làm giảm nhẹ tính nghiêm trọng của một vấn đề. Tương đương với \"chỉ là... mà thôi\", \"chẳng qua chỉ là... mà thôi\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 仅仅 / 只不过 + (是) + Cụm danh từ / Cụm động từ + 而已",
    "examples": [
      {
        "translation": "Công việc chính của anh ấy là cảnh sát, viết tiểu thuyết chẳng qua chỉ là sở thích lúc rảnh rỗi của anh ấy mà thôi."
      }
    ]
  },
  "zh_固然_638": {
    "title": "固然 (Liên từ nhượng bộ: Tuy rằng / Dẫu rằng... (thì đúng là vậy) / Cố nhiên là)",
    "shortExplanation": "Liên từ nhượng bộ đứng ở phân câu trước để thừa nhận một sự thật hiển nhiên, làm tiền đề dẫn dắt phân câu sau chuyển ngoặt hoặc bổ sung khía cạnh quan trọng hơn; \"tuy rằng... nhưng\", \"cố nhiên\".",
    "longExplanation": "“固然” (gùrán) là một liên từ nhượng bộ mang màu sắc thư diện và trang trọng rất đặc sắc trong tiếng Hán. Trong câu phức, “固然” đứng ở phân câu thứ nhất nhằm thừa nhận, công nhận một tiền đề, một ưu điểm hoặc một sự thật khách quan là đúng đắn (mang hàm ý 'điều đó thì hiển nhiên đúng rồi, không ai phủ nhận'). Tuy nhiên, mục đích chính của người nói là dùng sự thừa nhận đó làm bàn đạp để dẫn ra ý kiến trọng tâm, phương diện chuyển ngoặt hoặc khía cạnh bổ sung quan trọng hơn ở phân câu thứ hai (thường đi với liên từ “但是”, “但”, “可是”, hoặc phó từ “也”, “却”). Tương đương với \"tuy rằng... nhưng...\", \"cố nhiên là... thế nhưng...\" trong tiếng Việt.",
    "formation": "Phân câu thừa nhận tiền đề （+ 固然 + Vị ngữ） ，但是 / 也 / 却 + Phân câu chuyển ngoặt hoặc bổ sung",
    "examples": [
      {
        "translation": "Thi đỗ đại học tuy rằng tốt thật đấy, nhưng không đỗ đại học cũng đâu phải là không còn lối thoát nào nữa."
      }
    ]
  },
  "zh_无非_639": {
    "title": "无非 (Phó từ: Chẳng qua là / Không ngoài... / Đơn thuần chỉ là)",
    "shortExplanation": "Phó từ biểu thị sự việc không vượt ra ngoài phạm vi hoặc nguyên nhân nhất định; mang sắc thái quy kết bản chất sự việc về điều đơn giản hoặc không đáng ngạc nhiên; \"chẳng qua là\", \"không ngoài\".",
    "longExplanation": "“无非” (wúfēi) là một phó từ hạn định mang phong cách thư diện và nghị luận sắc sảo. Được ghép từ hai từ phủ định “无” (không) và “非” (phải, ngoài), nó tạo thành một cấu trúc phủ định kép mang ý nghĩa khẳng định: “không gì khác ngoài...”, “chẳng qua chỉ là...”. Khi đứng trước vị ngữ động từ hoặc nguyên nhân, “无非” có tác dụng chỉ ra điểm mấu chốt, bóc tách vấn đề để cho thấy rằng: sự việc nhìn bề ngoài có vẻ to tát, phức tạp nhưng xét đến cùng thì nguyên nhân, động cơ hay kết quả cũng chỉ gói gọn trong một lý do vô cùng đơn giản, quen thuộc hoặc dễ hiểu. Thường kết hợp với “是” (无非是) hoặc các động từ chỉ mục đích như “想”, “为了”. Tương đương với \"chẳng qua là\", \"không ngoài việc\", \"chỉ là vì\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 无非 + (是) + (想 / 为了 / Cụm động từ / Cụm danh từ)",
    "examples": [
      {
        "translation": "Anh ấy làm việc chăm chỉ như vậy, chẳng qua là muốn kiếm thêm chút tiền để vợ con có cuộc sống thoải mái hơn mà thôi."
      }
    ]
  },
  "zh_唯独_640": {
    "title": "唯独 (Phó từ: Duy chỉ có / Riêng chỉ có / Riêng một mình)",
    "shortExplanation": "Phó từ biểu thị tính ngoại lệ duy nhất, tách biệt một đối tượng cá biệt ra khỏi tổng thể chung; \"duy chỉ có\", \"riêng chỉ có\".",
    "longExplanation": "“唯独” (wéidú) là một phó từ mang tính chất hạn định và bài tha đặc biệt sâu sắc trong tiếng Hán. Từ này được ghép từ “唯” (chỉ, duy) và “独” (riêng, độc nhất). Về mặt cú pháp, “唯独” thường đứng trước một danh từ, đại từ hoặc ngữ phân câu để làm nổi bật đối tượng đó như một ngoại lệ duy nhất, hoàn toàn khác biệt so với tất cả các đối tượng còn lại trong tập thể. Thường đi cùng với các từ ngữ biểu thị phạm vi toàn thể ở vế khác như “都”, “大家”, “所有人”, “任何” nhằm tạo nên một sự tương phản rõ nét đến ngạc nhiên hoặc tiếc nuối. Tương đương với \"duy chỉ có\", \"riêng chỉ có\", \"chỉ riêng\" trong tiếng Việt.",
    "formation": "Tổng thể / Mọi người + 都... ，唯独 + Đối tượng đặc biệt + (Vị ngữ) ｜ 唯独 + Đối tượng đặc biệt + Vị ngữ",
    "examples": [
      {
        "translation": "Chuyến du lịch lần ấy mọi người đều đi cả, duy chỉ có bạn là không đi được."
      }
    ]
  },
  "zh_明明_641": {
    "title": "明明 (Phó từ: Rõ ràng / Rành rành / Hiển nhiên)",
    "shortExplanation": "Phó từ biểu thị sự thật hiển nhiên, xác thực và không thể chối cãi; thường dùng trong câu phản vấn, cật vấn hoặc bày tỏ sự ngạc nhiên, bất mãn; \"rõ ràng là\", \"rành rành là\".",
    "longExplanation": "“明明” (míngmíng) là một phó từ chỉ ngữ khí và sự thật rất giàu biểu cảm trong tiếng Hán. Từ này lặp lại chữ “明” (rõ ràng, sáng tỏ), dùng trước vị ngữ để nhấn mạnh rằng sự việc, tính chất hay chân tướng là vô cùng hiển nhiên, rành rành ngay trước mắt, ai nấy đều thấy rõ mười mươi không thể ngụy biện hay chối cãi. Nó thường xuất hiện trong các ngữ cảnh mang tính đối chiếu, cật vấn hoặc phê phán, chẳng hạn như: đối phương cố tình nói dối, đổi trắng thay đen, hoặc có hành vi mâu thuẫn kỳ quặc với thực tế (thường đi kèm câu phản vấn như “哪里是……啊？” hay “怎么会……呢？”). Tương đương với \"rõ ràng là\", \"rành rành là\", \"mười mươi là\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 明明 + 是 / Động từ / Tính từ ，+ Phân câu phản vấn / cật vấn",
    "examples": [
      {
        "translation": "Bài bạn đang hát rõ ràng là ca khúc nhạc trẻ thịnh hành, làm sao mà là kinh kịch được chứ?"
      }
    ]
  },
  "zh_大不了_642": {
    "title": "大不了…… (Phó từ khẩu ngữ: Cùng lắm thì... / Xấu nhất thì... / Giỏi lắm thì...)",
    "shortExplanation": "Phó từ khẩu ngữ biểu thị thái độ bình thản, không sợ hãi trước tình huống xấu nhất; dự liệu phương án xử lý tột cùng; \"cùng lắm thì\", \"xấu nhất thì\".",
    "longExplanation": "“大不了” (dàbùliǎo) là một phó từ khẩu ngữ biểu thị trạng thái tâm lý vô cùng khoáng đạt, bất cần hoặc dũng cảm đương đầu với rủi ro. Từ này đứng ở đầu phân câu thứ hai trong câu phức, mang hàm ý: tình thế tồi tệ nhất, hậu quả nghiêm trọng nhất có xảy ra đi chăng nữa thì cũng chỉ đến mức đó là cùng, bản thân hoàn toàn có thể chấp nhận, gánh vác hoặc bắt đầu lại mà không có gì phải sợ hãi hay lo lắng. Thường kết hợp với các vế trước biểu thị nguy cơ như “失败了不要紧” (thất bại cũng chẳng sao), “赶不上车也没关系” (lỡ xe cũng không sao). Tương đương với \"cùng lắm thì...\", \"xấu nhất thì...\", \"giỏi lắm thì...\" trong tiếng Việt.",
    "formation": "Phân câu tình huống xấu / nguy cơ ，大不了 + (Chủ ngữ +) Biện pháp đối phó xấu nhất",
    "examples": [
      {
        "translation": "Thất bại rồi cũng chẳng sao cả, cùng lắm thì làm lại từ đầu."
      }
    ]
  },
  "zh_大不了的_643": {
    "title": "大不了的 (Tính từ ngữ / Quán dụng ngữ: Việc gì to tát / Ghê gớm gì / Chuyện to tát)",
    "shortExplanation": "Quán dụng ngữ tính từ thường dùng trong câu phủ định hoặc phản vấn; biểu thị sự việc chỉ là chuyện vặt vãnh, bình thường, không đáng để bận tâm hay làm to chuyện; \"gì to tát\", \"ghê gớm gì\".",
    "longExplanation": "“大不了的” (dàbùliǎo de) là một cụm từ cố định mang tính chất hình dung từ hoặc danh từ hóa, rất thịnh hành trong khẩu ngữ hàng ngày. Cụm từ này hầu như luôn xuất hiện trong các kết cấu phủ định (như “没什么大不了的” = chẳng có gì to tát cả) hoặc câu hỏi phản vấn (như “有什么大不了的？” = có gì to tát cơ chứ?). Nó có chức năng hạ thấp mức độ quan trọng, thu nhỏ tầm ảnh hưởng của một sự kiện, xem đó chỉ là chuyện nhỏ nhặt thường ngày, không đáng để người ta phải cuống cuồng, hoảng sợ, làm ầm ĩ hay xem như tai họa ghê gớm. Thường dùng để an ủi người khác hoặc thể hiện thái độ xem nhẹ, tự tin đối mặt. Tương đương với \"chuyện gì to tát\", \"ghê gớm gì đâu\", \"có gì ghê gớm\" trong tiếng Việt.",
    "formation": "(Chủ ngữ +) 没什么 / 没有什么 + 大不了的 ｜ 有什么 + 大不了的 + (呢 / 啊)？",
    "examples": [
      {
        "translation": "Hôn một cái thì có gì to tát ghê gớm đâu chứ?"
      }
    ]
  },
  "zh_V于PLACE_644": {
    "title": "Động từ + 于 + Nơi chốn (Kết cấu giới từ sau động từ: ... ở / tại / từ [Nơi chốn])",
    "shortExplanation": "Kết cấu giới từ đứng sau động từ mang phong cách văn viết trang trọng; giới từ \"于\" dẫn ra địa điểm, nơi chốn diễn ra hành động hoặc khởi nguồn của sự vật; \"... ở / tại [nơi chốn]\".",
    "longExplanation": "Kết cấu “Động từ + 于 + Nơi chốn” là một kết cấu giới tân làm bổ ngữ sau động từ mang đậm dấu ấn của ngữ pháp Hán ngữ cổ (văn ngôn), được kế thừa và sử dụng rất rộng rãi trong văn phong khoa học, tin tức, văn học và giao tiếp trang trọng của tiếng Hán hiện đại. Trong kết cấu này, giới từ “于” tương đương với “在” trong khẩu ngữ, có chức năng dẫn xuất địa điểm, không gian nơi động tác được sinh ra, diễn ra hoặc kết thúc (ví dụ: “生于北京” = sinh ra tại Bắc Kinh, “产于浙江” = sản xuất/sinh trưởng tại Chiết Giang, “发生于清朝” = xảy ra vào/ở...). Các động từ đi trước thường là động từ đơn âm tiết mang tính trạng thái, xuất xứ như 产 (sinh sản, sản xuất), 生 (sinh ra), 位于 (nằm ở), 见 (thấy ở), 寄 (gửi tới). Tương đương với \"[động từ] tại / ở / từ [nơi chốn]\" trong tiếng Việt.",
    "formation": "Chủ ngữ + Động từ (产 / 生 / 止 / 落...) + 于 + Danh từ nơi chốn / Khu vực",
    "examples": [
      {
        "translation": "Trà Long Tỉnh Tây Hồ nổi tiếng được sản xuất tại khu vực Tây Hồ của tỉnh Chiết Giang."
      }
    ]
  },
  "zh_A于V_645": {
    "title": "Tính từ + 于 + Động từ (Kết cấu cố định: Dũng cảm / dám / khéo / sẵn lòng làm gì)",
    "shortExplanation": "Kết cấu ngữ pháp tao nhã trong văn viết, trong đó giới từ hoặc hậu tố \"于\" kết hợp với một số tính từ hạn định để dẫn ra động từ phía sau; biểu thị thái độ, năng lực, khuynh hướng hoặc sự thuận lợi đối với hành động đó.",
    "longExplanation": "Kết cấu “Tính từ + 于 + Động từ” là một phương thức biểu đạt mang sắc thái trang trọng, hàm súc và cổ kính trong văn viết tiếng Hán. Trong kết cấu này, “于” đóng vai trò làm giới từ hoặc hậu tố liên kết chặt chẽ với một lớp tính từ tương đối hạn định để dẫn xuất một động từ hoặc cụm động từ làm tân ngữ biểu thị phương diện hướng tới. Các kết hợp từ vựng hóa phổ biến bao gồm: “勇于” (dũng cảm, dám đương đầu làm gì, ví dụ: 勇于承担), “敢于” (dám làm gì, dũng cảm đối mặt), “善于” (giỏi, khéo léo trong việc gì, ví dụ: 善于沟通), “乐于” (vui vẻ, sẵn lòng làm gì, ví dụ: 乐于助人), “易于” (dễ dàng làm gì, ví dụ: 易于理解), “难于” (khó làm gì, ví dụ: 难于登天), “便于” (thuận tiện cho việc làm gì, ví dụ: 便于管理), “急于” (nóng vội, nôn nóng muốn làm gì, ví dụ: 急于求成). Tương đương với \"dũng cảm / dám / sẵn lòng / khéo léo / tiện cho việc làm...\" trong tiếng Việt.",
    "formation": "Chủ ngữ + Tính từ (勇 / 善 / 乐 / 敢 / 易 / 难 / 便 / 急) + 于 + Động từ + Tân ngữ",
    "examples": [
      {
        "translation": "Đưa ra quyết định đòi hỏi phải dũng cảm gánh vác trách nhiệm."
      }
    ]
  },
  "zh_致使_646": {
    "title": "致使 (Động từ kiêm ngữ / Liên từ: Khiến cho / Dẫn đến / Làm cho - chỉ hậu quả bất lợi)",
    "shortExplanation": "Động từ kiêm ngữ hoặc liên từ nhân quả mang sắc thái văn viết trang trọng, dẫn ra kết cục hoặc sự việc (thường là tiêu cực, bất lợi hoặc thất bại) do nguyên nhân hay sự cố phía trước gây nên; \"khiến cho\", \"dẫn đến\".",
    "longExplanation": "“致使” (zhìshǐ) là từ ngữ mang đậm phong cách văn viết trang trọng, được kết hợp giữa “致” (dẫn đến, chiêu dẫn) và “使” (khiến cho, làm cho). Về mặt ngữ pháp, từ này vừa có thể đảm nhiệm vai trò động từ kiêm ngữ (phía sau mang đối tượng kiêm ngữ và hành động kết quả), vừa có thể làm liên từ nhân quả đứng đầu phân câu sau của câu ghép. Điểm ngữ nghĩa then chốt của “致使” là phân câu đứng sau hầu như luôn phản ánh những hậu quả không mong muốn, thất bại, tổn thất hoặc cục diện xấu đi do sai lầm, sơ suất hay điều kiện bất lợi ở vế trước trực tiếp gây ra (rất hiếm khi dùng cho kết quả tích cực). Tương đương với \"khiến cho\", \"dẫn đến\", \"làm cho... bị...\" trong tiếng Việt.",
    "formation": "Nguyên nhân / Sự cố + 致使 + Đối tượng (Danh từ) + Kết quả xấu (Động từ / Tính từ)",
    "examples": [
      {
        "translation": "Sự bất cẩn của anh ấy đã khiến cho cuộc thí nghiệm bị thất bại."
      }
    ]
  },
  "zh_并非_647": {
    "title": "并非 (Phó từ phủ định: Tuyệt nhiên không phải là / Đâu phải là / Hoàn toàn không)",
    "shortExplanation": "Phó từ mang sắc thái văn viết trang trọng, kết hợp giữa phó từ ngữ khí \"并\" và từ phủ định phán đoán \"非\" (tức \"不是\"), dùng để tăng cường ngữ khí phủ định nhằm đính chính một nhận định sai lầm; \"tuyệt nhiên không phải là\", \"đâu phải là\".",
    "longExplanation": "“并非” (bìngfēi) là một từ phủ định đặc trưng trong văn phong học thuật, nghị luận và báo chí của tiếng Hán, được cấu tạo bởi phó từ tăng cường ngữ khí “并” và từ phủ định phán đoán “非” (tương đương với “不是”). Nó thường đứng trước danh từ, tính từ, cụm động từ hoặc mệnh đề để khẳng định rõ ràng rằng một cách nhìn nhận, tin đồn, định kiến thông thường hoặc sự suy đoán nào đó là hoàn toàn trái ngược với sự thực khách quan. So với từ phủ định thông thường “不是”, “并非” mang ngữ khí bác bỏ mạnh mẽ, trịnh trọng và dứt khoát hơn rất nhiều. Tương đương với \"tuyệt nhiên không phải\", \"hoàn toàn không phải là\", \"đâu có phải là\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 并非 + Danh từ / Tính từ / Cụm động từ / Mệnh đề",
    "examples": [
      {
        "translation": "Những người trẻ tuổi như Tiểu Vương tuyệt nhiên không phải là số ít."
      }
    ]
  },
  "zh_对N而言_648": {
    "title": "对 + Danh từ + 而言 (Khung giới từ: Đối với... mà nói / Xét từ góc độ...)",
    "shortExplanation": "Khung giới từ văn viết dùng để giới thiệu đối tượng, chủ thể hoặc góc nhìn làm căn cứ đưa ra nhận định, đánh giá; tương đương với kết cấu khẩu ngữ \"对……来说\"; \"đối với... mà nói\".",
    "longExplanation": "“对……而言” (duì... éryán) là một cấu trúc khung giới từ cố định rất phổ biến trong văn phong trang trọng, báo chí chính luận và học thuật. Trong cấu trúc này, “对” giới thiệu đối tượng hoặc phạm vi liên quan, còn “而言” bắt nguồn từ Hán ngữ cổ (nghĩa là 'mà nói'). Cấu trúc này thường đứng ở đầu câu (ngăn cách với mệnh đề chính bằng dấu phẩy) hoặc đặt ngay sau chủ ngữ, có tác dụng xác lập vị thế, góc nhìn hoặc chuẩn mực mà từ đó người nói đưa ra một nhận định, kết luận, yêu cầu hoặc phương hướng phát triển mang tính đặc thù cho chủ thể đó. Nó tương đương về mặt ý nghĩa với “对……来说” trong khẩu ngữ nhưng mang phong cách trang nghiêm và bác học hơn. Tương đương với \"đối với... mà nói\", \"xét từ góc độ của...\" trong tiếng Việt.",
    "formation": "对 + Danh từ / Cụm danh từ + 而言 ，+ Mệnh đề nhận định / phán đoán",
    "examples": [
      {
        "translation": "Đối với Trung Quốc ngày nay mà nói, phát triển kinh tế bắt buộc phải kiên trì đi theo con đường phát triển bền vững."
      }
    ]
  },
  "zh_有关N_649": {
    "title": "有关 + Danh từ (Giới từ / Đoản ngữ định ngữ: Liên quan đến / Về vấn đề...)",
    "shortExplanation": "Giới từ hoặc động từ quan hệ mang sắc thái văn viết đứng trước danh từ để giới thiệu phạm vi, chủ đề hoặc đối tượng liên quan; thường kết hợp với \"的\" để làm định ngữ bổ nghĩa cho danh từ trung tâm; \"liên quan đến\", \"về\".",
    "longExplanation": "“有关” (yǒuguān) là một từ chỉ quan hệ rất phổ biến trong tiếng Hán, cấu tạo bởi “有” (có) và “关” (liên quan). Về mặt ngữ pháp, nó có thể đóng vai trò làm giới từ hoặc cụm động từ quan hệ. Khi đứng trước danh từ tạo thành cụm “有关 + Danh từ (+ 的) + Danh từ trung tâm” (chẳng hạn như “有关服饰问题的资料”, “有关部门”), nó đảm nhiệm chức năng làm định ngữ giới hạn phạm vi đề tài, nội dung hoặc lĩnh vực của danh từ đứng sau. Ngoài ra, “有关 + Danh từ” cũng có thể đứng độc lập ở đầu câu như một trạng ngữ dẫn nhập phạm vi thảo luận. Tương đương với \"liên quan đến...\", \"về...\" trong tiếng Việt.",
    "formation": "有关 + Danh từ (+ 的) + Danh từ trung tâm ｜ 有关 + Danh từ ，+ Mệnh đề",
    "examples": [
      {
        "translation": "Anh ấy đã tra cứu rất nhiều tư liệu liên quan đến vấn đề trang phục."
      }
    ]
  },
  "zh_和N有关_650": {
    "title": "和 + Danh từ + 有关 (Kết cấu vị ngữ: Có liên quan đến / Có quan hệ mật thiết với...)",
    "shortExplanation": "Kết cấu vị ngữ kết hợp giữa giới từ \"和/与/跟\" và vị ngữ \"有关\", dùng để biểu thị sự vật, hiện tượng hoặc kết quả có quan hệ phụ thuộc, tương tác hoặc bắt nguồn từ danh từ đó; \"có liên quan đến\".",
    "longExplanation": "Cấu trúc “和 / 与 / 跟 + Danh từ + 有关” (hé N yǒuguān) là mẫu câu chuẩn mực để diễn đạt mối quan hệ ràng buộc, ảnh hưởng qua lại hoặc quy luật nhân quả giữa hai sự vật hiện tượng trong tiếng Hán. Trong đó, giới từ đi kèm thường là “和” (trong khẩu ngữ và văn phong thông thường), hoặc “与” (trong văn viết học thuật trang trọng). Cấu trúc này thường đảm nhiệm vai trò vị ngữ chính trong câu, nhằm giải thích nguyên nhân hoặc nguồn gốc của hiện tượng được nêu ở chủ ngữ. Giữa cấu trúc có thể chêm xen các phó từ chỉ mức độ như “密切有关” (liên quan mật thiết), “直接有关” (liên quan trực tiếp), hoặc dạng phủ định “无关 / 毫无关系” (hoàn toàn không liên quan). Tương đương với \"có liên quan đến...\", \"có mối liên hệ mật thiết với...\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 和 / 与 / 跟 + Danh từ + 有关",
    "examples": [
      {
        "translation": "Việc dạy học ngữ văn của Trung Quốc từ xưa đến nay luôn coi trọng việc nhận biết mặt chữ, điều này tất nhiên có liên quan đến đặc điểm của chữ Hán."
      }
    ]
  },
  "zh_不瞒你说_651": {
    "title": "不瞒你说 (Ngữ chêm xen khẩu ngữ: Không giấu gì bạn / Thành thật mà nói / Nói thực lòng)",
    "shortExplanation": "Thành phần chêm xen cố định trong khẩu ngữ, dùng khi chuẩn bị chia sẻ một tâm sự, suy nghĩ chân thật hoặc thông tin kín đáo; giúp kéo gần khoảng cách tâm lý với người nghe; \"không giấu gì bạn\", \"thực lòng mà nói\".",
    "longExplanation": "“不瞒你说” (bù mán nǐ shuō) là một quán dụng ngữ chêm xen rất phổ biến và mang đậm sắc thái thân mật trong giao tiếp khẩu ngữ tiếng Hán. Nghĩa đen của cụm từ là “không giấu giếm bạn mà nói”. Nó thường đứng ở đầu câu hoặc trước mệnh đề chính (ngăn cách bằng dấu phẩy), đóng vai trò như một tín hiệu mở đầu để thông báo rằng người nói sắp sửa giãi bày một suy nghĩ thật lòng, một bí mật cá nhân, hoặc một sự thật vốn không muốn tiết lộ cho người ngoài biết. Cụm từ này thể hiện sự tín nhiệm, chân thành và tôn trọng sâu sắc đối với người đối thoại. Tương đương với \"không giấu gì anh/bạn\", \"thành thật mà nói\", \"nói thực lòng với bạn\" trong tiếng Việt.",
    "formation": "不瞒你说 ，+ Phân câu / Mệnh đề chia sẻ suy nghĩ, sự thật",
    "examples": [
      {
        "translation": "Không giấu gì anh, đối với vấn đề này, tôi nghĩ như thế này."
      }
    ]
  },
  "zh_说真的说实在的_652": {
    "title": "说真的 / 说实在的 (Ngữ chêm xen khẩu ngữ: Nói thật lòng / Nói thực ra / Thành thực mà nói)",
    "shortExplanation": "Thành phần chêm xen dùng để nhấn mạnh tính chân thực, không khách sáo của lời nói; biểu thị người nói đang hoàn toàn nghiêm túc, chân thành bày tỏ cảm nghĩ hoặc nhận xét từ đáy lòng; \"nói thật\", \"thực sự mà nói\".",
    "longExplanation": "“说真的” (shuō zhēn de) và “说实在的” (shuō shízài de) là hai ngữ chêm xen cửa miệng vô cùng phổ biến trong khẩu ngữ tiếng Hán. Chúng được đặt ở đầu câu hoặc ngắt giữa câu bằng dấu phẩy, dùng khi người nói muốn ngưng lại một nhịp để nhấn mạnh rằng điều mình sắp nói là hoàn toàn nghiêm túc, không hề nói đùa, không khách khí và không hề nói quá. Thường dùng trước những lời nhận xét chân thật, sự cảm thán tự đáy lòng, hoặc một bài học thấm thía. Hai cụm này có thể thay thế cho nhau, trong đó “说实在的” mang cảm giác mộc mạc và chân chất hơn một chút. Tương đương với \"nói thật đấy\", \"thành thực mà nói\", \"nói thực lòng\" trong tiếng Việt.",
    "formation": "说真的 / 说实在的 ，+ Phân câu / Mệnh đề nhận xét, cảm tưởng chân thật",
    "examples": [
      {
        "translation": "Nói thực lòng, lần này thực sự là đứa trẻ đã dạy cho tôi một bài học."
      }
    ]
  },
  "zh_通红雪白_653": {
    "title": "Tính từ trạng thái cực độ (通红 / 雪白 / 漆黑...: Đỏ bừng / trắng muốt / đen kịt)",
    "shortExplanation": "Lớp tính từ trạng thái có hình thức cấu tạo chính phụ sinh động (tiền tố chỉ trạng thái hoặc sự vật kết hợp với tính từ màu sắc hay tính chất); bản thân từ đã hàm chứa ý nghĩa mức độ tuyệt đối nên không thể đi kèm phó từ chỉ mức độ như \"很\"; \"đỏ bừng\", \"trắng tinh\".",
    "longExplanation": "Các từ như “通红” (đỏ bừng, đỏ gay), “雪白” (trắng muốt, trắng như tuyết), “漆黑” (đen kịt, đen như mực), “冰凉” (lạnh ngắt, lạnh như băng), “笔直” (thẳng tắp, thẳng như cây bút) thuộc nhóm tính từ trạng thái (状态形容词) đặc sắc trong ngữ pháp tiếng Hán. Chúng được cấu tạo theo phương thức chính phụ: hình vị đứng trước đóng vai trò bổ nghĩa hoặc ví von sinh động (雪 = tuyết, 通 = thông suốt hoặc hoàn toàn, 漆 = sơn hoặc sơn then, 冰 = băng) để mô tả tính chất, màu sắc đạt đến mức độ cực hạn, tuyệt đối. Do ngữ nghĩa của chúng đã mặc nhiên mang sắc thái cực điểm, nhóm tính từ này tuyệt đối KHÔNG thể kết hợp với các phó từ chỉ mức độ như “很”, “非常”, “太”. Chúng thường đóng vai trò làm bổ ngữ kết quả sau “得” (ví dụ: 脸憋得通红), làm vị ngữ hoặc làm định ngữ bổ nghĩa cho danh từ (thường mang “的”). Tương đương với các từ láy hoặc tính từ tăng cường như \"đỏ bừng\", \"trắng muốt\", \"thẳng tắp\" trong tiếng Việt.",
    "formation": "Chủ ngữ + (Động từ + 得 +) 通红 / 雪白 / 漆黑 / 笔直 ｜ 通红 / 雪白 + 的 + Danh từ",
    "examples": [
      {
        "translation": "Mặt tôi nín thở nghẽn lại đỏ bừng cả lên."
      }
    ]
  },
  "zh_说VA就VA_654": {
    "title": "说 + Động từ/Tính từ + 就 + Động từ/Tính từ (Cấu trúc khẩu ngữ: Bảo... là... ngay / Hơi một tí là... / Nói đổi là đổi)",
    "shortExplanation": "Cấu trúc khẩu ngữ biểu thị hành động hoặc sự thay đổi trạng thái diễn ra một cách cực kỳ mau lẹ, đột ngột, tùy hứng hoặc không chút do dự; \"bảo... là... ngay\", \"nói làm là làm liền\".",
    "longExplanation": "“说 V/A 就 V/A” (shuō V/A jiù V/A) là một cấu trúc khẩu ngữ cực kỳ sống động và giàu sắc thái cảm xúc trong tiếng Hán. Trong cấu trúc này, hai vị trí vị ngữ lặp lại cùng một động từ, cụm động từ hoặc tính từ, còn “就” biểu thị sự diễn tiến tức thời. Cấu trúc này dùng để diễn tả: ① Hành động được tiến hành một cách dứt khoát, lập tức, nói là làm liền không chần chừ do dự (ví dụ: “说走就走” - nói đi là đi ngay); ② Trạng thái hay sự việc thay đổi quá bất ngờ, đột ngột ngoài dự liệu, có phần tùy tiện hoặc bốc đồng (ví dụ: “天气说变就变” - trời nói đổi là đổi ngay; “怎么说不干就不干了” - sao bảo bỏ là bỏ luôn thế). Thường đi kèm với ngữ khí ngạc nhiên, trách móc hoặc thán phục. Tương đương với \"bảo... là... ngay\", \"nói... là... liền\", \"hơi tí là...\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 说 + Động từ / Tính từ + 就 + Động từ / Tính từ (+ 了)",
    "examples": [
      {
        "translation": "Công việc tốt như vậy, sao bảo bỏ là bỏ ngay thế được?"
      }
    ]
  },
  "zh_VA得要命_655": {
    "title": "Động từ / Tính từ + 得要命 (Bổ ngữ mức độ: ... đến muốn chết / ... chết đi được / Cực kỳ)",
    "shortExplanation": "Cấu trúc bổ ngữ mức độ khẩu ngữ biểu thị trạng thái, tính chất hoặc cảm xúc đạt đến mức cùng cực, không sao chịu đựng nổi; mang sắc thái phóng đại sinh động; \"... chết đi được\", \"... đến muốn chết\".",
    "longExplanation": "“Động từ / Tính từ + 得要命” (V/A dé yàomìng) là một cấu trúc bổ ngữ trình độ rất phổ biến và giàu sức biểu cảm trong khẩu ngữ tiếng Hán. Trong đó, “要命” mang nghĩa đen là 'đoạt lấy tính mạng, làm chết người', khi làm bổ ngữ sau “得”, nó mang nghĩa phóng đại để diễn tả mức độ của tính từ hoặc động từ tâm lý đã đạt đến tột đỉnh, gay gắt đến mức làm cho người ta cảm thấy ngột ngạt hoặc không thể dung nạp thêm được nữa. Thường đi kèm với các tính từ chỉ trạng thái tâm lý, thể chất tiêu cực hoặc cảm giác mạnh (như 疼得要命 - đau chết đi được, 累得要命 - mệt đứt hơi, 饿得要命 - đói rã rời, 空虚得要命 - trống trải cùng cực, 喜欢得要命 - thích mê mệt). Tương đương với \"... chết đi được\", \"... muốn chết\", \"... vô cùng\" trong tiếng Việt.",
    "formation": "Chủ ngữ + Tính từ / Động từ tâm lý + 得要命",
    "examples": [
      {
        "translation": "Năm tiếng đồng hồ không động vào điện thoại, tôi cảm thấy trống trải chết đi được."
      }
    ]
  },
  "zh_以至于_656": {
    "title": "以至 (于) (Liên từ: Đến mức mà / Cho nên / Dẫn đến mức độ...)",
    "shortExplanation": "Liên từ văn viết biểu thị sự kéo dài, phát triển tăng tiến về thời gian, số lượng, phạm vi, hoặc dẫn ra một kết quả tất nhiên do nguyên nhân phía trước tạo thành; \"đến mức mà\", \"cho nên\".",
    "longExplanation": "“以至” hoặc “以至于” (yǐzhì / yǐzhìyú) là một liên từ biểu thị quan hệ tiếp nối, tăng tiến hoặc nhân quả có bề dày lịch sử trong văn viết Hán ngữ. Nó có hai trường hợp sử dụng chính: ① Biểu thị sự kéo dài, mở rộng của thời gian, số lượng, phạm vi hoặc mức độ từ nhỏ đến lớn, từ thấp đến cao (ví dụ: “循环往复以至无穷”); ② Đứng ở đầu phân câu sau của câu ghép để dẫn ra một kết quả hoặc trạng thái đặc thù được sản sinh một cách thuận dòng do những nỗ lực, tích lũy hoặc tình hình ở phân câu trước đem lại (như câu ví dụ: hấp thu tinh hoa các nước cho nên mới rực rỡ đến nay). Cần phân biệt với “以致” (vốn hầu như chỉ dùng cho kết quả tai hại, tồi tệ), “以至(于)” có phạm vi rộng hơn rất nhiều và thường dẫn ra kết quả tốt đẹp hoặc trung tính. Tương đương với \"đến mức mà\", \"cho nên\", \"dẫn đến\" trong tiếng Việt.",
    "formation": "Phân câu nguyên nhân / tiền đề tích lũy ，以至(于) + Phân câu kết quả / mức độ kéo dài",
    "examples": [
      {
        "translation": "Văn hóa ẩm thực của Trung Quốc tiếp thu những nét ưu việt của các quốc gia khác nhau, cho nên mới có thể rực rỡ huy hoàng cho đến ngày nay."
      }
    ]
  },
  "zh_即便_657": {
    "title": "即便 (Liên từ nhượng bộ: Cho dù / Dù cho / Ngay cả khi - văn viết)",
    "shortExplanation": "Liên từ câu ghép giả thiết nhượng bộ trong văn viết, đưa ra một điều kiện giả định có tính chất nhượng bộ cực điểm, thường hô ứng với phó từ \"也\" ở vế sau; tương đương với \"即使\"; \"cho dù\", \"dù cho\".",
    "longExplanation": "“即便” (jíbiàn) là một liên từ nhượng bộ mang đậm sắc thái văn viết và nghị luận trang trọng trong tiếng Hán, kết hợp giữa “即” (ngay, dẫu là) và “便” (thì, liền). Nó đứng ở đầu phân câu giả thiết để thừa nhận một tình huống bất lợi, một hành vi cực đoan hoặc một khả năng trái ngược với mong muốn, nhưng ngay sau đó khẳng định ở phân câu sau (thường có phó từ “也” hô ứng) rằng kết luận, thái độ hoặc bổn phận vẫn không hề bị thay đổi hay lung lay. So với từ khẩu ngữ phổ thông “即使”, “即便” có phong cách gọn gàng, trang nghiêm và mang tính văn nhã hơn. Tương đương với \"cho dù\", \"ngay cả khi\", \"dẫu rằng\" trong tiếng Việt.",
    "formation": "(Chủ ngữ +) 即便 + Phân câu giả thiết nhượng bộ ，(Chủ ngữ +) 也 + Vị ngữ / Kết luận",
    "examples": [
      {
        "translation": "Dạo này tâm trạng cô ấy không tốt, cho dù có đôi chút vô lý thì bạn cũng nên lượng thứ cho cô ấy."
      }
    ]
  },
  "zh_所在_658": {
    "title": "……所在 (Danh từ trừu tượng: Nơi cội nguồn / Chỗ then chốt / Giá trị đích thực nằm ở đó)",
    "shortExplanation": "Danh từ trừu tượng mang phong cách văn viết cổ nhã, dùng sau các danh từ hoặc tính từ thuộc tính (như 根本, 关键, 意义, 魅力) để chỉ nơi ký thác, cội nguồn bản chất hoặc chỗ quy tụ cốt lõi của sự vật; \"nơi... nằm ở đó\", \"chỗ cốt lõi\".",
    "longExplanation": "“所在” (suǒzài) trong cách dùng trừu tượng này là một danh từ phái sinh từ cấu trúc Hán ngữ cổ (chữ “所” kết hợp với động từ tồn tại “在”). Nó thường đứng sau các danh từ, tính từ hoặc cụm định ngữ chỉ tính chất căn bản (như “根本所在” - chỗ căn bản, “关键所在” - nơi mấu chốt then chốt, “力量所在” - nguồn cội sức mạnh, “价值所在” - nơi giá trị đích thực ký thác, “魅力所在” - nét quyến rũ đích thực). Cấu trúc này không dùng để chỉ một địa điểm cụ thể trên mặt đất, mà chỉ điểm tựa tinh thần, cốt lõi bản thể hoặc mục đích tối thượng mà mọi ý nghĩa quy về. Thường làm vị ngữ trong câu phán đoán “是……所在”. Tương đương với \"nơi cội nguồn căn bản nằm ở đó\", \"chỗ then chốt cốt lõi\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 是 + Thuộc tính / Từ ngữ định tính (根本 / 关键 / 价值 / 魅力 / 意义) + 所在",
    "examples": [
      {
        "translation": "Bồi dưỡng con người là điểm tựa của giáo dục, là nơi giá trị căn bản của giáo dục quy tụ về, và là chức năng bản thể của giáo dục."
      }
    ]
  },
  "zh_所在_659": {
    "title": "所在 (Danh từ cụ thể: Nơi chốn / Chỗ / Địa điểm / Chốn cư ngụ - văn viết)",
    "shortExplanation": "Danh từ mang sắc thái văn nhã trang trọng, dùng để chỉ địa điểm, nơi chốn hoặc chốn cư ngụ cụ thể; thường đi sau các ngữ định tính miêu tả cảnh vật hoặc môi trường; tương đương với \"地方\"; \"nơi chốn\", \"chốn\".",
    "longExplanation": "“所在” (suǒzài) trong cách dùng cụ thể này là một danh từ tao nhã chỉ vị trí không gian, địa điểm hoặc chốn cư trú trong văn viết Hán ngữ. Khác với từ ngữ khẩu ngữ thông tục “地方”, “所在” mang màu sắc thi vị, văn học và cổ kính. Nó thường đi kèm với các cụm tính từ miêu tả cảnh quan thiên nhiên tú lệ, khí hậu êm ả hoặc môi trường thanh nhã (như “风景秀美的所在” - chốn phong cảnh tú lệ, “心驰神往的所在” - nơi khiến lòng người say đắm), hoặc dùng trong các thuật ngữ hành chính/công văn như “所在地” (nơi đặt trụ sở, địa bàn sở tại). Khi đứng làm danh từ trung tâm trong câu, nó gợi lên cảm giác về một không gian có chiều sâu và thi vị. Tương đương với \"nơi chốn\", \"chốn\", \"địa điểm\" trong tiếng Việt.",
    "formation": "Định ngữ miêu tả cảnh quan / môi trường + 的 + 所在 ｜ Danh từ + 所在（地）",
    "examples": [
      {
        "translation": "Anh ấy đã chọn một nơi chốn phong cảnh tú lệ, khí hậu dễ chịu."
      }
    ]
  },
  "zh_统统_660": {
    "title": "统统 (Phó từ phạm vi: Tất thảy / Toàn bộ / Hết thảy - nhấn mạnh không trừ một ai hay vật gì)",
    "shortExplanation": "Phó từ phạm vi nhấn mạnh tính toàn bộ, bao hàm tất cả các đối tượng được đề cập mà không có bất kỳ ngoại lệ nào; mang sắc thái dứt khoát, triệt để hơn trong văn nói lẫn văn viết; \"tất thảy\", \"toàn bộ\", \"hết thảy\".",
    "longExplanation": "“统统” (tǒngtǒng) là phó từ chỉ phạm vi có tác dụng khái quát hóa toàn bộ các thành phần hoặc đối tượng được đề cập trước đó. Về mặt ngữ pháp, nó thường đứng trước động từ hoặc tính từ, đảm nhiệm chức năng trạng ngữ trong câu. Điểm đặc trưng của “统统” là sắc thái ngữ khí dứt khoát, bao quát đến mức tuyệt đối, nhấn mạnh rằng mọi cá thể, chủng loại hoặc khía cạnh đều được quy về một trạng thái hoặc cùng tiếp nhận một sự xử lý mà không chừa lại bất cứ ngoại lệ nào. “统统” thường được dùng trong cả khẩu ngữ sinh động và văn viết, có thể thêm âm cuốn lưỡi thành “统统儿”. Phía trước “统统” thường là sự liệt kê nhiều danh từ hoặc một tập hợp lớn làm chủ ngữ hay tân ngữ đưa lên đầu câu. Tương đương với \"tất thảy\", \"toàn bộ\", \"hết thảy\", \"tất tần tật\" trong tiếng Việt.",
    "formation": "Danh từ (Chủ ngữ / Tân ngữ đưa lên trước) + 统统 + Động từ / Tính từ",
    "examples": [
      {
        "translation": "Rạp chiếu phim, quán bar, tất thảy đều chẳng có duyên phận gì với anh ấy."
      }
    ]
  },
  "zh_以A为B_661": {
    "title": "以……为…… (Khung kết cấu cổ điển: Lấy đối tượng làm cốt lõi / Coi điều này là nền tảng / Xác lập làm định hướng)",
    "shortExplanation": "Khung ngữ pháp mang phong cách văn viết trang trọng thừa hưởng từ Hán ngữ cổ, dùng để biểu thị việc xác định, coi hoặc lấy sự vật, phương châm thứ nhất làm tiêu chuẩn, nền tảng, hạt nhân hoặc bản chất thứ hai; \"lấy... làm...\", \"coi... là...\".",
    "longExplanation": "“以……为……” (yǐ... wéi...) là một khung kết cấu hư từ kinh điển bắt nguồn từ Hán ngữ cổ và được sử dụng vô cùng phổ biến trong văn chính luận, học thuật và báo chí hiện đại. Trong kết cấu này, giới từ “以” dẫn ra đối tượng, phương thức, cơ sở hoặc hành động khởi điểm, còn “为” (đọc là wéi) đóng vai trò vị ngữ hoặc tiêu chí quy ước dẫn ra mục tiêu, vai trò, thuộc tính hoặc định vị bản chất. Các cặp từ vựng hóa rất quen thuộc gồm có: “以此为基础” (lấy đó làm nền tảng), “以……为主” (lấy... làm nòng cốt/chủ đạo), “以……为辅” (lấy... làm phụ trợ), “以人为本” (lấy con người làm gốc), “以事实为依据” (lấy sự thực làm căn cứ). Cấu trúc này giúp câu văn cô đọng, khúc chiết và chuẩn mực. Tương đương với \"lấy... làm...\", \"xem... như...\", \"coi... là...\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 以 + Danh từ / Động từ thứ nhất + 为 + Danh từ / Tính từ thứ hai",
    "examples": [
      {
        "translation": "Học tiếng Hán ở giai đoạn cao cấp nên lấy việc đọc và tiếp thu làm nòng cốt, việc học ngữ pháp làm phụ trợ."
      }
    ]
  },
  "zh_该V就得V_662": {
    "title": "该……就得…… (Cấu trúc lặp động từ khẩu ngữ: Đến lúc / Cần phải làm gì thì cứ phải làm nấy)",
    "shortExplanation": "Cấu trúc lặp lại động từ trong khẩu ngữ diễn đạt tính tất yếu và sự thỏa đáng: khi tình huống hoặc quy luật đòi hỏi phải thực hiện hành động đó thì bắt buộc phải thi hành dứt khoát, không thể né tránh; \"đến lúc làm gì thì phải làm nấy\".",
    "longExplanation": "Cấu trúc “该 + Động từ + (就) + (得 / 要) + Động từ” là một mẫu câu rất sinh động và đặc thù trong khẩu ngữ tiếng Hán. Trong đó, chữ “该” thứ nhất mang nghĩa là “đến lượt, xứng đáng, nên hoặc cần phải”, còn chữ “得” (đọc là děi) biểu thị sự bắt buộc hiển nhiên mang tính thực tế. Bằng việc lặp lại cùng một động từ ở hai vế, cấu trúc này nhấn mạnh rằng hành động đó là hoàn toàn hợp lẽ tự nhiên, đúng chức trách, đúng thời điểm hoặc không có lựa chọn nào khác ngoài việc thực hiện. Nó phản ánh thái độ thuận theo quy luật, thản nhiên chấp nhận sự thực khách quan hoặc tuân thủ nguyên tắc kinh doanh/làm việc. Các biến thể linh hoạt có thể là: “该吃就得吃” (đến bữa thì phải ăn), “该花就得花” (khoản nào cần tiêu thì phải tiêu). Tương đương với \"cần... thì cứ phải...\", \"đến lúc... thì vẫn phải...\" trong tiếng Việt.",
    "formation": "(Chủ ngữ +) 该 + Động từ + (就) + (得 / 要) + Động từ",
    "examples": [
      {
        "translation": "Vào dịp lễ tết ở Trung Quốc, các cửa hàng bận rộn nhất, hoàn toàn không có nghỉ ngơi, đến lúc phải mở cửa bán hàng thì vẫn cứ phải mở cửa."
      }
    ]
  },
  "zh_不妨V_663": {
    "title": "不妨 + Động từ (Phó từ đề xuất: Cứ việc làm / Thử làm xem sao / Chẳng ngại gì mà không làm)",
    "shortExplanation": "Phó từ biểu thị sự gợi ý, đề xuất nhẹ nhàng, nhã nhặn; chỉ ra rằng hành động đó hoàn toàn có thể thực hiện được, không có trở ngại gì và có thể đem lại lợi ích; \"cứ thử... xem\", \"chẳng ngại gì mà không...\".",
    "longExplanation": "“不妨” (bùfáng) là một phó từ mang sắc thái uyển chuyển, lịch thiệp và mang đậm phong cách văn nhã. Về mặt cấu tạo từ, “不” (không) kết hợp với “妨” (cản trở, gây hại, làm phương hại). Khi đứng trước động từ để bổ nghĩa, “不妨” đưa ra một lời gợi ý, khuyên nhủ hoặc giải pháp thay thế với ngụ ý: việc làm này không hề có hại gì, không vi phạm nguyên tắc nào, trái lại rất đáng để thử nghiệm hoặc tiến hành xem sao. Nhờ vậy, câu nói mang ngữ khí mềm mỏng, tôn trọng người đối thoại và hoàn toàn không mang tính áp đặt mệnh lệnh. Tương đương với \"chẳng sao cả, cứ thử... xem\", \"cứ việc...\", \"ngại gì mà không...\" trong tiếng Việt.",
    "formation": "(Chủ ngữ +) 不妨 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Có ý kiến gì, bạn cứ thẳng thắn nói ra cũng chẳng ngại gì."
      }
    ]
  },
  "zh_务必_664": {
    "title": "务必 (Phó từ ngữ khí mệnh lệnh: Nhất thiết phải / Tuyệt đối phải / Nhất định phải)",
    "shortExplanation": "Phó từ mang sắc thái mệnh lệnh, chỉ thị trang trọng trong văn viết và khẩu ngữ chính thức; yêu cầu đối phương nhất thiết phải thực hiện hành động, không được phép lơ là hoặc làm trái; \"nhất thiết phải\", \"nhất định phải\".",
    "longExplanation": "“务必” (wùbì) là một phó từ chỉ mệnh lệnh và yêu cầu dứt khoát trong tiếng Hán. Từ này được cấu tạo bởi “务” (dốc sức, theo đuổi) và “必” (tất yếu, ắt phải). Về mặt ngữ pháp, nó thường đứng trước động từ để biểu thị sự bắt buộc phải thực thi hành vi một cách nghiêm túc, triệt để. “务必” xuất hiện với tần suất rất cao trong các bản thông tri, quy định, hiệu lệnh công vụ, hướng dẫn an toàn hoặc những lời căn dặn khẩn cấp và trọng đại giữa cấp trên với cấp dưới, giữa tổ chức với thành viên. So với “一定要”, “务必” mang tính chất quy phạm, trang nghiêm và có trọng lượng cưỡng chế mạnh mẽ hơn nhiều. Tương đương với \"nhất thiết phải\", \"tuyệt đối phải\", \"nhất định phải\" trong tiếng Việt.",
    "formation": "(Chủ ngữ +) 务必 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Trước khi máy bay cất cánh, nhất thiết phải thắt chặt dây an toàn."
      }
    ]
  },
  "zh_鉴于_665": {
    "title": "鉴于 (Giới từ / Liên từ nhân quả: Xét thấy / Căn cứ vào / Nhận thấy tình hình)",
    "shortExplanation": "Giới từ hoặc liên từ trang trọng trong văn viết, dùng để nêu ra hiện trạng, nguyên nhân khách quan hoặc bài học kinh nghiệm làm cơ sở để đưa ra quyết định, biện pháp xử lý tương ứng; \"xét thấy\", \"căn cứ vào\".",
    "longExplanation": "“鉴于” (jiànyú) là một từ mang phong cách văn viết trang trọng, học thuật và hành chính điển hình. Chữ “鉴” có gốc nghĩa là soi gương, xem xét, rút ra bài học; “于” là giới từ cổ chỉ nơi chốn hoặc hướng tới. Về mặt ngữ pháp, “鉴于” thường đứng ở đầu câu, dẫn ra một danh từ, cụm danh từ hoặc phân câu miêu tả một bối cảnh thực tế, một tình trạng nghiêm trọng, hoặc một tiền lệ đáng lưu tâm. Dựa trên cơ sở xem xét kỹ lưỡng tiền đề đó, chủ ngữ ở phân câu chính phía sau sẽ đưa ra một quyết định, chính sách, sự điều chỉnh hoặc hành động thích ứng. Tương đương với \"xét thấy\", \"xét đến\", \"căn cứ vào tình hình\" trong tiếng Việt.",
    "formation": "鉴于 + Danh từ / Mệnh đề hiện trạng khách quan ，+ Mệnh đề chủ đạo (Quyết định / Đối sách)",
    "examples": [
      {
        "translation": "Xét thấy giáo viên ở nông thôn đang thiếu thốn nghiêm trọng, anh ấy quyết định sau khi tốt nghiệp đại học sẽ về vùng nông thôn làm giáo viên."
      }
    ]
  },
  "zh_便于_666": {
    "title": "便于 + Động từ (Động từ / Giới từ chỉ mục đích: Tiện cho việc / Thuận lợi cho / Để dễ dàng làm gì)",
    "shortExplanation": "Từ ngữ mang sắc thái văn viết trang trọng, kết nối giữa một biện pháp, phương thức hoặc thiết kế ở vế trước với mục đích tạo điều kiện thuận lợi, dễ dàng cho một hành động ở vế sau; \"tiện cho\", \"thuận lợi cho việc\".",
    "longExplanation": "“便于” (biànyú) là một kết cấu từ vựng hóa chặt chẽ giữa tính từ “便” (thuận tiện, tiện lợi) và giới từ “于” (đối với, ở phương diện). Trong cấu trúc câu, “便于” thường đứng ở đầu phân câu sau, tiếp nhận một động từ hoặc cụm động từ làm tân ngữ. Vai trò ngữ pháp của nó là chỉ rõ rằng việc sắp xếp, trình bày, quy định hoặc tổ chức ở vế câu trước được thực hiện chính là nhằm tạo ra sự dễ dàng, thuận lợi tối đa, hoặc giảm thiểu khó khăn trở ngại cho hành động tiếp theo. Từ này mang đậm phong cách văn viết, thường gặp trong các bản thuyết minh, hướng dẫn sử dụng, quy chế tổ chức hoặc công trình nghiên cứu. Tương đương với \"tiện cho việc...\", \"thuận tiện cho...\", \"để dễ bề...\" trong tiếng Việt.",
    "formation": "Mệnh đề phương thức / biện pháp / cách thức + ，+ 便于 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Bài viết phổ biến kiến thức khoa học nên được viết một cách ngắn gọn, dễ hiểu để tiện cho việc tiếp thu và lĩnh hội của độc giả."
      }
    ]
  },
  "zh_犹如N一般般A_667": {
    "title": "犹如 + Danh từ + (一般 / 般) + Tính từ (Cấu trúc tỉ dụ tu từ: Hệt như / Tựa như... đến thế)",
    "shortExplanation": "Cấu trúc so sánh tu từ giàu hình ảnh trong văn học và văn viết trang nhã; dùng \"犹如\" (tựa như, hệt như) dẫn ra hình ảnh biểu trưng so sánh, kết hợp với \"一般/般\" để bổ nghĩa mức độ cao cho tính từ hoặc vị ngữ; \"hệt như...\".",
    "longExplanation": "Kết cấu “犹如 + Danh từ + (一般 / 般) + Tính từ / Cụm động từ” (yóurú... yībān / bān...) là một phương thức biểu đạt so sánh ví von mang đậm tính thẩm mỹ và cảm xúc trong văn học Hán ngữ. Trong đó, “犹如” đóng vai trò từ so sánh (tương đương “正如”, “如同”), dẫn ra một hình tượng thiên nhiên, sự vật hay cảnh tượng kỳ vĩ, dữ dội (như núi lửa phun trào, bão tố, dòng thác). Từ “一般” hoặc “般” đứng sau danh từ đóng vai trò như một trợ từ so sánh (nghĩa là “như thể”), và toàn bộ ngữ tỉ dụ này sẽ làm trạng ngữ hoặc vị ngữ bổ nghĩa cho tính từ hoặc động từ phía sau nhằm khắc họa mức độ mãnh liệt, trạng thái tột cùng của chủ ngữ. Tương đương với \"tựa như... vậy\", \"hệt như... khó mà...\", \"giống như... đến mức...\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 犹如 + Danh từ / Hình ảnh so sánh + (一般 / 般) + Tính từ / Cụm động từ",
    "examples": [
      {
        "translation": "Sản phẩm kém chất lượng của công ty đã làm người tiêu dùng vô cùng phẫn nộ, cảm xúc giận dữ của khách hàng hệt như núi lửa phun trào, khó lòng mà kiềm chế nổi."
      }
    ]
  },
  "zh_和相比_668": {
    "title": "和……相比 (Khung so sánh giới từ: So với... mà nói / So sánh với...)",
    "shortExplanation": "Khung giới từ so sánh chuẩn mực, dùng để đưa ra đối tượng, thời điểm hoặc sự vật làm mốc quy chiếu; phân câu chính phía sau sẽ đưa ra kết luận hoặc sự biến đổi qua so sánh; \"so với...\".",
    "longExplanation": "“和……相比” (hé... xiāngbǐ) là cấu trúc so sánh đối chiếu kinh điển và cực kỳ phổ biến trong tiếng Hán. Trong cấu trúc này, giới từ “和” (hoặc các biến thể tương đương như “与”, “跟”, “同”) dẫn ra một mốc thời gian trong quá khứ, một đối tượng, hoặc một tiêu chuẩn khách quan làm căn cứ đối chiếu. “相比” (so sánh với nhau) đóng vai trò khép lại cụm giới từ, thường được đặt ở đầu câu hoặc ngay sau chủ ngữ và ngắt bằng dấu phẩy. Mệnh đề chính phía sau sẽ trình bày cụ thể sự khác biệt, xu hướng gia tăng, ưu thế hoặc nhược điểm phát sinh từ sự so sánh đó (thường kết hợp với các từ so sánh như “更”, “更……”, “有很大不同”). Tương đương với \"so với...\", \"đối chiếu với...\" trong tiếng Việt.",
    "formation": "和 / 与 / 跟 / 同 + Danh từ / Mệnh đề mốc so sánh + 相比 ，+ Mệnh đề so sánh đối chiếu",
    "examples": [
      {
        "translation": "So với 10 năm trước, con người ngày nay phải trải qua số lần lựa chọn nghề nghiệp nhiều hơn hẳn."
      }
    ]
  },
  "zh_一MM_669": {
    "title": "一 + Lượng từ + Lượng từ (Kết cấu láy lượng từ: Từng... từng... một / Hết lớp này đến lớp khác)",
    "shortExplanation": "Hình thức lặp lại lượng từ sau số từ \"一\", dùng để biểu thị số lượng nhiều, xuất hiện liên tiếp thành từng đợt, từng nhóm hoặc lớp lớp nối đuôi nhau; \"từng tốp từng tốp\", \"hết đợt này đến đợt khác\".",
    "longExplanation": "Kết cấu “一 + Lượng từ + Lượng từ” (yī + lượng từ + lượng từ) là một phương thức tu từ láy lượng từ đặc sắc trong ngữ pháp tiếng Hán. Trong kết cấu này, một lượng từ đơn âm tiết được lặp lại sau số từ “一” (chẳng hạn như: 一拨拨 - từng tốp từng tốp, 一批批 - từng đợt từng đợt, 一群群 - từng bầy từng đàn, 一阵阵 - từng cơn từng hồi, 一队队 - từng hàng từng đội). Về mặt ngữ nghĩa, hình thức này không biểu thị số lượng đơn lẻ \"một\" mà ngược lại, nó nhấn mạnh số lượng lớn, tính liên tục tiếp nối và mật độ dày đặc của sự vật hoặc đoàn người đang lần lượt kéo đến. Kết cấu này thường kết hợp với “的” để làm định ngữ bổ nghĩa cho danh từ, hoặc đứng làm trạng ngữ cho động từ mang lại cảm giác hình ảnh rất sống động. Tương đương với \"từng... từng...\", \"hết... này đến... khác\", \"lớp lớp...\" trong tiếng Việt.",
    "formation": "Số từ (一) + Lượng từ + Lượng từ (+ 的) + Danh từ (hoặc làm Trạng ngữ / Vị ngữ)",
    "examples": [
      {
        "translation": "Mỗi ngày đều có từng tốp từng tốp đồng nghiệp trong ngành đến để khảo sát và giao lưu thăm viếng."
      }
    ]
  },
  "zh_难以V_670": {
    "title": "难以 + Động từ (Đoản ngữ phó từ văn viết: Khó lòng mà / Khó có thể làm gì)",
    "shortExplanation": "Đoản ngữ kết hợp giữa tính từ \"难\" (khó) và giới từ/liên từ \"以\", đứng trước động từ song âm tiết để biểu đạt mức độ vô cùng khó khăn hoặc gần như không thể thực hiện nổi hành động đó; \"khó mà\", \"khó lòng\".",
    "longExplanation": "“难以” (nányǐ) là một phương thức biểu đạt mang sắc thái văn viết trang trọng, uy nghiêm và chuẩn mực trong tiếng Hán hiện đại. Về cấu tạo, nó kết hợp giữa “难” (khó khăn) và hư từ cổ “以” (để, mà). Điểm ngữ pháp cốt lõi của “难以” là nó hầu như luôn kết hợp với các động từ song âm tiết chỉ hoạt động nhận thức, tâm lý, dự đoán, miêu tả hoặc chấp nhận (như: 难以想象 - khó lòng tưởng tượng, 难以置信 - khó mà tin nổi, 难以预料 - khó bề dự liệu, 难以接受 - khó lòng chấp nhận, 难以忘怀 - khó có thể nguôi quên). Nó mang ngữ khí mạnh mẽ hơn hẳn từ ngữ thông tục “很难”, biểu thị rằng hành động đó gặp phải trở ngại vô cùng lớn hoặc tiệm cận mức bất khả thi trong thực tế khách quan. Tương đương với \"khó lòng mà\", \"khó có thể\", \"khó bề...\" trong tiếng Việt.",
    "formation": "(Chủ ngữ +) 难以 + Động từ song âm tiết (chỉ nhận thức / tâm lý / dự liệu / biểu đạt)",
    "examples": [
      {
        "translation": "Liệu anh ấy có thể thành công hay không hiện vẫn là điều khó lòng mà dự đoán trước được."
      }
    ]
  },
  "zh_免得_671": {
    "title": "免得 (Liên từ nhân quả mục đích: Để khỏi / Tránh việc / Nhằm tránh phải)",
    "shortExplanation": "Liên từ đứng đầu phân câu sau, biểu thị rằng hành động được tiến hành ở phân câu trước chính là nhằm phòng tránh một kết quả tiêu cực, phiền toái hoặc không mong muốn xảy ra; \"để khỏi phải\", \"tránh cho\".",
    "longExplanation": "“免得” (miǎnde) là một liên từ chỉ mục đích phòng ngừa rất quen thuộc trong cả khẩu ngữ và văn viết tiếng Hán. Từ này được cấu tạo bởi “免” (miễn trừ, tránh khỏi) và “得” (trợ từ/kết quả). Về mặt cú pháp, câu thường được chia làm hai vế: phân câu thứ nhất nêu ra biện pháp chuẩn bị, hành động phòng ngừa hoặc sự nhẫn nại trước mắt; phân câu thứ hai do “免得” đứng đầu sẽ nêu ra hậu quả tiêu cực, sự phiền hà, lãng phí thời gian hoặc rắc rối mà người nói muốn ngăn ngừa triệt để. Các từ đồng nghĩa trong tiếng Hán bao gồm “省得” (khẩu ngữ), “以免” (thiên về văn viết trang trọng). Tương đương với \"để khỏi\", \"đỡ phải\", \"tránh để cho\", \"nhằm tránh việc...\" trong tiếng Việt.",
    "formation": "Phân câu hành động phòng ngừa + ，+ 免得 + Phân câu phiền toái / sự cố cần tránh",
    "examples": [
      {
        "translation": "Hôm nay mọi người về muộn một chút, làm cho xong hết công việc đi, để khỏi ngày mai lại phải đến lần nữa."
      }
    ]
  },
  "zh_时而时而_672": {
    "title": "时而……时而…… (Liên từ sóng đôi tu từ: Khi thì... khi thì... / Lúc thì... lúc thì...)",
    "shortExplanation": "Kết cấu liên từ sóng đôi mang tính văn học cao, dùng để miêu tả các trạng thái, hiện tượng hoặc hành động đan xen, luân phiên thay đổi mau lẹ; \"lúc thì... lúc thì...\", \"khi thì... khi lại...\".",
    "longExplanation": "“时而……时而……” (shí'ér... shí'ér...) là một kết cấu sóng đôi đậm chất thi vị, văn học và hội họa trong tiếng Hán. Từ “时而” có gốc từ chữ “时” (thời điểm, lúc) và liên từ cổ “而” (mà, lại). Khi điệp lại hai hoặc nhiều lần trong câu, kết cấu này dùng để khắc họa những sắc thái tâm lý, màu sắc, âm thanh hoặc hiện tượng thiên nhiên chuyển biến linh hoạt, luân phiên thay đổi khôn lường trong một khoảng thời gian ngắn. Phía sau mỗi từ “时而” thường là tính từ, cụm tính từ hoặc động từ có tính đối xứng hoặc tương phản về ý nghĩa. Tương đương với \"lúc thì... lúc lại...\", \"khi thì... khi thì...\", \"chốc chốc lại...\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 时而 + Tính từ / Động từ thứ nhất ，+ 时而 + Tính từ / Động từ thứ hai (+ 时而 + Tính từ / Động từ thứ ba)",
    "examples": [
      {
        "translation": "Dưới ánh nắng chan hòa, màu sắc của cánh bướm rực rỡ vô cùng, khi thì vàng óng, khi thì xanh biếc, lúc lại từ màu tím chuyển sang sắc lam."
      }
    ]
  },
  "zh_时而_673": {
    "title": "时而 (Phó từ thời gian văn viết: Thỉnh thoảng / Chốc chốc / Đôi khi)",
    "shortExplanation": "Phó từ thời gian mang sắc thái văn phong tao nhã, dùng đơn độc trước động từ hoặc cụm động từ để miêu tả một hành động, âm thanh hay hiện tượng thỉnh thoảng lại tái diễn trong dòng thời gian; \"thỉnh thoảng\", \"chốc chốc lại\".",
    "longExplanation": "Khác với cấu trúc điệp đôi “时而……时而……”, “时而” (shí'ér) khi đứng đơn độc đóng vai trò là một phó từ chỉ thời gian mang đậm tính văn học và trầm lắng trong văn viết Hán ngữ. Nó đứng trước vị ngữ động từ để diễn đạt ý niệm: một hành vi, trạng thái hay phản ứng nào đó không diễn ra liên tục mọi lúc mọi nơi, nhưng cứ cách một quãng thời gian lại bất chợt xuất hiện hoặc vang lên một lần. Từ này tương đương về mặt ý nghĩa với các từ khẩu ngữ như “有时” (có lúc), “时不时” (thỉnh thoảng), “偶尔” (thỉnh thoảng, ngẫu nhiên), nhưng mang lại không khí tĩnh lặng, u buồn hoặc chiều sâu tự sự hơn hẳn. Tương đương với \"thỉnh thoảng\", \"chốc chốc\", \"đôi khi lại...\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 时而 + Động từ / Cụm động từ",
    "examples": [
      {
        "translation": "Sau khi người chủ qua đời, chú chó ấy không còn vẻ hoạt bát lanh lợi như ngày xưa nữa, chốc chốc lại phát ra những tiếng kêu khiến người nghe đau xé lòng."
      }
    ]
  },
  "zh_不禁V_674": {
    "title": "不禁 + Động từ (Phó từ chỉ phản ứng tự nhiên: Không khỏi / Không kìm được mà / Bất giác)",
    "shortExplanation": "Phó từ biểu thị cảm xúc, phản ứng tâm lý hoặc hành vi bộc phát một cách tự nhiên, không thể kiềm chế nổi trước một sự kích thích từ hoàn cảnh bên ngoài; \"không kìm được\", \"bất giác\", \"không khỏi\".",
    "longExplanation": "“不禁” (bùjīn) là một phó từ mang đậm tính tâm lý và cảm xúc trong tiếng Hán. Trong đó, chữ “禁” đọc là thanh 1 (jīn), có nghĩa là “chịu đựng, kiềm giữ, ngăn chặn”. “不禁” nghĩa là không thể nào kìm nén hay ngăn giữ lại được. Về mặt ngữ pháp, nó thường đứng trước các động từ hoặc cụm động từ chỉ cảm xúc, sự dao động tâm trạng, hoặc những phản ứng sinh lý vô thức (như: 不禁落泪 - không kìm được nước mắt, 不禁笑了起来 - bất giác bật cười, 不禁打了个寒颤 - bất giác rùng mình, 不禁兴奋起来 - không khỏi phấn khích). Cấu trúc này làm nổi bật tính chân thật, mãnh liệt và tức thời của phản ứng con người trước một tin tức, cảnh tượng hay sự biến đổi đột ngột. Tương đương với \"không kìm được mà...\", \"không khỏi...\", \"bất giác...\" trong tiếng Việt.",
    "formation": "(Chủ ngữ +) 不禁 + Động từ (chỉ cảm xúc / biến đổi tâm lý / phản ứng vô thức)",
    "examples": [
      {
        "translation": "Nghe thấy tin tức này, mọi người không kìm được mà phấn khởi hẳn lên."
      }
    ]
  },
  "zh_无不V_675": {
    "title": "无不 + Động từ (Phó từ phủ định kép: Không ai không / Không gì không / Hết thảy đều / Đều không ngoại lệ)",
    "shortExplanation": "Phó từ phủ định kép mang sắc thái văn viết trang trọng, dùng trước động từ biểu thị phạm vi toàn thể, không có bất kỳ ngoại lệ nào; \"không gì là không\", \"tất thảy đều\".",
    "longExplanation": "“无不” (wúbù) là kết cấu phó từ phủ định kép đặc trưng trong văn ngôn và văn viết hiện đại, kết hợp giữa “无” (không có, vô) và “不” (không). Trong ngữ pháp tiếng Hán, việc liên tiếp sử dụng hai từ phủ định tạo nên ngữ khí khẳng định tuyệt đối (双重否定表肯定). Cấu trúc thường đứng trước động từ, cụm động từ hoặc tính từ làm vị ngữ để nhấn mạnh rằng mọi đối tượng nằm trong phạm vi được đề cập đều mang đặc điểm hoặc chịu ảnh hưởng của hành động đó, tuyệt đối không có một ngoại lệ nào. So với phó từ “都” (đều), “无不” mang sắc thái trang nghiêm, cảm thán sâu sắc và có sức thuyết phục văn phong cao hơn nhiều. Thường thấy trong các văn bản nghị luận, văn học hoặc diễn thuyết.",
    "formation": "Chủ ngữ + 无不 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Từng lời nói từng hành động, từng cử chỉ việc làm của bạn, hết thảy đều đang ảnh hưởng đến những người xung quanh bạn."
      }
    ]
  },
  "zh_换句话说也就是说_676": {
    "title": "换句话说 / (也)就是说 (Thành phần chuyển tiếp: Nói cách khác / Tức là / Nói một cách khác là)",
    "shortExplanation": "Cụm từ liên kết hoặc ngữ chêm xen dùng để giải thích, làm rõ hoặc diễn đạt lại nội dung vừa nêu ở phân câu trước bằng một cách nói khác dễ hiểu hoặc trực diện hơn; \"nói cách khác\", \"tức là\".",
    "longExplanation": "“换句话说” (huàn jù huà shuō) và “(也)就是说” ((yě) jiù shì shuō) là hai phương thức diễn ngôn giải thích và chuyển dịch góc nhìn rất quan trọng trong tiếng Hán. Chúng thường đứng ở đầu phân câu sau (sau dấu chấm hoặc dấu phẩy) để kết nối hai mệnh đề có quan hệ diễn giải đồng nhất. Khi phân câu trước dùng ngôn ngữ chuyên môn, trừu tượng, giàu ẩn dụ hoặc phức tạp, người nói dùng cụm từ này để dẫn ra một cách diễn đạt ngắn gọn, thực chất, dễ hiểu hơn, hoặc rút ra kết luận mang tính tất yếu. “换句话说” thiên về đổi cách diễn đạt (như \"nói cách khác\"), trong khi “(也)就是说” nhấn mạnh sự quy kết tương đương về mặt ý nghĩa hoặc hệ quả logic (như \"tức là\", \"đồng nghĩa với việc\"). Cả hai đều dùng được linh hoạt trong cả văn nói lẫn văn viết.",
    "formation": "Mệnh đề 1 。/ ， 换句话说 / (也)就是说 ，+ Mệnh đề 2",
    "examples": [
      {
        "translation": "Mỗi một quốc gia đều nên chung sống hòa mục với các nước khác. Nói cách khác / Tức là, một quốc gia không thể muốn làm gì thì làm."
      }
    ]
  },
  "zh_为S所V_677": {
    "title": "为 + Chủ thể (Tác nhân) + 所 + Động từ (Cấu trúc câu bị động văn viết: Được / Bị... làm cho...)",
    "shortExplanation": "Cấu trúc câu bị động đặc trưng của văn viết kế thừa từ Hán ngữ cổ; giới từ \"为\" dẫn ra tác nhân gây ra hành động, \"所\" đứng trước động từ để biểu thị hành động tác động lên chủ ngữ; \"được / bị... làm cho\".",
    "longExplanation": "“为……所……” (wéi... suǒ...) là mẫu câu bị động điển hình có nguồn gốc từ văn ngôn cổ điển, được sử dụng vô cùng rộng rãi trong văn phong học thuật, văn học, báo chí và diễn thuyết trang trọng của tiếng Hán hiện đại. Trong kết cấu này: ① “为” đóng vai trò giới từ tương đương với “被” để dẫn ra chủ thể phát ra động tác (tác nhân); ② “所” là một trợ từ kết cấu cổ đứng ngay trước động từ vị ngữ ngoại động từ để chỉ thị mối quan hệ bị động hoặc đối tượng bị tác động. Kết cấu này thường kết hợp với các động từ chỉ nhận thức, cảm xúc, tư tưởng, ảnh hưởng hoặc chế ngự như: “为……所感动” (được/bị cảm động bởi...), “为……所吸引” (bị cuốn hút bởi...), “为……所重视” (được coi trọng bởi...), “为……所利用” (bị lợi dụng bởi...). So với câu chữ “被” thông thường mang cảm giác khẩu ngữ và thường thiên về ý nghĩa tiêu cực không may mắn, “为……所……” trung tính, trang nhã, giàu sức biểu cảm và thường dùng cho cả các ngữ cảnh tích cực hoặc ca ngợi.",
    "formation": "Chủ ngữ (Đối tượng chịu tác động) + 为 + Chủ thể (Tác nhân) + 所 + Động từ",
    "examples": [
      {
        "translation": "Không có một ai là không cảm động trước những nhân vật trong bộ phim này."
      }
    ]
  },
  "zh_足以_678": {
    "title": "足以 (Động từ năng nguyện / Phó từ văn viết: Đủ để / Đủ sức / Đủ khả năng)",
    "shortExplanation": "Từ mang sắc thái văn viết trang trọng đứng trước động từ, biểu thị số lượng, điều kiện, năng lực hoặc mức độ đã đạt tới chuẩn mực đầy đủ để tạo nên một kết quả nào đó; \"đủ để\", \"đủ sức\". Phủ định là \"不足以\".",
    "longExplanation": "“足以” (zúyǐ) là một từ vựng mang phong cách văn viết cổ kính và chuẩn mực trong tiếng Hán hiện đại, kết hợp giữa “足” (đầy đủ, sung túc) và “以” (để, dùng để). Về mặt ngữ pháp, nó có thể được nhìn nhận như một động từ năng nguyện hoặc trạng ngữ đứng trước động từ, cụm động từ hoặc mệnh đề phía sau. Cấu trúc này khẳng định rằng sức mạnh, bằng chứng, lý lẽ, trình độ hoặc điều kiện vật chất nêu ở chủ ngữ đã đạt đến một ngưỡng hoàn toàn đủ để làm phát sinh hoặc duy trì hành động/kết quả ở vế sau. Dạng phủ định của nó là “不足以 + Động từ” (không đủ để, không thể nào đủ sức để...), rất hay gặp trong các lập luận logic hoặc chỉ trích pháp lý, chính luận (ví dụ: “证据不足以证明……” - bằng chứng không đủ để chứng minh; “不足以服人” - không đủ sức thuyết phục người khác).",
    "formation": "Chủ ngữ (Điều kiện / Lý lẽ / Bằng chứng) + (不)足以 + Động từ + Tân ngữ",
    "examples": [
      {
        "translation": "Đối với loại người xấu như thế này, nếu không xử phạt nghiêm minh thì không đủ để xoa dịu nỗi phẫn nộ của người dân."
      }
    ]
  },
  "zh_东M西M_679": {
    "title": "东 + Số từ + Lượng từ + 西 + Số từ + Lượng từ (Cấu trúc bốn chữ khẩu ngữ: Nơi này một chút nơi kia một chút / Chỗ này tí chỗ kia tí - chỉ sự rời rạc, chắp vá)",
    "shortExplanation": "Cấu trúc khẩu ngữ sử dụng phương vị từ \"东\" (đông) và \"西\" (tây) kết hợp với số lượng từ (thường là số \"一\"), biểu thị hành động diễn ra rời rạc, chắp vá chỗ này một ít chỗ kia một ít, không tập trung hoặc thiếu nhất quán; \"đây một tí đó một tí\", \"lan man lộn xộn\".",
    "longExplanation": "“东 + Số từ + Lượng từ + 西 + Số từ + Lượng từ” là cấu trúc 4 chữ mang tính đối ngẫu và biểu cảm hình tượng cao trong khẩu ngữ tiếng Hán. Các phương vị từ “东” (đông) và “西” (tây) ở đây không trỏ phương hướng địa lý thực tế mà đóng vai trò biểu thị các phương hướng tản mạn, trái ngược nhau, tượng trưng cho tính chất phân tán, vụn vặt và không tập trung. Số từ đi kèm gần như luôn là “一” (một). Cấu trúc thường kết hợp với trợ từ phương thức “地” để làm trạng ngữ tu sức cho động từ chính phía sau. Một số kết hợp quán dụng điển hình: “东一句西一句地说” (nói lan man chỗ này một câu chỗ kia một câu, không ăn nhập vào đâu), “东看一眼西看一眼” (ngó nghiêng chỗ này một cái chỗ kia một cái), “东借一点西借一点” (vay chỗ này một ít chỗ kia một ít), “东走一步西走一步” (đi lảo đảo bước này bước nọ). Mang sắc thái miêu tả sinh động, thường hàm ý lộn xộn, thiếu tập trung hoặc đối phó cho qua chuyện.",
    "formation": "Chủ ngữ + 东 + 一 + Lượng từ + 西 + 一 + Lượng từ (+ 地) + Động từ",
    "examples": [
      {
        "translation": "Khách vẫn chưa về, tôi đành phải nói với anh ấy dăm ba câu bâng quơ câu này câu nọ, cố tìm chuyện để nói."
      }
    ]
  },
  "zh_V中zhng_680": {
    "title": "Động từ + 中 (zhòng) (Bổ ngữ kết quả: Trúng / Đạt đúng đích / Đúng mục tiêu)",
    "shortExplanation": "Động từ \"中\" (đọc thanh 4: zhòng) làm bổ ngữ kết quả đứng sau động từ hành động, biểu thị động tác đã bắn trúng, đánh trúng, trúng đích hoặc đoán trúng mục tiêu; \"trúng\". Khả năng thức là \"Động từ + 得中 / Động từ + 不中\".",
    "longExplanation": "Trong kết cấu “Động từ + 中 (zhòng)”, chữ “中” được phát âm ở thanh thứ tư (zhòng), mang ý nghĩa là “trúng, trúng đích, đạt đúng mục tiêu”. Về mặt ngữ pháp, nó làm bổ ngữ kết quả đứng ngay sau các động từ chỉ hành vi có phương hướng hoặc đích ngắm, ví dụ: “射中” (bắn trúng), “击中” (đánh trúng), “打中” (đánh/bắn trúng), “猜中” (đoán trúng), “看中” (chấm trúng, vừa mắt). Khi biểu thị khả năng có thể hoặc không thể trúng mục tiêu, ta chèn “得” hoặc “不” vào giữa tạo thành bổ ngữ khả năng: “打得中” (có thể đánh trúng) hoặc “打不中” (không đánh trúng được, luôn đánh hụt). Đây là một điểm ngữ pháp then chốt ở trình độ cao cấp, yêu cầu người học phân biệt rõ với “中” đọc thanh 1 (zhōng - ở giữa, đang diễn ra).",
    "formation": "Chủ ngữ + Động từ + (得 / Không) + 中 (zhòng) (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Có con ruồi bay tới, người ta giơ tay ra đập, nhưng lại cứ đập hụt mãi (không trúng)."
      }
    ]
  },
  "zh_中zhngN_681": {
    "title": "中 (zhòng) + Danh từ (Động từ mang tân ngữ: Trúng / Mắc phải / Nhiễm phải - chịu tác động hoặc trúng giải)",
    "shortExplanation": "Động từ \"中\" (đọc thanh 4: zhòng) kết hợp trực tiếp với danh từ tân ngữ để biểu thị việc bị trúng phải, nhiễm phải tai hại (như 中毒, 中暑, 中风, 中弹) hoặc trúng thưởng, trúng cử (như 中奖, 中标); \"trúng\", \"mắc phải\".",
    "longExplanation": "Khi “中” được phát âm là “zhòng” (thanh 4) và đóng vai trò động từ độc lập mang tân ngữ danh từ phía sau (“中 + Danh từ”), nó biểu thị hai trường hợp ngữ nghĩa lớn trong tiếng Hán: ① Chịu đựng hoặc nhiễm phải một yếu tố có hại tác động trực tiếp vào cơ thể/bản thân, tạo nên các từ ghép cố định như: “中毒” (trúng độc, ngộ độc), “中暑” (say nắng, trúng nắng), “中风” (trúng gió, đột quỵ), “中弹” (trúng đạn), “中计” (trúng kế, mắc bẫy); ② Trúng giải, được lựa chọn, đạt chuẩn trong thi cử hoặc đấu thầu như: “中奖” (trúng thưởng), “中彩” (trúng số), “中标” (trúng thầu), “考中 / 命中” (đỗ đạt). Cần đặc biệt chú ý phát âm thanh 4 của từ này để phân biệt với giới từ hoặc danh từ phương vị “中” (zhōng, thanh 1).",
    "formation": "Chủ ngữ + 中 (zhòng) + Danh từ (毒 / 暑 / 风 / 弹 / 计 / 奖 / 标)",
    "examples": [
      {
        "translation": "Loại nấm này không thể ăn được, ăn vào sẽ bị ngộ độc đấy."
      }
    ]
  },
  "zh_姑且_682": {
    "title": "姑且 (Phó từ nhượng bộ: Tạm thời / Cứ... trước đã / Hãy cứ xem như)",
    "shortExplanation": "Phó từ biểu thị sự nhượng bộ hoặc thỏa hiệp tạm thời trong tình thế hiện tại; người nói tạm thời chấp nhận hoặc thực hiện hành động này trước khi tính đến phương án lâu dài; \"tạm thời\", \"cứ... trước đã\".",
    "longExplanation": "“姑且” (gūqiě) là phó từ mang ý nghĩa nhượng bộ tạm thời và linh hoạt điều chỉnh chiến lược trong tiếng Hán. Trong từ này, “姑” mang hàm nghĩa tạm thời tha thứ, tạm dung nạp; “且” mang ý nghĩa tạm thời, trước mắt. Từ này đứng trước động từ vị ngữ nhằm chỉ ra rằng: giải pháp hiện tại có thể chưa phải là tối ưu, hoàn hảo hoặc triệt để nhất, nhưng trong hoàn cảnh trước mắt, người nói chấp nhận lùi một bước, tạm làm như vậy trước đã rồi sau này sẽ tìm phương kế xử lý chu toàn hơn. Các cấu trúc thường gặp gồm: “姑且先 + Động từ + 下来 / 看看” (tạm thời cứ đồng ý / xem xét thế nào đã), “姑且不论 / 姑且不谈” (tạm thời không bàn tới việc này). Tương đương với \"tạm thời\", \"hãy cứ... trước mắt\", \"tạm gác lại\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 姑且 (+ 先) + Động từ (+ Tân ngữ) ，+ 然后 / 以后 + Mệnh đề",
    "examples": [
      {
        "translation": "Chuyện này, bạn cứ tạm thời nhận lời trước đã, rồi sau đó hãy thong thả nghĩ cách tính tiếp."
      }
    ]
  },
  "zh_随即_683": {
    "title": "随即 (Phó từ liên kết văn viết: Ngay sau đó / Liền lập tức / Liền theo đó)",
    "shortExplanation": "Phó từ thời gian mang phong cách văn viết trang trọng, biểu thị một hành động hay sự kiện diễn ra ngay tức khắc, liền kề sát nút sau khi sự việc phía trước kết thúc; \"ngay sau đó\", \"liền lập tức\".",
    "longExplanation": "“随即” (suíjí) là một phó từ chỉ thời gian rất điển hình trong văn viết, tin tức thời sự và văn học tự sự của tiếng Hán. Trong đó, “随” có nghĩa là theo sau, tiếp nối; “即” có nghĩa là lập tức, ngay tức khắc. Từ này thường đứng ở đầu phân câu sau hoặc đứng trước vị ngữ của phân câu sau để biểu thị quan hệ tiếp nối cực kỳ mau lẹ về mặt thời gian giữa hai sự kiện: sự việc thứ nhất vừa kết thúc thì sự việc thứ hai phát sinh nối tiếp ngay mà không có bất kỳ khoảng trống thời gian gián đoạn nào. So với từ khẩu ngữ “马上” hay “立刻”, “随即” mang tính chất tường thuật khách quan, trôi chảy và có tính liên kết chặt chẽ giữa hai mệnh đề trong chuỗi tự sự. Tương đương với \"ngay sau đó\", \"liền theo đó\", \"liền lập tức\" trong tiếng Việt.",
    "formation": "Sự kiện 1 ，(Chủ ngữ +) 随即 + Sự kiện 2 (Động từ + Tân ngữ)",
    "examples": [
      {
        "translation": "Sau khi Chúa Giê-su chịu phép rửa xong, Ngài liền lập tức từ dưới nước bước lên."
      }
    ]
  },
  "zh_宁愿_684": {
    "title": "宁愿 (Phó từ / Liên từ chọn lựa: Thà rằng / Thà... còn hơn / Tự nguyện lựa chọn)",
    "shortExplanation": "Từ biểu thị sự cân nhắc so sánh giữa hai lựa chọn, thể hiện quyết tâm chấp nhận thiệt thòi, trả giá ở vế này để đổi lấy mục tiêu hoặc phẩm chất quan trọng hơn ở vế kia; \"thà rằng\", \"thà... còn hơn\". Thường đi cặp với \"也要\" hoặc \"也不\".",
    "longExplanation": "“宁愿” (nìngyuàn) là một phó từ hoặc liên từ chọn lựa quan trọng trong tiếng Hán, đồng nghĩa với “宁可” (nìngkě) nhưng mang sắc thái tự nguyện và thiên về ý chí chủ quan sâu sắc hơn (“愿” = tình nguyện, mong muốn). Nó xuất hiện trong các câu phức so sánh lựa chọn: giữa hai tình huống không hề hoàn hảo, người nói sau khi cân nhắc kỹ càng đã dứt khoát chọn chấp nhận thiệt thòi, tốn kém hoặc vất vả ở phân câu chứa “宁愿”, nhằm đổi lấy chất lượng, nhân phẩm, sự tôn nghiêm hoặc an toàn cốt lõi ở phân câu sau. Mẫu câu phối hợp kinh điển là: “宁愿……，也要……” (thà chấp nhận đánh đổi việc này để nhất định đạt được việc kia) hoặc “宁愿……，也不……” (thà chấp nhận việc này chứ kiên quyết không chịu rơi vào việc kia). Thể hiện bản lĩnh và quyết tâm dứt khoát của chủ ngữ.",
    "formation": "Chủ ngữ + 宁愿 + Mệnh đề chịu thiệt ，也要 / 也不 + Mệnh đề kiên quyết",
    "examples": [
      {
        "translation": "Chúng ta thà chi thêm chút tiền, cũng phải mua bằng được một cái có chất lượng tốt."
      }
    ]
  },
  "zh_N归N_685": {
    "title": "Danh từ + 归 + Danh từ (Cấu trúc nhượng bộ phân định ranh giới: ... là chuyện của... / ... ra... / Dù... thế nào đi nữa)",
    "shortExplanation": "Cấu trúc lặp lại danh từ với động từ \"归\", biểu thị sự thừa nhận một sự việc hay hành vi nào đó là có thật hoặc bình thường, nhưng ở vế sau kiên quyết vạch rõ giới hạn, không được để nó vượt quá chừng mực hay lẫn lộn với vấn đề khác; \"... là...\", \"... ra...\".",
    "longExplanation": "“Danh từ + 归 + Danh từ” là một biến thể danh từ hóa của kết cấu lặp từ nhượng bộ rất đặc sắc trong tiếng Hán. Trong kết cấu này, cùng một danh từ (thường là danh từ chỉ hành vi, tính chất hoặc sự vụ như “开玩笑” - đùa giỡn, “工作” - công việc, “原则” - nguyên tắc, “感情” - tình cảm) được lặp lại ở hai bên của động từ “归” (quy về, thuộc về). Ý nghĩa cốt lõi của kết cấu là: thừa nhận sự tồn tại tự nhiên, chính đáng của sự việc thứ nhất (ví dụ: bạn bè thì đùa giỡn là chuyện bình thường), nhưng ngay sau đó (thường kết nối bởi “但是”, “不过”, “但”, “千万别”) sẽ đưa ra sự phân định ranh giới rạch ròi, cảnh báo không được để sự việc đó biến chất, đi quá giới hạn chịu đựng hoặc ảnh hưởng đến đại cục. Tương đương với \"... là chuyện của ..., nhưng...\", \"... thì cứ ra ..., còn ...\" trong tiếng Việt.",
    "formation": "Danh từ + 归 + Danh từ ，但 / 但是 + Mệnh đề giới hạn / cảnh báo",
    "examples": [
      {
        "translation": "Giữa bạn bè với nhau, đùa thì đùa thật đấy, nhưng tuyệt đối đừng có đùa quá trớn."
      }
    ]
  },
  "zh_进而_686": {
    "title": "进而 (Liên từ tăng tiến văn viết: Tiếp đó tiến tới / Hơn nữa còn / Từ đó tiến thêm một bước)",
    "shortExplanation": "Liên từ văn viết trang trọng đứng ở đầu phân câu sau, biểu thị trên cơ sở hành động hoặc sự phát triển ở phân câu trước, sự việc tiếp tục tiến lên một nấc thang mới sâu hơn, cao hơn hoặc rộng hơn; \"tiếp đó tiến tới\", \"từ đó tiến thêm một bước\".",
    "longExplanation": "“进而” (jìn'ér) là một liên từ nối tiếp tăng tiến rất quan trọng và trang trọng trong văn chính luận, học thuật và báo chí tiếng Hán. Từ này gồm “进” (tiến lên, tiến bộ) và “而” (mà, rồi). Khác với các liên từ tiếp nối thời gian thông thường như “然后” hay “接着” chỉ đơn thuần diễn tả trình tự trước sau về mặt thời gian, “进而” mang tính chất lũy tiến và nâng cấp chất lượng: hành động ở vế trước là nền tảng, xuất phát điểm hoặc giai đoạn đầu, còn hành động ở vế sau biểu thị một bước nhảy vọt, một sự mở rộng quy mô, nâng cao tầng bậc nhận thức hoặc cải biến sâu sắc hơn về chất. Thường kết hợp trong các quá trình nhận thức, phát triển kinh tế, tự hoàn thiện hoặc chuyển đổi khoa học kỹ thuật. Tương đương với \"tiếp đó tiến tới\", \"từ đó tiến thêm một bước\", \"hơn nữa còn phát triển lên...\" trong tiếng Việt.",
    "formation": "Mệnh đề 1 (hành động nền tảng) ，进而 + Mệnh đề 2 (bước tiến nâng cao)",
    "examples": [
      {
        "translation": "Con người tiếp nhận ảnh hưởng của môi trường trong thực tiễn, rồi từ đó tiến tới cải tạo chính bản thân mình."
      }
    ]
  },
  "zh_得以V_687": {
    "title": "得以 + Động từ (Trợ động từ văn viết: Nhờ đó mà có thể / Được... / Có cơ hội thực hiện)",
    "shortExplanation": "Trợ động từ mang phong cách văn viết trang trọng, biểu thị nhờ có điều kiện thuận lợi, sự hỗ trợ hoặc nguyên nhân ở vế trước mà chủ ngữ mới có thể thực hiện được một hành động hoặc đạt được một kết quả tốt đẹp; \"nhờ đó mà có thể\", \"được\".",
    "longExplanation": "“得以” (déyǐ) là một kết cấu ngữ pháp tao nhã trong văn phong thư tịch của tiếng Hán, kết hợp giữa “得” (được, đạt được, có được khả năng) và “以” (nhờ đó, dùng để). Về mặt cú pháp, nó đảm nhiệm vai trò trợ động từ đứng trực tiếp trước một động từ hoặc cụm động từ vị ngữ (thường là động từ song âm tiết). Ý nghĩa trung tâm của “得以” là: nhờ dựa vào sự che chở, ưu ái, nỗ lực khắc phục hoặc điều kiện thuận lợi được nêu ở vế trước, chủ ngữ mới có được cơ hội, điều kiện hoặc tư cách để một hành động tích cực được tiến hành, hoặc một kết quả may mắn (như thoát khỏi tai họa, miễn trừ hình phạt, hoàn thành nhiệm vụ) được diễn ra êm đẹp. Ví dụ: “得以解决” (nhờ đó được giải quyết ổn thỏa), “得以免除” (nhờ đó được miễn trừ), “得以顺利进行” (nhờ đó được tiến hành thuận lợi). Rất hiếm khi dùng cho hậu quả tiêu cực. Tương đương với \"nhờ đó mà có thể\", \"có cơ hội được...\" trong tiếng Việt.",
    "formation": "Điều kiện thuận lợi / Nguyên nhân ，(Chủ ngữ +) 得以 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Nhờ vào việc còn trẻ tuổi, anh ấy đã được miễn trừ hình phạt."
      }
    ]
  },
  "zh_偏偏V_689": {
    "title": "偏偏 + Động từ (Phó từ ngữ khí biểu thị sự bướng bỉnh: Cứ nhất quyết / Khăng khăng / Cố tình làm trái)",
    "shortExplanation": "Phó từ ngữ khí dùng trước động từ biểu thị ý chí bướng bỉnh, cố chấp; chủ ngữ cố tình làm trái ngược hoàn toàn với lời khuyên can của mọi người hoặc lẽ thường; \"cứ nhất quyết\", \"khăng khăng đòi\".",
    "longExplanation": "“偏偏” (piānpiān) là một phó từ ngữ khí rất sinh động trong tiếng Hán, được hình thành từ việc lặp lại chữ “偏” (nghiêng, lệch, trái ngược). Khi đứng trước động từ hành vi hoặc trợ động từ ý chí (như “偏偏要去”, “偏偏不信”, “偏偏要做”), nó diễn tả thái độ bướng bỉnh, ngang ngạnh, cố chấp của chủ ngữ. Người nói dùng cấu trúc này để làm nổi bật sự mâu thuẫn đối kháng: mọi người xung quanh đã ra sức khuyên can, phân tích thiệt hơn hoặc tình thế khách quan vốn dĩ không cho phép, nhưng chủ thể lại cố tình làm ngược lại đúng điều đó, khăng khăng hành động theo ý riêng của mình. Thường mang sắc thái không đồng tình, phê phán, bất lực hoặc trách móc từ phía người nói. Tương đương với \"cứ nhất quyết\", \"khăng khăng\", \"đã bảo không được mà cứ cố làm\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 偏偏 (+ 要 / 想 / Không) + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Nơi đó quá nguy hiểm, mọi người đều khuyên anh ấy đừng đi, thế mà anh ấy cứ nhất quyết đòi đi bằng được."
      }
    ]
  },
  "zh_偏偏CLAUSE_690": {
    "title": "偏偏 + Mệnh đề (Phó từ ngữ khí biểu thị sự ngẫu nhiên trớ trêu: Oái oăm thay / Trớ trêu thay / Đen đủi thay đúng lúc đó thì...)",
    "shortExplanation": "Phó từ ngữ khí đứng trước mệnh đề biểu thị sự việc ngẫu nhiên, không may mắn xảy ra một cách hết sức trớ trêu, oái oăm vào đúng thời điểm bất tiện nhất, trái ngược hoàn toàn với mong muốn của chủ thể; \"oái oăm thay\", \"đúng lúc đó thì... lại\".",
    "longExplanation": "Khác với cách dùng biểu thị thái độ chủ quan bướng bỉnh của con người, cấu trúc “偏偏 + Mệnh đề” ở đây phản ánh quy luật trớ trêu của hoàn cảnh khách quan. Trong cấu trúc này, “偏偏” đứng trước một mệnh đề trọn vẹn (thường đi kèm trạng ngữ chỉ thời gian như “正当……时” - đúng lúc... thì) để diễn tả sự trùng hợp ngẫu nhiên đầy đen đủi, bất như ý. Bản thân người nói đang mong muốn có được sự yên tĩnh, suôn sẻ hoặc đang bận rộn làm một việc quan trọng, nhưng một sự việc phiền toái, quấy rầy lại đột ngột xảy ra ngay vào chính khoảnh khắc đó, như thể số phận đang trêu ngươi. Mang sắc thái than thở, cảm khái về sự trớ trêu của tạo hóa, sự bực bội hoặc bất lực. Tương đương với \"oái oăm thay\", \"trớ trêu thay\", \"đúng lúc... thì lại gặp đen đủi\" trong tiếng Việt.",
    "formation": "正当 / 正在 + Sự việc 1 + 的时候 / 时 ，偏偏 + Mệnh đề sự việc trớ trêu",
    "examples": [
      {
        "translation": "Đúng lúc tôi vừa ngồi xuống ăn bữa cơm tối thì oái oăm thay, điện thoại lại đổ chuông."
      }
    ]
  },
  "zh_况且_691": {
    "title": "况且 (Liên từ tăng tiến: Huống hồ, hơn nữa, vả lại)",
    "shortExplanation": "Liên từ tăng tiến dùng trong phân câu sau để bổ sung thêm một lý do hoặc điều kiện quan trọng ngoài những điều đã nêu, củng cố thêm cho kết luận hoặc quan điểm; \"hơn nữa\", \"vả lại\", \"huống hồ\".",
    "longExplanation": "“况且” (kuàngqiě) là liên từ biểu thị quan hệ tăng tiến (递进连词) thường dùng trong cả văn viết lẫn khẩu ngữ trang trọng. Nó thường đứng ở đầu phân câu sau, dùng để bổ sung thêm một lý do, nguyên nhân hoặc điều kiện xác đáng bên cạnh các căn cứ đã được nêu ra ở phân câu trước, nhằm củng cố mạnh mẽ hơn cho kết luận, quyết định hoặc thái độ của người nói. Phân câu sau có chứa “况且” thường phối hợp với các phó từ ngữ khí như “又” (yòu), “也” (yě), “还” (hái) để tăng cường sức thuyết phục (ví dụ: “况且……又……”). Khác với “而且” (chỉ thuần túy bổ sung thông tin hoặc cấp độ), “况且” luôn nhấn mạnh vào việc bổ sung lý do nhằm biện minh, thuyết phục hoặc khẳng định tính hợp lý của một phán đoán.",
    "formation": "Phân câu 1 ，况且 (+ Chủ ngữ) + 又 / 也 / 还 + Vị ngữ (Động từ / Tính từ)",
    "examples": [
      {
        "translation": "Căn nhà này giao thông thuận tiện, gần đó lại có hiệu sách, hơn nữa tiền thuê nhà lại không đắt, thật đúng là không còn gì thích hợp hơn."
      }
    ]
  },
  "zh_大TIME_692": {
    "title": "大 + Danh từ chỉ thời gian (Cấu trúc nhấn mạnh thời điểm: Giữa ban ngày ban mặt, nửa đêm nửa hôm, sáng sớm tinh mơ...)",
    "shortExplanation": "Tính từ \"大\" đứng trước các danh từ chỉ thời gian hoặc thời điểm đặc thù (như 白天, 半夜, 清早, 冬天, 热天, 过年), nhằm nhấn mạnh tính chất cực đoan của thời gian hoặc làm nổi bật tính chất bất thường, ngang nhiên, không hợp thời của hành vi xảy ra tại thời điểm đó; \"giữa ban ngày ban mặt\", \"nửa đêm nửa hôm\".",
    "longExplanation": "Trong khẩu ngữ tiếng Hán, kết cấu “大 + Danh từ chỉ thời gian” là một phương thức biểu đạt tu từ giàu tính biểu cảm. Ở đây, “大” không mang nghĩa kích thước to lớn thông thường, mà được dùng trước một số danh từ chỉ thời gian đặc định (như: 白天 - ban ngày, 半夜 - nửa đêm, 清早 - sáng sớm, 冬天 - mùa đông, 夏天 - mùa hè, 年 - dịp Tết) để nhấn mạnh mức độ trọn vẹn, đỉnh điểm hoặc tính chất đặc biệt rõ rệt của khoảng thời gian đó. Khi dùng trong câu trần thuật hoặc cảm thán, cấu trúc này thường mang sắc thái nhấn mạnh tính bất hợp lý, sự đường đột, ngang nhiên hoặc sự phiền hà, không đúng lúc của sự việc (ví dụ: “大白天被人偷走” - bị trộm ngang nhiên giữa ban ngày ban mặt; “大半夜不睡觉” - nửa đêm nửa hôm không ngủ mà quấy rầy; “大冬天的穿这么少” - giữa mùa đông giá rét mà mặc phong phanh). Tương đương với các lối nói khẩu ngữ tiếng Việt như \"giữa ban ngày ban mặt\", \"nửa đêm nửa hôm\", \"sáng sớm tinh mơ\", \"giữa lúc Tết nhất\".",
    "formation": "(Chủ ngữ +) 大 + Danh từ chỉ thời gian (白天 / 半夜 / 清早 / 冬天 / 过年) + Vị ngữ (Động từ / Tính từ)",
    "examples": [
      {
        "translation": "Chiếc xe ô tô đó bị người ta lấy trộm ngay giữa ban ngày ban mặt."
      }
    ]
  },
  "zh_与其V倒不如V_693": {
    "title": "(与其) + Động từ 1 / Mệnh đề 1 + 倒不如 + Động từ 2 / Mệnh đề 2 (Mẫu câu lựa chọn so sánh: Thay vì... thì chi bằng / thà rằng... còn hơn)",
    "shortExplanation": "Cấu trúc câu phức biểu thị sự cân nhắc lựa chọn; người nói so sánh hai phương án hành động và dứt khoát bỏ phương án trước để chọn phương án sau, phó từ \"倒\" nhấn mạnh sự tương phản và tính hợp lý của sự lựa chọn; \"thay vì... thì chi bằng...\", \"thà... còn hơn\".",
    "longExplanation": "“(与其)……倒不如……” ((yǔqí)... dǎobùrú...) là một biến thể nhấn mạnh đầy biểu cảm của mẫu câu lựa chọn lấy - bỏ (选择取舍复句) trong tiếng Hán. Trong cấu trúc này: ① “与其” đứng ở phân câu thứ nhất để dẫn ra phương án hoặc hành động bị từ bỏ, bị đánh giá là không thỏa đáng hoặc không có hiệu quả (có thể lược bỏ trong khẩu ngữ linh hoạt); ② “倒不如” đứng ở phân câu thứ hai để dẫn ra phương án được lựa chọn, được xem là khôn ngoan, thiết thực hoặc thích hợp hơn. Sự xuất hiện của phó từ chuyển chiết “倒” (ngược lại, lại thấy) ở đây giúp tăng cường ngữ khí phản nghịch so với suy nghĩ thông thường, làm nổi bật nét tương phản sắc nét và thái độ dứt khoát của người nói rằng: thay vì cứ cố chấp làm điều ở vế 1 thì đảo ngược góc nhìn, chọn cách ở vế 2 còn tốt hơn nhiều.",
    "formation": "(与其 +) Động từ 1 / Mệnh đề 1 ，倒不如 (+ Chủ ngữ) + Động từ 2 / Mệnh đề 2",
    "examples": []
  },
  "zh_以免_695": {
    "title": "以免 (Liên từ chỉ mục đích: Để tránh, nhằm tránh, kẻo)",
    "shortExplanation": "Liên từ chỉ mục đích mang sắc thái văn viết và trang trọng, đứng ở đầu phân câu sau nhằm ngăn ngừa một hậu quả tiêu cực hoặc tình huống không mong muốn có thể xảy ra; \"để tránh\", \"nhằm tránh\", \"kẻo\".",
    "longExplanation": "“以免” (yǐmiǎn) là liên từ mục đích tiêu cực (反面目的连词) vô cùng thông dụng trong tiếng Hán cả ở văn viết chính quy, khẩu ngữ chuẩn mực lẫn các thông báo chỉ dẫn công cộng. Cấu tạo gồm “以” (để, nhằm) và “免” (tránh, miễn). Từ này luôn đứng ở đầu phân câu sau, chỉ ra mục đích của hành động được đề cập ở phân câu trước là nhằm chủ động phòng ngừa, ngăn chặn một hậu quả xấu, tai nạn hoặc tổn thất không mong muốn phát sinh. Trong văn phong khẩu ngữ thân mật hàng ngày, nó tương đương với “免得” (miǎnde) hay “省得” (shěngde), còn “以免” mang tính trang nhã, quy phạm và chuẩn mực cao hơn. Rất thường gặp trong các lời khuyên y tế, quy tắc an toàn, điều lệnh và văn bản hành chính.",
    "formation": "Mệnh đề hành động 1 ，以免 + Mệnh đề hậu quả không mong muốn",
    "examples": [
      {
        "translation": "Khi bị cảm cúm nên cố gắng hạn chế đến những nơi công cộng, để tránh lây nhiễm cho người khác."
      }
    ]
  },
  "zh_嫌_696": {
    "title": "嫌 (Động từ tâm lý: Chê, ghét, không vừa ý, cảm thấy phiền vì...)",
    "shortExplanation": "Động từ tâm lý biểu thị thái độ chủ quan không hài lòng, chê bai hoặc cảm thấy một đối tượng hay sự việc nào đó có khuyết điểm, không đạt yêu cầu; \"chê\", \"không vừa lòng vì\".",
    "longExplanation": "“嫌” (xián) là một động từ biểu thị hoạt động tâm lý và đánh giá chủ quan trong tiếng Hán. Nó thường mang tân ngữ là một danh từ, cụm tính từ, cụm động từ hoặc một mệnh đề chủ - vị nhằm chỉ ra điểm mà người nói cảm thấy bất mãn, chê bai hoặc không hài lòng. Các cấu trúc thường gặp gồm: ① “嫌 + Tính từ / Cụm tính từ” (chê cái gì quá... ví dụ: “嫌贵” - chê đắt, “嫌麻烦” - chê phiền phức, “嫌远” - chê xa, “嫌吵” - chê ồn ào); ② “嫌 + Danh từ / Đại từ + Vị ngữ” (chê ai đó/cái gì làm sao, ví dụ: “嫌菜淡” - chê món ăn nhạt, “嫌他走得慢” - chê anh ta đi chậm); ③ “嫌 + Mệnh đề” (không vừa lòng vì... như trong câu ví dụ). Từ này luôn mang sắc thái tiêu cực hoặc phê phán từ góc nhìn chủ quan của chủ thể.",
    "formation": "Chủ ngữ + 嫌 (+ Đối tượng) + Tính từ / Mệnh đề khuyết điểm",
    "examples": [
      {
        "translation": "Mọi người đều chê kế hoạch du lịch này chưa đủ hợp lý."
      }
    ]
  },
  "zh_动不动就V_697": {
    "title": "动不动就 + Động từ (Cụm phó từ quán dụng: Hở một tí là, động một chút là, hơi tí là...)",
    "shortExplanation": "Cụm phó từ mang tính khẩu ngữ biểu thị một hành động hoặc trạng thái (thường mang tính tiêu cực) rất dễ dàng bộc phát, xảy ra với tần suất cao chỉ sau một kích thích nhỏ; \"hở một tí là\", \"động một chút là\".",
    "longExplanation": "“动不动就 + Động từ” (dòngbudòng jiù + Động từ) là một kết cấu quán dụng rất sống động trong khẩu ngữ tiếng Hán. Trong đó, “动不动” mang nghĩa đen là \"chưa kịp động đậy gì\", phái sinh thành nghĩa \"chỉ cần có một nguyên cớ nhỏ nhặt không đáng kể\"; kết hợp với phó từ “就” tạo thành trạng ngữ chỉ tần suất và tính dễ phát sinh của hành vi. Cấu trúc này dùng để diễn tả một phản ứng cảm xúc, thói quen hoặc sự việc (thường là phiền toái, tiêu cực như: nổi nóng, tức giận, khóc lóc, đổ bệnh, xin nghỉ việc) diễn ra quá thường xuyên, dễ dàng và bộc phát tùy tiện không theo quy luật kiểm soát. Thường mang sắc thái phàn nàn, phê bình hoặc ngao ngán của người nói. Tương đương với \"hở ra là...\", \"động một tí là...\", \"hơi tí là...\" trong tiếng Việt.",
    "formation": "Chủ ngữ + 动不动就 + Động từ (Cụm động từ tiêu cực)",
    "examples": [
      {
        "translation": "Dạo gần đây anh ấy công việc bận rộn, áp lực lớn, hở một tí là sốt ruột, nổi nóng phát cáu."
      }
    ]
  },
  "zh_甲乙丙丁_698": {
    "title": "甲乙丙丁 (Tổ hợp định danh tuần tự: Giáp, Ất, Bính, Đinh - A, B, C, D hoặc người qua đường vu vơ)",
    "shortExplanation": "Bốn Thiên can đầu tiên trong văn hóa truyền thống Trung Hoa, dùng làm ký hiệu thứ tự tuần tự trong văn bản, hợp đồng, bài thi (tương đương A, B, C, D); hoặc dùng trong khẩu ngữ để chỉ những đối tượng giả định, những người qua đường vu vơ không xác định; \"Giáp, Ất, Bính, Đinh\".",
    "longExplanation": "“甲、乙、丙、丁” (jiǎ, yǐ, bǐng, dīng) vốn là bốn can đầu tiên trong hệ thống Thập Thiên Can (十天干) của văn hóa Trung Hoa cổ đại. Trong tiếng Hán hiện đại, bốn từ này được sử dụng rộng rãi theo ba bình diện chính: ① Thứ tự tuần tự (序列): Dùng để đánh số các hạng mục, đề mục, phương án trắc nghiệm hoặc phân loại cấp độ (tương đương với các chữ cái A, B, C, D trong tiếng Anh hay loại 1, loại 2, loại 3, loại 4); ② Định danh các bên trong văn bản pháp lý: Dùng để xưng hô các bên tham gia giao kết hợp đồng hoặc vụ kiện tụng (Bên A - 甲方, Bên B - 乙方, Bên C - 丙方...); ③ Khẩu ngữ phiếm chỉ: Cụm từ cố định “甲乙丙丁” hoặc “张三李四” dùng để chỉ những người bất kỳ, người qua đường bình thường, những nhân vật thế thân không rõ tên tuổi trong một câu chuyện ví von.",
    "formation": "Danh từ (Hạng mục / Cấp độ / Đối tượng) ： 甲 / 乙 / 丙 / 丁",
    "examples": [
      {
        "translation": "Giáp, Ất, Bính, Đinh là một chuỗi thứ tự, tương đương với A, B, C, D trong tiếng Anh."
      }
    ]
  },
  "zh_加以V_699": {
    "title": "加以 + Động từ (Hình thức động từ văn viết: Tiến hành, áp dụng, thực hiện... đối với sự việc)",
    "shortExplanation": "Hình thức động từ mang phong cách văn viết trang trọng, đứng trước động từ hành động hai âm tiết để biểu thị việc áp dụng một hành động, biện pháp hoặc cách xử lý cụ thể lên đối tượng vừa được nhắc tới ở trước; \"tiến hành\", \"áp dụng\", \"thực hiện\".",
    "longExplanation": "“加以” (jiāyǐ) là một hình thức động từ (形式动词 / 虚化动词) đặc thù và chuẩn mực trong văn phong chính luận, học thuật, báo chí của tiếng Hán hiện đại. Bản thân từ này không chứa đựng nội dung hành động cụ thể mà đóng vai trò như một giá đỡ ngữ pháp đứng trước một động từ chính hai âm tiết có tính động tác hoặc xử lý (như: 研究 - nghiên cứu, 解决 - giải quyết, 分析 - phân tích, 限制 - hạn chế, 惩罚 - trừng phạt, 保护 - bảo vệ, 改造 - cải tạo). Về mặt cú pháp, đối tượng chịu tác động thường đã được đưa lên làm chủ ngữ hoặc được dẫn ra phía trước bằng các giới từ như “对” (đối với), “对于” (về phần), “关于”. Cấu trúc này làm cho câu văn trở nên trang trọng, cân đối, nhịp nhàng và có tính học thuật cao. Thường dịch là \"tiến hành (nghiên cứu)\", \"áp dụng (biện pháp)\", \"thực hiện (phân tích)\".",
    "formation": "(对 / 对于 + Đối tượng ，) Chủ ngữ + (认真 / 进一步 +) 加以 + Động từ hai âm tiết",
    "examples": [
      {
        "translation": "Đối với ý kiến và đề xuất của bạn, chúng tôi sẽ nghiêm túc tiến hành nghiên cứu."
      }
    ]
  },
  "zh_大大远远V_700": {
    "title": "大大 / 远远 + Động từ (Phó từ mức độ trùng điệp: Vượt xa, hơn hẳn, cải thiện rất nhiều)",
    "shortExplanation": "Các phó từ mức độ trùng điệp đứng trước động từ chỉ sự biến đổi, so sánh hoặc vượt trội (như 超出, 超过, 提高, 改变), biểu thị mức độ cực kỳ sâu sắc hoặc khoảng cách, chênh lệch vô cùng lớn; \"vượt xa\", \"hơn hẳn\", \"rất nhiều\".",
    "longExplanation": "“大大” (dàdà) và “远远” (yuǎnyuǎn) là hai phó từ chỉ mức độ được cấu tạo theo phương thức trùng điệp tính từ (形容词重叠副词化) trong tiếng Hán. Chúng thường làm trạng ngữ đứng trước các động từ biểu thị sự biến đổi quy mô, sự so sánh đối chiếu, hoặc sự vượt qua một tiêu chuẩn/ngưỡng nào đó (ví dụ: “超出” - vượt ra ngoài, “超过” - vượt quá, “提高” - nâng cao, “改善” - cải thiện, “落后” - tụt hậu). Về sắc thái: ① “大大” nhấn mạnh vào biên độ, quy mô hoặc mức độ to lớn của sự biến chuyển (tương đương với \"rất lớn\", \"vô cùng nhiều\"); ② “远远” lại thiên về nhấn mạnh vào khoảng cách, cự ly và sự chênh lệch cách biệt một trời một vực giữa hai đối tượng hoặc giữa thực tế với dự liệu (tương đương với \"vượt xa\", \"bỏ xa\"). Cả hai đều mang sức biểu cảm rất mạnh và chuẩn mực trong cả văn viết lẫn văn nói.",
    "formation": "Chủ ngữ + 大大 / 远远 + Động từ (超出 / 超过 / 提高 / 改善) (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Năng lực của bạn đã vượt xa / vượt rất nhiều so với tưởng tượng của chúng tôi."
      }
    ]
  },
  "zh_远远不没VA_701": {
    "title": "远远 + 不 / 没 + Động từ / Tính từ (Cấu trúc mức độ phủ định: Còn xa mới..., hoàn toàn chưa đủ để..., còn lâu mới...)",
    "shortExplanation": "Phó từ trùng điệp \"远远\" kết hợp với từ phủ định \"不\" hoặc \"没\", biểu thị thực tế khách quan còn cách tiêu chuẩn, yêu cầu hoặc mục tiêu dự kiến một khoảng cách rất lớn; \"còn xa mới đạt\", \"hoàn toàn không thể\".",
    "longExplanation": "Kết cấu “远远 + 不 / 没(有) + Động từ / Tính từ” là một khuôn mẫu phủ định mang tính nhấn mạnh mức độ chênh lệch rất sâu sắc trong tiếng Hán. Trong đó, “远远” đóng vai trò nhấn mạnh khoảng cách sai biệt cách biệt vời vợi, khi kết hợp với các từ phủ định “不” (không thể, không đủ) hoặc “没” (chưa hề, chưa đạt) nhằm khẳng định dứt khoát rằng: tình trạng thực tế hiện tại còn kém xa, tụt lại phía sau rất xa so với một tiêu chuẩn lý tưởng, một năng lực cần có hoặc một mục tiêu đã đề ra. Ví dụ: “远远不够” (còn lâu mới đủ, còn thiếu rất nhiều), “远远不能胜任” (còn xa mới đủ sức đảm đương), “远远没有达到” (còn cách xa chỉ tiêu). Thường dùng trong những lời đánh giá thẳng thắn, cảnh tỉnh, phê bình nghiêm khắc hoặc tự lượng sức mình.",
    "formation": "Chủ ngữ + 远远 + 不 / 没(有) + Động từ năng nguyện / Động từ / Tính từ",
    "examples": [
      {
        "translation": "Kiến thức và năng lực hiện tại của bạn còn xa mới có thể đảm đương được công việc lý tưởng trong mơ của bạn."
      }
    ]
  },
  "zh_紧缩句_702": {
    "title": "紧缩句 (Câu cô đọng: Lược bỏ liên từ điều kiện/giả thiết, kết hợp chặt chẽ bằng phó từ)",
    "shortExplanation": "Cấu trúc câu phức cô đọng trong tiếng Hán; lược bỏ các liên từ giả thiết (như 要是, 如果) và ngắt nghỉ giữa các phân câu, liên kết trực tiếp bằng phó từ (như 就) tạo nên tiết tấu dồn dập, ngữ khí quả quyết và khẩn trương; \"câu cô đọng\".",
    "longExplanation": "“紧缩句” (câu cô đọng / câu rút gọn) là một hiện tượng cú pháp đặc biệt trong tiếng Hán, nằm ở ranh giới giữa câu đơn và câu phức. Về bản chất, nó chứa đựng mối quan hệ logic của một câu phức (như điều kiện - kết quả, giả thiết - hệ quả, nhân quả), nhưng toàn bộ câu được nén chặt lại bằng cách: lược bỏ các liên từ giả thiết ở vế trước (như “要是”, “如果”, “假若”), lược bỏ các dấu ngắt nghỉ (dấu phẩy) giữa hai vế, và chỉ dùng các phó từ chỉ quan hệ như “就” (thì, liền), “也” (cũng), “不……不……” để gắn kết hai hành động lại thành một chuỗi liên tục. Cách diễn đạt này làm tăng tốc độ của câu nói, mang ngữ khí dứt khoát, đe dọa, mệnh lệnh khẩn cấp hoặc phản ánh chuỗi hành động phát sinh tức thì, không một khoảnh khắc chần chừ.",
    "formation": "(要是 / 如果 +) Vị ngữ 1 ，(Chủ ngữ 2 +) 就 + Vị ngữ 2",
    "examples": [
      {
        "translation": "Đứng lại! Không đứng lại là tao bắn đấy!"
      }
    ]
  },
  "zh_特意_703": {
    "title": "特意 (Phó từ chỉ mục đích: Đặc biệt, cất công, dành riêng, có ý định rõ ràng)",
    "shortExplanation": "Phó từ biểu thị hành động được thực hiện một cách có chủ đích chuyên biệt, cất công dành thời gian, công sức vì một mục đích hoặc đối tượng cụ thể; mang sắc thái tôn trọng, chân thành hoặc chu đáo; \"đặc biệt\", \"cất công\", \"chủ ý\".",
    "longExplanation": "“特意” (tèyì) là một phó từ chỉ mục đích và thái độ hành vi rất thông dụng trong tiếng Hán. Trong từ này, “特” nghĩa là đặc biệt, chuyên biệt; “意” nghĩa là tâm ý, ý định. Nó đứng trước động từ vị ngữ nhằm nhấn mạnh rằng hành động đó không phải là ngẫu nhiên, thuận tay hay làm qua quýt, mà là kết quả của việc chủ thể đã cất công dành thời gian, sắp xếp tâm sức riêng biệt vì một mục đích tốt đẹp, quan trọng hoặc vì người khác. Cần phân biệt rõ với “故意” (gùyì): “故意” mang nghĩa cố tình, cố ý làm một điều gì đó sai trái, xấu xa để trêu chọc hoặc gây hại (sắc thái tiêu cực); trong khi “特意” (hoặc “特地”) luôn mang sắc thái tích cực, lịch sự, thể hiện tấm lòng thành, sự ân cần chu đáo hoặc việc dành riêng sự chú ý cho một mục tiêu.",
    "formation": "Chủ ngữ + 特意 (+ Vì mục đích gì) + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Năm đó tôi đi công tác ở Thiên Tân, đã đặc biệt đi đường vòng qua Bắc Kinh để ghé thăm Di Hòa Viên Viên Minh Viên một chuyến."
      }
    ]
  },
  "zh_即将_704": {
    "title": "即将 (Phó từ thời gian văn viết: Sắp, sắp sửa, chuẩn bị bước vào)",
    "shortExplanation": "Phó từ chỉ thời gian mang phong cách văn viết trang trọng, đứng trước động từ biểu thị một hành động hoặc sự biến chuyển trọng đại sắp sửa diễn ra trong tương lai rất gần; \"sắp\", \"sắp sửa\", \"chuẩn bị\".",
    "longExplanation": "“即将” (jíjiāng) là một phó từ chỉ thời gian mang sắc thái trang nghiêm, chuẩn mực và tao nhã rất đặc trưng trong tiếng Hán. Trong từ này, “即” có nghĩa là lập tức, ngay tức khắc; “将” có nghĩa là sẽ, sắp sửa. Nó đứng trước động từ hoặc cụm vị ngữ để báo hiệu một sự kiện, hành động hoặc giai đoạn mới mang tính then chốt sắp sửa diễn ra trong một tương lai vô cùng cận kề. So với các từ biểu thị tương lai gần trong khẩu ngữ như “就要” hay “快要”, “即将” mang tính khách quan, trang trọng và mang đậm phong cách văn kiện, thời sự, diễn thuyết hoặc văn học nghệ thuật. Rất thường kết hợp với các động từ chỉ sự bắt đầu, xuất phát, kết thúc hoặc khai mạc (như: “即将到来” - sắp đến, “即将开幕” - sắp khai mạc, “即将毕业” - chuẩn bị tốt nghiệp).",
    "formation": "Chủ ngữ + 即将 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Chúng tôi đã hoàn thành việc học tập, sắp sửa bước vào cương vị công tác, bắt đầu một trang mới của cuộc đời."
      }
    ]
  },
  "zh_能V就V_705": {
    "title": "能 + Động từ + 就 + Động từ (Cấu trúc khẩu ngữ: Cố gắng làm nếu có thể, làm được chừng nào hay chừng ấy)",
    "shortExplanation": "Cấu trúc khẩu ngữ quán dụng biểu thị thái độ thực tế, tiết kiệm hoặc linh hoạt; hễ điều kiện khách quan cho phép làm được điều gì thì hãy cố gắng làm điều đó đến mức tối đa; \"nếu có thể... thì cứ...\", \"làm được thì cố mà làm\".",
    "longExplanation": "“能 + Động từ + 就 + Động từ” là một mẫu câu đối ứng cực kỳ linh hoạt và giàu tính thực tiễn trong khẩu ngữ đời sống hàng ngày của người Trung Quốc. Trong đó, động từ vị ngữ được lặp lại hai lần: lần thứ nhất sau trợ động từ “能” (có khả năng, có điều kiện), lần thứ hai sau phó từ kết nối “就” (thì, liền). Cấu trúc này hàm ý: miễn là có khả năng hoặc điều kiện cho phép thì người nói khuyên nhủ hoặc chủ trương hãy tận dụng tối đa để thực hiện hành động đó, tránh lãng phí, tránh phiền hà hoặc không nên thay đổi nếu chưa thực sự bức thiết. Ví dụ: “能省就省” (tiết kiệm được đồng nào hay đồng nấy), “能修就修” (sửa được thì cố mà sửa), “能帮就帮” (giúp được gì thì cố giúp), “能去就去” (đi được thì cố mà đi). Thể hiện lối tư duy ứng biến, chắt chiu và tận tâm trong văn hóa đời sống.",
    "formation": "Chủ ngữ + 能 + Động từ (+ Tân ngữ) + 就 + Động từ",
    "examples": [
      {
        "translation": "Chiếc điện thoại này dùng chưa được bao lâu, nếu sửa được thì cứ sửa, cố gắng đừng đổi cái mới."
      }
    ]
  },
  "zh_别说_706": {
    "title": "别说……，就是 / 连……也…… (Liên từ tăng tiến nhượng bộ: Đừng nói đến..., ngay cả / dẫu là... cũng...)",
    "shortExplanation": "Liên từ tăng tiến nhượng bộ dùng trong phân câu trước, gạt bỏ điều kiện cao hơn sang một bên để nhấn mạnh rằng ngay cả điều kiện thấp nhất hoặc cơ bản nhất cũng không đạt được hoặc phải hết sức chắt chiu; \"đừng nói đến... ngay cả... cũng...\".",
    "longExplanation": "“别说” (biéshuō) là một liên từ nhượng bộ tăng tiến (让步递进连词) rất sống động trong khẩu ngữ và văn tự sự tiếng Hán. Trong cấu trúc này: phân câu trước dùng “别说 + Sự vật A” (đừng nói đến A / chưa nói chi đến A) để tạm gác trường hợp rõ ràng, điển hình hoặc có tiêu chuẩn cao sang một bên; phân câu sau thường phối hợp với “就是” (dẫu là), “连” (ngay cả) đi kèm “也” (cũng) hoặc “都” (đều) để đưa ra sự vật B có cấp độ thấp hơn, nhỏ nhặt hơn nhằm làm nổi bật tính chất khắc nghiệt, cùng cực hoặc phi thường của hoàn cảnh. Đồng nghĩa với “甭说” (béngshuō) hay “不要说”. Nó tạo ra độ tương phản sâu sắc giữa cái xa xỉ với cái tối thiểu, nâng cao sức truyền cảm và tính thuyết phục của câu văn.",
    "formation": "别说 + Sự vật A (tiêu chuẩn cao / xa xỉ) + (了) ，就是 / 连 + Sự vật B (tiêu chuẩn thấp) + 也 / 都 + Vị ngữ",
    "examples": [
      {
        "translation": "Buổi tối đọc sách đừng nói đến nến, ngay cả dầu thắp đèn cũng phải chắt chiu tiết kiệm mà dùng."
      }
    ]
  },
  "zh_V1V1V2V2_707": {
    "title": "Động từ 1 Động từ 1 Động từ 2 Động từ 2 (Cấu trúc lặp động từ dạng AABB: Đùa nghịch, va chạm, diễn tả hành động lặp đi lặp lại hoặc diễn ra liên tục, sinh động)",
    "shortExplanation": "Hình thức lặp lại của hai động từ đơn âm tiết theo dạng AABB, dùng để miêu tả các hành động diễn ra liên tiếp, thường xuyên hoặc mang tính chất thoải mái, sinh động; \"đùa đùa nghịch nghịch\", \"va va chạm chạm\".",
    "longExplanation": "“Động từ 1 Động từ 1 Động từ 2 Động từ 2” là hình thức trùng điệp động từ theo kết cấu AABB rất đặc sắc trong khẩu ngữ tiếng Hán hiện đại. Hai động từ đơn âm tiết thường có mối liên hệ đẳng lập, bổ sung ý nghĩa cho nhau hoặc là thành phần của một từ ghép đẳng lập bị tách ra để lặp lại (ví dụ: 打闹 -> 打打闹闹; 磕碰 -> 磕磕碰碰; 吵闹 -> 吵吵闹闹; 摇晃 -> 摇摇晃晃; 蹦跳 -> 蹦蹦跳跳). Về mặt ngữ pháp, cấu trúc này có thể làm vị ngữ, chủ ngữ, trạng ngữ hoặc định ngữ trong câu. Về mặt ngữ nghĩa và biểu cảm, nó diễn tả hành động diễn ra liên tục, lặp đi lặp lại hoặc mang tính chất sinh hoạt thường nhật, tạo cảm giác hình ảnh sống động, vui vẻ, thoải mái hoặc xem nhẹ mức độ nghiêm trọng của sự việc (như va quệt nhỏ nhặt).",
    "formation": "Động từ 1 Động từ 1 Động từ 2 Động từ 2 (ví dụ: 打打闹闹, 磕磕碰碰, 吵吵闹闹)",
    "examples": [
      {
        "translation": "Trẻ con vốn thích đùa nghịch ồn ào, va quệt vấp váp là chuyện khó tránh, qua vài hôm là khỏi thôi, đừng lo lắng."
      }
    ]
  },
  "zh_左MN右MN_708": {
    "title": "左 + Số từ + Lượng từ + Danh từ + 右 + Số từ + Lượng từ + Danh từ (Cấu trúc đối xứng khẩu ngữ: Hết... này đến... khác / Liên tiếp dồn dập hết cái này sang cái khác)",
    "shortExplanation": "Cấu trúc bốn chữ đối xứng khẩu ngữ sử dụng \"左\" và \"右\" kết hợp với cụm số lượng từ (thường là số 1), biểu thị sự việc hoặc hành động diễn ra liên tiếp dồn dập, hết cái này đến cái khác không ngừng nghỉ; \"hết... này lại đến... khác\".",
    "longExplanation": "“左 + Số từ + Lượng từ + Danh từ + 右 + Số từ + Lượng từ + Danh từ” (thường gặp dưới dạng quán dụng: “左一个……右一个……”) là một kết cấu biểu cảm rất mạnh mẽ và hình ảnh trong khẩu ngữ tiếng Hán. Trong đó, “左” (trái) và “右” (phải) không hề chỉ phương hướng thực tế trong không gian mà mang hàm nghĩa ẩn dụ về sự xuất hiện từ mọi phía, dồn dập, bủa vây và nối tiếp nhau liên miên. Số từ đi kèm gần như tuyệt đối là “一”. Cấu trúc này thường kết hợp với trợ từ “地” làm trạng ngữ để tu sức cho động từ chính (ví dụ: “左一个电话右一个电话地催” - hết cuộc điện thoại này đến cuộc điện thoại khác giục giã; “左一声谢谢右一声对不起” - hết câu cảm ơn lại đến câu xin lỗi). Nó thường truyền tải sự quá mức, dồn dập của hành động, đôi khi hàm chứa sự sốt ruột, bất đắc dĩ hoặc bất ngờ của người nói.",
    "formation": "(Chủ ngữ +) 左 + (Số từ +) Lượng từ + Danh từ + 右 + (Số từ +) Lượng từ + Danh từ (+ 地 + Động từ)",
    "examples": [
      {
        "translation": "Mẹ hết gọi cuộc điện thoại này đến cuộc điện thoại khác giục anh ấy về nhà."
      }
    ]
  },
  "zh_莫非难道不成_709": {
    "title": "莫非 / 难道 …… 不成 (Khung ngữ khí phản vấn / suy đoán nghi vấn: Chẳng lẽ... hay sao / Lẽ nào... thật ư?)",
    "shortExplanation": "Khung ngữ khí kết hợp giữa phó từ phản vấn/suy đoán \"莫非\" hoặc \"难道\" ở đầu vế và trợ từ ngữ khí cuối câu \"不成\", dùng để diễn đạt sự nghi hoặc mãnh liệt, phỏng đoán với tâm lý không dám tin hoặc phản vấn đanh thép; \"chẳng lẽ... hay sao?\".",
    "longExplanation": "“莫非……不成” và “难道……不成” là những cấu trúc khung ngữ khí phản vấn - suy đoán đặc trưng trong tiếng Hán. Trong đó, “莫非” (mòfēi - chẳng lẽ, không lẽ) thiên về sự phỏng đoán dè dặt trước một tình huống bất ngờ, không mong muốn; còn “难道” (nándào - lẽ nào, há lẽ) mang ngữ khí phản vấn chất vấn mạnh mẽ. Thành phần “不成” (bùchéng) là một trợ từ ngữ khí đóng vai trò then chốt chốt lại ở cuối câu, có chức năng củng cố và đẩy ngữ khí nghi vấn hoặc bất bình lên mức cao nhất, hàm ý sự việc nếu thực sự xảy ra như vậy thì là điều phi lý, khó chấp nhận. Cấu trúc thường xuất hiện khi người nói bàng hoàng nhận ra một sự thật ngoài ý muốn hoặc khi chất vấn gay gắt người đối diện.",
    "formation": "莫非 / 难道 + Phân câu / Vị ngữ + 不成 ？",
    "examples": [
      {
        "translation": "Anh ấy giật mình kinh hãi, đầu óc trống rỗng — chẳng lẽ lại bị lừa rồi hay sao?"
      }
    ]
  },
  "zh_一个N_710": {
    "title": "一个 + Danh từ (Cấu trúc trạng ngữ phương thức chỉ động tác đột ngột: Làm một cú / Bỗng... một cái - chỉ động tác cơ thể nhanh, dứt khoát hoặc bất ngờ)",
    "shortExplanation": "Cấu trúc trạng ngữ hoặc bổ ngữ chỉ phương thức động tác, trong đó \"一个\" kết hợp với danh từ chỉ động thái thân thể (như 跟头, 激灵, 转身, 踉跄), miêu tả hành động diễn ra cực kỳ mau lẹ, đột ngột hoặc trọn vẹn trong tích tắc; \"làm một cú...\", \"bỗng... một cái\".",
    "longExplanation": "Trong ngữ pháp tiếng Hán, kết cấu “一个 + Danh từ” (với các danh từ đặc biệt chỉ cử chỉ, tư thế hoặc phản xạ cơ thể như: 跟头 [nhào lộn], 激灵 [rùng mình], 转身 [quay người], 踉跄 / 趔趄 [lảo đảo]) đóng vai trò như một trạng ngữ miêu tả hoặc tân ngữ đồng nguyên chỉ trạng thái động tác. Nó không đơn thuần chỉ số lượng một lần, mà nhấn mạnh tính chất trọn vẹn, dứt khoát, đột ngột và nhanh như chớp của hành vi. Thường đứng trước động từ hành động hoặc bổ ngữ kết quả (ví dụ: “一个跟头栽了下来” - cắm đầu ngã nhào một cú; “一个激灵醒了过来” - bỗng rùng mình một cái tỉnh giấc; “一个转身溜了” - thoăn thoắt xoay người chuồn mất). Giúp câu văn giàu tính hành động và tạo ấn tượng thị giác rất mạnh.",
    "formation": "Chủ ngữ + 一个 + Danh từ (chỉ động thái cơ thể: 跟头, 激灵, 转身, 踉跄) + Động từ (+ Bổ ngữ)",
    "examples": [
      {
        "translation": "Tay anh ấy không nắm được vào lan can, ngã lộn nhào một cú cắm đầu xuống đất."
      }
    ]
  },
  "zh_了个A_711": {
    "title": "(了) 个 + Tính từ (Cấu trúc bổ ngữ mức độ/kết quả khẩu ngữ: Đến mức... / Ra nông nỗi... / Trở nên... - chỉ kết quả triệt để, cực độ)",
    "shortExplanation": "Cấu trúc bổ ngữ khẩu ngữ đặc sắc, chèn trợ từ \"(了)个\" vào giữa động từ và tính từ (hoặc thành ngữ 4 chữ), nhấn mạnh kết quả hoặc mức độ của động tác đạt đến một trạng thái vô cùng triệt để, trọn vẹn hoặc trầm trọng; \"đến mức...\", \"thành ra...\".",
    "longExplanation": "Trong ngữ pháp khẩu ngữ tiếng Hán, kết cấu “Động từ + (了) 个 + Tính từ / Cụm từ miêu tả” là một phương thức biểu đạt bổ ngữ kết quả và bổ ngữ mức độ giàu tính cường điệu và cảm xúc. Trong đó, “了” biểu thị động tác đã hoàn tất, còn “个” đóng vai trò trợ từ kết cấu biểu cảm đặc biệt (đọc nhẹ, không mang ý nghĩa lượng từ số đếm) nhằm dẫn ra tính từ miêu tả hậu quả trạng thái sau cùng. Tính từ hoặc cụm bốn chữ đi sau thường là các từ miêu tả trạng thái triệt để, tột cùng hoặc gây ấn tượng mạnh, ví dụ: “摔了个粉碎” (đập tan tành thành từng mảnh), “输了个精光” (thua sạch sành sanh không còn manh giáp), “闹了个大红脸” (ngượng chín cả mặt), “喝了个酩酊大醉” (uống say túy lúy bí tỉ), “弄了个一清二楚” (làm cho rõ mười mươi). Mang tính chất miêu tả sinh động và cường điệu hóa kết quả của hành động.",
    "formation": "Động từ + (了) 个 + Tính từ / Cụm tính từ (như: 粉碎, 精光, 清楚, 焦头烂额)",
    "examples": [
      {
        "translation": "Anh ấy đã đập cây đàn yêu quý của mình tan tành thành từng mảnh vụn."
      }
    ]
  },
  "zh_向来VA_712": {
    "title": "向来 + Động từ / Tính từ (Phó từ thời gian: Từ trước đến nay luôn / Xưa nay vốn dĩ / Luôn luôn)",
    "shortExplanation": "Phó từ thời gian biểu thị một đặc điểm, thói quen, tính cách hoặc nguyên tắc ứng xử vốn đã tồn tại và duy trì nhất quán từ quá khứ kéo dài liên tục cho tới hiện tại; \"từ trước đến nay\", \"xưa nay vốn\".",
    "longExplanation": "“向来” (xiànglái) là một phó từ chỉ thời gian rất thông dụng trong cả khẩu ngữ lẫn văn viết chuẩn mực của tiếng Hán, kết hợp giữa “向” (hướng về, từ trước) và “来” (lại, tới nay). Về mặt ngữ pháp, nó đứng trước động từ, cụm động từ hoặc tính từ làm trạng ngữ thời gian. “向来” nhấn mạnh tính liên tục, bất biến và nhất quán tuyệt đối của một phẩm chất, thái độ, tập quán hoặc quy luật từ xưa đến nay mà không hề có sự thay đổi. Các kết hợp kinh điển gồm: “向来如此” (xưa nay đều như vậy), “向来忠厚” (xưa nay vốn thật thà lương thiện), “向来不赞成” (từ trước đến nay chưa bao giờ tán thành). So với “从来”, “向来” thường mang phong thái đĩnh đạc, ổn định và trung tính hơn; so với “一向”, “向来” có xu hướng chỉ khoảng thời gian dài hơn và tính chất căn bản hơn.",
    "formation": "Chủ ngữ + 向来 + Động từ / Tính từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Họ xưa nay vốn đôn hậu, thật thà, cư xử thành tâm thật ý."
      }
    ]
  },
  "zh_预先_713": {
    "title": "预先 (Phó từ thời gian: Trước / Sớm / Làm trước / Dự liệu trước)",
    "shortExplanation": "Phó từ thời gian chỉ hành động chuẩn bị, sắp xếp, thông báo hoặc suy nghĩ dự tính được tiến hành trước khi sự việc diễn ra; \"trước\", \"sớm\", \"làm trước\".",
    "longExplanation": "“预先” (yùxiān) là một phó từ chỉ thời gian rất chuẩn mực trong tiếng Hán, được ghép bởi “预” (dự - dự trù, trước) và “先” (tiên - trước tiên). Từ này thường đứng trước động từ vị ngữ hoặc cụm động từ để làm trạng ngữ thời gian, biểu thị rằng hành động, quyết định, biện pháp chuẩn bị hoặc suy đoán được thực hiện đi trước một bước so với thời điểm sự kiện chính phát sinh. Thường dùng trong các kết hợp: “预先通知” (thông báo trước), “预先准备” (chuẩn bị trước), “预先安排” (thu xếp trước), “预先想到” (nghĩ tới từ trước). Khi dùng ở thể phủ định như “预先没有想到 / 预先都未曾料到”, nó làm nổi bật tính bất ngờ, kinh ngạc của sự việc ngoài dự liệu.",
    "formation": "(Chủ ngữ +) 预先 (+ Phó từ phủ định) + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Mọi người từ trước đều không ngờ rằng triển lãm hội họa lần này lại được đón nhận nồng nhiệt đến thế."
      }
    ]
  },
  "zh_CLAUSE1也好CLAUSE2也罢_714": {
    "title": "Mệnh đề 1 也好 Mệnh đề 2 也罢 (Liên từ nhượng bộ song song: Dù là... hay là... / Cho dù là... đi chăng nữa thì...)",
    "shortExplanation": "Cấu trúc liên kết nhượng bộ song song, liệt kê hai hoặc nhiều tình huống, điều kiện khác nhau (hoặc đối lập) để nhấn mạnh rằng dù trong bất kỳ trường hợp nào thì kết quả hay nhận định ở phân câu sau vẫn giữ nguyên; \"dù là... hay là...\".",
    "longExplanation": "“Mệnh đề 1 也好 Mệnh đề 2 也罢” (cũng có thể dùng biến thể đối xứng “……也好……也好” hoặc “……也罢……也罢”) là một kết cấu liên từ nhượng bộ song song rất phổ biến và linh hoạt trong tiếng Hán. Trong cấu trúc này, “也好” và “也罢” đứng ở cuối mỗi phân câu hoặc danh ngữ được liệt kê ra nhằm đặt chúng vào vị thế giả định song song. Người nói đưa ra các khả năng lựa chọn khác nhau (hoặc các trạng thái đối lập) không phải để chọn một bỏ một, mà nhằm chứng minh rằng bất luận là rơi vào trường hợp thứ nhất hay trường hợp thứ hai thì kết luận, yêu cầu hoặc quy luật tất yếu được nêu ở mệnh đề chính phía sau đều hoàn toàn đúng đắn và không hề bị lay chuyển.",
    "formation": "Mệnh đề 1 也好 ， Mệnh đề 2 也罢 ，+ Mệnh đề chính (Kết luận tất yếu)",
    "examples": [
      {
        "translation": "Dù là lái xe ô tô hay đi xe đạp, việc vừa đi vừa nghe điện thoại đều sẽ làm phân tán sự chú ý và khả năng phản xạ."
      }
    ]
  },
  "zh_不时_715": {
    "title": "不时 (Phó từ tần suất / thời gian: Thỉnh thoảng / Chốc chốc / Lâu lâu lại / Đôi khi)",
    "shortExplanation": "Phó từ thời gian và tần suất, biểu thị một hành động, âm thanh hoặc hiện tượng diễn ra lặp lại nhiều lần theo từng khoảng thời gian ngắt quãng ngắn; \"chốc chốc\", \"thỉnh thoảng\", \"lâu lâu lại\".",
    "longExplanation": "“不时” (bùshí) là một phó từ chỉ tần suất và thời gian rất giàu tính biểu cảm và miêu tả trong tiếng Hán. Trong đó, “不” (không) và “时” (thời gian cố định) kết hợp mang hàm ý là không theo một giờ giấc cố định nào mà chốc chốc, thỉnh thoảng lại xuất hiện. Nó đứng trước động từ hoặc cụm động từ để làm trạng ngữ. “不时” thường dùng để miêu tả những sự việc, âm thanh, cử chỉ thoáng qua nhưng lặp đi lặp lại nhiều lần tạo nên cảm giác ngắt quãng liên tục, ví dụ: “不时传来阵阵掌声” (chốc chốc lại vọng lại từng tràng pháo tay), “不时回头张望” (thỉnh thoảng lại quay đầu nhìn ngó), “不时点头” (thỉnh thoảng lại gật gù). So với “偶尔” (thỉnh thoảng, mang tần suất thưa thớt), “不时” mang tần suất mau hơn, tạo cảm giác sự việc liên tục đan xen vào tiến trình hiện tại.",
    "formation": "Chủ ngữ + 不时 (+ 地) + Động từ (+ Tân ngữ) / 不时 + Cụm động từ",
    "examples": [
      {
        "translation": "Vài tiếng chim hót chốc chốc vọng lại nhắc nhở chúng tôi rằng, một ngày mới lại bắt đầu rồi."
      }
    ]
  },
  "zh_多多少少_716": {
    "title": "多多少少 (Phó từ mức độ láy: Ít nhiều / Ít hay nhiều / Phần nào)",
    "shortExplanation": "Hình thức trùng điệp của tính từ \"多少\", dùng làm trạng ngữ chỉ mức độ để biểu thị sự tồn tại ít nhiều hoặc ở một chừng mực nhất định; làm dịu giọng điệu nhận định; \"ít nhiều\", \"phần nào\".",
    "longExplanation": "“多多少少” (duōduōshǎoshǎo) là dạng thức trùng điệp AABB của tính từ/phó từ “多少” (ít nhiều). Khi làm trạng ngữ đứng trước vị ngữ động từ hoặc tính từ, nó biểu thị rằng về mặt số lượng, mức độ hay phạm vi, đối tượng được đề cập có tồn tại ở một chừng mực nhất định, không đến mức hoàn toàn không có. Việc sử dụng hình thức lặp từ này giúp lời nói trở nên uyển chuyển, khách quan, mang tính chừng mực và làm dịu đi sắc thái phán đoán tuyệt đối của câu văn. Thường kết hợp với các từ ngữ biểu thị mức độ nhẹ hoặc tồn tại như: “多多少少有一点 / 有些……” (ít nhiều cũng có chút...), “多多少少受了影响” (ít nhiều cũng chịu ảnh hưởng).",
    "formation": "Chủ ngữ + 多多少少 + Động từ / Tính từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Lời anh ấy nói ít nhiều cũng có phần chân thực."
      }
    ]
  },
  "zh_逐M_717": {
    "title": "逐 + Lượng từ (Cấu trúc trạng ngữ văn viết: Từng... một / Lần lượt theo từng... - chỉ hành động diễn ra tuần tự từng đơn vị một)",
    "shortExplanation": "Cấu trúc trạng ngữ trang trọng mang phong cách văn viết, kết hợp từ \"逐\" (từng, lần lượt theo) với lượng từ chỉ đơn vị (như 个, 条, 项, 年, 日), biểu thị hành động được tiến hành tuần tự, tỉ mỉ theo từng đơn vị một mà không bỏ sót; \"từng... một\".",
    "longExplanation": "“逐 + Lượng từ” (zhú + Lượng từ) là một kết cấu trạng ngữ đặc trưng của phong cách văn chính luận, công văn hành chính, báo chí và văn viết chuẩn mực trong tiếng Hán. Trong đó, “逐” có nguồn gốc từ Hán cổ mang ý nghĩa là “lần lượt theo, từng cái một theo thứ tự”. Cấu trúc này đứng trước động từ để biểu thị hành động được thực thi một cách tuần tự, nghiêm ngặt, rà soát từng đối tượng đơn lẻ theo đơn vị lượng từ mà không bỏ qua bất kỳ mắt xích nào. Các dạng kết hợp điển hình: “逐个 / 逐一” (từng cái một, từng người một), “逐条” (từng điều khoản một), “逐项” (từng hạng mục một), “逐年” (từng năm một, qua từng năm), “逐日” (từng ngày một), “逐句” (từng câu một). Giúp văn phong cô đọng, khúc chiết và chuẩn xác.",
    "formation": "Chủ ngữ + 逐 + Lượng từ + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Mùa mưa sắp đến rồi, các hồ chứa nước cần phải được kiểm tra từng cái một để loại trừ các mối nguy hiểm tiềm ẩn về an toàn."
      }
    ]
  },
  "zh_归根到底_718": {
    "title": "归根到底 (Thành ngữ / Ngữ chêm xen: Suy cho cùng / Rốt cuộc / Nói cho cùng - chỉ bản chất căn bản cốt lõi)",
    "shortExplanation": "Thành ngữ làm trạng ngữ bình luận hoặc liên kết phân câu, dùng để đúc kết, quy nạp vấn đề về cội nguồn, bản chất sâu xa hoặc nguyên nhân căn bản nhất; \"suy cho cùng\", \"rốt cuộc\", \"nói cho cùng\".",
    "longExplanation": "“归根到底” (guīgēndàodǐ - cũng có thể dùng biến thể “归根结底”) là một thành ngữ bốn chữ có chức năng ngữ pháp như một trạng ngữ bình luận (ngữ chêm xen) vô cùng quan trọng trong tiếng Hán. Nghĩa đen của nó là “quay về tận gốc rễ và chạm tới đáy cùng”. Khi sử dụng trong diễn ngôn, nó giúp người nói gạt bỏ các hiện tượng bề ngoài, các chi tiết phụ thuộc hoặc những yếu tố ngẫu nhiên để chỉ thẳng ra chân lý bản chất, nguyên nhân cốt lõi hoặc trách nhiệm sau cùng của vấn đề. Cấu trúc này có thể đứng độc lập ở đầu phân câu (kèm dấu phẩy) hoặc chen vào giữa chủ ngữ và vị ngữ. Rất thường gặp trong các lập luận triết học, chính luận hoặc các lời đúc kết sâu sắc trong cuộc sống.",
    "formation": "(Phân câu 1 ，) Chủ ngữ + 归根到底 + Vị ngữ / 归根到底 ， Mệnh đề (Kết luận cốt lõi)",
    "examples": [
      {
        "translation": "Tập luyện thể dục thể thao suy cho cùng là việc của chính mình, tập đối phó qua loa thì thực chất là đang tự lừa dối bản thân."
      }
    ]
  },
  "zh_哪怕_719": {
    "title": "哪怕 (Liên từ nhượng bộ giả thiết: Cho dù / Dù là / Kể cả khi / Ngay cả khi - đưa ra giả định ở mức cực hạn)",
    "shortExplanation": "Liên từ nhượng bộ giả thiết, dẫn ra một điều kiện cực đoan, tối thiểu hoặc khó khăn nhất để nhấn mạnh rằng trong bất kỳ hoàn cảnh khắc nghiệt nào thì quyết tâm, kết quả hay hành động ở mệnh đề chính vẫn không hề thay đổi; \"cho dù\", \"kể cả khi\".",
    "longExplanation": "“哪怕” (nǎpà) là một liên từ nhượng bộ mang tính giả thiết cực kỳ tiêu biểu trong tiếng Hán, kết hợp giữa đại từ nghi vấn “哪” (nào) và động từ “怕” (sợ, e ngại). Về mặt logic cú pháp, “哪怕” dẫn ra một tiền đề mang tính giả định ở mức độ cực hạn, tối thiểu (ví dụ: chỉ còn một tia hy vọng, chỉ có một người, phải chịu đựng gian khổ tột cùng). Sau đó, ở mệnh đề chính thường hô ứng bằng các phó từ như “也” (cũng), “都” (đều), “还” (vẫn), “绝不” (tuyệt đối không) để khẳng định một ý chí kiên định, một quy luật tất yếu không thể bị suy chuyển bởi bất kỳ nghịch cảnh nào. “哪怕” cũng có thể đặt ở phân câu sau như một thành phần bổ sung điều kiện nhượng bộ (như ví dụ mẫu: “...哪怕只有一线希望”).",
    "formation": "哪怕 + Điều kiện giả thiết cực đoan ，(Chủ ngữ +) 也 / 还 + Kết luận / Mệnh đề chính ， 哪怕 + Điều kiện",
    "examples": [
      {
        "translation": "Bác cứ yên tâm, chúng tôi nhất định sẽ dốc hết sức mình cứu chữa cho bệnh nhân, cho dù chỉ còn một tia hy vọng mong manh."
      }
    ]
  },
  "zh_反之_720": {
    "title": "反之 (Liên từ chuyển tiếp đối lập: Ngược lại / Trái lại / Nếu tình hình ngược lại thì)",
    "shortExplanation": "Liên từ chuyển tiếp đối lập mang phong cách văn viết trang trọng, dùng để dẫn ra giả định hoặc kết quả đối lập hoàn toàn với nội dung vừa đề cập ở phân câu trước; \"ngược lại\", \"trái lại\".",
    "longExplanation": "“反之” (fǎnzhī) là một liên từ liên kết vế câu mang phong cách văn viết cổ kính, ngắn gọn và chuẩn xác trong tiếng Hán. Trong đó, “反” có nghĩa là ngược lại, phản diện; “之” là đại từ chỉ thị trong văn ngôn, thay thế cho toàn bộ sự việc, điều kiện hay giả thuyết vừa được trình bày ở phân câu đứng trước (“反之” = “反过来讲 / 如果情况与此相反”). Về mặt cấu trúc, “反之” thường đứng ở đầu phân câu sau (sau dấu phẩy hoặc dấu chấm phẩy) để dẫn ra một mối quan hệ đối xứng tương phản logic: nếu tiền đề thứ nhất dẫn đến kết quả thuận, thì trong tình huống ngược lại (phủ định của tiền đề), sẽ phát sinh kết quả trái ngược hoàn toàn. Thường dùng trong các văn bản lý luận, báo chí, kinh tế và khoa học để lập luận chặt chẽ hai chiều.",
    "formation": "Phân câu 1 。/ ， 反之 ，+ Phân câu 2 (Kết quả đối lập hoàn toàn)",
    "examples": [
      {
        "translation": "Kinh tế phát triển, thu nhập của người dân tăng lên thì sức mua tiêu dùng sẽ mạnh; ngược lại, sức mua tiêu dùng của người dân sẽ kém."
      }
    ]
  },
  "zh_VA1的VA1VA2的VA2_721": {
    "title": "Động từ / Tính từ 1 的 Động từ / Tính từ 1 ， Động từ / Tính từ 2 的 Động từ / Tính từ 2 (Cấu trúc đối xứng miêu tả cảnh tượng đa dạng: Cái thì... cái thì... / Người thì... người thì... / Kẻ... người...)",
    "shortExplanation": "Cấu trúc bốn nhịp đối xứng sử dụng trợ từ \"的\" để danh hóa động từ hoặc tính từ rồi lặp lại làm vị ngữ, miêu tả một cảnh tượng phong phú, náo nhiệt hoặc đa dạng khi các cá thể khác nhau mang những trạng thái hoặc thực hiện những hành vi khác nhau; \"cái thì... cái thì...\", \"kẻ... người...\".",
    "longExplanation": "“Động từ / Tính từ 1 的 Động từ / Tính từ 1 ， Động từ / Tính từ 2 的 Động từ / Tính từ 2” là một cấu trúc cú pháp mang tính đối ngẫu và tạo hình tuyệt đẹp trong tiếng Hán. Trong cấu trúc này, “Động từ / Tính từ + 的” ở nhịp thứ nhất biến động tác/tính chất thành một cụm danh từ hóa chỉ nhóm đối tượng mang đặc điểm đó (tương đương \"những thứ/người mà...\"), còn chữ thứ hai lặp lại chính động từ/tính từ đó làm vị ngữ khẳng định trạng thái. Hai vế tương phản hoặc bổ sung cho nhau được đặt song hành (ví dụ: “红的红，绿的绿” - quả thì đỏ quả thì xanh; “走的走，留的留” - người thì đi người thì ở lại; “哭的哭，笑的笑” - kẻ thì khóc người thì cười; “买的买，卖的卖” - kẻ mua người bán). Cấu trúc giúp câu văn nhịp nhàng, sinh động, vẽ nên một bức tranh toàn cảnh nhiều màu sắc, đa dạng chủng loại hoặc cảnh tượng phân hóa mỗi người một ngả.",
    "formation": "Chủ ngữ (Tổng thể) + ， Động từ / Tính từ 1 的 Động từ / Tính từ 1 ， Động từ / Tính từ 2 的 Động từ / Tính từ 2",
    "examples": [
      {
        "translation": "Bước vào vườn cây ăn quả, mọi người nhìn thấy cả cây đào quả sai trĩu cành, quả thì đỏ quả thì xanh, đẹp vô cùng."
      }
    ]
  },
  "zh_一时_722": {
    "title": "一时 (Phó từ / Danh từ thời gian: Nhất thời / Trong phút chốc / Vì một lúc... mà... / Tạm thời)",
    "shortExplanation": "Biểu thị một khoảng thời gian rất ngắn hoặc một thời điểm nhất thời; thường dùng để chỉ hành động, cảm xúc bộc phát trong phút chốc hoặc tình trạng tạm thời chưa thể giải quyết ngay; \"nhất thời\", \"trong phút chốc\".",
    "longExplanation": "“一时” (yīshí) là một từ chỉ thời gian rất linh hoạt trong tiếng Hán, vừa có thể làm danh từ chỉ thời gian vừa làm phó từ. Về mặt ngữ nghĩa, “一时” có hai nét nghĩa tiêu biểu: Thứ nhất, biểu thị một khoảng thời gian rất ngắn, thường kết hợp với trạng thái tâm lý hoặc cảm xúc bất ngờ, bộc phát tại một thời điểm nhất định (như “一时冲动” - nhất thời bồng bột, “一时糊涂” - nhất thời hồ đồ, “一时心急” - nhất thời nóng vội). Thứ hai, biểu thị tình trạng hiện tại mang tính tạm thời, trước mắt chưa thể thay đổi hay giải quyết ngay (như “一时想不起来” - tạm thời chưa nhớ ra, “一时无法解决” - tạm thời chưa thể giải quyết). Về mặt cú pháp, “一时” thường đứng trước vị ngữ động từ hoặc tính từ để làm trạng ngữ.",
    "formation": "(Chủ ngữ +) 一时 + Động từ / Tính từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Cô ấy trong lúc nhất thời sốt ruột, ngay cả cửa cũng chưa khóa đã lao vội ra khỏi nhà."
      }
    ]
  },
  "zh_CLAUSES尚且V_723": {
    "title": "(Mệnh đề +) Chủ ngữ + 尚且 + Động từ (Phó từ / Liên từ tăng tiến nhượng bộ: Đến như... mà còn... / ...còn... huống chi...)",
    "shortExplanation": "Cấu trúc tăng tiến nhượng bộ dùng phó từ \"尚且\", đưa ra một sự thật hoặc tình huống ở mức độ cao/dễ hơn nhằm chứng minh rằng đối với tình huống ở mức độ thấp/khó khăn hơn thì kết quả lại càng tất yếu; \"ngay cả... mà còn...\".",
    "longExplanation": "“尚且” (shàngqiě) là một phó từ kiêm liên từ mang đậm màu sắc văn thư, nghị luận trong tiếng Hán. Trong cấu trúc “(Mệnh đề +) Chủ ngữ + 尚且 + Động từ”, “尚且” được dùng để lùi một bước, thừa nhận hoặc đưa ra một trường hợp điển hình có điều kiện ưu việt hơn hoặc tình huống hiển nhiên hơn để làm bàn đạp. Qua đó, người nói ngụ ý hoặc mở ra vế sau (thường đi kèm “何况”, “更不用说”, “况且” hoặc đối lập thời thế) để khẳng định rằng tình huống khó khăn hơn, kém hơn chắc chắn sẽ diễn ra theo hướng cực đoan hơn. Cấu trúc mang sức thuyết phục logic vô cùng mạnh mẽ trong văn phong lập luận, biện giải.",
    "formation": "(Mệnh đề +) Chủ ngữ + 尚且 + Động từ / Vị ngữ ，(Mệnh đề đối lập / 何况 + Chủ ngữ + Vị ngữ)",
    "examples": [
      {
        "translation": "Khi kinh tế tăng trưởng mà doanh nghiệp này còn như vậy, thì lúc kinh tế suy thoái, doanh nghiệp chắc chắn sẽ nảy sinh vấn đề sống còn."
      }
    ]
  },
  "zh_当年当时当代_724": {
    "title": "当年、当时、当代 (Phân biệt danh từ thời gian: Năm ấy/thời đó - Lúc đó/hồi đó - Thời đại ngày nay/đương đại)",
    "shortExplanation": "Nhóm danh từ thời gian có yếu tố \"当\" (đương): \"当年\" chỉ năm xưa, thời quá khứ hoàng kim hoặc đã qua; \"当时\" chỉ thời điểm cụ thể khi sự việc xảy ra; \"当代\" chỉ thời đại hiện nay, thời đương đại.",
    "longExplanation": "Bộ ba từ chỉ thời gian “当年”, “当时” và “当代” đều chứa hình vị “当” nhưng mang phạm vi và thời điểm tham chiếu hoàn toàn khác biệt:\n1. “当年” (dāngnián): Nhấn mạnh về một khoảng thời gian dài trong quá khứ đã lùi xa, thường gợi nhắc đến năm xưa, thời kỳ tuổi trẻ, thời kỳ hưng thịnh hoặc một giai đoạn lịch sử đã qua (ví dụ: “想当年” - nhớ lại năm xưa; “他已不是当年的他了” - anh ấy không còn là anh ấy của năm xưa nữa). Lưu ý: nếu đọc dāngnián thì chỉ năm đó/năm xưa; nếu đọc dàngnián thì chỉ ngay trong chính năm ấy.\n2. “当时” (dāngshí): Chỉ thời điểm, lúc xảy ra sự việc cụ thể được đề cập trong câu chuyện (ví dụ: “当时的情况很复杂” - tình hình lúc đó rất phức tạp; “当时我不在场” - lúc ấy tôi không có mặt).\n3. “当代” (dāngdài): Thuộc về thời đại hiện nay, kỷ nguyên đang sống, dùng trong văn hóa, lịch sử, xã hội học (ví dụ: “当代文学” - văn học đương đại, “当代青年” - thanh niên thời nay).",
    "formation": "当年 / 当时 / 当代 (+ 的) + Danh từ ; (Chủ ngữ +) 当时 / 当年 + Vị ngữ",
    "examples": [
      {
        "translation": "Anh ấy đã không còn là con người của năm xưa nữa rồi."
      }
    ]
  },
  "zh_终究_725": {
    "title": "终究 (Phó từ: Rốt cuộc / Suy cho cùng / Dù sao đi nữa thì / Cuối cùng vẫn là)",
    "shortExplanation": "Phó từ biểu thị sự quy kết về bản chất hoặc kết quả tất yếu sau khi đã trải qua nhiều biến đổi, quanh co hoặc tranh luận; \"rốt cuộc\", \"suy cho cùng\", \"dù sao thì\".",
    "longExplanation": "“终究” (zhōngjiū) là một phó từ chỉ ngữ khí khẳng định bản chất hoặc kết cục tất yếu trong tiếng Hán, được ghép từ “终” (cuối cùng) và “究” (xét đến cùng). Trong câu, “终究” thường đứng trước vị ngữ (động từ, tính từ hoặc câu phán đoán “是”) để làm trạng ngữ. Nó nhấn mạnh rằng dù tình hình có phát triển, thay đổi hay che đậy như thế nào chăng nữa, thì bản chất căn bản hoặc kết cục khách quan cuối cùng vẫn không thể nào thay đổi được. Đồng nghĩa với “毕竟”, “归根结底”, “终归”, nhưng “终究” mang đậm tính khách quan và quy luật tất yếu hơn.",
    "formation": "(Chủ ngữ +) 终究 + 是 / Động từ / Tính từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Mèo rốt cuộc vẫn là động vật, động vật khi bị dồn vào đường cùng mà cắn người cũng là chuyện thường tình."
      }
    ]
  },
  "zh_愈愈_726": {
    "title": "愈……愈…… (Cấu trúc tương quan tăng tiến: Càng... càng... / Càng thế này lại càng thế kia)",
    "shortExplanation": "Cấu trúc tương quan biểu thị mức độ của hành động, tính chất phía sau tăng tiến tỷ lệ thuận theo sự thay đổi hoặc mức độ phát triển của điều kiện phía trước; mang sắc thái văn nhã trang trọng hơn \"越……越……\".",
    "longExplanation": "“愈……愈……” (yù... yù...) là cấu trúc tương quan tăng tiến cổ điển và trang nhã trong tiếng Hán, tương đương về mặt ngữ pháp với kết cấu khẩu ngữ quen thuộc “越……越……”. Từ “愈” có nghĩa là càng, càng thêm, tăng tiến. Cấu trúc này thường dùng trong văn viết, văn phong học thuật, nghị luận hoặc văn học tao nhã để miêu tả hai hiện tượng biến đổi theo tỷ lệ thuận: khi điều kiện ở vế thứ nhất ngày càng sâu sắc, lâu dài hoặc tăng cao thì trạng thái, cảm xúc hoặc kết quả ở vế thứ hai cũng theo đó mà phát triển mãnh liệt hơn. Thường có thể kết hợp với “是” (愈是……愈是……) hoặc phó từ “就” để tăng cường sự kết nối logic chặt chẽ.",
    "formation": "(Chủ ngữ +) 愈 (+ 是) + Vị ngữ 1 ，(Chủ ngữ +) (就) 愈 (+ 是) + Vị ngữ 2",
    "examples": [
      {
        "translation": "Kinh doanh tranh Tết càng lâu năm, ông ấy lại càng thêm tha thiết say mê với tranh Tết."
      }
    ]
  },
  "zh_一经_727": {
    "title": "一经 (Phó từ / Liên từ thời gian: Một khi đã... / Vừa mới qua... là lập tức...)",
    "shortExplanation": "Từ nối trang trọng trong văn viết, chỉ cần trải qua một hành động hoặc thủ tục nào đó thì ngay lập tức phát sinh kết quả hoặc yêu cầu tương ứng; \"một khi đã...\", \"hễ qua... là lập tức\".",
    "longExplanation": "“一经” (yī jīng) là một phó từ kiêm liên từ thời gian mang phong cách trang trọng và quy chuẩn cao trong văn viết tiếng Hán (đặc biệt trong các văn bản pháp quy, thông cáo, hợp đồng hoặc nghị luận). “一” biểu thị sự khởi đầu nhanh chóng, còn “经” mang nghĩa kinh qua, trải qua một thủ tục, hành động hay sự kiểm nghiệm nào đó. “一经” thường kết hợp với động từ song âm tiết (như: 决定 - quyết định, 发现 - phát hiện, 查实 - xác thực, 批准 - phê chuẩn, 采用 - áp dụng). Cấu trúc biểu thị ý nghĩa: hễ hành động đó vừa được thực hiện xong thì kết quả hoặc quy định ở vế sau sẽ lập tức có hiệu lực và không thể trì hoãn hay thay đổi.",
    "formation": "一经 + Động từ song âm tiết ，(Chủ ngữ +) Liền / Phải + Vị ngữ",
    "examples": [
      {
        "translation": "Ban lãnh đạo tập đoàn sẽ đưa ra quyết định đối với các vấn đề trọng đại. Một khi đã quyết định, các thành viên trong tập đoàn bắt buộc phải cùng nhau tuân thủ."
      }
    ]
  },
  "zh_本着N_728": {
    "title": "本着 + Danh từ (Giới từ phương châm / nguyên tắc: Trên tinh thần... / Căn cứ vào nguyên tắc... / Xuất phát từ...)",
    "shortExplanation": "Giới từ chỉ căn cứ và phương châm hành động, đứng trước danh từ chỉ tinh thần, nguyên tắc, tôn chỉ để làm trạng ngữ chỉ chuẩn mực dẫn dắt; \"trên tinh thần\", \"theo nguyên tắc\".",
    "longExplanation": "“本着” (běnzhe) là một giới từ chỉ căn cứ và phương châm mang phong cách trang trọng trong tiếng Hán. Trong đó, “本” mang nghĩa là căn bản, căn cứ, làm gốc; kết hợp với trợ từ động thái “着” tạo thành giới từ dẫn xuất tân ngữ. Tân ngữ theo sau “本着” hầu như luôn là các danh từ trừu tượng chỉ tinh thần, nguyên tắc, thái độ, mục đích hoặc tôn chỉ (ví dụ: “本着互谅互让的精神” - trên tinh thần thông cảm và nhượng bộ lẫn nhau, “本着实事求是的原则” - theo nguyên tắc cầu thị thực tế, “本着对人民负责的态度” - với thái độ có trách nhiệm với nhân dân). Cả cụm giới từ đóng vai trò trạng ngữ đứng trước vị ngữ động từ chính để chỉ rõ xuất phát điểm tư tưởng và kim chỉ nam của hành vi.",
    "formation": "(Chủ ngữ +) 本着 + Danh từ (tinh thần, nguyên tắc, tôn chỉ, thái độ) + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Đại biểu đàm phán của hai nước trên tinh thần thấu hiểu và nhượng bộ lẫn nhau đã giải quyết ổn thỏa vấn đề dây dưa suốt nhiều năm."
      }
    ]
  },
  "zh_为起见_729": {
    "title": "为……起见 (Khung giới từ chỉ mục đích: Để cho... / Nhằm mục đích... / Xét về mặt... / Để bảo đảm...)",
    "shortExplanation": "Khung kết cấu giới từ dùng để nêu rõ mục đích, sự cẩn trọng hoặc lý do xuất phát của một biện pháp, hành động; thường đi cùng các từ như an toàn, cẩn thận, tiện lợi; \"để cho tiện/an toàn\".",
    "longExplanation": "“为……起见” (wèi... qǐjiàn) là một kết cấu khung chỉ mục đích rất trang trọng và tao nhã trong tiếng Hán. Trong đó, “为” chỉ mục đích (vì, để), còn “起见” là một danh từ kết cấu mang nghĩa là “xét từ quan điểm, ý kiến hoặc sự suy xét nào đó”. Thành phần chèn vào giữa “为” và “起见” thường là các danh từ, tính từ hoặc cụm động-tân chỉ sự chu toàn, an toàn, tiện lợi hoặc chuẩn xác (kinh điển nhất gồm: “为安全起见” - để bảo đảm an toàn, “为慎重起见” - để cho thận trọng, “为方便起见” - để tiện bề xử lý, “为公平起见” - để bảo đảm công bằng). Cấu trúc thường đứng ở đầu câu hoặc trước vị ngữ chính để giải thích động cơ hợp lý cho hành động tiếp theo.",
    "formation": "为 + Danh từ / Tính từ / Cụm động từ + 起见 ，(Chủ ngữ +) Vị ngữ",
    "examples": [
      {
        "translation": "Sau khi mua đồ dùng ăn uống về, để bảo đảm an toàn có thể tiến hành khử trùng đồ dùng trước."
      }
    ]
  },
  "zh_暂且_730": {
    "title": "暂且 (Phó từ thời gian: Tạm thời / Trước mắt / Tạm cứ / Hãy cứ... đã)",
    "shortExplanation": "Phó từ thời gian biểu thị cách giải quyết hoặc trạng thái mang tính tạm thời, trước mắt trong tình huống hiện tại, để sau này hẵng tính tiếp; \"tạm thời\", \"trước mắt hãy cứ\".",
    "longExplanation": "“暂且” (zànqiě) là một phó từ thời gian kết hợp giữa “暂” (tạm thời, ngắn ngủi) và “且” (hãy cứ, trước mắt). Trong câu, “暂且” đứng trước động từ hoặc cụm động từ để làm trạng ngữ. Nó biểu thị ý nghĩa: dưới điều kiện hoặc hoàn cảnh thực tế trước mắt (thường là do chưa đủ điều kiện, bất đắc dĩ, hoặc chưa cần thiết giải quyết dứt điểm ngay), người nói quyết định tạm thời gác lại, duy trì trạng thái đó hoặc đưa ra một phương án ứng phó tạm bợ trước, chờ thời cơ thích hợp sau này sẽ xem xét lại. Gần nghĩa với “姑且” (tạm tha, tạm chấp nhận) và “暂时” (tạm thời), nhưng “暂且” mang màu sắc hành động ứng phó linh hoạt và dứt khoát hơn.",
    "formation": "(Chủ ngữ +) 暂且 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Làm được vài ngày, Tiểu Vương đã không muốn làm nữa. Mọi người chẳng có cách nào khác, đành phải tạm thời mặc kệ anh ta."
      }
    ]
  },
  "zh_屡次_731": {
    "title": "屡次 (Phó từ tần suất: Nhiều lần / Hết lần này đến lần khác / Liên tiếp nhiều bận)",
    "shortExplanation": "Phó từ tần suất trang trọng, nhấn mạnh hành động hoặc sự việc xảy ra lặp đi lặp lại rất nhiều lần; thường dùng cho các sự kiện đáng chú ý hoặc không như mong muốn; \"nhiều lần\", \"hết lần này đến lần khác\".",
    "longExplanation": "“屡次” (lǚcì) là một phó từ chỉ tần suất mang sắc thái văn viết và trang trọng trong tiếng Hán. Trong đó, “屡” mang nghĩa nhiều phen, thường xuyên; còn “次” là lượng từ chỉ lần, lượt. Về cú pháp, “屡次” đứng trước động từ hoặc cụm động từ để làm trạng ngữ chỉ tần suất. Nó không chỉ đơn thuần biểu thị số lượng lần xảy ra nhiều (như “多次”), mà còn mang ngữ khí nhấn mạnh sự tiếp diễn dai dẳng, hết lần này đến bận khác, đặc biệt thường kết hợp với những hành động nỗ lực hoặc những biến cố, sai lầm, thất bại xảy ra lặp lại (ví dụ: “屡次犯错” - nhiều lần phạm lỗi, “屡次失败” - hết lần này đến lần khác thất bại, “屡次劝告” - nhiều lần khuyên bảo). Khi đi lặp lại trong các vế câu sóng đôi (như “屡次……，却屡次……”), nó tạo nên ấn tượng tương phản và cảm xúc vô cùng sâu sắc.",
    "formation": "(Chủ ngữ +) 屡次 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Những người nhiều lần khởi nghiệp nhưng lại hết lần này đến lần khác chịu thất bại thảm hại luôn muốn biết rằng, khởi nghiệp rốt cuộc có bí quyết gì không?"
      }
    ]
  },
  "zh_依据_732": {
    "title": "依据 (Danh từ: Căn cứ / Cơ sở / Bằng chứng / Điểm tựa pháp lý)",
    "shortExplanation": "Danh từ chỉ tiền đề, tiêu chuẩn hoặc căn cứ xác thực được dùng làm chỗ dựa vững chắc để đưa ra phán đoán, quyết định hoặc hành động; \"căn cứ\", \"cơ sở\".",
    "longExplanation": "Khi đóng vai trò là một danh từ trong tiếng Hán, “依据” (yījù) mang ý nghĩa là căn cứ, cơ sở thực tế hoặc bằng chứng có giá trị pháp lý, lý luận để vin vào đó mà xử lý công việc. Về mặt cú pháp, danh từ “依据” thường làm tân ngữ cho các động từ phán đoán hoặc sở hữu như “有” (có), “缺乏” (thiếu), “作为” (lấy làm), “寻找” (tìm kiếm) (ví dụ: “有法可依 / 有法律依据” - có căn cứ pháp luật; “缺乏事实依据” - thiếu căn cứ thực tế). Ngoài ra, nó cũng có thể nhận các định ngữ bổ nghĩa phía trước như “理论依据” (cơ sở lý luận), “科学依据” (căn cứ khoa học).",
    "formation": "(Chủ ngữ + 有 / 无 / 缺乏 / 寻找 +) (Định ngữ +) 依据",
    "examples": [
      {
        "translation": "Các anh làm như vậy có căn cứ pháp luật nào không?"
      }
    ]
  },
  "zh_依据_733": {
    "title": "依据 + Danh từ (Giới từ: Căn cứ vào / Dựa trên cơ sở / Chiểu theo)",
    "shortExplanation": "Giới từ chỉ căn cứ hoặc chuẩn mực dẫn dắt, biểu thị việc tiến hành hành động hoặc phán đoán phải dựa hoàn toàn vào điều kiện thực tế hoặc quy tắc khách quan; \"căn cứ vào\", \"dựa trên\".",
    "longExplanation": "Khi đóng vai trò là một giới từ trong tiếng Hán, “依据” (yījù) tương đương với “根据” hoặc “按照”, nhưng mang sắc thái văn phong chuẩn mực và trang trọng hơn. Giới từ “依据” kết hợp với danh từ hoặc cụm danh từ phía sau tạo thành cụm giới tân (ví dụ: “依据市场需求” - căn cứ vào nhu cầu thị trường, “依据法律规定” - căn cứ theo quy định của pháp luật, “依据实际情况” - căn cứ vào tình hình thực tế). Cụm giới từ này đóng vai trò trạng ngữ đứng trước vị ngữ động từ chính, biểu thị phương châm, nguyên tắc hoặc chuẩn mực khách quan mà hành động bắt buộc phải tuân thủ.",
    "formation": "(Chủ ngữ +) 依据 + Danh từ / Cụm danh từ + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Khởi nghiệp bắt buộc phải căn cứ vào nhu cầu của thị trường, đây là một chân lý bất biến."
      }
    ]
  },
  "zh_任意_734": {
    "title": "任意 (Phó từ / Tính từ: Tùy ý / Tùy tiện / Tự ý / Tự do theo ý mình)",
    "shortExplanation": "Biểu thị việc hành động hoàn toàn theo ý muốn chủ quan của bản thân mà không chịu sự ràng buộc hay hạn chế nào; thường dùng trước động từ để chỉ sự tự ý, tùy tiện vi phạm quy tắc; \"tùy ý\", \"tự tiện\".",
    "longExplanation": "“任意” (rènyì) là một từ đa năng trong tiếng Hán, vừa làm phó từ vừa làm tính từ. Chữ “任” mang nghĩa mặc sức, buông thả; còn “意” là ý muốn, tâm ý. Về mặt cú pháp, khi làm phó từ đứng trước động từ, “任意” biểu thị hành động diễn ra tùy tiện, tự ý làm theo sở thích hoặc toan tính cá nhân mà bất chấp các quy định, luật lệ hay thỏa ước chung (ví dụ: “任意反悔” - tự ý nuốt lời/đổi ý, “任意妄为” - tùy tiện làm càn, “任意挥霍” - tùy tiện phung phí). Cấu trúc rất thường xuất hiện trong các câu phủ định, nghiêm cấm (như: “不能任意……” - không được tùy tiện..., “不得任意……” - tuyệt đối không được tự ý...). Ngoài ra, trong toán học hoặc khoa học, “任意” còn dùng như định ngữ mang nghĩa “bất kỳ” (như “任意两点” - hai điểm bất kỳ).",
    "formation": "(Chủ ngữ +) (不能 / 不得 / 严禁 +) 任意 + Động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Hợp đồng một khi đã có hiệu lực, bất kỳ bên nào cũng không được tự ý nuốt lời đổi ý."
      }
    ]
  },
  "zh_尚未_735": {
    "title": "尚未 (Phó từ phủ định thời gian: Vẫn chưa / Chưa từng / Còn chưa)",
    "shortExplanation": "Phó từ phủ định mang phong cách văn viết trang trọng, biểu thị một hành động, trạng thái hoặc kết quả cho đến thời điểm hiện tại vẫn chưa xuất hiện hoặc chưa hoàn tất; \"vẫn chưa\", \"chưa\".",
    "longExplanation": "“尚未” (shàngwèi) là một phó từ phủ định thời gian mang đậm màu sắc văn thư, học thuật và báo chí chuẩn mực trong tiếng Hán. Trong đó, “尚” có nghĩa là vẫn, còn (như trong 尚且, 还在); còn “未” mang nghĩa là chưa (phủ định thời gian, tương đương 没 hoặc 没有). “尚未” đứng trước động từ, cụm động từ hoặc tính từ để làm trạng ngữ phủ định. Nó nhấn mạnh rằng tính đến thời điểm phát ngôn hoặc mốc thời gian được nói tới, sự việc hay mục tiêu đó vẫn chưa hề diễn ra (ví dụ: “尚未完成” - vẫn chưa hoàn thành, “尚未解决” - vẫn chưa được giải quyết, “尚未被认识” - vẫn chưa được nhận thức, “尚未可知” - vẫn chưa thể biết trước). So với “还没(有)”, “尚未” trang nghiêm, chính xác và khách quan hơn nhiều.",
    "formation": "(Chủ ngữ +) 尚未 + Động từ / Cụm động từ (+ Tân ngữ)",
    "examples": [
      {
        "translation": "Cái gọi là thị trường tiềm năng, chính là thị trường vẫn chưa được con người nhận thức rõ."
      }
    ]
  },
  "zh_把放在眼里_736": {
    "title": "(把)……放在眼里 (Quán dụng ngữ phủ định: Để... vào trong mắt / Coi trọng... / Thèm để tâm - chủ yếu dùng dạng phủ định: Coi thường, không thèm để vào mắt)",
    "shortExplanation": "Quán dụng ngữ chỉ sự xem trọng hoặc để tâm; đại đa số trường hợp xuất hiện ở dạng phủ định (不放在眼里, 没把……放在眼里) mang ý nghĩa coi thường, xem nhẹ, không thèm đoái hoài; \"không coi ra gì\", \"chẳng để vào mắt\".",
    "longExplanation": "“(把)……放在眼里” ((bǎ)... fàngzàiyǎnlǐ) là một quán dụng ngữ khẩu ngữ cực kỳ sống động và giàu tính hình tượng trong tiếng Hán. Nghĩa đen là “đặt ai/cái gì vào trong tầm mắt”, biểu thị sự tôn trọng, coi trọng hoặc để tâm đến đối phương hay sự vật đó. Tuy nhiên trong thực tế sử dụng, cấu trúc này hầu như tuyệt đối (trên 95%) xuất hiện ở dạng phủ định: “不把……放在眼里” (không thèm coi... ra gì), “没把……放在眼里” (chưa bao giờ coi... vào đâu), hoặc đưa tân ngữ lên đầu câu như “根本不放在眼里” (hoàn toàn chẳng thèm để vào mắt). Nó diễn tả thái độ vô cùng khinh thị, xem thường đối thủ, coi khó khăn là chuyện vặt vãnh không đáng kể, hoặc biểu thị thái độ ngạo mạn, coi trời bằng vung.",
    "formation": "(Chủ ngữ +) (不 / 没) 把 + Danh từ + 放在眼里 / (Danh từ +) Chủ ngữ + (根本 / 毫不) 不放在眼里",
    "examples": [
      {
        "translation": "Chút khó khăn này cô ấy căn bản chẳng thèm để vào mắt."
      }
    ]
  },
  "zh_不无_737": {
    "title": "不无 (Không phải không có / Không khỏi có chút / Ít nhiều cũng có)",
    "shortExplanation": "Cấu trúc song trùng phủ định thư diện ngữ dùng để khẳng định một cách uyển chuyển, chừng mực rằng thực sự có một mức độ hoặc phần nào đó; \"không phải không có\", \"không khỏi có chút\", \"ít nhiều cũng có\".",
    "longExplanation": "“不无” (bùwú) là cấu trúc song trùng phủ định (phủ định kép) mang sắc thái trang trọng, nhã nhặn trong văn viết (thư diện ngữ) của tiếng Hán, kết hợp giữa phó từ phủ định “不” và động từ phủ định “无” (tương đương “没有”). Về mặt ngữ nghĩa, hai lần phủ định tạo thành khẳng định (“không phải không có” tức là “có một phần, có đôi chút”), nhưng ngữ khí khẳng định được diễn đạt một cách uyển chuyển, dè dặt và hàm súc hơn nhiều so với việc khẳng định trực tiếp bằng “有”. “不无” thường kết hợp với các danh từ trừu tượng chỉ đạo lý, lợi ích, mối quan hệ hoặc các từ ngữ biểu thị trạng thái tâm lý, cảm xúc (ví dụ: 不无道理 - không phải không có lý; 不无关系 - không phải không liên quan; 不无遗憾 - không khỏi có chút tiếc nuối; 不无裨益 - không phải không có ích; 不无得意 - không khỏi có phần đắc ý). Cấu trúc này thường làm vị ngữ hoặc trạng ngữ trong câu.",
    "formation": "Chủ ngữ + 不无 + Danh từ trừu tượng / Đoản ngữ danh từ (hoặc Tính từ / Động từ biểu thị tâm lý: 道理, 遗憾, 关系, 裨益, 担心, 得意)",
    "examples": [
      {
        "translation": "Cô ấy bảo rằng tiền lương quá thấp, điều này cũng không phải là không có lý."
      }
    ]
  }
};

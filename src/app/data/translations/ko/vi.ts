import { GrammarTranslation } from '../../../models/grammar.model';

export const GRAMMAR_KO_VI: Record<string, GrammarTranslation> = {
  "ko_이가_0": {
    "title": "이/가 (Tiểu từ chủ ngữ)",
    "shortExplanation": "Tiểu từ chủ cách gắn sau danh từ để xác định và chỉ rõ danh từ đó là chủ ngữ của câu.",
    "longExplanation": "'이/가' là tiểu từ chủ cách cơ bản trong tiếng Hàn, được gắn ngay sau danh từ để biểu thị danh từ đó là chủ ngữ thực hiện hành động hoặc là đối tượng chính của trạng thái trong câu. Nếu danh từ kết thúc bằng phụ âm (có patchim), ta dùng '이'; nếu danh từ kết thúc bằng nguyên âm (không có patchim), ta dùng '가'. '이/가' thường nhấn mạnh vào chính chủ ngữ (trả lời cho câu hỏi 'Ai?', 'Cái gì?'), hoặc dùng khi nêu thông tin mới, miêu tả trạng thái khách quan trước mắt.",
    "formation": "Danh từ có patchim + 이 / Danh từ không có patchim + 가",
    "examples": [
      {
        "translation": "Tôi ăn táo, nhưng bạn tôi lại thích cam."
      },
      {
        "translation": "Chú cún của tôi nhảy lên trên ghế sofa."
      },
      {
        "translation": "Cuốn sách này là thú vị nhất."
      },
      {
        "translation": "Món ăn mà bạn thích là món gì vậy?"
      }
    ]
  },
  "ko_은는_1": {
    "title": "은/는 (Tiểu từ chủ đề / tương phản)",
    "shortExplanation": "Tiểu từ bổ trợ gắn sau danh từ để xác định chủ đề của câu hoặc biểu thị sự đối chiếu, tương phản.",
    "longExplanation": "'은/는' là tiểu từ bổ trợ (phụ trợ từ) rất quan trọng trong tiếng Hàn. Khi gắn vào danh từ, nó đưa danh từ đó lên làm chủ đề bàn luận chính của câu ('về phần...', 'còn... thì'). Ngoài ra, '은/는' còn có chức năng biểu thị sự tương phản, đối chiếu giữa hai hay nhiều đối tượng hoặc nội dung khác nhau. Nếu danh từ kết thúc bằng phụ âm (có patchim), dùng '은'; nếu kết thúc bằng nguyên âm (không có patchim), dùng '는'.",
    "formation": "Danh từ có patchim + 은 / Danh từ không có patchim + 는",
    "examples": [
      {
        "translation": "Tôi là học sinh. Tôi đang học tiếng Hàn."
      },
      {
        "translation": "Bạn tôi thì ở nhà, còn tôi thì ở trường."
      },
      {
        "translation": "Hôm nay trời mưa, nhưng ngày mai trời sẽ quang đãng."
      },
      {
        "translation": "Cái này là sách, còn cái kia là bút chì."
      }
    ]
  },
  "ko_을를_2": {
    "title": "을/를 (Tiểu từ tân ngữ)",
    "shortExplanation": "Tiểu từ mục đích cách gắn sau danh từ để xác định danh từ đó là tân ngữ trực tiếp chịu tác động của hành động.",
    "longExplanation": "'을/를' là tiểu từ tân ngữ (mục đích cách) trong tiếng Hàn, được gắn sau danh từ để chỉ rõ rằng danh từ đó là đối tượng trực tiếp chịu sự tác động của ngoại động từ đứng phía sau. Nếu danh từ kết thúc bằng phụ âm (có patchim), gắn '을'; nếu danh từ kết thúc bằng nguyên âm (không có patchim), gắn '를'. Trong giao tiếp khẩu ngữ hằng ngày, '을/를' đôi khi có thể được lược bỏ nếu ngữ cảnh đã rõ ràng.",
    "formation": "Danh từ có patchim + 을 + Động từ / Danh từ không có patchim + 를 + Động từ",
    "examples": [
      {
        "translation": "Mỗi buổi sáng tôi đều uống cà phê."
      },
      {
        "translation": "Tôi đang đọc cuốn sách này."
      },
      {
        "translation": "Tôi muốn đi xem phim."
      },
      {
        "translation": "Chúng tôi muốn giúp đỡ họ."
      }
    ]
  },
  "ko_아니다_3": {
    "title": "이/가 아니다 (Không phải là...)",
    "shortExplanation": "Dạng phủ định của vị từ chỉ định '이다' (là); tương đương với 'không phải là...' trong tiếng Việt.",
    "longExplanation": "'아니다' là tính từ phủ định trong tiếng Hàn, dùng để phủ định hoàn toàn bản chất, tên gọi, danh tính hoặc thuộc tính của một danh từ (tương đương với cấu trúc phủ định của hệ từ '이다'). Cấu trúc chuẩn luôn đi kèm với tiểu từ chủ ngữ: 'Danh từ + 이/가 아니다'. Ở đuôi câu thân mật lịch sự (해요체), nó biến đổi thành '아니에요'; ở thể trang trọng (하십시오체), nó biến đổi thành '아닙니다'.",
    "formation": "Danh từ có patchim + 이 아니다 / Danh từ không có patchim + 가 아니다",
    "examples": [
      {
        "translation": "Đó không phải là sách của tôi, đó là sách của bạn tôi."
      },
      {
        "translation": "Chúng ta không hề muộn quá đâu, vẫn còn dư dả thời gian mà."
      },
      {
        "translation": "Công viên tuyệt đẹp này không phải là tự nhiên, mà do con người tạo nên đấy."
      },
      {
        "translation": "Anh ấy không phải là bạn của tôi, chúng tôi chỉ là đồng nghiệp thôi."
      }
    ]
  },
  "ko_예요이에요_4": {
    "title": "예요/이에요 (Đuôi câu khẳng định thân mật lịch sự: là...)",
    "shortExplanation": "Đuôi câu trần thuật thân mật lịch sự (thể 해요) của hệ từ '이다', dùng sau danh từ với nghĩa 'là...'.",
    "longExplanation": "'예요/이에요' là dạng kết hợp của hệ từ (tiểu từ vị ngữ) '이다' với đuôi câu thân mật lịch sự '어요' trong tiếng Hàn, tương đương với 'là...' trong tiếng Việt. Nó được gắn trực tiếp vào sau danh từ để giới thiệu tên gọi, nghề nghiệp, quốc tịch hoặc bản chất sự vật. Nếu danh từ kết thúc bằng phụ âm (có patchim), dùng '이에요'; nếu danh từ kết thúc bằng nguyên âm (không có patchim), dùng '예요'.",
    "formation": "Danh từ có patchim + 이에요 / Danh từ không có patchim + 예요",
    "examples": [
      {
        "translation": "Tôi là học sinh."
      },
      {
        "translation": "Người này là bạn của tôi."
      },
      {
        "translation": "Đây là chiếc cặp của tôi."
      },
      {
        "translation": "Sở thích của tôi là đọc sách."
      }
    ]
  },
  "ko_아요어요여요_5": {
    "title": "아요/어요/여요 (Đuôi câu thân mật lịch sự thì hiện tại - 해요체)",
    "shortExplanation": "Đuôi từ kết thúc câu thân mật lịch sự thì hiện tại, gắn sau thân động từ hoặc tính từ.",
    "longExplanation": "'아요/어요/여요' là vĩ tố kết thúc câu thuộc phong cách thân mật lịch sự (thể 해요 - Haeyo-che), được sử dụng phổ biến nhất trong đời sống thường nhật của người Hàn Quốc. Vĩ tố này dùng cho cả câu trần thuật lẫn câu nghi vấn (khi lên giọng ở cuối câu). Quy tắc chia theo nguyên âm của gốc từ: nếu nguyên âm cuối của gốc động từ/tính từ là nguyên âm dương tính 'ㅏ' hoặc 'ㅗ', kết hợp với '-아요'; đối với các nguyên âm còn lại (nguyên âm âm tính), kết hợp với '-어요'; riêng các từ có đuôi '-하다' sẽ biến đổi thành '-해요' (dạng rút gọn của '하여요').",
    "formation": "Thân động từ/tính từ có nguyên âm 'ㅏ', 'ㅗ' + 아요 / Thân động từ/tính từ có các nguyên âm khác + 어요 / Gốc có đuôi '하다' -> 해요",
    "examples": [
      {
        "translation": "Tôi đang học tiếng Hàn."
      },
      {
        "translation": "Mẹ tôi nấu những món ăn rất ngon."
      },
      {
        "translation": "Thầy giáo đang dạy cho học sinh về văn hóa Hàn Quốc."
      },
      {
        "translation": "Anh ấy thỉnh thoảng đi dạo vào giờ nghỉ trưa."
      }
    ]
  },
  "ko_고_6": {
    "title": "~고 보니 (Sau khi làm xong mới nhận ra rằng)",
    "shortExplanation": "Diễn tả việc sau khi hoàn thành một hành động nào đó thì mới phát hiện hoặc nhận ra một sự thật mới mà trước đó chưa hề nghĩ tới ('sau khi làm xong mới thấy...').",
    "longExplanation": "'~고 보니' là sự kết hợp giữa vĩ tố liên kết '-고' (xong rồi) và cấu trúc nhận biết/khám phá '-보니' (thử nhìn/nhận thấy thì). Cấu trúc này dùng để diễn đạt sự vỡ lẽ: chỉ sau khi hành động đã được thực hiện trọn vẹn thì người nói mới giật mình nhận ra một khía cạnh, giá trị hoặc sự thật mới mà trước khi tiến hành bản thân không lường trước được.",
    "formation": "Thân động từ + -고 보니",
    "examples": [
      {
        "translation": "Vẽ xong bức tranh rồi tôi mới nhận ra rằng vẽ tranh thực sự rất thú vị."
      },
      {
        "translation": "Trở về quê hương rồi tôi mới thấy bao nhiêu kỷ niệm xưa cũ ùa về."
      },
      {
        "translation": "Chia tay người bạn rồi tôi mới càng cảm nhận sâu sắc hơn sự quý giá của tình bạn ấy."
      },
      {
        "translation": "Đọc xong cuốn sách tôi mới thấy có thật nhiều điều đáng để học hỏi."
      }
    ]
  },
  "ko_하고_7": {
    "title": "하고 (Trợ từ liên kết / đi cùng: và, cùng với)",
    "shortExplanation": "Trợ từ gắn sau danh từ dùng để nối hai danh từ lại với nhau ('và') hoặc biểu thị hành động cùng ai đó ('cùng với').",
    "longExplanation": "'하고' là trợ từ liên kết phổ biến trong khẩu ngữ tiếng Hàn, được gắn trực tiếp vào sau danh từ mà không phân biệt có phụ âm cuối hay không. Nó có hai công dụng chủ yếu: kết nối hai hoặc nhiều danh từ mang quan hệ ngang hàng (tương đương 'và'), hoặc đóng vai trò tiểu từ phó từ cách chỉ người đồng hành cùng thực hiện một hành động nào đó (tương đương 'cùng với', 'với').",
    "formation": "Danh từ 1 + 하고 + Danh từ 2 (hoặc Danh từ + 하고 + Động từ)",
    "examples": [
      {
        "translation": "Tôi đã xem phim và ăn cơm với bạn, rồi sau đó về nhà làm bài tập."
      },
      {
        "translation": "Cuối tuần này tôi đã quyết định đi du lịch cùng gia đình."
      },
      {
        "translation": "Peter và Mary đã cùng nhau đến trường."
      },
      {
        "translation": "Hôm nay tôi dự định đi mua sắm cùng bố."
      }
    ]
  },
  "ko_으세요euseyoImperativeform_8": {
    "title": "(으)세요 (Đuôi câu mệnh lệnh, thỉnh dụ lịch sự: hãy..., xin vui lòng...)",
    "shortExplanation": "Đuôi câu kết thúc tôn kính thân mật, dùng để yêu cầu, khuyên nhủ hoặc đề nghị ai đó làm gì một cách lịch sự.",
    "longExplanation": "'(으)세요' là vĩ tố kết thúc câu mệnh lệnh và thỉnh dụ mang tính lịch sự, được tạo nên từ sự kết hợp của vĩ tố tôn kính chủ ngữ '-(으)시-' và đuôi câu '-어요'. Cấu trúc này dùng khi yêu cầu, nhờ vả, chỉ dẫn hoặc khuyên bảo đối phương làm một hành động nào đó với thái độ nhã nhặn, tôn trọng ('hãy...', 'xin hãy...', 'vui lòng...'). Nếu thân động từ kết thúc bằng phụ âm (có patchim), gắn '-으세요'; nếu kết thúc bằng nguyên âm hoặc phụ âm 'ㄹ' (khi 'ㄹ' gặp 'ㅅ' thì 'ㄹ' bị lược bỏ), gắn '-세요'.",
    "formation": "Thân động từ có patchim + 으세요 / Thân động từ không có patchim + 세요 (Nếu thân tận cùng bằng 'ㄹ', lược bỏ 'ㄹ' rồi cộng '세요')",
    "examples": [
      {
        "translation": "Hãy cẩn thận khi qua đường nhé, có thể xảy ra tai nạn đấy."
      },
      {
        "translation": "Hãy về nhà rồi uống số thuốc cần phải uống nhé."
      },
      {
        "translation": "Nếu nhận được tin nhắn này thì hãy trả lời ngay nhé."
      },
      {
        "translation": "Hãy gọi điện thoại trước cho những người mà bạn cần gặp vào tối nay."
      }
    ]
  },
  "ko_으수있다eulsuitdaCando_9": {
    "title": "(으)ㄹ 수 있다 (Có thể làm gì đó)",
    "shortExplanation": "Cấu trúc gắn sau thân động từ để biểu thị năng lực cá nhân hoặc khả năng có thể xảy ra của một sự việc; 'có thể'.",
    "longExplanation": "'(으)ㄹ 수 있다' là cấu trúc biểu thị khả năng cơ bản nhất trong tiếng Hàn, tương đương với 'có thể...' trong tiếng Việt. Cấu trúc này được cấu thành từ vĩ tố định ngữ tương lai '-(으)ㄹ', danh từ phụ thuộc '수' (phương thức, khả năng) và tính từ tồn tại '있다'. Nó dùng để diễn đạt hai ý nghĩa: năng lực chủ quan của chủ thể (biết làm, có khả năng làm) hoặc hoàn cảnh khách quan cho phép hành động diễn ra. Nếu thân động từ có patchim, gắn '-을 수 있다'; nếu không có patchim hoặc tận cùng là 'ㄹ', gắn '-ㄹ 수 있다'. Ngược lại, dạng phủ định (không thể) là '(으)ㄹ 수 없다'.",
    "formation": "Thân động từ có patchim + 을 수 있다 / Thân động từ không có patchim hoặc có patchim 'ㄹ' + ㄹ 수 있다",
    "examples": [
      {
        "translation": "Vì cô ấy có thể học tiếng Hàn rất nhanh nên chắc là chỉ sau một tháng có thể thi lấy chứng chỉ TOPIK."
      },
      {
        "translation": "Vì nhà bạn ở gần nên nếu học tập chăm chỉ thì trong vòng một tháng bạn có thể nói tiếng Hàn lưu loát."
      },
      {
        "translation": "Vì tôi hiểu biết rất nhiều về điều đó nên tôi có thể trả lời mọi câu hỏi liên quan."
      },
      {
        "translation": "Nếu bạn cảm thấy khó hiểu thì tôi có thể nói chậm lại một chút."
      }
    ]
  },
  "ko_으려고euryeogoIntentiontodo_10": {
    "title": "(으)려고 (Vĩ tố liên kết chỉ ý định, mục đích: để, định làm gì)",
    "shortExplanation": "Vĩ tố liên kết gắn sau động từ chỉ mục đích hoặc ý định thực hiện một hành động nào đó; 'định...', 'để mà...'.",
    "longExplanation": "'(으)려고' là vĩ tố liên kết phụ thuộc chỉ mục đích hoặc ý định trong tiếng Hàn, tương đương với 'để', 'nhằm mục đích' hoặc 'định làm gì' trong tiếng Việt. Nó diễn đạt ý định của chủ ngữ ở mệnh đề trước nhằm thực hiện một hành động hoặc tạo nên tiền đề ở mệnh đề sau. Nếu thân động từ có patchim, gắn '-으려고'; nếu không có patchim hoặc có patchim 'ㄹ', gắn '-려고'. Lưu ý: mệnh đề sau không đi cùng các đuôi câu mệnh lệnh như '-(으)세요' hay thỉnh dụ như '-(으)ㅂ시다'.",
    "formation": "Thân động từ có patchim + 으려고 / Thân động từ không có patchim hoặc có patchim 'ㄹ' + 려고",
    "examples": [
      {
        "translation": "Tôi đã đến Hàn Quốc để học tiếng Hàn."
      },
      {
        "translation": "Chị gái tôi đang tập thể dục để giảm cân."
      },
      {
        "translation": "Các học sinh đang học tập chăm chỉ để vượt qua kỳ thi."
      },
      {
        "translation": "Bố làm việc mỗi ngày nhằm mang lại cuộc sống tốt đẹp cho các con."
      }
    ]
  },
  "ko_으는다eunneundaInformalstatementendings_11": {
    "title": "(으)ㄴ/는다 (Đuôi câu trần thuật hiện tại - thể 해라 / thể thường)",
    "shortExplanation": "Đuôi câu trần thuật thì hiện tại ở thể trung cấp/thể hạ đẳng (해라체), thường dùng trong văn viết, báo chí, nhật ký hoặc khi nói với bạn bè đồng trang lứa, người nhỏ tuổi.",
    "longExplanation": "'(으)ㄴ/는다' là vĩ tố kết thúc câu trần thuật thì hiện tại thuộc thể 해라 (Haera-che / thể cơ bản không kính ngữ). Vĩ tố này thường xuất hiện trong các bài viết mang tính khách quan như sách báo, tiểu thuyết, nhật ký, báo cáo, hoặc dùng trong khẩu ngữ giữa bạn bè thân thiết cùng trang lứa và người lớn nói với trẻ nhỏ. Quy tắc chia đối với động từ: thân động từ có patchim kết hợp với '-는다', thân động từ không có patchim hoặc có patchim 'ㄹ' (khi đó 'ㄹ' bị lược bỏ) kết hợp với '-ㄴ다'. Đối với tính từ, chỉ cần giữ nguyên thân từ và gắn '-다'.",
    "formation": "Động từ có patchim + 는다 / Động từ không có patchim + ㄴ다 / Tính từ + 다",
    "examples": [
      {
        "translation": "Hôm nay đúng nửa đêm tôi mới trở về nhà."
      },
      {
        "translation": "Anh ấy nói tiếng Tây Ban Nha rất giỏi."
      },
      {
        "translation": "Cà phê này đậm đặc quá."
      },
      {
        "translation": "Ngày mai chúng tôi sẽ đi đến công viên và đi dã ngoại."
      }
    ]
  },
  "ko_도_12": {
    "title": "도 (Tiểu từ: cũng, cả)",
    "shortExplanation": "Tiểu từ bổ trợ gắn sau danh từ biểu thị sự đồng nhất, bao hàm hoặc nhấn mạnh; tương đương với 'cũng', 'cả'.",
    "longExplanation": "'도' là một tiểu từ bổ trợ (phụ trợ từ) rất thông dụng trong tiếng Hàn. Khi được gắn vào sau danh từ, đại từ hoặc tiểu từ khác, nó biểu thị rằng đối tượng được nhắc đến có chung đặc điểm, trạng thái hoặc hành động với một đối tượng đã nêu trước đó (tương đương với 'cũng'). Trong nhiều ngữ cảnh mang tính tăng tiến hoặc cường điệu, '도' còn có nghĩa là 'thậm chí', 'ngay cả', 'cả'. Khi '도' được sử dụng, nó thường thay thế cho các tiểu từ chủ cách '이/가' hoặc tân ngữ cách '을/를'.",
    "formation": "Danh từ/Đại từ + 도",
    "examples": [
      {
        "translation": "Tôi thích cà phê, và bạn tôi cũng thích cà phê."
      },
      {
        "translation": "Cheolsu có thể đá bóng, và Minhee cũng có thể đá bóng."
      },
      {
        "translation": "Bộ phim này rất hay, vì thế cho đến tận bây giờ vẫn có rất nhiều người tiếp tục xem phim này."
      },
      {
        "translation": "Kỳ thi lần này khó quá, nên cả tôi lẫn các bạn đều làm bài không tốt."
      }
    ]
  },
  "ko_만_13": {
    "title": "만 (Tiểu từ giới hạn: chỉ, mỗi)",
    "shortExplanation": "Tiểu từ bổ trợ gắn sau danh từ để giới hạn duy nhất một đối tượng và loại trừ các đối tượng khác; 'chỉ', 'mỗi'.",
    "longExplanation": "'만' là một tiểu từ bổ trợ (phụ trợ từ) biểu thị sự hạn định duy nhất trong tiếng Hàn, tương đương với 'chỉ', 'mỗi', 'duy nhất' trong tiếng Việt. Nó được gắn sau danh từ hoặc đại từ mà không phụ thuộc vào phụ âm cuối, nhằm nhấn mạnh rằng chỉ có duy nhất đối tượng đó được áp dụng, hoàn toàn loại trừ các đối tượng khác. Giống như '도', khi '만' gắn vào vị trí chủ ngữ hoặc tân ngữ, nó thường thay thế cho '이/가' hoặc '을/를'.",
    "formation": "Danh từ/Đại từ + 만",
    "examples": [
      {
        "translation": "Tôi chỉ uống cà phê. Tôi không uống trà."
      },
      {
        "translation": "Bạn tôi chỉ biết nói tiếng Hàn thôi. Cậu ấy hoàn toàn không nói được ngôn ngữ nào khác."
      },
      {
        "translation": "Mỗi khi đi hẹn hò tôi chỉ đi xem phim thôi. Tôi hầu như không tham gia các hoạt động khác."
      },
      {
        "translation": "Tháng này để tiết kiệm tiền, tôi chỉ tiêu mỗi tiền xe cộ đi lại. Tôi không hề chi tiêu vào việc gì khác."
      }
    ]
  },
  "ko_와과_14": {
    "title": "와/과 (Tiểu từ liên kết / đi cùng dùng cho danh từ: và, cùng với)",
    "shortExplanation": "Tiểu từ gắn sau danh từ dùng để nối hai danh từ với nhau ('và') hoặc chỉ đối tượng cùng tham gia hành động ('cùng với').",
    "longExplanation": "'와/과' là tiểu từ liên kết và phó từ cách chỉ sự đồng hành mang phong cách tương đối trang trọng hoặc chuẩn mực trong tiếng Hàn (thường gặp trong văn viết cũng như lời nói lịch sự, so với '하고' hay '(이)랑' thiên về khẩu ngữ). Nó dùng để nối hai danh từ song song ('và') hoặc diễn tả việc làm điều gì đó cùng với ai ('cùng với'). Nếu danh từ trước kết thúc bằng nguyên âm (không có patchim), dùng '와'; nếu danh từ trước kết thúc bằng phụ âm (có patchim), dùng '과'.",
    "formation": "Danh từ không có patchim + 와 / Danh từ có patchim + 과",
    "examples": [
      {
        "translation": "Tôi đã nô đùa thỏa thích cùng chú cún ở công viên."
      },
      {
        "translation": "Tôi thích ăn bánh mì cùng với cà phê."
      },
      {
        "translation": "Tôi đã cùng học bài với bạn và chiếc bút chì."
      },
      {
        "translation": "Tôi đã đi du lịch cùng với gia đình của mình."
      }
    ]
  },
  "ko_부터_15": {
    "title": "부터 (Từ, bắt đầu từ)",
    "shortExplanation": "Trợ từ chỉ thời gian hoặc không gian bắt đầu một hành động, trạng thái; tương đương với 'từ', 'bắt đầu từ'.",
    "longExplanation": "'부터' là trợ từ chỉ mốc xuất phát về thời gian, không gian, hoặc thứ tự bắt đầu của một sự việc, hành động. Trong tiếng Việt, '부터' tương đương với 'từ', 'bắt đầu từ'. Trợ từ này thường đi kèm với các danh từ chỉ thời gian (như '오늘부터' - từ hôm nay, '내일부터' - từ ngày mai) và thường kết hợp thành cặp '부터... 까지' (từ... đến...).",
    "formation": "Danh từ + 부터",
    "examples": [
      {
        "translation": "Tôi sẽ bắt đầu ăn kiêng từ hôm nay, vì vậy tôi sẽ không ăn đồ ngọt nữa."
      },
      {
        "translation": "Từ trẻ em đến người lớn, tất cả mọi người đều có thể thưởng thức bộ phim này."
      },
      {
        "translation": "Chúng ta phải bắt đầu làm việc lại từ ngày mai, vì vậy hôm nay hãy nghỉ ngơi thật thoải mái nhé."
      },
      {
        "translation": "Tôi đã bắt đầu học tiếng Hàn từ mùa hè năm ngoái, nên giờ tôi có thể nói được một chút rồi."
      }
    ]
  },
  "ko_까지_16": {
    "title": "까지 (Đến, tới, cho đến)",
    "shortExplanation": "Trợ từ chỉ giới hạn kết thúc về thời gian, không gian, số lượng hoặc mức độ; tương đương với 'đến', 'cho đến', 'tới'.",
    "longExplanation": "'까지' là trợ từ chỉ điểm kết thúc hoặc giới hạn cuối cùng của một phạm vi trong tiếng Hàn, tương đương với 'đến', 'cho đến' hoặc 'tới' trong tiếng Việt. Trợ từ này được sử dụng rất phổ biến với các danh từ chỉ thời gian (như '내일까지' - cho đến ngày mai), địa điểm (như '서울까지' - đến Seoul) cũng như số lượng hoặc mức độ. Khi kết hợp với '부터', cấu trúc '부터... 까지' mang nghĩa 'từ... đến...'.",
    "formation": "Danh từ + 까지",
    "examples": [
      {
        "translation": "Học kỳ đầu tiên kéo dài tổng cộng sáu tháng, tức là từ tháng một đến tháng sáu."
      },
      {
        "translation": "Mỗi ngày tôi đều thức dậy sớm vào buổi sáng và làm việc đến 10 giờ tối."
      },
      {
        "translation": "Hôm nay tôi chỉ có tối đa 5.000 won nên đành phải nhịn bữa tối."
      },
      {
        "translation": "Xin vui lòng ghi vào báo cáo tất cả nội dung bao gồm cả những việc đã làm cho đến nay."
      }
    ]
  },
  "ko_아어여서_17": {
    "title": "아/어/여서 (Vì... nên..., do... nên...)",
    "shortExplanation": "Vĩ tố liên kết dùng để diễn tả nguyên nhân, lý do của mệnh đề đi sau; tương đương với 'vì... nên...', 'do... nên...'.",
    "longExplanation": "'-아/어/여서' là vĩ tố liên kết biểu thị nguyên nhân hoặc lý do dẫn đến hành động hoặc trạng thái ở vế sau. Vĩ tố này gắn trực tiếp vào thân động từ hoặc tính từ. Cách kết hợp phụ thuộc vào nguyên âm cuối của thân từ: nếu nguyên âm cuối là 'ㅏ' hoặc 'ㅗ' thì kết hợp với '-아서'; các nguyên âm còn lại kết hợp với '-어서'; động từ kết thúc bằng '하다' chuyển thành '해서'. Lưu ý: mệnh đề đi sau '-아/어/여서' không được dùng câu mệnh lệnh (-으세요) hoặc thỉnh dụ (-ㅂ시다).",
    "formation": "Thân động từ/tính từ + 아/어/여서",
    "examples": [
      {
        "translation": "Bên ngoài trời mưa nên tôi bị cảm, vì vậy tôi đã không thể đến trường."
      },
      {
        "translation": "Vì anh ấy đói bụng nên tôi đã chuẩn bị món ăn nhẹ."
      },
      {
        "translation": "Vì mải xem phim không có thời gian nên tôi hoàn toàn không làm được chút bài tập nào."
      },
      {
        "translation": "Vì nghĩ rằng tiết học khó nên ngày nào tôi cũng chăm chỉ học tập."
      }
    ]
  },
  "ko_으면eumyeonIfwhen_18": {
    "title": "(으)면 (Nếu... thì..., khi... thì...)",
    "shortExplanation": "Vĩ tố liên kết giả định dùng để biểu thị điều kiện hoặc giả định; tương đương với 'nếu... thì...', 'khi... thì...'.",
    "longExplanation": "'-(으)면' là vĩ tố liên kết dùng để nêu ra một điều kiện, giả thiết hoặc một tình huống xảy ra thường xuyên. Vế trước đưa ra điều kiện, và vế sau diễn tả kết quả hay hành động xảy ra khi thỏa mãn điều kiện đó. Nếu thân động từ/tính từ kết thúc bằng phụ âm (có phụ âm cuối, ngoại trừ 'ㄹ') thì gắn '-으면'; nếu kết thúc bằng nguyên âm hoặc phụ âm 'ㄹ' thì gắn '-면'.",
    "formation": "Thân động từ/tính từ + (으)면",
    "examples": [
      {
        "translation": "Nếu có thời gian, tôi muốn học tiếng Hàn mỗi ngày."
      },
      {
        "translation": "Nếu thời tiết đẹp, tôi sẽ đi leo núi."
      },
      {
        "translation": "Nếu thấy mệt thì đi ngủ sớm là tốt nhất."
      },
      {
        "translation": "Nếu vượt qua bài kiểm tra này, tôi có thể nhập học vào trường."
      }
    ]
  },
  "ko_너무_19": {
    "title": "너무 (Quá, rất)",
    "shortExplanation": "Phó từ chỉ mức độ dùng để nhấn mạnh tính chất, trạng thái vượt quá mức bình thường; 'quá', 'rất'.",
    "longExplanation": "'너무' là phó từ chỉ mức độ trong tiếng Hàn, thường đứng trước tính từ hoặc động từ nhằm nhấn mạnh mức độ vượt trội, thái quá hoặc cực kỳ sâu sắc của một đặc điểm, trạng thái hay hành động. Ban đầu '너무' chủ yếu mang nghĩa tiêu cực ('quá mức', 'thái quá'), nhưng trong tiếng Hàn hiện đại, từ này được dùng rộng rãi cho cả ý nghĩa tích cực lẫn tiêu cực với nghĩa 'rất', 'quá', 'cực kỳ'.",
    "formation": "너무 + Tính từ/Động từ",
    "examples": [
      {
        "translation": "Món này ngon quá nên tôi đã ăn hết sạch, không để lại được chút nào cho người khác."
      },
      {
        "translation": "Bộ phim này hay quá nên tôi đã xem tận ba lần rồi mà vẫn muốn xem lại."
      },
      {
        "translation": "Cô ấy xinh đẹp quá nên tôi ước gì ngày nào cũng được nhìn thấy cô ấy, nhưng cô ấy lại không hề biết tôi."
      },
      {
        "translation": "Bánh pizza ngon quá nên tuần nào tôi cũng ăn, nhưng từ giờ chắc tôi phải giảm bớt lại một chút."
      }
    ]
  },
  "ko_많이_20": {
    "title": "많이 (Nhiều)",
    "shortExplanation": "Phó từ chỉ số lượng lớn, tần suất cao hoặc mức độ nhiều; tương đương với 'nhiều' trong tiếng Việt.",
    "longExplanation": "'많이' là phó từ bắt nguồn từ tính từ '많다' (nhiều), dùng để bổ nghĩa cho động từ hoặc tính từ nhằm biểu thị số lượng dồi dào, mức độ sâu sắc hoặc tần suất diễn ra dày đặc của một hành động, trạng thái. Trong tiếng Việt, '많이' tương đương với 'nhiều', thường đứng trước vị ngữ mà nó tu sức (ví dụ: '많이 먹다' - ăn nhiều, '많이 바쁘다' - rất bận/bận nhiều).",
    "formation": "많이 + Động từ/Tính từ",
    "examples": [
      {
        "translation": "Tôi cần nhiều bạn bè nên thường có xu hướng đi ra ngoài gặp gỡ mọi người."
      },
      {
        "translation": "Bạn đã xem bộ phim đó chưa? Tôi đã cười rất nhiều đấy!"
      },
      {
        "translation": "Dạo này công việc bận rộn nhiều nên tôi muốn đi nghỉ phép."
      },
      {
        "translation": "Cô ấy luôn tập thể dục nhiều nên trông rất khỏe mạnh."
      }
    ]
  },
  "ko_조금_21": {
    "title": "조금 (Một chút, một ít, hơi)",
    "shortExplanation": "Phó từ chỉ số lượng ít hoặc mức độ nhẹ; tương đương với 'một chút', 'một ít', 'hơi'.",
    "longExplanation": "'조금' là phó từ chỉ số lượng nhỏ, mức độ nhẹ hoặc khoảng cách ngắn trong tiếng Hàn. Từ này có thể bổ nghĩa cho cả động từ và tính từ, giúp giảm nhẹ sắc thái hoặc làm cho câu nói trở nên nhẹ nhàng, lịch sự hơn (ví dụ: '조금 쉬다' - nghỉ một chút, '조금 춥다' - hơi lạnh). Trong khẩu ngữ thân mật, '조금' thường được rút gọn thành '좀'.",
    "formation": "조금 + Động từ/Tính từ",
    "examples": [
      {
        "translation": "Tâm trạng tôi không tốt. Tôi cần phải nghỉ ngơi một chút."
      },
      {
        "translation": "Phòng hơi tối. Xin hãy bật đèn giúp tôi."
      },
      {
        "translation": "Hành lý nặng quá. Tôi nghĩ có lẽ phải giảm bớt đi một chút."
      },
      {
        "translation": "Cô ấy biết một chút tiếng Hàn nên có thể giao tiếp đơn giản được."
      }
    ]
  },
  "ko_다_22": {
    "title": "다 (Tất cả, hết, toàn bộ)",
    "shortExplanation": "Phó từ chỉ tính toàn bộ, trọn vẹn hoặc sự hoàn tất của một hành động, trạng thái; 'tất cả', 'hết'.",
    "longExplanation": "'다' là phó từ trong tiếng Hàn biểu thị sự toàn bộ, đầy đủ không chừa lại gì, hoặc sự hoàn tất triệt để của một hành động. Khi đứng trước động từ, '다' nhấn mạnh rằng hành vi đã được thực hiện xong xuôi toàn diện (tương đương với '...hết', 'xong hết' trong tiếng Việt). Nó cũng có thể bổ nghĩa cho danh từ hay mệnh đề để chỉ toàn bộ người, vật hay sự việc có liên quan.",
    "formation": "다 + Động từ/Tính từ",
    "examples": [
      {
        "translation": "Tôi đã đọc hết tất cả sách học tiếng Hàn rồi, nên giờ không biết phải đọc gì nữa."
      },
      {
        "translation": "Chúng tôi xem hết bộ phim rồi mới trở về nhà."
      },
      {
        "translation": "Khi đến Hàn Quốc, cô ấy đã nói rằng mình thích tất cả các món ăn Hàn Quốc."
      },
      {
        "translation": "Tôi đã mua hết thực phẩm cho tuần này về rồi, vì thế trong bếp không còn một chỗ trống nào cả."
      }
    ]
  },
  "ko_으는데eunneundeButhowever_23": {
    "title": "(으)ㄴ/는데 (Nhưng, tuy nhiên / thì... mà...)",
    "shortExplanation": "Vĩ tố liên kết dùng để diễn tả sự đối lập, tương phản hoặc làm tiền đề giới thiệu bối cảnh; 'nhưng', 'thế mà'.",
    "longExplanation": "'-(으)ㄴ/는데' là vĩ tố liên kết đa dụng trong tiếng Hàn. Mẫu câu này thường dùng để diễn tả sự tương phản, đối chiếu giữa vế trước và vế sau (tương đương với 'nhưng', 'tuy nhiên' trong tiếng Việt), hoặc dùng để gợi mở hoàn cảnh, bối cảnh làm tiền đề cho câu nói tiếp theo. Quy tắc kết hợp: Động từ ở thì hiện tại gắn với '-는데'; tính từ kết thúc bằng nguyên âm gắn với '-ㄴ데', kết thúc bằng phụ âm gắn với '-은데'; thì quá khứ của cả động từ và tính từ đều gắn với '-았/었는데'; danh từ gắn với '-인/인데'.",
    "formation": "Động từ + 는데 / Tính từ + (으)ㄴ데 / Danh từ + 인데",
    "examples": [
      {
        "translation": "Hôm nay thời tiết đẹp nhưng tôi chỉ muốn ở nhà."
      },
      {
        "translation": "Anh ấy rất tốt bụng nhưng đôi khi lại quá thẳng thắn đến mức gây tổn thương cho người khác."
      },
      {
        "translation": "Tôi đã học tiếng Hàn lâu rồi, mặc dù vậy nhưng vẫn còn rất nhiều thiếu sót."
      },
      {
        "translation": "Bộ quần áo này đẹp nhưng không phải là phong cách của tôi."
      }
    ]
  },
  "ko_아어야_24": {
    "title": "아/어야 하다/되다 (Phải, cần phải)",
    "shortExplanation": "Cấu trúc biểu thị nghĩa vụ, bổn phận hoặc sự cần thiết phải làm gì đó; tương đương với 'phải', 'cần phải'.",
    "longExplanation": "'-아/어야 하다/되다' là cấu trúc biểu thị tính tất yếu, nghĩa vụ hoặc điều bắt buộc phải thực hiện. Cấu trúc này gắn vào thân động từ hoặc tính từ: nếu nguyên âm cuối của thân từ là 'ㅏ' hoặc 'ㅗ' thì gắn '-아야 하다/되다'; các nguyên âm khác gắn '-어야 하다/되다'; động từ kết thúc bằng '하다' chuyển thành '해야 하다/되다'. Trong khẩu ngữ hàng ngày, '되다' thường được dùng thay cho '하다' để diễn tả tính tự nhiên hơn.",
    "formation": "Thân động từ/tính từ + 아/어/여야 하다 (hoặc 되다)",
    "examples": [
      {
        "translation": "Có nhiều bài học như thế này nên chúng ta phải bắt đầu nhanh chóng. Nếu không, thời gian sẽ không đủ và chúng ta không thể hoàn thành mọi thứ được."
      },
      {
        "translation": "Vì cuối tuần có kỳ thi nên tôi phải chuẩn bị ngay từ bây giờ. Nếu không học đủ nhiều thì có thể sẽ thi trượt mất."
      },
      {
        "translation": "Ngày mai tôi phải đến công ty từ sáng sớm. Có một cuộc họp quan trọng nên tôi nhất định phải tham dự."
      },
      {
        "translation": "Vào mùa hè chỉ số chống nắng rất quan trọng, vì vậy trước khi ra ngoài bạn phải thoa kem chống nắng. Nếu không làn da có thể bị tổn thương đấy."
      }
    ]
  },
  "ko_안_25": {
    "title": "안 (Không - phủ định ngắn)",
    "shortExplanation": "Phó từ phủ định đặt trước động từ hoặc tính từ; tương đương với 'không' trong tiếng Việt.",
    "longExplanation": "'안' là phó từ phủ định ngắn (dạng viết gọn của '아니'), được đặt ngay trước động từ hoặc tính từ để phủ định hành động, ý chí hoặc trạng thái (ví dụ: '안 가다' - không đi, '안 예쁘다' - không đẹp). Đối với các động từ có cấu trúc 'Danh từ + 하다' (như '공부하다', '운동하다'), '안' thường được chèn vào giữa danh từ và động từ '하다' (ví dụ: '공부 안 하다', '운동 안 하다').",
    "formation": "안 + Động từ/Tính từ (hoặc Danh từ + 안 하다)",
    "examples": [
      {
        "translation": "Tôi vẫn chưa ngủ. Vẫn còn việc chưa làm xong."
      },
      {
        "translation": "Bạn tôi không ăn cá hồi. Cô ấy không thích cá."
      },
      {
        "translation": "Bạn chưa xem bộ phim đó sao? Thật sự rất hay đấy, nhất định bạn phải xem nhé."
      },
      {
        "translation": "Tôi thật sự không thích người đó, bởi vì anh ta lúc nào cũng nói dối."
      }
    ]
  },
  "ko_못_26": {
    "title": "못 (Không thể)",
    "shortExplanation": "Phó từ phủ định biểu thị sự bất khả năng, thiếu năng lực hoặc hoàn cảnh không cho phép; tương đương với 'không thể'.",
    "longExplanation": "'못' là phó từ phủ định chỉ sự bất khả năng, đặt trực tiếp trước động từ hành động để diễn tả rằng người nói không đủ khả năng về thể chất, tâm lý hoặc do hoàn cảnh khách quan cản trở nên không thể thực hiện được hành động đó (khác với '안' là không làm do ý chí chủ quan). Với các động từ dạng 'Danh từ + 하다', '못' thường đứng giữa danh từ và động từ '하다' (ví dụ: '수영 못 하다', '운전 못 하다').",
    "formation": "못 + Động từ (hoặc Danh từ + 못 하다)",
    "examples": [
      {
        "translation": "Hôm nay quá mệt mỏi nên tôi đã không thể ngủ sớm được."
      },
      {
        "translation": "Cô ấy quá lo lắng và căng thẳng nên đã không thể ăn cơm được."
      },
      {
        "translation": "Mưa rơi nhiều quá nên chúng tôi đã không thể đi đến công viên giải trí được."
      },
      {
        "translation": "Tôi đến quá muộn nên đã không thể tham dự cuộc họp."
      }
    ]
  },
  "ko_아어여_27": {
    "title": "아/어/여 보다 (Thử làm gì / từng làm gì)",
    "shortExplanation": "Cấu trúc bổ trợ biểu thị sự thử nghiệm một hành động mới hoặc trải nghiệm đã từng làm gì đó; 'thử...', 'từng...'.",
    "longExplanation": "'-아/어/여 보다' là cấu trúc kết hợp động từ phụ trợ '보다' vào thân động từ chính để biểu thị: (1) Thử làm một việc gì đó để xem kết quả ra sao ('thử làm...'); (2) Khi chia ở thì quá khứ ('-아/어/여 봤다'), biểu thị kinh nghiệm hoặc trải nghiệm trong quá khứ ('đã từng làm...'). Thân động từ có nguyên âm 'ㅏ, ㅗ' gắn với '-아 보다'; các nguyên âm khác gắn với '-어 보다'; '하다' chuyển thành '해 보다'.",
    "formation": "Thân động từ + 아/어/여 보다",
    "examples": [
      {
        "translation": "Nếu không biết phải giải quyết vấn đề này như thế nào thì hãy thử làm theo cách của tôi một lần xem sao."
      },
      {
        "translation": "Nếu bạn chưa từng làm kim chi bao giờ thì hãy thử làm một lần xem. Thật sự rất dễ và thú vị đấy."
      },
      {
        "translation": "Trước đây tôi đã từng thử học tiếng Hàn nhưng giờ chẳng nhớ được chút gì cả."
      },
      {
        "translation": "Tôi đã thử học theo phương pháp này và kết quả rất tốt."
      }
    ]
  },
  "ko_지금_28": {
    "title": "지금 (Bây giờ, hiện tại)",
    "shortExplanation": "Danh từ hoặc phó từ chỉ thời điểm hiện tại; tương đương với 'bây giờ', 'hiện tại', 'ngay lúc này'.",
    "longExplanation": "'지금' là từ chỉ thời gian trong tiếng Hàn, vừa có thể làm danh từ vừa có thể làm phó từ, dùng để chỉ thời điểm người nói đang nói hoặc khoảng thời gian hiện tại diễn ra sự việc. Từ này tương đương với 'bây giờ', 'ngay lúc này', 'hiện nay' trong tiếng Việt. '지금' thường được đặt ở đầu câu hoặc ngay trước động từ để nhấn mạnh tính thời điểm tức thì.",
    "formation": "지금 + Mệnh đề/Động từ (hoặc đi cùng trợ từ: 지금은, 지금부터)",
    "examples": [
      {
        "translation": "Bây giờ tôi phải đến trường. Tiết học sẽ bắt đầu ngay thôi."
      },
      {
        "translation": "Bây giờ trời đang mưa. Tôi nghĩ bạn nên mang theo ô thì tốt hơn."
      },
      {
        "translation": "Bây giờ tôi đang làm bài tập về nhà. Tôi sẽ gọi lại cho bạn sau nhé."
      },
      {
        "translation": "Nếu bây giờ bạn đến nhà tôi thì chúng ta có thể cùng nhau dùng bữa."
      }
    ]
  },
  "ko_이미_29": {
    "title": "이미 (Đã, rồi, sẵn rồi)",
    "shortExplanation": "Phó từ biểu thị hành động hoặc tình huống đã xảy ra trước thời điểm nói hoặc sớm hơn dự định; 'đã', 'rồi'.",
    "longExplanation": "'이미' là phó từ trong tiếng Hàn biểu thị sự việc, trạng thái hoặc hành động đã diễn ra và hoàn tất từ trước thời điểm nói hoặc trước một mốc thời gian quy định, tương đương với 'đã', 'sẵn rồi' trong tiếng Việt. '이미' thường đi kèm với các động từ chia ở thì quá khứ hoặc trạng thái hoàn thành để nhấn mạnh sự việc đã rồi và không thể thay đổi.",
    "formation": "이미 + Động từ (thường ở thì quá khứ hoặc hoàn thành)",
    "examples": [
      {
        "translation": "Vì bạn đã xem bộ phim đó rồi, nên việc đi xem lại nữa thì có ý nghĩa gì chứ?"
      },
      {
        "translation": "Tôi đã ăn tối rồi, nên bạn cứ ăn tối một mình đi nhé."
      },
      {
        "translation": "Vì năm ngoái tôi đã bán sạch cổ phiếu của công ty đó rồi, nên bây giờ không có bất kỳ tổn thất nào cả."
      },
      {
        "translation": "Khi tôi đến nơi này, mặt trời đã mọc lên sẵn rồi."
      }
    ]
  },
  "ko_아직_30": {
    "title": "아직 (Vẫn, chưa)",
    "shortExplanation": "Phó từ biểu thị hành động hoặc trạng thái vẫn đang tiếp diễn hoặc chưa hoàn thành tính đến thời điểm hiện tại; tương đương với 'vẫn', 'chưa'.",
    "longExplanation": "'아직' là phó từ rất phổ biến trong tiếng Hàn, dùng để chỉ một tình huống, trạng thái hoặc hành động vẫn duy trì liên tục và chưa có sự thay đổi tính đến hiện tại. Trong tiếng Việt, '아직' có thể dịch là 'vẫn' hoặc 'vẫn còn' khi đi với câu khẳng định (như '아직 하고 있다' - vẫn đang làm), và dịch là 'chưa' hoặc 'vẫn chưa' khi kết hợp với các cấu trúc phủ định (như '아직 안 했다', '아직 못 했다' - vẫn chưa làm).",
    "formation": "아직 + Động từ / Tính từ / Danh từ",
    "examples": [
      {
        "translation": "Tôi vẫn chưa thể hiểu tiếng Hàn một cách hoàn hảo. Tôi cần phải tiếp tục luyện tập."
      },
      {
        "translation": "Dù có thể tự mình quyết định, nhưng tôi vẫn đang suy nghĩ kỹ về vấn đề đó."
      },
      {
        "translation": "Tôi vẫn chưa xem bộ phim đó. Tôi dự định sẽ xem vào cuối tuần này."
      },
      {
        "translation": "Tôi vẫn chưa ăn trưa nữa. Bụng tôi đói cồn cào rồi."
      }
    ]
  },
  "ko_때_31": {
    "title": "때 (Khi, lúc, thời điểm)",
    "shortExplanation": "Danh từ / danh từ phụ thuộc chỉ thời gian hoặc khoảnh khắc xảy ra một hành động, trạng thái; tương đương với 'khi', 'lúc', 'hồi'.",
    "longExplanation": "'때' là từ chỉ thời điểm, thời khắc hoặc một khoảng thời gian cụ thể mà hành vi hay trạng thái diễn ra. Khi kết hợp với danh từ, '때' đứng ngay sau danh từ (như '방학 때' - lúc nghỉ hè, '식사 때' - lúc dùng bữa, '첫 만남 때' - lúc gặp nhau lần đầu). Khi kết hợp với động từ hoặc tính từ, nó đi kèm với định từ '-(으)ㄹ 때' để diễn tả 'khi làm gì' hoặc 'lúc như thế nào' (như '웃을 때' - khi cười, '시간이 없을 때' - khi không có thời gian).",
    "formation": "Danh từ + 때 / Thân động từ/tính từ + (으)ㄹ 때",
    "examples": [
      {
        "translation": "Tôi đã muốn học tiếng Hàn từ khi còn nhỏ."
      },
      {
        "translation": "Mỗi khi cô ấy mỉm cười, tôi cảm thấy thực sự hạnh phúc."
      },
      {
        "translation": "Tôi sẽ không bao giờ có thể quên được anh ấy vào lần đầu gặp gỡ."
      },
      {
        "translation": "Cuối tuần này tôi muốn đi du lịch, nhưng khi không có thời gian thì nên làm thế nào đây?"
      }
    ]
  },
  "ko_으려고하다euryeogohadaIntendtodo_32": {
    "title": "(으)려고 하다 (Định làm gì, dự định làm gì)",
    "shortExplanation": "Cấu trúc diễn tả ý định, dự định hoặc kế hoạch thực hiện một hành động trong tương lai của chủ ngữ; tương đương với 'định...', 'dự định...'.",
    "longExplanation": "'-(으)려고 하다' là cấu trúc biểu thị ý định, mục đích hoặc kế hoạch làm một việc gì đó của chủ ngữ trong tương lai gần. Cấu trúc này được tạo thành từ vĩ tố liên kết chỉ mục đích '-(으)려고' kết hợp với động từ '하다'. Nếu thân động từ kết thúc bằng phụ âm (có patchim, ngoại trừ 'ㄹ'), ta gắn '-으려고 하다'; nếu thân động từ kết thúc bằng nguyên âm hoặc patchim 'ㄹ', ta gắn '-려고 하다'. Ngoài ra, khi dùng với hiện tượng tự nhiên (như '비가 오려고 하다'), cấu trúc này còn biểu thị trạng thái sắp sửa xảy ra ('trời dường như sắp mưa').",
    "formation": "Thân động từ có patchim (trừ ㄹ) + 으려고 하다 / Thân động từ không có patchim hoặc có patchim ㄹ + 려고 하다",
    "examples": [
      {
        "translation": "Tôi định sẽ nỗ lực để giỏi tiếng Hàn hơn. Tôi dự định luyện tập thật nhiều để nâng cao năng lực."
      },
      {
        "translation": "Vì trời có vẻ sắp mưa nên tôi định mang theo ô. Tôi muốn phòng ngừa cảm cúm."
      },
      {
        "translation": "Tôi dự định đi du lịch cùng bạn bè. Chúng tôi muốn cùng nhau tạo nên những kỷ niệm thật đẹp."
      },
      {
        "translation": "Cô ấy định chuẩn bị cho đám cưới vào tháng sau. Cô ấy muốn mọi thứ đều phải thật hoàn hảo."
      }
    ]
  },
  "ko_처럼_33": {
    "title": "처럼 (Như, giống như)",
    "shortExplanation": "Trợ từ so sánh gắn sau danh từ để biểu thị hình dáng, đặc tính hoặc mức độ tương đồng; tương đương với 'như', 'giống như'.",
    "longExplanation": "'처럼' là trợ từ so sánh trong tiếng Hàn, được gắn trực tiếp vào sau danh từ mà không phân biệt danh từ đó có patchim hay không. Trợ từ này dùng để biểu thị đối tượng đứng trước là chuẩn mực so sánh, ngụ ý rằng hành động, trạng thái hoặc tính chất của chủ ngữ giống hệt hoặc tương tự như đối tượng đó ('như...', 'giống như...'). '처럼' thường xuyên xuất hiện trong các biện pháp so sánh tu từ, ví von hình tượng lẫn các cách diễn đạt thông dụng hằng ngày.",
    "formation": "Danh từ + 처럼",
    "examples": [
      {
        "translation": "Anh ấy trông dũng mãnh như một chú sư tử, nhưng thực tế thì không mạnh mẽ đến thế."
      },
      {
        "translation": "Người bạn của chúng tôi luôn tỏa sáng như một vì sao. Cậu ấy là người được tất cả mọi người yêu quý."
      },
      {
        "translation": "Cô ấy khiêu vũ uyển chuyển như một cánh bướm. Thật sự rất đẹp và tao nhã."
      },
      {
        "translation": "Anh ấy đã bay vút lên cao như một con chim đại bàng. Cú bay đó quả thực vô cùng ấn tượng."
      }
    ]
  },
  "ko_같이_34": {
    "title": "같이 (Cùng nhau / Giống như)",
    "shortExplanation": "Phó từ biểu thị sự cùng nhau thực hiện hành động, thường kết hợp với trợ từ '와/과' hoặc '(이)랑'; ngoài ra còn là trợ từ so sánh tương tự '처럼'.",
    "longExplanation": "'같이' vừa có chức năng là một phó từ vừa có chức năng là một trợ từ trong tiếng Hàn. Với vai trò phó từ biểu thị hành động chung ('cùng nhau'), '같이' thường đi sau cụm danh từ gắn trợ từ liên kết '-(와/과) 같이' hoặc '-(이)랑 같이' để nhấn mạnh việc cùng làm điều gì đó với người khác. Ngoài ra, khi gắn trực tiếp vào sau danh từ không có khoảng trắng, '같이' đóng vai trò là trợ từ so sánh tương đương với '처럼', mang ý nghĩa 'như', 'giống như'.",
    "formation": "Danh từ + 와/과/랑 같이 (Cùng với) / Danh từ + 같이 (Giống như)",
    "examples": [
      {
        "translation": "Tôi đã đi xem phim cùng với bạn của mình. Thật sự rất vui!"
      },
      {
        "translation": "Ngày mai tất cả chúng tôi đã quyết định sẽ cùng nhau ra công viên dã ngoại."
      },
      {
        "translation": "Nếu nấu ăn cùng mẹ, tôi luôn có thể làm ra những món ăn ngon hơn."
      },
      {
        "translation": "Học cùng gia sư mang lại cho tôi rất nhiều sự giúp ích."
      }
    ]
  },
  "ko_이랑irangWith_35": {
    "title": "(이)랑 (Với, cùng với, và)",
    "shortExplanation": "Trợ từ khẩu ngữ gắn sau danh từ dùng để liệt kê danh từ ('và') hoặc biểu thị đối tượng cùng thực hiện hành động ('với', 'cùng với').",
    "longExplanation": "'(이)랑' là trợ từ liên kết hoặc trợ từ cùng hành động rất thông dụng trong giao tiếp hằng ngày của người Hàn Quốc. Khi dùng để nối hai hay nhiều danh từ, nó mang nghĩa là 'và'. Khi đi cùng danh từ chỉ người hay động vật trong câu diễn tả hành động, nó biểu thị làm việc gì đó 'cùng với' đối tượng đó. Nếu danh từ kết thúc bằng phụ âm (có patchim), ta dùng '이랑'; nếu danh từ kết thúc bằng nguyên âm (không có patchim), ta dùng '랑'. So với '-(와/과)' mang tính văn viết, '(이)랑' mang sắc thái thân mật, tự nhiên trong khẩu ngữ.",
    "formation": "Danh từ có patchim + 이랑 / Danh từ không có patchim + 랑",
    "examples": [
      {
        "translation": "Tôi đã đi xem phim với bạn, bộ phim đó rất hay."
      },
      {
        "translation": "Hôm qua tôi đã cùng mẹ đi chợ, chúng tôi đã mua rất nhiều thực phẩm."
      },
      {
        "translation": "Tôi đã chơi ở công viên với em tôi, chúng tôi đã rất vui vẻ."
      },
      {
        "translation": "Vào giờ nghỉ trưa hôm nay tôi đã nghe nhạc cùng bạn, bài nhạc ấy hay tuyệt vời."
      }
    ]
  },
  "ko_그런데_36": {
    "title": "그런데 (Thế nhưng, nhưng mà, tuy nhiên / Nhân tiện)",
    "shortExplanation": "Phó từ liên kết dùng để diễn tả sự đối lập, nghịch cảm giữa hai câu ('thế nhưng', 'nhưng') hoặc dùng để chuyển đổi chủ đề nói chuyện ('nhân tiện').",
    "longExplanation": "'그런데' là phó từ liên kết rất phổ biến trong tiếng Hàn, thường đứng ở đầu câu thứ hai. Nó có hai vai trò chính: thứ nhất là diễn đạt sự chuyển tiếp tương phản, đối chiếu kết quả không ngờ so với tiền đề ở câu trước ('thế nhưng', 'tuy nhiên', 'nhưng mà'); thứ hai là dùng để chuyển hướng câu chuyện sang một chủ đề mới một cách tự nhiên ('nhân tiện', 'à này'). Trong khẩu ngữ, người Hàn đôi khi rút gọn '그런데' thành '근데'.",
    "formation": "Câu trước. 그런데 + Câu sau",
    "examples": [
      {
        "translation": "Ban đầu bài tập đó có vẻ dễ dàng, thế nhưng khi làm thực tế thì lại rất khó."
      },
      {
        "translation": "Môn thể thao tôi yêu thích nhất là bóng rổ, thế nhưng bạn tôi lại chẳng thích bóng rổ một chút nào."
      },
      {
        "translation": "Hôm qua tôi đã đến rạp chiếu phim, thế nhưng bộ phim đã bắt đầu mất rồi."
      },
      {
        "translation": "Bạn tôi đã giới thiệu chiếc quần jean này cho tôi, nhưng mà nó lại không hợp với phong cách của tôi."
      }
    ]
  },
  "ko_그래서_37": {
    "title": "그래서 (Vì vậy, cho nên, thế nên)",
    "shortExplanation": "Phó từ liên kết biểu thị quan hệ nguyên nhân - kết quả; câu trước nêu nguyên nhân, câu sau nêu kết quả dẫn tới; tương đương với 'vì vậy', 'cho nên'.",
    "longExplanation": "'그래서' là phó từ liên kết chỉ quan hệ nhân quả rất quen thuộc trong tiếng Hàn. Từ này đứng ở đầu câu sau để biểu thị rằng sự việc xảy ra ở câu sau là kết quả tất yếu, lý do hoặc hệ quả nảy sinh từ tình huống được nêu ở câu trước. Trong tiếng Việt, '그래서' có nghĩa là 'vì vậy', 'cho nên', 'thế nên' hoặc 'do đó'. Nó giúp liên kết hai phát ngôn rời nhau thành một mạch lập luận hoặc kể chuyện chặt chẽ.",
    "formation": "Câu trước (Nguyên nhân/Lý do). 그래서 + Câu sau (Kết quả)",
    "examples": [
      {
        "translation": "Hôm nay tôi định ăn uống đơn giản thôi, nhưng bạn tôi lại mang đồ ăn ngon đến. Vì vậy tôi đã ăn rất nhiều."
      },
      {
        "translation": "Tôi thích đọc sách. Cho nên mỗi tháng tôi đọc nhiều cuốn sách."
      },
      {
        "translation": "Hôm qua tôi đã học bài quá nhiều. Thế nên hôm nay tôi phải nghỉ ngơi thôi."
      },
      {
        "translation": "Cuối tuần tôi ngủ nướng tới muộn không dậy nổi. Vì thế mà loáng cái đã đến tận trưa rồi."
      }
    ]
  },
  "ko_그리고_38": {
    "title": "그리고 (Và, rồi thì, sau đó)",
    "shortExplanation": "Phó từ liên kết dùng để nối các câu hoặc hành động diễn ra liên tiếp hoặc liệt kê thông tin bổ sung; tương đương với 'và', 'rồi thì', 'sau đó'.",
    "longExplanation": "'그리고' là phó từ liên kết cơ bản nhất trong tiếng Hàn, dùng để kết nối hai hay nhiều sự việc. Nó có hai công năng chính: thứ nhất là liệt kê các sự vật, trạng thái hoặc thông tin song song bổ sung cho nhau ('và', 'cũng như'); thứ hai là diễn tả các hành động xảy ra nối tiếp nhau theo trình tự thời gian ('rồi thì', 'sau đó'). '그리고' có thể đứng ở đầu câu để nối câu mới với câu trước, hoặc dùng để liên kết các vế câu trong văn kể chuyện.",
    "formation": "Câu 1. 그리고 + Câu 2",
    "examples": [
      {
        "translation": "Tôi đã đến trường, rồi nghe giảng, rồi ăn trưa cùng bạn bè."
      },
      {
        "translation": "Tôi đã chơi trò chơi điện tử, rồi buồn ngủ nên đi ngủ, sau đó lại tiếp tục chơi tiếp."
      },
      {
        "translation": "Tôi đã uống một ly cà phê, rồi đến thư viện, sau đó ngồi học bài."
      },
      {
        "translation": "Tôi đã gặp bạn, rồi cùng xem phim, sau đó trở về nhà."
      }
    ]
  },
  "ko_아어여_39": {
    "title": "아/어/여 주다 (Làm cho, giúp cho...)",
    "shortExplanation": "Cấu trúc bổ trợ động từ gắn sau thân động từ để biểu thị hành động được thực hiện nhằm mang lại lợi ích hoặc giúp đỡ người khác; tương đương với 'làm... cho', 'làm... giúp'.",
    "longExplanation": "'-아/어/여 주다' là cấu trúc bổ trợ động từ rất quan trọng trong tiếng Hàn, biểu thị chủ ngữ thực hiện một hành động nào đó vì quyền lợi, sự giúp đỡ hoặc sự quan tâm hướng đến đối tượng khác ('làm giúp', 'làm cho'). Vĩ tố kết nối phụ thuộc vào nguyên âm của thân động từ: nếu kết thúc bằng 'ㅏ' hoặc 'ㅗ', dùng '-아 주다'; các nguyên âm khác dùng '-어 주다'; động từ chứa '하다' chuyển thành '해 주다'. Khi người nhận hành động là người bề trên hoặc cần tôn kính, '주다' được thay thế bằng dạng tôn kính là '드리다' ('-아/어/여 드리다'). Khi chủ thể là người bề trên làm cho mình, thường dùng '-아/어/여 주시다'.",
    "formation": "Thân động từ + 아/어/여 주다 (Tôn kính người nhận: 아/어/여 드리다 / Tôn kính người làm: 아/어/여 주시다)",
    "examples": [
      {
        "translation": "Tôi đã tổng hợp lại vở ghi bài giảng rồi gửi qua email cho bạn."
      },
      {
        "translation": "Sau khi thấy Seomin dọn dẹp, tôi cũng đã phụ giúp một tay dọn dẹp cùng."
      },
      {
        "translation": "Tôi đã rất trăn trở vì một câu hỏi khó, nhưng thầy giáo đã chỉ cho tôi phương pháp giải quyết."
      },
      {
        "translation": "Tôi rất thích nấu những món ngon rồi chuẩn bị bữa tối chu đáo cho bạn bè."
      }
    ]
  },
  "ko_아어여_40": {
    "title": "아/어/여 하다 (Biểu lộ cảm xúc, cảm thấy - Động từ hóa tính từ tâm lý)",
    "shortExplanation": "Cấu trúc gắn sau thân tính từ chỉ cảm xúc, tâm lý để biến tính từ thành động từ, diễn tả cảm xúc được bộc lộ ra bên ngoài (đặc biệt khi chủ ngữ là ngôi thứ ba).",
    "longExplanation": "'-아/어/여 하다' là cấu trúc ngữ pháp dùng để chuyển đổi tính từ chỉ cảm giác, tâm lý hoặc cảm xúc chủ quan (như '슬프다' - buồn, '무섭다' - sợ, '좋다' - tốt/thích, '부끄럽다' - ngượng ngùng) thành ngoại động từ biểu thị việc bộc lộ cảm xúc ra bên ngoài. Trong tiếng Hàn, người nói thường không thể trực tiếp khẳng định cảm xúc nội tâm của ngôi thứ ba bằng tính từ đơn thuần; do đó, bắt buộc phải dùng '-아/어/여 하다' để mô tả những gì quan sát thấy được từ phản ứng hay hành vi của đối tượng ngôi thứ ba.",
    "formation": "Thân tính từ cảm xúc/tâm lý + 아/어/여 하다",
    "examples": [
      {
        "translation": "Anh ấy thấy bộ phim quá buồn nên vừa khóc vừa tỏ ra đau buồn."
      },
      {
        "translation": "Đứa bé cảm thấy sợ hãi nên không thích ngủ một mình."
      },
      {
        "translation": "Cô ấy cảm thấy xấu hổ và ngượng ngùng nên đã ngập ngừng không dám bước ra trước đám đông."
      },
      {
        "translation": "Mọi người sau khi nghe tin tức đó đã vô cùng ngạc nhiên và sửng sốt."
      }
    ]
  },
  "ko_의_41": {
    "title": "의 (Của - Trợ từ sở hữu cách)",
    "shortExplanation": "Trợ từ định ngữ (sở hữu cách) gắn sau danh từ đi trước để bổ nghĩa cho danh từ đi sau, biểu thị quan hệ sở hữu, nguồn gốc hoặc thuộc tính; tương đương với 'của'.",
    "longExplanation": "'의' là trợ từ sở hữu cách (quan hình cách) trong tiếng Hàn, được gắn sau danh từ đứng trước để bổ nghĩa cho danh từ đứng sau, biểu thị mối quan hệ sở hữu, phụ thuộc, quan hệ gia đình hoặc tính chất đặc trưng ('của...'). Dù viết là '의', khi đóng vai trò là trợ từ sở hữu nó thường được phát âm tự nhiên là [에]. Trong khẩu ngữ hằng ngày, '의' thường được lược bỏ nếu ngữ cảnh đã rõ ràng, hoặc kết hợp với đại từ nhân xưng như: '나의' chuyển thành '내', '저의' chuyển thành '제', '너의' chuyển thành '네' (phát âm là [니]).",
    "formation": "Danh từ đứng trước + 의 + Danh từ đứng sau",
    "examples": [
      {
        "translation": "Đây là cuốn sách của tôi, vì vậy tôi sẽ không đưa cho bất kỳ ai đâu."
      },
      {
        "translation": "Làm ơn, xin đừng chiếm chỗ đậu xe của tôi."
      },
      {
        "translation": "Cô ấy thật sự vô cùng yêu thương chú cún con của mình."
      },
      {
        "translation": "Đây là chiếc đồng hồ đeo tay cũ của bố anh ấy."
      }
    ]
  },
  "ko_으로euroTotowardbymeansof_42": {
    "title": "(으)로 (Hướng về, bằng, bằng cách, thành)",
    "shortExplanation": "Trợ từ phó từ cách đa nghĩa biểu thị phương tiện, công cụ ('bằng'), phương hướng chuyển động ('về phía'), nguyên liệu, hoặc sự biến đổi ('thành').",
    "longExplanation": "'(으)로' là trợ từ phó từ cách có phạm vi sử dụng rất phong phú trong tiếng Hàn. Các công năng tiêu biểu bao gồm: (1) Biểu thị phương tiện, công cụ, cách thức thực hiện hành động ('bằng xe buýt', 'bằng tiếng Hàn'); (2) Biểu thị phương hướng di chuyển ('về phía trước', 'hướng đến Seoul'); (3) Biểu thị nguyên liệu, chất liệu cấu thành; (4) Biểu thị sự biến đổi trạng thái hoặc tư cách, vai trò ('trở thành', 'với tư cách là'). Nếu danh từ kết thúc bằng phụ âm (ngoại trừ 'ㄹ'), ta dùng '으로'; nếu danh từ kết thúc bằng nguyên âm hoặc phụ âm 'ㄹ', ta dùng '로'.",
    "formation": "Danh từ có patchim (trừ ㄹ) + 으로 / Danh từ không có patchim hoặc có patchim ㄹ + 로",
    "examples": [
      {
        "translation": "Tôi đến trường bằng tàu điện ngầm vào mỗi buổi sáng."
      },
      {
        "translation": "Bố tôi thể hiện tình yêu thương thông qua các nguyên liệu nấu ăn."
      },
      {
        "translation": "Công ty đó tái chế giấy để sản xuất thành những cuốn sổ tay."
      },
      {
        "translation": "Để mở cửa, tôi tra chìa khóa vào rồi vặn ổ khóa."
      }
    ]
  },
  "ko_한테에게_43": {
    "title": "한테/에게 (Cho, với, tới... [Tiểu từ đối tượng tiếp nhận])",
    "shortExplanation": "Trợ từ chỉ đối tượng hữu tình (người, động vật) tiếp nhận hành động; '에게' mang tính văn viết/chuẩn tắc, '한테' mang tính khẩu ngữ; tương đương với 'cho', 'với', 'tới'.",
    "longExplanation": "'한테/에게' là trợ từ chỉ đối tượng hướng đến hoặc người tiếp nhận hành động (dữ cách) trong tiếng Hàn. Trợ từ này chỉ được gắn sau danh từ chỉ người hoặc động vật (danh từ hữu tình). '에게' được dùng phổ biến trong cả văn viết, tình huống trang trọng lẫn khẩu ngữ, trong khi '한테' chủ yếu được ưa chuộng trong văn nói giao tiếp hằng ngày. Khi đối tượng tiếp nhận là người lớn tuổi hoặc nhân vật cần tôn kính (như ông bà, cha mẹ, thầy cô), người Hàn thay thế '한테/에게' bằng trợ từ kính ngữ '께'.",
    "formation": "Danh từ chỉ người/động vật + 한테 (khẩu ngữ) / 에게 (thông dụng, văn viết) (Tôn kính: 께)",
    "examples": [
      {
        "translation": "Hôm qua tôi đã tặng một món quà cho bạn mình."
      },
      {
        "translation": "Tôi muốn trực tiếp cất tiếng cho cô ấy nghe thấy giọng của mình."
      },
      {
        "translation": "Em muốn báo tin vui này cho chị gái biết."
      },
      {
        "translation": "Tôi đã nấu nướng chuẩn bị bữa tối chu đáo cho mẹ."
      }
    ]
  },
  "ko_한테서에서_44": {
    "title": "한테서/에서 (Từ ai đó / Từ nơi nào đó - Trợ từ chỉ xuất xứ, điểm xuất phát)",
    "shortExplanation": "Trợ từ chỉ xuất xứ, nguồn gốc hoặc điểm xuất phát; '한테서' dùng cho người/động vật, '에서' dùng cho địa điểm, cơ quan, tổ chức; tương đương với 'từ'.",
    "longExplanation": "'한테서' và '에서' là hai trợ từ biểu thị điểm khởi đầu, nguồn gốc hoặc xuất xứ của hành động hay sự vật trong tiếng Hàn. Điểm khác biệt mấu chốt nằm ở loại danh từ đi kèm: '한테서' (hoặc dạng chuẩn/trang trọng hơn là '에게서') được gắn sau danh từ chỉ người hoặc động vật (danh từ hữu tình) để biểu thị nhận được cái gì từ ai đó ('từ bạn bè', 'từ mẹ'); trong khi '에서' được gắn sau danh từ chỉ địa điểm, nơi chốn hoặc tổ chức, cơ quan ('từ thư viện', 'từ Seoul'). Khi đối tượng xuất phát là người bề trên cần tôn kính, người Hàn dùng '께로부터' hoặc '에게서'.",
    "formation": "Danh từ chỉ người + 한테서 / Danh từ chỉ nơi chốn/tổ chức + 에서 (Chuẩn trang trọng cho người: 에게서 / Kính ngữ: 께로부터)",
    "examples": [
      {
        "translation": "Tôi đã nhận được thư từ một người bạn. Cậu ấy luôn giữ liên lạc rất đều đặn."
      },
      {
        "translation": "Đi ô tô từ Seoul đến Busan mất khoảng bao lâu nhỉ?"
      },
      {
        "translation": "Tôi đã mượn cuốn sách này từ thư viện."
      },
      {
        "translation": "Món ăn đó tôi đã học được từ mẹ của mình."
      }
    ]
  },
  "ko_보다_45": {
    "title": "보다 (Trợ từ so sánh: hơn, so với)",
    "shortExplanation": "Trợ từ so sánh gắn sau danh từ làm chuẩn so sánh, mang nghĩa 'so với', 'hơn'.",
    "longExplanation": "'보다' là trợ từ so sánh trong tiếng Hàn, được gắn trực tiếp vào sau danh từ đóng vai trò là mốc chuẩn so sánh. Danh từ đứng trước '보다' chính là đối tượng bị so sánh ('so với...'), còn đối tượng đứng ở vế khác trong câu là đối tượng có mức độ cao hơn (hoặc thấp hơn). Đi kèm phía sau thường có phó từ '더' (hơn) hoặc '덜' (kém hơn) để bổ nghĩa cho tính từ hoặc động từ.",
    "formation": "Danh từ (tiêu chuẩn so sánh) + 보다 (더/덜) + Tính từ / Động từ",
    "examples": [
      {
        "translation": "Tôi thích trà hơn cà phê. Trà hợp khẩu vị của tôi hơn."
      },
      {
        "translation": "Nhà chúng tôi có nhiều sách hơn cả thư viện. Vì cả gia đình đều thích đọc sách nên mới như vậy đấy."
      },
      {
        "translation": "Học tiếng Hàn dễ hơn học tiếng Trung. Bởi vì chữ viết và phát âm đơn giản hơn."
      },
      {
        "translation": "Bây giờ là mùa hè nhưng thời tiết lại lạnh hơn mùa xuân. Có vẻ là do biến đổi khí hậu kỳ lạ."
      }
    ]
  },
  "ko_가장_46": {
    "title": "가장 (Phó từ so sánh nhất: nhất)",
    "shortExplanation": "Phó từ biểu thị mức độ cao nhất trong số nhiều đối tượng, tương đương với 'nhất'.",
    "longExplanation": "'가장' là phó từ chỉ mức độ cao nhất (so sánh nhất) trong tiếng Hàn, tương đương với 'nhất' trong tiếng Việt. Nó đứng trước tính từ, phó từ hoặc động từ để nhấn mạnh rằng trạng thái, đặc điểm hoặc hành động đạt đến tột cùng, không có đối tượng nào khác vượt qua được. Từ đồng nghĩa thường gặp là '제일' (chữ Hán 'đệ nhất').",
    "formation": "가장 + Tính từ / Phó từ / Động từ",
    "examples": [
      {
        "translation": "Tôi muốn kết hôn với người mà tôi yêu thương nhất."
      },
      {
        "translation": "Người đến nơi sớm nhất sẽ có thể nhận được phần thưởng."
      },
      {
        "translation": "Anh ấy đã không từ bỏ ngay cả trong khoảng thời gian khó khăn nhất."
      },
      {
        "translation": "Tôi muốn thực hiện được ước mơ lớn nhất của đời mình."
      }
    ]
  },
  "ko_도_47": {
    "title": "도 (Trợ từ: cũng, cả, ngay cả)",
    "shortExplanation": "Trợ từ bổ trợ gắn sau danh từ biểu thị sự bao hàm, tương đồng ('cũng') hoặc nhấn mạnh mức độ ('cả', 'ngay cả').",
    "longExplanation": "'도' là trợ từ bổ trợ (phụ trợ từ) rất phổ biến trong tiếng Hàn. Khi gắn sau danh từ, đại từ hay trạng từ, nó mang ý nghĩa bổ sung thêm một đối tượng khác có cùng tính chất hoặc hành động ('cũng'). Ngoài ra, '도' còn dùng để nhấn mạnh mức độ tột cùng hoặc sự việc vượt ngoài mong đợi, tương đương với 'cả', 'đến cả', 'ngay cả' trong tiếng Việt. Khi kết hợp với danh từ làm chủ ngữ hoặc tân ngữ, '도' sẽ thay thế hoàn toàn cho '이/가' hoặc '을/를'.",
    "formation": "Danh từ / Đại từ / Phó từ + 도",
    "examples": [
      {
        "translation": "Tôi nói giỏi tiếng Hàn, và tiếng Nhật tôi cũng nói giỏi nữa."
      },
      {
        "translation": "Anh ấy không những đẹp trai mà tính cách cũng rất tốt."
      },
      {
        "translation": "Nhà hàng này đồ ăn cũng ngon mà không khí cũng rất tuyệt."
      },
      {
        "translation": "Hôm qua khi tôi về đến nhà thì đã hơn cả 12 giờ đêm rồi."
      }
    ]
  },
  "ko_이그저_48": {
    "title": "이/그/저 (Từ chỉ định: này / đó / kia)",
    "shortExplanation": "Định từ chỉ định đặt trước danh từ để xác định vị trí không gian: 'này' (gần người nói), 'đó' (gần người nghe), 'kia' (xa cả hai).",
    "longExplanation": "'이', '그', '저' là các định từ (chỉ thị từ) đứng trực tiếp trước danh từ để chỉ định đối tượng dựa trên cự ly không gian hoặc ngữ cảnh giao tiếp:\n- '이' (này): chỉ đối tượng ở cự ly gần người nói.\n- '그' (đó): chỉ đối tượng ở gần người nghe, hoặc đối tượng vừa được nhắc đến trong đoạn hội thoại.\n- '저' (kia): chỉ đối tượng ở khoảng cách xa cả người nói lẫn người nghe nhưng vẫn có thể quan sát thấy.\nKhi kết hợp với danh từ phụ thuộc '것' (cái/thứ), chúng biến thành các đại từ chỉ vật: '이것' (cái này), '그것' (cái đó), '저것' (cái kia).",
    "formation": "이 / 그 / 저 + Danh từ",
    "examples": [
      {
        "translation": "Cây bút này là của tôi. Cây bút đó là của bạn. Cây bút đằng kia thì tôi không biết là của ai."
      },
      {
        "translation": "Chiếc điện thoại này có nhiều lỗi quá. Chiếc điện thoại đó hiệu năng tốt thật. Chiếc điện thoại đằng kia thì tôi không biết là dòng máy nào."
      },
      {
        "translation": "Món ăn này không ngon. Món ăn đó thì cay. Món ăn đằng kia thì tôi không biết mùi vị thế nào."
      },
      {
        "translation": "Cuốn sách này thú vị lắm. Cuốn sách đó thì quá khó hiểu. Cuốn sách đằng kia thì tôi không biết nội dung là gì."
      }
    ]
  },
  "ko_이나inaOr_49": {
    "title": "(이)나 (Trợ từ lựa chọn: hoặc, hay là)",
    "shortExplanation": "Trợ từ gắn sau danh từ biểu thị sự lựa chọn giữa hai hay nhiều đối tượng, tương đương với 'hoặc', 'hay là'.",
    "longExplanation": "'(이)나' là trợ từ chỉ sự lựa chọn trong tiếng Hàn, được gắn vào sau danh từ để liệt kê các phương án thay thế, mang nghĩa 'hoặc', 'hay là'. Nếu danh từ có patchim ta dùng '이나', nếu không có patchim ta dùng '나'. Lưu ý: Khi liên kết hai động từ hoặc tính từ, ta dùng vĩ tố liên kết '-거나' thay vì '(이)나'. Ngoài nghĩa lựa chọn, '(이)나' còn có thể biểu thị sự bất ngờ trước số lượng lớn ('tận', 'đến tận') hoặc sự chọn lựa mang tính thỏa hiệp ('đành... vậy').",
    "formation": "Danh từ có patchim + 이나 / Danh từ không có patchim + 나 (Với động từ dùng: Thân động từ + 거나)",
    "examples": [
      {
        "translation": "Bạn muốn ăn gì trong số pizza hay hamburger?"
      },
      {
        "translation": "Vào cuối tuần, tôi sẽ đi xem phim cùng bạn bè hoặc đi mua sắm."
      },
      {
        "translation": "Tôi phải làm các công việc nhà như giặt giũ hoặc rửa bát đĩa."
      },
      {
        "translation": "Tối nay tôi sẽ làm bài tập về nhà hoặc đọc sách."
      }
    ]
  },
  "ko_밖에_50": {
    "title": "밖에 (Trợ từ giới hạn phủ định: chỉ, ngoài... ra thì không)",
    "shortExplanation": "Trợ từ gắn sau danh từ, luôn đi kèm đuôi câu phủ định để biểu thị nghĩa 'chỉ', 'ngoài ra không còn lựa chọn nào khác'.",
    "longExplanation": "'밖에' là trợ từ giới hạn trong tiếng Hàn, được gắn sau danh từ và BẮT BUỘC phải đi kèm với hình thức phủ định ở vế sau (như '안', '못', '없다', '모르다'). Cấu trúc này biểu thị nghĩa 'chỉ', 'ngoài đối tượng này ra thì không còn cái nào khác' hoặc 'không còn cách nào khác ngoài việc...'. Khi kết hợp với cấu trúc '(으)ㄹ 수밖에 없다', nó mang ý nghĩa tất yếu: 'chỉ còn cách là...', 'không thể không...'.",
    "formation": "Danh từ + 밖에 + Động từ phủ định (안 / 못 / 없다 / 모르다)",
    "examples": [
      {
        "translation": "Cuối tuần này tôi chỉ đành ở nhà thôi, bởi vì tất cả bạn bè đều bận cả rồi."
      },
      {
        "translation": "Mẹ tôi chỉ biết nấu ăn trong bếp chứ không giỏi làm những việc khác."
      },
      {
        "translation": "Tôi chỉ biết mỗi tiếng Hàn nên rất khó để trò chuyện bằng các ngôn ngữ khác."
      },
      {
        "translation": "Cậu học sinh đó chỉ biết mỗi việc học nên không giỏi vui chơi hay làm những việc khác."
      }
    ]
  },
  "ko_뿐_51": {
    "title": "뿐 (Trợ từ / Danh từ phụ thuộc: chỉ, duy nhất)",
    "shortExplanation": "Dùng để biểu thị sự giới hạn duy nhất, mang nghĩa 'chỉ', 'chỉ duy nhất là'.",
    "longExplanation": "'뿐' có thể hoạt động như một trợ từ (gắn sau danh từ) hoặc một danh từ phụ thuộc (đứng sau vĩ tố định ngữ '-(으)ㄹ'). Nó diễn tả ý nghĩa 'chỉ', 'chỉ duy nhất', xác nhận rằng không có thêm bất cứ thứ gì khác ngoài điều đã nêu. Khác với '밖에' (bắt buộc phải đi với phủ định), '뿐' có thể kết hợp với đuôi khẳng định như '이다' (ví dụ: '너뿐이다' - chỉ có em). Ngoài ra, cấu trúc '뿐만 아니라' mang ý nghĩa 'không những... mà còn'.",
    "formation": "Danh từ + 뿐(이다) / Thân động từ/tính từ + -(으)ㄹ 뿐이다",
    "examples": [
      {
        "translation": "Nhà chúng tôi chỉ có hai con mèo thôi. Không có con thú cưng nào khác cả."
      },
      {
        "translation": "Vào cuối tuần tôi chỉ nghỉ ngơi ở nhà thôi, chứ không có lịch trình gì đặc biệt."
      },
      {
        "translation": "Tôi không những thích cà phê mà còn thích cả trà nữa."
      },
      {
        "translation": "Điều tôi có thể làm chỉ có chừng này thôi. Tôi đã cố gắng hết sức rồi."
      }
    ]
  },
  "ko_는은_52": {
    "title": "-는/-(으)ㄴ 것 (Danh từ hóa động từ / tính từ)",
    "shortExplanation": "Cấu trúc định ngữ kết hợp với danh từ phụ thuộc '것' để biến động từ hoặc tính từ thành cụm danh từ ('việc...', 'điều...').",
    "longExplanation": "Cấu trúc '-는 것' (cho động từ ở thì hiện tại) hoặc '-(으)ㄴ 것' (cho tính từ hoặc động từ thì quá khứ) là phương thức danh từ hóa phổ biến nhất trong tiếng Hàn. Bằng cách gắn vĩ tố định ngữ vào thân động từ/tính từ rồi đi kèm với danh từ phụ thuộc '것' (cái, điều, việc), cả cụm mệnh đề sẽ trở thành một cụm danh từ hoàn chỉnh. Cụm danh từ này có thể làm chủ ngữ ('-는 것은/이'), tân ngữ ('-는 것을') hoặc vị ngữ ('-는 것이다/거예요') trong câu.",
    "formation": "Thân động từ + 는 것 / Thân tính từ + -(으)ㄴ 것",
    "examples": [
      {
        "translation": "Tôi không hiểu tại sao việc xem phim lại thú vị đến như thế."
      },
      {
        "translation": "Việc sống ở đất nước chúng tôi thực sự rất thú vị."
      },
      {
        "translation": "Điều quan trọng nhất chính là sự thành thật."
      },
      {
        "translation": "Đối với tôi việc học tiếng Hàn rất khó khăn, nhưng tôi vẫn muốn tiếp tục luyện tập."
      }
    ]
  },
  "ko_으는것같다eunneungeotgatdaItseemslike_53": {
    "title": "-(으)ㄴ/는 것 같다 (Dường như, có vẻ như, hình như)",
    "shortExplanation": "Cấu trúc phỏng đoán hoặc bày tỏ nhận xét, ý kiến một cách tế nhị, gián tiếp ('có vẻ như', 'dường như').",
    "longExplanation": "'-(으)ㄴ/는 것 같다' là cấu trúc biểu đạt sự phỏng đoán dựa trên cảm giác hoặc quan sát của người nói, tương đương với 'hình như', 'có vẻ như', 'dường như'. Ngoài ra, người Hàn Quốc còn rất thường xuyên sử dụng cấu trúc này để diễn đạt suy nghĩ, quan điểm của bản thân một cách khiêm tốn, nhẹ nhàng và tế nhị, tránh việc khẳng định quá dứt khoát. Cách kết hợp: Động từ thì hiện tại dùng '-는 것 같다'; Tính từ dùng '-(으)ㄴ 것 같다'; Động từ thì quá khứ dùng '-(으)ㄴ 것 같다'; Tương lai hoặc phỏng đoán tương lai dùng '-(으)ㄹ 것 같다'.",
    "formation": "Động từ hiện tại + 는 것 같다 / Tính từ + -(으)ㄴ 것 같다 / Động từ quá khứ + -(으)ㄴ 것 같다 / Thì tương lai + -(으)ㄹ 것 같다",
    "examples": [
      {
        "translation": "Tôi cứ ngỡ là trời lạnh, nhưng bên ngoài có vẻ ấm áp."
      },
      {
        "translation": "Người phụ nữ đó dường như rất tử tế, vì cô ấy luôn đối đãi với mọi người xung quanh bằng gương mặt tươi cười."
      },
      {
        "translation": "Tôi nghĩ nhân vật chính rốt cuộc sẽ thành công, bởi vì anh ấy nỗ lực hết mình để vượt qua mọi khó khăn."
      },
      {
        "translation": "Kỳ thi lần này có vẻ sẽ khó đấy, bởi vì nội dung đã học rất phức tạp."
      }
    ]
  },
  "ko_으러가다오다eureogadaodaGocometodosomething_54": {
    "title": "-(으)러 가다/오다 (Đi / đến để làm gì)",
    "shortExplanation": "Vĩ tố liên kết chỉ mục đích của hành động di chuyển (đi hoặc đến để làm việc gì).",
    "longExplanation": "'-(으)러 가다/오다' là cấu trúc biểu thị mục đích của việc di chuyển đến một địa điểm nào đó, tương đương với 'đi/đến để làm...'. Sau vĩ tố '-(으)러' bắt buộc phải là các động từ chuyển động như '가다' (đi), '오다' (đến), '다니다' (đi lại thường xuyên), hoặc các động từ phái sinh mang tính di chuyển. Thân động từ kết thúc bằng phụ âm (có patchim) kết hợp với '-으러'; thân động từ kết thúc bằng nguyên âm hoặc phụ âm 'ㄹ' kết hợp với '-러'.",
    "formation": "Thân động từ có patchim + 으러 가다/오다 / Thân động từ không có patchim hoặc có patchim 'ㄹ' + 러 가다/오다",
    "examples": [
      {
        "translation": "Tôi đã đến trường để gặp bạn."
      },
      {
        "translation": "Ngày mai tôi dự định về quê để thăm bố mẹ."
      },
      {
        "translation": "Cô ấy đã đến trung tâm thương mại để mua giày mới."
      },
      {
        "translation": "Tôi đã đến thư viện để chuẩn bị cho bài phát biểu."
      }
    ]
  },
  "ko_아어여도_55": {
    "title": "-아/어/여도 (Dù... cũng, cho dù... vẫn)",
    "shortExplanation": "Vĩ tố liên kết nhượng bộ biểu thị rằng dù điều kiện ở vế trước có xảy ra thì kết quả ở vế sau vẫn diễn ra.",
    "longExplanation": "'-아/어/여도' là vĩ tố liên kết chỉ sự nhượng bộ hoặc giả thiết nghịch cảnh trong tiếng Hàn, tương đương với 'dù... cũng', 'cho dù... vẫn' trong tiếng Việt. Nó diễn tả rằng cho dù hành động hay trạng thái ở mệnh đề trước có xảy ra đi chăng nữa, thì nó cũng không hề làm thay đổi, cản trở hay ảnh hưởng đến kết quả của hành động ở mệnh đề sau. Kết hợp theo quy tắc nguyên âm: Thân động từ/tính từ có nguyên âm 'ㅏ', 'ㅗ' gắn '-아도'; các nguyên âm còn lại gắn '-어도'; động từ kết thúc bằng '하다' chuyển thành '해도'.",
    "formation": "Thân động/tính từ có nguyên âm 'ㅏ, ㅗ' + 아도 / Thân động/tính từ có nguyên âm khác + 어도 / Thân động/tính từ chứa '하다' -> 해도",
    "examples": [
      {
        "translation": "Dù trời mưa tôi vẫn phải đến trường, bởi vì có bài thi mà."
      },
      {
        "translation": "Cho dù bạn có đến muộn thì tôi vẫn sẽ đợi, vì chúng tôi là bạn thân lâu năm mà."
      },
      {
        "translation": "Dù bị cảm nặng tôi vẫn phải đá bóng, bởi vì tôi không muốn làm các đồng đội phải thất vọng."
      },
      {
        "translation": "Dù thời tiết có trở lạnh thì tôi vẫn sẽ tiếp tục đi dạo. Đó là cách giải tỏa căng thẳng tuyệt vời nhất."
      }
    ]
  },
  "ko_계속_56": {
    "title": "계속 (Phó từ: tiếp tục, liên tục, cứ)",
    "shortExplanation": "Phó từ biểu thị một hành động hoặc trạng thái diễn ra không ngừng nghỉ, kéo dài liên tục.",
    "longExplanation": "'계속' là phó từ mang ý nghĩa 'liên tục', 'tiếp tục', 'cứ thế' trong tiếng Hàn. Nó đứng trước động từ hoặc tính từ để chỉ một hành động không hề gián đoạn, hoặc một trạng thái được duy trì liên tục qua thời gian. Ngoài ra, '계속' còn là một danh từ khi kết hợp với '하다' tạo thành động từ '계속하다' (tiếp tục làm gì) hoặc với '되다' tạo thành '계속되다' (được tiếp diễn).",
    "formation": "계속 + Động từ / Tính từ",
    "examples": [
      {
        "translation": "Cậu ấy cứ học tập liên tục nên tôi nghĩ cậu ấy sẽ làm bài thi tốt thôi."
      },
      {
        "translation": "Vì tâm trạng vui vẻ nên tôi cứ cười suốt."
      },
      {
        "translation": "Trời vẫn cứ mưa liên tục nên có lẽ bạn nên mang theo ô."
      },
      {
        "translation": "Cô ấy liên tục chăm sóc sức khỏe của mình, vì vậy xác suất bị ốm là rất thấp."
      }
    ]
  },
  "ko_항상_57": {
    "title": "항상 (Phó từ tần suất: luôn luôn, lúc nào cũng)",
    "shortExplanation": "Phó từ biểu thị sự việc xảy ra đều đặn ở mọi thời điểm, không có ngoại lệ, tương đương với 'luôn luôn'.",
    "longExplanation": "'항상' (Hán-Hàn: 'Hằng thường') là phó từ chỉ tần suất tuyệt đối trong tiếng Hàn, tương đương với 'luôn luôn', 'lúc nào cũng' trong tiếng Việt. Nó chỉ thói quen, hành vi hoặc quy luật lặp đi lặp lại một cách ổn định, không thay đổi theo thời gian. Các từ đồng nghĩa thường gặp gồm có '늘', '언제나'.",
    "formation": "항상 + Động từ / Tính từ",
    "examples": [
      {
        "translation": "Tôi luôn luôn thức dậy sớm vào buổi sáng rồi đến trường."
      },
      {
        "translation": "Mẹ tôi lúc nào cũng nghe radio trong khi chuẩn bị bữa tối."
      },
      {
        "translation": "Anh ấy luôn luôn lập kế hoạch học tập tỉ mỉ và tuân theo đúng như vậy."
      },
      {
        "translation": "Ở công viên lúc nào cũng có những chú chim đang hót líu lo."
      }
    ]
  },
  "ko_으때eulttaeWhen_58": {
    "title": "-(으)ㄹ 때 (Khi, vào lúc, trong lúc)",
    "shortExplanation": "Cấu trúc định ngữ kết hợp danh từ phụ thuộc '때' để chỉ thời điểm diễn ra hành động hoặc trạng thái ('khi...').",
    "longExplanation": "'-(으)ㄹ 때' là cấu trúc biểu thị thời điểm hoặc khoảng thời gian mà một hành động, trạng thái nào đó xảy ra, tương đương với 'khi', 'vào lúc', 'trong khi' trong tiếng Việt. Nó liên kết mệnh đề thời gian với mệnh đề chính. Cách kết hợp: Thân động từ hoặc tính từ kết thúc bằng phụ âm (có patchim) kết hợp với '-을 때'; kết thúc bằng nguyên âm hoặc phụ âm 'ㄹ' kết hợp với '-ㄹ 때'. Nếu danh từ chỉ thời gian thì dùng trực tiếp danh từ + '때' (ví dụ: '방학 때' - lúc nghỉ hè).",
    "formation": "Thân động/tính từ có patchim + 을 때 / Thân động/tính từ không có patchim hoặc có patchim 'ㄹ' + ㄹ 때 (Với danh từ: Danh từ + 때)",
    "examples": [
      {
        "translation": "Vào mùa hè, khi ngắm biển từ nhà chúng tôi mà mở cửa sổ ra thì gió biển mát rượi ùa vào."
      },
      {
        "translation": "Khi đến trường, nếu đi xe buýt thì rất tiện lợi."
      },
      {
        "translation": "Khi làm bài tập về nhà, nếu nghe nhạc thì tôi có thể tập trung hơn."
      },
      {
        "translation": "Khi gặp gỡ bạn bè, nếu cùng nhau ăn uống thì sẽ vui hơn nhiều."
      }
    ]
  },
  "ko_아어여야_59": {
    "title": "-아/어/여야 (하다/되다) (Phải... mới được, chỉ khi... mới...)",
    "shortExplanation": "Vĩ tố biểu thị điều kiện bắt buộc hoặc nghĩa vụ tất yếu phải thực hiện ('phải', 'chỉ khi... mới...').",
    "longExplanation": "'-아/어/여야' là vĩ tố liên kết biểu thị điều kiện tiên quyết bắt buộc phải đạt được để vế sau có thể xảy ra ('chỉ khi... mới...'). Khi kết hợp với trợ động từ '하다' hoặc '되다' tạo thành '-아/어/여야 하다/되다', nó trở thành cấu trúc quen thuộc biểu thị nghĩa vụ, bổn phận hoặc sự cần thiết tất yếu ('phải làm gì đó'). Quy tắc kết hợp: Thân động/tính từ có nguyên âm 'ㅏ, ㅗ' kết hợp với '-아야'; các nguyên âm khác kết hợp với '-어야'; động từ chứa '하다' chuyển thành '해야'.",
    "formation": "Thân động/tính từ có nguyên âm 'ㅏ, ㅗ' + 아야 하다/되다 / Thân động/tính từ có nguyên âm khác + 어야 하다/되다 / Thân động/tính từ chứa '하다' -> 해야 하다/되다",
    "examples": [
      {
        "translation": "Nếu muốn đi bệnh viện thì phải khám sức khỏe trước đã. Có như vậy mới yên tâm học tập được chứ."
      },
      {
        "translation": "Muốn tăng doanh thu tháng này thì phải thu hút thêm nhiều khách hàng hơn nữa. Như thế thì lợi nhuận mới tăng lên."
      },
      {
        "translation": "Trước khi đến trường nhất định phải ăn bữa sáng. Có như vậy mới duy trì được năng lượng suốt cả ngày."
      },
      {
        "translation": "Vì ngày mai có bài thi nên tối nay tôi phải học bài. Nếu không thì điểm số sẽ kém mất."
      }
    ]
  },
  "ko_으면서eumyeonseoWhileand_60": {
    "title": "(으)면서 (Vĩ tố liên kết: vừa... vừa..., trong khi)",
    "shortExplanation": "Vĩ tố liên kết biểu thị hai hành động hoặc trạng thái diễn ra đồng thời cùng một lúc ('vừa... vừa...').",
    "longExplanation": "'(으)면서' là vĩ tố liên kết dùng để nối hai mệnh đề, biểu thị chủ ngữ thực hiện hai hành động cùng một lúc hoặc hai trạng thái cùng tồn tại đồng thời ('vừa... vừa...'). Khi thân động từ kết thúc bằng phụ âm (ngoại trừ 'ㄹ') thì kết hợp với '-으면서', khi kết thúc bằng nguyên âm hoặc phụ âm 'ㄹ' thì kết hợp với '-면서'. Lưu ý chủ ngữ của cả hai vế trước và sau phải là cùng một đối tượng.",
    "formation": "Thân động từ có phụ âm cuối + 으면서 / Thân động từ không có phụ âm cuối (hoặc phụ âm cuối ㄹ) + 면서",
    "examples": [
      {
        "translation": "Tôi vừa xem ti vi vừa ăn cơm, vì thế đã không thể trò chuyện được."
      },
      {
        "translation": "Cô ấy đang vừa nghe nhạc vừa đọc sách trên xe buýt."
      },
      {
        "translation": "Dạo này em tôi vừa học ở trường vừa đi làm thêm nữa."
      },
      {
        "translation": "Tôi vừa nghe podcast vừa ghi chép từ vựng mới để nâng cao kỹ năng nghe."
      }
    ]
  },
  "ko_다가_61": {
    "title": "다가 (Vĩ tố liên kết: đang... thì, rồi lại)",
    "shortExplanation": "Vĩ tố liên kết biểu thị một hành động hoặc trạng thái đang diễn ra thì bị ngắt quãng và chuyển sang hành động hoặc trạng thái khác.",
    "longExplanation": "'다가' là vĩ tố liên kết diễn tả hành động ở mệnh đề trước đang diễn ra thì bị gián đoạn và một hành động khác xen vào hoặc tiếp nối ngay sau đó ('đang làm... thì...'). Hai vế câu thông thường phải có cùng một chủ ngữ. Cấu trúc này cũng có thể dùng khi hai trạng thái hoặc hành động đối lập luân phiên diễn ra.",
    "formation": "Thân động từ / Thân tính từ + 다가",
    "examples": [
      {
        "translation": "Tôi đang đọc sách thì buồn ngủ nên đã ngủ thiếp đi."
      },
      {
        "translation": "Tôi đến nhà hàng và đang ăn cơm thì gặp bạn."
      },
      {
        "translation": "Tôi đang nghe nhạc thì bỗng nhiên có điện thoại gọi đến."
      },
      {
        "translation": "Tôi đang học bài thì máy tính đột ngột tắt ngúm làm tôi giật cả mình."
      }
    ]
  },
  "ko_아어여_62": {
    "title": "아/어/여 보이다 (Trông có vẻ, dường như)",
    "shortExplanation": "Cấu trúc gắn sau tính từ biểu thị phỏng đoán hoặc nhận xét vẻ bề ngoài của đối tượng dựa trên quan sát ('trông có vẻ...').",
    "longExplanation": "'아/어/여 보이다' được dùng khi người nói đưa ra nhận định hoặc phán đoán về tính chất, trạng thái, cảm xúc của ai đó hoặc sự vật nào đó dựa trên vẻ bề ngoài nhìn thấy được. Nếu nguyên âm cuối của thân tính từ là 'ㅏ' hoặc 'ㅗ', dùng '-아 보이다'; nếu là các nguyên âm khác, dùng '-어 보이다'; nếu là '하다', chuyển thành '-해 보이다'.",
    "formation": "Thân tính từ + 아/어/여 보이다 (Nguyên âm ㅏ/ㅗ + 아 보이다, các nguyên âm khác + 어 보이다, 하다 → 해 보이다)",
    "examples": [
      {
        "translation": "Mẹ trông có vẻ hạnh phúc, chắc là mẹ vừa nghe được tin vui gì đó rồi."
      },
      {
        "translation": "Người đó luôn trông có vẻ tốt bụng nhưng thực tế thì không phải vậy."
      },
      {
        "translation": "Căn phòng này trông có vẻ quá nhỏ, nhưng nếu bài trí nội thất khéo thì hoàn toàn dùng được tốt."
      },
      {
        "translation": "Cậu trông lúc nào cũng có vẻ bận rộn, dạo này sống thế nào rồi?"
      }
    ]
  },
  "ko_아어여_63": {
    "title": "아/어/여 버리다 (Động từ bổ trợ: ...mất rồi, xong xuôi hoàn toàn)",
    "shortExplanation": "Động từ bổ trợ biểu thị một hành động đã hoàn tất triệt để, kèm theo cảm giác tiếc nuối, ân hận hoặc nhẹ nhõm, thanh thản.",
    "longExplanation": "'아/어/여 버리다' kết hợp sau thân động từ để chỉ một hành động đã được thực hiện xong hoàn toàn. Cấu trúc này thường mang hai sắc thái tình cảm rõ rệt: hoặc là tiếc nuối, hối tiếc vì điều không mong muốn đã lỡ xảy ra ('lỡ... mất rồi'), hoặc là nhẹ nhõm, trút được gánh nặng sau khi hoàn thành xong một việc ('đã giải quyết xong xuôi').",
    "formation": "Thân động từ + 아/어/여 버리다 (Nguyên âm ㅏ/ㅗ + 아 버리다, các nguyên âm khác + 어 버리다, 하다 → 해 버리다)",
    "examples": [
      {
        "translation": "Tôi đợi mãi rồi mệt quá nên lỡ ngủ thiếp đi mất, thành ra không gặp được bạn đúng giờ hẹn."
      },
      {
        "translation": "Anh ấy vì quá căng thẳng nên đã quên sạch mọi thứ, nhưng hóa ra đó lại là bước ngoặt bất ngờ."
      },
      {
        "translation": "Chúng tôi đã cố gắng phân tích toàn bộ vấn đề, nhưng cuối cùng đành phải từ bỏ tất cả."
      },
      {
        "translation": "Cuối tuần đã đến, nhưng tiếc thay tôi phải làm cho xong hết bài tập nên chẳng còn thời gian nghỉ ngơi."
      }
    ]
  },
  "ko_아어여_64": {
    "title": "아/어/여 놓다 (Động từ bổ trợ: làm sẵn, làm xong để đó)",
    "shortExplanation": "Động từ bổ trợ biểu thị việc thực hiện xong một hành động rồi duy trì hoặc giữ nguyên trạng thái kết quả đó cho tương lai.",
    "longExplanation": "'아/어/여 놓다' là cấu trúc động từ bổ trợ diễn tả một hành động đã được hoàn tất trước nhằm mục đích chuẩn bị cho một việc khác, và kết quả của hành động đó vẫn được giữ nguyên trạng thái ở hiện tại ('làm sẵn', 'làm rồi để đó'). Tương đương với cấu trúc '-아/어 두다' trong tiếng Hàn.",
    "formation": "Thân động từ hành động + 아/어/여 놓다 (Nguyên âm ㅏ/ㅗ + 아 놓다, các nguyên âm khác + 어 놓다, 하다 → 해 놓다)",
    "examples": [
      {
        "translation": "Hôm nay tôi về nhà sớm nên đã nấu sẵn bữa tối rồi, tối đến có thể thoải mái ăn."
      },
      {
        "translation": "Chúng tôi đã đặt phòng khách sạn sẵn trước khi làm thủ tục nhận phòng, vì thế đã có thể vào phòng ngay lập tức."
      },
      {
        "translation": "Anh ấy đã lên sẵn toàn bộ kế hoạch cho ngày hôm nay, rồi sau đó lại chẳng làm gì cả."
      },
      {
        "translation": "Tôi đã học bài chuẩn bị sẵn sàng cho kỳ thi hết rồi, vậy mà kỳ thi lại bị hủy mất."
      }
    ]
  },
  "ko_아어여_65": {
    "title": "아/어/여 지다 (Trở nên, trở thành: biến đổi trạng thái)",
    "shortExplanation": "Cấu trúc gắn sau thân tính từ biểu thị sự biến đổi dần dần từ trạng thái này sang trạng thái khác ('trở nên...').",
    "longExplanation": "'아/어/여 지다' kết hợp với thân tính từ để biến tính từ thành động từ chỉ sự thay đổi trạng thái, mang nghĩa 'trở nên...', 'hóa...'. Cấu trúc này diễn tả đối tượng dần dần chuyển biến theo một chiều hướng tính chất nào đó theo thời gian. Nếu thân tính từ có nguyên âm cuối là 'ㅏ' hoặc 'ㅗ', dùng '-아 지다'; các nguyên âm khác dùng '-어 지다'; với '하다', chuyển thành '-해 지다'.",
    "formation": "Thân tính từ + 아/어/여 지다 (Nguyên âm ㅏ/ㅗ + 아 지다, các nguyên âm khác + 어 지다, 하다 → 해 지다)",
    "examples": [
      {
        "translation": "Trời trở nên tối sầm lại nên khó nhìn rõ đường đi, chắc là khó mà đi tới cửa hàng được."
      },
      {
        "translation": "Thời tiết trở nên lạnh hơn nên tôi đâm ra ngại ra ngoài, chỉ muốn ở lì trong nhà thôi."
      },
      {
        "translation": "Hôm nay gặp chuyện vất vả nên tâm trạng chẳng khá lên được, hay là nghỉ ngơi một chút để đổi gió xem sao?"
      },
      {
        "translation": "Nhờ có bạn bè mà tâm trạng tôi đã tốt lên hẳn, phải gặp nhau thường xuyên hơn mới được."
      }
    ]
  },
  "ko_아어여_66": {
    "title": "아/어/여 가지다 / 가지고 있다 (Sở hữu, có được: phẩm chất, đặc điểm)",
    "shortExplanation": "Biểu thị việc một người hay sự vật sở hữu, có được đặc điểm, phẩm chất hoặc năng lực nhất định ('sở hữu', 'có').",
    "longExplanation": "'가지다' (thường dùng ở dạng '가지고 있다') là động từ mang ý nghĩa 'sở hữu', 'có được', dùng để miêu tả ai đó sở hữu phẩm chất ngoại hình, năng lực, tài năng hoặc mối quan hệ xã hội. Trong khẩu ngữ đời sống, vĩ tố liên kết '-아/어 가지고' còn được dùng phổ biến để liên kết hai vế câu diễn tả nguyên nhân, lý do hoặc kết quả của hành động trước ('làm... rồi thì...').",
    "formation": "Danh từ + 을/를 + 가지다 / 가지고 있다 (hoặc Thân động từ / Thân tính từ + 아/어 가지고)",
    "examples": [
      {
        "translation": "Cô ấy có một đôi mắt tuyệt đẹp, lấp lánh như những vì sao trên bầu trời đêm."
      },
      {
        "translation": "Tôi có rất nhiều bạn tốt nên chẳng bao giờ thấy cô đơn."
      },
      {
        "translation": "Công ty chúng ta cần phải sở hữu năng lực cạnh tranh mạnh mẽ, có như vậy thì mới có thể phát triển được."
      },
      {
        "translation": "Anh ấy có năng lực vượt trội nên việc gì cũng có thể hoàn thành xuất sắc."
      }
    ]
  },
  "ko_으는편이다eunneunpyeonidaTendto_67": {
    "title": "(으)ㄴ/는 편이다 (Thuộc diện, thuộc dạng, có xu hướng)",
    "shortExplanation": "Cấu trúc biểu thị một đối tượng nghiêng về hoặc thuộc về một nhóm tính chất, thói quen hay xu hướng nào đó một cách tương đối ('thuộc diện...').",
    "longExplanation": "'(으)ㄴ/는 편이다' dùng để diễn tả tính cách, thói quen hoặc tình trạng của đối tượng thuộc vào một loại/nhóm nhất định khi so sánh chung, giúp cách nói trở nên mềm mại và không khẳng định một cách tuyệt đối ('thuộc tuýp...', 'khá là...'). Với động từ thì kết hợp với '-는 편이다'; với tính từ có phụ âm cuối dùng '-은 편이다', không có phụ âm cuối dùng '-ㄴ 편이다'; với danh từ dùng '인 편이다'.",
    "formation": "Thân động từ + 는 편이다 / Thân tính từ có phụ âm cuối + 은 편이다 / Thân tính từ không có phụ âm cuối + ㄴ 편이다 / Danh từ + 인 편이다",
    "examples": [
      {
        "translation": "Anh ấy thuộc diện dậy sớm, ngay cả vào cuối tuần cũng luôn thức dậy từ sáng sớm."
      },
      {
        "translation": "Tôi thuộc diện ăn cay giỏi, ngay cả những món rất cay tôi cũng thưởng thức được."
      },
      {
        "translation": "Em tôi thuộc diện rất coi trọng sự an toàn, vì thế lúc nào cũng thắt dây an toàn."
      },
      {
        "translation": "Tôi thuộc diện khá chăm đọc sách, đặc biệt là rất thích tiểu thuyết khoa học viễn tưởng."
      }
    ]
  },
  "ko_는은_68": {
    "title": "-(으)ㄴ/는데 (Vĩ tố liên kết: bối cảnh, tương phản, giải thích)",
    "shortExplanation": "Vĩ tố liên kết dùng để gợi mở bối cảnh hoặc tạo sự đối chiếu, tương phản trước khi đưa ra thông tin chính ở vế sau.",
    "longExplanation": "'-(으)ㄴ/는데' là một trong những vĩ tố liên kết thông dụng nhất trong tiếng Hàn. Cấu trúc này dùng để cung cấp bối cảnh, tình huống nền tảng để giải thích, đưa ra gợi ý, yêu cầu hoặc diễn tả quan hệ đối lập tương phản giữa hai vế ('nhưng', 'thế nhưng'). Động từ hoặc thì quá khứ kết hợp với '-는데', tính từ có phụ âm cuối dùng '-은데', không có phụ âm cuối dùng '-ㄴ데', danh từ dùng '인데'.",
    "formation": "Thân động từ / Thân thì quá khứ + 는데 / Thân tính từ có phụ âm cuối + 은데 / Thân tính từ không có phụ âm cuối + ㄴ데 / Danh từ + 인데",
    "examples": [
      {
        "translation": "Tôi vẫn còn là học sinh nhưng đang làm thêm để kiếm tiền."
      },
      {
        "translation": "Hôm qua tôi về đến nhà thì chẳng có ai ở nhà cả."
      },
      {
        "translation": "Bây giờ trời đang mưa mà tôi lại không mang theo ô nên rắc rối to rồi."
      },
      {
        "translation": "Tôi rất thích trò chuyện với mọi người, thế nhưng vì tính hay ngại ngùng nên thấy khó khăn lắm."
      }
    ]
  },
  "ko_아어여야겠다_69": {
    "title": "아/어/여야겠다 (Phải... thôi: quyết tâm, sự cần thiết)",
    "shortExplanation": "Biểu thị quyết tâm, ý chí hoặc phán đoán của người nói rằng bản thân nhất định phải làm một hành động nào đó ('chắc phải... thôi').",
    "longExplanation": "'아/어/여야겠다' là sự kết hợp giữa '-아/어/여야 하다' (phải làm gì) và vĩ tố trước kết thúc chỉ ý chí, phán đoán '-겠-'. Cấu trúc này diễn tả việc người nói nhận thức được sự cần thiết cấp bách của một hành động và đưa ra quyết định hoặc quyết tâm thực hiện hành động đó ngay ('tôi phải... mới được', 'chắc tôi sẽ phải...').",
    "formation": "Thân động từ / Thân tính từ + 아/어/여야겠다 (Nguyên âm kết thúc là ㅏ/ㅗ + 아야겠다, các nguyên âm khác + 어야겠다, 하다 → 해야겠다)",
    "examples": [
      {
        "translation": "Tôi phải mau chóng hoàn thành bài báo cáo này thôi, bởi vì hạn nộp là ngày mai rồi."
      },
      {
        "translation": "Chúng ta không có nhiều thời gian nên chắc phải đi taxi thôi."
      },
      {
        "translation": "Món này trông ngon quá, tôi cũng phải ăn thử một lần xem sao mới được."
      },
      {
        "translation": "Trời lạnh quá nên tôi chắc phải mặc quần áo ấm hơn thôi."
      }
    ]
  },
  "ko_아어여서는_70": {
    "title": "아/어/여서는 안 되다 (Không được làm gì: cấm đoán)",
    "shortExplanation": "Cấu trúc biểu thị sự ngăn cấm, không được phép thực hiện một hành vi nào đó theo luật lệ, đạo đức hoặc quy tắc xã hội ('không được...').",
    "longExplanation": "'아/어/여서는 안 되다' dùng để diễn đạt sự cấm đoán một cách trang trọng và kiên quyết. Cấu trúc này nhấn mạnh rằng nếu thực hiện hành động ở vế trước thì sẽ dẫn tới hậu quả tiêu cực hoặc vi phạm nguyên tắc, chuẩn mực ('không được phép làm...'). Đi kèm với thân động từ, biến đổi đuôi nguyên âm theo quy tắc 아/어/여.",
    "formation": "Thân động từ + 아/어/여서 + 는 안 되다",
    "examples": [
      {
        "translation": "Ở bệnh viện này không được hút thuốc lá, điều đó rất có hại cho sức khỏe."
      },
      {
        "translation": "Không được tiết lộ chuyện bí mật cho người khác biết, bạn có thể bị mất lòng tin đấy."
      },
      {
        "translation": "Trong giờ thi không được nói chuyện với bạn, hành vi đó có thể bị coi là gian lận."
      },
      {
        "translation": "Không nên làm bài tập qua loa cho thật nhanh, nếu chưa hiểu thì nhất định phải hỏi thầy cô."
      }
    ]
  },
  "ko_아어여_71": {
    "title": "아/어/여 주세요 (Xin hãy làm giúp tôi: nhờ vả lịch sự)",
    "shortExplanation": "Cấu trúc dùng để yêu cầu, nhờ vả đối phương thực hiện một hành động nào đó giúp cho mình một cách lịch sự, nhã nhặn ('xin hãy làm giúp tôi').",
    "longExplanation": "'아/어/여 주세요' là dạng tôn kính kết hợp từ động từ bổ trợ '주다' (cho, làm giúp) và đuôi kết thúc câu lịch sự '-세요'. Cấu trúc này dùng khi người nói muốn người nghe làm một việc gì đó mang lại lợi ích cho bản thân người nói hoặc người khác một cách tế nhị, nhã nhặn ('xin hãy làm ơn...', 'vui lòng làm giúp...').",
    "formation": "Thân động từ hành động + 아/어/여 + 주세요",
    "examples": [
      {
        "translation": "Xin hãy tìm giúp tôi một nơi mà chúng tôi có thể ở cùng nhau, tôi muốn cùng bạn mình đi du lịch Hàn Quốc."
      },
      {
        "translation": "Xin hãy tìm giúp tôi chỗ sai trong câu này, tôi không biết nên rất cần được giúp đỡ."
      },
      {
        "translation": "Trên đường về nhà làm ơn mua giúp tôi ít sữa nhé, ở nhà đang hết sữa rồi."
      },
      {
        "translation": "Xin vui lòng gửi thư trả lời lại email này, tôi cần có câu trả lời sớm."
      }
    ]
  },
  "ko_아어여_72": {
    "title": "아/어/여 드리다 (Kính ngữ: làm giúp cho, dâng tặng hành động)",
    "shortExplanation": "Dạng kính ngữ (khiêm nhường ngữ) của '아/어/여 주다', dùng khi người nói thực hiện một hành động nào đó giúp đỡ người bề trên hoặc khách hàng.",
    "longExplanation": "'아/어/여 드리다' là dạng khiêm nhường tôn kính của cấu trúc '아/어/여 주다'. Khi hành động của người nói hướng tới người có địa vị cao hơn, người lớn tuổi hơn, hoặc khách hàng để thể hiện sự tôn trọng tối đa, ta thay động từ '주다' bằng '드리다'. Thường đi kèm với tiểu từ kính ngữ '께' sau người nhận hành động.",
    "formation": "Thân động từ hành động + 아/어/여 드리다",
    "examples": [
      {
        "translation": "Để tiện thông báo cho bạn, tôi xin được gửi lại số điện thoại của mình."
      },
      {
        "translation": "Chúng tôi luôn nỗ lực hết mình để cung cấp dịch vụ tốt hơn nữa tới quý khách hàng."
      },
      {
        "translation": "Tôi đã viết một bức thư gửi tặng mẹ."
      },
      {
        "translation": "Tôi không thể không truyền dạy những tri thức quý báu cho các học sinh của mình."
      }
    ]
  },
  "ko_다니다_73": {
    "title": "다니다 (Động từ: đi lại thường xuyên, đi học, đi làm)",
    "shortExplanation": "Động từ biểu thị việc đi lại một nơi nào đó nhiều lần theo thói quen định kỳ, chẳng hạn như đi học hoặc đi làm.",
    "longExplanation": "'다니다' là động từ trong tiếng Hàn chỉ hành động di chuyển qua lại nhiều lần một cách có quy luật giữa nơi xuất phát và điểm đến. Nó tương đương với 'đi học' ('학교에 다니다'), 'đi làm' ('회사에 다니다'), hoặc 'thường xuyên lui tới' một địa điểm nào đó ('체육관에 다니다'). Khác với '가다' (chỉ việc đi một lần về phía trước), '다니다' nhấn mạnh vào tính chu kỳ, thói quen lặp đi lặp lại.",
    "formation": "Danh từ nơi chốn + 에 다니다 / Thân động từ + (으)러 다니다",
    "examples": [
      {
        "translation": "Tôi thường đi đến phòng gym tập thể dục từ sáng sớm mỗi ngày nên đã thành thói quen, nhờ thế mà thể lực của tôi đã tốt lên nhiều."
      },
      {
        "translation": "Để nghe giảng, học sinh phải đến trường đi học mỗi ngày, có như vậy thì mới có thể học tập đàng hoàng được."
      },
      {
        "translation": "Cứ mỗi dịp cuối tuần tôi lại cùng bạn bè lui tới các quán cà phê và trải qua những giờ phút vui vẻ, vì thế nên tôi có rất nhiều kỷ niệm đẹp."
      },
      {
        "translation": "Nếu muốn làm việc ở công ty này thì hàng ngày bạn phải đến văn phòng làm việc, có vậy thì mới xử lý công việc được chứ."
      }
    ]
  },
  "ko_아어여_74": {
    "title": "아/어/여 가다 (Động từ bổ trợ: tiếp tục tiến hành, dần dần hướng về tương lai)",
    "shortExplanation": "Động từ bổ trợ biểu thị một hành động hoặc trạng thái đang tiếp tục tiến triển dần dần từ hiện tại hướng về tương lai ('cứ tiếp tục...').",
    "longExplanation": "'아/어/여 가다' là cấu trúc động từ bổ trợ diễn tả sự phát triển, duy trì của một hành động hoặc sự biến chuyển trạng thái từ mốc thời gian hiện tại tiếp diễn tới tương lai xa hơn ('tiếp tục làm...', 'ngày càng...'). Cấu trúc này đối lập với '아/어/여 오다' (vốn diễn tả quá trình kéo dài từ quá khứ cho tới hiện tại).",
    "formation": "Thân động từ / Thân tính từ + 아/어/여 가다",
    "examples": [
      {
        "translation": "Càng ngày thời tiết lại càng đang trở nên lạnh dần đi."
      },
      {
        "translation": "Tôi thấy vui vì dường như thực lực của mình đang ngày càng tiến bộ lên."
      },
      {
        "translation": "Nếu cứ tiếp tục kiên trì luyện tập thì một ngày nào đó bạn chắc chắn sẽ trở thành dân chuyên nghiệp thôi."
      },
      {
        "translation": "Tôi vừa tiếp tục suy ngẫm sâu về vấn đề đó, vừa từng bước một tìm kiếm phương án giải quyết."
      }
    ]
  },
  "ko_으러가다오다eureogadaodaGocomeinordertodo_75": {
    "title": "(으)러 가다/오다 (Đi/đến để làm gì)",
    "shortExplanation": "Vĩ tố liên kết biểu thị mục đích di chuyển đến một địa điểm nào đó để thực hiện một hành động.",
    "longExplanation": "'(으)러 가다/오다' được dùng khi người nói (hoặc chủ ngữ) di chuyển đến một địa điểm với mục đích thực hiện hành động nào đó. Thân động từ kết thúc bằng phụ âm (ngoại trừ ㄹ) kết hợp với '-으러 가다/오다', còn thân động từ kết thúc bằng nguyên âm hoặc phụ âm 'ㄹ' kết hợp với '-러 가다/오다'. Các động từ chuyển động thường đi kèm gồm 가다 (đi), 오다 (đến), 다니다 (thường xuyên lui tới), v.v.",
    "formation": "Thân động từ (kết thúc bằng phụ âm trừ ㄹ) + 으러 가다/오다 / Thân động từ (kết thúc bằng nguyên âm hoặc ㄹ) + 러 가다/오다",
    "examples": [
      {
        "translation": "Tôi định đi xem phim vào cuối tuần này."
      },
      {
        "translation": "Từ ngày mai chúng tôi sẽ đến thư viện để học bài."
      },
      {
        "translation": "Tuần này cô ấy dự định về quê để đi du lịch cùng bạn bè."
      },
      {
        "translation": "Đói bụng quá nên tôi định đến nhà hàng ăn trưa."
      }
    ]
  },
  "ko_아어여_76": {
    "title": "아/어/여 오다 (Làm gì đó duy trì đến nay / làm... rồi đến)",
    "shortExplanation": "Biểu thị một hành động được duy trì liên tục từ quá khứ đến hiện tại, hoặc vừa thực hiện hành động vừa di chuyển lại gần.",
    "longExplanation": "'아/어/여 오다' là cấu trúc bổ trợ biểu thị hai nét nghĩa chính: Một là sự tiến triển liên tục của một hành động hay trạng thái từ một thời điểm trong quá khứ kéo dài cho đến tận thời điểm hiện tại ('đã và đang làm suốt...'). Hai là hành động vừa được thực hiện vừa di chuyển đến địa điểm của người nói ('đi bộ đến', 'chạy lại...'). Thân động từ có nguyên âm kết thúc là ㅏ, ㅗ kết hợp với '-아 오다', các nguyên âm khác kết hợp với '-어 오다', và động từ kết thúc bằng 하다 đổi thành '해 오다'.",
    "formation": "Thân động từ (nguyên âm ㅏ, ㅗ) + 아 오다 / Thân động từ (nguyên âm khác) + 어 오다 / Thân động từ 하다 + 해 오다",
    "examples": [
      {
        "translation": "Con cáo đó đã đến để ăn con gà trên lòng bàn tay."
      },
      {
        "translation": "Vì đang là kỳ nghỉ nên tôi đến đây để đi du lịch cùng bạn bè."
      },
      {
        "translation": "Vì bắt đầu ăn kiêng nên tôi đã duy trì việc chạy bộ mỗi buổi sáng."
      },
      {
        "translation": "Ăn nhiều quá nên tôi phải đi bộ một hồi lâu mới về đến nhà."
      }
    ]
  },
  "ko_고_77": {
    "title": "고 있다 (Đang làm gì - Thì hiện tại tiếp diễn)",
    "shortExplanation": "Biểu thị một hành động đang trong quá trình diễn ra tại thời điểm nói, tương đương với 'đang...'.",
    "longExplanation": "'고 있다' được gắn vào sau thân động từ để diễn tả một hành động đang được tiến hành hoặc tiếp diễn tại thời điểm nói (tương tự như thì tiếp diễn trong tiếng Anh hoặc 'đang...' trong tiếng Việt). Cấu trúc này không phân biệt thân từ kết thúc bằng phụ âm hay nguyên âm, đều gắn trực tiếp '-고 있다'. Dạng kính ngữ của '고 있다' là '-고 계시다' khi nói về người lớn tuổi hoặc đối tượng cần tôn kính.",
    "formation": "Thân động từ + 고 있다 (Kính ngữ: Thân động từ + 고 계시다)",
    "examples": [
      {
        "translation": "Bây giờ tôi đang đọc sách, nên lát nữa tôi định tham gia nhóm học tập."
      },
      {
        "translation": "Mẹ đang nấu ăn, nhưng tôi đang ở trong phòng nên không thể giúp mẹ được."
      },
      {
        "translation": "Anh trai đang luyện tập một mình; tôi đang giữ im lặng để không làm phiền anh ấy."
      },
      {
        "translation": "Các bạn đang đá bóng, nhưng trời đổ mưa nên có vẻ họ sắp dừng lại rồi."
      }
    ]
  },
  "ko_아어여_78": {
    "title": "아/어/여 보다 (Thử làm gì / từng làm gì)",
    "shortExplanation": "Biểu thị việc thử làm một hành động nào đó để xem kết quả, hoặc diễn tả trải nghiệm đã từng làm gì.",
    "longExplanation": "'아/어/여 보다' được gắn vào sau thân động từ để thể hiện ý định thử làm một việc gì đó lần đầu hoặc trải nghiệm một hành động ('thử làm...'). Khi kết hợp với thì quá khứ ('-아/어 봤다'), cấu trúc này diễn tả kinh nghiệm từng trải ('đã từng làm...'). Thân động từ có nguyên âm kết thúc là ㅏ, ㅗ kết hợp với '-아 보다', nguyên âm khác kết hợp với '-어 보다', và 하다 đổi thành '해 보다'.",
    "formation": "Thân động từ (nguyên âm ㅏ, ㅗ) + 아 보다 / Thân động từ (nguyên âm khác) + 어 보다 / Thân động từ 하다 + 해 보다",
    "examples": [
      {
        "translation": "Vì đã học công thức nấu ăn mới nên tôi định thử nấu bữa tối hôm nay."
      },
      {
        "translation": "Việc học tiếng Anh tuy khó nhưng tôi định sẽ tiếp tục thử kiên trì học."
      },
      {
        "translation": "Tôi định thử dạy kỹ thuật chế tạo robot cho trẻ em, nhưng không biết chúng có thấy khó không."
      },
      {
        "translation": "Nếu muốn xác nhận xem chiếc túi này có vừa vặn không thì phải thử tự mình mang đeo nó."
      }
    ]
  },
  "ko_게_0": {
    "title": "~게 되다 (Được, bị, trở nên làm gì / hóa ra lại làm gì)",
    "shortExplanation": "Biểu thị một hành động hoặc trạng thái xảy ra do hoàn cảnh khách quan đưa đẩy ngoài ý muốn của chủ ngữ.",
    "longExplanation": "'~게 되다' được gắn vào sau thân động từ hoặc tính từ để biểu thị sự biến đổi sang một trạng thái mới hoặc dẫn đến một kết quả do hoàn cảnh, tác động ngoại cảnh hay quy định bên ngoài, chứ không phải do chủ ý ban đầu của chủ thể ('được làm...', 'bị làm...', 'hóa ra lại làm...'). Thân từ có hoặc không có phụ âm cuối đều kết hợp trực tiếp với '-게 되다'.",
    "formation": "Thân động từ / Tính từ + 게 되다",
    "examples": [
      {
        "translation": "Đang học ôn thi thì tôi thiếp đi, rốt cuộc lại phải học nhồi nhét vào phút chót."
      },
      {
        "translation": "Các thành viên trong nhóm đều bận rộn nên tôi đành phải tự mình chuẩn bị toàn bộ bài thuyết trình."
      },
      {
        "translation": "Vì làm mất ví nên tôi rơi vào cảnh phải mượn tiền của mẹ."
      },
      {
        "translation": "Vé đã bán hết sạch nên cuối cùng tôi không thể đi xem buổi hòa nhạc đó được."
      }
    ]
  },
  "ko_게_1": {
    "title": "~게 되다 (Được, bị, trở nên, thành ra làm gì)",
    "shortExplanation": "Biểu thị sự biến chuyển về tình huống hoặc hành động do hoàn cảnh bên ngoài tác động, không hoàn toàn theo ý chí chủ quan ('trở nên...', 'được/bị...', 'thành ra làm...').",
    "longExplanation": "'~게 되다' kết hợp giữa vĩ tố phó từ hóa '-게' và trợ động từ bị động/chuyển hóa '되다'. Cấu trúc này dùng khi một sự việc hay hành động diễn ra do tác động của hoàn cảnh khách quan, sự thay đổi kế hoạch hoặc kết quả tự nhiên ngoài ý muốn, tương đương với 'được...', 'thành ra...', 'chuyển sang làm...' trong tiếng Việt.",
    "formation": "Thân động từ + -게 되다",
    "examples": [
      {
        "translation": "Tôi đang mải tập trung học thì lại ngủ thiếp đi mất. Cảm giác thật là kỳ lạ."
      },
      {
        "translation": "Ban đầu tôi chỉ định học tiếng Hàn trong một tuần thôi, nhưng về sau lại thành ra học suốt cả một tháng."
      },
      {
        "translation": "Chúng tôi vốn định kết hôn vào mùa hè, nhưng rốt cuộc lại thành ra tổ chức đám cưới vào mùa đông."
      },
      {
        "translation": "Thời gian đầu tôi phải làm việc quá nhiều ở công ty, thế nên không thể thường xuyên gặp mặt gia đình."
      }
    ]
  },
  "ko_고_2": {
    "title": "~고 싶다 (Muốn làm gì - Nguyện vọng)",
    "shortExplanation": "Biểu thị mong muốn, ước nguyện của bản thân muốn thực hiện một hành động nào đó.",
    "longExplanation": "'~고 싶다' được gắn vào sau thân động từ để thể hiện mong muốn hoặc ý định của ngôi thứ nhất (người nói) trong câu trần thuật hoặc ngôi thứ hai (người nghe) trong câu hỏi ('muốn làm...'). Khi diễn tả nguyện vọng của ngôi thứ ba (người khác), phải chuyển sang cấu trúc '-고 싶어하다'. Cấu trúc này kết hợp trực tiếp với mọi thân động từ mà không phụ thuộc vào phụ âm cuối.",
    "formation": "Thân động từ + 고 싶다 (Ngôi thứ ba: Thân động từ + 고 싶어하다)",
    "examples": [
      {
        "translation": "Tôi muốn nghe bài hát tiếng Hàn, nên hãy bật nhạc tiếng Hàn giúp tôi nhé."
      },
      {
        "translation": "Vào kỳ nghỉ tôi muốn đi du lịch cùng bạn bè."
      },
      {
        "translation": "Tôi muốn dạy tiếng Hàn cho cô ấy."
      },
      {
        "translation": "Vì muốn làm ra những món ăn ngon nên tôi muốn tham gia lớp học nấu ăn."
      }
    ]
  },
  "ko_기_3": {
    "title": "~기 전에 (Trước khi làm gì)",
    "shortExplanation": "Biểu thị một hành động xảy ra trước một hành động khác theo trình tự thời gian, tương đương 'trước khi...'.",
    "longExplanation": "'~기 전에' được gắn vào sau thân động từ để chỉ ra rằng hành động ở mệnh đề chính diễn ra trước hành động được gắn '-기 전에'. Cấu trúc này được tạo thành từ vĩ tố danh từ hóa '-기' kết hợp với danh từ '전' (trước) và trợ từ thời gian '에'. Bất kể câu ở thì quá khứ, hiện tại hay tương lai, động từ trước '-기 전에' luôn giữ nguyên ở dạng thân từ hiện tại (không chia thì).",
    "formation": "Thân động từ + 기 전에 (Với danh từ: Danh từ + 전에)",
    "examples": [
      {
        "translation": "Tôi luôn ăn bữa sáng trước khi đi đến trường."
      },
      {
        "translation": "Việc lập kế hoạch chi tiết trước khi xuất phát là rất quan trọng."
      },
      {
        "translation": "Hãy cho tôi biết món bạn gọi trước khi tôi đi tới quán cà phê nhé."
      },
      {
        "translation": "Bạn phải ôn tập thật kỹ về chủ đề đó trước khi bước vào kỳ thi."
      }
    ]
  },
  "ko_기_4": {
    "title": "~기 때문에 (Vì, do làm gì - Biểu thị lý do)",
    "shortExplanation": "Biểu thị nguyên nhân, lý do rõ ràng của một hành động hoặc tình huống, tương đương 'vì...', 'do...'.",
    "longExplanation": "'~기 때문에' được gắn vào sau thân động từ hoặc tính từ để biểu thị nguyên nhân, lý do rõ ràng, khách quan dẫn đến kết quả ở mệnh đề sau. Cấu trúc này mang tính trang trọng, logic hơn so với '-아/어서' và có thể kết hợp với thì quá khứ ('-았/었기 때문에'). Tuy nhiên, mệnh đề sau của '-기 때문에' không được dùng câu mệnh lệnh ('-(으)세요') hay câu thỉnh dụ ('-(으)ㅂ시다').",
    "formation": "Thân động từ / Tính từ + 기 때문에 (Danh từ: Danh từ + (이)기 때문에)",
    "examples": [
      {
        "translation": "Vì phải học bài nên tôi không có thời gian đi chơi cùng bạn bè."
      },
      {
        "translation": "Vì bị cảm cúm nên tôi đã không thể đi học được."
      },
      {
        "translation": "Vì kiếm được nhiều tiền nên tôi vẫn tiếp tục đi làm ở công ty."
      },
      {
        "translation": "Nhờ chăm chỉ tập thể dục nên tôi đang ngày càng khỏe mạnh hơn."
      }
    ]
  },
  "ko_기로_5": {
    "title": "~기로 하다 (Quyết định làm gì / hứa làm gì)",
    "shortExplanation": "Biểu thị quyết định, kế hoạch hoặc lời hẹn ước làm một việc gì đó.",
    "longExplanation": "'~기로 하다' được gắn vào sau thân động từ để biểu thị sự quyết định, lựa chọn hoặc giao ước thực hiện một kế hoạch nào đó. Do quyết định thường được đưa ra trước khi nói nên cấu trúc này hầu như luôn được sử dụng ở dạng quá khứ '-기로 했다'. Nếu dùng ở thì hiện tại ('-기로 하다') thì mang sắc thái nguyên tắc chung hoặc quy định.",
    "formation": "Thân động từ + 기로 하다 (Quá khứ thông dụng: Thân động từ + 기로 했다)",
    "examples": [
      {
        "translation": "Chúng tôi đã quyết định gặp nhau vào chiều mai, vì vậy sáng mai tôi phải dậy sớm để chuẩn bị."
      },
      {
        "translation": "Tôi đã quyết định đi du lịch với bạn vào tuần tới, cho nên cuối tuần này tôi phải thu dọn hành lý."
      },
      {
        "translation": "Gần đây tôi ăn nhiều quá nên đã quyết định ăn kiêng; do đó bắt đầu từ hôm nay tôi quyết định kiểm soát chế độ ăn."
      },
      {
        "translation": "Tôi đã quyết định bắt đầu ôn thi, vì thế từ hôm nay tôi muốn ghi chép vở học mỗi ngày."
      }
    ]
  },
  "ko_기_6": {
    "title": "~기 시작하다 (Bắt đầu làm gì)",
    "shortExplanation": "Biểu thị sự khởi đầu của một hành động, quá trình hoặc sự biến đổi trạng thái.",
    "longExplanation": "'~기 시작하다' được gắn vào sau thân động từ (hoặc tính từ chỉ sự biến đổi) để diễn tả thời điểm bắt đầu một hành động hoặc một sự chuyển biến nào đó ('bắt đầu làm...'). Cấu trúc này được cấu tạo từ vĩ tố danh từ hóa '-기' kết hợp với động từ '시작하다' (bắt đầu). Tất cả thân từ đều kết hợp trực tiếp với '-기 시작하다' mà không phụ thuộc vào phụ âm cuối.",
    "formation": "Thân động từ + 기 시작하다",
    "examples": [
      {
        "translation": "Thời tiết ngày càng ấm áp lên và những bông hoa đã bắt đầu nở rộ."
      },
      {
        "translation": "Ngay khi học kỳ vừa bắt đầu, tôi đã bắt đầu làm bài tập về nhà."
      },
      {
        "translation": "Cô ấy đã bắt đầu chơi đàn piano."
      },
      {
        "translation": "Ngay khi các bạn vừa đến nơi thì bữa tiệc đã bắt đầu."
      }
    ]
  },
  "ko_기는_7": {
    "title": "~기는 하다 (Thì có làm thật đấy, nhưng... / Thừa nhận nhượng bộ)",
    "shortExplanation": "Dùng để thừa nhận một sự thật hay hành động nào đó ở vế trước, nhưng vế sau lập tức đưa ra một thực tế tương phản hay hạn chế.",
    "longExplanation": "'~기는 하다' (thường được rút gọn thành '~긴 하다' trong văn nói) được gắn vào sau thân động từ hoặc tính từ nhằm thừa nhận một sự thật ('thì có... thật', 'đúng là... đấy'), nhưng phía sau thường đi kèm với các liên từ tương phản như '하지만' (nhưng), '-는데' (nhưng mà), '-으나' để đưa ra một điều kiện, hạn chế hoặc cảm giác trái ngược với kỳ vọng. Cấu trúc kết hợp trực tiếp với thân từ không phân biệt phụ âm cuối.",
    "formation": "Thân động từ / Tính từ + 기는 하다 (Văn nói: Thân động từ / Tính từ + 긴 하다)",
    "examples": [
      {
        "translation": "Mỗi sáng tôi đều học tiếng Anh thật đấy, nhưng nói vẫn còn ấp úng vấp váp lắm."
      },
      {
        "translation": "Cuối tuần tôi cũng có đọc sách, nhưng không dành quá nhiều thời gian cho việc đó."
      },
      {
        "translation": "Tôi cũng có nấu ăn thật đấy, nhưng hương vị không hoàn toàn hợp khẩu vị của tôi."
      },
      {
        "translation": "Mỗi ngày tôi đều tập thể dục một tiếng thật, nhưng thể lực vẫn còn rất yếu."
      }
    ]
  },
  "ko_는_8": {
    "title": "~는 대로 (Theo như, đúng như / Ngay sau khi)",
    "shortExplanation": "Biểu thị việc làm một hành động theo đúng nguyên trạng, y hệt như những gì được hướng dẫn hoặc thấy trước đó.",
    "longExplanation": "'~는 대로' được gắn vào sau thân động từ để diễn tả việc thực hiện một hành động y như tình trạng, lời nói hoặc chỉ dẫn mà không hề thay đổi ('theo như...', 'đúng như...'). Ngoài ra, khi nói về sự việc xảy ra trong tương lai, cấu trúc này còn có nghĩa là 'ngay sau khi...' (làm việc gì xong thì làm tiếp việc khác ngay). Trong phạm vi bài học này, cấu trúc nhấn mạnh nghĩa 'y theo, đúng theo mẫu'.",
    "formation": "Thân động từ + 는 대로 (Danh từ: Danh từ + 대로)",
    "examples": [
      {
        "translation": "Xin hãy làm theo chính xác như những gì tôi nói. Làm như vậy thì nguy cơ thất bại sẽ giảm đi."
      },
      {
        "translation": "Nếu bạn lắp ráp đồ chơi đúng theo hướng dẫn này thì có thể hoàn thành mà không gặp khó khăn gì."
      },
      {
        "translation": "Anh ấy đã làm mọi việc đúng theo những gì cha mẹ dạy bảo, và nhờ sự nỗ lực đó mà anh ấy đang sống một cuộc đời thành công."
      },
      {
        "translation": "Khi nghe nhạc, thú vị nhất là hát theo đúng y như ca sĩ đang hát."
      }
    ]
  },
  "ko_는_9": {
    "title": "~는 바람에 (Do/vì... nên dẫn đến hậu quả xấu)",
    "shortExplanation": "Biểu thị một sự việc bất ngờ xảy ra ở vế trước là nguyên nhân trực tiếp dẫn đến kết quả tiêu cực ở vế sau.",
    "longExplanation": "'~는 바람에' được gắn vào sau thân động từ để chỉ nguyên nhân dẫn đến một kết quả xấu, đáng tiếc hoặc ngoài ý muốn ở mệnh đề sau ('do...', 'vì... mà thành ra...'). Cấu trúc này thường đi kèm với những tình huống đột ngột, bất ngờ xảy ra ngoài tầm kiểm soát của chủ ngữ. Mệnh đề sau luôn là câu trần thuật hoặc miêu tả ở thì quá khứ, không bao giờ dùng câu mệnh lệnh hay thỉnh dụ.",
    "formation": "Thân động từ + 는 바람에 + Mệnh đề chỉ kết quả tiêu cực",
    "examples": [
      {
        "translation": "Vì về nhà muộn nên tôi đã bỏ lỡ buổi học vào sáng sớm."
      },
      {
        "translation": "Vì cô ấy không đến bữa tiệc nên tâm trạng tôi không được tốt."
      },
      {
        "translation": "Do trời đổ mưa nên chúng tôi đã phải hủy chuyến dã ngoại."
      },
      {
        "translation": "Vì không kịp nghe điện thoại nên tôi đã bỏ lỡ cuộc họp quan trọng."
      }
    ]
  },
  "ko_는데_10": {
    "title": "~는데 (Vĩ tố liên kết: Nhưng, mà, bối cảnh)",
    "shortExplanation": "Vĩ tố liên kết dùng để đưa ra tiền đề, bối cảnh giải thích cho vế sau, hoặc biểu thị sự tương phản đối lập nhẹ nhàng giữa hai vế.",
    "longExplanation": "'~는데' là một trong những vĩ tố liên kết phổ biến và linh hoạt nhất trong tiếng Hàn. Cấu trúc này dùng để: (1) Cung cấp bối cảnh, tình huống nền tảng mở đầu trước khi đưa ra câu hỏi, đề nghị hoặc hành động ở vế sau; (2) Biểu thị sự tương phản, đối chiếu giữa hai vế câu (tương đương 'nhưng mà'). Đối với động từ dùng '-는데', đối với tính từ có phụ âm cuối dùng '-은데' (không phụ âm cuối dùng '-ㄴ데'), danh từ kết hợp với '-(이)ㄴ데'.",
    "formation": "Động từ + 는데 / Tính từ (có patchim) + 은데 / Tính từ (không patchim) + ㄴ데 / Danh từ + (이)ㄴ데",
    "examples": [
      {
        "translation": "Tôi đã ăn rất nhiều cơm rồi nhưng bây giờ bụng vẫn còn đói."
      },
      {
        "translation": "Bạn tôi lúc nào cũng ngủ muộn nhưng lúc nào cũng dậy rất sớm."
      },
      {
        "translation": "Dạo này thời tiết lạnh thế này mà tuyết lại không rơi nên thật là tiếc."
      },
      {
        "translation": "Tôi đã đến rạp để xem phim nhưng vé đã bán hết sạch nên không xem được."
      }
    ]
  },
  "ko_는지_11": {
    "title": "~는지 모르다 (Không biết là... hay không / không biết liệu...)",
    "shortExplanation": "Dùng để diễn đạt sự không biết, mơ hồ hoặc không chắc chắn về một sự việc, hành động hay trạng thái nào đó.",
    "longExplanation": "Cấu trúc '~는지 모르다' được sử dụng để thể hiện sự nghi vấn, không chắc chắn hoặc không biết rõ về một nội dung nào đó ('không biết là... hay không', 'không biết liệu...'). Ở thì hiện tại, động từ kết hợp với '-는지 모르다', tính từ kết hợp với '-(으)ㄴ지 모르다', danh từ kết hợp với '-(이)인지 모르다'. Khi nói về thì quá khứ, cả động từ và tính từ đều kết hợp với '-았/었는지 모르다', và ở thì tương lai hoặc suy đoán là '-(으)ㄹ지 모르다' hoặc '-(으)ㄹ 것인지 모르다'. Cấu trúc này thường đi kèm với các từ để hỏi như 누구 (ai), 언제 (khi nào), 어디 (ở đâu), 무엇 (cái gì), 어떻게 (như thế nào) hoặc biểu thị việc không biết sự việc có diễn ra hay không.",
    "formation": "Động từ + 는지 모르다 / Tính từ + (으)ㄴ지 모르다 / Quá khứ: Động từ·Tính từ + 았/었는지 모르다 / Tương lai·Suy đoán: Động từ·Tính từ + (으)ㄹ지 모르다 / Danh từ + (이)인지 모르다",
    "examples": [
      {
        "translation": "Tôi không biết liệu hôm nay anh ấy có đến trường hay không."
      },
      {
        "translation": "Tôi không biết cô ấy sẽ mặc bộ trang phục nào."
      },
      {
        "translation": "Tôi không biết anh ấy đã nghe câu chuyện này hay chưa."
      },
      {
        "translation": "Tôi không biết bạn của chúng ta liệu có hạnh phúc ở nơi này hay không."
      }
    ]
  },
  "ko_는지_12": {
    "title": "~는지 알다 (Biết là... / biết liệu...)",
    "shortExplanation": "Dùng để diễn đạt việc biết, hiểu rõ hoặc nắm bắt được thông tin về một sự việc, hành động hay tình huống nào đó.",
    "longExplanation": "Cấu trúc '~는지 알다' được dùng để biểu thị việc người nói (hoặc chủ ngữ) biết, nắm bắt được một sự việc hoặc câu trả lời cho một nghi vấn nào đó ('biết là...', 'biết liệu...'). Ở thì hiện tại, động từ kết hợp với '-는지 알다', tính từ kết hợp với '-(으)ㄴ지 알다', danh từ kết hợp với '-(이)인지 알다'; thì quá khứ dùng '-았/었는지 알다'; thì tương lai hoặc khả năng dùng '-(으)ㄹ 수 있는지 알다' hoặc '-(으)ㄹ지 알다'. Cấu trúc này thường đi kèm với các từ nghi vấn (như 언제, 어디, 누구, 어떻게, 왜...) hoặc kết hợp trong các dạng phủ định, nghi vấn như '-는지 알아요?', '-는지 알 수 없다'.",
    "formation": "Động từ + 는지 알다 / Tính từ + (으)ㄴ지 알다 / Quá khứ: Động từ·Tính từ + 았/었는지 알다 / Khả năng·Tương lai: Động từ + (으)ㄹ 수 있는지 알다 / Danh từ + (이)인지 알다",
    "examples": [
      {
        "translation": "Tôi không thể biết được liệu anh ấy có hiểu lời tôi nói hay không."
      },
      {
        "translation": "Tôi muốn biết liệu cô ấy đã đưa ra quyết định hay chưa."
      },
      {
        "translation": "Chúng ta cần phải biết liệu tuần sau có thể gặp nhau được hay không."
      },
      {
        "translation": "Các giáo viên luôn kiểm tra để biết học sinh có giải quyết được bài tập hay không."
      }
    ]
  },
  "ko_마다_13": {
    "title": "~마다 (Mỗi / mọi / cứ mỗi)",
    "shortExplanation": "Trợ từ gắn sau danh từ biểu thị sự lặp lại đều đặn theo chu kỳ hoặc bao hàm toàn bộ từng đối tượng không ngoại lệ ('mỗi', 'cứ mỗi').",
    "longExplanation": "'~마다' là một trợ từ (tiểu từ) gắn trực tiếp vào sau danh từ, không phân biệt danh từ có phụ âm cuối hay không. Nó dùng để chỉ sự lặp đi lặp lại có tính chu kỳ theo thời gian (ví dụ: 날마다 - mỗi ngày, 아침마다 - mỗi sáng) hoặc bao quát toàn bộ từng cá thể trong một tập thể mà không có ngoại lệ (ví dụ: 사람마다 - mỗi người/ai ai cũng, 나라마다 - mỗi quốc gia). Khi kết hợp với cấu trúc danh từ hóa thời điểm '-(으)ㄹ 때', ta có cụm '-(으)ㄹ 때마다' mang nghĩa 'mỗi khi / mỗi lần... làm gì'.",
    "formation": "Danh từ + 마다 / Thân động từ·tính từ + (으)ㄹ 때마다",
    "examples": [
      {
        "translation": "Mỗi buổi sáng tôi đều thức dậy sớm để tập thể dục."
      },
      {
        "translation": "Mỗi khi đi du lịch, tôi lại được gặp gỡ những con người mới nên cảm thấy rất thú vị."
      },
      {
        "translation": "Cứ sau mỗi lần bài kiểm tra kết thúc, tôi lại nghỉ ngơi một chút."
      },
      {
        "translation": "Cứ mỗi tuần tôi lại đến thư viện để học tiếng Hàn."
      }
    ]
  },
  "ko_부터_14": {
    "title": "~부터 ~까지 (Từ... đến...)",
    "shortExplanation": "Cặp trợ từ biểu thị điểm bắt đầu ('~부터') và điểm kết thúc ('~까지') của thời gian, không gian, thứ tự hay phạm vi hành động.",
    "longExplanation": "'~부터 ~까지' là sự kết hợp giữa hai trợ từ '부터' (biểu thị điểm xuất phát, bắt đầu) và '까지' (biểu thị điểm giới hạn, kết thúc). Cấu trúc này thường được dùng nhiều nhất với thời gian (từ mấy giờ đến mấy giờ, từ thứ mấy đến thứ mấy) hoặc thứ tự (từ số 1 đến số 10). Mặc dù đối với không gian, vị trí, tiếng Hàn thường ưu tiên dùng '에서 ~ 까지' (ví dụ: 서울에서 부산까지), nhưng '부터' đôi khi cũng được sử dụng trong khẩu ngữ để nhấn mạnh điểm khởi đầu của một quãng đường hoặc trình tự.",
    "formation": "Danh từ (thời gian / địa điểm / thứ tự) + 부터 + Danh từ (thời gian / địa điểm / thứ tự) + 까지",
    "examples": [
      {
        "translation": "Chúng tôi làm việc từ thứ Hai đến thứ Sáu."
      },
      {
        "translation": "Giờ nghỉ trưa là từ 12 giờ trưa đến 1 giờ chiều."
      },
      {
        "translation": "Từ Seoul đến Busan đi bằng tàu hỏa mất bao lâu vậy ạ?"
      },
      {
        "translation": "Tôi đã tiến bộ rất nhiều kể từ khi bắt đầu học tiếng Hàn cho đến tận bây giờ."
      }
    ]
  },
  "ko_아어여_15": {
    "title": "아/어/여 보이다 (Trông có vẻ... / dường như...)",
    "shortExplanation": "Dùng sau thân tính từ để diễn đạt phán đoán hoặc cảm nhận bằng mắt về vẻ bề ngoài của đối tượng ('trông có vẻ...').",
    "longExplanation": "'아/어/여 보이다' gắn vào thân tính từ để biểu thị nhận định mang tính trực quan của người nói về trạng thái hay vẻ ngoài của một người, sự vật hoặc sự việc. Nó mang nghĩa 'trông có vẻ...', 'nhìn có vẻ...', phản ánh cảm giác chủ quan qua thị giác chứ không khẳng định 100% bản chất thực tế. Về mặt kết hợp: nếu nguyên âm cuối của thân tính từ là 'ㅏ' hoặc 'ㅗ', dùng '-아 보이다' (như 좋아 보이다); các nguyên âm khác dùng '-어 보이다' (như 맛있어 보이다, 젊어 보이다); với tính từ đuôi '하다', biến đổi thành '-해 보이다' (như 행복해 보이다, 피곤해 보이다).",
    "formation": "Thân tính từ (kết thúc bằng nguyên âm ㅏ, ㅗ) + 아 보이다 / Thân tính từ (các nguyên âm khác) + 어 보이다 / Thân tính từ 하다 + 해 보이다",
    "examples": [
      {
        "translation": "Người đó trông có vẻ hạnh phúc nên những người khác cũng thấy vui lây."
      },
      {
        "translation": "Món ăn này trông có vẻ ngon nhưng thực tế lại hơi mặn."
      },
      {
        "translation": "Người đàn ông đó lúc nào trông cũng có vẻ khó chịu, không biết có chuyện gì không nhỉ?"
      },
      {
        "translation": "Bộ quần áo này lúc nhìn trong ảnh thì đẹp, nhưng nhìn thực tế thì trông cũng bình thường thôi."
      }
    ]
  },
  "ko_아어여_16": {
    "title": "아/어/여 주다 (Làm gì đó cho ai / giúp ai)",
    "shortExplanation": "Động từ bổ trợ gắn sau thân động từ biểu thị việc thực hiện hành động nhằm mang lại lợi ích hoặc giúp đỡ cho người khác.",
    "longExplanation": "'아/어/여 주다' là cấu trúc trợ động từ biểu thị hành động được thực hiện vì lợi ích của người khác ('làm... cho ai', 'làm... giúp ai'). Khi đối tượng nhận hành động là người bề trên hoặc cần được tôn kính, người nói sẽ dùng dạng kính ngữ là '아/어/여 드리다'. Ngược lại, khi người nói yêu cầu người khác làm gì giúp mình, cấu trúc này thường xuất hiện dưới dạng thỉnh cầu mềm mỏng và lịch sự như '아/어/여 주세요' (xin hãy làm giúp tôi) hoặc '아/어/여 주시겠어요?' (anh/chị có thể làm giúp tôi được không?). Cách chia: nguyên âm 'ㅏ, ㅗ' kết hợp với '-아 주다', các nguyên âm khác kết hợp với '-어 주다', và động từ '하다' chuyển thành '-해 주다'.",
    "formation": "Thân động từ (nguyên âm ㅏ, ㅗ) + 아 주다 / Thân động từ (nguyên âm khác) + 어 주다 / Động từ 하다 + 해 주다 (Kính ngữ: 아/어/여 드리다)",
    "examples": [
      {
        "translation": "Cậu mệt rồi thì để tớ làm bài tập về nhà đó giúp cho nhé."
      },
      {
        "translation": "Đừng lo lắng, bố sẽ bảo vệ cho chúng ta mà."
      },
      {
        "translation": "Trên đường về nhà, bố đã bắt taxi cho chúng tôi."
      },
      {
        "translation": "Tôi đã nấu bữa tối cho mẹ."
      }
    ]
  },
  "ko_아어여야만_17": {
    "title": "아/어/여야만 하다 (Bắt buộc phải... / nhất định phải làm gì)",
    "shortExplanation": "Nhấn mạnh nghĩa vụ bắt buộc, tính tất yếu hoặc điều kiện tiên quyết duy nhất để đạt được kết quả ('nhất định phải... mới được').",
    "longExplanation": "'아/어/여야만 하다' là hình thức nhấn mạnh của cấu trúc biểu thị nghĩa vụ '아/어/여야 하다', được tạo thành bằng cách thêm trợ từ nhấn mạnh giới hạn '만' (chỉ, duy nhất). Cấu trúc này nhấn mạnh rằng hành động đó là bắt buộc, không thể thay thế và không còn sự lựa chọn nào khác ('nhất thiết phải...', 'bắt buộc phải...'). Ngoài ra, vĩ tố liên kết '아/어/여야만' còn dùng để nối hai vế với ý nghĩa 'chỉ khi làm việc ở vế trước thì vế sau mới có thể xảy ra'. Nguyên âm cuối 'ㅏ, ㅗ' kết hợp với '-아야만 하다', các nguyên âm khác kết hợp với '-어야만 하다', động từ '하다' chuyển thành '-해야만 하다'.",
    "formation": "Thân động từ·tính từ (nguyên âm ㅏ, ㅗ) + 아야만 하다 / Thân động từ·tính từ (nguyên âm khác) + 어야만 하다 / Động từ 하다 + 해야만 하다",
    "examples": [
      {
        "translation": "Tất cả học sinh đều nhất định phải chuẩn bị cho kỳ thi, nếu không thì sẽ bị trượt."
      },
      {
        "translation": "Bây giờ tôi phải đi ngay lập tức. Nếu muộn thì sẽ bị lỡ chuyến bay."
      },
      {
        "translation": "Cậu phải hoàn thành xong công việc này thì mới có thể về nhà được."
      },
      {
        "translation": "Chúng ta bắt buộc phải giãn cơ mỗi sáng để duy trì sức khỏe."
      }
    ]
  },
  "ko_아어여도_18": {
    "title": "아/어/여도 되다 (Làm gì đó cũng được / được phép làm gì)",
    "shortExplanation": "Dùng để xin phép hoặc cho phép thực hiện một hành động nào đó ('làm... được không?', 'làm... cũng được').",
    "longExplanation": "'아/어/여도 되다' được tạo thành từ vĩ tố liên kết nhượng bộ '-아/어/여도' (dù có...) kết hợp với động từ '되다' (được, trở nên ổn). Cấu trúc này dùng để diễn đạt sự cho phép hoặc tán thành một hành động nào đó. Ở dạng câu nghi vấn ('-아/어/여도 돼요?', '-아/어/여도 될까요?'), cấu trúc mang nghĩa xin phép lịch sự ('tôi làm... có được không?'). Ở dạng câu trần thuật, nó khẳng định rằng việc đó hoàn toàn được chấp nhận hoặc không có vấn đề gì ('bạn làm... cũng được'). Dạng phủ định cấm đoán tương ứng là '-아/어/여서는 안 되다' (không được làm...).",
    "formation": "Thân động từ·tính từ (nguyên âm ㅏ, ㅗ) + 아도 되다 / Thân động từ·tính từ (nguyên âm khác) + 어도 되다 / Động từ 하다 + 해도 되다 / Danh từ + (이)어도 되다",
    "examples": [
      {
        "translation": "Tôi có thể ngồi vào chỗ này được không ạ? Chỉ được ngồi khi chưa có người khác đặt trước thôi."
      },
      {
        "translation": "Ngày mai tôi dùng Photoshop có được không? Vì dự án của tôi đang cần dùng đến."
      },
      {
        "translation": "Có nơi nào có thể nghe nhạc lớn tiếng được không ạ? Vì tôi rất thích nhạc rock."
      },
      {
        "translation": "Dù trời mưa tôi vẫn có thể đá bóng được. Vì tôi cực kỳ thích mưa."
      }
    ]
  },
  "ko_아어여서는_19": {
    "title": "아/어/여서는 안 되다 (Không được làm gì / cấm làm gì)",
    "shortExplanation": "Biểu thị sự ngăn cấm, không được phép thực hiện một hành động nào đó theo quy định, đạo đức hoặc lẽ thường.",
    "longExplanation": "'아/어/여서는 안 되다' là mẫu câu thể hiện sự cấm đoán mang tính nghiêm túc, quy phạm. Nó mang nghĩa 'không được làm...', 'không nên làm...'. Trong cấu trúc này, '-아/어/여서' kết hợp với trợ từ nhấn mạnh chủ đề '는' tạo thành '-아/어/여서는' (nếu làm như vậy thì...), kết hợp cùng '안 되다' (sẽ không được/không ổn). Nó thường dùng trong các thông báo quy định công cộng, nguyên tắc làm việc hoặc lời khuyên răn đạo đức. Trong khẩu ngữ hàng ngày, người ta thường rút gọn '-아/어/여서는' thành '-아/어/여선' (ví dụ: 그러면 안 돼 / 해서는 안 돼).",
    "formation": "Thân động từ·tính từ (nguyên âm ㅏ, ㅗ) + 아서는 안 되다 / Thân động từ·tính từ (nguyên âm khác) + 어서는 안 되다 / Động từ 하다 + 해서는 안 되다",
    "examples": [
      {
        "translation": "Nhìn vào biển báo này thì ta không được hút thuốc ở đây."
      },
      {
        "translation": "Chúng ta không được lơ là sức khỏe của mình."
      },
      {
        "translation": "Công việc này cần phải làm thật tỉ mỉ, không được làm một cách lơ đãng, bất cẩn."
      },
      {
        "translation": "Vì có bài thi nghe nên giáo viên đã nhấn mạnh rằng không được bật điện thoại."
      }
    ]
  },
  "ko_아어서_20": {
    "title": "아/어서 (Vì... nên... / rồi thì...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị nguyên nhân - kết quả ('vì... nên...') hoặc trật tự thời gian diễn ra hai hành động có liên quan chặt chẽ ('rồi').",
    "longExplanation": "'아/어서' là một trong những vĩ tố liên kết cơ bản và quan trọng nhất trong tiếng Hàn. Cấu trúc có 2 chức năng chính: (1) Biểu thị nguyên nhân - lý do: Vế trước là nguyên nhân dẫn đến kết quả ở vế sau ('vì... nên...'). Chú ý: khi biểu thị lý do, vế trước không kết hợp với thì quá khứ '-았/었-' và đuôi câu không dùng câu mệnh lệnh (-(으)세요) hay rủ rê (-(으)ㅂ시다). (2) Biểu thị liên kết thời gian theo trật tự: Thực hiện hành động trước rồi tiếp tục hành động sau trên cùng một bối cảnh (ví dụ: 식당에 가서 밥을 먹었어요). Nguyên âm 'ㅏ, ㅗ' kết hợp với '-아서', các nguyên âm khác kết hợp với '-어서', và động từ '하다' chuyển thành '-해서'.",
    "formation": "Thân động từ·tính từ (nguyên âm ㅏ, ㅗ) + 아서 / Thân động từ·tính từ (nguyên âm khác) + 어서 / Động từ·tính từ 하다 + 해서 / Danh từ + (이)라서",
    "examples": [
      {
        "translation": "Hôm nay vì có nhiều việc nên tôi đã không thể đến trường được."
      },
      {
        "translation": "Vì phòng lạnh nên tôi đã mặc thêm nhiều áo ấm."
      },
      {
        "translation": "Anh ấy chăm chỉ tập thể dục nên duy trì được một cơ thể khỏe mạnh."
      },
      {
        "translation": "Vì chiều cao khiêm tốn nên tôi thấy khó tìm mua áo khoác ngoài."
      }
    ]
  },
  "ko_았었으면_21": {
    "title": "았/었으면 좋겠다 (Ước gì... / giá mà... thì tốt biết mấy)",
    "shortExplanation": "Dùng để bày tỏ mong ước, hy vọng về một tình huống hoặc sự việc trái với hiện thực hoặc mong đợi trong tương lai ('ước gì...', 'giá như...').",
    "longExplanation": "'았/었으면 좋겠다' là cấu trúc diễn đạt ước muốn hoặc hy vọng chân thành của người nói. Cấu trúc này được kết hợp bởi vĩ tố thì quá khứ '-았/었-', vĩ tố giả định điều kiện '-(으)면' và vị từ '좋겠다' (thì tốt biết mấy). Việc kết hợp với '-았/었-' nhấn mạnh một tình huống giả định khác với thực tế hiện tại, hoặc một ước mơ mạnh mẽ về tương lai mà chưa chắc đã xảy ra. Khi nguyên âm thân từ là 'ㅏ, ㅗ', dùng '-았으면 좋겠다'; các nguyên âm khác dùng '-었으면 좋겠다'; với '하다', dùng '-했으면 좋겠다'.",
    "formation": "Thân động từ·tính từ (nguyên âm ㅏ, ㅗ) + 았으면 좋겠다 / Thân động từ·tính từ (nguyên âm khác) + 었으면 좋겠다 / Động từ·tính từ 하다 + 했으면 좋겠다",
    "examples": [
      {
        "translation": "Giá mà có nhiều thời gian thì tốt biết mấy, như thế thì tôi đã có thể đọc nhiều sách hơn rồi."
      },
      {
        "translation": "Ước gì ngày mai trời mưa, có như vậy thì chúng ta mới có thể nghỉ ngơi mát mẻ hơn được."
      },
      {
        "translation": "Giá mà cô ấy hiểu lời tôi hơn thì tốt. Như vậy chúng tôi sẽ có thể chia sẻ ý kiến cùng nhau tốt hơn."
      },
      {
        "translation": "Ước gì cuối tuần này thời tiết đẹp, thế thì chắc là có thể đi dã ngoại được."
      }
    ]
  },
  "ko_어아야_22": {
    "title": "아/어야 하다 (Phải làm gì / cần phải làm gì)",
    "shortExplanation": "Biểu thị tính tất yếu, nghĩa vụ hoặc bổn phận cần phải thực hiện một hành vi nào đó ('phải...', 'cần phải...').",
    "longExplanation": "'아/어야 하다' là cấu trúc ngữ pháp cơ bản dùng để diễn đạt nghĩa vụ, bổn phận hoặc sự cần thiết khách quan của một hành động. Trong nhiều trường hợp, '하다' có thể được thay thế bằng '되다' tạo thành '아/어야 되다' mang sắc thái mềm mại hơn và được dùng rất phổ biến trong văn nói hàng ngày. Nguyên âm cuối của thân từ là 'ㅏ, ㅗ' kết hợp với '-아야 하다', các nguyên âm khác kết hợp với '-어야 하다', động từ '하다' chuyển thành '-해야 하다'. Khi nói về danh từ, cấu trúc sẽ là '-(이)어야 하다'.",
    "formation": "Thân động từ·tính từ (nguyên âm ㅏ, ㅗ) + 아야 하다 / Thân động từ·tính từ (nguyên âm khác) + 어야 하다 / Động từ 하다 + 해야 하다 / Danh từ + (이)어야 하다",
    "examples": [
      {
        "translation": "Vì ngày mai có bài thi nên tối nay tôi phải học bài."
      },
      {
        "translation": "Chúng tôi phải dọn dẹp nhà cửa vào cuối tuần này."
      },
      {
        "translation": "Vì bạn bị cảm cúm rồi nên chắc là phải uống thuốc thôi."
      },
      {
        "translation": "Vì sáng mai phải dậy sớm nên tôi phải đi ngủ ngay bây giờ."
      }
    ]
  },
  "ko_어아도_23": {
    "title": "아/어도 (Dù... cho dù... / dẫu có... thì...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị sự nhượng bộ, chỉ ra rằng dù giả thiết ở vế trước có xảy ra thì vế sau vẫn diễn ra hoặc không bị ảnh hưởng ('dù... thì cũng...').",
    "longExplanation": "'아/어도' là vĩ tố liên kết nhượng bộ, dùng để nối hai vế câu biểu đạt rằng kết quả ở vế sau không phụ thuộc vào tiền đề hay giả định ở vế trước ('cho dù... thì vẫn...'). Cấu trúc này thường đi kèm với các phó từ như '아무리' (dù thế nào chăng nữa) để nhấn mạnh sự nhượng bộ. Nguyên âm cuối của thân từ là 'ㅏ, ㅗ' kết hợp với '-아도', các nguyên âm khác kết hợp với '-어도', động từ '하다' chuyển thành '-해도'. Khi kết hợp với danh từ, dạng sử dụng là '-(이)라도' hoặc '-(이)어도'.",
    "formation": "Thân động từ·tính từ (nguyên âm ㅏ, ㅗ) + 아도 / Thân động từ·tính từ (nguyên âm khác) + 어도 / Động từ·tính từ 하다 + 해도 / Danh từ + (이)라도 / (이)어도",
    "examples": [
      {
        "translation": "Dù trời có mưa đi nữa thì tôi vẫn sẽ tiếp tục đi bộ, vì đó là cách nhanh nhất."
      },
      {
        "translation": "Dù có nói là mệt mỏi đến đâu thì tôi vẫn phải tiếp tục làm việc, bởi vì tôi cần phải giải quyết xong công việc này."
      },
      {
        "translation": "Cho dù là vấn đề nan giải thì tôi cũng sẽ không từ bỏ mà tiếp tục thử sức, vì tôi vốn yêu thích sự thử thách."
      },
      {
        "translation": "Dẫu kết quả thi cử có không tốt thì tôi vẫn sẽ phấn đấu nhiều hơn. Tôi tin rằng thất bại là mẹ thành công."
      }
    ]
  },
  "ko_어아_24": {
    "title": "아/어 버리다 (...mất rồi / làm xong sạch trơn)",
    "shortExplanation": "Động từ bổ trợ biểu thị hành động đã hoàn tất trọn vẹn, thường đi kèm cảm xúc tiếc nuối, hối hận hoặc ngược lại là cảm giác trút bỏ gánh nặng nhẹ nhõm.",
    "longExplanation": "'아/어 버리다' là cấu trúc trợ động từ kết hợp với thân động từ để nhấn mạnh một hành vi đã kết thúc hoàn toàn và không còn vương vấn gì. Cấu trúc này thường mang hai sắc thái cảm xúc tùy theo ngữ cảnh: (1) Biểu thị sự tiếc nuối, hối hận hoặc chuyện xảy ra ngoài ý muốn ('lỡ... mất rồi', ví dụ: 놓쳐 버렸어요 - lỡ để tuột mất); (2) Biểu thị cảm giác trút được gánh nặng, giải tỏa tâm trạng nhẹ nhõm sau khi làm xong việc gì khó khăn (ví dụ: 숙제를 다 끝내 버렸어요 - làm xong sạch bài tập rồi, nhẹ cả người). Nguyên âm cuối 'ㅏ, ㅗ' kết hợp với '-아 버리다', các nguyên âm khác kết hợp với '-어 버리다', động từ '하다' chuyển thành '-해 버리다'.",
    "formation": "Thân động từ (nguyên âm ㅏ, ㅗ) + 아 버리다 / Thân động từ (nguyên âm khác) + 어 버리다 / Động từ 하다 + 해 버리다",
    "examples": [
      {
        "translation": "Tôi đã lỡ để lọt mất chuyến công tác quan trọng nên bị giám đốc mắng."
      },
      {
        "translation": "Bạn tôi làm hỏng mất chiếc túi của tôi nên đồ đạc bên trong bị đổ tung tóe ra hết."
      },
      {
        "translation": "Nếu không đạp phanh thì xe sẽ tông vào nhau và mọi người đều có thể bị thương."
      },
      {
        "translation": "Tôi vô tình nghe phải những lời đó mất rồi nên tâm trạng trở nên rất tồi tệ."
      }
    ]
  },
  "ko_으면면_25": {
    "title": "(으)면 (Nếu... thì... / khi...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị điều kiện tiền đề hoặc một tình huống giả định ('nếu... thì...').",
    "longExplanation": "'(으)면' là vĩ tố liên kết cơ bản và quan trọng nhất để biểu đạt giả định hoặc điều kiện trong tiếng Hàn ('nếu...', 'hễ... thì...'). Vế trước là điều kiện tiền đề để hành động hoặc trạng thái ở vế sau có thể thành hiện thực. Ngoài ra, cấu trúc này còn dùng để chỉ thói quen lặp lại mang tính quy luật tự nhiên ('khi/hễ... thì...'). Quy tắc kết hợp: thân động từ hoặc tính từ có phụ âm cuối (ngoại trừ ㄹ) kết hợp với '-으면'; thân từ không có phụ âm cuối hoặc có phụ âm cuối là 'ㄹ' kết hợp với '-면'. Danh từ kết hợp với '-(이)면'.",
    "formation": "Thân động từ·tính từ (có phụ âm cuối trừ ㄹ) + 으면 / Thân động từ·tính từ (không phụ âm cuối hoặc phụ âm cuối ㄹ) + 면 / Danh từ + (이)면",
    "examples": [
      {
        "translation": "Nếu trời mưa thì bạn cần mang theo ô dù nhé."
      },
      {
        "translation": "Nếu có thời gian, tôi sẽ thử đọc thêm vài cuốn sách."
      },
      {
        "translation": "Nếu xem phim thì bạn sẽ hiểu dễ dàng hơn đấy."
      },
      {
        "translation": "Nếu thời tiết đẹp thì tôi sẽ ra ngoài đi dạo."
      }
    ]
  },
  "ko_을를_26": {
    "title": "~을/를 빼다 (Ngoại trừ, trừ ... ra)",
    "shortExplanation": "Biểu thị việc loại trừ một đối tượng, hành động hoặc sự vật nào đó ra khỏi một tập hợp hay phạm vi.",
    "longExplanation": "'~을/를 빼다' (trong khẩu ngữ thường dùng ở dạng '~을/를 빼고' hoặc '~을/를 빼고요') mang ý nghĩa 'ngoại trừ', 'trừ ... ra', dùng để biểu thị việc loại bỏ một người, sự vật hoặc hành động ra khỏi một phạm vi hay tổng thể nào đó. Đứng trước là danh từ (hoặc cụm danh từ hóa dạng '-는 것을'), đi kèm tiểu từ tân ngữ '을/를' và động từ '빼다' (trừ đi, bỏ ra).",
    "formation": "Danh từ có patchim + 을 빼다 / Danh từ không có patchim + 를 빼다 (khẩu ngữ: Danh từ + 을/를 빼고)",
    "examples": [
      {
        "translation": "Anh ấy chẳng làm gì cả, ngoại trừ việc vẽ tranh."
      },
      {
        "translation": "Tất cả học sinh đều tập thể dục sau giờ học, trừ tôi ra vì tôi bị ốm."
      },
      {
        "translation": "Tôi thích tất cả các loại trái cây, ngoại trừ quả anh đào."
      },
      {
        "translation": "Cho đến nay tôi đã xem tất cả các phim, trừ phim hài."
      }
    ]
  },
  "ko_을를_27": {
    "title": "-(으)ㄹ 수 있다 (Có thể làm gì)",
    "shortExplanation": "Vĩ tố kết thúc câu biểu thị năng lực của chủ ngữ hoặc tính khả thi của một hành động, sự việc ('có thể').",
    "longExplanation": "'-(으)ㄹ 수 있다' là cấu trúc biểu thị khả năng hoặc tính khả thi trong tiếng Hàn, tương đương với 'có thể' trong tiếng Việt. Cấu trúc này chỉ rõ rằng chủ ngữ có đủ năng lực để làm việc gì đó hoặc hoàn cảnh khách quan cho phép hành động có thể diễn ra. Thân động từ kết thúc bằng phụ âm (ngoại trừ ㄹ) kết hợp với '-을 수 있다'; thân động từ kết thúc bằng nguyên âm hoặc phụ âm 'ㄹ' kết hợp với '-ㄹ 수 있다'. Trái nghĩa là '-(으)ㄹ 수 없다' (không thể).",
    "formation": "Thân động từ (kết thúc bằng phụ âm trừ ㄹ) + 을 수 있다 / Thân động từ (kết thúc bằng nguyên âm hoặc ㄹ) + ㄹ 수 있다",
    "examples": [
      {
        "translation": "Chúng ta có thể giải quyết vấn đề này. Tôi nghĩ rằng nếu mọi người cùng hợp tác thì hoàn toàn có thể làm được."
      },
      {
        "translation": "Tôi nghĩ ngày mai mình có thể tham gia cuộc họp đó, may là tôi không có lịch trình nào khác."
      },
      {
        "translation": "Nếu bạn học bơi thì một ngày nào đó bạn sẽ có thể bơi lội thỏa thích, cứ nỗ lực là làm được thôi."
      },
      {
        "translation": "Nếu chăm chỉ học tiếng Hàn thì cậu ấy sẽ có thể đỗ kỳ thi TOPIK, và nhất định sẽ thành công."
      }
    ]
  },
  "ko_을를_28": {
    "title": "~을/를 통해(서) (Thông qua, qua)",
    "shortExplanation": "Biểu thị phương tiện, phương pháp, người trung gian hoặc kênh mà qua đó một hành động được thực hiện.",
    "longExplanation": "'~을/를 통해(서)' gắn sau danh từ để biểu thị phương tiện, con đường, người trung gian hoặc môi trường mà qua đó người nói học hỏi, truyền đạt thông tin hoặc đạt được một mục tiêu nào đó (tương đương 'thông qua', 'qua'). Danh từ có patchim kết hợp với '을 통해(서)', danh từ không có patchim kết hợp với '를 통해(서)'.",
    "formation": "Danh từ có patchim + 을 통해(서) / Danh từ không có patchim + 를 통해(서)",
    "examples": [
      {
        "translation": "Tôi đã học tiếng Hàn thông qua phim truyền hình, vì thế tôi tiếp thu các cách diễn đạt tự nhiên hơn."
      },
      {
        "translation": "Chúng tôi đã điều chỉnh lịch họp thông qua email. Quản lý thời gian theo cách đó hiệu quả hơn nhiều."
      },
      {
        "translation": "Anh ấy thường bộc lộ cảm xúc thông qua âm nhạc. Âm nhạc là phương tiện giao tiếp tốt nhất đối với anh ấy."
      },
      {
        "translation": "Thông qua các bức ảnh, chúng ta có thể thấu hiểu và đồng cảm với cuộc sống thường nhật của người khác."
      }
    ]
  },
  "ko_을까_29": {
    "title": "-(으)ㄹ까 (Nhé?, liệu rằng...?)",
    "shortExplanation": "Vĩ tố kết thúc câu nghi vấn dùng để rủ rê, đề xuất đối phương cùng làm gì ('nhé?') hoặc tự hỏi, phỏng đoán ('nhỉ?', 'liệu rằng?').",
    "longExplanation": "'-(으)ㄹ까' là vĩ tố kết thúc câu nghi vấn dạng thân mật (thêm '요' thành '-(으)ㄹ까요' mang sắc thái lịch sự). Cấu trúc này thường dùng trong hai trường hợp chính: (1) Rủ rê, đề xuất đối phương cùng làm một việc gì đó ('Chúng mình... nhé?'); (2) Biểu thị sự phân vân, phỏng đoán hoặc tự hỏi bản thân về một việc nào đó ('Liệu có... không nhỉ?'). Thân động từ kết thúc bằng phụ âm (trừ ㄹ) kết hợp với '-을까', kết thúc bằng nguyên âm hoặc phụ âm 'ㄹ' kết hợp với '-ㄹ까'.",
    "formation": "Thân động từ (kết thúc bằng phụ âm trừ ㄹ) + 을까 / Thân động từ (kết thúc bằng nguyên âm hoặc ㄹ) + ㄹ까",
    "examples": [
      {
        "translation": "Cuối tuần này chúng mình đi cắm trại thử nhé?"
      },
      {
        "translation": "Ngày mai xem phim nhé?"
      },
      {
        "translation": "Tối nay chúng mình đi ăn tối ở nhà hàng nhé?"
      },
      {
        "translation": "Học xong ở trung tâm thì tụi mình cùng nhau học bài nhé?"
      }
    ]
  },
  "ko_을래_30": {
    "title": "-(으)ㄹ래(요) (Muốn làm gì, sẽ làm gì)",
    "shortExplanation": "Vĩ tố kết thúc câu khẩu ngữ dùng để bày tỏ ý định, mong muốn của người nói hoặc hỏi ý muốn của đối phương.",
    "longExplanation": "'-(으)ㄹ래(요)' là vĩ tố kết thúc câu thân mật trong khẩu ngữ tiếng Hàn, dùng để: (1) Thể hiện ý muốn hoặc quyết định của bản thân người nói ('Tôi muốn...', 'Tôi sẽ...'); (2) Khi dùng ở dạng câu hỏi, dùng để hỏi nhẹ nhàng ý muốn của người nghe ('Cậu có muốn... không?'). Thân động từ kết thúc bằng phụ âm (ngoại trừ ㄹ) kết hợp với '-을래(요)'; thân động từ kết thúc bằng nguyên âm hoặc phụ âm 'ㄹ' kết hợp với '-ㄹ래(요)'. Thêm '요' vào cuối câu để biểu thị sự lịch sự.",
    "formation": "Thân động từ (kết thúc bằng phụ âm trừ ㄹ) + 을래(요) / Thân động từ (kết thúc bằng nguyên âm hoặc ㄹ) + ㄹ래(요)",
    "examples": [
      {
        "translation": "Tối nay tôi muốn đi xem phim. Cậu cũng muốn đi cùng không?"
      },
      {
        "translation": "Tôi muốn ăn tối ở nhà. So với ăn ngoài thì tôi thích cơm nhà hơn."
      },
      {
        "translation": "Cuối tuần này tôi muốn đi leo núi cùng bạn bè. Tôi cảm thấy mình cần phải vận động một chút."
      },
      {
        "translation": "Từ ngày mai tôi muốn bắt đầu ăn kiêng. Dạo gần đây hình như tôi bị tăng cân nhiều rồi."
      }
    ]
  },
  "ko_을지라도_31": {
    "title": "-(으)ㄹ지라도 (Cho dù... đi chăng nữa)",
    "shortExplanation": "Vĩ tố liên kết nhượng bộ mạnh, biểu thị rằng dù điều kiện ở vế trước có xảy ra thì vế sau vẫn diễn ra hoặc không hề thay đổi.",
    "longExplanation": "'-(으)ㄹ지라도' là vĩ tố liên kết mang tính nhượng bộ mạnh, thường dùng trong văn viết hoặc văn phong trang trọng, tương đương với 'cho dù... đi chăng nữa', 'dù có... thì...'. Cấu trúc này nhấn mạnh rằng dù giả định hoặc sự thật ở vế trước có khó khăn, bất lợi hay như thế nào thì kết quả, hành động hay quyết tâm ở vế sau vẫn giữ nguyên. Thân động từ hoặc tính từ kết thúc bằng phụ âm (trừ ㄹ) kết hợp với '-을지라도'; kết thúc bằng nguyên âm hoặc phụ âm 'ㄹ' kết hợp với '-ㄹ지라도'.",
    "formation": "Thân động từ/tính từ (kết thúc bằng phụ âm trừ ㄹ) + 을지라도 / Thân động từ/tính từ (kết thúc bằng nguyên âm hoặc ㄹ) + ㄹ지라도",
    "examples": [
      {
        "translation": "Cho dù vấn đề có khó khăn đi chăng nữa thì xin đừng bỏ cuộc. Rốt cuộc rồi bạn cũng sẽ giải quyết được thôi."
      },
      {
        "translation": "Dù cuốn sách này có đắt đi chăng nữa, vì rất cần thiết nên nhất định tôi phải mua."
      },
      {
        "translation": "Cho dù kỳ thi có khó đến đâu, nếu chăm chỉ ôn tập thì chắc chắn sẽ có kết quả tốt."
      },
      {
        "translation": "Cho dù thời tiết có lạnh giá, vì đã có hẹn với bạn bè nên tôi nhất định phải ra ngoài."
      }
    ]
  },
  "ko_을지언정_32": {
    "title": "-(으)ㄹ지언정 (Thà... còn hơn, cho dù... thì cũng)",
    "shortExplanation": "Vĩ tố liên kết nhượng bộ diễn tả thái độ kiên quyết chấp nhận vế trước hoặc đối chiếu nhượng bộ ('cho dù... thì cũng', 'thà... còn hơn').",
    "longExplanation": "'-(으)ㄹ지언정' là vĩ tố liên kết mang sắc thái nhượng bộ trang trọng hoặc biểu thị thái độ kiên quyết: (1) Diễn tả ý 'cho dù chấp nhận tình huống vế trước thì vế sau vẫn giữ vững sự quan trọng'; (2) Thường mang cấu trúc 'thà chấp nhận điều xấu ở vế trước còn hơn làm điều tồi tệ hơn ở vế sau' (tương đương 'thà... chứ không...'). Thân động từ hoặc tính từ có phụ âm cuối (trừ ㄹ) kết hợp với '-을지언정', không có phụ âm cuối hoặc kết thúc bằng 'ㄹ' kết hợp với '-ㄹ지언정'.",
    "formation": "Thân động từ/tính từ (kết thúc bằng phụ âm trừ ㄹ) + 을지언정 / Thân động từ/tính từ (kết thúc bằng nguyên âm hoặc ㄹ) + ㄹ지언정",
    "examples": [
      {
        "translation": "Dù có thi trượt đi chăng nữa thì việc tiếp tục nỗ lực hướng về mục tiêu vẫn là điều quan trọng."
      },
      {
        "translation": "Dù rằng mùa xuân đã đến rồi nhưng thời tiết vẫn còn rất lạnh."
      },
      {
        "translation": "Dù căn phòng có rộng rãi, nếu không dọn dẹp thì cũng sẽ trở nên bừa bộn thôi."
      },
      {
        "translation": "Dù tôi có gọi điện cho cô ấy đi nữa thì cũng chẳng biết cô ấy có bắt máy hay không."
      }
    ]
  },
  "ko_이_33": {
    "title": "~이/가 되다 (Trở thành, biến thành, đến lúc)",
    "shortExplanation": "Đi sau danh từ để biểu thị sự biến đổi trạng thái, chuyển biến về nghề nghiệp, tư cách, thời gian hoặc tính chất ('trở thành').",
    "longExplanation": "'~이/가 되다' gắn ngay sau danh từ để biểu thị sự biến đổi về trạng thái, tính chất, thời gian, tuổi tác hoặc chức vụ/nghề nghiệp của một đối tượng, tương đương với 'trở thành', 'biến thành', 'đến (mùa/lúc)' trong tiếng Việt. Danh từ kết thúc bằng phụ âm (có patchim) kết hợp với '이 되다', danh từ kết thúc bằng nguyên âm (không patchim) kết hợp với '가 되다'. Dạng phủ định là '~이/가 안 되다'.",
    "formation": "Danh từ có patchim + 이 되다 / Danh từ không có patchim + 가 되다",
    "examples": [
      {
        "translation": "Khi trời sang thu, thời tiết trở lạnh nên tôi cảm thấy áo len dệt kim là thực sự cần thiết."
      },
      {
        "translation": "Hồi còn học đại học tôi từng muốn trở thành luật sư, nhưng lên cao học tôi lại nảy ra suy nghĩ muốn trở thành giáo sư."
      },
      {
        "translation": "Vì học cùng các bạn nên tôi đang dần trở thành một học sinh tốt hơn."
      },
      {
        "translation": "Vết xước trên mặt cuối cùng đã biến thành một vết sẹo lớn."
      }
    ]
  },
  "ko_이나_34": {
    "title": "~(이)나 (Hoặc là, hay là, chọn đại)",
    "shortExplanation": "Trợ từ biểu thị sự lựa chọn giữa các đối tượng ('hoặc là', 'hay là'), hoặc biểu thị sự lựa chọn tạm thời, không tối ưu ('đành... vậy').",
    "longExplanation": "'~(이)나' là trợ từ đa năng trong tiếng Hàn. Khi liên kết hai hay nhiều danh từ, nó mang ý nghĩa lựa chọn một trong các phương án ('hoặc là', 'hay là'). Ngoài ra, khi đi một mình với danh từ trước động từ, nó biểu thị ý nghĩa chọn tạm một phương án thứ yếu khi không có lựa chọn nào tốt hơn ('làm tạm cái này vậy'). Danh từ có patchim kết hợp với '이나', không có patchim kết hợp với '나'.",
    "formation": "Danh từ có patchim + 이나 / Danh từ không có patchim + 나",
    "examples": [
      {
        "translation": "Cuối tuần này chúng tôi sẽ đi xem phim, hoặc là chỉ ở nhà chơi game thôi."
      },
      {
        "translation": "Tôi muốn vừa uống cà phê hay trà gì đó vừa nghỉ ngơi một chút."
      },
      {
        "translation": "Hôm nay hay ngày mai, lúc nào cũng đều được cả."
      },
      {
        "translation": "Tháng này tôi định đi du lịch, hoặc không thì ở nhà đọc sách thư giãn."
      }
    ]
  },
  "ko_이라도_35": {
    "title": "~(이)라도 (Dù là... đi nữa, ít nhất thì)",
    "shortExplanation": "Trợ từ biểu thị sự chấp nhận một phương án phụ, tạm bợ hoặc tối thiểu khi không có lựa chọn lý tưởng nhất ('dù là', 'ít nhất thì').",
    "longExplanation": "'~(이)라도' là trợ từ gắn sau danh từ, biểu thị sự nhượng bộ, chấp nhận một phương án tạm thời có thể chấp nhận được khi lựa chọn tốt nhất không thể thực hiện, tương đương với 'dù là...', 'ít nhất thì...'. Cấu trúc này mang sắc thái 'dù không phải là điều tốt nhất nhưng như thế này cũng tạm được'. Danh từ kết thúc bằng phụ âm kết hợp với '이라도', kết thúc bằng nguyên âm kết hợp với '라도'.",
    "formation": "Danh từ có patchim + 이라도 / Danh từ không có patchim + 라도",
    "examples": [
      {
        "translation": "Dù giá cả đắt đỏ đi nữa, tôi cũng phải mua ít đồ ăn ở đằng kia ăn tạm. Bởi vì không ăn thì sẽ chẳng có sức."
      },
      {
        "translation": "Hôm nay lịch trình rất bận rộn, nhưng ít nhất bữa tối tôi cũng phải ăn cho đàng hoàng."
      },
      {
        "translation": "Tính cách anh ấy không tốt lắm, nhưng ít nhất công việc làm tốt nên vẫn là người quan trọng trong nhóm."
      },
      {
        "translation": "Dù nghe nói kỳ thi khó, thì ít nhất tôi cũng phải nắm bắt được tình hình đang diễn ra ở mức độ nào đó."
      }
    ]
  },
  "ko_이랑_36": {
    "title": "~(이)랑 (Và, cùng với)",
    "shortExplanation": "Tiểu từ liên kết trong khẩu ngữ dùng để nối các danh từ ('và') hoặc chỉ đối tượng cùng thực hiện hành động ('cùng với').",
    "longExplanation": "'~(이)랑' là tiểu từ liên kết thông dụng trong giao tiếp hằng ngày của người Hàn Quốc. Cấu trúc có hai chức năng chính: (1) Nối hai hay nhiều danh từ với nhau mang nghĩa 'và'; (2) Đi cùng với người hoặc đối tượng để biểu thị 'cùng với' (thường đi kèm với '같이' hoặc '함께'). Tiểu từ này thân mật hơn '과/와' và '하고'. Danh từ kết thúc bằng phụ âm (có patchim) kết hợp với '이랑', danh từ kết thúc bằng nguyên âm (không patchim) kết hợp với '랑'.",
    "formation": "Danh từ có patchim + 이랑 / Danh từ không có patchim + 랑",
    "examples": [
      {
        "translation": "Hôm nay tôi đã đi xem phim cùng với bạn."
      },
      {
        "translation": "Tôi đã gọi cà phê và bánh ngọt."
      },
      {
        "translation": "Chị gái và tôi đã mặc quần áo giống nhau."
      },
      {
        "translation": "Bố và mẹ tôi đang sống ở Seoul."
      }
    ]
  },
  "ko_이래_37": {
    "title": "~이래(로) (Kể từ khi, từ đó đến nay)",
    "shortExplanation": "Biểu thị mốc thời gian bắt đầu trong quá khứ mà từ đó sự việc, tình trạng kéo dài liên tục cho đến hiện tại ('kể từ khi').",
    "longExplanation": "'~이래(로)' gắn sau danh từ mốc thời gian hoặc sau dạng định từ thì quá khứ của động từ ('-(으)ㄴ 이래로'), biểu thị một thời điểm bắt đầu trong quá khứ mà trạng thái hoặc hành động tiếp diễn liên tục kể từ thời điểm đó cho tới nay (tương đương 'kể từ khi', 'từ dạo đó đến nay'). Đi kèm tiểu từ '로' ('이래로') giúp nhấn mạnh thêm tính liên tục của khoảng thời gian.",
    "formation": "Động từ dạng định từ quá khứ (-(으)ㄴ) + 이래(로) / Danh từ chỉ thời gian + 이래(로)",
    "examples": [
      {
        "translation": "Kể từ khi tôi sinh ra đến giờ, đây là mùa đông lạnh nhất mà tôi từng trải qua."
      },
      {
        "translation": "Đây là lần đầu tiên tôi gặp lại anh ấy kể từ khi anh ấy tốt nghiệp."
      },
      {
        "translation": "Kể từ khi chuyển nhà đến đây, tôi chưa kết bạn được với ai nên cảm thấy hơi cô đơn."
      },
      {
        "translation": "Kể từ lúc tan sở đến giờ tôi cứ bận rộn suốt nên chưa nghỉ ngơi được chút nào."
      }
    ]
  },
  "ko_이므로_38": {
    "title": "-(으)므로 / ~(이)므로 (Vì... nên, do...)",
    "shortExplanation": "Vĩ tố liên kết chỉ nguyên nhân, lý do mang tính trang trọng và khách quan ('vì... nên', 'do...').",
    "longExplanation": "'-(으)므로 / ~(이)므로' là vĩ tố liên kết biểu thị nguyên nhân, lý do trong văn viết, tin tức thời sự, thông báo hoặc các bài phát biểu trang trọng, tương đương với 'vì... nên', 'do...'. Cấu trúc này nêu lên một nguyên nhân mang tính khách quan, logic dẫn đến kết quả ở vế sau. Với động từ/tính từ: thân từ kết thúc bằng phụ âm (trừ ㄹ) kết hợp với '-으므로', kết thúc bằng nguyên âm hoặc 'ㄹ' kết hợp với '-므로'. Với danh từ: có patchim kết hợp với '이므로', không có patchim kết hợp với '므로'. Lưu ý: sau cấu trúc này không dùng câu mệnh lệnh hay thỉnh dụ.",
    "formation": "Thân động từ/tính từ (kết thúc bằng phụ âm trừ ㄹ) + 으므로 / Thân động từ/tính từ (kết thúc bằng nguyên âm hoặc ㄹ) + 므로 / Danh từ + (이)므로",
    "examples": [
      {
        "translation": "Hôm nay trời mưa nên tôi đã mang theo ô."
      },
      {
        "translation": "Vì cô ấy đạt thành tích xuất sắc nên mọi người đều kinh ngạc."
      },
      {
        "translation": "Vì công việc này khó nên phải làm cẩn thận."
      },
      {
        "translation": "Do tình hình nghiêm trọng nên xin đừng hoãn việc điều trị sang ngày mai."
      }
    ]
  },
  "ko_이어서_39": {
    "title": "-아/어서 / ~(이)어서 (Vì... nên, rồi thì)",
    "shortExplanation": "Vĩ tố liên kết diễn tả nguyên nhân - kết quả ('vì... nên') hoặc trình tự hai hành động diễn ra liên tiếp ('rồi, rồi thì').",
    "longExplanation": "'-아/어서' (với danh từ là '~(이)어서') là vĩ tố liên kết cơ bản và cực kỳ phổ biến trong tiếng Hàn với hai chức năng chính: (1) Chỉ nguyên nhân - kết quả: vế trước là lý do dẫn đến sự việc ở vế sau ('vì... nên'); (2) Chỉ trình tự thời gian gắn liền: hành động ở vế trước diễn ra trước rồi nối tiếp hành động ở vế sau trong cùng một tiến trình ('làm... rồi làm...'). Nếu nguyên âm cuối của thân động từ/tính từ là 'ㅏ, ㅗ', kết hợp với '-아서'; các nguyên âm còn lại kết hợp với '-어서'; động từ kết thúc bằng '하다' chuyển thành '해서'. Với danh từ: có patchim kết hợp với '이어서', không patchim kết hợp với '여서'.",
    "formation": "Thân động từ/tính từ có nguyên âm ㅏ, ㅗ + 아서 / Các nguyên âm còn lại + 어서 / 하다 -> 해서 / Danh từ + (이)어서",
    "examples": [
      {
        "translation": "Hôm nay tôi về nhà sớm rồi đọc sách. Sau đó tôi đi ngủ ngay."
      },
      {
        "translation": "Sáng nay trời mưa nên khó ra ngoài, vì thế tôi đã nghỉ ngơi ở nhà."
      },
      {
        "translation": "Tôi đã đi gặp bạn và chúng tôi cùng nhau ăn những món ăn ngon."
      },
      {
        "translation": "Tôi thấy một chú mèo và vì nó quá dễ thương nên tôi đã chụp một bức ảnh."
      }
    ]
  },
  "ko_이지만_40": {
    "title": "-지만 / ~(이)지만 (Nhưng, tuy... nhưng)",
    "shortExplanation": "Vĩ tố liên kết tương phản dùng để nối hai vế câu có nội dung đối lập hoặc trái ngược nhau ('nhưng', 'tuy... nhưng').",
    "longExplanation": "'-지만' (sau danh từ là '~(이)지만') là vĩ tố liên kết biểu thị sự tương phản rất phổ biến trong tiếng Hàn, tương đương với 'nhưng', 'tuy... nhưng' trong tiếng Việt. Cấu trúc này liên kết hai vế câu, trong đó vế sau đưa ra một sự thật, tình huống hoặc ý kiến trái ngược so với nội dung đã nêu ở vế trước. Thân động từ và tính từ gắn trực tiếp với '-지만' mà không phụ thuộc vào patchim. Với danh từ: có patchim kết hợp với '이지만', không có patchim kết hợp với '지만'. Cấu trúc này cũng có thể kết hợp với các vĩ tố thì quá khứ (dạng '-았/었지만').",
    "formation": "Thân động từ/tính từ + 지만 / Danh từ có patchim + 이지만 / Danh từ không có patchim + 지만 / Thân từ + 았/었지만",
    "examples": [
      {
        "translation": "Thời tiết thực sự rất đẹp, nhưng tôi lại không có thời gian ra ngoài."
      },
      {
        "translation": "Tôi rất thích bánh pizza, nhưng vì đang ăn kiêng nên không thể ăn được."
      },
      {
        "translation": "Bài hát này rất nổi tiếng, nhưng tôi lại không thích cho lắm."
      },
      {
        "translation": "Bạn tôi đã hứa sẽ cho tôi tiền, nhưng tôi vẫn chưa nhận được."
      }
    ]
  },
  "ko_인는데_41": {
    "title": "~인/는데 (Nhưng, thì, đưa ra tiền đề/bối cảnh)",
    "shortExplanation": "Vĩ tố liên kết dùng để nối hai mệnh đề, thể hiện sự tương phản ('nhưng'), đưa ra bối cảnh/tiền đề, hoặc gợi mở nguyên nhân/lý do cho vế sau.",
    "longExplanation": "'~인/는데' là vĩ tố liên kết câu biểu thị nhiều sắc thái ngữ nghĩa tùy thuộc ngữ cảnh: (1) Diễn tả sự tương phản, đối lập giữa hai mệnh đề ('nhưng', 'tuy nhiên'); (2) Cung cấp bối cảnh, giải thích tình huống làm tiền đề cho câu hỏi, đề nghị hoặc hành động ở vế sau ('thì', 'mà'); (3) Gợi mở lý do, nguyên nhân gián tiếp. Về mặt kết hợp: Danh từ kết hợp với '-(이)nde' (có patchim: '인데', không patchim: '인데'); Tính từ kết hợp với '-(으)ㄴ데'; Động từ ở thì hiện tại kết hợp với '-는데'; các dạng quá khứ '-았/었-' hoặc tương lai '-겠-' đều kết hợp với '-는데'.",
    "formation": "1) Danh từ + 인데\n2) Thân tính từ (kết thúc bằng phụ âm trừ ㄹ) + 은데 / Thân tính từ (kết thúc bằng nguyên âm hoặc ㄹ) + ㄴ데\n3) Thân động từ + 는데",
    "examples": [
      {
        "translation": "Hôm nay thời tiết đẹp nhưng chắc tôi không ra ngoài đâu. Tôi sẽ ở nhà xem phim."
      },
      {
        "translation": "Đáng lẽ tôi đã có thể ngủ ngon giấc, nhưng tiếng chuông báo thức reo làm tôi tỉnh giấc."
      },
      {
        "translation": "Tôi đang học tiếng Hàn nhưng phát âm khó quá nên thỉnh thoảng cảm thấy khá vất vả."
      },
      {
        "translation": "Quá trình phỏng vấn xin việc rất khó khăn, nhưng may mắn là tôi đã tìm được công việc này."
      }
    ]
  },
  "ko_자_42": {
    "title": "~자 (Cùng ... nhé, đi nào)",
    "shortExplanation": "Vĩ tố kết thúc câu thỉnh dụ thân mật, dùng để đề xuất người nghe cùng làm một việc gì đó ('cùng ... nhé', '... nào').",
    "longExplanation": "'~자' là vĩ tố kết thúc câu thuộc phong cách thân mật (banmal/hạ xưng), được gắn vào sau thân động từ để đề nghị, rủ rê đối phương cùng thực hiện một hành vi nào đó (tương đương 'cùng ... nhé', 'đi nào' trong tiếng Việt). Cấu trúc này chỉ được sử dụng giữa bạn bè đồng trang lứa, người thân thiết hoặc người lớn nói với người nhỏ tuổi hơn. Tuyệt đối không dùng với người lớn tuổi hoặc trong các tình huống trang trọng, lịch sự.",
    "formation": "Thân động từ + 자",
    "examples": [
      {
        "translation": "Tụi mình đi xem phim đi. Mình muốn xem bộ phim mới ra mắt ở đây."
      },
      {
        "translation": "Thời tiết bên ngoài đẹp thế này, tụi mình đi dạo đi."
      },
      {
        "translation": "Từ bây giờ hãy bắt đầu học thôi. Sắp thi rồi mà mình vẫn chưa nắm chắc các khái niệm."
      },
      {
        "translation": "Ăn trưa no nê rồi, tụi mình nghỉ ngơi một lát đi. Bụng mình no quá rồi."
      }
    ]
  },
  "ko_자마자_43": {
    "title": "~자마자 (Ngay sau khi, vừa mới ... thì đã)",
    "shortExplanation": "Vĩ tố liên kết biểu thị hành động ở vế sau diễn ra ngay tức thì sau khi hành động ở vế trước kết thúc ('ngay sau khi', 'vừa ... thì đã').",
    "longExplanation": "'~자마자' gắn vào sau thân động từ để biểu thị sự tiếp nối thời gian vô cùng nhanh chóng: hành động ở mệnh đề trước vừa kết thúc thì hành động ở mệnh đề sau lập tức diễn ra mà không có bất kỳ khoảng trống thời gian nào (tương đương 'ngay sau khi', 'vừa mới ... thì đã' trong tiếng Việt). Dù hành động xảy ra trong quá khứ thì thì quá khứ '-았/었-' cũng không được kết hợp trực tiếp với '-자마자' mà phải chia ở vĩ tố kết thúc của mệnh đề sau. Cấu trúc này gắn trực tiếp vào thân động từ bất kể có phụ âm cuối hay không.",
    "formation": "Thân động từ + 자마자",
    "examples": [
      {
        "translation": "Ngay khi vừa đến trường tôi đã gặp người bạn của mình. Buổi sáng bận quá nên tôi thậm chí còn chẳng kịp gọi điện thoại."
      },
      {
        "translation": "Vừa mở cửa ra một cái là con mèo đã phóng vút ra ngoài. Rốt cuộc tôi phải đi tìm nó mất một hồi lâu."
      },
      {
        "translation": "Máy bay vừa hạ cánh là tôi bật điện thoại lên ngay. Bởi vì tôi đoán là sẽ có cuộc gọi quan trọng."
      },
      {
        "translation": "Vừa về đến nhà là tôi đi tắm ngay lập tức. Hôm nay thời tiết nóng quá."
      }
    ]
  },
  "ko_처럼_44": {
    "title": "~처럼 (Như, giống như)",
    "shortExplanation": "Trợ từ so sánh gắn sau danh từ, biểu thị sự tương đồng, giống nhau về hình dáng, tính chất hoặc phương thức ('như', 'giống như').",
    "longExplanation": "'~처럼' là trợ từ so sánh trong tiếng Hàn, được gắn trực tiếp vào sau danh từ (hoặc mệnh đề định ngữ danh từ hóa dạng '-는 것처럼') để so sánh đối tượng này có tính chất, diện mạo, trạng thái hoặc hành vi giống như đối tượng kia, tương đương với 'như', 'giống như' trong tiếng Việt. Cấu trúc này mang sắc thái ví von biểu cảm sinh động, có thể thay thế bằng '~같이' trong hầu hết các trường hợp. Gắn trực tiếp vào danh từ bất kể có phụ âm cuối hay không.",
    "formation": "Danh từ + 처럼 (hoặc Vĩ tố định ngữ + 것 + 처럼)",
    "examples": [
      {
        "translation": "Đôi mắt của anh ấy lấp lánh sáng ngời như những vì sao."
      },
      {
        "translation": "Bố tôi lúc nào cũng làm việc chăm chỉ như chú ngựa có thêm đôi cánh."
      },
      {
        "translation": "Cô ấy bơi giỏi như loài cá vậy."
      },
      {
        "translation": "Suốt cả ngày hôm nay, tôi đã tự do bay nhảy rong chơi như một chú chim."
      }
    ]
  },
  "ko_쯤_45": {
    "title": "~쯤 (Khoảng, chừng, tầm)",
    "shortExplanation": "Trợ từ biểu thị sự ước lượng, phỏng đoán xấp xỉ về thời gian, số lượng hoặc mức độ ('khoảng', 'chừng', 'tầm').",
    "longExplanation": "'쯤' là trợ từ được gắn liền ngay sau các danh từ chỉ thời gian, địa điểm, số lượng hoặc đơn vị đo lường để biểu thị con số ước chừng, xấp xỉ, tương đương với 'khoảng', 'chừng', 'độ chừng' trong tiếng Việt. Khi dùng kèm với '약' (khoảng) đứng đằng trước hoặc '정도' (chừng đó) thì ý nghĩa ước lượng càng được nhấn mạnh. Viết liền vào sau danh từ hoặc số đếm mà không cần dấu cách.",
    "formation": "Danh từ chỉ thời gian / số lượng / mức độ + 쯤",
    "examples": [
      {
        "translation": "Vì kỳ thi rất khó nên mỗi ngày bạn phải học khoảng 3 tiếng đồng hồ."
      },
      {
        "translation": "Từ nhà tôi nếu đi bằng xe buýt thì chắc mất tầm khoảng 20 phút."
      },
      {
        "translation": "Hôm nay trời nóng quá, tôi nghĩ nhiệt độ tầm khoảng 30 độ đấy."
      },
      {
        "translation": "Để đọc hết cuốn sách đó thì chắc sẽ mất khoảng chừng một tuần."
      }
    ]
  },
  "ko_지_46": {
    "title": "~지 않다 (Không làm gì, không như thế nào)",
    "shortExplanation": "Cấu trúc phủ định dài gắn sau thân động từ hoặc tính từ, biểu thị hành động không xảy ra hoặc trạng thái không như vậy ('không...').",
    "longExplanation": "'~지 않다' là hình thức phủ định dài trong tiếng Hàn, được gắn vào sau thân động từ hoặc tính từ để phủ định hành động, tính chất hoặc trạng thái tương ứng với 'không...' trong tiếng Việt. So với phủ định ngắn ('안 + động từ/tính từ'), '~지 않다' mang sắc thái trang trọng, khách quan và thường được ưa chuộng trong văn viết, phát biểu chính thức cũng như giao tiếp lịch sự. '않다' chia theo thì và phong cách câu như một động từ/tính từ thông thường.",
    "formation": "Thân động từ / Thân tính từ + 지 않다",
    "examples": [
      {
        "translation": "Tôi sẽ không tham gia cuộc họp lần này. Vào thời gian đó tôi có việc quan trọng khác."
      },
      {
        "translation": "Bố tôi không hút thuốc lá. Vì thế không khí trong nhà lúc nào cũng trong lành."
      },
      {
        "translation": "Cô ấy không để lộ nét mặt tươi cười nên có vẻ giữ khoảng cách với mọi người xung quanh."
      },
      {
        "translation": "Tôi không ăn thịt. Do đó tôi luôn tìm các món ăn chay."
      }
    ]
  },
  "ko_지만_47": {
    "title": "~지만 (Nhưng, tuy nhiên)",
    "shortExplanation": "Vĩ tố liên kết biểu thị sự tương phản, đối lập rõ ràng giữa nội dung của hai mệnh đề ('nhưng', 'tuy... nhưng').",
    "longExplanation": "'~지만' là vĩ tố liên kết chỉ sự đối lập thuần túy trong tiếng Hàn, tương đương với 'nhưng', 'tuy... nhưng' trong tiếng Việt. Người nói đưa ra một sự thật hoặc tình huống ở mệnh đề trước, sau đó đưa ra một sự việc trái ngược, mâu thuẫn hoặc nằm ngoài dự tính ở mệnh đề sau. Khác với '-(으)ㄴ/는데', '~지만' tập trung nhấn mạnh vào sự đối lập rõ ràng về mặt ý nghĩa. Cấu trúc này có thể kết hợp được với thì quá khứ ('-았/었지만') và tương lai ('-겠지만'). Danh từ có patchim kết hợp với '이지만', không patchim kết hợp với '지만'.",
    "formation": "Thân động từ / Thân tính từ + 지만, Danh từ có patchim + 이지만 / Danh từ không patchim + 지만",
    "examples": [
      {
        "translation": "Tôi đang rất mệt mỏi nhưng vì phải hoàn thành công việc này nên chắc tôi vẫn phải tiếp tục làm."
      },
      {
        "translation": "Món ăn đó không ngon nhưng chứa nhiều dinh dưỡng nên tôi vẫn phải ăn."
      },
      {
        "translation": "Trong số các bạn chắc cũng có người cảm thấy bài toán khó, nhưng không được từ bỏ đâu nhé."
      },
      {
        "translation": "Anh ấy có tính cách rất tốt nhưng lại hơi gặp khó khăn trong việc bày tỏ rõ ràng ý kiến của mình."
      }
    ]
  },
  "ko_지요죠_48": {
    "title": "~지요/~죠 (Đúng không nhỉ?, chứ?)",
    "shortExplanation": "Vĩ tố kết thúc câu dùng để xác nhận lại điều người nói tin rằng người nghe cũng đã biết, hoặc để tìm kiếm sự đồng tình ('đúng không?', 'chứ?').",
    "longExplanation": "'~지요' (khẩu ngữ thường rút gọn thành '~죠') là vĩ tố kết thúc câu thân mật lịch sự, dùng khi người nói muốn kiểm tra lại, xác nhận điều mà mình đã biết/đoán trước và cho rằng đối phương cũng đồng tình hoặc biết rõ (tương đương 'đúng không?', 'chứ nhỉ?' trong tiếng Việt). Ngoài ra, khi dùng ở câu trần thuật, nó thể hiện sự khẳng định chắc chắn một cách nhẹ nhàng, thân thiện. Có thể kết hợp được với thì quá khứ ('-았/었지요') và tương lai phỏng đoán ('-겠지요'). Gắn trực tiếp vào thân động từ, tính từ hoặc danh từ đi với '-(이)지요'.",
    "formation": "Thân động từ / Thân tính từ + 지요 (hoặc 죠), Danh từ có patchim + 이지요 / Danh từ không patchim + 지요",
    "examples": [
      {
        "translation": "Hôm nay thời tiết đẹp quá đúng không nào?"
      },
      {
        "translation": "Trước đây tụi mình từng học cùng một lớp đúng không nhỉ?"
      },
      {
        "translation": "Tụi mình phải hoàn thành xong công việc này đúng không?"
      },
      {
        "translation": "Bộ phim đó thực sự rất hay đúng không nào?"
      }
    ]
  },
  "ko_하고_49": {
    "title": "~하고 (Và, với, cùng với)",
    "shortExplanation": "Trợ từ liên từ dùng để nối hai danh từ ('và') hoặc đi cùng với ai đó làm gì ('với, cùng với').",
    "longExplanation": "'~하고' là trợ từ được sử dụng cực kỳ phổ biến trong khẩu ngữ hàng ngày của người Hàn Quốc. Nó có hai chức năng chính: (1) Nối hai hay nhiều danh từ với nhau mang ý nghĩa liệt kê ('và', 'với'); (2) Đi kèm với danh từ chỉ người/động vật để biểu thị đối tượng cùng tham gia thực hiện một hành động nào đó ('cùng với', 'với ai'). So với trợ từ mang tính văn viết như '~와/과', '~하고' mang sắc thái gần gũi, đời thường hơn. Gắn trực tiếp vào mọi danh từ mà không cần phân biệt có patchim hay không.",
    "formation": "Danh từ 1 + 하고 + Danh từ 2 (liệt kê: và) / Danh từ + 하고 (cùng với)",
    "examples": [
      {
        "translation": "Tôi đã gọi cà phê và bánh donut."
      },
      {
        "translation": "Chúng tôi đã ở bên nhau, cùng nhau trò chuyện và trải qua khoảng thời gian thật vui vẻ."
      },
      {
        "translation": "Tôi cho dâu tây và chuối vào máy xay sinh tố để làm món sinh tố."
      },
      {
        "translation": "Anh ấy đã ra công viên để đá bóng cùng với bạn của mình."
      }
    ]
  },
  "ko_하기로_50": {
    "title": "~하기로 하다 (Quyết định làm gì, hẹn làm gì)",
    "shortExplanation": "Cấu trúc biểu thị việc đưa ra quyết định, quyết tâm hoặc thỏa thuận sẽ thực hiện một hành động nào đó ('quyết định làm...').",
    "longExplanation": "'~하기로 하다' (cũng như '~하기로 결정하다 / 결심하다') gắn vào sau thân động từ để biểu thị việc người nói đưa ra quyết định, lời hứa hoặc kế hoạch thực hiện một hành vi nào đó trong tương lai (tương đương 'quyết định làm...', 'hẹn nhau làm...' trong tiếng Việt). Do quyết định thường đã được đưa ra trước thời điểm nói nên đuôi câu hầu hết được chia ở thì quá khứ ('-기로 했다 / 결정했다'). Gắn trực tiếp vào thân động từ bất kể có phụ âm cuối hay không.",
    "formation": "Thân động từ + 기로 하다 (hoặc 결정하다 / 결심하다)",
    "examples": [
      {
        "translation": "Chúng tôi đã quyết định ngày mai sẽ đi Seoul. Chúng tôi định gặp gỡ bạn bè ở đó."
      },
      {
        "translation": "Tôi đã quyết tâm tháng sau sẽ bắt đầu một công việc mới. Vì công việc hiện tại quá đỗi nhàm chán."
      },
      {
        "translation": "Gia đình chúng tôi đã hẹn nhau đi dã ngoại vào cuối tuần sau. Vì nghe nói thời tiết sẽ rất đẹp."
      },
      {
        "translation": "Tôi đã quyết định mỗi ngày sẽ đọc sách một tiếng đồng hồ. Vì đọc sách giúp vốn hiểu biết ngày càng tăng lên."
      }
    ]
  },
  "ko_하기는_51": {
    "title": "~하기는 하다 (Thì có ... thật đấy nhưng)",
    "shortExplanation": "Cấu trúc biểu thị sự thừa nhận một sự thật ở vế trước nhưng vế sau lại đưa ra điều kiện hạn chế, tương phản ('thì có ... đấy nhưng').",
    "longExplanation": "'~기는 하다' (khẩu ngữ thường rút gọn là '~긴 하다', thường đi kèm với các liên từ chỉ sự tương phản như '~기는 하지만', '~기는 한데', '~기는 해도') dùng để thừa nhận một sự thật hay tính chất nào đó ở mệnh đề trước, nhưng ngay sau đó đưa ra một hạn chế, điều kiện đối lập hoặc nhược điểm ở mệnh đề sau (tương đương 'thì có ... thật đấy nhưng mà...', 'công nhận là ... nhưng' trong tiếng Việt). Thân động từ hoặc tính từ kết hợp trực tiếp với '-기는 하다' bất kể có patchim hay không.",
    "formation": "Thân động từ / Thân tính từ + 기는 하다 (rút gọn: 긴 하다; dạng nối tiếp: 기는 하지만 / 기는 한데 / 기는 해도)",
    "examples": [
      {
        "translation": "Thời tiết thì đúng là có lạnh thật đấy nhưng chúng tôi vẫn trải qua khoảng thời gian rất vui vẻ."
      },
      {
        "translation": "Thích thì tôi có thích mẫu mới này thật đấy, nhưng đắt quá nên khó mà mua được."
      },
      {
        "translation": "Nấu ăn ngon thì tôi nấu ngon đấy, nhưng khâu chuẩn bị lại tốn rất nhiều thời gian và công sức."
      },
      {
        "translation": "Tính tình anh ấy thì tốt thật đấy, nhưng lại thường có thói quen đến muộn."
      }
    ]
  },
  "ko_하기보다_52": {
    "title": "~하기보다 (So với việc ... thì thà/hơn)",
    "shortExplanation": "Cấu trúc so sánh hai hành động hoặc trạng thái, biểu thị sự ưu tiên lựa chọn hành động ở vế sau ('thay vì', 'so với việc... thì').",
    "longExplanation": "'~하기보다' (thường đi kèm với trợ từ nhấn mạnh thành '~하기보다는') được gắn vào sau thân động từ để so sánh hai hành vi, lựa chọn hoặc trạng thái, qua đó thể hiện rằng người nói ưu tiên hoặc đánh giá cao vế sau hơn vế trước (tương đương 'thay vì làm...', 'so với việc làm... thì thà...' trong tiếng Việt). Hành động đứng trước '-하기보다' là phương án kém được ưa chuộng hơn. Gắn trực tiếp vào thân động từ bất kể có phụ âm cuối hay không.",
    "formation": "Thân động từ + 기보다 (nhấn mạnh: 기보다는)",
    "examples": [
      {
        "translation": "So với việc tự lái xe thì tôi thấy đi xe buýt thoải mái hơn nhiều."
      },
      {
        "translation": "Tự mình nấu ăn sẽ tốt cho sức khỏe hơn là việc mua đồ ăn bên ngoài về ăn."
      },
      {
        "translation": "Tôi nghĩ làm việc tại văn phòng sẽ đạt năng suất cao hơn so với việc làm việc ở nhà."
      },
      {
        "translation": "Tôi tin rằng việc dành thời gian bên bạn bè quan trọng hơn là kiếm tiền."
      }
    ]
  },
  "ko_하나_53": {
    "title": "~하나 / ~나 (Tự hỏi, liệu rằng... nhỉ?)",
    "shortExplanation": "Vĩ tố kết thúc câu nghi vấn dùng trong độc thoại hoặc nói chuyện thân mật để biểu thị sự tự vấn, thắc mắc, băn khoăn ('liệu rằng... nhỉ?', 'sao lại... thế nhỉ?').",
    "longExplanation": "'~하나' (vĩ tố gốc là dạng tự vấn '-나 / -(으)ㄴ가') được dùng trong khẩu ngữ hoặc độc thoại nội tâm khi người nói tự đặt câu hỏi cho chính mình, biểu thị sự hoang mang, thắc mắc, suy ngẫm hoặc phỏng đoán về một tình huống nào đó mà mình không hiểu rõ (tương đương 'liệu có... không nhỉ?', 'sao lại... thế nhỉ?' trong tiếng Việt). Động từ thường kết hợp với '-나' (hoặc '하다' biến thành '하나'), tính từ kết hợp với '-(으)ㄴ가'.",
    "formation": "Thân động từ + 하나 (hoặc 나) / Thân tính từ + 은가/ㄴ가",
    "examples": [
      {
        "translation": "Tôi tự hỏi sao bản thân mình lúc nào cũng chỉ có một mình thế này nhỉ."
      },
      {
        "translation": "Tôi thật sự không thể hiểu nổi tại sao anh ấy lại nói như vậy nữa."
      },
      {
        "translation": "Đứa bạn vốn rất hay liên lạc đột nhiên lại bặt vô âm tín, chẳng hiểu vì sao nhỉ."
      },
      {
        "translation": "Học hành chăm chỉ biết bao nhiêu mà đi thi vẫn không làm được bài là sao nhỉ."
      }
    ]
  },
  "ko_하다가_54": {
    "title": "~다가 / ~하다가 (Đang làm gì thì ...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị một hành động hoặc trạng thái đang diễn ra thì bị gián đoạn, chuyển biến hoặc có sự việc khác chen ngang ('đang ... thì').",
    "longExplanation": "'~하다가' (vĩ tố gốc là '-다가') gắn vào sau thân động từ để biểu thị rằng hành động ở mệnh đề trước đang diễn ra thì đột ngột dừng lại, chuyển hướng hoặc có một hành động/sự việc khác bất ngờ chen vào (tương đương 'đang... thì', 'làm... dở rồi' trong tiếng Việt). Chủ ngữ của hai mệnh đề thông thường phải đồng nhất khi là hành vi có chủ ý. Dù sự việc xảy ra trong quá khứ thì thì quá khứ cũng không gắn vào trước '-다가' nếu hành động trước bị ngắt quãng trực tiếp.",
    "formation": "Thân động từ + 다가 (đối với động từ gốc 하다: 하다가)",
    "examples": [
      {
        "translation": "Đang dọn dẹp thì tôi tình cờ phát hiện ra một tấm ảnh cũ."
      },
      {
        "translation": "Tôi đang đọc sách thì ngủ quên lúc nào không hay."
      },
      {
        "translation": "Đang mải trò chuyện với bạn mà tôi quên khuấy mất thời gian."
      },
      {
        "translation": "Tôi đang lái xe thì bị lạc đường."
      }
    ]
  },
  "ko_하다가_55": {
    "title": "~다가 말다 / ~하다가 말다 (Đang làm dở thì dừng lại, bỏ dở giữa chừng)",
    "shortExplanation": "Cấu trúc biểu thị việc một hành động đang được thực hiện thì bị dừng lại hoặc bỏ dở giữa chừng mà chưa hoàn thành ('đang làm dở thì thôi/thôi không làm nữa').",
    "longExplanation": "'~다가 말다' (đối với động từ đuôi 하다 là '~하다가 말다') gắn vào sau thân động từ để chỉ việc chủ ngữ bắt đầu thực hiện một hành động nhưng giữa chừng lại dừng lại, từ bỏ hoặc không tiếp tục làm cho xong (tương đương 'đang làm dở thì dừng', 'bỏ dở giữa chừng' trong tiếng Việt). Động từ bổ trợ '말다' thường được chia ở thì quá khứ ('-다가 말았다 / 말았어요'). Gắn trực tiếp vào thân động từ bất kể có phụ âm cuối hay không.",
    "formation": "Thân động từ + 다가 말다 (đối với động từ gốc 하다: 하다가 말다)",
    "examples": [
      {
        "translation": "Tôi đang học dở thì thôi không học nữa, bởi vì chuông báo thức không reo nên tôi quên bẵng mất giờ giấc."
      },
      {
        "translation": "Vì bạn đến nhà chơi nên tôi đang nấu cơm dở thì phải dừng lại."
      },
      {
        "translation": "Tôi đang tập thể dục dở thì đành nghỉ ngang, tại vì trời mưa to quá."
      },
      {
        "translation": "Tôi đang đọc sách dở thì dừng lại, bởi vì tự nhiên cơn buồn ngủ ập đến."
      }
    ]
  },
  "ko_하더라_56": {
    "title": "~하더라 (Tôi thấy là... đấy, thật đấy)",
    "shortExplanation": "Vĩ tố kết thúc câu thân mật dùng để hồi tưởng và thuật lại cho người nghe điều mắt thấy tai nghe hoặc cảm nhận trực tiếp trong quá khứ.",
    "longExplanation": "'~하더라' là vĩ tố kết thúc câu thể hiện sự hồi tưởng trong tiếng Hàn (thể thân mật, dạng lịch sự là '~하더라고요'). Cấu trúc này được dùng khi người nói muốn kể lại cho người nghe về một sự việc, trạng thái mà bản thân đã trực tiếp chứng kiến, trải nghiệm hoặc cảm nhận trong quá khứ. Nó mang sắc thái sống động hơn việc chỉ nêu sự thật đơn thuần ('~했다'), nhấn mạnh ấn tượng trực tiếp của người nói.",
    "formation": "Thân động từ/tính từ + 더라 (quá khứ: Thân động từ/tính từ + 았/었더라)",
    "examples": [
      {
        "translation": "Em gái cậu trông xinh thật đấy. Con bé nổi tiếng là cô gái đẹp nhất khu phố đấy."
      },
      {
        "translation": "Trông anh ấy lúc nào cũng có vẻ bận rộn. Vì thế mà việc gặp anh ấy thật là khó."
      },
      {
        "translation": "Hồi nhỏ bố tôi đá bóng giỏi lắm đấy. Thế nên đến tận bây giờ thực lực chơi bóng của bố vẫn rất cừ khôi."
      },
      {
        "translation": "Năm ngoái lúc chúng mình đi biển, cảnh tượng lúc hoàng hôn buông xuống đẹp thật đấy."
      }
    ]
  },
  "ko_하려고_57": {
    "title": "-(으)려고 (Để, định làm gì)",
    "shortExplanation": "Vĩ tố liên kết biểu thị mục đích hoặc ý định của hành động ở vế sau ('để', 'nhằm', 'định').",
    "longExplanation": "'-(으)려고' là vĩ tố liên kết nối hai mệnh đề, dùng để chỉ mục đích hoặc ý định thực hiện một hành động (tương đương với 'để', 'nhằm', 'với mục đích là' trong tiếng Việt). Mệnh đề đứng trước biểu thị mục tiêu mà người nói nhắm tới, còn mệnh đề sau thể hiện hành động cụ thể để đạt được mục tiêu đó. Khi kết hợp với '하다' tạo thành '-(으)려고 하다' mang nghĩa 'dự định làm gì'.",
    "formation": "Thân động từ (kết thúc bằng phụ âm trừ ㄹ) + 으려고 / Thân động từ (kết thúc bằng nguyên âm hoặc phụ âm ㄹ) + 려고",
    "examples": [
      {
        "translation": "Tôi đã đọc nhiều sách để hiểu tiếng Hàn tốt hơn."
      },
      {
        "translation": "Tôi đang chăm chỉ học tập để làm tốt bài thi."
      },
      {
        "translation": "Tôi đang tập thể dục nhằm duy trì sức khỏe."
      },
      {
        "translation": "Tôi đã làm thêm để dành dụm tiền đi du lịch."
      }
    ]
  },
  "ko_하여해서_58": {
    "title": "-아/어서 (Vì... nên..., do...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị nguyên nhân, lý do tự nhiên dẫn đến kết quả ở mệnh đề sau ('vì... nên...').",
    "longExplanation": "'-아/어서' (với động từ 하다 biến thành '하여' hoặc thông dụng là '해서') là vĩ tố liên kết nối hai mệnh đề, trong đó mệnh đề trước là nguyên nhân, lý do dẫn tới kết quả hoặc trạng thái ở mệnh đề sau. Vĩ tố này thường diễn tả mối quan hệ nhân quả mang tính tự nhiên, khách quan. Không chia thì quá khứ ở trước '-아/어서', và mệnh đề sau không dùng với câu mệnh lệnh hay thỉnh dụ.",
    "formation": "Thân động từ/tính từ có nguyên âm ㅏ, ㅗ + 아서 / Thân động từ/tính từ có các nguyên âm khác + 어서 / Động từ 하다 → 하여/해서",
    "examples": [
      {
        "translation": "Vì trời mưa nên tôi đã về nhà muộn."
      },
      {
        "translation": "Máy tính bị hỏng nên tôi đã không thể làm bài tập."
      },
      {
        "translation": "Nhờ chăm chỉ học tập nên tôi đã làm bài thi rất tốt."
      },
      {
        "translation": "Vì ăn quá nhiều bánh mì nên tôi đã bị đau bụng."
      }
    ]
  },
  "ko_한테한테서_59": {
    "title": "~한테 / ~한테서 (Cho, tới / Từ ai đó)",
    "shortExplanation": "Tiểu từ gắn sau người hoặc động vật: '~한테' chỉ đối tượng tiếp nhận ('cho, tới, với'), '~한테서' chỉ điểm xuất phát ('từ ai').",
    "longExplanation": "'~한테' và '~한테서' là các tiểu từ khẩu ngữ gắn sau danh từ chỉ người hoặc động vật (hữu tình thể). Trong đó, '~한테' đóng vai trò là tiểu từ phó từ chỉ đối tượng tiếp nhận tác động của hành động ('cho ai, tới ai, với ai', tương đương với '~에게'), còn '~한테서' chỉ nguồn gốc, xuất phát điểm của hành động ('từ ai, từ phía ai', tương đương với '~에게서'). Thường dùng trong giao tiếp thường ngày; với người lớn tuổi cần kính trọng thì dùng '~께'.",
    "formation": "Danh từ chỉ người/động vật + 한테 (cho, tới, với) / Danh từ chỉ người/động vật + 한테서 (từ)",
    "examples": [
      {
        "translation": "Tôi đã tặng quà cho bạn tôi."
      },
      {
        "translation": "Tôi đã học tiếng Hàn từ thầy giáo."
      },
      {
        "translation": "Anh ấy đã vay tiền từ bố mình."
      },
      {
        "translation": "Xin hãy chỉ nói những lời tốt đẹp với tôi thôi nhé."
      }
    ]
  },
  "ko_할_60": {
    "title": "-(으)ㄹ 거예요 (Sẽ, định làm gì)",
    "shortExplanation": "Vĩ tố kết thúc câu thì tương lai dùng để diễn đạt kế hoạch, dự định của người nói hoặc phỏng đoán một sự việc ('sẽ, định làm').",
    "longExplanation": "'-(으)ㄹ 거예요' là cấu trúc biểu thị thì tương lai phổ biến nhất trong khẩu ngữ tiếng Hàn (dạng thân mật là '-(으)ㄹ 거야', dạng trang trọng là '-(으)ㄹ 것입니다'). Cấu trúc này thường dùng trong hai trường hợp: (1) Khi chủ ngữ là ngôi thứ nhất hoặc thứ hai, diễn tả kế hoạch, ý định hoặc quyết tâm sẽ làm gì đó; (2) Khi chủ ngữ là ngôi thứ ba hoặc sự vật, diễn tả sự phỏng đoán của người nói về việc sẽ xảy ra.",
    "formation": "Thân động từ/tính từ (kết thúc bằng phụ âm trừ ㄹ) + 을 거예요 / Thân động từ/tính từ (kết thúc bằng nguyên âm hoặc phụ âm ㄹ) + ㄹ 거예요",
    "examples": [
      {
        "translation": "Cuối tuần này tôi sẽ đi cắm trại cùng bạn bè. Tôi cần phải chuẩn bị lều và đồ dùng cắm trại."
      },
      {
        "translation": "Vì ngày mai thời tiết đẹp nên tôi sẽ đi dạo ở công viên. Tôi sẽ có thể tận hưởng trọn vẹn thời tiết trong lành."
      },
      {
        "translation": "Tối nay tôi sẽ nấu món mì spaghetti. Tôi cần phải mua sốt spaghetti và mì ống về."
      },
      {
        "translation": "Khi bố đi làm về, chúng tôi sẽ cùng nhau ăn tối ở nhà hàng. Tôi phải chọn món ăn mà bố thích."
      }
    ]
  },
  "ko_할_61": {
    "title": "-(으)ㄹ 만하다 (Đáng để làm gì, bõ công làm)",
    "shortExplanation": "Cấu trúc bổ trợ biểu thị một hành động có đủ giá trị, đáng để bỏ công sức, thời gian hoặc tiền bạc ra thực hiện ('đáng làm').",
    "longExplanation": "'-(으)ㄹ 만하다' là cấu trúc tính từ bổ trợ gắn sau thân động từ, biểu thị một hành động có đầy đủ giá trị để thực hiện hoặc đáng để giới thiệu cho người khác ('đáng để...', 'bõ công...'). Ngoài ra cấu trúc này đôi khi cũng có nghĩa là một tình trạng nào đó vẫn ở mức chấp nhận được, chịu đựng được ('tàm tạm, có thể chịu được').",
    "formation": "Thân động từ (kết thúc bằng phụ âm trừ ㄹ) + 을 만하다 / Thân động từ (kết thúc bằng nguyên âm hoặc phụ âm ㄹ) + ㄹ 만하다",
    "examples": [
      {
        "translation": "Chuyến du lịch này tuy đắt nhưng rất đáng để đi thử. Bởi vì nơi đó thực sự rất đẹp."
      },
      {
        "translation": "Bộ phim này tuy dài nhưng rất đáng xem. Cốt truyện vô cùng thú vị."
      },
      {
        "translation": "Cuốn sách này tuy dày nhưng rất bõ công đọc. Bởi vì nội dung cực kỳ bổ ích."
      },
      {
        "translation": "Nhà hàng này tuy ở xa nhưng rất bõ công đến thử. Đồ ăn thực sự ngon tuyệt."
      }
    ]
  },
  "ko_할수록_62": {
    "title": "-(으)ㄹ수록 (Càng... thì càng...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị mức độ ở vế sau biến đổi tỷ lệ thuận theo sự gia tăng mức độ ở vế trước ('càng... càng...').",
    "longExplanation": "'-(으)ㄹ수록' là vĩ tố liên kết chỉ mức độ tăng tiến tương hỗ. Nó diễn tả rằng khi hành động hoặc trạng thái ở mệnh đề trước càng tiến triển hay tích lũy, thì tình trạng ở mệnh đề sau cũng biến đổi tương ứng theo chiều hướng gia tăng (tương đương với 'càng... càng...' trong tiếng Việt). Thường kết hợp với cấu trúc điều kiện thành dạng '-(으)면 -(으)ㄹ수록' để nhấn mạnh ý nghĩa.",
    "formation": "Thân động từ/tính từ (kết thúc bằng phụ âm trừ ㄹ) + 을수록 / Thân động từ/tính từ (kết thúc bằng nguyên âm hoặc phụ âm ㄹ) + ㄹ수록",
    "examples": [
      {
        "translation": "Càng biết nhiều về cô ấy, tôi lại càng yêu cô ấy nhiều hơn."
      },
      {
        "translation": "Càng luyện tập nhiều thì kỹ năng của bạn sẽ càng được nâng cao hơn."
      },
      {
        "translation": "Càng đông người thì bữa tiệc sẽ càng trở nên vui vẻ hơn."
      },
      {
        "translation": "Thời gian càng trôi đi, nỗi nhung nhớ của anh ấy lại càng lớn dần thêm."
      }
    ]
  },
  "ko_할_63": {
    "title": "-(으)ㄹ 줄 알다 (Biết làm gì, biết cách làm)",
    "shortExplanation": "Cấu trúc biểu thị việc có kỹ năng, hiểu biết hoặc năng lực để thực hiện một hành động cụ thể ('biết làm gì').",
    "longExplanation": "'-(으)ㄹ 줄 알다' diễn tả rằng chủ ngữ nắm được phương pháp, kỹ năng hoặc có năng lực để làm một việc nào đó (tương đương với 'biết làm...', 'biết cách làm...'). Trái nghĩa là cấu trúc '-(으)ㄹ 줄 모르다' mang nghĩa 'không biết làm gì'. Lưu ý phân biệt với ngữ cảnh biểu thị sự suy đoán, tưởng rằng ('tôi cứ tưởng là...').",
    "formation": "Thân động từ (kết thúc bằng phụ âm trừ ㄹ) + 을 줄 알다 / Thân động từ (kết thúc bằng nguyên âm hoặc phụ âm ㄹ) + ㄹ 줄 알다",
    "examples": [
      {
        "translation": "Tôi biết nấu ăn, vì thế mỗi khi bạn bè đến nhà chơi tôi đều có thể làm đồ ăn ngon cho họ."
      },
      {
        "translation": "Bạn tôi biết nói tiếng Hàn, vì thế bạn ấy có thể thoải mái trò chuyện với bạn người Hàn Quốc."
      },
      {
        "translation": "Bố mẹ tôi biết lái xe nên có thể đi đến bất cứ đâu."
      },
      {
        "translation": "Tôi biết đánh đàn piano, vì thế khi đi hát karaoke tôi luôn cảm thấy rất vui vẻ."
      }
    ]
  },
  "ko_할지라도_64": {
    "title": "-(으)ㄹ지라도 (Cho dù... đi chăng nữa, dẫu rằng)",
    "shortExplanation": "Vĩ tố liên kết nhượng bộ mạnh biểu thị dù có thừa nhận giả định ở vế trước thì kết quả hay lập trường ở vế sau vẫn không thay đổi.",
    "longExplanation": "'-(으)ㄹ지라도' là vĩ tố liên kết mang tính nhượng bộ mạnh mẽ trong tiếng Hàn (thường xuất hiện trong văn viết, văn nghị luận hoặc lời nói trang trọng). Cấu trúc này dùng để nhấn mạnh rằng ngay cả khi tình huống hay giả định ở mệnh đề trước có xảy ra, thì lập trường, hành động hoặc kết quả ở mệnh đề sau vẫn được giữ nguyên và không hề bị lay chuyển.",
    "formation": "Thân động từ/tính từ (kết thúc bằng phụ âm trừ ㄹ) + 을지라도 / Thân động từ/tính từ (kết thúc bằng nguyên âm hoặc phụ âm ㄹ) + ㄹ지라도",
    "examples": [
      {
        "translation": "Cho dù ngày mai trời có mưa đi chăng nữa, tôi vẫn sẽ đi tập thể dục."
      },
      {
        "translation": "Cho dù bố mẹ có không thích anh ấy đi chăng nữa, tôi vẫn định tiếp tục gặp gỡ anh ấy."
      },
      {
        "translation": "Dẫu cho kỳ thi có khó đến đâu đi nữa, vì đã học hành chăm chỉ nên tôi vẫn rất tự tin."
      },
      {
        "translation": "Cho dù bạn có nghĩ thế nào đi chăng nữa, mình cũng không hề hối hận về quyết định đó."
      }
    ]
  },
  "ko_할_65": {
    "title": "-(으)ㄹ 텐데 (Chắc là... vậy mà, lẽ ra phải... thế nhưng)",
    "shortExplanation": "Cấu trúc đưa ra tiền đề là dự đoán hay kỳ vọng mạnh mẽ của người nói, nhưng vế sau lại diễn ra trái ngược hoặc ngoài mong đợi.",
    "longExplanation": "'-(으)ㄹ 텐데' (rút gọn từ '-(으)ㄹ 터인데') kết hợp giữa dự đoán '-(으)ㄹ 터' và vĩ tố bối cảnh/đối lập '-ㄴ/은/는데'. Cấu trúc này dùng khi người nói đưa ra một dự đoán, giả định hoặc kỳ vọng chắc chắn về một tình huống, nhưng mệnh đề tiếp theo lại xuất hiện một sự việc thực tế trái ngược, không như dự tính hoặc gây bất ngờ.",
    "formation": "Thân động từ/tính từ (kết thúc bằng phụ âm trừ ㄹ) + 을 텐데 / Thân động từ/tính từ (kết thúc bằng nguyên âm hoặc phụ âm ㄹ) + ㄹ 텐데",
    "examples": [
      {
        "translation": "Lẽ ra hôm nay thời tiết phải đẹp chứ, thế mà trời lại mưa. Hoàn toàn lệch khỏi dự đoán của tôi."
      },
      {
        "translation": "Chắc là anh ấy sẽ liên lạc vào buổi tối thôi, nhưng đến giờ vẫn chưa thấy tin tức gì. Có lẽ đã có chuyện gì phát sinh rồi."
      },
      {
        "translation": "Bình thường cô ấy vui vẻ lắm cơ mà, thế nhưng hôm nay chẳng hiểu sao trông tâm trạng cô ấy không được tốt."
      },
      {
        "translation": "Cứ tưởng là đề thi sẽ dễ, vậy mà ra đề khó thực sự."
      }
    ]
  },
  "ko_해야지_66": {
    "title": "-아/어야지 (Phải... mới được, phải... thôi)",
    "shortExplanation": "Vĩ tố kết thúc câu thân mật dùng để tự nhủ, thể hiện quyết tâm của bản thân ('phải... thôi') hoặc khuyên nhủ nhẹ nhàng đối phương.",
    "longExplanation": "'-아/어야지' là vĩ tố kết thúc câu thể thân mật (thêm '요' thành '-아/어야지요' ở thể lịch sự). Cấu trúc này thường dùng trong hai trường hợp chính: (1) Nói một mình hoặc thể hiện quyết tâm, lời tự nhắc nhở bản thân rằng nhất định phải làm điều gì đó ('mình phải... thôi', 'phải... mới được'); (2) Khi nói với người đối diện (thường là người ít tuổi hoặc bạn bè), dùng để khuyên nhủ nhẹ nhàng hoặc nhắc nhở đối phương nên làm một việc hợp lý ('phải... chứ').",
    "formation": "Thân động từ kết thúc bằng nguyên âm ㅏ, ㅗ + 아야지 / Thân động từ kết thúc bằng các nguyên âm khác + 어야지 / Động từ 하다 → 해야지",
    "examples": [
      {
        "translation": "Hôm nay mình phải về nhà sớm mới được. Vì ngày mai mình phải dậy sớm mà."
      },
      {
        "translation": "Mình phải bắt đầu tập thể dục vì sức khỏe thôi."
      },
      {
        "translation": "Mình phải đọc nhiều loại sách đa dạng mới được. Có như vậy mới mở rộng được tri thức chứ."
      },
      {
        "translation": "Phải ăn chậm rãi thôi, như thế mới tiêu hóa tốt được."
      }
    ]
  },
  "ko_해도해봐도_67": {
    "title": "-아/어도 / -아/어 봐도 (Dù có... đi chăng nữa, dù có thử...)",
    "shortExplanation": "Vĩ tố liên kết nhượng bộ biểu thị dù có thực hiện hoặc cố gắng thử làm hành động đến đâu thì kết quả vẫn không thay đổi.",
    "longExplanation": "'-아/어도' (kết hợp với động từ thử nghiệm '보다' tạo thành '-아/어 봐도') là cấu trúc nhượng bộ chỉ điều kiện đối lập. Cấu trúc này diễn đạt rằng cho dù một hành vi, nỗ lực hay trạng thái nào đó có diễn ra ở mệnh đề trước, thì kết quả, thực tế hoặc cảm xúc ở mệnh đề sau vẫn không hề thay đổi. Thường hay đi kèm với phó từ '아무리' (dù thế nào chăng nữa) hoặc '얼마나' (biết bao) để nhấn mạnh sự vô hiệu của nỗ lực.",
    "formation": "Thân động từ/tính từ + 아/어도 hoặc Thân động từ + 아/어 봐도 (nguyên âm ㅏ, ㅗ dùng 아; các nguyên âm khác dùng 어; 하다 → 해도 / 해봐도)",
    "examples": [
      {
        "translation": "Tại đây dù chúng tôi có nỗ lực đến đâu đi chăng nữa, tình hình vẫn không hề được cải thiện."
      },
      {
        "translation": "Dù đồ ăn của quán đó có ngon đi nữa, tôi cũng chẳng muốn làm việc ở đó đâu."
      },
      {
        "translation": "Dù có kiếm được bao nhiêu tiền đi chăng nữa, nếu không hạnh phúc thì cũng chẳng có ý nghĩa gì."
      },
      {
        "translation": "Dù cô ấy có yêu anh ấy nhiều đến mức nào đi nữa, cô ấy bảo vẫn không thể nào hiểu được lòng anh."
      }
    ]
  },
  "ko_해보다_68": {
    "title": "-아/어 보다 (Thử làm gì, trải nghiệm làm gì)",
    "shortExplanation": "Trợ động từ biểu thị việc thử làm một hành động nào đó lần đầu hoặc trải nghiệm một việc ('thử làm gì').",
    "longExplanation": "'-아/어 보다' là cấu trúc trợ động từ bổ trợ gắn sau thân động từ hành động, mang hai ý nghĩa chính: (1) Thử nghiệm thực hiện một hành động xem kết quả ra sao (tương đương với 'làm thử...', 'thử làm...'); (2) Khi chia ở thì quá khứ ('-아/어 봤다'), biểu thị kinh nghiệm hoặc trải nghiệm trong quá khứ ('đã từng làm gì'). Thường dùng khi gợi ý, khuyên bảo đối phương nên thử làm một việc gì đó.",
    "formation": "Thân động từ kết thúc bằng nguyên âm ㅏ, ㅗ + 아 보다 / Thân động từ kết thúc bằng các nguyên âm khác + 어 보다 / Động từ 하다 → 해보다",
    "examples": [
      {
        "translation": "Tôi đã cố gắng ăn thử món ăn Hàn Quốc mới, nhưng vì quá lạ lẫm nên thấy thật khó khăn."
      },
      {
        "translation": "Bạn nghĩ sao về việc thử học ngôn ngữ này?"
      },
      {
        "translation": "Lúc đầu việc đọc rất khó, nhưng cứ thử làm liên tục nên dần dần tôi đã hiểu ra."
      },
      {
        "translation": "Cuối tuần này thử tìm kiếm một sở thích mới xem thế nào?"
      }
    ]
  },
  "ko_해주다_69": {
    "title": "-아/어 주다 (Làm giúp, làm cho ai)",
    "shortExplanation": "Trợ động từ biểu thị việc thực hiện một hành động vì lợi ích của người khác hoặc giúp đỡ ai đó ('làm giúp', 'làm cho').",
    "longExplanation": "'-아/어 주다' là cấu trúc trợ động từ bổ trợ trong tiếng Hàn, biểu thị người nói làm một hành động có lợi cho người nghe hoặc một đối tượng khác, thể hiện thiện chí giúp đỡ (tương đương với 'làm giúp cho...', 'làm cho ai' trong tiếng Việt). Khi yêu cầu người khác làm gì cho mình, dùng dạng '-아/어 주세요' ('hãy làm giúp tôi'). Với đối tượng được giúp đỡ là người lớn tuổi hoặc bề trên, cần dùng dạng kính ngữ là '-아/어 드리다'.",
    "formation": "Thân động từ kết thúc bằng nguyên âm ㅏ, ㅗ + 아 주다 / Thân động từ kết thúc bằng các nguyên âm khác + 어 주다 / Động từ 하다 → 해주다 (kính ngữ: -아/어 드리다)",
    "examples": [
      {
        "translation": "Tôi đang học nấu ăn để có thể nấu một bữa cơm cho mẹ."
      },
      {
        "translation": "Bạn tôi gặp khó khăn trong việc ôn thi nên tôi đã tóm tắt bài giúp bạn ấy."
      },
      {
        "translation": "Vì bố bị mệt nên tôi đã lái xe giúp bố."
      },
      {
        "translation": "Vì các thành viên trong đội đều bận rộn nên tôi đã viết báo cáo lần này thay cho họ."
      }
    ]
  },
  "ko_했더니_70": {
    "title": "-았/었더니 (Sau khi làm... thì nhận thấy, làm... nên kết quả là)",
    "shortExplanation": "Vĩ tố liên kết biểu thị sau khi người nói trực tiếp làm hành động ở vế trước thì phát hiện ra sự thật mới hoặc dẫn đến kết quả ở vế sau.",
    "longExplanation": "'-았/었더니' là vĩ tố liên kết chỉ nguyên nhân - kết quả hoặc sự phát hiện dựa trên trải nghiệm trực tiếp trong quá khứ. Cấu trúc này thường có chủ ngữ ở vế trước là ngôi thứ nhất (người nói). Sau khi người nói thực hiện hành động đó thì: (1) Nhận ra một sự thật mới mẻ, bất ngờ hoặc ngoài dự liệu; hoặc (2) Hành động đó trực tiếp dẫn đến kết quả, phản ứng ở mệnh đề sau.",
    "formation": "Thân động từ có nguyên âm ㅏ, ㅗ + 았더니 / Thân động từ có các nguyên âm khác + 었더니 / Động từ 하다 → 했더니",
    "examples": [
      {
        "translation": "Sau khi ăn chiếc bánh này, tôi thấy ngon hơn hẳn tưởng tượng nên muốn ăn thêm nữa."
      },
      {
        "translation": "Khi tôi đến chỗ làm thì nhận ra trong văn phòng chẳng có một ai."
      },
      {
        "translation": "Sau khi đọc cuốn sách này, tôi nhận thấy nó thú vị hơn rất nhiều so với những gì mình nghĩ ban đầu."
      },
      {
        "translation": "Gặp lại người bạn sau một thời gian dài, tôi thấy thực sự rất đỗi mừng rỡ."
      }
    ]
  },
  "ko_했었다_71": {
    "title": "~았/었었다 / ~했었다 (Đã từng... trong quá khứ)",
    "shortExplanation": "Diễn tả hành động hoặc trạng thái đã xảy ra và kết thúc hoàn toàn trong quá khứ, hiện tại tình trạng đó đã thay đổi hoặc không còn tiếp diễn nữa.",
    "longExplanation": "'~았/었었다' (với động từ 하다 là '했었다') là cấu trúc diễn tả quá khứ hoàn thành hoặc sự đoạn tuyệt với hiện tại (quá khứ xa). Cấu trúc này dùng để nhấn mạnh một sự việc, trải nghiệm hoặc trạng thái đã kết thúc trọn vẹn trong quá khứ và không còn duy trì ở hiện tại, hoặc tình trạng hiện nay đã trở nên trái ngược so với thời điểm đó.",
    "formation": "Thân động từ/tính từ có nguyên âm ㅏ, ㅗ + 았었다 / Thân động từ/tính từ có các nguyên âm khác + 었었다 / Động từ 하다 → 했었다",
    "examples": [
      {
        "translation": "Cho đến ngày hôm đó tôi đã không gặp cô ấy. Nhưng trước đó, tôi đã từng viết vô số lá thư gửi cho cô ấy."
      },
      {
        "translation": "Khi lần đầu tiên đến Hàn Quốc, tôi hoàn toàn không biết chữ Hangeul. Dù vậy, tôi đã học tiếng Hàn từ trước đó để dạy bảng chữ cái cho các em nhỏ Hàn Quốc."
      },
      {
        "translation": "Sáng nay anh ấy đã từng đến khách sạn, nhưng đến trưa thì anh ấy đã ở trường học đó rồi."
      },
      {
        "translation": "Tôi chỉ chào cô ấy đúng một lần duy nhất. Kể từ sau đó, tôi đã không còn gặp lại cô ấy nữa."
      }
    ]
  },
  "ko_했으면_72": {
    "title": "-았/었으면 (Giá mà..., nếu đã...)",
    "shortExplanation": "Vĩ tố liên kết dùng để giả định một tình huống trái ngược với thực tế trong quá khứ, thường biểu thị sự tiếc nuối hoặc mong ước ('giá như', 'nếu đã...').",
    "longExplanation": "'-았/었으면' (với 하다 là '했으면') là sự kết hợp giữa vĩ tố quá khứ '-았/었-' và vĩ tố điều kiện '-으면'. Cấu trúc này dùng để giả định một điều đã không xảy ra trong quá khứ, thường đi kèm vế sau biểu thị sự tiếc nuối, ân hận hoặc suy đoán kết quả sẽ ra sao nếu điều đó thành sự thật ('-(으)ㄹ 텐데', '-(으)ㄹ 거예요'). Ngoài ra khi kết hợp với '좋겠다' thành '-았/었으면 좋겠다' sẽ mang nghĩa mong ước tha thiết.",
    "formation": "Thân động từ/tính từ có nguyên âm ㅏ, ㅗ + 았으면 / Thân động từ/tính từ có các nguyên âm khác + 었으면 / Động từ 하다 → 했으면",
    "examples": [
      {
        "translation": "Nếu lúc đó tôi ra nước ngoài thì có lẽ bây giờ đã không cô đơn thế này."
      },
      {
        "translation": "Nếu biết đáp án thì tôi đã làm bài thi tốt hơn rồi."
      },
      {
        "translation": "Nếu lúc đó bạn giúp đỡ tôi thì tôi đã không thất bại."
      },
      {
        "translation": "Nếu xử lý công việc đó nhanh chóng thì bây giờ đã không gặp phải rắc rối này."
      }
    ]
  },
  "ko_했을_73": {
    "title": "-았/었을 때 (Khi đã..., hồi...)",
    "shortExplanation": "Cấu trúc định từ quá khứ kết hợp với danh từ chỉ thời gian '때', dùng để chỉ thời điểm một hành động hoặc trạng thái trong quá khứ đã xảy ra hoặc hoàn tất.",
    "longExplanation": "'-았/었을 때' kết hợp định từ quá khứ '-(으)ㄹ' với danh từ phụ thuộc '때' (khi, lúc). Cấu trúc này dùng để hồi tưởng hoặc chỉ rõ thời điểm mà một sự việc, hành động trong quá khứ đã diễn ra hoặc một trạng thái đã từng tồn tại ('khi còn nhỏ...', 'khi mới học...').",
    "formation": "Thân động từ/tính từ có nguyên âm ㅏ, ㅗ + 았을 때 / Thân động từ/tính từ có các nguyên âm khác + 었을 때 / Động từ 하다 → 했을 때",
    "examples": [
      {
        "translation": "Hồi còn nhỏ tôi đã đi du lịch với gia đình rất nhiều."
      },
      {
        "translation": "Khi lần đầu học tiếng Hàn, việc nói thực sự rất khó khăn."
      },
      {
        "translation": "Khi anh ấy đi đến thư viện, tôi đã phải ngồi chờ."
      },
      {
        "translation": "Khi bạn khóc, tôi mới nhận ra rằng bản thân mình cũng trở nên buồn bã."
      }
    ]
  },
  "ko_했을_74": {
    "title": "-았/었을 텐데 (Chắc là đã... thế mà..., đáng lẽ đã...)",
    "shortExplanation": "Biểu thị sự phỏng đoán mạnh mẽ về một việc trong quá khứ làm bối cảnh, thường vế sau diễn tả kết quả thực tế trái ngược hoặc bất ngờ ('chắc là đã... thế mà').",
    "longExplanation": "'-았/었을 텐데' là sự kết hợp giữa dạng phỏng đoán quá khứ '-았/었을 터이다' và vĩ tố liên kết đưa ra bối cảnh '-(으)ㄴ/는데'. Người nói dùng cấu trúc này để đưa ra phỏng đoán có căn cứ vững chắc về một sự việc lẽ ra đã xảy ra trong quá khứ, sau đó vế sau đưa ra một tình huống thực tế trái ngược, khó hiểu hoặc biểu thị sự tiếc nuối, ngạc nhiên.",
    "formation": "Thân động từ/tính từ có nguyên âm ㅏ, ㅗ + 았을 텐데 / Thân động từ/tính từ có các nguyên âm khác + 었을 텐데 / Động từ 하다 → 했을 텐데",
    "examples": [
      {
        "translation": "Tôi chắc là mình đã nộp mẫu đơn đó rồi, không hiểu sao họ lại yêu cầu nộp lại nữa."
      },
      {
        "translation": "Chắc là anh ấy đã nghe tin tức đó rồi, thế mà vẫn chưa thấy phản ứng gì nhỉ."
      },
      {
        "translation": "Đáng lẽ hôm đó chúng tôi đã tham dự cuộc họp, thế mà tên lại không có trong danh sách."
      },
      {
        "translation": "Cô ấy chắc hẳn đã nhận được liên lạc này rồi, vậy mà vẫn chưa thấy tin nhắn trả lời."
      }
    ]
  },
  "ko_했지만_75": {
    "title": "-았/었지만 (Đã... nhưng...)",
    "shortExplanation": "Vĩ tố liên kết đối lập chỉ sự tương phản giữa hai sự việc trong quá khứ ('tuy đã... nhưng mà...').",
    "longExplanation": "'-았/었지만' (với động từ 하다 là '했지만') kết hợp vĩ tố quá khứ '-았/었-' với vĩ tố liên kết tương phản '-지만'. Cấu trúc này dùng để nối hai mệnh đề, diễn tả việc hành động hoặc trạng thái ở vế trước tuy đã xảy ra trong quá khứ nhưng kết quả ở vế sau lại tương phản, trái ngược hoặc không như mong đợi.",
    "formation": "Thân động từ/tính từ có nguyên âm ㅏ, ㅗ + 았지만 / Thân động từ/tính từ có các nguyên âm khác + 었지만 / Động từ 하다 → 했지만",
    "examples": [
      {
        "translation": "Tôi đã rất muốn đi du lịch nhiều nơi, nhưng vì không có thời gian nên đã không thể đi."
      },
      {
        "translation": "Tôi đã học tập rất chăm chỉ, nhưng trong kỳ thi đã không đạt được điểm cao."
      },
      {
        "translation": "Anh ấy đã muốn làm nhiều điều thú vị, nhưng mỗi tối đều phải làm việc."
      },
      {
        "translation": "Tôi đã muốn đi chơi cùng bạn bè, nhưng vì bài tập nên không thể ra ngoài được."
      }
    ]
  },
  "ko_아어여서_76": {
    "title": "-아/어서 (Vì... nên..., do...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị nguyên nhân, lý do tự nhiên dẫn đến kết quả ở mệnh đề sau ('vì... nên...').",
    "longExplanation": "'-아/어서' là vĩ tố liên kết rất phổ biến trong tiếng Hàn dùng để chỉ nguyên nhân, lý do tự nhiên dẫn đến kết quả ở mệnh đề sau. Lưu ý quan trọng: trước '-아/어서' không dùng các vĩ tố chỉ thì quá khứ hay tương lai (không dùng '-았/었어서'), và mệnh đề sau không kết hợp với câu mệnh lệnh ('-(으)세요') hoặc câu thỉnh dụ ('-(으)ㅂ시다').",
    "formation": "Thân động từ/tính từ có nguyên âm ㅏ, ㅗ + 아서 / Thân động từ/tính từ có các nguyên âm khác + 어서 / Động từ 하다 → 해서 (hoặc 하여)",
    "examples": [
      {
        "translation": "Vì đói bụng nên tôi đã ăn rất nhiều cơm."
      },
      {
        "translation": "Anh ấy tính tình tốt nên có rất nhiều bạn bè."
      },
      {
        "translation": "Do tàu hỏa bị trễ nên tôi đã đến công ty muộn."
      },
      {
        "translation": "Căn phòng này ồn ào quá nên tôi không thể học bài được."
      }
    ]
  },
  "ko_아어여야_77": {
    "title": "-아/어야 (Phải... mới..., phải làm gì)",
    "shortExplanation": "Vĩ tố liên kết biểu thị điều kiện tất yếu; kết hợp với '하다/되다' để diễn tả nghĩa vụ, bổn phận bắt buộc phải làm ('phải làm gì').",
    "longExplanation": "'-아/어야' là vĩ tố liên kết biểu thị điều kiện tiên quyết duy nhất: chỉ khi mệnh đề trước được thực hiện thì sự việc ở mệnh đề sau mới có thể xảy ra ('chỉ khi... mới...'). Khi kết hợp với trợ động từ '하다' hoặc '되다' tạo thành '-아/어야 하다/되다', cấu trúc này biểu thị nghĩa vụ, trách nhiệm hoặc tính tất yếu mà người nói bắt buộc phải thực hiện ('phải làm gì'). Trong văn viết trang trọng, '하다' có thể viết thành '하여야'.",
    "formation": "Thân động từ/tính từ có nguyên âm ㅏ, ㅗ + 아야 (하다/되다) / Thân động từ/tính từ có các nguyên âm khác + 어야 (하다/되다) / Động từ 하다 → 해야 (하다/되다) (văn viết: 하여야)",
    "examples": [
      {
        "translation": "Để chuẩn bị cho kỳ thi học kỳ, tôi phải giải thật nhiều bài toán khó."
      },
      {
        "translation": "Hôm nay tôi phải ngủ sớm thì ngày mai mới có thể tránh được mệt mỏi."
      },
      {
        "translation": "Tôi phải kiếm nhiều tiền hơn cho tháng này."
      },
      {
        "translation": "Trước khi nộp dự án, chúng tôi phải có cuộc họp với các thành viên trong nhóm."
      }
    ]
  },
  "ko_후에_78": {
    "title": "-(으)ㄴ 후에 (Sau khi...)",
    "shortExplanation": "Cấu trúc định từ quá khứ kết hợp với danh từ '후' và tiểu từ '에', biểu thị thứ tự hành động: việc sau diễn ra sau khi việc trước đã hoàn tất ('sau khi').",
    "longExplanation": "'-(으)ㄴ 후에' là cấu trúc biểu thị thời gian trong tiếng Hàn, được tạo thành bởi vĩ tố định từ quá khứ '-(으)ㄴ', danh từ '후' (hậu - sau) và tiểu từ chỉ thời gian '에'. Cấu trúc này dùng để diễn đạt rằng hành động ở mệnh đề trước phải hoàn tất xong xuôi rồi thì hành động ở mệnh đề sau mới diễn ra. Khi đi trực tiếp với danh từ, dùng dạng 'Danh từ + 후에'.",
    "formation": "Thân động từ kết thúc bằng phụ âm (trừ ㄹ) + 은 후에 / Thân động từ kết thúc bằng nguyên âm hoặc phụ âm ㄹ + ㄴ 후에 / Danh từ + 후에",
    "examples": [
      {
        "translation": "Sau khi tốt nghiệp, tôi đã đi tìm việc làm ngay lập tức. Vì có nhiều việc khác nên tôi đã không có thời gian nghỉ ngơi."
      },
      {
        "translation": "Mỗi ngày sau khi thức dậy, tôi tập thể dục rồi quay trở về nhà chuẩn bị."
      },
      {
        "translation": "Sau khi ăn cơm xong, vì có thời gian nghỉ ngơi nên tôi trò chuyện cùng bạn bè."
      },
      {
        "translation": "Tôi sẽ thi sau khi học xong, nhưng hiện tại không có nhiều thời gian."
      }
    ]
  },
  "ko__79": {
    "title": "-(으)나 (Tuy... nhưng, song...)",
    "shortExplanation": "Vĩ tố liên kết mang phong cách trang trọng hoặc văn viết, dùng để nối hai mệnh đề có nội dung tương phản, đối lập ('tuy... nhưng...').",
    "longExplanation": "'-(으)나' là vĩ tố liên kết đối lập mang tính văn phong viết hoặc phát biểu trang trọng (tương đương với '-지만' trong khẩu ngữ). Cấu trúc này dùng để nối hai vế câu có ý nghĩa trái ngược nhau, thường gặp trong các bài viết, báo chí, văn học, hoặc thông báo chính thức. Khi chia ở quá khứ, cấu trúc trở thành '-았/었으나'.",
    "formation": "Thân động từ/tính từ kết thúc bằng phụ âm (trừ ㄹ) + 으나 / Thân động từ/tính từ kết thúc bằng nguyên âm hoặc phụ âm ㄹ + 나 (quá khứ: -았/었으나)",
    "examples": [
      {
        "translation": "Hôm nay thực sự tâm trạng tôi rất tốt, nhưng thời tiết có vẻ sắp mưa nên thấy hơi mệt mỏi."
      },
      {
        "translation": "Tôi rất muốn về nhà, song vì phải học thêm nên đành phải ở lại trường."
      },
      {
        "translation": "Không chỉ riêng tôi mà cả các bạn tôi đều đã lên kế hoạch xem bộ phim này, thế nhưng vé đã bán hết sạch nên không thể xem được."
      },
      {
        "translation": "Bài tập về nhà tuy nhiều, song vì quá đỗi khó khăn nên tôi thực sự không biết phải làm thế nào."
      }
    ]
  },
  "ko__80": {
    "title": "-(으)ㄹ까요? (Chúng mình cùng... nhé?, ...nhé?)",
    "shortExplanation": "Vĩ tố kết thúc câu nghi vấn dùng để hỏi ý kiến người nghe, rủ rê hoặc đề xuất cùng nhau làm một việc gì đó ('chúng mình cùng... nhé?').",
    "longExplanation": "'-(으)ㄹ까요?' là vĩ tố kết thúc câu dạng thân mật lịch sự (thể 해요체). Khi chủ ngữ là ngôi thứ nhất số nhiều ('chúng ta/chúng mình'), câu mang ý nghĩa rủ rê, đề xuất đối phương cùng thực hiện một hành động nào đó ('chúng mình cùng làm... nhé?'). Khi chủ ngữ là ngôi thứ nhất số ít, câu mang nghĩa hỏi ý kiến hoặc xin phép đối phương ('tôi làm... nhé?'). Khi chủ ngữ là ngôi thứ ba hoặc sự vật, cấu trúc này dùng để phỏng đoán sự việc.",
    "formation": "Thân động từ kết thúc bằng phụ âm (trừ ㄹ) + 을까요? / Thân động từ kết thúc bằng nguyên âm hoặc phụ âm ㄹ + ㄹ까요?",
    "examples": [
      {
        "translation": "Chúng mình cùng chụp ảnh nhé? Thời tiết đẹp thế này chắc sẽ có ảnh đẹp lắm đấy."
      },
      {
        "translation": "Giờ ăn trưa chúng mình cùng tập thể dục nhé? Vận động cơ thể rất tốt cho sức khỏe mà."
      },
      {
        "translation": "Cuối tuần này chúng mình cùng xem phim nhé? Có rất nhiều bộ phim hay vừa mới công chiếu đấy."
      },
      {
        "translation": "Chúng mình cùng đi uống cà phê nhé? Vừa uống cà phê vừa trò chuyện thì sẽ vui lắm."
      }
    ]
  },
  "ko__81": {
    "title": "-(으)ㄹ래요 (Tôi sẽ... / Bạn có muốn... không?)",
    "shortExplanation": "Vĩ tố kết thúc câu thân mật dùng để biểu đạt ý định, quyết định của bản thân (câu trần thuật) hoặc hỏi ý muốn, rủ rê đối phương (câu nghi vấn).",
    "longExplanation": "'-(으)ㄹ래요' là vĩ tố kết thúc câu dùng trong giao tiếp thân mật, gần gũi. Khi ở câu trần thuật (chủ ngữ ngôi thứ nhất), nó biểu thị ý định, sự lựa chọn hoặc quyết tâm thực hiện một hành động của người nói ('tôi sẽ...', 'tôi muốn...'). Khi ở câu nghi vấn (-(으)ㄹ래요?), nó dùng để hỏi ý muốn, sở thích hoặc rủ rê người nghe một cách nhẹ nhàng, thân mật ('bạn có muốn... không?').",
    "formation": "Thân động từ kết thúc bằng phụ âm (trừ ㄹ) + 을래요 / Thân động từ kết thúc bằng nguyên âm hoặc phụ âm ㄹ + ㄹ래요",
    "examples": [
      {
        "translation": "Tối nay bạn có muốn cùng xem phim với tôi không? Tôi đã tìm được một bộ phim rất hay đấy."
      },
      {
        "translation": "Vì thời tiết đẹp nên tôi muốn ăn trưa ở bên ngoài. Chúng ta có thể vừa thưởng thức bữa ăn vừa tận hưởng không khí trong lành."
      },
      {
        "translation": "Tối nay bạn có muốn chơi cờ vua với tôi không? Tôi đã tập luyện suốt thời gian dài rồi đấy."
      },
      {
        "translation": "Tôi sẽ tìm đồ đánh rơi giúp bạn. Để tôi thử liên lạc với bác tài xế taxi xem sao."
      }
    ]
  },
  "ko__82": {
    "title": "-(으)면서 (Vừa... vừa..., đồng thời)",
    "shortExplanation": "Vĩ tố liên kết diễn tả hai hành động hoặc trạng thái diễn ra đồng thời cùng một lúc ('vừa... vừa...').",
    "longExplanation": "'-(으)면서' là vĩ tố liên kết nối hai mệnh đề, diễn tả chủ ngữ thực hiện song song hai hành động cùng một lúc ('vừa làm việc A vừa làm việc B'). Chủ ngữ của cả hai vế thông thường phải là cùng một đối tượng. Ngoài nghĩa đồng thời, cấu trúc này đôi khi còn được dùng để biểu thị sự mâu thuẫn, tương phản trớ trêu giữa hai trạng thái hoặc hành vi trái ngược nhau ('ấy thế mà lại...').",
    "formation": "Thân động từ/tính từ kết thúc bằng phụ âm (trừ ㄹ) + 으면서 / Thân động từ/tính từ kết thúc bằng nguyên âm hoặc phụ âm ㄹ + 면서",
    "examples": [
      {
        "translation": "Tôi vừa đi học ở trường vừa làm việc toàn thời gian."
      },
      {
        "translation": "Seungmin đang vừa nghe nhạc vừa học bài."
      },
      {
        "translation": "Anh ấy vừa rơi nước mắt vừa mỉm cười. Vì niềm vui vỡ òa nên mới như vậy."
      },
      {
        "translation": "Bà tôi vừa nấu ăn vừa kể chuyện cho chúng tôi ở phòng khách, tôi nghĩ đó thực sự là một biệt tài."
      }
    ]
  },
  "ko__83": {
    "title": "-(으)로 (Bằng, về phía, theo, sang)",
    "shortExplanation": "Tiểu từ phó từ gắn sau danh từ biểu thị phương hướng di chuyển ('về phía'), phương tiện hoặc cách thức thực hiện hành động ('bằng'), hoặc tư cách, nguyên liệu.",
    "longExplanation": "'-(으)로' là một trong những tiểu từ đa năng và quan trọng nhất trong tiếng Hàn. Nó thường biểu thị: (1) Phương hướng di chuyển của hành động ('về phía...'); (2) Phương tiện giao thông, công cụ, nguyên liệu hoặc phương thức để tiến hành hành động ('bằng tàu điện ngầm', 'bằng bút'); (3) Tư cách, vị thế hoặc sự biến đổi thành một trạng thái khác ('sang, thành').",
    "formation": "Danh từ kết thúc bằng phụ âm (trừ ㄹ) + 으로 / Danh từ kết thúc bằng nguyên âm hoặc phụ âm ㄹ + 로",
    "examples": [
      {
        "translation": "Tôi đi đến công ty bằng tàu điện ngầm vào mỗi buổi sáng."
      },
      {
        "translation": "Tôi đã thử bằng một phương pháp mới để giải quyết vấn đề này."
      },
      {
        "translation": "Tôi đã tiễn bạn tôi ra sân bay."
      },
      {
        "translation": "Tôi đã lập kế hoạch cho chuyến đi bằng giấy và bút."
      }
    ]
  },
  "ko__84": {
    "title": "-(으)로서 (Với tư cách là, ở cương vị...)",
    "shortExplanation": "Tiểu từ chỉ tư cách, thân phận, địa vị hoặc chức danh của một người hay sự vật khi thực hiện hành động ('với tư cách là', 'ở cương vị...').",
    "longExplanation": "'-(으)로서' là tiểu từ phó từ gắn sau danh từ chỉ người, tổ chức hoặc đối tượng có thân phận, dùng để biểu thị tư cách, vị trí, chức vụ hoặc danh phận mà một người nắm giữ khi thực hiện hành động ('với tư cách là học sinh', 'ở cương vị người mẹ'). Lưu ý: cần phân biệt rõ với '-(으)로써' (tiểu từ chỉ phương tiện, công cụ).",
    "formation": "Danh từ kết thúc bằng phụ âm (trừ ㄹ) + 으로서 / Danh từ kết thúc bằng nguyên âm hoặc phụ âm ㄹ + 로서",
    "examples": [
      {
        "translation": "Tôi đang dốc hết sức mình để hoàn thành vai trò của một phóng viên."
      },
      {
        "translation": "Với tư cách là một học sinh, tôi phải làm tròn bổn phận của mình."
      },
      {
        "translation": "Cuối cùng, với tư cách là một công dân, tôi phải thực hiện một việc hết sức quan trọng."
      },
      {
        "translation": "Ở cương vị một người mẹ, cô ấy luôn làm hết sức mình vì gia đình."
      }
    ]
  },
  "ko__85": {
    "title": "-(으)로써 (Bằng cách, nhờ vào, bằng phương tiện...)",
    "shortExplanation": "Tiểu từ cách mang tính trang trọng biểu thị công cụ, phương tiện, phương thức hoặc nguyên liệu để đạt được mục tiêu hay hoàn thành hành động ('bằng việc...', 'nhờ vào...').",
    "longExplanation": "'-(으)로써' là tiểu từ phó từ gắn sau danh từ (hoặc danh từ hóa '-(으)ㅁ으로써'), dùng để nhấn mạnh phương tiện, công cụ, nguyên liệu hoặc phương thức mà nhờ đó một hành động được hoàn thành hay một kết quả được tạo ra. Khác với '-(으)로서' (chỉ tư cách/thân phận), '-(으)로써' chỉ công cụ và cách thức, thường mang sắc thái trang trọng, văn viết hoặc nhấn mạnh.",
    "formation": "Danh từ kết thúc bằng phụ âm (trừ ㄹ) + 으로써 / Danh từ kết thúc bằng nguyên âm hoặc phụ âm ㄹ + 로써",
    "examples": [
      {
        "translation": "Tôi đã thành công đạt được thành quả này nhờ vào sự nỗ lực."
      },
      {
        "translation": "Anh ấy đã học được phương pháp tự kiểm soát bản thân bằng việc quản lý thời gian."
      },
      {
        "translation": "Bài tập này tôi đã hoàn thành nhờ vào sự chỉ dạy của cô ấy."
      },
      {
        "translation": "Với vai trò chỉ đạo của đạo diễn, ông ấy đã hoàn thành bộ phim."
      }
    ]
  },
  "ko__86": {
    "title": "-(으)려고 하다 (Định, dự định làm gì, cố gắng làm gì)",
    "shortExplanation": "Cấu trúc biểu thị ý định, kế hoạch sẽ thực hiện một hành động nào đó trong tương lai hoặc nỗ lực để đạt được mục tiêu ('định', 'dự định', 'muốn').",
    "longExplanation": "'-(으)려고 하다' là cấu trúc ngữ pháp dùng để biểu đạt ý định, dự định hoặc kế hoạch làm một việc gì đó trong tương lai của chủ ngữ (tương đương với 'định...', 'dự định làm...' trong tiếng Việt). Ngoài ra cấu trúc này còn có thể dùng để diễn đạt sự nỗ lực, cố gắng hướng tới một mục tiêu cụ thể. Dạng quá khứ '-(으)려고 했다' thường diễn tả dự định đã ấp ủ nhưng có thể chưa thực hiện được hoặc bị gián đoạn.",
    "formation": "Thân động từ (có patchim trừ ㄹ) + 으려고 하다 / Thân động từ (không có patchim hoặc có patchim ㄹ) + 려고 하다",
    "examples": [
      {
        "translation": "Tôi luyện tập rất nhiều mỗi ngày để cố gắng nói tiếng Hàn giỏi hơn."
      },
      {
        "translation": "Mẹ tôi học nấu ăn vì muốn chuẩn bị một bữa tối thật ngon."
      },
      {
        "translation": "Em tôi định tập thể dục mỗi ngày để phát triển chiều cao tốt hơn."
      },
      {
        "translation": "Tôi đã cập nhật điện thoại để định dùng thử ứng dụng mới mà bạn tôi giới thiệu."
      }
    ]
  },
  "ko__87": {
    "title": "-(으)리라 (Chắc là..., ắt hẳn sẽ...)",
    "shortExplanation": "Vĩ tố kết thúc câu mang sắc thái trang trọng, văn viết dùng để biểu thị sự suy đoán, phán đoán chắc chắn của người nói về một sự việc ('chắc sẽ', 'ắt hẳn là').",
    "longExplanation": "'-(으)리라' là vĩ tố kết thúc câu cổ điển hoặc mang tính trang trọng, văn phong viết, dùng để biểu thị sự suy đoán, dự cảm của người nói về một sự việc trong tương lai hoặc chưa xảy ra (tương đương 'chắc là...', 'ắt sẽ...'). Ngoài ra, khi chủ ngữ là ngôi thứ nhất trong độc thoại, cấu trúc này còn có thể biểu thị ý chí, quyết tâm sắt đá ('nhất định sẽ làm'). Trong các câu trích dẫn gián tiếp, nó thường kết hợp với '생각하다', '예상하다', '믿다'.",
    "formation": "Thân động từ/tính từ (có patchim trừ ㄹ) + 으리라 / Thân động từ/tính từ (không có patchim hoặc có patchim ㄹ) + 리라",
    "examples": [
      {
        "translation": "Tôi nghĩ có lẽ ngày mai anh ấy sẽ đi làm."
      },
      {
        "translation": "Tôi tin chắc rằng điểm thi cuối kỳ của mình ắt sẽ rất tốt."
      },
      {
        "translation": "Tôi nghĩ rằng trời chắc sẽ mưa nên đã mang theo ô."
      },
      {
        "translation": "Tôi đã dự đoán rằng mình chắc sẽ được thăng chức nhanh chóng ở công ty."
      }
    ]
  },
  "ko__88": {
    "title": "-(으)실 거예요 (Chắc là [người lớn] sẽ..., [người lớn] sẽ...)",
    "shortExplanation": "Kết hợp giữa vĩ tố kính ngữ '-(으)시-' và đuôi câu tương lai/suy đoán '-(으)ㄹ 거예요' để phỏng đoán lịch sự về hành động hoặc trạng thái của đối tượng được tôn kính.",
    "longExplanation": "'-(으)실 거예요' là sự kết hợp giữa vĩ tố tôn kính chủ ngữ '-(으)시-' và đuôi kết thúc câu biểu thị tương lai hoặc suy đoán '-(으)ㄹ 거예요'. Cấu trúc này dùng để diễn đạt dự định trong tương lai của người bề trên một cách cung kính, hoặc đưa ra sự phỏng đoán lịch sự về hành động, trạng thái của đối tượng đáng được tôn kính (bố mẹ, thầy cô, cấp trên...).",
    "formation": "Thân động từ/tính từ (có patchim trừ ㄹ) + 으실 거예요 / Thân động từ/tính từ (không có patchim hoặc có patchim ㄹ) + 실 거예요",
    "examples": [
      {
        "translation": "Mẹ chắc sẽ ra ngoài vào sáng sớm ngày mai, nên bạn hãy chuẩn bị bữa sáng trước nhé."
      },
      {
        "translation": "Thầy giáo chắc hẳn là biết rất rõ về vấn đề này."
      },
      {
        "translation": "Bố mẹ chúng tôi chắc là đang nghĩ tuần sau sẽ đến công ty."
      },
      {
        "translation": "Tổng thống chắc chắn sẽ lại đến thăm nơi này vào năm sau."
      }
    ]
  },
  "ko__89": {
    "title": "-(으)면 좋겠다 (Ước gì..., giá như..., nếu... thì tốt biết mấy)",
    "shortExplanation": "Cấu trúc dùng để biểu đạt mong ước, nguyện vọng tha thiết của người nói về một sự việc hoặc tình huống ('ước gì', 'giá mà').",
    "longExplanation": "'-(으)면 좋겠다' là cấu trúc ngữ pháp dùng để thể hiện niềm hy vọng, ước muốn của người nói về một sự việc xảy ra trong tương lai hoặc thay đổi một hiện thực nào đó (tương đương 'ước gì...', 'nếu... thì tốt biết mấy'). Dạng quá khứ '-았/었으면 좋겠다' nhấn mạnh mong muốn tha thiết hơn, đôi khi diễn tả ước mơ trái ngược với thực tế ở hiện tại.",
    "formation": "Thân động từ/tính từ (có patchim trừ ㄹ) + 으면 좋겠다 / Thân động từ/tính từ (không có patchim hoặc có patchim ㄹ) + 면 좋겠다 (hoặc dạng quá khứ: -았/었으면 좋겠다)",
    "examples": [
      {
        "translation": "Ước gì ngày mai thời tiết đẹp. Tôi có kế hoạch ra ngoài nên mong là trời quang mây tạnh."
      },
      {
        "translation": "Giá mà tôi làm bài thi tốt thì tuyệt quá, vì tôi đã bỏ ra rất nhiều công sức."
      },
      {
        "translation": "Ước gì được ăn gà rán, vì tôi cực kỳ thích món gà rán."
      },
      {
        "translation": "Giá như có thể đi du lịch thì tốt biết mấy. Cứ bị giam mình ở nhà chán quá đi thôi."
      }
    ]
  },
  "ko__90": {
    "title": "-(으)면서도 (Vừa... lại vừa..., dù... nhưng vẫn...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị hai hành động/trạng thái diễn ra đồng thời nhưng mang tính đối lập, mâu thuẫn hoặc trái với lẽ thường ('vậy mà', 'dù... nhưng').",
    "longExplanation": "'-(으)면서도' kết hợp vĩ tố đồng thời '-(으)면서' với trợ từ tương phản '도'. Cấu trúc này dùng để diễn tả một hành động hay trạng thái diễn ra đồng thời với một tình huống khác, nhưng nhấn mạnh sự mâu thuẫn, tương phản hoặc trái ngược với lẽ tự nhiên và kỳ vọng thông thường (tương đương 'dù... vậy mà vẫn...', 'vừa... thế nhưng lại...'). Cả hai vế phải cùng chung một chủ ngữ.",
    "formation": "Thân động từ/tính từ (có patchim trừ ㄹ) + 으면서도 / Thân động từ/tính từ (không có patchim hoặc có patchim ㄹ) + 면서도",
    "examples": [
      {
        "translation": "Anh ấy dù đang tức giận nhưng vẫn nở nụ cười."
      },
      {
        "translation": "Cô ấy dù bị ốm nhưng vẫn đi học."
      },
      {
        "translation": "Dù trời đang mưa nhưng buổi phát sóng vẫn tiếp tục được tiến hành."
      },
      {
        "translation": "Đứa trẻ này vừa xem phim mà trong đầu vẫn luôn ấp ủ kế hoạch đi chơi."
      }
    ]
  },
  "ko__91": {
    "title": "-(으)니까 (Vì... nên, do... nên)",
    "shortExplanation": "Vĩ tố liên kết biểu thị nguyên nhân, lý do chủ quan; đặc biệt thích hợp dùng với câu mệnh lệnh, thỉnh dụ hoặc biểu thị phát hiện mới.",
    "longExplanation": "'-(으)니까' là vĩ tố liên kết nối hai mệnh đề, dùng để nêu lý do, căn cứ cho mệnh đề sau (tương đương với 'vì... nên...', 'do...'). Khác với '-아/어서', cấu trúc '-(으)니까' thường mang tính chủ quan và có thể kết hợp tự nhiên với các đuôi câu mệnh lệnh ('-(으)세요'), thỉnh dụ ('-(으)ㅂ시다') hoặc rủ rê ('-(으)ㄹ까요'). Ngoài ra, nó cũng có thể diễn tả sự nhận thức, phát hiện sau khi hoàn thành một hành động.",
    "formation": "Thân động từ/tính từ (có patchim trừ ㄹ) + 으니까 / Thân động từ/tính từ (không có patchim hoặc có patchim ㄹ) + 니까 (quá khứ: -았/었으니까)",
    "examples": [
      {
        "translation": "Vì đã ăn trưa rồi nên bây giờ tôi không thấy đói."
      },
      {
        "translation": "Do đã ghé ngân hàng nên tôi đã có thể rút được tiền."
      },
      {
        "translation": "Tôi đang yên lặng học bài nên xin đừng làm phiền."
      },
      {
        "translation": "Trời đang mưa đấy nên bạn hãy mang theo ô đi nhé."
      }
    ]
  },
  "ko__92": {
    "title": "-다 보니 / -(으)다 보니 (Cứ liên tục làm gì thì thấy là..., làm gì một hồi rồi mới thấy...)",
    "shortExplanation": "Cấu trúc biểu thị việc duy trì, lặp lại một hành động trong quá khứ dẫn đến kết quả hoặc sự nhận thức mới ở vế sau.",
    "longExplanation": "'-다 보니' (kết hợp từ '-다가 보니') là cấu trúc ngữ pháp dùng khi một hành động được thực hiện liên tục hoặc lặp đi lặp lại trong một khoảng thời gian, và qua quá trình đó người nói tự nhiên nhận ra một điều gì đó hoặc đạt tới một kết quả, trạng thái cụ thể. Vế sau thường miêu tả kết quả diễn ra ngoài dự tính hoặc trải nghiệm cá nhân của người nói.",
    "formation": "Thân động từ + 다 보니 (thỉnh thoảng dùng dạng quá khứ: -았/었다 보니)",
    "examples": [
      {
        "translation": "Cứ đến sớm thế này nên tôi có thể nghỉ ngơi một lát trước khi bắt đầu."
      },
      {
        "translation": "Tập thể dục đều đặn mỗi ngày trong một tháng thì thấy cân nặng đã giảm đi phần nào."
      },
      {
        "translation": "Chăm chỉ học tập liên tục thì thấy kỹ năng tiếng Hàn của mình tiến bộ dần dần."
      },
      {
        "translation": "Cứ sáng nào cũng dậy sớm nên ăn trưa xong là tôi thấy mệt ngay."
      }
    ]
  },
  "ko__93": {
    "title": "-다가 / -(으)다가 (Đang... thì..., rồi lại...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị một hành động hoặc trạng thái đang diễn ra thì bị gián đoạn và chuyển hướng sang một hành động/trạng thái khác.",
    "longExplanation": "'-다가' là vĩ tố liên kết dùng để diễn tả một hành động hoặc trạng thái đang trong quá trình diễn ra thì dừng lại hoặc bị gián đoạn, nhường chỗ cho một hành động hay sự việc khác chen ngang (tương đương với 'đang... thì...', 'vừa mới... thì bỗng nhiên...'). Hai mệnh đề thường có cùng một chủ ngữ, trừ trường hợp miêu tả các hiện tượng tự nhiên hay ngoại cảnh đột ngột xảy ra.",
    "formation": "Thân động từ/tính từ + 다가 (thì quá khứ: Thân động từ/tính từ + 았/었다가)",
    "examples": [
      {
        "translation": "Tôi đang đọc sách dở thì ngủ thiếp đi mất nên đã không đọc được phần cuối."
      },
      {
        "translation": "Chúng tôi đang xem phim thì bỗng nhiên mất điện nên không thể xem được đoạn kết."
      },
      {
        "translation": "Anh ấy đang nói chuyện thì bỗng nhiên bật cười lớn làm mọi người đều giật mình."
      },
      {
        "translation": "Tôi đang trên đường về nhà thì tình cờ gặp bạn nên đã đi ăn tối cùng nhau."
      }
    ]
  },
  "ko__94": {
    "title": "-던 / -(으)던 (Đã từng..., từng hay...)",
    "shortExplanation": "Vĩ tố định ngữ hồi tưởng dùng để bổ nghĩa cho danh từ, biểu thị một hành động hoặc trạng thái thường xuyên xảy ra trong quá khứ nhưng nay đã chấm dứt hoặc bị gián đoạn.",
    "longExplanation": "'-던' là vĩ tố định ngữ dạng hồi tưởng đứng sau động từ hoặc tính từ để bổ nghĩa cho danh từ đi liền sau. Cấu trúc này gợi nhắc lại một thói quen, một trạng thái lặp đi lặp lại trong quá khứ, hoặc một hành động còn dang dở chưa hoàn tất tại thời điểm đó (tương đương với 'đã từng...', 'từng hay làm...' trong tiếng Việt). Nó thường mang hàm ý sự việc trong quá khứ đó hiện tại không còn tiếp diễn nữa.",
    "formation": "Thân động từ/tính từ + 던 (dạng quá khứ hoàn tất: Thân động từ/tính từ + 았/었던)",
    "examples": [
      {
        "translation": "Hồi nhỏ tôi từng là một đứa trẻ khóc rất nhiều, thế nhưng bây giờ thì hầu như tôi chẳng bao giờ khóc nữa."
      },
      {
        "translation": "Thuở nhỏ anh ấy từng luôn là một người rất thích ăn táo, nhưng giờ đây anh ấy lại ghét táo."
      },
      {
        "translation": "Ở trường chúng tôi từng có một thầy giáo dạy toán mà rất nhiều học sinh không ưa thích."
      },
      {
        "translation": "Bà ấy từng là một người phụ nữ tốt bụng sống ở ngọn núi phía trước, nhưng giờ đây chúng tôi không còn gặp lại bà ấy nữa."
      }
    ]
  },
  "ko__95": {
    "title": "-(으)려면 (Nếu muốn..., để có thể...)",
    "shortExplanation": "Vĩ tố liên kết kết hợp giữa ý định '-(으)려고 하다' và điều kiện '-(으)면', biểu thị điều kiện cần thiết để đạt được một mục tiêu hoặc ý định ('nếu muốn... thì phải...').",
    "longExplanation": "'-(으)려면' là dạng rút gọn của cấu trúc '-(으)려고 하면', kết hợp giữa ý định làm một việc gì đó và giả định điều kiện. Cấu trúc này dùng khi người nói muốn đặt ra điều kiện, phương thức hoặc yêu cầu bắt buộc ở mệnh đề sau nhằm hiện thực hóa mục tiêu đã nêu ở mệnh đề trước (tương đương 'nếu muốn... thì...'). Mệnh đề sau thường đi kèm các biểu hiện mang tính nghĩa vụ, lời khuyên như '-아/어야 하다', '-(으)세요', '필요하다'.",
    "formation": "Thân động từ (có patchim trừ ㄹ) + 으려면 / Thân động từ (không có patchim hoặc có patchim ㄹ) + 려면",
    "examples": [
      {
        "translation": "Nếu muốn đỗ kỳ thi tiếng Hàn TOPIK thì bạn phải luyện tập thật nhiều. Nếu không thì sẽ rất khó thành công."
      },
      {
        "translation": "Nếu muốn duy trì vóc dáng đẹp ở phòng tập thì bạn cần kiên trì tập luyện và giữ chế độ ăn uống lành mạnh."
      },
      {
        "translation": "Để có được công việc này thì bạn cần có kinh nghiệm trong lĩnh vực liên quan. Nếu không có thì sẽ thiếu tính cạnh tranh."
      },
      {
        "translation": "Nếu muốn phòng ngừa vấn đề như thế này thì cần có kế hoạch tỉ mỉ hơn. Nếu không chúng ta có thể lại gặp phải rắc rối tương tự."
      }
    ]
  },
  "ko__96": {
    "title": "-(으)ㄹ수록 (Càng... càng...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị mức độ của hành động hoặc trạng thái ở vế trước tăng lên thì mức độ ở vế sau cũng tỉ lệ thuận tăng lên theo ('càng... càng...').",
    "longExplanation": "'-(으)ㄹ수록' là vĩ tố liên kết dùng để diễn tả mối quan hệ tỉ lệ thuận giữa hai mệnh đề: khi một tình huống, hành động hay mức độ ở vế trước ngày càng gia tăng (hoặc biến đổi) thì mức độ ở vế sau cũng biến chuyển sâu sắc hơn tương ứng (tương đương với cấu trúc 'càng... càng...' trong tiếng Việt). Thường kết hợp với '-(으)면 -(으)ㄹ수록' để tăng thêm tính nhấn mạnh.",
    "formation": "Thân động từ/tính từ (có patchim trừ ㄹ) + 을수록 / Thân động từ/tính từ (không có patchim hoặc có patchim ㄹ) + ㄹ수록",
    "examples": [
      {
        "translation": "Càng tập thể dục thì cơ thể càng khỏe mạnh nên mỗi sáng tôi đều chạy bộ."
      },
      {
        "translation": "Càng học nhiều thì càng có thể đạt được điểm số tốt hơn trong kỳ thi."
      },
      {
        "translation": "Càng ăn nhanh thì càng dễ bị khó tiêu."
      },
      {
        "translation": "Thời gian trôi qua càng lâu thì nỗi nhớ nhung lại càng thêm sâu đậm."
      }
    ]
  },
  "ko__97": {
    "title": "-는 중 (Đang trong quá trình..., đang giữa chừng làm gì)",
    "shortExplanation": "Cấu trúc kết hợp định ngữ '-는' với danh từ phụ thuộc '중' (trung/trong), biểu thị hành động đang được tiến hành hoặc đang diễn ra ngay tại thời điểm nói ('đang trong lúc', 'đang làm gì').",
    "longExplanation": "'-는 중' (thường kết hợp với tiểu từ hoặc vĩ tố như '-는 중이다', '-는 중이라서') được dùng để chỉ một hành động đang được thực hiện tích cực hoặc đang trong tiến trình diễn ra tại một thời điểm nhất định (tương đương với 'đang trong lúc...', 'đang... giữa chừng'). Nó nhấn mạnh tiến độ đang tiếp diễn của hành động tương tự cấu trúc '-고 있다', nhưng mang tính khách quan và trang trọng hơn. Với danh từ Hán-Hàn chỉ động tác có thể kết hợp trực tiếp dưới dạng 'Danh từ + 중' (ví dụ: 회의 중, 통화 중).",
    "formation": "Thân động từ + 는 중 (hoặc Danh từ hành động + 중)",
    "examples": [
      {
        "translation": "Bây giờ tôi đang làm bài tập về nhà nên lát nữa tôi sẽ liên lạc lại nhé."
      },
      {
        "translation": "Anh trai tôi hình như đang bận vì đang mải gọi điện thoại với bạn gái."
      },
      {
        "translation": "Mẹ tôi đang liên tục đặt câu hỏi nên tôi không thể tập trung được."
      },
      {
        "translation": "Cô ấy đang xem một bộ phim rất thú vị nên đang cười khúc khích."
      }
    ]
  },
  "ko__98": {
    "title": "-(으)ㄴ/는 탓에 (Tại vì..., do... mà dẫn đến hậu quả xấu)",
    "shortExplanation": "Cấu trúc kết hợp định ngữ với danh từ phụ thuộc '탓' (lỗi, nguyên cớ), chỉ nguyên nhân dẫn đến một kết quả tiêu cực, đáng tiếc hoặc trách cứ ('tại vì... nên mới...').",
    "longExplanation": "'-(으)ㄴ/는 탓에' là cấu trúc ngữ pháp dùng để nêu ra lý do, nguyên nhân gây ra một kết quả xấu, tai hại hoặc không như mong muốn ở mệnh đề sau (tương đương với 'tại...', 'chỉ vì... mà...'). Từ '탓' vốn mang nghĩa đổ lỗi, trách cứ, do đó cấu trúc này tuyệt đối không dùng cho những kết quả tích cực hay tốt lành (khi muốn nói nguyên nhân đem lại kết quả tốt thì dùng '-(으)ㄴ/는 덕분에').",
    "formation": "Thân động từ (quá khứ) + 은/ㄴ 탓에 / Thân động từ (hiện tại) + 는 탓에 / Thân tính từ + 은/ㄴ 탓에 / Danh từ + 인 탓에",
    "examples": [
      {
        "translation": "Chặt quá nhiều cây khiến môi trường khu phố chúng tôi trở nên tồi tệ, vì thế mà nhiều người bị đau ốm."
      },
      {
        "translation": "Tại tuần trước tôi ăn quá nhiều nên tuần này cân nặng đã tăng vọt."
      },
      {
        "translation": "Do không luyện tập đầy đủ nên tôi đã không đạt được điểm tốt trong kỳ thi."
      },
      {
        "translation": "Mẹ định đi mua nguyên liệu nhưng vì lỡ chuyến xe buýt cuối cùng nên hôm nay không nấu ăn được."
      }
    ]
  },
  "ko__99": {
    "title": "-(으)ㄴ/는데다가 (Không những... mà còn..., thêm vào đó...)",
    "shortExplanation": "Cấu trúc bổ sung thêm thông tin, diễn tả một hành động hay trạng thái không những đã như thế ở vế trước mà lại còn cộng thêm một đặc điểm cùng tính chất ở vế sau ('không những... mà còn').",
    "longExplanation": "'-(으)ㄴ/는데다가' kết hợp giữa định ngữ '-(으)ㄴ/는', danh từ phụ thuộc '데' (chỗ, việc, trường hợp) và trợ từ '다가'. Cấu trúc này dùng để bổ sung một sự việc, tính chất khác vào tình huống đã nêu trước đó (tương đương với 'đã... lại còn...', 'không những... mà thêm vào đó...'). Điều quan trọng là tính chất ở hai mệnh đề phải đồng nhất: hoặc là cùng tích cực (khen ngợi), hoặc là cùng tiêu cực (chê trách).",
    "formation": "Thân tính từ + 은/ㄴ 데다가 / Thân động từ + 는 데다가 (quá khứ: 은/ㄴ 데다가) / Danh từ + 인 데다가",
    "examples": [
      {
        "translation": "Quán cà phê này không những không khí dễ chịu mà hương vị cà phê còn rất tuyệt vời."
      },
      {
        "translation": "Cuốn sách đó không những thú vị mà thêm vào đó lại còn rất bổ ích."
      },
      {
        "translation": "Chiếc điện thoại này giá cả vừa rẻ mà tính năng lại còn đa dạng."
      },
      {
        "translation": "Anh ấy không những tốt bụng mà lại còn thông minh nữa nên ai cũng quý mến."
      }
    ]
  },
  "ko__100": {
    "title": "-(으)ㄴ/는데도 불구하고 (Mặc dù... nhưng..., bất chấp...)",
    "shortExplanation": "Cấu trúc tương phản mạnh mẽ, biểu thị kết quả ở vế sau vẫn diễn ra bất chấp tiền đề hay điều kiện cản trở được nêu ở vế trước ('mặc dù... nhưng vẫn').",
    "longExplanation": "'-(으)ㄴ/는데도 불구하고' là cấu trúc liên kết biểu thị sự nhượng bộ mạnh trong tiếng Hàn (tương đương với 'mặc dù... nhưng...', 'bất chấp...'). Mệnh đề trước đưa ra một hoàn cảnh, trở ngại hoặc điều kiện mà thông thường sẽ dẫn đến một kết quả khác, nhưng mệnh đề sau lại diễn ra một hành động hoặc kết quả trái ngược hẳn với sự mong đợi hay suy đoán tự nhiên đó. Cấu trúc này mang sắc thái nhấn mạnh hơn so với '-(으)ㄴ/는데도'.",
    "formation": "Thân tính từ + 은/ㄴ 데도 불구하고 / Thân động từ + 는데도 불구하고 (quá khứ: 았/었는데도 불구하고) / Danh từ + 인데도 불구하고",
    "examples": [
      {
        "translation": "Mặc dù trời mưa nhưng cô ấy vẫn ra ngoài chơi đùa rất vui vẻ."
      },
      {
        "translation": "Bất chấp việc bị ốm, cậu ấy vẫn đi đến trường học."
      },
      {
        "translation": "Dù không đạt được kết quả như mong muốn nhưng chúng tôi vẫn không ngừng nỗ lực."
      },
      {
        "translation": "Mặc dù bài thi rất khó nhưng cậu ấy vẫn làm bài rất tốt."
      }
    ]
  },
  "ko__101": {
    "title": "-(으)ㄴ/는지 모르겠다 (Không biết là có... hay không)",
    "shortExplanation": "Cấu trúc dùng để biểu thị sự không chắc chắn, hồ nghi hoặc thiếu tự tin về một sự việc, tình huống ('không biết là...', 'chẳng rõ có... không').",
    "longExplanation": "'-(으)ㄴ/는지 모르겠다' là cấu trúc ngữ pháp dùng khi người nói không nắm rõ hoặc không dám khẳng định về một sự việc, trạng thái nào đó (tương đương với 'không biết là có... hay không', 'chẳng rõ liệu...'). Ở hiện tại, động từ đi với '-는지', tính từ có patchim đi với '-은지', không patchim đi với '-ㄴ지', danh từ đi với '인지'. Ở quá khứ dùng '-았/었는지 모르겠다' và tương lai/suy đoán dùng '-(으)ㄹ지 모르겠다'. Có thể thay '모르겠다' bằng '모르다', '알 수 없다'.",
    "formation": "Thân động từ + -는지 모르겠다 / Thân tính từ (có patchim trừ ㄹ) + -은지 모르겠다 / Thân tính từ (không có patchim hoặc có patchim ㄹ) + -ㄴ지 모르겠다 / Danh từ + -인지 모르겠다 (quá khứ: -았/었는지 모르겠다)",
    "examples": [
      {
        "translation": "Tôi không biết là mình có nhớ chính xác địa điểm khi rời đi không nữa."
      },
      {
        "translation": "Tôi không biết là anh ấy có còn yêu tôi nữa hay không."
      },
      {
        "translation": "Không biết trời vừa rồi có mưa không mà mặt đất đang bị ướt."
      },
      {
        "translation": "Tôi không biết ngày mai mình có thể đến trường được hay không. Người tôi hơi khó chịu."
      }
    ]
  },
  "ko__102": {
    "title": "-(으)려는 참이다 (Đang định làm gì, vừa đúng lúc định...)",
    "shortExplanation": "Diễn tả thời điểm người nói chuẩn bị thực hiện một hành động nào đó ngay lúc ấy ('vừa đúng lúc định...', 'đang tính làm...').",
    "longExplanation": "'-(으)려는 참이다' là cấu trúc diễn tả hành động mà người nói đang chuẩn bị hoặc định thực hiện đúng vào thời điểm đó (tương đương với 'đang định...', 'vừa đúng lúc tính làm...'). Khi dùng ở thì quá khứ '-(으)려는 참이었다', cấu trúc thường kết hợp với vĩ tố đối lập '-지만' hoặc '-는데' để diễn tả dự định vừa chớm bắt đầu nhưng bị ngăn cản, cản trở hoặc không thể thực hiện do nguyên nhân khách quan.",
    "formation": "Thân động từ (có patchim trừ ㄹ) + 으려는 참이다 / Thân động từ (không có patchim hoặc có patchim ㄹ) + 려는 참이다",
    "examples": [
      {
        "translation": "Tôi vừa định nói gì đó với người này thì lại không tài nào mở lời được."
      },
      {
        "translation": "Tôi vừa tính nói trống không nhưng vì tôn trọng anh ấy nên đã nhịn lại."
      },
      {
        "translation": "Chúng tôi vừa định ra ngoài chơi thì thời tiết quá xấu nên không thể đi được."
      },
      {
        "translation": "Tôi vừa tính xem bộ phim đó nhưng vé bán hết sạch mất rồi nên không xem được."
      }
    ]
  },
  "ko__103": {
    "title": "-(으)ㄹ 것 같다 (Dường như sẽ..., có lẽ sẽ..., chắc là...)",
    "shortExplanation": "Cấu trúc biểu thị sự phỏng đoán, dự cảm về một việc sắp xảy ra hoặc đưa ra ý kiến cá nhân một cách nhẹ nhàng ('hình như sẽ...', 'có vẻ như...').",
    "longExplanation": "'-(으)ㄹ 것 같다' là cấu trúc dùng để phỏng đoán, dự đoán về một tình huống, hành động trong tương lai hoặc đưa ra nhận định mang tính chủ quan một cách uyển chuyển, nhẹ nhàng (tương đương với 'dường như sẽ...', 'có lẽ sẽ...', 'chắc là...'). Khi kết hợp với tính từ, nó phỏng đoán về một trạng thái sắp tới hoặc cảm giác chung; khi kết hợp với động từ, biểu thị phỏng đoán về hành động sắp xảy ra. Trong văn nói thân mật, đuôi câu thường là '것 같아(요)'.",
    "formation": "Thân động từ/tính từ (có patchim trừ ㄹ) + 을 것 같다 / Thân động từ/tính từ (không có patchim hoặc có patchim ㄹ) + ㄹ 것 같다 (danh từ: 일 것 같다)",
    "examples": [
      {
        "translation": "Ngày mai có vẻ trời sẽ mưa đấy. Bạn nên chuẩn bị sẵn ô thì hơn."
      },
      {
        "translation": "Cô ấy chắc sẽ rất hạnh phúc, vì cuối cùng cô ấy cũng đã gia nhập đội tuyển mơ ước."
      },
      {
        "translation": "Nhìn bản đồ này thì có vẻ như chúng ta sẽ bị lạc đường mất thôi."
      },
      {
        "translation": "Sản phẩm này có vẻ sẽ rất được ưa chuộng, vì tính năng của nó vô cùng vượt trội."
      }
    ]
  },
  "ko__104": {
    "title": "-(으)ㄹ 것이다 (Sẽ..., chắc chắn sẽ...)",
    "shortExplanation": "Vĩ tố kết thúc câu biểu thị thì tương lai, dự đoán mạnh mẽ hoặc ý chí, kế hoạch khách quan ('sẽ', 'chắc hẳn sẽ').",
    "longExplanation": "'-(으)ㄹ 것이다' là hình thái kết thúc câu cơ bản biểu thị thì tương lai hoặc sự suy đoán có căn cứ của người nói trong tiếng Hàn (tương đương 'sẽ...', 'chắc chắn sẽ...'). Khi chủ ngữ là ngôi thứ nhất, nó biểu thị ý chí, kế hoạch kiên định; khi chủ ngữ là ngôi thứ hai, thứ ba hoặc sự vật, nó biểu thị sự phỏng đoán, dự kiến khách quan. Trong văn nói hàng ngày, nó thường được rút gọn thành '-(으)ㄹ 거예요' hoặc '-(으)ㄹ 거다'.",
    "formation": "Thân động từ/tính từ (có patchim trừ ㄹ) + 을 것이다 / Thân động từ/tính từ (không có patchim hoặc có patchim ㄹ) + ㄹ 것이다",
    "examples": [
      {
        "translation": "Ngày mai thời tiết sẽ đẹp. Vì vậy mọi người đều sẽ muốn dành thời gian ở ngoài trời."
      },
      {
        "translation": "Tôi sẽ tốt nghiệp đại học vào năm tới. Và tôi sẽ chuẩn bị xin việc."
      },
      {
        "translation": "Cuối tuần này chúng tôi sẽ đi cắm trại. Vì thế chúng tôi sẽ mua đồ dùng cắm trại."
      },
      {
        "translation": "Vì cô ấy luyện tập piano rất nhiều nên chắc chắn sẽ sớm chơi giỏi thôi."
      }
    ]
  },
  "ko__105": {
    "title": "-(으)ㄹ 뿐만 아니라 (Không những... mà còn..., không chỉ... mà còn...)",
    "shortExplanation": "Cấu trúc liên kết biểu thị không chỉ dừng lại ở nội dung vế trước mà còn bổ sung thêm thông tin ở vế sau ('không những... mà còn...').",
    "longExplanation": "'-(으)ㄹ 뿐만 아니라' là cấu trúc liên kết biểu thị việc một đối tượng hay sự việc không chỉ dừng lại ở tính chất, hành động ở mệnh đề trước mà còn có thêm tính chất, hành động ở mệnh đề sau (tương đương với 'không những... mà còn...', 'không chỉ... mà còn...'). Thông thường, nội dung ở hai mệnh đề phải có tính chất tương đồng về mặt cảm xúc (cùng mang ý tích cực hoặc cùng mang ý tiêu cực). Danh từ kết hợp trực tiếp dưới dạng '뿐만 아니라'.",
    "formation": "Thân động từ/tính từ (có patchim trừ ㄹ) + 을 뿐만 아니라 / Thân động từ/tính từ (không có patchim hoặc có patchim ㄹ) + ㄹ 뿐만 아니라 / Danh từ + 뿐만 아니라",
    "examples": [
      {
        "translation": "Anh ấy không những làm tốt công việc mà tính sáng tạo cũng vượt trội nên được tất cả mọi người công nhận."
      },
      {
        "translation": "Nhà hàng này không chỉ phục vụ những món ăn ngon mà còn mang lại dịch vụ rất tuyệt vời."
      },
      {
        "translation": "Cô ấy không những giỏi tiếng Anh mà tiếng Trung và tiếng Nhật cũng rất lưu loát."
      },
      {
        "translation": "Jimin không chỉ nấu ăn ngon mà chụp ảnh cũng thực sự rất đẹp."
      }
    ]
  },
  "ko__106": {
    "title": "-(으)ㄹ 뿐이다 (Chỉ..., chỉ là... mà thôi)",
    "shortExplanation": "Cấu trúc kết thúc câu biểu thị sự duy nhất, nhấn mạnh ngoài hành động hoặc trạng thái đó ra thì không có gì khác ('chỉ...', 'chỉ là... mà thôi').",
    "longExplanation": "'-(으)ㄹ 뿐이다' là cấu trúc ngữ pháp dùng để nhấn mạnh tính duy nhất, độc nhất của một hành động hay trạng thái, ngoài điều đó ra thì không còn điều gì khác (tương đương với 'chỉ...', 'chỉ là... mà thôi'). Danh từ kết hợp dưới dạng 'Danh từ + 일 뿐이다'. Trong câu liên kết giữa chừng, nó thường xuất hiện dưới dạng '-(으)ㄹ 뿐이지' để tạo tương phản với hành động tiếp sau.",
    "formation": "Thân động từ/tính từ (có patchim trừ ㄹ) + 을 뿐이다 / Thân động từ/tính từ (không có patchim hoặc có patchim ㄹ) + ㄹ 뿐이다 / Danh từ + 일 뿐이다",
    "examples": [
      {
        "translation": "Cô ấy chỉ nói bằng miệng thôi chứ thực tế không hề hành động."
      },
      {
        "translation": "Tôi chỉ mỉm cười với cô ấy thôi, chứ thực tế chúng tôi không hề trò chuyện."
      },
      {
        "translation": "Bố chỉ tiếp chuyện với khách thôi chứ không hề giúp đỡ việc nhà."
      },
      {
        "translation": "Họ chỉ đi xem phim thôi, chứ không hề bàn luận gì về bộ phim cả."
      }
    ]
  },
  "ko__107": {
    "title": "-(으)ㄹ게요 (Tôi sẽ làm... nhé)",
    "shortExplanation": "Đuôi kết thúc câu thân mật lịch sự (해요체) biểu thị lời hứa, cam kết hoặc ý định thực hiện một hành động của người nói đối với người nghe ('tôi sẽ... nhé').",
    "longExplanation": "'-(으)ㄹ게요' là đuôi kết thúc câu lịch sự dùng khi người nói đưa ra một lời hứa, sự cam kết hoặc biểu thị ý muốn chủ động thực hiện một hành động có liên quan mật thiết tới đối phương (tương đương 'tôi sẽ... nhé'). Cấu trúc này chỉ dùng cho chủ ngữ ngôi thứ nhất (tôi, chúng tôi) trong câu trần thuật, không dùng trong câu nghi vấn hay câu có chủ ngữ ngôi thứ hai, thứ ba.",
    "formation": "Thân động từ (có patchim trừ ㄹ) + 을게요 / Thân động từ (không có patchim hoặc có patchim ㄹ) + ㄹ게요",
    "examples": [
      {
        "translation": "Tôi sẽ đích thân gọi điện để thông báo tình hình tiến độ cho bạn nhé."
      },
      {
        "translation": "Hành lý này tôi sẽ xách đi cho. Nặng lắm nên bạn đừng lo lắng nhé."
      },
      {
        "translation": "Tôi sẽ hoàn thành bài tập trước ngày mai và viết cả báo cáo nữa nhé."
      },
      {
        "translation": "Tối nay khi mọi người tụ họp đông đủ, tôi sẽ nấu đồ ăn rồi mang đến nhé."
      }
    ]
  },
  "ko__108": {
    "title": "-(으)ㄹ게 (Mình sẽ làm... nhé)",
    "shortExplanation": "Đuôi kết thúc câu thân mật không kính ngữ (반말) biểu thị lời hứa, cam kết của người nói với bạn bè hoặc người dưới ('mình sẽ...', 'tao sẽ...').",
    "longExplanation": "'-(으)ㄹ게' là dạng thân mật (반말) của '-(으)ㄹ게요', dùng trong giao tiếp giữa bạn bè thân thiết, người cùng trang lứa hoặc nói với người nhỏ tuổi hơn. Cấu trúc dùng để biểu thị lời hứa hẹn, cam kết hay ý muốn chủ động thực hiện một việc gì đó (tương đương 'mình sẽ... nhé', 'để tao làm cho'). Chỉ áp dụng cho chủ ngữ ngôi thứ nhất trong câu trần thuật.",
    "formation": "Thân động từ (có patchim trừ ㄹ) + 을게 / Thân động từ (không có patchim hoặc có patchim ㄹ) + ㄹ게",
    "examples": [
      {
        "translation": "Từ mai mình sẽ ăn kiêng nhé. Nốt hôm nay thôi là ăn đồ ngon thôi đấy."
      },
      {
        "translation": "Đừng lo lắng quá nhé. Mình sẽ học tiếng Hàn thật chăm chỉ mà."
      },
      {
        "translation": "Mình xin lỗi nhé. Từ bây giờ trở đi mình tuyệt đối sẽ không đến muộn nữa đâu."
      },
      {
        "translation": "Cậu chưa dọn phòng à? Không sao đâu, lát nữa để mình dọn cho nhé."
      }
    ]
  },
  "ko__109": {
    "title": "-(으)ㄹ래 (Mình muốn..., cậu có muốn... không?)",
    "shortExplanation": "Đuôi kết thúc câu thân mật (반말) biểu thị ý muốn, dự định của người nói trong câu trần thuật hoặc rủ rê, hỏi ý kiến đối phương trong câu nghi vấn ('mình muốn...', 'cậu... nhé?').",
    "longExplanation": "'-(으)ㄹ래' là đuôi kết thúc câu thân mật không kính ngữ (반말). Trong câu trần thuật với ngữ điệu đều hoặc xuống giọng, nó thể hiện ý định hoặc mong muốn của người nói một cách dứt khoát ('mình muốn làm...', 'mình sẽ...'). Trong câu nghi vấn với ngữ điệu lên giọng ('-(으)ㄹ래?'), nó dùng để hỏi ý muốn hoặc rủ rê, đề xuất đối phương cùng làm một việc gì đó ('cậu có muốn... không?', 'chúng mình... nhé?'). Dạng lịch sự tương ứng là '-(으)ㄹ래요'.",
    "formation": "Thân động từ (có patchim trừ ㄹ) + 을래 / Thân động từ (không có patchim hoặc có patchim ㄹ) + ㄹ래",
    "examples": [
      {
        "translation": "Tối nay mình muốn ăn thịt nướng. Vì mình đang muốn đến quán bít tết mà."
      },
      {
        "translation": "Ngày mai mình sẽ đi xem phim cùng bạn bè. Dạo này có nhiều phim hay lắm mà."
      },
      {
        "translation": "Cuối tuần này đi dã ngoại không cậu? Thời tiết có vẻ sẽ đẹp đấy."
      },
      {
        "translation": "Mình muốn tìm một sở thích mới. Mấy sở thích từ trước đến giờ thấy hơi chán rồi."
      }
    ]
  },
  "ko__110": {
    "title": "~(으)ㄹ 때 (Khi, lúc, trong khi)",
    "shortExplanation": "Cấu trúc định ngữ kết hợp với danh từ '때', biểu thị thời điểm hoặc khoảng thời gian diễn ra một hành động, trạng thái ('khi...', 'lúc...').",
    "longExplanation": "'~(으)ㄹ 때' là cấu trúc biểu thị mốc thời gian hoặc trường hợp mà một hành động hoặc trạng thái cụ thể diễn ra. Cấu trúc được tạo thành bằng cách kết hợp vĩ tố định ngữ tương lai/chưa hoàn thành '-(으)ㄹ' với danh từ phụ thuộc chỉ thời gian '때' (khi, lúc). Thân động từ hoặc tính từ kết thúc bằng nguyên âm hoặc phụ âm 'ㄹ' đi với '-ㄹ 때', kết thúc bằng phụ âm khác đi với '-을 때'. Danh từ chỉ thời gian hoặc sự kiện có thể kết hợp trực tiếp với '때' (như 방학 때 - lúc nghỉ hè, 식사 때 - lúc dùng bữa).",
    "formation": "Thân động từ / Thân tính từ (kết thúc bằng nguyên âm hoặc ㄹ: -ㄹ 때 / kết thúc bằng phụ âm: -을 때); Danh từ + 때",
    "examples": [
      {
        "translation": "Mỗi khi chị gái về nhà, việc luôn niềm nở đón chào là nhiệm vụ của cô em gái."
      },
      {
        "translation": "Tôi có thói quen luôn uống cà phê lúc đi làm."
      },
      {
        "translation": "Nghe nhạc khi học bài giúp ích rất nhiều cho việc tập trung."
      },
      {
        "translation": "Nghe một bài hát vui tươi khi trời mưa là một ý tưởng tuyệt vời."
      }
    ]
  },
  "ko__111": {
    "title": "-(으)ㄹ 테니까 (Vì chắc là sẽ... nên hãy..., tôi sẽ... nên bạn hãy...)",
    "shortExplanation": "Vĩ tố liên kết đưa ra phỏng đoán có căn cứ hoặc ý định của người nói ở vế trước làm tiền đề cho lời đề nghị, mệnh lệnh ở vế sau ('chắc sẽ... nên hãy...').",
    "longExplanation": "'-(으)ㄹ 테니까' kết hợp cấu trúc biểu thị ý định/dự đoán '-(으)ㄹ 터' với vĩ tố chỉ nguyên nhân, căn cứ '-(으)니까'. Cấu trúc có 2 chức năng chính:\n1) Khi chủ ngữ là ngôi thứ 1: Biểu thị ý chí, cam kết của người nói làm tiền đề yêu cầu người nghe ('Tôi sẽ lo việc này nên bạn hãy...').\n2) Khi chủ ngữ là ngôi thứ 2, 3 hoặc nói về hoàn cảnh: Biểu thị sự suy đoán, phỏng đoán chắc chắn của người nói làm căn cứ đưa ra lời khuyên, đề xuất hoặc mệnh lệnh ở vế sau ('Chắc là trời sẽ mưa nên bạn hãy mang theo ô'). Mệnh đề sau thường đi kèm đuôi câu mệnh lệnh ('-(으)세요') hoặc thỉnh dụ ('-(으)ㅂ시다').",
    "formation": "Thân động từ/tính từ (có patchim trừ ㄹ) + 을 테니까 / Thân động từ/tính từ (không có patchim hoặc có patchim ㄹ) + ㄹ 테니까 (quá khứ: -았/었을 테니까)",
    "examples": [
      {
        "translation": "Trời sẽ muộn lắm đấy nên bây giờ bạn về nhà là tốt nhất."
      },
      {
        "translation": "Chắc là trời sẽ mưa đấy nên bạn hãy mang theo ô đi nhé."
      },
      {
        "translation": "Ngày mai chắc sẽ có bài kiểm tra đấy nên tối nay bạn nên ôn bài thì hơn."
      },
      {
        "translation": "Chắc là anh ấy đã biết chuyện rồi nên bạn đừng lo lắng quá nhé."
      }
    ]
  },
  "ko__112": {
    "title": "-(으)ㄹ지라도 (Cho dù... đi chăng nữa, dẫu cho...)",
    "shortExplanation": "Vĩ tố liên kết trang trọng biểu thị giả định nhượng bộ; cho dù có giả định một nghịch cảnh hay khó khăn thì kết quả hoặc quyết tâm ở vế sau vẫn không hề thay đổi ('cho dù... đi chăng nữa').",
    "longExplanation": "'-(으)ㄹ지라도' là vĩ tố liên kết nhượng bộ mang tính trang trọng, văn phong viết (tương đương với 'cho dù... đi chăng nữa', 'dẫu cho...'). Cấu trúc này thừa nhận hoặc giả định một tình huống khó khăn, bất lợi ở mệnh đề trước, nhưng khẳng định rằng lập trường, quyết tâm hoặc kết quả ở mệnh đề sau vẫn kiên định không hề bị ảnh hưởng. Thường đi kèm với các phó từ nhấn mạnh như '비록', '설령', '아무리'.",
    "formation": "Thân động từ/tính từ (có patchim trừ ㄹ) + 을지라도 / Thân động từ/tính từ (không có patchim hoặc có patchim ㄹ) + ㄹ지라도 (quá khứ: -았/었을지라도)",
    "examples": [
      {
        "translation": "Cho dù công việc này có khó khăn đến mức nào đi chăng nữa, tôi nhất định cũng sẽ làm được."
      },
      {
        "translation": "Dù có buồn ngủ đến mấy đi nữa thì vì kỳ thi sắp tới, tôi vẫn phải thức trắng đêm học bài."
      },
      {
        "translation": "Cho dù trời không mưa đi chăng nữa thì bạn vẫn luôn nên mang theo ô."
      },
      {
        "translation": "Cho dù thời tiết có lạnh đến mấy thì tôi lúc nào cũng muốn ăn kem."
      }
    ]
  },
  "ko__113": {
    "title": "-(으)면서도 (Dù... nhưng vẫn..., vừa... lại vừa...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị hai hành động hoặc trạng thái diễn ra đồng thời nhưng mang tính mâu thuẫn, nghịch lý hoặc trái với lẽ thường ('vậy mà vẫn...', 'dù... nhưng').",
    "longExplanation": "'-(으)면서도' kết hợp vĩ tố đồng thời '-(으)면서' với trợ từ tương phản '도'. Dùng để diễn tả hai hành vi, tính chất hay trạng thái cùng tồn tại đồng thời ở một chủ thể nhưng trái ngược với lẽ thường hoặc mâu thuẫn lẫn nhau (tương đương 'dù... nhưng vẫn...', 'vừa... vậy mà lại...'). Cả hai mệnh đề phải có cùng một chủ ngữ.",
    "formation": "Thân động từ/tính từ (có patchim trừ ㄹ) + 으면서도 / Thân động từ/tính từ (không có patchim hoặc có patchim ㄹ) + 면서도",
    "examples": [
      {
        "translation": "Cô ấy dù bị ốm nhưng vẫn tiếp tục làm việc. Cô ấy đã vượt qua cơn đau để hoàn thành công việc."
      },
      {
        "translation": "Dù trời mưa nhưng lễ hội vẫn tiếp tục diễn ra. Mọi người đều đắm chìm trọn vẹn trong niềm vui."
      },
      {
        "translation": "Dù mắc lỗi nhưng anh ấy vẫn không hề bỏ cuộc cho đến phút cuối. Sự tập trung và tính kiên trì của anh ấy thật đáng nể."
      },
      {
        "translation": "Dù đã ăn xong bữa rồi mà tôi vẫn cảm thấy đói. Chắc là do vừa rồi chạy quá nhiều."
      }
    ]
  },
  "ko__114": {
    "title": "-(으)시면 (Nếu quý vị..., khi ngài...)",
    "shortExplanation": "Cấu trúc điều kiện kính ngữ trang trọng, tôn kính hành động hay trạng thái của đối phương ('nếu quý vị...', 'khi ngài...').",
    "longExplanation": "'-(으)시면' là sự kết hợp giữa vĩ tố tôn kính chủ ngữ '-(으)시-' và vĩ tố liên kết điều kiện '-(으)면'. Cấu trúc này dùng khi đưa ra giả định, điều kiện lịch sự hoặc tiền đề cho một hành động, trạng thái của người nghe hoặc nhân vật được tôn kính (tương đương 'nếu quý khách/ngài...', 'khi thầy/cô...'). Mệnh đề sau thường đi kèm với các đề xuất, yêu cầu hoặc lời cảm ơn trang trọng như '-(으)세요', '-(으)시겠습니까', '감사하겠습니다'.",
    "formation": "Thân động từ/tính từ (có patchim trừ ㄹ) + 으시면 / Thân động từ/tính từ (không có patchim hoặc có patchim ㄹ) + 시면",
    "examples": [
      {
        "translation": "Nếu thuận tiện thì tối nay bạn/anh có thể gọi điện cho tôi được không ạ?"
      },
      {
        "translation": "Khi tiết học kết thúc, nếu quý vị bắt đầu phần giới thiệu bản thân thì chúng tôi xin chân thành cảm ơn."
      },
      {
        "translation": "Nếu có thể được, ngày mai anh/chị có thể vui lòng tham dự cuộc họp được không ạ?"
      },
      {
        "translation": "Nếu có thời gian, quý vị vui lòng cho xem vài bức ảnh thì chúng tôi thật biết ơn."
      }
    ]
  },
  "ko__115": {
    "title": "-(으)시겠어요 (Chắc là ngài/bác... lắm nhỉ, quý khách có muốn... không ạ?)",
    "shortExplanation": "Đuôi kết thúc câu kính ngữ dùng để phỏng đoán lịch sự về trạng thái của đối phương ('chắc ngài... lắm') hoặc hỏi ý kiến một cách trang trọng ('quý khách có muốn... không ạ?').",
    "longExplanation": "'-(으)시겠어요' là sự kết hợp giữa vĩ tố tôn kính '-(으)시-', vĩ tố suy đoán/ý chí '-겠-' và đuôi câu kính ngữ thân mật '-어요'. Khi dùng trong câu trần thuật hoặc câu hỏi nhẹ nhàng, cấu trúc thể hiện sự phỏng đoán lịch sự, đồng cảm sâu sắc về tình trạng hoặc cảm xúc của đối phương (ví dụ: 'chắc bác mệt lắm nhỉ'). Khi dùng trong câu hỏi với ngữ điệu mời mọc, nó là lời đề nghị hoặc hỏi ý muốn của người nghe một cách vô cùng tôn kính, nhã nhặn.",
    "formation": "Thân động từ/tính từ (có patchim trừ ㄹ) + 으시겠어요 / Thân động từ/tính từ (không có patchim hoặc có patchim ㄹ) + 시겠어요",
    "examples": [
      {
        "translation": "Thời tiết khá là lạnh đấy ạ. Chắc là quý vị sẽ quàng khăn ấm nhỉ."
      },
      {
        "translation": "Thực sự là một ngày bận rộn với bác đúng không ạ? Chắc là bác mệt mỏi nhiều lắm."
      },
      {
        "translation": "Nhiều việc thế này thì chắc cuối tuần anh/chị cũng phải làm việc mất thôi."
      },
      {
        "translation": "Thời tiết nóng bức thế này chắc là quý khách sẽ thích một món đồ uống mát lạnh."
      }
    ]
  },
  "ko__116": {
    "title": "-(으)ㅂ시다 (Chúng ta hãy..., cùng... nhé)",
    "shortExplanation": "Vĩ tố kết thúc câu thể thỉnh dụ lịch sự, trang trọng dùng để đề nghị hoặc rủ rê người nghe cùng thực hiện một hành động nào đó ('chúng ta hãy...', 'cùng... nhé').",
    "longExplanation": "'-(으)ㅂ시다' là đuôi câu mệnh lệnh - thỉnh dụ thuộc phong cách trang trọng (하십시오체), dùng khi người nói muốn rủ rê, đề xuất hoặc kêu gọi người nghe cùng làm một việc gì đó. Đuôi câu này phù hợp sử dụng trong các buổi họp, thông báo công cộng, hoặc trò chuyện giữa những người cùng trang lứa, đồng nghiệp thân thiết. Cần lưu ý không dùng cấu trúc này với người lớn tuổi hoặc người có địa vị cao hơn để tránh thất lễ; thay vào đó nên dùng '-(으)시지요' hoặc hỏi ý kiến bằng '-(으)실까요?'.",
    "formation": "Thân động từ (có patchim trừ ㄹ) + 읍시다 / Thân động từ (không có patchim hoặc có patchim ㄹ) + ㅂ시다",
    "examples": [
      {
        "translation": "Tối nay chúng ta hãy ăn tối ở nhà hàng nhé. Hãy tạm quên hết mọi chuyện khác đi."
      },
      {
        "translation": "Chúng ta hãy cùng nhau đi dạo nhé. Mọi người đều sẽ thấy sảng khoái tinh thần đấy."
      },
      {
        "translation": "Chúng ta hãy cùng nhau giải quyết vấn đề này. Cùng làm sẽ dễ dàng hơn nhiều."
      },
      {
        "translation": "Tất cả chúng ta hãy cùng đi du lịch nhé. Đi cùng nhau sẽ vui hơn rất nhiều đấy."
      }
    ]
  },
  "ko__117": {
    "title": "-(으)십시오 (Xin hãy..., vui lòng...)",
    "shortExplanation": "Vĩ tố kết thúc câu mệnh lệnh trang trọng và tôn kính nhất, dùng để yêu cầu, chỉ thị hoặc khuyên bảo một cách lịch thiệp ('xin hãy...', 'vui lòng...').",
    "longExplanation": "'-(으)십시오' là đuôi câu mệnh lệnh thuộc thể nghi thức cao nhất (하십시오체), dùng khi người nói muốn yêu cầu, nhờ vả hoặc chỉ dẫn người nghe thực hiện một hành động nào đó với thái độ vô cùng tôn kính. Đuôi câu này thường xuất hiện trong các bài phát biểu trang trọng, thông báo công cộng, biển hiệu hướng dẫn, đề thi hoặc khi trò chuyện với khách hàng, bề trên.",
    "formation": "Thân động từ (có patchim trừ ㄹ) + 으십시오 / Thân động từ (không có patchim hoặc có patchim ㄹ) + 십시오",
    "examples": [
      {
        "translation": "Xin hãy suy nghĩ thêm một lần nữa. Có lẽ đó sẽ là sự lựa chọn đúng đắn."
      },
      {
        "translation": "Xin mời ngồi ở đây. Tôi có chuyện muốn thưa với bác/anh."
      },
      {
        "translation": "Nếu đã về đến nhà, trước tiên xin hãy rửa tay."
      },
      {
        "translation": "Nếu có điều gì thắc mắc, xin hãy hỏi câu hỏi đó ngay bây giờ."
      }
    ]
  },
  "ko__0": {
    "title": "-(이)나마 / -(으)나마 (Dù chỉ là..., ít ra cũng...)",
    "shortExplanation": "Trợ từ biểu thị sự nhượng bộ và an ủi, diễn đạt rằng tuy điều kiện hay số lượng còn ít ỏi, chưa trọn vẹn nhưng ít nhất vẫn có thể chấp nhận hoặc thấy an lòng ('dù chỉ là...', 'ít nhất cũng...').",
    "longExplanation": "'-(이)나마' là trợ từ (hoặc đuôi liên kết '-(으)나마') dùng để diễn đạt tâm lý nhượng bộ trước một tình huống không thật sự vừa ý. Người nói thừa nhận rằng dù điều kiện, thời gian hay số lượng chưa đạt mức lý tưởng, nhưng ít nhất sự tồn tại của phần nhỏ bé đó cũng đem lại sự an ủi hoặc đủ để thực hiện được việc cần làm. Cấu trúc này thường đi kèm các từ chỉ số lượng ít ỏi như '조금', '잠깐', '하루' hoặc đứng sau danh từ.",
    "formation": "Danh từ (có patchim) + 이나마 / Danh từ (không có patchim) + 나마 (với Động từ/Tính từ: Thân động từ/tính từ + 으나마/나마)",
    "examples": [
      {
        "translation": "Tôi bận công việc nên không thể dành nhiều thời gian, nhưng tôi vẫn đang cố gắng học dù chỉ một tiếng mỗi ngày."
      },
      {
        "translation": "Tháng này tiền bạc hơi eo hẹp, nhưng nếu lập kế hoạch chi tiết thì tôi nghĩ có thể tiết kiệm được dù chỉ 100.000 won."
      },
      {
        "translation": "Cô ấy nói là ốm nên thường bỏ tập, nhưng trong thời gian còn lại dù ít ỏi cô ấy vẫn đang nỗ lực hết mình."
      },
      {
        "translation": "Sự thật là chúng ta đã chia tay, nhưng với tư cách bạn bè tốt, anh mong có thể có được dù chỉ là những giây phút trò chuyện cùng em."
      }
    ]
  },
  "ko__1": {
    "title": "-(으)니까 (Vì... nên..., bởi vì...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị nguyên nhân, lý do chủ quan hoặc kết quả nhận ra sau khi thực hiện một hành động ('vì... nên...', 'do...').",
    "longExplanation": "'-(으)니까' là vĩ tố liên kết dùng để đưa ra nguyên nhân, lý do của sự việc ở vế sau mang tính chủ quan của người nói. Điểm đặc trưng quan trọng nhất của '-(으)니까' là vế sau có thể tự do kết hợp với câu mệnh lệnh ('-(으)세요', '-(으)십시오') hoặc câu thỉnh dụ, rủ rê ('-(으)ㅂ시다', '-자'), điều mà vĩ tố '-아/어서' không thể làm được. Ngoài ra, cấu trúc này còn diễn tả việc làm một hành động nào đó rồi nhận ra hoặc phát hiện một sự thật mới.",
    "formation": "Thân động từ/tính từ (có patchim trừ ㄹ) + 으니까 / Thân động từ/tính từ (không có patchim hoặc có patchim ㄹ) + 니까 (quá khứ: -았/었으니까, danh từ: -(이)니까)",
    "examples": [
      {
        "translation": "Vì trời mưa nên bạn hãy mang theo ô nhé."
      },
      {
        "translation": "Bây giờ muộn quá rồi nên ngày mai chúng ta gặp lại nhé."
      },
      {
        "translation": "Hôm nay vì mệt nên tôi đã về nhà sớm."
      },
      {
        "translation": "Do tập thể dục nhiều nên tôi không còn sức lực nữa."
      }
    ]
  },
  "ko__2": {
    "title": "-(으)려다가 (Định... nhưng lại, toan... thì)",
    "shortExplanation": "Vĩ tố liên kết diễn tả ý định ban đầu chuẩn bị làm một việc gì đó nhưng đã bị gián đoạn, hủy bỏ hoặc chuyển hướng sang hành động khác ('định... nhưng rồi lại...').",
    "longExplanation": "'-(으)려다가' là sự kết hợp giữa vĩ tố chỉ ý đồ '-(으)려고' và vĩ tố chuyển tiếp '-다가'. Cấu trúc này dùng khi chủ ngữ đã có ý định hoặc sắp sửa tiến hành một hành động, nhưng do hoàn cảnh khách quan thay đổi hoặc tâm lý thay đổi nên đã dừng lại, không thực hiện tiếp được hoặc chuyển sang làm một việc hoàn toàn khác. Dạng rút gọn thường dùng trong khẩu ngữ là '-(으)려다'.",
    "formation": "Thân động từ (có patchim trừ ㄹ) + 으려다가 / Thân động từ (không có patchim hoặc có patchim ㄹ) + 려다가",
    "examples": [
      {
        "translation": "Tôi định đi về nhà nhưng trời mưa to quá nên đã ở lại nhà bạn."
      },
      {
        "translation": "Tôi định mua sách nhưng thiếu tiền nên không mua được."
      },
      {
        "translation": "Tôi toan gọi điện thoại nhưng điện thoại hết pin nên không gọi được."
      },
      {
        "translation": "Tôi định tập thể dục nhưng tự nhiên thấy trong người không khỏe nên đành từ bỏ."
      }
    ]
  },
  "ko__3": {
    "title": "-(으)니 (Vì... nên, bởi vì..., làm... thì thấy)",
    "shortExplanation": "Vĩ tố liên kết mang tính văn viết, trang trọng dùng để nêu nguyên nhân, căn cứ tất yếu dẫn đến kết quả ở vế sau hoặc diễn tả sự nhận biết sau một hành động ('vì... nên...', 'thấy... thì').",
    "longExplanation": "'-(으)니' là vĩ tố liên kết có hai cách dùng chính: thứ nhất là đưa ra nguyên nhân, lý do tự nhiên hoặc tiền đề tất yếu để suy ra kết quả (tương tự '-(으)니까' nhưng mang sắc thái văn viết và trang trọng hơn); thứ hai là diễn tả sau khi thực hiện hành động ở vế trước thì phát hiện, chứng kiến một sự việc bất ngờ ở vế sau. Cấu trúc này thường thấy trong văn học, báo chí, diễn văn và các câu tục ngữ, châm ngôn.",
    "formation": "Thân động từ/tính từ (có patchim trừ ㄹ) + 으니 / Thân động từ/tính từ (không có patchim hoặc có patchim ㄹ) + 니 (quá khứ: -았/었으니, danh từ: -(이)니)",
    "examples": [
      {
        "translation": "Vì ngày nào cũng luyện tập và chuẩn bị bài phát biểu, nên tôi đã giành giải nhất trong cuộc thi hùng biện."
      },
      {
        "translation": "Anh ấy luôn học hành chăm chỉ, cho nên đã đạt kết quả tốt trong kỳ thi."
      },
      {
        "translation": "Vì bạn đã ăn quá nhiều nên chuyện đau bụng là đương nhiên thôi."
      },
      {
        "translation": "Vì bạn không đánh răng nên chuyện bị đau răng là điều hoàn toàn có thể dự đoán trước."
      }
    ]
  },
  "ko__4": {
    "title": "-(으)면 -(으)ㄹ수록 (Càng... càng...)",
    "shortExplanation": "Cấu trúc biểu thị mối quan hệ tương hỗ tỷ lệ thuận, diễn đạt mức độ hành động hoặc trạng thái ở vế trước càng gia tăng thì vế sau cũng càng biến đổi theo ('càng... thì càng...').",
    "longExplanation": "'-(으)면 -(으)ㄹ수록' là cấu trúc kết hợp giữa vĩ tố điều kiện '-(으)면' và vĩ tố biểu thị sự tỷ lệ gia tăng '-(으)ㄹ수록'. Cấu trúc này dùng để nhấn mạnh sự thay đổi mức độ song hành: khi một điều kiện hay hành vi càng được lặp lại hoặc tăng tiến, thì trạng thái hay kết quả ở vế sau cũng tỷ lệ thuận trở nên sâu sắc hoặc mạnh mẽ hơn tương ứng. Trong khẩu ngữ, đôi khi phần '-(으)면' có thể được lược bỏ, chỉ giữ lại '-(으)ㄹ수록'.",
    "formation": "Thân động từ/tính từ + (으)면 + Thân động từ/tính từ + (으)ㄹ수록 (patchim trừ ㄹ dùng -으면 / -을수록; không patchim hoặc patchim ㄹ dùng -면 / -ㄹ수록)",
    "examples": [
      {
        "translation": "Trời ngày càng âm u, càng không nhìn rõ mặt đường thì tôi lại càng thấy sợ khi lái xe."
      },
      {
        "translation": "Càng học tiếng Hàn thì bạn sẽ càng hiểu sâu sắc hơn vẻ đẹp của ngôn ngữ này."
      },
      {
        "translation": "Càng nói chuyện nhiều với bạn bè thì chúng ta càng có thể hiểu nhiều hơn về nhau."
      },
      {
        "translation": "Cuốn sách này càng đọc thì tôi lại càng thấy lôi cuốn."
      }
    ]
  },
  "ko__5": {
    "title": "-(으)면서는 (Trong khi... lại còn, vừa... mà lại...)",
    "shortExplanation": "Vĩ tố liên kết diễn tả hai hành động hoặc trạng thái diễn ra song song nhưng nhấn mạnh vào sự đối lập, mâu thuẫn hoặc hàm ý phê phán của người nói ('trong khi... thì lại...', 'vừa... mà lại...').",
    "longExplanation": "'-(으)면서는' là sự kết hợp giữa vĩ tố đồng thời '-(으)면서' và trợ từ đối chiếu, nhấn mạnh '는'. Cấu trúc này dùng để liên kết hai sự việc cùng tồn tại song song nhưng có tính chất tương phản hoặc nghịch lý, qua đó người nói thường bộc lộ cảm xúc bất ngờ, phàn nàn, mỉa mai hoặc phê phán sự mâu thuẫn đó. Khác với '-(으)면서' đơn thuần chỉ nêu hai việc diễn ra cùng lúc, '-(으)면서는' đặt trọng tâm vào sự đối lập và không hợp lý.",
    "formation": "Thân động từ/tính từ (có patchim trừ ㄹ) + 으면서는 / Thân động từ/tính từ (không có patchim hoặc có patchim ㄹ) + 면서는",
    "examples": [
      {
        "translation": "Cậu ấy mang tiếng đi học nhưng lại chẳng học hành gì cả, nên tôi nghĩ điểm kém là phải."
      },
      {
        "translation": "Mẹ vừa đi làm bên ngoài lại vừa lo hết mọi việc nhà, vậy mà chẳng có ai phụ giúp mẹ cả."
      },
      {
        "translation": "Jinsu vừa muốn học lại vừa luôn thích tụ tập chơi bời với bạn bè, cho nên việc quản lý thời gian của cậu ấy trông thật rối ren."
      },
      {
        "translation": "Khi mưa rơi xuống thì trời trở lạnh, nhưng giữa mùa hè mà thời tiết lạnh thế này thì thật kỳ lạ."
      }
    ]
  },
  "ko__6": {
    "title": "-(으)시거나 (Hoặc là..., hay là... [kính ngữ])",
    "shortExplanation": "Kết hợp giữa tiền vĩ tố tôn kính chủ ngữ '-(으)시-' và vĩ tố liên kết lựa chọn '-거나', dùng để liệt kê các hành động hoặc trạng thái của đối tượng tôn kính mang tính lựa chọn ('hoặc...', 'hay là...').",
    "longExplanation": "'-(으)시거나' là sự kết hợp ngữ pháp giữa tiền vĩ tố nâng cao chủ ngữ '-(으)시-' và vĩ tố lựa chọn '-거나'. Cấu trúc này dùng khi nói về người lớn tuổi, bề trên hoặc người cần tôn kính, nhằm liệt kê hai hay nhiều khả năng, hành vi hoặc trạng thái mà người đó có thể thực hiện hay trải qua. Người nghe hiểu rằng trong các phương án được nêu ra, chủ thể tôn kính chỉ cần chọn một hoặc sự việc xảy ra ở một trong các khả năng đó.",
    "formation": "Thân động từ/tính từ (có patchim trừ ㄹ) + 으시거나 / Thân động từ/tính từ (không có patchim hoặc có patchim ㄹ) + 시거나 (danh từ: +(이)시거나)",
    "examples": [
      {
        "translation": "Bố mẹ thích đi dạo hoặc đọc sách."
      },
      {
        "translation": "Tuần này nếu bà Sono cảm thấy không khỏe hoặc bị ho thì bà cần phải đi bác sĩ khám bệnh."
      },
      {
        "translation": "Tập thể dục hoặc đọc sách là những cách giải tỏa căng thẳng rất tốt."
      },
      {
        "translation": "Mẹ ở nhà hay đến trường thì dù theo cách nào mẹ cũng thấy thoải mái."
      }
    ]
  },
  "ko__7": {
    "title": "-(으)시든지 (Dù... hay là..., hoặc... hoặc... [kính ngữ])",
    "shortExplanation": "Kết hợp giữa tiền vĩ tố tôn kính '-(으)시-' và vĩ tố liên kết vô can/lựa chọn '-든지', biểu thị người bề trên có thể tùy ý chọn bất kỳ phương án nào mà không làm ảnh hưởng đến kết quả ('dù... hay là...', 'hoặc... hoặc...').",
    "longExplanation": "'-(으)시든지' là dạng tôn kính của vĩ tố '-든지', kết hợp cùng tiền vĩ tố nâng cao chủ ngữ '-(으)시-'. Cấu trúc này dùng để liệt kê hai hoặc nhiều hành động, trạng thái của đối tượng tôn kính, mang hàm ý trao quyền tự do lựa chọn cho người bề trên: dù đối tượng chọn cách nào hay tình huống nào xảy ra thì phía người nói đều tôn trọng và kết quả chung vẫn không thay đổi. Trong khẩu ngữ, cấu trúc này thường xuất hiện dưới dạng lặp '-(으)시든지 -(으)시든지'.",
    "formation": "Thân động từ/tính từ (có patchim trừ ㄹ) + 으시든지 / Thân động từ/tính từ (không có patchim hoặc có patchim ㄹ) + 시든지 (danh từ: +(이)시든지)",
    "examples": [
      {
        "translation": "Thầy giáo thông báo trước hay giảng giải trong giờ học thì học sinh mới có thể hiểu được."
      },
      {
        "translation": "Dù bố về nhà ngay bây giờ hay về muộn một chút thì con lúc nào cũng hoan nghênh bố."
      },
      {
        "translation": "Bà hãy gọi điện vào buổi tối hoặc nhắn tin cho cháu cũng được ạ."
      },
      {
        "translation": "Dù bác sĩ kê đơn thuốc hay khuyên nên phẫu thuật thì bệnh nhân vẫn luôn cần được tôn trọng."
      }
    ]
  },
  "ko__8": {
    "title": "-(으)ㄹ 데가 없다 (Không có nơi/chỗ/cách nào để...)",
    "shortExplanation": "Cấu trúc biểu thị việc hoàn toàn không có địa điểm, cơ hội, chỗ dựa hoặc phương kế nào để thực hiện một hành động ('không có nơi/cách nào để...').",
    "longExplanation": "'-(으)ㄹ 데가 없다' được cấu thành từ vĩ tố định từ tương lai '-(으)ㄹ', danh từ phụ thuộc '데' (chỉ nơi chốn, phương tiện, phương pháp, phương diện) và tính từ phủ định '없다'. Cấu trúc này dùng để diễn đạt ý rằng xét trong hoàn cảnh hiện tại, hoàn toàn không có chỗ, nơi chốn cụ thể hoặc không còn cách thức, cơ hội nào để tiến hành hành vi đó. Ngoài nghĩa cụ thể về không gian địa lý, nó còn hay dùng với nghĩa trừu tượng chỉ phương pháp giải quyết hoặc sự việc không thể cứu vãn.",
    "formation": "Thân động từ (có patchim trừ ㄹ) + 을 데가 없다 / Thân động từ (không có patchim hoặc có patchim ㄹ) + ㄹ 데가 없다",
    "examples": [
      {
        "translation": "Vấn đề đó chẳng có cách nào giải quyết được, vì quá phức tạp nên không ai tìm ra hướng giải quyết."
      },
      {
        "translation": "Chúng ta chẳng còn chỗ nào để xem bộ phim đó cả, tất cả vé đều đã bán hết sạch rồi."
      },
      {
        "translation": "Vào giờ này thì không có cách nào né tránh được cảnh tắc đường cả."
      },
      {
        "translation": "Vì đến quá muộn nên chẳng còn cách nào bắt được chuyến xe đó nữa."
      }
    ]
  },
  "ko__9": {
    "title": "-(으)ㄹ 수밖에 없다 (Chỉ còn cách..., đành phải..., không thể không...)",
    "shortExplanation": "Cấu trúc diễn tả tình thế tất yếu, bắt buộc không còn sự lựa chọn hay phương án nào khác ngoài việc phải làm điều đó ('chỉ còn cách...', 'đành phải...').",
    "longExplanation": "'-(으)ㄹ 수밖에 없다' được tạo nên từ cấu trúc khả năng '-(으)ㄹ 수' kết hợp với trợ từ giới hạn '밖에' (ngoài... ra) và phủ định '없다' (không có). Cấu trúc này dùng để nhấn mạnh tính tất yếu và không thể tránh khỏi của hành động hay trạng thái: ngoài phương án được nhắc đến thì không còn bất cứ giải pháp, sự lựa chọn hay khả năng nào khác.",
    "formation": "Thân động từ/tính từ (có patchim trừ ㄹ) + 을 수밖에 없다 / Thân động từ/tính từ (không có patchim hoặc có patchim ㄹ) + ㄹ 수밖에 없다",
    "examples": [
      {
        "translation": "Thời tiết quá nóng nên tôi không thể không uống nước."
      },
      {
        "translation": "Không còn nhiều thời gian nên tôi đành phải đi taxi."
      },
      {
        "translation": "Tôi không có tiền nên đành phải ăn mì gói."
      },
      {
        "translation": "Anh ấy đến quá muộn nên tôi chỉ còn cách đứng đợi."
      }
    ]
  },
  "ko__10": {
    "title": "-(으)ㄹ지라도 (Dù cho..., dẫu có... đi chăng nữa)",
    "shortExplanation": "Vĩ tố liên kết nhượng bộ mang sắc thái trang trọng, văn viết biểu thị rằng cho dù tình huống ở vế trước có xảy ra hay ở mức độ cao đến đâu thì cũng không ảnh hưởng đến sự việc ở vế sau ('dù cho... thì vẫn...').",
    "longExplanation": "'-(으)ㄹ지라도' là vĩ tố liên kết giả định nhượng bộ mạnh mẽ trong tiếng Hàn, thường dùng trong văn phong viết hoặc các tình huống trang trọng. Cấu trúc này đặt ra một giả thiết hoặc sự thật cực đoan, khó khăn ở vế trước nhưng khẳng định rằng điều đó hoàn toàn không thể làm suy chuyển quyết tâm, sự thật hoặc thái độ ở vế sau. Cấu trúc này thường đi kèm với các phó từ nhấn mạnh như '아무리', '비록', '설령'.",
    "formation": "Thân động từ/tính từ (có patchim trừ ㄹ) + 을지라도 / Thân động từ/tính từ (không có patchim hoặc có patchim ㄹ) + ㄹ지라도 (danh từ: +(이)ㄹ지라도, quá khứ: -았/었을지라도)",
    "examples": [
      {
        "translation": "Dẫu anh ấy có cảm thấy buồn và hụt hẫng đến mức nào đi chăng nữa, tôi vẫn sẽ phản đối quyết định của anh ấy."
      },
      {
        "translation": "Dù có bận rộn đến mấy đi chăng nữa, chúng ta cũng phải dành thời gian để giải quyết vấn đề này."
      },
      {
        "translation": "Cho dù bằng cách nào đó đội chúng ta có thể thắng trận đấu này đi nữa, thì đối thủ vẫn là một đội rất mạnh."
      },
      {
        "translation": "Dù cho có nhảy điệu này giỏi đến mấy đi nữa, tôi vẫn cảm thấy rất ngại ngùng khi nhảy múa."
      }
    ]
  },
  "ko__11": {
    "title": "-(으)려나 (Không biết liệu có... không nhỉ, liệu sẽ... chăng)",
    "shortExplanation": "Vĩ tố kết thúc câu thể hiện sự phỏng đoán, thắc mắc mơ hồ hoặc tự hỏi bản thân về một việc chưa chắc chắn trong tương lai ('không biết liệu có... không', 'liệu sẽ... chăng').",
    "longExplanation": "'-(으)려나' là sự kết hợp giữa vĩ tố ý định/suy đoán '-(으)려' và vĩ tố nghi vấn tự hỏi '-나'. Cấu trúc này dùng khi người nói băn khoăn, tò mò suy đoán về một sự việc chưa rõ ràng, thường dùng trong độc thoại nội tâm hoặc trò chuyện thân mật. Đặc biệt, nó rất hay kết hợp với '모르겠다' thành cụm '-(으)려나 모르겠다' để diễn tả ý 'không biết liệu sự việc có xảy ra như thế hay không'.",
    "formation": "Thân động từ/tính từ (có patchim trừ ㄹ) + 으려나 / Thân động từ/tính từ (không có patchim hoặc có patchim ㄹ) + 려나 (quá khứ: -았/었으려나)",
    "examples": [
      {
        "translation": "Không biết tối nay trời có mưa không nữa."
      },
      {
        "translation": "Không biết bạn bè liệu có nhớ ngày sinh nhật của tôi không nữa."
      },
      {
        "translation": "Không biết tôi có thể vượt qua kỳ thi này được không nữa."
      },
      {
        "translation": "Không biết sang năm liệu tôi có thể đi du lịch được không nữa."
      }
    ]
  },
  "ko_겠지만_12": {
    "title": "-겠지만 (Chắc là... nhưng mà..., biết là... nhưng...)",
    "shortExplanation": "Vĩ tố liên kết phỏng đoán đối lập, thừa nhận hoặc dự đoán một tình huống ở vế trước nhưng vế sau đưa ra một ý kiến, điều kiện trái ngược hoặc sự băn khoăn ('chắc là... nhưng...', 'dù biết... nhưng...').",
    "longExplanation": "'-겠지만' là sự kết hợp giữa vĩ tố phỏng đoán hoặc ý chí '-겠-' và vĩ tố liên kết tương phản '-지만'. Cấu trúc này dùng khi người nói đưa ra một dự đoán, suy nghĩ hoặc thừa nhận một sự việc ở vế trước, sau đó ngay lập tức chuyển ý để nêu ra tình huống trái ngược, sự khó khăn hoặc cảm xúc đắn đo, e ngại ở vế sau.",
    "formation": "Thân động từ/tính từ + 겠지만 (danh từ: +(이)겠지만, quá khứ: -았/었겠지만)",
    "examples": [
      {
        "translation": "Ngày mai chắc thời tiết sẽ đẹp, nhưng tôi lại không có thời gian để đi du lịch."
      },
      {
        "translation": "Chắc cô ấy sẽ thông cảm thôi, nhưng việc giải thích lỗi lầm của mình cho cô ấy thật khó khăn."
      },
      {
        "translation": "Chắc là tôi sẽ đạt điểm tốt trong kỳ thi lần này, nhưng tôi vẫn còn thấy lo lắng lắm."
      },
      {
        "translation": "Chắc bạn bè sẽ ngạc nhiên lắm, nhưng tôi sẽ không tham gia bữa tiệc lần này đâu."
      }
    ]
  },
  "ko_게_13": {
    "title": "~게 되다 (Được, bị, trở nên, hóa ra, thành ra)",
    "shortExplanation": "Vĩ tố bổ trợ biểu thị một hành động hoặc trạng thái diễn ra một cách tự nhiên do hoàn cảnh khách quan đưa đẩy chứ không phải do chủ ý ban đầu của chủ ngữ ('được...', 'bị...', 'trở nên...', 'hóa ra...').",
    "longExplanation": "'~게 되다' là cấu trúc kết hợp giữa vĩ tố liên kết '-게' và động từ '되다', dùng để diễn đạt sự biến chuyển trạng thái hoặc kết quả của một hành động xảy ra do yếu tố khách quan, hoàn cảnh tác động hoặc diễn tiến tự nhiên mà bản thân người nói không chủ động định trước. Cấu trúc này thường tương đương với 'được/bị/trở nên...' hoặc 'hóa ra lại...' trong tiếng Việt, nhấn mạnh vào kết quả thực tế hơn là ý chí của người thực hiện.",
    "formation": "Thân động từ/Tính từ + 게 되다",
    "examples": [
      {
        "translation": "Trời mưa mà tôi không mang theo ô nên đã bị ướt sũng."
      },
      {
        "translation": "Vì không học bài nhiều nên tôi đã bị trượt kỳ thi."
      },
      {
        "translation": "Tôi luyện tập tiếng Hàn rất nhiều nên đã có thể nói tiếng Hàn một cách lưu loát."
      },
      {
        "translation": "Cuối tuần tôi định gặp bạn bè, nhưng họ bận cả nên rốt cuộc tôi lại phải đi xem phim một mình."
      }
    ]
  },
  "ko_게_14": {
    "title": "~게 하다 (Làm cho, khiến cho, bảo...)",
    "shortExplanation": "Cấu trúc sai khiến biểu thị việc chủ ngữ tác động, ra lệnh hoặc tạo điều kiện khiến người khác thực hiện một hành động nào đó ('làm cho...', 'khiến cho...', 'bắt...').",
    "longExplanation": "'~게 하다' là cấu trúc tạo thể sai khiến gián tiếp, dùng khi chủ ngữ tạo ra nguyên nhân, tác động hoặc yêu cầu một đối tượng khác thực hiện một hành động hay rơi vào một trạng thái nhất định. Cấu trúc này có thể áp dụng cho hầu như mọi động từ và tính từ, mang sắc thái chỉ đạo, sai phái hoặc gây ra kết quả cảm xúc cho người khác ('làm tôi cười', 'khiến ai buồn').",
    "formation": "Thân động từ/Tính từ + 게 하다",
    "examples": [
      {
        "translation": "Mẹ đã bảo em Myeongju học bài, nhờ thế Myeongju đã làm bài thi rất tốt."
      },
      {
        "translation": "Giám đốc yêu cầu các nhân viên đến công ty sớm, vì vậy mọi người đều bắt đầu công việc sớm hơn."
      },
      {
        "translation": "Giáo viên đã cho học sinh đặt câu tiếng Hàn, nhờ đó học sinh đã hiểu bài rõ hơn nhiều."
      },
      {
        "translation": "Bộ phim đó đã làm tôi cười ngặt nghẽo, các phân cảnh hài hước thực sự rất thú vị."
      }
    ]
  },
  "ko_고_15": {
    "title": "~고 말다 (Rốt cuộc đã..., cuối cùng thì lại...)",
    "shortExplanation": "Vĩ tố bổ trợ biểu thị một hành động rốt cuộc đã hoàn tất hoặc kết thúc theo hướng ngoài ý muốn, thường kèm theo cảm giác tiếc nuối, xót xa hoặc bất lực ('cuối cùng đã...', 'rốt cuộc lại...').",
    "longExplanation": "'~고 말다' kết hợp giữa vĩ tố '-고' và động từ phụ trợ '말다', diễn tả một sự việc hay hành động nào đó sau bao nhiêu cố gắng hoặc giằng co cuối cùng vẫn xảy ra, đặc biệt là theo chiều hướng không mong muốn, ngoài tầm kiểm soát. Cấu trúc này thường đi kèm các phó từ như '결국' (rốt cuộc), '끝내' (cuối cùng) và mang sắc thái tiếc nuối, buồn bã hoặc bất đắc dĩ.",
    "formation": "Thân động từ + 고 말다 (thường dùng ở thì quá khứ: -고 말았다)",
    "examples": [
      {
        "translation": "Tôi đã luyện tập quá nhiều khiến các ngón tay bị đau, và rốt cuộc tôi đành phải ngừng tập."
      },
      {
        "translation": "Bạn tôi cứ nằng nặc giới thiệu mãi nên cuối cùng tôi đã đi xem bộ phim đó, nhưng chẳng hay chút nào."
      },
      {
        "translation": "Vì quá đói bụng nên tôi đã ăn sạch món ăn cô ấy nấu, thực ra khâu chọn nguyên liệu hơi dở một chút."
      },
      {
        "translation": "Sau khi làm việc cả ngày mệt quá nên tôi đã thiếp đi mất, thành ra không hoàn thành được công việc đã dự định."
      }
    ]
  },
  "ko_고_16": {
    "title": "~고 말하다 (Nói rằng..., bảo rằng...)",
    "shortExplanation": "Cấu trúc dẫn dụ gián tiếp, dùng để truyền đạt lại lời nói, tuyên bố, ý kiến hoặc quyết định của một người nào đó ('nói rằng...', 'bảo rằng...').",
    "longExplanation": "'~고 말하다' là hình thức tường thuật gián tiếp phổ biến trong tiếng Hàn, được cấu tạo bởi đuôi câu trần thuật hoặc dự định kết hợp với trợ từ dẫn dụ '-고' và động từ '말하다' (nói). Cấu trúc này thường xuất hiện dưới dạng '-다고 말하다' (nói rằng...), '-겠다고 말하다' (nói rằng sẽ...), '-(이)라고 말하다' (nói là...) để trích dẫn lại một cách khách quan lời tuyên bố, nhận định hay quyết tâm của người khác hoặc của chính bản thân mình.",
    "formation": "Mệnh đề trích dẫn (-다고 / -냐고 / -(으)라고 / -자고) + 말하다",
    "examples": [
      {
        "translation": "Cô ấy nói rằng dù đã no bụng nhưng vẫn sẽ ăn thêm một miếng bánh ngọt nhỏ nữa."
      },
      {
        "translation": "Mẹ tôi bảo rằng tối nay sẽ đi ngủ sớm. Mẹ bảo vì quá mệt nên mới thế."
      },
      {
        "translation": "Đại diện công ty đã nói rằng tình hình đang rất khó khăn, vì vậy các nhân viên cảm thấy cần phải tập trung hơn."
      },
      {
        "translation": "Anh ấy nói rằng tuyệt đối sẽ không bao giờ bỏ cuộc, khiến mọi người đều tin tưởng vào quyết tâm của anh ấy."
      }
    ]
  },
  "ko_고_17": {
    "title": "~고 보면 (Cứ làm... rồi mới thấy, ngẫm kỹ lại thì, xét cho cùng...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị rằng sau khi thực sự trải nghiệm, quan sát kỹ hoặc ngẫm nghĩ về một điều gì đó thì mới nhận ra một sự thật hay có một góc nhìn mới mẻ ('cứ... rồi mới thấy...', 'ngẫm kỹ lại thì...').",
    "longExplanation": "'~고 보면' là sự kết hợp giữa vĩ tố nối tiếp '-고' và vĩ tố giả định '-보면' (nếu nhìn/thử). Cấu trúc này diễn tả việc sau khi trực tiếp bắt tay vào làm, tiếp xúc gần hoặc suy xét một cách thấu đáo, người nói mới nhận ra bản chất sự việc không giống như ấn tượng bề ngoài ban đầu. Thường dùng khi đưa ra một phát hiện, kết luận bất ngờ hoặc góc nhìn khách quan sau một hành động.",
    "formation": "Thân động từ + 고 보면",
    "examples": [
      {
        "translation": "Ban đầu vấn đề trông có vẻ khó, nhưng nếu nhìn nhận kỹ thì không đến mức khó như vậy."
      },
      {
        "translation": "Ý tưởng của anh ấy lúc đầu nghe có vẻ kỳ dị, nhưng khi suy nghĩ thấu đáo lại thì thấy cực kỳ độc đáo."
      },
      {
        "translation": "Ngắm kỹ bức ảnh mới thấy anh ấy trông khá là hạnh phúc."
      },
      {
        "translation": "Cứ đọc cuốn sách này đi rồi tôi nghĩ bạn sẽ hiểu được dụng ý của tác giả rõ hơn nhiều."
      }
    ]
  },
  "ko_고서_18": {
    "title": "~고서 (Sau khi... rồi mới, làm... xong rồi)",
    "shortExplanation": "Vĩ tố liên kết biểu thị một hành động được thực hiện xong xuôi rồi hành động tiếp theo mới diễn ra, nhấn mạnh tính tuần tự và tiền đề thời gian ('sau khi... rồi...').",
    "longExplanation": "'~고서' là dạng nhấn mạnh của vĩ tố liên kết '-고', được tạo thành bằng cách thêm trợ từ '-서'. Cấu trúc này dùng để biểu thị hành động ở vế trước phải được hoàn thành trọn vẹn, đóng vai trò là tiền đề để cùng một chủ ngữ thực hiện tiếp hành động ở vế sau. Đôi khi cấu trúc này cũng được dùng trong các câu mang tính chất chê trách hoặc ngạc nhiên ('làm chuyện như vậy mà lại...').",
    "formation": "Thân động từ + 고서",
    "examples": [
      {
        "translation": "Tuần trước tôi đã đến thư viện. Tôi mượn sách xong rồi mới trở về."
      },
      {
        "translation": "Vừa về đến nhà là tôi ăn cơm xong rồi mới đi tắm rửa."
      },
      {
        "translation": "Tôi làm xong hết bài tập về nhà rồi mới xem ti vi."
      },
      {
        "translation": "Chúng tôi bơi lội ở bể bơi xong rồi mới đi ăn cơm."
      }
    ]
  },
  "ko_고자_19": {
    "title": "~고자 (Để, nhằm mục đích...)",
    "shortExplanation": "Vĩ tố liên kết trang trọng biểu thị mục đích hoặc ý định thực hiện một hành động nào đó ('để...', 'nhằm mục đích...').",
    "longExplanation": "'~고자' là vĩ tố liên kết mang tính văn viết, trang trọng, được dùng khi người nói muốn nêu rõ mục tiêu, ý định hoặc nguyện vọng mà mình hướng tới để thực hiện hành động ở vế sau. Cấu trúc này thường xuất hiện trong các bài phát biểu, phỏng vấn, báo cáo chính thức hoặc văn bản học thuật. Thường đi kèm với dạng kết thúc câu '-(으)고자 하다' (dự định làm gì).",
    "formation": "Thân động từ + 고자 (hoặc -고자 하다)",
    "examples": [
      {
        "translation": "Tôi dự định học tiếng Hàn để thi đỗ kỳ thi TOPIK."
      },
      {
        "translation": "Cô ấy tập thể dục mỗi ngày nhằm mục đích hoàn thiện bản thân."
      },
      {
        "translation": "Bố tôi luôn nỗ lực làm việc mỗi ngày nhằm chăm lo cho gia đình chúng tôi."
      },
      {
        "translation": "Chúng tôi đã quyết định mua các sản phẩm tái chế nhằm bảo vệ môi trường."
      }
    ]
  },
  "ko_기는_20": {
    "title": "~기는 하다 (Thì có... thật đấy nhưng..., đúng là... nhưng...)",
    "shortExplanation": "Cấu trúc thừa nhận một sự thật ở vế trước nhưng ngay sau đó đưa ra vế phụ mang tính tương phản, giới hạn hoặc chưa trọn vẹn ('thì có... nhưng...', 'công nhận là... nhưng...').",
    "longExplanation": "'~기는 하다' là sự kết hợp giữa hình thức danh từ hóa '-기', trợ từ đối chiếu '-는' và động từ '하다'. Cấu trúc này dùng khi người nói thừa nhận tính đúng đắn của hành động hay tính chất được nêu ra, nhưng vế sau lập tức bổ sung một thực tế tương phản, một hạn chế hoặc một khía cạnh chưa thực sự thỏa đáng. Trong khẩu ngữ thường được rút gọn thành '~긴 하다'.",
    "formation": "Thân động từ/Tính từ + 기는 하다 (rút gọn: -긴 하다)",
    "examples": [
      {
        "translation": "Tôi thì có ăn thật đấy, nhưng không ăn nhiều đến mức như vậy đâu."
      },
      {
        "translation": "Tôi công nhận là có xem bộ phim đó, nhưng xem mà chẳng thấy hào hứng chút nào."
      },
      {
        "translation": "Anh ấy thì có tập thể dục thật đấy, nhưng lại không duy trì chế độ ăn uống lành mạnh."
      },
      {
        "translation": "Tôi đúng là có học tiếng Hàn, nhưng hiện tại vẫn chưa giỏi được."
      }
    ]
  },
  "ko_기로_21": {
    "title": "~기로 하다 (Quyết định..., thống nhất là...)",
    "shortExplanation": "Cấu trúc biểu thị sự quyết định, thỏa thuận hoặc hạ quyết tâm cùng thực hiện một kế hoạch, hành động nào đó trong tương lai ('quyết định...', 'hẹn nhau...').",
    "longExplanation": "'~기로 하다' được tạo thành bởi danh từ hóa '-기', trợ từ phương hướng/phương cách '-로' và động từ '하다'. Cấu trúc này dùng để diễn đạt việc một cá nhân tự hạ quyết tâm hoặc nhiều người cùng nhau bàn bạc và đi đến một quyết định, kế hoạch cụ thể cho tương lai. Thường được sử dụng phổ biến nhất ở thì quá khứ '~기로 했다' (đã quyết định là...).",
    "formation": "Thân động từ + 기로 하다 (thường dùng ở thì quá khứ: -기로 했다)",
    "examples": [
      {
        "translation": "Tôi đã quyết định tập thể dục mỗi sáng, vì thế dù trời có lạnh tôi vẫn kiên trì tập luyện mỗi ngày."
      },
      {
        "translation": "Tất cả chúng tôi đã quyết định sang năm sẽ cùng đi du lịch, nên từ bây giờ đã quyết định bắt đầu tiết kiệm tiền."
      },
      {
        "translation": "Anh ấy đã quyết định trong năm nay sẽ cai thuốc lá, vì vậy đã quyết định không mua thuốc lá nữa."
      },
      {
        "translation": "Công ty đã quyết định bắt buộc đeo khẩu trang vào thứ Sáu hàng tuần vì sự an toàn của nhân viên."
      }
    ]
  },
  "ko_기로_22": {
    "title": "~기로 되다 (Được quyết định là..., theo kế hoạch là...)",
    "shortExplanation": "Cấu trúc biểu thị một quyết định, kế hoạch hay quy định đã được cơ quan, tập thể hoặc ngoại cảnh thống nhất an bài ('được quyết định là...', 'theo lịch trình là...').",
    "longExplanation": "'~기로 되다' kết hợp giữa danh từ hóa '-기', trợ từ '-로' và động từ '되다'. Khác với '~기로 하다' (nhấn mạnh vào ý chí tự chủ của chủ ngữ), cấu trúc '~기로 되다' mang sắc thái khách quan hoặc bị động, biểu thị rằng sự việc đã được tập thể, tổ chức thống nhất, đã thành quy ước hoặc do các yếu tố bên ngoài an bài mà chủ ngữ có trách nhiệm tuân theo.",
    "formation": "Thân động từ + 기로 되다 (thường dùng ở thì quá khứ: -기로 되었다 / -기로 됐어요)",
    "examples": [
      {
        "translation": "Chúng tôi đã được ấn định là sẽ đi du lịch vào tuần tới. Ngày giờ cụ thể cũng đã được chọn xong rồi."
      },
      {
        "translation": "Cô ấy được phân công là sẽ lập kế hoạch chi tiết. Tháng sau cô ấy đang chuẩn bị cho lễ cưới."
      },
      {
        "translation": "Chúng tôi đã thống nhất sẽ tổ chức họp vào mỗi thứ Năm hàng tuần, đó là khung thời gian mà mọi thành viên đều có thể tham dự."
      },
      {
        "translation": "Việc chọn ai làm nhóm trưởng đã được định đoạt từ trước, và anh ấy đã được phân công đảm nhận vai trò đó."
      }
    ]
  },
  "ko_기_23": {
    "title": "~기 시작하다 (Bắt đầu...)",
    "shortExplanation": "Cấu trúc biểu thị thời điểm bắt đầu khởi sự một hành động hoặc bắt đầu bước vào một trạng thái nào đó ('bắt đầu...').",
    "longExplanation": "'~기 시작하다' được cấu tạo bởi hình thức danh từ hóa '-기' và động từ '시작하다' (bắt đầu). Cấu trúc này dùng để diễn đạt sự khởi đầu của một hành động, thói quen hoặc quá trình chuyển biến của trạng thái. Nó tương đương với 'bắt đầu làm gì' trong tiếng Việt.",
    "formation": "Thân động từ/Tính từ + 기 시작하다",
    "examples": [
      {
        "translation": "Tôi đến ngôi trường này là để bắt đầu học tiếng Hàn. Trước đây tôi hoàn toàn không biết gì."
      },
      {
        "translation": "Tôi đã đăng ký câu lạc bộ thể hình để bắt đầu tập luyện thể thao một cách bài bản. Người ta bảo rằng việc đó rất tốt cho sức khỏe."
      },
      {
        "translation": "Dạo này cứ hễ bắt đầu buổi sáng thức dậy là tôi nhất định phải uống một ly cà phê."
      },
      {
        "translation": "Kể từ ngày hôm đó, tôi đã bắt đầu xem phim mỗi ngày vì tôi muốn tiếp cận với những câu chuyện đa dạng của mọi người."
      }
    ]
  },
  "ko_기_24": {
    "title": "~기 전에 (Trước khi...)",
    "shortExplanation": "Vĩ tố liên kết chỉ mốc thời gian, biểu thị rằng hành động ở vế sau diễn ra trước khi hành động ở vế trước bắt đầu ('trước khi...').",
    "longExplanation": "'~기 전에' được kết hợp từ hình thức danh từ hóa '-기', danh từ '전' (trước) và trợ từ thời gian '-에'. Cấu trúc này dùng để chỉ một hành động hoặc trạng thái ở vế sau được thực hiện trước một thời điểm hoặc một hành động nào đó ở vế trước. Luôn đi với thân động từ ở dạng nguyên thể, không chia thì quá khứ ở trước '기 전에'.",
    "formation": "Thân động từ + 기 전에 (Danh từ + 전에)",
    "examples": [
      {
        "translation": "Trước khi đi du lịch, bạn phải đóng gói hành lý."
      },
      {
        "translation": "Trước khi cuộc họp bắt đầu, tôi đã chuẩn bị xong phần thuyết trình."
      },
      {
        "translation": "Tôi luôn luôn khởi động giãn cơ trước khi tập thể dục."
      },
      {
        "translation": "Tôi đã ôn tập đầy đủ trước khi thi."
      }
    ]
  },
  "ko_기_25": {
    "title": "~기 힘들다 (Khó mà..., thật khó để...)",
    "shortExplanation": "Cấu trúc biểu thị sự khó khăn, vất vả hoặc gần như bất khả thi khi thực hiện một hành động nào đó ('khó mà...', 'vất vả khi...').",
    "longExplanation": "'~기 힘들다' được tạo thành bởi hình thức danh từ hóa '-기' và tính từ '힘들다' (khó khăn, vất vả). Cấu trúc này dùng để diễn tả rằng việc thực hiện một hành vi, thói quen hay nhiệm vụ nào đó đòi hỏi rất nhiều sức lực, sự kiên trì, hoặc gặp phải trở ngại lớn khiến bản thân cảm thấy gian nan, thậm chí khó lòng duy trì.",
    "formation": "Thân động từ + 기 힘들다 (có thể thêm trợ từ: -기가 힘들다)",
    "examples": [
      {
        "translation": "Mỗi sáng thức dậy sớm thật là vất vả, nhưng cũng chẳng còn cách nào khác."
      },
      {
        "translation": "Lúc đầu học tiếng Hàn đã khó rồi, nhưng tôi nhận ra rằng dù có tiếp tục luyện tập thì cũng khó lòng làm quen ngay được."
      },
      {
        "translation": "Mỗi ngày tập thể dục quả thật rất vất vả, nhưng vì sức khỏe nên tôi đang cố gắng duy trì đều đặn."
      },
      {
        "translation": "Nói chuyện trước đám đông thực sự rất khó khăn, bây giờ tôi vẫn đang tiếp tục luyện tập."
      }
    ]
  },
  "ko_기를_26": {
    "title": "~기(를) 위해(서) (Để, nhằm phục vụ cho mục đích...)",
    "shortExplanation": "Cấu trúc biểu thị mục đích, động cơ thúc đẩy chủ ngữ thực hiện một hành động nào đó ('để...', 'nhằm mục đích...').",
    "longExplanation": "'~기를 위해(서)' là cấu trúc danh từ hóa động từ bằng '-기', kết hợp với trợ từ tân ngữ '-를' và danh từ/động từ '위하다' (vì, phục vụ cho). Cấu trúc này dùng để diễn đạt mục đích cốt lõi hoặc lý do quan trọng thúc đẩy chủ ngữ thực hiện hành động ở vế sau. Trong khẩu ngữ và văn viết, trợ từ '-를' và vĩ tố '-서' thường có thể lược bỏ tạo thành cấu trúc rất phổ biến là '-기 위해(서)'.",
    "formation": "Thân động từ + 기를 위해(서) (hoặc -기 위해(서), Danh từ + 을/를 위해(서))",
    "examples": [
      {
        "translation": "Chuyến du lịch nước ngoài này là tôi đi nhằm mục đích học tiếng Anh."
      },
      {
        "translation": "Tôi đã thức dậy từ sáng sớm là để nghe bài giảng."
      },
      {
        "translation": "Anh ấy đã tiết kiệm tiền nhằm mục đích mua một ngôi nhà."
      },
      {
        "translation": "Cô ấy đã tích lũy rất nhiều kinh nghiệm để viết nên một cuốn sách."
      }
    ]
  },
  "ko_기만_27": {
    "title": "~기만 하다 (Chỉ toàn..., chỉ mải..., cứ chỉ...)",
    "shortExplanation": "Trợ từ hạn định kết hợp với động từ/tính từ biểu thị việc chỉ chuyên tâm làm duy nhất một hành động đó mà không làm gì khác, hoặc hoàn toàn mang tính chất đó ('chỉ toàn...', 'chỉ mải...').",
    "longExplanation": "'~기만 하다' là sự kết hợp giữa hình thức danh từ hóa '-기', trợ từ giới hạn '-만' (chỉ, duy nhất) và động từ '하다'. Cấu trúc này dùng để diễn tả việc chủ ngữ chỉ làm một hành động duy nhất và hoàn toàn lơ là những việc khác, thường kèm theo sắc thái bất mãn, lo lắng hoặc chê trách. Khi đi với tính từ, cấu trúc mang nghĩa 'chỉ toàn thấy...' (ví dụ: '비싸기만 하다' - chỉ toàn đắt đỏ mà chẳng thấy ngon).",
    "formation": "Thân động từ/Tính từ + 기만 하다",
    "examples": [
      {
        "translation": "Tôi chỉ mải học suốt cả đêm mà chẳng làm bất kỳ một việc gì khác."
      },
      {
        "translation": "Bố tôi cứ chỉ toàn xem ti vi suốt nên tôi rất lo lắng."
      },
      {
        "translation": "Anh ấy ngày nào cũng chỉ đến đúng cái quán ăn đó để ăn. Như vậy không tốt cho sức khỏe đâu."
      },
      {
        "translation": "Bạn của chúng tôi chỉ toàn mải chơi điện tử rồi lãng phí thời gian."
      }
    ]
  },
  "ko_기에는_28": {
    "title": "~기에는 (Để mà..., đối với việc... thì)",
    "shortExplanation": "Cấu trúc kết hợp giữa danh từ hóa '-기' và trợ từ '-에는', dùng để diễn đạt tiêu chuẩn, mục đích hoặc điều kiện: 'để mà...', 'đối với việc... thì (cần phải / chưa đủ / còn nhiều khó khăn)'.",
    "longExplanation": "'~기에는' được tạo thành từ vĩ tố danh từ hóa '-기' kết hợp với trợ từ '-에' và trợ từ nhấn mạnh '-는'. Cấu trúc này dùng để đặt một hành động làm tiêu chuẩn hoặc mục đích đánh giá, đưa ra nhận xét hoặc yêu cầu ở vế sau (thường là cần thêm điều kiện, nỗ lực hoặc so sánh mức độ, ví dụ như 'để thi đỗ thì phải học nhiều hơn', 'để mua xe thì cần tích lũy thêm tiền').",
    "formation": "Thân động từ + 기에는",
    "examples": [
      {
        "translation": "Để thi đỗ kỳ thi TOPIK thì phải học tập nhiều hơn nữa."
      },
      {
        "translation": "Để không bị muộn học thì phải thức dậy từ sáng sớm."
      },
      {
        "translation": "Để mua được ô tô thì phải tích lũy nhiều tiền hơn nữa."
      },
      {
        "translation": "Để chiến thắng trong cuộc thi chạy thì phải luyện tập mỗi ngày."
      }
    ]
  },
  "ko_나_29": {
    "title": "~나 보다 (Dường như, có vẻ như, chắc là)",
    "shortExplanation": "Cấu trúc phỏng đoán dựa trên những gì mắt thấy tai nghe hoặc tình huống quan sát được ở hiện tại ('dường như...', 'có vẻ như...').",
    "longExplanation": "'~나 보다' là cấu trúc kết hợp vĩ tố nghi vấn '-나' và động từ phụ trợ '보다', dùng để diễn đạt suy đoán, nhận định của người nói dựa trên chứng cứ thực tế, hành vi hoặc hiện tượng trực tiếp quan sát được. Cấu trúc này thường đi với động từ (hoặc tính từ có phụ âm cuối, 있다/없다) để phỏng đoán nhẹ nhàng rằng một sự việc nào đó dường như đang diễn ra.",
    "formation": "Thân động từ / Thân tính từ + 나 보다 (hiện tại: Động từ + 나 보다; Tính từ thường dùng -(으)ㄴ가 보다 nhưng khẩu ngữ cũng dùng -나 보다; 있다/없다 + 나 보다; Quá khứ: -았/었나 보다)",
    "examples": [
      {
        "translation": "Thời tiết có vẻ hơi lạnh, chắc tôi phải mặc áo khoác ngoài thôi."
      },
      {
        "translation": "Có vẻ như anh ấy thích tôi, lúc nào cũng tìm gặp tôi."
      },
      {
        "translation": "Có vẻ như cậu cấp dưới làm việc rất tốt, cấp trên đang khen ngợi cậu ấy kìa."
      },
      {
        "translation": "Hôm nay tâm trạng bạn tôi có vẻ không tốt, sắc mặt trông buồn bã quá."
      }
    ]
  },
  "ko_나요_30": {
    "title": "~나요? (Có... không ạ?, phải không nhỉ?)",
    "shortExplanation": "Vĩ tố kết thúc câu nghi vấn lịch sự, nhẹ nhàng và thân thiện, dùng để hỏi ý kiến, thăm dò hoặc xác nhận thông tin từ người nghe ('...phải không ạ?', '...đúng không nhỉ?').",
    "longExplanation": "'~나요?' là vĩ tố kết thúc câu nghi vấn thuộc đuôi câu lịch sự tôn kính (thể 해요), kết hợp từ vĩ tố nghi vấn '-나' và trợ từ kính ngữ '-요'. Đuôi câu này giúp làm dịu giọng điệu câu hỏi, thể hiện sự nhã nhặn, thân thiện và lịch sự khi hỏi đối phương hoặc khi dùng trong dạng xác nhận ý kiến như '그렇지 않나요?' (Chẳng phải thế sao?, đúng không ạ?).",
    "formation": "Thân động từ / 있다·없다 + 나요?, Thân tính từ + (으)ㄴ가요? (khẩu ngữ cũng dùng -나요?); Thân tính từ phủ định '않다' + 나요?",
    "examples": [
      {
        "translation": "Thời tiết hôm nay thật đẹp, ra ngoài đi dạo thì tuyệt lắm, chẳng phải vậy sao?"
      },
      {
        "translation": "Đồ ăn ở nhà hàng này ngon quá, lần sau lại đến đây nữa thì thích thật đấy, đúng không ạ?"
      },
      {
        "translation": "Không hiểu được tình huống lúc đó đâu chỉ có mỗi mình tôi, chẳng phải thế sao?"
      },
      {
        "translation": "Bộ phim đó hay nên tôi muốn đi xem lại lần nữa, bạn có thấy thế không?"
      }
    ]
  },
  "ko_남짓_31": {
    "title": "~남짓 (Hơn... một chút, ngót nghét, chừng hơn)",
    "shortExplanation": "Hậu tố danh từ gắn sau từ chỉ số lượng hoặc đơn vị đo lường, biểu thị số lượng xấp xỉ nhỉnh hơn hoặc xấp xỉ mức đó một chút ('hơn... một chút', 'ngót nghét', 'khoảng chừng').",
    "longExplanation": "'~남짓' là một danh từ phụ thuộc (hoặc tiếp vị từ chỉ mức độ) gắn liền sau các từ chỉ số lượng hoặc danh từ chỉ đơn vị. Trong tiếng Hàn chuẩn, từ này chỉ mức số lượng vừa vượt qua con số đó một chút ('hơn một chút', 'ngót nghét'), thường dùng để ước lượng số trang, khoảng cách, số người, thời gian hoặc lượng vật thể một cách tự nhiên và khái quát.",
    "formation": "Từ chỉ số lượng / Danh từ đơn vị + 남짓",
    "examples": [
      {
        "translation": "Tôi mới đọc được chừng hơn 100 trang cuốn sách này thôi, vẫn còn nhiều nên chắc phải đọc thêm nữa."
      },
      {
        "translation": "Từ đây đến Seoul cách khoảng hơn 100km, đi bằng ô tô mất chừng 1 tiếng."
      },
      {
        "translation": "Hôm nay có hơn 5.000 người tụ họp lại cùng tận hưởng lễ hội lớn."
      },
      {
        "translation": "Số sách tôi đã đọc cho đến nay ngót nghét khoảng 200 cuốn."
      }
    ]
  },
  "ko_는_32": {
    "title": "~는 대로 (Theo như, đúng như, y như)",
    "shortExplanation": "Cấu trúc kết hợp định từ '-는' và danh từ phụ thuộc '대로', dùng để biểu thị hành động diễn ra y nguyên theo cách thức, trạng thái hoặc chỉ dẫn đã có ('theo như...', 'đúng như...').",
    "longExplanation": "'~는 대로' kết hợp vĩ tố định từ hiện tại '-는' với danh từ phụ thuộc '대로', mang ý nghĩa thực hiện hành động rập khuôn, hoàn toàn tuân theo phương pháp, quy cách hoặc trạng thái vốn có của vế trước mà không có sự thay đổi ('y như đã thấy', 'theo như được dạy'). Khi kết hợp với danh từ, nó có thể đi trực tiếp (ví dụ: 'nguyên trạng' - 그대로, 'theo ý muốn' - 뜻대로).",
    "formation": "Động từ + 는 대로 / Danh từ + 대로 (dạng quá khứ của động từ: -(으)ㄴ 대로)",
    "examples": [
      {
        "translation": "Mẹ dọn dẹp nhà cửa thế nào thì tôi cũng phải dọn dẹp y hệt theo như thế."
      },
      {
        "translation": "Anh ấy vẫn tiếp tục làm công việc đó theo đúng cách mà trước đây anh ấy vốn vẫn làm."
      },
      {
        "translation": "Tôi đã nấu mì ramyeon đúng y như cách bạn tôi đã chỉ cho."
      },
      {
        "translation": "Bức tranh của người nghệ sĩ đó cần phải được thưởng thức theo đúng nguyên trạng vốn có của nó."
      }
    ]
  },
  "ko_는_33": {
    "title": "~는 바와 같이 (Như đã..., giống như...)",
    "shortExplanation": "Cấu trúc so sánh hoặc dẫn chiếu kết hợp định từ, danh từ phụ thuộc '바', trợ từ '와' và phó từ '같이', biểu thị sự tương đồng hoặc viện dẫn: 'như điều đã...', 'giống như...'.",
    "longExplanation": "'~는 바와 같이' kết hợp vĩ tố định từ (-(으)ㄴ/는) với danh từ phụ thuộc '바' (điều, việc, tình huống), trợ từ so sánh '-와' và '같이' (giống như). Cấu trúc này dùng để so sánh sự tương đồng giữa hai tình huống ('giống như thể là...'), hoặc dùng trong văn phong trang trọng, phát biểu để viện dẫn một sự thật đã biết trước ('như quý vị đã biết', 'như nội dung dưới đây').",
    "formation": "Thân động từ/Tính từ + -(으)ㄴ/는 바와 같이 / Danh từ + (인) 바와 같이",
    "examples": [
      {
        "translation": "Anh ấy ngủ say như thể vừa nhắm nghiền mắt lại lúc mới chào đời vậy."
      },
      {
        "translation": "Các học sinh không hiểu được lời giải thích của giáo viên, hệt như là đang nghe tiếng nước ngoài vậy."
      },
      {
        "translation": "Cô ấy về đến nhà với gương mặt mệt mỏi, giống hệt như người vừa trải qua muôn vàn vất vả."
      },
      {
        "translation": "Như thể vừa thi trượt, anh ấy bước vào phòng với nét mặt rầu rĩ."
      }
    ]
  },
  "ko_는_34": {
    "title": "~는 편이다 (Thuộc diện..., có xu hướng..., khá là...)",
    "shortExplanation": "Cấu trúc diễn đạt xu hướng, thói quen hoặc đặc điểm chung, xếp sự việc vào một phía/diện tương đối nào đó chứ không khẳng định tuyệt đối ('thuộc dạng...', 'khá là...').",
    "longExplanation": "'~는 편이다' kết hợp vĩ tố định từ '-는' với danh từ phụ thuộc '편' (phía, bề, diện) và động từ tính từ '이다'. Cấu trúc này dùng khi muốn diễn đạt một thói quen, khuynh hướng hoặc đặc tính tương đối của người hoặc sự vật mà không muốn khẳng định một cách quá gay gắt hay tuyệt đối. Nó tương đương với 'thuộc tuýp...', 'thuộc dạng...', 'khá là...' hoặc 'thường có xu hướng...' trong tiếng Việt.",
    "formation": "Thân động từ + 는 편이다 (Tính từ: Thân tính từ + -(으)ㄴ 편이다)",
    "examples": [
      {
        "translation": "Tôi thuộc diện thường thức dậy sớm vào mỗi sáng, vì buổi sáng có nhiều việc phải làm nên phải dậy sớm."
      },
      {
        "translation": "Anh ấy là người cảm tính nên khá dễ bộc lộ cơn giận, đôi khi cách thể hiện của anh ấy có vẻ hơi quá đà."
      },
      {
        "translation": "Thời dậy thì, dù nỗi lo lắng có lớn đến đâu thì cũng thuộc dạng khó mở lời với bố mẹ, bởi vì nghĩ rằng bố mẹ sẽ không hiểu được."
      },
      {
        "translation": "Ở nhà tôi thường hay ăn món Hàn Quốc, vì tôi nấu món Hàn là giỏi nhất."
      }
    ]
  },
  "ko_는다는_35": {
    "title": "~는다는 것 (Việc rằng..., cái sự thật là...)",
    "shortExplanation": "Cấu trúc trích dẫn gián tiếp kết hợp định từ hóa danh từ, dùng để định nghĩa, khái quát hoặc nhấn mạnh một mệnh đề, chân lý hoặc sự thật ('việc rằng...', 'sự thật là...').",
    "longExplanation": "'~는다는 것' là sự kết hợp giữa vĩ tố trích dẫn gián tiếp dạng tường thuật '-(ㄴ/는)다고 하다' rút gọn thành '-(ㄴ/는)다는' và danh từ phụ thuộc '것' (điều, việc, sự thật). Cấu trúc này dùng để biến một nhận định hoặc một phát biểu thành một cụm danh từ chủ đề trong câu, nhằm đưa ra định nghĩa, bình luận, triết lý hoặc nhấn mạnh tầm quan trọng của sự thật đó.",
    "formation": "Thân động từ có phụ âm cuối + 는다는 것 / Thân động từ không có phụ âm cuối + ㄴ다는 것 (Tính từ: Thân tính từ + 다는 것; Danh từ: Danh từ + (이)라는 것; Quá khứ: -았/었다는 것)",
    "examples": [
      {
        "translation": "Việc anh ấy vẫn đi học đều đặn là bằng chứng cho thấy anh ấy đang học tập thực sự chăm chỉ."
      },
      {
        "translation": "Việc chúng ta thấu hiểu lẫn nhau là điều vô cùng cần thiết để cùng vun đắp một mối quan hệ sâu sắc."
      },
      {
        "translation": "Tôi đã rất đỗi vui mừng khi biết được tin bạn tôi gặt hái được thành công vang dội."
      },
      {
        "translation": "Việc anh ấy yêu thích vận động đồng nghĩa với việc anh ấy đang nỗ lực vì sức khỏe của chính mình."
      }
    ]
  },
  "ko_는데_36": {
    "title": "~는데 (Thế nhưng, mà, nên, trong khi)",
    "shortExplanation": "Vĩ tố liên kết đa năng dùng để nối hai vế câu: nêu bối cảnh tiền đề, giải thích hoàn cảnh trước khi đưa ra hành động, hoặc biểu thị sự đối lập tương phản ('thế nhưng', 'mà', 'thì').",
    "longExplanation": "'~는데' là một trong những vĩ tố liên kết cơ bản và quan trọng nhất trong tiếng Hàn. Cấu trúc này dùng để: 1) Đặt ra bối cảnh, hoàn cảnh nền tảng cho hành động tiếp theo ở vế sau; 2) Biểu thị sự tương phản, đối lập nhẹ giữa hai vế ('nhưng', 'thế nhưng'); 3) Làm tiền đề giải thích lý do cho lời đề nghị, mời gọi hoặc câu hỏi tiếp nối. Đi với động từ ở thì hiện tại là '-는데', tính từ là '-(으)ㄴ데'.",
    "formation": "Thân động từ / 있다·없다 / Thì quá khứ (-았/었) + 는데 (Thân tính từ: -(으)ㄴ데; Danh từ: -(이)ㄴ데)",
    "examples": [
      {
        "translation": "Thời tiết lạnh thế mà bạn lại không mặc áo khoác ngoài. Sẽ ốm mất thôi đấy."
      },
      {
        "translation": "Đã định hẹn gặp bạn rồi, thế nhưng trời mưa nên kế hoạch đã bị thay đổi."
      },
      {
        "translation": "Hôm nay tôi đã học bài rất nhiều thế nhưng vẫn chưa thể hiểu được."
      },
      {
        "translation": "Anh ấy đã mỉm cười, thế nhưng hóa ra là đang tức giận với tôi đấy."
      }
    ]
  },
  "ko_는지_37": {
    "title": "~는지 알다/모르다 (Biết / Không biết là có... hay không)",
    "shortExplanation": "Cấu trúc kết hợp vĩ tố nghi vấn mập mờ '-는지' với động từ '알다' (biết) hoặc '모르다' (không biết), diễn tả việc có biết hay không biết một sự thật, tình huống nào đó.",
    "longExplanation": "'~는지 알다/모르다' là cấu trúc biểu thị sự nhận biết hay không nhận biết về một nghi vấn hoặc tình huống không chắc chắn. Vĩ tố '-는지' biến mệnh đề đi trước thành một mệnh đề nghi vấn gián tiếp, và theo sau là động từ '알다' (biết), '모르다' (không biết) hoặc các động từ nhận thức khác (như '기억하다', '궁금하다'). Thường dịch là 'biết/không biết liệu... có... hay không'.",
    "formation": "Thân động từ / 있다·없다 / Quá khứ (-았/었) + 는지 알다/모르다 (Thân tính từ hiện tại: -(으)ㄴ지; Tương lai: -(으)ㄹ지)",
    "examples": [
      {
        "translation": "Bạn có biết anh ấy đã đến trường hay chưa không?"
      },
      {
        "translation": "Tôi không biết liệu cô ấy có còn yêu tôi nữa hay không."
      },
      {
        "translation": "Bạn có biết liệu chúng ta có thể giành chiến thắng được không?"
      },
      {
        "translation": "Tôi không biết là bạn có còn nhớ ngày sinh nhật của anh ấy hay không nữa."
      }
    ]
  },
  "ko_는지라_38": {
    "title": "~는지라 (Vì... nên, do... mà)",
    "shortExplanation": "Vĩ tố liên kết mang tính văn viết, trang trọng, dùng để giải thích nguyên nhân, lý do khách quan dẫn đến kết quả tất yếu hoặc tình huống ở vế sau ('bởi vì... nên').",
    "longExplanation": "'~는지라' là vĩ tố liên kết kết hợp giữa vĩ tố nghi vấn '-은/는/ㄴ지' và trợ từ cổ '-라' (chỉ nguyên do). Cấu trúc này dùng trong văn viết hoặc khẩu ngữ trang nhã, trịnh trọng để nêu lên lý do, tình thế khách quan giải thích vì sao vế sau lại diễn ra như vậy. Thường mang sắc thái tình huống cấp bách, hiển nhiên hoặc ngoài tầm kiểm soát của chủ ngữ.",
    "formation": "Thân động từ / 있다·없다 + 는지라 (Thân tính từ: -(으)ㄴ지라; Danh từ: -(이)ㄴ지라; Quá khứ: -았/었던지라 hoặc -았/었는지라)",
    "examples": [
      {
        "translation": "Vì cô ấy học tập quá đỗi chăm chỉ nên các bài tập về nhà lúc nào cũng hoàn thành một cách hoàn hảo."
      },
      {
        "translation": "Vì thời tiết quá lạnh nên tôi chẳng muốn đến trường chút nào."
      },
      {
        "translation": "Vì em bé bị ốm nên cả đêm tôi đã không thể chợp mắt được."
      },
      {
        "translation": "Tuần này nhiều việc nên bận quá đỗi, thành ra tôi hoàn toàn chẳng có lấy một chút thời gian để nghỉ ngơi."
      }
    ]
  },
  "ko_다가_39": {
    "title": "~다가 (Đang... thì..., vừa mới... thì...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị một hành động hoặc trạng thái đang diễn ra thì bị đứt quãng, gián đoạn hoặc chuyển hướng sang một hành động khác xen vào ('đang... thì...').",
    "longExplanation": "'~다가' là vĩ tố liên kết diễn tả hành động ở vế trước đang tiến triển thì bị gián đoạn, dừng lại giữa chừng và một hành động hay sự cố khác ở vế sau bất ngờ chen ngang vào làm thay đổi tình thế. Chủ ngữ của hai vế thường là cùng một người (nhất là khi chủ động chuyển hành động), tương đương với 'đang... thì...' trong tiếng Việt.",
    "formation": "Thân động từ + 다가",
    "examples": [
      {
        "translation": "Tôi đang đọc sách thì ngủ thiếp đi mất."
      },
      {
        "translation": "Đang trên đường về nhà thì xe bị hỏng nên tôi đã đi xe buýt về."
      },
      {
        "translation": "Đang ăn cơm thì bạn gọi điện thoại gấp nên tôi không thể ăn hết bữa được."
      },
      {
        "translation": "Đang học bài thì tôi đột nhiên phải đi ra ngoài, vì trưởng phòng đến."
      }
    ]
  },
  "ko_다가는_40": {
    "title": "~다가는 (Nếu cứ tiếp tục... thì sẽ..., cứ thế này thì...)",
    "shortExplanation": "Cấu trúc đưa ra lời cảnh báo, biểu thị nếu cứ tiếp tục duy trì hành động hay tình trạng tiêu cực ở vế trước thì chắc chắn sẽ dẫn đến hậu quả xấu ở vế sau ('nếu cứ... mãi thì sẽ...').",
    "longExplanation": "'~다가는' là sự kết hợp giữa vĩ tố liên kết '-다가' và trợ từ nhấn mạnh chủ đề '-는'. Cấu trúc này dùng trong các câu cảnh báo hoặc dự đoán lo ngại: nếu một hành vi, thói quen hay xu hướng nào đó cứ tiếp diễn mà không dừng lại, thì nhất định sẽ gánh chịu một hậu quả bất lợi, tồi tệ hoặc nguy hiểm ở vế sau. Vế sau hầu như luôn là kết quả tiêu cực.",
    "formation": "Thân động từ + 다가는",
    "examples": [
      {
        "translation": "Nếu cậu cứ tiếp tục làm việc muộn đến thế này thì cơ thể sẽ suy kiệt, tàn tạ mất thôi."
      },
      {
        "translation": "Nếu vào bữa trưa cứ chỉ uống cà phê thay vì ăn cơm thì sức khỏe của bạn sẽ phát sinh vấn đề đấy."
      },
      {
        "translation": "Nếu chúng ta cứ thường xuyên xung đột thế này thì mối quan hệ này sẽ không thể kéo dài được lâu đâu."
      },
      {
        "translation": "Nếu đêm nào cũng ngủ muộn như thế thì buổi sáng sẽ càng ngày càng khó thức dậy đấy."
      }
    ]
  },
  "ko_다가도_41": {
    "title": "~다가도 (Đang... thế mà cũng..., vừa mới... đã lại...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị một hành động hoặc trạng thái đang diễn ra ngon trớn thì có thể đột ngột thay đổi 180 độ hoặc bị đảo ngược ngay tức khắc ('đang... thế mà cũng...', 'vừa mới... đã lại...').",
    "longExplanation": "'~다가도' kết hợp giữa vĩ tố liên kết '-다가' và trợ từ nhượng bộ/nhấn mạnh '-도' (cũng, ngay cả). Cấu trúc này dùng để diễn đạt sự chuyển biến trạng thái hoặc hành động một cách đột ngột, dễ dàng bị đảo ngược hoặc thay đổi bất ngờ trước một tác động ngoại cảnh hay ý muốn bộc phát, cho thấy tính chất dễ thay đổi của tình huống ('đang học đấy nhưng hễ ai rủ là bỏ đi ngay').",
    "formation": "Thân động từ/Tính từ + 다가도",
    "examples": [
      {
        "translation": "Tôi đang trên đường về nhà thế mà đột nhiên trời đổ mưa to quá nên đã tạt vào mua chiếc ô."
      },
      {
        "translation": "Cậu ấy dù đang học bài đi chăng nữa, hễ bạn rủ đi xem phim là lập tức dừng lại rồi đi tới rạp chiếu phim ngay."
      },
      {
        "translation": "Nhân vật chính đang trên đà thắng trận chung kết thế mà đến phút chót lại mắc sai lầm nên đã phải nhận thất bại."
      },
      {
        "translation": "Chúng tôi đang trên đường đi dã ngoại thế mà đột nhiên thời tiết chuyển xấu nên đã quay trở về nhà."
      }
    ]
  },
  "ko_다니_42": {
    "title": "~다니 (Thế mà lại..., đến mức... cơ à, thật không ngờ là...)",
    "shortExplanation": "Vĩ tố cảm thán biểu thị sự ngạc nhiên tột độ, bất ngờ, sửng sốt hoặc không thể tin nổi trước một sự thật hoặc lời nói vừa nghe được ('không ngờ là...', 'thế mà lại...').",
    "longExplanation": "'~다니' là dạng rút gọn của vĩ tố trích dẫn gián tiếp và cảm thán '-(ㄴ/는)다고 하니'. Cấu trúc này dùng để bộc lộ cảm xúc ngỡ ngàng, kinh ngạc, thán phục hoặc không thể tin nổi của người nói khi tiếp nhận một thông tin, sự việc chấn động ngoài sức tưởng tượng. Trong tiếng Việt thường tương đương với 'thật không ngờ là...', 'ai mà ngờ... lại...', 'thế mà cũng... cơ đấy'.",
    "formation": "Thân động từ có phụ âm cuối + 는다니 / Thân động từ không có phụ âm cuối + ㄴ다니 (Thân tính từ: -다니; Danh từ: -(이)라니; Quá khứ: -았/었다니)",
    "examples": [
      {
        "translation": "Cậu định kết hôn với cô ấy thật cơ à, tớ thực sự không thể tin nổi luôn!"
      },
      {
        "translation": "Thật không ngờ là mình lại được giao đảm nhận một dự án quan trọng đến nhường này, quả là đáng kinh ngạc!"
      },
      {
        "translation": "Ngày mai có bài thi cơ á, sao chẳng có ai nói cho tôi biết thế này?"
      },
      {
        "translation": "Ai mà ngờ được anh ấy lại làm ra chuyện như thế này chứ, tôi thực sự đã giật cả mình!"
      }
    ]
  },
  "ko_다면_43": {
    "title": "~다면 (Nếu như, giả sử nếu...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị giả định về một tình huống hoặc điều kiện mang tính giả thiết (rút gọn từ '-다고 하면'), thường dùng khi khả năng xảy ra thấp hoặc muốn nhấn mạnh sự giả định ('nếu...', 'giả sử...').",
    "longExplanation": "'~다면' là dạng rút gọn của cấu trúc trích dẫn giả định '-다고 하면' (nếu nói rằng...). Khác với vĩ tố giả định thông thường '-(으)면' (thường dùng cho điều kiện thực tế hoặc thói quen), '~다면' nhấn mạnh vào việc đặt ra một tình huống giả định thuần túy, một điều kiện chưa xảy ra hoặc một khả năng rất khó xảy ra trong thực tế. Mệnh đề sau thường diễn đạt ý chí, phán đoán, khả năng hoặc đề xuất của người nói.",
    "formation": "Động từ (có phụ âm cuối: -는다면 / không có phụ âm cuối: -ㄴ다면), Tính từ + 다면, Danh từ + (이)라면, Quá khứ + 았/었다면",
    "examples": [
      {
        "translation": "Nếu có thời gian, tôi có thể đợi ở đây cho đến ngày mai."
      },
      {
        "translation": "Nếu bạn đến đây, chúng ta có thể cùng nhau ăn tối."
      },
      {
        "translation": "Nếu trời mưa, bạn hãy mang theo ô nhé."
      },
      {
        "translation": "Nếu điều đó là thật thì quả là một chuyện vô cùng đáng kinh ngạc."
      }
    ]
  },
  "ko_더라도_44": {
    "title": "~더라도 (Dù cho, dẫu cho, cho dù... đi chăng nữa)",
    "shortExplanation": "Vĩ tố liên kết biểu thị sự nhượng bộ giả định, nghĩa là dù tiền đề ở vế trước có xảy ra thì vế sau vẫn diễn ra hoặc không hề bị thay đổi hay lay chuyển ('cho dù... thì vẫn...').",
    "longExplanation": "'~더라도' là cấu trúc nhượng bộ giả định mạnh mẽ trong tiếng Hàn. Cấu trúc này đặt ra một giả thiết mang tính trở ngại hoặc nghịch cảnh ở vế trước, nhưng khẳng định chắc nịch rằng hành động, quyết tâm hay kết quả ở vế sau hoàn toàn không bị ảnh hưởng. Khác với '-아/어도' (dùng cho cả thực tế lẫn giả định nhẹ), '~더라도' nhấn mạnh mức độ giả định cao hơn và ý chí quyết đoán hơn nhiều.",
    "formation": "Thân động từ/Tính từ + 더라도, Danh từ + (이)라도 / (이)라 하더라도",
    "examples": [
      {
        "translation": "Dù trời có mưa tôi vẫn sẽ đến trường, bởi vì tôi phải tiếp tục việc học tập."
      },
      {
        "translation": "Cho dù kỳ thi có khó khăn tôi cũng sẽ dốc hết sức mình, thất bại không phải là một sự lựa chọn."
      },
      {
        "translation": "Dù trời có trở nên quá lạnh tôi vẫn sẽ đi trượt tuyết, bởi vì đó là cách tôi tận hưởng cuộc sống."
      },
      {
        "translation": "Cho dù ngày mai là ngày nghỉ tôi vẫn sẽ dậy sớm, như vậy thì mới không bị muộn được."
      }
    ]
  },
  "ko_더라구요_45": {
    "title": "~더라구요 / ~더라고요 (Tôi thấy là..., nhận thấy rằng..., hóa ra là...)",
    "shortExplanation": "Vĩ tố kết thúc câu thân mật biểu thị việc người nói hồi tưởng và chia sẻ lại một sự thật, cảm xúc hoặc trải nghiệm trực tiếp mà bản thân đã tận mắt chứng kiến hay tự mình nhận ra trong quá khứ ('tôi thấy rằng...', 'hóa ra...').",
    "longExplanation": "'~더라구요' (chuẩn chính tả là '~더라고요') là đuôi câu khẩu ngữ dùng để truyền đạt lại cho người nghe một thông tin, ấn tượng hoặc cảm nhận mà chính người nói đã trực tiếp trải nghiệm, chứng kiến hoặc nhận thấy trong quá khứ. Đuôi câu này mang sắc thái trò chuyện thân mật, tự nhiên, tái hiện lại cảm xúc chân thực tại thời điểm người nói phát hiện ra sự việc.",
    "formation": "Thân động từ/Tính từ + 더라고요 (더라구요), Danh từ + (이)더라고요 (더라구요), Quá khứ + 았/었더라고요 (었더라구요)",
    "examples": [
      {
        "translation": "Hôm qua nhìn thấy có chương trình giảm giá lớn tôi thấy bất ngờ thực sự, thế nên đã lập tức đi mua sắm luôn."
      },
      {
        "translation": "Thời tiết âm u nên tôi nhận thấy không thích hợp để đi dạo chút nào, vì vậy tôi đã ở nhà."
      },
      {
        "translation": "Nhìn thấy vóc dáng của bạn mình ngày càng đẫy đà hơn, tôi nhận ra là bạn ấy đã mang thai nên đã gửi lời chúc mừng."
      },
      {
        "translation": "Sau khi xem bộ phim đó, tôi nhận thấy vị đạo diễn ấy thực sự rất tài năng, vì thế tôi lại càng quan tâm hơn."
      }
    ]
  },
  "ko_던_46": {
    "title": "~던 (Từng..., đã từng hay..., dở dang...)",
    "shortExplanation": "Vĩ tố định từ hồi tưởng kết hợp sau thân động từ hoặc tính từ để bổ nghĩa cho danh từ đi sau, diễn tả một hành động, thói quen thường xuyên diễn ra trong quá khứ hoặc một trạng thái/sự việc còn dở dang chưa hoàn tất ('từng hay...', 'đã từng...').",
    "longExplanation": "'~던' là vĩ tố định từ mang tính hồi tưởng (kết hợp yếu tố hồi tưởng '-더-' và vĩ tố định từ '-ㄴ'). Khi bổ nghĩa cho danh từ, cấu trúc này diễn đạt: (1) một thói quen hoặc hành động thường xuyên lặp đi lặp lại trong quá khứ nhưng nay đã chấm dứt; (2) một hành động đang tiến hành dở dang trong quá khứ thì bị gián đoạn. Nó thường mang lại cảm giác hoài niệm, gợi nhớ về những kỷ niệm xưa cũ.",
    "formation": "Thân động từ/Tính từ + 던 + Danh từ",
    "examples": [
      {
        "translation": "Lâu lắm rồi tôi mới lại ghé thăm quán cà phê mà thời cấp ba tôi từng hay lui tới."
      },
      {
        "translation": "Chị gái tôi đang cố gắng tìm lại loại sô-cô-la mà ngày xưa chị ấy từng hay ăn."
      },
      {
        "translation": "Cậu có còn nhớ chiếc áo len cổ lọ mà ngày nào tôi cũng từng mặc không?"
      },
      {
        "translation": "Bố đã đến hiệu sách để tìm mua món đồ chơi mà trước đây bố từng chơi cùng cháu gái."
      }
    ]
  },
  "ko_도록_47": {
    "title": "~도록 (Để, nhằm để, sao cho, đến mức...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị mục đích, đích đến hướng tới của hành động ('để...', 'sao cho...'), hoặc biểu thị mức độ, giới hạn thời gian kéo dài của một trạng thái ('đến mức...', 'cho đến khi...').",
    "longExplanation": "'~도록' là vĩ tố liên kết linh hoạt trong tiếng Hàn, chủ yếu đảm nhận hai chức năng: (1) Chỉ mục đích: hành động ở mệnh đề sau được thực hiện nhằm để đạt được trạng thái hoặc kết quả được nêu ở mệnh đề trước (tương đương với '-게' nhưng mang tính trang trọng và có chủ đích rõ rệt hơn); (2) Chỉ mức độ hoặc thời gian: diễn tả hành động kéo dài đến một mức độ hay thời điểm nhất định (như 'chờ đến sáng', 'hát đến khản giọng').",
    "formation": "Thân động từ/Tính từ + 도록",
    "examples": [
      {
        "translation": "Tôi định mỗi ngày học một tiếng đồng hồ để có thể trở nên giỏi tiếng Hàn."
      },
      {
        "translation": "Để duy trì sức khỏe, chúng ta phải tập thể dục điều độ và ăn uống đủ chất dinh dưỡng."
      },
      {
        "translation": "Để học sinh hiểu được lý thuyết, thầy giáo đã giải thích những khái niệm phức tạp một cách đơn giản."
      },
      {
        "translation": "Để các em nhỏ có thể vui chơi an toàn, sân chơi đã được lắp đặt các thiết bị bảo hộ cẩn thận."
      }
    ]
  },
  "ko_도록_48": {
    "title": "~도록 하다 (Hãy cố gắng làm..., hãy đảm bảo rằng..., bảo... làm...)",
    "shortExplanation": "Cấu trúc biểu thị mệnh lệnh, khuyên bảo mang tính lịch sự và chỉ đạo ('hãy đảm bảo làm...', 'hãy chú ý làm...'), hoặc biểu thị việc yêu cầu/sai khiến người khác thực hiện một hành động, hay sự quyết tâm của bản thân.",
    "longExplanation": "'~도록 하다' kết hợp giữa vĩ tố mục đích '-도록' và động từ '하다'. Cấu trúc này thường được dùng ở các thể mệnh lệnh hoặc khuyên thị ('-도록 하세요', '-도록 합시다') để đưa ra lời yêu cầu, nhắc nhở hoặc hướng dẫn người khác một cách lịch sự, nhã nhặn nhưng dứt khoát ('hãy nhớ làm...', 'chú ý làm...'). Khi chủ ngữ là ngôi thứ nhất, nó thể hiện ý chí và sự quyết tâm tự nhắc nhở bản thân sẽ hoàn thành một mục tiêu.",
    "formation": "Thân động từ + 도록 하다",
    "examples": [
      {
        "translation": "Ngày mai anh hãy nhớ nhất định phải có mặt nhé. Chúng ta cần chia sẻ những thông tin quan trọng."
      },
      {
        "translation": "Sau bữa ăn hãy chú ý rửa tay thật sạch sẽ."
      },
      {
        "translation": "Chúng ta phải đảm bảo hoàn tất toàn bộ các dự án trước năm sau."
      },
      {
        "translation": "Xin vui lòng hướng dẫn trước các vật dụng cần chuẩn bị để các em học sinh chuẩn bị tốt cho kỳ thi."
      }
    ]
  },
  "ko_라든지_49": {
    "title": "~라든지 (Như là..., hay là..., hoặc là...)",
    "shortExplanation": "Vĩ tố liên kết hoặc trợ từ liệt kê nhiều đối tượng, hành động hoặc khả năng mang tính tiêu biểu làm ví dụ, mang nghĩa 'chẳng hạn như... hay là...', 'hoặc là...'.",
    "longExplanation": "'~라든지' là cấu trúc dùng để liệt kê từ hai sự vật, hiện tượng hoặc hành động trở lên nhằm đưa ra các ví dụ cụ thể trong vô vàn các lựa chọn khả dĩ. Cấu trúc này thường điệp lại thành chuỗi 'A라든지 B라든지' (chẳng hạn như A hay là B), cho thấy đây chỉ là một vài phương án minh họa tiêu biểu chứ không giới hạn ở bấy nhiêu điều.",
    "formation": "Danh từ + (이)라든지, Động từ/Tính từ + -(ㄴ/는)다든지 / -(이)라든지",
    "examples": [
      {
        "translation": "Như là vẽ tranh, chụp ảnh hay tập thể thao, các hoạt động sở thích rất phong phú đa dạng."
      },
      {
        "translation": "Lý do phải đến nhanh có thể do đói bụng, do có việc cần làm, chẳng hạn thế, có rất nhiều nguyên nhân."
      },
      {
        "translation": "Tôi định đi mua kem, có vị vani hay vị sô-cô-la cùng rất nhiều hương vị khác nữa."
      },
      {
        "translation": "Những người thích đọc sách có thể thưởng thức đa dạng thể loại như tiểu thuyết lãng mạn hay sách phát triển bản thân."
      }
    ]
  },
  "ko_라도_50": {
    "title": "~라도 (Dù chỉ là..., ít nhất thì cũng..., dẫu là...)",
    "shortExplanation": "Trợ từ biểu thị sự lựa chọn tạm thời, chấp nhận một phương án thứ yếu hoặc tối thiểu khi không có được điều tốt nhất ('dù chỉ là...', 'chí ít thì cũng...'), hoặc biểu thị sự nhượng bộ giả định.",
    "longExplanation": "'~라도' (gắn sau danh từ có phụ âm cuối là '이라도') chủ yếu biểu thị phương án 'vớt vát' hoặc giải pháp tạm thời tốt nhất trong hoàn cảnh hiện tại: dù không phải là điều lý tưởng nhất nhưng dẫu sao vẫn có thể chấp nhận được ('ít nhất là...', 'dù chỉ là...'). Ngoài ra khi đi kèm các đại từ nghi vấn (누구라도, 언제라도) nó mang nghĩa 'bất cứ...', và khi đi với động/tính từ dưới dạng '-더라도' nó biểu thị sự nhượng bộ 'cho dù...'.",
    "formation": "Danh từ có phụ âm cuối + 이라도 / Danh từ không có phụ âm cuối + 라도",
    "examples": [
      {
        "translation": "Dù không làm bài tập về nhà đi nữa thì bạn vẫn nhất định phải tham gia lớp học."
      },
      {
        "translation": "Dù căn nhà đó có quá đắt đỏ và nếu không có tiền thì chí ít ta cũng phải thuê lấy một căn phòng nhỏ."
      },
      {
        "translation": "Dù xin việc có khó khăn gian nan thì tối thiểu mỗi ngày cũng phải gửi đi một bộ hồ sơ xin việc."
      },
      {
        "translation": "Nếu không thể gọi hết mọi món ở quán ngon thì thử mua dù chỉ một món tráng miệng nhỏ xem sao?"
      }
    ]
  },
  "ko_라서_51": {
    "title": "~라서 / ~(이)라서 (Vì là..., do là...)",
    "shortExplanation": "Vĩ tố liên kết chỉ nguyên nhân, lý do đi sau danh từ (dạng kết hợp của từ chỉ định '이다' và vĩ tố nguyên nhân '-아서/어서'), có nghĩa là 'vì là...', 'do là...'.",
    "longExplanation": "'~라서' (kết hợp thành '이라서' sau danh từ có phụ âm cuối) là dạng rút gọn của cấu trúc nguyên nhân '-(이)어서' đi với trợ từ chỉ định '이다'. Cấu trúc này dùng riêng cho danh từ để giải thích lý do, nguồn cơn dẫn tới kết quả hay hành động ở mệnh đề tiếp sau ('vì là ngày nghỉ nên...', 'vì là cuối tuần nên...').",
    "formation": "Danh từ có phụ âm cuối + 이라서 / Danh từ không có phụ âm cuối + 라서",
    "examples": [
      {
        "translation": "Hôm nay vì là ngày nghỉ nên tôi không cần phải đi làm."
      },
      {
        "translation": "Nhà hàng đó vì là một nơi nổi tiếng nên lúc nào cũng đông khách."
      },
      {
        "translation": "Dạo này vì đang là kỳ nghỉ nên ở trường hầu như không có học sinh."
      },
      {
        "translation": "Vì là cuối tuần nên đường sá tắc nghẽn quá chừng."
      }
    ]
  },
  "ko_라야_52": {
    "title": "~라야 / ~(이)라야 하다 (Phải là... mới, chỉ có là... mới có thể...)",
    "shortExplanation": "Cấu trúc biểu thị điều kiện tất yếu mang tính tuyển chọn khắt khe, chỉ khi là đối tượng danh từ đó thì mới đáp ứng được yêu cầu hoặc thực hiện được hành động ('phải là... mới...', 'chỉ có... mới...').",
    "longExplanation": "'~라야' (kết hợp thành '이라야' sau danh từ có phụ âm cuối) kết hợp với '하다' hoặc '할 수 있다' để nhấn mạnh rằng chỉ duy nhất đối tượng được nêu mới có đủ tư cách, tiêu chuẩn hoặc điều kiện tiên quyết để thỏa mãn mệnh đề sau. Cấu trúc này mang văn phong trang trọng, chọn lọc kỹ càng, tương đương với 'phải là... thì mới được/mới có thể...' trong tiếng Việt.",
    "formation": "Danh từ có phụ âm cuối + 이라야 하다 / Danh từ không có phụ âm cuối + 라야 하다 (hoặc: Danh từ + (이)라야 + Mệnh đề điều kiện)",
    "examples": [
      {
        "translation": "Công việc này có lẽ phải là chuyên gia thì mới làm được."
      },
      {
        "translation": "Phải là người trung thực thì mới có thể đảm nhận trọng trách này."
      },
      {
        "translation": "Phải là một khát khao thực sự tha thiết thì mới có thể duy trì được nỗ lực như thế chứ."
      },
      {
        "translation": "Tôi nghĩ rằng phải có sức khỏe thì mới có thể làm được bất cứ điều gì."
      }
    ]
  },
  "ko_려고_53": {
    "title": "~려고 / ~(으)려고 (Định..., để..., với ý định...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị ý định, mục đích hoặc kế hoạch thực hiện một hành động của chủ ngữ ('định...', 'để mà...', 'với mục đích...').",
    "longExplanation": "'~(으)려고' gắn vào thân động từ để diễn tả mục đích hoặc ý định của chủ ngữ trước khi bắt tay vào hành động. Khác với đuôi câu hoàn chỉnh '-려고 하다', bản thân '~려고' đóng vai trò là vĩ tố liên kết giữa hai mệnh đề, thường kết hợp với '-는데', '-했으나/했지만' để diễn tả một dự định nhưng bị hoàn cảnh cản trở, hoặc chỉ mục đích thuần túy của hành động ở vế sau.",
    "formation": "Thân động từ có phụ âm cuối (trừ ㄹ) + 으려고 / Thân động từ không có phụ âm cuối hoặc có phụ âm cuối ㄹ + 려고",
    "examples": [
      {
        "translation": "Ngày mai tôi định đi xem phim với bạn bè, nhưng vẫn chưa quyết định xem phim nào."
      },
      {
        "translation": "Tôi đã định đọc sách tối nay nhưng vì quá mệt nên cứ thế đi ngủ luôn."
      },
      {
        "translation": "Tôi đã định về nhà bố mẹ nhưng đột nhiên có việc phát sinh nên không thể đi được."
      },
      {
        "translation": "Mẹ đã định tặng bố chiếc ví mới, nhưng mẹ rất bất ngờ vì bố đã tự mua một chiếc giống hệt rồi."
      }
    ]
  },
  "ko_려고_54": {
    "title": "~려고 하다 / ~(으)려고 하다 (Định làm..., có kế hoạch..., định bụng...)",
    "shortExplanation": "Cấu trúc biểu thị ý định, kế hoạch trong tương lai gần hoặc sự nỗ lực chuẩn bị thực hiện một hành động của chủ ngữ ('định...', 'dự định làm...').",
    "longExplanation": "'~(으)려고 하다' kết hợp giữa vĩ tố ý định '-(으)려고' và động từ '하다', tạo thành vị ngữ hoàn chỉnh diễn tả kế hoạch, ý đồ hoặc dự định hành động của người nói/chủ ngữ. Khi dùng ở thì quá khứ '-(으)려고 했다', nó thường mang hàm ý một dự định trước đây nhưng cuối cùng không thành hoặc đã bị hủy bỏ giữa chừng.",
    "formation": "Thân động từ có phụ âm cuối (trừ ㄹ) + 으려고 하다 / Thân động từ không có phụ âm cuối hoặc có phụ âm cuối ㄹ + 려고 하다",
    "examples": [
      {
        "translation": "Tôi định gặp bạn vào ngày mai, nhưng kế hoạch cũng có thể thay đổi."
      },
      {
        "translation": "Anh ấy đã định học chơi đàn ghi-ta, nhưng vì không có nhiều thời gian nên rốt cuộc đã bỏ cuộc."
      },
      {
        "translation": "Chúng tôi dự định cuối tuần này sẽ đi leo núi, nhưng vì thời tiết không tốt nên khả năng là rất thấp."
      },
      {
        "translation": "Từ bây giờ tôi dự định sẽ học một kỹ năng mới. Điều này là nhằm nâng cao năng lực chuyên môn của bản thân."
      }
    ]
  },
  "ko_려는데_55": {
    "title": "~려는데 / ~(으)려는데 (Đang tính... thì lại, định... nhưng mà...)",
    "shortExplanation": "Vĩ tố liên kết kết hợp giữa ý định '-(으)려고 하다' và tiền đề '-(으)ㄴ/는데', diễn đạt việc chủ ngữ đang có ý định làm điều gì đó thì xuất hiện một tình huống phát sinh, khó khăn hay trở ngại cản trở ('đang định... thì...', 'tính... nhưng mà...').",
    "longExplanation": "'~(으)려는데' là dạng rút gọn của cấu trúc '-(으)려고 하는데'. Cấu trúc này đưa ra ý định hoặc kế hoạch ban đầu của người nói ở vế trước làm bối cảnh, để rồi ở vế sau trình bày một tình huống bất ngờ, một trở ngại hoặc sự phân vân xuất hiện khiến cho dự định đó khó lòng thực hiện suôn sẻ như mong đợi.",
    "formation": "Thân động từ có phụ âm cuối (trừ ㄹ) + 으려는데 / Thân động từ không có phụ âm cuối hoặc có phụ âm cuối ㄹ + 려는데",
    "examples": [
      {
        "translation": "Hôm nay tôi định về nhà sớm một chút thì lại có công việc khẩn cấp phát sinh nên chắc là khó rồi."
      },
      {
        "translation": "Ban đầu tôi định hoàn thành dự án đó nhưng vì phát sinh nhiều vấn đề nên đã không thể hoàn thành được."
      },
      {
        "translation": "Ngày mai tôi định đi xem phim với bạn nhưng tất cả các vé đều đã bán hết sạch nên không biết có đi được không."
      },
      {
        "translation": "Tôi đang tính đi du lịch nhưng thời tiết lại xấu nên đang băn khoăn không biết có nên hoãn lại nữa hay không."
      }
    ]
  },
  "ko_리가_56": {
    "title": "~리가 없다 / ~(으)ㄹ 리가 없다 (Không có lý nào..., chẳng có lý do gì lại..., làm sao mà... được)",
    "shortExplanation": "Cấu trúc biểu thị sự phủ định tuyệt đối về khả năng hoặc tính xác thực của một sự việc, thể hiện sự nghi ngờ hoặc không tin tưởng mạnh mẽ của người nói ('không đời nào...', 'làm gì có chuyện...').",
    "longExplanation": "'~(으)ㄹ 리가 없다' bao gồm vĩ tố định từ tương lai '-(으)ㄹ', danh từ phụ thuộc '리' (lý lẽ, nguyên cớ, khả năng) và tính từ phủ định '없다' (không có). Cấu trúc này diễn đạt niềm tin chắc chắn rằng một sự việc tuyệt đối không thể xảy ra hoặc hoàn toàn vô lý xét theo lẽ thường, kinh nghiệm hay phẩm chất của chủ thể ('không lý nào...', 'làm sao có thể... được').",
    "formation": "Thân động từ/Tính từ có phụ âm cuối (trừ ㄹ) + 을 리가 없다 / Thân động từ/Tính từ không có phụ âm cuối hoặc có phụ âm cuối ㄹ + ㄹ 리가 없다, Danh từ + 일 리가 없다",
    "examples": [
      {
        "translation": "Anh ấy không có lý nào lại nói dối tôi. Anh ấy là một người vô cùng chính trực."
      },
      {
        "translation": "Tôi đã ăn quá nhiều rồi nên không đời nào có thể ăn thêm được nữa."
      },
      {
        "translation": "Chiếc túi quá nặng nên làm sao tôi có thể xách thêm được nữa chứ."
      },
      {
        "translation": "Tôi vốn ghét màu đỏ nên không bao giờ có chuyện tôi lại mặc quần áo màu đó đâu."
      }
    ]
  },
  "ko_리요_57": {
    "title": "~리요 / ~(으)리요 (Chắc hẳn là sẽ..., ắt hẳn sẽ...)",
    "shortExplanation": "Vĩ tố kết thúc câu mang sắc thái cổ điển, trang trọng hoặc văn phong cổ, dùng để đưa ra phán đoán, suy trắc đầy tin tưởng về tương lai hoặc khẳng định một sự việc hiển nhiên ('ắt hẳn sẽ...', 'chắc hẳn là...').",
    "longExplanation": "'~(으)리요' là vĩ tố kết thúc câu mang tính cổ phong hoặc văn chương trang trọng, cấu tạo từ vĩ tố phỏng đoán/ý chí '-리-' kết hợp với vĩ tố '-요'. Trong văn cảnh dự đoán, nó biểu thị sự phỏng đoán vững chắc, niềm tin vào khả năng xảy ra của một sự việc trong tương lai ('chắc chắn sẽ...', 'hẳn là...'). Dù ít xuất hiện trong khẩu ngữ hiện đại thông thường, lối diễn đạt này vẫn thường gặp trong văn học cổ điển, kịch bản lịch sử hoặc phong cách diễn ngôn mang tính văn phong tao nhã.",
    "formation": "Thân động từ/Tính từ có phụ âm cuối (trừ ㄹ) + 으리요 / Thân động từ/Tính từ không có phụ âm cuối hoặc có phụ âm cuối ㄹ + 리요",
    "examples": [
      {
        "translation": "Ngày mai chắc hẳn là trời sẽ mưa. Xin quý vị hãy mang sẵn ô theo nhé."
      },
      {
        "translation": "Vị ấy ắt hẳn là thích các món ăn ngon rồi, bởi vì người ấy là đầu bếp mà."
      },
      {
        "translation": "Bộ phim này chắc chắn sẽ thành công vang dội, bởi vì toàn bộ các diễn viên nổi tiếng đều tham gia."
      },
      {
        "translation": "Hôm nay xe buýt chắc hẳn sẽ bị trễ nhiều, bởi vì giao thông giờ đi làm rất phức tạp."
      }
    ]
  },
  "ko_마다_58": {
    "title": "~마다 (Mỗi, cứ mỗi, mọi...)",
    "shortExplanation": "Trợ từ kết hợp sau danh từ biểu thị sự việc diễn ra lặp đi lặp lại một cách đều đặn theo từng khoảng thời gian hoặc áp dụng đồng đều cho từng cá thể, đối tượng ('mỗi...', 'cứ mỗi...').",
    "longExplanation": "'~마다' là trợ từ (tiểu từ) gắn sau danh từ chỉ thời gian (như ngày, tuần, buổi sáng) hoặc danh từ thông thường để biểu thị ý nghĩa 'mỗi', 'cứ mỗi', 'từng'. Nó thể hiện một hành vi, trạng thái hay hiện tượng nào đó diễn ra định kỳ, đều đặn theo chu kỳ đó (như 'mỗi buổi sáng', 'cứ cuối tuần'), hoặc áp dụng không loại trừ cho mọi cá thể trong một tập hợp (như 'mỗi người', 'từng cái chai').",
    "formation": "Danh từ + 마다",
    "examples": [
      {
        "translation": "Tôi tập thể dục vào mỗi buổi sáng. Đó là một thói quen thực sự cần thiết cho sức khỏe."
      },
      {
        "translation": "Nơi này cứ vào giờ ăn trưa là lại đông nghẹt người nên rất khó tìm chỗ ngồi."
      },
      {
        "translation": "Mẹ tôi cứ mỗi cuối tuần là lại dọn dẹp tổng vệ sinh nhà cửa mà không hề nghỉ ngơi."
      },
      {
        "translation": "Trong túi xách, bên cạnh mỗi một bình nước đều có một gói đồ ăn vặt nhỏ."
      }
    ]
  },
  "ko_만_59": {
    "title": "~만 (Chỉ, chỉ riêng, duy nhất)",
    "shortExplanation": "Trợ từ hạn định gắn sau danh từ (hoặc đại từ) để biểu thị sự giới hạn duy nhất vào đối tượng đó, loại trừ tất cả các đối tượng khác ('chỉ...', 'chỉ riêng...').",
    "longExplanation": "'~만' là trợ từ hạn định phổ biến bậc nhất trong tiếng Hàn, tương đương với 'chỉ' trong tiếng Việt. Khi kết hợp với danh từ, đại từ hoặc tiểu từ khác, nó giới hạn phạm vi vào đúng sự vật hay đối tượng được nhắc đến và loại trừ toàn bộ những thứ còn lại. Trong câu, '~만' có thể thay thế các trợ từ chủ ngữ ('-이/가') hoặc trợ từ tân ngữ ('-을/를'), hoặc có thể đi kèm sau các trợ từ chỉ vị trí, thời gian ('-에만', '-에서만').",
    "formation": "Danh từ + 만",
    "examples": [
      {
        "translation": "Tôi chỉ uống cà phê thôi. Hoàn toàn không uống bất kỳ loại đồ uống nào khác."
      },
      {
        "translation": "Chỉ có mình tôi biết sự thật đó thôi. Những người khác dường như đều không biết."
      },
      {
        "translation": "Cuối tuần này tôi chỉ định nghỉ ngơi thôi. Tôi không định làm việc gì khác cả."
      },
      {
        "translation": "Anh ấy chỉ đi gặp bạn bè thôi chứ không hề gặp gia đình."
      }
    ]
  },
  "ko_만_60": {
    "title": "~만 하다 (Vừa đủ, thỏa đáng, vừa tầm, chỉ việc...)",
    "shortExplanation": "Cấu trúc biểu thị mức độ, kích thước hoặc trạng thái đạt mức vừa vặn, thỏa đáng, đủ điều kiện hoặc chỉ cần đáp ứng ở mức độ đó là phù hợp ('vừa đủ...', 'thỏa đáng', 'vừa tầm').",
    "longExplanation": "'~만 하다' được sử dụng theo nhiều nét nghĩa tinh tế trong tiếng Hàn: (1) Khi kết hợp sau danh từ, nó so sánh độ lớn hoặc mức độ tương đương ('bằng chừng ấy', 'đạt tầm'); (2) Khi đi với động từ (thường ở dạng '-기만 하다' hoặc liên kết với '-(으)ㄹ 만하다'), nó diễn tả trạng thái vừa khít, vừa vặn hoặc thỏa đáng để thực hiện một việc gì đó mà không cần thêm nữa. Nó thể hiện sự vừa đủ, thích hợp với một điều kiện nhất định.",
    "formation": "Thân động từ/Tính từ + 만 하다 (hoặc -기만 하다 / -(으)ㄹ 만하다), Danh từ + 만 하다",
    "examples": [
      {
        "translation": "Tôi nghĩ lượng chừng này là vừa đủ rồi. Không cần thêm nữa đâu."
      },
      {
        "translation": "Khi thức ăn quá nóng, bạn có thể cho thêm nước vào để vừa tầm ăn được."
      },
      {
        "translation": "Vì đã ôn thi đầy đủ rồi nên hôm nay chỉ cần nghỉ ngơi là vừa thỏa đáng."
      },
      {
        "translation": "Bản nhạc này êm dịu đến mức không hề gây phân tâm, nên vừa làm việc vừa nghe là vừa hay."
      }
    ]
  },
  "ko_만큼_61": {
    "title": "~만큼 (Bằng, như, chừng nào... chừng nấy, đến mức)",
    "shortExplanation": "Trợ từ hoặc danh từ phụ thuộc biểu thị mức độ, số lượng hoặc trạng thái tương đương với đối tượng làm chuẩn được nêu ra trước đó ('bằng với...', 'đến mức...', 'bao nhiêu... bấy nhiêu').",
    "longExplanation": "'~만큼' là từ tố chỉ mức độ tương đương rất phổ biến trong tiếng Hàn. Khi đứng sau danh từ, nó đóng vai trò là trợ từ (tiểu từ); khi đứng sau các vĩ tố định từ (-(으)ㄴ, -는, -(으)ㄹ), nó đóng vai trò là danh từ phụ thuộc. Cấu trúc này diễn đạt sự so sánh ngang bằng hoặc tỉ lệ thuận: mức độ của hành động/trạng thái ở vế sau tương xứng hoàn toàn với chuẩn mực được đặt ra ở vế trước.",
    "formation": "Danh từ + 만큼, Thân động từ/Tính từ + -(으)ㄴ/는/(으)ㄹ 만큼",
    "examples": [
      {
        "translation": "Anh ấy muốn nhận được mức thù lao tương xứng với năng lực thực sự của mình."
      },
      {
        "translation": "Bạn nỗ lực bao nhiêu thì kết quả sẽ đi theo bấy nhiêu."
      },
      {
        "translation": "Cô ấy có thể hát hay chẳng kém gì người khác."
      },
      {
        "translation": "Món ăn này ngon đúng như vẻ ngoài bắt mắt của nó."
      }
    ]
  },
  "ko_며면서_62": {
    "title": "~며 / ~면서 (Vừa... vừa..., đồng thời, trong khi...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị hai hành động hoặc trạng thái diễn ra đồng thời cùng một lúc ('vừa... vừa...'), hoặc kết nối liệt kê hai sự việc cùng tồn tại song song.",
    "longExplanation": "'~며' và '~면서' (khi có phụ âm cuối dùng '-으며 / -으면서') là các vĩ tố liên kết phổ biến diễn tả sự đồng thời. Điểm đặc trưng là chủ ngữ của cả hai mệnh đề phải là một cá thể đang thực hiện hai hành vi cùng một lúc ('vừa nghe nhạc vừa đọc sách'). Ngoài ra, cấu trúc này còn có thể dùng để liệt kê hai tư cách, hai đặc tính của cùng một chủ thể (như 'vừa là giáo viên vừa là nhà văn').",
    "formation": "Thân động từ/Tính từ (có phụ âm cuối: -으며 / -으면서; không có phụ âm cuối: -며 / -면서)",
    "examples": [
      {
        "translation": "Khi về nhà, tôi vừa nghe nhạc vừa kiểm tra tin nhắn."
      },
      {
        "translation": "Trước khi nhập học, tôi vừa chăm chỉ học tập lại vừa tích cực tham gia các hoạt động khác."
      },
      {
        "translation": "Tôi thích vừa xem phim vừa ăn bắp rang bơ."
      },
      {
        "translation": "Tôi thuộc tuýp người vừa tập thể dục vừa xem thời sự. Đồng thời tôi cũng tìm kiếm thêm thông tin sức khỏe."
      }
    ]
  },
  "ko_면_63": {
    "title": "~면 (Nếu, hễ... thì, khi...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị điều kiện tiền đề hoặc giả định; nếu mệnh đề trước xảy ra thì mệnh đề sau sẽ được thực hiện ('nếu...', 'hễ... thì...').",
    "longExplanation": "'-(으)면' là vĩ tố chỉ điều kiện nền tảng và căn bản nhất trong ngữ pháp tiếng Hàn. Nó gắn sau thân động từ hoặc tính từ để tạo thành mệnh đề điều kiện: nếu nội dung ở vế trước được đáp ứng hay xảy ra, thì vế sau sẽ diễn ra như một hệ quả tất yếu, một dự định hoặc một lời khuyên. Cấu trúc này dùng cho các tình huống giả định thực tế, quy luật tự nhiên, hoặc thói quen có tính lặp lại.",
    "formation": "Thân động từ/Tính từ (có phụ âm cuối: -으면 / không có phụ âm cuối: -면), Danh từ + (이)면",
    "examples": [
      {
        "translation": "Ngày mai nếu trời mưa, chúng tôi sẽ không đi ra công viên đâu."
      },
      {
        "translation": "Nếu thấy nhớ người ấy thì bạn hãy gọi điện thoại đi."
      },
      {
        "translation": "Nếu học tập chăm chỉ thì bạn hoàn toàn có thể thi đỗ."
      },
      {
        "translation": "Nếu lỡ chuyến xe buýt cuối cùng thì chúng ta phải bắt taxi thôi."
      }
    ]
  },
  "ko_면_64": {
    "title": "~면 어때(요) (Hay là... xem sao?, Nếu... thì thấy thế nào?)",
    "shortExplanation": "Cấu trúc dùng để đưa ra một gợi ý, đề xuất nhẹ nhàng hoặc thăm dò ý kiến, phản ứng của đối phương về một phương án hành động ('nếu... thì thế nào?').",
    "longExplanation": "'~면 어때(요)' là sự kết hợp giữa vĩ tố điều kiện '-면' và từ nghi vấn '어때' (thế nào). Cấu trúc này dùng trong giao tiếp thường nhật để đề xuất một hành động, giải pháp thay thế hoặc một ý tưởng mới một cách mềm mỏng, không áp đặt, đồng thời tôn trọng và hỏi ý kiến của người nghe xem họ cảm thấy phương án đó ra sao.",
    "formation": "Thân động từ/Tính từ (có phụ âm cuối: -으면 / không có phụ âm cuối: -면) + 어때(요)",
    "examples": [
      {
        "translation": "Thời tiết đẹp thế này, hay là chúng mình ra công viên chơi đi?"
      },
      {
        "translation": "Trông bạn có vẻ nhiều lo lắng quá. Hay là tạm thời đến phòng tập thể dục vận động một chút xem sao?"
      },
      {
        "translation": "Bạn bảo không có thời gian ư? Vậy thì gọi đồ ăn giao tận nơi xem thế nào?"
      },
      {
        "translation": "Vấn đề này giải quyết theo cách này thì thấy thế nào?"
      }
    ]
  },
  "ko_면서도_65": {
    "title": "~면서도 (Mặc dù... nhưng lại..., ấy thế mà vẫn...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị sự tương phản, mâu thuẫn giữa hai sự việc; dù vế trước đang diễn ra nhưng vế sau lại tồn tại một hành động hoặc trạng thái trái ngược ('mặc dù... nhưng vẫn...').",
    "longExplanation": "'~면서도' là sự kết hợp giữa vĩ tố đồng thời '-면서' và trợ từ nhấn mạnh '-도' (cũng). Cấu trúc này dùng khi hai sự thật cùng đồng thời tồn tại trên một chủ thể, nhưng giữa chúng lại có sự đối lập, nghịch lý hoặc khó hiểu so với lẽ thông thường. Nó nhấn mạnh sự ngạc nhiên hoặc cảm thán trước sự cùng tồn tại của hai vế đối nghịch nhau.",
    "formation": "Thân động từ/Tính từ (có phụ âm cuối: -으면서도 / không có phụ âm cuối: -면서도), Danh từ + (이)면서도",
    "examples": [
      {
        "translation": "Thật đáng ngạc nhiên là cô ấy vừa đi làm lại vừa tiếp tục việc học ở trường, ấy thế mà thành tích học tập lúc nào cũng xuất sắc."
      },
      {
        "translation": "Bộ phim này tuy được thực hiện một cách gian nan, nhưng nội dung vừa thú vị lại vừa mang tính giáo dục sâu sắc."
      },
      {
        "translation": "Dù ngày nào cũng phải tăng ca nhưng anh ấy vẫn duy trì được sức khỏe và lúc nào cũng tràn đầy năng lượng."
      },
      {
        "translation": "Mặc dù đang là mùa đông nhưng thời tiết lại ấm áp, rất thích hợp cho các hoạt động ngoài trời."
      }
    ]
  },
  "ko_밖에_66": {
    "title": "~밖에 (Chỉ..., ngoài... ra không còn)",
    "shortExplanation": "Trợ từ hạn định luôn đi kèm với vị từ phủ định (như 없다, 모르다, 안, 못), biểu thị rằng ngoài đối tượng được nhắc đến thì không còn bất kỳ sự lựa chọn nào khác ('chỉ...', 'ngoài... ra không').",
    "longExplanation": "'~밖에' là trợ từ hạn định mang tính phủ định trong tiếng Hàn. Khác với '~만' (có thể đi với câu khẳng định), '~밖에' bắt buộc phải kết hợp với động từ hoặc tính từ mang hình thức phủ định (như '안', '못', '없다', '모르다'). Ý nghĩa gốc là 'ở bên ngoài của X thì không có gì', từ đó nhấn mạnh ý niệm rằng đối tượng đó là lựa chọn duy nhất, không còn phương án hay sự vật nào khác nữa.",
    "formation": "Danh từ + 밖에 + Vị từ phủ định (안 / 못 / 없다 / 모르다...)",
    "examples": [
      {
        "translation": "Tôi chỉ uống cà phê thôi. Vì tôi không có nhu cầu uống các loại đồ uống khác."
      },
      {
        "translation": "Để chuẩn bị cho kỳ thi này hình như chỉ có mỗi mình tôi. Những người khác chẳng ai chuẩn bị cả."
      },
      {
        "translation": "Cô ấy chỉ nhớ mỗi ngày sinh nhật của mình thôi. Nghe nói mọi ngày quan trọng khác cô ấy đều quên hết rồi."
      },
      {
        "translation": "Tôi chỉ ăn mỗi bánh pizza. Các món ăn khác chẳng ngon chút nào."
      }
    ]
  },
  "ko_부터_67": {
    "title": "~부터 (Từ, bắt đầu từ)",
    "shortExplanation": "Trợ từ biểu thị điểm khởi đầu, điểm xuất phát về mặt thời gian, thứ tự hoặc vị trí không gian của một hành động hay trạng thái ('từ...', 'bắt đầu từ...').",
    "longExplanation": "'~부터' là trợ từ chỉ khởi điểm rất quan trọng trong tiếng Hàn, tương đương với 'từ' trong tiếng Việt. Khi kết hợp với các danh từ chỉ thời gian (như hôm nay, tuần này, 9 giờ) hoặc thứ tự (như việc này, số 1), nó xác định chính xác thời điểm hoặc mốc bắt đầu diễn ra sự việc. Khi nói về không gian (nơi chốn), '~부터' cũng có thể được dùng, thường đi kèm thành cặp với '~까지' (đến).",
    "formation": "Danh từ + 부터",
    "examples": [
      {
        "translation": "Tôi đi làm từ 7 giờ sáng."
      },
      {
        "translation": "Tôi dự định lên kế hoạch cho chuyến du lịch bắt đầu từ cuối tuần này."
      },
      {
        "translation": "Đi bằng tàu hỏa từ Seoul đến Busan mất mấy tiếng đồng hồ vậy?"
      },
      {
        "translation": "Tôi đã bắt đầu đem lòng yêu mến đất nước Hàn Quốc từ năm 2012."
      }
    ]
  },
  "ko_부터_68": {
    "title": "~부터 ~까지 (Từ... đến..., từ... cho tới...)",
    "shortExplanation": "Cấu trúc biểu thị phạm vi trọn vẹn từ điểm khởi đầu cho đến điểm kết thúc về mặt thời gian, không gian hoặc số lượng ('từ... đến...').",
    "longExplanation": "'~부터 ~까지' là cấu trúc kết hợp biểu thị một khoảng phạm vi hoàn chỉnh: '~부터' đánh dấu khởi điểm bắt đầu, còn '~까지' đánh dấu đích đến hoặc giới hạn kết thúc. Cấu trúc này thường được dùng rộng rãi cho thời gian (từ mấy giờ đến mấy giờ), phạm vi số lượng (từ 1 đến 10), và cả không gian địa lý (từ đâu đến đâu). Lưu ý rằng đối với địa điểm thuần túy, người Hàn cũng hay dùng cặp '~에서 ~까지'.",
    "formation": "Danh từ 1 + 부터 + Danh từ 2 + 까지",
    "examples": [
      {
        "translation": "Tôi làm việc từ 8 giờ sáng cho đến 6 giờ tối."
      },
      {
        "translation": "Tôi đã đi bộ từ nhà bạn tôi đến tận trường học."
      },
      {
        "translation": "Bạn hãy thử đếm từ 1 đến 10 xem nào."
      },
      {
        "translation": "Tôi định sẽ đi du lịch từ cuối tuần này cho tới cuối tuần sau."
      }
    ]
  },
  "ko_사이_69": {
    "title": "~사이 (Giữa, khoảng giữa, mối quan hệ giữa...)",
    "shortExplanation": "Danh từ chỉ khoảng cách không gian hoặc thời gian nằm ở giữa hai đối tượng, hoặc chỉ mối quan hệ tương hỗ tình cảm giữa người với người ('ở giữa...', 'mối quan hệ giữa...').",
    "longExplanation": "'사이' là danh từ đa nghĩa có thể dùng để diễn đạt: (1) Khoảng cách không gian hoặc khoảng thời gian nằm xen giữa hai mốc xác định (thường có trợ từ '-에' theo sau: 'giữa sáng và trưa'); (2) Mối quan hệ, tình cảm giao hảo giữa hai người hoặc hai tập thể (như 'saiga jota' - quan hệ tốt, hòa thuận; 'saiga an jota' - quan hệ bất hòa). Cấu trúc thường gặp là 'A와/과 B 사이' hoặc 'Danh từ + 사이'.",
    "formation": "Danh từ 1 + 와/과 + Danh từ 2 + 사이 / Danh từ + 사이",
    "examples": [
      {
        "translation": "Khoảng cách giữa Seoul và Busan là khoảng 325 km."
      },
      {
        "translation": "Dạo này mối quan hệ giữa tôi và người bạn ấy không được tốt, nên chúng tôi không liên lạc với nhau."
      },
      {
        "translation": "Việc ăn nhẹ vào khoảng giữa bữa sáng và bữa trưa là rất quan trọng."
      },
      {
        "translation": "Trong suốt dịp cuối tuần, mối quan hệ giữa tôi và bố mẹ đã trở nên tốt đẹp hơn rất nhiều."
      }
    ]
  },
  "ko_세요_70": {
    "title": "~세요 (Hãy..., xin hãy..., hãy cùng...)",
    "shortExplanation": "Vĩ tố kết thúc câu kính ngữ thân mật dùng để yêu cầu, mệnh lệnh một cách lịch sự, nhã nhặn ('xin hãy...'), hoặc rủ rê, khuyên bảo đối phương một cách tôn trọng.",
    "longExplanation": "'-(으)세요' là sự kết hợp giữa vĩ tố kính ngữ chủ thể '-(으)시-' và vĩ tố kết thúc câu thân mật '-어요'. Nó được sử dụng cực kỳ rộng rãi trong giao tiếp lịch sự thường nhật để: (1) Đưa ra lời yêu cầu, mệnh lệnh hoặc hướng dẫn lịch thiệp đối với đối phương ('xin vui lòng...', 'hãy...'); (2) Đưa ra lời mời mọc, đề xuất thân thiện ('hãy cùng đi nhé'). Vì có chứa yếu tố kính ngữ nên cấu trúc này thể hiện sự tôn trọng tối đa đối với người nghe.",
    "formation": "Thân động từ (có phụ âm cuối: -으세요 / không có phụ âm cuối: -세요)",
    "examples": [
      {
        "translation": "Làm ơn hãy giữ trật tự giùm, ở đây có nhiều người đang học bài lắm."
      },
      {
        "translation": "Hãy cùng đi ăn trưa nhé. Tôi biết một quán ăn rất ngon đấy."
      },
      {
        "translation": "Bây giờ bạn hãy tập trung học đi. Kỳ thi chẳng còn bao lâu nữa đâu."
      },
      {
        "translation": "Xin hãy đi theo tôi. Tôi sẽ dẫn đường để bạn không bị lạc."
      }
    ]
  },
  "ko_아어_71": {
    "title": "~아/어 보다 (Thử làm..., thử nghiệm...)",
    "shortExplanation": "Cấu trúc bổ trợ biểu thị việc người nói thử thực hiện một hành động nào đó để xem kết quả ra sao ('thử làm...'), hoặc dùng để diễn tả trải nghiệm.",
    "longExplanation": "'~아/어 보다' là cấu trúc kết hợp giữa vĩ tố liên kết '-아/어' và trợ động từ '보다' (nhìn/xem). Nghĩa cơ bản của cấu trúc này là thực hiện một hành vi mang tính thăm dò, thử nghiệm xem trải nghiệm đó ra sao (tương đương với 'thử... xem sao' trong tiếng Việt). Ngoài ra, khi dùng ở thì quá khứ ('-아/어 봤다'), nó còn mang nghĩa diễn tả kinh nghiệm từng trải qua trong đời.",
    "formation": "Thân động từ (nguyên âm dương ㅏ/ㅗ: -아 보다; các nguyên âm khác: -어 보다; 하다 -> 해 보다)",
    "examples": [
      {
        "translation": "Tôi định thử học tiếng Hàn xem sao, có vẻ như sẽ rất thú vị đấy."
      },
      {
        "translation": "Bây giờ tôi định thử ăn thịt xem thế nào, tôi tò mò không biết nó có mùi vị ra sao."
      },
      {
        "translation": "Tôi đã quyết định thử sức với công việc mới này, tôi nghĩ việc thử thách bản thân là một điều rất tốt."
      },
      {
        "translation": "Hôm nay tôi đã thử tham gia chuyến tham quan có hướng dẫn viên đầu tiên, và đó là một trải nghiệm vô cùng thú vị."
      }
    ]
  },
  "ko_아어_72": {
    "title": "~아/어 버리다 (Lỡ... mất rồi, xong xuôi hết cả)",
    "shortExplanation": "Cấu trúc bổ trợ biểu thị một hành động đã hoàn tất hoàn toàn, dứt điểm; thường mang sắc thái tiếc nuối, hối tiếc ('lỡ... mất rồi') hoặc trút bỏ nhẹ nhõm ('xong xuôi hết').",
    "longExplanation": "'~아/어 버리다' là cấu trúc kết hợp giữa vĩ tố liên kết '-아/어' và trợ động từ '버리다' (vứt bỏ). Cấu trúc này biểu thị một hành vi đã kết thúc triệt để không còn gì vương lại. Về mặt cảm xúc, nó thường mang hai sắc thái tâm lý rõ rệt: (1) Thể hiện sự tiếc nuối, xót xa, buồn bã vì việc ngoài ý muốn đã lỡ xảy ra ('đánh rơi mất', 'lỡ nói ra mất rồi'); (2) Thể hiện sự nhẹ nhõm, thanh thản vì đã giải quyết dứt điểm một gánh nặng ('làm xong phăng hết cả bài tập').",
    "formation": "Thân động từ (nguyên âm dương ㅏ/ㅗ: -아 버리다; các nguyên âm khác: -어 버리다; 하다 -> 해 버리다)",
    "examples": [
      {
        "translation": "Tôi đã làm xong hết bài tập về nhà quá nhanh, bây giờ chẳng còn gì để làm nữa cả."
      },
      {
        "translation": "Hôm qua đội bóng của chúng tôi bị thua trong trận đấu nên tôi đã bị các đồng nghiệp trong công ty chê cười trêu chọc."
      },
      {
        "translation": "Người bạn ấy đã lỡ buông lời nói dối để trêu tôi, vì thế mà tâm trạng tôi chẳng vui chút nào."
      },
      {
        "translation": "Buổi sáng tôi đã lỡ xuất phát quá sớm, nhưng vì tắc đường nên đã phải chôn chân rất nhiều thời gian trên đường."
      }
    ]
  },
  "ko_아어_73": {
    "title": "~아/어 다니다 (Đi lại làm gì, thường xuyên lui tới làm gì, đi loanh quanh làm gì)",
    "shortExplanation": "Vĩ tố kết hợp trợ động từ '다니다' biểu thị hành động diễn ra lặp đi lặp lại hoặc vừa di chuyển khắp nơi vừa thực hiện hành động đó ('đi lại làm gì', 'chuyên đi làm gì').",
    "longExplanation": "'~아/어 다니다' là cấu trúc kết hợp giữa vĩ tố liên kết '-아/어' và động từ '다니다' (đi lại, lui tới thường xuyên). Cấu trúc này dùng để diễn đạt chủ ngữ vừa di chuyển qua lại nhiều nơi vừa thực hiện một hành động nào đó, hoặc duy trì một thói quen thường xuyên đến các địa điểm để làm việc gì (như 찾아다니다 - đi tìm kiếm khắp nơi, 돌아다니다 - đi loanh quanh, 뛰어다니다 - chạy lăng xăng). Nếu nguyên âm cuối của thân động từ là 'ㅏ, ㅗ' thì kết hợp với '-아 다니다', các nguyên âm còn lại kết hợp với '-어 다니다', '하다' chuyển thành '해 다니다'.",
    "formation": "Thân động từ (nguyên âm ㅏ, ㅗ: -아 다니다 / nguyên âm khác: -어 다니다 / 하다: -해 다니다)",
    "examples": [
      {
        "translation": "Sau giờ học, tôi cùng bạn bè đi loanh quanh khắp nơi vui chơi."
      },
      {
        "translation": "Mỗi dịp ngày nghỉ, cô ấy lại đi khắp nơi tìm các quán ăn ngon."
      },
      {
        "translation": "Chú cún con nhà chúng tôi chạy lăng xăng quanh nhà đùa nghịch."
      },
      {
        "translation": "Dạo này tôi hay đi tìm các quán cà phê mới để thưởng thức cà phê."
      }
    ]
  },
  "ko_아어_74": {
    "title": "~아/어 두다 (Làm sẵn để đó, giữ nguyên trạng thái)",
    "shortExplanation": "Trợ động từ biểu thị việc thực hiện xong một hành động rồi duy trì hoặc giữ nguyên trạng thái kết quả đó cho mục đích sau này ('làm sẵn để đó', 'để nguyên').",
    "longExplanation": "'~아/어 두다' là cấu trúc kết hợp vĩ tố '-아/어' với động từ bổ trợ '두다'. Cấu trúc này diễn tả hành động đã hoàn tất và kết quả hay trạng thái của hành động đó được cố ý giữ nguyên nhằm phục vụ cho một tình huống hoặc sự việc trong tương lai. So với '~아/어 놓다' (thường nhấn mạnh vào trạng thái hiện có trước mắt), '~아/어 두다' có xu hướng nhấn mạnh việc lưu giữ hoặc để nguyên trạng thái trong một khoảng thời gian dài hơn để chuẩn bị cho tương lai.",
    "formation": "Thân động từ (nguyên âm ㅏ, ㅗ: -아 두다 / nguyên âm khác: -어 두다 / 하다: -해 두다)",
    "examples": [
      {
        "translation": "Tôi đã để cửa sổ mở sẵn, vì thế tôi nghĩ không khí sẽ thoáng hơn."
      },
      {
        "translation": "Anh ấy đã để cuốn sách sẵn trên bàn để lát nữa có thể đọc lại."
      },
      {
        "translation": "Tôi đã ngắt điện thoại để đó, vì cuộc trò chuyện quá mức khó xử."
      },
      {
        "translation": "Tôi đã để ấm trà cạnh chiếc lò sưởi đang cháy để giữ cho trà luôn ấm."
      }
    ]
  },
  "ko_아어_75": {
    "title": "~아/어 놓다 (Làm sẵn, làm trước để đó)",
    "shortExplanation": "Trợ động từ biểu thị việc làm sẵn một hành động trước để chuẩn bị cho việc gì đó và trạng thái kết quả của hành động vẫn đang được duy trì ('làm sẵn...', 'chuẩn bị sẵn...').",
    "longExplanation": "'~아/어 놓다' kết hợp vĩ tố '-아/어' với động từ bổ trợ '놓다'. Cấu trúc này diễn tả hành động đã được tiến hành trước để hoàn tất một sự chuẩn bị, đồng thời trạng thái kết quả của hành động đó vẫn còn lưu lại ở hiện tại. Cấu trúc thường đi kèm các phó từ chỉ sự chuẩn bị trước như '미리' (trước), '먼저' (trước tiên). So với '-아/어 두다', '-아/어 놓다' nhấn mạnh mạnh mẽ vào tính chuẩn bị trước và kết quả hiện hữu rõ ràng trước mắt.",
    "formation": "Thân động từ (nguyên âm ㅏ, ㅗ: -아 놓다 / nguyên âm khác: -어 놓다 / 하다: -해 놓다)",
    "examples": [
      {
        "translation": "Để chuẩn bị cho bữa sáng ngày mai, tối nay tôi đã nấu cơm sẵn rồi."
      },
      {
        "translation": "Trước khi bắt đầu cuộc họp, chúng tôi phải chuẩn bị sẵn bài thuyết trình trước."
      },
      {
        "translation": "Trước khi đi du lịch, chúng tôi đã đóng gói sẵn hành lý."
      },
      {
        "translation": "Trước khi em tôi đến, tôi đã dọn dẹp phòng sẵn sàng rồi."
      }
    ]
  },
  "ko_아어야_76": {
    "title": "~아/어야 되다/하다 (Phải, cần phải)",
    "shortExplanation": "Cấu trúc biểu thị nghĩa vụ, bổn phận hoặc tính tất yếu không thể không làm ('phải...', 'cần phải...').",
    "longExplanation": "'~아/어야 되다/하다' là cấu trúc kết hợp vĩ tố điều kiện thiết yếu '-아/어야' với động từ '하다' hoặc '되다'. Cấu trúc này dùng để diễn đạt sự bắt buộc, nhiệm vụ hoặc điều kiện tiên quyết cần được thực hiện để đạt được một kết quả nào đó. '-아/어야 하다' mang tính chất bổn phận, quy chuẩn hoặc quyết tâm chủ quan, trong khi '-아/어야 되다' thường mang sắc thái tự nhiên, khách quan hoặc áp lực quy tắc xã hội nhiều hơn.",
    "formation": "Thân động từ / Thân tính từ (nguyên âm ㅏ, ㅗ: -아야 하다/되다 / nguyên âm khác: -어야 하다/되다 / 하다: -해야 하다/되다)",
    "examples": [
      {
        "translation": "Tôi phải đến trường vào lúc 8 giờ, nếu đi muộn thì sẽ là rắc rối lớn đấy."
      },
      {
        "translation": "Để giải quyết vấn đề này, chúng ta phải bắt đầu lại từ đầu."
      },
      {
        "translation": "Để không bị muộn, tôi phải bắt xe buýt."
      },
      {
        "translation": "Để tâm trạng trở nên tốt hơn thì phải tập thể dục."
      }
    ]
  },
  "ko_아어지다_77": {
    "title": "~아/어지다 (Trở nên, trở thành, dần dần...)",
    "shortExplanation": "Gắn sau thân tính từ để biểu thị sự biến đổi dần dần về trạng thái hoặc tính chất theo thời gian ('trở nên...', 'dần trở thành...').",
    "longExplanation": "'~아/어지다' kết hợp vĩ tố '-아/어' với trợ động từ '지다'. Cấu trúc này thường gắn vào thân tính từ để diễn tả quá trình thay đổi trạng thái, tính chất từ mức độ này sang mức độ khác (như 좋아지다 - trở nên tốt hơn, 행복해지다 - trở nên hạnh phúc hơn, 예뻐지다 - trở nên xinh đẹp hơn). Khi kết hợp với một số ngoại động từ, nó còn có thể tạo thành thể bị động biểu thị hành động tự phát sinh.",
    "formation": "Thân tính từ (nguyên âm ㅏ, ㅗ: -아지다 / nguyên âm khác: -어지다 / 하다: -해지다)",
    "examples": [
      {
        "translation": "Mỗi lần nghe thấy cái tên ấy là tâm trạng cô ấy lại trở nên vui vẻ, cái tên đó gợi cho cô ấy những ký ức hạnh phúc."
      },
      {
        "translation": "Khi tâm trí dần ổn định, tôi bắt đầu cảm thấy bản thân trở nên hạnh phúc hơn rất nhiều."
      },
      {
        "translation": "Mọi người đều đạt được những điều mình mong muốn và trở nên giàu có."
      },
      {
        "translation": "Theo thời gian cô ấy đã trở nên vô cùng chín chắn, những trải nghiệm đã rèn luyện cô ấy trở nên mạnh mẽ hơn."
      }
    ]
  },
  "ko_아서어서_78": {
    "title": "~아서/어서 (Vì... nên..., rồi thì)",
    "shortExplanation": "Vĩ tố liên kết biểu thị nguyên nhân, lý do của sự việc ở vế sau ('vì... nên...') hoặc sự tiếp nối trình tự hành động chặt chẽ ('rồi thì...').",
    "longExplanation": "'~아서/어서' là một trong những vĩ tố liên kết cơ bản và thông dụng nhất trong tiếng Hàn. Cấu trúc có hai chức năng chính: (1) Biểu thị nguyên nhân, lý do cho sự việc phát sinh ở vế sau ('vì trời mưa nên ở nhà'); (2) Biểu thị trình tự thời gian liên tiếp giữa hai hành động có quan hệ mật thiết với nhau của cùng một chủ ngữ ('đến thư viện rồi mượn sách'). Lưu ý: vế trước của '-아서/어서' không bao giờ chia thì quá khứ (-았/었-) hay tương lai (-겠-), và vế sau không được dùng trong câu mệnh lệnh (-으세요) hay thỉnh dụ (-자, -(으)ㅂ시다).",
    "formation": "Thân động từ / Thân tính từ (nguyên âm ㅏ, ㅗ: -아서 / nguyên âm khác: -어서 / 하다: -해서)",
    "examples": [
      {
        "translation": "Vì bị đau bụng nên tôi đã không thể đi học được."
      },
      {
        "translation": "Vì có đám cưới nên tôi đã lên Seoul để gặp anh ấy."
      },
      {
        "translation": "Trời trong xanh nên các vì sao nhìn thấy rất rõ."
      },
      {
        "translation": "Vì cô ấy mỉm cười nên tâm trạng của tôi cũng trở nên vui vẻ."
      }
    ]
  },
  "ko_았었다가_79": {
    "title": "~았/었다가 (Làm... xong rồi thì, vừa mới... thì lại...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị một hành động trong quá khứ đã kết thúc hoàn toàn thì một tình huống khác, chuyển biến mới hoặc kết quả bất ngờ xảy ra ('đã làm... rồi thì...').",
    "longExplanation": "'~았/었다가' là cấu trúc kết hợp vĩ tố thì quá khứ '-았/었-' với vĩ tố chuyển tiếp '-다가'. Cấu trúc này dùng để diễn đạt một hành động ở vế trước đã được thực hiện và hoàn tất xong xuôi, nhưng ngay sau đó trạng thái bị thay đổi, chuyển hướng hoặc dẫn tới một kết quả khác hẳn, bất ngờ ngoài dự kiến ở vế sau. Khác với '-다가' đơn thuần (hành động đang dở dang thì bị ngắt quãng), '-았/었다가' đòi hỏi hành động vế trước phải hoàn thành trọn vẹn trước khi sự việc mới ập đến hoặc bị đảo ngược.",
    "formation": "Thân động từ + 았/었다가 (nguyên âm ㅏ, ㅗ: -았다가 / nguyên âm khác: -었다가 / 하다: -했다가)",
    "examples": [
      {
        "translation": "Tôi vừa uống một ly cà phê nóng xong thì bỗng nhiên bị đau bụng nên phải đi bệnh viện."
      },
      {
        "translation": "Cậu ấy chơi bóng đá xong thì bị ngã đau."
      },
      {
        "translation": "Tôi xem phim được một lúc xong rồi ngủ quên mất, vì vậy tôi chẳng biết kết phim thế nào."
      },
      {
        "translation": "Tôi vừa học bài xong thì bạn tôi lại đến thư viện rủ chơi."
      }
    ]
  },
  "ko_았었던_80": {
    "title": "~았/었던 (Đã từng, từng là, nơi mà từng...)",
    "shortExplanation": "Vĩ tố định ngữ hồi tưởng thì quá khứ, dùng để bổ nghĩa cho danh từ đi sau về một sự việc, hành vi hay trạng thái đã hoàn tất trong quá khứ và nay không còn nữa ('đã từng...', 'từng là...').",
    "longExplanation": "'~았/었던' là cấu trúc định ngữ kết hợp vĩ tố thì quá khứ '-았/었-' với vĩ tố hồi tưởng '-던'. Cấu trúc này dùng để hồi tưởng lại một sự việc, trạng thái đã từng xảy ra và kết thúc hoàn toàn trong quá khứ, nhấn mạnh sự gián đoạn so với hiện tại (tức hiện tại sự việc hoặc trạng thái đó đã thay đổi hoặc không còn tiếp diễn nữa). So với '-던' thuần túy (nhấn mạnh thói quen hoặc hành động chưa kết thúc trong quá khứ), '~았/었던' nhấn mạnh sự việc đã kết thúc trọn vẹn trong quá khứ.",
    "formation": "Thân động từ / Thân tính từ + 았/었던 (nguyên âm ㅏ, ㅗ: -았던 / nguyên âm khác: -었던 / 하다: -했던)",
    "examples": [
      {
        "translation": "Nơi này từng luôn chật kín người mà giờ đây lại hoàn toàn trống vắng."
      },
      {
        "translation": "Công viên mà chúng ta từng thường xuyên chơi đùa khi xưa giờ không còn nữa."
      },
      {
        "translation": "Cuốn sách mà cậu từng tìm kiếm bấy lâu nay đã được bán hết sạch rồi."
      },
      {
        "translation": "Ngôi nhà mà tôi từng sinh sống ngày xưa giờ đã có người khác đến ở."
      }
    ]
  },
  "ko_았었으면_81": {
    "title": "~았/었으면 좋겠다 (Ước gì, giá mà... thì tốt biết mấy)",
    "shortExplanation": "Cấu trúc biểu đạt niềm hy vọng, mong ước chân thành của người nói về một sự việc trong tương lai hoặc sự tiếc nuối về một điều trong quá khứ ('ước gì...', 'giá mà... thì tốt').",
    "longExplanation": "'~았/었으면 좋겠다' kết hợp vĩ tố thì quá khứ '-았/었-', vĩ tố điều kiện giả định '-(으)면' và vị ngữ '좋겠다' (thì tốt biết mấy). Cấu trúc này dùng để diễn đạt ước nguyện, nguyện vọng tha thiết của người nói đối với một sự việc chưa xảy ra trong tương lai hoặc chưa thành hiện thực ở hiện tại. Ngoài ra, khi nói về việc trong quá khứ, nó cũng có thể biểu thị sự tiếc nuối giả định (giá như lúc đó đã...).",
    "formation": "Thân động từ / Thân tính từ + 았/었으면 좋겠다 (nguyên âm ㅏ, ㅗ: -았으면 좋겠다 / nguyên âm khác: -었으면 좋겠다 / 하다: -했으면 좋겠다)",
    "examples": [
      {
        "translation": "Ước gì ngày mai thời tiết đẹp. Tôi rất muốn ra biển chơi mà lần nào cũng bị mưa nên chẳng đi được."
      },
      {
        "translation": "Ước gì tôi có thể nấu những món ăn ngon thật khéo. Tôi rất muốn tự tay nấu đồ ăn ngon cho bạn bè."
      },
      {
        "translation": "Hy vọng tôi sẽ đạt điểm cao trong kỳ thi TOPIK, vì tôi đã học hành rất chăm chỉ."
      },
      {
        "translation": "Giá như cuối tuần vừa rồi tôi được nghỉ ngơi nhiều hơn một chút. Bây giờ tôi thấy mệt mỏi quá."
      }
    ]
  },
  "ko_았었지만_82": {
    "title": "~았/었지만 (Đã... nhưng mà, tuy đã... nhưng)",
    "shortExplanation": "Vĩ tố liên kết biểu thị sự tương phản, đối lập giữa hành động hoặc trạng thái đã xảy ra trong quá khứ ở vế trước với kết quả ở vế sau ('tuy đã... nhưng mà...').",
    "longExplanation": "'~았/었지만' là sự kết hợp giữa vĩ tố thì quá khứ '-았/었-' và vĩ tố tương phản '-지만'. Cấu trúc này dùng để nối hai mệnh đề trái ngược nhau, trong đó vế trước nêu lên một sự việc hay hành động đã diễn ra trong quá khứ, nhưng vế sau lại dẫn đến một kết quả trái ngược, không như mong đợi hoặc đối lập hoàn toàn với tiền đề đã nêu.",
    "formation": "Thân động từ / Thân tính từ + 았/었지만 (nguyên âm ㅏ, ㅗ: -았지만 / nguyên âm khác: -었지만 / 하다: -했지만)",
    "examples": [
      {
        "translation": "Tôi đã học bài rất nhiều nhưng vẫn bị thi trượt."
      },
      {
        "translation": "Bạn tôi đã đưa thiệp mời nhưng tôi lại không thể đến tham dự bữa tiệc."
      },
      {
        "translation": "Thời tiết hôm đó rất đẹp nhưng tôi chỉ nằm ngủ suốt ở nhà."
      },
      {
        "translation": "Dù tôi đã giải thích cặn kẽ thế nào đi nữa nhưng anh ấy vẫn không thể hiểu được."
      }
    ]
  },
  "ko_았었지요_83": {
    "title": "~았/었지요 (Đã... rồi đúng không ạ?, đã... mà nhỉ)",
    "shortExplanation": "Vĩ tố kết thúc câu dùng để xác nhận một sự thật trong quá khứ mà cả người nói lẫn người nghe đều đã biết hoặc cùng trải qua ('đã... đúng không ạ?', 'chẳng phải đã... sao?').",
    "longExplanation": "'~았/었지요' kết hợp vĩ tố thì quá khứ '-았/었-' với vĩ tố xác nhận thân mật lịch sự '-지요'. Cấu trúc này dùng khi người nói muốn nhắc lại, gợi nhớ hoặc tìm kiếm sự đồng tình từ người nghe về một sự việc, hành vi hay trạng thái trong quá khứ mà cả hai bên cùng biết rõ hoặc đã cùng trải nghiệm. Trong khẩu ngữ thường được nói rút gọn thành '-았/었죠'.",
    "formation": "Thân động từ / Thân tính từ + 았/었지요 (nguyên âm ㅏ, ㅗ: -았지요 / nguyên âm khác: -었지요 / 하다: -했지요)",
    "examples": [
      {
        "translation": "Chúng ta từng xem bộ phim đó rồi đúng không nhỉ, phim ấy quả thực rất hay."
      },
      {
        "translation": "Bạn đã giúp đỡ tôi mà, vì vậy tôi thật sự vô cùng biết ơn bạn."
      },
      {
        "translation": "Chúng ta đã bàn bạc rất nhiều về chuyện đó rồi đúng không, giờ là lúc cần đưa ra quyết định."
      },
      {
        "translation": "Kế hoạch cho tương lai của chúng ta từng là chủ đề thảo luận chính, và đó vẫn là vấn đề hết sức quan trọng."
      }
    ]
  },
  "ko_어야지_84": {
    "title": "~어야지 (Phải... thôi, nhất định sẽ..., phải làm... mới được)",
    "shortExplanation": "Vĩ tố kết thúc câu dùng để thể hiện quyết tâm, ý chí mạnh mẽ của bản thân hoặc tự nhắc nhở mình phải thực hiện một việc gì đó ('phải... thôi', 'chắc chắn phải...').",
    "longExplanation": "'~어야지' kết hợp vĩ tố điều kiện '-아/어' với vĩ tố biểu thị ý chí '-야지'. Đuôi câu này được người nói dùng khi tự nhủ với bản thân (độc thoại nội tâm) hoặc khẳng định một cách dứt khoát với đối phương về ý định, quyết tâm và bổn phận mà mình nhất định phải thực hiện trong thời gian tới. Ngoài ra, trong một số ngữ cảnh có ngữ điệu lên giọng nhẹ nhàng, nó cũng có thể dùng như một lời khuyên bảo hoặc quở trách thân mật với người nhỏ tuổi hơn.",
    "formation": "Thân động từ (nguyên âm ㅏ, ㅗ: -아야지 / nguyên âm khác: -어야지 / 하다: -해야지)",
    "examples": [
      {
        "translation": "Ngày mai là ngày thi rồi nên hôm nay mình phải chăm chỉ học bài thôi, như thế thì mai mới làm bài tốt được."
      },
      {
        "translation": "Phải ăn kiêng giảm cân thôi, mình cần ăn các món tốt cho sức khỏe cơ thể mới được."
      },
      {
        "translation": "Phải làm việc nhà thôi, mình đang định dọn dẹp lại căn phòng đây."
      },
      {
        "translation": "Tuần sau có bài kiểm tra rồi nên thay vì đọc tiểu thuyết mình phải dành thời gian học bài thôi."
      }
    ]
  },
  "ko_었더라면_85": {
    "title": "~었더라면 (Giá như đã..., nếu như lúc đó mà...)",
    "shortExplanation": "Vĩ tố liên kết giả định ngược với thực tế trong quá khứ, diễn đạt điều kiện trái với những gì đã thực sự xảy ra ('giá như đã...', 'nếu như lúc ấy mà...').",
    "longExplanation": "'~었더라면' kết hợp vĩ tố quá khứ '-았/었-', vĩ tố hồi tưởng '-더-' và vĩ tố điều kiện '-(으)라면'. Cấu trúc này dùng để đặt ra một giả định hoàn toàn trái ngược với thực tế đã xảy ra trong quá khứ (phản thực tế), đi kèm vế sau diễn đạt kết quả phỏng đoán sẽ xảy ra nếu điều kiện đó thành hiện thực (thường đi với đuôi câu '-(으)ㄹ 텐데' hoặc '-(으)ㄹ 텐데요', '-(으)ㄹ 것이다'). Cấu trúc thường thể hiện sự tiếc nuối, ân hận hoặc thở phào nhẹ nhõm của người nói.",
    "formation": "Thân động từ / Thân tính từ + 았/었더라면 (nguyên âm ㅏ, ㅗ: -았더라면 / nguyên âm khác: -었더라면 / 하다: -했더라면)",
    "examples": [
      {
        "translation": "Nếu như lúc đó thời tiết đẹp thì chúng tôi đã ra biển chơi rồi, chẳng cần phải ngồi làm việc ở nhà xuất bản."
      },
      {
        "translation": "Nếu như họ mà không đến thì chắc đã chẳng có ai giúp đỡ chúng tôi cả."
      },
      {
        "translation": "Nếu như tôi mà biết điều đó từ trước thì tôi đã làm một công việc khác rồi."
      },
      {
        "translation": "Nếu như anh ấy từng thử làm công việc bồi bàn thì anh ấy đã thấu hiểu sâu sắc hơn về việc nấu ăn rồi."
      }
    ]
  },
  "ko_에_86": {
    "title": "~에 (Ở, vào lúc, đến)",
    "shortExplanation": "Tiểu từ phó từ gắn sau danh từ, biểu thị nơi chốn tồn tại ('ở'), thời điểm xảy ra sự việc ('vào lúc'), hoặc đích đến của sự di chuyển ('đến').",
    "longExplanation": "'~에' là một trong những tiểu từ cơ bản và đa năng nhất trong tiếng Hàn. Các chức năng chính bao gồm: (1) Biểu thị đích đến, hướng chuyển động khi đi cùng các động từ chỉ sự di chuyển như 가다 (đi), 오다 (đến), 도착하다 (đến nơi); (2) Biểu thị địa điểm tồn tại hoặc cư trú tĩnh khi đi cùng 있다 (có/ở), 없다 (không có/không ở), 살다 (sống); (3) Biểu thị thời gian xảy ra hành động (ví dụ: 'vào buổi sáng', 'vào dịp Giáng sinh'). Chú ý phân biệt với '~에서' (nơi diễn ra hành động động thái hoặc điểm xuất phát).",
    "formation": "Danh từ + 에",
    "examples": [
      {
        "translation": "Tôi đã đến trường để học bài. Khi ở trường, tôi luôn trải qua những khoảng thời gian vui vẻ bên bạn bè."
      },
      {
        "translation": "Vào ngày Giáng sinh tôi đã ở nhà cùng gia đình, còn bạn bè tôi thì đi du lịch nước ngoài."
      },
      {
        "translation": "Sau khi đến công ty làm việc, vào buổi tối tôi cùng bạn bè đến nhà hàng ăn tối."
      },
      {
        "translation": "Tôi dự định sắp tới vào mùa hè sẽ đến Seoul, nhưng vào mùa hè Seoul nóng bức quá nên tôi hơi lo."
      }
    ]
  },
  "ko_에_87": {
    "title": "~에 따라 (Tùy theo, theo như, dựa theo)",
    "shortExplanation": "Cấu trúc gắn sau danh từ, biểu thị một sự việc, phán đoán hay kết quả sẽ thay đổi tùy thuộc vào điều kiện, chuẩn mực hoặc tiêu chí đó ('tùy theo...', 'dựa theo...').",
    "longExplanation": "'~에 따라' kết hợp tiểu từ '-에' với động từ '따르다' (tuân theo, đi theo). Cấu trúc này dùng để diễn đạt tình huống kết quả ở mệnh đề sau sẽ khác biệt hoặc biến đổi tương ứng căn cứ vào điều kiện, chủng loại, tình huống hay tiêu chuẩn của danh từ đi trước. Thường đi kèm với các từ như '달라지다' (trở nên khác đi), '다르다' (khác nhau), '결정되다' (được quyết định). Khi bổ nghĩa trực tiếp cho danh từ phía sau, cấu trúc chuyển thành dạng định ngữ '~에 따른'.",
    "formation": "Danh từ + 에 따라 (định ngữ bổ nghĩa cho danh từ: Danh từ + 에 따른 + Danh từ)",
    "examples": [
      {
        "translation": "Tùy theo thời tiết mà kế hoạch du lịch của chúng ta có thể bị thay đổi."
      },
      {
        "translation": "Tùy theo chủng loại của loài động vật mà tập tính sinh hoạt của chúng có thể rất khác biệt."
      },
      {
        "translation": "Quyết định của bạn có thể thay đổi tùy thuộc vào ý kiến của mọi người."
      },
      {
        "translation": "Việc lựa chọn trường đại học có thể thay đổi tùy theo thành tích học tập."
      }
    ]
  },
  "ko_에_88": {
    "title": "~에 따르다 / ~에 따라(서) (Tùy theo, theo như, dựa vào)",
    "shortExplanation": "Gắn sau danh từ để biểu thị tiêu chuẩn, căn cứ, điều kiện hoặc nguyên nhân làm biến đổi hoặc quyết định một sự việc ('tùy theo', 'theo như', 'dựa vào').",
    "longExplanation": "'~에 따르다' (thường dùng trong văn cảnh thực tế dưới dạng '-아/어(서)' là '~에 따라' hoặc '~에 따라서') là cấu trúc biểu thị hành động, kết quả hoặc trạng thái ở vế sau thay đổi, biến chuyển tùy thuộc vào chuẩn mực, quy tắc, hoàn cảnh hay điều kiện của danh từ đứng trước. Khi đi với các danh từ mang tính pháp lý, quy chế như luật lệ, chỉ thị, nguyên tắc, nó mang ý nghĩa 'tuân theo', 'chiếu theo'.",
    "formation": "Danh từ + 에 따르다 / 에 따라(서)",
    "examples": [
      {
        "translation": "Kiểu cách mặc quần áo đương nhiên sẽ thay đổi tùy theo thời tiết, vào những ngày rất lạnh thì sự ấm áp phải được ưu tiên hơn là thời trang."
      },
      {
        "translation": "Hương vị của món ăn có thể hoàn toàn khác nhau tùy thuộc vào nguyên liệu, nếu sử dụng nguyên liệu tươi ngon thì có thể làm ra món ăn ngon."
      },
      {
        "translation": "Thời gian đến nơi có thể thay đổi tùy theo tình hình giao thông, nếu tắc đường thì có thể sẽ bị đến muộn."
      },
      {
        "translation": "Kết quả sẽ khác biệt tùy vào thực lực của bạn, nếu chăm chỉ học tập thì có thể đạt được kết quả tốt."
      }
    ]
  },
  "ko_에_89": {
    "title": "~에 비해 / ~에 비해서 (So với, so sánh với)",
    "shortExplanation": "Gắn sau danh từ để lấy danh từ đó làm tiêu chuẩn đối chiếu, so sánh mức độ hoặc đặc điểm với một đối tượng khác ('so với').",
    "longExplanation": "'~에 비해' (hoặc dạng đầy đủ hơn là '~에 비해서') kết hợp với danh từ để biểu thị sự so sánh hoặc đối chiếu giữa hai hay nhiều đối tượng, sự việc. Nó đặt danh từ đi trước làm mốc quy chiếu nhằm làm nổi bật đặc trưng, số lượng, quy mô hoặc mức độ khác biệt của đối tượng ở vế sau. Tương đương với 'so với...', 'so sánh với...' trong tiếng Việt.",
    "formation": "Danh từ + 에 비해(서)",
    "examples": [
      {
        "translation": "So với Seoul thì thời tiết ở Busan đẹp hơn nên rất thích hợp để đến đó vào mùa hè."
      },
      {
        "translation": "So với rau củ thì tôi ăn nhiều trái cây hơn, vì trái cây ngọt hơn nên tôi thích."
      },
      {
        "translation": "So với thành tích của học kỳ trước thì thành tích học kỳ này đã tiến bộ hơn rất nhiều."
      },
      {
        "translation": "So với cà phê thì trà ít caffein hơn nên có thể uống vào buổi tối."
      }
    ]
  },
  "ko_에게_90": {
    "title": "~에게 (Cho ai, tới ai, với ai)",
    "shortExplanation": "Tiểu từ chỉ đối tượng tiếp nhận hành động, gắn sau danh từ chỉ người hoặc động vật ('cho ai', 'đối với ai', 'tới ai').",
    "longExplanation": "'~에게' là tiểu từ phó từ chỉ đối tượng tiếp nhận của hành động, chỉ kết hợp với danh từ chỉ người hoặc động vật (danh từ hữu tình). Nó thường xuất hiện cùng các động từ trao nhận hoặc truyền đạt như 주다 (cho, tặng), 보내다 (gửi), 말하다 (nói), 가르치다 (dạy). Trong khẩu ngữ đời thường thân mật, người ta thường dùng '~한테', còn đối với người lớn tuổi hoặc đối tượng cần tôn kính thì dùng tiểu từ kính ngữ '~께'.",
    "formation": "Danh từ (người, động vật) + 에게",
    "examples": [
      {
        "translation": "Hôm qua tôi đã gửi tin nhắn này cho người bạn, nhưng vẫn chưa có hồi âm."
      },
      {
        "translation": "Thầy giáo đã giao nhiều bài tập cho học sinh, chắc sẽ cần rất nhiều thời gian để hoàn thành tất cả."
      },
      {
        "translation": "Người mẹ đang kể chuyện cho em bé nghe."
      },
      {
        "translation": "Tôi đã tặng quà cho em trai, em ấy trông rất hạnh phúc khi nhận được cuốn sách mới."
      }
    ]
  },
  "ko_에서_91": {
    "title": "~에서 (Ở, tại, từ)",
    "shortExplanation": "Tiểu từ chỉ nơi chốn cụ thể diễn ra hành động ('ở', 'tại') hoặc chỉ điểm xuất phát, nguồn gốc ('từ').",
    "longExplanation": "'~에서' là tiểu từ phó từ chỉ địa điểm trong tiếng Hàn với hai chức năng quan trọng: thứ nhất là biểu thị không gian nơi một hành động cụ thể đang hoặc đã diễn ra ('ở', 'tại', khác với '~에' chỉ trạng thái tồn tại tĩnh như 있다/없다); thứ hai là chỉ điểm khởi đầu, nguồn gốc hoặc điểm xuất phát của sự di chuyển, hành động ('từ đâu đến'). Trong khẩu ngữ, đôi khi nó được rút gọn thành '~서'.",
    "formation": "Danh từ (nơi chốn) + 에서",
    "examples": [
      {
        "translation": "Tôi sinh ra ở Seoul. Seoul là nơi đầu tiên tôi hít thở bầu không khí cuộc đời."
      },
      {
        "translation": "Việc học ở trường là điều quan trọng nhất đối với tôi. Vì vậy tôi luôn cố gắng học chăm chỉ."
      },
      {
        "translation": "Tôi đã đón máy bay ở sân bay đi Tokyo. Tokyo tuy là một nơi xa lạ đối với tôi nhưng rất thú vị."
      },
      {
        "translation": "Tôi vừa nghe nhạc vừa học bài ở quán cà phê. Làm như vậy thì tôi có thể học tập một cách vui vẻ."
      }
    ]
  },
  "ko_에서부터_92": {
    "title": "~에서부터 ~까지 (Từ... đến..., từ... cho tới...)",
    "shortExplanation": "Biểu thị phạm vi không gian hoặc thời gian kéo dài từ điểm bắt đầu đến điểm kết thúc ('từ... đến...').",
    "longExplanation": "'~에서부터' là hình thức kết hợp giữa tiểu từ nơi chốn/nguồn gốc '에서' và trợ từ nhấn mạnh khởi điểm '부터', mang ý nghĩa nhấn mạnh mốc xuất phát về không gian hoặc thời gian. Cấu trúc này thường đi liền với '~까지' (đến, cho tới) để tạo thành cặp tương ứng biểu thị trọn vẹn lộ trình, khoảng thời gian hay phạm vi từ điểm khởi đầu đến điểm kết thúc.",
    "formation": "Danh từ (thời gian/nơi chốn) + 에서부터 + Danh từ (thời gian/nơi chốn) + 까지",
    "examples": [
      {
        "translation": "Mỗi buổi sáng, tôi tập thể dục từ 7 giờ đến 8 giờ rồi mới đi học."
      },
      {
        "translation": "Chúng tôi đã đi du lịch bằng ô tô từ Seoul đến tận Busan."
      },
      {
        "translation": "Cuối tuần này, tôi nghỉ ngơi từ 5 giờ chiều thứ Bảy cho đến 3 giờ chiều Chủ nhật."
      },
      {
        "translation": "Triển lãm ảnh sẽ diễn ra từ ngày 1 tháng 11 cho đến ngày 30 tháng 11."
      }
    ]
  },
  "ko_와과_93": {
    "title": "~와/과 (Và, với, cùng với)",
    "shortExplanation": "Tiểu từ liên kết hai hay nhiều danh từ ('và') hoặc biểu thị đối tượng cùng tham gia thực hiện hành động ('với', 'cùng với').",
    "longExplanation": "'~와/과' là trợ từ nối và phó từ cách chuẩn mực trong tiếng Hàn. Với vai trò liên kết, nó kết nối các danh từ ngang hàng tạo thành phép liệt kê ('và'). Với vai trò chỉ đối tượng cùng hành động, nó thường kết hợp với '함께' hoặc '같이' để diễn đạt 'làm gì cùng với ai'. Danh từ kết thúc bằng nguyên âm kết hợp với '와', kết thúc bằng phụ âm kết hợp với '과'. Cấu trúc này mang sắc thái trang trọng, văn phong chuẩn mực hơn so với '~하고' hay '~랑/이랑'.",
    "formation": "Danh từ (không có phụ âm cuối: + 와 / có phụ âm cuối: + 과)",
    "examples": [
      {
        "translation": "Sáng nay tôi đã ăn cơm, kim chi và sườn nướng."
      },
      {
        "translation": "Tôi đã đi đến rạp chiếu phim cùng với bạn của mình."
      },
      {
        "translation": "Tôi muốn đi mua giày thể thao, quần jean và áo phông."
      },
      {
        "translation": "Cuối tuần này, tôi đã có khoảng thời gian hạnh phúc bên gia đình."
      }
    ]
  },
  "ko_와과_94": {
    "title": "~와/과 같다 (Giống như, như là, giống với)",
    "shortExplanation": "Biểu thị sự tương đồng, so sánh ví von ('như là', 'giống như') hoặc sự đồng nhất về mặt tính chất ('giống với').",
    "longExplanation": "'~와/과 같다' kết hợp trợ từ so sánh '~와/과' và tính từ '같다' (giống, bằng). Cấu trúc này dùng trong hai ngữ cảnh chính: một là ví von hình ảnh để miêu tả vẻ ngoài hay tính chất của sự vật giống như một đối tượng khác ('như ngôi sao', 'như khách sạn'); hai là khẳng định hai đối tượng có tính chất, nội dung hoặc cách giải quyết tương đương, đồng nhất với nhau. Danh từ không có phụ âm cuối đi với '와 같다', có phụ âm cuối đi với '과 같다'.",
    "formation": "Danh từ (không có phụ âm cuối: + 와 같다 / có phụ âm cuối: + 과 같다)",
    "examples": [
      {
        "translation": "Đôi mắt của cô ấy đẹp tựa những vì sao, vừa lấp lánh lại vừa kiều diễm."
      },
      {
        "translation": "Trong quá trình trưởng thành, mục tiêu luôn giống như ngôi sao Bắc Cực, luôn chỉ cho tôi phương hướng."
      },
      {
        "translation": "Ký túc xá trường chúng tôi chẳng khác nào khách sạn, vô cùng tiện nghi và đầy đủ cơ sở vật chất."
      },
      {
        "translation": "Bài toán này giống với bài toán trước đó, nó có cách giải tương tự nhau."
      }
    ]
  },
  "ko_와과_95": {
    "title": "~와/과 달리 (Khác với, không giống như)",
    "shortExplanation": "Gắn sau danh từ để biểu thị sự khác biệt hoặc đối chiếu rõ rệt giữa hai đối tượng, tình huống ('khác với', 'không giống như').",
    "longExplanation": "'~와/과 달리' kết hợp giữa trợ từ so sánh '~와/과' và phó từ '달리' (khác biệt, xuất phát từ tính từ 다르다). Cấu trúc này dùng để làm nổi bật sự đối lập, không tương đồng về mặt đặc điểm, hành động hoặc hoàn cảnh giữa đối tượng đang nói tới so với đối tượng tiêu chuẩn được nhắc đến trước đó. Khi trước nó là một mệnh đề động từ, thường dùng dưới hình thức định từ hóa '~는 것과 달리'.",
    "formation": "Danh từ (không có phụ âm cuối: + 와 달리 / có phụ âm cuối: + 과 달리) / Động từ + 는 것과 달리",
    "examples": [
      {
        "translation": "Khác với việc ngày nào cũng phải đến công ty, hôm nay tôi đã làm việc tại nhà."
      },
      {
        "translation": "Khác với mùa hè, vào mùa đông vì thời tiết lạnh nên ta phải mặc nhiều quần áo."
      },
      {
        "translation": "Khác với Cheol-woo, Jin-woo học rất giỏi."
      },
      {
        "translation": "Khác với Seoul, mùa đông ở Busan đỡ lạnh hơn."
      }
    ]
  },
  "ko_을를_96": {
    "title": "~을/를 통해 / ~을/를 통해서 (Thông qua, qua)",
    "shortExplanation": "Gắn sau danh từ để biểu thị phương tiện, phương pháp, kinh nghiệm hoặc cầu nối trung gian nhằm đạt được mục đích hay kết quả ('thông qua', 'qua').",
    "longExplanation": "'~을/를 통해' (thường dùng ở dạng nhấn mạnh hơn là '~을/를 통해서') kết hợp với danh từ để chỉ ra đối tượng trung gian, phương thức, công cụ hoặc quá trình giúp người nói đạt được tri thức, truyền tải tình cảm hoặc gặt hái kết quả nào đó. Tương đương với 'thông qua...', 'qua việc...' trong tiếng Việt. Danh từ không có phụ âm cuối đi với '를 통해', có phụ âm cuối đi với '을 통해'.",
    "formation": "Danh từ (không có phụ âm cuối: + 를 통해(서) / có phụ âm cuối: + 을 통해(서))",
    "examples": [
      {
        "translation": "Thông qua cuốn sách này, tôi đã có thể thấu hiểu rõ hơn về suy nghĩ và triết lý của ông ấy."
      },
      {
        "translation": "Người đàn ông ấy đã thông qua âm nhạc để bộc lộ cảm xúc của bản thân."
      },
      {
        "translation": "Thông qua giao lưu văn hóa, chúng ta có thể củng cố và tăng cường mối quan hệ với các quốc gia khác."
      },
      {
        "translation": "Qua những chuyến du lịch, tôi đã được trải nghiệm nhiều nền văn hóa và cảnh sắc phong phú."
      }
    ]
  },
  "ko_이가_97": {
    "title": "~이/가 되다 (Trở thành, trở nên, thành)",
    "shortExplanation": "Đi sau danh từ bổ ngữ để biểu thị sự biến đổi, chuyển tiếp sang một trạng thái, thân phận hoặc nghề nghiệp mới ('trở thành', 'thành').",
    "longExplanation": "'~이/가 되다' là mẫu câu chỉ sự biến hóa cơ bản trong tiếng Hàn. Nội động từ '되다' diễn tả việc chuyển biến thành một trạng thái mới, và danh từ đứng trước nó đóng vai trò bổ ngữ kết hợp với trợ từ bổ cách '이/가'. Cấu trúc này dùng để diễn tả sự thay đổi về chức vụ, nghề nghiệp, độ tuổi, mùa màng hoặc trạng thái. Danh từ có phụ âm cuối đi với '이 되다', không có phụ âm cuối đi với '가 되다'.",
    "formation": "Danh từ (không có phụ âm cuối: + 가 되다 / có phụ âm cuối: + 이 되다)",
    "examples": [
      {
        "translation": "Trẻ con muốn trở thành người lớn thì cần rất nhiều thời gian."
      },
      {
        "translation": "Cô ấy đã trở thành một ca sĩ vô cùng nổi tiếng."
      },
      {
        "translation": "Hôm nay trời bỗng trở lạnh nên găng tay đã trở nên cần thiết."
      },
      {
        "translation": "Tôi đã chăm chỉ học tập và trở thành một bác sĩ."
      }
    ]
  },
  "ko_이가_98": {
    "title": "~이/가 아니다 (Không phải là)",
    "shortExplanation": "Đi sau danh từ bổ ngữ để phủ định danh từ đó ('không phải là...').",
    "longExplanation": "'~이/가 아니다' là hình thức phủ định trực tiếp của trợ từ chỉ định vị ngữ '~이다' (là). Trong cấu trúc này, '아니다' là tính từ mang nghĩa phủ định, và danh từ đứng trước đóng vai trò bổ ngữ đi cùng tiểu từ bổ cách '이/가'. Cấu trúc này dùng để xác nhận hoặc khẳng định dứt khoát rằng danh từ phía trước không đúng với bản chất, danh tính hay thực tế của đối tượng. Danh từ có phụ âm cuối kết hợp với '이 아니다', không có phụ âm cuối kết hợp với '가 아니다'.",
    "formation": "Danh từ (không có phụ âm cuối: + 가 아니다 / có phụ âm cuối: + 이 아니다)",
    "examples": [
      {
        "translation": "Tôi không phải là học sinh, tôi là giáo viên."
      },
      {
        "translation": "Con mèo không phải là đồ thất lạc của chúng tôi, đồ thất lạc của chúng tôi là chú cún con cơ."
      },
      {
        "translation": "Người nấu ăn giỏi không phải là tôi đâu, tôi hoàn toàn chẳng có hoa tay nấu nướng gì cả."
      },
      {
        "translation": "Người đó không phải là học sinh trường chúng tôi, anh ấy là học sinh của trường khác."
      }
    ]
  },
  "ko_이라도_99": {
    "title": "~(이)라도 (Dù chỉ là..., ít nhất thì..., kể cả là...)",
    "shortExplanation": "Trợ từ biểu thị sự chấp nhận một lựa chọn mang tính giải pháp tạm thời, dù chưa phải là tốt nhất ('dù chỉ là...', 'ít nhất thì...').",
    "longExplanation": "'~(이)라도' là trợ từ chỉ sự nhượng bộ hoặc chọn lựa thứ yếu. Nó ám chỉ rằng đối tượng được nhắc đến có thể không đạt đến sự kỳ vọng hay lý tưởng cao nhất, nhưng trong hoàn cảnh thiếu thốn lựa chọn, việc có được nó vẫn tốt hơn nhiều so với việc không có gì cả. Danh từ có phụ âm cuối kết hợp với '이라도', không có phụ âm cuối kết hợp với '라도'.",
    "formation": "Danh từ (không có phụ âm cuối: + 라도 / có phụ âm cuối: + 이라도)",
    "examples": [
      {
        "translation": "Dẫu cho điều đó không phải là thứ ta kỳ vọng, nhưng vẫn tốt hơn là chẳng có gì."
      },
      {
        "translation": "Dù chỉ là bức ảnh này thôi, chụp lại thì sau này cũng sẽ trở thành một kỷ niệm đẹp."
      },
      {
        "translation": "Dù hát không hay thì ở phòng karaoke bạn cũng hãy thử hát lấy một bài xem sao."
      },
      {
        "translation": "Dù trong kỳ thi không đạt điểm cao, nhưng nếu bạn đã học được ít nhất những phần mình chưa hiểu thì đó cũng là thành quả lớn rồi."
      }
    ]
  },
  "ko_이래_100": {
    "title": "~이래 / ~이래로 (Kể từ, từ sau khi, từ đó đến nay)",
    "shortExplanation": "Gắn sau danh từ chỉ mốc thời gian/sự kiện hoặc định từ thì quá khứ để biểu thị khoảng thời gian liên tục tính từ một mốc trong quá khứ cho tới nay ('kể từ', 'từ khi').",
    "longExplanation": "'~이래' (gốc chữ Hán '以來' - Dĩ lai) dùng để diễn đạt khoảng thời gian kéo dài liên tục từ một bước ngoặt, sự kiện hoặc mốc thời gian trong quá khứ cho đến tận thời điểm hiện tại. Nó thường gắn sau danh từ chỉ sự kiện lịch sử hoặc kết hợp cùng vĩ tố định từ quá khứ '-(으)ㄴ 이래'. Để nhấn mạnh tính tiếp diễn của thời gian, trợ từ '로' thường được thêm vào tạo thành '~이래로'.",
    "formation": "Danh từ + 이래(로) / Thân động từ + -(으)ㄴ 이래(로)",
    "examples": [
      {
        "translation": "Suốt 5 năm kể từ sau khi vụ việc đó xảy ra, tôi chưa từng một lần quay lại nơi ấy."
      },
      {
        "translation": "Lần đầu tiên trong suốt một trăm năm qua, đội bóng đá của trường chúng tôi đã giành ngôi vô địch."
      },
      {
        "translation": "Người ta bảo đã rất lâu rồi mới lại gặp được một người tìm việc tràn đầy nhiệt huyết như thế này."
      },
      {
        "translation": "Kể từ cái ngày tôi đạt điểm cao nhất ở trường, bố mẹ đã vô cùng tự hào về tôi."
      }
    ]
  },
  "ko_이랑_101": {
    "title": "~(이)랑 (Và, với, cùng với)",
    "shortExplanation": "Trợ từ thân mật trong văn nói, dùng để liệt kê danh từ ('và') hoặc chỉ đối tượng cùng làm việc gì đó ('với', 'cùng với').",
    "longExplanation": "'~(이)랑' là tiểu từ kết nối khẩu ngữ vô cùng phổ biến trong đời sống hàng ngày của người Hàn Quốc. Về chức năng ngữ pháp, nó đảm nhận vai trò liệt kê danh từ ('và') hoặc biểu thị người đồng hành cùng thực hiện hành động ('cùng với ai', thường đi cùng '같이' hoặc '함께'). Nó mang sắc thái thân mật, tự nhiên và gần gũi hơn nhiều so với '~와/과'. Danh từ có phụ âm cuối đi với '이랑', không có phụ âm cuối đi với '랑'.",
    "formation": "Danh từ (không có phụ âm cuối: + 랑 / có phụ âm cuối: + 이랑)",
    "examples": [
      {
        "translation": "Tôi đã đi xem phim với bạn của mình. Phim thực sự rất hay."
      },
      {
        "translation": "Tôi đã làm bài tập dài và khó cùng với bạn, nhờ thế mà tôi có thêm tinh thần chinh phục thử thách."
      },
      {
        "translation": "Tôi đã có chuyến du lịch khó quên cùng gia đình. Thực sự rất vui vẻ."
      },
      {
        "translation": "Mỗi sáng tôi đều tập thể dục và tắm rửa rồi mới đến trường."
      }
    ]
  },
  "ko_이렇게_102": {
    "title": "이렇게 (Như thế này, dường này, đến mức này)",
    "shortExplanation": "Phó từ chỉ định dùng để mô tả phương thức, trạng thái của hành động hoặc nhấn mạnh mức độ cao của tính chất ('như thế này', 'đến mức này').",
    "longExplanation": "'이렇게' là phó từ chỉ thị xuất phát từ tính từ '이렇다' (thế này, như thế này) kết hợp với đuôi tạo phó từ '-게'. Nó được sử dụng theo hai hướng: một là bổ nghĩa cho động từ để chỉ cách thức hay phương pháp tiến hành hành động ('làm như thế này'); hai là đứng trước tính từ hoặc động từ để biểu thị mức độ cao bất thường kèm theo cảm xúc ngạc nhiên, thán phục hoặc không ngờ tới của người nói ('nóng đến thế này', 'lớn như thế này').",
    "formation": "이렇게 + Động từ / Tính từ / Mệnh đề",
    "examples": [
      {
        "translation": "Vào một ngày nóng nực như thế này thì ăn kem là tuyệt nhất trần đời."
      },
      {
        "translation": "Tôi không ngờ là mình lại đến muộn đến mức này."
      },
      {
        "translation": "Tôi không nghĩ là mình có thể giải quyết được một vấn đề lớn đến thế này."
      },
      {
        "translation": "Tôi không nhận ra là cơ thể mình đã to lớn ra đến mức này."
      }
    ]
  },
  "ko_이므로_103": {
    "title": "~(이)므로 (Vì, do là, bởi vì)",
    "shortExplanation": "Vĩ tố liên kết biểu thị nguyên nhân hoặc lý do mang tính trang trọng, văn viết ('vì...', 'do... nên').",
    "longExplanation": "'~(이)므로' là vĩ tố liên kết chỉ nguyên nhân hoặc lý do, thường được sử dụng trong các tình huống trang trọng, văn bản hành chính, văn viết, bài diễn văn hoặc thông báo công cộng. Vế trước nêu lên lý do, căn cứ và vế sau nêu lên kết quả, phán đoán. Thân động từ hoặc tính từ kết thúc bằng nguyên âm hoặc phụ âm 'ㄹ' đi với '-므로', kết thúc bằng phụ âm khác đi với '-으므로'. Khi đi với danh từ, danh từ có phụ âm cuối kết hợp với '-이므로', không có phụ âm cuối kết hợp với '-므로'. Ở thì quá khứ, sử dụng dạng '-았/었/였으므로'.",
    "formation": "Thân động từ / Thân tính từ (kết thúc bằng nguyên âm hoặc ㄹ: -므로 / kết thúc bằng phụ âm: -으므로); Danh từ (kết thúc bằng nguyên âm: -므로 / kết thúc bằng phụ âm: -이므로); Thì quá khứ: -았/었/였으므로",
    "examples": [
      {
        "translation": "Vì trời mưa liên tục mỗi ngày trong suốt một tuần nên tôi nghĩ tốt hơn là bạn nên mang theo ô (dù)."
      },
      {
        "translation": "Vì cô ấy có thể nấu món ăn Hàn Quốc rất ngon nên được mọi người trong xóm hết lòng yêu mến tài nấu ăn của mình."
      },
      {
        "translation": "Vì thời tiết rất lạnh nên tốt nhất bạn nên quàng khăn ấm."
      },
      {
        "translation": "Vì ngày mai là ngày nghỉ lễ nên bưu điện sẽ đóng cửa."
      }
    ]
  },
  "ko_이어서_104": {
    "title": "~이어서 / 이어서 (Tiếp theo, tiếp đó, nối tiếp)",
    "shortExplanation": "Biểu thị sự tiếp nối hoặc trình tự trước sau của các hành động, sự việc ('tiếp sau đó', 'nối tiếp').",
    "longExplanation": "'이어서' có nguồn gốc từ động từ '잇다' (nối tiếp) hoặc cấu trúc '이다 + -어서', được dùng như một liên từ hoặc phó từ liên kết biểu thị một hành động hoặc sự việc diễn ra ngay sau khi hành động trước vừa hoàn tất. Cấu trúc này làm nổi bật tính liên tục và liền mạch về mặt thời gian hoặc trình tự công việc giữa hai vế câu.",
    "formation": "Mệnh đề 1 + -고 이어서 + Mệnh đề 2, hoặc Danh từ + (이)어서",
    "examples": [
      {
        "translation": "Tôi đã dọn dẹp phòng và tiếp sau đó chuẩn bị bữa tối."
      },
      {
        "translation": "Chúng tôi đã ăn tối trước, tiếp đó đi dạo bộ."
      },
      {
        "translation": "Cô ấy đã học tập chăm chỉ và tiếp sau đó thi đỗ kỳ thi."
      },
      {
        "translation": "Tôi thức dậy sớm vào buổi sáng và tiếp đó thong thả chuẩn bị xong mọi thứ."
      }
    ]
  },
  "ko_이었다_105": {
    "title": "~이었다/였다 (Đã từng là, từng là)",
    "shortExplanation": "Dạng quá khứ của trợ từ vị ngữ '이다', biểu thị thân phận, nghề nghiệp, đặc điểm hoặc trạng thái của sự vật/con người trong quá khứ ('đã là', 'từng là').",
    "longExplanation": "'~이었다/였다' là hình thức quá khứ của trợ từ vị ngữ '이다' (là). Cấu trúc này dùng để diễn đạt danh từ đi trước từng mang danh phận, nghề nghiệp, đặc điểm hoặc trạng thái đó trong quá khứ nhưng nay có thể đã thay đổi hoặc đã thuộc về dĩ vãng. Danh từ có phụ âm cuối kết hợp với '-이었다' (trong văn nói có thể rút gọn thành '이었어요/이었습니다'), danh từ không có phụ âm cuối kết hợp với '-였다' (rút gọn thành '였어요/였습니다'). Cấu trúc này chỉ dùng cho danh từ, không dùng cho động từ hành động.",
    "formation": "Danh từ (có phụ âm cuối: -이었다 / không có phụ âm cuối: -였다)",
    "examples": [
      {
        "translation": "Khi còn nhỏ, cậu ấy từng là một đứa trẻ thực sự ngoan ngoãn và lễ phép."
      },
      {
        "translation": "Cây cổ thụ tôi từng nhìn thấy ở Jinan đã là khung cảnh đẹp nhất trong khu vườn."
      },
      {
        "translation": "Cô ấy từng là giáo viên tiếng Anh ở trường chúng tôi."
      },
      {
        "translation": "Cứ như thế, mùa hè năm ấy đã là khoảng thời gian tuyệt vời nhất không thể nào quên."
      }
    ]
  },
  "ko_이지만_106": {
    "title": "~이지만 / -지만 (Là... nhưng, tuy là... nhưng)",
    "shortExplanation": "Vĩ tố liên kết biểu thị sự tương phản, đối lập giữa vế trước và vế sau ('nhưng mà', 'tuy... nhưng').",
    "longExplanation": "'~이지만' là sự kết hợp giữa trợ từ vị ngữ '이다' và vĩ tố liên kết tương phản '-지만', dùng khi đi sau danh từ để biểu thị sự đối lập giữa hai sự việc ('tuy là... nhưng'). Khi kết hợp với thân động từ hoặc thân tính từ, chỉ cần gắn trực tiếp vĩ tố '-지만' vào thân từ mà không cần '이-'. Vế trước thừa nhận một sự thật hay trạng thái, vế sau nêu lên một tình huống trái ngược hoặc mang tính bất ngờ so với vế trước.",
    "formation": "Danh từ (có phụ âm cuối: -이지만 / không có phụ âm cuối: -지만); Thân động từ / Thân tính từ + -지만; Thì quá khứ: -았/었지만",
    "examples": [
      {
        "translation": "Dù rất đau nhưng tôi đã đến bệnh viện mua thuốc về rồi. Tôi dự định sẽ nghỉ ngơi ở nhà."
      },
      {
        "translation": "Hôm nay tuy gió thổi nhiều nhưng thời tiết đẹp nên tôi đã mở sẵn cửa sổ phòng vệ sinh."
      },
      {
        "translation": "Tôi chưa làm hết tất cả bài tập về nhà nhưng trước mắt đã nộp rồi. Ngày mai tôi sẽ làm nốt."
      },
      {
        "translation": "Bây giờ tôi thực sự rất đói. Dù đã ăn tối rồi mà tôi vẫn thấy đói bụng."
      }
    ]
  },
  "ko_인데_107": {
    "title": "~(으)ㄴ/는데 / ~인데 (Nhưng, mà, thế nhưng, làm bối cảnh/giải thích)",
    "shortExplanation": "Vĩ tố liên kết dùng để gợi mở bối cảnh, tiền đề cho câu nói tiếp theo hoặc diễn tả sự tương phản ('nhưng mà', 'thế nhưng').",
    "longExplanation": "'~인데' (gắn sau danh từ) và '~는데 / -(으)ㄴ데' (gắn sau động từ, tính từ) là một trong những vĩ tố liên kết phổ biến và quan trọng nhất trong tiếng Hàn. Cấu trúc này thường dùng để: (1) Nêu lên bối cảnh, hoàn cảnh nền tảng trước khi đưa ra câu hỏi, mệnh lệnh, gợi ý ở vế sau; (2) Diễn tả sự đối lập, tương phản nhẹ nhàng giữa hai sự việc; (3) Giải thích nguyên nhân hoặc dẫn nhập thông tin mới. Sau danh từ có phụ âm cuối dùng '-인데', không phụ âm cuối dùng '-ㄴ데' hoặc '-인데'.",
    "formation": "Danh từ (có phụ âm cuối: -인데 / không có phụ âm cuối: -ㄴ데); Thân động từ / 있다·없다 + -는데; Thân tính từ (kết thúc bằng phụ âm: -은데 / nguyên âm: -ㄴ데); Thì quá khứ: -았/었는데",
    "examples": [
      {
        "translation": "Tôi phải đi làm thêm nhưng lại không có thời gian, vì thế tôi cần tìm cách sử dụng thời gian sao cho hiệu quả."
      },
      {
        "translation": "Tôi thích lập trình, nhưng vì khó hiểu nên tôi thường hay bị nhầm lẫn bối rối."
      },
      {
        "translation": "Thời tiết đẹp thế mà tôi không có kế hoạch ra ngoài nên đã ở nhà xem phim."
      },
      {
        "translation": "Ngày mai có bài kiểm tra mà tôi vẫn chưa học gì cả, chắc phải thức trắng đêm ôn bài thôi."
      }
    ]
  },
  "ko_인데다_108": {
    "title": "~(으)ㄴ/는 데다(가) / ~인데다 (Thêm vào đó, hơn nữa, không những... mà còn)",
    "shortExplanation": "Biểu thị sự bổ sung, gia tăng trạng thái hoặc lý do; không những có đặc điểm này mà thêm vào đó còn có đặc điểm khác ('hơn nữa', 'lại còn').",
    "longExplanation": "'~인데다' (đi với danh từ) hoặc '~-(으)ㄴ/는 데다(가)' (đi với động từ, tính từ) là cấu trúc dùng để diễn đạt một trạng thái hoặc sự việc khác tiếp tục được cộng thêm vào nội dung vốn đã có ở vế trước. Thường hai vế phải cùng tính chất (cùng mang ý tích cực hoặc cùng mang ý tiêu cực). Tiểu từ '-가' có thể được thêm vào sau '데다' để nhấn mạnh thêm sự bổ sung này.",
    "formation": "Danh từ + -인데다(가); Thân động từ (hiện tại: -는 데다 / quá khứ: -(으)ㄴ 데다); Thân tính từ + -(으)ㄴ 데다(가)",
    "examples": [
      {
        "translation": "Cô ấy không chỉ xinh đẹp mà lại còn thông minh, thêm vào đó tấm lòng cũng vô cùng nhân hậu."
      },
      {
        "translation": "Chiếc điện thoại này tính năng đa dạng, thêm vào đó giá cả lại rẻ nên được rất nhiều người tìm mua."
      },
      {
        "translation": "Quán ăn này không những ngon mà vị trí lại thuận tiện nên khách tìm đến rất đông."
      },
      {
        "translation": "Anh ấy là một ca sĩ xuất sắc, hơn nữa lại có khả năng sáng tác âm nhạc và năng lực lãnh đạo cũng rất tuyệt vời."
      }
    ]
  },
  "ko_인지_109": {
    "title": "~(으)ㄴ/는지 / ~인지 (Liệu rằng, có... hay không, nghi vấn gián tiếp)",
    "shortExplanation": "Vĩ tố liên kết tạo mệnh đề nghi vấn gián tiếp, biểu thị sự hoài nghi, không chắc chắn hoặc phân vân ('liệu có phải...', 'hay không').",
    "longExplanation": "'~인지' (dùng cho danh từ) và '~-(으)ㄴ/는지' (dùng cho tính từ, động từ) là vĩ tố liên kết đóng vai trò tạo mệnh đề phụ biểu thị sự không chắc chắn, phân vân hoặc câu hỏi gián tiếp. Cấu trúc này thường đi kèm với các từ để hỏi (ai, cái gì, ở đâu, khi nào, như thế nào) hoặc đi theo cặp '~는지 아닌지 / ~인지 아닌지' (có hay không). Vế sau thường kết hợp với các động từ chỉ nhận thức như '알다' (biết), '모르다' (không biết), '궁금하다' (tò mò), '고민이다' (lo nghĩ, phân vân), '판단하다' (phán đoán).",
    "formation": "Danh từ (có phụ âm cuối: -인지 / không phụ âm cuối: -인지 hoặc -ㄴ지); Thân động từ (hiện tại: -는지 / quá khứ: -았/었는지 / tương lai: -(으)ㄹ지); Thân tính từ + -(으)ㄴ지",
    "examples": [
      {
        "translation": "Tôi không biết chắc liệu anh ấy có đến hay không."
      },
      {
        "translation": "Tôi đang phân vân không biết liệu có nên mua chiếc xe hơi đó hay không."
      },
      {
        "translation": "Thật khó để quyết định xem nên mặc bộ quần áo nào."
      },
      {
        "translation": "Rất khó để phán đoán xem anh ấy có thật lòng hay không."
      }
    ]
  },
  "ko_자_111": {
    "title": "~자 (Cùng... nào, hãy cùng... - câu rủ rê thân mật)",
    "shortExplanation": "Vĩ tố kết thúc câu thể rủ rê, đề nghị thân mật (thể 해라체 / 반말), dùng để rủ đối phương cùng làm một việc gì đó ('cùng... nhé', 'nào').",
    "longExplanation": "'~자' là vĩ tố kết thúc câu thể thỉnh dụ (rủ rê, đề nghị) thuộc lối nói thân mật (thể 해라체 / 반말) trong tiếng Hàn. Người nói sử dụng cấu trúc này gắn vào thân động từ hành động để đề xuất bản thân và người nghe cùng thực hiện một hành động chung. Vì mang sắc thái thân mật, tự nhiên nên cấu trúc chỉ được dùng với bạn bè đồng trang lứa, người ít tuổi hơn hoặc người trong mối quan hệ cực kỳ thân thiết; tuyệt đối không dùng với người lớn tuổi hoặc người có địa vị cao hơn.",
    "formation": "Thân động từ + -자",
    "examples": [
      {
        "translation": "Ra ngoài sân chơi đùa đi nào. Hôm nay thời tiết đẹp thế này, chỉ ở lì trong nhà thì tiếc lắm."
      },
      {
        "translation": "Tối nay cùng ăn cơm nhé. Tôi sẽ giúp bạn chuẩn bị một chút cho ngày mai."
      },
      {
        "translation": "Đi chơi trò chơi điện tử đi. Cứ ở nhà là căng thẳng dồn ứ lại đấy, ra ngoài hóng gió một lát nào."
      },
      {
        "translation": "Đến hiệu sách chọn vài cuốn sách đi. Tự mình nhìn tận mắt thú vị hơn là tìm trên mạng nhiều."
      }
    ]
  },
  "ko_자마자_112": {
    "title": "~자마자 (Ngay khi, vừa mới... thì đã...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị một hành động xảy ra ngay lập tức sau khi hành động trước vừa kết thúc, không có khoảng cách thời gian ('vừa mới... là đã...').",
    "longExplanation": "'~자마자' là vĩ tố liên kết gắn trực tiếp vào thân động từ hành động để diễn tả hành động ở vế sau diễn ra ngay tức khắc ngay khi hành động ở vế trước vừa hoàn tất. Cấu trúc nhấn mạnh tính tức thời và không có sự ngắt quãng thời gian giữa hai sự việc. Thân động từ không cần chia thì quá khứ hay tương lai, thì của toàn câu sẽ được thể hiện ở vĩ tố kết thúc câu ở vế sau.",
    "formation": "Thân động từ + -자마자",
    "examples": [
      {
        "translation": "Vừa về đến nhà từ trường là tôi đã làm bài tập ngay."
      },
      {
        "translation": "Vừa thưởng thức bữa tối ngon miệng vừa xem tivi một cái là tâm trạng tôi đã thấy tốt hơn hẳn."
      },
      {
        "translation": "Máy bay vừa hạ cánh là tôi gọi điện ngay cho gia đình."
      },
      {
        "translation": "Vừa đến chỗ làm là tôi uống cà phê ngay."
      }
    ]
  },
  "ko_장_113": {
    "title": "~장 [張] (Tờ, tấm, lá, bức - lượng từ đếm vật mỏng phẳng)",
    "shortExplanation": "Danh từ phụ thuộc làm lượng từ (từ chỉ đơn vị) dùng để đếm các vật mỏng, dẹt như giấy, vé, tranh ảnh, danh thiếp ('tờ', 'tấm', 'bức').",
    "longExplanation": "'~장 (張)' là danh từ phụ thuộc chỉ đơn vị số lượng trong tiếng Hàn, chuyên dùng để đếm những sự vật có hình dạng mỏng, phẳng và dẹt như tờ giấy, trang vở, tấm vé, bức ảnh, chiếc thẻ ngân hàng hoặc lá bài. Khi đếm, từ này có thể kết hợp với số từ thuần Hàn (한 장, 두 장, 세 장...) hoặc số từ Hán Hàn (trong văn bản hoặc số lượng lớn). Cấu trúc thường gặp là 'Danh từ + Số từ + 장' hoặc 'Số từ + 장 + Danh từ'.",
    "formation": "Số từ (thuần Hàn hoặc Hán Hàn) + 장 (+ Danh từ) hoặc Danh từ + Số từ + 장",
    "examples": [
      {
        "translation": "Tôi nghĩ mình cần mua 3 tấm vé cho chuyến du lịch lần này."
      },
      {
        "translation": "Tôi đã phát 10 trang vở cho các học sinh."
      },
      {
        "translation": "Chúng tôi đã quyết định làm một cuốn album kỷ niệm bằng 100 bức ảnh."
      },
      {
        "translation": "Cuối cùng, xin hãy rút một chiếc thẻ."
      }
    ]
  },
  "ko_저_114": {
    "title": "저 / 저런 / 저렇게 (Kia, đó, như thế kia, kiểu thế kia)",
    "shortExplanation": "Từ chỉ thị viễn xưng dùng để chỉ người, sự vật, trạng thái hoặc phương thức ở xa cả người nói lẫn người nghe ('kia', 'như thế kia').",
    "longExplanation": "'저' là định từ viễn xưng chỉ người hoặc vật ở xa cả vị trí của người nói và người nghe ('kia'). Từ hệ thống này phát triển ra các từ chỉ thị tính chất và trạng thái như định từ '저런' (kiểu như thế kia, dạng đó) bắt nguồn từ tính từ '저렇다' (như thế kia), và phó từ '저렇게' (một cách như thế kia). Ngoài ra, cụm từ cố định '그런 저런' mang nghĩa 'chuyện nọ chuyện kia, lý do này nọ'.",
    "formation": "저 + Danh từ; 저런 + Danh từ; 저렇다 → 저렇게 + Động từ / Tính từ; Cụm từ: 그런 저런 + Danh từ",
    "examples": [
      {
        "translation": "Vì lý do này lý do nọ mà anh ấy trông không có vẻ gì là hạnh phúc."
      },
      {
        "translation": "Nhìn chiếc xe kiểu kia tôi thấy ghen tị thật đấy. Tôi cũng muốn có một chiếc xe như thế."
      },
      {
        "translation": "Tôi không ngờ cô ấy lại nói ra những lời như thế kia."
      },
      {
        "translation": "Liệu tôi có thể gánh vác được công việc như thế kia không nhỉ?"
      }
    ]
  },
  "ko_전_115": {
    "title": "~기 전에 / ~전 (Trước khi, trước)",
    "shortExplanation": "Biểu thị mốc thời gian hoặc hành động xảy ra trước một sự kiện, thời điểm khác ('trước khi...').",
    "longExplanation": "'전' là danh từ chỉ mốc thời gian xảy ra trước. Khi kết hợp với danh từ chỉ thời gian hoặc sự kiện, sử dụng cấu trúc 'Danh từ + 전(에)' (ví dụ: 한 시간 전에 - một tiếng trước, 식사 전에 - trước bữa ăn). Khi kết hợp với thân động từ, thân động từ phải được biến đổi thành danh từ bằng vĩ tố danh từ hóa '-기' tạo thành cấu trúc 'Thân động từ + -기 전에' (trước khi làm gì). Cấu trúc này không phụ thuộc vào thì của câu, thì được chia ở cuối câu.",
    "formation": "Danh từ + 전(에); Thân động từ + -기 전(에)",
    "examples": [
      {
        "translation": "Tôi luôn ăn sáng trước khi đi học."
      },
      {
        "translation": "Tôi đã chuẩn bị sẵn toàn bộ tài liệu trước khi cuộc họp bắt đầu."
      },
      {
        "translation": "Tôi rất muốn học nhưng trước khi kỳ thi kết thúc thì tôi không có chút thời gian nào."
      },
      {
        "translation": "Trước khi về nhà, tôi phải ghé siêu thị mua đồ ăn."
      }
    ]
  },
  "ko_적_116": {
    "title": "~(으)ㄴ 적 / ~적 (Khi, lúc, thời điểm - hoặc trải nghiệm từng làm gì)",
    "shortExplanation": "Danh từ phụ thuộc chỉ thời điểm trong quá khứ hoặc trải nghiệm đã từng diễn ra ('lúc...', 'hồi...', 'từng').",
    "longExplanation": "'적' là danh từ phụ thuộc trong tiếng Hàn biểu thị một thời điểm hoặc sự việc đã qua trong quá khứ. Cấu trúc này xuất hiện phổ biến trong hai trường hợp: (1) Kết hợp với định ngữ để chỉ một giai đoạn hay khoảnh khắc quá khứ (như '어릴 적에' - hồi còn nhỏ, '배울 적에' - khi đang học); (2) Kết hợp với vĩ tố định ngữ quá khứ để tạo cấu trúc chỉ kinh nghiệm từng trải '-(으)ㄴ 적이 있다/없다' (đã từng / chưa từng làm gì trong quá khứ).",
    "formation": "Thân động từ / Thân tính từ + -(으)ㄹ/ㄴ 적(에); Cụm từ cố định: 어릴 적(에); Cấu trúc trải nghiệm: Thân động từ + -(으)ㄴ 적이 있다/없다",
    "examples": [
      {
        "translation": "Khi còn nhỏ tôi từng muốn nuôi một chú mèo cưng, nhưng bố mẹ đã không đồng ý."
      },
      {
        "translation": "Lúc mới bắt đầu học tiếng Hàn, việc nói chuyện thực sự rất khó khăn."
      },
      {
        "translation": "Những khi cô ấy mỉm cười, tôi luôn có cảm giác bản thân trở nên ngập tràn hạnh phúc."
      },
      {
        "translation": "Hồi cấp ba, khi tham dự lễ tốt nghiệp, tất cả chúng tôi đều biết rằng đó là lần cuối cùng nên đã nức nở khóc."
      }
    ]
  },
  "ko_죠_117": {
    "title": "~죠 / ~지요 (Đúng không, phải không, chứ nhỉ)",
    "shortExplanation": "Vĩ tố kết thúc câu dùng để hỏi xác nhận hoặc tìm kiếm sự đồng tình từ người nghe về điều người nói đã biết hoặc suy đoán ('đúng không?', 'chứ?').",
    "longExplanation": "'~죠' là dạng rút gọn trong khẩu ngữ hàng ngày của vĩ tố kết thúc câu '~지요'. Cấu trúc này được người nói sử dụng khi muốn xác nhận lại một sự việc mà mình tin là người nghe cũng biết hoặc đồng ý, tương tự như câu hỏi đuôi trong tiếng Việt ('phải không nhỉ?', 'đúng chứ?'). Nó cũng thể hiện thái độ thân thiện, nhẹ nhàng và gợi mở sự đồng cảm từ đối phương. Đi với danh từ thì dùng '-이죠 / -죠', thì quá khứ dùng '-았/었죠', thì tương lai/dự đoán dùng '-(으)ㄹ 거죠'.",
    "formation": "Thân động từ / Thân tính từ + -죠 (nguyên dạng: -지요); Danh từ (có phụ âm cuối: -이죠 / không có phụ âm cuối: -죠); Thì quá khứ: -았/었죠; Thì tương lai: -(으)ㄹ 거죠",
    "examples": [
      {
        "translation": "Hôm nay thời tiết đẹp đúng không?"
      },
      {
        "translation": "Bộ phim hay lắm đúng không?"
      },
      {
        "translation": "Cô ấy xinh đẹp đúng không nào?"
      },
      {
        "translation": "Chúng ta sẽ sớm gặp lại nhau, đúng chứ?"
      }
    ]
  },
  "ko_지_118": {
    "title": "~지 않을까 (Liệu có phải là..., chẳng phải là... hay sao)",
    "shortExplanation": "Dùng để đưa ra suy đoán, phỏng đoán dè dặt hoặc tự hỏi về một khả năng có thể xảy ra ('liệu có...', 'chẳng phải là... hay sao').",
    "longExplanation": "'~지 않을까' là đuôi câu kết hợp giữa dạng phủ định '-지 않다' và đuôi phỏng đoán nghi vấn '-(으)ㄹ까'. Nó dùng để diễn tả suy đoán hoặc nhận định thận trọng, khiêm nhường của người nói về một khả năng, sự việc nào đó, tương đương với 'liệu có chăng...', 'chẳng phải là... sao', 'có lẽ là... chăng'. Cấu trúc này thường đi kèm với các cụm như '생각하다' (nghĩ rằng), '싶다' (thấy dường như), '궁금하다' (tò mò), '기대하다' (kỳ vọng).",
    "formation": "Thân động từ / Thân tính từ + 지 않을까 (생각하다/싶다/하다)",
    "examples": [
      {
        "translation": "Tôi nghĩ có lẽ tối nay trời sẽ mưa đấy, vì bầu trời xám xịt hoàn toàn rồi."
      },
      {
        "translation": "Tôi tự hỏi không biết liệu cô ấy có đang nghĩ về tôi không, vì lâu lắm rồi chúng tôi mới gặp lại nhau."
      },
      {
        "translation": "Tôi hy vọng rằng liệu ngày mai kỳ thi có bị hủy không, vì hôm qua tôi đã học bài đến quá khuya."
      },
      {
        "translation": "Tôi nghĩ rằng nếu giờ về nhà thì chẳng phải bố đã nấu sẵn bữa tối rồi hay sao, vì hôm nay là sinh nhật tôi mà."
      }
    ]
  },
  "ko_지_119": {
    "title": "~지 않아도 되다 (Không cần phải... / Không làm... cũng được)",
    "shortExplanation": "Biểu thị sự cho phép không cần làm một hành động nào đó, hoặc hành động đó không mang tính bắt buộc ('không phải...', 'không cần... cũng được').",
    "longExplanation": "'~지 않아도 되다' là cấu trúc biểu thị sự giải trừ nghĩa vụ hoặc sự không cần thiết. Cấu trúc này được tạo thành từ vĩ tố phủ định '-지 않다', trợ từ nhấn mạnh hoặc nhượng bộ '-아/어도' (cho dù) và động từ '되다' (được, ổn), mang ý nghĩa đen là 'cho dù không làm việc đó thì cũng được hoặc không sao'. Dùng khi người nói muốn giải tỏa áp lực cho người nghe, cho phép hoặc khuyên đối phương rằng việc đó không bắt buộc phải thực hiện.",
    "formation": "Thân động từ + 지 않아도 되다",
    "examples": [
      {
        "translation": "Cậu không cần phải quá lo lắng đâu. Mọi chuyện rồi sẽ tốt đẹp cả thôi."
      },
      {
        "translation": "Vì đã thi đỗ kỳ thi rồi nên cậu không cần phải học bài thêm nữa đâu."
      },
      {
        "translation": "Chúng ta không nhất thiết phải từ bỏ tất cả mọi thứ vì người khác đâu."
      },
      {
        "translation": "Dù trời có mưa thì cậu cũng không cần phải chỉ biết quanh quẩn ở nhà đâu."
      }
    ]
  },
  "ko_지만_120": {
    "title": "~지만 (Nhưng mà, tuy... nhưng)",
    "shortExplanation": "Vĩ tố liên kết biểu thị sự tương phản, đối lập giữa hai mệnh đề ('nhưng', 'tuy... nhưng').",
    "longExplanation": "'~지만' là một trong những vĩ tố liên kết mang tính đối lập, tương phản quan trọng nhất trong tiếng Hàn. Cấu trúc này dùng để nối hai mệnh đề, trong đó vế trước nêu lên một sự việc hay sự thật, còn vế sau đưa ra nội dung trái ngược, mâu thuẫn hoặc nằm ngoài dự tính so với vế trước. Kết hợp trực tiếp vào thân động từ, thân tính từ hoặc đi sau trợ từ vị ngữ '-(이)지만'. Ở thì quá khứ dùng '-았/었지만'.",
    "formation": "Thân động từ / Thân tính từ + 지만; Danh từ (kết thúc bằng nguyên âm: -지만 / phụ âm: -이지만); Thì quá khứ: -았/었지만",
    "examples": [
      {
        "translation": "Hôm nay tôi đã thức dậy sớm nhưng vẫn bị muộn học. Là vì tôi đã bị lỡ chuyến xe buýt."
      },
      {
        "translation": "Tôi học rất nhiều nhưng vẫn chưa hiểu rõ bài lắm."
      },
      {
        "translation": "Cheolsu chiều cao khiêm tốn nhưng lại là một người vô cùng khỏe khoắn và mạnh mẽ."
      },
      {
        "translation": "Món ăn ở đây ngon nhưng giá cả lại quá đắt đỏ."
      }
    ]
  },
  "ko_지요_121": {
    "title": "~지요 / ~죠 (...đúng không?, ...phải không?, ...nhỉ?)",
    "shortExplanation": "Vĩ tố kết thúc câu thân mật, lịch sự dùng để hỏi xác nhận hoặc tìm kiếm sự đồng thuận từ người nghe ('...đúng không?', '...phải không?').",
    "longExplanation": "'~지요' (trong văn nói thân mật thường được rút gọn thành '~죠') là vĩ tố kết thúc câu dùng khi người nói muốn kiểm tra, xác nhận lại một sự việc mà bản thân tin rằng đối phương cũng đã biết, hoặc muốn đối phương đồng tình với suy nghĩ của mình. Nó đóng vai trò tạo cảm giác thân thiện, nhẹ nhàng và gợi mở sự kết nối, đồng cảm trong giao tiếp thường nhật.",
    "formation": "Thân động từ / Thân tính từ + 지요; Danh từ (kết thúc bằng nguyên âm: -지요 / phụ âm: -이지요); Thì quá khứ: -았/었지요",
    "examples": [
      {
        "translation": "Thời tiết đã trở nên rất lạnh rồi đúng không nhỉ? Chúng ta nên mang theo khăn quàng cổ thôi."
      },
      {
        "translation": "Tuần sau chúng ta có bài thi phải không? Chắc mình phải bắt đầu học bài ngay thôi."
      },
      {
        "translation": "Cuối tuần này chúng mình đã hẹn đi cắm trại cùng bạn bè đúng không nào? Mình nghĩ có lẽ cần chuẩn bị kỹ càng hơn một chút đấy."
      },
      {
        "translation": "Dạo này công việc nhiều nên cậu vất vả lắm đúng không? Có vẻ như đây là lúc cậu thực sự cần được nghỉ ngơi rồi."
      }
    ]
  },
  "ko_진_122": {
    "title": "~진 않지만 / ~지는 않지만 (Tuy không hẳn là... nhưng, dù không... nhưng)",
    "shortExplanation": "Diễn tả sự phủ định mang tính nhấn mạnh hoặc phủ định một phần, vế sau bổ sung khía cạnh tích cực hoặc thực tế ('tuy không... nhưng mà').",
    "longExplanation": "'~진 않지만' là dạng rút gọn trong khẩu ngữ của cấu trúc '~지는 않지만' (được tạo bởi vĩ tố phụ thuộc '-지', trợ từ đối chiếu nhấn mạnh '-는' và vĩ tố liên kết đối lập '-않지만'). Cấu trúc này dùng khi người nói muốn thừa nhận một khía cạnh chưa đạt đến mức độ kỳ vọng hoặc không hoàn toàn đúng, nhưng vế sau lập tức đưa ra một điểm bù đắp, điểm mạnh hoặc sự thật đáng ghi nhận khác.",
    "formation": "Thân động từ / Thân tính từ + 진 않지만 (dạng đầy đủ: -지는 않지만)",
    "examples": [
      {
        "translation": "Bộ phim cậu thích đó, với tớ tuy không thú vị lắm nhưng cũng đáng xem."
      },
      {
        "translation": "Những lời anh ấy nói tuy không hẳn là quá trọng đại, nhưng biết trước được thì cũng tốt thôi."
      },
      {
        "translation": "Cặp kính râm cậu tặng tớ tuy không được đẹp mắt lắm nhưng lại khá là hữu dụng."
      },
      {
        "translation": "Cô ấy tuy chưa hẳn là quá nổi tiếng nhưng chắc chắn là người tràn đầy tài năng."
      }
    ]
  },
  "ko_쯤_123": {
    "title": "~쯤 (Khoảng, chừng, tầm / Ước lượng đại khái)",
    "shortExplanation": "Trợ từ đi sau danh từ chỉ thời gian, số lượng hoặc mức độ để biểu thị sự ước lượng, phỏng đoán ('khoảng chừng...', 'tầm...').",
    "longExplanation": "'~쯤' là trợ từ gắn trực tiếp sau các danh từ hoặc số từ chỉ thời gian, địa điểm, số lượng, kích thước hoặc mức độ nhằm đưa ra con số ước chừng, phỏng đoán chứ không khẳng định tuyệt đối. Thường tương đương với 'khoảng', 'chừng', 'tầm' trong tiếng Việt. Khi dùng kèm với phó từ '약' (khoảng) ở trước danh từ, nó càng làm rõ thêm sắc thái ước lượng.",
    "formation": "Danh từ / Số từ + 쯤",
    "examples": [
      {
        "translation": "Tôi nghĩ khoảng 3 giờ chiều mình sẽ đến công ty."
      },
      {
        "translation": "Hôm qua cô ấy đã ăn khoảng chừng mười chiếc bánh quy."
      },
      {
        "translation": "Từ đây đi bộ đến trường chắc sẽ mất khoảng 15 phút."
      },
      {
        "translation": "Anh ấy đã đọc được khoảng 500 trang rồi nên có vẻ sẽ sớm đọc xong cuốn sách."
      }
    ]
  },
  "ko_처럼_124": {
    "title": "~처럼 (Như, giống như / Trợ từ so sánh)",
    "shortExplanation": "Trợ từ so sánh gắn sau danh từ biểu thị hình dáng, tính chất hoặc trạng thái tương tự như đối tượng được so sánh ('như...', 'giống như...').",
    "longExplanation": "'~처럼' là trợ từ so sánh trong tiếng Hàn, được gắn trực tiếp vào danh từ để thể hiện sự tương đồng về ngoại hình, phong thái, bản chất hoặc hành động giữa hai đối tượng. Khi muốn so sánh với một hành động hay sự việc hoàn chỉnh, cấu trúc này kết hợp với vĩ tố định từ và danh từ phụ thuộc '것' tạo thành cụm '-(으)ㄴ/는 것처럼' (giống như việc...).",
    "formation": "Danh từ + 처럼; Mệnh đề định từ + 것 + 처럼",
    "examples": [
      {
        "translation": "Cô ấy có vẻ ngoài xinh xắn giống như một thiên thần vậy. Khuôn mặt rất đẹp và trông thật thuần khiết."
      },
      {
        "translation": "Món ăn này ngon giống như mẹ tôi nấu vậy. Đậm đà hương vị cơm nhà."
      },
      {
        "translation": "Trông anh ấy giống hệt như người tôi từng thấy trong giấc mơ khiến tôi vô cùng kinh ngạc."
      },
      {
        "translation": "Khi mặt trời mọc, tâm trạng tôi cảm thấy sảng khoái giống như thể một thế giới hoàn toàn mới vừa được mở ra."
      }
    ]
  },
  "ko_층_125": {
    "title": "~층 (Tầng... / Đơn vị đếm số tầng tòa nhà)",
    "shortExplanation": "Danh từ phụ thuộc kết hợp với số từ Hán Hàn để đếm hoặc chỉ số tầng của tòa nhà ('tầng...').",
    "longExplanation": "'~층' (chữ Hán: 層) là danh từ phụ thuộc chỉ đơn vị số tầng của các công trình kiến trúc. Trong tiếng Hàn, '~층' luôn luôn kết hợp với hệ thống số từ Hán Hàn (일, 이, 삼, 사, 오... / 1, 2, 3, 4, 5...) chứ không dùng số thuần Hàn. Ví dụ: 1층, 15층, 20층. Khi muốn nói tầng hầm, người ta dùng '지하 ~층' (ví dụ: 지하 1층).",
    "formation": "Số từ Hán Hàn + 층 (hoặc Số Ả Rập + 층)",
    "examples": [
      {
        "translation": "Nhà của chúng tôi nằm ở tầng 15 của tòa nhà chung cư."
      },
      {
        "translation": "Công ty nằm ở tầng 20 của tòa nhà cao tầng nên tầm nhìn thực sự rất đẹp."
      },
      {
        "translation": "Nếu không có thang máy thì sẽ phải đi bộ leo lên tận tầng 10."
      },
      {
        "translation": "Cấu trúc căn hộ thông tầng thông thường được thiết kế thành kết cấu 2 tầng."
      }
    ]
  },
  "ko__126": {
    "title": "~(으)ㄹ지 (모르다) (Không biết chừng là..., liệu có... hay không)",
    "shortExplanation": "Vĩ tố liên kết mang tính nghi vấn hoặc phỏng đoán, thường đi cùng '모르다' để diễn tả sự không chắc chắn ('không biết liệu có... hay không').",
    "longExplanation": "'~(으)ㄹ지' là vĩ tố liên kết diễn tả sự ngờ vực, phân vân hoặc phỏng đoán về một sự việc chưa rõ ràng. Cấu trúc này thường xuyên kết hợp với các động từ chỉ nhận thức như '모르다' (không biết), '궁금하다' (thắc mắc), '생각하다' (nghĩ) tạo thành mẫu câu phổ biến '~(으)ㄹ지 모르겠다/몰랐다' để biểu đạt 'không biết liệu có... hay không' hoặc 'tôi không ngờ là...'. Thân động từ hoặc tính từ kết thúc bằng nguyên âm hoặc phụ âm 'ㄹ' đi với '-ㄹ지', kết thúc bằng phụ âm khác đi với '-을지'.",
    "formation": "Thân động từ / Thân tính từ (kết thúc bằng nguyên âm hoặc ㄹ: -ㄹ지 / phụ âm: -을지) + 모르다/알다; Danh từ (kết thúc bằng nguyên âm: -ㄹ지 / phụ âm: -일지)",
    "examples": [
      {
        "translation": "Hôm nay không biết chừng trời có mưa hay không nữa, ban sáng thì trời trong xanh lắm."
      },
      {
        "translation": "Tôi không biết liệu học sinh đó có thi đỗ hay không, vì em ấy không học tập chăm chỉ."
      },
      {
        "translation": "Tôi đã không ngờ rằng cô ấy lại có thể ăn nhiều đến mức này, vì bình thường lúc nào cô ấy cũng chỉ ăn một chút thôi."
      },
      {
        "translation": "Tôi vẫn chưa thực sự biết liệu người ấy có yêu tôi hay không, tôi vẫn chưa hiểu rõ được lòng người ấy."
      }
    ]
  },
  "ko_마다_127": {
    "title": "~마다 (Mỗi, mọi, từng / Tính chu kỳ và bao hàm)",
    "shortExplanation": "Trợ từ gắn sau danh từ biểu thị sự lặp đi lặp lại có tính chu kỳ hoặc bao hàm tất cả không bỏ sót đối tượng nào ('mỗi...', 'mọi...').",
    "longExplanation": "'~마다' là trợ từ gắn trực tiếp sau danh từ để thể hiện hai ý nghĩa chính: (1) Tính chu kỳ lặp lại theo khoảng thời gian hoặc đơn vị quy định ('mỗi ngày', 'mỗi tuần', 'mỗi tháng'); (2) Tính phổ quát toàn diện, bao hàm tất cả các đối tượng cùng loại mà không có ngoại lệ ('mỗi người', 'mọi nhà', 'mỗi nơi'). Khác với '매-' là tiền tố (như 매일, 매주), '~마다' là trợ từ đứng sau danh từ và có thể kết hợp cùng nhau để nhấn mạnh ('매일 아침마다').",
    "formation": "Danh từ + 마다",
    "examples": [
      {
        "translation": "Tôi tập thể dục vào mỗi thứ Bảy hàng tuần. Tập thể dục đều đặn như thế này rất tốt cho sức khỏe."
      },
      {
        "translation": "Cậu ấy học tiếng Hàn mỗi tuần hai lần, vì thế kỹ năng tiếng Hàn đang tiến bộ rất nhanh."
      },
      {
        "translation": "Mỗi buổi sáng hàng ngày chúng tôi đều gặp nhau và dùng bữa cùng nhau. Đây là thói quen thường nhật của chúng tôi."
      },
      {
        "translation": "Vào mỗi Chủ nhật tuần cuối cùng hàng tháng cô ấy đều tụ họp cùng gia đình. Trải qua thời gian như vậy là phong cách của cô ấy."
      }
    ]
  },
  "ko__128": {
    "title": "~(으)ㄹ 테니까 (Vì tôi sẽ... nên / Vì chắc là... nên)",
    "shortExplanation": "Biểu thị lý do dựa trên ý chí, dự định của người nói hoặc sự suy đoán chắc chắn, làm tiền đề để đưa ra đề nghị hoặc hành động ở vế sau ('vì sẽ... nên', 'vì chắc là... nên').",
    "longExplanation": "'~(으)ㄹ 테니까' là cấu trúc liên kết kết hợp giữa hình thức suy đoán hoặc ý chí '-(으)ㄹ 터이다' và vĩ tố liên kết chỉ lý do '-니까'. Cấu trúc này có 2 cách dùng phổ biến: (1) Khi chủ ngữ là ngôi thứ nhất: biểu thị ý chí, sự cam kết hoặc dự định của người nói để làm lý do và tiền đề yêu cầu người nghe thực hiện một hành động ở vế sau ('Tôi sẽ làm việc này nên bạn hãy...'); (2) Khi chủ ngữ là ngôi thứ hai, thứ ba hoặc sự vật: biểu thị sự suy đoán mạnh mẽ, có căn cứ của người nói để làm cơ sở đưa ra lời khuyên hoặc gợi ý ở vế sau ('Chắc hẳn là... nên hãy...').",
    "formation": "Thân động từ / Thân tính từ (kết thúc bằng nguyên âm hoặc ㄹ: -ㄹ 테니까 / phụ âm: -을 테니까); Thì quá khứ: -았/었을 테니까",
    "examples": [
      {
        "translation": "Chắc hẳn là cậu đang rất đói bụng rồi nên chúng ta hãy nhanh chóng đến nhà hàng ăn chút gì đó đi."
      },
      {
        "translation": "Vì cậu chắc đã ôn tập rất nhiều để làm tốt bài thi nên nhất định cậu sẽ đạt được điểm số cao thôi."
      },
      {
        "translation": "Chúng tôi sẽ sớm giải quyết vấn đề này nên xin các bạn hãy vui lòng đợi thêm một chút."
      },
      {
        "translation": "Tôi sẽ đến ngay đây nên cậu cứ chuẩn bị trước đi nhé."
      }
    ]
  },
  "ko_편이다_129": {
    "title": "~(으)ㄴ/는 편이다 (Thuộc dạng..., thuộc diện..., khá là...)",
    "shortExplanation": "Biểu thị một tính chất, thói quen hoặc trạng thái nghiêng về một phía nào đó chứ không khẳng định tuyệt đối ('thuộc dạng...', 'khá là...').",
    "longExplanation": "'~(으)ㄴ/는 편이다' là cấu trúc dùng để diễn đạt rằng chủ ngữ có xu hướng, thói quen hoặc đặc điểm nghiêng về một bên nào đó khi so sánh trên một bình diện chung, tránh lối nói quả quyết tuyệt đối. '편' ở đây là danh từ phụ thuộc mang nghĩa 'phía, bên, chiều hướng'. Đi với động từ thì hiện tại dùng '-는 편이다', thì quá khứ dùng '-(으)ㄴ 편이다'; đi với tính từ dùng '-(으)ㄴ 편이다'. Mang nghĩa tương đương với 'thuộc diện...', 'thuộc tuýp...', 'khá là...' trong tiếng Việt.",
    "formation": "Động từ (thì hiện tại: -는 편이다 / thì quá khứ: -(으)ㄴ 편이다); Tính từ (kết thúc bằng nguyên âm: -ㄴ 편이다 / phụ âm: -은 편이다)",
    "examples": [
      {
        "translation": "Tôi thuộc dạng thích mùa đông hơn mùa hè rất nhiều. Vì tôi rất thích cảnh tuyết rơi dày."
      },
      {
        "translation": "Việc trò chuyện trực tiếp với mọi người đối với tôi thuộc diện khá là khó khăn, nên thông thường tôi liên lạc qua tin nhắn trước."
      },
      {
        "translation": "Từ nhỏ tôi đã thuộc tuýp thích giải các bài toán. Vì thế sau này tôi từng muốn trở thành giáo viên dạy toán."
      },
      {
        "translation": "Tôi thuộc tuýp người thích đồ ăn cay, nên thường xuyên ăn mì gói cay."
      }
    ]
  },
  "ko_하다가_130": {
    "title": "~다가 / ~하다가 (Đang... thì..., vừa... thì...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị một hành động hoặc trạng thái đang diễn ra thì bị gián đoạn, chuyển biến hoặc có hành động khác xen vào ('đang... thì...').",
    "longExplanation": "'~다가' (đối với các động từ có đuôi 하다 là '~하다가') là vĩ tố liên kết biểu thị một hành vi hoặc trạng thái đang trên đà diễn tiến thì bất ngờ dừng lại hoặc bị ngắt quãng, nhường chỗ cho một hành động hay sự biến đổi khác xảy ra. Thường dùng khi sự việc ở vế sau xuất hiện bất ngờ ngoài kế hoạch. Ở thì quá khứ dùng dạng '-았/었다가' để biểu thị hành động trước đã hoàn tất trọn vẹn rồi mới chuyển sang một hành động trái ngược hoặc khác biệt.",
    "formation": "Thân động từ + 다가 (đối với động từ 하다: -하다가); Thì quá khứ: -았/었다가",
    "examples": [
      {
        "translation": "Tôi đang làm bài tập về nhà thì bạn tôi gọi điện thoại rủ đi chơi."
      },
      {
        "translation": "Tôi đang đi dạo vào lúc rạng sáng thì bất ngờ trời đổ mưa."
      },
      {
        "translation": "Hôm qua tôi đang ngồi đọc sách ở bên ngoài thì bỗng nhiên thấy đói bụng cồn cào."
      },
      {
        "translation": "Tôi đang lắng nghe âm nhạc thì có một bài hát rất hợp tâm trạng khiến tôi cảm thấy phấn chấn hẳn lên."
      }
    ]
  },
  "ko_하면_131": {
    "title": "~(으)면 / ~하면 (Nếu, hễ, khi / Điều kiện và giả định)",
    "shortExplanation": "Vĩ tố liên kết biểu thị điều kiện hoặc tình huống giả định, vế sau là kết quả phát sinh khi điều kiện đó được thỏa mãn ('nếu...', 'khi...').",
    "longExplanation": "'~(으)면' (đối với động từ hoặc tính từ có đuôi 하다 là '~하면') là vĩ tố liên kết biểu thị điều kiện giả định cơ bản và thông dụng nhất trong tiếng Hàn. Mệnh đề trước đặt ra một tiền đề, điều kiện hoặc hoàn cảnh giả định ('nếu...'), còn mệnh đề sau biểu thị hành động, kết quả hoặc phán đoán nảy sinh trên cơ sở điều kiện đó. Thân động từ hoặc tính từ kết thúc bằng nguyên âm hoặc phụ âm 'ㄹ' đi với '-면', kết thúc bằng phụ âm khác đi với '-으면'. Đi sau danh từ dùng '-(이)면'.",
    "formation": "Thân động từ / Thân tính từ (kết thúc bằng nguyên âm hoặc ㄹ: -면 / phụ âm: -으면; động từ 하다: -하면); Danh từ (kết thúc bằng nguyên âm: -면 / phụ âm: -이면)",
    "examples": [
      {
        "translation": "Sau này nếu có nhiều thời gian rảnh rỗi hơn, tôi sẽ có thể đọc thêm nhiều cuốn sách."
      },
      {
        "translation": "Hôm nay nếu trời đổ mưa thì chắc chúng ta sẽ không thể đi xem phim được rồi."
      },
      {
        "translation": "Nếu anh ấy đưa ra chứng cứ xác thực cho chúng ta thấy, chúng ta sẽ tin tưởng anh ấy."
      },
      {
        "translation": "Nếu em chăm chỉ đến trường học tập hơn, em sẽ có thể đạt được thành tích học tập tốt."
      }
    ]
  },
  "ko_하면서_132": {
    "title": "~(으)면서 / ~하면서 (Vừa... vừa..., trong khi...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị hai hành động hoặc trạng thái diễn ra đồng thời cùng lúc bởi cùng một chủ ngữ ('vừa làm A vừa làm B').",
    "longExplanation": "'~(으)면서' (đối với động từ hoặc tính từ có đuôi 하다 là '~하면서') là vĩ tố liên kết biểu thị tính đồng thời của hành động hoặc trạng thái. Cấu trúc này dùng khi cùng một chủ ngữ thực hiện song song hai hành động cùng một lúc, hoặc sở hữu đồng thời hai phẩm chất, trạng thái song hành. Chú ý rằng chủ ngữ của hai mệnh đề trước và sau bắt buộc phải là một. Thân động từ hoặc tính từ kết thúc bằng nguyên âm hoặc phụ âm 'ㄹ' đi với '-면서', kết thúc bằng phụ âm khác đi với '-으면서'. Đi sau danh từ dùng '-(이)면서'.",
    "formation": "Thân động từ / Thân tính từ (kết thúc bằng nguyên âm hoặc ㄹ: -면서 / phụ âm: -으면서; động từ 하다: -하면서); Danh từ (kết thúc bằng nguyên âm: -면서 / phụ âm: -이면서)",
    "examples": [
      {
        "translation": "Vừa thư giãn hòa mình vào thiên nhiên, tôi vừa tranh thủ chụp được rất nhiều bức ảnh đẹp."
      },
      {
        "translation": "Tôi vừa lắng nghe âm nhạc vừa tập trung làm bài tập về nhà."
      },
      {
        "translation": "Bố tôi vừa theo dõi chương trình vô tuyến vừa dùng bữa tối ngon lành."
      },
      {
        "translation": "Anh ấy có một thói quen là vừa tản bộ vừa chăm chú đọc sách."
      }
    ]
  },
  "ko_하기는_133": {
    "title": "~하기는 (하다/하지만) (Làm thì có làm đấy nhưng, tuy là... thật nhưng)",
    "shortExplanation": "Vĩ tố danh từ hóa '-기' kết hợp với trợ từ nhấn mạnh đối chiếu '-는', dùng để thừa nhận một sự thật ở vế trước nhưng vế sau lại đưa ra sự việc tương phản hoặc hạn chế ('thì có... thật nhưng mà').",
    "longExplanation": "'~하기는 하다' hoặc '~하기는 하지만' được dùng khi người nói công nhận hoặc thừa nhận tính đúng đắn của hành động hay trạng thái ở vế trước ('làm thì có làm đấy', 'tính từ thì có thật'), nhưng ngay sau đó ở vế sau lại đưa ra một sự thật trái ngược, hạn chế hoặc một điều kiện phủ định đi kèm ('nhưng mà...'). Cấu trúc này thường đi liền với '-지만' hoặc lặp lại động từ ở dạng 'Động từ + -기는 하다/하지만'.",
    "formation": "Thân động từ / Thân tính từ + -기는 하다 (hoặc -기는 하지만)",
    "examples": [
      {
        "translation": "Tôi thì thích nấu ăn thật đấy nhưng tính hơi lười nên thường xuyên đi ăn ở quán."
      },
      {
        "translation": "Tuy tôi có đi xem bộ phim này thật nhưng thành thật mà nói thì không kỳ vọng nhiều."
      },
      {
        "translation": "Bạn tôi thì có mở quán thật đấy nhưng tôi không thường xuyên ghé thăm."
      },
      {
        "translation": "Tôi thì thích người ấy thật đấy nhưng người ấy lại chẳng thích tôi."
      }
    ]
  },
  "ko_하기로_134": {
    "title": "~하기로 하다 (Quyết định làm gì, hẹn làm gì)",
    "shortExplanation": "Cấu trúc biểu thị sự quyết định, thỏa thuận hoặc cam kết sẽ thực hiện một hành động nào đó ('quyết định làm...', 'hẹn nhau làm...').",
    "longExplanation": "'~하기로 하다' được tạo thành từ vĩ tố danh từ hóa '-기', trợ từ phương hướng/kết quả '-로' và động từ '하다'. Cấu trúc này dùng để diễn đạt việc người nói hoặc một nhóm người đã đưa ra quyết định, lựa chọn hoặc đạt được sự đồng thuận sẽ làm một việc gì đó trong tương lai. Thường được sử dụng phổ biến nhất ở thì quá khứ '~하기로 했다' để nói về quyết định đã được chốt.",
    "formation": "Thân động từ + -기로 하다 (thường dùng ở dạng quá khứ: -기로 했다 / -기로 했습니다)",
    "examples": [
      {
        "translation": "Ngày mai chúng tôi đã quyết định đi đến bể bơi. Mọi người sẽ cùng nhau đi bơi."
      },
      {
        "translation": "Tôi đã quyết định sẽ học tiếng Hàn vào học kỳ tới. Tôi muốn nâng cao năng lực tiếng Hàn của mình."
      },
      {
        "translation": "Tôi đã quyết định sẽ đi chợ trên đường về nhà vì đồ ăn trong nhà đang cạn kiệt."
      },
      {
        "translation": "Nhóm chúng tôi đã quyết định sẽ bắt đầu dự án trong tuần này vì muốn hoàn thành sớm."
      }
    ]
  },
  "ko_하기보다_135": {
    "title": "~하기보다 (So với việc... thì, thà... còn hơn)",
    "shortExplanation": "Cấu trúc so sánh giữa hai hành động, biểu thị việc ưu tiên hoặc coi trọng hành động ở vế sau hơn hành động ở vế trước ('thay vì làm...', 'so với việc...').",
    "longExplanation": "'~하기보다' là sự kết hợp giữa vĩ tố danh từ hóa '-기' và trợ từ so sánh '-보다' (so với). Cấu trúc này dùng để so sánh hai sự lựa chọn hoặc hành động, qua đó nhấn mạnh rằng hành động hoặc trạng thái ở vế sau tốt hơn, được ưu tiên hơn hoặc đáng làm hơn so với hành động ở vế trước. Thường đi kèm với các từ chỉ mức độ như 'được ưu tiên hơn', 'tốt hơn'.",
    "formation": "Thân động từ / Thân tính từ + -기보다 (hoặc -기보다는)",
    "examples": [
      {
        "translation": "So với việc tăng thêm cân thì việc tập thể dục một cách khỏe mạnh quan trọng hơn."
      },
      {
        "translation": "Thay vì ở nhà, tôi muốn ra ngoài đi chơi cùng bạn bè hơn."
      },
      {
        "translation": "Thay vì từ bỏ ước mơ, tôi đã quyết định tiếp tục theo đuổi nó."
      },
      {
        "translation": "Tôi nghĩ rằng so với việc chỉ lo kiếm tiền thì tìm ra điều mình yêu thích còn quan trọng hơn nhiều."
      }
    ]
  },
  "ko_하기에_136": {
    "title": "~하기에 (Vì/do là...; Để làm gì đó thì...)",
    "shortExplanation": "Biểu thị: (1) Căn cứ, nguyên nhân hoặc lý do cho một hành động hay phán đoán ('vì...', 'do...'); (2) Tiêu chuẩn, phạm vi hoặc mức độ phù hợp khi thực hiện hành động ('để làm việc gì đó thì...').",
    "longExplanation": "'~하기에' là sự kết hợp giữa vĩ tố danh từ hóa '-기' và trợ từ '-에'. Cấu trúc này có hai cách dùng chính: (1) Chỉ lý do, căn cứ dẫn đến nhận định hay hành động ở vế sau, mang sắc thái trang trọng, văn viết ('vì là...', 'xét thấy...'); (2) Làm mốc chuẩn mực để đánh giá tính chất, mức độ (thường kết hợp với các tính từ như '좋다', '나쁘다', '아깝다', '덥다', '알맞다' - 'để làm... thì quá nóng/tiếc/thích hợp').",
    "formation": "Thân động từ / Thân tính từ + -기에 (hoặc -기에는)",
    "examples": [
      {
        "translation": "So với lứa tuổi thì kỹ năng bóng đá của cậu ấy rất xuất sắc, và vì có khả năng gia nhập đội bóng chuyên nghiệp nên cậu ấy đang nỗ lực hết mình."
      },
      {
        "translation": "Công việc đó thu nhập cao nhưng áp lực cũng nhiều, xét thấy có thể không tốt cho sức khỏe nên cần phải chú ý cẩn thận."
      },
      {
        "translation": "Nguyên liệu nhiều quá nên tôi cảm thấy vứt bỏ những thứ không cần thiết đi thì thật là lãng phí."
      },
      {
        "translation": "Nhìn vào sự thay đổi thời tiết gần đây, tôi nghĩ rằng ngày mai để mà đi dã ngoại thì chắc là quá nóng."
      }
    ]
  },
  "ko_하기만_137": {
    "title": "~하기만 하면 (Chỉ cần... là được, hễ cứ... là)",
    "shortExplanation": "Biểu thị điều kiện duy nhất cần thiết, chỉ cần đáp ứng hoặc thực hiện hành động đó là kết quả mong đợi phía sau chắc chắn sẽ xảy ra ('chỉ cần... là').",
    "longExplanation": "'~하기만 하면' là sự kết hợp giữa vĩ tố danh từ hóa '-기', trợ từ hạn định mang nghĩa duy nhất '-만' (chỉ) và cấu trúc điều kiện '-하면' (nếu làm). Cấu trúc này dùng để diễn đạt rằng chỉ cần một điều kiện duy nhất được thỏa mãn thì hành động, trạng thái hoặc kết quả ở vế sau nhất định sẽ diễn ra hoặc hoàn toàn có thể thực hiện được.",
    "formation": "Thân động từ / Thân tính từ + -기만 하면",
    "examples": [
      {
        "translation": "Tôi chỉ cần chăm chỉ học tập là nhất định sẽ thi đỗ kỳ thi tiếng Hàn."
      },
      {
        "translation": "Chỉ cần bạn tin tưởng tôi thì việc chữa lành vết thương sẽ trở nên dễ dàng hơn nhiều."
      },
      {
        "translation": "Chỉ cần nỗ lực một chút thôi là bạn có thể nâng cao kỹ năng vẽ tranh của mình rồi."
      },
      {
        "translation": "Chỉ cần mọi người nỗ lực thấu hiểu lẫn nhau thì thế giới này hoàn toàn có thể trở thành một nơi tốt đẹp hơn."
      }
    ]
  },
  "ko_하는_138": {
    "title": "~하는 것 같다 / ~(으)ㄴ/는 것 같다 (Hình như là, có vẻ như là)",
    "shortExplanation": "Biểu thị sự phỏng đoán, suy đoán mềm mỏng hoặc nhận định dè dặt dựa trên quan sát, cảm nhận cá nhân ('hình như là...', 'có vẻ như...').",
    "longExplanation": "'~(으)ㄴ/는 것 같다' là cấu trúc phỏng đoán cực kỳ phổ biến trong tiếng Hàn, kết hợp giữa định ngữ thời hiện tại/quá khứ/tương lai, danh từ phụ thuộc '것' (điều, việc) và tính từ '같다' (giống như). Người nói dùng cấu trúc này để đưa ra phán đoán, cảm tưởng hoặc ý kiến cá nhân một cách nhẹ nhàng, khiêm tốn, tránh khẳng định quá tuyệt đối. Với động từ thì hiện tại dùng '-는 것 같다', với tính từ thì hiện tại dùng '-(으)ㄴ 것 같다', và quá khứ dùng '-(으)ㄴ 것 같다'.",
    "formation": "Động từ (hiện tại: -는 것 같다 / quá khứ: -(으)ㄴ 것 같다); Tính từ (hiện tại: -(으)ㄴ 것 같다); Danh từ: -인 것 같다",
    "examples": [
      {
        "translation": "Tôi thấy hình như anh ấy hiểu lời tôi nói; vì nét mặt của anh ấy lộ rõ vẻ nhẹ nhõm."
      },
      {
        "translation": "Hôm nay trời có vẻ rất lạnh; tôi thấy mọi người ở ngoài đường đều co ro người lại."
      },
      {
        "translation": "Hình như bạn tôi bị muộn giờ học rồi; cậu ấy vừa chạy thục mạng đến trường vừa vội vàng nhắn tin cho tôi."
      },
      {
        "translation": "Có vẻ như anh ấy đang giận tôi; sắc mặt anh ấy trông không được tốt cho lắm."
      }
    ]
  },
  "ko_하는_139": {
    "title": "~하는 데 (Trong việc..., Để làm việc gì đó thì tốn/cần...)",
    "shortExplanation": "Đi cùng với các từ chỉ thời gian, công sức hoặc chi phí để biểu thị lượng tài nguyên cần thiết cho một quá trình ('trong việc làm...', 'để làm... thì mất/tốn').",
    "longExplanation": "'~하는 데' sử dụng định ngữ '-는' kết hợp với danh từ phụ thuộc '데' (chỉ việc, công việc, trường hợp). Cấu trúc này thường đứng trước các vị ngữ biểu thị thời gian, nỗ lực, tiền bạc hoặc tài nguyên như '시간이 걸리다' (mất thời gian), '노력이 들다/필요하다' (cần nỗ lực), '돈이 들다' (tốn tiền) để nói rõ quá trình thực hiện một việc cụ thể đòi hỏi bao nhiêu chi phí hay công sức.",
    "formation": "Thân động từ + -는 데 + (thời gian / công sức / tiền bạc / tài nguyên) + 걸리다 / 들다 / 필요하다",
    "examples": [
      {
        "translation": "Mất rất nhiều thời gian để về đến nhà. Đường bị tắc nghẽn nghiêm trọng."
      },
      {
        "translation": "Để đạt được mục tiêu của năm nay, tôi đã cần đến rất nhiều sự nỗ lực."
      },
      {
        "translation": "Làm chiếc bánh kem này mất trọn vẹn cả một ngày trời. Tôi đã tự làm từ khâu chuẩn bị nguyên liệu cho đến trang trí."
      },
      {
        "translation": "Mất hơn một tháng trời để sáng tác ca khúc mới của Lee Hyo-ri."
      }
    ]
  },
  "ko_하는_140": {
    "title": "~하는 편이다 / ~(으)ㄴ/는 편이다 (Thuộc diện, có xu hướng, khá là)",
    "shortExplanation": "Biểu thị một hành động, đặc điểm hoặc thói quen có xu hướng thiên về một phía nào đó mà không mang tính tuyệt đối ('thuộc dạng...', 'khá là...', 'có chiều hướng...').",
    "longExplanation": "'~(으)ㄴ/는 편이다' kết hợp định ngữ với danh từ phụ thuộc '편' (phía, hướng, diện) và vị ngữ '이다'. Cấu trúc này dùng để diễn đạt rằng một người hoặc sự vật có xu hướng nghiêng về một đặc điểm, thói quen hay tính chất nào đó khi xếp vào hai cực so sánh. Cách nói này giúp câu văn trở nên nhẹ nhàng, tương đối, không mang tính khẳng định cứng nhắc 100%. Động từ hiện tại dùng '-는 편이다', quá khứ dùng '-(으)ㄴ 편이다'; tính từ dùng '-(으)ㄴ 편이다'.",
    "formation": "Động từ (hiện tại: -는 편이다 / quá khứ: -(으)ㄴ 편이다); Tính từ: -(으)ㄴ 편이다",
    "examples": [
      {
        "translation": "Tôi thích đọc sách nên thường có xu hướng dành khá nhiều thời gian cho việc này."
      },
      {
        "translation": "Cậu ấy thuộc dạng luôn đi ngủ sớm, vì vậy nên hay được mọi người khen là rất khỏe mạnh."
      },
      {
        "translation": "Mẹ tôi nấu ăn rất khéo nên hầu như luôn làm ra những món ăn ngon."
      },
      {
        "translation": "Tôi thuộc tuýp người hay trì hoãn công việc, nên đôi khi việc dồn lại cả đống cùng một lúc."
      }
    ]
  },
  "ko_하는_141": {
    "title": "~하는 한 (Chừng nào còn..., Một khi mà còn...)",
    "shortExplanation": "Biểu thị phạm vi hoặc giới hạn điều kiện thời gian, miễn là điều kiện ở vế trước còn được duy trì thì sự việc ở vế sau vẫn tiếp diễn ('chừng nào còn...', 'trong chừng mực mà...').",
    "longExplanation": "'~하는 한' sử dụng định ngữ '-는' gắn vào thân động từ kết hợp với danh từ '한' (hạn - 限, nghĩa là giới hạn, phạm vi). Cấu trúc này dùng để thiết lập phạm vi điều kiện tiên quyết: chừng nào hành động, trạng thái ở vế trước vẫn còn tiếp tục hoặc giữ nguyên thì sự việc, cảm xúc hoặc kết quả ở vế sau vẫn sẽ được duy trì và đảm bảo.",
    "formation": "Thân động từ / 있다·없다 + -는 한; Danh từ + -인 한",
    "examples": [
      {
        "translation": "Chừng nào bạn vẫn duy trì được sức khỏe thì sẽ không có vấn đề gì lớn xảy ra đâu."
      },
      {
        "translation": "Chừng nào em còn ở bên cạnh anh, anh sẽ luôn cảm thấy hạnh phúc."
      },
      {
        "translation": "Một khi cô ấy vẫn nỗ lực bằng cả tấm lòng chân thành thì mục tiêu nhất định sẽ đạt được thôi."
      },
      {
        "translation": "Chừng nào chúng ta còn sát cánh bên nhau thì bất cứ khó khăn nào cũng có thể vượt qua."
      }
    ]
  },
  "ko_하는데_142": {
    "title": "~하는데 / ~(으)ㄴ/는데 (Nhưng mà, thế mà, vả lại)",
    "shortExplanation": "Vĩ tố liên kết diễn tả sự tương phản, đối lập giữa hai mệnh đề hoặc đưa ra bối cảnh nền tảng trước khi nói tiếp ('nhưng mà...', 'thế mà...').",
    "longExplanation": "'~하는데' (hoặc tổng quát là '-(으)ㄴ/는데') là một vĩ tố liên kết đa năng. Trong ngữ cảnh tương phản, cấu trúc này kết nối hai vế câu có nội dung đối nghịch hoặc trái với mong đợi ('vế 1 thế này nhưng vế 2 lại thế kia'). Ngoài ra, nó còn dùng để gợi mở bối cảnh, hoàn cảnh cho câu nói tiếp theo. Ở thì quá khứ, cấu trúc kết hợp thành '-았/었는데'.",
    "formation": "Động từ (hiện tại: -는데 / quá khứ: -았/었는데); Tính từ (kết thúc bằng phụ âm: -은데 / nguyên âm: -ㄴ데); Danh từ: -인데",
    "examples": [
      {
        "translation": "Bạn tôi đã học rất nhiều nhưng vẫn thi trượt."
      },
      {
        "translation": "Trời đang mưa thế mà tôi lại không mang theo ô."
      },
      {
        "translation": "Trò chơi này vui thật nhưng thời gian trôi nhanh quá."
      },
      {
        "translation": "Cái bánh này ngon thật đấy nhưng lại có quá nhiều đường."
      }
    ]
  },
  "ko_하다_143": {
    "title": "~하다 보면 / ~다 보면 (Cứ làm... dần dần rồi sẽ, nếu cứ tiếp tục làm...)",
    "shortExplanation": "Biểu thị nếu một hành động được duy trì lặp đi lặp lại liên tục thì tự nhiên sẽ dẫn đến một kết quả hoặc sự nhận thức mới nào đó trong tương lai ('cứ làm... mãi rồi sẽ...').",
    "longExplanation": "'~다 보면' được hình thành từ vĩ tố diễn tiến '-다가' (được rút gọn thành '-다'), động từ '보다' (thử) và vĩ tố điều kiện '-면' (nếu). Cấu trúc này dùng để diễn đạt rằng nếu người nói hoặc chủ ngữ cứ kiên trì lặp lại một hành vi nào đó trong một khoảng thời gian thì một sự thay đổi tích cực, một kết quả tất yếu hoặc một bài học/nhận thức mới sẽ tự nhiên xuất hiện.",
    "formation": "Thân động từ + -다 보면",
    "examples": [
      {
        "translation": "Nếu bạn cứ chăm chỉ học tiếng Hàn mỗi ngày, chẳng mấy chốc bạn sẽ trở nên giỏi tiếng Hàn thôi."
      },
      {
        "translation": "Tôi nghĩ rằng nếu cứ tiếp tục luyện tập thì bạn sẽ có thể tìm thấy sự hứng thú và tài năng của mình trong nghệ thuật."
      },
      {
        "translation": "Nếu thường xuyên đến phòng tập thể dục thì thể lực của bạn sẽ tốt lên và cơ thể sẽ ngày càng khỏe mạnh hơn."
      },
      {
        "translation": "Nếu ngày nào cũng vẽ tranh thì có khi bạn sẽ trở thành một họa sĩ xuất sắc đấy."
      }
    ]
  },
  "ko_하다가는_144": {
    "title": "~하다가는 / ~다가는 (Nếu cứ tiếp tục... thì sẽ [gặp họa/hậu quả xấu])",
    "shortExplanation": "Cảnh báo rằng nếu cứ tiếp tục duy trì hành động hiện tại thì nhất định sẽ dẫn đến một kết quả tiêu cực, nguy hại hoặc không mong muốn ('cứ tiếp tục... thì có ngày...').",
    "longExplanation": "'~다가는' là sự kết hợp giữa vĩ tố liên kết '-다가' (biểu thị hành động đang diễn ra) và trợ từ nhấn mạnh '-는'. Cấu trúc này dùng để cảnh báo hoặc bày tỏ sự lo ngại rằng: nếu người nghe hoặc chủ ngữ cứ tiếp tục duy trì trạng thái hoặc hành vi tiêu cực/sai lầm đó, thì ở vế sau sẽ phải đối mặt với một hậu quả xấu, thất bại hoặc rủi ro nguy hiểm.",
    "formation": "Thân động từ + -다가는",
    "examples": [
      {
        "translation": "Nếu cứ tiếp tục ăn uống thế này thì sức khỏe có thể bị giảm sút đấy."
      },
      {
        "translation": "Nếu cứ làm việc cùng nhau theo kiểu này thì tôi e là mối quan hệ giữa đôi bên sẽ xấu đi mất."
      },
      {
        "translation": "Nếu cứ học hành theo cái kiểu này thì cậu có thể bị trượt kỳ thi đấy."
      },
      {
        "translation": "Ngày nào cậu cũng chỉ biết cắm đầu chơi game, cứ như thế thì tương lai có khi sẽ gặp rắc rối to đấy."
      }
    ]
  },
  "ko_하여_145": {
    "title": "~하여 / ~아/어/하여 (Làm... và..., Bằng cách làm...)",
    "shortExplanation": "Vĩ tố liên kết mang tính văn viết, trang trọng dùng để kết nối hai hành động liên tiếp hoặc biểu thị hành động trước là phương tiện, cách thức để thực hiện hành động sau ('làm... rồi...', 'thông qua việc... mà...').",
    "longExplanation": "'~하여' là dạng liên kết trang trọng, văn viết của gốc '하다' kết hợp với vĩ tố '-아/어/여'. Cấu trúc này thường xuất hiện trong các bài phát biểu, văn bản hành chính, tin tức báo chí hoặc tác phẩm văn học để: (1) Kết nối hai hành động có quan hệ trước sau hoặc nguyên nhân - kết quả; (2) Biểu thị hành động ở vế trước là phương thức, công cụ hoặc con đường để đạt được thành quả ở vế sau. Trong khẩu ngữ hàng ngày, người ta thường dùng dạng rút gọn là '~해'.",
    "formation": "Thân động từ kết thúc bằng 하다: -하여 (khẩu ngữ rút gọn: -해); Thân động từ / Thân tính từ khác: -아/어",
    "examples": [
      {
        "translation": "Anh ấy tập thể dục mỗi ngày và nhờ đó duy trì được sức khỏe dẻo dai."
      },
      {
        "translation": "Tôi đã học tập chăm chỉ và đạt được mục tiêu đã đề ra."
      },
      {
        "translation": "Giám đốc đã truyền động lực cho nhân viên và từ đó gặt hái được những thành quả tốt đẹp hơn."
      },
      {
        "translation": "Tôi đã thắt chặt chi tiêu ngân sách để chuẩn bị tiền cho chuyến đi du lịch."
      }
    ]
  },
  "ko_하여야_146": {
    "title": "~하여야 / ~아/어/해야 (하다) (Phải làm gì, Phải... thì mới)",
    "shortExplanation": "Biểu thị tính tất yếu, nghĩa vụ hoặc điều kiện bắt buộc phải thực hiện để hoàn thành một mục đích ('phải làm...', 'phải... thì mới được').",
    "longExplanation": "'~하여야' là dạng trang trọng, chuẩn mực của gốc '하다' kết hợp với vĩ tố điều kiện bắt buộc '-아/어/여야'. Khi đi cùng với '하다' hoặc '되다' tạo thành mẫu câu '~하여야 하다/되다' (trong văn nói hàng ngày rút gọn thành '~해야 하다/되다'), cấu trúc này nhấn mạnh rằng hành động đó là bổn phận, trách nhiệm bắt buộc hoặc là điều kiện thiết yếu duy nhất để kết quả ở vế sau có thể đạt được.",
    "formation": "Thân động từ kết thúc bằng 하다: -하여야 (khẩu ngữ: -해야); Thân động từ khác: -아/어야; Thường đi với: 하다 / 되다",
    "examples": [
      {
        "translation": "Nếu muốn làm bài thi thật tốt thì bạn phải học tập chăm chỉ."
      },
      {
        "translation": "Nếu muốn học lập trình Viole thì trước hết bạn phải nắm thật vững ngữ pháp Python cơ bản."
      },
      {
        "translation": "Nếu muốn làm tốt công việc của mình thì bạn cần phải tập trung cao độ."
      },
      {
        "translation": "Nếu muốn giảm cân nhanh chóng thì bạn phải tập thể dục đều đặn mỗi ngày."
      }
    ]
  },
  "ko_하였다_147": {
    "title": "~하였다 / ~았다/었다/하였다 (Đã [dạng quá khứ trang trọng, văn viết])",
    "shortExplanation": "Vĩ tố kết thúc câu thì quá khứ mang tính trang trọng, văn viết hoặc lịch sự cao ('đã làm...', 'đã...').",
    "longExplanation": "'~하였다' là dạng quá khứ nguyên bản của các động từ/tính từ kết thúc bằng '하다', kết hợp vĩ tố chỉ thì quá khứ '-였-' và đuôi câu '-다'. Cấu trúc này thường thấy trong các văn bản trang trọng, sách báo, tài liệu lịch sử, báo cáo chính thức hoặc khi nói năng trịnh trọng (đi cùng với đuôi kết thúc lịch sự '-습니다' thành '-하였습니다'). Trong giao tiếp thông thường, nó hay được co cụm thành '-했다'.",
    "formation": "Thân động từ / Thân tính từ kết thúc bằng 하다: -하였다 (dạng lịch sự: -하였습니다 / khẩu ngữ: -했다); Thân từ khác: -았다/었다",
    "examples": [
      {
        "translation": "Hôm qua tôi về nhà định nấu mì gói ăn thì thấy bác gái bảo đang làm đồ ăn cho khách nên tôi đã cùng giúp một tay."
      },
      {
        "translation": "Khi mới bắt đầu học tiếng Hàn thì anh ấy chẳng biết gì cả, thế mà giờ đây anh ấy đã chuẩn bị cho kỳ thi TOPIK rồi."
      },
      {
        "translation": "Chúng tôi cứ ngỡ là học sinh sẽ không chuẩn bị bài tập về nhà, thế nhưng tất cả các em đều đã chuẩn bị bài tập một cách nghiêm túc."
      },
      {
        "translation": "Đội ngũ chúng tôi đã nỗ lực hết mình vì dự án lần này và cuối cùng đã hoàn tất một cách thành công tốt đẹp."
      }
    ]
  },
  "ko_하자_148": {
    "title": "~하자 / ~자마자 (Ngay khi, vừa mới... thì)",
    "shortExplanation": "Vĩ tố liên kết biểu thị hành động ở vế sau diễn ra ngay tức thì sau khi hành động ở vế trước vừa hoàn thành ('ngay khi...', 'vừa mới... thì').",
    "longExplanation": "'~자' hoặc dạng nhấn mạnh '~자마자' là vĩ tố liên kết dùng để nối hai mệnh đề, thể hiện tính nối tiếp tức thời: ngay thời điểm hành động ở vế thứ nhất vừa chấm dứt thì hành động ở vế thứ hai lập tức xảy ra. Cấu trúc này không kết hợp với vĩ tố chỉ thời thì (như '-았/었-') ở vế trước mà thời thì được thể hiện ở vế sau.",
    "formation": "Thân động từ + -자마자 (hoặc -자)",
    "examples": [
      {
        "translation": "Ngay khi tôi vừa mở cửa, chú cún con đã chạy vào."
      },
      {
        "translation": "Vừa mới qua đường xong là tôi bắt taxi đi ngay."
      },
      {
        "translation": "Trời vừa mưa một cái là tôi che ô lên ngay."
      },
      {
        "translation": "Tôi vừa gấp sách lại là cơn buồn ngủ ập đến ngay."
      }
    ]
  },
  "ko_할_149": {
    "title": "~(으)ㄹ 것이다 (Sẽ, chắc là sẽ)",
    "shortExplanation": "Cấu trúc biểu thị dự định, kế hoạch tương lai của người nói, hoặc phỏng đoán chắc chắn về một sự việc sắp xảy ra ('sẽ...', 'chắc là sẽ...').",
    "longExplanation": "'~(으)ㄹ 것이다' là cấu trúc thì tương lai kết hợp giữa vĩ tố định ngữ thời tương lai '-(으)ㄹ', danh từ phụ thuộc '것' (điều, việc) và trợ từ vị ngữ '이다'. Cấu trúc này có hai chức năng chính: (1) Diễn đạt ý chí, kế hoạch hoặc lời hứa hẹn của chủ ngữ ngôi thứ nhất ('tôi sẽ làm...'); (2) Diễn đạt sự phỏng đoán, dự đoán khách quan của người nói về thời tiết, tình hình hoặc hành động của người khác ('chắc chắn sẽ...'). Trong văn nói thân mật thường rút gọn thành '-(으)ㄹ 거예요'.",
    "formation": "Thân động từ / Thân tính từ + -(으)ㄹ 것이다 (kết thúc bằng nguyên âm dùng -ㄹ 것이다, kết thúc bằng phụ âm dùng -을 것이다)",
    "examples": [
      {
        "translation": "Ngày mai trời sẽ mưa, vì vậy chắc là phải mang theo ô."
      },
      {
        "translation": "Tôi sẽ nuôi một chú cún, do đó sẽ cần phải mua đồ dùng cho thú cưng."
      },
      {
        "translation": "Tuần sau tôi sẽ đi xem hòa nhạc ở Hàn Quốc, vì thế tôi sẽ đặt vé trước."
      },
      {
        "translation": "Năm sau tôi sẽ học lên cao học, nên tôi sẽ lập kế hoạch chi tiết."
      }
    ]
  },
  "ko_할_150": {
    "title": "~(으)ㄹ 때마다 (Mỗi khi, mỗi lần... lại)",
    "shortExplanation": "Biểu thị một hành động hoặc trạng thái luôn luôn lặp đi lặp lại vào mỗi lần một tình huống nhất định xảy ra ('mỗi khi...', 'cứ mỗi lần... lại').",
    "longExplanation": "'~(으)ㄹ 때마다' là sự kết hợp giữa vĩ tố định ngữ '-(으)ㄹ', danh từ chỉ thời gian '때' (khi, lúc) và trợ từ bổ trợ '마다' (mỗi, từng). Cấu trúc này dùng để diễn đạt tính quy luật hoặc sự lặp lại định kỳ: cứ hễ hành động ở vế trước diễn ra thì hành động, trạng thái hoặc cảm xúc ở vế sau lại tất yếu xảy ra theo.",
    "formation": "Thân động từ / Thân tính từ + -(으)ㄹ 때마다 (kết thúc bằng nguyên âm dùng -ㄹ 때마다, kết thúc bằng phụ âm dùng -을 때마다); Danh từ + 때마다",
    "examples": [
      {
        "translation": "Mỗi khi ăn mì, anh ấy lại nhớ đến cô ấy, vì cô ấy từng rất thích ăn mì."
      },
      {
        "translation": "Mỗi lần tôi về nhà, chú cún cưng đều chạy ra đón làm tôi cảm thấy vô cùng hạnh phúc."
      },
      {
        "translation": "Mỗi lần nhìn thấy anh ấy, trái tim cô ấy lại bắt đầu đập rộn ràng."
      },
      {
        "translation": "Mỗi khi tôi ghé thăm, bà đều làm món ăn vặt đặc biệt cho tôi nên tôi luôn háo hức mong chờ."
      }
    ]
  },
  "ko_할_151": {
    "title": "~(으)ㄹ 만하다 (Đáng để, bõ công làm gì)",
    "shortExplanation": "Biểu thị một hành động có đủ giá trị, ý nghĩa để thực hiện ('đáng để làm...', 'rất đáng thử'), hoặc một mức độ chấp nhận được ('cũng tạm được').",
    "longExplanation": "'~(으)ㄹ 만하다' kết hợp giữa vĩ tố định ngữ '-(으)ㄹ' và tính từ phụ thuộc '만하다'. Cấu trúc này dùng để diễn tả rằng một sự việc hoặc đối tượng nào đó rất xứng đáng để bỏ công sức, thời gian trải nghiệm (như 'đáng xem', 'đáng mua', 'đáng đọc'). Ngoài ra, cấu trúc này còn có thể dùng để diễn đạt mức độ vừa đủ hoặc tình trạng vẫn trong ngưỡng có thể chấp nhận được ('cũng chịu đựng được', 'cũng tạm ổn').",
    "formation": "Thân động từ + -(으)ㄹ 만하다 (kết thúc bằng nguyên âm dùng -ㄹ 만하다, kết thúc bằng phụ âm dùng -을 만하다)",
    "examples": [
      {
        "translation": "Xem bộ phim này không hề lãng phí thời gian mà khá giá trị, đúng là một bộ phim đáng xem."
      },
      {
        "translation": "Cuốn sách đó nội dung phong phú nên rất đáng đọc."
      },
      {
        "translation": "Căn hộ đó rất đáng để sống thử; giao thông thuận tiện lại có đầy đủ tiện nghi."
      },
      {
        "translation": "Chiếc máy ảnh này hơi đắt một chút nhưng chất lượng tốt nên rất đáng mua."
      }
    ]
  },
  "ko_할_152": {
    "title": "~(으)ㄹ 수 있다 (Có thể làm gì)",
    "shortExplanation": "Biểu thị năng lực, kỹ năng của chủ ngữ hoặc tính khả thi của một tình huống ('có thể làm được').",
    "longExplanation": "'~(으)ㄹ 수 있다' là cấu trúc chỉ khả năng cơ bản và phổ biến nhất trong tiếng Hàn, được tạo thành từ vĩ tố định ngữ '-(으)ㄹ', danh từ phụ thuộc chỉ phương cách/khả năng '수' và tính từ tồn tại '있다' (có). Cấu trúc này dùng để biểu thị: (1) Năng lực hoặc kỹ năng cá nhân của ai đó có thể làm được việc gì; (2) Điều kiện hoặc hoàn cảnh cho phép một sự việc có khả năng xảy ra.",
    "formation": "Thân động từ / Thân tính từ + -(으)ㄹ 수 있다 (kết thúc bằng nguyên âm dùng -ㄹ 수 있다, kết thúc bằng phụ âm dùng -을 수 있다)",
    "examples": [
      {
        "translation": "Tôi có thể nói một chút tiếng Hàn, vì thế mà tôi ngày càng quan tâm nhiều đến Hàn Quốc."
      },
      {
        "translation": "Bạn có thể làm theo cách bạn nghĩ. Tôi tin tưởng bạn vì bạn là người hiểu rõ công việc đó nhất."
      },
      {
        "translation": "Đây là việc mà bất kỳ ai cũng có thể làm được một cách dễ dàng nên bạn đừng quá lo lắng."
      },
      {
        "translation": "Cuối tuần nếu có thời gian thì tôi có thể sửa xe ô tô giúp bạn."
      }
    ]
  },
  "ko_할_153": {
    "title": "~(으)ㄹ 수 없다 (Không thể làm gì)",
    "shortExplanation": "Biểu thị sự bất khả năng, thiếu năng lực hoặc hoàn cảnh không cho phép thực hiện một hành động ('không thể làm được').",
    "longExplanation": "'~(으)ㄹ 수 없다' là hình thức phủ định khả năng, kết hợp giữa vĩ tố định ngữ '-(으)ㄹ', danh từ phụ thuộc '수' và tính từ '없다' (không có). Cấu trúc này dùng để diễn đạt: (1) Bản thân chủ ngữ không đủ khả năng hay trình độ để làm việc gì; (2) Hoàn cảnh khách quan, quy định hoặc lý do bất khả kháng ngăn cản không cho hành động diễn ra ('không thể nào làm được').",
    "formation": "Thân động từ / Thân tính từ + -(으)ㄹ 수 없다 (kết thúc bằng nguyên âm dùng -ㄹ 수 없다, kết thúc bằng phụ âm dùng -을 수 없다)",
    "examples": [
      {
        "translation": "Bây giờ tôi bận quá nên không thể đi ăn cùng các bạn được."
      },
      {
        "translation": "Cô ấy không biết bơi giỏi nên không thể xuống nước một mình được."
      },
      {
        "translation": "Tôi không có năng khiếu nghệ thuật nên không thể vẽ tranh đẹp được."
      },
      {
        "translation": "Bộ phim này đáng sợ quá nên tôi không thể xem lại lần nữa được."
      }
    ]
  },
  "ko_할_154": {
    "title": "~(으)ㄹ 줄 알다 (Biết cách làm gì, cứ ngỡ là...)",
    "shortExplanation": "Biểu thị việc có kỹ năng, hiểu biết cách thức để thực hiện một hành động ('biết làm...'). Trong ngữ cảnh khác, còn có thể mang nghĩa tưởng rằng một việc gì đó xảy ra.",
    "longExplanation": "'~(으)ㄹ 줄 알다' kết hợp giữa vĩ tố định ngữ '-(으)ㄹ', danh từ phụ thuộc '줄' (phương pháp, cách thức) và động từ '알다' (biết). Cấu trúc này dùng chủ yếu để chỉ việc ai đó đã học tập hoặc có kỹ năng thực tế để thực hiện một công việc (như 'biết chơi đàn', 'biết bơi', 'biết nấu ăn'). Ngược lại, nếu không biết cách làm sẽ dùng '-(으)ㄹ 줄 모르다'. (Lưu ý: khi dùng với thì quá khứ, cấu trúc này còn có nghĩa là 'tưởng rằng...').",
    "formation": "Thân động từ + -(으)ㄹ 줄 알다 (kết thúc bằng nguyên âm dùng -ㄹ 줄 알다, kết thúc bằng phụ âm dùng -을 줄 알다)",
    "examples": [
      {
        "translation": "Tôi biết chơi đàn piano, nhưng tôi không phải là chuyên gia đâu."
      },
      {
        "translation": "Con chúng tôi bây giờ đã biết tự mình xỏ giày rồi."
      },
      {
        "translation": "Cheolsu lúc nào cũng tỏ ra rất rành rọt cách học những điều mới mẻ."
      },
      {
        "translation": "Chị gái tôi biết nấu ăn rất ngon nên lúc nào cũng làm cho tôi những món ngon miệng."
      }
    ]
  },
  "ko_할지라도_155": {
    "title": "~(으)ㄹ지라도 (Cho dù, dẫu cho... thì)",
    "shortExplanation": "Vĩ tố liên kết biểu thị sự nhượng bộ giả định mang tính trang trọng, dù có thừa nhận giả định ở vế trước thì vế sau vẫn diễn ra mà không bị lay chuyển ('cho dù... đi chăng nữa thì').",
    "longExplanation": "'~(으)ㄹ지라도' là vĩ tố liên kết mang tính văn viết, trang trọng, kết hợp giữa vĩ tố '-(으)ㄹ지' và trợ từ '라도'. Cấu trúc này dùng để diễn đạt sự nhượng bộ mạnh mẽ: giả định một tình huống cực đoan, khó khăn hoặc bất lợi ở vế trước, nhưng khẳng định rằng sự việc hoặc quyết tâm ở vế sau vẫn không hề thay đổi. Đồng nghĩa với '-(으)ㄹ망정' hoặc mang sắc thái trang trọng hơn '-아/어도'.",
    "formation": "Thân động từ / Thân tính từ + -(으)ㄹ지라도 (kết thúc bằng nguyên âm dùng -ㄹ지라도, kết thúc bằng phụ âm dùng -을지라도)",
    "examples": [
      {
        "translation": "Cho dù có nảy sinh bất kỳ vấn đề nào đi chăng nữa, tôi cũng sẽ luôn dốc hết sức để hoàn thành công việc."
      },
      {
        "translation": "Cho dù ngày mai trời có mưa, tôi vẫn sẽ ra ngoài."
      },
      {
        "translation": "Dẫu cho bạn từng trải qua chuyện như thế, tôi cũng không thể đồng tình thông cảm."
      },
      {
        "translation": "Dù chi phí có đắt đỏ đến đâu, chúng tôi vẫn sử dụng nguyên liệu cao cấp để đảm bảo chất lượng tốt nhất."
      }
    ]
  },
  "ko_든지_156": {
    "title": "~든지 ~든지 (Dù là... hay là..., bất kể là...)",
    "shortExplanation": "Vĩ tố liên kết liệt kê từ hai lựa chọn trở lên, biểu thị rằng dù chọn vế nào thì kết quả hay hành động ở vế sau cũng đều như nhau ('dù là... hay là...').",
    "longExplanation": "'~든지 ~든지' là vĩ tố liên kết dùng để liệt kê các hành động, trạng thái hoặc đối tượng có thể lựa chọn. Cấu trúc này nhấn mạnh rằng dù lựa chọn phương án nào trong số các phương án được nêu thì sự việc, quyết định hoặc thái độ ở mệnh đề sau vẫn không bị ảnh hưởng và không có sự phân biệt nào. Trong khẩu ngữ thường được nói rút gọn thành '~든 ~든'.",
    "formation": "Thân động từ / Thân tính từ + -든지 + Thân động từ / Thân tính từ + -든지 (hoặc Danh từ + -(이)든지)",
    "examples": [
      {
        "translation": "Dù cô ấy đến vào tối nay hay sáng mai thì chúng ta cũng đều phải chờ cô ấy."
      },
      {
        "translation": "Dù là giải quyết ngay hay hoãn lại việc này thì quyết định vẫn là ở bạn."
      },
      {
        "translation": "Dù chúng ta thắng hay thua thì việc dốc hết sức mình mới là điều quan trọng nhất."
      },
      {
        "translation": "Dù anh ấy có tham dự hay không tham dự thì cuộc họp vẫn sẽ diễn ra theo đúng lịch trình."
      }
    ]
  },
  "ko_할_157": {
    "title": "~(으)ㄹ 텐데 (Chắc là... nên; Đáng lẽ ra thì...)",
    "shortExplanation": "Biểu thị sự phỏng đoán, dự đoán có căn cứ của người nói về một tình huống tương lai để làm bối cảnh, lý do cho vế sau ('chắc là sẽ... nên'); hoặc diễn tả sự tiếc nuối ('đáng lẽ thì...').",
    "longExplanation": "'~(으)ㄹ 텐데' là sự kết hợp giữa '-(으)ㄹ 터' (ý định, phỏng đoán) và vĩ tố liên kết '-인데' (đưa ra bối cảnh). Cấu trúc này dùng khi người nói đưa ra một suy đoán, tiên liệu có cơ sở về một sự việc sắp xảy ra, từ đó tạo tiền đề, lời gợi ý hoặc đưa ra bối cảnh cho hành động ở mệnh đề tiếp theo. Nếu đứng ở cuối câu hoặc đi kèm điều kiện giả định quá khứ, cấu trúc này còn diễn tả sự tiếc nuối, lo lắng hoặc kỳ vọng chưa thành.",
    "formation": "Thân động từ / Thân tính từ + -(으)ㄹ 텐데 (kết thúc bằng nguyên âm dùng -ㄹ 텐데, kết thúc bằng phụ âm dùng -을 텐데)",
    "examples": [
      {
        "translation": "Ngày mai chắc là trời sẽ mưa đấy, nên tốt nhất là mang theo ô đi."
      },
      {
        "translation": "Nếu xuất phát bây giờ thì chắc sẽ kịp giờ, chứ nếu đến quá muộn thì không được đâu."
      },
      {
        "translation": "Thành tích của cậu ấy rất tốt nên chắc là sẽ nhận được học bổng thôi."
      },
      {
        "translation": "Nếu mà bạn bè giúp đỡ thì chắc đã giải quyết xong vấn đề rồi, chứ một mình thì vất vả lắm."
      }
    ]
  },
  "ko_함께_158": {
    "title": "~(와/과) 함께 (Cùng với...)",
    "shortExplanation": "Phó từ kết hợp với trợ từ đồng hành, biểu thị việc làm một hành động nào đó cùng với một đối tượng khác ('cùng với...').",
    "longExplanation": "'~와/과 함께' là cấu trúc biểu thị hành động diễn ra đồng hành, trong đó '함께' là phó từ mang nghĩa 'cùng nhau' đi kèm trợ từ liên kết '-와/과' (hoặc '-(이)랑', '-하고'). Cấu trúc này dùng để chỉ một người hoặc đối tượng cùng tham gia thực hiện một hoạt động nào đó. Ngoài ra còn dùng với ý nghĩa 'đồng thời cùng với sự xuất hiện của...'.",
    "formation": "Danh từ + 와/과 함께 (danh từ kết thúc bằng nguyên âm đi với 와 함께, kết thúc bằng phụ âm đi với 과 함께)",
    "examples": [
      {
        "translation": "Hôm nay tôi đã đi xem phim cùng với các bạn. Bộ phim thực sự rất thú vị và tất cả chúng tôi đều rất vui."
      },
      {
        "translation": "Tôi đã cùng mẹ đi chợ và mua được rất nhiều đồ."
      },
      {
        "translation": "Tôi đã đi du lịch cùng với bạn thân, và ở đó chúng tôi đã chụp được những bức ảnh tuyệt đẹp."
      },
      {
        "translation": "Tôi đã chơi ở công viên cùng với em trai. Chúng tôi đã được nhìn thấy những con vật rất kỳ lạ."
      }
    ]
  },
  "ko_해_159": {
    "title": "~아/어 보다 (Thử làm gì, từng làm gì)",
    "shortExplanation": "Động từ bổ trợ biểu thị việc thử làm một hành động nào đó để trải nghiệm, hoặc biểu thị kinh nghiệm đã từng làm trong quá khứ ('thử làm...', 'từng làm...').",
    "longExplanation": "'~아/어 보다' là sự kết hợp giữa vĩ tố liên kết '-아/어' và động từ bổ trợ '보다' (nhìn, thấy, thử). Cấu trúc này có hai ý nghĩa lớn: (1) Thử nghiệm: thực hiện một hành vi nào đó lần đầu tiên để xem kết quả ra sao ('thử làm xem sao'); (2) Kinh nghiệm: khi chia ở thì quá khứ '~아/어 봤다', cấu trúc biểu thị người nói đã từng có trải nghiệm làm việc đó trong đời ('đã từng...').",
    "formation": "Thân động từ + -아/어 보다 (gốc chứa ㅏ, ㅗ dùng -아 보다; gốc khác dùng -어 보다; 하다 chuyển thành 해 보다)",
    "examples": [
      {
        "translation": "Tôi định thử thảo luận bằng tiếng Hàn một lần xem sao, nhưng vì khó nên cần phải luyện tập thêm."
      },
      {
        "translation": "Nhiều người bảo tôi thử nấu món ăn Hàn một lần xem, nên hôm nay tôi đã thử nấu canh kim chi."
      },
      {
        "translation": "Tôi đã định thử dùng phần mềm mới, nhưng vì quá phức tạp nên đành bỏ cuộc."
      },
      {
        "translation": "Dù có tuổi đi chăng nữa tôi vẫn thích thử trải nghiệm những điều mới lạ, vì vậy tôi thường xuyên dự định đi du lịch."
      }
    ]
  },
  "ko_해_160": {
    "title": "~아/어 주다 (Làm cho ai đó, giúp ai đó việc gì)",
    "shortExplanation": "Động từ bổ trợ biểu thị hành động được thực hiện vì lợi ích của người khác ('làm giúp cho...', 'làm cho...').",
    "longExplanation": "'~아/어 주다' là sự kết hợp giữa vĩ tố liên kết '-아/어' và động từ bổ trợ '주다' (cho, tặng). Cấu trúc này dùng để diễn đạt việc người nói hoặc chủ ngữ thực hiện một hành động nào đó nhằm mang lại lợi ích, sự giúp đỡ hoặc ân huệ cho đối phương hay người thứ ba. Dạng kính ngữ khi làm việc gì đó cho người trên là '~아/어 드리다'.",
    "formation": "Thân động từ + -아/어 주다 (kính ngữ: -아/어 드리다; gốc chứa ㅏ, ㅗ dùng -아 주다; gốc khác dùng -어 주다; 하다 chuyển thành 해 주다)",
    "examples": [
      {
        "translation": "Vì mẹ bị ốm nên tôi đã nấu bữa tối cho mẹ."
      },
      {
        "translation": "Bạn tôi đã giúp tôi ôn thi nên tôi đã nói lời cảm ơn bạn ấy."
      },
      {
        "translation": "Thầy giáo đã giải thích rất chi tiết về câu hỏi của tôi nên tôi đã hiểu rất rõ."
      },
      {
        "translation": "Em tôi đã bảo rằng sẽ giúp tôi dọn dẹp phòng ốc."
      }
    ]
  },
  "ko_해야겠다_161": {
    "title": "~아/어야겠다 (Chắc phải làm, nhất định phải làm)",
    "shortExplanation": "Biểu thị ý chí kiên quyết, quyết tâm hoặc sự nhận thức rõ ràng của người nói về việc cần thiết phải thực hiện một hành động ('chắc phải...', 'phải làm mới được').",
    "longExplanation": "'~아/어야겠다' là sự kết hợp giữa cấu trúc điều kiện bắt buộc '-아/어야 하다' (phải làm) và vĩ tố chỉ ý chí, phỏng đoán '-겠-'. Cấu trúc này dùng khi người nói tự nhận thấy tính cấp thiết của một việc nào đó và tự nhủ hoặc tuyên bố quyết tâm của chính mình rằng 'mình chắc chắn phải làm điều này' để giải quyết tình huống.",
    "formation": "Thân động từ + -아/어야겠다 (gốc chứa ㅏ, ㅗ dùng -아야겠다; gốc khác dùng -어야겠다; 하다 chuyển thành 해야겠다)",
    "examples": [
      {
        "translation": "Nếu bạn cứ tiếp tục không chịu giải quyết công việc đó thì tôi chắc phải làm điều gì đó thôi."
      },
      {
        "translation": "Để không lặp lại sai lầm như thế này nữa thì tôi nhất định phải luyện tập nhiều hơn."
      },
      {
        "translation": "Chúng ta phải nỗ lực nhiều hơn nữa để cải thiện việc giao tiếp với các thành viên trong đội."
      },
      {
        "translation": "Để thi đỗ kỳ thi lần này, tôi chắc chắn phải học tập chăm chỉ hơn nữa."
      }
    ]
  },
  "ko_해서는_162": {
    "title": "~아/어서는 안 되다 (Không được phép làm gì, cấm làm)",
    "shortExplanation": "Biểu thị sự nghiêm cấm, không được phép thực hiện một hành động nào đó vì trái với quy tắc, đạo lý hoặc quy định ('không được phép làm...', 'chớ có làm...').",
    "longExplanation": "'~아/어서는 안 되다' là cấu trúc cấm đoán mang tính trang trọng và chuẩn mực, kết hợp giữa vĩ tố liên kết '-아/어서', trợ từ nhấn mạnh '-는', phó từ phủ định '안' và động từ '되다' (được). Cấu trúc này dùng để cấm đoán một hành vi hoặc cảnh báo nghiêm khắc rằng nếu làm điều đó thì sẽ không được chấp nhận về mặt luật pháp, quy tắc xã hội, đạo đức hoặc tạo ra hậu quả nghiêm trọng.",
    "formation": "Thân động từ + -아/어서는 안 되다 (gốc chứa ㅏ, ㅗ dùng -아서는 안 되다; gốc khác dùng -어서는 안 되다; 하다 chuyển thành 해서는 안 되다)",
    "examples": [
      {
        "translation": "Không được sao chép tài liệu đó. Đó là bí mật kinh doanh của công ty."
      },
      {
        "translation": "Trong hoàn cảnh khó khăn chớ có nói dối. Điều đó có thể phá vỡ lòng tin."
      },
      {
        "translation": "Không được gian lận trong kỳ thi. Việc đó sẽ hủy hoại điểm số của bạn."
      },
      {
        "translation": "Không được phản bội bạn bè. Điều đó sẽ phá hủy một mối quan hệ quý giá."
      }
    ]
  },
  "ko_해야_163": {
    "title": "~해야 하다 (Phải làm gì, cần phải)",
    "shortExplanation": "Biểu thị nghĩa vụ, bổn phận hoặc sự tất yếu phải thực hiện một hành động nào đó ('phải làm...', 'cần phải...').",
    "longExplanation": "'~해야 하다' (hoặc '~해야 되다') được dùng để diễn tả một hành động mang tính bắt buộc, người nói hoặc chủ ngữ không có lựa chọn nào khác ngoài việc phải tiến hành hành động đó. Thường tương đương với 'phải', 'cần phải' trong tiếng Việt. Trong văn nói thân mật, dạng '~해야 되다' cũng được sử dụng rất phổ biến thay cho '~해야 하다'.",
    "formation": "Thân động từ + -아/어야 하다 (hoặc -아/어야 되다)",
    "examples": [
      {
        "translation": "Vì tôi phải về nhà nên tôi phải hủy cuộc hẹn. Nếu không thì có lẽ tôi sẽ bị muộn mất."
      },
      {
        "translation": "Tôi có bài kiểm tra vào ngày mai nên tối nay phải học bài. Nếu không học thì tôi nghĩ mình sẽ không thể đạt điểm cao."
      },
      {
        "translation": "Cuối tuần này bố tôi phải đi bệnh viện nên tôi phải chăm sóc bố."
      },
      {
        "translation": "Vì nền hòa bình của toàn thế giới, tất cả các quốc gia đều phải cùng nhau nỗ lực."
      }
    ]
  },
  "ko_했더니_164": {
    "title": "~했더니 (Sau khi làm gì thì nhận thấy, làm... thế là)",
    "shortExplanation": "Dùng khi người nói thực hiện một hành động trong quá khứ rồi nhận thấy một kết quả bất ngờ, một sự thật mới, hoặc dẫn đến kết quả ở vế sau ('sau khi làm... thì thấy/thế là').",
    "longExplanation": "'~했더니' là sự kết hợp của vĩ tố quá khứ '-았/었-' và vĩ tố hồi tưởng kết nối '-더니'. Cấu trúc này thường dùng với chủ ngữ ngôi thứ nhất ở vế trước, diễn tả việc sau khi người nói đã trực tiếp thực hiện một hành vi nào đó thì lập tức phát hiện ra một sự thật bất ngờ, hoặc hành vi đó dẫn tới một kết quả hay phản ứng ngoài dự tính ở vế sau.",
    "formation": "Thân động từ + -았/었더니 (thường dùng với chủ ngữ ngôi thứ nhất ở vế trước)",
    "examples": [
      {
        "translation": "Sáng nay tôi thức dậy sớm, thế là cơn đau đầu lại càng trở nên dữ dội hơn."
      },
      {
        "translation": "Tôi gọi điện thoại cho cô ấy, thì thấy cô ấy đã về tới nhà rồi."
      },
      {
        "translation": "Tôi ăn tối rồi làm bài tập xong, sao mà ngoảnh đi ngoảnh lại đã 12 giờ đêm rồi thế này?"
      },
      {
        "translation": "Tôi mua đôi giày ở cửa tiệm, thế mà khi về đến nhà thì chân lại bị đau."
      }
    ]
  },
  "ko_했었다_165": {
    "title": "~했었다 (Đã từng, trước đây đã từng làm gì)",
    "shortExplanation": "Biểu thị một hành động hoặc trạng thái đã hoàn toàn xảy ra và kết thúc trong quá khứ, hiện tại không còn tiếp diễn nữa ('từng...', 'đã từng...').",
    "longExplanation": "'~했었다' là sự lặp lại vĩ tố chỉ thời quá khứ ('-았/었- + -었-'), tạo thành hình thái quá khứ hoàn thành hay quá khứ gián đoạn. Cấu trúc này nhấn mạnh rằng hành động hoặc trạng thái đó đã xảy ra trong quá khứ xa hơn và hiện tại tình thế đã thay đổi, không còn tiếp diễn hay duy trì nữa.",
    "formation": "Thân động từ / Thân tính từ + -았/었었다",
    "examples": [
      {
        "translation": "Trước khi kết hôn tôi đã từng đi du lịch rất nhiều. Thế nhưng sau khi có con thì không thể thường xuyên đi được nữa."
      },
      {
        "translation": "Ngoảnh nhìn lại thời thanh xuân năm ấy, tôi mới nhận ra rằng mình đã từng thực sự vô cùng hạnh phúc."
      },
      {
        "translation": "Khi mẹ đến nơi thì tôi đã dùng xong bữa tối từ trước đó rồi."
      },
      {
        "translation": "Vào thời điểm bạn đến nơi thì máy bay đã cất cánh từ trước đó rồi."
      }
    ]
  },
  "ko_했으면_166": {
    "title": "~했으면 좋겠다 (Ước gì, hy vọng rằng, giá mà)",
    "shortExplanation": "Dùng để diễn tả ước muốn, mong ước hoặc hy vọng một sự việc hay trạng thái nào đó sẽ xảy ra ('ước gì...', 'hy vọng là...').",
    "longExplanation": "'~했으면 좋겠다' (hoặc '-았/었으면 좋겠다') được cấu thành từ vĩ tố quá khứ '-았/었-', vĩ tố điều kiện '-으면' và cụm '좋겠다' (thì tốt biết mấy). Cấu trúc này dùng để diễn đạt ước nguyện cá nhân về một việc chưa xảy ra hoặc giả định, thể hiện mong muốn tình huống đó trở thành hiện thực.",
    "formation": "Thân động từ / Thân tính từ + -았/었으면 좋겠다 (hoặc -았/었으면 하다)",
    "examples": [
      {
        "translation": "Tôi hy vọng mình sẽ đỗ kỳ thi lần này. Có như vậy thì tôi mới có thể thực hiện được ước mơ của mình."
      },
      {
        "translation": "Ước gì ngày mai thời tiết đẹp. Vì có như thế chúng tôi mới có thể vui chơi ngoài trời."
      },
      {
        "translation": "Tôi cầu mong cô ấy sẽ được hạnh phúc. Cô ấy đã phải nếm trải quá nhiều gian truân rồi."
      },
      {
        "translation": "Tôi hy vọng đội chúng tôi sẽ giành chiến thắng. Chúng tôi đã tập luyện hết sức chăm chỉ mà."
      }
    ]
  },
  "ko_했을_167": {
    "title": "~했을 때 (Khi đã làm gì, vào thời điểm đã làm)",
    "shortExplanation": "Diễn tả thời điểm một hành động hoặc sự việc đã xảy ra hoặc đã hoàn tất trong quá khứ ('khi đã làm...', 'vào lúc...').",
    "longExplanation": "'~했을 때' (hoặc '-았/었을 때') là sự kết hợp giữa vĩ tố quá khứ '-았/었-', định ngữ '-(으)ㄹ' và danh từ phụ thuộc '때' (khi, lúc). Cấu trúc này dùng để xác định chính xác thời điểm một hành động đã diễn ra trong quá khứ, vế sau thường miêu tả tình huống, cảm xúc hoặc sự kiện xảy ra vào chính thời điểm đó.",
    "formation": "Thân động từ / Thân tính từ + -았/었을 때",
    "examples": [
      {
        "translation": "Khi tôi về đến nhà, mẹ đang chuẩn bị bữa tối."
      },
      {
        "translation": "Khi xem bộ phim đó, tôi đã khóc rất nhiều."
      },
      {
        "translation": "Khi chuyển nhà ra nước ngoài, lúc đầu tôi đã gặp rất nhiều khó khăn."
      },
      {
        "translation": "Khi tôi tốt nghiệp, cha mẹ đã cảm thấy vô cùng tự hào."
      }
    ]
  },
  "ko_했을_168": {
    "title": "~했을 텐데 (Chắc là đã..., lẽ ra đã...)",
    "shortExplanation": "Dùng để phỏng đoán mạnh mẽ về một tình huống trong quá khứ hoặc biểu thị sự tiếc nuối về điều giả định lẽ ra đã xảy ra ('chắc là đã...', 'lẽ ra đã... rồi').",
    "longExplanation": "'~했을 텐데' (hoặc '-았/었을 텐데') là dạng rút gọn của '-았/었을 터인데'. Cấu trúc này kết hợp vĩ tố quá khứ '-았/었-', định ngữ phỏng đoán '-(으)ㄹ', danh từ phụ thuộc '터' (ý định, dự liệu) và vĩ tố bối cảnh '-ㄴ데'. Thường đi kèm với mệnh đề giả định quá khứ trái với thực tế '만약 ~았/었더라면' (nếu như đã... thì lẽ ra đã...) để thể hiện sự nuối tiếc, hoặc đơn thuần đưa ra nhận định phỏng đoán về bối cảnh quá khứ làm tiền đề cho câu sau.",
    "formation": "Thân động từ / Thân tính từ + -았/었을 텐데",
    "examples": [
      {
        "translation": "Nếu biết trước thì tôi đã không đưa ra quyết định như thế, rốt cuộc lại lãng phí bao nhiêu thời gian và công sức."
      },
      {
        "translation": "Nếu khẩn trương hơn thì lẽ ra đã có thể nắm bắt được cơ hội đó rồi, giờ thì quá muộn mất rồi."
      },
      {
        "translation": "Nếu lúc đó tôi ngỏ lời với cô ấy thì mọi chuyện chắc đã khác, thế nhưng tôi đã không thể làm được điều đó."
      },
      {
        "translation": "Nếu làm việc chăm chỉ đến mức ấy thì lẽ ra đã thành công rồi, dù vậy tôi vẫn hài lòng với lựa chọn của mình."
      }
    ]
  },
  "ko_했지만_169": {
    "title": "~했지만 (Đã làm... nhưng, tuy đã... nhưng)",
    "shortExplanation": "Nối hai vế câu diễn tả sự đối lập hoặc kết quả trái ngược xảy ra trong quá khứ ('đã làm... nhưng mà...').",
    "longExplanation": "'~했지만' (hoặc '-았/었지만') là sự kết hợp giữa vĩ tố quá khứ '-았/었-' và vĩ tố liên kết tương phản '-지만' (nhưng, tuy nhiên). Cấu trúc này dùng để nối hai vế câu trong quá khứ, trong đó vế sau đưa ra một kết quả, thực tế hoặc cảm xúc trái ngược hoàn toàn với mong đợi hay tiền đề của vế trước.",
    "formation": "Thân động từ / Thân tính từ + -았/었지만",
    "examples": [
      {
        "translation": "Hôm qua tôi đã học bài rất nhiều nhưng kết quả thi lại không được tốt."
      },
      {
        "translation": "Anh ấy đã làm việc vô cùng vất vả nhưng nỗ lực lại không được công nhận xứng đáng."
      },
      {
        "translation": "Tôi vừa mới hoàn thành xong việc đó, nhưng thật sự là quá đỗi vất vả."
      },
      {
        "translation": "Chúng tôi đã chạy thật là nhanh nhưng vẫn không đuổi kịp xe buýt."
      }
    ]
  },
  "ko_했다_170": {
    "title": "~했다 (Đã làm - Đuôi câu quá khứ lối trần thuật)",
    "shortExplanation": "Đuôi câu trần thuật dạng hạ xưng (thể văn viết hoặc nói thân mật không kính ngữ), biểu thị hành động hoặc trạng thái đã diễn ra và kết thúc trong quá khứ ('đã làm...').",
    "longExplanation": "'~했다' (hoặc '-았/었다') là dạng kết thúc câu tường thuật thời quá khứ thuộc lối nói hạ xưng. Dạng này được sử dụng rộng rãi trong các văn bản viết khách quan như nhật ký, sách báo, bài luận, tin tức hoặc trong đối thoại thường nhật thân mật không dùng kính ngữ với người dưới, bạn bè thân thiết. Nó biểu thị hành động đã hoàn tất trong quá khứ.",
    "formation": "Thân động từ / Thân tính từ + -았/었다 (động từ có đuôi 하다 chuyển thành 했다)",
    "examples": [
      {
        "translation": "Rốt cuộc tôi cũng giải được bài toán mà hôm qua không hiểu. Thật là vui sướng."
      },
      {
        "translation": "Chúng tôi đã khép lại sự kiện lần này một cách thành công tốt đẹp. Mọi người tuy mệt mỏi nhưng thật là bõ công."
      },
      {
        "translation": "Hôm qua tôi đã học bài rất nhiều. Hôm nay chắc là phải nghỉ ngơi một chút thôi."
      },
      {
        "translation": "Cuối tuần trước tôi đã đi mua sắm cùng bạn bè và mua được nhiều quần áo thú vị."
      }
    ]
  },
  "ko_거든요_0": {
    "title": "~거든요 (Là vì... đấy, số là... đấy mà)",
    "shortExplanation": "Đuôi câu thân mật dùng để giải thích lý do hoặc cung cấp thông tin nền tảng mà người nghe có thể chưa biết ('vì là... đấy mà', 'bởi vì... mà').",
    "longExplanation": "'~거든요' là đuôi câu kết thúc thường dùng trong văn nói hàng ngày. Người nói sử dụng cấu trúc này nhằm đưa ra lý do giải thích cho hành động, thái độ của mình, hoặc hé lộ một bối cảnh/sự thật mà họ cho rằng đối phương chưa hề hay biết. Trong nhiều trường hợp, đuôi câu này mang sắc thái biện bạch hoặc chia sẻ thông tin một cách nhẹ nhàng, tự nhiên.",
    "formation": "Thân động từ / Thân tính từ + -거든요, Danh từ + -(이)거든요",
    "examples": [
      {
        "translation": "Số là tôi đã đi học từ rất lâu về trước rồi, thế nên tôi cũng không rõ hệ thống giáo dục hiện nay đã thay đổi như thế nào."
      },
      {
        "translation": "Sở dĩ tôi đi muộn là vì xe buýt đến trễ đấy chứ, thế nên tôi mới không kịp giờ."
      },
      {
        "translation": "Tôi không uống cà phê đâu. Cà phê chứa nhiều caffeine lắm đấy, uống vào là tôi không ngủ được."
      },
      {
        "translation": "Ở nhà suốt cả ngày chán thật đấy. Thời tiết lạnh buốt quá mà, thế nên tôi không thể ra ngoài được."
      }
    ]
  },
  "ko_게_2": {
    "title": "~게 하다 (Làm cho, bắt, cho phép ai làm gì)",
    "shortExplanation": "Biểu thị sự sai khiến, tác động hoặc cho phép người khác thực hiện một hành động nào đó ('bắt làm...', 'để cho...', 'làm cho...').",
    "longExplanation": "'~게 하다' là dạng sai khiến dài (trường hình sai khiến) trong tiếng Hàn, tạo bởi vĩ tố phó từ hóa '-게' và trợ động từ '하다'. Cấu trúc này dùng để diễn đạt việc chủ thể thúc đẩy, bảo, cho phép hoặc khiến một đối tượng khác thực hiện một hành động hoặc biến chuyển sang trạng thái mới.",
    "formation": "Thân động từ / Thân tính từ + -게 하다",
    "examples": [
      {
        "translation": "Giá máy giặt đắt quá nên chủ tiệm đã giảm giá cho tôi, tạo điều kiện để tôi có thể mua được."
      },
      {
        "translation": "Cô ấy làm cho tôi cảm thấy vui vẻ và thúc đẩy tôi hoạt động tích cực hơn nữa."
      },
      {
        "translation": "Mẹ đã đưa tôi đến thư viện để tôi có thể học tiếng Anh."
      },
      {
        "translation": "Các thành viên trong nhóm đã giúp đỡ để tôi có thể được thăng chức."
      }
    ]
  },
  "ko_게_3": {
    "title": "~게 해서는 안 되다 (Không được để cho, không được làm cho ai làm gì)",
    "shortExplanation": "Dùng để cấm đoán hoặc răn đe mạnh mẽ rằng không được phép bắt, xúi giục hay để mặc cho ai đó làm một hành động nào đó ('không được để cho...').",
    "longExplanation": "'~게 해서는 안 되다' là sự kết hợp giữa cấu trúc sai khiến '-게 하다', trợ từ nhấn mạnh đối chiếu '-는' và cấu trúc cấm chỉ '-어서는 안 되다' (không được làm gì). Cấu trúc này dùng để nhấn mạnh tính nguyên tắc, đạo đức hoặc trách nhiệm rằng tuyệt đối không được để mặc, không được ép buộc hoặc không được cho phép một đối tượng nào đó thực hiện hành vi bị coi là sai trái hoặc không phù hợp.",
    "formation": "Thân động từ + -게 해서는 안 되다",
    "examples": [
      {
        "translation": "Không được để cho người ta chỉ biết tập trung vào bài thi của riêng mình. Còn phải biết quan tâm đến việc học của những người khác nữa."
      },
      {
        "translation": "Không được phép để công việc tiến hành khi chưa kiểm tra kỹ kế hoạch từ trước."
      },
      {
        "translation": "Không được để trẻ em chỉ mải xem tivi. Chúng cần cả những hoạt động khác như đọc sách nữa."
      },
      {
        "translation": "Tuyệt đối không được để khách hàng phải chờ đợi lâu. Dịch vụ cần phải nhanh chóng."
      }
    ]
  },
  "ko_겠다_4": {
    "title": "겠다 (Sẽ [ý chí], chắc là [suy đoán])",
    "shortExplanation": "Vĩ tố kết thúc/tiền kết thúc câu biểu thị ý chí quyết tâm của người nói ('sẽ'), hoặc phỏng đoán tình huống dựa trên quan sát ('chắc là, có lẽ').",
    "longExplanation": "'-겠-' là một trong những vĩ tố linh hoạt và quan trọng nhất trong tiếng Hàn. Với chủ ngữ ngôi thứ nhất, nó biểu thị ý chí, dự định hoặc quyết tâm thực hiện hành vi trong tương lai ('tôi sẽ làm...'). Với chủ ngữ ngôi thứ hai, thứ ba hoặc hiện tượng tự nhiên, nó biểu thị sự phỏng đoán chắc chắn của người nói về trạng thái hoặc sự việc dựa trên mắt thấy tai nghe ('trông có vẻ...', 'chắc là...'). Ngoài ra, nó còn dùng để thể hiện thái độ khiêm tốn, lịch sự.",
    "formation": "Thân động từ / Thân tính từ + -겠- (kết hợp với đuôi câu: -겠어요, -겠습니다, -겠다)",
    "examples": [
      {
        "translation": "Tối nay chắc là trời sẽ mưa đấy. Mây trông dày đặc và tối sầm lại rồi kìa."
      },
      {
        "translation": "Chắc hẳn là người ấy sẽ giận tôi lắm đây. Vì tôi đã không làm theo chỉ thị mà."
      },
      {
        "translation": "Nếu đọc hết cuốn sách này thì chắc là tôi sẽ hiểu tiếng Hàn rõ hơn. Trong sách có nhiều từ vựng và ngữ pháp mới lắm."
      },
      {
        "translation": "Sang tuần tới tôi sẽ đăng ký tham gia một câu lạc bộ thể thao mới. Tôi đang muốn bắt đầu một hoạt động mới mẻ nào đó mà."
      }
    ]
  },
  "ko_고_5": {
    "title": "~고 말다 (Cuối cùng đành phải, rốt cuộc lại... mất)",
    "shortExplanation": "Nhấn mạnh kết quả cuối cùng xảy ra ngoài ý muốn, thường đi kèm với sự tiếc nuối, bất đắc dĩ ('rốt cuộc lại... mất', 'cuối cùng đành phải...').",
    "longExplanation": "'~고 말다' kết hợp giữa vĩ tố liên kết '-고' và trợ động từ '말다' (dừng lại, kết thúc). Cấu trúc này thường dùng ở thì quá khứ ('-고 말았다') để nhấn mạnh một diễn biến sau nhiều nỗ lực hoặc biến cố cuối cùng lại khép lại bằng một kết cục bất đắc dĩ, trái với mong đợi, khiến người nói cảm thấy nuối tiếc hoặc thất vọng. Đôi khi ở thì tương lai, nó thể hiện quyết tâm sắt đá sẽ làm cho bằng được.",
    "formation": "Thân động từ + -고 말다 (thường dùng ở dạng quá khứ: -고 말았다 / -고 말았습니다)",
    "examples": [
      {
        "translation": "Tôi đã chờ suốt một thời gian dài, thế nhưng rốt cuộc đành phải ăn một mình. Vì bạn bè chẳng có ai đến cả."
      },
      {
        "translation": "Vì tối qua ngủ quá muộn nên rốt cuộc tôi đã bị đi làm muộn mất."
      },
      {
        "translation": "Cậu ấy cứ chần chừ trì hoãn việc học, rốt cuộc đã bị trượt kỳ thi."
      },
      {
        "translation": "Tôi đã chạy hết sức mình nhưng rốt cuộc vẫn không thể giành được vị trí thứ nhất."
      }
    ]
  },
  "ko_고_7": {
    "title": "~고 싶다 (Muốn làm gì)",
    "shortExplanation": "Diễn tả nguyện vọng, mong muốn thực hiện một hành động nào đó của người nói hoặc chủ ngữ ('muốn làm...').",
    "longExplanation": "'~고 싶다' gắn vào sau thân động từ để biểu thị mong muốn hoặc nguyện vọng của người nói (trong câu trần thuật ngôi thứ nhất) hoặc hỏi về mong muốn của người nghe (trong câu nghi vấn ngôi thứ hai). Khi nói về nguyện vọng của ngôi thứ ba (người khác), cấu trúc này thường chuyển thành '~고 싶어 하다'. Dạng phủ định là '~고 싶지 않다' hoặc '안 ~고 싶다'.",
    "formation": "Thân động từ + -고 싶다",
    "examples": [
      {
        "translation": "Tôi muốn học tiếng Hàn, vì vậy tôi học mỗi ngày."
      },
      {
        "translation": "Bạn tôi bảo rằng ngày mai muốn xem phim nên tôi định đi mua vé."
      },
      {
        "translation": "Tối nay tôi không muốn về nhà nên sẽ ở lại nhà bạn."
      },
      {
        "translation": "Vì muốn học nấu ăn nên tôi đã từng muốn vào trường dạy nấu ăn."
      }
    ]
  },
  "ko_고_8": {
    "title": "~고 있다 (Đang làm gì, duy trì trạng thái)",
    "shortExplanation": "Diễn tả một hành động đang trong quá trình diễn ra ('đang làm...') hoặc trạng thái kết quả của hành động đang tiếp tục duy trì.",
    "longExplanation": "'~고 있다' gắn vào thân động từ, tương đương với thì hiện tại tiếp diễn trong tiếng Việt ('đang...'). Ngoài ra, khi kết hợp với các động từ chỉ sự mặc, đeo, mang (입다, 쓰다, 신다, 타다, 가지다...), cấu trúc này còn diễn tả trạng thái kết quả của hành động đó vẫn đang tiếp diễn hoặc được duy trì. Khi thể hiện sự tôn kính với chủ ngữ, dùng dạng '~고 계시다'.",
    "formation": "Thân động từ + -고 있다 (dạng kính ngữ: -고 계시다)",
    "examples": [
      {
        "translation": "Cô ấy đang đọc sách dưới ánh nắng mặt trời."
      },
      {
        "translation": "Những bông hoa đang đung đưa theo làn gió."
      },
      {
        "translation": "Suốt cả năm nay anh ấy luôn bị căng thẳng."
      },
      {
        "translation": "Bố tôi hiện đang đi du lịch vòng quanh châu Âu."
      }
    ]
  },
  "ko_고자_9": {
    "title": "~고자 하다 (Dự định làm, nhằm mục đích)",
    "shortExplanation": "Biểu thị ý định, mục đích hoặc kế hoạch trang trọng của người nói ('định làm...', 'nhằm mục đích...', 'để mà...').",
    "longExplanation": "'~고자 하다' được cấu thành từ vĩ tố kết nối biểu thị mục đích '-고자' và động từ '하다'. Cấu trúc này thường dùng trong các bối cảnh trang trọng, văn phong viết, bài phát biểu hoặc báo cáo chính thức để diễn đạt ý định, kế hoạch hay quyết tâm thực hiện một việc gì đó. Bản thân '-고자' cũng thường đứng giữa câu để nối với mệnh đề chỉ hành động thực hiện mục đích đó.",
    "formation": "Thân động từ + -고자 하다 (hoặc Thân động từ + -고자 + Động từ chính)",
    "examples": [
      {
        "translation": "Để nâng cao năng lực tiếng Hàn, ngày nào tôi cũng xem phim truyền hình Hàn Quốc."
      },
      {
        "translation": "Để chăm sóc sức khỏe của bản thân, mỗi buổi sáng tôi đều dậy sớm và tập thể dục."
      },
      {
        "translation": "Nhằm thực hiện cam kết bảo vệ môi trường, doanh nghiệp đã áp dụng bao bì thân thiện với môi trường cho sản phẩm."
      },
      {
        "translation": "Để tìm kiếm hạnh phúc đích thực, cô ấy đã lên đường đi du lịch đến một đất nước xa xôi."
      }
    ]
  },
  "ko_곤_10": {
    "title": "~곤 하다 (Thường hay làm, thỉnh thoảng lại làm)",
    "shortExplanation": "Biểu thị một hành động hoặc trạng thái diễn ra lặp đi lặp lại như một thói quen trong hiện tại hoặc quá khứ ('thường hay làm...', 'vẫn thường...').",
    "longExplanation": "'~곤 하다' là dạng rút gọn của cụm cấu trúc '-고는 하다', trong đó '-고는' là sự kết hợp của vĩ tố liên kết '-고' và trợ từ nhấn mạnh '-는'. Cấu trúc này dùng để diễn đạt những thói quen lặp đi lặp lại nhiều lần. Khi chia ở thời quá khứ '~곤 했다', nó diễn tả một thói quen hoặc hành động thường xuyên diễn ra trong quá khứ nhưng nay có thể đã không còn nữa.",
    "formation": "Thân động từ + -곤 하다 (thường dùng ở dạng -곤 해요, -곤 했다)",
    "examples": [
      {
        "translation": "Mỗi khi trong lòng cảm thấy mệt mỏi, tôi lại thường hay đọc sách. Làm như vậy thường xoa dịu được nỗi niềm nhung nhớ."
      },
      {
        "translation": "Mỗi sáng thức dậy tôi đều thường mở cửa sổ. Tôi thường hít thở và đón lấy bầu không khí trong lành."
      },
      {
        "translation": "Mỗi khi phát hiện ra một công thức mới cô ấy lại thường thử làm theo. Vì thế cô ấy luôn thường làm ra những món ăn mới lạ."
      },
      {
        "translation": "Sau khi tập thể dục tôi luôn thường giãn cơ. Làm như vậy thường giúp cơ bắp không bị căng cứng."
      }
    ]
  },
  "ko_기도_11": {
    "title": "~기도 하다 (Đôi khi cũng làm, cũng có lúc)",
    "shortExplanation": "Diễn tả một hành động thỉnh thoảng mới diễn ra, hoặc liệt kê bổ sung thêm một hành động khác ('cũng có lúc làm...', 'đôi khi cũng...').",
    "longExplanation": "'~기도 하다' được hình thành từ danh từ hóa '-기', trợ từ đồng hóa/nhấn mạnh '-도' (cũng) và trợ động từ '하다'. Cấu trúc này dùng để biểu đạt rằng một hành động hay trạng thái nào đó thỉnh thoảng vẫn xảy ra, hoặc dùng để liệt kê rằng chủ ngữ ngoài việc làm A thì đôi khi cũng làm cả B nữa. Khi đi với tính từ, nó diễn đạt tính chất/trạng thái đó cũng đồng thời tồn tại.",
    "formation": "Thân động từ / Thân tính từ + -기도 하다",
    "examples": [
      {
        "translation": "Tôi thường xem bóng đá, nhưng đôi khi cũng xem cả bóng chày nữa."
      },
      {
        "translation": "Dù cô ấy nấu ăn rất giỏi nhưng vẫn còn nhiều điều cần học hỏi, vì vậy đôi khi cô ấy cũng đến các lớp dạy nấu ăn."
      },
      {
        "translation": "Chúng tôi chủ yếu đi leo núi, nhưng thỉnh thoảng cũng đi dã ngoại bên bờ sông."
      },
      {
        "translation": "Thường thì tôi dậy từ sáng sớm, nhưng đôi khi tôi cũng ngủ nướng."
      }
    ]
  },
  "ko_기로_12": {
    "title": "~기로 (Quyết định làm, hẹn ước làm)",
    "shortExplanation": "Đi liền với các động từ phán đoán hoặc cam kết (하다, 결정하다, 약속하다...) để biểu thị sự quyết định hoặc giao hẹn sẽ thực hiện một việc gì đó ('quyết định làm...', 'hứa sẽ...').",
    "longExplanation": "'~기로' là sự kết hợp của vĩ tố danh từ hóa '-기' và trợ từ phương hướng/cách thức '-로'. Cấu trúc này thường đi kèm với các động từ như '하다' (làm/quyết định), '결정하다' (quyết định), '약속하다' (hứa hẹn), '마음먹다' (quyết tâm)... để diễn đạt một kế hoạch, sự lựa chọn dứt khoát hoặc một lời giao ước sẽ thực hiện hành động ở vế trước.",
    "formation": "Thân động từ + -기로 (thường đi với 하다, 결정하다, 약속하다...)",
    "examples": [
      {
        "translation": "Cô ấy đã quyết định tuần sau sẽ tham gia kỳ thi."
      },
      {
        "translation": "Tôi đã hứa ngày mai sẽ cùng bạn bè đi xem phim."
      },
      {
        "translation": "Bố mẹ tôi đã quyết định sang năm sẽ chuyển đến một ngôi nhà mới."
      },
      {
        "translation": "Chúng tôi đã quyết định sẽ thảo luận về vấn đề này trong cuộc họp tiếp theo."
      }
    ]
  },
  "ko_기로_13": {
    "title": "~기로 되다 (Được quyết định là, có lịch/kế hoạch là)",
    "shortExplanation": "Diễn tả một kế hoạch, lịch trình hoặc quy định đã được sắp xếp, ấn định do hoàn cảnh khách quan, tập thể hoặc thỏa thuận chung ('được quyết định là...', 'theo kế hoạch thì...').",
    "longExplanation": "'~기로 되다' được tạo thành từ cấu trúc danh từ hóa '-기로' kết hợp với động từ bị động/trạng thái '되다' (được, trở thành). Khác với '~기로 하다' (nhấn mạnh quyết định chủ quan của cá nhân), cấu trúc này nhấn mạnh rằng sự việc, lịch trình hay quy định đã được cơ quan, đoàn thể, ngoại cảnh hoặc nhiều bên cùng thống nhất ấn định, mang tính khách quan.",
    "formation": "Thân động từ + -기로 되다",
    "examples": [
      {
        "translation": "Ở công ty đã có quyết định là sẽ họp vào thứ Hai."
      },
      {
        "translation": "Chúng tôi đã có hẹn gặp nhau vào lúc 3 giờ chiều ngày mai."
      },
      {
        "translation": "Đám cưới với cô ấy đã được ấn định là sẽ tổ chức vào năm sau."
      },
      {
        "translation": "Tuần tới tôi đã có kế hoạch đi du lịch cùng bạn bè."
      }
    ]
  },
  "ko_기로_14": {
    "title": "~기로 하다 (Quyết định làm, hẹn sẽ làm)",
    "shortExplanation": "Diễn tả quyết định chủ quan, sự hạ quyết tâm hoặc lời hẹn ước của chủ ngữ về một hành động trong tương lai ('quyết định làm...', 'hẹn nhau làm...').",
    "longExplanation": "'~기로 하다' là cấu trúc biểu đạt ý chí chủ quan rất phổ biến trong tiếng Hàn. Nó thể hiện rằng người nói hoặc các chủ thể đã đưa ra quyết định, lựa chọn dứt khoát hoặc thống nhất cùng nhau thực hiện một hành động nào đó. Khi chia ở thời quá khứ '~기로 했다', nó diễn tả quyết định hoặc lời hứa đã được xác lập từ trước đó.",
    "formation": "Thân động từ + -기로 하다",
    "examples": [
      {
        "translation": "Chúng tôi đã quyết định tuần sau sẽ đi du lịch. Nếu thời tiết đẹp thì định sẽ đi biển."
      },
      {
        "translation": "Tôi đã quyết định ngày mai sẽ đến phòng tập thể hình. Tôi quyết tâm bắt đầu tập luyện để trở nên khỏe mạnh hơn."
      },
      {
        "translation": "Seo-yoon đã quyết định trong tương lai sẽ tự mình tìm một công việc."
      },
      {
        "translation": "Tập đoàn chúng tôi đã quyết định tuyển dụng thêm nhiều nhân viên để mở rộng quy mô kinh doanh."
      }
    ]
  },
  "ko_기_15": {
    "title": "~기 시작하다 (Bắt đầu làm gì)",
    "shortExplanation": "Biểu thị thời điểm mở đầu hoặc khởi phát của một hành động, trạng thái nào đó ('bắt đầu làm...').",
    "longExplanation": "'~기 시작하다' được cấu thành từ vĩ tố danh từ hóa '-기' gắn vào thân động từ và động từ '시작하다' (bắt đầu). Cấu trúc này dùng để diễn đạt rằng một hành vi, thói quen hoặc biến đổi trạng thái nào đó đã bắt đầu xuất hiện hoặc được khởi động thực hiện.",
    "formation": "Thân động từ + -기 시작하다",
    "examples": [
      {
        "translation": "Cô ấy đã bắt đầu chơi đàn piano từ năm năm tuổi, vì thế hiện giờ cô ấy chơi đàn rất giỏi."
      },
      {
        "translation": "Mỗi sáng hễ vừa thức dậy là tôi bắt đầu uống cà phê ngay. Không có cà phê thì tôi không thể khởi đầu một ngày mới."
      },
      {
        "translation": "Ngay từ khi mới bắt đầu cuộc họp, chúng tôi đã bắt đầu thảo luận về những vấn đề nghiêm trọng."
      },
      {
        "translation": "Đã trôi qua một năm kể từ khi tôi bắt đầu học tiếng Hàn, thế nhưng vẫn còn rất nhiều điều cần phải học."
      }
    ]
  },
  "ko_기_16": {
    "title": "~기 위해서 (Để, nhằm mục đích)",
    "shortExplanation": "Biểu thị mục đích, mục tiêu hoặc lý do nhằm hướng tới để thực hiện hành động ở vế sau ('để làm...', 'nhằm mục đích...').",
    "longExplanation": "'~기 위해서' (hoặc dạng rút gọn '~기 위해') gắn vào sau thân động từ để chỉ mục đích hoặc mục tiêu của hành động được nêu ra ở mệnh đề chính. Nếu đi trực tiếp với danh từ, cấu trúc sẽ có dạng 'Danh từ + -을/를 위해(서)'. Cấu trúc này được sử dụng rất phổ biến trong cả văn viết trang trọng lẫn ngôn ngữ nói hàng ngày khi muốn làm rõ nguyên nhân, mục đích hành động.",
    "formation": "Thân động từ + -기 위해서 (hoặc Danh từ + -을/를 위해서)",
    "examples": [
      {
        "translation": "Để có thể giỏi tiếng Anh, mỗi buổi sáng tôi đều luyện nghe tiếng Anh."
      },
      {
        "translation": "Để trở thành vận động viên thể thao, sau khi tan học tôi luôn tham gia vào các buổi tập luyện."
      },
      {
        "translation": "Để thi đỗ kỳ thi, tôi đã đầu tư rất nhiều thời gian vào việc học."
      },
      {
        "translation": "Để có một cuộc sống hạnh phúc, việc yêu thương chính bản thân mình là điều vô cùng quan trọng."
      }
    ]
  },
  "ko_기는_17": {
    "title": "~기는 (Thì có... thật nhưng, công nhận là... nhưng)",
    "shortExplanation": "Thừa nhận một sự thật ở vế trước nhưng lại nêu ra một sự việc trái ngược, một ngoại lệ hoặc hạn chế ở vế sau ('thì có... thật đấy nhưng...').",
    "longExplanation": "'~기는' là sự kết hợp của vĩ tố danh từ hóa '-기' và trợ từ đối chiếu '-는'. Cấu trúc này thường đi trong dạng lặp từ '-기는 -다/하다' (ví dụ: '크기는 크다', '좋기는 하다') kèm theo vĩ tố liên kết tương phản như '-지만', '-ㄴ/은/는데'. Nó dùng để thừa nhận một sự thật hay tính chất ở vế trước nhưng ngay sau đó đưa ra một điều kiện ngược lại, một thực tế đối lập hoặc một hạn chế ở vế sau.",
    "formation": "Thân động từ / Thân tính từ + -기는 (thường đi kèm dạng: -기는 -지만, -기는 한데)",
    "examples": [
      {
        "translation": "Tôi thì thích đi du lịch thật đấy, nhưng đến giờ vẫn rất sợ đi máy bay."
      },
      {
        "translation": "Tòa nhà đó to thì có to thật, nhưng tình trạng quá xuống cấp nên có vẻ cần phải sửa chữa lại."
      },
      {
        "translation": "Người bạn đó thì tốt bụng thật đấy, nhưng thú thật là cậu ấy hỏi quá nhiều nên tôi thấy hơi bực bội."
      },
      {
        "translation": "Mùa này thì đúng là mùa xuân thật, nhưng thời tiết vẫn còn lạnh nên tôi đang chờ trời ấm lên."
      }
    ]
  },
  "ko_기에는_18": {
    "title": "~기에는 (Để mà làm gì thì..., đối với việc...)",
    "shortExplanation": "Dùng để lấy một hành động làm tiêu chuẩn hoặc tiền đề để đưa ra sự phán đoán, đánh giá về tính phù hợp, thời gian hoặc điều kiện ('để mà làm... thì...').",
    "longExplanation": "'~기에는' là sự kết hợp của vĩ tố danh từ hóa '-기', trợ từ vị trí '-에' và trợ từ đối chiếu/nhấn mạnh '-는'. Cấu trúc này dùng khi lấy một hành động hay trạng thái làm mốc chuẩn để đánh giá xem điều kiện, thời gian hay năng lực có đủ, quá mức hay không thích hợp (ví dụ: 'quá... để làm gì', 'thời gian không đủ để làm gì').",
    "formation": "Thân động từ / Thân tính từ + -기에는 (+ Bổ ngữ / Phán đoán)",
    "examples": [
      {
        "translation": "Tôi nghĩ rằng thời gian không đủ để chuẩn bị cho kỳ thi lần này."
      },
      {
        "translation": "Bên ngoài quá lạnh để có thể tập thể dục, vì thế tôi định tập ở nhà."
      },
      {
        "translation": "Để đạt được điểm số tốt thì bạn phải nỗ lực một cách chân thành."
      },
      {
        "translation": "Cũng có trường hợp người ta nghĩ rằng tuổi tác đã quá lớn để bắt đầu học bóng đá."
      }
    ]
  },
  "ko_기_19": {
    "title": "~기 전에 (Trước khi làm gì)",
    "shortExplanation": "Biểu thị một hành động xảy ra trước một hành động hoặc sự việc khác ('trước khi làm...').",
    "longExplanation": "'~기 전에' được kết hợp từ vĩ tố danh từ hóa '-기', danh từ chỉ thời gian '전' (trước) và trợ từ thời gian '-에'. Cấu trúc này dùng để xác định mốc thời gian trước khi một hành động diễn ra, thường dùng khi liệt kê thứ tự tuần tự của các bước, các lời dặn dò hoặc quy tắc hành vi.",
    "formation": "Thân động từ + -기 전에",
    "examples": [
      {
        "translation": "Trước khi tập thể dục bạn phải khởi động giãn cơ đầy đủ. Nếu không làm vậy thì có thể sẽ bị chấn thương."
      },
      {
        "translation": "Trước khi ra khỏi nhà bạn phải tắt điện. Nếu không thì có thể xảy ra hỏa hoạn."
      },
      {
        "translation": "Trước khi tiết học bắt đầu bạn phải nộp bài tập về nhà. Nếu không thì có thể sẽ bị trừ điểm."
      },
      {
        "translation": "Trước khi ăn bạn nhất định phải rửa tay. Nếu không thì có thể bị nhiễm vi khuẩn gây bệnh."
      }
    ]
  },
  "ko_나_20": {
    "title": "~나 보다 (Có vẻ như, dường như, chắc là)",
    "shortExplanation": "Dùng khi người nói dựa vào các manh mối, tình huống trực tiếp quan sát được để đưa ra phán đoán hoặc phỏng đoán ('dường như...', 'có vẻ là...').",
    "longExplanation": "'~나 보다' là sự kết hợp của vĩ tố nghi vấn '-나' và trợ động từ '보다'. Cấu trúc này dùng để đưa ra phỏng đoán dựa trên chứng cứ hoặc hoàn cảnh thực tế mà người nói trực tiếp chứng kiến. Thường gắn trực tiếp vào thân động từ, thân tính từ có vĩ tố thời gian (như '-았/었나 보다'), hoặc thân tính từ (ở văn nói). Đối với danh từ, dùng dạng 'Danh từ + -(이)인가 보다'.",
    "formation": "Thân động từ / Thân tính từ + -나 보다 (Thời quá khứ: -았/었나 보다; Danh từ: -(이)인가 보다)",
    "examples": [
      {
        "translation": "Có vẻ như cậu ấy mệt mỏi, vừa đến trường là đã ngủ suốt."
      },
      {
        "translation": "Dường như khi ngắm phong cảnh này tôi lại cảm thấy hạnh phúc. Vừa vẽ tranh mà tôi vừa rơi nước mắt."
      },
      {
        "translation": "Hình như trời đang mưa. Mọi người ở bên ngoài đang cầm ô."
      },
      {
        "translation": "Chắc là cô ấy bị cảm rồi. Thấy cô ấy cứ ho khan liên tục."
      }
    ]
  },
  "ko_나다_21": {
    "title": "~나다 (Rốt cuộc dẫn đến kết quả, kết cục là)",
    "shortExplanation": "Đi liền trong các quán ngữ hoặc kết cấu diễn tả một kết quả, sự việc cuối cùng đã xảy ra, an bài ngoài dự liệu hoặc sau một quá trình ('kết quả là...', 'rốt cuộc dẫn đến...').",
    "longExplanation": "Động từ '나다' mang nghĩa cơ bản là phát sinh, nảy sinh. Trong các kết cấu hoặc quán ngữ như '결정이 나다' (quyết định đã được đưa ra), '결론이 나다' (kết luận đã được rút ra), '끝나다' (kết thúc), '판가름이 나다' (phân định thắng thua)..., nó diễn tả một trạng thái hay kết cục cuối cùng đã được xác lập, đôi khi mang sắc thái kết quả xảy ra khách quan ngoài ý muốn ban đầu của chủ ngữ.",
    "formation": "Thường dùng trong các cụm cố định hoặc quán ngữ (như: Danh từ + -이/가 나다 / 끝나다 / -게 되다)",
    "examples": [
      {
        "translation": "Sau một hồi đắn đo suy nghĩ, rốt cuộc cô ấy đã đi đến quyết định nghe theo lời khuyên của bạn bè."
      },
      {
        "translation": "Tôi chỉ định đi mua sắm một chút thôi, thế nhưng rốt cuộc lại kết thúc bằng việc tiêu tốn rất nhiều tiền."
      },
      {
        "translation": "Hôm qua tôi định về nhà sớm, nhưng làm việc tới tận khuya nên rốt cuộc lại thành ra về nhà rất muộn."
      },
      {
        "translation": "Tôi đã định đi đến trường, nhưng cuối cùng trời mưa to quá nên đành phải ở nhà."
      }
    ]
  },
  "ko_나요_22": {
    "title": "~나요? (Đuôi câu hỏi nhẹ nhàng, thân mật, phải không?)",
    "shortExplanation": "Vĩ tố kết thúc câu nghi vấn dùng để hỏi một cách nhẹ nhàng, lịch sự hoặc xác nhận lại ý kiến của đối phương ('...phải không?', '...có... không?').",
    "longExplanation": "'~나요?' là vĩ tố kết thúc câu nghi vấn mang sắc thái mềm mỏng, thân mật và lịch sự, tránh cảm giác gay gắt hay chất vấn người nghe. Khi kết hợp với cấu trúc phủ định '-지 않나요?' hoặc đi với '그렇지 않나요?', nó mang ý nghĩa hỏi để tìm kiếm sự đồng thuận hoặc khẳng định lại một sự thật hiển nhiên ('chẳng phải là... hay sao?', 'đúng vậy không?').",
    "formation": "Thân động từ / Thân tính từ + -나요? (Thường dùng: Thân động từ/tính từ + -지 않나요? / 그렇지 않나요?)",
    "examples": [
      {
        "translation": "Thời tiết hôm nay không được tốt lắm nhỉ? Vì trời cứ mưa liên tục thế này."
      },
      {
        "translation": "Bạn sẽ dùng bữa tối cùng với tôi, có đúng không nào?"
      },
      {
        "translation": "Dạo này tôi bận rộn quá chừng, cuối tuần chẳng phải là rất cần được nghỉ ngơi hay sao?"
      },
      {
        "translation": "Tất cả chúng ta đều phải tiêm vắc-xin Covid, đúng thế không ạ?"
      }
    ]
  },
  "ko_는_23": {
    "title": "~는 대로 / ~대로 (Cứ theo, y như, đúng theo)",
    "shortExplanation": "Biểu thị việc thực hiện hoặc diễn ra hoàn toàn tuân theo, đúng y như trạng thái, quy tắc hoặc chỉ dẫn ('cứ theo...', 'y như...', 'đúng như...').",
    "longExplanation": "'~는 대로' (gắn sau thân động từ) hoặc '~대로' (gắn trực tiếp sau danh từ) được dùng để nhấn mạnh việc tiến hành một việc một cách chính xác theo mẫu, theo quy tắc, dự đoán hoặc lời chỉ dẫn ban đầu mà không có sự thay đổi. Cấu trúc này mang ý nghĩa 'đúng như', 'y như', 'theo đúng như những gì đã thấy/đã định'.",
    "formation": "Thân động từ + -는 대로 / Danh từ + 대로",
    "examples": [
      {
        "translation": "Vẽ tranh thì cứ vẽ theo tự nhiên, hát thì cứ hát theo tự nhiên, học theo cách tự nhiên như thế là tốt nhất."
      },
      {
        "translation": "Đúng như dự đoán của cô ấy, trời đã mưa thực sự rất nhiều."
      },
      {
        "translation": "Nấu ăn thì hãy làm theo đúng công thức và làm theo đúng chỉ dẫn của giáo viên."
      },
      {
        "translation": "Chúng tôi sẽ đi du lịch theo đúng bản đồ và theo đúng kế hoạch của ngày hôm nay."
      }
    ]
  },
  "ko_는_24": {
    "title": "~는 도중에 (Trong khi đang, giữa chừng khi đang làm gì)",
    "shortExplanation": "Diễn tả một hành động hoặc sự việc bất ngờ khác xen vào giữa lúc một hành động đang được tiến hành ('trong khi đang...', 'giữa lúc đang...').",
    "longExplanation": "'~는 도중에' được cấu tạo từ định ngữ thì hiện tại '-는' kết hợp với danh từ '도중' (giữa chừng) và tiểu từ trạng ngữ '-에'. Cấu trúc này dùng để diễn đạt rằng trong khi hành động ở vế trước đang diễn ra liên tục thì có một biến cố hoặc hành động khác ở vế sau bất ngờ xảy đến, thường làm gián đoạn hành vi ban đầu.",
    "formation": "Thân động từ + -는 도중에 (hoặc Danh từ + 도중에)",
    "examples": [
      {
        "translation": "Tôi đã ngủ thiếp đi trong lúc đang đọc sách, vì thế tôi không nhớ được hết nội dung cuốn sách."
      },
      {
        "translation": "Cô ấy bỗng nhiên bắt đầu nhảy múa giữa lúc đang nghe nhạc."
      },
      {
        "translation": "Trong lúc tôi đang gõ văn bản thì máy tính đột ngột tắt nguồn nên tôi phải làm lại công việc từ đầu."
      },
      {
        "translation": "Trong khi đang cắm trại cùng bạn bè thì trời bất chợt đổ mưa nên chúng tôi đã chui vào trong lều."
      }
    ]
  },
  "ko_는_25": {
    "title": "~는 방향으로 (Về hướng, theo hướng có)",
    "shortExplanation": "Biểu thị sự di chuyển, hướng đi hoặc sự phát triển hướng về phía một địa điểm hay đối tượng cụ thể ('về hướng...', 'theo hướng...').",
    "longExplanation": "'~는 방향으로' là sự kết hợp giữa định ngữ '-는' (thường gặp nhất là '있는') đi cùng danh từ '방향' (phương hướng) và trợ từ phương hướng '-(으)로'. Cấu trúc này dùng để xác định phương vị cụ thể mà chủ thể đang hướng tới khi di chuyển, mang nghĩa 'đi/chạy về phía nơi có đối tượng đó'.",
    "formation": "Danh từ + (이/가/은/는) + 있는 방향으로 + Động từ (hoặc Thân động từ + -는 방향으로)",
    "examples": [
      {
        "translation": "Tôi đang đi về phía có trường học. Đó là con đường nhanh nhất."
      },
      {
        "translation": "Anh ấy đã chạy thục mạng về hướng nhà mình. Anh ấy đã rất muốn quay trở về thật nhanh."
      },
      {
        "translation": "Người phụ nữ ấy đã chuyển chỗ ngồi về phía tôi đang ngồi, thế nên tôi cảm thấy hơi xao xuyến."
      },
      {
        "translation": "Chúng tôi cứ thế đi bộ về phía trời đang mưa nên quần áo đã bị ướt sũng cả."
      }
    ]
  },
  "ko_는_26": {
    "title": "~는 법이다 (Tất lẽ dĩ ngẫu là, đương nhiên là, theo lẽ thường)",
    "shortExplanation": "Diễn tả một quy luật tự nhiên, chân lý phổ biến hoặc nguyên tắc tất yếu xảy ra ('đương nhiên là...', 'tất lẽ dĩ ngẫu là...').",
    "longExplanation": "'~는 법이다' được cấu thành từ định ngữ '-는', danh từ phụ thuộc '법' (biểu thị đạo lý, quy tắc, lẽ tự nhiên) và vị ngữ '이다'. Cấu trúc này dùng để khẳng định một chân lý hiển nhiên, lẽ thường tình ở đời hoặc nguyên tắc bất di bất dịch mà bất kỳ ai cũng công nhận ('con người ắt hẳn là...', 'theo quy luật thì luôn luôn...').",
    "formation": "Thân động từ + -는 법이다 (với Tính từ dùng -(으)ㄴ 법이다)",
    "examples": [
      {
        "translation": "Gia đình chúng tôi luôn theo lệ là ăn tối cùng nhau vào mỗi buổi tối."
      },
      {
        "translation": "Anh ấy luôn giữ nếp thức dậy sớm để đọc sách."
      },
      {
        "translation": "Sau khi uống cà phê thì việc luôn súc miệng sạch sẽ là lẽ dĩ nhiên."
      },
      {
        "translation": "Tôi luôn có thói quen vừa học bài ở nhà vừa nghe nhạc."
      }
    ]
  },
  "ko_는데다_27": {
    "title": "~는데다(가) (Hơn nữa, thêm vào đó, đã... lại còn...)",
    "shortExplanation": "Dùng để bổ sung thêm một thông tin, đặc điểm hoặc tình huống cùng tính chất với vế trước ('hơn nữa...', 'thêm vào đó...', 'đã... lại còn...').",
    "longExplanation": "'~는데다' (thường thêm tiểu từ '-가' thành '~는데다가') được sử dụng khi muốn nhấn mạnh sự cộng dồn, lũy tiến các tính chất hoặc sự việc. Nếu vế trước là điều tích cực thì vế sau cũng cộng thêm ưu điểm; ngược lại nếu vế trước tiêu cực thì vế sau cũng dồn thêm bất lợi. Cấu trúc mang nghĩa 'không những... mà thêm vào đó còn...'.",
    "formation": "Thân động từ + -는데다 / Thân tính từ + -(으)ㄴ데다 / Danh từ + -인데다 (hoặc -는데다가)",
    "examples": [
      {
        "translation": "Quán cà phê đó cà phê vừa ngon mà không khí lại còn rất tuyệt vời nữa."
      },
      {
        "translation": "Khách sạn này vị trí đã thuận lợi, thêm vào đó dịch vụ của nhân viên cũng rất xuất sắc."
      },
      {
        "translation": "Việc đọc sách không những giúp tích lũy tri thức mà còn có ích cho việc giải tỏa căng thẳng."
      },
      {
        "translation": "Anh ấy vừa có điểm số cao lại vừa tích cực tham gia các hoạt động ở trường nên cuộc sống đại học chắc hẳn vô cùng bận rộn."
      }
    ]
  },
  "ko_는데도_28": {
    "title": "~는데도 (Mặc dù... nhưng vẫn, dẫu vậy mà vẫn...)",
    "shortExplanation": "Diễn tả một kết quả tương phản, trái ngược hoặc bất ngờ so với hoàn cảnh, điều kiện ở vế trước ('dù... nhưng vẫn...', 'mặc cho... thế mà...').",
    "longExplanation": "'~는데도' là sự kết hợp giữa vĩ tố liên kết '-는데' và trợ từ mang tính nhượng bộ '-도' (cũng, dẫu). Cấu trúc này dùng để nhấn mạnh sự ngạc nhiên, thất vọng hoặc tiếc nuối khi kết quả xảy ra hoàn toàn trái ngược với kỳ vọng thông thường hoặc sự nỗ lực đã bỏ ra ở vế trước.",
    "formation": "Thân động từ + -는데도 / Thân tính từ + -(으)ㄴ데도 / Danh từ + -인데도",
    "examples": [
      {
        "translation": "Dù vẫn là trẻ sơ sinh nhưng bé không ngủ nhiều chút nào. Suốt cả ngày chỉ mải mê chơi đùa thôi."
      },
      {
        "translation": "Dù đã học tập rất nhiều và nghĩ sẽ làm bài tốt, thế nhưng điểm thi lại ra rất thấp."
      },
      {
        "translation": "Dù ăn rất nhiều nhưng cô ấy trông lúc nào cũng thật thon thả."
      },
      {
        "translation": "Dù đã trải qua chuyện này nhiều lần rồi, thế nhưng tôi vẫn liên tục lặp lại cùng một sai lầm."
      }
    ]
  },
  "ko_는지_29": {
    "title": "~는지 (Liệu có... không, xem... thế nào)",
    "shortExplanation": "Vĩ tố liên kết dùng để tạo mệnh đề nghi vấn gián tiếp, biểu thị sự mơ hồ, chưa rõ ràng ('liệu có... hay không', 'không biết... ra sao').",
    "longExplanation": "'~는지' là vĩ tố liên kết dùng để lồng ghép một câu hỏi vào trong câu phức, biểu đạt sự không chắc chắn, hồ nghi hoặc tò mò về một sự thật. Thường đi kèm với các động từ nhận thức hoặc tìm hiểu ở vế sau như '알다' (biết), '모르다' (không biết), '궁금하다' (tò mò), '알아보다' (tìm hiểu), tương đương với 'liệu... có... không' trong tiếng Việt.",
    "formation": "Thân động từ + -는지 / Thân tính từ + -(으)ㄴ지 / Danh từ + -인지 (Thì quá khứ: -았/었는지)",
    "examples": [
      {
        "translation": "Liệu anh ấy có biết rằng tôi yêu anh ấy hay không nhỉ?"
      },
      {
        "translation": "Chúng tôi không biết liệu ngày mai có thể đến công ty được hay không."
      },
      {
        "translation": "Liệu chúng ta có thể tìm ra cô ấy đang ở đâu không?"
      },
      {
        "translation": "Hãy đọc bài nhận xét để tìm hiểu xem bộ phim đó có hay hay không nhé."
      }
    ]
  },
  "ko_는지_30": {
    "title": "~는지 모르겠다 (Không biết liệu có... không, chẳng rõ là...)",
    "shortExplanation": "Dùng để bày tỏ sự do dự, băn khoăn hoặc không chắc chắn về một sự việc hay kết quả tương lai ('không biết liệu có... không', 'chẳng biết có... được không').",
    "longExplanation": "'~는지 모르겠다' (cũng thường dùng ở dạng dự đoán tương lai '-(으)ㄹ지 모르겠다') là sự kết hợp giữa vĩ tố nghi vấn gián tiếp '-는지' và vị ngữ phủ định '모르겠다' (tôi không biết chắc). Cấu trúc này thường dùng để giãi bày sự lo lắng, hoang mang hoặc thiếu tự tin về một diễn biến sắp xảy ra.",
    "formation": "Thân động từ + -는지 모르겠다 / Thân tính từ + -(으)ㄴ지 모르겠다 / Danh từ + -인지 모르겠다 (hoặc -(으)ㄹ지 모르겠다)",
    "examples": [
      {
        "translation": "Tôi không biết anh ấy sẽ phản ứng ra sao, vì vậy tôi thấy hơi căng thẳng một chút."
      },
      {
        "translation": "Tôi chẳng biết trời có đang mưa hay không nữa, bởi vì thời tiết âm u quá chừng."
      },
      {
        "translation": "Tôi không biết ngày mai mình có làm bài thi tốt được không nữa, bởi vì phần bài cần ôn tập vẫn còn nhiều quá."
      },
      {
        "translation": "Tôi không biết liệu mình có được thăng chức ở công ty hay không, bởi vì sự cạnh tranh vô cùng khốc liệt."
      }
    ]
  },
  "ko_는지라_31": {
    "title": "~는지라 (Vì là... nên, do lẽ là...)",
    "shortExplanation": "Dùng trong văn phong trang trọng hoặc văn viết để nêu nguyên nhân, lý do khách quan dẫn đến kết quả ở vế sau ('vì là...', 'do lẽ...').",
    "longExplanation": "'~는지라' là vĩ tố liên kết chỉ nguyên nhân mang sắc thái trang trọng, khách quan và nhã nhặn. Cấu trúc này nêu lên một tiền đề hoặc lý do xác đáng ở vế trước, từ đó vế sau giải thích hành động tất yếu phải tiến hành hoặc phản ứng, cảm xúc nảy sinh tương ứng.",
    "formation": "Thân động từ + -는지라 / Thân tính từ + -(으)ㄴ지라 / Danh từ + -인지라 (Thì quá khứ: -았/었는지라)",
    "examples": [
      {
        "translation": "Do anh ấy rất thông minh lại còn chăm chỉ, nên bất cứ ai cũng đều kính trọng anh ấy."
      },
      {
        "translation": "Vì công việc này quá đỗi khẩn cấp, nên tôi đã phải dốc hết sức mình để giải quyết."
      },
      {
        "translation": "Vì cô ấy quá đỗi xinh đẹp, nên mọi người thường ngắm nhìn cô ấy và mỉm cười."
      },
      {
        "translation": "Vì món mì cay quá chừng, nên tôi đã phải uống liền mấy cốc nước."
      }
    ]
  },
  "ko_다가_32": {
    "title": "~다가 (Đang làm gì thì... ngắt quãng, chuyển sang...)",
    "shortExplanation": "Diễn tả một hành động đang diễn ra thì bị ngắt quãng hoặc đột ngột chuyển sang một hành động, sự việc khác ('đang... thì...', 'làm... dở chừng thì...').",
    "longExplanation": "'~다가' là vĩ tố liên kết chỉ sự chuyển tiếp hoặc gián đoạn hành vi. Cấu trúc này dùng khi chủ ngữ đang tiến hành một hành động thì hành động đó bị ngưng trệ bởi một biến cố bất ngờ xảy đến ở vế sau, hoặc chủ ngữ chủ động chuyển hướng sang một hành vi mới.",
    "formation": "Thân động từ + -다가",
    "examples": [
      {
        "translation": "Trong lúc tôi đang chờ đèn đỏ trên đường đi dã ngoại thì điện thoại reo lên."
      },
      {
        "translation": "Jangmi đang nghe nhạc thì ngủ thiếp đi mất."
      },
      {
        "translation": "Tôi đang ăn cơm tối thì bỗng nhiên bị đau bụng dữ dội."
      },
      {
        "translation": "Anh ấy đang đọc sách thì thấy mệt mỏi quá nên đã ngủ thiếp đi."
      }
    ]
  },
  "ko_다가는_33": {
    "title": "~다가는 (Cứ tiếp tục thế này thì sẽ dẫn đến hậu quả xấu)",
    "shortExplanation": "Dùng để cảnh báo rằng nếu cứ tiếp tục duy trì hành động hay thói quen xấu hiện tại thì ắt sẽ gánh chịu hậu quả tai hại ('cứ... mãi thì sẽ...').",
    "longExplanation": "'~다가는' là sự kết hợp giữa vĩ tố liên kết '-다가' và trợ từ chủ đề mang tính nhấn mạnh '-는'. Cấu trúc này luôn mang sắc thái răn đe, cảnh báo: vế trước là một hành vi tiêu cực hoặc thói quen xấu kéo dài, vế sau bắt buộc là một kết cục bất lợi, thất bại hoặc nguy hại.",
    "formation": "Thân động từ + -다가는",
    "examples": [
      {
        "translation": "Nếu bạn cứ tiếp tục trì hoãn bài tập về nhà thì rốt cuộc bạn sẽ thi trượt đấy."
      },
      {
        "translation": "Cứ luôn đi ngủ muộn như thế thì sức khỏe sẽ gặp vấn đề cho mà xem."
      },
      {
        "translation": "Lúc nào cũng chỉ mải mê chơi game như thế thì thị lực sẽ giảm sút đấy."
      },
      {
        "translation": "Cứ mãi đắn đo lo nghĩ quá nhiều như thế thì sẽ chẳng còn thời gian để đưa ra quyết định đâu."
      }
    ]
  },
  "ko_다가도_34": {
    "title": "~다가도 (Đang... thế mà bỗng chốc, dẫu đang... thế mà)",
    "shortExplanation": "Diễn tả một sự thay đổi đột ngột hoặc kết quả trái ngược bất ngờ xảy ra ngay cả khi một hành động đang được tiến hành ('đang... bỗng...', 'dẫu đang... thế mà...').",
    "longExplanation": "'~다가도' là sự kết hợp giữa vĩ tố liên kết '-다가' và trợ từ nhượng bộ '-도' (ngay cả, dẫu). Cấu trúc này dùng để nhấn mạnh tính chất bất ngờ, thất thường hoặc đột ngột xoay chuyển: ngay trong lúc đang tiến hành một việc (thậm chí đang rất chú tâm hay thuận lợi), thì một sự cố hoặc phản ứng tương phản vẫn có thể xảy ra trong chớp mắt.",
    "formation": "Thân động từ + -다가도 (Thân tính từ + -다가도)",
    "examples": [
      {
        "translation": "Dù tôi đang học tập rất chăm chỉ nhưng đôi khi vẫn bị trượt kỳ thi. Dẫu vậy lần tới tôi nhất định muốn thi đỗ."
      },
      {
        "translation": "Đang ngồi uống cà phê ở quán thì trời bỗng đổ mưa, nên dù có che ô tôi vẫn bị ướt một chút."
      },
      {
        "translation": "Trong lúc nấu nướng dẫu đã rất cẩn thận thế mà rốt cuộc lại làm rơi chiếc bát vào nồi nước sôi nên bị bỏng tay."
      },
      {
        "translation": "Đang chăm chú nghe giảng thế mà tôi vẫn thường để lỡ những phần quan trọng. Dù muốn nghe lại nhưng thật khó tìm."
      }
    ]
  },
  "ko_다는_35": {
    "title": "~다는 것 (Việc rằng, sự thật là...)",
    "shortExplanation": "Dùng để danh từ hóa một mệnh đề trần thuật hoặc nhấn mạnh một sự thật, nhận thức cụ thể ('việc rằng...', 'sự thật là...').",
    "longExplanation": "'~다는 것' là sự kết hợp giữa dạng rút gọn của trích dẫn gián tiếp '-다고 하는' (thành '-다는') với danh từ phụ thuộc '것' (điều, việc, sự thật). Cấu trúc này dùng để biến toàn bộ một câu trần thuật thành một cụm danh từ chỉ 'sự thật rằng...' hoặc 'khái niệm rằng...', đóng vai trò làm chủ ngữ hoặc tân ngữ trong câu lớn (thường đi với các động từ như 'biết', 'tin', 'nghe nói').",
    "formation": "Thân động từ + -ㄴ/는다는 것 / Thân tính từ + -다는 것 / Danh từ + -(이)라는 것 (Quá khứ: -았/었다는 것)",
    "examples": [
      {
        "translation": "Tôi hoàn toàn không hề biết sự thật rằng cô ấy đến từ Hàn Quốc. Vì thế tôi đã vô cùng kinh ngạc trước trình độ tiếng Hàn của cô ấy."
      },
      {
        "translation": "Tôi tin tưởng tuyệt đối vào việc rằng mình sẽ giành chiến thắng. Do đó tôi sẽ chuẩn bị mọi thứ thật chu đáo để thi đấu trận hôm nay."
      },
      {
        "translation": "Khi nghe tin rằng bạn đã nghỉ việc, tôi thực sự cảm thấy vô cùng hụt hẫng. Bởi vì bạn vốn là một phần rất quan trọng trong dự án này."
      },
      {
        "translation": "Khi biết được sự thật rằng cô ấy cũng thích mình, tôi đã thực sự vô cùng hạnh phúc. Bởi vì tôi cũng đang thầm thích cô ấy."
      }
    ]
  },
  "ko_다며_36": {
    "title": "~다며 (Nói rằng, bảo rằng...)",
    "shortExplanation": "Dùng để trích dẫn lại lời nói, suy nghĩ hoặc lý do mà chủ ngữ (hoặc ai đó) đã đưa ra ('bảo rằng...', 'nói rằng...').",
    "longExplanation": "'~다며' là dạng rút gọn của cụm trích dẫn gián tiếp '-다고 하며' (vừa nói rằng... vừa...). Cấu trúc này dùng để tường thuật lại lời nói, lý do hoặc suy nghĩ mà người đó đưa ra để giải thích cho hành động hay quyết định của mình. Đôi khi trong giao tiếp thân mật, dạng này còn được dùng làm đuôi câu hỏi để xác nhận lại thông tin nghe được.",
    "formation": "Thân động từ + -ㄴ/는다며 / Thân tính từ + -다며 / Danh từ + -(이)라며 (Quá khứ: -았/었다며)",
    "examples": [
      {
        "translation": "Khi mọi người đều trầm trồ bảo rằng bầu trời thực sự rất xanh, tôi chỉ nghĩ đó là chuyện hiển nhiên."
      },
      {
        "translation": "Cô ấy nói rằng mình không thể chịu đựng thêm được nữa và đã quyết định từ bỏ."
      },
      {
        "translation": "Bạn tôi đã nói rằng cậu ấy thức trắng đêm học bài, nhưng tôi nghĩ điều đó là nói dối."
      },
      {
        "translation": "Mẹ bảo rằng năm nay nhất định phải giảm cân và đã tự hứa với bản thân mình như thế."
      }
    ]
  },
  "ko_대로_37": {
    "title": "~대로 (Theo, đúng như, y như)",
    "shortExplanation": "Biểu thị hành động được thực hiện đúng theo phương pháp, quy tắc, kế hoạch hoặc giữ nguyên trạng thái vốn có ('theo...', 'đúng như...', 'y như...').",
    "longExplanation": "'~대로' là trợ từ (khi đi sau danh từ) hoặc cấu trúc phụ từ liên kết (khi đi sau định ngữ động từ '-(으)ㄴ/는 대로') dùng để chỉ việc làm theo đúng những gì đã được chỉ dẫn, dự định hoặc xảy ra y như trạng thái vốn có. Cấu trúc này nhấn mạnh sự tuân thủ chính xác theo một khuôn mẫu, chỉ dẫn hoặc kế hoạch ban đầu mà không làm khác đi.",
    "formation": "Danh từ + 대로 / Thân động từ + -(으)ㄴ/는 대로",
    "examples": [
      {
        "translation": "Tôi đã thử giải bài toán theo đúng như giáo viên hướng dẫn, nhưng vẫn chưa hiểu rõ lắm."
      },
      {
        "translation": "Tôi đọc cuốn sách đúng như chị gái giới thiệu và thấy đó là một cuốn sách rất thú vị mang nhiều ý nghĩa sâu sắc."
      },
      {
        "translation": "Chúng tôi tiếp tục chuyến du lịch theo đúng như kế hoạch và đã được chiêm ngưỡng nhiều địa danh nổi tiếng."
      },
      {
        "translation": "Khi tận mắt nhìn thấy cảnh sắc y như trong ảnh chụp, cảnh đẹp đến nỗi khiến tâm trạng tôi trở nên rất tuyệt vời."
      }
    ]
  },
  "ko_대로_38": {
    "title": "~대로 하다 (Làm theo, làm đúng như đã dặn)",
    "shortExplanation": "Diễn tả việc thực hiện một hành động chính xác theo lời đã dặn, quy tắc hoặc hướng dẫn ('làm theo...', 'làm đúng như...').",
    "longExplanation": "'~대로 하다' nhấn mạnh việc làm theo đúng một cách tuyệt đối những gì người khác đã chỉ bảo, quy định trong tài liệu, hoặc lời khuyên đã được đưa ra. Cấu trúc này thường đi kèm sau danh từ (như 'kế hoạch', 'công thức') hoặc sau mệnh đề định ngữ quá khứ/hiện tại ('말씀하신 대로', '지시한 대로') để biểu thị sự tuân thủ nghiêm ngặt.",
    "formation": "Danh từ + 대로 하다 / Thân động từ + -(으)ㄴ/는 대로 하다",
    "examples": [
      {
        "translation": "Mẹ bảo tôi buổi sáng thức dậy nhất định phải ăn cơm. Vì thế tôi làm đúng theo lời mẹ dặn rồi mới đi học."
      },
      {
        "translation": "Nếu nấu ăn theo đúng công thức trong sách dạy nấu ăn thì lúc nào cũng có thể hoàn thành món ăn rất ngon miệng."
      },
      {
        "translation": "Nếu bạn học theo đúng như những gì giáo viên đã nhấn mạnh, bạn sẽ có thể đạt điểm cao trong kỳ thi."
      },
      {
        "translation": "Nhờ tập thể dục mỗi ngày và ăn uống đủ chất đúng như lời bố mẹ dặn, sức khỏe của tôi đã tốt lên rất nhiều."
      }
    ]
  },
  "ko_대로이면_39": {
    "title": "~대로이면 (Nếu đúng như... / Nếu theo đúng...)",
    "shortExplanation": "Biểu thị giả định hoặc điều kiện căn cứ vào lời nói, kế hoạch hoặc thông tin đã biết ('nếu đúng như...', 'nếu theo đúng...').",
    "longExplanation": "'~대로이면' là sự kết hợp giữa danh từ phụ thuộc hoặc trợ từ '대로', trợ từ vị ngữ '이-' và vĩ tố liên kết giả định '-면' (thường dùng trong văn nói là '~대로라면'). Cấu trúc này dùng để đặt ra giả thiết rằng nếu một thông tin, tin đồn, kế hoạch hay lời ai đó nói quả đúng như vậy thì một kết quả hoặc suy đoán ở vế sau sẽ ứng nghiệm.",
    "formation": "Danh từ + 대로이면 (hoặc 대로라면) / Thân động từ + -(으)ㄴ/는 대로이면 (hoặc 대로라면)",
    "examples": [
      {
        "translation": "Nếu đúng như chủ quán gà rán nói, thì món được ưa chuộng nhất ở đây là gà rán sốt cay."
      },
      {
        "translation": "Nếu theo đúng kế hoạch của bạn thì tối nay chúng ta có thể xem phim rồi nhỉ."
      },
      {
        "translation": "Nếu đúng như Min-su nói thì nghe đâu kỳ thi này rất khó."
      },
      {
        "translation": "Nếu đúng như Heung-min đã thú thật mọi chuyện, thì từ nay về sau anh ấy sẽ không tái phạm sai lầm như vậy nữa."
      }
    ]
  },
  "ko_도록_40": {
    "title": "~도록 (Để, sao cho, đến mức)",
    "shortExplanation": "Vĩ tố liên kết diễn tả mục đích, kết quả hướng tới hoặc mức độ của hành động ('để...', 'sao cho...', 'đến mức...').",
    "longExplanation": "'~도록' là vĩ tố liên kết gắn sau thân động từ hoặc tính từ, dùng để chỉ mục đích mà hành động ở vế sau hướng tới nhằm làm cho trạng thái hoặc hành vi ở vế trước thành hiện thực ('để cho...', 'sao cho...'). Ngoài ra, nó cũng có thể diễn tả mức độ hoặc giới hạn thời gian ('đến mức...', 'cho đến khi...').",
    "formation": "Thân động từ / Thân tính từ + -도록",
    "examples": [
      {
        "translation": "Chúng tôi quyết định đi vườn thú đêm để có thể ngắm các loài động vật ăn đêm."
      },
      {
        "translation": "Xin hãy giảng bài thật chậm rãi sao cho tất cả chúng tôi đều có thể hiểu được."
      },
      {
        "translation": "Tôi quét sân định kỳ để lá rụng được dọn sạch nhanh chóng."
      },
      {
        "translation": "Tôi đã đóng chặt cửa sổ lại để gió mưa không tràn vào trong nhà."
      }
    ]
  },
  "ko_도록_41": {
    "title": "~도록 하다 (Bảo làm gì, yêu cầu làm gì, cố gắng làm cho)",
    "shortExplanation": "Biểu thị việc sai khiến, thúc đẩy ai đó làm gì hoặc bản thân nỗ lực đảm bảo một việc xảy ra ('bảo ai làm...', 'khiến cho...', 'cố gắng để...').",
    "longExplanation": "'~도록 하다' là cấu trúc mang ý nghĩa sai khiến hoặc chỉ thị gián tiếp, dùng khi chủ thể khiến người khác hành động hoặc chủ động tạo điều kiện để một kết quả nhất định xảy ra. Khi dùng cho bản thân ở ngôi thứ nhất ('-도록 하겠습니다'), nó mang sắc thái quyết tâm và cam kết lịch sự ('tôi sẽ cố gắng làm...').",
    "formation": "Thân động từ / Thân tính từ + -도록 하다",
    "examples": [
      {
        "translation": "Tôi luôn nhắc nhở và đôn đốc các học sinh chăm chú nghe giảng trong giờ học."
      },
      {
        "translation": "Công ty đang tạo điều kiện để các nhân viên tan làm sớm."
      },
      {
        "translation": "Cô ấy đã trông chừng cẩn thận để lũ trẻ về đến nhà an toàn."
      },
      {
        "translation": "Mẹ bắt chúng tôi phải ăn rau mỗi ngày."
      }
    ]
  },
  "ko_도록이면_42": {
    "title": "도록이면 / 되도록이면 (Nếu có thể, cố gắng hết mức có thể)",
    "shortExplanation": "Diễn tả nguyện vọng, lời khuyên hoặc cố gắng thực hiện điều gì trong phạm vi có thể ('nếu có thể...', 'cố gắng...').",
    "longExplanation": "'도록이면' (thường dùng chuẩn là '되도록이면') mang ý nghĩa 'nếu có thể được thì...' hoặc 'trong chừng mực có thể'. Cấu trúc này dùng để thể hiện mong muốn, lời đề nghị nhẹ nhàng hoặc ý chí của người nói rằng hãy ưu tiên thực hiện một hành vi nào đó nếu điều kiện cho phép, tương đương với 'càng... càng tốt' hoặc 'nếu được thì cố gắng'.",
    "formation": "Phó từ đứng đầu câu / Thân động từ + -도록이면",
    "examples": [
      {
        "translation": "Nếu có thể, tôi đang cố gắng ăn các món ăn tốt cho sức khỏe."
      },
      {
        "translation": "Nếu được thì xin hãy trả lời thư sớm giúp tôi nhé."
      },
      {
        "translation": "Nếu có thể thì nên tập thể dục mỗi ngày mới duy trì được sức khỏe."
      },
      {
        "translation": "Nếu được thì tốt nhất là đừng trì hoãn mà hãy làm bài tập ngay."
      }
    ]
  },
  "ko_든지_43": {
    "title": "~든지 (Dù là... hay là..., bất kể)",
    "shortExplanation": "Trợ từ hoặc vĩ tố liên kết biểu thị sự lựa chọn không giới hạn, bất kể phương án nào cũng đều được ('dù là... hay là...', 'bất kể...').",
    "longExplanation": "'~든지' là vĩ tố liên kết hoặc trợ từ thể hiện sự lựa chọn giữa hai hay nhiều đối tượng, hành động mà không có sự phân biệt hay câu nệ. Người nói muốn diễn đạt rằng cho dù rơi vào trường hợp nào đi chăng nữa thì kết quả hay thái độ ở vế sau vẫn không hề thay đổi.",
    "formation": "Danh từ + (이)든지 / Thân động từ / Thân tính từ + -든지",
    "examples": [
      {
        "translation": "Dù là du lịch theo đoàn hay du lịch tự túc, tôi đều yêu thích bất kỳ hình thức du lịch nào."
      },
      {
        "translation": "Dù đã tốn nhiều thời gian hay tiêu tốn nhiều tiền bạc để giải quyết vấn đề này, thì mọi nỗ lực ấy đều rất xứng đáng."
      },
      {
        "translation": "Cho dù anh ấy sống ở Seoul hay sống ở Busan, thì ở đâu anh ấy cũng sẽ hạnh phúc thôi."
      },
      {
        "translation": "Dù làm việc ở công ty này hay làm việc ở công ty khác, tôi đều sẽ cố gắng hết mình ở bất cứ nơi đâu."
      }
    ]
  },
  "ko_든지_44": {
    "title": "~든지 ~든지 (Hoặc là... hoặc là..., hay là... hay là...)",
    "shortExplanation": "Liệt kê các hành động hoặc đối tượng tương đương để lựa chọn một trong số đó ('hoặc là... hoặc là...', 'hay là...').",
    "longExplanation": "'~든지 ~든지' dùng để liệt kê hai hay nhiều khả năng hành động, lựa chọn khác nhau để người nghe hoặc bản thân người nói tùy ý quyết định. Cấu trúc này thường đi kèm với từ nối '아니면' (hoặc là) ở vế sau, mang ý nghĩa 'làm cái này hay làm cái kia cũng được', để ngỏ quyền quyết định cho đối phương.",
    "formation": "Danh từ + (이)든지 Danh từ + (이)든지 / Thân động từ + -든지 (아니면) Thân động từ + -든지",
    "examples": [
      {
        "translation": "Cuối tuần này tôi dự định hoặc là đi xem phim, hoặc là ở nhà nghỉ ngơi."
      },
      {
        "translation": "Tôi vẫn chưa quyết định được tối nay nên ăn pizza hay là ăn gà rán."
      },
      {
        "translation": "Bây giờ bạn về nhà hay ở lại thêm chút nữa thì cứ tùy ý nhé, thế nào cũng được cả."
      },
      {
        "translation": "Dù là gọi điện thoại hay gửi tin nhắn, bạn nhất định phải liên lạc với cô ấy đấy."
      }
    ]
  },
  "ko_라도_45": {
    "title": "~라도 (Dù chỉ là, ít nhất thì, cho dù)",
    "shortExplanation": "Trợ từ biểu thị sự lựa chọn tuy không phải là tốt nhất nhưng vẫn chấp nhận được như một phương án tối thiểu ('dù chỉ là...', 'ít nhất thì...').",
    "longExplanation": "'~라도' là trợ từ gắn sau danh từ, phó từ hoặc thân từ, mang ý nghĩa nhượng bộ. Nó chỉ ra một phương án tuy không phải là lý tưởng nhất hay mong muốn nhất nhưng vẫn có thể chấp nhận được như mức tối thiểu (còn hơn không), tương đương với 'dù là...', 'ít nhất thì...'. Khi gắn sau dạng giả định cũng có thể mang nghĩa 'cho dù'.",
    "formation": "Danh từ + (이)라도 / Thân động từ / Thân tính từ + -아/어-라도 (hoặc Danh từ hóa + -(이)라도)",
    "examples": [
      {
        "translation": "Nếu bạn không thể làm việc này thì ít nhất hãy giúp đỡ tôi một chút nhé."
      },
      {
        "translation": "Anh ấy đã không tham gia lớp học, nhưng chí ít thì cũng phải đọc sách chứ."
      },
      {
        "translation": "Dù đã thi trượt nhưng ít nhất tôi sẽ thử cố gắng thêm một lần nữa."
      },
      {
        "translation": "Dù không muốn đi xem phim, nhưng nếu bạn bè thích thì ít nhất tôi cũng sẽ đi cùng họ."
      }
    ]
  },
  "ko_라든지_46": {
    "title": "~(이)라든지 (Chẳng hạn như, hay là, như là)",
    "shortExplanation": "Trợ từ liệt kê đưa ra các ví dụ tiêu biểu hoặc phương án tham khảo ('chẳng hạn như...', 'như là...', 'hay là...').",
    "longExplanation": "'~(이)라든지' là trợ từ liên kết dùng để nêu ra một vài ví dụ đại diện trong số nhiều đối tượng hoặc hành động có thể có. Người nói đưa ra các ví dụ này nhằm gợi ý hoặc tham khảo mà không giới hạn chỉ ở những đối tượng được kể tên, tương đương với 'chẳng hạn như... hay là...', 'như là...'.",
    "formation": "Danh từ + (이)라든지 (Danh từ + (이)라든지) / Thân động từ + -라든지",
    "examples": [
      {
        "translation": "Chẳng hạn như cà phê hay là trà, bạn có muốn uống loại đồ uống nào không?"
      },
      {
        "translation": "Dù là được bảo học ở thư viện hay đọc sách ở nhà, tôi lúc nào cũng học hỏi được rất nhiều điều."
      },
      {
        "translation": "Như là đi du lịch hay tìm một sở thích mới, có rất nhiều việc bạn có thể thử làm để tìm kiếm niềm vui."
      },
      {
        "translation": "Chẳng hạn như táo hay là lê, bạn thích loại nào nhất trong số các loại trái cây?"
      }
    ]
  },
  "ko_라면_47": {
    "title": "~(이)라면 / ~다면 (Nếu là, nếu quả thật là, giá như)",
    "shortExplanation": "Vĩ tố liên kết hoặc hình thái giả định biểu thị điều kiện giả định hoặc ước muốn trái với thực tế ('nếu là...', 'nếu quả thật là...').",
    "longExplanation": "'~(이)라면' dùng sau danh từ mang nghĩa 'nếu là...' (như '내가 천재라면'), còn khi kết hợp sau động từ/tính từ thì thường ở dạng rút gọn từ câu trần thuật giả định '-다고 하면' -> '-다면' hoặc quá khứ '-았/었다면'. Cấu trúc này dùng để đặt ra một giả thiết mang tính tưởng tượng, suy đoán hoặc tiếc nuối về một điều kiện chưa xảy ra hay trái ngược với thực tế.",
    "formation": "Danh từ + (이)라면 / Thân tính từ + -다면 / Thân động từ + -ㄴ/는다면 (hoặc quá khứ -았/었다면)",
    "examples": [
      {
        "translation": "Nếu bạn đã biết trước sự thật đó, sao bạn không nói cho tôi biết chứ?"
      },
      {
        "translation": "Nếu ngày mai trời mưa, chắc tôi phải mang theo ô mới được."
      },
      {
        "translation": "Nếu tôi là một thiên tài, tôi đã có thể giải quyết vấn đề này một cách dễ dàng rồi."
      },
      {
        "translation": "Nếu bạn muốn đi xem phim, tối nay chúng ta cùng đi nhé?"
      }
    ]
  },
  "ko_라면서_48": {
    "title": "~(ㄴ/는)다면서 / ~라면서 (Nói là... thế mà lại, bảo là... nhưng)",
    "shortExplanation": "Diễn tả sự mâu thuẫn giữa lời nói, tuyên bố ban đầu với hành động thực tế diễn ra ngay sau đó ('nói là... thế mà lại...').",
    "longExplanation": "'~라면서' (hoặc '-(ㄴ/는)다면서') là sự kết hợp giữa hình thức trích dẫn gián tiếp '-(ㄴ/는)다고 하다 / -(이)라고 하다' với vĩ tố liên kết đồng thời/đối lập '-(으)면서'. Cấu trúc này dùng để phê phán, châm biếm hoặc chỉ ra sự mâu thuẫn khôi hài khi ai đó (hoặc chính mình) miệng thì nói/tuyên bố một đằng, nhưng hành động thực tế lại hoàn toàn trái ngược.",
    "formation": "Thân động từ + -(ㄴ/는)다면서 / Thân tính từ + -다면서 / Danh từ + -(이)라면서 (hoặc thì tương lai/ý chí: -겠다면서)",
    "examples": [
      {
        "translation": "Cậu ấy bảo là sẽ học bài thế mà lại cứ tiếp tục chơi game suốt."
      },
      {
        "translation": "Cô ấy nói là sẽ tiết kiệm tiền thế mà bây giờ lại đang đi mua sắm túi bụi."
      },
      {
        "translation": "Tôi cứ miệng nói phải giảm cân mà ngày nào cũng ăn toàn đồ ngọt."
      },
      {
        "translation": "Bố tôi bảo là sẽ bỏ thuốc lá thế mà đến giờ vẫn còn đang hút thuốc."
      }
    ]
  },
  "ko_려고_49": {
    "title": "~(으)려고 (Để, định, nhằm mục đích)",
    "shortExplanation": "Vĩ tố liên kết chỉ ý định, mục đích của chủ ngữ khi thực hiện hành động ở vế sau ('để...', 'định...').",
    "longExplanation": "'~(으)려고' là vĩ tố liên kết gắn sau thân động từ, dùng để chỉ mục đích hoặc ý đồ của hành động: chủ ngữ thực hiện hành động ở vế sau là nhằm để đạt được mục tiêu nêu ở vế trước ('làm A để làm B'). Lưu ý rằng cấu trúc này chủ yếu dùng khi chủ ngữ của hai vế đồng nhất và không kết hợp với câu mệnh lệnh hay thỉnh dụ.",
    "formation": "Thân động từ (kết thúc bằng phụ âm) + -으려고 / Thân động từ (kết thúc bằng nguyên âm hoặc phụ âm ㄹ) + -려고",
    "examples": [
      {
        "translation": "Để nói giỏi tiếng Hàn, ngày nào tôi cũng chăm chỉ học tiếng Hàn."
      },
      {
        "translation": "Tôi tập thể dục để giảm cân và đã cố gắng cắt giảm lượng calo."
      },
      {
        "translation": "Tôi đã học rất nhiều để làm tốt bài thi lần này, và đã cố gắng đi ngủ sớm."
      },
      {
        "translation": "Để làm cho mẹ vui lòng, ngày nào tôi cũng dọn dẹp phòng ốc và nấu những món ăn ngon cho mẹ."
      }
    ]
  },
  "ko_려고_50": {
    "title": "~(으)려고 하다 (Định làm gì, có ý định làm gì)",
    "shortExplanation": "Biểu thị ý định, kế hoạch của chủ ngữ chuẩn bị thực hiện một hành động nào đó trong tương lai gần ('định...', 'có ý định...').",
    "longExplanation": "'~(으)려고 하다' kết hợp vĩ tố chỉ mục đích '-(으)려고' với trợ động từ '하다' để biểu thị dự định hoặc ý định làm một việc gì đó. Khi chia ở thì quá khứ '-(으)려고 했다' (như trong các câu ví dụ), nó thường diễn tả một dự định ban đầu nhưng rốt cuộc đã bị cản trở hoặc không thể thực hiện được do hoàn cảnh khách quan.",
    "formation": "Thân động từ (kết thúc bằng phụ âm) + -으려고 하다 / Thân động từ (kết thúc bằng nguyên âm hoặc phụ âm ㄹ) + -려고 하다",
    "examples": [
      {
        "translation": "Hôm nay tôi đã định đến trường, nhưng vì trời mưa nên không thể đi được."
      },
      {
        "translation": "Chú tôi đã định ngày mai đến nhà chúng tôi chơi, nhưng vì xe bị hỏng nên không đến được."
      },
      {
        "translation": "Tôi đã định gọi điện cho bạn, nhưng vì điện thoại hết pin nên không gọi được."
      },
      {
        "translation": "Tôi đã định cùng bạn bè đi xem phim, nhưng vì vé đã bán hết sạch nên không thể xem được."
      }
    ]
  },
  "ko_려는데_51": {
    "title": "~(으)려는데 (Đang định... thì, có ý định... nhưng)",
    "shortExplanation": "Vĩ tố liên kết diễn tả bối cảnh người nói đang có ý định làm gì thì gặp một tình huống nảy sinh hoặc cản trở ('đang định... thì...', 'có ý định... nhưng...').",
    "longExplanation": "'~(으)려는데' là dạng rút gọn của '-(으)려고 하는데', kết hợp giữa ý định '-(으)려고 하다' và vĩ tố liên kết gợi mở bối cảnh '-(으)ㄴ/는데'. Cấu trúc này dùng khi người nói đưa ra ý định của mình như một bối cảnh tiền đề, và ở vế sau thường trình bày một trở ngại, thắc mắc hoặc tình huống phát sinh liên quan.",
    "formation": "Thân động từ (kết thúc bằng phụ âm) + -으려는데 / Thân động từ (kết thúc bằng nguyên âm hoặc phụ âm ㄹ) + -려는데",
    "examples": [
      {
        "translation": "Tôi đang định đến hiệu sách mua sách thì trời mưa to quá, chắc có lẽ không đi được rồi."
      },
      {
        "translation": "Tôi đang định chuẩn bị bữa tối thì lại thiếu nguyên liệu cần thiết, chắc là phải đi chợ mua đồ rồi."
      },
      {
        "translation": "Tôi định tặng quà cho bạn nhưng vẫn đang băn khoăn không biết nên tặng món quà gì."
      },
      {
        "translation": "Tôi định cuối tuần này đi xem phim nhưng tất cả các vé đều đã được đặt kín rồi nên có lẽ không xem được."
      }
    ]
  },
  "ko_마다_52": {
    "title": "~마다 (Mỗi, mọi, cứ mỗi)",
    "shortExplanation": "Trợ từ biểu thị sự lặp lại đều đặn theo chu kỳ hoặc tính bao quát không loại trừ, mang nghĩa 'mỗi', 'mọi', 'cứ mỗi'.",
    "longExplanation": "'~마다' là trợ từ được gắn sau danh từ chỉ thời gian, địa điểm hoặc sự vật để biểu thị tính chu kỳ, lặp lại hoặc tính toàn thể không ngoại lệ, tương đương với 'mỗi', 'mọi', 'cứ mỗi' trong tiếng Việt. Khi kết hợp với từ chỉ thời gian (như 날마다, 주마다, 해마다), nó nhấn mạnh hành động hoặc trạng thái diễn ra đều đặn theo từng đơn vị thời gian đó.",
    "formation": "Danh từ + 마다",
    "examples": [
      {
        "translation": "Tôi đến thư viện mượn và đọc sách mỗi tuần, nhờ vậy tôi liên tục tích lũy thêm kiến thức mới."
      },
      {
        "translation": "Mỗi sáng hãy bắt đầu một ngày thật vui vẻ nhé. Như thế thì những điều tốt đẹp sẽ đến thôi."
      },
      {
        "translation": "Cứ vào cuối mỗi tháng tôi lại cùng bạn đi xem phim, nên lúc nào tôi cũng được xem phim mới ra rạp."
      },
      {
        "translation": "Cứ mỗi mùa hè chúng tôi đều định ra bãi biển chơi thật vui, thế nên năm nào cũng háo hức ngóng đợi mùa hè."
      }
    ]
  },
  "ko_만큼_53": {
    "title": "~만큼 / ~(으)ㄹ 만큼 (Bằng, như, đến mức, tương đương)",
    "shortExplanation": "Biểu thị mức độ, quy mô hoặc số lượng tương đương với đối tượng được so sánh ('bằng...', 'như...', 'đến mức...').",
    "longExplanation": "'~만큼' (gắn trực tiếp sau danh từ) hoặc '~(으)ㄹ 만큼' (gắn sau thân động từ/tính từ) được dùng để biểu thị mức độ, số lượng hay phạm vi tương đương hoặc đạt đến một giới hạn nhất định so với vế trước. Cấu trúc này thường dùng trong câu so sánh ngang bằng ('nhiều bằng...'), biểu thị tỉ lệ thuận ('bao nhiêu thì bấy nhiêu') hoặc mức độ đạt tới ('đến mức mà...').",
    "formation": "Danh từ + 만큼 | Thân động từ / Thân tính từ + -(으)ㄹ 만큼",
    "examples": [
      {
        "translation": "Bạn thích bao nhiêu thì tôi cũng thích bấy nhiêu, bởi vì cảm xúc luôn luôn có tính tương hỗ mà."
      },
      {
        "translation": "Bố tôi tuy không thể chạy nhanh như hồi còn trẻ, nhưng thể lực vẫn còn rất tốt."
      },
      {
        "translation": "Cuốn sách này càng đọc càng thấy hay. Xem phần sau của sách cũng lôi cuốn chẳng kém gì phần đầu."
      },
      {
        "translation": "Tùy thuộc vào việc bạn nỗ lực bao nhiêu, khả năng thành công cũng sẽ tăng cao tương ứng bấy nhiêu."
      }
    ]
  },
  "ko_면_54": {
    "title": "~(으)면 (Nếu, khi, hễ)",
    "shortExplanation": "Vĩ tố liên kết dùng để giả định một điều kiện ('nếu...') hoặc biểu thị tiền đề thời gian, thói quen ('khi...', 'hễ...').",
    "longExplanation": "'~(으)면' là vĩ tố liên kết điều kiện gắn vào thân động từ hoặc tính từ. Nó dùng để đặt ra một điều kiện giả định chưa xảy ra trong tương lai ('nếu'), hoặc diễn tả một sự việc đương nhiên xảy ra khi hoàn cảnh vế trước được thỏa mãn ('khi', 'hễ mà'). Nếu thân từ có phụ âm cuối (trừ ㄹ) thì kết hợp với '-으면', không có phụ âm cuối hoặc kết thúc bằng ㄹ thì kết hợp với '-면'.",
    "formation": "Thân động từ / Thân tính từ + -(으)면",
    "examples": [
      {
        "translation": "Hễ ăn cơm là tâm trạng tôi lại thấy vui vẻ, giống như vừa giải quyết xong cơn đói vậy."
      },
      {
        "translation": "Nếu tan học tôi định về nhà ngay. Mệt quá rồi nên tôi chẳng còn chút hứng thú nào để học nữa."
      },
      {
        "translation": "Nếu thi đỗ, tôi đang nghĩ đến việc sẽ mở tiệc ăn mừng cùng bạn bè."
      },
      {
        "translation": "Nếu người ta cứ tiếp tục chèn ép tôi, rốt cuộc chắc tôi sẽ đánh mất dũng khí để bước tiếp mất."
      }
    ]
  },
  "ko_면서_55": {
    "title": "~(으)면서 (Vừa... vừa..., trong khi)",
    "shortExplanation": "Vĩ tố liên kết biểu thị hai hành động hoặc trạng thái diễn ra đồng thời cùng một lúc ('vừa... vừa...', 'trong khi...').",
    "longExplanation": "'~(으)면서' là vĩ tố liên kết gắn vào thân động từ hoặc tính từ, dùng để nối hai hành động hoặc trạng thái do cùng một chủ ngữ thực hiện song song trong cùng một khoảng thời gian. Tương đương với 'vừa... vừa...' hoặc 'trong lúc... thì đồng thời...' trong tiếng Việt. Khi thân từ có phụ âm cuối (trừ ㄹ) dùng '-으면서', không có phụ âm cuối hoặc kết thúc bằng ㄹ dùng '-면서'.",
    "formation": "Thân động từ / Thân tính từ + -(으)면서",
    "examples": [
      {
        "translation": "Tôi vừa nghe nhạc vừa học bài, như vậy tập trung tốt hơn nhiều."
      },
      {
        "translation": "Mẹ tôi vừa nấu ăn vừa hát ca, dáng vẻ ấy trông thật đáng yêu."
      },
      {
        "translation": "Tôi không thể vừa đạp xe vừa đọc sách được, nguy hiểm lắm."
      },
      {
        "translation": "Tôi vừa trò chuyện với bạn bè vừa uống cà phê, vì vậy tôi rất hay đi quán cà phê."
      }
    ]
  },
  "ko_밖에_56": {
    "title": "~밖에 (Chỉ, ngoài... ra thì không còn)",
    "shortExplanation": "Trợ từ đi kèm vị ngữ phủ định để nhấn mạnh sự duy nhất, biểu thị 'ngoài... ra thì không còn cách nào/không còn cái nào khác' ('chỉ...').",
    "longExplanation": "'~밖에' là trợ từ mang ý nghĩa giới hạn, bắt buộc phải đi cùng với từ phủ định ở vế sau (như 안, 못, 없다, 모르다). Cấu trúc này nhấn mạnh rằng ngoài sự vật hoặc phạm vi được nhắc đến thì tuyệt đối không có sự lựa chọn hoặc khả năng nào khác, tương đương với 'chỉ có...', 'ngoài... ra thì không còn gì khác' trong tiếng Việt.",
    "formation": "Danh từ + 밖에 + Vị từ phủ định (안, 못, 없다, 모르다...)",
    "examples": [
      {
        "translation": "Tôi chỉ biết mỗi tiếng Hàn nên việc sinh sống ở nước khác quả thực rất khó khăn."
      },
      {
        "translation": "Quán này chỉ bán mỗi khoai tây chiên nên sự lựa chọn rất hạn hẹp."
      },
      {
        "translation": "Cô ấy ở quán cà phê chỉ mua mỗi bánh nướng muffin nên hoàn toàn không biết các món khác trong thực đơn."
      },
      {
        "translation": "Cuối tuần này tôi chỉ có thể nghỉ ngơi ở nhà mà thôi. Bạn bè ai nấy đều bận rộn nên không thể gặp mặt được."
      }
    ]
  },
  "ko_보다_57": {
    "title": "~보다 (Hơn, so với)",
    "shortExplanation": "Trợ từ so sánh gắn sau danh từ dùng làm tiêu chuẩn đối chiếu, biểu thị 'hơn', 'so với'.",
    "longExplanation": "'~보다' là trợ từ so sánh gắn trực tiếp sau danh từ chỉ đối tượng làm tiêu chuẩn so sánh. Nó biểu thị rằng chủ ngữ hoặc một đối tượng khác vượt trội hơn đối tượng đứng trước '~보다' về mức độ, số lượng hay tính chất, tương đương với 'hơn', 'so với...' trong tiếng Việt. Trong câu thường kết hợp thêm phó từ '더' (hơn) hoặc '덜' (kém hơn).",
    "formation": "Danh từ + 보다 (+ 더/덜) + Vị từ",
    "examples": [
      {
        "translation": "Tôi thích trà hơn cà phê."
      },
      {
        "translation": "Mùa hè năm nay nóng hơn mùa hè năm ngoái."
      },
      {
        "translation": "Tôi đã ăn nhiều cơm hơn thường lệ."
      },
      {
        "translation": "Giờ đã muộn hơn 10 giờ đêm rồi."
      }
    ]
  },
  "ko_부터_58": {
    "title": "~부터 (Từ, bắt đầu từ, trước tiên)",
    "shortExplanation": "Trợ từ biểu thị điểm khởi đầu về thời gian, thứ tự ưu tiên hoặc địa điểm ('từ...', 'bắt đầu từ...').",
    "longExplanation": "'~부터' là trợ từ gắn sau danh từ chỉ thời gian, địa điểm hoặc sự vật để chỉ mốc bắt đầu của một hành động, trạng thái hoặc khoảng thời gian. Cấu trúc này thường đi kèm với '~까지' (đến, cho tới). Ngoài ra, khi đi với danh từ chỉ đối tượng hay thứ tự, '~부터' còn mang ý nghĩa 'làm cái này trước tiên'.",
    "formation": "Danh từ + 부터 (thường đi với ~까지)",
    "examples": [
      {
        "translation": "Ngày mai tiết học bắt đầu từ 7 giờ sáng nên chúng ta phải chuẩn bị để không bị muộn."
      },
      {
        "translation": "Khi dọn dẹp vali du lịch, tôi lấy quần áo ra trước tiên rồi sau đó mới thu xếp các phụ kiện."
      },
      {
        "translation": "Nhà hàng này phục vụ bữa trưa từ 12 giờ trưa đến 3 giờ chiều."
      },
      {
        "translation": "Từ tháng này cho đến đầu năm sau, chúng tôi phải hoàn thành dự án này."
      }
    ]
  },
  "ko_서는_59": {
    "title": "~서는 / ~에서는 (Về mặt, ở phương diện, trong khoản)",
    "shortExplanation": "Biểu thị sự đối chiếu, tương phản ở một phạm vi hoặc hoàn cảnh cụ thể ('ở phương diện...', 'về mặt... thì lại không như mong đợi').",
    "longExplanation": "'~서는' (dạng rút gọn hoặc kết hợp từ '-에서는', '-는 데서는' hoặc '-아서는/-어서는') dùng để khu biệt một phương diện, hoàn cảnh hay địa hạt cụ thể nhằm nhấn mạnh sự tương phản hoặc mâu thuẫn giữa kỳ vọng và thực tế. Nó thường bộc lộ cảm giác bất ngờ, thất vọng hoặc tiếc nuối khi ở phương diện được nêu ra, kết quả lại không tốt như mong muốn.",
    "formation": "Danh từ + 에서는 / Thân động từ + -는 데서는 / Thân động từ + -아/어서는",
    "examples": [
      {
        "translation": "Người bạn ấy tiếng Nhật cũng giỏi mà tiếng Trung cũng giỏi, nhưng ở khoản tiếng Hàn thì lại hoàn toàn không nói được nên hơi tiếc."
      },
      {
        "translation": "Tôi nấu ăn khá ngon, nhưng ở khâu làm món tráng miệng thì lại chẳng có chút tự tin nào."
      },
      {
        "translation": "Anh ấy bảo mình làm bài thi rất tốt, nhưng đến kết quả thực tế thì lại hỏng bét nên tôi đã rất bất ngờ."
      },
      {
        "translation": "Em tôi lúc nào cũng bảo là dọn phòng ngăn nắp lắm, thế mà đến lúc tận mắt nhìn vào việc dọn phòng thì lại bừa bộn hết chỗ nói nên tôi rất thất vọng."
      }
    ]
  },
  "ko_아어_60": {
    "title": "~아/어 보이다 (Trông có vẻ, dường như, trông thấy)",
    "shortExplanation": "Biểu thị sự phán đoán hoặc cảm nhận chủ quan dựa trên vẻ ngoài hoặc trạng thái quan sát được ('trông có vẻ...', 'dường như...').",
    "longExplanation": "'~아/어 보이다' kết hợp với thân tính từ, dùng để diễn đạt suy đoán hoặc đánh giá của người nói về trạng thái, tâm trạng hoặc diện mạo của ai đó/vật nào đó dựa trên vẻ bề ngoài quan sát được bằng mắt. Tương đương với 'trông có vẻ...', 'trông...' trong tiếng Việt. Nếu thân từ kết thúc bằng nguyên âm ㅏ hoặc ㅗ thì dùng '-아 보이다', các trường hợp còn lại dùng '-어 보이다', riêng 하다 chuyển thành '해 보이다'.",
    "formation": "Thân tính từ + -아/어 보이다",
    "examples": [
      {
        "translation": "Thời tiết ngày mai trông có vẻ đẹp đấy. Đi ra ngoài chơi thì chắc là thích lắm."
      },
      {
        "translation": "Bạn ấy trông hay có vẻ cô đơn, tôi nghĩ giá như có ai giúp đỡ thì tốt biết mấy."
      },
      {
        "translation": "Dạo này chị Jinhee trông thực sự rất bận rộn. Thấy chị ấy chăm chỉ làm việc như thế khiến tôi rất kỳ vọng vào tương lai của chị ấy."
      },
      {
        "translation": "Đã ăn nhiều đến thế này rồi mà nhìn vẫn có vẻ đói thì giải thích làm sao đây nhỉ?"
      }
    ]
  },
  "ko_아어_61": {
    "title": "~아/어 버리다 (Xong mất, mất rồi, trót làm gì)",
    "shortExplanation": "Biểu thị hành động đã kết thúc triệt để hoàn toàn, thường kèm theo cảm giác tiếc nuối, hối hận hoặc trút bỏ gánh nặng ('lỡ... mất rồi', 'xong xuôi').",
    "longExplanation": "'~아/어 버리다' là trợ động từ gắn sau thân động từ, biểu thị một hành động đã được hoàn tất trọn vẹn và dứt khoát đến tận cùng. Cấu trúc này thường mang hai sắc thái tình cảm rõ rệt: (1) nuối tiếc, buồn bã hoặc hối hận vì một sự việc ngoài ý muốn đã trót xảy ra ('lỡ làm mất rồi'); hoặc (2) cảm giác nhẹ nhõm, thanh thản vì đã giải quyết dứt điểm một việc nặng nề ('làm xong phăng cho nhẹ nợ').",
    "formation": "Thân động từ + -아/어 버리다",
    "examples": [
      {
        "translation": "Trong lúc đợi cô bạn gái mới quen lần đầu, vì muộn quá nên tôi đã ngủ thiếp đi mất."
      },
      {
        "translation": "Bài tập khó quá nên tôi đã bỏ cuộc luôn cho xong."
      },
      {
        "translation": "Tôi để quên túi xách trên xe buýt khi xuống xe rồi quên béng mất."
      },
      {
        "translation": "Trong trận bóng chày, đội chúng tôi chơi tệ quá nên đã đánh mất toàn bộ điểm số."
      }
    ]
  },
  "ko_아어_62": {
    "title": "~아/어 두다 (Làm sẵn, để sẵn, duy trì sẵn)",
    "shortExplanation": "Biểu thị việc làm sẵn một hành động để chuẩn bị trước hoặc duy trì nguyên trạng thái đó cho tương lai ('làm sẵn...', 'để sẵn...').",
    "longExplanation": "'~아/어 두다' là trợ động từ gắn sau thân động từ, biểu thị một hành động được chủ ý thực hiện trước nhằm mục đích chuẩn bị cho tương lai, đồng thời giữ nguyên trạng thái kết quả của hành động đó sau khi hoàn thành. Tương đương với 'làm sẵn...', 'lưu lại sẵn...' trong tiếng Việt. Tùy thuộc vào nguyên âm cuối của thân động từ mà kết hợp với '-아 두다' (nguyên âm ㅏ/ㅗ) hoặc '-어 두다' (các nguyên âm khác, 하다 -> 해 두다).",
    "formation": "Thân động từ + -아/어 두다",
    "examples": [
      {
        "translation": "Việc tạo sẵn và lưu giữ những kỷ niệm đẹp vì người mình yêu thương là điều rất quan trọng."
      },
      {
        "translation": "Tôi đã nấu quá nhiều đồ ăn nên đã cất sẵn vào tủ lạnh để sau này ăn."
      },
      {
        "translation": "Trong lúc học, nếu tra thấy từ vựng không biết thì việc ghi chép lại sẵn vào sổ tay là rất tốt."
      },
      {
        "translation": "Để thực hiện ước mơ của mình, tôi luôn lập sẵn nhiều kế hoạch từ trước."
      }
    ]
  },
  "ko_아어_63": {
    "title": "~아/어 가다 (Dần dần tiếp tục, làm tiếp đi, đang dần...)",
    "shortExplanation": "Biểu thị một hành động hoặc trạng thái đang dần dần tiếp diễn, tiến triển theo hướng tương lai ('dần dần...', 'tiếp tục...').",
    "longExplanation": "'~아/어 가다' là trợ động từ kết hợp với thân động từ hoặc tính từ, biểu thị một hành động hoặc sự biến đổi trạng thái bắt đầu từ thời điểm hiện tại và tiếp tục tiến triển đều đặn về phía tương lai. Cấu trúc này thường mang nghĩa 'dần dần tiến tới', 'tiếp tục làm...', tương ứng với hành vi hoặc xu hướng không ngừng tiến lên phía trước trong tương lai.",
    "formation": "Thân động từ / Thân tính từ + -아/어 가다",
    "examples": [
      {
        "translation": "Anh ấy mỗi sáng đều vừa tập thể dục đều đặn vừa nỗ lực duy trì sức khỏe."
      },
      {
        "translation": "Cô ấy vừa đi học ở trường vừa tiếp tục duy trì công việc."
      },
      {
        "translation": "Dù gặp nhiều khó khăn lớn, chúng tôi vẫn đang tiếp tục kiên trì thực hiện dự án."
      },
      {
        "translation": "Dù các bạn bè đều đã bỏ cuộc, tôi vẫn đang tiếp tục luyện tập."
      }
    ]
  },
  "ko_아어_64": {
    "title": "~아/어 오다 (Làm từ trước tới nay, dần dần trở nên)",
    "shortExplanation": "Biểu thị một hành động hoặc trạng thái bắt đầu từ quá khứ và liên tục diễn ra, tích lũy cho đến hiện tại ('làm suốt từ trước tới nay', 'dần dần...').",
    "longExplanation": "'~아/어 오다' là trợ động từ gắn sau thân động từ hoặc tính từ, biểu thị một hành động hoặc sự biến chuyển đã diễn ra liên tục từ quá khứ kéo dài đến hiện tại. Nó nhấn mạnh quá trình tích lũy, sự kiên trì liên tục trong suốt một khoảng thời gian, tương đương với 'đã và đang làm suốt từ trước tới giờ' hoặc 'dần dần trở nên...' trong tiếng Việt.",
    "formation": "Thân động từ / Thân tính từ + -아/어 오다",
    "examples": [
      {
        "translation": "Anh ấy học tiếng Hàn mỗi ngày suốt một tháng qua nên bây giờ có thể nói chuyện rất lưu loát."
      },
      {
        "translation": "Chúng tôi cùng nhau tập thể dục mỗi ngày suốt thời gian qua, chẳng mấy chốc thể lực đã tốt lên rất nhiều."
      },
      {
        "translation": "Mina kiên trì vẽ tranh suốt thời gian qua nên càng ngày vẽ càng đẹp hơn."
      },
      {
        "translation": "Mặt trời dần lặn xuống nên trời tối sầm lại trong chớp mắt."
      }
    ]
  },
  "ko_아어야_65": {
    "title": "~아/어야 하다 (Phải, bắt buộc phải)",
    "shortExplanation": "Biểu thị nghĩa vụ, bổn phận hoặc sự cần thiết tất yếu phải làm một việc gì đó ('phải...', 'cần phải...').",
    "longExplanation": "'~아/어야 하다' là cấu trúc biểu thị tính tất yếu, nghĩa vụ hoặc điều kiện bắt buộc mà chủ thể phải thực hiện, tương đương với 'phải', 'cần phải' trong tiếng Việt. Cấu trúc này được kết hợp từ vĩ tố điều kiện bắt buộc '-아/어야' với động từ '하다' (hoặc '되다'). Nếu thân từ có nguyên âm cuối là ㅏ/ㅗ thì dùng '-아야 하다', các trường hợp còn lại dùng '-어야 하다', riêng 하다 chuyển thành '해야 하다'.",
    "formation": "Thân động từ / Thân tính từ + -아/어야 하다",
    "examples": [
      {
        "translation": "Ngày mai có bài thi nên tối nay tôi phải học bài."
      },
      {
        "translation": "Nếu không muốn bị muộn giờ làm ở công ty thì 7 giờ tôi phải ra khỏi nhà."
      },
      {
        "translation": "Khi hoạt động ngoài trời, chúng ta phải bảo vệ làn da khỏi ánh nắng mặt trời."
      },
      {
        "translation": "Nếu muốn đạt điểm số tốt thì phải học hành chăm chỉ hơn nữa."
      }
    ]
  },
  "ko_아어야지_66": {
    "title": "~아/어야지 (Phải... mới được, chắc chắn sẽ, tự nhủ phải...)",
    "shortExplanation": "Đuôi câu biểu thị ý chí mạnh mẽ, quyết tâm của người nói hoặc lời tự nhủ với bản thân ('phải... mới được', 'nhất định sẽ...').",
    "longExplanation": "'~아/어야지' là vĩ tố kết thúc câu thân mật biểu thị ý chí kiên định hoặc quyết tâm cao độ của người nói đối với một hành động nào đó. Thường dùng trong ngôi thứ nhất để tự nhủ với chính mình ('mình phải làm việc này mới được', 'chắc chắn mình sẽ...'). Tùy thuộc vào nguyên âm cuối mà chia thành '-아야지' (nguyên âm ㅏ/ㅗ) hoặc '-어야지' (nguyên âm còn lại, 하다 -> 해야지).",
    "formation": "Thân động từ + -아/어야지",
    "examples": [
      {
        "translation": "Mình thật sự phải học hành chăm chỉ hơn mới được. Lần này nhất định mình sẽ nâng cao thành tích."
      },
      {
        "translation": "Sáng mai phải dậy sớm tập thể dục mới được. Vì sức khỏe, mình cần phải quan tâm chăm sóc nhiều hơn."
      },
      {
        "translation": "Bây giờ mình thực sự phải cai thuốc lá mới được. Vì quá lo lắng cho sức khỏe nên mình đã quyết tâm rồi."
      },
      {
        "translation": "Mình phải gọi điện cho mẹ mới được. Khá lâu rồi chưa liên lạc gì cả."
      }
    ]
  },
  "ko_아어도_67": {
    "title": "~아/어도 (Dù... cũng..., cho dù... đi chăng nữa)",
    "shortExplanation": "Vĩ tố liên kết biểu thị sự nhượng bộ, diễn tả ý nghĩa dù điều kiện ở vế trước có thế nào thì kết quả ở vế sau vẫn không thay đổi ('dù... cũng...').",
    "longExplanation": "'~아/어도' là vĩ tố liên kết chỉ sự nhượng bộ, gắn vào thân động từ hoặc tính từ để biểu thị rằng hành động hay trạng thái ở mệnh đề trước không làm thay đổi kết quả, tình huống hay quan điểm ở mệnh đề sau. Cấu trúc này tương đương với 'dù... cũng...', 'cho dù... thì...' trong tiếng Việt, thường đi kèm với phó từ nhấn mạnh như '아무리' (dù cho đến đâu chăng nữa). Nếu nguyên âm cuối của thân từ là 'ㅏ, ㅗ' thì dùng '-아도', các nguyên âm còn lại dùng '-어도', đối với động từ '하다' chuyển thành '해도'.",
    "formation": "Thân động từ / Thân tính từ + -아/어도",
    "examples": [
      {
        "translation": "Đồ ăn ở đây dù đắt đến mấy nhưng vì ngon nên tôi vẫn thường xuyên đến ăn."
      },
      {
        "translation": "Cho dù tôi có chạy nhanh đến mấy thì có lẽ vẫn bị muộn học thôi."
      },
      {
        "translation": "Dù mình có nỗ lực đến đâu thì chắc cũng khó mà hoàn thành dự án đó được."
      },
      {
        "translation": "Dù tập thể dục bao nhiêu đi nữa thì tôi vẫn chưa hài lòng với vóc dáng của mình."
      }
    ]
  },
  "ko_아어서_68": {
    "title": "~아/어서 (Vì... nên..., do... nên...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị nguyên nhân, lý do ('vì... nên...') hoặc thứ tự trước sau của hành động.",
    "longExplanation": "'~아/어서' là vĩ tố liên kết rất phổ biến gắn vào thân động từ hoặc tính từ, dùng để chỉ ra rằng mệnh đề trước là nguyên nhân, lý do trực tiếp dẫn đến kết quả ở mệnh đề sau, tương đương với 'vì... nên...', 'do...' trong tiếng Việt. Lưu ý: vế trước của '-아/어서' không chia ở thì quá khứ (았/었), và mệnh đề sau không dùng với câu mệnh lệnh (-(으)세요) hay thỉnh dụ (-(으)ㅂ시다). Nếu nguyên âm cuối của thân từ là 'ㅏ, ㅗ' dùng '-아서', nguyên âm khác dùng '-어서', '하다' chuyển thành '해서'.",
    "formation": "Thân động từ / Thân tính từ + -아/어서",
    "examples": [
      {
        "translation": "Vì bị đau đầu nên tôi đã không thể đến trường được."
      },
      {
        "translation": "Hôm nay thời tiết đẹp nên tôi đã đi dạo."
      },
      {
        "translation": "Bộ phim này hay quá nên tôi đã xem đến hai lần."
      },
      {
        "translation": "Cô ấy đang rất buồn vì đã làm mất cuốn sách."
      }
    ]
  },
  "ko_았었던_69": {
    "title": "~았/었던 (Từng, đã từng)",
    "shortExplanation": "Vĩ tố định ngữ hồi tưởng quá khứ, dùng để bổ nghĩa cho danh từ, biểu thị một trạng thái hoặc hành động đã hoàn toàn kết thúc trong quá khứ và không còn tiếp diễn ở hiện tại ('đã từng...').",
    "longExplanation": "'~았/었던' là vĩ tố định ngữ gắn vào thân động từ hoặc tính từ để bổ nghĩa cho danh từ đứng sau. Khác với '-던' (chỉ hồi tưởng đơn thuần hoặc sự việc chưa hoàn tất), cấu trúc '-았/었던' nhấn mạnh rằng hành động hoặc trạng thái đó đã hoàn thành và chấm dứt hẳn trong quá khứ, hiện tại đã thay đổi hoặc không còn như vậy nữa. Tương đương với 'đã từng...', 'từng là...' trong tiếng Việt.",
    "formation": "Thân động từ / Thân tính từ + -았/었던 + Danh từ",
    "examples": [
      {
        "translation": "Tôi từng là một học sinh thiên tài ở trường, từng đạt điểm cao nhất ở tất cả các môn Ngữ văn, Toán học, Khoa học và Xã hội."
      },
      {
        "translation": "Ca sĩ mà tôi từng thích khi còn nhỏ là Shinhwa; âm nhạc của họ luôn đọng lại trong ký ức của tôi."
      },
      {
        "translation": "Bố tôi từng là một người rất nghèo khi còn nhỏ, nhưng bây giờ ông sống rất khấm khá."
      },
      {
        "translation": "Cô ấy thời còn đi học từng là một người rất trầm tính, nhưng bây giờ đã trở nên vô cùng hoạt bát."
      }
    ]
  },
  "ko_았었어야_70": {
    "title": "~았/었어야 했다 (Đáng lẽ phải..., lẽ ra nên...)",
    "shortExplanation": "Cấu trúc biểu thị sự tiếc nuối, hối hận hoặc trách móc về một việc đáng lẽ phải làm trong quá khứ nhưng thực tế lại không làm ('đáng lẽ phải...').",
    "longExplanation": "'~았/었어야 했다' gắn vào thân động từ hoặc tính từ, dùng để bày tỏ sự tiếc nuối, ân hận sâu sắc của người nói về một việc đáng lẽ cần phải thực hiện trong quá khứ nhưng trên thực tế đã bỏ lỡ, hoặc dùng để trách cứ đối phương vì đã không làm điều đó. Tương đương với 'đáng lẽ ra phải...', 'lẽ ra nên...' trong tiếng Việt. Thường kết hợp với vĩ tố liên kết '-았/었어야 했는데...' để kể lại nguyên nhân hay cảm xúc tiếc nuối.",
    "formation": "Thân động từ / Thân tính từ + -았/었어야 했다",
    "examples": [
      {
        "translation": "Đáng lẽ hôm qua tôi phải làm xong việc đó, nhưng vì không có thời gian nên tôi đã không làm được. Tôi đang rất hối hận."
      },
      {
        "translation": "Sáng nay đáng lẽ tôi phải tập thể dục, nhưng vì lười biếng nên tôi đã không tập."
      },
      {
        "translation": "Trong hoàn cảnh như thế đáng lẽ bạn phải đối xử ấm áp, vậy mà bạn lại cư xử lạnh lùng như vậy."
      },
      {
        "translation": "Ngày hôm đó đáng lẽ tôi phải bằng mọi giá tránh cuộc ẩu đả, nhưng rốt cuộc tôi đã không tránh được."
      }
    ]
  },
  "ko_았었으면_71": {
    "title": "~았/었으면 (Giá mà..., ước gì...)",
    "shortExplanation": "Dùng để giả định một tình huống trái ngược với thực tế ở quá khứ hoặc hiện tại, thể hiện mong ước hay sự tiếc nuối ('giá mà...', 'ước gì...').",
    "longExplanation": "'~았/었으면' là sự kết hợp giữa thì quá khứ '-았/었-' và vĩ tố điều kiện '-(으)면'. Nó được dùng để đưa ra một giả định không có thực trong hiện tại hoặc quá khứ nhằm bày tỏ niềm mong ước, ước vọng mãnh liệt (thường đi với 좋겠다 tạo thành '-았/었으면 좋겠다' mang nghĩa 'giá như... thì tốt biết mấy') hoặc sự tiếc nuối đối với việc đã không thể xảy ra.",
    "formation": "Thân động từ / Thân tính từ + -았/었으면 (좋겠다)",
    "examples": [
      {
        "translation": "Từ nhỏ tôi đã muốn trở thành nhạc sĩ. Ước gì tôi thực sự trở thành một nhạc sĩ thì tốt biết mấy."
      },
      {
        "translation": "Giá mà thời tiết đẹp thì tốt quá. Khi đó chúng ta đã có thể cùng nhau đi dạo rồi."
      },
      {
        "translation": "Lần cuối cùng gặp anh ấy, giá mà tôi kể cho anh nghe những câu chuyện tốt đẹp thì hay biết mấy."
      },
      {
        "translation": "Giá mà tôi giữ đúng lời hứa. Khi đó mọi người chắc hẳn đã tin tưởng tôi nhiều hơn."
      }
    ]
  },
  "ko_았었을_72": {
    "title": "~았/었을 텐데 (Chắc là đã... thế mà, ắt hẳn đã...)",
    "shortExplanation": "Biểu thị sự phỏng đoán, suy đoán của người nói về một trạng thái hay sự việc trong quá khứ làm tiền đề cho vế sau ('chắc là đã... thế mà/vậy mà').",
    "longExplanation": "'~았/었을 텐데' kết hợp thì quá khứ '-았/었-', định ngữ suy đoán '-(으)ㄹ', và danh từ phụ thuộc '터' (ý định, dự tính, tình cảnh) cùng trợ từ '-인데'. Nó diễn tả sự phỏng đoán có căn cứ hoặc suy đoán mạnh mẽ của người nói về một tình huống trong quá khứ, dùng tình huống đó làm bối cảnh hoặc điều kiện tương phản cho vế tiếp theo. Tương đương với 'chắc hẳn là đã...', 'đáng lẽ ra đã... thế mà...' trong tiếng Việt.",
    "formation": "Thân động từ / Thân tính từ + -았/었을 텐데",
    "examples": [
      {
        "translation": "Chắc là bạn đã bận rộn lắm, tôi nghĩ là bạn đã không thể làm hết được công việc đó."
      },
      {
        "translation": "Chắc là bạn đã học nhiều đến thế, vậy bạn có giải được các câu hỏi đó không?"
      },
      {
        "translation": "Cô ấy chắc hẳn đã rất hạnh phúc, vậy tại sao cô ấy lại rơi nước mắt nhỉ?"
      },
      {
        "translation": "Thời tiết chắc là đẹp lắm, tôi nghĩ chuyến du lịch hẳn là rất thú vị."
      }
    ]
  },
  "ko_았었다가_73": {
    "title": "~았/었다가 (Xong rồi... thì, làm... rồi lại...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị một hành động đã hoàn tất trọn vẹn ở một địa điểm/trạng thái rồi chuyển tiếp sang một hành động hoặc địa điểm khác ('... xong rồi lại...').",
    "longExplanation": "'~았/었다가' là vĩ tố liên kết gắn vào thân động từ. Khác với '-다가' (chỉ hành động đang diễn ra dở dang thì bị gián đoạn), '-았/었다가' nhấn mạnh rằng hành động thứ nhất đã hoàn tất kết thúc và đạt được kết quả, sau đó chủ ngữ mới chuyển sang một hành động khác, thường đi kèm với sự thay đổi về địa điểm hoặc trạng thái. Tương đương với '... xong rồi thì...', 'sau khi... xong rồi lại...' trong tiếng Việt.",
    "formation": "Thân động từ + -았/었다가",
    "examples": [
      {
        "translation": "Tôi đến trường xong rồi lại sang thư viện để học bài."
      },
      {
        "translation": "Anh ấy làm việc xong rồi mới trở về nhà."
      },
      {
        "translation": "Tôi gặp bạn xong rồi chúng tôi cùng đi xem phim."
      },
      {
        "translation": "Chúng tôi ăn trưa xong rồi đi dạo ở công viên."
      }
    ]
  },
  "ko_았었다면_74": {
    "title": "~았/었다면 (Nếu như đã..., giá như đã...)",
    "shortExplanation": "Dùng để giả định một điều kiện trái ngược hoàn toàn với những gì đã thực sự xảy ra trong quá khứ ('nếu như đã... thì...').",
    "longExplanation": "'~았/었다면' kết hợp giữa thì quá khứ '-았/었-' và vĩ tố giả định '-다면'. Cấu trúc này dùng để đặt ra một giả thiết phản thực tế về quá khứ—tức giả sử sự việc trong quá khứ xảy ra khác đi so với thực tế, mệnh đề sau thường diễn tả kết quả suy đoán giả định (thường đi với '-(으)ㄹ 텐데', '-(으)ㄹ 것이다'). Nó thường mang hàm ý hối tiếc, ân hận hoặc thở phào nhẹ nhõm. Tương đương với 'nếu như đã...', 'giá mà đã...' trong tiếng Việt.",
    "formation": "Thân động từ / Thân tính từ + -았/었다면",
    "examples": [
      {
        "translation": "Lúc đó nếu như tôi nghe theo lời khuyên của anh ấy thì tình thế bây giờ có lẽ đã khác rồi."
      },
      {
        "translation": "Giá như anh ta thừa nhận sai lầm của mình thì đã không rơi vào bước đường khó khăn lớn đến thế."
      },
      {
        "translation": "Hôm qua nếu như trời mưa thì liệu trận đấu bóng đá có bị hủy bỏ không nhỉ?"
      },
      {
        "translation": "Nếu như tôi đến sớm hơn thì chắc hẳn đã có thể gặp được cô ấy rồi."
      }
    ]
  },
  "ko_으면_75": {
    "title": "~(으)면 좋겠다 (Ước gì, mong rằng, nếu... thì tốt biết mấy)",
    "shortExplanation": "Mẫu câu biểu thị mong muốn, kỳ vọng hoặc ước ao của người nói về một sự việc trong tương lai ('ước gì...', 'mong rằng...').",
    "longExplanation": "'~(으)면 좋겠다' kết hợp giữa vĩ tố điều kiện '-(으)면' và tính từ '좋겠다' (sẽ tốt). Cấu trúc này dùng để diễn đạt niềm hy vọng, ước muốn chân thành của người nói rằng một sự việc hay trạng thái nào đó sẽ diễn ra theo ý muốn của mình trong tương lai hoặc hiện tại. Tương đương với 'ước gì...', 'mong là...', 'nếu... thì tốt biết mấy' trong tiếng Việt. Khi thân từ có phụ âm cuối (trừ ㄹ) dùng '-으면 좋겠다', không có phụ âm cuối hoặc kết thúc bằng ㄹ dùng '-면 좋겠다'.",
    "formation": "Thân động từ / Thân tính từ + -(으)면 좋겠다",
    "examples": [
      {
        "translation": "Ước gì thời tiết đẹp thì tốt quá, như thế thì đi ngắm hoa sẽ vui hơn nhiều."
      },
      {
        "translation": "Mong là mình sẽ thi tốt, thế thì khi kết thúc học kỳ mình có thể đi du lịch rồi."
      },
      {
        "translation": "Mong người bạn đang ốm mau chóng bình phục, khi ấy chúng mình có thể cùng nhau đi chơi."
      },
      {
        "translation": "Ước gì dịch Corona mau kết thúc, như vậy chúng ta có thể trở lại cuộc sống thường nhật rồi."
      }
    ]
  },
  "ko_으면서도_76": {
    "title": "~(으)면서도 (Dù... nhưng vẫn, vừa... mà lại...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị sự mâu thuẫn, nghịch lý: tuy có trạng thái hay hành động ở vế trước nhưng vế sau lại diễn ra điều trái ngược ('dù... nhưng vẫn...').",
    "longExplanation": "'~(으)면서도' kết hợp giữa vĩ tố đồng thời '-(으)면서' và trợ từ nhấn mạnh tương phản '-도'. Nó dùng để nối hai mệnh đề có ý nghĩa đối lập hoặc mâu thuẫn nhau, diễn tả ý tuy thừa nhận sự việc hay trạng thái ở vế trước là đúng, nhưng vế sau vẫn diễn ra một hành động hoặc tình trạng ngược ngạo, bất hợp lý. Tương đương với 'dù... nhưng vẫn...', 'vừa... lại vừa...' trong tiếng Việt. Khi thân từ có phụ âm cuối (trừ ㄹ) dùng '-으면서도', không có phụ âm cuối hoặc kết thúc bằng ㄹ dùng '-면서도'.",
    "formation": "Thân động từ / Thân tính từ + -(으)면서도",
    "examples": [
      {
        "translation": "Anh ấy dù biết không tốt cho sức khỏe nhưng ngày nào cũng ăn thức ăn nhanh."
      },
      {
        "translation": "Dù vô cùng bận rộn nhưng cô ấy vẫn thỉnh thoảng tranh thủ thời gian để gặp gỡ bạn bè."
      },
      {
        "translation": "Giá chung cư dù đã đắt đỏ nhưng vẫn không ngừng tăng lên."
      },
      {
        "translation": "Dù mạng Internet chậm nhưng vẫn có thể tìm được thông tin cần thiết nên tôi vẫn dùng tốt."
      }
    ]
  },
  "ko_을_77": {
    "title": "~(으)ㄹ 거예요 (Sẽ, định sẽ, chắc sẽ)",
    "shortExplanation": "Đuôi câu biểu thị ý định, kế hoạch trong tương lai của chủ ngữ ngôi thứ nhất hoặc phỏng đoán của người nói về sự việc sắp xảy ra ('sẽ...').",
    "longExplanation": "'~(으)ㄹ 거예요' là đuôi câu kết thúc câu trần thuật cực kỳ phổ biến trong giao tiếp tiếng Hàn hàng ngày. Khi chủ ngữ là ngôi thứ nhất ('tôi', 'chúng tôi'), nó diễn tả ý định, kế hoạch chắc chắn trong tương lai ('tôi sẽ...'). Khi chủ ngữ là ngôi thứ ba hoặc sự vật/hiện tượng thời tiết, nó biểu thị sự phỏng đoán, dự đoán của người nói về tương lai ('chắc là sẽ...'). Thân từ có phụ âm cuối (trừ ㄹ) kết hợp với '-을 거예요', không có phụ âm cuối hoặc kết thúc bằng ㄹ kết hợp với '-ㄹ 거예요'.",
    "formation": "Thân động từ / Thân tính từ + -(으)ㄹ 거예요",
    "examples": [
      {
        "translation": "Cuối tuần này tôi sẽ đi mua sắm."
      },
      {
        "translation": "Ngày mai chắc là trời sẽ mưa."
      },
      {
        "translation": "Mẹ sẽ nấu canh kim chi cho bữa tối."
      },
      {
        "translation": "Đội của chúng tôi nhất định sẽ chiến thắng ở giải đấu tới."
      }
    ]
  },
  "ko_을게요_78": {
    "title": "~(으)ㄹ게요 (Tôi sẽ...)",
    "shortExplanation": "Đuôi câu biểu thị lời hứa, cam kết hoặc quyết tâm của người nói đối với người nghe trong ngữ cảnh giao tiếp trực tiếp ('tôi sẽ... nhé').",
    "longExplanation": "'~(으)ㄹ게요' là đuôi câu kết thúc câu trần thuật chỉ dùng cho ngôi thứ nhất ('tôi/chúng tôi'). Khác với '-(으)ㄹ 거예요' (chỉ kế hoạch khách quan nói chung), '-(으)ㄹ게요' nhấn mạnh lời hứa hẹn, sự phản hồi tích cực hoặc ý chí quyết tâm của người nói gửi tới người nghe ngay tại thời điểm giao tiếp. Thường dùng trong câu khẳng định, không dùng trong câu nghi vấn. Thân động từ có phụ âm cuối (trừ ㄹ) dùng '-을게요', không có phụ âm cuối hoặc kết thúc bằng ㄹ dùng '-ㄹ게요'.",
    "formation": "Thân động từ + -(으)ㄹ게요",
    "examples": [
      {
        "translation": "Ngày mai tôi sẽ đến trường gặp bạn. Lâu lắm mới gặp lại nên tôi thực sự rất mong đợi."
      },
      {
        "translation": "Mỗi tối 10 giờ tôi sẽ đi ngủ. Vì sức khỏe, tôi nghĩ mình nên đi ngủ sớm hơn."
      },
      {
        "translation": "Cuối tuần tôi sẽ tập thể dục. Vì tập thể dục chắc chắn sẽ làm cơ thể khỏe khoắn hơn."
      },
      {
        "translation": "Ngày mai tôi sẽ đi mua đồ ăn. Ở nhà chẳng còn gì để ăn cả."
      },
      {
        "translation": "Tôi mê mẩn âm nhạc nên tôi sẽ học đàn piano. Dù tốn chút thời gian nhưng tôi định sẽ chăm chỉ học."
      },
      {
        "translation": "Tôi sẽ học một ngôn ngữ mới. Dù mất thời gian nhưng tôi nhất định muốn thử sức."
      },
      {
        "translation": "Vì muốn nấu những món ăn ngon nên tôi sẽ tham gia một lớp học nấu ăn."
      },
      {
        "translation": "Tuần sau tôi sẽ tranh thủ thời gian đi xem phim cùng bạn bè."
      }
    ]
  },
  "ko_을까요_79": {
    "title": "~(으)ㄹ까요? (Chúng mình... nhé?, ... được không?)",
    "shortExplanation": "Đuôi câu nghi vấn dùng để rủ rê, đề xuất cùng làm gì hoặc hỏi ý kiến, suy nghĩ của người nghe ('chúng ta cùng... nhé?').",
    "longExplanation": "'~(으)ㄹ까요?' là đuôi câu nghi vấn thân mật lịch sự. Khi chủ ngữ là 'chúng ta/chúng mình', câu mang ý nghĩa rủ rê, đề nghị cùng làm một hành động nào đó ('chúng mình cùng... nhé?'). Khi chủ ngữ là ngôi thứ nhất 'tôi', câu hỏi mang tính thăm dò ý kiến hoặc đề nghị giúp đỡ ('tôi làm... nhé?'). Ngoài ra, nó cũng có thể dùng để hỏi về sự phỏng đoán của người nghe đối với ngôi thứ ba. Thân động từ có phụ âm cuối (trừ ㄹ) dùng '-을까요?', không có phụ âm cuối hoặc kết thúc bằng ㄹ dùng '-ㄹ까요?'.",
    "formation": "Thân động từ / Thân tính từ + -(으)ㄹ까요?",
    "examples": [
      {
        "translation": "Chúng mình cùng ăn tối nhé? Tôi biết một nhà hàng bán đồ ăn ngon lắm."
      },
      {
        "translation": "Chúng ta xem phim nhé? Nghe nói hôm nay có bộ phim hay đang chiếu đấy."
      },
      {
        "translation": "Cuối tuần này chúng mình đi du lịch nhé? Trông bạn có vẻ cần đổi gió đấy."
      },
      {
        "translation": "Chúng mình cùng đi dạo nhé? Thời tiết trông có vẻ rất đẹp đấy."
      }
    ]
  },
  "ko_을_80": {
    "title": "~(으)ㄹ 때 (Khi, lúc)",
    "shortExplanation": "Biểu thị thời điểm, khoảnh khắc hoặc trường hợp diễn ra một hành động hoặc trạng thái ('khi...', 'lúc...').",
    "longExplanation": "'~(으)ㄹ 때' kết hợp giữa định ngữ thì tương lai/chưa hoàn thành '-(으)ㄹ' và danh từ phụ thuộc '때' (khi, lúc, thời điểm). Nó dùng để xác định thời điểm, cơ hội hoặc hoàn cảnh mà một hành động hay trạng thái nhất định xảy ra, tương đương với 'khi...', 'lúc...' trong tiếng Việt. Thường có thể gắn thêm trợ từ như '-에는', '-마다' để làm nổi bật thời điểm. Thân từ có phụ âm cuối (trừ ㄹ) dùng '-을 때', không có phụ âm cuối hoặc kết thúc bằng ㄹ dùng '-ㄹ 때'.",
    "formation": "Thân động từ / Thân tính từ + -(으)ㄹ 때",
    "examples": [
      {
        "translation": "Khi đọc sách thì đọc ở nơi yên tĩnh là tốt nhất."
      },
      {
        "translation": "Những khi gặp bạn bè tôi luôn cười rất nhiều."
      },
      {
        "translation": "Lúc làm bài thi tôi lúc nào cũng căng thẳng."
      },
      {
        "translation": "Khi trời mưa thì bạn nhất định hãy nhớ mang theo ô nhé."
      }
    ]
  },
  "ko_을_81": {
    "title": "~(으)ㄹ 듯하다 / ~는 듯하다 / ~(으)ㄴ 듯하다 (Có vẻ như, dường như, dường như là)",
    "shortExplanation": "Cấu trúc bổ trợ biểu thị sự suy đoán, phán đoán của người nói dựa trên cảm nhận, quan sát hoặc ấn tượng bề ngoài ('dường như...', 'có vẻ như...').",
    "longExplanation": "'~듯하다' là cụm vị từ bổ trợ kết hợp với các vĩ tố định ngữ (hiện tại: '-는 듯하다', quá khứ: '-(으)ㄴ 듯하다', tương lai/suy đoán: '-(으)ㄹ 듯하다'). Nó diễn tả sự suy luận, cảm nhận chủ quan của người nói dựa trên những gì mắt thấy, tai nghe hoặc linh cảm trực tiếp. Tương đương với 'dường như...', 'có vẻ như...', 'hình như là...' trong tiếng Việt, mang sắc thái phỏng đoán văn nhã, lịch sự và khách quan hơn so với '-것 같다'.",
    "formation": "Thân động từ / Thân tính từ + -(으)ㄹ 듯하다 / -는 듯하다 / -(으)ㄴ 듯하다",
    "examples": [
      {
        "translation": "Anh ấy trông có vẻ đã thay đổi, nhưng thực ra dường như vẫn y nguyên như ngày xưa."
      },
      {
        "translation": "Hôm nay trời lạnh như thể mùa đông vậy. Dù nói là mùa thu nhưng dường như lại mang cảm giác của mùa đông."
      },
      {
        "translation": "Nhìn biểu cảm của anh ấy, dường như anh ấy đang chìm sâu vào dòng suy nghĩ."
      },
      {
        "translation": "Cô ấy trông như sắp cười, nhưng dường như lại đang có điều gì đó trăn trở muộn phiền."
      }
    ]
  },
  "ko_을_82": {
    "title": "~(으)ㄹ 만하다 (Đáng, bõ công, có giá trị để làm)",
    "shortExplanation": "Diễn tả một hành động hoặc trải nghiệm đáng giá, bõ công hoặc xứng đáng để thực hiện ('đáng làm', 'bõ công làm').",
    "longExplanation": "'~(으)ㄹ 만하다' là cấu trúc bổ trợ kết hợp với thân động từ, dùng để biểu thị rằng một hành động, sự việc có đủ giá trị, tư cách hoặc lý do chính đáng để làm hay trải nghiệm ('đáng để...', 'bõ công...'). Cấu trúc này thể hiện sự đánh giá, phán đoán của người nói rằng thời gian, tiền bạc hoặc công sức bỏ ra là hoàn toàn xứng đáng. Ngoài ra, trong một số ngữ cảnh, nó cũng có thể diễn đạt khả năng làm được việc gì đó ở mức chấp nhận được.",
    "formation": "Thân động từ + -(으)ㄹ 만하다",
    "examples": [
      {
        "translation": "Chiếc bánh kem này tuy đắt nhưng rất ngon nên rất đáng mua ăn thử."
      },
      {
        "translation": "Bộ phim này thời lượng chiếu tuy dài nhưng thực sự rất hay nên rất bõ công xem."
      },
      {
        "translation": "Vé xem biểu diễn của ban nhạc đó tuy đắt nhưng âm nhạc của họ chắc chắn rất đáng để nghe thử."
      },
      {
        "translation": "Trò chơi này dù mất nhiều thời gian cài đặt nhưng cũng rất đáng chơi thử."
      }
    ]
  },
  "ko_을_83": {
    "title": "~(으)ㄹ수록 (Càng... thì càng...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị mức độ ở vế sau thay đổi tỷ lệ thuận khi hành động hoặc trạng thái ở vế trước tăng lên ('càng... thì càng...').",
    "longExplanation": "'~(으)ㄹ수록' là vĩ tố liên kết gắn vào thân động từ hoặc tính từ, dùng để biểu thị mối quan hệ tỉ lệ thuận: khi hành động hoặc trạng thái ở mệnh đề trước càng tăng tiến hay kéo dài thì kết quả, trạng thái ở mệnh đề sau cũng thay đổi tương ứng theo mức độ đó, tương đương với 'càng... càng...' trong tiếng Việt. Nếu thân từ kết thúc bằng nguyên âm hoặc phụ âm ㄹ thì kết hợp với '-ㄹ수록', nếu kết thúc bằng phụ âm khác thì kết hợp với '-을수록'.",
    "formation": "Thân động từ / Thân tính từ + -(으)ㄹ수록",
    "examples": [
      {
        "translation": "Càng học tiếng Hàn nhiều thì càng hiểu văn hóa Hàn Quốc tốt hơn."
      },
      {
        "translation": "Càng ở đây lâu tôi lại càng thấy thích thành phố này hơn."
      },
      {
        "translation": "Càng đi bộ mỗi ngày thì sức khỏe càng trở nên tốt hơn."
      },
      {
        "translation": "Càng uống nhiều cà phê tôi dường như lại càng thấy ít buồn ngủ hơn."
      }
    ]
  },
  "ko_을_84": {
    "title": "~(으)ㄹ 줄 알다 (Biết cách làm, tưởng là, nghĩ rằng)",
    "shortExplanation": "Biểu thị việc biết cách hoặc có năng lực thực hiện một hành động nào đó ('biết cách...'), hoặc biểu thị suy nghĩ, phán đoán về một sự thật hay tình huống ('ngỡ là...', 'nghĩ là...').",
    "longExplanation": "'~(으)ㄹ 줄 알다' được dùng với hai nghĩa chính: thứ nhất, diễn tả người nói hoặc chủ ngữ có năng lực, kỹ năng hay biết cách thực hiện một hành động cụ thể nào đó ('biết làm gì'). Thứ hai, khi dùng để suy đoán hoặc phán đoán (thường dùng ở dạng quá khứ '~줄 알았다' hoặc kết hợp định ngữ), nó diễn tả việc từng nghĩ hay dự đoán về một tình huống hoặc sự thật nào đó (đôi khi thực tế lại trái ngược với điều đã nghĩ, mang nghĩa 'cứ ngỡ là...'). Dạng phủ định về mặt năng lực là '-(으)ㄹ 줄 모르다' (không biết làm).",
    "formation": "Thân động từ + -(으)ㄹ 줄 알다 | Định ngữ + 줄 알다",
    "examples": [
      {
        "translation": "Tôi biết đọc chữ Hangeul nên có thể xem phim truyền hình Hàn Quốc mà không cần phụ đề."
      },
      {
        "translation": "Tôi cứ tưởng bố nấu ăn rất giỏi, nhưng tối qua khi bố chuẩn bị bữa tối thì đã xảy ra bao nhiêu là rắc rối."
      },
      {
        "translation": "Tôi tưởng cô ấy là người Hàn Quốc nên đã nói chuyện bằng tiếng Hàn."
      },
      {
        "translation": "Chú cún của chúng tôi biết tuân theo mệnh lệnh nên được huấn luyện rất tốt."
      }
    ]
  },
  "ko_을지_85": {
    "title": "~(으)ㄹ지 (Liệu rằng... hay không, có... chăng)",
    "shortExplanation": "Vĩ tố liên kết dùng để diễn đạt sự nghi vấn, hoài nghi hoặc không chắc chắn về một sự việc trong câu gián tiếp ('liệu có... hay không').",
    "longExplanation": "'~(으)ㄹ지' là vĩ tố liên kết biểu thị sự phỏng đoán kèm theo nghi vấn hoặc sự không chắc chắn về một sự việc, hành động chưa diễn ra hoặc chưa rõ ràng. Thường xuất hiện trong các mệnh đề nghi vấn gián tiếp đi kèm với các vị từ biểu thị sự thắc mắc, không biết, phân vân như 모르다 (không biết), 궁금하다 (tò mò), 생각하다 (suy nghĩ), 확신이 없다 (không chắc chắn) ('liệu... có... hay không'). Cấu trúc này cũng thường được lặp lại ở dạng '-(으)ㄹ지 안 -(으)ㄹ지' hoặc '-(으)ㄹ지 말지' để nêu ra hai khả năng đối lập.",
    "formation": "Thân động từ / Thân tính từ + -(으)ㄹ지",
    "examples": [
      {
        "translation": "Tôi không biết liệu tối nay bố có về nhà hay không."
      },
      {
        "translation": "Tôi tò mò không biết liệu ngày mai cô ấy có đến bữa tiệc hay không."
      },
      {
        "translation": "Tôi vẫn chưa chắc chắn liệu thời tiết có ấm lên hay không."
      },
      {
        "translation": "Không thể biết được liệu bạn có chấp nhận lời đề nghị hay không."
      }
    ]
  },
  "ko_을지도_86": {
    "title": "~(으)ㄹ지도 모르다 (Có lẽ, có thể sẽ, biết đâu chừng)",
    "shortExplanation": "Diễn tả sự phỏng đoán dè dặt, không chắc chắn về một khả năng có thể xảy ra trong hiện tại hoặc tương lai ('có thể...', 'biết đâu chừng...').",
    "longExplanation": "'~(으)ㄹ지도 모르다' là cấu trúc biểu thị sự suy đoán dè dặt, không chắc chắn của người nói về một khả năng hay sự việc, tương đương với 'có lẽ', 'có thể sẽ', 'biết đâu chừng' trong tiếng Việt. Cấu trúc nhấn mạnh rằng người nói không khẳng định chắc chắn 100%, nhưng khả năng sự việc đó xảy ra là hoàn toàn có thể. Thường đi kèm với phó từ như 혹시 (ngộ nhỡ), 아마 (có lẽ).",
    "formation": "Thân động từ / Thân tính từ + -(으)ㄹ지도 모르다",
    "examples": [
      {
        "translation": "Ngày mai có thể trời sẽ mưa nên hãy mang theo ô nhé."
      },
      {
        "translation": "Anh ấy có thể sẽ tham dự cuộc họp tiếp theo."
      },
      {
        "translation": "Có lẽ sang năm tôi sẽ chuyển đến Hàn Quốc sống."
      },
      {
        "translation": "Biết đâu chừng cô ấy đã biết tin tức đó rồi."
      }
    ]
  },
  "ko_을지라도_87": {
    "title": "~(으)ㄹ지라도 (Cho dù... đi chăng nữa, dẫu cho...)",
    "shortExplanation": "Vĩ tố liên kết nhượng bộ mang tính giả định mạnh mẽ, biểu thị 'cho dù... đi chăng nữa thì kết quả ở vế sau vẫn không đổi'.",
    "longExplanation": "'~(으)ㄹ지라도' là vĩ tố liên kết nhượng bộ trang trọng, gắn vào thân động từ hoặc tính từ. Nó dùng để đặt ra một giả định cực đoan hoặc một điều kiện dù có xảy ra đi nữa thì quyết tâm, hành động hoặc kết quả ở mệnh đề sau vẫn giữ nguyên không hề bị lay chuyển hay ảnh hưởng, tương đương với 'cho dù... đi chăng nữa', 'dẫu có... thì cũng...' trong tiếng Việt. Thường dùng trong văn viết hoặc phát biểu trang trọng mang tính khẳng định ý chí.",
    "formation": "Thân động từ / Thân tính từ + -(으)ㄹ지라도",
    "examples": [
      {
        "translation": "Dù bài toán có khó đi chăng nữa tôi cũng sẽ không bỏ cuộc mà tiếp tục cố gắng giải."
      },
      {
        "translation": "Dù trời có mưa đi chăng nữa tôi vẫn định đi, bởi vì tôi có một cuộc họp quan trọng."
      },
      {
        "translation": "Dù xe buýt có đến nhanh đi chăng nữa, tôi cũng sẽ không chạy quá sức đâu."
      },
      {
        "translation": "Dù tốn nhiều chi phí đi chăng nữa tôi vẫn muốn làm ra sản phẩm có chất lượng tốt."
      }
    ]
  },
  "ko_을지_88": {
    "title": "~(으)ㄹ지 모르다 / ~(으)ㄹ지 몰라 (Không biết chừng, có lẽ, không biết là...)",
    "shortExplanation": "Diễn tả sự không chắc chắn, phân vân hoặc phỏng đoán dè dặt về một khả năng có thể xảy ra ('không biết chừng...', 'có lẽ...', 'không biết là...').",
    "longExplanation": "'~(으)ㄹ지 모르다' (dạng thân mật nói ngắn là '-(으)ㄹ지 몰라') kết hợp vĩ tố nghi vấn '-(으)ㄹ지' với động từ '모르다' (không biết). Cấu trúc này dùng khi người nói không dám chắc về một điều gì đó hoặc nêu ra một khả năng dè dặt ('không biết chừng là...', 'chẳng biết có... hay không'). Nó cũng thường dùng ở dạng '-(으)ㄹ지 몰라서' (vì không biết liệu... nên đã làm gì để phòng hờ).",
    "formation": "Thân động từ / Thân tính từ + -(으)ㄹ지 모르다 (몰라/몰라요)",
    "examples": [
      {
        "translation": "Không biết chừng mai cô ấy sẽ đến trường đấy, nghe bảo dạo này đang ốm mà."
      },
      {
        "translation": "Tôi định mua món đồ này, nhưng không biết liệu tiền có đủ hay không nữa."
      },
      {
        "translation": "Vì không biết ngày mai có mưa hay không nên tôi phải chuẩn bị sẵn một chiếc ô."
      },
      {
        "translation": "Vì không biết nên mặc bộ quần áo nào nên tôi đã chuẩn bị sẵn ba bộ."
      }
    ]
  },
  "ko_을래요_89": {
    "title": "~(으)ㄹ래요 (Tôi muốn..., bạn có muốn... không?, định làm...)",
    "shortExplanation": "Vĩ tố kết thúc câu dùng trong văn nói để biểu thị ý định, mong muốn của bản thân ('tôi muốn...') hoặc rủ rê, hỏi ý kiến đối phương một cách thân mật ('bạn có muốn...?').",
    "longExplanation": "'~(으)ㄹ래요' là vĩ tố kết thúc câu thân mật lịch sự, gắn vào thân động từ. Khi dùng trong câu trần thuật với chủ ngữ ngôi thứ nhất, nó biểu thị ý muốn, sự lựa chọn hoặc ý định của người nói ('tôi muốn...', 'tôi sẽ...'). Khi dùng trong câu nghi vấn với ngôi thứ hai, nó dùng để nhẹ nhàng hỏi ý muốn hoặc đưa ra lời rủ rê, đề nghị đối phương ('bạn có muốn... không?'). Nếu thân từ có phụ âm cuối (trừ ㄹ) dùng '-을래요', không có phụ âm cuối hoặc kết thúc bằng ㄹ dùng '-ㄹ래요'.",
    "formation": "Thân động từ + -(으)ㄹ래요",
    "examples": [
      {
        "translation": "Hôm nay tôi muốn ở nhà xem phim hơn, ra ngoài trời lạnh quá."
      },
      {
        "translation": "Cuối tuần này chúng mình đến khu cắm trại dựng lều nhé, bạn nghĩ sao?"
      },
      {
        "translation": "Bữa tối tôi chỉ ăn một bữa đơn giản thôi, tôi đã no rồi nên không muốn ăn thêm nữa."
      },
      {
        "translation": "Cuối tuần này tôi muốn đi xem kịch, vì thích văn hóa Hàn Quốc nên tôi đã quyết định rồi."
      }
    ]
  },
  "ko_을_90": {
    "title": "~(으)ㄹ 리가 없다 (Không có lý nào lại..., chẳng thể nào...)",
    "shortExplanation": "Diễn tả sự phủ định mạnh mẽ, phán đoán rằng một sự việc tuyệt đối không có khả năng hay lý do gì để xảy ra ('không có lý nào...', 'lẽ nào lại...').",
    "longExplanation": "'~(으)ㄹ 리가 없다' là cấu trúc kết hợp danh từ phụ thuộc '리' (lý lẽ, nguyên cớ, khả năng) với từ phủ định '없다'. Cấu trúc này dùng để biểu thị sự nghi ngờ sâu sắc hoặc phủ định dứt khoát của người nói đối với một việc hay hiện tượng, cho rằng không có bất cứ lý do hay căn cứ hợp lý nào để việc đó xảy ra, tương đương với 'không có lý nào lại...', 'làm sao có chuyện...', 'không đời nào...' trong tiếng Việt. Thường dùng khi sự việc trái ngược hoàn toàn với logic hoặc thực tế thông thường.",
    "formation": "Thân động từ / Thân tính từ + -(으)ㄹ 리가 없다 | Danh từ + 일 리가 없다",
    "examples": [
      {
        "translation": "Chuyện này không đời nào là sự thật được, anh ấy không phải kiểu người làm ra chuyện như vậy đâu."
      },
      {
        "translation": "Cô ấy không thể nào quên tôi được, chúng tôi đã ở bên nhau lâu như thế cơ mà."
      },
      {
        "translation": "Tôi chẳng có lý nào lại ký vào bản hợp đồng này, tôi vẫn chưa hiểu hết các điều khoản mà."
      },
      {
        "translation": "Hôm nay anh ấy không có lý nào lại đến được, tôi biết rõ mà, anh ấy đang bị ốm."
      }
    ]
  },
  "ko_을수록_91": {
    "title": "~(으)ㄹ수록 (Càng... càng..., càng ngày càng...)",
    "shortExplanation": "Vĩ tố liên kết biểu thị sự tăng tiến tương hỗ: một điều kiện càng phát triển thì một điều kiện khác cũng gia tăng tỷ lệ thuận theo đó ('càng... thì càng...').",
    "longExplanation": "'~(으)ㄹ수록' là vĩ tố liên kết diễn tả mức độ tăng tiến theo tỷ lệ thuận. Khi hành động hoặc trạng thái ở vế đầu ngày càng tăng lên, thì mức độ hay phạm vi ở vế sau cũng tiến triển tương ứng, tương đương với 'càng... càng...' trong tiếng Việt. Cấu trúc này thường đi kèm với phó từ '더' (hơn), hoặc cấu trúc lặp '-으면 -(으)ㄹ수록' (nếu càng... thì càng...) để nhấn mạnh mức độ.",
    "formation": "Thân động từ / Thân tính từ + -(으)ㄹ수록",
    "examples": [
      {
        "translation": "Càng học tiếng Hàn, tôi càng có thể hiểu nhiều hơn về văn hóa Hàn Quốc."
      },
      {
        "translation": "Càng nghe bài hát này nhiều, dường như tôi lại càng thấy thích hơn."
      },
      {
        "translation": "Thời tiết càng ngày càng nóng lên thì kem lại càng bán được nhiều hơn."
      },
      {
        "translation": "Mọi người càng sử dụng nhiều sản phẩm thân thiện với môi trường thì càng đóng góp được nhiều cho việc bảo vệ môi trường."
      }
    ]
  },
  "ko_을지언정_92": {
    "title": "~(으)ㄹ지언정 (Dẫu rằng, cho dù là... nhưng, thà rằng...)",
    "shortExplanation": "Vĩ tố liên kết nhượng bộ trang trọng, thừa nhận sự thật ở vế trước nhưng vế sau vẫn có sự đối lập hoặc quyết tâm không đổi ('dẫu rằng... nhưng...', 'thà... chứ không...').",
    "longExplanation": "'~(으)ㄹ지언정' là vĩ tố liên kết biểu thị sự nhượng bộ mạnh mẽ trong văn viết hoặc văn phong trang trọng. Nó thừa nhận sự thật hoặc khả năng ở mệnh đề trước ('dẫu rằng điều đó là có thật...'), nhưng ngay lập tức đưa ra một sự thật tương phản hoặc một hành động kiên quyết ở mệnh đề sau. Cấu trúc này cũng thường được dùng để biểu thị sự lựa chọn kiên quyết: 'thà chấp nhận điều bất lợi ở vế trước chứ quyết không làm điều tồi tệ ở vế sau'. Kết hợp với thân động từ, tính từ hoặc danh từ + 일지언정.",
    "formation": "Thân động từ / Thân tính từ + -(으)ㄹ지언정 | Danh từ + 일지언정",
    "examples": [
      {
        "translation": "Dẫu rằng việc đó cực kỳ quan trọng đối với anh ấy, nhưng anh ấy quyết không hề đụng tay vào."
      },
      {
        "translation": "Dẫu rằng anh ấy giàu có, nhưng thường ngày anh ấy lại có thói quen rất tiết kiệm."
      },
      {
        "translation": "Dẫu rằng bài thi có khó, nhưng các học sinh vẫn đã học tập vô cùng chăm chỉ."
      },
      {
        "translation": "Dẫu rằng công viên đó rất đẹp, nhưng buổi tối lại tiềm ẩn nhiều nguy hiểm nên hãy cẩn thận nhé."
      }
    ]
  },
  "ko_이나_93": {
    "title": "~(이)나 (Hoặc, hay là)",
    "shortExplanation": "Trợ từ gắn sau danh từ biểu thị sự lựa chọn giữa hai hoặc nhiều đối tượng ('hoặc...', 'hay là...').",
    "longExplanation": "'~(이)나' là trợ từ được gắn sau danh từ để biểu thị sự lựa chọn giữa hai hay nhiều sự vật, sự việc, tương đương với 'hoặc', 'hay là' trong tiếng Việt. Khi danh từ kết thúc bằng phụ âm (có 받침) thì dùng '-이나', khi kết thúc bằng nguyên âm (không có 받침) thì dùng '-나'. Ngoài ý nghĩa lựa chọn, trợ từ này còn có thể dùng để chỉ sự lựa chọn tạm thời chấp nhận được khi không có phương án tối ưu, hoặc nhấn mạnh số lượng nhiều hơn kỳ vọng.",
    "formation": "Danh từ + (이)나",
    "examples": [
      {
        "translation": "Táo hoặc cam, xin hãy chỉ chọn một trong hai thứ đó thôi nhé."
      },
      {
        "translation": "Chúng mình xem phim điện ảnh hay là phim truyền hình nhé?"
      },
      {
        "translation": "Hãy đi xe buýt hoặc taxi đi."
      }
    ]
  },
  "ko_이든_94": {
    "title": "~(이)든 (Dù là... hay là..., bất kể là...)",
    "shortExplanation": "Vĩ tố liên kết hoặc trợ từ biểu thị sự bất kể, không phân biệt lựa chọn: dù là phương án nào thì kết quả cũng như nhau ('dù là... hay là...').",
    "longExplanation": "'~(이)든' (dạng rút gọn của '-(이)든지') gắn sau danh từ hoặc thân động từ/tính từ, dùng để liệt kê nhiều sự lựa chọn nhằm biểu thị rằng dù có chọn phương án nào thì sự việc hay phán đoán ở vế sau vẫn như nhau và không bị ảnh hưởng, tương đương với 'dù là... hay là...', 'bất kể là...'. Khi gắn vào danh từ có phụ âm cuối dùng '-이든', không có phụ âm cuối dùng '-든'. Thường lặp lại ở dạng 'A든 B든'.",
    "formation": "Danh từ + (이)든 | Thân động từ / Thân tính từ + -든",
    "examples": [
      {
        "translation": "Dù là pizza hay mì pasta thì ăn món gì cũng được, vì cả hai món đều ngon mà."
      },
      {
        "translation": "Dù là tập thể thao hay tập yoga thì mọi hoạt động đều tốt cho sức khỏe."
      },
      {
        "translation": "Dù là xem phim với bạn bè hay là đọc sách thì tôi đều cảm thấy hạnh phúc."
      },
      {
        "translation": "Dù là bánh gạo cay tteokbokki hay lẩu budaejjigae thì tôi đều thích cả hai món ăn đó."
      }
    ]
  },
  "ko_이라도_95": {
    "title": "~(이)라도 (Dù là..., ít nhất thì cũng..., dẫu chỉ là...)",
    "shortExplanation": "Trợ từ biểu thị việc chấp nhận một phương án thứ yếu hoặc mức tối thiểu khi không có lựa chọn tối ưu ('dù chỉ là...', 'ít nhất thì cũng...').",
    "longExplanation": "'~(이)라도' là trợ từ gắn sau danh từ, biểu thị sự nhượng bộ để chấp nhận một phương án không phải là lý tưởng nhất nhưng tạm thời chấp nhận được vì không còn lựa chọn nào tốt hơn, hoặc biểu thị một kỳ vọng ở mức tối thiểu ('dù là... thì cũng...', 'ít nhất thì...'). Danh từ có phụ âm cuối kết hợp với '-이라도', không có phụ âm cuối kết hợp với '-라도'.",
    "formation": "Danh từ + (이)라도",
    "examples": [
      {
        "translation": "Dù chỉ là món quà nhỏ này xin bạn hãy nhận cho. Tôi không thể tặng bạn món quà tốt hơn được."
      },
      {
        "translation": "Tôi ước gì ít nhất anh ấy cũng nói một lời xin lỗi."
      },
      {
        "translation": "Dẫu cho cô ấy có ghét tôi đi nữa, dẫu chỉ là bạn bè tôi vẫn muốn tiếp tục gặp gỡ."
      },
      {
        "translation": "Vì đôi giày không có màu tôi mong muốn, nên dù là màu trắng tôi cũng sẽ mua vậy."
      }
    ]
  },
  "ko_이라는_96": {
    "title": "~(이)라는 것 (Cái gọi là..., điều gọi là...)",
    "shortExplanation": "Cấu trúc định ngữ gián tiếp kết hợp với danh từ phụ thuộc '것', dùng để định nghĩa, nêu bật hoặc giải thích về một khái niệm ('cái gọi là...').",
    "longExplanation": "'~(이)라는 것' là cấu trúc kết hợp giữa vĩ tố định ngữ trích dẫn gián tiếp '-(이)라는' (rút gọn từ '-(이)라고 하는') với danh từ phụ thuộc '것' (cái, điều). Cấu trúc này dùng để đưa một danh từ trừu tượng hoặc khái niệm ra làm chủ đề đàm thoại để định nghĩa, giải thích bản chất hoặc bàn luận sâu sắc về khái niệm đó, tương đương với 'cái gọi là...', 'điều gọi là...' trong tiếng Việt. Khi danh từ có phụ âm cuối dùng '-이라는 것', không có phụ âm cuối dùng '-라는 것'.",
    "formation": "Danh từ + (이)라는 것",
    "examples": [
      {
        "translation": "Dường như rất nhiều người thực sự muốn biết cái gọi là tình yêu rốt cuộc là thứ như thế nào."
      },
      {
        "translation": "Cái gọi là thành công là thứ không thể đạt được nếu thiếu đi rất nhiều nỗ lực và sự cống hiến."
      },
      {
        "translation": "Cái gọi là hạnh phúc rất khó để định nghĩa vì nó mang ý nghĩa khác nhau đối với từng cá nhân."
      },
      {
        "translation": "Cái gọi là sự quan tâm chu đáo chính là việc cân nhắc xem hành động của bản thân sẽ gây ảnh hưởng như thế nào đến người khác."
      }
    ]
  },
  "ko_이라면_97": {
    "title": "~(이)라면 (Nếu là, giả sử là)",
    "shortExplanation": "Biểu thị điều kiện hoặc tình huống giả định 'nếu là...' gắn sau danh từ.",
    "longExplanation": "'~(이)라면' là cấu trúc giả định gắn vào sau danh từ, dùng để đặt ra một tình huống hoặc thân phận giả định ('nếu là...', 'giả sử là...'). Nếu danh từ kết thúc bằng phụ âm (có phụ âm cuối) thì kết hợp với '-이라면', nếu kết thúc bằng nguyên âm (không có phụ âm cuối) thì kết hợp với '-라면'. Thường dùng để nêu lên một tiền đề và dẫn dắt tới suy nghĩ, thắc mắc hoặc hành động ở mệnh đề phía sau.",
    "formation": "Danh từ (có phụ âm cuối) + 이라면 / (không có phụ âm cuối) + 라면",
    "examples": [
      {
        "translation": "Nếu nơi đây thực sự là danh lam thắng cảnh nổi tiếng thì tại sao lại vắng vẻ thế này?"
      },
      {
        "translation": "Nếu thực sự xảy ra chuyện như vậy, tôi sẽ phải suy nghĩ xem nên đối phó thế nào."
      },
      {
        "translation": "Nếu muốn nghỉ học, em nên suy nghĩ xem tương lai mình sẽ định hướng ra sao."
      },
      {
        "translation": "Nếu cậu là bạn của tôi, tại sao lại phản bội tôi và đi rêu rao những chuyện xấu với các bạn khác?"
      }
    ]
  },
  "ko_이래_98": {
    "title": "~이래 (Như thế này, thế này)",
    "shortExplanation": "Dạng chia của tính từ '이러하다', dùng để diễn đạt tình trạng, hành vi 'như thế này', 'cứ thế này'.",
    "longExplanation": "'~이래' là dạng chia giản lược của tính từ '이러하다' (như thế này), thường xuất hiện trong các cấu trúc như '이래서는' (cứ như thế này thì...), '이래 있으면' (nếu cứ thế này...). Dùng để miêu tả tình trạng, phong độ hay cách thức hiện tại của sự vật, sự việc, qua đó người nói đưa ra nhận xét, đánh giá hoặc dự đoán hệ quả.",
    "formation": "Dạng chia của tính từ 이러하다 (thường gặp: 이래서는, 이래 있으면 등)",
    "examples": [
      {
        "translation": "Thời tiết cứ như thế này thì không thể đi chơi được rồi."
      },
      {
        "translation": "Nếu tôi cứ như thế này thì có lẽ sẽ trở nên nổi tiếng mất."
      },
      {
        "translation": "Ngôi nhà này cứ như thế này thì không thể nào bán được."
      },
      {
        "translation": "Cậu mà cứ giữ phong độ như thế này thì chắc chắn có thể gặt hái thành tích xuất sắc với tư cách là một vận động viên đấy."
      }
    ]
  },
  "ko_이랑_99": {
    "title": "~(이)랑 (Và, với, cùng với)",
    "shortExplanation": "Trợ từ nối danh từ, biểu thị sự liên kết liệt kê ('và') hoặc đối tượng cùng hành động ('cùng với').",
    "longExplanation": "'~(이)랑' là trợ từ dùng phổ biến trong khẩu ngữ tiếng Hàn, có hai chức năng chính: thứ nhất là liệt kê hai hay nhiều danh từ với ý nghĩa 'và'; thứ hai là biểu thị đối tượng cùng tham gia hành động với chủ ngữ với ý nghĩa 'cùng với' (thường kết hợp với '같이' hoặc '함께'). Danh từ có phụ âm cuối kết hợp với '-이랑', danh từ không có phụ âm cuối kết hợp với '-랑'. Mang sắc thái thân mật, tự nhiên.",
    "formation": "Danh từ (có phụ âm cuối) + 이랑 / (không có phụ âm cuối) + 랑",
    "examples": [
      {
        "translation": "Tôi dự định sẽ đi xem phim cùng với bạn."
      },
      {
        "translation": "Chúng tôi đã gọi pizza và gà rán."
      },
      {
        "translation": "Tôi đã mua quần áo ở trung tâm mua sắm cùng với chị gái."
      },
      {
        "translation": "Tôi đang nuôi cả mèo và chó."
      }
    ]
  },
  "ko_이러하다_100": {
    "title": "~이러하다 (Như thế này, thế này)",
    "shortExplanation": "Tính từ chỉ định biểu thị trạng thái, tính chất hoặc tình huống 'như thế này', 'như vầy'.",
    "longExplanation": "'이러하다' (dạng rút gọn là '이렇다') là tính từ chỉ định trong tiếng Hàn, dùng để miêu tả tình trạng, tính chất, thái độ hoặc sự việc có đặc điểm 'như thế này' (ở ngay trước mắt hoặc liên quan trực tiếp đến người nói). Thường kết hợp với các vĩ tố liên kết (như '-더니', '-다니', '-다 보니') để trình bày hoàn cảnh thực tế, từ đó dẫn ra cảm xúc, nhận định hoặc kết quả tương ứng.",
    "formation": "Tính từ 이러하다 + Vĩ tố liên kết (như 이러하더니, 이러하다니, 이러하다 보니, 이러하다고 하다 등)",
    "examples": [
      {
        "translation": "Thái độ của bạn ấy cứ như thế này nên tất cả mọi người đều hoang mang bối rối."
      },
      {
        "translation": "Thế giới dạo này lại ra nông nỗi như thế này, thật khó mà tin nổi."
      },
      {
        "translation": "Hành vi của cô ấy cứ như thế này mãi nên đã đánh mất lòng tin của mọi người."
      },
      {
        "translation": "Nghe nói anh ấy lại như thế này khiến tôi thực sự rất thất vọng."
      }
    ]
  },
  "ko_이런그런저런_101": {
    "title": "~이런 / 그런 / 저런 (Như thế này / thế đó / thế kia, loại này / loại đó / loại kia)",
    "shortExplanation": "Định từ chỉ định đứng trước danh từ, biểu thị 'loại này', 'loại đó', 'loại kia' hoặc 'như thế này/đó/kia'.",
    "longExplanation": "'~이런/그런/저런' là các định từ chỉ định (quán từ) đứng trực tiếp trước danh từ để bổ nghĩa về tính chất, trạng thái hoặc chủng loại. Trong đó: '이런' chỉ sự vật/tình huống gần người nói ('như thế này', 'loại này'); '그런' chỉ sự việc gần người nghe hoặc vừa được đề cập ('như thế đó', 'loại đó'); '저런' chỉ sự việc ở xa cả hai người hoặc mang sắc thái cảm thán ('như thế kia', 'loại kia').",
    "formation": "이런 / 그런 / 저런 + Danh từ",
    "examples": [
      {
        "translation": "Trong tình huống như thế này, tôi không biết phải đối phó ra sao nữa."
      },
      {
        "translation": "Tôi không thích bầu không khí kiểu như thế đó."
      },
      {
        "translation": "Nếu tôi mặc bộ quần áo kiểu kia thì người ta sẽ nghĩ thế nào nhỉ?"
      },
      {
        "translation": "Tôi không nên có những suy nghĩ như thế này mới phải."
      }
    ]
  },
  "ko_이므로_102": {
    "title": "~(으)므로 / -(이)므로 (Vì, do, bởi vì)",
    "shortExplanation": "Vĩ tố liên kết trang trọng biểu thị nguyên nhân, lý do rõ ràng trong văn viết hoặc phát biểu chính thức ('vì', 'do').",
    "longExplanation": "'~(으)므로 / -(이)므로' là vĩ tố liên kết trang trọng dùng trong văn viết, báo chí, tài liệu học thuật hoặc các bài phát biểu chính thức, dùng để nêu nguyên nhân, lý do khách quan dẫn đến kết quả ở mệnh đề sau ('vì...', 'do...'). Danh từ kết hợp với '-(이)므로'; thân động từ hoặc tính từ có phụ âm cuối kết hợp với '-으므로', không có phụ âm cuối hoặc kết thúc bằng phụ âm ㄹ kết hợp với '-므로'. Vế sau không đi cùng câu mệnh lệnh hay thỉnh dụ.",
    "formation": "Danh từ + (이)므로 | Thân động từ / Thân tính từ + -(으)므로",
    "examples": [
      {
        "translation": "Vì ngày mai là thứ Hai nên tối nay chúng ta phải đi ngủ sớm."
      },
      {
        "translation": "Vì điểm số thấp nên anh ấy không thể nhận học bổng từ giáo sư, dẫn đến việc gặp khó khăn về tài chính."
      },
      {
        "translation": "Do không có thời gian nên chúng tôi phải thu hẹp bữa tối lại."
      },
      {
        "translation": "Do năng lực làm việc của nhân viên đó rất kém nên chúng tôi đã đưa ra cảnh cáo đối với anh ta."
      }
    ]
  },
  "ko_이야_103": {
    "title": "~(이)야 (Là, đấy, đó - thể thân mật)",
    "shortExplanation": "Đuôi câu trần thuật hoặc xác nhận ở thể thân mật (banmal), gắn sau danh từ để biểu thị 'là...', 'đấy/đó'.",
    "longExplanation": "'~(이)야' là đuôi câu thân mật không kính ngữ (banmal) của trợ từ vị ngữ '-(이)다' (là), gắn vào sau danh từ hoặc danh từ phụ thuộc (như '것 + 이야 -> 거야'). Danh từ có phụ âm cuối kết hợp với '-이야', danh từ không có phụ âm cuối kết hợp với '-야'. Được dùng trong giao tiếp hằng ngày giữa bạn bè thân thiết, người bằng tuổi hoặc nói với người nhỏ tuổi hơn để trần thuật hoặc khẳng định một sự việc. Không dùng với người lớn tuổi.",
    "formation": "Danh từ (có phụ âm cuối) + 이야 / (không có phụ âm cuối) + 야 | Định ngữ + 거야",
    "examples": [
      {
        "translation": "Tôi cứ tưởng mình đói bụng nhưng không phải; tôi đã mua gimbap về rồi và giờ không đói nữa."
      },
      {
        "translation": "Hôm nay thời tiết thật đẹp, trời trong xanh và có thể ngắm nhìn bầu trời quang đãng."
      },
      {
        "translation": "Đây là nhà của mình đấy, hơi nhỏ một chút nhưng ấm cúng và thoải mái."
      },
      {
        "translation": "Hóa ra cậu thực sự thích nó đó hả, cảm ơn vì đã nói cho mình biết nhé."
      }
    ]
  },
  "ko_이지만_104": {
    "title": "~(이)지만 / -지만 (Tuy... nhưng, nhưng mà)",
    "shortExplanation": "Vĩ tố liên kết biểu thị sự tương phản, đối lập giữa hai mệnh đề ('tuy... nhưng', 'nhưng').",
    "longExplanation": "'~(이)지만 / -지만' là vĩ tố liên kết thông dụng gắn vào thân động từ, tính từ hoặc danh từ (thông qua trợ từ vị ngữ '-(이)다'), dùng để nối hai mệnh đề có ý nghĩa tương phản hoặc nhượng bộ ('tuy... nhưng...', 'nhưng'). Mệnh đề trước thừa nhận một sự thật hay trạng thái, nhưng mệnh đề sau lại đưa ra một kết quả hoặc thông tin bất ngờ, trái ngược. Có thể kết hợp với các thì quá khứ, tương lai (-았/었지만, -겠지만).",
    "formation": "Danh từ + (이)지만 | Thân động từ / Thân tính từ + -지만",
    "examples": [
      {
        "translation": "Bình thường tôi thuộc tuýp ít khi xem phim truyền hình nhưng bộ phim này thú vị quá nên nhất định tôi phải xem."
      },
      {
        "translation": "Hôm nay thời tiết đẹp nhưng vì bận rộn nên có lẽ tôi không ra ngoài được."
      },
      {
        "translation": "Bạn còn trẻ nhưng đã tích lũy được rất nhiều kinh nghiệm rồi đấy."
      },
      {
        "translation": "Tôi tuy là trưởng nhóm nhưng không tự mình quyết định mọi chuyện một mình đâu."
      }
    ]
  },
  "ko_이후_105": {
    "title": "~이후 / -(으)ㄴ 이후 (Kể từ sau khi, sau khi)",
    "shortExplanation": "Danh từ chỉ mốc thời gian hoặc cấu trúc định ngữ biểu thị khoảng thời gian 'kể từ sau khi' một sự kiện diễn ra.",
    "longExplanation": "'이후' (Hán-Hàn: 以後) biểu thị khoảng thời gian tính từ một mốc thời điểm hoặc một sự kiện nào đó trở về sau ('sau khi', 'kể từ sau khi'). Thường gắn trực tiếp sau danh từ (Danh từ + 이후) hoặc kết hợp với cấu trúc định ngữ thì quá khứ của động từ (-(으)ㄴ 이후). Thường đi kèm trợ từ '로' thành '이후로' để nhấn mạnh khoảng thời gian kéo dài liên tục từ sự kiện đó cho tới nay.",
    "formation": "Danh từ + 이후(로) | Thân động từ + -(으)ㄴ 이후(로)",
    "examples": [
      {
        "translation": "Đây là lần đầu tiên tôi tụ tập cùng bạn bè kể từ sau khi tốt nghiệp cấp hai."
      },
      {
        "translation": "Kể từ sau khi cô ấy chuyển lên thành phố, tôi chưa từng gặp lại cô ấy lần nào."
      },
      {
        "translation": "Kể từ sau bữa sáng tới giờ tôi chưa ăn thêm thứ gì cả."
      },
      {
        "translation": "Kể từ sau cuộc họp tôi vẫn tiếp tục làm việc ở văn phòng."
      }
    ]
  },
  "ko_인즉_106": {
    "title": "~인즉 / -(으)ㄴ즉 (Nói cách khác là, tức là, xét cho cùng thì)",
    "shortExplanation": "Vĩ tố liên kết hoặc quán ngữ liên kết dùng để diễn giải lại, làm sáng tỏ bản chất của sự việc ở vế trước ('tức là', 'nói cách khác').",
    "longExplanation": "'~인즉' (kết hợp của trợ từ vị ngữ '이다' với vĩ tố liên kết '-(으)ㄴ즉') được dùng để diễn giải rõ hơn nguyên nhân, bản chất hoặc hệ quả tất yếu của sự việc đã nêu trước đó, tương đương với 'tức là', 'nói cách khác', 'xét cho cùng thì'. Cấu trúc này thường đứng đầu câu hoặc giữa hai mệnh đề nhằm làm sáng tỏ ý nghĩa thực sự của tình huống ('nếu làm rõ ngọn ngành thì là...'). Dạng nhấn mạnh thường dùng là '인즉슨'.",
    "formation": "Mệnh đề / Danh từ + 인즉 | Thân động từ / Thân tính từ + -(으)ㄴ즉",
    "examples": [
      {
        "translation": "Công việc này thực sự rất khó; nói cách khác là nếu không phải chuyên gia thì không thể hoàn thành tốt được."
      },
      {
        "translation": "Cô ấy ngày mai sẽ kết hôn, tức là cô ấy không còn độc thân nữa."
      },
      {
        "translation": "Nhân viên bảo tàng đã không cho phép tôi vào cửa; tức là tôi đã vi phạm quy định."
      },
      {
        "translation": "Chúng tôi đã tham gia vào nghiên cứu; nói cách khác là chúng tôi đã có đóng góp nhất định về mặt học thuật."
      }
    ]
  },
  "ko_자_107": {
    "title": "~자 (Cùng làm... nhé, đi nào - thể thân mật)",
    "shortExplanation": "Vĩ tố kết thúc câu thỉnh dụ ở thể thân mật (banmal), dùng để rủ rê, đề xuất đối phương cùng làm việc gì ('...nhé', '...đi').",
    "longExplanation": "'~자' là vĩ tố kết thúc câu thỉnh dụ (đề nghị) ở phong cách thân mật không kính ngữ (banmal), gắn trực tiếp vào thân động từ. Dùng để rủ rê, đề xuất đối phương cùng thực hiện một hành động nào đó với người nói, tương đương với 'cùng làm... nhé', 'đi nào' trong tiếng Việt. Chỉ sử dụng với bạn bè đồng trang lứa thân thiết hoặc người nhỏ tuổi hơn; tuyệt đối không dùng với người lớn tuổi.",
    "formation": "Thân động từ + 자",
    "examples": [
      {
        "translation": "Thời tiết đẹp quá, chúng mình cùng đi leo núi đi!"
      },
      {
        "translation": "Hôm nay là Chủ nhật nên chúng ta hãy đến nhà thờ cầu nguyện nhé."
      },
      {
        "translation": "Ăn cơm xong xuôi rồi, giờ tụi mình đến quán cà phê uống một tách cà phê đi."
      },
      {
        "translation": "Đã là một ngày dài và mệt mỏi rồi, giờ chúng mình cùng chơi một ván board game rồi nghỉ ngơi cho thoải mái đi."
      }
    ]
  },
  "ko_자마자_108": {
    "title": "~자마자 (Ngay sau khi, vừa mới... thì đã...)",
    "shortExplanation": "Vĩ tố liên kết gắn vào thân động từ, biểu thị một hành động xảy ra ngay lập tức sau khi hành động trước kết thúc ('vừa mới... thì đã...', 'ngay sau khi').",
    "longExplanation": "'~자마자' là vĩ tố liên kết nối hai mệnh đề, diễn tả hành động ở mệnh đề sau diễn ra ngay tức thì sau khi hành động ở mệnh đề trước vừa kết thúc, khoảng cách thời gian giữa hai hành động gần như bằng không. Tương đương với 'ngay sau khi', 'vừa mới... thì...' trong tiếng Việt. Gắn trực tiếp vào thân động từ bất kể có hay không có phụ âm cuối, và không kết hợp với đuôi chỉ thì quá khứ ở vế trước (thì được biểu thị ở vị từ cuối câu).",
    "formation": "Thân động từ + 자마자",
    "examples": [
      {
        "translation": "Tôi vừa về đến nhà là chuẩn bị bữa ăn ngay, vì quá đói bụng và muốn ăn cái gì đó liền."
      },
      {
        "translation": "Mẹ vừa cúp điện thoại là tôi đi ngủ ngay, vì hôm qua ngủ muộn quá nên người rất mệt mỏi."
      },
      {
        "translation": "Anh ấy vừa thức dậy là uống cà phê ngay; anh ấy nói rằng buổi sáng không có cà phê thì không thể bắt đầu công việc được."
      },
      {
        "translation": "Trời vừa đổ mưa là tôi cầm ô đến thư viện ngay, vì tôi đã quyết định đi tìm tài liệu cho buổi học."
      }
    ]
  },
  "ko_전에전까지_109": {
    "title": "~기 전에 / ~기 전까지 (Trước khi... / Cho đến trước khi...)",
    "shortExplanation": "Biểu thị một hành động xảy ra trước một mốc thời gian/hành động khác ('trước khi') hoặc tiếp diễn cho tới tận mốc thời điểm đó ('cho đến trước khi').",
    "longExplanation": "'~기 전에' và '~기 전까지' gắn sau thân động từ (hoặc danh từ + 전) để xác định mốc thời gian liên quan đến một hành động. Trong đó, '~기 전에' diễn tả một hành vi xảy ra trước một hành động hay sự kiện nào đó ('trước khi làm gì'). Còn '~기 전까지' kết hợp trợ từ hạn định '까지' (đến tận) nhấn mạnh một hành động, trạng thái kéo dài liên tục cho tới tận thời điểm sự việc sau diễn ra ('cho đến tận trước khi...').",
    "formation": "Thân động từ + -기 전에 / -기 전까지 | Danh từ + 전에 / 전까지",
    "examples": [
      {
        "translation": "Tôi ăn bữa sáng trước khi đến trường."
      },
      {
        "translation": "Cô ấy sẽ liên lạc cho đến trước khi đi làm; có lẽ bạn hãy đợi cho đến khi có cuộc gọi nhé."
      },
      {
        "translation": "Chúng ta phải thu dọn hành lý trước khi tàu hỏa đến nơi."
      },
      {
        "translation": "Hãy cẩn thận cho đến khi chúng tôi trở về nhà nhé."
      }
    ]
  },
  "ko_정도_110": {
    "title": "~정도 / -(으)ㄹ 정도 (Khoảng, chừng, mức độ)",
    "shortExplanation": "Gắn sau danh từ chỉ số lượng để biểu thị số lượng ước chừng ('khoảng', 'chừng'), hoặc sau thân từ để biểu thị mức độ ('đến mức').",
    "longExplanation": "'정도' (Hán-Hàn: 程度) được dùng với hai nét nghĩa chính: Thứ nhất, khi đứng sau danh từ chỉ số lượng, thời gian hay mức giá, nó biểu thị con số ước chừng, xấp xỉ, tương đương với 'khoảng', 'chừng', 'tầm' trong tiếng Việt. Thứ hai, khi kết hợp với định ngữ tương lai '-(으)ㄹ 정도(로)', nó biểu thị mức độ cao của một hành động hay trạng thái ('đến mức mà...', 'chừng nào...').",
    "formation": "Danh từ chỉ số lượng + 정도 | Thân động từ / Thân tính từ + -(으)ㄹ 정도(로)",
    "examples": [
      {
        "translation": "Để giải quyết vấn đề này có lẽ sẽ mất khoảng một tiếng đồng hồ."
      },
      {
        "translation": "Nếu thực sự xem bộ phim đó thì chắc đã mất khoảng bốn tiếng đồng hồ rồi."
      },
      {
        "translation": "Để hoàn thành bài tập này cần khoảng thời gian một tháng."
      },
      {
        "translation": "Muốn đánh giá thành quả của anh ấy thì phải xem xét ít nhất 10 yếu tố trở lên, và việc này đòi hỏi khoảng một giờ đồng hồ."
      }
    ]
  },
  "ko_제_111": {
    "title": "~제 (Tuy... nhưng, dẫu rằng)",
    "shortExplanation": "Vĩ tố liên kết biểu thị sự nhượng bộ hoặc đối lập, diễn tả kết quả thực tế trái ngược với điều kiện phía trước ('mặc dù... nhưng', 'dẫu rằng').",
    "longExplanation": "'~제' là vĩ tố liên kết gắn vào thân động từ hoặc tính từ, dùng để biểu thị sự nhượng bộ hoặc tương phản giữa hai vế câu ('tuy... nhưng...', 'dẫu rằng...'). Cấu trúc này diễn đạt rằng mặc dù điều kiện hoặc sự thật ở vế trước đã xảy ra, nhưng kết quả hoặc hành động ở vế sau lại khác biệt so với mong đợi thông thường, tương tự như '-지만' hay '-되'. Thường mang sắc thái biểu cảm đặc trưng trong ngữ cảnh văn học hoặc khẩu ngữ vùng miền.",
    "formation": "Thân động từ / Thân tính từ + 제",
    "examples": [
      {
        "translation": "Dù bị ốm nhưng cô ấy vẫn tiếp tục làm việc."
      },
      {
        "translation": "Em trai tuy còn nhỏ tuổi nhưng có rất nhiều việc có thể giao phó cho em ấy."
      },
      {
        "translation": "Mặc dù trời đổ mưa nhưng tôi vẫn ra ngoài."
      },
      {
        "translation": "Đề thi tuy khó nhưng vì là môn học tôi yêu thích nên tôi đã làm bài một cách rất thích thú."
      }
    ]
  },
  "ko_조차_112": {
    "title": "~조차 (Ngay cả, thậm chí)",
    "shortExplanation": "Trợ từ nhấn mạnh biểu thị ý 'ngay cả', 'thậm chí' đối với một sự việc cực đoan hoặc tình huống không ngờ tới, thường dùng trong câu mang ý nghĩa tiêu cực.",
    "longExplanation": "'~조차' là trợ từ (tiểu từ bổ trợ) gắn sau danh từ (hoặc cụm danh từ hóa '~는 것'), dùng để nhấn mạnh sự bao hàm cả một đối tượng hay điều kiện cơ bản nhất, cực đoan nhất mà người ta không ngờ tới, mang nghĩa 'ngay cả...', 'thậm chí...'. Thường đi cùng với các tình huống tiêu cực, khó khăn hoặc diễn tả sự bất lực, thất vọng khi ngay cả điều cơ bản cũng không làm được.",
    "formation": "Danh từ + 조차",
    "examples": [
      {
        "translation": "Anh ấy mê tiền đến mức ngay cả bạn bè thân thiết cũng không chịu cho vay tiền."
      },
      {
        "translation": "Cuối tuần này, đến cả việc bước chân ra khỏi nhà tôi cũng thấy phiền phức."
      },
      {
        "translation": "Kỳ thi lần này khó đến mức ngay cả việc đọc đề bài thôi cũng thấy khó khăn."
      },
      {
        "translation": "Trong quán đông người quá nên ngay cả việc chọn món thôi cũng thấy mệt mỏi."
      }
    ]
  },
  "ko_존재하다_113": {
    "title": "~존재하다 (Tồn tại, hiện hữu)",
    "shortExplanation": "Động từ biểu thị sự tồn tại, hiện hữu của người, sự vật hoặc khái niệm trừu tượng trong thực tế hay suy nghĩ ('tồn tại').",
    "longExplanation": "'존재하다' (Hán-Việt: Tồn tại) là động từ dùng để chỉ sự hiện hữu, có mặt trong đời thực hoặc trong một không gian, thời gian nhất định. Từ này dùng được cho cả người, sự vật cụ thể lẫn các khái niệm trừu tượng như tình yêu, hy vọng, ý tưởng hay vấn đề. Thường mang sắc thái văn phong trang trọng, triết lý hoặc khách quan hơn từ chỉ vị trí thông thường '있다'.",
    "formation": "Danh từ (Chủ ngữ) + 이/가 + 존재하다",
    "examples": [
      {
        "translation": "Tôi hy vọng một thế giới kỳ ảo giống như trong phim cũng có thể tồn tại trong đời thực."
      },
      {
        "translation": "Tôi không rõ liệu tình yêu có thực sự tồn tại vĩnh cửu hay không."
      },
      {
        "translation": "Tôi nghi ngờ liệu trên thế gian này có tồn tại một người hoàn hảo hay không."
      },
      {
        "translation": "Trong căn phòng này ngoài tôi ra thì không có ai khác tồn tại cả."
      }
    ]
  },
  "ko_줄_114": {
    "title": "~줄 알다 (Cứ ngỡ là, tưởng rằng...)",
    "shortExplanation": "Diễn tả suy nghĩ, phỏng đoán trước đó của người nói về một sự việc, nhưng thực tế lại trái ngược với dự đoán ('cứ tưởng là...', 'ngỡ rằng...').",
    "longExplanation": "'~줄 알다' kết hợp sau định ngữ của động từ hoặc tính từ (ở quá khứ thường dùng dạng '~줄 알았다'), diễn đạt việc người nói trước đây từng đinh ninh, phán đoán sự việc diễn ra theo một chiều hướng nào đó, nhưng thực tế kết quả lại hoàn toàn khác biệt hoặc trái ngược. Thường mang sắc thái ngạc nhiên, thất vọng hoặc thở phào nhẹ nhõm ('cứ tưởng là... ai ngờ...'). Phủ định của cấu trúc là '~줄 몰랐다' (không ngờ rằng...).",
    "formation": "Định ngữ (Động từ / Tính từ + -(으)ㄴ/는/(으)ㄹ) + 줄 알다 (알았다)",
    "examples": [
      {
        "translation": "Tôi cứ ngỡ thời tiết sẽ đẹp, ai ngờ trời lại đột ngột đổ mưa nên thấy thất vọng."
      },
      {
        "translation": "Tôi cứ tưởng người đó thích mình, nhưng hóa ra không phải vậy."
      },
      {
        "translation": "Tôi cứ nghĩ đề thi sẽ khó lắm, nhưng hóa ra lại dễ hơn so với tưởng tượng."
      },
      {
        "translation": "Tôi cứ tưởng tiến độ sẽ bị chậm trễ, nhưng mọi chuyện lại kết thúc nhanh chóng."
      }
    ]
  },
  "ko_즉시_115": {
    "title": "~즉시 (Ngay lập tức, vừa mới... là... ngay)",
    "shortExplanation": "Phó từ hoặc cấu trúc liên kết biểu thị hành động vế sau diễn ra ngay tức thì sau hành động vế trước ('ngay lập tức', 'ngay khi').",
    "longExplanation": "'즉시' (Hán-Việt: Tức thời / Tức thì) dùng như một phó từ chỉ thời gian mang nghĩa 'ngay lập tức', hoặc kết hợp sau định ngữ của động từ '-(으)ㄴ/는 즉시' để tạo thành cấu trúc liên kết chỉ thời gian: ngay khi hành động phía trước vừa hoàn tất thì hành động phía sau xảy ra lập tức mà không có bất kỳ sự chậm trễ nào, tương đương với 'ngay khi...', 'vừa mới... là lập tức...'.",
    "formation": "Động từ + -(으)ㄴ/는 즉시 | Phó từ: 즉시",
    "examples": [
      {
        "translation": "Ngay khi cô ấy bước vào phòng, tôi đã định tặng quà cho cô ấy ngay."
      },
      {
        "translation": "Khi nhận được tin nhắn thì phải phản hồi ngay lập tức, nếu không người đó sẽ phải chờ đợi."
      },
      {
        "translation": "Tối hôm đó, ngay khi cô ấy hoàn thành bản báo cáo là tôi đã kiểm tra ngay."
      },
      {
        "translation": "Ngay sau khi cuộc họp kết thúc, tôi đã đi chụp ảnh ngay."
      }
    ]
  },
  "ko_지_116": {
    "title": "~지 않다 (Không làm gì, không...)",
    "shortExplanation": "Vĩ tố phủ định dài gắn sau thân động từ hoặc tính từ để biểu thị sự phủ định hành động hoặc trạng thái ('không...').",
    "longExplanation": "'~지 않다' là cấu trúc phủ định dài (장형 부정) cơ bản trong tiếng Hàn, được gắn trực tiếp vào thân động từ hoặc tính từ để biểu thị ý nghĩa không thực hiện hành vi hoặc trạng thái nào đó không diễn ra, tương đương với 'không...' trong tiếng Việt. So với phủ định ngắn ('안 + động từ/tính từ'), '~지 않다' mang sắc thái trang trọng, khách quan và mềm mại hơn, thường xuyên xuất hiện trong văn viết cũng như hội thoại lịch sự.",
    "formation": "Thân động từ / Thân tính từ + 지 않다",
    "examples": [
      {
        "translation": "Hôm nay tôi đã không đến trường vì trời mưa quá to khiến việc đi lại là không thể."
      },
      {
        "translation": "Tôi thường không ăn thịt vì tôi là người ăn chay."
      },
      {
        "translation": "Minji đã không xem bộ phim đó vì cô ấy thấy nó quá đáng sợ."
      },
      {
        "translation": "Họ đã không đến dự bữa tiệc sinh nhật của tôi vì họ bận."
      }
    ]
  },
  "ko_지_117": {
    "title": "~지 않아도 되다 (Không cần phải, không làm cũng được)",
    "shortExplanation": "Biểu thị việc không có nghĩa vụ hoặc không bắt buộc phải làm một việc gì đó ('không cần phải...', 'không... cũng được').",
    "longExplanation": "'~지 않아도 되다' được tạo thành từ cấu trúc phủ định '~지 않다' kết hợp với ngữ pháp cho phép '-아/어도 되다'. Cấu trúc này dùng để diễn đạt sự không cần thiết hoặc không bắt buộc phải thực hiện hành động, mang nghĩa 'không cần phải làm gì', 'không làm cũng không sao', 'không nhất thiết phải...'. Cấu trúc này giúp giảm bớt áp lực hoặc cho phép đối phương được tự do lựa chọn.",
    "formation": "Thân động từ / Thân tính từ + 지 않아도 되다",
    "examples": [
      {
        "translation": "Cậu không cần phải quá lo lắng đâu, mọi chuyện rồi sẽ ổn cả thôi."
      },
      {
        "translation": "Bây giờ không ăn ngay cũng được mà, để lát nữa ăn cũng không sao."
      },
      {
        "translation": "Cậu không cần phải bắt chước những gì người khác làm đâu, hãy tin vào chính mình."
      },
      {
        "translation": "Cậu không cần phải đi đâu cả, cứ thoải mái nghỉ ngơi ở nhà đi."
      }
    ]
  },
  "ko_지만_119": {
    "title": "~지만 (Nhưng, tuy... nhưng...)",
    "shortExplanation": "Vĩ tố liên kết đối lập dùng để nối hai mệnh đề có ý nghĩa tương phản hoặc ngược nhau ('nhưng', 'tuy... nhưng...').",
    "longExplanation": "'~지만' là vĩ tố liên kết chỉ sự đối lập được gắn trực tiếp vào thân động từ, tính từ hoặc danh từ + 이다/아니다 mà không phụ thuộc vào việc có phụ âm cuối hay không. Nó dùng để kết nối hai mệnh đề có nội dung tương phản, mâu thuẫn hoặc kết quả ở vế sau ngược lại với dự đoán rút ra từ vế trước, tương đương với 'nhưng', 'tuy... nhưng...' trong tiếng Việt. Cấu trúc này dùng được cho cả các thì quá khứ, hiện tại và tương lai.",
    "formation": "Thân động từ / Thân tính từ + 지만 | Danh từ + (이)지만",
    "examples": [
      {
        "translation": "Thời tiết hôm nay tuy âm u nhưng tâm trạng của tôi lại rất tốt."
      },
      {
        "translation": "Bộ phim đó tuy không hay nhưng diễn xuất của diễn viên lại vô cùng xuất sắc."
      },
      {
        "translation": "Tôi thích thịt nhưng thỉnh thoảng vẫn ăn đồ chay."
      },
      {
        "translation": "Con trai tôi tuy tốt bụng nhưng đôi khi lại trở nên nhút nhát."
      }
    ]
  },
  "ko_지요_120": {
    "title": "~지요 / ~죠 (Đúng không, chứ, nhỉ)",
    "shortExplanation": "Vĩ tố kết thúc câu dùng để hỏi lại nhằm xác nhận điều người nghe đã biết, hoặc tìm kiếm sự đồng tình ('đúng không nhỉ', 'chứ', 'phải không').",
    "longExplanation": "'~지요' (thường được rút gọn thành '~죠' trong văn nói) là vĩ tố kết thúc câu thân mật lịch sự. Cấu trúc này được dùng khi người nói muốn xác nhận lại một sự việc mà mình tin là người nghe cũng biết hoặc cùng chung suy nghĩ, nhằm tìm kiếm sự đồng tình hay tái khẳng định ('...đúng không?', '...nhỉ?'). Ngoài ra, nó cũng có thể dùng trong câu trần thuật để biểu thị sự đoan chắc, tự tin về ý kiến của mình.",
    "formation": "Thân động từ / Thân tính từ + 지요 (죠) | Danh từ + (이)지요 (죠)",
    "examples": [
      {
        "translation": "Thời tiết hôm nay thật đẹp đúng không nào, mặt trời tỏa nắng rực rỡ và gió cũng thật mát mẻ nữa."
      },
      {
        "translation": "Cà phê ở quán mới mở ngon đúng không, tôi nghĩ quán đó rất đáng để ghé qua thử đấy."
      },
      {
        "translation": "Chú cún con thật đáng yêu đúng không, làm người ta ngày nào cũng muốn ngắm nhìn."
      },
      {
        "translation": "Con nhà chúng tôi cao lớn đúng không, chắc là giống bố nên mới thế đấy."
      }
    ]
  },
  "ko_진_121": {
    "title": "~진 않다 (Cũng không hẳn là, không hẳn...)",
    "shortExplanation": "Dạng rút gọn của '~지는 않다', dùng để biểu thị sự phủ định nhẹ nhàng hoặc phủ định một phần ('không hẳn là...', 'cũng không hẳn...').",
    "longExplanation": "'~진 않다' là hình thức rút gọn của cấu trúc '~지는 않다' (gồm vĩ tố bổ trợ '-지' + trợ từ nhấn mạnh đối chiếu '-는' + phủ định '않다'). Cấu trúc này dùng để biểu thị sự phủ định nhẹ nhàng, có chừng mực, mang nghĩa 'không hẳn là...', 'cũng không đến mức...', 'thì không... nhưng...'. Nó thường được dùng khi người nói muốn ngầm đối chiếu rằng tuy không hoàn toàn đúng hay không thỏa mãn điều kiện đó, nhưng lại có một khía cạnh khác bù lại.",
    "formation": "Thân động từ / Thân tính từ + 진 않다 (지는 않다)",
    "examples": [
      {
        "translation": "Nơi đó tuy không đến mức quá nóng bức, nhưng vào mùa hè thì lúc nào cũng ẩm ướt."
      },
      {
        "translation": "Dù tôi không hẳn là thích cô ấy, nhưng tôi lại tôn trọng cách suy nghĩ của cô ấy."
      },
      {
        "translation": "Dạo này tuy quá bận rộn nên không thể thường xuyên đến phòng tập, nhưng tôi vẫn tập thể dục ở nhà."
      },
      {
        "translation": "Nhà hàng này tuy không hẳn đến mức khắc sâu vào tâm trí, nhưng đồ ăn lại rất ngon."
      }
    ]
  },
  "ko_처럼_122": {
    "title": "~처럼 (Như, giống như)",
    "shortExplanation": "Trợ từ so sánh gắn sau danh từ, biểu thị hình dáng, trạng thái hoặc hành động tương tự như đối tượng được nêu ra ('như...', 'giống như...').",
    "longExplanation": "'~처럼' là trợ từ so sánh trong tiếng Hàn, được gắn trực tiếp vào sau danh từ, dùng để so sánh sự tương đồng về hình dạng, tính chất hoặc phương thức hành động với một sự vật, hiện tượng khác, tương đương với 'như...', 'giống như...', 'tựa như...' trong tiếng Việt. Thường đi kèm với phó từ '마치' (hệt như, cứ như thể) để tăng thêm hiệu quả tu từ so sánh ví von.",
    "formation": "Danh từ + 처럼 | (마치) + Danh từ + 처럼",
    "examples": [
      {
        "translation": "Cô ấy khiêu vũ nhẹ nhàng như một cánh bướm, nhịp điệu và từng chuyển động của cô ấy thực sự rất đẹp."
      },
      {
        "translation": "Bố luôn bảo vệ che chở cho gia đình vững chãi giống như một cái cây đại thụ."
      },
      {
        "translation": "Anh ấy vì quá đói nên đã ăn ngấu nghiến thịt hệt như một con sư tử."
      },
      {
        "translation": "Khi sự thật bị phát giác, anh ta đã mỉm cười cứ như thể một con mèo vừa bắt được chuột."
      }
    ]
  },
  "ko_아서어서_123": {
    "title": "~아서/어서 (Vì... nên..., do... nên...)",
    "shortExplanation": "Vĩ tố liên kết chỉ nguyên nhân - kết quả trực tiếp, biểu thị lý do dẫn đến kết quả ở mệnh đề sau ('vì... nên...').",
    "longExplanation": "'~아서/어서' là vĩ tố liên kết chỉ nguyên nhân - lý do gắn vào thân động từ hoặc tính từ, dùng để nối hai mệnh đề trong đó mệnh đề trước là nguyên nhân trực tiếp dẫn tới hành động, trạng thái ở mệnh đề sau, tương đương với 'vì... nên...', 'do... nên...' trong tiếng Việt. Nếu thân từ có nguyên âm dương tính (ㅏ, ㅗ) thì kết hợp với '-아서', các nguyên âm còn lại kết hợp với '-어서', riêng đuôi '하다' chuyển thành '해서'. Lưu ý: trước '-아서/어서' không dùng các thì quá khứ hay tương lai, và đuôi câu không dùng với câu mệnh lệnh hay rủ rê.",
    "formation": "Thân động từ / Thân tính từ + -아/어서",
    "examples": [
      {
        "translation": "Tôi đói bụng quá nên đã ăn hết tận hai bát cơm."
      },
      {
        "translation": "Bạn tôi đến muộn quá nên bộ phim đã bắt đầu mất rồi."
      },
      {
        "translation": "Tiết học khó quá nên tôi đã phải học bài rất nhiều."
      },
      {
        "translation": "Thời tiết lạnh quá nên tôi chỉ ở lì trong nhà."
      }
    ]
  },
  "ko_것_124": {
    "title": "~(으)ㄴ/는/ㄹ 것 같다 (Dường như, có vẻ như, hình như)",
    "shortExplanation": "Cấu trúc biểu thị sự phỏng đoán, suy đoán của người nói dựa trên một căn cứ, hoặc làm giảm tính khẳng định để câu nói mềm mại hơn ('hình như...', 'có vẻ như...').",
    "longExplanation": "'~(으)ㄴ/는/ㄹ 것 같다' là cấu trúc phỏng đoán rất thông dụng trong tiếng Hàn, kết hợp giữa vĩ tố định ngữ của động từ, tính từ và danh từ phụ thuộc '것' cùng tính từ '같다'. Cấu trúc này dùng để diễn đạt suy đoán, nhận định của người nói dựa trên cảm nhận, quan sát hoặc bằng chứng gián tiếp ('hình như...', 'có vẻ như...'). Ngoài ra, nó còn được sử dụng rất nhiều như một cách diễn đạt tế nhị, gián tiếp nhằm tránh việc khẳng định chắc nịch ý kiến cá nhân.",
    "formation": "Thân động từ / Thân tính từ + -(으)ㄴ/는/(으)ㄹ 것 같다",
    "examples": [
      {
        "translation": "Tôi bị đau bụng từ sáng nay. Có vẻ như là do tôi đã ăn đồ cay nên mới bị đau."
      },
      {
        "translation": "Bầu không khí quanh cô ấy dường như đột nhiên thay đổi. Không ai biết chuyện gì đã xảy ra cả."
      },
      {
        "translation": "Hôm qua trời mưa nhưng hôm nay thời tiết có vẻ sáng sủa lung linh rạng ngời."
      },
      {
        "translation": "Bên ngoài dường như chẳng có ai cả. Tôi chẳng biết mọi người đã đi đâu hết rồi."
      }
    ]
  },
  "ko_커녕_125": {
    "title": "~커녕 / ~는커녕 (Nói chi đến, huống hồ, đừng nói là...)",
    "shortExplanation": "Trợ từ biểu thị ý 'đừng nói đến...', 'nói chi đến...', dùng khi ngay cả điều cơ bản hơn còn không đạt được huống chi là điều được nêu ra ('huống hồ', 'chẳng những không... mà còn...').",
    "longExplanation": "'~커녕' (sau danh từ có phụ âm cuối thường dùng '~은커녕', sau nguyên âm dùng '~는커녕', hoặc kết hợp sau mệnh đề ở dạng '-기는커녕 / -는 것 커녕') là trợ từ bổ trợ dùng để nhấn mạnh rằng thực tế hoàn toàn trái ngược với kỳ vọng. Nó biểu thị ý rằng ngay cả điều cơ bản, tối thiểu hay đơn giản hơn còn không thể làm được thì nói chi đến điều lớn lao hay khó khăn hơn được nhắc đến ở vế trước, tương đương với 'đừng nói là...', 'nói chi đến...', 'huống hồ...' trong tiếng Việt.",
    "formation": "Danh từ + -(은/는)커녕 | Thân động từ + -기는커녕 (는 것 커녕)",
    "examples": [
      {
        "translation": "Jiyoung đừng nói đến việc trò chuyện đơn giản bằng tiếng Hàn, ngay cả câu 'Xin chào' cũng chỉ vừa vặn nói được chừng đó thôi."
      },
      {
        "translation": "Tôi vào cuối tuần đừng nói là có thời gian đọc sách, ngập đầu trong việc nhà đã đủ vất vả lắm rồi."
      },
      {
        "translation": "Seongjin đừng nói là ngủ sau khi ôn thi xong, cậu ấy thậm chí còn thức trắng đêm để chơi game."
      },
      {
        "translation": "Cô ấy chẳng những không giảm cân mà đêm nào cũng ăn vặt."
      }
    ]
  },
  "ko_게_126": {
    "title": "~게 되다 (Được, bị, trở nên, hóa ra là...)",
    "shortExplanation": "Biểu thị một hành động hoặc trạng thái được thay đổi, biến chuyển do hoàn cảnh bên ngoài tác động mà không hoàn toàn do ý chí chủ quan ('được làm', 'bị...', 'trở nên...').",
    "longExplanation": "'~게 되다' là cấu trúc kết hợp giữa vĩ tố phó từ '-게' và động từ '되다' (trở thành), gắn vào thân động từ hoặc tính từ. Cấu trúc này dùng để diễn đạt sự biến đổi trạng thái hoặc kết quả của một hành động xảy ra do yếu tố khách quan, hoàn cảnh bên ngoài đưa đẩy hoặc sự sắp đặt của hoàn cảnh mà không phải do ý định chủ quan ban đầu của chủ thể, tương đương với 'được...', 'bị...', 'trở nên...', 'hóa ra là...'.",
    "formation": "Thân động từ / Thân tính từ + 게 되다",
    "examples": [
      {
        "translation": "Hôm qua tôi đã đi đá bóng xa với bạn bè, mệt rã rời đến mức giờ chỉ có thể lăn ra ngủ thôi."
      },
      {
        "translation": "Anh ấy đã học tập chăm chỉ và trở thành một doanh nhân thành đạt."
      },
      {
        "translation": "Sau khi đọc xong cuốn sách đó, tôi đã rơi vào nỗi trăn trở suy tư sâu sắc."
      },
      {
        "translation": "Do bị phơi mình trong giá rét suốt thời gian dài nên sức khỏe của chúng tôi đã bị xấu đi."
      }
    ]
  },
  "ko_게_127": {
    "title": "~게 하다 (Làm cho, khiến cho [trạng thái])",
    "shortExplanation": "Gắn sau thân tính từ để biểu thị việc làm cho hoặc khiến cho ai đó/cái gì rơi vào một trạng thái nhất định ('làm cho...', 'khiến cho...').",
    "longExplanation": "'~게 하다' kết hợp với thân tính từ để diễn tả hành động hay tác động khiến một đối tượng thay đổi hoặc duy trì một trạng thái, cảm xúc nào đó. Cấu trúc này tương đương với 'làm cho...', 'khiến cho...' trong tiếng Việt, biểu thị quan hệ sai khiến mang tính trạng thái.",
    "formation": "Thân tính từ + 게 하다",
    "examples": [
      {
        "translation": "Cô ấy khiến tôi cảm thấy hạnh phúc."
      },
      {
        "translation": "Đầu bếp làm cho món súp khoai tây này trở nên ngon miệng."
      },
      {
        "translation": "Nhờ mẹ thúc đẩy tôi chuẩn bị kỹ càng mà tôi đã có thể vượt qua kỳ thi."
      },
      {
        "translation": "Nhờ giáo sư giúp tôi tập trung mà tôi đã có thể ghi nhớ toàn bộ thông tin."
      }
    ]
  },
  "ko_게_128": {
    "title": "~게 하다 (Bắt, khiến, để cho ai làm gì [hành động])",
    "shortExplanation": "Gắn sau thân động từ để biểu thị hành động sai khiến, cho phép hoặc bắt buộc ai đó thực hiện một hành động ('bắt...', 'khiến...', 'để cho... làm').",
    "longExplanation": "'~게 하다' kết hợp với thân động từ hành động để biểu thị ý nghĩa sai khiến (사동), thể hiện việc chủ ngữ tác động, sai bảo, yêu cầu hoặc cho phép đối tượng khác thực hiện một hành động cụ thể. Tương đương với cấu trúc 'bắt ai làm gì', 'cho phép/để ai làm gì' trong tiếng Việt.",
    "formation": "Thân động từ + 게 하다",
    "examples": [
      {
        "translation": "Vì bạn gái thích cà phê nên mỗi buổi sáng tôi đều để cô ấy uống cà phê."
      },
      {
        "translation": "Vì cha mẹ nghĩ rằng bằng cấp rất quan trọng nên đã bắt con cái tự học một mình."
      },
      {
        "translation": "Vì bạn tôi muốn đi du lịch nước ngoài nên tôi đã giúp cậu ấy đặt vé máy bay."
      },
      {
        "translation": "Thầy giáo đã yêu cầu các học sinh thức dậy sớm."
      }
    ]
  },
  "ko_키가_129": {
    "title": "~키가 크다/작다 (Cao / Thấp, lùn [chiều cao])",
    "shortExplanation": "Cụm từ dùng để miêu tả chiều cao vóc dáng của một người: '키가 크다' là cao ráo và '키가 작다' là thấp bé.",
    "longExplanation": "'키가 크다' và '키가 작다' là cách diễn đạt đặc trưng trong tiếng Hàn để miêu tả chiều cao cơ thể người, trong đó '키' nghĩa là chiều cao, tầm vóc kết hợp với tính từ '크다' (lớn/cao) hoặc '작다' (nhỏ/thấp). Cụm từ này tương đương với 'cao' và 'thấp/lùn' trong tiếng Việt khi miêu tả ngoại hình.",
    "formation": "Danh từ (Người) + 은/는/이/가 + 키가 크다 / 작다",
    "examples": [
      {
        "translation": "Người cao nhất trường chúng tôi là Cheolsu lớp tôi đấy."
      },
      {
        "translation": "Cô ấy dáng người cao ráo nên trông như người mẫu vậy."
      },
      {
        "translation": "Tôi có dáng người thấp nên vẫn có thể ngồi vừa ghế dành cho trẻ em."
      },
      {
        "translation": "Tuy anh ấy vóc dáng nhỏ bé nhưng nhân cách lại rất tuyệt vời và rộng lượng."
      }
    ]
  },
  "ko_키로_130": {
    "title": "~기로 (Quyết định làm, bằng cách...)",
    "shortExplanation": "Vĩ tố danh từ hóa '-기' kết hợp với trợ từ phương thức '-로', biểu thị việc định đoạt, quyết định hoặc chọn làm một việc gì đó ('quyết định...', 'bằng cách...').",
    "longExplanation": "'~기로' được tạo thành bởi vĩ tố biến đổi động từ thành danh từ '-기' và trợ từ chỉ phương hướng/phương thức '-(으)로'. Thường đi kèm với các động từ phán đoán hay quyết định như '하다', '결정하다', '약속하다', '시작하다' để biểu thị việc đưa ra quyết tâm, kế hoạch thực hiện một hành vi, tương đương với 'quyết định làm...', 'hẹn sẽ...' trong tiếng Việt.",
    "formation": "Thân động từ + 기로 (하다/결정하다/시작하다)",
    "examples": [
      {
        "translation": "Tôi quyết định mỗi sáng sẽ chơi đàn piano một lần, nhờ vậy mà kỹ năng âm nhạc đã tiến bộ."
      },
      {
        "translation": "Chúng tôi đã quyết định giải quyết vụ việc này bằng con đường đối thoại."
      },
      {
        "translation": "Cô ấy bắt đầu việc viết bài vào mỗi thứ Hai hàng tuần, từ đó nâng cao được kỹ năng viết lách."
      },
      {
        "translation": "Tôi đã quyết định tập thể dục mỗi ngày từ năm ngoái, và sức khỏe đã được cải thiện rõ rệt."
      }
    ]
  },
  "ko_타다_131": {
    "title": "~타다 (Đi, đón, cưỡi, ngồi [phương tiện giao thông])",
    "shortExplanation": "Động từ biểu thị hành động đi, ngồi hoặc đón các phương tiện giao thông như xe buýt, tàu điện ngầm, máy bay, taxi, xe đạp ('đi xe', 'ngồi tàu').",
    "longExplanation": "'타다' là ngoại động từ cơ bản trong tiếng Hàn dùng để chỉ hành vi bước lên, đi hoặc sử dụng một phương tiện giao thông (như xe buýt, taxi, tàu hỏa, máy bay, xe đạp). Cấu trúc kết hợp trực tiếp với danh từ chỉ phương tiện cùng trợ từ tân ngữ '을/를'. Ngoài ra trong các ví dụ thường xuất hiện dạng kết hợp như '타다 보면' (nếu cứ liên tục đi/ngồi phương tiện đó thì...).",
    "formation": "Danh từ (Phương tiện giao thông) + 을/를 + 타다",
    "examples": [
      {
        "translation": "Vì một tuần tôi đi máy bay tới hai lần nên có vẻ như tôi đã quen với việc bay rồi. Dù sao thì chỗ làm việc cũng ở xa nên tôi thường xuyên phải đi máy bay."
      },
      {
        "translation": "Dù sao thì nếu thường xuyên đạp xe đạp thì thể lực sẽ tốt lên và cũng rất có lợi cho sức khỏe, nên bạn hãy thường xuyên đi xe đạp nhé. Hơn nữa việc đạp xe cũng là một hình thức rèn luyện rất tốt."
      },
      {
        "translation": "Nếu cứ thường xuyên đi taxi như thế này thì có vẻ sẽ tốn rất nhiều tiền. Vì vậy nếu có thể thì bạn nên đi tàu điện ngầm hoặc đi bộ sẽ tốt hơn."
      },
      {
        "translation": "Nếu đi xe buýt một mình vào đêm muộn thế này thì hẳn là sẽ có chút bất an đúng không? Vì thế vào lúc đêm muộn thế này nếu có thể thì đi taxi sẽ tốt hơn."
      }
    ]
  },
  "ko_테니까_132": {
    "title": "~테니까 (Vì, do... [dự đoán hoặc ý định làm căn cứ])",
    "shortExplanation": "Vĩ tố liên kết biểu thị nguyên nhân, lý do dựa trên dự đoán hoặc ý chí, dự định của người nói ('vì...', 'do...', 'tôi sẽ... nên...').",
    "longExplanation": "'~테니까' (dạng rút gọn của '-(으)ㄹ 터이니까') là vĩ tố liên kết chỉ nguyên nhân hoặc tiền đề. Vế trước thường diễn tả ý chí của người nói hoặc sự phỏng đoán chắc chắn về một tình huống ('vì tôi sẽ làm... nên hãy...', 'vì chắc là... nên hãy...'). Cấu trúc này thường đi kèm với câu mệnh lệnh hoặc rủ rê ở vế sau, mang sắc thái lý do mạnh mẽ hơn so với các vĩ tố chỉ nguyên nhân thông thường.",
    "formation": "Thân động từ / Thân tính từ + -(으)ㄹ 테니까",
    "examples": [
      {
        "translation": "Vì bên ngoài trời lạnh nên bạn hãy mặc thêm áo ấm rồi hẵng đi nhé."
      },
      {
        "translation": "Vì tôi ngủ quá muộn nên buổi sáng thức dậy rất mệt mỏi."
      },
      {
        "translation": "Vì đang sống ở Seoul nên thỉnh thoảng tôi lại ra sông Hàn đi dạo."
      },
      {
        "translation": "Vì việc học tiếng Hàn rất thú vị nên ngày nào tôi cũng chăm chỉ học tập."
      }
    ]
  },
  "ko_토록_133": {
    "title": "~도록 / ~토록 (Đến mức, cho đến khi, sao cho)",
    "shortExplanation": "Vĩ tố liên kết phó từ biểu thị mức độ cực độ của một hành động, thời hạn kéo dài hoặc mục đích cần hướng tới ('đến mức...', 'cho đến tận...', 'để mà...').",
    "longExplanation": "'~토록' (hoặc dạng thường gặp hơn là '-도록') là vĩ tố liên kết phó từ hóa gắn sau thân động từ hoặc tính từ, dùng để chỉ mức độ đạt tới một giới hạn tột cùng ('đến mức mà...'), thời hạn kéo dài ('suốt, cho đến tận khi...'), hoặc mục đích, kết quả hướng tới ('để sao cho...'). Cấu trúc này thường mang sắc thái nhấn mạnh mức độ mãnh liệt hoặc sâu sắc của hành vi.",
    "formation": "Thân động từ / Thân tính từ + 도록 / 토록",
    "examples": [
      {
        "translation": "Vì muốn dự án thành công nên anh ấy đã nỗ lực đến mức hy sinh cả sức khỏe của bản thân."
      },
      {
        "translation": "Để không bị muộn giờ làm ở công ty, cô ấy đã quyết định thức dậy sớm."
      },
      {
        "translation": "Dân số gia tăng nghiêm trọng đến mức chỗ ở tại đây đã bị thu hẹp lại."
      },
      {
        "translation": "Cái nghèo trở nên cùng cực đến mức kiếm một bát cơm ăn cũng thấy vô cùng khó khăn."
      }
    ]
  },
  "ko_하게_134": {
    "title": "~게 되다 (Được, bị, trở nên, hóa ra là [kết quả do hoàn cảnh])",
    "shortExplanation": "Gắn sau thân động từ để diễn tả một sự việc, hành động tự nhiên xảy ra do hoàn cảnh khách quan bên ngoài tác động chứ không hoàn toàn do chủ ý ban đầu ('được...', 'bị...', 'trở nên...').",
    "longExplanation": "'~게 되다' là cấu trúc bị động - kết quả được cấu thành bởi vĩ tố phó từ '-게' và trợ động từ '되다'. Cấu trúc này dùng để diễn đạt sự biến chuyển về trạng thái hoặc một tình huống diễn ra do hoàn cảnh xô đẩy, tác động khách quan hay sự thay đổi theo thời gian mà chủ thể không lường trước hoặc không tự quyết định từ đầu. Tương đương với 'được/bị làm gì', 'hóa ra lại...', 'rốt cuộc đành phải...' trong tiếng Việt.",
    "formation": "Thân động từ + 게 되다",
    "examples": [
      {
        "translation": "Bài tập chất đống nhiều quá nên rốt cuộc tôi đã phải làm bài tập suốt cả kỳ nghỉ cuối tuần."
      },
      {
        "translation": "Bình thường thì tôi sẽ không nói đâu, nhưng hôm qua tình thế xô đẩy nên tôi đã kể hết mọi chuyện cho bạn nghe."
      },
      {
        "translation": "Ban đầu tôi không thích tập thể dục đâu, nhưng vì bạn bè liên tục rủ rê nên rốt cuộc tôi đã đăng ký làm hội viên phòng gym."
      },
      {
        "translation": "Tôi vốn định học bài thi, thế nhưng cuối cùng lại xem một bộ phim truyền hình thú vị."
      }
    ]
  },
  "ko_하고_135": {
    "title": "~고 있다 / ~하고 있다 (Đang làm gì [hành động đang tiếp diễn])",
    "shortExplanation": "Vĩ tố liên kết '-고' kết hợp với trợ động từ '있다' gắn sau thân động từ để diễn tả hành động đang trong quá trình tiến hành ('đang làm...').",
    "longExplanation": "'~고 있다' (với các động từ đuôi '하다' trở thành '~하고 있다') là cấu trúc diễn tả thì hiện tại tiếp diễn cơ bản trong tiếng Hàn. Cấu trúc này gắn trực tiếp sau thân động từ để biểu đạt một hành động đang diễn ra tại thời điểm nói hoặc một trạng thái/thói quen đang tiếp diễn trong giai đoạn hiện tại, tương đương với 'đang...' trong tiếng Việt.",
    "formation": "Thân động từ + 고 있다",
    "examples": [
      {
        "translation": "Dạo này tôi đang học tiếng Hàn, vì thế tôi vẫn chưa thể nói một cách hoàn hảo được."
      },
      {
        "translation": "Bây giờ tôi đang ăn trưa, đây là khoảng thời gian nghỉ ngơi ngắn ngủi trong một ngày bận rộn."
      },
      {
        "translation": "Mẹ đang chuẩn bị bữa tối, tôi đang rất mong đợi được thưởng thức những món ăn ngon."
      },
      {
        "translation": "Chú cún con của chúng tôi đang đi dạo ở bên ngoài, bằng cách này nó duy trì được sức khỏe thông qua vận động."
      }
    ]
  },
  "ko_하고_136": {
    "title": "~고 나서 / ~하고 나서 (Sau khi làm xong... rồi thì...)",
    "shortExplanation": "Gắn sau thân động từ để nhấn mạnh việc hoàn thành trọn vẹn hành động vế trước rồi mới tiến hành hành động vế sau ('sau khi làm... xong thì...').",
    "longExplanation": "'~고 나서' kết hợp sau thân động từ để chỉ trình tự thời gian dứt khoát giữa hai hành động. Nó nhấn mạnh rằng hành động ở vế trước phải được hoàn thành một cách trọn vẹn, dứt điểm rồi hành động ở vế sau mới bắt đầu diễn ra. Tương đương với 'sau khi làm xong... thì...', 'làm... xong rồi mới...' trong tiếng Việt.",
    "formation": "Thân động từ + 고 나서",
    "examples": [
      {
        "translation": "Sau khi học xong tôi sẽ đi chơi, vì thế tôi phải quản lý thời gian thật tốt."
      },
      {
        "translation": "Sau khi ăn bữa sáng xong tôi mới tập thể dục, làm như vậy thì có thể bắt đầu một ngày mới đầy tràn trề năng lượng."
      },
      {
        "translation": "Sau khi làm xong hết bài tập về nhà thì tôi đã đi xem phim cùng bạn bè, vì thế chúng tôi đã có khoảng thời gian rất vui vẻ."
      },
      {
        "translation": "Sau khi kết thúc cuộc họp xong tôi mới ăn trưa, lúc đó vì đói bụng quá nên tôi đã thấy khá mệt mỏi."
      }
    ]
  },
  "ko_하고_137": {
    "title": "~고 싶다 / ~하고 싶다 (Muốn làm gì [nguyện vọng, mong muốn])",
    "shortExplanation": "Gắn sau thân động từ để bày tỏ mong muốn, ước nguyện hoặc ý định của người nói muốn thực hiện một hành động nào đó ('muốn làm...').",
    "longExplanation": "'~고 싶다' (với động từ đuôi '하다' là '~하고 싶다') là cấu trúc biểu thị nguyện vọng cơ bản trong tiếng Hàn. Khi chủ ngữ là ngôi thứ nhất (hoặc ngôi thứ hai trong câu hỏi), cấu trúc này gắn sau thân động từ để thể hiện mong ước, khát khao của bản thân, tương đương với 'muốn...' trong tiếng Việt. Khi muốn diễn tả ước muốn của ngôi thứ ba, ta dùng dạng chuyển tiếp '~고 싶어하다'.",
    "formation": "Thân động từ + 고 싶다",
    "examples": [
      {
        "translation": "Tôi muốn nói tiếng Hàn một cách lưu loát, vì thế ngày nào tôi cũng chăm chỉ học tập."
      },
      {
        "translation": "Tôi rất muốn đi xem buổi hòa nhạc của ca sĩ mà mình yêu thích nhất, thế nhưng thật khó để mua được vé."
      },
      {
        "translation": "Tôi muốn tập thể dục nhiều hơn, nhưng vì quá bận rộn nên không có thời gian."
      },
      {
        "translation": "Tôi muốn học nấu ăn, vì thế tôi đang cân nhắc việc đăng ký một lớp học nấu ăn."
      }
    ]
  },
  "ko_하기로_138": {
    "title": "~기로 하다 / ~하기로 하다 (Quyết định làm gì, hẹn nhau làm gì)",
    "shortExplanation": "Gắn sau thân động từ để biểu thị việc đưa ra quyết định, kế hoạch hoặc hẹn ước cùng nhau thực hiện một hành vi ('quyết định làm...', 'thống nhất làm...').",
    "longExplanation": "'~기로 하다' là cấu trúc biểu thị sự quyết định hoặc cam kết hành động, được tạo thành từ vĩ tố danh từ hóa '-기', trợ từ phương thức '-로' và động từ '하다'. Thường dùng ở dạng quá khứ '~기로 했다' để biểu thị rằng bản thân hoặc một tập thể đã thảo luận, đồng thuận và đưa ra quyết định sẽ thực hiện một việc gì đó trong tương lai.",
    "formation": "Thân động từ + 기로 하다 (결정하다)",
    "examples": [
      {
        "translation": "Chúng tôi đã quyết định đi nghỉ phép. Cuối tuần chúng tôi quyết định đi ra bãi biển để nghỉ ngơi thư giãn."
      },
      {
        "translation": "Tôi đã quyết định xem phim. Tối nay tôi quyết định ở nhà xem phim bộ Mỹ."
      },
      {
        "translation": "Cô ấy đã quyết định học tiếng Hàn. Năm nay cô ấy quyết định tham gia một khóa học tiếng Hàn."
      },
      {
        "translation": "Công ty đã quyết định trao tiền thưởng cho nhân viên. Các chủ doanh nghiệp đã quyết định tăng lương cho nhân viên vào năm tới."
      }
    ]
  },
  "ko_하기는_139": {
    "title": "~기는 하다 / ~하기는 하다 (Làm thì có làm thật đấy nhưng...)",
    "shortExplanation": "Gắn sau thân động từ hoặc tính từ để thừa nhận một sự thật ở mức độ nhất định, nhưng vế sau lập tức nêu ra hạn chế hoặc điểm chưa trọn vẹn ('thì có... thật nhưng...').",
    "longExplanation": "'~기는 하다' (với động từ đuôi '하다' là '~하기는 하다') bao gồm vĩ tố danh từ hóa '-기', trợ từ đối chiếu '-는' và trợ động từ '하다'. Cấu trúc này dùng để công nhận hoặc thừa nhận thực tế rằng bản thân có thực hiện hành động đó (hoặc trạng thái đó có tồn tại), nhưng ngay sau đó thường đi kèm liên từ đối lập ('-지만', '-는데') để chỉ ra những hạn chế, thiếu sót hoặc điều kiện chưa đạt đến mức độ lý tưởng.",
    "formation": "Thân động từ / Thân tính từ + 기는 하다",
    "examples": [
      {
        "translation": "Nấu ăn thì tôi có nấu đấy, nhưng không phải là nấu ngon đâu."
      },
      {
        "translation": "Lái xe thì anh ấy có lái đấy, nhưng không hề lái xe an toàn chút nào."
      },
      {
        "translation": "Mẹ tôi hiểu tiếng Anh thì có hiểu đấy, nhưng việc nói thì lại thấy khá khó khăn."
      },
      {
        "translation": "Tập thể dục thì tôi có tập đấy, nhưng không tập một cách đều đặn thường xuyên."
      }
    ]
  },
  "ko_하기보다_140": {
    "title": "~기보다 / ~하기보다 (So với việc làm... thì thà... hơn, thay vì...)",
    "shortExplanation": "Gắn sau thân động từ để so sánh hai sự lựa chọn, diễn tả ý thà chọn hành động khác còn hơn là làm hành động này ('thay vì...', 'so với việc... thì... hơn').",
    "longExplanation": "'~기보다' (thường đi với trợ từ bổ trợ thành '~기보다는') được tạo thành từ vĩ tố danh từ hóa '-기' và trợ từ so sánh '-보다'. Cấu trúc này dùng để đặt lên bàn cân hai phương án hay hành vi khác nhau, nhằm khẳng định rằng phương án vế sau thích hợp, đúng đắn hoặc đáng ưu tiên hơn so với phương án vế trước. Tương đương với 'thay vì làm...', 'so với việc làm... thì...' trong tiếng Việt.",
    "formation": "Thân động từ + 기보다 (기보다는)",
    "examples": [
      {
        "translation": "So với việc bỏ tiền mua một chú cún con thì tôi khuyên bạn nên nhận nuôi thì hơn."
      },
      {
        "translation": "Thay vì đi taxi thì đi xe buýt sẽ rẻ hơn nhiều."
      },
      {
        "translation": "Thay vì ăn thật nhiều thì việc ăn thực phẩm có chất lượng tốt mới là điều quan trọng hơn."
      },
      {
        "translation": "Tôi nghĩ thà nói thật với bạn bè còn hơn là nói dối."
      }
    ]
  },
  "ko_하나_141": {
    "title": "하나 / ~하나 (Tuy nhiên, nhưng mà [liên từ đối lập])",
    "shortExplanation": "Liên từ hoặc vĩ tố liên kết đối lập dùng để nối hai câu hoặc hai mệnh đề có ý nghĩa tương phản, chuyển ý ('tuy nhiên', 'nhưng mà').",
    "longExplanation": "'하나' là liên từ nối mang tính văn viết hoặc sắc thái trang trọng, dùng ở đầu câu để nối với câu trước đó và biểu thị ý nghĩa tương phản, chuyển ý ('tuy nhiên', 'song', 'nhưng mà'). Nó cũng có thể xuất hiện dưới dạng vĩ tố liên kết đối lập '-으나 / -하나' (gắn sau thân động từ/tính từ) để kết nối hai mệnh đề đối lập nhau trong cùng một câu, tương tự như 'nhưng', 'tuy... nhưng...'.",
    "formation": "Mệnh đề trước + . 하나, + Mệnh đề đối lập | Thân động từ / Thân tính từ + (으)나",
    "examples": [
      {
        "translation": "Tôi cứ ngỡ công việc đó đã xong rồi, thế nhưng mọi người vẫn chưa làm xong."
      },
      {
        "translation": "Cô ấy có vẻ xinh đẹp đấy. Tuy nhiên, tính cách lại rất tệ."
      },
      {
        "translation": "Điều này có thể cảm thấy khó khăn, nhưng nếu luyện tập thì sẽ trở nên dễ dàng thôi."
      },
      {
        "translation": "Chúng tôi phải trở về nhà, ngặt nỗi không có xe nên đã phải đi bộ."
      }
    ]
  },
  "ko_하면_142": {
    "title": "~하면 할수록 (Càng... thì càng...)",
    "shortExplanation": "Biểu thị sự biến đổi theo tỷ lệ thuận hoặc nghịch giữa hai vế; mức độ của hành động hoặc trạng thái ở vế trước càng tăng thì kết quả ở vế sau càng tăng theo ('càng... thì càng...').",
    "longExplanation": "'~하면 할수록' (dạng đầy đủ là '-(으)면 -(으)ㄹ수록') là cấu trúc ngữ pháp dùng để diễn tả mối quan hệ tỷ lệ giữa hai sự việc: khi hành động hoặc mức độ của trạng thái ở vế trước càng tiến triển hay tăng thêm, thì hành động hoặc trạng thái ở vế sau cũng thay đổi tương ứng theo chiều hướng đó, tương đương với cấu trúc 'càng... càng...' trong tiếng Việt. Khi dùng, có thể giản lược vế đầu '-(으)면' chỉ còn '-(으)ㄹ수록'.",
    "formation": "Thân động từ / Thân tính từ + -(으)면 + Thân động từ / Thân tính từ + -(으)ㄹ수록 (hoặc Danh từ + -(이)면 -(이)ㄹ수록)",
    "examples": [
      {
        "translation": "Tôi cảm thấy càng học tiếng Hàn thì lại càng thấy thú vị hơn, bởi vì tôi có thể hiểu sâu hơn về văn hóa và lịch sử của Hàn Quốc."
      },
      {
        "translation": "Ở trong ngôi nhà này, càng đọc sách tôi lại càng tích lũy được nhiều kiến thức nên lúc nào tôi cũng thích đọc sách."
      },
      {
        "translation": "Càng nấu nướng thì tôi càng có thêm tự tin, vì vậy tôi luôn thử nghiệm những công thức nấu ăn mới."
      },
      {
        "translation": "Dường như càng dành thời gian ở bên cô ấy thì tôi lại càng yêu cô ấy nhiều hơn, bởi vì tính cách của cô ấy thực sự rất cuốn hút."
      }
    ]
  },
  "ko_Expressing_0": {
    "title": "Diễn tả nguyên nhân / lý do (~(으)니까 / -아/어서 / -(으)니)",
    "shortExplanation": "Các vĩ tố liên kết dùng để nối kết hai mệnh đề nhằm biểu thị nguyên nhân, lý do dẫn đến kết quả ở mệnh đề sau ('vì... nên...', 'do...').",
    "longExplanation": "Trong tiếng Hàn, các cấu trúc vĩ tố liên kết như '~니까/(으)니까', '-아/어서', và '-(으)니' là các hình thức cơ bản nhất để diễn đạt nguyên nhân hoặc căn cứ dẫn đến sự việc ở mệnh đề sau, tương đương với 'vì', 'do', 'bởi vì' trong tiếng Việt. Trong đó, '-아/어서' dùng cho lý do khách quan và không đi cùng câu mệnh lệnh hay rủ rê; còn '-(으)니까' thường nhấn mạnh lý do chủ quan của người nói và có thể kết hợp thoải mái với đuôi câu mệnh lệnh, thỉnh dụ; '-(으)니' mang sắc thái văn phong trang trọng, gợi mở lý do.",
    "formation": "Thân động từ / Thân tính từ + -(으)니까 / -아/어서 / -(으)니 | Danh từ + -(이)니까 / -(이)라서 / -(이)니",
    "examples": [
      {
        "translation": "Vì anh ấy lúc nào cũng học hành chăm chỉ nên tôi nghĩ cậu ấy sẽ dễ dàng vượt qua kỳ thi TOPIK."
      },
      {
        "translation": "Tôi đã rất muốn đi du lịch, nhưng vì không có tiền nên không thể đi được."
      },
      {
        "translation": "Anh ấy đã xin nghỉ ốm nên không đến công ty rồi."
      },
      {
        "translation": "Vì trời mưa nên tôi đã hủy việc ra ngoài."
      }
    ]
  },
  "ko_남짓_1": {
    "title": "~남짓 (Hơn... một chút, xấp xỉ, tầm khoảng)",
    "shortExplanation": "Gắn sau từ chỉ số lượng, thời gian hoặc cự ly để biểu thị con số ước chừng nhỉnh hơn một chút hoặc xấp xỉ mức đó ('hơn... một chút', 'khoảng chừng').",
    "longExplanation": "'~남짓' là một từ biểu thị ước lượng số lượng (hậu tố hoặc danh từ phụ thuộc) gắn trực tiếp sau các danh từ chỉ số đếm, thời gian, khoảng cách hay tiền bạc, dùng để chỉ số lượng thực tế hơi vượt quá mức chuẩn đó một chút hoặc xấp xỉ mức độ được nêu ra, tương đương với 'khoảng chừng hơn... một chút', 'tầm...'. Thường dùng khi đưa ra con số phỏng đoán chứ không phải số liệu chính xác tuyệt đối.",
    "formation": "Từ chỉ số lượng / thời gian / tiền bạc + 남짓",
    "examples": [
      {
        "translation": "Tôi đã mất khoảng một tuần hơn một chút để đọc xong cuốn sách này."
      },
      {
        "translation": "Trong chuyến du lịch lần này tôi đã tiêu khoảng hơn 100.000 won một chút."
      },
      {
        "translation": "Có vẻ như bọn trẻ chỉ mất khoảng tầm 10 phút hơn một chút là đã đến trường."
      },
      {
        "translation": "Đi bộ từ công ty về nhà mất khoảng hơn một tiếng đồng hồ một chút."
      }
    ]
  },
  "ko_내내_2": {
    "title": "~내내 (Suốt, trong suốt)",
    "shortExplanation": "Gắn sau danh từ chỉ khoảng thời gian để biểu thị một hành động hoặc trạng thái diễn ra liên tục, không dứt từ đầu đến cuối ('suốt', 'trong suốt').",
    "longExplanation": "'~내내' là phó từ hoặc từ bổ trợ gắn trực tiếp sau danh từ chỉ thời gian (như 하루, 일주일, 일 년, 방학, 수업), diễn tả một sự việc, hành động hay trạng thái nào đó kéo dài liên tục, xuyên suốt từ đầu tới cuối toàn bộ khoảng thời gian được nhắc tới mà không hề bị gián đoạn, tương đương với 'suốt', 'trong suốt cả...' trong tiếng Việt.",
    "formation": "Danh từ chỉ thời gian + 내내",
    "examples": [
      {
        "translation": "Ở trường, chúng tôi đã phải lắng nghe thầy giáo giảng giải trong suốt cả tiết học."
      },
      {
        "translation": "Ngày hôm đó trời mưa suốt cả ngày nên nếu không có ô thì không thể nào ra ngoài được."
      },
      {
        "translation": "Kỳ nghỉ hè, chúng tôi đã vui chơi ở bãi biển suốt cả một ngày."
      },
      {
        "translation": "Trong đám cưới của mình, anh ấy đã khiêu vũ suốt cả đêm."
      }
    ]
  },
  "ko_네요_3": {
    "title": "~네요 (Ồ... quá, thế cơ à - Thể hiện sự ngạc nhiên, cảm thán)",
    "shortExplanation": "Vĩ tố kết thúc câu dùng để bộc lộ cảm thán, ngạc nhiên hoặc nhận thức mới mẻ của người nói ngay tại thời điểm chứng kiến sự việc ('...quá', '...thế nhỉ').",
    "longExplanation": "'~네요' là vĩ tố kết thúc câu thân mật lịch sự gắn sau thân động từ hoặc tính từ, dùng để biểu lộ cảm xúc ngạc nhiên, sự cảm thán hoặc điều tâm đắc mà người nói vừa mới trực tiếp mắt thấy, tai nghe hay trải nghiệm được tại hiện trường. Cấu trúc này làm cho lời nói thêm phần tự nhiên, bộc lộ sự thấu hiểu hay đồng cảm nhẹ nhàng với đối phương.",
    "formation": "Thân động từ / Thân tính từ + 네요 | Danh từ + (이)네요",
    "examples": [
      {
        "translation": "Hôm nay thời tiết đẹp thật đấy, ánh nắng ấm áp làm tâm trạng tôi thấy tốt hơn hẳn."
      },
      {
        "translation": "Chiếc bánh kem này ngon quá, đây là lần đầu tiên tôi ăn thử loại bánh này đấy."
      },
      {
        "translation": "Con chúng ta lớn nhanh thật đấy, trong quá trình lớn khôn bé đang học hỏi được bao nhiêu điều."
      },
      {
        "translation": "Đột nhiên trời lại đổ mưa thế này, tôi không mang theo ô nên chẳng thể nào tránh mưa được."
      }
    ]
  },
  "ko_노릇이다_4": {
    "title": "~노릇이다 (Đóng vai trò là, làm phận... / Thật là tình cảnh...)",
    "shortExplanation": "Biểu thị việc đảm nhận một vai trò, phận sự bất đắc dĩ của ai đó hoặc diễn tả một tình cảnh éo le, khó xử ('đóng vai trò là...', 'làm phận...').",
    "longExplanation": "'~노릇이다' kết hợp từ danh từ '노릇' (vai trò, phận sự, công việc, tình cảnh) với trợ từ vị ngữ '이다'. Cấu trúc này thường dùng trong hai trường hợp chính: (1) một người hay sự vật phải đứng ra gánh vác, đảm nhiệm vai trò hay bổn phận vốn không phải của mình một cách bất đắc dĩ hoặc tạm thời (như 'bố 노릇', 'thầy giáo 노릇'); (2) đi sau định ngữ để than thở về một tình huống éo le, kỳ quặc hay đáng thương ('thật là tình cảnh...').",
    "formation": "Danh từ (Vai trò, chức danh) + 노릇이다 (hoặc 노릇을 하다)",
    "examples": [
      {
        "translation": "Hôm nay vì thầy giáo bị ốm nên tôi sẽ đóng vai trò là thầy giáo thay thế."
      },
      {
        "translation": "Bố đi công tác vắng nhà nên mẹ phải gánh luôn cả vai trò của bố."
      },
      {
        "translation": "Cuốn tạp chí này đóng vai trò như một quyển sách hướng dẫn du lịch."
      },
      {
        "translation": "Cô ấy nghĩ rằng việc đóng vai trò một người chị thì tốt hơn là chỉ làm bạn bè."
      }
    ]
  },
  "ko_느라고_5": {
    "title": "~느라고 (Vì mải làm gì nên... - Dẫn đến kết quả tiêu cực)",
    "shortExplanation": "Vĩ tố liên kết chỉ nguyên nhân: do mải mê hoặc dồn hết thời gian làm hành động ở vế trước nên dẫn đến kết quả tiêu cực, bất lợi ở vế sau ('vì mải...', 'do bận...').",
    "longExplanation": "'~느라고' là vĩ tố liên kết gắn sau thân động từ, dùng để diễn tả rằng chủ ngữ đã tiêu tốn toàn bộ thời gian, sức lực vào hành động phía trước, dẫn đến việc không thể làm được việc khác hoặc gây ra một hậu quả ngoài ý muốn, mệt mỏi, bất tiện ở vế sau. Hai mệnh đề phải có cùng một chủ ngữ, và động từ ở vế trước phải là hành động có chủ ý của con người.",
    "formation": "Thân động từ + 느라고 (hoặc 느라)",
    "examples": [
      {
        "translation": "Tôi vì mải chuẩn bị cho kỳ thi TOPIK nên đã thức học bài đến tận rạng sáng."
      },
      {
        "translation": "Chúng tôi vì mải hoàn thành dự án mà suốt hai ngày qua gần như không hề chợp mắt."
      },
      {
        "translation": "Cậu ấy vì mải chuẩn bị cho cuộc thi nên đã bỏ cả bữa ăn."
      },
      {
        "translation": "Mẹ đã phải làm việc vất vả đến tận đêm khuya để lo cho tôi được học đại học."
      }
    ]
  },
  "ko_는데다가_6": {
    "title": "~는데다가 (Không những... mà lại còn, đã thế lại thêm...)",
    "shortExplanation": "Biểu thị sự cộng dồn thông tin tương đồng: sự việc ở vế trước đã xảy ra, vế sau lại có thêm một đặc điểm hay tình huống tương tự bổ sung vào ('không những... mà còn...').",
    "longExplanation": "'~는데다가' là cấu trúc liên kết kết hợp định ngữ với danh từ phụ thuộc '데' và trợ từ '다가'. Cấu trúc này dùng để diễn đạt ý rằng ngoài tình huống, trạng thái đã được nêu ở vế trước, lại còn có thêm một tình huống hay yếu tố khác cùng chiều hướng (cùng là điểm tốt hoặc cùng là điểm xấu) chồng chất thêm vào, tương đương với 'không những... mà còn...', 'đã vậy lại còn...'.",
    "formation": "Thân động từ + 는데다가 | Thân tính từ + -(으)ㄴ데다가 | Danh từ + 인데다가",
    "examples": [
      {
        "translation": "Thành tích học tập của cậu ấy không những xuất sắc mà năng khiếu thể thao cũng vô cùng nổi bật."
      },
      {
        "translation": "Hôm nay trong người tôi không được khỏe, đã thế thời tiết lại còn rất lạnh nữa."
      },
      {
        "translation": "Quán cà phê đó không những có không gian đẹp mà hương vị cà phê cũng vô cùng tuyệt vời."
      },
      {
        "translation": "Có tầm nhìn rộng mở vốn đã là một ưu điểm, cậu ấy lại còn nói tiếng Hàn rất giỏi nữa."
      }
    ]
  },
  "ko_는측에서_7": {
    "title": "~는 측에서 (Dưới góc độ của, đứng về phía...)",
    "shortExplanation": "Dùng để nêu ra lập trường, quan điểm hoặc góc nhìn cụ thể của một đối tượng khi xem xét, đánh giá vấn đề ('dưới góc độ của...', 'về phía...').",
    "longExplanation": "'~는 측에서' (hoặc 'Danh từ + 의 측에서') kết hợp danh từ '측' (phía, bề, phương diện) với trợ từ vị trí/xuất xứ '에서'. Cấu trúc này thường đi kèm với các động từ nhận thức như '볼 때' (khi nhìn nhận) hay '본다면' (nếu xét từ) để nêu rõ góc nhìn, lập trường riêng biệt của một cá nhân, nhóm người hoặc góc độ chuyên môn khi nhận định, bình phẩm về một hiện tượng hay tình huống nào đó.",
    "formation": "Danh từ + (의) 측에서 (볼 때 / 본다면)",
    "examples": [
      {
        "translation": "Đứng từ góc độ của các em học sinh mà nhìn thì bài tập về nhà quá nhiều tạo nên một áp lực nặng nề."
      },
      {
        "translation": "Dưới góc độ của các nhà kinh tế học, tiền kỹ thuật số có thể gây ảnh hưởng sâu sắc đến nền kinh tế thực."
      },
      {
        "translation": "Nếu nhìn từ góc độ của bác sĩ thì món gà rán có thể mang lại tác hại xấu cho sức khỏe."
      },
      {
        "translation": "Nếu xét từ góc nhìn của một người mẹ thì đứa con của mình lúc nào cũng là tuyệt vời nhất."
      }
    ]
  },
  "ko_더라도_8": {
    "title": "~더라도 (Dù cho, dẫu cho... thì cũng...)",
    "shortExplanation": "Vĩ tố liên kết nhượng bộ giả định: dù cho tình huống ở vế trước có xảy ra đi chăng nữa thì kết quả hay quyết định ở vế sau vẫn không thay đổi ('dù cho... thì cũng...').",
    "longExplanation": "'~더라도' là vĩ tố liên kết dùng để giả định một điều kiện mang tính nhượng bộ mạnh mẽ. Cấu trúc này mang ý nghĩa rằng cho dù có công nhận sự thật hoặc khả năng xảy ra của tình huống vế trước, thậm chí là ở mức độ cực đoan nhất, thì nội dung, kết luận hoặc hành động ở vế sau vẫn được giữ nguyên và không hề bị lay chuyển, tương đương với 'dù cho... thì...', 'cho dẫu...'. Mang sắc thái giả định mạnh hơn '-아/어도'.",
    "formation": "Thân động từ / Thân tính từ + 더라도 | Danh từ + (이)더라도",
    "examples": [
      {
        "translation": "Dù cho bạn có đầu tư nhiều thời gian đến đâu đi nữa, nhưng nếu kết quả không thỏa đáng thì sẽ ra sao?"
      },
      {
        "translation": "Dù tôi có học suốt cả ngày trời nhưng nếu thi trượt thì mọi nỗ lực của tôi cũng đều hóa thành vô ích."
      },
      {
        "translation": "Dù bạn có nỗ lực nhiều đến thế nào nhưng nếu không đạt được mục tiêu đó thì cảm giác sẽ thế nào đây?"
      },
      {
        "translation": "Dù tôi có làm việc nhiều đến nhường nào mà tiền bạc vẫn không tích cóp được thì mệt mỏi lắm."
      }
    ]
  },
  "ko_다니_9": {
    "title": "~다니 (Không ngờ là... / Đến mức... cơ đấy - Bày tỏ sự sửng sốt, khó tin)",
    "shortExplanation": "Vĩ tố dùng để bộc lộ cảm xúc kinh ngạc, không ngờ tới hoặc khó tin trước một sự thật hay thông tin vừa được chứng kiến hoặc nghe thấy ('không ngờ là...', '...cơ đấy').",
    "longExplanation": "'~다니' là hình thức rút gọn của cấu trúc trích dẫn gián tiếp kết hợp với vĩ tố cảm thán '-니' ('-다고 하니' -> '-다니'). Người nói sử dụng cấu trúc này để bày tỏ sự ngạc nhiên, sửng sốt, thán phục hoặc không thể tin nổi trước một sự việc, hành vi hay tin tức vừa mới tiếp nhận, tương đương với 'không ngờ rằng...', 'ai mà tin được là... cơ chứ'.",
    "formation": "Động từ + -ㄴ/는다니 | Tính từ + -다니 | Danh từ + -(이)라니 | Quá khứ: -았/었다니",
    "examples": [
      {
        "translation": "Tôi hoàn toàn không thể tin nổi chuyện bố tôi ngày mai lại phải vội vã lên đường đi ra nước ngoài."
      },
      {
        "translation": "Cậu thật sự đã giải quyết được vấn đề nan giải thế này thì quả thực là quá đỗi kinh ngạc."
      },
      {
        "translation": "Kế hoạch ban đầu vốn dĩ sẽ thay đổi, vậy mà nghe bảo anh ấy sẽ trở thành trưởng nhóm này làm tôi không tài nào tin được."
      },
      {
        "translation": "Biết bao nhiêu người đã háo hức mong đợi, thế mà buổi biểu diễn lại bị hủy bỏ thì thật là đáng tiếc."
      }
    ]
  },
  "ko_답게_10": {
    "title": "~답게 (Xứng đáng với, đúng chất, ra dáng)",
    "shortExplanation": "Biểu thị tính chất, tư cách hoặc hành vi hoàn toàn tương xứng, đúng với bản chất và giá trị vốn có của đối tượng ('xứng đáng là...', 'đúng chất...', 'ra dáng...').",
    "longExplanation": "'~답게' được cấu tạo từ tiếp vĩ ngữ '-답다' (mang đầy đủ phẩm chất, tư cách xứng đáng với danh xưng) kết hợp với vĩ tố phó từ hóa '-게'. Cấu trúc này gắn sau danh từ để miêu tả hành động hay trạng thái diễn ra một cách chuẩn mực, đúng phong thái và giá trị tiêu biểu mà danh từ đó vốn dĩ phải có, tương đương với 'đúng chất...', 'xứng danh là...', 'ra dáng...' trong tiếng Việt.",
    "formation": "Danh từ + 답게",
    "examples": [
      {
        "translation": "Đúng chất một cầu thủ bóng đá chuyên nghiệp, anh ấy rất am hiểu cách điều khiển bóng một cách điêu luyện."
      },
      {
        "translation": "Xứng danh là một học sinh chăm học, cậu ấy đã có thể giải bài toán một cách dễ dàng."
      },
      {
        "translation": "Đúng tầm một nhà thiết kế hàng hiệu, từng chi tiết nhỏ trên trang phục của cô ấy đều được hoàn thiện một cách hoàn hảo."
      },
      {
        "translation": "Đúng phong thái một đầu bếp dày dạn kinh nghiệm, anh ấy xử lý các nguyên liệu nấu ăn một cách vô cùng nhanh nhẹn."
      }
    ]
  },
  "ko_대로_11": {
    "title": "~대로 (Theo như, đúng theo...)",
    "shortExplanation": "Biểu thị việc thực hiện hành động hoàn toàn tuân theo chỉ dẫn, quy tắc, nguyên trạng hoặc sự thật đã định sẵn ('theo như...', 'đúng theo...').",
    "longExplanation": "'~대로' có thể là một trợ từ bổ trợ gắn trực tiếp sau danh từ, hoặc là một danh từ phụ thuộc đứng sau định ngữ của động từ hay tính từ. Cấu trúc này diễn đạt ý nghĩa làm một việc gì đó y hệt, chuẩn xác theo đúng trạng thái ban đầu, theo lời dặn, quy chuẩn hoặc theo diễn biến thực tế vốn có, tương đương với 'theo như...', 'đúng theo...' trong tiếng Việt.",
    "formation": "Danh từ + 대로 | Động từ + -(으)ㄴ/는 대로",
    "examples": [
      {
        "translation": "Đúng theo chỉ dẫn là phải tập thể dục mỗi ngày, sáng nào tôi cũng thức dậy tập thể dục."
      },
      {
        "translation": "Phải vận hành máy móc đúng theo những gì đã được ghi rõ trong sách hướng dẫn."
      },
      {
        "translation": "Tôi đã chăm chỉ học tập đúng theo lời mẹ dặn dò, và nhờ thế thành tích học tập đã rất tốt."
      },
      {
        "translation": "Toàn bộ cửa sổ của tòa nhà đã được lắp đặt hoàn hảo theo đúng như bản vẽ thiết kế."
      }
    ]
  },
  "ko_던데_12": {
    "title": "~던데 (Thấy bảo là... / Tôi thấy... mà - Hồi tưởng kinh nghiệm quá khứ)",
    "shortExplanation": "Vĩ tố dùng khi hồi tưởng lại sự việc bản thân từng chứng kiến hoặc trải nghiệm trong quá khứ để làm tiền đề, bối cảnh cho câu nói tiếp theo ('tôi nhớ là...', 'thấy bảo là...').",
    "longExplanation": "'~던데' là vĩ tố liên kết (hoặc kết thúc câu) kết hợp giữa tiền vĩ tố hồi tưởng '-더-' và vĩ tố gợi mở bối cảnh '-ㄴ데'. Cấu trúc này được dùng khi người nói nhớ lại một sự thật, cảnh tượng hoặc hành vi mà chính mình đã trực tiếp trải qua trong quá khứ, rồi lấy đó làm bối cảnh gợi mở để đưa ra nhận xét, đặt câu hỏi, đưa ra lời khuyên hoặc nêu sự tương phản so với hiện tại.",
    "formation": "Thân động từ / Thân tính từ + 던데 | Danh từ + (이)던데 | Quá khứ: -았/었던데",
    "examples": [
      {
        "translation": "Nghe Cheolsu kể lại thì hồi đó cậu ấy từng là một học sinh luôn học tập rất chăm chỉ ở trường."
      },
      {
        "translation": "Tôi nhớ nhà hàng đó từng bán món ăn rất ngon miệng, nhưng dạo gần đây thì không còn như vậy nữa."
      },
      {
        "translation": "Trước kia sáng nào bố cũng chăm chỉ tập thể dục, nhưng dạo này thì bố không làm vậy nữa."
      },
      {
        "translation": "Lần đầu gặp mặt tôi thấy anh ấy rất đỗi thân thiện, thế nhưng bây giờ thì chẳng còn như vậy nữa."
      }
    ]
  },
  "ko_도록_13": {
    "title": "~도록 하다 (Cố gắng làm sao để..., hãy bảo đảm là...)",
    "shortExplanation": "Biểu thị sự quyết tâm thực hiện hành động nhằm đạt được mục tiêu, hoặc đưa ra chỉ thị, yêu cầu ai đó bảo đảm thực hiện điều gì ('cố gắng làm sao để...', 'hãy chú ý...').",
    "longExplanation": "'~도록 하다' là cấu trúc kết hợp giữa vĩ tố liên kết chỉ mục đích, kết quả '-도록' với trợ động từ '하다'. Khi chủ ngữ là ngôi thứ nhất, cấu trúc này thể hiện ý chí, lời hứa hẹn hoặc sự quyết tâm nỗ lực hết mình để đạt được một kết quả nhất định ('tôi sẽ cố gắng làm sao để...'). Khi dùng ở thể mệnh lệnh hoặc thỉnh dụ, nó mang sắc thái lịch sự yêu cầu hay nhắc nhở đối phương chú ý bảo đảm thực hiện hành động đó.",
    "formation": "Thân động từ + -(으)도록 하다",
    "examples": [
      {
        "translation": "Tôi nhất định sẽ giải quyết ổn thỏa việc này, xin mọi người đừng quá lo lắng."
      },
      {
        "translation": "Chúng tôi sẽ nỗ lực hết mình để quý khách hàng có thể cảm thấy hài lòng nhất."
      },
      {
        "translation": "Xin hãy lái xe thật chậm rãi để các em nhỏ có thể đến trường một cách an toàn."
      },
      {
        "translation": "Tôi sẽ nói thật chậm rãi để mọi người đều có thể hiểu rõ từng chi tiết."
      }
    ]
  },
  "ko_라든지_14": {
    "title": "~(이)라든지 ~(이)라든지 (Hoặc là... hoặc là..., ...hay là...)",
    "shortExplanation": "Trợ từ liệt kê dùng để đưa ra hai hay nhiều đối tượng hoặc hành động có thể lựa chọn, ngụ ý rằng chọn cái nào trong số đó cũng đều được ('hoặc là... hoặc là...', 'như là... hay là...').",
    "longExplanation": "'~(이)라든지 ~(이)라든지' là trợ từ liên kết được gắn sau danh từ (hoặc đuôi liên kết sau động từ) dùng để liệt kê các ví dụ, phương án hoặc khả năng lựa chọn khác nhau mà người nói không định trước một mục cụ thể nào, ngụ ý rằng chọn bất kỳ cái nào được nhắc tới cũng đều phù hợp hoặc chấp nhận được. Tương đương với 'hoặc là... hoặc là...', 'hay là...', 'như là... hay là...' trong tiếng Việt.",
    "formation": "Danh từ + (이)라든지 (hoặc Thân động từ / Thân tính từ + -ㄴ/는다든지)",
    "examples": [
      {
        "translation": "Tối nay tôi sẽ đặt món gì đó để ăn—chẳng hạn như pizza hay gà rán, món nào cũng được."
      },
      {
        "translation": "Bất kể thứ bạn cần là gì, dù là máy vi tính hay là sách vở, tôi đều có thể chuẩn bị được."
      },
      {
        "translation": "Tôi đang tính đi tập thể dục, chạy bộ hay là bơi lội, môn nào cũng đều tốt cả."
      },
      {
        "translation": "Người có thể giành vị trí quán quân sẽ là bạn hoặc là một ai đó khác."
      }
    ]
  },
  "ko_려고_15": {
    "title": "~(으)려고 하다 (Định, toan, có ý định làm gì)",
    "shortExplanation": "Cấu trúc biểu thị ý định, kế hoạch hoặc dự định thực hiện một hành động nào đó của chủ ngữ trong tương lai ('định...', 'toan...').",
    "longExplanation": "'-(으)려고 하다' là cấu trúc ngữ pháp thông dụng kết hợp với thân động từ để diễn tả ý chí, dự định hoặc mục đích thực hiện một hành động cụ thể nào đó của người nói hoặc chủ ngữ, tương đương với 'định', 'dự định', 'toan làm...' trong tiếng Việt. Khi gắn với vĩ tố liên kết (như '-(으)려고'), nó đóng vai trò nêu mục đích của hành động theo sau.",
    "formation": "Thân động từ kết thúc bằng nguyên âm hoặc phụ âm ㄹ + -려고 하다 | Thân động từ kết thúc bằng phụ âm (ngoài ㄹ) + -으려고 하다",
    "examples": [
      {
        "translation": "Dạo này vì đang tập trung học tiếng Hàn nên tôi thậm chí chẳng nhận ra một ngày trôi qua nhanh như thế nào."
      },
      {
        "translation": "Vì ngày mai định gặp bạn nên bây giờ tôi đang cố gắng đi ngủ thật sớm."
      },
      {
        "translation": "Anh ấy định chơi đàn ghi-ta nên từ hôm qua đã luyện tập chăm chỉ mỗi ngày."
      },
      {
        "translation": "Con trai tôi vì định thi lên đại học nên đang dồn hết tâm trí vào việc học tập."
      }
    ]
  },
  "ko_만이_16": {
    "title": "~만이 아니다 (Không chỉ, không riêng gì...)",
    "shortExplanation": "Cấu trúc biểu thị sự việc không chỉ dừng lại ở đối tượng hay lý do được nhắc tới mà còn bao hàm cả những yếu tố khác nữa ('không chỉ là...', 'không riêng gì...').",
    "longExplanation": "'~만이 아니다' (thường kết hợp với danh từ, hoặc ở dạng '-는 것만이 아니다') được dùng để khẳng định rằng một sự vật, hiện tượng hoặc nguyên nhân nào đó không phải là duy nhất, mà còn có thêm các khía cạnh hoặc đối tượng quan trọng khác cùng tham gia vào. Tương đương với cấu trúc 'không chỉ là...', 'không riêng gì...' trong tiếng Việt.",
    "formation": "Danh từ + 만이 아니다 | Thân động từ / Thân tính từ + -는/-(으)ㄴ 것만이 아니다",
    "examples": [
      {
        "translation": "Tôi không chỉ học tiếng Hàn, mà còn đang học cả tiếng Nhật và tiếng Trung nữa."
      },
      {
        "translation": "Anh ấy không chỉ là một diễn viên mà còn là một nhà biên kịch."
      },
      {
        "translation": "Kết quả tốt đẹp này không chỉ nhờ vào sự nỗ lực gian khổ, mà còn là sự kết tinh của kinh nghiệm bền bỉ."
      },
      {
        "translation": "Chúng tôi quan tâm đến kiến trúc không chỉ vì khía cạnh thẩm mỹ, mà còn do tính năng thực tiễn của nó."
      }
    ]
  },
  "ko_마련이다_17": {
    "title": "~기 마련이다 (Ắt hẳn là, tất nhiên là, là lẽ tự nhiên)",
    "shortExplanation": "Diễn tả một quy luật tất yếu của tự nhiên, cuộc sống hoặc tâm lý con người; việc gì đó tất yếu xảy ra là lẽ đương nhiên ('ắt hẳn là...', 'tất yếu sẽ...').",
    "longExplanation": "'-기 마련이다' (hoặc dạng quen thuộc '-(으)ㄴ/는 법이다/마련이다') kết hợp sau thân động từ hoặc tính từ, dùng để chỉ một chân lý hiển nhiên, một quy luật khách quan của cuộc sống hay lẽ thường tình mà sự vật, hiện tượng ắt sẽ diễn ra như thế, tương đương với 'ắt là...', 'đương nhiên là...', 'lẽ tất nhiên là thế' trong tiếng Việt.",
    "formation": "Thân động từ / Thân tính từ + -기 마련이다 (hoặc -(으)ㄴ/는 것이 마련이다)",
    "examples": [
      {
        "translation": "Dù cố gắng không bận tâm đến ánh mắt của người khác thì việc không thể làm được điều đó cũng là lẽ tự nhiên."
      },
      {
        "translation": "Việc trẻ nhỏ nô đùa nhiều là chuyện hoàn toàn đương nhiên do đặc điểm của lứa tuổi ấy."
      },
      {
        "translation": "Chỉ vì lần này thất bại thì cũng không thể chắc chắn rằng lần sau cũng sẽ thất bại, đó là lẽ thường tình."
      },
      {
        "translation": "Khi gặp chuyện khó khăn thì tâm trạng chùng xuống, buồn phiền là chuyện tất yếu."
      }
    ]
  },
  "ko_면서_18": {
    "title": "~(으)면서 (Vừa... vừa... - Hai hành động đồng thời)",
    "shortExplanation": "Vĩ tố liên kết biểu thị hai hành động hoặc trạng thái diễn ra đồng thời do cùng một chủ ngữ thực hiện ('vừa... vừa...').",
    "longExplanation": "'-(으)면서' là vĩ tố liên kết gắn sau thân động từ hoặc tính từ, dùng để nối hai mệnh đề diễn tả hai hành động hoặc trạng thái xảy ra song song, đồng thời trong cùng một khoảng thời gian. Hai mệnh đề trước và sau bắt buộc phải có cùng một chủ ngữ, tương đương với 'vừa... vừa...' trong tiếng Việt.",
    "formation": "Thân động từ kết thúc bằng nguyên âm hoặc phụ âm ㄹ + -면서 | Thân động từ kết thúc bằng phụ âm (ngoài ㄹ) + -으면서",
    "examples": [
      {
        "translation": "Tôi thích vừa nghe nhạc vừa học bài, làm như thế tôi có thể tập trung hơn."
      },
      {
        "translation": "Anh ấy vừa ăn cơm vừa xem ti vi, đó là thói quen của anh ấy."
      },
      {
        "translation": "Tôi vừa xem phim vừa ăn bữa trưa, như vậy có thể tiết kiệm được thời gian."
      },
      {
        "translation": "Tôi vừa tập thể dục vừa nghe podcast, điều đó rất có ích cho tôi."
      }
    ]
  },
  "ko_동안_19": {
    "title": "~동안 / -는 동안 (Trong khi, trong suốt khoảng thời gian)",
    "shortExplanation": "Gắn sau danh từ chỉ thời gian hoặc mệnh đề định ngữ để biểu thị khoảng thời gian mà một hành động hoặc trạng thái diễn ra ('trong khi...', 'trong suốt...').",
    "longExplanation": "'~동안' là danh từ phụ thuộc chỉ khoảng thời gian, có thể kết hợp trực tiếp sau danh từ chỉ thời gian (như 방학 동안, 3일 동안) hoặc đi kèm với thân động từ ở dạng '-는 동안' để diễn tả khoảng thời gian một hành động hoặc sự việc nào đó kéo dài hay diễn ra, tương đương với 'trong khi...', 'trong suốt thời gian...' trong tiếng Việt. Khác với '-(으)면서', hai vế của '-는 동안' có thể có hai chủ ngữ khác nhau.",
    "formation": "Danh từ chỉ thời gian + 동안 | Thân động từ + -는 동안",
    "examples": [
      {
        "translation": "Trong suốt kỳ nghỉ đông tôi đã vẽ rất nhiều tranh, bởi vì đó là sở thích của tôi."
      },
      {
        "translation": "Trong lúc tôi nấu ăn thì điện thoại cứ reo liên hồi khiến tôi không thể tập trung nấu nướng được."
      },
      {
        "translation": "Trong lúc tôi hát ở phòng karaoke thì bạn bè đều nhảy múa theo nên rất vui."
      },
      {
        "translation": "Trong khoảng thời gian cô ấy vắng nhà, trộm đã lẻn vào và lấy đi tất cả những đồ có giá trị của cô ấy."
      }
    ]
  },
  "ko_부터는_20": {
    "title": "~부터는 (Kể từ... thì, từ... trở đi thì)",
    "shortExplanation": "Kết hợp giữa trợ từ xuất phát điểm '부터' và trợ từ đối chiếu '는' để nhấn mạnh sự thay đổi, chuyển biến bắt đầu từ một mốc thời gian hoặc sự kiện ('kể từ... thì...').",
    "longExplanation": "'~부터는' là sự kết hợp giữa trợ từ '부터' (từ, bắt đầu từ) và trợ từ bổ trợ '는' (nhấn mạnh, đối chiếu). Cấu trúc này dùng để xác định một thời điểm hoặc một biến cố làm mốc khởi đầu cho một sự biến đổi, quyết tâm mới hoặc một trạng thái mới khác biệt so với trước đó, tương đương với 'kể từ... thì...', 'từ... trở đi thì...' trong tiếng Việt.",
    "formation": "Danh từ (thời gian / sự kiện) + 부터는 | Thân động từ + -(으)ㄴ 후부터는",
    "examples": [
      {
        "translation": "Kể từ hôm nay tôi đã quyết định chú ý đến sức khỏe hơn một chút. Vì vậy, mỗi sáng tôi đều định sẽ chạy bộ."
      },
      {
        "translation": "Kể từ sau khi vụ việc này xảy ra, mọi thứ đã hoàn toàn thay đổi. Mọi người sau khi biết sự thật này đã trở nên cẩn trọng hơn một chút."
      },
      {
        "translation": "Kể từ năm ngoái chúng tôi đã quyết định tiết kiệm hơn số tiền mình kiếm được. Do đó, chúng tôi đang hết sức nỗ lực để cắt giảm những chi phí không cần thiết."
      },
      {
        "translation": "Kể từ sau khi đọc bản báo cáo này, tôi đã có thể hiểu rõ hơn về tình hình. Thật kỳ lạ là những phần trước đây tôi không thể hiểu nổi thì nay bỗng nhiên lại trở nên rất hợp lý."
      }
    ]
  },
  "ko_서야_21": {
    "title": "~아/어서야 (Mãi cho đến khi... mới..., chỉ sau khi... mới...)",
    "shortExplanation": "Vĩ tố liên kết nhấn mạnh rằng phải hoàn thành điều kiện hay hành động ở vế trước thì kết quả hay hành động ở vế sau mới có thể xảy ra ('chỉ sau khi... mới...', 'mãi tới khi... mới...').",
    "longExplanation": "'-아/어서야' là vĩ tố liên kết kết hợp giữa '-아/어서' và trợ từ nhấn mạnh '야'. Nó nhấn mạnh tính tiên quyết hoặc trình tự thời gian kéo dài của hành động trước: chỉ sau khi đã trải qua hoặc đáp ứng được điều kiện khắt khe ở vế trước thì mới có thể đạt được kết quả hoặc nhận ra điều gì ở vế sau, tương đương với 'mãi sau khi... mới...', 'chỉ khi... mới có thể...' trong tiếng Việt.",
    "formation": "Thân động từ kết thúc bằng nguyên âm ㅏ, ㅗ + -아서야 | Thân động từ kết thúc bằng các nguyên âm khác + -어서야 | Động từ 하다 chuyển thành 해서야",
    "examples": [
      {
        "translation": "Phải đọc hết toàn bộ cuốn sách của tôi thì bạn mới có thể hiểu được; không phải đọc lướt qua mà phải xem xét tỉ mỉ từng câu, từng chữ một."
      },
      {
        "translation": "Chỉ khi đã rơi vào lưới tình thì người ta mới nhìn thấy rõ những ưu khuyết điểm của đối phương. Đôi khi sự mù quáng trong tình yêu có thể khiến bạn bỏ qua những khuyết điểm của họ."
      },
      {
        "translation": "Để công việc kinh doanh này thành công, bạn phải lập kế hoạch thật chu toàn thì mới làm được. Tôi nghĩ kỳ vọng thành công mà không có kế hoạch là điều vô cùng thiếu thực tế."
      },
      {
        "translation": "Vì đây là tình huống chưa từng có ai trải qua nên quả là nan giải, nhưng chỉ khi đích thân trải nghiệm tình huống đó thì ta mới biết được cách ứng phó chính xác."
      }
    ]
  },
  "ko_소문에는_22": {
    "title": "~소문에는 (Theo lời đồn thì, nghe đồn rằng...)",
    "shortExplanation": "Cụm danh từ dùng để truyền đạt lại tin đồn hoặc thông tin nghe ngóng từ người khác mà chưa được kiểm chứng xác thực ('theo lời đồn thì...', 'nghe đồn là...').",
    "longExplanation": "'~소문에는' (thường đi với 'danh từ + 에 대한 소문에는' hoặc đứng đầu câu '소문에는') bao gồm danh từ '소문' (lời đồn) kết hợp với trợ từ vị trí '에' và trợ từ bổ trợ '는'. Cấu trúc này dùng để mở đầu khi dẫn lại tin đồn, chuyện bàn tán trong dư luận mà người nói nghe được từ bên ngoài chứ không phải phát ngôn xuất phát từ quan điểm cá nhân, thường đi kèm với đuôi gián tiếp như '-ㄴ/는다고 하다' hoặc '들었다'.",
    "formation": "Danh từ + (에 대한) 소문에는 | 소문에는 + Mệnh đề gián tiếp (-ㄴ/는다고 하다 / 들었다)",
    "examples": [
      {
        "translation": "Theo lời đồn thì tôi nghe nói công ty đó sắp sửa bị phá sản."
      },
      {
        "translation": "Theo những lời đồn thổi về thành công của anh ấy thì nghe đâu anh ấy làm việc tới 18 tiếng mỗi ngày."
      },
      {
        "translation": "Theo lời đồn về việc cô ấy trở nên nổi tiếng thì nghe nói năm sau cô ấy sẽ tham gia một bộ phim Hollywood."
      },
      {
        "translation": "Theo những tin đồn xung quanh độ nổi tiếng của ca sĩ Im Jae-beom dạo này thì có tin anh ấy dự định sẽ phát hành album mới sớm hơn."
      }
    ]
  },
  "ko_아어_23": {
    "title": "~아/어 보이다 (Trông có vẻ, nhìn dường như)",
    "shortExplanation": "Cấu trúc gắn sau thân tính từ biểu thị sự phán đoán hoặc cảm nhận bằng thị giác của người nói về bề ngoài của một đối tượng ('trông có vẻ...', 'nhìn...').",
    "longExplanation": "'-아/어 보이다' là cấu trúc bổ trợ kết hợp với thân tính từ, dùng để diễn tả nhận định, đánh giá mang tính trực quan của người nói dựa trên vẻ ngoài hoặc biểu hiện bên ngoài của đối tượng được quan sát. Tương đương với 'trông có vẻ...', 'nhìn có vẻ...' trong tiếng Việt.",
    "formation": "Thân tính từ kết thúc bằng nguyên âm ㅏ, ㅗ + -아 보이다 | Thân tính từ kết thúc bằng các nguyên âm khác + -어 보이다 | Tính từ đuôi 하다 chuyển thành 해 보이다",
    "examples": [
      {
        "translation": "Người đàn ông đó trông thật đáng thương, có lẽ anh ấy đang phải trải qua một giai đoạn khó khăn."
      },
      {
        "translation": "Hôm nay trông bạn có vẻ mệt mỏi đấy, hay là bạn nghỉ ngơi sớm một chút đi?"
      },
      {
        "translation": "Trông cô ấy có vẻ rất hạnh phúc, chắc là vừa có chuyện gì tốt lành xảy ra với cô ấy rồi."
      },
      {
        "translation": "Món ăn này trông ngon mắt quá, ngày mai tôi sẽ rủ bạn bè cùng đến ăn thử xem sao."
      }
    ]
  },
  "ko_아어야지_24": {
    "title": "~아/어야지 (Phải... thôi, định bụng sẽ... - Tự nhủ và quyết tâm)",
    "shortExplanation": "Vĩ tố kết thúc câu thân mật dùng để thể hiện quyết tâm, ý chí hoặc lời tự nhủ của người nói rằng mình nên hoặc phải làm việc gì ('phải... thôi', 'định bụng sẽ...').",
    "longExplanation": "'-아/어야지' là vĩ tố kết thúc câu (ở thể thân mật hoặc độc thoại) gắn sau thân động từ, dùng khi người nói tự nhắc nhở bản thân, biểu thị quyết tâm hay ý chí mạnh mẽ thực hiện một việc gì đó mà mình cảm thấy cần phải làm. Ngoài ra, trong ngữ cảnh đối thoại nó cũng có thể dùng để khuyên nhủ hoặc giục giã đối phương một cách nhẹ nhàng.",
    "formation": "Thân động từ kết thúc bằng nguyên âm ㅏ, ㅗ + -아야지 | Thân động từ kết thúc bằng các nguyên âm khác + -어야지 | Động từ 하다 chuyển thành 해야지",
    "examples": [
      {
        "translation": "Muộn quá rồi, giờ tôi phải về nhà thôi."
      },
      {
        "translation": "Lần này tôi nhất định phải giảm cân thật nghiêm túc thôi."
      },
      {
        "translation": "Ngày mai tôi phải dậy sớm để tập thể dục thôi."
      },
      {
        "translation": "Bài tập chất đống rồi, từ bây giờ tôi phải học hành thật chăm chỉ thôi."
      }
    ]
  },
  "ko_았었다_25": {
    "title": "~았/었다 치다 (Coi như là, giả sử là đã...)",
    "shortExplanation": "Cấu trúc dùng để đưa ra một tình huống giả định hoặc coi như một sự việc trong quá khứ hoặc hiện tại đã xảy ra nhằm thảo luận về kết quả ('giả sử là...', 'coi như là...').",
    "longExplanation": "'~았/었다 치다' (thường gặp ở dạng liên kết như '-았/었다 치면', '-았/었다 치고') kết hợp sau thân động từ hoặc tính từ, dùng để đặt ra một giả định coi như sự việc, hành động hay trạng thái nào đó đã hoàn thành hoặc có thật, từ đó suy đoán hoặc xem xét diễn biến tiếp theo. Tương đương với 'cho là...', 'giả sử là đã...', 'coi như là...' trong tiếng Việt.",
    "formation": "Thân động từ / Thân tính từ + -았/었다 치다 (hoặc -았/었다 치면, -았/었다 치고)",
    "examples": [
      {
        "translation": "Giả sử lúc đó chúng ta có nhiều tiền đi, liệu ta có thể đi du lịch châu Âu được không?"
      },
      {
        "translation": "Cứ cho là anh ấy đã ở trong đội của chúng ta đi, bạn có nghĩ rằng chúng ta đã có thể chiến thắng không?"
      },
      {
        "translation": "Giả sử như lúc đó không có cô ấy ở đó, thì chúng ta đã xử lý công việc ấy thế nào đây?"
      },
      {
        "translation": "Cứ cho là dạo này trời mưa nhiều đi, thì các hoạt động ngoài trời sẽ bị ảnh hưởng ra sao?"
      }
    ]
  },
  "ko_았었던_26": {
    "title": "~았/었던 것 같다 (Hình như đã, dường như hồi đó đã...)",
    "shortExplanation": "Biểu thị sự phỏng đoán hoặc hồi tưởng lại một trạng thái, sự việc đã từng xảy ra trong quá khứ một cách mơ hồ, không hoàn toàn chắc chắn ('hình như đã...', 'dường như từng...').",
    "longExplanation": "'-았/었던 것 같다' kết hợp giữa hình thức hồi tưởng quá khứ gián đoạn '-았/었던' và cấu trúc suy đoán '- 것 같다'. Dùng khi người nói hồi tưởng về một sự việc, cảm xúc hoặc trạng thái trong quá khứ mà trí nhớ không còn tuyệt đối rõ ràng hoặc muốn diễn đạt phán đoán quá khứ một cách khiêm tốn, dè dặt, tương đương với 'hình như ngày trước đã...', 'dường như từng...' trong tiếng Việt.",
    "formation": "Thân động từ / Thân tính từ + -았/었던 것 같다",
    "examples": [
      {
        "translation": "Hồi đó cô ấy dường như đã rất hạnh phúc, lúc nào cô ấy cũng nở nụ cười."
      },
      {
        "translation": "Ngày hôm đó hình như tôi đã nghe một bài hát mà mình chưa từng nghe bao giờ, giai điệu ấy đến giờ vẫn còn vang vọng trong đầu tôi."
      },
      {
        "translation": "Tôi dường như đã từng ghé thăm nơi này từ rất lâu về trước rồi thì phải, những tòa nhà trông quen thuộc quá."
      },
      {
        "translation": "Hình như tôi đã cứ ngỡ hôm nay là Chủ nhật, nhưng thực ra lại là thứ Bảy."
      }
    ]
  },
  "ko_았었어야_27": {
    "title": "~았/었어야 했다 (Đáng lẽ phải... - Hối tiếc về quá khứ)",
    "shortExplanation": "Cấu trúc biểu thị sự hối tiếc, ân hận hoặc trách móc về một việc đáng lẽ ra nên làm trong quá khứ nhưng thực tế đã không làm ('đáng lẽ phải...', 'lẽ ra nên...').",
    "longExplanation": "'-았/었어야 했다' gắn sau thân động từ, dùng để biểu đạt sự nuối tiếc muộn màng, cảm giác ân hận của người nói hoặc sự trách móc đối phương vì đã không thực hiện một nghĩa vụ, hành động đúng đắn nào đó trong quá khứ. Ngược lại, dạng phủ định '-지 말았어야 했다' mang nghĩa 'đáng lẽ không nên làm...'. Tương đương với 'đáng lẽ phải...', 'lẽ ra nên...' trong tiếng Việt.",
    "formation": "Thân động từ kết thúc bằng nguyên âm ㅏ, ㅗ + -았어야 했다 | Thân động từ kết thúc bằng các nguyên âm khác + -었어야 했다 | Động từ 하다 chuyển thành 했어야 했다 (Dạng phủ định: Thân động từ + -지 말았어야 했다)",
    "examples": [
      {
        "translation": "Bây giờ mới nói xin lỗi thì đã muộn rồi, đáng lẽ ngay từ đầu bạn phải thừa nhận lỗi lầm của mình."
      },
      {
        "translation": "Trước khi nghe câu chuyện đó, đáng lẽ bạn nên tin tưởng tôi."
      },
      {
        "translation": "Đáng lẽ tôi không nên nộp đơn vào công ty đó, những trải nghiệm ở đó chẳng tốt lành gì cho tôi cả."
      },
      {
        "translation": "Đáng lẽ chúng ta phải xuất phát sớm hơn, như thế thì có thể tham quan được nhiều điểm du lịch hơn bây giờ rồi."
      }
    ]
  },
  "ko_어아_28": {
    "title": "~아/어 가다 (Dần dần tiến tới, tiếp diễn hướng về tương lai)",
    "shortExplanation": "Trợ động từ gắn sau thân động từ biểu thị một hành động hoặc trạng thái đang dần dần tiếp diễn và phát triển từ hiện tại hướng về tương lai ('dần dần...', 'ngày càng...').",
    "longExplanation": "'-아/어 가다' là cấu trúc kết hợp giữa thân động từ và trợ động từ '가다' (đi). Nó dùng để diễn tả một hành động hay sự biến đổi của trạng thái đang liên tục tiến triển từ quá khứ hoặc hiện tại hướng dần đến tương lai, mang sắc thái 'dần dần hoàn tất', 'ngày một trở nên...' trong tiếng Việt (như 배워가다 - học hỏi dần dần, 나아져가다 - ngày càng tiến bộ hơn). Khi kết hợp với động từ chuyển động (như 걸어가다), nó mang nghĩa đen là vừa thực hiện hành động vừa di chuyển đi.",
    "formation": "Thân động từ kết thúc bằng nguyên âm ㅏ, ㅗ + -아 가다 | Thân động từ kết thúc bằng các nguyên âm khác + -어 가다 | Động từ 하다 chuyển thành 해 가다",
    "examples": [
      {
        "translation": "Tôi sẽ vừa nghe nhạc vừa đi bộ tới đó, làm như thế có thể giảm bớt căng thẳng."
      },
      {
        "translation": "Mẹ tôi thường đến công viên mà mẹ vẫn vừa tập thể dục vừa ghé qua mỗi buổi sáng."
      },
      {
        "translation": "Khi lớn lên, em bé đang dần dần học hỏi được ngày càng nhiều điều."
      },
      {
        "translation": "Trong quá trình học tiếng Hàn, tôi đang dần dần tiến bộ hơn theo thời gian."
      }
    ]
  },
  "ko_어아_29": {
    "title": "~어/아 달라다 (Nhờ/yêu cầu làm cho... - Lời nhờ vả gián tiếp)",
    "shortExplanation": "Dùng trong câu tường thuật hoặc câu trích dẫn gián tiếp để diễn đạt việc yêu cầu, nhờ vả người khác làm giúp một hành động nào đó cho bản thân ('nhờ/yêu cầu... làm cho mình').",
    "longExplanation": "'~어/아 달라다' là dạng thức đặc biệt của động từ '주다' (cho, làm cho) được sử dụng khi truyền đạt lại một lời yêu cầu, nhờ vả mà hành động đó trực tiếp mang lại lợi ích cho người nói (hoặc chủ ngữ của hành động nhờ). Thông thường, cấu trúc này kết hợp với vĩ tố trích dẫn gián tiếp thành '~어/아 달라고 하다/부탁하다/요청하다' ('nhờ/bảo ai đó làm gì cho mình'). Trong trường hợp hành động nhờ vả làm cho người thứ ba thì phải dùng '~어/아 주라고 하다'.",
    "formation": "Thân động từ + -어/아 달라다 (trong câu gián tiếp thường dùng dạng: Thân động từ + -어/아 달라고 하다/부탁하다/요청하다)",
    "examples": [
      {
        "translation": "Thưa thầy, em xin nhờ thầy giải thích lại bằng lời này thêm một lần nữa ạ."
      },
      {
        "translation": "Vì tôi chưa hiểu nên tôi đã yêu cầu giải thích lại thêm một lần nữa."
      },
      {
        "translation": "Tôi đã nhờ bạn dạy cho mình cách vẽ."
      },
      {
        "translation": "Tôi đã nhờ bác sĩ giải thích chi tiết về các triệu chứng."
      }
    ]
  },
  "ko_어아_30": {
    "title": "~어/아 다니다 / ~에 다니다 (Thường xuyên lui tới, đi học/đi làm, đi đi lại lại)",
    "shortExplanation": "Biểu thị việc thường xuyên lui tới, đi đi về về ở một địa điểm nào đó theo thói quen định kỳ (như trường học, cơ quan, thư viện) hoặc làm một hành động trong quá trình đi lại ('đi học/đi làm', 'thường xuyên tới').",
    "longExplanation": "'다니다' là động từ chỉ sự di chuyển lặp đi lặp lại mang tính thói quen hoặc định kỳ giữa các địa điểm. Khi kết hợp với trợ từ chỉ nơi chốn trong cấu trúc 'Danh từ (địa điểm) + 에 다니다', nó biểu thị việc ai đó thường xuyên lui tới một địa điểm với mục đích cụ thể (như đi học '학교에 다니다', đi làm '회사에 다니다', đi chợ '시장에 다니다'). Ngoài ra, khi kết hợp với thân động từ theo dạng '-어/아 다니다' (như 걸어 다니다, 찾아다니다), cấu trúc diễn tả hành động được thực hiện trong quá trình đi lại liên tục.",
    "formation": "Danh từ chỉ địa điểm + 에 다니다 (hoặc Thân động từ + -어/아 다니다)",
    "examples": [
      {
        "translation": "Tôi đi học mỗi ngày."
      },
      {
        "translation": "Cô ấy thường xuyên đến thư viện."
      },
      {
        "translation": "Chúng tôi đi chợ vào mỗi cuối tuần."
      },
      {
        "translation": "Em tôi đi học ở trung tâm luyện thi sau giờ học ở trường."
      }
    ]
  },
  "ko_어아_31": {
    "title": "~어/아 두다 (Làm sẵn, để sẵn, giữ nguyên trạng thái)",
    "shortExplanation": "Diễn tả việc thực hiện một hành động nào đó rồi duy trì, bảo lưu kết quả của hành động đó nhằm chuẩn bị cho tương lai hoặc để mặc nguyên như vậy ('làm sẵn', 'để sẵn').",
    "longExplanation": "'~어/아 두다' là cấu trúc bổ trợ kết hợp giữa thân động từ với động từ phụ trợ '두다' (đặt, để, giữ), biểu thị một hành vi được hoàn thành và trạng thái sau khi hành động đó diễn ra vẫn được duy trì liên tục nhằm phục vụ cho mục đích hoặc việc sử dụng trong tương lai. Tương đương với 'làm sẵn...', 'để nguyên...' trong tiếng Việt. Cấu trúc này có nét nghĩa tương tự '~어/아 놓다', nhưng '~어/아 두다' nhấn mạnh nhiều hơn vào việc lưu giữ lâu dài hoặc cất giữ dự phòng cho tương lai.",
    "formation": "Thân động từ + -어/아 두다 (nguyên âm 끝 là ㅏ, ㅗ dùng -아 두다; các nguyên âm khác dùng -어 두다; 하다 biến thành 해 두다)",
    "examples": [
      {
        "translation": "Tôi đã để cửa mở sẵn."
      },
      {
        "translation": "Tôi đã chuẩn bị sẵn đồ ăn dùng cho ngày mai."
      },
      {
        "translation": "Anh ấy đã làm xong hết bài tập về nhà rồi để đó."
      },
      {
        "translation": "Tôi đã đóng cửa tiệm lại sẵn rồi."
      }
    ]
  },
  "ko_어아_32": {
    "title": "~어/아 들다 (Bất chợt bắt đầu, bỗng nhiên rộ lên)",
    "shortExplanation": "Dùng chủ yếu trong văn phong kể chuyện hoặc miêu tả để chỉ một hành động hoặc trạng thái bắt đầu diễn ra một cách bất ngờ, đột ngột ('bỗng nhiên bắt đầu', 'bất chợt rộ lên').",
    "longExplanation": "'~어/아 들다' là một kết cấu bổ ngữ mang tính văn phong tự sự trong tiếng Hàn, dùng để miêu tả một hành động, âm thanh hay biến đổi cảm xúc, thời tiết đột ngột phát tác hoặc thình lình bắt đầu. Thường xuất hiện trong cấu trúc liên kết '-어/아 들더니' để tạo sự đối lập hoặc chuyển biến nhanh chóng giữa các tình huống. Trong khẩu ngữ hiện đại thông thường, cấu trúc này ít gặp và người ta thường dùng '~기 시작하다' hoặc '갑자기 ~하다' thay thế.",
    "formation": "Thân động từ / Thân tính từ + -어/아 들다 (nguyên âm 끝 là ㅏ, ㅗ dùng -아 들다; các nguyên âm khác dùng -어 들다)",
    "examples": [
      {
        "translation": "Vừa nghe thấy lời đó, đứa em tôi bỗng bật cười khúc khích rồi ngay lập tức trở nên nghiêm túc."
      },
      {
        "translation": "Đứa bé bỗng oà khóc nức nở rồi ngay sau đó lại bật cười toe toét."
      },
      {
        "translation": "Gió bỗng thổi ùa vào dữ dội làm cánh cửa sổ đóng sầm một tiếng."
      },
      {
        "translation": "Mặt trời vừa lặn, bầu trời bỗng tối sầm lại rồi những vì sao bắt đầu xuất hiện."
      }
    ]
  },
  "ko_어아_33": {
    "title": "~어/아 버리다 (Làm mất rồi, lỡ... mất, xong xuôi - Tiếc nuối hoặc nhẹ nhõm)",
    "shortExplanation": "Diễn tả một hành động đã được hoàn tất một cách trọn vẹn, triệt để; thường mang sắc thái tiếc nuối, hối hận hoặc ngược lại là cảm giác trút bỏ, nhẹ nhõm ('lỡ... mất', 'xong béng').",
    "longExplanation": "'~어/아 버리다' là cấu trúc trợ động từ được cấu tạo từ thân động từ kết hợp với '버리다' (vứt bỏ). Cấu trúc này nhấn mạnh tính dứt điểm, triệt để của hành động (hành động đã xảy ra hoàn toàn và không thể cứu vãn được nữa). Tuỳ vào ngữ cảnh mà cấu trúc mang hai sắc thái tâm lý chính: (1) tiếc nuối, buồn bã hoặc bất đắc dĩ khi sự việc không mong muốn xảy ra ('lỡ... mất rồi'); (2) cảm giác nhẹ nhõm, thanh thản khi đã giải quyết xong một gánh nặng ('xong xuôi rồi').",
    "formation": "Thân động từ + -어/아 버리다 (nguyên âm 끝 là ㅏ, ㅗ dùng -아 버리다; các nguyên âm khác dùng -어 버리다; 하다 biến thành 해 버리다)",
    "examples": [
      {
        "translation": "Tôi đã uống hết sạch cà phê mất rồi, vì vậy bây giờ không còn cà phê để uống nữa."
      },
      {
        "translation": "Con mèo đã cắn rách đôi giày của tôi mất rồi, nên giờ tôi phải mua một đôi giày mới."
      },
      {
        "translation": "Tôi đã định ăn kiêng, thế nhưng lại lỡ ăn sạch cả chiếc bánh kem mất rồi."
      },
      {
        "translation": "Rốt cuộc, tôi đã không học bài mà lại đọc xong béng toàn bộ cuốn sách giáo khoa suốt đêm trước ngày thi."
      }
    ]
  },
  "ko_어아_34": {
    "title": "~어/아 보다 (Thử làm..., từng làm... - Trải nghiệm và thử nghiệm)",
    "shortExplanation": "Gắn sau thân động từ để diễn tả việc thử làm một hành động nào đó để xem kết quả ra sao hoặc biểu thị kinh nghiệm đã từng trải qua ('thử làm', 'từng làm').",
    "longExplanation": "'~어/아 보다' là cấu trúc trợ động từ phổ biến kết hợp từ thân động từ với '보다' (nhìn, thấy, thử). Cấu trúc mang hai nét nghĩa chính: (1) thử nghiệm thực hiện một hành vi mới mẻ nào đó để kiểm chứng xem sao ('thử làm...'); (2) khi dùng ở thì quá khứ ('-어/아 봤다'), cấu trúc diễn tả trải nghiệm hoặc kinh nghiệm trong quá khứ ('đã từng làm...'). Ở thể hiện tại hoặc tương lai, nó thể hiện ý định hoặc lời rủ rê làm thử.",
    "formation": "Thân động từ + -어/아 보다 (nguyên âm 끝 là ㅏ, ㅗ dùng -아 보다; các nguyên âm khác dùng -어 보다; 하다 biến thành 해 보다)",
    "examples": [
      {
        "translation": "Hôm nay tôi đang suy nghĩ xem có nên thử dạy tiếng Hàn lần đầu tiên hay không."
      },
      {
        "translation": "Cuối tuần này tôi dự định sẽ uống thử cà phê ở quán cà phê mà bạn đã giới thiệu."
      },
      {
        "translation": "Cô ấy tìm kiếm công thức nấu ăn mới và định sẽ thử nấu nướng xem sao."
      },
      {
        "translation": "Ngày mai tôi sẽ lần đầu tiên ghé thăm thành phố đó và dự định sẽ dạo quanh ngắm nhìn xung quanh."
      }
    ]
  },
  "ko_고_35": {
    "title": "~고 나서 (Sau khi làm... xong thì... - Trật tự hành động)",
    "shortExplanation": "Vĩ tố liên kết dùng để diễn tả trình tự thời gian rõ ràng: sau khi một hành động phía trước hoàn thành dứt điểm thì hành động phía sau mới diễn ra ('sau khi... xong thì').",
    "longExplanation": "'~고 나서' được kết hợp từ vĩ tố liên kết '-고' với động từ '나다' (xong, xuất hiện) chia ở dạng '-아서'. Cấu trúc này nhấn mạnh rằng hành động ở mệnh đề trước phải được kết thúc trọn vẹn thì hành động ở mệnh đề sau mới được tiến hành tiếp nối theo trình tự thời gian. Tương đương với 'sau khi làm xong... thì...' trong tiếng Việt. Cấu trúc này nhấn mạnh tính hoàn thành của hành động trước rõ rệt hơn so với chỉ dùng đơn thuần '-고'.",
    "formation": "Thân động từ + 고 나서",
    "examples": [
      {
        "translation": "Về nhà ăn cơm xong xuôi rồi tôi mới phải học bài."
      },
      {
        "translation": "Sau khi tham gia lớp học yoga xong, cơ thể tôi sẽ trở nên dẻo dai hơn."
      },
      {
        "translation": "Sau khi thi xong xuôi, tôi dự định sẽ nghỉ ngơi thư giãn."
      },
      {
        "translation": "Sau khi tập thể dục xong, cần phải tăng cường hấp thụ protein."
      }
    ]
  },
  "ko_어아_36": {
    "title": "~어/아 오다 (Đã và đang làm... từ trước tới nay, dần dần...)",
    "shortExplanation": "Biểu thị một hành động hoặc trạng thái bắt đầu từ quá khứ và liên tục tích lũy, tiến triển kéo dài cho đến tận thời điểm hiện tại ('đã và đang...', 'dần dần...').",
    "longExplanation": "'~어/아 오다' là kết cấu trợ động từ gắn sau thân động từ, dùng để diễn tả một hành động, quá trình biến đổi hay trạng thái được bắt đầu từ một thời điểm trong quá khứ và liên tục duy trì, tích lũy dần theo dòng thời gian cho đến tận hiện tại (hoặc mốc thời gian đang được nói tới). Thường đi kèm với các phó từ chỉ sự tiến triển dần dần như '점점' (ngày càng, dần dần), '계속' (liên tục).",
    "formation": "Thân động từ + -어/아 오다 (nguyên âm 끝 là ㅏ, ㅗ dùng -아 오다; các nguyên âm khác dùng -어 오다; 하다 biến thành 해 오다)",
    "examples": [
      {
        "translation": "Càng theo dõi bộ phim thì tôi lại càng dần cảm thấy hứng thú với cốt truyện."
      },
      {
        "translation": "Nhờ việc luyện tập lặp đi lặp lại, tôi đã dần dần nói tiếng Hàn tốt hơn trước."
      },
      {
        "translation": "Thời gian trôi qua, cô ấy đã ngày càng hiểu tôi nhiều hơn."
      },
      {
        "translation": "Càng tìm hiểu nhau thì mối quan hệ giữa chúng tôi lại càng trở nên gần gũi, khăng khít hơn."
      }
    ]
  },
  "ko_어아지다_37": {
    "title": "~어/아지다 (Trở nên..., dần trở thành... - Biến đổi trạng thái)",
    "shortExplanation": "Gắn sau thân tính từ để biểu thị sự biến đổi, chuyển biến dần dần sang một trạng thái tính chất mới ('trở nên...', 'trở thành...').",
    "longExplanation": "'~어/아지다' là cấu trúc biến đổi trạng thái cơ bản trong tiếng Hàn, được kết hợp bằng cách gắn vĩ tố '-어/아' cùng trợ động từ '지다' vào sau thân tính từ. Cấu trúc diễn tả một người, sự vật hoặc môi trường biến đổi từ trạng thái ban đầu sang một trạng thái tính chất mới theo thời gian, tương đương với 'trở nên...', 'hóa ra...', 'càng ngày càng...' trong tiếng Việt. Khi kết hợp: thân tính từ kết thúc bằng nguyên âm dương (ㅏ, ㅗ) dùng '-아지다', các nguyên âm khác dùng '-어지다', tính từ đuôi '하다' biến thành '해지다'.",
    "formation": "Thân tính từ + -어/아지다 (nguyên âm 끝 là ㅏ, ㅗ dùng -아지다; các nguyên âm khác dùng -어지다; 하다 biến thành 해지다)",
    "examples": [
      {
        "translation": "Thời tiết ngày càng trở nên nóng bức nên tôi quyết định chỉ ở nhà nghỉ ngơi."
      },
      {
        "translation": "Bạn tôi trở nên quá bận rộn nên chúng tôi không thể thường xuyên gặp nhau được nữa."
      },
      {
        "translation": "Công viên này mỗi khi chuyển mùa lại trở nên đẹp đẽ hơn nên có rất nhiều người tìm đến."
      },
      {
        "translation": "Căn phòng đã trở nên ấm áp nhờ bật lò sưởi."
      }
    ]
  },
  "ko_었으면_38": {
    "title": "~었으면 좋겠다 (Ước gì..., giá mà... - Thể hiện ước muốn, mong mỏi)",
    "shortExplanation": "Dùng để bộc lộ niềm mong ước, ước vọng tha thiết về một sự việc chưa xảy ra hoặc tiếc nuối về một tình huống trái ngược với thực tế ('ước gì...', 'giá mà...').",
    "longExplanation": "'~었으면 좋겠다' kết hợp thì quá khứ '-았/었-' với vĩ tố giả định '-으면' và tính từ '좋겠다' (thì thật tốt biết mấy). Cấu trúc này dùng để diễn đạt nguyện vọng, mong ước chân thành của người nói về một điều gì đó sẽ diễn ra theo ý mình, hoặc bày tỏ sự nuối tiếc đối với một sự việc trong quá khứ/hiện tại không như mong đợi ('ước gì đã làm thế', 'giá mà... thì tốt biết bao'). Việc gắn đuôi quá khứ '-았/었-' tạo khoảng cách giả định, làm cho lời cầu mong trở nên tha thiết và giàu sắc thái cảm xúc hơn so với '-(으)면 좋겠다'.",
    "formation": "Thân động từ / Thân tính từ + -았/었/였으면 좋겠다 (hoặc Danh từ + -이었/였으면 좋겠다)",
    "examples": [
      {
        "translation": "Ước gì lúc đó tôi đã nói ra tấm chân tình của mình cho cô ấy biết."
      },
      {
        "translation": "Giá mà tôi có thể về nhà sớm hơn thì tốt biết mấy."
      },
      {
        "translation": "Tôi ước gì bạn thấu hiểu cho tôi nhiều hơn."
      },
      {
        "translation": "Ước gì tôi đã biết được sự thật đó sớm hơn."
      }
    ]
  },
  "ko_에_39": {
    "title": "~에 한하다 (Chỉ giới hạn ở..., chỉ áp dụng đối với...)",
    "shortExplanation": "Gắn sau danh từ để biểu thị phạm vi áp dụng chỉ giới hạn duy nhất trong một đối tượng, điều kiện hoặc trường hợp cụ thể nào đó ('chỉ giới hạn ở', 'chỉ áp dụng với').",
    "longExplanation": "'~에 한하다' là kết cấu gồm trợ từ chỉ đối tượng/phạm vi '-에' và động từ '한하다' (hạn chế, giới hạn). Cấu trúc này dùng trong văn phong trang trọng, thông báo chính thức hoặc văn bản quy định để chỉ định rõ rằng một quy tắc, chính sách giảm giá hay ưu đãi chỉ áp dụng duy nhất cho đối tượng hoặc điều kiện được nêu ra, hoàn toàn loại trừ các trường hợp khác. Khi làm phó từ bổ nghĩa cho vế sau, cấu trúc thường chia ở dạng '~에 한해' hoặc '~에 한하여'.",
    "formation": "Danh từ + 에 한하다 (dạng bổ nghĩa thường dùng: Danh từ + 에 한해 / 에 한하여 / 에 한한)",
    "examples": [
      {
        "translation": "Chương trình khuyến mãi giảm giá lần này chỉ áp dụng giới hạn trong ngày hôm nay. Không áp dụng vào các ngày khác."
      },
      {
        "translation": "Tình yêu của tôi chỉ dành riêng duy nhất cho cô ấy, tôi hoàn toàn không hề có sự quan tâm đến ai khác."
      },
      {
        "translation": "Dịch vụ bảo hành của sản phẩm này chỉ được cung cấp giới hạn cho người mua ban đầu."
      },
      {
        "translation": "Sự kiện lần này chỉ giới hạn dành cho hội viên tham gia. Người không phải là hội viên sẽ không thể tham gia."
      }
    ]
  },
  "ko_에_40": {
    "title": "~에 한해서 (Chỉ riêng đối với..., chỉ trong phạm vi...)",
    "shortExplanation": "Dạng phó từ gắn sau danh từ để nhấn mạnh việc một điều kiện, quyền lợi hay quy định chỉ có hiệu lực đặc biệt riêng đối với đối tượng hoặc tình huống đó ('chỉ riêng với', 'chỉ hạn định ở').",
    "longExplanation": "'~에 한해서' là hình thái trạng ngữ của động từ '한하다' kết hợp với trợ từ '-에' và vĩ tố liên kết '-어서'. Cấu trúc này dùng để nhấn mạnh tính chất ngoại lệ, biệt đãi hoặc giới hạn nghiêm ngặt: chỉ khi thỏa mãn đúng đối tượng hoặc hoàn cảnh cụ thể này thì điều được nêu ở vế sau mới có hiệu lực hoặc được cho phép thực hiện, không áp dụng ra ngoài phạm vi đó. Tương đương với 'chỉ riêng với...', 'chỉ giới hạn ở...' trong tiếng Việt.",
    "formation": "Danh từ + 에 한해서 (hoặc Thân động từ / Thân tính từ + -기(에) 한해서)",
    "examples": [
      {
        "translation": "Chỉ riêng vì ngày mai là ngày nghỉ nên đêm nay tôi mới có thể làm việc đến muộn thế này."
      },
      {
        "translation": "Mức giảm giá đặc biệt này là dịch vụ chỉ được cung cấp riêng đối với các khách hàng VIP."
      },
      {
        "translation": "Chúng tôi chỉ áp dụng phục vụ đồ uống không giới hạn duy nhất trong ngày hôm nay."
      },
      {
        "translation": "Phiếu giảm giá trên điện thoại này chỉ có thể sử dụng riêng tại các cửa hàng Starbucks."
      }
    ]
  },
  "ko_에_41": {
    "title": "~에 힘쓰다 (Dốc sức vào..., nỗ lực vì..., chú trọng...)",
    "shortExplanation": "Gắn sau danh từ để biểu thị việc tập trung dồn toàn bộ sức lực, tâm huyết và sự cố gắng vào việc đạt được một mục tiêu nào đó ('dốc sức vào', 'nỗ lực vì').",
    "longExplanation": "'~에 힘쓰다' kết hợp từ trợ từ chỉ phương hướng/mục tiêu '-에' với động từ '힘쓰다' (dốc sức, gắng sức). Cấu trúc biểu thị thái độ kiên trì, tận tâm cống hiến năng lượng và tinh thần để hoàn thành một công việc, rèn luyện kỹ năng hoặc duy trì trạng thái tốt đẹp nào đó. Tương đương với 'dốc lòng vì...', 'dồn sức cho...', 'nỗ lực vào...' trong tiếng Việt. Khi kết hợp với động từ, ta dùng dạng danh từ hóa '-(으)ㅁ에 힘쓰다' hoặc '-기(에) 힘쓰다'.",
    "formation": "Danh từ + 에 힘쓰다 (hoặc Thân động từ + -기(에) 힘쓰다 / -(으)ㅁ에 힘쓰다)",
    "examples": [
      {
        "translation": "Tôi đang dốc sức vào việc học tiếng Hàn, dù hiện tại vẫn còn nhiều thiếu sót nhưng chắc chắn sẽ tiến bộ hơn."
      },
      {
        "translation": "Cô ấy bắt đầu nỗ lực dốc sức vào việc học tập, và kết quả đạt được luôn luôn rất tốt."
      },
      {
        "translation": "Đội ngũ chúng tôi đang dốc toàn lực để nỗ lực hoàn thành dự án này một cách tốt nhất."
      },
      {
        "translation": "Thấy bạn bè đang nỗ lực chăm lo cho sức khỏe của bản thân, tôi cảm thấy rất đỗi tự hào."
      }
    ]
  },
  "ko_으나마나_42": {
    "title": "~으나마나 (Có làm cũng như không, dù làm cũng vô ích)",
    "shortExplanation": "Vĩ tố liên kết dùng để diễn tả việc dù có thực hiện hành động đó hay không thì kết quả nhận lại vẫn chẳng có gì thay đổi hoặc đều vô ích, không mang lại hiệu quả ('có làm cũng như không', 'chẳng bõ công').",
    "longExplanation": "'~으나마나' là vĩ tố liên kết kết hợp từ hai vế đối lập '-(으)나' (dù... nhưng) và '마나' (rút gọn từ '말이나' - dù không làm). Cấu trúc mang ý nghĩa 'dù có làm hay không làm thì kết quả cũng y như nhau', nhấn mạnh sự uổng công, vô ích của một nỗ lực hay hành vi. Mệnh đề sau luôn đi kèm với kết quả không thỏa đáng, tiêu cực hoặc một kết luận rõ ràng rằng việc đó là không cần thiết phải làm (như '보나 마나 뻔하다' - chưa nhìn cũng biết tỏng).",
    "formation": "Thân động từ + -으나마나 (thân có phụ âm cuối dùng -으나마나, không có phụ âm cuối hoặc kết thúc bằng ㄹ dùng -나마나)",
    "examples": [
      {
        "translation": "Dù tôi đã học tập rất chăm chỉ để thi cho tốt thì cũng như không, kết quả nhận lại lúc nào cũng chẳng hề thỏa đáng."
      },
      {
        "translation": "Dù chúng tôi có bắt taxi để đến nơi thật nhanh thì cũng vô ích, rốt cuộc chúng tôi vẫn bị muộn giờ."
      },
      {
        "translation": "Anh ấy có đi bệnh viện lấy thuốc về uống thì cũng chẳng ăn thua, các triệu chứng hoàn toàn không thuyên giảm chút nào."
      },
      {
        "translation": "Dù tôi có xin lỗi cô ấy thì cũng hoài công, cô ấy đã chẳng hề tha thứ cho tôi."
      }
    ]
  },
  "ko_으니니까_43": {
    "title": "~으니/니까 (Vì... nên..., do... nên... - Diễn tả lý do, nguyên nhân)",
    "shortExplanation": "Vĩ tố liên kết dùng để nối hai mệnh đề, diễn tả mệnh đề trước là nguyên nhân, lý do hoặc căn cứ dẫn đến kết quả, phán đoán hay lời rủ rê ở mệnh đề sau ('vì... nên...', 'do...').",
    "longExplanation": "'~으니/니까' (dạng rút gọn là '-(으)니' hoặc '-(으)니까') là vĩ tố liên kết chỉ nguyên nhân, căn cứ vô cùng thông dụng trong tiếng Hàn. Cấu trúc này thường nhấn mạnh vào nhận thức chủ quan của người nói, lời giải thích hay căn cứ để đưa ra phán đoán, mệnh lệnh, khuyên nhủ hoặc rủ rê ('vì thế này nên hãy/cùng làm thế kia'). Mệnh đề sau có thể thoải mái kết hợp với các đuôi câu mệnh lệnh ('-(으)세요'), thỉnh dụ ('-(으)ㅂ시다') mà không bị hạn chế như '-아/어서'. Ngoài ra, cấu trúc còn dùng khi nhận ra một sự thật mới sau khi thực hiện hành động ở vế trước ('làm việc gì thì thấy...').",
    "formation": "Thân động từ / Thân tính từ + -(으)니까 / -(으)니 (có phụ âm cuối dùng -으니까 / -으니, không có phụ âm cuối dùng -니까 / -니) | Danh từ + -(이)니까 / -(이)니",
    "examples": [
      {
        "translation": "Hôm nay là thứ Bảy nên tôi không đến trường, vào cuối tuần trường học được nghỉ."
      },
      {
        "translation": "Vì không có ai giúp đỡ nên tôi đã phải tự mình giải quyết."
      },
      {
        "translation": "Nhờ dùng máy dịch nên tôi có thể hiểu tiếng Hàn một cách dễ dàng hơn."
      },
      {
        "translation": "Vì trời đang mưa nên bạn hãy mang theo ô khi ra ngoài nhé, nếu bị dính mưa bạn có thể bị cảm lạnh đấy."
      }
    ]
  },
  "ko_을_44": {
    "title": "~(을/를) 바탕으로 (Dựa trên, trên cơ sở, căn cứ vào)",
    "shortExplanation": "Dùng để diễn tả việc thực hiện một hành động, phán đoán hay quyết định nào đó dựa trên nền tảng, cơ sở của một sự thật, kinh nghiệm, tài liệu hoặc ý kiến ('dựa trên', 'trên cơ sở').",
    "longExplanation": "'~(을/를) 바탕으로' là cụm biểu hiện ngữ pháp kết hợp giữa danh từ với danh từ '바탕' (nền tảng, căn bản) và trợ từ chỉ phương hướng/cách thức '-으로'. Cấu trúc này biểu thị rằng danh từ đi trước đóng vai trò là nền tảng, cơ sở dữ liệu hoặc kinh nghiệm thực tiễn để triển khai hành động, sáng tác hoặc đưa ra quyết định ở vế sau. Trong tiếng Việt tương đương với 'dựa trên...', 'trên cơ sở...', 'căn cứ vào...'. Khi bổ nghĩa trực tiếp cho danh từ phía sau, cấu trúc chuyển thành dạng '~(을/를) 바탕으로 한 + Danh từ'.",
    "formation": "Danh từ + 을/를 바탕으로 (danh từ có phụ âm cuối dùng 을 바탕으로, không có phụ âm cuối dùng 를 바탕으로)",
    "examples": [
      {
        "translation": "Chúng tôi đã cải tiến sản phẩm dựa trên phản hồi của khách hàng."
      },
      {
        "translation": "Cô ấy đã viết một cuốn sách dựa trên kinh nghiệm của chính mình."
      },
      {
        "translation": "Tôi có thể hoàn thành nhanh chóng công việc này dựa trên kinh nghiệm ở công ty trước."
      },
      {
        "translation": "Họ đã đưa ra quyết định dựa trên các sự thật khách quan."
      }
    ]
  },
  "ko_을_45": {
    "title": "~(을/를) 빼다 / ~(을/를) 빼고(는) (Ngoại trừ, trừ ra, bỏ qua)",
    "shortExplanation": "Dùng để loại trừ một đối tượng, sự vật hoặc nhóm người cụ thể ra khỏi một tổng thể chung ('ngoại trừ', 'trừ... ra').",
    "longExplanation": "'빼다' là động từ mang nghĩa 'rút ra, trừ đi, loại bỏ'. Khi dùng dưới dạng liên kết '~을/를 빼고' hoặc '~을/를 빼고는', cấu trúc này biểu thị việc tách riêng một hoặc vài yếu tố cá biệt ra khỏi phạm vi khái quát được đề cập, nhấn mạnh rằng phần còn lại đều thoả mãn một điều kiện hay trạng thái nhất định. Tương đương với 'trừ...', 'ngoại trừ... ra' trong tiếng Việt. Khi kết thúc câu hoàn chỉnh, cấu trúc biểu thị hành động loại bỏ hoặc không tính đến đối tượng đó.",
    "formation": "Danh từ + 을/를 빼다 (thường dùng dạng liên kết: Danh từ + 을/를 빼고 / 을/를 빼고는; có phụ âm cuối dùng 을, không có phụ âm cuối dùng 를)",
    "examples": [
      {
        "translation": "Ở trường chúng tôi, học sinh ai cũng thân thiện, trừ một vài học sinh ra thì tất cả đều rất tốt bụng."
      },
      {
        "translation": "Tất cả các món ở nhà hàng này đều ngon, ngoại trừ một vài món ra thì món nào cũng ngon."
      },
      {
        "translation": "Tất cả những người ở đây đều có thể nói tiếng Hàn, trừ một vài người ra."
      },
      {
        "translation": "Trong tất cả những cuốn sách tôi từng đọc thì cuốn này thú vị nhất, trừ một vài cuốn ra."
      }
    ]
  },
  "ko_을_46": {
    "title": "~(과/와) ~ 사이(에) (Ở giữa, giữa... và..., khoảng giữa)",
    "shortExplanation": "Dùng để chỉ vị trí không gian, khoảng cách thời gian hoặc mối quan hệ nằm ở khoảng giữa hai hay nhiều đối tượng ('ở giữa', 'giữa... và...').",
    "longExplanation": "'사이' là danh từ chỉ khoảng cách, khoảng trống giữa hai điểm (không gian), khoảng thời gian giữa hai thời điểm (thời gian), hoặc quan hệ qua lại giữa hai đối tượng. Cấu trúc thường kết hợp với trợ từ liên kết '과/와' theo mẫu 'Danh từ 1 + 과/와 + Danh từ 2 + 사이(에)', hoặc dùng sau danh từ số nhiều (như '우리 사이에' - giữa chúng ta). Trợ từ '에' được thêm vào khi làm trạng ngữ chỉ địa điểm hoặc thời điểm diễn ra hành động.",
    "formation": "Danh từ 1 + 과/와 + Danh từ 2 + 사이(에) (danh từ 1 có phụ âm cuối dùng 과, không có phụ âm cuối dùng 와; hoặc Danh từ số nhiều + 사이(에))",
    "examples": [
      {
        "translation": "Tôi ăn một bữa nhẹ đơn giản vào khoảng giữa bữa sáng và bữa trưa."
      },
      {
        "translation": "Việc có thời gian nghỉ giải lao giữa công việc thứ nhất và công việc thứ hai là rất quan trọng."
      },
      {
        "translation": "Tôi đã học bài ở công viên nằm giữa nhà cô ấy và trường học."
      },
      {
        "translation": "Chúng tôi đã gặp nhau tại nhà hàng nằm ở giữa hai công ty."
      }
    ]
  },
  "ko_을_47": {
    "title": "~(으)ㄹ 테니(까) (Chắc là sẽ... nên, tôi sẽ... nên)",
    "shortExplanation": "Dùng để đưa ra suy đoán mạnh mẽ về một tình huống tương lai hoặc biểu thị ý chí của người nói nhằm làm tiền đề, căn cứ cho vế sau ('chắc là... nên', 'tôi sẽ... nên bạn hãy...').",
    "longExplanation": "'~(으)ㄹ 테니(까)' là cấu trúc kết hợp giữa vĩ tố dạng định ngữ chỉ tương lai/suy đoán '-(으)ㄹ', danh từ phụ thuộc '터' (chỉ dự định, ý chí hoặc phỏng đoán) và vĩ tố liên kết chỉ nguyên nhân/tiền đề '-(으)니까'. Cấu trúc có hai cách dùng chính: (1) Khi chủ ngữ là ngôi thứ ba: người nói đưa ra phỏng đoán chắc chắn về một sự việc sắp xảy ra, làm lý do để đưa ra lời khuyên, đề nghị hoặc hành động ở vế sau ('chắc là sẽ... nên...'); (2) Khi chủ ngữ là ngôi thứ nhất: người nói tuyên bố ý chí, sự sẵn sàng của mình để yêu cầu đối phương thực hiện việc khác ('tôi sẽ làm... nên bạn hãy...').",
    "formation": "Thân động từ / Thân tính từ + -(으)ㄹ 테니 (thân từ có phụ âm cuối dùng -을 테니, không có phụ âm cuối hoặc có phụ âm cuối là ㄹ dùng -ㄹ 테니; quá khứ dùng -았/었을 테니)",
    "examples": [
      {
        "translation": "Chắc là ngày mai trời sẽ mưa đấy nên bạn mang theo ô thì tốt hơn."
      },
      {
        "translation": "Hồi nhỏ Jinhee chắc hẳn đã học bơi rồi nên chắc là cô ấy sẽ bơi giỏi thôi."
      },
      {
        "translation": "Có vẻ anh ấy đã thức dậy và ăn sáng; trong bát chắc là vẫn còn vương chút cơm nên rõ ràng là anh ấy đã ăn sáng rồi mới đi."
      },
      {
        "translation": "Vì Younghee bảo mệt nên giờ chắc cô ấy đang ngủ ở nhà đấy, đừng gọi điện thoại nhé."
      }
    ]
  },
  "ko_을_48": {
    "title": "~(을/를) 통해(서) (Thông qua, qua, nhờ vào)",
    "shortExplanation": "Chỉ phương tiện, phương thức, kênh trung gian hoặc quá trình mà nhờ đó một hành động được thực hiện hoặc một kết quả đạt được ('thông qua', 'qua').",
    "longExplanation": "'~(을/를) 통해(서)' là cấu trúc bổ ngữ kết hợp giữa danh từ với động từ '통하다' (thông qua, xuyên qua) chia theo đuôi liên kết '-어/아(서)'. Cấu trúc biểu thị phương tiện, môi chất, công cụ truyền đạt (như email, sách báo, người trung gian) hoặc một quá trình trải nghiệm mà thông qua đó chủ ngữ tiếp nhận tri thức, giải quyết vấn đề hoặc đạt được mục tiêu. Tương đương với 'thông qua...', 'nhờ qua...', 'qua...' trong tiếng Việt. Khi bổ nghĩa trực tiếp cho danh từ phía sau, cấu trúc dùng dạng '~(을/를) 통한 + Danh từ'.",
    "formation": "Danh từ + 을/를 통해(서) (danh từ có phụ âm cuối dùng 을 통해, không có phụ âm cuối dùng 를 통해)",
    "examples": [
      {
        "translation": "Chúng tôi đã trao đổi ý kiến thông qua thư điện tử, nhờ thế ai nấy đều cảm thấy thoải mái khi bày tỏ quan điểm."
      },
      {
        "translation": "Tôi thích học hỏi kiến thức mới qua sách vở, vì vậy tôi thường xuyên đến thư viện."
      },
      {
        "translation": "Cô ấy đang học tiếng Hàn thông qua Google Dịch, nên việc học ngôn ngữ trở nên rất thuận tiện."
      },
      {
        "translation": "Chúng ta đã có thể ngăn chặn sự lây lan của virus Corona thông qua việc đeo khẩu trang, nhờ đó cứu sống được rất nhiều sinh mạng."
      }
    ]
  },
  "ko_을를_49": {
    "title": "~(을/를) 틈타(서) (Tranh thủ, nhân cơ hội, lợi dụng lúc)",
    "shortExplanation": "Diễn tả việc nắm bắt, tận dụng một khoảng thời gian trống, sơ hở hoặc cơ hội ngắn ngủi để làm một việc gì đó ('nhân cơ hội', 'tranh thủ lúc').",
    "longExplanation": "'틈' là danh từ chỉ khe hở, kẽ nứt hoặc khoảng thời gian rảnh rỗi, thời điểm sơ hở. Động từ '타다' ở đây mang nghĩa tận dụng thời cơ. Cấu trúc '~(을/를) 틈타(서)' diễn tả việc ai đó chớp lấy một khoảng thời gian ngắn (như giờ nghỉ, lúc đi làm) hoặc lợi dụng thời điểm sơ hở, tình huống thuận lợi (như lúc đối phương mất cảnh giác, lúc trời mưa vắng người) để tiến hành một hành động. Thường đi sau danh từ chỉ thời gian, cơ hội hoặc động từ dạng định ngữ + danh từ chỉ thời điểm ('-(으)ㄹ 때/사이를 틈타').",
    "formation": "Danh từ + 을/를 틈타(서) (danh từ có phụ âm cuối dùng 을 틈타, không có phụ âm cuối dùng 를 틈타; hoặc Động từ dạng định ngữ + 때/사이를 틈타)",
    "examples": [
      {
        "translation": "Tôi thường tranh thủ lúc trên đường đi làm để đọc sách, nhờ vậy có thể tận dụng tốt khoảng thời gian đi lại buồn tẻ."
      },
      {
        "translation": "Cô ấy đã tranh thủ thời gian nghỉ giải lao để học bài, vì thế việc chuẩn bị cho kỳ thi diễn ra tốt hơn."
      },
      {
        "translation": "Tôi tranh thủ lúc em bé ngủ say để làm việc nhà, nhờ thế mà giải quyết được rất nhiều công việc."
      },
      {
        "translation": "Tôi đã nhân một ngày trời mưa để đọc sách tại một quán cà phê đầy lãng mạn, đó quả thực là một khoảng thời gian yên bình."
      }
    ]
  },
  "ko_이기는_50": {
    "title": "~기는 한데 / ~이기는 한데 (Đúng là có... thật nhưng mà, tuy là... nhưng)",
    "shortExplanation": "Dùng để thừa nhận tính chân thực của một sự thật, hành động hay đặc điểm ở vế trước, nhưng vế sau lại đưa ra một điều kiện, giới hạn hoặc tình huống trái ngược ('đúng là... thật đấy nhưng mà...').",
    "longExplanation": "'~기는 한데' là cấu trúc kết hợp giữa vĩ tố danh từ hóa '-기', trợ từ nhấn mạnh đối lập '-는' và tính từ bổ trợ '하다' chia theo đuôi liên kết tương phản '-ㄴ/은데'. Cấu trúc này biểu thị việc người nói công nhận hoàn toàn một thực tế hay ý kiến được nêu ra ở vế trước, song ngay sau đó lập tức đưa ra một phương diện khác mang tính hạn chế, thiếu sót hoặc không thỏa mãn hoàn toàn ở vế sau. Tương đương với 'đúng là... thật nhưng', 'tuy... nhưng mà' trong tiếng Việt. Khi kết hợp với danh từ gắn với trợ từ chỉ định 이다, dạng thức sẽ là '~이기는 한데'. Trong khẩu ngữ thường được rút gọn thành '~긴 한데'.",
    "formation": "Thân động từ / Thân tính từ + -기는 한데 (hoặc rút gọn là -긴 한데; Danh từ + (이)기는 한데; Quá khứ dùng -기는 했는데)",
    "examples": [
      {
        "translation": "Tôi xem bộ phim đó thấy đúng là cũng hay thật nhưng mà có hơi nhiều cảnh bạo lực nên cảm thấy hơi khó chịu."
      },
      {
        "translation": "Đúng là tôi đang học tiếng Hàn thật đấy, nhưng tôi lại muốn giỏi tiếng Trung hơn."
      },
      {
        "translation": "Đội chúng tôi đúng là đã chiến thắng thật nhưng đối thủ chơi tốt hơn."
      },
      {
        "translation": "Ngày mai có hội thao nên đúng là phải luyện tập thật nhiều đấy, nhưng vì không có thời gian nên tôi chẳng biết phải làm sao."
      }
    ]
  },
  "ko_이나_51": {
    "title": "~(이)나 (Hoặc là, chẳng hạn như, những/tận - Lựa chọn hoặc số lượng lớn)",
    "shortExplanation": "Dùng để liệt kê lựa chọn thay thế không quá vừa ý ('hoặc là', 'chẳng hạn như'), hoặc biểu thị sự ngạc nhiên trước số lượng nhiều hơn dự tính ('những tận', 'tới mức').",
    "longExplanation": "'~(이)나' là trợ từ đa nghĩa quan trọng trong tiếng Hàn. Cấu trúc có ba chức năng ngữ pháp tiêu biểu: (1) Lựa chọn phương án phụ khi không có sự lựa chọn tối ưu, mang sắc thái 'chẳng hạn như...', 'hay là...'; (2) Liệt kê giữa hai hay nhiều danh từ với ý nghĩa 'hoặc là'; (3) Gắn sau từ chỉ số lượng để nhấn mạnh mức độ hay số lượng nhiều vượt trội so với kỳ vọng của người nói (tương đương với 'những tận...', 'lên đến...').",
    "formation": "Danh từ + (이)나 (danh từ có phụ âm cuối dùng 이나, không có phụ âm cuối dùng 나)",
    "examples": [
      {
        "translation": "Tôi sẽ uống cà phê hay trà hay thứ gì đó vậy, vì tôi đang khát nước quá."
      },
      {
        "translation": "Cuối tuần này chúng mình đi dã ngoại hay làm gì đó nhé? Đi tận hưởng thời tiết đẹp cũng tuyệt đấy chứ."
      },
      {
        "translation": "Cô ấy đã ăn trưa bằng thứ gì đó đơn giản như mì tôm hay sushi đậu phụ."
      },
      {
        "translation": "Tôi đã phải đi bộ những tận 10 cây số mới về đến nhà, vì không có chuyến xe buýt nào cả."
      }
    ]
  },
  "ko_이래_52": {
    "title": "~(으)ㄴ 이래(로) / ~ 이래(로) (Kể từ khi, từ đó đến nay)",
    "shortExplanation": "Chỉ một mốc thời gian hoặc sự kiện trong quá khứ mà kể từ thời điểm đó cho đến tận hiện tại, một trạng thái hoặc hành động liên tục được duy trì ('kể từ khi', 'từ sau khi').",
    "longExplanation": "'이래' là danh từ chỉ mốc thời gian quá khứ mà từ đó trở đi tình hình bắt đầu tiếp diễn. Khi kết hợp với danh từ chỉ thời gian hoặc động từ dạng định ngữ quá khứ '-(으)ㄴ 이래(로)', cấu trúc biểu thị rằng kể từ khi sự kiện ở vế trước diễn ra, trạng thái hoặc thói quen ở vế sau đã liên tục kéo dài suốt từ thời điểm đó cho tới nay. Tương đương với 'kể từ sau khi...', 'từ dạo ấy đến nay' trong tiếng Việt. Trợ từ phương hướng '-로' thường được thêm vào sau '이래' để tăng tính tự nhiên và nhấn mạnh sự tiếp diễn liên tục.",
    "formation": "Thân động từ + -(으)ㄴ 이래(로) (thân động từ có phụ âm cuối dùng -은 이래, không có phụ âm cuối dùng -ㄴ 이래; hoặc Danh từ + 이래(로))",
    "examples": [
      {
        "translation": "Kể từ lần đầu gặp cô ấy ở trường học, tôi đã đem lòng yêu thương cô ấy."
      },
      {
        "translation": "Sau khi đến Ấn Độ, kể từ lần đầu ăn thử đồ cay, tôi đã trở nên thích ăn cay."
      },
      {
        "translation": "Thức dậy và nghe xong câu chuyện, kể từ lúc đó tôi đã không thể thốt nên lời."
      },
      {
        "translation": "Kể từ khi tòa nhà bị thiêu rụi trong biển lửa, nơi đó đã biến thành một ngôi nhà hoang phế."
      }
    ]
  },
  "ko_이러하다_53": {
    "title": "이러하다 (Như thế này, thế này - Tính từ chỉ tính chất, trạng thái)",
    "shortExplanation": "Tính từ chỉ thị dùng để miêu tả hình dáng, trạng thái, tính chất hoặc sự tình giống như thế này ('như thế này', 'như vầy').",
    "longExplanation": "'이러하다' là tính từ chỉ thị mang nghĩa 'như thế này', 'như vầy' (dạng chuẩn của '이렇다'), dùng để miêu tả trạng thái, hoàn cảnh hoặc tính chất của sự vật, sự việc mà người nói đang trực tiếp chứng kiến, trải nghiệm hoặc vừa nhắc tới. Khi làm vị ngữ thường chia thành '이러하다/이러합니다', khi đứng trước danh từ làm định ngữ chia thành '이러한 + Danh từ' (những ... như thế này), khi đứng trước mệnh đề nguyên nhân chia thành '이러하니/이러하니까' (vì tình hình như thế này nên...).",
    "formation": "Tính từ: 이러하다 (dạng rút gọn: 이렇다; định ngữ: 이러한 + Danh từ; trạng từ: 이러하게; liên kết: 이러하니, 이러하므로)",
    "examples": [
      {
        "translation": "Vì tình hình như thế này nên tất cả mọi người đều không biết phải làm sao."
      },
      {
        "translation": "Vấn đề lại ra nông nỗi như thế này so với suy nghĩ nên tôi thấy thực sự rất bối rối."
      },
      {
        "translation": "Việc mọi người đối xử với tôi như thế này khiến tôi cảm thấy vô cùng tủi thân."
      },
      {
        "translation": "Chính vì hành động như thế này của anh ta mà rất nhiều người đã phải chịu đau khổ."
      }
    ]
  },
  "ko_이리_54": {
    "title": "이리 (Lại đây, theo hướng này, thế này - Phó từ chỉ thị)",
    "shortExplanation": "Phó từ chỉ thị phương hướng hướng về phía người nói ('lại đây', 'về phía này') hoặc chỉ cách thức, mức độ ('thế này', 'đến mức này').",
    "longExplanation": "'이리' là phó từ chỉ thị trong tiếng Hàn, vừa là dạng rút gọn của '이리로' (về phía này, lại đây), vừa là dạng rút gọn mang tính khẩu ngữ chỉ cách thức 'như thế này' (이러하게/이렇게) hoặc chỉ mức độ 'đến mức này' (이토록). Khi dùng chỉ phương hướng, nó thường kết hợp với các động từ di chuyển như 오다 (đến), 가다 (đi) hoặc câu mệnh lệnh ('이리 오세요' - hãy lại đây). Khi dùng chỉ cách thức thực hiện hành động, nó bổ nghĩa cho động từ đi sau mang nghĩa 'hãy làm theo cách này'.",
    "formation": "Phó từ: 이리 + Động từ (như 이리 오다, 이리 하다, 이리 쓰다)",
    "examples": [
      {
        "translation": "Đừng gọi như thế, hãy gọi theo cách này này."
      },
      {
        "translation": "Cậu ấy đã làm bài tập theo cách như thế này này."
      },
      {
        "translation": "Xin vui lòng chụp ảnh cho tôi theo góc này / như thế này nhé."
      },
      {
        "translation": "Tôi nghĩ là mình sẽ làm việc đó theo cách này."
      }
    ]
  },
  "ko_이미_55": {
    "title": "이미 (Đã, rồi, sẵn rồi - Phó từ chỉ sự hoàn tất)",
    "shortExplanation": "Phó từ biểu thị một hành động, sự việc hoặc trạng thái đã hoàn thành, đã xảy ra trước thời điểm nói hoặc trước một thời điểm tiêu chuẩn ('đã... rồi').",
    "longExplanation": "'이미' là phó từ chỉ thời gian trong tiếng Hàn, tương đương với 'đã', 'rồi' trong tiếng Việt. Nó đứng trước vị ngữ (thường là động từ chia ở thì quá khứ) để nhấn mạnh rằng một hành động hoặc biến đổi đã kết thúc một cách dứt khoát trong quá khứ và không thể đảo ngược được nữa. Khác với '벌써' (thường mang cảm xúc ngạc nhiên vì sự việc diễn ra sớm hơn dự kiến), '이미' thiên về việc xác lập một sự thật khách quan rằng sự việc đã hoàn thành hoặc đã an bài.",
    "formation": "Phó từ: 이미 + Động từ/Tính từ (thường đi với thì quá khứ: 이미 + Thân từ + -았/었다)",
    "examples": [
      {
        "translation": "Tôi đã bắt đầu học tiếng Hàn rồi, tuy hơi muộn một chút nhưng tôi đã quyết định sẽ học thật chăm chỉ."
      },
      {
        "translation": "Chúng tôi đã đến bờ biển rồi, không cần phải chờ đợi thêm nữa."
      },
      {
        "translation": "Lũ trẻ đã ăn tối rồi, cho nên bây giờ chúng đã no bụng."
      },
      {
        "translation": "Bộ phim đó tôi đã xem rồi, vì thế chắc là phải tìm phim khác thôi."
      }
    ]
  },
  "ko_인_56": {
    "title": "~(으)ㄴ/는 바 / ~인 바 (Xét thấy, theo như việc... nên - Văn phong trang trọng)",
    "shortExplanation": "Dùng trong văn viết hoặc văn phong trang trọng, công vụ để nêu lên sự thật, tình huống hoặc căn cứ ở vế trước làm tiền đề cho nội dung được triển khai ở vế sau ('xét thấy', 'theo như việc... nên').",
    "longExplanation": "'~(으)ㄴ/는 바' là cấu trúc liên kết kết hợp giữa vĩ tố dạng định ngữ với danh từ phụ thuộc '바' (chỉ sự việc, điều, phương diện). Trong văn phong hành chính, công văn, báo cáo hoặc phát biểu chính thức, cấu trúc này được dùng để giới thiệu bối cảnh, tình hình thực tế đã diễn ra hoặc căn cứ pháp lý/thực tiễn làm cơ sở cho quyết định, chỉ thị hoặc yêu cầu ở vế tiếp theo. Tương đương với 'xét thấy rằng...', 'theo như...', 'do việc... nên' trong tiếng Việt. Khi gắn với danh từ + 이다, cấu trúc có dạng '~인 바'. Ngoài ra cấu trúc còn xuất hiện dưới dạng '~ㄴ 바 있다/없다' (đã từng/chưa từng có việc...).",
    "formation": "Thân động từ / Thân tính từ + -(으)ㄴ/는 바 (hoặc Danh từ + 인 바; quá khứ/hoàn thành: Thân động từ + -(으)ㄴ 바; hiện tại: Thân động từ + -는 바)",
    "examples": [
      {
        "translation": "Xét thấy cuộc họp đã bị hủy bỏ nên hôm nay tôi dự định sẽ nghỉ ngơi ở nhà."
      },
      {
        "translation": "Vì chưa có thông tin cô ấy đã đến nơi nên có lẽ cô ấy vẫn đang đợi chúng ta."
      },
      {
        "translation": "Những người từng có tiền sử nhiễm loại virus này phải thực hiện tự cách ly."
      },
      {
        "translation": "Vì nhà vệ sinh đã có người dùng xong rồi nên bây giờ người khác có thể sử dụng."
      }
    ]
  },
  "ko_인_57": {
    "title": "~(으)ㄴ/는 이상 / ~인 이상 (Một khi đã..., chừng nào còn...)",
    "shortExplanation": "Dùng để thiết lập một tiền đề hoặc điều kiện tất yếu, nhấn mạnh rằng một khi sự việc ở vế trước đã xảy ra hoặc ở trong trạng thái đó thì vế sau bắt buộc phải được thực hiện hoặc là điều đương nhiên ('một khi đã... thì phải', 'đã là... thì đương nhiên').",
    "longExplanation": "'~(으)ㄴ/는 이상' là cấu trúc kết hợp giữa vĩ tố dạng định ngữ với danh từ '이상' (dĩ thượng - mang nghĩa vượt lên trên, hoặc một khi đã xác lập). Cấu trúc này dùng để biểu thị một tình huống đã trở thành tiền đề cố định không thể đảo ngược, do đó người nói nhấn mạnh hành động hoặc kết quả ở vế sau là nghĩa vụ bắt buộc, quyết tâm sắt đá hoặc là một điều hiển nhiên không thể tránh khỏi. Tương đương với 'một khi đã... thì...', 'đã là... thì nhất định...' trong tiếng Việt. Khi đi với danh từ + 이다, cấu trúc có dạng '~인 이상'.",
    "formation": "Thân động từ / Thân tính từ + -(으)ㄴ/는 이상 (động từ quá khứ/trạng thái dùng -(으)ㄴ 이상; hiện tại dùng -는 이상; Danh từ + 인 이상)",
    "examples": [
      {
        "translation": "Một khi chúng ta đã đi xa đến tận nước này rồi thì không thể bỏ cuộc được."
      },
      {
        "translation": "Một khi đã được cho phép rồi thì bạn có thể tự do làm."
      },
      {
        "translation": "Một khi đã hứa thì nhất định phải giữ lời."
      },
      {
        "translation": "Đã thi đỗ rồi thì chúng mình nhất định phải chúc mừng bạn chứ."
      }
    ]
  },
  "ko_인즉슨_58": {
    "title": "~인즉슨 (Sự tình là, ngọn ngành là, nói tóm lại là)",
    "shortExplanation": "Dùng sau một danh từ (như lý do, câu chuyện, sự tình) hoặc dùng đầu câu để mở đầu cho lời giải thích chi tiết, làm rõ chân tướng hoặc bản chất của vấn đề ('ngọn ngành câu chuyện là', 'nói tóm lại là').",
    "longExplanation": "'~인즉슨' là trợ từ dạng quán ngữ kết hợp từ trợ từ liên kết '-인즉' (vốn bắt nguồn từ trợ từ chỉ định 이다 + -ㄴ즉) và trợ từ bổ nghĩa '-은/는'. Cấu trúc này thường đi kèm sau các danh từ chỉ nguyên do hoặc nội dung như '사연인즉슨' (ngọn ngành câu chuyện là), '이유인즉슨' (lý do thực sự là), '말인즉슨' (nói tóm lại là), hoặc dùng độc lập ở đầu câu '인즉슨' để bắt đầu trình bày chi tiết nguyên do, uẩn khúc đằng sau một sự việc đã nêu trước đó. Tương đương với 'sự tình là...', 'ngọn ngành là...', 'nói rõ ra là...' trong tiếng Việt.",
    "formation": "Danh từ + 인즉슨 (thường dùng trong cụm: 사연인즉슨, 이유인즉슨, 말인즉슨; hoặc dùng đầu câu: 인즉슨, ~)",
    "examples": [
      {
        "translation": "Chúng ta cần có phương tiện giao tiếp. Nói cách khác, điều đó có nghĩa là chúng ta phải thấu hiểu suy nghĩ của nhau."
      },
      {
        "translation": "Cha tôi đã qua đời từ sớm. Nói rõ ra là tôi đã mồ côi cha từ khi còn rất nhỏ."
      },
      {
        "translation": "Anh ấy đảm nhiệm công việc này. Nói tóm lại là trách nhiệm của công việc này thuộc về anh ấy."
      },
      {
        "translation": "Tuần sau chúng ta sẽ thi. Điều đó có nghĩa là trong dịp cuối tuần này chúng ta cần phải đến thư viện để học bài."
      }
    ]
  },
  "ko_일_59": {
    "title": "~일 리가 없다 / ~(으)ㄹ 리가 없다 (Không đời nào..., làm sao có chuyện... - Phủ định chắc chắn)",
    "shortExplanation": "Dùng để phủ định mạnh mẽ một sự việc hay hành động nào đó, khẳng định rằng điều đó hoàn toàn vô lý hoặc không thể nào xảy ra ('không đời nào', 'làm sao có chuyện').",
    "longExplanation": "'~(으)ㄹ 리가 없다' là cấu trúc biểu thị sự phủ định tuyệt đối hoặc bác bỏ hoàn toàn khả năng xảy ra của một tình huống. Trong đó, '리' là danh từ phụ thuộc chỉ lý lẽ, nguyên cớ hoặc tính xác thực. Khi kết hợp với vĩ tố định ngữ thì tương lai/suy đoán '-(으)ㄹ' và tính từ phủ định '없다', cấu trúc mang nghĩa 'hoàn toàn không có lý do hay đạo lý nào để chuyện đó xảy ra', tương đương với 'không đời nào...', 'làm sao có thể...' trong tiếng Việt. Khi phủ định một sự việc trong quá khứ, cấu trúc chuyển thành '-았/었을 리가 없다'. Ngoài ra, dạng tương tự '-(으)ㄹ 일이 없다' cũng được dùng để diễn tả việc hoàn toàn không có dịp, lý do hay khả năng làm gì.",
    "formation": "Thân động từ/tính từ + -(으)ㄹ 리가 없다 (thân từ có phụ âm cuối dùng -을 리가 없다, không có phụ âm cuối hoặc có phụ âm cuối ㄹ dùng -ㄹ 리가 없다; Danh từ + -일 리가 없다)",
    "examples": [
      {
        "translation": "Anh ấy làm chuyện như vậy ư, không thể nào. Không đời nào anh ấy lại làm chuyện như thế."
      },
      {
        "translation": "Người mà tôi hiểu quá rõ như vậy thì không đời nào lại nói dối."
      },
      {
        "translation": "Hôm nay tôi bận rộn quá nên chẳng có chuyện rảnh rỗi thưởng thức phim ảnh đâu."
      },
      {
        "translation": "Không đời nào tôi lại mua chiếc xe đắt đỏ thế này, tôi đâu có nhiều tiền đến mức đó."
      }
    ]
  },
  "ko_일수록_60": {
    "title": "~(으)ㄹ수록 / ~일수록 (Càng... càng... - Mối quan hệ tỷ lệ thuận)",
    "shortExplanation": "Dùng để diễn tả mức độ của một hành động hay trạng thái ngày càng tăng tiến, kéo theo kết quả ở vế sau cũng thay đổi theo tỉ lệ thuận ('càng... càng...').",
    "longExplanation": "'~(으)ㄹ수록' là vĩ tố liên kết dùng để chỉ mối quan hệ tương hỗ hoặc tỷ lệ thuận giữa hai vế câu: khi mức độ, tần suất hay phạm vi của vế trước tăng lên hoặc biến chuyển thì trạng thái, kết quả ở vế sau cũng gia tăng hoặc biến đổi tương ứng. Thường được dịch sang tiếng Việt là 'càng... càng...'. Cấu trúc này thường đi kèm với các phó từ chỉ mức độ như '더' (hơn), '더욱' (càng thêm) ở vế sau, hoặc có thể kết hợp thành cấu trúc lặp '-으면 -(으)ㄹ수록' (nếu càng... thì càng...) để tăng cường tính nhấn mạnh.",
    "formation": "Thân động từ/tính từ + -(으)ㄹ수록 (thân từ có phụ âm cuối dùng -을수록, không có phụ âm cuối hoặc có phụ âm cuối ㄹ dùng -ㄹ수록); Danh từ + 일수록",
    "examples": [
      {
        "translation": "Thời gian càng trôi qua, tôi lại càng nhớ anh ấy nhiều hơn, vì vậy tôi đã đến thăm nơi chúng tôi từng bên nhau."
      },
      {
        "translation": "Tôi càng luyện tập tiếng Hàn nhiều thì phát âm của tôi càng tốt hơn, nhờ đó người Hàn Quốc có thể hiểu tôi rõ hơn."
      },
      {
        "translation": "Chả giò càng rán kỹ thì lại càng giòn rụm và trở nên ngon hơn."
      },
      {
        "translation": "Kinh tế càng khó khăn thì nỗi lo của mọi người càng nhiều hơn, khiến tôi không biết phải quyết định định hướng tương lai như thế nào."
      }
    ]
  },
  "ko_지_61": {
    "title": "-지 않을래(요) / ~지 않을래 (Tôi không muốn làm..., tôi sẽ không...)",
    "shortExplanation": "Vĩ tố kết thúc câu dùng để thể hiện ý định hoặc quyết định của bản thân người nói là không muốn hoặc từ chối thực hiện một hành động nào đó ('tôi không muốn...', 'tôi sẽ không...').",
    "longExplanation": "'-지 않을래' là sự kết hợp giữa vĩ tố phủ định dài '-지 않다' và vĩ tố biểu thị ý chí '-(으)ㄹ래'. Khi dùng cho ngôi thứ nhất (người nói), cấu trúc này biểu thị rõ ràng ý định, quyết tâm của người nói là chọn không làm việc đó, thường dựa trên cảm xúc, tình trạng sức khỏe hoặc sở thích cá nhân. Trong giao tiếp lịch sự thường ngày, người nói thêm tiểu từ tôn kính '-요' thành '-지 않을래요' để lời từ chối nghe hòa nhã, nhẹ nhàng và tự nhiên hơn. (Lưu ý: khi lên giọng ở cuối câu trong câu nghi vấn với ngôi thứ hai, nó có thể mang nghĩa rủ rê 'cậu có muốn cùng... không?').",
    "formation": "Thân động từ + -지 않을래(요) (chỉ kết hợp với động từ)",
    "examples": [
      {
        "translation": "Hôm nay tôi sẽ không đi tập thể dục đâu, người thấy hơi mệt mỏi nên tôi muốn nghỉ ngơi."
      },
      {
        "translation": "Vì tôi đã ăn quá no rồi nên tôi sẽ không ăn món tráng miệng đâu."
      },
      {
        "translation": "Cậu đừng quá lo lắng, còn với người đó thì tôi sẽ không thay cậu nói giúp đâu."
      },
      {
        "translation": "Bộ quần áo này tôi không ưng ý lắm nên tôi sẽ không mua đâu."
      }
    ]
  },
  "ko_지만_62": {
    "title": "~지만 (Nhưng, tuy... nhưng - Biểu thị sự tương phản, đối lập)",
    "shortExplanation": "Vĩ tố liên kết dùng để nối hai mệnh đề có ý nghĩa đối lập, tương phản hoặc nhượng bộ ('tuy... nhưng', 'nhưng mà').",
    "longExplanation": "'~지만' là một trong những vĩ tố liên kết mang ý nghĩa đối lập cơ bản và phổ biến nhất trong tiếng Hàn. Nó được dùng để liên kết hai vế câu có nội dung tương phản, trái ngược nhau hoặc vế sau nêu lên một thực tế ngoại lệ so với vế trước. Cấu trúc này có thể kết hợp trực tiếp với thì quá khứ ('-았/었지만') hoặc tương lai ('-겠지만'). Ngoài ra, nó cũng thường được sử dụng trong các cách nói xã giao lịch sự mở đầu câu (như '죄송하지만...', '실례지만...') để giảm nhẹ tính đường đột.",
    "formation": "Thân động từ/tính từ + -지만 (thì quá khứ dùng -았/었지만); Danh từ + (이)지만",
    "examples": [
      {
        "translation": "Hôm nay thời tiết đẹp nhưng gió thổi nhiều quá nên khó mà đi dã ngoại được."
      },
      {
        "translation": "Bộ phim đó thú vị thật đấy nhưng dài quá nên xem phát chán."
      },
      {
        "translation": "Bạn tôi kể chuyện đùa nhưng chẳng có ai cười cả."
      },
      {
        "translation": "Bữa trưa đó ngon đấy nhưng đắt quá nên tôi không muốn quay lại ăn lần nữa."
      }
    ]
  },
  "ko_지_63": {
    "title": "~지 않다 / ~지 못하다 (Không làm / Không thể làm - Phủ định dài ý chí và năng lực)",
    "shortExplanation": "Dùng để phủ định hành động hoặc trạng thái: '~지 않다' biểu thị phủ định thông thường hoặc không có ý định làm ('không'), còn '~지 못하다' biểu thị không có khả năng hoặc hoàn cảnh cản trở ('không thể').",
    "longExplanation": "Đây là hai hình thức phủ định dài cơ bản đứng sau thân động từ hoặc tính từ trong tiếng Hàn. '~지 않다' dùng cho phủ định khách quan hoặc chủ ý của chủ ngữ (không muốn làm hoặc sự việc đơn thuần không xảy ra). Ngược lại, '~지 못하다' biểu thị chủ ngữ dù có mong muốn nhưng do năng lực bản thân thiếu hụt hoặc do điều kiện ngoại cảnh ngăn cản nên không thể thực hiện được hành động (tương đương với 'không thể...'). Chú ý rằng tính từ thường chỉ kết hợp với '-지 않다', rất hiếm khi kết hợp với '-지 못하다' (trừ một số trường hợp đánh giá mức độ đạt tiêu chuẩn).",
    "formation": "Thân động từ/tính từ + -지 않다 (phủ định ý chí/thông thường); Thân động từ + -지 못하다 (phủ định năng lực/ngoại cảnh)",
    "examples": [
      {
        "translation": "Chúng tôi đã không thể tìm được món ăn vừa ý tại nhà hàng đó, vì vậy chúng tôi quyết định tìm nhà hàng khác."
      },
      {
        "translation": "Học sinh đó chưa hiểu vấn đề đó nên đã hỏi lại giáo viên một lần nữa."
      },
      {
        "translation": "Tối nay tôi sẽ không về nhà muộn đâu, vì tôi vẫn còn việc phải làm."
      },
      {
        "translation": "Tôi không thể xem phim mà cũng chẳng thể đọc sách. Tôi đã quá bận."
      }
    ]
  },
  "ko_지_64": {
    "title": "-(으)ㄴ 지 얼마나 되다 (Đã được bao lâu kể từ khi... - Thời gian trôi qua)",
    "shortExplanation": "Dùng để hỏi hoặc diễn tả khoảng thời gian đã trôi qua kể từ thời điểm một hành động hay sự việc nào đó bắt đầu diễn ra ('đã làm... được bao lâu rồi').",
    "longExplanation": "'-(으)ㄴ 지 얼마나 되다' là cấu trúc được tạo thành bởi vĩ tố định ngữ thì quá khứ '-(으)ㄴ', danh từ phụ thuộc '지' (chỉ mốc thời gian trôi qua) và cụm vị ngữ '얼마나 되다' (được bao lâu). Cấu trúc này dùng để hỏi hoặc trần thuật về độ dài thời gian đã trôi qua kể từ khi một sự việc bắt đầu hoặc hoàn thành trong quá khứ. Cần đặc biệt chú ý khoảng cách viết cách (cách chữ) giữa động từ định ngữ và '지' ('온 지', '만난 지'), vì '지' ở đây đóng vai trò là một danh từ phụ thuộc chỉ thời gian.",
    "formation": "Thân động từ + -(으)ㄴ 지 + 얼마나 되다 (thân từ có phụ âm cuối dùng -은 지, không có phụ âm cuối hoặc có phụ âm cuối ㄹ biến đổi dùng -ㄴ 지)",
    "examples": [
      {
        "translation": "Đã bao lâu rồi kể từ lần cuối cùng chúng ta gặp nhau nhỉ?"
      },
      {
        "translation": "Cậu đến Seoul được bao lâu rồi?"
      },
      {
        "translation": "Đã bao lâu rồi kể từ khi bạn đọc cuốn sách đó?"
      },
      {
        "translation": "Tôi đến Hàn Quốc cũng đã được một thời gian rồi mà tiếng Hàn vẫn còn khó quá."
      }
    ]
  },
  "ko_지요죠_65": {
    "title": "~지요 / ~죠 (Đúng không, chứ nhỉ - Hỏi xác nhận và tìm kiếm sự đồng tình)",
    "shortExplanation": "Vĩ tố kết thúc câu dùng khi người nói muốn xác nhận lại điều mình đã biết hoặc tìm kiếm sự đồng tình từ phía người nghe ('đúng không', 'chứ nhỉ').",
    "longExplanation": "'~지요' (khẩu ngữ thường rút gọn thành '~죠') là vĩ tố kết thúc câu thể lịch sự thân mật. Người nói sử dụng đuôi câu này khi tin rằng người nghe cũng biết hoặc đồng ý với sự thật hay quan điểm mà mình đưa ra, nhằm mục đích hỏi để xác nhận lại hoặc tạo không khí trò chuyện thân thiện, tìm kiếm sự đồng cảm. Cấu trúc này có thể dùng với mọi thì (quá khứ '-았/었지요', tương lai '-겠지요'). Trong câu hỏi, ngữ điệu lên giọng ở cuối câu; trong câu trần thuật khẳng định, ngữ điệu hạ giọng để thể hiện sự chắc chắn thân mật.",
    "formation": "Thân động từ/tính từ + -지요 (rút gọn: -죠); Danh từ + -(이)지요 (rút gọn: -(이)죠)",
    "examples": [
      {
        "translation": "Hôm nay thời tiết thật là đẹp, đúng không nhỉ?"
      },
      {
        "translation": "Bộ phim đó thực sự rất thú vị, đúng chứ?"
      },
      {
        "translation": "Ngày mai chúng ta cũng gặp nhau ở đây, đúng không ạ?"
      },
      {
        "translation": "Hình như phương pháp này là đúng rồi nhỉ?"
      }
    ]
  },
  "ko_쯤_66": {
    "title": "~쯤 (Khoảng, chừng, độ - Trợ từ ước lượng số lượng và thời gian)",
    "shortExplanation": "Trợ từ gắn sau danh từ chỉ số lượng, thời gian hoặc nơi chốn để biểu thị sự ước tính, phỏng chừng ('khoảng', 'chừng', 'độ chừng').",
    "longExplanation": "'~쯤' là trợ từ (tiểu từ) được gắn trực tiếp ngay sau danh từ (đặc biệt là các từ chỉ số lượng, đơn vị đếm, thời gian hoặc địa điểm) nhằm biểu thị con số xấp xỉ, sự ước lượng hoặc ước chừng không tuyệt đối chính xác. Tương đương với các từ 'khoảng...', 'chừng...', 'tầm...' trong tiếng Việt. Cần lưu ý viết liền trợ từ này với danh từ đứng trước theo quy tắc chính tả tiếng Hàn (ví dụ: '3시쯤', '내일쯤', '백 명쯤').",
    "formation": "Danh từ (số lượng, thời gian, đơn vị đo lường) + 쯤",
    "examples": [
      {
        "translation": "Có vẻ như chuyến bay sẽ bị hoãn khoảng 3 tiếng đồng hồ, vì vậy tôi thấy lo lắng."
      },
      {
        "translation": "Hôm nay công ty chúng tôi có khoảng 30 người đến, vì vậy chúng tôi đã đảm nhận rất nhiều công việc."
      },
      {
        "translation": "Anh ấy luôn đến sớm khoảng một tiếng để chuẩn bị, do đó lúc nào cũng hoàn thành công việc nhanh hơn người khác."
      },
      {
        "translation": "Tôi đang lên kế hoạch đi du lịch vào cuối tuần này nên hôm nay tôi định tan làm sớm khoảng một tiếng."
      }
    ]
  },
  "ko_처럼_67": {
    "title": "~처럼 (Như, giống như - Trợ từ so sánh ví von)",
    "shortExplanation": "Trợ từ gắn sau danh từ để biểu thị hình dáng, hành vi hoặc tính chất tương tự, giống như đối tượng được nêu ra ('như', 'giống như').",
    "longExplanation": "'~처럼' là trợ từ so sánh được dùng để so sánh một người, sự vật hoặc hành động với một sự vật khác có đặc tính tương đồng, tương đương với 'như...', 'giống như...' trong tiếng Việt. Cấu trúc này thường đi kèm với phó từ '마치' (cứ như thể là...) ở phía trước để tăng thêm hiệu quả tu từ, ví von sinh động. Có thể dùng thay thế tương đương với trợ từ '같이'.",
    "formation": "Danh từ + 처럼",
    "examples": [
      {
        "translation": "Cô ấy đã nhảy múa như một chú bướm. Trông cô thật xinh đẹp và nhẹ nhàng."
      },
      {
        "translation": "Anh ấy đánh bóng cứ như một tay vợt quần vợt đẳng cấp thế giới. Kỹ năng của anh ấy thực sự xuất sắc."
      },
      {
        "translation": "Bạn tốt bụng như một thiên thần vậy. Lúc nào bạn cũng cố gắng giúp đỡ người khác."
      },
      {
        "translation": "Những họa tiết hoa này lộng lẫy hệt như những bông hoa trong vườn. Chúng mang màu sắc thực sự tràn đầy sức sống."
      }
    ]
  },
  "ko_치고는_68": {
    "title": "~치고는 (So với..., xét là... thì... - So sánh với tiêu chuẩn thông thường)",
    "shortExplanation": "Trợ từ gắn sau danh từ để diễn tả rằng kết quả hay đặc tính là ngoại lệ, bất ngờ so với những gì thường được kỳ vọng ở đối tượng đó ('so với', 'xét là... thì').",
    "longExplanation": "'~치고는' là sự kết hợp giữa trợ từ '치고' với trợ từ nhấn mạnh chủ đề '는'. Cấu trúc này dùng để đặt đối tượng vào một quy chuẩn hoặc kỳ vọng chung, rồi chỉ ra rằng thực tế vượt ngoài dự kiến thông thường đó (tốt hơn mong đợi hoặc kém hơn mong đợi). Ví dụ, đối với một đứa trẻ thông thường thì không vẽ đẹp đến thế, nhưng trường hợp này lại đặc biệt xuất sắc. Tương đương với 'so với...', 'đối với...', 'xét là... thì...' trong tiếng Việt.",
    "formation": "Danh từ + 치고는",
    "examples": [
      {
        "translation": "Đối với một đứa trẻ thì tài năng vẽ tranh của bé rất xuất sắc."
      },
      {
        "translation": "So với một lớp học căn bản thì quá khó nên tất cả học viên đều cảm thấy bối rối."
      },
      {
        "translation": "Xét trong một khoảng thời gian ngắn như thế này mà xử lý được nhiều việc đến vậy thì thật đáng kinh ngạc."
      },
      {
        "translation": "Dù là người mới bắt đầu nhưng bạn đang làm khá tốt đấy."
      }
    ]
  },
  "ko_테니라고_69": {
    "title": "~(으)ㄹ 테니까 (Vì sẽ... nên..., do người nói dự đoán/dự định - Đưa ra lý do, căn cứ)",
    "shortExplanation": "Dùng để đưa ra lý do hoặc căn cứ dựa trên dự đoán chắc chắn hoặc ý định của người nói, từ đó dẫn dắt lời đề nghị, khuyên nhủ hoặc giải thích ở vế sau ('vì sẽ... nên...').",
    "longExplanation": "'~(으)ㄹ 테니까' là cấu trúc kết hợp giữa vĩ tố dự tính '-(으)ㄹ 터' với trợ từ chỉ nguyên nhân '-이니까'. Cấu trúc mang hai sắc thái ngữ nghĩa chính: (1) Biểu thị dự đoán chắc chắn của người nói về một tình huống tương lai để làm căn cứ khuyên nhủ, dặn dò người nghe ở vế sau ('chắc là sẽ... nên hãy...'); (2) Biểu thị ý chí hoặc sự chuẩn bị sẵn sàng của người nói, từ đó yêu cầu hoặc phân công người nghe thực hiện việc khác ('tôi sẽ làm việc này, nên bạn hãy...'). Lưu ý: mục từ ghi '~테니라고' là cách diễn đạt không chuẩn trong tiếng Hàn hiện đại, dạng thức chuẩn mực và tự nhiên là '~(으)ㄹ 테니까'.",
    "formation": "Thân động từ/tính từ + -(으)ㄹ 테니까 (có phụ âm cuối dùng -을 테니까, không có phụ âm cuối hoặc có phụ âm cuối ㄹ dùng -ㄹ 테니까); Danh từ + 일 테니까",
    "examples": [
      {
        "translation": "Vì đó là việc mất quá nhiều thời gian nên tôi đã tự mình làm luôn. Tôi nghĩ là chờ đợi vô ích thì việc khác cũng sẽ bị chậm trễ mất."
      },
      {
        "translation": "Bạn sẽ chiến thắng thôi nên hãy tự tin lên. Bí quyết của thành công chính là sự tự tin đấy."
      },
      {
        "translation": "Không được ăn quá nhiều đâu. Tiêu hóa sẽ không tốt đâu nên phải chú ý đấy."
      },
      {
        "translation": "Bánh đó ngọt quá nên tôi không thích. Tôi nghĩ rằng nếu quá ngọt thì răng sẽ bị sâu nên đã không ăn."
      }
    ]
  },
  "ko_텐데_70": {
    "title": "~(으)ㄹ 텐데 (Chắc là... mà..., đáng lẽ ra thì... - Phỏng đoán, giả định và tình huống đối lập)",
    "shortExplanation": "Vĩ tố liên kết diễn tả sự phỏng đoán, dự tính hoặc giả định của người nói về một sự việc, đồng thời làm bối cảnh để dẫn ra thực tế trái ngược hoặc tình huống ở vế sau ('chắc là... mà...').",
    "longExplanation": "'~(으)ㄹ 텐데' là sự kết hợp giữa hình thái biểu thị dự định, phỏng đoán '-(으)ㄹ 터' với vĩ tố liên kết tiền đề, đối lập '-인데'. Cấu trúc này thường được dùng trong các câu giả định trái thực tế (đi cùng '-았/었으면 -(으)ㄹ 텐데') để diễn đạt ý 'đáng lẽ ra đã... thế nhưng...', hoặc dùng để đưa ra sự phỏng đoán, lo lắng của người nói làm tiền đề cho câu hỏi, đề nghị ở vế sau. Quá khứ thường dùng dạng '-았/었을 텐데'.",
    "formation": "Thân động từ/tính từ + -(으)ㄹ 텐데 (quá khứ dùng -았/었을 텐데; có phụ âm cuối dùng -을 텐데, không có phụ âm cuối hoặc có phụ âm cuối ㄹ dùng -ㄹ 텐데); Danh từ + 일 텐데",
    "examples": [
      {
        "translation": "Hôm nay nếu bạn không đến thì chắc là tôi đã nổi giận rồi đấy, may mà bạn đã đến."
      },
      {
        "translation": "Nếu tôi là người không chịu nói chuyện với người lạ thì việc học ngôn ngữ chắc hẳn đã rất khó khăn rồi, may thay tôi lại không phải kiểu người như vậy."
      },
      {
        "translation": "Nếu bạn nói dối tôi thì chắc tôi đã thất vọng lắm, may mà bạn đã rất thành thật."
      },
      {
        "translation": "Nếu tôi không gặp được bạn thì việc học tiếng Hàn của tôi hẳn đã gặp muôn vàn khó khăn rồi, nhưng nhờ có bạn mà tôi đã học tốt tiếng Hàn."
      }
    ]
  },
  "ko_토록_71": {
    "title": "~토록 / ~도록 / ~(으)ㄹ 정도로 (Đến mức, đến độ... - Nhấn mạnh mức độ và giới hạn)",
    "shortExplanation": "Vĩ tố hoặc cấu trúc phụ ngữ dùng để biểu thị mức độ, giới hạn thời gian hoặc kết quả của một trạng thái đạt đến mức cực độ ('đến mức...', 'cho đến tận...').",
    "longExplanation": "'~토록' là vĩ tố liên kết (hoặc trợ từ gắn sau danh từ chỉ thời gian) mang tính văn phong nhấn mạnh, dùng để biểu thị một hành động hoặc trạng thái đạt đến giới hạn cao độ hoặc kéo dài đến tận một mốc thời gian nào đó (như '밤이 새도록 / 밤새도록' - cho đến tận sáng, '지치도록' - đến mức kiệt sức). Trong khẩu ngữ và ngữ pháp thông dụng, nó đồng nghĩa và thường được dùng tương đương với '~도록' hoặc cụm cấu trúc phụ ngữ '-(으)ㄹ 정도로' (đến mức độ mà...). Cả hai đều nhấn mạnh kết quả hoặc mức độ sâu sắc của hành vi.",
    "formation": "Thân động từ/tính từ + -토록 (hoặc -도록 / -(으)ㄹ 정도로); Danh từ thời gian + 토록",
    "examples": [
      {
        "translation": "Những người từng nghe âm nhạc của anh ấy đều ngạc nhiên trước âm nhạc của anh đến mức không thể hiểu nổi làm sao anh có thể tạo ra được thứ âm nhạc tuyệt vời đến vậy."
      },
      {
        "translation": "Tòa nhà cao đến nỗi mỗi khi nhìn xuống mặt đất là toàn thân tôi lại run lên bần bật."
      },
      {
        "translation": "Cho đến tận thời trung học phổ thông, đầu óc tôi vẫn đủ thông minh để giải quyết các bài toán hóc búa."
      },
      {
        "translation": "Cuốn sách tiếng Hàn đó khó đến mức tôi chẳng thể hiểu nổi một câu nào."
      }
    ]
  },
  "ko_하게_72": {
    "title": "~게 하다 / ~하게 (Làm cho, khiến cho, bảo làm... - Sai khiến và tạo điều kiện)",
    "shortExplanation": "Cấu trúc sai khiến và mục đích, dùng để diễn tả việc khiến cho, bắt buộc hoặc tạo điều kiện cho ai đó thực hiện một hành động nào đó ('bắt làm', 'khiến cho', 'để cho').",
    "longExplanation": "'~게 하다' là cấu trúc sai khiến gián tiếp được cấu tạo từ vĩ tố phụ từ hóa '-게' kết hợp với động từ '하다' (hoặc '만들다', '시키다'). Cấu trúc này biểu thị chủ ngữ tác động, sai khiến, thúc ép hoặc cho phép một đối tượng khác thực hiện hành động hay chuyển sang một trạng thái nào đó. Khi dùng độc lập ở dạng '-게' trước một mệnh đề hành động (như '이해하게 설명하다'), nó đóng vai trò trạng ngữ chỉ mục đích hoặc cách thức ('giải thích sao cho hiểu').",
    "formation": "Thân động từ/tính từ + -게 하다 (hoặc Thân động từ/tính từ + -게)",
    "examples": [
      {
        "translation": "Giáo viên đã giải thích để học sinh có thể hiểu rõ bài tập về nhà."
      },
      {
        "translation": "Mẹ bắt tôi phải dọn dẹp phòng ngủ mỗi ngày."
      },
      {
        "translation": "Anh ta đã cố khiến tôi chấp nhận quyết định của mình."
      },
      {
        "translation": "Tôi muốn tạo ra một trò chơi giúp trẻ em suy nghĩ sáng tạo hơn."
      }
    ]
  },
  "ko_하고나서_73": {
    "title": "~고 나서 / ~하고 나서 (Sau khi làm xong... thì... - Trình tự hành động hoàn tất)",
    "shortExplanation": "Vĩ tố liên kết dùng để diễn tả một hành động ở vế trước đã được hoàn thành trọn vẹn rồi mới tiếp tục thực hiện hành động ở vế sau ('sau khi làm xong...').",
    "longExplanation": "'~고 나서' là sự kết hợp giữa vĩ tố liên kết '-고' với động từ bổ trợ '나다' (chỉ sự hoàn tất, xong xuôi) chia theo dạng '-어서'. Cấu trúc này nhấn mạnh tính hoàn thành triệt để của hành động đi trước: phải làm xong xuôi việc thứ nhất thì mới chuyển sang làm việc thứ hai. So với việc chỉ dùng đơn thuần '-고', cấu trúc '~고 나서' làm nổi bật rõ ràng hơn ranh giới kết thúc của hành động trước trong chuỗi thời gian.",
    "formation": "Thân động từ + -고 나서 (với động từ kết thúc bằng 하다 là -하고 나서)",
    "examples": [
      {
        "translation": "Sau khi về nhà và tắm rửa xong xuôi, tôi đã bắt đầu ngồi vào học."
      },
      {
        "translation": "Sau khi đi học về và hoàn thành xong bài tập về nhà, tôi đã đi gặp bạn bè."
      },
      {
        "translation": "Sau khi thái nhỏ nguyên liệu xong, tôi đã bắt đầu nấu nướng."
      },
      {
        "translation": "Sau khi tập thể dục xong, tôi đã tắm qua một chút rồi ăn cơm."
      }
    ]
  },
  "ko_하고는_74": {
    "title": "~하고는 / ~고는 (Làm gì xong rồi thì..., sau đó thì... - Thứ tự hành động tiếp nối)",
    "shortExplanation": "Vĩ tố liên kết dùng để nối hai hành động theo trình tự thời gian, biểu thị sau khi hoàn tất hành động phía trước thì tiếp tục thực hiện hành động phía sau ('rồi thì', 'sau khi... thì').",
    "longExplanation": "'~고는' (kết hợp với động từ có đuôi '하다' là '~하고는') là vĩ tố liên kết được hình thành từ vĩ tố nối tiếp '-고' kết hợp cùng tiểu từ bổ trợ nhấn mạnh '-는'. Cấu trúc này dùng để diễn đạt trình tự hành vi rõ ràng: chủ ngữ sau khi hoàn tất một hành động ở vế trước thì liền chuyển sang thực hiện hành động kế tiếp ở vế sau. Ngoài việc diễn tả thói quen sinh hoạt theo trình tự thời gian ('làm A rồi làm B'), cấu trúc này còn thường được dùng khi một sự việc bất ngờ hoặc một trạng thái tâm lý mới xuất hiện ngay sau khi kết thúc hành động trước đó.",
    "formation": "Thân động từ + -고는 (Thân động từ kết thúc bằng 하다 + -고는 thành 하고는)",
    "examples": [
      {
        "translation": "Mỗi buổi sáng tôi thức dậy, tập thể dục xong rồi thì đi tắm."
      },
      {
        "translation": "Cô ấy đọc sách xong rồi thì luyện viết."
      },
      {
        "translation": "Anh ấy đến trường, nghe giảng xong rồi thì tự học."
      },
      {
        "translation": "Chúng tôi đi máy bay, sau khi đến Seoul thì đã nghỉ ngơi."
      }
    ]
  },
  "ko_하구나_75": {
    "title": "~하구나 / ~구나 / ~는구나 (Hóa ra là..., thì ra là... - Cảm thán ngộ ra sự việc)",
    "shortExplanation": "Vĩ tố kết thúc câu cảm thán dùng khi người nói đột nhiên nhận ra, thấu hiểu hoặc vỡ lẽ một sự thật mà trước đó chưa biết ('thì ra là...', 'hóa ra là...').",
    "longExplanation": "'-구나' (với tính từ/động từ thì hiện tại hay quá khứ, ví dụ như tính từ kết hợp '-구나', động từ kết hợp '-는구나', hoặc cấu trúc '-는 거였구나' / '-았/었던 거였구나') là vĩ tố kết thúc câu cảm thán thuộc phong cách thân mật hoặc độc thoại. Người nói sử dụng cấu trúc này để bộc lộ cảm xúc ngạc nhiên, thán phục hoặc giác ngộ tại thời điểm vừa mới phát hiện ra một sự thật khách quan, một nguyên nhân hay một bản chất mà trước đó bản thân chưa từng hay biết.",
    "formation": "Tính từ + -구나; Động từ + -는구나 (với động từ đuôi 하다 là -하는구나); Động từ/Tính từ quá khứ + -았/었구나; Danh từ + -(이)구나; Dạng vỡ lẽ nguyên nhân: Động từ + -(으)ㄴ/는 거였구나, Danh từ + -(이)었던 거였구나",
    "examples": [
      {
        "translation": "Thì ra là vì bận quá nên không liên lạc được, thế cũng hợp lý thôi."
      },
      {
        "translation": "Hóa ra lý do hôm nay mình thấy vui vẻ chính là vì điều đó, là do thời tiết đẹp."
      },
      {
        "translation": "Ồ, hóa ra là làm như thế này! Mình hiểu hết rồi."
      },
      {
        "translation": "Thì ra người đó thực sự thích cậu à, mình không hề biết đấy."
      }
    ]
  },
  "ko_하다가_76": {
    "title": "~하다가 / ~다가 (Đang làm gì thì... - Hành động đang diễn ra bị gián đoạn hoặc chuyển tiếp)",
    "shortExplanation": "Vĩ tố liên kết dùng để diễn tả một hành động hay trạng thái đang diễn ra thì bị ngắt quãng, hoặc chuyển hướng sang một hành động, sự việc khác ('đang... thì...').",
    "longExplanation": "'~다가' (với các động từ đuôi '하다' là '~하다가') là vĩ tố liên kết chỉ sự gián đoạn hoặc chuyển hướng hành động. Cấu trúc diễn tả việc chủ ngữ đang trong quá trình thực hiện một hành động nào đó thì dừng lại giữa chừng do một sự việc bất ngờ xảy ra chen ngang, hoặc chủ ngữ tự ý chuyển đổi sang một hành động hoàn toàn mới. Thường được dịch sang tiếng Việt là 'đang... thì...'. Chủ ngữ của hai vế trong câu thường phải đồng nhất.",
    "formation": "Thân động từ/tính từ + -다가 (Thân động từ kết thúc bằng 하다 + -다가 thành 하다가)",
    "examples": [
      {
        "translation": "Tôi đang đọc sách thì buồn ngủ quá nên đã ngủ thiếp đi."
      },
      {
        "translation": "Cậu ấy đang chơi game thì bị mẹ bảo tạm dừng lại một lát."
      },
      {
        "translation": "Tôi đang nói chuyện với bạn thì chuông đột nhiên reo lên nên chúng tôi phải ngừng cuộc trò chuyện."
      },
      {
        "translation": "Tôi đang học bài thì thấy một bài báo thú vị nên đã bắt đầu đọc nó."
      }
    ]
  },
  "ko_하다못해_77": {
    "title": "~하다못해 / ~다 못해 (Quá mức đến nỗi không chịu nổi..., đến cực điểm là... - Mức độ vượt quá giới hạn)",
    "shortExplanation": "Cấu trúc liên kết dùng để nhấn mạnh một trạng thái hay hành động đã chạm đến cực điểm, vượt quá mức chịu đựng thông thường dẫn đến kết quả tiêu cực hoặc ngỡ ngàng ('quá mức đến nỗi...', '...không nổi nữa nên...').",
    "longExplanation": "'~다 못해' (với các từ có đuôi '하다' là '~하다못해') là cấu trúc kết hợp giữa vĩ tố liên kết '-다' và thể phủ định '못하다' (ở dạng liên kết '못해'). Cấu trúc này biểu thị một trạng thái tâm lý, cảm giác hoặc tính chất sự vật đã phát triển tới mức tột cùng, không còn có thể duy trì hay kiềm chế thêm được nữa, buộc phải chuyển sang một trạng thái khác hoặc dẫn đến một kết cục bất đắc dĩ, tiêu cực. Thường tương đương với 'quá... đến mức...', 'chịu không nổi nữa nên...' trong tiếng Việt.",
    "formation": "Thân động từ/tính từ + -다 못해 (với tính từ/động từ kết thúc bằng 하다 là -하다 못해 hoặc viết liền 하다못해)",
    "examples": [
      {
        "translation": "Bài phát biểu của ông ấy nhàm chán đến mức mọi người ngủ gục hết cả."
      },
      {
        "translation": "Ngôi làng nhỏ này vắng vẻ đến nỗi đi dạo mà chẳng thấy bóng người, cảm giác thật cô quạnh."
      },
      {
        "translation": "Hôm nay tôi mệt mỏi đến rã rời, về đến nhà là lăn ra ngủ ngay lập tức."
      },
      {
        "translation": "Món ăn cô ấy nấu dở đến mức mọi người chẳng thể ăn hết mà phải bỏ dở."
      }
    ]
  },
  "ko_하던_78": {
    "title": "~하던 중에 / ~던 중에 (Trong lúc đang dở..., giữa chừng khi đang... - Sự việc xen ngang hành động hồi tưởng)",
    "shortExplanation": "Cấu trúc dùng để diễn tả một sự việc mới bất ngờ xảy ra ngay trong lúc một hành động khác đang diễn ra dở dang trong quá khứ ('trong lúc đang...', 'giữa chừng khi đang...').",
    "longExplanation": "'~던 중에' (kết hợp với các động từ đuôi '하다' là '~하던 중에') cấu tạo từ vĩ tố định ngữ hồi tưởng '-던' biểu thị hành động đang dở dang hoặc từng diễn ra liên tục trong quá khứ, kết hợp với danh từ phụ thuộc '중' (ở giữa) và trợ từ chỉ thời điểm '에'. Cấu trúc này diễn tả tình huống khi chủ ngữ đang trong quá trình thực hiện một việc gì đó thì một sự việc khác bất ngờ xảy đến hoặc chen ngang. Tương đương với 'trong lúc đang...', 'giữa chừng khi đang...' trong tiếng Việt.",
    "formation": "Thân động từ + -던 중에 (Thân động từ kết thúc bằng 하다 + -던 중에 thành 하던 중에)",
    "examples": [
      {
        "translation": "Trong lúc tôi đang đọc sách dở thì bạn gọi điện rồi ghé qua chơi."
      },
      {
        "translation": "Đang nghe nhạc thì tôi bắt gặp một bài hát rất hợp tâm trạng nên cảm thấy thật hạnh phúc."
      },
      {
        "translation": "Trong lúc tôi đang xem phim truyền hình thì chị gái đột nhiên về nhà khiến tôi giật cả mình."
      },
      {
        "translation": "Giữa lúc tôi đang tập thể dục thì trời bất chợt đổ mưa nên đành phải dừng lại và đi về nhà."
      }
    ]
  },
  "ko_하기는_79": {
    "title": "~하기는 / ~기는 하다/했지만 (Công nhận là... thật đấy nhưng mà... - Thừa nhận và nhượng bộ tương phản)",
    "shortExplanation": "Cấu trúc dùng để thừa nhận một sự thật hay tính chất ở vế trước nhưng vế sau lại đưa ra một nhận định, kết quả trái ngược hoặc hạn chế ('thì có... thật nhưng...', 'công nhận là... nhưng...').",
    "longExplanation": "'~기는 하다' (dạng liên kết là '~기는 하지만', với động từ đuôi '하다' là '~하기는 하지만') là cấu trúc nhượng bộ được tạo thành từ vĩ tố danh từ hóa '-기', tiểu từ đối chiếu/nhấn mạnh '-는' và trợ động từ/tính từ '하다'. Người nói dùng cấu trúc này để công nhận một phần tính xác thực của sự việc hay ưu điểm được nhắc đến ở vế trước, nhưng ngay sau đó ở vế sau lại đưa ra một mặt hạn chế, khiếm khuyết hoặc ý kiến tương phản. Thường được dịch sang tiếng Việt là '...thì có... thật nhưng...', 'công nhận là... đấy nhưng...'.",
    "formation": "Thân động từ/tính từ + -기는 하다 / -기는 하지만 (thân từ kết thúc bằng 하다 + -기는 하다/하지만 thành 하기는 하다/하지만)",
    "examples": [
      {
        "translation": "Bộ phim đó hay thì có hay thật đấy nhưng vì tôi kỳ vọng quá nhiều nên hơi thất vọng một chút."
      },
      {
        "translation": "Bánh kem ngon thì ngon thật nhưng ngọt quá nên tôi không thể ăn hết được."
      },
      {
        "translation": "Anh ấy tính tình tốt thì tốt thật nhưng có xu hướng hơi chậm chạp."
      },
      {
        "translation": "Món quà này có giá trị thì có giá trị thật nhưng lại không hợp với trang phục của tôi."
      }
    ]
  },
  "ko_하기로_80": {
    "title": "~하기로 / ~기로 하다/결정하다 (Quyết định làm gì, thống nhất làm gì - Biểu thị quyết định và cam kết)",
    "shortExplanation": "Cấu trúc dùng để biểu thị việc người nói hoặc một nhóm người đã đưa ra quyết định, thống nhất hoặc hứa hẹn sẽ thực hiện một hành động nào đó ('quyết định làm...', 'hẹn làm...').",
    "longExplanation": "'~기로 하다' (thường kết hợp với các động từ đuôi '하다' thành '~하기로 하다', hoặc mở rộng thành '~기로 결정하다', '~기로 약속하다') được hình thành từ vĩ tố danh từ hóa '-기', trợ từ phương hướng/kết quả '-로' và động từ '하다'. Cấu trúc này dùng để diễn đạt một kế hoạch hành động đã được quyết định cụ thể, có thể là quyết tâm của một cá nhân hoặc thỏa thuận chung giữa hai người trở lên. Khi dùng ở thì quá khứ '-기로 했다', nó diễn tả sự việc đã được thống nhất hoặc chốt phương án trước đó.",
    "formation": "Thân động từ + -기로 하다 / -기로 결정하다 (Thân động từ kết thúc bằng 하다 + -기로 하다 thành 하기로 하다)",
    "examples": [
      {
        "translation": "Chúng tôi đã quyết định gặp nhau vào chiều mai. Giờ giấc của mọi người đều khớp nên đã sắp xếp được lịch trình bận rộn."
      },
      {
        "translation": "Tôi đã quyết định sang năm sẽ chuyển đến Hàn Quốc sống, vì vậy hiện tại tôi đang dốc sức học tiếng Hàn."
      },
      {
        "translation": "Cô ấy đã quyết định tuần sau sẽ kết hôn nên hiện đang tìm kiếm váy cưới."
      },
      {
        "translation": "Tôi đã thống nhất cùng bạn bè đi biển vào mùa hè, thế nên từ bây giờ tôi định sẽ đi mua đồ bơi."
      }
    ]
  },
  "ko_하기에_81": {
    "title": "~하기에 / ~기에 (Vì..., do... / Xét thấy... nên - Nêu lý do và căn cứ phán đoán)",
    "shortExplanation": "Vĩ tố liên kết dùng để nêu nguyên nhân, lý do hoặc căn cứ thực tế dẫn đến kết quả hay phán đoán ở vế sau ('vì...', 'do...', 'xét thấy...').",
    "longExplanation": "'~기에' (với các động từ/tính từ có đuôi '하다' là '~하기에') là vĩ tố liên kết được hình thành từ vĩ tố danh từ hóa '-기' kết hợp cùng trợ từ chỉ nguyên nhân/căn cứ '-에'. Cấu trúc này dùng để nêu lên lý do, tiền đề khách quan hoặc cơ sở thực tế mà người nói dựa vào đó để đưa ra phán đoán, hành động hay kết luận ở mệnh đề tiếp theo. Cấu trúc này mang sắc thái trang trọng, khách quan và thường xuất hiện trong văn viết hoặc văn phong lịch sự, tao nhã hơn so với '-아서/어서' hay '-(으)니까'.",
    "formation": "Thân động từ/tính từ + -기에 (thân từ kết thúc bằng 하다 + -기에 thành 하기에)",
    "examples": [
      {
        "translation": "Hôm nay vì thời tiết rất đẹp nên là một ngày tuyệt vời để đi dạo."
      },
      {
        "translation": "Do cậu ấy học giỏi nên luôn nhận được lời khen ngợi từ thầy cô."
      },
      {
        "translation": "Vì tình hình giao thông của thành phố này rất phức tạp nên việc lái xe ô tô đi lại khá là khó khăn."
      },
      {
        "translation": "Vì cô ấy ghét tôi nên tôi không còn liên lạc với cô ấy nữa."
      }
    ]
  },
  "ko_하려고_82": {
    "title": "~하려고 하다 / ~(으)려고 하다 (Định làm gì, có ý định làm gì - Biểu thị ý định và kế hoạch)",
    "shortExplanation": "Cấu trúc dùng để biểu đạt ý định, kế hoạch hoặc nỗ lực hướng tới việc thực hiện một hành động của chủ ngữ ('định...', 'có ý định...').",
    "longExplanation": "'~(으)려고 하다' (với động từ đuôi '하다' là '~하려고 하다') là cấu trúc ngữ pháp thông dụng dùng để diễn tả ý định, dự tính hoặc ý chí của chủ ngữ chuẩn bị tiến hành một hành động nào đó. Ngoài ra, khi nói về một sự biến chuyển của hiện tượng khách quan (ví dụ: trời sắp mưa), cấu trúc còn mang nghĩa là sự việc sắp sửa xảy ra. Trong các trường hợp nỗ lực thực hiện, cấu trúc tương đương với 'định làm gì', 'cố gắng làm gì' trong tiếng Việt.",
    "formation": "Thân động từ + -(으)려고 하다 (thân động từ có phụ âm cuối dùng -으려고 하다, không có phụ âm cuối hoặc có phụ âm cuối ㄹ dùng -려고 하다; động từ kết thúc bằng 하다 dùng -하려고 하다)",
    "examples": [
      {
        "translation": "Tôi định mỗi ngày đọc sách khoảng hai mươi phút, vì tôi đang cố gắng biến việc đọc sách thành thói quen."
      },
      {
        "translation": "Anh ấy định đọc tạp chí để tìm kiếm một công việc tốt."
      },
      {
        "translation": "Chúng tôi đã cố gắng trò chuyện với nhau để giải quyết mâu thuẫn, nhưng rốt cuộc đã không thành công."
      },
      {
        "translation": "Chị gái tôi đã nỗ lực mỗi ngày để dạy toán cho em."
      }
    ]
  },
  "ko_할_83": {
    "title": "~할 때마다 / ~(으)ㄹ 때마다 (Mỗi khi, mỗi lần... - Sự lặp lại có tính quy luật)",
    "shortExplanation": "Cấu trúc dùng để biểu thị mỗi khi một thời điểm, điều kiện hay hành động nào đó diễn ra thì một hành động hoặc trạng thái khác lại lặp lại một cách đều đặn ('mỗi khi', 'mỗi lần...').",
    "longExplanation": "'~(으)ㄹ 때마다' (với động từ đuôi '하다' là '~할 때마다') được kết hợp từ vĩ tố định ngữ tương lai/suy đoán '-(으)ㄹ', danh từ phụ thuộc '때' (khi, lúc) và trợ từ bổ trợ '마다' (mỗi, mọi). Cấu trúc này dùng để nhấn mạnh tính lặp lại có quy luật: bất cứ lúc nào điều kiện ở vế trước phát sinh thì sự việc ở vế sau cũng diễn ra đồng thời hoặc kéo theo. Thường đi kèm với các phó từ như '항상' (luôn luôn), '매번' (mỗi lần) hoặc cấu trúc thói quen '-곤 하다'.",
    "formation": "Thân động từ/tính từ + -(으)ㄹ 때마다 (thân từ có phụ âm cuối dùng -을 때마다, không có phụ âm cuối hoặc có phụ âm cuối ㄹ dùng -ㄹ 때마다; động từ kết thúc bằng 하다 thành 할 때마다); Danh từ + 때마다",
    "examples": [
      {
        "translation": "Cứ mỗi độ thu về, tôi lại nhớ về quê hương và thường hay cất tiếng hát."
      },
      {
        "translation": "Mỗi khi nhớ đến cô ấy, anh ấy lại thường ghi chép những bài hát về cô vào cuốn sổ tay."
      },
      {
        "translation": "Mỗi lần kỳ thi đến, mẹ luôn nấu cho tôi những món ăn thật ngon và bổ dưỡng."
      },
      {
        "translation": "Mỗi lần nhìn thấy cô ấy, tim tôi lại đập thình thịch."
      }
    ]
  },
  "ko_하면_84": {
    "title": "~하면 할수록 / ~(으)면 ~(으)ㄹ수록 (Càng... thì càng... - Tương quan tỷ lệ thuận tăng tiến)",
    "shortExplanation": "Cấu trúc lặp dùng để diễn tả mức độ của hành động hoặc trạng thái ở vế trước càng gia tăng thì kết quả ở vế sau cũng thay đổi tương ứng theo tỷ lệ thuận ('càng... thì càng...').",
    "longExplanation": "'~(으)면 ~(으)ㄹ수록' (với các động từ/tính từ có đuôi '하다' là '~하면 할수록') là cấu trúc nhấn mạnh kết hợp giữa vĩ tố giả định điều kiện '-(으)면' và vĩ tố liên kết tăng tiến '-(으)ㄹ수록'. Cấu trúc này làm nổi bật mối quan hệ tỷ lệ thuận: khi một hành vi, sự rèn luyện hay điều kiện nào đó càng được đẩy mạnh hoặc tích lũy theo thời gian thì mức độ, chất lượng hay biến đổi ở vế sau lại càng trở nên rõ rệt hơn. Thường được dịch là 'càng... thì càng...' trong tiếng Việt.",
    "formation": "Thân động từ/tính từ + -(으)면 + Thân từ + -(으)ㄹ수록 (thân từ có phụ âm cuối dùng -으면 -을수록, không có phụ âm cuối hoặc có phụ âm cuối ㄹ dùng -면 -ㄹ수록; từ kết thúc bằng 하다 dùng -하면 할수록)",
    "examples": [
      {
        "translation": "Trời càng ấm lên bao nhiêu thì hoa lại càng nở rộ bấy nhiêu."
      },
      {
        "translation": "Càng học chăm chỉ bao nhiêu thì xác suất thi đỗ lại càng cao bấy nhiêu."
      },
      {
        "translation": "Càng chăm chỉ tập thể dục thì tôi lại càng cảm thấy cơ thể khỏe khoắn hơn."
      },
      {
        "translation": "Càng luyện tập nấu nướng nhiều thì tay nghề lại càng được nâng cao."
      }
    ]
  },
  "ko_하면서_85": {
    "title": "~하면서 / ~(으)면서 (Vừa... vừa... - Hai hành động diễn ra đồng thời)",
    "shortExplanation": "Vĩ tố liên kết dùng để nối hai hành động diễn ra cùng một lúc do cùng một chủ ngữ thực hiện ('vừa... vừa...').",
    "longExplanation": "'~(으)면서' (với động từ đuôi '하다' là '~하면서') là vĩ tố liên kết biểu thị sự đồng thời của hai hay nhiều hành động. Nó chỉ ra rằng chủ ngữ đang tiến hành hai công việc song song cùng một lúc. Ngoài ý nghĩa đồng thời, cấu trúc này đôi khi còn được dùng để chỉ sự tồn tại đồng thời của hai trạng thái, hoặc diễn tả sự mâu thuẫn giữa hai hành vi (với ý nghĩa 'thế mà lại...'). Thường tương đương với 'vừa... vừa...' trong tiếng Việt.",
    "formation": "Thân động từ/tính từ + -(으)면서 (thân từ có phụ âm cuối dùng -으면서, không có phụ âm cuối hoặc có phụ âm cuối ㄹ dùng -면서; động từ kết thúc bằng 하다 dùng -하면서)",
    "examples": [
      {
        "translation": "Tôi vừa đeo kính vừa đọc sách nên đã có thể đọc rất thoải mái."
      },
      {
        "translation": "Tôi vừa nghe nhạc vừa làm bài tập về nhà nên không cảm thấy nhàm chán."
      },
      {
        "translation": "Tôi vừa uống cà phê vừa làm việc ở quán cà phê nên đã có thể tập trung một cách rất tĩnh lặng."
      },
      {
        "translation": "Vừa lái xe vừa hát rất là thích, vì thế mà việc lái xe chẳng còn buồn tẻ chút nào."
      }
    ]
  },
  "ko_하시겠습니까_86": {
    "title": "~하시겠습니까? / ~(으)시겠습니까? (Ngài/Quý khách có muốn...? / Xin vui lòng...? - Hỏi ý và đề nghị cực kỳ trang trọng, tôn kính)",
    "shortExplanation": "Vĩ tố kết thúc câu nghi vấn kính ngữ cao cấp dùng để dò hỏi ý định, đề nghị hoặc yêu cầu người nghe một cách vô cùng lịch sự và trang trọng ('ngài có muốn...', 'quý khách có thể vui lòng...').",
    "longExplanation": "'~(으)시겠습니까?' (với các động từ đuôi '하다' là '~하시겠습니까?') là sự kết hợp giữa tiền vĩ tố kính ngữ chủ thể '-(으)시-', tiền vĩ tố biểu thị ý chí/hỏi ý lịch sự '-겠-' và đuôi câu nghi vấn trang trọng thể Hasipsio '-습니까?'. Mẫu câu này được dùng trong các tình huống đòi hỏi tính nghi thức cao như hội nghị, dịch vụ khách hàng, đàm phán kinh doanh hoặc khi trò chuyện với người bề trên, khách quý nhằm dò hỏi ý muốn của đối phương hoặc đưa ra một lời thỉnh cầu đầy nhã nhặn.",
    "formation": "Thân động từ + -(으)시겠습니까? (thân từ có phụ âm cuối dùng -으시겠습니까?, không có phụ âm cuối dùng -시겠습니까?; động từ kết thúc bằng 하다 thành 하시겠습니까?)",
    "examples": [
      {
        "translation": "Ngài có muốn cùng dùng bữa tối không ạ?"
      },
      {
        "translation": "Xin quý khách vui lòng kiểm tra lại tài liệu này giúp tôi được không ạ?"
      },
      {
        "translation": "Quý vị sẽ tham dự hội nghị lần này chứ ạ?"
      },
      {
        "translation": "Xin vui lòng xem xét bản đề xuất này giúp tôi có được không ạ?"
      }
    ]
  },
  "ko_하자_87": {
    "title": "~하자 / ~자마자 (1. Hãy cùng làm... [Rủ rê thân mật] / 2. Vừa mới... là... ngay [Hành động nối tiếp tức thì])",
    "shortExplanation": "Có hai cách dùng chính: 1. Vĩ tố kết thúc câu thỉnh dụ thân mật ('chúng mình cùng... đi'); 2. Vĩ tố liên kết chỉ hành động xảy ra ngay tức thì sau hành động trước ('ngay khi vừa... thì...').",
    "longExplanation": "'~하자' (kết hợp với động từ nói chung là '-자' hoặc '-자마자') là một hình thái ngữ pháp đa dụng trong tiếng Hàn: 1) Ở cuối câu, '-자' là vĩ tố kết thúc câu thỉnh dụ dạng thân mật, dùng giữa bạn bè hoặc người dưới để rủ rê cùng làm gì đó ('chúng mình cùng làm... nhé/đi'); 2) Ở giữa câu kết nối hai mệnh đề, dạng '-자' hoặc đầy đủ là '-자마자' đóng vai trò là vĩ tố liên kết chỉ thời gian tức thì, biểu thị ngay sau khi hành động ở vế trước vừa dứt điểm thì hành động hoặc biến cố ở vế sau lập tức xảy ra ngay ('vừa mới... đã...', 'ngay sau khi...').",
    "formation": "1. Thỉnh dụ: Thân động từ + -자 (với động từ đuôi 하다 là -하자); 2. Nối tiếp tức thì: Thân động từ + -자마자 (hoặc -자)",
    "examples": [
      {
        "translation": "Thời tiết đẹp thật đấy, chúng mình cùng ra ngoài đi dạo đi."
      },
      {
        "translation": "Ngay khi ăn tối xong là tôi phải gọi điện cho bạn ngay."
      },
      {
        "translation": "Tôi muốn đi du lịch ngay sau khi kỳ thi vừa kết thúc."
      },
      {
        "translation": "Chúng mình cùng xem bộ phim này đi, cậu sẽ không hối hận đâu."
      }
    ]
  },
  "ko_하여_88": {
    "title": "~하여 / ~해서 (Vì... nên..., do... nên... / Làm gì rồi... - Thể văn viết trang trọng của -아서/어서)",
    "shortExplanation": "Vĩ tố liên kết dùng để chỉ nguyên nhân, lý do hoặc thứ tự hành động, là hình thái văn viết trang trọng của gốc từ '하다' kết hợp với '-여(서)' ('do...', 'vì...', 'làm gì rồi...').",
    "longExplanation": "'~하여' (dạng khẩu ngữ thông dụng là '~해서', dạng đầy đủ là '~하여서') là hình thái liên kết của động từ '하다' khi kết hợp với vĩ tố liên kết '-아/어/여(서)'. Cấu trúc này thường được sử dụng trong văn viết, bài phát biểu trang trọng, tin tức báo chí hoặc tài liệu học thuật để trình bày nguyên nhân - kết quả ('vì... nên...'), phương thức thực hiện hoặc thứ tự hành động tiếp nối. Trong văn viết chuẩn, cấu trúc đem lại sắc thái trang trọng, khúc chiết và nghiêm túc hơn nhiều so với dạng khẩu ngữ thường ngày.",
    "formation": "Động từ/Tính từ đuôi 하다 + -여 thành 하여 (Dạng đầy đủ: 하여서; Dạng khẩu ngữ: 해서)",
    "examples": [
      {
        "translation": "Do thức dậy muộn nên tôi đã đến trường trễ."
      },
      {
        "translation": "Cô ấy vì quá mệt mỏi nên không còn sức để gượng dậy nổi nữa."
      },
      {
        "translation": "Vì quá bận rộn với công việc ở công ty nên tôi đành phải hủy cuộc hẹn với bạn bè."
      },
      {
        "translation": "Thời tiết quá đỗi lạnh giá nên tôi đã không ra ngoài mà ở lại trong nhà."
      }
    ]
  },
  "ko_하여야_89": {
    "title": "~하여야 / ~아/어야 (Phải... mới được, phải... thì mới... - Điều kiện bắt buộc, nghĩa vụ)",
    "shortExplanation": "Dùng để biểu thị một hành động hay trạng thái là điều kiện bắt buộc, tất yếu để đạt được kết quả ở vế sau, hoặc biểu thị nghĩa vụ, bổn phận phải thực hiện ('phải... mới...').",
    "longExplanation": "'~하여야' (hoặc dạng phổ biến hơn là '~아/어야') là vĩ tố liên kết biểu thị điều kiện bắt buộc hoặc điều kiện thiết yếu. Nó diễn tả rằng hành động hay trạng thái ở mệnh đề trước là điều kiện tiên quyết, bắt buộc phải xảy ra hoặc phải được thỏa mãn thì hành động, kết quả ở mệnh đề sau mới có thể thực hiện hay xuất hiện được. Cấu trúc này thường đi kèm với '-아/어야 하다/되다' để biểu đạt nghĩa vụ ('phải làm gì') hoặc kết hợp thành cấu trúc điều kiện '-아/어야 -(으)ㄹ 수 있다' ('phải... thì mới có thể...'). So với '-아야/어야', dạng '-하여야' mang sắc thái trang trọng, văn viết hoặc nhấn mạnh hơn.",
    "formation": "Thân động từ/tính từ + -아/어야 (kết thúc bằng nguyên âm ㅏ, ㅗ dùng -아야; các nguyên âm khác dùng -어야; 하다 biến thành 하여야 hoặc 해야)",
    "examples": [
      {
        "translation": "Học tập chăm chỉ thì thành tích mới tốt lên được, vì thế ngày nào cũng phải học hành chăm chỉ."
      },
      {
        "translation": "Để nấu ăn ngon cần phải chuẩn bị trước nguyên liệu, chính vì vậy phải bắt tay vào bếp từ sớm."
      },
      {
        "translation": "Mỗi ngày phải tập thể dục thì mới duy trì được sức khỏe, do đó sáng nào cũng phải đi dạo."
      },
      {
        "translation": "Để ngăn ngừa tai nạn giao thông, chúng ta phải tuân thủ nghiêm ngặt luật lệ và còn phải hết sức cẩn thận nữa."
      }
    ]
  },
  "ko_하자마자_90": {
    "title": "~하자마자 / ~자마자 (Ngay sau khi, vừa mới... thì đã... - Sự tiếp nối tức thì)",
    "shortExplanation": "Vĩ tố liên kết dùng để diễn tả một hành động ở vế sau diễn ra ngay tức khắc sau khi hành động ở vế trước vừa hoàn tất ('vừa mới... thì', 'ngay khi').",
    "longExplanation": "'~자마자' (với động từ 하다 là '~하자마자') là vĩ tố liên kết biểu thị khoảng cách thời gian giữa hai hành động gần như bằng không: hành động ở mệnh đề trước vừa kết thúc thì hành động ở mệnh đề sau lập tức diễn ra ngay. Trong tiếng Việt tương đương với 'ngay sau khi...', 'vừa mới... thì đã...'. Cấu trúc này chỉ kết hợp với thân động từ, không dùng với tính từ. Mặc dù hành động có thể đã xảy ra trong quá khứ, vĩ tố thì quá khứ không gắn vào '-자마자' mà chỉ biểu hiện ở vị ngữ của vế câu sau cùng.",
    "formation": "Thân động từ + -자마자 (không phụ thuộc vào phụ âm cuối)",
    "examples": [
      {
        "translation": "Ngay khi nhận được thư của anh ấy, tôi đã gọi điện thoại cho anh ấy ngay mà không hề chậm trễ."
      },
      {
        "translation": "Vừa đi học về tới nhà là tôi đã bắt tay vào làm bài tập ngay, không hề nghỉ ngơi chút nào."
      },
      {
        "translation": "Bộ phim vừa kết thúc là họ đã rời khỏi rạp ngay vì có lịch trình khác."
      },
      {
        "translation": "Mẹ vừa về đến nhà là chú cún con đã mừng rỡ nhảy cẫng lên, có vẻ như nó thực sự rất yêu mẹ."
      }
    ]
  },
  "ko_하여_91": {
    "title": "~하여 / ~아/어 (Do... nên, vì... mà - Nguyên nhân, lý do trong văn viết)",
    "shortExplanation": "Vĩ tố liên kết dùng trong phong cách trang trọng hoặc văn viết để chỉ nguyên nhân, lý do dẫn đến kết quả ở vế sau ('do... nên', 'vì thế').",
    "longExplanation": "'~하여' (dạng rút gọn của '~하여서', xuất phát từ thân động từ/tính từ kết hợp với vĩ tố '-아/어') là hình thái liên kết chỉ nguyên nhân, kết quả thường thấy trong các văn bản viết, báo chí, văn phong học thuật hoặc diễn văn trang trọng. Khác với '-아/어서' thường dùng trong văn nói hằng ngày, vĩ tố '-아/어' (và '하여') tạo cho câu văn âm hưởng trang trọng, cô đọng và súc tích hơn. Mệnh đề trước nêu lên căn nguyên hoặc bối cảnh, từ đó dẫn tới kết quả hay sự biến chuyển ở mệnh đề sau.",
    "formation": "Thân động từ/tính từ + -아/어 (하다 biến thành 하여; kết thúc bằng nguyên âm ㅏ, ㅗ dùng -아; các nguyên âm khác dùng -어)",
    "examples": [
      {
        "translation": "Do thức dậy muộn nên tôi đã đến trường trễ."
      },
      {
        "translation": "Cô ấy quá mệt mỏi nên không thể gượng dậy được nữa."
      },
      {
        "translation": "Giao thông tắc nghẽn nghiêm trọng nên xe buýt đã đến muộn."
      },
      {
        "translation": "Thời tiết quá đỗi lạnh giá nên thật khó để đi ra ngoài."
      }
    ]
  },
  "ko_하기보다_92": {
    "title": "~하기보다(는) (Thay vì..., thà... còn hơn - So sánh và đối chiếu lựa chọn)",
    "shortExplanation": "Dùng để so sánh giữa hai hành vi hoặc sự việc, thể hiện rằng người nói ưu tiên hoặc đánh giá vế sau cao hơn so với vế trước ('thay vì...', 'so với việc... thì thà...').",
    "longExplanation": "'~하기보다(는)' là cấu trúc được tạo thành từ vĩ tố danh từ hóa '-기', trợ từ so sánh '보다' (so với) và trợ từ bổ trợ '는'. Cấu trúc này dùng để đặt hai hành động hay phương án lên bàn cân so sánh, qua đó nhấn mạnh rằng làm hành động ở vế sau thì tốt hơn, phù hợp hơn hoặc được người nói ưa chuộng hơn so với việc làm hành động ở vế trước. Thường đi kèm với các từ diễn đạt sự lựa chọn như '차라리' (thà rằng), '오히려' (ngược lại/trái lại), '더 낫다' (tốt hơn).",
    "formation": "Thân động từ + -기보다(는)",
    "examples": [
      {
        "translation": "So với việc xem phim ở nhà thì tôi thích xem phim ở rạp hơn."
      },
      {
        "translation": "Thay vì ăn hoa quả thì thà ăn món salad còn thích hơn."
      },
      {
        "translation": "Thay vì đi ăn trưa ở nhà hàng với bạn bè, tôi nghĩ tự nấu ăn ở nhà ăn vẫn tốt hơn."
      },
      {
        "translation": "Thay vì xem tivi thì đọc sách sẽ có ích hơn nhiều."
      }
    ]
  },
  "ko_하느라_93": {
    "title": "~하느라 / ~느라고 (Mải... nên..., vì bận... nên... - Nguyên nhân dẫn đến kết quả tiêu cực)",
    "shortExplanation": "Vĩ tố liên kết dùng để diễn tả việc chủ ngữ mải mê, bận rộn làm một việc nào đó mà dẫn tới một kết quả không mong muốn hoặc tốn hao thời gian, sức lực ở vế sau ('vì mải... nên').",
    "longExplanation": "'~느라고' (dạng rút gọn là '~하느라' khi đi với 하다) là vĩ tố liên kết chỉ nguyên nhân, lý do đặc thù. Nó biểu thị rằng vì chủ ngữ tập trung sức lực hoặc bận rộn thực hiện hành động ở vế trước trong suốt một khoảng thời gian, dẫn đến việc không thể làm việc khác hoặc gây ra một kết quả tiêu cực, bất lợi, mệt mỏi ở vế sau. Chủ ngữ của cả hai vế câu bắt buộc phải là một (đồng chủ ngữ). Vế sau không thể dùng câu mệnh lệnh hay thỉnh dụ, và bản thân vĩ tố không kết hợp với thì quá khứ hay tương lai.",
    "formation": "Thân động từ + -느라(고)",
    "examples": [
      {
        "translation": "Vì mải chuẩn bị nên đã tốn rất nhiều thời gian."
      },
      {
        "translation": "Vì bận ôn thi nên tôi đã không thể gặp gỡ bạn bè."
      },
      {
        "translation": "Vì mải làm việc cật lực cho công việc kinh doanh nên cơ thể tôi đã kiệt sức."
      },
      {
        "translation": "Vào một ngày hè nóng nực, cô ấy đã bận rộn quán xuyến quán kem."
      }
    ]
  },
  "ko_하는_94": {
    "title": "~하는 한 / ~는 한 (Miễn là..., chừng nào còn... - Điều kiện giới hạn phạm vi)",
    "shortExplanation": "Dùng để biểu thị điều kiện tiền đề mang tính giới hạn phạm vi: chỉ cần trạng thái hay hành động ở vế trước còn tiếp diễn thì sự việc ở vế sau vẫn đúng hoặc có hiệu lực ('miễn là', 'chừng nào mà').",
    "longExplanation": "'~는 한' là cấu trúc kết hợp giữa vĩ tố định ngữ '-(으)ㄴ/는' với danh từ phụ thuộc '한 (限)' có nghĩa là 'giới hạn, phạm vi'. Nó được dùng để thiết lập phạm vi hoặc điều kiện tiên quyết cho một phán đoán, khẳng định: miễn là tình huống ở vế trước còn được duy trì thì sự việc ở vế sau mới thành lập hoặc không bị lay chuyển. Thường tương đương với 'miễn là...', 'chừng nào mà còn...' trong tiếng Việt. Khi biểu thị sự hiểu biết hoặc năng lực nhận thức cá nhân, nó hay xuất hiện dưới dạng '내가 아는 한' (theo như tôi được biết), '내가 할 수 있는 한' (trong chừng mực tôi có thể).",
    "formation": "Thân động từ + -는 한; Thân tính từ + -(으)ㄴ 한 (có phụ âm cuối dùng -은 한, không có phụ âm cuối dùng -ㄴ 한)",
    "examples": [
      {
        "translation": "Miễn là bạn còn nỗ lực học hành thì bạn sẽ luôn có thể thành công."
      },
      {
        "translation": "Chừng nào chúng ta còn thành thật nói chuyện với nhau thì sẽ chẳng có bất cứ vấn đề gì phát sinh cả."
      },
      {
        "translation": "Chừng nào con còn làm theo lời dặn của bố mẹ thì trong gia đình ta sẽ không có bất cứ chuyện gì đáng lo ngại cả."
      },
      {
        "translation": "Chừng nào bạn còn phát huy hết tài năng của mình thì chẳng có lý do gì phải nản lòng trước công việc này cả."
      }
    ]
  },
  "ko_하는_95": {
    "title": "~하는 김에 / ~(으)ㄴ/는 김에 (Tiện thể..., nhân tiện... - Tận dụng cơ hội làm thêm việc khác)",
    "shortExplanation": "Dùng để diễn tả việc nhân cơ hội đang làm một hành động chính nào đó thì tiện thể làm thêm một hành động khác đi kèm ('nhân tiện', 'tiện thể').",
    "longExplanation": "'~(으)ㄴ/는 김에' là cấu trúc kết hợp giữa vĩ tố định ngữ với danh từ phụ thuộc '김' (dịp, cơ hội thuận tiện). Nó được dùng khi người nói tận dụng thời cơ, hoàn cảnh hoặc chuyến đi đang thực hiện một hành động chính để tiện thể làm thêm một hành động phụ có liên quan hoặc tiện lợi. Hành động thứ hai thường không phải là mục đích ban đầu mà nảy sinh thêm nhờ sự thuận tiện của hành động thứ nhất. Thì hiện tại hoặc tương lai dùng '-는 김에', hành động trước đã hoàn thành dùng '-(으)ㄴ 김에'.",
    "formation": "Thân động từ + -는 김에 (thì hiện tại/tương lai); Thân động từ + -(으)ㄴ 김에 (hành động đã làm xong, có phụ âm cuối dùng -은 김에, không có phụ âm cuối dùng -ㄴ 김에)",
    "examples": [
      {
        "translation": "Nhân tiện đi đến hiệu sách, tôi vừa mua sách lại vừa mua cả số bút chì cần dùng."
      },
      {
        "translation": "Tiện đường về nhà, tôi đã ghé siêu thị mua một ít đồ ăn vặt."
      },
      {
        "translation": "Nhân tiện em tôi đi ra công viên, tôi cũng định đi cùng để tập thể dục luôn."
      },
      {
        "translation": "Tiện thể đi gặp bạn bè, tôi cũng sẽ mua luôn một món quà để tặng."
      }
    ]
  },
  "ko_하는_96": {
    "title": "~하는 편이다 / ~(으)ㄴ/는 편이다 (Thuộc dạng..., khá là..., có xu hướng... - Xu hướng, thói quen)",
    "shortExplanation": "Dùng để đánh giá hoặc miêu tả một tính chất, thói quen hay xu hướng tương đối của sự vật, hành động mà không khẳng định một cách tuyệt đối ('thuộc diện', 'khá là').",
    "longExplanation": "'~(으)ㄴ/는 편이다' là cấu trúc kết hợp giữa vĩ tố định ngữ với danh từ phụ thuộc '편' (bên, phía, diện) và vĩ tố kết thúc câu '이다'. Cấu trúc này dùng để diễn đạt rằng một người hoặc sự vật có xu hướng nghiêng về một phía, một đặc điểm hay thói quen nào đó khi xem xét một cách đại thể, thay vì đưa ra nhận định tuyệt đối hay dứt khoát 100%. Trong tiếng Việt thường được dịch là 'thuộc dạng...', 'thuộc diện...', 'khá là...', 'có chiều hướng...'. Với động từ ở thì hiện tại dùng '-는 편이다', với tính từ dùng '-(으)ㄴ 편이다'.",
    "formation": "Thân động từ + -는 편이다; Thân tính từ + -(으)ㄴ 편이다 (thân từ có phụ âm cuối dùng -은 편이다, không có phụ âm cuối dùng -ㄴ 편이다); Danh từ + 인 편이다",
    "examples": [
      {
        "translation": "Tôi thuộc dạng người thức dậy khá sớm. Làm như vậy tôi có thể bắt đầu một ngày mới hiệu quả hơn."
      },
      {
        "translation": "Cô ấy thuộc tuýp hay chụp rất nhiều ảnh mỗi khi đi du lịch, bởi vì cô ấy thích lưu giữ những kỷ niệm bằng hình ảnh."
      },
      {
        "translation": "Khi thời tiết ấm lên, mọi người có xu hướng tập thể dục nhiều hơn; dường như họ thích đi bộ hoặc chạy bộ để giữ gìn sức khỏe."
      },
      {
        "translation": "Mỗi khi có chuyện phiền muộn, tôi thường có thói quen tâm sự với bạn bè, vì những suy nghĩ đa dạng của họ luôn giúp ích cho tôi."
      }
    ]
  },
  "ko_하는_97": {
    "title": "~하는 대로 / ~는 대로 (Ngay khi, hễ... là... - Sự việc tiếp nối ngay tức khắc)",
    "shortExplanation": "Dùng để diễn tả một hành động ở vế sau sẽ được thực hiện ngay lập tức sau khi hành động ở vế trước xảy ra ('ngay khi...', 'hễ... là...').",
    "longExplanation": "'~는 대로' là cấu trúc kết hợp giữa vĩ tố định ngữ '-는' với danh từ phụ thuộc '대로'. Trong ngữ cảnh này, cấu trúc mang ý nghĩa chỉ thời điểm tiếp nối tức thì: ngay sau khi hành động ở vế trước vừa xảy ra thì hành động ở vế sau lập tức được tiến hành mà không có sự trì hoãn. Thường dùng trong các câu hứa hẹn, dặn dò hoặc lên kế hoạch tương lai (như 'khi nào tới nơi gọi ngay nhé'). Khác với nghĩa 'theo như, đúng như' (cũng viết là '~는 대로'), nét nghĩa này nhấn mạnh tính tức thời tương đương với 'ngay sau khi...'.",
    "formation": "Thân động từ + -는 대로",
    "examples": [
      {
        "translation": "Ngay khi buổi biểu diễn của anh ấy vừa bắt đầu, tất cả mọi người đã bắt đầu hò reo vang dội."
      },
      {
        "translation": "Ngay sau khi thức dậy phải đánh răng ngay thì mới có thể bảo vệ sức khỏe răng miệng của bạn được."
      },
      {
        "translation": "Tập thể dục xong một cái là phải uống nhiều nước ngay, có như vậy mới tránh được việc mất nước."
      },
      {
        "translation": "Ngay khi máy bay vừa hạ cánh, anh ấy đã rút điện thoại ra gọi ngay."
      }
    ]
  },
  "ko_하다_98": {
    "title": "~하다 보면 / ~다 보면 (Nếu cứ tiếp tục làm... thì sẽ... - Kết quả từ hành động lặp đi lặp lại)",
    "shortExplanation": "Dùng để diễn tả việc nếu cứ liên tục lặp lại hoặc duy trì một hành động nào đó trong một khoảng thời gian thì tự nhiên sẽ dẫn tới một kết quả hay sự thay đổi nhất định ('nếu cứ... thì sẽ...').",
    "longExplanation": "'~다 보면' là cấu trúc kết hợp giữa vĩ tố liên kết '-다가' (chỉ hành động đang diễn tiến thì tạm dừng/chuyển tiếp) với bổ trợ từ '보다' (thử) và vĩ tố giả định '-(으)면' (nếu). Nó dùng để diễn đạt giả định rằng nếu chủ ngữ duy trì một hành động đều đặn, tích lũy theo thời gian thì tất yếu sẽ đạt được một kết quả, một kỹ năng hay sự biến chuyển ở tương lai. Vế sau thường mang tính dự đoán tích cực hoặc đưa ra lời khuyên khích lệ, thường đi kèm với '-(으)ㄹ 것이다' hoặc '-(으)ㄹ 수 있다'.",
    "formation": "Thân động từ + -다 보면",
    "examples": [
      {
        "translation": "Nếu mỗi ngày cứ học đều đặn một từ vựng thì sau một tháng bạn sẽ học được tới tận 30 từ mới."
      },
      {
        "translation": "Nếu cứ tiếp tục kiên trì luyện tập thì rốt cuộc năng lực của bạn cũng sẽ được nâng cao."
      },
      {
        "translation": "Nếu mỗi ngày đều vận động đầy đủ thì cơ thể chắc chắn sẽ trở nên khỏe mạnh."
      },
      {
        "translation": "Nếu nỗ lực mở lòng đón nhận sự thay đổi thì bạn sẽ có thể ứng phó tốt ngay cả trong những hoàn cảnh khó khăn."
      }
    ]
  },
  "ko_하다_99": {
    "title": "~하다 보니 / ~다 보니(까) (Làm... một hồi mới thấy..., trong lúc làm thì nhận ra... - Phát hiện qua trải nghiệm thực tế)",
    "shortExplanation": "Dùng để diễn tả việc trong quá trình liên tục thực hiện một hành động nào đó thì người nói dần phát hiện ra, nhận thức được hoặc dẫn đến một tình trạng thực tế ở vế sau ('làm riết rồi nhận ra...').",
    "longExplanation": "'~다 보니(까)' là cấu trúc kết hợp giữa vĩ tố liên kết '-다가' với bổ trợ từ '보다' và vĩ tố chỉ nguyên nhân/căn cứ '-니(까)'. Nó dùng để miêu tả một trải nghiệm thực tế đã xảy ra: trong quá trình người nói lặp đi lặp lại hoặc liên tục duy trì một hành động nào đó, bản thân dần dần vỡ lẽ, nhận ra một sự thật mới, hoặc hành động đó đã trở thành nguyên nhân đưa đến kết quả thực tế ở vế sau. Khác với '-다 보면' (dự đoán tương lai), '-다 보니(까)' diễn tả trải nghiệm thực tế đã hoặc đang xảy ra trong hiện tại/quá khứ.",
    "formation": "Thân động từ + -다 보니(까)",
    "examples": [
      {
        "translation": "Tập thể dục mỗi ngày riết rồi sức khỏe của tôi tốt lên hẳn, tinh thần cũng trở nên phấn chấn hơn."
      },
      {
        "translation": "Cứ tiếp tục học tiếng Hàn liên tục một thời gian, tôi mới dần dần hiểu sâu sắc hơn về văn hóa Hàn Quốc."
      },
      {
        "translation": "Nấu ăn thường xuyên nên tôi thấy cơm nhà nấu ngày càng ngon miệng hơn, vì thế tôi lại càng hay tự nấu ăn ở nhà hơn nữa."
      },
      {
        "translation": "Dành nhiều thời gian bên cạnh bạn bè nên tôi cảm thấy dường như mình đã trở nên thân thiết, gắn bó với họ hơn."
      }
    ]
  },
  "ko_하려는_100": {
    "title": "~하려는 뜻이다 / ~(으)려는 뜻이다 (Mang ý định..., có ý định làm... - Bày tỏ ý chí, dự định)",
    "shortExplanation": "Dùng để biểu thị rõ ràng ý định, chủ ý hoặc kế hoạch của người nói (hoặc chủ ngữ) đang muốn làm một hành động nào đó trong tương lai ('có ý định...', 'nhằm mục đích...').",
    "longExplanation": "'~(으)려는 뜻이다' là cấu trúc kết hợp giữa vĩ tố định ngữ biểu thị ý đồ '-(으)려는' với danh từ '뜻' (ý nghĩa, ý định, mục đích) và vĩ tố '이다'. Cấu trúc này dùng để làm rõ mục đích, nguyện vọng hoặc kế hoạch cụ thể mà chủ ngữ đang ấp ủ hoặc hướng tới. Nó mang sắc thái trang trọng, chín chắn hơn so với cấu trúc nói thông thường '-(으)려고 하다' hay '-(으)ㄹ 생각이다', nhấn mạnh vào ý chí và ý nguyện chân thực của người hành động.",
    "formation": "Thân động từ + -(으)려는 뜻이다 (thân từ có phụ âm cuối dùng -으려는 뜻이다, không có phụ âm cuối hoặc có phụ âm cuối ㄹ dùng -려는 뜻이다)",
    "examples": [
      {
        "translation": "Tôi có ý định sẽ đi gặp bạn vào ngày mai."
      },
      {
        "translation": "Đội của chúng tôi mang quyết tâm giành chiến thắng trong trận đấu lần này."
      },
      {
        "translation": "Tôi ấp ủ ý định giúp đỡ những người cao tuổi."
      },
      {
        "translation": "Anh ấy có ý định sẽ học tiếng Anh."
      }
    ]
  },
  "ko_하면_101": {
    "title": "~하면 ~하다 / ~(으)면 (Nếu... thì... - Câu điều kiện, giả định cơ bản)",
    "shortExplanation": "Vĩ tố liên kết điều kiện cơ bản nhất, dùng để liên kết mệnh đề điều kiện hoặc giả định với kết quả tất yếu theo sau ('nếu... thì...').",
    "longExplanation": "'~(으)면' là vĩ tố liên kết điều kiện phổ biến và quan trọng nhất trong tiếng Hàn. Nó được dùng để đặt ra một điều kiện giả định, một tiền đề hoặc một tình huống có thể xảy ra ở vế trước, và nêu lên kết quả, quyết định hay hành động kế tiếp ở vế sau. Cấu trúc này có thể dùng cho các quy luật hiển nhiên của tự nhiên, thói quen thường nhật, lời hứa hẹn hoặc các dự đoán trong tương lai. Thường tương đương với 'nếu... thì...' trong tiếng Việt.",
    "formation": "Thân động từ/tính từ + -(으)면 (thân từ có phụ âm cuối dùng -으면, không có phụ âm cuối hoặc có phụ âm cuối ㄹ dùng -면); Danh từ + (이)면",
    "examples": [
      {
        "translation": "Nếu ôn tập chăm chỉ thì bạn sẽ có thể làm bài thi thật tốt."
      },
      {
        "translation": "Ngày mai nếu thời tiết đẹp thì tôi sẽ đi ra công viên."
      },
      {
        "translation": "Nếu ăn nhiều món bánh ngọt này thì bạn sẽ bị tăng cân đấy."
      },
      {
        "translation": "Nếu chúng ta xuất phát trước thì tôi nghĩ mình có thể kịp giờ."
      }
    ]
  },
  "ko_할_102": {
    "title": "~할 만하다 / ~(으)ㄹ 만하다 (Đáng để..., bõ công..., có thể chịu được - Giá trị đáng giá hoặc mức độ chấp nhận được)",
    "shortExplanation": "Dùng để diễn tả một hành động rất đáng công sức, thời gian hay tiền bạc để làm; hoặc biểu thị một mức độ chấp nhận được, có thể làm được ('đáng để làm').",
    "longExplanation": "'~(으)ㄹ 만하다' là cấu trúc kết hợp giữa vĩ tố định ngữ thì tương lai/suy đoán '-(으)ㄹ' với tính từ phụ thuộc '만하다'. Cấu trúc này chủ yếu biểu thị hai nét nghĩa: thứ nhất là 'đáng để làm gì' (hành động đó mang lại giá trị xứng đáng với thời gian, tiền bạc hay nỗ lực bỏ ra, ví dụ như một cuốn sách đáng đọc, một bộ phim đáng xem); thứ hai là 'có thể chấp nhận được, có thể chịu được' (mức độ tuy chưa hoàn hảo nhưng vẫn ổn thỏa). Thường tương đương với 'đáng để...', 'xứng đáng...' trong tiếng Việt.",
    "formation": "Thân động từ + -(으)ㄹ 만하다 (thân từ có phụ âm cuối dùng -을 만하다, không có phụ âm cuối hoặc có phụ âm cuối ㄹ dùng -ㄹ 만하다)",
    "examples": [
      {
        "translation": "Xem cái này thấy thực sự quá đỗi thú vị nên rất đáng để xem đi xem lại nhiều lần, chẳng phí thời gian chút nào."
      },
      {
        "translation": "Bộ phim đó thực sự quá xúc động nên nhất định rất đáng để xem, tôi muốn đi xem lại thêm một lần nữa."
      },
      {
        "translation": "Món ăn này dẫu chi phí nguyên liệu có hơi đắt một chút nhưng hoàn toàn đáng công tự nấu ăn, hương vị tuyệt hảo khiến người ta vô cùng hài lòng."
      },
      {
        "translation": "Cuốn sách này giá cả tuy đắt đỏ nhưng rất đáng để đọc, bên trong chứa đựng nhiều tri thức quý báu đến mức không hề tiếc tiền mua."
      }
    ]
  },
  "ko_할_103": {
    "title": "~할 바에 / ~(으)ㄹ 바에(야) (Thà... còn hơn, thà làm việc khác chứ quyết không... - Lựa chọn so sánh phương án tiêu cực)",
    "shortExplanation": "Dùng để diễn tả việc nếu phải làm một việc tồi tệ, không vừa ý ở vế trước thì thà chọn một phương án khác ở vế sau còn hơn ('thà... còn hơn là...').",
    "longExplanation": "'~(으)ㄹ 바에(야)' là cấu trúc kết hợp giữa vĩ tố định ngữ '-(으)ㄹ' với danh từ phụ thuộc '바' (việc, điều, tình cảnh) và trợ từ '에' (hoặc '에야'). Cấu trúc này dùng khi đứng trước một phương án ở vế trước mà người nói cho là hết sức bất đắc dĩ, tệ hại hoặc không mong muốn; qua đó thể hiện thái độ thà chấp nhận một giải pháp khác ở vế sau chứ tuyệt đối không muốn chọn phương án trước. Vế sau thường đi kèm với các từ nhấn mạnh sự lựa chọn thay thế như '차라리' (thà rằng), '차라리 ~는 게 낫다' (thà... còn hơn).",
    "formation": "Thân động từ + -(으)ㄹ 바에(야) (thân từ có phụ âm cuối dùng -을 바에, không có phụ âm cuối hoặc có phụ âm cuối ㄹ dùng -ㄹ 바에)",
    "examples": [
      {
        "translation": "Thà rằng không nghe bất cứ lời nào còn hơn là phải nghe những lời khó lọt tai như thế."
      },
      {
        "translation": "Thay vì cứ thui thủi một mình, tôi nghĩ thà đi du lịch cùng bạn bè còn tốt hơn nhiều."
      },
      {
        "translation": "Thà làm lành còn hơn là cứ cãi vã với anh ta."
      },
      {
        "translation": "Thay vì không xin được việc, tôi nghĩ thà cứ tiếp tục đi học ở trường có khi còn tốt hơn."
      }
    ]
  },
  "ko_할_104": {
    "title": "~(으)ㄹ 리가 없다 (Không có lý nào..., làm sao mà... được - Phủ định khả năng, hoài nghi tuyệt đối)",
    "shortExplanation": "Dùng để biểu thị sự phủ định dứt khoát hoặc bác bỏ một khả năng, cho rằng một sự việc hay hành động nào đó tuyệt đối không thể xảy ra ('không có lý nào...', 'làm sao mà... được').",
    "longExplanation": "'~(으)ㄹ 리가 없다' là cấu trúc biểu hiện phủ định mạnh mẽ trong tiếng Hàn, được kết hợp giữa vĩ tố định từ tương lai '-(으)ㄹ', danh từ phụ thuộc '리' (lý lẽ, căn cứ, khả năng) và tính từ phủ định '없다' (không có). Cấu trúc này dùng để diễn đạt sự hoài nghi sâu sắc hoặc khẳng định chắc nịch của người nói rằng hoàn toàn không có lý do, căn cứ hay xác suất nào để một sự việc xảy ra. Khi muốn diễn tả việc trong quá khứ không thể xảy ra, ta dùng hình thức '-았/었을 리가 없다'. Ngược lại, dạng nghi vấn '-(으)ㄹ 리가 있겠어요?' (Có lý nào lại như thế được?) mang tính chất câu hỏi tu từ để nhấn mạnh sự bất khả thi.",
    "formation": "Thân động từ/tính từ + -(으)ㄹ 리가 없다 (thân kết thúc bằng nguyên âm hoặc phụ âm ㄹ dùng -ㄹ 리가 없다; kết thúc bằng phụ âm khác dùng -을 리가 없다; quá khứ dùng -았/었을 리가 없다)",
    "examples": [
      {
        "translation": "Không có lý nào anh ấy lại nói dối, vì anh ấy là một người rất trung thực."
      },
      {
        "translation": "Bây giờ trời tối thế này không có lý nào tôi lại đi ra ngoài, vì rất nguy hiểm."
      },
      {
        "translation": "Không có lý nào có thể tự mình cáng đáng việc lớn như thế, nếu không có ai giúp đỡ thì chẳng có chút khả năng nào."
      },
      {
        "translation": "Không có lý nào cô ấy lại ghét tôi, vì chúng tôi là những người bạn thân thiết nhất mà."
      }
    ]
  },
  "ko_할_105": {
    "title": "~(으)ㄹ 때마다 (Mỗi khi, mỗi lần, cứ hễ... thì lại - Tính lặp lại đều đặn)",
    "shortExplanation": "Dùng để diễn tả một hành động hay trạng thái luôn diễn ra lặp đi lặp lại mỗi khi một tình huống hay điều kiện nhất định xuất hiện ('mỗi khi...', 'cứ mỗi lần...').",
    "longExplanation": "'~(으)ㄹ 때마다' là cấu trúc liên kết biểu thị tính chu kỳ hoặc sự lặp lại tất yếu của một sự việc. Cấu trúc được tạo thành từ vĩ tố định từ tương lai '-(으)ㄹ', danh từ phụ thuộc '때' (lúc, khi) và trợ từ bổ trợ '마다' (mỗi, mọi). Nó nhấn mạnh rằng cứ hễ hoàn cảnh ở mệnh đề trước xảy ra thì hành động hoặc trạng thái ở mệnh đề sau cũng sẽ lặp lại tương ứng mà hầu như không có ngoại lệ. Khi đi cùng danh từ chỉ thời gian hoặc sự kiện, có thể gắn trực tiếp '마다' hoặc '때마다' (ví dụ: 방학 때마다 - mỗi kỳ nghỉ).",
    "formation": "Thân động từ/tính từ + -(으)ㄹ 때마다 (thân kết thúc bằng nguyên âm hoặc phụ âm ㄹ dùng -ㄹ 때마다; kết thúc bằng phụ âm khác dùng -을 때마다; danh từ dùng 때마다)",
    "examples": [
      {
        "translation": "Mỗi lần đọc sách tôi lại tiếp thu thêm được kiến thức mới, vì thế tôi rất thích đọc nhiều sách."
      },
      {
        "translation": "Cứ mỗi lần luyện tập là anh ấy lại đạt được thành quả tốt hơn, anh ấy lúc nào cũng nỗ lực hết mình."
      },
      {
        "translation": "Mỗi lần gặp bạn trai (anh ấy), chúng tôi lại đi xem phim lãng mạn, vì thế chúng tôi lúc nào cũng thấy hạnh phúc."
      },
      {
        "translation": "Mỗi lần chơi bóng đá chúng tôi lại có thật nhiều niềm vui bên bạn bè, chúng tôi thực sự rất mê bóng đá."
      }
    ]
  },
  "ko_할_106": {
    "title": "~(으)ㄹ 힘이 없다 (Không còn sức lực/sức lực để... - Kiệt sức, mệt mỏi)",
    "shortExplanation": "Dùng để biểu thị rằng chủ ngữ đã hoàn toàn cạn kiệt thể lực hoặc tinh thần, không còn chút sức lực nào để thực hiện một hành động cụ thể ('không còn sức để...').",
    "longExplanation": "'~(으)ㄹ 힘이 없다' là quán ngữ biểu thị tình trạng kiệt quệ về thể chất hoặc tinh thần. Cấu trúc được tạo thành bởi vĩ tố định từ '-(으)ㄹ', danh từ '힘' (sức mạnh, sức lực, thể lực) và tính từ '없다' (không có). Người nói sử dụng cấu trúc này nhằm than phiền hoặc giải thích lý do không thể tiếp tục làm một việc gì đó do lao lực, thiếu ngủ, bệnh tật hoặc áp lực kéo dài. Ngoài '없다', cũng có thể kết hợp với các từ phủ định khác như '남아 있지 않다' (không còn sót lại chút sức nào).",
    "formation": "Thân động từ + -(으)ㄹ 힘이 없다 (thân kết thúc bằng nguyên âm hoặc phụ âm ㄹ dùng -ㄹ 힘이 없다; kết thúc bằng phụ âm khác dùng -을 힘이 없다)",
    "examples": [
      {
        "translation": "Công việc nhiều quá nên tôi chẳng còn chút sức lực nào để làm thêm nữa. Tôi nghĩ mỗi ngày mình phải nghỉ ngơi ít nhất 8 tiếng mới được."
      },
      {
        "translation": "Đêm qua tôi hầu như không chợp mắt được chút nào nên hôm nay không còn sức đâu mà làm việc tiếp."
      },
      {
        "translation": "Suốt một tuần tôi tập thể dục không bỏ sót ngày nào nên giờ khắp người đau nhức, chẳng còn sức để tập luyện nữa."
      },
      {
        "translation": "Cả tuần này tôi đã dồn sức ôn thi quá vất vả nên bây giờ không còn chút sức lực nào để học thêm được nữa."
      }
    ]
  },
  "ko_할_107": {
    "title": "~(으)ㄹ 것 같다 (Có vẻ như sẽ..., dường như... - Dự đoán, phỏng đoán tương lai)",
    "shortExplanation": "Dùng để diễn đạt sự phỏng đoán, dự tính hoặc cảm nhận của người nói về một sự việc sắp xảy ra trong tương lai hoặc một trạng thái chưa chắc chắn ('có vẻ như...', 'chắc là...').",
    "longExplanation": "'~(으)ㄹ 것 같다' là một trong những cấu trúc phỏng đoán căn bản và thông dụng bậc nhất trong tiếng Hàn. Cấu trúc được kết hợp từ vĩ tố định từ tương lai '-(으)ㄹ', danh từ phụ thuộc '것' (điều, sự việc) và tính từ '같다' (giống như, dường như). Nó thể hiện nhận định chủ quan, trực giác hoặc ước tính của người nói dựa trên các dấu hiệu quan sát được ở hiện tại mà không mang tính khẳng định tuyệt đối. Khi nói về hiện tại, động từ dùng '-는 것 같다', tính từ dùng '-(으)ㄴ 것 같다'; còn với việc quá khứ dùng '-(으)ㄴ 것 같다'.",
    "formation": "Thân động từ/tính từ + -(으)ㄹ 것 같다 (thân kết thúc bằng nguyên âm hoặc phụ âm ㄹ dùng -ㄹ 것 같다; kết thúc bằng phụ âm khác dùng -을 것 같다)",
    "examples": [
      {
        "translation": "Hôm nay trời có vẻ sắp mưa đấy, trên bầu trời mây đen đã kéo đến kín mít rồi."
      },
      {
        "translation": "Có vẻ như cô ấy thích cậu đấy, thấy cô ấy lúc nào cũng mỉm cười với cậu kìa."
      },
      {
        "translation": "Bài thi ngày mai chắc là sẽ khó lắm, vì phạm vi ra đề rộng quá."
      },
      {
        "translation": "Tôi nghĩ dự án lần này chắc sẽ thành công thôi, vì mọi người đều đang chuẩn bị hết sức tận tụy."
      }
    ]
  },
  "ko_할_108": {
    "title": "~(으)ㄹ 것이다 (Sẽ..., chắc chắn sẽ... - Biểu thị tương lai hoặc ý chí kiên định)",
    "shortExplanation": "Dùng để biểu thị thì tương lai, kế hoạch đã định sẵn, ý chí quyết tâm của người nói hoặc sự phỏng đoán chắc chắn về một sự việc ('sẽ...').",
    "longExplanation": "'~(으)ㄹ 것이다' là hình thái chỉ thì tương lai cơ bản và mang tính quy chuẩn trong ngữ pháp tiếng Hàn. Nó biểu đạt sự việc sẽ phát sinh trong tương lai, hoặc bày tỏ ý định, lời hứa hẹn của chủ ngữ ngôi thứ nhất ('tôi sẽ...'), cũng như phỏng đoán với độ chắc chắn tương đối cao của người nói đối với sự việc của ngôi thứ ba. Trong văn phong giao tiếp trang trọng hay thân mật hằng ngày, dạng đuôi câu này thường được nói gọn thành '-(으)ㄹ 거예요' hoặc '-(으)ㄹ 겁니다'. Trong văn viết học thuật hoặc báo chí, hình thức nguyên bản '-(으)ㄹ 것이다' được sử dụng phổ biến.",
    "formation": "Thân động từ/tính từ + -(으)ㄹ 것이다 (thân kết thúc bằng nguyên âm hoặc phụ âm ㄹ dùng -ㄹ 것이다; kết thúc bằng phụ âm khác dùng -을 것이다; đuôi thân mật rút gọn thành -(으)ㄹ 거예요 / -(으)ㄹ 겁니다)",
    "examples": [
      {
        "translation": "Nếu tuyết cứ tiếp tục rơi thế này thì ngày mai trường học chắc chắn sẽ đóng cửa."
      },
      {
        "translation": "Vì đại hội thể thao đang đến gần nên chúng tôi sẽ luyện tập chăm chỉ hơn nữa."
      },
      {
        "translation": "Điểm số học kỳ này chắc chắn sẽ tốt hơn so với học kỳ trước."
      },
      {
        "translation": "Đêm nay chắc hẳn bầu trời sẽ nhìn thấy rất nhiều ngôi sao."
      }
    ]
  },
  "ko_할_109": {
    "title": "~(으)ㄹ 줄 알다 (Biết làm..., biết cách... - Năng lực và kỹ năng)",
    "shortExplanation": "Dùng để diễn tả người nói hoặc chủ ngữ có năng lực, kỹ năng hoặc biết phương pháp để thực hiện một hành động cụ thể ('biết làm...', 'biết cách...').",
    "longExplanation": "'~(으)ㄹ 줄 알다' là cấu trúc biểu thị năng lực hoặc tri thức thực hành. Nó kết hợp vĩ tố định từ '-(으)ㄹ', danh từ phụ thuộc '줄' (phương pháp, đường lối, cách thức) và động từ '알다' (biết). Cấu trúc này dùng để khẳng định chủ ngữ đã học hỏi hoặc sở hữu khả năng thực thi một công việc hay kỹ năng nào đó (như bơi lội, nấu ăn, lái xe, ngoại ngữ). Dạng phủ định tương ứng là '-(으)ㄹ 줄 모르다' (không biết làm). Cần lưu ý, trong ngữ cảnh khác, cấu trúc này còn mang ý nghĩa phỏng đoán sai lệch ('ngỡ rằng, tưởng rằng...').",
    "formation": "Thân động từ + -(으)ㄹ 줄 알다 (thân kết thúc bằng nguyên âm hoặc phụ âm ㄹ dùng -ㄹ 줄 알다; kết thúc bằng phụ âm khác dùng -을 줄 알다; dạng phủ định dùng -(으)ㄹ 줄 모르다)",
    "examples": [
      {
        "translation": "Bạn hỏi tôi nói tiếng Hàn giỏi cỡ nào ư? Ừm, tôi biết giao tiếp những câu hội thoại cơ bản nhất."
      },
      {
        "translation": "Con của chúng tôi biết đánh đàn piano, nên lúc nào cháu đàn cho nghe cũng là lúc tôi cảm thấy hạnh phúc nhất."
      },
      {
        "translation": "Sao cậu lại biết nấu ăn khéo thế? Bữa cơm thực sự rất là ngon miệng."
      },
      {
        "translation": "Tôi biết lập trình máy tính, vì thế tôi có thể giải quyết được nhiều bài toán khác nhau."
      }
    ]
  },
  "ko_할지라도_110": {
    "title": "~(으)ㄹ지라도 (Dù cho, dẫu có... đi chăng nữa - Giả định nhượng bộ mạnh mẽ)",
    "shortExplanation": "Vĩ tố liên kết dùng để diễn tả sự nhượng bộ giả định, cho thấy dù điều kiện ở vế trước có xảy ra hay ở mức độ thế nào thì sự thật, quyết tâm ở vế sau vẫn không thay đổi ('dù cho...', 'dẫu rằng...').",
    "longExplanation": "'~(으)ㄹ지라도' là vĩ tố liên kết mang tính văn viết và trang trọng, biểu thị sự nhượng bộ mạnh mẽ hơn hẳn so với '-아/어도' hay '-(으)ㄹ망정'. Nó đặt ra một giả định giả thuyết mang tính cực đoan hoặc thử thách ở mệnh đề trước ('cho dù có khó khăn/bận rộn đến đâu'), nhưng khẳng định dứt khoát rằng mệnh đề sau vẫn giữ nguyên bản chất, nghĩa vụ hoặc hành động không hề lay chuyển. Cấu trúc này thường đi kèm với các phó từ nhấn mạnh như '비록' (dẫu cho), '아무리' (cho dù thế nào chăng nữa), '설령' (giả sử như).",
    "formation": "Thân động từ/tính từ + -(으)ㄹ지라도 (thân kết thúc bằng nguyên âm hoặc phụ âm ㄹ dùng -ㄹ지라도; kết thúc bằng phụ âm khác dùng -을지라도; danh từ dùng -(이)ㄹ지라도; quá khứ dùng -았/었을지라도)",
    "examples": [
      {
        "translation": "Dù có bận rộn đến mức không có thời gian đi chăng nữa, việc tập thể dục mỗi ngày vẫn là điều vô cùng quan trọng."
      },
      {
        "translation": "Cho dù mùi vị có ngon đến mấy đi nữa, ta vẫn phải kiên quyết tránh xa những món ăn gây hại cho sức khỏe."
      },
      {
        "translation": "Dù có khó khăn đến đâu, nếu bền bỉ luyện tập thì cuối cùng nhất định bạn cũng sẽ thành công."
      },
      {
        "translation": "Dẫu cho ngoài trời đang mưa, hôm nay tôi vẫn dự định ra ngoài theo đúng kế hoạch."
      }
    ]
  },
  "ko_할지언정_111": {
    "title": "~(으)ㄹ지언정 (Dù có... đi nữa, thà... chứ quyết không - Nhượng bộ kiên quyết)",
    "shortExplanation": "Vĩ tố liên kết biểu thị rằng dẫu cho phải chấp nhận tình huống bất lợi ở vế trước, người nói vẫn giữ vững lập trường, quyết định hoặc thà chọn vế trước chứ không chịu khuất phục ở vế sau ('thà... chứ không', 'dù cho...').",
    "longExplanation": "'~(으)ㄹ지언정' là vĩ tố liên kết mang sắc thái cổ kính, trang trọng và đầy khí phách. Nó dùng để khẳng định ý chí kiên định hoặc đạo lý của người nói: dẫu phía trước có là một trở ngại to lớn hay một tình thế ngặt nghèo ('dù có chết, dù có thất bại'), hành vi và quyết tâm ở vế sau vẫn trước sau như một, hoặc thà cam chịu vế trước còn hơn làm điều trái với lương tâm ở vế sau. Cấu trúc này cũng rất hay kết hợp với hình thức dẫn lời gián tiếp '-다 할지언정' (dù cho có bị cho là/dù sự việc có là... đi nữa).",
    "formation": "Thân động từ/tính từ + -(으)ㄹ지언정 (thân kết thúc bằng nguyên âm hoặc phụ âm ㄹ dùng -ㄹ지언정; kết thúc bằng phụ âm khác dùng -을지언정; thường kết hợp thành -다 할지언정)",
    "examples": [
      {
        "translation": "Dù bài toán có khó đến mấy đi chăng nữa, tôi cũng sẽ kiên trì giải cho bằng được đến cùng."
      },
      {
        "translation": "Dù cho cô ấy có chán ghét tôi đi nữa, tôi vẫn sẽ tiếp tục một lòng yêu thương cô ấy."
      },
      {
        "translation": "Dù thời tiết có giá rét đến đâu, chúng ta vẫn phải tiếp bước không được dừng lại."
      },
      {
        "translation": "Dù kỳ thi có cam go đến mức nào đi nữa, tôi vẫn nhất định phải kiên trì học tiếp."
      }
    ]
  },
  "ko_함에_112": {
    "title": "~(으)ㅁ에 있어(서) (Trong việc, khi tiến hành, về phương diện - Bối cảnh và phạm vi hành động)",
    "shortExplanation": "Cấu trúc dùng trong văn phong trang trọng hoặc văn viết để nêu lên bối cảnh, phạm vi hoặc tiêu chuẩn tiền đề khi thực hiện một hành động nào đó ('trong việc...', 'khi tiến hành...').",
    "longExplanation": "'~(으)ㅁ에 있어(서)' là cấu trúc trang trọng kết hợp vĩ tố danh từ hóa '-(으)ㅁ', trợ từ vị trí '에' và động từ '있어(서)' (có/trong trạng thái). Cấu trúc này thường thấy trong nghị luận, báo chí, diễn thuyết, hợp đồng hoặc văn bản học thuật để xác lập phạm vi, lĩnh vực hay điều kiện then chốt của một hành vi. Mệnh đề sau thường đưa ra nhận định, nguyên tắc, nghĩa vụ hoặc lời khuyên mang tính bao quát (ví dụ: 'yếu tố cốt lõi trong việc...', 'khi đưa ra quyết định...').",
    "formation": "Thân động từ/tính từ + -(으)ㅁ에 있어(서) (thân kết thúc bằng nguyên âm hoặc phụ âm ㄹ dùng -ㅁ에 있어; kết thúc bằng phụ âm khác dùng -음에 있어)",
    "examples": [
      {
        "translation": "Trong việc sản xuất lương thực hiện nay vẫn còn tồn tại nhiều bất cập, do đó chúng ta cần phải nhận thức rõ tính cấp thiết của sự đổi mới."
      },
      {
        "translation": "Trong tình yêu, tôi nghĩ rằng sự thẳng thắn chân thành chính là một trong những yếu tố trọng yếu nhất."
      },
      {
        "translation": "Trong việc bảo vệ môi trường, nỗ lực nhỏ bé của từng cá nhân sẽ đem lại những thay đổi to lớn."
      },
      {
        "translation": "Xét về phương diện phát huy tinh thần đồng đội, cô ấy chính là nhân tố quan trọng nhất trong nhóm chúng tôi."
      }
    ]
  },
  "ko_해_113": {
    "title": "~아/어 보이다 (Trông có vẻ, nhìn dường như - Đánh giá qua cảm quan thị giác)",
    "shortExplanation": "Dùng để diễn tả nhận định, cảm nhận của người nói về trạng thái, tính chất hoặc tâm trạng của đối tượng dựa trên vẻ bề ngoài quan sát được ('trông có vẻ...', 'nhìn dường như...').",
    "longExplanation": "'~아/어 보이다' là cấu trúc bổ trợ kết hợp thân tính từ với vĩ tố liên kết '-아/어' và động từ '보이다' (nhìn thấy, trông như). Cấu trúc này dùng để miêu tả phán đoán trực quan của người nói về trạng thái bên ngoài của một đối tượng (người, vật, sự việc). Cần lưu ý rằng cấu trúc này chủ yếu kết hợp với tính từ, biến tính từ thành dạng động từ vị ngữ miêu tả ấn tượng bề ngoài (như '피곤해 보이다' - trông có vẻ mệt, '행복해 보이다' - trông có vẻ hạnh phúc).",
    "formation": "Thân tính từ + -아/어 보이다 (kết thúc bằng nguyên âm ㅏ, ㅗ dùng -아 보이다; các nguyên âm khác dùng -어 보이다; 하다 biến thành 해 보이다)",
    "examples": [
      {
        "translation": "Người phụ nữ ấy trông thực sự rất hạnh phúc, cô ấy lúc nào cũng chào hỏi mọi người với nụ cười rạng rỡ."
      },
      {
        "translation": "Món ăn này trông ngon mắt quá nên tôi đã gọi món ngay lập tức."
      },
      {
        "translation": "Nhìn nét mặt của anh ấy thì trông như thể vừa xảy ra chuyện gì đau buồn lắm vậy."
      },
      {
        "translation": "Khu công viên rợp bóng hoa anh đào nở rộ này trông thật đẹp đẽ biết bao."
      }
    ]
  },
  "ko_게다가_0": {
    "title": "게다가 (Hơn nữa, thêm vào đó, lại còn - Bổ sung thông tin cùng chiều)",
    "shortExplanation": "Phó từ liên kết đứng đầu câu hoặc đầu mệnh đề để bổ sung thêm một thông tin, tình tiết khác cùng chiều hướng tích cực hoặc tiêu cực ('hơn nữa', 'thêm vào đó').",
    "longExplanation": "'게다가' là phó từ liên kết cực kỳ phổ biến trong tiếng Hàn, bắt nguồn từ danh từ phụ thuộc '데' (chỗ, việc) kết hợp trợ từ '다가'. Nó dùng để đặt nối giữa hai mệnh đề hoặc hai câu, nhằm đưa ra thêm một lý do, sự kiện hoặc đặc điểm bổ trợ nhằm tăng cường tính thuyết phục cho vế trước. Điểm ngữ pháp tương ứng trong mệnh đề ghép là cấu trúc vĩ tố định từ '-(으)ㄴ/는 데다가'. Thông tin ở vế sau '게다가' phải cùng tính chất (cùng khen ngợi hoặc cùng chê bai/than phiền) với vế trước.",
    "formation": "Mệnh đề 1 + -고, 게다가 + Mệnh đề 2 (hoặc tương đương cấu trúc: Thân động từ/tính từ + -(으)ㄴ/는 데다가)",
    "examples": [
      {
        "translation": "Quán cà phê đó cà phê pha rất ngon, hơn nữa không gian lại đẹp nên tôi thường xuyên ghé qua."
      },
      {
        "translation": "Hôm nay trời vừa mưa, hơn nữa lại còn giá rét nên tôi chẳng muốn bước chân ra ngoài chút nào."
      },
      {
        "translation": "Anh ấy tính tình rất hòa nhã, thêm vào đó lại thông minh nên mọi người ai cũng quý mến."
      },
      {
        "translation": "Nhà hàng này đồ ăn ngon, lại thêm giá cả phải chăng nên tôi hay ghé tới dùng bữa."
      }
    ]
  },
  "ko_거니와_1": {
    "title": "~거니와 (Không những... mà còn, vả lại còn - Thừa nhận và bổ sung trong văn viết)",
    "shortExplanation": "Vĩ tố liên kết trang trọng dùng để vừa công nhận sự thật ở mệnh đề trước, vừa bổ sung thêm một sự thật hay lý do quan trọng khác ở mệnh đề sau ('không những... mà còn').",
    "longExplanation": "'~거니와' là vĩ tố liên kết mang tính văn phong tao nhã, nghi thức và chuẩn mực văn viết. Nó biểu thị ý nghĩa đồng tình hoặc công nhận điều đã nêu ở vế trước là hiển nhiên, đồng thời bổ sung thêm một nội dung tương đồng hoặc có mức độ nhấn mạnh hơn ở vế sau. Trong tiếng Việt, cấu trúc này tương đương với 'đã đành... vả lại còn...', 'không những... mà còn...'. Cấu trúc này có thể kết hợp với thì quá khứ '-았/었거니와' và trợ từ tân ngữ '-도' ở vế sau để tăng cường mối tương quan.",
    "formation": "Thân động từ/tính từ + -거니와 (gắn trực tiếp không phụ thuộc phụ âm cuối; quá khứ dùng -았/었거니와; danh từ dùng -(이)거니와)",
    "examples": [
      {
        "translation": "Món đồ này vừa đắt đỏ, vả lại cũng chẳng phải kiểu dáng mà tôi mong muốn."
      },
      {
        "translation": "Tôi không chỉ thích đọc sách mà phim ảnh cũng rất mê, thế nên cuối tuần nào cũng bận rộn."
      },
      {
        "translation": "Sản phẩm này chất lượng đã kém cỏi, vả lại khâu dịch vụ khách hàng cũng hoàn toàn tệ hại."
      },
      {
        "translation": "Bộ phim ấy không những hấp dẫn lôi cuốn mà còn mang lại cảm xúc rung động sâu sắc."
      }
    ]
  },
  "ko_것만은_2": {
    "title": "~(으)ㄴ/는 것만은 (Chỉ riêng việc... thì, duy nhất điều... là - Nhấn mạnh ngoại lệ đối lập)",
    "shortExplanation": "Cấu trúc nhấn mạnh rằng mặc dù các mặt khác có thể thế nào đi nữa, nhưng chỉ riêng khía cạnh hay sự việc này thì hoàn toàn là một ngoại lệ không như mong đợi ('chỉ riêng điều... thì').",
    "longExplanation": "'~(으)ㄴ/는 것만은' là cấu trúc biểu hiện sự đối lập và nhấn mạnh đặc thù, cấu thành từ vĩ tố định từ '-(으)ㄴ/는', danh từ phụ thuộc '것', trợ từ chỉ phạm vi '만' (chỉ) và trợ từ đối chiếu '은/는'. Nó thường xuất hiện trong ngữ cảnh tương phản: khi mọi nỗ lực hoặc điều kiện khác đều thuận lợi, nhưng duy chỉ có một sự kiện hay kết quả cụ thể này là đi ngược lại kỳ vọng, khiến người nói cảm thấy khó hiểu, tiếc nuối hoặc thất vọng sâu sắc.",
    "formation": "Động từ + -는 것만은 (hiện tại) / -(으)ㄴ 것만은 (quá khứ); Tính từ + -(으)ㄴ 것만은",
    "examples": [
      {
        "translation": "Cô ấy đã học hành chăm chỉ, riêng việc điểm số ở trường lại không tốt thì tôi quả thật không tài nào hiểu nổi."
      },
      {
        "translation": "Tối qua tôi đã ngủ rất nhiều, nhưng việc đến giờ người vẫn mệt mỏi rã rời thì thật khó giải thích."
      },
      {
        "translation": "Đội chúng tôi đã nỗ lực hết mình, chỉ riêng việc để thua trong trận đấu là quá đỗi đáng tiếc."
      },
      {
        "translation": "Ngày nào tôi cũng tập thể dục đều đặn, duy chỉ việc cân nặng lại tăng lên là làm tôi thất vọng tràn trề."
      }
    ]
  },
  "ko_과와_3": {
    "title": "~과/와 같이 (Như, giống như, cũng như - So sánh tương đồng và ví von)",
    "shortExplanation": "Trợ từ so sánh dùng để đối chiếu một đối tượng với sự vật, hiện tượng làm chuẩn mực nhằm chỉ ra sự giống nhau hay mức độ tương đương ('giống như...', 'như...').",
    "longExplanation": "'~과/와 같이' là cấu trúc so sánh chuẩn mực trong tiếng Hàn, được kết hợp giữa trợ từ liên kết/so sánh '과/와' (với) và phó từ '같이' (cùng, giống như). Nó mang ý nghĩa ví von hoặc so sánh tương đồng, giúp làm nổi bật đặc trưng của chủ ngữ bằng cách đối chiếu với một đối tượng quen thuộc hay hình mẫu điển hình. Ngoài ra, trong văn phong diễn thuyết trang trọng, cụm từ này còn mang ý nghĩa dẫn chiếu như 'như đã nêu trên' (위와 같이).",
    "formation": "Danh từ + 과/와 같이 (danh từ có phụ âm cuối dùng 과 같이; không có phụ âm cuối dùng 와 같이)",
    "examples": [
      {
        "translation": "Cuối tuần trước trời ấm áp như mùa xuân vậy. Thế nhưng cuối tuần này lại rét buốt y như giữa mùa đông."
      },
      {
        "translation": "Bức tranh đó trông sống động hệt như một bức ảnh chụp, qua đó có thể thấy được ông ấy là một họa sĩ tài năng xuất chúng."
      },
      {
        "translation": "Hôm nay trời oi bức chẳng khác nào ngày hè, vì thế tôi đã đi ăn kem."
      },
      {
        "translation": "Đọc sách cũng tương tự như rèn luyện thể dục, là một hoạt động nuôi dưỡng tâm hồn luôn khỏe mạnh."
      }
    ]
  },
  "ko_나마저_4": {
    "title": "~(이)나마저 / ~마저 (Đến cả, ngay cả... cũng - Đối tượng cuối cùng bị cuốn vào)",
    "shortExplanation": "Trợ từ bổ trợ dùng để nhấn mạnh rằng ngay cả đối tượng cuối cùng còn lại, hoặc đối tượng vốn ít có khả năng xảy ra nhất, cũng bị cuốn vào tình huống bất lợi ('đến cả... cũng', 'ngay cả... mà cũng').",
    "longExplanation": "'~(이)나마저' (hay dạng chuẩn phổ biến nhất là trợ từ '~마저') là trợ từ bổ trợ đặc biệt trong tiếng Hàn. Nó thể hiện rằng không những các đối tượng khác đã như vậy, mà ngay đến hy vọng mong manh cuối cùng, người thân cận nhất hoặc vật phẩm sót lại sau cùng cũng không ngoại lệ. Cấu trúc này hầu như luôn gắn liền với tâm lý thất vọng, đau lòng, bất ngờ hoặc bất lực trước một hoàn cảnh tiêu cực không mong muốn.",
    "formation": "Danh từ + (이)나마저 (danh từ có phụ âm cuối dùng -이나마저; không có phụ âm cuối dùng -나마저; dạng căn bản phổ biến nhất là ~마저)",
    "examples": [
      {
        "translation": "Cô ấy ngay cả những môn học khó nhất trường cũng hiểu được một cách dễ dàng, thấy cô ấy nắm bắt trọn vẹn đến cả môn này nữa thì quả thực cô ấy quá xuất sắc."
      },
      {
        "translation": "Bình thường tôi rất hòa đồng với bạn bè, vậy mà đến cả người bạn thân đó dường như cũng ghét bỏ tôi nên tôi rất tổn thương."
      },
      {
        "translation": "Tất cả mọi người đều phản đối, nhưng anh ấy hiểu tầm quan trọng của việc có dù chỉ một người ủng hộ. Vậy mà khi đến cả người đó cũng phản đối thì tâm trạng anh ấy vô cùng tồi tệ."
      },
      {
        "translation": "Tôi đã lật tung mọi thứ trên bàn lên xem rồi, thế nhưng ngay cả món đồ quan trọng đó tôi cũng chẳng thể tìm ra."
      }
    ]
  },
  "ko_뿐만_5": {
    "title": "~뿐만 아니라 (Không những... mà còn..., không chỉ... mà còn...)",
    "shortExplanation": "Dùng để bổ sung thêm thông tin liên quan, diễn đạt ý 'không những... mà còn...', 'không chỉ... mà còn...'.",
    "longExplanation": "'~뿐만 아니라' được cấu thành từ phụ trợ từ '뿐' (chỉ), trợ từ bổ trợ '만' (chỉ, duy nhất) và phủ định từ '아니다' (không phải là). Cấu trúc này dùng để biểu thị sự bổ sung, nhấn mạnh rằng sự việc không chỉ dừng lại ở nội dung phía trước mà còn bao hàm cả nội dung ở vế sau. Thường kết hợp với các trợ từ như '-도' (cũng) ở vế sau để tăng tính liên kết và nhấn mạnh mức độ.",
    "formation": "Danh từ + 뿐만 아니라 | Thân động từ/tính từ + -(으)ㄹ 뿐만 아니라 (kết thúc bằng phụ âm dùng -을 뿐만 아니라, kết thúc bằng nguyên âm dùng -ㄹ 뿐만 아니라; thì quá khứ dùng -았/었을 뿐만 아니라)",
    "examples": [
      {
        "translation": "Cô ấy không những có thể nói tiếng Trung mà còn nói tiếng Nhật rất lưu loát."
      },
      {
        "translation": "Tôi không chỉ thích học tập mà còn thích cả thể thao nữa."
      },
      {
        "translation": "Sản phẩm này không những giá cả phải chăng mà chất lượng cũng rất vượt trội."
      },
      {
        "translation": "Anh ấy không chỉ sử dụng thành thạo tiếng Hàn mà tiếng Anh cũng rất lưu loát, nên đang làm công việc phiên dịch."
      }
    ]
  },
  "ko_더니_6": {
    "title": "~더니 / ~았/었더니 (Sau khi làm... thì nhận ra..., vì đã... nên...)",
    "shortExplanation": "Vĩ tố liên kết diễn tả sau khi người nói trực tiếp thực hiện một hành động trong quá khứ thì phát hiện ra một sự thật mới, hoặc hành động đó trở thành nguyên nhân dẫn đến kết quả ở vế sau.",
    "longExplanation": "'~더니' (khi đi với chủ ngữ ngôi thứ nhất hồi tưởng lại hành động của chính mình thường kết hợp dưới dạng '-았/었더니') là vĩ tố liên kết hồi tưởng. Nó diễn tả việc người nói sau khi đã trực tiếp trải nghiệm hoặc thực hiện một hành động ở vế trước thì phát hiện ra một tình huống hoặc kết quả bất ngờ ở vế sau ('sau khi... thì thấy rằng...'). Ngoài ra, nó cũng dùng để chỉ hành động của người nói trong quá khứ là nguyên nhân dẫn đến kết quả ở vế sau. Khi dùng trực tiếp '-더니' không có '-았/었-', cấu trúc này thường dùng cho ngôi thứ hai, thứ ba hoặc cảnh vật để đối chiếu sự thay đổi qua thời gian.",
    "formation": "Thân động từ/tính từ + -았/었더니 (hành động của bản thân ngôi thứ nhất: thân từ có nguyên âm ㅏ, ㅗ dùng -았더니, nguyên âm khác dùng -었더니, 하다 biến thành 했더니) | Thân động từ/tính từ + -더니 (khi quan sát sự thay đổi của người khác hoặc sự vật)",
    "examples": [
      {
        "translation": "Sau khi tôi ăn món này thì thấy vị của nó thực sự đã thay đổi, vì thế tôi quyết định đi tìm món khác để dùng."
      },
      {
        "translation": "Tôi gọi điện cho cô ấy thì mới biết cô ấy đang trong kỳ nghỉ nên không thể nhận cuộc gọi."
      },
      {
        "translation": "Tôi đến hiệu sách thì thấy cuốn sách mình muốn mua đã bán hết sạch rồi, nên phải tìm ở hiệu sách khác."
      },
      {
        "translation": "Đến quán pizza thì món pizza tôi định gọi đã hết sạch từ trước, đây là lần đầu tiên tôi gặp trường hợp như vậy."
      }
    ]
  },
  "ko_이든지_7": {
    "title": "~든지 ~든지 / ~(이)든지 (Dù là... hay là..., cho dù... hay...)",
    "shortExplanation": "Dùng để liệt kê nhiều sự lựa chọn hoặc khả năng khác nhau, biểu thị rằng dù chọn phương án nào thì kết quả hay hành động ở vế sau cũng không thay đổi ('dù là... hay là...').",
    "longExplanation": "'~든지 ~든지' (với danh từ dùng '(이)든지') là vĩ tố liên kết hoặc trợ từ biểu thị sự lựa chọn không phân biệt. Cấu trúc này dùng để liệt kê hai hay nhiều khả năng, hành động đối lập hoặc khác nhau, mang ý nghĩa rằng cho dù là phương án nào đi chăng nữa thì điều đó cũng không gây ảnh hưởng, không quan trọng đối với kết quả hay quyết định ở mệnh đề sau.",
    "formation": "Thân động từ/tính từ + -든지 ... -든지 | Danh từ + (이)든지 ... (이)든지 (danh từ có phụ âm cuối dùng -이든지, không có phụ âm cuối dùng -든지)",
    "examples": [
      {
        "translation": "Dù bạn thích cà phê hay thích trà, quán cà phê này đều có thể làm hài lòng tất cả mọi người."
      },
      {
        "translation": "Dù bạn ra ngoài sớm vào buổi sáng hay trở về muộn vào buổi tối, hãy hứa gặp nhau một tiếng mỗi ngày nhé."
      },
      {
        "translation": "Cho dù bạn thích bánh hamburger hay thích pizza, nhà hàng này đều có thể phục vụ tất cả các món."
      },
      {
        "translation": "Dù bạn đi du lịch vào ngày trong tuần hay cuối tuần, hãy cứ thoải mái tận hưởng chuyến đi mà không cần bận tâm nhé."
      }
    ]
  },
  "ko_임에_8": {
    "title": "~(으)ㅁ에 틀림없다 / ~임에 틀림없다 (Chắc chắn là..., ắt hẳn là..., không còn nghi ngờ gì nữa)",
    "shortExplanation": "Dùng để diễn tả sự khẳng định hoặc phán đoán với độ chắc chắn rất cao, mang nghĩa 'chắc chắn là...', 'không nghi ngờ gì nữa'.",
    "longExplanation": "'~(으)ㅁ에 틀림없다' là cấu trúc kết hợp giữa đuôi danh từ hóa '-(으)ㅁ', trợ từ chỉ phương hướng/đối tượng '에' và tính từ '틀림없다' (không có sai sót, chắc chắn). Nó được dùng để khẳng định một phán đoán mang tính chắc chắn tuyệt đối dựa trên căn cứ rõ ràng, tương đương với 'chắc chắn là...', 'ắt hẳn là...', 'không còn nghi ngờ gì nữa'. Cấu trúc này thường xuất hiện trong phong cách trang trọng hoặc văn viết chính thức.",
    "formation": "Danh từ + 임에 틀림없다 | Thân động từ/tính từ + -(으)ㅁ에 틀림없다 (có phụ âm cuối dùng -음에 틀림없다, không có phụ âm cuối dùng -ㅁ에 틀림없다; thì quá khứ dùng -았/었음에 틀림없다; tương lai dùng -(으)ㄹ 것임에 틀림없다)",
    "examples": [
      {
        "translation": "Dù sự xuất hiện của anh ấy chắc chắn là đã thành công, nhưng tài năng của anh ấy chắc chắn còn vượt trội hơn thế nữa."
      },
      {
        "translation": "Tỉ lệ thắng của đội chúng ta rất cao, nên chắc chắn rằng chúng ta sẽ giành chiến thắng."
      },
      {
        "translation": "Dù anh ấy có bị người khác chỉ trích đi chăng nữa, thì sự lựa chọn của anh ấy chắc chắn là đúng đắn."
      },
      {
        "translation": "Theo dự báo của đài quan sát khí tượng, chắc chắn ngày mai trời sẽ mưa."
      }
    ]
  },
  "ko_쩌면_9": {
    "title": "쩌면 / 어쩌면 (Có lẽ, biết đâu chừng, có khi)",
    "shortExplanation": "Phó từ dùng để diễn tả sự suy đoán hoặc tính khả năng không chắc chắn của người nói ('có lẽ', 'biết đâu chừng').",
    "longExplanation": "'쩌면' là dạng rút gọn trong khẩu ngữ của phó từ '어쩌면'. Từ này thường đứng ở đầu câu để diễn tả sự phán đoán mang tính phỏng đoán, e dè hoặc không chắc chắn về một sự việc, hiện tượng nào đó. Nó thường đi kèm với các vĩ tố phỏng đoán như '-(으)ㄹ지도 모르다' (không biết chừng), '-(으)ㄹ 수도 있다' (cũng có thể) hoặc '-(으)ㄹ 것 같다' (hình như, dường như).",
    "formation": "쩌면 / 어쩌면 + Mệnh đề (thường kết hợp với -(으)ㄹ지도 모르다, -(으)ㄹ 수도 있다, -(으)ㄹ 것 같다 ở cuối câu)",
    "examples": [
      {
        "translation": "Có lẽ anh ấy đã thực lòng yêu bạn cũng không biết chừng."
      },
      {
        "translation": "Có lẽ mối xung đột này cũng có thể được giải quyết ổn thỏa."
      },
      {
        "translation": "Biết đâu chừng kế hoạch đó lại có thể thành công cũng nên."
      },
      {
        "translation": "Có khi kỳ thi lần này lại là kỳ thi khó khăn nhất cũng nên."
      }
    ]
  },
  "ko_치고는_10": {
    "title": "~치고는 (So với..., xét là... thì...)",
    "shortExplanation": "Dùng sau danh từ để biểu thị sự so sánh với tiêu chuẩn hay mong đợi thông thường, mang nghĩa 'so với...', 'xét là... thì...'.",
    "longExplanation": "'~치고는' là cấu trúc kết hợp giữa trợ từ '치고' (xét trong phạm trù) và trợ từ đối chiếu nhấn mạnh '는'. Cấu trúc này dùng sau danh từ để đưa ra một chuẩn mực, tiêu chuẩn hay quy luật thông thường, sau đó chỉ ra rằng sự việc hay đối tượng thực tế lại mang tính ngoại lệ — có thể tốt hơn hoặc tệ hơn so với mức mong đợi thông thường của phạm trù đó. Tương đương trong tiếng Việt là 'so với...', 'xét là... thì...', 'đối với một... mà nói thì khá là...'.",
    "formation": "Danh từ + 치고는",
    "examples": [
      {
        "translation": "So với một tài xế mới tập lái thì bạn lái xe khá là giỏi đấy."
      },
      {
        "translation": "So với thời tiết mùa đông thì thời tiết hôm nay ấm áp vô cùng."
      },
      {
        "translation": "So với mức giá thành thì chất lượng vô cùng tuyệt vời."
      },
      {
        "translation": "Xét theo độ tuổi thì trông bác rất khỏe mạnh đấy ạ."
      }
    ]
  },
  "ko_커녕_11": {
    "title": "~은/는커녕 / ~기는커녕 (Chẳng những không... mà còn..., nói gì đến...)",
    "shortExplanation": "Trợ từ dùng để nhấn mạnh rằng không những điều được kỳ vọng không xảy ra, mà ngay cả mức tối thiểu cũng không đạt được hoặc ngược lại còn tệ hơn ('nói gì đến...', 'chẳng những không... mà...').",
    "longExplanation": "'~커녕' (với danh từ thường dùng '-은/는커녕', với động từ/tính từ dùng '-기는커녕') là trợ từ biểu đạt sự phủ định mạnh mẽ. Nó nhấn mạnh rằng sự việc được nêu ra ở vế trước là điều đáng lẽ phải xảy ra hoặc là kỳ vọng tự nhiên nhưng thực tế lại hoàn toàn không đạt được, thậm chí ngay cả điều cơ bản, tối thiểu hơn ở vế sau cũng chẳng làm được hoặc ngược lại xảy ra tình huống tồi tệ hơn. Thường đi kèm với các trợ từ nhấn mạnh tiêu cực ở vế sau như '-도' (cũng), '-조차' (thậm chí, ngay cả).",
    "formation": "Danh từ + 은/는커녕 (có phụ âm cuối dùng -은커녕, không có phụ âm cuối dùng -는커녕) | Thân động từ/tính từ + -기는커녕",
    "examples": [
      {
        "translation": "Nói là sẽ lập kế hoạch chu đáo, nhưng chẳng những chưa bắt đầu mà ngay cả chuẩn bị cũng chưa làm được gì."
      },
      {
        "translation": "Cứ ngỡ là sẽ không bị muộn giờ hẹn, ai ngờ đến sớm chẳng thấy đâu mà ngược lại còn đến muộn mất rồi."
      },
      {
        "translation": "Đến thư viện để học bài, vậy mà đọc sách đâu chẳng thấy, chỉ toàn gật gù ngủ gục là hết cả ngày."
      },
      {
        "translation": "Cứ háo hức đi đợt giảm giá, nhưng nói gì đến chuyện mua rẻ, kết cục lại thành ra phải mua đắt hơn."
      }
    ]
  },
  "ko_판에_12": {
    "title": "-(으)ㄴ/는 판에 / ~판에 (Trong lúc..., giữa tình cảnh..., trong hoàn cảnh...)",
    "shortExplanation": "Dùng để diễn tả một hành động hay sự việc xảy ra ngay giữa bối cảnh, tình thế hoặc cục diện cụ thể nào đó ('trong tình cảnh...', 'giữa lúc...').",
    "longExplanation": "'판' là danh từ phụ thuộc chỉ tình thế, cục diện hoặc hoàn cảnh diễn ra sự việc. Cấu trúc '-(으)ㄴ/는 판에' diễn tả rằng một sự việc hay hành động nào đó diễn ra ngay giữa lúc hoặc trong bối cảnh tình hình phía trước đang diễn biến. Cấu trúc này thường dùng để làm nổi bật sự éo le, tính cấp bách hoặc sự việc xảy ra không đúng lúc trong một hoàn cảnh cụ thể.",
    "formation": "Thân động từ + -는 판에 (hiện tại) / -(으)ㄴ 판에 (quá khứ/hoàn thành) | Danh từ + 판에",
    "examples": [
      {
        "translation": "Giữa lúc học kỳ mới đã bắt đầu, một học sinh mới đã nhập học."
      },
      {
        "translation": "Trong tình cảnh công ty bắt đầu đóng cửa ngừng hoạt động từ hôm nay, tôi đang phải đi tìm việc làm mới."
      },
      {
        "translation": "Giữa lúc đang ráo riết chuẩn bị cho dự án kinh doanh trọng điểm, cổ phiếu của công ty đã tăng vọt."
      },
      {
        "translation": "Đúng lúc tôi đang cắm đầu ôn thi thì bạn bè lại kéo nhau sang chơi."
      }
    ]
  },
  "ko_하건마는_13": {
    "title": "~건마는 / ~건만 (Tuy... thế nhưng..., những tưởng... vậy mà...)",
    "shortExplanation": "Vĩ tố liên kết mang sắc thái văn viết biểu thị sự tương phản, nghịch lý giữa hai vế câu, thường kèm theo cảm xúc tiếc nuối, thất vọng ('tuy... thế nhưng...', 'vậy mà...').",
    "longExplanation": "'~건마는' (dạng rút gọn là '~건만') là vĩ tố liên kết mang phong cách văn chương, cổ điển. Nó diễn tả việc vế trước thừa nhận một sự thật, ý định hay kỳ vọng, nhưng vế sau lại diễn ra một tình huống trái ngược hoàn toàn hoặc không như mong đợi. Cấu trúc này thường chuyên chở tâm trạng tiếc nuối, xót xa, buồn phiền hoặc thở dài trước sự việc bất như ý.",
    "formation": "Thân động từ/tính từ + -건마는 (thì quá khứ kết hợp với -았/었건마는)",
    "examples": [
      {
        "translation": "Tôi theo học chuyên ngành thiết kế đồ họa thế nhưng lại không thạo máy tính, nên việc sử dụng phần mềm thiết kế có vẻ khá khó khăn."
      },
      {
        "translation": "Hôm nay thời tiết đẹp những tưởng sẽ đi dạo được thế mà đột nhiên trời lại đổ mưa nên chẳng thể đi dạo."
      },
      {
        "translation": "Tôi rất muốn giỏi tiếng Hàn thế nhưng việc ghi nhớ từ vựng quá đỗi gian nan, thành ra ngày nào cũng học mà vẫn chẳng nhớ nổi."
      },
      {
        "translation": "Bạn tôi đã hứa sẽ tặng quà sinh nhật cho tôi vậy mà bạn ấy lại quên mất món quà nên chẳng tặng tôi thứ gì."
      }
    ]
  },
  "ko_하더라도_14": {
    "title": "-더라도 / ~하더라도 (Cho dù... thì cũng..., dẫu có... đi chăng nữa)",
    "shortExplanation": "Vĩ tố liên kết giả định nhượng bộ, biểu thị ý nghĩa 'cho dù... thì cũng...', nhấn mạnh rằng tình huống ở vế sau không bị thay đổi bởi điều kiện giả định ở vế trước.",
    "longExplanation": "'-더라도' (với các động từ gắn với 하다 tạo thành '~하더라도') là vĩ tố liên kết biểu thị sự giả định nhượng bộ. Nó được dùng khi giả định một tình huống hay điều kiện ở mệnh đề trước, đồng thời nhấn mạnh rằng cho dù điều đó có thực sự xảy ra đi chăng nữa thì ý chí, hành động hay kết quả ở mệnh đề sau vẫn không hề bị lay chuyển hay ảnh hưởng. Tương đương trong tiếng Việt là 'cho dù... thì vẫn...', 'dẫu cho... đi chăng nữa'.",
    "formation": "Thân động từ/tính từ + -더라도 (thì quá khứ kết hợp với -았/었더라도)",
    "examples": [
      {
        "translation": "Dù trời có mưa đi nữa thì tôi cũng sẽ không mang ô đâu, vì tôi rất ghét dùng ô."
      },
      {
        "translation": "Dù có mệt mỏi thì tôi vẫn phải tiếp tục học bài, vì kỳ thi sắp đến rồi."
      },
      {
        "translation": "Cho dù phải dậy sớm thì tôi vẫn luôn phải tập thể dục, vì sức khỏe của bản thân."
      },
      {
        "translation": "Dẫu cho không có thời gian thì tôi vẫn phải chăm chỉ tiếp tục học tiếng Hàn, vì tôi rất quan tâm đến tiếng Hàn."
      }
    ]
  },
  "ko_하든지_15": {
    "title": "~든지 말든지 (Dù có... hay không thì..., mặc kệ... hay không)",
    "shortExplanation": "Cấu trúc biểu thị sự bàng quan, không bận tâm đến việc hành động đó có diễn ra hay không, mang nghĩa 'dù có... hay không thì...', 'mặc kệ... hay không'.",
    "longExplanation": "'~든지 말든지' là cấu trúc kết hợp giữa vĩ tố liên kết lựa chọn '-든지' và trợ động từ phủ định '말다' (thôi, không làm). Nó được dùng để liệt kê hai khả năng đối lập: thực hiện hành động đó hoặc không thực hiện. Cấu trúc này thể hiện thái độ dứt khoát, mặc kệ hoặc không quan tâm của người nói, nhấn mạnh rằng đối phương hay sự việc có diễn ra như thế nào đi nữa thì quyết định, kế hoạch hay tình cảm ở mệnh đề sau vẫn không hề bị suy chuyển.",
    "formation": "Thân động từ + -든지 말든지 (với động từ 하다 là 하든지 말든지; động từ kết thúc không có 하다 dùng Thân động từ + -든지 말든지, ví dụ: 오든지 말든지, 먹든지 말든지)",
    "examples": [
      {
        "translation": "Người đó có thích hay không thích thì chúng tôi vẫn sẽ tiến hành theo đúng kế hoạch."
      },
      {
        "translation": "Hôm nay trời mưa hay không mưa thì chúng tôi vẫn lên kế hoạch tiếp tục đi dạo."
      },
      {
        "translation": "Cậu có tham gia hay không thì bữa tiệc này vẫn sẽ tiếp tục diễn ra."
      },
      {
        "translation": "Dù cô ấy có yêu tôi hay không thì tôi vẫn sẽ tiếp tục yêu cô ấy."
      }
    ]
  },
  "ko_하려니와_16": {
    "title": "-(으)려니와 / ~하려니와 (Định làm... thế nhưng..., muốn... vậy mà...)",
    "shortExplanation": "Vĩ tố liên kết diễn tả ý định muốn làm một việc gì đó nhưng lại gặp phải trở ngại, tình huống bất ngờ cản trở khiến sự việc không thành ('định làm... nhưng...').",
    "longExplanation": "'-(으)려니와' (khi gắn với 하다 tạo thành '~하려니와') là vĩ tố liên kết kết hợp ý định '-(으)려고 하다' với vĩ tố liên kết '-거니와'. Trong ngữ cảnh diễn đạt sự cản trở, nó biểu thị rằng người nói có ý định hoặc nỗ lực thực hiện hành động ở vế trước, thế nhưng lại xuất hiện khó khăn, trở ngại bất ngờ ở vế sau khiến cho kế hoạch không thể hoàn thành như mong muốn. (Lưu ý: trong văn viết chuẩn, cấu trúc này còn có nghĩa phán đoán và bổ sung thông tin 'đã định... lại còn...').",
    "formation": "Thân động từ + -(으)려니와 (thân từ có phụ âm cuối dùng -으려니와, không có phụ âm cuối hoặc kết thúc bằng ㄹ dùng -려니와; với 하다 biến thành 하려니와)",
    "examples": [
      {
        "translation": "Hôm nay tôi định cùng bạn bè đi xem phim thế nhưng thời tiết đột ngột trở xấu nên kế hoạch đã đổ bể."
      },
      {
        "translation": "Tôi muốn thử làm món ăn với nhiều hương vị đa dạng hơn nhưng vì tay nghề nấu nướng còn vụng về nên làm không được ngon."
      },
      {
        "translation": "Tôi định ngủ thật sớm thế nhưng bao nhiêu suy nghĩ cứ lướt qua trong đầu làm tôi không tài nào chợp mắt được."
      },
      {
        "translation": "Tôi muốn bắt đầu tập thể dục nhưng vì cứ ru rú ở nhà không thu xếp được thời gian nên đến giờ vẫn chưa bắt đầu được."
      }
    ]
  },
  "ko_하여간_17": {
    "title": "하여간 / ~하여간 (Dù thế nào đi nữa, dù sao chăng nữa, bằng mọi giá)",
    "shortExplanation": "Phó từ dùng để biểu thị quyết tâm thực hiện hành vi bất chấp mọi khó khăn, trở ngại, mang nghĩa 'dù sao đi nữa', 'dù thế nào chăng nữa'.",
    "longExplanation": "'하여간' (Hán tự: 何如間) là phó từ có nghĩa tương tự như '어찌 되었든 간에' (dù thế nào đi nữa) hoặc '아무튼' (dù sao chăng nữa). Nó diễn tả thái độ kiên định hoặc quyết tâm cao độ, khẳng định rằng bất luận hoàn cảnh xung quanh có phức tạp hay trở ngại thế nào thì chủ ngữ vẫn sẽ tìm mọi cách, bằng mọi giá nỗ lực để hướng tới và đạt được kết quả mong đợi.",
    "formation": "Động từ/Tính từ liên kết + 하여간 | Đứng độc lập như một phó từ ở đầu hoặc giữa câu",
    "examples": [
      {
        "translation": "Dù chưa chuẩn bị kỹ cho kỳ thi, nhưng bằng mọi giá tôi cũng sẽ nỗ lực để thi đỗ."
      },
      {
        "translation": "Dẫu hoàn cảnh kinh tế muôn vàn khó khăn, nhưng dù thế nào chăng nữa tôi cũng phải cố gắng tằn tiện để gom góp học phí."
      },
      {
        "translation": "Cho dù có gian nan vất vả, nhưng nếu cứ kiên trì bằng mọi giá thì nhất định sẽ đạt được mục tiêu ấy."
      },
      {
        "translation": "Dù cần một khoản kinh phí rất lớn, nhưng nếu dù sao đi nữa vẫn chi tiêu tằn tiện thì chắc chắn sẽ hiện thực hóa được ước mơ."
      }
    ]
  },
  "ko_하여야만_18": {
    "title": "-아/어야만 / ~하여야만 (Chỉ khi... mới có thể..., phải... thì mới...)",
    "shortExplanation": "Vĩ tố liên kết nhấn mạnh điều kiện tiên quyết tuyệt đối, biểu thị rằng chỉ khi thỏa mãn điều kiện ở vế trước thì kết quả ở vế sau mới có thể xảy ra ('chỉ khi... mới...').",
    "longExplanation": "'-아/어야만' (khi gắn với các động từ có đuôi 하다 sẽ thành '~하여야만' hoặc '~해야만') là cấu trúc được cấu tạo bởi vĩ tố liên kết chỉ điều kiện bắt buộc '-아/어야' và trợ từ nhấn mạnh độc nhất '만' (chỉ). Cấu trúc này nhấn mạnh rằng hành động hoặc trạng thái ở vế trước là điều kiện tiên quyết duy nhất, bắt buộc không thể thay thế; nếu không đáp ứng được điều kiện đó thì tuyệt đối không thể đạt được kết quả ở mệnh đề sau. Vế sau thường kết hợp với dạng có thể '-(으)ㄹ 수 있다' hoặc mệnh đề kết quả tất yếu.",
    "formation": "Thân động từ/tính từ + -아/어야만 (kết thúc bằng nguyên âm ㅏ, ㅗ dùng -아야만; các nguyên âm khác dùng -어야만; 하다 biến thành 하여야만 hoặc 해야만)",
    "examples": [
      {
        "translation": "Chỉ khi thức dậy sớm thì mới có thể đến nơi đúng giờ làm việc."
      },
      {
        "translation": "Phải thảo luận với bác sĩ đã thấu hiểu hoàn cảnh của bạn thì mới có thể thay đổi kế hoạch phẫu thuật được."
      },
      {
        "translation": "Chỉ khi có thu nhập ổn định thì mới có thể vay thế chấp mua nhà."
      },
      {
        "translation": "Chỉ khi theo sát bài bản các bài huấn luyện thì mới có thể thi đỗ được kỳ thi."
      }
    ]
  },
  "ko_해야겠다_19": {
    "title": "-아/어야겠다 / ~해야겠다 (Phải... thôi, chắc phải... mới được)",
    "shortExplanation": "Đuôi câu diễn tả ý chí hoặc quyết định tức thời của người nói rằng mình cần phải thực hiện một hành động nào đó ('chắc phải... thôi').",
    "longExplanation": "'-아/어야겠다' (kết hợp với động từ 하다 tạo thành '~해야겠다') là cấu trúc được tạo thành từ vĩ tố chỉ nghĩa vụ '-아/어야 하다' và vĩ tố phỏng đoán/ý chí '-겠-'. Nó diễn tả việc người nói nhận thức thấy sự cần thiết của một hành động trong hoàn cảnh hiện tại và lập tức đưa ra quyết định, ý chí thực hiện hành động đó. Tương đương trong tiếng Việt là 'chắc phải... thôi', 'phải... mới được', 'sẽ phải... ngay'.",
    "formation": "Thân động từ + -아/어야겠다 (nguyên âm 끝 là ㅏ, ㅗ dùng -아야겠다; các nguyên âm khác dùng -어야겠다; 하다 biến thành 해야겠다)",
    "examples": [
      {
        "translation": "Bây giờ đã muộn rồi nên tôi phải về nhà thôi."
      },
      {
        "translation": "Ngày mai có bài thi nên tối nay tôi chắc phải học bài thôi."
      },
      {
        "translation": "Cân nặng cứ tiếp tục tăng lên nên tôi phải bắt đầu tập thể dục mới được."
      },
      {
        "translation": "Lâu lắm rồi không liên lạc nên tôi phải gọi điện cho bạn mình mới được."
      }
    ]
  },
  "ko_에_20": {
    "title": "~에 근거하여 (Căn cứ vào..., dựa trên...)",
    "shortExplanation": "Dùng để diễn tả hành động, nhận định hoặc kết luận được đưa ra dựa trên một căn cứ, quy tắc hoặc dữ liệu cụ thể nào đó ('căn cứ vào...', 'dựa trên...').",
    "longExplanation": "'~에 근거하여' là biểu hiện kết hợp giữa trợ từ chỉ phương hướng/căn cứ '에' và dạng liên kết '-어' của động từ '근거하다' (căn cứ vào). Cấu trúc này dùng để nêu rõ nguồn gốc, tiêu chuẩn hoặc cơ sở lý luận, dữ liệu thực tế, pháp luật làm chỗ dựa cho mệnh đề phía sau. Cấu trúc này mang sắc thái trang trọng, khách quan, thường xuyên xuất hiện trong các bài báo cáo, văn bản pháp luật, nghiên cứu học thuật hoặc thời sự chính luận.",
    "formation": "Danh từ + 에 근거하여 (trong văn phong viết có thể dùng Danh từ + 에 근거한 + Danh từ khi bổ nghĩa)",
    "examples": [
      {
        "translation": "Căn cứ vào dữ liệu, sản phẩm này đã bán chạy nhất."
      },
      {
        "translation": "Dựa trên luật pháp, việc anh ấy làm sai đã được chứng minh."
      },
      {
        "translation": "Dựa trên các nghiên cứu khoa học, hiện tượng ấm lên toàn cầu là một vấn đề nghiêm trọng."
      },
      {
        "translation": "Căn cứ vào bài đánh giá của cô ấy, nghe nói nhà hàng này vị không được ngon lắm."
      }
    ]
  },
  "ko_에_21": {
    "title": "~에 비추어 볼 때 (So với..., xét theo..., đối chiếu với...)",
    "shortExplanation": "Dùng để so sánh, đối chiếu với một đối tượng, tiêu chuẩn hoặc hoàn cảnh khác nhằm đưa ra đánh giá, nhận xét ('so với...', 'chiếu theo... mà thấy').",
    "longExplanation": "'~에 비추어 볼 때' được tạo thành từ trợ từ '에', động từ '비추다' (chiếu rọi, soi xét) dạng liên kết '-어', và cấu trúc '보다' + '-(으)ㄹ 때' (khi nhìn, khi xem xét). Cấu trúc này dùng để đặt một sự việc, hoàn cảnh bên cạnh một đối tượng so sánh hoặc một tiêu chuẩn nhất định nhằm rút ra kết luận, đánh giá hoặc nhận định. Nó mang tính suy ngẫm, đối chiếu sâu sắc và thường được dùng trong các bài phát biểu, văn viết bình luận hoặc hội thoại trang trọng.",
    "formation": "Danh từ + 에 비추어 볼 때 (hoặc Danh từ + 에 비추어 보면)",
    "examples": [
      {
        "translation": "So với đất nước chúng ta, văn hóa của nước Mỹ rất khác biệt."
      },
      {
        "translation": "Đối chiếu với quá khứ của bản thân, tôi thấy mình đã thay đổi rất nhiều."
      },
      {
        "translation": "So với Seoul thì Busan yên tĩnh hơn nhiều."
      },
      {
        "translation": "So với những người khác thì anh ấy đặc biệt xuất chúng."
      }
    ]
  },
  "ko_이다_22": {
    "title": "~다 보니 / ~(이)다 보니 (Vì liên tục làm... nên nhận ra..., do là... nên...)",
    "shortExplanation": "Diễn tả việc liên tục thực hiện một hành động hoặc ở trong một trạng thái trong suốt thời gian dài, dẫn đến một kết quả mới hoặc tự nhiên nhận ra một điều gì đó.",
    "longExplanation": "'~다 보니' là vĩ tố liên kết kết hợp giữa vĩ tố nối '-다' và động từ '보다' kèm theo đuôi nguyên nhân/phát hiện '-니'. Cấu trúc này dùng để diễn đạt ý: trong quá trình người nói lặp đi lặp lại một hành động hoặc duy trì một trạng thái trong thời gian dài, thì tự nhiên dẫn đến kết quả ở mệnh đề sau hoặc người nói dần phát hiện ra một sự thật mới. Mệnh đề trước là hành động mang tính liên tục, thói quen; mệnh đề sau thường là kết quả khách quan hoặc sự nhận thức tự nhiên theo thời gian.",
    "formation": "Thân động từ + -다 보니 | Danh từ + -(이)다 보니 (danh từ có phụ âm cuối dùng -이다 보니, không có phụ âm cuối dùng -다 보니)",
    "examples": [
      {
        "translation": "Do ngày nào cũng đi bộ trên cùng một con đường nên tôi đã trở nên thông thạo khu phố này."
      },
      {
        "translation": "Sống ở Hàn Quốc một tháng nên tiếng Hàn của tôi đã trở nên thoải mái hơn một chút."
      },
      {
        "translation": "Vì cùng làm việc chung một công ty nên chúng tôi đã trở nên thân thiết với nhau."
      },
      {
        "translation": "Nhờ chăm chỉ tập thể dục mỗi sáng nên dường như cơ thể tôi đã trở nên khỏe mạnh hơn."
      }
    ]
  },
  "ko_이라면_23": {
    "title": "~(이)라면 그것은 (Nếu nói đến... thì đó chính là..., nếu gọi là... thì đó là...)",
    "shortExplanation": "Dùng để đưa ra một khái niệm hoặc chủ đề trọng tâm, sau đó định nghĩa hoặc giải thích bản chất thực sự của nó một cách chi tiết.",
    "longExplanation": "'~(이)라면 그것은' là sự kết hợp giữa trợ từ liên kết giả định/chủ đề '-(이)라면' (nếu nói là...) và đại từ chỉ thị '그것은' (điều đó thì). Mẫu câu này được dùng như một phương thức tu từ để khơi mở một khái niệm trừu tượng (như tình yêu, tự do, tình bạn, thành công) ở vế trước, rồi tiếp tục đưa ra định nghĩa, bản chất cốt lõi hoặc quan điểm cá nhân sâu sắc ở mệnh đề phía sau. Đuôi câu thường kết thúc bằng các dạng định nghĩa như '-을/를 말한다' (nghĩa là), '-는 것이다' (chính là việc...).",
    "formation": "Danh từ + (이)라면 그것은 + Mệnh đề giải thích/định nghĩa (danh từ có phụ âm cuối dùng -이라면 그것은, không có phụ âm cuối dùng -라면 그것은)",
    "examples": [
      {
        "translation": "Nếu nói đến tình yêu, thì đó là việc biết quan tâm và thấu hiểu đối phương."
      },
      {
        "translation": "Nếu nói đến tự do, thì đó chính là việc suy nghĩ và lời nói của bản thân không bị giới hạn."
      },
      {
        "translation": "Nếu gọi là bạn bè, thì đó là mối quan hệ biết thấu hiểu và tương trợ lẫn nhau."
      },
      {
        "translation": "Nếu nói đến thành công, thì đó là việc đạt được mục tiêu và hoàn thành ước mơ của bản thân."
      }
    ]
  },
  "ko_이래_24": {
    "title": "~이래 / ~이래로 (Kể từ sau khi..., từ đó đến nay...)",
    "shortExplanation": "Chỉ một mốc thời gian hoặc sự kiện trong quá khứ, biểu thị một tình trạng hoặc sự thay đổi liên tục kéo dài từ thời điểm đó cho đến tận hiện tại.",
    "longExplanation": "'~이래' (thường đi kèm trợ từ phương hướng/thời gian thành '~이래로') là danh từ phụ thuộc chỉ mốc thời gian, có nghĩa là 'kể từ sau khi...'. Cấu trúc này dùng sau một danh từ chỉ thời điểm hoặc một sự kiện quan trọng trong quá khứ nhằm nhấn mạnh tình trạng, thói quen hoặc sự biến đổi mới bắt đầu nảy sinh từ cột mốc đó và vẫn tiếp tục duy trì đến nay. Thường xuất hiện trong cả văn nói lẫn văn viết trang trọng.",
    "formation": "Danh từ (chỉ thời điểm hoặc sự kiện) + 이래(로) | Định từ quá khứ -(으)ㄴ + 이래(로)",
    "examples": [
      {
        "translation": "Kể từ vụ tai nạn đó, tôi không thể lái xe ô tô được nữa, vì vậy tôi phải di chuyển bằng xe buýt và tàu điện ngầm."
      },
      {
        "translation": "Từ mùa xuân đến nay tôi bị dị ứng phấn hoa rất khổ sở, vì thế tôi vẫn đang uống thuốc liên tục."
      },
      {
        "translation": "Kể từ cuộc họp trước, bầu không khí văn phòng liên tục xấu đi, nhiều người đang bày tỏ sự bất mãn."
      },
      {
        "translation": "Kể từ khi nghe tin người bạn lâu ngày mới gặp đã kết hôn thì tôi chưa gặp lại bạn ấy lần nào, nên có lẽ tôi phải liên lạc thôi."
      }
    ]
  },
  "ko_이야말로_25": {
    "title": "~(이)야말로 (Chính là..., quả thực là...)",
    "shortExplanation": "Trợ từ dùng để nhấn mạnh đối tượng đứng trước là trường hợp tiêu biểu, đích thực hoặc điển hình nhất trong số các lựa chọn ('chính là...', 'mới thực sự là...').",
    "longExplanation": "'~(이)야말로' là trợ từ bổ trợ được kết hợp từ trợ từ nhấn mạnh '(이)야' và trợ từ '말' (lời nói) cùng trợ từ công cụ '로'. Nó được dùng để chỉ định và nhấn mạnh đối tượng được nhắc đến chính là ví dụ tiêu biểu nhất, không thể bàn cãi về một phẩm chất hay vai trò nào đó. Tương đương với các từ như 'chính là...', 'mới thực sự là...', 'quả đúng là...'. Thường mang ngữ khí trang trọng, xác quyết và đầy cảm xúc.",
    "formation": "Danh từ + (이)야말로 (danh từ có phụ âm cuối dùng -이야말로, không có phụ âm cuối dùng -야말로)",
    "examples": [
      {
        "translation": "Bạn học sinh đó quả thực là một học sinh gương mẫu; bạn ấy luôn chăm chỉ học tập và có tinh thần trách nhiệm rất cao."
      },
      {
        "translation": "Chính khoảnh khắc lúc này đây là cơ hội mà chúng ta hằng chờ đợi; nếu bỏ lỡ cơ hội lần này thì sẽ không còn cơ hội nào nữa đâu."
      },
      {
        "translation": "Giọng ca chính này quả thực là linh hồn cốt lõi của ban nhạc; nếu không có giọng hát của cô ấy thì thậm chí không thể tưởng tượng nổi ban nhạc này."
      },
      {
        "translation": "Sự việc đó chính là bước ngoặt quan trọng trong cuộc đời tôi; nhờ việc đó mà cuộc đời tôi đã thay đổi hoàn toàn."
      }
    ]
  },
  "ko_인_26": {
    "title": "-(으)ㄴ/는 까닭에 / ~인 까닭에 (Vì lý do là..., do nguyên cớ...)",
    "shortExplanation": "Dùng trong văn viết trang trọng để giải thích nguyên nhân hoặc lý do dẫn đến kết quả ở mệnh đề sau ('vì lý do...', 'do...').",
    "longExplanation": "'~까닭에' là biểu hiện nguyên nhân kết hợp từ danh từ chỉ nguyên cớ '까닭' (lý do, căn nguyên) và trợ từ '에'. Nó tương đương với 'vì...', 'do nguyên cớ...' nhưng mang đậm sắc thái văn phong văn học, trang trọng hơn nhiều so với các liên từ khẩu ngữ như '-아서/어서' hay '때문에'. Cấu trúc này dùng để trình bày căn nguyên của một sự tình hoặc kết quả một cách khách quan, mạch lạc.",
    "formation": "Thân động từ + -는 까닭에 (quá khứ dùng -(으)ㄴ 까닭에) | Thân tính từ + -(으)ㄴ 까닭에 (có phụ âm cuối dùng -은 까닭에, không có phụ âm cuối dùng -ㄴ 까닭에) | Danh từ + -인 까닭에",
    "examples": [
      {
        "translation": "Nhờ cha mẹ luôn khỏe mạnh nên tôi lúc nào cũng cảm thấy hạnh phúc."
      },
      {
        "translation": "Do thời tiết đẹp nên hôm nay tôi đã đi dạo."
      },
      {
        "translation": "Vì đã chuẩn bị chuyến đi một cách kỹ lưỡng nên tôi không cảm thấy bất tiện nào trong suốt chuyến du lịch."
      },
      {
        "translation": "Vì đã xem xét kỹ lưỡng các dạng bài nên khi học trong kỳ nghỉ, không có bài tập nào là tôi chưa từng chạm đến."
      }
    ]
  },
  "ko_인_27": {
    "title": "~인즉 / ~인 즉 (Nói cách khác là..., tức là..., xét ra thì...)",
    "shortExplanation": "Dùng để giải thích lại, làm sáng tỏ thêm nội dung vừa phát biểu bằng một cách diễn đạt khác ('nói cách khác là...', 'tức là...').",
    "longExplanation": "'~인즉' là dạng kết hợp giữa trợ từ xác định '-(이)라' hoặc tiếp từ danh từ và trợ từ nhấn mạnh '-(으)ㄴ즉'. Cấu trúc này thường đứng ở đầu câu liên kết hoặc sau một mệnh đề để giải thích cụ thể, diễn giải lại bản chất của sự việc vừa nêu bằng ngôn từ trực diện, rõ ràng hơn ('tức là...', 'nói cách khác là...', 'điều đó đồng nghĩa với việc...'). Nó mang tính phân tích, làm sáng tỏ mạch lập luận.",
    "formation": "Danh từ + 인즉 (hoặc dùng độc lập như phó từ liên kết: 즉) | Vị từ kết hợp -(으)ㄴ/는즉",
    "examples": [
      {
        "translation": "Anh ấy là một người lập dị, tức là hành vi của anh ấy khác biệt hẳn so với người bình thường."
      },
      {
        "translation": "Kỳ thi lần này rất khó khăn, nói cách khác là có rất nhiều học sinh bị điểm thấp."
      },
      {
        "translation": "Cậu là người bạn thân nhất của tôi, tức là người mà tôi tin tưởng nhất."
      },
      {
        "translation": "Trái đất đang ấm dần lên, nói cách khác là hiện tượng nóng lên toàn cầu đang thực sự diễn ra."
      }
    ]
  },
  "ko_처럼_28": {
    "title": "~처럼 하다 / ~(으)ㄴ/는 척하다 (Làm ra vẻ như..., vờ như..., hành động như thể...)",
    "shortExplanation": "Dùng để diễn tả việc ai đó bắt chước, giả vờ hoặc làm ra vẻ như mình đang ở trong một trạng thái nào đó dù thực tế không phải vậy.",
    "longExplanation": "'~처럼 하다' (thường kết hợp dưới dạng tương đương là '-(으)ㄴ/는 척하다' hoặc '~처럼 행동하다') là cách diễn đạt biểu thị hành vi giả tạo, vờ vịt. Người nói miêu tả một chủ thể đang cố tình bắt chước điệu bộ, cảm xúc hoặc năng lực của một đối tượng hay trạng thái nào đó nhằm che giấu sự thật hoặc tạo ấn tượng với người xung quanh ('giả vờ như...', 'hành động như thể...').",
    "formation": "Danh từ + 처럼 하다/행동하다 | Thân động từ/tính từ + -(으)ㄴ/는 척하다 (thì hiện tại động từ dùng -는 척하다, tính từ hoặc quá khứ động từ dùng -(으)ㄴ 척하다)",
    "examples": [
      {
        "translation": "Anh ấy vờ như đang hạnh phúc trước mặt mọi người và mỉm cười."
      },
      {
        "translation": "Tôi đã cố gắng hành xử như thể mình hiểu hết, nhưng thực tế tôi chẳng hiểu được bao nhiêu."
      },
      {
        "translation": "Cô ấy đã làm ra vẻ như không hề biết đến vấn đề của bản thân."
      },
      {
        "translation": "Anh ấy cố tỏ ra như mình có thể kiểm soát được tình hình, nhưng thực tế lại không phải như vậy."
      }
    ]
  },
  "ko_커지다_29": {
    "title": "~커지다 (Trở nên to lớn hơn, ngày càng lớn mạnh, gia tăng)",
    "shortExplanation": "Diễn tả sự biến đổi làm cho kích thước, quy mô, mức độ hoặc tầm quan trọng của sự vật, hiện tượng ngày một gia tăng theo thời gian.",
    "longExplanation": "'커지다' là động từ được hình thành từ tính từ '크다' (lớn, to) kết hợp với vĩ tố biến đổi trạng thái '-어지다' (trở nên). Từ này biểu thị quá trình phát triển, mở rộng hoặc chuyển biến tăng tiến theo thời gian. Nó có thể áp dụng cho kích thước vật lý cụ thể (như cơ thể, khối u) lẫn các khái niệm trừu tượng, tinh thần (như ước mơ, tình yêu, tầm quan trọng, quy mô tổ chức, mâu thuẫn).",
    "formation": "Danh từ + 이/가 + 커지다 (thì hiện tại dùng 커진다/커져요, quá khứ dùng 커졌다/커졌어요, dạng tiến trình dùng 커져 가다)",
    "examples": [
      {
        "translation": "Khi lớn lên, ước mơ của tôi ngày càng lớn mạnh và trở nên quan trọng hơn, khiến cuộc đời tôi thay đổi."
      },
      {
        "translation": "Khi công ty mở rộng, vai trò của anh ấy ngày càng trở nên quan trọng và lớn hơn."
      },
      {
        "translation": "Tình yêu thương của gia đình chúng tôi ngày càng lớn thêm khi cùng nhau trải qua thời gian bên nhau."
      },
      {
        "translation": "Khi vấn đề tiếp diễn, tầm quan trọng của vấn đề đó chỉ càng ngày càng tăng lên."
      }
    ]
  },
  "ko_키로_30": {
    "title": "~기로 하다 / ~키로 하다 (Quyết định làm gì, thống nhất làm gì)",
    "shortExplanation": "Dùng để biểu thị một quyết định, kế hoạch hoặc sự thỏa thuận, quyết tâm của người nói về việc sẽ thực hiện một hành động nào đó ('quyết định làm...', 'hẹn làm...').",
    "longExplanation": "'~기로 하다' là cấu trúc biểu hiện quyết định rất phổ biến, kết hợp giữa vĩ tố danh từ hóa '-기', trợ từ phương hướng/kết quả '로' và động từ '하다'. Nó thể hiện một quyết định cá nhân dứt khoát hoặc một lời hẹn ước, đồng thuận giữa hai hay nhiều người về một kế hoạch hành động trong tương lai. Thường kết thúc ở thì quá khứ là '-기로 했다/했습니다' để biểu thị quyết định đã được đưa ra. (Lưu ý: dạng '~키로 하다' là biến âm khẩu ngữ hoặc lỗi chính tả thường gặp của cấu trúc chuẩn '~기로 하다').",
    "formation": "Thân động từ + -기로 하다 (khẩu ngữ biến âm: -키로 하다; thường chia ở thì quá khứ: -기로 했다/했습니다)",
    "examples": [
      {
        "translation": "Tôi đã quyết định học tiếng Hàn một cách hoàn hảo, vì thế mỗi ngày tôi đều luyện tập rất nhiều."
      },
      {
        "translation": "Chúng tôi đã quyết định sẽ kết hôn vào năm sau."
      },
      {
        "translation": "Tôi đã quyết định bắt đầu giảm cân, vì vậy ngày nào tôi cũng tập thể dục."
      },
      {
        "translation": "Giám đốc đã quyết định sẽ mở rộng quy mô công ty."
      }
    ]
  },
  "ko_하기에는_31": {
    "title": "~기에는 / ~하기에는 (Để mà làm... thì..., xét về việc làm... thì...)",
    "shortExplanation": "Dùng để đưa ra một hành động làm tiêu chuẩn hoặc điều kiện đánh giá, sau đó đưa ra phán đoán rằng điều kiện hay khả năng để thực hiện việc đó là khó khăn hoặc không thỏa đáng.",
    "longExplanation": "'~기에는' được tạo thành từ vĩ tố danh từ hóa '-기', trợ từ phương hướng/đối tượng '에' và trợ từ nhấn mạnh '는'. Mẫu câu này dùng để thiết lập một hành động làm tiêu chuẩn quy chiếu, từ đó đánh giá tình hình ở vế sau. Đa phần các câu đi với cấu trúc này thường mang nghĩa phủ định hoặc tiêu cực, ám chỉ rằng để thực hiện được hành động ở vế trước thì thời gian, tiền bạc, năng lực hoặc hoàn cảnh ở vế sau là không đủ, quá khó hoặc không phù hợp (như 'quá... để làm...', 'khó mà...').",
    "formation": "Thân động từ + -기에는 (với động từ kết thúc bằng 하다 là ~하기에는; theo sau thường là từ mang tính đánh giá như 어렵다, 부족하다, 불가능하다, 무섭다, 이르다)",
    "examples": [
      {
        "translation": "Hôm nay trời mưa nên để mà đá bóng thì có vẻ hơi khó."
      },
      {
        "translation": "Tôi quá thiếu tiền nên việc đi du lịch là điều bất khả thi."
      },
      {
        "translation": "Để hoàn thành dự án này thì thời gian vẫn chưa đủ."
      },
      {
        "translation": "Để xem bộ phim này thì nó quá đáng sợ nên tôi nghĩ chắc không xem nổi đâu."
      }
    ]
  },
  "ko_하기는_32": {
    "title": "~기는 하다 / ~하기는 하다 (Làm thì có làm thật đấy nhưng..., quả thực là có... nhưng...)",
    "shortExplanation": "Dùng để thừa nhận một sự thật hay hành động ở vế trước, nhưng vế sau lại đưa ra hạn chế, khiếm khuyết hoặc điều chưa trọn vẹn ('thì có làm nhưng...').",
    "longExplanation": "'~기는 하다' là cấu trúc kết hợp giữa vĩ tố danh từ hóa '-기', trợ từ nhấn mạnh/đối chiếu '는' và động từ phụ trợ '하다'. Người nói dùng cấu trúc này để công nhận một sự thật, hành động hoặc trạng thái ở vế trước là đúng, nhưng ngay sau đó ở vế sau sẽ đưa ra một vế đối lập mang tính nhượng bộ, chỉ ra điểm thiếu sót, chưa đạt tiêu chuẩn hoặc chưa thực sự vừa ý ('làm thì có làm đấy nhưng không giỏi', 'biết thì có biết đấy nhưng không rõ').",
    "formation": "Thân động từ/tính từ + -기는 하다 (khi động từ tận cùng bằng 하다 thường là ~하기는 하다; vế sau thường liên kết bằng -지만 hoặc -(으)ㄴ/는데)",
    "examples": [
      {
        "translation": "Tôi thì cũng có nấu ăn thật đấy, nhưng nấu không được ngon đến mức thế đâu."
      },
      {
        "translation": "Ở công ty chúng tôi thì mọi người cũng làm việc đấy, nhưng người làm giỏi thì hầu như không có."
      },
      {
        "translation": "Cậu ấy thì cũng có đi học đấy, nhưng thực tế có rất nhiều môn cậu ấy học kém."
      },
      {
        "translation": "Tôi thì cũng nói được tiếng Anh đấy, nhưng không thể nói một cách tự nhiên được."
      }
    ]
  },
  "ko_하기야_33": {
    "title": "~하기야 / ~기야 (Đúng là... thật, quả thật là... thì cũng đúng)",
    "shortExplanation": "Dùng để thừa nhận một sự thật hoặc điều hiển nhiên trước khi đưa ra nhận định tiếp theo ('đúng là... thật', 'thì đúng là vậy thật nhưng...').",
    "longExplanation": "'~하기야' (hoặc thân từ kết hợp với trợ từ '-기야') là sự kết hợp của vĩ tố danh từ hóa '-기' và trợ từ nhấn mạnh '-(이)야'. Cấu trúc này dùng để công nhận hoặc đồng tình một cách tự nhiên với một thực tế hiển nhiên, một chân lý hay hoàn cảnh khó khăn nào đó ('quả thật chuyện đó thì đúng là như vậy rồi'). Sau khi khẳng định sự đồng tình đó, người nói có thể đưa ra giải pháp, an ủi hoặc giải thích lý do cho hành động tiếp theo.",
    "formation": "Thân động từ/tính từ + -기야 (với động từ tận cùng bằng 하다 là ~하기야; độc lập ở đầu câu thường dùng phó từ 하기야 / 하긴)",
    "examples": [
      {
        "translation": "Đúng là dạo này việc học hành của các bạn không hề dễ dàng, vì thế việc tự học buổi tối mỗi ngày là rất cần thiết."
      },
      {
        "translation": "Bây giờ virus Covid-19 lây lan nên đúng là đi du lịch thật khó khăn, vì vậy tôi chỉ ở nhà suốt thôi."
      },
      {
        "translation": "Đúng là nếu không phải chuyện liên quan đến trường học thì tôi nhất định muốn làm việc đó."
      },
      {
        "translation": "Đúng là việc nấu món ăn ngon quả thực rất khó, nhưng nếu nỗ lực mỗi ngày thì năng lực dần dần sẽ tiến bộ thôi."
      }
    ]
  },
  "ko_하기만_34": {
    "title": "~기만 하면 / ~하기만 하면 (Cứ hễ... là..., chỉ cần... là ngay lập tức...)",
    "shortExplanation": "Diễn tả điều kiện cần và đủ hoặc thời điểm xảy ra hành động: cứ hễ một hành động diễn ra thì hành động tiếp theo sẽ lập tức xảy ra ngay ('cứ hễ... là...').",
    "longExplanation": "'~하기만 하면' là cấu trúc kết hợp từ vĩ tố danh từ hóa '-기', trợ từ chỉ sự duy nhất/tập trung '만' và vĩ tố giả định '-면' (nếu) đi kèm động từ '하다'. Nó biểu thị rằng chỉ cần điều kiện ở vế trước vừa xảy ra thì kết quả hay hành động ở mệnh đề sau lập tức diễn ra một cách tức thì, tất yếu hoặc theo thói quen định kỳ. Mang ý nghĩa 'hễ cứ...', 'chỉ cần... là liền...'.",
    "formation": "Thân động từ + -기만 하면 (với động từ tận cùng bằng 하다 là ~하기만 하면)",
    "examples": [
      {
        "translation": "Cứ mỗi sáng hễ thức dậy là tôi lại tập thể dục ngay."
      },
      {
        "translation": "Cô ấy cứ về đến nhà là nấu bữa tối ngay lập tức."
      },
      {
        "translation": "Cứ hễ tan học là học sinh rời khỏi trường ngay tức khắc."
      },
      {
        "translation": "Cứ hễ căng thẳng là vai anh ấy lại run lên."
      }
    ]
  },
  "ko_하면서도_35": {
    "title": "~(으)면서도 (Vừa... lại vừa..., dù... nhưng vẫn...)",
    "shortExplanation": "Vĩ tố liên kết dùng để diễn tả hai hành động hoặc trạng thái diễn ra đồng thời nhưng mang tính đối lập, mâu thuẫn nhau ('dù... nhưng vẫn...', 'vừa... lại vừa...').",
    "longExplanation": "'~(으)면서도' được cấu tạo bởi vĩ tố liên kết '-(으)면서' (biểu thị hai hành động xảy ra đồng thời) kết hợp với trợ từ nhấn mạnh đối lập '-도' (cũng, lại). Ngữ pháp này dùng để nối hai mệnh đề, diễn tả việc chủ ngữ dù đang thực hiện hành động hoặc ở trong trạng thái ở vế trước nhưng vế sau lại xuất hiện một hành động hoặc trạng thái đối lập, mâu thuẫn hay trái ngược với lẽ thường. Thường dùng khi có sự bất nhất giữa hành vi, cảm xúc hoặc suy nghĩ.",
    "formation": "Thân động từ/tính từ + -(으)면서도 (thân từ kết thúc bằng nguyên âm hoặc phụ âm ㄹ dùng -면서도, kết thúc bằng phụ âm khác dùng -으면서도) | Danh từ + (이)면서도 (kết thúc bằng nguyên âm dùng -면서도, kết thúc bằng phụ âm dùng -이면서도)",
    "examples": [
      {
        "translation": "Cô ấy dù bận rộn làm việc ở công ty nhưng luôn về nhà sớm để ăn cơm cùng các con."
      },
      {
        "translation": "Dù tôi tập trung vào việc học nhưng vẫn gặp khó khăn trong việc giao tiếp với bạn bè."
      },
      {
        "translation": "Dù đang chung sống hạnh phúc bên người yêu, anh ấy vẫn luôn lo sợ những lúc cô ấy không ở cạnh bên."
      },
      {
        "translation": "Mẹ tuy luôn chăm lo cho sức khỏe của người khác, nhưng lại thường phớt lờ sức khỏe của chính mình."
      }
    ]
  },
  "ko_하면_36": {
    "title": "-(으)면 -(으)ㄹ수록 (Càng... càng...)",
    "shortExplanation": "Dùng để diễn tả một hành động hoặc trạng thái ở vế trước càng tăng tiến thì mức độ hoặc kết quả ở vế sau cũng thay đổi theo tương ứng ('càng... càng...').",
    "longExplanation": "'-(으)면 -(으)ㄹ수록' là cấu trúc liên kết kết hợp giữa vĩ tố giả định điều kiện '-(으)면' và vĩ tố biểu thị mức độ tăng tiến '-(으)ㄹ수록'. Cấu trúc này dùng để nhấn mạnh mối quan hệ tương quan lũy tiến: khi hành động hoặc trạng thái phía trước càng được lặp lại, gia tăng hoặc biến chuyển thì kéo theo kết quả, cảm xúc hoặc sự việc ở mệnh đề sau cũng thay đổi tỉ lệ thuận theo mức độ đó. Đôi khi có thể lược bỏ phần '-(으)면' chỉ còn '-(으)ㄹ수록' mà ý nghĩa cơ bản không đổi.",
    "formation": "Thân động từ/tính từ + -(으)면 Thân động từ/tính từ + -(으)ㄹ수록 (thân từ có nguyên âm hoặc phụ âm ㄹ dùng -면 / -ㄹ수록, có phụ âm cuối dùng -으면 / -을수록)",
    "examples": [
      {
        "translation": "Cái này càng luyện tập thì tôi càng làm tốt hơn, nên nếu tiếp tục luyện tập tôi sẽ có thể thành thạo được."
      },
      {
        "translation": "Thời tiết càng trở lạnh thì càng có nhiều người ghé vào cửa hàng quần áo."
      },
      {
        "translation": "Tôi càng học tiếng Hàn thì lại càng muốn tìm hiểu nhiều hơn về ngôn ngữ này."
      },
      {
        "translation": "Càng sống ở thành phố này, tôi càng nhận ra có nhiều điều để ngắm nhìn và nhiều việc để trải nghiệm."
      }
    ]
  },
  "ko_하자마자_37": {
    "title": "-자마자 / ~하자마자 (Ngay sau khi..., vừa mới... thì...)",
    "shortExplanation": "Vĩ tố liên kết diễn tả hành động ở vế sau diễn ra ngay tức khắc, không có khoảng cách thời gian sau khi hành động ở vế trước kết thúc ('ngay khi', 'vừa... xong thì...').",
    "longExplanation": "'-자마자' là vĩ tố liên kết dùng để gắn vào thân động từ, biểu thị một hành động xảy ra gần như đồng thời hoặc ngay lập tức tiếp nối sau khi hành động ở mệnh đề trước vừa mới kết thúc. Ngữ pháp này nhấn mạnh tính liên tục và sự khẩn trương, không có sự gián đoạn về thời gian giữa hai hành động. Lưu ý rằng thì quá khứ không được chia ở mệnh đề trước mà chỉ chia ở mệnh đề sau cùng của câu.",
    "formation": "Thân động từ + -자마자 (không phụ thuộc vào phụ âm cuối hay nguyên âm; 하다 biến thành 하자마자)",
    "examples": [
      {
        "translation": "Vừa đến trường một cái là anh ấy đi thẳng vào lớp học ngay."
      },
      {
        "translation": "Ngay khi vừa đến sân bay, tôi đã gọi một chiếc taxi."
      },
      {
        "translation": "Cô ấy vừa thức dậy là đã pha cà phê ngay lập tức."
      },
      {
        "translation": "Vừa tan làm ở công ty là tôi về thẳng nhà nghỉ ngơi luôn."
      }
    ]
  },
  "ko_해서_38": {
    "title": "-아/어서 그런지 / ~해서 그런지 (Chắc là vì... nên..., có lẽ do... chăng)",
    "shortExplanation": "Dùng khi người nói phỏng đoán rằng một sự việc nào đó có thể là nguyên nhân hoặc lý do dẫn đến kết quả ở vế sau, nhưng chưa dám khẳng định chắc chắn 100% ('có lẽ vì... nên...').",
    "longExplanation": "'-아/어서 그런지' là cấu trúc kết hợp giữa vĩ tố chỉ nguyên nhân '-아/어서', động từ '그렇다' (như thế) và vĩ tố nghi vấn phỏng đoán '-(으)ㄴ지'. Ngữ pháp này dùng để đưa ra một lý do mang tính suy đoán, ức đoán: người nói nghĩ rằng chính nguyên nhân ở mệnh đề trước là nguồn cơn dẫn đến tình huống ở mệnh đề sau, nhưng không hoàn toàn đoan chắc. Tương đương trong tiếng Việt là 'chắc tại vì...', 'có lẽ do... nên...', 'không biết có phải vì... hay không mà...'. Khi gắn với danh từ, cấu trúc có dạng '-(이)라서 그런지'.",
    "formation": "Thân động từ/tính từ + -아/어서 그런지 (thân từ có nguyên âm ㅏ, ㅗ dùng -아서 그런지; nguyên âm khác dùng -어서 그런지; 하다 biến thành 해서 그런지) | Danh từ + (이)라서 그런지",
    "examples": [
      {
        "translation": "Hôm nay chắc là vì thời tiết đẹp nên có thể thấy rất nhiều người ra ngoài hoạt động."
      },
      {
        "translation": "Có lẽ vì hôm qua bị thương nên hôm nay cô ấy bước đi vô cùng cẩn trọng."
      },
      {
        "translation": "Chắc là hôm qua tôi ăn quá nhiều mì tương đen rồi. Hôm nay có lẽ vì đau bụng nên thể trạng không được tốt."
      },
      {
        "translation": "Có lẽ do đêm qua gặp cô ấy trong giấc mơ nên cả ngày hôm nay tôi cứ nghĩ về cô ấy suốt."
      }
    ]
  },
  "ko_하여서는_39": {
    "title": "-아/어서는 안 되다 / ~하여서는 안 되다 (Không được làm..., tuyệt đối không được...)",
    "shortExplanation": "Dùng để biểu thị sự ngăn cấm nghiêm khắc hoặc đưa ra lời khuyên mạnh mẽ rằng tuyệt đối không được phép thực hiện hành động nào đó ('không được...').",
    "longExplanation": "'-아/어서는 안 되다' (dạng văn viết trang trọng thường viết là '-아/여서는 안 되다') là cấu trúc diễn tả sự cấm đoán mang tính quy tắc, pháp luật, đạo đức hoặc nguyên tắc ứng xử. Cấu trúc kết hợp vĩ tố điều kiện '-아/어서', trợ từ nhấn mạnh '-는' và cụm phủ định '안 되다' (không được, không được phép). Nó nhấn mạnh rằng nếu thực hiện hành động ở vế trước thì sẽ gây ra hậu quả tiêu cực, vi phạm quy định hoặc đi ngược lại chuẩn mực đạo đức xã hội. Trong khẩu ngữ, cấu trúc này thường tương đương với '-면 안 되다'.",
    "formation": "Thân động từ + -아/어서는 안 되다 (thân từ có nguyên âm ㅏ, ㅗ dùng -아서는 안 되다; các nguyên âm khác dùng -어서는 안 되다; 하다 biến thành 해서는 안 되다 hoặc 하여서는 안 되다)",
    "examples": [
      {
        "translation": "Dù mang danh là học sinh đi chăng nữa thì việc đi học muộn tuyệt đối không được phép xảy ra."
      },
      {
        "translation": "Với tư cách là một bác sĩ, tuyệt đối không được tiết lộ thông tin bệnh nhân ra bên ngoài."
      },
      {
        "translation": "Không được vì kỳ thi ngày mai mà thức trắng đêm đâu. Sức khỏe luôn là ưu tiên hàng đầu."
      },
      {
        "translation": "Tuyệt đối không được thực hiện những hành vi gây phương hại đến người khác."
      }
    ]
  },
  "ko_한테는_40": {
    "title": "~한테는 (Đối với..., cho/với ai đó thì...)",
    "shortExplanation": "Trợ từ chỉ đối tượng tiếp nhận hành động kết hợp trợ từ nhấn mạnh/đối chiếu, mang ý nghĩa 'đối với ai đó thì...', 'cho/với người đó thì...'.",
    "longExplanation": "'~한테는' là sự kết hợp giữa phó từ cách trợ từ '~한테' (chỉ đối tượng người hoặc động vật tiếp nhận hành động, tương đương 'cho', 'với', thường dùng trong khẩu ngữ) và trợ từ đối chiếu nhấn mạnh '-는'. Cấu trúc này dùng để nhấn mạnh riêng biệt đối tượng đó trong sự đối chiếu so sánh với những đối tượng khác ('đối với người này thì thế này, nhưng đối với người kia thì thế khác'). Lưu ý rằng '한테' chỉ dùng cho người hoặc động vật, không dùng cho sự vật hay cơ quan đoàn thể (khi đó phải dùng '에/에는'); đối với người lớn tuổi cần tôn kính thì dùng dạng kính ngữ là '께는'.",
    "formation": "Danh từ (chỉ người/động vật) + 한테는 (đối với bề trên tôn kính dùng 께는; trong văn viết trang trọng dùng 에게는)",
    "examples": [
      {
        "translation": "Tôi đến đây là để mua quà cho chị gái. Còn với bạn bè thì tôi dự định gửi tin nhắn qua email."
      },
      {
        "translation": "Đối với bố thì tôi vẫn chưa báo sự thật này, mới chỉ kể cho chị gái nghe thôi."
      },
      {
        "translation": "Đối với trẻ con thì phải giải thích bằng ngôn từ đơn giản, nếu quá phức tạp chúng sẽ không thể hiểu được."
      },
      {
        "translation": "Anh ấy đối với mẹ thì lúc nào cũng ân cần thân thiện, nhưng đối với bố thì lại rất thô lỗ."
      }
    ]
  },
  "ko_할_41": {
    "title": "-(으)ㄹ 만하다 / ~할 만하다 (Đáng để..., bõ công..., xứng đáng...)",
    "shortExplanation": "Dùng để diễn tả một hành động nào đó rất đáng giá, bõ công để thực hiện, hoặc tình trạng nào đó nằm trong mức có thể chấp nhận được ('đáng để làm gì').",
    "longExplanation": "'-(으)ㄹ 만하다' là cấu trúc kết hợp giữa vĩ tố định ngữ tương lai '-(으)ㄹ' và tính từ phụ thuộc '만하다' (đáng, đủ giá trị). Cấu trúc này dùng để biểu thị sự đánh giá chủ quan của người nói rằng đối tượng hoặc hành động đó có đủ giá trị, ý nghĩa hoặc phẩm chất để bỏ công sức, thời gian hay tiền bạc thực hiện ('rất đáng để xem/mua/thử'). Ngoài ra, nó cũng có thể biểu đạt ý nghĩa một việc gì đó nằm trong giới hạn chịu đựng hoặc khả thi ('cũng tạm được', 'còn chịu được').",
    "formation": "Thân động từ + -(으)ㄹ 만하다 (thân từ có nguyên âm hoặc phụ âm ㄹ dùng -ㄹ 만하다, có phụ âm cuối dùng -을 만하다; 하다 biến thành 할 만하다)",
    "examples": [
      {
        "translation": "Việc tiếp tục học nấu ăn tuy khó khăn nhưng bù lại được thường xuyên ăn món ngon nên cũng rất bõ công."
      },
      {
        "translation": "Tác phẩm này tuy đắt nhưng xét về thiết kế đẹp và chất lượng cao thì rất đáng để mua."
      },
      {
        "translation": "Chờ đợi trong khoảng thời gian dài tuy mệt mỏi nhưng nếu kết quả tốt đẹp thì cũng rất đáng công."
      },
      {
        "translation": "Bộ phim này không hay lắm nên chẳng đáng xem chút nào."
      }
    ]
  },
  "ko_할_42": {
    "title": "-(으)ㄹ 수밖에 없다 / ~할 수밖에 없다 (Chỉ còn cách..., buộc phải..., không thể không...)",
    "shortExplanation": "Dùng để diễn tả tình huống không còn sự lựa chọn nào khác ngoài việc thực hiện hành động đó ('chỉ còn cách...', 'đành phải...').",
    "longExplanation": "'-(으)ㄹ 수밖에 없다' được cấu thành bởi cấu trúc biểu thị khả năng '-(으)ㄹ 수 있다/없다', trợ từ chỉ sự duy nhất mang tính giới hạn '-밖에' (ngoài... ra thì không còn) và phủ định từ '없다'. Cấu trúc này dùng để nhấn mạnh tình thế bắt buộc hoặc quy luật tất yếu: do hoàn cảnh khách quan hoặc lý do bất khả kháng, chủ ngữ không còn phương án thay thế nào khác mà bắt buộc phải chọn hành động đó. Tương đương trong tiếng Việt là 'chỉ còn cách...', 'không thể không...', 'đành phải...'.",
    "formation": "Thân động từ/tính từ + -(으)ㄹ 수밖에 없다 (thân từ có nguyên âm hoặc phụ âm ㄹ dùng -ㄹ 수밖에 없다, có phụ âm cuối dùng -을 수밖에 없다; 하다 biến thành 할 수밖에 없다)",
    "examples": [
      {
        "translation": "Vì trời đang mưa nên tôi chẳng còn cách nào khác ngoài việc mang theo ô."
      },
      {
        "translation": "Vì sắp có kỳ thi nên tôi đành phải tiếp tục học bài thôi."
      },
      {
        "translation": "Cô ấy đã nói như thế rồi nên tôi không thể không tin tưởng cô ấy."
      },
      {
        "translation": "Bây giờ vì không có tiền nên tôi chỉ có thể mua những món đồ rẻ tiền như thế này thôi."
      }
    ]
  },
  "ko_해_43": {
    "title": "-(으)ㄹ수록 / ~해 갈수록 (Càng... thì càng..., càng ngày càng...)",
    "shortExplanation": "Vĩ tố liên kết dùng để diễn tả một trạng thái hay hành động khi càng tiếp diễn hoặc gia tăng theo thời gian thì mức độ ở vế sau cũng tỉ lệ thuận gia tăng theo ('càng... thì càng...').",
    "longExplanation": "'-(으)ㄹ수록' (hoặc dạng kết hợp '-어/아 갈수록' biểu thị sự biến chuyển theo thời gian) là vĩ tố liên kết chỉ mức độ tăng tiến theo tỷ lệ thuận. Cấu trúc này diễn tả ý nghĩa: mức độ của hành động hoặc trạng thái ở mệnh đề trước càng tiến triển, càng đào sâu hoặc càng kéo dài thì kéo theo tính chất, số lượng hay cảm xúc ở mệnh đề sau cũng ngày một gia tăng tương ứng. Tương đương trong tiếng Việt là 'càng ngày càng...', 'càng... thì càng...'. Có thể dùng độc lập hoặc đi sau vế điều kiện '-(으)면'.",
    "formation": "Thân động từ/tính từ + -(으)ㄹ수록 (thân từ có nguyên âm hoặc phụ âm ㄹ dùng -ㄹ수록, có phụ âm cuối dùng -을수록) | Dạng biến chuyển thời gian: Thân động từ/tính từ + -어/아 갈수록",
    "examples": [
      {
        "translation": "Thời tiết càng trở lạnh thì dường như số người bị cảm cúm lại càng nhiều thêm."
      },
      {
        "translation": "Cô ấy là kiểu người càng tìm hiểu thì lại càng thấy quyến rũ."
      },
      {
        "translation": "Tôi cảm thấy càng đọc nhiều sách thì năng lực tư duy của mình lại càng được nâng cao."
      },
      {
        "translation": "Càng ở nhà lâu tôi lại càng thấy cô đơn, nên rất muốn đi ra ngoài."
      }
    ]
  },
  "ko_해_44": {
    "title": "-아/어 보아야 / ~해 보아야 (Phải thử... thì mới biết..., có thử... mới...)",
    "shortExplanation": "Dùng để diễn tả điều kiện cần thiết: phải trực tiếp thử làm một hành động nào đó thì mới có thể biết, nhận thức hoặc đánh giá được kết quả ('phải thử... mới...').",
    "longExplanation": "'-아/어 보아야' là cấu trúc kết hợp giữa động từ bổ trợ thử nghiệm '-아/어 보다' (thử làm gì) và vĩ tố liên kết điều kiện cần thiết '-아/어야' (phải... thì mới). Cấu trúc này dùng để nhấn mạnh rằng chỉ khi đích thân trải nghiệm hoặc thử qua hành động đó thì người nói hoặc đối phương mới thực sự biết rõ được thực chất sự việc, chất lượng hoặc cảm giác. Thường kết thúc bằng '-아/어 보아야 알 수 있다' (phải thử mới biết được) hoặc '-아/어 보아야 한다' (cần phải thử làm xem sao).",
    "formation": "Thân động từ + -아/어 보아야 (thân từ có nguyên âm ㅏ, ㅗ dùng -아 보아야; nguyên âm khác dùng -어 보아야; 하다 biến thành 해 보아야)",
    "examples": [
      {
        "translation": "Cách để biết thức ăn có tươi ngon hay không là phải ăn thử mới biết được."
      },
      {
        "translation": "Cách để biết bộ quần áo này ra sao là phải mặc thử vào thì mới biết được."
      },
      {
        "translation": "Cách để biết cuốn sách này có thú vị hay không là phải đọc thử mới rõ."
      },
      {
        "translation": "Cách để biết môn thể thao này thú vị đến mức nào là phải trực tiếp thử chơi mới biết được."
      }
    ]
  },
  "ko_해오다_45": {
    "title": "-아/어 오다 / ~해오다 (Làm... suốt từ quá khứ đến nay, duy trì làm...)",
    "shortExplanation": "Động từ bổ trợ dùng để diễn tả một hành động bắt đầu từ một thời điểm trong quá khứ và vẫn tiếp tục duy trì, thực hiện đều đặn cho đến tận thời điểm hiện tại ('đã và đang làm...').",
    "longExplanation": "'-아/어 오다' (với động từ '하다' tạo thành '해오다') là cấu trúc bổ trợ kết hợp vĩ tố liên kết '-아/어' với động từ hướng đích '오다' (đến). Cấu trúc này dùng để diễn tả phương diện thời gian: một thói quen, nỗ lực hoặc hành động đã khởi phát từ quá khứ và được người nói kiên trì duy trì, tiếp diễn liên tục theo dòng thời gian hướng về phía hiện tại. Trong tiếng Việt, cấu trúc tương đương với 'đã và đang làm...', 'làm suốt từ trước đến nay...'. Thường đi kèm với các từ chỉ mốc thời gian như 'từ trước đến giờ', 'trong suốt... qua'.",
    "formation": "Thân động từ + -아/어 오다 (thân từ có nguyên âm ㅏ, ㅗ dùng -아 오다; các nguyên âm khác dùng -어 오다; 하다 biến thành 해오다; thường dùng dưới dạng hiện tại tiếp diễn -아/어 오고 있다)",
    "examples": [
      {
        "translation": "Tôi đã chơi đàn piano liên tục suốt từ thời thơ ấu cho đến tận bây giờ."
      },
      {
        "translation": "Chúng tôi đã và đang làm việc cống hiến cho công việc kinh doanh đó suốt 5 năm qua kể từ khi khởi nghiệp."
      },
      {
        "translation": "Tôi vẫn đang chắt chiu tiết kiệm tiền suốt thời gian qua với ước mơ đi du lịch vòng quanh thế giới."
      },
      {
        "translation": "Chúng tôi đã ngồi trò chuyện cùng nhau liên tục từ lúc người bạn ấy đến cho đến tận bây giờ."
      }
    ]
  },
  "ko_했건만_46": {
    "title": "-았/었건만 / ~했건만 (Đã... thế mà, tuy đã... nhưng...)",
    "shortExplanation": "Vĩ tố liên kết dùng trong văn viết hoặc văn phong biểu cảm, diễn tả sự tương phản, tiếc nuối khi kết quả ở vế sau hoàn toàn trái ngược với hành động hoặc kỳ vọng ở vế trước ('đã... vậy mà').",
    "longExplanation": "'-았/었건만' (하다 biến thành '했건만') là vĩ tố liên kết mang tính văn học, kết hợp giữa vĩ tố quá khứ '-았/었-' và vĩ tố đối lập '-건만' (dạng rút gọn của '-건마는'). Ngữ pháp này dùng để thừa nhận một sự việc, hành động hay nỗ lực đã xảy ra trong quá khứ ở mệnh đề trước, nhưng mệnh đề sau lại mang lại một kết cục bất ngờ, trái ngược hoặc không như mong đợi. Thường mang sắc thái nuối tiếc, bất mãn hoặc than thở. Tương đương trong tiếng Việt là 'dù đã... thế mà...', 'đã... vậy mà lại...'.",
    "formation": "Thân động từ/tính từ + -았/었건만 (thân từ có nguyên âm ㅏ, ㅗ dùng -았건만; nguyên âm khác dùng -었건만; 하다 biến thành 했건만)",
    "examples": [
      {
        "translation": "Tôi đã nỗ lực rất nhiều, thế mà vẫn bị thi trượt."
      },
      {
        "translation": "Hôm qua bạn tôi đã đến, vậy mà hôm nay lại không thể tới được."
      },
      {
        "translation": "Món ăn tuy ngon thật đấy, nhưng giá cả lại quá đắt đỏ."
      },
      {
        "translation": "Mọi người bảo rằng cô ấy xinh đẹp, vậy mà tôi lại không nghĩ như thế."
      }
    ]
  },
  "ko_했기_47": {
    "title": "-았/었기 때문에 / ~했기 때문에 (Vì đã... nên..., bởi vì đã...)",
    "shortExplanation": "Dùng để nêu rõ nguyên nhân hoặc lý do bắt nguồn từ một hành động hay trạng thái đã hoàn tất trong quá khứ dẫn đến kết quả ở hiện tại ('vì đã... nên...').",
    "longExplanation": "'-았/었기 때문에' (하다 biến thành '했기 때문에') là cấu trúc diễn tả nguyên nhân, kết hợp giữa vĩ tố quá khứ '-았/었-', vĩ tố danh từ hóa '-기' và danh từ phụ thuộc chỉ lý do '때문' đi kèm trợ từ '에'. Cấu trúc này dùng để nhấn mạnh một sự việc hoặc hành vi cụ thể đã xảy ra trong quá khứ là nguyên nhân trực tiếp dẫn tới tình trạng, kết quả ở mệnh đề sau. Cấu trúc mang tính logic, rõ ràng và có thể sử dụng linh hoạt trong cả văn nói trang trọng lẫn văn viết.",
    "formation": "Thân động từ/tính từ + -았/었기 때문에 (thân từ có nguyên âm ㅏ, ㅗ dùng -았기 때문에; nguyên âm khác dùng -었기 때문에; 하다 biến thành 했기 때문에)",
    "examples": [
      {
        "translation": "Vì đêm qua ngủ muộn nên sáng nay tôi đã rất khó khăn mới thức dậy được."
      },
      {
        "translation": "Vì nồng độ bụi mịn cao nên tôi không mở cửa sổ, kết quả là căn phòng trở nên oi bức."
      },
      {
        "translation": "Vì đã học tập rất chăm chỉ nên tôi đã đạt được điểm số cao trong kỳ thi."
      },
      {
        "translation": "Vì trời đã đổ mưa nên đôi giày thể thao của tôi đã bị ướt sũng."
      }
    ]
  },
  "ko_했기에_48": {
    "title": "-았/었기에 / ~했기에 (Chính vì đã... nên..., do đã...)",
    "shortExplanation": "Vĩ tố liên kết mang tính văn viết trang trọng, dùng để giải thích nguyên nhân hoặc lý do trong quá khứ dẫn đến kết quả ở mệnh đề sau ('chính vì đã... nên...').",
    "longExplanation": "'-았/었기에' (하다 biến thành '했기에') là cấu trúc liên kết kết hợp giữa vĩ tố quá khứ '-았/었-' và vĩ tố chỉ nguyên nhân, căn cứ '-기에'. Cấu trúc này thường được sử dụng trong văn phong trang trọng, diễn văn, tiểu thuyết hoặc bài viết biểu cảm để chỉ ra rằng: chính vì đã có nguyên nhân hoặc sự thật ở vế trước nên mới dẫn đến kết quả, quyết định ở vế sau. So với '-았/었기 때문에', cấu trúc này mang đậm chất văn chương, nhẹ nhàng và tự nhiên hơn.",
    "formation": "Thân động từ/tính từ + -았/었기에 (thân từ có nguyên âm ㅏ, ㅗ dùng -았기에; nguyên âm khác dùng -었기에; 하다 biến thành 했기에)",
    "examples": [
      {
        "translation": "Cô ấy chính vì rất say mê học thuật nên đã trở thành giáo sư tại trường đại học."
      },
      {
        "translation": "Vì tôi đã ăn rất nhiều món sườn nướng nên bây giờ bụng no căng."
      },
      {
        "translation": "Nhờ sáng nay dậy sớm nên tôi đã không bị trễ giờ đi làm."
      },
      {
        "translation": "Anh ấy do chịu nhiều áp lực vì chuyện cá nhân nên đã không tham gia vào hoạt động tập thể."
      }
    ]
  },
  "ko_했더니_49": {
    "title": "-았/었더니 / ~했더니 (Sau khi làm... thì nhận ra..., vì đã... nên...)",
    "shortExplanation": "Vĩ tố liên kết hồi tưởng dùng khi người nói sau khi đã trực tiếp thực hiện một hành động trong quá khứ thì phát hiện ra một sự thật mới, hoặc hành động đó trở thành nguyên nhân dẫn đến kết quả ở vế sau.",
    "longExplanation": "'-았/었더니' (하다 biến thành '했더니') là vĩ tố liên kết hồi tưởng. Cấu trúc này dùng cho chủ ngữ ngôi thứ nhất (bản thân người nói), diễn tả việc sau khi người nói đã trực tiếp hoàn thành một hành động ở vế trước thì lập tức chứng kiến, phát hiện ra một sự việc bất ngờ hoặc mới mẻ ở vế sau ('sau khi tôi làm... thì thấy...'). Ngoài ra, nó cũng dùng để chỉ hành động của người nói trong quá khứ là nguyên nhân dẫn đến sự thay đổi trạng thái hoặc kết quả ở vế sau ('do tôi đã... nên...').",
    "formation": "Thân động từ + -았/었더니 (thân từ có nguyên âm ㅏ, ㅗ dùng -았더니; nguyên âm khác dùng -었더니; 하다 biến thành 했더니; chủ yếu dùng với chủ ngữ ngôi thứ nhất thực hiện hành động ở vế trước)",
    "examples": [
      {
        "translation": "Tôi gọi điện thoại cho cô ấy thì cô ấy bảo rằng đang bận nên không thể nghe máy được."
      },
      {
        "translation": "Sau khi bước xuống xe buýt thì tôi mới phát hiện ra mình đã đánh rơi mất ví tiền."
      },
      {
        "translation": "Tôi đọc sách xong nhìn ra thì thấy ngoài cửa sổ trời đang đổ mưa."
      },
      {
        "translation": "Uống thuốc vào xong thì tôi cảm thấy dễ chịu hơn hẳn."
      }
    ]
  },
  "ko_했어야_50": {
    "title": "-았/었어야 했다 / ~했어야 했다 (Đáng lẽ phải..., lẽ ra nên...)",
    "shortExplanation": "Dùng để diễn tả một việc lẽ ra nên làm hoặc bắt buộc phải làm trong quá khứ nhưng thực tế đã không thực hiện được, thường thể hiện sự hối tiếc hoặc tiếc nuối ('đáng lẽ phải...', 'lẽ ra nên...').",
    "longExplanation": "'-았/었어야 했다' kết hợp giữa cấu trúc điều kiện bắt buộc '-아/어야 하다' (phải làm gì) được chuyển sang thì quá khứ '-았/었어야 했다'. Cấu trúc này dùng khi người nói nhìn lại một sự việc trong quá khứ và nhận thấy việc thực hiện hành động đó là cần thiết hoặc đúng đắn, nhưng trên thực tế hành động đó đã không diễn ra, dẫn đến kết quả đáng tiếc hoặc không như ý muốn. Trong giao tiếp hằng ngày, ngữ pháp này thường xuất hiện dưới dạng '-았/었어야 했는데...' để đưa ra bối cảnh trước khi giãi bày nguyên nhân khách quan hoặc kết quả đáng tiếc ở vế sau.",
    "formation": "Thân động từ/tính từ + -았/었어야 했다 (thân từ có nguyên âm ㅏ, ㅗ dùng -았어야 했다; các nguyên âm khác dùng -었어야 했다; 하다 biến thành 했어야 했다)",
    "examples": [
      {
        "translation": "Đáng lẽ hôm qua tôi phải hoàn thành xong công việc đó, nhưng vì thiếu thời gian nên tôi đã không thể làm xong."
      },
      {
        "translation": "Lẽ ra tôi phải đến trung tâm học bài, nhưng vì mải chơi game nên đã không thể đi được."
      },
      {
        "translation": "Đáng lẽ tôi nên uống nước thay vì cà phê, vì có quá nhiều caffeine nên tôi đã không ngủ được."
      },
      {
        "translation": "Lẽ ra tôi phải nghe điện thoại, nhưng vì không nhìn thấy máy nên đã không bắt máy được."
      }
    ]
  },
  "ko_혹은_51": {
    "title": "혹은 / ~혹은 (Hoặc, hoặc là, hay là)",
    "shortExplanation": "Phó từ liên kết dùng để nối hai hay nhiều danh từ, cụm từ hoặc mệnh đề biểu thị sự lựa chọn, tương đương với 'hoặc', 'hoặc là', 'hay là'.",
    "longExplanation": "'혹은' là một phó từ liên kết mang tính trang trọng và trung tính, có nguồn gốc từ chữ Hán (或 - hoặc). Từ này dùng để đặt giữa các danh từ, ngữ đoạn hoặc mệnh đề nhằm đưa ra hai hay nhiều phương án, khả năng thay thế nhau mà không ưu tiên hay thiên vị phương án nào ('A hoặc B'). So với từ khẩu ngữ '아니면' hay trợ từ '-(이)나', '혹은' thường mang sắc thái lịch sự, chỉn chu hơn, được sử dụng rộng rãi trong cả văn viết, bài giảng, văn bản pháp luật lẫn hội thoại trang trọng.",
    "formation": "Danh từ 1 + 혹은 + Danh từ 2 | Mệnh đề 1 + . 혹은 + Mệnh đề 2",
    "examples": [
      {
        "translation": "Bạn muốn dùng cà phê hay là trà?"
      },
      {
        "translation": "Để giải quyết vấn đề này thì cần có thời gian hoặc là sự nỗ lực."
      },
      {
        "translation": "Anh ấy đã muốn nuôi một chú chó con hoặc một chú mèo con."
      },
      {
        "translation": "Để trải qua kỳ nghỉ hè, bạn có thể nghỉ mát ở bãi biển hoặc là trên núi."
      }
    ]
  },
  "ko_후에야_52": {
    "title": "-(으)ㄴ 후에야 / 후에야 (Chỉ sau khi... mới..., mãi sau khi... mới...)",
    "shortExplanation": "Dùng để nhấn mạnh rằng chỉ sau khi sự việc hoặc mốc thời gian ở vế trước kết thúc trọn vẹn thì hành động, kết quả hoặc sự nhận thức ở vế sau mới diễn ra ('chỉ sau khi... mới...').",
    "longExplanation": "'후에야' là sự kết hợp giữa danh từ phụ thuộc chỉ thời gian '후' (sau, sau này), trợ từ vị trí '에' và trợ từ nhấn mạnh điều kiện thiết yếu '-야' (chỉ, mới). Khi gắn với động từ, cấu trúc thường có dạng '-(으)ㄴ 후에야'. Cấu trúc này nhấn mạnh mệnh đề phía trước là điều kiện tiên quyết không thể thiếu; chỉ sau khi trải qua quá trình hoặc sự việc đó thì chủ ngữ mới nhận ra chân lý, giải quyết được vấn đề hoặc đạt được kết quả ở mệnh đề sau, thường hàm ý sự việc diễn ra khá muộn màng.",
    "formation": "Thân động từ + -(으)ㄴ 후에야 (thân từ có nguyên âm hoặc phụ âm ㄹ dùng -ㄴ 후에야, có phụ âm cuối khác dùng -은 후에야) | Danh từ + 후에야",
    "examples": [
      {
        "translation": "Mãi sau khi cô ấy rời xa tôi, tôi mới nhận ra mình yêu cô ấy nhiều đến nhường nào."
      },
      {
        "translation": "Phải sau khi làm bài thi xong, tôi mới nhớ ra câu trả lời chính xác cho câu hỏi này là gì."
      },
      {
        "translation": "Chỉ sau khi tốt nghiệp đại học, tôi mới thực sự hiểu được những điều mình cần phải học là gì."
      },
      {
        "translation": "Mãi sau khi bắt tay vào làm việc, tôi mới biết khối lượng công việc nhiều đến mức độ nào."
      }
    ]
  },
  "ko_흔히_53": {
    "title": "흔히 / ~흔히 (Thường, thông thường, thường thấy)",
    "shortExplanation": "Phó từ dùng để diễn đạt một hiện tượng, sự việc nào đó xảy ra thường xuyên, phổ biến hoặc là một quan niệm thông thường được nhiều người biết đến ('thường', 'thông thường').",
    "longExplanation": "'흔히' là phó từ có gốc từ tính từ '흔하다' (nhiều, phổ biến). Từ này được dùng trước động từ, tính từ hoặc đứng đầu câu nhằm chỉ ra rằng một tình huống, thói quen hay quan niệm nào đó diễn ra với tần suất cao hoặc rất quen thuộc trong đời sống xã hội. Nó tương đương với 'thường', 'thông thường', 'người ta thường...' trong tiếng Việt. '흔히' có thể dùng trong cả các nhận định khách quan về thực tế lẫn các quan niệm chủ quan phổ biến.",
    "formation": "흔히 + Động từ/Tính từ | 흔히 + Mệnh đề",
    "examples": [
      {
        "translation": "Mọi người thường hay nghĩ rằng đồ ăn tốt cho sức khỏe thì sẽ không ngon miệng."
      },
      {
        "translation": "Ở Hàn Quốc, người ta thường gọi những người sống một mình là 'người độc thân' (single)."
      },
      {
        "translation": "Chúng ta thường hay ăn món ăn nước ngoài nhiều hơn cả món ăn của nước mình."
      },
      {
        "translation": "Hoa anh đào, loài hoa thường nở rộ khi mùa xuân đến, được rất nhiều người biết đến."
      }
    ]
  },
  "ko_되다_54": {
    "title": "~이/가 되다 / ~되다 (Trở thành, trở nên, thành)",
    "shortExplanation": "Động từ biểu thị sự biến đổi, chuyển biến từ một trạng thái, tư cách hay vai trò này sang một trạng thái, tính chất hoặc vai trò mới ('trở thành', 'trở nên', 'thành').",
    "longExplanation": "'되다' là một trong những động từ cơ bản nhất trong tiếng Hàn, biểu thị sự thay đổi hoặc đạt được kết quả. Khi đi sau danh từ kết hợp với tiểu từ chủ cách '이/가' ('Danh từ + 이/가 되다'), cấu trúc diễn tả việc ai đó hoặc cái gì trở thành một nghề nghiệp, thân phận hay đối tượng mới (ví dụ: 'bác sĩ', 'người lớn'). Khi kết hợp với tính từ hoặc động từ thông qua vĩ tố '-게' ('Tính từ/Động từ + -게 되다'), cấu trúc biểu thị sự biến chuyển về mặt tính chất hoặc hoàn cảnh ngoại cảnh đưa đẩy dẫn đến tình trạng đó. Ngoài ra, '되다' còn là hậu tố cấu tạo động từ phái sinh khi ghép với danh từ gốc Hán.",
    "formation": "Danh từ + 이/가 되다 (danh từ có phụ âm cuối dùng 이 되다, không có phụ âm cuối dùng 가 되다) | Thân tính từ/động từ + -게 되다",
    "examples": [
      {
        "translation": "Thời tiết đang nóng bức bỗng nhiên trở nên lạnh buốt, thế nên mọi người đều bị cảm cúm."
      },
      {
        "translation": "Cô ấy đã nỗ lực học tập chăm chỉ và trở thành vị giáo sư trẻ tuổi nhất thế giới."
      },
      {
        "translation": "Bạn tôi đã học tiếng Hàn và trở thành một biên dịch viên."
      },
      {
        "translation": "Chú mèo con bé bỏng ngày nào giờ đã trở thành một chú mèo to lớn."
      }
    ]
  },
  "ko_잖다_55": {
    "title": "-잖아(요) / ~잖다 (Chẳng phải là... sao, mà, ấy mà)",
    "shortExplanation": "Vĩ tố kết thúc câu dùng khi nhắc nhở, tái khẳng định một sự thật mà người nghe vốn dĩ đã biết, hoặc dùng để giải thích lý do hiển nhiên cho một tình huống ('chẳng phải là... sao', 'mà lại').",
    "longExplanation": "'-잖다' là dạng rút gọn của cụm phủ định nghi vấn '-지 않다'. Vĩ tố này dùng khi người nói muốn nhắc người đối thoại nhớ lại một thông tin, sự thật mà cả hai bên cùng biết rõ, hoặc dùng để biện minh, đưa ra lý do hiển nhiên cho hành động của mình ('chẳng phải chúng ta đã hẹn trước rồi sao', 'trời đang mưa mà'). Trong văn phong thân mật dùng '-잖아', khi cần lịch sự tôn trọng thì thêm tiểu từ '-요' thành '-잖아요'. Đôi khi nó cũng mang sắc thái hờn dỗi nhẹ hoặc khiển trách nhẹ khi đối phương quên mất điều hiển nhiên.",
    "formation": "Thân động từ/tính từ + -잖아(요) (quá khứ dùng -았/었잖아(요)) | Danh từ + (이)잖아(요) (có phụ âm cuối dùng 이잖아(요), không có phụ âm cuối dùng 잖아(요))",
    "examples": [
      {
        "translation": "Cậu hôm nay phải đến trường mà, sao giờ này vẫn còn mải chơi thế?"
      },
      {
        "translation": "Ngày mai tụi mình có bài kiểm tra mà. Thế nên hôm nay tớ mới định học bài này."
      },
      {
        "translation": "Cậu cũng biết người đó mà, dạo này anh ấy thế nào rồi?"
      },
      {
        "translation": "Bây giờ muộn rồi mà, tụi mình phải bắt đầu học thôi."
      }
    ]
  },
  "ko_져지다_56": {
    "title": "-아/어지다 / ~져/지다 (Trở nên..., dần dần...)",
    "shortExplanation": "Vĩ tố bổ trợ kết hợp với thân tính từ để diễn tả sự biến chuyển dần dần về trạng thái, tính chất hoặc cảm xúc theo thời gian ('trở nên...', 'càng ngày càng...').",
    "longExplanation": "'-아/어지다' là cấu trúc biến đổi một tính từ chỉ trạng thái tĩnh thành một quá trình biến đổi động. Khi gắn vào thân tính từ, cấu trúc này diễn tả việc tính chất hay cảm giác đó đang dần hình thành, phát triển hoặc chuyển biến sang một mức độ mới (ví dụ: '춥다' lạnh -> '추워지다' trở nên lạnh; '좋다' tốt -> '좋아지다' trở nên tốt hơn). Lưu ý: khi kết hợp với động từ, '-아/어지다' có thể mang ý nghĩa bị động, nhưng công dụng phổ biến nhất của nó là kết hợp với tính từ để biểu thị sự biến đổi trạng thái.",
    "formation": "Thân tính từ + -아/어지다 (thân từ có nguyên âm ㅏ, ㅗ dùng -아지다; các nguyên âm khác dùng -어지다; 하다 biến thành 해지다)",
    "examples": [
      {
        "translation": "Thời tiết trở nên quá nóng bức nên việc đi ra ngoài cũng trở nên khó khăn."
      },
      {
        "translation": "Cô ấy ngày càng nổi tiếng ở trường học nên có rất nhiều người đã biết đến cô ấy."
      },
      {
        "translation": "Vì vẽ tranh rất nhiều nên tay nghề vẽ tranh của cậu ấy đã trở nên thực sự tiến bộ."
      },
      {
        "translation": "Mải tập trung vào làm việc nên thời gian trôi qua quá nhanh."
      }
    ]
  },
  "ko_졌다가_57": {
    "title": "-았/었다가 / -아/어졌다가 (Làm gì xong rồi lại..., vừa mới... thì lại...)",
    "shortExplanation": "Vĩ tố liên kết diễn tả một hành động hoặc trạng thái ở vế trước đã hoàn tất hoặc hình thành, nhưng sau đó bị đảo ngược, thay đổi hoặc chuyển tiếp sang một hành động, trạng thái hoàn toàn trái ngược ('xong rồi lại...', 'vừa mới... thì lại...').",
    "longExplanation": "'-았/었다가' (hoặc dạng kết hợp biến đổi trạng thái '-아/어졌다가') là vĩ tố liên kết biểu thị sự đảo nghịch hoặc chuyển hướng hành động sau khi đã hoàn tất. Điểm khác biệt quan trọng với '-다가' thông thường (vốn diễn tả một hành động đang dang dở thì bị ngắt quãng) là '-았/었다가' yêu cầu hành động ở vế trước phải kết thúc trọn vẹn, rồi sau đó một hành động mới xuất hiện mang tính đảo ngược lại trạng thái cũ (ví dụ: mở cửa ra rồi lại đóng lại, vừa nhận việc xong thì bị sa thải).",
    "formation": "Thân động từ/tính từ + -았/었다가 (thân từ có nguyên âm ㅏ, ㅗ dùng -았다가; các nguyên âm khác dùng -었다가; 하다 biến thành 했다가)",
    "examples": [
      {
        "translation": "Tôi vừa mở cửa ra một lúc rồi lại đóng ngay lại, vì không thể kiên nhẫn đứng đợi bạn đến được."
      },
      {
        "translation": "Nhà hàng đó vừa mới mở cửa hoạt động được vài ngày trước mà hôm nay đã đóng cửa luôn rồi."
      },
      {
        "translation": "Lũ trẻ mải chơi điện tử trên máy tính nên đã phải bỏ dở việc làm bài tập về nhà."
      },
      {
        "translation": "Bạn tôi vừa mới nhận được việc làm, nhưng chỉ sau một tháng đã bị sa thải."
      }
    ]
  },
  "ko_즉_58": {
    "title": "즉 / ~즉 (Tức là, có nghĩa là, nói cách khác)",
    "shortExplanation": "Phó từ liên kết dùng để giải thích lại, làm rõ hoặc tóm lược cụ thể hơn nội dung đã nêu ở câu trước ('tức là', 'nói cách khác').",
    "longExplanation": "'즉' là phó từ liên kết gốc Hán (卽 - tức) dùng để mở đầu cho lời giải thích chi tiết hơn, chính xác hơn hoặc tóm tắt nội dung của mệnh đề đi trước. Tương đương với các cụm từ 'tức là', 'nói cách khác', 'điều này có nghĩa là...' trong tiếng Việt. Từ này có tính logic và học thuật cao, thường xuyên xuất hiện trong các bài luận, văn bản pháp quy, bài báo khoa học và các bài phát biểu mang tính trang trọng.",
    "formation": "Mệnh đề 1 + . tức + Mệnh đề 2 | Danh từ 1 + , tức + Danh từ 2",
    "examples": [
      {
        "translation": "Dựa trên kết quả của nghiên cứu này, tức là theo những gì chúng ta quan sát được, hiện tượng nóng lên toàn cầu rõ ràng là do hoạt động của con người gây ra."
      },
      {
        "translation": "Ông ấy là một chuyên gia về quan hệ quốc tế. Nói cách khác, ông ấy nghiên cứu các vấn đề giữa các quốc gia khác nhau trên thế giới."
      },
      {
        "translation": "Bức thư điện tử này sẽ chỉ gửi riêng cho cậu. Tức là, cậu là người nhận duy nhất của thông điệp này."
      },
      {
        "translation": "Cậu ấy là một người bạn tốt của tôi. Có nghĩa là, tôi biết rất rõ về cậu ấy."
      }
    ]
  },
  "ko_지_59": {
    "title": "-지 않을까 싶다 / ~지 않을까 싶다 (E rằng..., có lẽ là..., tự hỏi liệu có phải...)",
    "shortExplanation": "Dùng để bày tỏ sự phỏng đoán, suy đoán một cách thận trọng, dè dặt về khả năng một sự việc nào đó có thể xảy ra hoặc đúng sự thật ('e rằng...', 'nghĩ rằng có lẽ...').",
    "longExplanation": "'-지 않을까 싶다' được cấu thành bởi vĩ tố phủ định nghi vấn '-지 않을까' (liệu có phải là không...) kết hợp với động từ bổ trợ '싶다' (nghĩ rằng, e rằng). Cấu trúc này dùng khi người nói muốn đưa ra suy đoán mang tính chủ quan nhưng không muốn khẳng định một cách quá gay gắt, võ đoán. Nó mang sắc thái uyển chuyển, lịch thiệp, diễn tả rằng người nói 'e rằng/nghĩ rằng có lẽ sự việc sẽ như thế'. Cấu trúc này có thể thể hiện cả sự lo âu, e ngại lẫn niềm hy vọng nhẹ nhàng.",
    "formation": "Thân động từ/tính từ + -지 않을까 싶다 | Danh từ + -(이)지 않을까 싶다 (danh từ có phụ âm cuối dùng 이지 않을까 싶다, không có phụ âm cuối dùng 지 않을까 싶다)",
    "examples": [
      {
        "translation": "Tôi nghĩ có lẽ cậu ấy sẽ làm tốt bài kiểm tra lần này thôi, bởi vì cậu ấy lúc nào cũng học hành chăm chỉ mà."
      },
      {
        "translation": "Tôi e rằng thời tiết có lẽ sắp xấu đi rồi, mây đen đang ngày càng nhiều lên."
      },
      {
        "translation": "Tôi nghĩ có lẽ tối nay mình sẽ kịp về đến nhà, vì máy bay đã cất cánh đúng giờ."
      },
      {
        "translation": "Tôi đang tính liệu cuối tuần này tụi mình có thể đi xem phim được không, bạn thấy thế nào?"
      }
    ]
  },
  "ko_지_60": {
    "title": "-지 않을까 하다 / ~지 않을까 하다 (Nghĩ là có lẽ..., tính chừng là..., lo ngại rằng...)",
    "shortExplanation": "Dùng để bày tỏ dự đoán, nhận định hoặc tính toán mang tính chủ quan của người nói trước một sự việc chưa chắc chắn ('nghĩ là có lẽ...', 'tính chừng là...').",
    "longExplanation": "'-지 않을까 하다' là cấu trúc kết hợp vĩ tố phỏng đoán phủ định nghi vấn '-지 않을까' với động từ '하다' (ở đây mang nghĩa nội tâm: nghĩ, tự nhủ). Khác với câu khẳng định trực tiếp, cấu trúc này phản ánh quá trình suy tính, dự phóng trong đầu người nói: 'tôi đang nghĩ/tính chừng rằng chuyện đó có thể xảy ra'. Cấu trúc này thường được theo sau bởi '-해서' ('-지 않을까 해서...') để giải thích động cơ hoặc lý do khiến người nói chuẩn bị trước một hành động nào đó (ví dụ: 'nghĩ là trời sắp mưa nên tôi đã mang theo ô').",
    "formation": "Thân động từ/tính từ + -지 않을까 하다 | Danh từ + -(이)지 않을까 하다",
    "examples": [
      {
        "translation": "Nghĩ là ngày mai trời có thể sẽ mưa nên tôi đã mang theo sẵn một chiếc ô."
      },
      {
        "translation": "Tôi cứ bận tâm lo lắng vì nghĩ rằng cô ấy có thể sẽ gặp gỡ người mà cô ấy thích."
      },
      {
        "translation": "Bây giờ đã là rạng sáng rồi nên tôi đoán chừng có lẽ mọi người đều đã ngủ say."
      },
      {
        "translation": "Đoán rằng bạn mình có khả năng sẽ đỗ kỳ thi lần này nên tôi đang chuẩn bị sẵn tin nhắn chúc mừng."
      }
    ]
  },
  "ko_지요_62": {
    "title": "-지요 (-죠) / ~지요 (Nhỉ, chứ, đúng không, phải không)",
    "shortExplanation": "Vĩ tố kết thúc câu dùng để hỏi lại nhằm xác nhận thông tin, tìm kiếm sự đồng tình từ người nghe một cách thân thiện, hoặc khẳng định nhẹ nhàng điều mình tin là đúng ('nhỉ', 'chứ', 'đúng không').",
    "longExplanation": "'-지요' (thường được rút gọn thành '-죠' trong văn nói thường nhật) là một vĩ tố kết thúc câu vô cùng phổ biến trong khẩu ngữ tiếng Hàn. Khi dùng trong câu hỏi (lên giọng ở cuối câu), nó đóng vai trò như một câu hỏi đuôi để tìm kiếm sự xác nhận hoặc chia sẻ quan điểm từ phía người nghe ('thời tiết đẹp nhỉ?', 'chúng ta phải đi chứ?'). Khi dùng trong câu trần thuật (xuống giọng ở cuối câu), nó giúp làm mềm câu nói, thể hiện thái độ thân mật, hòa nhã và lịch sự thay vì dùng các đuôi câu cứng nhắc.",
    "formation": "Thân động từ/tính từ + -지요 (viết tắt là -죠; quá khứ dùng -았/었지요) | Danh từ + -(이)지요 (có phụ âm cuối dùng 이지요, không có phụ âm cuối dùng 지요)",
    "examples": [
      {
        "translation": "Thời tiết hôm nay rất đẹp đúng không nhỉ?"
      },
      {
        "translation": "Ngày mai chúng ta phải đến trường chứ nhỉ?"
      },
      {
        "translation": "Bộ phim này đã rất hay và thú vị phải không?"
      },
      {
        "translation": "Cô ấy hình như vẫn còn là học sinh đúng không nhỉ?"
      }
    ]
  },
  "ko_진행하다_63": {
    "title": "진행하다 / ~을/를 진행하다 (Tiến hành, thực hiện, triển khai)",
    "shortExplanation": "Động từ biểu thị việc xúc tiến, thực hiện hoặc duy trì một công việc, cuộc họp, nghiên cứu hay sự kiện nào đó theo kế hoạch ('tiến hành', 'triển khai').",
    "longExplanation": "'진행하다' là một động từ gốc Hán (進行 - tiến hành) được dùng rất phổ biến trong môi trường học thuật, công sở và đời sống xã hội. Khi đi với tân ngữ mang trợ từ '을/를', từ này chỉ hành vi chủ động tổ chức, điều phối hoặc xúc tiến một chuỗi công việc (như 'tiến hành nghiên cứu', 'chủ trì cuộc họp', 'triển khai dự án'). Khi đóng vai trò nội động từ, nó mô tả bản thân sự việc đang diễn tiến, tiếp diễn theo dòng thời gian.",
    "formation": "Danh từ + 을/를 진행하다 (danh từ có phụ âm cuối dùng 을 진행하다, không có phụ âm cuối dùng 를 진행하다)",
    "examples": [
      {
        "translation": "Đội ngũ nghiên cứu đang tiến hành điều tra về vấn đề này. Họ vừa thu thập nhiều dữ liệu đa dạng vừa phân tích thông tin."
      },
      {
        "translation": "Tùy thuộc vào việc hôm nay cuộc họp được tiến hành nhanh hay chậm mà quyết định xem tôi có thể tan làm đúng giờ được hay không."
      },
      {
        "translation": "Các học sinh cứ mải miết tiếp tục việc học nên chẳng hề nhận ra thời gian đã trôi qua tự lúc nào."
      },
      {
        "translation": "Trong quá trình lập kế hoạch dự án, đội ngũ chúng tôi đang tiến hành thảo luận để tìm giải pháp cho vấn đề."
      }
    ]
  },
  "ko_차라리_64": {
    "title": "차라리 / ~차라리 (Thà rằng, thà... còn hơn)",
    "shortExplanation": "Phó từ dùng để biểu thị sự lựa chọn một phương án được coi là thỏa đáng hoặc ít tồi tệ hơn khi so sánh với phương án kia ('thà rằng...', 'thà... còn hơn').",
    "longExplanation": "'차라리' là một phó từ chỉ sự so sánh lựa chọn mang tính dứt khoát. Từ này thường kết hợp với cấu trúc so sánh '-기보다는' để tạo thành mẫu câu phổ biến: '[A]-기보다는 차라리 [B]' (thà làm B còn hơn là làm A). Cấu trúc này thường được dùng khi cả hai phương án đều có mặt hạn chế hoặc khó khăn, nhưng phương án B dù sao cũng dễ chấp nhận hơn, ít gây phiền toái hơn hoặc mang lại giá trị tốt hơn là cố chấp làm phương án A.",
    "formation": "Mệnh đề 1 + -기보다는 차라리 + Mệnh đề 2 | 차라리 + Mệnh đề",
    "examples": [
      {
        "translation": "Thay vì cứ ru rú ở nhà một mình, tôi thà ra ngoài đi chơi cùng bạn bè còn hơn."
      },
      {
        "translation": "Thay vì việc bạn nói dối, tôi thà bạn cứ thẳng thắn nói thật ra thì tốt hơn."
      },
      {
        "translation": "Thay vì tiêu xài vào món đồ đó, thà rằng bạn tiết kiệm số tiền đó thì tốt hơn nhiều."
      },
      {
        "translation": "Nếu đã như thế thì thà rằng đừng nói lời nào còn tốt hơn."
      }
    ]
  },
  "ko_처럼만_65": {
    "title": "~처럼만 (Chỉ giống như..., hệt như là...)",
    "shortExplanation": "Trợ từ so sánh kết hợp trợ từ hạn định, dùng để so sánh một đối tượng với đối tượng khác và nhấn mạnh sự tương đồng độc nhất ('chỉ giống như...', 'hệt như...').",
    "longExplanation": "'~처럼만' được cấu tạo bằng cách kết hợp trợ từ so sánh '처럼' (giống như, như) với trợ từ hạn định, nhấn mạnh '만' (chỉ, duy nhất). Cấu trúc này dùng để so sánh đối tượng, hành động hoặc trạng thái với một hình ảnh mẫu mực, nhấn mạnh rằng sự việc chỉ diễn ra hệt như thế, không khác đi đâu được. Thường đi kèm với phó từ '마치' (dường như, như thể) để tăng tính sinh động của phép so sánh.",
    "formation": "Danh từ + 처럼만 | Mệnh đề định ngữ (-는/-(으)ㄴ 것) + 처럼만",
    "examples": [
      {
        "translation": "Khác với những người khác, cô ấy chỉ hành động hệt như thể đang trong một giấc mơ."
      },
      {
        "translation": "Món ăn này ngon hệt như món chính tay mẹ nấu vậy."
      },
      {
        "translation": "Thời tiết hôm nay ấm áp chẳng khác nào mùa xuân."
      },
      {
        "translation": "Anh ấy cứ nhìn chằm chằm vào tôi hệt như thể đã nhận ra tôi từ trước."
      }
    ]
  },
  "ko_게_66": {
    "title": "~게 하다 (Bắt làm..., khiến cho..., làm cho...)",
    "shortExplanation": "Cấu trúc sai khiến dùng để diễn tả việc chủ ngữ tác động, sai bảo hoặc làm cho người khác, đối tượng khác thực hiện một hành động hoặc biến chuyển sang một trạng thái nhất định ('khiến cho', 'bắt làm').",
    "longExplanation": "'~게 하다' là cấu trúc tạo thể sai khiến trong tiếng Hàn, được cấu tạo từ vĩ tố liên kết phó từ hóa '-게' kết hợp với trợ động từ '하다'. Cấu trúc này biểu thị chủ ngữ là nguyên nhân thúc đẩy, chỉ đạo hoặc tác động khiến đối tượng tiếp nhận phải tiến hành một hành động hoặc chuyển hóa sang một trạng thái tâm lý, tình cảm nhất định. Tùy ngữ cảnh mà mang sắc thái cưỡng ép ('bắt'), cho phép ('để cho') hoặc dẫn tới kết quả ('khiến cho').",
    "formation": "Thân động từ/tính từ + 게 하다",
    "examples": [
      {
        "translation": "Mẹ đã bắt tôi phải đi ngủ sớm."
      },
      {
        "translation": "Thầy giáo đã bắt chúng tôi phải học tập thật nhiều."
      },
      {
        "translation": "Vì một tai nạn không may, anh ấy đã làm cho cô ấy phải rơi lệ."
      },
      {
        "translation": "Cô ấy đã khiến cho chồng mình cảm thấy vô cùng hạnh phúc."
      }
    ]
  },
  "ko_타다_67": {
    "title": "~을/를 타다 (Đi xe..., đón xe..., cưỡi...)",
    "shortExplanation": "Động từ dùng cùng với các phương tiện giao thông để biểu thị hành động đi, đón hoặc sử dụng phương tiện đó để di chuyển ('đi xe', 'ngồi xe').",
    "longExplanation": "'~타다' là ngoại động từ chỉ hành động leo lên, ngồi lên và di chuyển bằng các phương tiện giao thông đường bộ, đường sắt, đường thủy hoặc hàng không (xe buýt, tàu điện ngầm, taxi, ô tô, máy bay, xe đạp, ngựa...). Danh từ chỉ phương tiện thường kết hợp với tiểu từ tân ngữ '을/를'. Khi dùng để diễn tả phương thức di chuyển đến một nơi nào đó, người ta thường dùng dạng liên kết '~을/를 타고 가다/오다' (đi/đến bằng xe...).",
    "formation": "Danh từ chỉ phương tiện giao thông + 을/를 + 타다 (kết thúc bằng nguyên âm dùng 를 타다, kết thúc bằng phụ âm dùng 을 타다)",
    "examples": [
      {
        "translation": "Khi đi làm, tôi luôn luôn đi xe buýt đến công ty."
      },
      {
        "translation": "Vì quá mệt mỏi nên hôm nay tôi đã bắt taxi để về nhà."
      },
      {
        "translation": "Em gái tôi đi tàu điện ngầm đến trường học."
      },
      {
        "translation": "Bố tôi đi làm bằng ô tô riêng của gia đình."
      }
    ]
  },
  "ko_하게_68": {
    "title": "~하게 하다 (Bắt buộc..., khiến ai đó làm gì...)",
    "shortExplanation": "Mẫu câu sai khiến biểu thị hành động của chủ ngữ tác động trực tiếp hoặc gián tiếp, khiến cho đối tượng khác buộc phải hành động hoặc thay đổi trạng thái ('bắt làm', 'khiến cho').",
    "longExplanation": "'~하게 하다' là cấu trúc sai khiến hoàn chỉnh trong tiếng Hàn, trong đó thân động từ/tính từ kết hợp với vĩ tố liên kết phó từ hóa '-하게', tiếp nối sau đó là động từ '하다'. Mẫu câu này nhấn mạnh vai trò của chủ ngữ như một tác nhân gây ra sự việc (người ra lệnh, tạo điều kiện hoặc gây áp lực), còn tân ngữ là người trực tiếp gánh chịu hoặc thực hiện hành động đó. Thường dùng trong các mối quan hệ trên - dưới hoặc diễn tả các sự cố bất khả kháng dẫn tới hệ quả.",
    "formation": "Chủ ngữ + (Tân ngữ + 을/를 / 에게) + Thân động từ/tính từ + -하게 하다",
    "examples": [
      {
        "translation": "Mẹ đã yêu cầu tôi phải đi ngủ thật sớm."
      },
      {
        "translation": "Thầy giáo đã bắt chúng tôi phải học tập chăm chỉ hơn rất nhiều."
      },
      {
        "translation": "Vụ tai nạn xui xẻo ấy đã khiến anh ta làm cho cô ấy phải bật khóc."
      },
      {
        "translation": "Cô ấy đã làm cho người chồng của mình luôn ngập tràn hạnh phúc."
      }
    ]
  },
  "ko_하여야만_69": {
    "title": "-아/어야만 / ~하여야만 (Chỉ khi... mới..., nhất định phải... thì mới...)",
    "shortExplanation": "Vĩ tố liên kết diễn tả điều kiện tiên quyết mang tính bắt buộc duy nhất, biểu thị rằng chỉ khi hành động phía trước được thực hiện thì kết quả phía sau mới có thể đạt được ('chỉ khi... mới...').",
    "longExplanation": "'~하여야만' là dạng trang trọng/văn viết của cấu trúc '-아/어야만', được cấu tạo từ vĩ tố điều kiện bắt buộc '-아/어야' kết hợp với trợ từ hạn định nhấn mạnh '-만' (chỉ, duy nhất). Cấu trúc này dùng để khẳng định mạnh mẽ rằng hành động ở mệnh đề trước là điều kiện tối cần thiết duy nhất; nếu không đáp ứng điều kiện này thì tuyệt đối không thể đạt được mục đích, kết quả hoặc trạng thái ở mệnh đề sau. Vế sau thường đi kèm với các biểu hiện phủ định hoặc cảnh báo hệ quả nếu không làm ('그렇지 않으면...').",
    "formation": "Thân động từ/tính từ + -아/어야만 (thân từ có nguyên âm ㅏ, ㅗ dùng -아야만; nguyên âm khác dùng -어야만; 하다 biến thành 하여야만 hoặc 해야만)",
    "examples": [
      {
        "translation": "Muốn thành công thì bạn nhất định phải chăm chỉ học tập; nếu không thì sẽ có nguy cơ thất bại."
      },
      {
        "translation": "Để khỏi bệnh thì nhất định phải uống thuốc đầy đủ; nếu không thì không thể hồi phục sức khỏe được."
      },
      {
        "translation": "Nếu có ước mơ muốn thực hiện thì chỉ có kiên trì nỗ lực mới được; nếu không thì ước mơ đó cũng mãi chỉ là mơ ước mà thôi."
      },
      {
        "translation": "Để đạt được mục tiêu, bạn nhất định phải lập kế hoạch và bám sát theo nó; nếu không thì bạn sẽ chẳng thể nào chạm tới mục tiêu."
      }
    ]
  },
  "ko_해서는_70": {
    "title": "-아/어서는 안 되다 / ~해서는 안 되다 (Không được..., tuyệt đối không được phép...)",
    "shortExplanation": "Cấu trúc cấm đoán dùng để biểu thị sự ngăn cấm mang tính quy tắc, đạo đức hoặc lời khuyên ngăn nghiêm khắc rằng không được phép làm một hành động nào đó ('không được làm...').",
    "longExplanation": "'~해서는 안 되다' (hay tổng quát là '-아/어서는 안 되다') là cấu trúc diễn tả sự ngăn cấm mang tính quy chuẩn trong tiếng Hàn. Cấu trúc kết hợp vĩ tố liên kết điều kiện giả định '-아/어서' với trợ từ đối chiếu nhấn mạnh '-는' và cụm phủ định '안 되다' (không được, không thể chấp nhận). Mang ý nghĩa 'nếu làm hành động phía trước thì sẽ không ổn/không được phép', dùng để đưa ra quy định, điều cấm kỵ, giới hạn đạo đức hoặc lời cảnh báo mạnh mẽ.",
    "formation": "Thân động từ + -아/어서는 안 되다 (nguyên âm ㅏ, ㅗ dùng -아서는 안 되다; các nguyên âm khác dùng -어서는 안 되다; 하다 biến thành 해서는 안 되다)",
    "examples": [
      {
        "translation": "Bạn không được phép lấy đồ của người khác. Đó là hành vi trộm cắp."
      },
      {
        "translation": "Trẻ con không được mải chơi trước. Chúng phải làm bài tập về nhà trước rồi sau đó mới được chơi."
      },
      {
        "translation": "Bạn không nên thức khuya ngủ muộn. Điều đó có thể gây phương hại đến sức khỏe."
      },
      {
        "translation": "Chúng ta không được phớt lờ vấn đề. Thay vào đó, chúng ta phải bắt tay vào giải quyết nó."
      }
    ]
  },
  "ko_해서야_71": {
    "title": "-아/어서야 / ~해서야 (Phải... thì mới..., chỉ khi... mới...)",
    "shortExplanation": "Vĩ tố liên kết nhấn mạnh điều kiện tiên quyết bắt buộc để đạt được một kết quả, biểu thị rằng phải làm hành động phía trước thì mới có thể thực hiện được mục tiêu phía sau ('phải... thì mới...').",
    "longExplanation": "'~해서야' (dạng tổng quát là '-아/어서야') là sự kết hợp giữa vĩ tố liên kết nguyên nhân, điều kiện '-아/어서' và trợ từ nhấn mạnh điều kiện cốt lõi '-야' (chỉ, phải). Cấu trúc này dùng để biểu thị rằng chỉ khi hành động ở mệnh đề trước được thực thi thì điều kiện cần thiết mới được thỏa mãn để đạt tới kết quả ở mệnh đề sau. Thường đi kèm với các biểu hiện như '~해서야 하다' (phải... thì mới được), '위해서야' (để mà... thì phải), hoặc '비로소' (mới thực sự).",
    "formation": "Thân động từ + -아/어서야 (nguyên âm ㅏ, ㅗ dùng -아서야; nguyên âm khác dùng -어서야; 하다 biến thành 해서야)",
    "examples": [
      {
        "translation": "Để thích nghi tốt hơn với môi trường học đường, cần phải tham gia nhiều hơn vào các hoạt động thường ngày của trường."
      },
      {
        "translation": "Muốn nâng được mức tạ nặng hơn, tôi phải tập luyện chăm chỉ hơn nữa thì mới được."
      },
      {
        "translation": "Để tạo dựng hình ảnh tốt đẹp trong mắt các nhân viên công ty, tôi phải chịu khó tăng ca nhiều hơn."
      },
      {
        "translation": "Để học nấu ăn thật tốt, nếu muốn hiểu sâu sắc về các nguyên liệu thì phải nỗ lực tìm tòi rất nhiều."
      }
    ]
  },
  "ko_해야겠다_72": {
    "title": "-아/어야겠다 / ~해야겠다 (Phải... mới được, chắc là phải... thôi)",
    "shortExplanation": "Cấu trúc biểu thị ý chí, quyết tâm mạnh mẽ hoặc sự tự nhận thức của người nói rằng mình cần phải thực hiện một hành động nào đó ('chắc phải... thôi', 'phải... mới được').",
    "longExplanation": "'~해야겠다' (dạng tổng quát là '-아/어야겠다') được cấu tạo từ vĩ tố chỉ nghĩa vụ, sự cần thiết '-아/어야 하다' kết hợp với vĩ tố chỉ ý chí, phỏng đoán '-겠-'. Ngữ pháp này dùng khi người nói tự nhủ hoặc đưa ra quyết định chắc chắn rằng bản thân cần phải hoặc nhất định phải thực hiện một việc gì đó dựa trên hoàn cảnh hiện tại. Thường dùng trong lời độc thoại, nhật ký, hoặc khi thông báo quyết định của bản thân cho người nghe một cách lịch sự, kiên quyết.",
    "formation": "Thân động từ + -아/어야겠다 (nguyên âm ㅏ, ㅗ dùng -아야겠다; nguyên âm khác dùng -어야겠다; 하다 biến thành 해야겠다)",
    "examples": [
      {
        "translation": "Bên ngoài trời nóng nực quá, từ lần sau chắc là tôi phải thoa kem chống nắng mới được."
      },
      {
        "translation": "Kỳ thi cuối cùng cũng đã kết thúc rồi, giờ thì tôi phải dọn dẹp sách vở thôi."
      },
      {
        "translation": "Tôi đã học hành chăm chỉ rồi, bây giờ chắc phải đi ngủ thôi."
      },
      {
        "translation": "Tuần sau có một cuộc họp quan trọng nên tôi nhất định phải quản lý thời gian của mình thật tốt."
      }
    ]
  },
  "ko_해야지_73": {
    "title": "-아/어야지 / ~해야지 (Phải... thôi, tự nhủ sẽ... / sao lại làm thế chứ)",
    "shortExplanation": "Vĩ tố kết thúc câu thân mật dùng để biểu thị sự tự nhủ, quyết tâm của người nói về việc mình cần làm ('phải... thôi', 'phải làm... mới được').",
    "longExplanation": "'~해야지' (dạng tổng quát là '-아/어야지') là vĩ tố kết thúc câu thân mật thể hiện sự tự nhủ, tự nhắc nhở bản thân về một việc cần phải làm trong tương lai gần. Ngữ pháp này phản ánh ý chí hoặc mục tiêu trước mắt của người nói một cách tự nhiên trong văn nói thân mật hoặc trong độc thoại nội tâm. Ngoài ra, trong một số ngữ cảnh khi nói với người khác, nó còn có thể dùng để nhắc nhở hoặc trách móc nhẹ nhàng về điều đáng lẽ phải làm.",
    "formation": "Thân động từ + -아/어야지 (nguyên âm ㅏ, ㅗ dùng -아야지; nguyên âm khác dùng -어야지; 하다 biến thành 해야지)",
    "examples": [
      {
        "translation": "Kỳ thi đã cận kề trước mắt rồi, giờ thì mình phải bắt đầu học thôi."
      },
      {
        "translation": "Tối nay đã hẹn xem phim với bạn bè rồi, phải mua vé ngay mới được."
      },
      {
        "translation": "Lâu lắm rồi không tập luyện ở phòng gym, ngày mai mình phải đi sớm mới được."
      },
      {
        "translation": "Hôm nay ngủ muộn quá, sáng mai dậy mình phải mua bánh mì ăn mới được."
      }
    ]
  },
  "ko_했더니_74": {
    "title": "-았/었더니 / ~했더니 (Sau khi làm... thì nhận thấy..., làm... xong thì thấy...)",
    "shortExplanation": "Vĩ tố liên kết dùng để diễn tả việc người nói thực hiện một hành động trong quá khứ, sau đó phát hiện hoặc chứng kiến một kết quả, sự biến đổi nằm ngoài dự tính ('vừa làm... thì thấy...').",
    "longExplanation": "'~했더니' (dạng tổng quát là '-았/었더니') kết hợp thì quá khứ '-았/었-' với vĩ tố hồi tưởng, liên kết '-더니'. Cấu trúc này dùng khi chủ ngữ (thường là ngôi thứ nhất 'tôi') sau khi trực tiếp thực hiện hành động ở vế trước thì lập tức chứng kiến, phát hiện một kết quả, phản ứng hoặc một tình huống bất ngờ ở vế sau. Vế sau không dùng câu mệnh lệnh hay rủ rê mà chỉ thuật lại sự thật đã chứng kiến.",
    "formation": "Thân động từ + -았/었더니 (nguyên âm ㅏ, ㅗ dùng -았더니; nguyên âm khác dùng -었더니; 하다 biến thành 했더니)",
    "examples": [
      {
        "translation": "Sau một thời gian dài mới gặp lại bạn bè, tôi nhận thấy bạn ấy đã thay đổi rất nhiều."
      },
      {
        "translation": "Vừa về tới nhà thì tôi thấy mọi người đã dọn dẹp nhà cửa tinh tươm rồi."
      },
      {
        "translation": "Sau khi kiểm tra cập nhật theo thời gian thực, tôi thấy đã có một sự thay đổi rất lớn."
      },
      {
        "translation": "Vừa cúp máy xong thì tôi mới nhận ra là cuộc gọi đã bị nhầm máy do sơ suất."
      }
    ]
  },
  "ko_했었는데_75": {
    "title": "-았/었었는데 / ~했었는데 (Trước đây từng... nhưng mà...)",
    "shortExplanation": "Vĩ tố liên kết hồi tưởng quá khứ xa hoặc sự việc đã hoàn tất, diễn tả tình huống trong quá khứ nay đã thay đổi hoặc tạo nên sự tương phản với hiện tại ('đã từng... thế nhưng...').",
    "longExplanation": "'~했었는데' (dạng tổng quát là '-았/었었는데') được cấu tạo từ vĩ tố quá khứ kép '-았/었었-' kết hợp với vĩ tố liên kết bối cảnh/đối lập '-는데'. Cấu trúc này dùng để hồi tưởng lại một hành động, sự việc đã từng xảy ra và kết thúc trọn vẹn trong quá khứ, nhưng hiện tại trạng thái đó đã bị gián đoạn, thay đổi hoặc dẫn tới một kết quả trái ngược, bất ngờ. Thường tạo tiền đề hoặc bối cảnh tương phản cho mệnh đề sau.",
    "formation": "Thân động từ/tính từ + -았/었었는데 (nguyên âm ㅏ, ㅗ dùng -았었는데; nguyên âm khác dùng -었었는데; 하다 biến thành 했었는데)",
    "examples": [
      {
        "translation": "Tôi đã mua cuốn sách đó rồi, nhưng lại phát hiện ra ở thư viện cũng có cuốn y hệt, thành ra cuối cùng tôi lại sở hữu tới hai cuốn."
      },
      {
        "translation": "Tôi đã ăn tối rồi, thế nhưng bạn tôi bất ngờ gọi rủ đi nên tôi lại ăn tối thêm một lần nữa."
      },
      {
        "translation": "Tôi đã đến trường rất sớm, nhưng đùng một cái tiết học lại bị hủy bỏ, nên rốt cuộc tôi lại về nhà sớm."
      },
      {
        "translation": "Tôi đã miệt mài học suốt mấy tiếng đồng hồ, thế nhưng lại làm sai hết sạch các câu hỏi trong đề thi, vì đề ra hoàn toàn khác với những gì tôi đã ôn."
      }
    ]
  },
  "ko_했을_76": {
    "title": "-았/었을 텐데 / ~했을 텐데 (Đáng lẽ đã... thế nhưng, chắc là đã... rồi)",
    "shortExplanation": "Cấu trúc phỏng đoán hồi tưởng, diễn tả một sự việc đáng lẽ đã xảy ra trong quá khứ theo dự tính nhưng vì hoàn cảnh cản trở nên đã không thể thực hiện được ('đáng lẽ đã... nhưng...').",
    "longExplanation": "'~했을 텐데' (dạng tổng quát là '-았/었을 텐데') được cấu tạo từ định ngữ quá khứ phỏng đoán '-았/었을', danh từ phụ thuộc '터' (dự định, tình huống) và vĩ tố liên kết đối lập '-ㄴ데'. Cấu trúc này dùng để diễn đạt sự việc đáng lẽ đã xảy ra, đã dự định làm hoặc phỏng đoán rằng đã hoàn thành trong quá khứ, nhưng thực tế lại không xảy ra như mong đợi do hoàn cảnh bất khả kháng. Mang sắc thái tiếc nuối, tiếc rẻ hoặc giải thích nguyên nhân.",
    "formation": "Thân động từ/tính từ + -았/었을 텐데 (nguyên âm ㅏ, ㅗ dùng -았을 텐데; nguyên âm khác dùng -었을 텐데; 하다 biến thành 했을 텐데)",
    "examples": [
      {
        "translation": "Tôi đáng lẽ ra đã đến sân bay hôm nay rồi, nhưng vì vé máy bay đã bán hết sạch nên đành chịu không đi được."
      },
      {
        "translation": "Cô ấy đáng lẽ đã làm xong hết bài tập về nhà rồi, nhưng máy tính bất ngờ bị hỏng nên đã không thể làm được."
      },
      {
        "translation": "Cuối tuần trước chúng tôi đáng lẽ đã cùng nhau đi xem phim rồi, thế nhưng hôm đó quá bận rộn nên đành gác lại."
      },
      {
        "translation": "Tôi đáng lẽ đã gọi điện thoại cho bạn rồi, nhưng điện thoại lại hết sạch pin nên không thể gọi được."
      }
    ]
  },
  "ko_혹시_77": {
    "title": "혹시 (Liệu có phải..., chẳng hay..., có khi nào...)",
    "shortExplanation": "Phó từ dùng ở đầu hoặc giữa câu nghi vấn/đề nghị để diễn tả sự suy đoán dè dặt, giúp làm mềm câu hỏi và hỏi han một cách tế nhị, lịch sự ('liệu rằng...', 'có khi nào...').",
    "longExplanation": "'혹시 (或時)' là phó từ có gốc Hán, dùng để mở đầu cho những câu hỏi, câu nghi vấn hoặc lời thỉnh cầu mang tính ức đoán, giả định về một khả năng có thể xảy ra. Nó mang lại sắc thái nhẹ nhàng, khiêm tốn và lịch sự, tránh cảm giác đột ngột, áp đặt hay chất vấn đối phương. Thường dịch là 'chẳng hay...', 'liệu có phải...', 'không biết chừng...'.",
    "formation": "혹시 + Mệnh đề nghi vấn / Đề nghị",
    "examples": [
      {
        "translation": "Chẳng hay lát nữa nếu có chút thời gian rảnh, bạn có muốn cùng tôi đi uống cà phê không?"
      },
      {
        "translation": "Liệu ngày mai trời có mưa không nhỉ?"
      },
      {
        "translation": "Chẳng hay bạn có quen biết vị đó không?"
      },
      {
        "translation": "Liệu bạn có chút thời gian rảnh nào không ạ?"
      }
    ]
  },
  "ko_힘들다_78": {
    "title": "-기 힘들다 / ~힘들다 (Khó mà làm gì..., vất vả khi...)",
    "shortExplanation": "Cấu trúc diễn đạt sự khó khăn, gian nan hoặc vất vả khi thực hiện một hành động cụ thể nào đó ('khó làm...', 'vất vả để...').",
    "longExplanation": "'-기 힘들다' là cấu trúc kết hợp vĩ tố danh từ hóa '-기' với tính từ '힘들다' (vất vả, mệt mỏi, khó khăn). Cấu trúc này dùng để diễn đạt rằng một hành động nào đó đòi hỏi nhiều sức lực, năng lượng hoặc nỗ lực tinh thần để hoàn thành, tạo cảm giác mệt nhọc hoặc khó lòng xoay sở. Ngoài ra, nó cũng có thể mang ý nghĩa khách quan rằng một việc gì đó 'khó lòng xảy ra' hoặc 'rất khó thực hiện' trong hoàn cảnh hiện tại.",
    "formation": "Thân động từ + -기 힘들다",
    "examples": [
      {
        "translation": "Thật khó để thức dậy vào sáng nay, bởi vì đêm qua tôi đã đi ngủ quá muộn."
      },
      {
        "translation": "Tôi từng nghĩ rằng việc học tiếng Anh thật là gian nan, nhưng nhờ chăm chỉ học mỗi ngày nên tôi đã dần quen thuộc hơn."
      },
      {
        "translation": "Duy trì sức khỏe tốt là điều không hề dễ dàng, nhưng nếu chịu khó tập thể dục đều đặn và ăn uống đầy đủ thì hoàn toàn có thể làm được."
      },
      {
        "translation": "Lần đầu học tiếng Hàn, tôi thấy rất vất vả trong việc ghi nhớ các mặt chữ. Thế nhưng cứ luyện tập liên tục thì dần dần mọi thứ lại trở nên dễ dàng hơn."
      }
    ]
  },
  "ko_는_79": {
    "title": "-는 김에 / -(으)ㄴ 김에 (Tiện thể..., nhân tiện...)",
    "shortExplanation": "Cấu trúc diễn tả việc nhân cơ hội hoặc tiện thể đang thực hiện một hành động nào đó thì làm thêm luôn một hành động khác ('tiện thể...', 'nhân tiện...').",
    "longExplanation": "'-는 김에' (hoặc dạng quá khứ '-(으)ㄴ 김에') kết hợp định ngữ '-는' hoặc '-(으)ㄴ' với danh từ phụ thuộc '김' (dịp, cơ hội, đà) và trợ từ vị trí '-에'. Cấu trúc này dùng khi người nói tận dụng thời cơ, điều kiện thuận lợi hoặc đà đang thực hiện hành động ở vế trước để tiện thể làm luôn một việc khác ở vế sau nhằm tiết kiệm công sức hoặc thời gian. Tương đương với 'tiện thể', 'nhân tiện', 'nhân dịp' trong tiếng Việt.",
    "formation": "Thân động từ + -는 김에 (thì hiện tại) | Thân động từ + -(으)ㄴ 김에 (thì quá khứ/đã xảy ra: có phụ âm cuối dùng -은 김에, nguyên âm hoặc phụ âm ㄹ dùng -ㄴ 김에)",
    "examples": [
      {
        "translation": "Tiện lúc tôi đang đọc sách, tôi đã nghe thấy tiếng con trai gọi mình."
      },
      {
        "translation": "Tiện thể lúc đang ăn cơm, con xem tivi luôn có được không ạ?"
      },
      {
        "translation": "Anh ấy tiện lúc đang chạy bộ đã cắn móng tay."
      },
      {
        "translation": "Tôi nhân tiện lúc đang tắm vòi sen thì đã cất tiếng hát luôn."
      }
    ]
  },
  "ko_기_80": {
    "title": "~기 시작하다 (Bắt đầu làm gì, bắt đầu...)",
    "shortExplanation": "Cấu trúc biểu thị sự bắt đầu của một hành động hoặc sự khởi phát, chuyển biến của một trạng thái mới ('bắt đầu làm gì', 'bắt đầu...').",
    "longExplanation": "'~기 시작하다' được tạo thành bằng cách kết hợp vĩ tố danh từ hóa '-기' với động từ '시작하다' (bắt đầu). Cấu trúc này dùng để diễn tả thời điểm một hành động bắt đầu được tiến hành hoặc một trạng thái tâm lý, tự nhiên bắt đầu nảy sinh và tiếp diễn. Thường kết hợp với các động từ hành động hoặc tính từ/động từ chỉ sự thay đổi trạng thái.",
    "formation": "Thân động từ/tính từ + 기 시작하다",
    "examples": [
      {
        "translation": "Vì công ty bắt đầu nảy sinh nhiều vấn đề nên nhiều người cũng bắt đầu cảm thấy khó chịu, bực bội."
      },
      {
        "translation": "Khi mùa xuân thực sự bắt đầu, những bông hoa cũng bắt đầu nở rộ."
      },
      {
        "translation": "Tôi bắt đầu cảm thấy đói bụng hơn hẳn so với ngày thường."
      },
      {
        "translation": "Chúng tôi dần nhận ra rằng các lỗi đã bắt đầu phát sinh."
      }
    ]
  },
  "ko_남다_81": {
    "title": "~남다 (Còn lại, thừa lại, đọng lại)",
    "shortExplanation": "Động từ biểu thị phần còn tồn tại, thừa lại về số lượng, thời gian vật chất hoặc lưu lại về mặt cảm xúc, ký ức sau khi đã sử dụng, tiêu hao ('còn lại', 'đọng lại').",
    "longExplanation": "'~남다' là tự động từ dùng để chỉ sự vật, thời gian, tiền bạc, đồ ăn... vẫn còn lại sau khi phần lớn đã được tiêu thụ, sử dụng hay loại bỏ. Ngoài ra, từ này còn được dùng theo nghĩa trừu tượng, diễn tả những cảm xúc sâu lắng (nỗi nhớ, sự tiếc nuối), kỷ niệm hay dấu ấn vẫn còn đọng lại trong tâm trí sau khi một sự kiện kết thúc.",
    "formation": "Danh từ + 이/가 + 남다 | Danh từ + 만 + 남다",
    "examples": [
      {
        "translation": "Tôi cũng rất muốn học bài, nhưng hầu như chẳng còn lại chút thời gian nào để chuẩn bị cho kỳ thi cả."
      },
      {
        "translation": "Sau khi tất cả khách mời dự đám cưới đến đông đủ thì đồ ăn vẫn còn thừa lại rất nhiều."
      },
      {
        "translation": "Sau khi chúng tôi đi dạo quanh bờ hồ xong thì chẳng còn điểm tham quan nào để xem nữa."
      },
      {
        "translation": "Sau khi cô ấy rời đi, trong đêm đầu tiên của sự chia ly chỉ còn đọng lại nỗi nhớ khôn nguôi."
      }
    ]
  },
  "ko_네요_82": {
    "title": "~네요 (Thế nhỉ, quá nhỉ, kìa...)",
    "shortExplanation": "Vĩ tố kết thúc câu thể hiện sự ngạc nhiên, cảm thán hoặc nhận định trước một sự thật mới được phát hiện hay trải nghiệm trực tiếp ('thế nhỉ', 'quá nhỉ').",
    "longExplanation": "'~네요' là vĩ tố kết thúc câu thân mật lịch sự (thể 해요) dùng khi người nói trực tiếp trải nghiệm, nhìn thấy hoặc mới phát hiện ra một sự thật mới mẻ, bất ngờ khác với suy nghĩ trước đó. Mang sắc thái cảm thán nhẹ nhàng, tự nhiên ('ơ...', 'hóa ra là...'). Có thể dùng với động từ, tính từ và trợ từ chỉ định từ '이다'.",
    "formation": "Thân động từ/tính từ + 네요 | Danh từ + (이)네요",
    "examples": [
      {
        "translation": "Hôm nay thời tiết ấm áp thật đấy nhỉ, thế mà buổi sáng tôi cứ nghĩ là trời lạnh."
      },
      {
        "translation": "Cô ấy hát hay thật đấy nhỉ, trước giờ tôi chưa từng nghe cô ấy hát nên không biết."
      },
      {
        "translation": "Oa, chiếc bánh kem này ngon quá đi thôi, đây là hương vị lần đầu tiên tôi được thưởng thức đấy."
      },
      {
        "translation": "Ơ, trời đang mưa kìa, đáng lẽ tôi phải mang theo ô mới phải."
      }
    ]
  },
  "ko_다고_83": {
    "title": "~다고 (Rằng..., nói là..., nghĩ là...)",
    "shortExplanation": "Vĩ tố liên kết trích dẫn gián tiếp, dùng để thuật lại lời nói, suy nghĩ, cảm nhận của bản thân hoặc người khác ('nói rằng', 'nghĩ rằng').",
    "longExplanation": "'~다고' là hình thức rút gọn của vĩ tố trích dẫn gián tiếp câu trần thuật '~다고 하다/말하다/생각하다/듣다...'. Dùng để truyền đạt lại lời tuyên bố, nhận định, suy nghĩ hoặc cảm xúc của ai đó một cách gián tiếp. Tùy theo thì và từ loại đi trước mà có sự kết hợp cụ thể (động từ thì hiện tại dùng -ㄴ/는다고, tính từ dùng -다고, quá khứ dùng -았/었다고, danh từ dùng -(이)라고).",
    "formation": "Động từ hiện tại + -ㄴ/는다고 | Tính từ + -다고 | Quá khứ + -았/었다고 | Danh từ + -(이)라고 + (말하다/생각하다/하다...)",
    "examples": [
      {
        "translation": "Anh ấy nghĩ rằng tôi đã ăn cơm rồi, nhưng thực ra tôi vẫn chưa ăn gì cả."
      },
      {
        "translation": "Bạn tôi nói rằng hôm nay trời sẽ mưa, nên tôi đã mang theo một chiếc ô."
      },
      {
        "translation": "Thầy giáo nói rằng bài thi sẽ rất khó, vì thế tôi đã học tập vô cùng chăm chỉ."
      },
      {
        "translation": "Mẹ đã dặn tôi rằng tối nay không được về nhà muộn."
      }
    ]
  },
  "ko_다는_84": {
    "title": "~다는 (Cái việc rằng..., tin tức rằng...)",
    "shortExplanation": "Vĩ tố định ngữ trích dẫn gián tiếp, dùng để bổ nghĩa cho danh từ phía sau bằng nội dung của một lời nói, sự thật hay thông tin được nghe thấy ('rằng...', 'việc rằng...').",
    "longExplanation": "'~다는' là dạng rút gọn của '~다고 하는', làm chức năng định ngữ trích dẫn gián tiếp. Cấu trúc này dùng để bổ nghĩa cho các danh từ trừu tượng phía sau như '사실' (sự thật), '소식' (tin tức), '이야기' (câu chuyện), '소문' (tin đồn), '생각' (suy nghĩ)... nhằm nêu rõ nội dung cụ thể của sự việc, tin tức đó. Động từ thì hiện tại kết hợp với '-ㄴ/는다는', tính từ đi với '-다는', quá khứ đi với '-았/었다는', danh từ đi với '-(이)라는'.",
    "formation": "Động từ hiện tại + -ㄴ/는다는 | Tính từ + -다는 | Quá khứ + -았/었다는 + Danh từ (사실, 소식, 생각...)",
    "examples": [
      {
        "translation": "Anh ấy không biết rằng việc tự thừa nhận sai lầm của bản thân khó khăn đến mức nào đâu."
      },
      {
        "translation": "Lần đầu tiên tôi nhận ra một sự thật rằng bản thân mình đang yêu cô ấy."
      },
      {
        "translation": "Tôi đã nghe tin tức rằng công ty của bạn Puppy đang mở rộng quy mô một cách nghiêm túc."
      },
      {
        "translation": "Sáng nay tôi vừa nghe được tin là cậu sắp kết hôn đấy."
      }
    ]
  },
  "ko_다면서요_85": {
    "title": "~다면서요 (Nghe nói là... đúng không?, nghe bảo là... phải không?)",
    "shortExplanation": "Vĩ tố kết thúc câu dùng để xác nhận lại với đối phương về một thông tin, tin tức mà mình đã nghe được từ người khác ('nghe nói là... đúng không?').",
    "longExplanation": "'~다면서요' được tạo thành từ vĩ tố trích dẫn gián tiếp '-다면서' kết hợp với trợ từ kính ngữ '요'. Cấu trúc này dùng khi người nói muốn kiểm chứng hoặc hỏi lại đối phương về một thông tin mà mình đã nghe đồn hoặc được người khác nói cho biết, mang sắc thái: 'Tôi nghe bảo là... có thực sự đúng như thế không?'. Động từ hiện tại dùng -ㄴ/는다면서요, tính từ dùng -다면서요, quá khứ dùng -았/었다면서요, danh từ dùng -(이)라면서요.",
    "formation": "Động từ hiện tại + -ㄴ/는다면서요 | Tính từ + -다면서요 | Quá khứ + -았/었다면서요 | Danh từ + -(이)라면서요",
    "examples": [
      {
        "translation": "Nghe nói Younghee đang sống ở Seoul đúng không, tôi thực sự không biết có đúng là như thế không nữa."
      },
      {
        "translation": "Nghe bảo là bạn nói sẽ về nhà sớm cơ mà, sao đến giờ này vẫn chưa thấy về vậy?"
      },
      {
        "translation": "Nghe nói ngày mai bạn không đến trường đúng không, có phải là bạn bị ốm rồi không?"
      },
      {
        "translation": "Nghe bảo là bạn đã hứa sau này sẽ cùng đi uống cà phê cơ mà, thế sao mãi chẳng thấy liên lạc gì vậy?"
      }
    ]
  },
  "ko_던데_86": {
    "title": "~던데 (Thấy bảo là..., thấy hồi đó..., mà...)",
    "shortExplanation": "Vĩ tố liên kết hồi tưởng, dùng khi người nói nhớ lại một sự việc, trạng thái mà bản thân đã trực tiếp chứng kiến hoặc trải nghiệm trong quá khứ để làm bối cảnh gợi mở câu chuyện hoặc nêu sự tương phản ('thấy bảo...', 'hồi đó thấy...').",
    "longExplanation": "'~던데' là sự kết hợp giữa vĩ tố hồi tưởng quá khứ '-더-' với vĩ tố liên kết gợi mở/tương phản '-ㄴ/은데'. Dùng khi người nói hồi tưởng lại một sự thật mà chính mắt mình đã thấy hoặc trải nghiệm trong quá khứ, đưa thông tin đó ra làm bối cảnh để hỏi han, đưa ra nhận xét, gợi ý hoặc chỉ ra sự đối lập giữa quá khứ và hiện tại.",
    "formation": "Thân động từ/tính từ + 던데 | Quá khứ + -았/었던데",
    "examples": [
      {
        "translation": "Tôi nhớ anh ấy lúc nào cũng để tóc dài cơ mà, anh ấy bắt đầu cắt tóc ngắn từ bao giờ thế?"
      },
      {
        "translation": "Bạn tôi trước đây thấy ghét rau lắm cơ mà, giờ nghe bảo vì sức khỏe nên chăm chỉ ăn lắm rồi đấy."
      },
      {
        "translation": "Hồi nhỏ tôi nhớ mình cực kỳ ghét dọn dẹp, nhưng giờ lại thích và ngày nào cũng dọn."
      },
      {
        "translation": "Hồi nhỏ nhớ chúng mình hay học cùng nhau lắm, thế mà giờ mỗi đứa lại học một trường đại học khác nhau."
      }
    ]
  },
  "ko_도록_87": {
    "title": "~도록 하다 (Hãy làm sao cho..., cố gắng để..., đảm bảo...)",
    "shortExplanation": "Cấu trúc biểu thị sự chỉ thị, khuyên nhủ hoặc quyết tâm thực hiện một hành động nào đó nhằm đảm bảo đạt được một mục đích hay trạng thái nhất định ('cố gắng để', 'hãy làm sao cho').",
    "longExplanation": "'~도록 하다' kết hợp giữa vĩ tố liên kết chỉ mục đích, mức độ '-도록' với trợ động từ '하다'. Cấu trúc này có hai sắc thái chính: khi dùng cho ngôi thứ nhất, nó thể hiện quyết tâm, sự nỗ lực làm một việc gì đó để đạt mục đích; khi dùng ở dạng mệnh lệnh, yêu cầu đối với ngôi thứ hai, nó là cách khuyên nhủ, giao nhiệm vụ hoặc yêu cầu một cách trang trọng, gián tiếp ('hãy chú ý làm sao cho...').",
    "formation": "Thân động từ + 도록 하다",
    "examples": [
      {
        "translation": "Chúng ta phải làm sao để nhân viên của mình được nghỉ ngơi đầy đủ. Nếu không làm như vậy thì hiệu suất làm việc của họ có thể sẽ bị giảm sút."
      },
      {
        "translation": "Khi lên kế hoạch cho bữa tiệc sinh nhật, chúng ta phải đảm bảo mọi thứ diễn ra thật hoàn hảo. Dù sao thì đó cũng là ngày đặc biệt của bố mà."
      },
      {
        "translation": "Với tư cách là lớp trưởng, tôi phải đốc thúc để tất cả học sinh hoàn thành bài tập về nhà. Như vậy thì giáo viên sẽ không có lý do gì để phiền lòng về chúng tôi nữa."
      },
      {
        "translation": "Chúng ta phải nỗ lực hết mình để khách hàng hài lòng với sản phẩm của chúng ta. Có làm được như vậy thì công việc kinh doanh mới phát triển được."
      }
    ]
  },
  "ko_든지_88": {
    "title": "~든지 (Dù là... hay là..., bất kể... hay...)",
    "shortExplanation": "Vĩ tố liên kết diễn tả sự lựa chọn không giới hạn, biểu thị rằng dù chọn phương án nào trong số các lựa chọn thì kết quả cũng như nhau hoặc người nói không bận tâm ('dù... hay...').",
    "longExplanation": "'~든지' (thường được lặp lại thành '~든지 ~든지') là vĩ tố liên kết dùng để liệt kê hai hay nhiều hành động, trạng thái hoặc đối tượng lựa chọn mang tính tương đương. Thể hiện thái độ của người nói là tùy ý, không phân biệt đối xử và không câu nệ vào việc phương án nào được chọn lựa. Thường đi kèm với các từ để hỏi (như 언제든지 - bất cứ lúc nào, 누구든지 - bất cứ ai, 어디든지 - bất cứ nơi đâu). Cần tránh nhầm lẫn với vĩ tố hồi tưởng '-던지'.",
    "formation": "Thân động từ/tính từ + 든지 | Danh từ + (이)든지",
    "examples": [
      {
        "translation": "Dù bạn đi vào hay đi ra thì tôi cũng chẳng bận tâm đâu, điều quan trọng là công việc phải được tiếp tục."
      },
      {
        "translation": "Dù trời mưa hay trời nắng đẹp thì tôi vẫn luôn luôn ra ngoài đi dạo."
      },
      {
        "translation": "Dù bạn có hiểu hay không hiểu thì tôi vẫn sẽ tiếp tục giải thích."
      },
      {
        "translation": "Dù chú cún có sủa hay không sủa thì việc cất lời chào như thể đang trò chuyện cùng nó vẫn thật là tốt."
      }
    ]
  },
  "ko_라는_89": {
    "title": "~라는 것이다 (Có nghĩa là..., tức là việc...)",
    "shortExplanation": "Cấu trúc giải thích, định nghĩa dùng để diễn giải rõ bản chất, ý nghĩa hoặc hàm ý sâu xa của một tiền đề hay sự thật phía trước ('có nghĩa là...', 'tức là...').",
    "longExplanation": "'~라는 것이다' là cấu trúc kết hợp vĩ tố trích dẫn gián tiếp danh từ '-(이)라는' với danh từ phụ thuộc '것' và trợ từ chỉ định từ '이다'. Cấu trúc này thường đi sau mệnh đề chủ ngữ có dạng '-는다는 것은' để rút ra kết luận, giải thích bản chất, ý nghĩa hoặc sự tất yếu của một sự việc nào đó ('Việc A xảy ra có nghĩa là B...').",
    "formation": "Động từ hiện tại + -ㄴ/는다는 것이다 | Tính từ + -다는 것이다 | Danh từ + -(이)라는 것이다",
    "examples": [
      {
        "translation": "Việc cô ấy chụp ảnh có nghĩa là cô ấy rất yêu thích nhiếp ảnh."
      },
      {
        "translation": "Việc anh ấy luôn thức dậy sớm chứng tỏ anh ấy là một người thuộc tuýp người buổi sáng."
      },
      {
        "translation": "Việc lá cây chuyển sang màu vàng khi mùa thu tới tức là đặc trưng tiêu biểu của mùa thu."
      },
      {
        "translation": "Việc chúng ta đang gặp phải một vấn đề đồng nghĩa với việc chúng ta phải tìm cách giải quyết vấn đề đó."
      }
    ]
  },
  "ko_라도_90": {
    "title": "~라도 (Dù chỉ là..., ít nhất thì cũng...)",
    "shortExplanation": "Trợ từ biểu thị phương án thay thế tối thiểu hoặc sự nhượng bộ khi không có được lựa chọn lý tưởng nhất ('ít nhất thì cũng', 'dù chỉ là').",
    "longExplanation": "'~라도' là trợ từ mang ý nghĩa nhượng bộ, chỉ ra một phương án tuy không phải là tốt nhất nhưng vẫn có thể chấp nhận được như một sự lựa chọn tối thiểu trong hoàn cảnh hiện tại ('thôi thì ít nhất cũng...'). Dùng để xoa dịu lời đề nghị, thể hiện mong muốn tối thiểu hoặc đưa ra một phương án dự phòng khi điều kiện lý tưởng không được đáp ứng.",
    "formation": "Danh từ + (이)라도 (có phụ âm cuối dùng 이라도, không có phụ âm cuối dùng 라도)",
    "examples": [
      {
        "translation": "Tuy rằng việc đi bộ lên tận mặt trăng là bất khả thi, nhưng ít nhất chúng ta cũng hãy chụp lấy một tấm ảnh nào."
      },
      {
        "translation": "Anh ấy nói làm việc vất vả, nhưng chẳng lẽ chúng ta lại không giao cho anh ấy ít nhất một công việc gì đó sao?"
      },
      {
        "translation": "Lẽ ra ít nhất cô ấy cũng phải nói lời xin lỗi chứ nhỉ? Nếu làm vậy thì tình hình có lẽ đã khá hơn rồi."
      },
      {
        "translation": "Nếu bạn không định về nhà thì ít nhất cũng phải gọi điện báo một tiếng chứ?"
      }
    ]
  },
  "ko_러_91": {
    "title": "~러 / ~(으)러 (Để làm gì, đi/đến để...)",
    "shortExplanation": "Vĩ tố liên kết chỉ mục đích của hành động di chuyển, dùng kết hợp với các động từ chỉ sự di chuyển như 가다, 오다, 다니다 ('để làm gì').",
    "longExplanation": "'~(으)러' là vĩ tố liên kết chỉ mục đích trực tiếp của việc đi, đến hoặc di chuyển từ nơi này sang nơi khác. Luôn đi kèm với các động từ chỉ sự di chuyển như '가다' (đi), '오다' (đến), '다니다' (đi lại thường xuyên)... Thân động từ kết thúc bằng nguyên âm hoặc phụ âm ㄹ dùng '-러', kết thúc bằng các phụ âm khác dùng '-으러'.",
    "formation": "Thân động từ + -(으)러 (thân động từ có phụ âm cuối dùng -으러, không có phụ âm cuối hoặc có phụ âm cuối ㄹ dùng -러) + (가다/오다/다니다)",
    "examples": [
      {
        "translation": "Tôi đã đến Hàn Quốc để học tiếng Hàn."
      },
      {
        "translation": "Anh ấy đã đến hiệu sách để mua một quyển sách."
      },
      {
        "translation": "Mẹ đã vào bếp để chuẩn bị bữa tối cho cả nhà."
      },
      {
        "translation": "Tôi đã đến rạp chiếu phim để xem phim cùng với những người bạn."
      }
    ]
  },
  "ko_려고_92": {
    "title": "~려고 하다 / ~(으)려고 하다 (Định làm..., có ý định làm..., muốn...)",
    "shortExplanation": "Cấu trúc biểu thị ý định, kế hoạch hoặc sự toan tính làm một việc gì đó trong tương lai gần ('định làm', 'có ý định').",
    "longExplanation": "'~(으)려고 하다' được tạo thành bằng cách kết hợp vĩ tố liên kết chỉ ý định '-(으)려고' với động từ '하다'. Cấu trúc này dùng để diễn đạt ý chí, kế hoạch hoặc sự chuẩn bị hành động của chủ ngữ. Thường dùng cho các dự định sắp thực hiện, không khẳng định chắc chắn thành công nhưng phản ánh rõ ý muốn chủ quan của người nói. Thân động từ có phụ âm cuối dùng '-으려고 하다', không có phụ âm cuối hoặc có phụ âm cuối ㄹ dùng '-려고 하다'.",
    "formation": "Thân động từ + -(으)려고 하다 (có phụ âm cuối dùng -으려고 하다, không có phụ âm cuối hoặc có phụ âm cuối ㄹ dùng -려고 하다)",
    "examples": [
      {
        "translation": "Mỗi ngày tôi đều định học thêm 10 từ vựng mới, vì thế tôi đang rất nỗ lực để nâng cao năng lực tiếng Hàn của mình."
      },
      {
        "translation": "Dù ngay cả lúc ốm đau tôi cũng luôn cố gắng nở nụ cười, đó chính là phong cách sống của tôi."
      },
      {
        "translation": "Anh ấy lúc nào cũng định đi ngủ sớm, thế nhưng lần nào cũng thất bại."
      },
      {
        "translation": "Chúng tôi đã cùng nhau luyện tập và học tập thật chăm chỉ để định kết thúc buổi biểu diễn một cách thành công mỹ mãn."
      }
    ]
  },
  "ko_려는_93": {
    "title": "~려는 / ~(으)려는 (Định làm..., có ý định làm... [định ngữ])",
    "shortExplanation": "Vĩ tố định ngữ chỉ ý định, dùng để bổ nghĩa cho danh từ phía sau bằng một hành động mà chủ ngữ đang toan tính hoặc có kế hoạch thực hiện ('người định...', 'việc toan tính...').",
    "longExplanation": "'~(으)려는' là hình thức rút gọn của cấu trúc định ngữ chỉ ý định '-(으)려고 하는'. Vĩ tố này đứng trước danh từ (như '사람' - người, '것' - việc/điều, '학생' - học sinh...) để miêu tả đối tượng đang ấp ủ ý muốn, mục đích hay kế hoạch thực hiện một hành động nào đó trong tương lai. Thân động từ có phụ âm cuối dùng '-으려는', không có phụ âm cuối hoặc có phụ âm cuối ㄹ dùng '-려는'.",
    "formation": "Thân động từ + -(으)려는 (có phụ âm cuối dùng -으려는, không có phụ âm cuối hoặc có phụ âm cuối ㄹ dùng -려는) + Danh từ",
    "examples": [
      {
        "translation": "Người có ý định đi công tác vào ngày mai chỉ có duy nhất mình tôi thôi. Tất cả những người khác đều rất bận."
      },
      {
        "translation": "Có rất nhiều người đang có ý định trở thành người ăn chay để có được một chế độ ăn uống lành mạnh."
      },
      {
        "translation": "Những học sinh có kế hoạch chuẩn bị cho kỳ thi TOEIC đang đầu tư rất nhiều thời gian vào việc học."
      },
      {
        "translation": "Kế hoạch cuối tuần của tôi là định học lập trình, nhưng việc này đòi hỏi nhiều thời gian và công sức hơn bình thường."
      }
    ]
  },
  "ko_로써_94": {
    "title": "~로써 / ~(으)로써 (Bằng..., bằng cách..., với tư cách là...)",
    "shortExplanation": "Trợ từ biểu thị công cụ, phương tiện, phương thức hành động ('bằng', 'bằng phương tiện'); trong khẩu ngữ cũng thường được người bản xứ dùng tương tự như tư cách, cương vị ('với tư cách là').",
    "longExplanation": "'~(으)로써' là trợ từ chỉ công cụ, phương tiện hoặc phương thức để tiến hành một việc gì đó (như 'bằng nỗ lực', 'bằng lời nói'). Cần lưu ý rằng theo chuẩn ngữ pháp tiếng Hàn, trợ từ chỉ tư cách, thân phận, cương vị của con người là '~로서', tuy nhiên trong đời sống và khẩu ngữ thực tế, người bản xứ rất hay viết nhầm hoặc dùng lẫn lộn dạng '~로써' khi diễn đạt tư cách (như 'với tư cách học sinh', 'với tư cách là lãnh đạo'). Danh từ kết thúc bằng nguyên âm hoặc phụ âm ㄹ dùng '-로써', kết thúc bằng các phụ âm khác dùng '-으로써'.",
    "formation": "Danh từ + -(으)로써 (danh từ có phụ âm cuối dùng -으로써, không có phụ âm cuối hoặc có phụ âm cuối ㄹ dùng -로써)",
    "examples": [
      {
        "translation": "Với tư cách là một học sinh, tôi đã hiểu hết tất cả những điều mà thầy giáo đã giảng dạy."
      },
      {
        "translation": "Với tư cách là một nghệ sĩ vĩ cầm, cô ấy đã nhận được sự công nhận trên toàn thế giới."
      },
      {
        "translation": "Với tư cách là một kỹ sư, tôi hoàn toàn có thể giải quyết được vấn đề này."
      },
      {
        "translation": "Với tư cách là một người lãnh đạo, anh ấy đang dẫn dắt đội ngũ của mình rất xuất sắc."
      }
    ]
  },
  "ko_를_95": {
    "title": "~을/를 바탕으로 (Dựa trên..., lấy... làm nền tảng/cơ sở)",
    "shortExplanation": "Cấu trúc biểu thị việc lấy một sự thật, số liệu, kinh nghiệm hay nền tảng nào đó làm cơ sở để tiến hành hành động, đưa ra quyết định hoặc sáng tạo ra cái mới ('dựa trên...', 'lấy... làm nền tảng').",
    "longExplanation": "'~을/를 바탕으로' được cấu tạo từ danh từ '바탕' (nền tảng, cơ sở), tiểu từ tân ngữ '을/를' và tiểu từ phương cách '으로'. Cấu trúc này dùng để biểu thị rằng một hành vi, quyết định, nghiên cứu hay sáng tác nghệ thuật được xây dựng hoặc nảy sinh dựa trên một nền tảng thực tế, dữ liệu, kiến thức hay trải nghiệm nhất định. Danh từ kết thúc bằng nguyên âm đi với '를 바탕으로', kết thúc bằng phụ âm đi với '을 바탕으로'. Thường xuất hiện trong văn viết, báo cáo học thuật hoặc ngữ cảnh trang trọng.",
    "formation": "Danh từ + 을/를 바탕으로 (danh từ có phụ âm cuối dùng 을 바탕으로, không có phụ âm cuối dùng 를 바탕으로)",
    "examples": [
      {
        "translation": "Chúng tôi đang phát triển loại thuốc mới dựa trên kết quả nghiên cứu."
      },
      {
        "translation": "Tôi đang lên kế hoạch cho tương lai của mình dựa trên những kinh nghiệm đã có."
      },
      {
        "translation": "Ý tưởng này được hình thành dựa trên các sự thật mang tính khoa học."
      },
      {
        "translation": "Chúng ta có thể thảo luận trong cuộc họp dựa trên ý kiến của bạn được không?"
      }
    ]
  },
  "ko_를_96": {
    "title": "~을/를 통해 (Thông qua..., qua..., nhờ vào...)",
    "shortExplanation": "Dùng để biểu thị phương tiện, môi giới, con đường hoặc cách thức mà nhờ đó một hành động được thực hiện hay một mục tiêu được hoàn thành ('thông qua...', 'nhờ...').",
    "longExplanation": "'~을/를 통해' (hoặc dạng đầy đủ hơn là '~을/를 통해서') được tạo thành từ động từ '통하다' (thông qua, xuyên qua) và tiểu từ tân ngữ '을/를'. Cấu trúc này diễn tả việc lấy một người, vật, phương tiện truyền thông hoặc quá trình làm cầu nối trung gian, con đường hay phương thức để đạt được kết quả, học hỏi tri thức hoặc truyền tải thông tin. Danh từ có phụ âm cuối đi với '을 통해', không có phụ âm cuối đi với '를 통해'.",
    "formation": "Danh từ + 을/를 통해(서) (danh từ có phụ âm cuối dùng 을 통해, không có phụ âm cuối dùng 를 통해)",
    "examples": [
      {
        "translation": "Tôi có thể bày tỏ cảm xúc của mình thông qua âm nhạc."
      },
      {
        "translation": "Chúng tôi đã gửi tin nhắn này cho anh ấy qua email."
      },
      {
        "translation": "Các học sinh đã tiếp thu được kiến thức mới thông qua các thí nghiệm."
      },
      {
        "translation": "Cô ấy đã nâng cao kỹ năng vẽ tranh của mình nhờ vào sự chăm chỉ luyện tập."
      }
    ]
  },
  "ko_만큼_97": {
    "title": "~만큼 (Ngang bằng..., như..., bao nhiêu... bấy nhiêu...)",
    "shortExplanation": "Trợ từ và danh từ phụ thuộc dùng để biểu thị mức độ, số lượng hoặc trạng thái tương đương với một tiêu chuẩn quy chiếu nào đó ('như...', 'bằng...', 'bao nhiêu thì... bấy nhiêu').",
    "longExplanation": "'~만큼' có thể hoạt động như một trợ từ gắn trực tiếp sau danh từ, hoặc như một danh từ phụ thuộc kết hợp với định ngữ đứng trước (động từ/tính từ + -(으)ㄴ/는/(으)ㄹ). Cấu trúc này dùng để so sánh ngang bằng, biểu thị rằng mức độ, quy mô, số lượng hay phẩm chất của sự việc đạt đến mức tương đương với đối tượng làm chuẩn. Ngoài ra khi đi với dạng định ngữ, nó còn diễn tả quan hệ nguyên nhân - kết quả tỉ lệ thuận: 'làm bao nhiêu thì nhận/biết bấy nhiêu'.",
    "formation": "Danh từ + 만큼 | Thân động từ/tính từ + -(으)ㄴ/는/(으)ㄹ 만큼",
    "examples": [
      {
        "translation": "Anh ấy làm việc không chăm chỉ bằng bạn của mình, vì thế thành quả đạt được luôn rất ít ỏi."
      },
      {
        "translation": "Tôi dạy học tương xứng với những gì mình đã học được, nên tôi có thể truyền đạt cho người khác mọi điều mà mình biết."
      },
      {
        "translation": "Chúng tôi đang nỗ lực hết sức trong khả năng có thể của mình. Dù những người khác có làm tốt hơn thì chúng tôi cũng không hề lo lắng."
      },
      {
        "translation": "Đi du lịch, tôi đã ngắm nhìn được nhiều cảnh đẹp nhất có thể. Nhờ vậy mà tôi đã tạo được rất nhiều kỷ niệm đẹp."
      }
    ]
  },
  "ko_마저_98": {
    "title": "~마저 (Ngay cả..., đến cả..., ngay đến...)",
    "shortExplanation": "Trợ từ hạn định biểu thị việc một đối tượng cuối cùng còn lại hoặc một điều không ngờ tới cũng bị gộp vào, mang sắc thái tiếc nuối hoặc bất ngờ ('ngay cả...', 'đến cả...').",
    "longExplanation": "'~마저' là trợ từ bổ trợ được gắn trực tiếp vào sau danh từ để biểu thị sự bao hàm của một đối tượng vốn không ai ngờ tới, hoặc là đối tượng cuối cùng còn sót lại cũng bị cuốn vào một tình huống tiêu cực. Thường mang sắc thái tâm lý thất vọng, tiếc nuối, ngạc nhiên hoặc bi quan của người nói (khác với '도' vốn trung tính hơn, và khác với '조차' vốn nhấn mạnh vào điều kiện tối thiểu).",
    "formation": "Danh từ + 마저",
    "examples": [
      {
        "translation": "Đề thi khó đến mức ngay cả Min-su, bạn học sinh giỏi nhất lớp chúng tôi, cũng làm sai."
      },
      {
        "translation": "Về đến nhà muộn thì thấy ngay cả mẹ cũng đã ngủ say mất rồi."
      },
      {
        "translation": "Hôm nay trời lạnh đến nỗi ngay cả con sư tử trong sở thú cũng trốn biệt tăm."
      },
      {
        "translation": "Cô ấy nổi tiếng đến mức ngay cả những người dân trong ngôi làng nhỏ bé này cũng đều biết đến cô."
      }
    ]
  },
  "ko_못하다_99": {
    "title": "~지 못하다 / ~못하다 (Không thể..., làm không tốt...)",
    "shortExplanation": "Cấu trúc phủ định năng lực hoặc tính khả thi do năng lực bản thân thiếu hụt hoặc hoàn cảnh khách quan cản trở ('không thể làm được', 'không thể').",
    "longExplanation": "'~못하다' là hình thức phủ định bất khả năng trong tiếng Hàn. Có thể đứng độc lập như một tính từ/động từ ('kém cỏi, dở'), hoặc kết hợp với thân động từ ở dạng phủ định dài '-지 못하다', hoặc dạng phủ định ngắn '못 + Động từ'. Cấu trúc này diễn tả việc chủ thể dù có ý muốn nhưng không đủ năng lực, điều kiện thể chất, hoặc bị hoàn cảnh bên ngoài cản trở dẫn đến việc không thể thực hiện được hành động.",
    "formation": "Thân động từ + -지 못하다 | 못 + Động từ",
    "examples": [
      {
        "translation": "Nói thật lòng thì tôi nói tiếng Hàn chưa tốt, nên tôi vẫn đang tiếp tục luyện tập."
      },
      {
        "translation": "Vì cơn mưa này mà tôi không thể tập thể dục được; mưa to quá làm mặt cỏ trơn trượt đến mức không di chuyển nổi."
      },
      {
        "translation": "Với tư cách là một lập trình viên web mà tôi lại không giải quyết được vấn đề này; vì kỹ năng lập trình còn non kém nên tôi chẳng thể hiểu nổi."
      },
      {
        "translation": "Anh ấy không thể bỏ được thuốc lá; vì quá thích hút thuốc nên có vẻ như anh ấy không thể dừng lại được."
      }
    ]
  },
  "ko_바라다_100": {
    "title": "~기(를) 바라다 (Mong rằng..., mong muốn..., hy vọng...)",
    "shortExplanation": "Cấu trúc biểu thị ước muốn, hy vọng hoặc lời đề nghị, kỳ vọng của người nói vào một kết quả tốt đẹp trong tương lai ('mong rằng...', 'hy vọng...').",
    "longExplanation": "'~기(를) 바라다' kết hợp vĩ tố danh từ hóa '-기' với tiểu từ tân ngữ '를' (có thể giản lược) và động từ '바라다' (mong muốn, hy vọng). Cấu trúc này dùng để diễn tả niềm hy vọng tha thiết hoặc nguyện vọng của người nói mong sao bản thân hoặc người khác đạt được một kết quả thuận lợi, khỏe mạnh, thành công trong tương lai. Ngoài ra, trong các thông báo công cộng hoặc thư tín trang trọng, dạng kính ngữ '-(으)시기 바랍니다' thường được dùng như một lời yêu cầu, đề nghị lịch sự.",
    "formation": "Thân động từ/tính từ + -기(를) 바라다",
    "examples": [
      {
        "translation": "Tôi mong rằng công việc kinh doanh của bạn sẽ thành công; tôi thực sự hy vọng những nỗ lực của bạn sẽ đơm hoa kết trái."
      },
      {
        "translation": "Tôi có thể thấu hiểu được tấm lòng của cha mẹ khi luôn mong cho tất cả chúng tôi được sống khỏe mạnh."
      },
      {
        "translation": "Giáo sư mong muốn tôi sẽ học tiếp lên cao học, thế nhưng tôi vẫn chưa chuẩn bị sẵn sàng."
      },
      {
        "translation": "Tôi hy vọng mình sẽ nói tiếng Hàn thật lưu loát, nhưng hiện tại vẫn còn rất nhiều điều phải học hỏi."
      }
    ]
  },
  "ko_밖에_101": {
    "title": "~밖에 (Chỉ..., ngoài... ra không có gì khác)",
    "shortExplanation": "Trợ từ hạn định kết hợp với vị từ phủ định phía sau, dùng để nhấn mạnh tính duy nhất và loại trừ mọi khả năng khác ('chỉ...', 'ngoài... ra thì không...').",
    "longExplanation": "'~밖에' là trợ từ mang ý nghĩa 'ngoài ra' được gắn trực tiếp vào danh từ và BẮT BUỘC phải đi cùng với các biểu hiện phủ định ở vế sau (như 없다, 모르다, 안/못 하다). Cấu trúc này nhấn mạnh rằng ngoài đối tượng hoặc phương án được nhắc đến thì tuyệt đối không còn bất kỳ lựa chọn, người hay sự vật nào khác. Khác với '만' (có thể đi với câu khẳng định mang nghĩa trung tính), '~밖에 + phủ định' nhấn mạnh tính hạn chế nghiêm ngặt hoặc cảm giác ít ỏi, bất đắc dĩ.",
    "formation": "Danh từ + 밖에 + Vị từ phủ định (없다, 모르다, 안/못 + Động từ, -지 않다/못하다)",
    "examples": [
      {
        "translation": "Tôi chỉ uống cà phê thôi, hoàn toàn không uống bất kỳ loại đồ uống nào khác."
      },
      {
        "translation": "Người duy nhất có thể giải quyết được vấn đề này chỉ có tôi thôi, những người khác hoàn toàn chẳng biết gì cả."
      },
      {
        "translation": "Anh ấy chỉ ăn thịt gà thôi nên không thể ăn các món khác được."
      },
      {
        "translation": "Vì đây là cơ hội cuối cùng còn lại duy nhất nên tôi phải học tập chăm chỉ hơn nữa."
      }
    ]
  },
  "ko_본_102": {
    "title": "~아/어 본 (Đã từng trải nghiệm..., từng thử qua... [dạng định ngữ])",
    "shortExplanation": "Dạng định ngữ quá khứ của cấu trúc '-아/어 보다', dùng để bổ nghĩa cho danh từ phía sau, diễn tả kinh nghiệm hoặc sự việc đã từng thử trải qua trong quá khứ ('đã từng...').",
    "longExplanation": "'~본' là sự kết hợp giữa cấu trúc thử nghiệm/kinh nghiệm '-아/어 보다' với vĩ tố định ngữ thì quá khứ '-(으)ㄴ'. Cấu trúc này đứng trước danh từ để bổ nghĩa cho danh từ đó, biểu thị người hoặc vật mang kinh nghiệm đã từng trải qua một hành động hay thử làm một việc gì đó trong quá khứ. Thường đi kèm với các danh từ như '사람' (người đã từng...), '일' (việc đã từng...), '경험' (kinh nghiệm đã từng...).",
    "formation": "Thân động từ + -아/어 본 (thân từ có nguyên âm ㅏ, ㅗ dùng -아 본; nguyên âm khác dùng -어 본; 하다 biến thành 해 본)",
    "examples": [
      {
        "translation": "Với tư cách là một người từng học tiếng Hàn, mục tiêu của tôi là giảng dạy ngữ pháp tiếng Hàn."
      },
      {
        "translation": "Tôi rất vui vì có nhiều bạn bè từng sống ở nước ngoài hơn tôi nghĩ."
      },
      {
        "translation": "Tôi vừa mua một chiếc áo khoác, và đây là lần đầu tiên tôi mặc thử kiểu áo khoác như thế này."
      },
      {
        "translation": "Nếu là người đã từng đến Hy Lạp, chắc chắn họ sẽ nói rằng Athens là thành phố nhất định phải ghé thăm."
      }
    ]
  },
  "ko_부터가_103": {
    "title": "~부터가 (Ngay từ..., bắt đầu từ...)",
    "shortExplanation": "Sự kết hợp giữa trợ từ khởi điểm '부터' và tiểu từ chủ ngữ '가', dùng để nhấn mạnh điểm bắt đầu hoặc yếu tố cốt lõi đầu tiên làm nảy sinh vấn đề ('ngay từ...', 'bắt đầu từ...').",
    "longExplanation": "'~부터가' kết hợp trợ từ '부터' (từ, bắt đầu từ) với tiểu từ chủ ngữ mang tính nhấn mạnh và chỉ định '가'. Cấu trúc này dùng để nhấn mạnh thời điểm xuất phát hoặc đối tượng/yếu tố đầu tiên mà tại đó một sự việc, khó khăn, thay đổi thực sự bắt đầu lộ diện. Thường dùng khi muốn làm nổi bật rằng ngay từ khâu đầu tiên, bước đầu tiên hay thời điểm xuất phát điểm đã có điều gì đó bất thường, khó khăn hoặc đáng chú ý.",
    "formation": "Danh từ + 부터가",
    "examples": [
      {
        "translation": "Sáng nào tôi cũng nghe giảng, nhưng bắt đầu từ hôm nay tôi mới cảm nhận được nỗi vất vả thực sự."
      },
      {
        "translation": "Tình yêu không phải bắt đầu ngay từ thuở ban đầu, mà bắt đầu từ khoảnh khắc hai người dần thấu hiểu lẫn nhau."
      },
      {
        "translation": "Công việc đó thì phải bắt đầu từ thứ Hai mới là lúc thực sự triển khai."
      },
      {
        "translation": "Kỳ nghỉ hè bắt đầu chính thức từ tuần sau, thế nhưng hiện tại tôi đã chuẩn bị sẵn sàng cả rồi."
      }
    ]
  },
  "ko_뿐이다_104": {
    "title": "~뿐이다 (Chỉ là..., chỉ có... mà thôi)",
    "shortExplanation": "Biểu thị sự giới hạn duy nhất, khẳng định rằng ngoài đối tượng hoặc trạng thái được nhắc đến thì không còn bất cứ điều gì khác ('chỉ có...', 'chỉ là... mà thôi').",
    "longExplanation": "'~뿐이다' kết hợp trợ từ/danh từ phụ thuộc hạn định '뿐' (chỉ, duy nhất) với trợ từ liên kết vị ngữ '이다'. Khi gắn sau danh từ (hoặc kết hợp với vĩ tố định ngữ -(으)ㄹ 뿐이다 sau động từ/tính từ), cấu trúc này biểu thị sự giới hạn tuyệt đối hoặc nhấn mạnh rằng không còn điều gì khác ngoài đối tượng đang được đề cập. Mang cảm giác đơn thuần, cô lập hoặc ít ỏi.",
    "formation": "Danh từ + 뿐이다 | Thân động từ/tính từ + -(으)ㄹ 뿐이다",
    "examples": [
      {
        "translation": "Hiện tại số tiền tôi có chỉ có năm nghìn won thôi. Vì thế không đủ để mua đồ ăn."
      },
      {
        "translation": "Bạn bè của tôi chỉ có mỗi mình cậu thôi. Vậy nên nếu cậu không giúp tôi thì tôi sẽ gặp rắc rối to mất."
      },
      {
        "translation": "Trong phòng chỉ có mỗi một chiếc ti vi. Ngoài ra không có bất kỳ đồ nội thất nào khác."
      },
      {
        "translation": "Trong số những người bạn của tôi, người duy nhất có thể lắng nghe câu chuyện của tôi chỉ có chị gái mà thôi."
      }
    ]
  },
  "ko_사이에서_105": {
    "title": "~사이에서 (Ở giữa..., trong số..., giữa hai bên...)",
    "shortExplanation": "Dùng để chỉ vị trí trung gian giữa hai địa điểm/đối tượng, hoặc sự phân vân, lựa chọn giữa các phương án, hay trong phạm vi một tập thể ('ở giữa...', 'trong số...').",
    "longExplanation": "'~사이에서' kết hợp danh từ '사이' (khoảng cách, giữa, mối quan hệ) với tiểu từ nơi chốn/nguồn gốc '에서'. Cấu trúc này dùng theo ba nghĩa chính: (1) chỉ vị trí không gian nằm giữa hai địa điểm cụ thể; (2) chỉ tình huống khó xử khi phải đắn đo lựa chọn giữa hai hay nhiều lựa chọn, quan điểm; (3) chỉ một hiện tượng, xu hướng đang diễn ra trong lòng một nhóm người hay cộng đồng (ví dụ: 'trong giới trẻ').",
    "formation": "Danh từ + 사이에서",
    "examples": [
      {
        "translation": "Nên chọn màu nào đây? Thật là một sự lựa chọn vô cùng khó khăn giữa màu xanh lam và màu đỏ."
      },
      {
        "translation": "Tôi đang tìm kiếm một quán cà phê nằm ở khoảng giữa Seongsu-dong và Đại học Konkuk."
      },
      {
        "translation": "Trong mùa hè năm nay, tôi phải đưa ra quyết định giữa hai lựa chọn: đi du lịch hay là ở nhà nghỉ ngơi."
      },
      {
        "translation": "Tôi đã phải chọn ra bộ phim mà mình yêu thích nhất trong độ tuổi từ 10 đến 15."
      }
    ]
  },
  "ko_서야_106": {
    "title": "~아/어서야 (Chỉ sau khi... mới..., phải... thì mới...)",
    "shortExplanation": "Vĩ tố liên kết nhấn mạnh rằng chỉ sau khi hoàn thành hành động phía trước thì hành động hay kết quả phía sau mới có thể xảy ra ('chỉ sau khi... mới...', 'phải... mới...').",
    "longExplanation": "'~아/어서야' (hay '~서야') là sự kết hợp giữa vĩ tố liên kết nguyên nhân, trình tự '-아/어서' với trợ từ nhấn mạnh điều kiện cốt lõi '-야'. Ngữ pháp này biểu thị rằng hành động ở mệnh đề trước là điều kiện tiên quyết bắt buộc; chỉ khi hành động đó diễn ra thì người nói mới nhận thức được sự việc hoặc kết quả phía sau mới xuất hiện (thường đi kèm với phó từ '비로소' - mới thực sự, mới bắt đầu). Ngoài ra còn dùng trong cấu trúc tu từ mang tính chê trách hoặc hoài nghi.",
    "formation": "Thân động từ/tính từ + -아/어서야 (thân từ có nguyên âm ㅏ, ㅗ dùng -아서야; nguyên âm khác dùng -어서야; 하다 biến thành 해서야)",
    "examples": [
      {
        "translation": "Phải học hành chăm chỉ thì mới có thể đạt được điểm cao trong kỳ thi."
      },
      {
        "translation": "Tôi phải về đến nhà uống một cốc cà phê thì mới có thể làm việc được."
      },
      {
        "translation": "Chỉ sau khi bước tới giảng đường, cô ấy mới nhận ra rằng mình sẽ phải lên biểu diễn."
      },
      {
        "translation": "Sau khi gọi điện cho bố mẹ thì tôi mới biết về vụ tai nạn đã xảy ra vào ngày hôm qua."
      }
    ]
  },
  "ko_소서_107": {
    "title": "~소서 (Kính xin..., thứ lỗi cho... [kính ngữ cổ trang / khẩn cầu, tạ lỗi])",
    "shortExplanation": "Vĩ tố kết thúc câu cổ xưa mang sắc thái cực kính, dùng để khẩn cầu, cầu nguyện thành kính hoặc cúi đầu tạ lỗi với bề trên ('kính xin...', 'xin tha thứ...').",
    "longExplanation": "'~소서' là vĩ tố kết thúc câu thuộc thể kính ngữ cao nhất trong lịch sử tiếng Hàn ('hạ sách thể' / 하소서체), chuyên dùng để hướng lên đấng tối cao, thần linh, vua chúa hoặc bậc trưởng bối để bày tỏ lời khẩn cầu tha thiết, lời nguyện cầu hoặc tạ lỗi sâu sắc. Trong ngữ cảnh xin lỗi và các câu ví dụ, cấu trúc này diễn tả tâm thế cúi mình chân thành tạ tội trước đối phương vì những sơ suất, thất lễ của bản thân.",
    "formation": "Thân động từ + -소서 (dạng quá khứ: Thân động từ + -았/었/였- + 소서)",
    "examples": [
      {
        "translation": "Ta đã khiến nàng phải khổ sở trăm bề, thứ lỗi cho ta, giờ đây nàng hãy đi tìm một người khác tốt hơn ta đi."
      },
      {
        "translation": "Tôi đã trót quên khuấy mất công việc, thứ lỗi cho tôi, vì quá bận rộn nên quả thực tôi đã không tài nào nhớ ra nổi."
      },
      {
        "translation": "Khi đó quả thực tôi đã gửi nhầm lời lẽ, kính xin thứ lỗi, tôi thực sự vô cùng xin lỗi."
      },
      {
        "translation": "Tôi đã đến quá trễ, kính xin lượng thứ, từ giờ phút này tôi sẽ làm thật nhanh chóng."
      }
    ]
  },
  "ko_않게_108": {
    "title": "~지 않게 (Để không..., sao cho không..., đừng để...)",
    "shortExplanation": "Dạng phó từ hóa kết hợp vĩ tố phủ định, dùng để biểu thị mục đích nhằm ngăn ngừa, phòng tránh một sự việc hay trạng thái bất lợi không mong muốn xảy ra ('để không...', 'sao cho không...').",
    "longExplanation": "'~않게' (hay đầy đủ là '-지 않게') là cấu trúc phủ định phó từ hóa, được tạo thành từ vĩ tố bổ trợ phủ định '-지 않다' kết hợp với vĩ tố liên kết phó từ hóa '-게'. Cấu trúc này làm trạng ngữ bổ nghĩa cho động từ hành động theo sau, diễn tả mục đích hoặc tiêu chuẩn hành động của người nói: hành động một cách cẩn trọng nhằm phòng ngừa, ngăn không cho một sự cố, rắc rối hoặc trạng thái tiêu cực nào xảy ra.",
    "formation": "Thân động từ/tính từ + -지 않게",
    "examples": [
      {
        "translation": "Hãy chuẩn bị trước để không phát sinh bất kỳ vấn đề trục trặc nào."
      },
      {
        "translation": "Chúng ta cần phải tuân thủ giờ giấc thật chính xác sao cho không ai bị bối rối, lúng túng."
      },
      {
        "translation": "Nếu muốn đến trường học mà không bị muộn thì bạn phải xuất phát từ sớm."
      },
      {
        "translation": "Để cẩn thận không làm cho bản thân bị thương thì bạn cần phải tuân thủ các chỉ dẫn an toàn."
      }
    ]
  },
  "ko_아어_109": {
    "title": "~아/어 버리다 (...mất rồi, xong xuôi, lỡ... [hoàn tất trọn vẹn / tiếc nuối])",
    "shortExplanation": "Biểu thị một hành động đã được thực hiện triệt để, kết thúc hoàn toàn, thường mang sắc thái cảm xúc trút bỏ nhẹ nhõm hoặc tiếc nuối, ngỡ ngàng ('...mất rồi', 'lỡ...').",
    "longExplanation": "'~아/어 버리다' là sự kết hợp giữa vĩ tố liên kết '-아/어' với trợ động từ '버리다' (vứt bỏ, hoàn toàn). Cấu trúc này dùng sau thân động từ để nhấn mạnh rằng hành động đã được giải quyết hoặc tiến hành đến bước cuối cùng, không còn vương lại điều gì. Tùy thuộc vào ngữ cảnh, nó truyền tải hai sắc thái tâm lý trái ngược: hoặc là sự nhẹ nhõm, sảng khoái khi đã xử lý xong một gánh nặng, hoặc là nỗi tiếc nuối, thở dài vì một việc không mong muốn đã lỡ xảy ra mất rồi.",
    "formation": "Thân động từ + -아/어 버리다 (thân từ có nguyên âm ㅏ, ㅗ dùng -아 버리다; nguyên âm khác dùng -어 버리다; 하다 biến thành 해 버리다)",
    "examples": [
      {
        "translation": "Tôi đã bất ngờ làm xong tấm thiệp Valentine trong nháy mắt, và cảm thấy vô cùng hài lòng."
      },
      {
        "translation": "Sau một hồi chờ đợi dọn dẹp phòng khách, rốt cuộc tôi đã tự mình dọn dẹp sạch sẽ hết luôn rồi."
      },
      {
        "translation": "Vì quá thích thịt lợn nên tôi đã ăn sạch sẽ một mạch hết luôn."
      },
      {
        "translation": "Vì trêu đùa quá trớn nên lo sợ bạn mình sẽ tủi thân, cuối cùng tôi đã buột miệng xin lỗi mất rồi."
      }
    ]
  },
  "ko_아어_110": {
    "title": "~아/어 놓다 (Làm sẵn, làm trước để đó, duy trì trạng thái)",
    "shortExplanation": "Cấu trúc bổ trợ biểu thị việc thực hiện trước một hành động nào đó để chuẩn bị cho tương lai, hoặc duy trì trạng thái kết quả của hành động đó sau khi hoàn thành ('làm sẵn...', 'làm xong để đó').",
    "longExplanation": "'~아/어 놓다' là cấu trúc kết hợp giữa vĩ tố liên kết '-아/어' với trợ động từ '놓다' (đặt, để). Cấu trúc này dùng để diễn đạt: 1) Hành động đã được thực hiện từ trước nhằm chuẩn bị, dự phòng cho một kế hoạch, tình huống trong tương lai; 2) Hành động đã hoàn tất và kết quả hay trạng thái của nó tiếp tục được duy trì, lưu giữ nguyên vẹn. Thường đi kèm với phó từ '미리' (trước) để nhấn mạnh sự chuẩn bị trước.",
    "formation": "Thân động từ + -아/어 놓다 (nguyên âm ㅏ, ㅗ dùng -아 놓다; các nguyên âm khác dùng -어 놓다; 하다 chuyển thành 해 놓다)",
    "examples": [
      {
        "translation": "Nghĩ rằng sáng mai sẽ bận rộn nên tối nay tôi đã làm sẵn bữa sáng rồi."
      },
      {
        "translation": "Để chuẩn bị cho kỳ thi, trong tuần này tôi đã viết sẵn tất cả các ghi chú bài giảng."
      },
      {
        "translation": "Trước khi đi nghỉ mát, chúng tôi đã dọn dẹp nhà cửa sẵn sàng rồi."
      },
      {
        "translation": "Hôm nay bạn bè sẽ đến chơi nên tôi sẽ nấu sẵn thức ăn từ trước."
      }
    ]
  },
  "ko_아어_111": {
    "title": "~아/어 달라다 / ~아/어 달라고 하다 (Yêu cầu làm cho mình, xin hãy làm giúp cho...)",
    "shortExplanation": "Hình thức trích dẫn gián tiếp khi chuyển tiếp lời thỉnh cầu, yêu cầu ai đó làm một hành động nào đó có lợi cho chính người nói ('xin hãy làm cho tôi', 'nhờ làm giúp').",
    "longExplanation": "'~아/어 달라다' là dạng biến đổi đặc biệt của động từ '주다' trong câu gián tiếp khi người nói trích dẫn lại lời yêu cầu của mình hoặc của người khác muốn đối phương làm điều gì đó phục vụ cho bản thân người đưa ra yêu cầu (thường xuất hiện dưới dạng '-아/어 달라고 하다/부탁하다/요청하다'). Nếu hành động nhằm phục vụ người thứ ba thì dùng '-아/어 주라고 하다', còn nếu phục vụ chính người yêu cầu thì bắt buộc chuyển thành '-아/어 달라다'.",
    "formation": "Thân động từ + -아/어 달라다 (-아/어 달라고 하다/부탁하다/말하다)",
    "examples": [
      {
        "translation": "Bạn tôi rất đói bụng nên đã nói rằng 'Hãy mau lấy cơm cho tôi ăn với'."
      },
      {
        "translation": "Tôi bị đau đầu dữ dội nên đã nhờ người ta cho tôi xin ít thuốc giảm đau."
      },
      {
        "translation": "Trong nhà nóng quá nên tôi đã nhờ người bật giúp điều hòa lên."
      },
      {
        "translation": "Cà phê ngon quá nên tôi đã xin người ta cho thêm một ly nữa."
      }
    ]
  },
  "ko_아어_112": {
    "title": "~아/어 대다 (Cứ liên tục..., làm tới tấp, mải miết...)",
    "shortExplanation": "Trợ động từ biểu thị một hành động được lặp đi lặp lại liên tục, dữ dội hoặc làm một cách không suy tính, vẩn vơ, thường mang sắc thái thái quá hoặc gây phiền toái ('cứ liên tục làm...', 'làm tới tấp').",
    "longExplanation": "'~아/어 대다' là cấu trúc kết hợp vĩ tố liên kết '-아/어' với trợ động từ '대다'. Nó diễn tả một hành động diễn ra liên tục, lặp đi lặp lại nhiều lần với cường độ mạnh mẽ, dồn dập, hoặc làm việc gì đó một cách tùy tiện, thiếu mục đích rõ ràng. Thường mang sắc thái tiêu cực, bực bội hoặc nhấn mạnh mức độ hành động diễn ra quá đà.",
    "formation": "Thân động từ + -아/어 대다 (nguyên âm ㅏ, ㅗ dùng -아 대다; các nguyên âm khác dùng -어 대다; 하다 chuyển thành 해 대다)",
    "examples": [
      {
        "translation": "Tôi cứ thế đi mua sắm bừa bãi mãi, rốt cuộc lại mua phải một bộ quần áo đắt đỏ."
      },
      {
        "translation": "Dù đang là kỳ thi nhưng anh ấy cứ nhìn chằm chằm vào trang sách vẩn vơ rồi để thời gian trôi qua hết."
      },
      {
        "translation": "Vừa nghe nhạc cô ấy vừa cứ thế rảo bước mãi trên phố để rồi đi lướt qua luôn cả quán ăn."
      },
      {
        "translation": "Vì buồn chán nên tôi cứ lướt mạng linh tinh mãi, rồi mua một cuốn sách từ trang web mà mình vô tình biết được."
      }
    ]
  },
  "ko_아어_113": {
    "title": "~아/어 보이다 (Trông có vẻ..., nhìn như...)",
    "shortExplanation": "Cấu trúc kết hợp với tính từ để biểu thị sự phán đoán hoặc cảm nhận của người nói dựa trên vẻ bề ngoài của đối tượng ('trông có vẻ...', 'nhìn có vẻ...').",
    "longExplanation": "'~아/어 보이다' kết hợp với thân tính từ để miêu tả ấn tượng, phán đoán của người nói dựa vào ngoại hình hoặc các biểu hiện bên ngoài của người hoặc sự vật. Nó không khẳng định bản chất thực sự của sự việc mà chỉ nêu lên cảm nhận thị giác hoặc cảm quan chủ quan ('trông có vẻ như thế, nhưng thực tế có thể không phải vậy').",
    "formation": "Thân tính từ + -아/어 보이다 (nguyên âm ㅏ, ㅗ dùng -아 보이다; các nguyên âm khác dùng -어 보이다; 하다 chuyển thành 해 보이다)",
    "examples": [
      {
        "translation": "Người phụ nữ đó trông có vẻ rất hạnh phúc, nhưng thực tế có lẽ đang phải chịu áp lực vô cùng lớn."
      },
      {
        "translation": "Hôm nay thời tiết trông đẹp quá nhỉ, có vẻ là một ngày rất tuyệt để ra ngoài."
      },
      {
        "translation": "Chiếc bánh ngọt này trông có vẻ ngọt sắc, nhưng thực tế thì không ngọt đến mức như vậy đâu."
      },
      {
        "translation": "Bạn tôi bảo trông tôi có vẻ mệt mỏi, thế nhưng bản thân tôi lại không hề cảm thấy như thế."
      }
    ]
  },
  "ko_아어_114": {
    "title": "~아/어서는 (Làm... thế mà, cứ ngỡ... nhưng lại...)",
    "shortExplanation": "Vĩ tố liên kết kết hợp trợ từ đối chiếu, diễn tả một hành động hay nguyên nhân phía trước dẫn đến một kết quả hoàn toàn trái ngược với kỳ vọng ('làm... thế mà lại...', 'cứ nghĩ... nhưng rốt cuộc...').",
    "longExplanation": "'~아/어서는' là sự kết hợp giữa vĩ tố liên kết chỉ nguyên nhân hoặc trình tự thời gian '-아/어서' với trợ từ đối chiếu, nhấn mạnh '-는'. Cấu trúc này dùng để đặt ra tiền đề là một hành động đã được tiến hành hoặc một lý do cụ thể ở mệnh đề trước, nhưng mệnh đề sau lại đưa ra một kết quả thực tế tương phản, bất ngờ hoặc trái ngược hẳn với mong đợi ban đầu. Thường mang sắc thái tiếc nuối, thất vọng hoặc phân trần.",
    "formation": "Thân động từ/tính từ + -아/어서는 (nguyên âm ㅏ, ㅗ dùng -아서는; các nguyên âm khác dùng -어서는; 하다 chuyển thành 해서는)",
    "examples": [
      {
        "translation": "Nghe bảo thời tiết lạnh nên tôi đã không đi ra ngoài, thế mà thực tế thì lại chẳng lạnh đến mức ấy."
      },
      {
        "translation": "Tôi đã chăm chỉ đến phòng tập thể hình để tập luyện, thế mà cân nặng hầu như chẳng giảm đi chút nào."
      },
      {
        "translation": "Tôi đã ra sức học tập để mong đạt điểm cao trong kỳ thi, thế nhưng kết quả nhận lại lại chẳng tốt đẹp gì."
      },
      {
        "translation": "Tôi đã cố học thuộc lòng và cứ nghĩ là mình biểu diễn tốt, thế mà lúc diễn lại mắc rất nhiều lỗi sai."
      }
    ]
  },
  "ko_아어야만_115": {
    "title": "~아/어야만 (Chỉ khi... mới có thể..., nhất thiết phải...)",
    "shortExplanation": "Vĩ tố liên kết diễn tả điều kiện tiên quyết duy nhất, biểu thị rằng chỉ khi thỏa mãn hành động hoặc trạng thái ở vế trước thì vế sau mới có thể xảy ra ('chỉ khi... mới...').",
    "longExplanation": "'~아/어야만' là dạng nhấn mạnh của vĩ tố liên kết điều kiện '-아/어야', bằng cách gắn thêm trợ từ hạn định độc quyền '-만' (chỉ, duy nhất). Cấu trúc này khẳng định rằng điều kiện ở mệnh đề trước là yêu cầu bắt buộc tối thiểu duy nhất; nếu không đáp ứng được điều kiện đó thì tuyệt đối không thể thực hiện hành động hoặc đạt được kết quả ở mệnh đề sau.",
    "formation": "Thân động từ/tính từ + -아/어야만 (nguyên âm ㅏ, ㅗ dùng -아야만; các nguyên âm khác dùng -어야만; 하다 chuyển thành 해야만)",
    "examples": [
      {
        "translation": "Bạn phải tốt nghiệp trung học phổ thông thì mới có thể vào học đại học được."
      },
      {
        "translation": "Đối với bộ phim đó, bạn nhất thiết phải đặt vé trước thì mới có thể xem được."
      },
      {
        "translation": "Muốn đạt được mục tiêu thì bạn chỉ có cách làm việc chăm chỉ mỗi ngày mà thôi."
      },
      {
        "translation": "Muốn đến nơi đó thì bạn buộc phải đi xe buýt, chứ không thể đi bằng tàu điện ngầm được."
      }
    ]
  },
  "ko_아어지다_116": {
    "title": "~아/어지다 (Trở nên..., dần chuyển sang trạng thái...)",
    "shortExplanation": "Vĩ tố phái sinh kết hợp với tính từ để biểu thị sự biến đổi dần dần sang một trạng thái mới ('trở nên...', 'trở thành...').",
    "longExplanation": "'~아/어지다' là cấu trúc biến đổi tính từ thành động từ chỉ sự thay đổi trạng thái (hoặc kết hợp với động từ để tạo thể bị động). Khi đi cùng tính từ, cấu trúc này diễn tả một quá trình chủ ngữ chuyển dịch, biến hóa dần từ trạng thái này sang một trạng thái mới theo thời gian ('trở nên lạnh hơn', 'trở nên bận rộn').",
    "formation": "Thân tính từ + -아/어지다 (nguyên âm ㅏ, ㅗ dùng -아지다; các nguyên âm khác dùng -어지다; 하다 chuyển thành 해지다)",
    "examples": [
      {
        "translation": "Thời tiết đột ngột trở lạnh nên tôi đã phải bật lò sưởi lên."
      },
      {
        "translation": "Năm ngoái tôi làm việc quá nhiều nên người mệt mỏi, lại không còn cả thời gian nghỉ ngơi nên thực sự rất vất vả."
      },
      {
        "translation": "Vì bạn tôi trở nên bận rộn hơn nên chúng tôi không còn có thể thường xuyên gặp nhau được nữa."
      },
      {
        "translation": "Thức ăn nhiều lên quá mức nên tôi không thể nào ăn hết trong một bữa được."
      }
    ]
  },
  "ko_았었_117": {
    "title": "~았/었던 (Đã từng..., hồi tưởng việc đã hoàn tất trong quá khứ)",
    "shortExplanation": "Định ngữ hồi tưởng quá khứ, dùng để bổ nghĩa cho danh từ phía sau bằng việc gợi nhớ lại một hành động, sự việc đã hoàn tất trọn vẹn hoặc đã kết thúc trong quá khứ ('từng...', 'đã từng...').",
    "longExplanation": "'~았/었던' là cấu trúc định ngữ hồi tưởng được cấu tạo từ vĩ tố thời quá khứ '-았/었-' kết hợp với vĩ tố định ngữ hồi tưởng '-던'. Cấu trúc này dùng để bổ nghĩa cho danh từ đứng sau, biểu thị một hành động hoặc trạng thái đã diễn ra và kết thúc hoàn toàn trong quá khứ, hiện tại không còn tiếp diễn nữa. Người nói vừa miêu tả sự việc vừa gợi lại ký ức, kỷ niệm trong quá khứ.",
    "formation": "Thân động từ/tính từ + -았/었던 + Danh từ (nguyên âm ㅏ, ㅗ dùng -았던; các nguyên âm khác dùng -었던; 하다 chuyển thành 했던)",
    "examples": [
      {
        "translation": "Hôm qua tôi đã xem lại bộ phim hoạt hình mà mình từng say mê thuở nhỏ, biết bao ký ức đẹp đẽ lại ùa về."
      },
      {
        "translation": "Anh ấy đã gặp lại người bạn mà mình từng quen biết từ 5 năm trước sau một thời gian dài xa cách."
      },
      {
        "translation": "Tôi muốn được quay trở lại bãi biển mà mình từng đến vui chơi vào mùa hè năm nào."
      },
      {
        "translation": "Tôi vẫn duy trì tình bạn thân thiết với những người bạn từng quen nhau thời còn đi học."
      }
    ]
  },
  "ko_았었으면_118": {
    "title": "~았/었으면 좋겠다 (Giá mà... thì tốt biết mấy, ước gì đã...)",
    "shortExplanation": "Mẫu câu dùng để bày tỏ niềm hy vọng tha thiết hoặc sự tiếc nuối, ân hận về một sự việc trong quá khứ đã không diễn ra như ý muốn ('giá mà...', 'ước gì...').",
    "longExplanation": "'~았/었으면 좋겠다' được tạo thành bằng cách kết hợp vĩ tố thời quá khứ '-았/었-' với vĩ tố điều kiện '-으면' và tính từ '좋겠다'. Cấu trúc này dùng để diễn tả: 1) Một mong muốn, ước nguyện mãnh liệt trong hiện tại hoặc tương lai; 2) Đặc biệt khi nói về quá khứ, nó biểu thị sự tiếc nuối sâu sắc trước một việc đã xảy ra trái với mong đợi, ngụ ý rằng 'nếu như trong quá khứ chuyện đó đã diễn ra theo hướng khác thì hiện tại đã tốt biết bao nhiêu'.",
    "formation": "Thân động từ/tính từ + -았/었으면 좋겠다 (nguyên âm ㅏ, ㅗ dùng -았으면 좋겠다; các nguyên âm khác dùng -었으면 좋겠다; 하다 chuyển thành 했으면 좋겠다)",
    "examples": [
      {
        "translation": "Giá mà lúc đó tôi đã đến công ty để báo cáo thì tốt biết mấy, nếu vậy thì bây giờ đã chẳng đến nông nỗi này."
      },
      {
        "translation": "Giá như tôi biết đến bạn sớm hơn, nếu được thế thì hẳn đã tránh được bao nhiêu rắc rối rồi."
      },
      {
        "translation": "Ước gì ngày hôm ấy tôi đã đi theo anh ấy, nếu vậy thì không biết mình đã có được những trải nghiệm thú vị nào nhỉ?"
      },
      {
        "translation": "Giá mà mình đã luyện tập nhiều hơn nữa thì tốt biết bao, có như vậy thì thành tích của mình mới tiến bộ vượt bậc hơn."
      }
    ]
  }
};

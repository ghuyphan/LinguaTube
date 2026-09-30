import json
import re

output_data = {
  "vi": {
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
    }
  },
  "zh": {
    "ko_인는데_41": {
      "title": "~인/는데（但是、而、提供背景）",
      "shortExplanation": "连接词尾，用于连接两个分句，表示前后对比转折（“但是”）、提供下文背景情况（“……的是/而……”）或提示轻微原因。",
      "longExplanation": "“~인/는데”是韩语中应用极广的连接词尾，用于连接前后两个分句。主要功能包括：(1) 对比与转折：前后分句内容相反或对照，相当于汉语的“虽然……但是……”、“然而”；(2) 提示背景与铺垫：陈述前面的事实作为下文提问、提议、请求或说明的前提与背景；(3) 提示原因或理由：较为委婉地引出后续事情的起因。接续方法：名词后接“인데”；形容词词干有收音（除ㄹ外）接“-은데”，无收音或以“ㄹ”收音结尾接“-ㄴ데”；动词现在时词干接“-는데”；过去时“-았/었-”或意志“-겠-”后一律接“-는데”。",
      "formation": "1) 名词 + 인데\n2) 形容词词干（有收音除ㄹ外） + 은데 / 形容词词干（无收音或ㄹ收音） + ㄴ데\n3) 动词词干 + 는데",
      "examples": [
        {
          "translation": "今天天气挺好的，但我感觉自己不会出门。打算在家看电影。"
        },
        {
          "translation": "本来能睡个好觉的，结果被闹钟吵醒了。"
        },
        {
          "translation": "我正在学韩语，不过发音有点难，所以有时觉得挺吃力的。"
        },
        {
          "translation": "求职考核虽然很难，但好在最终找到了这份工作。"
        }
      ]
    },
    "ko_자_42": {
      "title": "~자（……吧、一起……吧）",
      "shortExplanation": "共动形非敬语终结词尾，用于向朋友或晚辈提议共同做某事（“……吧”）。",
      "longExplanation": "“~자”是韩语非敬语中的共动句终结词尾，直接接在动词词干后，用于向平辈、朋友或晚辈提议一同做某事，相当于汉语的“……吧”、“一起……吧”。注意：该表达带有明显的非敬语色彩，绝对不能对长辈、上级或初次见面的人使用；在需要表示尊敬的场合，应使用“-(으)ㅂ시다”或“-(으)시지요”。",
      "formation": "动词词干 + 자",
      "examples": [
        {
          "translation": "我们去看电影吧。我想看这里新上映的电影。"
        },
        {
          "translation": "外面天气这么好，我们去散散步吧。"
        },
        {
          "translation": "从现在开始学习吧。快考试了，但我对这些概念还不太清楚。"
        },
        {
          "translation": "美味地吃完午饭了，稍微休息一下吧。肚子实在太饱了。"
        }
      ]
    },
    "ko_자마자_43": {
      "title": "~자마자（一……就……、刚……就……）",
      "shortExplanation": "连接词尾，表示前一个动作一结束，后一个动作紧接着立刻发生（“一……就……”）。",
      "longExplanation": "“~자마자”直接接在动词词干后，用于连接两个分句，表示前面的动作或事件刚刚完成，后面的动作或事件就紧随其后、毫不拖延地发生，相当于汉语的“一……就……”、“刚……就……”。无论该动作是发生在过去还是将来，时态词尾（如过去时-았/었-）都不能加在“-자마자”前面，而只能体现在最后分句的句尾谓语上。不受收音有无影响，直接接续。",
      "formation": "动词词干 + 자마자",
      "examples": [
        {
          "translation": "一到学校我就见到了朋友。早上实在太忙了，连电话都没能打。"
        },
        {
          "translation": "刚一开门，猫咪就窜到外面去了。结果找了好大半天。"
        },
        {
          "translation": "飞机一降落我就打开了手机。因为我预料会有重要的电话打来。"
        },
        {
          "translation": "一回到家我就立刻洗了个澡。今天天气实在太热了。"
        }
      ]
    },
    "ko_처럼_44": {
      "title": "~처럼（像……一样、如同）",
      "shortExplanation": "比较助词，接在名词后，表示与某一对象相似、如同某事物（“像……一样”）。",
      "longExplanation": "“~처럼”是韩语中表示比喻与相似性的格助词，直接附着在名词后面（或用于冠字形词尾构成的“-는 것처럼”形式中），表示动作、状态或性质与前面所提及的事物极其相似，相当于汉语的“像……一样”、“如同”。在大多数日常语境中，它与另一助词“~같이”意思相同且可互换。不受收音有无的影响，直接接在名词后。",
      "formation": "名词 + 처럼（或 冠字形词尾 + 것 + 처럼）",
      "examples": [
        {
          "translation": "他的眼睛像星星一样闪闪发光。"
        },
        {
          "translation": "我父亲总是像插上翅膀的马一样拼命努力地工作。"
        },
        {
          "translation": "她游泳游得像鱼儿一样好。"
        },
        {
          "translation": "今天一整天，我都像飞鸟一样自由自在地到处漫游。"
        }
      ]
    },
    "ko_쯤_45": {
      "title": "~쯤（大约、左右、大概）",
      "shortExplanation": "补助词，接在表示时间、数量、程度的名词后，表示概数或估算（“左右、大约”）。",
      "longExplanation": "“~쯤”是韩语中表示概数或约数的补助词，紧接在表示时间、日期、数量、价格、程度的名词或数词量词后面，表示大概的范围或估算，相当于汉语的“大约”、“左右”、“上下”。在句子中常与前面的副词“약”或名词“정도”搭配使用以增强概数语气。书写时与前面的词连写，不加空格。",
      "formation": "时间 / 数量 / 程度名词 + 쯤",
      "examples": [
        {
          "translation": "因为考试很难，所以一天得学大约3个小时。"
        },
        {
          "translation": "从我家坐公交车去的话，大概需要20分钟左右。"
        },
        {
          "translation": "今天太热了，气温估计在30度左右。"
        },
        {
          "translation": "要读完那本书的话，大概得花上一周左右的时间。"
        }
      ]
    },
    "ko_지_46": {
      "title": "~지 않다（不、没、并不是）",
      "shortExplanation": "长形否定句型，接在动词或形容词词干后，表示否定动作或状态（“不、没”）。",
      "longExplanation": "“~지 않다”是韩语中标准的长形否定表达，接在动词或形容词词干后，用于否定某种行为、性质或状态，相当于汉语的“不……”、“没……”。相较于词前加“안”的短形否定，“~지 않다”语感更加温和、客观且书面化，常用于正式演讲、书面写作以及有教养的日常会话中。后面的辅助谓词“않다”可根据时态和句末语体进行正常活用（如“않아요”、“않습니다”、“않았다”）。",
      "formation": "动词词干 / 形容词词干 + 지 않다",
      "examples": [
        {
          "translation": "我这次会议不打算参加了。那个时间我有别的要紧事。"
        },
        {
          "translation": "我爸爸不抽烟，所以家里的空气总是很清新。"
        },
        {
          "translation": "她脸上不带什么明朗的表情，感觉好像和别人保持着距离。"
        },
        {
          "translation": "我不吃肉类，因此总是点素食菜单。"
        }
      ]
    },
    "ko_지만_47": {
      "title": "~지만（虽然……但是……、可是）",
      "shortExplanation": "对立转折连接词尾，用于连接前后两个内容相反或对照的分句（“但是、可是”）。",
      "longExplanation": "“~지만”是韩语中表示明确对立与转折关系的连接词尾，相当于汉语的“虽然……但是……”、“可是”。说话者先在前半句陈述一个事实，后半句紧接着提出与之相反、相对立或意料之外的情况。与偏向铺垫背景的“-(으)ㄴ/는데”相比，“~지만”更强调两句话在逻辑上的截然对立。可以直接接在过去时“-았/었-”或推测“-겠-”后；名词有收音接“이지만”，无收音接“지만”。",
      "formation": "动词词干 / 形容词词干 + 지만，名词（有收音） + 이지만 / 名词（无收音） + 지만",
      "examples": [
        {
          "translation": "虽然我很疲惫，但必须把这事做完，所以感觉还是得继续干下去。"
        },
        {
          "translation": "那道菜虽然不好吃，但营养丰富，所以还是得吃。"
        },
        {
          "translation": "大家当中也许有人觉得题目很难，但绝不能放弃。"
        },
        {
          "translation": "他性格虽然很好，但要明确表达自己的观点却觉得有些困难。"
        }
      ]
    },
    "ko_지요죠_48": {
      "title": "~지요/~죠（对吧？……吧？）",
      "shortExplanation": "终结词尾，用于向对方确认已知的事实或寻求对方的认同（“……吧？对吧？”）。",
      "longExplanation": "“~지요”（在口语中通常缩略为“~죠”）是兼具肯定与亲切语气的终结词尾。主要用于以下情况：(1) 在疑问句中，说话人就自己已知或确信的事情向对方进行确认，或者期待对方表示认同，相当于汉语的“……对吧？”、“……吧？”；(2) 在陈述句中，用于温和而肯定地陈述自己的看法或事实。它可以与过去时“-았/었지요”以及推测“-겠지요”结合使用。接续时直接附于动词、形容词词干后；名词有收音接“이지요”，无收音接“지요”。",
      "formation": "动词词干 / 形容词词干 + 지요（口语缩略为 죠），名词（有收音） + 이지요 / 名词（无收音） + 지요",
      "examples": [
        {
          "translation": "今天天气挺好的，对吧？"
        },
        {
          "translation": "我们以前是在同一个班级吧？"
        },
        {
          "translation": "我们得把这项工作做完，对不对？"
        },
        {
          "translation": "那部电影真的很精彩吧？"
        }
      ]
    },
    "ko_하고_49": {
      "title": "~하고（和、跟、与）",
      "shortExplanation": "口语助词，用于连接两个名词（“和”），或表示与某人共同进行某动作（“跟……一起”）。",
      "longExplanation": "“~하고”是韩语口语中最高频的并列与伴随助词。主要具有两种功能：(1) 并列连接名词：连接两个或两个以上的名词，相当于汉语的“和”、“与”；(2) 伴随状语：接在人或动物名词后，表示与某人一同做某事，相当于汉语的“跟……一起”、“同……”。相较于书面色彩浓厚的“~와/과”，“~하고”更具亲切自然的日常口语色彩。无论名词末尾是否有收音，均直接附加使用。",
      "formation": "名词1 + 하고 + 名词2（并列：和） / 名词 + 하고（伴随：跟、同）",
      "examples": [
        {
          "translation": "我点了咖啡和甜甜圈。"
        },
        {
          "translation": "我们在一起聊天叙旧，度过了愉快的时光。"
        },
        {
          "translation": "我把草莓和香蕉放进搅拌机里做成了冰沙。"
        },
        {
          "translation": "他和朋友一起去公园踢足球了。"
        }
      ]
    },
    "ko_하기로_50": {
      "title": "~하기로 하다（决定做某事、约定做某事）",
      "shortExplanation": "表示对将来的某种行为做出决定、决心或约定（“决定……、约好……”）。",
      "longExplanation": "“~하기로 하다”（以及其延伸表达“~기로 결정하다/결심하다”）接在动词词干后，用于表达说话人自身下了决心做某事，或者多方之间就某项行动达成了共识与约定，相当于汉语的“决定做……”、“约好做……”。因为做决定的动作通常发生在说话之前，所以句尾通常使用过去时“~기로 했다”。不受动词词干收音有无的影响，直接接续。",
      "formation": "动词词干 + 기로 하다（或 결정하다 / 결심하다）",
      "examples": [
        {
          "translation": "我们决定明天去首尔。打算在那儿和朋友们见一面。"
        },
        {
          "translation": "我下定决心下个月开始一份新工作。因为现在的这份工作实在太无聊了。"
        },
        {
          "translation": "我们全家约好下周末去野餐。因为天气预报说会是个大晴天。"
        },
        {
          "translation": "我决定每天读一个小时的书。因为读书能增长见识。"
        }
      ]
    },
    "ko_하기는_51": {
      "title": "~기는 하다（好倒是好、确实……但是）",
      "shortExplanation": "表示承认前半句所述事实，但后半句提出与之相反的限制或不足（“确实……但是……”）。",
      "longExplanation": "“~기는 하다”（口语中常缩略为“~긴 하다”，后续常连接转折形式“~기는 하지만”、“~기는 한데”、“~기는 해도”）用于先顺从并承认某一事实或优点，随后立即在后半句提出相反的消极情况、限制条件或遗憾之处，相当于汉语的“……倒是……，可是……”、“虽然确实……，但是……”。接续时直接附于动词或形容词词干后，不受收音有无的影响。",
      "formation": "动词词干 / 形容词词干 + 기는 하다（口语缩略：긴 하다；连接形：기는 하지만 / 기는 한데 / 기는 해도）",
      "examples": [
        {
          "translation": "虽然天气确实挺冷的，但我们依然度过了愉快的时光。"
        },
        {
          "translation": "我确实挺喜欢这个新款的，但实在太贵了买不起。"
        },
        {
          "translation": "我做饭确实做得不错，但前期准备需要花费大量时间和精力。"
        },
        {
          "translation": "他性格确实挺好的，只是常常有迟到的习惯。"
        }
      ]
    },
    "ko_하기보다_52": {
      "title": "~하기보다（比起……更……、与其……不如……）",
      "shortExplanation": "表示在两个动作或状态中进行比较，更倾向于选择后者的取舍表达（“比起……更……”）。",
      "longExplanation": "“~하기보다”（常加辅助词“는”强化为“~하기보다는”）接在动词词干后，用于对两种行为、状态或方案进行对比，表示说话者认为后者的做法更好、更合适或更值得推荐，相当于汉语的“比起做……更……”、“与其做……不如……”。放在“-하기보다”前面的动作是较不倾向选择的一方。接续时不受动词词干收音有无的影响，直接接续。",
      "formation": "动词词干 + 기보다（强调形：기보다는）",
      "examples": [
        {
          "translation": "比起自己开车，我觉得坐公交车更舒服。"
        },
        {
          "translation": "比起买外卖吃，自己亲手做饭更健康。"
        },
        {
          "translation": "我认为在办公室工作比在家里工作效率更高。"
        },
        {
          "translation": "比起赚钱，我认为和朋友们共度时光更重要。"
        }
      ]
    },
    "ko_하나_53": {
      "title": "~하나 / ~나（……吗？难道是……吗？）",
      "shortExplanation": "自问疑问终结词尾，用于内心独白或非正式口语中，表示自问、困惑或纳闷（“……吗？难道……？”）。",
      "longExplanation": "“~하나”（语源为表示自我疑问的终结词尾“-나 / -(으)ㄴ가”）常用于自言自语或熟人间的口语中，表达说话者对某一令人费解的情况所产生的困惑、琢磨或自我疑问，相当于汉语的“……吗？”、“难道是……吗？”、“怎么会……呢？”。动词词干后通常接“-나”（“하다”则变为“하나”），形容词词干接“-(으)ㄴ gas”即“-(으)ㄴ가”。",
      "formation": "动词词干 + 하나（或 나） / 形容词词干 + 은가/ㄴ가",
      "examples": [
        {
          "translation": "我怎么总是孤孤单单一个人呢，真让人想不明白。"
        },
        {
          "translation": "真纳闷他当时为什么会说出那样的话来。"
        },
        {
          "translation": "平时经常联系的朋友突然没了音讯，是怎么回事呢？"
        },
        {
          "translation": "明明下了很大功夫苦读，考试却还是考不好，这到底是怎么了呢？"
        }
      ]
    },
    "ko_하다가_54": {
      "title": "~다가 / ~하다가（正做着……的时候、中途……）",
      "shortExplanation": "连接词尾，表示前一个动作或状态正在进行之中，中途发生转变或被另一事件打断（“正……突然……”）。",
      "longExplanation": "“~하다가”（连接词尾“-다가”的活用形式）接在动词词干后，用于表示前面的动作正在持续进行的过程中，中途发生中断、转变，或者发生了另一个未预料到的新事件，相当于汉语的“正做着……的时候突然……”、“……着……着就……”。前后两个分句的主语通常需要保持一致。直接接在动词词干后，不受收音有无的影响。",
      "formation": "动词词干 + 다가（针对하다动词：하다가）",
      "examples": [
        {
          "translation": "正打扫着卫生，我偶然发现了一张老照片。"
        },
        {
          "translation": "我正看着书呢，不知不觉就睡着了。"
        },
        {
          "translation": "和朋友正聊着天，结果连时间都给忘了。"
        },
        {
          "translation": "开着开着车，结果迷路了。"
        }
      ]
    },
    "ko_하다가_55": {
      "title": "~다가 말다 / ~하다가 말다（半途而废、做到一半就作罢）",
      "shortExplanation": "表示某个动作正在进行中却中途停止、半途而废（“做着做着就停了、半途停下”）。",
      "longExplanation": "“~다가 말다”（针对하다动词为“~하다가 말다”）接在动词词干后，由表示中断的连接词尾“-다가”与表示停止的辅助动词“말다”组合而成。用于表示某一行为已经展开，但在未完成的状态下中途停止、搁置或半途而废，相当于汉语的“做着做着就作罢了”、“中途停了下来”。辅助动词“말다”通常活用为过去时“~다가 말았다/말았어요”。接续时直接附于动词词干后。",
      "formation": "动词词干 + 다가 말다（针对하다动词：하다가 말다）",
      "examples": [
        {
          "translation": "我学着学着就停下来没学了，因为闹钟没响把时间给忘了。"
        },
        {
          "translation": "因为朋友来家里了，我饭做了一半就没继续做了。"
        },
        {
          "translation": "运动做到一半就停下了，因为雨下得实在太大了。"
        },
        {
          "translation": "书读到一半就放下了，因为突然犯困了。"
        }
      ]
    }
  },
  "ja": {
    "ko_인는데_41": {
      "title": "~인/는데（〜だけど、〜が、〜のに、〜ので）",
      "shortExplanation": "前置き（背景説明）や逆接・対比（「〜けれど」「〜が」）、または軽い理由を表す接続語尾です。",
      "longExplanation": "「~인/는데」は、文と文をつなぐ非常に頻出の接続語尾で、文脈によって多様なニュアンスを表します。(1) 逆接・対比：前後の文が対立・対比することを表し、「〜けれど」「〜が」「〜のに」に相当します；(2) 前置き・背景提示：後ろに続く質問、依頼、提案、感嘆などの前提・背景となる状況を提示します（「〜なんだけど」「〜ですが」）；(3) 理由・根拠：後続節に対する緩やかな理由を添えます。接続形：名詞には「인데」；形容詞の語幹にはパッチムがあれば（ㄹ以外）「-은데」、なければ「-ㄴ데」；動詞の現在形語幹には「-는데」が接続します。過去形「-았/었-」の後には品詞に関係なく「-는데」が付きます。",
      "formation": "1) 名詞 + 인데\n2) 形容詞の語幹（ㄹ以外のパッチムあり） + 은데 ／ 形容詞の語幹（母音またはㄹパッチム） + ㄴ데\n3) 動詞の語幹 + 는데",
      "examples": [
        {
          "translation": "今日は天気が良いですが、外出はしないと思います。家で映画を見ます。"
        },
        {
          "translation": "ぐっすり眠れていたのに、目覚まし時計の音で目が覚めてしまいました。"
        },
        {
          "translation": "私は韓国語を勉強しているのですが、発音が難しくて時々大変です。"
        },
        {
          "translation": "就職の選考は難しかったですが、幸いにもこの仕事を見つけることができました。"
        }
      ]
    },
    "ko_자_42": {
      "title": "~자（〜しよう、〜しようぜ）",
      "shortExplanation": "友人や親しい間柄で相手に一緒に何かをしようと提案・勧誘するパンマルの終結語尾です（「〜しよう」）。",
      "longExplanation": "「~자」は、動詞の語幹に付いて「一緒に〜しよう」と提案や勧誘を表す勧誘形の終結語尾です。日本語の「〜しよう」「〜しようぜ」に相当します。親しい友人、同年代、または年下に対してのみ使われ、目上の人や改まった場面で使うと失礼にあたります（丁寧な勧誘には「-(으)ㅂ시다」や「-(으)ㄹ까요?」を用います）。パッチムの有無に関わらず、動詞の語幹にそのまま「자」を接続します。",
      "formation": "動詞の語幹 ＋ 자",
      "examples": [
        {
          "translation": "私たち映画を見に行こう。ここで新しく公開された映画を見たいんだ。"
        },
        {
          "translation": "外の天気がいいから、散歩に行こう。"
        },
        {
          "translation": "今から勉強しよう。試験が近いのに、まだ概念がよく分かっていないんだ。"
        },
        {
          "translation": "お昼ご飯をおいしく食べたから、少し休もう。お腹がいっぱいだよ。"
        }
      ]
    },
    "ko_자마자_43": {
      "title": "~자마자（〜するやすぐに、〜するやいなや）",
      "shortExplanation": "前の動作が終わるとすぐに次の動作が行われることを表す接続語尾です（「〜するやすぐに」「〜するやいなや」）。",
      "longExplanation": "「~자마자」は、動詞の語幹に接続し、前の動作が完了した直後に間髪を入れず次の動作や事態が起きることを表す接続語尾です。日本語の「〜するやすぐに」「〜するやいなや」「〜したとたんに」に相当します。過去の出来事を述べる場合でも、前半の節には過去形「-았/었-」を用いず、文末の述語で時制を表します。パッチムの有無に関係なく、動詞の語幹にそのまま付きます。",
      "formation": "動詞の語幹 ＋ 자마자",
      "examples": [
        {
          "translation": "学校に着くやすぐに友達に会いました。朝とても忙しくて電話もできませんでした。"
        },
        {
          "translation": "ドアを開けるやいなや猫が外に出て行ってしまいました。結局ずいぶん長い間探さなければなりませんでした。"
        },
        {
          "translation": "飛行機が着陸するやすぐに携帯電話の電源を入れました。大事な電話がかかってくると思っていたからです。"
        },
        {
          "translation": "家に帰るやすぐにシャワーを浴びました。今日の天気はとても暑かったです。"
        }
      ]
    },
    "ko_처럼_44": {
      "title": "~처럼（〜のように、〜みたいに）",
      "shortExplanation": "名詞の後ろに付き、その対象と姿や状態、動作が似ていることを表す比況の助詞です（「〜のように」「〜みたいに」）。",
      "longExplanation": "「~처럼」は、名詞の直後に付いて（または連体形＋「것처럼」の形で）、人や物事の様子、性質、動作がその対象と似通っていることや比喩を表す助詞です。日本語の「〜のように」「〜みたいに」に相当します。日常会話では同様の意味を持つ「~같이」と言い換えることも可能です。名詞末尾のパッチムの有無に関係なく、そのまま接続します。",
      "formation": "名詞 ＋ 처럼（または 連体形 ＋ 것 ＋ 처럼）",
      "examples": [
        {
          "translation": "彼の目は星のようにキラキラと輝いています。"
        },
        {
          "translation": "私の父はいつも翼の生えた馬のように一生懸命働きます。"
        },
        {
          "translation": "彼女は魚のように泳ぎが上手です。"
        },
        {
          "translation": "今日一日中、私は鳥のように自由に飛び回りました。"
        }
      ]
    },
    "ko_쯤_45": {
      "title": "~쯤（〜ごろ、〜くらい、〜ほど）",
      "shortExplanation": "時間や数量、程度を表す名詞の後に付き、大体の見当や概数を表す助詞です（「〜ごろ」「〜くらい」）。",
      "longExplanation": "「~쯤」は、時間、時刻、日付、数量、金額などを表す名詞の直後に付いて、おおよその見当や範囲（概数）を表す助詞です。時間を表す名詞につくと「〜ごろ」、数量や期間を表す名詞につくと「〜くらい」「〜ほど」という意味になります。「약」や「정도」と一緒に併用されることもよくあります。前の名詞と分かち書きをせず、続けて表記します。",
      "formation": "時間・数量・程度を表す名詞 ＋ 쯤",
      "examples": [
        {
          "translation": "試験が難しいので、1日に3時間くらい勉強しなければなりません。"
        },
        {
          "translation": "私の家からバスで行くと約20分くらいかかると思います。"
        },
        {
          "translation": "今日はとても暑いので、気温が30度くらいになりそうです。"
        },
        {
          "translation": "その本を全部読み終えるには、1週間程度くらいかかるでしょう。"
        }
      ]
    },
    "ko_지_46": {
      "title": "~지 않다（〜ない、〜ません）",
      "shortExplanation": "動詞や形容詞の語幹に付き、動作や状態を否定する「長形否定」の表現です（「〜ない」「〜しない」）。",
      "longExplanation": "「~지 않다」は、動詞や形容詞の語幹に接続して、動作や状態を打ち消す否定表現（長形否定）です。日本語の「〜ない」「〜しません」に相当します。述語の前に「안」を置く短形否定に比べて、客観的で改まった響きを持ち、書き言葉や公の場でのスピーチ、丁寧な日常会話で好まれます。後続の「않다」に時制や敬語の終結語尾を結合させて活用します（例：「않아요」「않았습니다」）。",
      "formation": "動詞の語幹 ／ 形容詞の語幹 ＋ 지 않다",
      "examples": [
        {
          "translation": "私は今回の会議には出席しないつもりです。その時間に別の重要な用事があります。"
        },
        {
          "translation": "うちの父はタバコを吸いません。そのため家の中の空気はいつも澄んでいます。"
        },
        {
          "translation": "彼女は明るい表情を見せないため、周りの人たちと距離を置いているように見えます。"
        },
        {
          "translation": "私は肉類を食べません。そのためいつもベジタリアンメニューを探します。"
        }
      ]
    },
    "ko_지만_47": {
      "title": "~지만（〜けれど、〜が、〜だが）",
      "shortExplanation": "前後の文の内容が対立・対比することをはっきりと表す逆接の接続語尾です（「〜けれど」「〜が」）。",
      "longExplanation": "「~지만」は、動詞・形容詞の語幹や名詞に付き、前の節と後ろの節の内容が対立・矛盾していることを明確に示す逆接の接続語尾です。日本語の「〜けれど」「〜が」「〜ですが」に相当します。背景を緩やかに示す「-(으)ㄴ/는데」に比べ、明確な対比・逆接の対立関係を際立たせる特徴があります。過去形「-았/었지만」や推測・意志「-겠지만」の形でも頻繁に使われます。名詞にはパッチムがあれば「이지만」、なければ「지만」を接続します。",
      "formation": "動詞の語幹 ／ 形容詞の語幹 ＋ 지만，名詞（パッチムあり） ＋ 이지만 ／ 名詞（パッチムなし） ＋ 지만",
      "examples": [
        {
          "translation": "私はとても疲れていますが、この仕事を終わらせなければならないので続けなければならないと思います。"
        },
        {
          "translation": "その食べ物はおいしくありませんが、栄養がたっぷりなので食べなければなりません。"
        },
        {
          "translation": "皆さんの中には問題が難しいと感じる方もいるでしょうが、諦めてはいけません。"
        },
        {
          "translation": "彼は性格が良いですが、はっきりと意見を述べるのは少し苦手としています。"
        }
      ]
    },
    "ko_지요죠_48": {
      "title": "~지요/~죠（〜ですよね、〜でしょう？）",
      "shortExplanation": "聞き手に事実を確認したり、同意を求めたりする終結語尾です（「〜ですよね」「〜でしょう？」）。",
      "longExplanation": "「~지요」（会話では縮約形の「~죠」が非常によく使われます）は、話し手がすでに知っている事実や予想していることについて、聞き手に確認を求めたり同意を促したりする終結語尾です。日本語の「〜ですよね」「〜でしょう？」に相当します。文末のイントネーションを上げることで確認・疑問のニュアンスとなり、下げることで柔らかい自己主張や確信を表します。過去形「-았/었지요」や推測「-겠지요」とも接続します。パッチムの有無に関係なく用言の語幹にそのまま結合します（名詞には「-(이)지요」）。",
      "formation": "動詞の語幹 ／ 形容詞の語幹 ＋ 지요（会話縮約形：죠），名詞（パッチムあり） ＋ 이지요 ／ 名詞（パッチムなし） ＋ 지요",
      "examples": [
        {
          "translation": "今日は天気が良いですよね？"
        },
        {
          "translation": "私たちは同じクラスにいましたよね？"
        },
        {
          "translation": "この仕事を終わらせなければいけませんよね？"
        },
        {
          "translation": "その映画、本当に面白かったですよね？"
        }
      ]
    },
    "ko_하고_49": {
      "title": "~하고（〜と、〜と一緒に）",
      "shortExplanation": "名詞を並列でつないだり（「〜と」）、誰かと動作を共に行うこと（「〜と、〜と一緒に」）を表す助詞です。",
      "longExplanation": "「~하고」は、日常の話し言葉で非常に広く使われる助詞です。主な用法は2つあります：(1) 名詞と名詞を対等につなぐ並列用法（「〜と」）；(2) 人や動物の後に付いて、動作を共にする相手を表す同伴用法（「〜と」「〜と一緒に」）。書き言葉で好まれる「~와/과」に比べて親しみやすく、くだけた会話で多用されます。直前の名詞にパッチムがあってもなくても、そのまま「하고」を接続します。",
      "formation": "名詞1 ＋ 하고 ＋ 名詞2（並列：〜と） ／ 名詞 ＋ 하고（同伴：〜と一緒に）",
      "examples": [
        {
          "translation": "私はコーヒーとドーナツを注文しました。"
        },
        {
          "translation": "私たちは一緒に過ごし、語り合いながら楽しい時間を過ごしました。"
        },
        {
          "translation": "私はイチゴとバナナをミキサーに入れてスムージーを作りました。"
        },
        {
          "translation": "彼は友達とサッカーをするために公園へ行きました。"
        }
      ]
    },
    "ko_하기로_50": {
      "title": "~하기로 하다（〜することにする、〜することに決める）",
      "shortExplanation": "ある動作を行うことを決定したり、約束したりしたことを表します（「〜することにする」）。",
      "longExplanation": "「~하기로 하다」（および「~기로 결정하다 / 결심하다」）は、動詞の語幹に付いて、将来の行動について決意したり、計画を立てたり、誰かと約束したりしたことを表す表現です。日本語の「〜することにする」「〜することに決めた」に相当します。決定や約束自体は発話時より前に行われていることが多いため、通常は過去形「~기로 했다」の形で用いられます。パッチムの有無に関わらず、動詞の語幹にそのまま付きます。",
      "formation": "動詞の語幹 ＋ 기로 하다（または 결정하다 ／ 결심하다）",
      "examples": [
        {
          "translation": "私たちは明日ソウルへ行くことに決めました。そこで友達に会うつもりです。"
        },
        {
          "translation": "私は来月新しい仕事を始めることに決心しました。今の仕事は退屈すぎるからです。"
        },
        {
          "translation": "うちの家族は来週末にピクニックへ行くことにしました。天気が良い予定だからです。"
        },
        {
          "translation": "私は1日に1時間読書することにしました。本を読めば知識が増えるからです。"
        }
      ]
    },
    "ko_하기는_51": {
      "title": "~기는 하다（〜することはする、〜には〜だが）",
      "shortExplanation": "前半の事実や性質を一旦認めた上で、後半でそれに反する制約や対立点を述べる表現です（「〜することはするが」）。",
      "longExplanation": "「~기는 하다」（会話では縮約形の「~긴 하다」も頻出で、後ろに逆接を伴って「~기는 하지만」「~기는 한데」「~기는 해도」などの形で多用されます）は、前の事柄や相手の意見を一旦肯定・是認しつつも、後ろの節でそれに対する留保、不満、制限などを付け加える表現です。日本語の「〜（し）はするけれど」「確かに〜だが」に相当します。パッチムの有無に関わらず、動詞・形容詞の語幹にそのまま結合します。",
      "formation": "動詞の語幹 ／ 形容詞の語幹 ＋ 기는 하다（会話縮約形：긴 하다；接続形：기는 하지만 ／ 기는 한데 ／ 기는 해도）",
      "examples": [
        {
          "translation": "天気は確かに寒くはありましたが、私たちはそれでも楽しい時間を過ごしました。"
        },
        {
          "translation": "この新商品が好きではあるけれど、高すぎて買うのが難しいです。"
        },
        {
          "translation": "料理は上手には作れますが、準備に多くの時間と労力が必要です。"
        },
        {
          "translation": "彼は確かに性格が良くはあるのですが、しばしば遅刻する癖があります。"
        }
      ]
    },
    "ko_하기보다_52": {
      "title": "~하기보다（〜するよりは、〜する代わりに）",
      "shortExplanation": "2つの行動や状態を比較して、後者の行動をより好ましいと選択することを表します（「〜するよりは」）。",
      "longExplanation": "「~하기보다」（強調の助詞を伴った「~하기보다는」も頻出）は、動詞の語幹に付いて、2つの行為や状況を比較し、前者の行為よりも後者の行為を優先したり好ましいと判断したりすることを表す表現です。日本語の「〜するよりは」「〜するくらいなら」に相当します。「~하기보다」の前に置かれる動作は望ましくない選択肢であり、後ろに好ましい選択肢が提示されます。パッチムの有無に関わらず、動詞の語幹にそのまま付きます。",
      "formation": "動詞の語幹 ＋ 기보다（強調形：기보다는）",
      "examples": [
        {
          "translation": "私は車を運転するよりはバスに乗るほうがずっと楽です。"
        },
        {
          "translation": "料理を買って食べるよりは、自分で直接料理するほうがより健康的です。"
        },
        {
          "translation": "家で仕事をするよりはオフィスで作業するほうが生産的だと思います。"
        },
        {
          "translation": "お金を稼ぐことよりは友達と一緒に時間を過ごすことのほうが大切だと思います。"
        }
      ]
    },
    "ko_하나_53": {
      "title": "~하나 / ~나（〜なのかな、〜だろうか）",
      "shortExplanation": "独り言や親しい口語で、自分自身に問いかけたり不思議に思う気持ちを表す自問の終結語尾です（「〜なのかな」）。",
      "longExplanation": "「~하나」（語源的には自問を表す疑問形語尾「-나 ／ -(으)ㄴ가」の一種）は、独り言や親しい間柄の会話で、話し手が納得のいかない状況や不可解なことについて自問自答し、首をかしげたり訝しんだりするニュアンスを表します。日本語の「〜なのかな」「どうして〜なのだろう」に相当します。動詞の語幹には「-나」（「하다」は「하나」）、形容詞の語幹には「-(으)ㄴ가」が接続します。",
      "formation": "動詞の語幹 ＋ 하나（または 나） ／ 形容詞の語幹 ＋ 은가/ㄴ가",
      "examples": [
        {
          "translation": "私はどうしていつも一人なんだろう、自分でもよく分からないな。"
        },
        {
          "translation": "なぜ彼があんなことを言ったのか、さっぱり理解できないな。"
        },
        {
          "translation": "よく連絡をくれていた友達から急に連絡が来なくなったのはどうしてだろう。"
        },
        {
          "translation": "たくさん勉強したのに試験で良い点数が取れないなんて、どういうことなんだろう。"
        }
      ]
    },
    "ko_하다가_54": {
      "title": "~다가 / ~하다가（〜していて、〜している途中で）",
      "shortExplanation": "ある動作や状態が続いている途中で、それが中断されたり別の事態に切り替わったりすることを表す接続語尾です（「〜していて」「〜している途中で」）。",
      "longExplanation": "「~하다가」（接続語尾「-다가」の代表的な形）は、動詞の語幹に付いて、前の行為や状態が継続している最中に、その動作が途中で途切れたり、別の行動や予想外の出来事が割り込んで起きたりすることを表します。日本語の「〜していて」「〜している途中で」「〜しかけて」に相当します。前後の主語は同一人物であることが原則です。パッチムの有無に関わらず、動詞の語幹にそのまま付きます。",
      "formation": "動詞の語幹 ＋ 다가（하다動詞の場合：하다가）",
      "examples": [
        {
          "translation": "掃除をしていたら、偶然古い写真を見つけました。"
        },
        {
          "translation": "私は本を読んでいて眠ってしまいました。"
        },
        {
          "translation": "友達と話をしていて時間の経つのを忘れてしまいました。"
        },
        {
          "translation": "運転をしている途中で道に迷ってしまいました。"
        }
      ]
    },
    "ko_하다가_55": {
      "title": "~다가 말다 / ~하다가 말다（〜するのを途中でやめる、中途半端にやめる）",
      "shortExplanation": "動作を途中で中断してやめてしまうこと、やりかけで放置することを表します（「〜しかけてやめる」「途中でやめる」）。",
      "longExplanation": "「~다가 말다」（하다動詞では「~하다가 말다」）は、動詞の語幹に付き、始まった動作が完了しないまま中途半端に途中で中断したり中止したりすることを表す表現です。日本語の「〜するのを途中でやめる」「〜しかけてやめる」に相当します。補助動詞「말다」は通常、過去形「~다가 말았다／말았어요」の形で多く用いられます。パッチムの有無に関係なく、動詞の語幹にそのまま付きます。",
      "formation": "動詞の語幹 ＋ 다가 말다（하다動詞の場合：하다가 말다）",
      "examples": [
        {
          "translation": "勉強を途中でやめてしまいました。目覚ましが鳴らず時間を忘れてしまったからです。"
        },
        {
          "translation": "友達が家に来たので、私はご飯を作るのを途中でやめました。"
        },
        {
          "translation": "運動するのを途中でやめました。雨があまりにもひどく降ってきたからです。"
        },
        {
          "translation": "本を読んでいたのですが途中でやめました。急に眠気が襲ってきたからです。"
        }
      ]
    }
  },
  "ko": {
    "ko_인는데_41": {
      "title": "~인/는데 (배경·대립·이유의 연결어미)",
      "shortExplanation": "두 문장을 이어 주며, 앞뒤 내용의 대립(역접), 배경 제시, 또는 가벼운 이유를 나타냅니다.",
      "longExplanation": "'~인/는데'는 일상 대화와 글에서 매우 널리 쓰이는 연결어미로, 문맥에 따라 다양한 의미 관계를 형성합니다. (1) 대립·역접: 앞 절과 뒤 절이 서로 상반되거나 대조될 때('~지만'); (2) 배경 제시: 뒤 절의 질문, 명령, 청유, 서술을 전개하기 위해 상황적 배경이나 전제를 미리 깔아줄 때; (3) 이유나 핑계: 뒤 절의 결과를 유발하는 완곡한 원인을 밝힐 때 사용됩니다. 형태적으로 명사 뒤에는 '인데', 형용사 어간 뒤에는 '-(으)ㄴ데', 동사 어간 뒤에는 '-는데'가 결합하며, 과거 시제 '-았/었-' 뒤에는 품사와 상관없이 '-는데'가 결합합니다.",
      "formation": "1) 명사 + 인데\n2) 형용사 어간(ㄹ 제외 받침) + 은데 / 형용사 어간(받침 없음, ㄹ 받침) + ㄴ데\n3) 동사 어간 + 는데",
      "examples": [
        {
          "translation": "오늘 날씨가 좋은데 외출하지 않을 것 같아요. 집에서 영화를 볼 거예요."
        },
        {
          "translation": "잠을 잘 수 있었는데 알람 소리 때문에 깼어요."
        },
        {
          "translation": "저는 한국어를 배우고 있는데 발음이 어려워서 가끔 힘들어요."
        },
        {
          "translation": "구직 심사가 어려웠는데, 다행히도 이 직업을 찾을 수 있었어요."
        }
      ]
    },
    "ko_자_42": {
      "title": "~자 (청유형 종결어미)",
      "shortExplanation": "친구 사이나 아랫사람에게 어떤 행동을 함께 하자고 제안할 때 쓰는 해라체의 청유형 종결어미입니다.",
      "longExplanation": "'~자'는 동사 어간 뒤에 붙어 듣는 사람에게 함께 무언가를 하자고 권유하거나 제안할 때 사용하는 해라체(반말) 청유형 종결어미입니다. 친한 친구나 동년배, 혹은 아랫사람을 상대로 편하게 대화할 때 주로 쓰이며, 윗사람이나 격식을 차려야 하는 자리에서는 사용할 수 없습니다(격식체에서는 '-(으)ㅂ시다'나 '-(으)시지요' 등을 사용). 받침의 유무와 관계없이 동사 어간에 바로 결합합니다.",
      "formation": "동사 어간 + 자",
      "examples": [
        {
          "translation": "우리 영화 보러 가자. 여기서 새로 나온 영화를 보고 싶어요."
        },
        {
          "translation": "밖에 날씨가 좋으니까 산책하러 가자."
        },
        {
          "translation": "지금부터 공부하자. 시험이 가까운데 아직 개념을 잘 모르겠어요."
        },
        {
          "translation": "점심을 맛있게 먹었으니까 잠깐 쉬자. 배가 너무 불러요."
        }
      ]
    },
    "ko_자마자_43": {
      "title": "~자마자 (즉시 연결어미)",
      "shortExplanation": "어떤 일이나 행동이 끝나자마자 곧바로 뒤의 일이나 행동이 이어짐을 나타내는 연결어미입니다.",
      "longExplanation": "'~자마자'는 동사 어간에 붙어 앞 절의 행동이나 사건이 종료되는 즉시 조금의 지체도 없이 뒤 절의 행동이 뒤따름을 나타내는 연결어미입니다. 한국어에서 시간적 즉시성을 나타내는 대표적인 표현으로, 앞 절에는 과거 시제 선어말어미('-았/었-')를 결합할 수 없으며 시제는 항상 뒤 절의 종결어미에서 표현해야 합니다. 어간의 받침 유무와 상관없이 바로 '-자마자'를 연결합니다.",
      "formation": "동사 어간 + 자마자",
      "examples": [
        {
          "translation": "학교에 도착하자마자 친구를 만났어요. 아침에 너무 바빠서 전화도 못 했어요."
        },
        {
          "translation": "문을 열자마자 고양이가 밖으로 나갔어요. 결국 한참 동안 찾아야 했어요."
        },
        {
          "translation": "비행기가 착륙하자마자 핸드폰을 켰어요. 중요한 전화가 올 줄 알았거든요."
        },
        {
          "translation": "집에 돌아오자마자 바로 샤워했어요. 오늘 날씨가 너무 더웠어요."
        }
      ]
    },
    "ko_처럼_44": {
      "title": "~처럼 (비유·유사 조사)",
      "shortExplanation": "명사 뒤에 붙어 모양이나 상태, 행동이 어떤 대상과 비슷함을 나타내는 비교 격조사입니다.",
      "longExplanation": "'~처럼'은 명사 뒤에 결합하여 그 대상과 형태, 상태, 동작 등이 서로 비슷하거나 같음을 비유적으로 나타내는 비교 격조사입니다. 한국어에서 유사성을 나타내는 대표적인 조사로, '어떤 대상과 꼭 같이'라는 뜻을 지니며 대부분의 경우 보조사 '~같이'로 바꾸어 쓸 수 있습니다. 명사의 받침 유무와 상관없이 그대로 '~처럼'을 붙여 씁니다.",
      "formation": "명사 + 처럼 (또는 관형형 어미 + 것 + 처럼)",
      "examples": [
        {
          "translation": "그의 눈은 별처럼 반짝반짝 빛나요."
        },
        {
          "translation": "우리 아버지는 늘 날개가 달린 말처럼 열심히 일해요."
        },
        {
          "translation": "그녀는 물고기처럼 수영을 잘해요."
        },
        {
          "translation": "오늘 하루 종일 나는 새처럼 자유롭게 돌아다녔어요."
        }
      ]
    },
    "ko_쯤_45": {
      "title": "~쯤 (대략·어림의 접미사/보조사)",
      "shortExplanation": "시간, 수량, 정도를 나타내는 명사 뒤에 붙어 대략적인 수량이나 범위를 나타냅니다.",
      "longExplanation": "'쯤'은 시간, 날짜, 수량, 정도 등을 나타내는 명사나 수사, 단위성 의존명사 뒤에 붙어 정확한 수치가 아닌 대략적인 정도나 범위를 나타내는 접미사/보조사입니다. 일상 대화에서 '약'이나 '정도'와 함께 어울려 '약 ~분쯤', '~주일 정도쯤'과 같이 어림수를 완곡하고 자연스럽게 표현할 때 자주 사용됩니다. 앞말에 붙여 씁니다.",
      "formation": "시간·수량·정도 명사 + 쯤",
      "examples": [
        {
          "translation": "시험이 어려우니까 하루에 3시간쯤 공부해야 해요."
        },
        {
          "translation": "저희 집에서 버스로 가면 약 20분쯤 걸릴 것 같아요."
        },
        {
          "translation": "오늘 너무 더워서 온도가 30도쯤 될 것 같아요."
        },
        {
          "translation": "그 책을 다 읽으려면 일주일 정도쯤 걸릴 거예요."
        }
      ]
    },
    "ko_지_46": {
      "title": "~지 않다 (장형 부정 표현)",
      "shortExplanation": "동사나 형용사 어간 뒤에 붙어 어떤 동작이나 상태를 부정함을 나타냅니다.",
      "longExplanation": "'~지 않다'는 용언(동사 및 형용사) 어간에 붙어 그 행위나 상태가 일어나지 않거나 그러하지 아니함을 나타내는 대표적인 '장형 부정' 구문입니다. 용언 앞에 '안'을 붙이는 '단형 부정'에 비해 격식적이고 객관적인 느낌을 주며, 글말이나 공식적인 담화 상황에서 널리 선호됩니다. 보조용언 '않다'는 시제와 종결어미에 따라 다양하게 활용됩니다(예: '않아요', '않았습니다', '않겠어요').",
      "formation": "동사 어간 / 형용사 어간 + 지 않다",
      "examples": [
        {
          "translation": "저는 이번 회의에 참석하지 않을 거예요. 그 시간에 다른 중요한 일이 있어요."
        },
        {
          "translation": "우리 아빠는 담배를 피우지 않아요. 그래서 집 안 공기가 항상 신선해요."
        },
        {
          "translation": "그녀는 밝은 표정을 짓지 않아서 다른 사람들과 거리를 두는 것 같아요."
        },
        {
          "translation": "저는 육류를 먹지 않아요. 그래서 항상 채식 메뉴를 찾아요."
        }
      ]
    },
    "ko_지만_47": {
      "title": "~지만 (대립·역접 연결어미)",
      "shortExplanation": "앞 절과 뒤 절의 내용이 서로 상반되거나 대조됨을 나타내는 연결어미입니다.",
      "longExplanation": "'~지만'은 앞 절에서 사실을 밝히고, 뒤 절에서 그와 상반되거나 대조되는 내용을 연결할 때 사용하는 대표적인 대립·역접 연결어미입니다. 완곡한 배경 설명에 가까운 '-(으)ㄴ/는데'에 비해 앞뒤 절의 상반된 논리 관계가 한층 뚜렷하게 부각됩니다. 과거 시제('-았/었지만')나 추측·의지('-겠지만')와도 자유롭게 결합하며, 받침 유무와 상관없이 용언 어간에 바로 결합합니다(명사에는 '-(이)지만' 결합).",
      "formation": "동사 어간 / 형용사 어간 + 지만, 받침 있는 명사 + 이지만 / 받침 없는 명사 + 지만",
      "examples": [
        {
          "translation": "저는 아주 피곤하지만, 이 일을 끝내야 해서 계속해야 할 것 같아요."
        },
        {
          "translation": "그 음식은 맛이 없지만 영양이 가득해서 먹어야 해요."
        },
        {
          "translation": "여러분 중에는 문제가 어렵다고 느끼는 분도 있겠지만, 포기하면 안 돼요."
        },
        {
          "translation": "그는 성격이 좋지만 명확히 의견을 말하는 것은 좀 어려워해요."
        }
      ]
    },
    "ko_지요죠_48": {
      "title": "~지요/~죠 (확인·동의 종결어미)",
      "shortExplanation": "화자가 이미 알고 있거나 짐작하는 사실을 청자에게 확인하거나 동의를 구할 때 씁니다.",
      "longExplanation": "'~지요'(구어에서는 주로 축약형인 '~죠'로 사용)는 화자가 알고 있는 사실을 상대방에게 재확인하거나 상대방의 동의를 자연스럽게 이끌어낼 때 쓰는 종결어미입니다. 끝을 올리면 '그렇지요?'라는 확인 질문이 되고, 끝을 내리면 자신의 생각이나 사실을 부드럽게 확신하여 말하는 평서문이 됩니다. 과거 시제('-았/었지요')나 추측('-겠지요')과도 자연스럽게 어울리며, 받침 유무와 상관없이 용언 어간에 그대로 결합합니다(명사에는 '-(이)지요' 결합).",
      "formation": "동사 어간 / 형용사 어간 + 지요(줄임말: 죠), 받침 있는 명사 + 이지요 / 받침 없는 명사 + 지요",
      "examples": [
        {
          "translation": "오늘 날씨가 좋아지요?"
        },
        {
          "translation": "우리는 같은 반에 있었지요?"
        },
        {
          "translation": "이 일을 끝내야겠죠?"
        },
        {
          "translation": "그 영화 정말 재미있었지요?"
        }
      ]
    },
    "ko_하고_49": {
      "title": "~하고 (접속·동반 조사)",
      "shortExplanation": "명사와 명사를 대등하게 이어 주거나('와/과'), 어떤 행동을 함께 하는 대상을 나타냅니다('함께').",
      "longExplanation": "'~하고'는 구어체 일상 대화에서 가장 빈번하게 쓰이는 접속 및 동반 격조사입니다. (1) 둘 이상의 사물이나 사람 명사를 나열하여 대등하게 이어 줄 때('그리고', '와/과'); (2) 동작을 함께 하는 동반자 명사 뒤에 붙어 '그 대상과 함께'라는 뜻을 나타낼 때 사용됩니다. 문어체적 성격이 강한 '~와/과'에 비해 부드럽고 자연스러운 대화체 표현이며, 명사의 받침 유무와 상관없이 그대로 결합합니다.",
      "formation": "명사1 + 하고 + 명사2(나열: 와/과) / 명사 + 하고(동반: 누구와 함께)",
      "examples": [
        {
          "translation": "저는 커피하고 도넛을 주문했어요."
        },
        {
          "translation": "우리는 함께 하고 이야기를 나누며 즐거운 시간을 보냈어요."
        },
        {
          "translation": "나는 딸기하고 바나나를 믹서에 넣어 스무디를 만들었어요."
        },
        {
          "translation": "그는 친구하고 축구를 하려고 공원에 갔어요."
        }
      ]
    },
    "ko_하기로_50": {
      "title": "~하기로 하다 (결정·약속 표현)",
      "shortExplanation": "어떤 행동을 하기로 결정하거나 약속했음을 나타내는 표현입니다.",
      "longExplanation": "'~하기로 하다'(또는 결심·결정을 강조하는 '~하기로 결정하다/결심하다')는 동사 어간 뒤에 결합하여 장차 어떤 행동을 실행하겠다는 개인의 다짐이나 다른 사람과의 약속, 합의된 계획을 나타냅니다. 결정이나 약속은 발화 이전에 이미 성립된 경우가 대부분이므로 주로 과거형인 '~기로 했다'의 형태로 많이 사용됩니다. 받침 유무와 관계없이 동사 어간에 바로 결합합니다.",
      "formation": "동사 어간 + 기로 하다 (또는 결정하다 / 결심하다)",
      "examples": [
        {
          "translation": "우리는 내일 서울로 가기로 결정했어요. 거기서 친구들을 만나려고요."
        },
        {
          "translation": "나는 다음 달에 새로운 일을 시작하기로 결심했어요. 지금 하는 일이 너무 지루하거든요."
        },
        {
          "translation": "우리 가족은 다음 주말에 피크닉 가기로 했어요. 날씨가 좋을 예정이니까요."
        },
        {
          "translation": "나는 하루에 한 시간 독서하기로 했어요. 책을 읽으면 지식이 늘어나니까요."
        }
      ]
    },
    "ko_하기는_51": {
      "title": "~기는 하다 (시인·대조 표현)",
      "shortExplanation": "앞의 사실이나 상태를 일단 인정하면서도 뒤 절에서 그에 대한 제한이나 반대 의견을 제시할 때 씁니다.",
      "longExplanation": "'~기는 하다'(구어에서는 주로 축약형인 '~긴 하다'로 쓰이며, 연결형으로 '~기는 하지만', '~기는 한데', '~기는 해도'의 형태로 자주 쓰임)는 앞 절의 내용이나 상태를 일단 그렇다고 시인하고 수긍하면서도, 뒤 절에서 그에 부합하지 않는 단점, 제한 조건, 반대되는 상황을 덧붙일 때 사용하는 표현입니다. 용언 어간의 받침 유무와 상관없이 그대로 '-기는 하다'가 결합합니다.",
      "formation": "동사 어간 / 형용사 어간 + 기는 하다(줄임말: 긴 하다; 연결형: 기는 하지만 / 기는 한데 / 기는 해도)",
      "examples": [
        {
          "translation": "날씨가 추웠기는 했지만, 우리는 아직도 즐거운 시간을 보냈어요."
        },
        {
          "translation": "이 새별을 좋아하기는 해도, 너무 비싸서 사기 어려워요."
        },
        {
          "translation": "요리를 잘하긴 하나, 준비에 많은 시간과 노력이 필요해요."
        },
        {
          "translation": "그는 성격이 좋기는 한데, 종종 늦게 오는 습관이 있어요."
        }
      ]
    },
    "ko_하기보다_52": {
      "title": "~하기보다 (선택·비교 표현)",
      "shortExplanation": "두 가지 행동이나 상태를 비교하여 뒤의 행동을 더 선호하거나 낫다고 여김을 나타냅니다.",
      "longExplanation": "'~하기보다'(보조사 '는'을 붙여 강조한 '~하기보다는' 형태로도 자주 쓰임)는 동사 어간 뒤에 붙어 두 가지 행동, 선택지, 상황을 서로 비교 대조할 때 사용하는 비교 표현입니다. 앞선 행동보다 뒤에 제시되는 행동이 더 바람직하거나 효율적이라는 가치 판단이나 주관적 선호를 나타내며, 어간의 받침 유무와 상관없이 바로 결합합니다.",
      "formation": "동사 어간 + 기보다 (강조형: 기보다는)",
      "examples": [
        {
          "translation": "저는 차를 운전하기보다 버스를 타는 게 더 편해요."
        },
        {
          "translation": "음식을 사 먹기보다 직접 요리하는 게 더 건강해요."
        },
        {
          "translation": "집에서 일하기보다 사무실에서 작업하는 게 더 생산적이라고 생각해요."
        },
        {
          "translation": "돈을 벌기보다 친구들과 함께 시간을 보내는 게 더 중요하다고 생각해요."
        }
      ]
    },
    "ko_하나_53": {
      "title": "~하나 / ~나 (자문·의문 종결어미)",
      "shortExplanation": "혼잣말이나 친한 대화에서 어떤 상황에 대해 스스로 의아해하거나 자문할 때 쓰는 종결어미입니다.",
      "longExplanation": "'~하나'(의문형 어미 '-나 / -(으)ㄴ가' 계열)는 주로 혼잣말이나 비격식 구어에서 화자가 쉽게 납득하기 어려운 상황에 직면했을 때 고개를 갸웃거리며 스스로에게 묻거나 의구심을 나타낼 때 사용됩니다. 한국어에서 자문(自問)의 뉘앙스를 자연스럽게 표현하며, 동사 뒤에서는 주로 '-나'('하다' 동사의 경우 '하나'), 형용사 뒤에서는 '-(으)ㄴ가'의 형태로 나타납니다.",
      "formation": "동사 어간 + 하나(또는 나) / 형용사 어간 + 은가/ㄴ가",
      "examples": [
        {
          "translation": "나는 왜 항상 혼자인지 모르겠는 하나."
        },
        {
          "translation": "왜 그가 저렇게 말했는지 이해가 안 가는 하나."
        },
        {
          "translation": "자주 연락하던 친구가 갑자기 연락이 안 오는 하나."
        },
        {
          "translation": "공부를 많이 했는데도 시험을 못 본다는 하나."
        }
      ]
    },
    "ko_하다가_54": {
      "title": "~다가 / ~하다가 (중단·전환 연결어미)",
      "shortExplanation": "어떤 행동이나 상태가 진행되던 도중에 중단되거나 다른 행동이나 상황으로 바뀜을 나타냅니다.",
      "longExplanation": "'~하다가'(연결어미 '-다가'의 형태)는 동사 어간에 붙어 어떤 동작이나 상태가 계속 이어지는 중간에 그 일이 중단되거나 다른 상태로 전환됨, 혹은 예기치 않은 다른 사건이 끼어듦을 나타내는 연결어미입니다. 두 절의 주어는 대개 동일인이어야 하며, 앞 절의 행위가 완료되지 않은 상태에서 뒤 절의 사건이 발생한다는 점에서 시간적 단절과 전환의 뉘앙스를 강하게 풍깁니다. 받침 유무와 상관없이 동사 어간에 바로 결합합니다.",
      "formation": "동사 어간 + 다가 (하다 동사의 경우: 하다가)",
      "examples": [
        {
          "translation": "청소를 하다가 우연히 오래된 사진을 발견했어요."
        },
        {
          "translation": "저는 책을 읽다가 잠이 들었어요."
        },
        {
          "translation": "친구와 이야기를 하다가 시간을 잊었어요."
        },
        {
          "translation": "운전을 하다가 길을 잃었습니다."
        }
      ]
    },
    "ko_하다가_55": {
      "title": "~다가 말다 / ~하다가 말다 (행동 중단 표현)",
      "shortExplanation": "어떤 행동을 진행하던 도중에 끝까지 마치지 않고 중도에 그만둠을 나타냅니다.",
      "longExplanation": "'~다가 말다'(하다 동사의 경우 '~하다가 말다')는 동사 어간에 붙어 이미 시작된 행동을 완료하지 않은 채 중간에 그만두거나 포기함을 나타내는 관용 표현입니다. 연결어미 '-다가'에 중단의 뜻을 지닌 보조동사 '말다'가 결합한 형태로, 주로 과거형인 '~다가 말았다 / 말았어요'의 꼴로 자주 쓰입니다. 어간의 받침 유무와 상관없이 그대로 결합합니다.",
      "formation": "동사 어간 + 다가 말다 (하다 동사의 경우: 하다가 말다)",
      "examples": [
        {
          "translation": "공부하다가 말았어요, 왜냐하면 알람이 안 울려서 시간을 잊어버렸어요."
        },
        {
          "translation": "친구가 집에 왔기 때문에 저는 밥 요리하다가 말았어요."
        },
        {
          "translation": "운동하다가 말았어요, 왜냐하면 비가 너무 많이 와서입니다."
        },
        {
          "translation": "책을 읽다가 말았어요, 왜냐하면 갑자기 잠이 왔거든요."
        }
      ]
    }
  }
}

# Validation
with open('/Users/huyphan/Downloads/web-app/lingua-tube/scripts/grammar-chunks/input/ko/ko_chunk_09.json') as f:
    input_chunk = json.load(f)

input_ids = [item['id'] for item in input_chunk]
print(f"Total input patterns: {len(input_ids)}")

for lang in ['vi', 'zh', 'ja', 'ko']:
    assert len(output_data[lang]) == len(input_ids), f"Length mismatch for {lang}"
    for item in input_chunk:
        pid = item['id']
        assert pid in output_data[lang], f"Missing {pid} in {lang}"
        gt = output_data[lang][pid]
        assert 'title' in gt and gt['title']
        assert 'shortExplanation' in gt and gt['shortExplanation']
        assert 'longExplanation' in gt and gt['longExplanation']
        assert 'formation' in gt and gt['formation']
        assert 'examples' in gt and len(gt['examples']) == len(item['examples']), f"Examples count mismatch for {pid} in {lang}"
        for ex in gt['examples']:
            assert 'translation' in ex and ex['translation']

# Check for forbidden English linguistic placeholders in explanations and formations
forbidden = [r'\bNoun\b', r'\bVerb\b', r'\bAdjective\b', r'\bStem\b', r'\bSubject\b', r'\bObject\b', r'\bClause\b']
for lang in ['vi', 'zh', 'ja', 'ko']:
    for pid, gt in output_data[lang].items():
        text_to_check = gt['formation'] + ' ' + gt['shortExplanation'] + ' ' + gt['longExplanation']
        for pattern in forbidden:
            matches = re.findall(pattern, text_to_check, re.IGNORECASE)
            if matches:
                print(f"WARNING: Forbidden match '{matches}' in {lang} {pid}")

output_path = '/Users/huyphan/Downloads/web-app/lingua-tube/scripts/grammar-chunks/output/ko_chunk_09.json'
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(output_data, f, ensure_ascii=False, indent=2)

print(f"Successfully generated and wrote {output_path}")

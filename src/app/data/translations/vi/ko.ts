import { GrammarTranslation } from '../../../models/grammar.model';

export const GRAMMAR_VI_KO: Record<string, GrammarTranslation> = {
  "vi_a1_01": {
    "title": "là — 계사 (~이다)",
    "shortExplanation": "주어와 명사(직업·신분·이름)를 연결합니다. 형용사 앞에는 쓰지 않습니다.",
    "longExplanation": "베트남어 \"là\"는 명사 술어에만 쓰여 'A는 B이다'를 나타냅니다. 형용사는 자체가 서술어 역할을 하므로 앞에 \"là\"를 두지 않습니다.",
    "formation": "주어 + là + 명사",
    "examples": [{ "translation": "저는 학생입니다." }, { "translation": "이 사람은 제 친구입니다." }]
  },
  "vi_a1_02": {
    "title": "không phải — 명사 부정 (~이 아니다)",
    "shortExplanation": "명사 정체성이나 서술을 부정할 때 사용합니다.",
    "longExplanation": "\"là\"를 부정할 때는 \"không là\" 대신 \"không phải (là)\"를 쓰는 것이 자연스럽습니다.",
    "formation": "주어 + không phải (là) + 명사",
    "examples": [{ "translation": "그는 의사가 아닙니다." }, { "translation": "이것은 제 것이 아닙니다." }]
  },
  "vi_a1_03": {
    "title": "không — 일반 부정 (~지 않다 / 안 ~하다)",
    "shortExplanation": "동사나 형용사 바로 앞에 놓아 부정합니다.",
    "longExplanation": "동사와 형용사 직전에 \"không\"을 두면 부정이 됩니다. 베트남어는 인칭이나 시제에 따른 동사 어형 변화가 없습니다.",
    "formation": "주어 + không + 동사 / 형용사",
    "examples": [{ "translation": "오늘 저는 바쁘지 않습니다." }, { "translation": "그녀는 커피를 마시지 않습니다." }]
  },
  "vi_a1_04": {
    "title": "đang — 진행상 (~하고 있다)",
    "shortExplanation": "말하는 시점이나 기준 시점에 진행 중인 동작을 나타냅니다.",
    "longExplanation": "본동사 바로 앞에 \"đang\"을 두어 현재 진행 중인 동작임을 강조합니다.",
    "formation": "주어 + đang + 동사",
    "examples": [{ "translation": "저는 베트남어를 공부하고 있습니다." }, { "translation": "비가 많이 내리고 있습니다." }]
  },
  "vi_a1_05": {
    "title": "đã — 과거·완료 (이미 ~했다)",
    "shortExplanation": "과거에 일어난 일이나 이미 완료된 상태를 나타냅니다.",
    "longExplanation": "동사나 형용사 앞에 쓰며, 문장 끝의 \"rồi(이미)\"와 함께 완료를 자주 나타냅니다.",
    "formation": "주어 + đã + 동사 (+ rồi)",
    "examples": [{ "translation": "저는 이미 아침을 먹었습니다." }, { "translation": "지난주에 그들은 하노이에 갔습니다." }]
  },
  "vi_a1_06": {
    "title": "sẽ — 미래 표지 (~할 것이다)",
    "shortExplanation": "예정, 계획, 약속이나 미래의 추측을 나타냅니다.",
    "longExplanation": "동사 앞에 두어 미래 시점을 표시합니다. 임박함을 뜻하는 \"sắp\"보다 시간 폭이 넓습니다.",
    "formation": "주어 + sẽ + 동사",
    "examples": [{ "translation": "내일 당신에게 전화하겠습니다." }, { "translation": "우리는 여기에 3일 동안 머무를 것입니다." }]
  },
  "vi_a1_07": {
    "title": "có thể — 능력·가능성 (~할 수 있다 / ~일지도 모른다)",
    "shortExplanation": "능력, 허락 또는 가능성을 나타냅니다.",
    "longExplanation": "동사 앞에 \"có thể\"(부정은 \"không thể\")를 놓아 사용합니다.",
    "formation": "주어 + (không) có thể + 동사",
    "examples": [{ "translation": "조금 더 천천히 말씀해 주실 수 있나요?" }, { "translation": "오늘은 갈 수 없습니다." }]
  },
  "vi_a1_08": {
    "title": "muốn — 희망·의도 (~하고 싶다 / ~을 원하다)",
    "shortExplanation": "사물을 원하거나 어떤 행동을 하고 싶음을 표현합니다.",
    "longExplanation": "\"muốn\" 뒤에 명사나 동사를 바로 이어서 사용합니다.",
    "formation": "주어 + muốn + 동사 / 명사",
    "examples": [{ "translation": "밀크티를 마시고 싶습니다." }, { "translation": "이번 주말에 어디 가고 싶어요?" }]
  },
  "vi_a1_09": {
    "title": "những — 부정 복수 표지",
    "shortExplanation": "전체 집합이 아닌 여럿의 가산 명사를 복수로 표시합니다.",
    "longExplanation": "분류사+명사 앞에 놓아 일부 복수를 가리킵니다(전체 집단을 가리키는 \"các\"과 대비).",
    "formation": "những + (분류사) + 명사",
    "examples": [{ "translation": "저는 이 음식들을 좋아합니다." }, { "translation": "처음 며칠은 매우 힘들었습니다." }]
  },
  "vi_a1_10": {
    "title": "các — 전체 집합 복수 (모든 ~ / 여러분)",
    "shortExplanation": "특정 집단이나 청자 전체를 아우르는 복수를 나타냅니다.",
    "longExplanation": "집단 명사 앞이나 \"các bạn(여러분)\" 같은 인사말에 널리 쓰입니다.",
    "formation": "các + (분류사) + 명사",
    "examples": [{ "translation": "여러분, 안녕하세요!" }, { "translation": "학생들이 과제를 하고 있습니다." }]
  },
  "vi_a1_11": {
    "title": "hơn — 비교급 (~보다 더)",
    "shortExplanation": "두 대상의 성질이나 정도를 비교합니다.",
    "longExplanation": "형용사·부사 뒤에 \"hơn + 비교 대상\"을 이어 줍니다.",
    "formation": "A + 형용사 + hơn + B",
    "examples": [{ "translation": "오늘이 어제보다 더 덥습니다." }, { "translation": "이 셔츠가 더 예쁩니다." }]
  },
  "vi_a1_12": {
    "title": "nhất — 최상급 (가장 ~한)",
    "shortExplanation": "성질이나 선호도가 가장 높음을 나타냅니다.",
    "longExplanation": "형용사나 \"thích nhất(가장 좋아하다)\" 같은 동사 바로 뒤에 붙입니다.",
    "formation": "형용사 / 동사 + nhất",
    "examples": [{ "translation": "여기가 가장 맛있는 식당입니다." }, { "translation": "저는 가을을 가장 좋아합니다." }]
  },
  "vi_a1_13": {
    "title": "bao nhiêu — 수량·가격 의문사 (얼마 / 몇)",
    "shortExplanation": "가격, 수량, 시간 등을 물을 때 씁니다.",
    "longExplanation": "가격 질문(\"bao nhiêu tiền?\")에서는 주로 문장 끝에 옵니다.",
    "formation": "명사 + bao nhiêu / giá bao nhiêu",
    "examples": [{ "translation": "이 컵은 얼마인가요?" }, { "translation": "시간이 얼마나 필요하신가요?" }]
  },
  "vi_a1_14": {
    "title": "tại sao — 이유 의문사 (왜)",
    "shortExplanation": "원인이나 이유를 묻는 의문문을 만듭니다.",
    "longExplanation": "보통 문장 맨 앞에 놓아 '왜 ~합니까?'를 묻습니다.",
    "formation": "Tại sao + 주어 + 동사?",
    "examples": [{ "translation": "왜 베트남어를 배우시나요?" }, { "translation": "어제 왜 전화하지 않으셨나요?" }]
  },
  "vi_a1_15": {
    "title": "như thế nào — 방법·상태 의문사 (어떻게 / 어떠한가)",
    "shortExplanation": "방법, 수단, 상태나 인상을 묻습니다.",
    "longExplanation": "동사나 주어 뒤에 놓아 '어떻게 ~하는지' 또는 '어떠한지'를 묻습니다.",
    "formation": "주어 + 동사 + như thế nào?",
    "examples": [{ "translation": "일은 잘 되어 가나요?" }, { "translation": "이 요리는 어떻게 만드나요?" }]
  },
  "vi_a1_16": {
    "title": "nhé — 친근한 제안·부탁 종결어미 (~자 / ~해)",
    "shortExplanation": "문장 끝에 붙여 제안이나 요청을 부드럽게 만듭니다.",
    "longExplanation": "친한 사이나 아랫사람에게 '그렇지?', '~하자'처럼 따뜻하게 말할 때 씁니다.",
    "formation": "제안·요청문 + nhé",
    "examples": [{ "translation": "우리 점심 먹으러 가자!" }, { "translation": "나한테 문자 보내는 거 잊지 마." }]
  },
  "vi_a2_01": {
    "title": "phải — 의무·필요 (~해야 한다)",
    "shortExplanation": "외적 의무, 규칙 또는 필요성을 나타냅니다.",
    "longExplanation": "동사 앞에 둡니다. \"không phải\"는 '~이 아니다'라는 뜻이므로 '할 필요가 없다'는 \"không cần phải\"를 씁니다.",
    "formation": "주어 + phải + 동사",
    "examples": [{ "translation": "오늘 보고서를 끝내야 합니다." }, { "translation": "내일은 일찍 일어나야 해요." }]
  },
  "vi_a2_02": {
    "title": "được — 긍정 피동·허락·성취",
    "shortExplanation": "긍정적 피동(~받다), 허가(~해도 되다), 결과 달성을 표현합니다.",
    "longExplanation": "동사 앞에서는 허가·긍정 피동을, 동사 뒤에서는 능력 달성을 나타냅니다.",
    "formation": "주어 + được + (행위자) + 동사",
    "examples": [{ "translation": "그녀는 선생님께 칭찬을 받았습니다." }, { "translation": "여기서 사진을 찍어도 되나요?" }]
  },
  "vi_a2_03": {
    "title": "bị — 피해·불리한 피동 (~당하다 / ~에 걸리다)",
    "shortExplanation": "원치 않거나 부정적인 일을 겪을 때 사용합니다.",
    "longExplanation": "질병, 교통 체증, 고장 등 부정적 상황과 결합합니다. 좋은 결과에는 \"được\"을 씁니다.",
    "formation": "주어 + bị + (원인) + 동사 / 부정적 형용사",
    "examples": [{ "translation": "거의 한 시간이나 차가 막혔어요." }, { "translation": "제 휴대폰 배터리가 다 닳았어요." }]
  },
  "vi_a2_04": {
    "title": "sắp — 근접 미래 (곧 ~하려 하다)",
    "shortExplanation": "아주 가까운 시일 내에 일어날 일을 나타냅니다.",
    "longExplanation": "동사나 계절 명사 앞에 놓이며 \"sẽ\"보다 시간적으로 훨씬 임박해 있습니다.",
    "formation": "주어 + sắp + 동사",
    "examples": [{ "translation": "기차가 곧 출발합니다." }, { "translation": "우리 거의 다 왔나요?" }]
  },
  "vi_a2_05": {
    "title": "vừa — 직전의 과거 (방금 ~했다)",
    "shortExplanation": "동작이 불과 조금 전에 끝났음을 나타냅니다.",
    "longExplanation": "강조를 위해 \"vừa mới\" 형태로 자주 쓰입니다.",
    "formation": "주어 + vừa (mới) + 동사",
    "examples": [{ "translation": "그는 방금 사무실을 나섰습니다." }, { "translation": "그 소식을 방금 들었습니다." }]
  },
  "vi_a2_06": {
    "title": "vẫn — 지속 (여전히 ~하다)",
    "shortExplanation": "상태나 행동이 변함없이 이어지고 있음을 나타냅니다.",
    "longExplanation": "\"vẫn còn\" 형태로 시간 경과나 예상에도 계속됨을 강조합니다.",
    "formation": "주어 + vẫn (còn) + 동사 / 형용사",
    "examples": [{ "translation": "밤늦었는데 아직도 안 자고 있어요?" }, { "translation": "저 가게는 아직 열려 있습니다." }]
  },
  "vi_a2_07": {
    "title": "chưa bao giờ — 경험 부정 (한 번도 ~한 적 없다)",
    "shortExplanation": "지금까지 살아오며 한 번도 경험하지 않았음을 말합니다.",
    "longExplanation": "\"chưa(아직)\"와 \"bao giờ(언제)\"를 결합해 동사 앞에 둡니다.",
    "formation": "주어 + chưa bao giờ + 동사",
    "examples": [{ "translation": "저는 달랏에 한 번도 가 본 적이 없습니다." }, { "translation": "이렇게 아름다운 풍경은 처음 봅니다." }]
  },
  "vi_a2_08": {
    "title": "đã từng — 과거 경험 (~해 본 적이 있다)",
    "shortExplanation": "과거에 적어도 한 번 이상 겪었던 경험을 강조합니다.",
    "longExplanation": "구체적 시점보다 경험 자체에 초점을 둡니다.",
    "formation": "주어 + (đã) từng + 동사",
    "examples": [{ "translation": "하노이 쌀국수를 먹어 본 적 있나요?" }, { "translation": "그녀는 예전에 일본에 산 적이 있습니다." }]
  },
  "vi_a2_09": {
    "title": "vì ... nên — 인과 관계 (~때문에 그래서 ~)",
    "shortExplanation": "이유 절과 결과 절을 호응시켜 연결합니다.",
    "longExplanation": "베트남어에서는 앞 절의 \"vì\"와 뒷 절의 \"nên\"을 함께 쓰는 것이 자연스럽습니다.",
    "formation": "(Bởi) vì + 원인, nên + 결과",
    "examples": [{ "translation": "비가 와서 우리는 집에 있었습니다." }, { "translation": "너무 바빠서 그는 전화하는 것을 깜빡했습니다." }]
  },
  "vi_a2_10": {
    "title": "nếu ... thì — 조건문 (만약 ~라면 ~)",
    "shortExplanation": "가정·조건과 그에 따른 결과를 표현합니다.",
    "longExplanation": "\"nếu\"가 조건을, \"thì\"가 결과를 이끕니다.",
    "formation": "Nếu + 조건, (thì) + 결과",
    "examples": [{ "translation": "시간이 있으면 잠깐 들르자." }, { "translation": "날씨가 맑으면 바다에 갈 겁니다." }]
  },
  "vi_a2_11": {
    "title": "trước khi — 선행 시간 (~하기 전에)",
    "shortExplanation": "어떤 사건이 일어나기 전의 시점을 지정합니다.",
    "longExplanation": "절 전체나 동사구 앞에 올 수 있습니다.",
    "formation": "Trước khi + (주어) + 동사, 주절",
    "examples": [{ "translation": "외출하기 전에 불 끄는 것을 잊지 마세요." }, { "translation": "밥 먹기 전에 먼저 손을 씻읍시다." }]
  },
  "vi_a2_12": {
    "title": "sau khi — 후행 시간 (~한 후에)",
    "shortExplanation": "앞선 동작이 끝난 뒤 이어지는 행동을 나타냅니다.",
    "longExplanation": "완료된 사건 뒤에 주절(흔히 \"thì\" 동반)을 연결합니다.",
    "formation": "Sau khi + (주어) + 동사, (thì) + 주절",
    "examples": [{ "translation": "졸업한 후에 바로 일을 시작했습니다." }, { "translation": "저녁 식사 후에 차 마실래요?" }]
  },
  "vi_a2_13": {
    "title": "giống như — 유사 비교 (~처럼 / ~와 비슷한)",
    "shortExplanation": "두 대상이나 상황의 닮은 점을 비교합니다.",
    "longExplanation": "명사 사이나 묘사 절 앞에 씁니다.",
    "formation": "A + giống (như) + B",
    "examples": [{ "translation": "억양이 하노이 사람과 똑같네요." }, { "translation": "오늘 날씨가 꼭 여름처럼 덥습니다." }]
  },
  "vi_a2_14": {
    "title": "thử — 시도 (~해 보다)",
    "shortExplanation": "어떤 일을 시험 삼아 해 보거나 맛보는 뜻을 더합니다.",
    "longExplanation": "동사 바로 뒤에 오며 \"xem sao\"와 자주 결합합니다.",
    "formation": "동사 + thử (+ xem)",
    "examples": [{ "translation": "이 분보 요리를 한번 드셔 보세요." }, { "translation": "제가 그녀에게 한번 전화해 볼게요." }]
  },
  "vi_a2_15": {
    "title": "để — 목적 (~하기 위해)",
    "shortExplanation": "행동의 목표나 의도를 밝힙니다.",
    "longExplanation": "동사구나 새로운 주어를 가진 목적 절을 이끕니다.",
    "formation": "주절 + để + (주어) + 동사",
    "examples": [{ "translation": "운동을 하기 위해 일찍 일어납니다." }, { "translation": "모두가 들을 수 있게 크게 말해 주세요." }]
  },
  "vi_a2_16": {
    "title": "chưa — 미완료 (아직 ~안 했다 / ~했나요?)",
    "shortExplanation": "동사 앞에서는 '아직 ~않다', 문장 끝에서는 '벌써 ~했나요?'를 묻습니다.",
    "longExplanation": "일상 회화에서 가장 활용도가 높은 완료 여부 표현입니다.",
    "formation": "주어 + chưa + 동사 / 문장 + chưa?",
    "examples": [{ "translation": "숙제는 다 끝냈나요?" }, { "translation": "죄송해요, 아직 메시지를 못 봤어요." }]
  },
  "vi_b1_01": {
    "title": "mặc dù ... nhưng — 양보 대조 (비록 ~하지만)",
    "shortExplanation": "기대에 어긋나는 두 사실을 대조해 연결합니다.",
    "longExplanation": "베트남어에서는 앞 절의 \"mặc dù\"와 뒷 절의 \"nhưng\"을 함께 짝지어 씁니다.",
    "formation": "Mặc dù + 절1, nhưng + 절2",
    "examples": [{ "translation": "날씨가 추운데도 많은 사람이 산책을 합니다." }, { "translation": "매우 바빴지만 그녀는 저를 도와주었습니다." }]
  },
  "vi_b1_02": {
    "title": "tuy ... nhưng — 가벼운 양보 (~이긴 하지만)",
    "shortExplanation": "구어와 문어 모두에서 간결하게 쓰는 양보 구문입니다.",
    "longExplanation": "\"mặc dù ... nhưng\"보다 가볍고 형용사나 짧은 절 연결에 자주 쓰입니다.",
    "formation": "Tuy + 절1, nhưng + 절2",
    "examples": [{ "translation": "가게는 작지만 매우 아늑합니다." }, { "translation": "배운 지 석 달밖에 안 됐는데 정말 잘하시네요." }]
  },
  "vi_b1_03": {
    "title": "không những ... mà còn — 점층 첨가 (~뿐만 아니라 ~도)",
    "shortExplanation": "두 가지 특징이나 행동이 모두 해당함을 강조합니다.",
    "longExplanation": "뒤의 항목에 무게를 두며 \"không chỉ ... mà còn\"과 바꿔 쓸 수 있습니다.",
    "formation": "không những + A + mà còn + B",
    "examples": [{ "translation": "그는 똑똑할 뿐만 아니라 매우 성실합니다." }, { "translation": "이 음식은 맛있을 뿐만 아니라 값도 저렴합니다." }]
  },
  "vi_b1_04": {
    "title": "vừa ... đã — 즉각 연속 (~하자마자 바로)",
    "shortExplanation": "첫 동작에 이어 두 번째 일이 매우 빠르게 일어났음을 강조합니다.",
    "longExplanation": "\"vừa mới ... đã\" 형태로 놀라운 속도를 부각하기도 합니다.",
    "formation": "Vừa (mới) + 동작1, đã + 동작2",
    "examples": [{ "translation": "눕자마자 바로 잠이 들어 버렸습니다." }, { "translation": "비가 그치자마자 무지개가 떴습니다." }]
  },
  "vi_b1_05": {
    "title": "càng ... càng — 비례 변화 (~할수록 더 ~하다)",
    "shortExplanation": "앞의 정도가 커질수록 뒤의 정도도 함께 커짐을 나타냅니다.",
    "longExplanation": "두 형용사·부사·동사 앞에 배치합니다.",
    "formation": "(주어) + càng + A + càng + B",
    "examples": [{ "translation": "연습을 많이 할수록 더 자연스럽게 말하게 됩니다." }, { "translation": "밤이 깊어질수록 더 추워집니다." }]
  },
  "vi_b1_06": {
    "title": "có vẻ — 외관상 인상 (~인 것 같다 / ~해 보이다)",
    "shortExplanation": "겉으로 드러난 단서를 바탕으로 조심스러운 인상을 말합니다.",
    "longExplanation": "단정 대신 관찰에 따른 추정이나 느낌을 부드럽게 전달합니다.",
    "formation": "주어 + có vẻ (+ như) + 형용사 / 절",
    "examples": [{ "translation": "오늘 좀 피곤해 보이시네요." }, { "translation": "이 계획은 꽤 실현 가능해 보입니다." }]
  },
  "vi_b1_07": {
    "title": "hình như — 불확실한 추측 (아마 ~인 듯하다)",
    "shortExplanation": "확신이 100% 없을 때의 짐작이나 희미한 기억을 나타냅니다.",
    "longExplanation": "문장 앞이나 술어 앞에 놓여 완곡하게 추측합니다.",
    "formation": "Hình như + 절",
    "examples": [{ "translation": "밖에 축제가 열리고 있는 것 같아요." }, { "translation": "어디선가 당신을 뵌 적이 있는 것 같습니다." }]
  },
  "vi_b1_08": {
    "title": "thay vì — 대체 선택 (~하는 대신에)",
    "shortExplanation": "예상되던 선택 A 대신 다른 대안 B를 택함을 나타냅니다.",
    "longExplanation": "피하거나 대체되는 동사구·명사구 앞에 둡니다.",
    "formation": "Thay vì + A, (thì) + B",
    "examples": [{ "translation": "오토바이를 타는 대신 오늘은 걸어갑시다." }, { "translation": "그녀는 영화 보는 대신 책 읽기를 택했습니다." }]
  },
  "vi_b1_09": {
    "title": "ngay khi — 동시 즉발 (~하자마자 바로)",
    "shortExplanation": "조건 사건이 발생한 바로 그 순간 주절 동작이 이어짐을 강조합니다.",
    "longExplanation": "\"ngay sau khi\", \"ngay lúc\"와 뜻이 통합니다.",
    "formation": "Ngay khi + 절1, 절2",
    "examples": [{ "translation": "공항에 도착하자마자 엄마에게 문자 보내세요." }, { "translation": "그가 들어오는 순간 바로 알아보았습니다." }]
  },
  "vi_b1_10": {
    "title": "ngoài ra — 추가 전개 (게다가 / 그 밖에)",
    "shortExplanation": "말하기나 글쓰기에서 보조 논점이나 추가 정보를 덧붙입니다.",
    "longExplanation": "주로 다음 문장의 서두에서 쉼표와 함께 쓰입니다.",
    "formation": "Ngoài ra, + 절",
    "examples": [{ "translation": "게다가 매일 충분한 물을 마시는 것도 좋습니다." }, { "translation": "이 방은 매우 넓습니다. 게다가 발코니도 있습니다." }]
  },
  "vi_b1_11": {
    "title": "thậm chí — 극단 강조 (심지어 ~까지)",
    "shortExplanation": "예외적이거나 놀라운 극단 사례를 들어 강조합니다.",
    "longExplanation": "주어나 동사 앞에 쓰며 흔히 \"cũng\", \"còn\"과 어울립니다.",
    "formation": "Thậm chí + (주어) + còn / cũng + 동사",
    "examples": [{ "translation": "그는 너무 바빠서 점심 먹을 시간조차 없었습니다." }, { "translation": "원어민조차 때때로 이 단어를 헷갈립니다." }]
  },
  "vi_b1_12": {
    "title": "dần dần — 점진적 변화 (점점 / 서서히)",
    "shortExplanation": "시간이 흐르면서 한 걸음씩 변해 가는 양상을 묘사합니다.",
    "longExplanation": "축약형 \"dần\"은 서술어 뒤에 붙어 쓰입니다.",
    "formation": "Dần dần + 절 / 동사 + dần",
    "examples": [{ "translation": "서서히 이곳의 생활 리듬에 익숙해졌습니다." }, { "translation": "모든 일이 차츰 괜찮아질 거예요." }]
  },
  "vi_b1_13": {
    "title": "trừ khi — 예외 조건 (~하지 않는 한)",
    "shortExplanation": "주절의 결과가 달라지는 유일한 예외 조건을 제시합니다.",
    "longExplanation": "보통 주절 뒤에 이어 붙여 예외 상황을 명시합니다.",
    "formation": "주절 + trừ khi + 예외",
    "examples": [{ "translation": "폭풍이 오지 않는 한 7시에 출발합니다." }, { "translation": "급한 일이 없는 한 외출하지 않을 겁니다." }]
  },
  "vi_b1_14": {
    "title": "nhất là — 핵심 부각 (특히)",
    "shortExplanation": "범주 안에서 가장 두드러진 예나 때를 짚어 줍니다.",
    "longExplanation": "명사구나 \"khi + 절\" 앞에 놓여 설명을 선명하게 합니다.",
    "formation": "절, nhất là + 명사 / khi ...",
    "examples": [{ "translation": "하노이는 매우 아름다운데, 특히 가을이 멋집니다." }, { "translation": "특히 환절기에는 건강을 잘 챙기세요." }]
  },
  "vi_b1_15": {
    "title": "ít nhất — 최소 기준 (적어도 / 최소한)",
    "shortExplanation": "수량·시간의 하한선이나 위안이 되는 최소 기준을 제시합니다.",
    "longExplanation": "숫자 앞이나 다행스러움을 표현하는 문장 머리에 씁니다.",
    "formation": "ít nhất (+ là) + 수량 / 절",
    "examples": [{ "translation": "매일 최소한 30분씩 베트남어를 듣습니다." }, { "translation": "적어도 우리는 최선을 다했습니다." }]
  },
  "vi_b1_16": {
    "title": "vô tình — 비의도·우연 (우연히 / 실수로)",
    "shortExplanation": "고의나 계획 없이 우연히 또는 무심코 벌어졌음을 나타냅니다.",
    "longExplanation": "동사 앞 부사로 \"cố tình(일부러)\"과 반대입니다.",
    "formation": "주어 + vô tình + 동사",
    "examples": [{ "translation": "마트에서 우연히 옛 친구를 만났습니다." }, { "translation": "죄송해요, 실수로 그 메시지를 지워 버렸어요." }]
  },
  "vi_b2_01": {
    "title": "chỉ cần ... là — 충분조건 (~하기만 하면 된다)",
    "shortExplanation": "결과를 얻는 데 필요한 최소한의 단순한 조건을 제시합니다.",
    "longExplanation": "조건의 간편함을 부각하며 \"là\"로 결과를 이끕니다.",
    "formation": "Chỉ cần + 조건 + là + 결과",
    "examples": [{ "translation": "꾸준히 듣기 연습만 하면 실력이 늘 것입니다." }, { "translation": "이 버튼만 누르면 기계가 알아서 작동합니다." }]
  },
  "vi_b2_02": {
    "title": "chỉ khi ... mới — 배타적 필요조건 (오직 ~해야만 비로소)",
    "shortExplanation": "특정한 조건이나 시점에만 결과가 성립함을 제한합니다.",
    "longExplanation": "결과 절에 반드시 \"mới\"가 호응해 유일한 경로임을 강조합니다.",
    "formation": "Chỉ khi + 조건 + (주어) + mới + 결과",
    "examples": [{ "translation": "직접 스스로 해 봐야 비로소 문제를 온전히 이해하게 됩니다." }, { "translation": "잃고 나서야 비로소 소중함을 깨닫게 됩니다." }]
  },
  "vi_b2_03": {
    "title": "cho dù — 무조건적 양보 (설령 ~하더라도)",
    "shortExplanation": "어떤 어려움이나 가정에서도 결과가 변하지 않음을 단언합니다.",
    "longExplanation": "\"mặc dù\"보다 가정적 어감이 강하며 \"vẫn\", \"cũng\"과 호응합니다.",
    "formation": "Cho dù + 가정, (thì) + 결과 vẫn ...",
    "examples": [{ "translation": "아무리 바쁘더라도 그는 가족을 위한 시간을 냅니다." }, { "translation": "설령 실패하더라도 후회하지 않을 겁니다." }]
  },
  "vi_b2_04": {
    "title": "bất kể — 조건 불문 (~에 관계없이)",
    "shortExplanation": "어떠한 예외나 차별도 없이 모두 적용됨을 말합니다.",
    "longExplanation": "명사, 의문사(\"bất kể lúc nào\"), 대조 표현이 뒤따릅니다.",
    "formation": "Bất kể + 명사 / 의문사",
    "examples": [{ "translation": "이 가게는 명절에 상관없이 매일 문을 엽니다." }, { "translation": "언제든지 편할 때 질문하셔도 됩니다." }]
  },
  "vi_b2_05": {
    "title": "một mặt ... mặt khác — 균형 대조 (한편으로는 ~ 다른 한편으로는 ~)",
    "shortExplanation": "사안의 두 측면을 객관적으로 나란히 제시합니다.",
    "longExplanation": "토론, 에세이, 장단점 비교에서 널리 활용됩니다.",
    "formation": "Một mặt + 절1, mặt khác + 절2",
    "examples": [{ "translation": "이 일은 한편으로는 급여가 높지만, 다른 한편으로는 압박감이 매우 큽니다." }, { "translation": "우리는 한편으로는 비용을 절감하고, 다른 한편으로는 품질을 지켜야 합니다." }]
  },
  "vi_b2_06": {
    "title": "thà ... còn hơn — 단호한 선호 (차라리 ~하는 편이 낫다)",
    "shortExplanation": "덜 바람직한 대안 B를 피하고 A를 선택하는 입장을 밝힙니다.",
    "longExplanation": "선호 대안을 \"thà\" 뒤에, 거부 대안을 \"còn hơn\" 뒤에 배치합니다.",
    "formation": "Thà + 대안A + còn hơn (là) + 대안B",
    "examples": [{ "translation": "서두르다 실수하는 것보다 천천히 확실하게 가는 편이 낫습니다." }, { "translation": "빗속에 나가는 것보다 차라리 집에서 책 읽는 편이 낫겠어요." }]
  },
  "vi_b2_07": {
    "title": "nhờ có — 긍정적 원인 (~덕분에)",
    "shortExplanation": "좋은 결과를 이끈 사람, 도구, 여건에 감사를 표합니다.",
    "longExplanation": "긍정적 원인 전용이며, 부정적 원인에는 \"tại\"나 \"do\"를 씁니다.",
    "formation": "Nhờ (có) + 긍정적 원인, 좋은 결과",
    "examples": [{ "translation": "당신의 도움 덕분에 프로젝트가 일정에 맞출 수 있었습니다." }, { "translation": "매일 팟캐스트를 들은 덕분에 반응 속도가 눈에 띄게 좋아졌습니다." }]
  },
  "vi_b2_08": {
    "title": "so với — 비교 기준 (~와 비교해서)",
    "shortExplanation": "변화나 차이를 평가하기 위한 비교 기준점을 제시합니다.",
    "longExplanation": "문장 앞이나 서술 뒤에 놓아 대비합니다.",
    "formation": "A + 형용사 / 절 + so với + B",
    "examples": [{ "translation": "작년과 비교하면 올해 날씨가 훨씬 쾌적합니다." }, { "translation": "품질에 비하면 이 가격은 꽤 합리적입니다." }]
  },
  "vi_b2_09": {
    "title": "dựa trên — 근거 제시 (~에 근거하여 / ~을 바탕으로)",
    "shortExplanation": "판단이나 제작의 토대가 되는 자료·사실·규칙을 밝힙니다.",
    "longExplanation": "발표, 기사, 분석 글에서 자주 쓰이는 격식 있는 연결 표현입니다.",
    "formation": "동사 / 절 + dựa trên + 근거",
    "examples": [{ "translation": "이 영화는 실화를 바탕으로 제작되었습니다." }, { "translation": "우리는 실제 결과를 토대로 평가합니다." }]
  },
  "vi_b2_10": {
    "title": "miễn là — 단서 조건 (~하기만 한다면)",
    "shortExplanation": "한 가지 핵심 요건만 충족되면 나머지는 유연하게 동의함을 나타냅니다.",
    "longExplanation": "문장 후반부에서 필수 전제를 밝힐 때 씁니다.",
    "formation": "주절, miễn là + 핵심 조건",
    "examples": [{ "translation": "모두가 즐겁기만 하다면 어디든 좋습니다." }, { "translation": "저녁 전까지 돌려주기만 하면 자전거를 빌려도 돼요." }]
  },
  "vi_b2_11": {
    "title": "ngày càng — 상승 추세 (점점 더 / 날이 갈수록)",
    "shortExplanation": "시간이 지나며 정도가 꾸준히 심화·확대됨을 묘사합니다.",
    "longExplanation": "형용사나 심리 동사 앞에 놓습니다.",
    "formation": "주어 + ngày càng + 형용사 / 동사",
    "examples": [{ "translation": "베트남어가 온라인에서 날이 갈수록 인기를 얻고 있습니다." }, { "translation": "기술이 점점 더 빠르게 발전하고 있습니다." }]
  },
  "vi_b2_12": {
    "title": "hóa ra — 의외의 깨달음 (알고 보니 ~였다)",
    "shortExplanation": "오해나 조사 뒤에 뜻밖의 사실을 깨달았음을 드러냅니다.",
    "longExplanation": "문장 첫머리에서 놀라움이나 납득을 표현합니다.",
    "formation": "Hóa ra + (là) + 새로 알게 된 사실",
    "examples": [{ "translation": "알고 보니 두 분이 고등학교 동창이었네요!" }, { "translation": "엄청 어려울 줄 알았는데 알고 보니 꽤 간단하네요." }]
  },
  "vi_b2_13": {
    "title": "tóm lại — 요약 결론 (요약하자면 / 한마디로)",
    "shortExplanation": "긴 설명 뒤 핵심 결론을 간결하게 정리합니다.",
    "longExplanation": "결론 문장의 맨 앞에 놓아 이전 논지를 압축합니다.",
    "formation": "Tóm lại, + 핵심 결론",
    "examples": [{ "translation": "요약하자면 외국어를 잘하려면 매일 사용해야 합니다." }, { "translation": "결론적으로 계획이 승인되었습니다." }]
  },
  "vi_b2_14": {
    "title": "huống chi — 점층 추론 (하물며 ~는 말할 것도 없다)",
    "shortExplanation": "작은 경우도 그런데 더 큰 경우는 더욱 당연함을 논증합니다.",
    "longExplanation": "\"huống hồ\"와 동의어입니다.",
    "formation": "절1 (전제), huống chi (+ là) + 절2",
    "examples": [{ "translation": "어른도 힘든데 하물며 아이들은 어떻겠어요." }, { "translation": "걷기도 힘든데 달리기는 말할 것도 없지요." }]
  },
  "vi_b2_15": {
    "title": "hầu như — 거의 전체 (거의 / 사실상)",
    "shortExplanation": "단정적 표현을 '거의 대부분 / 거의 ~않다'로 완화합니다.",
    "longExplanation": "\"mọi\", \"tất cả\" 또는 부정어 \"không(거의 ~않다)\"와 주로 씁니다.",
    "formation": "Hầu như + mọi / tất cả / không + 동사",
    "examples": [{ "translation": "거의 매일 짧은 영상을 하나씩 봅니다." }, { "translation": "방 안에는 소음이 거의 없습니다." }]
  },
  "vi_b2_16": {
    "title": "không ... cũng không — 이중 부정 (~도 아니고 ~도 아니다)",
    "shortExplanation": "두 가지 대안이나 속성을 동시에 부정합니다.",
    "longExplanation": "균형 잡힌 문장 구조로 양자 모두 아님을 밝힙니다.",
    "formation": "주어 + không + A + cũng không + B",
    "examples": [{ "translation": "오늘 날씨는 덥지도 춥지도 않습니다." }, { "translation": "그녀는 전화도 하지 않고 문자도 보내지 않았습니다." }]
  },
  "vi_c1_01": {
    "title": "giá mà — 반사실적 소망 (~했더라면 좋을 텐데)",
    "shortExplanation": "현실과 다른 안타까움이나 이루어지지 않은 바람을 표현합니다.",
    "longExplanation": "\"giá như\"와 같은 뜻으로 현재의 아쉬움이나 과거의 후회를 나타냅니다.",
    "formation": "Giá mà + 반사실적 가정 (+ thì tốt biết bao)",
    "examples": [{ "translation": "어제 우산을 챙겼더라면 젖지 않았을 텐데요." }, { "translation": "하루가 몇 시간만 더 길다면 얼마나 좋을까요!" }]
  },
  "vi_c1_02": {
    "title": "tuy nhiên — 격식 있는 역접 (하지만 / 그러나)",
    "shortExplanation": "문어체나 공식 발표에서 반론·단서를 제시하는 연결어입니다.",
    "longExplanation": "\"nhưng\"보다 격식이 높으며 보통 새 문장의 첫머리에 옵니다.",
    "formation": "문장1. Tuy nhiên, + 문장2",
    "examples": [{ "translation": "초기 투자 비용은 꽤 높습니다. 하지만 장기적 효과는 매우 큽니다." }, { "translation": "아이디어는 훌륭합니다만 실행에는 시간이 더 필요합니다." }]
  },
  "vi_c1_03": {
    "title": "do đó — 격식 있는 귀결 (따라서 / 그러므로)",
    "shortExplanation": "학술·언론·업무 맥락에서 논리적 결론을 도출합니다.",
    "longExplanation": "일상적인 \"vì vậy / cho nên\"의 격식체 표현입니다.",
    "formation": "원인 절. Do đó, + 논리적 결과",
    "examples": [{ "translation": "공급이 급감했고, 따라서 원자재 가격이 크게 올랐습니다." }, { "translation": "데이터가 불충분하므로 성급히 결론 내릴 수 없습니다." }]
  },
  "vi_c1_04": {
    "title": "tức là — 환언·명확화 (즉 / 다시 말해)",
    "shortExplanation": "앞선 진술의 함의나 정의를 쉽게 풀어 설명합니다.",
    "longExplanation": "추상적 표현과 구체적 설명을 연결합니다.",
    "formation": "진술, tức là + 구체적 풀이",
    "examples": [{ "translation": "마감일은 금요일입니다, 즉 이틀밖에 남지 않았습니다." }, { "translation": "능동적 학습이란 스스로 질문을 던지고 답을 찾는 것입니다." }]
  },
  "vi_c1_05": {
    "title": "chẳng lẽ — 반어적 의심 (설마 ~란 말인가)",
    "shortExplanation": "놀라움, 의문 또는 가벼운 항의를 담은 수사 의문문입니다.",
    "longExplanation": "화자가 그 상황을 쉽게 납득하기 어렵다는 태도를 드러냅니다.",
    "formation": "Chẳng lẽ + 절 + (lại ... sao?)",
    "examples": [{ "translation": "설마 오늘 약속을 잊어버리신 건 아니죠?" }, { "translation": "일주일 내내 일했는데 주말에 조금 쉬는 것도 안 되나요?" }]
  },
  "vi_c1_06": {
    "title": "quả thật — 진심 어린 확언 (참으로 / 과연)",
    "shortExplanation": "소문이나 기대와 실제가 온전히 일치함을 인정합니다.",
    "longExplanation": "과장되지 않고 진솔하게 강조할 때 씁니다.",
    "formation": "주어 + quả thật + 형용사 / 동사",
    "examples": [{ "translation": "이곳 풍경은 소문대로 참으로 웅장합니다." }, { "translation": "확실히 외국어를 배우면 정말 많은 기회가 열립니다." }]
  },
  "vi_c1_07": {
    "title": "trái lại — 정반대 반박 (오히려 / 그와는 반대로)",
    "shortExplanation": "앞선 추측을 정면으로 뒤집고 상반된 사실을 제시합니다.",
    "longExplanation": "\"ngược lại\"와 유사한 고급 담화 표지입니다.",
    "formation": "추측. Trái lại, + 상반된 사실",
    "examples": [{ "translation": "그는 전혀 거만하지 않고, 반대로 매우 겸손하고 개방적입니다." }, { "translation": "자세히 설명할수록 헷갈리기는커녕 오히려 이해하기 쉬워집니다." }]
  },
  "vi_c1_08": {
    "title": "xét về — 분석적 관점 (~의 측면에서 보면)",
    "shortExplanation": "평가의 특정 기준이나 각도를 명확히 설정합니다.",
    "longExplanation": "논평·보고서에서 경제성·내구성 등 한 측면을 짚을 때 유용합니다.",
    "formation": "Xét về + (mặt) + 기준, 주절",
    "examples": [{ "translation": "경제적인 면에서 보면 이 방안이 가장 이상적입니다." }, { "translation": "내구성을 고려하면 국산 제품이 수입품에 뒤지지 않습니다." }]
  },
  "vi_c1_09": {
    "title": "trở nên — 상태 변화 (~해지다)",
    "shortExplanation": "성질, 분위기 또는 추상적 상태의 변화를 나타냅니다.",
    "longExplanation": "형용사·상태가 뒤따릅니다(명사·역할 변화에는 \"trở thành\" 사용).",
    "formation": "주어 + trở nên + 형용사",
    "examples": [{ "translation": "구체적인 예시 덕분에 추상적 개념이 이해하기 쉬워졌습니다." }, { "translation": "회의 분위기가 갑자기 긴장되었습니다." }]
  },
  "vi_c1_10": {
    "title": "trở thành — 지위·정체성 변화 (~이 되다)",
    "shortExplanation": "특정 신분, 직업, 현상으로 발전함을 나타냅니다.",
    "longExplanation": "항상 명사나 명사구를 보어로 취합니다.",
    "formation": "주어 + trở thành + 명사",
    "examples": [{ "translation": "독서 습관은 매일 밤 저의 즐거움이 되었습니다." }, { "translation": "그 도시는 빠르게 기술 중심지가 되었습니다." }]
  },
  "vi_c1_11": {
    "title": "chính là — 초점 강조 (바로 ~이다)",
    "shortExplanation": "핵심 원인이나 대상을 정확히 지목해 강조합니다.",
    "longExplanation": "강조 부사 \"chính\"과 \"là\"를 결합한 구문입니다.",
    "formation": "A + chính là + B (핵심)",
    "examples": [{ "translation": "끈기야말로 성공으로 이끄는 열쇠입니다." }, { "translation": "이것이 바로 우리가 찾고 있던 것입니다." }]
  },
  "vi_c1_12": {
    "title": "dẫu sao — 대국적 양보 (어쨌든 / 결국에는)",
    "shortExplanation": "이전의 어려움을 인정하면서도 실질적인 결론으로 넘깁니다.",
    "longExplanation": "\"dẫu sao đi nữa\", \"dẫu sao thì\" 형태로 자주 씁니다.",
    "formation": "Dẫu sao (đi nữa), + 현실적 결론",
    "examples": [{ "translation": "어쨌든 다 지난 일이니 너무 슬퍼하지 마세요." }, { "translation": "과정은 다소 힘들었지만 그래도 결과는 충분히 가치가 있었습니다." }]
  },
  "vi_c1_13": {
    "title": "kể cả khi — 극한 상황 포괄 (심지어 ~할 때조차)",
    "shortExplanation": "어려운 예외 상황에서도 원칙이나 의지가 유지됨을 강조합니다.",
    "longExplanation": "부담스러운 시간·상황 조건을 포함시킬 때 씁니다.",
    "formation": "주절 + kể cả khi + 까다로운 상황",
    "examples": [{ "translation": "초반 결과가 기대에 못 미치더라도 포기하지 마세요." }, { "translation": "트래픽이 두 배로 늘어도 시스템은 안정적으로 작동합니다." }]
  },
  "vi_c1_14": {
    "title": "về mặt — 측면 한정 (~면에서)",
    "shortExplanation": "논의하고 있는 영역이나 관점을 간결히 한정합니다.",
    "longExplanation": "이론, 실무, 전문성 등 특정 분야를 다룰 때 쓰는 전치사구입니다.",
    "formation": "Về mặt + 추상명사, 주절",
    "examples": [{ "translation": "이론적인 면에서는 이 해결책이 완전히 가능합니다." }, { "translation": "팀은 전문성 면에서 매우 탄탄합니다." }]
  },
  "vi_c1_15": {
    "title": "đồng thời — 동시 병행 (동시에)",
    "shortExplanation": "함께 일어나는 두 동작이나 두 가지 역할을 연결합니다.",
    "longExplanation": "보도문이나 설명문에서 간결한 병렬을 만듭니다.",
    "formation": "절1, đồng thời + 동사 / 절2",
    "examples": [{ "translation": "이 프로그램은 시간을 절약함과 동시에 정확도도 높여 줍니다." }, { "translation": "그녀는 강사인 동시에 전문 자문위원이기도 합니다." }]
  },
  "vi_c1_16": {
    "title": "nói cách khác — 환언 표지 (다시 말해)",
    "shortExplanation": "복잡한 생각을 더 명쾌하거나 쉽게 풀어서 다시 말함을 알립니다.",
    "longExplanation": "앞선 논점의 핵심 귀결을 새 각도에서 정리할 때 씁니다.",
    "formation": "원래 주장. Nói cách khác, + 재진술",
    "examples": [{ "translation": "다시 말해 우리는 양보다 질을 우선해야 합니다." }, { "translation": "예산이 삭감되었습니다. 즉 확장 계획을 연기해야 합니다." }]
  }
};

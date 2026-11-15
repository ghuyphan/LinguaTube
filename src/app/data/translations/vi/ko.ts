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
  },
  "vi_a1_17": {
    "title": "cái + 명사 — 일반 사물 분류사",
    "shortExplanation": "일상 사물과 도구·개념 앞에 가장 폭넓게 쓰이는 기본 분류사입니다.",
    "longExplanation": "베트남어에서 명사를 세거나 지시할 때는 분류사가 필요하며, 'cái'는 가방·컵·책상 등에 가장 두루 쓰입니다.",
    "formation": "(수사) + cái + 사물 명사",
    "examples": [
      {
        "translation": "저기 검은색 가방 좀 보여 주세요."
      },
      {
        "translation": "탁자 위에 유리컵 두 개가 놓여 있어요."
      }
    ]
  },
  "vi_a1_18": {
    "title": "con + 명사 — 생물·특수 사물 분류사",
    "shortExplanation": "동물과 아이는 물론 강, 길, 칼, 배 등 특정 사물에도 쓰이는 분류사입니다.",
    "longExplanation": "동물(con mèo) 외에도 길(con đường), 강(con sông), 칼(con dao)에 관용적으로 붙습니다.",
    "formation": "(수사) + con + 명사",
    "examples": [
      {
        "translation": "우리 집에서는 아주 온순한 얼룩 고양이 한 마리를 키워요."
      },
      {
        "translation": "이 길은 강가로 곧장 이어집니다."
      }
    ]
  },
  "vi_a1_19": {
    "title": "chiếc / cuốn / người — 핵심 전용 분류사",
    "shortExplanation": "탈것, 책, 사람을 자연스럽게 셀 때 꼭 쓰는 전용 분류사입니다.",
    "longExplanation": "차·젓가락 한 짝 등은 chiếc, 책·노트는 cuốn/quyển, 직업·국적·관계 앞에는 người를 씁니다.",
    "formation": "chiếc(차량·낱개) / cuốn(책) / người(사람)",
    "examples": [
      {
        "translation": "사흘 밤 만에 이 책 한 권을 다 읽었어요."
      },
      {
        "translation": "8번 버스가 방금 정문 앞에 멈춰 섰습니다."
      }
    ]
  },
  "vi_a1_20": {
    "title": "này / đó / kia / ấy — 지시사 (이·그·저)",
    "shortExplanation": "명사 뒤에 붙어 화자 기준의 거리(이·그·저)를 구분합니다.",
    "longExplanation": "한국어·영어와 달리 지시사가 명사구 맨 뒤에 옵니다(quán này = 이 가게, bên kia = 저쪽).",
    "formation": "(분류사) + 명사 + này / đó / kia",
    "examples": [
      {
        "translation": "이 쌀국수 가게는 아침에 손님이 아주 많아요."
      },
      {
        "translation": "저쪽에 있는 하얀 고층 건물 보이세요?"
      }
    ]
  },
  "vi_a1_21": {
    "title": "... không? — 기본 예/아니오 의문문",
    "shortExplanation": "평서문 끝에 'không'만 붙이면 바로 예/아니오 질문이 됩니다.",
    "longExplanation": "서술어 앞에 'có'를 함께 쓰면 리듬이 훨씬 자연스럽습니다. 대답은 'Có(네)' / 'Không(아니요)'입니다.",
    "formation": "주어 + (có) + 서술어 + không?",
    "examples": [
      {
        "translation": "방금 나눈 대화를 다 이해하셨나요?"
      },
      {
        "translation": "오늘 날씨가 많이 추운가요?"
      }
    ]
  },
  "vi_a1_22": {
    "title": "... chưa? — 완료 여부 질문 (벌써 ~했나요?)",
    "shortExplanation": "어떤 행동이 지금까지 이루어졌는지('벌써 했는지 / 아직인지') 물을 때 씁니다.",
    "longExplanation": "긍정 답변은 'Rồi(네, 했어요)', 부정 답변은 'Chưa(아직이요)'입니다.",
    "formation": "주어 + (đã) + 동사 + chưa?",
    "examples": [
      {
        "translation": "점심 먹었어요, 아니면 아직 일하고 있나요?"
      },
      {
        "translation": "오전 기차는 벌써 출발했나요?"
      }
    ]
  },
  "vi_a1_23": {
    "title": "... phải không? / đúng không? — 확인 부가의문 (그렇죠?)",
    "shortExplanation": "내가 짐작한 내용이 맞는지 상대에게 확인받을 때 씁니다.",
    "longExplanation": "영어의 'right?'처럼 문장 끝에 붙여 대화를 부드럽게 이어 갑니다.",
    "formation": "문장 + phải không / đúng không?",
    "examples": [
      {
        "translation": "다낭에 오신 건 이번이 처음이시죠?"
      },
      {
        "translation": "가게가 밤 9시까지 문을 여는 게 맞죠?"
      }
    ]
  },
  "vi_a1_24": {
    "title": "... ạ — 공손·존중의 문장 종결어",
    "shortExplanation": "어른, 선생님, 낯선 상대에게 예의를 표할 때 문장 끝에 붙입니다.",
    "longExplanation": "짧은 한 음절이지만 손님이나 윗사람에게 정중한 인상을 주는 핵심 표현입니다.",
    "formation": "문장 끝 + ạ (흔히 문두 'Dạ'와 함께 사용)",
    "examples": [
      {
        "translation": "안녕하세요, 아이스 연유 커피 한 잔 주세요."
      },
      {
        "translation": "네, 아주머니 정말 감사합니다!"
      }
    ]
  },
  "vi_a1_25": {
    "title": "... nhé / nha — 다정한 제안·부탁 종결어 (~하자 / ~해)",
    "shortExplanation": "권유나 당부, 작별 인사가 딱딱하지 않고 다정하게 들리도록 문장 끝에 붙입니다.",
    "longExplanation": "조사가 없으면 명령조로 들릴 문장도 'nhé/nha'를 붙이면 친근한 말투가 됩니다.",
    "formation": "제안·알림 + nhé(북부·표준) / nha(남부)",
    "examples": [
      {
        "translation": "오늘 밤 시간 되면 나한테 전화해, 응?"
      },
      {
        "translation": "열쇠는 탁자 위에 두고 갈게."
      }
    ]
  },
  "vi_a1_26": {
    "title": "ở + 장소 — 위치·거주 표현 (~에 있다 · ~에서)",
    "shortExplanation": "'~에 살다·있다'라는 동사 역할과 동작 장소 '~에서'를 나타내는 전치사 역할을 겸합니다.",
    "longExplanation": "앞에 'là(~이다)'를 넣지 않고 바로 'Tôi ở Seoul'처럼 말합니다.",
    "formation": "주어 + ở + 장소  |  주어 + 동사 + ở + 장소",
    "examples": [
      {
        "translation": "현재 저희 가족은 껀터에 살고 있어요."
      },
      {
        "translation": "그들은 골목 모퉁이 차 가게에서 만났어요."
      }
    ]
  },
  "vi_a1_27": {
    "title": "có + 명사 — 소유(~가 있다)와 존재(거기에 ~이 있다)",
    "shortExplanation": "누군가 무언가를 '가지고 있다'는 뜻과 특정 장소에 '있다'는 존재 뜻을 모두 나타냅니다.",
    "longExplanation": "문장 앞에 장소가 오거나 주어가 없으면 '거기에 ~가 있다'로 해석합니다.",
    "formation": "주어 + có + 명사  |  (장소) + có + 명사",
    "examples": [
      {
        "translation": "골목 어귀에 아주 고소한 반미 가게가 하나 있어요."
      },
      {
        "translation": "매일 베트남어 기사를 읽는 시간이 30분씩 있어요."
      }
    ]
  },
  "vi_a1_28": {
    "title": "định + 동사 — ~할 계획이다 · ~하려고 하다",
    "shortExplanation": "개인이 머릿속에 세운 계획이나 막연한 의향을 자연스럽게 말할 때 씁니다.",
    "longExplanation": "격식 있는 'dự định'보다 일상 회화에서 훨씬 자주 쓰입니다.",
    "formation": "주어 + định + 동사",
    "examples": [
      {
        "translation": "이번 주말에 어디 놀러 갈 생각 있어요?"
      },
      {
        "translation": "자기 전에 새 단어를 스무 개 더 외울 계획이에요."
      }
    ]
  },
  "vi_a1_29": {
    "title": "muốn + 동사 — ~하고 싶다 · 원하다",
    "shortExplanation": "원하는 바를 말하거나 상대방이 무엇을 원하는지 물을 때 씁니다.",
    "longExplanation": "주문이나 부탁할 때는 문장 끝에 'ạ'를 붙여 공손함을 더합니다.",
    "formation": "주어 + muốn + 동사 / 명사",
    "examples": [
      {
        "translation": "저는 표준 남부 억양 발음을 연습하고 싶어요."
      },
      {
        "translation": "따뜻한 차로 드릴까요, 아이스 차로 드릴까요?"
      }
    ]
  },
  "vi_a1_30": {
    "title": "không vs chưa — 일반 부정 vs 미완료 ('아직 안 함')",
    "shortExplanation": "'không'은 사실이나 습관을 부정하고, 'chưa'는 지금까지 아직 일어나지 않았음을 뜻합니다.",
    "longExplanation": "식사를 아직 안 했을 때는 반드시 'không'이 아니라 'chưa'를 써야 오해가 없습니다.",
    "formation": "không + 동사/형용사 (안 한다)  vs  chưa + 동사 (아직 안 했다)",
    "examples": [
      {
        "translation": "잠을 설칠까 봐 밤에는 커피를 마시지 않아요."
      },
      {
        "translation": "죄송해요, 아직 메시지를 확인할 틈이 없었어요."
      }
    ]
  },
  "vi_a1_31": {
    "title": "một ít / nhiều / vài — 기초 수량 표현",
    "shortExplanation": "명사 앞에 놓아 '조금', '몇 개', '많음'을 나타내며 명사 형태는 변하지 않습니다.",
    "longExplanation": "'một ít'은 셀 수 없는 소량, 'vài'는 몇몇 가산 명사, 'nhiều'는 둘 다에 씁니다.",
    "formation": "một ít / vài / nhiều (+ 분류사) + 명사",
    "examples": [
      {
        "translation": "물 살 만큼의 현금만 조금 챙겨 왔어요."
      },
      {
        "translation": "주말에 단골 카페에서 옛 친구 몇 명을 만났어요."
      }
    ]
  },
  "vi_a1_32": {
    "title": "gì / đâu / ai / nào — 제자리 의문사 어순",
    "shortExplanation": "영어처럼 의문사를 문장 맨 앞으로 빼지 않고, 대답이 올 위치에 그대로 넣습니다.",
    "longExplanation": "'Bạn ăn [cơm]'을 질문으로 바꿀 때도 'Bạn ăn [gì]?'처럼 어순이 유지됩니다.",
    "formation": "답변이 들어갈 자리에 그대로 의문사(gì, ai, đâu, nào) 배치",
    "examples": [
      {
        "translation": "오늘은 무슨 주제로 듣기 연습을 하고 있나요?"
      },
      {
        "translation": "이 근처에서 가장 맛있는 식당이 어디에 있나요?"
      }
    ]
  },
  "vi_a2_17": {
    "title": "동사 + ra — 방향·발견 결과 보어 (밖으로 · 깨닫다)",
    "shortExplanation": "안에서 밖으로 나가는 방향(đi ra)뿐 아니라 몰랐던 사실을 알아차리고 찾아냄(nhận ra, tìm ra, nhớ ra)을 뜻합니다.",
    "longExplanation": "동사 뒤에 'ra'를 붙여 생각이 떠오르거나 실마리가 드러남을 표현합니다.",
    "formation": "동사 + ra",
    "examples": [
      {
        "translation": "한 박자 천천히 들어 보니 비로소 이 연결어가 들렸어요."
      },
      {
        "translation": "자막이 어긋나게 만든 작은 오류를 방금 찾아냈습니다."
      }
    ]
  },
  "vi_a2_18": {
    "title": "동사 + vào / vô — 안쪽 방향·집중 대상 보어 (~로 들어가다 · ~에)",
    "shortExplanation": "안으로 들어가는 이동뿐 아니라 대상을 콕 집어 작용할 때(bấm vào 누르다, tập trung vào 집중하다) 씁니다.",
    "longExplanation": "표준·북부는 'vào', 남부 회화에서는 'vô'를 자주 씁니다.",
    "formation": "동사 + vào / vô (+ 명사)",
    "examples": [
      {
        "translation": "모르는 단어를 눌러 정확한 발음을 들어 보세요."
      },
      {
        "translation": "유용한 표현을 복습 노트에 적어 두는 걸 잊지 마세요."
      }
    ]
  },
  "vi_a2_19": {
    "title": "동사/형용사 + lên / xuống — 상승·하강 및 증감 보어",
    "shortExplanation": "'lên'은 위쪽 이동과 증가·고조(nhanh lên 빨라지다), 'xuống'은 아래쪽 이동과 감소·진정(chậm xuống 느려지다)을 뜻합니다.",
    "longExplanation": "형용사 뒤에 바로 붙여 상태 변화('더 ~해지다')를 자연스럽게 나타냅니다.",
    "formation": "동사 / 형용사 + lên vs xuống",
    "examples": [
      {
        "translation": "목소리를 조금만 더 크게 말씀해 주실래요?"
      },
      {
        "translation": "너무 피곤해지자 그의 읽기 속도가 눈에 띄게 느려졌습니다."
      }
    ]
  },
  "vi_a2_20": {
    "title": "동사 + lại — 반복·정지·보존·답장 보어",
    "shortExplanation": "다시 하기(nghe lại 다시 듣다), 멈추기·남기기(dừng lại 멈추다, lưu lại 저장하다), 되돌려 주기(gọi lại 다시 전화하다)를 뜻합니다.",
    "longExplanation": "앞 동사의 성격에 따라 반복·정지·보관·응답 의미가 자연스럽게 결정됩니다.",
    "formation": "동사 + lại",
    "examples": [
      {
        "translation": "어려운 구간은 설명을 보기 전에 보통 세 번 다시 들어요."
      },
      {
        "translation": "앞쪽 사거리에 다다르면 잠깐 멈춰서 쉬어요."
      }
    ]
  },
  "vi_a2_21": {
    "title": "동사 + đi — 제거·소멸·권유 보어",
    "shortExplanation": "멀리 떨어뜨리거나 완전히 없애 버림(xóa đi 지워 버리다, quên đi 잊어버리다) 또는 '어서 ~해 봐'라는 친근한 권유를 뜻합니다.",
    "longExplanation": "문장 끝 명령·제안에 쓰면 망설이지 말고 해 보라는 가벼운 재촉이 됩니다.",
    "formation": "동사 + đi",
    "examples": [
      {
        "translation": "오래된 파일은 더 두지 말고 용량 가볍게 싹 지워 버리세요."
      },
      {
        "translation": "조금 틀려도 괜찮으니까 과감하게 한번 말해 봐요!"
      }
    ]
  },
  "vi_a2_22": {
    "title": "동사 + về / qua / sang — 귀환·통과·전환 보어",
    "shortExplanation": "'về'는 집이나 원래 자리로 돌아옴, 'qua'는 지나치거나 잠깐 들름, 'sang'은 다른 곳이나 단계로 넘어감을 뜻합니다.",
    "longExplanation": "일상 동선과 주제 전환('ghé qua 잠깐 들르다', 'chuyển sang ~로 넘어가다')에 필수적입니다.",
    "formation": "동사 + về(돌아옴) / qua(거침·들름) / sang(건너감·전환)",
    "examples": [
      {
        "translation": "오늘 밤 늦게 퇴근해서 아홉 시가 되어서야 돌아왔어요."
      },
      {
        "translation": "어휘 파트를 마친 뒤에는 듣기 연습으로 넘어갈게요."
      }
    ]
  },
  "vi_a2_23": {
    "title": "동사 + được — 가능·성취 결과 보어 (~할 수 있다 · ~해 내다)",
    "shortExplanation": "동사 뒤에 붙어 실제로 해냈음(tìm được 찾아냈다)이나 할 수 있음(nghe được 들린다)을 나타냅니다.",
    "longExplanation": "동사 앞에 오는 'được + 동사(허락·혜택을 받다)'와 위치별 의미 차이를 꼭 구분하세요.",
    "formation": "주어 + 동사 + được (+ 목적어)",
    "examples": [
      {
        "translation": "마침내 정확한 자막이 달린 버전을 찾아냈어요."
      },
      {
        "translation": "이 구간은 말이 너무 빨라서 마지막 단어를 알아듣지 못했어요."
      }
    ]
  },
  "vi_a2_24": {
    "title": "동사 + xong — 동작 완료 보어 (~을 다 끝내다)",
    "shortExplanation": "동사 바로 뒤에 붙어 해당 동작을 끝까지 마쳤음을 분명히 나타냅니다.",
    "longExplanation": "'V1 + xong + V2'처럼 두 동작의 순서를 연결할 때 아주 유용합니다.",
    "formation": "주어 + 동사 + xong (+ 목적어)",
    "examples": [
      {
        "translation": "이 에피소드를 다 보고 나면 새 단어 목록을 복습할 거예요."
      },
      {
        "translation": "그녀는 고객에게 보낼 이메일을 방금 다 썼습니다."
      }
    ]
  },
  "vi_a2_25": {
    "title": "동사 + mất / hết — 상실(~해 버리다) vs 소진(모두·다 ~하다)",
    "shortExplanation": "'mất'은 아쉽게 잃거나 깜빡함(quên mất 까맣게 잊다), 'hết'은 남김없이 다 먹거나 끝까지 다 마침(xem hết 다 보다)을 뜻합니다.",
    "longExplanation": "동사 뒤에 붙여 결과의 아쉬움이나 완결 범위를 생생하게 전합니다.",
    "formation": "동사 + mất / hết (+ 목적어)",
    "examples": [
      {
        "translation": "어머나, 오늘 세 시에 조별 모임 약속 있는 걸 까맣게 잊어버렸네!"
      },
      {
        "translation": "단 하룻밤 만에 그는 그 짧은 영상 시리즈를 전부 다 봤어요."
      }
    ]
  },
  "vi_a2_26": {
    "title": "đã từng + 동사 — 과거 경험 (~해 본 적이 있다)",
    "shortExplanation": "어제 일상보다 살면서 한 번이라도 겪어 본 인생 경험을 말할 때 씁니다.",
    "longExplanation": "부정 경험('한 번도 해 본 적 없다')은 'chưa từng'을 씁니다.",
    "formation": "주어 + đã từng / chưa từng + 동사",
    "examples": [
      {
        "translation": "베트남 중부 지방에서 살아 본 적이 있으신가요?"
      },
      {
        "translation": "노래로 공부해 본 적이 있는데 기억에 정말 오래 남더군요."
      }
    ]
  },
  "vi_a2_27": {
    "title": "mới + 동사 — 방금 (~했다) vs 비로소 (~해야 ~하다)",
    "shortExplanation": "동사 앞 'mới'는 '방금 막 했다'와 '그때가 되어서야 비로소 ~한다'라는 두 가지 핵심 역할을 합니다.",
    "longExplanation": "문맥상 과거 직전이면 방금, 시간·조건 절 뒤면 '비로소'로 해석합니다.",
    "formation": "S + (vừa) mới + V  |  조건/시점 + S + mới + V",
    "examples": [
      {
        "translation": "오늘 아침에야 막 이 앱을 다운로드했어요."
      },
      {
        "translation": "이 문장을 세 번째 다시 듣고 나서야 글쓴이의 의도를 이해했어요."
      }
    ]
  },
  "vi_a2_28": {
    "title": "vẫn còn — 지속과 잔존 ('여전히 ~하다 · 아직 남아 있다')",
    "shortExplanation": "어떤 상태나 습관, 남은 분량이 지금도 변함없이 계속되고 있음을 강조합니다.",
    "longExplanation": "'vẫn'만 써도 '여전히'가 되며 'còn'을 보태면 아직 남아 있다는 어감이 살아납니다.",
    "formation": "주어 + vẫn (còn) + 동사/형용사/명사",
    "examples": [
      {
        "translation": "바깥에는 이 시간에도 아직 보슬비가 내리고 있어요."
      },
      {
        "translation": "고향을 떠난 지 여러 해가 지났는데도 그분은 여전히 고향 억양이 뚜렷해요."
      }
    ]
  },
  "vi_a2_29": {
    "title": "... nhỉ — 공감을 구하는 종결어 (~지 않아요? · ~네 그죠?)",
    "shortExplanation": "사실 확인보다 느낌을 나누며 다정하게 맞장구를 유도할 때 문장 끝에 붙입니다.",
    "longExplanation": "'phải không?'이 팩트 확인이라면 'nhỉ'는 정서적 공감에 가깝습니다.",
    "formation": "감상·생각 + nhỉ",
    "examples": [
      {
        "translation": "이 영상 문법 설명이 참 이해하기 쉽죠!"
      },
      {
        "translation": "우리 차 마시면서 수다 떤 지 꽤 오래됐죠 그쵸."
      }
    ]
  },
  "vi_a2_30": {
    "title": "... đấy / đó — 사실 강조·일깨움 종결어 (~라니까 · ~거든)",
    "shortExplanation": "상대에게 새로운 정보를 짚어 주거나 칭찬·주의를 실감 나게 전할 때 붙입니다.",
    "longExplanation": "가벼운 경고나 반가운 칭찬 뒤에 붙이면 원어민처럼 생동감이 살아납니다.",
    "formation": "문장 끝 + đấy(북부) / đó(남부)",
    "examples": [
      {
        "translation": "그 문장 읽는 게 벌써 엄청 자연스러운데요!"
      },
      {
        "translation": "밖의 길이 지금 많이 막힌대요, 조금 일찍 출발해요."
      }
    ]
  },
  "vi_a2_31": {
    "title": "... cơ mà / mà — 가벼운 항변·일깨움 (~잖아요 · ~라니까)",
    "shortExplanation": "상대가 깜빡한 이유를 짚어 주거나 살짝 따지듯 설득할 때 문장 끝에 붙입니다.",
    "longExplanation": "'mà'는 전국적으로 널리 쓰이고, 'cơ mà'는 어조가 한결 더 강조됩니다.",
    "formation": "이유·설명 + cơ mà / mà",
    "examples": [
      {
        "translation": "진정해요, 우리 아직 첫 주 시작한 지 얼마 안 됐잖아요."
      },
      {
        "translation": "어제 링크 이미 보내 드렸잖아요."
      }
    ]
  },
  "vi_a2_32": {
    "title": "... chứ — 당연한 기대·확신 (~겠지요? · 물론이지요)",
    "shortExplanation": "상대가 당연히 긍정할 거라 기대하며 묻거나 '당연히 그렇고말고'라고 힘주어 말할 때 씁니다.",
    "longExplanation": "끝을 올리면 기대 섞인 질문, 내리면 확신에 찬 강조가 됩니다.",
    "formation": "문장 + chứ",
    "examples": [
      {
        "translation": "이번 주말에도 베트남어 말하기 모임에 나오실 거죠?"
      },
      {
        "translation": "당연하죠, 매일 공부하면 분명히 실력이 늘고말고요!"
      }
    ]
  },
  "vi_a2_33": {
    "title": "hơn / nhất — 비교급(더 ~)과 최상급(가장 ~)",
    "shortExplanation": "형용사·동사 뒤에 'hơn'을 붙이면 비교급, 'nhất'을 붙이면 최상급이 됩니다.",
    "longExplanation": "단어 어미 변화 없이 뒤에 단어 하나만 붙이면 되는 직관적인 구조입니다.",
    "formation": "A + 형용사/동사 + hơn + B  |  A + 형용사 + nhất",
    "examples": [
      {
        "translation": "원어민 음성을 들으면 리듬에 훨씬 더 빨리 익숙해집니다."
      },
      {
        "translation": "이 작품은 이번 달 제가 가장 좋아하는 다큐멘터리 영화예요."
      }
    ]
  },
  "vi_a2_34": {
    "title": "giống / khác (+ với) — 유사성과 차이 (비슷하다 · 다르다)",
    "shortExplanation": "두 대상의 발음·표현·습관이 서로 비슷한지 다른지를 비교합니다.",
    "longExplanation": "'y hệt(똑같다)', 'hoàn toàn(완전히 다르다)' 같은 부사로 정도를 강조할 수 있습니다.",
    "formation": "A + giống / khác + (với) + B",
    "examples": [
      {
        "translation": "두 지역의 받침 발음이 서로 조금씩 다릅니다."
      },
      {
        "translation": "이 단어는 어제 배운 단어와 소리가 거의 비슷해요."
      }
    ]
  },
  "vi_a2_35": {
    "title": "mà lại — 뜻밖의 대조 (~인데도 오히려 · 그런데 뜻밖에)",
    "shortExplanation": "앞의 내용으로 짐작한 것과 달리 오히려 의외의 결과가 이어질 때 씁니다.",
    "longExplanation": "딱딱한 'nhưng(하지만)'보다 가벼운 놀라움이나 역설을 자연스럽게 전합니다.",
    "formation": "상황 1 + mà lại + 의외의 결과",
    "examples": [
      {
        "translation": "영상이 3분밖에 안 되는데도 단계별 설명이 아주 명쾌해요."
      },
      {
        "translation": "이렇게 햇볕이 쨍쨍한데도 갑자기 찬 바람이 부네요."
      }
    ]
  },
  "vi_a2_36": {
    "title": "để + 동사 / 절 — 목적 (~하기 위하여 · ~하도록)",
    "shortExplanation": "앞선 행동의 목적('~하기 위해서')을 바로 뒤에 연결합니다.",
    "longExplanation": "동사가 바로 와도, 다른 주어가 들어간 절이 와도 똑같이 'để'를 씁니다.",
    "formation": "행동 + để (+ 주어) + 목적",
    "examples": [
      {
        "translation": "들으면서 뜻을 대조해 보려고 이중 자막을 켰어요."
      },
      {
        "translation": "초보자도 따라갈 수 있도록 조금만 천천히 말해 주세요."
      }
    ]
  },
  "vi_b1_17": {
    "title": "làm cho + 목적어 + 형용사/동사 — 자연스러운 사역·유발 (~하게 만들다)",
    "shortExplanation": "어떤 요인이 사람이나 사물에 감정 변화나 특정 결과를 불러일으킬 때 씁니다.",
    "longExplanation": "일상에서 가장 자주 쓰는 사역 구문이며 'cho'는 종종 생략해 간결하게 말합니다.",
    "formation": "원인 + làm (cho) + 대상 + 상태 변화",
    "examples": [
      {
        "translation": "감정이 실린 목소리 덕분에 리포트가 한층 더 매력적으로 들립니다."
      },
      {
        "translation": "배경 소음이 너무 크면 청취자가 집중하기 어려워집니다."
      }
    ]
  },
  "vi_b1_18": {
    "title": "khiến (cho) + 목적어 + 동사/형용사 — 강조된 유발 (~하게 이끌다 · ~을 자아내다)",
    "shortExplanation": "'làm cho'보다 한층 문어적·보도적 뉘앙스로, 외적 계기가 강한 반응을 일으킬 때 씁니다.",
    "longExplanation": "뉴스나 스토리텔링에서 놀라움·감동을 이끌어 내는 표현으로 자주 나옵니다.",
    "formation": "원인 + khiến (cho) + 대상 + 반응",
    "examples": [
      {
        "translation": "그 갑작스러운 소식에 회의실 전체가 몇 초간 조용해졌습니다."
      },
      {
        "translation": "재치 있는 말장난이 시청자들의 유쾌한 웃음을 자아냈습니다."
      }
    ]
  },
  "vi_b1_19": {
    "title": "bảo / nhờ / giúp + 사람 + 동사 — 지시·부탁·도움 구문",
    "shortExplanation": "'bảo(시키다·말하다)', 'nhờ(정중히 부탁하다)', 'giúp(돕다)'의 어감과 위계 차이를 구분합니다.",
    "longExplanation": "윗사람에게 부탁할 때는 'bảo' 대신 반드시 'nhờ'를 써야 예의 바릅니다.",
    "formation": "주어 + bảo / nhờ / giúp + 사람 + 동사",
    "examples": [
      {
        "translation": "원어민 친구에게 hỏi 성조 발음을 좀 봐 달라고 부탁했어요."
      },
      {
        "translation": "선생님께서 반 전체에 대화를 한 번 더 들으라고 말씀하셨습니다."
      }
    ]
  },
  "vi_b1_20": {
    "title": "càng ngày càng — 점진적 심화 (갈수록 점점 더 ~하다)",
    "shortExplanation": "시간이 흐르면서 상태나 추세가 점점 더 뚜렷해짐을 나타냅니다.",
    "longExplanation": "회화에서는 'càng ngày càng', 기사나 설명문에서는 간결한 'ngày càng'을 자주 씁니다.",
    "formation": "주어 + (càng) ngày càng + 형용사/동사",
    "examples": [
      {
        "translation": "연습할수록 듣기 이해가 갈수록 한결 수월해지는 걸 느낄 거예요."
      },
      {
        "translation": "유튜브의 베트남어 학습 콘텐츠가 날이 갈수록 다양해지고 있습니다."
      }
    ]
  },
  "vi_b1_21": {
    "title": "càng ... càng ... — 비례 상관 (~할수록 더욱 …하다)",
    "shortExplanation": "앞의 정도가 깊어질수록 뒤의 결과도 비례해 커짐을 나타냅니다.",
    "longExplanation": "뒤 절의 주어가 겹치면 생략해 리듬감 있게 줄여 쓰곤 합니다.",
    "formation": "Càng + 절 1, (주어) + càng + 절 2",
    "examples": [
      {
        "translation": "여러 지역 억양을 많이 들을수록 귀가 더욱 유연해집니다."
      },
      {
        "translation": "이야기가 끝으로 갈수록 점점 더 흥미진진해지네요."
      }
    ]
  },
  "vi_b1_22": {
    "title": "suýt nữa thì — 아슬아슬한 위기 모면 (하마터면 ~할 뻔했다)",
    "shortExplanation": "차를 놓치거나 실수하는 등 일어나지 않았으면 했던 일이 코앞에서 피해진 상황을 말합니다.",
    "longExplanation": "부정적인 위기 상황에서만 쓰며 좋은 일을 아쉽게 놓친 경우에는 잘 쓰지 않습니다.",
    "formation": "주어 + suýt (nữa) thì + 원치 않던 일",
    "examples": [
      {
        "translation": "오늘 아침 늦잠을 자서 하마터면 첫차를 놓칠 뻔했어요."
      },
      {
        "translation": "큰일 날 뻔했네요, 실수로 전체 삭제 버튼을 누를 뻔했어요."
      }
    ]
  },
  "vi_b1_23": {
    "title": "lẽ ra (nên) — 과거에 대한 후회·당위 (~했어야 했는데)",
    "shortExplanation": "실제 결과와 달리 원래는 그렇게 했어야 했거나 그랬어야 마땅함을 회고할 때 씁니다.",
    "longExplanation": "뒤에 실제 상황을 밝히는 'nhưng(하지만)' 절이 잘 이어집니다.",
    "formation": "Lẽ ra (주어) + nên / đã + 동사 (+ nhưng ...)",
    "examples": [
      {
        "translation": "녹음을 시작하기 전에 마이크부터 확인했어야 했는데."
      },
      {
        "translation": "인터넷이 끊기지만 않았어도 회의가 더 일찍 끝났을 텐데요."
      }
    ]
  },
  "vi_b1_24": {
    "title": "hóa ra (là) — 의외의 진실 판명 (알고 보니 ~였다)",
    "shortExplanation": "처음 짐작과 달리 뜻밖의 실제 사실을 알게 되었을 때 씁니다.",
    "longExplanation": "앞에 'tưởng(~인 줄 알았다)'과 짝을 이루면 반전의 묘미가 살아납니다.",
    "formation": "(처음엔 A인 줄 알았는데) hóa ra (là) + B",
    "examples": [
      {
        "translation": "처음엔 새 단어가 복잡한 줄 알았는데 알고 보니 친숙한 두 글자의 조합이었네요."
      },
      {
        "translation": "알고 보니 두 분이 예전부터 같은 고등학교 동창이었군요!"
      }
    ]
  },
  "vi_b1_25": {
    "title": "thảo nào / hèn gì — 납득의 감탄 (어쩐지 · 그럴 줄 알았어!)",
    "shortExplanation": "원인을 듣고 나니 아까 궁금했던 현상이 단번에 이해될 때 '어쩐지!' 하고 외치는 표현입니다.",
    "longExplanation": "'thảo nào'는 북부·표준, 'hèn gì'는 남부 구어에서 자주 씁니다.",
    "formation": "Thảo nào / Hèn gì + 납득된 사실",
    "examples": [
      {
        "translation": "아, 후에에서 5년이나 살았군요—어쩐지 말투가 그렇게 다정하다 했어요!"
      },
      {
        "translation": "아까부터 밖에 비가 쏟아졌군요, 어쩐지 공기가 부쩍 시원해졌더라고요."
      }
    ]
  },
  "vi_b1_26": {
    "title": "thà ... còn hơn — 차선 선택 (차라리 ~하는 편이 낫다)",
    "shortExplanation": "두 대안 중에서 차라리 앞쪽을 택하고 뒤쪽은 피하겠다는 분명한 선호를 드러냅니다.",
    "longExplanation": "조언하거나 단호한 의견을 밝힐 때 설득력이 높습니다.",
    "formation": "Thà + 선택 A + còn hơn (là) + 선택 B",
    "examples": [
      {
        "translation": "쉰 문장을 대충 훑고 지나가느니 다섯 문장을 제대로 파고드는 편이 낫죠."
      },
      {
        "translation": "짐작으로 잘못 쓰느니 다시 물어봐서 확실히 하는 게 낫습니다."
      }
    ]
  },
  "vi_b1_27": {
    "title": "miễn là — 최소한의 필수 조건 (~하기만 하면)",
    "shortExplanation": "다른 조건은 크게 상관없고 핵심 한 가지만 지켜지면 된다고 말할 때 씁니다.",
    "longExplanation": "약속을 정하거나 현실적인 기준을 세울 때 매우 자주 씁니다.",
    "formation": "주절, miễn là + 조건절",
    "examples": [
      {
        "translation": "말하는 속도는 중요하지 않아요, 성조만 정확히 구분해서 발음하면 돼요."
      },
      {
        "translation": "몇 시에 공부하든 상관없어요, 매일 10분씩 꾸준히 하기만 하면요."
      }
    ]
  },
  "vi_b1_28": {
    "title": "trừ khi — 유일한 예외 (~하지 않는 한)",
    "shortExplanation": "특정 예외 상황이 생기지 않는 이상 본래 계획이나 원칙이 유지됨을 나타냅니다.",
    "longExplanation": "영어의 'unless'에 해당하며 주절 앞뒤 어디든 올 수 있습니다.",
    "formation": "주절, trừ khi + 예외 조건",
    "examples": [
      {
        "translation": "폭풍우가 치지 않는 한 오늘 밤 스터디 모임은 정상적으로 진행합니다."
      },
      {
        "translation": "문장이 정말 너무 어렵지 않은 이상 처음부터 번역을 켜지 마세요."
      }
    ]
  },
  "vi_b1_29": {
    "title": "nhân tiện — 겸사겸사 · 말 나온 김에",
    "shortExplanation": "가는 길에 겸사겸사 다른 일을 처리하거나 대화 흐름상 '말 나온 김에' 덧붙일 때 씁니다.",
    "longExplanation": "일상 대화와 실무 협조 요청에서 아주 매끄럽게 쓰입니다.",
    "formation": "(기존 상황), nhân tiện + 덧붙이는 행동/질문",
    "examples": [
      {
        "translation": "마트에 우유 사러 간 김에 서점에 들러 사전도 받아 왔어요."
      },
      {
        "translation": "마침 그 파일을 열어 둔 김에 마지막 줄 좀 봐 주시겠어요?"
      }
    ]
  },
  "vi_b1_30": {
    "title": "hình như / có vẻ như — 완곡한 추측 (~인 것 같다 · ~처럼 보인다)",
    "shortExplanation": "100% 확신하기 어려울 때 관찰이나 감을 부드럽게 전하는 표현입니다.",
    "longExplanation": "'hình như'는 막연한 기억·감에, 'có vẻ như'는 눈이나 귀로 확인한 겉모습·인상에 가깝습니다.",
    "formation": "Hình như / Có vẻ (như) + 절",
    "examples": [
      {
        "translation": "아무래도 이번 화 자막이 소리보다 1초쯤 빠른 것 같아요."
      },
      {
        "translation": "2주 연습하고 나니까 목소리에 자신감이 부쩍 붙은 것처럼 보이네요."
      }
    ]
  },
  "vi_b1_31": {
    "title": "chẳng qua là — 본질적·단순 이유 풀이 (그저 ~일 뿐이다)",
    "shortExplanation": "대단하거나 복잡해 보이는 일도 실제로는 단순한 이유 때문이라고 설명할 때 씁니다.",
    "longExplanation": "문장 끝 'thôi'와 함께 쓰면 상대의 오해나 걱정을 부드럽게 풀어 줍니다.",
    "formation": "사안 + chẳng qua (chỉ) là + 단순 이유 (+ thôi)",
    "examples": [
      {
        "translation": "그 사람은 화난 게 아니라 그저 보고서를 마저 끝내느라 집중하고 있을 뿐이에요."
      },
      {
        "translation": "처음에 낯설게 들렸던 건 그저 남부 억양에 익숙하지 않았기 때문이에요."
      }
    ]
  },
  "vi_b1_32": {
    "title": "vậy mà / thế mà — 기대를 뒤집는 놀라운 역접 (그런데도 · 그러고도)",
    "shortExplanation": "앞선 정황상 예상과 정반대의 결과가 벌어졌을 때 놀라움이나 허탈감을 담아 잇습니다.",
    "longExplanation": "평범한 'nhưng'보다 반전 감정이 한층 강하게 살아납니다.",
    "formation": "전제; vậy mà / thế mà + 반전 결과",
    "examples": [
      {
        "translation": "오늘 아침 예보엔 온종일 맑다고 했는데 그런데도 오후엔 소나기가 쏟아졌어요."
      },
      {
        "translation": "이 단어는 길어 보이는데도 발음은 아주 규칙적이에요."
      }
    ]
  },
  "vi_b1_33": {
    "title": "... chứ không phải ... — 오해 바로잡기 (B가 아니라 A다)",
    "shortExplanation": "헷갈리기 쉬운 두 대상 중 'B가 아니라 바로 A다'라고 경계를 분명히 그어 줍니다.",
    "longExplanation": "어휘 뉘앙스 차이나 핵심 우선순위를 짚어 줄 때 매우 효과적입니다.",
    "formation": "맞는 내용 A + chứ không phải + 아닌 내용 B",
    "examples": [
      {
        "translation": "이 문장에서 'chỉ'는 강조 부사이지 손가락으로 가리키는 동사가 아닙니다."
      },
      {
        "translation": "중요한 것은 낱말을 따로따로 번역하는 것이 아니라 문맥을 이해하는 것입니다."
      }
    ]
  },
  "vi_b1_34": {
    "title": "không những ... mà còn ... — 점층적 나열 (~뿐만 아니라 …하기도 하다)",
    "shortExplanation": "첫 번째 사실 위에 한층 더 인상적인 두 번째 장점을 덧붙여 강조합니다.",
    "longExplanation": "'không chỉ ... mà còn ...' 형태도 뜻이 완전히 같으며 아주 자주 쓰입니다.",
    "formation": "주어 + không những / không chỉ + A + mà còn + B",
    "examples": [
      {
        "translation": "자막 영상을 보는 것은 듣기를 향상시킬 뿐만 아니라 어휘도 넓혀 줍니다."
      },
      {
        "translation": "그녀는 유창하게 말할 뿐만 아니라 지역별 억양까지 정확히 구사해요."
      }
    ]
  },
  "vi_b1_35": {
    "title": "nếu ... thì ... — 기본 조건 구문 (만약 ~하면)",
    "shortExplanation": "가정과 조건을 연결하는 핵심 틀로, 뒤 절 앞에 'thì'를 살려 주는 것이 자연스럽습니다.",
    "longExplanation": "일상 대화에서는 앞의 'Nếu'를 빼고 'Rảnh thì ~'처럼 간략히 자주 씁니다.",
    "formation": "Nếu + 조건절, thì + 결과절",
    "examples": [
      {
        "translation": "낯선 관용구를 만나면 눌러서 설명을 확인해 보세요."
      },
      {
        "translation": "어제 폭우만 오지 않았어도 소풍이 정말 즐거웠을 텐데요."
      }
    ]
  },
  "vi_b1_36": {
    "title": "vừa ... vừa ... — 동시 동작·이중 속성 (~하면서 …하다 / ~하기도 하고 …하기도 하다)",
    "shortExplanation": "두 가지 동작을 동시에 하거나 두 가지 장점을 함께 지녔음을 표현합니다.",
    "longExplanation": "동사면 '~하면서', 형용사면 '가벼우면서도 편리하다'처럼 자연스럽게 이어집니다.",
    "formation": "주어 + vừa + A + vừa + B",
    "examples": [
      {
        "translation": "저는 아침 커피를 내리면서 짧은 뉴스를 듣는 걸 좋아해요."
      },
      {
        "translation": "앱이 가벼우면서도 새 단어를 찾아보기 쉽게 만들어졌어요."
      }
    ]
  },
  "vi_b2_17": {
    "title": "첩어 AABB / ABAB — 섬세한 어감 완화·강조 및 리듬감",
    "shortExplanation": "음절이나 성조를 반복해 어감을 부드럽게 누그러뜨리거나 행동·감정을 생생하게 묘사합니다.",
    "longExplanation": "평성으로 바뀌는 첩어는 정도를 약화(đo đỏ 붉으스름한)하고 ABAB형은 반복을 그립니다.",
    "formation": "부분 첩어(nhè nhẹ 살며시) / 사자 첩어(đi đi lại lại 왔다 갔다)",
    "examples": [
      {
        "translation": "가을 저녁 공기가 제법 쌀쌀하고 산들바람이 가로수 사이로 살랑 불어옵니다."
      },
      {
        "translation": "그는 긴장해서 시험장 앞을 자꾸 왔다 갔다 했어요."
      }
    ]
  },
  "vi_b2_18": {
    "title": "동사 + đi + 동사 + lại — 동작의 반복 강조 (몇 번이고 거듭 ~하다)",
    "shortExplanation": "같은 동사를 앞뒤에 두고 'đi ... lại'를 끼워 반복 횟수나 끈질김을 생생히 강조합니다.",
    "longExplanation": "'nghe đi nghe lại(거듭 듣다)', 'nói đi nói lại(여러 번 말하다)'처럼 회화에 필수적입니다.",
    "formation": "주어 + 동사 + đi + 동사 + lại",
    "examples": [
      {
        "translation": "연음을 잡아내기 위해 그 문장을 다섯 번이나 거듭해서 다시 들어야 했어요."
      },
      {
        "translation": "유창해질 때까지 짧은 대화문을 몇 번이고 반복해서 읽어 보세요."
      }
    ]
  },
  "vi_b2_19": {
    "title": "làm gì có / làm sao mà — 수사적 반박 (그런 게 어딨어 / 어떻게 ~할 수 있겠어)",
    "shortExplanation": "정보를 묻는 질문이 아니라 '말도 안 된다', '도저히 불가능하다'고 강하게 부인할 때 씁니다.",
    "longExplanation": "구어체에서 감정 실린 반박이나 강조 표현으로 아주 자주 쓰입니다.",
    "formation": "Làm gì có + 명사!  |  Làm sao mà + 동사 + được!",
    "examples": [
      {
        "translation": "하룻밤 공부해서 천 단어를 다 외운다는 게 말이 되나요!"
      },
      {
        "translation": "소리를 켜지 않고 어떻게 성조를 구별할 수 있겠어요!"
      }
    ]
  },
  "vi_b2_20": {
    "title": "đâu có (... đâu) — 자연스러운 반박·부인 (~한 적 없거든 · 전혀 ~하지 않아)",
    "shortExplanation": "'không phải'보다 훨씬 생생하게 '전혀 그렇지 않다'고 억울함이나 반박을 전합니다.",
    "longExplanation": "문장 끝에 'đâu'를 한 번 더 짝지어 강조하는 어법이 매우 흔합니다.",
    "formation": "주어 + đâu (có) + 서술어 (+ đâu)",
    "examples": [
      {
        "translation": "비난한 게 전혀 아니에요, 더 듣기 좋게 작은 의견만 보탠 것뿐이에요."
      },
      {
        "translation": "오늘 듣기 문제는 어제 우리가 생각했던 것만큼 전혀 어렵지 않았어요."
      }
    ]
  },
  "vi_b2_21": {
    "title": "chẳng lẽ lại — 설마하는 반문 (설마 ~하기야 하겠어?)",
    "shortExplanation": "상식이나 기대와 동떨어진 가능성을 두고 '설마 정말 그런 건 아니겠지?' 하며 놀라워합니다.",
    "longExplanation": "주로 '그럴 리 없는데'라는 의아함이나 반신반의가 담겨 있습니다.",
    "formation": "Chẳng lẽ (+ S) + lại + 믿기 어려운 일 (+ sao/à)?",
    "examples": [
      {
        "translation": "설마 이번 주 내내 복습 책을 한 번도 안 펴 본 건 아니겠지?"
      },
      {
        "translation": "이렇게 쉬운 단어를 설마 다른 뜻으로 잘못 들은 걸까?"
      }
    ]
  },
  "vi_b2_22": {
    "title": "bất chấp — 무릅씀 · 불문 (~에도 불구하고 · 아랑곳없이)",
    "shortExplanation": "어려운 여건이나 반대·위험을 아랑곳하지 않고 밀고 나감을 나타냅니다.",
    "longExplanation": "단순 양보 'mặc dù'보다 의지가 강하고 결연한 어감을 줍니다.",
    "formation": "Bất chấp + 난관/규정, 주절",
    "examples": [
      {
        "translation": "비바람 치는 날씨에도 불구하고 언어 교류 모임 자리는 꽉 찼습니다."
      },
      {
        "translation": "바쁜 업무 일정에도 아랑곳하지 않고 그녀는 매일 꾸준히 공부했습니다."
      }
    ]
  },
  "vi_b2_23": {
    "title": "nhờ có ... mới ... — 긍정적 결정 요인 강조 (~덕분에 비로소 …할 수 있었다)",
    "shortExplanation": "성공이나 발전을 이끌어 낸 핵심 도움·비결에 공을 돌릴 때 씁니다.",
    "longExplanation": "좋은 결과에만 쓰이며, 나쁜 결과의 원망에는 'tại / chỉ tại'를 씁니다.",
    "formation": "Nhờ (có) + 긍정 요인, S + mới + 좋은 결과",
    "examples": [
      {
        "translation": "스스로 녹음해 다시 들어 보는 습관 덕분에 발음이 이렇게 빨리 늘었어요."
      },
      {
        "translation": "제때 일깨워 주신 덕분에 저희가 이 실수를 피할 수 있었습니다."
      }
    ]
  },
  "vi_b2_24": {
    "title": "do / bởi vì ... nên mới ... — 인과 연결 강조 (~이기 때문에 바로 …한 것이다)",
    "shortExplanation": "앞선 원인이 바로 뒤의 구체적 결과를 낳았음을 논리적으로 또렷하게 잇습니다.",
    "longExplanation": "뒷절의 'mới'가 원인과 결과 사이의 필연성을 부각해 줍니다.",
    "formation": "Do / Bởi vì + 원인, nên (+ S) + mới + 결과",
    "examples": [
      {
        "translation": "한자어 기반 합성어가 많아서 초보자들이 추상적으로 느끼기 쉬운 것입니다."
      },
      {
        "translation": "자막이 짧은 마디로 나뉘어 있기 때문에 학습자가 음성을 따라 읽을 수 있는 겁니다."
      }
    ]
  },
  "vi_b2_25": {
    "title": "nói gì thì nói — 핵심 결론 정리 (뭐니 뭐니 해도 · 무슨 말을 해도 결국)",
    "shortExplanation": "여러 이견이나 부차적인 이야기를 접어두고 결국 부인할 수 없는 핵심을 짚어 냅니다.",
    "longExplanation": "토론이나 리뷰·일상 수다에서 결론을 내릴 때 아주 자연스럽습니다.",
    "formation": "Nói gì thì nói, + 핵심 주장",
    "examples": [
      {
        "translation": "뭐니 뭐니 해도 탄탄한 발음 기초가 초보자에게 가장 중요한 열쇠입니다."
      },
      {
        "translation": "아무튼 실생활 대화를 내 귀로 직접 알아들었을 때가 제일 뿌듯해요."
      }
    ]
  },
  "vi_b2_26": {
    "title": "xét cho cùng — 궁극적 평가 (결국 따지고 보면)",
    "shortExplanation": "여러 측면을 두루 살핀 뒤 본질적이고 균형 잡힌 최종 결론을 내릴 때 씁니다.",
    "longExplanation": "에세이, 해설, 깊이 있는 대화에서 설득력을 높여 줍니다.",
    "formation": "Xét cho cùng, + 총괄 결론",
    "examples": [
      {
        "translation": "결국 따지고 보면 언어 학습의 목표는 사람을 이해하고 연결되는 것입니다."
      },
      {
        "translation": "결국 작은 실수가 올바른 쓰임을 더 오래 기억하도록 도와줍니다."
      }
    ]
  },
  "vi_b2_27": {
    "title": "trước sau gì cũng — 조만간 필연적으로 (조만간 · 머지않아 어차피 ~하게 된다)",
    "shortExplanation": "시기의 문제일 뿐 늦든 빠르든 반드시 일어나고야 말 일임을 확신할 때 씁니다.",
    "longExplanation": "'trước sau gì' 뒤에는 반드시 'cũng'이 짝을 이루어 옵니다.",
    "formation": "Trước sau gì (+ S) + cũng + 결과",
    "examples": [
      {
        "translation": "매일 꾸준히 접하다 보면 조만간 자연스러운 문장이 입에서 저절로 나올 거예요."
      },
      {
        "translation": "이 문제는 늦든 빠르든 한 번은 솔직하게 마주 앉아 논의해야 합니다."
      }
    ]
  },
  "vi_b2_28": {
    "title": "chỉ tại — 부정적 원망·탓하기 (다 ~ 때문이야 · 하필 ~ 탓에)",
    "shortExplanation": "아쉽거나 속상한 결과의 책임을 딱 하나의 이유에 지목해 돌릴 때 씁니다.",
    "longExplanation": "친한 사이의 귀여운 투정부터 진지한 후회까지 두루 쓰입니다.",
    "formation": "(안 좋은 결과) + chỉ tại + 원인",
    "examples": [
      {
        "translation": "다 어젯밤 늦게까지 드라마 정주행한 탓에 오늘 아침 졸려 죽겠어요."
      },
      {
        "translation": "정답을 잊어버린 것도 이틀 뒤에 복습을 안 한 탓이에요."
      }
    ]
  },
  "vi_b2_29": {
    "title": "vừa mới ... đã ... — 눈 깜짝할 사이 연속 (방금 ~하자마자 벌써 …했다)",
    "shortExplanation": "앞의 일이 일어나자마자 놀라울 만큼 곧장 다음 결과로 이어졌음을 강조합니다.",
    "longExplanation": "뜻밖의 빠른 반응이나 놀라운 성취를 칭찬할 때도 자주 씁니다.",
    "formation": "주어 + vừa mới + 일 1 + (mà) đã + 일 2",
    "examples": [
      {
        "translation": "영상이 올라온 지 겨우 10분밖에 안 됐는데 벌써 댓글이 수백 개나 달렸어요."
      },
      {
        "translation": "며칠 배우지도 않았는데 벌써 여러 문장을 귀로 잡아내시네요."
      }
    ]
  },
  "vi_b2_30": {
    "title": "chưa ... đã ... — 성급함·이른 반응 (아직 ~도 하기 전에 벌써 …하다)",
    "shortExplanation": "앞 단계가 아직 끝나지도 않았는데 성급히 혹은 예상보다 빨리 다음 단계로 넘어감을 짚습니다.",
    "longExplanation": "'chưa(아직)'와 'đã(벌써)'의 대립이 선명한 대비감을 만듭니다.",
    "formation": "주어 + chưa (kịp) + 일 A + (mà) đã + 일 B",
    "examples": [
      {
        "translation": "많은 학습자가 문장을 끝까지 듣기도 전에 서둘러 낱말 하나하나를 찾아봅니다."
      },
      {
        "translation": "세미나가 아직 채 끝나지도 않았는데 청중들은 벌써 사인을 받으려고 줄을 섰습니다."
      }
    ]
  },
  "vi_b2_31": {
    "title": "đến mức (mà) — 극심한 정도 결과 (~할 정도로까지)",
    "shortExplanation": "정도나 수준이 임계점을 넘어서 놀랍거나 극단적인 결과로 이어졌음을 강조합니다.",
    "longExplanation": "단순한 'rất/quá'보다 생생한 극적 효과를 냅니다.",
    "formation": "상태/동작 + đến mức (mà) + 극적인 결과",
    "examples": [
      {
        "translation": "그 코미디 촌극은 몇 번을 돌려 봐도 여전히 웃음이 나올 정도로 재치가 넘쳤어요."
      },
      {
        "translation": "그녀는 쉐도잉을 너무 정확하게 연습해서 많은 사람이 하노이 토박이인 줄 알 정도예요."
      }
    ]
  },
  "vi_b2_32": {
    "title": "tùy theo / tùy thuộc vào — 조건 의존 (~에 따라 · ~에 달려 있다)",
    "shortExplanation": "목적이나 상황, 입력 조건에 따라 결과나 최적의 선택이 달라짐을 설명합니다.",
    "longExplanation": "'tùy theo'는 선택 기준 안내에, 'tùy thuộc vào'는 객관적 인과 분석에 잘 어울립니다.",
    "formation": "결과/선택 + tùy theo / tùy thuộc vào + 변수",
    "examples": [
      {
        "translation": "회화 목표인지 시험 대비인지에 따라 알맞은 단어 세트를 고르세요."
      },
      {
        "translation": "새 단어를 외우는 속도는 문맥 속에서 다시 마주치는 빈도에 달려 있습니다."
      }
    ]
  },
  "vi_b2_33": {
    "title": "trái ngược với — 정면 대조 (~와는 반대로 · ~와는 대조적으로)",
    "shortExplanation": "초기의 우려나 다른 특성 등과 정반대로 대비됨을 선명하게 드러냅니다.",
    "longExplanation": "단순 차이를 말하는 'khác với'보다 극적인 대비감이 강합니다.",
    "formation": "Trái ngược với + 대상 A, 내용 B",
    "examples": [
      {
        "translation": "당초 걱정과 달리 발표회는 아주 순조롭게 진행되었습니다."
      },
      {
        "translation": "실제 생활에서의 그의 목소리는 따뜻하고 중후해서 엄격한 배역과 정반대예요."
      }
    ]
  },
  "vi_b2_34": {
    "title": "có ... đi (chăng) nữa thì ... cũng — 극한 양보 (아무리 ~하더라도 역시)",
    "shortExplanation": "양보 조건을 극한까지 끌어올려 그럼에도 주절의 의지나 사실이 변치 않음을 강조합니다.",
    "longExplanation": "'đi chăng nữa'를 쓰면 한층 더 단호하고 호소력 있는 문체가 됩니다.",
    "formation": "(Dù) có + 극단적 상황 + đi (chăng) nữa, thì + vẫn/cũng...",
    "examples": [
      {
        "translation": "아무리 연설이 길더라도 다섯 문장씩 쪼개면 충분히 정복할 수 있어요."
      },
      {
        "translation": "설령 아무리 바쁘더라도 하루 10분 듣기 습관은 꼭 지켜 나가세요."
      }
    ]
  },
  "vi_c1_17": {
    "title": "xét về phương diện — 전문적 측면 분석 (~라는 측면에서 고찰하면)",
    "shortExplanation": "논의나 비평을 펼칠 때 구체적으로 어느 관점에 초점을 맞추는지 격식 있게 제시합니다.",
    "longExplanation": "'về mặt'보다 학술적·논설적 어조가 강해 강연과 에세이에 어울립니다.",
    "formation": "Xét về phương diện + 분야/관점, 주절",
    "examples": [
      {
        "translation": "음성학적 측면에서 보면 두 방언 모두 기본 성조 체계를 온전히 유지하고 있습니다."
      },
      {
        "translation": "실용적인 측면에서 볼 때 자연스러운 뭉치 표현으로 배우는 편이 시간을 훨씬 아껴 줍니다."
      }
    ]
  },
  "vi_c1_18": {
    "title": "không ngoại trừ khả năng — 신중한 유보 (~할 가능성도 배제할 수 없다)",
    "shortExplanation": "단정을 피하면서도 합리적인 위험이나 대안 시나리오를 객관적으로 열어 둘 때 씁니다.",
    "longExplanation": "뉴스 분석과 정책 브리핑에서 자주 볼 수 있는 표현입니다.",
    "formation": "Không ngoại trừ khả năng + 가정 절",
    "examples": [
      {
        "translation": "차용어의 발음이 시간이 지남에 따라 더 바뀔 가능성도 배제할 수 없습니다."
      },
      {
        "translation": "주최 측은 주말에 교류 모임을 추가로 열 가능성도 열어 두고 있습니다."
      }
    ]
  },
  "vi_c1_19": {
    "title": "về bản chất — 본질 규정 (본질적으로 · 근본적으로는)",
    "shortExplanation": "겉모습이나 용어 너머에 있는 개념·원리의 핵심 정체를 꿰뚫어 설명할 때 씁니다.",
    "longExplanation": "개념 설명이나 비교 분석 서두에 놓으면 문장의 깊이가 달라집니다.",
    "formation": "Về bản chất, + 핵심 본질",
    "examples": [
      {
        "translation": "본질적으로 간격 반복 학습은 잊어버리기 직전의 복습 시점을 최적화하는 것입니다."
      },
      {
        "translation": "본질적으로 두 구문은 같은 뜻을 전하지만 격식 수준만 다릅니다."
      }
    ]
  },
  "vi_c1_20": {
    "title": "một mặt ... mặt khác ... — 균형 잡힌 양면 논지 (한편으로는 ~이고, 다른 한편으로는 …)",
    "shortExplanation": "서로 보완적이거나 균형을 맞춰야 할 두 측면을 나란히 짚어 객관적 논리를 세웁니다.",
    "longExplanation": "논설문과 프레젠테이션, 심층 비평에서 필수적인 수사 구조입니다.",
    "formation": "Một mặt, + 측면 A; mặt khác, + 측면 B",
    "examples": [
      {
        "translation": "한편으로는 자막이 초보자의 부담을 덜어 주지만, 다른 한편으로는 점차 자막을 끄는 연습도 해야 합니다."
      },
      {
        "translation": "한편으론 복습 규율을 지키되, 다른 한편으론 스스로를 지나치게 몰아붙이지 마세요."
      }
    ]
  },
  "vi_c1_21": {
    "title": "căn cứ vào / dựa trên — 객관적 근거 기반 (~에 근거하여 · ~을 바탕으로)",
    "shortExplanation": "단순한 감이 아니라 통계, 규정, 실제 맥락 같은 검증된 근거 위에서 논지를 펼칩니다.",
    "longExplanation": "'căn cứ vào'는 규정·기준에, 'dựa trên'은 데이터·모델·경험에 잘 어울립니다.",
    "formation": "Căn cứ vào / Dựa trên + 근거, + 판단",
    "examples": [
      {
        "translation": "사용 빈도를 근거로 볼 때 이 어휘 묶음이 우선 학습 대상입니다."
      },
      {
        "translation": "시스템은 각 문장의 실제 문맥을 바탕으로 어휘를 추천합니다."
      }
    ]
  },
  "vi_c1_22": {
    "title": "đứng trên góc độ — 관점 설정 (~의 시각에서 바라보면)",
    "shortExplanation": "평가를 내리기 전에 누구의 입장 또는 어떤 학문적 관점에 서 있는지 분명히 밝힙니다.",
    "longExplanation": "다면적인 사안을 예의 바르고 균형 있게 논의할 때 유용합니다.",
    "formation": "Đứng trên góc độ + 입장/학문, + 평가",
    "examples": [
      {
        "translation": "학습자 관점에서 볼 때 깔끔한 자막은 눈의 피로를 눈에 띄게 줄여 줍니다."
      },
      {
        "translation": "언어학 시각에서 보면 첩어는 특유의 음악적 리듬을 만드는 역할을 합니다."
      }
    ]
  },
  "vi_c1_23": {
    "title": "kéo theo hệ lụy — 연쇄적 후폭풍 (심각한 파급·후유증을 초래하다)",
    "shortExplanation": "하나의 문제나 습관이 뒤이어 연쇄적인 부정적 파장을 일으킴을 경고할 때 씁니다.",
    "longExplanation": "신문·시사 평론에서 자주 쓰이는 격식 있는 연어 표현입니다.",
    "formation": "원인 + kéo theo hệ lụy (+ cho 대상)",
    "examples": [
      {
        "translation": "문맥 없이 무조건 외우기만 하면 의미를 혼동하기 쉬운 후유증이 따릅니다."
      },
      {
        "translation": "만성적인 수면 부족은 집중력에 여러 악영향을 끌어오게 됩니다."
      }
    ]
  },
  "vi_c1_24": {
    "title": "góp phần không nhỏ — 완곡한 찬사 (적지 않게 기여하다 · 큰 몫을 하다)",
    "shortExplanation": "'작지 않다'는 완곡한 이중 부정을 통해 핵심적인 기여를 품격 있게 치하하는 표현입니다.",
    "longExplanation": "감사 인사, 성과 보고, 기사 등에서 매우 세련되게 쓰입니다.",
    "formation": "요인 + góp phần không nhỏ + vào/trong + 성과",
    "examples": [
      {
        "translation": "매일 아침 흘려듣기는 소리에 대한 민감도를 높이는 데 적지 않은 기여를 합니다."
      },
      {
        "translation": "커뮤니티의 피드백은 새 기능을 완성하는 데 큰 몫을 했습니다."
      }
    ]
  },
  "vi_c1_25": {
    "title": "tuy nhiên vẫn phải thừa nhận — 공정한 양보 (하지만 ~라는 점은 인정해야 한다)",
    "shortExplanation": "아쉬운 점을 짚은 뒤에도 상대방의 장점이나 객관적 사실을 공정하게 인정해 논거에 품격을 더합니다.",
    "longExplanation": "토론이나 리뷰에서 균형 잡힌 시각을 보여 주는 고급 연결어입니다.",
    "formation": "주장 1. Tuy nhiên, vẫn phải thừa nhận (rằng) + 타당한 점",
    "examples": [
      {
        "translation": "이 자료는 다소 장황하긴 하지만, 그럼에도 예문 구성이 매우 풍부하다는 점은 인정해야 합니다."
      },
      {
        "translation": "원어민 속도가 처음엔 어렵지만 귀를 빠르게 트이게 해 준다는 점은 분명 인정할 만합니다."
      }
    ]
  },
  "vi_c1_26": {
    "title": "làm dấy lên lo ngại — 우려 촉발 (~에 대한 우려를 불러일으키다)",
    "shortExplanation": "어떤 현상이나 조치가 사회나 전문가 사이에 광범위한 걱정과 논의를 촉발함을 나타냅니다.",
    "longExplanation": "신문·방송 보도와 시사 평론에서 자주 쓰이는 고급 연어입니다.",
    "formation": "사건/추세 + làm dấy lên lo ngại (về/rằng) + 우려 사항",
    "examples": [
      {
        "translation": "기계 번역에 지나치게 의존하는 현상은 스스로 사고하는 능력에 대한 우려를 낳고 있습니다."
      },
      {
        "translation": "지역 방언의 쇠퇴는 연구자들 사이에서 깊은 우려를 불러일으키고 있습니다."
      }
    ]
  },
  "vi_c2_01": {
    "title": "âu cũng là — 달관적 수용 (어찌 보면 이 또한 ~인 셈이지)",
    "shortExplanation": "원치 않던 일이나 어긋난 계획을 '이 또한 나름의 뜻이나 섭리겠지' 하고 담담히 받아들일 때 씁니다.",
    "longExplanation": "문학적 깊이와 동양적 여운이 느껴지는 C2 고급 표현입니다.",
    "formation": "(뜻밖의 상황), âu cũng là + 성숙한 해석",
    "examples": [
      {
        "translation": "출발 직전에 여행이 연기된 것도 어찌 보면 온 가족이 쉴 좋은 기회인 셈이죠."
      },
      {
        "translation": "초반에 어려움을 겪는 것도 결국 인내심을 기르는 시련이라 할 수 있습니다."
      }
    ]
  },
  "vi_c2_02": {
    "title": "há chẳng phải ... sao — 고전적 수사 의문 (어찌 ~가 아니겠는가)",
    "shortExplanation": "상식이자 진리인 바를 '어찌 그렇지 않겠는가?'라는 웅변적 반문으로 힘 있게 강조합니다.",
    "longExplanation": "연설, 수필, 인문학 평론에서 깊은 울림을 주는 문어체 표현입니다.",
    "formation": "Há chẳng phải + 명백한 진리 + sao?",
    "examples": [
      {
        "translation": "새 언어를 배우는 것은 세상을 바라보는 또 하나의 문을 여는 일이 아니겠습니까?"
      },
      {
        "translation": "매일 작은 한 걸음씩 꾸준히 내딛는 것이야말로 가장 단단한 비결이 아니겠는가?"
      }
    ]
  },
  "vi_c2_03": {
    "title": "chẳng qua chỉ là ... mà thôi — 격식 있는 본질 축소 (결국 ~에 불과할 뿐이다)",
    "shortExplanation": "과장되거나 거창해 보이는 사안을 차분히 해체하여 '알고 보면 그저 ~일 뿐'이라고 단언합니다.",
    "longExplanation": "문미의 'mà thôi'가 평론 특유의 명징한 여운을 남깁니다.",
    "formation": "대상 + chẳng qua chỉ là + 단순 실체 + mà thôi",
    "examples": [
      {
        "translation": "그럴듯하게 들리는 그 용어들도 따지고 보면 옛 규칙에 새 이름만 붙인 것일 뿐입니다."
      },
      {
        "translation": "틀릴까 봐 두려워하는 마음은 결국 스스로 세운 심리적 장벽일 따름입니다."
      }
    ]
  },
  "vi_c2_04": {
    "title": "thiết nghĩ — 겸손하면서도 무게감 있는 소견 (감히 생각건대 · 제 생각에는)",
    "shortExplanation": "공손하고 차분한 태도를 지키면서 공동체나 청중에게 깊이 있는 제안을 꺼낼 때 씁니다.",
    "longExplanation": "격식 있는 칼럼·제안서·강연에서 품격을 높여 줍니다.",
    "formation": "Thiết nghĩ, + 진중한 견해/제언",
    "examples": [
      {
        "translation": "제 생각건대, 드문 표현 수백 개를 외우기보다는 핵심 어휘를 다지는 편이 낫습니다."
      },
      {
        "translation": "학교에서 실제 의사소통 실습 시간을 더 확보해야 한다고 생각합니다."
      }
    ]
  },
  "vi_c2_05": {
    "title": "khó lòng (mà) — 완곡한 불가함 (~하기 어렵다 · 도저히 ~하기 힘들다)",
    "shortExplanation": "단정적인 거절이나 불가능 대신 사리를 따져 품위 있게 한계를 짚어 줄 때 씁니다.",
    "longExplanation": "논평·조언·정중한 거절 모두에서 어조를 부드럽고 깊게 만듭니다.",
    "formation": "주어 + khó lòng (mà) + 동사",
    "examples": [
      {
        "translation": "실제 문맥을 접하지 않고서는 미묘한 어감을 온전히 느끼기 어렵습니다."
      },
      {
        "translation": "몇 주 벼락치기에만 기대어서는 자연스러운 말하기 반사 신경을 얻기 힘듭니다."
      }
    ]
  },
  "vi_c2_06": {
    "title": "dẫn tới hệ quả tất yếu — 필연적 귀결 (필연적인 결과로 이어지다)",
    "shortExplanation": "우연이 아니라 원인의 구조적 특성상 피할 수 없는 결과로 귀결됨을 논증할 때 씁니다.",
    "longExplanation": "학술·경제·비평 문장에서 논리적 탄탄함을 돋보이게 합니다.",
    "formation": "구조적 원인 + dẫn tới hệ quả tất yếu (là) + 결과",
    "examples": [
      {
        "translation": "초기 발음 훈련을 건너뛰면 계속 잘못 듣게 되는 필연적 결과로 이어집니다."
      },
      {
        "translation": "장기 투자를 줄이면 품질 저하라는 필연적 귀결을 맞게 됩니다."
      }
    ]
  },
  "vi_c2_07": {
    "title": "nếu không muốn nói là — 수사적 수위 격상 (굳이 ~라고까지는 안 하더라도 / 어쩌면 ~라 해도 과언이 아닌)",
    "shortExplanation": "일단 온건하게 말을 꺼낸 뒤 한 걸음 더 나아가 더 선명하고 강한 표현으로 격상시킵니다.",
    "longExplanation": "품위 있는 절제와 날카로운 강조를 동시에 살리는 고급 기법입니다.",
    "formation": "절제된 평가, nếu không muốn nói là + 더 강한 평가",
    "examples": [
      {
        "translation": "그 설명은 다소 모호한 편이며, 자칫 완전히 오해를 불러일으킬 수 있다고까지 말할 수 있습니다."
      },
      {
        "translation": "반 학생들의 발전 속도는 대단하며, 기대를 훨씬 뛰어넘었다고 해도 과언이 아닙니다."
      }
    ]
  },
  "vi_c2_08": {
    "title": "dù muốn dù không — 불가피한 현실 직시 (좋든 싫든 간에)",
    "shortExplanation": "개인의 선호나 바람과 무관하게 흘러가는 시대적 변화나 현실을 담담히 짚어 냅니다.",
    "longExplanation": "대칭적 리듬을 갖춘 간결하고 힘 있는 문어·강연 표현입니다.",
    "formation": "Dù muốn dù không, + 피할 수 없는 현실",
    "examples": [
      {
        "translation": "좋든 싫든 간에 SNS 은어는 일상 언어생활 속으로 스며들기 마련입니다."
      },
      {
        "translation": "원하든 원하지 않든 우리는 실생활의 자연스러운 말하기 속도에 적응해야 합니다."
      }
    ]
  },
  "vi_c2_09": {
    "title": "lấy ... làm trọng — 최우선 가치 중시 (~을 최우선으로 삼다 · ~을 중히 여기다)",
    "shortExplanation": "부차적인 기준보다 특정한 원칙이나 가치를 으뜸으로 삼아 중시함을 뜻합니다.",
    "longExplanation": "'신의를 으뜸으로 삼다(lấy chữ tín làm trọng)'처럼 품격 있는 교훈·원칙 표현에 잘 쓰입니다.",
    "formation": "(주체) lấy + 핵심 가치 + làm trọng",
    "examples": [
      {
        "translation": "실전 회화 연습에서는 자신감과 자연스러움을 가장 중시해야 합니다."
      },
      {
        "translation": "번역가들은 언제나 원문에 대한 충실함을 최우선 가치로 삼습니다."
      }
    ]
  },
  "vi_c2_10": {
    "title": "một khi đã ... thì ắt ... — 불가역적 필연 조건 (일단 ~하고 나면 틀림없이 …한다)",
    "shortExplanation": "일단 어떤 문턱을 넘고 나면 그에 따른 결과가 틀림없이 뒤따른다는 단단한 논리를 전합니다.",
    "longExplanation": "고급 문어 조동사 'ắt(반드시·틀림없이)'이 격조를 더합니다.",
    "formation": "Một khi đã + 전제, thì ắt (+ sẽ) + 필연 결과",
    "examples": [
      {
        "translation": "일단 철자 조합 규칙을 이해하고 나면 대부분의 새 단어를 틀림없이 읽을 수 있게 됩니다."
      },
      {
        "translation": "일단 분명한 약속을 세우고 나면 조직은 반드시 한마음으로 움직이게 됩니다."
      }
    ]
  },
  "vi_c2_11": {
    "title": "không khỏi + 감정 동사 — 주체할 수 없는 정서 (~하지 않을 수 없다 · 절로 ~해진다)",
    "shortExplanation": "일상 표현 'không nhịn được'보다 훨씬 문학적이며 감동·경탄·연민이 저절로 솟구침을 나타냅니다.",
    "longExplanation": "수필과 비평, 서사 문장에서 깊은 정서적 울림을 전합니다.",
    "formation": "주어 + không khỏi + 감정/심리 동사",
    "examples": [
      {
        "translation": "오래된 녹음 속 가족의 목소리를 다시 들으며 모두가 뭉클해지지 않을 수 없었습니다."
      },
      {
        "translation": "그 소박한 글귀를 읽다 보면 독자들은 절로 공감의 미소를 짓게 됩니다."
      }
    ]
  },
  "vi_c2_12": {
    "title": "vô hình trung — 의도치 않은 보이지 않는 작용 (무의식중에 · 결과적으로 어느새)",
    "shortExplanation": "특별한 의도 없이 한 일이 보이지 않는 사이에 큰 파급 효과를 낳았음을 지적하는 한자어 부사입니다.",
    "longExplanation": "사회 평론이나 습관 분석에서 통찰력 있는 문장을 만들어 줍니다.",
    "formation": "행동 A + vô hình trung + 뜻밖의 영향 B",
    "examples": [
      {
        "translation": "번역이 달린 영상만 보는 습관은 본의 아니게 귀가 글자에 의존하도록 만듭니다."
      },
      {
        "translation": "매일 저녁 나누던 대화 습관이 어느새 가족 모두를 더 단단히 이어 주었습니다."
      }
    ]
  },
  "vi_c2_13": {
    "title": "(không) nhất thiết phải — 절대적 필수성과 불필요 (반드시 ~할 필요는 없다 / 꼭 ~해야 한다)",
    "shortExplanation": "절대적 필수 요건을 짚거나, 특히 부정형 'không nhất thiết phải'로 '꼭 그래야만 하는 건 아니다'라고 여유를 줍니다.",
    "longExplanation": "전문 가이드나 지침서에서 정확하게 선을 그어 줄 때 자주 씁니다.",
    "formation": "주어 + (không) nhất thiết phải + 동사",
    "examples": [
      {
        "translation": "듣기 연습을 막 시작했을 때는 반드시 한 단어 한 단어 다 알아들어야 할 필요는 없어요."
      },
      {
        "translation": "시스템이 안정적으로 작동하려면 기기를 주기적으로 반드시 업데이트해야 합니다."
      }
    ]
  },
  "vi_c2_14": {
    "title": "tựu trung lại — 품격 있는 총괄 요약 (요컨대 · 한데 모아 말하자면)",
    "shortExplanation": "여러 갈래의 논의를 마지막에 단 하나의 명쾌한 핵심 명제로 응축해 냅니다.",
    "longExplanation": "일상적인 'tóm lại'보다 훨씬 격조 높아 연설과 논문의 마무리에 빛납니다.",
    "formation": "Tựu trung (lại), + 핵심 총평",
    "examples": [
      {
        "translation": "요컨대, 지속 가능한 발전의 열쇠는 여전히 교육의 질에 달려 있습니다."
      },
      {
        "translation": "총괄해 보자면 모든 효과적인 학습법은 꾸준한 노출을 중심으로 돌아갑니다."
      }
    ]
  },
  "vi_c2_15": {
    "title": "biết bao nhiêu mà kể — 이루 다 헤아릴 수 없는 감회 (말로 다 할 수 없다)",
    "shortExplanation": "기쁨이나 추억, 헌신의 깊이가 너무 커서 일일이 꼽기조차 어렵다는 서정적 감탄 표현입니다.",
    "longExplanation": "회고록이나 감사 연설의 끝자락에서 짙은 울림을 줍니다.",
    "formation": "추억·정성·노고 + biết bao nhiêu mà kể",
    "examples": [
      {
        "translation": "학창 시절 함께 모여 공부하던 아름다운 추억은 이루 다 헤아릴 수 없을 정도입니다."
      },
      {
        "translation": "선생님들의 헌신적인 마음이 얼마나 많은 세대에게 영감을 주었는지 말로 다 할 수 없습니다."
      }
    ]
  },
  "vi_c2_16": {
    "title": "thử hỏi — 날카로운 자문 유도 (한번 묻고 싶다 · 생각해 보라)",
    "shortExplanation": "일방적으로 훈계하는 대신 '만약 이렇다면 과연 어떻겠는가?' 하고 청중 스스로 답을 떠올리게 만듭니다.",
    "longExplanation": "논평과 연설에서 묵직한 문제의식을 던지는 소크라테스식 수사법입니다.",
    "formation": "Thử hỏi (+ 가정), + 성찰 질문",
    "examples": [
      {
        "translation": "한번 물어봅시다, 모두가 틀릴까 봐 말하기를 꺼린다면 언어가 어떻게 살아 숨 쉴 수 있겠습니까?"
      },
      {
        "translation": "조용한 끈기 없이 이루어진 지속 가능한 성취가 과연 있겠습니까?"
      }
    ]
  }
};

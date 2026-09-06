import { GrammarTranslation } from '../../../models/grammar.model';

export const GRAMMAR_EN_KO: Record<string, GrammarTranslation> = {
  "en_a1_01": {
    "title": "am / is / are - be동사의 현재형",
    "shortExplanation": "be동사의 현재형: I에는 am, he/she/it에는 is, you/we/they에는 are를 쓰며, '~이다', '~에 있다'를 나타냅니다.",
    "longExplanation": "be동사는 영어에서 가장 기본적이고 핵심적인 동사로, 주어와 명사 또는 형용사를 연결하여 상태를 나타내거나 '~이다', '~에 있다'라는 의미를 나타냅니다. 현재 시제에서는 주어의 인칭과 수에 따라 세 가지 형태로 활용합니다:\n• 'am': 1인칭 단수인 'I'에만 쓰입니다.\n• 'is': 3인칭 단수(he, she, it, 단수 가산명사, 불가산명사)에 쓰입니다.\n• 'are': 2인칭 및 복수 주어(you, we, they, 복수 명사)에 쓰입니다.",
    "formation": "주어 + am / is / are (+ 명사 / 형용사 / 전치사구)",
    "examples": [
      {
        "translation": "배가 고파요."
      },
      {
        "translation": "그녀는 의사입니다."
      },
      {
        "translation": "그들은 준비가 되었습니다."
      }
    ]
  },
  "en_a1_02": {
    "title": "be동사의 부정문: am not / isn't / aren't",
    "shortExplanation": "be동사 바로 뒤에 'not'을 붙여 부정문을 만듭니다. 축약형은 isn't, aren't, I'm not입니다.",
    "longExplanation": "be동사의 부정문은 'am', 'is', 'are' 바로 뒤에 부정어 'not'을 붙여 만듭니다. 일상 대화나 편안한 문체에서는 주로 축약형을 사용합니다:\n• is not → isn't\n• are not → aren't\n• am not은 'amn't'로 줄이지 않고, 주어와 결합하여 'I'm not'으로 축약합니다(예외적인 주요 규칙).",
    "formation": "주어 + am / is / are + not (+ 명사 / 형용사)",
    "examples": [
      {
        "translation": "저는 학생이 아닙니다."
      },
      {
        "translation": "그는 피곤하지 않습니다."
      },
      {
        "translation": "우리는 준비되지 않았습니다."
      }
    ]
  },
  "en_a1_03": {
    "title": "be동사의 의문문: Am I? / Is she? / Are they?",
    "shortExplanation": "be동사를 주어 앞으로 도치시켜 의문문을 만듭니다. 의문사가 있는 경우 '의문사 + be동사 + 주어' 순서로 씁니다.",
    "longExplanation": "be동사가 포함된 문장을 의문문으로 만들 때는 be동사(am / is / are)를 주어 앞으로 이동시킵니다(예: She is → Is she?).\n• 일반의문문(Yes/No 의문문): Am / Is / Are + 주어...?\n• 의문사 의문문: 의문사(Where, What, Who 등) + am / is / are + 주어...?\n• 간결한 대답: Yes, 대명사 주어 + be동사. / No, 대명사 주어 + be동사 + not.",
    "formation": "Am / Is / Are + 주어...? 또는 의문사 + am / is / are + 주어...?",
    "examples": [
      {
        "translation": "당신은 학생입니까?"
      },
      {
        "translation": "그것은 비쌉니까?"
      },
      {
        "translation": "그들은 어디에 있습니까?"
      }
    ]
  },
  "en_a1_04": {
    "title": "짧은 대답: Yes, I am. / No, she isn't.",
    "shortExplanation": "be동사 의문문에 대한 짧은 대답: 긍정 대답에서는 축약형을 쓸 수 없으며 온전한 형태로 써야 합니다(Yes, I am O / Yes, I'm X). 부정 대답에서는 축약형을 씁니다.",
    "longExplanation": "be동사로 묻는 질문에 짧게 답할 때는 'Yes/No + 인칭대명사 + be동사' 형태를 취합니다.\n• 긍정 대답(Yes): 반드시 be동사의 완전한 형태를 사용해야 하며, 절대 축약형을 쓸 수 없습니다(옳음: Yes, I am. / 틀림: Yes, I'm.; 옳음: Yes, she is. / 틀림: Yes, she's.).\n• 부정 대답(No): 일반적으로 축약형을 씁니다(예: No, I'm not. / No, she isn't. / No, they aren't.).",
    "formation": "긍정: Yes, + 대명사 + am / is / are. | 부정: No, + 대명사 + am not / isn't / aren't.",
    "examples": [
      {
        "translation": "그녀는 준비가 되었나요? — 네, 되었습니다."
      },
      {
        "translation": "그들은 당신의 친구들인가요? — 아니요, 아닙니다."
      }
    ]
  },
  "en_a1_05": {
    "title": "부정관사: a / an",
    "shortExplanation": "셀 수 있는 단수 명사 앞에 붙여 정해지지 않은 하나를 나타냅니다. 자음 소리 앞에는 'a', 모음 소리 앞에는 'an'을 씁니다.",
    "longExplanation": "'a'와 'an'은 부정관사로서, 특정되지 않은 셀 수 있는 단수 명사를 처음 언급할 때 사용합니다. 'a'와 'an'의 구별은 철자 표기가 아닌 바로 뒤에 오는 단어의 '첫 발음(음소)'에 의해 결정됩니다:\n• 'a': 자음 소리로 시작하는 단어 앞(예: a book, a car, a university - 철자는 모음이지만 발음이 반모음/자음인 /juː/로 시작).\n• 'an': 모음 소리로 시작하는 단어 앞(예: an apple, an hour - h가 묵음이라 모음 /aʊ/로 시작, an honest man).\n• 복수 명사나 셀 수 없는 명사(불가산명사) 앞에는 쓰지 않습니다.",
    "formation": "a + 자음 소리로 시작하는 단어 / an + 모음 소리로 시작하는 단어 + 셀 수 있는 단수 명사",
    "examples": [
      {
        "translation": "정원에서 고양이 한 마리를 보았습니다."
      },
      {
        "translation": "그녀는 엔지니어입니다."
      },
      {
        "translation": "한 시간 걸렸습니다."
      }
    ]
  },
  "en_a1_06": {
    "title": "정관사: the",
    "shortExplanation": "대화하는 사람 모두가 무엇인지 알고 있는 특정한 대상을 가리킬 때 명사 앞에 붙입니다. 세상에 유일한 것, 최상급 등에도 쓰입니다.",
    "longExplanation": "'the'는 정관사로서 단수 명사, 복수 명사, 셀 수 없는 명사 앞에 두루 쓰이며, 이미 특정된 대상('그 ~')을 가리킵니다. 주요 용법:\n1. 앞에서 이미 언급된 대상을 다시 가리킬 때: I saw a cat. The cat was black.\n2. 세상에 하나밖에 없는 유일한 대상: the sun(태양), the moon(달), the earth(지구).\n3. 대화 맥락이나 상황상 어느 것인지 알 수 있을 때: Close the window, please.(창문 좀 닫아주세요).\n4. 형용사의 최상급이나 서수 앞: the best(최고의), the first(첫 번째의).",
    "formation": "the + 명사(단수, 복수, 불가산 명사)",
    "examples": [
      {
        "translation": "우리가 본 영화는 정말 훌륭했습니다."
      },
      {
        "translation": "소금 좀 건네주시겠어요?"
      }
    ]
  },
  "en_a1_07": {
    "title": "무관사: 관사를 쓰지 않는 경우",
    "shortExplanation": "고유명사, 언어, 스포츠, 일반적인 총칭을 나타내는 명사 앞에는 a, an, the를 붙이지 않습니다.",
    "longExplanation": "영어에서는 명사 앞에 관사(a, an, the)를 쓰지 않는 '무관사' 용법이 있습니다. 대표적인 경우는 다음과 같습니다:\n• 고유명사(인명, 도시, 국가 이름): John, London, Russia, Korea.\n• 언어 이름: English, Spanish, Korean.\n• 구기 종목 및 스포츠, 게임: football, basketball, chess.\n• 일반적인 의미의 음식 및 음료: I love coffee, She drinks milk.\n• 막연한 총칭으로서의 추상 개념: Life is short. Love is blind.\n• 종류 전체를 총칭하는 복수 명사: Dogs are friendly(개는 친근한 동물이다).",
    "formation": "동사 / 전치사 + 명사(관사 없음)",
    "examples": [
      {
        "translation": "그녀는 스페인어를 합니다."
      },
      {
        "translation": "그는 매일 농구를 합니다."
      }
    ]
  },
  "en_a1_08": {
    "title": "단순 현재 시제: 긍정문",
    "shortExplanation": "일상적인 습관, 보편적 진리, 현재의 사실을 나타냅니다. 3인칭 단수가 주어일 때 동사 끝에 -s 또는 -es를 붙입니다.",
    "longExplanation": "단순 현재 시제(Present Simple)는 일상적인 습관, 반복되는 일과, 과학적 사실이나 불변의 진리를 나타낼 때 씁니다.\n• 동사 형태 활용:\n- 주어가 I / you / we / they 및 복수 명사일 때: 동사원형을 그대로 씁니다.\n- 주어가 he / she / it 및 단수 명사(3인칭 단수)일 때: 동사원형 끝에 '-s' 또는 '-es'를 붙입니다.\n• -s / -es 표기 규칙:\n- 대부분의 동사: '-s'를 붙임(works, plays).\n- -o, -ch, -sh, -s, -ss, -x로 끝나는 동사: '-es'를 붙임(goes, watches, washes).\n- '자음 + y'로 끝나는 동사: y를 i로 고치고 '-es'를 붙임(study → studies, try → tries).",
    "formation": "주어 (I/you/we/they) + 동사원형 | 주어 (he/she/it) + 동사원형에 -s/-es",
    "examples": [
      {
        "translation": "저는 매일 아침 커피를 마십니다."
      },
      {
        "translation": "그녀는 병원에서 일합니다."
      },
      {
        "translation": "지구는 태양 주위를 돕니다."
      }
    ]
  },
  "en_a1_09": {
    "title": "단순 현재 시제: 부정문 (don't / doesn't)",
    "shortExplanation": "조동사 'don't' 또는 'doesn't' 뒤에 동사원형을 붙여 부정문을 만듭니다.",
    "longExplanation": "일반동사의 현재 시제 부정문은 조동사 do / does 뒤에 not을 붙인 형태(don't / doesn't)를 사용하며, 뒤따르는 본동사는 반드시 동사원형이어야 합니다:\n• 주어가 I / you / we / they일 때: don't (do not) + 동사원형.\n• 주어가 he / she / it(3인칭 단수)일 때: doesn't (does not) + 동사원형.\n주의할 점: doesn't 뒤에 오는 동사는 이미 원형으로 환원되었으므로 -s나 -es를 다시 붙이지 않습니다(옳음: He doesn't like / 틀림: He doesn't likes).",
    "formation": "주어 (I/you/we/they) + don't + 동사원형 | 주어 (he/she/it) + doesn't + 동사원형",
    "examples": [
      {
        "translation": "저는 고기를 먹지 않습니다."
      },
      {
        "translation": "그는 프랑스어를 하지 못합니다."
      },
      {
        "translation": "그들은 여기서 일하지 않습니다."
      }
    ]
  },
  "en_a1_10": {
    "title": "단순 현재 시제: 의문문 (Do you? / Does she?)",
    "shortExplanation": "조동사 Do 또는 Does를 주어 앞으로 보내고 동사원형을 씁니다. 의문사 의문문은 '의문사 + do/does + 주어 + 동사원형' 형태입니다.",
    "longExplanation": "일반동사의 현재 시제 의문문은 조동사 Do 또는 Does를 주어 앞으로 도치시키며, 본동사는 항상 원형을 씁니다:\n• 일반의문문(Yes/No 의문문):\n- Do + I/you/we/they + 동사원형...?\n- Does + he/she/it + 동사원형...?\n• 의문사 의문문: 의문사(Where, What, When 등) + do / does + 주어 + 동사원형...?",
    "formation": "Do / Does + 주어 + 동사원형...? 또는 의문사 + do / does + 주어 + 동사원형...?",
    "examples": [
      {
        "translation": "러시아어를 할 줄 아십니까?"
      },
      {
        "translation": "그녀는 근처에 사나요?"
      },
      {
        "translation": "어디에서 일하십니까?"
      }
    ]
  },
  "en_a1_11": {
    "title": "상태동사: 진행형으로 쓸 수 없는 동사",
    "shortExplanation": "상태, 감정, 인식 등을 나타내는 동사는 원칙적으로 진행형(-ing)으로 쓰지 않습니다('I know'로 쓰며 'I am knowing'은 불가).",
    "longExplanation": "상태동사(Stative verbs)는 일시적인 신체 동작이 아니라, 감정, 심리 상태, 감각, 인지 과정, 소유 관계 등의 지속적인 상태를 나타내는 동사입니다. 이러한 동사는 원칙적으로 현재진행형 등의 진행형(be + -ing)으로 쓰지 않습니다:\n• 인지 및 사고: know(알다), believe(믿다), understand(이해하다), remember(기억하다), forget(잊다).\n• 감정 및 바람: love(사랑하다), hate(싫어하다), like(좋아하다), want(원하다), need(필요로 하다), prefer(더 좋아하다).\n• 지각 및 감각: see(보이다), hear(들리다), smell(냄새가 나다), taste(맛이 나다).\n• 소유 및 존재: belong(속하다), contain(포함하다), seem(~처럼 보이다).",
    "formation": "주어 + 상태동사(단순 시제로 쓰며, 진행형 -ing 형태 불가)",
    "examples": [
      {
        "translation": "당신 말을 이해합니다. (틀린 표현: I am understanding)"
      },
      {
        "translation": "그녀는 초콜릿을 매우 좋아합니다. (틀린 표현: is loving)"
      }
    ]
  },
  "en_a1_12": {
    "title": "인칭대명사: I, you, he, she, it, we, they",
    "shortExplanation": "영어 문장에서는 주어를 생략할 수 없으며 명시해야 합니다. 주어 역할을 하는 주격(I, you, he...)과 목적어 역할을 하는 목적격(me, you, him...)을 구별합니다.",
    "longExplanation": "한국어와 달리 영어 문장에서는 명령문 등을 제외하고는 주어를 임의로 생략할 수 없으므로, 반드시 명확한 주어 대명사를 밝혀 써야 합니다.\n• 주격 대명사(동사 앞에 위치하여 주어로 쓰임): I(나), you(너/너희들), he(그), she(그녀), it(그것), we(우리), they(그들/그것들).\n• 목적격 대명사(동사나 전치사 뒤에 위치하여 목적어로 쓰임): me, you, him, her, it, us, them(예: Tell him, Help me, Listen to us).",
    "formation": "주격 대명사 + 동사 | 동사 / 전치사 + 목적격 대명사",
    "examples": [
      {
        "translation": "그녀는 선생님입니다."
      },
      {
        "translation": "그에게 진실을 말해 주세요."
      },
      {
        "translation": "저를 좀 도와주실 수 있나요?"
      }
    ]
  },
  "en_a1_13": {
    "title": "소유격 형용사: my, your, his, her, its, our, their",
    "shortExplanation": "명사 바로 앞에 붙어 '~의'라는 소유 관계를 나타냅니다. 뒤에 오는 명사의 수(단수/복수)에 따라 형태가 변하지 않습니다.",
    "longExplanation": "소유격 형용사(소유한정사)는 명사 앞에 놓여 해당 대상의 소유자나 소속을 밝혀 줍니다:\n• my(나의), your(너의/너희들의), his(그의), her(그녀의), its(그것의), our(우리의), their(그들의/그것들의).\n• 중요한 구별: 소유를 나타내는 'its'(아포스트로피 없음)와 it is의 축약형인 'it's'(아포스트로피 있음)를 절대 혼동하지 않아야 합니다.\n• 뒤따르는 명사가 단수이든 복수이든 형태가 달라지지 않습니다(예: my friend / my friends 모두 동일하게 'my' 사용).",
    "formation": "소유격 형용사 (my / your / his / her / its / our / their) + 명사",
    "examples": [
      {
        "translation": "이것은 제 휴대전화입니다."
      },
      {
        "translation": "그들의 강아지는 귀엽습니다."
      },
      {
        "translation": "그 고양이는 발을 다쳤습니다."
      }
    ]
  },
  "en_a1_14": {
    "title": "명사의 복수형",
    "shortExplanation": "기본 규칙은 명사 끝에 -s 또는 -es를 붙이는 것이며, -y, -f/-fe 어미 변화와 불규칙 복수형이 있습니다.",
    "longExplanation": "영어에서 셀 수 있는 명사(가산명사)가 둘 이상일 때는 복수형으로 표기합니다:\n• 기본 규칙: 명사 끝에 '-s'를 붙임(cat → cats, book → books).\n• -s, -ss, -sh, -ch, -x, -o로 끝나는 경우: '-es'를 붙임(box → boxes, watch → watches, tomato → tomatoes).\n• '모음 + y'로 끝나는 경우: 그대로 '-s'를 붙임(boy → boys, day → days).\n• '자음 + y'로 끝나는 경우: y를 i로 고치고 '-es'를 붙임(city → cities, baby → babies).\n• -f 또는 -fe로 끝나는 경우: 이를 '-ves'로 바꿈(knife → knives, leaf → leaves, wife → wives).\n• 주요 불규칙 복수형 명사: child → children, man → men, woman → women, tooth → teeth, foot → feet, mouse → mice, person → people, sheep → sheep, fish → fish.",
    "formation": "단수 명사 + s / es / ies / ves (또는 불규칙 복수형)",
    "examples": [
      {
        "translation": "버스 한 대 → 버스 두 대"
      },
      {
        "translation": "아이 한 명 → 많은 아이들"
      }
    ]
  },
  "en_a1_15": {
    "title": "지시대명사: This / that / these / those",
    "shortExplanation": "가까운 대상을 가리키는 this/these(이것/이것들)와 먼 대상을 가리키는 that/those(저것/저것들). 단수는 this/that, 복수는 these/those를 씁니다.",
    "longExplanation": "지시대명사는 화자로부터의 물리적 또는 시간적 거리, 그리고 수(단수/복수)에 따라 대상을 가리킬 때 씁니다:\n• 'this'(이것, 이 사람): 화자와 가까운 거리에 있는 단수 대상.\n• 'these'(이것들, 이 사람들): 화자와 가까운 거리에 있는 복수 대상.\n• 'that'(저것, 그것, 저 사람): 화자로부터 멀리 떨어진 단수 대상 또는 이미 언급된 내용.\n• 'those'(저것들, 그것들, 저 사람들): 화자로부터 멀리 떨어진 복수 대상.\n시간 개념에도 자주 활용됩니다: this week(이번 주), that year(그해).",
    "formation": "This / That + 단수 명사(또는 단수 동사) | These / Those + 복수 명사(또는 복수 동사)",
    "examples": [
      {
        "translation": "이것은 제 가방입니다."
      },
      {
        "translation": "저 신발들은 비쌉니다."
      },
      {
        "translation": "저것은 무엇입니까?"
      }
    ]
  },
  "en_a1_16": {
    "title": "There is / There are - 존재 표현",
    "shortExplanation": "특정 장소에 사람이나 사물이 존재하는 것을 나타내며, '~이/가 있다'라는 뜻입니다.",
    "longExplanation": "'There is / There are' 구문은 새로운 정보로서 사람이나 사물의 존재를 나타낼 때 사용하며, 한국어의 '~이/가 있다'에 해당합니다.\n• There is + 단수 명사 또는 셀 수 없는 명사(불가산 명사)\n• There are + 복수 명사\n부정문: There isn't / There aren't\n의문문: be동사를 문두로 보내어 Is there...? / Are there...?",
    "formation": "긍정문: There is + 단수 명사/불가산 명사 | There are + 복수 명사\n부정문: There isn't / There aren't + 명사\n의문문: Is there...? / Are there...?",
    "examples": [
      {
        "translation": "이 근처에 영화관이 하나 있습니다."
      },
      {
        "translation": "근처에 가게가 있나요? — 네, 있습니다."
      }
    ]
  },
  "en_a1_17": {
    "title": "장소의 전치사: in, on, at, under, next to, behind, between",
    "shortExplanation": "사람이나 사물이 위치한 공간적인 장소를 나타내며, '~ 안에', '~ 위에', '~에(서)' 등을 의미합니다.",
    "longExplanation": "가장 대표적인 3가지 장소 전치사:\n• in = 공간이나 구역의 '내부': in the box(상자 안에), in the city(도시에서), in bed(침대에)\n• on = 접촉해 있는 '표면 위': on the table(탁자 위에), on the wall(벽에), on the left(왼쪽에)\n• at = 특정 '지점이나 장소': at the station(역에서), at home(집에서), at school(학교에서)\n기타 전치사: under(~ 아래에), next to / beside(~ 옆에), behind(~ 뒤에), in front of(~ 앞에), between(~ 사이에), opposite(~ 맞은편에).",
    "formation": "장소 전치사 (in / on / at / under / next to / behind...) + 명사구/장소",
    "examples": [
      {
        "translation": "열쇠는 탁자 위에 있습니다."
      },
      {
        "translation": "그녀는 부엌에 있습니다."
      },
      {
        "translation": "입구에서 만나요."
      }
    ]
  },
  "en_a1_18": {
    "title": "명령문 (Imperative)",
    "shortExplanation": "명령, 요청, 지시, 권유를 나타내며, '~해라', '~하지 마라', '~하자'의 뜻입니다.",
    "longExplanation": "영어의 명령문은 주어를 생략하고 동사 원형으로 문장을 시작합니다.\n• 긍정 명령: 동사 원형으로 시작 (예: Open your books - 책을 펴세요).\n• 부정 명령(금지): Don't + 동사 원형 (예: Don't run - 뛰지 마세요).\n• 문장 앞이나 뒤에 'please'를 붙이면 정중한 요청의 의미가 됩니다.\n• 말하는 사람을 포함하는 제안 및 권유: 'Let's + 동사 원형' (예: Let's go! - 가자!).",
    "formation": "긍정 명령: 동사 원형 (+ 목적어 등)\n부정 명령(금지): Don't + 동사 원형\n정중한 요청: (Please) + 동사 원형 + (please)\n권유/제안: Let's + 동사 원형",
    "examples": [
      {
        "translation": "교차로에서 좌회전하세요."
      },
      {
        "translation": "그것을 만지지 마세요!"
      },
      {
        "translation": "잠깐 쉬자."
      }
    ]
  },
  "en_a1_19": {
    "title": "can / can't - 능력, 가능성, 허가",
    "shortExplanation": "능력, 가능성, 또는 허가나 요청을 나타내는 조동사로, '~할 수 있다' / '~할 수 없다'의 뜻입니다.",
    "longExplanation": "'can'은 조동사로서 뒤에 항상 동사 원형이 오며, 다음과 같은 의미를 나타냅니다:\n1. 능력 및 기술: '~할 수 있다', '~할 줄 안다' (예: I can play the guitar - 나는 기타를 칠 수 있다)\n2. 가능성: '~할 수도 있다' (예: It can be dangerous - 위험할 수도 있다)\n3. 허가 및 요청(구어체): '~해도 될까요?', '~해 주실래요?' (예: Can I use your phone? - 전화기 좀 써도 될까요?)\n부정형은 can't(cannot의 축약형)입니다.",
    "formation": "긍정문: 주어 + can + 동사 원형\n부정문: 주어 + can't (cannot) + 동사 원형\n의문문: Can + 주어 + 동사 원형...?",
    "examples": [
      {
        "translation": "저는 3개 국어를 구사할 수 있습니다."
      },
      {
        "translation": "그녀는 오늘 올 수 없습니다."
      },
      {
        "translation": "저 좀 도와주실 수 있나요?"
      }
    ]
  },
  "en_a1_20": {
    "title": "의문사: what, where, who, when, how, why, which, whose, how much/many",
    "shortExplanation": "구체적인 정보를 묻는 의문문을 만들 때 사용하는 말로, '무엇', '어디', '누구', '언제' 등을 뜻합니다.",
    "longExplanation": "의문사는 원칙적으로 문장 맨 앞에 위치하며, 뒤에 조동사나 be동사가 주어 앞으로 도치되어 이어집니다.\n• what = 무엇, 무슨\n• where = 어디\n• who = 누구 (주어를 물을 때는 do/does 없이 동사가 바로 옴: Who lives here?)\n• when = 언제\n• why = 왜\n• which = 어느 것, 어떤 (선택 범위가 정해져 있을 때)\n• whose = 누구의 (것)\n• how = 어떻게; how much = 얼마, 얼마나 (셀 수 없는 명사나 가격); how many = 몇 개, 얼마나 (셀 수 있는 복수 명사); how old = 몇 살; how long = 얼마나 오래/길게.",
    "formation": "의문사 + 조동사 / be동사 + 주어 + 동사 원형 / 보어...?",
    "examples": [
      {
        "translation": "그녀는 어디에서 일하나요?"
      },
      {
        "translation": "지금 몇 시인가요?"
      },
      {
        "translation": "남자 형제가 몇 명 있습니까?"
      }
    ]
  },
  "en_a1_21": {
    "title": "기수사 (수사): 1–1000",
    "shortExplanation": "사람이나 사물의 수량을 셀 때 사용하는 수사로, '하나, 둘, 셋... 백, 천' 등을 나타냅니다.",
    "longExplanation": "1부터 1000까지의 영어 기수사 구성 규칙:\n• 1~12: 고유 단어 (one, two, three... twelve).\n• 13~19: 어미에 '-teen'을 붙임 (thirteen, fourteen... nineteen; thirteen, fifteen, eighteen 철자 주의).\n• 10단위 정수(20~90): 어미에 '-ty'를 붙임 (twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety).\n• 십 자리와 일 자리의 복합수: 하이픈(-)으로 연결 (예: 21 = twenty-one).\n• 백과 천: 100 = a/one hundred, 1000 = a/one thousand.\n• 영국식 영어에서는 hundred 뒤에 'and'를 넣어 십의 자리나 일의 자리를 잇습니다 (예: two hundred and fifty).",
    "formation": "십의 자리 + 하이픈(-) + 일의 자리 (21~99) | 숫자 + hundred / thousand (+ and + 나머지 수)",
    "examples": [
      {
        "translation": "그녀는 스물세 살입니다."
      },
      {
        "translation": "그 티켓은 400파운드입니다."
      }
    ]
  },
  "en_a1_22": {
    "title": "서수사 (순서 수사): first, second, third...",
    "shortExplanation": "순서, 등수, 날짜, 건물의 층수 등을 나타내며, '첫 번째, 두 번째, 세 번째...'의 뜻입니다.",
    "longExplanation": "영어의 서수사는 대부분 기수사 뒤에 '-th'를 붙여 만듭니다 (fourth, sixth, seventh 등).\n반드시 암기해야 할 불규칙 형태: first (첫 번째), second (두 번째), third (세 번째), fifth (다섯 번째), eighth (여덟 번째), ninth (아홉 번째), twelfth (열두 번째).\n핵심 규칙: 특정한 순서를 나타내므로 서수 앞에는 대개 정관사 'the'를 붙입니다 (예: the first day - 첫날, the third floor - 3층).\n분수 표현에도 쓰입니다: ½ = a half (2분의 1), ⅓ = a third (3분의 1), ¼ = a quarter (4분의 1).",
    "formation": "the + 서수사 (+ 명사) | (예: the first, the second, the third... the twenty-first)",
    "examples": [
      {
        "translation": "제 사무실은 3층에 있습니다."
      },
      {
        "translation": "오늘은 3월 1일입니다."
      }
    ]
  },
  "en_a1_23": {
    "title": "명사의 소유격: 's 와 s'",
    "shortExplanation": "아포스트로피와 's'를 사용하여 소유 관계를 나타내며, '~의'라는 뜻입니다.",
    "longExplanation": "영어에서는 명사 뒤에 아포스트로피와 s('s 또는 s')를 붙여 소유 관계를 표현합니다:\n• 단수 명사: 뒤에 ''s'를 붙임 (예: Tom's book - 톰의 책, the dog's tail - 개의 꼬리).\n• -s로 끝나는 규칙 복수 명사: 아포스트로피(')만 붙임 (예: the teachers' room - 교무실, my parents' house - 부모님의 집).\n• -s로 끝나지 않는 불규칙 복수 명사: ''s'를 붙임 (예: the children's playground - 아이들의 놀이터, men's clothes - 남성복).\n• -s로 끝나는 고유명사(인명 등): James's 와 James' 모두 맞습니다.",
    "formation": "단수 명사 + 's + 소유 명사 | -s로 끝나는 복수 명사 + ' + 소유 명사",
    "examples": [
      {
        "translation": "이것은 안나의 노트북입니다."
      },
      {
        "translation": "아이들의 장난감은 상자 안에 있습니다."
      }
    ]
  },
  "en_a1_24": {
    "title": "이동과 방향의 전치사: to, into, out of, up, down, along, across, through",
    "shortExplanation": "이동 동사와 함께 쓰여 동작의 방향이나 이동 경로를 나타내며, '~로', '~ 안으로', '~을 건너' 등을 뜻합니다.",
    "longExplanation": "이동을 나타내는 동사와 결합하여 움직임의 방향과 경로를 나타내는 전치사들입니다:\n• to = 특정 목적지를 향한 이동: go to work(출근하다), walk to the park(공원으로 걷다)\n• into = 내부로 들어가는 이동: come into the room(방 안으로 들어오다), jump into the pool(수영장으로 뛰어들다)\n• out of = 안에서 밖으로 나오는 이동: get out of the car(차에서 내리다), take out of the bag(가방에서 꺼내다)\n• up / down = 위로 / 아래로: climb up the hill(언덕을 오르다), walk down the stairs(계단을 내려가다)\n• along = ~을 따라: walk along the river(강을 따라 걷다)\n• across = 표면을 가로질러/건너서: swim across the lake(호수를 수영해 건너다), walk across the road(길을 건너다)\n• through = 3차원 공간이나 터널 등을 뚫고 통과하여: drive through the tunnel(터널을 운전해 지나가다).",
    "formation": "이동 동사 + 이동 전치사 (to / into / out of / across / through...) + 명사/장소",
    "examples": [
      {
        "translation": "그녀는 방 안으로 걸어 들어갔습니다."
      },
      {
        "translation": "그는 길을 가로질러 달렸습니다."
      },
      {
        "translation": "우리는 차를 타고 숲을 통과해 지나갔습니다."
      }
    ]
  },
  "en_a2_01": {
    "title": "단순 과거 시제 - 규칙 동사: -ed형",
    "shortExplanation": "과거에 완료된 동작이나 상태를 나타내며, 규칙 동사의 어미에 '-ed'를 붙입니다.",
    "longExplanation": "단순 과거 시제는 과거의 특정 시점에 일어나 이미 완료된 동작이나 사실을 나타냅니다.\n규칙 동사에 '-ed'를 붙이는 철자 규칙:\n• 대부분의 동사: 뒤에 '-ed'를 붙임 (worked, played).\n• '-e'로 끝나는 동사: '-d'만 붙임 (loved, used).\n• '자음 + y'로 끝나는 동사: 'y'를 'i'로 바꾸고 '-ed'를 붙임 (studied, tried).\n• '단모음 + 단자음'으로 끝나는 1음절 동사: 마지막 자음을 하나 더 쓰고 '-ed'를 붙임 (stopped, planned).",
    "formation": "주어 + 규칙 동사 과거형(-ed) (+ 목적어/과거 부사구)",
    "examples": [
      {
        "translation": "그녀는 어제 하루 종일 일했습니다."
      },
      {
        "translation": "그들은 지난주 일요일에 테니스를 쳤습니다."
      }
    ]
  },
  "en_a2_02": {
    "title": "단순 과거 시제 - 불규칙 동사",
    "shortExplanation": "'-ed'를 붙이지 않고 고유한 형태로 변화하는 불규칙 동사를 사용하여 과거의 동작을 나타냅니다.",
    "longExplanation": "영어의 자주 쓰이는 많은 동사들은 과거형을 만들 때 '-ed'를 붙이지 않고 불규칙하게 형태가 변화합니다 (가장 빈도 높은 약 50개 동사가 일상 사용의 약 90%를 차지함).\n형태 변화에 따른 분류:\n• AAA형 (원형, 과거형, 과거분사형이 모두 동일): cut, put, hit, set, let.\n• ABA형 (과거분사형이 원형과 동일): run→ran→run, come→came→come.\n• ABC형 (세 형태가 모두 다름): go→went→gone, be→was/were→been, see→saw→seen.\n• ABB형 (과거형과 과거분사형이 동일): have→had→had, buy→bought→bought.",
    "formation": "주어 + 불규칙 동사 과거형 (+ 목적어/과거 부사구)",
    "examples": [
      {
        "translation": "저는 지난여름에 파리에 갔습니다."
      },
      {
        "translation": "그녀는 아주 훌륭한 영화를 보았습니다."
      },
      {
        "translation": "우리는 9시에 회의를 했습니다."
      }
    ]
  },
  "en_a2_03": {
    "title": "단순 과거 시제 - 부정문: didn't + 동사 원형",
    "shortExplanation": "과거에 일어나지 않은 동작이나 사실을 부정하여, '~하지 않았다'라는 뜻을 나타냅니다.",
    "longExplanation": "일반동사의 단순 과거 시제 부정문은 주어의 인칭이나 수와 관계없이 조동사 'did not'의 축약형인 'didn't'를 사용합니다.\n가장 중요한 규칙: 'didn't' 뒤에 오는 본동사는 반드시 '동사 원형'을 써야 하며, 과거형을 쓰면 안 됩니다 (예: She didn't go 가 맞으며, She didn't went 는 틀림).",
    "formation": "주어 + didn't (did not) + 동사 원형",
    "examples": [
      {
        "translation": "저는 어제 그를 보지 못했습니다."
      },
      {
        "translation": "그녀는 출근하지 않았습니다."
      }
    ]
  },
  "en_a2_04": {
    "title": "단순 과거 시제 - 의문문: Did you? Where did she go?",
    "shortExplanation": "과거의 일에 대해 묻는 의문문으로, '~했습니까?', '~하셨나요?'의 뜻을 나타냅니다.",
    "longExplanation": "일반동사의 단순 과거 시제 의문문 만드는 법:\n• Yes/No 의문문: 문장 맨 앞에 조동사 'Did'를 두고 동사 원형을 씁니다: Did + 주어 + 동사 원형...? (예: Did they arrive? - 그들이 도착했나요?)\n• 의문사 의문문: 의문사 뒤에 'did + 주어 + 동사 원형' 어순으로 씁니다: 의문사 + did + 주어 + 동사 원형...? (예: Where did they go? - 그들은 어디로 갔나요?)\n• 예외: 의문사 자체가 주어인 경우에는 조동사 did 없이 동사를 바로 과거형으로 씁니다 (예: Who told you that? - 누가 당신에게 그 말을 했나요?).",
    "formation": "Yes/No 의문문: Did + 주어 + 동사 원형...?\n의문사 의문문: 의문사 + did + 주어 + 동사 원형...?",
    "examples": [
      {
        "translation": "영화 재미있게 보셨나요?"
      },
      {
        "translation": "그들은 어디로 갔습니까?"
      },
      {
        "translation": "누가 당신에게 그 말을 해주었나요?"
      }
    ]
  },
  "en_a2_05": {
    "title": "was / were - be동사의 과거형",
    "shortExplanation": "be동사의 과거 형태로, 과거의 상태나 위치, 성질을 나타내며 '~이었다', '~에 있었다'의 뜻입니다.",
    "longExplanation": "be동사의 과거형은 주어의 인칭과 수에 따라 'was'와 'were' 두 가지로 나뉩니다:\n• was: 주어가 I, he, she, it 및 단수 명사/셀 수 없는 명사일 때 사용합니다.\n• were: 주어가 you, we, they 및 복수 명사일 때 사용합니다.\n부정문: wasn't (= was not) / weren't (= were not).\n의문문: was 또는 were를 주어 앞으로 보냅니다: Was she...? / Were they...?",
    "formation": "긍정문: I / He / She / It + was | You / We / They + were\n부정문: 주어 + wasn't / weren't\n의문문: Was / Were + 주어...?",
    "examples": [
      {
        "translation": "어젯밤에 저는 무척 피곤했습니다."
      },
      {
        "translation": "그들은 하루 종일 집에 있었습니다."
      },
      {
        "translation": "그것은 비쌌나요?"
      }
    ]
  },
  "en_a2_06": {
    "title": "will - 미래 예측과 즉각적인 결정",
    "shortExplanation": "말하는 순간에 내린 즉각적인 결정, 미래 예측, 약속, 요청을 나타내는 조동사로, '~할 것이다', '~하겠다'의 뜻입니다.",
    "longExplanation": "조동사 'will'은 뒤에 동사 원형이 오며, 주로 다음과 같은 미래의 상황에 쓰입니다:\n1. 즉각적인 결정: I'll help you with that (내가 그거 도와줄게).\n2. 명확한 근거 없는 주관적 예측: I think it will rain (비가 올 것 같다).\n3. 약속: I won't tell anyone (아무에게도 말하지 않을게).\n4. 요청: Will you open the window? (창문 좀 열어 주겠니?).\n축약형은 ''ll'이며, 부정형은 'won't' (= will not)입니다.",
    "formation": "긍정문: 주어 + will ('ll) + 동사 원형\n부정문: 주어 + won't (will not) + 동사 원형\n의문문: Will + 주어 + 동사 원형...?",
    "examples": [
      {
        "translation": "전화벨이 울리네요. — 제가 받을게요!"
      },
      {
        "translation": "내일은 날씨가 추울 것입니다."
      }
    ]
  },
  "en_a2_07": {
    "title": "be going to - 사전 계획 및 확실한 예측",
    "shortExplanation": "이전에 미리 결심한 의도나 눈앞의 확실한 징후를 바탕으로 한 예측을 나타냅니다.",
    "longExplanation": "'be going to'는 주로 다음과 같은 상황에서 쓰입니다:\n1. 미리 계획하거나 결심한 의도: 'I'm going to start a diet next week.' (다음 주부터 다이어트를 시작할 거야).\n2. 눈앞에 보이는 근거를 바탕으로 한 예측: 'Look at those clouds - it's going to rain!' (저 먹구름 좀 봐, 비가 오겠어!).\n형태: am/is/are + going to + 동사원형",
    "formation": "주어 + am/is/are + going to + 동사원형",
    "examples": [
      {
        "translation": "저는 의학을 공부할 계획입니다."
      },
      {
        "translation": "그녀는 곧 출산할 예정입니다."
      }
    ]
  },
  "en_a2_08": {
    "title": "현재진행형: am/is/are + V-ing",
    "shortExplanation": "지금 이 순간 일어나고 있는 동작이나 현재 일시적으로 진행 중인 일을 나타냅니다.",
    "longExplanation": "현재진행형(Present Continuous)은 말하는 바로 지금 진행 중인 동작이나, 요즘 일시적으로 하고 있는 일을 나타낼 때 사용합니다.\n형태: am/is/are + 동사-ing\n-ing 변형 규칙:\n• 대부분의 동사: 원형 뒤에 -ing → working, playing\n• -e로 끝나는 동사: -e를 빼고 -ing → making, coming\n• 단모음+단자음으로 끝나는 단음절 동사: 마지막 자음을 한 번 더 쓰고 -ing → running, sitting",
    "formation": "주어 + am/is/are + 동사-ing",
    "examples": [
      {
        "translation": "저는 지금 영어를 공부하고 있습니다."
      },
      {
        "translation": "그녀는 이번 달에 재택근무를 하고 있습니다."
      }
    ]
  },
  "en_a2_09": {
    "title": "예정된 미래를 나타내는 현재진행형",
    "shortExplanation": "시간과 장소 등이 이미 확정된 구체적인 미래 계획이나 약속을 나타냅니다.",
    "longExplanation": "현재진행형은 이미 구체적으로 합의되거나 약속된 미래 일정을 표현할 때 쓰이며, 보통 시간과 장소가 결정되어 있습니다.\n차이점 비교:\n• 'I'm meeting Alice tomorrow': 만나기로 미리 약속이 되어 있음 (확정된 계획).\n• 'I'll meet Alice tomorrow': 즉흥적인 결정이나 막연한 의도, 제안.",
    "formation": "주어 + am/is/are + 동사-ing + 미래 시간 표현",
    "examples": [
      {
        "translation": "오늘 밤에 알렉스와 저녁을 먹기로 했어요."
      },
      {
        "translation": "그들은 6월에 결혼할 예정입니다."
      }
    ]
  },
  "en_a2_10": {
    "title": "현재시제와 현재진행형의 차이",
    "shortExplanation": "현재시제는 반복되는 습관과 일반적 사실을, 현재진행형은 지금 일어나는 동작이나 일시적 상황을 나타냅니다.",
    "longExplanation": "현재시제(Present Simple): 반복적인 습관, 변함없는 사실, 시간표, 보편적 진리를 나타냅니다.\n현재진행형(Present Continuous): 말하는 순간 진행 중인 일이나 요즘 한시적으로 일어나는 일을 나타냅니다.\n비교 예시:\n• 'She speaks French.': 그녀는 프랑스어를 할 줄 안다 (지속적인 능력 및 상태).\n• 'She is speaking French.': 그녀는 지금 프랑스어로 말하고 있다.",
    "formation": "현재시제: 주어 + 동사원형/3인칭단수형 | 현재진행형: 주어 + am/is/are + 동사-ing",
    "examples": [
      {
        "translation": "물은 100도에서 끓습니다."
      },
      {
        "translation": "이번 주에 아주 훌륭한 책을 한 권 읽고 있습니다."
      }
    ]
  },
  "en_a2_11": {
    "title": "should / shouldn't - 조언 및 권유",
    "shortExplanation": "부드러운 조언이나 개인적 의견을 나타내며, '~하는 편이 좋다(해야 한다)', '~하지 않는 편이 좋다'는 뜻입니다.",
    "longExplanation": "'should'는 상대방에게 부드럽게 권유하거나 의견을 제시할 때 사용하며, 'must'보다 강제성이 훨씬 약합니다.\n'should / shouldn't' 뒤에는 to가 붙지 않는 동사원형이 옵니다.\n과거의 일에 대한 후회나 비판을 나타낼 때는 'should have + 과거분사' 형태를 사용합니다.",
    "formation": "주어 + should / shouldn't + 동사원형",
    "examples": [
      {
        "translation": "운동을 더 많이 하시는 편이 좋겠습니다."
      },
      {
        "translation": "그녀는 그렇게 무리해서 일하지 말아야 합니다."
      }
    ]
  },
  "en_a2_12": {
    "title": "must / mustn't - 의무 및 강한 금지",
    "shortExplanation": "'must'는 강한 의무나 필수를, 'mustn't'는 절대 해서는 안 되는 강력한 금지를 나타냅니다.",
    "longExplanation": "'must'는 강한 의무(화자 자신의 주관적 필요나 절대적 요구)를 나타냅니다.\n'mustn't'는 절대 해서는 안 되는 금지 사항을 의미합니다.\n주의할 점:\n• mustn't = 금지 (~해서는 안 된다)\n• don't have to = 불필요 (~할 필요가 없다, 해도 상관없음)",
    "formation": "주어 + must / mustn't + 동사원형",
    "examples": [
      {
        "translation": "여권을 반드시 제시하셔야 합니다."
      },
      {
        "translation": "여기서 담배를 피우시면 절대 안 됩니다."
      }
    ]
  },
  "en_a2_13": {
    "title": "have to - 객관적 필요성",
    "shortExplanation": "규칙, 법률, 외부 환경 등 객관적인 요인에 의해 '~해야 한다'는 필요성을 나타냅니다.",
    "longExplanation": "'have to'는 외부의 규칙, 규정, 상황 등의 제약으로 인해 발생하는 객관적 의무를 나타냅니다.\n'must'와의 차이점:\n• must - 주관적 의무: 'I must call her' (내 스스로 전화해야겠다고 생각함).\n• have to - 객관적 의무: 'I have to wear a uniform' (규칙상 유니폼을 입어야 함).\n부정형인 'don't have to'는 '~할 필요가 없다 (선택 사항)'를 의미합니다.",
    "formation": "주어 + have to / has to / don't have to / doesn't have to + 동사원형",
    "examples": [
      {
        "translation": "금요일까지 이 보고서를 끝내야 합니다."
      },
      {
        "translation": "오기 싫으시다면 오지 않으셔도 됩니다."
      }
    ]
  },
  "en_a2_14": {
    "title": "could - 과거의 능력 및 정중한 부탁",
    "shortExplanation": "과거에 할 수 있었던 능력을 나타내거나, 공손하게 부탁할 때 '~해 주시겠어요?'의 뜻으로 쓰입니다.",
    "longExplanation": "'could'는 'can'의 과거형이며, 두 가지 주된 용법이 있습니다:\n1. 과거의 능력: 'I could read at 4 years old.' (저는 4살 때 글을 읽을 수 있었습니다).\n2. 정중한 요청/부탁 ('can'보다 훨씬 공손한 어조): 'Could you pass the salt, please?' (소금 좀 건네주시겠어요?).\n또한 현재 시점에서의 불확실한 가능성('~일 수도 있다')을 나타내기도 합니다: 'It could be true.' (사실일 수도 있습니다).",
    "formation": "주어 + could + 동사원형 | Could + 주어 + 동사원형...?",
    "examples": [
      {
        "translation": "그녀는 어릴 때 바이올린을 켤 줄 알았습니다."
      },
      {
        "translation": "조금만 더 천천히 말씀해 주시겠습니까?"
      }
    ]
  },
  "en_a2_15": {
    "title": "형용사의 비교급",
    "shortExplanation": "두 대상을 비교할 때 쓰이며, 짧은 형용사는 -er을 붙이고 긴 형용사는 앞에 more를 씁니다.",
    "longExplanation": "형용사 비교급 규칙:\n• 1음절 형용사 및 -y로 끝나는 2음절 형용사: 어미에 -er 첨가 (fast → faster, happy → happier).\n• 2음절 이상의 긴 형용사: more + 형용사 원급 (more interesting).\n• 철자 규칙: -e로 끝나는 단어는 -r만 추가 (nice → nicer), 단모음+단자음은 마지막 자음 중복 (big → bigger), 자음+-y는 -ier로 변환 (heavy → heavier).\n• 불규칙 변화: good → better, bad → worse, far → further/farther, much/many → more.\n비교 대상 앞에는 주로 'than'을 붙입니다: 'She is taller than her sister.'",
    "formation": "짧은 형용사-er + than / more + 긴 형용사 + than",
    "examples": [
      {
        "translation": "이 영화는 저 영화보다 더 흥미롭습니다."
      },
      {
        "translation": "오늘은 어제보다 상태가 더 안 좋습니다."
      }
    ]
  },
  "en_a2_16": {
    "title": "형용사의 최상급",
    "shortExplanation": "셋 이상의 대상 중 '가장 ~한'을 나타내며, 짧은 형용사는 'the + -est', 긴 형용사는 'the most'를 붙입니다.",
    "longExplanation": "형용사 최상급 규칙:\n• 1음절 단어: the + 형용사-est (the biggest).\n• 2음절 이상의 긴 단어: the most + 형용사 원급 (the most beautiful).\n• 철자 변화는 비교급과 동일합니다: -e로 끝나는 단어는 -st, 단모음+단자음은 자음 중복, 자음+-y는 -iest로 변경.\n• 불규칙 변화: good → the best, bad → the worst, far → the furthest/farthest, much/many → the most.",
    "formation": "the + 짧은 형용사-est / the most + 긴 형용사",
    "examples": [
      {
        "translation": "이곳은 도시에서 가장 비싼 식당입니다."
      },
      {
        "translation": "그는 팀에서 가장 훌륭한 선수입니다."
      }
    ]
  },
  "en_a2_17": {
    "title": "some / any - 불특정한 수량 표현",
    "shortExplanation": "'some'은 긍정문과 권유·요청에 쓰이고, 'any'는 부정문과 일반 의문문에 쓰입니다.",
    "longExplanation": "'some'과 'any'는 셀 수 없는 명사 또는 복수 명사 앞에 붙어 불특정한 양이나 수를 나타냅니다:\n• some: 주로 긍정문에 쓰이며, 상대방에게 무언가를 권하거나 긍정의 대답을 기대하는 의문문에서도 쓰입니다 (예: 'Would you like some tea?', 'Can I have some water?').\n• any: 주로 부정문(전혀 ~없다)과 일반 의문문(조금이라도 ~있는가)에 사용됩니다.",
    "formation": "some / any + 셀 수 없는 명사 또는 복수 명사",
    "examples": [
      {
        "translation": "빵과 우유를 조금 샀습니다."
      },
      {
        "translation": "냉장고에 우유가 좀 있나요?"
      },
      {
        "translation": "수중에 현금이 전혀 없습니다."
      }
    ]
  },
  "en_a2_18": {
    "title": "much / many / a lot of / a few / a little - 수량 한정사",
    "shortExplanation": "'much/a little'은 셀 수 없는 명사에, 'many/a few'는 셀 수 있는 명사에, 'a lot of'는 둘 다에 쓰입니다.",
    "longExplanation": "수량 표현의 상세 구분 및 용법:\n• much: 셀 수 없는 명사 수식 (much water, much time). 주로 부정문과 의문문에서 쓰입니다.\n• many: 셀 수 있는 복수 명사 수식 (many people, many books).\n• a lot of / lots of: 셀 수 있는 명사와 없는 명사 모두에 사용 가능한 일상 회화 표현.\n• a few: 몇몇의, 조금 있는 (셀 수 있는 명사, 긍정적 뉘앙스).\n• few: 거의 없는 (셀 수 있는 명사, 부정적 뉘앙스).\n• a little: 약간의, 조금 있는 (셀 수 없는 명사, 긍정적 뉘앙스).\n• little: 거의 없는 (셀 수 없는 명사, 부정적 뉘앙스).",
    "formation": "much/a little + 셀 수 없는 명사 | many/a few + 셀 수 있는 복수 명사 | a lot of + 둘 다 가능",
    "examples": [
      {
        "translation": "저는 시간이 많지 않습니다."
      },
      {
        "translation": "그녀에게는 런던에 몇 명의 친구가 있습니다."
      },
      {
        "translation": "설탕이 조금 남아 있습니다."
      }
    ]
  },
  "en_a2_19": {
    "title": "가산명사와 불가산명사",
    "shortExplanation": "가산명사는 직접 셀 수 있어 복수형이 존재하며, 불가산명사는 직접 셀 수 없어 복수형이나 부정관사를 쓰지 않습니다.",
    "longExplanation": "명사의 가산성과 불가산성 구분:\n• 가산명사(Countable): 숫자로 직접 셀 수 있으며, 단수형과 복수형이 있습니다 (예: a book, two books).\n• 불가산명사(Uncountable): 직접 숫자로 셀 수 없으므로 복수형이 없으며 부정관사(a/an)를 붙일 수 없습니다.\n대표적인 불가산명사: water(물), milk(우유), bread(빵), rice(쌀), money(돈), information(정보), advice(조언), news(뉴스), weather(날씨), luggage(짐), furniture(가구), hair(머리카락), music(음악), work(일).\n불가산명사의 수량을 나타낼 때는 단위 명사를 사용합니다: a glass of water(물 한 잔), a piece of advice(조언 한마디), a loaf of bread(빵 한 덩이), a bag of rice(쌀 한 포대).",
    "formation": "가산명사: a/an + 단수명사 / 복수명사-s/es | 불가산명사: 단위 표현 + of + 불가산명사",
    "examples": [
      {
        "translation": "정보를 좀 얻을 수 있을까요?"
      },
      {
        "translation": "그녀는 나에게 매우 유용한 조언을 해 주었습니다."
      }
    ]
  },
  "en_a2_20": {
    "title": "시간 전치사 in / on / at",
    "shortExplanation": "'at'은 특정한 시각, 'on'은 요일과 날짜, 'in'은 월·연도·계절·긴 기간에 씁니다.",
    "longExplanation": "시간을 나타내는 전치사의 기본 용법:\n• at → 정확한 시각이나 특정 시점: at 6 o'clock (6시에), at noon (정오에), at midnight (자정에), at night (밤에), at the weekend (주말에).\n• on → 요일 및 특정한 날짜, 기념일: on Monday (월요일에), on 5 March (3월 5일에), on my birthday (내 생일에), on New Year's Day (새해 첫날에).\n• in → 월, 연도, 계절, 세기 등 비교적 긴 기간 및 하루 중의 시간대: in July (7월에), in 2023 (2023년에), in the morning/afternoon/evening (아침/오후/저녁에), in summer (여름에), in the 21st century (21세기에).\n전치사를 쓰지 않는 경우: this / last / next가 붙는 시간 표현 앞에는 전치사를 생략합니다 (예: this morning, last week, next year).",
    "formation": "at + 구체적 시각 | on + 요일/날짜/특정한 날 | in + 월/연도/계절/세기",
    "examples": [
      {
        "translation": "회의는 3시 반에 있습니다."
      },
      {
        "translation": "그녀는 4월 12일에 태어났습니다."
      },
      {
        "translation": "저는 10월에 이 일을 시작했습니다."
      }
    ]
  },
  "en_a2_21": {
    "title": "for / since / ago - 기간, 시작 시점, 과거 시점",
    "shortExplanation": "'for'는 지속되는 기간, 'since'는 시작된 과거 시점, 'ago'는 현재 기준 과거의 시점을 나타냅니다.",
    "longExplanation": "'for', 'since', 'ago'의 용법 및 차이점:\n• for - 동작이나 상태가 지속된 기간(얼마 동안): for two hours (2시간 동안), for a week (일주일 동안), for years (수년 동안). 다양한 시제와 결합할 수 있습니다.\n• since - 동작이나 상태가 시작된 과거의 기점(~이래로, ~부터): since Monday (월요일부터), since 2019 (2019년부터), since I was a child (어릴 때부터). 주로 현재완료 시제와 함께 쓰입니다.\n• ago - 현재를 기준으로 '얼마 전'이라는 과거의 특정 시점: three days ago (3일 전), a month ago (한 달 전). 과거시제와만 함께 사용합니다.",
    "formation": "for + 기간 | since + 시작 시점/과거 절 | 기간 + ago",
    "examples": [
      {
        "translation": "저는 이곳에 6개월 동안 머물고 있습니다."
      },
      {
        "translation": "그녀는 2020년부터 여기서 일하고 있습니다."
      },
      {
        "translation": "저는 이틀 전에 그를 보았습니다."
      }
    ]
  },
  "en_a2_22": {
    "title": "부가의문문: ...isn't it? / ...do you? / ...haven't they?",
    "shortExplanation": "평서문 뒤에 덧붙여 상대방에게 확인이나 동의를 구할 때 쓰이며, '~그렇죠?', '~맞지요?'의 뜻입니다.",
    "longExplanation": "부가의문문은 평서문 끝에 짧은 의문 형태를 덧붙여 상대방에게 사실을 확인하거나 동의를 유도할 때 사용하는 문법입니다.\n기본 규칙:\n• 앞 문장이 긍정문이면 뒤에는 부정 의문문（예: 당신은 재즈를 좋아하죠, 그렇지 않나요?）.\n• 앞 문장이 부정문이면 뒤에는 긍정 의문문（예: 당신은 공포 영화를 안 좋아하죠, 맞나요?）.\n덧붙는 꼬리 부분의 조동사(또는 be동사)는 앞문장의 시제와 주어에 일치해야 하며, 주어 자리는 반드시 인칭대명사를 사용합니다.\n억양에 따른 차이:\n• 억양을 내릴 때(↘): 이미 확신하고 있으며 단순한 동의나 확인을 구할 때.\n• 억양을 올릴 때(↗): 확신이 없어 상대방의 대답을 실제로 묻고자 할 때.",
    "formation": "긍정문: 긍정 평서문 + , + 부정 조동사 + 주어 대명사?\n부정문: 부정 평서문 + , + 긍정 조동사 + 주어 대명사?",
    "examples": [
      {
        "translation": "날씨가 정말 좋네요, 그렇지 않나요?"
      },
      {
        "translation": "당신은 공포 영화를 좋아하지 않죠, 맞나요?"
      },
      {
        "translation": "그녀는 수영을 할 수 있죠, 그렇지 않나요?"
      }
    ]
  },
  "en_a2_23": {
    "title": "have got - 소유 표현 (영국식 구어)",
    "shortExplanation": "주로 영국식 영어 회화에서 소유나 관계를 나타낼 때 쓰이며, 일반동사 have와 마찬가지로 '~을 가지고 있다', '~이 있다'의 뜻입니다.",
    "longExplanation": "have got은 영국 영어 구어체에서 소유를 나타낼 때 자주 쓰이는 표현으로, 일반동사 have와 동일한 의미를 지닙니다.\n문장 형태:\n• 긍정문: 주어 + have got / has got (축약형: 've got / 's got).\n• 부정문: 주어 + haven't got / hasn't got (do나 does 같은 조동사를 쓰지 않음).\n• 의문문: Have / Has + 주어 + got ...? (단답: Yes, I have. / No, I haven't.).\n주의 사항: 현재시제에서만 소유의 뜻으로 쓰이며, 과거의 소유를 나타낼 때는 had got이 아니라 일반동사 had를 씁니다.",
    "formation": "긍정문: 주어 + have got / has got + 명사\n부정문: 주어 + haven't got / hasn't got + 명사\n의문문: Have / Has + 주어 + got + 명사?",
    "examples": [
      {
        "translation": "저는 형제가 두 명 있습니다."
      },
      {
        "translation": "지금 몇 시인지 아시나요?"
      },
      {
        "translation": "그녀는 현금이 전혀 없습니다."
      }
    ]
  },
  "en_a2_24": {
    "title": "양태부사(방식부사): quickly, carefully, well, hard, fast",
    "shortExplanation": "동작이 어떻게 이루어지는지 설명하며, 주로 동사 뒤나 목적어 뒤에 위치합니다.",
    "longExplanation": "양태부사(방식부사)는 어떤 동작이나 행동이 어떠한 방식과 모양새로 일어나는지 구체적으로 설명해 주는 부사입니다.\n형태 규칙:\n• 대부분의 부사는 형용사 끝에 -ly를 붙여 만듭니다: quick → quickly (빠르게), careful → carefully (조심스럽게), slow → slowly (느리게).\n불규칙 및 주의해야 할 예외:\n• good → well (잘, 훌륭하게; goodly라는 형태는 쓰지 않음).\n• fast → fast (빨리; 형용사와 형태가 같으며 fastly는 없음).\n• hard → hard (열심히, 세게; hardly는 '거의 ~않다'라는 완전히 다른 의미임).\n• late → late (늦게; lately는 '최근에'라는 뜻의 다른 단어임).\n문장 속 위치: 주로 동사 뒤 또는 목적어 뒤에 옵니다 (예: She speaks English well). 동사와 목적어 사이에 부사를 끼워 넣지 않도록 주의해야 합니다.",
    "formation": "형용사 + -ly (또는 불규칙 형태)\n어순: 동사 + 부사 또는 동사 + 목적어 + 부사",
    "examples": [
      {
        "translation": "그는 그것을 명확하게 설명했습니다."
      },
      {
        "translation": "그녀는 빠르게 달렸습니다."
      },
      {
        "translation": "그들은 하루 종일 열심히 일했습니다."
      }
    ]
  },
  "en_a2_25": {
    "title": "빈도부사와 문장 내 위치",
    "shortExplanation": "어떤 동작이 얼마나 자주 일어나는지 나타내며, 일반동사 앞, be동사와 조동사 뒤에 위치합니다.",
    "longExplanation": "빈도부사는 어떤 일이나 행위가 얼마나 주기적이고 빈번하게 일어나는지 나타내는 말입니다.\n주요 빈도부사 (빈도 순):\nalways (항상 100%) → usually (보통, 대개 90%) → often (자주 70%) → sometimes (가끔 50%) → occasionally (때때로 30%) → rarely / seldom (거의 ~않다 10%) → never (결코 ~않다 0%).\n문장 속 위치 공식:\n• 일반동사 앞: She always drinks tea.\n• be동사 뒤: He is always late.\n• 첫 번째 조동사 뒤: She has never been to Italy.\n참고로 every day, once a week, twice a month와 같은 부사구는 주로 문장의 맨 끝에 놓입니다.",
    "formation": "주어 + 빈도부사 + 일반동사\n주어 + be동사/조동사 + 빈도부사",
    "examples": [
      {
        "translation": "저는 보통 7시에 일어납니다."
      },
      {
        "translation": "그녀는 직장에 절대 늦지 않습니다."
      },
      {
        "translation": "그들은 일주일에 한 번 만납니다."
      }
    ]
  },
  "en_a2_26": {
    "title": "명사 앞 형용사의 어순",
    "shortExplanation": "여러 형용사가 하나의 명사를 수식할 때 정해진 일정한 순서에 따라 나열해야 합니다.",
    "longExplanation": "영어에서 여러 개의 형용사가 하나의 명사를 앞에서 꾸며줄 때는 정해진 엄격한 배열 순서를 따릅니다:\n1. 주관적 의견/평가 (Opinion: lovely, beautiful)\n2. 크기/사이즈 (Size: big, small)\n3. 나이/신구 (Age: old, new, young)\n4. 모양/형태 (Shape: round, square)\n5. 색상 (Color: red, brown)\n6. 출처/국적 (Origin: Italian, French)\n7. 재료/물질 (Material: leather, wooden)\n8. 목적/용도 (Purpose: writing, sports)\n→ 마지막에 중심 명사가 위치합니다.\n예: a small beautiful old square brown French wooden writing desk (작고 아름답고 오래된 사각형의 갈색 프랑스산 원목 책상).",
    "formation": "의견 + 크기 + 신구 + 모양 + 색상 + 출처 + 재료 + 용도 + 명사",
    "examples": [
      {
        "translation": "사랑스럽고 작고 아담한 오래된 오두막"
      },
      {
        "translation": "크고 빨간 이탈리아산 스포츠카"
      }
    ]
  },
  "en_b1_01": {
    "title": "현재완료 - 형태와 용법",
    "shortExplanation": "과거에 일어난 일이 현재와 밀접하게 연관되어 있거나 영향을 미칠 때 쓰이며, '~한 적이 있다', '~해 버렸다', '계속 ~해 왔다'의 뜻입니다.",
    "longExplanation": "현재완료 시제는 과거의 동작이나 사건을 현재와 연결하여 표현하는 시제입니다.\n기본 형태: 주어 + have / has + 과거분사 (규칙 동사는 -ed, 불규칙 동사는 고유 과거분사형).\n대표적인 3대 용법:\n1. 경험 (구체적인 과거 시점 없음): 살아오면서 겪어본 경험 (예: I have visited Tokyo / 나는 도쿄를 방문해 본 적이 있다).\n2. 완료 및 결과: 과거의 일이 끝나 그 영향이 현재까지 남아 있음 (예: I have lost my keys / 열쇠를 잃어버렸다 - 지금도 열쇠가 없음).\n3. 계속: 과거에 시작된 동작이나 상태가 현재까지 지속됨 (예: She has lived here for 5 years / 그녀는 여기서 5년째 살고 있다).",
    "formation": "긍정문: 주어 + have / has + 과거분사\n부정문: 주어 + haven't / hasn't + 과거분사\n의문문: Have / Has + 주어 + 과거분사?",
    "examples": [
      {
        "translation": "스시를 먹어본 적이 있나요?"
      },
      {
        "translation": "방금 숙제를 다 끝냈습니다."
      },
      {
        "translation": "그녀는 아직 연락하지 않았습니다."
      }
    ]
  },
  "en_b1_02": {
    "title": "ever / never / already / yet / just - 현재완료의 주요 부사 표현",
    "shortExplanation": "현재완료와 함께 쓰여 경험의 유무나 동작의 완료 시점을 나타내는 대표적인 시간 부사들입니다.",
    "longExplanation": "이 부사들은 현재완료 시제에서 동작이 발생한 맥락과 뉘앙스를 분명하게 전달합니다:\n• ever (여태껏, 이제까지): 주로 의문문에서 경험을 물어볼 때 사용. 위치: 과거분사 바로 앞.\n• never (한 번도 ~않다): 결코 겪어본 적 없는 부정적 경험. 위치: 과거분사 바로 앞 (문장에 not을 추가하지 않음).\n• already (이미, 벌써): 예상보다 일찍 동작이 완료되었음을 강조. 위치: 과거분사 앞 또는 문장 끝.\n• yet (아직, 벌써): 부정문에서는 '아직 ~않다', 의문문에서는 '벌써 ~했는가'. 위치: 주로 문장의 맨 끝.\n• just (방금, 막): 동작이 아주 최근에 갓 끝났음을 의미. 위치: 과거분사 바로 앞.",
    "formation": "주어 + have / has + ever / never / already / just + 과거분사\n주어 + haven't / hasn't + 과거분사 + yet\nHave / Has + 주어 + ever + 과거분사?\nHave / Has + 주어 + 과거분사 + yet?",
    "examples": [
      {
        "translation": "스코틀랜드에 가본 적이 있으신가요?"
      },
      {
        "translation": "저는 달팽이 요리를 한 번도 먹어본 적이 없습니다."
      },
      {
        "translation": "저는 그 영화를 이미 보았습니다."
      }
    ]
  },
  "en_b1_03": {
    "title": "현재완료 vs 과거시제 - 결정적 차이점",
    "shortExplanation": "현재완료는 현재와의 연결고리와 현재의 결과에 초점을 맞추며(구체적 과거 시점 없음), 과거시제는 과거의 특정 시점에 이미 끝난 사실만을 나타냅니다.",
    "longExplanation": "영어 문법에서 가장 혼동하기 쉽고 중요한 핵심 차이점입니다.\n• 현재완료: 과거에 발생한 일이 '현재'와 직접적인 관련을 맺고 있을 때 쓰이며, 명확한 과거 시점 부사는 함께 쓸 수 없습니다. 예: I've lost my wallet (지갑을 잃어버렸다 - 지금도 지갑이 없다는 현재 상태가 핵심입니다).\n• 과거시제: 과거의 특정 시점에 완료되어 현재와 분리된 과거의 사건을 나타내며, 명확한 과거 시점(yesterday, last week, in 2019 등)을 나타내는 부사와 함께 쓰입니다. 예: I lost my wallet yesterday (나는 어제 지갑을 잃어버렸다 - 어제 일어난 단발적 과거 사실에 집중합니다).",
    "formation": "현재완료: 주어 + have / has + 과거분사 (구체적 과거 시점 부사 제외)\n과거시제: 주어 + 과거형 동사 (구체적 과거 시점 부사 수반)",
    "examples": [
      {
        "translation": "새로 오신 이사님을 만나 뵈었습니다."
      },
      {
        "translation": "지난주 화요일에 그를 만났습니다."
      }
    ]
  },
  "en_b1_04": {
    "title": "현재완료와 for 및 since의 결합",
    "shortExplanation": "과거에 시작되어 현재까지 이어져 오는 지속 기간을 나타내며, for는 기간, since는 시작 시점을 동반합니다.",
    "longExplanation": "현재완료의 계속 용법에서 for와 since는 '~한 지 얼마나 되었는가?'(How long...?)라는 질문에 답할 때 필수적으로 쓰입니다:\n• for (~동안): 지속된 시간의 길이/기간을 나타내는 명사구와 함께 쓰입니다 (예: for two days, for a year, for a long time, for ages).\n• since (~이래로, ~이후로): 동작이 시작된 과거의 구체적 시점이나 과거시제 절과 함께 쓰입니다 (예: since Monday, since 2015, since I was a child).\n기간을 묻는 질문: How long + have / has + 주어 + 과거분사...?",
    "formation": "주어 + have / has + 과거분사 + for + 기간\n주어 + have / has + 과거분사 + since + 과거 시점 / 과거시제 절",
    "examples": [
      {
        "translation": "그녀는 이곳에서 10년 동안 일해 왔습니다."
      },
      {
        "translation": "저는 대학교 때부터 그를 알고 지냈습니다."
      }
    ]
  },
  "en_b1_05": {
    "title": "현재완료진행: have been + 현재분사(-ing)",
    "shortExplanation": "과거부터 현재까지 동작이 쉬지 않고 이어져 오고 있음을 강조하거나, 현재 보이는 결과의 원인을 설명할 때 쓰이며, '줄곧 ~해 오고 있다'의 뜻입니다.",
    "longExplanation": "현재완료진행 시제는 동작의 지속성, 진행 과정 자체에 초점을 맞춥니다.\n공식: 주어 + have / has been + 현재분사(동사원형-ing).\n주요 특징:\n1. 동작의 지속 시간 강조 ('얼마나 오래?'라는 질문에 대응): I've been waiting for an hour (한 시간 동안 줄곧 기다리고 있다).\n2. 현재 눈에 보이는 모습이나 결과의 원인 설명: You look tired - have you been running? (피곤해 보이는데, 달리기라도 하고 왔니?).\n현재완료 단순형과의 차이:\n• 현재완료 단순형은 결과와 완료를 강조: I've read 50 pages (50쪽을 다 읽었다 - 결과 중심).\n• 현재완료진행형은 동작의 지속 과정에 집중: I've been reading all evening (저녁 내내 계속 책을 읽고 있었다 - 과정 중심).",
    "formation": "긍정문: 주어 + have / has been + 현재분사(-ing)\n부정문: 주어 + haven't / hasn't been + 현재분사(-ing)\n의문문: Have / Has + 주어 + been + 현재분사(-ing)?",
    "examples": [
      {
        "translation": "저는 2년째 영어를 계속 공부해 오고 있습니다."
      },
      {
        "translation": "손이 왜 이렇게 더러워요? — 차를 고치고 있었거든요."
      }
    ]
  },
  "en_b1_06": {
    "title": "과거진행: was/were + 현재분사(-ing)",
    "shortExplanation": "과거의 특정한 시점에 한창 진행 중이던 동작을 나타내며, '그때 ~하고 있었다', '~하던 중이었다'의 뜻입니다.",
    "longExplanation": "과거진행 시제는 과거의 어느 한 시점에 어떤 동작이 진행되고 있었음을 묘사할 때 사용됩니다.\n형태: 주어 + was / were + 현재분사(동사원형-ing). 단수 주어에는 was, 복수 및 2인칭 주어에는 were를 씁니다.\n주요 쓰임새:\n1. 과거 특정 시점에 진행 중이던 일: At 9pm I was having dinner (어젯밤 9시에 나는 저녁을 먹고 있었다).\n2. 다른 사건에 의해 끼어들기를 당한 배경 동작: I was walking when it started to rain (걷고 있던 중에 비가 내리기 시작했다).\n3. 과거에 동시에 진행되던 병렬 동작: While she was cooking, he was watching TV (그녀가 요리하는 동안 그는 TV를 보고 있었다).",
    "formation": "긍정문: 주어 + was / were + 현재분사(-ing)\n부정문: 주어 + wasn't / weren't + 현재분사(-ing)\n의문문: Was / Were + 주어 + 현재분사(-ing)?",
    "examples": [
      {
        "translation": "내가 집을 나섰을 때 비가 내리고 있었습니다."
      },
      {
        "translation": "어제 7시에 무엇을 하고 계셨습니까?"
      }
    ]
  },
  "en_b1_07": {
    "title": "과거시제 vs 과거진행 - 배경 동작과 끼어든 사건",
    "shortExplanation": "과거진행은 진행 중이던 배경 동작을 나타내고, 과거시제는 그 도중에 불쑥 일어난 돌발 사건을 나타냅니다.",
    "longExplanation": "과거에 있었던 일을 서술할 때 쓰이는 대표적인 문장 구성입니다: 길게 진행 중이던 배경 행위(과거진행) 중에, 짧고 돌발적인 다른 사건(과거시제)이 끼어드는 형태입니다.\n접속사의 쓰임:\n• when (~했을 때): 주로 순간적으로 끼어든 사건을 나타내는 과거시제 절과 결합합니다: She was sleeping when the alarm went off (알람이 울렸을 때 그녀는 자고 있었다).\n• while / as (~하는 동안에): 진행 중이던 배경 행위를 나타내는 과거진행 절과 결합합니다: While I was watching TV, the power went out (TV를 보고 있던 중에 정전이 되었다).",
    "formation": "과거진행 절 + when + 과거시제 절\nWhile + 과거진행 절 + , + 과거시제 절",
    "examples": [
      {
        "translation": "그녀가 목욕을 하고 있을 때 전화벨이 울렸습니다."
      },
      {
        "translation": "그가 연설을 하는 동안 누군가가 잠이 들었습니다."
      }
    ]
  },
  "en_b1_08": {
    "title": "조건문 0유형: If + 현재시제, 현재시제 - 과학적 사실과 자연 법칙",
    "shortExplanation": "과학적 사실, 자연의 법칙, 일반적인 진리를 나타내며, '~하면 (언제나) ~한다'의 뜻입니다.",
    "longExplanation": "0형 조건문(Zero Conditional)은 과학적 법칙, 불변의 진리, 당연한 인과관계를 말할 때 쓰입니다. 조건이 충족되면 결과가 언제나 예외 없이 필연적으로 발생합니다.\n공식: If + 현재시제 절, 현재시제 주절.\n특징: 보편적 진리를 나타내므로 조건절과 주절 모두 현재시제를 씁니다.\n이 유형에서는 if 대신 when을 바꾸어 써도 의미가 동일합니다: When you mix red and blue, you get purple (빨간색과 파란색을 섞으면 보라색이 된다).",
    "formation": "If / When + 주어 + 현재시제 동사 + , + 주어 + 현재시제 동사",
    "examples": [
      {
        "translation": "얼음에 열을 가하면 녹습니다."
      },
      {
        "translation": "비가 오면 거리가 젖습니다."
      }
    ]
  },
  "en_b1_09": {
    "title": "조건문 1유형: If + 현재시제, will - 미래의 현실적 가능성",
    "shortExplanation": "미래에 충분히 일어날 가능성이 있는 현실적인 조건과 그에 따른 결과를 나타내며, '만약 ~한다면 ~할 것이다'의 뜻입니다.",
    "longExplanation": "1형 조건문(First Conditional)은 현재나 미래에 일어날 가능성이 높은 실제적인 상황을 가정하고 그 결과를 예측할 때 씁니다.\n기본 공식: If + 현재시제 절, 주어 + will + 동사원형.\n핵심 유의점:\n• 조건절(if절)에서는 미래의 일이라도 will을 쓰지 않고 반드시 현재시제를 사용합니다.\n• 주절에서는 will 대신 맥락에 따라 can, may, might, should 등의 조동사를 대신 쓸 수 있습니다.\n• 주절과 조건절의 위치는 서로 바꿀 수 있으며, 주절이 문두에 올 때는 쉼표를 붙이지 않습니다: I'll stay home if it rains.",
    "formation": "If + 주어 + 현재시제 동사 + , + 주어 + will / can / may + 동사원형",
    "examples": [
      {
        "translation": "그녀가 열심히 공부한다면 시험에 합격할 것입니다."
      },
      {
        "translation": "도움이 필요하시다면 제가 갈 수 있습니다."
      }
    ]
  },
  "en_b1_10": {
    "title": "조건문 2유형(가정법 과거): If + 과거시제, would - 현재 사실의 반대 가정",
    "shortExplanation": "현재의 사실과 반대되는 상상이나 실현 가능성이 매우 희박한 일을 가정할 때 쓰이며, '만약 ~라면 ~할 텐데'의 뜻입니다.",
    "longExplanation": "2형 조건문(가정법 과거 / Second Conditional)은 현재의 실제 사실과 반대되는 가상의 상황을 상상하거나, 실현될 가능성이 극히 희박한 일을 표현할 때 사용합니다.\n기본 공식: If + 과거시제 절, 주어 + would + 동사원형.\n문법적 핵심:\n• if조건절의 동사는 과거형을 씁니다. be동사의 경우 격식체나 표준 문법에서는 주어의 인칭에 상관없이 were를 쓰는 것이 원칙입니다 (예: If I were you... / 내가 너라면).\n• 주절에는 would(또는 could / might) + 동사원형을 사용하여 현재에는 불가능한 가상적 결과를 나타냅니다.",
    "formation": "If + 주어 + 과거시제 동사 + , + 주어 + would / could + 동사원형",
    "examples": [
      {
        "translation": "만약 복권에 당첨된다면 전 세계를 여행할 텐데."
      },
      {
        "translation": "내가 키가 더 컸다면 농구를 할 텐데."
      }
    ]
  },
  "en_b1_11": {
    "title": "조건문 1형식 vs 2형식(가정법 과거): 실현 가능 vs 실현 가능성 희박",
    "shortExplanation": "실현 가능성이 있는 단순 조건문(1형식)과 현재 사실과 반대되거나 실현 가능성이 희박한 가정법 과거(2형식)를 비교합니다.",
    "longExplanation": "어느 유형을 선택할지는 상황의 현실성에 대한 화자의 확신과 태도를 반영합니다.\n• 1형식 조건문 (If + 현재시제, will + 동사원형): 실제로 일어날 가능성이 높다고 예상하는 상황을 나타냅니다 (예: 'If I see her' - 그녀를 만날 것으로 기대함).\n• 2형식 조건문 / 가정법 과거 (If + 과거시제, would + 동사원형): 현재 사실과 반대되는 가정이거나 일어날 가능성이 매우 희박한 상상을 나타냅니다 (예: 'If I saw her' - 만날 가능성이 희박하거나 단순한 공상임).\n이는 단순한 문법적 차이가 아니라 상황의 실현 가능성을 바라보는 화자의 심리적 태도 차이를 보여줍니다.",
    "formation": "1형식: If + 주어 + 현재시제 동사, 주어 + will + 동사원형\n2형식: If + 주어 + 과거시제 동사, 주어 + would + 동사원형",
    "examples": [
      {
        "translation": "내일 비가 오면 우산을 가져갈 거야. (충분히 일어날 수 있는 현실적 상황)"
      },
      {
        "translation": "만약 매일 비가 온다면 스페인으로 이사 갈 텐데. (실현 가능성이 희박한 상상)"
      }
    ]
  },
  "en_b1_12": {
    "title": "수동태 - 현재시제: am / is / are + 과거분사",
    "shortExplanation": "현재 일반적으로 행해지는 동작이나 상태를 나타내며, '~된다', '~해진다'라는 의미입니다.",
    "longExplanation": "현재시제 수동태는 다음과 같은 경우에 주로 사용됩니다:\n• 행위자보다 동작 자체나 행위의 대상이 더 중요할 때\n• 행위자가 누구인지 알 수 없거나 굳이 밝힐 필요 없이 명백할 때\n행위자를 밝혀야 할 경우에는 문장 끝에 'by + 행위자'를 덧붙입니다 (예: The window is broken by the children. 그 창문은 아이들에 의해 깨졌다).",
    "formation": "주어 + am / is / are + 과거분사 (+ by + 행위자)",
    "examples": [
      {
        "translation": "영어는 많은 나라에서 사용됩니다."
      },
      {
        "translation": "그 편지는 프랑스어로 작성되어 있습니다."
      }
    ]
  },
  "en_b1_13": {
    "title": "수동태 - 과거시제: was / were + 과거분사",
    "shortExplanation": "과거에 발생한 수동의 동작이나 사건을 나타내며, '~되었다', '~받았다'라는 의미입니다.",
    "longExplanation": "과거시제 수동태는 과거의 특정한 시점에 완료된 동작이나 사건에서 행위의 대상을 강조할 때 사용됩니다.\n• 단수 주어(I, he, she, it, 단수명사): was 사용\n• 복수 주어(you, we, they, 복수명사): were 사용\n능동태를 수동태로 전환하는 예시: Someone stole my car. (누군가 내 차를 훔쳤다) → My car was stolen. (내 차를 도난당했다).",
    "formation": "주어 + was / were + 과거분사 (+ by + 행위자)",
    "examples": [
      {
        "translation": "에펠탑은 1889년에 건립되었습니다."
      },
      {
        "translation": "그 사고로 세 명이 부상을 입었습니다."
      }
    ]
  },
  "en_b1_14": {
    "title": "수동태 - 현재완료: has / have been + 과거분사",
    "shortExplanation": "과거에 발생한 수동의 동작이 완료되어 현재까지 그 결과나 영향이 이어지고 있음을 나타냅니다.",
    "longExplanation": "현재완료 수동태는 동작이 정확히 언제 일어났는가보다는, 그 동작이 현재 완료되어 어떠한 상태인지(결과)를 강조할 때 사용됩니다.\n• 3인칭 단수 주어: has been + 과거분사\n• 1·2인칭 및 복수 주어: have been + 과거분사",
    "formation": "주어 + has / have been + 과거분사",
    "examples": [
      {
        "translation": "프로젝트가 성공적으로 완료되었습니다."
      },
      {
        "translation": "모든 하객들에게 연락이 전달되었습니다."
      }
    ]
  },
  "en_b1_15": {
    "title": "간접화법 - 시제 일치 (시제 후퇴)",
    "shortExplanation": "직접화법을 간접화법으로 전환할 때 전달동사가 과거형이면 인용절의 동사 시제를 한 단계 과거로 물립니다.",
    "longExplanation": "간접화법에서 전달동사(said, told 등)가 과거시제일 경우, 종속절의 시제는 과거 방향으로 한 시제 후퇴하는 '시제 일치' 원칙이 적용됩니다:\n• 현재시제 → 과거시제 (work → worked)\n• 과거시제 → 과거완료 (went → had gone)\n• 현재완료 → 과거완료 (have seen → had seen)\n• 조동사 변화: will → would, can → could, is/am going to → was going to.",
    "formation": "주어 + said (that) / told + 목적어 + (that) + 시제 일치된 절",
    "examples": [
      {
        "translation": "그녀는 '저 지금 가요'라고 말했다. → 그녀는 자기가 떠나는 중이라고 말했다."
      },
      {
        "translation": "그는 내게 '나 갈 수 없어'라고 말했다. → 그는 내게 올 수 없다고 말했다."
      }
    ]
  },
  "en_b1_16": {
    "title": "간접의문문: 의문사 / if / whether + 평서문 어순",
    "shortExplanation": "직접의문문을 간접화법으로 바꿀 때 도치되지 않고 '주어 + 동사'의 평서문 어순을 취합니다.",
    "longExplanation": "간접의문문으로 바꿀 때 유의해야 할 핵심 규칙은 다음과 같습니다:\n1. 의문문의 도치를 풀고 평서문 어순(주어 + 동사)으로 배열합니다.\n2. 의문문 형성용 조동사 do / does / did는 생략합니다.\n3. 의문사가 있는 의문문은 해당 의문사(where, what 등) 뒤에 '주어 + 동사'를 연결합니다.\n4. Yes/No 의문문은 '~인지 아닌지'라는 뜻의 if 또는 whether 접속사를 사용합니다.",
    "formation": "의문사 의문문: 주어 + asked (+ 목적어) + 의문사 + 주어 + 동사\nYes/No 의문문: 주어 + asked (+ 목적어) + if / whether + 주어 + 동사",
    "examples": [
      {
        "translation": "'어디서 일하세요?' → 그녀는 내가 어디서 일하는지 물었다."
      },
      {
        "translation": "'결혼하셨나요?' → 그는 내가 기혼인지 알고 싶어 했다."
      }
    ]
  },
  "en_b1_17": {
    "title": "간접화법에서 say와 tell의 구분",
    "shortExplanation": "say 뒤에는 듣는 사람을 직접 두지 않지만, tell 뒤에는 반드시 듣는 대상(목적어)이 뒤따라야 합니다.",
    "longExplanation": "간접화법에서 발언 내용을 전달할 때 say와 tell은 문장 구조상 뚜렷한 차이가 있습니다:\n• say (that)...: 뒤에 듣는 대상을 직접 취하지 않고 내용절을 연결합니다 (예: She said she was tired). 대상을 나타내려면 전치사 to를 써서 said to me로 표현해야 합니다.\n• tell + 사람 + (that)...: tell 바로 뒤에는 반드시 말을 듣는 대상(목적어)이 와야 합니다 (예: She told me she was tired).\n흔한 오류: He told that he was late ✗ → 올바른 표현: He said that he was late ✓ 또는 He told me that he was late ✓.",
    "formation": "주어 + say/said + (that) + 절\n주어 + tell/told + 사람 목적어 + (that) + 절",
    "examples": [
      {
        "translation": "그녀는 도움이 필요하다고 말했다."
      },
      {
        "translation": "그는 우리에게 회의가 취소되었다고 전했다."
      }
    ]
  },
  "en_b1_18": {
    "title": "동명사(-ing)를 목적어로 취하는 동사",
    "shortExplanation": "to부정사 대신 반드시 동명사(-ing)만을 목적어로 취해야 하는 동사들의 용법입니다.",
    "longExplanation": "영어의 특정 동사들은 뒤에 to부정사가 아닌 동명사(-ing) 형태만을 목적어로 취합니다.\n대표적인 동사: enjoy(즐기다), finish(끝내다), avoid(피하다), mind(꺼리다), suggest(제안하다), keep(계속하다), consider(고려하다), deny(부인하다), imagine(상상하다), miss(놓치다/그리워하다), practice(연습하다), risk(위험을 무릅쓰다), admit(인정하다), delay / put off(미루다), give up(포기하다), recommend(추천하다) 등.\n이해 팁: 동명사는 대개 '과거의 사실', '직접적인 경험', 또는 '진행 중인 과정'을 함축하는 동사들과 주로 결합합니다.",
    "formation": "주어 + 동사 + 동명사 (동사-ing)",
    "examples": [
      {
        "translation": "저는 바다에서 수영하는 것을 즐깁니다."
      },
      {
        "translation": "그녀는 해외로 이주하는 것을 고려 중입니다."
      },
      {
        "translation": "그는 눈을 마주치는 것을 피했습니다."
      }
    ]
  },
  "en_b1_19": {
    "title": "to부정사(to + 동사원형)를 목적어로 취하는 동사",
    "shortExplanation": "동명사 대신 to부정사(to + 동사원형)만을 목적어로 취하는 동사들의 용법입니다.",
    "longExplanation": "영어의 많은 동사들은 목적어로 to부정사를 취하며, 대개 미래 지향적인 계획, 의도, 결정, 소망 등을 표현합니다.\n대표적인 동사: want(원하다), decide(결정하다), hope(바라다), plan(계획하다), manage(용케 해내다), agree(동의하다), promise(약속하다), refuse(거절하다), fail(~하지 못하다), expect(기대하다), offer(제안하다), learn(배우다), need(필요로 하다), afford(~할 여유가 있다), arrange(마련하다), attempt(시도하다), choose(선택하다), demand(요구하다), pretend(~인 척하다), tend(~하는 경향이 있다) 등.",
    "formation": "주어 + 동사 + to + 동사원형",
    "examples": [
      {
        "translation": "그녀는 직장을 그만두기로 결심했습니다."
      },
      {
        "translation": "곧 다시 뵙기를 기대합니다."
      },
      {
        "translation": "그는 끝내 답변을 하지 못했습니다."
      }
    ]
  },
  "en_b1_20": {
    "title": "동명사(-ing)와 to부정사를 모두 취하는 동사 (like, love, hate, start, begin)",
    "shortExplanation": "뒤에 동명사(-ing)와 to부정사 둘 다 올 수 있으며, 의미가 같거나 미세한 뉘앙스 차이만 있는 동사들의 용법입니다.",
    "longExplanation": "일부 영어 동사들은 목적어로 동명사와 to부정사를 모두 취할 수 있습니다:\n• 선호나 감정을 나타내는 동사 (like, love, hate, prefer): 동명사(-ing)는 일반적인 취미나 행위 자체를 즐김을 나타내며 (예: 'I love cooking' - 평소 요리하는 것을 무척 좋아함), to부정사는 특정 상황에서의 선택이나 습관적인 판단을 나타내는 경향이 있습니다.\n• 시작과 지속을 나타내는 동사 (start, begin, continue): 두 형태 간에 의미상의 실질적인 차이가 거의 없습니다.",
    "formation": "주어 + like / love / hate / start / begin + 동명사(-ing) 또는 to + 동사원형",
    "examples": [
      {
        "translation": "저는 여행하는 것을 정말 좋아합니다."
      },
      {
        "translation": "그녀는 5월부터 이곳에서 일하기 시작했습니다."
      }
    ]
  },
  "en_b1_21": {
    "title": "used to - 과거의 습관과 상태",
    "shortExplanation": "과거에 주기적으로 하던 습관이나 과거의 상태를 나타내며, 현재는 더 이상 하지 않음을 뜻합니다; '~하곤 했다', '예전에는 ~였다'.",
    "longExplanation": "'used to + 동사원형'은 과거에 규칙적으로 반복되던 동작이나 지속되던 상태를 표현할 때 사용하며, 현재는 완전히 중단되었음을 내포합니다.\n• 긍정문: 주어 + used to + 동사원형\n• 부정문: 주어 + didn't use to + 동사원형\n• 의문문: Did + 주어 + use to + 동사원형...?\n주의: 'be used to + 명사/동명사(~에 익숙하다)'와의 차이에 주의하세요 (예: I am used to waking up early. = 나는 일찍 일어나는 것에 익숙하다).",
    "formation": "긍정문: 주어 + used to + 동사원형\n부정문: 주어 + didn't use to + 동사원형\n의문문: Did + 주어 + use to + 동사원형?",
    "examples": [
      {
        "translation": "예전에는 담배를 피우곤 했지만, 지금은 끊었습니다."
      },
      {
        "translation": "예전에 악기를 연주하곤 하셨나요?"
      }
    ]
  },
  "en_b1_22": {
    "title": "관계사절: who, which, that, where, whose",
    "shortExplanation": "관계대명사와 관계부사를 활용하여 선행사(명사)를 뒤에서 수식하고 상세 정보를 보충합니다.",
    "longExplanation": "관계사절은 앞에 나오는 선행사(명사)를 구체적으로 수식하는 형용사절 역할을 합니다:\n• who: 사람이 선행사일 때 사용하며 주어 또는 목적어 역할을 합니다 (예: The woman who called is my sister).\n• which: 사물이나 동물이 선행사일 때 사용합니다 (예: The book which I borrowed was great).\n• that: 제한적 용법에서 사람과 사물 모두를 선행사로 취할 수 있습니다 (예: The car that he bought is new).\n• where: 장소를 나타내는 선행사를 수식하는 관계부사입니다 (예: The café where we met is closed).\n• whose: 소유 관계를 나타냅니다 (예: The girl whose bag was stolen).\n참고: 구어체에서는 관계대명사가 목적어로 쓰일 때 자주 생략됩니다 (The film (that) I saw).",
    "formation": "선행사 (명사) + who / which / that / where / whose + 수식절",
    "examples": [
      {
        "translation": "옆집에 사는 남자는 매우 친절합니다."
      },
      {
        "translation": "우리가 묵었던 호텔에는 수영장이 딸려 있었습니다."
      }
    ]
  },
  "en_b1_23": {
    "title": "대조와 양보의 접속사·부사: although, however, despite, in spite of, whereas",
    "shortExplanation": "대조, 반전, 양보 관계를 나타내며, '~에도 불구하고', '하지만', '반면에'라는 뜻입니다.",
    "longExplanation": "대조와 양보를 나타내는 표현들은 뒤따르는 문법 요소에 명확한 차이가 있습니다:\n• although / even though / though + 절(주어 + 동사): '비록 ~일지라도'라는 뜻의 접속사입니다.\n• despite / in spite of + 명사(구) / 동명사(-ing): 전치사구이므로 뒤에 바로 절(주어+동사)이 올 수 없습니다.\n• however: 접속부사로, 보통 마침표나 세미콜론 뒤 새로운 문장의 서두에 쉼표와 함께 사용됩니다 ('그러나').\n• whereas: 두 가지 사실 간의 뚜렷한 대비를 나타내는 접속사로, '반면에', '~임에 비하여'라는 뜻입니다.",
    "formation": "although / even though + 절 (주어 + 동사)\ndespite / in spite of + 명사(구) / 동명사(-ing)\nhowever, + 새로운 문장\n절 1, whereas + 절 2",
    "examples": [
      {
        "translation": "그녀는 피곤했음에도 불구하고 계속 일했습니다."
      },
      {
        "translation": "비가 내렸음에도 그는 자전거를 타고 출근했습니다."
      },
      {
        "translation": "가격이 비쌌습니다. 그렇지만 그만한 가치가 있었습니다."
      }
    ]
  },
  "en_b1_24": {
    "title": "미래진행형: will be + 동사-ing",
    "shortExplanation": "미래의 특정한 시점에 진행 중일 동작이나 일상적 일정상 자연스럽게 발생할 일을 나타냅니다.",
    "longExplanation": "미래진행형은 주로 다음과 같은 용법으로 활용됩니다:\n1. 미래의 특정 시점에 한창 진행되고 있을 동작 (예: At this time tomorrow, I'll be lying on the beach - 내일 이맘때면 해변에 누워 있을 것이다).\n2. 정해진 일정이나 자연스러운 흐름에 따라 예정되어 있는 미래의 동작 (예: I'll be seeing her tomorrow anyway - 어차피 내일 그녀를 만나게 될 것이다).\n3. 부담을 주지 않고 상대방의 미래 계획을 정중하게 물어볼 때 (예: Will you be coming to the party? - 파티에 오실 예정인가요?).",
    "formation": "긍정문: 주어 + will be + 동사-ing\n부정문: 주어 + won't be + 동사-ing\n의문문: Will + 주어 + be + 동사-ing?",
    "examples": [
      {
        "translation": "8시에는 전화하지 마세요. 그때 저녁 식사 중일 거예요."
      },
      {
        "translation": "다음 주 이맘때쯤이면 해변에 앉아 쉬고 있을 거예요."
      }
    ]
  },
  "en_b1_25": {
    "title": "미래완료: will have + 과거분사",
    "shortExplanation": "미래의 특정한 기준 시점이나 다른 사건이 일어나기 전에 이미 완료되어 있을 동작을 나타내며, '~까지는 다 해놓았을 것이다'라는 뜻입니다.",
    "longExplanation": "미래완료 시제는 미래의 특정 시점을 기준으로 그 시점 이전에 어떤 동작이 완결되어 있음을 강조할 때 사용됩니다.\n기준 시점을 나타내는 'by + 시간 명사(~까지)', 'by the time + 절(~할 때쯤에는)', 'before(~ 전에)' 등의 표현과 자주 함께 쓰입니다:\n예시: By the time you arrive, I will have cooked dinner. (네가 도착할 때쯤이면 난 저녁을 다 만들어 놓았을 거야).",
    "formation": "긍정문: 주어 + will have + 과거분사\n부정문: 주어 + won't have + 과거분사\n의문문: Will + 주어 + have + 과거분사?",
    "examples": [
      {
        "translation": "일요일까지는 이 책을 다 읽어 놓을 것입니다."
      },
      {
        "translation": "2050년이 되면 과학자들은 치료법을 발견해 냈을 것입니다."
      }
    ]
  },
  "en_b1_26": {
    "title": "목적을 나타내는 표현: to, in order to, so that, so as to",
    "shortExplanation": "행동의 목적을 나타내며 '~하기 위해', '~하도록'의 뜻을 나타냅니다.",
    "longExplanation": "행동의 목적을 표현하는 대표적인 구문입니다:\n• to / in order to / so as to + 동사원형: 앞뒤의 주어가 같을 때 사용합니다. in order to와 so as to는 단순 to 부정사보다 격식 있는 정중한 표현입니다. 부정형은 in order not to 또는 so as not to(~하지 않도록)입니다.\n• so that / in order that + 절(주어 + 조동사 can/could, will/would + 동사원형): 문장(절)을 이끌며, 주어가 서로 다르거나 가능성을 강조할 때 주로 쓰입니다.",
    "formation": "to / in order to / so as to + 동사원형 | so that + 주어 + 조동사 + 동사원형",
    "examples": [
      {
        "translation": "그녀는 장학금을 받기 위해 열심히 공부합니다."
      },
      {
        "translation": "그는 마지막 기차를 타기 위해 일찍 출발했습니다."
      }
    ]
  },
  "en_b1_27": {
    "title": "기초 구동사",
    "shortExplanation": "동사와 전치사 또는 부사가 결합하여 고유한 관용적 의미를 나타내는 표현입니다.",
    "longExplanation": "구동사는 '동사 + 불변화사(전치사 또는 부사)'로 이루어지며, 단어 개개의 뜻을 합친 것과는 다른 독특한 관용적 의미를 형성합니다.\n가장 자주 쓰이는 구동사 목록:\n• give up = 포기하다, 끊다\n• find out = 알아내다, 밝혀내다\n• turn on / turn off = (전원 등을) 켜다 / 끄다\n• look up = (사전이나 인터넷에서) 찾아보다\n• look after = 돌보다, 보살피다\n• put off = 미루다, 연기하다\n• carry on = 계속하다\n• get on / along (with) = (~와) 사이좋게 지내다\n• bring up = 양육하다; (화제를) 꺼내다\n• come across = 우연히 마주치다/발견하다",
    "formation": "동사 + 전치사 / 부사",
    "examples": [
      {
        "translation": "저는 담배를 끊었습니다."
      },
      {
        "translation": "내가 집을 비운 동안 우리 고양이 좀 돌봐줄 수 있어?"
      },
      {
        "translation": "우리는 무슨 일이 일어났는지 알아내야 합니다."
      }
    ]
  },
  "en_b2_01": {
    "title": "과거완료: had + 과거분사",
    "shortExplanation": "과거의 특정 시점이나 다른 과거 사건보다 이전에 완료된 일(대과거)을 나타냅니다.",
    "longExplanation": "과거완료 시제는 과거의 특정 기준 시점보다 '더 이전에' 이미 완료되었거나 지속되었던 동작, 상태, 경험을 표현할 때 사용합니다.\n• 긍정문: 주어 + had + 과거분사 (모든 주어 인칭에 동일하게 had 사용)\n• 부정문: 주어 + hadn't + 과거분사\n• 의문문: Had + 주어 + 과거분사?\n• 자주 함께 쓰이는 접속사 및 부사: before, after, when, by the time, already, just, never.",
    "formation": "주어 + had + 과거분사 (hadn't + 과거분사)",
    "examples": [
      {
        "translation": "내가 도착했을 때, 그녀는 이미 떠난 상태였습니다."
      },
      {
        "translation": "그는 그해 겨울 전까지 눈을 한 번도 본 적이 없었습니다."
      }
    ]
  },
  "en_b2_02": {
    "title": "과거완료 진행형: had been + 동사-ing형",
    "shortExplanation": "과거의 특정 시점 이전까지 어떤 동작이 지속적으로 진행 중이었음을 강조합니다.",
    "longExplanation": "과거완료 진행형은 'had been + 동사-ing형(현재분사)'의 형태로, 과거의 기준 시점 이전부터 그때까지 동작이 끊김 없이 계속되었음을 강조합니다. 또한 과거 당시 뚜렷하게 드러난 결과나 상태의 직접적인 원인을 설명할 때 자주 쓰입니다.",
    "formation": "주어 + had been + 동사-ing형 (hadn't been + 동사-ing형)",
    "examples": [
      {
        "translation": "그녀는 밤새 일했기 때문에 완전히 녹초가 되어 있었습니다."
      },
      {
        "translation": "그녀가 도착하기 전에 당신은 얼마나 오랫동안 기다리고 있었습니까?"
      }
    ]
  },
  "en_b2_03": {
    "title": "must have + 과거분사 - 과거 사실에 대한 강한 확신과 추측",
    "shortExplanation": "과거의 일에 대해 강한 확신을 가지고 '~했음에 틀림없다'고 추측할 때 씁니다.",
    "longExplanation": "'must have + 과거분사'는 과거의 분명한 정황이나 증거를 바탕으로 '그렇게 되었음이 분명하다(유일한 논리적 설명이다)'라고 강하게 긍정적 확신을 가지고 추측할 때 사용합니다.\n과거에 대한 추측의 확신도 비교:\n• must have + 과거분사: ~했음에 틀림없다 (강한 확신)\n• should have + 과거분사: ~했어야 했다 (의무/후회)\n• may / might have + 과거분사: ~했을지도 모른다 (불확실한 추측)\n• can't have + 과거분사: ~했을 리가 없다 (강한 부정적 확신).",
    "formation": "주어 + must have + 과거분사",
    "examples": [
      {
        "translation": "그 긴 여행을 마치고 정말 녹초가 되셨음에 틀림없습니다."
      },
      {
        "translation": "그녀는 일찍 떠났음에 틀림없습니다. 그녀의 외투가 보이지 않습니다."
      }
    ]
  },
  "en_b2_04": {
    "title": "can't have + 과거분사 - 과거 사실에 대한 강한 부정적 추측",
    "shortExplanation": "과거의 일에 대해 '~했을 리가 없다', '~였을 리가 없다'며 불가능성을 확신할 때 씁니다.",
    "longExplanation": "'can't have (또는 couldn't have) + 과거분사'는 과거에 일어난 사실에 대해 객관적인 근거를 들어 '그런 일이 일어났을 리가 절대 없다'고 확신을 갖고 부정할 때 사용합니다. 이는 'must have + 과거분사'의 반대 개념입니다.",
    "formation": "주어 + can't have + 과거분사",
    "examples": [
      {
        "translation": "그가 그녀를 보았을 리가 없습니다. 그녀는 해외에 있었으니까요."
      },
      {
        "translation": "그곳이 올바른 주소였을 리가 없습니다."
      }
    ]
  },
  "en_b2_05": {
    "title": "should have + 과거분사 - 과거에 대한 후회와 비난",
    "shortExplanation": "과거에 '~했어야 했는데 (하지 않았다)' 또는 '~하지 말았어야 했는데 (했다)'라며 후회나 비난을 나타냅니다.",
    "longExplanation": "• should have + 과거분사: 과거에 그렇게 하는 것이 마땅했으나 실제로는 하지 않은 일에 대한 아쉬움, 후회, 또는 타인에 대한 질책을 나타냅니다 (~했어야 했다).\n• shouldn't have + 과거분사: 과거에 하지 말았어야 할 행동을 실제로 해버린 것에 대한 반성과 비난을 나타냅니다 (~하지 말았어야 했다).\n일상 회화에서 유감이나 반성을 표현할 때 핵심적으로 쓰이는 구문입니다.",
    "formation": "주어 + should have / shouldn't have + 과거분사",
    "examples": [
      {
        "translation": "우산을 챙겨왔어야 했는데 그러지 못했습니다."
      },
      {
        "translation": "그녀는 그 사람에게 그 비밀을 말하지 말았어야 했습니다."
      }
    ]
  },
  "en_b2_06": {
    "title": "might / could have + 과거분사 - 과거의 가능성에 대한 추측",
    "shortExplanation": "과거에 '~했을지도 모른다'는 불확실한 추측이나, 과거에 '~할 수도 있었다 (실제로는 하지 않음)'를 나타냅니다.",
    "longExplanation": "• might have / could have + 과거분사: 과거의 사실에 대해 확정적인 증거가 없을 때 '어쩌면 ~했을 수도 있다'고 조심스럽게 추측할 때 씁니다.\n• 특히 could have + 과거분사는 '과거에 그렇게 할 수 있는 능력이나 기회가 충분히 있었지만 실제로는 하지 않았다'는 아쉬운 가능성을 나타내기도 합니다 (예: 더 노력했더라면 이길 수도 있었을 텐데).",
    "formation": "주어 + might / could have + 과거분사",
    "examples": [
      {
        "translation": "그녀는 회의가 있다는 사실을 잊어버렸을지도 모릅니다."
      },
      {
        "translation": "그는 뒷문으로 빠져나갔을 가능성이 있습니다."
      }
    ]
  },
  "en_b2_07": {
    "title": "가정법 과거완료 (제3조건문): If + 과거완료, would have + 과거분사",
    "shortExplanation": "과거 사실의 반대를 가정하여 '만약 그때 ~했더라면, ~했을 텐데'라고 표현합니다.",
    "longExplanation": "가정법 과거완료는 과거에 실제로 일어나지 않은 일에 대한 반실 가정을 나타냅니다. 조건과 결과 모두 과거의 실제 사실과 정반대입니다.\n• 기본 형태: If + 주어 + had + 과거분사, 주어 + would have + 과거분사\n• 조건이 충족되지 않았으므로 기대했던 결과 또한 발생하지 않았습니다.\n• 주절의 would 대신 문맥에 따라 could(~할 수 있었을 텐데)나 might(~했을지도 모를 텐데)를 쓸 수도 있습니다.",
    "formation": "If + 주어 + had + 과거분사, 주어 + would have + 과거분사",
    "examples": [
      {
        "translation": "만약 그녀가 약을 먹었더라면 병이 나았을 텐데."
      },
      {
        "translation": "만약 그가 일찍 떠나지 않았더라면 그녀를 만날 수 있었을 텐데."
      }
    ]
  },
  "en_b2_08": {
    "title": "혼합 가정법",
    "shortExplanation": "조건절과 주절의 시점을 다르게 결합하여 표현합니다 (과거의 조건 ↔ 현재의 결과 등).",
    "longExplanation": "혼합 가정법은 서로 다른 시간대의 가정과 결과를 하나로 엮어 표현합니다:\n1. 과거의 조건 → 현재의 결과:\n• If + 주어 + had + 과거분사, 주어 + would + 동사원형\n• 예: 만약 그때 그 일자리를 수락했더라면, 지금쯤 뉴욕에 있을 텐데.\n2. 현재의 지속적 상태/성향 → 과거의 결과:\n• If + 주어 + 과거동사, 주어 + would have + 과거분사\n• 예: 그녀가 평소에 더 조심성이 있다면, 그것을 깨뜨리지 않았을 텐데.",
    "formation": "If + 주어 + had + 과거분사, 주어 + would + 동사원형",
    "examples": [
      {
        "translation": "만약 그때 내가 의학을 공부했더라면, 지금쯤 의사가 되었을 텐데."
      }
    ]
  },
  "en_b2_09": {
    "title": "미래 시제 수동태 및 조동사가 포함된 수동태",
    "shortExplanation": "미래 시제나 조동사와 결합한 수동태 표현; '~될 것이다', '~되어야 한다' 등.",
    "longExplanation": "미래 시제 및 조동사와 결합하는 수동태의 기본 형태입니다:\n• 조동사 + be + 과거분사\n대표적인 결합 형태:\n• will be + 과거분사: ~될 것이다\n• must be + 과거분사: ~되어야만 한다\n• should be + 과거분사: ~되어야 마땅하다\n• can be + 과거분사: ~될 수 있다.",
    "formation": "주어 + 조동사 (will / must / should / can) + be + 과거분사",
    "examples": [
      {
        "translation": "보고서는 내일 발표될 예정입니다."
      },
      {
        "translation": "이 실수는 즉각 시정되어야 합니다."
      }
    ]
  },
  "en_b2_10": {
    "title": "사역 구문 have/get: have something done",
    "shortExplanation": "자신이 직접 하지 않고 다른 사람이나 전문가에게 의뢰하여 '~을 받다/시키다'를 나타냅니다.",
    "longExplanation": "'have / get + 목적어 + 과거분사' 구문은 자신이 직접 행동하는 대신, 전문가나 타인에게 비용을 지불하거나 요청하여 어떤 조치를 취하게 할 때 사용합니다.\n비교 설명:\n• I cut my hair: 내가 직접 가위로 내 머리를 잘랐다.\n• I had my hair cut: 미용실에서 머리를 잘랐다 (미용사에게 머리를 깎도록 했다).\nget은 일상 구어체 대화에서 자주 쓰이며, have는 조금 더 격식 있는 문맥에 어울립니다.",
    "formation": "주어 + have / get + 목적어 + 과거분사",
    "examples": [
      {
        "translation": "치과에 가서 치아 검진을 받아야 합니다."
      },
      {
        "translation": "그녀는 지난 봄에 업체를 불러 집 페인트칠을 새로 했습니다."
      }
    ]
  },
  "en_b2_11": {
    "title": "전달·보도 동사의 수동태 구문: It is said that... / He is believed to...",
    "shortExplanation": "세간의 소문, 보도 내용, 일반적인 사회적 통념을 객관적으로 전달합니다; '~라고 전해진다', '~로 여겨진다'.",
    "longExplanation": "say, think, believe, report, know, expect, consider 등 전달이나 의견을 나타내는 동사와 함께 쓰이는 두 가지 대표적인 수동태 구문 (뉴스 및 공식 보도에서 빈번히 활용):\n1. It + 수동태 동사 + that + 절 (예: It is believed that... ~라고 널리 믿어지고 있다)\n2. 주어 + be동사 + 과거분사 + to + 동사원형 (예: She is known to be... 그녀는 ~라고 알려져 있다).\n참고: to 부정사의 내용이 문장의 주절 시점보다 더 앞선 과거일 때는 완료부정사인 'to have + 과거분사'를 사용합니다.",
    "formation": "It + be동사 + 과거분사 + that 절 | 주어 + be동사 + 과거분사 + to + 동사원형",
    "examples": [
      {
        "translation": "세 명이 부상을 입었다고 보도되었습니다."
      },
      {
        "translation": "그는 이미 해외로 출국한 것으로 여겨집니다."
      }
    ]
  },
  "en_b2_12": {
    "title": "remember / forget 뒤의 동사-ing형과 to부정사의 의미 차이",
    "shortExplanation": "동사-ing형은 과거의 경험을 '기억하다/잊다', to부정사는 앞으로 해야 할 일을 '잊지 않고 하다/깜빡 잊다'를 나타냅니다.",
    "longExplanation": "remember와 forget 뒤에 결합하는 형태에 따라 가리키는 시점과 의미가 확연히 달라집니다:\n• remember / forget + 동사-ing형(동명사): 과거에 실제로 있었던 일이나 겪었던 경험을 '기억하고 있다 / 잊어버리다'.\n• remember / forget + to + 동사원형(to부정사): 앞으로 해야 할 일, 약속, 의무를 '잊지 않고 챙겨서 하다 / 깜빡 잊고 하지 못하다'.",
    "formation": "remember / forget + 동사-ing형 (과거의 일) vs remember / forget + to + 동사원형 (앞으로 해야 할 일)",
    "examples": [
      {
        "translation": "학회에서 그녀를 만났던 기억이 납니다."
      },
      {
        "translation": "어머니께 전화 드리는 것 잊지 마세요!"
      },
      {
        "translation": "깜빡하고 우유를 사지 못했습니다."
      }
    ]
  },
  "en_b2_13": {
    "title": "stop / regret / mean 뒤의 동사-ing형과 to부정사의 의미 차이",
    "shortExplanation": "stop, regret, mean 뒤에 동사-ing형이 오는지 to부정사가 오는지에 따라 나타나는 뚜렷한 의미 차이.",
    "longExplanation": "동사 stop, regret, mean은 뒤에 오는 형태에 따라 뜻이 완전히 다릅니다:\n• stop + 동사-ing형: 하고 있던 그 행동 자체를 그만두다/중단하다 (예: 담배를 끊다).\n• stop + to + 동사원형: 다른 일을 하기 위해 하던 동작을 멈추다/발걸음을 멈추다.\n• regret + 동사-ing형: 과거에 이미 저지른 행동을 후회하다.\n• regret + to + 동사원형: 유감스럽게도 ~하게 되다 (공식적인 자리에서 유감스러운 소식을 전할 때: 유감스럽게도 ~을 알려드립니다).\n• mean + 동사-ing형: ~하는 것을 의미하다 / 결과적으로 ~하게 되다.\n• mean + to + 동사원형: ~할 의도이다 / ~하려고 작정하다.",
    "formation": "stop / regret / mean + 동사-ing형 vs stop / regret / mean + to + 동사원형",
    "examples": [
      {
        "translation": "그는 작년에 담배를 끊었습니다."
      },
      {
        "translation": "그녀는 경치를 바라보기 위해 발걸음을 멈추었습니다."
      }
    ]
  },
  "en_b2_14": {
    "title": "wish + 과거 시제 - 현재 사실에 반대되는 소망 (가정법 과거)",
    "shortExplanation": "현재 사실과 반대되거나 실현되기 어려운 소망, 아쉬움을 나타내며 '~라면 좋을 텐데'라는 뜻을 나타냅니다.",
    "longExplanation": "'wish + 동사의 과거형'은 가정법 과거 구문으로, 현재의 상황을 바꾸고 싶지만 현실적으로 실현 불가능하거나 어려운 소망을 표현합니다. 동사의 형태는 가정법 과거(제2유형 조건문)와 동일하게 과거형을 쓰며, be동사의 경우 격식체에서는 주어의 인칭과 무관하게 'were'를 사용하는 것이 원칙입니다 (일상 구어체에서는 'was'도 널리 쓰입니다).",
    "formation": "주어 + wish / wishes + (that) + 주어 + 동사의 과거형 / were",
    "examples": [
      {
        "translation": "영어를 더 잘할 수 있으면 좋을 텐데."
      },
      {
        "translation": "그녀는 더 따뜻한 나라에서 살고 있다면 좋을 텐데 하고 바란다."
      }
    ]
  },
  "en_b2_15": {
    "title": "wish + 과거완료 시제 - 과거 일에 대한 후회와 유감 (가정법 과거완료)",
    "shortExplanation": "과거에 이미 일어났거나 일어나지 않은 일에 대한 후회나 아쉬움을 나타내며 '~했더라면 좋았을 텐데'라는 뜻을 나타냅니다.",
    "longExplanation": "'wish + 과거완료(had + 과거분사)' 구문은 가정법 과거완료로, 이미 지나가 버려 되돌릴 수 없는 과거의 행동이나 사건에 대해 후회와 유감을 나타낼 때 쓰입니다. 제3유형 가정법 조건문의 조건절과 동일한 형태를 취합니다.",
    "formation": "주어 + wish / wishes + (that) + 주어 + had + 동사의 과거분사",
    "examples": [
      {
        "translation": "그렇게 많이 먹지 말았어야 했는데."
      },
      {
        "translation": "그녀는 그 일자리 제안을 수락했더라면 좋았을 텐데 하고 아쉬워한다."
      }
    ]
  },
  "en_b2_16": {
    "title": "wish + would - 타인의 행동 변화나 상황 개선을 바라는 표현",
    "shortExplanation": "다른 사람의 불쾌한 행동에 대한 불만이나 짜증, 또는 특정 상황이 바뀌기를 바라는 간절한 마음을 나타내며 '~해주면 좋을 텐데'라는 뜻을 나타냅니다.",
    "longExplanation": "'wish + would + 동사 원형' 구문은 상대방의 마음에 들지 않는 행동을 고쳐 주기를 바라는 불만 섞인 요구나 날씨 등 외부 상황이 바뀌기를 희망할 때 쓰입니다. 원칙적으로 주절과 종속절의 주어가 동일 인물일 때는 사용하지 않습니다 (자신의 능력이나 의지라면 wish + 과거 시제 또는 could를 씁니다).",
    "formation": "주어 1 + wish / wishes + (that) + 주어 2 + would + 동사 원형",
    "examples": [
      {
        "translation": "제발 내 말을 좀 들어주면 좋겠어."
      },
      {
        "translation": "비가 그쳤으면 좋겠다."
      }
    ]
  },
  "en_b2_17": {
    "title": "제한적 용법과 계속적 용법 (관계사절의 기능 비교)",
    "shortExplanation": "제한적 용법은 대상을 특정하여 한정하고(쉼표 없음), 계속적 용법은 이미 명확한 대상에 부가 정보를 덧붙입니다(쉼표 있음).",
    "longExplanation": "1. 제한적 용법(한정적 용법): 쉼표 없이 선행사를 직접 수식하며, 대화 상대방에게 가리키는 대상을 분명히 특정해 주는 필수 정보입니다. 이 절을 생략하면 문장의 온전한 의미가 성립하지 않습니다. 관계대명사 that으로 who나 which를 대체할 수 있습니다.\n2. 계속적 용법(비제한적 용법): 선행사 뒤에 쉼표를 두고 추가적인 부연 설명을 제공합니다. 이 절을 생략해도 문장의 핵심 의미는 그대로 유지됩니다. 이 구문에서는 관계대명사 that을 절대 사용할 수 없습니다.",
    "formation": "제한적 용법: 선행사 + 관계대명사 (who / which / that) + 절 | 계속적 용법: 선행사, + 관계대명사 (who / which), + 절",
    "examples": [
      {
        "translation": "내가 너에게 말했던 그 영화가 오늘 밤에 상영된다."
      },
      {
        "translation": "파리에 살고 있는 우리 누나는 다음 주에 방문할 예정이다."
      }
    ]
  },
  "en_b2_18": {
    "title": "관계사절에서의 전치사 위치와 결합 규칙",
    "shortExplanation": "일상 구어체에서는 전치사를 관계사절 끝에 두며, 격식 있는 문체에서는 관계대명사(whom / which) 바로 앞으로 전치시킵니다.",
    "longExplanation": "관계사절 안에서 전치사의 배치는 문체에 따라 구별됩니다:\n1. 일상 구어체 및 비격식체: 전치사를 관계사절의 끝에 그대로 남겨 둡니다 (예: the house I grew up in). 이때 관계대명사는 생략되거나 that 또는 who가 쓰입니다.\n2. 격식체 및 문어체: 전치사를 관계대명사 앞으로 이동시킵니다 (예: the house in which I grew up).\n중요 규칙: 전치사 바로 뒤에는 사람일 때 목적격 whom, 사물일 때 which만 올 수 있으며, that이나 who는 전치사 바로 뒤에 결코 쓸 수 없습니다.",
    "formation": "구어체: 선행사 + (관계대명사) + 절 + 전치사 | 격식체: 선행사 + 전치사 + whom / which + 절",
    "examples": [
      {
        "translation": "내가 지금 참여하고 있는 프로젝트는 대단히 흥미진진하다."
      },
      {
        "translation": "제가 현재 관여하고 있는 그 프로젝트는 매우 흥미롭습니다."
      }
    ]
  },
  "en_b2_19": {
    "title": "결과를 나타내는 접속사와 연결어: so... that, such... that, therefore, as a result",
    "shortExplanation": "특정 원인으로 인한 결과를 표현하며 '너무 ~해서 …하다' 또는 '따라서', '그 결과'라는 의미를 나타냅니다.",
    "longExplanation": "영어에서 결과를 이끄는 대표적인 구문 및 접속부사:\n1. so + 형용사 / 부사 + that 절: 정도를 강조하여 '매우 ~해서 그 결과 …하다'를 나타냅니다 (예: He spoke so quickly that nobody understood).\n2. such + (a / an) + 형용사 + 명사 + that 절: 의미는 so... that과 같으나 명사구를 핵심으로 수식합니다 (예: It was such a long film that I fell asleep).\n3. 문장 간의 접속부사: therefore(그러므로), consequently(그 결과), as a result(결과적으로), hence / thus(따라서). 주로 마침표나 세미콜론 뒤에 콤마와 함께 쓰여 문장 간의 인과관계를 완성합니다.",
    "formation": "so + 형용사 / 부사 + that + 절 | such + (a / an) + 형용사 + 명사 + that + 절 | 문장 1; therefore / consequently / as a result, + 문장 2",
    "examples": [
      {
        "translation": "그 책은 너무나 훌륭해서 나는 두 번이나 읽었다."
      },
      {
        "translation": "그녀는 마감 기한을 놓쳤고, 그 결과 계약을 잃게 되었다."
      }
    ]
  },
  "en_b2_20": {
    "title": "be used to / get used to + 동명사 - ~에 익숙하다 / ~에 익숙해지다",
    "shortExplanation": "'be used to'는 이미 익숙해져 있는 상태를 나타내고, 'get used to'는 점차 익숙해져 가는 적응 과정을 나타냅니다.",
    "longExplanation": "1. be used to + 동명사 (V-ing) / 명사: 어떤 환경이나 대상에 이미 익숙해진 상태를 의미합니다 (여기서 to는 전치사이므로 뒤에 명사나 동명사가 옵니다).\n2. get used to + 동명사 (V-ing) / 명사: 낯설었던 상태에서 점차 적응하고 익숙해지는 과정과 변화를 나타냅니다.\n혼동 주의: 과거의 규칙적 습관이나 지속적 상태를 나타내는 'used to + 동사 원형'(과거에 ~하곤 했다, 지금은 아니다)과는 형태와 의미가 완전히 다르므로 혼동하지 않도록 주의해야 합니다.",
    "formation": "주어 + be / get used to + 동명사 (V-ing) / 명사",
    "examples": [
      {
        "translation": "저는 이렇게 일찍 일어나는 것에 익숙하지 않습니다."
      },
      {
        "translation": "시간이 좀 걸리긴 했지만, 그녀는 새로운 시스템에 익숙해졌습니다."
      }
    ]
  },
  "en_b2_21": {
    "title": "과거미래: would / was, were going to",
    "shortExplanation": "과거의 특정 시점을 기준으로 바라보았을 때 향후 일어날 예정이었던 동작이나 계획을 나타내며, 간접화법이나 서술문에서 쓰입니다.",
    "longExplanation": "과거 시점에서 미래를 전망하는 '과거미래' 표현 방식:\n1. would + 동사 원형: 조동사 will의 과거형으로, 과거의 약속, 발언, 예상을 간접화법으로 전달할 때 흔히 사용됩니다 (예: She said she would come).\n2. was / were going to + 동사 원형: 과거에 하려고 계획하고 의도했던 일이었으나, 실행하지 못했거나 중단되었음을 암시할 때 주로 쓰입니다 (예: He was going to call but forgot).\n3. was / were about to + 동사 원형: 과거의 그 순간 '막 ~하려던 참이었다'는 직전의 긴박한 상황을 표현합니다.",
    "formation": "주어 + would + 동사 원형 | 주어 + was / were going to + 동사 원형 | 주어 + was / were about to + 동사 원형",
    "examples": [
      {
        "translation": "그녀는 그곳에 오겠다고 약속했다."
      },
      {
        "translation": "그가 막 떠나려던 찰나에 그녀에게서 전화가 걸려왔다."
      }
    ]
  },
  "en_b2_22": {
    "title": "be to + 부정사 - 공식 지시, 예정, 운명",
    "shortExplanation": "공식적인 명령이나 규정, 공식적으로 정해진 일정, 또는 서술문에서의 피할 수 없는 운명을 나타냅니다.",
    "longExplanation": "'be동사 + to부정사' 구문은 격식체에서 쓰이며 다음과 같은 주요 의미를 지닙니다:\n1. 공식 지시 및 의무: 공식 규정이나 상부 지시에 의해 마땅히 지켜야 할 사항을 나타냅니다 (예: Passengers are to remain seated - 승객 여러분은 착석 상태를 유지하셔야 합니다).\n2. 공식적인 예정: 공적인 협의나 공표를 통해 정해진 미래의 계획을 나타냅니다 (예: The summit is to take place next month - 정상회담은 다음 달에 열릴 예정이다).\n3. 운명(주로 과거형 was / were to): 전기나 역사 서술문에서 '~할 운명이었다'라는 불가피한 결말을 표현합니다 (예: They were never to meet again - 그들은 다시는 만나지 못할 운명이었다).",
    "formation": "주어 + am / is / are / was / were + to + 동사 원형",
    "examples": [
      {
        "translation": "금요일까지 보고서를 제출해야 합니다."
      },
      {
        "translation": "그녀는 당대 가장 위대한 과학자 중 한 명이 될 운명이었다."
      }
    ]
  },
  "en_b2_23": {
    "title": "ought to - 도덕적 의무와 당연한 논리적 추론",
    "shortExplanation": "도덕적 책무, 마땅한 도리 또는 논리적인 기대를 나타내며 '~해야 한다', '~하는 것이 마땅하다'라는 뜻을 나타냅니다.",
    "longExplanation": "'ought to'는 조동사적 표현으로, 사회적 통념이나 도덕적 규범에 따른 마땅한 의무, 혹은 상식에 비추어 당연한 이치에 따른 추론을 나타냅니다 (should보다 객관적이고 강한 당위성을 지닙니다).\n• 형태상 특징: should와 달리 항상 to를 동반하여 'ought to + 동사 원형' 형태로 쓰입니다.\n• 부정형: ought not to (축약형 oughtn't to).\n• 과거 표현: 'ought to have + 과거분사'는 과거에 마땅히 했어야 했는데 하지 않은 일에 대한 질책이나 후회를 나타냅니다.",
    "formation": "긍정: 주어 + ought to + 동사 원형 | 부정: 주어 + ought not to + 동사 원형 | 과거: 주어 + ought to have + 동사의 과거분사",
    "examples": [
      {
        "translation": "당신은 자신이 한 말에 대해 사과해야 마땅합니다."
      },
      {
        "translation": "그녀는 우리에게 더 일찍 말했어야 했습니다."
      }
    ]
  },
  "en_b2_24": {
    "title": "need - 조동사와 일반동사의 문법적 기능",
    "shortExplanation": "'need'는 격식 있는 부정문/의문문에 쓰이는 조동사로서의 용법과 보통의 일반동사로서의 용법을 모두 지닙니다.",
    "longExplanation": "'need'는 문맥과 어조에 따라 두 가지 문법 체계로 사용됩니다:\n1. 조동사로서의 need (주로 격식체 부정문과 의문문): 3인칭 단수 현재형 -s가 붙지 않고, do/does 등의 보조 없이 쓰이며, to 없이 동사 원형이 곧바로 이어집니다 (예: You needn't worry / Need I explain?).\n2. 일반동사로서의 need: 3인칭 단수(-s) 등 일반적인 동사 굴절 변화를 모두 따르고, 부정문과 의문문에서 do / does / did를 빌려 쓰며, 목적어로 to부정사를 취합니다 (예: She doesn't need to come).",
    "formation": "조동사: 주어 + needn't + 동사 원형 | 일반동사: 주어 + don't / doesn't / didn't need to + 동사 원형",
    "examples": [
      {
        "translation": "두 양식을 모두 작성하실 필요는 없습니다."
      },
      {
        "translation": "그녀가 모든 회의에 참석할 필요는 없다."
      }
    ]
  },
  "en_b2_25": {
    "title": "dare - 감히 ~하다, 도전하다 (조동사 및 일반동사)",
    "shortExplanation": "용기를 내어 감히 행동하거나, 분노의 감탄문에서 강한 항의를 나타내며 '감히 ~하다'라는 뜻을 나타냅니다.",
    "longExplanation": "'dare'는 '~할 용기가 있다, 감히 ~하다'라는 의미로 조동사와 일반동사 두 가지 품사적 기능을 갖습니다:\n1. 조동사 용법: 주로 수사의문문, 감탄문, 부정문에서 사용됩니다. 주어에 따른 인칭 변화가 없고 바로 뒤에 동사 원형이 옵니다 (예: How dare you! / I daren't ask).\n2. 일반동사 용법: 일반 동사 변화 규칙을 따르며 부정문이나 의문문에서 do / does / did를 쓰고 뒤에 to부정사(때로는 원형부정사)를 연결합니다 (예: She didn't dare to look / He dared to challenge the boss).",
    "formation": "감탄 / 조동사: How dare + 주어 + 동사 원형! | 주어 + daren't + 동사 원형 | 일반동사: 주어 + dare / dares / dared (to) + 동사 원형",
    "examples": [
      {
        "translation": "네가 어떻게 감히 나한테 그런 식으로 말할 수가 있어!"
      },
      {
        "translation": "그녀는 두려워하지 않고 자신의 의견을 솔직하게 표현했다."
      }
    ]
  },
  "en_b2_26": {
    "title": "재귀대명사: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves",
    "shortExplanation": "동작의 대상이 주어 자신에게 돌아올 때 목적어로 쓰이거나, 남의 도움 없이 스스로 했음을 강조할 때 씁니다.",
    "longExplanation": "재귀대명사(myself, yourself, himself, herself, itself, ourselves, yourselves, themselves)는 문장 내에서 다음과 같은 핵심 기능을 담당합니다:\n1. 재귀 용법(목적어): 주어가 행한 동작이 주어 자신에게 미칠 때 동사나 전치사의 목적어 자리에 씁니다 (예: He cut himself - 그는 칼에 손을 베었다).\n2. 강조 용법: 주어나 목적어 바로 뒤 또는 문장 끝에 놓여 '직접, 스스로'라는 의미를 강조하며, 생략하더라도 문장의 문법적 완성도에는 영향을 주지 않습니다 (예: I did it myself - 내가 직접 그걸 해냈다).\n3. 주요 관용 표현: by oneself(혼자서, 자력으로), help yourself(마음껏 드세요), enjoy oneself(즐거운 시간을 보내다).",
    "formation": "목적어 용법: 주어 + 동사 + 재귀대명사 | 강조 용법: 주어 (+ 재귀대명사) + 동사 + 목적어 (+ 재귀대명사)",
    "examples": [
      {
        "translation": "그녀는 독학으로 기타를 배웠다."
      },
      {
        "translation": "그 기계는 자동으로 꺼진다."
      }
    ]
  },
  "en_b2_27": {
    "title": "집합명사의 수 일치: team, family, committee, government...",
    "shortExplanation": "개별 구성원들로 이루어진 집단을 지칭하는 명사로, 하나의 유기적 개체로 보는지 구성원 개개인으로 보는지에 따라 동사의 수를 결정합니다.",
    "longExplanation": "집합명사(team, family, government, committee, staff, audience, crew, public 등)는 여러 사람으로 구성된 하나의 단체를 나타냅니다:\n• 영국식 영어: 집단 내부의 개별 구성원들에게 초점을 맞추어 복수 동사를 쓰는 경향이 강합니다 (예: The team are playing well). 집단 전체를 하나의 덩어리로 볼 때는 단수 동사도 사용합니다.\n• 미국식 영어: 집단 전체를 하나의 단일 단위로 인식하여 거의 대부분 단수 동사를 사용합니다 (예: The team is playing well).\n주의할 예외: 'police'(경찰)는 어느 영어권에서나 항상 복수로 취급되므로 반드시 복수 동사를 씁니다.",
    "formation": "집합명사 + 단수 동사 (전체를 하나의 단일 개체로 간주할 때 / 미국식 경향) 또는 복수 동사 (개별 구성원들의 활동에 초점을 둘 때 / 영국식 경향)",
    "examples": [
      {
        "translation": "정부는 새로운 정책 방안을 발표했다."
      },
      {
        "translation": "관객들은 모두 기립하여 환호했다."
      }
    ]
  },
  "en_b2_28": {
    "title": "분수, 소수 및 기초 수학 연산의 표현 규칙",
    "shortExplanation": "영어에서 분수, 소수, 백분율 및 기본 사칙연산 기호를 정확하게 읽고 표현하는 문법 규칙입니다.",
    "longExplanation": "영어의 수치 및 수학 연산 표현에 관한 표준 규칙:\n1. 분수 읽는 법: 분자는 기수(일반 숫자), 분모는 서수(순서 숫자)로 읽습니다. 분자가 2 이상이면 분모 서수에 복수형 -s를 붙입니다 (예: 1/2은 a half, 1/3은 a third, 1/4은 a quarter, 3/4은 three quarters, 2/3은 two thirds).\n2. 소수 읽는 법: 소수점은 'point'로 발음하며, 소수점 뒤의 숫자는 각 자리별로 한 자리씩 낱개로 읽습니다 (예: 3.14는 three point one four, 5.7은 five point seven).\n3. 백분율: 기수 + percent (예: 25%는 twenty-five percent).\n4. 사칙연산 기호: 덧셈(+)은 plus, 뺄셈(-)은 minus, 곱셈(×)은 times 또는 multiplied by, 나눗셈(÷)은 divided by, 등호(=)는 equals 또는 is로 읽습니다.",
    "formation": "분수: 기수(분자) + 서수(분모, 분자>1일 때 -s 추가) | 소수: 정수 + point + 소수점 이하 자리별 낱개 발음",
    "examples": [
      {
        "translation": "학생들의 4분의 3이 시험에 합격했다."
      },
      {
        "translation": "인플레이션율은 2.5퍼센트로 떨어졌다."
      }
    ]
  },
  "en_b2_29": {
    "title": "부사의 비교급과 최상급",
    "shortExplanation": "부사의 비교 변화: 더 빠르게, 더 신중하게, 가장 잘, 더 나쁘게, 더 멀리.",
    "longExplanation": "부사의 비교급과 최상급은 형용사와 기본적으로 같은 규칙으로 만들어집니다:\n• 1음절 부사: 어미에 -er(비교급) / -est(최상급)을 붙임: fast → faster, hard → harder, early → earlier.\n• 대부분의 -ly로 끝나는 부사: 앞에 more(비교급) / most(최상급)를 둠: carefully → more carefully → most carefully.\n• 불규칙 변화: well → better → best, badly → worse → worst, far → further/farther → furthest/farthest, little → less → least, much → more → most.",
    "formation": "짧은 부사 + -er / -est 또는 more / most + -ly형 부사",
    "examples": [
      {
        "translation": "그녀는 이전보다 더 자신감 있게 말했다."
      },
      {
        "translation": "그는 팀에서 가장 열심히 일한다."
      }
    ]
  },
  "en_c1_01": {
    "title": "부정 부사에 의한 도치 구문",
    "shortExplanation": "강조를 위해 부정 부사를 문두에 두고 조동사를 주어 앞에 놓는 도치 구문입니다.",
    "longExplanation": "강조를 위해 부정 또는 준부정의 의미를 가진 부사나 부사구를 문두에 배치할 때 발생합니다. 이때 주어 앞에 조동사(또는 be동사)가 오는 부분 도치(의문문과 동일한 어순)가 일어납니다.\n도치를 유발하는 주요 어구: never(결코 ~않다), rarely / seldom(좀처럼 ~않다), little(거의 ~않다), hardly / scarcely / barely(거의 ~않다 / ~하자마자), not only(~뿐만 아니라), only(오직 ~해서야), no sooner(~하자마자).",
    "formation": "부정 부사 + 조동사 + 주어 + 본동사",
    "examples": [
      {
        "translation": "이렇게 아름다운 것은 내 평생 본 적이 없다."
      },
      {
        "translation": "그녀가 실수를 하는 일은 거의 없다."
      },
      {
        "translation": "앞으로 무슨 일이 일어날지 나는 전혀 알지 못했다."
      }
    ]
  },
  "en_c1_02": {
    "title": "Not only... but also 도치 구문",
    "shortExplanation": "강조 표현: Not only가 이끄는 절에서 도치가 일어나고, but also 절은 일반적인 어순을 유지합니다.",
    "longExplanation": "강조를 위해 'Not only'를 문두에 둘 경우, 첫 번째 절은 조동사가 주어 앞에 오는 도치 어순을 취합니다. 반면 'but (also)' 뒤에 이어지는 두 번째 절은 정상적인 평서문 어순을 유지합니다.\n'~할 뿐만 아니라 …하기까지 하다'라는 의미로, 예상이나 일반적인 수준을 뛰어넘는 상황을 강조할 때 사용됩니다.",
    "formation": "Not only + 조동사 + 주어 + 동사, but (주어) + also + ...",
    "examples": [
      {
        "translation": "그녀는 재능이 뛰어날 뿐만 아니라 매우 성실하기까지 하다."
      },
      {
        "translation": "그들은 지각했을 뿐만 아니라 서류까지 잊어버리고 왔다."
      }
    ]
  },
  "en_c1_03": {
    "title": "Hardly / Scarcely / No sooner 도치 구문 (~하자마자)",
    "shortExplanation": "두 동작이 연달아 곧바로 일어남을 나타내는 표현: '~하자마자 곧 …하다'.",
    "longExplanation": "과거에 일어난 두 사건이 직후에 연이어 일어났음을 나타내는 구문입니다. 먼저 일어난 동작에는 과거완료 도치형태(had + 주어 + 과거분사)를 쓰고, 뒤이은 동작에는 단순과거시제를 씁니다.\n• Hardly / Scarcely + had + 주어 + 과거분사 + when / before + 과거시제 절.\n• No sooner + had + 주어 + 과거분사 + than + 과거시제 절.",
    "formation": "Hardly/Scarcely + had + 주어 + 과거분사 + when + 과거시제 / No sooner + had + 주어 + 과거분사 + than + 과거시제",
    "examples": [
      {
        "translation": "그녀가 도착하자마자 비가 내리기 시작했다."
      },
      {
        "translation": "내가 자리에 앉자마자 누군가 문을 두드렸다."
      }
    ]
  },
  "en_c1_04": {
    "title": "가정법 조건문의 도치: Had / Were / Should",
    "shortExplanation": "격식 있는 문체에서 if를 생략하고 Had, Were, Should를 문두로 보내는 도치 구문.",
    "longExplanation": "격식 있는 문체나 공적 문서에서는 접속사 'if'를 생략하고 조동사를 주어 앞으로 보내는 도치 구문을 사용합니다:\n• 가정법 과거완료(과거 사실에 반대): Had + 주어 + 과거분사 (= If + 주어 + had + 과거분사).\n• 가정법 과거(현재 사실에 반대): Were + 주어 (+ to + 동사원형) (= If + 주어 + were / 과거동사).\n• 혹시라도 일어날 가정(실현 가능성이 낮을 때): Should + 주어 + 동사원형 (= If + 주어 + should + 동사원형).",
    "formation": "Had + 주어 + 과거분사 / Were + 주어 (+ to + 동사원형) / Should + 주어 + 동사원형",
    "examples": [
      {
        "translation": "그녀가 나에게 말해 주었더라면, 내가 도와주었을 텐데."
      },
      {
        "translation": "내가 너의 처지라면 수락할 것이다."
      },
      {
        "translation": "도움이 필요하시면 언제든지 저희에게 전화해 주십시오."
      }
    ]
  },
  "en_c1_05": {
    "title": "It 강조구문 (It 분열문: It was ~ who/that)",
    "shortExplanation": "'It is/was ~ that/who' 구문을 사용하여 문장의 특정 요소를 집중적으로 부각하는 강조구문입니다.",
    "longExplanation": "It 분열문(강조 구문)의 기본 구조: It + be동사(시제에 일치) + 강조할 요소 + that/who/which + 문장의 나머지 부분.\n문장의 초점을 특정 단어나 구(주어, 목적어, 부사구 등)로 옮겨 '다름 아닌 바로 ~이다'라는 강한 뉘앙스를 부여합니다:\n• 강조 대상이 사람인 경우: who 또는 that 사용.\n• 사물, 상황, 시간, 장소 부사구 등인 경우: that(또는 which) 사용.",
    "formation": "It + be동사 + 강조 요소 + that/who + 문장의 나머지",
    "examples": [
      {
        "translation": "나를 깨운 것은 바로 그 소음이었다."
      },
      {
        "translation": "성공으로 이끄는 것은 다름 아닌 각고의 노력이다."
      }
    ]
  },
  "en_c1_06": {
    "title": "Wh- 의문사 분열문 (What ~ is/was 강조구문)",
    "shortExplanation": "'What'으로 시작하는 명사절을 주어로 삼아, 강조하고자 하는 핵심 내용을 be동사 뒤에 배치하는 구문입니다.",
    "longExplanation": "유사 분열문(Wh-cleft)의 기본 구조: What 명사절 + be동사 + 강조할 요소.\n문두에 What 절로 화제를 먼저 던진 후, 전달하고자 하는 가장 핵심적인 정보나 요점을 be동사 뒤로 배치하여 강한 인상을 남깁니다.",
    "formation": "What + 종속절 + be동사 + 강조 요소",
    "examples": [
      {
        "translation": "내가 런던에 대해 가장 사랑하는 점은 바로 다양성이다."
      },
      {
        "translation": "그가 행한 일은 전혀 예상치 못한 것이었다."
      }
    ]
  },
  "en_c1_07": {
    "title": "요구·제안 동사 뒤의 격식 가정법 현재",
    "shortExplanation": "요구·제안 동사 뒤의 that 절에서 주어의 인칭과 상관없이 동사원형을 사용하는 가정법 현재입니다.",
    "longExplanation": "제안, 권고, 주장, 요구, 명령 등을 나타내는 동사(suggest, recommend, insist, demand, propose, request, require, order 등) 뒤에 오는 that 절에서는 술어동사로 '동사원형(가정법 현재)'을 씁니다.\n주어의 인칭이나 수(3인칭 단수 -s 없음) 및 시제와 상관없이 동사원형을 취하며, be동사는 그대로 'be'를 사용합니다.\n• 미국식 영어에서는 동사원형을 쓰는 순수 가정법을 선호합니다.\n• 영국식 영어에서는 'should + 동사원형' 형태를 자주 사용합니다(예: I suggest that he should leave).",
    "formation": "주어 + 제안·요구 동사 + that + 주어 + (should) + 동사원형",
    "examples": [
      {
        "translation": "나는 그가 병원에 가서 진찰을 받아볼 것을 권합니다."
      },
      {
        "translation": "모든 학생이 그 회의에 참석하는 것이 필수적입니다."
      }
    ]
  },
  "en_c1_08": {
    "title": "It's high time + 과거시제 (벌써 ~했어야 할 때이다)",
    "shortExplanation": "진작에 했어야 할 행동이 아직 이루어지지 않았음을 나타내며, 재촉이나 가벼운 질책의 뉘앙스를 띱니다.",
    "longExplanation": "구문 구조: It's (high / about) time + 주어 + 동사의 과거형.\n동사의 형태는 단순과거형을 쓰지만, 의미는 현재나 미래를 향한 가정법적 뉘앙스입니다. 진작에 끝냈어야 할 일을 왜 아직도 안 하고 있느냐는 식의 답답함이나 촉구를 나타냅니다:\n• It's time: ~할 때이다.\n• It's high time / It's about time: 강조 표현으로, '진작에 ~했어야 했다', '벌써 ~하고도 남았을 시간이다'.",
    "formation": "It's (high / about) time + 주어 + 동사의 과거형",
    "examples": [
      {
        "translation": "그녀는 이제 새 직장을 구할 때가 되었다."
      },
      {
        "translation": "넌 진작에 사과했어야 했어."
      }
    ]
  },
  "en_c1_09": {
    "title": "as if / as though 뒤의 가정법 (마치 ~인 것처럼)",
    "shortExplanation": "실제 사실과 다르거나 비현실적인 상황을 빗대어 나타내는 표현: '마치 ~인 것처럼'.",
    "longExplanation": "접속사 as if 또는 as though(마치 ~인 것처럼) 뒤에 가정법 시제를 사용하여 사실과 다른 상황을 비유적으로 묘사합니다:\n• as if / as though + 과거시제: 현재 사실에 반대되는 상황을 가정합니다(be동사는 인칭에 상관없이 were를 쓰는 것이 원칙).\n• as if / as though + 과거완료(had + 과거분사): 과거 사실에 반대되는 상황을 가정합니다.",
    "formation": "주어 + 동사 + as if / as though + 주어 + 과거형 / 과거완료형",
    "examples": [
      {
        "translation": "그는 마치 자기가 백만장자라도 되는 것처럼 돈을 쓴다."
      },
      {
        "translation": "그녀는 마치 전에 그를 만나본 적이 있는 것처럼 말했다."
      }
    ]
  },
  "en_c1_10": {
    "title": "So / Neither + 조동사 + 주어 (동의를 나타내는 도치 표현)",
    "shortExplanation": "상대방의 말에 동의할 때 사용: 긍정문에는 'So...'(~도 그렇다), 부정문에는 'Neither...'(~도 아니다).",
    "longExplanation": "앞선 진술에 대해 문장을 전부 반복하지 않고 짧게 동의나 공감을 나타내는 도치 구문입니다:\n• So + 조동사 + 주어: 긍정 진술에 대한 동의 ('~도 그렇다').\n• Neither / Nor + 조동사 + 주어: 부정 진술에 대한 동의 ('~도 아니다').\n주의사항: 조동사(또는 be동사)는 앞 문장의 시제 및 동사의 종류(일반동사는 do/does/did, 완료시제는 have/has 등)와 반드시 일치해야 합니다.",
    "formation": "So / Neither + 조동사 + 주어",
    "examples": [
      {
        "translation": "나는 재즈를 매우 좋아해. 그녀도 그래."
      },
      {
        "translation": "난 로마에 가본 적이 없어. 나도 그래."
      }
    ]
  },
  "en_c1_11": {
    "title": "종속절을 대신하는 대명사 'so': I think so / I hope so / I'm afraid so",
    "shortExplanation": "think, hope, be afraid 등의 뒤에서 앞선 절의 내용을 반복하지 않고 'so'로 대신 받는 표현입니다.",
    "longExplanation": "'so'는 앞서 언급된 문장이나 명사절의 내용을 간결하게 대신 받아주는 대용어로 쓰입니다. 주로 생각, 소망, 우려를 나타내는 동사 뒤에 위치합니다: think, hope, suppose, expect, believe, imagine, be afraid 등.\n부정형을 만드는 방식에는 두 가지가 있습니다:\n• 동사를 직접 부정: I don't think so, I don't suppose so.\n• 동사 뒤에 'not'을 결합(hope, be afraid 등): I hope not(그렇지 않기를 바랍니다), I'm afraid not(유감스럽지만 그렇지 않은 것 같습니다). ※ 'I don't hope so'라고 쓰지 않도록 주의해야 합니다.",
    "formation": "주어 + think / hope / suppose... + so (부정형: I don't think so / I hope not)",
    "examples": [
      {
        "translation": "그가 올까요? — 올 것 같아요. / 안 올 것 같아요."
      },
      {
        "translation": "그거 비싼가요? — 유감스럽게도 그런 것 같습니다."
      },
      {
        "translation": "문 닫았나요? — 그렇지 않기를 바라요."
      }
    ]
  },
  "en_c1_12": {
    "title": "제한적 용법과 계속적(비제한적) 용법의 관계사절",
    "shortExplanation": "선행사를 특정하여 한정하는 제한적 용법(쉼표 없음)과 부가 설명을 덧붙이는 계속적 용법(쉼표 있음)의 차이.",
    "longExplanation": "관계사절의 두 가지 핵심 용법과 그 차이점:\n• 제한적(한정적) 용법: 어떤 대상인지를 특정하고 식별하는 데 반드시 필요한 핵심 정보를 제공합니다. 쉼표를 쓰지 않으며, 관계대명사 that을 쓸 수 있고, 목적격 관계대명사는 생략 가능합니다.\n• 계속적(비제한적) 용법: 이미 누군지/무엇인지 알고 있는 대상에 대해 부가적인 정보를 덧붙여 설명합니다. 반드시 앞뒤에 쉼표(콤마)를 찍어야 하며, 관계대명사는 who나 which만 쓸 수 있고(that 사용 불가), 관계대명사를 절대 생략할 수 없습니다.",
    "formation": "제한적 용법: 선행사 + who/that/which + 절 / 계속적 용법: 선행사, who/which + 절, ...",
    "examples": [
      {
        "translation": "오스카상을 수상한 그 영화는 정말 훌륭했다. (어떤 영화인지 특정하는 제한적 용법)"
      },
      {
        "translation": "2009년에 개봉한 아바타는 엄청난 흥행을 거두었다. (이미 알려진 영화에 부가 정보를 덧붙임)"
      }
    ]
  },
  "en_c1_13": {
    "title": "격식 문체에서의 '전치사 + which/whom' 구문",
    "shortExplanation": "격식 있는 어조에서 전치사를 문장 끝에 두지 않고 관계대명사 which/whom 바로 앞에 배치하는 구문입니다.",
    "longExplanation": "논문, 공문서, 비즈니스 서신 등 격식을 갖춘 문체에서는:\n• 전치사를 관계대명사 바로 앞에 배치합니다: '전치사 + which'(사물) 또는 '전치사 + whom'(사람).\n• 반면 구어체나 일상적인 표현에서는 전치사를 관계사절 맨 끝에 남겨두는 형태가 일반적입니다(이 경우 who를 쓰거나 관계대명사를 아예 생략함).\n주의: 전치사 바로 뒤에는 사람일 경우 반드시 whom(who나 that 불가), 사물일 경우 which(that 불가)만을 써야 합니다.",
    "formation": "격식체: 선행사 + 전치사 + which/whom + ... / 일상체: 선행사 + (who/which) + ... + 전치사",
    "examples": [
      {
        "translation": "제가 언급했던 보고서가 첨부되어 있습니다. (격식 표현)"
      },
      {
        "translation": "제가 언급한 보고서를 첨부해 두었습니다. (일반 표현)"
      },
      {
        "translation": "제가 얘기했던 보고서 첨부해 놨어요. (구어적 표현)"
      }
    ]
  },
  "en_c1_14": {
    "title": "영어의 명사화(Nominalization) 현상",
    "shortExplanation": "동사나 형용사를 명사 형태로 전환하는 것으로, 학술 및 비즈니스 문체의 핵심 특징입니다.",
    "longExplanation": "명사화(Nominalization)란 접미사 등을 결합하여 동사나 형용사를 명사 형태로 바꾸는 것을 말합니다. 학술 논문, 공식 보고서, 비즈니스 문서의 두드러진 특징으로, 문장을 한층 객관적이고 간결하며 격조 높게 만드는 효과가 있습니다.\n주요 명사 파생 접미사:\n• -tion / -sion: decide → decision(결정), discuss → discussion(논의).\n• -ment: improve → improvement(개선), develop → development(개발/발전).\n• -ance / -ence: appear → appearance(등장/외모), differ → difference(차이).\n• -ity: complex → complexity(복잡성), able → ability(능력).\n• -ness: happy → happiness(행복), aware → awareness(인식).",
    "formation": "동사/형용사 + 명사형 접미사(-tion, -ment, -ance, -ity, -ness 등)",
    "examples": [
      {
        "translation": "그녀는 사업을 확장하기로 결정했다. → 회사를 확장하기로 한 우리의 결정은…"
      },
      {
        "translation": "그는 ~라는 사실을 발견했다. → 그 오류에 대한 그의 발견은…"
      }
    ]
  },
  "en_c1_15": {
    "title": "학술 텍스트에서의 명사화 (Nominalization)",
    "shortExplanation": "동사나 절을 명사구로 전환하여 문장을 간결하고 객관적이며 격식 있는 학술적 어조로 만드는 표현.",
    "longExplanation": "명사화는 동사, 형용사 또는 절 전체를 명사나 명사구 형태로 변환하는 고급 문법 기법입니다. 다음과 같은 기능을 합니다:\n1. 정보 압축: 여러 절로 이루어진 긴 문장을 압축하여 정보 전달의 밀도를 높입니다(예: '물가가 크게 올랐다' → '물가의 상당한 상승').\n2. 수식어 추가 용이: 명사구 앞뒤에 다양한 형용사적 수식어를 덧붙여 정밀한 정의가 가능해집니다.\n3. 객관적이고 격식 있는 문체 형성: 주관적인 인칭대명사를 줄이고 연구 사실 중심의 차분한 학술적 분위기를 조성합니다.",
    "formation": "동사를 포함한 절 → 명사구 (예: The fact that prices increased → The increase in prices...)",
    "examples": [
      {
        "translation": "공기의 질에 있어 매우 뚜렷한 개선이 있었습니다."
      },
      {
        "translation": "그가 입장 표명을 거부한 것은 모두를 크게 놀라게 했습니다."
      }
    ]
  },
  "en_c1_16": {
    "title": "현재분사 구문: V-ing 절 (Present participle clause)",
    "shortExplanation": "현재분사(V-ing)를 활용하여 부사절을 간결하게 줄이고, 동시 동작이나 원인·이유를 나타내는 구문.",
    "longExplanation": "주절과 주어가 일치할 때 부사절을 현재분사(V-ing)를 이용한 분사구문으로 압축할 수 있습니다:\n• 동시 동작(〜하면서, 〜할 때): Walking home, I noticed something strange. (= 집으로 걸어가던 도중, 이상한 낌새를 알아챘다)\n• 원인 및 이유(〜해서, 〜이므로): Knowing the answer, she raised her hand. (= 정답을 알고 있었기 때문에, 그녀는 손을 들었다)\n• 주의할 점: 분사구문의 의미상 주어는 반드시 주절의 주어와 일치해야 하며, 현수분사(부적절한 분사 연결) 오류가 발생하지 않도록 유의해야 합니다.",
    "formation": "현재분사(V-ing) + ~, 주어 + 동사~ / 부정형: Not + V-ing + ~, 주어 + 동사~",
    "examples": [
      {
        "translation": "공항에 도착하자마자, 그는 여권을 두고 왔다는 사실을 불현듯 깨달았습니다."
      },
      {
        "translation": "어떻게 대처해야 할지 몰라, 그녀는 어머니에게 전화를 걸었습니다."
      }
    ]
  },
  "en_c1_17": {
    "title": "과거분사 구문: V3 / Having + V3 절 (Past participial phrase)",
    "shortExplanation": "과거분사(V3)로 수동의 의미를 나타내거나, 'Having + V3'로 주절보다 앞선 완료 동작을 나타내는 구문.",
    "longExplanation": "과거분사 또는 완료분사를 활용한 구문은 글을 한층 격조 있고 간결하게 다듬어 줍니다:\n• 과거분사절(V-ed/V3): 수동의 의미나 완료된 상태를 나타냅니다(예: Built in 1889, the Eiffel Tower... = 1889년에 건축된 에펠탑은...).\n• 완료분사절(Having + V3): 분사가 나타내는 동작이 주절의 시점보다 앞서 완료되었음을 명확히 강조합니다(예: Having read the report, he called a meeting. = 보고서를 다 읽고 난 후, 그는 회의를 소집했다).",
    "formation": "과거분사(V-ed/V3) + ~, 주어 + 동사~ 또는 Having + 과거분사(V-ed/V3) + ~, 주어 + 동사~",
    "examples": [
      {
        "translation": "그 소식에 큰 충격을 받은 그녀는 묵묵히 자리에 주저앉았습니다."
      },
      {
        "translation": "시험을 모두 마친 후, 학생들은 교실 밖으로 퇴실했습니다."
      }
    ]
  },
  "en_c2_01": {
    "title": "unless / provided / as long as / on condition that 조건문",
    "shortExplanation": "'if' 대신 사용하여 엄격한 전제 조건, 한도, 상호 약정 등을 정밀하게 표현하는 조건 구문.",
    "longExplanation": "고급 영어에서는 if 대신 보다 구체적인 뉘앙스를 가진 접속사를 통해 조건을 한정합니다:\n• unless = 〜하지 않는 한, 만약 〜가 아니라면 (if not에 해당하며 단어 자체에 부정의 의미가 내포되어 있으므로 절 내부에 부정어를 중복 사용하지 않음).\n• provided / providing (that) = 오직 〜라는 조건에서만, 〜하기만 한다면 (필수적인 전제 조건을 강조).\n• as long as = 〜하는 한, 〜하기만 하다면 (조건 상태의 지속을 전제로 함).\n• on condition that = 〜을 조건으로 하여 (계약서나 법률 문서 등에서 쓰이는 매우 격식 있는 표현).\n• in case = 〜에 대비하여, 만일의 경우에.",
    "formation": "조건 접속사(Unless / Provided / As long as / On condition that) + 조건절, 주절",
    "examples": [
      {
        "translation": "반드시 갚는다는 조건이라면, 당신에게 기꺼이 돈을 빌려드리겠습니다."
      },
      {
        "translation": "아무것도 새로 내려받지 않는다는 전제하에, 제 노트북을 사용하셔도 좋습니다."
      }
    ]
  },
  "en_c2_02": {
    "title": "Suppose / Supposing / What if를 사용한 가정문",
    "shortExplanation": "가정의 상황을 제시하거나 만약의 경우를 상정하여 질문할 때 사용하는 표현.",
    "longExplanation": "가설적인 상황을 전제하고 상대방의 의견을 묻는 구문입니다:\n• Suppose / Supposing: if 대신 쓰여 '만약 〜라고 가정해 보면 어떨까'라는 질문을 던집니다.\n• What if: 보다 일상적인 구어 표현으로, '만약 〜하면 어떻게 하지?', '〜라면 어쩌지?'라는 뜻입니다.\n• 과거시제나 과거완료시제와 결합 시: 현실에서 실현 가능성이 매우 낮거나 상상 속의 상황임을 나타냅니다.",
    "formation": "Suppose / Supposing / What if + 주어 + 동사(과거형 또는 현재형)~, 의문절?",
    "examples": [
      {
        "translation": "만약 당신이 꼭 하나를 선택해야만 한다면, 어느 쪽을 고르시겠습니까?"
      },
      {
        "translation": "만약 아무도 참석하지 않으면 어쩌죠? 우리는 어떻게 조치해야 할까요?"
      }
    ]
  },
  "en_c2_03": {
    "title": "Only + 상황어구 도치 구문",
    "shortExplanation": "'Only'가 이끄는 시간·조건의 부사구/절을 문두에 놓아 강조하고 주절을 도치시키는 구문.",
    "longExplanation": "Only와 결합된 시간, 조건, 수단의 표현(only when, only after, only if, only then, only by, only in 등)이 강조를 위해 문장 맨 앞으로 이동하면, 주절은 조동사나 be동사가 주어 앞으로 나오는 부분도치 형태를 취합니다.\n격식 있는 작문과 대중 연설에서 가장 강력한 설득력과 웅변 효과를 발휘하는 고급 수사 장치 중 하나입니다.",
    "formation": "Only + 상황 부사구/부사절(시간·조건·수단) + 조동사/be동사 + 주어 + 본동사~",
    "examples": [
      {
        "translation": "스스로 직접 경험해 보고 나서야 비로소 사람은 진정으로 이해할 수 있습니다."
      },
      {
        "translation": "수년에 걸친 고된 훈련을 거친 후에야 비로소 그녀는 그 기술을 온전히 숙달했습니다."
      }
    ]
  },
  "en_c2_04": {
    "title": "So + 형용사/부사 도치 구문",
    "shortExplanation": "'So + 형용사/부사'나 'Such'를 문두로 전치하여 정도의 극단성을 부각하고 결과를 이끄는 도치 구문.",
    "longExplanation": "문어적이고 웅변적인 성격을 띠는 고급 도치 구문입니다:\n• So + 형용사/부사 + be동사/조동사 + 주어 + that + 결과절 (너무나 〜하여 그 결과 …하다).\n• Such + be동사 + 주어 + that + 결과절 (상황의 정도가 너무나 막대하여 그 결과 …하다).",
    "formation": "So + 형용사/부사 + be동사/조동사 + 주어 + that + 절 또는 Such + be동사 + 주어 + that + 절",
    "examples": [
      {
        "translation": "변화가 너무나 급격하게 일어났기 때문에, 그 누구도 제때 적응하지 못했습니다."
      },
      {
        "translation": "그녀의 재능이 워낙 특출났기 때문에, 곧바로 전액 장학금을 제안받았습니다."
      }
    ]
  },
  "en_c2_05": {
    "title": "학술적 완곡 표현 (Hedging): appear to, seem to, tend to, be likely to",
    "shortExplanation": "주장의 단정성을 완화하여 연구자로서의 객관성과 신중한 겸손을 드러내는 서술 기법.",
    "longExplanation": "완곡 표현(헤징)은 학술 글쓰기에서 지나치게 독단적인 단정을 지양하고, 과학적 신중함과 타당성을 유지하기 위해 필수의 표현 전략입니다.\n주요 핵심 구조:\n• appear / seem to: 〜인 것으로 보인다, 〜인 듯하다\n• tend to: 〜하는 경향이 있다, 으레 〜하기 쉽다\n• be likely / unlikely to: 〜할 가능성이 높다 / 낮다\n• be thought / considered to be: 〜인 것으로 여겨지다/간주되다",
    "formation": "주어 + appear / seem / tend + to 부정사 또는 주어 + be likely / thought / considered + to 부정사",
    "examples": [
      {
        "translation": "연구 결과는 두 변수 사이에 유의미한 상관관계가 존재함을 시사하는 것으로 보입니다."
      },
      {
        "translation": "기업들은 새로운 시스템 도입에 드는 비용을 과소평가하는 경향이 흔히 있습니다."
      }
    ]
  },
  "en_c2_06": {
    "title": "학술 텍스트의 담화 표지어 (Discourse markers)",
    "shortExplanation": "논리적 전개와 연결성을 부여하여 학술적 논증을 빈틈없이 조직화하는 담화 연결어.",
    "longExplanation": "담화 표지어는 학술 텍스트에서 글의 뼈대를 세우고 독자가 필자의 사고 흐름을 자연스럽게 따라오도록 돕습니다:\n• 부가 및 추가: Moreover, Furthermore, In addition, Additionally (더욱이, 게다가, 아울러)\n• 대조 및 역접: However, Nevertheless, Conversely, On the other hand (그러나, 그럼에도 불구하고, 반대로, 다른 한편으로는)\n• 인과 및 결론: Therefore, Consequently, As a result, Hence, Thus (따라서, 결과적으로, 그러므로)\n• 부연 및 환언: In other words, That is to say, Namely (다시 말해, 즉, 구체적으로는)\n• 양보: Admittedly, While it is true that, Despite this (인정하건대, 비록 사실이긴 하나, 이러한 점에도 불구하고)",
    "formation": "담화 표지어(문두) + 쉼표 + 독립문 또는 문장1; 담화 표지어, 문장2",
    "examples": [
      {
        "translation": "실험은 결국 실패로 끝났습니다. 그럼에도 불구하고, 도출된 발견점들은 많은 시사점을 주었습니다."
      },
      {
        "translation": "게다가, 분석된 제반 데이터는 매우 밀접한 상관관계를 뚜렷이 나타냅니다."
      }
    ]
  },
  "en_c2_07": {
    "title": "언어역 (Speech registers): 격식체, 중립체, 구어체",
    "shortExplanation": "소통하는 상황, 청중, 목적에 맞춰 어휘와 문법의 격식 수준을 적절하게 구사하는 개념.",
    "longExplanation": "언어역은 소통의 맥락, 상대방과의 관계, 전달 목적에 의해 결정됩니다:\n• 격식체: 수동태, 명사화 구문, 복합 접속사를 적극 활용하고 축약형을 배제하며, 라틴어 어원의 어휘(commence, terminate, assist 등)를 선호합니다.\n• 중립체: 표준 문법을 엄격히 준수하면서도 비속어를 피하고 과하지 않은 일상적 어휘를 사용합니다.\n• 비격식체/구어체: 성분 생략, 구동사(postpone 대신 put off 등), 축약형, 친근한 일상 구어 표현을 자주 사용합니다.",
    "formation": "격식체(학술 어휘, 수동태, 완전한 형태) ↔ 중립체(표준 문법 표현) ↔ 비격식체/구어체(구동사, 축약형, 일상 구어)",
    "examples": [
      {
        "translation": "격식체: 일치하지 않는 어긋난 부분에 대해 귀하의 주의를 환기해 드리고자 합니다."
      },
      {
        "translation": "중립체: 제가 발견한 오류를 하나 짚어 드리고 싶습니다."
      },
      {
        "translation": "구어체: 그냥 좀 마음에 걸리는 부분이 있어서 짚고 넘어가려고요."
      }
    ]
  },
  "en_c2_08": {
    "title": "동의어의 함축적 뉘앙스와 어감 차이 (Connotations)",
    "shortExplanation": "기본 의미가 유사한 동의어들 사이의 정서적 색채(긍정, 중립, 부정)와 미묘한 어감 차이를 식별하는 개념.",
    "longExplanation": "동의어들은 사전적 핵심 의미는 같을지라도, 내포하는 정서적 색채(함축 의미)와 쓰이는 맥락에서 확연한 차이를 보입니다.\n대표적인 뉘앙스 단계 비교:\n• slim(늘씬하여 매력적인: 긍정) → thin(살이 없는: 중립) → skinny(앙상하게 마른: 부정) → scrawny/gaunt(피골이 상접한/수척한: 극부정)\n• determined(결단력 있고 확고한: 긍정) → firm(단호한: 중립) → stubborn/pig-headed(고집불통의/완고한: 부정)\n• thrifty(알뜰살뜰한: 긍정) → economical(절약하는: 중립) → stingy/tight-fisted(구두쇠의/인색한: 부정)\n• confident(당당하고 자신감 있는: 긍정) → assertive(자기주장이 분명한: 중립) → arrogant(거만하고 오만한: 부정)",
    "formation": "동의어 위계: 긍정적 어감(+) → 중립적 어감(0) → 부정적 어감(-)",
    "examples": [
      {
        "translation": "동일한 체형을 묘사하더라도 화자의 태도에 따라 어감이 다릅니다: 그녀는 늘씬하다(+) / 그녀는 말랐다(0) / 그녀는 삐쩍 말랐다(-)."
      }
    ]
  },
  "en_c2_09": {
    "title": "수사적 기법: 수어반복법, 교차대구법, 삼분법 (Rhetorical devices)",
    "shortExplanation": "연설과 논설문에서 리듬감을 창출하고 청중에게 강렬한 인상을 심어주는 고전 수사학 장치.",
    "longExplanation": "격조 높은 웅변과 고급 글쓰기에서 강력한 호소력을 이끌어내는 고전 수사 기법입니다:\n• 수어반복법: 연속되는 문장이나 절의 첫머리에서 동일한 단어구를 반복하여 감정을 고조시킵니다(예: 'I have a dream... I have a dream...').\n• 교차대구법: A-B와 B-A의 교차 대칭 구조를 활용하여 역설적이면서도 깊은 인상을 남깁니다(예: 'Ask not what your country can do for you, but what you can do for your country').\n• 삼분법: 대등한 세 가지 요소를 나란히 배열하여 완벽한 리듬과 균형미를 완성합니다(예: 시저의 '왔노라, 보았노라, 이겼노라' / 링컨의 '국민의, 국민에 의한, 국민을 위한 정부').",
    "formation": "수어반복(문두 연속 반복 A...) / 교차대구(A-B와 B-A의 대칭 배열) / 삼분법(세 요소 병렬 A, B, C)",
    "examples": [
      {
        "translation": "벗들이여, 로마 시민들이여, 동포들이여, 제 말에 부디 귀를 기울여 주십시오. (삼분법 구문)"
      },
      {
        "translation": "배우는 것이 많을수록, 더 많은 것을 벌게 된다. (격언에 나타난 교차대구 구조)"
      }
    ]
  },
  "en_c2_10": {
    "title": "학술 텍스트의 정확한 연어 표현 (Academic collocations)",
    "shortExplanation": "학술적 표준 관용에 부합하는 정밀한 동사-명사 결합을 구사하는 표현.",
    "longExplanation": "최고급 영어에서는 개별 명사에 호응하는 '정확하고 알맞은 동사'를 결합해 쓰는 연어(어휘 결합) 능력이 글의 품격을 좌우합니다:\n주요 학술 연어 목록:\n• conduct / carry out research (연구를 수행하다; make나 do는 쓰지 않음)\n• draw / reach a conclusion (결론을 도출하다/도달하다)\n• raise / address / tackle an issue (문제를 제기하다/다루다/해결에 착수하다)\n• reach / achieve a consensus (합의를 이끌어내다/도달하다)\n• make significant progress (현저한 진전을 이루다)\n• pose / present a challenge (난제를 제기하다/도전을 안겨주다)",
    "formation": "고유한 학술 동사 + 호응하는 명사구 (예: conduct research, reach a consensus 등)",
    "examples": [
      {
        "translation": "연구진은 대단히 광범위한 심층 인터뷰를 수행했습니다."
      },
      {
        "translation": "위원회는 끝내 합의점을 도출해 내지 못했습니다."
      }
    ]
  },
  "en_c2_11": {
    "title": "독립분사구문 (Absolute construction)",
    "shortExplanation": "주절과 다른 독자적인 주어를 지닌 명사와 분사의 결합으로 접속사 없이 상황을 압축 보충하는 구문.",
    "longExplanation": "독립분사구문 = 명사/대명사 + 분사 (주절의 주어와 일치하지 않는 독자적인 의미상 주어를 유지).\n문어적이고 매우 격식 있는 문체에서 사용되며, 종속접속사를 쓰지 않고도 상황적 배경(시간, 원인, 조건, 부대상황)을 문장에 매우 간결하게 덧붙일 수 있습니다.\n주요 유형 분류:\n• 조건: Weather permitting = 날씨가 허락한다면\n• 종합 평가: All things considered = 모든 사정을 두루 참작해 볼 때\n• 완료 및 시점: Her work finished = 그녀의 일이 끝났을 때; This done = 이 일이 마무리된 후",
    "formation": "명사/대명사 + 분사(현재분사 V-ing 또는 과거분사 V-ed/V3), 주절",
    "examples": [
      {
        "translation": "모든 제반 조건을 종합적으로 고려해 보았을 때, 그것은 대단히 성공적인 행사였습니다."
      },
      {
        "translation": "제출 마감 기한이 이미 지났기 때문에, 해당 프로젝트는 취소되었습니다."
      }
    ]
  },
  "en_c2_12": {
    "title": "텍스트 맥락에서의 생략과 대용 (Ellipsis & Substitution)",
    "shortExplanation": "맥락상 이미 알려진 요소를 생략하거나 짧은 대용어로 대체하여 문장의 중복을 피하고 응집성을 높이는 기법.",
    "longExplanation": "텍스트의 결속성을 높이고 동일 어구의 지루한 중복을 방지하기 위한 핵심 언어 장치입니다:\n• 생략: 앞선 맥락을 통해 청자가 충분히 알 수 있는 기지 정보를 문장에서 과감히 생략하는 것(예: I wanted to leave, but wasn't allowed to [leave] 에서 중복되는 동사 생략).\n• 대용: 반복되는 명사나 동사구, 절 전체 대신 do, so, one, it 등의 대용어를 사용하는 것.\n대표적 활용 양상:\n• 대화 응답에서의 생략: A: Are you coming? B: Might (do).\n• 대동사를 통한 대용: She speaks French and he does too / so does he.\n• 명사 반복 회피(one): The big one? I prefer the small one.",
    "formation": "앞선 언급 문장 + 접속사/대화 응답 + [기지 성분 생략 또는 do / so / one / to를 통한 대치]",
    "examples": [
      {
        "translation": "운전할 줄 아세요? —— 예전에는 할 줄 알았어요(지금은 안 하지만요)."
      },
      {
        "translation": "그녀는 이곳에 오겠다고 말했고, 실제로 이곳에 왔습니다."
      }
    ]
  },
  "en_c2_13": {
    "title": "종속절을 대신하는 부정사구",
    "shortExplanation": "종속절 대신 부정사구를 활용하여 문장을 더 간결하고 명확하게 표현합니다.",
    "longExplanation": "복합 목적어 구문(목적어 + 부정사)은 접속사로 연결되는 종속절을 간결하게 대체할 수 있습니다:\n• 소망 및 요구 동사 + 목적어 + 'to' 부정사: 예컨대 '그녀가 머물기를 바란다'와 같은 문장 구조입니다.\n• 지각동사 및 사역동사(보다, 듣다, 지켜보다, 시키다, 허락하다 등) 뒤: 능동태에서는 'to'가 없는 원형부정사를 사용합니다(예: '그녀가 떠나는 것을 보았다', '그를 울게 만들었다', '내가 돕게 해달라').\n• 사역동사가 수동태로 쓰일 때: 반드시 'to' 부정사로 전환해야 합니다(예: '그는 돈을 지불해야만 했다').\n• 외양 및 추측을 나타내는 동사(~인 것 같다, 우연히 ~하다, ~임이 밝혀지다 등) + 'to' 부정사: 예컨대 '그녀는 알고 있는 것 같다', '그는 우연히 그곳에 있었다'와 같이 쓰입니다.",
    "formation": "주어 + 동사 + 목적어 + 부정사('to' 부정사 / 원형부정사) 또는 주어 + 추측·외양 동사 + 'to' 부정사",
    "examples": [
      {
        "translation": "당신이 이 문서에 서명해 주셔야 합니다."
      },
      {
        "translation": "그녀는 공개적으로 사과를 해야만 했습니다."
      },
      {
        "translation": "그는 모든 것을 잊어버린 것 같았습니다."
      }
    ]
  },
  "en_c2_14": {
    "title": "미래완료진행형",
    "shortExplanation": "미래의 특정 시점까지 동작이 계속 이어짐을 나타내며, 그 시점까지의 지속 기간을 강조합니다.",
    "longExplanation": "미래완료진행형은 미래의 특정 기준 시점까지 어떤 행동이나 사건이 계속해서 진행되고 있음을 나타내며, 주로 '그때가 되면 얼마나 오랫동안 지속되어 왔는가?'에 대한 답을 제공합니다.\n'~까지는', '~동안', '~할 때'와 같이 기한이나 지속 시간을 나타내는 표현과 자주 함께 사용됩니다. 예를 들어 '월요일이 되면 그녀는 이 프로젝트를 진행한 지 3주째가 됩니다'와 같은 문장에 쓰입니다.",
    "formation": "주어 + will have been + 동사 현재분사('-ing' 형태)",
    "examples": [
      {
        "translation": "내년이 되면 저는 영어를 공부해 온 지 5년이 됩니다."
      },
      {
        "translation": "우리가 도착할 때쯤이면, 그녀는 이미 2시간 동안 기다리고 있는 셈이 될 것입니다."
      }
    ]
  },
  "en_c2_15": {
    "title": "시제의 일치",
    "shortExplanation": "주절의 동사가 과거시제일 때, 종속절의 동사 시제도 이에 맞추어 과거 관련 시제로 일치시키는 규칙입니다.",
    "longExplanation": "복문에서 종속절의 동사 시제는 주절 동사의 시제와 시간적으로 일치해야 합니다.\n주절의 동사가 과거형일 경우, 종속절의 시제는 한 단계 이전 과거 시제로 후퇴합니다:\n• 현재시제 → 과거시제 (예: 그는 그것이 사실이라고 말했다)\n• 과거시제 → 과거완료시제 (예: 그녀는 그것을 본 적이 있다고 말했다)\n• 현재완료시제 → 과거완료시제 (예: 그는 이미 끝마쳤다고 말했다)\n• 조동사도 과거형으로 변경 (will은 would로, can은 could로, may는 might로, is는 was 등으로 변경)\n*예외 사항: 종속절의 내용이 보편적인 진리나 과학적 사실인 경우에는 주절의 시제와 관계없이 현재시제를 유지합니다.",
    "formation": "주절(과거시제) + 종속절(규칙에 맞춰 과거로 후퇴한 동사)",
    "examples": [
      {
        "translation": "그는 그곳에서 오랫동안 살아왔었다고 나에게 말했습니다."
      },
      {
        "translation": "그녀는 지구가 태양 주위를 돈다고 말했습니다."
      }
    ]
  },
  "en_c2_16": {
    "title": "등위접속사",
    "shortExplanation": "문법적으로 대등한 단어, 구, 또는 독립절을 이어주는 접속사입니다.",
    "longExplanation": "등위접속사는 문장 안에서 동등한 문법적 자격을 갖춘 구성 요소들을 연결합니다. 영어의 7대 대표 등위접속사：\n• for: 왜냐하면 ~이므로 (격식 있는 문맥에서의 이유 설명): '그녀는 떠났다, 왜냐하면 지쳤기 때문이다'\n• and: 그리고, ~와 (정보의 덧붙임 및 나열)\n• nor: ~도 또한 아니다 (부정의 추가. 절을 이끌 때 뒤의 주어와 동사가 도치됨): '그녀는 전화도 하지 않았고, 편지를 쓰지도 않았다'\n• but: 그러나, 하지만 (대조 및 역접)\n• or: 또는, 혹은 (선택)\n• yet: 그럼에도 불구하고, 하지만 (but보다 격식 있는 역접 표현)\n• so: 그래서, 따라서 (결과 및 귀결)",
    "formation": "독립절 + 쉼표(,) + 등위접속사(for, and, nor, but, or, yet, so) + 독립절",
    "examples": [
      {
        "translation": "그녀는 피곤했지만, 그럼에도 계속해서 일했습니다."
      },
      {
        "translation": "그는 공부도 하지 않았고, 수업에 출석하지도 않았습니다."
      }
    ]
  },
  "en_c2_17": {
    "title": "종속접속사",
    "shortExplanation": "주절에 종속되는 부사절 등을 이끌며, 주절과의 논리적인 의미 관계를 나타내는 접속사입니다.",
    "longExplanation": "종속접속사는 주절에 종속되는 절을 이끌어 두 절 사이의 긴밀한 논리적 관계를 맺어 줍니다.\n의미 및 기능별 분류：\n• 시간：~할 때, ~하는 동안, ~한 후에, ~하기 전에, ~할 때까지, 일단 ~하면, ~하자마자, ~할 때마다 등\n• 이유 및 원인：~때문에, ~이므로, ~라는 점을 고려하면, ~을 감안할 때 등\n• 조건：만약 ~라면, ~하지 않는 한, ~라는 조건으로, ~하는 한, ~할 경우에 대비하여, 가령 ~라면 등\n• 목적：~하기 위하여, ~하지 않도록 등\n• 양보 및 대조：비록 ~일지라도, ~에도 불구하고, 반면에, 한편 등",
    "formation": "종속접속사 + 종속절 + 쉼표(,) + 주절 또는 주절 + 종속접속사 + 종속절",
    "examples": [
      {
        "translation": "마감 기한이 지난 것을 감안하여, 저희는 회의를 취소했습니다."
      },
      {
        "translation": "그녀가 잊어버리지 않도록, 그는 그녀에게 알림을 보냈습니다."
      }
    ]
  },
  "en_c2_18": {
    "title": "쉼표, 세미콜론, 콜론의 용법",
    "shortExplanation": "절의 연결, 목록 제시, 상세 설명에 활용되는 쉼표, 세미콜론, 콜론의 문장부호 표기 규칙입니다.",
    "longExplanation": "영어 문장부호의 올바른 활용 규칙：\n• 쉼표(,): 두 독립절을 연결하는 등위접속사 앞, 문두의 도입 어구 또는 연결 부사 뒤(예: '그러나, 그녀는 머물기로 결정했습니다'), 그리고 항목의 나열(마지막 접속사 바로 앞에 두는 옥스퍼드 콤마 포함)에 쓰입니다.\n• 세미콜론(;): 접속사 없이 의미상 밀접하게 연결된 두 독립절을 직접 이어줄 때 사용합니다(예: '그녀는 피곤했습니다; 그녀는 잠자리에 들었습니다').\n• 콜론(:): 열거형 목록, 구체적인 부연 설명, 또는 인용구를 이끌어 낼 때 사용합니다.",
    "formation": "독립절 + 쉼표(,) + 등위접속사 + 독립절 또는 독립절 + 세미콜론(;) + 독립절 또는 완전한 절 + 콜론(:) + 나열 목록 / 설명",
    "examples": [
      {
        "translation": "그러나 결과는 명확하지 않았으며, 추가적인 연구가 요구됩니다."
      },
      {
        "translation": "그 기업에는 세 가지 핵심 우선과제가 있습니다: 효율성, 혁신, 그리고 지속가능성입니다."
      }
    ]
  },
  "en_c2_19": {
    "title": "대시, 아포스트로피, 따옴표의 용법",
    "shortExplanation": "삽입구를 강조하는 대시, 축약형 및 소유격을 나타내는 아포스트로피, 직접 인용에 쓰이는 따옴표의 활용 규칙입니다.",
    "longExplanation": "대시, 아포스트로피, 따옴표의 표기 원칙과 용법：\n• 대시(—): 쉼표보다 강한 어조로 문장 중간에 삽입구문이나 보충 설명을 두드러지게 나타낼 때 사용합니다(예: '그 해결책은 — 비록 비용은 많이 들었지만 — 효과적임이 입증되었다').\n• 아포스트로피('): 단어의 축약형(예: it's, don't, they're 등)을 표기할 때, 그리고 명사의 소유격(예: 존의 책, 학생들의 성적)을 나타낼 때 사용합니다.\n• 따옴표(인용부호): 직접화법이나 특정 인용 문구를 표기할 때 사용합니다(미국식 영어에서는 큰따옴표 \" \", 영국식 영어에서는 작은따옴표 ' '를 주로 사용합니다).",
    "formation": "문장 성분 + 대시(—) + 삽입 어구/보충 설명 + 대시(—) 또는 축약형 / 명사 + 아포스트로피(') + 소유격 또는 따옴표(\" \") + 직접 인용문",
    "examples": [
      {
        "translation": "그 프로젝트는 — 2020년에 시작되었는데 — 모든 기대를 뛰어넘었습니다."
      },
      {
        "translation": "사용하기 전에 기기의 설정을 확인하는 것이 중요합니다."
      }
    ]
  },
  "en_c2_20": {
    "title": "학술 텍스트에서의 간접의문문",
    "shortExplanation": "학술적인 글쓰기에서는 직접의문문 대신 평서문 어순을 따르는 간접의문문(명사절)을 주로 사용합니다.",
    "longExplanation": "학술 논문이나 연구 보고서와 같은 학술적 텍스트에서는 객관성과 격식을 유지하기 위해 직접 질문하는 형태 대신 간접의문문(명사절 역할을 하는 의문절)으로 전환하여 기술합니다.\n간접의문문은 종속절의 형태를 취하므로 의문문의 도치나 조동사의 개입 없이 일반 평서문의 어순(주어 + 동사)을 그대로 따릅니다.\n주요 유도어로는 '~인지 아닌지'를 나타내는 접속사 및 각종 의문사(무엇, 어디, 언제, 어떻게, 왜, 어느 것 등)가 사용됩니다.\n전환 예시: '이 데이터는 무엇을 보여주는가?' → '핵심적인 질문은 이 데이터가 무엇을 보여주는가이다'.",
    "formation": "주절 + 의문사 / 접속사 + 주어 + 동사 (평서문 어순)",
    "examples": [
      {
        "translation": "그 가설이 옳은지 여부에 대해 의구심이 듭니다."
      },
      {
        "translation": "이 연구는 소셜 미디어가 행동에 어떠한 영향을 미치는지 살펴봅니다."
      }
    ]
  }
};
